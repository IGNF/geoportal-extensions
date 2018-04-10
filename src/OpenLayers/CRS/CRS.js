import ol from "ol";
import Proj4 from "proj4";
import Register from "../../Common/Utils/Register";

/**
 * Autoload function that loads all defs into proj4
 * and adds proj4 defs into ol.
 */
(function () {
    // load all defs into proj4
    Register.load();
    // overload proj4 into ol
    if (!ol.proj.proj4_ && ol.proj.setProj4) {
        ol.proj.setProj4(Proj4);
    } else {
        console.log("WARNING : OpenLayers library should manage proj4 dependency in order to add custom projections (Lambert 93 for instance)");
    }
})();

var CRS = {

    /**
     * Overload OpenLayers ol.proj.transformExtent function,
     * to manage EPSG:2154 extent restriction
     */
    overloadTransformExtent : function () {
        /**
         * Transforms an extent from source projection to destination projection.  This
         * returns a new extent (and does not modify the original).
         * Overload Geoportal Extension for Openlayers : to manage EPSG:2154 extent restriction.
         *
         * @param {ol.Extent} extent - The extent to transform.
         * @param {ol.proj.ProjectionLike} source - Source projection-like.
         * @param {ol.proj.ProjectionLike} destination - Destination projection-like.
         * @return {ol.Extent} extent - The transformed extent.
         */
        ol.proj.transformExtent = function (extent, source, destination) {
            if (destination === "EPSG:2154") {
                if (source === "EPSG:4326") {
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
     * Load all overload function
     */
    overload : function () {
        // TODO ajouter les fonctions à surcharger...
        this.overloadTransformExtent();
    }
};

export default CRS;
