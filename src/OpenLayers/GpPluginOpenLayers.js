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
* > olExtended: (...)
* > olUtils: (...)
* > olExtDate: "YYYY-MM-DD"
* > olExtVersion: "X.X.X"
*
* > Error: (...)
* > Helper: (...)
* > Protocols: (...)
* > Services: (...)
* > servicesDate: "YYYY-MM-DD"
* > servicesVersion: "X.X.X"
* > includeProjections()
*
* The following variables are aslo global :
*   - proj4,
*   - ol,
*   - eventbus
*/

import Pkg from "../../package";

import * as Ol from "ol";

// ordre des CSS communes puis extensions
import "../Common/Styles";
import "./Styles";

import GfiUtils from "./GfiUtils";
import KML from "./Formats/KML";
import WMTS from "./Sources/WMTS";
import SourceWMTS from "./Layers/SourceWMTS";
import SourceWMS from "./Layers/SourceWMS";
import LayerWMTS from "./Layers/LayerWMTS";
import LayerWMS from "./Layers/LayerWMS";
import LayerSwitcher from "./Controls/LayerSwitcher";
import GetFeatureInfo from "./Controls/GetFeatureInfo";
import SearchEngine from "./Controls/SearchEngine";
import MousePosition from "./Controls/MousePosition";
import Drawing from "./Controls/Drawing";
import Route from "./Controls/Route";
import Isocurve from "./Controls/Isocurve";
import ReverseGeocode from "./Controls/ReverseGeocode";
import LocationSelector from "./Controls/LocationSelector";
import LayerImport from "./Controls/LayerImport";
import GeoportalAttribution from "./Controls/GeoportalAttribution";
import Markers from "./Controls/Utils/Markers";
import ElevationPath from "./Controls/ElevationPath";
import MeasureLength from "./Controls/Measures/MeasureLength";
import MeasureArea from "./Controls/Measures/MeasureArea";
import MeasureAzimuth from "./Controls/Measures/MeasureAzimuth";

import Proj4 from "proj4";

import Style from "./Controls/Editor/Style";
import Filter from "./Controls/Editor/Filter";
import Layer from "./Controls/Editor/Layer";
import Themes from "./Controls/Editor/Themes";
import Legend from "./Controls/Editor/Legend";
import Group from "./Controls/Editor/Group";
import Editor from "./Controls/Editor";

// Les autoload...
import "../Common/Utils/AutoLoadConfig";
import "./CRS/AutoLoadCRS";

// export des services
import Gp from "geoportal-access-lib";

// import CRS from "./CRS/CRS";

// reconstruction des ns
var Services = Gp.Services;
var Error = Gp.Error;
var Helper = Gp.Helper;
var Protocols = Gp.Protocols;
var servicesDate = Gp.servicesDate;
var servicesVersion = Gp.servicesVersion;

export { Services, Error, Helper, Protocols, servicesDate, servicesVersion };

// TODO
// proposer une fonction de chargement des projections !
// var includeProjections = CRS.load;
// export { includeProjections };

// Rajout des propriétés de l'extension dans le namespace
export const olExtVersion = Pkg.olExtVersion;
export const olExtDate = Pkg.date;

// Classes utilitaires
export {default as olUtils} from "../Common/Utils";
export {default as LayerUtils} from "../Common/Utils/LayerUtils";
export {default as ProxyUtils} from "../Common/Utils/ProxyUtils";
export {default as ColorUtils} from "../Common/Utils/ColorUtils";
export {default as MathUtils} from "../Common/Utils/MathUtils";

// FIXME : utilitaires dans un ns particulier "gp" ?
Ol.gp = {};
Ol.gp.GfiUtils = GfiUtils;

// Editeur MapBox
Ol.style = Ol.style || {};
Ol.style.Editor = Editor;
Ol.style.editor = Ol.style.editor || {};
Ol.style.editor.Style = Style;
Ol.style.editor.Filter = Filter;
Ol.style.editor.Layer = Layer;
Ol.style.editor.Legend = Legend;
Ol.style.editor.Group = Group;
Ol.style.editor.Themes = Themes;

// Rajout des propriétés dans le namespace Ol
Ol.format = Ol.format || {};
Ol.format.KMLExtended = KML;
Ol.source = Ol.source || {};
Ol.source.WMTSExtended = WMTS;
Ol.source.GeoportalWMTS = SourceWMTS;
Ol.source.GeoportalWMS = SourceWMS;
Ol.layer = Ol.layer || {};
Ol.layer.GeoportalWMTS = LayerWMTS;
Ol.layer.GeoportalWMS = LayerWMS;
Ol.control = Ol.control || {};
Ol.control.LayerSwitcher = LayerSwitcher;
Ol.control.GeoportalAttribution = GeoportalAttribution;
Ol.control.GetFeatureInfo = GetFeatureInfo;
Ol.control.SearchEngine = SearchEngine;
Ol.control.Route = Route;
Ol.control.Isocurve = Isocurve;
Ol.control.GeoportalMousePosition = MousePosition;
Ol.control.Drawing = Drawing;
Ol.control.ReverseGeocode = ReverseGeocode;
Ol.control.LayerImport = LayerImport;
Ol.control.MeasureLength = MeasureLength;
Ol.control.MeasureArea = MeasureArea;
Ol.control.MeasureAzimuth = MeasureAzimuth;
Ol.control.DefaultMarkers = Markers;
Ol.control.ElevationPath = ElevationPath;
Ol.control.LocationSelector = LocationSelector;

// Expose extensions openlayers extended into ol (for a build bundle)
// with webpack (loader-expose) and this export !
export { Ol as olExtended };

// "proj4" is exposed into window (for a build bundle) with webpack.
//      console > proj4("EPSG:2154")
// And, it's useful to expose it too into OpenLayers :
//      console > ol.proj.get("EPSG:2154")
if (window.ol && window.ol.proj && window.ol.proj.proj4) {
    try {
        window.ol.proj.proj4.register(Proj4);
    } catch (e) {}
}
