import GlobeViewExtended from "../GlobeViewExtended";
import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import MiniGlobeDOM from "../../Common/Controls/MiniGlobeDOM";
import GeoportalWMTS from "../Layer/LayerWMTS";
import Widget from "./Widget";

/**
 * @classdesc
 * Control to display the MiniGlobe with itowns
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.MiniGlobe
 * @param {Object} [options] - control options
 * @param {Object} [options.layer] - custom itowns layer to display on the mini globe
 * @example
 * var miniglobe = new itowns.control.MiniGlobe();
 *
 */
function MiniGlobe (options) {
    options = options || {};

    if (!(this instanceof MiniGlobe)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    if (options && typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    this._initialize();

    var container = this._initContainer();
    this._options = options;

    var targetDiv = document.getElementById(options.target) || null;

    Widget.call(
        this, {
            name : "Overview",
            element : container,
            target : targetDiv,
            position : options.position
        }
    );
}

/*
 * @lends module:MiniGlobe
 */
MiniGlobe.prototype = Object.create(Widget.prototype, {});

// retrieves methods of the common class MiniGlobeDOM
Utils.assign(MiniGlobe.prototype, MiniGlobeDOM);

/**
 * Constructor (alias)
 *
 * @private
 */
MiniGlobe.prototype.constructor = MiniGlobe;

// ################################################################### //
// ############## public methods (getters, setters) ################## //
// ################################################################### //

/**
 * Bind globe to control
 *
 * @param {GlobeViewExtended} globe - the globe
 */
MiniGlobe.prototype.setGlobe = function (globe) {
    // info : this function is called after a globe.addWidget() or a globe.removeWidget()

    if (globe) { // In the case of the adding of a control to the globe
        var minDistance = 6650000;
        var maxDistance = 30000000;
        var positionOnGlobe = globe.getCenter();
        var miniView = new GlobeViewExtended(this._element, positionOnGlobe, {
            // `limit globe' subdivision level:
            // we're don't need a precise globe model
            // since the mini globe will always be seen from a far point of view (see minDistance above)
            maxSubdivisionLevel : 6,
            sseSubdivisionThreshold: 3,
            // Don't instance default controls since miniview's camera will be synced
            // on the main view's one (see globeView.onAfterRender)
            noControls : true,
            position : "absolute"
        });

        miniView.setBackground();

        var updateMiniGlobeHandler = function () {
            // clamp distance camera from globe
            var distanceCamera = globe.getGlobeView().camera.camera3D.position.length();
            var distance = Math.min(Math.max(distanceCamera, minDistance), maxDistance);
            var camera = miniView.getGlobeView().camera.camera3D;
            var cameraTargetPosition = globe.getGlobeView().controls.getCameraTargetPosition();
            // Update target miniview's camera
            camera.position.copy(cameraTargetPosition).setLength(distance);
            camera.lookAt(cameraTargetPosition);
            miniView.notifyChange(camera);
        };
        globe.listen(GlobeViewExtended.EVENTS.AFTER_RENDER, updateMiniGlobeHandler);
        if (globe.isInitialized()) {
            updateMiniGlobeHandler();
        } else {
            globe.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, updateMiniGlobeHandler);
        }

        /**
         * Add one imagery layer to the miniview (by default, the ortho)
         */
        var miniGlobeLayer = this._options.layer;
        miniView.addLayer(miniGlobeLayer);
        // save as property of the control the globe created for the overview
        this._globeObj = miniView;
    } else if (globe == null) {
        // if globe == null we remove the overview control
        // we delete the overview control DOM
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
 * Initialize MiniGlobe control (called by constructor)
 *
 * @private
 */
MiniGlobe.prototype._initialize = function () {
    // id of the widget : usefull to suffix the CSS ids (to handle cases with several widgets on the same page)
    this._uid = SelectorID.generate();

    // div which will contain the list divs.
    this._MiniGlobeContainer = null;

    // callbacks
    this._callbacks = {};
};

/**
 * Creates control main container
 *
 * @method _initContainer
 * @returns {DOMElement} container - widget container
 * @private
 */
MiniGlobe.prototype._initContainer = function () {
    var container = this._createMainContainerElement();

    return container;
};

export default MiniGlobe;
