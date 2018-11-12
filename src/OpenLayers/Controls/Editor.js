import EventBus from "eventbus";
import Utils from "../../Common/Utils";
import ID from "../../Common/Utils/SelectorID";
import Logger from "../../Common/Utils/LoggerByDefault";
import Style from "./Editor/Style";
import Themes from "./Editor/Themes";
import Filter from "./Editor/Filter";
import Legend from "./Editor/Legend";
import Layer from "./Editor/Layer";
import Group from "./Editor/Group";
import EditorDOM from "../../Common/Controls/Editor/EditorDOM";

var logger = Logger.getLogger("editor");

/**
 * @classdesc
 *
 * Editor MapBox
 *
 * @constructor
 * @param {Object} options - options for function call.
 * @example
 *   var editor = new Editor ({
 *      target : "",
 *      style : "data/styles/layer0.json",
 *      themes: [{
 *          image: "data/images/layer0.png",
 *          label: "standard0",
 *          style: "data/styles/layer0.json",
 *      },{
 *          image: "data/images/layer1.png",
 *          label: "standard1",
 *          style: "data/styles/layer1.json",
 *      }],
 *      scope : this,
 *      events : {
 *          "editor:layer:visibility" : ...,
 *          "editor:layer:clone" : ...,
 *          "editor:layer:remove" : ...,
 *          "editor:style:edit" : ...,
 *          "editor:style:minScale" : ...,
 *          "editor:style:maxScale" : ...,
 *          "editor:filter:edit" : ...,
 *          "editor:themes:image" : this._onClickEventImageTheme(),
 *          "editor:themes:title" : function(e) {...}
 *      },
 *      tools : {
 *          themes : true,
 *          layers : true,
 *          style : true,
 *          filter : true,
 *          legend : true,
 *          group : true
 *      }
 *   });
 */
function Editor (options) {
    logger.trace("[constructor] Editor", options);

    // options
    this.options = options || {
        // TODO default...
    };

    if (!(this instanceof Editor)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    // id unique
    this.id = ID.generate();

    this._initialize();
};

// on récupère les méthodes de la classe DOM
Utils.assign(Editor.prototype, EditorDOM);

/**
 * Constructor (alias)
 *
 * @private
 */
Editor.prototype.constructor = Editor;

/**
 * Initialize component
 * (called by constructor)
 *
 * @private
 */
Editor.prototype._initialize = function () {
    var self = this;

    if (!this.options.target) {
        logger.trace("La 'target' n'est pas renseignée (options.target).");
    }

    if (!this.options.style) {
        logger.error("Le 'style' MapBox n'est pas renseigné (options.style) !");
        return;
    }

    if (this.options.events) {
        this._initEvents();
    } else {
        logger.warn("Les 'handlers' ne sont pas renseignés (options.events) !");
    }

    if (!this.options.themes) {
        logger.trace("Les 'themes' MapBox ne sont pas renseignés (options.themes).");
    }

    var _toolsDefault = {
        themes : false,
        layers : true,
        style : false,
        filter : false,
        legend : false,
        group : false
    };

    if (!this.options.tools) {
        logger.trace("Utilisation des outils MapBox par défaut (options.tools).");
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    this.container = null;

    this.name = {
        target : "GPEditorMapBoxTarget",
        container : "GPEditorMapBoxContainer",
        containerID : "GPEditorMapBoxContainer_ID_",
        titleLayers : "GPEditorMapBoxLayersTitle",
        titleThemes : "GPEditorMapBoxThemesTitle",
        sep : "GPEditorMapBoxSep"
    };

    this.mapbox = {};

    // objet json
    if (typeof this.options.style === "object") {
        this.mapbox = this.options.style;
        this._initContainer();
    }

    // url
    if (typeof this.options.style === "string") {
        fetch(this.options.style)
            .then(
                function (response) {
                    response.json().then(
                        function (style) {
                            // sauvegarde du json
                            self.mapbox = style;
                        });
                }
            )
            .then(
                function () {
                    // init du DOM
                    self._initContainer();
                }
            )
            .catch(
                function (error) {
                    logger.error(error);
                }
            );
    }
};

/**
* Initialize events with handlers
* (called by constructor)
*
* List Events :
*          "editor:layer:visibility"
*          "editor:layer:clone"
*          "editor:layer:remove"
*          "editor:style:edit"
*          "editor:style:minScale"
*          "editor:style:maxScale"
*          "editor:filter:edit"
*          "editor:themes:image",
*          "editor:themes:title"
* @private
*/
Editor.prototype._initEvents = function () {
    var ctx = this.options.scope || this;
    var events = this.options.events;
    if (events) {
        for (var event in events) {
            if (events.hasOwnProperty(event)) {
                var handler = events[event];
                // test sur les events disponibles !
                if (handler) {
                    if (!EventBus.hasEventListener(event, handler, ctx)) {
                        EventBus.addEventListener(event, handler, ctx);
                    }
                }
            }
        }
    }
};

/**
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @example
 *  <div class="GPEditorMapBoxContainer" id="GPEditorMapBoxContainer_ID_0">
 *      <div class="GPEditorMapBoxLayerContainer">
 *          <div id="GPEditorMapBoxLayerTitleContainer-0_1" class="GPEditorMapBoxLayerTitleContainer">
 *              <label class="GPEditorMapBoxLayerImageLabel"></label>
 *              <input id="GPEditorMapBoxLayerTitleInput-0_1" class="GPEditorMapBoxLayerTitleInput" type="checkbox">
 *              <label class="GPEditorMapBoxLayerTitleLabel" for="GPEditorMapBoxLayerTitleInput-0_1" title="states">population_lt_2m</label>
 *          </div>
 *      </div>
 *      <div class="GPEditorMapBoxLayerContainer">...</div>
 *      <div class="GPEditorMapBoxLayerContainer">...</div>
 *  </div>
 * @private
 */
Editor.prototype._initContainer = function () {
    logger.trace(this.mapbox);

    // existance d'un autre container (editeur) ?
    var _idx = 0;
    var elements = document.querySelectorAll("div[id^=" + this.name.containerID + "]");
    if (elements) {
        _idx = elements.length;
    }

    var div = document.createElement("div");
    div.id = this.name.containerID + _idx;
    div.className = this.name.container;

    // Themes
    if (this.options.tools.themes && this.options.themes) {
        // title
        var titleThemes = document.createElement("div");
        titleThemes.id = this.name.titleThemes;
        titleThemes.className = this.name.titleThemes;
        titleThemes.innerHTML = "Liste des 'thèmes'";
        div.appendChild(titleThemes);

        // styles
        var themes = new Themes({
            id : this.id,
            target : div,
            obj : this.options.themes
        });
        themes.add();
    }

    for (var source in this.mapbox.sources) {
        if (this.mapbox.sources.hasOwnProperty(source)) {
            if (this.options.tools.layers) {
                // multisources ? Si oui, on renseigne un titre...
                var multisources = (Object.keys(this.mapbox.sources).length > 1) ? 1 : 0;
                if (multisources) {
                    var hr = document.createElement("hr");
                    hr.className = this.name.sep;
                    div.appendChild(hr);
                }
                // title
                var titleLayers = document.createElement("div");
                titleLayers.id = this.name.titleLayers;
                titleLayers.className = this.name.titleLayers;
                titleLayers.innerHTML = (multisources) ? "Liste des 'couches' (" + source + ")" : "Liste des 'couches'";
                div.appendChild(titleLayers);
            }

            // tri des layers pour la gestion des groupes
            this.mapbox.layers.sort(function (a, b) {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });

            // Ex. Layers, Styles et Filtres
            //  "id": "ocs - vegetation",
            //  "type": "fill",
            //  "source": "pyramide_proto",
            //  "source-layer": "ocs_vegetation_surf"
            //  "layout": {
            //    "visibility": "visible"
            //  },
            //  "filter": ["in","symbo",
            //      "SURFACE_D_EAU",
            //      "BASSIN",
            //      "ZONE_MARINE"
            //  ],
            //  "paint": {
            //    "fill-color": "#2BB3E1"
            //  }
            for (var i = 0; i < this.mapbox.layers.length; i++) {
                var data = this.mapbox.layers[i];

                // traitement dans l'ordre des sources
                if (data.source === source) {
                    // Layers
                    if (this.options.tools.layers) {
                        var oLayer = new Layer({
                            id : this.id,
                            target : div,
                            position : _idx + "_" + i, // unique !
                            obj : {
                                "id" : data.id,
                                "type" : data.type,
                                "source" : data.source,
                                "source-layer" : data["source-layer"]
                            }
                        });
                        oLayer.add();
                        // update visibility layer
                        if (data.layout && data.layout.visibility && data.layout.visibility === "none") {
                            oLayer.visibility(false);
                        }
                    }
                    // Legende
                    if (this.options.tools.legend) {
                        var oLegend = new Legend({
                            id : this.id,
                            target : div,
                            obj : {
                                "title" : data.id,
                                "paint" : data.paint
                            }
                        });
                        oLegend.add();
                        oLegend.display(false);
                        if (oLayer) {
                            oLayer.addLegend(oLegend);
                            oLayer.slotLegend(); // integration de la legende dans le container du layers !
                        }
                    }
                    // Style
                    if (this.options.tools.style) {
                        var oStyle = new Style({
                            id : this.id,
                            target : div,
                            position : _idx + "_" + i, // unique !,
                            obj : {
                                "layout" : data.layout,
                                "paint" : data.paint
                            }
                        });
                        oStyle.add();
                        oStyle.display(false);
                        if (oLayer) {
                            oLayer.addStyle(oStyle);
                        }
                        // update visibility layer
                        if (data.layout && data.layout.visibility && data.layout.visibility === "none") {
                            oLayer.visibility(false);
                        }
                    }
                    // Filter
                    if (this.options.tools.filter) {
                        var oFilter = new Filter({
                            id : this.id,
                            target : div,
                            position : _idx + "_" + i, // unique !,
                            obj : {
                                "filter" : data.Filter
                            }
                        });
                        oFilter.add();
                        oFilter.display(false);
                        if (oLayer) {
                            oLayer.addFilter(oFilter);
                        }
                    }
                }
            }
        }
    }

    // sauvegarde
    this.container = div;

    // container principal
    if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
            var target = document.createElement("div");
            target.id = this.name.target;
            var node = document.getElementsByTagName("body")[0] ||
                document.getElementsByTagName("head")[0] ||
                document.documentElement;
            node.appendChild(target);
        }
        this.options.target = document.getElementById(this.name.target);
    }
    if (this.container) {
        this.options.target.appendChild(this.container);
    }
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Set display container (DOM)
 *
 * @param {Boolean} display - show/hidden container
 */
Editor.prototype.display = function (display) {
    this.container.style.display = (display) ? "block" : "none";
};

/**
 * Get id editor
 * @returns {Number} id
 */
Editor.prototype.getID = function () {
    return this.id;
};

/**
 * Get container (DOM)
 * @returns {DOMElement} DOM element
 */
Editor.prototype.getContainer = function () {
    return this.container;
};
// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

export default Editor;
