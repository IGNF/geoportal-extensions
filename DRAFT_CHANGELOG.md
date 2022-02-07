


# Extension Geoportail OpenLayers, version __VERSION__

**__DATE__**
> Release Extension Geoportail openlayers

## Summary

## Changelog

* [Added]

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

    - Retrait de la limitation d'affichage des reponses de l'autocompletion sur le Widget *SearchEngine* (cf. <https://www.developpez.net/forums/d2125691/applications/sig-systeme-d-information-geographique/ign-api-geoportail/geoportal-extension-searchengine-autocomplete-maximum-5-reponses/#post11811536>)

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
