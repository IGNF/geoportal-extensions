# Extension Géoportail pour OpenLayers 3

L'extension Géoportail pour OpenLayers 3 propose les fonctionnalités suivantes à utiliser en complément de la biblothèque [OpenLayers 3](http://openlayers.org/) :

* [affichage des couches WMTS Géoportail](#WMTS)

* [affichage des couches WMS Géoportail](#WMS)

* [affichage dynamique des attributions](#attributions)

* [widget de gestion d'empilement des couches](#layerswitcher)

* [barre de recherche utilisant le service de géocodage IGN](#geocode)

* [obtention d'une adresse, d'un nom de lieu, ... au clic sur la carte](#reverse)

* [calculs d'itinéraires à partir du service de la plateforme Géoportail](#route)

* [calculs d'isochrones / isodistances à partir du service de la plateforme Géoportail](#isocurve)

* [altitude en un point de la carte à l'aide du service d'altimétrie de la plateforme Géoportail](#mp)

* [outils de croquis](#drawing)

## Mise en oeuvre

### Téléchargement

Vous pouvez récupérer l'extension Géoportail pour OpenLayers 3 ici : <a href="https://github.com/IGNF/geoportal-extensions/releases/download/ol3-0.10.0/GpOpenLayers3.zip" target="_blank">GpOpenLayers3.zip</a>. Elle contient l'arborescence suivante :


    ol3/
        GpPluginOl3.js
            (version minifiée du code javascript pour une utilisation en production)
        GpPluginOl3.css
            (version minifiée des css pour une utilisation en production)
        GpPluginOl3-src.js
            (version non minifiée du code javascript pour une utilisation en développement)
        GpPluginOl3-src.css
            (version non minifiée des css pour une utilisation en développement)
        img/
            (resources images utilisées par les fichiers CSS)


### Intégration dans une page web

Dézippez l'extension géoportail dans l'arborescence votre serveur web. Vous pouvez positionner à votre guise les fichiers css et javascript. Le répertoire img doit cependant être positionné au même niveau que le fichier css pour que les ressources images qui y sont référencées soient correctement chargées.

Intégrez l'extension géoportail pour ol3 dans votre page web classiquement à l'aide d'une balise **script** pour charger le fichier javascript et d'une balise **link** pour charger le fichier css en plus des balises correspondantes utilisées pour charger la bibliothèque OpenLayers 3.

``` html
<!-- Library OpenLayers 3 -->
<link rel="stylesheet" href="chemin/vers/ol3/ol.css" />
<script src="chemin/vers/ol3/ol.js"></script>

<!-- Extension Géoportail pour OpenLayers 3 -->
<script src="chemin/vers/GpPluginOl3.js"></script>
<link rel="stylesheet" href="chemin/vers/GpPluginOl3.css" />
```

<a id="config"/>

### Configuration de l'accès à la plateforme Géoportail

L'extension Géoportail pour OpenLayers 3 exploite les services web exposés par la plateforme Géoportail. Ceux-ci sont soumis à l'obtention d'une **clef d'accès** obtenue sur le site [professionnels.ign.fr](http://professionnels.ign.fr/api-web) ayant les droits sur les ressources que vous souhaitez exploiter.

Une fois la clef obtenue, vous pouvez paramétrer l'utilisation de l'extension avec cette clef de deux manières possibles :

**Méthode 1** : Au chargement de l'extension en utilisant l'attribut "data-key" de la balise **script** de chargement de l'extension :

``` html
<script data-key="VOTRE-CLEF" src="chemin/vers/GpPluginOl3.js"></script>
```

Votre utilisation des fonctionnalités de l'extension Géoportail sera alors simplement conditionnée à la réception de l'événement onload de la page web, comme sur l'exemple suivant :

``` html
<html>
    <head>
        <!-- Library OpenLayers 3 -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Extension Géoportail pour OpenLayers 3 -->
        <link rel="stylesheet" href="GpPluginOl3.css" />
        <script src="GpPluginOl3.js" data-key="CLEAPI"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                // votre utilisation de l'extension Géoportail pour OpenLayers 3
            }
        </script>
    </body>
</html>
```

**Méthode 2** : A la fin du chargement de la page en utilisant la fonction [Gp.Services.GetConfig()](https://github.com/IGNF/geoportal-access-lib#getConfig) et en conditionnant alors l'utilisation de l'extension à l'exécution de la fonction de rappel onSuccess passée en paramètres de Gp.Services.getConfig() comme sur l'exemple suivant :

``` html
<html>
    <head>
        <!-- Library OpenLayers 3 -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Extension Géoportail pour OpenLayers 3 -->
        <link rel="stylesheet" href="GpPluginOl3.css" />
        <script src="GpPluginOl3.js"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                Gp.Services.getConfig({
                    apiKey: 'CLEAPI',
                    onSuccess: function (response) {
                        // votre utilisation de l'extension Géoportail pour OpenLayers 3
                    }
                });
            }
        </script>
    </body>
</html>
```

<!--
#### Optimisation du chargement : configuration locale

Partie à écrire...
-->

## Compatibilités

### Versions de OpenLayers 3 supportées

L'extension Géoportail pour OpenLayers 3 peut s'utiliser avec les **versions 3.14 et supérieures** d'OpenLayers 3. 
Le support des versions antérieures d'OpenLayers 3 n'a pas été complètement testé.


### Navigateurs supportés


Navigateur | version
-----------|--------
Chrome     | Versions récentes (21+)
Firefox    | Versions récentes (28+)
IE         | IE10, IE11
Edge       | 12+
Safari     | Versions récentes (6.1+)


## Fonctionnalités

<a id="crs"/>

### Systèmes de coordonnées

OpenLayers 3 n'utilise par défaut que les systèmes de coordonnées mondiaux "standards" : EPSG:4326 (coordonnées géographiques) et EPSG:3857 (Projection Web Mercator utilisée par Google, Bings, OSM ... et le Géoportail) comme expliqué [ici](http://openlayers.org/en/latest/apidoc/ol.proj.html).

La définition d'autres systèmes de coordonnées est cependant possible par l'adjonction de la bibliothèque [Proj4js](https://github.com/proj4js/proj4js) permettant de définir des systèmes de coordonnées et d'effectuer des transformations de coordonnées entre systèmes. Cette bibliothèque est directement compatible avec OpenLayers 3.

L'extension Géoportail pour OpenLayers 3 **intègre nativement cette bibliothèque**. Si vous l'utilisez vous pouvez donc directement définir les systèmes de coordonnées que vous souhaitez selon la syntaxe proj4 et utiliser les alias ainsi définis en paramètres des fonctions d'OpenLayers 3.

Exemple :

``` javascript
// Définition de la Projection UTM 20N
proj4.defs("EPSG:4559",
    "+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs") ;

// création d'une vue OL3 avec la projection définie
var view = new ol.View({
    center: [656481, 1796270],
    zoom: 12,
    projection: "EPSG:4559"
})
```

L'extension Géoportail pour OpenLayers 3 définit par défaut la projection légale Lambert 93 accessible sous l'alias "EPSG:2154".


NB :

* Le site [epsg.io](http://epsg.io/) recense un grand nombre de registres de systèmes de coordonnées avec leurs définitions.

* Les définitions des systèmes de coordonnées du registre IGNF peuvent être trouvées [ici](https://github.com/OSGeo/proj.4/blob/master/nad/IGNF).


<a id="WMTS"/>

### Affichage des couche WMTS Géoportail

Le modèle de données OpenLayers 3 fait la distinction entre la notion de couche (ol.layer) et la notion de source de données (ol.source). Ainsi, une carte OpenLayers 3 est constituée d'un empilement de "ol.layer", avec des propriétés relatives à leurs visibilité sur la carte, dont le contenu est alimenté par des "ol.source", avec des propriétés relatives à la manière d'obtenir ces données.

L'extension Géoportail pour OpenLayers 3 propose deux manières d'accéder aux couches Géoportail selon ce modèle :

1. On souhaite une mise en oeuvre simple, où on saisit uniquement le nom de sa couche, et d'éventuels paramètres d'affichage (visibilité ou opacité). Définition d'un [layer WMTS Géoportail](#layerWMTS).

2. On souhaite pouvoir paramétrer plus finement l'affichage de sa couche dans la carte, ainsi que d'éventuels paramètres du service (format, style, ...). Définition d'une [source WMTS Géoportail](#sourceWMTS).

<a id="layerWMTS"/>

#### Utilisation d'un layer WMTS Géoportail

L'affichage se fait par la création d'une nouvelle instance de la classe [ol.layer.GeoportalWMTS](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.layer.GeoportalWMTS.html), de la manière suivante :

``` javascript
new ol.layer.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.layer.GeoportalWMTS**, qui hérite de l'objet OpenLayers *ol.layer.Tile*, qui peut ainsi être interprété par la librairie OpenLayers pour l'ajout dans la carte.

##### Exemple d'utilisation

Affichage simple des ortho-images du Géoportail : création d'une *layer* Géoportail, et ajout à la *map* OpenLayers 3.

``` javascript
var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS"
            })
        ],
        view: new ol.View({
            center: [288074.8449901076, 6247982.515792289],
            zoom: 12
        })
    });
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/j5rdjt2z/embedded/result,js,html,css/)

##### Affichage en Lambert 93 (EPSG:2154)

La plateforme Géoportail diffuse aussi des ressources WMTS en projection Lambert 93. Pour permettre de les afficher, l'extension Géoportail pour OpenLayers 3 pré-définit l'alias "EPSG:2154" correspondant à cette projection.

Il suffit alors de paramétrer la carte OpenLayers 3 avec cette projection et d'y rajouter la ressource WMTS de la même manière que précédemment.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
        })
    ],
    view: new ol.View({
        center: [600000, 6750000],
        zoom: 12,
        projection : "EPSG:2154"
    })
});
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/bw0za4a8/embedded/result,js,html,css/)


NB : D'autres systèmes de coordonnées peuvent être définis et utilisés : [plus d'informations...](#crs)

<a id="sourceWMTS"/>

#### Utilisation d'une source WMTS Géoportail

Cette méthode permet plus de paramétrages : on crée une nouvelle instance de la classe [ol.source.GeoportalWMTS](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.source.GeoportalWMTS.html), de la manière suivante :

``` javascript
var gpsource = new ol.source.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.source.GeoportalWMTS**, qui hérite de l'objet OpenLayers *ol.source.WMTS*. Cette source sert ensuite à la création d'un *layer* OpenLayers qui pourra ensuite être ajouté à la carte.

``` javascript
var layer = new ol.layer.Tile({
    source : gpsource
});
```

##### Exemple d'utilisation

Affichage simple des ortho-images du Géoportail : création d'un *layer* OpenLayers associé à une *source* Géoportail, et ajout à la *map* OpenLayers 3.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS"
            }),
            opacity: 0.7
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/sdktaf9r/embedded/result,js,html,css/)

##### Affichage en Lambert 93 (EPSG:2154)

La plateforme Géoportail diffuse aussi des ressources WMTS en projection Lambert 93. Pour permettre de les afficher, l'extension Géoportail pour OpenLayers 3 pré-définit l'alias "EPSG:2154" correspondant à cette projection.

Il suffit alors de paramétrer la carte OpenLayers 3 avec cette projection et d'y rajouter la ressource WMTS de la même manière que précédemment.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
            }),
            opacity: 0.7
        })
    ],
    view: new ol.View({
        center: [600000, 6750000],
        zoom: 12,
        projection : "EPSG:2154"
    })
});
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/o6tnhpnd/embedded/result,js,html,css/)


NB : D'autres systèmes de coordonnées peuvent être définis et utilisés : [plus d'informations...](#crs)


<a id="WMS"/>

### Affichage des couches WMS Géoportail

Le modèle de données OpenLayers 3 fait la distinction entre la notion de couche (ol.layer) et la notion de source de données (ol.source). Ainsi, une carte OpenLayers 3 est constituée d'un empilement de "ol.layer", avec des propriétés relatives à leurs visibilité sur la carte, dont le contenu est alimenté par des "ol.source", avec des propriétés relatives à la manière d'obtenir ces données.

L'extension Géoportail pour OpenLayers 3 propose deux manières d'accéder aux couches Géoportail selon ce modèle :

1. on souhaite une mise en oeuvre simple, où on saisit uniquement le nom de sa couche, et d'éventuels paramètres d'affichage (visibilité ou opacité). Définition d'un [layer WMS Géoportail](#layerWMS).

2. On souhaite pouvoir paramétrer plus finement l'affichage de sa couche dans la carte, ainsi que d'éventuels paramètres du service (format, style, ...). Définitions d'une [source WMS Géoportail](#sourceWMS).

<a id="layerWMS"/>

#### Utilisation d'un layer WMS Géoportail

L'affichage se fait par la création d'une nouvelle instance de la classe [ol.layer.GeoportalWMS](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.layer.GeoportalWMS.html), de la manière suivante :

``` javascript
new ol.layer.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.layer.GeoportalWMS**, qui hérite de l'objet OpenLayers *ol.layer.Tile*, qui peut ainsi être interprété par la librairie OpenLayers pour l'ajout dans la carte.

##### Exemple d'utilisation

Affichage d'une couche du serveur WMS INSPIRE raster du Géoportail (OI.OrthoimageCoverage) sur une carte en EPSG:4326.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.GeoportalWMS({
        layer: "OI.OrthoimageCoverage",
      })
    ],
    view: new ol.View({
      center: [2, 46],
      zoom: 12,
      projection: "EPSG:4326"
    })
});
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/jnfwc7k6/embedded/result,js,html,css/)

<a id="sourceWMS"/>

#### Utilisation d'une source WMS Géoportail

Cette méthode permet plus de paramétrages : on crée une nouvelle instance de la classe [ol.source.GeoportalWMS](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.source.GeoportalWMS.html), de la manière suivante :

``` javascript
var gpsource = new ol.source.GeoportalWMS(options);
```

Cette fonction retourne un objet **ol.source.GeoportalWMS**, qui hérite de l'objet OpenLayers *ol.source.TileWMS*. Cette source sert ensuite à la création d'un *layer* OpenLayers qui pourra ensuite être ajouté à la carte.

``` javascript
var layer = new ol.layer.Tile({
    source : gpsource
});
```

##### Exemple d'utilisation

Utilisation des service WMS INSPIRE raster (OI.OrthoimageCoverage) du Géoportail : création d'un *layer* OpenLayers associés à un *source* Géoportail, et ajout à la *map* OpenLayers 3.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.GeoportalWMS({
                layer: "OI.OrthoimageCoverage",
            })
        })
    ],
    view: new ol.View({
        center: [-61.55, 16.25],
        zoom: 12,
        projection : "EPSG:4326"
    })
});
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/e36ur78k/embedded/result,js,html,css/)


<a id="layerswitcher"/>

### Widget de gestion d'empilement des couches

Ce widget permet à l'utilisateur de gérer l'empilement des couches composant la carte ol.Map et, pour chacune d'elles, d'agir sur la visibilité, l'opacité et d'afficher des informations qui lui sont associées (titre, description, métadonnées, légende).

Son utilisation se fait par la création d'un nouveau contrôle, instance de la classe [ol.control.LayerSwitcher ](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.LayerSwitcher.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var layerSwitcher = new ol.control.LayerSwitcher(opts) ;
map.addControl(layerSwitcher);
```

Le widget affiche l'ensemble des couches composant la carte ol.Map.

Pour chaque couche de la carte ol.Map, le widget affiche son titre et sa description (par défaut : l'identifiant OpenLayers 3 de la couche), et, si elles sont spécifiées, des informations plus détaillées : légendes, métadonnées, aperçu rapide.

La récupération de ces informations n'est pas la même selon la manière dont chaque couche a été ajoutée à la carte :

- Couches ajoutées via la [fonctionnalité d'affichage simple des couches WMS](#WMS) ou [WMTS du Géoportail](#WMTS) de l'extension pour OpenLayers 3 : ces informations sont disponibles car elles ont été chargées par lors de la [configuration de l'accès au Géoportail](#config), il n'y a donc rien à faire de particulier.

- Autres couches : afin d'afficher ces informations, il est nécessaire de les spécifier dans les options du widget.

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget de gestion de l'empilement des couches. Paramétrage des couches non Géoportail.

``` javascript
// couche OSM (non Géoportail)
var osmLyr = new ol.layer.Tile({
    source: new ol.source.OSM()
});
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        osmLyr,
        // couche Géoportail
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});    
// Création du Layer Switcher
var lsControl = new ol.control.LayerSwitcher({
    // paramétrage de l'affichage de la couche OSM
    layers : [{
        layer: osmLyr,
        config: {
            title: "OSM",
            description: "Couche OpenStreet Map"
        }
    }]
});
// Ajout du LayerSwitcher à la carte
map.addControl(lsControl);
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/5f9wxsof/embedded/result,js,html,css/)

<a id="geocode"/>

### Barre de recherche

La barre de recherche permet de positionner la carte à partir de la saisie d'un localisant dont la position sera retournée par le service de géocodage de l'IGN.

La saisie de localisants peut s'accompagner d'un mode d'autocomplétion s'appuyant sur le service d'autocomplétion de la plateforme Géoportail.

Son utilisation se fait par la création d'un nouveau contrôle, instance de la calsse [ol.control.SearchEngine](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.SearchEngine.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var search = new ol.control.SearchEngine(opts) ;
map.addControl(search);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du moteur de recherche sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var searchControl = new ol.control.SearchEngine({
});

// Ajout à la carte
map.addControl(searchControl);
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/qpcyp8nr/embedded/result,js,html,css/)


<a id="route"/>

### Calculs d'itinéraires

Le widget de calcul d'itinéraires permet d'intéragir avec une carte OpenLayers 3 pour effectuer des calculs d'itinéraires utilisant le service dédié de la plateforme Géoportail.

Son utilisation se fait par la création d'un nouveau contrôle instance de la classe [ol.control.Route](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.Route.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var route = new ol.control.Route(opts) ;
map.addControl(route);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var routeControl = new ol.control.Route({
});

// Ajout à la carte
map.addControl(routeControl);
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/1ngLrhuj/embedded/result,js,html,css/)

<a id="isocurve"/>

### Calculs d'isochrones / isodistances

Ce widget permet d'intéragir avec une carte OpenLayers 3 pour effectuer des calculs d'isochrones / isodistances utilisant le service dédié de la plateforme Géoportail.

Son utilisation se fait par la création d'un nouveau contrôle, instance de la classe [ol.control.Isocurve()](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.Isocurve.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var iso = new ol.control.Isocurve(opts);
map.addControl(iso);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var isoControl = new ol.control.Isocurve({
});

// Ajout à la carte
map.addControl(isoControl);
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/jpwf385t/embedded/result,js,html,css/)

<a id="mp"/>

### Altitude en un point de la carte

Ce widget permet d'afficher les coordonnées d'un point choisi par l'internaute sur une carte OpenLayers 3 dans un ou plusieurs systèmes de coordonnées. Ces coordonnées peuvent comprendre l'altitude obtenue à l'aide du service d'altimétrie de la plateforme Géoportail.

Son utilisation se fait par la création d'un nouveau contrôle, instance de la classe [ol.control.GeoportalMousePosition](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.GeoportalMousePosition.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var mp = new ol.control.GeoportalMousePosition(opts);
map.addControl(mp);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var mpControl = new ol.control.GeoportalMousePosition({
});

// Ajout à la carte
map.addControl(mpControl);
```

**Exemple d'utilisation avec affichage unique de l'altitude** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/jhg5fhor/embedded/result,js,html,css/)

**Exemple d'utilisation avec paramétrage des systèmes de coordonnées** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/myg4t6qo/embedded/result,js,html,css/)

<a id="attributions"/>

### Affichage dynamique des attributions

Ce widget a pour but d'afficher les attributions (de type [ol.Attribution](http://openlayers.org/en/latest/apidoc/ol.Attribution.html)) associées aux couches visibles sur la carte. Il étend les fonctionnalités du contrôle natif d'OpenLayers ([ol.control.Attribution](http://openlayers.org/en/latest/apidoc/ol.control.Attribution.html)) dont il hérite en permettant l'affichage des attributions en fonction du positionnement de la carte (centre, zoom) pour les couches ayant des originators multiples.

Les couches Géoportail (de type [WMS](#WMS) ou [WMTS](#WMTS)) possèdent nativement cette propriété. Pour les autres, le paramétrage dynamique des originators se fait par l'adjonction à l'objet source de la couche de la propriété "\_originators", tableau de [Gp.Services.Config.Originator](http://ignf.github.io/geoportal-access-lib/v1.0.0-beta.1/jsdoc/Gp.Services.Config.Originator.html).

Son utilisation se fait par la création d'un nouveau contrôle, instance de la classe [ol.control.GeoportalAttribution](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.GeoportalAttribution.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var att = new ol.control.GeoportalAttribution(opts);
map.addControl(att);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var attControl = new ol.control.GeoportalAttribution({
});

// Ajout à la carte
map.addControl(attControl);
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/x1jrLavb/embedded/result,js,html,css/)

<a id="reverse"/>

### Adresse ou lieu en un point de la carte

Ce widget permet d'obtenir un ensemble de localisants Géographiques (adresses, toponymes ou parcelles cadastrales) en un point ou une zone (cercle ou emprise rectangulaire) saisie interactivement par l'internaute sur une carte OpenLayers 3.

Son utilisation se fait par la création d'un nouveau contrôle, instance de la classe [ol.control.ReverseGeocode](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.ReverseGeocode.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var reverse = new ol.control.ReverseGeocode(opts);
map.addControl(reverse);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var rvControl = new ol.control.ReverseGeocode({
});

// Ajout à la carte
map.addControl(rvControl);
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/9y6dgq15/embedded/result,js,html,css/)

<a id="drawing"/>

### Outils de croquis

Ce widget propose un ensemble d'outils de croquis permettant de dessiner sur une carte OpenLayers 3 : poser des markers, dessiner des lignes, polygones ou faire des écritures dans des styles choisis par l'internaute.

Son utilisation se fait par la création d'un nouveau contrôle, instance de la classe [ol.control.Drawing](http://ignf.github.io/geoportal-extensions/ol3-0.10.0/jsdoc/ol.control.Drawing.html), que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers 3](http://openlayers.org/en/latest/apidoc/ol.Map.html#addControl), de la manière suivante :

``` javascript
var drawing = new ol.control.Drawing(opts);
map.addControl(drawing);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var drawControl = new ol.control.Drawing({
});

// Ajout à la carte
map.addControl(drawControl);
```

**Exemple d'utilisation** [![jsFiddle](http://jsfiddle.net/img/embeddable/logo-dark.png)](http://jsfiddle.net/ignfgeoportail/2Lj85jf1/embedded/result,js,html,css/)
