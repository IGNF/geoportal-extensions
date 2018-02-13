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

        // call constructor
        this._globeView = new Itowns.GlobeView(viewerDiv, coordCarto, options);

        this._globeView.addFrameRequester(Itowns.MAIN_LOOP_EVENTS.BEFORE_RENDER, (function () {
            var self = this;
            clearTimeout(this._preRenderTimer);
            this._preRenderTimer = setTimeout( function () {
                if ( self._fetchVisibleColorLayers || self._fetchVisibleElevationLayers || self._fetchExtent ) {

                    var event = {
                        type : "prerender"
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
    }

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
     * Associate a function to trigger when an event is received.
     *
     * @param {String} type - The event type.
     * @param {Function} callback - The function to execute when the event occures.
     *
     */
    GlobeViewExtended.prototype.listen = function (type, callback){
        if ( typeof(callback) != "function") {
            console.log("no callback provided for event : " + type) ;
            return false ;
        }

        switch (type) {
            case "rangechanged" :
                this.getGlobeView().controls.addEventListener(Itowns.CONTROL_EVENTS.RANGE_CHANGED, callback);
                break ;
            case "centerchanged" :
                this.getGlobeView().controls.addEventListener(Itowns.CONTROL_EVENTS.CAMERA_TARGET_CHANGED, callback);
                break;
            case "layeradded" :
                this.getGlobeView().addEventListener(Itowns.GLOBE_VIEW_EVENTS.LAYER_ADDED, callback);
                break ;
            case "layerorderchanged" :
                this.getGlobeView().addEventListener(Itowns.GLOBE_VIEW_EVENTS.COLOR_LAYERS_ORDER_CHANGED, callback);
                break;
            case "globeinitialized" :
                this.getGlobeView().addEventListener(Itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED, callback);
                break ;
            case "layerremoved" :
                this.getGlobeView().addEventListener(Itowns.GLOBE_VIEW_EVENTS.LAYER_REMOVED, callback);
                break ;
            case "prerender" :
                this.getGlobeView().addEventListener(type, callback);
                break ;
            case "mousemove" :
                this._viewerDiv.addEventListener(type, callback);
                break;
            case "afterrender" :
                this.getGlobeView().addFrameRequester(Itowns.MAIN_LOOP_EVENTS.AFTER_RENDER, callback);
                break ;
            default :
                console.log("unhandled event : " + type ) ;
                return false ;
        }
        return true;
    }

    /**
     * Associate a function to trigger when a layer event is received.
     *
     * @param {Object} layer - The itowns layer.
     * @param {String} type - the event type.
     * @param {Function} callback - The function to execute when the event occures.
     *
     */
    GlobeViewExtended.prototype.addLayerListener = function (layer, type, callback){
        if ( typeof(callback) != "function") {
            console.log("no callback provided for event : " + type) ;
            return false ;
        }

        switch (type) {
            case "opacitypropertychanged" :
                layer.addEventListener("opacity-property-changed", callback);
                break;
            case "visiblepropertychanged" :
                layer.addEventListener("visible-property-changed", callback);
                break;
            case "sequencepropertychanged" :
                layer.addEventListener("sequence-property-changed", callback);
                break;
            default :
                console.log("unhandled event : " + type ) ;
                return false ;
        }
        return true;

    }

    /**
     * Cancels an event listening
     *
     * @param {String} type - the event type.
     * @param {Function} callback - The function to execute when the event occures.
     *
     */
    GlobeViewExtended.prototype.forget = function (type, callback){
        if ( typeof(callback) != "function") {
            console.log("no callback provided for event : " + type) ;
            return false ;
        }

        switch (type) {
            case "rangechanged" :
                this.getGlobeView().controls.removeEventListener(Itowns.CONTROL_EVENTS.RANGE_CHANGED, callback);
                break ;
            case "centerchanged" :
                this.getGlobeView().controls.removeEventListener(Itowns.CONTROL_EVENTS.CAMERA_TARGET_CHANGED, callback);
                break;
            case "layeradded" :
                this.getGlobeView().removeEventListener(Itowns.GLOBE_VIEW_EVENTS.LAYER_ADDED, callback);
                break ;
            case "layerorderchanged" :
                this.getGlobeView().removeEventListener(Itowns.GLOBE_VIEW_EVENTS.COLOR_LAYERS_ORDER_CHANGED, callback);
                break;
            case "globeinitialized" :
                this.getGlobeView().removeEventListener(Itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED, callback);
                break ;
            case "layerremoved" :
                this.getGlobeView().removeEventListener(Itowns.GLOBE_VIEW_EVENTS.LAYER_REMOVED, callback);
                break ;
            case "prerender" :
                this.getGlobeView().removeEventListener(type, callback);
                break ;
            case "mousemove" :
                this._viewerDiv.removeEventListener(type, callback);
                break;
            case "afterrender" :
                this.getGlobeView().removeFrameRequester(Itowns.MAIN_LOOP_EVENTS.AFTER_RENDER, callback);
                break ;
            default :
                console.log("unhandled event : " + type ) ;
                return false ;
        }
        return true;
    }

    /**
     * Cancels a layer event listening
     *
     * @param {Object} layer - The itowns layer.
     * @param {String} type - The event type.
     * @param {Function} callback - The function to execute when the event occures.
     *
     */
    GlobeViewExtended.prototype.removeLayerListener = function (layer, type, callback){
        if ( typeof(callback) != "function") {
            console.log("no callback provided for event : " + type) ;
            return false ;
        }

        switch (type) {
            case "opacitypropertychanged" :
                layer.removeEventListener("opacity-property-changed", callback);
                break;
            case "visiblepropertychanged" :
                layer.removeEventListener("visible-property-changed", callback);
                break;
            case "sequencepropertychanged" :
                layer.removeEventListener("sequence-property-changed", callback);
                break;
            default :
                console.log("unhandled event : " + type ) ;
                return false ;
        }
        return true;
    }

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
        if( !layer ) {
            logger.trace("[GlobeViewExtended]  : no Layer found for the id '"+layerId+"'") ;
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
        if( !layer ) {
            logger.trace("[GlobeViewExtended]  : no colorLayer found for the id '"+layerId+"'") ;
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
    }

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
    * @param {number} x - The pixel x-position inside the Globe element.
    * @param {number} y - The pixel y-position inside the Globe element.
    * @return {Coordinates} position
    */
    GlobeViewExtended.prototype.getCoordinateFromPixel = function (x, y) {
       return this.getGlobeView().controls.pickGeoPosition({x:x, y:y});
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
                 var result = itowns.FeaturesUtils.filterFeaturesUnderCoordinate(geoCoord, layer.feature, precision);
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
    * @param {Object} center
    * @param {number}  center.longitude - Coordinate longitude WGS84 in degree
    * @param {number}  center.latitude - Coordinate latitude WGS84 in degree
    * @return {Array} visibleFeatures - The array of visible features.
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
     * @param      {number} pixels count pixels to project
     * @return     {number} projection in meters on globe
     */
     GlobeViewExtended.prototype.pixelsToMeters = function (pixels) {
         return this.getGlobeView().controls.pixelsToMeters(pixels);
     };

     /**
      * Projection on screen in pixels of length in meter on globe
      * @param      {number}  value Length in meter on globe
      * @return     {number}  projection in pixels on screen
      */
      GlobeViewExtended.prototype.metersToPixels = function (value) {
          return this.getGlobeView().controls.metersToPixels(value);
      };

      /**
       * Returns the "range": the distance in meters between the camera and the current central point on the screen.
       * @return {number} number
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

     return GlobeViewExtended;
});
