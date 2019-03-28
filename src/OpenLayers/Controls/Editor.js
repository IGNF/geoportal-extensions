// import CSS
import "../CSS/Controls/Editor/GPeditorOpenLayers.css";
// import library
import EventBus from "eventbusjs";
// import local
import Utils from "../../Common/Utils";
import ID from "../../Common/Utils/SelectorID";
import Logger from "../../Common/Utils/LoggerByDefault";
import Style from "./Editor/Style";
import Themes from "./Editor/Themes";
import Filter from "./Editor/Filter";
import Legend from "./Editor/Legend";
import Layer from "./Editor/Layer";
import Group from "./Editor/Group";
// DOM
import EditorDOM from "../../Common/Controls/Editor/EditorDOM";

var logger = Logger.getLogger("editor");

/**
 * @classdesc
 *
 * Editor Styles MapBox...
 *
 * @constructor
 * @alias ol.style.Editor
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
 *          "editor:layer:onclickvisibility" : ...,
 *          "editor:layer:onclickclone" : ...,
 *          "editor:layer:onclickremove" : ...,
 *          "editor:style:oneditjson" : ...,
 *          "editor:style:scale:onchangemin" : ...,
 *          "editor:style:scale:onchangemax" : ...,
 *          "editor:filter:oneditjson" : ...,
 *          "editor:themes:onclickimage" : this._onClickEventImageTheme(),
 *          "editor:themes:onclicktitle" : function(e) {...}
 *      },
 *      tools : {
 *          themes : true, // afficher les themes (themes)
 *          layers : true, // afficher les couches (layers)
 *          style : true,  // afficher les styles (sous menu layers)
 *          filter : true, // afficher les filtres (sous menu layers)
 *          legend : true, // afficher les legendes (layers)
 *          group : true,  // grouper les couches (layers)
 *          title : true   // afficher les titres des rubriques,
 *          type : true,   // affichage du type de geometrie (layers)
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
        group : false,
        title : true,
        type : true
    };

    if (!this.options.tools) {
        logger.trace("Utilisation des outils MapBox par défaut (options.tools).");
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    this.layers = [];

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
    for (var j = 0; j < elements.length; j++) {
        var element = elements[j];
        var num = parseInt(element.id.substring(element.id.lastIndexOf("_") + 1), 10);
        if (num > _idx) {
            _idx = num;
        }
    }
    if (elements.length) {
        _idx += 1;
    }

    // container principal
    var div = document.createElement("div");
    div.id = this.name.containerID + _idx;
    div.className = this.name.container;

    // Themes
    if (this.options.tools.themes && this.options.themes) {
        // title
        if (this.options.tools.title) {
            var titleThemes = document.createElement("div");
            titleThemes.id = this.name.titleThemes;
            titleThemes.className = this.name.titleThemes;
            titleThemes.innerHTML = "Liste des 'thèmes'";
            div.appendChild(titleThemes);
        }

        // lien vers les styles
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
                if (this.options.tools.title) {
                    var titleLayers = document.createElement("div");
                    titleLayers.id = this.name.titleLayers;
                    titleLayers.className = this.name.titleLayers;
                    titleLayers.innerHTML = (multisources) ? "Liste des 'couches' (" + source + ")" : "Liste des 'couches'";
                    div.appendChild(titleLayers);
                }
            }

            // tri des layers
            var _layers = this.mapbox.layers.slice();
            _layers.sort(function (a, b) {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });

            logger.trace("Layers : ", _layers);

            // gestion des groupes avec la metadata de groupe
            var _groups = {}; // liste et comptage des layers dans les groupes
            _layers.forEach(function (layer) {
                var _title = layer.id;
                // separateur
                var _regex = /_|-|:|=/; // TODO à definir via une option !
                // index
                // y'a t il un separateur ?
                var _idx = _title.search(_regex);
                var _groupName = (_idx !== -1) ? _title.substring(0, _idx).trim() : _title;
                // on compte le nombre d'entrée dans un groupe
                _groups[_groupName] = (_groups[_groupName])
                    ? _groups[_groupName] + 1 : 1;
                // ajout de la metadata de groupe
                var _metadata = layer["metadata"];
                if (_metadata) {
                    _metadata["geoportail:group"] = _groupName;
                } else {
                    layer["metadata"] = {
                        "geoportail:group" : _groupName
                    };
                }
            });

            logger.trace("Groups : ", _groups);

            // container courant (cf. groupe) pour l'ajout des elements
            var target = div;

            // Ex. Layers, Styles, Groups et Filtres
            //  "id": "ocs - vegetation",
            //  "type": "fill",
            //  "source": "pyramide_proto",
            //  "source-layer": "ocs_vegetation_surf",
            //  "metadata" : {
            //      "geoportail:group": "ocs"
            //  },
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

            for (var ii = 0; ii < _layers.length; ii++) {
                var data = _layers[ii];

                // traitement dans l'ordre des sources
                if (data.source === source) {
                    // Groups
                    if (this.options.tools.group) {
                        var mtd = data.metadata;
                        // creation du container de groupe
                        // si le tag metadata existe
                        if (mtd) {
                            var grp = data.metadata["geoportail:group"];
                            if (grp) {
                                // le groupe doit contenir plus d'un element
                                if (_groups[grp] > 1) {
                                    // le groupe est déjà créé, on en veut plus par la suite...
                                    _groups[grp] = -1;
                                    // creation du groupe
                                    var oGroup = new Group({
                                        id : this.id,
                                        target : div,
                                        title : grp,
                                        collapse : true
                                    });
                                    oGroup.add();
                                    // le nouveau container pour les elements suivants
                                    target = oGroup.getContainer();
                                } else if (_groups[grp] === 1) {
                                    // l'element est seul, donc pas d'ajout dans le
                                    // groupe en cours
                                    target = div;
                                } else {
                                    // on ajoute l'element dans le groupe courrant...
                                }
                            } else {
                                target = div;
                            }
                        } else {
                            target = div;
                        }
                    }

                    // Layers
                    if (this.options.tools.layers) {
                        var oLayer = new Layer({
                            id : this.id,
                            target : target,
                            position : _idx + "_" + ii, // unique !
                            tools : {
                                visibility : true,
                                type : this.options.tools.type
                            },
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
                        // sauvegarde des layers
                        this.layers.push(oLayer);
                    }
                    // Legende
                    if (this.options.tools.legend) {
                        var oLegend = new Legend({
                            id : this.id,
                            target : target,
                            obj : {
                                "id" : data.id,
                                "source" : data.source,
                                "title" : data.id,
                                "editable" : data.editable || false,
                                "paint" : data.paint,
                                "layout" : data.layout
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
                            target : target,
                            position : _idx + "_" + ii, // unique !,
                            obj : {
                                "id" : data.id,
                                "source" : data.source,
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
                            target : target,
                            position : _idx + "_" + ii, // unique !,
                            obj : {
                                "id" : data.id,
                                "source" : data.source,
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
            var _target = document.createElement("div");
            _target.id = this.name.target;
            var node = document.getElementsByTagName("body")[0] ||
                document.getElementsByTagName("head")[0] ||
                document.documentElement;
            node.appendChild(_target);
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

/**
 * Get Style
 * @returns {Object} Style MapBox
 */
Editor.prototype.getStyle = function () {
    return this.mapbox;
};

/**
 * Get Layers
 * @returns {Array} Array of Object Layer
 * @see Editor/Layer
 */
Editor.prototype.getLayers = function () {
    return this.layers;
};
// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

export default Editor;

// Expose Editor as ol.editor.View (for a build bundle)
if (window.ol && window.ol.style) {
    window.ol.style.Editor = Editor;
}
