export default MousePosition;
/**
 * @classdesc
 *
 * MousePosition Control.
 *
 * @constructor
 * @alias itowns.control.MousePosition
 * @extends {itowns.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if MousePosition control should be collapsed at startup. Default is true.
 * @param {Array}   [options.systems] - list of projection systems, default are Geographical ("EPSG:4326"), Web Mercator ("EPSG:3857"), Lambert 93 ("EPSG:2154") and extended Lambert 2 ("EPSG:27572").
 *      Each array element (=system) is an object with following properties :
 * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
 * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
 * @param {String}  options.systems.type - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
 * @param {Object}  [options.systems.geoBBox] - Aera covered by the system (WGS84 coordinates).
 * @param {Number}  options.systems.geoBBox.right - Right bound.
 * @param {Number}  options.systems.geoBBox.left - Left bound.
 * @param {Number}  options.systems.geoBBox.top - Top bound.
 * @param {Number}  options.systems.geoBBox.bottom - Bottom bound.
 * @param {Array}   [options.units] - list of coordinates units, to be displayed in control units list.
 *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
 *      and "M" or "KM" for metric coordinates
 * @param {Array}   [options.displayAltitude = true] - activate (true) or deactivate (false) the altitude panel. True by default
 * @param {Array}   [options.displayCoordinates = true] - activate (true) or deactivate (false) the coordinates panel. True by default
 * @param {Object}  [options.altitude] - elevation configuration
 * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
 * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
 * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the globe to trigger the elevation calculation, 200 ms by default
 * @example
 *  var mousePosition = new itowns.control.MousePosition({
 *      collapsed : false,
 *      displayCoordinates : true,
 *      displayAltitude : true,
 *      altitude : {
 *           triggerDelay : 100,
 *           responseDelay : 500,
 *           serviceOptions : {}
 *      },
 *      systems : [
 *       {
 *          crs : "EPSG:3857",
 *          label : "Mercator",
 *          type : "Metric"
 *        },
 *       {
 *          crs : "EPSG:32620",
 *          label : "UTM 20N (Guadeloupe, Martinique)",
 *          type : "Metric",
 *          geoBBox : {
 *              left: -66.00,
 *              bottom : 0.00,
 *              right : -60.00,
 *              top : 84.00
 *          }
 *        }
 *      ],
 *      units : ["DEC", "DMS"]
 *  });
 */
declare function MousePosition(options: {
    ssl?: boolean | undefined;
    collapsed?: boolean | undefined;
    systems?: any[] | undefined;
}): void;
declare class MousePosition {
    /**
     * @classdesc
     *
     * MousePosition Control.
     *
     * @constructor
     * @alias itowns.control.MousePosition
     * @extends {itowns.control.Control}
     * @param {Object} options - options for function call.
     * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
     * @param {Boolean} [options.collapsed = true] - Specify if MousePosition control should be collapsed at startup. Default is true.
     * @param {Array}   [options.systems] - list of projection systems, default are Geographical ("EPSG:4326"), Web Mercator ("EPSG:3857"), Lambert 93 ("EPSG:2154") and extended Lambert 2 ("EPSG:27572").
     *      Each array element (=system) is an object with following properties :
     * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
     * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
     * @param {String}  options.systems.type - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
     * @param {Object}  [options.systems.geoBBox] - Aera covered by the system (WGS84 coordinates).
     * @param {Number}  options.systems.geoBBox.right - Right bound.
     * @param {Number}  options.systems.geoBBox.left - Left bound.
     * @param {Number}  options.systems.geoBBox.top - Top bound.
     * @param {Number}  options.systems.geoBBox.bottom - Bottom bound.
     * @param {Array}   [options.units] - list of coordinates units, to be displayed in control units list.
     *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
     *      and "M" or "KM" for metric coordinates
     * @param {Array}   [options.displayAltitude = true] - activate (true) or deactivate (false) the altitude panel. True by default
     * @param {Array}   [options.displayCoordinates = true] - activate (true) or deactivate (false) the coordinates panel. True by default
     * @param {Object}  [options.altitude] - elevation configuration
     * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
     * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
     * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the globe to trigger the elevation calculation, 200 ms by default
     * @example
     *  var mousePosition = new itowns.control.MousePosition({
     *      collapsed : false,
     *      displayCoordinates : true,
     *      displayAltitude : true,
     *      altitude : {
     *           triggerDelay : 100,
     *           responseDelay : 500,
     *           serviceOptions : {}
     *      },
     *      systems : [
     *       {
     *          crs : "EPSG:3857",
     *          label : "Mercator",
     *          type : "Metric"
     *        },
     *       {
     *          crs : "EPSG:32620",
     *          label : "UTM 20N (Guadeloupe, Martinique)",
     *          type : "Metric",
     *          geoBBox : {
     *              left: -66.00,
     *              bottom : 0.00,
     *              right : -60.00,
     *              top : 84.00
     *          }
     *        }
     *      ],
     *      units : ["DEC", "DMS"]
     *  });
     */
    constructor(options: {
        ssl?: boolean | undefined;
        collapsed?: boolean | undefined;
        systems?: any[] | undefined;
    });
    _callbacks: {};
    /**
     * Constructor (alias)
     */
    constructor: typeof MousePosition;
    /**
     * Bind globe to control
     *
     * @param {GlobeViewExtended} globe - the globe
     */
    setGlobe(globe: GlobeViewExtended): void;
    _centerElement: any;
    /**
     * Sets additional projection system
     *
     * @param {Object} system - Projection system defined in the Itowns/CRS/CRS.js class
     * @param {String} system.crs - Proj4 crs alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} [system.label] - CRS label to be displayed in control. Default is system.crs alias
     * @param {String} [system.type] - CRS units type for coordinates conversion (one of control options.units). Default is "Metric"
     */
    addSystem(system: {
        crs: string;
        label?: string | undefined;
        type?: string | undefined;
    }): void;
    /**
     * Sets additional projection systems
     *
     * @param {Array} systems - Array of system object, with following properties :
     * @param {String} systems.crs - Proj4 CRS alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} systems.label - CRS label (for coordinates conversion)
     * @param {String} systems.type - CRS units type to be displayed in control (one of control options.units). Default is "Metric"
     */
    addSystems(systems: any[]): void;
    /**
     * Removes projection system (in case there are several system with same code, only the first one will be removed)
     *
     * @param {String} systemCrs - CRS alias (from proj4 defs)
     */
    removeSystem(systemCrs: string): void;
    /**
     * Sets control units (to be displayed)
     *
     * @param {Array} units - list of all coordinates units, to be displayed in control units list.
     *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
     *      and "M" or "KM" for metric coordinates
     */
    setUnits(units: any[]): void;
    _projectionUnits: {} | undefined;
    /**
     * Sets control altitude options (useless if displayAltitude == false)
     *
     * @param {Object} options - altitude options
     * @param {Object}  [options.serviceOptions] - options of elevation service
     * @param {Number}  [options.responseDelay] - latency for elevation request, 500 ms by default
     * @param {Number}  [options.triggerDelay] - immobilisation time of movement on the globe to trigger the elevation calculation, 200 ms by default
     */
    setAltitudeOptions(options: {
        serviceOptions?: Object | undefined;
        responseDelay?: number | undefined;
        triggerDelay?: number | undefined;
    }): void;
    /**
     * Displays or hides elevation panel
     *
     * @param {Boolean} displayAltitude - true to display elevation panel, false to hide it
     */
    displayAltitude(displayAltitude: boolean): void;
    /**
     * Displays or hides coordinates panel
     *
     * @param {Boolean} displayCoordinates - true to display coordinates panel, false to hide it
     */
    displayCoordinates(displayCoordinates: boolean): void;
    /**
     * Collapses or displays control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    private _initialize;
    options: Object | undefined;
    /** {Boolean} specify if MousePosition control is collapsed (true) or not (false) */
    collapsed: any;
    _uid: number | undefined;
    _projectionSystems: any[] | undefined;
    _isDesktop: boolean | undefined;
    _timer: any;
    _currentProjectionSystems: any;
    _currentProjectionType: any;
    _currentProjectionUnits: any;
    _projectionUnitsContainer: any;
    _showMousePositionContainer: any;
    private _initProjectionSystems;
    private _initProjectionUnits;
    private _checkRightsManagement;
    _noRightManagement: boolean | undefined;
    private _initContainer;
    _projectionSystemsContainer: any;
    private _setElevationPanel;
    private _setCoordinatesPanel;
    private _setSettingsPanel;
    private _setTypeUnitsPanel;
    private _displayDEC;
    private _displayDMS;
    private _displayRAD;
    private _displayGON;
    private _displayMeter;
    private _displayKMeter;
    private _setCoordinate;
    private _setElevation;
    private onMoveStopped;
    private onMouseMove;
    private onGlobeMove;
    private onRequestAltitude;
    private onShowMousePositionClick;
    private onMousePositionProjectionSystemChange;
    private _setCurrentSystem;
    private onMousePositionProjectionSystemMouseOver;
    private onMousePositionProjectionUnitsChange;
}
import GlobeViewExtended from "../GlobeViewExtended";
//# sourceMappingURL=MousePosition.d.ts.map