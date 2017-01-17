define([
    "woodman",
    "ol"
], function (
    woodman,
    ol
) {

    "use strict";

    var logger = woodman.getLogger("extended KML format");

    /**
    * @classdesc
    *
    * Extended Styles KML format to export (internal use only !)
    *
    * INFO
    * only ol.Control is a user-extendable class.
    * Everything else requires integration with the original ol3 source and a new ol.js
    * to be built with your new classes incorporated.
    *
    * SPEC
    * cf. https://developers.google.com/kml/forum/advanced
    *
    * ISSUES
    * cf. https://github.com/openlayers/ol3/issues/4829 :
    *    I confirm that there's a problem with the positioning of the marker in OpenLayers 3.
    *    If no tag '_hotspot_' is present in the KML, the marker is centered by default ...
    *    On the other side, if we put in place this tag (_hotspot_), vertical positioning is drawn to the wrong place...
    *    [jsfiddle - read kml] (http://jsfiddle.net/lowzonenose/1dnrn1hu/embedded/result,js,html,css/)
    *    [jsfiddle - write kml] (http://jsfiddle.net/lowzonenose/yh4stufb/embedded/result,js,html,css/)
    *
    * cf. https://github.com/openlayers/ol3/issues/4460
    * cf. https://github.com/openlayers/ol3/pull/5590
    * cf. https://github.com/openlayers/ol3/issues/5229
    * cf. https://github.com/openlayers/ol3/issues/3371
    *
    * @constructor
    * @extends {ol.format.KML}
    * @param {Object} options - Options
    */
    function KML (options) {

        if (!(this instanceof KML)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // call constructor
        ol.format.KML.call(this,
            options
        );

    }

    // Inherits
    ol.inherits(KML, ol.format.KML);

    /*
    * @lends module:KML
    */
    KML.prototype = Object.create(ol.format.KML.prototype, {});

    /**
    * Constructor (alias)
    */
    KML.prototype.constructor = KML;

    /**
    * Fonction d'indentation d'une chaine de caractères KML ou XML
    * cf. https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript/
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
            if (fromTo == "opening->closing") {
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
    */
    function _kmlParse (kmlString) {
        var kmlDoc = null;
        var parser = null;
        var scope  = typeof window !== "undefined" ? window : null;

        if ( typeof exports === "object" && window === null) {
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
            console.log("Incompatible environment for DOM Parser !");
        }

        logger.trace(kmlDoc);
        return kmlDoc;
    };

    /**
    * Fonction de convertion en chaine de caractères.
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
        var root  = kmlDoc.documentElement;
        var firstNodeLevel = root.childNodes;

        // Si le DOM contient un seul objet, le noeud est directement un PlaceMark
        // sinon, c'est un ensemble de noeuds PlaceMark contenus dans le noeud Document.
        var nodes = firstNodeLevel;
        if (firstNodeLevel.length === 1 && firstNodeLevel[0].nodeName === "Document") {
            nodes = firstNodeLevel[0].childNodes;
        }

        // On recherche les PlaceMark de type Point ayant un Style...
        var stylesUrl = {}; // listes des styles
        var index = -1; // index du features...
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            switch (node.nodeName) {

                case "Style":
                    // INFO
                    // pour le traitement des balises Styles liées avec styleUrl,
                    // elles doivent être toujours déclarées avant les PlaceMark !
                    var id = node.attributes[0];
                    if (id.nodeName === "id") {
                        var _k = id.nodeValue;
                        var _v = node;
                        stylesUrl[_k] = _v;
                    }
                    break;

                case "Placemark":

                    index++;
                    var types  = node.childNodes; // Point, LineString, Polygon, Style, ...
                    var point  = false;
                    var styles = null; // dom
                    var extend = null; // dom
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
                                if ( stylesUrl[_idStyle] ) {
                                    styles = stylesUrl[_idStyle].childNodes;
                                }
                                break;
                            case "ExtendedData":
                                extend = types[j].childNodes;
                                break;
                            default:
                            // on ne traite pas les autres informations ...
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

                    // On a un Marker ou un Label avec un Style
                    if (point && styles) {
                        // Les Styles !
                        if (styles.length) {
                            var labelStyle = null;
                            var iconStyle  = null;
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

                            // Pour un label, il faut un titre !
                            var label = features[index].getProperties().name;

                            // C'est un Label !
                            // On y ajoute qq fonctionnalités...
                            if (labelStyle && label) {
                                var fctLabel = process.labelStyle;
                                if (fctLabel && typeof fctLabel === "function") {
                                    // console.log(features[index].getStyle());
                                    fctLabel(features[index], labelStyle);
                                }
                            }

                            // C'est un marker !
                            // On y ajoute qq fonctionnalités...
                            else if (iconStyle) {
                                var fctIcon = process.iconStyle;
                                if (fctIcon && typeof fctIcon === "function") {
                                    // FIXME pourquoi le feature ne renvoie pas de style ?
                                    fctIcon(features[index], iconStyle);
                                }
                            }
                        }
                    }

                    break;
                default:

            }
        }
    };

    /**
    * Write Extend Styles for Features.
    * This function overloads ol.format.KML.writeFeatures ...
    *
    * @see ol.format.KML.prototype.writeFeatures
    * @param {Array.<Object>} features - Features.
    * @param {Object} options - Options.
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
     * @private
     */
    KML.prototype._writeExtendStylesFeatures = function (features, options) {

        var kmlString = ol.format.KML.prototype.writeFeatures.call(this, features, options);

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
        * @example
        *      <LabelStyleSimpleExtensionGroup fontFamily="Arial" haloColor="16777215" haloRadius="2" haloOpacity="1"/>
        */
        var __createExtensionStyleLabel = function (feature, style) {

            logger.trace("label with style :", style);

            if (!feature) {
                return;
            }

            /** RGB Colors (RRGGBB) To KML Colors (AABBGGRR) */
            function __convertRGBColorsToKML (data) {
                var strColor = data.toString(16);

                if (strColor.charAt(0) === "#") {
                    strColor = strColor.slice(1);
                }

                var opacity = 1;
                opacity = parseInt(opacity * 255, 10);
                opacity = opacity.toString(16);
                var color = opacity;
                color = color + strColor.substr(4,2);
                color = color + strColor.substr(2,2);
                color = color + strColor.substr(0,2);
                return color;
            }

            var _haloColor = __convertRGBColorsToKML("#FFFFFF"); // KML Colors : 64FFFFFF (blanc)
            var _haloRadius = "3";
            var _haloOpacity = "1"; // TODO
            var _font = "Sans"; // TODO

            if ( feature.getStyle() instanceof ol.style.Style ) {

                var fTextStyle = feature.getStyle().getText().getStroke();

                _haloColor  = __convertRGBColorsToKML(fTextStyle.getColor());
                _haloRadius = fTextStyle.getWidth();

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
         *   - FRACTION (TODO)
         *   - PIXELS
         *  Insertion du correctif dans le noeud : <PlaceMark><Style>IconStyle
         *
         *  @example
         *  <Style><IconStyle>
         *      <hotSpot x="0.5"  y="1" xunits="fraction" yunits="fraction"/>
         *  </IconStyle></Style>
         */
        var __createHotSpotStyleIcon = function (feature, style) {
            // FIXME BUG de lecture OL3 sur l'interpretation des properties :
            // origin, anchor avec bottom-left et top-left ?
            // Du coup, la propriété 'y' ne semble pas être correctement intérprétée !?
            logger.trace("marker with style :", style);

            if (!feature) {
                return;
            }

            var x = 0;
            var y = 0;
            var xunits = "pixels";
            var yunits = "pixels";

            if ( feature.getStyle() instanceof ol.style.Style ) {

                var fImageStyle = feature.getStyle().getImage();

                var size   = fImageStyle.getSize();
                var anchor = fImageStyle.getAnchor(); // pixels ! but anchor_ in the current unit !

                if (anchor.length) {
                    x = anchor[0];
                    y = anchor[1];
                    if (yunits === "fraction") {
                        y = (anchor[1] === 1) ? 0 : 1 - anchor[1]; // cf. fixme !
                    } else {
                        y = (yunits === "pixels" && anchor[1] === size[1]) ? 0 : size[1] - anchor[1]; // cf. fixme !
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

        // On ajoute les styles étendus dans le DOM
        _kmlRead(kmlDoc, features, {
            labelStyle : __createExtensionStyleLabel,
            iconStyle : __createHotSpotStyleIcon
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
        return features;
    };

    /**
     * _readExtendStylesFeatures
     *
     * @private
     */
    KML.prototype._readExtendStylesFeatures = function (source, options) {
        var features = ol.format.KML.prototype.readFeatures.call(this, source, options);

        var kmlDoc = null;
        var kmlString = "";

        if ( typeof source === "string" ) {
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
        */
        var __getExtensionStyleToFeatureLabel = function (feature, style) {

            if (!feature) {
                return;
            }

            /** KML Colors (AABBGGRR) To RGB Colors (RRGGBB) */
            function __convertKMLColorsToRGB (data) {
                var color = "";
                color = color + data.substr(6,2);
                color = color + data.substr(4,2);
                color = color + data.substr(2,2);
                var hex = parseInt(color,16).toString(16);
                var comp = "";
                var len = hex.length || 0;
                for (var i = 0; i < (6 - len); i++) {
                    comp += "0";
                }
                hex = "#" + comp + hex;
                return hex.toString(16);
            }

            var _text  = feature.getProperties().name || "---";
            var _color = __convertKMLColorsToRGB("ff000000"); // "#000000"
            var _colorHalo  = "#FFFFFF";
            var _radiusHalo = 4;
            var _font = "Sans"; // TODO
            var _fontSize = "16px"; // TODO

            // On recherche les balises du Style
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

            // On reconstruit le style !
            feature.setStyle(new ol.style.Style({
                image : new ol.style.Icon({
                    src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
                    size : [51, 38],
                    anchor : [25.5 , 38],
                    anchorOrigin : "top-left",
                    anchorXUnits : "pixels",
                    anchorYUnits : "pixels"
                }),
                text : new ol.style.Text({
                    font : _fontSize + " " + _font,
                    textAlign : "left",
                    text : _text,
                    fill : new ol.style.Fill({
                        color : _color
                    }),
                    stroke : new ol.style.Stroke({
                        color : _colorHalo,
                        width : _radiusHalo
                    })
                })
            }));

        };

        /**
        * TODO Gestion de la balise kml:hostSpot sur les styles d'un Marker
        * - problème avec 'hotspot y === 0' (?)
        */
        var __getHotSpotStyleToFeatureIcon  = function (feature, style) {
            logger.trace(feature, style);
        };

        /**
        * Gestion de la balise kml:ExtendedData
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

            if (!feature) {
                return;
            }

            // Dans le cas où le noeud "ExtendedData" est vide,
            // on ne prend pas en compte la valeur du tag "name" !
            var _fname = /* feature.getProperties().name || */ "";
            var _fdescription = feature.getProperties().description || "";
            var _ftitle = null;
            for (var i = 0; i < extend.length; i++) {
                var data = extend[i];
                var name = data.attributes[0]; // 1 seul attribut !
                if (name.nodeName === "name") {
                    switch (name.nodeValue) {
                        case "label":
                            _fname = data.textContent;
                            break;
                        case "attributetitle":
                            var nodes = data.childNodes;
                            for (var j = 0; j < nodes.length; j++) {
                                if (nodes[j].nodeName === "value") {
                                    _ftitle = nodes[j].textContent;
                                }
                            }
                            break;
                        default:
                        // ...
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

        // On lit les styles étendus et on les ajoute aux features
        _kmlRead(kmlDoc, features, {
            labelStyle : __getExtensionStyleToFeatureLabel,
            iconStyle : __getHotSpotStyleToFeatureIcon,
            extendedData : __getExtendedData
        });

        return features;
    };

    return KML;

});
