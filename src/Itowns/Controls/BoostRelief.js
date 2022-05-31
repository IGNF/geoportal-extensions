import Logger from "../../Common/Utils/LoggerByDefault";
import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import BoostReliefDOM from "../../Common/Controls/BoostReliefDOM";
import Widget from "./Widget";

var logger = Logger.getLogger("BoostRelief");

/**
 * @classdesc
 * Control to manage globe layers : their order, visibility and relief, and display their informations (title, description, legends, metadata...)
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.BoostRelief
 * @param {Object} brOptions - control options
 * @param {Object} [brOptions.scale] - Defines the scale used to boost the relief
 * @param {Number} [brOptions.scale.min] - Minimum of the scale - 1 by default
 * @param {Number} [brOptions.scale.max] - Maximum of the scale - 50 by default
 * @param {Number} [brOptions.scale.step] - Step of the scale - 1 by default
 * @param {Boolean} [brOptions.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on globe loading.
 * @param {Boolean} [brOptions.defaultBoost = 1] - Default boost value applied to the widget and the elevation layers when loaded
 * @example
 * var boostRelief = new itowns.control.BoostRelief({
 *      scale : {
 *          max : 30,
 *          step : 2
 *      },
 *      defaultBoost : 6
 * })
 */
function BoostRelief (brOptions) {
    brOptions = brOptions || {};
    var options = brOptions.options || {};

    if (!(this instanceof BoostRelief)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    if (typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    this._initialize();

    var container = this._initContainer(brOptions);
    var targetDiv = document.getElementById(options.target) || null;

    Widget.call(
        this, {
            name : "BoostRelief",
            element : container,
            target : targetDiv
        }
    );
}

/*
 * @lends module:BoostRelief
 */
BoostRelief.prototype = Object.create(Widget.prototype, {});

// retrieves methods of the common class BoostReliefDOM
Utils.assign(BoostRelief.prototype, BoostReliefDOM);

/**
 * Constructor (alias)
 *
 * @private
 */
BoostRelief.prototype.constructor = BoostRelief;

// ################################################################### //
// ############## public methods (getters, setters) ################## //
// ################################################################### //

/**
 * Bind globe to control
 *
 * @param {GlobeViewExtended} globe - the globe
 */
BoostRelief.prototype.setGlobe = function (globe) {
    // TODO - removing listeners
    // this._globe.removeLayerListener(layers[j], GlobeViewExtended.EVENTS.Relief_PROPERTY_CHANGED, this._callbacks.onReliefLayerCallBack);
    // deletes the layerSwitcher DOM
    if (!globe) {
        while (this._element.hasChildNodes()) {
            this._element.removeChild(this._element.lastChild);
        }
        this._element.parentNode.removeChild(this._element);
    }
    // calls original setGlobe method
    Widget.prototype.setGlobe.call(this, globe);
};

/**
 * Collapse or display control main container
 *
 * @param {Boolean} collapsed - True to collapse control, False to display it
 */
BoostRelief.prototype.setCollapsed = function (collapsed) {
    if (collapsed === undefined) {
        logger.error("BoostRelief:setCollapsed - missing collapsed parameter");
        return;
    }
    if (typeof collapsed !== "boolean") {
        logger.error("BoostRelief:setCollapsed - collapsed parameter is not a boolean");
        return;
    }
    var isCollapsed = this.getCollapsed();

    if ((collapsed && isCollapsed) || (!collapsed && !isCollapsed)) {
        return;
    }
    var controlDiv = document.getElementById(this._addUID("GPBoostReliefListContainer"));
    if (collapsed) {
        controlDiv.style.display = "block";
        document.getElementById(this._addUID("GPshowBoostReliefList")).checked = true;
    } else {
        controlDiv.style.display = "none";
        document.getElementById(this._addUID("GPshowBoostReliefList")).checked = false;
    }
};

/**
 * Returns true if widget is collapsed (minimize), false otherwise
 * @return {Boolean} is collapsed
 */
BoostRelief.prototype.getCollapsed = function () {
    return document.getElementById(this._addUID("GPshowBoostReliefList")).checked;
};

// ################################################################### //
// ##################### init component ############################## //
// ################################################################### //

/**
 * Initialize BoostRelief control (called by constructor)
 *
 * @private
 */
BoostRelief.prototype._initialize = function () {
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
 * @param {Object} brOptions - control options
 * @returns {DOMElement} container - widget container
 * @private
 */
BoostRelief.prototype._initContainer = function (brOptions) {
    var container = this._createMainContainerElement();

    // adds in the main container the layer display selector
    var inputShow = this._createMainBoostReliefShowElement(brOptions.collapsed);
    container.appendChild(inputShow);

    // adds the layer list in the main container
    var divA = this._boostReliefListContainer = this._createMainBoostReliefListContainer();
    var boostReliefList = this._createAdvancedToolElement(brOptions);

    divA.appendChild(boostReliefList);
    container.appendChild(divA);

    // adds the widget picto in the main container
    var picto = this._createMainPictoElement();
    container.appendChild(picto);

    if (brOptions.collapsed) {
        divA.style.display = "block";
    } else {
        divA.style.display = "none";
    }

    return container;
};

// ################################################################### //
// ######################### DOM events ############################## //
// ################################################################### //

/**
 * Changes layer relief on layer relief picto click
 *
 * @method _onChangeLayerRelief
 * @param {Object} e - HTML event
 * @private
 */

BoostRelief.prototype._onChangeLayerRelief = function (e) {
    var reliefValue = parseInt(e.target.value);
    var reliefId = document.getElementById(this._addUID("GPreliefValue"));

    reliefId.innerHTML = "x" + reliefValue;

    this._updateLayersRelief(reliefValue);
};

/**
 * Updates relief values of all elevation layers
 *
 * @method _updateLayerRelief
 * @param {Number} reliefValue - relief value
 * @private
 */

BoostRelief.prototype._updateLayersRelief = function (reliefValue) {
    var globe = this.getGlobe();

    function updateScale (layer, value) {
        layer.scale = value;
        globe.notifyChange(layer);
    }
    // if the scale of a single elevationLayer change, we update the scale of all others
    var elevationLayers = globe.getElevationLayers();

    for (var i = 0; i < elevationLayers.length; i++) {
        updateScale(elevationLayers[i], reliefValue);
    }
};

/**
 * Updates relief slider and all elevation layers with the given boost value
 *
 * @method changeBoost
 * @param {Number} reliefValue - relief value
 */

BoostRelief.prototype.changeBoost = function (reliefValue) {
    var layerReliefInput = document.getElementById(this._addUID("GPreliefValueDiv"));

    if (!layerReliefInput) {
        logger.error("BoostRelief:changeBoost - boostRelief slider not loaded");
        return;
    }

    // the reliefValue given must me in the slider range
    if (reliefValue > layerReliefInput.max) {
        reliefValue = layerReliefInput.max;
    }
    if (reliefValue < layerReliefInput.min) {
        reliefValue = layerReliefInput.min;
    }

    // updates the relief of all the elevationlayers
    this._updateLayersRelief(reliefValue);

    // updates the slider cursor
    layerReliefInput.value = reliefValue;

    // updates the slider text
    var layerReliefSpan = document.getElementById(this._addUID("GPreliefValue"));
    if (layerReliefSpan) {
        layerReliefSpan.innerHTML = "x" + reliefValue;
    }
};

/**
 * Gets layer id from div id
 *
 * @method _resolveLayerId
 * @param {String} divId - HTML div id
 * @returns {String} layer id
 * @private
 */
BoostRelief.prototype._resolveLayerId = function (divId) {
    var divName = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
    return divName.substring(divName.indexOf("_ID_") + 4); // ex. 26
};

export default BoostRelief;
