// import openlayers
import olGPX from "ol/format/GPX";
// import Style
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import IconStyle from "ol/style/Icon";
import FillStyle from "ol/style/Fill";
import StrokeStyle from "ol/style/Stroke";
// import local
import Color from "../../Common/Utils/ColorUtils";
import Parser from "../../Common/Utils/Parser";

/**
 * @classdesc
 *
 * Extended Styles GPX format to export (internal use only !)
 *
 * SPEC
 * cf. https://www.topografix.com/gpx.asp
 *
 *
 * @constructor
 * @alias ol.format.GPXExtended
 * @extends {ol.format.GPX}
 * @type {ol.format.GPXExtended}
 * @param {Object} options - Options
 * @param {Object} [options.defaultStyle] - Styles by default
 * @param {Object} [options.extensions] - Add properties to file root
 * @param {function} [options.readExtensions] - Reading extensions (native)
 */
var GPX = (function (olGPX) {
    /**
     * See {@link ol.format.GPXExtended}
     * @module GPXExtended
     * @alias module:~Formats/GPXExtended
     * @param {*} options - options
     * @example
     * import GPXExtended from "src/OpenLayers/Formats/GPX"
     */
    function GPX (options) {
        if (!(this instanceof GPX)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        this.options = options || {};

        // INFO
        // surcharge de la callback : readExtensions
        if (this.options.readExtensions && typeof this.options.readExtensions === "function") {
            var clbk = this.options.readExtensions; // callback definie par l'utilisateur
            this.options.readExtensions = function (feature, node) {
                this.readExtensions(feature, node);
                clbk.call(this, feature, node);
            };
        } else {
            this.options.readExtensions = this.readExtensions;
        }

        // INFO
        // defaultStyle est un objet de type Style
        if (this.options.defaultStyle === null || typeof this.options.defaultStyle === "undefined") {
            this.options.defaultStyle = {};
        }

        this.source = null;

        // call constructor
        olGPX.call(this,
            this.options
        );
    }

    // Inherits
    if (olGPX) GPX.__proto__ = olGPX;

    /**
     * @lends module:GPX
     */
    GPX.prototype = Object.create(olGPX.prototype, {});

    /**
     * Constructor (alias)
     */
    GPX.prototype.constructor = GPX;

    /**
     * Balises autorisées selon la specification "simplestyle"
     */
    GPX.SIMPLESTYLE_TAGS = [
        "fill",
        "fill-opacity",
        "stroke",
        "stroke-opacity",
        "stroke-width",
        "marker-symbol",
        "marker-color",
        "marker-size"
    ];

    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.GPX.readFeatures ...
     *
     * @see ol.format.GPX.prototype.readFeatures
     * @param {Document|Node} source - Source.
     * @param {olx.format.ReadOptions=} options - options.
     * @return {Array.<ol.Feature>} Features.
     */
    GPX.prototype.readFeatures = function (source, options) {
        // INFO
        // le travail de lecture des extensions du format est porté
        // par la callback des options : readExtensions
        var features = olGPX.prototype.readFeatures.call(this, source, options);

        // Dom
        this.source = source;

        // INFO
        // on applique les styles par defaut definis avec l'option defaultStyle
        // sauf sur les features qui possèdent des extensions.
        // les features avec extensions sont traité au préalable
        // dans la callback des options : readExtensions
        features.forEach(feature => {
            // HACK : enregistrement de la description de la balise 'desc' du format GPX
            var value = feature.getProperties().desc;
            if (value) {
                feature.setProperties({
                    description : value
                });
            }
            var styleFunction = (feature, resolution) => {
                var style = null;

                if (Object.keys(this.options.defaultStyle).length === 0) {
                    return [];
                }

                var type = feature.getGeometry().getType();
                switch (type) {
                    case "Point":
                        if (this.options.defaultStyle.getImage()) {
                            style = new Style({
                                image : this.options.defaultStyle.getImage()
                            });
                        }
                        break;
                    case "LineString":
                    case "MultiLineString":
                        var options = {};
                        if (this.options.defaultStyle.getFill()) {
                            options.fill = this.options.defaultStyle.getFill();
                        }
                        if (this.options.defaultStyle.getStroke()) {
                            options.stroke = this.options.defaultStyle.getStroke();
                        }
                        style = new Style(options);
                        break;
                }
                return [style];
            };
            var featureStyleFunction = feature.getStyleFunction();
            if (!featureStyleFunction) {
                feature.setStyle(styleFunction);
            }
        });
        return features;
    };

    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GPX.writeFeatures ...
     *
     * @see ol.format.GPX.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @return {String} Result or null.
     */
    GPX.prototype.writeFeatures = function (features, options) {
        // INFO
        // il n'est pas possible de surcharger les parsers d'OpenLayers (private),
        // on decide de (re)parser la sortie d'OpenLayers afin d'y placer les balises
        // d'extensions

        // on met à jour les properties de styles
        features.forEach(function (feature) {
            // HACK : enregistrement de la description dans la balise 'desc' du format GPX
            var value = feature.getProperties().description;
            if (value) {
                feature.setProperties({
                    desc : value
                });
            }
            var style = feature.getStyle();
            if (style) {
                // style ajouté via une fonction, pour les styles par defaut par ex.
                if (typeof style === "function") {
                    var styles = style.call(this, feature, 0);
                    if (styles && styles.length !== 0) {
                        style = styles[0];
                    } else {
                        // au cas où...
                        return;
                    }
                }

                // convertir le style en properties
                // * stroke
                // * fill (impossible car pas de polygone sur le GPX !)
                // * image :
                //      * un marker
                //      * un cercle si fill et/ou stroke est present !

                var fill = style.getFill();
                if (fill) {
                    var colorFill = null;
                    if (Color.isRGB(fill.getColor())) {
                        colorFill = Color.rgbaToHex(fill.getColor());
                        feature.set("fill", colorFill.hex);
                        feature.set("fill-opacity", colorFill.opacity);
                    } else {
                        colorFill = fill.getColor();
                        feature.set("fill", colorFill);
                        feature.set("fill-opacity", 1);
                    }
                }
                var stroke = style.getStroke();
                if (stroke) {
                    var colorStroke = null;
                    if (Color.isRGB(stroke.getColor())) {
                        colorStroke = Color.rgbaToHex(stroke.getColor());
                        feature.set("stroke", colorStroke.hex);
                        feature.set("stroke-opacity", colorStroke.opacity);
                    } else {
                        colorStroke = stroke.getColor();
                        feature.set("stroke", colorStroke);
                        feature.set("stroke-opacity", 1);
                    }
                    feature.set("stroke-width", stroke.getWidth());
                }
                var image = style.getImage();
                if (image) {
                    // si le tag image est seul...
                    // c'est soit un marker ou soit un cercle !
                    if (image instanceof IconStyle) {
                        var color = image.getColor();
                        // array
                        if (Array.isArray(color)) {
                            var c = "rgba(";
                            c += color[0] + ",";
                            c += color[1] + ",";
                            c += color[2] + ",";
                            c += color[3] + ")";
                            color = c;
                        }
                        // feature.set("marker-color", ""); // par defaut
                        if (color) {
                            var colorIcon = Color.rgbaToHex(color);
                            feature.set("marker-color", colorIcon.hex);
                        }
                        var scaleIcon = image.getScale();
                        switch (scaleIcon) {
                            case 0.5:
                                feature.set("marker-size", "small");
                                break;
                            case 1:
                                feature.set("marker-size", "medium");
                                break;
                            case 1.5:
                                feature.set("marker-size", "large");
                                break;
                            default:
                                // feature.set("marker-size", ""); // par defaut
                                break;
                        }
                        // feature.set("marker-symbol", ""); // par defaut
                        var srcImage = image.getSrc();
                        if (srcImage) {
                            feature.set("marker-symbol", srcImage);
                        }
                    } else {
                        var fillImg = image.getFill();
                        if (fillImg) {
                            var colorFillImg = null;
                            if (Color.isRGB(fillImg.getColor())) {
                                colorFillImg = Color.rgbaToHex(fillImg.getColor());
                                feature.set("fill", colorFillImg.hex);
                                feature.set("fill-opacity", colorFillImg.opacity);
                            } else {
                                colorFillImg = fillImg.getColor();
                                feature.set("fill", colorFillImg);
                                feature.set("fill-opacity", 1);
                            }
                        }
                        var strokeImg = image.getStroke();
                        if (strokeImg) {
                            var colorStrokeImg = null;
                            if (Color.isRGB(strokeImg.getColor())) {
                                colorStrokeImg = Color.rgbaToHex(strokeImg.getColor());
                                feature.set("stroke", colorStrokeImg.hex);
                                feature.set("stroke-opacity", colorStrokeImg.opacity);
                            } else {
                                colorStrokeImg = strokeImg.getColor();
                                feature.set("stroke", colorStrokeImg);
                                feature.set("stroke-opacity", 1);
                            }
                            feature.set("stroke-width", strokeImg.getWidth());
                        }
                    }
                }
            }
        });

        // nodes
        var gpxNode = olGPX.prototype.writeFeaturesNode.call(this, features, options);
        if (gpxNode === null) {
            return null;
        }

        // on ajoute les extensions à la racine pour les metadonnées de calcul
        if (this.options.hasOwnProperty("extensions")) {
            writeRootExtensions_(gpxNode, this.options.extensions);
        }

        // INFO
        // à chaque fois qu'un style est trouvé dans un feature,
        // on appelle la fonction d'insertion des balises extensions dans le DOM.
        processExtensions_(gpxNode, features, {
            extensions : writeExtensions_
        });

        // dom -> string
        var gpxStringExtended = Parser.toString(gpxNode);
        if (!gpxStringExtended) {
            return null;
        }

        // format string
        var gpxStringFormatted = Parser.format(gpxStringExtended);
        if (gpxStringFormatted === "") {
            return null;
        }

        return gpxStringFormatted;
    };

    /**
     * Callback to read extensions from options : readExtensions
     *
     * @param {*} feature - ...
     * @param {*} node - ...
     */
    GPX.prototype.readExtensions = function (feature, node) {
        var _node = node;
        // recherche de la properties de type Node ou Element
        // si le node n'est pas renseigné...
        if (!node) {
            var props = feature.getProperties();
            for (const key in props) {
                if (Object.hasOwnProperty.call(props, key)) {
                    const element = props[key];
                    if (element instanceof Node) {
                        _node = element;
                        break;
                    }
                }
            }
        }

        if (!_node) {
            return;
        }

        // ex. de nodes :
        // <extensions>
        //     <marker-size>medium</marker-size>
        //     <marker-symbol></marker-symbol>
        //     <marker-color>#ffffff</marker-color>
        // </extensions>
        for (var index = 0; index < _node.childNodes.length; index++) {
            var element = _node.childNodes[index];
            if (element.nodeType === 1) {
                feature.set(element.nodeName, element.textContent);
            }
        }

        // les options de styles
        var options = {};

        // properties :
        // "marker-size" -> icon
        // "marker-symbol" -> icon
        // "marker-color" -> icon
        var marker = null;
        if (feature.get("marker-color") ||
            feature.get("marker-size") ||
            feature.get("marker-symbol")) {
            marker = {};
            // icone par defaut
            marker["src"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAToSURBVFiF3VhdbFNlGH7ec05/F6IUE9GLIYgXXYpXJBBZE0xM9EausIl6ObzBGSHRdnEJ1p+RhnBBNF4YY/xJFigNaIwxLpFYB2WwMWCW0bG1W7eEdUBwQ0fb7fy83nQJjK3nnO90F/okvTnf+7zP+/Q75/ve7wP+R6BGJ4xGo+skSXqFmfcAaAHwFIANAO4CmCai64Zh/OT3+3+Nx+PzjdRumJmOjo71zNwB4B0APguUMjN/vri4mDh27NhcI2poiJloNLqXiL4EEBCg/8XMbx05cuS00zpkh3yKxWKHiOgLAH7BHD4iiuzatcvIZDJnnRTjyEw0Gv2QiD6C8xkmInqxtbVVy2QyvcJJRIm1V+ukkxwrwCCivYlE4gcRslAhBw4ceNzj8RQg9o2YYZaInk0kErN2iZKImtvt/gBrYwQA1gN4X4Roe2ai0eg6IroFa8uvKMo+n+9Ju/uQYleltiGaGnG73eVIJNIfDAa3yLK8Udf1mVwuN55MJneoqmrG91er1ZcBnLJVm51gAKjt7HXhdrvLnZ2d46FQaLcsy80A3LIsN4dCod2dnZ15l8tVaYTOcoh8M0GzgEgk0u/xeEIrjXm93m2RSOSiBZ0Wu4WJmHnaLCAYDG6pN97S0rK5ETrLIWJmg1mALMsbnYzX8ITlimoQMfOPWYCu6zMm4yULOn9brqgGETO3zAJyudx4vfFr164VzXIwc90/ZCWImOk3C0gmkzuq1Wp2pbFyuZxNpVI7zXIQkanOcoiY+d0sQFVVX1dX19ZsNpvWdX0SwKKu65NDQ0Ppw4cPP6dpmtcsBzOn7RZme9P0+XynK5XKZwAeqxenqqqvu7t79wOPNtV+VnDPMAzb5xvbM1NrMb6xy7OJr48ePXrfLkmo0SSijwHcFuFawG0i+lSEKGSm1p4fFOFawEGR9h9weLCKxWLdAN5wkuNBMPPxEydOvC1JksfD7Fsg8riYSdMlFwAosqFqkmQQUcW9sHB/282bcylAX+LbXgCWYT+AFwA84zAPVFWdO9PTM+WWpHcBQCeCAoCJICsMAGAQZGaAGZrLhcubNutbGUVF4rMjxWLR8ZE3Fou1AkjDwX0CM/OVwcHvJwqFomgKDfjO6e0MMpnMVDgc9gIIi+YoTU+fyw4NXXFQBpFh3BFaAJbD6/UeAmClrX8ElXK5dOnixT+c6BuAoUtSoSFm4vG4ZhjGm7DQhD5UhGGoAwMDp1RV1c2jVwHzIsny6WKxOOP4NVvC+fPnZ8Ph8F0Ar1rlFPL5X8bHxuo2pXXADIx4df3kjcnJSWANLs5jsdhJAK+Zxd2bmxv5racnKSBRYeY/oSiDhULhoY3b6dL8CDRN209EL8myvH7VGFW9f6Gv72erOZlJA3GeJWm4ubk5l06ntZXiGj4zANDe3r6nqanpx1Xyc/bq1eOjN26M1cvBTKoEY4IkadiQ5ZF8Pr9gprsmZgCgvb29u6mp6ZHuYKZUupDp7e1ZhVYB0bgEjLr8/tzw8PCiHc2Gv2ZLmJ+fb1MUpdXj8TQvPatWq3f6+/rOPBjHQBnMY4okXX9++/Z8KpUSXtnWbGYAYN++fTsDgUAvEbkMw9AvnDv3ValUugXgHojyMjD6+sTEWBwwGqG3pmYAoK2t7ZNAIPDe1OTUqSuXBr6FouRGR0enAfBaa/+n8S8PPeWMetb8+wAAAABJRU5ErkJggg==";
            marker["anchor"] = [0.5, 1];
            var symbolMarker = feature.get("marker-symbol");
            if (symbolMarker) {
                if (symbolMarker.search("data:image/png;base64") !== -1) {
                    // icone du portail
                    marker["src"] = symbolMarker;
                } else {
                    // TODO
                    // utiliser les symboles de Maki
                    // (cf. https://labs.mapbox.com/maki-icons/)
                }
            }
            var colorMarker = feature.get("marker-color");
            if (Color.isHex(colorMarker)) {
                marker["color"] = Color.hexToRgba(colorMarker, 1);
            }
            var size = feature.get("marker-size");
            if (size) {
                switch (size) {
                    case "small":
                        marker["scale"] = 0.5;
                        break;
                    case "medium":
                        marker["scale"] = 1;
                        break;
                    case "large":
                        marker["scale"] = 1.5;
                        break;
                    default:
                        marker["scale"] = 1;
                        break;
                }
            }
        }

        // properties :
        // "stroke" -> line / circle
        // "stroke-opacity" -> line / circle
        // "stroke-width" -> line / circle
        var stroke = null;
        if (feature.get("stroke") ||
            feature.get("stroke-opacity") ||
            feature.get("stroke-width")) {
            stroke = {};
            stroke["color"] = Color.hexToRgba(feature.get("stroke"), feature.get("stroke-opacity") || 1);
            stroke["width"] = feature.get("stroke-width") || 1;
        }

        // properties :
        // "fill" -> circle
        // "fill-opacity" -> circle
        var fill = null;
        if (feature.get("fill") ||
            feature.get("fill-opacity")) {
            fill = {};
            fill["color"] = Color.hexToRgba(feature.get("fill"), feature.get("fill-opacity") || 1);
        }

        // styles en fonction du type de geometrie
        var type = feature.getGeometry().getType();
        switch (type) {
            case "Point":
                // representer un point de depart ou d'arrivée
                if (marker) {
                    options["image"] = new IconStyle(marker);
                }

                // representer un point intermediaire
                var optionsCircle = {};
                if (stroke) {
                    optionsCircle["stroke"] = new StrokeStyle(stroke);
                }
                if (fill) {
                    optionsCircle["fill"] = new FillStyle(fill);
                }
                if (Object.keys(optionsCircle).length !== 0) {
                    optionsCircle["radius"] = 6; // param fixe
                    options["image"] = new CircleStyle(optionsCircle);
                }
                break;

            case "LineString":
            case "MultiLineString":
                if (stroke) {
                    options["stroke"] = new StrokeStyle(stroke);
                }
                break;

            default:
                break;
        }
        // si aucun style disponible, on utilisera le style par defaut defini
        // par l'utilisateur ou l'application
        if (Object.keys(options).length !== 0) {
            feature.setStyle(new Style(options));
        }
    };

    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     * @todo
     */
    GPX.prototype.readRootExtensions = function (key) {
        var value = {};
        // Rechercher :
        // <extensions xmlns="http://www.w3.org/1999/xhtml">
        //    <data name="geoportail:compute">{...}</data>
        // </extensions>

        var firstNodeLevelGpx = this.source.childNodes[0]; // gpx
        var childNodesLevel = firstNodeLevelGpx.childNodes;
        for (var i = 0; i < childNodesLevel.length; i++) {
            var node1 = childNodesLevel[i];
            if (node1.nodeName === "extensions") {
                var childNodesExtensions = node1.childNodes;
                for (var j = 0; j < childNodesExtensions.length; j++) {
                    var node2 = childNodesExtensions[j];
                    if (node2.nodeName === "data") {
                        var name = node2.attributes[0];
                        if (name && name.nodeName === "name") {
                            if (name.nodeValue === key) {
                                value = JSON.parse(node2.textContent);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return value;
    };

    /**
     * ...
     *
     * @param {*} doc - ...
     * @param {*} extensions - ...
     * @param {Boolean} [xml=false] - write tag xml or json
     */
    function writeRootExtensions_ (doc, extensions, xml) {
        // TODO namespace ?
        var extensionsRoot = document.createElement("extensions");
        // INFO
        // convert JSON to XML (dom)
        // * type string :
        // { typestring: "string" } -> <typestring>string</typestring>
        //
        // * type object :
        // { typeobject: { typestring1: "string", typestring2: "string" } }
        // -> <typeobject>
        //      <typestring1>string</typestring1>
        //      <typestring2>string</typestring2>
        //    </typeobject>
        //
        // * type array :
        // { typearray : ["item1", "item2"] }
        // -> <typearray type="array" index=2>
        //      <value>item1</value>
        //      <value>item2</value>
        //    </typearray>
        //
        // * type array of array
        // -> <typearray type="array" index=1>
        //      <value type="array" index=2>
        //          <value>1</value>
        //          <value>2</value>
        //      </value>
        //    </typearray>
        //
        // * type array of object
        // -> <typearray type="array" index=2>
        //      <value>
        //          <typestring1>string</typestring1>
        //          <typestring2>string</typestring2>
        //      </value>
        //      <value>
        //          <typestring1>string</typestring1>
        //          <typestring2>string</typestring2>
        //      </value>
        //    </typearray>
        function toDOM (node, json) {
            for (const key in json) {
                if (Object.hasOwnProperty.call(json, key)) {
                    var element = json[key] || ""; // au cas où...
                    var tag = document.createElement(key);
                    // eslint-disable-next-line valid-typeof
                    if (typeof element === "string" || typeof element === "number") {
                        tag.innerHTML = element;
                        node.appendChild(tag);
                    } else if (element instanceof Array) {
                        tag.setAttribute("type", "array");
                        tag.setAttribute("index", element.length);
                        for (let index = 0; index < element.length; index++) {
                            var item = element[index] || ""; // au cas où...
                            var n = document.createElement("value");
                            if (typeof item === "string" || typeof item === "number") {
                                n.innerHTML = item;
                                tag.appendChild(n);
                            } else if (item instanceof Array) {
                                n.setAttribute("type", "array");
                                n.setAttribute("index", item.length);
                                for (let i = 0; i < item.length; i++) {
                                    var value = item[i] || ""; // au cas où...
                                    var k = document.createElement("value");
                                    if (typeof value === "string" || typeof value === "number") {
                                        k.innerHTML = value;
                                        n.appendChild(k);
                                    }
                                }
                                tag.appendChild(n);
                            } else if (item instanceof Object) {
                                tag.appendChild(toDOM(n, item));
                            } else {
                                // "Unknown element !"
                            }
                        }
                        node.appendChild(tag);
                    } else if (element instanceof Object) {
                        node.appendChild(toDOM(tag, element));
                    } else {
                        // "Unknown element !"
                    }
                }
            }
            return node;
        }

        if (xml) {
            // structure xml
            toDOM(extensionsRoot, extensions);
        } else {
            // structure json par defaut
            // ex.
            // <extensions xmlns="http://www.w3.org/1999/xhtml">
            //    <data name="geoportail:compute">{...}</data>
            // </extensions>
            for (const key in extensions) {
                if (Object.hasOwnProperty.call(extensions, key)) {
                    const value = extensions[key];
                    var dataElement = document.createElement("data");
                    dataElement.setAttribute("name", key);
                    var data = document.createTextNode(JSON.stringify(value));
                    dataElement.appendChild(data);
                    extensionsRoot.appendChild(dataElement);
                }
            }
        }
        // insertion en 1ere place !
        var firstChild = doc.firstChild;
        doc.insertBefore(extensionsRoot, firstChild);
    };

    /**
     * ...
     *
     * @param {Object} feature - ...
     * @param {DOMElement} node - ...
     * @private
     */
    function writeExtensions_ (feature, node) {
        // creation du DOM
        var extensionsNode = document.createElementNS(node.parentNode.namespaceURI, "extensions");
        GPX.SIMPLESTYLE_TAGS.forEach(key => {
            if (feature.get(key)) {
                var extension = document.createElementNS(node.parentNode.namespaceURI, key);
                extension.innerHTML = feature.get(key);
                extensionsNode.appendChild(extension);
            }
        });
        node.appendChild(extensionsNode);
    }

    /**
     * ...
     *
     * @param {DOMElement} doc - ...
     * @param {Object} features - ...
     * @param {Object} actions - ...
     * @private
     */
    function processExtensions_ (doc, features, actions) {
        // INFO
        // OpenLayers ne gère pas tous les tags du format GPX : ex. metadata
        // Liste des tags :
        // * wpt
        // * rte
        // * trk
        // On peut y placer nos balises extensions.

        var index = -1;
        var nodes = doc.childNodes;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            switch (node.nodeName) {
                case "wpt":
                case "rte":
                case "trk":
                    index++;
                    var feature = features[index];
                    var style = feature.getStyle();
                    if (style) {
                        var fct = actions.extensions;
                        if (fct && typeof fct === "function") {
                            fct(feature, node);
                        }
                    }
                    break;
                default:
                    // on ne devrait jamais passer à ce niveau !?
                    // sauf si OpenLayers ajoute le noeud "metadata"...
                    break;
            }
        }
    }
    return GPX;
}(olGPX));

export default GPX;

// Expose GPX as ol.source.GPXExtended. (for a build bundle)
if (window.ol && window.ol.format) {
    window.ol.format.GPXExtended = GPX;
}
