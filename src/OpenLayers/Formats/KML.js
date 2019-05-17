// import openlayers
import olKML from "ol/format/KML";
import {
    Fill,
    Icon,
    Stroke,
    Style,
    Text
} from "ol/style";
// import local
import Logger from "../../Common/Utils/LoggerByDefault";
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
 * @extends {ol.format.KML}
 * @param {Object} options - Options
 */
var KML = (function (olKML) {
    function KML (options) {
        if (!(this instanceof KML)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // call constructor
        olKML.call(this,
            options
        );

        this.options = options || {};
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
     * Fonction d'indentation d'une chaine de caractères KML ou XML
     * cf. https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript/
     *
     * @param {String} xml - xml
     *
     * @returns {String} kml string
     */
    function _kmlFormattedToString (xml) {
        var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
        var wsexp = / *(.*) +\n/g;
        var contexp = /(<.+>)(.+\n)/g;
        xml = xml.replace(reg, "$1\n$2$3").replace(wsexp, "$1\n").replace(contexp, "$1\n$2");
        var formatted = "";
        var lines = xml.split("\n");
        var indent = 0;
        var lastType = "other";
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions
        var transitions = {
            "single->single" : 0,
            "single->closing" : -1,
            "single->opening" : 0,
            "single->other" : 0,
            "closing->single" : 0,
            "closing->closing" : -1,
            "closing->opening" : 0,
            "closing->other" : 0,
            "opening->single" : 1,
            "opening->closing" : 0,
            "opening->opening" : 1,
            "opening->other" : 1,
            "other->single" : 0,
            "other->closing" : -1,
            "other->opening" : 0,
            "other->other" : 0
        };

        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
            var type = single ? "single" : closing ? "closing" : opening ? "opening" : "other";
            var fromTo = lastType + "->" + type;
            lastType = type;
            var padding = "";

            indent += transitions[fromTo];
            for (var j = 0; j < indent; j++) {
                padding += "\t";
            }
            if (fromTo === "opening->closing") {
                formatted = formatted.substr(0, formatted.length - 1) + ln + "\n"; // substr removes line break (\n) from prev loop
            } else {
                formatted += padding + ln + "\n";
            }
        }

        logger.trace(formatted);
        return formatted;
    };

    /**
     * Fonction de parsing d'une chaine de caractères KML
     *
     * @param {String} kmlString - kml string
     *
     * @returns {DOMElement} kml document
     */
    function _kmlParse (kmlString) {
        var kmlDoc = null;
        var parser = null;
        var scope = typeof window !== "undefined" ? window : null;

        if (typeof exports === "object" && window === null) {
            // code for nodejs
            var DOMParser = require("xmldom").DOMParser;
            parser = new DOMParser();
            kmlDoc = parser.parseFromString(kmlString, "text/xml");
        } else if (scope.DOMParser) {
            // code for modern browsers
            parser = new scope.DOMParser();
            kmlDoc = parser.parseFromString(kmlString, "text/xml");
        } else if (scope.ActiveXObject) {
            // code for old IE browsers
            kmlDoc = new scope.ActiveXObject("Microsoft.XMLDOM");
            kmlDoc.async = false;
            kmlDoc.loadXML(kmlString);
        } else {
            logger.log("Incompatible environment for DOM Parser !");
        }

        logger.trace(kmlDoc);
        return kmlDoc;
    };

    /**
     * Fonction de convertion en chaine de caractères.
     *
     * @param {DOMElement} kmlDoc - kml document
     *
     * @returns {String} kml string
     */
    function _kmlToString (kmlDoc) {
        var oSerializer = new XMLSerializer();
        var kmlStringExtended = oSerializer.serializeToString(kmlDoc);

        logger.trace(kmlStringExtended);
        return kmlStringExtended;
    };

    /**
     * Fonction de lecture du KML avec fonction de traitement en fonction du type
     * PlaceMark (Label ou Marker).
     * Les traitements sont de 2 types :
     *  - creation de styles étendus ou correctifs sur le KML
     *  - ajout de styles étendus sur les features
     *
     * @param {DOMElement} kmlDoc - kml document
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
     * _kmlRead(kmlDoc, {
     *   labelStyle : getStyleToFeatureLabel,
     *   iconStyle  : getStyleToFeatureIcon,
     *   extendedData : getExtendedData
     * });
     */
    function _kmlRead (kmlDoc, features, process) {
        var root = kmlDoc.documentElement;
        var firstNodeLevel = root.childNodes;

        // Si le DOM contient un seul objet, le noeud est directement un PlaceMark
        // sinon, c'est un ensemble de noeuds PlaceMark contenus dans le noeud Document.
        var nodes = firstNodeLevel;
        if (firstNodeLevel.length === 1 && firstNodeLevel[0].nodeName === "Document") {
            nodes = firstNodeLevel[0].childNodes;
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
     * Write Extend Styles for Features.
     * This function overloads ol.format.KML.writeFeatures ...
     *
     * @see ol.format.KML.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @return {String} Result.
     */
    KML.prototype.writeFeatures = function (features, options) {
        // KML.prototype._parentWriteFeatures = ol.format.KML.prototype.writeFeatures;
        logger.log("overload : ol.format.KML.writeFeatures");
        var kmlString = this._writeExtendStylesFeatures(features, options);
        return kmlString;
    };

    /**
     * _writeExtendStylesFeatures
     *
     * @param {Object[]} features - features
     * @param {Object} options - options
     *
     * @returns {String} kml string formatted
     *
     * @private
     */
    KML.prototype._writeExtendStylesFeatures = function (features, options) {
        var kmlString = olKML.prototype.writeFeatures.call(this, features, options);

        // On met en place un Parser sur le KML
        // (Dommage que le parser XML des services ne soit pas disponible !)
        var kmlDoc = _kmlParse(kmlString);

        if (kmlDoc === null) {
            // au cas où...
            return kmlString;
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
        var __createExtensionStyleLabel = function (feature, style) {
            logger.trace("label with style :", style);

            if (!feature) {
                return;
            }

            var labelName = feature.getProperties().name;
            if (!labelName) {
                return;
            }

            // RGB Colors (RRGGBB) To KML Colors (AABBGGRR)
            function __convertRGBColorsToKML (data) {
                var strColor = data.toString(16);

                if (strColor.charAt(0) === "#") {
                    strColor = strColor.slice(1);
                }

                var opacity = 1;
                opacity = parseInt(opacity * 255, 10);
                opacity = opacity.toString(16);
                var color = opacity;
                color = color + strColor.substr(4, 2);
                color = color + strColor.substr(2, 2);
                color = color + strColor.substr(0, 2);
                return color.toLowerCase();
            }

            // Si pas de style defini, c'est donc que l'on va utiliser celui par defaut...
            if (feature.getStyle() instanceof Style) {
                var fTextStyle = feature.getStyle().getText().getStroke();

                if (!fTextStyle) {
                    return;
                }

                var _haloColor = __convertRGBColorsToKML(fTextStyle.getColor()) || __convertRGBColorsToKML("#FFFFFF"); // KML Colors : 64FFFFFF (blanc)
                var _haloRadius = fTextStyle.getWidth() || "0";
                var _haloOpacity = "1"; // TODO
                var _font = "Sans"; // TODO

                if (style && style.getElementsByTagName("LabelStyleSimpleExtensionGroup").length === 0) {
                    var labelextend = kmlDoc.createElement("LabelStyleSimpleExtensionGroup");
                    labelextend.setAttribute("fontFamily", _font);
                    labelextend.setAttribute("haloColor", _haloColor);
                    labelextend.setAttribute("haloRadius", _haloRadius);
                    labelextend.setAttribute("haloOpacity", _haloOpacity);
                    style.appendChild(labelextend);
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
        var __createHotSpotStyleIcon = function (feature, style) {
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
                        y = (anchor[1] === 1) ? 0 : 1 - anchor[1]; // cf. fixme contribution à faire !
                    } else {
                        y = (yunits === "pixels" && anchor[1] === size[1]) ? 0 : size[1] - anchor[1]; // cf. fixme contribution à faire !
                    }
                }

                if (style && style.getElementsByTagName("hotSpot").length === 0) {
                    var hotspot = kmlDoc.createElement("hotSpot");
                    hotspot.setAttribute("x", x);
                    hotspot.setAttribute("y", y);
                    hotspot.setAttribute("xunits", xunits);
                    hotspot.setAttribute("yunits", yunits);
                    style.appendChild(hotspot);
                }
            }
        };

        // TODO
        var __createStyleToFeatureIconLabel = function (feature, iconStyle, labelStyle) {
            logger.trace("write an icon with a label");
            __createHotSpotStyleIcon(feature, iconStyle);
            __createExtensionStyleLabel(feature, labelStyle);
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
                var name = kmlDoc.createElement("name");
                name.innerHTML = labelName;
                tags.appendChild(name);
            }
        };

        // On ajoute les styles étendus dans le DOM
        _kmlRead(kmlDoc, features, {
            labelStyle : __createExtensionStyleLabel,
            iconStyle : __createHotSpotStyleIcon,
            iconLabelStyle : __createStyleToFeatureIconLabel,
            nameData : __setNameData
        });

        // On convertit le DOM en String...
        var kmlStringExtended = _kmlToString(kmlDoc);

        // au cas où...
        if (kmlStringExtended === null) {
            kmlStringExtended = kmlString;
        }

        // On realise un formattage du KML
        var kmlStringFormatted = _kmlFormattedToString(kmlStringExtended);

        // au cas où...
        if (kmlStringFormatted === null) {
            kmlStringFormatted = kmlString;
        }

        return kmlStringFormatted;
    };

    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.KML.readFeatures ...
     *
     * @see ol.format.KML.prototype.readFeatures
     * @param {Document|Node|ArrayBuffer|Object|String} source - Source.
     * @param {olx.format.ReadOptions=} options - options.
     * @return {Array.<ol.Feature>} Features.
     */
    KML.prototype.readFeatures = function (source, options) {
        // KML.prototype._parentReadFeatures = ol.format.KML.prototype.readFeatures;
        logger.log("overload : ol.format.KML.readFeatures");
        var features = this._readExtendStylesFeatures(source, options);
        logger.trace("Styles étendus", features);

        // la gestion des styles est deplacée au niveau des extensions
        // qui ont besoin de lire un KML (ex. Drawing) ...
        //
        // features.forEach(function (feature) {
        //     var featureStyleFunction = feature.getStyleFunction();
        //     if (featureStyleFunction) {
        //         var styles = featureStyleFunction.call(feature, 0);
        //         if (styles && styles.length !== 0) {
        //             feature.setStyle(styles[0]);
        //         }
        //     }
        // });

        return features;
    };

    /**
     * _readExtendStylesFeatures
     *
     * @param {(Document|Node|ArrayBuffer|Object|String)} source - source
     * @param {olx.format.ReadOptions=} options - options
     *
     * @returns {Object[]} features
     *
     * @private
     */
    KML.prototype._readExtendStylesFeatures = function (source, options) {
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
        kmlDoc = _kmlParse(kmlString);

        if (kmlDoc === null) {
            // au cas où...
            return features;
        }

        /**
         * Gestion des styles étendus sur le Label
         * - ajout d'un icone par defaut (1x1p transparent) sur les labels
         * s'il n'existe pas !
         * - lecture des styles étendus des labels
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
        var __getExtensionStyleToFeatureLabel = function (feature, style) {
            logger.trace("label with style :", style);

            if (!feature) {
                return;
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

            var _text = feature.getProperties().name || "---";
            var _color = __convertKMLColorsToRGB("ff000000"); // "#000000"
            var _colorHalo = "#FFFFFF";
            var _radiusHalo = 0;
            var _font = "Sans"; // TODO
            var _fontSize = "16px"; // TODO

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
                                    // TODO
                                    break;
                                case "haloColor":
                                    _colorHalo = __convertKMLColorsToRGB(attributs[l].nodeValue);
                                    break;
                                case "haloRadius":
                                    _radiusHalo = parseInt(attributs[l].nodeValue, 10);
                                    break;
                                case "haloOpacity":
                                    // TODO
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
         * Gestion de la balise kml:hostSpot sur les styles d'un Marker
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
         */
        var __getHotSpotStyleToFeatureIcon = function (feature, style) {
            logger.trace("hotspot :", style);

            var _src = null;
            var _scale = null;

            var _bSizeIcon = false;
            var _sizeW = 51;
            var _sizeH = 38;

            var _bHotSpot = false;
            var _anchorX = 25.5;
            var _anchorXUnits = "pixels";
            var _anchorY = 38;
            var _anchorYUnits = "pixels";

            var styles = style.childNodes;
            for (var k = 0; k < styles.length; k++) {
                switch (styles[k].nodeName) {
                    case "Icon":
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
                    default:
                        // on ne traite pas les autres informations ...
                }
            }

            var _options = {
                src : _src,
                crossOrigin : "anonymous", // cf. https://gis.stackexchange.com/questions/121555/wms-server-with-cors-enabled/147403#147403
                scale : _scale || 1 // FIXME !?
            };

            if (_bSizeIcon) {
                Utils.mergeParams(_options, {
                    size : [_sizeW, _sizeH]
                });
            }

            if (_bHotSpot) {
                Utils.mergeParams(_options, {
                    anchor : [_anchorX, _anchorY],
                    anchorOrigin : "bottom-left",
                    anchorXUnits : _anchorXUnits || "pixels",
                    anchorYUnits : _anchorYUnits || "pixels"
                });
            }

            // existe il déjà le style du label ?
            var featureStyleFunction = feature.getStyleFunction();
            if (featureStyleFunction) {
                var _styles = featureStyleFunction(feature, 0);
                if (_styles && _styles.length !== 0) {
                    var _style = (_styles.length === 1) ? _styles[0] : _styles[_styles.length - 1];
                    // on écrase l'icone magic du label !
                    feature.setStyle(new Style({
                        image : new Icon(_options),
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

        /** TODO
        * @param {Object} feature - ol feature
        * @param {DOMElement} iconStyle - icon style
        * @param {DOMElement} labelStyle - label style
        *
        *
        */
        var __getStyleToFeatureIconLabel = function (feature, iconStyle, labelStyle) {
            logger.trace("display icon and label");
            __getExtensionStyleToFeatureLabel(feature, labelStyle);
            __getHotSpotStyleToFeatureIcon(feature, iconStyle);
        };

        // On lit les styles étendus et on les ajoute aux features
        _kmlRead(kmlDoc, features, {
            labelStyle : this.options.showPointNames ? __getExtensionStyleToFeatureLabel : null,
            iconStyle : __getHotSpotStyleToFeatureIcon,
            iconLabelStyle : this.options.showPointNames ? __getStyleToFeatureIconLabel : __getHotSpotStyleToFeatureIcon,
            extendedData : __getExtendedData
        });

        return features;
    };

    return KML;
}(olKML));

export default KML;

// Expose KML as ol.source.KMLExtended. (for a build bundle)
if (window.ol && window.ol.format) {
    window.ol.format.KMLExtended = KML;
}
