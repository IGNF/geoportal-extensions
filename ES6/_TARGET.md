# MIGRATION WEBPACK

Migration des projets
- *geoportal-access-lib* (en cours de finalisation)
- *geoportal-extensions*

**Note**
> Le projet SDK est peut-être à migrer ?

## Interface : NPM

L'interface utilisateur pour le developpeur est à placer dans le fichier **package.json**,
dans la rubrique *scripts*.


L'appel des commandes via NPM :
> npm run target -- option

> ex. npm run build -- --env.production

**Warning**
> Ne pas oublier "--" entre la commande et les options !


Liste des targets par defaut :
- clean
- build
- test
- sample
- (doc)

> ex. npm run test


Liste des targets (qui permet de lancer un navigateur) par defaut :
- test:serve
- sample:serve
- doc:serve

> ex. npm run test:serve


Liste des options par defaut :
- --env.production
- --env.clean

> ex. npm run build -- --env.production --env.clean


Extrait du fichier **package.json** du projet *geoportal-access-lib* :

``` json
"scripts": {
    "clean":  "echo \"Warning: no yet implemented!\" && exit 1",
    "setup": "npm install",
    "build": "webpack",
    "test": "mocha-webpack --webpack-config webpack.test.js --glob \"test_*.js\" test/spec/",
    "test:serve": "webpack-dev-server --config webpack.test.serve.js",
    "sample": "gulp sample",
    "sample:serve": "webpack-dev-server --contentBase samples --port 9001 --open",
    "doc": "echo \"Warning: no yet implemented!\" && exit 1",
    "doc:serve": "webpack-dev-server --contentBase jsdoc --port 9001 --open"
  }
```

**Warning**
> Il est possible d'utiliser un script pour des opérations plus complexes mais...
> risque d'incompatibilité avec l'env. windows !



## Les targets

un fichier webpack.config.js pour toutes les opérations de build.

un fichier webpack.test.serve.js pour l'execution des tests dans
un navigateur (orienté dev.).

un fichier webpack.test.js pour l'execution des tests dans un terminal.

**TODO**
> Evolution à faire.
> il faut s'affranchir du fichier *webpack.test.js*...,
> et l'integrer dans le fichier de config. principal...

### build (target principale)
on utilise webpack pour l'execution :
  - clean des répertoires temporaire si option --env.clean
  - bundle
  - sourcesmap
  - minification si option --env.production
  - jsdoc
  - exemples (template) : cf. target *sample*
  - tests unitaire : cf. target *test*

Les bundles sont placés dans le répertoire *./dist*.

La target *build* construit le bundle de dev. par défaut.
Pour le bundle de prod., ajouter l'option --env.production.

### clean (orienté maintenance)

c'est une commande de nettoyage des répertoires temporaires à lancer avant toute opération de compilation :
- jsdoc/
- dist/
- samples/
- package-lock.json
- node_modules/
- ...

Sous forme de script : bash ou gulp ou nodejs ou commande systeme...

**Warning**
> Si commande systeme, incompatibilité avec un env. windows !

> ex. rm -rf jsdoc dist samples

### test - test:serve (orienté dev.)

on utilise webpack avec mocha pour les tests en mode terminale.

on utilise webpack-dev-server pour l'execution dans un navigateur.

**TODO**
> prévoir les tests fonctionnels ou de rendu...
> dans une autre target...

### sample - sample:serve (orienté dev.)

on utilise gulp pour la transformation des templates dans le répertoire *./samples*

on utilise webpack-dev-server pour l'execution dans un navigateur

**TODO**
> Evolution à faire...
> utilisation du loader de template de webpack au lieu de gulp

### doc - doc:serve
on utilise webpack.

Lors du build, on génére la jsdoc dans le répertoire *./jsdoc*.

on utilise webpack-dev-server pour l'execution dans un navigateur.

**TODO**
> target *doc* non active...



## Les options

### --env.production
option de minification du bundle lors du build
> ex. npm run build -- --env.production

option utilisée lors de construction des exemples
afin d'ajouter le bundle minifié
> ex. npm run sample -- --env.production

### --env.clean (orienté maintenance)
nettoyage des répertoires temporaires de build
> ex. npm run build -- --env.clean
> ex. npm run sample -- --env.clean


Pour le projet *geoportal-extensions*, on peut y ajouter les options suivantes :
- --env.leaflet
- --env.ol
- --env.itowns
- --env.mix (?)

### --env.leaflet
**TODO**

### --env.ol
**TODO**

### --env.itowns
**TODO**

### --env.mix
**TODO**


## Structure des fichiers Webpack

un fichier *webpack.config.js* pour toutes les opérations de build communes :
  - clean si option --env.clean
  - bundle
  - sourcesmap
  - minification si option --env.production
  - jsdoc
  - exemples (template)
  - tests unitaire

un fichier *webpack.config.leaflet.js* pour une config leaflet.

un fichier *webpack.config.ol.js* pour une config openlayers.

un fichier *webpack.config.itowns.js* pour une config itowns.

un fichier *webpack.config.mix.js* pour une config mixte avec itowns et openlayers.

un fichier *webpack.serve.js* pour une config serveur (orienté dev.)
un fichier *webpack.test.serve.js* pour l'execution des tests dans un navigateur (orienté dev.)

**Note**
> Il n'y a pas de tests unitaires sur les extensions mais des tests de rendus.

> On peut utiliser l'existant avec gulp...


### Aspect technique

cf. https://github.com/survivejs/webpack-merge

Ex. d'utilisation de config : 
https://github.com/survivejs/site/blob/master/webpack.config.js

En fonction de l'option, (ex. --env.leaflet) sur le build (ex. npm run build -- --env.leaflet),
on merge les configs webpack :
> merge( webpack.config.js, webpack.config.leaflet.js )

Idem pour la config serveur :
  > merge( webpack.config.js, webpack.config.leaflet.js, webpack.test.serve.js)
