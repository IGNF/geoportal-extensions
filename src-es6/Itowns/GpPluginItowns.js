import Itowns from "itowns";
import Gp from "gp";
import Utils from "../Common/Utils";
import LayerUtils from "../Common/Utils/LayerUtils";
import MousePosition from "Controls/MousePosition";
import LayerSwitcher from "Controls/LayerSwitcher";
import Attributions from "Controls/Attributions";
import Scale from "Controls/Scale";
import MiniGlobe from "Controls/MiniGlobe";
import GlobeViewExtended from "GlobeViewExtended";



// Adds the extensions properties in the Gp namespace
Gp.LayerUtils = LayerUtils;

// determines the execution environment l'environnement : browser or not ?
var scope = typeof window !== "undefined" ? window : {};

// checks if the var already exists : if not, we create it
var _itowns = Itowns || {};

// creation of the namespace for the itowns extensions
_itowns.control = {};
_itowns.control.MousePosition = MousePosition;
_itowns.control.LayerSwitcher = LayerSwitcher;
_itowns.control.Attributions = Attributions;
_itowns.control.Scale = Scale;
_itowns.control.MiniGlobe = MiniGlobe;
_itowns.GlobeViewExtended = GlobeViewExtended;

// saves in the global variable !
scope.itowns = scope.itowns || {};
Utils.assign(scope.itowns, _itowns);

export default Gp;
