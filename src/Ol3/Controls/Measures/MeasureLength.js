define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Ol3/Controls/Measures/Measures",
    "Common/Controls/MeasureLengthDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    Measures,
    MeasureLengthDOM,
    ID
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("measurelength");

    /**
    * @example
    * var measureLength = new ol.control.MeasureLength({
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
    *    unit : "km",
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
    MeasureLength.prototype._initialize = function (options) {
        logger.trace("call MeasureLength::_initialize() : ", options);

        // liste des options
        this.options = options || {};
        this.options.geodesic = (options.geodesic === null) ? true : options.geodesic;
    };

    /**
     * initialize component container (DOM)
     *
     * @private
     */
    MeasureLength.prototype._initializeContainer = function () {
        logger.trace("call MeasureLength::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement();;

        var show = this._showContainer = this._createShowMeasureLengthElement();
        container.appendChild(show);

        // par defaut, pas d'interaction à l'initialisation...
        this._showContainer.checked = true;

        var picto = this._createShowMeasureLengthPictoElement();
        container.appendChild(picto);

        return container;
    };

    // ################################################################### //
    // ##################### overridden methods ########################## //
    // ################################################################### //

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
    * TODO gestion des styles utilisateurs
    *
    * @param {Object} e - HTMLElement
    *
    * @private
    */
    MeasureLength.prototype.onShowMeasureLengthClick = function (e) {
        logger.trace("call MeasureLength::onShowMeasureLengthClick()", e);
        this.onShowMeasureClick(e, "LineString");
    };

    return MeasureLength;
});
