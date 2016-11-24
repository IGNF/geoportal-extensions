define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/MeasureToolBox",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureAzimuthDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    MeasureToolBox,
    Measures,
    MeasureAzimuthDOM,
    ID
) {

    "use strict";

    // Derived from OpenLayers measure example
    // http://openlayers.org/en/latest/examples/measure.html

    woodman.load("console");
    var logger = woodman.getLogger("measureazimut");

    /**
    * @classdesc
    *
    * Tool Measure Azimuth Control.
    *
    * @constructor
    * @alias ol.control.MeasureAzimuth
    * @extends {ol.control.Control}
    * @param {Object} options - options for function call.
    * @param {Object} [options.styles = {}] - styles management of draw with properties or object {ol.style}
    * @param {Object} [options.styles.pointer = {}] - Point Style for a start drawing with properties or object {ol.style.Circle}
    * @param {Number} [options.styles.pointer.imageRadius] - Point radius (properties)
    * @param {String} [options.styles.pointer.imageFillColor] - Point for fill color (properties)
    * @param {String} [options.styles.pointer.imageStrokeColor] - Point for stroke color (properties)
    * @param {Object} [options.styles.start = {}] - Line Style for a start drawing with properties or object {ol.style.Stroke}
    * @param {String} [options.styles.start.strokeColor] - Line for stroke color (properties)
    * @param {Array}  [options.styles.start.strokeLineDash] - Line for stroke dash (properties)
    * @param {Number} [options.styles.start.strokeWidth] - Line for stroke width (properties)
    * @param {Object} [options.styles.finish = {}] - Line Style for a finish drawing with properties or object {ol.style.Stroke}
    * @param {String} [options.styles.finish.strokeColor] - Line for stroke color (properties)
    * @param {Number} [options.styles.finish.strokeWidth] - Line for stroke width (properties)
    * @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED !
    * @example
    * var measure = new ol.control.MeasureAzimuth({
    *    element : null,
    *    target : null,
    *    render : null,
    *    styles : {
    *     start : {
    *       strokeColor : "rgba(0, 0, 0, 0.5)",
    *       strokeLineDash : [10, 10],
    *       strokeWidth : 2
    *     },
    *     pointer : {
    *       imageRadius : 5,
    *       imageFillColor : "rgba(255, 255, 255, 0.2)",
    *       imageStrokeColor : "rgba(0, 0, 0, 0.7)"
    *     },
    *     finish : {}
    *    },
    *    tooltip : {
    *       messageContinue : "Click to continue drawing the line",
    *       messageStart : "Click to start drawing"
    *    }
    * });
    */
    function MeasureAzimuth (options) {

        /** options */
        options = options || {};

        if (!(this instanceof MeasureAzimuth)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /** Nom de la classe (heritage) */
        this.CLASSNAME = "MeasureAzimuth";

        // uuid
        this._uid = ID.generate();

        // container d'activation du controle
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

            if (! this.options.target) {
                MeasureToolBox.add(map, this);
            }
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
    MeasureAzimuth.prototype._initialize = function (options) {
        logger.trace("call MeasureAzimuth::_initialize() : ", options);

        // liste des options
        this.options = {};
        this.options.target   = ( typeof options.target !== "undefined" ) ? options.target : null;
        this.options.render   = ( typeof options.render !== "undefined" ) ? options.render : null;

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

        var container = this._createMainContainerElement();;

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
        // on calcule sur des distances plus courtes !
        var c1 = ol.proj.transform(line.getFirstCoordinate(), sourceProj, "EPSG:4326");
        var c2 = ol.proj.transform(line.getCoordinateAt(0.001), sourceProj, "EPSG:4326");

        var degrees2radians = Math.PI / 180;
        var radians2degrees = 180 / Math.PI;
        var lon1 = degrees2radians * c1[0];
        var lon2 = degrees2radians * c2[0];
        var lat1 = degrees2radians * c1[1];
        var lat2 = degrees2radians * c2[1];
        var a = Math.sin(lon2 - lon1) * Math.cos(lat2);
        var b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

        var atan = Math.atan2(a, b);
        logger.trace(atan);

        var azimut = radians2degrees * atan;
        logger.trace(azimut);

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

    return MeasureAzimuth;
});
