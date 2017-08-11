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

        // by default, add the control on the viwerDiv
        var targetDiv = document.getElementById(options.target) || vDiv;

        Widget.call(
            this,
            {
                name : "MiniGlobe",
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
              * Add one imagery layer to the miniview
              */
            itowns.Fetcher.json("../Resources/JSONLayers/Ortho.json").then(function (layer) {
                miniView.addLayer(layer);
            });
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

    return MiniGlobe;
});
