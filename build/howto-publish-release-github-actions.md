# Publication d'une nouvelle version des extensions

ex. les extensions Géoportail pour OpenLayers, version x.y.z.
(opération automatique avec les GitHub Actions)

<!-- toc -->

- [1. Création d'une branche **release**](#1-creation-dune-branche-release)
- [2. Mettre à jour le *DRAFT_CHANGLOG*](#2-mettre-a-jour-le-draft_changlog)
- [3. Modifier la version et la date de publication du *package.json*](#3-modifier-la-version-et-la-date-de-publication-du-packagejson)
- [4. Faire quelques correctifs (si besoin)](#4-faire-quelques-correctifs-si-besoin)
- [5. Reporter les modifications sur *master* et *develop*](#5-reporter-les-modifications-sur-master-et-develop)
- [6. *Tagger* la version](#6-tagger-la-version)
- [7. Publication](#7-publication)

<!-- tocstop -->

## 1. Création d'une branche **release**
> ex. release-ol-0.0.4

Cette branche doit être tirée de *develop*.

La nomenclature est fixée : `release-[ol|leaflet|itowns]-(x.y.z)?(-.*)`
> ex. release-leaflet-0.0.4-beta.10


## 2. Mettre à jour le *DRAFT_CHANGLOG*

**WARNING**
> Ne pas modifier les sections suivantes du fichier :

```
    # Extension Geoportail OpenLayers, version __VERSION__

    **__DATE__**
    > Release Extension Geoportail OpenLayers

    (...)

    ---
```


## 3. Modifier la version et la date de publication du *package.json*


## 4. Faire quelques correctifs (si besoin)

*commiter* les modifications
> git commit -a -m "release ol-0.0.4"

*pusher* sur la branche **release**
> git push -u origin release-ol-0.0.4


## 5. Reporter les modifications sur *master* et *develop*

*merge* de **release** sur *master* et *develop*


## 6. *Tagger* la version

Créer un *tag* sur *master*
> * git tag ol-0.0.4
> * git push origin ol-0.0.4

La nomenclature des tags est fixée : `[ol|leaflet|itowns]-(x.y.z)?(-.*)`


## 7. Publication

Le tag déclenche la publication automatique vai les GitHub Actions.

**CHECK**
> visualiser la disponibilité de la release github :
https://github.com/IGNF/geoportal-extensions/releases

**CHECK**
> visualiser la disponibilité de la documentation :
http://ignf.github.io/geoportal-extensions/openlayers-latest/jsdoc/

> visualiser la disponibilité des bundles :
https://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers.js

**CHECK**
> visualiser la disponibilité sur npm :
https://www.npmjs.com/package/geoportal-extensions-openlayers (peut prendre quelques minutes)
