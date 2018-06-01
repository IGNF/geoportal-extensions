import Logger from "../Common/Utils/LoggerByDefault";
import * as Itowns from "itowns";

var logger = Logger.getLogger("GlobeViewExtended");

/**
 * @classdesc
 *
 * Extended itowns.GlobeView.
 *
 * @constructor
 * @extends {itowns.GlobeView}
 * @param {HTMLElement} viewerDiv - Where to instanciate the Three.js scene in the DOM
 * @param {Object} coordCarto - longitude, latitude, altitude
 * @param {Object} [options] - Optional properties.
 * @param {String} [options.position="relative"] - "absolute" or "relative"
 */
function GlobeViewExtended (viewerDiv, coordCarto, options) {
    viewerDiv.style.position = (!options || !options.position) ? "relative" : options.position;

    this._itowns = Itowns;

    // stockage de l'élément html porteur du globe
    this._viewerDiv = viewerDiv;

    // widget container
    this._widgets = [];

    // mapping des evenements
    this._initEventMap();

    // pour savoir si le globe est initialise
    this._isInitialized = false;

    // call constructor
    this._globeView = new this._itowns.GlobeView(viewerDiv, coordCarto, options);

    var self = this;
    this.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, function () {
        self._isInitialized = true;
    });

    this._globeView.addFrameRequester(this._itowns.MAIN_LOOP_EVENTS.BEFORE_RENDER, function () {
        clearTimeout(this._preRenderTimer);
        self._preRenderTimer = setTimeout(function () {
            if (self._fetchVisibleColorLayers || self._fetchVisibleElevationLayers || self._fetchExtent) {
                var event = {
                    type : GlobeViewExtended.EVENTS.PRE_RENDER
                };
                if (self._fetchExtent) {
                    event.extent = new self._itowns.Extent("EPSG:4326", 180, -180, 90, -90);
                }
                if (self._fetchVisibleColorLayers) {
                    event.colorLayersId = [];
                }
                if (self._fetchVisibleElevationLayers) {
                    event.elevationLayersId = [];
                }

                self._getCurrentSceneInfos(self._globeView.scene, event);

                self._globeView.dispatchEvent(event);
            }
        }, 100);
    }.bind(this));

    if (this._globeView.controls) {
        this.freezeControl();
    }
}

/**
 * intializes the evenements map
 */
GlobeViewExtended.prototype._initEventMap = function () {
    if (!GlobeViewExtended.EVENTS) {
        GlobeViewExtended.EVENTS = {
            RANGE_CHANGED : this._itowns.CONTROL_EVENTS.RANGE_CHANGED,
            CENTER_CHANGED : this._itowns.CONTROL_EVENTS.CAMERA_TARGET_CHANGED,
            ORIENTATION_CHANGED : this._itowns.CONTROL_EVENTS.ORIENTATION_CHANGED,
            LAYER_ADDED : this._itowns.GLOBE_VIEW_EVENTS.LAYER_ADDED,
            LAYER_REMOVED : this._itowns.GLOBE_VIEW_EVENTS.LAYER_REMOVED,
            LAYERS_ORDER_CHANGED : this._itowns.GLOBE_VIEW_EVENTS.COLOR_LAYERS_ORDER_CHANGED,
            GLOBE_INITIALIZED : this._itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED,
            VIEW_INITIALIZED : "viewinitialized",
            PRE_RENDER : "prerender",
            MOUSE_MOVE : "mousemove",
            AFTER_RENDER : this._itowns.MAIN_LOOP_EVENTS.AFTER_RENDER,
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
 * @returns {Object} itowns GlobeView object
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
 * Detects when the camera movement stops, then launch the callback given as parameter
 *
 * @param {Function} cb - The function to execute when the event occures.
 *
 */
GlobeViewExtended.prototype.onCameraMoveStop = function (cb) {
    var self = this;
    function afterRenderHandler () {
        self._globeView.removeFrameRequester(self._itowns.MAIN_LOOP_EVENTS.AFTER_CAMERA_UPDATE, afterRenderHandler);
        cb();
    };
    this._globeView.addFrameRequester(this._itowns.MAIN_LOOP_EVENTS.AFTER_CAMERA_UPDATE, afterRenderHandler);
};

/**
 * Disables globe controls until the globe rendering is completed
 */
GlobeViewExtended.prototype.freezeControl = function () {
    // disable navigation
    this._globeView.controls.enabled = false;

    this.onCameraMoveStop(function () {
        this._globeView.controls.enabled = true;
    }.bind(this));
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
    if (typeof (callback) !== "function") {
        logger.warn("no callback provided for event : " + type);
        return null;
    }

    var target = this._getEventTarget(type);
    if (!target) {
        return null;
    }

    if (type === GlobeViewExtended.EVENTS.AFTER_RENDER) {
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
    if (typeof (callback) !== "function") {
        logger.warn("no callback provided for event : " + type);
        return null;
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
GlobeViewExtended.prototype._getEventTarget = function (type) {
    switch (type) {
        case GlobeViewExtended.EVENTS.RANGE_CHANGED:
        case GlobeViewExtended.EVENTS.CENTER_CHANGED:
        case GlobeViewExtended.EVENTS.ORIENTATION_CHANGED:
            return this.getGlobeView().controls;
        case GlobeViewExtended.EVENTS.LAYER_ADDED:
        case GlobeViewExtended.EVENTS.LAYER_REMOVED:
        case GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED:
        case GlobeViewExtended.EVENTS.GLOBE_INITIALIZED:
        case GlobeViewExtended.EVENTS.PRE_RENDER:
        case GlobeViewExtended.EVENTS.AFTER_RENDER:
        case GlobeViewExtended.EVENTS.VIEW_INITIALIZED:
            return this.getGlobeView();
        case GlobeViewExtended.EVENTS.MOUSE_MOVE:
            return this._viewerDiv;
        default:
            logger.warn("unhandled event : " + type);
            return null;
    }
};

/**
 * Cancels an event listening
 *
 * @param {Object} key - The event key
 *
 */
GlobeViewExtended.prototype.forgetByKey = function (key) {
    if (key.type === GlobeViewExtended.EVENTS.AFTER_RENDER) {
        key.target.removeFrameRequester(key.type, key.callback);
    } else {
        key.target.removeEventListener(key.type, key.callback);
    }
};

/**
 * Cancels an layer event listening
 *
 * @param {Object} layer - The itowns layer
 * @param {String} type - the event type
 * @param {Function} callback - The function to execute when the event occures
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
 * @param {Object} type - The event type
 * @param {Function} callback - The event handler
 */
GlobeViewExtended.prototype.forget = function (type, callback) {
    var target = this._getEventTarget(type);
    if (!target) return;

    this.forgetByKey({
        target : target,
        callback : callback,
        type : type
    });
};

/**
 * Overload itowns.GlobeView addLayer method
 *
 * @param {Object} layer - The itowns layer
 * @return {Promise} promise
 */
GlobeViewExtended.prototype.addLayer = function (layer) {
    var promise = this.getGlobeView().addLayer(layer);
    this.getGlobeView().notifyChange(true);
    return promise;
};

/**
 * Overload itowns.GlobeView removeLayer method
 *
 * @param {String} layerId - The layer id
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
    this._itowns.ColorLayersOrdering.moveLayerToIndex(this.getGlobeView(), layerId, index);
    this.getGlobeView().notifyChange(true);
};

/**
 * Remove event listener from the globe
 *
 * @param {String} type - event type
 * @param {Function} callback - event handler
 */
GlobeViewExtended.prototype.removeEventListener = function (type, callback) {
    switch (type) {
        case "mousemove":
            this._viewerDiv.removeEventListener(type, callback);
            break;
        case "centerchanged":
            this.getGlobeView().controls.removeEventListener(type, callback);
            break;
        default:
            this.getGlobeView().removeEventListener(type, callback);
            break;
    }
};

/**
 * Defines if the current view extent have to be computed on pre-render event
 *
 * @param {Boolean} b - tells if the view extent info should be fetched by the event PRE_RENDER
 */
GlobeViewExtended.prototype.preRenderEventFetchViewExtent = function (b) {
    if (typeof b === "undefined") {
        b = true;
    }
    this._fetchExtent = b;
};

/**
 * Defines if the list of the color layers displayed have to be computed on pre-render event
 *
 * @param {Boolean} b - tells if the displayed color layers info should be fetched by the event PRE_RENDER
 */
GlobeViewExtended.prototype.preRenderEventFetchColorLayersDisplayed = function (b) {
    if (typeof b === "undefined") {
        b = true;
    }
    this._fetchVisibleColorLayers = b;
};

/**
 * Defines if the list of the elevation layers displayed have to be computed on pre-render event
 *
 * @param {Boolean} b - tells if the displayed elevation layers info should be fetched by the event PRE_RENDER
 */
GlobeViewExtended.prototype.preRenderEventFetchElevationLayersDisplayed = function (b) {
    if (typeof b === "undefined") {
        b = true;
    }
    this._fetchVisibleElevationLayers = b;
};

/**
 * Defines if the list of the layers of all types displayed have to be computed on pre-render event
 *
 * @param {Boolean} b - tells if both displayed color layers and displayed elevation layers infos should be fetched by the event PRE_RENDER
 */
GlobeViewExtended.prototype.preRenderEventFetchLayersDisplayed = function (b) {
    if (typeof b === "undefined") {
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
    var layer = this.getGlobeView().getLayers(function (l) {
        if (l.id === layerId) {
            return l;
        }
    })[0];
    if (!layer) {
        logger.trace("[GlobeViewExtended]  : no Layer found for the id '" + layerId + "'");
        return;
    }
    return layer;
};

/**
 * Get color layer by its id
 *
 * @param {String} layerId - Color layer id
 * @return {Object} layer Object
 */
GlobeViewExtended.prototype.getColorLayerById = function (layerId) {
    var layer = this.getGlobeView().getLayers(function (l) {
        if (l.id === layerId && l.type === "color") {
            return l;
        }
    })[0];
    if (!layer) {
        logger.trace("[GlobeViewExtended]  : no colorLayer found for the id '" + layerId + "'");
        return;
    }
    return layer;
};

/**
 * Get imagery layers
 *
 * @return {Array} imagery layers
 */
GlobeViewExtended.prototype.getColorLayers = function () {
    return this.getGlobeView().getLayers(function (layer) {
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
    return this.getGlobeView().getLayers(function (layer) {
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
    return this.getGlobeView().getLayers(function (layer) {
        if (layer.type === "elevation") {
            return layer;
        }
    });
};

/**
 * Get the current view extent
 *
 * @returns {Array} current view extent
 */
GlobeViewExtended.prototype.getExtent = function () {
    var options = {
        extent : new this._itowns.Extent("EPSG:4326", 180, -180, 90, -90)
    };

    this._getCurrentSceneInfos(this.scene, options);

    return options.extent;
};

/**
 * Recursive method to fetch information about the current view (extent, layers displayed...)
 *
 * @param {Object} node - itowns node
 * @param {Object} options - object containing objects to fill with info if specified
 * @private
 */
GlobeViewExtended.prototype._getCurrentSceneInfos = function (node, options) {
    if (!node || !node.visible) {
        return;
    }
    if (node.level) {
        if (node.material.visible) {
            if (options.colorLayersId) {
                for (var i = 0; i < node.material.colorLayersId.length; ++i) {
                    if (options.colorLayersId.indexOf(node.material.colorLayersId[i]) < 0) {
                        options.colorLayersId.push(node.material.colorLayersId[i]);
                    }
                }
            }
            if (options.elevationLayersId) {
                for (var j = 0; j < node.material.elevationLayersId.length; ++j) {
                    if (options.elevationLayersId.indexOf(node.material.elevationLayersId[j]) < 0) {
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
    if (!widget.getTarget()) {
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
            this._widgets.splice(idx, 1);
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
 * @return {Promise} promise
 */
GlobeViewExtended.prototype.setTilt = function (tilt) {
    return this.getGlobeView().controls.setTilt(tilt, false);
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
 * @return {Promise} promise
 */
GlobeViewExtended.prototype.setAzimuth = function (azimuth) {
    return this.getGlobeView().controls.setHeading(azimuth, false);
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
            var result = this._itowns.FeaturesUtils.filterFeaturesUnderCoordinate(geoCoord, layer.feature, precision);
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
 * @return {Promise} A promise that resolves when the next 'globe initilazed' event fires.
 */
GlobeViewExtended.prototype.setCameraTargetGeoPosition = function (center) {
    return this.getGlobeView().controls.setCameraTargetGeoPositionAdvanced(center, false);
};

/**
 * Retuns the coordinates of the central point on screen in lat,lon and alt
 *
 * @return {Object} center
 */
GlobeViewExtended.prototype.getCenter = function () {
    var cameraCenter = this.getGlobeView().controls.getCameraTargetGeoPosition();
    var center = {
        lon : cameraCenter.longitude(),
        lat : cameraCenter.latitude(),
        alt : cameraCenter.altitude()
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
 * @return {Promise} promise
 */
GlobeViewExtended.prototype.setZoom = function (zoom) {
    return this.getGlobeView().controls.setZoom(zoom, false);
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
 *
 * @param {Object} evt - event
 * @returns {Object} object with event properties
 */
GlobeViewExtended.prototype.getLayerEventInfos = function (evt) {
    var propertyName = evt.type.replace("-property-changed", "");
    return {
        propertyName : propertyName,
        previousValue : evt.previous[propertyName],
        newValue : evt.new[propertyName]
    };
};

/**
 * Sets background (specific to miniglobe)
 */
GlobeViewExtended.prototype.setBackground = function () {
    // Set a 0 alpha clear value (instead of the default '1')
    // because we want a transparent background for the miniglobe view to be able
    // to see the main view "behind"
    this.getGlobeView().mainLoop.gfxEngine.renderer.setClearColor(0x000000, 0);
};

/**
 * Sets camera position
 * @param {THREE.Vector3} target - Target position
 * @param {Number} distance - Distance from target
 */
GlobeViewExtended.prototype.setCameraPosition = function (target, distance) {
    this.getGlobeView().camera.camera3D.position.copy(target).setLength(distance);
};

/**
 * Sets camera orientation to look at specified target
 * @param {THREE.Vector3} target - Target position
 */
GlobeViewExtended.prototype.lookAt = function (target) {
    this.getGlobeView().camera.camera3D.lookAt(target);
};

/**
 * Notifies the scene it needs to be updated
 */
GlobeViewExtended.prototype.notifyChange = function () {
    this.getGlobeView().notifyChange(true);
};

/**
* Resizes itowns
*
* @param {Integer} width - canvas width in pixels
* @param {Integer} height - canvas height in pixels
*/
GlobeViewExtended.prototype.resize = function (width, height) {
    this.getGlobeView().mainLoop.gfxEngine.onWindowResize(width, height);
    this.getGlobeView().notifyChange(true);
};

export default GlobeViewExtended;
