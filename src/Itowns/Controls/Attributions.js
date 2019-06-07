import GlobeViewExtended from "../GlobeViewExtended";
import Logger from "../../Common/Utils/LoggerByDefault";
import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import LayerUtils from "../../Common/Utils/LayerUtils";
import AttributionDOM from "../../Common/Controls/AttributionDOM";
import Widget from "./Widget";

var logger = Logger.getLogger("Attributions");

/**
 * @classdesc
 * Control to manage layers attributions
 *
 * @constructor
 * @alias itowns.control.Attributions
 * @extends {itowns.control.Widget}
 * @param {Object} aOptions - control options
 * @param {Object} [aOptions.options] - Itowns.control.Control options
 * @param {Boolean} [aOptions.options.collapsed = false] - Specify if the control has to be opened or not.
 * @example
 * var attribution = new itowns.control.Attritbution({
 *  options : {
 *      collapsed: true
 *  }
 * ));
 */
function Attributions (aOptions) {
    aOptions = aOptions || {};
    var options = aOptions.options || {};

    if (!(this instanceof Attributions)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    if (options && typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    this._initialize(options);

    var container = this._initContainer(options);
    var targetDiv = document.getElementById(options.target) || null;

    Widget.call(
        this, {
            name : "Attributions",
            element : container,
            target : targetDiv
        }
    );
}

/*
 * @lends module:Attributions
 */
Attributions.prototype = Object.create(Widget.prototype, {});

// retrieves methods of the common class AttributionDOM
Utils.assign(Attributions.prototype, AttributionDOM);

/**
 * Constructor (alias)
 *
 * @private
 */
Attributions.prototype.constructor = Attributions;

// ################################################################### //
// ############## public methods (getters, setters) ################## //
// ################################################################### //

/**
 * Bind globe to control
 *
 * @param {GlobeViewExtended} globe - the globe
 */
Attributions.prototype.setGlobe = function (globe) {
    // info : this function is called after a globe.addWidget() or a globe.removeWidget()

    if (globe) { // In the case of the adding of a control to the globe
        var self = this;

        // Adding of the listeners

        // At every globe movement, attributions may be updated,
        // according to layers on globe, and their visibility.
        this._callbacks.onPreRenderCallBack = function (e) {
            var allLayers = e.colorLayersId.concat(e.elevationLayersId);

            self._inRangeUpdate(allLayers, e.extent);
        };

        globe.listen(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onPreRenderCallBack);
        globe.preRenderEventFetchViewExtent();
        globe.preRenderEventFetchLayersDisplayed();
    } else {
        // delete listener
        this._globe.forget(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onPreRenderCallBack);

        // delete DOM
        while (this._element.hasChildNodes()) {
            this._element.removeChild(this._element.lastChild);
        }
        this._element.parentNode.removeChild(this._element);
    }

    // call original setGlobe method
    Widget.prototype.setGlobe.call(this, globe);
};

/**
 * Collapse or display control main container
 *
 * @param {Boolean} collapsed - True to collapse control, False to display it
 */
Attributions.prototype.setCollapsed = function (collapsed) {
    if (collapsed === undefined) {
        logger.error("Attributions:setCollapsed - missing collapsed parameter");
        return;
    }
    var isCollapsed = this.getCollapsed();
    if ((collapsed && isCollapsed) || (!collapsed && !isCollapsed)) {
        return;
    }

    document.getElementById(this._addUID("GPshowAttributionsList")).checked = !collapsed;
};

/**
 * Returns true if widget is collapsed (minimize), false otherwise
 *
 * @return {Boolean} collapsed
 */
Attributions.prototype.getCollapsed = function () {
    return !document.getElementById(this._addUID("GPshowAttributionsList")).checked;
};

// ################################################################### //
// ##################### init component ############################## //
// ################################################################### //

/**
 * Initialize Attributions control (called by constructor)
 *
 * @param {Object} options - Itowns.control.Control options
 * @private
 */
Attributions.prototype._initialize = function (options) {
    // id of the widget : usefull to suffix the CSS ids (to handle cases with several widgets on the same page)
    this._uid = SelectorID.generate();

    // div which will contain the list divs.
    this._AttributionContainer = null;

    // callbacks
    this._callbacks = {};

    // options
    this._options = options;
};

/**
 * Creates control main container
 *
 * @method _initContainer
 * @param {Object} options - control options
 * @returns {DOMElement} container - widget container
 * @private
 */
Attributions.prototype._initContainer = function (options) {
    var container = this._createMainContainerElement();

    // adds in the main container the layer display selector
    var inputShow = this._createMainAttributionsShowElement();
    container.appendChild(inputShow);

    // handles the "collapsed" mode
    if (!options.collapsed) {
        inputShow.checked = "checked";
    }
    // adds the layer list in the main container
    var divA = this._attributionListContainer = this._createMainAttributionsListContainer();
    var ulA = this._createAttributionsList();
    divA.appendChild(ulA);
    container.appendChild(divA);

    // adds the widget picto in the main container
    var picto = this._createMainPictoElement(options.collapsed);
    container.appendChild(picto);

    return container;
};

/**
 * Checks layers range
 *
 * @method _inRangeUpdate
 * @param {Array} layersDisplayed - Id of the layers diplayed on screen
 * @param {Object} extent - The globe view extent
 * @private
 */

Attributions.prototype._inRangeUpdate = function (layersDisplayed, extent) {
    var globe = this.getGlobe();

    var scaleDenominator = 1 / globe.getScale();

    var attributions = new Map();

    for (var h = 0; h < layersDisplayed.length; h++) {
        var layer = globe.getLayerById(layersDisplayed[h]);

        var ori = layer.source.attribution;

        if (ori) {
            for (var j = 0; j < ori.length; j++) {
                // if the attribution is already added, we skip to not add it several times
                if (attributions.has(ori[j].name)) {
                    continue;
                };
                // if no constraints are associated to the originator, we just add the attribution
                if (!ori[j].constraints || !ori[j].constraints[0]) {
                    // adds the attribution in the Map() called 'attributions'
                    attributions.set(ori[j].name, ori[j]);
                    continue;
                }
                // if the minScaleDenominator exists
                if (ori[j].constraints[0].minScaleDenominator) {
                    // if min/maxScaleDenominator are equals, we display the attribution corresponding to the zoom level associated to the scale denominator
                    if (ori[j].constraints[0].minScaleDenominator === ori[j].constraints[0].maxScaleDenominator) {
                        // retrieves the zoom level
                        var attributionZoomLevel = LayerUtils.getZoomLevelFromScaleDenominator(ori[j].constraints[0].minScaleDenominator);
                        // selects the scaledenominators around the corresponding zoom level
                        var maxAttributionScaleDenominator = (this._resolutionsWGS84[attributionZoomLevel] + this._resolutionsWGS84[attributionZoomLevel - 1]) / (0.00028 * 2);
                        var minAttributionScaleDenominator = (this._resolutionsWGS84[attributionZoomLevel] + this._resolutionsWGS84[attributionZoomLevel + 1]) / (0.00028 * 2);
                        if (!(maxAttributionScaleDenominator > scaleDenominator && scaleDenominator > minAttributionScaleDenominator)) {
                            continue;
                        }
                    // either, we check we are located between the minScaleDenominator and the maxScaleDenominator
                    } else if (!(ori[j].constraints[0].minScaleDenominator < scaleDenominator && scaleDenominator < ori[j].constraints[0].maxScaleDenominator)) {
                        continue;
                    }
                }
                // checks if 'bbox" exists
                if (ori[j].constraints[0].bbox) {
                    // checks if we are into the bbox limits
                    var intersectsX = (ori[j].constraints[0].bbox.left <= extent.east) && (extent.west <= ori[j].constraints[0].bbox.right);
                    var intersectsY = (ori[j].constraints[0].bbox.bottom <= extent.north) && (extent.south <= ori[j].constraints[0].bbox.top);
                    if (intersectsX && intersectsY) {
                        // adds the attribution in the Map() called 'attributions'
                        attributions.set(ori[j].name, ori[j]);
                    }
                    // if 'bbox' attribute doesn't exist
                } else if (!ori[j].constraints[0].bbox) {
                    attributions.set(ori[j].name, ori[j]);
                }
            }
        }
    }
    this._updateAttributionListContainer(attributions);
};

// ################################################################### //
// ######################### DOM events ############################## //
// ################################################################### //

/**
 * Updates the layer list container
 *
 * @method _updateAttributionListContainer
 * @param {Map} attributions - map of attributions
 * @private
 */
Attributions.prototype._updateAttributionListContainer = function (attributions) {
    var element = document.getElementById(this._addUID("GPAttributionsList"));
    document.getElementById(this._addUID("GPAttributionsList")).parentNode.removeChild(element);

    var ul = this._createAttributionsList();
    attributions.forEach(function (a) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.href = a.url;
        link.innerHTML = a.name + "&nbsp";
        link.target = "_blank";
        li.id = a.name.replace(/\s/g, "");
        li.appendChild(link);
        ul.appendChild(li);
    });
    this._attributionListContainer.appendChild(ul);
};

Attributions.prototype._resolutionsWGS84 = {
    0 : 156543.033928041,
    1 : 78271.51696402048,
    2 : 39135.758482010235,
    3 : 19567.87924100512,
    4 : 9783.93962050256,
    5 : 4891.96981025128,
    6 : 2445.98490512564,
    7 : 1222.99245256282,
    8 : 611.49622628141,
    9 : 305.7481131407048,
    10 : 152.8740565703525,
    11 : 76.43702828517624,
    12 : 38.21851414258813,
    13 : 19.10925707129406,
    14 : 9.554628535647032,
    15 : 4.777314267823516,
    16 : 2.388657133911758,
    17 : 1.194328566955879,
    18 : 0.5971642834779395,
    19 : 0.2985821417389697,
    20 : 0.1492910708694849,
    21 : 0.0746455354347424
};

export default Attributions;
