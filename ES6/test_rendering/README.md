# Liens utiles

[BackstopJS] https://github.com/garris/BackstopJS

Avec le Tuto - https://css-tricks.com/automating-css-regression-testing/

API :
* [CasperJS] http://docs.casperjs.org/en/latest/modules/casper.html#click
* [ChromyJS] https://github.com/OnetapInc/chromy

# Commandes

1. Installation des dependances
> npm install

2. Lancer le serveur de tests
> node server.js

3. Executer les tests
> npm run test:[ll|ol|it]

> **TODO : clean des tests**
Le ménage est à faire en production !
Un répertoire d'images est généré après chaque test...
Il faut donc prévoir une target de nettoyage en production...

4. Recalculer les images references
> npm run reference:[ll|ol|it]

>  **uniquement** si l'on souhaite ajouter de nouveaux tests !

# Manipulation du fichier de Configuration

## Les fichiers de scenarios

> ** utilisation de plusieurs fichiers de configurations**
Possibilité d'utiliser plusieurs fichiers de configurations afin de structurer nos tests
par fonctionnalités : Leaflet, OpenLayer et Itowns

## Répertoires de résultats

> ** structure des images réferences**
Choix de placer les tests leaflet / openlayers / itowns dans des répertoires séparés.

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

> *SPA testing support* - Use Casper (or Chrome) scripts and explicit web app triggers
 to ensure screenshots are captured at the correct time inside your web app
 (e.g. after API responses, after CSS animation completion, or wait for any other
 watchable async process).

> **>>>>>**
On utilise principalement les declencheurs suivants :
```
"clickSelector": "#id", // Clic sur l'element
"postInteractionWait": 1000 // Temps d'attente du screenshot après le clic
```

> *Simulating user interactions* - Use Casper (or Chrome) scripting inside your
scenarios to simulate interactions with your on-screen components.

> **>>>>>**
Dans le cadre de la *cucumberisation* des tests de rendu, on va devoir realiser
des actions scriptées avec *cucumberjs*.

> *Cross Domain*

> **>>>>>**
Ne pas mettre de chemin relatif mais des URLs (Ex. http://localhost/).
Pour un deploiement en production, on utilisera un serveur web interne type *phantomjs*

# Plan de recette

> **Test de rendu :**
toutes les actions qui declenchent un changement d'état visuel (les fenetres,
boites de dialogue, clic sur un bouton,...) possibles sur chaque extension sont
à capturer.

**Liste des tests sur les extensions leaflet**

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
> **TODO**

### MeasureLength
(only OpenLayers)
> **TODO**

### MeasureAera
(only OpenLayers)
> **TODO**

### MeasureAzimuth
(only OpenLayers)
> **TODO**


## cucumberjs

> **TODO : cucumberisation du plan de recette**
Ecriture du plan de recette sous la formalisme cucumber


> **POC : cucumberisation des tests**
Ecriture d'un test avec cucumberjs
