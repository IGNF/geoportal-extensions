define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/MeasureToolBox",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureLengthDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    MeasureToolBox,
    Measures,
    MeasureLengthDOM,
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
    * Length measurement Control. Allows users to draw a path on OL3 map and have its length computed and displayed.
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
    * @example
    * var measureLength = new ol.control.MeasureLength({
    *    geodesic : false
    * });
    */
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
        if ( map ) {

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

        } else {
            this.clean();
        }

        // sauvegarde de l'état de l'outil
        this.tools[className].instance = (map) ? this : null;

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

        map.on("singleclick", this.onPointerMoveHandler, this);
        map.on("pointermove", this.onPointerMoveHandler, this);
    };

    /**
     * Remove all events on map
     *
     * @private
     */
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
