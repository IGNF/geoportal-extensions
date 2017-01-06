
define(["ol", "Common/Utils/LayerUtils"], function (ol, LayerUtils) {

    "use strict";

    /**
     * @classdesc
     * OpenLayers Control to manage Originators for layer resources
     *
     * @constructor
     * @extends {ol.control.Attribution}
     * @alias ol.control.GeoportalAttribution
     * @param {Object} options - ol.control.Attribution options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Attribution.html ol.Control.Attribution})
     * @example
     * map.addControl(
     *      new ol.control.GeoportalAttribution({
     *          collapsed : false
     * );
     */
    function GeoportalAttribution (options) {

        if (!(this instanceof GeoportalAttribution)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // call ol.control.Attribution constructor
        ol.control.Attribution.call(this,
            options
        );

    }

    // Inherits from ol.control.Attribution
    ol.inherits(GeoportalAttribution, ol.control.Attribution);

    /*
     * @lends module:GeoportalAttribution
     */
    GeoportalAttribution.prototype = Object.create(ol.control.Attribution.prototype, {});

    /**
     * Constructor (alias)
     */
    GeoportalAttribution.prototype.constructor = GeoportalAttribution;

    /**
     * Overload setMap function, that enables to catch map events, such as movend events.
     *
     * @param {ol.Map} map - Map.
     */
    GeoportalAttribution.prototype.setMap = function (map) {

        if (map != null) {
            // Remove default ol.control.Attribution
            var ctrls = map.getControls();
            ctrls.forEach(
                function (element) {
                    if ( element instanceof ol.control.Attribution && !(element instanceof ol.control.GeoportalAttribution) ) {
                        this.remove(element);
                    }
                },
                ctrls
            );

            // on récupère les attributions des couches déjà ajoutées à la carte.
            this._updateAttributions(map);

            // At every map movement, layers attributions have to be updated,
            // according to map and originators zoom and extent.
            var context = this;
            map.on(
                "moveend",
                function () {
                    context._updateAttributions(map);
                },
                this
            );
            map.getLayers().on(
                "add",
                function () {
                    context._updateAttributions(map);
                },
                this
            );
            map.getLayers().on(
                "remove",
                function () {
                    context._updateAttributions(map);
                },
                this
            );
        }

        ol.control.Attribution.prototype.setMap.call(this, map);

    };

    /**
     * Overload setMap function, that enables to catch map events, such as movend events.
     *
     * @param {ol.Map} map - Map.
     * @private
     */
    GeoportalAttribution.prototype._updateAttributions = function (map) {
        // get map parameters
        var visibility;
        var originators;
        var mapAttributions = {};

        var view = map.getView();
        // extent, then convert to geographical coordinates
        var extent = view.calculateExtent(map.getSize());
        var mapProjection = view.getProjection().getCode();
        var geoExtent = ol.proj.transformExtent(extent, mapProjection, "EPSG:4326");
        // transform extent from [minx, miny, maxx, maxy] to [maxy, minx, miny, maxx]
        var standardExtent = [geoExtent[3], geoExtent[0], geoExtent[1], geoExtent[2]];
        // zoom
        var zoom = view.getZoom();
        // layers
        var layers = map.getLayers().getArray();

        // loop on layers to get their originators, if there is at least one originator, and if layer is visible.
        for (var i = 0; i < layers.length; i++ ) {

            var src = layers[i].getSource();

            var attributions = [];

            visibility = layers[i].getVisible();
            originators = src._originators;

            if ( originators && visibility ) {

                // get layer's attributions array
                var layerAttributions = LayerUtils.getAttributions({
                    extent : standardExtent,
                    crs : mapProjection,
                    zoom : zoom,
                    visibility : visibility,
                    originators : originators
                });

                for ( var j = 0; j < layerAttributions.length; j++ ) {
                    var attributionj = layerAttributions[j];
                    // check that this attribution hasn't been added yet for another layer
                    if ( !mapAttributions || !mapAttributions[attributionj] ) {
                        // add attribution html
                        attributions.push(new ol.Attribution({
                            html : attributionj
                        }));

                        // add attribution to mapAttributions, to manage all layers attributions
                        mapAttributions[attributionj] = true;
                    }
                };

                // update source attribution
                if (attributions.length !== 0) {
                    src.setAttributions(attributions);
                }
            }
        }
    };

    return GeoportalAttribution;
});
