define([
    "ol",
    "proj4",
    "woodman",
    "gp",
    "Ol3/Utils",
    "Common/Utils/CheckRightManagement",
    "Common/Utils/SelectorID",
    "Common/Controls/MousePositionDOM",
    "Ol3/CRS/CRS" // call autoload function !
], function (
    ol,
    proj4,
    woodman,
    Gp,
    Utils,
    RightManagement,
    SelectorID,
    MousePositionDOM
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("GeoportalMousePosition");

    /**
     * @classdesc
     *
     * MousePosition Control.
     *
     * @constructor
     * @alias ol.control.GeoportalMousePosition
     * @extends {ol.control.Control}
     * @param {Object} options - options for function call.
     * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
     * @param {Boolean} [options.collapsed = true] - Specify if MousePosition control should be collapsed at startup. Default is true.
     * @param {Array}   [options.systems] - list of projection systems, default are Geographical ("EPSG:4326"), Web Mercator ("EPSG:3857"), Lambert 93 ("EPSG:2154") and extended Lambert 2 ("EPSG:27572").
     *      Each array element (=system) is an object with following properties :
     * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
     * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
     * @param {String}  options.systems.type - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
     * @param {Array}   [options.units] - list of coordinates units, to be displayed in control units list.
     *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
     *      and "M" or "KM" for metric coordinates
     * @param {Array}   [options.displayAltitude = true] - activate (true) or deactivate (false) the altitude panel. True by default
     * @param {Array}   [options.displayCoordinates = true] - activate (true) or deactivate (false) the coordinates panel. True by default
     * @param {Object}  [options.altitude] - elevation configuration
     * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
     * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
     * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
     * @param {Number}  [options.altitude.noDataValue] - value used for altitude service no data (default is -99999). In this case, "---m" will be displayed instead of "-99999m"
     * @param {Number}  [options.altitude.noDataValueTolerance] - tolerance for no data value :
     *                  values in [noDataValue + noDataValueTolerance ; noDataValue - noDataValueTolerance] interval will not be displayed, but "---m" will be displayed instead.
     *                  Default is 90000 (no data values = [-9999 ; -189999])
     * @example
     *  var MousePosition = new ol.control.GeoportalMousePosition({
     *      collapsed : false,
     *      displayCoordinates : true,
     *      displayAltitude : true,
     *      altitude : {
     *           triggerDelay : 100,
     *           responseDelay : 500,
     *           noDataValue : -99999,
     *           noDataValueTolerance : 99000,
     *           serviceOptions : {}
     *      },
     *      systems : [
     *       {
     *          crs : "EPSG:3857",
     *          label : "Web Mercator",
     *          type : "Metric"
     *        },
     *       {
     *          crs : "EPSG:4326",
     *          label : "Géographiques",
     *          type : "Geographical"
     *        }
     *      ],
     *      units : ["DEC", "DMS"]
     *  });
     */
    function MousePosition (options) {

        options = options || {};

        if (!(this instanceof MousePosition)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        this._initialize(options);

        // init control DOM container
        var container = this._initContainer(options);

        // call ol.control.Control constructor
        ol.control.Control.call(this,
            {
                element : container,
                target : options.target,
                render : options.render
            }
        );
    };

    // Inherits from ol.control.Control
    ol.inherits(MousePosition, ol.control.Control);

    /**
     * @lends module:GeoportalMousePosition
     */
    MousePosition.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les méthodes de la classe commune MousePositionDOM
    Utils.assign(MousePosition.prototype, MousePositionDOM);

    /**
     * Constructor (alias)
     *
     * @private
     */
    MousePosition.prototype.constructor = MousePosition;

    /**
     * Overload ol.control.Control setMap method, called when
     */
    MousePosition.prototype.setMap = function (map) {

        if ( map ) { // dans le cas de l'ajout du contrôle à la map
            var center = this._createMapCenter();
            map.getViewport().appendChild(center);
            if ( !this.collapsed && !this._isDesktop ) {
                center.className = "GPmapCenterVisible";
            }

            // on met en place l'evenement sur la carte pour recuperer les coordonnées,
            // on l'active à l'ouverture du panneau uniquement !
            if (!this.collapsed) {
                // evenement valable pour le mode desktop !
                if (this._isDesktop) {
                    map.on(
                        "pointermove",
                        this.onMouseMove,
                        this
                    );
                } else {
                    map.on(
                        "moveend",
                        this.onMapMove,
                        this
                    );
                }
            }
        }

        // call original setMap method
        ol.control.Control.prototype.setMap.call(this, map);

        // nothing else to do if map == null
        if (map == null) {
            return ;
        }

        // mode "collapsed"
        if (!this.collapsed) {
            var inputShow = document.getElementById("GPshowMousePosition-" + this._uid);
            inputShow.checked = "checked";
            this._setElevationPanel(this.options.displayAltitude);
            this._setCoordinatesPanel(this.options.displayCoordinates);
            if ( !this.options.displayCoordinates ) {
                this._setSettingsPanel(false);
            }
        }
    };

    // ################################################################### //
    // #################### user interface methods ####################### //
    // ################################################################### //

    /**
     * Set additional projection system
     *
     * @method addSystem
     * @param {Object} system - projection system
     * @param {String} system.crs - Proj4 crs alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} [system.label] - CRS label to be displayed in control. Default is system.crs alias
     * @param {String} [system.type] - CRS units type for coordinates conversion (one of control options.units). Default is "Metric"
     */
    MousePosition.prototype.addSystem = function (system) {

        if ( typeof system !== "object" ) {
            console.log("[ERROR] MousePosition:addSystem - system parameter should be an object");
            return;
        }
        if ( !system.crs) {
            logger.error("crs not defined !");
            return;
        }
        if ( !system.label ) {
            logger.warn("crs label not defined, use crs code by default.");
            system.label = system.crs;
        }
        if ( !system.type) {
            logger.warn("type srs not defined, use 'Metric' by default.");
            system.type = "Metric";
        }

        // 1. add system to control systems
        var found = false;
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var obj = this._projectionSystems[j];
            if (system.crs === obj.crs) {
                found = true;
                // warn user
                logger.info("crs '{}' already configured", obj.crs);
            }
        }
        system.code = this._projectionSystems.length;
        this._projectionSystems.push(system);

        // 2. add system settings option to container (if it was already build)
        var selectSystem = document.getElementById("GPmousePositionProjectionSystem-" + this._uid);
        if ( selectSystem ) {
            var option = document.createElement("option");
            option.value = system.code;
            option.text  = system.label;
            selectSystem.appendChild(option);
        }
    };

    /**
     * Set additional projection systems
     *
     * @param {Array} systems - Array of system object, with following properties :
     * @param {String} systems.crs - Proj4 CRS alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} systems.label - CRS label (for coordinates conversion)
     * @param {String} systems.type - CRS units type to be displayed in control (one of control options.units). Default is "Metric"
     */
    MousePosition.prototype.addSystems = function (systems) {
        if ( !systems ) {
            return;
        }
        if ( !Array.isArray(systems) ) {
            console.log("[ERROR] MousePosition:addSystems - systems parameter should be an array");
            return;
        }
        for ( var i = 0 ; i < systems.length; i++ ) {
            this.addSystem(systems[i]);
        }
    };

    /**
     * Remove projection system (in case there are several system with same code, only the first one will be removed)
     *
     * @param {String} systemCode - CRS alias (from proj4 defs)
     */
    MousePosition.prototype.removeSystem = function (systemCode) {
        if ( !systemCode || typeof systemCode !== "string" ) {
            console.log("[ERROR] MousePosition:removeSystem - systemCode parameter should be a string");
            return;
        }

        var system;
        // find system in control projection systems list
        for ( var i = 0; i < this._projectionSystems.length; i++ ) {
            var proj = this._projectionSystems[i];
            if ( systemCode === proj.crs ) {
                system = proj;
                // remove system from control projection systems list
                this._projectionSystems.splice(i, 1);
                break;
            }
        }

        // find system in control container systems list
        var systemList = document.getElementById("GPmousePositionProjectionSystem-" + this._uid);
        for ( var j = 0; j < systemList.childNodes.length; j++) {
            if ( systemCode === systemList.childNodes[j].value ) {
                // remove system from control container systems list
                systemList.removeChild(systemList.childNodes[j]);
                break;
            }
        }

        if ( !system ) {
            console.log("[WARN] MousePosition:removeSystem - system not found");
            return;
        }
    };

    /**
     * Set control units (to be displayed)
     *
     * @param {Array} units - list of all coordinates units, to be displayed in control units list.
     *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
     *      and "M" or "KM" for metric coordinates
     */
    MousePosition.prototype.setUnits = function (units) {
        if ( !units || !Array.isArray(units) ) {
            return;
        }
        this.options.units = units;
        this._projectionUnits = [];
        this._initProjectionUnits();
        if ( this._currentProjectionType ) {
            this._setTypeUnitsPanel(this._currentProjectionType);
        }
    };

    /**
     * Set control altitude options (useless if displayAltitude == false)
     *
     * @param {Object} options - altitude options
     * @param {Object}  [options.serviceOptions] - options of elevation service
     * @param {Number}  [options.responseDelay] - latency for elevation request, 500 ms by default
     * @param {Number}  [options.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
     */
    MousePosition.prototype.setAltitudeOptions = function (options) {
        if ( !options || typeof options !== "object" ) {
            return;
        }
        this.options.altitude.triggerDelay = options.triggerDelay;
        this.options.altitude.responseDelay = options.responseDelay;
        if ( options.serviceOptions ) {
            for ( var opt in options.serviceOptions ) {
                if ( options.serviceOptions.hasOwnProperty(opt) ) {
                    this.options.altitude.serviceOptions[opt] = options.serviceOptions[opt];
                }
            }
        }
    };

    /**
     * Display or hide elevation panel
     *
     * @param {Boolean} displayAltitude - true to display elevation panel, false to hide it
     */
    MousePosition.prototype.displayAltitude = function (displayAltitude) {
        if ( displayAltitude === undefined ) {
            return;
        }
        this.options.displayAltitude = displayAltitude;
        this._setElevationPanel(displayAltitude);
    };

    /**
     * Display or hide coordinates panel
     *
     * @param {Boolean} displayCoordinates - true to display coordinates panel, false to hide it
     */
    MousePosition.prototype.displayCoordinates = function (displayCoordinates) {
        if ( displayCoordinates === undefined ) {
            return;
        }
        this.options.displayCoordinates = displayCoordinates;
        this._setCoordinatesPanel(displayCoordinates);
        this._setSettingsPanel(displayCoordinates);
    };

    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    MousePosition.prototype.setCollapsed = function (collapsed) {
        if ( collapsed === undefined ) {
            console.log("[ERROR] MousePosition:setCollapsed - missing collapsed parameter");
            return;
        }
        if ( ( collapsed && this.collapsed) || ( !collapsed && !this.collapsed ) ) {
            return;
        }
        if ( !this._isDesktop ) {
            document.getElementById("GPmapCenter").className = collapsed ? "" : "GPmapCenterVisible";
        }
        // on simule l'ouverture du panneau après un click
        this.onShowMousePositionClick();
        this._showMousePositionContainer.checked = !collapsed;
    };

    // ################################################################### //
    // ######################## initialize control ####################### //
    // ################################################################### //

    /**
     * Initialize control (called by MousePosition constructor)
     *
     * @method _initialize
     * @param {Object} options - control options (set by user)
     * @private
     */
    MousePosition.prototype._initialize = function (options) {

        // Set default options
        // {Object} control options - set by user or by default
        this.options = options || {};
        this.options.collapsed = ( options.collapsed !== undefined ) ? options.collapsed : true;
        /** {Boolean} specify if MousePosition control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;
        this.options.units = options.units || [];
        this.options.displayAltitude = ( options.displayAltitude !== undefined ) ? options.displayAltitude : true;
        this.options.displayCoordinates = ( options.displayCoordinates !== undefined ) ? options.displayCoordinates : true;
        this.options.systems = options.systems || [];
        if ( options.altitude ) {
            var altitude = options.altitude;
            this.options.altitude = {
                triggerDelay : ( altitude.triggerDelay !== undefined ) ? altitude.triggerDelay : 200,
                responseDelay : ( altitude.responseDelay !== undefined ) ? altitude.responseDelay : 500,
                serviceOptions : altitude.serviceOptions || {},
                noDataValue : ( altitude.noDataValue !== undefined ) ? altitude.noDataValue : -99999,
                noDataValueTolerance : ( altitude.noDataValueTolerance !== undefined ) ? altitude.noDataValueTolerance : 90000
            };
        } else {
            this.options.altitude = {
                triggerDelay : 200,
                responseDelay : 500,
                serviceOptions : {}
            };
        }

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // initialisation des systemes de projections
        this._projectionSystems = [];
        this._initProjectionSystems();

        // initialisation des systemes des unités
        this._projectionUnits = {};
        this._initProjectionUnits();

        // detection du support : desktop ou tactile
        this._isDesktop = Utils.detectSupport();

        // on met en place un seuil sur le timer
        if ( this.options.altitude.triggerDelay < 100 ) {
            this.options.altitude.triggerDelay = 100;
        }

        // {Number} timer on movestopped delay (altitude calculation)
        this._timer = this.options.altitude.triggerDelay;

        // {Object} Selected projection system
        this._currentProjectionSystems = this._projectionSystems[0];

        // {String} Selected projection units typs : Geographical or metric
        this._currentProjectionType = this._projectionSystems[0].type;

        // {String} Selected projection unit
        this._currentProjectionUnits = this._projectionUnits[this._currentProjectionType][0].code;

        // {Object} Projection units container (DOM Element)
        this._projectionUnitsContainer = null;

        // {Object} control panel container (DOM Element)
        this._showMousePositionContainer = null;

        // gestion de l'affichage du panneau de l'altitude
        if ( !this.options.displayAltitude && !this.options.displayCoordinates ) {
            // on reactive l'affichage des coordonnées, pour ne pas afficher un panneau vide !
            this.options.displayCoordinates = true;
        }

        // gestion des droits sur les ressources/services
        // si l'on souhaite un calcul d'altitude, on verifie les droits sur les ressources d'alti...
        if ( this.options.displayAltitude ) {
            this._checkRightsManagement();
        }
    };

    /**
     * this method is called by the constructor and initialize the projection
     * systems.
     * getting coordinates in the requested projection :
     * see this.onMousePositionProjectionSystemChange()
     *
     * @method _initProjectionSystems
     * @private
     */
    MousePosition.prototype._initProjectionSystems = function () {

        // on donne la possibilité à l'utilisateur de modifier
        // la liste des systèmes à afficher
        // Ex. this.options.systems

        // systemes de projection disponible par defaut
        var projectionSystemsByDefault = [
            {
                code : "EPSG:4326",
                label : "G\u00e9ographique",
                crs : ol.proj.get("EPSG:4326").getCode(),
                type : "Geographical"
            },
            {
                code : "EPSG:3857",
                label : "Web Mercator",
                crs : ol.proj.get("EPSG:3857").getCode(),
                type : "Metric"
            },
            {
                code : "EPSG:2154",
                label : "Lambert 93",
                crs : ol.proj.get("EPSG:2154").getCode(),
                type : "Metric",
                geoBBox : { left: -9.86, bottom : 41.15, right : 10.38, top : 51.56 }
            },
            {
                code : "EPSG:27572",
                label : "Lambert II \u00e9tendu",
                crs : ol.proj.get("EPSG:27572"),
                type : "Metric",
                geoBBox : { left: -4.87, bottom : 42.33, right : 8.23, top : 51.14 }
            }
        ];

        var systems = this.options.systems;
        for (var i = 0; i < systems.length; i++) {

            // definition d'un systeme de reference
            var sys = systems[i];
            this.addSystem(sys);
        }

        if ( this._projectionSystems.length === 0 ) {
            // on ajoute les systèmes de projections par défaut
            this._projectionSystems = projectionSystemsByDefault;
        }
    };

    /**
     * this method is called by the constructor and initialize the units.
     * getting coordinates in the requested units :
     * see this.onMousePositionProjectionUnitsChange()
     *
     * @method _initProjectionUnits
     * @private
     */
    MousePosition.prototype._initProjectionUnits = function () {

        // on donne la possibilité à l'utilisateur de modifier
        // la liste des unités à afficher
        // Ex.
        // this.options.units : ["DEC", "DMS"]

        // unités disponible par defaut
        var projectionUnitsByDefault = {
            Geographical : [
                {
                    code : "DEC",
                    label : "degrés décimaux",
                    convert : this._displayDEC
                },
                {
                    code : "DMS",
                    label : "degrés sexagésimaux",
                    convert : this._displayDMS
                },
                {
                    code : "RAD",
                    label : "radians",
                    convert : this._displayRAD
                },
                {
                    code : "GON",
                    label : "grades",
                    convert : this._displayGON
                }
            ],
            Metric : [
                {
                    code : "M",
                    label : "mètres",
                    convert : this._displayMeter
                },
                {
                    code : "KM",
                    label : "kilomètres",
                    convert : this._displayKMeter
                }
            ]
        };

        var units = this.options.units;

        for (var type in projectionUnitsByDefault) {
            if (projectionUnitsByDefault.hasOwnProperty(type)) {
                var found = false;
                for (var j = 0; j < projectionUnitsByDefault[type].length; j++) {
                    var obj = projectionUnitsByDefault[type][j];
                    for (var i = 0; i < units.length; i++) {
                        var unit = units[i];
                        if (obj.code === unit) {
                            found = true;
                            if (! this._projectionUnits[type]) {
                                this._projectionUnits[type] = [];
                            }
                            this._projectionUnits[type].push(obj);
                        }
                    }
                }
                if (!found) {
                    this._projectionUnits[type] = projectionUnitsByDefault[type];
                }
            }
        }

        // au cas où...
        if ( typeof this._projectionUnits === "object" && Object.keys(this._projectionUnits).length === 0 ) {
            this._projectionUnits = projectionUnitsByDefault;
        }
    };

    /**
     * this method is called by constructor
     * and check the rights to resources
     *
     * @method _checkRightsManagement
     * @private
     */
    MousePosition.prototype._checkRightsManagement = function () {

        var rightManagement = RightManagement.check({
            key : this.options.apiKey,
            resources : ["SERVICE_CALCUL_ALTIMETRIQUE_RSC"],
            services : ["Elevation"]
        });

        if ( !rightManagement ) {
            this._noRightManagement = true;
        }

        // on recupère les informations utiles
        // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
        // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
        // été renseignée.
        if ( !this.options.apiKey ) {
            this.options.apiKey = rightManagement.key;
        }

    };

    // ################################################################### //
    // ######################## methods handle dom ####################### //
    // ################################################################### //

    /**
     * Create control main container (called by MousePosition constructor)
     *
     * @method _initContainer
     * @private
     */
    MousePosition.prototype._initContainer = function () {
        // creation du container principal
        var container = this._createMainContainerElement();

        var inputShow = this._showMousePositionContainer = this._createShowMousePositionElement();
        container.appendChild(inputShow);

        var picto = this._createShowMousePositionPictoElement(this._isDesktop);
        container.appendChild(picto);

        var panel    = this._createMousePositionPanelElement();
        var settings = this._createMousePositionSettingsElement();
        var systems  = this._projectionSystemsContainer = this._createMousePositionSettingsSystemsElement(this._projectionSystems);
        var units    = this._projectionUnitsContainer = this._createMousePositionSettingsUnitsElement(this._projectionUnits[this._currentProjectionType]);

        settings.appendChild(systems);
        settings.appendChild(units);
        panel.appendChild(settings);
        container.appendChild(panel);

        return container;
    };

    /**
     * this method is called by this.()
     * and it changes the elevation view panel into the dom.
     *
     * @method _setElevationPanel
     * @param {Boolean} active - true:active, false:disable
     * @private
     */
    MousePosition.prototype._setElevationPanel = function (active) {
        var div = null;

        if ( !active ) {
            div = document.getElementById("GPmousePositionAltitude-" + this._uid);
            div.style.display = "none";
        } else {
            if ( this._noRightManagement ) {
                div = document.getElementById("GPmousePositionAlt-" + this._uid);
                div.innerHTML = "No rights!";
            } else {
                div = document.getElementById("GPmousePositionAltitude-" + this._uid);
                div.style.display = "";
            }
        }
    };

    /**
     * this method is called by this.()
     * and it changes the coordinate view panel into the dom.
     *
     * @method _setCoordinatesPanel
     * @param {Boolean} active - true:active, false:disable
     * @private
     */
    MousePosition.prototype._setCoordinatesPanel = function (active) {
        var div  = document.getElementById("GPmousePositionCoordinate-" + this._uid);
        if ( !active) {
            div.style.display = "none";
        } else {
            div.style.display = "";
        }
    };

    /**
    * this method is called by this.()
    * and it changes the settings view panel into the dom.
    *
    * @method _setSettingsPanel
    * @param {Boolean} active - true:active, false:disable
    * @private
    */
    MousePosition.prototype._setSettingsPanel = function (active) {
        var divPicto  = document.getElementById("GPshowMousePositionSettingsPicto-" + this._uid);
        var divPanel  = document.getElementById("GPmousePositionSettings-" + this._uid);
        if ( !active) {
            divPicto.style.display = "none";
            divPanel.style.display = "none";
        } else {
            divPicto.style.display = "";
            divPanel.style.display = "";
        }
    };

    /**
     * this method is called by this.onMousePositionProjectionSystemChange()
     * when changes to a metric or a geographical units.
     *
     * @method _setTypeUnitsPanel
     * @param {String} type - Geographical or Metric
     * @private
     */
    MousePosition.prototype._setTypeUnitsPanel = function (type) {
        var container = this._projectionUnitsContainer;

        // on supprime les enfants...
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var units = this._projectionUnits[type];
        for (var j = 0; j < units.length; j++) {
            var obj = units[j];
            var option = document.createElement("option");
            option.value = (obj.code) ? obj.code : j;
            option.text  = obj.label || j;
            // option.label = obj.label;
            container.appendChild(option);
        }

        // le nouveau type de system ...
        this._currentProjectionType = type;
        // et comme on a changé de type de systeme,
        // il faut changer aussi d'unité !
        this._currentProjectionUnits = this._projectionUnits[type][0].code;
    };

    // ################################################################### //
    // ######################## method units convert ##################### //
    // ################################################################### //

    /**
     * degreedecimal
     *
     * @method _displayDEC
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @return {Object} coordinate - coordinate object : {lat : 48, lng : 2} par exemple
     * @private
     */
    MousePosition.prototype._displayDEC = function (olCoordinate) {
        var coordinate = {};
        coordinate.lat = olCoordinate[1].toFixed(6);
        coordinate.lng = olCoordinate[0].toFixed(6);
        return coordinate;
    };

    /**
     * degreedecimal2sexagecimal
     *
     * @method _displayDMS
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @return {Object} coordinate - coordinate object : {lng : "2° 00′ 00″ E", lat : "48° 00′ 00″ N"} par exemple
     * @private
     */
    MousePosition.prototype._displayDMS = function (olCoordinate) {
        var coordinate = {};
        var regex = /(.*)([NS])\s(.*)([EW])/;
        var subst = "$1$2 | $3$4";
        var str = ol.coordinate.toStringHDMS(olCoordinate, 2).replace(regex, subst);
        var coords = str.split("|");
        // coords est du type : "48° 00′ 00″ N 2° 00′ 00″ E". On veut récupérer les 2 coordonnées séparément.
        coordinate.lat = coords[0];
        coordinate.lng = coords[1];
        return coordinate;
    };

    /**
     * degreedecimal2radian
     *
     * @method _displayRAD
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @return {Object} coordinate - coordinate object : {lng : "0.02837864", lat : "0.84300269"} par exemple
     * @private
     */
    MousePosition.prototype._displayRAD = function (olCoordinate) {
        var coordinate = {};
        var d = 0.01745329251994329577;
        coordinate.lng = olCoordinate[0] * d;
        coordinate.lng = coordinate.lng.toFixed(8);
        coordinate.lat = olCoordinate[1] * d;
        coordinate.lat = coordinate.lat.toFixed(8);
        return coordinate;
    };

    /**
     * degreedecimal2grade
     *
     * @method _displayGON
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @return {Object} coordinate - coordinate object : {lng : "4.09545898", lat : "53.68751528"} par exemple
     * @private
     */
    MousePosition.prototype._displayGON = function (olCoordinate) {
        var coordinate = {};
        var d = 1.11111111111111111111;
        coordinate.lng = olCoordinate[0] * d;
        coordinate.lng = coordinate.lng.toFixed(8);
        coordinate.lat = olCoordinate[1] * d;
        coordinate.lat = coordinate.lat.toFixed(8);
        return coordinate;
    };

    /**
     * meter
     *
     * @method _displayMeter
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @return {Object} coordinate - coordinate object : {x : "148593.58", y : "6176560.95"} par exemple
     * @private
     */
    MousePosition.prototype._displayMeter = function (olCoordinate) {
        // on recoit toujours des coordonnées metriques
        var coordinate = {};
        coordinate.x = olCoordinate[0].toFixed(2);
        coordinate.y = olCoordinate[1].toFixed(2);
        coordinate.unit = "m";
        return coordinate;
    };

    /**
     * kilometer
     *
     * @method _displayKMeter
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @return {Object} coordinate - coordinate object : {x : "214.96", y : "6250.09"} par exemple
     * @private
     */
    MousePosition.prototype._displayKMeter = function (olCoordinate) {
        var coordinate = {};
        coordinate.x = ( olCoordinate[0] / 1000 ).toFixed(2);
        coordinate.y = ( olCoordinate[1] / 1000 ).toFixed(2);
        coordinate.unit = "km";
        return coordinate;
    };

    // ################################################################### //
    // ##################### handlers events to control ################## //
    // ################################################################### //

    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @method _setCoordinate
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @param {Object} crs - coordinate CRS (ol.proj.Projection)
     * @private
     */
    MousePosition.prototype._setCoordinate = function (olCoordinate, crs) {

        // structure
        // ol.Coordinate
        //      [
        //          4   // lon
        //          48  // lat
        //      ]

        // structure pour les coordonnées en fonctin du type demandé :
        // {x:, y:, unit:} ou {lng:, lat:} ou {lon:, lat:} ou {e:, n:, unit:}...
        var coordinate = {};
        // on projete le point dans le systeme demandé
        var oSrs = this._currentProjectionSystems.crs;
        if (! oSrs) {
            console.log("ERROR : system crs not found");
            return;
        }
        // on reprojette les coordonnées depuis leur CRS d'origine (CRS) vers le CRS demandé (oSrs)
        olCoordinate = ol.proj.transform(olCoordinate, crs, oSrs);

        // type de systeme : Geographical ou Metric
        var type = this._currentProjectionSystems.type;

        // on recherche la fonction de formatage dans l'unité demandée
        var convert = null;
        var units = this._projectionUnits[type];
        for (var i = 0; i < units.length; i++) {
            if (units[i].code === this._currentProjectionUnits) {
                convert = units[i].convert;
                break;
            }
        }
        if ( !convert || typeof convert !== "function" ) {
            console.log("WARNING : coordinates format function not found");
            return;
        } else {
            coordinate = convert(olCoordinate);
        }

        if (! coordinate || Object.keys(coordinate).length === 0) {
            return;
        }

        this.GPdisplayCoords(coordinate);
    };

    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayElevation() into the DOM functions)
     *
     * @method _setElevation
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @private
     */
    MousePosition.prototype._setElevation = function (olCoordinate) {
        // gestion du timer de la requete du service d'altitude
        var delay = this.options.altitude.responseDelay;
        var noDataValue = this.options.altitude.noDataValue;
        var noDataValueTolerance = this.options.altitude.noDataValueTolerance;
        this.GPdisplayElevation(olCoordinate, delay, noDataValue, noDataValueTolerance);
    };

    /**
     * this method is triggered when the mouse or the map is stopped.
     * (cf. onMouseMove and onMapMove)
     *
     * @method onMoveStopped
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @param {Object} crs - coordinate CRS (ol.proj.Projection)
     * @private
     */
    MousePosition.prototype.onMoveStopped = function (olCoordinate, crs) {
        // reprojection en CRS:84 (EPSG:4326) pour le calcul alti
        var oLatLng = ol.proj.transform(olCoordinate, crs, "EPSG:4326");
        this._setElevation(oLatLng);
    };

    /**
     * this method is an handler event to control. The event is 'mousemove' on
     * the map. The handler sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @method onMouseMove
     * @param {Object} e - HTMLElement
     * @private
     */
    MousePosition.prototype.onMouseMove = function (e) {

        var self = this;

        // info: coordinate = [x, y]
        var coordinate = e.coordinate;
        if ( !e.map || !e.map.getView() ) {
            return;
        }
        var crs = e.map.getView().getProjection();

        this._setCoordinate(coordinate, crs);

        // calcul de l'altitude après un certain délai après l'arrêt du mouvement de la souris
        clearTimeout(this._timer);
        this._timer = setTimeout( function () {
            self.onMoveStopped(coordinate, crs);
        }, this.options.altitude.triggerDelay);
    };

    /**
     * this method is an handler event to control. The event is 'moveend' on
     * the map. The handler sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @method onMapMove
     * @private
     */
    MousePosition.prototype.onMapMove = function () {

        var self = this;

        var map = this.getMap();
        if ( !map || !map.getView() ) {
            return;
        }
        var view = map.getView();
        var coordinate = view.getCenter();
        var crs = view.getProjection();

        this._setCoordinate(coordinate, crs);

        // calcul de l'altitude après un certain délai après l'arrêt du mouvement de la souris
        clearTimeout(this._timer);
        this._timer = setTimeout( function () {
            self.onMoveStopped(coordinate, crs);
        }, this.options.altitude.triggerDelay);

    };

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by this.GPdisplayElevation() in the dom, and
     * it executes a request to the elevation service.
     *
     * @method onRequestAltitude
     * @param {Object} coordinate - {lat:..., lng:...}
     * @private
     */
    MousePosition.prototype.onRequestAltitude = function (coordinate, callback) {

        // INFORMATION
        // on effectue la requête au service d'altitude...
        // on met en place des callbacks afin de recuperer les resultats ou
        // les messages d'erreurs du service.
        // le resultat est affiché dans une balise du dom.
        // les messages d'erreurs sont affichés sur la console (?)

        if ( !coordinate || Object.keys(coordinate).length === 0 ) {
            return;
        }

        // si on ne veut pas de calcul d'altitude, on ne continue pas !
        if ( !this.options.displayAltitude ) {
            return;
        }

        // si on n'a pas les droits sur la ressource, pas la peine de
        // continuer !
        if ( this._noRightManagement ) {
            console.log("[WARNING] contract key configuration has no rights to load geoportal elevation ");
            document.getElementById("GPmousePositionAlt-" + this._uid).innerHTML = "No rights!";
            return;
        }

        // on recupere les options du service
        var options = this.options.altitude.serviceOptions || {};

        // ainsi que les coordonnées
        options.zonly = true;
        options.positions = [
            {
                lon : coordinate[0],
                lat : coordinate[1]
            }
        ];

        // et les callbacks
        options.scope = this;

        if ( !options.rawResponse ) {
            // dans le cas général
            /** callback onSuccess */
            options.onSuccess = function (results) {
                if (results && Object.keys(results)) {
                    callback.call(this, results.elevations[0].z);
                }
            };
        } else {
            /** callback onSuccess */
            options.onSuccess = function (results) {
                console.log("alti service raw response : ", results);
            };
        }

        /** callback onFailure */
        options.onFailure = function (error) {
            console.log("[getAltitude] ERROR : " + error.message);
        };

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
        options.apiKey = options.apiKey || this.options.apiKey;

        Gp.Services.getAltitude(options);
    };

    /**
     * this method is called by event 'click' on 'GPshowMousePositionPicto' tag label
     * (cf. this._createShowMousePositionPictoElement),
     * and toggles event 'mousemove' on map.
     *
     * @method onShowMousePositionClick
     * @private
     */
    MousePosition.prototype.onShowMousePositionClick = function () {

        // checked : true - panel close
        // checked : false - panel open
        var map = this.getMap();
        this.collapsed = this._showMousePositionContainer.checked;
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser mousePosition.on("change:collapsed", function(e) ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");

        // evenement declenché à l'ouverture/fermeture du panneau,
        // et en fonction du mode : desktop ou tactile !
        if ( this._showMousePositionContainer.checked ) {
            if (this._isDesktop) {
                map.un("pointermove", this.onMouseMove, this);
            } else {
                map.un("moveend", this.onMapMove, this);
            }
        } else {
            if (this._isDesktop) {
                map.on("pointermove", this.onMouseMove, this);
            } else {
                map.on("moveend", this.onMapMove, this);
                // on simule un deplacement en mode tactile
                this.onMapMove();
            }
        }

        // FIXME
        // on gère l'affichage des panneaux ici..., même si ce n'est pas l'endroit
        // adequate...
        this._setElevationPanel(this.options.displayAltitude);
        this._setCoordinatesPanel(this.options.displayCoordinates);
        if ( !this.options.displayCoordinates ) {
            this._setSettingsPanel(false);
        }
    };

    /**
     * this method is called by event 'change' on 'GPmousePositionProjectionSystem'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the system projection.
     *
     * @method onMousePositionProjectionSystemChange
     * @param {Object} e - HTMLElement
     * @private
     */
    MousePosition.prototype.onMousePositionProjectionSystemChange = function (e) {

        var idx   = e.target.selectedIndex;      // index
        var value = e.target.options[idx].value; // crs

        // si on change de type de systeme, on doit aussi changer le type d'unités !
        var type = null;
        for(var i = 0 ; i < this._projectionSystems.length ; ++i)
        {
            if( this._projectionSystems[i].code == value )
            {
                type = this._projectionSystems[i].type;
                break;
            }
        }

        if( !type )
        {
            logger.log("system not found in projection systems container");
            return;
        }

        if (type !== this._currentProjectionType) {
            this._setTypeUnitsPanel(type);
        }

        // on enregistre le systeme courrant
        this._currentProjectionSystems = this._projectionSystems[idx];

        // on simule un deplacement en mode tactile pour mettre à jour les
        // resultats
        if (!this._isDesktop) {
            this.onMapMove();
        }
    };

    /**
     * this method is called by event 'mouseover' on 'GPmousePositionProjectionSystem'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the system projection.
     *
     * @method onMousePositionProjectionSystemMouseOver
     * @param {Object} e - HTMLElement
     * @private
     */
    MousePosition.prototype.onMousePositionProjectionSystemMouseOver = function (e) {

        //map infos
        var map = this.getMap();
        if ( !map || !map.getView() ) {
            return;
        }
        var view = map.getView();
        var crs = view.getProjection();
        var mapExtent = view.calculateExtent( map.getSize() );

        //get extent in WGS84 coordinates
        mapExtent = ol.proj.transformExtent( mapExtent, crs, "EPSG:4326");

        //clear select
        var systemList = document.getElementById(this._addUID("GPmousePositionProjectionSystem"));
        systemList.innerHTML = "";

        //add systems whose extent intersects the map extent
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var proj = this._projectionSystems[j];
            if( proj.geoBBox )
            {
                //bboxes intersection test
                if(   mapExtent[0] > proj.geoBBox.right ||
                      mapExtent[1] > proj.geoBBox.top   ||
                      mapExtent[2] < proj.geoBBox.left  ||
                      mapExtent[3] < proj.geoBBox.bottom
                ){
                    continue;//do not intersect
                }
            }
            var option = document.createElement("option");
            option.value = proj.code;
            option.text  = proj.label || j;

            systemList.appendChild(option);
        }
    };

    /**
     * this method is called by event 'change' on 'GPmousePositionProjectionUnits'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the units projection.
     *
     * @method onMousePositionProjectionUnitsChange
     * @param {Object} e - HTMLElement
     * @private
     */
    MousePosition.prototype.onMousePositionProjectionUnitsChange = function (e) {

        var idx   = e.target.selectedIndex;
        var value = e.target.options[idx].value;

        this._currentProjectionUnits = value;

        // on simule un deplacement en mode tactile pour mettre à jour les
        // resultats
        if (!this._isDesktop) {
            this.onMapMove();
        }
    };

    return MousePosition;
});
