import GlobeViewExtended from "../GlobeViewExtended";
import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import MiniGlobeDOM from "../../Common/Controls/MiniGlobeDOM";
import Widget from "./Widget";

/**
 * @classdesc
 * Control to display the MiniGlobe with itowns
 *
 * @constructor
 * @alias itowns.control.MiniGlobe
 * @extends {itowns.control.Widget}
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
    var vDiv = document.getElementById("viewerDiv");
    this._options = options;

    // by default, adds the control on the viewerDiv
    var targetDiv = document.getElementById(options.target) || vDiv;

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
            // Don't instance default controls since miniview's camera will be synced
            // on the main view's one (see globeView.onAfterRender)
            noControls : true,
            position : "absolute"
        });

        miniView.setBackground();

        /**
         * update miniview's camera with the globeView's camera position
         */
        var updateMiniGlobeHandler = function () {
            // clamp distance camera from globe
            var range = globe.getRange();
            var distance = Math.min(Math.max(range * 1.5, minDistance), maxDistance);
            // Update target miniview's camera
            miniView.setCameraPosition(globe.moveTarget(), distance);
            miniView.lookAt(globe.moveTarget());
            miniView.notifyChange();
        };
        globe.listen(GlobeViewExtended.EVENTS.AFTER_RENDER, updateMiniGlobeHandler);
        if (globe.isInitialized()) {
            updateMiniGlobeHandler;
        } else {
            globe.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, updateMiniGlobeHandler);
        }

        /**
         * Add one imagery layer to the miniview (by default, the ortho)
         */
        var miniGlobeLayer = this._options.layer || this._baseLayer;
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
 * @private
 */
MiniGlobe.prototype._initContainer = function () {
    var container = this._createMainContainerElement();

    return container;
};

MiniGlobe.prototype._baseLayer = {
    type : "color",
    protocol : "wmts",
    id : "Maps",
    url : "https://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts",
    updateStrategy : {
        type : "0",
        options : {}
    },
    networkOptions : {
        crossOrigin : "omit"
    },
    options : {
        name : "GEOGRAPHICALGRIDSYSTEMS.MAPS",
        mimetype : "image/jpeg",
        tileMatrixSet : "PM",
        tileMatrixSetLimits : {
            0 : {
                minTileRow : "0",
                maxTileRow : "0",
                minTileCol : "0",
                maxTileCol : "1"
            },
            1 : {
                minTileRow : "0",
                maxTileRow : "1",
                minTileCol : "0",
                maxTileCol : "2"
            },
            2 : {
                minTileRow : "0",
                maxTileRow : "2",
                minTileCol : "0",
                maxTileCol : "4"
            },
            3 : {
                minTileRow : "0",
                maxTileRow : "5",
                minTileCol : "0",
                maxTileCol : "8"
            },
            4 : {
                minTileRow : "1",
                maxTileRow : "11",
                minTileCol : "0",
                maxTileCol : "16"
            },
            5 : {
                minTileRow : "3",
                maxTileRow : "22",
                minTileCol : "0",
                maxTileCol : "32"
            },
            6 : {
                minTileRow : "7",
                maxTileRow : "45",
                minTileCol : "0",
                maxTileCol : "64"
            },
            7 : {
                minTileRow : "42",
                maxTileRow : "97",
                minTileCol : "0",
                maxTileCol : "115"
            },
            8 : {
                minTileRow : "84",
                maxTileRow : "195",
                minTileCol : "1",
                maxTileCol : "247"
            },
            9 : {
                minTileRow : "170",
                maxTileRow : "390",
                minTileCol : "2",
                maxTileCol : "495"
            },
            10 : {
                minTileRow : "340",
                maxTileRow : "780",
                minTileCol : "5",
                maxTileCol : "990"
            },
            11 : {
                minTileRow : "681",
                maxTileRow : "1544",
                minTileCol : "10",
                maxTileCol : "1981"
            },
            12 : {
                minTileRow : "1363",
                maxTileRow : "3088",
                minTileCol : "20",
                maxTileCol : "3962"
            },
            13 : {
                minTileRow : "2726",
                maxTileRow : "6177",
                minTileCol : "40",
                maxTileCol : "7924"
            },
            14 : {
                minTileRow : "5452",
                maxTileRow : "12355",
                minTileCol : "81",
                maxTileCol : "15847"
            },
            15 : {
                minTileRow : "10944",
                maxTileRow : "21176",
                minTileCol : "163",
                maxTileCol : "31695"
            },
            16 : {
                minTileRow : "21889",
                maxTileRow : "42353",
                minTileCol : "326",
                maxTileCol : "63382"
            },
            17 : {
                minTileRow : "43776",
                maxTileRow : "73526",
                minTileCol : "42528",
                maxTileCol : "85869"
            },
            18 : {
                minTileRow : "87557",
                maxTileRow : "147052",
                minTileCol : "85058",
                maxTileCol : "171738"
            }
        }
    }
};

export default MiniGlobe;
