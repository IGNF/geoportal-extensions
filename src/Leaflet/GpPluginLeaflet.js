import Gp from "gp";
import L from "leaflet";
import P from "leaflet-draw";
import Controls from "./Controls/Controls";
import ElevationPath from "./Controls/ElevationPath";
import Layers from "./Layers/Layers";
import CRS from "./CRS/CRS";
import Register from "../Common/Utils/Register";

// on determine l'environnement d'execution : browser ou non ?
// var scope = typeof window !== "undefined" ? window : {};

// on voit s'il existe déjà cette variable, sinon on la met en place
// var L = scope.L || {};

// Rajout des propriétés de l'extension dans le namespace Gp
Gp.leafletExtVersion = "__GPLEAFLETEXTVERSION__";
Gp.leafletExtDate = "__GPDATE__";

// Classes utilitaires
Gp.Register = Register;

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

// on sauvegarde la variable dans l'env.
// scope.L = L;

export default Gp;
