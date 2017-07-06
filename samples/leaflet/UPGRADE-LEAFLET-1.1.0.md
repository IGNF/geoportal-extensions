# TEST DE COMPATIBILITE DES EXTENSIONS LEAFLET EN VERSION 1.1.0 (05/07/2017)

Les tests sont effectués en mode AMD uniquement.
Les exemples sont suffixés de la version de leaflet :
  ex. amd-wms-1.1.0.html

## WMS
**ok**, [an example WMS](WMS/amd-wms-1.1.0.html)

## WMTS
**ok**, [an example WMTS](WMTS/amd-wmts-1.1.0.html)

## LAYERSWITCHER
**KO**, [an example LAYERSWITCHER](LayerSwitcher/amd-default-1.1.0.html)

Exception (non bloquante) :
```
Control.Layers.js:155 Uncaught TypeError: Cannot read property 'style' of undefined
    at NewClass.expand (Control.Layers.js:155)
    at NewClass._expandIfNotCollapsed (Control.Layers.js:414)
    at NewClass.addTo (Control.Layers.js:114)
    at NewClass.addControl (Control.js:134)
    at a.onSuccess (amd-default.html:229)
    at a.r (GpServices.js:33)
    at Object.build (GpServices.js:35)
    at a.analyzeResponse (GpServices.js:35)
    at a.o (GpServices.js:33)
    at Object.onResponse (GpServices.js:33)
```

## MOUSEPOSITION
**ok**, [an example MOUSEPOSITION](MousePosition/amd-default-1.1.0.html)

Pour des reprojections de coordonnées, il n'est pas necessaire de prendre la lib.
proj4 compatible avec Leaflet.

## SEARCHENGINE
**ok**, [an example SEARCHENGINE](SearchEngine/amd-default-1.1.0.html)

## ROUTE
**ok**, [an example ROUTE](Route/amd-default-1.1.0.html)

## ISOCHRONE
**ok**, [an example ISOCHRONE](Iso/amd-default-1.1.0.html)

## REVERSE
**KO**, [an example REVERSE](Reverse/amd-default-1.1.0.html)

cf. Issue Plugin Leaflet.Draw

## ELEVATIONPATH
**KO**, [an example ELEVATIONPATH](ElevationPath/amd-default-1.1.0.html)

Issue
https://github.com/Leaflet/Leaflet.draw/issues/739

Sur le plugin Leaflet.Draw et Leaflet 1.1.0 !?

Exception :
```
Uncaught TypeError: L.Draw.Tooltip is not a constructor
    at NewClass.addHooks (Draw.Feature.js:61)
    at NewClass.addHooks (Draw.Polyline.js:69)
    at NewClass.enable (Handler.js:23)
    at NewClass.enable (Draw.Feature.js:31)
    at NewClass._activatePolyLineInteraction (ElevationPath.js:479)
    at NewClass._activateMapInteraction (ElevationPath.js:389)
    at NewClass.onShowElevationPathClick (ElevationPath.js:311)
    at HTMLLabelElement.<anonymous> (ElevationPathDOM.js:65)
```

Warning :
```
Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead. Error
    at checkDeprecatedMixinEvents (http://localhost/api-v3-plugins-dev/lib/leaflet/leaflet-src.js:397:47)
```

## AUTOCOMPLETION
**ok**, [an example AUTOCOMPLETION](AutoCompletion/amd-default-1.1.0.html)

## CRS
**ok**, [an example CRS ](CRS/amd-wmts-l93-1.1.0.html),

mais il faut gerer les versions compatibles avec Leaflet

|leaflet      |proj4leaflet   |
|---          |---            |
|0.7.x        | 0.7.x         |
|1.0.3        | 1.0.0 - 1.0.1 |
|1.0.2        | 1.0.0 - 1.0.1 |
|1.0.1        | 1.0.0 - 1.0.1 |
|1.0.0-beta.X | 1.0.0-beta.X  |
|1.1.0        | 1.0.1         | ! version embarqée dans le bundle !
