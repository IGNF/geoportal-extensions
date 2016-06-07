define([
    "ol",
    "Ol3/Utils",
    "Common/Controls/LayerSwitcherDOM"
], function (
    ol,
    Utils,
    LayerSwitcherDOM
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
     * @param {Object} [lsOptions.options] - ol.control.Control options (see {@link http://openlayers.org/en/v3.13.0/apidoc/ol.control.Control.html})
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

        // {Object} control layers list. Each key is a layer id, and its value is an object of layers options (layer, id, opacity, visibility, title, description...)
        this._layers = {};
        // [Array] array of ordered control layers
        this._layersOrder = [];
        // {Number} layers max z index, to order layers using their z index
        this._lastZIndex = 0;
        // {Number} layers max id, incremented when a new layer is added
        this._layerId = 0;
        /** {Boolean} true if widget is collapsed, false otherwise */
        this.collapsed = (options.collapsed !== undefined) ? options.collapsed : true;

        var container = this._initContainer(options);

        // add options layers to layerlist.
        // (seulement les couches configurées dans les options du layerSwitcher par l'utilisateur),
        // les autres couches de la carte seront ajoutées dans la méthode setMap
        for ( var i = 0; i < layers.length; i++ ) {
            // recup la layer, son id,
            var layer = layers[i].layer;
            if ( layer ) {
                var id;
                // si elles ont déjà un identifiant (gpLayerId), on le récupère, sinon on en crée un nouveau, en incrémentant this_layerId.
                if ( !layer.hasOwnProperty("gpLayerId") ) {
                    id = this._layerId;
                    layer.gpLayerId = id;
                    this._layerId ++;
                } else {
                    id = layer.gpLayerId;
                }

                // et les infos de la conf si elles existent (title, description, legends, quicklook, metadata)
                var conf = layers[i].config || {};
                var opacity = layer.getOpacity();
                var visibility = layer.getVisible();
                var layerOptions = {
                    layer : layer, // la couche ol.layer concernée
                    id : id,
                    opacity : opacity != null ? opacity : 1,
                    visibility : visibility != null ? visibility : true,
                    title : conf.title != null ? conf.title : id,
                    description : conf.description || null,
                    legends : conf.legends || [],
                    metadata : conf.metadata || [],
                    quicklookUrl : conf.quicklookUrl || null
                };
                this._layers[id] = layerOptions;
            }
        }

        // call ol.control.Control constructor
        ol.control.Control.call(this,
            {
                element : container,
                target : options.target,
                render : options.render
            }
        );
    }

    // Inherits from ol.control.Control
    ol.inherits(LayerSwitcher, ol.control.Control);

    /*
     * @lends module:LayerSwitcher
     */
    LayerSwitcher.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les méthodes de la classe commune LayerSwitcherDOM
    Utils.assign(LayerSwitcher.prototype, LayerSwitcherDOM);

    /**
     * Constructor (alias)
     *
     * @private
     */
    LayerSwitcher.prototype.constructor = LayerSwitcher;

    /**
     * Overload setMap function, that enables to catch map events, such as movend events.
     *
     * @param {ol.Map} map - Map.
     */
    LayerSwitcher.prototype.setMap = function (map) {

        // info : cette méthode est appelée (entre autres?) après un map.addControl() ou map.removeControl()

        if ( map ) { // dans le cas de l'ajout du contrôle à la map

            // on ajoute les couches
            this._addMapLayers(map);

            // At every map movement, layer switcher may be updated,
            // according to layers on map, and their range.
            map.on(
                "moveend",
                function () {
                    this._onMapMoveEnd.call(this, map);
                },
                this
            );

            // add event listeners when a new layer is added to map, to add it in LayerSwitcher control (and DOM)
            map.getLayers().on(
                "add",
                function (evt) {
                    var layer = evt.element;
                    var id;
                    // on attribue un nouvel identifiant à cette couche,
                    // sauf si c'est une couche qui a déjà été ajoutée dans le LayerSwitcher au préalable (si gpLayerId existe)
                    if ( !layer.hasOwnProperty("gpLayerId") ) {
                        id = this._layerId;
                        layer.gpLayerId = id;
                        this._layerId ++;
                    } else {
                        id = layer.gpLayerId;
                    }
                    if ( !this._layers[id] ) {
                        this.addLayer(layer);
                    }
                },
                this
            );

            // add event listeners when a layer is removed from map, to remove it from LayerSwitcher control (and DOM)
            map.getLayers().on(
                "remove",
                function (evt) {
                    var layer = evt.element;
                    var id = layer.gpLayerId;
                    if ( this._layers[id] ) {
                        this.removeLayer(layer);
                    }
                },
                this
            );
        }

        // on appelle la méthode setMap originale d'OpenLayers
        ol.control.Control.prototype.setMap.call(this, map);
    };

    /**
     * Add a new layer to control (when added to map) or add new layer configuration
     *
     * @param {ol.layer.Layer} layer - layer to add to layer switcher
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

        var map = this.getMap();
        config = config || {};

        if ( !layer ) {
            console.log("[ERROR] LayerSwitcher:addLayer - missing layer parameter");
            return;
        }

        var id = layer.gpLayerId;
        if ( id === "undefined" ) {
            console.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for " + layer + " layer (layer id not found)");
            return;
        }

        // make sure layer is in map layers
        var isLayerInMap = false;
        map.getLayers().forEach(
            function ( lyr ) {
                if ( lyr.gpLayerId === id ) {
                    isLayerInMap = true;
                }
            },
            this
        );
        if ( !isLayerInMap ) {
            console.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for ", layer, " layer (layer is not in map.getLayers() )");
            return;
        }

        // if layer is not already in layers list, add it to control (layers list and container div)
        if ( !this._layers[id] ) {

            // 1. add layer to layers list
            var layerInfos = this.getLayerInfo(layer) || {};
            var opacity = layer.getOpacity();
            var visibility = layer.getVisible();
            var isInRange = this.isInRange(layer, map);
            var layerOptions = {
                layer : layer,
                id : id,
                opacity : opacity != null ? opacity : 1,
                visibility : visibility != null ? visibility : true,
                inRange : isInRange != null ? isInRange : true,
                title : config.title != null ? config.title : ( layerInfos._title || id ),
                description : config.description || layerInfos._description || null,
                legends : config.legends || layerInfos._legends || [],
                metadata : config.metadata || layerInfos._metadata || [],
                quicklookUrl : config.quicklookUrl || layerInfos._quicklookUrl || null
            };
            this._layers[id] = layerOptions;
            this._layersOrder.unshift(layerOptions);
            this._lastZIndex++;
            layer.setZIndex(this._lastZIndex);

            // Add listeners for opacity and visibility changes
            layer.on(
                "change:opacity",
                this._updateLayerOpacity
            );
            layer.on(
                "change:visible",
                this._updateLayerVisibility
            );

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
                    nameDiv.title = config.description || config.title;
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
     * @param {ol.layer.Layer} layer - layer.
     */
    LayerSwitcher.prototype.removeLayer = function (layer) {

        var layerID = layer.gpLayerId;
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

        var layerIndex = Math.abs(layer.getZIndex() - this._lastZIndex);
        // on retire la couche de la liste ordonnée des layers
        this._layersOrder.splice(layerIndex, 1);
        this._lastZIndex--;
        // on met à jour les zindex des couches restantes
        for ( var i = 0; i < this._layersOrder.length; i++ ) {
            // info: this._layersOrder[i] est un objet layerOptions.
            this._layersOrder[i].layer.setZIndex(this._lastZIndex - i);
        }
        // on retire la couche de la liste des layers
        delete this._layers[layerID];
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
        var isCollapsed = !document.getElementById("GPshowLayersList").checked;
        if ( ( collapsed && isCollapsed) || ( !collapsed && !isCollapsed ) ) {
            return;
        }
        // on simule l'ouverture du panneau après un click
        if ( !isCollapsed ) {
            var layers = document.getElementsByClassName("GPlayerInfoOpened");
            for ( var i = 0; i < layers.length; i++ ) {
                layers[i].className = "GPlayerInfo";
            }
            document.getElementById("GPlayerInfoPanel").className = "GPlayerInfoPanelClosed";
        }
        document.getElementById("GPshowLayersList").checked = !collapsed;
    };

    /**
     * Returns true if widget is collapsed (minimize), false otherwise
     */
    LayerSwitcher.prototype.getCollapsed = function () {
        return this.collapsed;
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
        var removalDiv = document.getElementById("GPremove_ID" + layerID);
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

    /**
     * Create control main container
     *
     * @private
     */
    LayerSwitcher.prototype._initContainer = function () {
        // creation du container principal
        var container = this._createMainContainerElement();

        // ajout dans le container principal d'affichage des layers
        var input = this._createMainLayersShowElement();
        container.appendChild(input);

        // gestion du mode "collapsed"
        if (!this.collapsed) {
            input.checked = "checked";
            this.collapsed = false;
        } else {
            this.collapsed = true;
        }

        // on ajoute un écouteur d'évènement sur le bouton (checkbox) de dépliement/repliement des couches,
        // pour modifier la propriété this.collapsed quand on clique dessus
        var context = this;
        /** event listener */
        var changeCollapsed = function (e) {
            this.collapsed = !e.target.checked;
            // on génère nous même l'evenement OpenLayers de changement de pté
            // (utiliser layerSwitcher.on("change:collapsed", function ) pour s'abonner à cet évènement)
            this.dispatchEvent("change:collapsed");
        };
        input.addEventListener(
            "click",
            function (e) {
                changeCollapsed.call(context, e);
            }
        );

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
     * Add all map layers to control main container
     *
     * @param {Object} map - ol.Map object, to which control is added
     * @private
     */
    LayerSwitcher.prototype._addMapLayers = function (map) {

        // Récupération de l'élément contenant les différentes couches.
        var elementLayersList;
        var childNodes = this.element.childNodes;
        for ( var i = 0; i < childNodes.length; i ++ ) {
            if ( childNodes[i].id === "GPlayersList" ) {
                elementLayersList = childNodes[i];
            }
        }

        var layersIndex = {};
        // on parcourt toutes les couches de la carte, pour les ajouter à la liste du controle si ce n'est pas déjà le cas.
        // idée : le layerSwitcher doit représenter l'ensemble des couches de la carte.
        map.getLayers().forEach(
            function (layer) {

                // ajout des couches de la carte à la liste
                var id;
                // si elles ont déjà un identifiant (gpLayerId), on le récupère, sinon on en crée un nouveau, en incrémentant this_layerId.
                if ( !layer.hasOwnProperty("gpLayerId") ) {
                    id = this._layerId;
                    layer.gpLayerId = id;
                    this._layerId ++;
                } else {
                    id = layer.gpLayerId;
                }

                var layerInfos = this.getLayerInfo(layer) || {};
                if ( !this._layers[id] ) {
                    // si la couche n'est pas encore dans la liste des layers (this._layers), on l'ajoute
                    var opacity = layer.getOpacity();
                    var visibility = layer.getVisible();
                    var isInRange = this.isInRange(layer, map);
                    var layerOptions = {
                        layer : layer,
                        id : id,
                        opacity : opacity != null ? opacity : 1,
                        visibility : visibility != null ? visibility : true,
                        inRange : isInRange != null ? isInRange : true,
                        title : layerInfos._title || id,
                        description : layerInfos._description || null,
                        legends : layerInfos._legends || [],
                        metadata : layerInfos._metadata || [],
                        quicklookUrl : layerInfos._quicklookUrl || null
                    };
                    this._layers[id] = layerOptions;
                } else {
                    // si elle existe déjà, on met à jour ses informations (visibility, opacity, inRange)
                    this._layers[id].opacity = layer.getOpacity();
                    this._layers[id].visibility = layer.getVisible();
                    this._layers[id].inRange = this.isInRange(layer, map);
                }

                // Ajout de listeners sur les changements d'opacité, visibilité
                layer.on(
                    "change:opacity",
                    this._updateLayerOpacity
                );
                layer.on(
                    "change:visible",
                    this._updateLayerVisibility
                );

                // récupération des zindex des couches s'ils existent, pour les ordonner.
                var layerIndex = null;
                if ( layer.getZIndex !== undefined ) {
                    layerIndex = layer.getZIndex();
                    if ( !layersIndex[layerIndex] || !Array.isArray(layersIndex[layerIndex]) ) {
                        layersIndex[layerIndex] = [];
                    }
                    layersIndex[layerIndex].push(this._layers[id]);
                    layer.setZIndex(0);
                };
            },
            this
        );

        // on récupère l'ordre d'affichage des couches entre elles dans la carte, à partir de zindex.
        for ( var zindex in layersIndex ) {
            if ( layersIndex.hasOwnProperty(zindex) ) {
                var layers = layersIndex[zindex];
                for ( var l = 0; l < layers.length; l++ ) { // à ce stade layers[l] est une couche de this._layers.
                    // on conserve l'ordre des couches : la première est celle qui se situe tout en haut, et la dernière est le "fond de carte"
                    this._layersOrder.unshift(layers[l]);
                    // et on réordonne les couches avec des zindex, uniques.
                    this._lastZIndex++;
                    layers[l].layer.setZIndex(this._lastZIndex);
                }
            }
        }

        // on ajoute les div correspondantes aux différentes couches (dans l'ordre inverse d'affichage) dans le controle.
        for ( var j = 0; j < this._layersOrder.length; j++ ) {
            var layerOptions = this._layersOrder[j];
            elementLayersList.appendChild(this._createLayerDiv(layerOptions));
        }
    };

    /**
     * create layer div (to append to control DOM element).
     *
     * @param {Object} layerOptions - layer options (id, title, description, legends, metadata, quicklookUrl ...)
     * @private
     */
    LayerSwitcher.prototype._createLayerDiv = function (layerOptions) {
        var isLegends = layerOptions.legends && layerOptions.legends.length !== 0;
        var isMetadata = layerOptions.metadata && layerOptions.metadata.length !== 0;
        var isQuicklookUrl = layerOptions.quicklookUrl;
        // on n'affiche les informations que si elles sont renseignées (pour ne pas avoir un panneau vide)
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
     * @private
     */
    LayerSwitcher.prototype._onChangeLayerOpacity = function (e) {
        var divId    = e.target.id;
        var layerID  = divId.substring(divId.indexOf("_") + 3);  // ex GPvisibilityPicto_ID26
        var layer    = this._layers[layerID].layer;

        var opacityValue = e.target.value;
        var opacityId = document.getElementById("GPopacityValue_ID" + layerID);
        opacityId.innerHTML = opacityValue + "%";

        layer.setOpacity(opacityValue / 100);
    };

    /**
     * Update picto opacity value on layer opacity change
     *
     * @param {Object} e - event
     * @private
     */
    LayerSwitcher.prototype._updateLayerOpacity = function (e) {
        var opacity = e.target.getOpacity();
        if ( opacity > 1 ) {
            opacity = 1;
        }
        if ( opacity < 0 ) {
            opacity = 0;
        }
        var id = e.target.gpLayerId;
        var layerOpacityInput = document.getElementById("GPopacityValueDiv_ID" + id);
        layerOpacityInput.value = Math.round(opacity * 100);
        var layerOpacitySpan = document.getElementById("GPopacityValue_ID" + id);
        layerOpacitySpan.innerHTML = Math.round(opacity * 100) + "%";
    };

    /**
     * Change layer visibility on layer visibility picto click
     *
     * @param {Object} e - event
     * @private
     */
    LayerSwitcher.prototype._onVisibilityLayerClick = function (e) {
        var divId    = e.target.id;
        var layerID  = divId.substring(divId.indexOf("_") + 3);  // ex GPvisibilityPicto_ID26
        var layer    = this._layers[layerID].layer;

        layer.setVisible(e.target.checked);
    };

    /**
     * Change picto visibility on layer visibility change
     *
     * @param {Object} e - event
     * @private
     */
    LayerSwitcher.prototype._updateLayerVisibility = function (e) {
        var visible = e.target.getVisible();
        var id = e.target.gpLayerId;
        var layerVisibilityInput = document.getElementById("GPvisibility_ID" + id);
        layerVisibilityInput.checked = visible;
    };

    /**
     * Open layer information panel on picto click
     *
     * @param {Event} e - MouseEvent
     * @private
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
        var maxResolution = layerOptions.layer.getMaxResolution();
        if ( maxResolution === Infinity ) {
            obj._maxScaleDenominator = 560000000;
        } else {
            obj._maxScaleDenominator = Math.round(maxResolution / 0.00028);
        }
        var infoLayer = this._createContainerLayerInfoElement(obj);
        panel.appendChild(infoLayer);
    };

    /**
     * remove layer from layer switcher and map on picto click
     *
     * @param {Event} e - MouseEvent
     * @private
     */
    LayerSwitcher.prototype._onDropLayerClick = function (e) {
        var divId    = e.target.id;
        var layerID  = divId.substring(divId.indexOf("_") + 3);  // ex GPvisibilityPicto_ID26
        var layer    = this._layers[layerID].layer;

        // le retrait de la couche va déclencher l'ecouteur d'évenement,
        // et appeler this.removeLayer qui va supprimer la div.
        this.getMap().getLayers().remove(layer);
    };

    /**
     * change layers order on drag and drop
     *
     * @private
     */
    LayerSwitcher.prototype._onDragAndDropLayerClick = function () {
        // INFO : e.oldIndex et e.newIndex marchent en mode AMD mais pas Bundle.
        var map = this.getMap();

        // on récupère l'ordre des div dans le contrôle pour réordonner les couches (avec zindex)
        var matchesLayers = document.querySelectorAll("div.GPlayerSwitcher_layer");
        var maxZIndex = matchesLayers.length;
        for (var i = 0; i < matchesLayers.length; i++) {

            var tag = matchesLayers[i].id;
            var id  = tag.substring(tag.indexOf("_") + 3);
            var layer = this._layers[id].layer;

            if ( layer.setZIndex ) {
                maxZIndex--;
                layer.setZIndex(maxZIndex);
            }
        }

        // mise à jour de la visu
        map.updateSize();
    };

    /**
     * check layers range on map movement
     *
     * @param {ol.Map} map - ol map on which event occured
     * @private
     */
    LayerSwitcher.prototype._onMapMoveEnd = function (map) {

        // pour chaque couche de la map, on vérifie qu'elle soit toujours dans la visu (inRange)
        map.getLayers().forEach(
            function (layer) {
                var id = layer.gpLayerId;
                if ( this._layers[id] ) {
                    var layerOptions = this._layers[id];

                    // Check if layer is out of range.
                    var layerDiv;
                    if ( this.isInRange(layer, map) && !layerOptions.inRange ) {
                        layerOptions.inRange = true;
                        layerDiv = document.getElementById("GPlayerSwitcher_ID" + id);
                        layerDiv.classList.remove("outOfRange");
                    } else if ( !this.isInRange(layer, map) && layerOptions.inRange ) {
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
     * Returns Layer Container Id associated with given olLayer
     *
     * @param {ol.layer.Layer} olLayer - ol layer object
     * @returns {String} - div container Id ; null if layer not found.
     */
    LayerSwitcher.prototype.getLayerDOMId = function (olLayer) {

        var foundId = null ;

        this.getMap().getLayers().forEach( function (layer) {
            if (Utils.getOL3ObjectId(layer) == Utils.getOL3ObjectId(olLayer)) {
                foundId = layer.hasOwnProperty("gpLayerId") ? layer.gpLayerId : null ;
            }
        },
        this) ;

        // TODO : recuperer "GPlayerSwitcher_ID" depuis une constante
        return foundId !== null ? "GPlayerSwitcher_ID" + foundId : null ;
    };

    /**
     * Check if map view is out of layer range (in terms of extent and zoom)
     *
     * @method isInRange
     * @param {Object} layer - the ol.layer object
     * @param {Object} map   - the ol.Map object
     * @returns {Boolean} outOfRange - false if map view is out of layer range
     */
    LayerSwitcher.prototype.isInRange = function (layer, map) {
        if (!map) {
            return;
        }
        // check if map zoom is in layer zoom range
        var mapResolution = map.getView().getResolution();
        if ( mapResolution > layer.getMaxResolution() || mapResolution < layer.getMinResolution() ) {
            return false;
        }

        // check if map extent intersects layer extent (if defined)
        var mapExtent = map.getView().calculateExtent(map.getSize());
        var layerExtent = layer.getExtent();
        if ( layerExtent && !ol.extent.intersects(mapExtent, layerExtent) ) {
            return false;
        }

        return true;
    };

    /**
     * Get layer informations : title, description, quicklookurl, legends, metadata
     *
     * @method getLayerInfo
     * @param {Object} layer - the ol.layer object
     * @returns {Object} layerInfo - layer informations
     */
    LayerSwitcher.prototype.getLayerInfo = function (layer) {
        var layerInfo = {};
        if ( layer.getSource !== undefined ) {
            var src = layer.getSource();
            layerInfo._title = src._title || "";
            layerInfo._description = src._description || "";
            layerInfo._quicklookUrl = src._quicklookUrl || "";
            layerInfo._metadata = src._metadata || [];
            layerInfo._legends = src._legends || [];
        }
        return layerInfo;
    };

    return LayerSwitcher;
});
