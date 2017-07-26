define([
    "itowns"
], function (
    itowns
) {

    "use strict";

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
        this.viewerDiv = viewerDiv;

        // widget container
        this._widgets = [];

        // call constructor
        itowns.GlobeView.call(this, viewerDiv, coordCarto, options);

        var parentPreRender = this.preRender;
        /**
        * Overload itowns.GlobeView preRender method
        */
        this.preRender = function () {
            parentPreRender();

            var self = this;
            clearTimeout(this._preRenderTimer);
            this._preRenderTimer = setTimeout( function () {
                if ( self._fetchVisibleColorLayers || self._fetchVisibleElevationLayers || self._fetchExtent ) {

                    var event = {
                        type : "prerender"
                    };
                    if ( self._fetchExtent ) {
                        event.extent = new itowns.Extent("EPSG:4326", 180, -180, 90, -90);
                    }
                    if ( self._fetchVisibleColorLayers || self._fetchVisibleElevationLayers ) {
                        event.layers = {
                            id : []
                        };
                    }

                    self._getCurrentSceneInfos( self.scene, event );

                    self.dispatchEvent(event);
                }
            }, 100);
        };
    }

    /*
    * @lends
    */
    GlobeViewExtended.prototype = Object.create(itowns.GlobeView.prototype, {});

    /**
    * Constructor (alias)
    */
    GlobeViewExtended.prototype.constructor = GlobeViewExtended;

    GlobeViewExtended.prototype.parentAddLayer = GlobeViewExtended.prototype.addLayer;
    /**
    * Overload itowns.GlobeView addLayer method
    */
    GlobeViewExtended.prototype.addLayer = function (layer) {
        this.parentAddLayer(layer);
        this.notifyChange(true);
    };

    GlobeViewExtended.prototype.parentRemoveLayer = GlobeViewExtended.prototype.removeLayer;
    /**
    * Overload itowns.GlobeView removeLayer method
    */
    GlobeViewExtended.prototype.removeLayer = function (layerId) {
        this.parentRemoveLayer(layerId);
        this.notifyChange(true);
    };

    /**
    * Set layer opacity
    *
    * @param {String} layer - Layer object
    * @param {Number} opacityValue - opacity value in [0 1]
    */
    GlobeViewExtended.prototype.setLayerOpacity = function (layer, opacityValue) {
        layer.opacity = opacityValue;
        this.notifyChange(true);
    };

    /**
    * Set layer visibility
    *
    * @param {String} layer - Layer object
    * @param {Boolean} visible - New visibility of the layer
    */
    GlobeViewExtended.prototype.setLayerVisibility = function (layer, visible) {
        layer.visible = visible;
        this.notifyChange(true);
    };

    /**
    * Move layer to the specified index
    *
    * @param {String} layerID - Layer id
    * @param {Boolean} index - new index of the layer
    */
    GlobeViewExtended.prototype.moveLayerToIndex = function (layerID, index) {
        itowns.ColorLayersOrdering.moveLayerToIndex(this, layerID, index);
    };

    GlobeViewExtended.prototype.parentAddEventListener = GlobeViewExtended.prototype.addEventListener;
    /**
    * Add event listener to the globe
    *
    * @param {String} type - event type
    * @param {Boolean} callback - event handler
    */
    GlobeViewExtended.prototype.addEventListener = function (type, callback) {
        switch ( type ) {
            case "mousemove" :
                this.viewerDiv.addEventListener( type, callback );
                break;
            case "centerchanged" :
                this.controls.addEventListener( type, callback );
                break;
            default :
                this.parentAddEventListener( type, callback );
                break;
        }
    };

    GlobeViewExtended.prototype.parentRemoveEventListener = GlobeViewExtended.prototype.addEventListener;
    /**
    * Remove event listener from the globe
    *
    * @param {String} type - event type
    * @param {Boolean} callback - event handler
    */
    GlobeViewExtended.prototype.removeEventListener = function (type, callback) {
        switch ( type ) {
            case "mousemove" :
                this.viewerDiv.removeEventListener( type, callback );
                break;
            case "centerchanged" :
                this.controls.removeEventListener( type, callback );
                break;
            default :
                this.parentRemoveEventListener( type, callback );
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
    * @param {String} id - Layer id
    * @return {Object} layer Object
    */
    GlobeViewExtended.prototype.getLayerById = function (id) {
        return this.getLayers( function (layer) {
            if (layer.id === id) {
                return layer;
            }
        })[0];
    };

    /**
    * Get imagery layers
    *
    * @return {Array} imagery layers
    */
    GlobeViewExtended.prototype.getColorLayers = function () {
        return this.getLayers( function (layer) {
            if (layer.type === "color") {
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
        return this.getLayers( function (layer) {
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
            extent : new itowns.Extent("EPSG:4326", 180, -180, 90, -90)
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
                if (options.layers && options.layers.id) {
                    if (this._fetchVisibleColorLayers) {
                        for ( var i in node.material.colorLayersId ) {
                            if ( options.layers.id.indexOf(node.material.colorLayersId[i]) < 0 ) {
                                options.layers.id.push(node.material.colorLayersId[i]);
                            }
                        }
                    }
                    if (this._fetchVisibleElevationLayers) {
                        for ( var j in node.material.elevationLayersId ) {
                            if ( options.layers.id.indexOf(node.material.elevationLayersId[j]) < 0 ) {
                                options.layers.id.push(node.material.elevationLayersId[j]);
                            }
                        }
                    }
                }
                if (options.extent) {
                    options.extent.merge(node.extent);
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
    GlobeViewExtended.prototype.addWidget = function addWidget (widget) {
        if ( !widget.getTarget() ) {
            widget.setTarget(this.viewerDiv, "absolute");
        }
        widget.setGlobe(this);
        this._widgets.push(widget);
    };

    /**
     * Returns all widgets.
     *
     * @return {Array} widgets - The array of widgets.
     */
    GlobeViewExtended.prototype.getWidgets = function getWidgets () {
        return this._widgets;
    };

    /**
     * Removes a widget.
     *
     * @param {Object} widget - The Widget object to remove
     */
    GlobeViewExtended.prototype.removeWidget = function removeWidget (widget) {
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
    GlobeViewExtended.prototype.getTargetElement = function getTargetElement () {
        return this.viewerDiv;
    };

    /**
     * Returns current view scale
     *
     * @return {Number} Scale
     */
    GlobeViewExtended.prototype.getScale = function getScale () {
        return this.controls.getScale();
    };

    return GlobeViewExtended;
});
