# Tests Render UI

<!-- toc -->

- [Liens utiles](#liens-utiles)
- [Commandes](#commandes)
- [Manipulation du fichier de Configuration](#manipulation-du-fichier-de-configuration)
  * [Les fichiers de scenarios](#les-fichiers-de-scenarios)
  * [Répertoires de résultats](#repertoires-de-resultats)
  * [Choix du type de moteur](#choix-du-type-de-moteur)
  * [Choix des selecteurs CSS](#choix-des-selecteurs-css)
  * [Choix des evenements déclencheurs de la capture](#choix-des-evenements-declencheurs-de-la-capture)
- [Plan de recette](#plan-de-recette)
  * [cucumberjs](#cucumberjs)
  * [Liste des tests](#liste-des-tests)

<!-- tocstop -->

## Liens utiles

[BackstopJS] - https://github.com/garris/BackstopJS

Avec le Tuto - https://css-tricks.com/automating-css-regression-testing/

API :
* [CasperJS] - http://docs.casperjs.org/en/latest/modules/casper.html#click
* [ChromyJS] - https://github.com/OnetapInc/chromy

## Commandes

Les tests de rendu se trouvent dans le répertoire `test_rendering`.

Se placer dans le répertoire.

1. Installation des dependances
    > npm install

2. Lancer le serveur de tests
    > node server.js

3. Executer les tests
    > npm run test:[ll|ol|it]

    > **TODO** : clean des tests
        Le ménage est à faire en production !
        Un répertoire d'images est généré après chaque test...
        Il faut donc prévoir une target de nettoyage en production...

4. Recalculer les images references
    > npm run reference:[ll|ol|it]

    > **NOTE**
    *uniquement* si l'on souhaite ajouter de nouveaux tests !

## Manipulation du fichier de Configuration

### Les fichiers de scenarios

**utilisation de plusieurs fichiers de configurations** afin de structurer nos tests par fonctionnalités : Leaflet, OpenLayer et Itowns
```
backstop-ol.json
backstop-ll.json
backstop-it.json
```

### Répertoires de résultats

**structure des images réferences** en deposant les tests leaflet / openlayers / itowns dans des répertoires séparés.

```
"paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference/leaflet",
    "bitmaps_test": "backstop_data/bitmaps_test/leaflet"
  }
```

### Choix du type de moteur

**liste des moteurs** - *casper* ou *chrome* ou *phantom* ou *slim*

Choix par defaut :
```
"engine": "chrome"
```

> **NOTE**
Le moteur *chrome* semble mieux fonctionner sur les opérations de capture...

> **NOTE**
Pour installer un moteur, il faut utiliser la commande NPM...

### Choix des selecteurs CSS

Exemple de *selecteurs* :
```
"selectors": [
  ".leaflet-container" (class)
  "#map" (id)
  "div[id^=GPlayerSwitcher-]" (selector)
]
```

> **NOTE**
Par defaut, c'est tout le document que l'on capture (screenshot) !

### Choix des evenements déclencheurs de la capture

**SPA testing support** - Use Casper (or Chrome) scripts and explicit web app triggers
to ensure screenshots are captured at the correct time inside your web app
(e.g. after API responses, after CSS animation completion, or wait for any other
 watchable async process).

> **NOTE**
On utilise principalement les declencheurs suivants :
```
"clickSelector": "#id", // Clic sur l'element
"postInteractionWait": 1000 // Temps d'attente du screenshot après le clic
```

**Simulating user interactions** - Use Casper (or Chrome) scripting inside your
scenarios to simulate interactions with your on-screen components.

**Cross Domain** - Ne pas mettre de chemin relatif mais des URLs
(Ex. http://localhost/). Pour un deploiement en production, on utilisera un serveur
web interne type *phantomjs*.

## Plan de recette

**Test de rendu** - toutes les actions qui declenchent un changement d'état visuel
(les fenetres, boites de dialogue, clic sur un bouton,...) possibles sur chaque
extension sont à capturer.

### cucumberjs

**cucumberisation du plan de recette** - Ecriture du plan de recette sous la formalisme cucumber.

> **TODO**
Dans le cadre de la *cucumberisation* des tests de rendu, on va devoir realiser
des actions scriptées avec *cucumberjs*.

### Liste des tests

```
├── itowns
│   ├── interactions
│   │   └── layerswitcher.html
│   ├── layerswitcher.html
│   ├── mnt.html
│   ├── mouseposition-1.html
│   └── mouseposition.html
├── leaflet
│   ├── interactions
│   │   ├── isochrone.html
│   │   ├── layerswitcher.html
│   │   ├── mouseposition.html
│   │   ├── route.html
│   │   └── searchengine.html
│   ├── isochrone-1.html
│   ├── isochrone.html
│   ├── isodistance.html
│   ├── layerswitcher.html
│   ├── mouseposition-1.html
│   ├── mouseposition.html
│   ├── reverse.html
│   ├── route-1.html
│   ├── route.html
│   ├── searchengine-1.html
│   └── searchengine.html
├── ol
│   ├── drawing.html
│   ├── interactions
│   │   ├── attributions.html
│   │   ├── elevationpath.html
│   │   ├── iso.html
│   │   ├── layerswitcher.html
│   │   ├── route.html
│   │   └── searchengine.html
│   ├── iso.html
│   ├── layerimport.html
│   ├── layerswitcher.html
│   ├── measurearea.html
│   ├── measureazimuth.html
│   ├── measurelength.html
│   ├── mouseposition.html
│   ├── resources
│   │   └── AutoConf.js
│   ├── reverse.html
│   ├── route.html
│   ├── searchengine_1.html
│   └── searchengine.html
```
