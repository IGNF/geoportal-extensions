# Geoportal Extension for OpenLayers3 API Reference

The Geoportal Extension for OpenLayers 3 provides additionnal javascript functionalities (Sources, Layers and Controls) making access to french geoportal webservices easier when using <a href="http://openlayers.org/">OpenLayers 3</a> javascript library.

This extension is not standalone and has to be used **together with OpenLayers 3** library. In a web page, you thus have to include both OpenLayers and Geoportal Extension resources. For instance :


``` html
<!-- OpenLayers 3 -->
<link rel="stylesheet" href="path/to/ol3/ol.css" />
<script src="path/to/ol3/ol.js"></script>

<!-- Geoportal Extension for OpenLayers 3 -->
<script src="path/to/GpPluginOl3.js" data-key="{your-geoportal-access-key}"></script>
<link rel="stylesheet" href="path/to/GpPluginOl3.css" />
```

NB : to have complete access to this extension functionnalities, you need to provide your geoportal access key (<a href="http://professionnels.ign.fr/ign/contrats" target="_blank">obtained here</a>) either when loading extension script (using the data-key attribute) or by conditinning their use to the onSuccess callback function of a <a href="http://ignf.github.io/geoportal-access-lib/v1.0.0-beta.2/jsdoc/module-Services.html#~getConfig" target="_blank">Gp.Services.GetConfig()</a> call with that key. Otherwhise some functionalities may not work as announced.


<a id="sources"></a>

## Geoportal Sources

Sources provided by the Geoportal Extension are additionnal <a href="http://openlayers.org/en/latest/apidoc/ol.source.html" target="_blank">OpenLayers 3 Sources</a> that give simple access to Geoportal data that can then be used to feed <a href="http://openlayers.org/en/latest/apidoc/ol.layer.html" target="_blank">OpenLayers 3 layers</a>.


| Geoportal Source | Description |
| - | - |
| {@link ol.source.GeoportalWMS ol.source.GeoportalWMS} | Provides access to Geoportal or INSPIRE WMS web services. |
| {@link ol.source.GeoportalWMTS ol.source.GeoportalWMTS} | Provides access to Geoportal WMTS web service. |


## Geoportal Layers

Layers provided by the Geoportal Extension are additionnal <a href="http://openlayers.org/en/latest/apidoc/ol.layer.html" target="_blank">OpenLayers 3 layers</a> already connected to previous [Geoportal Extension sources](#sources) that can be added to an <a href="http://openlayers.org/en/latest/apidoc/ol.Map.html" target="_blank">OpenLayers Map</a> like any other OpenLayers 3 layer.

| Geoportal Layer | Description |
| - | - |
| {@link ol.layer.GeoportalWMS ol.layer.GeoportalWMS} | Provides access to Geoportal or INSPIRE WMS web services. |
| {@link ol.layer.GeoportalWMTS ol.layer.GeoportalWMTS} | Provides access to Geoportal WMTS web service. |


## Geoportal Controls

Controls provided by the Geoportal Extension are additionnal <a href="http://openlayers.org/en/latest/apidoc/ol.control.html" target="_blank">OpenLayers 3 controls</a> that, when added to an <a href="http://openlayers.org/en/latest/apidoc/ol.Map.html" target="_blank">OpenLayers Map</a>, allows user to interact with it.

| Geoportal Control | Description |
| - | - |
| {@link ol.control.GeoportalAttribution ol.control.GeoportalAttribution} | Is a substitute for <a href="http://openlayers.org/en/latest/apidoc/ol.control.Attribution.html" target="_blank">built in ol.control.Attribution</a>. It has the additionnal capability of handling geoportal dynamic attributions depending on zoom level and positionning of the map. |
| {@link ol.control.LayerSwitcher ol.control.LayerSwitcher} | Allows users to manage layer organisation of the map |
| {@link ol.control.GeoportalMousePosition ol.control.GeoportalMousePosition} | Is a substitute for <a href="http://openlayers.org/en/latest/apidoc/ol.control.MousePosition.html" target="_blank">built in ol.control.MousePosition</a>. It has the additionnal capability of displaying elevation of Mouse Position based on <a href="https://geoservices.ign.fr/documentation/geoservices/alti.html" target="_blank">elevation service of the Geoportal Platform</a>. |
| {@link ol.control.SearchEngine ol.control.SearchEngine} | Allows users to search and display locations on a map using <a href="https://geoservices.ign.fr/documentation/geoservices/autocompletion.html" target="_blank">autocompletion service</a> and <a href="https://geoservices.ign.fr/documentation/geoservices/geocodage.html" target="_blank">geocoding service</a> of the Geoportal Platform. |
| {@link ol.control.ReverseGeocode ol.control.ReverseGeocode} | Allows users to find locations by clicking on a map using <a href="https://geoservices.ign.fr/documentation/geoservices/geocodage-inverse.html" target="_blank">geocoding service</a> of the Geoportal Platform. |
| {@link ol.control.Route ol.control.Route} | Allows users to compute and display routes on a Map using  <a href="https://geoservices.ign.fr/documentation/geoservices/itineraires.html" target="_blank">routing service</a> of the Geoportal Platform. |
| {@link ol.control.Isocurve ol.control.Isocurve} | Allows users to compute and display Isochrone or Isodistance curves on a Map using  <a href="https://geoservices.ign.fr/documentation/geoservices/isochrones.html" target="_blank">isochron/isodistance service</a> of the Geoportal Platform. |
| {@link ol.control.Drawing ol.control.Drawing} | Provides tools to users for making and saving annotations on a map. |
| {@link ol.control.LayerImport ol.control.LayerImport} | Provides tools to users for their own geographical data on a map. |
| {@link ol.control.MeasureArea ol.control.MeasureArea} | Allows users to compute an area measure.
| {@link ol.control.MeasureLength ol.control.MeasureLength} | Allows users to compute a length measure. |
| {@link ol.control.MeasureAzimuth ol.control.MeasureAzimuth} | Allows users to compute an azimuth measure. |
| {@link ol.control.ElevationPath ol.control.ElevationPath} | Allows users to compute an altimetric profile using <a href="https://geoservices.ign.fr/documentation/geoservices/alti.html" target="_blank">elevation service</a> of the Geoportal Platform. |
