define([
    "Common/Utils",
    "Common/Utils/SelectorID",
    "Common/Controls/AttributionDOM",
    "Itowns/Controls/Widget"
], function (
    Utils,
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
     * @param {Boolean} [aOptions.options.collapsed = false] - Specify if the control has to be opened or not.
     * @example
     * var attribution = new itowns.control.Attritbution({
     *  options : {
     *      collapsed: true
     *  }
     * ));
     */
    function Attribution (aOptions) {

        aOptions = aOptions || {};
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
                target : aOptions.target
            }
        );
    }

    /*
     * @lends module:Attribution
     */
    Attribution.prototype = Object.create(Widget.prototype, {});

    // on récupère les méthodes de la classe commune AttributionDOM
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
     * Bind globe to control
     */
    Attribution.prototype.setGlobe = function (globe) {
        // info : cette méthode est appelée (entre autres?) après un globe.addWidget() ou globe.removeWidget()

        if ( globe ) { // dans le cas de l'ajout du contrôle au globe
            var self = this;

            // Ajout des listeners

            // At every globe movement, attributions may be updated,
            // according to layers on globe, and their visibility.
            /**
            * ajout du callback onChangedViewCallBack
            */
            this._callbacks.onChangedViewCallBack = function (e) {
                clearTimeout(this._inRangeTimer);
                this._inRangeTimer = setTimeout( function () {
                    if (e.type === "prerender") {
                        self._inRangeUpdate(e.layers.id, e.extent);
                    }
                }, 100);
            };

            globe.addEventListener("prerender", this._callbacks.onChangedViewCallBack);
            globe.preRenderEventFetchViewExtent(true);
            globe.preRenderEventFetchLayersDisplayed(true);
        }

        // call original setGlobe method
        Widget.prototype.setGlobe.call(this, globe);
    };

    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    Attribution.prototype.setCollapsed = function (collapsed) {
        if ( collapsed === undefined ) {
            console.log("[ERROR] Attribution:setCollapsed - missing collapsed parameter");
            return;
        }
        var isCollapsed = this.getCollapsed();
        if ( ( collapsed && isCollapsed) || ( !collapsed && !isCollapsed ) ) {
            return;
        }

        document.getElementById(this._addUID("GPshowAttributionsList")).checked = !collapsed;
    };

    /**
     * Returns true if widget is collapsed (minimize), false otherwise
     *
     * @return {Boolean} collapsed
     */
    Attribution.prototype.getCollapsed = function () {
        return !document.getElementById(this._addUID("GPshowAttributionsList")).checked;
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

        var container = this._createMainContainerElement();

        // ajout dans le container principal du selecteur d'affichage des layers
        var inputShow = this._createMainAttributionsShowElement();
        container.appendChild(inputShow);

        // gestion du mode "collapsed"
        if (!options.collapsed) {
            inputShow.checked = "checked";
        }

        // ajout dans le container principal de la liste des layers
        var divA = this._attributionListContainer = this._createMainAttributionsListContainer();
        var ulA = this._createAttributionsList();
        divA.appendChild(ulA);
        container.appendChild(divA);

        // ajout dans le container principal du picto du controle
        var picto = this._createMainPictoElement(options.collapsed);
        container.appendChild(picto);

        return container;
    };

    /**
     * Checks layers range
     *
     * @method _inRangeUpdate
     * @param {Array} layersDisplayed - Id of the layers diplayed on screen
     * @param {Object} extent - The globe view extent
     * @private
     */

    Attribution.prototype._inRangeUpdate = function (layersDisplayed, extent) {
        var globe = this.getGlobe();
        var elementAttributionList = document.getElementById(this._addUID("GPAttributionsListContainer"));

        var scaleDenominator = 1 / globe.getScale();

        var attributions = new Map();

        for (var h = 0; h < layersDisplayed.length; h++) {

            var layer = globe.getLayerById(layersDisplayed[h]);

            if (!layer.visible) {
                continue;
            }

            var ori = layer.options.originators;

            if (ori) {
                for (var j = 0; j < ori.length; j++) {
                    if (attributions.has(ori[j].name)) {
                        continue;
                    };

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
                            attributions.set(ori[j].name, ori[j]);
                        }
                        // si l'attribut 'bbox' n'est pas renseigné
                    } else if (!ori[j].constraints[0].bbox) {
                        attributions.set(ori[j].name, ori[j]);
                    }
                }
            }
        }
        this._updateAttributionListContainer(attributions);
    };

    // ################################################################### //
    // ######################### DOM events ############################## //
    // ################################################################### //

    /**
     * Update the layer list container
     *
     * @method _updateAttributionListContainer
     * @private
     */
    Attribution.prototype._updateAttributionListContainer = function (attributions) {
        var element = document.getElementById(this._addUID("GPAttributionsList"));
        document.getElementById(this._addUID("GPAttributionsList")).parentNode.removeChild(element);

        var ul = this._createAttributionsList();
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
        this._attributionListContainer.appendChild(ul);
    };

    return Attribution;
});
