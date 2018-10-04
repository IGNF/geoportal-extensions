import Utils from "../../Common/Utils";
import Logger from "../../Common/Utils/LoggerByDefault";
import Style from "./Editor/Style";
import Themes from "./Editor/Themes";
import Filter from "./Editor/Filter";
import Layer from "./Editor/Layer";
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
 *      style : "",
 *      tools : {
 *          themes : true,
 *          style : true,
 *          filter : true
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
        // cf. add()
    }

    if (!this.options.style) {
        logger.error("Le style MapBox n'est pas renseigné (options.style) !");
        return;
    }

    var _toolsDefault = {
        themes : true,
        style : true,
        filter : true
    };

    if (!this.options.tools) {
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    this.container = null;
    this.name = {
        target : "GPEditorMapBoxTarget",
        container : "GPEditorMapBoxContainer"
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
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @private
 */
Editor.prototype._initContainer = function () {
    logger.trace(this.mapbox);

    var div = document.createElement("div");
    div.className = this.name.container;

    // TODO Themes
    if (this.options.tools.themes) {
        var themes = new Themes({
            target : div,
            obj : null
        });
        themes.add();
    }

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

        // Layers
        var oLayer = new Layer({
            target : div,
            position : i,
            obj : data
        });
        oLayer.add();

        // Style
        if (this.options.tools.style) {
            var oStyle = new Style({
                target : div,
                position : i,
                obj : data
            });
            oStyle.add();
            oStyle.display(false);
            oLayer.addStyle(oStyle);
            // update visibility layer
            if (data.layout && data.layout.visibility && data.layout.visibility === "none") {
                oLayer.visibility(false);
            }
        }
        // Filter
        if (this.options.tools.filter) {
            var oFilter = new Filter({
                target : div,
                position : i,
                obj : data
            });
            oFilter.add();
            oFilter.display(false);
            oLayer.addFilter(oFilter);
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
 * Get Editor
 */
Editor.prototype.getEditor = function () {};

// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

export default Editor;
