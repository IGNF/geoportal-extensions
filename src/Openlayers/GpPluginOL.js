define([
    "ol",
    "gp",
    "Common/Utils/LayerUtils",
    "Common/Utils/Register",
    "Common/Utils/ProxyUtils",
    "Openlayers/GfiUtils",
    "Openlayers/Utils",
    "Openlayers/Formats/KML",
    "Openlayers/Sources/WMTS",
    "Openlayers/CRS/CRS",
    "Openlayers/Layers/SourceWMTS",
    "Openlayers/Layers/SourceWMS",
    "Openlayers/Layers/LayerWMTS",
    "Openlayers/Layers/LayerWMS",
    "Openlayers/Controls/LayerSwitcher",
    "Openlayers/Controls/GetFeatureInfo",
    "Openlayers/Controls/SearchEngine",
    "Openlayers/Controls/MousePosition",
    "Openlayers/Controls/Drawing",
    "Openlayers/Controls/Route",
    "Openlayers/Controls/Isocurve",
    "Openlayers/Controls/ReverseGeocode",
    "Openlayers/Controls/LayerImport",
    "Openlayers/Controls/GeoportalAttribution",
    "Openlayers/Controls/Utils/Markers",
    "Openlayers/Controls/ElevationPath",
    "Openlayers/Controls/Measures/MeasureLength",
    "Openlayers/Controls/Measures/MeasureArea",
    "Openlayers/Controls/Measures/MeasureAzimuth"
], function (
    ol,
    Gp,
    LayerUtils,
    Register,
    ProxyUtils,
    GfiUtils,
    Utils,
    KML,
    WMTS,
    CRS,
    SourceWMTS,
    SourceWMS,
    LayerWMTS,
    LayerWMS,
    LayerSwitcher,
    GetFeatureInfo,
    SearchEngine,
    MousePosition,
    Drawing,
    Route,
    Isocurve,
    ReverseGeocode,
    LayerImport,
    GeoportalAttribution,
    Markers,
    ElevationPath,
    MeasureLength,
    MeasureArea,
    MeasureAzimuth
) {

    "use strict";

    // Rajout des propriétés de l'extension dans le namespace Gp
    Gp.olExtVersion = "__GPOLEXTVERSION__" ;
    Gp.olExtDate = "__GPDATE__";
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
    ol.control.DefaultMarkers = Markers ;
    ol.control.ElevationPath = ElevationPath;

    // FIXME : parce qu'il faut bien retourner quelque chose
    return Gp;
});
