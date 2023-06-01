export default GlobeViewExtended;
/**
 * @classdesc
 *
 * Extended itowns.GlobeView.
 *
 * @constructor
 * @extends {itowns.GlobeView}
 * @param {HTMLElement} viewerDiv - Where to instanciate the Three.js scene in the DOM
 * @param {Object} coordCarto - longitude, latitude, altitude
 * @param {Object} [options] - Optional properties which includes Itowns GlobeView optional properties (see Itowns documentation).
 * @param {Boolean} [options.renderer.isWebGL2=True] - is an Itowns GlobeView optional property to enable webgl 2.0 for THREE.js.
 * @param {String} [options.position="relative"] - "absolute" or "relative"
 */
declare function GlobeViewExtended(viewerDiv: HTMLElement, coordCarto: Object, options?: Object | undefined): void;
declare class GlobeViewExtended {
    /**
     * @classdesc
     *
     * Extended itowns.GlobeView.
     *
     * @constructor
     * @extends {itowns.GlobeView}
     * @param {HTMLElement} viewerDiv - Where to instanciate the Three.js scene in the DOM
     * @param {Object} coordCarto - longitude, latitude, altitude
     * @param {Object} [options] - Optional properties which includes Itowns GlobeView optional properties (see Itowns documentation).
     * @param {Boolean} [options.renderer.isWebGL2=True] - is an Itowns GlobeView optional property to enable webgl 2.0 for THREE.js.
     * @param {String} [options.position="relative"] - "absolute" or "relative"
     */
    constructor(viewerDiv: HTMLElement, coordCarto: Object, options?: Object | undefined);
    _viewerDiv: HTMLElement;
    _widgets: any[];
    _isInitialized: boolean;
    _globeView: any;
    /**
     * intializes the evenements map
     */
    _initEventMap(): void;
    /**
     * Constructor (alias)
     */
    constructor: typeof GlobeViewExtended;
    /**
     * Get GlobeViex Object (parent)
     * @returns {Object} itowns GlobeView object
     */
    getGlobeView(): Object;
    /**
     * Indicates if the globe is initialized or not
     *
     * @return {Boolean} isInitialized
     *
     */
    isInitialized(): boolean;
    /**
     * Detects when the camera movement stops, then launch the callback given as parameter
     *
     * @param {Function} cb - The function to execute when the event occures.
     *
     */
    onCameraMoveStop(cb: Function): void;
    /**
     * Disables globe controls until the globe rendering is completed
     */
    freezeControl(): void;
    /**
     * Associates a function to trigger when an event is received.
     *
     * @param {String} type - the event type. Can be any of {@link EVENTS}
     * @param {Function} callback - The function to execute when the event occures.
     * @return {Object} key - The event key
     *
     */
    listen(type: string, callback: Function): Object;
    /**
     * Associates a function to trigger when a layer event is received.
     *
     * @param {Object} layer - The itowns layer.
     * @param {String} type - the event type. Can be any of {@link EVENTS}.
     * @param {Function} callback - The function to execute when the event occures.
     * @return {Object} key - The event key
     *
     */
    addLayerListener(layer: Object, type: string, callback: Function): Object;
    /**
     * Returns the target of a given event type
     *
     * @param {String} type - the event type. Can be any of {@link EVENTS}
     * @return {Object} target - The event target.
     *
     */
    _getEventTarget(type: string): Object;
    /**
     * Cancels an event listening
     *
     * @param {Object} key - The event key
     *
     */
    forgetByKey(key: Object): void;
    /**
     * Cancels an layer event listening
     *
     * @param {Object} layer - The itowns layer
     * @param {String} type - the event type
     * @param {Function} callback - The function to execute when the event occures
     *
     */
    removeLayerListener(layer: Object, type: string, callback: Function): void;
    /**
     * Cancels an event listening
     *
     * @param {Object} type - The event type
     * @param {Function} callback - The event handler
     */
    forget(type: Object, callback: Function): void;
    /**
     * Overload itowns.GlobeView addLayer method
     *
     * @param {Object} layer - The itowns layer
     * @return {Promise} promise
     */
    addLayer(layer: Object): Promise<any>;
    /**
     * Overload itowns.GlobeView removeLayer method
     *
     * @param {String} layerId - The layer id
     */
    removeLayer(layerId: string): void;
    /**
     * Set layer opacity
     *
     * @param {String} layerId - Layer id
     * @param {Number} opacityValue - opacity value in [0 1]
     */
    setLayerOpacity(layerId: string, opacityValue: number): void;
    /**
     * Set layer visibility
     *
     * @param {String} layerId - Layer id
     * @param {Boolean} visible - New visibility of the layer
     */
    setLayerVisibility(layerId: string, visible: boolean): void;
    /**
     * Move layer to the specified index
     *
     * @param {String} layerId - Layer id
     * @param {Boolean} index - new index of the layer
     */
    moveLayerToIndex(layerId: string, index: boolean): void;
    /**
     * Remove event listener from the globe
     *
     * @param {String} type - event type
     * @param {Function} callback - event handler
     */
    removeEventListener(type: string, callback: Function): void;
    /**
     * Defines if the current view extent have to be computed on pre-render event
     *
     * @param {Boolean} b - tells if the view extent info should be fetched by the event PRE_RENDER
     */
    preRenderEventFetchViewExtent(b: boolean): void;
    _fetchExtent: boolean | undefined;
    /**
     * Defines if the list of the color layers displayed have to be computed on pre-render event
     *
     * @param {Boolean} b - tells if the displayed color layers info should be fetched by the event PRE_RENDER
     */
    preRenderEventFetchColorLayersDisplayed(b: boolean): void;
    _fetchVisibleColorLayers: boolean | undefined;
    /**
     * Defines if the list of the elevation layers displayed have to be computed on pre-render event
     *
     * @param {Boolean} b - tells if the displayed elevation layers info should be fetched by the event PRE_RENDER
     */
    preRenderEventFetchElevationLayersDisplayed(b: boolean): void;
    _fetchVisibleElevationLayers: boolean | undefined;
    /**
     * Defines if the list of the layers of all types displayed have to be computed on pre-render event
     *
     * @param {Boolean} b - tells if both displayed color layers and displayed elevation layers infos should be fetched by the event PRE_RENDER
     */
    preRenderEventFetchLayersDisplayed(b: boolean): void;
    /**
     * Get layer by its id
     *
     * @param {String} layerId - Layer id
     * @return {Object} layer Object
     */
    getLayerById(layerId: string): Object;
    /**
     * Get color layer by its id
     *
     * @param {String} layerId - Color layer id
     * @return {Object} layer Object
     */
    getColorLayerById(layerId: string): Object;
    /**
     * Get imagery layers
     *
     * @return {Array} imagery layers
     */
    getColorLayers(): any[];
    /**
     * Get vector layers
     *
     * @return {Array} vector layers
     */
    getVectorLayers(): any[];
    /**
     * Get featureGeometry layers
     *
     * @return {Array} imagery layers
     */
    getFeatureGeometryLayers(): any[];
    /**
     * Get elevation layers
     *
     * @return {Array} elevation layers
     */
    getElevationLayers(): any[];
    /**
     * Get the current view extent
     *
     * @returns {Array} current view extent
     */
    getExtent(): any[];
    /**
     * Add a widget to the globe
     *
     * @param {Object} widget - The Widget object to add
     */
    addWidget(widget: Object): void;
    /**
     * Returns all widgets.
     *
     * @return {Array} widgets - The array of widgets.
     */
    getWidgets(): any[];
    /**
     * Removes a widget.
     *
     * @param {Object} widget - The Widget object to remove
     */
    removeWidget(widget: Object): void;
    /**
     * Get html target element
     *
     * @return {HTMLElement} Globe container element
     */
    getTargetElement(): HTMLElement;
    /**
     * Returns current view scale
     *
     * @return {Number} Scale
     */
    getScale(): number;
    /**
     * Sets tilt
     *
     * @param {Number} tilt - Tilt value
     * @return {Promise} - Promise when setTilt is done
     */
    setTilt(tilt: number): Promise<any>;
    /**
     * Returns tilt
     *
     * @return {Number} - Tilt
     */
    getTilt(): number;
    /**
     * Sets azimuth
     *
     * @param {Number} azimuth - Azimuth value
     * @return {Promise} - Promise when setAzimuth is done
     */
    setAzimuth(azimuth: number): Promise<any>;
    /**
     * Returns azimuth
     *
     * @return {Number} azimuth
     */
    getAzimuth(): number;
    /**
     * Gets the coordinate in lat,lon for a given pixel.
     *
     * @param {Number} x - The pixel x-position inside the Globe element.
     * @param {Number} y - The pixel y-position inside the Globe element.
     * @return {Coordinates} position
     */
    getCoordinateFromPixel(x: number, y: number): Coordinates;
    /**
     * Gets the coordinate in lat,lon for a given mouse position.
     *
     * @param {MouseEvent} mouseEvent - A mouse event.
     * @return {Coordinates} position
     */
    getCoordinateFromMouseEvent(mouseEvent: MouseEvent): Coordinates;
    /**
     * Get all visible features that intersect a pixel
     *
     * @param {MouseEvent} mouseEvent - A mouse event.
     * @return {Promise} promise
     */
    getFeaturesAtMousePosition(mouseEvent: MouseEvent): Promise<any>;
    /**
     * Changes the center of the scene on screen to the specified in lat, lon.
     *
     * @param {Object} center - Center object
     * @param {Number} center.longitude - Coordinate longitude WGS84 in degree
     * @param {Number} center.latitude - Coordinate latitude WGS84 in degree
     * @return {Promise} A promise that resolves when the next 'globe initilazed' event fires.
     */
    setCameraTargetGeoPosition(center: {
        longitude: number;
        latitude: number;
    }): Promise<any>;
    /**
     * Retuns the coordinates of the central point on screen in lat,lon and alt
     *
     * @return {Object} center
     */
    getCenter(): Object;
    /**
     * Returns the actual zoom.
     *
     * @return {Number} zoom
     */
    getZoom(): number;
    /**
     * Sets the current zoom.
     *
     * @param {Number} zoom - The zoom
     * @return {Promise} promise
     */
    setZoom(zoom: number): Promise<any>;
    /**
     * To convert the projection in meters on the globe of a number of pixels of screen
     * @param {Number} pixels - count pixels to project
     * @return {Number} projection in meters on globe
     */
    pixelsToMeters(pixels: number): number;
    /**
     * Projection on screen in pixels of length in meter on globe
     * @param {Number} value - Length in meter on globe
     * @return {Number} projection in pixels on screen
     */
    metersToPixels(value: number): number;
    /**
     * Returns the "range": the distance in meters between the camera and the current central point on the screen.
     * @return {Number} number
     */
    getRange(): number;
    /**
     * @return {THREE.Vector3} position
     */
    getCameraTargetPosition(): THREE.Vector3;
    /**
     * To get the layer event infos
     *
     * @param {Object} evt - event
     * @returns {Object} object with event properties
     */
    getLayerEventInfos(evt: Object): Object;
    /**
     * Sets background (specific to miniglobe)
     */
    setBackground(): void;
    /**
     * Sets camera position
     * @param {THREE.Vector3} target - Target position
     * @param {Number} distance - Distance from target
     */
    setCameraPosition(target: THREE.Vector3, distance: number): void;
    /**
     * Sets camera orientation to look at specified target
     * @param {THREE.Vector3} target - Target position
     */
    lookAt(target: THREE.Vector3): void;
    /**
     * Notifies the scene it needs to be updated
     * @param {String} styleUrl - style url
     * @returns {Object} json object
     */
    parseMapboxStyle(styleUrl: string): Object;
    /**
     * Notifies the scene it needs to be updated
     */
    notifyChange(): void;
    /**
    * Resizes itowns
    *
    * @param {Integer} width - canvas width in pixels
    * @param {Integer} height - canvas height in pixels
    */
    resize(width: Integer, height: Integer): void;
    /**
    * Transform to itowns coordinates
    *
    * @param {Object} coordCarto - longitude, latitude, altitude
    * @returns {Object} itowns coordinates
    */
    _transformCoords(coordCarto: Object): Object;
    /**
    * Transform from itowns coordinates
    *
    * @param {Object} itownsCoord - itowns coordinates
    * @returns {Object} coordinates
    */
    _fromItownsCoords(itownsCoord: Object): Object;
}
//# sourceMappingURL=GlobeViewExtended.d.ts.map