# TEST DE COMPATIBILITE DES EXTENSIONS LEAFLET EN VERSION 1.0.1 (30/09/2016)

Les tests sont effectués en mode AMD uniquement.
Les exemples sont suffixés de la version de leaflet :
  ex. amd-wms-1.0.0.html

## WMS
**ok**, [an example WMS](WMS/amd-wms-1.0.0.html)

## WMTS
**ok**, [an example WMTS](WMTS/amd-wmts-1.0.0.html)

## LAYERSWITCHER
**ok ?**, [an example LAYERSWITCHER](LayerSwitcher/amd-default-1.0.0.html)

## MOUSEPOSITION
**ok**, [an example MOUSEPOSITION](MousePosition/amd-default-1.0.0.html)

Pour des reprojections de coordonnées, il n'est pas necessaire de prendre la lib. 1.0.0-beta.2 compatible avec Leaflet 1.0.0-RC.

## SEARCHENGINE
**ok**, [an example SEARCHENGINE](SearchEngine/amd-default-1.0.0.html)

## ROUTE
**ok**, [an example ROUTE](Route/amd-default-1.0.0.html)

## ISOCHRONE
**ok**, [an example ISOCHRONE](Iso/amd-default-1.0.0.html)

## REVERSE
**ok**, [an example REVERSE](Reverse/amd-default-1.0.0.html)

## ELEVATIONPATH
**ok**, [an example ELEVATIONPATH](ElevationPath/amd-default-1.0.0.html)

Avec test du plugin Leaflet.Draw en version last release 0.4.10

## AUTOCOMPLETION
**ok**, [an example AUTOCOMPLETION](AutoCompletion/amd-default-1.0.0.html)

## CRS
**ok**, [an example CRS ](CRS/amd-wmts-l93-1.0.0.html),

mais il faut gerer les versions compatibles avec Leaflet

|leaflet      |proj4leaflet   |
|---          |---            |
|0.7.x        | 0.7.x         |
|1.0.0-beta.X | 1.0.0-beta.X  |
|1.0.1        | 1.0.0 - 1.0.1 |
|1.0.2        | 1.0.0 - 1.0.1 |
|1.0.3        | 1.0.0 - 1.0.1 | ! version embarqée dans le bundle !
|1.1.0        | 1.0.1         | 
