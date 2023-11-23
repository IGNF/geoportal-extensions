export default LayerWMTS;
/**
 * @classdesc
 * Geoportal WMTS source creation
 *
 * @constructor
 * @alias itowns.layer.GeoportalWMTS
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Array} [options.legends]   - Overloads the default legends objects associated to the layer
 * @param {Array} [options.metadata]   - Overloads the default Metadata objects associated to the layer
 * @param {String} [options.title]   - Overloads the default title of the layer
 * @param {String} [options.description]   - Overloads the default description of the layer
 * @param {String} [options.quicklookUrl]   - Overloads the default quicklookUrl of the layer
 * @param {Object} [options.itownsParams] - other options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
 * @example
 * var geoportalWMTS = new itowns.layer.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
declare function LayerWMTS(options: {
    layer: string;
    ssl?: boolean | undefined;
    apiKey?: string | undefined;
    legends?: any[] | undefined;
    metadata?: any[] | undefined;
    title?: string | undefined;
    description?: string | undefined;
    quicklookUrl?: string | undefined;
    itownsParams?: Object | undefined;
}): any;
declare class LayerWMTS {
    /**
     * @classdesc
     * Geoportal WMTS source creation
     *
     * @constructor
     * @alias itowns.layer.GeoportalWMTS
     * @param {Object} options            - options for function call.
     * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
     * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
     * @param {String} [options.apiKey]   - Access key to Geoportal platform
     * @param {Array} [options.legends]   - Overloads the default legends objects associated to the layer
     * @param {Array} [options.metadata]   - Overloads the default Metadata objects associated to the layer
     * @param {String} [options.title]   - Overloads the default title of the layer
     * @param {String} [options.description]   - Overloads the default description of the layer
     * @param {String} [options.quicklookUrl]   - Overloads the default quicklookUrl of the layer
     * @param {Object} [options.itownsParams] - other options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
     * @example
     * var geoportalWMTS = new itowns.layer.GeoportalWMTS({
     *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
     * });
     */
    constructor(options: {
        layer: string;
        ssl?: boolean | undefined;
        apiKey?: string | undefined;
        legends?: any[] | undefined;
        metadata?: any[] | undefined;
        title?: string | undefined;
        description?: string | undefined;
        quicklookUrl?: string | undefined;
        itownsParams?: Object | undefined;
    });
    constructor: typeof LayerWMTS;
}
//# sourceMappingURL=LayerWMTS.d.ts.map