/* global requirejs */

var path  = require("path");
requirejs.config({
    baseUrl : "",
    // FIXME les lib. sont déposées manuellement !
    // en mode 'production' : "empty:" cf. gulpfile.js
    paths : {
        "gp" : path.join("..", "lib", "gp", "GpServices-src"),
        "leaflet" : path.join("..", "lib", "leaflet", "leaflet-src"),
        "leaflet-draw" : path.join("..", "lib", "leaflet-plugins", "leaflet-draw", "leaflet.draw-src"),
        "proj4" : path.join("..", "lib", "proj4", "proj4-src"),
        "proj4leaflet" : path.join("..", "lib", "proj4leaflet", "proj4leaflet-src"),
        "ol" : path.join("..", "lib", "ol3", "ol"),
        // "vg" : path.join("..", "lib", "vg", js", "VirtualGeoWeb-1.1.min"), // FIXME not use beacause of browser compatibility only !
        "woodman" : path.join("..", "lib", "woodman", "woodman-amd"),
        "sortable" : path.join("..", "lib", "sortable", "Sortable")
    }
});
