define([
    "leaflet",
    "proj4",
    "proj4leaflet",
    "Common/Utils/Register",
    "Leaflet/CRS/EPSG2154",
    "Leaflet/CRS/EPSG27572",
    "Leaflet/CRS/EPSG4326"
],
function (
    L,
    proj4,
    Proj4Leaflet,
    Register,
    Epsg2154,
    Epsg27572,
    Epsg4326
) {

    "use strict";

    /** autoload function */
    (function () {
        // load all defs into proj4
        Register.load();
    })();

    /**
    * CRS (Coordinate Reference Systems) Factory to create <a href="http://kartena.github.io/Proj4Leaflet/api/#l-proj-crs" target="_blank">L.Proj.CRS</a> instances.
    *
    * @module CRS
    * @alias L.geoportalCRS
    * @ignore
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
    var CRS = {

        /**
        * Lambert 93 ("EPSG:2154") CRS definition to be used with Leaflet.
        *
        * @method EPSG2154
        * @static
        * @alias L.geoportalCRS.EPSG2154
        * @returns {EPSG2154}
        */
        EPSG2154 : function () {
            return Epsg2154.build();
        },

        /**
        * CRS : Lambert 2 extened
        *
        * @ignore
        * @method EPSG27572
        * @alias L.geoportalCRS.EPSG27572
        * @returns {EPSG27572}
        */
        EPSG27572 : function () {
            return Epsg27572.build();
        },

        /**
        * CRS : EPSG4326
        *
        * @ignore
        * @method EPSG4326
        * @alias L.geoportalCRS.EPSG4326
        * @returns {EPSG4326}
        */
        EPSG4326 : function () {
            return Epsg4326.build();
        }
    };

    return CRS;
});
