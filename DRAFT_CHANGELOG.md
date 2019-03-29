# Extension Geoportail OpenLayers, version 3.0.0

**01/02/2019 : version 3.0.0**
> Release Extension Geoportail OpenLayers

## Summary

* Migration d'OpenLayers en version 5.3.0
* Nouvelle fonctionnalité avec l'import de couche au format *vecteur tuilé* (MapBox)
* Correctifs suite au passage ES6
* **TODO** Migration Webpack en version 4.0.0

[semver] :
    - OpenLayers : increment semver MAJOR version (proj4/sortable/ol5/es6)
    - Leaflet : increment semver MINOR version (proj4/sortable/es6)
    - Itowns : increment semver MINOR version (proj4/sortable/es6)

## Changelog

* [Changed]

    - Mise à jour du package *geoportal-access-lib* en version 2.1.2
    - Mise à jour du package *proj4* en version 2.5.0
    - Mise à jour du package *sortable* en version 1.8.4
    - Livraison des sources (via *npm*)
    - Modification de la procédure de livraison

* [Added]

    - Ajout du package *ol-mapbox-style* en version 4.2.1

    - [#222](https://github.com/IGNF/geoportal-extensions/pull/222) - Ajout de l'import de couche au format *vecteur tuilé* (**MapBox**) sur le widget *OpenLayers*

    - Nouveau Widget : *Editeur* de styles **MapBox**
    - Description de la variable globale **Gp** dans la jsdoc
    - Fenêtres des widgets *OpenLayers* en mode **draggable**
    - Mise en place d'un *CHANGELOG* (historique des modifications)
    - Mise en place de *HOWTO* à destination des developpeurs

* [Deprecated]

    - Mise en place du protocole HTTPS : ne plus executer les exemples sur un serveur en HTTP !

* [Removed]

    - mode *Mixte* - Suppression du mode de construction des bundles dit *"mixte"*
    (La construction est portée par le projet *geoportal-sdk*)

* [Fixed]

    - [#223](https://github.com/IGNF/geoportal-extensions/issues/223) - Conflit entre les widgets Route et Iso
    - [#217](https://github.com/IGNF/geoportal-extensions/issues/217) - Mise à jour d'OpenLayers
    - **TODO** [#232](https://github.com/IGNF/geoportal-extensions/issues/232) - Problème de logger en configuration production suite au module *uglifyjs* de *Webpack* 3

* [Security]

    - **TODO** Mise à jour des dependances de dev (faille de sécurité)
