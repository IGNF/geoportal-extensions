define([
    "Common/Utils",
    "Common/Utils/LayerUtils",
    "Common/Utils/SelectorID",
    "Common/Controls/LayerSwitcherDOM",
    "Itowns/Controls/Widget"
], function (
    Utils,
    LayerUtils,
    SelectorID,
    LayerSwitcherDOM,
    Widget
) {
    "use strict";

    /**
     * @classdesc
     * Control to manage globe layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
     *
     * @constructor
     * @extends {itowns.control.Widget}
     * @alias itowns.control.LayerSwitcher
     * @param {Object} lsOptions - control options
     * @param {Array} [lsOptions.layers] - list of layers to be configured. Each array element is an object, with following properties :
     * @param {String} [lsOptions.layers.id] - ol.layer.Layer layer to be configured (that has been added to globe)
     * @param {Object} [lsOptions.layers.config] - custom configuration object for layer information (title, description, legends, metadata, quicklook url), with following properties :
     * @param {String} [lsOptions.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
     * @param {String} [lsOptions.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
     * @param {String} [lsOptions.layers.config.quicklookUrl] - link to a quick look image for this layer.
     * @param {Array} [lsOptions.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
     *      - url (String, mandatory) : link to a legend
     *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
     * @param {Array} [lsOptions.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
     * @param {Object} [lsOptions.options] - Itowns.control.Control options
     * @param {Boolean} [lsOptions.options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on globe loading.
     * @example
     * var layerSwitcher = new itowns.control.LayerSwitcher({
     *  layers : [
     *      {
     *          id : "myLayer",
     *          config : {
     *              title : "test layer name 1",
     *              description : "test layer desc 1",
     *          }
     *      }
     *  ],
     *  options : {
     *      collapsed : false
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
        var targetDiv = document.getElementById(options.target) || null;

        Widget.call(
            this,
            {
                name : "LayerSwitcher",
                element : container,
                target : targetDiv
            }
        );
    }

    /*
     * @lends module:LayerSwitcher
     */
    LayerSwitcher.prototype = Object.create(Widget.prototype, {});

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
     * Bind globe to control
     */
    LayerSwitcher.prototype.setGlobe = function (globe) {

        if ( globe ) { // dans le cas de l'ajout du contrôle au globe
            var self = this;

            // add options layers to layerlist.
            // (seulement les couches configurées dans les options du layerSwitcher par l'utilisateur),
            // les autres couches de la carte seront ajoutées dans la méthode setGlobe
            for ( var i = 0; i < this._initLayers.length; i++ ) {
                // recup le layer, son id,
                var layer = null;

                if (this._initLayers[i].id) {
                    layer = globe.getLayerById(this._initLayers[i].id);
                }

                if ( layer && this._initLayers[i].displayed ) {
                    // et les infos de la conf si elles existent (title, description, legends, quicklook, metadata)
                    var conf = this._initLayers[i].config || {};
                    var layerOptions = {
                        title : conf.title || layer.title || this._initLayers[i].id,
                        description : conf.description || null,
                        legends : conf.legends || [],
                        metadata : conf.metadata || [],
                        quicklookUrl : conf.quicklookUrl || null
                    };
                    if ( typeof conf.ipr !== "undefined" ) {
                        layerOptions.ipr = conf.ipr;
                    }
                    if ( typeof conf.opacity !== "undefined" ) {
                        layerOptions.opacity = conf.opacity;
                    }
                    if ( typeof conf.visibility !== "undefined" ) {
                        layerOptions.visibility = conf.visibility;
                    }
                    this._layers[layer.id] = layerOptions;
                }
            }

            // on ajoute les couches
            this._addGlobeLayers(globe);

            // Ajout des listeners

            /**
            * ajout du callback onlayerchanged:opacity
            */
            this._callbacks.onOpacityLayerCallBack = function (e) {
                self._updateLayerOpacity(e.target.id, e.new.opacity);
            };

            /**
            * ajout du callback onlayerchanged:visible
            */
            this._callbacks.onVisibilityLayerCallBack = function (e) {
                self._updateLayerVisibility(e.target.id, e.new.visible);
            };

            // At every globe movement, layer switcher may be updated,
            // according to layers on globe, and their range.
            /**
            * ajout du callback onChangedViewCallBack
            */
            this._callbacks.onChangedViewCallBack = function (e) {
                self._inRangeUpdate(e.layers.id);
            };
            globe.addEventListener("prerender", this._callbacks.onChangedViewCallBack);
            // pour que l'evenement prerender renvoie les couches visibles
            globe.preRenderEventFetchColorLayersDisplayed();

            /**
            * ajout du callback onlayeradded
            */
            this._callbacks.onAddedLayerCallBack = function (e) {
                var id = e.layerId;
                if (self) {
                    if ( !self._layerDisplayedInLayerSwitcher(id) ) {
                        return;
                    }
                    var layer = self.getGlobe().getLayerById(id);
                    if ( layer.type === "elevation" ) {
                        return;
                    }
                    var layerConf = self._getLayerConf(id);
                    if ( layerConf ) {
                        self.addLayer(layer, layerConf);
                    } else {
                        self.addLayer(layer);
                    }
                }
            };
            globe.addEventListener(itowns.GLOBE_VIEW_EVENTS.LAYER_ADDED, this._callbacks.onAddedLayerCallBack);

            /**
            * ajout du callback onlayerremoved
            */
            this._callbacks.onRemovedLayerCallBack = function (e) {
                var id = e.layerId;

                // On met à jour l'index max et on retire la couche du layerSwitcher
                if ( self ) {
                    self.removeLayer(id);
                }

            };
            globe.addEventListener(itowns.GLOBE_VIEW_EVENTS.LAYER_REMOVED, this._callbacks.onRemovedLayerCallBack);

            /**
            * ajout du callback onlayerchanged:index
            */
            this._callbacks.onIndexLayerCallBack = function (e) {

                /** arraysEquals */
                var arraysEquals = function (a1, a2) {
                    if (a1.length !== a2.length) {
                        return false;
                    }
                    for ( var i = 0 ; i < a1.length ; ++i ) {
                        if ( a1[i] !== a2[i] ) {
                            return false;
                        }
                    }
                    return true;
                };

                if ( !arraysEquals(e.new.sequence, e.previous.sequence)) {
                    self._updateLayerListContainer();
                }
            };
            globe.addEventListener(itowns.GLOBE_VIEW_EVENTS.COLOR_LAYERS_ORDER_CHANGED, this._callbacks.onIndexLayerCallBack);

            var layers = globe.getColorLayers();
            for ( var ii = 0 ; ii < layers.length ; ++ii ) {
                layers[ii].addEventListener("opacity-property-changed", this._callbacks.onOpacityLayerCallBack);
                layers[ii].addEventListener("visible-property-changed", this._callbacks.onVisibilityLayerCallBack);
            }

            this._globe = globe;

        } else {
            // On retire les listeners qui étaient liés au layerSwitcher supprimé
            this._globe.removeEventListener("prerender", this._callbacks.onChangedViewCallBack);
            this._globe.removeEventListener(itowns.GLOBE_VIEW_EVENTS.LAYER_ADDED, this._callbacks.onAddedLayerCallBack);
            this._globe.removeEventListener(itowns.GLOBE_VIEW_EVENTS.LAYER_REMOVED, this._callbacks.onRemovedLayerCallBack);
            this._globe.removeEventListener(itowns.GLOBE_VIEW_EVENTS.COLOR_LAYERS_ORDER_CHANGED, this._callbacks.onIndexLayerCallBack);
            var layers = this._globe.getColorLayers();
            for ( var j = 0 ; j < layers.length ; ++j ) {
                layers[j].removeEventListener("opacity-property-changed", this._callbacks.onOpacityLayerCallBack);
                layers[j].removeEventListener("visible-property-changed", this._callbacks.onVisibilityLayerCallBack);
            }
            // On supprime le DOM du layerSwitcher
            while (this._element.hasChildNodes()) {
                this._element.removeChild(this._element.lastChild);
            }
            this._element.parentNode.removeChild(this._element);

            return ;
        }

        // call original setGlobe method
        Widget.prototype.setGlobe.call(this, globe);
    };

    /**
     * Add a new layer to control (when added to globe) or add new layer configuration
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
        var globe = this.getGlobe();

        if ( !layer ) {
            console.log("[ERROR] LayerSwitcher:addLayer - missing layer parameter");
            return;
        }

        var id = layer.id;
        if ( id === "undefined" ) {
            console.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for " + layer + " layer (layer id not found)");
            return;
        }

        // abonnement aux evenements
        layer.addEventListener("opacity-property-changed", this._callbacks.onOpacityLayerCallBack);
        layer.addEventListener("visible-property-changed", this._callbacks.onVisibilityLayerCallBack);

        // make sure layer is in globe layers
        var LayerInGlobe = globe.getLayerById(id);

        if ( !LayerInGlobe ) {
            console.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for ", layer, " layer (layer is not in globe layers )");
            return;
        }

        // if layer is not already in layers list, add it to control (layers list and container div)
        if ( !this._layers[id] ) {

            // 1. add layer to layers list
            var layerInfos = this._getLayerInfo(layer) || {};
            var layerOptions = {
                title : config.title || layerInfos._title || id,
                description : config.description || layerInfos._description || null,
                legends : config.legends || layerInfos._legends || [],
                metadata : config.metadata || layerInfos._metadata || [],
                quicklookUrl : config.quicklookUrl || layerInfos._quicklookUrl || null
            };
            if ( typeof config.ipr !== "undefined" ) {
                layerOptions.ipr = config.ipr;
                layer.attribution = layerOptions.ipr;
            }
            if ( typeof config.opacity !== "undefined" ) {
                layerOptions.opacity = config.opacity;
                layer.opacity = layerOptions.opacity;
            }
            if ( typeof config.visibility !== "undefined" ) {
                layerOptions.visibility = config.visibility;
                layer.visible = layerOptions.visibility;
            }
            this._layers[id] = layerOptions;

            // création de la div de la couche destinée à être ajoutée au LS
            this._layers[id].div = this._createLayerDiv(id);

            this._updateLayerListContainer();

        // user may also add a new configuration for an already added layer
        } else if ( this._layers[id] && config ) {

            // add new configuration parameters to layer informations
            for ( var prop in config ) {
                if ( config.hasOwnProperty(prop) ) {
                    this._layers[id][prop] = config[prop];
                }
            }
            if ( typeof config.ipr !== "undefined" ) {
                layer.attribution = config.ipr;
            }
            if ( typeof config.opacity !== "undefined" ) {
                layer.opacity = config.opacity;
            }
            if ( typeof config.visibility !== "undefined" ) {
                layer.visible = config.visibility;
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
     * @param {Object} layerId - layer to remove to layer switcher
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
        var isCollapsed = this.getCollapsed();
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

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize LayerSwitcher control (called by constructor)
     *
     * @param {Object} options - Itowns.control.Control options
     * @param {Array} layers - list of layers to be configured. Each array element is an object, with following properties :
     * @private
     */
    LayerSwitcher.prototype._initialize = function (options, layers) {
        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // {Object} control layers list. Each key is a layer id, and its value is an object of layers options (layer, id, opacity, visibility, title, description...)
        this._layers = {};

        // div qui contiendra les div des listes.
        this._layerListContainer = null;

        // callbacks
        this._callbacks = {};

        // options
        this._options = options;
        this._initLayers = layers;
    };

    /**
     * Return the layer configuration defined at widget initialization
     *
     * @method _getLayerConf
     * @param {String} layerId - layer id
     * @return {Object} layerConfig - layer configuration
     * @private
     */
    LayerSwitcher.prototype._getLayerConf = function ( layerId ) {
        for ( var i = 0 ; i < this._initLayers.length ; ++i ) {
            if ( this._initLayers[i].id === layerId ) {
                return this._initLayers[i].config;
            }
        }
        return null;
    };

    /**
     * Indicates if the layer must be displayed in the layerSwitcher
     *
     * @method _layerDisplayedInLayerSwitcher
     * @param {String} layerId - layer id
     * @return {Boolean} displayed
     * @private
     */
    LayerSwitcher.prototype._layerDisplayedInLayerSwitcher = function ( layerId ) {
        for ( var i = 0 ; i < this._initLayers.length ; ++i ) {
            if ( this._initLayers[i].id === layerId ) {
                return ( typeof this._initLayers[i].displayed === "undefined" || this._initLayers[i].displayed );
            }
        }
        return true;
    };

    /**
     * Create control main container
     *
     * @method _initContainer
     * @param {Object} options - control options
     * @private
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
     *
     * @method _addGlobeLayers
     * @param {Object} globe - the Itowns.GlobeViewExtended object
     * @private
     */
    LayerSwitcher.prototype._addGlobeLayers = function (globe) {

        // Récupération de l'élément contenant les différentes couches.
        var elementLayersList;
        var childNodes = this.getElement().childNodes;

        for ( var i = 0; i < childNodes.length; i ++ ) {
            if ( childNodes[i].id === this._addUID("GPlayersList") ) {
                elementLayersList = childNodes[i];
                break;
            }
        }

        // on réordonne les couches dans l'ordre d'empilement (globe.getLayers renvoie un tableau ordonné dans le sens inverse)
        var layers = globe.getColorLayers();
        var orderedLayers = layers.sort(function (a, b) {
            return b.sequence - a.sequence;
        });

        // on parcourt toutes les couches de la carte, pour les ajouter à la liste du controle si ce n'est pas déjà le cas.
        orderedLayers.forEach(
            function (layer) {
                // ajout des couches de la carte à la liste
                var id;
                id = layer.id;
                if ( !this._layerDisplayedInLayerSwitcher(id) ) {
                    return;
                }
                var layerInfos = this._getLayerInfo(layer) || {};
                if ( !this._layers[id] ) {
                    // si la couche n'est pas encore dans la liste des layers (this._layers), on l'ajoute
                    var layerOptions = {
                        title : layerInfos._title || id,
                        description : layerInfos._description || null,
                        legends : layerInfos._legends || [],
                        metadata : layerInfos._metadata || [],
                        quicklookUrl : layerInfos._quicklookUrl || null
                    };
                    this._layers[id] = layerOptions;
                } else {
                    var lsLayerConf = this._layers[id];
                    if ( typeof lsLayerConf.ipr !== "undefined" ) {
                        layer.options.attribution = lsLayerConf.ipr;
                    }
                    if ( typeof lsLayerConf.opacity !== "undefined" ) {
                        layer.opacity = lsLayerConf.opacity;
                    }
                    if ( typeof lsLayerConf.visibility !== "undefined" ) {
                        layer.visible = lsLayerConf.visibility;
                    }
                }

                var layerDiv = this._createLayerDiv(id);
                this._layers[id].div = layerDiv;
                elementLayersList.appendChild(layerDiv);
            },
            this
        );
    };

    /**
     * create layer div (to append to control DOM element).
     *
     * @method _createLayerDiv
     * @param {String} layerId - layer id
     * @private
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
     * @method _onChangeLayerOpacity
     * @param {Object} e - HTML event
     * @private
     */
    LayerSwitcher.prototype._onChangeLayerOpacity = function (e) {
        var globe = this.getGlobe();
        var layerID  = this._resolveLayerId(e.target.id);

        var opacityValue = e.target.value;
        var opacityId = document.getElementById(this._addUID("GPopacityValue_ID_" + layerID));
        opacityId.innerHTML = opacityValue + "%";
        var layer = globe.getLayerById(layerID);
        globe.setLayerOpacity(layer, opacityValue / 100);
    };

    /**
     * Update picto opacity value on layer opacity change
     *
     * @method _updateLayerOpacity
     * @param {String} layerId - layer id
     * @param {Number} opacity - opacity value
     * @private
     */
    LayerSwitcher.prototype._updateLayerOpacity = function (layerId, opacity) {
        if ( opacity > 1 ) {
            opacity = 1;
        }
        if ( opacity < 0 ) {
            opacity = 0;
        }

        var layerOpacityInput = document.getElementById(this._addUID("GPopacityValueDiv_ID_" + layerId));
        if ( layerOpacityInput ) {
            layerOpacityInput.value = Math.round(opacity * 100);
        }

        var layerOpacitySpan = document.getElementById(this._addUID("GPopacityValue_ID_" + layerId));
        if ( layerOpacitySpan ) {
            layerOpacitySpan.innerHTML = Math.round(opacity * 100) + "%";
        }
    };

    /**
     * Change layer visibility on layer visibility picto click
     *
     * @method _onVisibilityLayerClick
     * @param {Object} e - HTML event
     * @private
     */
    LayerSwitcher.prototype._onVisibilityLayerClick = function (e) {
        var globe = this.getGlobe();

        var layerID  = this._resolveLayerId(e.target.id);
        var layer = globe.getLayerById(layerID);
        globe.setLayerVisibility(layer, e.target.checked); // update viewer
    };

    /**
     * Change picto visibility on layer visibility change
     *
     * @method _updateLayerVisibility
     * @param {String} layerId - layer id
     * @param {Boolean} visibility - visible if true
     * @private
     */
    LayerSwitcher.prototype._updateLayerVisibility = function (layerId, visibility) {
        var layerVisibilityInput = document.getElementById(this._addUID("GPvisibility_ID_" + layerId));
        if ( layerVisibilityInput ) {
            layerVisibilityInput.checked = visibility;
        }
    };

    /**
     * Open layer information panel on picto click
     *
     * @method _onOpenLayerInfoClick
     * @param {Event} e - MouseEvent
     * @private
     */
    LayerSwitcher.prototype._onOpenLayerInfoClick = function (e) {
        var layerID  = this._resolveLayerId(e.target.id);

        var layerOptions = this._layers[layerID];

        var panel;
        var info;

        // Close layer info panel
        var divId = document.getElementById(e.target.id);
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
     * remove layer from layer switcher and globe on picto click
     *
     * @method _onDropLayerClick
     * @param {Event} e - MouseEvent
     * @private
     */
    LayerSwitcher.prototype._onDropLayerClick = function (e) {
        var globe = this.getGlobe();

        var layerID  = this._resolveLayerId(e.target.id);

        // le retrait de la couche va déclencher l'ecouteur d'évenement,
        // et appeler this.removeLayer qui va supprimer la div.
        globe.removeLayer(layerID);

        this._updateLayerListContainer();
    };

    /**
     * change layers order on drag and drop
     *
     * @method _onDropLayerClick
     * @param {Event} e - HTML event
     * @private
     */
    LayerSwitcher.prototype._onDragAndDropLayerClick = function (e) {
        var globe = this.getGlobe();

        // gestion des indexes de telle manière que les couches non visibles dans le ls (displayed: false)
        // se voient affecter les indexes les plus petits (couche basse) lors du changement d'index de couches
        // visibles. Déplacement systématique des couches non visibles en couches de fond (pour ne pas occulter
        // les couches visibles).

        var targetIndex = null;
        if ( !e.newIndex || e.newIndex === 0 ) {
            targetIndex = globe.getColorLayers().length - 1;
        } else {
            var layerTargetID  = this._resolveLayerId( e.from.childNodes[e.newIndex + (e.newIndex === e.from.childNodes.length - 1 ? -1 : 1)].id);
            targetIndex = globe.getLayerById(layerTargetID).sequence;
        }

        var layerID  = this._resolveLayerId(e.item.id);

        globe.moveLayerToIndex(layerID, targetIndex);
    };

    /**
     * Checks layers range
     *
     * @method _inRangeUpdate
     * @private
     */
    LayerSwitcher.prototype._inRangeUpdate = function (layersDisplayed) {

        for (var layerKey in this._layers) {
            var layer = this._layers[layerKey];
            if ( !layer ) {
                continue;
            }
            // Check if layer is displayed.
            var layerDiv;
            var bInRange = layersDisplayed.indexOf(layer.id) >= 0;
            if ( bInRange && !layer.inRange ) {
                layer.inRange = true;
                layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + layer.id));
                layerDiv.classList.remove("outOfRange");
            } else if ( !bInRange && layer.inRange ) {
                layer.inRange = false;
                layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + layer.id));
                layerDiv.classList.add("outOfRange");
            }
        }
    };

    /**
     * Update the layer list container
     *
     * @method _updateLayerListContainer
     * @private
     */
    LayerSwitcher.prototype._updateLayerListContainer = function () {
        if ( this._layerListContainer ) {
            var globe = this.getGlobe();

            // on vide le container précédent
            while ( this._layerListContainer.firstChild ) {
                this._layerListContainer.removeChild(this._layerListContainer.firstChild);
            }
            // on réordonne les couches dans l'ordre d'empilement (globe.getLayers renvoie un tableau ordonné dans le sens inverse)
            var layers = globe.getColorLayers();
            var orderedLayers = layers.sort(function (a, b) {
                return b.sequence - a.sequence;
            });
            // et on rajoute les div correspondantes aux différentes couches, dans l'ordre décroissant des zindex
            for ( var j = 0; j < orderedLayers.length; j++ ) {
                if ( !this._layers[orderedLayers[j].id] ) {
                    continue;
                }
                // récupération de la div de la couche, stockée dans le tableau _layers
                var layerDiv = this._layers[orderedLayers[j].id].div;
                this._layerListContainer.appendChild(layerDiv);
            }
        } else {
            console.log("[Itowns.control.LayerSwitcher] _updateLayerListContainer : layer list container not found to update layers order ?!");
        }
    };

    // ################################################################### //
    // ############################ Utils ################################ //
    // ################################################################### //

    /**
     * Get layer informations : title, description, quicklookurl, legends, metadata
     *
     * @private
     * @memberof LayerSwitcher
     * @method _getLayerInfo
     * @param {Object} layer - the layer object
     * @returns {Object} layerInfo - layer informations
     */
    LayerSwitcher.prototype._getLayerInfo = function (layer) {
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

    /**
     * Get layer id from div id
     *
     * @method _resolveLayerId
     * @param {String} divId - HTML div id
     * @private
     */
    LayerSwitcher.prototype._resolveLayerId = function (divId) {
        var divName  = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
        return divName.substring(divName.indexOf("_ID_") + 4 );  // ex. 26
    };

    return LayerSwitcher;
});
