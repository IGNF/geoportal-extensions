define([
    "itowns",
    "woodman"
], function (
    Itowns,
    woodman
) {
    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("GlobeViewExtended");

    /**
    * @classdesc
    *
    * Extended itowns.GlobeView.
    *
    * @constructor
    * @extends {itowns.GlobeView}
    */
    function GlobeViewExtended (viewerDiv, coordCarto, options) {

        viewerDiv.style.position = "relative";

        // stockage de l'élément html porteur du globe
        this._viewerDiv = viewerDiv;

        // widget container
        this._widgets = [];

        // mapping des evenements
        this._initEventMap();

        // pour savoir si le globe est initialise
        this._isInitialized = false;

        // call constructor
        this._globeView = new Itowns.GlobeView(viewerDiv, coordCarto, options);

        var self = this;
        this.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, function () {
            self._isInitialized = true;
        });

        this._globeView.addFrameRequester(Itowns.MAIN_LOOP_EVENTS.BEFORE_RENDER, (function () {
            clearTimeout(this._preRenderTimer);
            self._preRenderTimer = setTimeout( function () {
                if ( self._fetchVisibleColorLayers || self._fetchVisibleElevationLayers || self._fetchExtent ) {

                    var event = {
                        type : GlobeViewExtended.EVENTS.PRE_RENDER
                    };
                    if ( self._fetchExtent ) {
                        event.extent = new Itowns.Extent("EPSG:4326", 180, -180, 90, -90);
                    }
                    if ( self._fetchVisibleColorLayers ) {
                        event.colorLayersId = [];
                    }
                    if ( self._fetchVisibleElevationLayers ) {
                        event.elevationLayersId = [];
                    }

                    self._getCurrentSceneInfos( self._globeView.scene, event );

                    self._globeView.dispatchEvent(event);
                }
            }, 100);
        }).bind(this));

        this.freezeControl();

    }

    /**
     * intializes the evenements map
     */
    GlobeViewExtended.prototype._initEventMap = function () {
        if ( !GlobeViewExtended.EVENTS ) {
            GlobeViewExtended.EVENTS = {
                RANGE_CHANGED  : Itowns.CONTROL_EVENTS.RANGE_CHANGED,
                CENTER_CHANGED  : Itowns.CONTROL_EVENTS.CAMERA_TARGET_CHANGED,
                ORIENTATION_CHANGED : Itowns.CONTROL_EVENTS.ORIENTATION_CHANGED,
                LAYER_ADDED : Itowns.GLOBE_VIEW_EVENTS.LAYER_ADDED,
                LAYER_REMOVED : Itowns.GLOBE_VIEW_EVENTS.LAYER_REMOVED,
                LAYERS_ORDER_CHANGED : Itowns.GLOBE_VIEW_EVENTS.COLOR_LAYERS_ORDER_CHANGED,
                GLOBE_INITIALIZED : Itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED,
                VIEW_INITIALIZED : "viewinitialized",
                PRE_RENDER : "prerender",
                MOUSE_MOVE : "mousemove",
                AFTER_RENDER : Itowns.MAIN_LOOP_EVENTS.AFTER_RENDER,
                OPACITY_PROPERTY_CHANGED : "opacity-property-changed",
                VISIBLE_PROPERTY_CHANGED : "visible-property-changed",
                SEQUENCE_PROPERTY_CHANGED : "sequence-property-changed"
            };
        }
    };

    /**
    * Constructor (alias)
    */
    GlobeViewExtended.prototype.constructor = GlobeViewExtended;

    /**
     * Get GlobeViex Object (parent)
     */
    GlobeViewExtended.prototype.getGlobeView = function () {
        return this._globeView;
    };

    /**
     * Indicates if the globe is initialized or not
     *
     * @return {Boolean} isInitialized
     *
     */
    GlobeViewExtended.prototype.isInitialized = function () {
        return this._isInitialized;
    };

    /**
     * Disables globe controls until the globe rendering is completed
     */
    GlobeViewExtended.prototype.freezeControl = function () {
        // disable navigation
        this._globeView .controls.enabled = false;

        var self = this;
        /**
         * afterRenderHandler function (duplicated code from itowns?)
         */
        var afterRenderHandlerFunction = function afterRenderHandler () {
            if (self._globeView.mainLoop.scheduler.commandsWaitingExecutionCount() == 0 && self._globeView._changeSources.size == 0) {
                // enable navigation
                self._globeView.controls.enabled = true;
                self._globeView.removeFrameRequester(Itowns.MAIN_LOOP_EVENTS.AFTER_RENDER, afterRenderHandler);
            }
        }; 
        this._globeView.addFrameRequester(Itowns.MAIN_LOOP_EVENTS.AFTER_RENDER, afterRenderHandlerFunction);
    };

    /**
     * Associates a function to trigger when an event is received.
     *
     * @param {String} type - the event type. Can be any of {@link EVENTS}
     * @param {Function} callback - The function to execute when the event occures.
     * @return {Object} key - The event key
     *
     */
    GlobeViewExtended.prototype.listen = function (type, callback) {
        if ( typeof(callback) != "function") {
            console.log("no callback provided for event : " + type) ;
            return null ;
        }

        var target = this._getEventTarget(type);
        if ( !target ) {
            return null;
        }

        if ( type === GlobeViewExtended.EVENTS.AFTER_RENDER ) {
            target.addFrameRequester(type, callback);
        } else {
            target.addEventListener(type, callback);
        }

        return {
            target : target,
            callback : callback,
            type : type
        };
    };

    /**
     * Associates a function to trigger when a layer event is received.
     *
     * @param {Object} layer - The itowns layer.
     * @param {String} type - the event type. Can be any of {@link EVENTS}.
     * @param {Function} callback - The function to execute when the event occures.
     * @return {Object} key - The event key
     *
     */
    GlobeViewExtended.prototype.addLayerListener = function (layer, type, callback) {
        if ( typeof(callback) != "function") {
            console.log("no callback provided for event : " + type) ;
            return null ;
        }
        layer.addEventListener(type, callback);
        return {
            target : layer,
            callback : callback,
            type : type
        };
    };

    /**
     * Returns the target of a given event type
     *
     * @param {String} type - the event type. Can be any of {@link EVENTS}
     * @return {Object} target - The event target.
     *
     */
    GlobeViewExtended.prototype._getEventTarget = function ( type ) {
        switch (type) {
            case GlobeViewExtended.EVENTS.RANGE_CHANGED :
            case GlobeViewExtended.EVENTS.CENTER_CHANGED :
            case GlobeViewExtended.EVENTS.ORIENTATION_CHANGED :
                return this.getGlobeView().controls;
            case GlobeViewExtended.EVENTS.LAYER_ADDED :
            case GlobeViewExtended.EVENTS.LAYER_REMOVED :
            case GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED :
            case GlobeViewExtended.EVENTS.GLOBE_INITIALIZED :
            case GlobeViewExtended.EVENTS.PRE_RENDER :
            case GlobeViewExtended.EVENTS.AFTER_RENDER :
            case GlobeViewExtended.EVENTS.VIEW_INITIALIZED :
                return this.getGlobeView();
            case GlobeViewExtended.EVENTS.MOUSE_MOVE :
                return this._viewerDiv;
            default :
                console.log("unhandled event : " + type ) ;
                return null ;
        }
    };

    /**
     * Cancels an event listening
     *
     * @param {Object} key - The event key.
     *
     */
    GlobeViewExtended.prototype.forgetByKey = function (key) {
        if ( key.type === GlobeViewExtended.EVENTS.AFTER_RENDER ) {
            key.target.removeFrameRequester(key.type, key.callback);
        } else {
            key.target.removeEventListener(key.type, key.callback);
        }
    };

    /**
     * Cancels an layer event listening
     *
     * @param {Object} layer - The itowns layer.
     * @param {String} type - the event type.
     * @param {Function} callback - The function to execute when the event occures.
     *
     */
    GlobeViewExtended.prototype.removeLayerListener = function (layer, type, callback) {
        this.forgetByKey({
            target : layer,
            callback : callback,
            type : type
        });
    };

    /**
     * Cancels an event listening
     *
     * @param {Object} type - The event type.
     *
     */
    GlobeViewExtended.prototype.forget = function (type, callback) {
        var target = this._getEventTarget(type);
        if ( !target ) {
            return null;
        }

        this.forgetByKey({
            target : target,
            callback : callback,
            type : type
        });
    };

    /**
    * Overload itowns.GlobeView addLayer method
    */
    GlobeViewExtended.prototype.addLayer = function (layer) {
        this.getGlobeView().addLayer(layer);
        this.getGlobeView().notifyChange(true);
    };

    /**
    * Overload itowns.GlobeView removeLayer method
    */
    GlobeViewExtended.prototype.removeLayer = function (layerId) {
        this.getGlobeView().removeLayer(layerId);
        this.getGlobeView().notifyChange(true);
    };

    /**
    * Set layer opacity
    *
    * @param {String} layerId - Layer id
    * @param {Number} opacityValue - opacity value in [0 1]
    */
    GlobeViewExtended.prototype.setLayerOpacity = function (layerId, opacityValue) {
        this.getColorLayerById(layerId).opacity = opacityValue;
        this.getGlobeView().notifyChange(true);
    };

    /**
    * Set layer visibility
    *
    * @param {String} layerId - Layer id
    * @param {Boolean} visible - New visibility of the layer
    */
    GlobeViewExtended.prototype.setLayerVisibility = function (layerId, visible) {
        this.getColorLayerById(layerId).visible = visible;
        this.getGlobeView().notifyChange(true);
    };

    /**
    * Move layer to the specified index
    *
    * @param {String} layerId - Layer id
    * @param {Boolean} index - new index of the layer
    */
    GlobeViewExtended.prototype.moveLayerToIndex = function (layerId, index) {
        Itowns.ColorLayersOrdering.moveLayerToIndex(this.getGlobeView(), layerId, index);
        this.getGlobeView().notifyChange(true);
    };

    /**
    * Remove event listener from the globe
    *
    * @param {String} type - event type
    * @param {Boolean} callback - event handler
    */
    GlobeViewExtended.prototype.removeEventListener = function (type, callback) {
        switch ( type ) {
            case "mousemove" :
                this._viewerDiv.removeEventListener( type, callback );
                break;
            case "centerchanged" :
                this.getGlobeView().controls.removeEventListener( type, callback );
                break;
            default :
                this.getGlobeView().removeEventListener( type, callback );
                break;
        }
    };

    /**
    * Defines if the current view extent have to be computed on pre-render event
    */
    GlobeViewExtended.prototype.preRenderEventFetchViewExtent = function (b) {
        if ( typeof b === "undefined" ) {
            b = true;
        }
        this._fetchExtent = b;
    };

    /**
    * Defines if the list of the color layers displayed have to be computed on pre-render event
    */
    GlobeViewExtended.prototype.preRenderEventFetchColorLayersDisplayed = function (b) {
        if ( typeof b === "undefined" ) {
            b = true;
        }
        this._fetchVisibleColorLayers = b;
    };

    /**
    * Defines if the list of the elevation layers displayed have to be computed on pre-render event
    */
    GlobeViewExtended.prototype.preRenderEventFetchElevationLayersDisplayed = function (b) {
        if ( typeof b === "undefined" ) {
            b = true;
        }
        this._fetchVisibleElevationLayers = b;
    };

    /**
    * Defines if the list of the layers of all types displayed have to be computed on pre-render event
    */
    GlobeViewExtended.prototype.preRenderEventFetchLayersDisplayed = function (b) {
        if ( typeof b === "undefined" ) {
            b = true;
        }
        this._fetchVisibleColorLayers = b;
        this._fetchVisibleElevationLayers = b;
    };

    /**
    * Get layer by its id
    *
    * @param {String} layerId - Layer id
    * @return {Object} layer Object
    */
    GlobeViewExtended.prototype.getLayerById = function (layerId) {
        var layer =  this.getGlobeView().getLayers( function (l) {
            if (l.id === layerId) {
                return l;
            }
        })[0];
        if ( !layer ) {
            logger.trace("[GlobeViewExtended]  : no Layer found for the id '" + layerId + "'") ;
            return;
        }
        return layer ;
    };

    /**
    * Get color layer by its id
    *
    * @param {String} layerId - Color layer id
    * @return {Object} layer Object
    */
    GlobeViewExtended.prototype.getColorLayerById = function ( layerId ) {
        var layer =  this.getGlobeView().getLayers(function (l) {
            if (l.id === layerId && l.type === "color") {
                return l;
            }
        })[0];
        if ( !layer ) {
            logger.trace("[GlobeViewExtended]  : no colorLayer found for the id '" + layerId + "'") ;
            return;
        }
        return layer ;
    };

    /**
    * Get imagery layers
    *
    * @return {Array} imagery layers
    */
    GlobeViewExtended.prototype.getColorLayers = function () {
        return this.getGlobeView().getLayers( function (layer) {
            if (layer.type === "color") {
                return layer;
            }
        });
    };

    /**
    * Get vector layers
    *
    * @return {Array} vector layers
    */
    GlobeViewExtended.prototype.getVectorLayers = function () {
        return this.getGlobeView().getLayers( function (layer) {
            if (layer.protocol === "rasterizer") {
                return layer;
            }
        });
    };

    /**
    * Get elevation layers
    *
    * @return {Array} elevation layers
    */
    GlobeViewExtended.prototype.getElevationLayers = function () {
        return this.getGlobeView().getLayers( function (layer) {
            if (layer.type === "elevation") {
                return layer;
            }
        });
    };

    /**
    * Get the current view extent
    *
    * @return {Array} current view extent
    */
    GlobeViewExtended.prototype.getExtent = function () {
        var options = {
            extent : new Itowns.Extent("EPSG:4326", 180, -180, 90, -90)
        };

        this._getCurrentSceneInfos( this.scene, options );

        return options.extent;
    };

    /**
    * Recursive method to fetch information about the current view (extent, layers displayed...)
    *
    * @private
    */
    GlobeViewExtended.prototype._getCurrentSceneInfos = function (node, options) {
        if (!node || !node.visible) {
            return;
        }
        if (node.level) {
            if (node.material.visible) {
                if (options.colorLayersId) {
                    for ( var i = 0 ; i < node.material.colorLayersId.length ; ++i ) {
                        if ( options.colorLayersId.indexOf(node.material.colorLayersId[i]) < 0 ) {
                            options.colorLayersId.push(node.material.colorLayersId[i]);
                        }
                    }
                }
                if (options.elevationLayersId) {
                    for ( var j = 0 ; j < node.material.elevationLayersId.length ; ++j ) {
                        if ( options.elevationLayersId.indexOf(node.material.elevationLayersId[j]) < 0 ) {
                            options.elevationLayersId.push(node.material.elevationLayersId[j]);
                        }
                    }
                }
                if (options.extent) {
                    options.extent.union(node.extent);
                }
            }
        }
        if (node.children) {
            for (var child in node.children) {
                this._getCurrentSceneInfos(node.children[child], options);
            }
        }
    };

    /**
     * Add a widget to the globe
     *
     * @param {Object} widget - The Widget object to add
     */
    GlobeViewExtended.prototype.addWidget = function (widget) {
        if ( !widget.getTarget() ) {
            widget.setTarget(this._viewerDiv, "absolute");
        }
        widget.setGlobe(this);
        this._widgets.push(widget);
    };

    /**
     * Returns all widgets.
     *
     * @return {Array} widgets - The array of widgets.
     */
    GlobeViewExtended.prototype.getWidgets = function () {
        return this._widgets;
    };

    /**
     * Removes a widget.
     *
     * @param {Object} widget - The Widget object to remove
     */
    GlobeViewExtended.prototype.removeWidget = function (widget) {
        widget.setGlobe();
        for (var idx = 0; idx < this._widgets.length; idx++) {
            if (this._widgets[idx] === widget) {
                this._widgets.splice(idx,1);
            }
        }

    };

    /**
    * Get html target element
    *
    * @return {HTMLElement} Globe container element
    */
    GlobeViewExtended.prototype.getTargetElement = function () {
        return this._viewerDiv;
    };

    /**
     * Returns current view scale
     *
     * @return {Number} Scale
     */
    GlobeViewExtended.prototype.getScale = function () {
        return this.getGlobeView().controls.getScale();
    };

    /**
     * Sets tilt
     *
     * @param {Number} tilt - Tilt value
     */
    GlobeViewExtended.prototype.setTilt = function (tilt) {
        this.getGlobeView().controls.setTilt(tilt, false);
    };

    /**
     * Returns tilt
     *
     * @return {Number} - Tilt
     */
    GlobeViewExtended.prototype.getTilt = function () {
        return this.getGlobeView().controls.getCameraOrientation()[0];
    };

    /**
    * Sets azimuth
    *
    * @param {Number} azimuth - Azimuth value
     */
    GlobeViewExtended.prototype.setAzimuth = function (azimuth) {
        this.getGlobeView().controls.setHeading(azimuth, false);
    };

    /**
     * Returns azimuth
     *
     * @return {Number} azimuth
     */
    GlobeViewExtended.prototype.getAzimuth = function () {
        return this.getGlobeView().controls.getCameraOrientation()[1];
    };

    /**
     * Gets the coordinate in lat,lon for a given pixel.
     *
     * @param {Number} x - The pixel x-position inside the Globe element.
     * @param {Number} y - The pixel y-position inside the Globe element.
     * @return {Coordinates} position
     */
    GlobeViewExtended.prototype.getCoordinateFromPixel = function (x, y) {
        return this.getGlobeView().controls.pickGeoPosition({
            x : x, 
            y : y
        });
    };

    /**
     * Gets the coordinate in lat,lon for a given mouse position.
     *
     * @param {MouseEvent} mouseEvent - A mouse event.
     * @return {Coordinates} position
     */
    GlobeViewExtended.prototype.getCoordinateFromMouseEvent = function (mouseEvent) {
        var coords = this.getGlobeView().eventToViewCoords(mouseEvent);
        return this.getGlobeView().controls.pickGeoPosition(coords);
    };

    /**
     * Get all visible features that intersect a pixel
     *
     * @param {MouseEvent} mouseEvent - A mouse event.
     * @return {Array} visibleFeatures - The array of visible features.
     */
    GlobeViewExtended.prototype.getFeaturesAtMousePosition = function (mouseEvent) {
        var vectorLayers = this.getVectorLayers();
        if (!vectorLayers) {
            return;
        }
        // array of the visible features on the clicker coord
        var visibleFeatures = [];
        var geoCoord = this.getCoordinateFromMouseEvent(mouseEvent);
        if (geoCoord) {
            // buffer around the click inside we retrieve the features
            var precision = this.getGlobeView().controls.pixelsToDegrees(5);
            for (var i = 0; i < vectorLayers.length; i++) {
                var idx;
                var layer = vectorLayers[i];
                // if the layer is not visible, we ignore it
                if (!layer.visible) {
                    continue;
                }
                var result = Itowns.FeaturesUtils.filterFeaturesUnderCoordinate(geoCoord, layer.feature, precision);
                // we add the features to the visible features array
                for (idx = 0; idx < result.length; idx++) {
                    visibleFeatures.push(result[idx]);
                }
            }
        }
        return visibleFeatures;
    };

    /**
     * Changes the center of the scene on screen to the specified in lat, lon.
     *
     * @param {Object} center - Center object
     * @param {Number} center.longitude - Coordinate longitude WGS84 in degree
     * @param {Number} center.latitude - Coordinate latitude WGS84 in degree
     */
    GlobeViewExtended.prototype.setCameraTargetGeoPosition = function (center) {
        this.getGlobeView().controls.setCameraTargetGeoPositionAdvanced(center, false);
    };

    /**
     * Retuns the coordinates of the central point on screen in lat,lon and alt
     *
     * @return {Object} center
     */
    GlobeViewExtended.prototype.getCenter = function () {
        var cameraCenter = this.getGlobeView().controls.getCameraTargetGeoPosition();
        var center = {
            lon  : cameraCenter.longitude(),
            lat  : cameraCenter.latitude(),
            alt  : cameraCenter.altitude()
        };
        return center;
    };

    /**
     * Returns the actual zoom.
     *
     * @return {Number} zoom
     */
    GlobeViewExtended.prototype.getZoom = function () {
        return this.getGlobeView().controls.getZoom();
    };

    /**
     * Sets the current zoom.
     *
     * @param {Number} zoom - The zoom
     */
    GlobeViewExtended.prototype.setZoom = function (zoom) {
        this.getGlobeView().controls.setZoom(zoom,false);
    };

    /**
     * To convert the projection in meters on the globe of a number of pixels of screen
     * @param {Number} pixels - count pixels to project
     * @return {Number} projection in meters on globe
     */
    GlobeViewExtended.prototype.pixelsToMeters = function (pixels) {
        return this.getGlobeView().controls.pixelsToMeters(pixels);
    };

    /**
     * Projection on screen in pixels of length in meter on globe
     * @param {Number} value - Length in meter on globe
     * @return {Number} projection in pixels on screen
     */
    GlobeViewExtended.prototype.metersToPixels = function (value) {
        return this.getGlobeView().controls.metersToPixels(value);
    };

    /**
     * Returns the "range": the distance in meters between the camera and the current central point on the screen.
     * @return {Number} number
     */
    GlobeViewExtended.prototype.getRange = function () {
        return this.getGlobeView().controls.getRange();
    };

    /**
     * @return {THREE.Vector3} position
     */
    GlobeViewExtended.prototype.moveTarget = function () {
        return this.getGlobeView().controls.moveTarget();
    };

    /**
     * To get the layer event infos
     */
    GlobeViewExtended.prototype.getLayerEventInfos = function (evt) {
        var propertyName = evt.type.replace("-property-changed","");
        return {
            propertyName : propertyName,
            previousValue : evt.previous[propertyName],
            newValue : evt.new[propertyName]
        };
    };

    return GlobeViewExtended;
});
