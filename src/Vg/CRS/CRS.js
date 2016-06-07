define([
    "proj4"
], function (
    proj4
) {

    "use strict";

    var CRS = {

        /**
        * CRS : WGS84
        *
        * @property EPSG:4326
        * @private
        */
        "EPSG:4326" : "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs +units=degrees",

        /**
        * CRS : PseudoMercator
        *
        * @property EPSG:3857
        * @private
        */
        "EPSG:3857" : "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",

        /**
        * CRS : Lambert 93
        *
        * @property EPSG:2154
        * @private
        */
        "EPSG:2154" : "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

        /**
        * CRS : Lambert 2 extended
        *
        * @property EPSG:27572
        * @private
        */
        "EPSG:27572" : "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs"

    };

    return CRS;

});
