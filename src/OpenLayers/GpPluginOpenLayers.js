import Ol from "ol";
import GfiUtils from "./GfiUtils";
import Utils from "../Common/Utils";
import KML from "./Formats/KML";
import WMTS from "./Sources/WMTS";
import CRS from "./CRS/CRS";
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
import LayerImport from "./Controls/LayerImport";
import GeoportalAttribution from "./Controls/GeoportalAttribution";
import Markers from "./Controls/Utils/Markers";
import ElevationPath from "./Controls/ElevationPath";
import MeasureLength from "./Controls/Measures/MeasureLength";
import MeasureArea from "./Controls/Measures/MeasureArea";
import MeasureAzimuth from "./Controls/Measures/MeasureAzimuth";
import "./CSS";
import "../Common/Utils/AutoLoadConfig";
import Pkg from "../../package";

export * from "gp";

// Rajout des propriétés de l'extension dans le namespace Gp
export const olExtVersion = Pkg.olExtVersion;
export const olExtDate = new Date().toISOString().split("T")[0];
export {default as olUtils} from "../Common/Utils";

// Classes utilitaires
export {default as LayerUtils} from "../Common/Utils/LayerUtils";
export {default as ProxyUtils} from "../Common/Utils/ProxyUtils";

Ol.gp = {};
Ol.gp.GfiUtils = GfiUtils;

// FIXME overload or not ? name Gp.format.kml ?
Ol.format.KMLExtended = KML;
Ol.source.WMTSExtended = WMTS;

// Surcharge sur les functions Ol/proj4 par défaut
CRS.overload();

// Rajout des propriétés dans le namespace Ol
Ol.source.GeoportalWMTS = SourceWMTS;
Ol.source.GeoportalWMS = SourceWMS;
Ol.layer.GeoportalWMTS = LayerWMTS;
Ol.layer.GeoportalWMS = LayerWMS;
Ol.control.GeoportalAttribution = GeoportalAttribution;
Ol.control.LayerSwitcher = LayerSwitcher;
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
// export default markers definitions
Ol.control.DefaultMarkers = Markers;
Ol.control.ElevationPath = ElevationPath;

export {Ol as olExtended};
