define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureAzimuthDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
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
    * @example
    * var measure = new ol.control.MeasureAzimuth({
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

        if ( map ) {
            var self = this;
            map.on("pointermove", function (e) {
                self.onPointerMoveAzimutHandler(e);
            });
            map.on("click", function (e) {
                self.onPointerMoveAzimutHandler(e);
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
    MeasureAzimuth.prototype._initialize = function (options) {
        logger.trace("call MeasureAzimuth::_initialize() : ", options);

        // liste des options
        this.options = {};

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
        this._showContainer.checked = true;

        var picto = this._createShowMeasureAzimuthPictoElement();
        container.appendChild(picto);

        return container;
    };

    // ################################################################### //
    // ##################### overridden methods ########################## //
    // ################################################################### //

    /**
    * Format length output.
    * FIXME bug sur le calcul (pb de signe !?)
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
    * TODO gestion des styles utilisateurs
    *
    * @param {Object} e - HTMLElement
    * @private
    */
    MeasureAzimuth.prototype.onShowMeasureAzimuthClick = function (e) {
        logger.trace("call MeasureAzimuth::onShowMeasureAzimuthClick()", e);
        this.onShowMeasureClick(e, "LineString");
    };

    /**
    * Handle pointer click.
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
