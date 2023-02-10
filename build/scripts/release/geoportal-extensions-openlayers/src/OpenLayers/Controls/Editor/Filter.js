import EventBus from "eventbusjs";
import EventEditor from "./Event";
import Utils from "../../../Common/Utils";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-filter");

/**
 * @classdesc
 *
 * MapBox filter management
 *
 * @constructor
 * @alias ol.style.editor.Filter
 * @param {Object} options - options for function call.
 * @example
 *   var filter = new Filter ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          edition : false
 *      },
 *      title : "Filtres (JSON)",
 *      obj : {
 *          filter : []
 *      }
 *   });
 *  filter.add();
 *  filter.display(true);
 *  filter.getContainer();
 */
function Filter (options) {
    logger.trace("[constructor] Filter", options);

    // options
    this.options = options || {
        // default...
        target : null,
        position : 0,
        tools : null,
        title : null,
        obj : null
    };

    if (!(this instanceof Filter)) {
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
Filter.prototype.constructor = Filter;

/**
 * Initialize component
 * (called by constructor)
 *
 * @private
 */
Filter.prototype._initialize = function () {
    // unique editor id (optional!)
    this.id = this.options.id || null;

    if (!this.options.target) {
        // cf. add()
    }

    if (!this.options.position) {
        this.options.position = 0;
    }

    var _toolsDefault = {
        edition : false
    };

    if (!this.options.tools) {
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition futur...
        this.options.obj = {
            filter : []
        };
    }

    if (!this.options.title) {
        this.options.title = "JSON Filtres :";
    }
    this.container = null;

    // DOM : className or id
    this.name = {
        target : "GPEditorMapBoxFilterTarget",
        container : "GPEditorMapBoxFilterContainer",
        containerjson : "GPEditorMapBoxFilterJsonContainer",
        jsonlabel : "GPEditorMapBoxFilterTitleJson",
        jsondisplay : "GPEditorMapBoxFilterDisplayJson",
        containertoolsedit : "GPEditorMapBoxFilterToolsEditionContainer"
    };
};

/**
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @private
 * @example
 * <div class="GPEditorMapBoxFilterContainer">
 *  <div class ="GPEditorMapBoxFilterJsonontainer">
 *     <label class="GPEditorMapBoxFilterTitleJson">JSON Filtres :</label>
 *     <pre class="GPEditorMapBoxFilterDisplayJson">...</pre>
 *  </div>
 *  <div class ="GPEditorMapBoxStyleToolsEditionContainer"></div>
 * </div>
 */
Filter.prototype._initContainer = function () {
    // contexte
    var self = this;

    var _found = false;
    var _filter = JSON.parse(JSON.stringify(this.options.obj)); // on manipule une copie  !

    // FIXME tag filter est obselete !
    // on doit utiliser les expressions dans "paint" ou "layout" !
    if (_filter.filter) {
        _found = true;
        if (_filter.filter.length === 0) {
            logger.info("tag 'filter' is empty !");
        }
    }

    var div = document.createElement("div");
    div.className = this.name.container;

    var json = null;
    if (_found) {
        json = JSON.stringify(_filter.filter, null, 4);
    }

    var divJson = document.createElement("div");
    divJson.className = this.name.containerjson;

    var labelJson = document.createElement("label");
    labelJson.className = this.name.jsonlabel;
    labelJson.innerHTML = this.options.title;
    divJson.appendChild(labelJson);

    var preJson = document.createElement("pre");
    preJson.className = this.name.jsondisplay;
    preJson.innerHTML = json;
    if (preJson.addEventListener) {
        preJson.addEventListener("click", function (e) {
            if (self.options.tools.edition) {
                self.onEditJsonFilterMapBox(e);
            }
        });
    } else if (preJson.attachEvent) {
        preJson.attachEvent("onclick", function (e) {
            if (self.options.tools.edition) {
                self.onEditJsonFilterMapBox(e);
            }
        });
    }
    divJson.appendChild(preJson);
    div.appendChild(divJson);

    if (this.options.tools.edition) {
        var divEdit = document.createElement("div");
        divEdit.className = this.name.containertoolsedit;
        div.appendChild(divEdit);
    }

    // main container
    this.container = div;
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Add element into target DOM
 * @returns {Object} - Legend instance
 */
Filter.prototype.add = function () {
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
    return this;
};

/**
 * Set display container or get
 *
 * @param {Boolean} display - show/hidden container or get status
 * @returns {Boolean} - true/false
 */
Filter.prototype.display = function (display) {
    logger.trace("display()", display);
    if (typeof display !== "undefined") {
        this.container.style.display = (display) ? "flex" : "none";
    }
    return (this.container.style.display === "flex");
};

/**
 * Get container (DOM)
 *
 * @returns {DOMElement} DOM element
 */
Filter.prototype.getContainer = function () {
    return this.container;
};
// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

/**
 * this method is called by event '' on '' tag form...
 *
 * 'e' contains the option object into 'e.target.data' !
 * 'e' contains the id editor into 'e.target.editorID' !
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Filter#editor:style:oneditjson
 */
Filter.prototype.onEditJsonFilterMapBox = function (e) {
    logger.trace("onEditJsonFilterMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.filter.oneditjson, e);
};

export default Filter;
