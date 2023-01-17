export default LayerElevation;
/**
 * @classdesc
 * Geoportal elevation source creation
 *
 * @constructor
 * @alias itowns.layer.GeoportalElevation
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Elevation layer name (e.g. "ELEVATION.ELEVATIONGRIDCOVERAGE")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.itownsParams] - options to overload default geoportal layer options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
 * @example
 * var geoportalElevation = new itowns.layer.GeoportalElevation({
 *      layer  : "ELEVATION.ELEVATIONGRIDCOVERAGE"
 * });
 */
declare function LayerElevation(options: {
    layer: string;
    ssl?: boolean | undefined;
    apiKey?: string | undefined;
    itownsParams?: Object | undefined;
}): any;
declare class LayerElevation {
    /**
     * @classdesc
     * Geoportal elevation source creation
     *
     * @constructor
     * @alias itowns.layer.GeoportalElevation
     * @param {Object} options            - options for function call.
     * @param {String} options.layer      - Elevation layer name (e.g. "ELEVATION.ELEVATIONGRIDCOVERAGE")
     * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
     * @param {String} [options.apiKey]   - Access key to Geoportal platform
     * @param {Object} [options.itownsParams] - options to overload default geoportal layer options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
     * @example
     * var geoportalElevation = new itowns.layer.GeoportalElevation({
     *      layer  : "ELEVATION.ELEVATIONGRIDCOVERAGE"
     * });
     */
    constructor(options: {
        layer: string;
        ssl?: boolean | undefined;
        apiKey?: string | undefined;
        itownsParams?: Object | undefined;
    });
    constructor: typeof LayerElevation;
}
//# sourceMappingURL=LayerElevation.d.ts.map