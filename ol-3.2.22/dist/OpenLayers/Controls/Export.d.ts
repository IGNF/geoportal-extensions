export default ButtonExport;
/**
 * @classdesc
 *
 * Export button
 *
 * @constructor
 * @alias ol.control.Export
 * @param {Object} options - options for function call.
 * @param {String} [options.format = "geojson"] - geojson / kml / gpx
 * @param {String} [options.name = "export"] - export name
 * @param {String} [options.title = "Exporter"] - button name
 * @param {Boolean} [options.menu = false] - displays the format choice menu
 * @param {Function} [options.onExport] - callback
 * @param {DOMElement} [options.target] - target
 * @param {Object} options.control - instance of control
 * @fires export:compute
 * @example
 * // pluggued widget Export into control Isocurve
 * var iso = new ol.control.Isocurve();
 * map.addControl(iso);
 *
 * // method : call render()
 * var export = new ButtonExport();
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setTitle("Exporter");
 * export.setMenu(false);
 * export.render(); // <-- direct call to render function !
 * export.on("export:compute", (data) => { console.log(data); });
 *
 * // method : call map.addControl()
 * var export = new ButtonExport();
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setTitle("Exporter");
 * export.setMenu(false);
 * export.on("export:compute", (data) => { console.log(data); });
 * map.addControl(export); // <-- using the OpenLayers mechanism, don't call to render function !
 *
 * // use control options instead of setters
 * var export = new ButtonExport({
 *   control : iso,
 *   target : <!-- DOMElement -->,
 *   name : "export",
 *   format : "geojson",
 *   title : "Exporter",
 *   menu : false
 * });
 * map.addControl(export);
 *
 * // method with passing option into the control Isocurve
 * var iso = new ol.control.Isocurve({ export : true });
 * // with control options :
 * var iso = new ol.control.Isocurve({ export : {
 *   name : "export",
 *   format : "geojson",
 *   title : "Exporter",
 *   menu : false
 * }});
 */
declare class ButtonExport {
    /**
     * See {@link ol.control.Export}
     * @module ButtonExport
     * @alias module:~Controls/ButtonExport
     * @param {Object} [options] - options
     * @example
     * import ButtonExport from "src/OpenLayers/Controls/Export"
     */
    constructor(options?: Object | undefined);
    /**
     * Response to the export of the route calculation
     * (only for jsdoc)
     *
     * @example
     * // GeoJSON format
     * {
     *   "type":"FeatureCollection",
     *   "features":[...],
     *   "geoportail:compute":{
     *     "points":[ [2.588024210134887, 48.84192678293002 ] ],
     *     "transport":"Voiture",
     *     "exclusions":[...],
     *     "computation":"fastest",
     *     "results":{ <!-- Service --> }
     * }
     *
     * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.RouteResponse.html|Service}
     */
    EXPORT_ROUTE: {};
    /**
     * Response to the export of the isochron calculation
     * (only for jsdoc)
     *
     * @example
     * // GeoJSON format
     * {
     *    "type":"FeatureCollection",
     *    "features":[...],
     *    "geoportail:compute":{
     *       "transport":"Pieton",
     *       "computation":"time",
     *       "exclusions":[
     *
     *       ],
     *       "direction":"departure",
     *       "point":[ 2.587835382718464, 48.84192678293002 ],
     *       "results":{
     *          "message":"",
     *          "id":"",
     *          "location":{
     *             "x":"2.587835382718464",
     *             "y":"48.84192678293002"
     *          },
     *          "srs":"EPSG:4326",
     *          "geometry":{
     *             "type":"Polygon",
     *             "coordinates":[[...]]
     *          },
     *         "time":180,
     *         "distance":""
     *      }
     *    }
     * }
     *
     * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.IsoCurveResponse.html|Service}
     */
    EXPORT_ISOCHRON: {};
    /**
     * Response to the export of the profile calculation
     * (only for jsdoc)
     *
     * @example
     * // GeoJSON format
     * {
     *  "type":"FeatureCollection",
     *   "features":[...],
     *   "geoportail:compute":{
     *      "greaterSlope":76,
     *      "meanSlope":7,
     *      "distancePlus":84,
     *      "distanceMinus":48,
     *      "ascendingElevation":5,
     *      "descendingElevation":-4,
     *      "altMin":"92,04",
     *      "altMax":"96,71",
     *      "distance":163,
     *      "unit":"m",
     *      "points":[
     *        {
     *            "z":95.68,
     *            "lon":2.5874,
     *            "lat":48.8419,
     *            "acc":2.5,
     *            "dist":0,
     *            "slope":0
     *         }
     *      ]
     *   }
     * }
     *
     * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AltiResponse.html|Service}
     */
    EXPORT_PROFILE: {};
    uid: any;
    extension: string | null;
    mimeType: string | null;
    container: HTMLDivElement | null;
    button: any;
    menu: any;
    icon: string;
    menuClassHidden: string;
    /**
     * Render DOM
     *
     * @public
     */
    public render(): void;
    /**
     * Initialize options
     * (called by constructor)
     *
     * @param {Object} options - options
     * @private
     */
    private initOptions;
    options: Object | undefined;
    /**
     * Initialize container
     * (called by constructor)
     *
     * @private
     * @todo menu des options
     */
    private initContainer;
    /**
     * ...
     *
     * @param {String} str - ...
     * @returns {DOMElement} - ...
     * @private
     */
    private stringToHTML;
    /**
     * ...
     * @returns {Boolean} - ...
     * @private
     */
    private isPluggableControl;
    /**
     * ...
     * @param {Object} layer - ...
     * @param {Object} [data] - ...
     * @param {Object} [style] - ...
     * @returns {String} - ...
     * @private
     */
    private exportFeatures;
    /**
     * ...
     * @param {*} e - Click
     */
    onClickButtonExport(e: any): void;
    /**
     * ...
     * @param {Object} control - ...
     * @public
     */
    public setControl(control: Object): void;
    /**
     * ...
     * @param {DOMElement} target - ...
     * @public
     */
    public setTarget(target: DOMElement): void;
    /**
     * ...
     * @param {String} format - ...
     * @public
     */
    public setFormat(format: string): void;
    /**
     * ...
     * @param {String} name - ...
     * @public
     */
    public setName(name: string): void;
    /**
     * ...
     * @param {String} title - ...
     * @public
     */
    public setTitle(title: string): void;
    /**
     * ...
     * @param {Boolean} active - ...
     * @public
     */
    public setMenu(active: boolean): void;
}
//# sourceMappingURL=Export.d.ts.map