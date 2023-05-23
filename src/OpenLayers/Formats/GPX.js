// import openlayers
import olGPX from "ol/format/GPX";
// import Geometry
import MultiLineString from "ol/geom/MultiLineString";
import LineString from "ol/geom/LineString";
// import local
import Styling from "./Styling";
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
 * @param {String} [options.orderBy] - Sort by key the feature before writing. By default, no sorting
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

        // String ou Dom
        if (typeof source === "string") {
            this.source = Parser.parse(source);
        } else if (source !== null) {
            this.source = source;
        }

        // INFO
        // on applique les styles par defaut definis avec l'option defaultStyle
        // sauf sur les features qui possèdent des extensions.
        // les features avec extensions sont traité au préalable
        // dans la callback des options : readExtensions
        var self = this;
        features.forEach(function (feature, index, array) {
            feature.setId(index + 1);
            // HACK : enregistrement de la description de la balise 'desc' du format GPX
            var value = feature.getProperties().desc;
            if (value) {
                feature.setProperties({
                    description : value
                });
            }
            var featureStyleFunction = feature.getStyleFunction();
            if (!featureStyleFunction) {
                var styleFunction = Styling.defineStyleFunctionByDefault(self.options.defaultStyle);
                if (styleFunction) {
                    feature.setStyle(styleFunction);
                }
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
        features.forEach(function (feature, index, array) {
            // HACK : enregistrement de la description dans la balise 'desc' du format GPX
            var value = feature.getProperties().description;
            if (value) {
                feature.setProperties({
                    desc : value
                });
            }

            Styling.definePropertiesFromStyle(feature);

            // HACK : Le type surfacique n'existe pas au format GPX,
            // on doit la transformer en un lineaire.
            // Par contre, on garde un trace de la transformation :
            // * le style surfacique
            // * le type de geometrie initiale
            var type = feature.getGeometry().getType();
            if (type === "Polygon") {
                // creation d'une copie pour ne pas modifier les features de carte
                var fp = feature.clone();
                fp.set("type", type);
                fp.setGeometry(new LineString(feature.getGeometry().getCoordinates()));
                features.push(fp);
                // feature à supprimer de l'export
                array.splice(index, 1);
            } else if (type === "MultiPolygon") {
                // creation d'une copie pour ne pas modifier les features de carte
                var fm = feature.clone();
                fm.set("type", type);
                fm.setGeometry(new MultiLineString(feature.getGeometry().getCoordinates()));
                features.push(fm);
                // feature à supprimer de l'export
                array.splice(index, 1);
            }
        });

        // tri des features en fonction de la balise "number" || "id" || "order"
        if (this.options.orderBy !== undefined) {
            var key = this.options.orderBy;
            if (key) {
                var sortFct = function (a, b) {
                    var cmpA = a.get(key) || 0;
                    var cmpB = b.get(key) || 0;
                    return cmpA.toString().localeCompare(cmpB.toString(), undefined, { numeric : true });
                };
                features.sort(sortFct);
            }
        }

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
            // eslint-disable-next-line no-console
            console.warn("node not found !");
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

        // cas particulier du format GPX :
        // il n'existe pas de surfacique sur ce format, mais il est possible de forcer
        // la transformation en polygone pour des besoins particuliers de visualisation
        Styling.APPLY_CONVERT_GEOM_GPX = true;
        var style = Styling.defineStyleFromProperties(feature);
        if (style) {
            feature.setStyle(style);
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
        // <metadata>
        //   <extensions xmlns="http://www.w3.org/1999/xhtml">
        //     <data name="geoportail:compute">{...}</data>
        //   </extensions>
        // </metadata>

        var firstNodeLevelGpx = this.source.childNodes[0]; // gpx
        var searchChildNodesMeta = firstNodeLevelGpx.childNodes; // search metadata
        for (var k = 0; k < searchChildNodesMeta.length; k++) {
            var nodeMeta = searchChildNodesMeta[k];
            if (nodeMeta.nodeName === "metadata") {
                var searchChildNodesExt = nodeMeta.childNodes; // search extensions
                for (var i = 0; i < searchChildNodesExt.length; i++) {
                    var nodeExt = searchChildNodesExt[i];
                    if (nodeExt.nodeName === "extensions") {
                        var searchChildNodesData = nodeExt.childNodes; // search data
                        for (var j = 0; j < searchChildNodesData.length; j++) {
                            var nodeData = searchChildNodesData[j];
                            if (nodeData.nodeName === "data") {
                                var name = nodeData.attributes[0];
                                if (name && name.nodeName === "name") {
                                    if (name.nodeValue === key) {
                                        value = JSON.parse(nodeData.textContent);
                                        break;
                                    }
                                }
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
        var metadata = document.createElement("metadata");
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
            // <metadata>
            //   <extensions xmlns="http://www.w3.org/1999/xhtml">
            //     <data name="geoportail:compute">{...}</data>
            //   </extensions>
            // </metadata>
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
        metadata.appendChild(extensionsRoot);
        // insertion en 1ere place !
        var firstChild = doc.firstChild;
        doc.insertBefore(metadata, firstChild);
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
        Styling.getListTags().forEach(key => {
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
                case "metadata":
                    break;
                default:
                    // on ne devrait jamais passer à ce niveau !?
                    // eslint-disable-next-line no-console
                    console.warn("nodename unknown :", node.nodeName);
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
