(obselète)

# Publication des releases

A partir de ce depot (central), on va publier sur **npm** ainsi que sur **bower (obselète)**,
les **binaires** pour **OpenLayers** et **Leaflet**.

Les publications sont déposées dans des dépôts séparés. Et ils contiennent les
fichiers binaires ainsi que des fichiers d'information (LICENCE, README, ...)

La publication est gérée par un script (bash).

Ce script consiste à *construire* les binaires, *copier* les fichiers utiles dans le depot,
*tagger* la publication et enfin, *publier*...

## Notes sur la Publication via bower (howto) !!!DEPRECIATE!!!

**Liens utiles**

    project/howto - http://www.mimiz.fr/blog/publier-package-sur-bower/
    spec/json - https://github.com/bower/spec/blob/master/json.md
    register/unregister - https://bower.io/docs/creating-packages/

> **Commande**
bower register geoportal-extensions-openlayers http://github.com/IGNF/geoportal-extensions-openlayers.git

## Notes sur la Publication via Yarn (howto)

**Liens utiles**

    accueil - https://yarnpkg.com/fr/
    installation - https://yarnpkg.com/fr/docs/install
    commande publish - https://yarnpkg.com/fr/docs/cli/publish
    publication - https://yarnpkg.com/fr/docs/publishing-a-package

> **Commande**
yarn publish

> **Note**
> La publication sous Yarn est automatique car elle se base sur la publication du
registre NPM !

## Notes sur la Publication via npm (howto)

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
Username: ignfgeoportail
Password: voir sur redmine
Email: (this IS public) contact.geoservices@ign.fr
```
Vérifier son .npmrc -> si erreur, essayer avec strict-ssl à false

> **Depublication du package (complete)**
npm unpublish --force


## Mise en place du Depot de publication

Les publications sont déposées dans des dépôts séparés :

    geoportal-extensions-openlayers
    geoportal-extensions-leaflet

Ces depots contiennent les fichiers suivants :

    bower.js (obselète)
    dist/.js
    dist/.css
    dist/images
    CHANGELOG.md (obselète)
    LICENCE.md
    package.json
    README.md

> **TODO**
Le dépôt est à initialiser manuellement pour une 1ere utilisation !
Le dépôt est à mettre vide, puis modifier les settings (no issues, ...)

## Scripts de construction des releases (+ publication)

**Synopsys**

> release.sh -h
Usage :
    release.sh
    h (--help)    Affiche cette aide.
    --verbose     Mode verbose.
    l (--leaflet) Publication Leaflet (par defaut),
    o (--ol)      Publication Openlayers,
    b (--build)   Execution de la tache de compilation,
    d (--data)    Execution de la tache de git-clone,
    j (--json)    Execution de la tache de creation des json,
    c (--commit)  Execution de la tache de git-push,
    t (--tag)     Execution de la tache de git-tag,
    p (--publish) Execution de la tache de publication npm et bower (obselète),
    C (--clean)   Execution de la tache de nettoyage.
    Ex. Options longues : release.sh --leaflet
                      --build --data --json
                      --commit=false --tag=false --publish=false
                      --clean=true
    Ex. Options courtes : release.sh -l
                      -bdji
                      -c false -t false -p false
                      -C true

Ce script consiste à executer les étapes suivantes :

* build - construction des binaires dans le répertoire *dist*
avec la commande *gulp*.

* json - mise à jour des fichiers de configuration json (package et bower (obselète))
(**INFO** : maj de la version via le package.json)

* data - copie des fichiers utiles dans le dépôt de publication avec *git*.
  * copie des binaires,
  * copie des README, COMPILE, LICENCE

* commit - *commit* des modifications de la publication avec *git*.

* tag - mise en place du *tag* de publication avec *git*.

* publish - publication via *npm* et *bower (obselète)*

* clean - nettoyage du répertoire

> **A faire au préalable**
>   - La version de la publication est extraite du fichier *package.json*.
>   - Pour l'authentification, il faut renseigner soit des *variable d'environnement*, ou
>   soit mettre à disposition des *clefs SSH* (cf. authentification)

### Dockerfile

**Construction de l'image**

> docker build -t geoportal-extensions .

> **Note**
> le proxy est à renseigner dans le fichier Dockerfile

**Execution de l'image**

Par defaut :
> docker run -it --rm geoportal-extensions

Avec un acces au shell :
> docker run -it --rm geoportal-extensions bash

> **Note**
> les params d'authentification sont à renseigner dans le fichier Dockerfile

## Scripts de publication des releases sur le gitHub

**Synopsys**

> release-github.sh -h

Ce script sert à mettre en place les releases dans le dépôt central.

Les étapes consistent à :

* build - construction des binaires dans le répertoire *dist*
avec la commande *gulp*.

* tag - mise en place du *tag* de publication avec *git*.

* publish/upload - via l'API **Github** (https://developer.github.com/v3/repos/releases/),
on dépose l'archive et le changelog sur le gitHub.
  * create - creation du répertoire temporaire de publication.
  * zip - construire les archives au format zip.
  * data - copie du CHANGELOG_DRAFT (**INFO** : ne pas oublier de le mettre à jour au préalable)

> **A faire au préalable**
>   - Le contenu du changelog est extrait du fichier *CHANGELOG_DRAFT.md*.
>   - La version de la publication est extraite du fichier *package.json*.
>   - Pour l'authentification, il faut renseigner soit des *variable d'environnement*, ou
>   soit mettre à disposition des *clefs SSH* (cf. authentification)

## Notes sur l'Authentification sur le GitHub

Pour/Contre :
    https://developer.github.com/v3/guides/managing-deploy-keys/

### Token Personal Access.

On utilise l'authentification via Token Personal Access.
    https://help.github.com/articles/git-automation-with-oauth-tokens/

Comment creer un token :
    https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

Ensuite, ce token est stocké dans une variable d'environnement du systeme :
> export RELEASE_GITHUB_TOKEN="grsgz5r4gzr5g4er654er54er4tyer5646y"

### SSH

Authentification github SSH pour 'git push' (**procedure de creation des clefs**):
    http://www.linux-france.org/prj/edu/archinet/systeme/ch13s03.html
    https://help.github.com/articles/connecting-to-github-with-ssh/
    https://help.github.com/articles/which-remote-url-should-i-use/#cloning-with-ssh-urls    

### Authentification API github

On utilise l'authentification via Token Personal Access.

> **TODO** utilisation de l'authentification github pour l'API via SSH ?
   https://developer.github.com/v3/auth/
   https://developer.github.com/v3/repos/releases/#create-a-release

## Notes sur l'Authentification sur le NPM

On utilise l'authentification basique avec les informations suivantes :
* Username
* Password
* Email

La valeur du *Password* est stocké dans une variable d'environnement du systeme :
> export RELEASE_NPMJS_PASSWORD="f&&"544"

> **TODO** authentification par Token ?
export RELEASE_NPMJS_TOKEN="00000000-0000-0000-0000-000000000000"
