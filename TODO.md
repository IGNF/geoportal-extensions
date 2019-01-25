# Migration vers OpenLayers v5

Cette branche est clonée sur [feature-layerimport-mapbox] :

    commit 7408bb00f0af51fd7c2b0f2dd1dffb901220f8df
    Author: lowzonenose <jpbazonnais@gmail.com>
    Date:   Mon Dec 17 14:38:49 2018 +0100

        Gestion des groupes dans l'editeur MapBox...


Pour la creation des modules et des exemples, on utilise la commande suivante :
> ./node_modules/.bin/webpack --config webpack.config.openlayers.modules.js
[--env.[development|production]]


Les bundles des modules sont disponible :
> dist/openlayers/modules/

Les exemples sont disponibles dans le répertoire *samples*, et
les fichiers sont suffixés avec le tag *modules*.

> **INFO**
> Suite à un probleme de minification à cause de la version de Webpack 3 et ES6...
> on utilise donc une version anterieur du package *uglifyjs-webpack-plugin* > 1.3.0 !
> Lors du passage en Webpack 4, on pourra utiliser la version de minification incluse dans webpack.

## Avancements

- Migrer vers ol v5.3.0 : **OK**
- Tests à jouer / à creer
- Tests de rendu à jouer
- Exemples sur les modules

- Format **TODO**

    * ol.format.KMLExtended  :
    * ol.source.WMTSExtended :

- Layer

    **OK pour les projections**
    > cf. CRS (mais en cours de la refonte du module)

    * ol.source.GeoportalWMTS : **OK**
    * ol.source.GeoportalWMS  : **OK**
    * ol.layer.GeoportalWMTS  : **OK**
    * ol.layer.GeoportalWMS   : **OK**

    > **INFO**
    > si on n'a pas d'autoconf, une exception est lancée :
    "contract key configuration has to be loaded to load Geoportal layers"

    > Hors un defaut d'autoconf ne devrait pas stopper l'affichage, mais on se doit
    d'affiche à minima une carte vide !

- Controls

> **TODO** gestion des CSS communes aux extensions !?

> **EVOL** Sans autoconf ou droit, il faudrait rendre les boutons de calculs non
cliquable (ex. Route ou Iso)...

    * ol.control.LayerSwitcher : **OK**

    * ol.control.GeoportalAttribution : **OK**
        - si attribution OSM, affichage directement sur la carte !!!
        cf. https://github.com/openlayers/openlayers/blob/master/changelog/upgrade-notes.md#v530
        - probleme de CSS mais natif (hauteur du bouton lors d'un clic) !

    * ol.control.GetFeatureInfo : **TODO**

    * ol.control.SearchEngine : **TODO**

    * ol.control.LocationSelector : **OK**
        - mise en place d'un hack pour resoudre le conflit de CSS...
        Mais le pb vient de l'ordre d'appel des CSS :
            > Common/GPgeneralWidget.css
            > Common/GPxxxx.css
            > OpenLayers/GPgeneralWidgetOpenLayers.css
            > OpenLayers/GPxxxxOpenLayers.css

        Et, les CSS communes sont dupliquées dans chaque modules...

        > **EVOL** refonte de la gestion des CSS...

    * ol.control.Route : **OK**
        - il existe encore des FIXME dans la console !?

    * ol.control.Isocurve : **OK**

    * ol.control.GeoportalMousePosition : **OK**
        - cf. CRS
        - gestion du setExtent() pour EPSG:2154
        cf. https://openlayers.org/en/latest/examples/reprojection-by-code.html?q=proj4

    * ol.control.Drawing : **OK**

    * ol.control.ReverseGeocode : **OK**
        - probleme de CSS (ecart entre chaque element)

    * ol.control.LayerImport : **OK**

    * ol.control.MeasureLength : **OK**
    * ol.control.MeasureArea : **OK**
    * ol.control.MeasureAzimuth : **OK**
        - les dessins apparaissent sous la carte (cf. LayerSwitcher)...
        - en mode modules, la toolbox et les interactions entre outils sont partagées dans le contexte d'execution via les variables :
        > *gpShareMeasures* et *gpShareMeasureToolBox*

        Ceci fonctionne dans un contexte Web, mais à tester dans un Front End (ex. Ember)

    * ol.control.ElevationPath : **OK**

- Other

    > **OK** upgrade proj4 > 2.5.0 !

    * CRS : **NOK**
        cf. https://github.com/openlayers/openlayers/blob/master/changelog/upgrade-notes.md#changes-in-proj4-integration
        - bug pour ajouter des projection geocent sur le registre IGNF !?
        - comment surcharger transformExtent ou un setExtent() sur l'EPSG:2154 ne suffirait il pas ?

    * Editor : **OK**
        - renomer ol.editor.View en ol.style.Editor !
        - probleme de CSS (ecart entre chaque element)

    * Register : **OK**

    * interactions : **OK**

## TODOLIST sur la gestion du projet

* exemples AMD à supprimer.

    > realisation d'un exemple dans le projet 3rd Party...

* integration des extensions ES6 dans le projet 3rd Party...

* geoportal access lib

    > utilisation des sources ES6 modules dans le code.

    > programmer la publication des sources !

* deplacement des CSS avec les JS

    > eviter des chemins complexes dans les sources.

* creation d'une CSS commune à tous les controles (via webpack)

* **FAIT** creation des exemples des modules (via webpack)

* modifier le template des exemples des modules

    > ajouter les bundles et les CSS  directement dans le template de l'exemple (tag:vendor)

* deplacement des webpack dans un répertoire

    > un webpack principal à la racine avec des targets d'executions vers les webpack :
    itowns, openlayers et leaflet.
    ex. build/

* deplacement des README dans un répertoire

    > il existe déjà un README principal qui pointe vers les autres README. ex. doc/

* deplacement des JSON dans un répertoire
    > ex. build/

* deplacement des JSDOC dans un autre répertoire
    > ex. build/

* deplacement des licences **templates** dans un répertoire
    > ex. build/

## Actions

opérations realisées pour le passage en ES6 des classes JS...

### ajout des imports

```
// import CSS
import "../../../res/Common/GPgeneralWidget.css";
import "../../../res/Common/GPwaiting.css";
import "../../../res/Common/GPXXXX.css";
import "../../../res/OpenLayers/GPgeneralWidgetOpenLayers.css";
import "../../../res/OpenLayers/Controls/XXXX/GPXXXXOpenLayers.css";

// import OpenLayers
import {inherits as olInherits} from "ol/util";
import Control from "ol/control/Control";
import Overlay from "ol/Overlay";
import Collection from "ol/Collection";
import { unByKey as olObservableUnByKey } from "ol/Observable";

import {
    pointerMove as eventPointerMove,
    singleClick as eventSingleClick
} from "ol/events/condition";

import {
    Select as SelectInteraction,
    Modify as ModifyInteraction,
    Draw as DrawInteraction
} from "ol/interaction";

import {
    Fill,
    Icon,
    Stroke,
    Style,
    Text,
    Image,
    Circle
} from "ol/style";

import {
    LineString,
    Point,
    Polygon
} from "ol/geom";

import { intersects as olIntersects } from "ol/extent";

import {
    getArea as olGetAreaSphere,
    getDistance as olGetDistanceSphere
} from "ol/sphere";

import RenderFeature from "ol/render/Feature"; // FIXME !?
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { createXYZ as olCreateXYZTileGrid } from "ol/tilegrid"; // FIXME !?

import {
    transform as olTransformProj,
    get as olGetProj,
    transformExtent as olTransformExtentProj
} from "ol/proj";


import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileWMSSource from "ol/source/TileWMS";
import WMTSSource from "ol/source/WMTS";
import TileJSONSource from "ol/source/TileJSON";

import WMSCapabilities from "ol/format/WMSCapabilities";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import MVT from "ol/format/MVT";
import GeoJSON from "ol/format/GeoJSON";
import GPX from "ol/format/GPX";

import Feature from "ol/Feature";
```

### remplacement (grep)

```
ol.control.Control Control
ol.Overlay Overlay
ol.Collection Collection
ol.layer.Vector VectorLayer
ol.source.Vector VectorSource
ol.style.Style Style
ol.style.Icon Icon
ol.style.Text Text
ol.style.Fill Fill
ol.style.Stroke Stroke
ol.style.Circle Circle
ol.proj.transformExtent olTransformExtentProj
ol.proj.transform olTransformProj
ol.proj.get olGetProj
ol.format.GPX GPX
ol.format.KML KML
ol.format.GeoJSON GeoJSON
ol.events.condition.pointerMove eventPointerMove
ol.events.condition.singleClick eventSingleClick

suppression :
    new ol.Sphere(6378137);
    wgs84Sphere.haversineDistance getDistance
    wgs84Sphere.getGeodesicArea getAera

```

### syntaxe ES6 : () => {}

recherche des callback sur les actions suivantes :
* forEach
* unByKey
* on
* un
* ...

### exposer les modules

```
// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngine = SearchEngine;
}
```
