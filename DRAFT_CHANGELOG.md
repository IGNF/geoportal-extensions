

# Extension Geoportail OpenLayers, version __VERSION__

**__DATE__**
> Release Extension Geoportail openlayers

## Summary

* fonctionnalités sur l'outil de dessins
* gestion des styles sur les formats GPX et GeoJSON
* gestion des evenements de fin de traitements sur les widgets

## Changelog

* [Added]

    - gestion des geometries de type *Multi* dans l'outil de dessins
    - ajout de l'export au format GPX et GeoJSON dans l'outil de dessins
    - gestion des styles au format GPX et GeoJSON (specification MapBox)
    - ajoute d'evenements et de callback de fin de traitement pour les widgets ElevationPath, Route, IsoCurve, SearchEngine et ReverseGeocode.
    ```js
    // Exemple
    var iso = new ol.control.Isocurve({
        isocurveOptions : {
            // utilisation de la callback du service
            onSuccess : function(e) {
                console.warn("Resultat du calcul", e);
                // {
                //     distance: null
                //     geometry: {type: 'Polygon', coordinates: Array(1)}
                //     id: null
                //     location: {x: '2.8926909677185058', y: '48.76818760957548'}
                //     message: null
                //     srs: "EPSG:4326"
                //     time: "3600"
                // }
            },
            onFailure : function(e) {
                console.warn(e);
            }
        }
    });
    // ou utilisation de l'evenement du widget
    iso.on("isocurve:compute", function (e) {
        // interface : getData()
        console.warn(e.target.getData());
    });
    ```

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

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

    - Correction des paramètres passés aux couches WMTS/WMS (#319) 

* [Security]

---

# Extension Geoportail Itowns, version __VERSION__

**__DATE__**
> Release Extension Geoportail itowns

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
