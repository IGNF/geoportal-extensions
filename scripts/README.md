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

> **Note**
Mettre à jour un package :
    https://docs.npmjs.com/getting-started/publishing-npm-packages#updating-the-package

> **Erreur de publication**
```
    npm ERR! code ENEEDAUTH
    npm ERR! need auth auth required for publishing
    npm ERR! need auth You need to authorize this machine using `npm adduser`
    npm ERR! A complete log of this run can be found in:
    npm ERR!     /home/jpbazonnais/.npm/_logs/2017-10-20T13_35_32_337Z-debug.log
```
Ajouter l'utilisateur de publication :
```
npm adduser or login
Username: lowzonenose
Password:
Email: (this IS public) jpbazonnais@gmail.com
```
> **Depublication du package (complete)**
npm unpublish --force


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

**Synopsys**

> release.sh -h
Usage :
    release.sh
    h (--help)        Affiche cette aide.
    --verbose         Mode verbose.
    l (--leaflet)     Publication Leaflet (par defaut),
    o (--ol3)         Publication Openlayers,
    v (--version)     Numero de version du package à publier
    b (--build)   Execution de la tache de compilation,
    d (--data)    Execution de la tache de git-clone,
    j (--json)    Execution de la tache de creation des json,
    i (--info)    Execution de la tache de creation du fichier d'info,
    c (--commit)  Execution de la tache de git-push,
    t (--tag)     Execution de la tache de git-tag,
    p (--publish) Execution de la tache de publication npm et bower,
    C (--clean)   Execution de la tache de nettoyage.
Ex. release.sh -bdjicpC


Ce script consiste à executer les étapes suivantes :

* build - construction des binaires dans le répertoire *dist*
avec la commande *gulp*.

* json - création  des fichiers de configuration json (package et bower)
(copie avec maj de la version)

* data - copie des fichiers utiles dans le dépôt de publication avec *git*.
  * copie des sources,
  * copie des binaires,
  * copie des README, COMPILE, LICENCE
  * copie du CHANGELOG_DRAFT mais ne pas oublier de le mettre à jour au préalable

* commit - *commit* des modifications de la publication avec *git*.
  * tag - mise en place du *tag* de publication avec *git*.

* info - création d'un fichier d'information

* publish - publication via *npm* et *bower*

* clean - nettoyage du répertoire

## Scripts de publication des releases sur le gitHub

> Ex. release-github.sh

Ce script sert à mettre en place les releases dans le dépôt central.

Les étapes consistent à :

* build - construction des binaires dans le répertoire *dist*
avec la commande *gulp*.

* tag - mise en place du *tag* de publication avec *git*.

* publish/upload - via l'API **Github** (https://developer.github.com/v3/repos/releases/),
on dépose l'archive et le changelog sur le gitHub.
  * create - creation du répertoire temporaire de publication.
  * zip - construire les archives au format zip.
  * data - copie du CHANGELOG_DRAFT mais ne pas oublier de le mettre à jour au préalable

> **Note**
Le contenu du changelog est extrait du fichier *CHANGELOG.md* ou *CHANGELOG_DRAFT.md*.
Il faut donc au préalable le mettre à jour...

## Authentification sur le GitHub


On utilise l'authentification via Token Personal Access.
Comment creer un token :
    https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

Ensuite, ce token est stocké dans une variable d'environnement du systeme :
> export RELEASE_GITHUB_TOKEN="grsgz5r4gzr5g4er654er54er4tyer5646y"

> **TODO** authentification github pour 'git push' : SSH ou Token ?
    https://help.github.com/articles/connecting-to-github-with-ssh/
    https://help.github.com/articles/which-remote-url-should-i-use/#cloning-with-ssh-urls
    https://docs.microsoft.com/en-us/vsts/git/use-ssh-keys-to-authenticate
    https://developer.github.com/v3/guides/basics-of-authentication/
    https://developer.github.com/v3/guides/managing-deploy-keys/
    https://help.github.com/articles/git-automation-with-oauth-tokens/

> **TODO** authentification github pour l'API ?
   https://developer.github.com/v3/auth/
   https://developer.github.com/v3/repos/releases/#create-a-release

## Authentification sur le NPM

On utilise l'authentification basique avec les informations suivantes :
* Username
* Password
* Email

La valeur du *Password* est stocké dans une variable d'environnement du systeme :
> export RELEASE_NPMJS_PASSWORD="f&&"544"

> **TODO** authentification par Token ?
export RELEASE_NPMJS_TOKEN="00000000-0000-0000-0000-000000000000"

> **TODO** persistence de l'authentification pour 'npm publish' ?
