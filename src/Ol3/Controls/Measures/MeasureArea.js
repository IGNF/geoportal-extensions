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

        if ( map ) {
            var self = this;
            map.on("pointermove", function (e) {
                self.onPointerMoveHandler(e);
            });
            map.on("click", function (e) {
                self.onPointerMoveHandler(e);
            });
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

        var picto = this._createShowMeasureAreaPictoElement();
        container.appendChild(picto);

        return container;
    };

    // ################################################################### //
    // ##################### overridden methods ########################## //
    // ################################################################### //

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
    * TODO gestion des styles utilisateurs
    *
    * @param {Object} e - HTMLElement
    *
    * @private
    */
    MeasureArea.prototype.onShowMeasureAreaClick = function (e) {
        logger.trace("call MeasureArea::onShowMeasureAreaClick()", e);
        this.onShowMeasureClick(e, "Polygon");
    };

    return MeasureArea;
});
