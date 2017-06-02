define([
    "itowns"
], function (
    itowns
) {

    "use strict";

    /**
     * @classdesc
     *
     * ApiGlobe
     *
     */
    function ApiGlobe () {};

    /**
     * Constructor (alias)
     */
    ApiGlobe.prototype = {};

    /**
     * Constructor (alias)
     */
    ApiGlobe.prototype.constructor = ApiGlobe;

    /**
     * Add a widget.
     */
    ApiGlobe.prototype.addWidget = function addWidget(globe, widget) {
        globe.viewerDiv.appendChild(widget.getElement());
        if (!globe.widgets) {
            globe.widgets = [];
        }
        this.getWidgets(globe).push(widget);
        widget.setMap(globe);
    };

    /**
     * Returns all widgets.
     * @return     {array}  The array of widgets.
     */
    ApiGlobe.prototype.getWidgets = function getWidgets(globe) {
        return globe.widgets;
    };

    /**
     * Remove a widget.
     * @param {object} Widget - The Widget object.
     */
    ApiGlobe.prototype.removeWidget = function removeWidget(globe, widget) {
        widget.setMap();
        globe.widgets.delete(widget);
    };

    /**
     * Get extent
     */
    ApiGlobe.prototype.getExtent = function getExtent() {
        return [90, -180, -90, 180];
    }

    /**
     * Get extent
     */
    ApiGlobe.prototype.getLayerExtent = function getLayerExtent(layer) {
        return [90, -180, -90, 180];
    }

    /**
     * Has layer
     */
    ApiGlobe.prototype.hasLayer = function hasLayer(layerId) {
        // return this.layersState[layerId]?1:0;
        return true;
    }

    /**
     * Has layer
     */
    ApiGlobe.prototype.getOrderedLayers = function getOrderedLayers() {
        const map = this.scene.getMap();
        var orderedLayerNames = map.layersConfiguration.getColorLayersIdOrderedBySequence();
        var orderedLayers = [];
        for( var i = 0 ; i < orderedLayerNames.length ; ++i ) {
            orderedLayers.push(this.getLayer(orderedLayerNames[i]));
        }
        return orderedLayers;
    }

    /**
     * Get layer by id
     */
    ApiGlobe.prototype.getLayer = function getLayer(id) {
        var layers = this.getImageryLayers();
        for ( var i = 0 ; i < layers.length ; ++i ) {
            if( layers[i].id === id ) {
                return layers[i];
            }
        }
    }

    /**
     * createSceneGlobe overload
     */
    ApiGlobe.prototype._parent_createSceneGlobe = ApiGlobe.prototype.createSceneGlobe;
    ApiGlobe.prototype.createSceneGlobe = function createSceneGlobe(coordCarto, viewerDiv) {
        viewerDiv.style.position = "relative";
        return this._parent_createSceneGlobe(coordCarto, viewerDiv);
    }

    ApiGlobe.prototype.setLayerIpr = function setLayerIpr(layerId, value) {
        this.getLayerById(layerId).attribution = value;
    }

    ApiGlobe.prototype.getLayerIpr = function getLayerIpr(layerId) {
        return this.getLayerById(layerId).attribution;
    }

    ApiGlobe.prototype.getLayerOpacity = function getLayerOpacity(layerId) {
        return this.getLayerById(layerId).opacity;
    }

    ApiGlobe.prototype.getLayerVisibility = function getLayerVisibility(layerId) {
        return this.getLayerById(layerId).visible;
    }

    return ApiGlobe;
});
