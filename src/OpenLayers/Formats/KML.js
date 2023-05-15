// import openlayers
import olKML from "ol/format/KML";
import {
    Fill,
    Icon,
    Stroke,
    Style,
    Text,
    Circle
} from "ol/style";
// import local
import Color from "../../Common/Utils/ColorUtils";
import Logger from "../../Common/Utils/LoggerByDefault";
import Parser from "../../Common/Utils/Parser";
import Utils from "../../Common/Utils";
// import $__xmldom from "xmldom";

var logger = Logger.getLogger("extended KML format");

/**
 * @classdesc
 *
 * Extended Styles KML format to export (internal use only !)
 *
 * INFO
 * only ol.Control is a user-extendable class.
 * Everything else requires integration with the original openlayers source and a new ol.js
 * to be built with your new classes incorporated.
 *
 * SPEC
 * cf. https://developers.google.com/kml/forum/advanced
 *
 * ISSUES
 * cf. https://github.com/openlayers/openlayers/issues/4829
 * cf. https://github.com/openlayers/openlayers/issues/4460
 * cf. https://github.com/openlayers/openlayers/pull/5590
 * cf. https://github.com/openlayers/openlayers/issues/5229
 * cf. https://github.com/openlayers/openlayers/issues/3371
 *
 * @constructor
 * @alias ol.format.KMLExtended
 * @type {ol.format.KMLExtended}
 * @extends {ol.format.KML}
 * @param {Object} options - Options
 * @param {Object} [options.extensions] - Add properties to file root
 */
var KML = (function (olKML) {
    /**
     * See {@link ol.format.KMLExtended}
     * @module KMLExtended
     * @alias module:~Formats/KMLExtended
     * @param {*} options - options
     * @example
     * import KMLExtended from "src/OpenLayers/Formats/KML"
     */
    function KML (options) {
        if (!(this instanceof KML)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        options = options || {};

        // INFO
        // source DOM (Document ou Node)
        this.source = null;

        // INFO
        // gestion des extensions
        this.extensions = options.extensions || null;

        // INFO
        // defaultStyle est un tableau d'objet de type Style
        if (options.defaultStyle && !Array.isArray(options.defaultStyle)) {
            options.defaultStyle = [options.defaultStyle];
        }

        if (options.defaultStyle === null || typeof options.defaultStyle === "undefined") {
            options.defaultStyle = [];
        }

        // call constructor
        olKML.call(this, options);

    }

    // Inherits
    if (olKML) KML.__proto__ = olKML;

    /*
     * @lends module:KML
     */
    KML.prototype = Object.create(olKML.prototype, {});

    /**
     * Constructor (alias)
     *
     * En lecture, on surcharge la méthode readFeatures.
     * ✔️ In : kml string + features du format original
     * ✔️ Out : features étendus avec des styles, et des metadatas (name ou extendData)
     * > on modifie les features du format original avec les fonctionnalités non gérées.
     *
     * En écriture, on surcharge la méthode writeFearures.
     * ✔️ In : kml du format original + features étendus
     * ✔️ Out : kml étendu avec des styles, et des metadatas (name ou extendData)
     * > on modifie le kml généré par le format original avec les fonctionnalités que nous avons ajoutées aux features.
     *
     * Le principe
     * On parse le kml, et on lit (get) ou on ajoute (set) des fonctionnalités.
     *
     * Les getters vont lire le kml (ex. LabelExtendStyle), et ajouter le style ainsi que le nom du label dans le feature original.
     * getLabelIconStyle (appel des 2 fonctions suivantes)
     * getLabelExtendStyle (New)
     * getHotSpotIconStyle (Bug sur la lecture du  hotspot)
     * getExtendData (New)
     *
     * Les setters vont écrire dans le dom du kml original les fonctionnalités ajoutées dans les features.
     * setLabelExtendStyle (New)
     * setHotSpotIconStyle (Bug sur l'écriture du hotspot)
     * setNameData (Bug suppression de cette balise du format par défaut).
     *
     */
    KML.prototype.constructor = KML;

    /**
     * Fonction de lecture du KML avec fonction de traitement en fonction du type
     * PlaceMark (Label ou Marker).
     * Les traitements sont de 2 types :
     *  - creation de styles étendus ou correctifs sur le KML
     *  - ajout de styles étendus sur les features
     *
     * @param {DOMElement} kmlNode - kml nodes
     * @param {Object[]} features - features
     * @param {Object} process - process
     *
     * @example
     * // ajoute des fonctionnalités dans le KML
     * _kmlRead(kmlDoc, {
     *   labelStyle : createStyleLabel,
     *   iconStyle  : createStyleIcon
     * });
     *
     * // lit des fonctionnalités du KML non impl. par OpenLayers
     * _kmlRead(kmlNode, {
     *   labelStyle : getStyleToFeatureLabel,
     *   iconStyle  : getStyleToFeatureIcon,
     *   extendedData : getExtendedData
     * });
     */
    function _kmlRead (kmlNode, features, process) {
        var firstNodeLevel = (kmlNode.nodeName === "#document") ? kmlNode.childNodes[0].childNodes : kmlNode.childNodes;

        // Si le DOM contient un seul objet, le noeud est directement un PlaceMark
        // sinon, c'est un ensemble de noeuds PlaceMark contenus dans le noeud Document.
        var nodes = firstNodeLevel;
        for (var ik = 0; ik < firstNodeLevel.length; ik++) {
            const element = firstNodeLevel[ik];
            if (element.nodeName === "Document") {
                nodes = element.childNodes;
                break;
            }
            if (element.nodeName === "Placemark") {
                nodes = [element];
                break;
            }
        }

        // On recherche les PlaceMark de type Point ayant un Style...
        // Le style peut être placé directement dans le PlaceMark
        // ou lié avec un id (share)
        var stylesUrl = {}; // listes des styles
        var index = -1; // index du features...
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            switch (node.nodeName) {
                case "Style":
                    // INFO
                    // pour le traitement des balises Styles liées avec styleUrl,
                    // elles doivent être toujours déclarées avant les PlaceMark !
                    // On ne prend en compte que celles qui sont identifiées via un ID !
                    var id = node.attributes[0];
                    if (id && id.nodeName === "id") {
                        var _k = id.nodeValue;
                        var _v = node;
                        stylesUrl[_k] = _v;
                    }
                    break;

                case "Placemark":

                    index++;
                    var types = node.childNodes; // Point, LineString, Polygon, Style, ...
                    var point = false;
                    var styles = null; // dom
                    var extend = null; // dom
                    var name = node;
                    for (var j = 0; j < types.length; j++) {
                        switch (types[j].nodeName) {
                            case "Point":
                                point = true;
                                break;
                            case "Style":
                                styles = types[j].childNodes; // liste de styles
                                break;
                            case "styleUrl":
                                // style avec lien vers...
                                var _idStyle = types[j].textContent.slice(1);
                                if (stylesUrl[_idStyle]) {
                                    styles = stylesUrl[_idStyle].childNodes;
                                }
                                break;
                            case "ExtendedData":
                                extend = types[j].childNodes;
                                break;
                            case "name":
                                name = null;
                                break;
                            default:
                                // on ne traite pas les autres informations ...
                                // car elles seront gérées par defaut par le format standard...
                        }
                    }

                    // On traite les balises kml:extendedData pour tous les objets !
                    if (extend) {
                        logger.log("ExtendedData :", extend);
                        var fctExtend = process.extendedData;
                        if (fctExtend && typeof fctExtend === "function") {
                            fctExtend(features[index], extend);
                        }
                    }

                    //  On traite la balise kml:name
                    // (si elle n'existe plus lors de l'ecriture...)
                    if (name) {
                        logger.log("Name :", name);
                        var fctName = process.nameData;
                        if (fctName && typeof fctName === "function") {
                            fctName(features[index], name);
                        }
                    }

                    // On a un Marker avec un Style.
                    // Les markers sans styles seront gérées par defaut par le format standard...
                    // Il peut être associé avec un Label !
                    if (point && styles) {
                        // Les Styles !
                        if (styles.length) {
                            var labelStyle = null;
                            var iconStyle = null;
                            // On recherche le type de Style
                            for (var k = 0; k < styles.length; k++) {
                                switch (styles[k].nodeName) {
                                    case "LabelStyle":
                                        labelStyle = styles[k];
                                        break;
                                    case "IconStyle":
                                        iconStyle = styles[k];
                                        break;
                                    default:
                                        // on ne traite pas les autres informations ...
                                }
                            }

                            // Pour un label, il nous faut un titre !
                            var labelName = features[index].getProperties().name;
                            var labelDescription = features[index].getProperties().description;
                            var value = labelName || labelDescription;
                            logger.trace(value);
                            
                            // C'est uniquement un Label !
                            if (!iconStyle && labelStyle) {
                                var fctLabel = process.labelStyle;
                                if (fctLabel && typeof fctLabel === "function") {
                                    fctLabel(features[index], labelStyle);
                                }
                            // C'est uniquement un marker !
                            } else if (iconStyle && !labelStyle) {
                                var fctIcon = process.iconStyle;
                                if (fctIcon && typeof fctIcon === "function") {
                                    fctIcon(features[index], iconStyle);
                                }
                            // C'est un marker avec un label !
                            } else if (iconStyle && labelStyle) {
                                var fctIconLabel = process.iconLabelStyle;
                                if (fctIconLabel && typeof fctIconLabel === "function") {
                                    fctIconLabel(features[index], iconStyle, labelStyle);
                                }
                            }
                        }
                    }

                    break;
                default:
                    logger.trace("tag is not processing !");
            }
        }
    };

    /**
     * Write Extend for Features.
     * This function overloads ol.format.KML.writeFeatures ...
     *
     * @see ol.format.KML.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @return {String} kml string formatted
     */
    KML.prototype.writeFeatures = function (features, options) {
        logger.log("overload : ol.format.KML.writeFeatures");
        var kmlNode = olKML.prototype.writeFeaturesNode.call(this, features, options);
        if (kmlNode === null) {
            return null;
        }

        // on ajoute les extensions à la racine pour les metadonnées de calcul
        if (this.hasOwnProperty("extensions")) {
            _writeRootExtensions(kmlNode, this.extensions);
        }

        // On ajoute les styles étendus
        var kmlStringExtended = _writeExtendStylesFeatures.call(this, kmlNode, features, options);

        // On realise un formattage du KML
        var kmlStringFormatted = Parser.format(kmlStringExtended);
        if (kmlStringFormatted === "") {
            return null;
        }

        return kmlStringFormatted;
    };

    /**
     * Write Extended Styles for each features
     *
     * @param {DOMElement} kmlNode - kml nodes
     * @param {Object[]} features - features
     * @param {Object} options - options
     *
     * @returns {String} kml string extended
     *
     * @private
     */
    function _writeExtendStylesFeatures (kmlNode, features, options) {

        // RGB Colors (RRGGBB) To KML Colors (AABBGGRR)
        function __convertRGBColorsToKML (data, opacity) {
            var strColor = data.toString(16);

            if (strColor.charAt(0) === "#") {
                strColor = strColor.slice(1);
            }

            opacity = opacity || 1;
            opacity = parseInt(opacity * 255, 10);
            opacity = opacity.toString(16);
            var color = opacity;
            color = color + strColor.substr(4, 2);
            color = color + strColor.substr(2, 2);
            color = color + strColor.substr(0, 2);
            return color.toLowerCase();
        }

        /**
         * C'est un Label !
         * On va donc y ajouter qq styles sur le Label (police, halo, ...) :
         * Insertion : PlaceMark>Style>LabelStyle
         *
         * @param {Object} feature - feature
         * @param {DOMElement} style - style
         *
         * @example
         *      <LabelStyleSimpleExtensionGroup fontFamily="Arial" haloColor="16777215" haloRadius="2" haloOpacity="1"/>
         */
        var __createExtendedStyleLabel = function (feature, style) {
            logger.trace("label with style :", style);

            if (!feature) {
                return;
            }

            var labelName = feature.getProperties().name;
            if (!labelName) {
                return;
            }

            // Si pas de style defini, c'est donc que l'on va utiliser celui par defaut...
            if (feature.getStyle() instanceof Style) {
                var fTextStyle = feature.getStyle().getText().getStroke();

                if (!fTextStyle) {
                    return;
                }

                var _haloColor = __convertRGBColorsToKML("#FFFFFF"); // Par defaut
                var color = fTextStyle.getColor();
                // array ?
                if (Array.isArray(color)) {
                    var cf = "rgba(";
                    cf += color[0] + ",";
                    cf += color[1] + ",";
                    cf += color[2] + ",";
                    cf += color[3] + ")";
                    color = cf;
                }
                if (Color.isRGB(color)) {
                    var colorHex = Color.rgbaToHex(color);
                    _haloColor = __convertRGBColorsToKML(colorHex.hex, colorHex.opacity);
                } else {
                    _haloColor = __convertRGBColorsToKML(color);
                }
                var _haloRadius = fTextStyle.getWidth() || "0";
                var _haloOpacity = "1"; // TODO lire param
                var _font = "Sans"; // TODO lire param

                if (style && style.getElementsByTagName("LabelStyleSimpleExtensionGroup").length === 0) {
                    var labelExtended = document.createElementNS(kmlNode.namespaceURI, "LabelStyleSimpleExtensionGroup");
                    labelExtended.setAttribute("fontFamily", _font);
                    labelExtended.setAttribute("haloColor", _haloColor);
                    labelExtended.setAttribute("haloRadius", _haloRadius);
                    labelExtended.setAttribute("haloOpacity", _haloOpacity);
                    style.appendChild(labelExtended);
                }
            }
        };

        /**
         * C'est un marker !
         * On va donc ajouter la balise hotspot :
         *  Traiter le cas où les unités sont de type
         *   - FRACTION
         *   - PIXELS
         *  Insertion du correctif dans le noeud : <PlaceMark><Style>IconStyle
         *
         * @param {Object} feature - ol feature
         * @param {DOMElement} style - style
         *
         *  @example
         *  <Style><IconStyle>
         *      <hotSpot x="0.5"  y="1" xunits="fraction" yunits="fraction"/>
         *  </IconStyle></Style>
         */
        var __createExtendedStyleIcon = function (feature, style) {
            logger.trace("marker with style (hotspot):", style);

            if (!feature) {
                return;
            }

            // Si pas de style defini, c'est donc que l'on va utiliser celui par defaut...
            if (feature.getStyle() instanceof Style) {
                var fImageStyle = feature.getStyle().getImage();

                if (!fImageStyle) {
                    return;
                }

                if (fImageStyle instanceof Icon) {

                    var x = 0;
                    var y = 0;
                    var xunits = "pixels";
                    var yunits = "pixels";
    
                    var size = fImageStyle.getSize();
                    var anchor = fImageStyle.getAnchor(); // pixels ! but anchor_ in the current unit !
    
                    if (anchor.length) {
                        x = anchor[0];
                        y = anchor[1];
                        if (yunits === "fraction") {
                            y = (y === 1) ? 0 : 1 - y; // cf. fixme contribution à faire !
                        } else {
                            y = (yunits === "pixels" && y === size[1]) ? 0 : size[1] - y; // cf. fixme contribution à faire !
                        }
                    }
    
                    if (style && style.getElementsByTagName("hotSpot").length === 0) {
                        var hotspot = document.createElementNS(kmlNode.namespaceURI, "hotSpot");
                        hotspot.setAttribute("x", x);
                        hotspot.setAttribute("y", y);
                        hotspot.setAttribute("xunits", xunits);
                        hotspot.setAttribute("yunits", yunits);
                        style.appendChild(hotspot);
                    }
                }

                if (fImageStyle instanceof Circle) {
                    var strokeColor = null;
                    var strokeWidth = null;
                    if (fImageStyle.getStroke()) {
                        strokeWidth = fImageStyle.getStroke().getWidth();
                        strokeColor = fImageStyle.getStroke().getColor();
                        // array ?
                        if (Array.isArray(strokeColor)) {
                            var cf = "rgba(";
                            cf += strokeColor[0] + ",";
                            cf += strokeColor[1] + ",";
                            cf += strokeColor[2] + ",";
                            cf += strokeColor[3] + ")";
                            strokeColor = cf;
                        }
                        if (Color.isRGB(strokeColor)) {
                            var colorHex = Color.rgbaToHex(strokeColor);
                            strokeColor = __convertRGBColorsToKML(colorHex.hex, colorHex.opacity);
                        } else {
                            strokeColor = __convertRGBColorsToKML(strokeColor);
                        }
                    }

                    var fillColor = null;
                    if (fImageStyle.getFill()) {
                        fillColor = fImageStyle.getFill().getColor();
                        // array ?
                        if (Array.isArray(fillColor)) {
                            var cf = "rgba(";
                            cf += fillColor[0] + ",";
                            cf += fillColor[1] + ",";
                            cf += fillColor[2] + ",";
                            cf += fillColor[3] + ")";
                            fillColor = cf;
                        }
                        if (Color.isRGB(fillColor)) {
                            var colorHex = Color.rgbaToHex(fillColor);
                            fillColor = __convertRGBColorsToKML(colorHex.hex, colorHex.opacity);
                        } else {
                            fillColor = __convertRGBColorsToKML(fillColor);
                        }
                    }

                    if (style && style.getElementsByTagName("IconStyleSimpleExtensionGroup").length === 0) {
                        var iconExtended = document.createElementNS(kmlNode.namespaceURI, "IconStyleSimpleExtensionGroup");
                        iconExtended.setAttribute("type", "circle"); // FIXME type circle only !
                        iconExtended.setAttribute("radius", fImageStyle.getRadius());
                        iconExtended.setAttribute("fillColor", fillColor);
                        iconExtended.setAttribute("strokeColor", strokeColor);
                        iconExtended.setAttribute("strokeWidth", strokeWidth);
                        style.appendChild(iconExtended);
                    }
                }
            }
        };

        // TODO
        var __createExtendedStyleToIconLabel = function (feature, iconStyle, labelStyle) {
            logger.trace("write an icon with a label");
            __createExtendedStyleIcon(feature, iconStyle);
            __createExtendedStyleLabel(feature, labelStyle);
        };

        // TODO
        var __setNameData = function (feature, tags) {
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                if (tag.nodeName === "name") {
                    return;
                }
            }

            var labelName = feature.getProperties().name;
            if (labelName) {
                var name = document.createElement("name");
                name.innerHTML = labelName;
                tags.appendChild(name);
            }
        };

        // On ajoute les styles étendus dans le DOM
        _kmlRead.call(this, kmlNode, features, {
            labelStyle : __createExtendedStyleLabel,
            iconStyle : __createExtendedStyleIcon,
            iconLabelStyle : __createExtendedStyleToIconLabel,
            nameData : __setNameData
        });

        // On convertit le DOM en String...
        var kmlStringExtended = Parser.toString(kmlNode);
        if (!kmlStringExtended) {
            return null;
        }

        return kmlStringExtended;
    };

    /**
     * ...
     *
     * @param {*} kmlNode - ...
     * @param {*} extensions - ...
     */
    function _writeRootExtensions (kmlNode, extensions) {
        var extendDataElement = document.createElementNS(kmlNode.namespaceURI, "ExtendedData");
        // on boucle sur toutes les clefs
        for (const key in extensions) {
            if (Object.hasOwnProperty.call(extensions, key)) {
                const value = extensions[key];
                var dataElement = document.createElementNS(kmlNode.namespaceURI, "Data");
                dataElement.setAttribute("name", key);
                var data = document.createTextNode(JSON.stringify(value));
                dataElement.appendChild(data);
                extendDataElement.appendChild(dataElement);
            }
        }
        // insertion en 1ere place !
        var firstChild = kmlNode.firstChild;
        kmlNode.insertBefore(extendDataElement, firstChild);
    };

    /**
     * Read Extend for Features.
     * This function overloads ol.format.KML.readFeatures ...
     *
     * @see ol.format.KML.prototype.readFeatures
     * @param {Document|Node} source - Source.
     * @param {olx.format.ReadOptions=} options - options.
     * @return {Array.<ol.Feature>} Features.
     */
    KML.prototype.readFeatures = function (source, options) {
        logger.log("overload : ol.format.KML.readFeatures");

        // String ou Dom
        if (typeof source === "string") {
            this.source = Parser.parse(source);
        } else if (source !== null) {
            this.source = source;
        }

        var features = _readExtendStylesFeatures.call(this, source, options);
        logger.trace("Styles étendus", features);

        return features;
    };

    /**
     * Read Extended Styles for each features
     *
     * @param {(Document|Node|ArrayBuffer|Object|String)} source - source
     * @param {olx.format.ReadOptions=} options - options
     *
     * @returns {Object[]} features
     *
     * @private
     */
    function _readExtendStylesFeatures (source, options) {
        var features = olKML.prototype.readFeatures.call(this, source, options);

        var kmlDoc = null;
        var kmlString = "";

        if (typeof source === "string") {
            kmlString = source;
        } else {
            kmlString = source.documentElement.outerHTML;
        }

        // On 'deformatte' le KML afin d'eviter des pb de parsing...
        kmlString = kmlString.replace(/\n/g, "");
        kmlString = kmlString.replace(/(>)\s*(<)/g, "$1$2");

        // On met en place un Parser sur le KML
        kmlDoc = Parser.parse(kmlString);

        if (kmlDoc === null) {
            // au cas où...
            return features;
        }

        // KML Colors (AABBGGRR) To RGB Colors (RRGGBB)
        function __convertKMLColorsToRGB (data) {
            var color = "";
            color = color + data.substr(6, 2);
            color = color + data.substr(4, 2);
            color = color + data.substr(2, 2);
            var hex = parseInt(color, 16).toString(16);
            var comp = "";
            var len = hex.length || 0;
            for (var i = 0; i < (6 - len); i++) {
                comp += "0";
            }
            hex = "#" + comp + hex;
            return hex.toString(16);
        } 

        /**
         * Gestion des styles étendus sur le Label
         *
         * @param {Object} feature - ol feature
         * @param {DOMElement} style - style
         *
         * @example
         * <Placemark>
         *  <description>Un label</description>
         *  <name>C'est un label étendu !</name>
         *  <Style>
         *    <IconStyle>
         *      <Icon>
         *        <href>data:image/png;base64,...</href>
         *      </Icon>
         *    </IconStyle>
         *    <LabelStyle>
         *      <color>ffffffff</color>
         *      <colorMode>normal</colorMode>
         *      <scale>1.85</scale>
         *      <LabelStyleSimpleExtensionGroup haloColor="16711680" haloRadius="5" haloOpacity="1"/>
         *    </LabelStyle>
         *  </Style>
         *  <Point>
         *    <coordinates>2,48</coordinates>
         *  </Point>
         * </Placemark>
         */
        var __getExtendedStyleToFeatureLabel = function (feature, style) {
            logger.trace("label with style :", style);

            if (!feature) {
                return;
            }

            var _text = feature.getProperties().name || "---";
            var _color = __convertKMLColorsToRGB("ff000000"); // "#000000"
            var _colorHalo = "#FFFFFF";
            var _radiusHalo = 0;
            var _opacityHalo = 1; // TODO
            var _font = "Sans";
            var _fontSize = "16px";

            // On recherche les balises du Style
            var bLabelStyleSimpleExtensionGroup = false;
            var styles = style.childNodes;
            for (var k = 0; k < styles.length; k++) {
                switch (styles[k].nodeName) {
                    case "scale":
                        // TODO
                        break;
                    case "colorMode":
                        // TODO
                        break;
                    case "color":
                        _color = __convertKMLColorsToRGB(styles[k].textContent);
                        break;
                    case "LabelStyleSimpleExtensionGroup":
                        bLabelStyleSimpleExtensionGroup = true;
                        var attributs = styles[k].attributes;
                        for (var l = 0; l < attributs.length; l++) {
                            switch (attributs[l].nodeName) {
                                case "fontFamily":
                                    _font = attributs[l].nodeValue;
                                    break;
                                case "fontSize":
                                    _fontSize = attributs[l].nodeValue;
                                    break;
                                case "haloColor":
                                    _colorHalo = __convertKMLColorsToRGB(attributs[l].nodeValue);
                                    break;
                                case "haloRadius":
                                    _radiusHalo = parseInt(attributs[l].nodeValue, 10);
                                    break;
                                case "haloOpacity":
                                    _opacityHalo = parseFloat(attributs[l].nodeValue);
                                    // TODO opacité !
                                    // if (_opacityHalo !== 1) {
                                    //     _colorHalo = Color.hexToRgba(_colorHalo, _opacityHalo);
                                    // }
                                    break;
                                default:
                            }
                        }
                        break;
                    default:
                        // on ne traite pas les autres informations ...
                }
            }

            // Ce n'est pas un style étendu !
            if (!bLabelStyleSimpleExtensionGroup) {
                logger.trace("it's not a Label Style Simple Extension Group !");
                return;
            }

            // On reconstruit le style !
            feature.setStyle(new Style({
                // INFO
                // on ajoute une image magique 1x1 pixel invisible
                // afin d'eviter l'affichage d'une punaise google !
                image : new Icon({
                    src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
                    size : [51, 38],
                    anchor : [25.5, 38],
                    anchorOrigin : "top-left",
                    anchorXUnits : "pixels",
                    anchorYUnits : "pixels"
                }),
                text : new Text({
                    font : _fontSize + " " + _font,
                    textAlign : "left",
                    text : _text,
                    // offsetX : 5, // FIXME valeur arbitraire MAIS esthétique !
                    fill : new Fill({
                        color : _color
                    }),
                    stroke : new Stroke({
                        color : _colorHalo,
                        width : _radiusHalo
                    })
                })
            }));
        };

        /**
         * Gestion des styles étendus sur un Marker / Cercle
         *
         * > correctif sur la balise kml:hostSpot
         * - problème avec 'hotspot y === 0' (?)
         *
         * @param {Object} feature - ol feature
         * @param {DOMElement} style - style
         *
         * @example
         * <Placemark>
         *   <Style>
         *     <IconStyle>
         *       <Icon>
         *         <href>data:image/png;base64,...</href>
         *       </Icon>
         *       <hotSpot x="25.5" y="0" xunits="pixels" yunits="pixels"/>
         *     </IconStyle>
         *   </Style>
         *   <Point>
         *     <coordinates>2,48</coordinates>
         *   </Point>
         * </Placemark>
         * ou
         * <Placemark>
         *   <Style>
         *     <IconStyle>
         *       <IconStyleSimpleExtensionGroup type="circle" radius="15" fillColor="7f3737a0" strokeColor="cc000000" strokeWidth="2"/>
         *     </IconStyle>
         *   </Style>
         *   <Point>
         *     <coordinates>2,48</coordinates>
         *   </Point>
         */
        var __getExtendedStyleToFeatureIcon = function (feature, style) {
            logger.trace("hotspot :", style);

            // marker
            var _src = null;
            var _scale = null;
            var _color = __convertKMLColorsToRGB("ffffffff");

            var _bSizeIcon = false;
            var _sizeW = 51;
            var _sizeH = 38;

            var _bHotSpot = false;
            var _anchorX = 25.5;
            var _anchorXUnits = "pixels";
            var _anchorY = 38;
            var _anchorYUnits = "pixels";

            // cercle
            var _circleType = null;
            var _circleRadius = 5;
            var _circleFillColor = "#000000";
            var _circleStrokeColor = "#ffffff";
            var _circleStrokeWidth = 1;

            var styles = style.childNodes;
            var bIconStyleSimpleExtensionGroup = false;
            var bIconStyle = false;
            for (var k = 0; k < styles.length; k++) {
                switch (styles[k].nodeName) {
                    case "Icon":
                        bIconStyle = true;
                        var nodes = styles[k].childNodes;
                        for (var i = 0; i < nodes.length; i++) {
                            switch (nodes[i].nodeName) {
                                case "href":
                                    _src = nodes[i].textContent;
                                    break;
                                case "gx:w":
                                    _bSizeIcon = true;
                                    _sizeW = parseFloat(nodes[i].textContent);
                                    break;
                                case "gx:h":
                                    _bSizeIcon = true;
                                    _sizeH = parseFloat(nodes[i].textContent);
                                    break;
                                default:
                            }
                        }
                        break;
                    case "hotSpot":
                        _bHotSpot = true;
                        var attributs = styles[k].attributes;
                        for (var l = 0; l < attributs.length; l++) {
                            switch (attributs[l].nodeName) {
                                case "x":
                                    _anchorX = parseFloat(attributs[l].nodeValue);
                                    break;
                                case "y":
                                    _anchorY = parseFloat(attributs[l].nodeValue);
                                    break;
                                case "yunits":
                                    _anchorXUnits = attributs[l].nodeValue;
                                    break;
                                case "xunits":
                                    _anchorYUnits = attributs[l].nodeValue;
                                    break;
                                default:
                            }
                        }
                        break;
                    case "scale":
                        _scale = parseFloat(styles[k].textContent);
                        break;
                    case "color":
                        _color = __convertKMLColorsToRGB(styles[k].textContent);
                        break;
                    case "IconStyleSimpleExtensionGroup":
                        bIconStyleSimpleExtensionGroup = true;
                        var attributs = styles[k].attributes;
                        for (var l = 0; l < attributs.length; l++) {
                            // type="circle" radius="15" fillColor="7f3737a0" strokeColor="cc000000" strokeWidth="2"
                            switch (attributs[l].nodeName) {
                                case "type":
                                    _circleType = attributs[l].nodeValue;
                                    break;
                                case "radius":
                                    _circleRadius = parseInt(attributs[l].nodeValue, 10);
                                    break;
                                case "fillColor":
                                    var fillColorValue = attributs[l].nodeValue;
                                    var fillOpacity = Math.round((Color.num(fillColorValue.substr(0, 2)) / 255) * 10) / 10;
                                    var fillColorHexa = __convertKMLColorsToRGB(fillColorValue);
                                    _circleFillColor = Color.hexToRgba(fillColorHexa, fillOpacity);
                                    break;
                                case "strokeColor":
                                    var strokeColorValue = attributs[l].nodeValue;
                                    var strokeOpacity = Math.round((Color.num(strokeColorValue.substr(0, 2)) / 255) * 10) / 10;
                                    var strokeColorHexa = __convertKMLColorsToRGB(strokeColorValue);
                                    _circleStrokeColor = Color.hexToRgba(strokeColorHexa, strokeOpacity);
                                    break;
                                case "strokeWidth":
                                    _circleStrokeWidth = parseInt(attributs[l].nodeValue, 10);
                                    break;
                                default:
                            }
                        }
                        break;
                    default:
                        // on ne traite pas les autres informations ...
                }
            }

            var StyleInstance = null;
            if (bIconStyle) {
                var optionsIcon = {
                    src : _src || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
                    color : _color,
                    crossOrigin : "anonymous", // cf. https://gis.stackexchange.com/questions/121555/wms-server-with-cors-enabled/147403#147403
                    scale : _scale || 1
                };
    
                if (_bSizeIcon) {
                    Utils.mergeParams(optionsIcon, {
                        size : [_sizeW, _sizeH]
                    });
                }
    
                if (_bHotSpot) {
                    Utils.mergeParams(optionsIcon, {
                        anchor : [_anchorX, _anchorY],
                        anchorOrigin : "bottom-left",
                        anchorXUnits : _anchorXUnits || "pixels",
                        anchorYUnits : _anchorYUnits || "pixels"
                    });
                }

                StyleInstance = new Icon(optionsIcon);
            }
            
            if (bIconStyleSimpleExtensionGroup && _circleType === "circle") {
                var optionsCircle = {
                    radius : _circleRadius,
                    fill : new Fill({
                        color : _circleFillColor
                    }),
                    stroke : new Stroke({
                        color : _circleStrokeColor,
                        width : _circleStrokeWidth
                    })
                };

                StyleInstance = new Circle(optionsCircle);
            }

            // existe il déjà le style du label ?
            var featureStyleFunction = feature.getStyleFunction();
            if (featureStyleFunction) {
                var _styles = featureStyleFunction(feature, 0);
                if (_styles && !Array.isArray(_styles)) {
                    _styles = [_styles];
                }
                if (_styles && _styles.length !== 0) {
                    var _style = (_styles.length === 1) ? _styles[0] : _styles[_styles.length - 1];
                    // on écrase l'icone magic du label !
                    feature.setStyle(new Style({
                        image : StyleInstance,
                        text : _style.getText()
                    }));
                }
            }
        };

        /**
         * Gestion de la balise kml:ExtendedData
         *
         * @param {Object} feature - ol feature
         * @param {DOMElement[]} extend - extend
         *
         * @example
         * //--> Marker (Point), LineString, Polygon
         * <ExtendedData>
         *    <Data name="attributetitle">
         *        <displayName>title</displayName>
         *        <value>Titre à concatener avec la valeur de la balise "kml:description"</value>
         *    </Data>
         * </ExtendedData>
         * //--> Label
         * <ExtendedData>
         *    <Data name="label">
         *        <value>PARIS</value> // valeur à remplacer dans "kml:name"
         *    </Data>
         *    <Data name="attributetitle">
         *        <displayName>title</displayName>
         *        <value>Titre à concatener avec la valeur de la balise "kml:description"</value>
         *    </Data>
         * </ExtendedData>
         */
        var __getExtendedData = function (feature, extend) {
            logger.trace("extendData :", extend);

            if (!feature) {
                return;
            }

            var _fname = feature.getProperties().name || "";
            var _fdescription = feature.getProperties().description || "";
            var _ftitle = null;
            for (var i = 0; i < extend.length; i++) {
                var data = extend[i];
                var name = data.attributes[0]; // 1 seul attribut !
                var nodes = data.childNodes;
                if (name.nodeName === "name") {
                    switch (name.nodeValue) {
                        // compatibilité ancien geoportail !
                        case "label":
                            _fname = data.textContent;
                            break;
                            // compatibilité ancien geoportail !
                        case "title":
                        case "attributetitle":
                            for (var j = 0; j < nodes.length; j++) {
                                if (nodes[j].nodeName === "value") {
                                    _ftitle = nodes[j].textContent;
                                }
                            }
                            break;
                        default:
                            // for (var k = 0; k < nodes.length; k++) {
                            //     if (nodes[k].nodeName === "value") {
                            //         _fdescription += "<br>";
                            //         _fdescription += nodes[k].textContent;
                            //
                            //     }
                            // }
                    }
                }
            }

            // Modification des properties "name" et "description"
            if (_ftitle) {
                _fdescription = (_fdescription) ? _ftitle + " : " + _fdescription : _ftitle;
            }

            feature.setProperties({
                name : _fname,
                description : _fdescription
            });
        };

        /** 
         * TODO
         * ...
         *
         * @param {Object} feature - ol feature
         * @param {DOMElement} iconStyle - icon style
         * @param {DOMElement} labelStyle - label style
         * @example
         * ...
         */
        var __getExtendedStyleToFeatureIconLabel = function (feature, iconStyle, labelStyle) {
            logger.trace("display icon and label");
            __getExtendedStyleToFeatureLabel(feature, labelStyle);
            __getExtendedStyleToFeatureIcon(feature, iconStyle);
        };

        // On lit les styles étendus et on les ajoute aux features
        _kmlRead.call(this, kmlDoc, features, {
            labelStyle : this.showPointNames_ ? __getExtendedStyleToFeatureLabel : null,
            iconStyle : __getExtendedStyleToFeatureIcon,
            iconLabelStyle : this.showPointNames_ ? __getExtendedStyleToFeatureIconLabel : __getExtendedStyleToFeatureIcon,
            extendedData : __getExtendedData
        });

        return features;
    };

    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     */
    KML.prototype.readRootExtensions = function (key) {
        var value = {};
        // Rechercher le tag avec la clef : geoportail:compute
        // <ExtendedData>
        //   <Data name="geoportail:compute">{...}</Data>
        // </ExtendedData>
        var firstNodeLevelKml = (this.source.nodeName === "#document") ? this.source.childNodes[0] : this.source;
        var childNodesLevel = firstNodeLevelKml.childNodes;
        for (var i = 0; i < childNodesLevel.length; i++) {
            var node1 = childNodesLevel[i];
            if (node1.nodeName === "ExtendedData") {
                var childNodesExtended = node1.childNodes;
                for (var j = 0; j < childNodesExtended.length; j++) {
                    var node2 = childNodesExtended[j];
                    if (node2.nodeName === "Data") {
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

    return KML;
}(olKML));

export default KML;

// Expose KML as ol.source.KMLExtended. (for a build bundle)
if (window.ol && window.ol.format) {
    window.ol.format.KMLExtended = KML;
}
