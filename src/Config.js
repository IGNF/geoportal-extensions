/* global requirejs */

requirejs.config({
    baseUrl : "",
    // Attention, les lib. peuvent être redefinies dans le fichier "gulpfile.js" !
    // En mode 'production', les paths "ol" et "leaflet" sont remplacés par le mot clef "empty:"
    // car ce sont des dependances externes (injectées par une balise "script")
    paths : {
        "gp"           : "../lib/gp/GpServices-src",
        "leaflet"      : "../lib/leaflet/leaflet-src",
        "leaflet-draw" : "../lib/leaflet-plugins/leaflet-draw/leaflet.draw-src",
        "proj4"        : "../lib/proj4/proj4-src",
        "proj4leaflet" : "../lib/proj4leaflet/proj4leaflet-src",
        "ol"           : "../lib/ol3/ol",
        "woodman"      : "../lib/woodman/woodman-amd",
        "sortable"     : "../lib/sortable/Sortable"
        // "vg"        : "../lib/vg/js/VirtualGeoWeb-1.1.min", // not use beacause of browser compatibility only !
    }
});
