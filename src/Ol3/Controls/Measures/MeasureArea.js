define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/MeasureToolBox",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureAreaDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    MeasureToolBox,
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
    * Tool Measure Area Control. Allows users to measure the length of a path drawn on the map.
    *
    * @constructor
    * @alias ol.control.MeasureArea
    * @extends {ol.control.Control}
    * @param {Object} options - options for function call.
    * @param {Boolean} [options.geodesic = true] - If true, area will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/ol.Sphere.html#geodesicArea ol.Sphere.geodesicArea()} function. Otherwise, area will be computed on the projected plane.
    * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
    * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the polygon to measure. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Image.html ol.style.Image} subclass object.
    * @param {Object} [options.styles.start = {}] - Polygon Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
    * @param {Object} [options.styles.finish = {}] - Polygon Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
    * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
    * @example
    * var measureArea = new ol.control.MeasureArea({
    *    geodesic : false
    * });
    */
    function MeasureArea (options) {

        /** 
         * options 
         * @private
         */
        options = options || {};

        if (!(this instanceof MeasureArea)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /** 
         * Nom de la classe (heritage) 
         * @private
         */
        this.CLASSNAME = "MeasureArea";

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
    MeasureArea.prototype._initialize = function (options) {
        logger.trace("call MeasureArea::_initialize() : ", options);

        // liste des options
        this.options = {};
        this.options.geodesic = ( typeof options.geodesic !== "undefined" ) ? options.geodesic : true;
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
    MeasureArea.prototype._initializeContainer = function () {
        logger.trace("call MeasureArea::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement();;

        var show = this._showContainer = this._createShowMeasureAreaElement();
        container.appendChild(show);

        // par defaut, pas d'interaction à l'initialisation...
        this._showContainer.checked = false;

        var picto = this._pictoContainer = this._createShowMeasureAreaPictoElement();
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
    MeasureArea.prototype.addMeasureEvents = function () {
        logger.trace("call MeasureArea::addMeasureEvents()");

        var map = this.getMap();

        map.on("singleclick", this.onPointerMoveHandler, this);
        map.on("pointermove", this.onPointerMoveHandler, this);
    };

    /**
     * Remove all events on map
     *
     * @private
     */
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
