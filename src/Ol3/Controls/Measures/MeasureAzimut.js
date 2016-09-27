define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureAzimutDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    Measures,
    MeasureAzimutDOM,
    ID
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("measureazimut");

    /**
    * @example
    * var measure = new ol.control.MeasureAzimut({
    *    element : null,
    *    target : null,
    *    render : null,
    *    styles : {
    *       fillColor : "rgba(255, 255, 255, 0.2)",
    *       strokeColor : "rgba(0, 0, 0, 0.5)",
    *       strokeLineDash : [10, 10],
    *       strokeWidth : 2,
    *       imageRadius : 5,
    *       imageFillColor : "rgba(255, 255, 255, 0.2)",
    *       imageStrokeColor : "rgba(0, 0, 0, 0.7)",
    *    },
    *    tooltip : {
    *       messageContinue : "Click to continue drawing the line",
    *       messageStart : "Click to start drawing"
    *    }
    * });
    */
    function MeasureAzimut (options) {

        /** options */
        options = options || {};

        if (!(this instanceof MeasureAzimut)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

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
    ol.inherits(MeasureAzimut, ol.control.Control);

    /**
     * @lends module:MeasureAzimut
     */
    MeasureAzimut.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les mixins de la classe "MeasureAzimutDOM" ainsi que celles
    // de "Measures".
    Utils.assign(MeasureAzimut.prototype, Measures);
    Utils.assign(MeasureAzimut.prototype, MeasureAzimutDOM);

    /**
     * Constructor (alias)
     * @private
     */
    MeasureAzimut.prototype.constructor = MeasureAzimut;

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    MeasureAzimut.prototype.setMap = function (map) {

        if ( map ) {
            var self = this;
            map.on("pointermove", function (e) {
                self.onPointerMoveHandler(e);
            });
            map.on("click", function (e) {
                self.onPointerClickAzimutHandler(e);
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
    MeasureAzimut.prototype._initialize = function (options) {
        logger.trace("call MeasureAzimut::_initialize() : ", options);

        // liste des options
        this.options = options || {};
        this.options.geodesic = (options.geodesic === null) ? true : options.geodesic;
    };

    /**
     * initialize component container (DOM)
     *
     * @private
     */
    MeasureAzimut.prototype._initializeContainer = function () {
        logger.trace("call MeasureAzimut::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement();;

        var show = this._showContainer = this._createShowMeasureAzimutElement();
        container.appendChild(show);

        // par defaut, pas d'interaction à l'initialisation...
        this._showContainer.checked = true;

        var picto = this._createShowMeasureAzimutPictoElement();
        container.appendChild(picto);

        return container;
    };

    // ################################################################### //
    // ##################### overridden methods ########################## //
    // ################################################################### //

    /**
    * Format length output.
    *
    * @param {ol.geom.LineString} line - geometry line.
    * @return {String} The formatted output.
    * @private
    */
    MeasureAzimut.prototype.format = function (line) {
        logger.trace("call MeasureAzimut::format()");

        var map = this.getMap();

        var sourceProj = map.getView().getProjection();
        var c1 = ol.proj.transform(line.getFirstCoordinate(), sourceProj, "EPSG:4326");
        // FIXME calcul sur de longue distance !
        // var c2 = ol.proj.transform(line.getLastCoordinate(),  sourceProj, "EPSG:4326");
        var c2 = ol.proj.transform(line.getCoordinateAt(0.001), sourceProj, "EPSG:4326");

        var x = Math.cos(c1[1]) * Math.sin(c2[1]) - Math.sin(c1[1]) * Math.cos(c2[1]) * Math.cos(c2[0] - c1[0]);
        var y = Math.sin(c2[0] - c1[0]) * Math.cos(c2[1]);
        var azimut = Math.atan2(y, x) / Math.PI * (-180);

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
    MeasureAzimut.prototype.onShowMeasureAzimutClick = function (e) {
        logger.trace("call MeasureAzimut::onShowMeasureAzimutClick()", e);
        this.onShowMeasureClick(e, "LineString");
    };

    /**
    * Handle pointer click.
    * @param {ol.MapBrowserEvent} e - The event.
    * @private
    */
    MeasureAzimut.prototype.onPointerClickAzimutHandler = function (e) {

        var tooltipCoord = e.coordinate;

        if (this.sketch) {
            var output;
            var geom = (/** @type {ol.geom.LineString} */ (this.sketch.getGeometry()));
            output = this.format(geom);
            tooltipCoord = geom.getLastCoordinate();
            this.measureTooltipElement.innerHTML = output;
            this.measureTooltip.setPosition(tooltipCoord);
            if (geom.getCoordinates().length > 2) {
                this.measureDraw.finishDrawing();
            }
        }

    };

    return MeasureAzimut;
});
