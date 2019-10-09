# Publication d'une nouvelle version des extensions

ex. les extensions Géoportail pour OpenLayers, version x.y.z.
(opération manuelle)

<!-- toc -->

- [1. Préparation des sources](#1-preparation-des-sources)
  * [a. Mise à jour de la version / date](#a-mise-a-jour-de-la-version--date)
  * [b. Compilation](#b-compilation)
  * [c. Jouer les tests](#c-jouer-les-tests)
  * [d. Visualiser la JSDOC](#d-visualiser-la-jsdoc)
  * [e. Visualiser les exemples](#e-visualiser-les-exemples)
  * [f. Mettre à jour le CHANGELOG](#f-mettre-a-jour-le-changelog)
  * [g. Commit](#g-commit)
- [2. Publication de la JSDOC](#2-publication-de-la-jsdoc)
- [3. Publication sur le GitHub (release)](#3-publication-sur-le-github-release)
- [4. Publication via NPM](#4-publication-via-npm)

<!-- tocstop -->

## 1. Préparation des sources

Sur la branche *master*

Se placer dans le projet *geoportal-extensions*, et recuperer le projet :

    git pull origin master
    ou
    git clone https://github.com/IGNF/geoportal-extensions.git

### a. Mise à jour de la version / date

Modifier le numéro de version dans le fichier *package.json* :

- Pour l'extension *Openlayers* : `"olExtVersion"`
- Pour l'extension *Leaflet* : `"leafletExtVersion"`
- Pour l'extension *Itowns* : `"itownsExtVersion"`

Ainsi que la date de publication dans le fichier *package.json* :
`"date"` (JJ/MM/AAAA)


### b. Compilation

Nettoyage par précaution des dossiers :

- dist/
- node_modules/
- jsdoc/
- samples/

Construire les bundles :

    npm run setup
    npm run build:ol:src
    npm run build:ol:prod
    npm run build:ol:dev

   ou

    ./build.sh -o

**NOTE**
> Le script *build.sh* realise le nettoyage, l'installation des modules et le build du projet...

Vérifier le contenu du dossier *./dist/openlayers/* :

    GpPluginOpenLayers(-src|-map).(css|js)


### c. Jouer les tests


En local : **tests unitaires**

    npm run test
    ou
    npm run test:serve

> consulter la page : http://localhost:9001/

### d. Visualiser la JSDOC

En local : **jsdoc**

    npm run doc:ol:serve

> consulter la page : http://localhost:9001/

### e. Visualiser les exemples

En local : **pages examples**

    npm run sample:ol:serve

> consulter la page : https://localhost:9001/

Tester les exemples **JSFiddle** (éventuellement).

**IMPORTANT**
> vérifier le numéro de version dans le bundle,
et dans les requêtes envoyées (il doit y avoir le tag gp-ol-ext=1.1.0 par exemple)

### f. Mettre à jour le CHANGELOG

cf. [howto-generate-changelog](howto-generate-changelog.md)

### g. Commit

Pousser les modifications

    git add -A
    git commit -m "openlayers release x.y.z"
    git push origin master


## 2. Publication de la JSDOC

Sur la branche *gh-pages*

Basculer sur la branche *gh-pages*

    git checkout gh-pages
    git pull origin gh-pages

Créer un dossier *openlayers-x.y.z/*

    mkdir -p openlayers-x.y.z/

Copier le contenu de *./jsdoc/openlayers* dans *openlayers-x.y.z/jsdoc/*
(doit contenir les fichiers html etc nécessaires à la consultation de la doc)

    cp -r jsdoc/openlayers openlayers-x.y.z/jsdoc

Copier aussi le contenu des bundles générés (/dist) dans la bonne arborescence

    cp -r dist/openlayers openlayers-x.y.z/dist


Modifier le lien symbolique *openlayers-x.y* pour qu'il pointe vers ce dossier :

    ln -fsn openlayers-x.y.z/ openlayers-x.y

Si besoin, modifier le lien symbolique *openlayers-latest* pour qu'il pointe vers le lien créé :

    ln -fsn openlayers-x.y/ openlayers-latest

**IMPORTANT**
> Vérifier que les liens ont été modifiés !

Pousser les modifications

    git add -A
    git commit -m "update jsdoc and bundles to release openlayers x.y.z"
    git push

**IMPORTANT**
> la nouvelle doc doit être disponible sur :
http://ignf.github.io/geoportal-extensions/openlayers-latest/jsdoc/

> les nouveaux bundles doivent être disponibles sur :
https://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers.js

## 3. Publication sur le GitHub (release)

Sur la branche *master*

Basculer sur la branche *master*

    git checkout master

Créer une **archive** à partir du dossier *./dist/openlayers*

    cd dist/
    zip -r GpPluginOpenLayers-x.y.z.zip openlayers/

Sur la page des **releases** du GitHub

    https://github.com/IGNF/geoportal-extensions/releases : "Draft a new release"
    Tag : "ol-x.y.z"
    Title : "Extension Geoportail OpenLayers, version x.y.z"
    Contenu : cf. **DRAFT_CHANGELOG.md**

**Joindre** l'archive

    GpPluginOpenLayers-x.y.z.zip (dans *./dist/*)

**Publier** la release

## 4. Publication via NPM

Sur la branche *master*

Se **logguer**

    npm login

**Authentification** NPM

    login : xxxxxxxxxx
    mdp   : xxxxxxxxxx
    email : xxxxxxxxxx

**IMPORTANT** : Se placer dans build/scripts/release et verifier le contenu des fichiers (bonnes versions geoportal-accesslib et extension à publier) :
- package-openlayers.json
- package-leaflet.json
- package-itowns.json

Executer le script de construction du package NPM en fonction du type de librairie :

    ```
    ./build-pack.sh -h
    [vendredi 29 mars 2019, 10:11:57 (UTC+0100)] BEGIN
    Usage :
        build-pack.sh - construction du package TGZ à publier dans NPM
        -h            Affiche cette aide.
        -o            build : Openlayers,
        -l            build : Leaflet,
        -i            build : Itowns,
        -a            build : All.
    Par defaut, le repertoire n'est pas supprimé
    (cf. l'option 'clean=true' dans le code).
    Le package validé, on se place dans le répertoire pour la publication :
      > npm login
      > npm publish
    ```

**IMPORTANT** : Se placer dans le dossier geoportal-extensions-openlayers

    cd geoportal-extensions-openlayers

Vérifier le contenu du dossier :

    dist/
    src/
    LICENCE.md
    package.json
    README.md

Et vérifier le bon contenu des fichiers (version des bundles, du README, contenu du package.json)

Une fois que tout est bon, lancer la publication sur NPM :

    npm publish

**IMPORTANT**
> controler la disponiblité sur npm : https://www.npmjs.com/package/geoportal-extensions-openlayers (peut prendre quelques minutes)
