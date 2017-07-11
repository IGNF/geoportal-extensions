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

        //stockage de l'élément html porteur du globe
        this.viewerDiv = viewerDiv;

        // widget container
        this._widgets = [];

        // call constructor
        itowns.GlobeView.call(this, viewerDiv, coordCarto, options);

        var parent_preRender = this.preRender;
        this.preRender = function () {
            parent_preRender();

            var self = this;
            clearTimeout(this._preRenderTimer);
            this._preRenderTimer = setTimeout( function () {
                if ( self._fetchVisibleLayers || self._fetchExtent ) {

                    var event = {
                        type : "prerender",
                    };
                    if( self._fetchExtent ) {
                        event.extent = new itowns.Extent('EPSG:4326', 180, -180, 90, -90);
                    }
                    if( self._fetchVisibleLayers ) {
                        event.layers = { id: [] };
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

    /**
    * Overload itowns.GlobeView addLayer method
    */
    GlobeViewExtended.prototype.parent_addLayer = GlobeViewExtended.prototype.addLayer;
    GlobeViewExtended.prototype.addLayer = function (layer) {
        this.parent_addLayer(layer);
        this.notifyChange(true);
    }

    /**
    * Overload itowns.GlobeView removeLayer method
    */
    GlobeViewExtended.prototype.parent_removeLayer = GlobeViewExtended.prototype.removeLayer;
    GlobeViewExtended.prototype.removeLayer = function (layerId) {
        this.parent_removeLayer(layerId);
        this.notifyChange(true);
    }

    /**
    * Set layer opacity
    *
    * @param {String} layer - Layer object
    * @param {Number} opacity - opacity value in [0 1]
    */
    GlobeViewExtended.prototype.setLayerOpacity = function (layer, opacityValue) {
        layer.opacity = opacityValue;
        this.notifyChange(true);
    }

    /**
    * Set layer visibility
    *
    * @param {String} layer - Layer object
    * @param {Boolean} visible
    */
    GlobeViewExtended.prototype.setLayerVisibility = function (layer, visible) {
        layer.visible = visible;
        this.notifyChange(true);
    }

    /**
    * Move layer to the specified index
    *
    * @param {String} layerID - Layer id
    * @param {Boolean} index
    */
    GlobeViewExtended.prototype.moveLayerToIndex = function (layerID, index) {
        itowns.ColorLayersOrdering.moveLayerToIndex(this, layerID, index);
    }


    /**
    * Add event listener to the globe
    *
    * @param {String} type - event type
    * @param {Boolean} callback
    */
    GlobeViewExtended.prototype.parent_addEventListener = GlobeViewExtended.prototype.addEventListener;
    GlobeViewExtended.prototype.addEventListener = function (type, callback) {
        switch ( type ) {
            case "mousemove" :
                this.viewerDiv.addEventListener( type, callback );
                break;
            case "centerchanged" :
                this.controls.addEventListener( type, callback );
                break;
            default :
                this.parent_addEventListener( type, callback );
                break;
        }
    }

    /**
    * Remove event listener from the globe
    *
    * @param {String} type - event type
    * @param {Boolean} callback
    */
    GlobeViewExtended.prototype.parent_removeEventListener = GlobeViewExtended.prototype.addEventListener;
    GlobeViewExtended.prototype.removeEventListener = function (type, callback) {
        switch ( type ) {
            case "mousemove" :
                this.viewerDiv.removeEventListener( type, callback );
                break;
            case "centerchanged" :
                this.controls.removeEventListener( type, callback );
                break;
            default :
                this.parent_removeEventListener( type, callback );
                break;
        }
    }

    /**
    * Defines if the current view extent have to be computed on pre-render event
    */
    GlobeViewExtended.prototype.preRenderEventFetchViewExtent = function (b) {
        this._fetchExtent = b;
    }

    /**
    * Defines if the list of the layers displayed have to be computed on pre-render event
    */
    GlobeViewExtended.prototype.preRenderEventFetchLayersDisplayed = function (b) {
        this._fetchVisibleLayers = b;
    }

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
            extent : new itowns.Extent('EPSG:4326', 180, -180, 90, -90)
        };

        this._getCurrentSceneInfos( this.scene, options );

        return options.extent;
    }

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
                    for( var i in node.material.colorLayersId ) {
                        if( options.layers.id.indexOf(node.material.colorLayersId[i]) < 0 ) {
                            options.layers.id.push(node.material.colorLayersId[i]);
                        }
                    }
                    if (this._fetchExtent) {
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
    }

    /**
     * Add a widget to the globe
     *
     * @param {Object} widget - The Widget object to add
     */
    GlobeViewExtended.prototype.addWidget = function addWidget (widget) {
        widget.setGlobe(this);
        if( !widget.getTarget() ) {
            widget.setTarget(this.viewerDiv, "absolute");
        }
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
        return viewerDiv;
    }

    /**
     * Returns current view scale
     *
     * @return {Number} Scale
     */
     GlobeViewExtended.prototype.getScale = function getScale() {
         return this.controls.getScale();
     }

    return GlobeViewExtended;
});
