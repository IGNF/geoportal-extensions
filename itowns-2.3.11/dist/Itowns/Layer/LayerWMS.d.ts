export default LayerWMS;
/**
 * @classdesc
 * Geoportal WMTS source creation
 *
 * @constructor
 * @alias itowns.layer.GeoportalWMS
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.itownsParams] - other options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
 * @example
 * var geoportalWMS = new itowns.layer.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
declare function LayerWMS(options: {
    layer: string;
    ssl?: boolean | undefined;
    apiKey?: string | undefined;
    itownsParams?: Object | undefined;
}): any;
declare class LayerWMS {
    /**
     * @classdesc
     * Geoportal WMTS source creation
     *
     * @constructor
     * @alias itowns.layer.GeoportalWMS
     * @param {Object} options            - options for function call.
     * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
     * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
     * @param {String} [options.apiKey]   - Access key to Geoportal platform
     * @param {Object} [options.itownsParams] - other options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
     * @example
     * var geoportalWMS = new itowns.layer.GeoportalWMS({
     *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
     * });
     */
    constructor(options: {
        layer: string;
        ssl?: boolean | undefined;
        apiKey?: string | undefined;
        itownsParams?: Object | undefined;
    });
    constructor: typeof LayerWMS;
}
//# sourceMappingURL=LayerWMS.d.ts.map