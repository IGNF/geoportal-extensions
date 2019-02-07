# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- toc -->

- [Extension Geoportail Itowns, version 2.1.1](#extension-geoportail-itowns-version-211)
- [Extension Geoportail Itowns, version 2.1.0](#extension-geoportail-itowns-version-210)
- [Extension Geoportail Itowns, version 2.0.0](#extension-geoportail-itowns-version-200)
- [Extension Geoportail Itowns, version 1.1.0](#extension-geoportail-itowns-version-110)
- [Extension Geoportail iTowns, version 1.0.0](#extension-geoportail-itowns-version-100)

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

# Extension Geoportail Itowns, version 1.1.0

**09/04/2018 : 1.1.0** Release Extension Geoportail Itowns

## Summary

- Mise à jour de la documentation
- Enrichissement de l'API itowns

## Changelog

- [Documentation] Diverses mises à jour et ajout d'exemples jsfiddle [#200](https://github.com/IGNF/geoportal-extensions/pull/200)
- [API itowns] Enrichissement de la classe GlobeViewExtended

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
