// import external
import Proj4 from "proj4";
// import OpenLayers
import { register } from "ol/proj/proj4";
// import {
//     getTransform,
//     transformExtent
// } from "ol/proj";
// import { applyTransform } from "ol/extent";
// import local
import Register from "../../Common/Utils/Register";
import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("CRS");

var CRS = {

    /**
    * Load custom definition projection
    */
    load : function () {
        logger.trace("Load custom definitions projection");
        // load all defs into proj4
        Register.load();
        // register all defs into openlayers
        register(Proj4);
    },

    /**
     * TODO : Overload OpenLayers ol.proj.transformExtent function,
     * to manage EPSG:2154 extent restriction
     */
    overload : function () {
        logger.trace("Overload functions projection");

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
        // transformExtent = function (extent, source, destination) {
        //     if (destination === "EPSG:2154") {
        //         if (source === "EPSG:4326") {
        //             logger.trace("CRS overload 'ol.proj.transformExtent'");
        //             // dans le cas d'une transfo 4326->2154,
        //             // il faut restreindre l'étendue géographique à l'étendue de validité de Lambert93.
        //             if (extent[0] < -9.62) {
        //                 extent[0] = -9.62;
        //             }
        //             if (extent[1] < 41.18) {
        //                 extent[1] = 41.18;
        //             }
        //             if (extent[2] > 10.3) {
        //                 extent[2] = 10.3;
        //             }
        //             if (extent[3] > 51.54) {
        //                 extent[3] = 51.54;
        //             }
        //         }
        //     }
        //     var transformFn = getTransform(source, destination);
        //     var transformedExtent = applyTransform(extent, transformFn);
        //     return transformedExtent;
        // };
    }
};

export default CRS;

// Expose proj4 with custom defs into OpenLayers global variable
if (window.ol && window.ol.proj && window.ol.proj.proj4) {
    window.ol.proj.proj4.register(Proj4);
}
