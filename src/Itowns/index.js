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
* > Config:  (...)
*
* > ColorUtils: (...)
* > LayerUtils: (...)
* > MathUtils: (...)
* > ProxyUtils: (...)
*
* > itownsExtended: (...)
*
* > itownsExtVersion: "YYYY-MM-DD"
* > itownsExtVersion: "X.X.X"
*
* > Error: (...)
* > Helper: (...)
* > Protocols: (...)
* > Services: (...)
* > servicesDate: "YYYY-MM-DD"
* > servicesVersion: "X.X.X"
*
* The following variables are aslo global :
*   - proj4,
*   - itowns
*/

import Pkg from "../../package.json";

// CSS communes aux extensions !
import "../Common/Styles";
import "./Styles";

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

export {
    /** Services
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Services.html|geoportal-access-lib}
    */
    Services,
    /** Error
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/Gp.Error.html|geoportal-access-lib}
    */
    Error,
    /** Helper
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Helper.html|geoportal-access-lib}
    */
    Helper,
    /** Protocols
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-XHR.html|geoportal-access-lib}
    */
    Protocols,
    /** servicesDate
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Gp.html|geoportal-access-lib}
    */
    servicesDate,
    /** servicesVersion
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Gp.html|geoportal-access-lib}
    */
    servicesVersion
};

// Adds the extensions properties in the namespace
export { default as LayerUtils } from "../Common/Utils/LayerUtils";
export { default as ProxyUtils } from "../Common/Utils/ProxyUtils";
export { default as ColorUtils } from "../Common/Utils/ColorUtils";
export { default as MathUtils } from "../Common/Utils/MathUtils";

function deepCopy (source, target) {
    // Implementing Tail Call Elimination
    function tce (source, target) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (!target.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                } else if (typeof source[prop] === "object") {
                    tce(source[prop], target[prop]);
                }
            }
        }
    }
    return tce(source, target);
}

// Adds extensions properties in the namespace
/** Version */
export const itownsExtVersion = Pkg.itownsExtVersion;
/** Publication date */
export const itownsExtDate = Pkg.date;

// creation of the namespace for the itowns extensions
var Itowns = {};
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

export {
    /** Expose extensions extended */
    Itowns as itownsExtended
};

// Expose extensions extended into itowns
if (window.itowns) {
    // on fusionne les fonctionnalités o
    deepCopy(Itowns, window.itowns);
    deepCopy(window.itowns, Itowns);
}
