# Migration vers OpenLayers v5 & MapBox

https://github.com/IGNF/geoportal-extensions/tree/update-ol5
> PR : https://github.com/IGNF/geoportal-extensions/pull/228

Cette branche est clonée sur [feature-layerimport-mapbox] :

    commit 7408bb00f0af51fd7c2b0f2dd1dffb901220f8df
    Author: lowzonenose <jpbazonnais@gmail.com>
    Date:   Mon Dec 17 14:38:49 2018 +0100

        Gestion des groupes dans l'editeur MapBox...


Pour la creation des modules et des exemples, on utilise la commande suivante :
> ./node_modules/.bin/webpack --config build/webpack/webpack.config.openlayers.modules.js
[--env.[development|production]]


Les bundles des modules sont disponible :
> dist/openlayers/modules/

Les exemples sont disponibles dans le répertoire *samples*, et
les fichiers sont suffixés avec le tag *modules*.

> **INFO**
> Suite à un probleme de minification à cause de la version de Webpack 3 et ES6...
> on utilise donc une version anterieur du package *uglifyjs-webpack-plugin* > 1.3.0 !
> Lors du passage en Webpack 4, on pourra utiliser la version de minification incluse dans webpack.

> **INFO**
> if you set NODE_ENV=production or use the --production flag it will not install devDependencies
> when you run *npm install*

# OpenLayers 5.3.0

## Avancements

- [x] Migrer vers ol v5.3.0   : **OK**

- [x] dépendance olms : interne ? : **OK**

    - Comment doit on intégrer *olms* dans le code des extensions : interne ou externe ?
        ```
        La dependance *olms* est une extension pour openlayers qui permet de lire les
        fichiers json de style MapBox. Nous en avons besoin au niveau de l'API Extensions
        sur le widget *LayerImport*.
        L'API SDK utilise aussi cette dependance.
            API Extensions : ol et olms en externe (cad à la charge du client de les ajouter)
            API SDK : ol et olms en interne (cad livrées dans le bundle final)
        ```

    - pour info, le binaire est :
    > https://unpkg.com/ol-mapbox-style/dist/olms.js

- [ ] Migrer vers webpack 4   : **TODO**

- [ ] Autoprefixer CSS avec postCSS : **TODO**

- [x] Tests à jouer / à creer : **OK**

    cf. https://staxmanade.com/blog/categories/mochajs/

    > **OK** test sur les projections !

    > **TODO** couvrir et finir les tests sur le DOM

    > **OK** les tests sur openlayers & mouseposition : *cf. CRS !*

- [ ] Tests de rendu à jouer  : **NOK**

    > **FIXME** depuis passage en https, des fenetres intempestives s'ouvrent avec un message !?

    > **FIXME** les css rendent floues certaines images !?

    > **FIXME** laisser le temps que les images montent (delay) !

    - [x] leaflet    : qq échecs...
    - [x] openlayers : qq échecs...
    - [x] itowns     : qq échecs...

- [x] Exemples sur les modules : **OK**

- [x] Exemples  : **OK**

    > le proxy.php n'est pas reconnu comme du PHP par le serveur local webpack !?
    On decide donc de rediriger les requêtes à proxifier vers un proxy deployer en local...

- [x] **OK** Test des variables globales : *ex. Gp, ol et proj4*

    - [x] **OK** *ol* :
        ol.js est externe donc ol est exposée

    - [x] **OK** *proj4* :
        ex. proj4("EPSG:2154")

    - [x] **OK** *ol.proj* :
        ex. ol.proj.get("EPSG:2154")

    - [x] **OK** *Gp* :
        sauf la date de l'API des services (*__GPDATE__*)
        > **FIXME** comment récuperer la date de compilation de l'API des Services ?
        > **FIXME** comment récuperer la version directement des sources de l'API des Services ?

### Les sources

- [x] Format **Ok**

    * [x] ol.format.KMLExtended  :
    > **EVOL** Refonte à prévoir en fonction des avancées openlayers...

    * [x] ol.source.WMTSExtended :

- [x] Layer

    **OK pour les projections**
    > *cf. CRS !*

    * [x] ol.source.GeoportalWMTS : **OK**
    * [x] ol.source.GeoportalWMS  : **OK**
    * [x] ol.layer.GeoportalWMTS  : **OK**
    * [x] ol.layer.GeoportalWMS   : **OK**

- [x] Controls

    * [x] ol.control.LayerSwitcher : **OK**

    * [x] ol.control.GeoportalAttribution : **OK**
        - probleme de CSS mais natif (hauteur du bouton lors d'un clic) !

    * [x] ol.control.GetFeatureInfo : **OK**

    * [x] ol.control.SearchEngine : **OK**

    * [x] ol.control.LocationSelector : **OK**
        - mise en place d'un hack pour resoudre le conflit de CSS...

    * [x] ol.control.Route : **OK**

    * [x] ol.control.Isocurve : **OK**

    * [x] ol.control.GeoportalMousePosition : **OK**
        - *cf. CRS !*

    * [x] ol.control.Drawing : **OK**

    * [x] ol.control.ReverseGeocode : **OK**

    * [x] ol.control.LayerImport : **OK**

    * [x] ol.control.MeasureLength : **OK**
    * [x] ol.control.MeasureArea : **OK**
    * [x] ol.control.MeasureAzimuth : **OK**
        - en mode modules, la toolbox et les interactions entre outils sont partagées
        dans le contexte d'execution via les variables :
        > *gpShareMeasures* et *gpShareMeasureToolBox*

        Ceci fonctionne dans un contexte Web, mais à tester dans un Front End (ex. Ember)

    * [x] ol.control.ElevationPath : **OK**

- [ ] Other

    > **OK** upgrade proj4 > 2.5.0 !

    * [ ] CRS : **PROGRESS**

        cf. https://github.com/openlayers/openlayers/blob/master/changelog/upgrade-notes.md#changes-in-proj4-integration

        - [x] merge à faire : https://github.com/IGNF/geoportal-extensions/pull/227
        - [ ] *FIXME* bug pour ajouter des projection **geocent** sur le registre IGNF !?
        - [x] on ne surcharge pas la fonction transformExtent mais on ajoute un setExtent() sur
            l'EPSG:2154
                - à quoi sert la fonction MousePosition::validateExtentCoordinate ?
                les systemes de projection de MousePosition ont déjà une validity extent en option ?

    * [x] Editor : **OK**

    * [x] Register : **OK**

    * [x] interactions : **OK**

## TODOLIST sur la gestion du projet

* [x] **FAIT** exemples AMD à supprimer.

    > realisation d'un exemple dans le projet 3rd Party...

* [ ] **TODO** integration des extensions ES6 dans le projet 3rd Party...

* [x] **FAIT** geoportal access lib

    > utilisation des sources ES6 modules dans le code.


* [x] **FAIT** deplacement des CSS avec les JS

    > **INFO** c'est peut être une mauvaise idée d'integrer les CSS dans les sources
    car souci dans le SDK à transpiler les modules (pb de loader sur les CSS !?)

* [x] **FAIT** creation d'une CSS commune à tous les controles (via webpack)

    > **FIXME** creation d'un JS avec la CSS commune !?
    cf. https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/518

* [x] **FAIT** creation des exemples des modules (via webpack)

    cf. webpack (build only samples) !

* [x] **FAIT** modifier le template des exemples des modules

* [x] **FAIT** deplacement des webpack dans un répertoire
    > ex. build/

* [x] **FAIT** deplacement des README dans un répertoire

* [x] **FAIT** deplacement des JSON dans un répertoire
    > ex. build/

* [x] **FAIT** deplacement des JSDOC dans un autre répertoire
    > ex. build/

* [x] **FAIT** deplacement des licences **templates** dans un répertoire
    > ex. build/

* [x] **FAIT** maj du script de publication

* [x] **FAIT** changelog & draft
    > https://api.github.com/repos/IGNF/geoportal-extensions/releases

# EVOL

- Autoconf

    > Si on n'a pas d'autoconf (ou droit sur une ressources), une exception est lancée :
    "contract key configuration has to be loaded to load Geoportal layers"

    > Hors un defaut d'autoconf ne devrait pas stopper l'affichage, mais on se doit
    d'affiche à minima une carte vide !

    > Sans autoconf (ou droit), il faudrait rendre les boutons de calculs non
    cliquable (ex. Route ou Iso)...

- Editeur MapBox

    > Mettre en place un drag&drop sur les layers MapBox (gestion ordre d'empilement/affichage)

    > Prévoir l'edition du mode circle, texte et/ou icone

# TEST avec MapBoxGl

## intégration du client MapBoxGl ?
cf. exemple http://tsauerwein.github.io/ol3/mapbox-gl-js/examples/mapbox-gl-js.html
