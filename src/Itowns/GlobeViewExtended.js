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

        // call constructor
        itowns.GlobeView.call(this, viewerDiv, coordCarto, options);

        var parent_preRender = this.preRender;
        this.preRender = function () {
            parent_preRender();

            var self = this;
            clearTimeout(this._preRenderTimer);
            this._preRenderTimer = setTimeout( function () {
                if( self._fetchVisibleLayers || self._fetchExtent ) {

                    var event = {
                        type : "PRERENDER",
                    };
                    if( self._fetchExtent ) {
                        event.extent = new itowns.Extent('EPSG:4326', 180, -180, 90, -90);
                        // event.layers = { id: [] };
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
    * addLayer overLoad
    */
    GlobeViewExtended.prototype.parent_addLayer = GlobeViewExtended.prototype.addLayer;
    GlobeViewExtended.prototype.addLayer = function (layer) {
        this.parent_addLayer(layer);
        this.notifyChange(true);
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

    /**
    * getLayerById
    */
    GlobeViewExtended.prototype.getLayerById = function (id) {
        return this.getLayers( function (layer) {
            if (layer.id === id) {
                return layer;
            }
        })[0];
    };

    /**
    * getColorLayers
    */
    GlobeViewExtended.prototype.getColorLayers = function () {
        return this.getLayers( function (layer) {
            if (layer.type === "color") {
                return layer;
            }
        });
    };

    /**
    * getElevetionLayers
    */
    GlobeViewExtended.prototype.getElevationLayers = function () {
        return this.getLayers( function (layer) {
            if (layer.type === "elevation") {
                return layer;
            }
        });
    };

    /**
    * getExtent
    *
    * @private
    */
    GlobeViewExtended.prototype.getExtent = function () {
        var options = {
            extent : new itowns.Extent('EPSG:4326', 180, -180, 90, -90)
        };

        this._getCurrentSceneInfos( this.scene, options );

        return options.extent;
    }

    /**
    * _getCurrentSceneInfos
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
                    for( var i in node.materials[0].colorLayersId ) {
                        if( options.layers.id.indexOf(node.materials[0].colorLayersId[i]) < 0 ) {
                            options.layers.id.push(node.materials[0].colorLayersId[i]);
                        }
                    }
                    if (this._fetchExtent) {
                        for ( var j in node.materials[0].elevationLayersId ) {
                            if ( options.layers.id.indexOf(node.materials[0].elevationLayersId[j]) < 0 ) {
                                options.layers.id.push(node.materials[0].elevationLayersId[j]);
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

    return GlobeViewExtended;
});
