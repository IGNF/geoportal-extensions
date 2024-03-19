export default LayerSwitcher;
/**
 * @classdesc
 * Control to manage globe layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.LayerSwitcher
 * @param {Object} lsOptions - control options
 * @param {Array} [lsOptions.layers] - list of layers to be configured. Each array element is an object, with following properties :
 * @param {String} [lsOptions.layers.id] - ol.layer.Layer layer to be configured (that has been added to globe)
 * @param {Object} [lsOptions.layers.config] - custom configuration object for layer information (title, description, legends, metadata, quicklook url), with following properties :
 * @param {String} [lsOptions.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
 * @param {String} [lsOptions.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
 * @param {String} [lsOptions.layers.config.quicklookUrl] - link to a quick look image for this layer.
 * @param {Array} [lsOptions.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
 *      - url (String, mandatory) : link to a legend
 *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
 * @param {Array} [lsOptions.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
 * @param {Object} [lsOptions.options] - Itowns.control.Control options
 * @param {Boolean} [lsOptions.options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on globe loading.
 * @example
 * var layerSwitcher = new itowns.control.LayerSwitcher({
 *  layers : [
 *      {
 *          id : "myLayer",
 *          config : {
 *              title : "test layer name 1",
 *              description : "test layer desc 1",
 *          }
 *      }
 *  ],
 *  options : {
 *      collapsed : false
 *  }
 * ));
 */
declare function LayerSwitcher(lsOptions: {
    layers?: any[] | undefined;
}): void;
declare class LayerSwitcher {
    /**
     * @classdesc
     * Control to manage globe layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
     *
     * @constructor
     * @extends {itowns.control.Widget}
     * @alias itowns.control.LayerSwitcher
     * @param {Object} lsOptions - control options
     * @param {Array} [lsOptions.layers] - list of layers to be configured. Each array element is an object, with following properties :
     * @param {String} [lsOptions.layers.id] - ol.layer.Layer layer to be configured (that has been added to globe)
     * @param {Object} [lsOptions.layers.config] - custom configuration object for layer information (title, description, legends, metadata, quicklook url), with following properties :
     * @param {String} [lsOptions.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
     * @param {String} [lsOptions.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
     * @param {String} [lsOptions.layers.config.quicklookUrl] - link to a quick look image for this layer.
     * @param {Array} [lsOptions.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
     *      - url (String, mandatory) : link to a legend
     *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
     * @param {Array} [lsOptions.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
     * @param {Object} [lsOptions.options] - Itowns.control.Control options
     * @param {Boolean} [lsOptions.options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on globe loading.
     * @example
     * var layerSwitcher = new itowns.control.LayerSwitcher({
     *  layers : [
     *      {
     *          id : "myLayer",
     *          config : {
     *              title : "test layer name 1",
     *              description : "test layer desc 1",
     *          }
     *      }
     *  ],
     *  options : {
     *      collapsed : false
     *  }
     * ));
     */
    constructor(lsOptions: {
        layers?: any[] | undefined;
    });
    _addedLayerConf: {};
    /**
     * Constructor (alias)
     *
     * @private
     */
    private constructor;
    /**
     * Bind globe to control
     *
     * @param {GlobeViewExtended} globe - the globe
     */
    setGlobe(globe: GlobeViewExtended): void;
    /**
     * Adds a new layer to control (when added to globe) or add new layer configuration
     *
     * @param {Object} layer - layer to add to layer switcher
     * @param {Object} [config] - additional options for layer configuration
     * @param {Object} [config.title] - layer title (default is layer identifier)
     * @param {Object} [config.description] - layer description (default is null)
     * @param {Object} [config.legends] - layer legends (default is an empty array)
     * @param {Object} [config.metadata] - layer metadata (default is an empty array)
     * @param {Object} [config.quicklookUrl] - layer quicklookUrl (default is null)
     * @example
     *   layerSwitcher.addLayer({
     *       layer : gpParcels,
     *       config : {
     *           title : "Parcelles cadastrales",
     *           description : "description de la couche",
     *           quicklookUrl : "http://quicklookUrl.fr"
     *       }
     *   })
     */
    addLayer(layer: Object, config?: {
        title?: Object | undefined;
        description?: Object | undefined;
        legends?: Object | undefined;
        metadata?: Object | undefined;
        quicklookUrl?: Object | undefined;
    } | undefined): void;
    /**
     * Removes a layer from control
     *
     * @param {Object} layerId - layer to remove to layer switcher
     */
    removeLayer(layerId: Object): void;
    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Returns true if widget is collapsed (minimize), false otherwise
     * @return {Boolean} is collapsed
     */
    getCollapsed(): boolean;
    private _initialize;
    _uid: number | undefined;
    _layers: {} | undefined;
    _layerListContainer: any;
    _callbacks: {} | undefined;
    _options: Object | undefined;
    _initLayers: any[] | undefined;
    private _getLayerConf;
    private _layerDisplayedInLayerSwitcher;
    private _initContainer;
    private _addGlobeLayers;
    private _createLayerDiv;
    private _onChangeLayerOpacity;
    private _updateLayerOpacity;
    private _onVisibilityLayerClick;
    private _updateLayerVisibility;
    private _onOpenLayerInfoClick;
    private _onDropLayerClick;
    private _onDragAndDropLayerClick;
    private _inRangeUpdate;
    private _updateLayerListContainer;
    private _getLayerInfo;
    private _resolveLayerId;
}
import GlobeViewExtended from "../GlobeViewExtended";
//# sourceMappingURL=LayerSwitcher.d.ts.map