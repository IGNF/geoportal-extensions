/*
 * FIXME
 * en mode bundle, l'action register des methodes de chargement est executée 2 fois.
 * mais aucun impact sur performance, car le register teste si la projection a été déjà
 * chargé...
 */

// import external
import Proj4 from "proj4";
// import OpenLayers
// import { register } from "ol/proj/proj4";
import { register } from "./Proj4";
import {
    getTransform,
    addProjection,
    get as getProjection
} from "ol/proj";
// import { clear as clearProj } from "ol/proj/transforms";
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
                // register all defs
                register(Proj4);
                // Expose proj4 with custom defs into OpenLayers global variable
                if (window.ol && window.ol.proj && window.ol.proj.proj4) {
                    window.ol.proj.proj4.register = register;
                    window.ol.proj.proj4.register(Proj4);
                }
            } catch (e) {
                // FIXME ?
                logger.error(e);
                // clearProj();
            }
        }
    },

    /**
    * Load definition projection by default
    *
    * include into proj4 :
    * - WGS84
    * - ['EPSG:4326']
    * - ['EPSG:3785'], ['EPSG:3857'], GOOGLE, ['EPSG:900913'], ['EPSG:102113']
    * +
    * - ["EPSG:2154"], ["EPSG:27571"],  ["EPSG:27572"],  ["EPSG:27573"],  ["EPSG:2757"],
    * - ["CRS:84"],
    * - ["IGNF:LAMB93"],
    * - ["IGNF:LAMBE"], ["IGNF:LAMB1"],  ["IGNF:LAMB2"],  ["IGNF:LAMB3"],  ["IGNF:LAMB4"],
    * - ["IGNF:RGF93G"],
    * - ["IGNF:WGS84G"]
    */
    loadByDefault : function () {
        logger.trace("Loading custom definitions projections by default");
        // loading except if it's already loaded...
        if (!Register.isLoaded) {
            // load defs by default into proj4
            Register.loadByDefault(Proj4);
            try {
                // register all defs
                register(Proj4);
                // Expose proj4 with custom defs into OpenLayers global variable
                if (window.ol && window.ol.proj && window.ol.proj.proj4) {
                    window.ol.proj.proj4.register = register;
                    window.ol.proj.proj4.register(Proj4);
                }
            } catch (e) {
                // FIXME une projection ne passe pas avec ol.proj/proj4.register()...
                // on fait quoi ?
                logger.error(e);
                // clearProj();
            }
        }
    },

    /**
    * Load a custom definition projection
    * @param {String} name - ie. EPSG:2154 (Lambert)
    */
    loadByName : function (name) {
        logger.trace("Loading a custom definition projection : ", name);
        // loading except if it's already loaded...
        if (!Register.isLoaded) {
            // load defs by default into proj4
            Register.loadByName(Proj4, name);
            try {
                // register all defs
                register(Proj4);
                // Expose proj4 with custom defs into OpenLayers global variable
                if (window.ol && window.ol.proj && window.ol.proj.proj4) {
                    window.ol.proj.proj4.register = register;
                    window.ol.proj.proj4.register(Proj4);
                }
            } catch (e) {
                // FIXME ?
                logger.error(e);
                // clearProj();
            }
        }
    },

    /**
     * Overload OpenLayers ol.proj parameters,
     * to manage EPSG:2154 extent restriction
     */
    overload : function () {
        logger.trace("Loading projections aera (extent)");
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
};

export default CRS;

// Expose proj4 with custom defs into OpenLayers global variable
if (window.ol && window.ol.proj && window.ol.proj.proj4) {
    window.ol.proj.proj4.register = register;
}
