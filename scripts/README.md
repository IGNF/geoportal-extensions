# Publication des releases

A partir de ce depot (central), on va publier sur **npm** ainsi que sur **bower**,
les **binaires** et les **sources** pour **OpenLayers** et **Leaflet**.

Les publications sont déposées dans des dépôts séparés. Et ils contiennent les
fichiers binaires, les sources ainsi que des fichiers d'information (LICENCE, README, ...)

La publication est gérée par un script (bash ou node).

Ce script consiste à *construire* les binaires, *copier* les fichiers utiles dans le depot,
*tagger* la publication et enfin, *publier*...

## Publication via bower

**Liens utiles**

    project/howto - http://www.mimiz.fr/blog/publier-package-sur-bower/
    spec/json - https://github.com/bower/spec/blob/master/json.md
    register/unregister - https://bower.io/docs/creating-packages/

> **Commande**
bower register geoportal-extensions-openlayers http://github.com/IGNF/geoportal-extensions-openlayers.git

## Publication via npm

**Liens utiles**

https://docs.npmjs.com/getting-started/publishing-npm-packages

> **Commande**
npm publish

avec la configuration dans le **package.json**

    "name": "geoportal-extensions-openlayers",
    "repository": {
      "type": "git",
      "url": "https://github.com/IGNF/geoportal-extensions-openlayers.git"
    },

## Depot de publication

Les publications sont déposées dans des dépôts séparés :

    geoportal-extensions-openlayers
    geoportal-extensions-leaflet

Ces depots contiennent les fichiers suivants :

    bower.json
    dist/.js
    dist/.css
    dist/images
    CHANGELOG.md
    LICENCE.md
    package.json
    README.md
    [ src/.js ]
    summary.json <!-- meta information de la publication -->

> **TODO**
Le dépôt est à initialiser manuellement pour une 1ere utilisation !


## Scripts de construction des releases (+ publication)

**Liens utiles**

    https://gist.github.com/bclinkinbeard/1331790
    https://gist.github.com/foca/38d82e93e32610f5241709f8d5720156
    https://github.com/aktau/github-release
    https://kaspars.net/blog/web-development/create-release-zip-git-tags
    https://github.com/Esri/esri-leaflet/blob/master/scripts/release.sh

**Synopsys**

> Ex. releases.sh [--leaflet][--ol] --user= --password=

Ce script consiste à executer les étapes suivantes :

* build - construction des binaires dans le répertoire *dist*
avec la commande *gulp*.

* json - création des fichiers de configuration json (package et bower)

* copy - copie des fichiers utiles dans le dépôt de publication avec *git*.
  * copie des sources, des binaires, README, COMPILE, LICENCE
  * copie du CHANGELOG mais mis à jour au préalable

* tag - mise en place du *tag* de publication avec *git*.

* info - création d'un fichier d'information

* publish - publication via *npm* et *bower*

> **FIXME**
A t on besoin de générer un changelog automatique ?

## Scripts de publication des releases sur le gitHub

> Ex. publish.sh [--leaflet][--ol]

Ce script sert à mettre en place les releases dans le dépôt central.

Les étapes consistent à :

* build - construction des binaires dans le répertoire *dist*
avec la commande *gulp*.

* zip - construire les archives au format zip.

* tag - mise en place du *tag* de publication avec *git*.

* publish - via l'API **Github** (https://developer.github.com/v3/repos/releases/),
on dépose les archives et le changelog sur le gitHub.

> **Note**
Le contenu du changelog est extrait du fichier *CHANGELOG.md* ou *CHANGELOG_DRAFT.md*.
Il faut donc au préalable le mettre à jour...
