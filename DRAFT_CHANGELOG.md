




# Extension Geoportail OpenLayers, version __VERSION__

**__DATE__**
> Release Extension Geoportail openlayers

## Summary

Retrait total de l'utilisation du service d'autoconfiguration et utilisation de fichiers de configuration json générés quotidiennement à partir des getCapabilities des services du Geoportail.

L'ensemble des services de calcul appelés via la bibliothèque d'accès sont désormais appelés avec la clé "calcul" par défaut dans la bibliothèque d'accès. Le paramètre "apiKey" n'est donc plus nécessaire pour appeler les services de géocodage, d'itinéraire, d'isochrone, d'altimétrie et d'autocomplétion, que ce soit directement depuis la bibli
othèque d'accès ou via les widgets des extensions Géoportail.

L'autoconfiguration n'est plus appelée par les API. Pour la remplacer, nous générons quotidiennement, à partir des getCapabilities des services WMS et WMTS, des fichiers de configuration en JSON appelables par les API JavaScript Géoportail. Il y a un fichier par clé générique. L'avantage de ce nouveau processus (en plus de s'adapter au futur arrêt du service d'autoconfiguration) est que les fichiers de configuration JSON sont directement au format attendu par les API : il n'y a plus besoin de les parser pour en extraire les informations utiles puis pour les introduire dans une structure adéquate.
Par exemple, en renseignant "cartes" au paramètre apiKey, c'est le fichier cartesConfig.json qui sera chargé et directement utilisé par les API.

A noter que le multiKeys est toujours géré, c'est à dire qu'il est possible de renseigner plusieurs clés dans le paramètre apiKey.

Il est également possible de générer son propre fichier de configuration à partir d'une ou plusieurs clés. L'utilitaire est temporairement disponible ici : https://geoportal-configuration.onrender.com. Le paramètre permettant ensuite de charger sa configuration personnelle à partir du fichier local généré s'appelle désormais **customConfigFile**, auquel on associera le chemin vers le fichier de configuration json à charger.

## Changelog

* [Added]

* [Changed]

    - mise à jour de la bibliothèque d'accès aux services Geoportail en version 3.3.0 (#364)
    - **BC** : paramètre "customConfigFile" pour appeler un fichier de configuration local (#364)

##### Avant :

```html
<script src="chemin/vers/GpPluginOpenLayers.js" data-url="chemin/vers/mon/autoconf/AutoConf.js"></script>
```

OU

```javascript
Gp.Services.getConfig({
    serverUrl : "chemin/vers/mon/autoconf/AutoConf.js",
    timeOut : 20000,
    onSuccess : createMap
});
```

##### Maintenant :

```html
<script src="chemin/vers/GpPluginOpenLayers.js" data-url="chemin/vers/ma/config/customConfig.json"></script>
```

OU

```javascript
Gp.Services.getConfig({
    customConfigFile: "chemin/vers/ma/config/customConfig.json",
    timeOut: 20000,
    onSuccess: createMap
});

* [Deprecated]

* [Removed]

    - **BC** : les originators ne sont plus renvoyés dans la configuration. Il faut les ajouter manuellement aux couches.

```javascript
        var gpOrtho = new ol.layer.Tile({
            source: new ol.source.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                olParams: {
                    attributions: [{
                        name: "Nom raccourci originator",
                        constraints: [{
                            minScaleDenominator: 20000,
                            maxScaleDenominator: 1000000,
                            bbox: {
                                left: -10,
                                top: 50,
                                right: 10,
                                bottom: 40
                            }
                        },
                        {
                            bbox: {
                                left: 120,
                                top: 50,
                                right: 150,
                                bottom: 35
                            }
                        }
                    ]
                    },
                    {
                        url: "http://www.url-vers-le-site-du-producteur.fr",
                        constraints: [{
                            minScaleDenominator: 20000,
                            maxScaleDenominator: 400000
                        }]
                    },
                    {
                        logo: "https://lien-vers-le-logo.png"
                    },
                    {
                        attribution: "Titre complet originator",
                        constraints: [{
                            minScaleDenominator: 100000,
                            maxScaleDenominator: 800000
                        }]
                    }]
                }
            })
        });
```

    - **BC** : Les metadatas sont utilisées dans les API par le contrôle gestionnaire de couches (LayerSwitcher). Celui-ci va lire les metadatas des couches ajoutées à la carte et les afficher dans l'encart d'information dédié du LayerSwitcher. **Pour les couches WMTS uniquement**, désormais, pour que les metadatas apparaissent dans l'onglet "informations" du LayerSwitcher, il faudra les renseigner manuellement à la configuration de la couche Géoportail lors de son ajout à la carte.


```javascript
new ol.layer.Tile({
    source: new ol.source.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS",
        metadata: [
            {
                format: "xml",
                url: "lien/Vers/Une/MetaDonnee.xml"
            }
        ],
    })
})
```

* [Fixed]

* [Security]

---


# Extension Geoportail Leaflet, version __VERSION__

**__DATE__**
> Release Extension Geoportail leaflet

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---



# Extension Geoportail Itowns, version __VERSION__

**__DATE__**
> Release Extension Geoportail itowns

## Summary

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
