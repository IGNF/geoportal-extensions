export default BoostRelief;
/**
 * @classdesc
 * Control to exagerate the elevation
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.BoostRelief
 * @param {Object} brOptions - control options
 * @param {Object} [brOptions.scale] - Defines the scale used to boost the relief
 * @param {Number} [brOptions.scale.min] - Minimum of the scale - 1 by default
 * @param {Number} [brOptions.scale.max] - Maximum of the scale - 50 by default
 * @param {Number} [brOptions.scale.step] - Step of the scale - 1 by default
 * @param {Boolean} [brOptions.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on globe loading.
 * @param {Boolean} [brOptions.defaultBoost = 1] - Default boost value applied to the widget and the elevation layers when loaded
 * @example
 * var boostRelief = new itowns.control.BoostRelief({
 *      scale : {
 *          max : 30,
 *          step : 2
 *      },
 *      defaultBoost : 6
 * })
 */
declare function BoostRelief(brOptions: {
    scale?: {
        min?: number | undefined;
        max?: number | undefined;
        step?: number | undefined;
    } | undefined;
    collapsed?: boolean | undefined;
    defaultBoost?: boolean | undefined;
}): void;
declare class BoostRelief {
    /**
     * @classdesc
     * Control to exagerate the elevation
     *
     * @constructor
     * @extends {itowns.control.Widget}
     * @alias itowns.control.BoostRelief
     * @param {Object} brOptions - control options
     * @param {Object} [brOptions.scale] - Defines the scale used to boost the relief
     * @param {Number} [brOptions.scale.min] - Minimum of the scale - 1 by default
     * @param {Number} [brOptions.scale.max] - Maximum of the scale - 50 by default
     * @param {Number} [brOptions.scale.step] - Step of the scale - 1 by default
     * @param {Boolean} [brOptions.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on globe loading.
     * @param {Boolean} [brOptions.defaultBoost = 1] - Default boost value applied to the widget and the elevation layers when loaded
     * @example
     * var boostRelief = new itowns.control.BoostRelief({
     *      scale : {
     *          max : 30,
     *          step : 2
     *      },
     *      defaultBoost : 6
     * })
     */
    constructor(brOptions: {
        scale?: {
            min?: number | undefined;
            max?: number | undefined;
            step?: number | undefined;
        } | undefined;
        collapsed?: boolean | undefined;
        defaultBoost?: boolean | undefined;
    });
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
    _callbacks: {} | undefined;
    private _initContainer;
    _boostReliefListContainer: any;
    private _onChangeLayerRelief;
    private _updateLayersRelief;
    /**
     * Updates relief slider and all elevation layers with the given boost value
     *
     * @method changeBoost
     * @param {Number} reliefValue - relief value
     */
    changeBoost(reliefValue: number): void;
    private _resolveLayerId;
}
//# sourceMappingURL=BoostRelief.d.ts.map