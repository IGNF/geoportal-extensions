
# Compilation du projet

[![Gulp build](https://img.shields.io/badge/build%20with-GULP-brightgreen.svg)](https://img.shields.io/badge/build%20with-GULP-brightgreen.svg)

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

## Commande de compilation

### Installation des dépendances via NPM

**ouvrir une console :**

    npm install

> **Note :** --*Windows only!*--
Si votre connexion ne permet pas de télécharger _PhantomJS_, il est possible de
le récuperer sur cette URL : http://phantomjs.org/download.html
Puis, relancer l'installation...

> **Attention :** --*Windows only!*--
Pour installation manuelle, ne pas oublier de mettre l'executable _phantomjs.exe_
dans l'environnement d'execution de windows (ex. https://www.java.com/fr/download/help/path.xml)

### Compilation via GULP

**ouvrir une console :**

    gulp [--production] [--leaflet] [--ol3]

Les *bundles* sont disponibles dans le répertoire :

```
> gulp --production --leaflet --ol3
> gulp publish
> tree dist/
dist/
├── leaflet
│   ├── GpPluginLeaflet.css
│   ├── GpPluginLeaflet.js
│   └── img
│       ├── GPlayerInfoClose.png
│       ├── GPlayerInfo.png
│       ├── GPlayerTools.png
│       ├── GPopacitySlider.png
│       ├── GPshowLayersList.png
│       └── ...
└── ol3
    ├── GpPluginOl3.css
    ├── GpPluginOl3.js Leaflet
    └── img
        ├── GPlayerInfoClose.png
        ├── GPlayerInfo.png
        ├── GPlayerTools.png
        ├── GPopacitySlider.png
        ├── GPshowLayersList.png
        └── ...
```

#### Erreur de fin de lignes

Si vous avez des erreurs de parsing tel que **Invalid line break**, vous devez
modifier le paramètre du fichier _.jscs_ :
> validateLineBreaks : { character : "CRLF" }

#### Exécution de la JSDOC

Sous *Windows*, il est possible que la *JSDoc* ne soit pas compilée correctement
(problème de *path* du binaire), on peut l’exécuter manuellement :

**ouvrir une console :**

    node_modules\.bin\jsdoc -c jsdoc.json

#### Publication

**ouvrir une console :**

    gulp publish

### Exécution des exemples *Leaflet*

**ouvrir une console :**

    gulp server --leaflet

Le navigateur s'ouvre sur la page des exemples sur l'URL suivante :
http://localhost:9001/samples/index-leaflet.html

### Exécution des exemples *OpenLayers*

**ouvrir une console :**

    gulp server --ol3

Le navigateur s'ouvre sur la page des exemples sur l'URL suivante :
http://localhost:9001/samples/index-ol3.html

### Exécution des tests

**ouvrir une console :**

    gulp test

> **Note :**
> Pas de taches d’exécution des tests unitaires en mode **browser**
(uniquement en mode **console**)
