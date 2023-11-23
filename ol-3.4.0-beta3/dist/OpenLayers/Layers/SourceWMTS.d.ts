export default SourceWMTS;
/**
 * @classdesc
 * Geoportal WMTS source creation (inherit from ol.source.WMTS)
 *
 * @constructor
 * @alias ol.source.GeoportalWMTS
 * @type {ol.source.GeoportalWMTS}
 * @extends {WMTSExtended}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Array} [options.legends]   - Legends objects associated to the layer
 * @param {Array} [options.metadata]   - Metadata objects associated to the layer
 * @param {String} [options.title]   - title of the layer
 * @param {String} [options.description]   - description of the layer
 * @param {String} [options.quicklookUrl]   - quicklookUrl of the layer
 * @param {Object} [options.olParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
 * @example
 * var sourceWMTS = new ol.source.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
declare var SourceWMTS: ol.source.GeoportalWMTS;
//# sourceMappingURL=SourceWMTS.d.ts.map