import proj4 from "proj4";
import Logger from "../../Common/Utils/LoggerByDefault";
import Gp from "geoportal-access-lib";
import GlobeViewExtended from "../GlobeViewExtended";
import Utils from "../../Common/Utils";
import RightManagement from "../../Common/Utils/CheckRightManagement";
import SelectorID from "../../Common/Utils/SelectorID";
import MousePositionDOM from "../../Common/Controls/MousePositionDOM";
import Widget from "./Widget";
import PositionFormater from "./Utils/PositionFormater";
import CRS from "../CRS/CRS";

var logger = Logger.getLogger("MousePosition");

/**
 * @classdesc
 *
 * MousePosition Control.
 *
 * @constructor
 * @alias itowns.control.MousePosition
 * @extends {itowns.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
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
 * @param {Object}  [options.altitude] - elevation configuration
 * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
 * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
 * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the globe to trigger the elevation calculation, 200 ms by default
 * @example
 *  var mousePosition = new itowns.control.MousePosition({
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
 *          crs : "EPSG:32620",
 *          label : "UTM 20N (Guadeloupe, Martinique)",
 *          type : "Metric",
 *          geoBBox : {
 *              left: -66.00,
 *              bottom : 0.00,
 *              right : -60.00,
 *              top : 84.00
 *          }
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

    if (options && typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    this._initialize(options);

    this._callbacks = {};

    // init control DOM container
    var container = this._initContainer(options);
    var targetDiv = document.getElementById(options.target) || null;
    Widget.call(
        this, {
            name : "MousePosition",
            element : container,
            target : targetDiv
        }
    );
};

/**
 * @lends module:MousePosition
 */
MousePosition.prototype = Object.create(Widget.prototype, {});

Utils.assign(MousePosition.prototype, MousePositionDOM);

/**
 * Constructor (alias)
 */
MousePosition.prototype.constructor = MousePosition;

/**
 * Bind globe to control
 *
 * @param {GlobeViewExtended} globe - the globe
 */
MousePosition.prototype.setGlobe = function (globe) {
    if (globe) { // In the case of the adding of a control to the globe
        this._centerElement = this._createMapCenter();
        globe.getTargetElement().appendChild(this._centerElement);

        // defines the callback on the map to retrieve the coordinates
        this._callbacks.mouseMove = this.onMouseMove.bind(this);

        // valid event for desktop mode
        if (!this.collapsed) {
            if (this._isDesktop) {
                globe.listen(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
            } else {
                globe.listen(GlobeViewExtended.EVENTS.CENTER_CHANGED, this.onGlobeMove);
            }
        }
    } else if (globe == null) { // if globe == null we remove the MP control
        // deletes the listener associated to the mousePosition control
        this._globe.forget(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
        // deletes the mousePosition control DOM
        while (this.getElement().hasChildNodes()) {
            this.getElement().removeChild(this.getElement().lastChild);
        }
        this.getElement().parentNode.removeChild(this.getElement());
        this._globe.getTargetElement().removeChild(this._centerElement);
    }
    // call original setGlobe method
    Widget.prototype.setGlobe.call(this, globe);
};

// ################################################################### //
// #################### user interface methods ####################### //
// ################################################################### //

/**
 * Sets additional projection system
 *
 * @param {Object} system - Projection system defined in the Itowns/CRS/CRS.js class
 * @param {String} system.crs - Proj4 crs alias (from proj4 defs) e.g. "EPSG:4326"
 * @param {String} [system.label] - CRS label to be displayed in control. Default is system.crs alias
 * @param {String} [system.type] - CRS units type for coordinates conversion (one of control options.units). Default is "Metric"
 */
MousePosition.prototype.addSystem = function (system) {
    if (typeof system !== "object") {
        logger.error("MousePosition:addSystem - system parameter should be an object");
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

    // 1. adds system to control systems
    for (var j = 0; j < this._projectionSystems.length; j++) {
        var obj = this._projectionSystems[j];
        if (system.crs === obj.crs) {
            // warn user
            logger.warn("crs '{}' already configured", obj.crs);
        }
    }

    system.code = this._projectionSystems.length;
    this._projectionSystems.push(system);

    // 2. adds system settings option to container (if it was already build)
    var selectSystem = document.getElementById(this._addUID("GPmousePositionProjectionSystem"));
    if (selectSystem) {
        var option = document.createElement("option");
        option.value = system.code;
        option.text = system.label;
        selectSystem.appendChild(option);
    }
};

/**
 * Sets additional projection systems
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
        logger.error("MousePosition:addSystems - systems parameter should be an array");
        return;
    }
    for (var i = 0; i < systems.length; i++) {
        this.addSystem(systems[i]);
    }
};

/**
 * Removes projection system (in case there are several system with same code, only the first one will be removed)
 *
 * @param {String} systemCrs - CRS alias (from proj4 defs)
 */
MousePosition.prototype.removeSystem = function (systemCrs) {
    if (!systemCrs || typeof systemCrs !== "string") {
        logger.error("MousePosition:removeSystem - systemCode parameter should be a string");
        return;
    }

    var systemCode = null;
    // finds system in control projection systems list
    for (var i = 0; i < this._projectionSystems.length; i++) {
        var proj = this._projectionSystems[i];
        if (systemCrs === proj.crs) {
            systemCode = proj.code;
            // removes system from control projection systems list
            this._projectionSystems.splice(i, 1);
            break;
        }
    }

    if (systemCode == null) {
        logger.warn("MousePosition:removeSystem - system not found");
        return;
    }

    // re-initialization of codes
    var oldNewCodeGlobe = [];
    for (var ii = 0; ii < this._projectionSystems.length; ii++) {
        oldNewCodeGlobe[Number(this._projectionSystems[ii].code)] = ii;
        this._projectionSystems[ii].code = ii;
    }

    // finds system in control container systems list
    var indexChildToRemove = null;
    var systemList = document.getElementById(this._addUID("GPmousePositionProjectionSystem"));
    for (var j = 0; j < systemList.childNodes.length; j++) {
        if (systemCode === systemList.childNodes[j].value) {
            indexChildToRemove = j;
            continue;
        }
        systemList.childNodes[j].value = oldNewCodeGlobe[Number(systemList.childNodes[j].value)];
    }
    // removes system from control container systems list
    if (indexChildToRemove != null) {
        systemList.removeChild(systemList.childNodes[indexChildToRemove]);
    }

    // choose arbitrarily a new current system if needed
    if (this._currentProjectionSystems.code === systemCode) {
        systemList.childNodes[0].setAttribute("selected", "selected");
        this._setCurrentSystem(systemList.childNodes[0].value);
    }
};

/**
 * Sets control units (to be displayed)
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
    this._projectionUnits = {};
    this._initProjectionUnits();
    if (this._currentProjectionType) {
        this._setTypeUnitsPanel(this._currentProjectionType);
    }
};

/**
 * Sets control altitude options (useless if displayAltitude == false)
 *
 * @param {Object} options - altitude options
 * @param {Object}  [options.serviceOptions] - options of elevation service
 * @param {Number}  [options.responseDelay] - latency for elevation request, 500 ms by default
 * @param {Number}  [options.triggerDelay] - immobilisation time of movement on the globe to trigger the elevation calculation, 200 ms by default
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
 * Displays or hides elevation panel
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
 * Displays or hides coordinates panel
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
 * Collapses or displays control main container
 *
 * @param {Boolean} collapsed - True to collapse control, False to display it
 */
MousePosition.prototype.setCollapsed = function (collapsed) {
    if (collapsed === undefined) {
        logger.error("MousePosition:setCollapsed - missing collapsed parameter");
        return;
    }
    if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
        return;
    }
    if (!this._isDesktop) {
        document.getElementById(this._addUID("GPmapCenter")).className = collapsed ? "" : "GPmapCenterVisible";
    }
    // simulates the opening of the panel after a click
    this.onShowMousePositionClick();
    this._showMousePositionContainer.checked = !collapsed;
};

// ################################################################### //
// ######################## initialize control ####################### //
// ################################################################### //

/**
 * Initializes control (called by MousePosition constructor)
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
    this.options.units = options.units || [];
    this.options.displayAltitude = (options.displayAltitude !== undefined) ? options.displayAltitude : true;
    this.options.displayCoordinates = (options.displayCoordinates !== undefined) ? options.displayCoordinates : true;
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

    // id of the widget : usefull to suffix the CSS ids (to handle cases with several widgets on the same page)
    this._uid = SelectorID.generate();

    // initialization of the projections systems
    this._projectionSystems = [];
    this._initProjectionSystems();

    // initialization of the units systems
    this._projectionUnits = {};
    this._initProjectionUnits();

    // support detect : desktop or tactile
    this._isDesktop = Utils.detectSupport();

    // implements a timer threshold
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

    // management of the altitude panel display
    if (!this.options.displayAltitude && !this.options.displayCoordinates) {
        // reactivate the display of coordinates, to not display an empty panel
        this.options.displayCoordinates = true;
    }

    // rights management on resources and services
    // if we want an altitude calculation, we check the alti resources rights...
    if (this.options.displayAltitude) {
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
    // user has the possibility to modify the list of systems to display
    // Ex. this.options.systems

    // available projection systems vy default
    var projectionSystemsByDefault = [{
        label : "Géographique",
        crs : "EPSG:4326",
        type : "Geographical"
    }, {
        label : "Mercator",
        crs : "EPSG:3857",
        type : "Metric"
    }, {
        label : "Lambert 93",
        crs : "EPSG:2154",
        type : "Metric",
        geoBBox : {
            left : -9.86,
            bottom : 41.15,
            right : 10.38,
            top : 51.56
        }
    }, {
        label : "Lambert II étendu",
        crs : "EPSG:27572",
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
        // definition of a reference system
        var sys = systems[i];
        this.addSystem(sys);
    }

    if (this._projectionSystems.length === 0) {
        // we add the default projection systems
        for (var ii = 0; ii < projectionSystemsByDefault.length; ii++) {
            this.addSystem(projectionSystemsByDefault[ii]);
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
    // user has the possibility to modify the list of units to display
    // Ex.
    // this.options.units : ["DEC", "DMS"]

    // available units systems by default
    var projectionUnitsByDefault = {
        Geographical : [{
            code : "DEC",
            label : "degrés décimaux",
            convert : this._displayDEC
        }, {
            code : "DMS",
            label : "degrés sexagésimaux",
            convert : this._displayDMS
        }, {
            code : "RAD",
            label : "radians",
            convert : this._displayRAD
        }, {
            code : "GON",
            label : "grades",
            convert : this._displayGON
        }],
        Metric : [{
            code : "M",
            label : "mètres",
            convert : this._displayMeter
        }, {
            code : "KM",
            label : "kilomètres",
            convert : this._displayKMeter
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

    // in case of...
    if (typeof this._projectionUnits === "object" && Object.keys(this._projectionUnits).length === 0) {
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

    this._noRightManagement = !rightManagement;

    // retrieves the usefull infos
    // on this control, we do not care about the ressource bescause it is unique
    // Ex : the API key from the autoconfiguration if it has not been given
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
 * @param {Object} options - options
 * @param {Boolean} options.collapsed - Specify if MousePosition control should be collapsed
 * @param {Array}   options.displayAltitude - activate (true) or deactivate (false) the altitude panel
 * @param {Array}   options.displayCoordinates - activate (true) or deactivate (false) the coordinates panel
 * @returns {DOMElement} container - widget container
 * @private
 */
MousePosition.prototype._initContainer = function (options) {
    // creates the main container
    var container = this._createMainContainerElement();

    var inputShow = this._showMousePositionContainer = this._createShowMousePositionElement();
    if (!options.collapsed) {
        inputShow.checked = "checked";
    }
    container.appendChild(inputShow);

    var picto = this._createShowMousePositionPictoElement(this._isDesktop);
    container.appendChild(picto);

    var panel = this._createMousePositionPanelElement();

    var header = this._createMousePositionPanelHeaderElement();
    panel.appendChild(header);

    var basic = this._createMousePositionPanelBasicElement(
        options.displayAltitude,
        options.displayCoordinates
    );
    panel.appendChild(basic);

    var arraySettings = this._createShowMousePositionSettingsElement(options.displayCoordinates);
    for (var j = 0; j < arraySettings.length; j++) {
        panel.appendChild(arraySettings[j]);
    }

    var settings = this._createMousePositionSettingsElement(options.displayCoordinates);
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

    // deletes the childNodes
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

    // the new type of system
    this._currentProjectionType = type;
    // as the system changed, the unit system has to change too !
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
    coordinate.x = (coords.lon / 1000).toFixed(2);
    coordinate.y = (coords.lat / 1000).toFixed(2);
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
    // structure for the coordinates depending on the system type :
    // {x:, y:, unit:} or {lng:, lat:} or {lon:, lat:} or {e:, n:, unit:}...

    var coord = [];
    var coordinates = {};

    // transforms the point in the wanted coords system
    var oSrs = this._currentProjectionSystems;
    var crsProp = oSrs.crs;

    if (!oSrs || !crsProp) {
        logger.error("system crs not found");
        return;
    }
    // reproject coordinates from their CRS of origin (WGS84) to the wanted CRS (crsProp)
    if (crsProp !== "EPSG:4326") {
        coord = proj4(CRS[crsProp], [coords.lon, coords.lat]);
        // projected values are affected to the coord var
        coordinates.lon = coord[0];
        coordinates.lat = coord[1];
    } else {
        coordinates = coords;
    }

    // system type : Geographical or Metric

    var type = this._currentProjectionSystems.type;

    // checks for a formatting function in the wanted unit
    var convert = null;
    var units = this._projectionUnits[type];

    for (var i = 0; i < units.length; i++) {
        if (units[i].code === this._currentProjectionUnits) {
            convert = units[i].convert;
            break;
        }
    }
    if (!convert || typeof convert !== "function") {
        logger.warn("coordinates format function not found");
        return;
    } else {
        coord = convert(coordinates);
    }

    if (!coord || Object.keys(coord).length === 0) {
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
    // management of the timer of the altitude service request
    var delay = this.options.altitude.responseDelay;
    this.GPdisplayElevation(coords, delay);
};

/**
 * this method is triggered when the mouse or the globe is stopped.
 * (cf. onMouseMove and onGlobeMove)
 *
 * @method onMoveStopped
 * @param {Object} coords - Coordinate position object {lon, lat}
 * @private
 */
MousePosition.prototype.onMoveStopped = function (coords) {
    this._setElevation(coords);
};

/**
 * this method is an handler event to control. The event is 'mousemove' on
 * the globe. The handler sends the coordinates to the panel.
 * (cf. this.GPdisplayCoords() into the DOM functions)
 *
 * @method onMouseMove
 * @param {Object} e - HTMLElement
 * @private
 */
MousePosition.prototype.onMouseMove = function (e) {
    var self = this;

    var position = this.getGlobe().getCoordinateFromMouseEvent(e);
    if (!position) {
        this.GPdisplayCoords({
            lon : "---",
            lat : "---"
        });
        this.GPresetElevation();
        return;
    }

    var coordinate = {
        lon : position.x,
        lat : position.y
    };

    this._setCoordinate(coordinate);

    // calculation of the altitude after a time limit from the moment where the mouse movement is stopped
    if (this.options.displayAltitude) {
        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
            self.onMoveStopped(coordinate);
        }, this.options.altitude.triggerDelay);
    }
};

/**
 * this method is an handler event to control. The event is 'moveend' on
 * the globe. The handler sends the coordinates to the panel.
 * (cf. this.GPdisplayCoords() into the DOM functions)
 *
 * @method onGlobeMove
 * @private
 */
MousePosition.prototype.onGlobeMove = function () {

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

// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

/**
 * this method is called by this.GPdisplayElevation() in the dom, and
 * it executes a request to the elevation service.
 *
 * @method onRequestAltitude
 * @param {Object} coordinate - {lat:..., lng:...}
 * @param {Function} callback - function callback
 * @private
 */
MousePosition.prototype.onRequestAltitude = function (coordinate, callback) {
    // INFORMATION
    // we launch the request to the altitude services
    // we implement callbacks in order to retrieve results or errors
    // from the service.
    // The result is displayed in a DOM element.
    // The error messages are display in the dev console (?)

    if (!coordinate || Object.keys(coordinate).length === 0) {
        return;
    }

    // if we do not want any altitude calculation, we just stop !
    if (!this.options.displayAltitude) {
        return;
    }

    // if we don not have the rights on the requested resource, we just stop !
    if (this._noRightManagement) {
        logger.warn("contract key configuration has no rights to load geoportal elevation ");
        document.getElementById(this._addUID("GPmousePositionAlt")).innerHTML = "No rights!";
        return;
    }

    // we retrieve the service options...
    var options = this.options.altitude.serviceOptions || {};

    // ... and the coordinates...
    options.zonly = true;
    options.positions = [{
        lon : coordinate.lon,
        lat : coordinate.lat
    }];

    // ... and the callbacks
    options.scope = this;

    if (!options.rawResponse) {
        // in the general case
        options.onSuccess = function (results) {
            if (results && Object.keys(results)) {
                callback.call(this, results.elevations[0].z);
            }
        };
    } else {
        options.onSuccess = function (results) {
            logger.info("alti service raw response : ", results);
        };
    }

    options.onFailure = function (error) {
        logger.error("[getAltitude] " + error.message);
    };
    // in the case of the API key is not given as option of the service,
    // we use the key of the autoconf, or the key given in the control options
    options.apiKey = options.apiKey || this.options.apiKey;

    // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
    // true par défaut (https)
    options.ssl = this.options.ssl;

    Gp.Services.getAltitude(options);
};

/**
 * this method is called by event 'click' on 'GPshowMousePositionPicto' tag label
 * (cf. this._createShowMousePositionPictoElement),
 * and toggles event 'mousemove' on globe.
 *
 * @method onShowMousePositionClick
 * @private
 */
MousePosition.prototype.onShowMousePositionClick = function () {
    // checked : true - panel close
    // checked : false - panel open
    var globe = this.getGlobe();

    this.collapsed = this._showMousePositionContainer.checked;

    // event triggered when opening/closing the panel
    // and depending on the mode : desktop or tactile!
    if (this._showMousePositionContainer.checked) {
        // FIXME handle or not mobile case
        if (this._isDesktop) {
            globe.forget(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
        } else {
            globe.forget(GlobeViewExtended.EVENTS.CENTER_CHANGED, this.onGlobeMove);
        }
    } else {
        // FIXME handle or not mobile case
        if (this._isDesktop) {
            globe.listen(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
        } else {
            globe.listen(GlobeViewExtended.EVENTS.CENTER_CHANGED, this.onGlobeMove);
        }
    }

    // FIXME
    // we handle here the panel display..., but this is not really the good
    // place to do it...
    this._setElevationPanel(this.options.displayAltitude);
    this._setCoordinatesPanel(this.options.displayCoordinates);
    if (!this.options.displayCoordinates) {
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
    // if we change of system type, we must change the unit type too !
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

    if (type !== this._currentProjectionType) {
        this._setTypeUnitsPanel(type);
    }

    // registers the current system
    this._currentProjectionSystems = this._projectionSystems[Number(systemCode)];

    // simulates a movement in tactile mode to update the results
    if (!this._isDesktop) {
        this.onGlobeMove();
    }
};

/**
 * this method is called by event 'mouseover' on 'GPmousePositionProjectionSystem'
 * tag select (cf. this._createMousePositionSettingsElement),
 * and selects the system projection whose geoBBox interstects the current view extent.
 *
 * @method onMousePositionProjectionSystemMouseOver
 * @private
 */
MousePosition.prototype.onMousePositionProjectionSystemMouseOver = function () {
    // globe infos
    var globe = this.getGlobe();
    if (!globe) {
        return;
    }

    var globeExtent = globe.getExtent();

    // clear select
    var systemList = document.getElementById(this._addUID("GPmousePositionProjectionSystem"));
    systemList.innerHTML = "";

    var option;

    // add systems whose extent intersects the globe extent
    for (var j = 0; j < this._projectionSystems.length; j++) {
        var proj = this._projectionSystems[j];
        if (proj.geoBBox) {
            // bboxes intersection test
            if (globeExtent.west > proj.geoBBox.right ||
                globeExtent.south > proj.geoBBox.top ||
                globeExtent.east < proj.geoBBox.left ||
                globeExtent.north < proj.geoBBox.bottom
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
        option = document.createElement("option");
        option.value = proj.code;
        option.text = proj.label || j;
        if (proj === this._currentProjectionSystems) {
            option.setAttribute("selected", "selected");
        }

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
    var idx = e.target.selectedIndex;
    var value = e.target.options[idx].value;

    this._currentProjectionUnits = value;

    // simulates a movement in tactile mode to update the results
    if (!this._isDesktop) {
        this.onGlobeMove();
    }
};

export default MousePosition;
