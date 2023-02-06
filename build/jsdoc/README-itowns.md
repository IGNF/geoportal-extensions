# Geoportal Extension for Itowns API Reference

The Geoportal Extension for Itowns provides additionnal javascript functionalities (Controls) making access to french geoportal webservices easier when using <a href="http://www.itowns-project.org">Itowns</a> javascript library.

This extension is not standalone and has to be used **together with the Itowns** library. In a web page, you thus have to include both Itowns and Geoportal Extension resources. For instance :


``` html
<!-- itowns -->
<script src="path/to/itowns/js/itowns.js"></script>

<!-- Geoportal Extension for Itowns -->
<script src="path/to/GpPluginItowns.js" data-key="{your-geoportal-access-key}"></script>
<link rel="stylesheet" href="path/to/GpPluginItowns.css" />
```

NB : to have complete access to this extension functionnalities, you need to freely provide a geoportal access key among the one available here : <a href="https://geoservices.ign.fr/services-web"></a>. Use it either when loading extension script (using the data-key attribute) or by conditinning their use to the onSuccess callback function of a <a href="http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getConfig">Gp.Services.GetConfig()</a> call with that key. Otherwhise some functionalities may not work as announced.


## Geoportal Controls

Controls provided by the Geoportal Extension added to an <a href="http://www.itowns-project.org/itowns/examples/globe.html">itowns globe</a>, allows user to interact with it.

| Geoportal Control | Description |
| - | - |
| {@link itowns.control.Attributions itowns.control.Attributions} | Control that has the capability of handling dynamic attributions depending on zoom level and positionning of the globe. |
| {@link itowns.control.LayerSwitcher itowns.control.LayerSwitcher} | Allows users to manage layer organisation of the map |
| {@link itowns.control.MousePosition itowns.control.MousePosition} | Control that has the capability of displaying planar position and elevation of Mouse Position based on <a href="https://geoservices.ign.fr/documentation/geoservices/alti.html">elevation service of the Geoportal Platform</a>. |
| {@link itowns.control.MiniGlobe itowns.control.MiniGlobe} | Allows users to add a miniMap to their viewer |
| {@link itowns.control.Scale itowns.control.Scale} | Allows users to add a graphic scalebar control to their viewer |
