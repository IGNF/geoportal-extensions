// import external
import Proj4 from "proj4";
// import OpenLayers
import { register } from "ol/proj/proj4";
import {
    getTransform,
    addProjection,
    get as getProjection
} from "ol/proj";
import { applyTransform } from "ol/extent";
// import local
import Register from "../../Common/Utils/Register";
import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("CRS");

var CRS = {

    /**
    * List of extent projections
    */
    projectionsExtent : {
        "EPSG:2154" : {
            left : -9.62,
            bottom : 41.18,
            right : 10.3,
            top : 51.54
        },
        "EPSG:27572" : {
            left : -4.87,
            bottom : 42.33,
            right : 8.23,
            top : 51.14
        }
    },

    /**
    * Load all custom definition projection
    */
    load : function () {
        logger.trace("Loading custom definitions projections");
        // loading except if it's already loaded...
        if (!Register.isLoaded) {
            // load all defs into proj4
            Register.load(Proj4);
            try {
                // register all defs into openlayers
                if (window.ol && window.ol.proj && window.ol.proj.proj4) {
                    // Expose proj4 with custom defs into OpenLayers global variable
                    window.ol.proj.proj4.register(Proj4);
                } else {
                    register(Proj4);
                }
            } catch (e) {
                // FIXME ?
                // console.error(e);
            }
        }
    },

    /**
    * Load definition projection by default
    */
    loadByDefault : function () {
        logger.trace("Loading custom definitions projections by default");
        // load defs by default into proj4
        Register.loadByDefault(Proj4);
        try {
            // register all defs into openlayers
            if (window.ol && window.ol.proj && window.ol.proj.proj4) {
                // Expose proj4 with custom defs into OpenLayers global variable
                window.ol.proj.proj4.register(Proj4);
            } else {
                register(Proj4);
            }
        } catch (e) {
            // FIXME ?
            // console.error(e);
        }
    },

    /**
     * Overload OpenLayers ol.proj parameters,
     * to manage EPSG:2154 extent restriction
     */
    overload : function () {
        logger.trace("Loading projections aera (extent)");
        // overloading except if it's already overloaded...
        if (!Register.isLoaded) {
            for (var code in this.projectionsExtent) {
                if (this.projectionsExtent.hasOwnProperty(code)) {
                    var extent = this.projectionsExtent[code];
                    var proj = getProjection(code);
                    var fromLonLat = getTransform("EPSG:4326", proj);

                    // very approximate calculation of projection extent
                    var _extent = applyTransform([extent.bottom, extent.right, extent.top, extent.left], fromLonLat);
                    proj.setExtent(_extent);
                    addProjection(proj);

                    // Expose projection extent with custom defs into OpenLayers global variable
                    if (window.ol && window.ol.proj && window.ol.proj.addProjection) {
                        window.ol.proj.addProjection(proj);
                    }
                }
            }
        }
    }
};

export default CRS;

// Expose proj4 with custom defs into OpenLayers global variable
// if (window.ol && window.ol.proj && window.ol.proj.proj4) {
//     try {
//         window.ol.proj.proj4.register(Proj4);
//     } catch (e) {
//         // console.error(e);
//     }
// }
