# Liens utiles

[BackstopJS] https://github.com/garris/BackstopJS

Avec le Tuto - https://css-tricks.com/automating-css-regression-testing/

API :
* [CasperJS] http://docs.casperjs.org/en/latest/modules/casper.html#click
* [ChromyJS] https://github.com/OnetapInc/chromy

# Commandes

Installation des dependances
> npm install

Images ref.
> npm run reference

Test à partir des images ref.
> npm run test

> **Information :**
Le ménage est à faire en production !
Un répertoire d'images est généré après chaque test...
Il faut donc prévoir une target de nettoyage en production...

# Manipulation du fichier de Configuration

## Répertoires de résultats

Choix de placer les tests leaflet / openlayers séparés.

```
"paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/leaflet",
    "bitmaps_test": "backstop_data/bitmaps_test/leaflet"
  }
```

## Choix du type de moteur

*casper* ou *chrome* ou *phantom* ou *slim* :
```
"engine": "chrome"
```

> **Note**
Le moteur *chrome* semble mieux fonctionner sur les opérations de capture...
Pour installer un moteur, il faut utiliser la commande NPM...

## Choix des selecteurs CSS

Exemple de selecteurs :
```
"selectors": [
  ".leaflet-container" (class)
  "#map" (id)
  "div[id^=GPlayerSwitcher-]" (selector)
]
```

> **Notes**
Par defaut, c'est tout le document que l'on capture (screenshot) !

## Choix des evenements déclencheurs de la capture

> **TODO**
*SPA testing support* - Use Casper (or Chrome) scripts and explicit web app triggers
 to ensure screenshots are captured at the correct time inside your web app
 (e.g. after API responses, after CSS animation completion, or wait for any other
 watchable async process).

> **Solution Trigger** :
On utilise principalement les declencheurs suivants :
```
"clickSelector": "#id", // Clic sur l'element
"postInteractionWait": 1000 // Temps d'attente du screenshot après le clic
```

> **TODO**
*Simulating user interactions* - Use Casper (or Chrome) scripting inside your
scenarios to simulate interactions with your on-screen components.

> **FIXME**
*Cross Domain* - Howto ???

> **Solution Cross Domain** :
Ne pas mettre de chemin relatif mais des URLs (Ex. http://localhost/).
> **Information** : Pour un deploiement en production, on utilisera un serveur web interne type *phantomjs*

# plan de recette

> **Test de rendu :**
toutes les actions qui declenchent un changement d'état visuel (les fenetres,
boites de dialogue, clic sur un bouton,...) possibles sur chaque extension sont
à capturer.

**Liste des extensions**

### MousePosition
* test avec option par defaut
* test sur ouverture des settings
* test d'un deplacement sur la carte

### Route
* test avec option par defaut
* test sur ouverture des exclusions
* test de calcul de parcours

### IsoCurve
* test avec option par defaut
* test sur ouverture des exclusions
* test de calcul isochrone
* test de calcul isodistance

### SearchEngine
* test avec option par defaut
* test sur ouverture des settings
* test sur une recherche par autocompletion
* test sur une recherche par geocodage avec code postale

### ReverseGeocoding
* test avec option par defaut

### LayerSwitcher
* test avec option par defaut
* test d'ajout d'une couche
* test de suppression d'une couche

### ElevationPath
TODO

### MeasureLength
(only OpenLayers)
TODO

### MeasureAera
(only OpenLayers)
TODO

### MeasureAzimuth
(only OpenLayers)
TODO
