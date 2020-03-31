**TODO : PREPARATION POUR PROCHAINE LIVRAISON**

# Extension Geoportail OpenLayers, version 3.0.8

**31/03/2020**
> Release Extension Geoportail OpenLayers

## Summary

* correctif sur les widgets
* correctif sur l'éditeur de styles (mapbox)
* fix sur les versions des dépendances (mapbox)

## Changelog

* [Added]

    - gestion des icônes dans l’éditeur MapBox ([\#261](https://github.com/IGNF/geoportal-extensions/pull/261))

* [Changed]

    - mise à jour du plugin de minification : "terser-webpack-plugin" ([\#261](https://github.com/IGNF/geoportal-extensions/pull/261))

* [Deprecated]

* [Removed]

* [Fixed]

    - widget "mouseposition" :
      - fix sur le retrait de la carte
      - correctif sur l'inversion affichage lon/lat

    - fix sur la gestion des evenements du widget "drawing"

    - utilisation de la version "13.11.0" de la dépendance "@mapbox/mapbox-gl-style-spec" ([\#261](https://github.com/IGNF/geoportal-extensions/pull/261))

* [Security]

**BREAKING CHANGES**

> compilation du projet avec une version nodejs > 8.9.0

---

# Extension Geoportail Itowns, version 2.2.8

**26/03/2020**
> Release Extension Geoportail Itowns

## Summary

## Changelog

* [Added]

* [Changed]

    - choix fixé des versions des dépendances dans le package.json

* [Deprecated]

* [Removed]

* [Fixed]

- Retrait d'appels à des fonctions dépréciées d'iTowns
- Fix mauvais affichage du dom du mousePosition itowns
- Fix mouseListeners inactifs sur les controls par encapsulation de la viewerDiv d'iTowns


* [Security]

---

# Extension Geoportail Leaflet, version 2.1.6

**22/11/2019**
> Release Extension Geoportail Leaflet

## Summary

## Changelog

* [Added]

* [Changed]

    - choix fixé des versions des dépendances dans le package.json

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]
