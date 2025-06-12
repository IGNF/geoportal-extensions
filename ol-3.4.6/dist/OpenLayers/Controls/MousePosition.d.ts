export default MousePosition;
/**
 * @classdesc
 * MousePosition Control.
 *
 * @constructor
 * @alias ol.control.GeoportalMousePosition
 * @type {ol.control.GeoportalMousePosition}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {String}   [options.apiKey] - API key. The key "calcul" is used by default.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Boolean} [options.collapsed = true] - Specify if MousePosition control should be collapsed at startup. Default is true.
 * @param {Array}   [options.units] - list of coordinates units, to be displayed in control units list.
 *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
 *      and "M" or "KM" for metric coordinates
 * @param {Boolean}   [options.displayAltitude = true] - activate (true) or deactivate (false) the altitude panel. True by default
 * @param {Boolean}   [options.displayCoordinates = true] - activate (true) or deactivate (false) the coordinates panel. True by default
 * @param {Boolean} [options.editCoordinates = false] - If true, coordinates from the MousePosition control can be edited by users to re-center the view. False by default.
 * @param {Function} [options.mapCenterCallback] - callback...
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
 * @param {Object} [options.positionMarker] - options for position marker
 * @param {String} options.positionMarker.url - Marker url (define in src/Openlayers/Controls/Utils/Markers.js)
 * @param {Array} options.positionMarker.offset - Offsets in pixels used when positioning the marker towards targeted point.
 *      The first element in the array is the horizontal offset. A positive value shifts the marker right.
 *      The second element in the array is the vertical offset. A positive value shifts the marker down. [0,0] value positions the top-left corner of the marker image to the targeted point.
 *      Default is offset associated to default marker image.
 * @param {Boolean} options.positionMarker.hide - if true, marker is not displayed, otherwise displayed (False by default.)
 * @param {Object}  [options.altitude] - elevation configuration
 * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
 * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
 * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
 * @param {Number}  [options.altitude.noDataValue] - value used for altitude service no data (default is -99999). In this case, "---m" will be displayed instead of "-99999m"
 * @param {Number}  [options.altitude.noDataValueTolerance] - tolerance for no data value :
 *                  values in [noDataValue + noDataValueTolerance ; noDataValue - noDataValueTolerance] interval will not be displayed, but "---m" will be displayed instead.
 *                  Default is 90000 (no data values = [-9999 ; -189999])
 *  @example
 *  var MousePosition = new ol.control.GeoportalMousePosition({
 *      "collapsed" : false,
 *      "graggable" : true,
 *      "displayCoordinates" : true,
 *      "displayAltitude" : true,
 *      "altitude" : {
 *           "triggerDelay" : 100,
 *           "responseDelay" : 500,
 *           "noDataValue" : -99999,
 *           "noDataValueTolerance" : 99000,
 *           "serviceOptions" : {}
 *      },
 *      "systems" : [
 *       {
 *          "crs" : "EPSG:3857",
 *          "label" : "Web Mercator",
 *          "type" : "Metric"
 *       },
 *       {
 *          "crs" : "EPSG:4326",
 *          "label" : "Géographiques",
 *          "type" : "Geographical"
 *       },
 *       {
 *           "label" : "Lambert 93",
 *           "crs" : "EPSG:2154",
 *           "type" : "Metric",
 *           "geoBBox" : {
 *               "left" : -9.86,
 *               "bottom" : 41.15,
 *               "right" : 10.38,
 *               "top" : 51.56
 *           }
 *        }
 *      ],
 *      "units" : ["DEC", "DMS"]
 * });
 */
declare var MousePosition: ol.control.GeoportalMousePosition;
//# sourceMappingURL=MousePosition.d.ts.map