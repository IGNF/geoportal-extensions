import GlobeViewExtended from "../GlobeViewExtended";
import Logger from "../../Common/Utils/LoggerByDefault";
import Utils from "../../Common/Utils";
import SelectorID from "../../Common/Utils/SelectorID";
import LayerSwitcherDOM from "../../Common/Controls/LayerSwitcherDOM";
import Widget from "./Widget";

var logger = Logger.getLogger("LayerSwitcher");

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
    lsOptions = lsOptions || {};
    var options = lsOptions.options || {};
    var layers = lsOptions.layers || [];

    if (!(this instanceof LayerSwitcher)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    if (layers && !Array.isArray(layers)) {
        throw new Error("ERROR WRONG_TYPE : layers should be an array");
    }

    if (options && typeof options !== "object") {
        throw new Error("ERROR WRONG_TYPE : options should be an object");
    }

    this._initialize(options, layers);

    var container = this._initContainer(options);
    // property to save layers conf added after the LS is initialized
    this._addedLayerConf = {};
    var targetDiv = document.getElementById(options.target) || null;

    Widget.call(
        this, {
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

// retrieves methods of the common class LayerSwitcherDOM
Utils.assign(LayerSwitcher.prototype, LayerSwitcherDOM);

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
 *
 * @param {GlobeViewExtended} globe - the globe
 */
LayerSwitcher.prototype.setGlobe = function (globe) {
    var layers;
    if (globe) { // in the case the control is added to the globe
        var self = this;

        // add options layers to layerlist.
        // (only the layers configurated by the user in the options of the layerSwitcher )
        // the other layers of the map will be added in the setGlobe method
        for (var i = 0; i < this._initLayers.length; i++) {
            // retrieves the layer...
            var layer = null;

            if (this._initLayers[i].id) {
                layer = globe.getLayerById(this._initLayers[i].id);
            }

            if (layer && this._initLayers[i].displayed) {
                // .. and the infos of the configuration if they exist (title, description, legends, quicklook, metadata)
                var conf = this._initLayers[i].config || {};
                var layerOptions = {
                    title : conf.title || layer.title || this._initLayers[i].id,
                    description : conf.description || null,
                    legends : conf.legends || [],
                    metadata : conf.metadata || [],
                    quicklookUrl : conf.quicklookUrl || null
                };
                if (typeof conf.ipr !== "undefined") {
                    layerOptions.ipr = conf.ipr;
                }
                if (typeof conf.opacity !== "undefined") {
                    layerOptions.opacity = conf.opacity;
                }
                if (typeof conf.visibility !== "undefined") {
                    layerOptions.visibility = conf.visibility;
                }
                this._layers[layer.id] = layerOptions;
            }
        }

        // adds the layers
        this._addGlobeLayers(globe);

        // adding of listeners
        this._callbacks.onOpacityLayerCallBack = function (e) {
            self._updateLayerOpacity(e.target.id, e.new.opacity);
        };

        this._callbacks.onVisibilityLayerCallBack = function (e) {
            self._updateLayerVisibility(e.target.id, e.new.visible);
        };

        // At every globe movement, layer switcher may be updated,
        // according to layers on globe, and their range.
        this._callbacks.onChangedViewCallBack = function (e) {
            self._inRangeUpdate(e.colorLayersId);
        };
        globe.listen(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onChangedViewCallBack);
        // prerender events returns visible layers
        globe.preRenderEventFetchColorLayersDisplayed();

        this._callbacks.onAddedLayerCallBack = function (e) {
            var id = e.layerId;
            if (self) {
                if (!self._layerDisplayedInLayerSwitcher(id)) {
                    return;
                }
                var layer = self.getGlobe().getLayerById(id);
                if (layer.type === "elevation") {
                    return;
                }
                var layerConf = self._getLayerConf(id) || self._addedLayerConf[id];
                if (layerConf) {
                    self.addLayer(layer, layerConf);
                } else {
                    self.addLayer(layer);
                }
            }
        };
        globe.listen(GlobeViewExtended.EVENTS.LAYER_ADDED, this._callbacks.onAddedLayerCallBack);

        this._callbacks.onRemovedLayerCallBack = function (e) {
            var id = e.layerId;

            // update the index max and delete the layer from the layerswitcher
            if (self) {
                self.removeLayer(id);
            }
        };
        globe.listen(GlobeViewExtended.EVENTS.LAYER_REMOVED, this._callbacks.onRemovedLayerCallBack);

        this._callbacks.onIndexLayerCallBack = function (e) {
            var arraysEquals = function (a1, a2) {
                if (a1.length !== a2.length) {
                    return false;
                }
                for (var i = 0; i < a1.length; ++i) {
                    if (a1[i] !== a2[i]) {
                        return false;
                    }
                }
                return true;
            };

            if (!arraysEquals(e.new.sequence, e.previous.sequence)) {
                self._updateLayerListContainer();
            }
        };
        globe.listen(GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED, this._callbacks.onIndexLayerCallBack);

        layers = globe.getColorLayers();
        for (var ii = 0; ii < layers.length; ++ii) {
            globe.addLayerListener(layers[ii], GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, this._callbacks.onOpacityLayerCallBack);
            globe.addLayerListener(layers[ii], GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, this._callbacks.onVisibilityLayerCallBack);
            self._updateLayerVisibility(layers[ii].id, layers[ii].visible);
            self._updateLayerOpacity(layers[ii].id, layers[ii].opacity);
        }
    } else {
        // removes the listeners associated to the deleted layerswitcher
        this._globe.forget(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onChangedViewCallBack);
        this._globe.forget(GlobeViewExtended.EVENTS.LAYER_ADDED, this._callbacks.onAddedLayerCallBack);
        this._globe.forget(GlobeViewExtended.EVENTS.LAYER_REMOVED, this._callbacks.onRemovedLayerCallBack);
        this._globe.forget(GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED, this._callbacks.onIndexLayerCallBack);
        layers = this._globe.getColorLayers();
        for (var j = 0; j < layers.length; ++j) {
            this._globe.removeLayerListener(layers[j], GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, this._callbacks.onOpacityLayerCallBack);
            this._globe.removeLayerListener(layers[j], GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, this._callbacks.onVisibilityLayerCallBack);
        }
        // deletes the layerSwitcher DOM
        while (this._element.hasChildNodes()) {
            this._element.removeChild(this._element.lastChild);
        }
        this._element.parentNode.removeChild(this._element);
    }

    // calls original setGlobe method
    Widget.prototype.setGlobe.call(this, globe);
};

/**
 * Adds a new layer to control (when added to globe) or add new layer configuration
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

    if (!layer) {
        logger.error("LayerSwitcher:addLayer - missing layer parameter");
        return;
    }

    var id = layer.id;
    if (id === "undefined") {
        logger.error("LayerSwitcher:addLayer - configuration cannot be set for " + layer + " layer (layer id not found)");
        return;
    }

    // subscription to the events
    globe.addLayerListener(layer, GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, this._callbacks.onOpacityLayerCallBack);
    globe.addLayerListener(layer, GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, this._callbacks.onVisibilityLayerCallBack);

    // make sure layer is in globe layers
    var LayerInGlobe = globe.getLayerById(id);

    if (!LayerInGlobe) {
        logger.error("LayerSwitcher:addLayer - configuration cannot be set for ", layer, " layer (layer is not in globe layers )");
        return;
    }

    // if layer is not already in layers list, add it to control (layers list and container div)
    if (!this._layers[id]) {
        // 1. add layer to layers list
        var layerInfos = this._getLayerInfo(layer) || {};
        var layerOptions = {
            title : config.title || layerInfos._title || id,
            description : config.description || layerInfos._description || null,
            legends : config.legends || layerInfos._legends || [],
            metadata : config.metadata || layerInfos._metadata || [],
            quicklookUrl : config.quicklookUrl || layerInfos._quicklookUrl || null
        };
        if (typeof config.ipr !== "undefined") {
            layerOptions.ipr = config.ipr;
            layer.attribution = layerOptions.ipr;
        }
        if (typeof config.opacity !== "undefined") {
            layerOptions.opacity = config.opacity;
            layer.opacity = layerOptions.opacity;
        }
        if (typeof config.visibility !== "undefined") {
            layerOptions.visibility = config.visibility;
            layer.visible = layerOptions.visibility;
        }
        this._layers[id] = layerOptions;

        // creation of the div of the layer which will be added to the layerSwitcher
        this._layers[id].div = this._createLayerDiv(id);

        this._updateLayerListContainer();

        // user may also add a new configuration for an already added layer
    } else if (this._layers[id] && config) {
        // add new configuration parameters to layer informations
        for (var prop in config) {
            if (config.hasOwnProperty(prop)) {
                this._layers[id][prop] = config[prop];
            }
        }
        if (typeof config.ipr !== "undefined") {
            layer.attribution = config.ipr;
        }
        if (typeof config.opacity !== "undefined") {
            layer.opacity = config.opacity;
        }
        if (typeof config.visibility !== "undefined") {
            layer.visible = config.visibility;
        }
        // set new title in layer div
        if (config.title) {
            var nameDiv = document.getElementById(this._addUID("GPname_ID_" + id));
            if (nameDiv) {
                nameDiv.innerHTML = config.title;
                // FIXME a ajouter?
                // nameDiv.title = config.description || config.title;
            }
        }
        // add layer info picto if necessary
        var infodiv = document.getElementById(this._addUID("GPinfo_ID_" + id));
        if (!document.getElementById(this._addUID("GPinfo_ID_" + id)) && config.description && (config.legends || config.metadata || config.quicklookUrl)) {
            var advancedTools = document.getElementById(this._addUID("GPadvancedTools_ID_" + id));
            if (advancedTools) {
                advancedTools.appendChild(
                    this._createAdvancedToolInformationElement({
                        id : id
                    })
                );
            }
        }
        // close layer info element if open, to update information.
        if (infodiv && infodiv.className === "GPlayerInfoOpened") {
            document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
            infodiv.className = "GPlayerInfo";
        }
    }
};

/**
 * Removes a layer from control
 *
 * @param {Object} layerId - layer to remove to layer switcher
 */
LayerSwitcher.prototype.removeLayer = function (layerId) {
    var layerList = document.getElementById(this._addUID("GPlayersList"));
    // close layer info element if open.
    var infodiv = document.getElementById(this._addUID("GPinfo_ID_" + layerId));
    if (infodiv && infodiv.className === "GPlayerInfoOpened") {
        document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
        infodiv.className = "GPlayerInfo";
    }
    // remove layer div
    var layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + layerId));
    layerList.removeChild(layerDiv);

    // removes layer of the layer list
    delete this._layers[layerId];
};

/**
 * Collapse or display control main container
 *
 * @param {Boolean} collapsed - True to collapse control, False to display it
 */
LayerSwitcher.prototype.setCollapsed = function (collapsed) {
    if (collapsed === undefined) {
        logger.error("LayerSwitcher:setCollapsed - missing collapsed parameter");
        return;
    }
    var isCollapsed = this.getCollapsed();
    if ((collapsed && isCollapsed) || (!collapsed && !isCollapsed)) {
        return;
    }
    // simulates the panel opening after a click
    if (!isCollapsed) {
        var layers = document.getElementsByClassName("GPlayerInfoOpened");
        for (var i = 0; i < layers.length; i++) {
            layers[i].className = "GPlayerInfo";
        }
        document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
    }
    document.getElementById(this._addUID("GPshowLayersList")).checked = !collapsed;
};

/**
 * Returns true if widget is collapsed (minimize), false otherwise
 * @return {Boolean} is collapsed
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
    // id of the control ; used to suffix the CSS id (handles cases with severel controls on the same page)
    this._uid = SelectorID.generate();

    // {Object} control layers list. Each key is a layer id, and its value is an object of layers options (layer, id, opacity, visibility, title, description...)
    this._layers = {};

    // div which will contain the divs of the lists
    this._layerListContainer = null;

    // callbacks
    this._callbacks = {};

    // options
    this._options = options;
    this._initLayers = layers;
};

/**
 * Returns the layer configuration defined at widget initialization
 *
 * @method _getLayerConf
 * @param {String} layerId - layer id
 * @return {Object} layerConfig - layer configuration
 * @private
 */
LayerSwitcher.prototype._getLayerConf = function (layerId) {
    for (var i = 0; i < this._initLayers.length; ++i) {
        if (this._initLayers[i].id === layerId) {
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
LayerSwitcher.prototype._layerDisplayedInLayerSwitcher = function (layerId) {
    for (var i = 0; i < this._initLayers.length; ++i) {
        if (this._initLayers[i].id === layerId) {
            return (typeof this._initLayers[i].displayed === "undefined" || this._initLayers[i].displayed);
        }
    }
    return true;
};

/**
 * Creates control main container
 *
 * @method _initContainer
 * @param {Object} options - control options
 * @returns {DOMElement} container - widget container
 * @private
 */
LayerSwitcher.prototype._initContainer = function (options) {
    // creation of the main container
    var container = this._createMainContainerElement();

    // adding in the main container
    var input = this._createMainLayersShowElement();
    container.appendChild(input);

    // handling of the "collapsed" mode
    if (!options.collapsed) {
        input.checked = "checked";
    }
    // adds the layer list in the main container
    var divL = this._layerListContainer = this._createMainLayersElement();
    container.appendChild(divL);

    // creates the draggable mode
    this._createDraggableElement(divL, this);

    // adds the control picto in the main container
    var picto = this._createMainPictoElement();
    container.appendChild(picto);

    // adds the info panel in the main container
    var divI = this._createMainInfoElement();
    container.appendChild(divI);

    return container;
};

/**
 * Adds control layers to control main container
 *
 * @method _addGlobeLayers
 * @param {Object} globe - the Itowns.GlobeViewExtended object
 * @private
 */
LayerSwitcher.prototype._addGlobeLayers = function (globe) {
    // Retrieves the element which contains the different layers
    var elementLayersList;
    var childNodes = this.getElement().childNodes;

    for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === this._addUID("GPlayersList")) {
            elementLayersList = childNodes[i];
            break;
        }
    }
    // reorders layers according to the layer stack (globe.getLayers returns an reverse ordenered array)
    var layers = globe.getColorLayers();
    var orderedLayers = layers.sort(function (a, b) {
        return b.sequence - a.sequence;
    });

    // loop over all the layers of the map in order to add them to the control layer list (if they are not already added)
    orderedLayers.forEach(
        function (layer) {
            // adds the map layers to the list
            var id;
            id = layer.id;
            if (!this._layerDisplayedInLayerSwitcher(id)) {
                return;
            }
            var layerConf = this._getLayerConf(id) || this._addedLayerConf[id] || {};
            var layerInfos = this._getLayerInfo(layer) || {};
            if (!this._layers[id]) {
                // if the layer is not yet in the layer list (this._layers), we add it
                var layerOptions = {
                    title : layerConf.title || layerInfos._title || id,
                    description : layerConf.description || layerInfos._description || null,
                    legends : layerConf.legends || layerInfos._legends || [],
                    metadata : layerConf.metadata || layerInfos._metadata || [],
                    quicklookUrl : layerConf.quicklookUrl || layerInfos._quicklookUrl || null
                };
                this._layers[id] = layerOptions;
            } else {
                var lsLayerConf = this._layers[id];
                if (typeof lsLayerConf.ipr !== "undefined") {
                    layer.options.attribution = lsLayerConf.ipr;
                }
                if (typeof lsLayerConf.opacity !== "undefined") {
                    layer.opacity = lsLayerConf.opacity;
                }
                if (typeof lsLayerConf.visibility !== "undefined") {
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
 * creates layer div (to append to control DOM element).
 *
 * @method _createLayerDiv
 * @param {String} layerId - layer id
 * @returns {DOMElement} layer div
 * @private
 */
LayerSwitcher.prototype._createLayerDiv = function (layerId) {
    var layerOptions = this._layers[layerId];
    var isLegends = layerOptions.legends && layerOptions.legends.length !== 0;
    var isMetadata = layerOptions.metadata && layerOptions.metadata.length !== 0;
    var isQuicklookUrl = layerOptions.quicklookUrl;
    if (isLegends || isMetadata || isQuicklookUrl) {
        layerOptions.displayInformationElement = true;
    }

    // adds a specific div in the control for the layer
    layerOptions.id = layerId;
    var layerDiv = this._createContainerLayerElement(layerOptions);

    if (!layerOptions.inRange) {
        layerDiv.classList.add("outOfRange");
    }

    return layerDiv;
};

// ################################################################### //
// ######################### DOM events ############################## //
// ################################################################### //

/**
 * Changes layer opacity on layer opacity picto click
 *
 * @method _onChangeLayerOpacity
 * @param {Object} e - HTML event
 * @private
 */
LayerSwitcher.prototype._onChangeLayerOpacity = function (e) {
    var globe = this.getGlobe();
    var layerID = this._resolveLayerId(e.target.id);

    var opacityValue = e.target.value;
    var opacityId = document.getElementById(this._addUID("GPopacityValue_ID_" + layerID));
    opacityId.innerHTML = opacityValue + "%";
    globe.setLayerOpacity(layerID, opacityValue / 100);
};

/**
 * Updates picto opacity value on layer opacity change
 *
 * @method _updateLayerOpacity
 * @param {String} layerId - layer id
 * @param {Number} opacity - opacity value
 * @private
 */
LayerSwitcher.prototype._updateLayerOpacity = function (layerId, opacity) {
    if (opacity > 1) {
        opacity = 1;
    }
    if (opacity < 0) {
        opacity = 0;
    }

    var layerOpacityInput = document.getElementById(this._addUID("GPopacityValueDiv_ID_" + layerId));
    if (layerOpacityInput) {
        layerOpacityInput.value = Math.round(opacity * 100);
    }

    var layerOpacitySpan = document.getElementById(this._addUID("GPopacityValue_ID_" + layerId));
    if (layerOpacitySpan) {
        layerOpacitySpan.innerHTML = Math.round(opacity * 100) + "%";
    }
};

/**
 * Changes layer visibility on layer visibility picto click
 *
 * @method _onVisibilityLayerClick
 * @param {Object} e - HTML event
 * @private
 */
LayerSwitcher.prototype._onVisibilityLayerClick = function (e) {
    var globe = this.getGlobe();

    var layerID = this._resolveLayerId(e.target.id);
    globe.setLayerVisibility(layerID, e.target.checked); // update viewer
};

/**
 * Changes picto visibility on layer visibility change
 *
 * @method _updateLayerVisibility
 * @param {String} layerId - layer id
 * @param {Boolean} visibility - visible if true
 * @private
 */
LayerSwitcher.prototype._updateLayerVisibility = function (layerId, visibility) {
    var layerVisibilityInput = document.getElementById(this._addUID("GPvisibility_ID_" + layerId));
    if (layerVisibilityInput) {
        layerVisibilityInput.checked = visibility;
    }
};

/**
 * Opens layer information panel on picto click
 *
 * @method _onOpenLayerInfoClick
 * @param {Event} e - MouseEvent
 * @private
 */
LayerSwitcher.prototype._onOpenLayerInfoClick = function (e) {
    var layerID = this._resolveLayerId(e.target.id);

    var layerOptions = this._layers[layerID];

    var panel;
    var info;

    // Close layer info panel
    var divId = document.getElementById(e.target.id);
    if (divId.className === "GPlayerInfoOpened") {
        if (divId.classList !== undefined) {
            divId.classList.remove("GPlayerInfoOpened");
            divId.classList.add("GPlayerInfo");
        }

        panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
        if (panel.classList !== undefined) {
            panel.classList.remove("GPpanel");
            panel.classList.remove("GPlayerInfoPanelOpened");
            panel.classList.add("GPlayerInfoPanelClosed");
        }

        info = document.getElementById(this._addUID("GPlayerInfoContent"));
        panel.removeChild(info);
        return;
    }

    var layers = document.getElementsByClassName("GPlayerInfoOpened");
    for (var i = 0; i < layers.length; i++) {
        layers[i].className = "GPlayerInfo";
    }

    // Open layer info panel
    if (divId.classList !== undefined) {
        divId.classList.remove("GPlayerInfo");
        divId.classList.add("GPlayerInfoOpened");
    }

    panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
    if (panel.classList !== undefined) {
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
 * removes layer from layer switcher and globe on picto click
 *
 * @method _onDropLayerClick
 * @param {Event} e - MouseEvent
 * @private
 */
LayerSwitcher.prototype._onDropLayerClick = function (e) {
    var globe = this.getGlobe();

    var layerID = this._resolveLayerId(e.target.id);
    // removing the layer will trigger the event listener
    // which will call this.removeLayer and delete the div
    globe.removeLayer(layerID);

    this._updateLayerListContainer();
};

/**
 * changes layers order on drag and drop
 *
 * @method _onDropLayerClick
 * @param {Event} e - HTML event
 * @private
 */
LayerSwitcher.prototype._onDragAndDropLayerClick = function (e) {
    var globe = this.getGlobe();

    // Handling of the indexes : gives the little indexes (lowest layers) to the non-visible layers (displayed: false)
    // when the index of a visible layer changes.
    // Always moves the non-visible layers under the other layers (to not hide them)

    if (e.newIndex - e.oldIndex === 0) {
        return;
    }

    var targetIndex = null;
    if (!e.newIndex || e.newIndex === 0) {
        targetIndex = globe.getColorLayers().length - 1;
    } else {
        var layerTargetID = this._resolveLayerId(e.from.childNodes[e.newIndex + (e.newIndex - e.oldIndex < 0 ? 1 : -1)].id);
        targetIndex = globe.getLayerById(layerTargetID).sequence;
    }

    var layerID = this._resolveLayerId(e.item.id);

    globe.moveLayerToIndex(layerID, targetIndex);
};

/**
 * Checks layers range
 *
 * @method _inRangeUpdate
 * @param {Array} layersDisplayed - list of displayed layers id
 * @private
 */
LayerSwitcher.prototype._inRangeUpdate = function (layersDisplayed) {
    for (var layerKey in this._layers) {
        var layer = this._layers[layerKey];
        if (!layer) {
            continue;
        }
        // Check if layer is displayed.
        var layerDiv;
        var bInRange = layersDisplayed.indexOf(layer.id) >= 0;
        if (bInRange && !layer.inRange) {
            layer.inRange = true;
            layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + layer.id));
            layerDiv.classList.remove("outOfRange");
        } else if (!bInRange && layer.inRange) {
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
    if (this._layerListContainer) {
        var globe = this.getGlobe();

        // empty the previous container
        while (this._layerListContainer.firstChild) {
            this._layerListContainer.removeChild(this._layerListContainer.firstChild);
        }
        // reorders layers according to the layer stack (globe.getLayers returns an reverse ordenered array)..
        var layers = globe.getColorLayers();
        var orderedLayers = layers.sort(function (a, b) {
            return b.sequence - a.sequence;
        });
        // ... and adds the correct div to the different layers, in the zindex decreasing order
        for (var j = 0; j < orderedLayers.length; j++) {
            if (!this._layers[orderedLayers[j].id]) {
                continue;
            }
            // retrieves the div of the layer, stored in the _layers array
            var layerDiv = this._layers[orderedLayers[j].id].div;
            this._layerListContainer.appendChild(layerDiv);
        }
    } else {
        logger.error("[Itowns.control.LayerSwitcher] _updateLayerListContainer : layer list container not found to update layers order ?!");
    }
};

// ################################################################### //
// ############################ Utils ################################ //
// ################################################################### //

/**
 * Gets layer informations : title, description, quicklookurl, legends, metadata
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
 * Gets layer id from div id
 *
 * @method _resolveLayerId
 * @param {String} divId - HTML div id
 * @returns {String} layer id
 * @private
 */
LayerSwitcher.prototype._resolveLayerId = function (divId) {
    var divName = SelectorID.name(divId); // ex GPvisibilityPicto_ID_26
    return divName.substring(divName.indexOf("_ID_") + 4); // ex. 26
};

export default LayerSwitcher;
