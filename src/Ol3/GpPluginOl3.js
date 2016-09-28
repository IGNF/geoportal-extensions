define([
    "ol",
    "gp",
    "Common/Utils/LayerUtils",
    "Common/Utils/Register",
    "Ol3/Formats/KML",
    "Ol3/CRS/CRS",
    "Ol3/Layers/SourceWMTS",
    "Ol3/Layers/SourceWMS",
    "Ol3/Layers/LayerWMTS",
    "Ol3/Layers/LayerWMS",
    "Ol3/Controls/LayerSwitcher",
    "Ol3/Controls/SearchEngine",
    "Ol3/Controls/MousePosition",
    "Ol3/Controls/Drawing",
    "Ol3/Controls/Route",
    "Ol3/Controls/Isocurve",
    "Ol3/Controls/ReverseGeocode",
    "Ol3/Controls/LayerImport",
    "Ol3/Controls/GeoportalAttribution",
    "Ol3/Controls/Measures/MeasureLength",
    "Ol3/Controls/Measures/MeasureArea",
    "Ol3/Controls/Measures/MeasureAzimuth"
], function (
    ol,
    Gp,
    LayerUtils,
    Register,
    KML,
    CRS,
    SourceWMTS,
    SourceWMS,
    LayerWMTS,
    LayerWMS,
    LayerSwitcher,
    SearchEngine,
    MousePosition,
    Drawing,
    Route,
    Isocurve,
    ReverseGeocode,
    LayerImport,
    GeoportalAttribution,
    MeasureLength,
    MeasureArea,
    MeasureAzimuth
) {

    "use strict";

    // Rajout des propriétés de l'extension dans le namespace Gp
    Gp.ol3extVersion = "__GPOL3EXTVERSION__" ;
    Gp.ol3extDate = "__GPDATE__";

    // Classes utilitaires
    Gp.LayerUtils = LayerUtils;

    // FIXME overload or not ? name Gp.format.kml ?
    ol.format.KMLExtended = KML;

    // Surcharge sur les functions ol/proj4 par défaut
    CRS.overload();

    // Rajout des propriétés ol3 dans le namespace ol
    ol.source.GeoportalWMTS = SourceWMTS;
    ol.source.GeoportalWMS = SourceWMS;
    ol.layer.GeoportalWMTS = LayerWMTS;
    ol.layer.GeoportalWMS = LayerWMS;
    ol.control.GeoportalAttribution = GeoportalAttribution;
    ol.control.LayerSwitcher = LayerSwitcher;
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

    // FIXME : parce qu'il faut bien retourner quelque chose
    return Gp;
});
