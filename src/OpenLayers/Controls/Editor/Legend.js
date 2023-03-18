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
 * @param {Object} [options.target = null] - ...
 * @param {Number} [options.position = 0] -  ...
 * @param {Number} [options.id = null] - (internal) ...
 * @param {Object} [options.sprites = null] - ...
 * @param {String} [options.sprites.url] - ...
 * @param {Object} [options.sprites.size] - {h:, w:} ...
 * @param {Object} [options.sprites.json] - ...
 * @param {Object} options.obj - ...
 * @param {String} [options.obj.title] - ...
 * @param {Boolean} [options.obj.editable = true] - ...
 * @param {Object} options.obj.paint - ...
 * @param {Object} options.obj.layout - ...
 * @example
 *   var legend = new Legend ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      sprites : {
 *          url : "http://localhost/sprites.png",
 *          size : { w : 450, h : 550 },
 *          json : {
 *              icon-1 : {x:,y:,height:,width:,pixelRatio:},
 *              icon-2 : {x:,y:,height:,width:,pixelRatio:}
 *          }
 *      },
 *      obj : {
 *          title : "",
 *          editable : true, // tag non standard issue du style json dédié à l'edition
 *          paint : {"fill-color": "#2BB3E1"},
 *          layout : {visibility:"none"}
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
        sprites : null,
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

// ################################################################### //
// ########################## CONSTANTES ############################# //
// ################################################################### //

/**
 * List of supported properties
 */
Legend.PROPERTIES = {
    line : [
        "line-color",
        "line-dasharray",
        "line-opacity",
        "line-width"
    ],
    fill : [
        "fill-color",
        "fill-opacity",
        "fill-outline-color",
        "fill-pattern"
    ],
    background : [
        "background-color",
        "background-opacity",
        "background-pattern"
    ],
    circle : [
        "circle-color",
        "circle-opacity",
        "circle-stroke-color",
        "circle-stroke-opacity",
        "circle-stroke-width"
    ],
    icon : [
        "icon-color",
        "icon-image",
        "icon-opacity",
        "__icon-size"
    ],
    text : [
        "__text-anchor",
        "text-color",
        "text-field",
        "__text-font",
        "__text-opacity",
        "__text-size"
    ]
};

// ################################################################### //
// ########################## init methods ########################### //
// ################################################################### //

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

    // liste des caractéristiques de la legende par defaut
    this.legendRender = {
        type : "fill",
        values : {
            width : 1,
            stroke : "#FFFFFF",
            color : "#000000",
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

    // INFO
    // on recherche les informations dans le tag 'paint' en priorité, mais pour
    // les icones ou textes, les informations peuvent se trouver aussi dans le tag 'layout'...
    // on fusionnne paint et layout par facilité
    var style = Object.assign({}, _obj.paint, _obj.layout);

    // liste des properties mapbox
    // ex. fill-color
    var keys = Object.keys(style);
    if (keys.length === 0) {
        logger.info("tag 'paint' or 'layout' is empty !");
        return;
    }

    // FIXME
    // - gestion de type plus complexe : texte avec/sans symbole ou symbole !
    // - pour les textes ou icones, les info peuvent être aussi dans le tag 'layout' !

    var params = {};
    var bFound = false;
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // recherche du type
        // ex. fill
        if (/fill-/.test(key) ||
            /line-/.test(key) ||
            /circle-/.test(key) ||
            /background-/.test(key) ||
            /text-/.test(key) ||
            /icon-/.test(key)
        ) {
            // style geré & trouvé
            bFound = true;

            var title = _obj.title || "";

            // INFO
            // le type texte ou icone est difficile à trouver car les 2 types cohabitent,
            // on le gère en symbole...
            var type = key.split("-")[0];
            if (type === "text" || type === "icon") {
                type = "symbol";
            }

            this.legendRender = this._getProperties(type, style);
            params = {
                edit : this.editable,
                title : title,
                type : this.legendRender.type,
                values : this.legendRender.values
            };
            div.appendChild(this._createElementIconLegend(params));

            // on stoppe la recherche
            break;
        }
    }

    // legende avec un style indeterminé ou non géré !?
    if (!bFound) {
        // on prend la legende par defaut
        params = {
            edit : this.editable,
            title : "",
            type : this.legendRender.type,
            values : this.legendRender.values
        };
        div.appendChild(this._createElementIconLegend(params));
        logger.warn("legend type unknown, default legend used...");
    }

    // ajout mode edition graphique de la legende
    this.toolscontainer = this._createElementEditionLegend(params);
    div.appendChild(this.toolscontainer);

    // main container
    this.container = div;
};

// ################################################################### //
// ##################### private methods ############################# //
// ################################################################### //

/**
* Get properties supported
*
* @param {Object} type - fill, line, circle, text, icon...
* @param {Object} values - raw values from the JSON file
* @returns {Object} - { type : (fill | line | circle | symbol), values : valuesSupported }
*
* @private
* @example
*
* // TODO
* // symbol with text (1) / symbol without text (2) / text (3)
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
Legend.prototype._getProperties = function (type, values) {
    // cas particulier du symbole complexe
    // il existe plusieurs types pour un symbole :
    // - text
    // - icon
    // - icon with text
    if (type === "symbol") {
        var isTextValue = values["text-field"];
        var isIconValue = values["icon-image"];
        type = (isTextValue && isIconValue) ? "icon" : (isTextValue) ? "text" : (isIconValue) ? "icon" : "unknow";
        if (type === "unknow") {
            logger.warn("type unknow !?");
            return;
        }
    }

    var valuesSupported = {};
    for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
            const val = values[key];
            if (Legend.PROPERTIES[type].includes(key)) {
                var prop = key.replace(type, "").slice(1);
                var value = this._getValue(val);
                if (value) {
                    // cas particulier des sprites
                    if (prop === "pattern" || prop === "image") {
                        if (!this.options.sprites ||
                            !this.options.sprites.json ||
                            !this.options.sprites.json[value]) {
                            var k = type + ":" + prop;
                            logger.warn("sprites mandatory for key ", k);
                            break;
                        }
                    }
                    valuesSupported[prop] = value;
                }
            } else {
                logger.warn("property not supported : ", key);
            }
        }
    }

    return {
        type : type,
        values : valuesSupported
    };
};

/**
* Render thumbnail (SVG)
*
* @param {Object} type - fill, line, circle, text, ...
* @param {Object} values - {"color":..., "width":..., "stroke":...., "opacity":...}
* @returns {Boolean} true/false
*
* @private
* @example
* (...)
*/
Legend.prototype._renderThumbnail = function (type, values) {
    // div de rendu de la legende
    var div = this.rendercontainer;

    if (!div) {
        return false;
    }

    // SVG
    var svg = null;
    // facteur grossissement (x10) pour le trait
    var factor = 3;

    // valeur par defaut
    if (!values.color) {
        values.color = "#FFFFFF";
    }
    // en fonction du type, on y ajoute le style
    switch (type) {
        case "text":
            var styleText = "font-size: 5em;font-weight: bold;";
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><text x='50' y='50' fill='%color%' fill-opacity='%opacity%'  text-anchor='middle' dominant-baseline='central' style='%style%'> T </text></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (values.color.indexOf("rgb") === 0) ? values.color : Color.hexToRgba(values.color, 1))
                .replace("%opacity%", values.opacity || 1)
                .replace("%style%", styleText);
            break;
        case "icon":
            if (values.image) {
                // FIXME on reste dans le paradigme d'utilisation du SVG...,
                // mais probleme de ratio de l'image !?
                svg = "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' width='27px' height='27px' x='0' y='0' viewBox='%x% %y% %w% %h%'><image width='%W%px' height='%H%px' href='%URL%'/></svg>"
                    .replace("%x%", this.options.sprites.json[values.image].x)
                    .replace("%y%", this.options.sprites.json[values.image].y)
                    .replace(/%w%/g, this.options.sprites.json[values.image].width)
                    .replace(/%h%/g, this.options.sprites.json[values.image].height)
                    .replace("%W%", this.options.sprites.size.w)
                    .replace("%H%", this.options.sprites.size.h)
                    .replace("%URL%", this.options.sprites.url);
                div.innerHTML = svg;
            } else {
                var styleTextIcon = "fill: transparent;stroke-width: 10;";
                svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M 50,20 80,82.5 20,82.5 z' stroke='%color%' style='%style%'/></svg>\")";
                div.style["background"] = svg
                    .replace("%color%", (values.color.indexOf("rgb") === 0) ? values.color : Color.hexToRgba(values.color, 1))
                    .replace("%style%", styleTextIcon);
            }
            break;
        case "line":
            var lstrockedasharray = (Array.isArray(values["dasharray"])) ? values["dasharray"].join(" ") : 0;
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='100' x2='100' y2='0' stroke='%color%' stroke-width='%stroke-width%' stroke-opacity='%stroke-opacity%' stroke-dasharray='%stroke-dasharray%' /></svg>\")";
            // svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M0 99 L99 0 L100 1 L1 100' stroke='%color%' stroke-width='%width%' stroke-opacity='%opacity%' stroke-dasharray='%dasharray%' /></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (values.color.indexOf("rgb") === 0) ? values.color : Color.hexToRgba(values.color, 1))
                .replace("%stroke-opacity%", values.opacity || 1)
                .replace("%stroke-dasharray%", lstrockedasharray)
                .replace("%stroke-width%", (values.width || 0) * factor);
            break;
        case "circle":
            var cstrockcolor = values["stroke-color"] || "#FFFFFF";
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' stroke='%stroke-color%' stroke-width='%stroke-width%' stroke-opacity='%strock-opacity%' fill='%color%' fill-opacity='%opacity%' /></svg>\")";
            div.style["background"] = svg
                .replace("%color%", (values.color.indexOf("rgb") === 0) ? values.color : Color.hexToRgba(values.color, 1))
                .replace("%opacity%", values.opacity || 1)
                .replace("%stroke-color%", (cstrockcolor.indexOf("rgb") === 0) ? cstrockcolor : Color.hexToRgba(cstrockcolor, 1))
                .replace("%stroke-opacity%", values["stroke-opacity"] || 1)
                .replace("%stroke-width%", (values["stroke-width"] || 0) * factor);
            break;
        case "background":
        case "fill":
            if (values.pattern) {
                svg = "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' width='27px' height='27px' x='0' y='0' viewBox='%x% %y% %w% %h%'><image width='%W%px' height='%H%px' href='%URL%'/></svg>"
                    .replace("%x%", this.options.sprites.json[values.pattern].x)
                    .replace("%y%", this.options.sprites.json[values.pattern].y)
                    .replace(/%w%/g, this.options.sprites.json[values.pattern].width)
                    .replace(/%h%/g, this.options.sprites.json[values.pattern].height)
                    .replace("%W%", this.options.sprites.size.w)
                    .replace("%H%", this.options.sprites.size.h)
                    .replace("%URL%", this.options.sprites.url);
                div.innerHTML = svg;
            } else {
                var fstrokecolor = values["outline-color"] || "#FFFFFF";
                svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><rect x='0' y='0' width='100' height='100' rx='5' ry='5' stroke='%stroke-color%' stroke-width='3' fill='%color%' fill-opacity='%opacity%' /></svg>\")";
                div.style["background"] = svg
                    .replace("%color%", (values.color.indexOf("rgb") === 0) ? values.color : Color.hexToRgba(values.color, 1))
                    .replace("%opacity%", values.opacity || 1)
                    .replace("%stroke-color%", (fstrokecolor.indexOf("rgb") === 0) ? fstrokecolor : Color.hexToRgba(fstrokecolor, 1));
            }
            break;
        default:
            logger.warn("type not found, no thumbnail...");
            return false;
    }

    return true;
};

/**
 * Get value
 *
 * @param {*} value - value of a property (ex. "#2BB3E1")
 * @returns {*} return a verified value (ex. color": "#2BB3E1")
 *
 * @private
 * @example
 * // type simple for fill, line or circle type with string :
 * // "paint": {
 * //     "fill-color": "#2BB3E1"
 * // }
 *
 * // type simple for fill, line or circle type with array :
 * // "paint": {
 * //     "line-dasharray": [2,10]
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
 * // other type complexe :
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
 */
Legend.prototype._getValue = function (value) {
    var result = null;
    if (typeof value === "string") {
        result = value;
    } else if (typeof value === "number") {
        result = value;
    } else if (Array.isArray(value)) {
        // cas d'un tableau de valeurs numériques : [1,2,3]
        var isNumber = true;
        value.forEach(v => {
            if (typeof v !== "number") {
                isNumber = false;
            }
        });
        if (isNumber) {
            result = value;
        }
    } else if (typeof value === "object") {
        result = null;
        if ("stops" in value) {
            // on realise un ordre inversé sur les zooms
            value.stops.sort((a, b) => {
                var numA = a[0];
                var numB = b[0];
                if (numA > numB) {
                    return -1;
                }
                if (numA < numB) {
                    return 1;
                }
                return 0;
            });
            // et, on prend le plus petit zoom
            var lastStopsValue = value.stops.slice(-1);
            result = lastStopsValue[0][1];
        }
    } else {
        logger.warn("value not supported !");
    }
    return result;
};

// ################################################################### //
// ######################### DOM methods ############################# //
// ################################################################### //

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
* </div>
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

    // type de legende
    var type = params.type;

    // TODO className
    // div.className += " legend-not-implemented";

    // ajout du style sur la div de rendu
    if (this._renderThumbnail(type, params.values)) {
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
        div.className += (params.edit) ? " legend-" + type : " legend-" + type + "-not-editable";
    } else {
        div.className += " legend-unknow";
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
    switch (params.type) {
        case "line":
            createLineColor.call(self);
            createLineWidth.call(self);
            createLineOpacity.call(self);
            break;
        case "background":
        case "fill":
            createFillColor.call(self);
            createFillOpacity.call(self);
            break;
        default:
            break;
    }

    // couleur du trait
    function createLineColor () {
        var linecolor = document.createElement("div");
        linecolor.className = "legend-styling-div";
        var lLineColor = document.createElement("label");
        lLineColor.className = "legend-line";
        lLineColor.htmlFor = this.id ? "line-color-" + this.id : "line-color";
        lLineColor.innerHTML = this.labels["line-color"];
        var inputLineColor = document.createElement("input");
        inputLineColor.className = "legend-styling";
        inputLineColor.id = this.id ? "line-color-" + this.id : "line-color";
        inputLineColor.title = "Selectionner une couleur de trait";
        inputLineColor.type = "color";
        inputLineColor.value = params.values.color;
        inputLineColor.setAttribute("data-id", "line-color");
        if (inputLineColor.addEventListener) {
            inputLineColor.addEventListener("change", function (e) {
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    color : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputLineColor.attachEvent) {
            inputLineColor.attachEvent("onchange", function (e) {
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    color : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        }
        linecolor.appendChild(lLineColor);
        linecolor.appendChild(inputLineColor);
        container.appendChild(linecolor);
    }

    // epaisseur du trait
    function createLineWidth () {
        var linewidth = document.createElement("div");
        linewidth.className = "legend-styling-div";
        var lLineWidth = document.createElement("label");
        lLineWidth.className = "legend-line";
        lLineWidth.htmlFor = this.id ? "line-width-" + this.id : "line-width";
        lLineWidth.innerHTML = this.labels["line-width"];
        var inputLineWidth = document.createElement("input");
        inputLineWidth.className = "legend-styling";
        inputLineWidth.id = this.id ? "line-width-" + this.id : "line-width";
        inputLineWidth.title = params.values.width;
        inputLineWidth.type = "range";
        inputLineWidth.min = "0";
        inputLineWidth.max = "10";
        inputLineWidth.step = "1";
        inputLineWidth.defaultValue = params.values.width;
        inputLineWidth.setAttribute("data-id", "line-width");
        if (inputLineWidth.addEventListener) {
            inputLineWidth.addEventListener("change", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    width : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputLineWidth.attachEvent) {
            inputLineWidth.attachEvent("onchange", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    width : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        }
        linewidth.appendChild(lLineWidth);
        linewidth.appendChild(inputLineWidth);
        container.appendChild(linewidth);
    }

    // opacité du trait
    function createLineOpacity () {
        var lineopacity = document.createElement("div");
        lineopacity.className = "legend-styling-div";
        var lLineOpacity = document.createElement("label");
        lLineOpacity.className = "legend-line";
        lLineOpacity.htmlFor = this.id ? "line-opacity-" + this.id : "line-opacity";
        lLineOpacity.innerHTML = this.labels["line-opacity"];
        var inputLineOpacity = document.createElement("input");
        inputLineOpacity.className = "legend-styling";
        inputLineOpacity.id = this.id ? "line-opacity-" + this.id : "line-opacity";
        inputLineOpacity.title = params.values.opacity;
        inputLineOpacity.type = "range";
        inputLineOpacity.min = "0";
        inputLineOpacity.max = "1";
        inputLineOpacity.step = "0.1";
        inputLineOpacity.defaultValue = params.values.opacity;
        inputLineOpacity.setAttribute("data-id", "line-opacity");
        if (inputLineOpacity.addEventListener) {
            inputLineOpacity.addEventListener("change", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    opacity : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputLineOpacity.attachEvent) {
            inputLineOpacity.attachEvent("onchange", function (e) {
                logger.trace(e);
                e.target.title = e.target.value;
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    opacity : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        }
        lineopacity.appendChild(lLineOpacity);
        lineopacity.appendChild(inputLineOpacity);
        container.appendChild(lineopacity);
    }

    // couleur de remplissage
    function createFillColor () {
        var fillcolor = document.createElement("div");
        fillcolor.className = "legend-styling-div";
        var lFillColor = document.createElement("label");
        lFillColor.className = "legend-fill";
        lFillColor.htmlFor = this.id ? "fill-color-" + this.id : "fill-color";
        lFillColor.innerHTML = this.labels["fill-color"];
        var inputFillColor = document.createElement("input");
        inputFillColor.className = "legend-styling";
        inputFillColor.id = this.id ? "fill-color-" + this.id : "fill-color";
        inputFillColor.title = "Selectionner une couleur de remplissage";
        inputFillColor.type = "color";
        inputFillColor.value = params.values.color;
        inputFillColor.setAttribute("data-id", "fill-color");
        if (inputFillColor.addEventListener) {
            inputFillColor.addEventListener("change", function (e) {
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    color : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputFillColor.attachEvent) {
            inputFillColor.attachEvent("onchange", function (e) {
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    color : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        }
        fillcolor.appendChild(lFillColor);
        fillcolor.appendChild(inputFillColor);
        container.appendChild(fillcolor);
    }

    // opacité du remplissage
    function createFillOpacity () {
        var fillopacity = document.createElement("div");
        fillopacity.className = "legend-styling-div";
        var lFillOpacity = document.createElement("label");
        lFillOpacity.className = "legend-fill";
        lFillOpacity.htmlFor = this.id ? "fill-opacity-" + this.id : "fill-opacity";
        lFillOpacity.innerHTML = this.labels["fill-opacity"];
        var inputFillOpacity = document.createElement("input");
        inputFillOpacity.className = "legend-styling";
        inputFillOpacity.id = this.id ? "fill-opacity-" + this.id : "fill-opacity";
        inputFillOpacity.title = params.values.opacity;
        inputFillOpacity.type = "range";
        inputFillOpacity.min = "0";
        inputFillOpacity.max = "1";
        inputFillOpacity.step = "0.1";
        inputFillOpacity.defaultValue = params.values.opacity;
        inputFillOpacity.setAttribute("data-id", "fill-opacity");
        if (inputFillOpacity.addEventListener) {
            inputFillOpacity.addEventListener("change", function (e) {
                e.target.title = e.target.value;
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    opacity : e.target.value
                }));
                self.onChangeValueLegendMapBox(e);
            });
        } else if (inputFillOpacity.attachEvent) {
            inputFillOpacity.attachEvent("onchange", function (e) {
                e.target.title = e.target.value;
                self._renderThumbnail(params.type, Object.assign(params.values, {
                    opacity : e.target.value
                }));
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
 *
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
