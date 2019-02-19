# API Reference

The Geoportal Extension for Leaflet provides additionnal javascript functionalities (Coordinate Reference Systems, Layers and Controls) making access to french geoportal webservices more easier when using <a href="http://leafletjs.com/">Leaflet</a> javascript library.

This extension is not standalone and has to be used **together with Leaflet** library. In a web page, you thus have to include both Leaflet and Geoportal Extension resources. For instance :


``` html
<!-- Leaflet -->
<link rel="stylesheet" href="path/to/leaflet.css" />
<script src="path/to/leaflet.js"></script>

<!-- Geoportal Extension for Leaflet -->
<script src="path/to/GpPluginLeaflet.js" data-key="{your-geoportal-access-key}"></script>
<link rel="stylesheet" href="path/to/GpPluginLeaflet.css" />
```

NB : to have complete access to this extension functionnalities, you need to provide your geoportal access key (<a href="http://professionnels.ign.fr/ign/contrats">obtained here</a>) either when loading extension script (using the data-key attribute) or by conditinning their use to the onSuccess callback function of a <a href="http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getConfig">Gp.Services.GetConfig()</a> call with that key. Otherwhise some functionalities may not work as announced.


## Geoportal CRS

Additionnaly to <a href="http://leafletjs.com/reference.html#icrs">built in Leaflet Coordinate Reference Systems (CRS)</a> the Geoportal Extension provides Lambert 93 (EPSG:2154) CRS definition, useful for Lambert 93 WMTS Geoportal Layers display.

| Geoportal CRS | Description |
| - | - |
| {@link L.geoportalCRS.EPSG2154 L.geoportalCRS.EPSG2154} | Lambert 93 (EPSG:2154) CRS. |

The integration of <a href="http://kartena.github.io/Proj4Leaflet/">Proj4Leaflet</a> and <a href="http://proj4js.org/">Proj4js</a> libraries in the Geoportal extension allows developpers to define further CRS if they need.

## Geoportal Layers

Layers provided by the Geoportal Extension are additionnal <a href="http://leafletjs.com/reference.html#tilelayer">Leaflet tiled layers</a> that can be added to an <a href="http://leafletjs.com/reference.html#map-class">Leaflet Map</a> like any other Leaflet layer.

| Geoportal Layer | Description |
| - | - |
| {@link L.geoportalLayer.WMS L.geoportalLayer.WMS}| Provides access to Geoportal or INSPIRE WMS web services. |
| {@link L.geoportalLayer.WMTS L.geoportalLayer.WMTS} | Provides access to Geoportal WMTS web service. |


## Geoportal Controls

Controls provided by the Geoportal Extension are additionnal <a href="http://leafletjs.com/reference.html#control">Leaflet controls</a> that, when added to an <a href="http://leafletjs.com/reference.html#map-class">Leaflet Map</a>, allows user to interact with it.

| Geoportal Control | Description |
| - | - |
| {@link  L.geoportalControl.LayerSwitcher L.geoportalControl.LayerSwitcher} | Allows users to manage layer organisation of the map |
| {@link  L.geoportalControl.MousePosition } | Allows users to know coordinates of the mouse displayed in various Coordinates Reference Systems. It has the additionnal capability of displaying elevation of Mouse Position based on <a href="https://geoservices.ign.fr/documentation/geoservices/alti.html">elevation service of the Geoportal Platform</a>. |
| {@link L.geoportalControl.SearchEngine L.geoportalControl.SearchEngine} | Allows users to search and display locations on a map using <a href="https://geoservices.ign.fr/documentation/geoservices/autocompletion.html">autocompletion service</a> and <a href="https://geoservices.ign.fr/documentation/geoservices/geocodage.html">geocoding service</a> of the Geoportal Platform. |
| {@link L.geoportalControl.ReverseGeocode L.geoportalControl.ReverseGeocode} | Allows users to find locations by clicking on a map using <a href="https://geoservices.ign.fr/documentation/geoservices/geocodage-inverse.html">geocoding service</a> of the Geoportal Platform. |
| {@link L.geoportalControl.Route L.geoportalControl.Route} | Allows users to compute and display routes on a Map using  <a href="https://geoservices.ign.fr/documentation/geoservices/itineraires.html">routing service</a> of the Geoportal Platform. |
| {@link L.geoportalControl.Isocurve L.geoportalControl.Isocurve} | Allows users to compute and display Isochrone or Isodistance curves on a Map using  <a href="https://geoservices.ign.fr/documentation/geoservices/isochrones.html">isochron/isodistance service</a> of the Geoportal Platform. |
| {@link L.geoportalControl.ElevationPath L.geoportalControl.ElevationPath} | Allows users to compute an altimetric profile using <a href="https://geoservices.ign.fr/documentation/geoservices/alti.html">elevation service</a> of the Geoportal Platform. |
