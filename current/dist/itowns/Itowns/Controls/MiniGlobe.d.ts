export default MiniGlobe;
/**
 * @classdesc
 * Control to display the MiniGlobe with itowns
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.MiniGlobe
 * @param {Object} [options] - control options
 * @param {Object} [options.layer] - custom itowns layer to display on the mini globe
 * @example
 * var miniglobe = new itowns.control.MiniGlobe();
 *
 */
declare function MiniGlobe(options?: {
    layer?: Object | undefined;
} | undefined): void;
declare class MiniGlobe {
    /**
     * @classdesc
     * Control to display the MiniGlobe with itowns
     *
     * @constructor
     * @extends {itowns.control.Widget}
     * @alias itowns.control.MiniGlobe
     * @param {Object} [options] - control options
     * @param {Object} [options.layer] - custom itowns layer to display on the mini globe
     * @example
     * var miniglobe = new itowns.control.MiniGlobe();
     *
     */
    constructor(options?: {
        layer?: Object | undefined;
    } | undefined);
    _options: {
        layer?: Object | undefined;
    };
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
    _globeObj: GlobeViewExtended | undefined;
    private _initialize;
    _uid: number | undefined;
    _MiniGlobeContainer: any;
    _callbacks: {} | undefined;
    private _initContainer;
}
import GlobeViewExtended from "../GlobeViewExtended";
//# sourceMappingURL=MiniGlobe.d.ts.map