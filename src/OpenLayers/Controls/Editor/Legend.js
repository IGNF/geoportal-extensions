import EventBus from "eventbusjs";
import EventEditor from "./Event";
import Utils from "../../../Common/Utils";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-legend");

/**
 * @classdesc
 *
 * MapBox Legend management
 *
 * @constructor
 * @alias ol.style.editor.Legend
 * @param {Object} options - options for function call.
 * @example
 *   var Legends = new Legend ({
 *      target : ...,
 *      tools : {
 *          edition : false
 *      },
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
        tools : null,
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
    // unique editor id (optional!)
    this.id = this.options.id || null;

    if (!this.options.target) {
        // cf. add()
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
        containerlegend : "GPEditorMapBoxLegendRenderContainer",
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
        // - gestion de type plus complexe : texte avec/sans icone ou icone !
        var bFound = false;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/fill-/.test(key) ||
                /line-/.test(key) ||
                /circle-/.test(key) ||
                /background-/.test(key) ||
                /text-/.test(key) ||
                /icon-/.test(key)
            ) {
                // style geré & trouvé
                bFound = true;

                div.appendChild(this._createElementLegend({
                    title : _obj.title || "",
                    type : key.split("-")[0],
                    value : _obj.paint
                }));

                // on stoppe la recherche
                break;
            }
        }
    }

    // legende avec un style indeterminé !?
    if (!bFound) {
        div.appendChild(this._createElementLegend({
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
* // TODO type complexe :
* // "paint": {
* //     "fill-color": [
* //          "match",
* //          ["get","symbo"],
* //          "ZONE_BOISEE","#A7DA81",
* //          "ZONE_MANGROVE","#7E8AB5",
* //          "#A7DA81"
* //      ]
* // }
*
* // TODO type complexe :
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
*
* @param {Object} params - param
* @param {String} params.title - title
* @param {String} params.type - fill, line, ...
* @param {String} params.value - {"fill-color": "#2BB3E1"}
* @returns {DOMElement} DOM element
*
* @private
* @example
*   <div class ="GPEditorMapBoxLegendRenderContainer"></div>
*/
Legend.prototype._createElementLegend = function (params) {
    // contexte
    var self = this;

    var container = document.createElement("div");
    container.className = this.name.containerlegend;

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

    var pColor = null;
    var color = "";
    var stroke = "";
    var opacity = 0;
    // var width = 1;
    switch (params.type) {
        case "line":
            pColor = params.value["line-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                div.className += " legend-not-implemented";
                break;
            }
            color = params.value["line-color"] || "#000000";
            // TODO params.value["line-opacity"]
            // TODO params.value["line-width"]
            div.style["background"] = "linear-gradient(to top right, #FFFFFF calc(40% - 0px), " + color + ", #FFFFFF calc(60% + 0px) )";
            div.className += " legend-line";
            break;
        case "text":
            pColor = params.value["text-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                div.className += " legend-not-implemented";
                break;
            }
            // FIXME ?
            color = params.value["text-color"] || "#000000";
            div.style["background-color"] = color;
            div.className += " legend-text";
            break;
        case "icon":
            pColor = params.value["icon-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                div.className += " legend-not-implemented";
                break;
            }
            // FIXME ?
            color = params.value["icon-color"] || "#000000";
            div.style["background-color"] = color;
            div.className += " legend-icon";
            break;
        case "circle":
            pColor = params.value["circle-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                div.className += " legend-not-implemented";
                break;
            }
            color = params.value["circle-color"] || "#000000";
            stroke = params.value["circle-stroke-color"] || "#FFFFFF";
            opacity = params.value["circle-opacity"] || 1;
            // TODO params.value["circle-stroke-width"]
            div.style["border-color"] = stroke;
            div.style["background-color"] = color;
            div.style["opacity"] = opacity;
            div.className += " legend-circle";
            break;
        case "background":
            // TODO creer un icone pour le type !
            color = params.value["background-color"];
            div.style["background-color"] = color;
            div.className += " legend-background";
            break;
        case "fill":
            pColor = params.value["fill-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                div.className += " legend-not-implemented";
                break;
            }
            color = params.value["fill-color"] || "#000000";
            opacity = params.value["fill-opacity"] || 1;
            // TODO params.value["fill-outline-color"]
            div.style["background-color"] = color;
            div.style["opacity"] = opacity;
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
 * @see Layer.prototype.slotLegend()
 * @example
 *  // <div class="GPEditorMapBoxLegendRender legend-(line|fill|background|text|icon|circle|unknow)" style="..."></div>
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
    e.editorID = this.id;
    EventBus.dispatch(EventEditor.legend.visibility, e);
};

export default Legend;
