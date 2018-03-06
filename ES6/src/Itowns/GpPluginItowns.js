import * as Itowns from "itowns";
import Gp from "gp";
import LayerUtils from "../Common/Utils/LayerUtils";
import MousePosition from "./Controls/MousePosition";
import LayerSwitcher from "./Controls/LayerSwitcher";
import Attributions from "./Controls/Attributions";
import Scale from "./Controls/Scale";
import MiniGlobe from "./Controls/MiniGlobe";
import GlobeViewExtended from "./GlobeViewExtended";


// Adds the extensions properties in the Gp namespace
Gp.LayerUtils = LayerUtils;

// creation of the namespace for the itowns extensions
Itowns.control = {};
Itowns.control.MousePosition = MousePosition;
Itowns.control.LayerSwitcher = LayerSwitcher;
Itowns.control.Attributions = Attributions;
Itowns.control.Scale = Scale;
Itowns.control.MiniGlobe = MiniGlobe;
Itowns.GlobeViewExtended = GlobeViewExtended;


export default Gp;
