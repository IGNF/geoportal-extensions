Renomer OL3 vers OL
===================

Projet Extension
----------------

Pour être cohérent, il faut aussi supprimer toutes les références à OL3 dans la
documentation. Le remplacement des références risque de casser des liens vers...

* Téléchargement
Ex. https://github.com/IGNF/geoportal-extensions/releases/download/ol3-0.12.0/GpOpenLayers.zip
* JSDoc
Ex. http://ignf.github.io/geoportal-extensions/ol3-latest/jsdoc/ol.layer.GeoportalWMTS.html
* Geoservices
Ex. http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html

Autre souci, le paramètre des requêtes WMTS et WMS "gp-ol3-ex" est à modifier...,
mais ça risque de fausser les statistiques API (modification à prévoir sur la
configuration ElasticSearch)

Projet SDK
----------

...

Projet sur le github
--------------------

...
