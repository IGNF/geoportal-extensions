export default LocationSelector;
/**
* @classdesc
*
* LocationSelector Control.
*
* @private
* @constructor LocationSelector
* @alias LocationSelector
* @extends {L.Control}
* LocationSelector component. Enables to select a location, using autocompletion or picking location on the map
* @param {Object} [options] - component options
* @param {Boolean} [options.displayInfo = true] - whether to display info in a popup or not (not implemented yet) Default is true
* @param {Boolean} [options.disableReverse = false] - whether to enable/disable the reverse geocoding.
* @param {Object} [options.tag] - tag options
* @param {Number} [options.tag.id = 0] - order id number in a locations group, in case several LocationSelector are used. For instance in route case : departure tag id should be 0, arrival tag id should be 1, and other ones : 2, 3, ...
* @param {Number} [options.tag.unique = null] - locationSelector global component id (in case locationSelector is called by another graphic component, e.g. route control)
* @param {String} [options.tag.label = ">"] - text to display in component (e.g. "Departure"). Default is ">"
* @param {String} [options.tag.color = blue] - color of marker (blue, green, orange and red)
* @param {Boolean} [options.tag.display = true] - whether to display or hide component. Default is true
* @param {Boolean} [options.tag.addOption = false] - whether to display picto to add another LocationSelector (in case of route control)
* @param {Boolean} [options.tag.removeOption = false] - whether to display picto to remove a LocationSelector (in case of route control)
* @param {Object} [options.autocompleteOptions] - autocomplete service options
* @param {Object} [options.reverseGeocodeOptions] - reverse geocoding service options

* @example
*  var point = L.geoportalControl.LocationSelector({
*  });
*/
declare var LocationSelector: any;
//# sourceMappingURL=LocationSelector.d.ts.map