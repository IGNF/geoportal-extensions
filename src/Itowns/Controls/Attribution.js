define([
    "Common/Utils",
    "Common/Utils/LayerUtils",
    "Common/Utils/SelectorID",
    "Common/Controls/AttributionDOM",
    "Itowns/Controls/Widget"
], function (
    Utils,
    LayerUtils,
    SelectorID,
    AttributionDOM,
    Widget
) {
    "use strict";

    /**
     * @classdesc
     * Control to manage layers attributions
     *
     * @constructor
     * @extends {itowns.control.Widget}
     * @alias itowns.control.Attribution
     * @param {Object} aOptions - control options
     * @param {Object} [aOptions.options] - Itowns.control.Control options
     * @param {Boolean} [aOptions.options.id] - Target HTML element container or its id. Default is chosen by map implementation.
     * @param {Boolean} [aOptions.options.maximised = true] - Specify if the control has to be opened or not.
     * @example
     * var attribution = new itowns.control.Attritbution({
     *  options : {
     *      id : footer,
     *      maximised: true
     *  }
     * ));
     */
    function Attribution (aOptions) {

        aOptions   = aOptions || {};
        var options = aOptions.options || {};

        if (!(this instanceof Attribution)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        if ( options && typeof options !== "object" ) {
            throw new Error("ERROR WRONG_TYPE : options should be an object");
        }

        this._initialize(options);

        var container = this._initContainer(options);

        Widget.call(
            this,
            {
                name : "Attribution",
                element : container,
                target : aOptions.div
            }
        );
    }

    /*
     * @lends module:LayerSwitcher
     */
    Attribution.prototype = Object.create(Widget.prototype, {});

    // on récupère les méthodes de la classe commune LayerSwitcherDOM
    Utils.assign(AttributionDOM, Attribution.prototype);

    /**
     * Constructor (alias)
     *
     * @private
     */
    Attribution.prototype.constructor = Attribution;

    // ################################################################### //
    // ############## public methods (getters, setters) ################## //
    // ################################################################### //

    /**
     * Bind map to control
     */
    Attribution.prototype.setMap = function (globe) {

        // info : cette méthode est appelée (entre autres?) après un map.addWidget() ou map.removeWidget()

        if ( globe ) { // dans le cas de l'ajout du contrôle à la map
            var self = this;
            // globe.fetchExtent(true);

            // on ajoute les couches
            this._addAttributions();

            // Ajout des listeners

            // At every globe movement, attributions may be updated,
            // according to layers on globe, and their visibility.
            /**
            * ajout du callback onChangedViewCallBack
            */
            this._callbacks.onChangedViewCallBack = function (e) {
                clearTimeout(this._inRangeTimer);
                this._inRangeTimer = setTimeout( function () {
                    if (e.type === "PRERENDER") {
                        self._inRangeUpdate(e.layers.id, e.extent);
                    }
                }, 100);
            };

            globe.addEventListener("PRERENDER", this._callbacks.onChangedViewCallBack);
            globe.fetchExtent(true);
            globe.fetchVisibleLayers(true);
        }

        // call original setMap method
        Widget.prototype.setMap.call(this, globe);
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize Attribution control (called by constructor)
     *
     * @param {Object} options - Itowns.control.Control options
     * @private
     */
    Attribution.prototype._initialize = function (options) {
        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // div qui contiendra les div des listes.
        this._AttributionContainer = null;

        // callbacks
        this._callbacks = {};

        // options
        this._options = options;
    };

    /**
     * Create control main container
     *
     * @method _initContainer
     * @param {Object} options - control options
     * @private
     */
    Attribution.prototype._initContainer = function (options) {
        // creation du container principal
        if (options.maximised) {
            var container = this._createMainContainerElement();

            // ajout dans le container principal de la liste des layers
            var divA = this._attributionListContainer = this._createMainAttributionElement();
            container.appendChild(divA);

            return container;
        }
    };

    /**
     * Add control attribution to control main container
     *
     * @method _addAttributions
     * @private
     */
    Attribution.prototype._addAttributions = function () {
        // Récupération de l'élément contenant les différentes couches.
        var elementAttributionList;
        var childNodes = this.getElement().childNodes;

        for ( var i = 0; i < childNodes.length; i ++ ) {
            if ( childNodes[i].id === this._addUID("GPAttributionsList") ) {
                elementAttributionList = childNodes[i];
                break;
            }
        }

        return elementAttributionList;
    };

    /**
     * Checks layers range
     *
     * @method _inRangeUpdate
     * @param {Array} layersDisplayed - Id of the layers diplayed on screen
     * @param {Object} extent - Extents of the attributions
     * @private
     */

    Attribution.prototype._inRangeUpdate = function (layersDisplayed, extent) {

        var globe = this.getMap();
        var elementAttributionList = this._addAttributions();

        var scaleDenominator = 1 / globe.controls.getScale();

        var attributions = new Map();
        var layers = globe.getLayers(function (layer) {
            if (layer.type === "color" || layer.type === "elevation") {
                return layer;
            }
        });
        for (var h = 0; h < layers.length; h++) {
            if (layers[h].visible == false) {
                continue;
            }
            if (layers[h].type === "color" || layers[h].type === "elevation") {
                if (layers[h].options.originators) {
                    var ori = layers[h].options.originators;
                    for (var i = 0; i < layersDisplayed.length; i++) {
                        for (var j = 0; j < ori.length; j++) {
                            if (attributions.has(layers[h].options.originators[j].name)) {
                                continue;
                            };
                            if (layers[h].id === layersDisplayed[i]) {
                                // si l'attribut minScaleDenominator existe
                                if (ori[j].constraints[0].minScaleDenominator) {
                                    // on vérifie qu'on se situe bien entre minScaleDenominator et maxScaleDenominator
                                    if (!(ori[j].constraints[0].minScaleDenominator < scaleDenominator && scaleDenominator < ori[j].constraints[0].maxScaleDenominator)) {
                                        continue;
                                    }
                                }
                                // on vérifie si l'attribut 'bbox' existe bien
                                if (ori[j].constraints[0].bbox) {
                                    // on vérifie que l'on se trouve bien dans les limites de la bbox
                                    if (ori[j].constraints[0].bbox.left < extent.west() && ori[j].constraints[0].bbox.right > extent.east() && ori[j].constraints[0].bbox.top > extent.north() && ori[j].constraints[0].bbox.bottom < extent.south()) {
                                        // on ajoute l'attribution dans la Map() 'attributions'
                                        attributions.set(layers[h].options.originators[j].name, layers[h].options.originators[j]);
                                    }
                                    // si l'attribut 'bbox' n'est pas renseigné
                                } else if (!ori[j].constraints[0].bbox) {
                                    attributions.set(layers[h].options.originators[j].name, layers[h].options.originators[j]);
                                }
                            }
                        }
                    }
                }
            }
        }
        this._updateAttributionListContainer(elementAttributionList, attributions);
    };

    // ################################################################### //
    // ######################### DOM events ############################## //
    // ################################################################### //

    /**
     * Update the layer list container
     *
     * @method _updateLayerListContainer
     * @private
     */
    Attribution.prototype._updateAttributionListContainer = function (elementAttributionList, attributions) {
        if ( this._attributionListContainer ) {
            if (document.getElementById("listAttribution")) {
                var element = document.getElementById("listAttribution");
                document.getElementById("listAttribution").parentNode.removeChild(element);
            }
            var ul = document.createElement("ul");
            ul.id = "listAttribution";
            attributions.forEach(function (a) {
                var li = document.createElement("li");
                var link = document.createElement("a");
                link.href = a.url;
                link.innerHTML = a.name + "&nbsp";
                link.target = "_blank";
                li.id = a.name.replace(/\s/g,"");
                li.appendChild(link);
                ul.appendChild(li);
            });
            elementAttributionList.appendChild(ul);
        } else {
            console.log("[Itowns.control.Attribution] _updateAttributionListContainer : attributions list container not found to update layers order ?!");
        }
    };

    // ################################################################### //
    // ############################ Utils ################################ //
    // ################################################################### //

    return Attribution;
});
