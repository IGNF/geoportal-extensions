export default MeasureAzimuth;
/**
 * @classdesc
 *
 * Azimuth measurement Control. Allows users to draw a line on an Openlayers map and have its angle in decimal degrees clockwise from the geographical north.
 *
 * @constructor
 * @alias ol.control.MeasureAzimuth
 * @type {ol.control.MeasureAzimuth}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.geodesic = false] - If true, azimuth will be computed on the global sphere. Otherwise, it will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures d'azimuth"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measure = new ol.control.MeasureAzimuth({
 *   geodesic : true
 * });
 */
declare var MeasureAzimuth: ol.control.MeasureAzimuth;
//# sourceMappingURL=MeasureAzimuth.d.ts.map