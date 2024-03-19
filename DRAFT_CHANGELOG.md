# Extension Geoplateforme OpenLayers, version __VERSION__

**__DATE__**
> Release Extension Geoplateforme openlayers

## Summary

Seconde release adaptative à la Géoplateforme : les extensions Geoportail pour OpenLayers deviennent les extensions Géoplateforme pour OpenLayers.
L'ensemble des widgets et fonctionnalités des extensions Géoplateforme pour OpenLayers utilisent les services de la Géoplateforme avec cette release 3.4.0.

## Changelog

* [Added]

* [Changed]

    - Branchement des extensions Géoplateforme pour OpenLayers aux services d'isochrone et d'itineraire de la géoplateforme via la bibliothèque d'accès aux services Géoplateforme en version 3.4.0 (4ca0acec9f8f2ea9b2ef1509448377e31a83c0a8)
    - Branchement des extensions Géoplateforme pour OpenLayers au service altimétrique de la géoplateforme (https://github.com/IGNF/geoportal-extensions/releases/tag/ol-3.4.0-beta4)
    - Ajout possible de couches à accès restreint via une fichier de configuration custom (https://github.com/IGNF/geoportal-extensions/releases/tag/ol-3.4.0-beta3)
    - les widgets utilisent désormais par défaut les services d'autocomplétion et de geocodage direct et inverse de la Geoplateforme (https://github.com/IGNF/geoportal-extensions/releases/tag/ol-3.4.0-beta2)
    - le paramétrage d'un proxy pour utiliser le control d'import de couches est rendu facultatif (6a0c931abf6b26456e84a513453b52941d6fa6f6)
    - Utilisation des services bêta Géoplateforme de diffusion par la classe Config. Le paramètre apiKey devient facultatif pour l'appel à la fonction getConfig : s'il est non spécifié, la configuration de toutes les données est récupérée (https://github.com/IGNF/geoportal-extensions/releases/tag/ol-3.4.0-beta)
    - L'ajout de couches de type "geoportalLayer" est branché sur les services bêta de diffusion de la Géoplateforme 
    - Mise à jour de la documentation pour release Extensions Geoplateforme (49ec092bc17fa6e5667a581cf7d78509614e7940)

* [Deprecated]

* [Removed]

* [Fixed]

    - searchEngine laisse le q= vide si recherche avancée par parcelle cadastrale (2577e30fae3123dfbe0ed3b1aa406ffc5d3702bc)
    - correction du logger en mode verbose sur tous les environnements (636a26a39ac2df5832fd268e26fbf98ed51bd519)
    - searchEngine : affichage plus fin des résultats du service de Geocodage (3174df0d16703988661d785a2fb4f02bcf5ad751)
    - mise à jour des fichiers de style mapbox utilisés par les exemples (f0c95f06d8a06f106373bf9b0b4f7381d20a8b22)
    - divers correctifs sur le build par modules (910430c671c7da8d0f5b420719ed76ee5ec9b58b)

* [Security]

---

# Extension Geoplateforme Leaflet, version __VERSION__

**__DATE__**
> Release Extension Geoplateforme leaflet

## Summary

Seconde release adaptative à la Géoplateforme : les extensions Geoportail pour Leaflet deviennent les extensions Géoplateforme pour Leaflet.
L'ensemble des widgets et fonctionnalités des extensions Géoplateforme pour Leaflet utilisent les services de la Géoplateforme avec cette release 2.4.0.

## Changelog

* [Added]

* [Changed]

    - Branchement des extensions Géoplateforme pour Leaflet aux services d'isochrone et d'itineraire de la géoplateforme via la bibliothèque d'accès aux services Géoplateforme en version 3.4.0 (4ca0acec9f8f2ea9b2ef1509448377e31a83c0a8)
    - Branchement des extensions Géoplateforme pour OpenLayers au service altimétrique de la géoplateforme (https://github.com/IGNF/geoportal-extensions/releases/tag/leaflet-2.4.0-beta4)
    - Ajout possible de couches à accès restreint via une fichier de configuration custom (https://github.com/IGNF/geoportal-extensions/releases/tag/leaflet-2.4.0-beta3)
    - les widgets utilisent désormais par défaut les services d'autocomplétion et de geocodage direct et inverse de la Geoplateforme (https://github.com/IGNF/geoportal-extensions/releases/tag/leaflet-2.4.0-beta2)
    - Utilisation des services bêta Géoplateforme de diffusion par la classe Config. Le paramètre apiKey devient facultatif pour l'appel à la fonction getConfig : s'il est non spécifié, la configuration de toutes les données est récupérée (https://github.com/IGNF/geoportal-extensions/releases/tag/leaflet-2.4.0-beta)
    - L'ajout de couches de type "geoportalLayer" est branché sur les services bêta de diffusion de la Géoplateforme
    - Mise à jour de la documentation pour release Extensions Geoplateforme (49ec092bc17fa6e5667a581cf7d78509614e7940)

* [Deprecated]

* [Removed]

* [Fixed]

    - correction du logger en mode verbose sur tous les environnements (636a26a39ac2df5832fd268e26fbf98ed51bd519)
    - mise à jour des fichiers de style mapbox utilisés par les exemples (f0c95f06d8a06f106373bf9b0b4f7381d20a8b22)
    - divers correctifs sur le build par modules (910430c671c7da8d0f5b420719ed76ee5ec9b58b)

* [Security]

---


# Extension Geoplateforme Itowns, version __VERSION__

**__DATE__**
> Release Extension Geoplateforme itowns

## Summary

Seconde release adaptative à la Géoplateforme : les extensions Geoportail pour iTowns deviennent les extensions Géoplateforme pour iTowns.
L'ensemble des widgets et fonctionnalités des extensions Géoplateforme pour iTowns utilisent les services de la Géoplateforme avec cette release 2.5.0.

## Changelog

* [Added]

* [Changed]

    - Utilisation de la  bibliothèque d'accès aux services Géoplateforme en version 3.4.0 (4ca0acec9f8f2ea9b2ef1509448377e31a83c0a8)
    - Branchement des extensions Géoplateforme pour iTowns au service altimétrique de la géoplateforme (https://github.com/IGNF/geoportal-extensions/releases/tag/itowns-2.5.0-beta4)
    - Ajout possible de couches à accès restreint via une fichier de configuration custom (https://github.com/IGNF/geoportal-extensions/releases/tag/itowns-2.5.0-beta3)
    - les widgets utilisent désormais par défaut les services d'autocomplétion et de geocodage direct et inverse de la Geoplateforme (https://github.com/IGNF/geoportal-extensions/releases/tag/itowns-2.5.0-beta2)
    - Utilisation des services bêta Géoplateforme de diffusion par la classe Config. Le paramètre apiKey devient facultatif pour l'appel à la fonction getConfig : s'il est non spécifié, la configuration de toutes les données est récupérée (https://github.com/IGNF/geoportal-extensions/releases/tag/leaflet-2.5.0-beta)
    - L'ajout de couches de type "geoportalLayer" est branché sur les services bêta de diffusion de la Géoplateforme
    - Mise à jour de la documentation pour release Extensions Geoplateforme (49ec092bc17fa6e5667a581cf7d78509614e7940)

* [Deprecated]

* [Removed]

* [Fixed]

    - BuildingControl : Style tuiles vectorielles "standard.json" utilisé hébergé sur la Geoplateforme (90bb57ae28f559b46bedb8dd694e18cea282ed89)

* [Security]

---
