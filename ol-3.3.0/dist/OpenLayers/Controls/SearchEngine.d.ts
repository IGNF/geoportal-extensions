export default SearchEngine;
/**
 * @classdesc
 * SearchEngine control
 *
 * @constructor
 * @extends {ol.control.Control}
 * @type {ol.control.SearchEngine}
 * @alias ol.control.SearchEngine
 * @param {Object}  options - control options
 * @param {String}   [options.apiKey] - API key. The key "calcul" is used by default.
 * @param {Boolean}   [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - collapse mode, true by default
 *       Value possible : auto or zoom level.
 *       Possible to overload it with a function :
 *       zoomTo : function (info) {
 *           // do some stuff...
 *           return zoom;
 *       }
 * @param {String}  [options.placeholder] - Placeholder in search bar. Default is "Rechercher un lieu, une adresse".
 * @param {Boolean} [options.displayMarker = true] - set a marker on search result, defaults to true.
 * @param {String}  [options.markerStyle = "lightOrange"] - Marker style. Currently possible values are "lightOrange" (default value), "darkOrange", "red" and "turquoiseBlue".
 * @param {Boolean} [options.displayAdvancedSearch = true] - False to disable advanced search tools (it will not be displayed). Default is true (displayed)
 * @param {Object}  [options.advancedSearch] - advanced search options for geocoding (filters). Properties can be found among geocode options.filterOptions (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode})
 * @param {Object}   [options.resources] - resources to be used by geocode and autocompletion services :
 * @param {String}   [options.resources.geocode] - resources geocoding, by default : "location"
 * @param {Array}   [options.resources.autocomplete] - resources autocompletion, by default : ["PositionOfInterest", "StreetAddress"]
 * @param {Boolean}  [options.displayAdvancedSearch = true] - False to disable advanced search tools (it will not be displayed). Default is true (displayed)
 * @param {Object}  [options.advancedSearch] - advanced search options for geocoding (filters). Properties can be found among geocode options.filterOptions (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode})
 * @param {Object}  [options.geocodeOptions = {}] - options of geocode service (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode})
 * @param {Object}  [options.autocompleteOptions = {}] - options of autocomplete service (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete}
 * @param {Object}  [options.autocompleteOptions.serviceOptions] - options of autocomplete service
 * @param {Boolean} [options.autocompleteOptions.triggerGeocode = false] - trigger a geocoding request if the autocompletion does not return any suggestions, false by default
 * @param {Number}  [options.autocompleteOptions.triggerDelay = 1000] - waiting time before sending the geocoding request, 1000ms by default
 * @param {Sting|Numeric|Function} [options.zoomTo] - zoom to results, by default, current zoom.
 * @fires searchengine:autocomplete:click
 * @fires searchengine:geocode:click
 * @example
 *  var SearchEngine = ol.control.SearchEngine({
 *      apiKey : "CLEAPI",
 *      collapsed : true,
 *      resources : {
 *          geocode : ["StreetAddress", "PositionOfInterest"],
 *          autocomplete : ["StreetAddress"]
 *      },
 *      advancedSearch : {
 *          PositionOfInterest : [{name : "municipality", title : "Ville"}],
 *          StreetAddress : [{...}]
 *      },
 *      geocodeOptions : {},
 *      autocompleteOptions : {}
 *  });
 *
 *  SearchEngine.on("searchengine:autocomplete:click", function (e) {
 *    console.warn("autocomplete", e.location);
 *  });
 *  SearchEngine.on("searchengine:geocode:click", function (e) {
 *    console.warn("geocode", e.location);
 *  });
 */
declare var SearchEngine: ol.control.SearchEngine;
//# sourceMappingURL=SearchEngine.d.ts.map