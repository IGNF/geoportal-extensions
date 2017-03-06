/* global requirejs */

requirejs.config({
    baseUrl : "",
    // FIXME les lib. sont déposées manuellement !
    // en mode 'production' : "empty:" cf. gulpfile.js
    paths : {
        gp : "../lib/gp/GpServices-src",
        leaflet : "../lib/leaflet/leaflet-src",
        "leaflet-draw" : "../lib/leaflet/plugins/leaflet-draw/leaflet.draw-src",
        proj4 : "../lib/proj4/proj4-src",
        "proj4leaflet-0.7.x" : "../lib/proj4leaflet/proj4leaflet-src",
        "proj4leaflet-1.0.x" : "../lib/proj4leaflet/1.0.0-beta.2/proj4leaflet-src",
        ol : "../lib/ol3/ol",
        itowns : "../lib/itowns/itowns",
        // vg : "../lib/vg/js/VirtualGeoWeb-1.1.min", // FIXME not use beacause of browser compatibility only !
        woodman : "../lib/woodman/woodman-amd",
        sortable : "../lib/sortable/Sortable"
    }
});
