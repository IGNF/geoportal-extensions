export default Attributions;
/**
 * @classdesc
 * Control to manage layers attributions
 *
 * @constructor
 * @alias itowns.control.Attributions
 * @extends {itowns.control.Widget}
 * @param {Object} aOptions - control options
 * @param {Object} [aOptions.options] - Itowns.control.Control options
 * @param {Boolean} [aOptions.options.collapsed = false] - Specify if the control has to be opened or not.
 * @fires attributions:update
 * @example
 * var attribution = new itowns.control.Attritbution({
 *  options : {
 *      collapsed: true
 *  }
 * });
 * // listeners for attributions update :
 * attribution.addEventListener("attributions:update", function (e) {...});
 */
declare function Attributions(aOptions: {
    options?: {
        collapsed?: boolean | undefined;
    } | undefined;
}): void;
declare class Attributions {
    /**
     * @classdesc
     * Control to manage layers attributions
     *
     * @constructor
     * @alias itowns.control.Attributions
     * @extends {itowns.control.Widget}
     * @param {Object} aOptions - control options
     * @param {Object} [aOptions.options] - Itowns.control.Control options
     * @param {Boolean} [aOptions.options.collapsed = false] - Specify if the control has to be opened or not.
     * @fires attributions:update
     * @example
     * var attribution = new itowns.control.Attritbution({
     *  options : {
     *      collapsed: true
     *  }
     * });
     * // listeners for attributions update :
     * attribution.addEventListener("attributions:update", function (e) {...});
     */
    constructor(aOptions: {
        options?: {
            collapsed?: boolean | undefined;
        } | undefined;
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
     *
     * @return {Boolean} collapsed
     */
    getCollapsed(): boolean;
    private _initialize;
    _uid: number | undefined;
    _AttributionContainer: any;
    _callbacks: {} | undefined;
    _options: Object | undefined;
    private _initContainer;
    _attributionListContainer: any;
    private _inRangeUpdate;
    private _updateAttributionListContainer;
    _resolutionsWGS84: {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9: number;
        10: number;
        11: number;
        12: number;
        13: number;
        14: number;
        15: number;
        16: number;
        17: number;
        18: number;
        19: number;
        20: number;
        21: number;
    };
}
import GlobeViewExtended from "../GlobeViewExtended";
//# sourceMappingURL=Attributions.d.ts.map