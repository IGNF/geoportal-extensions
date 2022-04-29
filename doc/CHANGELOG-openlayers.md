# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- toc -->

- [Extension Geoportail OpenLayers3, version 0.10.0](#extension-geoportail-openlayers3-version-0100)
  * [Changelog](#changelog)
- [Extension Geoportail OpenLayers3, version 0.11.0](#extension-geoportail-openlayers3-version-0110)
  * [Summary](#summary)
  * [New Features :](#new-features-)
    + [Additional widgets :](#additional-widgets-)
    + [Others features](#others-features)
  * [ChangeLog](#changelog)
- [Extension Geoportail OpenLayers3, version 0.12.0](#extension-geoportail-openlayers3-version-0120)
  * [Summary](#summary-1)
  * [New Features :](#new-features--1)
    + [Additional widgets :](#additional-widgets--1)
    + [Others features](#others-features-1)
    + [Breaking changes](#breaking-changes)
- [Extension Geoportail OpenLayers, version 1.0.0](#extension-geoportail-openlayers-version-100)
  * [Summary](#summary-2)
  * [Changelog](#changelog-1)
- [Extension Geoportail OpenLayers, version 1.1.0](#extension-geoportail-openlayers-version-110)
  * [Summary](#summary-3)
  * [Changelog](#changelog-2)
- [Extension Geoportail OpenLayers, version 2.0.0](#extension-geoportail-openlayers-version-200)
  * [Summary](#summary-4)
- [Extension Geoportail OpenLayers, version 2.1.0](#extension-geoportail-openlayers-version-210)
  * [Summary](#summary-5)
  * [Changelog](#changelog-3)
- [Extension Géoportail OpenLayers, version 2.1.2](#extension-geoportail-openlayers-version-212)
  * [Summary](#summary-6)
- [Extension Geoportail OpenLayers, version 3.0.1](#extension-geoportail-openlayers-version-301)
  * [Summary](#summary-7)
  * [Changelog](#changelog-4)
- [Extension Geoportail OpenLayers, version 3.0.2](#extension-geoportail-openlayers-version-302)
  * [Summary](#summary-8)
  * [Changelog](#changelog-5)
- [Extension Geoportail OpenLayers, version 3.0.3](#extension-geoportail-openlayers-version-303)
  * [Summary](#summary-9)
  * [Changelog](#changelog-6)
- [Extension Geoportail OpenLayers, version 3.0.4](#extension-geoportail-openlayers-version-304)
  * [Summary](#summary-10)
  * [Changelog](#changelog-7)
- [Extension Geoportail OpenLayers, version 3.0.5](#extension-geoportail-openlayers-version-305)
  * [Summary](#summary-11)
  * [Changelog](#changelog-8)
- [Extension Geoportail OpenLayers, version 3.0.6](#extension-geoportail-openlayers-version-306)
  * [Summary](#summary-12)
  * [Changelog](#changelog-9)
- [Extension Geoportail OpenLayers, version 3.0.7](#extension-geoportail-openlayers-version-307)
  * [Summary](#summary-13)
  * [Changelog](#changelog-10)
- [Extension Geoportail OpenLayers, version 3.0.8](#extension-geoportail-openlayers-version-308)
  * [Summary](#summary-14)
  * [Changelog](#changelog-11)
- [Extension Geoportail OpenLayers, version 3.0.9](#extension-geoportail-openlayers-version-309)
  * [Summary](#summary-15)
  * [Changelog](#changelog-12)
- [Extension Geoportail OpenLayers, version 3.0.10](#extension-geoportail-openlayers-version-3010)
  * [Summary](#summary-16)
  * [Changelog](#changelog-13)
- [Extension Geoportail OpenLayers, version 3.0.11](#extension-geoportail-openlayers-version-3011)
  * [Summary](#summary-17)
  * [Changelog](#changelog-14)
- [Extension Geoportail OpenLayers, version 3.0.14](#extension-geoportail-openlayers-version-3014)
  * [Summary](#summary-18)
  * [Changelog](#changelog-15)
- [Extension Geoportail OpenLayers, version 3.0.16](#extension-geoportail-openlayers-version-3016)
  * [Summary](#summary-19)
  * [Changelog](#changelog-16)
- [Extension Geoportail OpenLayers, version 3.0.17](#extension-geoportail-openlayers-version-3017)
  * [Summary](#summary-20)
  * [Changelog](#changelog-17)
- [Extension Geoportail OpenLayers, version 3.0.18](#extension-geoportail-openlayers-version-3018)
  * [Summary](#summary-21)
  * [Changelog](#changelog-18)
- [Extension Geoportail OpenLayers, version 3.0.19](#extension-geoportail-openlayers-version-3019)
  * [Summary](#summary-22)
  * [Changelog](#changelog-19)
- [Extension Geoportail OpenLayers, version 3.1.0](#extension-geoportail-openlayers-version-310)
  * [Summary](#summary-23)
  * [Changelog](#changelog-20)
- [Extension Geoportail OpenLayers, version 3.2.0](#extension-geoportail-openlayers-version-320)
  * [Summary](#summary-24)
  * [Changelog](#changelog-21)
- [Extension Geoportail OpenLayers, version 3.2.1](#extension-geoportail-openlayers-version-321)
  * [Summary](#summary-25)
  * [Changelog](#changelog-22)
- [Extension Geoportail OpenLayers, version 3.2.2](#extension-geoportail-openlayers-version-322)
  * [Summary](#summary-26)
  * [Changelog](#changelog-23)
- [Extension Geoportail OpenLayers, version 3.2.3](#extension-geoportail-openlayers-version-323)
  * [Summary](#summary-27)
  * [Changelog](#changelog-24)
- [Extension Geoportail OpenLayers, version 3.2.4](#extension-geoportail-openlayers-version-324)
  * [Summary](#summary-28)
  * [Changelog](#changelog-25)
- [Extension Geoportail OpenLayers, version 3.2.5](#extension-geoportail-openlayers-version-325)
  * [Summary](#summary-29)
  * [Changelog](#changelog-26)
- [Extension Geoportail OpenLayers, version 3.2.6](#extension-geoportail-openlayers-version-326)
  * [Summary](#summary-30)
  * [Changelog](#changelog-27)
- [Extension Geoportail OpenLayers, version 3.2.7](#extension-geoportail-openlayers-version-327)
  * [Summary](#summary-31)
  * [Changelog](#changelog-28)
- [Extension Geoportail OpenLayers, version 3.2.8](#extension-geoportail-openlayers-version-328)
  * [Summary](#summary-32)
  * [Changelog](#changelog-29)
- [Extension Geoportail OpenLayers, version 3.2.9](#extension-geoportail-openlayers-version-329)
  * [Summary](#summary-33)
  * [Changelog](#changelog-30)
- [Extension Geoportail OpenLayers, version 3.2.10](#extension-geoportail-openlayers-version-3210)
  * [Summary](#summary-34)
  * [Changelog](#changelog-31)
- [Extension Geoportail OpenLayers, version 3.2.11](#extension-geoportail-openlayers-version-3211)
  * [Summary](#summary-35)
  * [Changelog](#changelog-32)
- [Extension Geoportail OpenLayers, version 3.2.12](#extension-geoportail-openlayers-version-3212)
  * [Summary](#summary-36)
  * [Changelog](#changelog-33)

<!-- tocstop -->

---

# Extension Geoportail OpenLayers3, version 0.10.0

**08/06/2016 : 0.10.0** release of the Geoportal Extension for OL3

## Changelog

**Provides** :
- ol.layer.GeoportalWMS layer class
- ol.layer.GeoportalWMS layer class
- ol.source.GeoportalWMS source class
- ol.source.GeoportalWMS source class
- ol.control.LayerSwitcher control class
- ol.control.GeoportalMousePosition control class
- ol.control.SearchEngine control class
- ol.control.ReverseSearch control class
- ol.control.Route control class
- ol.control.Isocurve control class
- ol.control.GeoportalAttribution control class
- ol.control.Drawing control class

**Compatible with** :
- OpenLayers v3.14+ releases
- not yet tested with previous OpenLayers 3 releases (TODO)

---

# Extension Geoportail OpenLayers3, version 0.11.0

**04/12/2016 : 0.11.0** release of the Geoportal Extension for OL3

## Summary

## New Features :

### Additional widgets :
- [ol.control.LayerImport](http://ignf.github.io/geoportal-extensions/ol3-latest/jsdoc/ol.control.LayerImport.html)
- [ol.control.MeasureArea](http://ignf.github.io/geoportal-extensions/ol3-latest/jsdoc/ol.control.MeasureArea.html)
- [ol.control.MeasureLength](http://ignf.github.io/geoportal-extensions/ol3-latest/jsdoc/ol.control.MeasureLength.html)
- [ol.control.MeasureAzimuth](http://ignf.github.io/geoportal-extensions/ol3-latest/jsdoc/ol.control.MeasureAzimuth.html)
- [ol.control.ElevationPath](http://ignf.github.io/geoportal-extensions/ol3-latest/jsdoc/ol.control.ElevationPath.html)

### Others features
- [#78] : configurable zoom function on search engine results
- Mouse Position aware of CRS extents
- [#36] : adding IGNF register to proj4 CRS definitions
- [#65] : adding extra parameter to track extension use

... and several bugfixes

## ChangeLog
- proposer un outil de calcul de profil altimétrique [#64](https://github.com/IGNF/geoportal-extensions/issues/64)
- zoom moteur de recherche
[#78](https://github.com/IGNF/geoportal-extensions/issues/78)
- gestion des emprise des differents systemes de projection pour un affichage dynamique dans le widget mouse position des systems en fonction de l'emprise de la vue.
- fix [#76] : ol.control.layerimport - define default styles for KML and GPX imports [#79](https://github.com/IGNF/geoportal-extensions/pull/79)
- fix [#61] : ol.control.LayerImport - display WMS enclosed child layers [#62](https://github.com/IGNF/geoportal-extensions/pull/62)
- fix [#52] : ol.control.LayerImport : extent mal récupérée pour les couches en EPSG:4326 [#60](https://github.com/IGNF/geoportal-extensions/pull/60)
- proposer un outil de mesure de surface
[#57](https://github.com/IGNF/geoportal-extensions/issues/57)
- proposer un outil de mesure de distance
[#56](https://github.com/IGNF/geoportal-extensions/issues/56)
- proposer un outil de mesure d'azimuth
[#55](https://github.com/IGNF/geoportal-extensions/issues/55)
- fix [#50] : ol.control.GeoportalAttribution : affichage attributions de type text sous Safari
- fix [#53] : correction titre des outils d'edition
- fix [#51] : try ol.proj.get(crs.toUpperCase()) (e.g. if crs="epsg:3857") [#54](https://github.com/IGNF/geoportal-extensions/pull/54)
- Suppression de codes EPSG en doublons
[#38](https://github.com/IGNF/geoportal-extensions/pull/38)
- Feature register proj4
[#37](https://github.com/IGNF/geoportal-extensions/pull/37)
- Rajout des définitions du registre IGNF et enrichissement des définitions EPSG dans les extensions [#36](https://github.com/IGNF/geoportal-extensions/issues/36)
- PB de Compatibilité IE10 (extension OL3 et Leaflet) [#30](https://github.com/IGNF/geoportal-extensions/issues/30)
- Fix ie10 compatibility
[#41](https://github.com/IGNF/geoportal-extensions/pull/41)
- Gérer l'import d'un KML créé via le portail
[#47](https://github.com/IGNF/geoportal-extensions/issues/47)
- Surcharge de ol.format.KML pour la gestion des styles sur les outils …
[#46](https://github.com/IGNF/geoportal-extensions/pull/46)
- Evolutions widgets itinéraires et isochrones (ol.control.Route et ol.control.Isocurve)
[#43](https://github.com/IGNF/geoportal-extensions/issues/43)
- ol : route & isocurve enhancements
[#44](https://github.com/IGNF/geoportal-extensions/pull/44)
- Compatibilité IE10 : calculs d'itinéraires et isochrones non fonctionnels [#40](https://github.com/IGNF/geoportal-extensions/issues/40)
- Compatibilité IE10 : css des widgets Route et Isochrone [#39](https://github.com/IGNF/geoportal-extensions/issues/39)
- ol.control.LayerSwitcher : addLayer with zIndex param [#29](https://github.com/IGNF/geoportal-extensions/issues/29)
- ol.control.GeoportalAttribution: ne pas créer d'éléments de liste (<li>) vide [#35](https://github.com/IGNF/geoportal-extensions/issues/35)
- Feature ol3 layerimport [#28](https://github.com/IGNF/geoportal-extensions/pull/28)
- layerswitcher ol3 : gestion des changements de zindex [#26](https://github.com/IGNF/geoportal-extensions/pull/26)
- mise en place du controle d'import de couches (OL3) [#24](https://github.com/IGNF/geoportal-extensions/pull/24)
- ol.control.LayerImport : encodeURIComponent() lorsqu'on utilise un proxy [#34](https://github.com/IGNF/geoportal-extensions/issues/34)
- Support IE9 envisageable pour OL3 ? [#13](https://github.com/IGNF/geoportal-extensions/issues/13)
- fix [#29] : LayerSwitcher - addLayer with zIndex param [#33](https://github.com/IGNF/geoportal-extensions/pull/33)

[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/ol3-0.10.0...ol3-0.11.0)

---

# Extension Geoportail OpenLayers3, version 0.12.0

**27/07/2017 : 0.12.0** release of the Geoportal Extension for OL3

## Summary

## New Features :

### Additional widgets :
- [ol.control.GetFeatureInfo](http://ignf.github.io/geoportal-extensions/ol3-latest/jsdoc/ol.control.GetFeatureInfo.html) : permet d'accéder aux informations attributaires des objets des couches vecteur et d'interroger les couches raster (WMS et WMTS) via une requête GetFeatureInfo : [#104]

### Others features
- [#74], [#90] : Modification des identifiants dans le DOM des widgets LayerSwitcher, MousePosition et des outils de mesure, de façon à permettre leur duplication dans une même page
- [#77], [#92] : Ajout du format GeoJSON dans le widget d'import de données (LayerImport)
- [#96] : Préfixage de la classe CSS tooltip du widget d'outils de mesures (GPmeasureToolTip.css)
- [#91], [#98], https://github.com/IGNF/geoportal-extensions/commit/34807394a57faa6572bf87197b2454bf090f8754 : Rationalisation de la gestion des styles dans les KML
- [#101] : Gestion des collisions des interactions entre les widgets
- [#106] : Mise en conformité des extensions avec OpenLayers v4
- https://github.com/IGNF/geoportal-extensions/commit/5ce83b2be7db61259b0d56001fe1d071b138a7eb : Evolution des outils de mesure : possibilité d'annuler les derniers points saisis
- https://github.com/IGNF/geoportal-extensions/commit/d4af3c52e391b272abd71036d1fea0568dbec639 : Modification du paramétrage des styles des couches vecteurs importées dans le widget d'import
- [#114], [#115] : Mise en place du paramétrage de la méthode de calcul de l'azimuth
- https://github.com/IGNF/geoportal-extensions/commit/b51a85af5ee6e5970fb4c79027fc324ab0656c16 : l'export d'un croquis vide n'est plus autorisée dans le widget d'outils de dessin
- [#117], [#122] : Possibilité de rechercher des coordonnées en éditant les coordonnées du widget d'affichage des coordonnées de la souris (MousePosition)
- https://github.com/IGNF/geoportal-extensions/commit/7c312121c740c51f2ecf85d11747e3adc4a09c48 : utilisation du mode XHR par défaut pour les requêtes de calcul d'altimétrie du widget d'affichage des coordonnées de la souris (MousePosition)
- [#133] : Mise à jour de la bibliothèque d'accès (geoportal-access-lib)
- [#95], [#58], [#93], [#97], https://github.com/IGNF/geoportal-extensions/commit/cee8cde9b85131e4d3560c7b553b826358b18e12, [#107], [#108], [#102], [#110], [#124], [#131], [#134], [#135] : divers corrections de bugs

[Changelog complet](https://github.com/IGNF/geoportal-extensions/compare/ol3-0.11.0...ol3-0.12.0)

### Breaking changes

Les changements suivants apportent des modifications des interfaces ou éléments du DOM, et peuvent impacter votre application :
- [#74] : Modification des identifiants dans le DOM des widgets LayerSwitcher, MousePosition et des outils de mesure : à prendre en compte par exemple si vous surchargez les CSS de ces widgets
- [#96] : Préfixage de la classe CSS tooltip du widget d'outils de mesures (GPmeasureToolTip.css) : idem
- d4af3c5 : Modification de la structure des options de paramétrage des styles des couches vecteurs importées dans le widget d'import : à prendre en compte si vous utilisiez ce paramétrage

Merci à @pprev94 pour son importante contribution à [#117], à @sylvainpolletvillard pour ses contributions à [#97], à @iamvdo pour son aide pour [#108], et à @F3L1X79 pour ses remarques et son intérêt à notre projet !

---

# Extension Geoportail OpenLayers, version 1.0.0

**11/12/2017 : 1.1.0** Release Extension Geoportail OpenLayers

## Summary

- Publication dans les [dépots NPM](https://www.npmjs.com/package/geoportal-extensions-openlayers)
- version 1.1.0 de la bibliothèque d'accès
- compilation sous windows
- gestion templatisée des exemples avec handlebarjs
- gestion du mécanisme d'autopan pour les popups avec le controle getfeatureinfo

- debugs divers ...

Merci à @ojathelonius pour sa contribution sur [#172]

## Changelog

- Compilation sous Windows : régression \(path.join\) [\#167](https://github.com/IGNF/geoportal-extensions/issues/167)
- Leaflet et OL3 - SearchBar : décalages dans le positionnement avec l'autcompletion [\#151](https://github.com/IGNF/geoportal-extensions/issues/151)
- ol.control.GeoportalAttribution : suppression des attributions des couches non Géoportail [\#146](https://github.com/IGNF/geoportal-extensions/issues/146)
- ol.control.SearchEngine : postalcode autocompletion returns null coordinates \[0,0\] [\#107](https://github.com/IGNF/geoportal-extensions/issues/107)

- Autopan à l'ouverture de pop-ups [\#170](https://github.com/IGNF/geoportal-extensions/issues/170)
- Dependance à geoportal-access-lib depuis NPM [\#128](https://github.com/IGNF/geoportal-extensions/issues/128)
- Compilation sous windows [\#119](https://github.com/IGNF/geoportal-extensions/issues/119)
- Upgrade Geoportal access lib to 1.1 [\#178](https://github.com/IGNF/geoportal-extensions/pull/178) ([gcebelieu](https://github.com/gcebelieu))
- Add npm installation instructions to READMEs [\#177](https://github.com/IGNF/geoportal-extensions/pull/177) ([gcebelieu](https://github.com/gcebelieu))
- Ajout du paramètre autoPanOptions pour permettre le recentrage automatique des pop-up [\#172](https://github.com/IGNF/geoportal-extensions/pull/172) ([ojathelonius](https://github.com/ojathelonius))
- Recentrage de la pop-up lorsqu'elle apparaît en dehors du canvas [\#171](https://github.com/IGNF/geoportal-extensions/pull/171) ([ojathelonius](https://github.com/ojathelonius))
- Automatisation des publications [\#166](https://github.com/IGNF/geoportal-extensions/pull/166) ([lowzonenose](https://github.com/lowzonenose))
- Feature template samples [\#161](https://github.com/IGNF/geoportal-extensions/pull/161) ([lowzonenose](https://github.com/lowzonenose))
- Feature dependency npm [\#160](https://github.com/IGNF/geoportal-extensions/pull/160) ([lowzonenose](https://github.com/lowzonenose))
- Debug CSS rules based on dje remarks [\#155](https://github.com/IGNF/geoportal-extensions/pull/155) ([gcebelieu](https://github.com/gcebelieu))
- fix \#146 : clean previous attributions only for Geoportal Layers [\#147](https://github.com/IGNF/geoportal-extensions/pull/147) ([lboulanger](https://github.com/lboulanger))

- drawing tools conflicts with openlayers popups [\#143](https://github.com/IGNF/geoportal-extensions/issues/143)
- Edition des coordonnées \(MousePosition\) : gestion du cas où displayCoordinates = false [\#140](https://github.com/IGNF/geoportal-extensions/issues/140)

- MousePosition coordinates edition : bug fixes [\#141](https://github.com/IGNF/geoportal-extensions/pull/141) ([lboulanger](https://github.com/lboulanger))

---

# Extension Geoportail OpenLayers, version 1.1.0

**09/04/2018 : 1.1.0** Release Extension Geoportail OpenLayers

## Summary

- version 1.2.0 de la bibliothèque d'accès
- personnalisation et enrichissement des contrôles searchEngine, elevationPath et drawing
- debugs divers ...

## Changelog

- [contrôle searchEngine] Ajout d'options pour la personnalisation de l'extension (placeholder/marker) [\#180](https://github.com/IGNF/geoportal-extensions/pull/180)
- [outils de mesure] Nettoyage des tooltips [\#182](https://github.com/IGNF/geoportal-extensions/pull/182)
- [contrôle getFeatureInfo] bug fix : désabonnement aux événements lors de la suppression du contrôle
- [contrôle elevationPath] Mise en place de champs calculés pour un affichage personnalisé du profil altimétrique [\#188](https://github.com/IGNF/geoportal-extensions/pull/188) [\#158](https://github.com/IGNF/geoportal-extensions/issues/158)
- [contrôle searchEngine] Exécution d'un geocodage si aucun résultats sur l'autocompletion [\#185](https://github.com/IGNF/geoportal-extensions/pull/185) [\#163](https://github.com/IGNF/geoportal-extensions/issues/163)
- [contrôle drawing] Ajout d'une option pour obtenir des mesures sur les objets saisis [\#189](https://github.com/IGNF/geoportal-extensions/pull/189) [\#103](https://github.com/IGNF/geoportal-extensions/issues/103)
- [extension layers] Gestion du protocole http|https [\#195](https://github.com/IGNF/geoportal-extensions/pull/195)
- Mise à jour de l'entête UMD du bundle pour une compatibilité avec cjs, amd, es6 module [\#197](https://github.com/IGNF/geoportal-extensions/pull/197)

---

# Extension Geoportail OpenLayers, version 2.0.0

**10/04/2018 : 2.0.0** Release Extension Geoportail OpenLayers

**Edit du 16/04/2018** : Mise à jour de l'archive contenant les fichiers compilés (JS et CSS), avec le bon numéro de version + mise à jour des liens vers la JSDOC et les binaires (ci-dessous).

## Summary

Migration du projet sous [Webpack](http://webpack.github.io/) ainsi que les sources en [ES6 modules](http://exploringjs.com/es6/ch_modules.html).

**BREAKING CHANGES**

Le nom du bundle a été modifié :
> GpPluginOl3 vers GpPluginOpenLayers

La documentation technique (JSDoc) de la version 2.0.0 de l'extension Géoportail pour OpenLayers se trouve désormais ici :
> * http://ignf.github.io/geoportal-extensions/openlayers-2.0.0/jsdoc/
> ou
> * http://ignf.github.io/geoportal-extensions/openlayers-latest/jsdoc/

Les binaires de la version 2.0.0 se trouvent désormais ici :
> * versions minifiées (production) :
> * http://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers.js
> * http://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers.css
> * versions non minifiées (développement) :
> * http://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers-src.js
> * http://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers-src.css

---

# Extension Geoportail OpenLayers, version 2.1.0

**09/08/2018 : 2.1.0** Release Extension Geoportail OpenLayers

## Summary

- [Version 2.1.0](https://github.com/IGNF/geoportal-access-lib/releases/tag/v2.1.0) de la bibliothèque d'accès
- Améliorations des configurations Webpack
- Correctifs et améliorations des widgets proposés

## Changelog

Correctifs et améliorations des widgets proposés :
* [#205] : Correctif du contrôle GetFeatureInfo : prise en compte des couches Tile Vector (cf. [#203])
* [#208] Correctifs des outils de mesures (extension OpenLayers) dans le cas où 2 cartes sont affichées sur une même page
* [#210] Correctifs de l'outil MousePosition : coordonnées sexagésimales tronquées ([#202]), problème d'affichage ([#159])
* [#215] Correctifs du LayerSwitcher : suppression des écouteurs d'événements associés à une couche lors de sa suppression
* [#216] Ajout de titre et description par défaut aux couches créées par les outils de croquis, de mesures, et de profil altimétrique
* [#218] Amélioration de l'outil d'import pour les couches WMS : affichage de l'arborescence des couches WMS lorsqu'elles sont organisées en catégories dans le GetCapabilities

Structure du projet :
* [#207] Modifications syntaxiques (validation ESLint)
* [#211] Factorisation / optimisation des configurations webpack
* Mise en place de la couverture de code
* Ajout d'outils d'analyse (maintenance) : cartographie des sources et dépendances, et ajout du mode source du bundle
* Mise à jour de la version d'OpenLayers en dépendances npm (4.4.2)

Documentation :
* Mise à jour de la documentation des fichiers README : version des releases, liens d'accès direct

---

# Extension Géoportail OpenLayers, version 2.1.2

**18/02/2019 : 2.1.2**
> Release Extension Géoportail OpenLayers

## Summary

Version 2.1.2 de l'extension Géoportail pour OpenLayers :
- #229 Requêtes aux services en HTTPS par défaut, paramétrable avec paramètre "ssl"
- Utilisation de geoportal-access-lib en 2.1.2

---

# Extension Geoportail OpenLayers, version 3.0.1

**05/09/2019 : version 3.0.1**
> Release Extension Geoportail OpenLayers

## Summary

* Migration d'OpenLayers en version 5.3.0
* Nouvelle fonctionnalité avec l'import de couche au format *vecteur tuilé* (MapBox)
* Correctifs suite au passage ES6
* Migration Webpack en version > 4.0.0

[semver] :
    - OpenLayers : increment semver MAJOR version (proj4/sortable/ol5/es6)

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

    - Mise à jour du package *geoportal-access-lib* en version 2.1.3
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

# Extension Geoportail OpenLayers, version 3.0.2

**09/09/2019 : version 3.0.2**
> Release Extension Geoportail OpenLayers

## Summary

* Compatibilité des extensions avec le Front End Angular.

## Changelog

* [Changed]

    - maj dependance *geoportal-access-lib* en version 2.1.4

* [Fixed]

    - [#242](https://github.com/IGNF/geoportal-extensions/issues/242) - Compatibilité
    des extensions avec le Front End Angular.

---

# Extension Geoportail OpenLayers, version 3.0.3

"**24/09/2019 : version 3.0.3**
> Release Extension Geoportail OpenLayers

## Summary

* Correctif sur le mode Draggable
* maj dependance

## Changelog

* [Added]

    - option 'draggable' (false par defaut) sur les extensions.

* [Changed]

    - maj dependance *geoportal-access-lib* en version 2.1.5

* [Fixed]

    - [dev-workflow] correctifs sur les fichiers Webpack

---

# Extension Geoportail OpenLayers, version 3.0.4

**16/10/2019**
> Release Extension Geoportail OpenLayers

## Summary

* mise à jour *geoportal-access-lib* en version 2.1.6

## Changelog

* [Added]

    - [#246] nouvelle méthode publique sur le widget Isocurve qui permet de prépositionner un point sur la carte et de faire un traitement isochrone ou isodistance.

* [Fixed]

    - correctifs sur l'editeur de styles (mapbox)
    - [#230](https://github.com/IGNF/geoportal-extensions/issues/230) - largeur des popup d'information sur la recherche inversée.
    - correction du calcul de surface de l'outil de dessin.

---

# Extension Geoportail OpenLayers, version 3.0.5

**18/11/2019**
> Release Extension Geoportail OpenLayers

## Summary

* Divers correctifs sur les controles MousePosition et getFeatureInfo

## Changelog

* [Added]

    - enregistrement auto des projections dans le contrôle MousePosition
    - surcharge de la fonction *ol.proj.proj4.register* afin de corriger les projections geocentriques (creation de la classe *CRS/Proj4.js*) :
    > la release 2.6.0 semble corriger les projections (https://github.com/proj4js/proj4js/releases/tag/2.6.0) : fix a priori temporaire

* [Changed]

    - Adaptation des exemples pour pointer sur la version courante d'openlayers

* [Fixed]

    - correctifs sur l'editeur de styles (mapbox)
    - correctifs sur le contrôle GetFeatureInfo
    - correctifs CSS sur le contrôle MousePosition

---

# Extension Geoportail OpenLayers, version 3.0.6

**17/12/2019**
> Release Extension Geoportail OpenLayers

## Summary

* Compatibilité IE sur l'API Fetch
* Mise à jour sécurité des dépendances
* Correctif sur le widget GetFeatureInfo

## Changelog

* [Added]

    - ajout du bundle ol en mode "deminifié" dans les exemples

* [Fixed]

    - [#249] Gestion de la comptabilité IE 10/11 sur l'API Fetch (polyfill)
    - Correctif sur le getFeatureInfo d'une couche WMS de type POI

* [Security]

    - Mise à jour des dépendances de sécurités"

---

# Extension Geoportail OpenLayers, version 3.0.7

**24/01/2020**
> Release Extension Geoportail OpenLayers

## Summary

* Correctif sur le widget de dessin

## Changelog

* [Fixed]

    - Correctif sur le widget Drawing

---

# Extension Geoportail OpenLayers, version 3.0.8

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

# Extension Geoportail OpenLayers, version 3.0.9

**01/04/2020**
> Release Extension Geoportail OpenLayers

## Summary

* hotfix sur la gestion des sprites des couches mapbox

## Changelog

* [Fixed]

    - meilleure gestion et fetch des sprites avec CORB

**BREAKING CHANGES**

> compilation du projet avec une version nodejs > 8.9.0

---

# Extension Geoportail OpenLayers, version 3.0.10

**02/04/2020**
> Release Extension Geoportail OpenLayers

## Summary

* Second hotfix sur la gestion des sprites des couches mapbox et versions des dépendances fixées

## Changelog

* [Changed]

    - versions des dépendances fixées dans le package.json

* [Fixed]

    - correction de la gestion des sprites

---

# Extension Geoportail OpenLayers, version 3.0.11

**29/06/2020**
> Release Extension Geoportail OpenLayers

## Summary

* evolution du widget de dessin sur la gestion des popups
* saisie de polygones avec trous dans l'outil de dessin
* mise à jour des dépendances (#263)

## Changelog

* [Added]

    - ajout de la commande : npm run eslint (#263)
    - ajout d'un guide sur les bonnes pratiques de dev (0e396cce78ccbcb0691f9a4f2f73cd7a43d57b5f)

* [Changed]

    - versions des dépendances fixées dans le package.json (#263)
    - [DRAWING] faire des polygones à trous (#270)
    - [DRAWING] choix d'afficher ou non les popups après chaque saisie (#269)
    - [DRAWING] possibilité de surcharger le style des popups (#269)

* [Deprecated]

* [Removed]

* [Fixed]

	- fix des tests unitaires sur mouseposition (#264)
	- fix getFeatureInfo (4aa57fea565d65cd5cb10927ab76179aa8a84ae5)

* [Security]

---
# Extension Geoportail OpenLayers, version 3.0.14

**12/02/2021**
> Release Extension Geoportail OpenLayers

## Summary

Nouveau widget de profil altimétrique et  correctif sur le SearchEngine

## Changelog

* [Added]

* [Changed]

    - nouvel affichage du profil altimétrique par défaut (DISPLAY_PROFILE_BY_DEFAULT)

* [Deprecated]

* [Removed]

* [Fixed]

    - fix sur la prise en compte du paramètre ssl=false pour les controles qui interrogent les services (a71811bb85785af93759a77de793be0c9d313fbf)
    - fix sur l'interface des options données au controle SearchEngine (ee5130f376f83702328d55659ad73bd30f561a02)
    - correctif sur l'export de la version en mode module

* [Security]

---
# Extension Geoportail OpenLayers, version 3.0.16

**11/05/2021**
> Release Extension Geoportail openLayers

## Summary

Correctifs sur le profil altimétriques

## Changelog

* [Added]

* [Changed]
    - Adaptation du style du profil alti par défaut

* [Deprecated]

* [Removed]

* [Fixed]

    - Correctif sur les clics multiple en fin de saisie du profil altimétrique (#298)

* [Security]

---
# Extension Geoportail OpenLayers, version 3.0.17

**16/06/2021**
> Release Extension Geoportail openlayers

## Summary

Correction sur le profil altimétrique

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - fix sur la saisie à main levée du profil altimetrique (#299)

* [Security]

---
# Extension Geoportail OpenLayers, version 3.0.18

**22/06/2021**
> Release Extension Geoportail openlayers

## Summary

Ajout de la gestion de projections geocentriques

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]
  
    - Gestion des projections geocentriques (ex. EPSG:4978) (#303)
    - Correction sur le DOM du profil-alti (#302)

* [Security]

---
# Extension Geoportail OpenLayers, version 3.0.19

**29/06/2021**
> Release Extension Geoportail openlayers

## Summary

De nouvelles corrections sur le profil alti

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - fix sur la vignette du profil altimétrique (#305)

* [Security]

---
# Extension Geoportail OpenLayers, version 3.1.0

**02/08/2021**
> Release Extension Geoportail openlayers

## Summary

Mise à jour de l'extension Géoportail pour OpenLayers 6.3.1

Upgrade des dependances :
- openLayers@6.3.1
- ol-mapbox-style@6.3.2

## Changelog

* [Added]

* [Changed]

    - mise à jour de la dépendance openlayers en versio 6.3.1 (#280)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.0

**03/11/2021**
> Release Extension Geoportail openlayers

## Summary

## Changelog

* [Added]

* [Changed]

    - utilisation de l'itinéraire V2 via geoportal-access-lib 3.0.1 (#312)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.1

**08/11/2021**
> Release Extension Geoportail openlayers

## Summary

Mise à jour access-lib pour utilisation de l'itinéraire v2

## Changelog

* [Added]

* [Changed]

    - utilisation de l'itinéraire V2 via geoportal-access-lib 3.0.1 (#312)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.2

**10/11/2021**
> Release Extension Geoportail openlayers

## Summary

Mise à jour de l'access-lib geoportail en version 3.0.2

## Changelog

* [Added]

* [Changed]

    - met à jour l'access-lib en version 3.0.2 pour correction géométrie itinéraire

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.3

**10/11/2021**
> Release Extension Geoportail openlayers

## Summary

Mise à jour de l'access-lib geoportail en version 3.0.3

## Changelog

* [Added]

* [Changed]

    - met à jour l'access-lib en version 3.0.3 pour correction géométrie itinéraire

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.4

**03/12/2021**
> Release Extension Geoportail openlayers

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
# Extension Geoportail OpenLayers, version 3.2.5

**13/01/2022**
> Release Extension Geoportail openlayers

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
# Extension Geoportail OpenLayers, version 3.2.6

**17/01/2022**
> Release Extension Geoportail openlayers

## Summary

* upgrade d'OpenLayers : 6.9.0
* upgrade olms : 6.7.0

## Changelog

* [Added]

  * MousePosition : Ajouter un callback au centrage de la carte sur des coordonnées [#315](https://github.com/IGNF/geoportal-extensions/issues/315)
  
  * Ajout du mecanisme de desactivation des interactions sur tous les widgets [developpez.com](https://www.developpez.net/forums/d2123362/applications/sig-systeme-d-information-geographique/ign-api-geoportail/utilisation-outils-mesures-gptoolbox-autres-widgets-conflit-fonctionnement/)

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

  * Fix sur l'affichage des pictogrammes du vecteur tuilé

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.7

**28/01/2022**
> Release Extension Geoportail openlayers

## Summary

Evolution de la documentation et correction du layerswitcher

## Changelog

* [Added]

* [Changed]

    - Mise à jour de la documentation pour l'utilisation de clefs multiples (#318)

* [Deprecated]

* [Removed]

* [Fixed]

    - Correction du drag&drop sur le LayerSwitcher sous Chrome 97 (138aecced48a3f91503b6d3ec33e917d4cb16e04)

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.8

**11/02/2022**
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

    - Retrait de la limitation d'affichage des reponses de l'autocompletion sur le Widget *SearchEngine* (cf. <https://www.developpez.net/forums/d2125691/applications/sig-systeme-d-information-geographique/ign-api-geoportail/geoportal-extension-searchengine-autocomplete-maximum-5-reponses/#post11811536>)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.9

**15/02/2022**
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

    - Retrait de la limitation d'affichage des reponses de l'autocompletion sur le Widget *SearchEngine* (cf. <https://www.developpez.net/forums/d2125691/applications/sig-systeme-d-information-geographique/ign-api-geoportail/geoportal-extension-searchengine-autocomplete-maximum-5-reponses/#post11811536>)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.10

**23/03/2022**
> Release Extension Geoportail openlayers

## Summary

## Changelog

* [Added]

* [Changed]

    - DOM widget d'import : "Tuiles vectorielles" au lieu de "Vecteur tuilé"
    - utilisation du service isochrone v2, access-lib 3.1.0 (#326)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.11

**31/03/2022**
> Release Extension Geoportail openlayers

## Summary

## Changelog

* [Added]

    - Ajout du menu des couleurs et de la taille des pictogramme dans l'outil de dessin

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Amélioration du rendu vecteur des formats GPX et GeoJSON
    - Gestion du nom d'une couche importée dans le gestionnaire et dans l'outil de dessin

* [Security]

---
# Extension Geoportail OpenLayers, version 3.2.12

**29/04/2022**
> Release Extension Geoportail openlayers

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Permettre la saisie sous la tooltip sur les outils de mesures
    - Correctif du style des elements en cours d'édition lors de l'export / enregistrement des croquis sur l'outil de dessin
    - Desactivation des interactions à la fermeture de l'outil de dessin [#323](https://github.com/IGNF/geoportal-extensions/issues/323)
    - Nettoyage des tooltips des outils de mesures

* [Security]

---
