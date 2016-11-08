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
**KO**, [an example ROUTE](Route/amd-default-1.0.0.html)

PB d'accès aux markers. Sinon, semble OK.

## ISOCHRONE
**KO**, [an example ISOCHRONE](Iso/amd-default-1.0.0.html)

PB d'accès aux markers. Sinon, semble OK.

## AUTOCOMPLETION

**KO**, [an example AUTOCOMPLETION](AutoCompletion/amd-default-1.0.0.html)

=> PB d'accès à l'image du marker

## CRS
**ok**, [an example CRS ](CRS/amd-wmts-l93-1.0.0.html),
mais il faut la lib. la version 1.0.0-beta.2 compatible avec Leaflet 1.0.0-RC (Sources à compiler).
