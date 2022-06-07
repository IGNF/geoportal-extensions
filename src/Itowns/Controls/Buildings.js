import Logger from "../../Common/Utils/LoggerByDefault";
import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import BuildingsDOM from "../../Common/Controls/BuildingsDOM";
import Widget from "./Widget";

var logger = Logger.getLogger("Buildings");

/**
 * @classdesc
 * Control to display buildings on the map
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.Buildings
 * @param {Object} buildingsOptions - control options
 * @param {Boolean} [buildingsOptions.MNT = true] - Adds and displays the MNT
 * @param {Boolean} [buildingsOptions.withElevation = true] - Display the buildings at their elevation or on the ground
 * @param {Boolean} [buildingsOptions.defaultVisibility = true] - Visibility of the Buildings Layer at the initialisation
 * @example
 * var buildings = new itowns.control.Buildings ({
 *      MNT : false,
 *      withElevation : false,
 *      target : “controlDiv”
 * })
 */
function Buildings (buildingsOptions) {
    buildingsOptions = buildingsOptions || {};
    var options = buildingsOptions.options || {};

    if (!(this instanceof Buildings)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    if (typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    this._initialize();

    var container = this._initContainer(buildingsOptions);
    var targetDiv = document.getElementById(options.target) || null;

    Widget.call(
        this, {
            name : "Buildings",
            element : container,
            target : targetDiv
        }
    );
}

/*
 * @lends module:Buildings
 */
Buildings.prototype = Object.create(Widget.prototype, {});

// retrieves methods of the common class BuildingsDOM
Utils.assign(Buildings.prototype, BuildingsDOM);

/**
 * Constructor (alias)
 *
 * @private
 */
Buildings.prototype.constructor = Buildings;

// ################################################################### //
// ############## public methods (getters, setters) ################## //
// ################################################################### //

/**
 * Bind globe to control
 *
 * @param {GlobeViewExtended} globe - the globe
 */
Buildings.prototype.setGlobe = function (globe) {
    if (!globe) {
        while (this._element.hasChildNodes()) {
            this._element.removeChild(this._element.lastChild);
        }
        this._element.parentNode.removeChild(this._element);
    }
    // calls original setGlobe method
    Widget.prototype.setGlobe.call(this, globe);
};

// ################################################################### //
// ##################### init component ############################## //
// ################################################################### //

/**
 * Initialize Buildings control (called by constructor)
 *
 * @private
 */
Buildings.prototype._initialize = function () {
    // id of the control ; used to suffix the CSS id (handles cases with severel controls on the same page)
    this._uid = SelectorID.generate();

    // {Object} control layers list. Each key is a layer id, and its value is an object of layers options (layer, id, relief, visibility, title, description...)
    this._layers = {};

    // callbacks
    this._callbacks = {};
};

/**
 * Creates control main container
 *
 * @method _initContainer
 * @param {Object} buildingsOptions - control options
 * @returns {DOMElement} container - widget container
 * @private
 */
Buildings.prototype._initContainer = function (buildingsOptions) {
    var container = this._createMainContainerElement();

    // adds the widget picto in the main container
    var picto = this._createMainPictoElement();
    container.appendChild(picto);

    return container;
};

// ################################################################### //
// ######################### DOM events ############################## //
// ################################################################### //

/**
 * Gets layer id from div id
 *
 * @method _resolveLayerId
 * @param {String} divId - HTML div id
 * @returns {String} layer id
 * @private
 */
Buildings.prototype._resolveLayerId = function (divId) {
    var divName = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
    return divName.substring(divName.indexOf("_ID_") + 4); // ex. 26
};

export default Buildings;
