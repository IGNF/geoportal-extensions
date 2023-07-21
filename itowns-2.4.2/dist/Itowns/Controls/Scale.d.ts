export default Scale;
/**
 * @classdesc
 * Control to display the scalebar with itowns
 *
 * @constructor
 * @alias itowns.control.Scale
 * @extends {itowns.control.Widget}
 * @alias itowns.control.Scale
 * @param {Object} options - widget options
 * @param {String}  options.target - HTML target element or HTML target element id
 * @param {String}  options.position - "absolute" or "relative"
 * @example
 * var scale = new itowns.control.Scale();
 *
 */
declare function Scale(options: {
    target: string;
    position: string;
}): void;
declare class Scale {
    /**
     * @classdesc
     * Control to display the scalebar with itowns
     *
     * @constructor
     * @alias itowns.control.Scale
     * @extends {itowns.control.Widget}
     * @alias itowns.control.Scale
     * @param {Object} options - widget options
     * @param {String}  options.target - HTML target element or HTML target element id
     * @param {String}  options.position - "absolute" or "relative"
     * @example
     * var scale = new itowns.control.Scale();
     *
     */
    constructor(options: {
        target: string;
        position: string;
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
    private _initialize;
    _uid: number | undefined;
    _ScaleContainer: any;
    _callbacks: {} | undefined;
    private _initContainer;
}
import GlobeViewExtended from "../GlobeViewExtended";
//# sourceMappingURL=Scale.d.ts.map