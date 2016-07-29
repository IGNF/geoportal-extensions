define([
    // "vg",
    "Common/Controls/LayerSwitcherDOM",
    "Common/Utils/LayerUtils"
], function (
    // VirtualGeo, // FIXME Global for browser only !
    LayerSwitcherDOM,
    LayerUtils
) {

    "use strict";

    /**
     * @classdesc
     * OpenLayers Control to manage map layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
     *
     * @constructor
     * @extends {VirtualGeo.Control}
     * @alias VirtualGeo.LayerSwitcher
     * @param {Object} lsOptions - control options
     * @param {Array} [lsOptions.layers] - list of layers to be configured. Each array element is an object, with following properties :
     * @param {String} [lsOptions.layers.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
     * @param {String} [lsOptions.layers.description] - layer description, to be displayed on title hover, or in layer information panel.
     * @param {String} [lsOptions.layers.quicklookUrl] - link to a quick look image for this layer.
     * @param {Array} [lsOptions.layers.legends] - array of layer legends. Each array element is an object, with following properties :
     *      - url (String, mandatory) : link to a legend
     *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
     * @param {Array} [lsOptions.layers.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
     * @param {Object} [lsOptions.options] - ol.control.Control options (see http://openlayers.org/en/v3.13.0/apidoc/ol.control.Control.html)
     * @param {Boolean} [lsOptions.options.collapsed] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is false.
     * @example
     * map.addControl(new VirtualGeo.LayerSwitcher(
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
            throw new Error("ERROR WRONG_TYPE : layers should be an object");
        }

        if ( options && typeof options !== "object" ) {
            throw new Error("ERROR WRONG_TYPE : options should be an object");
        }

        var container = this._initContainer(options);

        this._layers = {};
        this._layersOrder = [];
        this._lastZIndex = 0;
        this._layerId = 0;
        this._container = container;
        this._initLayers = layers;
        this._callbacks = {};
        this._options = options;
        // FIXME problème avec doc VirtualGeo
        var LStarget = document.getElementById(options.div);
        // call VirtualGeo.Control constructor
        VirtualGeo.Control.call(this, container, LStarget);

        // Surcharge de la méthode _setMap
        var VGsetMap = this._setMap;

        /**
         * Surcharge de la méthode _setMap : ajout des couches au LayerSwitcher,
         * ajout des listeners sur l'ajout, le retrait, et le changement des couches
         * qui ne sont pas des MNTs
         *
         * @param {Object} map - source object whose properties will be copied.
         * @param {Object} mapDiv - Div contenant la mapDiv
         * @param {Function} f - fonction
         *
         */
        this._setMap = function (map, mapDiv, f) {
            // add layers to layerlist.
            if (map) {
                if (!map.mapDiv) {
                    map.mapDiv = mapDiv;
                }
                for ( var i = 0; i < this._initLayers.length; i++ ) {
                    // recup la layer, son id,
                    var layer = map.getLayer(layers[i].layer.id);

                    if ( layer ) {
                        // et les infos de la conf si elles existent (title, description, legends, quicklook, metadata)
                        var conf = layers[i].config || {};
                        var layerOptions = {
                            id : layer.id,
                            ipr : layer.ipr || null,
                            type : layer.type || null,
                            opacity : layer.opacity || 1,
                            visibility : layer.visible || true,
                            title : conf.title || layer.title,
                            description : conf.description || null,
                            legends : conf.legends || [],
                            metadata : conf.metadata || [],
                            quicklookUrl : conf.quicklookUrl || null
                        };
                        this._layers[layer.id] = layerOptions;
                    }
                }

                var self = this;
                this._addMapLayers(map);
                // Ajout des listeners
                // map.addEventListener("zoomchanged", function(zoom) {console.log(zoom);});

                // At every map movement, layer switcher may be updated,
                // according to layers on map, and their range.
                /**
                * ajout du callback oncenterchanged
                */
                this._callbacks.onChangedCenterCallBack = function (center) {
                    self._onMapMoveEnd.call(self, map);
                };
                map.addEventListener("centerchanged", self._callbacks.onChangedCenterCallBack, self);

                /**
                * ajout du callback onlayeradded
                */
                this._callbacks.onAddedLayerCallBack = function (addedLayer) {
                    if (addedLayer.type !== "elevation") {
                        var layer = addedLayer;
                        var id = layer.id;
                        if ( self && !self._layers[id] ) {
                            self._lastZIndex++;
                            self.addLayer(layer);
                        }
                    }
                };
                map.addEventListener("layeradded", this._callbacks.onAddedLayerCallBack, self);

                /**
                * ajout du callback onlayerremoved
                */
                this._callbacks.onRemovedLayerCallBack = function (removedLayer) {
                    if (removedLayer.type !== "elevation") {
                        var layer = removedLayer;
                        var id = layer.id;

                        // On met à jour le tableau des couches ordonnées
                        for (var i = 0; i < self._layersOrder.length; i++) {
                            if (self._layersOrder[i].id == removedLayer.id) {
                                self._layersOrder.splice(i, 1);
                            }
                        }
                        // On met à jour l'index max et on retire la couche du layerSwitcher
                        if ( self && self._layers[id] ) {
                            self._lastZIndex--;
                            self.removeLayer(layer);
                        }
                    }
                };
                map.addEventListener("layerremoved", this._callbacks.onRemovedLayerCallBack, self);

                /**
                * ajout du callback onlayerchanged:opacity
                */
                this._callbacks.onOpacityLayerCallBack = function (changedLayer) {
                    if (changedLayer.type !== "elevation") {
                        // Si l'opacité a changé
                        self._updateLayerOpacity(changedLayer);
                    }
                };
                map.addEventListener("layerchanged:opacity", this._callbacks.onOpacityLayerCallBack, self);

                /**
                * ajout du callback onlayerchanged:visible
                */
                this._callbacks.onVisibilityLayerCallBack = function (changedLayer) {
                    if (changedLayer.type !== "elevation") {
                        // Si la visibilité a changé
                        self._updateLayerVisibility(changedLayer);
                    }
                };
                map.addEventListener("layerchanged:visible", this._callbacks.onVisibilityLayerCallBack, self);

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
                            self._layersOrder = getOrderedLayers(map);
                            // et on rajoute les div correspondantes aux différentes couches, dans l'ordre décroissant des zindex
                            for ( var j = 0; j < self._layersOrder.length; j++ ) {
                                var layerOptions = self._layersOrder[j];
                                // récupération de la div de la couche, stockée dans le tableau _layers
                                var layerDiv = self._layers[self._layersOrder[j].id].div;
                                self._layerListContainer.appendChild(layerDiv);
                            }
                        } else {
                            console.log("[VG.control.LayerSwitcher] _updateLayersOrder : layer list container not found to update layers order ?!");
                        }
                    // }
                };
                map.addEventListener("layerchanged:index", this._callbacks.onIndexLayerCallBack, self);

                // On associe la map au LayerSwitcher control ajouté
                this._map = map;
            }
                VGsetMap.call(this, map, mapDiv, f);
                // Si map == null, on est dans le cas de la suppression du control
                if (map == null) {
                    // On retire les listeners qui étaient liés au layerSwitcher supprimé
                    this._map.removeEventListener("centerchanged", this._callbacks.onChangedCenterCallBack);
                    this._map.removeEventListener("layeradded", this._callbacks.onAddedLayerCallBack);
                    this._map.removeEventListener("layerremoved", this._callbacks.onRemovedLayerCallBack);
                    this._map.removeEventListener("layerchanged:opacity", this._callbacks.onOpacityLayerCallBack);
                    this._map.removeEventListener("layerchanged:visible", this._callbacks.onVisibilityLayerCallBack);
                    this._map.removeEventListener("layerchanged:index", this._callbacks.onIndexLayerCallBack);
                    return ;
                }
                // A l'initialisationdu globe, l'évenement centerchanged n'est pas déclenché
                // on lance le callback associé à la main
                this._onMapMoveEnd(map);

        };

    }

    // Inherits from VirtualGeo.Control
    VirtualGeo.Utils.inherits(LayerSwitcher, VirtualGeo.Control);

    /*
     * @lends module:LayerSwitcher
     */
    LayerSwitcher.prototype = Object.create(VirtualGeo.Control.prototype, {});

    /**
     * Copies all source object members to LayerSwitcher prototype
     *
     * @param {Object} source - source object whose properties will be copied.
     */
    LayerSwitcher.prototype.assign = function ( source ) {
        for ( var prop in source ) {
            if ( source.hasOwnProperty(prop) ) {
                this[prop] = source[prop];
            }
        }
    };

    LayerSwitcher.prototype.assign(LayerSwitcherDOM);

    /**
     * Constructor (alias)
     */
    LayerSwitcher.prototype.constructor = LayerSwitcher;

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
        var isLayerInMap = false;
        if (map.getLayer(id)) {
            isLayerInMap = true;
        }

        if ( !isLayerInMap ) {
            console.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for ", layer, " layer (layer is not in map.getLayers() )");
            return;
        }

        // if layer is not already in layers list, add it to control (layers list and container div)
        if ( !this._layers[id] ) {

            // 1. add layer to layers list
            var layerInfos = getLayerInfo(layer) || {};
            var layerOptions = {
                id : id,
                ipr : layer.ipr || null,
                type : layer.type || null,
                inRange : isInRange(layer, map) || true,
                opacity : layer.opacity || 1,
                visibility : layer.visible || true,
                title : config.title || layerInfos._title || id,
                description : config.description || layerInfos._description || null,
                legends : config.legends || layerInfos._legends || [],
                metadata : config.metadata || layerInfos._metadata || [],
                quicklookUrl : config.quicklookUrl || layerInfos._quicklookUrl || null
            };
            this._layers[id] = layerOptions;

            var layerDiv = this._createLayerDiv(layerOptions);
            this._layers[id].div = layerDiv;

            map.moveLayerToIndex({
                id : layer.id,
                index : this._lastZIndex
            });

            // 2. add layer div to control main container
            // Récupération de l'élément contenant les différentes couches.
            var elementLayersList = document.getElementById("GPlayersList");

            // ajout de la couche au début du tableau des couches ordonnées
            this._layersOrder.unshift(layerOptions);
            elementLayersList.insertBefore(layerDiv, elementLayersList.firstChild);

        // user may also add a new configuration for an already added layer
        } else if ( this._layers[id] && config ) {

            // add new configuration parameters to layer informations
            for ( var prop in config ) {
                if ( config.hasOwnProperty(prop) ) {
                    this._layers[id][prop] = config[prop];
                }
            }
            // set new title in layer div
            if ( config.title ) {
                var nameDiv = document.getElementById("GPname_ID" + id);
                if ( nameDiv ) {
                    nameDiv.innerHTML = config.title;
                }
            }
            // add layer info picto if necessary
            var infodiv = document.getElementById("GPinfo_ID" + id);
            if ( !document.getElementById("GPinfo_ID" + id) && config.description && ( config.legends || config.metadata || config.quicklookUrl ) ) {
                var advancedTools = document.getElementById("GPadvancedTools_ID" + id);
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
                document.getElementById("GPlayerInfoPanel").className = "GPlayerInfoPanelClosed";
                infodiv.className === "GPlayerInfo";
            }

        }
    };

    /**
     * Remove a layer from control
     *
     * @param {Object} layer - layer.
     */
    LayerSwitcher.prototype.removeLayer = function (layer) {
        var layerID = layer.id;
        var layerList = document.getElementById("GPlayersList");
        // close layer info element if open.
        var infodiv = document.getElementById("GPinfo_ID" + layerID);
        if ( infodiv && infodiv.className === "GPlayerInfoOpened" ) {
            document.getElementById("GPlayerInfoPanel").className = "GPlayerInfoPanelClosed";
            infodiv.className === "GPlayerInfo";
        }
        // remove layer div
        var layerDiv = document.getElementById("GPlayerSwitcher_ID" + layerID);
        layerList.removeChild(layerDiv);

        // on retire la couche de la liste des layers
        delete this._layers[layerID];

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
        var childNodes = this._container.childNodes;

        for ( var i = 0; i < childNodes.length; i ++ ) {
            if ( childNodes[i].id === "GPlayersList" ) {
                elementLayersList = childNodes[i];
            }
        }

        // on réordonne les couches dans l'ordre d'empilement (map.getLayers renvoie un tableau ordonné dans le sens inverse)
        this._layersOrder = getOrderedLayers(map);

        // on parcourt toutes les couches de la carte, pour les ajouter à la liste du controle si ce n'est pas déjà le cas.
        this._layersOrder.forEach(
            function (layer) {
                // on ne traite pas les MNTs
                if (layer.type !== "elevation") {
                    // ajout des couches de la carte à la liste
                    var id;
                    id = layer.id;
                    var layerInfos = getLayerInfo(layer) || {};
                    if ( !this._layers[id] ) {

                        // si la couche n'est pas encore dans la liste des layers (this._layers), on l'ajoute
                        var layerOptions = {
                            id : layer.id,
                            ipr : layer.ipr || null,
                            opacity : layer.opacity || 1,
                            visibility : layer.visible || true,
                            type : layer.type || null,
                            inRange : isInRange(layer, map) || true,
                            title : layerInfos._title || id,
                            description : layerInfos._description || null,
                            legends : layerInfos._legends || [],
                            metadata : layerInfos._metadata || [],
                            quicklookUrl : layerInfos._quicklookUrl || null
                        };
                        this._layers[id] = layerOptions;
                    } else {
                        // update layer informations (visibility, opacity, inRange)
                        this._layers[id].opacity = layer.opacity;
                        this._layers[id].visibility = layer.visible;
                        this._layers[id].inRange = isInRange(layer, map);
                    }
                    this._lastZIndex++;
                }
            },
            this
        );
        // on ajoute les couches au layerSwitcher dans le bon ordre
        for ( var i in this._layersOrder ) {
            if (this._layersOrder[i].type !== "elevation") {
                var layerDiv = this._createLayerDiv(this._layers[this._layersOrder[i].id]);
                this._layers[this._layersOrder[i].id].div = layerDiv;
                elementLayersList.appendChild(layerDiv);
            }
        }
    };

    /**
     * create layer div (to append to control DOM element).
     */
    LayerSwitcher.prototype._createLayerDiv = function (layerOptions) {
        var isLegends = layerOptions.legends && layerOptions.legends.length !== 0;
        var isMetadata = layerOptions.metadata && layerOptions.metadata.length !== 0;
        var isQuicklookUrl = layerOptions.quicklookUrl;
        if ( isLegends || isMetadata || isQuicklookUrl ) {
            layerOptions.displayInformationElement = true;
        }

        // ajout d'une div pour cette layer dans le control
        var layerDiv = this._createContainerLayerElement(layerOptions);

        if ( !layerOptions.inRange ) {
            layerDiv.classList.add("outOfRange");
        }

        return layerDiv;
    };

    /**
     * Change layer opacity on layer opacity picto click
     *
     * @param {Object} e - event
     */
    LayerSwitcher.prototype._onChangeLayerOpacity = function (e) {
        var map = this.getMap();
        var divId    = e.target.id;
        var layerID  = divId.substring(divId.indexOf("_") + 3);  // ex GPvisibilityPicto_ID26

        var opacityValue = e.target.value;
        var opacityId = document.getElementById("GPopacityValue_ID" + layerID);
        opacityId.innerHTML = opacityValue + "%";

        map.setLayerOpacity({
            id : layerID,
            opacity : opacityValue / 100
        });

    };

    /**
     * Update picto opacity value on layer opacity change
     *
     * @param {Object} changedLayer - layer whom opacity changed
     */
    LayerSwitcher.prototype._updateLayerOpacity = function (changedLayer) {
        var opacity = changedLayer.opacity;
        if ( opacity > 1 ) {
            opacity = 1;
        }
        if ( opacity < 0 ) {
            opacity = 0;
        }
        var id = changedLayer.id;
        var layerOpacityInput = document.getElementById("GPopacityValueDiv_ID" + id);
        layerOpacityInput.value = Math.round(opacity * 100);
        var layerOpacitySpan = document.getElementById("GPopacityValue_ID" + id);
        layerOpacitySpan.innerHTML = Math.round(opacity * 100) + "%";
    };

    /**
     * Change layer visibility on layer visibility picto click
     *
     * @param {Object} e - event
     */
    LayerSwitcher.prototype._onVisibilityLayerClick = function (e) {
        var map = this.getMap();
        var divId    = e.target.id;
        var layerID  = divId.substring(divId.indexOf("_") + 3);  // ex GPvisibilityPicto_ID26

        map.setLayerVisible({
            id : layerID,
            visible : e.target.checked
        });
    };

    /**
     * Change picto visibility on layer visibility change
     *
     * @param {Object} changedLayer - layer whom visibility changed
     */
    LayerSwitcher.prototype._updateLayerVisibility = function (changedLayer) {
        var id = changedLayer.id;
        var visible = changedLayer.visible;
        var layerVisibilityInput = document.getElementById("GPvisibility_ID" + id);
        layerVisibilityInput.checked = visible;
    };

    /**
     * Open layer information panel on picto click
     *
     * @param {Event} e - MouseEvent
     */
    LayerSwitcher.prototype._onOpenLayerInfoClick = function (e) {

        var divId    = e.target.id;
        var layerID  = divId.substring(divId.indexOf("_") + 3);  // ex GPvisibilityPicto_ID26
        var layerOptions    = this._layers[layerID];

        var panel;
        var info;

        // Close layer info panel
        divId = document.getElementById(e.target.id);
        if (divId.className === "GPlayerInfoOpened") {
            if ( divId.classList !== undefined ) {
                divId.classList.remove("GPlayerInfoOpened");
                divId.classList.add("GPlayerInfo");
            }

            panel = document.getElementById("GPlayerInfoPanel");
            if ( panel.classList !== undefined ) {
                panel.classList.remove("GPpanel");
                panel.classList.remove("GPlayerInfoPanelOpened");
                panel.classList.add("GPlayerInfoPanelClosed");
            }

            info = document.getElementById("GPlayerInfoContent");
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

        panel = document.getElementById("GPlayerInfoPanel");
        if ( panel.classList !== undefined ) {
            panel.classList.add("GPpanel");
            panel.classList.remove("GPlayerInfoPanelClosed");
            panel.classList.add("GPlayerInfoPanelOpened");
        }

        info = document.getElementById("GPlayerInfoContent");
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
        // get layer max scale denominator
        /*
        var maxResolution = layerOptions.layer.getMaxResolution();
        if ( maxResolution === Infinity ) {
            obj._maxScaleDenominator = 560000000;
        } else {
            obj._maxScaleDenominator = Math.round(maxResolution / 0.00028);
        }
        */
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
        var divId    = e.target.id;
        var layerID  = divId.substring(divId.indexOf("_") + 3);  // ex GPvisibilityPicto_ID26
        // le retrait de la couche va déclencher l'ecouteur d'évenement,
        // et appeler this.removeLayer qui va supprimer la div.
        map.removeLayer({
            id : layerID
        });

    };

    /**
     * change layers order on drag and drop
     */
    LayerSwitcher.prototype._onDragAndDropLayerClick = function () {
        var map = this.getMap();
        // on récupère l'ordre des div dans le contrôle pour réordonner les couches (avec zindex)
        var matchesLayers = document.querySelectorAll("div.GPlayerSwitcher_layer");
        var maxZIndex = matchesLayers.length;
        var newIndex;

        for (var i = 0; i < matchesLayers.length; i++) {
            newIndex = maxZIndex - i;
            var tag = matchesLayers[i].id;
            var id  = tag.substring(tag.indexOf("_") + 3);

            map.moveLayerToIndex({
                id : id,
                index : newIndex
            });

        }
        // mise à jour du tableau des couches ordonneés
        this._layersOrder = getOrderedLayers(map);
        // on appelle le callback sur le changement d'index manuellement
        // pour forcer la reconstruction des div du layerSwitcher au cas où
        // le nouvcel index est le même que le précédent
        this._callbacks.onIndexLayerCallBack();
    };

    /**
     * check layers range on map movement
     *
     * @param {VirtualGeo.Map} map - virtualGeo map on which event occured
     */
    LayerSwitcher.prototype._onMapMoveEnd = function (map) {
        map.getLayers().forEach(
            function (layer) {
                var id = layer.id;
                if ( this._layers[id] ) {
                    var layerOptions = this._layers[id];
                    // Check if layer is out of range.
                    var layerDiv;
                    if ( isInRange(layer, map) && !layerOptions.inRange ) {
                        layerOptions.inRange = true;
                        layerDiv = document.getElementById("GPlayerSwitcher_ID" + id);
                        layerDiv.classList.remove("outOfRange");
                    } else if ( !isInRange(layer, map) && layerOptions.inRange ) {
                        layerOptions.inRange = false;
                        layerDiv = document.getElementById("GPlayerSwitcher_ID" + id);
                        layerDiv.classList.add("outOfRange");
                    }
                }
            },
            this
        );
    };

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
    function isInRange (layer, map) {
        if (!map) {
            return;
        }
        // check if map zoom is in layer zoom range
        var mapResolution = map.getZoomScale();

        if ( (layer.maxScaleDenominator !== 0 || layer.minScaleDenominator !== 0) && (mapResolution > layer.maxScaleDenominator || mapResolution < layer.minScaleDenominator) ) {
            return false;
        }

        var viewExtent = getViewExtent(map);
        // To get the same format of bbox array
        var layerExtent = [layer.bbox[3], layer.bbox[0], layer.bbox[1], layer.bbox[2]];
        if (!LayerUtils.intersects(viewExtent, layerExtent)) {
            return false;
        }

        /*
        // check if map extent intersects layer extent (if defined)
        var mapExtent = map.getView().calculateExtent(map.getSize());
        var layerExtent = layer.getExtent();
        if ( layerExtent && !ol.extent.intersects(mapExtent, layerExtent) ) {
            return false;
        }*/

        return true;
    }

    /**
    * Returns the extent of the current view
    *
    * @private
    * @memberof LayerSwitcher
    * @method getViewExtent
    * @param {object} map - the map object
    * @returns {Array} extent - the extent of the view
    */
    function getViewExtent(map) {
        var topLeft = {};
        var bottomRight = {};
        var mapDiv = map.mapDiv;
        // on teste le pick sur l'axe des y au cas où la vue est inclinée
        for (var x = 0; x <= mapDiv.offsetHeight; x = x + mapDiv.offsetHeight / 10) {
            // on pick en haut à gauche de la fenêtre puis on descend d'un dixième de la hauteur de la fenêtre
            // à chaque itération jusqu'à ne plus picker dans le ciel
            topLeft = map.pickPosition(0, x);
            // Si l'un des deux coordonnées n'est plus différent de 0, on ne pick plus dans le ciel
            if (topLeft.lon !== 0 || topLeft.lat !== 0) {
                break;
            }
        }
        // On pick en bas à droite
        bottomRight = map.pickPosition(mapDiv.offsetWidth, mapDiv.offsetHeight);
        // Si l'un des deux picks est toujours dans le ciel malgré les précédents tests,
        // c'est que la vue est si éloignée qu'on voit le globe complet :
        // On renvoie donc comme extent [90, -180, -90, 180]
        if ((topLeft.lon === 0 && topLeft.lat === 0) || (bottomRight.lon === 0 && bottomRight.lat === 0)) {
            topLeft.lat = 90;
            topLeft.lon = -180;
            bottomRight.lat = -90;
            bottomRight.lon = 180;
        }
        var extent = [topLeft.lat, topLeft.lon, bottomRight.lat, bottomRight.lon];
        return extent;
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
    function getLayerInfo (layer) {
        var layerInfo = {};
        if (layer) {
            layerInfo._title = layer._title || "";
            layerInfo._description = layer._description || "";
            layerInfo._quicklookUrl = layer._quicklookUrl || "";
            layerInfo._metadata = layer._metadata || [];
            layerInfo._legends = layer._legends || [];
        }
        return layerInfo;
    };

    /**
     * Get an array of the layers as ordered on map (without elevation layers)
     *
     * @private
     * @memberof LayerSwitcher
     * @method getOrderedLayers
     * @returns {Array} orderedLayers - ordered array of layers
     */
    function getOrderedLayers (map) {
        var orderedLayers = [];
        /*
        // on réordonne les couches dans l'ordre d'empilement (map.getLayers renvoie un tableau ordonné dans le sens inverse)
        var allLayers = map.getLayers().reverse();
        for ( var i = 0; i < allLayers.length; i++) {
            if (allLayers[i].type !== "elevation") {
                orderedLayers.push(allLayers[i]);
            }
        }
        */
        // FIXME attendre correction sur le map.getLayers() pour qu'il renvoie les couches vraiment ordonnées
        // et alors le code ci-dessus sera fonctionnel pour bloquer les feature layers en haut dans le LS
        var featureLayers = map.getLayers({type : "feature"}).reverse();
        for ( var i = 0; i < featureLayers.length; i++) {
            orderedLayers.push(featureLayers[i]);
        }
        var rasterLayers = map.getLayers({type : "raster"}).reverse();
        for ( var i = 0; i < rasterLayers.length; i++) {
            orderedLayers.push(rasterLayers[i]);
        }
        return orderedLayers;
    };

    return LayerSwitcher;
});
