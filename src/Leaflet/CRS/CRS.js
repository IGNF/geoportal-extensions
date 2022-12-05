import Proj4 from "proj4";
import "proj4leaflet";
import Register from "../../Common/Utils/Register";
import Epsg2154 from "./EPSG2154";
import Epsg27572 from "./EPSG27572";
import Epsg4326 from "./EPSG4326";

/** autoload function */
(function () {
    // load all defs into proj4
    Register.load(Proj4);
})();

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
var CRS = {

    /**
     * Lambert 93 ("EPSG:2154") CRS definition to be used with Leaflet.
     *
     * @method EPSG2154
     * @static
     * @alias L.geoportalCRS.EPSG2154
     * @returns {EPSG2154} epsg code
     */
    EPSG2154 : function () {
        return Epsg2154.build();
    },

    /**
     * CRS : Lambert 2 extened
     *
     * @method EPSG27572
     * @static
     * @alias L.geoportalCRS.EPSG27572
     * @returns {EPSG27572} epsg code
     */
    EPSG27572 : function () {
        return Epsg27572.build();
    },

    /**
     * CRS : EPSG4326
     *
     * @ignore
     * @method EPSG4326
     * @static
     * @alias L.geoportalCRS.EPSG4326
     * @returns {EPSG4326} epsg code
     */
    EPSG4326 : function () {
        return Epsg4326.build();
    }
};

export default CRS;

// Expose CRS as L.geoportalCRS (for a build bundle)
if (window.L) {
    window.L.geoportalCRS = CRS;
}
