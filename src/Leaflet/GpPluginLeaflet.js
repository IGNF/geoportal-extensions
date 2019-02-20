/**
* Global variable Gp.
*
* @module Gp
* @alias Gp
* @desc
*
* This is the global variable that is exposed in the browser environment.
* Content is composed of constructor, functions and properties...
*
* > ColorUtils: (...)
* > Config:  (...)
* > LayerUtils: (...)
* > MathUtils: (...)
* > ProxyUtils: (...)
* > LExtended: (...)
* > leafletExtDate: "YYYY-MM-DD"
* > leafletExtVersion: "X.X.X"
*
* > Error: (...)
* > Helper: (...)
* > Protocols: (...)
* > Services: (...)
* > servicesDate: "YYYY-MM-DD"
* > servicesVersion: "X.X.X"
*/

import Pkg from "../../package";

import L from "leaflet";

// CSS communes aux extensions !
import "../Common/Styles";
import "./Styles";

import Controls from "./Controls/Controls";
import ElevationPath from "./Controls/ElevationPath";
import Layers from "./Layers/Layers";

import CRS from "./CRS/CRS";

// Autoload...
import "../Common/Utils/AutoLoadConfig";

// export des services
import Gp from "geoportal-access-lib";

// reconstruction des ns
var Services = Gp.Services;
var Error = Gp.Error;
var Helper = Gp.Helper;
var Protocols = Gp.Protocols;
var servicesDate = Gp.servicesDate;
var servicesVersion = Gp.servicesVersion;

export { Services, Error, Helper, Protocols, servicesDate, servicesVersion };

// Rajout des propriétés de l'extension dans le namespace
export const leafletExtVersion = Pkg.leafletExtVersion;
export const leafletExtDate = new Date().toISOString().split("T")[0];

// Classes utilitaires
export {default as Register} from "../Common/Utils/Register";
export {default as LayerUtils} from "../Common/Utils/LayerUtils";
export {default as ProxyUtils} from "../Common/Utils/ProxyUtils";
export {default as ColorUtils} from "../Common/Utils/ColorUtils";
export {default as MathUtils} from "../Common/Utils/MathUtils";

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
