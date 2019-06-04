# Extension Geoportail OpenLayers, version 3.0.0

**01/02/2019 : version 3.0.0**
> Release Extension Geoportail OpenLayers

## Summary

* Migration d'OpenLayers en version 5.3.0
* Nouvelle fonctionnalité avec l'import de couche au format *vecteur tuilé* (MapBox)
* Correctifs suite au passage ES6
* Migration Webpack en version > 4.0.0

[semver] :
    - OpenLayers : increment semver MAJOR version (proj4/sortable/ol5/es6)
    - Leaflet : increment semver MINOR version (proj4/sortable/es6)
    - Itowns : increment semver MINOR version (proj4/sortable/es6)

**Remarques sur les projections**

Les projections chargées par défaut dans les extensions *OpenLayers* sont les suivantes :
 * ['EPSG:4326'],
 * ['EPSG:3785'], ['EPSG:3785'], ['EPSG:900913'], ['EPSG:102113'],
 * ["EPSG:2154"],
 * ["EPSG:27571"], ["EPSG:27572"], ["EPSG:27573"],  ["EPSG:2757"],
 * ["CRS:84"],
 * ["IGNF:LAMB93"],
 * ["IGNF:LAMBE"],
 * ["IGNF:LAMB1"], ["IGNF:LAMB2"], ["IGNF:LAMB3"], ["IGNF:LAMB4"],
 * ["IGNF:RGF93G"],
 * ["IGNF:WGS84G"]

> Les projections sont disponibles dans les variables globales : *proj4()* et *ol.proj.get()*

Il est possible d'étendre la liste via la fonction :
`Gp.olExtended.includeProjections()`

> Les projections sont  disponibles dans la variable globale : *proj4()*

## Changelog

* [Changed]

    - Mise à jour du package *geoportal-access-lib* en version 2.1.2
    - Mise à jour du package *proj4* en version 2.5.0
    - Mise à jour du package *sortable* en version 1.8.4
    - Mise à jour du package *backstopjs* en version 4.0.3

    - Déplacement des CSS dans les sources

    - Mise à jour des licences

    - [dev-workflow] Mise en place du répertoire *build*
    - [dev-workflow] Livraison des sources (via *npm*)
    - [dev-workflow] Modification de la procédure de livraison

* [Added]

    - Nouvelle fonctionnalité sur l'import de couche : le format *vecteur tuilé* (MapBox)
    - Nouveau Widget : *Editeur* de styles pour le *vecteur tuilé*
    - Description plus précise de la variable globale **Gp** dans la jsdoc
    - Fenêtres des widgets *OpenLayers* en mode **draggable**
    - Chargement de *projections* par défaut (cf. Summary)

    - [dev-workflow] Ajout du package *ol-mapbox-style* en version 4.2.1
    - [dev-workflow] Mise en place d'un *CHANGELOG* (historique des modifications)
    - [dev-workflow] Mise en place de *HOWTO* à destination des developpeurs

* [Deprecated]

    - [dev-workflow] Mise en place du protocole *HTTPS* par defaut sur les exemples

* [Removed]

    - [dev-workflow] Suppression du mode de construction des bundles dit *"mixte"*
    (La construction est portée par le projet *geoportal-sdk*)

* [Fixed]

    - [#221](https://github.com/IGNF/geoportal-extensions/issues/221) - Résolution du problème
    d’exécution du plugin *jsdoc* pour *webpack* sur l'environnement Windows
    - [#237](https://github.com/IGNF/geoportal-extensions/pull/237) - Ajout du plugin
    *jsdoc* pour *webpack* en local

    - [#222](https://github.com/IGNF/geoportal-extensions/pull/222) - Ajout du format *vecteur tuilé* (MapBox) sur l'import de couche du widget *OpenLayers*
    - [#223](https://github.com/IGNF/geoportal-extensions/issues/223) - Conflit entre les widgets Route et Iso sur le widget *OpenLayers*
    - [#217](https://github.com/IGNF/geoportal-extensions/issues/217) - Mise à jour d'OpenLayers > 5.3.0
    - [#234](https://github.com/IGNF/geoportal-extensions/issues/234) - Gestion des icônes sur les écrans *Retina* sur les widgets *Leaflet*
    - [#232](https://github.com/IGNF/geoportal-extensions/issues/232) -  **TODO**  Problème de logger en configuration production suite au module *uglifyjs* de *Webpack* 3

    - Test d'existence des projections sur le widget *MousePosition*


* [Security]

    - [dev-workflow] Mise à jour des dependances de dev (faille de sécurité)


---


# Extension Geoportail Itowns, version 2.2.0

    **13/05/2019 : version 2.2.0**
    > Release Extension Geoportail Itowns

## Summary

    * Migration d'Itowns en version 2.8.0
    * Migration Webpack en version > 4.0.0
    * Description plus précise de la variable globale **Gp** dans la jsdoc

## Changelog

* [Changed]

    - Déplacement des CSS dans les sources

    - Mise à jour des licences

    - [dev-workflow] Mise en place du répertoire *build*
    - [dev-workflow] Livraison des sources (via *npm*)
    - [dev-workflow] Modification de la procédure de livraison

* [Added]

    - [dev-workflow] Mise en place d'un *CHANGELOG* (historique des modifications)
    - [dev-workflow] Mise en place de *HOWTO* à destination des developpeurs

* [Removed]

    - [dev-workflow] Suppression du mode de construction des bundles dit *"mixte"*
    (La construction est portée par le projet *geoportal-sdk*)

* [Deprecated]

    - [dev-workflow] Mise en place du protocole *HTTPS* par defaut sur les exemples

* [Security]

    - [dev-workflow] Mise à jour des dependances de dev (faille de sécurité)


---


# Extension Geoportail Leaflet, version 2.2.0

    **13/05/2019 : version 2.2.0**
    > Release Extension Geoportail Leaflet

## Summary

    * Migration Webpack en version > 4.0.0
    * Description plus précise de la variable globale **Gp** dans la jsdoc

## Changelog

* [Changed]

    - Déplacement des CSS dans les sources

    - Mise à jour des licences

    - [dev-workflow] Mise en place du répertoire *build*
    - [dev-workflow] Livraison des sources (via *npm*)
    - [dev-workflow] Modification de la procédure de livraison

* [Added]

    - [dev-workflow] Mise en place d'un *CHANGELOG* (historique des modifications)
    - [dev-workflow] Mise en place de *HOWTO* à destination des developpeurs

* [Deprecated]

    - [dev-workflow] Mise en place du protocole *HTTPS* par defaut sur les exemples

* [Security]

    - [dev-workflow] Mise à jour des dependances de dev (faille de sécurité)
