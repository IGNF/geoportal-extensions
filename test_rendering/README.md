# Liens utiles

[BackstopJS] https://github.com/garris/BackstopJS
Tuto - https://css-tricks.com/automating-css-regression-testing/

API :
[CasperJS] http://docs.casperjs.org/en/latest/modules/casper.html#click
[ChromyJS] https://github.com/OnetapInc/chromy

# Commandes

Images ref.
> npm run reference

Test à partir des images ref.
> npm run test

> **Note**
Ménage à faire !
Un répertoire d'images est généré après chaque test...


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

*casper* ou *chrome* ou *phantomjs* :
```
"engine": "chrome"
```

> **Note**
Le moteur *chrome* semble mieux fonctionner sur les opérations de capture...

## Choix des selecteurs CSS

```
"selectors": [
  ".leaflet-container" (class)
  "#map" (id)
  "div[id^=GPlayerSwitcher-]" (selector)
]
```

> **Notes**
Par defaut, c'est tout le document !

> **FIXME**
Comment selectionner uniquement le composant sans la carte ?

## Choix des evenements déclencheurs de la capture

> **TODO**
*SPA testing support* - Use Casper (or Chrome) scripts and explicit web app triggers
 to ensure screenshots are captured at the correct time inside your web app
 (e.g. after API responses, after CSS animation completion, or wait for any other
 watchable async process).

> **TODO**
*Simulating user interactions* - Use Casper (or Chrome) scripting inside your
scenarios to simulate interactions with your on-screen components.

# plan de recette

> **Test de rendu :**
toutes les actions qui declenchent un changement d'état visuel (les fenetres,
boites de dialogue, clic sur un bouton,...) possibles sur chaque extension sont
à capturer.

**Liste des extensions**

## MousePosition
## Route
## IsoCurve
## SearchEngine
## ReverseGeocoding
## LayerSwitcher
## ElevationPath
## MeasureLength
(only OpenLayers)
## MeasureAera
(only OpenLayers)
## MeasureAzimuth
(only OpenLayers)
