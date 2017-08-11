define([
    "Common/Utils",
    "Common/Utils/SelectorID",
    "Common/Controls/ScaleDOM",
    "Itowns/Controls/Widget"
], function (
    Utils,
    SelectorID,
    ScaleDOM,
    Widget
) {
    "use strict";

    /**
     * @classdesc
     * Control to display the scalebar with itowns
     *
     * @constructor
     * @alias itowns.control.Scale
     * @extends {itowns.control.Widget}
     * @alias itowns.control.Scale
     * @example
     * var scale = new itowns.control.Scale();
     *
     */
    function Scale (options) {

        options = options || {};

        if (!(this instanceof Scale)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        if ( options && typeof options !== "object" ) {
            throw new Error("ERROR WRONG_TYPE : options should be an object");
        }

        this._initialize();

        var container = this._initContainer();
        var vDiv = document.getElementById("viewerDiv");

        // by default, add the control on the viwerDiv
        var targetDiv = document.getElementById(options.target) || vDiv;

        Widget.call(
            this,
            {
                name : "Scale",
                element : container,
                target : targetDiv,
                position : options.position
            }
        );
    }

    /*
     * @lends module:Scale
     */
    Scale.prototype = Object.create(Widget.prototype, {});

    // on récupère les méthodes de la classe commune ScaleDOM
    Utils.assign(ScaleDOM, Scale.prototype);

    /**
     * Constructor (alias)
     *
     * @private
     */
    Scale.prototype.constructor = Scale;

    // ################################################################### //
    // ############## public methods (getters, setters) ################## //
    // ################################################################### //

    /**
     * Bind globe to control
     */
    Scale.prototype.setGlobe = function (globe) {
        // info : cette méthode est appelée (entre autres?) après un globe.addWidget() ou globe.removeWidget()

        if ( globe ) { // dans le cas de l'ajout du contrôle au globe
            var self = this;

            // Ajout des listeners
            // Listen for globe full initialisation event
            globe.addEventListener(itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED, self._updateScaleWidget.bind(this));
            // At every globe range movement, scale bar may be updated,
            globe.controls.addEventListener(itowns.CONTROL_EVENTS.RANGE_CHANGED, self._updateScaleWidget.bind(this));
        }

        // call original setGlobe method
        Widget.prototype.setGlobe.call(this, globe);
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize Scale control (called by constructor)
     *
     * @private
     */
    Scale.prototype._initialize = function () {
        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // div qui contiendra les div des listes.
        this._ScaleContainer = null;

        // callbacks
        this._callbacks = {};
    };

    /**
     * Create control main container
     *
     * @method _initContainer
     * @private
     */
    Scale.prototype._initContainer = function () {

        var container = this._createMainContainerElement();

        return container;
    };

    /**
     * update the display of the scalebar
     *
     * @method _updateScaleWidget
     * @private
     */
    Scale.prototype._updateScaleWidget = function () {
        var value = this.getGlobe().controls.pixelsToMeters(200);
        value = Math.floor(value);
        var digit = Math.pow(10, value.toString().length - 1);
        value = Math.round(value / digit) * digit;
        var pix = this.getGlobe().controls.metersToPixels(value);
        var unit = "m";
        if (value >= 1000) {
            value /= 1000;
            unit = "km";
        }
        this.getElement().innerHTML = value + " " + unit;
        this.getElement().style.width = pix + "px";
    };

    return Scale;
});
