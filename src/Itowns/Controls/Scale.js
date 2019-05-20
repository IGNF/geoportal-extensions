import GlobeViewExtended from "../GlobeViewExtended";
import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import ScaleDOM from "../../Common/Controls/ScaleDOM";
import Widget from "./Widget";

/**
 * @classdesc
 * Control to display the scalebar with itowns
 *
 * @constructor
 * @alias itowns.control.Scale
 * @extends {itowns.control.Widget}
 * @alias itowns.control.Scale
 * @param {Object} options - widget options
 * @param {String}  options.target - HTML target element id
 * @param {String}  options.position - "absolute" or "relative"
 * @example
 * var scale = new itowns.control.Scale();
 *
 */
function Scale (options) {
    if (!(this instanceof Scale)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    if (typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    this._initialize();

    var container = this._initContainer();

    var targetDiv = document.getElementById(options.target) || null;

    Widget.call(
        this, {
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

// retrieves methods of the common class ScaleDOM
Utils.assign(Scale.prototype, ScaleDOM);

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
 *
 * @param {GlobeViewExtended} globe - the globe
 */
Scale.prototype.setGlobe = function (globe) {
    // info : this function is called after a globe.addWidget() or a globe.removeWidget()

    if (globe) { // In the case of the adding of a control to the globe
        var self = this;
        /**
         * Definition of the scaleControl callback :
         * when the view is changing, we recalculate the graphic scale
         */
        this._callbacks.onChangedViewCallback = function () {
            var value = globe.pixelsToMeters(200);
            value = Math.floor(value);
            var digit = Math.pow(10, value.toString().length - 1);
            value = Math.round(value / digit) * digit;
            var pix = globe.metersToPixels(value);
            var unit = "m";
            if (value >= 1000) {
                value /= 1000;
                unit = "km";
            }
            self.getElement().innerHTML = value + " " + unit;
            self.getElement().style.width = pix + "px";
        };
        // Ajout des listeners
        // initialization
        if (globe.isInitialized()) {
            this._callbacks.onChangedViewCallback();
        } else {
            globe.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, this._callbacks.onChangedViewCallback);
        }

        // At every globe range movement, scale bar may be updated,
        globe.listen(GlobeViewExtended.EVENTS.RANGE_CHANGED, this._callbacks.onChangedViewCallback);
    } else if (globe == null) {
        // we remove the listeners linked to the scalecontrol which has been deleted
        this._globe.forget(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, this._callbacks.onChangedViewCallback);
        this._globe.forget(GlobeViewExtended.EVENTS.RANGE_CHANGED, this._callbacks.onChangedViewCallback);

        // if globe == null we remove the scale control
        // delete the scaleControl DOM
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
    // id of the widget : usefull to suffix the CSS ids (to handle cases with several widgets on the same page)
    this._uid = SelectorID.generate();

    // div which will contain the list divs.
    this._ScaleContainer = null;

    // callbacks
    this._callbacks = {};
};

/**
 * Create control main container
 *
 * @method _initContainer
 * @returns {DOMElement} container - widget container
 * @private
 */
Scale.prototype._initContainer = function () {
    var container = this._createMainContainerElement();

    return container;
};

export default Scale;
