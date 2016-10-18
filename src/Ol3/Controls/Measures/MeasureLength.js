define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureLengthDOM",
    "Common/Controls/MeasureToolBoxDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    Measures,
    MeasureLengthDOM,
    MeasureToolBoxDOM,
    ID
) {

    "use strict";

    // Derived from OpenLayers measure example
    // http://openlayers.org/en/latest/examples/measure.html

    woodman.load("console");
    var logger = woodman.getLogger("measurelength");

    /**
    * @classdesc
    *
    * Tool Measure Length Control.
    *
    * @constructor
    * @alias ol.control.MeasureLength
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
    * var measureLength = new ol.control.MeasureLength({
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
    *       messageContinue : "Click to continue drawing the line",
    *       messageStart : "Click to start drawing"
    *    },
    *    geodesic : true
    * });
    */
    function MeasureLength (options) {

        /** options */
        options = options || {};

        if (!(this instanceof MeasureLength)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /** Nom de la classe (heritage) */
        this.CLASSNAME = "MeasureLength";

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
    ol.inherits(MeasureLength, ol.control.Control);

    /**
     * @lends module:MeasureLength
     */
    MeasureLength.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les mixins de la classe "MeasureLengthDOM" ainsi que celles
    // de "Measures".
    Utils.assign(MeasureLength.prototype, Measures);
    Utils.assign(MeasureLength.prototype, MeasureLengthDOM);
    Utils.assign(MeasureLength.prototype, MeasureToolBoxDOM);

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

            var toolboxId = this.getToolBoxID();
            var widgetId  = this.getWidgetID();
            var mapContainer = map.getTargetElement();
            var mapDocument  = mapContainer.ownerDocument;

            if (! mapDocument.getElementById(toolboxId)) {
                // creation et ajout de la toolbox sur la map
                var toolboxContainer = this._createToolBoxContainerElement();
                mapContainer.appendChild(toolboxContainer);
            }
            // ajout du widget dans la toolbox
            var widgetContainer = mapDocument.getElementById(widgetId);
            this.setTarget(widgetContainer);

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
    MeasureLength.prototype._initialize = function (options) {
        logger.trace("call MeasureLength::_initialize() : ", options);

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
    MeasureLength.prototype._initializeContainer = function () {
        logger.trace("call MeasureLength::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement();

        var show = this._showContainer = this._createShowMeasureLengthElement();
        container.appendChild(show);

        // par defaut, pas d'interaction à l'initialisation...
        this._showContainer.checked = true;

        var picto = this._pictoContainer = this._createShowMeasureLengthPictoElement();
        container.appendChild(picto);

        return container;
    };

    // ################################################################### //
    // ########################## methods ################################ //
    // ################################################################### //

    /** Add all events on map */
    MeasureLength.prototype.addMeasureEvents = function () {
        logger.trace("call MeasureLength::addMeasureEvents()");

        var map = this.getMap();

        map.on("singleclick", this.onPointerMoveHandler, this);
        map.on("pointermove", this.onPointerMoveHandler, this);
    };

    /** Remove all events on map */
    MeasureLength.prototype.removeMeasureEvents = function () {
        logger.trace("call MeasureLength::removeMeasureEvents()");

        var map = this.getMap();

        map.un("singleclick", this.onPointerMoveHandler, this);
        map.un("pointermove", this.onPointerMoveHandler, this);
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
            var wgs84Sphere = new ol.Sphere(6378137);
            var coordinates = line.getCoordinates();
            measure = 0;
            var sourceProj = map.getView().getProjection();
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var c1 = ol.proj.transform(coordinates[i], sourceProj, "EPSG:4326");
                var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, "EPSG:4326");
                measure += wgs84Sphere.haversineDistance(c1, c2);
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
});
