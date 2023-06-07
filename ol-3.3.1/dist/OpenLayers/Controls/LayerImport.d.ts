export default LayerImport;
/**
 * @classdesc
 *
 * LayerImport Control. Allows users to add geographical data in standards formats from their own sources to the map.
 *
 * @constructor
 * @alias ol.control.LayerImport
 * @extends {ol.control.Control}
 * @type {ol.control.LayerImport}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.collapsed = true] - Specify if LayerImport control should be collapsed at startup. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Array} [options.layerTypes = ["KML", "GPX", "GeoJSON", "WMS", "WMTS", "MAPBOX"]] - data types that could be imported : "KML", "GPX", "GeoJSON", "WMS", "WMTS" and "MAPBOX". Values will be displayed in the same order in widget list.
 * @param {Object} [options.webServicesOptions = {}] - Options to import WMS or WMTS layers
 * @param {String} [options.webServicesOptions.proxyUrl] - Proxy URL to avoid cross-domain problems. Mandatory to import WMS and WMTS layer.
 * @param {Array.<String>} [options.webServicesOptions.noProxyDomains] - Proxy will not be used for this list of domain names. Only use if you know what you're doing.
 * @param {Object} [options.vectorStyleOptions] - Options for imported vector layer styling (KML, GPX, GeoJSON)
 * @param {Object} [options.vectorStyleOptions.KML] - Options for KML layer styling
 * @param {Boolean} [options.vectorStyleOptions.KML.extractStyles = true] - Extract styles from the KML. Default is true.
 * @param {Boolean} [options.vectorStyleOptions.KML.showPointNames = true] - Show names as labels for KML placemarks which contain points. Default is true.
 * @param {Object} [options.vectorStyleOptions.KML.defaultStyle] - default style to be applied to KML imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * @param {Object} [options.vectorStyleOptions.GPX] - Options for GPX layer styling
 * @param {Object} [options.vectorStyleOptions.GPX.defaultStyle] - default style to be applied to GPX imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * @param {Object} [options.vectorStyleOptions.GeoJSON] - Options for GeoJSON layer styling
 * @param {Object} [options.vectorStyleOptions.GeoJSON.defaultStyle] - default style to be applied to GeoJSON imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * @param {Object} [options.vectorStyleOptions.MapBox] - Options for MapBox layer styling
 * @param {Object} [options.vectorStyleOptions.MapBox.defaultStyle] - default style to be applied to MapBox imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
 * @param {Object} [options.vectorStyleOptions.MapBox.editor] - options for tools editor
 * @param {Boolean} [options.vectorStyleOptions.MapBox.display = true] - display tools editor
 * @example
 *  var LayerImport = new ol.control.LayerImport({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "layerTypes" : ["KML", "GPX"],
 *      "webServicesOptions" : {
 *          "proxyUrl" : "http://localhost/proxy/php/proxy.php?url=",
 *          "noProxyDomains" : []
 *      },
 *      "vectorStyleOptions" : {
 *          "KML" : {
 *              extractStyles : true,
 *              defaultStyle : new ol.style.Style({
 *                  image : new ol.style.Icon({
 *                       src : "data:image/png;base64....",
 *                       size : [51, 38],
 *                  }),
 *                  stroke : new ol.style.Stroke({
 *                       color : "#ffffff",
 *                       width : 7
 *                  }),
 *                  fill : new ol.style.Fill({
 *                       color : "rgba(255, 183, 152, 0.2)"
 *                  }),
 *                  text : new ol.style.Text({
 *                      font : "16px Sans",
 *                      textAlign : "left",
 *                      fill : new ol.style.Fill({
 *                          color : "rgba(255, 255, 255, 1)"
 *                      }),
 *                      stroke : new ol.style.Stroke({
 *                          color : "rgba(0, 0, 0, 1)",
 *                          width : 2
 *                      })
 *                  })
 *              })
 *          },
 *          "GPX" : {
 *              defaultStyle : new ol.style.Style({
 *                  image : new ol.style.Icon({
 *                       src : "path/to/my/icon.png",
 *                       size : [51, 38],
 *                  }),
 *                  stroke : new ol.style.Stroke({
 *                       color : "#ffffff",
 *                       width : 7
 *                  })
 *              })
 *          }
 *      }
 *  });
 */
declare var LayerImport: ol.control.LayerImport;
//# sourceMappingURL=LayerImport.d.ts.map