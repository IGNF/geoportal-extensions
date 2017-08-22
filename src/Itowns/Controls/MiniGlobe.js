define([
    "Common/Utils",
    "Common/Utils/SelectorID",
    "Common/Controls/MiniGlobeDOM",
    "Itowns/Controls/Widget"
], function (
    Utils,
    SelectorID,
    MiniGlobeDOM,
    Widget
) {
    "use strict";

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

        if ( options && typeof options !== "object" ) {
            throw new Error("ERROR WRONG_TYPE : options should be an object");
        }

        this._initialize();

        var container = this._initContainer();
        var vDiv = document.getElementById("viewerDiv");
        this._options = options;

        // by default, add the control on the viwerDiv
        var targetDiv = document.getElementById(options.target) || vDiv;

        Widget.call(
            this,
            {
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

    // on récupère les méthodes de la classe commune MiniGlobeDOM
    Utils.assign(MiniGlobeDOM, MiniGlobe.prototype);

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
        // info : cette méthode est appelée (entre autres?) après un globe.addWidget() ou globe.removeWidget()

        if ( globe ) { // dans le cas de l'ajout du contrôle au globe
            var minDistance = 10000000;
            var maxDistance = 30000000;
            var positionOnGlobe = {
                longitude : globe.controls.getCameraTargetGeoPosition().longitude(),
                latitude : globe.controls.getCameraTargetGeoPosition().latitude(),
                altitude : globe.controls.getCameraTargetGeoPosition().altitude()
            };
            var miniView = new itowns.GlobeView(this._element, positionOnGlobe, {
                // `limit globe' subdivision level:
                // we're don't need a precise globe model
                // since the mini globe will always be seen from a far point of view (see minDistance above)
                maxSubdivisionLevel : 2,
                // Don't instance default controls since miniview's camera will be synced
                // on the main view's one (see globeView.onAfterRender)
                noControls : true
            });

            // Set a 0 alpha clear value (instead of the default '1')
            // because we want a transparent background for the miniglobe view to be able
            // to see the main view "behind"
            miniView.mainLoop.gfxEngine.renderer.setClearColor(0x000000, 0);

            /**
              * update miniview's camera with the globeView's camera position
              */
            globe.onAfterRender = function onAfterRender () {
                // clamp distance camera from globe
                var distanceCamera = globe.camera.camera3D.position.length();
                var distance = Math.min(Math.max(distanceCamera * 1.5, minDistance), maxDistance);
                var camera = miniView.camera.camera3D;
                // Update target miniview's camera
                camera.position.copy(globe.controls.moveTarget()).setLength(distance);
                camera.lookAt(globe.controls.moveTarget());
                miniView.notifyChange(true);
            };

            /**
              * Add one imagery layer to the miniview (by default, the ortho)
              */
            var miniGlobeLayer = this._options.layer || this._baseLayer;
            miniView.addLayer(miniGlobeLayer);
        } else if (globe == null) {
            // if globe == null we remove the overview control
            // on supprime le DOM de  l'overviewcontrol
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
        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // div qui contiendra les div des listes.
        this._MiniGlobeContainer = null;

        // callbacks
        this._callbacks = {};
    };

    /**
     * Create control main container
     *
     * @method _initContainer
     * @private
     */
    MiniGlobe.prototype._initContainer = function () {

        var container = this._createMainContainerElement();

        return container;
    };

    MiniGlobe.prototype._baseLayer = {
            "type": "color",
            "protocol":   "wmts",
            "id":         "Ortho",
            "url":        "https://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts",
            "updateStrategy": {
                "type": "0",
                "options": {}
            },
            "networkOptions" : {
                "crossOrigin" : "omit"
            },
            "options": {
                "name": "ORTHOIMAGERY.ORTHOPHOTOS",
                "mimetype": "image/jpeg",
                "tileMatrixSet": "PM",
                "tileMatrixSetLimits": {
                    "2": {
                        "minTileRow": 0,
                        "maxTileRow": 4,
                        "minTileCol": 0,
                        "maxTileCol": 4
                    },
                    "3": {
                        "minTileRow": 0,
                        "maxTileRow": 8,
                        "minTileCol": 0,
                        "maxTileCol": 8
                    },
                    "4": {
                        "minTileRow": 0,
                        "maxTileRow": 16,
                        "minTileCol": 0,
                        "maxTileCol": 16
                    },
                    "5": {
                        "minTileRow": 0,
                        "maxTileRow": 32,
                        "minTileCol": 0,
                        "maxTileCol": 32
                    },
                    "6": {
                        "minTileRow": 1,
                        "maxTileRow": 64,
                        "minTileCol": 0,
                        "maxTileCol": 64
                    },
                    "7": {
                        "minTileRow": 3,
                        "maxTileRow": 128,
                        "minTileCol": 0,
                        "maxTileCol": 128
                    },
                    "8": {
                        "minTileRow": 7,
                        "maxTileRow": 256,
                        "minTileCol": 0,
                        "maxTileCol": 256
                    },
                    "9": {
                        "minTileRow": 15,
                        "maxTileRow": 512,
                        "minTileCol": 0,
                        "maxTileCol": 512
                    },
                    "10": {
                        "minTileRow": 31,
                        "maxTileRow": 1024,
                        "minTileCol": 0,
                        "maxTileCol": 1024
                    },
                    "11": {
                        "minTileRow": 62,
                        "maxTileRow": 2048,
                        "minTileCol": 0,
                        "maxTileCol": 2048
                    },
                    "12": {
                        "minTileRow": 125,
                        "maxTileRow": 4096,
                        "minTileCol": 0,
                        "maxTileCol": 4096
                    },
                    "13": {
                        "minTileRow": 2739,
                        "maxTileRow": 4628,
                        "minTileCol": 41,
                        "maxTileCol": 7917
                    },
                    "14": {
                        "minTileRow": 5478,
                        "maxTileRow": 9256,
                        "minTileCol": 82,
                        "maxTileCol": 15835
                    },
                    "15": {
                        "minTileRow": 10956,
                        "maxTileRow": 18513,
                        "minTileCol": 165,
                        "maxTileCol": 31670
                    },
                    "16": {
                        "minTileRow": 21912,
                        "maxTileRow": 37026,
                        "minTileCol": 330,
                        "maxTileCol": 63341
                    },
                    "17": {
                        "minTileRow": 43825,
                        "maxTileRow": 74052,
                        "minTileCol": 660,
                        "maxTileCol": 126683
                    },
                    "18": {
                        "minTileRow": 87651,
                        "maxTileRow": 148105,
                        "minTileCol": 1320,
                        "maxTileCol": 253366
                    },
                    "19": {
                        "minTileRow": 175302,
                        "maxTileRow": 294060,
                        "minTileCol": 170159,
                        "maxTileCol": 343473
                    },
                    "20": {
                        "minTileRow": 376733,
                        "maxTileRow": 384679,
                        "minTileCol": 530773,
                        "maxTileCol": 540914
                    }
                }
            }
    };

    return MiniGlobe;
});
