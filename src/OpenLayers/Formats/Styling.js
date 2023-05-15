import Color from "../../Common/Utils/ColorUtils";
import Logger from "../../Common/Utils/LoggerByDefault";
// import Style
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import IconStyle from "ol/style/Icon";
import FillStyle from "ol/style/Fill";
import StrokeStyle from "ol/style/Stroke";
import TextStyle from "ol/style/Text";
// import geom
import LineString from "ol/geom/LineString";
import MultiLineString from "ol/geom/MultiLineString";
import Polygon from "ol/geom/Polygon";
import MultiPolygon from "ol/geom/MultiPolygon";

var logger = Logger.getLogger("styling");

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
     * @todo
     */
    APPLY_CONVERT_GEOM: {
        ToLineString : false,
        ToPolygon : false
    },

    /**
     * Default icon style options
     */
    DEFAULT_ICON: {
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAToSURBVFiF3VhdbFNlGH7ec05/F6IUE9GLIYgXXYpXJBBZE0xM9EausIl6ObzBGSHRdnEJ1p+RhnBBNF4YY/xJFigNaIwxLpFYB2WwMWCW0bG1W7eEdUBwQ0fb7fy83nQJjK3nnO90F/okvTnf+7zP+/Q75/ve7wP+R6BGJ4xGo+skSXqFmfcAaAHwFIANAO4CmCai64Zh/OT3+3+Nx+PzjdRumJmOjo71zNwB4B0APguUMjN/vri4mDh27NhcI2poiJloNLqXiL4EEBCg/8XMbx05cuS00zpkh3yKxWKHiOgLAH7BHD4iiuzatcvIZDJnnRTjyEw0Gv2QiD6C8xkmInqxtbVVy2QyvcJJRIm1V+ukkxwrwCCivYlE4gcRslAhBw4ceNzj8RQg9o2YYZaInk0kErN2iZKImtvt/gBrYwQA1gN4X4Roe2ai0eg6IroFa8uvKMo+n+9Ju/uQYleltiGaGnG73eVIJNIfDAa3yLK8Udf1mVwuN55MJneoqmrG91er1ZcBnLJVm51gAKjt7HXhdrvLnZ2d46FQaLcsy80A3LIsN4dCod2dnZ15l8tVaYTOcoh8M0GzgEgk0u/xeEIrjXm93m2RSOSiBZ0Wu4WJmHnaLCAYDG6pN97S0rK5ETrLIWJmg1mALMsbnYzX8ITlimoQMfOPWYCu6zMm4yULOn9brqgGETO3zAJyudx4vfFr164VzXIwc90/ZCWImOk3C0gmkzuq1Wp2pbFyuZxNpVI7zXIQkanOcoiY+d0sQFVVX1dX19ZsNpvWdX0SwKKu65NDQ0Ppw4cPP6dpmtcsBzOn7RZme9P0+XynK5XKZwAeqxenqqqvu7t79wOPNtV+VnDPMAzb5xvbM1NrMb6xy7OJr48ePXrfLkmo0SSijwHcFuFawG0i+lSEKGSm1p4fFOFawEGR9h9weLCKxWLdAN5wkuNBMPPxEydOvC1JksfD7Fsg8riYSdMlFwAosqFqkmQQUcW9sHB/282bcylAX+LbXgCWYT+AFwA84zAPVFWdO9PTM+WWpHcBQCeCAoCJICsMAGAQZGaAGZrLhcubNutbGUVF4rMjxWLR8ZE3Fou1AkjDwX0CM/OVwcHvJwqFomgKDfjO6e0MMpnMVDgc9gIIi+YoTU+fyw4NXXFQBpFh3BFaAJbD6/UeAmClrX8ElXK5dOnixT+c6BuAoUtSoSFm4vG4ZhjGm7DQhD5UhGGoAwMDp1RV1c2jVwHzIsny6WKxOOP4NVvC+fPnZ8Ph8F0Ar1rlFPL5X8bHxuo2pXXADIx4df3kjcnJSWANLs5jsdhJAK+Zxd2bmxv5racnKSBRYeY/oSiDhULhoY3b6dL8CDRN209EL8myvH7VGFW9f6Gv72erOZlJA3GeJWm4ubk5l06ntZXiGj4zANDe3r6nqanpx1Xyc/bq1eOjN26M1cvBTKoEY4IkadiQ5ZF8Pr9gprsmZgCgvb29u6mp6ZHuYKZUupDp7e1ZhVYB0bgEjLr8/tzw8PCiHc2Gv2ZLmJ+fb1MUpdXj8TQvPatWq3f6+/rOPBjHQBnMY4okXX9++/Z8KpUSXtnWbGYAYN++fTsDgUAvEbkMw9AvnDv3ValUugXgHojyMjD6+sTEWBwwGqG3pmYAoK2t7ZNAIPDe1OTUqSuXBr6FouRGR0enAfBaa/+n8S8PPeWMetb8+wAAAABJRU5ErkJggg==",
        anchor: [0.5, 1],
        scale: 1
    },

    /**
     * Default circle style options
     */
    DEFAULT_CIRCLE: {
        radius: 10,
        fill: {
            opacity: 1,
            color: [0, 0, 0, 1]
        },
        stroke: {
            width: 1,
            opacity: 1,
            color: [0, 0, 0, 1]
        },
    },

    /**
     * Default stroke style options
     */
    DEFAULT_STROKE: {
        width: 5,
        opacity: 1,
        color: [0, 0, 0, 1]
    },

    /**
     * Default fill style options
     */
    DEFAULT_FILL: {
        opacity: 1,
        color: [250, 250, 250, 1]
    },

    /**
     * Default text style options
     */
    DEFAULT_TEXT: {
        font: "16px sans",
        textAlign: "left"
    },

    /**
     * All styling tags
     * @function getListTags
     * @returns {Array} all styling tags
     * @example
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
    getListTags: function () {
        return [
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
            "marker-size"
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
    defineStyleFromProperties: function (feature) {
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
        // "stroke" -> line / polygon / label
        // "stroke-opacity" -> line / polygon / label
        // "stroke-width" -> line / polygon  / label
        var stroke = null;
        if (feature.get("stroke") ||
            feature.get("stroke-opacity") ||
            feature.get("stroke-width")) {
            stroke = {};
            stroke["color"] = Color.hexToRgba(feature.get("stroke"), +feature.get("stroke-opacity") || this.DEFAULT_STROKE.opacity);
            stroke["width"] = +feature.get("stroke-width") || this.DEFAULT_STROKE.width;
        }

        // properties :
        // "fill" -> polygon / label
        // "fill-opacity" -> polygon / label
        var fill = null;
        if (feature.get("fill") ||
            feature.get("fill-opacity")) {
            fill = {};
            fill["color"] = Color.hexToRgba(feature.get("fill"), +feature.get("fill-opacity") || this.DEFAULT_FILL.opacity);
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

        // properties :
        // "name" -> text
        var label = (feature.get("name")) ? true : false;

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
                if (label) {
                    var optionsText = {};

                    if (stroke) {
                        optionsText["stroke"] = new StrokeStyle(stroke);
                    }
                    if (fill) {
                        optionsText["fill"] = new FillStyle(fill);
                    }
                    if (Object.keys(optionsText).length !== 0) {
                        optionsText["text"] = feature.get("name");
                        options["text"] = new TextStyle(
                            Object.assign(
                                this.DEFAULT_TEXT, 
                                optionsText
                            ));
                    } else {
                        // on applique un style par defaut sur le label
                        // pour un marker ou un cercle
                        if (marker || isCircle) {
                            var styleText = new TextStyle(
                                Object.assign(
                                    this.DEFAULT_TEXT, 
                                    {
                                        fill: new FillStyle(this.DEFAULT_FILL),
                                        stroke: new StrokeStyle(this.DEFAULT_STROKE)
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
                // cas particulier où on souhaite convertir une geometrie de type surfacique en lineaire
                // car on possède un style lineaire
                if (this.APPLY_CONVERT_GEOM.ToLineString && stroke) {
                    options["stroke"] = new StrokeStyle(stroke);
                    var f = feature.clone();
                    var ClassLine = (type === "Polygon") ? LineString : MultiLineString;
                    feature.setGeometry(new ClassLine([f.getGeometry().getCoordinates()]));
                }
                break;

            case "LineString":
            case "MultiLineString":
                if (stroke) {
                    options["stroke"] = new StrokeStyle(stroke);
                }
                // cas particulier où on souhaite convertir une geometrie de type lineaire en surfacique
                // car on possède un style surfacique
                if (this.APPLY_CONVERT_GEOM.ToPolygon && fill) {
                    options["fill"] = new FillStyle(fill);
                    var f = feature.clone();
                    var ClassPoly = (type === "LineString") ? Polygon : MultiPolygon;
                    feature.setGeometry(new ClassPoly([f.getGeometry().getCoordinates()]));
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
    defineStyleFunctionByDefault: function (defaultStyle) {
        
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
                        var styleText = defaultStyle.getText().clone();
                        styleText.setText(feature.get("name"));
                        optsc.text = styleText;
                    }
                    if (Object.keys(optsCircle).length !== 0) {
                        // FIXME param radius ?
                        optsCircle.radius = 3;
                        optsc.image = new CircleStyle(optsCircle)
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
    definePropertiesFromStyle: function (feature) {
        var style = feature.getStyle() || feature.getStyleFunction();
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
            // convertir le style en properties en fonction du type de Feature
            // * LineString : stroke
            // * Polygon : fill / stroke
            // * Point : image / text 
            //      * un marker avec ou sans un label
            //      * un cercle (*)
            //      * un label
            // (*) le cercle : fill / stroke / radius

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
                    feature.set("fill", oColorFill.hex);
                    feature.set("fill-opacity", oColorFill.opacity);
                } else {
                    feature.set("fill", colorFill);
                    feature.set("fill-opacity", 1);
                }
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
                    feature.set("stroke", oColorStroke.hex);
                    feature.set("stroke-opacity", oColorStroke.opacity);
                } else {
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
                    // INFO
                    // cas particulier où un objet est transformé :
                    //  * un cercle est transformé en icone
                    //  > les attributs du cercle sont à supprimer !
                    feature.unset("circle-fill");
                    feature.unset("circle-fill-opacity");
                    feature.unset("circle-stroke");
                    feature.unset("circle-stroke-width");
                    feature.unset("circle-stroke-opacity");
                    feature.unset("circle-radius");
                } else {
                    var fillImg = image.getFill();
                    if (fillImg) {
                        var colorFillImg = fillImg.getColor();
                        // array
                        if (Array.isArray(colorFillImg)) {
                            var cfi = "rgba(";
                            cfi += colorFill[0] + ",";
                            cfi += colorFill[1] + ",";
                            cfi += colorFill[2] + ",";
                            cfi += colorFill[3] + ")";
                            colorFillImg = cfi;
                        }
                        if (Color.isRGB(colorFillImg)) {
                            var oColorFillImg = Color.rgbaToHex(colorFillImg);
                            feature.set("circle-fill", oColorFillImg.hex);
                            feature.set("circle-fill-opacity", oColorFillImg.opacity);
                        } else {
                            feature.set("circle-fill", colorFillImg);
                            feature.set("circle-fill-opacity", 1);
                        }
                    }
                    var strokeImg = image.getStroke();
                    if (strokeImg) {
                        var colorStrokeImg = strokeImg.getColor();
                        // array
                        if (Array.isArray(colorStrokeImg)) {
                            var csi = "rgba(";
                            csi += colorFill[0] + ",";
                            csi += colorFill[1] + ",";
                            csi += colorFill[2] + ",";
                            csi += colorFill[3] + ")";
                            colorStrokeImg = csi;
                        }
                        if (Color.isRGB(colorStrokeImg)) {
                            var oColorStrokeImg = Color.rgbaToHex(colorStrokeImg);
                            feature.set("circle-stroke", oColorStrokeImg.hex);
                            feature.set("circle-stroke-opacity", oColorStrokeImg.opacity);
                        } else {
                            feature.set("circle-stroke", colorStrokeImg);
                            feature.set("circle-stroke-opacity", 1);
                        }
                        feature.set("circle-stroke-width", strokeImg.getWidth());
                    }
                    var radius = image.getRadius();
                    feature.set("circle-radius", radius);
                }
            }
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
    defineTagFromStyle: function (style, format) {
        logger.trace("todo...");
        return null;
    }
};

export default Styling;