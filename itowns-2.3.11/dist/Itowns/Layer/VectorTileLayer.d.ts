export default VectorTileLayer;
/**
 * @classdesc
 * Geoportal VT source creation
 *
 * @constructor
 * @alias itowns.layer.VectorTileLayer
 * @param {Object} options - options for function call.
 * @param {String} options.id - id to give to the layer
 * @param {String} options.layer - Layer name (e.g. "PLAN.IGN")
 * @param {String} [options.url] - Url to the vector Tile json style
 * @param {String} [options.urlService] - Url to the pbf file. Retrieved in the style file by default.
 * @param {Function} [options.filter] - Filter applied to the vector layer style. Fill/Line layer type by default.
 * @param {Object} [options.attributions] - Attributions of the layer.
 * @param {Object} [options.zoom] - Between which zoom levels the layer is displayed (zoom.min and zoom.max)
 * @example
 * var vectorTileLayer = new itowns.layer.VectorTileLayer({
 *      layer : "PLAN.IGN"
 * });
 */
declare function VectorTileLayer(options: {
    id: string;
    layer: string;
    url?: string | undefined;
    urlService?: string | undefined;
    filter?: Function | undefined;
    attributions?: Object | undefined;
    zoom?: Object | undefined;
}): any;
declare class VectorTileLayer {
    /**
     * @classdesc
     * Geoportal VT source creation
     *
     * @constructor
     * @alias itowns.layer.VectorTileLayer
     * @param {Object} options - options for function call.
     * @param {String} options.id - id to give to the layer
     * @param {String} options.layer - Layer name (e.g. "PLAN.IGN")
     * @param {String} [options.url] - Url to the vector Tile json style
     * @param {String} [options.urlService] - Url to the pbf file. Retrieved in the style file by default.
     * @param {Function} [options.filter] - Filter applied to the vector layer style. Fill/Line layer type by default.
     * @param {Object} [options.attributions] - Attributions of the layer.
     * @param {Object} [options.zoom] - Between which zoom levels the layer is displayed (zoom.min and zoom.max)
     * @example
     * var vectorTileLayer = new itowns.layer.VectorTileLayer({
     *      layer : "PLAN.IGN"
     * });
     */
    constructor(options: {
        id: string;
        layer: string;
        url?: string | undefined;
        urlService?: string | undefined;
        filter?: Function | undefined;
        attributions?: Object | undefined;
        zoom?: Object | undefined;
    });
    constructor: typeof VectorTileLayer;
}
//# sourceMappingURL=VectorTileLayer.d.ts.map