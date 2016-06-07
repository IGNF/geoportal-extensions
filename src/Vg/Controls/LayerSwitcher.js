define([
    // "vg",
    "Common/Controls/LayerSwitcherDOM"
], function (
    // VirtualGeo, // FIXME Global for browser only !
    LayerSwitcherDOM
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

        // call VirtualGeo.Control constructor
        VirtualGeo.Control.call(this, container);

        // Surcharge de la méthode _setMap
        // FIXME
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
                * ajout du callback onlayerchanged
                */
                this._callbacks.onChangedLayerCallBack = function (changedLayer) {
                    if (changedLayer.type !== "elevation") {
                        // Si l'opacité a changé
                        if (changedLayer.opacity !== self._layers[changedLayer.id].opacity) {
                            self._updateLayerOpacity(changedLayer);
                        }
                        // Si la visibilité a changé
                        if (changedLayer.visible !== self._layers[changedLayer.id].visible) {
                            self._updateLayerVisibility(changedLayer);
                        }
                    }
                };
                map.addEventListener("layerchanged", this._callbacks.onChangedLayerCallBack, self);

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
                    this._map.removeEventListener("layerchanged", this._callbacks.onChangedLayerCallBack);
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
                opacity : layer.opacity || 1,
                visibility : layer.visible || true,
                title : config.title || layerInfos._title || id,
                description : config.description || layerInfos._description || null,
                legends : config.legends || layerInfos._legends || [],
                metadata : config.metadata || layerInfos._metadata || [],
                quicklookUrl : config.quicklookUrl || layerInfos._quicklookUrl || null
            };
            this._layers[id] = layerOptions;
            // ajout de la couche au début du tableau des couches ordonnées
            this._layersOrder.unshift(layerOptions);

            map.moveLayerToIndex({
                id : layer.id,
                index : this._lastZIndex
            });

            // 2. add layer div to control main container
            // Récupération de l'élément contenant les différentes couches.
            var elementLayersList = document.getElementById("GPlayersList");
            elementLayersList.insertBefore(this._createLayerDiv(layerOptions), elementLayersList.firstChild);

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
        var divL = this._createMainLayersElement();
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
                            opacity : layer.opacity || 1,
                            visibility : layer.visible,
                            // inRange : isInRange(layer, map) || true,
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
                        // this._layers[id].inRange = isInRange(layer, map);
                    }
                    this._lastZIndex++;
                }
            },
            this
        );
        // on ajoute les couches au layerSwitcher dans le bon ordre
        for ( var i in this._layersOrder ) {
            if (this._layersOrder[i].type !== "elevation") {
                elementLayersList.appendChild(this._createLayerDiv(this._layers[this._layersOrder[i].id]));
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

        // mise à jour de la visu
        // map.updateSize();
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
                    // if ( isInRange(layer, map) && !layerOptions.inRange ) {
                    layerOptions.inRange = true;
                    layerDiv = document.getElementById("GPlayerSwitcher_ID" + id);
                    layerDiv.classList.remove("outOfRange");
                    /* } else if ( !isInRange(layer, map) && layerOptions.inRange ) {
                        layerOptions.inRange = false;
                        layerDiv = document.getElementById("GPlayerSwitcher_ID" + id);
                        layerDiv.classList.add("outOfRange");
                    } */
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
        var mapResolution = map.getView().getResolution();
        if ( mapResolution > layer.getMaxResolution() || mapResolution < layer.getMinResolution ) {
            return false;
        }

        // check if map extent intersects layer extent (if defined)
        var mapExtent = map.getView().calculateExtent(map.getSize());
        var layerExtent = layer.getExtent();
        if ( layerExtent && !ol.extent.intersects(mapExtent, layerExtent) ) {
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
        // on réordonne les couches dans l'ordre d'empilement (map.getLayers renvoie un tableau ordonné dans le sens inverse)
        var allLayers = map.getLayers().reverse();
        for ( var i = 0; i < allLayers.length; i++) {
            if (allLayers[i].type !== "elevation") {
                orderedLayers.push(allLayers[i]);
            }
        }
        return orderedLayers;
    };

    return LayerSwitcher;
});
