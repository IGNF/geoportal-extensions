import CRS from "./CRS";

/**
 * Autoload function that loads defs into proj4
 * and adds proj4 defs into ol.
 */
(function () {
    // load all defs into proj4
    // CRS.load();
    // load default defs into proj4
    CRS.loadByDefault();
    // and register defs into openlayers
    CRS.overload();
})();
