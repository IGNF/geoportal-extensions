import EventBus from "eventbusjs";
import EventEditor from "./Event";
import Utils from "../../../Common/Utils";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-search");

/**
 * @classdesc
 *
 * MapBox search management
 *
 * @constructor
 * @alias ol.style.editor.Search
 * @param {Object} options - options for function call.
 * @example
 *   var Search = new Search ({
 *      target : ...,
 *      tools : {
 *          // ...
 *      }
 *      title : "Filtres de recherche :",
 *      obj : {}
 *   });
 *  Search.add();
 *  Search.display(true);
 *  Search.getContainer();
 */
function Search (options) {
    logger.trace("[constructor] Search", options);

    // options
    this.options = options || {
        // default...
        target : null,
        tools : null,
        title : null,
        obj : null
    };

    if (!(this instanceof Search)) {
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
Search.prototype.constructor = Search;

/**
 * Initialize component
 * (called by constructor)
 *
 * @private
 */
Search.prototype._initialize = function () {
    // unique editor id (optional!)
    this.id = this.options.id || null;

    if (!this.options.target) {
        // cf. add()
    }

    var _toolsDefault = {};

    if (!this.options.tools) {
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition futur...
        this.options.obj = {};
    }

    if (!this.options.title) {
        this.options.title = "Recherche de couches :";
    }
    this.container = null;

    // DOM : className or id
    this.name = {
        target : "GPEditorMapBoxSearchTarget",
        container : "GPEditorMapBoxSearchContainer"
        // TODO ...
    };
};

/**
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @private
 * @example
 * <div class="GPEditorMapBoxSearchContainer">
 *  // ...
 * </div>
 */
Search.prototype._initContainer = function () {
    // contexte
    var self = this;

    var _search = JSON.parse(JSON.stringify(this.options.obj)); // on manipule une copie  !

    if (_search.layers) {
        if (_search.layers.length === 0) {
            logger.info("tag 'layers' is empty !");
        }
    }

    var div = document.createElement("div");
    div.className = this.name.container;

    // TODO...
    // outil de recherche des couches mapbox.
    // 2 modes de recherches : exact ou par autocompletion
    // affichage des resultats directement dans la liste des couches
    // la recherche porte sur les champs suiavnts (options):
    // * id (par defaut)
    // * source-layer (par defaut)
    // * type (ex. Symbol)
    // * field (ex. HOPITAL_PONC) > recherche dans le champs filtre

    // main container
    this.container = div;
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Add element into target DOM
 * @returns {Object} - Search instance
 */
Search.prototype.add = function () {
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
Search.prototype.display = function (display) {
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
Search.prototype.getContainer = function () {
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
 * @fires Search#editor:search:onsubmit
 */
Search.prototype.onSubmitSearchLayersMapBox = function (e) {
    logger.trace("onSubmitSearchLayersMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.search.onsubmit, e);
};

/**
 * this method is called by event '' on '' tag form...
 *
 * 'e' contains the option object into 'e.target.data' !
 * 'e' contains the id editor into 'e.target.editorID' !
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Search#editor:search:onautocomplete
 */
 Search.prototype.onAutocompleteSearchLayersMapBox = function (e) {
    logger.trace("onAutocompleteSearchLayersMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.search.onautocomplete, e);
};

export default Search;
