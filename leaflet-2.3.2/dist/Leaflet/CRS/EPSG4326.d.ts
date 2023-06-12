export default EPSG4326;
/**
 * Projection Geographic (EPSG:4326)
 * (PROTOTYPE)
 *
 * @ignore
 * @module
 * @alias L.geoportalCRS.EPSG2154
 * @returns {L.Proj.CRS}
 * @example
 *  var map = L.Map('divmap', {
 *    crs : L.geoportalCRS.EPSG4326 // ou L.CRS.EPSG4326
 *  }).setView();
 *  var lyr = L.geoportalLayer.WMTS(
 *    {
 *      layer : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO",
 *      apiKey : "wqxljfvklsdhvlfkjqfmlq787645"
 *    },
 *    {
 *      attribution : "test for layer ORTHOIMAGERY",
 *      opacity : 1,
 *      transparent : true,
 *      minZoom : 1,
 *      maxZoom : 21
 *      ...
 *    });
 *
 *  lyr.addTo(map); // ou map.addLayer(lyr);
 */
/** @type {L.geoportalCRS.EPSG4326} */
declare var EPSG4326: L.geoportalCRS.EPSG4326;
//# sourceMappingURL=EPSG4326.d.ts.map