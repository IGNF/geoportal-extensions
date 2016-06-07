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
     * Projection Lambert 93 (EPSG:27572)
     *
     * @private
     * @returns {ol.proj.ProjectionLike}
     */
    var EPSG27572 = {

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
                proj4.defs("EPSG:27572",
                    "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs"
                );
                if ( !ol.proj.get("EPSG:27572") ) {
                    if ( !ol.proj.proj4_ && ol.proj.setProj4 ) {
                        ol.proj.setProj4(proj4);
                    } else {
                        console.log("WARNING : OpenLayers library should manage proj4 dependency in order to add custom projections (EPSG:27572 for instance)");
                    }
                }
                this.instance = ol.proj.get("EPSG:27572");
            }

            return this.instance;
        }
    };

    return EPSG27572;
});
