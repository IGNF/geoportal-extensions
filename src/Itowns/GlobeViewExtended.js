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
    * _getLayersColorVisible
    *
    * @private
    */
    GlobeViewExtended.prototype._getLayersColorVisible = function (node, layers) {
        if (!node || !node.visible) {
            return;
        }
        if (node.level) {
            if (node.material.visible) {
                layers.id = [...new Set(layers.id.concat(node.materials[0].colorLayersId))];
            }
        }
        if (node.children) {
            for (const child of node.children) {
                this._getLayersColorVisible(child, layers);
            }
        }
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

    return GlobeViewExtended;
});
