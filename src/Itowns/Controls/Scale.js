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
                name : "GraphicScale",
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
            /**
              * Definition du callback du scaleControl :
              * quand la vue change, on recalcule l'echelle graphique
              */
            this._callbacks.onChangedViewCallback = function () {
                var value = self.getGlobe().controls.pixelsToMeters(200);
                value = Math.floor(value);
                var digit = Math.pow(10, value.toString().length - 1);
                value = Math.round(value / digit) * digit;
                var pix = self.getGlobe().controls.metersToPixels(value);
                var unit = "m";
                if (value >= 1000) {
                    value /= 1000;
                    unit = "km";
                }
                self.getElement().innerHTML = value + " " + unit;
                self.getElement().style.width = pix + "px";
            };
            // Ajout des listeners
            // Listen for globe full initialisation event
            globe.addEventListener(itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED, this._callbacks.onChangedViewCallback);
            // // At every globe range movement, scale bar may be updated,
            globe.controls.addEventListener(itowns.CONTROL_EVENTS.RANGE_CHANGED, this._callbacks.onChangedViewCallback);
            this._globe = globe;
        } else if (globe == null) {
            // On retire les listeners qui étaient liés au scalecontrol supprimé
            this._globe.removeEventListener(itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED, this._callbacks.onChangedViewCallback);
            this._globe.controls.removeEventListener(itowns.CONTROL_EVENTS.RANGE_CHANGED, this._callbacks.onChangedViewCallback);

            // if globe == null we remove the scale control
            // on supprime le DOM du scale control
            while (this.getElement().hasChildNodes()) {
                this.getElement().removeChild(this.getElement().lastChild);
            }
            this.getElement().parentNode.removeChild(this.getElement());
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

    return Scale;
});
