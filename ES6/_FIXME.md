# FIXME Webpack

Tous les FIXME sur la construction du projet avec Webpack.
Les tests sont validés avec les exemples en AMD, Web et ES6.

**Remarque**
Pas de cas d'utilisation avec NodeJS

## Version Webpack 3 ou 4

Les performances en v4 sont limites...
L'entête UMD en v4 est foireux...

> on bascule en version 3 !

## Fonctionnement du bundle en AMD

Fonctionnement de la variable globale Gp en mode AMD est surprenante...

**???**
> Cette variable ne semble pas être remplie correctement ?

## Itowns

Itowns n'est plus une dependance des modules ES6 !
On choisie de faire appel à la variable globale itowns !

## BREAKDOWN

La modification des réf. au mot clef "ol3" risque de causer des effets de bord.

**TODO sur les exemples jsfiddle**
Les exemples jsfiddle utilise la variable "ol3ExtVersion" :
> "ol3ExtVersion"-> "olExtVersion"

Le nom du bundle d'openlayers :
> GpPluginOl3 -> GpPluginOpenLayers

Le nom du bundle en mode mixte :
> GpPluginOl3Itowns -> GpPluginOlItowns

**TODO sur la gh-pages**
Pour la jsdoc sur la gh-pages, on modifie aussi le nom du répertoire :
> current/jsdoc/ol3 -> current/jsdoc/openlayers

**???**
La réf. à la documentation sur l'autoconf fonctionne t elle ?
> http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html

**TODO sur le projet Evolution**
> remplacer les urls ci dessus par une autre sans les réf. à ol3 !

Le "tracker extension openlayers" risque de modifier les statistiques de l'API !!!
> gp-ol3-ext -> gp-ol-ext

**TODO sur le projet statistiques**
> ajouter dans le regex la recherche de "gp-ol-ext" !
