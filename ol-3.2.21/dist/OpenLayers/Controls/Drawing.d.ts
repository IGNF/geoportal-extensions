export default Drawing;
/**
 * @classdesc
 *
 * Drawing Control.
 *
 * @constructor
 * @alias ol.control.Drawing
 * @type {ol.control.Drawing}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.collapsed = true] - Specify if Drawing control should be collapsed at startup. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object} [options.layer = {}] - Openlayers layer that will hosts created features. If none, an empty vector layer will be created.
 * @param {Object} [options.popup = {}] - Popup informations
 * @param {Boolean} [options.popup.display = true] - Specify if popup is displayed when create a drawing
 * @param {Function} [options.popup.function] - Function to display popup informations if you want to cutomise it. You may also provide your own function with params : {geomType / feature / saveFunc(message) / closeFunc()}. This function must return the DOM object of the popup content.
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Croquis"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mon croquis"] - Layer description to be displayed in LayerSwitcher
 * @param {Object} options.tools - Tools to display in the drawing toolbox. All by default.
 * @param {Boolean} [options.tools.points = true] - Display points drawing tool
 * @param {Boolean} [options.tools.lines = true] - Display lines drawing tool
 * @param {Boolean} [options.tools.polygons = true] - Display polygons drawing tool
 * @param {Boolean} [options.tools.holes = false] - Display polygons with holes drawing tool
 * @param {Boolean} [options.tools.text = true] - Display text drawing tool
 * @param {Boolean} [options.tools.remove = true] - Display feature removing tool
 * @param {Boolean} [options.tools.display = true] - Display style editing tool
 * @param {Boolean} [options.tools.tooltip = true] - Display text editing tool
 * @param {Boolean} [options.tools.edit = true] - Display editing tool
 * @param {Boolean} [options.tools.export = true] - Display exporting tool
 * @param {Boolean} [options.tools.measure = false] - Display measure drawing into popup info
 * @param {String} [options.labels] - Labels for Control
 * @param {String} [options.labels.control] - Label for Control
 * @param {String} [options.labels.points] - Label for points drawing tool
 * @param {String} [options.labels.lines] - Label for lines drawing tool
 * @param {String} [options.labels.polygons] - Label for polygons drawing tool
 * @param {String} [options.labels.holes] - Label for polygons with holes drawing tool
 * @param {String} [options.labels.text] - Label for text drawing tool
 * @param {String} [options.labels.edit] - Label for editing tool
 * @param {String} [options.labels.display] - Label for style editing tool
 * @param {String} [options.labels.tooltip] - Label for text editing tool
 * @param {String} [options.labels.remove] - Label for feature removing tool
 * @param {String} [options.labels.export] - Label for exporting tool.
 * @param {String} [options.labels.exportTitle] - Title for exporting tool.
 * @param {String} [options.labels.applyToObject] - Label for apply to object button.
 * @param {String} [options.labels.saveDescription] - Label for save description button.
 * @param {String} [options.labels.setAsDefault] - Label for set as default style button.
 * @param {String} [options.labels.strokeColor] - Label for stroke color.
 * @param {String} [options.labels.strokeWidth] - Label for stroke width.
 * @param {String} [options.labels.fillColor] - Label for fill color.
 * @param {String} [options.labels.fillOpacity] - Label for fillOpacity.
 * @param {String} [options.labels.markerSize] - Label for markerSize.
 * @param {Array.<Object>} [options.markersList = [{"src" : "data:image/png;base64,xxxx", "anchor" : [0.5,1]}]] - List of markers src to be used for points with their anchor offsets See {@link http://openlayers.org/en/latest/apidoc/ol.style.Icon.html OpenLayers params} for anchor offset options.
 * @param {Object} options.defaultStyles - Default styles applying to geometries (labels, lines and polygons).
 * @param {String} [options.defaultStyles.textFillColor = "#000000"] - Text fill color for labels (RGB hex value).
 * @param {String} [options.defaultStyles.textStrokeColor = "#FFFFFF"] - Text surrounding color for labels (RGB hex value).
 * @param {String} [options.defaultStyles.strokeColor = "#ffcc33"] - Stroke color (RGB hex value).
 * @param {Number} [options.defaultStyles.strokeWidth = 2] - Stroke width in pixels.
 * @param {String} [options.defaultStyles.polyStrokeColor = "#ffcc33"] - Stroke color (RGB hex value) for polygons.
 * @param {Number} [options.defaultStyles.polyStrokeWidth = 2] - Stroke width in pixels for polygons.
 * @param {String} [options.defaultStyles.polyFillColor = "#ffffff"] - Polygons fill color (RGB hex value).
 * @param {Number} [options.defaultStyles.polyFillOpacity = 0.2] - Polygon fill opacity (alpha value between 0:transparent and 1:opaque).
 * @param {Object} options.cursorStyle - cursor (circle) style when drawing or editing.
 * @param {String} [options.cursorStyle.fillColor = "rgba(0, 153, 255, 1)"] - Cursor fill color.
 * @param {String} [options.cursorStyle.strokeColor = "#FFF"] - Cursor stroke color.
 * @param {String} [options.cursorStyle.strokeWidth = 1] - Cursor surrounding stroke width.
 * @param {String} [options.cursorStyle.radius = 6] - Cursor radius.
 * @example
 * var drawing = new ol.control.Drawing({
 *   collapsed : false,
 *   draggable : true,
 *   layerswitcher : {
 *      title : "Dessins",
 *      description : "Mes dessins..."
 *   },
 *   markersList : [{
 *      src : "http://api.ign.fr/api/images/api/markers/marker_01.png",
 *      anchor : [0.5, 1]
 *   }],
 *   defaultStyles : {},
 *   cursorStyle : {},
 *   tools : {
 *      points : true,
 *      lines : true,
 *      polygons :true,
 *      holes : true,
 *      text : false,
 *      remove : true,
 *      display : true,
 *      tooltip : true,
 *      export : true,
 *      measure : true
 *   },
 *   popup : {
 *      display : true,
 *      function : function (params) {
 *          var container = document.createElement("div");
 *          // - params.geomType;
 *          // - params.feature;
 *          // Les 2 fonctions ferment la popup avec ou sans sauvegarde des informations
 *          // dans les properties de la feature (key : description)
 *          // - params.saveFunc(message);
 *          // - params.closeFunc();
 *          return container;
 *      }
 * });
 */
declare var Drawing: ol.control.Drawing;
//# sourceMappingURL=Drawing.d.ts.map