# Change Log

## [Unreleased](https://github.com/IGNF/geoportal-extensions/tree/HEAD)

[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/ol3-0.11.0...HEAD)

**Implemented enhancements:**

- extension Ol3 : ol.layer.WMS : le nom du layer n'est pas rempli automatiquement dans le layerswitcher [\#110](https://github.com/IGNF/geoportal-extensions/issues/110)
- Extension OL3 : gestion des styles avec le format KML [\#98](https://github.com/IGNF/geoportal-extensions/issues/98)
- Préfixage classe CSS GPmeasureToolTip.css [\#96](https://github.com/IGNF/geoportal-extensions/issues/96)
- Extension OL3 : Problèmes d'exports dûs à l'incompatibilité entre la couche dessin et la couche mesure [\#84](https://github.com/IGNF/geoportal-extensions/issues/84)
- Extension Ol3 - widget d'import de données : ajouter le format GeoJSON [\#77](https://github.com/IGNF/geoportal-extensions/issues/77)
- L'implémentation de Promise \(ES6\) écrase celle existante [\#67](https://github.com/IGNF/geoportal-extensions/issues/67)

**Fixed bugs:**

- \[Safari\]\[OL3\] Profil altimétrique [\#108](https://github.com/IGNF/geoportal-extensions/issues/108)
- ol.control.SearchEngine : postalcode autocompletion returns null coordinates \[0,0\] [\#107](https://github.com/IGNF/geoportal-extensions/issues/107)
- \[Extension Route\] Problème d'affichage du tracé du calcul d'itinéraire sur un petit parcours... [\#95](https://github.com/IGNF/geoportal-extensions/issues/95)
- OL3 : widget elevationPath [\#93](https://github.com/IGNF/geoportal-extensions/issues/93)
- Extension OL3 : Récupérer la couche de dessin après import des données pour vision des légendes et édition [\#91](https://github.com/IGNF/geoportal-extensions/issues/91)
- Extension OL3 : Problèmes d'exports dûs à l'incompatibilité entre la couche dessin et la couche mesure [\#84](https://github.com/IGNF/geoportal-extensions/issues/84)
- Extension OL3 : geocodage inverse - ménage à la suppression du controle ? [\#58](https://github.com/IGNF/geoportal-extensions/issues/58)

**Closed issues:**

- Attribut "data-key" non reconnu ? [\#113](https://github.com/IGNF/geoportal-extensions/issues/113)
- Extension OL3: Evénement IGN disponible après l'ajout d'une annotation ? [\#111](https://github.com/IGNF/geoportal-extensions/issues/111)
- Création d'un processus de build d'extensions "mixtes" [\#105](https://github.com/IGNF/geoportal-extensions/issues/105)
- Error in GeoportalAttribution when adding a ol.layer.Group [\#102](https://github.com/IGNF/geoportal-extensions/issues/102)
- Extension OL3 : Gestion des interactions de dessin entre chaque extension [\#99](https://github.com/IGNF/geoportal-extensions/issues/99)
- Creation du fichier autoconf.json [\#94](https://github.com/IGNF/geoportal-extensions/issues/94)
- \[Question\] : Renommer les éléments automatiquement ajoutés à la couche LayerSwitcher après instanciation de la carte ? [\#85](https://github.com/IGNF/geoportal-extensions/issues/85)
- Extensions : certains widgets ne peuvent pas apparaitre plusieurs fois sur une même page [\#74](https://github.com/IGNF/geoportal-extensions/issues/74)
- Support complet de Leaflet 1.0 [\#68](https://github.com/IGNF/geoportal-extensions/issues/68)

**Merged pull requests:**

- Option 'geodesic' sur le calcul d'azimut… [\#115](https://github.com/IGNF/geoportal-extensions/pull/115) ([lowzonenose](https://github.com/lowzonenose))
- Review taskrunner [\#112](https://github.com/IGNF/geoportal-extensions/pull/112) ([lowzonenose](https://github.com/lowzonenose))
- Feature ol3 upgrade [\#106](https://github.com/IGNF/geoportal-extensions/pull/106) ([lboulanger](https://github.com/lboulanger))
- Gestion des interactions entre extensions [\#101](https://github.com/IGNF/geoportal-extensions/pull/101) ([lowzonenose](https://github.com/lowzonenose))
- Fix duplicat des attributions [\#97](https://github.com/IGNF/geoportal-extensions/pull/97) ([sylvainpolletvillard](https://github.com/sylvainpolletvillard))
- fix \#77 : add GeoJSON format to ol3 layerimport control \(ol.control.LayerImport\) [\#92](https://github.com/IGNF/geoportal-extensions/pull/92) ([lboulanger](https://github.com/lboulanger))
- Feature elevation path [\#90](https://github.com/IGNF/geoportal-extensions/pull/90) ([lowzonenose](https://github.com/lowzonenose))
- Mise en conformité de l'extension layerswitcher pour la 3d... [\#88](https://github.com/IGNF/geoportal-extensions/pull/88) ([lowzonenose](https://github.com/lowzonenose))
- Feature wmts getfeatureinfo [\#87](https://github.com/IGNF/geoportal-extensions/pull/87) ([pjjmunier](https://github.com/pjjmunier))
- Feature LayerSwitcher  [\#86](https://github.com/IGNF/geoportal-extensions/pull/86) ([lowzonenose](https://github.com/lowzonenose))

## [ol3-0.11.0](https://github.com/IGNF/geoportal-extensions/tree/ol3-0.11.0) (2016-12-04)
[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/leaflet-0.9.0...ol3-0.11.0)

## [leaflet-0.9.0](https://github.com/IGNF/geoportal-extensions/tree/leaflet-0.9.0) (2016-12-04)
[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/ol3-0.11.0-dev...leaflet-0.9.0)

**Implemented enhancements:**

- Extension Ol3 : zoom moteur de recherche [\#78](https://github.com/IGNF/geoportal-extensions/issues/78)
- Extension OL3 : proposer un outil de calcul de profil altimétrique  [\#64](https://github.com/IGNF/geoportal-extensions/issues/64)
- Extension leaflet : Zoom barre de recherche  [\#63](https://github.com/IGNF/geoportal-extensions/issues/63)
- outils de croquis Ol3 : "outils d'édition" \(et non pas "outils d'éditon"\) [\#53](https://github.com/IGNF/geoportal-extensions/issues/53)
- ol.control.LayerImport : "epsg:3857" devrait permettre de reconnaître "EPSG:3857" [\#51](https://github.com/IGNF/geoportal-extensions/issues/51)

**Fixed bugs:**

- ol.control.LayerImport : extent mal récupérée pour les couches en EPSG:4326 [\#52](https://github.com/IGNF/geoportal-extensions/issues/52)
- ol.control.GeoportalAttribution: attributions de type texte ne s'affichent pas sous Safari [\#50](https://github.com/IGNF/geoportal-extensions/issues/50)

**Closed issues:**

- Pouvoir tracer les requêtes issues des extensions Géoportail [\#65](https://github.com/IGNF/geoportal-extensions/issues/65)
- Extension OL3 : proposer un outil de mesure de surface [\#57](https://github.com/IGNF/geoportal-extensions/issues/57)
- Extension OL3 : proposer un outil de mesure de distance [\#56](https://github.com/IGNF/geoportal-extensions/issues/56)
- Extension OL3 : proposer un outil de mesure d'azimuth [\#55](https://github.com/IGNF/geoportal-extensions/issues/55)

**Merged pull requests:**

- Feature leaflet elevationpath [\#82](https://github.com/IGNF/geoportal-extensions/pull/82) ([lowzonenose](https://github.com/lowzonenose))
- Feature ol3 searchengine [\#81](https://github.com/IGNF/geoportal-extensions/pull/81) ([lowzonenose](https://github.com/lowzonenose))
- Feature ol3 mouseposition [\#80](https://github.com/IGNF/geoportal-extensions/pull/80) ([lowzonenose](https://github.com/lowzonenose))
- fix \#76 : ol.control.layerimport - define default styles for KML and GPX imports [\#79](https://github.com/IGNF/geoportal-extensions/pull/79) ([lboulanger](https://github.com/lboulanger))
- Zoom automatique selon le résultat de la recherche  [\#75](https://github.com/IGNF/geoportal-extensions/pull/75) ([lowzonenose](https://github.com/lowzonenose))
- Feature Elevation Path [\#71](https://github.com/IGNF/geoportal-extensions/pull/71) ([lowzonenose](https://github.com/lowzonenose))
- fix \#61 : ol.control.LayerImport - display WMS enclosed child layers [\#62](https://github.com/IGNF/geoportal-extensions/pull/62) ([lboulanger](https://github.com/lboulanger))
- Feature ol3 layerimport : get correct geographical extent for WMS layers \(\#52\) [\#60](https://github.com/IGNF/geoportal-extensions/pull/60) ([lboulanger](https://github.com/lboulanger))
- Feature ol3 measures [\#59](https://github.com/IGNF/geoportal-extensions/pull/59) ([lowzonenose](https://github.com/lowzonenose))
- fix \#51 : try ol.proj.get\(crs.toUpperCase\(\)\) \(e.g. if crs="epsg:3857"\) [\#54](https://github.com/IGNF/geoportal-extensions/pull/54) ([lboulanger](https://github.com/lboulanger))

## [ol3-0.11.0-dev](https://github.com/IGNF/geoportal-extensions/tree/ol3-0.11.0-dev) (2016-09-02)
[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/leaflet-0.8.1-dev...ol3-0.11.0-dev)

**Implemented enhancements:**

- Evolutions widgets itinéraires et isochrones \(ol.control.Route et ol.control.Isocurve\) [\#43](https://github.com/IGNF/geoportal-extensions/issues/43)
- Rajout des définitions du registre IGNF et enrichissement des définitions EPSG dans les extensions [\#36](https://github.com/IGNF/geoportal-extensions/issues/36)
- Extension Ol3 : outil d'import - définir un style par défaut \(KML et GPX\) [\#76](https://github.com/IGNF/geoportal-extensions/issues/76)
- Gérer l'import d'un KML créé via le portail [\#47](https://github.com/IGNF/geoportal-extensions/issues/47)
- jsdoc ol.control.LayerSwitcher : corriger l'exemple d'utilisation de la méthode addLayer [\#45](https://github.com/IGNF/geoportal-extensions/issues/45)

**Fixed bugs:**

- Compatibilité IE10 : calculs d'itinéraires et isochrones non fonctionnels [\#40](https://github.com/IGNF/geoportal-extensions/issues/40)
- Compatibilité IE10 : css des widgets Route et Isochrone [\#39](https://github.com/IGNF/geoportal-extensions/issues/39)
- PB de Compatibilité IE10 \(extension OL3 et Leaflet\) [\#30](https://github.com/IGNF/geoportal-extensions/issues/30)
- ol.control.LayerSwitcher : ordre des couches pas toujours bien mis à jour [\#49](https://github.com/IGNF/geoportal-extensions/issues/49)
- ol.control.LayerSwitcher : addLayer with zIndex param [\#29](https://github.com/IGNF/geoportal-extensions/issues/29)

**Closed issues:**

- ol.control.GeoportalAttribution: ne pas créer d'éléments de liste \(\<li\>\) vide [\#35](https://github.com/IGNF/geoportal-extensions/issues/35)

**Merged pull requests:**

- Surcharge de ol.format.KML pour la gestion des styles sur les outils … [\#46](https://github.com/IGNF/geoportal-extensions/pull/46) ([lowzonenose](https://github.com/lowzonenose))
- ol : route & isocurve enhancements [\#44](https://github.com/IGNF/geoportal-extensions/pull/44) ([lboulanger](https://github.com/lboulanger))
- Fix ie10 compatibility  [\#41](https://github.com/IGNF/geoportal-extensions/pull/41) ([lboulanger](https://github.com/lboulanger))
- Suppression de codes EPSG en doublons [\#38](https://github.com/IGNF/geoportal-extensions/pull/38) ([lowzonenose](https://github.com/lowzonenose))
- Feature register proj4 [\#37](https://github.com/IGNF/geoportal-extensions/pull/37) ([lowzonenose](https://github.com/lowzonenose))

## [leaflet-0.8.1-dev](https://github.com/IGNF/geoportal-extensions/tree/leaflet-0.8.1-dev) (2016-07-21)
[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/ol3-0.10.0...leaflet-0.8.1-dev)

**Implemented enhancements:**

- Appel aux webservices en HTTPs quand on est en HTTPs [\#15](https://github.com/IGNF/geoportal-extensions/issues/15)
- L.geoportalControl.SearchEngine : réponses sans lien avec la question [\#32](https://github.com/IGNF/geoportal-extensions/issues/32)
- L.geoportalControl.Route : calcul n'aboutissant pas [\#23](https://github.com/IGNF/geoportal-extensions/issues/23)
- L.geoportalControl.Route : affichage de la durée [\#22](https://github.com/IGNF/geoportal-extensions/issues/22)
- L.geoportalControl.ReverseGeocode : mise en évidence non visible [\#19](https://github.com/IGNF/geoportal-extensions/issues/19)
- Extension Leaflet Reverse en version Leaflet 1.0.0 [\#17](https://github.com/IGNF/geoportal-extensions/issues/17)
- L.geoportalControl.Route : changement de comportement du mode "Pointer le lieu" [\#9](https://github.com/IGNF/geoportal-extensions/issues/9)
- Feature ol3 layerimport [\#28](https://github.com/IGNF/geoportal-extensions/pull/28) ([lboulanger](https://github.com/lboulanger))
- layerswitcher ol3 : gestion des changements de zindex [\#26](https://github.com/IGNF/geoportal-extensions/pull/26) ([lboulanger](https://github.com/lboulanger))
- mise en place du controle d'import de couches \(OL3\) [\#24](https://github.com/IGNF/geoportal-extensions/pull/24) ([lboulanger](https://github.com/lboulanger))

**Fixed bugs:**

- ol.control.LayerImport : encodeURIComponent\(\) lorsqu'on utilise un proxy [\#34](https://github.com/IGNF/geoportal-extensions/issues/34)
- L.geoportalControl.Route : Départ et Arrivée modifiés lors du calcul [\#6](https://github.com/IGNF/geoportal-extensions/issues/6)
- L.geoportalControl.Route : nombre de chiffres pour l'affichage de la distance [\#5](https://github.com/IGNF/geoportal-extensions/issues/5)
- L.geoportalControl.Route : calcul n'aboutissant pas [\#23](https://github.com/IGNF/geoportal-extensions/issues/23)
- L.geoportalControl.ReverseGeocode : tracé partiel [\#18](https://github.com/IGNF/geoportal-extensions/issues/18)
- Extension Leaflet Reverse en version Leaflet 1.0.0 [\#17](https://github.com/IGNF/geoportal-extensions/issues/17)
- L.geoportalControl.Route : mise en évidence sur le détail de l'itinéraire [\#7](https://github.com/IGNF/geoportal-extensions/issues/7)

**Closed issues:**

- Authentification HTTP et couches WMTS [\#31](https://github.com/IGNF/geoportal-extensions/issues/31)
- Support IE9 envisageable pour OL3 ? [\#13](https://github.com/IGNF/geoportal-extensions/issues/13)

**Merged pull requests:**

- fix issue\#29 : LayerSwitcher - addLayer with zIndex param [\#33](https://github.com/IGNF/geoportal-extensions/pull/33) ([lboulanger](https://github.com/lboulanger))
- Remplacement de la référence vers spatialreference.org par epsg.io [\#27](https://github.com/IGNF/geoportal-extensions/pull/27) ([ThomasG77](https://github.com/ThomasG77))
- correctif sur l'extension leaflet route [\#16](https://github.com/IGNF/geoportal-extensions/pull/16) ([lowzonenose](https://github.com/lowzonenose))
- ajout des accents dans les formulaires du composant SearchEngine \(rec… [\#14](https://github.com/IGNF/geoportal-extensions/pull/14) ([lowzonenose](https://github.com/lowzonenose))

## [ol3-0.10.0](https://github.com/IGNF/geoportal-extensions/tree/ol3-0.10.0) (2016-06-07)
[Full Changelog](https://github.com/IGNF/geoportal-extensions/compare/leaflet-0.8.0...ol3-0.10.0)

## [leaflet-0.8.0](https://github.com/IGNF/geoportal-extensions/tree/leaflet-0.8.0) (2016-06-07)
**Merged pull requests:**

- README-leaflet.md [\#3](https://github.com/IGNF/geoportal-extensions/pull/3) ([lowzonenose](https://github.com/lowzonenose))
- ajout d'un "s" à OpenLayers 3 [\#2](https://github.com/IGNF/geoportal-extensions/pull/2) ([lboulanger](https://github.com/lboulanger))
- Quelques correctifs OL3 \(syntaxe\) [\#1](https://github.com/IGNF/geoportal-extensions/pull/1) ([lboulanger](https://github.com/lboulanger))



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*