export default LayerWMTS;
/**
 * @classdesc
 * Geoportal LayerWMTS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Tile}
 * @alias ol.layer.GeoportalWMTS
 * @type {ol.layer.GeoportalWMTS}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Tile function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html ol.layer.Tile})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
 * @example
 * var layerWMTS = new ol.layer.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
declare var LayerWMTS: ol.layer.GeoportalWMTS;
//# sourceMappingURL=LayerWMTS.d.ts.map