import CRS from "./CRS";

/**
 * Autoload function that loads all defs into proj4
 * and adds proj4 defs into ol.
 */
(function () {
    // load all defs into proj4
    // and register all defs into openlayers
    CRS.load();
    CRS.overload();
})();
