export default Isocurve;
/**
 * @classdesc
 *
 * Isocurve Control.
 *
 * @constructor
 * @alias ol.control.Isocurve
 * @type {ol.control.Isocurve}
 * @extends {ol.control.Control}
 * @param {Object} options - Isocurve control options
 * @param {String}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object}  [options.exclusions = {"toll" : false, "tunnel" : false, "bridge" : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
 * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of graph resources to be used for isocurve calculation, by default : ["Voiture", "Pieton"]. Possible values are "Voiture" and "Pieton". The first element is selected.
 * @param {Array}   [options.methods = ["time", "distance"]] - list of methods, by default : ["time", "distance"]. Possible values are "time" and "distance". The first element is selected by default.
 * @param {Array}   [options.directions = ["departure", "arrival"]] - list of directions to be displayed, by default : ["departure", "arrival"]. The first element is selected by default. Possible values are "departure" and "arrival".
 *      Directions enable to specify if input location point will be used as a departure point ("departure") or as an arrival point ("arrival")
 * @param {Object} [options.isocurveOptions = {}] - isocurve service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~isoCurve Gp.Services.isoCurve()} to know all isocurve options.
 * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
 * @param {Object} [options.markerOpts] - options to use your own marker. Default is a lightOrange marker.
 * @param {String} [options.markerOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.markerOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Isochrone/Isodistance"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "isochrones/isodistance basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
 * @fires isocurve:drawstart
 * @fires isocurve:drawend
 * @fires isocurve:compute
 * @example
 *  var iso = ol.control.Isocurve({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "methods" : ["time", "distance"],
 *      "exclusions" : {
 *         "toll" : true,
 *         "bridge" : false,
 *         "tunnel" : true
 *      },
 *      "graphs" : ["Pieton", "Voiture"],
 *      "markerOpts" : {
 *          "url" : "...",
 *          "offset" : [0,0]
 *      }
 *      "isocurveOptions" : {},
 *      "autocompleteOptions" : {}
 *  });
 */
declare var Isocurve: ol.control.Isocurve;
//# sourceMappingURL=Isocurve.d.ts.map