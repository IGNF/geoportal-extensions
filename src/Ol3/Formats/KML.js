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
    * cf. https://github.com/openlayers/ol3/issues/4829
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
        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
        var pad = 0;
        var formatted = '';
        var lines = xml.split('\n');
        var indent = 0;
        var lastType = 'other';
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions
        var transitions = {
            'single->single' : 0,
            'single->closing' : -1,
            'single->opening' : 0,
            'single->other' : 0,
            'closing->single' : 0,
            'closing->closing' : -1,
            'closing->opening' : 0,
            'closing->other' : 0,
            'opening->single' : 1,
            'opening->closing' : 0,
            'opening->opening' : 1,
            'opening->other' : 1,
            'other->single' : 0,
            'other->closing' : -1,
            'other->opening' : 0,
            'other->other' : 0
        };

        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
            var fromTo = lastType + '->' + type;
            lastType = type;
            var padding = '';

            indent += transitions[fromTo];
            for (var j = 0; j < indent; j++) {
                padding += '\t';
            }
            if (fromTo == 'opening->closing') {
                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
            } else {
                formatted += padding + ln + '\n';
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
    * FIXME : le traitement des styles KML en mode styleUrl n'est pas implémenté !
    *
    * @example
    * _kmlRead(kmlDoc, {
    *   label : createExtendedStyleLabel,
    *   icon  : createExtendedStyleIcon
    * });
    * _kmlRead(kmlDoc, {
    *   label : addExtendedStyleToFeatureLabel,
    *   icon  : addExtendedStyleToFeatureIcon
    * });
    */
    function _kmlRead (kmlDoc, features, process) {
        var root  = kmlDoc.documentElement;
        var firstNodeLevel = root.childNodes;

        // Si le DOM contient un seul objet, le noeud est directement un PlaceMark
        // sinon, c'est un ensemble de noeuds PlaceMark contenus dans le noeud Document.
        var placemarks = firstNodeLevel;
        if (firstNodeLevel.length === 1 && firstNodeLevel[0].nodeName === "Document") {
            placemarks = firstNodeLevel[0].childNodes;
        }

        // On recherche uniquement les PlaceMark de type Point ayant un Style...
        for (var idx = 0; idx < placemarks.length; idx++) {
            var placemark = placemarks[idx];
            var types = placemark.childNodes; // Point, LineString, Polygon, Style, ...
            var point  = false;
            var styles = null;
            for (var j = 0; j < types.length; j++) {
                switch (types[j].nodeName) {
                    case "Point":
                    point = true;
                    break;
                    case "Style":
                    styles = types[j].childNodes; // liste de styles
                    break;
                    default:
                    // on ne traite pas les autres informations ...
                }
            }

            // On a un Marker ou un Label avec un Style
            if (point && styles) {
                // Le Style ne peut être vide !
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

                    // C'est un Label !
                    if (labelStyle) {
                        var fctLabel = process.label;
                        if (fctLabel && typeof fctLabel === "function") {
                            fctLabel(features[idx], labelStyle);
                        }
                    }

                    // C'est un marker !
                    else if (iconStyle) {
                        var fctIcon = process.icon;
                        if (fctIcon && typeof fctIcon === "function") {
                            fctIcon(features[idx], iconStyle);
                        }
                    }
                }
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
    KML.prototype.writeExtendStylesFeatures = function (features, options) {
        logger.log("overload : ol.format.KML.writeFeatures");

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
        * FIXME : Pas d'implémentation d'OpenLayers sur la lecture de cette balise.
        *
        * @example
        *      <LabelStyleSimpleExtensionGroup fontFamily="Arial" haloColor="16777215" haloRadius="2" haloOpacity="1"/>
        */
        var __createExtendedStyleLabel = function (feature, style) {
            // FIXME humm..., est ce que ca marche vraiment ?
            logger.trace("label with style :", style);

            if (!feature) {
                return;
            }

            /** RGB Colors (RRGGBB) To KML Colors (AABBGGRR) */
            function __RGBColorsToKML (data) {
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

            var _haloColor = __RGBColorsToKML("#FFFFFF"); // KML Colors : 64FFFFFF (blanc)
            var _haloRadius = "3";
            var _haloOpacity = "1"; // TODO
            var font = "Sans"; // TODO

            var fTextStyle = feature.getStyle().getText().getStroke();
            _haloColor  = __RGBColorsToKML(fTextStyle.color_);
            _haloRadius = fTextStyle.width_;

            if (style && style.getElementsByTagName("LabelStyleSimpleExtensionGroup").length === 0) {
                var labelextend = kmlDoc.createElement("LabelStyleSimpleExtensionGroup");
                labelextend.setAttribute("fontFamily", font);
                labelextend.setAttribute("haloColor", _haloColor);
                labelextend.setAttribute("haloRadius", _haloRadius);
                labelextend.setAttribute("haloOpacity", _haloOpacity);
                style.appendChild(labelextend);
            }
        };

        /**
        * C'est un marker !
        * On va donc ajouter la balise hotspot :
        *  Traiter le cas où les unités sont de type
        *   - FRACTION
        *   - PIXELS
        *  Insertion du correctif dans le noeud : PlaceMark>Style>IconStyle
        *
        *  FIXME : BUG de lecture du KML dans OpenLayers
        *
        *  @example
        *      <Style><IconStyle>
        *      (...)
        *      <hotSpot x="0.5"  y="1" xunits="fraction" yunits="fraction"/>
        *      </IconStyle></Style>
        *
        */
        var __createExtendedStyleIcon = function (feature, style) {
            // FIXME BUG de lecture OL3 sur l'interpretation des properties :
            // origin, anchor avec bottom-left et top-left ?
            // Du coup, la propriété 'y' ne semble pas être correctement intérprétée !?
            logger.trace("marker with style :", style);

            if (!feature) {
                return;
            }

            var x = 0.5;
            var y = 1; // cf. fixme !
            var xunits = "fraction";
            var yunits = "faction";

            var fImageStyle = feature.getStyle().getImage();
            xunits = fImageStyle.anchorXUnits_;
            yunits = fImageStyle.anchorYUnits_;

            var size   = fImageStyle.getSize();
            var anchor = fImageStyle.anchor_;
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
        };

        // On ajoute les styles étendus dans le DOM
        _kmlRead(kmlDoc, features, {
            label : __createExtendedStyleLabel,
            icon : __createExtendedStyleIcon
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
    * FIXME
    * Il est impossible de surcharger ou d'intercepter cette fonction !?
    * Dommage car c'est ici que les modifications sont à apporter !
    */
    KML.prototype.writeIconStyle_ = function (node, style, objectStack) {
        logger.log("overload (FIXME) : ol.format.KML.writeIconStyle_");
        ol.format.KML.prototype.writeIconStyle_.call(this, node, style, objectStack);
    };

    /**
    * FIXME
    * Il est impossible de surcharger ou d'intercepter cette fonction !?
    * Dommage car c'est ici que les modifications sont à apporter !
    */
    KML.prototype.writeLabelStyle_ = function (node, style, objectStack) {
        logger.log("overload (FIXME) : ol.format.KML.writeLabelStyle_");
        ol.format.KML.prototype.writeLabelStyle_.call(this, node, style, objectStack);
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
    KML.prototype.readExtendStylesFeatures = function (source, options) {
        logger.log("overload : ol.format.KML.readFeatures");
        var features = ol.format.KML.prototype.readFeatures.call(this, source, options);

        // On traite le cas où le KML est une string (pour le moment...)
        if ( typeof source === "string" ) {

            // On 'deformatte' le KML
            source = source.replace(/\n/g, "");
            source = source.replace(/(>)\s*(<)/g, "$1$2");

            // On met en place un Parser sur le KML
            var kmlDoc = _kmlParse(source);

            if (kmlDoc === null) {
                // au cas où...
                return features;
            }

            /**
            * Gestion des styles étendus sur le Label
            * - TODO ajout d'un icone par defaut (1x1p transparent) sur les labels
            * sil n'existe pas !
            * - lecture des styles étendus des labels
            * - TODO lecture des ExtendedData en concatenant son champ avec description ou name
            * si presents !
            */
            var __addExtendedStyleToFeatureLabel = function (feature, style) {

                /** KML Colors (AABBGGRR) To RGB Colors (RRGGBB) */
                function __KMLColorsToRGB (data) {
                    var color = "";
                    color = color + data.substr(6,2);
                    color = color + data.substr(4,2);
                    color = color + data.substr(2,2);
                    return "#" + parseInt(color,16).toString(16);
                }

                var _text  = feature.getProperties().name || "---";
                var _color = "#000000";
                var _colorHalo  = "#FFFFFF";
                var _radiusHalo = 4;
                var _font = "Sans"; // TODO

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
                            _color = __KMLColorsToRGB(styles[k].textContent);
                            break;
                        case "LabelStyleSimpleExtensionGroup":
                            var attributs = styles[k].attributes;
                            for (var l = 0; l < attributs.length; l++) {
                                switch (attributs[l].nodeName) {
                                    case "fontFamily":
                                        // TODO
                                        break;
                                    case "haloColor":
                                        _colorHalo = __KMLColorsToRGB(attributs[l].nodeValue);
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

                // FIXME On reconstruit le style !?
                feature.setStyle(new ol.style.Style({
                    text : new ol.style.Text({
                        font : "16px sans",
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
            * Gestion des styles étendus sur le Marker
            * - TODO transformation du hotspot y === 0 (?)
            */
            var __addExtendedStyleToFeatureIcon  = function (feature, style) {};

            // On lit les styles étendus et on les ajoute aux features
            _kmlRead(kmlDoc, features, {
                label : __addExtendedStyleToFeatureLabel,
                icon : __addExtendedStyleToFeatureIcon
            });

        }

        return features;
    };

    return KML;

});
