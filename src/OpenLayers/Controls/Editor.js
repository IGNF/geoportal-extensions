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
import Event from "./Editor/Event";
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
 *      style : "data/styles/layer.json",
 *      themes: {
 *          themesSummary : "",
 *          themes : [{
 *             "thumbnail": "data/images/layer0.png",
 *             "name": "standard0",
 *             "url": "data/styles/layer0.json",
 *             "description": "",
 *             "selected" : true
 *          },{
 *             "thumbnail": "data/images/layer1.png",
 *             "name": "standard1",
 *             "url": "data/styles/layer1.json",
 *             "description": ""
 *          }]
 *      },
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
 *          // afficher/cacher les themes (par defaut) ou utiliser les options
 *          themes : true | false | {
 *              target : "...",
 *              tools : {
 *                  "thumbnails": true,
 *                  "button": { visible : true, type : "checkbox" }
 *              },
 *          },
 *          layers : true | false,     // afficher les couches (layers)
 *          style : true | false,      // afficher les styles (sous menu layers)
 *          filter : true | false,     // afficher les filtres (sous menu layers)
 *          legend : true | false,     // afficher les legendes (layers)
 *          group : true | false,      // grouper les couches (layers)
 *          sort : true | false,       // trier les couches (layers)
 *          title : true | false       // afficher les titres des rubriques,
 *          type : true | false,       // afficher le type de geometrie (layers)
 *          pin : true | false,        // afficher la puce pour chaque couche (layers)
 *          visibility : true | false, // afficher l'icone de visibilité (layers),
 *          icon : {                   // afficher l'icone "oeil" ou "checkbox" (layers),
 *              "image" : true,
 *              "anchor" : "start" // afficher l'icone au debut ou à la fin de la ligne
 *          },
 *          editable : true | false    // active l'edition de la legende (legendes)
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
        logger.info("La 'target' n'est pas renseignée (options.target).");
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
        logger.info("Les 'themes' MapBox ne sont pas renseignés (options.themes).");
    }

    var _toolsDefault = {
        themes : false,
        layers : true,
        style : false,
        filter : false,
        legend : false,
        group : false,
        sort : true,
        title : true,
        type : true,
        pin : true,
        visibility : true,
        icon : {
            image : true,
            anchor : "end"
        },
        editable : true
    };

    if (!this.options.tools) {
        logger.trace("Utilisation des outils MapBox par défaut (options.tools).");
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    // id unique
    this.id = this.options.id || ID.generate();

    this.layers = [];

    this.container = null;

    this.name = {
        target : "GPEditorMapBoxTarget",
        container : "GPEditorMapBoxContainer",
        containerID : "GPEditorMapBoxContainer_ID_",
        containerLayers : "GPEditorMapBoxLayersContainer",
        titleLayers : "GPEditorMapBoxLayersTitle",
        titleLayersID : "GPEditorMapBoxLayersTitle_ID_",
        titleThemes : "GPEditorMapBoxThemesTitle",
        titleThemesID : "GPEditorMapBoxThemesTitle_ID_",
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
            .then(response => {
                // sauvegarde du json
                response.json()
                    .then(style => {
                        self.mapbox = style;
                        return self.mapbox;
                    })
                    .then(function () {
                        // init du DOM
                        self._initContainer();
                    })
                    .catch(error => {
                        logger.error("json exception :", error);
                    });
            })
            .catch(error => {
                logger.error("fetch exception :", error);
            });
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
 *    <div id="GPEditorMapBoxThemesTitle" class="GPEditorMapBoxThemesTitle">Liste des 'thèmes'</div>
 *    <div class="GPEditorMapBoxThemesContainer">
 *      ...
 *    </div>
 *    <div id="GPEditorMapBoxLayersTitle" class="GPEditorMapBoxLayersTitle">Liste des 'couches'</div>
 *    <div class="GPEditorMapBoxLayersContainer">
 *      <div class="GPEditorMapBoxLayerContainer">
 *          <div id="GPEditorMapBoxLayerTitleContainer-0_1" class="GPEditorMapBoxLayerTitleContainer">
 *              <label class="GPEditorMapBoxLayerImageLabel"></label>
 *              <input id="GPEditorMapBoxLayerTitleInput-0_1" class="GPEditorMapBoxLayerTitleInput" type="checkbox">
 *              <label class="GPEditorMapBoxLayerTitleLabel" for="GPEditorMapBoxLayerTitleInput-0_1" title="states">population_lt_2m</label>
 *          </div>
 *      </div>
 *      <div class="GPEditorMapBoxLayerContainer">...</div>
 *      <div class="GPEditorMapBoxLayerContainer">...</div>
 *    </div>
 *  </div>
 * @private
 */
Editor.prototype._initContainer = function () {
    logger.trace(this.mapbox);

    // existance d'un autre container (editeur) ?
    // var _idx = 0;
    // var elements = document.querySelectorAll("div[id^=" + this.name.containerID + "]");
    // for (var j = 0; j < elements.length; j++) {
    //     var element = elements[j];
    //     var num = parseInt(element.id.substring(element.id.lastIndexOf("_") + 1), 10);
    //     if (num > _idx) {
    //         _idx = num;
    //     }
    // }
    // if (elements.length) {
    //     _idx += 1;
    // }

    // container principal de l'editeur
    var div = document.createElement("div");
    div.id = this.name.containerID + this.id;
    div.className = this.name.container;

    // Themes
    var _toolsThemes = this.options.tools.themes;
    if (_toolsThemes && this.options.themes) {
        // title
        if (this.options.tools.title) {
            var titleThemes = document.createElement("div");
            titleThemes.id = this.name.titleThemesID + this.id;
            titleThemes.className = this.name.titleThemes;
            titleThemes.innerHTML = "Liste des 'thèmes'";
            div.appendChild(titleThemes);
        }

        // lien vers les styles
        var themes = new Themes({
            id : this.id,
            target : div,
            tools : (typeof _toolsThemes === "object") ? _toolsThemes : {},
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
                    titleLayers.id = this.name.titleLayersID + this.id;
                    titleLayers.className = this.name.titleLayers;
                    titleLayers.innerHTML = (multisources) ? "Liste des 'couches' (" + source + ")" : "Liste des 'couches'";
                    div.appendChild(titleLayers);
                }
            }

            // clone
            var _layers = this.mapbox.layers.slice();
            // gestion de l'ordre avant tri avec la metadata 'order'
            // une fois les layers triés, la metadata:geoportail:order permet
            // de savoir l'emplacement du layers dans le fichier de style.
            _layers.forEach(function (layer, order) {
                // on écarte les layers sans source: ex. "background"
                // if (!layer.source) {
                //     return;
                // }
                // ajout de la metadata d'ordre
                var _metadata = layer["metadata"];
                if (_metadata) {
                    _metadata["geoportail:order"] = order;
                } else {
                    layer["metadata"] = {
                        "geoportail:order" : order
                    };
                }
            });
            // tri des layers
            if (this.options.tools.sort) {
                _layers.sort(function (a, b) {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                    return 0;
                });
            }

            logger.trace("Layers : ", _layers);

            // gestion des groupes avec la metadata de groupe
            var _groups = {}; // liste et comptage des layers dans les groupes
            _layers.forEach(function (layer) {
                // on écarte les layers sans source: ex. "background"
                // if (!layer.source) {
                //     return;
                // }
                // balise metadata
                var _metadata = layer["metadata"];
                // s'il existe déjà une meta de groupe, on l'utilise...
                // sinon, on la met en place.
                if (_metadata && _metadata["geoportail:group"]) {
                    var _groupName = _metadata["geoportail:group"];
                    _groups[_groupName] = (_groups[_groupName])
                        ? _groups[_groupName] + 1 : 1;
                } else {
                    var _title = layer.id;
                    // separateur
                    var _regex = /_|-|:|=/; // TODO à definir via une option !
                    // index
                    // y'a t il un separateur ?
                    var _idx = _title.search(_regex);
                    var _newGroupName = (_idx !== -1) ? _title.substring(0, _idx).trim() : _title;
                    // on compte le nombre d'entrée dans un groupe
                    _groups[_newGroupName] = (_groups[_newGroupName])
                        ? _groups[_newGroupName] + 1 : 1;

                    // ajout de la metadata de groupe
                    if (_metadata) {
                        _metadata["geoportail:group"] = _newGroupName;
                    } else {
                        layer["metadata"] = {
                            "geoportail:group" : _newGroupName
                        };
                    }
                }
            });

            logger.trace("Groups : ", _groups);

            // container principal des couches
            var divLayers = document.createElement("div");
            divLayers.className = this.name.containerLayers;
            div.appendChild(divLayers);

            // container courant (cf. groupe) pour l'ajout des elements
            var target = divLayers;

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
            var index = -1;
            for (var ii = 0; ii < _layers.length; ii++) {
                var data = _layers[ii];
                index++;

                // traitement dans l'ordre des sources
                if (data.source === source) {
                    // FIXME la gestion des groupes est à revoir...
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
                                        target : divLayers,
                                        title : grp,
                                        collapse : true
                                    });
                                    oGroup.add();
                                    // le nouveau container pour les elements suivants
                                    target = oGroup.getContainer();
                                } else if (_groups[grp] === 1) {
                                    // l'element est seul, donc pas d'ajout dans le
                                    // groupe en cours
                                    target = divLayers;
                                } else {
                                    // on ajoute l'element dans le groupe courant...
                                }
                            } else {
                                target = divLayers;
                            }
                        } else {
                            target = divLayers;
                        }
                    }
                    // Layers
                    if (this.options.tools.layers) {
                        var oLayer = new Layer({
                            id : this.id,
                            target : target,
                            position : index + "_" + this.id, // unique !
                            tools : {
                                visibility : this.options.tools.visibility,
                                icon : this.options.tools.icon,
                                type : this.options.tools.type,
                                pin : this.options.tools.pin
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
                        // gestion de l'edition de la legende :
                        // l'option "editable" est prioritaire sur le tag "editable" du fichier de style !
                        var isEditable = this.options.tools.editable;
                        if (typeof isEditable === "undefined") {
                            isEditable = data.editable;
                        }
                        var oLegend = new Legend({
                            id : this.id,
                            target : target,
                            obj : {
                                "id" : data.id,
                                "source" : data.source,
                                "title" : data.id,
                                "editable" : (typeof isEditable !== "undefined") ? isEditable : false,
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
                            position : index + "_" + this.id, // unique !,
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
                            position : index + "_" + this.id, // unique !,
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
                } else {
                    // on ecarte un layer car il n'est pas reconnu dans la source
                    // on decremente la position du layer
                    if (index >= 0) {
                        index--;
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
    // dispatch event
    EventBus.dispatch(Event.onloaded, this);
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
 * Get Style (json)
 * @returns {Object} Style MapBox
 */
Editor.prototype.getStyle = function () {
    return this.mapbox;
};

/**
 * Get layer style (json)
 * @param {Number} i - index
 * @returns {Object} Style MapBox of a layers
 */
Editor.prototype.getStyleLayer = function (i) {
    var layer = null;
    var o = this.getLayer(i);
    var id = o.options.obj.id;
    for (var k = 0; k < this.mapbox.layers.length; k++) {
        var l = this.mapbox.layers[k];
        if (l.id === id) {
            layer = l;
            break;
        }
    }
    return layer;
};

/**
 * Get layer object from json style
 * @param {Number} i - index into style json
 * @returns {Object} Style MapBox of a layers
 */
Editor.prototype.getLayerFromStyle = function (i) {
    var layer = null;
    var l = this.mapbox.layers[i];
    for (var k = 0; k < this.getLayers().length; k++) {
        var o = this.getLayer(k);
        if (l.id === o.options.obj.id) {
            layer = o;
            break;
        }
    }
    return layer;
};

/**
 * Get a list of layer object sorted or not (see options.tools.sort)
 * @returns {Array} - List of layer object
 * @see {ol.style.editor.Layer}
 */
Editor.prototype.getLayers = function () {
    return this.layers;
};

/**
 * Get the layer object from a list sorted or not (see options.tools.sort)
 * @param {Number} i - index
 * @returns {Object} - layer object
 * @see {ol.style.editor.Layer}
 */
Editor.prototype.getLayer = function (i) {
    return this.layers[i];
};
// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

export default Editor;

// Expose Editor as ol.editor.View (for a build bundle)
if (window.ol && window.ol.style) {
    window.ol.style.Editor = Editor;
}
