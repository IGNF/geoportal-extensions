define([
    "itowns",
    "proj4",
    "woodman",
    "gp",
    "Common/Utils",
    "Common/Utils/Config",
    "Common/Utils/CheckRightManagement",
    "Common/Utils/SelectorID",
    "Common/Controls/MousePositionDOM",
    "Itowns/Controls/Control",
    "Itowns/Controls/Utils/PositionFormater",
], function (
    itowns, // FIXME Global for browser only !
    proj4,
    woodman,
    Gp,
    Utils,
    Config,
    RightManagement,
    SelectorID,
    MousePositionDOM,
    Control,
    PositionFormater
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("MousePosition");

    /**
     * @classdesc
     *
     * MousePosition Control.
     *
     * @constructor
     * @alias VirtualGeo.GeoportalMousePosition
     * @extends {VirtualGeo.Control}
     * @param {Object} options - options for function call.
     * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
     * @param {Boolean} [options.collapsed = false] - Specify if MousePosition control should be collapsed at startup. Default is true.
     * @param {Array}   [options.systems] - list of projection systems, default are Geographical ("EPSG:4326"), Web Mercator ("EPSG:3857"), Lambert 93 ("EPSG:2154") and extended Lambert 2 ("EPSG:27572").
     *      Each array element (=system) is an object with following properties :
     * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
     * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
     * @param {String}  options.systems.type - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
     * @param {Object}  [options.systems.geoBBox] - Aera covered by the system (WGS84 coordinates).
     * @param {Number}  options.systems.geoBBox.right - Right bound.
     * @param {Number}  options.systems.geoBBox.left - Left bound.
     * @param {Number}  options.systems.geoBBox.top - Top bound.
     * @param {Number}  options.systems.geoBBox.bottom - Bottom bound.
     * @param {Array}   [options.units] - list of coordinates units, to be displayed in control units list.
     *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
     *      and "M" or "KM" for metric coordinates
     * @param {Array}   [options.displayAltitude = true] - activate (true) or deactivate (false) the altitude panel. True by default
     * @param {Array}   [options.displayCoordinates = true] - activate (true) or deactivate (false) the coordinates panel. True by default
     * @param {Object}  [options.altitude] - elevation configuration
     * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
     * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
     * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
     * @example
     *  var MousePosition = new ol.control.GeoportalMousePosition({
     *      collapsed : false,
     *      displayCoordinates : true,
     *      displayAltitude : true,
     *      altitude : {
     *           triggerDelay : 100,
     *           responseDelay : 500,
     *           serviceOptions : {}
     *      },
     *      systems : [
     *       {
     *          crs : "EPSG:3857",
     *          label : "Mercator",
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

        this._callbacks = {};

        // init control DOM container
        var container = this._initContainer(options);

        Control.call(
            this,
            "MousePosition",
            container,
            options
            );
    };

    /**
     * @lends module:GeoportalMousePosition
     */
    MousePosition.prototype = Object.create(Control.prototype, {});

    Utils.assign(MousePositionDOM, MousePosition.prototype);

    /**
     * Constructor (alias)
     */
    MousePosition.prototype.constructor = MousePosition;

    // ################################################################### //
    // #################### user interface methods ####################### //
    // ################################################################### //

    /**
     * Set additional projection system
     *
     * @method use system defined in the vg/CRS/CRS.js class
     * @param {Object} system - Projection system
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
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var obj = this._projectionSystems[j];
            if (system.crs === obj.crs) {
                // warn user
                console.log("crs '{}' already configured", obj.crs);
            }
        }

        system.code = this._projectionSystems.length;
        this._projectionSystems.push(system);

        // 2. add system settings option to container (if it was already build)
        var selectSystem = document.getElementById(this._addUID("GPmousePositionProjectionSystem"));
        if ( selectSystem ) {
            var option = document.createElement("option");
            option.value = system.code;
            option.text  = system.label;
            selectSystem.appendChild(option);
        }
    };

    /**
     * Surcharge de la méthode _setMap :
     *
     * @param {Object} map - source object whose properties will be copied.
     * @param {Object} mapDiv - Div contenant la mapDiv
     * @param {Function} f - fonction FIXME
     *
     */
    MousePosition.prototype.setMap = function (map) {

        if ( map ) { // dans le cas de l'ajout du contrôle à la map

            // dans le cas de l'ajout du contrôle à la map
            var center = this._createMapCenter();
            map.getViewport().appendChild(center);

            // on définie le callback sur la carte pour recuperer les coordonnées
            this._callbacks.mouseMove = this.onMouseMove.bind(this);

            // evenement valable pour le mode desktop !
            if (this._isDesktop) {
                map.getViewport().addEventListener(
                    "pointermove",
                    this._callbacks.mouseMove
                );
            } else {
                map.addEventListener(
                    "centerchanged",
                    this.onMapMove
                );
            }
        }

        // call original setMap method
        Control.prototype.setMap.call(this, map);

        // nothing else to do if map == null
        if (map == null) {
            return ;
        }
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
                label : "Géographique",
                crs : "EPSG:4326",
                type : "Geographical"
            },
            {
                label : "Mercator",
                crs : "EPSG:3857",
                type : "Metric"
            },
            {
                label : "Lambert 93",
                crs : "EPSG:2154",
                type : "Metric",
                geoBBox : {
                    left : -9.86,
                    bottom : 41.15,
                    right : 10.38,
                    top : 51.56
                }
            },
            {
                label : "Lambert II étendu",
                crs : "EPSG:27572",
                type : "Metric",
                geoBBox : {
                    left : -4.87,
                    bottom : 42.33,
                    right : 8.23,
                    top : 51.14
                }
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
            for (var i = 0; i < projectionSystemsByDefault.length; i++ ) {
                this.addSystem(projectionSystemsByDefault[i]);
            }
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
     * @param {Object} coords - coordinatesobject {lon, lat}
     * @return {Object} coordinate - coordinate object : {lat : 48, lng : 2} par exemple
     * @private
     */
    MousePosition.prototype._displayDEC = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.roundToDecimal(coords.lat, 6);
        coordinate.lng = PositionFormater.roundToDecimal(coords.lon, 6);
        return coordinate;
    };

    /**
     * degreedecimal2sexagecimal
     *
     * @method _displayDMS
     * @param {Object} coords - coordinates object {lon, lat}
     * @return {Object} coordinate - coordinate object : {lng : "2° 00′ 00″ E", lat : "48° 00′ 00″ N"} par exemple
     * @private
     */
    MousePosition.prototype._displayDMS = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalLatToDMS(coords.lat);
        coordinate.lng = PositionFormater.decimalLongToDMS(coords.lon);
        return coordinate;
    };

    /**
     * degreedecimal2radian
     *
     * @method _displayRAD
     * @param {Object} coords - coordinates object {lon, lat}
     * @return {Object} coordinate - coordinate object : {lat : "0.02837864", lng : "0.84300269"} par exemple
     * @private
     */
    MousePosition.prototype._displayRAD = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalToRadian(coords.lat);
        coordinate.lng = PositionFormater.decimalToRadian(coords.lon);
        return coordinate;
    };

    /**
     * degreedecimal2grade
     *
     * @method _displayGON
     * @param {Object} coords - coordinates object {lon, lat}
     * @return {Object} coordinate - coordinate object : {lat : "4.09545898", lng : "53.68751528"} par exemple
     * @private
     */
    MousePosition.prototype._displayGON = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalToGrade(coords.lat);
        coordinate.lng = PositionFormater.decimalToGrade(coords.lon);
        return coordinate;
    };

    /**
     * meter
     *
     * @method _displayMeter
     * @param {Object} coords - coords object {lon, lat}
     * @return {Object} coordinate - coordinate object : {x : "148593.58", y : "6176560.95"} par exemple
     * @private
     */
    MousePosition.prototype._displayMeter = function (coords) {
        // on recoit toujours des coordonnées metriques
        var coordinate = {};
        coordinate.x = coords.lon.toFixed(2);
        coordinate.y = coords.lat.toFixed(2);
        coordinate.unit = "m";
        return coordinate;
    };

    /**
     * kilometer
     *
     * @method _displayKMeter
     * @param {Object} coords - coords object {lon, lat}
     * @return {Object} coordinate - coordinate object : {x : "214.96", y : "6250.09"} par exemple
     * @private
     */
    MousePosition.prototype._displayKMeter = function (coords) {
        var coordinate = {};
        coordinate.x = ( coords.lon / 1000 ).toFixed(2);
        coordinate.y = ( coords.lat / 1000 ).toFixed(2);
        coordinate.unit = "km";
        return coordinate;
    };

    // ################################################################### //
    // ##################### handlers events to control ################## //
    // ################################################################### //

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

        var position = this.getMap().pickPosition(e);
        if( !position ) {
            this.GPdisplayCoords( { lon: "---", lat: "---"} );
            this.GPresetElevation();
            return;
        }

        var coordinate = {
            lon: position.coordinate[0],
            lat: position.coordinate[1]
        }

        this._setCoordinate(coordinate);

        // calcul de l'altitude après un certain délai après l'arrêt du mouvement de la souris
        clearTimeout(this._timer);
        this._timer = setTimeout( function () {
            self.onMoveStopped(coordinate);
        }, this.options.altitude.triggerDelay);
    };

    /**
     * this method is an handler event to control. The event is 'moveend' on
     * the map. The handler sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @method onMapMove
     * @param {Object} e - HTMLElement
     * @private
     */
    MousePosition.prototype.onMapMove = function (e) {

        // var self = this;

        // info: coordinate = [x, y]
        // var coordinate = e.coordinate;
        // if ( !e.map || !e.map.getView() ) {
        //     return;
        // }
        // var crs = e.map.getView().getProjection();
        //
        // this._setCoordinate(coordinate, crs);
        //
        // // calcul de l'altitude après un certain délai après l'arrêt du mouvement de la carte
        // clearTimeout(this._timer);
        // this._timer = setTimeout( function () {
        //     self.onMoveStopped(coordinate, crs);
        // }, this.options.altitude.triggerDelay);
    };

    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @method _setCoordinate
     * @param {Array} coords - coordinate object {lon, lat}
     * @private
     */
    MousePosition.prototype._setCoordinate = function (coords) {

        // structure
        // coords
        //      {
        //          lon: 5,
        //          lat : 48
        //      }
        //
        // structure pour les coordonnées en fonctin du type demandé :
        // {x:, y:, unit:} ou {lng:, lat:} ou {lon:, lat:} ou {e:, n:, unit:}...

        var coord = [];
        var coordinates = {};

        // on projete le point dans le systeme demandé
        var oSrs = this._currentProjectionSystems;
        var crsProp = oSrs.crs;

        if (! oSrs || ! crsProp) {
            console.log("ERROR : system crs not found");
            return;
        }
        // on reprojette les coordonnées depuis leur CRS d'origine (WGS84) vers le CRS demandé (crsProp)
        if (crsProp !== "EPSG:4326") {
            coord = proj4(CRS[crsProp],[coords.lon, coords.lat]);
            // on affecte les valeurs projetées à coords
            coordinates.lon = coord[0];
            coordinates.lat = coord[1];
        } else {
            coordinates = coords;
        }

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
            coord = convert(coordinates);
        }

        if (! coord || Object.keys(coord).length === 0) {
            return;
        }

        this.GPdisplayCoords(coord);
    };

    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayElevation() into the DOM functions)
     *
     * @method _setElevation
     * @param {Object} coords - Coordinate position object {lon, lat}
     * @private
     */
    MousePosition.prototype._setElevation = function (coords) {
        // gestion du timer de la requete du service d'altitude
        var delay = this.options.altitude.responseDelay;
        this.GPdisplayElevation(coords, delay);
    };

    /**
     * this method is triggered when the mouse or the map is stopped.
     * (cf. onMouseMove and onMapMove)
     *
     * @method onMoveStopped
     * @param {Object} coords - Coordinate position object {lon, lat}
     * @private
     */
    MousePosition.prototype.onMoveStopped = function (coords) {
        this._setElevation(coords);
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

        if ( !coordinate || Object.keys(coordinate).length === 0 ) {
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
            document.getElementById(this._addUID("GPmousePositionAlt")).innerHTML = "No rights!";
            return;
        }

        // on recupere les options du service
        var options = this.options.altitude.serviceOptions || {};

        // ainsi que les coordonnées
        options.zonly = true;
        options.positions = [
            {
                lon : coordinate.lon,
                lat : coordinate.lat
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
        var mapDiv = map.getViewport();

        this.collapsed = this._showMousePositionContainer.checked;
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser mousePosition.on("change:collapsed", function(e) ) pour s'abonner à cet évènement)
        // FIXME this.dispatchEvent("change:collapsed");

        // evenement declenché à l'ouverture/fermeture du panneau,
        // et en fonction du mode : desktop ou tactile !
        if ( this._showMousePositionContainer.checked ) {
            // FIXME gérer ou non le cas mobile
            if (this._isDesktop) {
                mapDiv.removeEventListener("pointermove", this._callbacks.callbackMouseMove);
            } else {
                map.removeEventListener("centerchanged", this.onMapMove);
            }

        } else {
            // FIXME gérer ou non le cas mobile
            if (this._isDesktop) {
                mapDiv.addEventListener("pointermove", this._callbacks.callbackMouseMove);
            } else {
                map.addEventListener("centerchanged", this.onMapMove);
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

    return MousePosition;
});
