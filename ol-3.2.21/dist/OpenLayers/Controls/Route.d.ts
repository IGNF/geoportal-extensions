export default Route;
/**
 * @classdesc
 *
 * Route Control.
 *
 * @constructor
 * @alias ol.control.Route
 * @type {ol.control.Route}
 * @extends {ol.control.Control}
 * @param {Object} options - route control options
 * @param {String}   [options.apiKey] - API key for services call (route and autocomplete services), mandatory if autoconf service has not been charged in advance
 * @param {Boolean}   [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Boolean} [options.export = false] - Specify if button "Export" is displayed
 * @param {Object}  [options.exclusions = {"toll" : false, "tunnel" : false, "bridge" : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
 * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of resources, by default : ["Voiture", "Pieton"]. The first element is selected.
 * @param {Object} [options.routeOptions = {}] - route service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~route Gp.Services.route()} to know all route options.
 * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
 * @param {Object} [options.markersOpts] - options to use your own markers. Object properties can be "departure", "stages" or "arrival". Corresponding value is an object with following properties :
 * @param {String} [options.markersOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.markersOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Itinéraire"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Itinéraire basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
 * @fires route:drawstart
 * @fires route:drawend
 * @fires route:compute
 * @fires export:compute
 * @example
 *  var route = ol.control.Route({
 *      "collapsed" : true
 *      "draggable" : true,
 *      "export"    : false,
 *      "exclusions" : {
 *         "toll" : true,
 *         "bridge" : false,
 *         "tunnel" : true
 *      },
 *      "graphs" : ['Pieton', 'Voiture'],
 *      "markersOpts" : {
 *          "departure" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          },
 *          "stages" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          },
 *          "arrival" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          }
 *      }
 *      "autocompleteOptions" : {},
 *      "routeOptions" : {}
 *  });
 */
declare var Route: ol.control.Route;
//# sourceMappingURL=Route.d.ts.map