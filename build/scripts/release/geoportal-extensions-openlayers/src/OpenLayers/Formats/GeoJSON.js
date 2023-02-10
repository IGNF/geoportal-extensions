// import openlayers
import olGeoJSON from "ol/format/GeoJSON";
// import Style
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import IconStyle from "ol/style/Icon";
import FillStyle from "ol/style/Fill";
import StrokeStyle from "ol/style/Stroke";
// import local
import Color from "../../Common/Utils/ColorUtils";

/**
 * @classdesc
 *
 * Extended Styles GeoJSON format to export (internal use only !)
 *
 * SPEC
 * cf. https://github.com/mapbox/simplestyle-spec/
 * cf. https://geojson.org/
 *
 *
 * @constructor
 * @alias ol.format.GeoJSONExtended
 * @extends {ol.format.GeoJSON}
 * @type {ol.format.GeoJSONExtended}
 * @param {Object} options - Options
 * @param {Object} options.defaultStyle - Styles by default
 */
var GeoJSON = (function (olGeoJSON) {
    function GeoJSON (options) {
        if (!(this instanceof GeoJSON)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        this.options = options || {};

        // INFO
        // defaultStyle est un objet de type Style
        if (this.options.defaultStyle === null || typeof this.options.defaultStyle === "undefined") {
            this.options.defaultStyle = {};
        }

        // call constructor
        olGeoJSON.call(this, this.options);
    }

    // Inherits
    if (olGeoJSON) GeoJSON.__proto__ = olGeoJSON;

    /**
     * @lends module:GeoJSON
     */
    GeoJSON.prototype = Object.create(olGeoJSON.prototype, {});

    /**
     * Constructor (alias)
     */
    GeoJSON.prototype.constructor = GeoJSON;

    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.readFeatures ...
     *
     * @see ol.format.GeoJSON.prototype.readFeatures
     * @param {Document|Node|ArrayBuffer|Object|String} source - Source.
     * @param {olx.format.ReadOptions=} options - options.
     * @return {Array.<ol.Feature>} Features.
     */
    GeoJSON.prototype.readFeatures = function (source, options) {
        var features = olGeoJSON.prototype.readFeatures.call(this, source, options);

        features.forEach((feature) => {
            var featureStyleFunction = feature.getStyleFunction();
            // existe t il déjà une fonction de style ?
            // si oui, on l'applique !
            if (featureStyleFunction) {
                var styles = featureStyleFunction.call(this, feature, 0);
                if (styles && styles.length !== 0) {
                    feature.setStyle(styles[0]);
                }
            } else {
                // à ce niveau, il n'existe pas de styles, donc :
                // soit, on applique les styles par defaut
                // soit, on prend en compte les styles definis dans le format
                // et, les styles définis dans le format ecrasent les styles par defaut...

                // les options de styles définis dans le format
                var options = {};

                // properties :
                // "marker-size" -> icon / label
                // "marker-symbol" -> icon / label
                // "marker-color" -> icon / label
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
                // "stroke" -> line / polygon / circle
                // "stroke-opacity" -> line / polygon / circle
                // "stroke-width" -> line / polygon / circle
                var stroke = null;
                if (feature.get("stroke") ||
                    feature.get("stroke-opacity") ||
                    feature.get("stroke-width")) {
                    stroke = {};
                    stroke["color"] = Color.hexToRgba(feature.get("stroke"), feature.get("stroke-opacity") || 1);
                    stroke["width"] = feature.get("stroke-width") || 1;
                }

                // properties :
                // "fill" -> polygon / circle
                // "fill-opacity" -> polygon / circle
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
                    case "MultiPoint":
                        // Cercle
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
                        // Ponctuel ou label
                        if (marker) {
                            options["image"] = new IconStyle(marker);
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
                    case "LinearRing":
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
                } else {
                    // les styles par defaut
                    var styleFunction = (feature, resolution) => {
                        var style = null;

                        if (Object.keys(this.options.defaultStyle).length === 0) {
                            return [];
                        }

                        var type = feature.getGeometry().getType();
                        switch (type) {
                            case "Point":
                            case "MultiPoint":
                            case "Circle":
                                if (this.options.defaultStyle.getImage()) {
                                    style = new Style({
                                        image : this.options.defaultStyle.getImage()
                                    });
                                }
                                break;
                            case "Polygon":
                            case "MultiPolygon":
                                var optsp = {};
                                if (this.options.defaultStyle.getFill()) {
                                    optsp.fill = this.options.defaultStyle.getFill();
                                }
                                if (this.options.defaultStyle.getStroke()) {
                                    optsp.stroke = this.options.defaultStyle.getStroke();
                                }
                                style = new Style(optsp);
                                break;
                            case "LineString":
                            case "LinearRing":
                            case "MultiLineString":
                                var optsl = {};
                                if (this.options.defaultStyle.getStroke()) {
                                    optsl.stroke = this.options.defaultStyle.getStroke();
                                }
                                style = new Style(optsl);
                                break;
                        }
                        return [style];
                    };
                    feature.setStyle(styleFunction);
                }
            }
        });

        return features;
    };

    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.writeFeatures ...
     *
     * @see ol.format.GeoJSON.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @return {String} Result.
     */
    GeoJSON.prototype.writeFeatures = function (features, options) {
        // on met à jour les properties de styles
        features.forEach(function (feature) {
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
                // * fill
                // * image :
                //      * un marker ou un label
                //      * un cercle si fill et/ou stroke est present !
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
                                feature.set("fill", oColorFillImg.hex);
                                feature.set("fill-opacity", oColorFillImg.opacity);
                            } else {
                                feature.set("fill", colorFillImg);
                                feature.set("fill-opacity", 1);
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
                                feature.set("stroke", oColorStrokeImg.hex);
                                feature.set("stroke-opacity", oColorStrokeImg.opacity);
                            } else {
                                feature.set("stroke", colorStrokeImg);
                                feature.set("stroke-opacity", 1);
                            }
                            feature.set("stroke-width", strokeImg.getWidth());
                        }
                    }
                }
            }
        });

        var geoJSONString = olGeoJSON.prototype.writeFeatures.call(this, features, options);
        return geoJSONString;
    };

    return GeoJSON;
}(olGeoJSON));

export default GeoJSON;

// Expose GeoJSON as ol.source.GeoJSONExtended. (for a build bundle)
if (window.ol && window.ol.format) {
    window.ol.format.GeoJSONExtended = GeoJSON;
}
