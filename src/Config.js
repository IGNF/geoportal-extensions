/* global requirejs */

requirejs.config({
    baseUrl : "",
    // Attention, les lib. peuvent être redefinies dans le fichier "gulpfile.js" !
    // En mode 'production', les paths "ol" et "leaflet" sont remplacés par le mot clef "empty:"
    // car ce sont des dependances externes (injectées par une balise "script")
    paths : {
        "gp"           : "../node_modules/geoportal-access-lib/dist/GpServices-src",
        "leaflet"      : "../node_modules/leaflet/dist/leaflet-src",
        "leaflet-draw" : "../node_modules/leaflet-draw/dist/leaflet.draw-src",
        "proj4"        : "../node_modules/proj4/dist/proj4-src",
        "proj4leaflet" : "../node_modules/proj4leaflet/src/proj4leaflet",
        "ol"           : "../node_modules/openlayers/dist/ol",
        "woodman"      : "../node_modules/woodman/dist/woodman-amd",
        "sortable"     : "../node_modules/sortablejs/Sortable"
        // "vg"        : "../lib/vg/js/VirtualGeoWeb-1.1.min", // not use beacause of browser compatibility only !
    }
});
