/* global requirejs */

requirejs.config({
    baseUrl : "",
    // FIXME les lib. sont déposées manuellement !
    // en mode 'production' : "empty:" cf. gulpfile.js
    paths : {
        gp : "../lib/gp/GpServices-src",
        leaflet : "../lib/leaflet/leaflet-src",
        "leaflet-draw" : "../lib/leaflet-plugins/leaflet-draw/leaflet.draw-src",
        proj4 : "../lib/proj4/proj4-src",
        proj4leaflet : "../lib/proj4leaflet/proj4leaflet-src",
        ol : "../lib/openlayers/ol",
        // vg : "../lib/vg/js/VirtualGeoWeb-1.1.min", // FIXME not use beacause of browser compatibility only !
        woodman : "../lib/woodman/woodman-amd",
        sortable : "../lib/sortable/Sortable"
    }
});
