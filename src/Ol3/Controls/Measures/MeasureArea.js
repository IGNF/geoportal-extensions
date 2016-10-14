define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureAreaDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    Measures,
    MeasureAreaDOM,
    ID
) {

    "use strict";

    // Derived from OpenLayers measure example
    // http://openlayers.org/en/latest/examples/measure.html

    woodman.load("console");
    var logger = woodman.getLogger("measurearea");

    /**
    * @classdesc
    *
    * Tool Measure Area Control.
    *
    * @constructor
    * @alias ol.control.MeasureArea
    * @extends {ol.control.Control}
    * @param {Object} options - options for function call.
    * @param {Boolean} [options.geodesic = true] - precision calculation
    * @param {Object} [options.styles = {}] - styles management of draw
    * @param {Object} [options.styles.start = {}] - Line Style for a start drawing
    * @param {Object} [options.styles.start.fillColor] - Line for fill color
    * @param {Object} [options.styles.start.strokeColor] - Line for stroke color
    * @param {Object} [options.styles.start.strokeLineDash] - Line for stroke dash
    * @param {Object} [options.styles.start.strokeWidth] - Line for stroke width
    * @param {Object} [options.styles.start.imageRadius] - Point radius
    * @param {Object} [options.styles.start.imageFillColor] - Point for fill color
    * @param {Object} [options.styles.start.imageStrokeColor] - Point for stroke color
    * @param {Object} [options.styles.finish = {}] - Line Style for a finish drawing
    * @param {Object} [options.styles.finish.fillColor] - Line for fill color
    * @param {Object} [options.styles.finish.strokeColor] - Line for stroke color
    * @param {Object} [options.styles.finish.strokeWidth] - Line for stroke width
    * @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED !
    * @example
    * var measureArea = new ol.control.MeasureArea({
    *    element : null,
    *    target : null,
    *    render : null,
    *    styles : {
    *     start : {
    *       fillColor : "rgba(255, 255, 255, 0.2)",
    *       strokeColor : "rgba(0, 0, 0, 0.5)",
    *       strokeLineDash : [10, 10],
    *       strokeWidth : 2,
    *       imageRadius : 5,
    *       imageFillColor : "rgba(255, 255, 255, 0.2)",
    *       imageStrokeColor : "rgba(0, 0, 0, 0.7)"
    *     },
    *     finish : {}
    *    },
    *    tooltip : {
    *       messageContinue : "Click to continue drawing the polygon",
    *       messageStart : "Click to start drawing"
    *    },
    *    geodesic : true
    * });
    */
    function MeasureArea (options) {

        /** options */
        options = options || {};

        if (!(this instanceof MeasureArea)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /** Nom de la classe (heritage) */
        this.CLASSNAME = "MeasureArea";

        /** uuid */
        this._uid = ID.generate();

        /** container d'activation du controle */
        this._showContainer = null;
        this._pictoContainer = null;

        // initialisation du composant
        this._initialize(options);

        // creation du DOM container
        var container = ( options.element ) ? options.element : this._initializeContainer();

        // heritage
        ol.control.Control.call(this,
            {
                element : container,
                target : options.target,
                render : options.render
            }
        );
    }

    // heritage avec ol.control.Control
    ol.inherits(MeasureArea, ol.control.Control);

    /**
     * @lends module:MeasureArea
     */
    MeasureArea.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les mixins de la classe "MeasureAreaDOM" ainsi que celles
    // de "Measures".
    Utils.assign(MeasureArea.prototype, Measures);
    Utils.assign(MeasureArea.prototype, MeasureAreaDOM);

    /**
     * Constructor (alias)
     * @private
     */
    MeasureArea.prototype.constructor = MeasureArea;

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    MeasureArea.prototype.setMap = function (map) {

        // sauvegarde de l'état de l'outil
        var className = this.CLASSNAME;
        this.tools[className].instance = this;

        // on fait le choix de ne pas activer les events sur la map à l'init de l'outil,
        // mais uniquement à son utilisation !
        if ( map ) {

            logger.trace("setMap()");
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
        }

        // on appelle la méthode setMap originale d'OpenLayers
        ol.control.Control.prototype.setMap.call(this, map);

    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize measure control (called by constructor)
     *
     * @private
     */
    MeasureArea.prototype._initialize = function (options) {
        logger.trace("call MeasureArea::_initialize() : ", options);

        // liste des options
        this.options = {};
        this.options.geodesic = ( typeof options.geodesic !== "undefined" ) ? options.geodesic : true;

        // gestion des styles !
        this.createStylingMeasureInteraction(options.styles);
    };

    /**
     * initialize component container (DOM)
     *
     * @private
     */
    MeasureArea.prototype._initializeContainer = function () {
        logger.trace("call MeasureArea::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement();;

        var show = this._showContainer = this._createShowMeasureAreaElement();
        container.appendChild(show);

        // par defaut, pas d'interaction à l'initialisation...
        this._showContainer.checked = true;

        var picto = this._pictoContainer = this._createShowMeasureAreaPictoElement();
        container.appendChild(picto);

        return container;
    };

    // ################################################################### //
    // ##################### overridden methods ########################## //
    // ################################################################### //

    /** Add all events on map */
    MeasureArea.prototype.addMeasureEvents = function () {
        logger.trace("call MeasureArea::addMeasureEvents()");

        var map = this.getMap();

        map.on("singleclick", this.onPointerMoveHandler, this);
        map.on("pointermove", this.onPointerMoveHandler, this);
    };

    /** Remove all events on map */
    MeasureArea.prototype.removeMeasureEvents = function () {
        logger.trace("call MeasureArea::removeMeasureEvents()");

        var map = this.getMap();

        map.un("singleclick", this.onPointerMoveHandler, this);
        map.un("pointermove", this.onPointerMoveHandler, this);
    };

    /**
    * Format length output.
    *
    * @param {ol.geom.Polygon} polygon - geometry polygon.
    * @return {String} The formatted output.
    * @private
    */
    MeasureArea.prototype.format = function (polygon) {
        logger.trace("call MeasureArea::format()");

        var map = this.getMap();

        var measure;
        if (this.options.geodesic) {
            var wgs84Sphere = new ol.Sphere(6378137);
            var sourceProj  = map.getView().getProjection();
            var geom = (polygon.clone().transform(sourceProj, "EPSG:4326"));
            var coordinates = geom.getLinearRing(0).getCoordinates();
            measure = Math.abs(wgs84Sphere.geodesicArea(coordinates));
        } else {
            measure = polygon.getArea();
        }

        var output;
        if (measure > 1000000) {
            output = (Math.round(measure / 1000000 * 100) / 100) + " " + "km<sup>2</sup>";
        } else if (measure > 100000) {
            output = (Math.round(measure / 1000000 * 1000) / 1000) + " " + "km<sup>2</sup>";
        } else if (measure > 1000) {
            output = (Math.round(measure / 10) * 10) + " " + "m<sup>2</sup>";
        } else {
            output = (Math.round(measure * 100) / 100) + " " + "m<sup>2</sup>";
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
    MeasureArea.prototype.onShowMeasureAreaClick = function (e) {
        logger.trace("call MeasureArea::onShowMeasureAreaClick()", e);

        // appel de la methode commune
        this.onShowMeasureClick(e, "Polygon");
    };

    return MeasureArea;
});
