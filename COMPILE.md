# Compilation du projet

[![WEBPACK build](https://img.shields.io/badge/build%20with-WEBPACK-brightgreen.svg)](https://img.shields.io/badge/build%20with-WEBPACK-brightgreen.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

<!-- toc -->

- [Prérequis (outils)](#prerequis-outils)
  * [Réglage des outils](#reglage-des-outils)
    + [Gestion des fins de lignes (Git)](#gestion-des-fins-de-lignes-git)
    + [Configuration du proxy d'entreprise](#configuration-du-proxy-dentreprise)
  * [Utilisation du terminal (Console Git ou NodeJS)](#utilisation-du-terminal-console-git-ou-nodejs)
- [Commandes via NPM](#commandes-via-npm)
  * [Installation des dépendances](#installation-des-dependances)
  * [Installation d'une version spécifique d'une dépendance](#installation-dune-version-specifique-dune-dependance)
- [Compilation](#compilation)
- [JSDOC](#jsdoc)
  * [Construction de la JSDOC](#construction-de-la-jsdoc)
  * [Ouvrir la JSDOC sur un navigateur](#ouvrir-la-jsdoc-sur-un-navigateur)
- [Les exemples](#les-exemples)
  * [Construction des exemples](#construction-des-exemples)
  * [Ouvrir les exemples sur un navigateur](#ouvrir-les-exemples-sur-un-navigateur)
- [Les tests](#les-tests)
  * [Unitaires](#unitaires)
  * [Fonctionnels](#fonctionnels)
  * [Couverture du code](#couverture-du-code)
  * [Tests de rendu](#tests-de-rendu)
- [Carte des sources et des dépendances](#carte-des-sources-et-des-dependances)
  * [Analyse (The Official Analyse Tool)](#analyse-the-official-analyse-tool)

<!-- tocstop -->

## Prérequis (outils)

* nodeJS (https://nodejs.org/en/download/)
* git (https://git-scm.com/downloads)
* git gui (*facultatif*)
* tortoiseGit (*facultatif*)
* Visual Studio Code / VSCode (*facultatif*)

### Réglage des outils

#### Gestion des fins de lignes (Git)

--*Windows only!*--

**ouvrir une console :**

    git config core.autocrlf false
    git rm --cached -r
    git reset --hard

> **Note :**
Possibilité de le faire via l'editeur _Visual Studio Code_ dans le menu
_Fichier > Préférences > Paramètres utilisateurs_
Pour plus d'information, cf. https://code.visualstudio.com/docs/getstarted/settings

#### Configuration du proxy d'entreprise

**ouvrir une console :**

    npm config set proxy http://proxy.company.com:8080
    npm config set https-proxy http://proxy.company.com:8080

ou

sous *Windows*, modifier le fichier _C:\\Users\< USER >\\.npmrc_
(sous *Linux*, on utilise le fichier _$HOME/.npmrc_ )
avec les lignes suivantes :

    proxy=http://proxy.company.com:8080
    https-proxy=http://proxy.company.com:8080
    https_proxy=http://proxy.company.com:8080

ou

sous *Windows*, déclarer les variables d'environnement suivantes :

    HTTP_PROXY
    HTTPS_PROXY

### Utilisation du terminal (Console Git ou NodeJS)

--*Windows only!*--

**Git** et **NodeJS** fournissent leur propre console.
L'utilisation de ces consoles permet d'avoir un environnement complet (ex. variables systèmes), mais il est tout à fait possible d'utiliser la console de *Windows* (CMD).

> **Note :**
Possibilité d'utiliser le terminal de _Visual Studio Code_ dans le menu
_Affichage > Integred Terminal_
Pour plus d'information, cf. https://code.visualstudio.com/docs/editor/integrated-terminal

## Commandes via NPM

Liste des targets disponibles :

    npm run <target> <option>
        target : (clean), setup,
                 build[:dev|:prod|:ol[:dev|:prod]|:leaflet[:dev|:prod]|:itowns[:dev|:prod]],
                 sample, (doc)
                 sample:serve, doc:serve
        option : --env.production,
                 --env.development,
                 (--env.clean)

### Installation des dépendances

**ouvrir une console :**

    npm install

Si vous passez par les commandes du package.json, les dépendances sont installées via
la target suivante :

**ouvrir une console :**

    npm run setup


### Installation d'une version spécifique d'une dépendance

Orienté developpement :

**ouvrir une console :**

    // branche master du depot "IGNF/geoportal-access-lib" (dev)
    npm install https://github.com/IGNF/geoportal-access-lib/tarball/master --no-save

Upgrade de version :

**ouvrir une console :**

    // publication openlayers en version 4.4.4
    npm install openlayers@4.4.4 --no-save


## Compilation

**ouvrir une console (ex. avec openlayers) :**

    npm run build:ol
    ou npm run build:ol:prod
    ou npm run build:ol:dev
    ou npm run build:ol -- --env.production
    ou npm run build:ol -- --env.development

Les *bundles* sont disponibles dans le répertoire :

	dist/openlayers/GpPluginOpenLayers.js
    dist/openlayers/GpPluginOpenLayers.css
	dist/openlayers/GpPluginOpenLayers-src.js
	dist/openlayers/GpPluginOpenLayers-src.css
    dist/openlayers/GpPluginOpenLayers-map.js
	dist/openlayers/GpPluginOpenLayers-map.css

Les sources sont validées (jshint, jscs et/ou eslint).
La jsoc, les tests et les exemples sont générés.

Il est possible de lancer la génération des bundles pour l'ensemble des extensions :

    // génération des bundles en mode développement (cad sourcemap)
    npm run build:dev
    // génération des bundles en mode production
    npm run build:prod
    // génération des bundles en mode sources
    npm run build:src

Ou on lance tout...

    npm run build

## JSDOC

### Construction de la JSDOC

La jsdoc est générée lors du build dans le répertoire *jsdoc*.

Sous *Windows*, il est possible que la *JSDoc* ne soit pas compilée correctement
(problème de *path* du binaire), on peut l’exécuter manuellement :

**ouvrir une console :**

    node_modules\.bin\jsdoc -c jsdoc.json

### Ouvrir la JSDOC sur un navigateur

**ouvrir une console :**

    npm run doc:serve (par defaut, ol)
    ou npm run doc:ol:serve
    ou npm run doc:leaflet:serve
    ou npm run doc:itowns:serve

Le navigateur s'ouvre sur la page de la JSDOC sur l'URL suivante :
http://localhost:9001/

## Les exemples

Les exemples sont générées lors du build dans le répertoire *samples*.

Mais il est aussi possible de les executer autrement :

**ouvrir une console :**

    npm run sample (par defaut, ol)
    ou npm run sample:ol:serve
    ou npm run sample:leaflet:serve
    ou npm run sample:itowns:serve

Le navigateur s'ouvre sur la page des exemples sur l'URL suivante :
https://localhost:9001/

## Les tests

### Unitaires

**ouvrir une console :**

    npm run test

### Fonctionnels

**ouvrir une console :**

    npm run test:serve

Le navigateur s'ouvre sur la page des tests sur l'URL suivante :
http://localhost:9001/

**Note**
> les tests unitaires sont disponibles aussi sur la page de Tests

### Couverture du code

**ouvrir une console :**

    npm run cover

**Résultats :**

    -----------------------------|----------|----------|----------|----------|
    File                         |  % Stmts | % Branch |  % Funcs |  % Lines |
    -----------------------------|----------|----------|----------|----------|
    All files                    |    20.57 |    18.38 |    14.96 |    20.57 |
     Controls                    |    16.06 |     8.37 |    11.96 |    16.06 |
      AttributionDOM.js          |    96.77 |       50 |    85.71 |    96.77 |
      DrawingDOM.js              |    42.31 |    36.26 |    36.67 |    42.31 |
      ElevationPathDOM.js        |    80.58 |    29.17 |    55.56 |    80.58 |
      GetFeatureInfoDOM.js       |    96.55 |       50 |       80 |    96.55 |
      IsoDOM.js                  |    70.08 |    31.58 |    41.51 |    70.08 |
      LayerImportDOM.js          |     0.34 |        0 |        0 |     0.34 |
      LayerSwitcherDOM.js        |     0.39 |        0 |        0 |     0.39 |
      LocationSelectorDOM.js     |     0.83 |        0 |        0 |     0.83 |
      MeasureAreaDOM.js          |     3.57 |        0 |        0 |     3.57 |
    (...)

Possibilité d'ouvrir ensuite les résultats dans un navigateur :

    (http|file)://{URL|PATH}/coverage/lcov-report/index.html

Explications :

    statements coverage :
    http://istqbexamcertification.com/what-is-statement-coverage-advantages-and-disadvantages/
    branchs coverage :
    http://istqbexamcertification.com/what-is-decision-coverage-its-advantages-and-disadvantages/
    (...)

### Tests de rendu

**ouvrir une console :**

    cd test_rendering
    npm install
    node server.js
    npm run test[:ol|:it|:ll]

## Carte des sources et des dépendances

cf. https://github.com/webpack-contrib/webpack-bundle-analyzer

**ouvrir une console :**

    sudo npm install -g webpack-bundle-analyzer
    webpack-bundle-analyzer build/map/map-ol.json

Le navigateur s'ouvre  sur l'URL suivante :
http://localhost:8888/

### Analyse (The Official Analyse Tool)

Aller sur l'URL suivante :
http://webpack.github.io/analyse/

puis, utiliser le fichier *map-[ol|it|ll].json*
