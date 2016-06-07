define([
    "proj4",
    "ol"
], function (
    proj4,
    ol
) {

    "use strict";

    /**
     *
     * Projection Lambert 93 (EPSG:2154)
     *
     * @private
     * @returns {ol.proj.ProjectionLike}
     */
    var EPSG2154 = {

        /**
        * instance
        *
        * @private
        */
        instance : null,

        /**
         * execution
         *
         * @private
         */
        build : function () {
            // singleton
            if (!this.instance) {
                proj4.defs("EPSG:2154",
                    "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
                );
                if ( !ol.proj.get("EPSG:2154") ) {
                    if ( !ol.proj.proj4_ && ol.proj.setProj4 ) {
                        ol.proj.setProj4(proj4);
                    } else {
                        console.log("WARNING : OpenLayers library should manage proj4 dependency in order to add custom projections (Lambert 93 for instance)");
                    }
                }
                this.instance = ol.proj.get("EPSG:2154");
            }

            return this.instance;
        }
    };

    return EPSG2154;
});
