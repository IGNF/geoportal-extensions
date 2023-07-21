export default Buildings;
/**
 * @classdesc
 * Control to display buildings on the map
 *
 * @constructor
 * @extends {itowns.control.Widget}
 * @alias itowns.control.Buildings
 * @param {Object} buildingsOptions - control options
 * @param {String} [buildingsOptions.key = "essentiels"] - key to use to adds the buildings layer – “essentiels” by default
 * @param {Boolean} [buildingsOptions.MNT = true] - Adds and displays the MNT
 * @param {Boolean} [buildingsOptions.buildingsOnGround = false] - Display the buildings at their elevation or on the ground
 * @param {Boolean} [buildingsOptions.defaultVisibility = true] - Visibility of the Buildings Layer at the initialisation
 * @param {Integer} [buildingsOptions.minZoom = 15] - minimum level of zoom the buildings are displayed. 15 by default. Lower is the value, lower are the performances.
 * @example
 * var buildings = new itowns.control.Buildings ({
 *      MNT : false,
 *      buildingsOnGround : false,
 *      target : “controlDiv”
 * })
 */
declare function Buildings(buildingsOptions: {
    key?: string | undefined;
    MNT?: boolean | undefined;
    buildingsOnGround?: boolean | undefined;
    defaultVisibility?: boolean | undefined;
    minZoom?: any;
}): void;
declare class Buildings {
    /**
     * @classdesc
     * Control to display buildings on the map
     *
     * @constructor
     * @extends {itowns.control.Widget}
     * @alias itowns.control.Buildings
     * @param {Object} buildingsOptions - control options
     * @param {String} [buildingsOptions.key = "essentiels"] - key to use to adds the buildings layer – “essentiels” by default
     * @param {Boolean} [buildingsOptions.MNT = true] - Adds and displays the MNT
     * @param {Boolean} [buildingsOptions.buildingsOnGround = false] - Display the buildings at their elevation or on the ground
     * @param {Boolean} [buildingsOptions.defaultVisibility = true] - Visibility of the Buildings Layer at the initialisation
     * @param {Integer} [buildingsOptions.minZoom = 15] - minimum level of zoom the buildings are displayed. 15 by default. Lower is the value, lower are the performances.
     * @example
     * var buildings = new itowns.control.Buildings ({
     *      MNT : false,
     *      buildingsOnGround : false,
     *      target : “controlDiv”
     * })
     */
    constructor(buildingsOptions: {
        key?: string | undefined;
        MNT?: boolean | undefined;
        buildingsOnGround?: boolean | undefined;
        defaultVisibility?: boolean | undefined;
        minZoom?: any;
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
    _options: Object | undefined;
    _callbacks: {} | undefined;
    private _initContainer;
    private addMNT;
    /**
     * Adds or removes the buildings layer on click
     *
     * @method addBuildings
     * @param {options} options for the buildings control
     */
    addBuildings(options: {
        key?: string | undefined;
        MNT?: boolean | undefined;
        buildingsOnGround?: boolean | undefined;
        defaultVisibility?: boolean | undefined;
        minZoom?: any;
    }): void;
    /**
     * Set the buildings visibility on click
     *
     * @method setBuildingsVisibility
     * @param {Tring} layerId - layer id for the building layer
     */
    setBuildingsVisibility(layerId: Tring): void;
    private _toggleBuildingsButton;
    private onWidgetAdded;
    private addListener;
    private setOptions;
}
//# sourceMappingURL=Buildings.d.ts.map