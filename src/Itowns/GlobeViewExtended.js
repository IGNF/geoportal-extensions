define([
    "itowns"
], function (
    itowns
) {

    "use strict";
    /**
    * _getLayersColorVisible
    *
    * @private
    */
     function _getLayersColorVisible(node, options) {
        if (!node || !node.visible) {
            return;
        }
        if (node.level) {
            if (node.material.visible) {
                if (options.layers.id) {
                    options.layers.id = [...new Set(options.layers.id.concat(node.materials[0].colorLayersId))];
                }
                if (options.extent) {
                    options.extent.merge(node.extent);
                }
            }
        }
        if (node.children) {
            for (const child of node.children) {
                _getLayersColorVisible(child, options);
            }
        }
    }

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

        // call constructor
        itowns.GlobeView.call(this, viewerDiv, coordCarto, options);

        this.extentGlobe = new itowns.Extent('EPSG:4326', 0, 0, 0, 0);

        var parent_preRender = this.preRender;
        this.preRender = function () {
            parent_preRender();

            var self = this;
            clearTimeout(this.preRenderTimer);
            this.preRenderTimer = setTimeout( function () {
                if( self._fetchVisibleLayers || self._fetchExtent ) {

                    var event = {
                        type : "PRERENDER",
                    };
                    if( self._fetchExtent ) {
                        event.extent = itowns.Extent('EPSG:4326', 180, -180, 90, -90);
                    }
                    if( self._fetchVisibleLayers ) {
                        event.layers = { id: [] };
                    }

                    _getLayersColorVisible( self.scene, event );

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
    * addLayer overLoad
    */
    GlobeViewExtended.prototype.parent_addLayer = GlobeViewExtended.prototype.addLayer;
    GlobeViewExtended.prototype.addLayer = function (layer) {
        this.parent_addLayer(layer);
        this.notifyChange(true);
    }

    /**
    * getLayersColorVisible
    *
    */
    GlobeViewExtended.prototype.getLayersColorVisible = function () {
        const layersDisplayed = { id: [] };
        this._getLayersColorVisible(this.scene,layersDisplayed);
        return layersDisplayed.id;
    }

    /**
    * fetchExtent
    */
    GlobeViewExtended.prototype.fetchExtent = function (b) {
        this._fetchExtent = b;
    }

    /**
    * fetchExtent
    */
    GlobeViewExtended.prototype.fetchVisibleLayers = function (b) {
        this._fetchVisibleLayers = b;
    }

    return GlobeViewExtended;
});
