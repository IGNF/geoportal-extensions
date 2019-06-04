# Migration vers OpenLayers v5 & MapBox

<https://github.com/IGNF/geoportal-extensions/tree/update-ol5>
> PR : <https://github.com/IGNF/geoportal-extensions/pull/228>

Cette branche est clonée sur [feature-layerimport-mapbox] :

    commit 7408bb00f0af51fd7c2b0f2dd1dffb901220f8df
    Author: lowzonenose <jpbazonnais@gmail.com>
    Date:   Mon Dec 17 14:38:49 2018 +0100

        Gestion des groupes dans l'editeur MapBox...

> **INFO**
Prise en compte des dev sur itowns 2.8.0 (branche itowns_v2.8.0)


Pour la creation des modules et des exemples, on utilise la commande suivante :
> ./node_modules/.bin/webpack --config build/webpack/webpack.config.openlayers.modules.js
[--mode=[development|production]]

Les bundles des modules sont disponible :
> dist/openlayers/modules/

Les exemples sont disponibles dans le répertoire *samples*, et
les fichiers sont suffixés avec le tag *modules*.

## OpenLayers 5.3.0

### Avancements

- [x] Migrer vers ol v5.3.0   : **OK**

- [x] Rendre openlayers externe : **OK**

- [x] dépendance olms : externe ou interne ? : **OK**

  - Comment doit on intégrer *olms* dans le code des extensions : interne ou externe ?

    ``` text
    La dependance *olms* est une extension pour openlayers qui permet de lire les
    fichiers json de style MapBox. Nous en avons besoin au niveau de l'API Extensions
    sur le widget *LayerImport*.
    L'API SDK utilise aussi cette dependance.
    ```

    > la librairie ol est externalisée mais on decide de mettre olms en interne...

- [x] Tests à jouer / à creer : **OK**

    cf. <https://staxmanade.com/blog/categories/mochajs/>

    > **OK** test sur les projections !

    > **TODO** couvrir et finir les tests sur le DOM / Controles

        npm run cover

    > **OK** les tests sur openlayers & mouseposition : *cf. CRS !*

- [ ] Tests de rendu à jouer  : **NOK**

    > **FIXME** depuis passage en https, des fenetres intempestives s'ouvrent avec un message !?

    > **FIXME** les css rendent floues certaines images !?

    > **FIXME** laisser le temps que les images montent (delay) !

    - [x] leaflet    : qq échecs...
    - [x] openlayers : qq échecs...
    - [x] itowns     : qq échecs...

    - **EVOL** passage sous Puppeter avec l'outil puppetry ?

- [x] Exemples sur les modules : **OK**

- [x] Exemples  : **OK**

    > le proxy.php n'est pas reconnu comme du PHP par le serveur local webpack !? On décide donc de rediriger les requêtes à proxifier vers un proxy déployé en local...

- [x] **OK** Test des variables globales : *ex. Gp, ol et proj4*

    - [x] **OK** *ol* :
        ol.js est externe donc ol est exposée

    - [x] **OK** *proj4* :
        ex. proj4("EPSG:2154")

    - [x] **OK** *ol.proj* :
        ex. ol.proj.get("EPSG:2154")

    - [x] **OK** *Gp* :
        la date et la version sont récupérées de l'API des services (*__GPDATE__*)

- [x] Mettre à jour la JSDoc


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

    * [ ] CRS : **TODO**

        cf. https://github.com/openlayers/openlayers/blob/master/changelog/upgrade-notes.md#changes-in-proj4-integration

        - [x] *FIXME* performance sur l'ajout des projection avec ol et proj4 !!!

            cf. test de performance...

            ``` text
            Doit on charger autant de projections ?
            Ne devrait on pas charger uniquement les projections usuelles ?
            Et proposer les autres à la demande via un appel de fonction de chargement ?
            ```

            > choix d'une liste par defaut + Gp.includeProjections()

        - [x] merge à faire : https://github.com/IGNF/geoportal-extensions/pull/227

        - [ ] *FIXME* bug pour ajouter des projection **geocent** sur le registre IGNF !?

            ``` text
            Comment peut remplacer ce type de projections ?
            ```

        - [x] on ne surcharge pas la fonction transformExtent mais on ajoute un setExtent() sur
            l'EPSG:2154
                - à quoi sert la fonction MousePosition::validateExtentCoordinate ?
                - les systemes de projection de MousePosition ont déjà une validity extent en option ?

    * [x] Editor : **OK**

    * [x] Register : **OK**

    * [x] interactions : **OK**

## TODOLIST sur la gestion du projet

- [x] **FAIT** Migrer vers webpack 4

- [ ] **EVOL** Autoprefixer CSS avec postCSS

- [x] webpack supprime les commentaires ainsi que les copyright sur la minification !?

  cf. <https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments>
  cf. <https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/222>

  > **FAIT** utilisation de l'option "comment:'some'" mais encore qq soucis...

- [ ] **TODO** bundlesize : cf. https://github.com/siddharthkp/bundlesize

    | NEW   |  ol |  it |  L |
    |-------|-----|-----|----|
    | prod  | **1.2**  | 0.34 | 0.6  |
    | map   | 8.8  | 3.4  | 5.3  |
    | src   | 3.0  | 1.2  | 1.8  |

    | OLD   |  ol |  it |  L |
    |-------|-----|-----|----|
    | prod  | 0.75 | 0.34 | 0.6  |
    | map   | 6.3  | 3.3  | 5.3  |
    |  src  | 2.1  | 1.2  | 1.9  |

- [ ] **TODO** documentation sur l'utilisation de l'API en mode module ou bundle.

- [x] **FAIT** exemples AMD à supprimer.

  > realisation d'un exemple dans le projet 3rd Party...

- [ ] **TODO** integration des extensions ES6 dans le projet 3rd Party...

- [x] **FAIT** geoportal access lib

  > utilisation des sources ES6 modules dans le code.

  une modification du package.json est à faire :
  - *module* vers l'index des sources
  - *main* pointe vers le bundle (non minifié)
  - *browser* ?

- [x] **FAIT** deplacement des CSS avec les JS

- [x] **FAIT** [MODULES] creation d'une CSS commune à tous les controles (via webpack)

    > **FIXME** creation d'un JS avec la CSS commune !?

    cf. <https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/518>

- [x] **FAIT** [MODULES] creation des exemples des modules (via webpack)

    cf. webpack (build only samples) !
- [x] **FAIT** [MODULES] modifier le template des exemples des modules

- [x] **FAIT** deplacement des webpack dans un répertoire
    > ex. build/

- [x] **FAIT** deplacement des README dans un répertoire

- [x] **FAIT** deplacement des JSON dans un répertoire
    > ex. build/

- [x] **FAIT** deplacement des JSDOC dans un autre répertoire
    > ex. build/

- [x] **FAIT** deplacement des licences **templates** dans un répertoire
    > ex. build/

- [x] **FAIT** maj du script de publication

- [x] **FAIT** changelog & draft
    > <https://api.github.com/repos/IGNF/geoportal-extensions/releases>

## EVOL

- Autoconf

    ``` text
    Si on n'a pas d'autoconf (ou droit sur une ressources), une exception est lancée :
    "contract key configuration has to be loaded to load Geoportal layers"

    Hors un defaut d'autoconf ne devrait pas stopper l'affichage, mais on se doit
    d'affiche à minima une carte vide !

    Sans autoconf (ou droit), il faudrait rendre les boutons de calculs non
    cliquable (ex. Route ou Iso)...
    ```

- Editeur MapBox

  - Mettre en place un drag&drop sur les layers MapBox (gestion ordre d'empilement/affichage)
  - Prévoir l'edition du mode circle, texte et/ou icone
