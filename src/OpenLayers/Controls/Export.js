// import CSS
import "../CSS/Controls/Export/GPexportOpenLayers.css";

// import OpenLayers
import Control from "ol/control/Control";

// import Style
import Style from "ol/style/Style";
import IconStyle from "ol/style/Icon";

// import local
import ID from "../../Common/Utils/SelectorID";
import Utils from "../../Common/Utils";
import Logger from "../../Common/Utils/LoggerByDefault";

// import local with ol dependencies
import KMLExtended from "../Formats/KML";
import GeoJSONExtended from "../Formats/GeoJSON";
import GPXExtended from "../Formats/GPX";

// DOM
import ExportDOM from "../../Common/Controls/ExportDOM";

var logger = Logger.getLogger("export");

/**
 * @classdesc
 *
 * Export button
 *
 * @constructor
 * @alias ol.control.Export
 * @param {Object} options - options for function call.
 * @param {String} [options.format = "geojson"] - geojson / kml / gpx
 * @param {String} [options.name = "export"] - export name
 * @param {String} [options.title = "Exporter"] - button name
 * @param {Boolean} [options.menu = false] - displays the format choice menu
 * @param {Function} [options.onExport] - callback
 * @param {DOMElement} [options.target] - target
 * @param {Object} options.control - instance of control
 * @fires export:compute
 * @example
 * // pluggued widget Export into control Isocurve
 * var iso = new ol.control.Isocurve();
 * map.addControl(iso);
 * 
 * // method : call render()
 * var export = new ButtonExport();
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setTitle("Exporter");
 * export.setMenu(false);
 * export.render(); // <-- direct call to render function !
 * export.on("export:compute", (data) => { console.log(data); });
 *
 * // method : call map.addControl()
 * var export = new ButtonExport();
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setTitle("Exporter");
 * export.setMenu(false);
 * export.on("export:compute", (data) => { console.log(data); });
 * map.addControl(export); // <-- using the OpenLayers mechanism, don't call to render function !
 * 
 * // use control options instead of setters
 * var export = new ButtonExport({
 *   control : iso,
 *   target : <!-- DOMElement -->,
 *   name : "export",
 *   format : "geojson",
 *   title : "Exporter",
 *   menu : false
 * });
 * map.addControl(export);
 * 
 * // method with passing option into the control Isocurve
 * var iso = new ol.control.Isocurve({ export : true });
 * // with control options :
 * var iso = new ol.control.Isocurve({ export : {
 *   name : "export",
 *   format : "geojson",
 *   title : "Exporter",
 *   menu : false
 * }});
 */
class ButtonExport extends Control {

    /**
     * See {@link ol.control.Export}
     * @module ButtonExport
     * @alias module:~Controls/ButtonExport
     * @param {Object} [options] - options
     * @example
     * import ButtonExport from "src/OpenLayers/Controls/Export"
     */
    constructor (options) {
        logger.trace("[constructor] Export", options);

        super({
            element : document.createElement("div"),
            render : options.render,
            target : options.target
        });

        // options
        this.options = options || {
            control : null,
            target : null,
            format : "geojson",
            name : "export",
            title : "Exporter",
            menu : false,
            onExport : null
        };

        if (!(this instanceof ButtonExport)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
         * Response to the export of the route calculation
         * (only for jsdoc)
         *
         * @example
         * // GeoJSON format
         * {
         *   "type":"FeatureCollection",
         *   "features":[...],
         *   "geoportail:compute":{
         *     "points":[ [2.588024210134887, 48.84192678293002 ] ],
         *     "transport":"Voiture",
         *     "exclusions":[...],
         *     "computation":"fastest",
         *     "results":{ <!-- Service --> }
         * }
         *
         * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.RouteResponse.html|Service}
         */
        // eslint-disable-next-line no-undef
        this.EXPORT_ROUTE = {};

        /**
         * Response to the export of the isochron calculation
         * (only for jsdoc)
         *
         * @example
         * // GeoJSON format
         * {
         *    "type":"FeatureCollection",
         *    "features":[...],
         *    "geoportail:compute":{
         *       "transport":"Pieton",
         *       "computation":"time",
         *       "exclusions":[
         *
         *       ],
         *       "direction":"departure",
         *       "point":[ 2.587835382718464, 48.84192678293002 ],
         *       "results":{
         *          "message":"",
         *          "id":"",
         *          "location":{
         *             "x":"2.587835382718464",
         *             "y":"48.84192678293002"
         *          },
         *          "srs":"EPSG:4326",
         *          "geometry":{
         *             "type":"Polygon",
         *             "coordinates":[[...]]
         *          },
         *         "time":180,
         *         "distance":""
         *      }
         *    }
         * }
         *
         * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.IsoCurveResponse.html|Service}
         */
        // eslint-disable-next-line no-undef
        this.EXPORT_ISOCHRON = {};

        /**
         * Response to the export of the profile calculation
         * (only for jsdoc)
         *
         * @example
         * // GeoJSON format
         * {
         *  "type":"FeatureCollection",
         *   "features":[...],
         *   "geoportail:compute":{
         *      "greaterSlope":76,
         *      "meanSlope":7,
         *      "distancePlus":84,
         *      "distanceMinus":48,
         *      "ascendingElevation":5,
         *      "descendingElevation":-4,
         *      "altMin":"92,04",
         *      "altMax":"96,71",
         *      "distance":163,
         *      "unit":"m",
         *      "points":[
         *        {
         *            "z":95.68,
         *           "lon":2.5874,
         *            "lat":48.8419,
         *            "acc":2.5,
         *            "dist":0,
         *            "slope":0
         *         }
         *      ]
         *   }
         * }
         *
         * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AltiResponse.html|Service}
         */
        // eslint-disable-next-line no-undef
        this.EXPORT_PROFILE = {};

        // id unique
        this.uid = this.options.id || ID.generate();

        // export
        this.extension = null;
        this.mimeType = null;

        // dom
        this.container = null;
        this.button = null;
        this.menu = null;
        this.icon = "\u2630 ";
        this.menuClassHidden = "GPexportMenuHidden";

        this.initOptions();
        this.initContainer();
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Render DOM
     *
     * @public
     */
    render () {
        // container principal
        if (!this.options.target) {
            if (this.options.control) {
                // insertion du composant dans le panneau du controle
                var container = this.options.control.getContainer();
                // ex. GP(iso|route)Panel-
                this.options.target = container.lastChild;
            }
        }
        if (this.container) {
            this.options.target.appendChild(this.container);
        }
    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //

    /**
     * Initialize options
     * (called by constructor)
     *
     * @private
     */
    initOptions () {
        if (this.options.control) {
            // ...
        }

        if (this.options.target) {
            // ...
        }

        var format = this.options.format;
        (format) ? this.setFormat(format) : this.setFormat("");

        if (!this.options.name) {
            this.setName("export");
        }

        if (!this.options.title) {
            this.setTitle("Exporter");
        }

        if (this.options.menu === undefined) {
            this.setMenu(false);
        }
    }

    /**
     * Initialize container
     * (called by constructor)
     *
     * @private
     * @todo menu des options
     */
    initContainer () {
        // TODO
        // menu des options de l'export :
        // * [ nom ]
        // * format
        // https://www.w3schools.com/howto/howto_css_dropdown.asp
        // https://www.w3schools.com/howto/howto_css_custom_checkbox.asp

        // afficher l'icone du menu
        var title = this.options.title;
        if (this.options.menu) {
            title = this.icon + this.options.title;
        }

        var div = document.createElement("div");
        div.id = this._addUID("GPexportContainer");
        div.className = "GPexportMenuContainer";

        // bouton Exporter
        // utiliser les templates literals avec la substitution ${...}
        var button = this.stringToHTML(`
            <input type="button"
                id="${this._addUID("GPexportButton")}" 
                class="GPinputSubmit"
                value="${title}">
        `);

        // add event click button
        this.button = button.firstChild;
        if (this.button) {
            this.button.addEventListener("click", (e) => this.onClickButtonExport(e));
        }
        div.appendChild(button.firstChild);

        // menu des options
        // utiliser les templates literals avec la substitution ${...}
        var menu = this.stringToHTML(`
            <div class="GPexportMenuContent ${this.menuClassHidden}">
                <label class="container">GeoJSON
                    <input type="radio" 
                        id="GPmenuFormatGeojson-${this.uid}"
                        name="format" 
                        value="geojson">
                    <span class="checkmark"></span>
                </label>
                <label class="container">KML
                    <input type="radio" 
                        id="GPmenuFormatKml-${this.uid}"
                        name="format" 
                        value="kml">
                    <span class="checkmark"></span>
                </label>
                <label class="container">GPX
                    <input type="radio" 
                        id="GPmenuFormatGpx-${this.uid}"
                        name="format" 
                        value="gpx">
                    <span class="checkmark"></span>
                </label>
            </div>
        `);

        this.menu = menu.firstChild;
        if (this.menu) {
            if (this.options.menu) {
                var className = this.menu.className;
                this.menu.className = className.replace(this.menuClassHidden, "");
            }
            var radios = this.menu.querySelectorAll(`input[type=radio][name="format"]`);
            radios.forEach((radio) => {
                // radio checked par defaut
                if (radio.id.toUpperCase().includes(this.options.format.toUpperCase())) {
                    radio.checked = true;
                }
                // ecouteur pour changer de format
                radio.addEventListener("change", (e) => {
                    this.setFormat(e.target.value);
                });
            });
        }
        div.appendChild(menu.firstChild);

        this.container = div;
    }

    /**
     * ...
     *
     * @param {String} str - ...
     * @returns {DOMElement} - ...
     * @private
     */
    stringToHTML (str) {
        var support = function () {
            if (!window.DOMParser) return false;
            var parser = new DOMParser();
            try {
                parser.parseFromString("x", "text/html");
            } catch (err) {
                return false;
            }
            return true;
        };

        // If DOMParser is supported, use it
        if (support()) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(str, "text/html");
            return doc.body;
        }

        // Otherwise, fallback to old-school method
        var dom = document.createElement("div");
        dom.innerHTML = str;
        return dom;
    }

    /**
     * ...
     * @returns {Boolean} - ...
     * @private
     */
    isPluggableControl () {
        // tester toutes les méthodes des widgets pluggable
        // la méthode getData() n'est pas obligatoire car certains widgets
        // n'ont pas de configuration.
        if (this.options.control &&
            typeof this.options.control.getContainer === "function" &&
            typeof this.options.control.getLayer === "function") {
            return true;
        }
        return false;
    }

    /**
     * ...
     * @param {Object} layer - ...
     * @param {Object} [data] - ...
     * @returns {String} - ...
     * @private
     */
    exportFeatures (layer, data) {
        var result = null;
        if (!layer) {
            logger.warn("Impossible to export : no layer is hosting features.");
            return result;
        }
        if (!layer.getSource() ||
            !layer.getSource().getFeatures() ||
            !layer.getSource().getFeatures().length) {
            logger.warn("Impossible to export : no features found.");
            return result;
        }

        // INFO
        // les styles sont bien transmis pour l'outil de dessin
        // mais, ce n'est pas toujours le cas pour certains widgets !?
        // donc, on y ajoute les styles par defaut...
        layer.getSource().getFeatures().forEach((feature) => {
            var style = feature.getStyle();
            if (!style && typeof this.options.control.getStyle === "function") {
                feature.setStyle(this.options.control.getStyle());
            }
        });

        // ajouter les metadonnées de calcul et de configuration
        var options = {};
        if (data) {
            // properties ajoutées à la racine :
            // ex. "geoportail:compute" : {}
            options.extensions = {
                "geoportail:compute" : data
            };
        }

        var ClassName = null;
        switch (this.options.format.toUpperCase()) {
            case "KML":
                options.writeStyles = true;
                ClassName = new KMLExtended(options);
                break;
            case "GPX":
                ClassName = new GPXExtended(options);
                break;
            case "GEOJSON":
                ClassName = new GeoJSONExtended(options);
                break;
            default:
                break;
        }

        if (!ClassName) {
            logger.warn("Impossible to export : format unknown !?");
            return result;
        }

        var featProj = layer.getSource().getProjection();

        // INFO
        // on determine la projection de la carte
        // si le composant a été ajouté sur la carte via le mécanisme d'OpenLayer...
        var map = this.getMap();
        if (map) {
            featProj = featProj || map.getView().getProjection();
        }

        // INFO
        // par defaut, webmercator ou "EPSG:3857"
        result = ClassName.writeFeatures(layer.getSource().getFeatures(), {
            dataProjection : "EPSG:4326",
            featureProjection : featProj || "EPSG:3857"
        });

        return result;
    }
    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //

    /**
     * ...
     * @param {*} e - Click
     */
    onClickButtonExport (e) {
        if (!this.isPluggableControl()) {
            logger.warn("Componant not pluggable with the control !");
            return;
        }

        var layer = this.options.control.getLayer();
        var data = (this.options.control.getData !== undefined) ? this.options.control.getData() : {};

        var content = this.exportFeatures(layer, data);
        if (!content || content === "null") {
            return;
        }

        /**
         * event triggered when the export is finished
         *
         * @event export:compute
         * @typedef {Object}
         * @property {Object} type - event
         * @property {Object} target - instance Export
         * @property {String} content - export data
         * @example
         * Export.on("export:compute", function (e) {
         *   console.log(e.target);
         * })
         */
        this.dispatchEvent({
            type : "export:compute",
            content : content
        });

        // INFO
        // la callback annule le download du fichier.
        if (this.options.onExport && typeof this.options.onExport === "function") {
            this.options.onExport(content);
            return;
        }

        var link = document.createElement("a");
        // determiner le bon charset !
        var charset = "utf-8";
        link.setAttribute("href", "data:" + this.mimeType + ";charset=" + charset + "," + encodeURIComponent(content));
        link.setAttribute("download", this.options.name + this.extension);
        if (document.createEvent) {
            var event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            link.dispatchEvent(event);
        } else {
            link.click();
        }
    }

    // ################################################################### //
    // ##################### public setters ############################## //
    // ################################################################### //
    /**
     * ...
     * @param {Object} control - ...
     * @public
     */
    setControl (control) {
        this.options.control = control;
    }

    /**
     * ...
     * @param {DOMElement} target - ...
     * @public
     */
    setTarget (target) {
        this.options.target = target;
    }

    /**
     * ...
     * @param {String} format - ...
     * @public
     */
    setFormat (format) {
        this.options.format = format.toUpperCase();
        switch (this.options.format) {
            case "KML":
                this.extension = ".kml";
                this.mimeType = "application/vnd.google-earth.kml+xml";
                break;
            case "GPX":
                this.extension = ".gpx";
                this.mimeType = "application/gpx+xml";
                break;
            case "GEOJSON":
                this.extension = ".geojson";
                this.mimeType = "application/geo+json";
                break;
            default:
                // redefine format by default !
                this.options.format = "GEOJSON";
                this.extension = ".geojson";
                this.mimeType = "application/geo+json";
                break;
        }
    }

    /**
     * ...
     * @param {String} name - ...
     * @public
     */
    setName (name) {
        this.options.name = name;
    }

    /**
     * ...
     * @param {String} title - ...
     * @public
     */
    setTitle (title) {
        this.options.title = title;
        if (this.button) {
            // afficher l'icone du menu / titre
            this.button.value = (this.options.menu) ? this.icon + title : title;
        }
    }

    /**
     * ...
     * @param {Boolean} active - ...
     * @public
     */
    setMenu (active) {
        this.options.menu = active;
        if (this.button) {
            // afficher l'icone du menu / titre
            this.button.value = (this.options.menu) ? this.icon + this.options.title : this.options.title;
        }
        if (this.menu && this.options.menu) {
            // afficher le menu
            var className = this.menu.className;
            this.menu.className = className.replace(this.menuClassHidden, "");
            // format par defaut
            var radios = this.menu.querySelectorAll(`input[type=radio][name="format"]`);
            radios.forEach((radio) => {
                // radio checked par defaut
                if (radio.id.toUpperCase().includes(this.options.format.toUpperCase())) {
                    radio.checked = true;
                }
            });
        }
    }

};

// on récupère les méthodes de la classe DOM
Utils.assign(ButtonExport.prototype, ExportDOM);

export default ButtonExport;

// Expose Export as ol.control.Export (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Export = ButtonExport;
}
