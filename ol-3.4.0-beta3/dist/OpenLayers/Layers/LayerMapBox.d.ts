export default LayerMapBox;
/**
 * @classdesc
 * Geoportal Layer Mapbox creation
 *
 * @constructor
 * @extends {ol.layer.VectorTile}
 * @alias ol.layer.GeoportalMapBox
 * @type {ol.layer.GeoportalMapBox}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "PLAN.IGN")
 * @param {String} [options.style]    - Style name (e.g. "classique")
 * @param {String} [options.source]   - Source name (e.g. "plan_ign")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {Object} [settings] - other options for ol.layer.VectorTile function (see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html ol.layer.VectorTile})
 * @example
 * var LayerMapBox = new ol.layer.GeoportalMapBox({
 *      layer  : "PLAN.IGN",
 *      [style  : "classique",]
 *      [source : "plan_ign",]
 *      [ssl: true]
 * }, {
 *      opacity
 *      visible
 *      extent
 *      declutter
 *      ...
 * });
 */
declare var LayerMapBox: ol.layer.GeoportalMapBox;
//# sourceMappingURL=LayerMapBox.d.ts.map