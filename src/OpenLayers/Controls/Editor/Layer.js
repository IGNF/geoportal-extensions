import EventBus from "eventbus";
import EventEditor from "./Event";
import Style from "./Style";
import Filter from "./Filter";
import Utils from "../../../Common/Utils";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-layer");

/**
 * @classdesc
 *
 * MapBox filter management
 *
 * @constructor
 * @param {Object} options - options for function call.
 * @example
 *   var layers = new Layer ({
 *      target : ...,
 *      position : 1,
 *      tools : {
 *          visibility : true,
 *          remove : false,
 *          clone : false
 *      },
 *      obj : {
 *          id: "ocs - vegetation",
 *          type: "fill",
 *          source: "pyramide_proto",
 *          source-layer: "ocs_vegetation_surf"
 *      }
 *   });
 */
function Layer (options) {
    logger.trace("[constructor] Layer", options);

    // options
    this.options = options || {};

    if (!(this instanceof Layer)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    this._initialize();

    this._initContainer();
};

/**
 * Constructor (alias)
 *
 * @private
 */
Layer.prototype.constructor = Layer;

/**
 * Initialize component
 * (called by constructor)
 *
 * @private
 */
Layer.prototype._initialize = function () {
    if (!this.options.target) {
        // cf. add()
    }

    if (!this.options.position) {
        this.options.position = 0;
    }

    var _toolsDefault = {
        visibility : true,
        remove : false,
        clone : false
    };

    if (!this.options.tools) {
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    var _objDefault = {
        "id" : "",
        "type" : "", // TODO : icone sur le type de geometrie
        "source" : "",
        "source-layer" : ""
    };

    if (!this.options.obj) {
        this.options.obj = _objDefault;
    }

    Utils.mergeParams(this.options.obj, _objDefault, false);

    // obj
    this.oFilter = null;
    this.oStyle = null;

    // dom
    this.container = null;
    this.DomVisibility = null;
    this.DomToggle = null;

    // DOM : className or id
    this.name = {
        target : "GPEditorMapBoxLayerTarget",
        container : "GPEditorMapBoxLayerContainer",
        containertitle : "GPEditorMapBoxLayerTitleContainer",
        imagelabel : "GPEditorMapBoxLayerImageLabel",
        titleinput : "GPEditorMapBoxLayerTitleInput",
        titlelabel : "GPEditorMapBoxLayerTitleLabel",
        containertools : "GPEditorMapBoxToolsContainer",
        visibilityinput : "GPEditorMapBoxToolsVisibilityInput",
        visibilitylabel : "GPEditorMapBoxToolsVisibilityLabel"
    };
};

/**
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @private
 * @example
 * // >> Titre 1          |OOO| <- menu tools : visibility, clone, remove
 * // >> Titre 2          |OXX| <- affichage configurable (cf. options.tools)
 * // Event : clic sur le titre -> ex. affiche le menu des styles / filtres
 * //       : clic visibility, clone, remove
 * // DOM :
 *      <div class="GPEditorMapBoxLayerContainer">
 *          <div id="GPEditorMapBoxLayerTitleContainer-45" class="GPEditorMapBoxLayerTitleContainer">
 *              <label class="GPEditorMapBoxLayerimageLabel"></label>
 *              <input id="GPEditorMapBoxLayerTitleInput-45" class="GPEditorMapBoxLayerTitleInput" type="checkbox">
 *              <label class="GPEditorMapBoxLayerTitleLabel" for="GPEditorMapBoxLayerTitleInput-45" title="...">...</label>
 *          </div>
 *          <div id="GPEditorMapBoxToolsContainer-45" class="GPEditorMapBoxToolsContainer">
 *              <input id="GPEditorMapBoxToolsVisibilityInput-45" type="checkbox" class="GPEditorMapBoxToolsVisibilityInput">
 *              <label for="GPEditorMapBoxToolsVisibilityInput-45" id="GPEditorMapBoxToolsVisibilityLabel-45" class="GPEditorMapBoxToolsVisibilityLabel" title="Afficher/masquer la couche"></label>
 *          </div>
 *      </div>
 */
Layer.prototype._initContainer = function () {
    // contexte
    var self = this;

    var obj = this.options.obj;

    var div = document.createElement("div");
    div.className = this.name.container;

    // title
    var divTitle = document.createElement("div");
    divTitle.id = this.name.containertitle + "-" + this.options.position;
    divTitle.className = this.name.containertitle;

    // puce
    var labelImage = document.createElement("label");
    labelImage.className = this.name.imagelabel;
    divTitle.appendChild(labelImage);

    // input
    var inputTitle = document.createElement("input");
    inputTitle.id = this.name.titleinput + "-" + this.options.position;
    inputTitle.className = this.name.titleinput;
    inputTitle.type = "checkbox";
    divTitle.appendChild(inputTitle);

    // label for
    var labelTitle = document.createElement("label");
    labelTitle.className = this.name.titlelabel;
    labelTitle.htmlFor = inputTitle.id;
    labelTitle.innerHTML = obj["id"] || obj["source-layer"] || obj["source"];
    labelTitle.title = obj["source-layer"] || obj["source"];
    labelTitle.data = obj;
    if (labelTitle.addEventListener) {
        labelTitle.addEventListener("click", function (e) {
            self.onClickLayerMapBox(e);
        });
    } else if (labelTitle.attachEvent) {
        labelTitle.attachEvent("onclick", function (e) {
            self.onClickLayerMapBox(e);
        });
    }
    divTitle.appendChild(labelTitle);
    // enregistrement utile pour la méthode : toggle()
    this.DomToggle = labelTitle;

    div.appendChild(divTitle);

    // tools :
    // visibility, remove, clone
    var divTools = document.createElement("div");
    divTools.id = this.name.containertools + "-" + this.options.position;
    divTools.className = this.name.containertools;

    // visibility
    if (this.options.tools.visibility) {
        var inputTools = document.createElement("input");
        inputTools.id = this.name.visibilityinput + "-" + this.options.position;
        inputTools.className = this.name.visibilityinput;
        inputTools.type = "checkbox";
        inputTools.checked = "checked"; // par défaut, à modifier via visibility(true|false) !
        inputTools.data = obj;
        // event for visibility change
        if (inputTools.addEventListener) {
            inputTools.addEventListener("click", function (e) {
                self.onVisibilityLayerMapBox(e);
            });
        } else if (inputTools.attachEvent) {
            // internet explorer
            inputTools.attachEvent("onclick", function (e) {
                self.onVisibilityLayerMapBox(e);
            });
        }
        divTools.appendChild(inputTools);
        // enregistrement utile pour la méthode : visibility()
        this.DomVisibility = inputTools;

        var labelTools = document.createElement("label");
        labelTools.htmlFor = this.name.visibilityinput + "-" + this.options.position;
        labelTools.id = this.name.visibilitylabel + "-" + this.options.position;
        labelTools.className = this.name.visibilitylabel;
        labelTools.title = "Afficher/masquer la couche";
        divTools.appendChild(labelTools);

        div.appendChild(divTools);
    }

    // clone
    if (this.options.tools.clone) {
        // TODO...
        logger.warn("Dom for tools clone, it's not yet implemented !");
    }

    // remove
    if (this.options.tools.remove) {
        // TODO...
        logger.warn("Dom for tools remove, it's not yet implemented !");
    }

    // main container
    this.container = div;
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Add element into target DOM
 */
Layer.prototype.add = function () {
    logger.trace("add()");
    if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
            var div = document.createElement("div");
            div.id = this.name.target;
            var node = document.documentElement ||
            document.getElementsByTagName("body")[0] ||
            document.getElementsByTagName("head")[0];
            node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
    }
    if (this.container) {
        this.options.target.appendChild(this.container);
    }
};

/**
 * Set style
 *
 * @param {Object} style - style object
 */
Layer.prototype.addStyle = function (style) {
    logger.trace("addStyle()", style);
    if (style && typeof style === "object" && style instanceof Style) {
        this.oStyle = style;
        this.oStyle.display(false); // par defaut !
    }
};

/**
 * Set filter
 *
 * @param {Object} filter - filter object
 */
Layer.prototype.addFilter = function (filter) {
    logger.trace("addFilter()", filter);
    if (filter && typeof filter === "object" && filter instanceof Filter) {
        this.oFilter = filter;
        this.oFilter.display(false); // par defaut !
    }
};

/**
 * Set visibility
 *
 * @param {Boolean} display - set visibility
 */
Layer.prototype.visibility = function (display) {
    logger.trace("visibility()", display);
    this.DomVisibility.checked = (display) ? "checked" : "";
};

/**
* Set toggle a panel
*/
Layer.prototype.toggle = function () {
    logger.trace("toggle()");
    this.DomToggle.click();
};

/**
 * Set display container (DOM)
 *
 * @param {Boolean} display - show/hidden container
 */
Layer.prototype.display = function (display) {
    logger.trace("display()", display);
    this.container.style.display = (display) ? "flex" : "none";
    var checked = document.getElementById(this.DomToggle.htmlFor).checked;
    if (this.oStyle) {
        this.oStyle.display(display && checked);
    }
    if (this.oFilter) {
        this.oFilter.display(display && checked);
    }
};

// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

/**
 * this method is called by event '' on '' tag form
 *
 * @param {Object} e - HTMLElement
 * @private
 */
Layer.prototype.onClickLayerMapBox = function (e) {
    logger.trace("onClickLayerMapBox", e);
    // ouverture du panneau des styles / filtres
    var checked = document.getElementById(e.target.htmlFor).checked;
    if (this.oStyle) {
        this.oStyle.display(!checked);
    }
    if (this.oFilter) {
        this.oFilter.display(!checked);
    }
};

/**
 * this method is called by event '' on '' tag form
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Layer#editor:layer:visibility
 */
Layer.prototype.onVisibilityLayerMapBox = function (e) {
    logger.trace("onVisibilityLayerMapBox", e);
    EventBus.dispatch(EventEditor.layer.visibility, e);
};

/**
 * this method is called by event '' on '' tag form
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Layer#editor:layer:clone
 */
Layer.prototype.onCloneLayerMapBox = function (e) {
    logger.trace("onCloneLayerMapBox", e);
    EventBus.dispatch(EventEditor.layer.clone, e);
};

/**
 * this method is called by event '' on '' tag form
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Layer#editor:layer:remove
 */
Layer.prototype.onRemoveLayerMapBox = function (e) {
    logger.trace("onRemoveLayerMapBox", e);
    EventBus.dispatch(EventEditor.layer.remove, e);
};

export default Layer;
