define([
    "proj4",
    "ol",
    "Ol3/CRS/EPSG2154",
    "Ol3/CRS/EPSG27572"
], function (
    proj4,
    ol,
    EPSG2154,
    EPSG27572
) {

    "use strict";

    var CRS = {

        /**
        * CRS : Lambert 93
        *
        * @method EPSG2154
        * @returns {Epsg2154}
        * @private
        */
        EPSG2154 : function () {
            return EPSG2154.build();
        },

        /**
        * CRS : Lambert 2 extended
        *
        * @method EPSG27572
        * @returns {Epsg27572}
        * @private
        */
        EPSG27572 : function () {
            return EPSG27572.build();
        },

        /**
         * Overload OpenLayers ol.proj.transformExtent function, to manage EPSG:2154 extent restriction
         */
        overloadTransformExtent : function () {
            /**
             * Transforms an extent from source projection to destination projection.  This
             * returns a new extent (and does not modify the original).
             * Overload Geoportal Extension for OL3 : to manage EPSG:2154 extent restriction.
             *
             * @param {ol.Extent} extent - The extent to transform.
             * @param {ol.proj.ProjectionLike} source - Source projection-like.
             * @param {ol.proj.ProjectionLike} destination - Destination projection-like.
             * @return {ol.Extent} extent - The transformed extent.
             */
            ol.proj.transformExtent = function (extent, source, destination) {
                if ( destination === "EPSG:2154" ) {
                    if ( source === "EPSG:4326" ) {
                        // dans le cas d'une transfo 4326->2154,
                        // il faut restreindre l'étendue géographique à l'étendue de validité de Lambert93.
                        if (extent[0] < -9.62) {
                            extent[0] = -9.62;
                        }
                        if (extent[1] < 41.18) {
                            extent[1] = 41.18;
                        }
                        if (extent[2] > 10.3) {
                            extent[2] = 10.3;
                        }
                        if (extent[3] > 51.54) {
                            extent[3] = 51.54;
                        }
                    }
                }
                var transformFn = ol.proj.getTransform(source, destination);
                var transformedExtent = ol.extent.applyTransform(extent, transformFn);
                return transformedExtent;
            };
        },

        /**
         * Add default CRS to project
         */
        runDefault : function () {
            this.EPSG2154();
            this.EPSG27572();
            this.overloadTransformExtent();
        }
    };

    return CRS;

});
