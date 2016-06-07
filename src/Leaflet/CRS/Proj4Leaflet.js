/**
 * desativation JSHINT
 * W098 - 'proj4' is defined but never used
 */

 /*jshint -W098 */

define([
    "require",
    "leaflet",
    "proj4",
    "proj4leaflet-0.7.x",
    "proj4leaflet-1.0.x"
],
function (
    require,
    L,
    proj4
) {

    "use strict";

    return {
        /** ... */
        load : function () {
            console.log("loading lib proj4leaflet ...");
            var proj4leaflet = null;

            if (L.version.lastIndexOf("0.7", 0) === 0) {
                proj4leaflet = require("proj4leaflet-0.7.x");
                console.log("loaded version for leaflet 0.7.7 ...");
            } else if (L.version.lastIndexOf("1.0", 0) === 0) {
                proj4leaflet = require("proj4leaflet-1.0.x");
                console.log("loaded version for leaflet 1.0.0 ...");
            } else {
                console.log("version leaflet incompatible !");
                return;
            }

            L.Proj = proj4leaflet;
            return L.Proj;
        }
    };
});
