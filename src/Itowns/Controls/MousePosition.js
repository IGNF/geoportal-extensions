define([
    "itowns",
    "proj4",
    "woodman",
    "gp",
    "Common/Utils/Config",
    "Common/Utils/CheckRightManagement",
    "Common/Utils/SelectorID",
    "Common/Controls/MousePositionDOM",
    "Itowns/Controls/Control"
], function (
    itowns, // FIXME Global for browser only !
    proj4,
    woodman,
    Gp,
    Config,
    RightManagement,
    SelectorID,
    MousePositionDOM,
    Control
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("MousePosition");

    /**
     * @classdesc
     *
     * MousePosition Control.
     *
     * @constructor
     * @alias VirtualGeo.GeoportalMousePosition
     * @extends {VirtualGeo.Control}
     * @param {Object} options - options for function call.
     * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
     * @param {Boolean} [options.collapsed = false] - Specify if MousePosition control should be collapsed at startup. Default is true.
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
     * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
     * @example
     *  var MousePosition = new ol.control.GeoportalMousePosition({
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
     *          crs : "EPSG:4326",
     *          label : "Géographiques",
     *          type : "Geographical"
     *        }
     *      ],
     *      units : ["DEC", "DMS"]
     *  });
     */
    function MousePosition (options) {
        Control.call(
            this,
            {
              pName : "mouseposition",
              pElement : "",
              options : options
            });
        return options;
    };

    MousePosition.prototype = new Control();

    /*
     * @lends module:GeoportalMousePosition
     */
    // MousePosition.prototype = Object.create(itowns.Widget.prototype, {});

    /**
     * Copies all source object members to MousePosition prototype
     *
     * @param {Object} source - source object whose properties will be copied.
     * @private
     */
    MousePosition.prototype.assign = function ( source ) {
        for ( var prop in source ) {
            if ( source.hasOwnProperty(prop) ) {
                this[prop] = source[prop];
            }
        }
    };

    MousePosition.prototype.assign(MousePositionDOM);

    /**
     * Constructor (alias)
     */
    MousePosition.prototype.constructor = MousePosition;


    MousePosition.prototype.getcurrentCoordinates = function() {
        console.log(itowns.viewer.getCenter());
    };

    return MousePosition;
});
