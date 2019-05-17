// import CSS
import "../CSS/Controls/Attribution/GPattributionOpenLayers.css";
// import OpenLayers
import Attribution from "ol/control/Attribution";
import { transformExtent as olTransformExtentProj } from "ol/proj";
// import local
import LayerUtils from "../../Common/Utils/LayerUtils";
import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("geoportalattribution");

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
var GeoportalAttribution = (function (Attribution) {
    function GeoportalAttribution (options) {
        options = options || {};

        if (!(this instanceof GeoportalAttribution)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // Attributions are not collapsible for ol/source/OSM except if ...
        options.collapsible = true;

        // call ol.control.Attribution constructor
        Attribution.call(this,
            options
        );
    }

    // Inherits from ol.control.Attribution
    if (Attribution) GeoportalAttribution.__proto__ = Attribution;
    // Object.setPrototypeOf(GeoportalAttribution, Attribution)

    /*
     * @lends module:GeoportalAttribution
     */
    GeoportalAttribution.prototype = Object.create(Attribution && Attribution.prototype, {});

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
                (ctrl) => {
                    if (ctrl instanceof GeoportalAttribution) {
                        return;
                    }
                    if (ctrl) {
                        var classList = ctrl.element.classList;
                        for (var i = 0; i < classList.length; i++) {
                            if (classList[i] === "ol-attribution") {
                                ctrls.remove(ctrl);
                                break;
                            }
                        }
                    }
                }
            );

            // on récupère les attributions des couches déjà ajoutées à la carte.
            this._updateAttributions(map);

            // At every map movement, layers attributions have to be updated,
            // according to map and originators zoom and extent.
            map.on(
                "moveend",
                () => {
                    this._updateAttributions(map);
                }
            );
            map.getLayers().on(
                "add",
                () => {
                    this._updateAttributions(map);
                }
            );
            map.getLayers().on(
                "remove",
                () => {
                    this._updateAttributions(map);
                }
            );
        }

        Attribution.prototype.setMap.call(this, map);
    };

    /**
     * Update map layers attributions
     *
     * @param {ol.Map} map - Map.
     * @private
     */
    GeoportalAttribution.prototype._updateAttributions = function (map) {
        // get map parameters
        var mapAttributions = {};

        var view = map.getView();
        // extent, then convert to geographical coordinates
        var extent = view.calculateExtent(map.getSize());
        var mapProjection = view.getProjection().getCode();
        var geoExtent = olTransformExtentProj(extent, mapProjection, "EPSG:4326");
        // transform extent from [minx, miny, maxx, maxy] to [maxy, minx, miny, maxx]
        var standardExtent = [geoExtent[3], geoExtent[0], geoExtent[1], geoExtent[2]];
        // zoom
        var zoom = view.getZoom();
        // layers
        var layers = map.getLayers().getArray();

        // info : This option suppresses warnings about functions inside of loops.
        /* jshint loopfunc: true */

        // loop on layers to get their originators, if there is at least one originator, and if layer is visible.
        for (var i = 0; i < layers.length; i++) {
            // distinguish case of ol.layer.Group (which is made up of layers with their own source)
            // and other ol.layer (with their own source)
            if (layers[i].getSource) {
                // single ol.layer
                this._updateLayerAttributions(layers[i], mapAttributions, standardExtent, mapProjection, zoom);
            } else if (layers[i].getLayers) {
                // ol.layer.Group
                var lyrs = layers[i].getLayers();
                lyrs.forEach(
                    (lyr) => {
                        if (lyr.getSource) {
                            this._updateLayerAttributions(lyr, mapAttributions, standardExtent, mapProjection, zoom);
                        } else {
                            logger.log("cannot find layer source in layergroup ", layers[i]);
                        }
                    }
                );
            }
        }
    };

    /**
     * Update a layer attributions
     *
     * @param {ol.layer} layer - layer
     * @param {Object} mapAttributions - object recensing attributions already added, to prevent displaying twice the same producer
     * @param {Array} mapExtent - map current extent
     * @param {String} mapCrs - map current crs
     * @param {Number} mapZoom - map current zoom
     * @private
     */
    GeoportalAttribution.prototype._updateLayerAttributions = function (layer, mapAttributions, mapExtent, mapCrs, mapZoom) {
        if (!layer) {
            logger.trace("layer is null !?");
            return;
        }

        var src = layer.getSource();
        if (!src) {
            logger.trace("source is not yet loaded !");
            return;
        }

        var attributions = [];

        var visibility = layer.getVisible();
        var originators = src._originators;

        // info : clean previous attributions ONLY for Geoportal Layers (when src._originators is defined)
        if (typeof originators !== "undefined") {
            src.setAttributions(); // clean
        }

        if (originators && visibility) {
            // get layer's attributions array
            var layerAttributions = LayerUtils.getAttributions({
                extent : mapExtent,
                crs : mapCrs,
                zoom : mapZoom,
                visibility : visibility,
                originators : originators
            });

            for (var j = 0; j < layerAttributions.length; j++) {
                var attributionj = layerAttributions[j];
                // check that this attribution hasn't been added yet for another layer
                if (!mapAttributions || !mapAttributions[attributionj]) {
                    // add attribution html
                    attributions.push(attributionj);

                    // add attribution to mapAttributions, to manage all layers attributions
                    mapAttributions[attributionj] = true;
                }
            };

            // update source attribution
            if (attributions.length !== 0) {
                src.setAttributions(attributions);
            }
        }
    };

    return GeoportalAttribution;
}(Attribution));

export default GeoportalAttribution;

// Expose GeoportalAttribution as ol.control.GeoportalAttribution (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GeoportalAttribution = GeoportalAttribution;
}
