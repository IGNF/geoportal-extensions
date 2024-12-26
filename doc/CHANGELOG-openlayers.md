# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- toc -->

- [Extension Geoplateforme OpenLayers3, version 0.10.0](#extension-geoplateforme-openlayers3-version-0100)
  * [Changelog](#changelog)
- [Extension Geoplateforme OpenLayers3, version 0.11.0](#extension-geoplateforme-openlayers3-version-0110)
  * [Summary](#summary)
  * [New Features :](#new-features-)
    + [Additional widgets :](#additional-widgets-)
    + [Others features](#others-features)
  * [ChangeLog](#changelog)
- [Extension Geoplateforme OpenLayers3, version 0.12.0](#extension-geoplateforme-openlayers3-version-0120)
  * [Summary](#summary-1)
  * [New Features :](#new-features--1)
    + [Additional widgets :](#additional-widgets--1)
    + [Others features](#others-features-1)
    + [Breaking changes](#breaking-changes)
- [Extension Geoplateforme OpenLayers, version 1.0.0](#extension-geoplateforme-openlayers-version-100)
  * [Summary](#summary-2)
  * [Changelog](#changelog-1)
- [Extension Geoplateforme OpenLayers, version 1.1.0](#extension-geoplateforme-openlayers-version-110)
  * [Summary](#summary-3)
  * [Changelog](#changelog-2)
- [Extension Geoplateforme OpenLayers, version 2.0.0](#extension-geoplateforme-openlayers-version-200)
  * [Summary](#summary-4)
- [Extension Geoplateforme OpenLayers, version 2.1.0](#extension-geoplateforme-openlayers-version-210)
  * [Summary](#summary-5)
  * [Changelog](#changelog-3)
- [Extension Géoportail OpenLayers, version 2.1.2](#extension-geoportail-openlayers-version-212)
  * [Summary](#summary-6)
- [Extension Geoplateforme OpenLayers, version 3.0.1](#extension-geoplateforme-openlayers-version-301)
  * [Summary](#summary-7)
  * [Changelog](#changelog-4)
- [Extension Geoplateforme OpenLayers, version 3.0.2](#extension-geoplateforme-openlayers-version-302)
  * [Summary](#summary-8)
  * [Changelog](#changelog-5)
- [Extension Geoplateforme OpenLayers, version 3.0.3](#extension-geoplateforme-openlayers-version-303)
  * [Summary](#summary-9)
  * [Changelog](#changelog-6)
- [Extension Geoplateforme OpenLayers, version 3.0.4](#extension-geoplateforme-openlayers-version-304)
  * [Summary](#summary-10)
  * [Changelog](#changelog-7)
- [Extension Geoplateforme OpenLayers, version 3.0.5](#extension-geoplateforme-openlayers-version-305)
  * [Summary](#summary-11)
  * [Changelog](#changelog-8)
- [Extension Geoplateforme OpenLayers, version 3.0.6](#extension-geoplateforme-openlayers-version-306)
  * [Summary](#summary-12)
  * [Changelog](#changelog-9)
- [Extension Geoplateforme OpenLayers, version 3.0.7](#extension-geoplateforme-openlayers-version-307)
  * [Summary](#summary-13)
  * [Changelog](#changelog-10)
- [Extension Geoplateforme OpenLayers, version 3.0.8](#extension-geoplateforme-openlayers-version-308)
  * [Summary](#summary-14)
  * [Changelog](#changelog-11)
- [Extension Geoplateforme OpenLayers, version 3.0.9](#extension-geoplateforme-openlayers-version-309)
  * [Summary](#summary-15)
  * [Changelog](#changelog-12)
- [Extension Geoplateforme OpenLayers, version 3.0.10](#extension-geoplateforme-openlayers-version-3010)
  * [Summary](#summary-16)
  * [Changelog](#changelog-13)
- [Extension Geoplateforme OpenLayers, version 3.0.11](#extension-geoplateforme-openlayers-version-3011)
  * [Summary](#summary-17)
  * [Changelog](#changelog-14)
- [Extension Geoplateforme OpenLayers, version 3.0.14](#extension-geoplateforme-openlayers-version-3014)
  * [Summary](#summary-18)
  * [Changelog](#changelog-15)
- [Extension Geoplateforme OpenLayers, version 3.0.16](#extension-geoplateforme-openlayers-version-3016)
  * [Summary](#summary-19)
  * [Changelog](#changelog-16)
- [Extension Geoplateforme OpenLayers, version 3.0.17](#extension-geoplateforme-openlayers-version-3017)
  * [Summary](#summary-20)
  * [Changelog](#changelog-17)
- [Extension Geoplateforme OpenLayers, version 3.0.18](#extension-geoplateforme-openlayers-version-3018)
  * [Summary](#summary-21)
  * [Changelog](#changelog-18)
- [Extension Geoplateforme OpenLayers, version 3.0.19](#extension-geoplateforme-openlayers-version-3019)
  * [Summary](#summary-22)
  * [Changelog](#changelog-19)
- [Extension Geoplateforme OpenLayers, version 3.1.0](#extension-geoplateforme-openlayers-version-310)
  * [Summary](#summary-23)
  * [Changelog](#changelog-20)
- [Extension Geoplateforme OpenLayers, version 3.2.0](#extension-geoplateforme-openlayers-version-320)
  * [Summary](#summary-24)
  * [Changelog](#changelog-21)
- [Extension Geoplateforme OpenLayers, version 3.2.1](#extension-geoplateforme-openlayers-version-321)
  * [Summary](#summary-25)
  * [Changelog](#changelog-22)
- [Extension Geoplateforme OpenLayers, version 3.2.2](#extension-geoplateforme-openlayers-version-322)
  * [Summary](#summary-26)
  * [Changelog](#changelog-23)
- [Extension Geoplateforme OpenLayers, version 3.2.3](#extension-geoplateforme-openlayers-version-323)
  * [Summary](#summary-27)
  * [Changelog](#changelog-24)
- [Extension Geoplateforme OpenLayers, version 3.2.4](#extension-geoplateforme-openlayers-version-324)
  * [Summary](#summary-28)
  * [Changelog](#changelog-25)
- [Extension Geoplateforme OpenLayers, version 3.2.5](#extension-geoplateforme-openlayers-version-325)
  * [Summary](#summary-29)
  * [Changelog](#changelog-26)
- [Extension Geoplateforme OpenLayers, version 3.2.6](#extension-geoplateforme-openlayers-version-326)
  * [Summary](#summary-30)
  * [Changelog](#changelog-27)
- [Extension Geoplateforme OpenLayers, version 3.2.7](#extension-geoplateforme-openlayers-version-327)
  * [Summary](#summary-31)
  * [Changelog](#changelog-28)
- [Extension Geoplateforme OpenLayers, version 3.2.8](#extension-geoplateforme-openlayers-version-328)
  * [Summary](#summary-32)
  * [Changelog](#changelog-29)
- [Extension Geoplateforme OpenLayers, version 3.2.9](#extension-geoplateforme-openlayers-version-329)
  * [Summary](#summary-33)
  * [Changelog](#changelog-30)
- [Extension Geoplateforme OpenLayers, version 3.2.10](#extension-geoplateforme-openlayers-version-3210)
  * [Summary](#summary-34)
  * [Changelog](#changelog-31)
- [Extension Geoplateforme OpenLayers, version 3.2.11](#extension-geoplateforme-openlayers-version-3211)
  * [Summary](#summary-35)
  * [Changelog](#changelog-32)
- [Extension Geoplateforme OpenLayers, version 3.2.12](#extension-geoplateforme-openlayers-version-3212)
  * [Summary](#summary-36)
  * [Changelog](#changelog-33)
- [Extension Geoplateforme OpenLayers, version 3.2.13](#extension-geoplateforme-openlayers-version-3213)
  * [Summary](#summary-37)
  * [Changelog](#changelog-34)
- [Extension Geoplateforme OpenLayers, version 3.2.14](#extension-geoplateforme-openlayers-version-3214)
  * [Summary](#summary-38)
  * [Changelog](#changelog-35)
- [Extension Geoplateforme OpenLayers, version 3.2.15](#extension-geoplateforme-openlayers-version-3215)
  * [Summary](#summary-39)
  * [Changelog](#changelog-36)
- [Extension Geoplateforme OpenLayers, version 3.2.16](#extension-geoplateforme-openlayers-version-3216)
  * [Summary](#summary-40)
  * [Changelog](#changelog-37)
- [Extension Geoplateforme OpenLayers, version 3.2.18](#extension-geoplateforme-openlayers-version-3218)
  * [Summary](#summary-41)
  * [Changelog](#changelog-38)
- [Extension Geoplateforme OpenLayers, version 3.2.19](#extension-geoplateforme-openlayers-version-3219)
  * [Summary](#summary-42)
  * [Changelog](#changelog-39)
- [Extension Geoplateforme OpenLayers, version 3.2.20](#extension-geoplateforme-openlayers-version-3220)
  * [Summary](#summary-43)
  * [Changelog](#changelog-40)
- [Extension Geoplateforme OpenLayers, version 3.2.21](#extension-geoplateforme-openlayers-version-3221)
  * [Summary](#summary-44)
  * [Changelog](#changelog-41)
- [Extension Geoplateforme OpenLayers, version 3.2.22](#extension-geoplateforme-openlayers-version-3222)
  * [Summary](#summary-45)
  * [Changelog](#changelog-42)
- [Extension Geoplateforme OpenLayers, version 3.3.0](#extension-geoplateforme-openlayers-version-330)
  * [Summary](#summary-46)
  * [Changelog](#changelog-43)
        * [Avant :](#avant-)
        * [Maintenant :](#maintenant-)
- [Extension Geoplateforme OpenLayers, version 3.3.1](#extension-geoplateforme-openlayers-version-331)
  * [Summary](#summary-47)
  * [Changelog](#changelog-44)
- [Extension Geoplateforme OpenLayers, version 3.3.2](#extension-geoplateforme-openlayers-version-332)
  * [Summary](#summary-48)
  * [Changelog](#changelog-45)
- [Extension Geoplateforme OpenLayers, version 3.3.3](#extension-geoplateforme-openlayers-version-333)
  * [Summary](#summary-49)
  * [Changelog](#changelog-46)
- [Extension Geoplateforme OpenLayers, version 3.3.4](#extension-geoplateforme-openlayers-version-334)
  * [Summary](#summary-50)
  * [Changelog](#changelog-47)
- [Extension Geoplateforme OpenLayers, version 3.4.0-beta](#extension-geoplateforme-openlayers-version-340-beta)
  * [Summary](#summary-51)
  * [Changelog](#changelog-48)
- [Extension Geoplateforme OpenLayers, version 3.4.0-beta2](#extension-geoplateforme-openlayers-version-340-beta2)
  * [Summary](#summary-52)
  * [Changelog](#changelog-49)
- [Extension Geoplateforme OpenLayers, version 3.4.0-beta3](#extension-geoplateforme-openlayers-version-340-beta3)
  * [Summary](#summary-53)
  * [Changelog](#changelog-50)
- [Extension Geoplateforme OpenLayers, version 3.4.0-beta4](#extension-geoplateforme-openlayers-version-340-beta4)
  * [Summary](#summary-54)
  * [Changelog](#changelog-51)
- [Extension Geoplateforme OpenLayers, version 3.4.1](#extension-geoplateforme-openlayers-version-341)
  * [Summary](#summary-55)
  * [Changelog](#changelog-52)
- [Extension Geoplateforme OpenLayers, version 3.4.2](#extension-geoplateforme-openlayers-version-342)
  * [Summary](#summary-56)
  * [Changelog](#changelog-53)
- [Extension Geoplateforme OpenLayers, version 3.4.3](#extension-geoplateforme-openlayers-version-343)
  * [Summary](#summary-57)
  * [Changelog](#changelog-54)
- [Extension Geoplateforme OpenLayers, version 3.4.4](#extension-geoplateforme-openlayers-version-344)
  * [Summary](#summary-58)
  * [Changelog](#changelog-55)
- [Extension Geoplateforme OpenLayers, version 3.4.5](#extension-geoplateforme-openlayers-version-345)
  * [Summary](#summary-59)
  * [Changelog](#changelog-56)

<!-- tocstop -->

---

# Extension Geoplateforme OpenLayers3, version 0.10.0

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

# Extension Geoplateforme OpenLayers3, version 0.11.0

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

# Extension Geoplateforme OpenLayers3, version 0.12.0

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

# Extension Geoplateforme OpenLayers, version 1.0.0

**11/12/2017 : 1.1.0** Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 1.1.0

**09/04/2018 : 1.1.0** Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 2.0.0

**10/04/2018 : 2.0.0** Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 2.1.0

**09/08/2018 : 2.1.0** Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 3.0.1

**05/09/2019 : version 3.0.1**
> Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 3.0.2

**09/09/2019 : version 3.0.2**
> Release Extension Geoplateforme OpenLayers

## Summary

* Compatibilité des extensions avec le Front End Angular.

## Changelog

* [Changed]

    - maj dependance *geoportal-access-lib* en version 2.1.4

* [Fixed]

    - [#242](https://github.com/IGNF/geoportal-extensions/issues/242) - Compatibilité
    des extensions avec le Front End Angular.

---

# Extension Geoplateforme OpenLayers, version 3.0.3

"**24/09/2019 : version 3.0.3**
> Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 3.0.4

**16/10/2019**
> Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 3.0.5

**18/11/2019**
> Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 3.0.6

**17/12/2019**
> Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 3.0.7

**24/01/2020**
> Release Extension Geoplateforme OpenLayers

## Summary

* Correctif sur le widget de dessin

## Changelog

* [Fixed]

    - Correctif sur le widget Drawing

---

# Extension Geoplateforme OpenLayers, version 3.0.8

**31/03/2020**
> Release Extension Geoplateforme OpenLayers

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

# Extension Geoplateforme OpenLayers, version 3.0.9

**01/04/2020**
> Release Extension Geoplateforme OpenLayers

## Summary

* hotfix sur la gestion des sprites des couches mapbox

## Changelog

* [Fixed]

    - meilleure gestion et fetch des sprites avec CORB

**BREAKING CHANGES**

> compilation du projet avec une version nodejs > 8.9.0

---

# Extension Geoplateforme OpenLayers, version 3.0.10

**02/04/2020**
> Release Extension Geoplateforme OpenLayers

## Summary

* Second hotfix sur la gestion des sprites des couches mapbox et versions des dépendances fixées

## Changelog

* [Changed]

    - versions des dépendances fixées dans le package.json

* [Fixed]

    - correction de la gestion des sprites

---

# Extension Geoplateforme OpenLayers, version 3.0.11

**29/06/2020**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.0.14

**12/02/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.0.16

**11/05/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.0.17

**16/06/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.0.18

**22/06/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.0.19

**29/06/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.1.0

**02/08/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.0

**03/11/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.1

**08/11/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.2

**10/11/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.3

**10/11/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.4

**03/12/2021**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.5

**13/01/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.6

**17/01/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.7

**28/01/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.8

**11/02/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.9

**15/02/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.10

**23/03/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.11

**31/03/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.12

**29/04/2022**
> Release Extension Geoplateforme OpenLayers

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
# Extension Geoplateforme OpenLayers, version 3.2.13

**11/05/2022**
> Release Extension Geoplateforme OpenLayers

## Summary

Fix sur l'outil de dessin

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Exception sur l'export des features en cours d'édition sur l'outil de dessin

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.14

**01/08/2022**
> Release Extension Geoplateforme OpenLayers

## Summary

Correctifs sur l'editeur de styles MapBox et le controle d'import des données MapBox

## Changelog

* [Added]

    - Ajout d'options de tri dans l'editeur de style MapBox (9dcf64acebacf812b2a2642a47db4b719f3b1e30)

* [Changed]

    - Passage en mode Feature (vs FeatureRender) pour l'import du vecteur tuilé (0a863d90d2d19fe41911b3fddb66c3f104216e90)
    - mise à jour du Readme (b7bb7fc5b216c04e4bee7bb4ef2f9510dbe23d33)

* [Deprecated]

* [Removed]

* [Fixed]

    - Fix sur la gestion des imports de type MapBox (#328)
    - Fix sur les legendes MapBox (#328)
    - Fix sur le rendu sous FireFox des legendes MapBox (a9eada8fcfc020a603909ee6d0da8d4af2aa4248)
    - Fix sur le tri alpha des couches MapBox (a9eada8fcfc020a603909ee6d0da8d4af2aa4248)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.15

**27/09/2022**
> Release Extension Geoplateforme OpenLayers

## Summary

Correction sur la gestion des projections pour les imports WMS

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Pour une couche WMS issue d'un import, on prend en priorité la projection de la carte si elle est gérée par le serveur WMS (#338) 

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.16

**04/10/2022**
> Release Extension Geoplateforme OpenLayers

## Summary

Utilisation du Geocodage v2

## Changelog

* [Added]

* [Changed]

    - mise à jour  pour utilisation du service de Geocodage v2 (#279)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.18

**18/11/2022**
> Release Extension Geoplateforme OpenLayers

## Summary

## Changelog

* [Added]

    - Ajout des "@types declaration" pour publication

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Ajout des evenements (map) : "render:success" / "render:failure" pour l'application du rendu des styles MapBox
    - Ajout de l'evenement (map) : "editor:loaded" pour le chargement de l'editeur de style

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.19

**17/01/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Mise à jour de l'access-lib en version 3.2.1

## Changelog

* [Added]

* [Changed]

    - mise à jour access-lib en version 3.2.1 (15f864e905c4549e43b7ec53d4369bbc9683ec2e)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.20

**21/02/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Ajout d'écouteurs sur les controles de Géocodage direct en inverse

## Changelog

* [Added]

    - Ajout d'evenements sur le contrôle SearchEngine lors de la selection d'un résultat (#348)
    - Ajout d'evenements sur le contrôle ReverseGeocode lors de la selection d'un résultat (#356)
    - Ajout de méthodes publiques sur les contrôles Iso et Route (#343) : 
        - getGeoJSON() : fournit le tracé au format GeoJSON
        - getData() : fournit la configuration du calcul

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Faute d'ortographe description couche Isocurve
    - Ajout des modules dans la JSDoc (#349)
    - Mise à jour des clefs des services (#352)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.21

**23/03/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Amélioration du traitement pour les couches vecteur tuilé (documentation, légendes, ajout simplifié)

## Changelog

* [Added]

    - Ajout simplifié d'une couche vecteur tuilé IGN :
    ```js
    var LayerMapBox = new ol.layer.GeoportalMapBox({
        layer  : "PLAN.IGN",
        style  : "gris"
    });
    ```

* [Changed]

    - GFI : ignore la propriété "icon" lors de la construction de la pop-up (05bbfa0ab8ccd09b32954aabad421b00f6faec35)
    - Vecteur tuilé : évolution sur la construction et l'affichage des légendes (#362)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.2.22

**01/06/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

- Ajout du widget *Export*
- Import des couches de calculs (itineraire, isochrone et profil altimétrique)

## Changelog

* [Added]

    - Widget d'export des tracés et des calculs au format GPX, KML et GeoJSON sur les contôles d'itineraire, d'isochrone et de profil altimétrique (#363) :

        ``` js
        // exemple
        var route = new ol.control.Route();
        map.addControl(route);
        var exportRoute = new ol.control.Export({
            control : route,
            format : "GPX"
        });
        map.addControl(exportRoute);
        ```

    - Import des couches de calculs (itineraire, isochrone et profil altimétrique) au format GPX, KML et GeoJSON (#363).
    - Widget d'export des tracés et calculs des contrôles d'itineraire, d'isochrone et de profil altimétrique (#357).

* [Changed]

    - Mise à jour doc elevationPathControl (#365)
    - transmission paramètre outputFormat=json par défaut pour mousePosition et elevationPath OpenLayers (#365)

* [Deprecated]

* [Removed]

* [Fixed]

    - Fix sur le format KML avec l'affichage des labels
    - Fix sur le profil altimétrique qui permet de construire le profil même si le panneau d'affichage est masqué (calcul en arrière plan).

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.3.0

**07/06/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Retrait total de l'utilisation du service d'autoconfiguration et utilisation de fichiers de configuration json générés quotidiennement à partir des getCapabilities des services du Geoplatform.

L'ensemble des services de calcul appelés via la bibliothèque d'accès sont désormais appelés avec la clé "calcul" par défaut dans la bibliothèque d'accès. Le paramètre "apiKey" n'est donc plus nécessaire pour appeler les services de géocodage, d'itinéraire, d'isochrone, d'altimétrie et d'autocomplétion, que ce soit directement depuis la bibli
othèque d'accès ou via les widgets des extensions Géoportail.

L'autoconfiguration n'est plus appelée par les API. Pour la remplacer, nous générons quotidiennement, à partir des getCapabilities des services WMS et WMTS, des fichiers de configuration en JSON appelables par les API JavaScript Géoportail. Il y a un fichier par clé générique. L'avantage de ce nouveau processus (en plus de s'adapter au futur arrêt du service d'autoconfiguration) est que les fichiers de configuration JSON sont directement au format attendu par les API : il n'y a plus besoin de les parser pour en extraire les informations utiles puis pour les introduire dans une structure adéquate.
Par exemple, en renseignant "cartes" au paramètre apiKey, c'est le fichier cartesConfig.json qui sera chargé et directement utilisé par les API.

A noter que le multiKeys est toujours géré, c'est à dire qu'il est possible de renseigner plusieurs clés dans le paramètre apiKey.

Il est également possible de générer son propre fichier de configuration à partir d'une ou plusieurs clés. L'utilitaire est temporairement disponible ici : https://geoportal-configuration.onrender.com. Le paramètre permettant ensuite de charger sa configuration personnelle à partir du fichier local généré s'appelle désormais **customConfigFile**, auquel on associera le chemin vers le fichier de configuration json à charger.

## Changelog

* [Added]

* [Changed]

    - mise à jour de la bibliothèque d'accès aux services Geoplatform en version 3.3.0 (#364)
    - **BC** : paramètre "customConfigFile" pour appeler un fichier de configuration local (#364)

##### Avant :

```html
<script src="chemin/vers/GpPluginOpenLayers.js" data-url="chemin/vers/mon/autoconf/AutoConf.js"></script>
```

OU

```javascript
Gp.Services.getConfig({
    serverUrl : "chemin/vers/mon/autoconf/AutoConf.js",
    timeOut : 20000,
    onSuccess : createMap
});
```

##### Maintenant :

```html
<script src="chemin/vers/GpPluginOpenLayers.js" data-url="chemin/vers/ma/config/customConfig.json"></script>
```

OU

```javascript
Gp.Services.getConfig({
    customConfigFile: "chemin/vers/ma/config/customConfig.json",
    timeOut: 20000,
    onSuccess: createMap
});

* [Deprecated]

* [Removed]

    - **BC** : les originators ne sont plus renvoyés dans la configuration. Il faut les ajouter manuellement aux couches.

```javascript
        var gpOrtho = new ol.layer.Tile({
            source: new ol.source.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                olParams: {
                    attributions: [{
                        name: "Nom raccourci originator",
                        constraints: [{
                            minScaleDenominator: 20000,
                            maxScaleDenominator: 1000000,
                            bbox: {
                                left: -10,
                                top: 50,
                                right: 10,
                                bottom: 40
                            }
                        },
                        {
                            bbox: {
                                left: 120,
                                top: 50,
                                right: 150,
                                bottom: 35
                            }
                        }
                    ]
                    },
                    {
                        url: "http://www.url-vers-le-site-du-producteur.fr",
                        constraints: [{
                            minScaleDenominator: 20000,
                            maxScaleDenominator: 400000
                        }]
                    },
                    {
                        logo: "https://lien-vers-le-logo.png"
                    },
                    {
                        attribution: "Titre complet originator",
                        constraints: [{
                            minScaleDenominator: 100000,
                            maxScaleDenominator: 800000
                        }]
                    }]
                }
            })
        });
```

    - **BC** : Les metadatas sont utilisées dans les API par le contrôle gestionnaire de couches (LayerSwitcher). Celui-ci va lire les metadatas des couches ajoutées à la carte et les afficher dans l'encart d'information dédié du LayerSwitcher. **Pour les couches WMTS uniquement**, désormais, pour que les metadatas apparaissent dans l'onglet "informations" du LayerSwitcher, il faudra les renseigner manuellement à la configuration de la couche Géoportail lors de son ajout à la carte.


```javascript
new ol.layer.Tile({
    source: new ol.source.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS",
        metadata: [
            {
                format: "xml",
                url: "lien/Vers/Une/MetaDonnee.xml"
            }
        ],
    })
})
```

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.3.1

**07/06/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.3.2

**21/07/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Ajout d'exemples avec l'appel de *Gp.Services.getConfig()* et ajout de methodes de nettoyage sur les widgets de calcul

## Changelog

* [Added]

    - ajout de méthodes de nettoyage pour les controles d'itineraire, d'isochrone, et de profil alti

* [Changed]

    - Ajout d'exemples avec l'appel de *Gp.Services.getConfig()*

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.3.3

**04/08/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Correctifs sur le layerSwitcher et le profil Altimétrique. Mise à jour de la bibliothèque d'accès aux services Géoportail.

## Changelog

* [Added]

* [Changed]

    - access-lib 3.3.3 (#369)

* [Deprecated]

* [Removed]

* [Fixed]

    - ajout couche ol au LS avec userId (#369)
    - fix méthode clean profil alti (8f393fa96491444d99fdd6fe0c3b354ea3dd21ef)
    - fix gestion multiples profils alti (f71ffd85ddff26a82534d81a88033464ed6a8b17
)
* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.3.4

**28/08/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Correctif mineur sur le chargement et l'affichage des styles de flux de tuiles vectorielles

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Copie des styles vecteur tuilés dans l'outil d'import (3efee51392414c2858df86bb765bd4a81c8fb2f3)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.0-beta

**21/09/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Mise à jour de la bibliothèque d'accès aux services Géoportail.

## Changelog

* [Added]

* [Changed]

    - access-lib 3.3.4

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.0-beta2

**27/10/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Utilisation du service de Geocodage de la Geoplateforme

## Changelog

* [Added]

* [Changed]

    - les widgets utilisent désormais par défaut les services d'autocomplétion et de geocodage direct et inverse de la Geoplateforme
    - le paramétrage d'un proxy pour utiliser le control d'import de couches est rendu facultatif
    - utilisation de la version 3.4.0-beta2 de la bibliothèque d'accès

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.0-beta3

**21/11/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

Ajout possible de couches à accès restreint via une fichier de configuration custom

## Changelog

* [Added]

* [Changed]

    - possibilité d'ajout automatique de couches IGN à accès restreint

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.0-beta4

**14/12/2023**
> Release Extension Geoplateforme OpenLayers

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - fix : incompatibilité css lorsque la map est dans une div ayant pour classe "container" (958b687ec91c712fd958d7e54437776958c37610)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.1

**04/04/2024**
> Release Extension Geoplateforme openlayers

## Summary

Correction sur le calcul d'itinéraire piéton.

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - widget itineraire utilise ressource bdtopo-valhalla dans le cas d'un itinéraire pieton en mode fastest (6675d287eb028170dea5d0dbdae2acaed51359ca)
    - tilegrid par défaut (512px) pour vecteur tuilé sur layerImport (c16006ef1de0d10794541db90d0f6fbadb1b501c)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.2

**17/04/2024**
> Release Extension Geoplateforme openlayers

## Summary

Correctif Sur la variable process utilisée dans le logger

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Correction du logger par définiton de la variable process (e0e3b9b5ad3e1f8c92086891564f04f792e24280)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.3

**14/05/2024**
> Release Extension Geoplateforme openlayers

## Summary

Mise à jour access-lib release 3.4.2

## Changelog

* [Added]

* [Changed]

    - Access-lib 3.4.2 pour fix normalyze URL + Isodistance (33196fd6d85503f39c345e600645bc0493405bd5)

* [Deprecated]

* [Removed]

* [Fixed]

    - fix definitions de constructeurs (140878f91d578d008a047b3c6ef9b200743230f9)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.4

**05/06/2024**
> Release Extension Geoplateforme openlayers

## Summary

Correction HOTFIX sur l'affichage de couches définies sur des niveaux de zooms restreints, et amélioration du SearchEngine.

## Changelog

* [Added]

* [Changed]

    - recherche avancée améliorée sur la ressource parcelle cadastrale (#379)

* [Deprecated]

* [Removed]

* [Fixed]

    - correction du paramétrage des ressources à utiliser avec le SearchEngine (#377)
    - correction de la lecture de la définition des tileMatrices liées aux nouveaux TMS_LINK (ff1ca9fbff0aba98629cd307b6b40e54b7b3386a)

* [Security]

---
# Extension Geoplateforme OpenLayers, version 3.4.5

**26/12/2024**
> Release Extension Geoplateforme openlayers

## Summary

Mise à jour de la bibliothèque d'accès et corrections diverses

## Changelog

* [Added]

* [Changed]

    - mise à jour de la bibliothèque d'accès en version 3.4.6
    - upgrade de download-artifact et upload-articfact en v4

* [Deprecated]

* [Removed]

* [Fixed]

    - Mauvais rendu profil alti en cas de boucle (#384)
    - Mauvais rendu du profil altimétrique sur les petits tracés (#385)
    - Coquille dans la config webpack (#382)

* [Security]

---
