# Migration ES6

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

cf.https://eslint.org/

revoir toutes les règles !

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

## JSDOC

### génération de la JSDOC

**OK!**

### client web pour l'affichage

**TODO!**

## LES EXEMPLES

### génération des EXEMPLES

**TODO!**

*templatisation* des exemples avec
- **gulp** ou
- un **loader de webpack** ou
- un **plugin de webpack** ou
- un **plugin maison**

Le choix a été fait d'utiliser un **plugin maison** !

### client web pour l'affichage

**TODO!**

## LES TESTS

### génération des TESTS

**TODO!**

### client web pour l'affichage

**TODO!**

## LES TESTS DE RENDU

**OK!**

**Warning!**
> on laisse les tests sous gulp...,
et on ne les intègre pas à webpack !

## LA DOCUMENTATION

**OK!**

## L'INTERFACE NPM

**TODO!**

## TRAVIS

**OK!**

**Warning!**
> intégration des tests et des tests de rendu à mettre en place !!!

## LA STRUCTURE DES CONFIG WEBPACK

**TODO!**

configurations multiples ou un seul *webpack.config.js* ?
