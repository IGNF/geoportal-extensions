# Migration ES6

Pour le moment, on fait un fichier webpack par projet (ol, Leaflet, itowns et mixte)
afin que l'on ne se marche pas dessus.

Dans un *1er temps*, on s'intéresse uniquement à la création du bundle.

Les opérations annexes (jsdoc, tests, exemples,...) viendront dans un *second temps*.

Et, on *finit* par la mutualisation des fichiers webpack et la finalisation pour mise en production (passage en version 2.0.0) avec interface de compilation pour l'utilisateur (cf. TARGET.md).

Avant passage en publication, il faudra impérativement valider notre travail avec le SDK !

Pour commencer, j'ai mis en place une base de travail avec le sous projet openlayers.
Les sources sont migrées en ES6 avec un webpack et 3 exemples fonctionnels
dans un environnement Web, amd et ES6 pour valider le bundle.

**Warning**
> utilisation de la version de dev. non publiée : 2.0.0 de l'API des services !

## Howto

1. migration AMD -> ES6

  ex. commande de migration :
> amdtoes6 -d src/Ol3 -o src-es6/OpenLayers -b

2. modifier les chemins des imports

3. corrections diverses dans le code
  - woodman -> loglevel
  - ...

4. dupliquer le webpack de base pour générer un bundle

5. builder le projet  *geoportal-access-lib* de la branche *migrate-es6* :

  > npm install

  > cd ./node_modules/geoportal-access-lib/

  > nm run setup && npm run build && npm run build -- --env.production

6. valider avec des exemples (cf. exemples de bases)



## Openlayers

**OK!** pour la creation du bundle uniquement !

**Warning**
> On en profite pour supprimer les réf. ol3 -> openlayers !

**TODO**
- CSS et images..



## Leaflet

**OK!** pour la creation du bundle uniquement !

**TODO**
- CSS et images..



## Itowns

TODO...

## Mix Openlayers/Itowns

TODO...


# FINALISATION DU PROJET

## ESLINT

revoir les règles !

## CSS/images

## Minification

**Warning**
> implementation differente entre les versions de webpack !

## Environnement de production / developpement

En version 4 de webpack, on a le flag **--mode production**.
En version 3 de webpack, on a du code js à placer pour utiliser **--env.production**.

## LICENCES

Licences *multiples* à ajouter aux bundles !

## JSDOC

## LES EXEMPLES

*templatisation* des exemples avec **gulp** ou un **loader de webpack** ?

## LES TESTS DE RENDU

on laisse les tests sous gulp...

## UPDATE : aide + doc
- COMPILE.md
- README.md
- ...

## INTERFACE NPM
(cf.TARGET.md)

## TRAVIS

## STRUCTURE DES WEBPACK

configurations multiples ou un seul *webpack.config.js* ?
