export default MeasureLength;
/**
 * @classdesc
 *
 * Length measurement Control. Allows users to draw a path on Openlayers map and have its length computed and displayed.
 *
 * @constructor
 * @alias ol.control.MeasureLength
 * @type {ol.control.MeasureLength}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.geodesic = true] - If true, length will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/module-ol_sphere.html#haversineDistance ol.Sphere.haversineDistance()} function. Otherwise, length will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the path. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures de distance"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measureLength = new ol.control.MeasureLength({
 *    geodesic : false
 * });
 */
declare var MeasureLength: ol.control.MeasureLength;
//# sourceMappingURL=MeasureLength.d.ts.map