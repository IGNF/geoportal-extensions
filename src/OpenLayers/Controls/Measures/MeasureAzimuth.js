import ol from "ol";
import Logger from "../../../Common/Utils/LoggerByDefault";
import Utils from "../../../Common/Utils";
import MeasureToolBox from "../MeasureToolBox";
import Measures from "./Measures";
import MeasureAzimuthDOM from "../../../Common/Controls/MeasureAzimuthDOM";
import ID from "../../../Common/Utils/SelectorID";

// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = Logger.getLogger("measureazimut");

/**
 * @classdesc
 *
 * Azimuth measurement Control. Allows users to draw a line on an Openlayers map and have its angle in decimal degrees clockwise from the geographical north.
 *
 * @constructor
 * @alias ol.control.MeasureAzimuth
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.geodesic = false] - If true, azimuth will be computed on the global sphere. Otherwise, it will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Image.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @example
 * var measure = new ol.control.MeasureAzimuth({
 *   geodesic : true
 * });
 */
function MeasureAzimuth (options) {
    /**
     * options
     * @private
     */
    options = options || {};

    if (!(this instanceof MeasureAzimuth)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    /**
     * Nom de la classe (heritage)
     * @private
     */
    this.CLASSNAME = "MeasureAzimuth";

    // uuid
    this._uid = ID.generate();

    // container d'activation du controle
    this._showContainer = null;
    this._pictoContainer = null;

    // initialisation du composant
    this._initialize(options);

    // creation du DOM container
    var container = (options.element) ? options.element : this._initializeContainer();

    // heritage
    ol.control.Control.call(this, {
        element : container,
        target : options.target,
        render : options.render
    });
}

// heritage avec ol.control.Control
ol.inherits(MeasureAzimuth, ol.control.Control);

/**
 * @lends module:MeasureAzimuth
 */
MeasureAzimuth.prototype = Object.create(ol.control.Control.prototype, {});

// on récupère les mixins de la classe "MeasureAzimuthDOM" ainsi que celles
// de "Measures".
Utils.assign(MeasureAzimuth.prototype, Measures);
Utils.assign(MeasureAzimuth.prototype, MeasureAzimuthDOM);

/**
 * Constructor (alias)
 * @private
 */
MeasureAzimuth.prototype.constructor = MeasureAzimuth;

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Overwrite OpenLayers setMap method
 *
 * @param {ol.Map} map - Map.
 */
MeasureAzimuth.prototype.setMap = function (map) {
    logger.trace("setMap()");

    var className = this.CLASSNAME;

    // on fait le choix de ne pas activer les events sur la map à l'init de l'outil,
    // mais uniquement à son utilisation !
    if (map) {
        // var self = this;
        // map.on("click", function (e) {
        //     logger.trace("event on map with click!");
        //     self.onPointerMoveAzimutHandler(e);
        // });
        //
        // map.on("singleclick", function (e) {
        //     logger.trace("event on map with singleclick!");
        //     self.onPointerMoveAzimutHandler(e);
        // });
        //
        // map.on("pointermove", function (e) {
        //     logger.trace("event on map with pointermove!");
        //     self.onPointerMoveAzimutHandler(e);
        // });

        if (!this.options.target) {
            MeasureToolBox.add(map, this);
        }
    } else {
        this.clean();
    }

    // sauvegarde de l'état de l'outil
    this.tools[className].push({
        instance : (map) ? this : null,
        active : false,
        map : (map) ? map.getTargetElement().id : null
    });

    // on appelle la méthode setMap originale d'OpenLayers
    ol.control.Control.prototype.setMap.call(this, map);
};

/**
 * Setter for option Geodesic
 *
 * @param {Boolean} value - geodesic value
 */
MeasureAzimuth.prototype.setGeodesic = function (value) {
    this.options.geodesic = (typeof value !== "undefined") ? value : false;
};

/**
 * Getter for option Geodesic
 *
 * @return {Boolean} geodesic value
 */
MeasureAzimuth.prototype.isGeodesic = function () {
    return this.options.geodesic;
};

// ################################################################### //
// ##################### init component ############################## //
// ################################################################### //

/**
 * Initialize measure control (called by constructor)
 *
 * @private
 */
MeasureAzimuth.prototype._initialize = function (options) {
    logger.trace("call MeasureAzimuth::_initialize() : ", options);

    // liste des options
    this.options = {};
    this.options.geodesic = (typeof options.geodesic !== "undefined") ? options.geodesic : false;
    this.options.target = (typeof options.target !== "undefined") ? options.target : null;
    this.options.render = (typeof options.render !== "undefined") ? options.render : null;

    // gestion des styles !
    this.createStylingMeasureInteraction(options.styles);
};

/**
 * initialize component container (DOM)
 *
 * @private
 */
MeasureAzimuth.prototype._initializeContainer = function () {
    logger.trace("call MeasureAzimuth::_initializeContainer() : ", this._uid);

    var container = this._createMainContainerElement(); ;

    var show = this._showContainer = this._createShowMeasureAzimuthElement();
    container.appendChild(show);

    // par defaut, pas d'interaction à l'initialisation...
    this._showContainer.checked = false;

    var picto = this._pictoContainer = this._createShowMeasureAzimuthPictoElement();
    container.appendChild(picto);

    return container;
};

// ################################################################### //
// ##################### overridden methods ########################## //
// ################################################################### //

/**
 * Add all events on map
 *
 * @private
 */
MeasureAzimuth.prototype.addMeasureEvents = function () {
    logger.trace("call MeasureAzimuth::addMeasureEvents()");

    var map = this.getMap();

    map.on("singleclick", this.onPointerMoveAzimutHandler, this);
    map.on("pointermove", this.onPointerMoveAzimutHandler, this);
};

/**
 * Remove all events on map
 *
 * @private
 */
MeasureAzimuth.prototype.removeMeasureEvents = function () {
    logger.trace("call MeasureAzimuth::removeMeasureEvents()");

    var map = this.getMap();

    map.un("singleclick", this.onPointerMoveAzimutHandler, this);
    map.un("pointermove", this.onPointerMoveAzimutHandler, this);
};

/**
 * Format length output.
 *
 * @param {ol.geom.LineString} line - geometry line.
 * @return {String} The formatted output.
 * @private
 */
MeasureAzimuth.prototype.format = function (line) {
    logger.trace("call MeasureAzimuth::format()");

    var map = this.getMap();

    var sourceProj = map.getView().getProjection();

    var c1 = ol.proj.transform(line.getFirstCoordinate(), sourceProj, "EPSG:4326");
    var c2 = ol.proj.transform(line.getLastCoordinate(), sourceProj, "EPSG:4326");

    if (!this.options.geodesic) {
        // TODO calcul sur une petite distance (>500m) afin de simuler un cap !
        var wgs84Sphere = new ol.Sphere(6378137);
        var lengthGeodesic = wgs84Sphere.haversineDistance(c1, c2);
        logger.trace("measure between 2 points with geodesic method", lengthGeodesic);
        if (lengthGeodesic > 500) {
            var fraction = 500.0 / lengthGeodesic;
            logger.trace("%", fraction);
            c2 = ol.proj.transform(line.getCoordinateAt(fraction), sourceProj, "EPSG:4326");
        }
    }

    var degrees2radians = Math.PI / 180;
    var radians2degrees = 180 / Math.PI;

    var lon1 = degrees2radians * c1[0];
    var lon2 = degrees2radians * c2[0];

    var lat1 = degrees2radians * c1[1];
    var lat2 = degrees2radians * c2[1];

    var a = Math.sin(lon2 - lon1) * Math.cos(lat2);
    var b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

    var atan = Math.atan2(a, b);

    var azimut = radians2degrees * atan;
    logger.trace("azimut", azimut);

    if (azimut < 0) {
        azimut += 360;
    }
    var output = Math.round(azimut * 100) / 100 + " °";

    return output;
};

// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

/**
 * this method is called by event 'click' on picto
 *
 * @param {Object} e - HTMLElement
 * @private
 */
MeasureAzimuth.prototype.onShowMeasureAzimuthClick = function (e) {
    logger.trace("call MeasureAzimuth::onShowMeasureAzimuthClick()", e);

    // appel de la methode commune
    this.onShowMeasureClick(e, "LineString");
};

/**
 * Handle pointer click.
 *
 * @param {ol.MapBrowserEvent} e - The event.
 * @private
 */
MeasureAzimuth.prototype.onPointerMoveAzimutHandler = function (e) {
    this.onPointerMoveHandler(e);

    if (this.sketch) {
        var geom = (/** @type {ol.geom.LineString} */ (this.sketch.getGeometry()));
        if (geom.getCoordinates().length > 2) {
            this.measureDraw.finishDrawing();
        }
    }
};

export default MeasureAzimuth;
