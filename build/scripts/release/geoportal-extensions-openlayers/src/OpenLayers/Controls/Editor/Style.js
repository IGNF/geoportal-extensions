import EventBus from "eventbusjs";
import EventEditor from "./Event";
import Utils from "../../../Common/Utils";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-style");

/**
 * @classdesc
 *
 * MapBox styles management
 *
 * @constructor
 * @alias ol.style.editor.Style
 * @param {Object} options - options for function call.
 * @example
 *   var style = new Style ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          edition : false,
 *          scale : true
 *      },
 *      title : "Styles (JSON)",
 *      obj : {
 *          paint : {},
 *          layout : {}
 *      }
 *   });
 *  style.add();
 *  style.display(true);
 *  style.getContainer();
 */
function Style (options) {
    logger.trace("[constructor] Style", options);

    // options
    this.options = options || {
        // default...
        target : null,
        position : 0,
        tools : null,
        title : null,
        obj : null
    };

    if (!(this instanceof Style)) {
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
Style.prototype.constructor = Style;

/**
 * Initialize component
 * (called by constructor)
 *
 * @private
 */
Style.prototype._initialize = function () {
    // unique editor id (optional!)
    this.id = this.options.id || null;

    if (!this.options.target) {
        // cf. add()
    }

    if (!this.options.position) {
        this.options.position = 0;
    }

    var _toolsDefault = {
        scale : true,
        edition : false
    };

    if (!this.options.tools) {
        this.options.tools = _toolsDefault;
    }

    Utils.mergeParams(this.options.tools, _toolsDefault, false);

    if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition futur...
        this.options.obj = {
            paint : {},
            layout : {}
        };
    }

    if (!this.options.title) {
        this.options.title = "JSON Styles :";
    }

    this.container = null;

    // DOM : className or id
    this.name = {
        target : "GPEditorMapBoxStyleTarget",
        container : "GPEditorMapBoxStyleContainer",
        containerjson : "GPEditorMapBoxStyleJsonContainer",
        jsonlabel : "GPEditorMapBoxStyleJsonTitle",
        jsondisplay : "GPEditorMapBoxStyleJsonDisplay",
        containertoolsscale : "GPEditorMapBoxStyleToolsScaleContainer",
        scaletitle : "GPEditorMapBoxStyleScaleTitle",
        containertoolsminscale : "GPEditorMapBoxStyleToolsScaleMinContainer",
        scalelabelmin : "GPEditorMapBoxStyleScaleLabelMin",
        scaleinputmin : "GPEditorMapBoxStyleScaleInputMin",
        containertoolsmaxscale : "GPEditorMapBoxStyleToolsScaleMaxContainer",
        scalelabelmax : "GPEditorMapBoxStyleScaleLabelMax",
        scaleinputmax : "GPEditorMapBoxStyleScaleInputMax",
        containertoolsedit : "GPEditorMapBoxStyleToolsEditionContainer"
    };
};

/**
 * Graphical rendering of the component
 * ie. this.container
 * (called by constructor)
 *
 * @private
 * @example
 * <div class="GPEditorMapBoxStyleContainer">
 *   <div class ="GPEditorMapBoxStyleJsonContainer">
 *      <label class="GPEditorMapBoxStyleJsonTitle">JSON Styles :</label>
 *      <pre class="GPEditorMapBoxStyleJsonDisplay">...</pre>
 *   </div>
 *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
 *   <div class ="GPEditorMapBoxStyleToolsEditionContainer"></div>
 * </div>
 */
Style.prototype._initContainer = function () {
    // contexte
    var self = this;

    var _found = false;
    var _obj = JSON.parse(JSON.stringify(this.options.obj)); // on manipule une copie  !
    var _style = {};

    // styles into tag 'paint' ?
    if (_obj.paint) {
        _found = true;
        _style.paint = _obj.paint;
        if (Object.keys(_obj.paint).length === 0) {
            logger.info("tag 'paint' is empty !");
        }
    }

    // if not, search into tag 'layout' !
    if (_obj.layout) {
        _found = true;
        _style.layout = _obj.layout;
        // FIXME delete visibility from display ?
        if (_obj.layout.visibility) {
            delete _style.visibility;
        }
        if (Object.keys(_obj.layout).length === 0) {
            logger.info("tag 'layout' is empty !");
        }
    }

    var div = document.createElement("div");
    div.className = this.name.container;

    var json = null;
    if (_found) {
        var strJson = JSON.stringify(_style, null, 4);
        json = this._syntaxHighlight(strJson);
    }

    var divJson = document.createElement("div");
    divJson.className = this.name.containerjson;

    var label = document.createElement("label");
    label.className = this.name.jsonlabel;
    label.innerHTML = this.options.title;
    divJson.appendChild(label);

    var pre = document.createElement("pre");
    pre.className = this.name.jsondisplay;
    pre.innerHTML = json;
    if (pre.addEventListener) {
        pre.addEventListener("click", function (e) {
            if (self.options.tools.edition) {
                self.onEditJsonStyleMapBox(e);
            }
        });
    } else if (pre.attachEvent) {
        pre.attachEvent("onclick", function (e) {
            if (self.options.tools.edition) {
                self.onEditJsonStyleMapBox(e);
            }
        });
    }
    divJson.appendChild(pre);
    div.appendChild(divJson);

    // scale
    if (this.options.tools.scale) {
        div.appendChild(this._createElementToolsScale({
            min : (_style.layout) ? _style.layout.minzoom : 0,
            max : (_style.layout) ? _style.layout.maxzoom : 21
        }));
    }

    // TODO menu d'edition
    if (this.options.tools.edition) {
        div.appendChild(this._createElementToolsEdition());
    }

    // main container
    this.container = div;
};

/**
 * Graphical rendering of the scale tools
 *
 * @param {Object} scale - {min,max} or 0|21
 * @returns {DOMElement} DOM element
 *
 * @private
 * @example
 *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
 */
Style.prototype._createElementToolsScale = function (scale) {
    logger.trace("_createElementToolsScale");

    var self = this;

    var obj = this.options.obj;

    var divToolsScale = document.createElement("div");
    divToolsScale.className = this.name.containertoolsscale;

    // FIXME Titre ?
    // var label = document.createElement("label");
    // label.className = this.name.scaletitle;
    // label.innerHTML = "Scale :";
    // divToolsScale.appendChild(label);

    var divMin = document.createElement("div");
    divMin.className = this.name.containertoolsminscale;

    var labelMin = document.createElement("label");
    labelMin.className = this.name.scalelabelmin;
    labelMin.innerHTML = "min :";
    divMin.appendChild(labelMin);

    var inputMin = document.createElement("input");
    inputMin.className = this.name.scaleinputmin;
    inputMin.type = "range";
    inputMin.value = scale.min || 0;
    inputMin.title = scale.min || 0;
    inputMin.disabled = false;
    inputMin.min = 0;
    inputMin.max = 21;
    inputMin.data = obj; // on lie le DOM et la couche, utile lors d'evenement !
    if (inputMin.addEventListener) {
        inputMin.addEventListener("change", function (e) {
            self.onChangeStyleScaleMinMapBox(e);
        });
    } else if (inputMin.appendChild) {
        inputMin.appendChild("onchange", function (e) {
            self.onChangeStyleScaleMinMapBox(e);
        });
    }
    divMin.appendChild(inputMin);

    divToolsScale.appendChild(divMin);

    var divMax = document.createElement("div");
    divMax.className = this.name.containertoolsmaxscale;

    var labelMax = document.createElement("label");
    labelMax.className = this.name.scalelabelmax;
    labelMax.innerHTML = "max :";
    divMax.appendChild(labelMax);

    var inputMax = document.createElement("input");
    inputMax.className = this.name.scaleinputmin;
    inputMax.type = "range";
    inputMax.value = scale.max || 21;
    inputMax.title = scale.max || 21;
    inputMax.disabled = false;
    inputMax.min = 0;
    inputMax.max = 21;
    inputMax.data = obj; // on lie le DOM et la couche, utile lors d'evenement !
    if (inputMax.addEventListener) {
        inputMax.addEventListener("change", function (e) {
            self.onChangeStyleScaleMaxMapBox(e);
        });
    } else if (inputMax.appendChild) {
        inputMax.appendChild("onchange", function (e) {
            self.onChangeStyleScaleMaxMapBox(e);
        });
    }
    divMax.appendChild(inputMax);

    divToolsScale.appendChild(divMax);

    return divToolsScale;
};

/**
 * Graphical rendering of the edition tools
 *
 * @returns {DOMElement} DOM element
 *
 * @private
 * @example
 *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
 */
Style.prototype._createElementToolsEdition = function () {
    logger.warn("_createElementToolsEdition, it's not yet implemented !");

    var divToolsEdit = document.createElement("div");
    divToolsEdit.className = this.name.containertoolsedit;

    return divToolsEdit;
};

// ################################################################### //
// ##################### private methods ############################# //
// ################################################################### //

/**
 * Transform a JSON into a DOM with a syntax in color
 *
 * @private
 * @param {Object} json - json.
 * @returns {DOMElement} dom element
 */
Style.prototype._syntaxHighlight = function (json) {
    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
        var cls = "gp-json-number";
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = "gp-json-key";
            } else {
                cls = "gp-json-string";
            }
        } else if (/true|false/.test(match)) {
            cls = "gp-json-boolean";
        } else if (/null/.test(match)) {
            cls = "gp-json-null";
        }
        return "<span class='" + cls + "'>" + match + "</span>";
    });
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Add element into target DOM
 * @returns {Object} - Legend instance
 */
Style.prototype.add = function () {
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
Style.prototype.display = function (display) {
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
Style.prototype.getContainer = function () {
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
 * @fires Style#editor:style:oneditjson
 */
Style.prototype.onEditJsonStyleMapBox = function (e) {
    logger.trace("onEditJsonStyleMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.style.oneditjson, e);
};

/**
 * this method is called by event '' on '' tag form...
 *
 * 'e' contains the option object into 'e.target.data' !
 * 'e' contains the id editor into 'e.target.editorID' !
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Style#editor:style:scale:onchangemin
 */
Style.prototype.onChangeStyleScaleMinMapBox = function (e) {
    logger.trace("onChangeStyleScaleMinMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.style.scale.onchangemin, e);
};

/**
 * this method is called by event '' on '' tag form...
 *
 * 'e' contains the option object into 'e.target.data' !
 * 'e' contains the id editor into 'e.target.editorID' !
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Style#editor:style:scale:onchangemax
 */
Style.prototype.onChangeStyleScaleMaxMapBox = function (e) {
    logger.trace("onChangeStyleScaleMaxMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.style.scale.onchangemax, e);
};

export default Style;
