# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- toc -->

- [Extension Geoportail Itowns, version 2.1.1](#extension-geoportail-itowns-version-211)
- [Extension Geoportail OpenLayers, version 2.1.0](#extension-geoportail-openlayers-version-210)
- [Extension Geoportail Leaflet, version 2.0.2](#extension-geoportail-leaflet-version-202)
- [Extension Geoportail Itowns, version 2.1.0](#extension-geoportail-itowns-version-210)
- [Extension Geoportail Itowns, version 2.0.0](#extension-geoportail-itowns-version-200)
- [Extension Geoportail OpenLayers, version 2.0.0](#extension-geoportail-openlayers-version-200)
- [Extension Geoportail Leaflet, version 2.0.1](#extension-geoportail-leaflet-version-201)
- [Extension Geoportail Itowns, version 1.1.0](#extension-geoportail-itowns-version-110)
- [Extension Geoportail Leaflet, version 1.1.0](#extension-geoportail-leaflet-version-110)
- [Extension Geoportail OpenLayers, version 1.1.0](#extension-geoportail-openlayers-version-110)
- [Extension Geoportail iTowns, version 1.0.0](#extension-geoportail-itowns-version-100)
- [Extension Geoportail Leaflet, version 1.0.0](#extension-geoportail-leaflet-version-100)
- [Extension Geoportail OpenLayers, version 1.0.0](#extension-geoportail-openlayers-version-100)
- [Extension Geoportail Leaflet, version 0.9.1](#extension-geoportail-leaflet-version-091)
- [Extension Geoportail OpenLayers3, version 0.12.0](#extension-geoportail-openlayers3-version-0120)
- [Extension Geoportail Leaflet, version 0.9.0](#extension-geoportail-leaflet-version-090)
- [Extension Geoportail OpenLayers3, version 0.11.0](#extension-geoportail-openlayers3-version-0110)
- [Extension Geoportail OpenLayers3, version 0.10.0](#extension-geoportail-openlayers3-version-0100)
- [Extension Geoportail Leaflet, version 0.8.0](#extension-geoportail-leaflet-version-080)

<!-- tocstop -->

---

# Extension Geoportail Itowns, version 2.1.1

**03/09/2018 : 2.1.1** Release Extension Geoportail Itowns

## Summary

- Documentation ([README-itowns.md](https://github.com/IGNF/geoportal-extensions/blob/master/README-itowns.md)) : ajout d'exemples pour l'ajout de couches Géoportail avec iTowns
- Correctifs

## Changelog

- [#225] Correctif d'un bug du widget MousePosition

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

# Extension Geoportail Itowns, version 2.1.0

**10/08/2018 : 2.1.0** Release Extension Geoportail Itowns

## Summary

- [Version 2.1.0](https://github.com/IGNF/geoportal-access-lib/releases/tag/v2.1.0) de la bibliothèque d'accès
- Ajout de fonctions permettant d'afficher simplement les couches Géoportail avec Itowns : [WMTS](https://github.com/IGNF/geoportal-extensions/blob/master/README-itowns.md#affichage-des-couches-wmts-g%C3%A9oportail) et [WMS](https://github.com/IGNF/geoportal-extensions/blob/master/README-itowns.md#affichage-des-couches-wms-g%C3%A9oportail)
- Améliorations des configurations Webpack

## Changelog

Fonctionnalités :
* [#213] Ajout de fonctions permettant d'afficher simplement les couches Géoportail avec Itowns : [WMTS](https://github.com/IGNF/geoportal-extensions/blob/master/README-itowns.md#affichage-des-couches-wmts-g%C3%A9oportail) et [WMS](https://github.com/IGNF/geoportal-extensions/blob/master/README-itowns.md#affichage-des-couches-wms-g%C3%A9oportail)

Structure du projet :
* [#207] Modifications syntaxiques (validation ESLint)
* [#211] Factorisation / optimisation des configurations webpack
* Mise en place de la couverture de code
* Ajout d'outils d'analyse (maintenance) : cartographie des sources et dépendances, et ajout du mode source du bundle

Documentation :
* Mise à jour de la documentation des fichiers README : version des releases, liens d'accès direct, documentation des widgets d'échelle et du miniglobe

---

# Extension Geoportail Itowns, version 2.0.0

**10/04/2018 : 2.0.0** Release Extension Geoportail Itowns

## Summary

Migration du projet sous [Webpack](http://webpack.github.io/) ainsi que les sources en [ES6 modules](http://exploringjs.com/es6/ch_modules.html).

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

# Extension Geoportail Leaflet, version 2.0.1

**11/04/2018 : 2.0.1** Release Extension Geoportail Leaflet

## Summary

Migration du projet sous [Webpack](http://webpack.github.io/) ainsi que les sources en [ES6 modules](http://exploringjs.com/es6/ch_modules.html).

---

# Extension Geoportail Itowns, version 1.1.0

**09/04/2018 : 1.1.0** Release Extension Geoportail Itowns

## Summary

- Mise à jour de la documentation
- Enrichissement de l'API itowns

## Changelog

- [Documentation] Diverses mises à jour et ajout d'exemples jsfiddle [#200](https://github.com/IGNF/geoportal-extensions/pull/200)
- [API itowns] Enrichissement de la classe GlobeViewExtended

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

# Extension Geoportail iTowns, version 1.0.0

**14/03/2018 : 1.0.0** release of the Geoportal Extension for iTowns

## Changelog

**Provides** :
- itowns.control.LayerSwitcher control class
- itowns.control..MousePosition control class
- itowns.control.MiniGlobe control class
- itowns.control.Attributions control class
- itowns.control.Scale control class

**Compatible with** :
- iTowns v2.3.0

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
