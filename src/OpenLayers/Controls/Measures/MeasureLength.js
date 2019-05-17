// import CSS
import "../../CSS/Controls/Measures/GPmeasureLengthOpenLayers.css";
// import OpenLayers
import Control from "ol/control/Control";
import { getDistance as olGetDistanceSphere } from "ol/sphere";
import { transform as olTransformProj } from "ol/proj";
// import local
import Logger from "../../../Common/Utils/LoggerByDefault";
import Utils from "../../../Common/Utils";
import ID from "../../../Common/Utils/SelectorID";
// DOM
import MeasureLengthDOM from "../../../Common/Controls/MeasureLengthDOM";
// import local with ol dependencies
import MeasureToolBox from "../MeasureToolBox";
import Measures from "./Measures";

// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = Logger.getLogger("measurelength");

/**
 * @classdesc
 *
 * Length measurement Control. Allows users to draw a path on Openlayers map and have its length computed and displayed.
 *
 * @constructor
 * @alias ol.control.MeasureLength
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.geodesic = true] - If true, length will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/ol.Sphere.html#haversineDistance ol.Sphere.haversineDistance()} function. Otherwise, length will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the path. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Image.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures de distance"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measureLength = new ol.control.MeasureLength({
 *    geodesic : false
 * });
 */
var MeasureLength = (function (Control) {
    function MeasureLength (options) {
        // options
        options = options || {};

        if (!(this instanceof MeasureLength)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // Nom de la classe (heritage)
        this.CLASSNAME = "MeasureLength";

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
        Control.call(this, {
            element : container,
            target : options.target,
            render : options.render
        });
    }

    // heritage avec ol.control.Control
    if (Control) MeasureLength.__proto__ = Control;

    /**
     * @lends module:MeasureLength
     */
    MeasureLength.prototype = Object.create(Control.prototype, {});

    // on récupère les mixins de la classe "MeasureLengthDOM" ainsi que celles
    // de "Measures".
    Utils.assign(MeasureLength.prototype, Measures);
    Utils.assign(MeasureLength.prototype, MeasureLengthDOM);

    /**
     * Constructor (alias)
     * @private
     */
    MeasureLength.prototype.constructor = MeasureLength;

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    MeasureLength.prototype.setMap = function (map) {
        logger.trace("setMap()");

        var className = this.CLASSNAME;

        // on fait le choix de ne pas activer les events sur la map à l'init de l'outil,
        // mais uniquement à son utilisation !
        if (map) {
            // var self = this;
            // map.on("click", function (e) {
            //     logger.trace("event on map with click!");
            //     self.onPointerMoveHandler(e);
            // });
            //
            // map.on("singleclick", function (e) {
            //     logger.trace("event on map with singleclick!");
            //     self.onPointerMoveHandler(e);
            // });
            //
            // map.on("pointermove", function (e) {
            //     logger.trace("event on map with pointermove!");
            //     self.onPointerMoveHandler(e);
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

        // contexte d'execution
        var context = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        if (context) {
            // Pour info
            // les objets de mesures ont du code partagé
            // (afin de gerer les interactions entre eux).
            // Dans un mode "modules", on partage cet objet (this.tools) via le contexte
            // d'execution (ex. avec window)
            if (!context.gpShareMeasures) {
                context.gpShareMeasures = {};
            }
            context.gpShareMeasures[className] = this.tools[className];
        }

        // on appelle la méthode setMap originale d'OpenLayers
        Control.prototype.setMap.call(this, map);
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize measure control (called by constructor)
     *
     * @param {Object} options - options
     *
     * @private
     */
    MeasureLength.prototype._initialize = function (options) {
        logger.trace("call MeasureLength::_initialize() : ", options);

        // liste des options
        this.options = {};
        this.options.geodesic = (typeof options.geodesic !== "undefined") ? options.geodesic : true;
        this.options.target = (typeof options.target !== "undefined") ? options.target : null;
        this.options.render = (typeof options.render !== "undefined") ? options.render : null;
        this.options.layerDescription = (typeof options.layerDescription !== "undefined") ? options.layerDescription : {
            title : "Mesures de distance",
            description : "Mes mesures"
        };

        // gestion des styles !
        this.createStylingMeasureInteraction(options.styles);
    };

    /**
     * initialize component container (DOM)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    MeasureLength.prototype._initializeContainer = function () {
        logger.trace("call MeasureLength::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement();

        var show = this._showContainer = this._createShowMeasureLengthElement();
        container.appendChild(show);

        // par defaut, pas d'interaction à l'initialisation...
        this._showContainer.checked = false;

        var picto = this._pictoContainer = this._createShowMeasureLengthPictoElement();
        container.appendChild(picto);

        return container;
    };

    // ################################################################### //
    // ########################## methods ################################ //
    // ################################################################### //

    /**
     * Add all events on map
     *
     * @private
     */
    MeasureLength.prototype.addMeasureEvents = function () {
        logger.trace("call MeasureLength::addMeasureEvents()");

        var map = this.getMap();

        map.on("singleclick", (e) => this.onPointerMoveHandler(e));
        map.on("pointermove", (e) => this.onPointerMoveHandler(e));
    };

    /**
     * Remove all events on map
     *
     * @private
     */
    MeasureLength.prototype.removeMeasureEvents = function () {
        logger.trace("call MeasureLength::removeMeasureEvents()");

        var map = this.getMap();

        map.un("singleclick", (e) => this.onPointerMoveHandle(e));
        map.un("pointermove", (e) => this.onPointerMoveHandler(e));
    };

    /**
     * Format length output.
     *
     * @param {ol.geom.Line} line - geometry line.
     * @return {String} The formatted output.
     * @private
     */
    MeasureLength.prototype.format = function (line) {
        logger.trace("call MeasureLength::format()");

        var map = this.getMap();

        var measure;
        if (this.options.geodesic) {
            var coordinates = line.getCoordinates();
            measure = 0;
            var sourceProj = map.getView().getProjection();
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var c1 = olTransformProj(coordinates[i], sourceProj, "EPSG:4326");
                var c2 = olTransformProj(coordinates[i + 1], sourceProj, "EPSG:4326");
                measure += olGetDistanceSphere(c1, c2);
            }
        } else {
            measure = Math.round(line.getLength() * 100) / 100;
        }

        var output;
        if (measure > 1000) {
            output = (Math.round(measure / 1000 * 100) / 100) + " " + "km";
        } else {
            output = (Math.round(measure * 100) / 100) + " " + "m";
        }
        return output;
    };

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on picto
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    MeasureLength.prototype.onShowMeasureLengthClick = function (e) {
        logger.trace("call MeasureLength::onShowMeasureLengthClick()", e);

        // appel de la methode commune
        this.onShowMeasureClick(e, "LineString");
    };

    return MeasureLength;
}(Control));

export default MeasureLength;

// Expose MeasureLength as ol.control.MeasureLength (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.MeasureLength = MeasureLength;
}
