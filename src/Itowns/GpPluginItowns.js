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

import "../Common/Utils/AutoLoadConfig";
import Pkg from "../../package";

export * from "geoportal-access-lib";

// Adds the extensions properties in the Gp namespace
export {default as LayerUtils} from "../Common/Utils/LayerUtils";

// Adds extensions properties in the Gp namespace
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
