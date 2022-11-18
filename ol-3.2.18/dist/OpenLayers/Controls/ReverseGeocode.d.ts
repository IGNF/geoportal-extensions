export default ReverseGeocode;
/**
 * @classdesc
 *
 * ReverseGeocode Control.
 *
 * @constructor
 * @alias ol.control.ReverseGeocode
 * @type {ol.control.ReverseGeocode}
 * @extends {ol.control.Control}
 * @param {Object} options - ReverseGeocode control options
 * @param {String}   [options.apiKey] - API key for services call (reverse geocode service), mandatory if autoconf service has not been charged in advance
 * @param {String}   [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object}   [options.resources =  ["StreetAddress", "PositionOfInterest", "CadastralParcel"]] - resources for geocoding, by default : ["StreetAddress", "PositionOfInterest", "CadastralParcel"]. Possible values are : "StreetAddress", "PositionOfInterest", "CadastralParcel". Resources will be displayed in the same order in widget list.
 * @param {Object}   [options.delimitations = ["Point", "Circle", "Extent"]] - delimitations for reverse geocoding, by default : ["Point", "Circle", "Extent"]. Possible values are : "Point", "Circle", "Extent". Delimitations will be displayed in the same order in widget list.
 * @param {Object}  [options.reverseGeocodeOptions = {}] - reverse geocode service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~reverseGeocode Gp.Services.reverseGeocode()} to know all reverse geocode options.
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Saisie (recherche inverse)"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Couche de saisie d'une zone de recherche pour la recherche inverse"] - Layer description to be displayed in LayerSwitcher
 * @fires reversegeocode:compute
 * @example
 *  var iso = ol.control.ReverseGeocode({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "resources" : ["StreetAddress", "PositionOfInterest"],
 *      "delimitations" : ["Point", "Circle"],
 *      "reverseGeocodeOptions" : {}
 *  });
 */
declare var ReverseGeocode: ol.control.ReverseGeocode;
//# sourceMappingURL=ReverseGeocode.d.ts.map