import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import BuildingsDOM from "../../Common/Controls/BuildingsDOM";
import Widget from "./Widget";
import {
    VectorTilesSource as ItVectorTilesSource,
    FeatureGeometryLayer as ItFeatureGeometryLayer,
    Style as ItStyle,
    WMTSSource as ItWMTSSource,
    ElevationLayer as ItElevationLayer
} from "itowns";

/**
 * @classdesc
 * Control to display buildings on the map
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.Buildings
 * @param {Object} buildingsOptions - control options
 * @param {String} [buildingsOptions.key = "essentiels"] - key to use to adds the buildings layer – “essentiels” by default
 * @param {Boolean} [buildingsOptions.MNT = true] - Adds and displays the MNT
 * @param {Boolean} [buildingsOptions.buildingsOnGround = false] - Display the buildings at their elevation or on the ground
 * @param {Boolean} [buildingsOptions.defaultVisibility = true] - Visibility of the Buildings Layer at the initialisation
 * @param {Integer} [buildingsOptions.minZoom = 15] - minimum level of zoom the buildings are displayed. 15 by default. Lower is the value, lower are the performances.
 * @example
 * var buildings = new itowns.control.Buildings ({
 *      MNT : false,
 *      buildingsOnGround : false,
 *      target : “controlDiv”
 * })
 */
function Buildings (buildingsOptions) {
    var options = buildingsOptions || {};

    if (!(this instanceof Buildings)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    if (typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    options = this.setOptions(options);
    this._initialize(options);

    var container = this._initContainer(options);
    var targetDiv = document.getElementById(options.target) || null;

    Widget.call(
        this, {
            name : "Buildings",
            element : container,
            target : targetDiv
        }
    );
}

/*
 * @lends module:Buildings
 */
Buildings.prototype = Object.create(Widget.prototype, {});

// retrieves methods of the common class BuildingsDOM
Utils.assign(Buildings.prototype, BuildingsDOM);

/**
 * Constructor (alias)
 *
 * @private
 */
Buildings.prototype.constructor = Buildings;

// ################################################################### //
// ############## public methods (getters, setters) ################## //
// ################################################################### //

/**
 * Bind globe to control
 *
 * @param {GlobeViewExtended} globe - the globe
 */
Buildings.prototype.setGlobe = function (globe) {
    if (!globe) {
        while (this._element.hasChildNodes()) {
            this._element.removeChild(this._element.lastChild);
        }
        this._element.parentNode.removeChild(this._element);
    }
    // calls original setGlobe method
    Widget.prototype.setGlobe.call(this, globe);
};

// ################################################################### //
// ##################### init component ############################## //
// ################################################################### //

/**
 * Initialize Buildings control (called by constructor)
 *
 * @param {Object} options - control options
 *
 * @private
 */
Buildings.prototype._initialize = function (options) {
    // id of the control ; used to suffix the CSS id (handles cases with severel controls on the same page)
    this._uid = SelectorID.generate();

    // {Object} control layers list. Each key is a layer id, and its value is an object of layers options (layer, id, relief, visibility, title, description...)
    this._options = options;

    // callbacks
    this._callbacks = {};
};

/**
 * Creates control main container
 *
 * @method _initContainer
 * @param {Object} options - control options
 * @returns {DOMElement} container - widget container
 * @private
 */
Buildings.prototype._initContainer = function (options) {
    var container = this._createMainContainerElement();

    // adds the widget picto in the main container
    var picto = this._createMainPictoElement();
    container.appendChild(picto);

    return container;
};

/**
 * Adds the default french ELEVATION.ELEVATIONGRIDCOVERAGE MNT to the globe
 *
 * @method addMNT
 * @param {Object} globe - globeView
 * @private
 */
Buildings.prototype.addMNT = function (globe) {
    var mntLayer = {
        type : "elevation",
        id : "IGN_MNT_HIGHRES",
        noDataValue : -99999,
        source : {
            protocol : "wmts",
            url : "https://wxs.ign.fr/altimetrie/geoportail/wmts",
            name : "ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES",
            attribution : [{
                name : "IGN",
                attribution : "IGN Grandes Echelles",
                url : "http://www.ign.fr",
                constraints : [{
                    crs : "EPSG:4326"
                }]
            }],
            updateStrategy : {
                type : 1,
                options : {
                    groups : [3, 7, 11, 14]
                }
            },
            networkOptions : {
                crossOrigin : "omit"
            },
            format : "image/x-bil;bits=32",
            crs : "EPSG:4326",
            tileMatrixSet : "WGS84G",
            tileMatrixSetLimits : {
                6 : {
                    minTileRow : 13,
                    maxTileRow : 36,
                    minTileCol : 62,
                    maxTileCol : 80
                },
                7 : {
                    minTileRow : 27,
                    maxTileRow : 73,
                    minTileCol : 124,
                    maxTileCol : 160
                },
                8 : {
                    minTileRow : 55,
                    maxTileRow : 146,
                    minTileCol : 248,
                    maxTileCol : 320
                },
                9 : {
                    minTileRow : 110,
                    maxTileRow : 292,
                    minTileCol : 497,
                    maxTileCol : 640
                },
                10 : {
                    minTileRow : 221,
                    maxTileRow : 585,
                    minTileCol : 994,
                    maxTileCol : 1281
                },
                11 : {
                    minTileRow : 442,
                    maxTileRow : 1171,
                    minTileCol : 1989,
                    maxTileCol : 2563
                },
                12 : {
                    minTileRow : 885,
                    maxTileRow : 2343,
                    minTileCol : 3978,
                    maxTileCol : 5126
                },
                13 : {
                    minTileRow : 1770,
                    maxTileRow : 4687,
                    minTileCol : 7957,
                    maxTileCol : 10253
                },
                14 : {
                    minTileRow : 3540,
                    maxTileRow : 9375,
                    minTileCol : 15914,
                    maxTileCol : 20507
                }
            }
        }
    };

    function createWMTSSourceFromConfig (config) {
        config.source = new ItWMTSSource(config.source);
        return config;
    };

    function addElevationLayerFromConfig (config, globe) {
        var layer = new ItElevationLayer(config.id, config);
        globe.addLayer(layer);
    };

    var mntConfig = createWMTSSourceFromConfig(mntLayer);
    addElevationLayerFromConfig(mntConfig, globe);
};

/**
 * Adds or removes the buildings layer on click
 *
 * @method addBuildings
 * @param {options} options for the buildings control
 */
Buildings.prototype.addBuildings = function (options) {
    var vectorStyle = "https://wxs.ign.fr/" + options.apiKey + "/static/vectorTiles/styles/PLAN.IGN/standard.json";
    var layerId = "VTBuilding";
    // ---------- DISPLAY VECTOR TILED BUILDING DATA AS 3D MESHES : ----------
    // Define the source of the building data : those are vector tiled data from the geoportail.
    const buildingsSource = new ItVectorTilesSource({
        style : vectorStyle,
        // We only want to display buildings related data.
        // We remove some buildings without alti_sol property (it causes graphical)
        filter : (layer) => {
            return layer["source-layer"].includes("bati_surf") && !layer["filter"].includes("CIMETIERE_SURF") &&
                !layer["filter"].includes("FOOT_SURF") &&
                !layer["filter"].includes("TENNIS_SURF") &&
                !layer["filter"].includes("MULTI_SPORT_SURF") &&
                layer.paint["fill-color"];
        }
    });

    // Defines if the buildings must be displayed on the MNT or at the zero level
    var baseAltitude;
    var extrusionHeight;
    // To extend the extrusion on the ground when altitude is not accurate, we add a delta parameter
    var delta = 10;
    if (options.buildingsOnGround) {
        baseAltitude = 0;
        extrusionHeight = (p) => p.hauteur || 0;
    } else {
        baseAltitude = (p) => p.alti_sol - delta || 0;
        extrusionHeight = (p) => p.hauteur + delta || 0;
    }

    // Create a FeatureGeometryLayer to support building data.
    var buildingsLayer = new ItFeatureGeometryLayer(layerId, {
        source : buildingsSource,
        zoom : {
            min : options.minZoom
        },
        accurate : false,
        style : new ItStyle({
            fill : {
                base_altitude : baseAltitude,
                extrusion_height : extrusionHeight
            }
        })
    });

    this.getGlobe().addLayer(buildingsLayer);

    // initial settings for buildings visibility and button
    this.getGlobe().setLayerVisibility(layerId, options.defaultVisibility);
    if (options.defaultVisibility === true) {
        this._toggleBuildingsButton(this.getElement(), "off");
    } else {
        this._toggleBuildingsButton(this.getElement(), "on");
    }
};

/**
 * Set the buildings visibility on click
 *
 * @method setBuildingsVisibility
 * @param {Tring} layerId - layer id for the building layer
 */
Buildings.prototype.setBuildingsVisibility = function (layerId) {
    if (this.getGlobe().getFeatureGeometryLayers()[0].visible === true) {
        this.getGlobe().setLayerVisibility(layerId, false);
        this._toggleBuildingsButton(this.getElement(), "on");
    } else {
        this.getGlobe().setLayerVisibility(layerId, true);
        this._toggleBuildingsButton(this.getElement(), "off");
    }
};

/**
 * Set the button picture on click
 *
 * @method _toggleBuildingsButton
 * @param {DOM} element - DOM element of the buildings Widget
 * @param {String} mode - "on" or "off" to display the deactivated or activated buildings image
 *
 * @private
 */
Buildings.prototype._toggleBuildingsButton = function (element, mode) {
    if (mode === "on") {
        element.lastChild.classList.remove("buildingsOff");
        element.lastChild.classList.add("buildingsOn");
    } else {
        element.lastChild.classList.remove("buildingsOn");
        element.lastChild.classList.add("buildingsOff");
    }
};

/**
 * onWidgetAdded : function called when globeVewExtended.addwidget is called
 *
 * @method onWidgetAdded
 * @param {Object} widget - buildings widget
 *
 * @private
 */
Buildings.prototype.onWidgetAdded = function (widget) {
    var widgetOptions = widget.getOptions();
    if (widgetOptions.MNT !== false) {
        this.addMNT(widget.getGlobe());
    }

    this.addBuildings(widgetOptions);

    this.addListener(this.getElement());
};

/**
 * addListener : adds the clic listener to handle buildings visibility on the given element
 *
 * @param {DOM} element - DOM element where the listener has to be added
 *
 * @private
 */
Buildings.prototype.addListener = function (element) {
    element.onclick = function () {
        this.setBuildingsVisibility("VTBuilding");
    }.bind(this);
};

/**
 * setOptions : set the options of the widget
 *
 * @param {Object} options - options to set
 * @returns {Object} buildingOptions - widget options
 * @private
 */
Buildings.prototype.setOptions = function (options) {
    var buildingsOptions = {};
    buildingsOptions.apiKey = options.key || "essentiels";
    buildingsOptions.MNT = options.MNT !== false;
    buildingsOptions.buildingsOnGround = options.buildingsOnGround || false;
    buildingsOptions.defaultVisibility = options.defaultVisibility !== false;
    buildingsOptions.minZoom = options.minZoom || 15;
    // common widget options
    buildingsOptions.target = options.target;
    buildingsOptions.name = options.name;
    buildingsOptions.element = options.element;
    buildingsOptions.position = options.position;

    return buildingsOptions;
};

export default Buildings;
