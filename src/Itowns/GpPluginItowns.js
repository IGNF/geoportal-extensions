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
* > itownsExtended: (...)
* > itownsExtVersion: "YYYY-MM-DD"
* > itownsExtVersion: "X.X.X"
*
* > Error: (...)
* > Helper: (...)
* > Protocols: (...)
* > Services: (...)
* > servicesDate: "YYYY-MM-DD"
* > servicesVersion: "X.X.X"
*/

import Pkg from "../../package";

import * as Itowns from "itowns";

import MousePosition from "./Controls/MousePosition";
import LayerSwitcher from "./Controls/LayerSwitcher";
import Attributions from "./Controls/Attributions";
import Scale from "./Controls/Scale";
import MiniGlobe from "./Controls/MiniGlobe";
import GeoportalWMTS from "./Layer/LayerWMTS";
import GeoportalWMS from "./Layer/LayerWMS";
import GeoportalElevation from "./Layer/LayerElevation";
import GlobeViewExtended from "./GlobeViewExtended";

import CRS from "./CRS/CRS";

// CSS communes aux extensions !
import "../Common/Styles";
import "./Styles";

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

// Adds the extensions properties in the namespace
export {default as LayerUtils} from "../Common/Utils/LayerUtils";
export {default as ProxyUtils} from "../Common/Utils/ProxyUtils";
export {default as ColorUtils} from "../Common/Utils/ColorUtils";
export {default as MathUtils} from "../Common/Utils/MathUtils";

// Adds extensions properties in the namespace
export const itownsExtVersion = Pkg.itownsExtVersion;
export const itownsExtDate = new Date().toISOString().split("T")[0];

// creation of the namespace for the itowns extensions
Itowns.control = {};
Itowns.control.MousePosition = MousePosition;
Itowns.control.LayerSwitcher = LayerSwitcher;
Itowns.control.Attributions = Attributions;
Itowns.control.Scale = Scale;
Itowns.control.MiniGlobe = MiniGlobe;
Itowns.layer = {};
Itowns.layer.GeoportalWMTS = GeoportalWMTS;
Itowns.layer.GeoportalWMS = GeoportalWMS;
Itowns.layer.GeoportalElevation = GeoportalElevation;
Itowns.CRS = CRS;
Itowns.GlobeViewExtended = GlobeViewExtended;

export {Itowns as itownsExtended};
