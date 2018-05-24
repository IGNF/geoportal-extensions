import L from "leaflet";
import Controls from "./Controls/Controls";
import ElevationPath from "./Controls/ElevationPath";
import Layers from "./Layers/Layers";
import CRS from "./CRS/CRS";
import "./CSS";
import "../Common/Utils/AutoLoadConfig";
import Pkg from "../../package";

export * from "gp";

// Rajout des propriétés de l'extension dans le namespace Gp
export const leafletExtVersion = Pkg.leafletExtVersion;
export const leafletExtDate = new Date().toISOString().split("T")[0];

// Classes utilitaires
export {default as Register} from "../Common/Utils/Register";

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

export {L as LExtended};
