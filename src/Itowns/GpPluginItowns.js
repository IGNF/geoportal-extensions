import Gp from "gp";
import * as Itowns from "itowns";
import LayerUtils from "../Common/Utils/LayerUtils";
import MousePosition from "./Controls/MousePosition";
import LayerSwitcher from "./Controls/LayerSwitcher";
import Attributions from "./Controls/Attributions";
import Scale from "./Controls/Scale";
import MiniGlobe from "./Controls/MiniGlobe";
import GeoportalWMTS from "./Layer/LayerWMTS";
import GeoportalWMS from "./Layer/LayerWMS";
import GlobeViewExtended from "./GlobeViewExtended";

// Adds the extensions properties in the Gp namespace
Gp.LayerUtils = LayerUtils;

// Adds extensions properties in the Gp namespace
Gp.itownsExtVersion = "__GPITOWNSEXTVERSION__";
Gp.itownsExtDate = "__GPDATE__";

// determines the execution environment l'environnement : browser or not ?
var env = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {};

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
Itowns.GlobeViewExtended = GlobeViewExtended;

// FIXME saves in the global variable !
if (!env.itowns) {
    env.itowns = {};
}

deepCopy(Itowns, env.itowns);

function deepCopy (source, target) {
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            if (!target.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            } else if (typeof source[prop] === "object") {
                deepCopy(source[prop], target[prop]);
            }
        }
    }
}

export default Gp;
