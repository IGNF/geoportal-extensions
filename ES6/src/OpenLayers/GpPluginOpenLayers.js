import ol from "ol";
import Gp from "gp";
import LayerUtils from "../Common/Utils/LayerUtils";
import Register from "../Common/Utils/Register";
import ProxyUtils from "../Common/Utils/ProxyUtils";
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

// FIXME suprimer les réf. à ol3 !

// Rajout des propriétés de l'extension dans le namespace Gp
Gp.ol3extVersion = "__GPOL3EXTVERSION__";
Gp.ol3extDate = "__GPDATE__";
Gp.olUtils = Utils;

// Classes utilitaires
Gp.LayerUtils = LayerUtils;
Gp.ProxyUtils = ProxyUtils;
ol.gp = {};
ol.gp.GfiUtils = GfiUtils;

// FIXME overload or not ? name Gp.format.kml ?
ol.format.KMLExtended = KML;
ol.source.WMTSExtended = WMTS;

// Surcharge sur les functions ol/proj4 par défaut
CRS.overload();

// Rajout des propriétés ol3 dans le namespace ol
ol.source.GeoportalWMTS = SourceWMTS;
ol.source.GeoportalWMS = SourceWMS;
ol.layer.GeoportalWMTS = LayerWMTS;
ol.layer.GeoportalWMS = LayerWMS;
ol.control.GeoportalAttribution = GeoportalAttribution;
ol.control.LayerSwitcher = LayerSwitcher;
ol.control.GetFeatureInfo = GetFeatureInfo;
ol.control.SearchEngine = SearchEngine;
ol.control.Route = Route;
ol.control.Isocurve = Isocurve;
ol.control.GeoportalMousePosition = MousePosition;
ol.control.Drawing = Drawing;
ol.control.ReverseGeocode = ReverseGeocode;
ol.control.LayerImport = LayerImport;
ol.control.MeasureLength = MeasureLength;
ol.control.MeasureArea = MeasureArea;
ol.control.MeasureAzimuth = MeasureAzimuth;
// export default markers definitions
ol.control.DefaultMarkers = Markers;
ol.control.ElevationPath = ElevationPath;

export default Gp;
