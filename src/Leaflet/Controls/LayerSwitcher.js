/**
 * desativation JSHINT
 * W106 - Identifier '_geoportal_id' is not in camel case
 */

 /*jshint -W106 */

define([
    "leaflet",
    "woodman",
    "Common/Utils/SelectorID",
    "Common/Controls/LayerSwitcherDOM"
], function (
    L,
    woodman,
    ID,
    LayerSwitcherDOM
) {

    "use strict";

    var logger = woodman.getLogger("layerswitcher");

    /**
    * @classdesc
    *
    * Leaflet Control Class to manage map layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
    *
    * Use {@link module:Controls.LayerSwitcher L.geoportalControl.LayerSwitcher()} factory to create instances of that class.
    *
    * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control-layers" target="_blank">L.Control.Layers</a> native class.
    *
    * @namespace
    * @alias L.geoportalControl.LayerSwitcher
    */
    var LayerSwitcher = L.Control.Layers.extend( /** @lends L.geoportalControl.LayerSwitcher.prototype */ {

        includes : LayerSwitcherDOM,

        /**
        * options by default
        * (extend to L.Control.Layers)
        *
        * @private
        */
        options : {
            collapsed : true,
            position : "topright",
            autoZIndex : true,
            layers : []
        },

        // ################################################################### //
        // ##################### Methodes surchargées ######################## //
        // ################################################################### //

        /**
        * @constructor LayerSwitcher
        *
        * @private
        * @alias LayerSwitcher
        * @extends {L.Control}
        * @param {Object} options - options of component
        * @param {String}  [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.collapsed] - collapse mode, false by default
        * @param {Array} [options.layers] - list of layers to be configured. Each array element is an object, with following properties :
        * @param {Object} [options.layers.layer] - layer object
        * @param {Boolean} [options.layers.display] - display layer in widget layer list
        * @param {String} [options.layers.config.visibility] - layer visibility on map
        * @param {String} [options.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
        * @param {String} [options.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
        * @param {String} [options.layers.config.quicklookUrl] - link to a quick look image for this layer.
        * @param {Array} [options.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
        *      - url (String, mandatory) : link to a legend
        *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
        * @param {Array} [options.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
        *
        * @example
        *  layers = [
        *      {
        *          layer : wms1,
        *          display : false,
        *          config : {
        *              title : "test layer name 1",
        *              description : "test layer desc 1",
        *          }
        *      }
        *  ]
        *  options = {
        *      position : "topright",
        *      collapsed : true,
        *      layers : layers
        *  }
        *
        *  var layerSwitcher = L.geoportalControl.LayerSwitcher(options);
        */
        initialize : function (options) {

            L.Util.setOptions(this, options);

            // uuid
            this._uid = ID.generate();

            // il faut recuperer tous les layers de la carte (cf. onAdd).
            // si une configuration de layers est renseignée, on exploite cette
            // information pour les layers renseignés.
            // Par contre, pour ceux qui n'ont pas de configuration, on exploite
            // les informations issues de l'autoconf pour les layers IGN,
            // et, pour les layers non IGN, on gére avec l'ID pours les valeurs
            // de titre ou description  ...

            // a ton une configuration des layers ?
            this._hasLayersConfig = (!this.options.layers || Object.keys(this.options.layers).length === 0) ? false : true;

            // configuration des layers
            this._layersConfig = (this._hasLayersConfig) ? this.options.layers : [];

            // liste des layers (c'est l'interface avec le dom !)
            this._layers = {};

            // indice : ordre des layers sur la carte
            // plus c'est haut, plus c'est au dessus de la pile
            this._lastZIndex = 0;

            // si on a une configuration de layers, on l'exploite tout de suite...
            if (this._hasLayersConfig) {
                for (var i = 0; i < this._layersConfig.length; i++) {
                    var obj = this._layersConfig[i];
                    // signature de la fonction pour une compatibilité avec leaflet...
                    this._addLayer(obj.layer, null, true);
                }
            }

        },

        /**
        * Method 'onAdd'
        * (extend to L.Control.Layers)
        * Method to add the control on the map.
        *
        * @param {Object} map - L.Map
        * @returns {HTMLElement} container
        *
        * @private
        */
        onAdd : function (map) {

            // on charge tous les layers dans le controle avec une
            // configuration automatique des layers pour ceux qui ne sont pas
            // renseignés.
            var layersMap = map._layers;

            // on est dans le cas où nous avons des layers ajoutés à la carte
            if (Object.keys(layersMap).length !== 0) {

                // pour gerer l'ordre d'affichage des layers sur la map
                // ainsi que dans le controle, on veut le fonctionnement suivant :
                // layers ID   : [21  , 23  , 25  , 27]
                // layers Map  : [21:1, 23:2, 25:3, 27:4]
                // mais l'ordre dans le controle doit être inversé
                // layers Ctrl : [27, 25, 23, 21], et ceci sera realisé lors de
                // la creation du DOM pour chaque layer (cf. _update())

                var layersKeys = Object.keys(layersMap); // trie
                this._lastZIndex = 0;
                for (var i = 0; i < layersKeys.length; i++) {

                    var layerId = layersKeys[i];

                    // gestion des ordres d'affichage des layers
                    if (this.options.autoZIndex && layersMap[layerId].setZIndex) {
                        this._lastZIndex++;
                        layersMap[layerId].setZIndex(this._lastZIndex);
                    }

                    // y'a t il une configuration des layers ?
                    // si oui, le layer renseigné a déjà été pris en compte dans
                    // le constructeur..., on passe à la suite...
                    if (this._hasLayersConfig) {
                        if (this._layers[layerId]) {
                            continue;
                        }
                    }

                    // sans configuration, on gére en mode auto le layer.
                    // on utilise cette methode
                    // this.addOverlay() -> this._addLayer()...
                    this.addOverlay(layersMap[layerId]);
                }
            }

            // FIXME au cas où les layers n'ont pas été renseignés sur la carte
            // (via addTo ou options.layers), on decide de prendre ceux qui
            // sont renseignés dans la configuration ?
            if (Object.keys(layersMap).length === 0) {

                var config = this._layersConfig;
                this._lastZIndex = 0;
                for (var j = 0; j < config.length; j++) {

                    var layer = config[j].layer;

                    if (! map.hasLayer(layer)) {

                        // on ajoute le layer à la carte
                        map.addLayer(layer);

                        // on met en place la structure
                        this.addOverlay(layer, null);

                        // on gère l'ordres d'affichage des layers
                        if (this.options.autoZIndex && layer.setZIndex) {
                            this._lastZIndex++;
                            layer.setZIndex(this._lastZIndex);
                        }
                    }
                }
            }

            // mise à jour des visibilités (au niveau du DOM, oeil coché ou non...)
            for (var k in this._layers) {
                if (this._layers.hasOwnProperty(k)) {
                    var obj = this._layers[k];
                    var _layer = obj.layer;
                    var _visibility = obj.visibility;
                    // par defaut, la visibilité de la couche est active, donc avec un oeil non coché !
                    if (!_visibility) {
                        // on met à jour la liste des layers à afficher !
                        this._updateVisibilityLayer(_layer);
                    }
                }
            }

            // le constructeur retourne this._container !
            // on appelle la methode hérité car elle va realisée le boulot :
            // - _initLayout
            // - _update
            // - evenements sur la carte : layeradd + layerremove
            // L.Control.Layers.prototype.onAdd.call(this, map);
            this._initLayout();
            this._update();
            map.on("layeradd", this._onLayerChange, this);
            map.on("layerremove", this._onLayerChange, this);

            // expiremental !
            map.eachLayer(function (layer) {
                // ecouteur sur la visibilité des attributions d'un layer IGN
                layer.on("visibilitychange", function () {
                    logger.trace("visibilitychange", layer);
                },
                this);
                // ecouteur sur la liste des attributions d'un layer IGN
                layer.on("attributionchange", function () {
                    logger.trace("attributionchange", layer);
                },
                this);
            });

            return this._container;
        },

        /**
        * Method '_addLayer'
        * (overwritten : L.Control.Layers)
        * Methode creation of a useful structure for the interface with the DOM
        * Method private call by this.initialize() or this.addOverlay()
        *
        * @example
        * {
        *    layer : objectlayer,
        *    id : id,
        *    title : title,
        *    description : description
        *    (...)
        * };
        * @param {Object} layer - object type 'L.TileLayer'
        * @param {String} name - layer name or title
        * @param {Boolean} overlay - overlay or not
        *
        * @private
        */
        _addLayer : function (layer, name, overlay) {

            // id du layer (IGN ou non)
            var id = (layer._geoportal_id) ? layer._geoportal_id : layer._leaflet_id;

            // pas d'ID !?
            // le layer n'est pas chargé dans la carte...
            if ( typeof id === "undefined" ) {
                return;
            }

            // recherche de la config pour un layer donné
            var layerConfig = {};
            for (var i in this._layersConfig) {
                if (this._layersConfig.hasOwnProperty(i)) {
                    if (id === L.stamp(this._layersConfig[i].layer)) {
                        layerConfig = this._layersConfig[i].config;
                        // display
                        // ce layer n'est pas pris en compte dans le controle
                        // mais il peut être affiché dans la map
                        // si au préalable, le client l'a ajouté...
                        var display = ( typeof this._layersConfig[i].display != "undefined" ) ? this._layersConfig[i].display : true;
                        if (!display) {
                            return;
                        }
                        break;
                    }
                }
            }

            // construit un objet simplifié pour le dom,
            // par defaut, on prend en compte les layers de type IGN
            // (info de l'autoconf).
            this._layers[id] = {
                layer : layer,
                id : id,
                overlay : overlay, // not use !
                title : (layer._geoportal_id && layer._title) ? layer._title : (name) ? name : id,
                description : (layer._geoportal_id && layer._description) ? layer._description : (name) ? name : id,
                visibility : true, // par defaut, sauf si surcharge via la config...
                legends : (layer._geoportal_id) ? layer._legends : null,
                metadata : (layer._geoportal_id) ? layer._metadata : null,
                quicklookUrl : (layer._geoportal_id) ? layer._quicklookUrl : null
            };

            // surcharge la config ci dessus avec les options de configuration saisies
            if (layerConfig && Object.keys(layerConfig)) {
                L.Util.extend(this._layers[id], layerConfig);
            }

            // mise à jour de la visibilité
            var _visibility = this._layers[id].visibility;
            if (layer._geoportal_id) {
                // mise à jour de la visibilité des attributions pour un layer IGN
                layer.setVisible(_visibility);
            }
            if (!_visibility) {
                // on met à jour la liste des layers à afficher !
                this._updateVisibilityLayer(layer);
            }

        },

        /**
        * Creation of layers of container
        * (extend to L.Control.Layers)
        *
        * Method private call by this.onAdd()
        *
        * @private
        */
        _initLayout : function () {

            // fonctionnement lors de l'initialisation :
            // onAdd -> this._update     -> this._addItem (on boucle sur layers)
            // onAdd -> this._initLayout

            // creation du container principal
            var container = this._container = this._createMainContainerElement();

            // ajout dans le container principal d'affichage des layers
            var input = this._createMainLayersShowElement();
            container.appendChild(input);

            // gestion du mode "collapsed"
            if (!this.options.collapsed) {
                input.checked = true;
            }

            // ajout dans le container principal de la liste des layers
            var divL = this._overlaysList = this._createMainLayersElement();
            container.appendChild(divL);

            // ajout dans le container principal du picto du controle
            var picto = this._createMainPictoElement();
            container.appendChild(picto);

            // ajout dans le container principal du panneau d'information
            var divI = this._createMainInfoElement();
            container.appendChild(divI);

            // creation du mode draggable
            this._createDraggableElement(this._overlaysList, this);

            // desactivation des evenements qui peuvent interférer avec la carte
            L.DomEvent
            .disableClickPropagation(container)
            .disableScrollPropagation(container);

            // gestion des evenements en interaction avec la carte
            this._map.on("moveend", this._onOutOfRangeLayerZoom, this);

            // gestion des CSS en fonction du placement du controle
            switch (this.getPosition()) {
                case "topright":
                    container.style.position = "relative";
                    container.style.top = "0";
                    container.style.right = "0";
                    break;
                case "topleft":
                    container.style.position = "relative";
                    container.style.top = "0";
                    container.style.right = "initial";
                    picto.style.float = "left";
                    divL.style.borderBottomRightRadius = "5px";
                    divL.style.borderBottomLeftRadius = "0";
                    divI.style.right = "initial";
                    divI.style.left = "190px";
                    break;
                case "bottomleft":
                    container.style.position = "relative";
                    container.style.top = "0";
                    container.style.right = "initial";
                    picto.style.float = "left";
                    divL.style.borderBottomRightRadius = "5px";
                    divL.style.borderBottomLeftRadius = "0";
                    divI.style.right = "initial";
                    divI.style.left = "190px";
                    // divI.style.top = "initial";
                    // divI.style.bottom = "190px";
                    break;
                case "bottomright":
                    container.style.position = "relative";
                    container.style.top = "0";
                    container.style.right = "0";
                    // divI.style.top = "initial";
                    // divI.style.bottom = "190px";
                    break;
                default:
                    container.style.position = "relative";
                    container.style.top = "0";
                    container.style.right = "0";
            }
        },

        /**
        * Update the construction of DOM for each layer
        * (extend to L.Control.Layers)
        *
        * Method private call by this.onAdd()
        *
        * @private
        */
        _update : function () {
            if ( !this._container ) {
                return;
            }

            this._overlaysList.innerHTML = "";

            var layersId = [];

            for (var i in this._layers) {
                if (this._layers.hasOwnProperty(i)) {
                    layersId.push(i);
                }
            }

            // inversion du sens des layers dans le controle
            // car on veut le même ordre que sur la map, et comme je suis un peu
            // parano, je re-trie la liste...
            var layers = layersId.sort(function (a, b) {
                var ia = parseInt(a, 10);
                var ib = parseInt(b, 10);
                return ia - ib;
            }).reverse();

            for (var j = 0; j < layers.length; j++) {
                var id = layers[j];
                var obj = this._layers[id];
                this._addItem(obj);
            }
        },

        /**
        * Construction of the DOM for each layer
        * (extend to L.Control.Layers)
        *
        * Method private call by this._update()
        *
        * @private
        * @param {Object} obj - layer
        * @returns {HTMLElement} container
        */
        _addItem : function (obj) {
            logger.log("_addItem", obj);

            obj.opacity   = obj.layer.options.opacity; // ajout de cette option !
            var container = this._createContainerLayerElement(obj);

            // gestion outOfRange
            (obj.layer.options.minZoom > this._map.getZoom() || obj.layer.options.maxZoom < this._map.getZoom()) ?
            L.DomUtil.addClass(container, "outOfRange") : L.DomUtil.removeClass(container, "outOfRange");

            // ajout du container dans la liste des layers (de type overlay uniquement !)
            this._overlaysList.appendChild(container);

            return container;
        },

        /**
        * Event onLayer change
        * (extend to L.Control.Layers because of version 1.0.0)
        *
        * @private
        * @param {Event} e - event
        */
        _onLayerChange : function (e) {
            var obj = this._layers[L.stamp(e.layer)];

            if (!obj) {
                return;
            }

            if (!this._handlingClick) {
                this._update();
            }

            var type = (e.type === "layeradd") ? "overlayadd" : "overlayremove";

            if (type) {
                this._map.fire(type, obj);
            }
        },

        /**
        * Event onLayer remove
        * (extend to L.Control.Layers because of version 1.0.0)
        *
        * @private
        * @param {Object} layer - event
        * @returns {Object} layer
        */
        removeLayer : function (layer) {

            // clean DOM !
            var id = L.stamp(layer);
            delete this._layers[id];
            this._update();

            // clean Layers
            var map = this._map;
            if (map) {
                if (map.hasLayer(layer)) {
                    map.removeLayer(layer);
                }
            }

            return this;
        },

        // ################################################################### //
        // ################ Methodes de l'instance (privées) ################# //
        // ################################################################### //

        /**
        * Set visibility of attribution layer
        * (call by this._onVisibilityLayerClick())
        *
        * @private
        * @param {Object} layer - layer
        */
        _updateVisibilityLayer :  function (layer) {

            if (!this._map) {
                return;
            }
            
            this._handlingClick = true;

            var visibility = this._layers[L.stamp(layer)].visibility;

            if (visibility && !this._map.hasLayer(layer)) {
                // input non checked dans le DOM, on ouvre l'oeil
                // et on ajoute la couche !
                this._map.addLayer(layer);

            } else if (!visibility && this._map.hasLayer(layer)) {
                // input checked dans le DOM, on ferme l'oeil
                // et on supprime la couche !
                this._map.removeLayer(layer);

            } else {
                logger.log("Status unknown layer !?");
            }

            this._handlingClick = false;
            this._refocusOnMap();
        },

        /**
        * Set visibility of layer (DOM)
        * (call by this.setVisibility())
        *
        * @private
        * @param {Object} layer - layer
        */
        _updateVisibilityDOMLayer :  function (layer) {
            var layerIdx = L.stamp(layer);
            var visibilityElement = L.DomUtil.get(this._addUID("GPvisibility_ID_" + layerIdx)); // FIXME ID !
            var visibilityValue   = this._layers[layerIdx].visibility;
            visibilityElement.checked = visibilityValue;
        },

        /**
        * Set opacity of layer (DOM)
        * (call by this.setOpacity())
        *
        * @private
        * @param {Object} layer - layer
        */
        _updateOpacityDOMLayer :  function (layer) {
            var layerIdx = L.stamp(layer);
            var opacityValue   = layer.options.opacity;
            var opacityElement = L.DomUtil.get(this._addUID("GPopacityValue_ID_" +  layerIdx)); // FIXME ID !
            opacityElement.innerHTML = parseInt(opacityValue * 100, 10) + "%";
        },

        // ################################################################### //
        // ################## GESTIONNAIRES d'evenements ##################### //
        // ################################################################### //

        /**
        * Event 'zoom' on layers visibility
        *
        * FIXME contrainte sur l'emprise du layer ?
        *
        * @private
        */
        _onOutOfRangeLayerZoom  : function () {
            var map = this._map;
            var layers = this._layers;
            for (var i in layers) {
                if (layers.hasOwnProperty(i)) {
                    var layer = layers[i].layer;
                    var id    = layers[i].id;
                    var div   = L.DomUtil.get(this._addUID("GPlayerSwitcher_ID_" + id)); // FIXME ID !
                    if (layer.options.minZoom > map.getZoom() || layer.options.maxZoom < map.getZoom()) {
                        L.DomUtil.addClass(div, "outOfRange");
                    } else {
                        L.DomUtil.removeClass(div, "outOfRange");
                    }
                }
            }

        },

        /**
        * Event 'click' on layer visibility
        *
        * @private
        * @param {Event} e - MouseEvent
        */
        _onVisibilityLayerClick : function (e) {

            var visibilityElement  = e.target.id;  // ex GPvisibilityPicto_ID_26
            var visibilityOrder    = ID.index(visibilityElement); // ex. 26

            // on met à jour cette interface...
            this._layers[visibilityOrder].visibility = L.DomUtil.get(visibilityElement).checked;
            var layer = this._layers[visibilityOrder].layer;

            this._updateVisibilityLayer(layer);

        },

        /**
        * Event 'click' on layer deleted
        *
        * @private
        * @param {Event} e - MouseEvent
        */
        _onDropLayerClick : function (e) {
            var layerElement  = e.target.id;  // ex GPvisibilityPicto_ID_26
            var layerOrder    = ID.index(layerElement); // ex. 26
            var layer = this._layers[layerOrder].layer;

            this.removeLayer(layer);
        },

        /**
        * Event 'onchange' on layer opacity
        *
        * FIXME appel en dur d'un identifiant CSS !
        *
        * @private
        * @param {Event} e - ChangeEvent
        */
        _onChangeLayerOpacity : function (e) {
            var layerElement  = e.target.id;  // ex GPvisibilityPicto_ID_26
            var layerOrder    = ID.index(layerElement);  // ex. 26
            var layer = this._layers[layerOrder].layer;

            var opacityValue = e.target.value;
            var opacityId = L.DomUtil.get(this._addUID("GPopacityValue_ID_" + layerOrder)); // FIXME ID !
            opacityId.innerHTML = opacityValue + "%";

            if (this._map.hasLayer(layer)) {
                layer.setOpacity(opacityValue / 100);
            }
        },

        /**
        * Event 'click' on opening the information window
        *
        * FIXME appel en dur d'un identifiant CSS !
        *
        * @private
        * @param {Event} e - MouseEvent
        */
        _onOpenLayerInfoClick : function (e) {

            var layerElement  = e.target.id;  // ex GPvisibilityPicto_ID_26
            var layerOrder    = ID.index(layerElement);  // ex. 26
            var layer = this._layers[layerOrder];

            // Close layer info panel
            var divId = L.DomUtil.get(e.target.id);
            var panel = null;
            var info  = null;
            if (divId.className === "GPlayerInfoOpened") {
                L.DomUtil.removeClass(divId, "GPlayerInfoOpened");
                L.DomUtil.addClass(divId, "GPlayerInfo");

                panel = L.DomUtil.get(this._addUID("GPlayerInfoPanel"));
                L.DomUtil.removeClass(panel, "GPpanel");
                L.DomUtil.removeClass(panel, "GPlayerInfoPanelOpened");
                L.DomUtil.addClass(panel, "GPlayerInfoPanelClosed");

                info = L.DomUtil.get(this._addUID("GPlayerInfoContent"));
                panel.removeChild(info);
                return;
            }

            var layers = document.getElementsByClassName("GPlayerInfoOpened");
            for (var i = 0; i < layers.length ; i++) {
                layers[i].className = "GPlayerInfo";
            }

            // Open layer info panel
            L.DomUtil.removeClass(divId, "GPlayerInfo");
            L.DomUtil.addClass(divId, "GPlayerInfoOpened");

            panel = L.DomUtil.get(this._addUID("GPlayerInfoPanel"));
            L.DomUtil.addClass(panel, "GPpanel");
            L.DomUtil.removeClass(panel, "GPlayerInfoPanelClosed");
            L.DomUtil.addClass(panel, "GPlayerInfoPanelOpened");

            info = L.DomUtil.get(this._addUID("GPlayerInfoContent"));
            if (info) {
                panel.removeChild(info);
            }

            // on récupére les infos associées au layer pour mettre à jour
            // dynamiquement le contenu du panel d"infos
            var infoLayer = this._createContainerLayerInfoElement(layer);
            panel.appendChild(infoLayer);
        },

        /**
        * Event "drag & drop" on move layer
        *
        * FIXME appel en dur d'un identifiant CSS !
        *
        * @private
        * @param {Event} e - MouseEvent
        */
        _onDragAndDropLayerClick : function (e) {

            var layerElement  = e.target.id;  // ex GPvisibilityPicto_ID_26
            var layerOrder    = ID.index(layerElement);  // ex. 26
            var layer = this._layers[layerOrder];

            logger.log(layer);

            var matchesLayers = document.querySelectorAll("div.GPlayerSwitcher_layer");
            this._lastZIndex = matchesLayers.length;
            for (var i = 0; i < matchesLayers.length; i++) {

                var tag = matchesLayers[i].id;
                var order = ID.index(tag);

                var _layer = this._layers[order].layer;
                if (this.options.autoZIndex && _layer.setZIndex) {
                    this._lastZIndex--;
                    _layer.setZIndex(this._lastZIndex);
                }
            }
        },

        // ################################################################### //
        // ###### METHODES PUBLIQUES (INTERFACE AVEC LE CONTROLE) ############ //
        // ################################################################### //

        /**
        * Adding layer configuration to be displayed by the control
        *
        * @param {Object} layer - layer to add to layer switcher
        * @param {Object} config - See {@link module:Controls.LayerSwitcher L.geoportalControl.LayerSwitcher()} for layer display config object definition.
        */
        addLayer : function (layer, config) {
            var map = this._map;
            var cfg = this._layersConfig;

            if (!layer) {
                console.log("[ERROR] LayerSwitcher:addLayer - missing layer parameter !");
                return;
            }

            if (! map.hasLayer(layer)) {
                console.log("[WARN] LayerSwitcher:addLayer - layer has not been added on map !");
            }

            var id = L.stamp(layer);
            for (var i in cfg) {
                if (cfg.hasOwnProperty(i)) {
                    // layer already added !
                    if (id === L.stamp(cfg[i].layer)) {
                        delete cfg[i];
                        break;
                    }
                }
            }

            var _config = config || {};
            L.Util.extend(_config, {
                layer : layer
            });

            cfg.push(_config);

            // layer déjà configuré, il reprend sa place !
            if (!this._layers[id]) {
                layer.setZIndex(this._lastZIndex++);
            }

            this.addOverlay(layer);

            this._update();
        },

        /**
        * Set the opacity of a layer, and opacity must be a number from 0 to 1.
        *
        * @param {Object} layer - layer into layerswitcher
        * @param {Number} opacity - 0-1.
        */
        setOpacity : function (layer, opacity) {
            logger.trace(layer, opacity);
            if (opacity > 1 || opacity < 0) {
                return;
            }

            if (this._map.hasLayer(layer)) {
                layer.setOpacity(opacity);
                this._updateOpacityDOMLayer(layer);
            }
        },

        /**
        * Set the visibility of a layer.
        *
        * @param {Object} layer - layer into layerswitcher
        * @param {Object} visibility - true/false.
        */
        setVisibility : function (layer, visibility) {
            logger.trace(layer, visibility);
            this._layers[L.stamp(layer)].visibility = visibility;
            this._updateVisibilityDOMLayer(layer);
            this._updateVisibilityLayer(layer);

        }
    });

    return LayerSwitcher;
});
