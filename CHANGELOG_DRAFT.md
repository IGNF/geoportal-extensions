# Change Log

## [ol3-0.11.0-dev](https://github.com/IGNF/geoportal-extensions/tree/ol3-0.11.0-dev) (2016-09-02)
[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/leaflet-0.8.1-dev...ol3-0.11.0-dev)

- fix \#61 : ol.control.LayerImport - display WMS enclosed child layers [\#62](https://github.com/IGNF/geoportal-extensions/pull/62)
- fix \#52 : ol.control.LayerImport : extent mal récupérée pour les couches en EPSG:4326 [\#60](https://github.com/IGNF/geoportal-extensions/pull/60)
- Extension OL3 : proposer un outil de mesure de surface [\#57](https://github.com/IGNF/geoportal-extensions/issues/57)
- Extension OL3 : proposer un outil de mesure de distance [\#56](https://github.com/IGNF/geoportal-extensions/issues/56)
- Extension OL3 : proposer un outil de mesure d'azimuth [\#55](https://github.com/IGNF/geoportal-extensions/issues/55)
- fix \#50 : ol.control.GeoportalAttribution : affichage attributions de type text sous Safari
- fix \#53 : correction titre des outils d'edition
- fix \#51 : try ol.proj.get\(crs.toUpperCase\(\)\) \(e.g. if crs="epsg:3857"\) [\#54](https://github.com/IGNF/geoportal-extensions/pull/54)
- Suppression de codes EPSG en doublons [\#38](https://github.com/IGNF/geoportal-extensions/pull/38)
- Feature register proj4 [\#37](https://github.com/IGNF/geoportal-extensions/pull/37)
- Rajout des définitions du registre IGNF et enrichissement des définitions EPSG dans les extensions [\#36](https://github.com/IGNF/geoportal-extensions/issues/36)
- PB de Compatibilité IE10 \(extension OL3 et Leaflet\) [\#30](https://github.com/IGNF/geoportal-extensions/issues/30)
- Fix ie10 compatibility  [\#41](https://github.com/IGNF/geoportal-extensions/pull/41)
- Gérer l'import d'un KML créé via le portail
[\#47](https://github.com/IGNF/geoportal-extensions/issues/47)
- Surcharge de ol.format.KML pour la gestion des styles sur les outils …
[\#46](https://github.com/IGNF/geoportal-extensions/pull/46)
- Evolutions widgets itinéraires et isochrones \(ol.control.Route et ol.control.Isocurve\)[\#43](https://github.com/IGNF/geoportal-extensions/issues/43)
- ol : route & isocurve enhancements [\#44](https://github.com/IGNF/geoportal-extensions/pull/44)
- Compatibilité IE10 : calculs d'itinéraires et isochrones non fonctionnels [\#40](https://github.com/IGNF/geoportal-extensions/issues/40)
- Compatibilité IE10 : css des widgets Route et Isochrone [\#39](https://github.com/IGNF/geoportal-extensions/issues/39)
- ol.control.LayerSwitcher : addLayer with zIndex param [\#29](https://github.com/IGNF/geoportal-extensions/issues/29)
- ol.control.GeoportalAttribution: ne pas créer d'éléments de liste \(\<li\>\) vide [\#35](https://github.com/IGNF/geoportal-extensions/issues/35)
- Feature ol3 layerimport [\#28](https://github.com/IGNF/geoportal-extensions/pull/28)
- layerswitcher ol3 : gestion des changements de zindex [\#26](https://github.com/IGNF/geoportal-extensions/pull/26)
- mise en place du controle d'import de couches \(OL3\) [\#24](https://github.com/IGNF/geoportal-extensions/pull/24)
- ol.control.LayerImport : encodeURIComponent\(\) lorsqu'on utilise un proxy [\#34](https://github.com/IGNF/geoportal-extensions/issues/34)
- Support IE9 envisageable pour OL3 ? [\#13](https://github.com/IGNF/geoportal-extensions/issues/13)
- fix issue\#29 : LayerSwitcher - addLayer with zIndex param [\#33](https://github.com/IGNF/geoportal-extensions/pull/33)

## [leaflet-0.8.1-dev](https://github.com/IGNF/geoportal-extensions/tree/leaflet-0.8.1-dev) (2016-07-21)
[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/ol3-0.10.0...leaflet-0.8.1-dev)


- PB de Compatibilité IE10 \(extension OL3 et Leaflet\) [\#30](https://github.com/IGNF/geoportal-extensions/issues/30)
- Authentification HTTP et couches WMTS [\#31](https://github.com/IGNF/geoportal-extensions/issues/31)
- Rajout des définitions du registre IGNF et enrichissement des définitions EPSG dans les extensions [\#36](https://github.com/IGNF/geoportal-extensions/issues/36)
- Appel aux webservices en HTTPs quand on est en HTTPs [\#15](https://github.com/IGNF/geoportal-extensions/issues/15)
- L.geoportalControl.SearchEngine : réponses sans lien avec la question [\#32](https://github.com/IGNF/geoportal-extensions/issues/32)
- L.geoportalControl.Route : calcul n'aboutissant pas [\#23](https://github.com/IGNF/geoportal-extensions/issues/23)
- L.geoportalControl.Route : affichage de la durée [\#22](https://github.com/IGNF/geoportal-extensions/issues/22)
- L.geoportalControl.Route : changement de comportement du mode "Pointer le lieu" [\#9](https://github.com/IGNF/geoportal-extensions/issues/9)
- L.geoportalControl.Route : Départ et Arrivée modifiés lors du calcul [\#6](https://github.com/IGNF/geoportal-extensions/issues/6)
- L.geoportalControl.Route : nombre de chiffres pour l'affichage de la distance [\#5](https://github.com/IGNF/geoportal-extensions/issues/5)
- L.geoportalControl.Route : calcul n'aboutissant pas [\#23](https://github.com/IGNF/geoportal-extensions/issues/23)
- L.geoportalControl.Route : mise en évidence sur le détail de l'itinéraire [\#7](https://github.com/IGNF/geoportal-extensions/issues/7)
- correctif sur l'extension leaflet route [\#16](https://github.com/IGNF/geoportal-extensions/pull/16)
- L.geoportalControl.ReverseGeocode : mise en évidence non visible [\#19](https://github.com/IGNF/geoportal-extensions/issues/19)
- L.geoportalControl.ReverseGeocode : tracé partiel [\#18](https://github.com/IGNF/geoportal-extensions/issues/18)
- Extension Leaflet Reverse en version Leaflet 1.0.0 [\#17](https://github.com/IGNF/geoportal-extensions/issues/17)
- ajout des accents dans les formulaires du composant SearchEngine \(rec… [\#14](https://github.com/IGNF/geoportal-extensions/pull/14)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
