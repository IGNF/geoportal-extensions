# Extension Geoportail OpenLayers, version 3.0.0

**01/02/2019 : version 3.0.0**
> Release Extension Geoportail OpenLayers

## Summary

* Migration d'OpenLayers en version 5.3.0
* Nouvelle fonctionnalité avec l'import de couche au format *vecteur tuilé* (MapBox)
* Correctifs suite au passage ES6

[semver] :
    - OpenLayers : increment semver MAJOR version (proj4/ol5/es6)
    - Leaflet : increment semver MINOR version (proj4/es6)
    - Itowns : increment semver MINOR version (proj4/es6)

## Changelog

* [Changed]

    - Mise à jour du package *geoportal-access-lib* en version 2.1.1
    - Mise à jour du package *proj4* en version 2.5.0

* [Added]

    - [#222](https://github.com/IGNF/geoportal-extensions/pull/222) - Ajout de l'import de couche au format *vecteur tuilé* (MapBox)
    - Description de la variable globale **Gp** dans la jsdoc

* [Deprecated]

    - protocole HTTPS : ne plus executer les exemples sur un serveur en HTTP !

* [Removed]

    - mode *Mixte* - Suppression du mode de construction des bundles dit *"mixte"*
    (La construction est portée par le projet *geoportal-sdk*)

* [Fixed]

    - [#223](https://github.com/IGNF/geoportal-extensions/issues/223) - Conflit entre les widgets Route et Iso
    - [#217](https://github.com/IGNF/geoportal-extensions/issues/217) - Mise à jour d'OpenLayers

* [Security]

    - **TODO** Mise à jour des dependances de dev (faille de sécurité)
