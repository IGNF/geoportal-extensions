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
    _projectionExtent : {
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
    * Load custom definition projection
    */
    load : function () {
        logger.trace("Load custom definitions projection");
        // load all defs into proj4
        Register.load(Proj4);
        // register all defs into openlayers
        try {
            register(Proj4);
        } catch (e) {
            // console.error(e);
        }
    },

    /**
     * Overload OpenLayers ol.proj parameters,
     * to manage EPSG:2154 extent restriction
     */
    overload : function () {
        logger.trace("Overload projections");

        for (var code in this._projectionExtent) {
            if (this._projectionExtent.hasOwnProperty(code)) {
                var extent = this._projectionExtent[code];
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
};

export default CRS;

// Expose proj4 with custom defs into OpenLayers global variable
if (window.ol && window.ol.proj && window.ol.proj.proj4) {
    try {
        window.ol.proj.proj4.register(Proj4);
    } catch (e) {
        // console.error(e);
    }
}
