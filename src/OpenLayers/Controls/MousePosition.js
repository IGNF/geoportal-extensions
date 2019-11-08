// import CSS
import "../CSS/Controls/MousePosition/GPmousePositionOpenLayers.css";
// import OpenLayers
import Control from "ol/control/Control";
import Overlay from "ol/Overlay";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import {
    transform as olTransformProj,
    get as olGetProj,
    transformExtent as olTransformExtentProj
} from "ol/proj";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Logger from "../../Common/Utils/LoggerByDefault";
import Utils from "../../Common/Utils";
import Markers from "./Utils/Markers";
import RightManagement from "../../Common/Utils/CheckRightManagement";
import SelectorID from "../../Common/Utils/SelectorID";
import MathUtils from "../../Common/Utils/MathUtils";
import Draggable from "../../Common/Utils/Draggable";
// import defs proj4 manually (cf. line 125)
//  import Proj4 from "proj4";
//  import { register } from "ol/proj/proj4";
//  import Register from "../../Common/Utils/Register";
// import local with ol dependencies
import CRS from "../CRS/CRS";
// import "../CRS/AutoLoadCRS";

// DOM
import MousePositionDOM from "../../Common/Controls/MousePositionDOM";

var logger = Logger.getLogger("GeoportalMousePosition");

/**
 * @classdesc
 * MousePosition Control.
 *
 * @constructor
 * @alias ol.control.GeoportalMousePosition
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Boolean} [options.collapsed = true] - Specify if MousePosition control should be collapsed at startup. Default is true.
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
 * @param {Boolean} [options.editCoordinates = false] - If true, coordinates from the MousePosition control can be edited by users to re-center the view. False by default.
 * @param {Object} [options.positionMarker] - options for position marker
 * @param {String} options.positionMarker.url - Marker url (define in src/Openlayers/Controls/Utils/Markers.js)
 * @param {Array} options.positionMarker.offset - Offsets in pixels used when positioning the marker towards targeted point.
 *      The first element in the array is the horizontal offset. A positive value shifts the marker right.
 *      The second element in the array is the vertical offset. A positive value shifts the marker down. [0,0] value positions the top-left corner of the marker image to the targeted point.
 *      Default is offset associated to default marker image.
 * @param {Boolean} options.positionMarker.hide - if true, marker is not displayed, otherwise displayed (False by default.)
 * @param {Object}  [options.altitude] - elevation configuration
 * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
 * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
 * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
 * @param {Number}  [options.altitude.noDataValue] - value used for altitude service no data (default is -99999). In this case, "---m" will be displayed instead of "-99999m"
 * @param {Number}  [options.altitude.noDataValueTolerance] - tolerance for no data value :
 *                  values in [noDataValue + noDataValueTolerance ; noDataValue - noDataValueTolerance] interval will not be displayed, but "---m" will be displayed instead.
 *                  Default is 90000 (no data values = [-9999 ; -189999])
 *  @example
 *  var MousePosition = new ol.control.GeoportalMousePosition({
 *      "collapsed" : false,
 *      "graggable" : true,
 *      "displayCoordinates" : true,
 *      "displayAltitude" : true,
 *      "altitude" : {
 *           "triggerDelay" : 100,
 *           "responseDelay" : 500,
 *           "noDataValue" : -99999,
 *           "noDataValueTolerance" : 99000,
 *           "serviceOptions" : {}
 *      },
 *      "systems" : [
 *       {
 *          "crs" : "EPSG:3857",
 *          "label" : "Web Mercator",
 *          "type" : "Metric"
 *       },
 *       {
 *          "crs" : "EPSG:4326",
 *          "label" : "Géographiques",
 *          "type" : "Geographical"
 *       },
 *       {
 *           "label" : "Lambert 93",
 *           "crs" : "EPSG:2154",
 *           "type" : "Metric",
 *           "geoBBox" : {
 *               "left" : -9.86,
 *               "bottom" : 41.15,
 *               "right" : 10.38,
 *               "top" : 51.56
 *           }
 *        }
 *      ],
 *      "units" : ["DEC", "DMS"]
 * });
 */
var MousePosition = (function (Control) {
    function MousePosition (options) {
        options = options || {};

        if (!(this instanceof MousePosition)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // init Proj4 defs manually
        // Register.load(Proj4);
        // try {
        //     register(Proj4);
        // } catch (e) {}

        this._initialize(options);

        // init control DOM container
        var container = this._container = this._initContainer(options);

        // call ol.control.Control constructor
        Control.call(this, {
            element : container,
            target : options.target,
            render : options.render
        });
    };

    // Inherits from ol.control.Control
    if (Control) MousePosition.__proto__ = Control;

    /**
     * @lends module:GeoportalMousePosition
     */
    MousePosition.prototype = Object.create(Control.prototype, {});

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
     *
     * @param {Object} map - the map
     *
     */
    MousePosition.prototype.setMap = function (map) {
        var context = this;

        if (map) { // dans le cas de l'ajout du contrôle à la map
            var center = this._createMapCenter();
            map.getViewport().appendChild(center);
            if (!this.collapsed && !this._isDesktop) {
                center.className = "GPmapCenterVisible";
            }

            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this._panelMousePositionContainer,
                    this._panelHeaderMousePositionContainer,
                    map.getTargetElement()
                );
            }

            // on met en place l'evenement sur la carte pour recuperer les coordonnées,
            // on l'active à l'ouverture du panneau uniquement !
            if (!this.collapsed) {
                // evenement valable pour le mode desktop !
                if (this._isDesktop) {
                    this.listenerKey = map.on(
                        "pointermove",
                        (e) => { this.onMouseMove(e); }
                    );
                } else {
                    this.listenerKey = map.on(
                        "moveend",
                        (e) => this.onMapMove(e)
                    );
                }
            }

            // add overlay only if option editCoordinates is true
            if (this.options.editCoordinates) {
                // création de l'élément DOM
                var markerDiv = document.createElement("img");
                markerDiv.id = this._addUID("GPmousePositionMarker");
                markerDiv.src = this._markerUrl;
                markerDiv.title = "Cliquer pour supprimer";
                markerDiv.addEventListener("click", function () {
                    context._markerOverlay.setPosition(undefined);
                });

                this._markerOverlay = new Overlay({
                    offset : this._markerOffset,
                    element : markerDiv,
                    stopEvent : false
                });
                map.addOverlay(this._markerOverlay);
            }
        }

        // call original setMap method
        Control.prototype.setMap.call(this, map);

        // nothing else to do if map == null
        if (map == null) {
            return;
        }

        // mode "collapsed"
        if (!this.collapsed) {
            var inputShow = document.getElementById("GPshowMousePosition-" + this._uid);
            inputShow.checked = "checked";
            this._setElevationPanel(this.options.displayAltitude);
            this._setCoordinatesPanel(this.options.displayCoordinates);
            if (!this.options.displayCoordinates) {
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
        if (typeof system !== "object") {
            logger.log("[ERROR] MousePosition:addSystem - system parameter should be an object");
            return;
        }
        if (!system.crs) {
            logger.error("crs not defined !");
            return;
        }
        if (!system.label) {
            logger.warn("crs label not defined, use crs code by default.");
            system.label = system.crs;
        }
        if (!system.type) {
            logger.warn("type srs not defined, use 'Metric' by default.");
            system.type = "Metric";
        }

        // chargement de la definition de la projection
        // même si déjà chargé...
        CRS.loadByName(system.crs);

        if (!olGetProj(system.crs)) {
            logger.error("crs '{}' not available into proj4 definitions !", system.crs);
            return;
        }

        // 1. add system to control systems
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var obj = this._projectionSystems[j];
            if (system.crs === obj.crs) {
                // warn user
                logger.info("crs '{}' already configured", obj.crs);
            }
        }
        system.code = this._projectionSystems.length;
        this._projectionSystems.push(system);

        // 2. add system settings option to container (if it was already build)
        var selectSystem = document.getElementById("GPmousePositionProjectionSystem-" + this._uid);
        if (selectSystem) {
            var option = document.createElement("option");
            option.value = system.code;
            option.text = system.label;
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
        if (!systems) {
            return;
        }
        if (!Array.isArray(systems)) {
            logger.log("[ERROR] MousePosition:addSystems - systems parameter should be an array");
            return;
        }
        for (var i = 0; i < systems.length; i++) {
            this.addSystem(systems[i]);
        }
    };

    /**
     * Remove projection system (in case there are several system with same code, only the first one will be removed)
     *
     * @param {String} systemCrs - CRS alias (from proj4 defs)
     */
    MousePosition.prototype.removeSystem = function (systemCrs) {
        if (!systemCrs || typeof systemCrs !== "string") {
            logger.log("[ERROR] MousePosition:removeSystem - systemCode parameter should be a string");
            return;
        }

        var systemList = document.getElementById("GPmousePositionProjectionSystem-" + this._uid);

        var systemCode = null;
        // find system in control projection systems list
        for (var i = 0; i < this._projectionSystems.length; i++) {
            var proj = this._projectionSystems[i];
            if (systemCrs === proj.crs) {
                systemCode = proj.code;
                // remove system from control projection systems list
                this._projectionSystems.splice(i, 1);
                break;
            }
        }

        if (systemCode == null) {
            logger.log("[WARN] MousePosition:removeSystem - system not found");
            return;
        }

        /* re-initialization of codes */
        var oldNewCodeMap = [];

        for (var j = 0; j < this._projectionSystems.length; j++) {
            oldNewCodeMap[Number(this._projectionSystems[j].code)] = j;
            this._projectionSystems[j].code = j;
        }

        /* find system in control container systems list */
        var indexChildToRemove = null;

        for (var k = 0; k < systemList.childNodes.length; k++) {
            if (systemCode === systemList.childNodes[j].value) {
                indexChildToRemove = k;
                continue;
            }
            systemList.childNodes[j].value = oldNewCodeMap[Number(systemList.childNodes[j].value)];
        }
        /* remove system from control container systems list */
        if (indexChildToRemove != null) {
            systemList.removeChild(systemList.childNodes[indexChildToRemove]);
        }

        // choose arbitrarily a new current system if needed
        if (this._currentProjectionSystems.code === Number(systemCode)) {
            systemList.childNodes[0].setAttribute("selected", "selected");
            this._setCurrentSystem(systemList.childNodes[0].value);
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
        if (!units || !Array.isArray(units)) {
            return;
        }
        this.options.units = units;
        this._projectionUnits = [];
        this._initProjectionUnits();
        if (this._currentProjectionType) {
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
        if (!options || typeof options !== "object") {
            return;
        }
        this.options.altitude.triggerDelay = options.triggerDelay;
        this.options.altitude.responseDelay = options.responseDelay;
        if (options.serviceOptions) {
            for (var opt in options.serviceOptions) {
                if (options.serviceOptions.hasOwnProperty(opt)) {
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
        if (displayAltitude === undefined) {
            return;
        }
        if (typeof this._noRightManagement === "undefined") {
            this._checkRightsManagement();
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
        if (displayCoordinates === undefined) {
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
        if (collapsed === undefined) {
            logger.log("[ERROR] MousePosition:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (!this._isDesktop) {
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
        this.options.collapsed = (options.collapsed !== undefined) ? options.collapsed : true;
        /** {Boolean} specify if MousePosition control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        this.options.draggable = (options.draggable !== undefined) ? options.draggable : false;
        /** {Boolean} specify if MousePosition control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        // position marker
        this._markerOverlay = null;
        this._markerUrl = null;
        this._markerOffset = [0, 0];
        this._hideMarker = false;
        this._initMarker(options.positionMarker);

        this.options.units = options.units || [];
        this.options.displayAltitude = (options.displayAltitude !== undefined) ? options.displayAltitude : true;
        this.options.displayCoordinates = (options.displayCoordinates !== undefined) ? options.displayCoordinates : true;
        if (this.options.displayCoordinates) {
            this.options.editCoordinates = (options.editCoordinates !== undefined) ? options.editCoordinates : false;
        } else {
            // si les coordonnées ne sont pas affichées : pas besoin de les éditer...
            this.options.editCoordinates = false;
        }
        this.editing = false;

        this.options.systems = options.systems || [];
        if (options.altitude) {
            var altitude = options.altitude;
            this.options.altitude = {
                triggerDelay : (altitude.triggerDelay !== undefined) ? altitude.triggerDelay : 200,
                responseDelay : (altitude.responseDelay !== undefined) ? altitude.responseDelay : 500,
                serviceOptions : altitude.serviceOptions || {},
                noDataValue : (altitude.noDataValue !== undefined) ? altitude.noDataValue : -99999,
                noDataValueTolerance : (altitude.noDataValueTolerance !== undefined) ? altitude.noDataValueTolerance : 90000
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
        if (this.options.altitude.triggerDelay < 100) {
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
        this._panelMousePositionContainer = null;
        this._panelHeaderMousePositionContainer = null;

        // gestion de l'affichage du panneau de l'altitude
        if (!this.options.displayAltitude && !this.options.displayCoordinates) {
            // on reactive l'affichage des coordonnées, pour ne pas afficher un panneau vide !
            this.options.displayCoordinates = true;
        }

        // gestion des droits sur les ressources/services
        // si l'on souhaite un calcul d'altitude, on verifie les droits sur les ressources d'alti...
        if (this.options.displayAltitude) {
            this._checkRightsManagement();
        }

        // listener key for event on pointermove or moveend map
        this.listenerKey = null;
    };

    /**
     *
     * @param {Object} option - positionMarker option
     * @private
     */
    MousePosition.prototype._initMarker = function (option) {
        if (!this.options.editCoordinates) {
            return;
        }

        if (!option) {
            this._markerUrl = Markers["lightOrange"];
            this._markerOffset = Markers.defaultOffset;
            return;
        }

        // hide
        this._hideMarker = (option.hide !== undefined) ? option.hide : false;

        // offset
        if (option.offset) {
            if (Array.isArray(option.offset) && option.offset.length === 2) {
                this._markerOffset = option.offset;
            } else {
                logger.log("positionMarker.offset should be an array. e.g. : [0,0]");
                this._markerOffset = Markers.defaultOffset;
            }
        } else {
            this._markerOffset = Markers.defaultOffset;
        }

        var url = option.url;
        if (!url) {
            this._markerUrl = Markers["lightOrange"];
        } else if (url.match(/^[a-zA-Z]+$/)) { // un seul mot
            this._markerUrl = (Markers[url] !== undefined) ? Markers[url] : Markers["lightOrange"];
        } else {
            this._markerUrl = url;
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

        // FIXME doit on charger des projections par defaut dans ce composant ?
        // chargement des projections par defaut
        // CRS.loadByDefault();
        // CRS.overload();

        // systemes de projection disponible par defaut
        var projectionSystemsByDefault = [{
            label : "G\u00e9ographique",
            crs : olGetProj("EPSG:4326").getCode(),
            type : "Geographical"
        }, {
            label : "Web Mercator",
            crs : olGetProj("EPSG:3857").getCode(),
            type : "Metric"
        }, {
            label : "Lambert 93",
            crs : olGetProj("EPSG:2154").getCode(),
            type : "Metric",
            geoBBox : {
                left : -9.86,
                bottom : 41.15,
                right : 10.38,
                top : 51.56
            }
        }, {
            label : "Lambert II \u00e9tendu",
            crs : olGetProj("EPSG:27572").getCode(),
            type : "Metric",
            geoBBox : {
                left : -4.87,
                bottom : 42.33,
                right : 8.23,
                top : 51.14
            }
        }];

        var systems = this.options.systems;
        for (var i = 0; i < systems.length; i++) {
            /* definition d'un systeme de reference */
            var sys = systems[i];
            this.addSystem(sys);
        }

        if (this._projectionSystems.length === 0) {
            // on ajoute les systèmes de projections par défaut
            for (var j = 0; j < projectionSystemsByDefault.length; j++) {
                this.addSystem(projectionSystemsByDefault[j]);
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
            Geographical : [{
                code : "DEC",
                label : "degrés décimaux",
                format : this._displayDEC
            }, {
                code : "DMS",
                label : "degrés sexagésimaux",
                format : this._displayDMS
            }, {
                code : "RAD",
                label : "radians",
                format : this._displayRAD
            }, {
                code : "GON",
                label : "grades",
                format : this._displayGON
            }],
            Metric : [{
                code : "M",
                label : "mètres",
                format : this._displayMeter
            }, {
                code : "KM",
                label : "kilomètres",
                format : this._displayKMeter
            }]
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
                            if (!this._projectionUnits[type]) {
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
        if (typeof this._projectionUnits === "object" && Object.keys(this._projectionUnits).length === 0) {
            this._projectionUnits = projectionUnitsByDefault;
        }
    };

    /**
     * this method get label from the current projection units
     *
     * @method _getCurrentProjectionInformation
     *
     * @returns {String} projection information
     *
     * @private
     */
    MousePosition.prototype._getCurrentProjectionInformation = function () {
        var systemInfo = [
            this._currentProjectionSystems.label,
            "en"
        ];

        var units = this._projectionUnits[this._currentProjectionType];
        for (var u = 0; u < units.length; ++u) {
            if (units[u].code === this._currentProjectionUnits) {
                systemInfo.push(units[u].label);
                break;
            }
        }
        return systemInfo.join(" ");
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

        // pas de droit !
        if (!rightManagement) {
            this._noRightManagement = true;
            return;
        }

        // on recupère les informations utiles
        // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
        // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
        // été renseignée.
        if (!this.options.apiKey) {
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
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    MousePosition.prototype._initContainer = function () {
        // creation du container principal
        var container = this._createMainContainerElement();

        var inputShow = this._showMousePositionContainer = this._createShowMousePositionElement();
        container.appendChild(inputShow);

        var picto = this._createShowMousePositionPictoElement(this._isDesktop);
        container.appendChild(picto);

        var panel = this._panelMousePositionContainer = this._createMousePositionPanelElement();

        var header = this._panelHeaderMousePositionContainer = this._createMousePositionPanelHeaderElement();
        panel.appendChild(header);

        var basic = this._createMousePositionPanelBasicElement(
            this.options.displayAltitude,
            this.options.displayCoordinates,
            this.options.editCoordinates,
            this._currentProjectionUnits
        );
        panel.appendChild(basic);

        var arraySettings = this._createShowMousePositionSettingsElement(this.options.displayCoordinates);
        for (var j = 0; j < arraySettings.length; j++) {
            panel.appendChild(arraySettings[j]);
        }

        var settings = this._createMousePositionSettingsElement();
        var systems = this._projectionSystemsContainer = this._createMousePositionSettingsSystemsElement(this._projectionSystems);
        var units = this._projectionUnitsContainer = this._createMousePositionSettingsUnitsElement(this._projectionUnits[this._currentProjectionType]);
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

        if (!active) {
            div = document.getElementById("GPmousePositionAltitude-" + this._uid);
            div.style.display = "none";
        } else {
            if (this._noRightManagement) {
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
        var div = document.getElementById("GPmousePositionCoordinate-" + this._uid);
        if (!active) {
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
        var divPicto = document.getElementById("GPshowMousePositionSettingsPicto-" + this._uid);
        var divPanel = document.getElementById("GPmousePositionSettings-" + this._uid);
        if (!active) {
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
            option.text = obj.label || j;
            // option.label = obj.label;
            container.appendChild(option);
        }

        var projectionUnits = this._projectionUnits[type][0].code;

        if (this._currentProjectionUnits === "DMS" || projectionUnits === "DMS") {
            this._resetCoordinateElements(this.options.editCoordinates, type, projectionUnits);
            this._setEditMode(this.editing);
        }

        // le nouveau type de system ...
        this._currentProjectionType = type;

        // Mise a jour des elements labels et unites
        this._resetLabelElements(type);
        this._resetUnitElements(projectionUnits);

        // et comme on a changé de type de systeme,
        // il faut changer aussi d'unité !
        this._currentProjectionUnits = projectionUnits;
    };

    // ################################################################### //
    // ######################## method units format ###################### //
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
        coordinate.unit = "°";
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
        return {
            lng : MathUtils.decimalToDMS(olCoordinate[0], "EO", 2),
            lat : MathUtils.decimalToDMS(olCoordinate[1], "NS", 2),
            unit : "DMS"
        };
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
        coordinate.unit = "rad";
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
        coordinate.unit = "gon";
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
        coordinate.x = (olCoordinate[0] / 1000).toFixed(2);
        coordinate.y = (olCoordinate[1] / 1000).toFixed(2);
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
        if (!oSrs) {
            logger.log("ERROR : system crs not found");
            return;
        }
        // on reprojette les coordonnées depuis leur CRS d'origine (CRS) vers le CRS demandé (oSrs)
        olCoordinate = olTransformProj(olCoordinate, crs, oSrs);

        // type de systeme : Geographical ou Metric
        var type = this._currentProjectionSystems.type;

        // on recherche la fonction de formatage dans l'unité demandée
        var format = null;
        var units = this._projectionUnits[type];
        for (var i = 0; i < units.length; i++) {
            if (units[i].code === this._currentProjectionUnits) {
                format = units[i].format;
                break;
            }
        }
        if (!format || typeof format !== "function") {
            logger.log("WARNING : coordinates format function not found");
            return;
        } else {
            coordinate = format(olCoordinate);
        }

        if (!coordinate || Object.keys(coordinate).length === 0) {
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
        var oLatLng = olTransformProj(olCoordinate, crs, "EPSG:4326");
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
        if (!e.map || !e.map.getView()) {
            return;
        }
        var crs = e.map.getView().getProjection();

        this._setCoordinate(coordinate, crs);

        // calcul de l'altitude après un certain délai après l'arrêt du mouvement de la souris
        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
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
        if (!map || !map.getView()) {
            return;
        }
        var view = map.getView();
        var coordinate = view.getCenter();
        var crs = view.getProjection();

        this._setCoordinate(coordinate, crs);

        // calcul de l'altitude après un certain délai après l'arrêt du mouvement de la souris
        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
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
     * @param {Function} callback - callback
     * @private
     */
    MousePosition.prototype.onRequestAltitude = function (coordinate, callback) {
        // INFORMATION
        // on effectue la requête au service d'altitude...
        // on met en place des callbacks afin de recuperer les resultats ou
        // les messages d'erreurs du service.
        // le resultat est affiché dans une balise du dom.

        if (!coordinate || Object.keys(coordinate).length === 0) {
            return;
        }

        // si on ne veut pas de calcul d'altitude, on ne continue pas !
        if (!this.options.displayAltitude) {
            return;
        }

        // si on n'a pas les droits sur la ressource, pas la peine de
        // continuer !
        if (this._noRightManagement) {
            logger.log("[WARNING] contract key configuration has no rights to load geoportal elevation ");
            document.getElementById("GPmousePositionAlt-" + this._uid).innerHTML = "No rights!";
            return;
        }

        // on recupere les options du service
        var options = this.options.altitude.serviceOptions || {};

        // gestion du protocole et du timeout
        // le timeout est indispensable sur le protocole JSONP.
        var _protocol = options.protocol || "XHR";
        var _timeout = options.timeOut || 0;
        if (_protocol === "JSONP" && _timeout === 0) {
            _timeout = 15000;
        }

        // ainsi que les coordonnées
        var _zonly = true;
        var _positions = [{
            lon : coordinate[0],
            lat : coordinate[1]
        }];

        // et les callbacks
        var _scope = this;
        var _rawResponse = options.rawResponse || false;
        var _onSuccess = null;
        var _onFailure = null;

        if (!_rawResponse) {
            // dans le cas général
            // callback onSuccess
            _onSuccess = function (results) {
                if (results && Object.keys(results)) {
                    callback.call(this, results.elevations[0].z);
                }
            };
        } else {
            // callback onSuccess
            _onSuccess = function (results) {
                logger.log("alti service raw response : ", results);
            };
        }

        // callback onFailure
        _onFailure = function (error) {
            logger.log("[getAltitude] ERROR : " + error.message);
        };

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
        var _apiKey = options.apiKey || this.options.apiKey;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        var _ssl = options.ssl || this.options.ssl || true;

        Gp.Services.getAltitude({
            apiKey : _apiKey,
            protocol : _protocol,
            ssl : _ssl,
            timeOut : _timeout,
            scope : _scope,
            rawResponse : _rawResponse,
            onSuccess : _onSuccess,
            onFailure : _onFailure,
            zonly : _zonly,
            positions : _positions
        });
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
        if (this._showMousePositionContainer.checked) {
            if (this._isDesktop) {
                // map.un("pointermove", (e) => { this.onMouseMove(e); });
                olObservableUnByKey(this.listenerKey);
            } else {
                // map.un("moveend", (e) => this.onMapMove(e));
                olObservableUnByKey(this.listenerKey);
            }
        } else if (!this.editing) {
            if (this._isDesktop) {
                this.listenerKey = map.on("pointermove", (e) => { this.onMouseMove(e); });
            } else {
                this.listenerKey = map.on("moveend", (e) => this.onMapMove(e));
                // on simule un deplacement en mode tactile
                this.onMapMove();
            }
        }

        // FIXME
        // on gère l'affichage des panneaux ici..., même si ce n'est pas l'endroit
        // adequate...
        this._setElevationPanel(this.options.displayAltitude);
        this._setCoordinatesPanel(this.options.displayCoordinates);
        if (!this.options.displayCoordinates) {
            this._setSettingsPanel(false);
        }
    };

    /**
     * this method is called by event 'click' on 'GPshowMousePositionPicto' tag label
     * (cf. this._createShowMousePositionPictoElement),
     * and toggles event 'mousemove' on map.
     *
     * @method onShowMousePositionSettingsClick
     * @param {Object} e - HTMLElement
     * @private
     */
    MousePosition.prototype.onShowMousePositionSettingsClick = function (e) {
        if (!this.draggable) {
            this._panelMousePositionContainer.style.transition = "top 0.5s ease-out 0s";
            this._panelMousePositionContainer.style.transitionProperty = "top";
            this._panelMousePositionContainer.style.transitionDuration = "0.5s";
            this._panelMousePositionContainer.style.transitionTimingFunction = "ease-out";
            this._panelMousePositionContainer.style.transitionDelay = "0s";
            var height = -95;
            var top = this._panelMousePositionContainer.offsetTop;
            if (!document.getElementById(e.target.htmlFor).checked) {
                this._panelMousePositionContainer.style.top = top + height + "px";
            } else {
                this._panelMousePositionContainer.style.top = top - height + "px";
            }
        }
    };

    /**
     * this method is called by event 'click' on input coordinate
     *
     * @method onMousePositionEditModeClick
     * @param {Boolean} editing - editing mode
     */
    MousePosition.prototype.onMousePositionEditModeClick = function (editing) {
        if (!this.options.editCoordinates) {
            return;
        }
        if (this.editing === editing) {
            return;
        }

        this.editing = editing;

        // Affichage des outils, input en ecriture
        this._setEditMode(this.editing);

        var map = this.getMap();
        if (this._isDesktop) {
            if (this.editing) { // Unlisten for 'pointermove' events
                // map.un("pointermove", (e) => { this.onMouseMove(e); });
                olObservableUnByKey(this.listenerKey);
            } else { // Listen for 'pointermove' events
                this.listenerKey = map.on("pointermove", (e) => { this.onMouseMove(e); });
                // on simule un deplacement
                this.onMapMove();
            }
        } else {
            if (this.editing) { // Unlisten for 'moveend' events
                // map.un("moveend", (e) => this.onMapMove(e));
                olObservableUnByKey(this.listenerKey);
            } else { // Listen for moveend' events
                this.listenerKey = map.on("moveend", (e) => this.onMapMove(e));
                // on simule un deplacement
                this.onMapMove();
            }
        }

        // clear _markerOverlay
        if (!this.editing && this._markerOverlay) {
            this._markerOverlay.setPosition(undefined);
        }
    };

    /**
     * Get coordinate from inputs and select in decimal degrees
     *
     * @method getCoordinate
     * @param {String} coordType - "Lon" or "Lat"
     * @returns {undefined}
     * @private
     */
    MousePosition.prototype.getCoordinate = function (coordType) {
        var inputDegrees = document.getElementById(this._addUID("GPmousePosition" + coordType + "Degrees"));
        var degrees = inputDegrees.value;
        if (!degrees) {
            return null;
        }

        degrees = degrees.replace(",", ".");
        if (!MathUtils.isInteger(degrees)) {
            return null;
        }

        var result = MathUtils.toInteger(degrees);
        if (result < Number(inputDegrees.dataset.min) || result > Number(inputDegrees.dataset.max)) {
            return null;
        }

        var direction = document.getElementById(this._addUID("GPmousePosition" + coordType + "Direction")).value;

        var inputMinutes = document.getElementById(this._addUID("GPmousePosition" + coordType + "Minutes"));
        var minutes = inputMinutes.value;
        if (minutes) {
            minutes = minutes.replace(",", ".");
            if (MathUtils.isInteger(minutes)) {
                var mins = MathUtils.toInteger(minutes);
                if (mins >= Number(inputMinutes.dataset.min) && mins <= Number(inputMinutes.dataset.max)) {
                    result += (mins / 60);
                }
            }
        }

        var inputSeconds = document.getElementById(this._addUID("GPmousePosition" + coordType + "Seconds"));
        var seconds = inputSeconds.value;
        if (seconds) {
            seconds = seconds.replace(",", ".");
            var secs = MathUtils.toFloat(seconds);
            if (secs && secs >= Number(inputSeconds.dataset.min) && secs <= Number(inputSeconds.dataset.max)) {
                result += (secs / 3600);
            }
        }

        if (direction === "O" || direction === "S") {
            result = -result;
        }

        return result;
    };

    /**
     * locate DMS coordinates on map
     *
     * @method locateDMSCoordinates
     * @private
     */
    MousePosition.prototype.locateDMSCoordinates = function () {
        var lonlat = [
            this.getCoordinate("Lon"),
            this.getCoordinate("Lat")
        ];

        if (lonlat[0] === null || lonlat[1] === null) {
            return;
        }

        var oSrs = this._currentProjectionSystems.crs;
        if (!oSrs) {
            logger.log("ERROR : system crs not found");
            return;
        }

        var view = this.getMap().getView();

        var coordinate = olTransformProj(lonlat, oSrs, view.getProjection());
        view.setCenter(coordinate);

        if (this._markerOverlay && !this._hideMarker) {
            this._markerOverlay.setPosition(coordinate);
        }
    };

    /**
     * locate coordinates on map (not DMS)
     *
     * @method locateCoordinates
     * @private
     */
    MousePosition.prototype.locateCoordinates = function () {
        var lon = document.getElementById(this._addUID("GPmousePositionLon")).value;

        lon = lon.replace(",", ".");
        lon = MathUtils.toFloat(lon);
        if (lon === null) {
            return;
        }

        var lat = document.getElementById(this._addUID("GPmousePositionLat")).value;
        lat = lat.replace(",", ".");
        lat = MathUtils.toFloat(lat);
        if (lat === null) {
            return;
        }

        var oSrs = this._currentProjectionSystems.crs;
        if (!oSrs) {
            logger.log("ERROR : system crs not found");
            return;
        }

        var xy;
        if (this._currentProjectionSystems.type === "Geographical") {
            xy = [this.convert(lon), this.convert(lat)];
        } else {
            xy = [this.convert(lat), this.convert(lon)];
        }
        var xyWGS84 = olTransformProj(xy, this._currentProjectionSystems.crs, "EPSG:4326");

        var geoBBox = this._currentProjectionSystems.geoBBox;
        if (geoBBox) { // check if coordinates are in the extent
            var extent = [geoBBox.left, geoBBox.bottom, geoBBox.right, geoBBox.top];
            if (xyWGS84[0] < extent[0] || xyWGS84[0] > extent[2]) {
                return;
            }
            if (xyWGS84[1] < extent[1] || xyWGS84[1] > extent[3]) {
                return;
            }
        }

        var view = this.getMap().getView();

        var coordinate = olTransformProj(xy, oSrs, view.getProjection());
        view.setCenter(coordinate);

        if (this._markerOverlay && !this._hideMarker) {
            this._markerOverlay.setPosition(coordinate);
        }
    };

    /**
     * locate coordinates on map
     *
     * @method locate
     * @private
     */
    MousePosition.prototype.onMousePositionEditModeLocateClick = function () {
        if (!this.options.editCoordinates) {
            return;
        }
        if (!this.editing) {
            this.onMousePositionEditModeClick(true);
            return;
        }

        if (this._currentProjectionUnits === "DMS") {
            this.locateDMSCoordinates();
        } else {
            this.locateCoordinates();
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
        var idx = e.target.selectedIndex; // index
        var value = e.target.options[idx].value; // crs

        this._setCurrentSystem(value);
    };

    /**
     * this method selects the current system projection.
     *
     * @method _setCurrentSystem
     * @param {String} systemCode - inner code (rank in array _projectionSystems)
     * @private
     */
    MousePosition.prototype._setCurrentSystem = function (systemCode) {
        // si on change de type de systeme, on doit aussi changer le type d'unités !
        var type = null;
        for (var i = 0; i < this._projectionSystems.length; ++i) {
            if (this._projectionSystems[i].code === Number(systemCode)) {
                type = this._projectionSystems[i].type;
                break;
            }
        }

        if (!type) {
            logger.log("system not found in projection systems container");
            return;
        }

        // on enregistre le systeme courant
        this._currentProjectionSystems = this._projectionSystems[Number(systemCode)];

        if (type !== this._currentProjectionType) {
            this._setTypeUnitsPanel(type);
        }

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
        logger.trace(e);

        // map infos
        var map = this.getMap();
        if (!map || !map.getView()) {
            return;
        }
        var view = map.getView();
        var crs = view.getProjection();
        var mapExtent = view.calculateExtent(map.getSize());

        // get extent in WGS84 coordinates
        mapExtent = olTransformExtentProj(mapExtent, crs, "EPSG:4326");

        /* clear select */
        var systemList = document.getElementById(this._addUID("GPmousePositionProjectionSystem"));
        systemList.innerHTML = "";

        // add systems whose extent intersects the map extent
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var proj = this._projectionSystems[j];
            var option = null;

            if (proj.geoBBox) {
                /* bboxes intersection test */
                if (mapExtent[0] > proj.geoBBox.right ||
                    mapExtent[1] > proj.geoBBox.top ||
                    mapExtent[2] < proj.geoBBox.left ||
                    mapExtent[3] < proj.geoBBox.bottom
                ) {
                    if (proj === this._currentProjectionSystems) {
                        option = document.createElement("option");
                        option.value = proj.code;
                        option.text = proj.label || j;
                        option.setAttribute("selected", "selected");
                        option.setAttribute("disabled", "disabled");

                        systemList.appendChild(option);
                    }
                    continue; // do not intersect
                }
            }

            var optionElement = document.createElement("option");
            optionElement.value = proj.code;
            optionElement.text = proj.label || j;

            if (proj === this._currentProjectionSystems) {
                optionElement.setAttribute("selected", "selected");
            }
            systemList.appendChild(optionElement);
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
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;

        var oldProjectionUnits = this._currentProjectionUnits;
        this._currentProjectionUnits = value;

        // Mise a jour des elements lebels et unites
        this._resetLabelElements(this._currentProjectionType);
        this._resetUnitElements(this._currentProjectionUnits);

        // mise a jour des inputs pour les coordonnees
        if (oldProjectionUnits === "DMS" || this._currentProjectionUnits === "DMS") {
            this._resetCoordinateElements(this.options.editCoordinates, this._currentProjectionType, this._currentProjectionUnits);
            this._setEditMode(this.editing);
        }

        // on simule un deplacement en mode tactile pour mettre à jour les
        // resultats
        if (!this._isDesktop) {
            this.onMapMove();
        }
    };

    /**
     *
     * @param {Number} value - value to convert (km to meters, radians, grades to decimal degrees)
     * @returns {undefined}
     * @private
     */
    MousePosition.prototype.convert = function (value) {
        var result;
        if (this._currentProjectionUnits === "M" || this._currentProjectionUnits === "DEC") {
            result = value;
        } else if (this._currentProjectionUnits === "KM") {
            result = value * 1000;
        } else if (this._currentProjectionUnits === "RAD") {
            var rd = (180 / Math.PI).toFixed(20);
            result = (value * rd).toFixed(20);
        } else if (this._currentProjectionUnits === "GON") {
            var d = (9 / 10).toFixed(20);
            result = (value * d).toFixed(20);
        }

        return result;
    };

    /**
     * @param {String} coordType - "Lon" or "Lat"
     * @param {String} value - input value
     *
     * @returns {Boolean} value is within extent
     *
     * @private
     */
    MousePosition.prototype.validateExtentCoordinate = function (coordType, value) {
        if (["Lon", "Lat"].indexOf(coordType) === -1) {
            return false;
        }

        var coord = value.replace(",", ".");
        coord = MathUtils.toFloat(coord);
        if (coord === null) {
            return false;
        }

        // convert depending on _currentProjectionUnits
        coord = this.convert(coord);

        var geoBBox = this._currentProjectionSystems.geoBBox;
        if (geoBBox === undefined) {
            return true;
        }

        // convert to current projection system
        var extent = [geoBBox.left, geoBBox.bottom, geoBBox.right, geoBBox.top];
        extent = olTransformExtentProj(extent, "EPSG:4326", this._currentProjectionSystems.crs);

        // checking if value is in the right interval
        if (coordType === "Lat" && (coord < extent[0] || coord > extent[2])) {
            return false;
        }
        if (coordType === "Lon" && (coord < extent[1] || coord > extent[3])) {
            return false;
        }

        return true;
    };

    return MousePosition;
}(Control));

export default MousePosition;

// Expose MousePosition as ol.control.MousePosition (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GeoportalMousePosition = MousePosition;
}
