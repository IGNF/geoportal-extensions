import Pkg from "../../package";

import Ol from "ol";
import Olms from "olms";
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

// ordre des CSS communes puis extensions ou l'inverse ?
import "../Common/Styles";
import "./Styles";

// Les autoload...
import "../Common/Utils/AutoLoadConfig";
import "./CRS/AutoLoadCRS";

// Export des services
export * from "geoportal-access-lib";

// Rajout des propriétés de l'extension dans le namespace Gp
export const olExtVersion = Pkg.olExtVersion;
export const olExtDate = new Date().toISOString().split("T")[0];

// Classes utilitaires
export {default as olUtils} from "../Common/Utils";
export {default as LayerUtils} from "../Common/Utils/LayerUtils";
export {default as ProxyUtils} from "../Common/Utils/ProxyUtils";
export {default as ColorUtils} from "../Common/Utils/ColorUtils";
export {default as MathUtils} from "../Common/Utils/MathUtils";

Ol.gp = {};
Ol.gp.GfiUtils = GfiUtils;

// Editeur MapBox
Ol.style = {};
Ol.style.Editor = Editor;
Ol.style.editor = {};
Ol.style.editor.Style = Style;
Ol.style.editor.Filter = Filter;
Ol.style.editor.Layer = Layer;
Ol.style.editor.Legend = Legend;
Ol.style.editor.Group = Group;
Ol.style.editor.Themes = Themes;

// Format Extended
Ol.format.KMLExtended = KML;
Ol.source.WMTSExtended = WMTS;

// Rajout de l'extension olms (ol mapbox style)
Ol.olms = Olms;

// "proj4" is exposed into window (for a build bundle) with webpack.
//      console > proj4("EPSG:2154")
// And, it's useful to expose it too into OpenLayers :
//      console > ol.proj.get("EPSG:2154")
if (window.ol && window.ol.proj && window.ol.proj.proj4) {
    window.ol.proj.proj4.register(Proj4);
}

// Rajout des propriétés dans le namespace Ol
Ol.source.GeoportalWMTS = SourceWMTS;
Ol.source.GeoportalWMS = SourceWMS;
Ol.layer.GeoportalWMTS = LayerWMTS;
Ol.layer.GeoportalWMS = LayerWMS;
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

export {Ol as olExtended};
