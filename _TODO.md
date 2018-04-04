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

**TODO: en cours...**

cf. https://eslint.org/
cf. https://github.com/standard/eslint-config-standard
cf. https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json

revoir toutes les règles !
on passe sur des règles **standard** avec qq modifications...

## CSS/images

**OK!**

## Minification

**OK!**

**Warning**
> implementation differente entre les versions de webpack !

## Environnement de production / developpement

**OK!**

En version 4 de webpack, on a le flag **--mode production**.
En version 3 de webpack, on a du code js à placer pour utiliser **--env.production**.

## LICENCES

**OK!**

## JSDOC

### génération de la JSDOC

**OK!**

### client web pour l'affichage

**OK!**

## LES EXEMPLES

### génération des EXEMPLES

**OK!**

**Warning**
> *templatisation* des exemples avec un **plugin maison** !
> mais publication du plugin ?

### client web pour l'affichage

**OK!**

## LES TESTS

### génération des TESTS

**TODO: en cours...**

Liste des tests à faire...

    src/
    ├── Common
    │   ├── Controls     <- OK mais à completer...
    │   └── Utils        <- OK
    ├── Itowns
    │   ├── Controls
    │   │   └── Utils
    │   └── CRS
    ├── Leaflet
    │   ├── Controls     <- OK mais à completer...
    │   │   └── Utils    <- OK
    │   ├── CRS
    │   └── Layers       <- OK
    └── OpenLayers
        ├── Controls
        │   ├── Measures
        │   └── Utils
        ├── CRS
        ├── Formats
        ├── Layers
        └── Sources

### client web pour l'affichage

**OK!**

par defaut, tous les tests sont executés...
sinon, option par projet (leaflet, ol ou itowns)...

## LES TESTS DE RENDU

**OK!** mais en tant que projet independant !

**Warning!**
> on laisse les tests sous gulp..., et on ne les intègre pas à webpack !

## LA DOCUMENTATION

**OK!**

## L'INTERFACE NPM

**OK!**

## TRAVIS

**OK!**

**Warning!**
> intégration des tests à mettre en place !!!

## SCRIPTS

**OK!**

## LA STRUCTURE DES CONFIG WEBPACK

**TODO!**

**Warning!**
> configurations multiples ou un seul *webpack.config.js* ?
