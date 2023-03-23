export default ElevationPath;
/**
 * @classdesc
 *
 * Elevation Path Control. Allows users to draw a path on a Openlayers map see the elevation profile computed with geoportal elevation path web service along that path.
 *
 * @constructor
 * @alias ol.control.ElevationPath
 * @type {ol.control.ElevationPath}
 * @extends ol.control.Control
 * @param {Object} options - options for function call.
 * @param {String} [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
 * @param {Boolean} [options.active = false] - specify if control should be actived at startup. Default is false.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.export = false] - Specify if button "Export" is displayed
 * @param {Object} [options.elevationPathOptions = {}] - elevation path service options. See {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getAltitude Gp.Services.getAltitude()} for available options
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Profil altimétrique"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mon profil altimétrique"] - Layer description to be displayed in LayerSwitcher
 * @param {Object} [options.stylesOptions] - styles management
 * @param {Object} [options.stylesOptions.marker = {}] - styles management of marker displayed on map when the user follows the elevation path. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object
 * @param {Object} [options.stylesOptions.draw = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.stylesOptions.draw.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.stylesOptions.draw.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Stroke-Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.stylesOptions.draw.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Stroke-Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.displayProfileOptions = {}] - profile options.
 * @param {Boolean} [options.displayProfileOptions.totalDistance = true] - display the total distance of the path
 * @param {Boolean} [options.displayProfileOptions.greaterSlope = true] - display the greater slope into the graph
 * @param {Boolean} [options.displayProfileOptions.meanSlope = true] -  display the mean slope into the graph
 * @param {Boolean} [options.displayProfileOptions.ascendingElevation = true] -  display the ascending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.descendingElevation = true] -  display the descending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.currentSlope = true] -  display current slope value on profile mouseover
 * @param {Function} [options.displayProfileOptions.apply] - function to display profile if you want to cutomise it. By default, ([DISPLAY_PROFILE_BY_DEFAULT()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_BY_DEFAULT)) is used. Helper functions to use with D3 ([DISPLAY_PROFILE_LIB_D3()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_D3)) or AmCharts ([DISPLAY_PROFILE_LIB_AMCHARTS()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_AMCHARTS)) frameworks are also provided. You may also provide your own function.
 * @param {Object} [options.displayProfileOptions.target] - DOM container to use to display the profile.
 * @fires elevationpath:drawstart
 * @fires elevationpath:drawend
 * @fires elevationpath:compute
 * @fires export:compute
 * @example
 *
 * var measure = new ol.control.ElevationPath({
 *    export : false,
 *    stylesOptions : {
 *     draw : {
 *       finish : new ol.style.Stroke({
 *            color : "rgba(0, 0, 0, 0.5)",
 *            width : 2
 *       })
 *     },
 *    }
 *    displayProfileOptions : {
 *       apply : ol.control.ElevationPath.DISPLAY_PROFILE_RAW,
 *    }
 * });
 *
 * Exemples :
 * - displayProfileOptions.apply : null
 * - displayProfileOptions.apply : function (elevations, container, context) {  // do some stuff... }
 * - displayProfileOptions.apply : ol.control.ElevationPath.DISPLAY_PROFILE_{LIB_AMCHARTS | LIB_D3 | RAW}
 *
 */
declare var ElevationPath: ol.control.ElevationPath;
//# sourceMappingURL=ElevationPath.d.ts.map