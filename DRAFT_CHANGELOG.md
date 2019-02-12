# Extension Geoportail OpenLayers, version 3.0.0

**01/02/2019 : version 3.0.0**
> Release Extension Geoportail OpenLayers

## Summary

* Migration d'OpenLayers en version 5.3.0
* Nouvelle fonctionnalité avec l'import de couche au format *vecteur tuilé* (MapBox)

## Changelog

* [Changed]

    - Mise à jour du package *geoportal-access-lib* en version 2.1.1
    - Mise à jour du package *proj4* en version 2.5.0

* [Added]

    - [#222](https://github.com/IGNF/geoportal-extensions/pull/222) - Ajout de l'import de couche au format *vecteur tuilé* (MapBox)
    - Description de la variable globale **Gp** dans la jsdoc

* [Deprecated]

    - Executer les exemples sur un serveur en HTTPS
    
* [Removed]

    - Suppression du mode dit *"mixte"* (cad bundle complet avec Itowns et OpenLayers)

* [Fixed]

    - [#223](https://github.com/IGNF/geoportal-extensions/issues/223) - Conflit entre les widgets Route et Iso
    - [#217](https://github.com/IGNF/geoportal-extensions/issues/217) - Mise à jour d'OpenLayers

* [Security]

    - **TODO** Mise à jour des dependances de dev (faille de sécurité)
