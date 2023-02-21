export default LocationSelector;
/**
 * @classdesc
 *
 * LocationSelector component. Enables to select a location, using autocompletion or picking location on the map
 * @type {ol.control.LocationSelector}
 * @param {Object} [options] - component options
 * @param {String} [options.apiKey] - API key for autocomplete service call, mandatory if autoconf service has not been charged in advance
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.displayInfo = true] - whether to display info in a popup or not (not implemented yet) Default is true
 * @param {Object} [options.tag] - tag options
 * @param {Number} [options.tag.id = 1] - order id number in a locations group, in case several LocationSelector are used. For instance in route case : departure tag id should be 0, arrival tag id should be 1, and other ones : 2, 3, ...
 * @param {Number} [options.tag.groupId = null] - locationSelector global component id (in case locationSelector is called by another graphic component, e.g. route control)
 * @param {String} [options.tag.label] - text to display in component (e.g. "Departure"). Default is ">"
 * @param {Object} [options.tag.markerOpts] - options to use your own marker. Default is a lightOrange marker.
 * @param {String} [options.tag.markerOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.tag.markerOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see {@link http://openlayers.org/en/latest/apidoc/ol.Overlay.html ol.Overlay})
 * @param {Boolean} [options.tag.display = true] - whether to display or hide component. Default is true
 * @param {Boolean} [options.tag.addOption = false] - whether to display picto to add another LocationSelector (in case of route control)
 * @param {Boolean} [options.tag.removeOption = false] - whether to display picto to remove a LocationSelector (in case of route control)
 * @param {Object} [options.autocompleteOptions] - autocomplete service options (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options)
 * @example
 *  var locationselector = new LocationSelector({
 *      apiKey : "",
 *      tag : {
 *         id : 1,
 *         groupId : null,
 *         label : "Départ",
 *         markerOpts : {
 *              url : "...",
 *              offset : [0,0]
 *         },
 *         display : true
 *      },
 *      autocompleteOptions : {}
 *  });
 */
declare var LocationSelector: ol.control.LocationSelector;
//# sourceMappingURL=LocationSelector.d.ts.map