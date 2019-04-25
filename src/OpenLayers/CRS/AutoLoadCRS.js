import CRS from "./CRS";

/**
 * Autoload function that loads defs into proj4
 * and adds proj4 defs into ol.
 */
(function () {
    // if you want to load all defs into proj4
    // you can call :
    //   inside code, CRS.load()
    // or
    //   outside code, Gp.olExtended.includeProjections()
    // but you can call only once...

    // load default defs into proj4
    CRS.loadByDefault();
    // and register defs into openlayers
    CRS.overload();
})();
