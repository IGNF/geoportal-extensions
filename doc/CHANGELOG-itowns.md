# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- toc -->

- [Extension Geoportail iTowns, version 1.0.0](#extension-geoportail-itowns-version-100)
  * [Changelog](#changelog)
- [Extension Geoportail Itowns, version 1.1.0](#extension-geoportail-itowns-version-110)
  * [Summary](#summary)
  * [Changelog](#changelog-1)
- [Extension Geoportail Itowns, version 2.0.0](#extension-geoportail-itowns-version-200)
  * [Summary](#summary-1)
- [Extension Geoportail Itowns, version 2.1.0](#extension-geoportail-itowns-version-210)
  * [Summary](#summary-2)
  * [Changelog](#changelog-2)
- [Extension Geoportail Itowns, version 2.1.1](#extension-geoportail-itowns-version-211)
  * [Summary](#summary-3)
  * [Changelog](#changelog-3)
- [Extension Géoportail pour Itowns, version 2.1.2](#extension-geoportail-pour-itowns-version-212)
  * [Summary](#summary-4)
- [Extension Geoportail Itowns, version 2.2.1](#extension-geoportail-itowns-version-221)
  * [Summary](#summary-5)
  * [Changelog](#changelog-4)
- [Extension Geoportail Itowns, version 2.2.2](#extension-geoportail-itowns-version-222)
  * [Summary](#summary-6)
  * [Changelog](#changelog-5)
- [Extension Geoportail Itowns, version 2.2.3](#extension-geoportail-itowns-version-223)
  * [Summary](#summary-7)
  * [Changelog](#changelog-6)
- [Extension Geoportail Itowns, version 2.2.4](#extension-geoportail-itowns-version-224)
  * [Summary](#summary-8)
  * [Changelog](#changelog-7)
- [Extension Geoportail Itowns, version 2.2.5](#extension-geoportail-itowns-version-225)
  * [Summary](#summary-9)
  * [Changelog](#changelog-8)
- [Extension Geoportail Itowns, version 2.2.6](#extension-geoportail-itowns-version-226)
  * [Summary](#summary-10)
  * [Changelog](#changelog-9)
- [Extension Geoportail Itowns, version 2.2.7](#extension-geoportail-itowns-version-227)
  * [Summary](#summary-11)
  * [Changelog](#changelog-10)
- [Extension Geoportail Itowns, version 2.2.8](#extension-geoportail-itowns-version-228)
  * [Summary](#summary-12)
  * [Changelog](#changelog-11)
- [Extension Geoportail Itowns, version 2.2.9](#extension-geoportail-itowns-version-229)
  * [Summary](#summary-13)
  * [Changelog](#changelog-12)
- [Extension Geoportail Itowns, version 2.1.0](#extension-geoportail-itowns-version-210-1)
  * [Summary](#summary-14)
  * [Changelog](#changelog-13)
- [Extension Geoportail Itowns, version 2.3.1](#extension-geoportail-itowns-version-231)
  * [Summary](#summary-15)
  * [Changelog](#changelog-14)
- [Extension Geoportail Itowns, version 2.3.2](#extension-geoportail-itowns-version-232)
  * [Summary](#summary-16)
  * [Changelog](#changelog-15)
- [Extension Geoportail Itowns, version 2.3.3](#extension-geoportail-itowns-version-233)
  * [Summary](#summary-17)
  * [Changelog](#changelog-16)

<!-- tocstop -->

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

# Extension Geoportail Itowns, version 1.1.0

**09/04/2018 : 1.1.0** Release Extension Geoportail Itowns

## Summary

- Mise à jour de la documentation
- Enrichissement de l'API itowns

## Changelog

- [Documentation] Diverses mises à jour et ajout d'exemples jsfiddle [#200](https://github.com/IGNF/geoportal-extensions/pull/200)
- [API itowns] Enrichissement de la classe GlobeViewExtended

---

# Extension Geoportail Itowns, version 2.0.0

**10/04/2018 : 2.0.0** Release Extension Geoportail Itowns

## Summary

Migration du projet sous [Webpack](http://webpack.github.io/) ainsi que les sources en [ES6 modules](http://exploringjs.com/es6/ch_modules.html).

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

# Extension Geoportail Itowns, version 2.1.1

**03/09/2018 : 2.1.1** Release Extension Geoportail Itowns

## Summary

- Documentation ([README-itowns.md](https://github.com/IGNF/geoportal-extensions/blob/master/README-itowns.md)) : ajout d'exemples pour l'ajout de couches Géoportail avec iTowns
- Correctifs

## Changelog

- [#225] Correctif d'un bug du widget MousePosition

---

# Extension Géoportail pour Itowns, version 2.1.2

**18/02/2019 : 2.1.2**
> Release Extension Géoportail pour Itowns

## Summary

Version 2.1.2 de l'extension Géoportail pour Itowns :
- #227 Export des définitions CRS dans l'objet Itowns
- #229 Requêtes aux services en HTTPS par défaut, paramétrable avec paramètre "ssl"
- Utilisation de geoportal-access-lib en 2.1.2

---

# Extension Geoportail Itowns, version 2.2.1

**05/09/2019 : version 2.2.1**
> Release Extension Geoportail Itowns

## Summary

    * Migration d'Itowns en version 2.13.1
    * Migration Webpack en version > 4.0.0
    * Description plus précise de la variable globale **Gp** dans la jsdoc

[semver] :
    - Itowns : increment semver MINOR version (proj4/sortable/es6)

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

# Extension Geoportail Itowns, version 2.2.2

**09/09/2019**
> Release Extension Geoportail Itowns

## Summary

* Compatibilité des extensions avec le Front End Angular.

## Changelog

* [Changed]

    - maj dependance *geoportal-access-lib* en version 2.1.4

* [Fixed]

    - [#242](https://github.com/IGNF/geoportal-extensions/issues/242) - Compatibilité
    des extensions avec le Front End Angular.

---

# Extension Geoportail Itowns, version 2.2.3

**24/09/2019**
> Release Extension Geoportail Itowns

## Summary

* maj dependance

## Changelog

* [Changed]

    - maj dependance *geoportal-access-lib* en version 2.1.5

* [Fixed]

    - [dev-workflow] correctifs sur les fichiers Webpack

---

# Extension Geoportail Itowns, version 2.2.4

**16/10/2019**
> Release Extension Geoportail Itowns

## Summary

* mise à jour *geoportal-access-lib* en version 2.1.6
* mise à jour de la dépendance iTowns en version 2.15.3 et de threejs en 0.109.0

## Changelog

* [Changed]

    - mise à jour *geoportal-access-lib* en version 2.1.6
    - mise à jour de la dépendance iTowns en version 2.15.3 et de threejs en 0.109.0

---

# Extension Geoportail Itowns, version 2.2.5

**22/11/2019**
> Release Extension Geoportail Itowns

## Summary

Mise à jour d'iTowns pour l'ajout de couche vecteur tuilé via les extensions Géoportail pour iTowns.

## Changelog

* [Added]
    * itowns en version 2.16
    * première gestion du vecteur tuilé
    * fix utillisation de fonctions dépréciées d'itowns

---

# Extension Geoportail Itowns, version 2.2.6

**24/01/2020**
> Release Extension Geoportail Itowns

## Summary

* Mise à jour des extensions pour utilisation d'iTowns 2.17

## Changelog

* [Changed]

	- Mise à jour des dépendances iTowns en version 2.17 et threejs 0.111.0

	- exemples itowns adaptés à itowns 2.17

---

# Extension Geoportail Itowns, version 2.2.7

**06/03/2020**
> Release Extension Geoportail Itowns

## Summary

Mise à jour des dépendances iTowns et ajout d'un sniffer de requêtes

## Changelog

[Added]

- Ajout d'un tag "gp-itowns-ext" dans les requêtes web WMTS/WMS

[Changed]

- Dependance itowns 2.19 + three 0.113.2

---

# Extension Geoportail Itowns, version 2.2.8

**26/03/2020**
> Release Extension Geoportail Itowns

## Summary

Correction majeure sur les interactions de la souris avec les controles 3D, et autres corrections mineures d'ergonomie.

## Changelog

* [Fixed]

    - Retrait d'appels à des fonctions dépréciées d'iTowns
    - Fix mauvais affichage du dom du mousePosition itowns
    - Fix mouseListeners inactifs sur les controls par encapsulation de la viewerDiv d'iTowns

---

# Extension Geoportail Itowns, version 2.2.9

**02/04/2020**
> Release Extension Geoportail Itowns

## Summary

* Release mineure sur le fixe de la version des dépendances

## Changelog

* [Changed]

    - choix fixé des versions des dépendances dans le package.json

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
# Extension Geoportail Itowns, version 2.3.1

**12/02/2021**
> Release Extension Geoportail Itowns

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

    - remplacement du parametre déprecié : projection -> crs

* [Removed]

* [Fixed]

    - fix sur la prise en compte du paramètre ssl=false du mousePosition (cfa88c4546cb146902357b0a75b790acfb405c7d)
    - correctif sur l'export de la version en mode module

* [Security]

---
# Extension Geoportail Itowns, version 2.3.2

**30/03/2021**
> Release Extension Geoportail itowns

## Summary

## Changelog

* [Added]

* [Changed]

    - mise à jour d'iTowns en version 2.30 (#292)

* [Deprecated]

* [Removed]

* [Fixed]

    - corrections des erreurs à partir de DeepScan (#288)
    - corrections syntaxiques eslint (da275a284a07ddd8e32753eda57ad4ef283d34fb et 306506a2255b2f05558ddcb05210dce39135c804)
    - correction de la synchronisation des couches vecteur tuilé avec leurs labels (#290)


* [Security]

---
# Extension Geoportail Itowns, version 2.3.3

**16/06/2021**
> Release Extension Geoportail itowns

## Summary

Mise à jour de l'extension géoportail pour iTowns avec itowns en version 2.33

## Changelog

* [Added]

* [Changed]

    - Utilisation d'iTowns 2.33 (#301)

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
