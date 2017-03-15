define([
    "Common/Utils",
    "Common/Utils/LayerUtils",
    "Common/Utils/SelectorID",
    "Common/Controls/LayerSwitcherDOM",
    "Itowns/Controls/Control"
], function (
    Utils,
    LayerUtils,
    SelectorID,
    LayerSwitcherDOM,
    Control
) {
    "use strict";

    /**
     * @classdesc
     * OpenLayers Control to manage map layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
     *
     * @constructor
     * @extends {ol.control.Control}
     * @alias ol.control.LayerSwitcher
     * @param {Object} lsOptions - control options
     * @param {Array} [lsOptions.layers] - list of layers to be configured. Each array element is an object, with following properties :
     * @param {ol.layer.Layer} [lsOptions.layers.layer] - ol.layer.Layer layer to be configured (that has been added to map)
     * @param {Object} [lsOptions.layers.config] - custom configuration object for layer information (title, description, legends, metadata, quicklook url), with following properties :
     * @param {String} [lsOptions.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
     * @param {String} [lsOptions.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
     * @param {String} [lsOptions.layers.config.quicklookUrl] - link to a quick look image for this layer.
     * @param {Array} [lsOptions.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
     *      - url (String, mandatory) : link to a legend
     *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
     * @param {Array} [lsOptions.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
     * @param {Object} [lsOptions.options] - ol.control.Control options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html ol.control.Control})
     * @param {Boolean} [lsOptions.options.collapsed] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
     * @example
     * map.addControl(new ol.control.LayerSwitcher(
     *  [
     *      {
     *          layer : wms1,
     *          config : {
     *              title : "test layer name 1",
     *              description : "test layer desc 1",
     *          }
     *      }
     *  ],
     *  {
     *      collapsed : true
     *  }
     * ));
     */
    function LayerSwitcher (lsOptions) {

        lsOptions   = lsOptions || {};
        var options = lsOptions.options || {};
        var layers  = lsOptions.layers || [];

        if (!(this instanceof LayerSwitcher)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        if ( layers && !Array.isArray(layers) ) {
            throw new Error("ERROR WRONG_TYPE : layers should be an array");
        }

        if ( options && typeof options !== "object" ) {
            throw new Error("ERROR WRONG_TYPE : options should be an object");
        }

        this._initialize(options, layers);

        var container = this._initContainer(options);

        Control.call(
            this,
            "LayerSwitcher",
            container,
            options
        );
    }

    /*
     * @lends module:LayerSwitcher
     */
    LayerSwitcher.prototype = Object.create(Control.prototype, {});

    // on récupère les méthodes de la classe commune LayerSwitcherDOM
    Utils.assign(LayerSwitcherDOM, LayerSwitcher.prototype);

    /**
     * Constructor (alias)
     *
     * @private
     */
    LayerSwitcher.prototype.constructor = LayerSwitcher;

    // ################################################################### //
    // ############## public methods (getters, setters) ################## //
    // ################################################################### //

    /**
     * Bind map to control
     */
    LayerSwitcher.prototype.setMap = function (map) {

        // info : cette méthode est appelée (entre autres?) après un map.addControl() ou map.removeControl()

        if ( map ) { // dans le cas de l'ajout du contrôle à la map
            var self = this;

            // add options layers to layerlist.
            // (seulement les couches configurées dans les options du layerSwitcher par l'utilisateur),
            // les autres couches de la carte seront ajoutées dans la méthode setMap
            for ( var i = 0; i < this._initLayers.length; i++ ) {
                // recup la layer, son id,
                var layer = null;
                if (this._initLayers[i].id) {
                    layer = map.getLayer(this._initLayers[i].id);
                }

                if ( layer ) {
                    // et les infos de la conf si elles existent (title, description, legends, quicklook, metadata)
                    var conf = this._initLayers[i].config || {};
                    var layerOptions = {
                        title : conf.title || layer.title || this._initLayers[i].id,
                        description : conf.description || null,
                        legends : conf.legends || [],
                        metadata : conf.metadata || [],
                        quicklookUrl : conf.quicklookUrl || null,
                        inRange : this.isInRange(layer, map)
                    };
                    if( typeof conf.ipr !== 'undefined' ) {
                        layerOptions.ipr = conf.ipr;
                    }
                    if( typeof conf.opacity !== 'undefined' ) {
                        layerOptions.opacity = conf.opacity;
                    }
                    if( typeof conf.visibility !== 'undefined' ) {
                        layerOptions.visibility = conf.visibility;
                    }
                    this._layers[layer.id] = layerOptions;
                }
            }

            // on ajoute les couches
            this._addMapLayers(map);

            // Ajout des listeners

            // At every map movement, layer switcher may be updated,
            // according to layers on map, and their range.
            /**
            * ajout du callback oncenterchanged
            */
            this._callbacks.onChangedCenterCallBack = function () {
                self._onMapMoveEnd(map);
            };
            map.addEventListener("centerchanged", this._callbacks.onChangedCenterCallBack);

            /**
            * ajout du callback onlayeradded
            */
            this._callbacks.onAddedLayerCallBack = function (e) {
                var id = e.detail.layerId;
                if (self) {
                    var layer = self.getMap().getLayer(id);
                    self.addLayer(layer);
                }
            };
            map.addEventListener("layeradded", this._callbacks.onAddedLayerCallBack);

            /**
            * ajout du callback onlayerremoved
            */
            this._callbacks.onRemovedLayerCallBack = function (e) {

                var id = e.detail.layerId;

                // On met à jour le tableau des couches ordonnées
                for (var i = 0; i < self._layersOrder.length; i++) {
                    if (self._layersOrder[i].id == id) {
                        self._layersOrder.splice(i, 1);
                    }
                }
                // On met à jour l'index max et on retire la couche du layerSwitcher
                if ( self && self._layers[id] ) {
                    self.removeLayer(id);
                    self._lastZIndex--;
                }

            };
            map.addEventListener("layerremoved", this._callbacks.onRemovedLayerCallBack);

            /**
            * ajout du callback onlayerchanged:index
            */
            this._callbacks.onIndexLayerCallBack = function () {
                // if (changedLayer.type !== "elevation") {
                    if ( self._layerListContainer ) {
                        // on vide le container précédent
                        while ( self._layerListContainer.firstChild ) {
                            self._layerListContainer.removeChild(self._layerListContainer.firstChild);
                        }
                        // on réordonne les couches dans l'ordre d'empilement (map.getLayers renvoie un tableau ordonné dans le sens inverse)
                        self._layersOrder = map.getOrderedLayers();
                        // et on rajoute les div correspondantes aux différentes couches, dans l'ordre décroissant des zindex
                        for ( var j = 0; j < self._layersOrder.length; j++ ) {
                            // récupération de la div de la couche, stockée dans le tableau _layers
                            var layerDiv = self._layers[self._layersOrder[j].id].div;
                            self._layerListContainer.appendChild(layerDiv);
                        }
                    } else {
                        console.log("[Itowns.control.LayerSwitcher] _updateLayersOrder : layer list container not found to update layers order ?!");
                    }
                // }
            };
            map.addEventListener("layerchanged:index", this._callbacks.onIndexLayerCallBack);

            /**
            * ajout du callback onlayerchanged:opacity
            */
            this._callbacks.onOpacityLayerCallBack = function (e) {
                self._updateLayerOpacity(e.detail.layerId, e.detail.newOpacity);
            };
            map.addEventListener("layerchanged:opacity", this._callbacks.onOpacityLayerCallBack);

            /**
            * ajout du callback onlayerchanged:visible
            */
            this._callbacks.onVisibilityLayerCallBack = function (e) {
                self._updateLayerVisibility(e.detail.layerId, e.detail.newVisibility);
            };
            map.addEventListener("layerchanged:visible", this._callbacks.onVisibilityLayerCallBack);

        } else {
            // On retire les listeners qui étaient liés au layerSwitcher supprimé
            map.removeEventListener("centerchanged", this._callbacks.onChangedCenterCallBack);
            map.removeEventListener("layeradded", this._callbacks.onAddedLayerCallBack);
            map.removeEventListener("layerremoved", this._callbacks.onRemovedLayerCallBack);
            map.removeEventListener("layerchanged:opacity", this._callbacks.onOpacityLayerCallBack);
            map.removeEventListener("layerchanged:visible", this._callbacks.onVisibilityLayerCallBack);
            map.removeEventListener("layerchanged:index", this._callbacks.onIndexLayerCallBack);
            return ;
        }

        // call original setMap method
        Control.prototype.setMap.call(this, map);
    };

    /**
     * Add a new layer to control (when added to map) or add new layer configuration
     *
     * @param {Object} layer - layer to add to layer switcher
     * @param {Object} [config] - additional options for layer configuration
     * @param {Object} [config.title] - layer title (default is layer identifier)
     * @param {Object} [config.description] - layer description (default is null)
     * @param {Object} [config.legends] - layer legends (default is an empty array)
     * @param {Object} [config.metadata] - layer metadata (default is an empty array)
     * @param {Object} [config.quicklookUrl] - layer quicklookUrl (default is null)
     * @example
     *   layerSwitcher.addLayer({
     *       layer : gpParcels,
     *       config : {
     *           title : "Parcelles cadastrales",
     *           description : "description de la couche",
     *           quicklookUrl : "http://quicklookUrl.fr"
     *       }
     *   })
     */
    LayerSwitcher.prototype.addLayer = function (layer, config) {

        config = config || {};
        var map = this.getMap();

        if ( !layer ) {
            console.log("[ERROR] LayerSwitcher:addLayer - missing layer parameter");
            return;
        }

        var id = layer.id;
        if ( id === "undefined" ) {
            console.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for " + layer + " layer (layer id not found)");
            return;
        }

        // make sure layer is in map layers
        if ( !map.hasLayer(id) ) {
            console.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for ", layer, " layer (layer is not in map.getLayers() )");
            return;
        }

        // if layer is not already in layers list, add it to control (layers list and container div)
        if ( !this._layers[id] ) {

            // 1. add layer to layers list
            var layerInfos = this.getLayerInfo(layer) || {};
            var layerOptions = {
                title : config.title || layerInfos._title || id,
                description : config.description || layerInfos._description || null,
                legends : config.legends || layerInfos._legends || [],
                metadata : config.metadata || layerInfos._metadata || [],
                quicklookUrl : config.quicklookUrl || layerInfos._quicklookUrl || null,
                inRange : this.isInRange(layer, map)
            };
            if( typeof config.ipr !== 'undefined' ) {
                layerOptions.ipr = config.ipr;
                map.setLayerIpr(id, layerOptions.ipr);
            }
            if( typeof config.opacity !== 'undefined' ) {
                layerOptions.opacity = config.opacity;
                map.setLayerOpacity(id, layerOptions.opacity);
            }
            if( typeof config.visibility !== 'undefined' ) {
                layerOptions.visibility = config.visibility;
                map.setLayerVisibility(id, layerOptions.visibility);
            }
            this._layers[id] = layerOptions;

            // création de la div de la couche destinée à être ajoutée au LS
            this._layers[id].div = this._createLayerDiv(id);
            // le callback sur le changement d'index permet de remettre en ordre
            // les div dans le LS (et au passage d'ajouter la div de la couche au DOM du control)
            // A refactorer en une fonction indépendante sans passer par ce callback
            this._callbacks.onIndexLayerCallBack();

            self._lastZIndex++;

        // user may also add a new configuration for an already added layer
        } else if ( this._layers[id] && config ) {

            // add new configuration parameters to layer informations
            for ( var prop in config ) {
                if ( config.hasOwnProperty(prop) ) {
                    this._layers[id][prop] = config[prop];
                }
            }
            if( typeof config.ipr !== 'undefined' ) {
                map.setLayerIpr(id, config.ipr);
            }
            if( typeof config.opacity !== 'undefined' ) {
                map.setLayerOpacity(id, config.opacity);
            }
            if( typeof config.visibility !== 'undefined' ) {
                map.setLayerVisibility(id, config.visibility);
            }
            // set new title in layer div
            if ( config.title ) {
                var nameDiv = document.getElementById(this._addUID("GPname_ID_" + id));
                if ( nameDiv ) {
                    nameDiv.innerHTML = config.title;
                    // FIXME a ajouter?
                    // nameDiv.title = config.description || config.title;
                }
            }
            // add layer info picto if necessary
            var infodiv = document.getElementById(this._addUID("GPinfo_ID_" + id));
            if ( !document.getElementById(this._addUID("GPinfo_ID_" + id)) && config.description && ( config.legends || config.metadata || config.quicklookUrl ) ) {
                var advancedTools = document.getElementById(this._addUID("GPadvancedTools_ID_" + id));
                if ( advancedTools ) {
                    advancedTools.appendChild(
                        this._createAdvancedToolInformationElement({
                            id : id
                        })
                    );
                }
            }
            // close layer info element if open, to update information.
            if ( infodiv && infodiv.className === "GPlayerInfoOpened" ) {
                document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
                infodiv.className === "GPlayerInfo";
            }

        }
    };

    /**
     * Remove a layer from control
     *
     * @param {Object} layer - layer.
     */
    LayerSwitcher.prototype.removeLayer = function (layerId) {
        var layerList = document.getElementById(this._addUID("GPlayersList"));
        // close layer info element if open.
        var infodiv = document.getElementById(this._addUID("GPinfo_ID_" + layerId));
        if ( infodiv && infodiv.className === "GPlayerInfoOpened" ) {
            document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
            infodiv.className === "GPlayerInfo";
        }
        // remove layer div
        var layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + layerId));
        layerList.removeChild(layerDiv);

        // on retire la couche de la liste des layers
        delete this._layers[layerId];

        // FIXME remise a jour des indexes ?
    };

    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    LayerSwitcher.prototype.setCollapsed = function (collapsed) {
        if ( collapsed === undefined ) {
            console.log("[ERROR] LayerSwitcher:setCollapsed - missing collapsed parameter");
            return;
        }
        var isCollapsed = !document.getElementById(this._addUID("GPshowLayersList")).checked;
        if ( ( collapsed && isCollapsed) || ( !collapsed && !isCollapsed ) ) {
            return;
        }
        // on simule l'ouverture du panneau après un click
        if ( !isCollapsed ) {
            var layers = document.getElementsByClassName("GPlayerInfoOpened");
            for ( var i = 0; i < layers.length; i++ ) {
                layers[i].className = "GPlayerInfo";
            }
            document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
        }
        document.getElementById(this._addUID("GPshowLayersList")).checked = !collapsed;
    };

    /**
     * Returns true if widget is collapsed (minimize), false otherwise
     */
    LayerSwitcher.prototype.getCollapsed = function () {
        return !document.getElementById(this._addUID("GPshowLayersList")).checked;
    };

    /**
     * Display or hide removeLayerPicto from layerSwitcher for this layer
     *
     * @param {ol.layer.Layer} layer - ol.layer to be configured
     * @param {Boolean} removable - specify if layer can be remove from layerSwitcher (true) or not (false). Default is true
     */
    LayerSwitcher.prototype.setRemovable = function (layer, removable) {
        if ( !layer ) {
            return;
        }
        var layerID = layer.gpLayerId;
        if ( layerID == null ) { // on teste si layerID est null ou undefined
            console.log("[LayerSwitcher:setRemovable] layer should be added to map before calling setRemovable method");
            return;
        }
        var removalDiv = document.getElementById(this._addUID("GPremove_ID_" + layerID));
        console.log(removalDiv.style.display);
        if ( removalDiv ) {
            if ( removable === false ) {
                removalDiv.style.display = "none";
            } else if ( removable === true ) {
                removalDiv.style.display = "block";
            } else {
                return;
            }
        }
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize LayerSwitcher control (called by constructor)
     *
     * @param {Object} options - ol.control.Control options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html ol.control.Control})
     * @param {Array} layers - list of layers to be configured. Each array element is an object, with following properties :
     * @private
     */
    LayerSwitcher.prototype._initialize = function (options, layers) {

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // {Object} control layers list. Each key is a layer id, and its value is an object of layers options (layer, id, opacity, visibility, title, description...)
        this._layers = {};
        // [Array] array of ordered control layers
        //FIXME a voir si a garder ou recupere directement depuis la map
        this._layersOrder = [];
        // [Object] associative array of layers ordered by zindex (keys are zindex values, and corresponding values are arrays of layers at this zindex)
        // FIXME necessaire ?
        this._layersIndex = {};
        // {Number} layers max z index, to order layers using their z index
        this._lastZIndex = 0;
        // {Number} layers max id, incremented when a new layer is added
        this._layerId = 0;
        /** {Boolean} true if widget is collapsed, false otherwise */
        this.collapsed = (options.collapsed !== undefined) ? options.collapsed : true;
        // div qui contiendra les div des listes.
        this._layerListContainer = null;

        this._callbacks = {};

        this._options = options;
        this._initLayers = layers;
    };

    /**
     * Create control main container
     */
    LayerSwitcher.prototype._initContainer = function (options) {
        // creation du container principal
        var container = this._createMainContainerElement();

        // ajout dans le container principal d'affichage des layers
        var input = this._createMainLayersShowElement();
        container.appendChild(input);

        // gestion du mode "collapsed"
        if (!options.collapsed) {
            input.checked = "checked";
        }
        // ajout dans le container principal de la liste des layers
        var divL = this._layerListContainer = this._createMainLayersElement();
        container.appendChild(divL);

        // creation du mode draggable
        this._createDraggableElement(divL, this);

        // ajout dans le container principal du picto du controle
        var picto = this._createMainPictoElement();
        container.appendChild(picto);

        // ajout dans le container principal du panneau d'information
        var divI = this._createMainInfoElement();
        container.appendChild(divI);

        return container;
    };

    /**
     * Add control layers to control main container
     */
    LayerSwitcher.prototype._addMapLayers = function (map) {

        // Récupération de l'élément contenant les différentes couches.
        var elementLayersList;
        var childNodes = this.getElement().childNodes;

        for ( var i = 0; i < childNodes.length; i ++ ) {
            if ( childNodes[i].id === this._addUID("GPlayersList") ) {
                elementLayersList = childNodes[i];
                break;
            }
        }

        // on réordonne les couches dans l'ordre d'empilement (map.getLayers renvoie un tableau ordonné dans le sens inverse)
        this._layersOrder = map.getOrderedLayers();

        // on parcourt toutes les couches de la carte, pour les ajouter à la liste du controle si ce n'est pas déjà le cas.
        this._layersOrder.forEach(
            function (layer) {
                // ajout des couches de la carte à la liste
                var id;
                id = layer.id;
                var layerInfos = this.getLayerInfo(layer) || {};
                if ( !this._layers[id] ) {
                    // si la couche n'est pas encore dans la liste des layers (this._layers), on l'ajoute
                    var layerOptions = {
                        title : layerInfos._title || id,
                        description : layerInfos._description || null,
                        legends : layerInfos._legends || [],
                        metadata : layerInfos._metadata || [],
                        quicklookUrl : layerInfos._quicklookUrl || null,
                        inRange : this.isInRange(layer, map)
                    };
                    this._layers[id] = layerOptions;
                } else {
                    var lsLayerConf = this._layers[id];
                    if( typeof lsLayerConf.ipr !== 'undefined' ) {
                        map.setLayerIpr( id, lsLayerConf.ipr );
                    }
                    if( typeof lsLayerConf.opacity !== 'undefined' ) {
                        map.setLayerOpacity( id, lsLayerConf.opacity );
                    }
                    if( typeof lsLayerConf.visibility !== 'undefined' ) {
                        map.setLayerVisibility( id, lsLayerConf.visibility );
                    }
                }
                this._lastZIndex++;
            },
            this
        );
        // on ajoute les couches au layerSwitcher dans le bon ordre
        for ( var i = 0; i < this._layersOrder.length; i++ ) {
            var layerId = this._layersOrder[i].id;
            var layerDiv = this._createLayerDiv(layerId);
            this._layers[layerId].div = layerDiv;
            elementLayersList.appendChild(layerDiv);
        }
    };

    /**
     * create layer div (to append to control DOM element).
     */
    LayerSwitcher.prototype._createLayerDiv = function (layerId) {
        var layerOptions = this._layers[layerId];
        var isLegends = layerOptions.legends && layerOptions.legends.length !== 0;
        var isMetadata = layerOptions.metadata && layerOptions.metadata.length !== 0;
        var isQuicklookUrl = layerOptions.quicklookUrl;
        if ( isLegends || isMetadata || isQuicklookUrl ) {
            layerOptions.displayInformationElement = true;
        }

        // ajout d'une div pour cette layer dans le control
        layerOptions.id = layerId;
        var layerDiv = this._createContainerLayerElement(layerOptions);

        if ( !layerOptions.inRange ) {
            layerDiv.classList.add("outOfRange");
        }

        return layerDiv;
    };

    // ################################################################### //
    // ######################### DOM events ############################## //
    // ################################################################### //

    /**
     * Change layer opacity on layer opacity picto click
     *
     * @param {Object} e - event
     */
    LayerSwitcher.prototype._onChangeLayerOpacity = function (e) {
        var map = this.getMap();
        var divId    = e.target.id;  // ex GPvisibilityPicto_ID_26-564864564654564
        var divName  = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
        var layerID  = divName.substring(divName.indexOf("_ID_") + 4 );  // ex. 26

        var opacityValue = e.target.value;
        var opacityId = document.getElementById(this._addUID("GPopacityValue_ID_" + layerID));
        opacityId.innerHTML = opacityValue + "%";

        map.setLayerOpacity(layerID, opacityValue / 100);
    };

    /**
     * Update picto opacity value on layer opacity change
     *
     * @param {Object} changedLayer - layer whom opacity changed
     */
    LayerSwitcher.prototype._updateLayerOpacity = function (layerId, opacity) {
        if ( opacity > 1 ) {
            opacity = 1;
        }
        if ( opacity < 0 ) {
            opacity = 0;
        }

        var layerOpacityInput = document.getElementById(this._addUID("GPopacityValueDiv_ID_" + layerId));
        layerOpacityInput.value = Math.round(opacity * 100);

        var layerOpacitySpan = document.getElementById(this._addUID("GPopacityValue_ID_" + layerId));
        layerOpacitySpan.innerHTML = Math.round(opacity * 100) + "%";
    };

    /**
     * Change layer visibility on layer visibility picto click
     *
     * @param {Object} e - event
     */
    LayerSwitcher.prototype._onVisibilityLayerClick = function (e) {
        var map = this.getMap();

        var divId    = e.target.id;  // ex GPvisibilityPicto_ID_26-564864564654564
        var divName  = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
        var layerID  = divName.substring(divName.indexOf("_ID_") + 4 );  // ex. 26

        map.setLayerVisibility(layerID, e.target.checked);
    };

    /**
     * Change picto visibility on layer visibility change
     *
     * @param {Object} e - event
     * @private
     */
    LayerSwitcher.prototype._updateLayerVisibility = function (layerId, visibility) {
        var layerVisibilityInput = document.getElementById(this._addUID("GPvisibility_ID_" + layerId));
        layerVisibilityInput.checked = visibility;
    };

    /**
     * Open layer information panel on picto click
     *
     * @param {Event} e - MouseEvent
     */
    LayerSwitcher.prototype._onOpenLayerInfoClick = function (e) {

        var divId    = e.target.id;  // ex GPvisibilityPicto_ID_26-564864564654564
        var divName  = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
        var layerID  = divName.substring(divName.indexOf("_ID_") + 4 );  // ex. 26

        var layerOptions = this._layers[layerID];

        var panel;
        var info;

        // Close layer info panel
        divId = document.getElementById(e.target.id);
        if (divId.className === "GPlayerInfoOpened") {
            if ( divId.classList !== undefined ) {
                divId.classList.remove("GPlayerInfoOpened");
                divId.classList.add("GPlayerInfo");
            }

            panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
            if ( panel.classList !== undefined ) {
                panel.classList.remove("GPpanel");
                panel.classList.remove("GPlayerInfoPanelOpened");
                panel.classList.add("GPlayerInfoPanelClosed");
            }

            info = document.getElementById(this._addUID("GPlayerInfoContent"));
            panel.removeChild(info);
            return;
        }

        var layers = document.getElementsByClassName("GPlayerInfoOpened");
        for ( var i = 0; i < layers.length; i++ ) {
            layers[i].className = "GPlayerInfo";
        }

        // Open layer info panel
        if ( divId.classList !== undefined ) {
            divId.classList.remove("GPlayerInfo");
            divId.classList.add("GPlayerInfoOpened");
        }

        panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
        if ( panel.classList !== undefined ) {
            panel.classList.add("GPpanel");
            panel.classList.remove("GPlayerInfoPanelClosed");
            panel.classList.add("GPlayerInfoPanelOpened");
        }

        info = document.getElementById(this._addUID("GPlayerInfoContent"));
        if (info) {
            panel.removeChild(info);
        }

        // on récupère les infos associées au layer pour mettre dynamiquement le contenu du panel d'informations
        var obj = {
            title : layerOptions.title,
            description : layerOptions.description,
            quicklookUrl : layerOptions.quicklookUrl,
            metadata : layerOptions.metadata,
            legends : layerOptions.legends
        };

        var infoLayer = this._createContainerLayerInfoElement(obj);
        panel.appendChild(infoLayer);
    };

    /**
     * remove layer from layer switcher and map on picto click
     *
     * @param {Event} e - MouseEvent
     */
    LayerSwitcher.prototype._onDropLayerClick = function (e) {
        var map = this.getMap();

        var divId    = e.target.id;  // ex GPvisibilityPicto_ID_26-564864564654564
        var divName  = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
        var layerID  = divName.substring(divName.indexOf("_ID_") + 4 );  // ex. 26

        // le retrait de la couche va déclencher l'ecouteur d'évenement,
        // et appeler this.removeLayer qui va supprimer la div.
        map.removeImageryLayer(layerID)

        this._updateLayersIndex();
    };

    /**
     * change layers order on drag and drop
     */
    LayerSwitcher.prototype._onDragAndDropLayerClick = function () {
        this._updateLayersIndex();
        var map = this.getMap();
        // mise à jour du tableau des couches ordonneés
        this._layersOrder = map.getOrderedLayers();
        // on appelle le callback sur le changement d'index manuellement
        // pour forcer la reconstruction des div du layerSwitcher au cas où
        // le nouvel index est le même que le précédent et pour forcer les
        // couches vectorielles en haut du LS
        this._callbacks.onIndexLayerCallBack();
    };

    /**
    * Method which update the index of the layers after a layer is moved, added, or removed
    */
    // FIXME utilité de la fonction ?
    LayerSwitcher.prototype._updateLayersIndex = function () {
        var map = this.getMap();
        var layerCount = map.getImageryLayers().length;

        // on récupère l'ordre des div dans le contrôle pour réordonner les couches (avec zindex)
        var matchesLayers = document.querySelectorAll("div.GPlayerSwitcher_layer");

        for (var i = 0; i < matchesLayers.length; i++) {
            // newIndex = maxZIndex - i;
            var tag = matchesLayers[i].id; // ex. GPlayerSwitcher_ID_ELEVATION.SLOPES-1481286391563
            var name = SelectorID.name(tag); // ex. GPlayerSwitcher_ID_ELEVATION.SLOPES
            var id = name.substring(name.indexOf("_ID_") + 4 ); // ex. ELEVATION.SLOPES

            layerCount--;
            map.moveLayerToIndex(id, layerCount);
        }
    }

    /**
     * check layers range on map movement
     *
     * @param {VirtualGeo.Map} map - virtualGeo map on which event occured
     */
    LayerSwitcher.prototype._onMapMoveEnd = function (map) {
        map.getImageryLayers().forEach(
            function (layer) {
                var id = layer.id;
                if ( this._layers[id] ) {
                    var layerOptions = this._layers[id];
                    // Check if layer is out of range.
                    var layerDiv;
                    var bIsInRange = this.isInRange(layer, map);
                    if ( bIsInRange && !layerOptions.inRange ) {
                        layerOptions.inRange = true;
                        layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + id));
                        layerDiv.classList.remove("outOfRange");
                    } else if ( !bIsInRange && layerOptions.inRange ) {
                        layerOptions.inRange = false;
                        layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + id));
                        layerDiv.classList.add("outOfRange");
                    }
                }
            },
            this
        );
    };

    // ################################################################### //
    // ############################ Utils ################################ //
    // ################################################################### //

    /**
     * Check if map view is out of layer range (in terms of extent and zoom)
     *
     * @private
     * @memberof LayerSwitcher
     * @method isInRange
     * @param {Object} layer - the layer object
     * @param {Object} map   - the VirtualGeo.Map object
     * @returns {Boolean} outOfRange - false if map view is out of layer range
     */
    LayerSwitcher.prototype.isInRange = function (layer, map) {
        if (!map) {
            return;
        }
        // check if map zoom is in layer zoom range
        var mapResolution = map.getZoomScale();

        if ( (layer.maxScaleDenominator !== 0 || layer.minScaleDenominator !== 0) && (mapResolution > layer.maxScaleDenominator || mapResolution < layer.minScaleDenominator) ) {
            return false;
        }

        var viewExtent = map.getExtent();
        // To get the same format of bbox array
        var layerExtent = map.getLayerExtent(layer);
        if (!LayerUtils.intersects(viewExtent, layerExtent)) {
            return false;
        }

        return true;
    }

    /**
     * Get layer informations : title, description, quicklookurl, legends, metadata
     *
     * @private
     * @memberof LayerSwitcher
     * @method getLayerInfo
     * @param {Object} layer - the layer object
     * @returns {Object} layerInfo - layer informations
     */
    LayerSwitcher.prototype.getLayerInfo = function (layer) {
        var layerInfo = {};
        if (layer) {
            layerInfo._title = layer.title || null;
            layerInfo._description = layer.description || null;
            layerInfo._quicklookUrl = layer.quicklookUrl || null;
            layerInfo._metadata = layer.metadata || null;
            layerInfo._legends = layer.legends || null;
        }
        return layerInfo;
    };

    return LayerSwitcher;
});
