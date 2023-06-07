export default CRS;
/**
 * CRS (Coordinate Reference Systems) Factory to create <a href="http://kartena.github.io/Proj4Leaflet/api/#l-proj-crs" target="_blank">L.Proj.CRS</a> instances.
 *
 * @module CRS
 * @alias L.geoportalCRS
 * @abstract
 * @example
 *  var map = L.Map('divmap', {
 *    crs : L.geoportalCRS.EPSG2154
 *  }).setView();
 *
 *  var lyr = L.geoportalLayer.WMTS(
 *    {
 *      layer : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
 *    },
 *    {
 *      opacity : 1,
 *      transparent : true,
 *      minZoom : 1,
 *      maxZoom : 21
 *      ...
 *    });
 *
 *  lyr.addTo(map); // ou map.addLayer(lyr);
 */
/** @type {L.geoportalCRS} */
declare var CRS: L.geoportalCRS;
//# sourceMappingURL=CRS.d.ts.map