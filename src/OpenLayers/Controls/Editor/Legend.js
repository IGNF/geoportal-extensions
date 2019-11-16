import EventBus from "eventbusjs";
import EventEditor from "./Event";
import Logger from "../../../Common/Utils/LoggerByDefault";
import Color from "../../../Common/Utils/ColorUtils";

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
 *   var legend = new Legend ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      obj : {
 *          title : "",
 *          editable : true, // tag non standard issue du style json dédié à l'edition
 *          paint : {},
 *          layout : {}
 *      }
 *   });
 *  legend.add();
 *  legend.display(true);
 *  legend.isEditable();
 *  legend.getRenderContainer();
 *  legend.getToolsContainer();
 *  legend.getContainer();
 */
function Legend (options) {
    logger.trace("[constructor] Legend", options);

    // options
    this.options = options || {
        // default...
        target : null,
        position : 0,
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

    // permet d'avoir un identifiant de position dans la liste des layers
    if (!this.options.position) {
        this.options.position = 0;
    }

    if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition...
        this.options.obj = {
            title : "vide...",
            editable : true,
            paint : {
                "fill-color" : "#FFFFFF"
            }
        };
    }

    // la legende est elle editable ?
    // le tag 'editable' est à placer dans le fichier de style (dans le layer)...
    var _editable = this.options.obj.editable;
    this.editable = (typeof _editable !== "undefined") ? _editable : false;

    // liste des caractéristiques de la legende
    this.legendRender = {
        type : "fill",
        values : {
            width : 1,
            stroke : "#FFFFFF",
            color : "#FFFFFF",
            opacity : 1
        }
    };

    // DOM : pointer
    this.container = null;
    this.rendercontainer = null;
    this.toolscontainer = null;

    // DOM : className or id
    this.name = {
        target : "GPEditorMapBoxLegendTarget",
        container : "GPEditorMapBoxLegendContainer",
        containerlegendrender : "GPEditorMapBoxLegendRenderContainer",
        legendrender : "GPEditorMapBoxLegendRender",
        legendeditable : "GPEditorMapBoxLegendEditable",
        legendtitle : "GPEditorMapBoxLegendTitle",
        containerlegendtools : "GPEditorMapBoxLegendToolsContainer"
    };

    // DOM : Label menu Edition
    this.labels = {
        "line-color" : "Couleur du trait",
        "line-width" : "Epaisseur du trait",
        "line-opacity" : "Opacité du trait",
        "fill-color" : "Couleur de remplissage",
        "fill-opacity" : "Opacité du remplissage"
    };
};

/**
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @private
 * @example
 * <div class="GPEditorMapBoxLegendContainer">
 *  <div class="GPEditorMapBoxLegendRenderContainer">
 *      <div class="GPEditorMapBoxLegendRender GPEditorMapBoxLegendEditable legend-circle" style="..."></div>
 *      <span class="GPEditorMapBoxLegendTitle">test circle editable...</span>
 *  </div>
 *  <div class="GPEditorMapBoxLegendToolsContainer">...</div>
 * </div>
 */
Legend.prototype._initContainer = function () {
    var _obj = this.options.obj;

    var div = document.createElement("div");
    div.className = this.name.container;

    // on recherche les informations dans le tag 'paint' en priorité, mais pour
    // les icones ou textes, les informations peuvent se trouver aussi dans le tag 'layout'...
    var _bfoundStyle = false;
    var _style = {};
    if (_obj.paint && _obj.layout) {
        _bfoundStyle = true;
        Object.assign(_style, _obj.paint, _obj.layout);
    } else if (_obj.paint) {
        _bfoundStyle = true;
        Object.assign(_style, _obj.paint);
    } else if (_obj.layout) {
        _bfoundStyle = true;
        Object.assign(_style, _obj.layout);
    } else {
        _bfoundStyle = false;
    }

    if (_bfoundStyle) {
        var keys = Object.keys(_style);
        if (keys.length === 0) {
            logger.info("tag 'paint' or 'layout' is empty !");
        }

        // FIXME
        // - gestion de type plus complexe : texte avec/sans symbole ou symbole !
        // - pour les textes ou icones, les info peuvent être aussi dans le tag 'layout' !
        var params = {};
        var bFound = false;
        for (var i = 0; i < keys.length; i++) {
            var _key = keys[i];
            if (/fill-/.test(_key) ||
                /line-/.test(_key) ||
                /circle-/.test(_key) ||
                /background-/.test(_key) ||
                /text-/.test(_key) || // FIXME not yet implemented...
                /icon-/.test(_key) // FIXME not yet implemented...
            ) {
                // style geré & trouvé
                bFound = true;

                var _title = _obj.title || "";

                // le type texte ou icone est difficile à trouver, on le gère en
                // symbole...
                var _type = _key.split("-")[0];
                if (_type === "text" || _type === "icon") {
                    _type = "symbol";
                }

                if (this._getValues(_type, _style)) {
                    params = {
                        edit : this.editable,
                        title : _title,
                        type : this.legendRender.type,
                        values : this.legendRender.values
                    };
                    div.appendChild(this._createElementIconLegend(params));
                }

                // on stoppe la recherche
                break;
            }
        }
    }

    // legende avec un style indeterminé ou non géré !?
    if (!bFound) {
        if (this._getValues("fill", _style)) {
            params = {
                edit : this.editable,
                title : _obj.title || "",
                type : this.legendRender.type,
                values : this.legendRender.values
            };

            div.appendChild(this._createElementIconLegend(params));
        }
    }

    // ajout mode edition graphique de la legende
    this.toolscontainer = this._createElementEditionLegend(params);
    div.appendChild(this.toolscontainer);

    // main container
    this.container = div;
};

/**
* ...
*
* @param {Object} type - fill, line, circle, text, icon...
* @param {Object} value - see example
* @returns {Boolean} - see this.legendRender
*
* @private
* @example
* // type simple for fill, line or circle type:
* // "paint": {
* //     "fill-color": "#2BB3E1"
* // }
*
* // TODO type complexe : not yet implemented !
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
* // TODO other type complexe : not yet implemented !
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
* // TODO symbol with text (1) / symbol without text (2) / text (3)
* // "layout":{
* //      "icon-image":"{maki}-11",          <!--- IT'S A SYMBOL (1) (2)-->
* //      "text-font":[
* //           "Open Sans Semibold",
* //           "Arial Unicode MS Bold"
* //       ],
* //       "text-field":"{name_en}",         <!--- IT'S A TEXT (1) (3)-->
* //       "text-max-width":9,
* //       "text-padding":2,
* //       "text-offset":[
* //            0,
* //            0.6
* //       ],
* //       "text-anchor":"top",
* //       "text-size":12
* // },
* // "paint":{
* //     "text-color":"#666",
* //     "text-halo-color":"#ffffff",
* //     "text-halo-width":1,
* //     "text-halo-blur":0.5
* // },
*
*/
Legend.prototype._getValues = function (type, value) {
    logger.trace("_getValues():", type, value);
    // objets
    var pColor = null;
    var pStroke = null;
    var pWidth = null;
    var pOpacity = null;

    // par defaut...
    var _color = this.legendRender.values.color; // couleur remplissage
    var _stroke = this.legendRender.values.stroke; // couleur trait
    var _width = this.legendRender.values.width; // epaisseur
    var _opacity = this.legendRender.values.opacity; // opacité

    // cas particulier : determiner pour un symbole complexe
    if (type === "symbol") {
        // il existe 2 type de symbole :
        // - texte
        // - icone avec ou sans texte
        var _text = value["text-field"];
        var _icon = value["icon-image"];
        type = (_text && _icon) ? "icon" : (_text) ? "text" : (_icon) ? "icon" : "unknow";
        if (type === "unknow") {
            logger.warn("_getValues() - Type inconnu :", type, value);
            // on force le type texte !?
            type = "text";
        }
    }

    switch (type) {
        case "line":
            pColor = value["line-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                _color = null;
                break;
            }
            _color = pColor || _color;
            pWidth = value["line-width"];
            _width = (typeof pWidth === "object" || Array.isArray(pWidth)) ? _width : pWidth || _width;
            pOpacity = value["line-opacity"];
            _opacity = (typeof pOpacity === "object" || Array.isArray(pOpacity)) ? _opacity : pOpacity || _opacity;
            break;
        case "text":
            pColor = value["text-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                _color = null;
                break;
            }
            // FIXME c'est plus complexe !?
            _color = pColor || _color;
            break;
        case "icon":
            pColor = value["icon-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                _color = null;
                break;
            }
            // FIXME  c'est plus complexe !?
            _color = pColor || _color;
            break;
        case "circle":
            pColor = value["circle-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                _color = null;
                break;
            }
            _color = pColor || _color;
            pStroke = value["circle-stroke-color"];
            _stroke = (typeof pStroke === "object" || Array.isArray(pStroke)) ? _stroke : pStroke || _stroke;
            pOpacity = value["circle-opacity"];
            _opacity = (typeof pOpacity === "object" || Array.isArray(pOpacity)) ? _opacity : pOpacity || _opacity;
            pWidth = value["circle-stroke-width"];
            _width = (typeof pWidth === "object" || Array.isArray(pWidth)) ? _width : pWidth || _width;
            break;
        case "background":
            pColor = value["background-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                _color = null;
                break;
            }
            _color = pColor || _color;
            break;
        case "fill":
            pColor = value["fill-color"];
            if (typeof pColor === "object" || Array.isArray(pColor)) {
                _color = null;
                break;
            }
            _color = pColor || _color;
            pOpacity = value["fill-opacity"];
            _opacity = (typeof pOpacity === "object" || Array.isArray(pOpacity)) ? _opacity : pOpacity || _opacity;
            break;
        default:
            // return false;
    }

    // save
    this.legendRender = {
        type : type,
        values : {
            color : _color,
            stroke : _stroke,
            width : _width,
            opacity : _opacity
        }
    };

    return true;
};

/**
* ...
*
* @param {Object} type - fill, line, circle, text, ...
* @param {Object} values - {"color":..., "width":..., "stroke":...., "opacity":...}
* @returns {Boolean} true/false
*
* @private
* @example
* (...)
*/
Legend.prototype._setValues = function (type, values) {
    // div de rendu de la legende
    var div = this.rendercontainer;

    if (!div) {
        return false;
    }

    // les valeurs
    var _color = values.color || this.legendRender.values.color; // couleur remplissage
    var _stroke = values.stroke || this.legendRender.values.stroke; // couleur trait
    var _width = values.width || this.legendRender.values.width; // epaisseur
    var _opacity = values.opacity || this.legendRender.values.opacity; // opacité
    var _style = "";

    // SVG
    var svg = null;
    // facteur grossissement (x10) pour le trait
    var factor = 10;

    // en fonction du type, on y ajoute le style
    switch (type) {
        case "text":
            _style = "font-size: 5em;font-weight: bold;";
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><text x='50' y='50' fill='%color%' fill-opacity='%opacity%'  text-anchor='middle' alignment-baseline='central' style='%style%'> T </text></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (_color.indexOf("rgb") === 0) ? _color : Color.hexToRgba(_color, 1))
                .replace("%opacity%", _opacity)
                .replace("%style%", _style);
            break;
        case "icon":
            _style = "fill: transparent;stroke-width: 10;";
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M 50,20 80,82.5 20,82.5 z' stroke='%color%' style='%style%'/></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (_color.indexOf("rgb") === 0) ? _color : Color.hexToRgba(_color, 1))
                .replace("%style%", _style);
            break;
        case "background":
            div.style["background-color"] = _color;
            break;
        case "line":
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M0 99 L99 0 L100 1 L1 100' stroke='%color%' stroke-width='%width%' stroke-opacity='%opacity%' /></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (_color.indexOf("rgb") === 0) ? _color : Color.hexToRgba(_color, 1))
                .replace("%opacity%", _opacity)
                .replace("%width%", _width * factor);
            break;
        case "circle":
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' stroke='%stroke%' stroke-width='%width%' stroke-opacity='%opacity%' fill='%color%' fill-opacity='%opacity%' /></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (_color.indexOf("rgb") === 0) ? _color : Color.hexToRgba(_color, 1))
                .replace("%opacity%", _opacity)
                .replace("%stroke%", (_stroke.indexOf("rgb") === 0) ? _stroke : Color.hexToRgba(_stroke, 1))
                .replace("%width%", _width * factor);
            break;
        case "fill":
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><rect x='0' y='0' width='100' height='100' rx='5' ry='5' fill='%color%' fill-opacity='%opacity%' /></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (_color.indexOf("rgb") === 0) ? _color : Color.hexToRgba(_color, 1))
                .replace("%opacity%", _opacity);
            break;
        default:
            return false;
    }

    // save
    this.legendRender = {
        type : type,
        values : {
            color : _color,
            stroke : _stroke,
            width : _width,
            opacity : _opacity
        }
    };

    return true;
};

/**
* Create a Graphical Legend Icon
*
* @param {Object} params - param
* @param {String} params.title - title
* @param {String} params.type - fill, line, circle, text, icon, ...
* @param {String} params.values - {"color": "#2BB3E1", "width": 10, "opacity": 0.5, "stroke": "#2BB3E1"}
* @param {Boolean} params.edit - editable with a colorPicker for only line, fill and circle legend !
* @returns {DOMElement} DOM element
*
* @private
* @example
*   <div class="GPEditorMapBoxLegendRenderContainer">
*       <div class="GPEditorMapBoxLegendRender GPEditorMapBoxLegendEditable legend-fill"
*           style="background: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><rect x='0' y='0' width='100' height='100' rx='5' ry='5' fill='rgba(255, 255, 255, 1)' fill-opacity='1' /></svg>&quot;);">
*       </div>
*       <span class="GPEditorMapBoxLegendTitle">vide...</span>
</div>
*/
Legend.prototype._createElementIconLegend = function (params) {
    // contexte
    var self = this;

    var container = document.createElement("div");
    container.className = this.name.containerlegendrender;

    var div = this.rendercontainer = document.createElement("div");
    div.className = this.name.legendrender;
    if (params.edit) {
        div.className += " ";
        div.className += this.name.legendeditable;
        if (div.addEventListener) {
            div.addEventListener("click", function (e) {
                self.onEditionLegendMapBox(e);
            });
        } else if (div.attachEvent) {
            div.attachEvent("onclick", function (e) {
                self.onEditionLegendMapBox(e);
            });
        }
    }

    // couleur remplissage
    var _color = params.values.color;
    // couleur trait
    var _stroke = params.values.stroke;
    // epaisseur
    var _width = params.values.width;
    // opacité
    var _opacity = params.values.opacity;

    // type de legende
    var _type = params.type;

    // si la couleur n'est pas definie, c'est que le type de syntaxe
    // est non implementé ou non reconnu pour le moment...
    if (!_color) {
        // className
        div.className += " legend-not-implemented";
    } else {
        // ajout du style qur la div de rendu
        if (this._setValues(_type, {
            color : _color,
            stroke : _stroke,
            width : _width,
            opacity : _opacity
        })) {
            // className possibles :
            // " legend-text"
            // " legend-icon"
            // " legend-background"
            // " legend-line"
            // " legend-line-not-editable"
            // " legend-circle"
            // " legend-circle-not-editable"
            // " legend-fill"
            // " legend-fill-not-editable"
            div.className += (params.edit) ? " legend-" + _type : " legend-" + _type + "-not-editable";
        } else {
            div.className += " legend-unknow";
        }
    }

    container.appendChild(div);

    var span = document.createElement("span");
    span.className = this.name.legendtitle;
    span.innerHTML = params.title || "";
    container.appendChild(span);

    return container;
};

/**
* Create a Graphical Legend Edition
*
* @param {Object} params - param
* @param {String} params.type - fill, line, (TODO : circle, icon or text)
* @param {String} params.values - {"fill-color": "#2BB3E1"}
* @param {Boolean} params.edit - editable with a colorPicker for only line and fill legend !
* @returns {DOMElement} DOM element
*
* @private
* @example
*   <div class="GPEditorMapBoxLegendToolsContainer">
*       <div class="legend-styling-div">
*           <label for="stroke-color">Couleur du trait</label>
*           <input class="legend-styling" id="stroke-color" title="" type="color">
*       </div>
*       <div class="legend-styling-div">
*           <label for="stroke-width">Epaisseur du trait</label>
*           <input class="legend-styling" id="stroke-width" title="" type="range" min="0" max="10" step="1" value="1">
*       </div>
*       <div class="legend-styling-div">
*           <label for="stroke-opacity">Opacité du trait</label>
*           <input class="legend-styling" id="stroke-opacity" title="" type="range" min="0" max="1" step="0.1" value="1">
*       </div>
*       <div class="legend-styling-div">
*           <label for="fill-color">Couleur de remplissage</label>
*        <input class="legend-styling" id="fill-color" title="" type="color">
*       </div>
*       <div class="legend-styling-div">
*           <label for="fill-opacity">Opacité du remplissage</label>
*           <input class="legend-styling" id="fill-opacity" title="" type="range" min="0" max="1" step="0.1" value="1">
*       </div>
*   </div>
*/
Legend.prototype._createElementEditionLegend = function (params) {
    // contexte
    var self = this;

    var container = document.createElement("div");
    container.className = this.name.containerlegendtools;

    // uniquement les elements editables !
    if (!params.edit) {
        return container;
    }

    // on ne traite que l'edition du mode 'traits' ou 'surfaciques'
    // mode 'line'
    if (params.type === "line") {
        // couleur du trait
        var linecolor = document.createElement("div");
        linecolor.className = "legend-styling-div";
        var lLineColor = document.createElement("label");
        lLineColor.htmlFor = "line-color";
        lLineColor.innerHTML = this.labels["line-color"];
        var inputLineColor = document.createElement("input");
        inputLineColor.className = "legend-styling";
        inputLineColor.id = "line-color";
        inputLineColor.title = "Selectionner une couleur de trait";
        inputLineColor.type = "color";
        inputLineColor.value = params.values.color;
        if (inputLineColor.addEventListener) {
            inputLineColor.addEventListener("change", function (e) {
                self._setValues(params.type, {
                    color : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputLineColor.attachEvent) {
            inputLineColor.attachEvent("onchange", function (e) {
                self._setValues(params.type, {
                    color : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        }
        linecolor.appendChild(lLineColor);
        linecolor.appendChild(inputLineColor);
        container.appendChild(linecolor);

        // epaisseur du trait
        var linewidth = document.createElement("div");
        linewidth.className = "legend-styling-div";
        var lLineWidth = document.createElement("label");
        lLineWidth.htmlFor = "line-width";
        lLineWidth.innerHTML = this.labels["line-width"];
        var inputLineWidth = document.createElement("input");
        inputLineWidth.className = "legend-styling";
        inputLineWidth.id = "line-width";
        inputLineWidth.title = params.values.width;
        inputLineWidth.type = "range";
        inputLineWidth.min = "0";
        inputLineWidth.max = "10";
        inputLineWidth.step = "1";
        inputLineWidth.defaultValue = params.values.width;
        if (inputLineWidth.addEventListener) {
            inputLineWidth.addEventListener("change", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._setValues(params.type, {
                    width : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputLineWidth.attachEvent) {
            inputLineWidth.attachEvent("onchange", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._setValues(params.type, {
                    width : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        }
        linewidth.appendChild(lLineWidth);
        linewidth.appendChild(inputLineWidth);
        container.appendChild(linewidth);

        // opacité du trait
        var lineopacity = document.createElement("div");
        lineopacity.className = "legend-styling-div";
        var lLineOpacity = document.createElement("label");
        lLineOpacity.htmlFor = "line-opacity";
        lLineOpacity.innerHTML = this.labels["line-opacity"];
        var inputLineOpacity = document.createElement("input");
        inputLineOpacity.className = "legend-styling";
        inputLineOpacity.id = "line-opacity";
        inputLineOpacity.title = params.values.opacity;
        inputLineOpacity.type = "range";
        inputLineOpacity.min = "0";
        inputLineOpacity.max = "1";
        inputLineOpacity.step = "0.1";
        inputLineOpacity.defaultValue = params.values.opacity;
        if (inputLineOpacity.addEventListener) {
            inputLineOpacity.addEventListener("change", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._setValues(params.type, {
                    opacity : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputLineOpacity.attachEvent) {
            inputLineOpacity.attachEvent("onchange", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._setValues(params.type, {
                    opacity : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        }
        lineopacity.appendChild(lLineOpacity);
        lineopacity.appendChild(inputLineOpacity);
        container.appendChild(lineopacity);
    }
    // mode 'fill'
    if (params.type === "fill") {
        // couleur de remplissage
        var fillcolor = document.createElement("div");
        fillcolor.className = "legend-styling-div";
        var lFillColor = document.createElement("label");
        lFillColor.htmlFor = "fill-color";
        lFillColor.innerHTML = this.labels["fill-color"];
        var inputFillColor = document.createElement("input");
        inputFillColor.className = "legend-styling";
        inputFillColor.id = "fill-color";
        inputFillColor.title = "Selectionner une couleur de remplissage";
        inputFillColor.type = "color";
        inputFillColor.value = params.values.color;
        if (inputFillColor.addEventListener) {
            inputFillColor.addEventListener("change", function (e) {
                self._setValues(params.type, {
                    color : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputFillColor.attachEvent) {
            inputFillColor.attachEvent("onchange", function (e) {
                self._setValues(params.type, {
                    color : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        }
        fillcolor.appendChild(lFillColor);
        fillcolor.appendChild(inputFillColor);
        container.appendChild(fillcolor);

        // opacité du remplissage
        var fillopacity = document.createElement("div");
        fillopacity.className = "legend-styling-div";
        var lFillOpacity = document.createElement("label");
        lFillOpacity.htmlFor = "fill-opacity";
        lFillOpacity.innerHTML = this.labels["fill-opacity"];
        var inputFillOpacity = document.createElement("input");
        inputFillOpacity.className = "legend-styling";
        inputFillOpacity.id = "fill-opacity";
        inputFillOpacity.title = params.values.opacity;
        inputFillOpacity.type = "range";
        inputFillOpacity.min = "0";
        inputFillOpacity.max = "1";
        inputFillOpacity.step = "0.1";
        inputFillOpacity.defaultValue = params.values.opacity;
        if (inputFillOpacity.addEventListener) {
            inputFillOpacity.addEventListener("change", function (e) {
                e.target.title = e.target.value;
                self._setValues(params.type, {
                    opacity : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputFillOpacity.attachEvent) {
            inputFillOpacity.attachEvent("onchange", function (e) {
                e.target.title = e.target.value;
                self._setValues(params.type, {
                    opacity : e.target.value
                });
                self.onChangeValueLegendMapBox(e);
            });
        }
        fillopacity.appendChild(lFillOpacity);
        fillopacity.appendChild(inputFillOpacity);
        container.appendChild(fillopacity);
    }

    return container;
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Add element into target DOM
 * @returns {Object} - Legend instance
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
    return this;
};

/**
 * Set display container or get
 *
 * @param {Boolean} display - show/hidden container or get status
 * @returns {Boolean} - true/false
 */
Legend.prototype.display = function (display) {
    logger.trace("display()", display);
    if (typeof display !== "undefined") {
        this.container.style.display = (display) ? "flex" : "none";
    }
    return (this.container.style.display === "flex");
};

/**
 * Is editable
 *
 * @returns {Boolean} - true/false
 */
Legend.prototype.isEditable = function () {
    return this.editable;
};

/**
 * Get container Legend Render (DOM)
 *
 * @returns {DOMElement} DOM element
 * @see Layer.prototype.slotLegend()
 * @example
 *  <div class="GPEditorMapBoxLegendRender legend-(line|fill|background|text|icon|circle|unknow)" style="..."></div>
 */
Legend.prototype.getRenderContainer = function () {
    return this.rendercontainer;
};

/**
 * Get container Legend Tools (DOM)
 *
 * @returns {DOMElement} DOM element
 * @see Layer.prototype.slotLegend()
 * @example
 *  <div class="GPEditorMapBoxLegendToolsContainer">...</div>
 */
Legend.prototype.getToolsContainer = function () {
    return this.toolscontainer;
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
 * this method is called by event '' on '' tag form...
 *
 * 'e' contains the option object into 'e.target.data' !
 * 'e' contains the id editor into 'e.target.editorID' !
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Legend#editor:legend:onclickedition
 */
Legend.prototype.onEditionLegendMapBox = function (e) {
    logger.trace("onEditionLegendMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.legend.onclickedition, e);
};

/**
 * this method is called by event '' on '' tag form...
 *
 * 'e' contains the option object into 'e.target.data' !
 * 'e' contains the id editor into 'e.target.editorID' !
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Legend#editor:legend:onchangevalue
 */
Legend.prototype.onChangeValueLegendMapBox = function (e) {
    logger.trace("onChangeValueLegendMapBox", e);
    e.editorID = this.id;
    e.data = this.options;
    EventBus.dispatch(EventEditor.legend.onchangevalue, e);
};
export default Legend;
