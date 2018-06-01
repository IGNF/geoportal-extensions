import L from "leaflet";
import Controls from "./Controls/Controls";
import ElevationPath from "./Controls/ElevationPath";
import Layers from "./Layers/Layers";
import CRS from "./CRS/CRS";
import "./CSS";
import "../Common/Utils/AutoLoadConfig";
import Pkg from "../../package";

/**
 * The Geoportal extension for Leaflet module.
 * In browser mode a global variable named 'Gp' which contains every module exports is exposed.
 * @module LeafletExtension
 */

/**
 * This module wrap the geoportal access library and exports all its exported symbols.
 * See [Geoportal access library module]{@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/}
 * @name *
 * @static
 */
export * from "gp";

/** Leaflet extension version */
export const leafletExtVersion = Pkg.leafletExtVersion;

/** Leaflet extension creation date */
export const leafletExtDate = new Date().toISOString().split("T")[0];

export {
    /**
     * Register definition for IGNF, and EPSG CRS
     */
    default as Register
} from "../Common/Utils/Register";

// creation du namespace pour les extensions leaflet
L.geoportalLayer = Layers; // WMS et WMTS
L.geoportalControl = Controls; // IsoChrone, SearchEngine, ...

L.geoportalControl.ElevationPath.DISPLAY_PROFILE_LIB_D3 = ElevationPath.DISPLAY_PROFILE_LIB_D3;
L.geoportalControl.ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS = ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS;
L.geoportalControl.ElevationPath.DISPLAY_PROFILE_RAW = ElevationPath.DISPLAY_PROFILE_RAW;
L.geoportalControl.ElevationPath.DISPLAY_PROFILE_BY_DEFAULT = ElevationPath.DISPLAY_PROFILE_BY_DEFAULT;

L.geoportalCRS = CRS; // lambert 93 et lambert 2 étendu
L.geoportalCRS.EPSG2154 = CRS.EPSG2154(); // lambert 93
L.geoportalCRS.EPSG27572 = CRS.EPSG27572(); // lambert 2 étendu
L.geoportalCRS.EPSG4326 = CRS.EPSG4326();

export {
    /**
     * Extended itowns library
     */
    L as LExtended
};
