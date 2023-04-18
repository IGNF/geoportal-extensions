



# Extension Geoportail OpenLayers, version __VERSION__

**__DATE__**
> Release Extension Geoportail openlayers

## Summary

- Ajout du widget *Export*
- Import des couches de calculs (itineraire, isochrone et profil altimétrique)

## Changelog

* [Added]

    - Widget d'export des tracés et des calculs au format GPX, KML et GeoJSON sur les contôles d'itineraire, d'isochrone et de profil altimétrique :

        ``` js
        // exemple
        var route = new ol.control.Route();
        map.addControl(route);
        var exportRoute = new ol.control.Export({
            control : route,
            format : "GPX"
        });
        map.addControl(exportRoute);
        ```

    - Import des couches de calculs (itineraire, isochrone et profil altimétrique) au format GPX, KML et GeoJSON.

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Fix sur le format KML avec l'affichage des labels

* [Security]

---


# Extension Geoportail Leaflet, version __VERSION__

**__DATE__**
> Release Extension Geoportail leaflet

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---


# Extension Geoportail Itowns, version __VERSION__

**__DATE__**
> Release Extension Geoportail itowns

## Summary

## Changelog

* [Added]

* [Changed]

    - mise à jour du readme pour ajout couche VT (d61ebdd223d1f1516e1877209190b298f18f71d0)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
