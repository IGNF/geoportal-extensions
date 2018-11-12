import EventBus from "eventbus";
import EventEditor from "./Event";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-legend");

/**
 * @classdesc
 *
 * MapBox Legend management
 *
 * @constructor
 * @param {Object} options - options for function call.
 * @example
 *   var Legends = new Legend ({
 *      target : ...,
 *      obj : {
 *          title : "",
 *          paint : {}
 *      }
 *   });
 */
function Legend (options) {
    logger.trace("[constructor] Legend", options);

    // options
    this.options = options || {
        // default...
        target : null,
        obj : null
    };

    if (!(this instanceof Legend)) {
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
Legend.prototype.constructor = Legend;

/**
 * Initialize component
 * (called by constructor)
 *
 * @private
 */
Legend.prototype._initialize = function () {
    if (!this.options.target) {
        // cf. add()
    }

    if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition futur...
        this.options.obj = {
            title : "vide...",
            paint : {
                "fill-color" : "#FFFFFF"
            }
        };
    }

    // dom
    this.container = null;

    // DOM : className or id
    this.name = {
        target : "GPEditorMapBoxLegendTarget",
        container : "GPEditorMapBoxLegendContainer",
        containerstringlegend : "GPEditorMapBoxLegendStringContainer",
        containerarraylegend : "GPEditorMapBoxLegendArrayContainer",
        containerobjectlegend : "GPEditorMapBoxLegendObjectContainer",
        legendrender : "GPEditorMapBoxLegendRender",
        legendtitle : "GPEditorMapBoxLegendTitle"
    };
};

/**
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @private
 * @example
 * <div class="GPEditorMapBoxLegendContainer">...</div>
 */
Legend.prototype._initContainer = function () {
    var _obj = this.options.obj;

    var div = document.createElement("div");
    div.className = this.name.container;

    if (_obj.paint) {
        var keys = Object.keys(_obj.paint);
        if (keys.length === 0) {
            logger.info("tag 'paint' is empty !");
        }

        // FIXME
        // gestion du type complexe : texte avec icone ou icone !
        var _bNotFound = true;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key === "fill-color" ||
                key === "line-color" ||
                key === "circle-color" ||
                key === "background-color" ||
                key === "text-color" || // FIXME attention, cette propriété est optionnelle !
                key === "icon-color" // FIXME attention, cette propriété n'exsite pas !
            ) {
                _bNotFound = false;
                var params = {
                    title : _obj.title || "",
                    type : key,
                    value : _obj.paint[key]
                };
                if (typeof _obj.paint[key] === "string") {
                    div.appendChild(this._createElementLegendString(params));
                } else if (Array.isArray(_obj.paint[key])) {
                    div.appendChild(this._createElementLegendArray(params));
                } else if (typeof _obj.paint[key] === "object") {
                    div.appendChild(this._createElementLegendObject(params));
                } else {
                    // TODO ...
                }
            }
        }
    }
    // legende avec un style inconnu !?
    if (_bNotFound) {
        div.appendChild(this._createElementLegendString({
            title : _obj.title || "",
            type : "",
            value : ""
        }));
    }
    // main container
    this.container = div;
};

/**
 * Graphical legend Simple
 * // type simple :
 * // "paint": {
 * //     "fill-color": "#2BB3E1"
 * // }
 *
 * @param {Object} params - param
 * @param {String} params.title - title
 * @param {String} params.type - fill, line, ...
 * @param {String} params.value - #000000 hexa color...
 * @returns {DOMElement} DOM element
 *
 * @private
 * @example
 *   <div class ="GPEditorMapBoxLegendStringContainer"></div>
 */
Legend.prototype._createElementLegendString = function (params) {
    // contexte
    var self = this;

    var container = document.createElement("div");
    container.className = this.name.containerstringlegend;

    var div = document.createElement("div");
    div.className = this.name.legendrender;
    if (div.addEventListener) {
        div.addEventListener("click", function (e) {
            self.onVisibilityLegendMapBox(e);
        });
    } else if (div.attachEvent) {
        div.attachEvent("onclick", function (e) {
            self.onVisibilityLegendMapBox(e);
        });
    }

    // à finir ...
    switch (params.type.split("-")[0]) {
        case "line":
            // TODO jouer aussi sur la param width !
            div.style["background"] = "linear-gradient(to top right, #FFFFFF calc(40% - 0px), " + params.value + ", #FFFFFF calc(60% + 0px) )";
            div.className += " legend-line";
            break;
        case "text":
            // FIXME param optionnel !
            div.style["background-color"] = params.value;
            div.className += " legend-text";
            break;
        case "icon":
            // FIXME comment retrouver l'icone ?
            div.style["background-color"] = params.value;
            div.className += " legend-icon";
            break;
        case "circle":
            div.style["border-color"] = params.value;
            // div.style["background-color"] = params.value;
            div.className += " legend-circle";
            break;
        case "background":
            // TODO creer un icone !
            div.style["background-color"] = params.value;
            div.className += " legend-background";
            break;
        case "fill":
            div.style["background-color"] = params.value;
            div.className += " legend-fill";
            break;
        default:
            div.className += " legend-unknow";
    }
    container.appendChild(div);

    var span = document.createElement("span");
    span.className = this.name.legendtitle;
    span.innerHTML = params.title || "";
    container.appendChild(span);

    // on peut ausi surcharger l'icone de type du layers avec un masque :
    // element.style {
    //      background: none;
    //      -webkit-mask: {file} no-repeat center;
    //      mask: : {file};
    //      background-color: #0000000
    // }
    return container;
};

/**
 * Graphical legend Complex with an expression array
 * // type complexe :
 * // "paint": {
 * //     "fill-color": [
 * //          "match",
 * //          ["get","symbo"],
 * //          "ZONE_BOISEE","#A7DA81",
 * //          "ZONE_MANGROVE","#7E8AB5",
 * //          "#A7DA81"
 * //      ]
 * // }
 * @returns {DOMElement} DOM element
 *
 * @private
 * @example
 *   <div class ="GPEditorMapBoxLegendArrayContainer"></div>
 */
Legend.prototype._createElementLegendArray = function () {
    // TODO ...
    var container = document.createElement("div");
    container.className = this.name.containerarraylegend;

    var div = document.createElement("div");
    div.className = this.name.legendrender;
    div.className += " legend-not-implemented";
    container.appendChild(div);

    var span = document.createElement("span");
    span.className = this.name.legendtitle;
    span.innerHTML = "(not yet implemented!)";
    container.appendChild(span);

    return container;
};

/**
 * Graphical legend Complex with an expression object
 * // type complexe :
 * // "paint": {
 * //     "fill-color": {
 * //        "base": 1,
 * //        "stops": [
 * //        [
 * //          15.5,
 * //         "#f2eae2"
 * //        ],
 * //        [
 * //          16,
 * //          "#dfdbd7"
 * //        ]
 * //        ]
 * //     }
 * // }
 * @returns {DOMElement} DOM element
 *
 * @private
 * @example
 *   <div class ="GPEditorMapBoxLegendObjectContainer"></div>
 */
Legend.prototype._createElementLegendObject = function () {
    // TODO ...
    var container = document.createElement("div");
    container.className = this.name.containerobjectlegend;

    var div = document.createElement("div");
    div.className = this.name.legendrender;
    div.className += " legend-not-implemented";
    container.appendChild(div);

    var span = document.createElement("span");
    span.className = this.name.legendtitle;
    span.innerHTML = "(not yet implemented!)";
    container.appendChild(span);

    return container;
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Add element into target DOM
 */
Legend.prototype.add = function () {
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
 * Set display container (DOM)
 *
 * @param {Boolean} display - show/hidden container
 */
Legend.prototype.display = function (display) {
    this.container.style.display = (display) ? "flex" : "none";
};

/**
 * Get container Legend Render (DOM)
 *
 * @returns {DOMElement} DOM element
 */
Legend.prototype.getRender = function () {
    // FIXME c'est pourri...
    var nodesLvl1 = this.container.childNodes;
    if (nodesLvl1.length) {
        var nodesLvl2 = nodesLvl1[0].childNodes;
        if (nodesLvl2.length) {
            return nodesLvl2[0];
        }
    }
};

/**
 * Get container (DOM)
 *
 * @returns {DOMElement} DOM element
 */
Legend.prototype.getContainer = function () {
    return this.container;
};

// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

/**
 * this method is called by event '' on '' tag form
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Filter#editor:legend:visibility
 */
Legend.prototype.onVisibilityLegendMapBox = function (e) {
    logger.trace("onVisibilityLegendMapBox", e);
    EventBus.dispatch(EventEditor.legend.visibility, e);
};

export default Legend;
