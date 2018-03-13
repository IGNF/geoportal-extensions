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

7. valider le bundle en l'intégrant dans le SDK !

## Avancement

### Openlayers

**OK!**

**Warning**
> cf. FIXME.md
- On en profite pour supprimer les réf. ol3 -> openlayers !

### Leaflet

**OK!**

### Itowns

**OK!**

**Warning**
> cf. FIXME.md
- Itowns n'est plus une dependance des modules,
mais on choisie de faire appel à la variable globale itowns !

### Mix Openlayers/Itowns

**OK!**

**Warning**
> cf. FIXME.md
- On renomme le bundle en supprimant la ref ol3 !
- Itowns n'est plus une dependance des modules,
mais on choisie de faire appel à la variable globale itowns !


# FINALISATION DU PROJET

## ESLINT

**TODO!**

revoir les règles !

## CSS/images

**OK!**

## Minification

**OK!**

**Warning**
> implementation differente entre les versions de webpack !

## Environnement de production / developpement

En version 4 de webpack, on a le flag **--mode production**.
En version 3 de webpack, on a du code js à placer pour utiliser **--env.production**.

## LICENCES

**OK!**

Licences *multiples* à ajouter aux bundles !

## JSDOC

**NOK!**
> cf. FIXME.md

## LES EXEMPLES

**TODO!**

*templatisation* des exemples avec **gulp** ou un **loader de webpack** ?

## LES TESTS DE RENDU

**OK!**

**Warning!**
> on laisse les tests sous gulp..., et on ne les intègre pas à webpack !

## UPDATE : aide + doc

**OK!**

- COMPILE.md
- README.md
- ...

## INTERFACE NPM

**TODO!**

## TRAVIS

**TODO!**

## STRUCTURE DES WEBPACK

**TODO!**

configurations multiples ou un seul *webpack.config.js* ?
