import * as Itowns from "itowns";
import MousePosition from "./Controls/MousePosition";
import LayerSwitcher from "./Controls/LayerSwitcher";
import Attributions from "./Controls/Attributions";
import Scale from "./Controls/Scale";
import MiniGlobe from "./Controls/MiniGlobe";
import GlobeViewExtended from "./GlobeViewExtended";
import "./CSS";
import "../Common/Utils/AutoLoadConfig";
import Pkg from "../../package";

/**
 * The Geoportal extension for Itowns module.
 * In browser mode a global variable named 'Gp' which contains every module exports is exposed.
 * @module ItownsExtension
 */

/**
 * This module wrap the geoportal access library and exports all its exported symbols.
 * See [Geoportal access library module]{@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/}
 * @name *
 * @static
 */
export * from "gp";

/** Itowns extension version */
export const itownsExtVersion = Pkg.itownsExtVersion;

/** Itowns extension creation date */
export const itownsExtDate = new Date().toISOString().split("T")[0];

export {
    /** Layers utils set */
    default as LayerUtils
} from "../Common/Utils/LayerUtils";


// creation of the namespace for the itowns extensions
Itowns.control = {};
Itowns.control.MousePosition = MousePosition;
Itowns.control.LayerSwitcher = LayerSwitcher;
Itowns.control.Attributions = Attributions;
Itowns.control.Scale = Scale;
Itowns.control.MiniGlobe = MiniGlobe;
Itowns.GlobeViewExtended = GlobeViewExtended;

export {
    /**
     * Extended itowns library
     */
    Itowns as itownsExtended
};
