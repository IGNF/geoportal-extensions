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

**Remarque**
- il faut bien gérer les environnements d'execution !

**???**
> le module MiniGlobe utilise la dependance itowns !?

## BREAKDOWN

La modification des réf. au mot clef "ol3" risque de causer des effets de bord.

Les exemples jsfiddle utilise la variable "ol3ExtVersion" :
> "ol3ExtVersion"-> "olExtVersion"

Le nom du bundle d'openlayers :
> GpPluginOl3 -> GpPluginOpenLayers

Le nom du bundle en mode miste :
> GpPluginOl3Itowns -> GpPluginOlItowns
