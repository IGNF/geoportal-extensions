export default LayerWMS;
/**
 * @classdesc
 * Geoportal LayerWMS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Tile}
 * @alias ol.layer.GeoportalWMS
 * @type {ol.layer.GeoportalWMS}
 * @param {Object} GeoportalWMSoptions            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Tile function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html ol.layer.Tile})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.TileWMS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.TileWMS.html ol.source.TileWMS})
 * @example
 * var layerWMS = new ol.layer.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
declare var LayerWMS: ol.layer.GeoportalWMS;
//# sourceMappingURL=LayerWMS.d.ts.map