# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- toc -->

- [Extension Geoportail Leaflet, version 0.8.0](#extension-geoportail-leaflet-version-080)
  * [Changelog](#changelog)
- [Extension Geoportail Leaflet, version 0.9.0](#extension-geoportail-leaflet-version-090)
  * [Summary](#summary)
  * [New Features :](#new-features-)
    + [Additional widgets :](#additional-widgets-)
    + [Others features](#others-features)
  * [ChangeLog](#changelog)
- [Extension Geoportail Leaflet, version 0.9.1](#extension-geoportail-leaflet-version-091)
  * [Summary](#summary-1)
- [Extension Geoportail Leaflet, version 1.0.0](#extension-geoportail-leaflet-version-100)
  * [Summary](#summary-2)
  * [Changelog](#changelog-1)
- [Extension Geoportail Leaflet, version 1.1.0](#extension-geoportail-leaflet-version-110)
  * [Summary](#summary-3)
  * [Changelog](#changelog-2)
- [Extension Geoportail Leaflet, version 2.0.1](#extension-geoportail-leaflet-version-201)
  * [Summary](#summary-4)
- [Extension Geoportail Leaflet, version 2.0.2](#extension-geoportail-leaflet-version-202)
  * [Summary](#summary-5)
  * [Changelog](#changelog-3)
- [Extension Géoportail pour Leaflet, version 2.0.3](#extension-geoportail-pour-leaflet-version-203)
- [Summary](#summary-6)
- [Extension Geoportail Leaflet, version 2.1.1](#extension-geoportail-leaflet-version-211)
  * [Summary](#summary-7)
  * [Changelog](#changelog-4)
- [Extension Geoportail Leaflet, version 2.1.2](#extension-geoportail-leaflet-version-212)
  * [Summary](#summary-8)
  * [Changelog](#changelog-5)
- [Extension Geoportail Leaflet, version 2.1.3](#extension-geoportail-leaflet-version-213)
  * [Summary](#summary-9)
  * [Changelog](#changelog-6)
- [Extension Geoportail Leaflet, version 2.1.4](#extension-geoportail-leaflet-version-214)
  * [Summary](#summary-10)
  * [Changelog](#changelog-7)
- [Extension Geoportail Leaflet, version 2.1.5](#extension-geoportail-leaflet-version-215)
  * [Summary](#summary-11)
  * [Changelog](#changelog-8)
- [Extension Geoportail Leaflet, version 2.1.6](#extension-geoportail-leaflet-version-216)
  * [Summary](#summary-12)
  * [Changelog](#changelog-9)
- [Extension Geoportail Leaflet, version 2.1.7](#extension-geoportail-leaflet-version-217)
  * [Summary](#summary-13)
  * [Changelog](#changelog-10)
- [Extension Geoportail Leaflet, version 2.1.8](#extension-geoportail-leaflet-version-218)
  * [Summary](#summary-14)
  * [Changelog](#changelog-11)
- [Extension Geoportail Leaflet, version 2.1.9](#extension-geoportail-leaflet-version-219)
  * [Summary](#summary-15)
  * [Changelog](#changelog-12)
- [Extension Geoportail Leaflet, version 2.1.10](#extension-geoportail-leaflet-version-2110)
  * [Summary](#summary-16)
  * [Changelog](#changelog-13)
- [Extension Geoportail Leaflet, version 2.2.0](#extension-geoportail-leaflet-version-220)
  * [Summary](#summary-17)
  * [Changelog](#changelog-14)
- [Extension Geoportail Leaflet, version 2.2.1](#extension-geoportail-leaflet-version-221)
  * [Summary](#summary-18)
  * [Changelog](#changelog-15)
- [Extension Geoportail Leaflet, version 2.2.2](#extension-geoportail-leaflet-version-222)
  * [Summary](#summary-19)
  * [Changelog](#changelog-16)
- [Extension Geoportail Leaflet, version 2.2.3](#extension-geoportail-leaflet-version-223)
  * [Summary](#summary-20)
  * [Changelog](#changelog-17)

<!-- tocstop -->

---

# Extension Geoportail Leaflet, version 0.8.0

**08/06/2016 : 0.8.0** release of the Geoportal Extension for Leaflet

## Changelog

**Provides** :
- L.geoportalLayer.WMS Layer class
- L.geoportalLayer.WMTS Layer class
- L.geoportalCRS.EPSG2154 CRS definition
- L.geoportalControl.LayerSwitcher control class
- L.geoportalControl.MousePosition control class
- L.geoportalControl.SearchEngine control class
- L.geoportalControl.ReverseSearch control class
- L.geoportalControl.Route control class
- L.geoportalControl.Isocurve control class

**Compatible with** :
- Leaflet v0.7.x
- Leaflet v1.0-RC (experimental) : may not work for all controls

---

# Extension Geoportail Leaflet, version 0.9.0

**04/12/2016 : 0.9.0** release of the Geoportal Extension for Leaflet

## Summary

## New Features :

### Additional widgets :
- [L.geoportalControl.ElevationPath](http://ignf.github.io/geoportal-extensions/leaflet-latest/jsdoc/module-Controls.html#.ElevationPath)

### Others features
- [#63] : configurable zoom function on search engine results
- Mouse Position aware of CRS extents
- [#36] : adding IGNF register to proj4 CRS definitions
- [#65] : adding extra parameter to track extension use

... and several bugfixes

## ChangeLog

- proposer un outil de calcul de profil altimétrique [#64](https://github.com/IGNF/geoportal-extensions/issues/64)
- zoom moteur de recherche
[#63](https://github.com/IGNF/geoportal-extensions/issues/63)
- gestion des emprise des differents systemes de projection pour un affichage dynamique dans le widget mouse position des systems en fonction de l'emprise de la vue.
- Suppression de codes EPSG en doublons
[#38](https://github.com/IGNF/geoportal-extensions/pull/38)
- Feature register proj4
[#37](https://github.com/IGNF/geoportal-extensions/pull/37)
- Rajout des définitions du registre IGNF et enrichissement des définitions EPSG dans les extensions [#36](https://github.com/IGNF/geoportal-extensions/issues/36)
- PB de Compatibilité IE10 (extension OL3 et Leaflet) [#30](https://github.com/IGNF/geoportal-extensions/issues/30)
- Fix ie10 compatibility
[#41](https://github.com/IGNF/geoportal-extensions/pull/41)
- Compatibilité IE10 : calculs d'itinéraires et isochrones non fonctionnels [#40](https://github.com/IGNF/geoportal-extensions/issues/40)
- Compatibilité IE10 : css des widgets Route et Isochrone [#39](https://github.com/IGNF/geoportal-extensions/issues/39)

[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/leaflet-0.8.0...leaflet-0.9.0)

---

# Extension Geoportail Leaflet, version 0.9.1

**17/08/2017 : 0.9.1** release of the Geoportal Extension for Leaflet

## Summary

Leaflet 1.2.0 has been released, so it's the default version of the Geoportal Extension for Leaflet.

This leaflet release fixes non-extendable objects regression of 1.1.0, and the incompatibility between Leaflet 1.1.0 and **Leaflet-Draw** [#739](https://github.com/Leaflet/Leaflet.draw#739).

Posted on 08 August 2017 by Per Liedman

> Leaflet 1.2.0 has just been released. The major reason for this release is to address an unfortunate regression in the 1.1.0 release, causing trouble with several plugins. Traditionally, Leaflet plugins has altered and added
> to Leaflet’s namespace (the L global), something which is no longer allowed after Leaflet was rebuilt on ES6
> modules (an imported module is read-only). To preserve backwards compatibility, we have made aworkaround
> to make the Leaflet namespace and its contents mutable again.


So, you can use the widget *ReverseGeocoding* and *ElevationPath* with this newer release of Leaflet...

---

# Extension Geoportail Leaflet, version 1.0.0

**11/12/2017 : 1.0.0** Release Extension Geoportail Leaflet

## Summary

- Publication de l'extension dans les [dépots NPM](https://www.npmjs.com/package/geoportal-extensions-leaflet)
- Version 1.1.0 de la biblitohèque d'accès
- compilation sous windows
- gestion templatisée des exemples avec handlebarjs
- paramétrer le lieu de départ ou d'arrivé du widget de calcul d'itinéraires

debugs divers ...

## Changelog

- Extension Leaflet Route : paramétrer le lieu de départ ou d'arrivé du widget [\#48](https://github.com/IGNF/geoportal-extensions/issues/48)
- Compilation sous Windows : régression \(path.join\) [\#167](https://github.com/IGNF/geoportal-extensions/issues/167)
- Extension Leaflet LayerSwitcher : Mauvaise interprétation de l'option collapsed... [\#154](https://github.com/IGNF/geoportal-extensions/issues/154)
- Extension Leaflet LayerSwitcher : mauvaise gestion de paramètre de visibilité des couches [\#152](https://github.com/IGNF/geoportal-extensions/issues/152)
- Leaflet et OL3 - SearchBar : décalages dans le positionnement avec l'autcompletion [\#151](https://github.com/IGNF/geoportal-extensions/issues/151)
- L.geoportalControl.Route rechercher uniquement à partir du nom de la commune ou du lieu-dit [\#165](https://github.com/IGNF/geoportal-extensions/issues/165)
- L.geoportalControl.LayerSwitcher option [\#156](https://github.com/IGNF/geoportal-extensions/issues/156)
- Calcul d'Isochrone, pointeur qui ne se place pas au bon endroit [\#144](https://github.com/IGNF/geoportal-extensions/issues/144)
- Extension Leaflet Layer : Provide custom serviceUrl [\#142](https://github.com/IGNF/geoportal-extensions/issues/142)
- Dependance à geoportal-access-lib depuis NPM [\#128](https://github.com/IGNF/geoportal-extensions/issues/128)
- Compilation sous windows [\#119](https://github.com/IGNF/geoportal-extensions/issues/119)
- Upgrade Geoportal access lib to 1.1 [\#178](https://github.com/IGNF/geoportal-extensions/pull/178) ([gcebelieu](https://github.com/gcebelieu))
- Add npm installation instructions to READMEs [\#177](https://github.com/IGNF/geoportal-extensions/pull/177) ([gcebelieu](https://github.com/gcebelieu))
- Automatisation des publications [\#166](https://github.com/IGNF/geoportal-extensions/pull/166) ([lowzonenose](https://github.com/lowzonenose))
- Feature template samples [\#161](https://github.com/IGNF/geoportal-extensions/pull/161) ([lowzonenose](https://github.com/lowzonenose))
- Feature dependency npm [\#160](https://github.com/IGNF/geoportal-extensions/pull/160) ([lowzonenose](https://github.com/lowzonenose))
- Test de render sur les extensions [\#153](https://github.com/IGNF/geoportal-extensions/pull/153) ([lowzonenose](https://github.com/lowzonenose))

---

# Extension Geoportail Leaflet, version 1.1.0

**09/04/2018 : 1.1.0** Release Extension Geoportail Leaflet

## Summary

- compatibilité avec Leaflet 1.3.0
- version 1.2.0 de la bibliothèque d'accès
- personnalisation et enrichissement des contrôles searchEngine et elevationPath

## Changelog

- [contrôle searchEngine] Ajout d'options pour la personnalisation de l'extension (placeholder/marker) [\#183](https://github.com/IGNF/geoportal-extensions/pull/183)
- [contrôle searchEngine] Mise en place de la navigation avec les touches du clavier sur les résultats de l'autocompletion [\#186](https://github.com/IGNF/geoportal-extensions/pull/186)
- [contrôle elevationPath] Mise en place de champs calculés pour un affichage personnalisé du profil altimétrique [\#188](https://github.com/IGNF/geoportal-extensions/pull/188) [\#158](https://github.com/IGNF/geoportal-extensions/issues/158)
- [contrôle searchEngine] Exécution d'un geocodage si aucun résultat sur l'autocompletion [\#185](https://github.com/IGNF/geoportal-extensions/pull/185) [\#163](https://github.com/IGNF/geoportal-extensions/issues/163)
- Compatibilité de l'extension avec Leaflet 1.3.0 [\#190](https://github.com/IGNF/geoportal-extensions/issues/190)

---

# Extension Geoportail Leaflet, version 2.0.1

**11/04/2018 : 2.0.1** Release Extension Geoportail Leaflet

## Summary

Migration du projet sous [Webpack](http://webpack.github.io/) ainsi que les sources en [ES6 modules](http://exploringjs.com/es6/ch_modules.html).

---

# Extension Geoportail Leaflet, version 2.0.2

**10/08/2018 : 2.0.2** Release Extension Geoportail Leaflet

## Summary

- [Version 2.1.0](https://github.com/IGNF/geoportal-access-lib/releases/tag/v2.1.0) de la bibliothèque d'accès
- Améliorations des configurations Webpack
- Correctifs divers

## Changelog

Correctifs des widgets :
* [#210] Correctifs de l'outil MousePosition : coordonnées sexagésimales tronquées ([#202]), problème d'affichage ([#159]), documentation de l'édition des coordonnées ([#149])

Structure du projet :
* [#207] Modifications syntaxiques (validation ESLint)
* [#211] Factorisation / optimisation des configurations webpack
* Mise en place de la couverture de code
* Ajout d'outils d'analyse (maintenance) : cartographie des sources et dépendances, et ajout du mode source du bundle
* Ajout de la dépendance proj4leaflet

Documentation :
* Mise à jour de la documentation des fichiers README : version des releases, liens d'accès direct

---

# Extension Géoportail pour Leaflet, version 2.0.3

**18/02/2019 : 2.0.3** Release Extension Géoportail pour Leaflet

# Summary

Version 2.0.3 de l'extension Géoportail pour Leaflet :
- #229 Requêtes aux services en HTTPS par défaut, paramétrable avec paramètre "ssl"
- Utilisation de geoportal-access-lib en 2.1.2

---

# Extension Geoportail Leaflet, version 2.1.1

**05/09/2019 : version 2.1.1**
> Release Extension Geoportail Leaflet

## Summary

    * Migration Webpack en version > 4.0.0
    * Description plus précise de la variable globale **Gp** dans la jsdoc

[semver] :
    - Leaflet : increment semver MINOR version (proj4/sortable/es6)

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

---

# Extension Geoportail Leaflet, version 2.1.2

**09/09/2019**
> Release Extension Geoportail Leaflet

## Summary

* Compatibilité des extensions avec le Front End Angular.

## Changelog

* [Changed]

    - maj dependance *geoportal-access-lib* en version 2.1.4

* [Fixed]

    - [#242](https://github.com/IGNF/geoportal-extensions/issues/242) - Compatibilité
    des extensions avec le Front End Angular.

---

# Extension Geoportail Leaflet, version 2.1.3

**24/09/2019**
> Release Extension Geoportail Leaflet

## Summary

* maj dependance

## Changelog

* [Changed]

    - maj dependance *geoportal-access-lib* en version 2.1.5

* [Fixed]

    - [dev-workflow] correctifs sur les fichiers Webpack
    - [#243](https://github.com/IGNF/geoportal-extensions/issues/243) - gestion de l'import CSS du plugin 'leaflet-draw' en mode module ES6 sous Angular

---

# Extension Geoportail Leaflet, version 2.1.4

**24/09/2019**
> Release Extension Geoportail Leaflet

## Summary

* correctif sur l'utilisation des extensions dans Angular
* mise à jour de leaflet : version 1.5.1
* mise à jour de leaflet-draw : version 1.0.4

## Changelog

* [Fixed]

    - [#236](https://github.com/IGNF/geoportal-extensions/issues/236) - Upgrade de leaflet
    - [dev-workflow] correctifs sur les fichiers Webpack
    - [dev-workflow] correctifs sur le script de publication
    - [#243](https://github.com/IGNF/geoportal-extensions/issues/243) - gestion de l'import CSS en mode module ES6 sous Angular

---

# Extension Geoportail Leaflet, version 2.1.5

**16/10/2019**
> Release Extension Geoportail Leaflet

## Summary

* mise à jour *geoportal-access-lib* en version 2.1.6

## Changelog

* [Fixed]

    - [#247](https://github.com/IGNF/geoportal-extensions/issues/247) - opacité sur une couche de type GeoJSON dans le gestionnaire de couche.

---

# Extension Geoportail Leaflet, version 2.1.6

**01/07/2020**
> Release Extension Geoportail Leaflet

## Summary

Mise à jour des dépendances (#263) et correctifs mineurs

## Changelog

* [Added]

    - ajout de la commande : npm run eslint (#263)
    - ajout d'un guide sur les bonnes pratiques de dev (0e396cce78ccbcb0691f9a4f2f73cd7a43d57b5f)

* [Removed]

    - suppression des tests en mode console (#263)
    - suppression de la couverture du code (#263)

---
# Extension Geoportail Leaflet, version 2.1.7

**09/12/2020**
> Release Extension Geoportail Leaflet

## Summary

Mise à jour de Leaflet en version 1.7.1

## Changelog

* [Added]

* [Changed]

    - leaflet en version 1.7.1
    - mise à jour de la documentation (5c189f7ef6de22e398ca7426d84abb751f049717)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail Leaflet, version 2.1.8

**12/02/2021**
> Release Extension Geoportail Leaflet

## Summary

Nouveau widget de profil altimétrique par défaut, et correctif mineur

## Changelog

* [Added]

* [Changed]

        - nouvel affichage du profil altimétrique par défaut (DISPLAY_PROFILE_BY_DEFAULT)

* [Deprecated]

* [Removed]

* [Fixed]

        - correctif sur l'export de la version en mode module

* [Security]

---
# Extension Geoportail Leaflet, version 2.1.9

**26/04/2021**
> Release Extension Geoportail leaflet

## Summary

* gestion des loggers : 
> Exposition de la classe statique *Logger* avec les méthodes suivantes :
`Gp.Logger.disableAll()` et `Gp.Logger.enableAll()`

## Changelog

* [Added]

* [Changed]

    - mise à jour de la lib. geoportal-access-lib : 2.1.8

* [Deprecated]

* [Removed]

    - la dépendance *request* est supprimée, et remplacée par *node-fetch*

* [Fixed]

    - Possibilité de activer / desactiver les loggers des API lors de l'utilisation des API en module ES6 :

    ```js
    import { Logger } from "geoportal-extensions-leaflet";
    Logger.disableAll();
    ```
    
    - corrections des erreurs à partir de DeepScan (#288)
    - corrections syntaxiques eslint (da275a2 et 306506a)
    - cf. issue : Erreur compilation par webpack [#294](https://github.com/IGNF/geoportal-extensions/issues/294)
    - cf. issue : Erreur dépendances à la compilation [#283](https://github.com/IGNF/geoportal-extensions/issues/283)

* [Security]

---
# Extension Geoportail Leaflet, version 2.1.10

**16/06/2021**
> Release Extension Geoportail leaflet

## Summary

Reparation du profil altimétrique

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Correction et réparation du profil altimétrique de Leaflet (#297)

* [Security]

---
# Extension Geoportail Leaflet, version 2.2.0

**04/11/2021**
> Release Extension Geoportail leaflet

## Summary

 =Mise à jour access-lib pour utilisation de l'itinéraire v2

## Changelog

* [Added]

* [Changed]

    - utilisation de l'itinéraire V2 via geoportal-access-lib 3.0.1 (#312)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail Leaflet, version 2.2.1

**03/12/2021**
> Release Extension Geoportail leaflet

## Summary

Utilisation de plusieurs clefs

## Changelog

* [Added]

* [Changed]

    -  possibilité d'utiliser une liste de clés dans le tag data-key : <script src="../../../dist/openlayers/GpPluginOpenLayers-src.js" data-key="cartes,administratif,jhyvi0fgmnuxvfv0zjzorvdn"></script>

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail Leaflet, version 2.2.2

**13/01/2022**
> Release Extension Geoportail leaflet

## Summary

Changements mineurs sur les problématiques d'accessibilité

## Changelog

* [Added]

* [Changed]

    - merge feature-accessibilite (#313)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail Leaflet, version 2.2.3

**04/03/2022**
> Release Extension Geoportail leaflet

## Summary

Corrections sur l'interface d'ajout des couches WMS/WMTS

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Correction des paramètres passés aux couches WMTS/WMS (#319)

* [Security]

---
