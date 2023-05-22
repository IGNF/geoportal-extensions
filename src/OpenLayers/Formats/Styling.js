import Color from "../../Common/Utils/ColorUtils";
import Logger from "../../Common/Utils/LoggerByDefault";
// import ol
import Feature from "ol/Feature";
// import Style
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import IconStyle from "ol/style/Icon";
import FillStyle from "ol/style/Fill";
import StrokeStyle from "ol/style/Stroke";
import TextStyle from "ol/style/Text";
// import geom
import Polygon from "ol/geom/Polygon";
import MultiPolygon from "ol/geom/MultiPolygon";

var logger = Logger.getLogger("styling");

Feature.prototype.setPropertyFill = function () {
    var style = this.getStyle();
    if (!style) {
        return;
    }
    if (Array.isArray(style) && style.length === 0) {
        return;
    }
    var fill = style.getFill();
    if (fill) {
        var colorFill = fill.getColor();
        // array
        if (Array.isArray(colorFill)) {
            var cf = "rgba(";
            cf += colorFill[0] + ",";
            cf += colorFill[1] + ",";
            cf += colorFill[2] + ",";
            cf += colorFill[3] + ")";
            colorFill = cf;
        }
        if (Color.isRGB(colorFill)) {
            var oColorFill = Color.rgbaToHex(colorFill);
            this.set("fill", oColorFill.hex);
            this.set("fill-opacity", oColorFill.opacity);
        } else {
            this.set("fill", colorFill);
            this.set("fill-opacity", 1);
        }
    }
};

Feature.prototype.setPropertyStroke = function () {
    var style = this.getStyle();
    if (!style) {
        return;
    }
    if (Array.isArray(style) && style.length === 0) {
        return;
    }
    var stroke = style.getStroke();
    if (stroke) {
        var colorStroke = stroke.getColor();
        // array
        if (Array.isArray(colorStroke)) {
            var cs = "rgba(";
            cs += colorStroke[0] + ",";
            cs += colorStroke[1] + ",";
            cs += colorStroke[2] + ",";
            cs += colorStroke[3] + ")";
            colorStroke = cs;
        }
        if (Color.isRGB(colorStroke)) {
            var oColorStroke = Color.rgbaToHex(colorStroke);
            this.set("stroke", oColorStroke.hex);
            this.set("stroke-opacity", oColorStroke.opacity);
        } else {
            this.set("stroke", colorStroke);
            this.set("stroke-opacity", 1);
        }
        this.set("stroke-width", stroke.getWidth());
    }
};

Feature.prototype.setPropertyLabel = function () {
    var style = this.getStyle();
    if (!style) {
        return;
    }
    if (Array.isArray(style) && style.length === 0) {
        return;
    }
    var isName = this.get("name") !== undefined;
    var label = style.getText();
    if (label && isName) {
        var fill = style.getText().getFill();
        if (fill) {
            var colorFill = fill.getColor();
            // array
            if (Array.isArray(colorFill)) {
                var cf = "rgba(";
                cf += colorFill[0] + ",";
                cf += colorFill[1] + ",";
                cf += colorFill[2] + ",";
                cf += colorFill[3] + ")";
                colorFill = cf;
            }
            if (Color.isRGB(colorFill)) {
                var oColorFill = Color.rgbaToHex(colorFill);
                this.set("label-fill", oColorFill.hex);
                this.set("label-fill-opacity", oColorFill.opacity);
            } else {
                this.set("label-fill", colorFill);
                this.set("label-fill-opacity", 1);
            }
        }
        var stroke = style.getText().getStroke();
        if (stroke) {
            var colorStroke = stroke.getColor();
            // array
            if (Array.isArray(colorStroke)) {
                var cs = "rgba(";
                cs += colorStroke[0] + ",";
                cs += colorStroke[1] + ",";
                cs += colorStroke[2] + ",";
                cs += colorStroke[3] + ")";
                colorStroke = cs;
            }
            if (Color.isRGB(colorStroke)) {
                var oColorStroke = Color.rgbaToHex(colorStroke);
                this.set("label-stroke", oColorStroke.hex);
                this.set("label-stroke-opacity", oColorStroke.opacity);
            } else {
                this.set("label-stroke", colorStroke);
                this.set("label-stroke-opacity", 1);
            }
            this.set("label-stroke-width", stroke.getWidth());
        }
        this.set("label-font", style.getText().getFont() || Styling.DEFAULT_TEXT.font);
        this.set("label-textAlign", style.getText().getTextAlign() || Styling.DEFAULT_TEXT.textAlign);
    }
};

Feature.prototype.setPropertyMarker = function () {
    var style = this.getStyle();
    if (!style) {
        return;
    }
    if (Array.isArray(style) && style.length === 0) {
        return;
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
                this.set("marker-color", colorIcon.hex);
            }
            var scaleIcon = image.getScale();
            switch (scaleIcon) {
                case 0.5:
                    this.set("marker-size", "small");
                    break;
                case 1:
                    this.set("marker-size", "medium");
                    break;
                case 1.5:
                    this.set("marker-size", "large");
                    break;
                default:
                    // this.set("marker-size", ""); // par defaut
                    break;
            }
            // feature.set("marker-symbol", ""); // par defaut
            var srcImage = image.getSrc();
            if (srcImage) {
                this.set("marker-symbol", srcImage);
            }
            // INFO
            // cas particulier où un objet est transformé :
            //  * un cercle est transformé en icone
            //  > les attributs du cercle sont à supprimer !
            this.unset("circle-fill");
            this.unset("circle-fill-opacity");
            this.unset("circle-stroke");
            this.unset("circle-stroke-width");
            this.unset("circle-stroke-opacity");
            this.unset("circle-radius");
        } else {
            var fillImg = image.getFill();
            if (fillImg) {
                var colorFillImg = fillImg.getColor();
                // array
                if (Array.isArray(colorFillImg)) {
                    var cfi = "rgba(";
                    cfi += colorFillImg[0] + ",";
                    cfi += colorFillImg[1] + ",";
                    cfi += colorFillImg[2] + ",";
                    cfi += colorFillImg[3] + ")";
                    colorFillImg = cfi;
                }
                if (Color.isRGB(colorFillImg)) {
                    var oColorFillImg = Color.rgbaToHex(colorFillImg);
                    this.set("circle-fill", oColorFillImg.hex);
                    this.set("circle-fill-opacity", oColorFillImg.opacity);
                } else {
                    this.set("circle-fill", colorFillImg);
                    this.set("circle-fill-opacity", 1);
                }
            }
            var strokeImg = image.getStroke();
            if (strokeImg) {
                var colorStrokeImg = strokeImg.getColor();
                // array
                if (Array.isArray(colorStrokeImg)) {
                    var csi = "rgba(";
                    csi += colorStrokeImg[0] + ",";
                    csi += colorStrokeImg[1] + ",";
                    csi += colorStrokeImg[2] + ",";
                    csi += colorStrokeImg[3] + ")";
                    colorStrokeImg = csi;
                }
                if (Color.isRGB(colorStrokeImg)) {
                    var oColorStrokeImg = Color.rgbaToHex(colorStrokeImg);
                    this.set("circle-stroke", oColorStrokeImg.hex);
                    this.set("circle-stroke-opacity", oColorStrokeImg.opacity);
                } else {
                    this.set("circle-stroke", colorStrokeImg);
                    this.set("circle-stroke-opacity", 1);
                }
                this.set("circle-stroke-width", strokeImg.getWidth());
            }
            var radius = image.getRadius();
            this.set("circle-radius", radius);
        }
    }
};

/**
 * @module Styling
 * @alias Gp.Styling
 * @todo ...
 * @description
 * A simple specification for styling GeoJSON / GPX / KML data.
 *
 * @see ol.format.GeoJSONExtended
 * @see ol.format.KMLExtended
 * @see ol.format.GPXExtended
 *
 * @example
 * feature.getStyle(); // null
 * feature.getProperties(); // {"stroke": "#ff0000", "stroke-width": 2}
 * Styling.defineStyleFromProperties(feature);
 * feature.getStyle(); // [Object Style]
 *
 * feature.getStyle(); // [Object Style]
 * feature.getProperties(); // {}
 * Styling.definePropertiesFromStyle(feature);
 * feature.getProperties(); // {"stroke": "#ff0000", "stroke-width": 2}
 *
 * var style = feature.getStyle(); // [Object Style]
 * var tag = Styling.setTag(style, "GPX");
 *
 * ex. output GeoJSON:
 * ```json
 *  "properties": {
 *   "stroke": "#ff0000",
 *   "stroke-width": 2
 *  }
 * ```
 */
var Styling = {

    /**
     * Options to convert geometry
     */
    APPLY_CONVERT_GEOM_GPX : true,

    /**
     * Default icon style options
     */
    DEFAULT_ICON : {
        src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAToSURBVFiF3VhdbFNlGH7ec05/F6IUE9GLIYgXXYpXJBBZE0xM9EausIl6ObzBGSHRdnEJ1p+RhnBBNF4YY/xJFigNaIwxLpFYB2WwMWCW0bG1W7eEdUBwQ0fb7fy83nQJjK3nnO90F/okvTnf+7zP+/Q75/ve7wP+R6BGJ4xGo+skSXqFmfcAaAHwFIANAO4CmCai64Zh/OT3+3+Nx+PzjdRumJmOjo71zNwB4B0APguUMjN/vri4mDh27NhcI2poiJloNLqXiL4EEBCg/8XMbx05cuS00zpkh3yKxWKHiOgLAH7BHD4iiuzatcvIZDJnnRTjyEw0Gv2QiD6C8xkmInqxtbVVy2QyvcJJRIm1V+ukkxwrwCCivYlE4gcRslAhBw4ceNzj8RQg9o2YYZaInk0kErN2iZKImtvt/gBrYwQA1gN4X4Roe2ai0eg6IroFa8uvKMo+n+9Ju/uQYleltiGaGnG73eVIJNIfDAa3yLK8Udf1mVwuN55MJneoqmrG91er1ZcBnLJVm51gAKjt7HXhdrvLnZ2d46FQaLcsy80A3LIsN4dCod2dnZ15l8tVaYTOcoh8M0GzgEgk0u/xeEIrjXm93m2RSOSiBZ0Wu4WJmHnaLCAYDG6pN97S0rK5ETrLIWJmg1mALMsbnYzX8ITlimoQMfOPWYCu6zMm4yULOn9brqgGETO3zAJyudx4vfFr164VzXIwc90/ZCWImOk3C0gmkzuq1Wp2pbFyuZxNpVI7zXIQkanOcoiY+d0sQFVVX1dX19ZsNpvWdX0SwKKu65NDQ0Ppw4cPP6dpmtcsBzOn7RZme9P0+XynK5XKZwAeqxenqqqvu7t79wOPNtV+VnDPMAzb5xvbM1NrMb6xy7OJr48ePXrfLkmo0SSijwHcFuFawG0i+lSEKGSm1p4fFOFawEGR9h9weLCKxWLdAN5wkuNBMPPxEydOvC1JksfD7Fsg8riYSdMlFwAosqFqkmQQUcW9sHB/282bcylAX+LbXgCWYT+AFwA84zAPVFWdO9PTM+WWpHcBQCeCAoCJICsMAGAQZGaAGZrLhcubNutbGUVF4rMjxWLR8ZE3Fou1AkjDwX0CM/OVwcHvJwqFomgKDfjO6e0MMpnMVDgc9gIIi+YoTU+fyw4NXXFQBpFh3BFaAJbD6/UeAmClrX8ElXK5dOnixT+c6BuAoUtSoSFm4vG4ZhjGm7DQhD5UhGGoAwMDp1RV1c2jVwHzIsny6WKxOOP4NVvC+fPnZ8Ph8F0Ar1rlFPL5X8bHxuo2pXXADIx4df3kjcnJSWANLs5jsdhJAK+Zxd2bmxv5racnKSBRYeY/oSiDhULhoY3b6dL8CDRN209EL8myvH7VGFW9f6Gv72erOZlJA3GeJWm4ubk5l06ntZXiGj4zANDe3r6nqanpx1Xyc/bq1eOjN26M1cvBTKoEY4IkadiQ5ZF8Pr9gprsmZgCgvb29u6mp6ZHuYKZUupDp7e1ZhVYB0bgEjLr8/tzw8PCiHc2Gv2ZLmJ+fb1MUpdXj8TQvPatWq3f6+/rOPBjHQBnMY4okXX9++/Z8KpUSXtnWbGYAYN++fTsDgUAvEbkMw9AvnDv3ValUugXgHojyMjD6+sTEWBwwGqG3pmYAoK2t7ZNAIPDe1OTUqSuXBr6FouRGR0enAfBaa/+n8S8PPeWMetb8+wAAAABJRU5ErkJggg==",
        anchor : [0.5, 1],
        scale : 1
    },

    /**
     * Default circle style options
     */
    DEFAULT_CIRCLE : {
        radius : 10,
        fill : {
            opacity : 1,
            color : [0, 0, 0, 1]
        },
        stroke : {
            width : 1,
            opacity : 1,
            color : [0, 0, 0, 1]
        }
    },

    /**
     * Default stroke style options
     */
    DEFAULT_STROKE : {
        width : 5,
        opacity : 1,
        color : [250, 250, 250, 1]
    },

    /**
     * Default fill style options
     */
    DEFAULT_FILL : {
        opacity : 1,
        color : [0, 0, 0, 1]
    },

    /**
     * Default text style options
     * @see https://openlayers.org/en/v6.15.1/apidoc/module-ol_style_Text-Text.html
     */
    DEFAULT_TEXT : {
        font : "16px sans",
        textAlign : "left",
        stroke : {
            color : [250, 250, 250, 1],
            width : 5,
            opactity : 1
        },
        fill : {
            opacity : 1,
            color : [0, 0, 0, 1]
        }
        // offsetX
        // offsetY
        // placement
        // scale
        // rotation
        // justify
        // padding
    },

    /**
     * All styling tags
     * @function getListTags
     * @returns {Array} all styling tags
     * @example
     * "type", // type de geometrie
     * "fill",
     * "fill-opacity",
     * "stroke",
     * "stroke-opacity",
     * "stroke-width",
     * "circle-fill",
     * "circle-fill-opacity",
     * "circle-stroke",
     * "circle-stroke-opacity",
     * "circle-stroke-width",
     * "circle-radius",
     * "marker-symbol",
     * "marker-color",
     * "marker-size"
     */
    getListTags : function () {
        return [
            "type",
            "fill",
            "fill-opacity",
            "stroke",
            "stroke-opacity",
            "stroke-width",
            "circle-fill",
            "circle-fill-opacity",
            "circle-stroke",
            "circle-stroke-opacity",
            "circle-stroke-width",
            "circle-radius",
            "marker-symbol",
            "marker-color",
            "marker-size",
            "label-fill",
            "label-fill-opacity",
            "label-stroke",
            "label-stroke-width",
            "label-stroke-opacity",
            "label-font",
            "label-textAlign"
        ];
    },

    /**
     * Transform feature properties to a native style
     *
     * @function defineStyleFromProperties
     * @param {*} feature - ...
     * @returns {*} style - ...
     * @public
     *
     * @description
     * A la lecture du format :
     * > tag styling ---> feature properties ---> feature style
     *
     * Les balises de 'styling' du fichier sont ajoutées dans les properties de chaque features
     * (opération native sous OpenLayers):
     *
     * Ex. avec le format GeoJSON :
     * ```json
     * "properties": {
     *    "stroke": "#000000",      -> feature.get("stroke");
     *    "stroke-width": 13,       -> feature.get("stroke-width");
     *    "stroke-opacity": 0.8,    -> feature.get("stroke-opacity");
     *    "fill": "#a03737",        -> feature.get("fill");
     *    "fill-opacity": 0.5       -> feature.get("fill-opacity");
     * }
     * ```
     *
     * Ensuite, les properties des features sont transformées dans le style natif :
     *
     * ```js
     * // Ex.
     * feature.setStyle(new Style({
     *  fill : new FillStyle({
     *      color : Color.hexToRgba(feature.get("fill"), feature.get("fill-opacity") || 1)
     *  }),
     *  stroke : new StrokeStyle({
     *      color : Color.hexToRgba(feature.get("stroke"), feature.get("stroke-opacity"))
     *      width : feature.get("stroke-width")
     *  })
     * }));
     * ```
     */
    defineStyleFromProperties : function (feature) {
        // style
        var style = null;

        // les options de styles définis dans le format
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
            marker["src"] = this.DEFAULT_ICON.src;
            marker["anchor"] = this.DEFAULT_ICON.anchor;
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
                        marker["scale"] = this.DEFAULT_ICON.scale;
                        break;
                }
            }
        }

        // properties :
        // "stroke" -> line / polygon
        // "stroke-opacity" -> line / polygon
        // "stroke-width" -> line / polygon
        var stroke = null;
        if (feature.get("stroke") ||
            feature.get("stroke-opacity") ||
            feature.get("stroke-width")) {
            stroke = {};
            stroke["color"] = Color.hexToRgba(feature.get("stroke"), +feature.get("stroke-opacity") || this.DEFAULT_STROKE.opacity);
            stroke["width"] = +feature.get("stroke-width") || this.DEFAULT_STROKE.width;
        }

        // properties :
        // "fill" -> polygon
        // "fill-opacity" -> polygon
        var fill = null;
        if (feature.get("fill") ||
            feature.get("fill-opacity")) {
            fill = {};
            fill["color"] = Color.hexToRgba(feature.get("fill"), +feature.get("fill-opacity") || this.DEFAULT_FILL.opacity);
        }

        // properties :
        // "label-fill",
        // "label-fill-opacity",
        // "label-stroke",
        // "label-stroke-width",
        // "label-stroke-opacity",
        // "label-font",
        // "label-textAlign"
        // "name" -> text
        var labelStroke = null;
        var labelFill = null;
        var isLabel = feature.get("name") !== "";
        if (isLabel) {
            if (feature.get("label-fill") ||
                feature.get("label-fill-opacity")) {
                labelFill = {};
                labelFill["color"] = Color.hexToRgba(feature.get("label-fill"), +feature.get("label-fill-opacity") || this.DEFAULT_TEXT.fill.opacity);
            }
            if (feature.get("label-stroke") ||
                feature.get("label-stroke-opacity") ||
                feature.get("label-stroke-width")) {
                labelStroke = {};
                labelStroke["color"] = Color.hexToRgba(feature.get("label-stroke"), +feature.get("label-stroke-opacity") || this.DEFAULT_TEXT.stroke.opacity);
                labelStroke["width"] = +feature.get("label-stroke-width") || this.DEFAULT_TEXT.stroke.width;
            }
        }

        // properties :
        // "circle-fill"
        // "circle-stroke"
        // "circle-stroke-width"
        // "circle-radius"
        var circleRadius = feature.get("circle-radius") || this.DEFAULT_CIRCLE.radius;
        var circleStroke = null;
        if (feature.get("circle-stroke") ||
            feature.get("circle-stroke-opacity") ||
            feature.get("circle-stroke-width")) {
            circleStroke = {};
            circleStroke["color"] = Color.hexToRgba(feature.get("circle-stroke"), +feature.get("circle-stroke-opacity") || this.DEFAULT_CIRCLE.stroke.opacity);
            circleStroke["width"] = +feature.get("circle-stroke-width") || this.DEFAULT_CIRCLE.stroke.width;
        }
        var circleFill = null;
        if (feature.get("circle-fill") ||
            feature.get("circle-fill-opacity")) {
            circleFill = {};
            circleFill["color"] = Color.hexToRgba(feature.get("circle-fill"), +feature.get("circle-fill-opacity") || this.DEFAULT_CIRCLE.fill.opacity);
        }

        // options du Style en fonction du type de geometrie
        var type = feature.getGeometry().getType();
        switch (type) {
            case "Circle":
            case "Point":
            case "MultiPoint":
                // Cercle
                var isCircle = false;
                var optionsCircle = {};
                if (circleStroke) {
                    optionsCircle["stroke"] = new StrokeStyle(circleStroke);
                }
                if (circleFill) {
                    optionsCircle["fill"] = new FillStyle(circleFill);
                }
                if (Object.keys(optionsCircle).length !== 0) {
                    isCircle = true;
                    optionsCircle["radius"] = +circleRadius; // Conversion en nombre
                    options["image"] = new CircleStyle(optionsCircle);
                }
                // Ponctuel
                if (marker) {
                    options["image"] = new IconStyle(marker);
                }
                // Label
                if (isLabel) {
                    var optionsText = {};

                    if (labelStroke) {
                        optionsText["stroke"] = new StrokeStyle(labelStroke);
                    }
                    if (labelFill) {
                        optionsText["fill"] = new FillStyle(labelFill);
                    }
                    if (Object.keys(optionsText).length !== 0) {
                        optionsText["text"] = feature.get("name");
                        optionsText["textAlign"] = feature.get("label-textAlign") || this.DEFAULT_TEXT.textAlign;
                        optionsText["font"] = feature.get("label-font") || this.DEFAULT_TEXT.font;
                        options["text"] = new TextStyle(
                            Object.assign({},
                                this.DEFAULT_TEXT,
                                optionsText
                            ));
                    } else {
                        // on applique un style par defaut sur le label
                        // pour un marker ou un cercle
                        if (marker || isCircle) {
                            var styleText = new TextStyle(
                                Object.assign({},
                                    this.DEFAULT_TEXT, {
                                        fill : new FillStyle(this.DEFAULT_TEXT.fill),
                                        stroke : new StrokeStyle(this.DEFAULT_TEXT.stroke)
                                    }
                                )
                            );
                            if (styleText) {
                                var cloneStyleText = styleText.clone();
                                cloneStyleText.setText(feature.get("name"));
                                options["text"] = cloneStyleText;
                            }
                        }
                    }
                }
                break;

            case "Polygon":
            case "MultiPolygon":
                if (stroke) {
                    options["stroke"] = new StrokeStyle(stroke);
                }
                if (fill) {
                    options["fill"] = new FillStyle(fill);
                }
                break;

            case "LineString":
            case "MultiLineString":
                if (stroke) {
                    options["stroke"] = new StrokeStyle(stroke);
                }
                if (this.APPLY_CONVERT_GEOM_GPX && fill) {
                    // INFO
                    // Lors d'une transformation de type de geometrie, le type est renseigné.
                    // Pour le format GPX,
                    // -> on transforme une surface vers ligne lors de l'écriture
                    // -> on transforme une ligne vers une surface lors de la lecture si le type est précisé !
                    var initType = feature.get("type");
                    if (initType && (initType === "Polygon" || initType === "MultiPolygon")) {
                        options["fill"] = new FillStyle(fill);
                        var f = feature.clone();
                        var ClassPoly = (type === "LineString") ? Polygon : MultiPolygon;
                        feature.setGeometry(new ClassPoly([f.getGeometry().getCoordinates()]));
                    }
                }
                break;

            default:
                break;
        }

        // si aucun style disponible, on utilisera le style par defaut defini
        // par l'utilisateur ou l'application
        if (Object.keys(options).length !== 0) {
            style = new Style(options);
        }

        return style;
    },

    /**
     * Define a default style function to apply to a feature
     *
     * @function defineStyleFunctionByDefault
     * @param {Object} defaultStyle - ...
     * @returns {Function} style function
     * @public
     *
     * @description
     * ...
     */
    defineStyleFunctionByDefault : function (defaultStyle) {
        if (!defaultStyle) {
            return [];
        }

        if (Object.keys(defaultStyle).length === 0) {
            return [];
        }

        // les styles par defaut
        var styleFunction = (feature, resolution) => {
            var style = null;
            var type = feature.getGeometry().getType();
            switch (type) {
                case "Point":
                case "MultiPoint":
                    // on n'a aucune information sur le type de style à appliquer sur un "Point" :
                    // * label ou
                    // * marker ou
                    // * marker avec label
                    // donc, c'est en fonction des styles par defaut...
                    var opts = {};
                    if (defaultStyle.getImage()) {
                        opts["image"] = defaultStyle.getImage();
                    }
                    if (defaultStyle.getText() && feature.get("name")) {
                        var styleText = defaultStyle.getText().clone();
                        styleText.setText(feature.get("name"));
                        opts["text"] = styleText;
                    }
                    style = new Style(opts);
                    break;
                case "Circle":
                    var optsc = {};

                    var optsCircle = {};
                    if (defaultStyle.getFill()) {
                        optsCircle.fill = defaultStyle.getFill();
                    }
                    if (defaultStyle.getStroke()) {
                        optsCircle.stroke = defaultStyle.getStroke();
                    }
                    if (defaultStyle.getText() && feature.get("name")) {
                        var styleTextCircle = defaultStyle.getText().clone();
                        styleTextCircle.setText(feature.get("name"));
                        optsc.text = styleTextCircle;
                    }
                    if (Object.keys(optsCircle).length !== 0) {
                        // FIXME param radius ?
                        optsCircle.radius = 3;
                        optsc.image = new CircleStyle(optsCircle);
                    }
                    style = new Style(optsc);
                    break;
                case "Polygon":
                case "MultiPolygon":
                    var optsp = {};
                    if (defaultStyle.getFill()) {
                        optsp.fill = defaultStyle.getFill();
                    }
                    if (defaultStyle.getStroke()) {
                        optsp.stroke = defaultStyle.getStroke();
                    }
                    style = new Style(optsp);
                    break;
                case "LineString":
                case "LinearRing":
                case "MultiLineString":
                    var optsl = {};
                    if (defaultStyle.getStroke()) {
                        optsl.stroke = defaultStyle.getStroke();
                    }
                    style = new Style(optsl);
                    break;
            }
            return [style];
        };
        return styleFunction;
    },

    /**
     * Transform a native style to feature properties by type of geometry
     *
     * @todo not yet implemented !
     * @param {*} feature - feature
     */
    definePropertiesFromStyleByType : function (feature) {
        var geomType = feature.getGeometry().getType();
        switch (geomType) {
            case "Point":
            case "MultiPoint":
                feature.setPropertyMarker();
                feature.setPropertyLabel();
                break;
            case "LineString":
            case "MultiLineString":
                feature.setPropertyStroke();
                break;
            case "Polygon":
            case "MultiPolygon":
                feature.setPropertyStroke();
                feature.setPropertyFill();
                break;
            default:
                break;
        }
    },

    /**
     * Transform a native style to feature properties
     *
     * @function definePropertiesFromStyle
     * @param {*} feature - ...
     * @public
     *
     * @description
     * A l'écriture du format.
     * > feature style --> feature properties --> tag styling
     *
     * Le style natif est récupéré pour chaque feature :
     *
     * ```js
     * // Ex.
     * var style = feature.getStyle();
     * ```
     *
     * Ensuite, le style natif est transformé en properties pour chaque feature :
     *
     * ```js
     * // Ex.
     * var stroke = style.getStroke();
     * var oColorStroke = Color.rgbaToHex(stroke.getColor());
     * feature.set("stroke", oColorStroke.hex); // #000000
     * feature.set("stroke-opacity", oColorStroke.opacity); // 0.8
     * ```
     *
     * Et, chaque properties des features sont ecrites dans le format du fichier
     * (opération native sous OpenLayers) :
     *
     * Ex. avec le format GeoJSON :
     * ```json
     * "properties": {
     *    "stroke": "#000000",
     *    "stroke-opacity": 0.8
     * }
     * ```
     */
    definePropertiesFromStyle : function (feature) {
        var style = feature.getStyle() || feature.getStyleFunction();
        if (style) {
            // style ajouté via une fonction, pour les styles par defaut par ex.
            if (typeof style === "function") {
                var styles = style.call(this, feature, 0);
                if (styles && styles.length !== 0) {
                    style = (Array.isArray(styles)) ? styles[0] : styles;
                    feature.setStyle(style);
                } else {
                    // au cas où...
                    return;
                }
            }
            this.definePropertiesFromStyleByType(feature);
        }
    },

    /**
     * Transform a native style to tags 'styling' into the format
     *
     * @function defineTagFromStyle
     * @param {*} style - ...
     * @param {String} format - ...
     * @returns {String} tags stringify into the format (json / xml)
     * @todo
     * @public
     *
     * @description
     * A partir d'un style natif, on le transforme en balise de 'styling' dans le format demandé,
     * que l'on peut ensuite inserer dans le fichier.
     * > style ---> tag styling
     *
     */
    defineTagFromStyle : function (style, format) {
        logger.trace("todo...");
        return null;
    }
};

export default Styling;
