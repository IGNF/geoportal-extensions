// import openlayers
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import TileJSONSource from "ol/source/TileJSON";
import MVT from "ol/format/MVT";
import { unByKey as observableUnByKey } from "ol/Observable";
// import olms : module ES6
import { applyStyle } from "ol-mapbox-style";
// import local
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";

/**
 * @classdesc
 * Geoportal Layer Mapbox creation
 *
 * @constructor
 * @extends {ol.layer.VectorTile}
 * @alias ol.layer.GeoportalMapBox
 * @type {ol.layer.GeoportalMapBox}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "PLAN.IGN")
 * @param {String} [options.style]    - Style name (e.g. "classique")
 * @param {String} [options.source]   - Source name (e.g. "plan_ign")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {Object} [settings] - other options for ol.layer.VectorTile function (see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html ol.layer.VectorTile})
 * @example
 * var LayerMapBox = new ol.layer.GeoportalMapBox({
 *      layer  : "PLAN.IGN",
 *      [style  : "classique",]
 *      [source : "plan_ign",]
 *      [ssl: true]
 * }, {
 *      opacity
 *      visible
 *      extent
 *      declutter
 *      ...
 * });
 */
var LayerMapBox = (function (VectorTileLayer) {
    /**
     * See {@link ol.layer.GeoportalMapBox}
     * @module LayerMapBox
     * @alias module:~Layers/GeoportalMapBox
     * @param {*} options - options
     * @param {*} [settings] - other settings
     * @example
     * import LayerMapBox from "src/OpenLayers/Layers/LayerMapBox"
     */
    function LayerMapBox (options, settings) {
        if (!(this instanceof LayerMapBox)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        if (!options.layer) {
            throw new Error("ERROR PARAM_MISSING : layer");
        }

        if (typeof options.layer !== "string") {
            throw new Error("ERROR WRONG TYPE : layer");
        }

        this.layerName = options.layer;

        // autres options facultatives
        this.styleName = options.style;
        this.sourceId = options.source;

        // par defaut
        if (typeof options.ssl === "undefined") {
            options.ssl = true;
        }

        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        this.protocol = options.ssl === false ? "http://" : "https://";

        // WARNING :
        // on fait le choix de ne pas utiliser la clef apiKey pour checker les droits sur la ressource
        // car le service n'est pas securisé...

        // Check if configuration is loaded
        if (!Config.isConfigLoaded()) {
            throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
        }

        /**
         * Ex. configuration object for TMS Layer
         * (only for jsdoc)
         * @example
         * "PLAN.IGN$GEOPORTAIL:GPP:TMS": {
         *   "hidden": true,
         *   "queryable": false,
         *   "serviceParams": {
         *     "id": "GPP:TMS",
         *     "version": "1.0.0",
         *     "serverUrl": {
         *       "cartes": "https://wxs.ign.fr/cartes/geoportail/tms/1.0.0/"
         *     }
         *   },
         *   "name": "PLAN.IGN",
         *   "title": "Plan IGN",
         *   "description": "BDUni tuilée",
         *   "formats": [
         *     {
         *       "current": true,
         *       "name": "application/x-protobuf"
         *     }
         *   ],
         *   "styles": [
         *     {
         *       "name": "standard",
         *       "title": "Style standard",
         *       "current": true,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/standard.json"
         *     },
         *     {
         *       "name": "classique",
         *       "title": "Style classique",
         *       "current": true,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/classique.json"
         *     },
         *     {
         *       "name": "transparent",
         *       "title": "Style transparent",
         *       "current": true,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/transparent.json"
         *     },
         *     {
         *       "name": "accentue",
         *       "title": "Style accentue",
         *       "current": true,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/accentue.json"
         *     },
         *     {
         *       "name": "attenue",
         *       "title": "Style attenue",
         *       "current": true,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/attenue.json"
         *     },
         *     {
         *       "name": "gris",
         *       "title": "Style en noir et blanc",
         *       "current": false,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/gris.json"
         *     },
         *     {
         *       "name": "epure",
         *       "title": "Style epure",
         *       "current": true,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/epure.json"
         *     },
         *     {
         *       "name": "sans_toponymes",
         *       "title": "Style sans toponymes",
         *       "current": false,
         *       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/sans_toponymes.json"
         *     }
         *   ],
         *   "globalConstraint": {
         *     "crs": null,
         *     "bbox": {
         *       "left": -724011.531917197,
         *       "right": 1095801.237496279,
         *       "top": 6672646.821182753,
         *       "bottom": 5009377.0856973175
         *     },
         *     "minScaleDenominator": null,
         *     "maxScaleDenominator": null
         *   },
         *   "quicklookUrl": "https://wxs.ign.fr/static/pictures/ign_carte2.jpg",
         *   "layerId": "PLAN.IGN$GEOPORTAIL:GPP:TMS",
         *   "defaultProjection": "EPSG:3857"
         * }
         */
        // récupération des ressources utiles depuis la configuration
        var layerId = this.layerName + "$GEOPORTAIL:GPP:TMS";

        var layerCfg = Config.configuration.getLayerConf(layerId);
        if (!layerCfg) {
            throw new Error("ERROR : Layer ID not found into the catalogue !?");
        }

        this.styleUrl = null;
        this.styleTitle = "";
        for (var i = 0; i < layerCfg.styles.length; i++) {
            var style = layerCfg.styles[i];
            // si le nom du style est en option, on le recherche...
            // sinon, on recherche le style par defaut !
            if (this.styleName && style.name === this.styleName) {
                this.styleUrl = style.url;
                this.styleTitle = style.title;
                break;
            } else {
                if (!this.styleName && style.current) {
                    this.styleName = style.name;
                    this.styleUrl = style.url;
                    this.styleTitle = style.title;
                    break;
                }
            }
        }

        if (!this.styleUrl) {
            throw new Error("ERROR : Style URL not found !?");
        }

        this.styleUrl.replace(/(http|https):\/\//, this.protocol);

        // création de la source
        var source = new VectorTileSource({
            state : "loading", // statut
            format : new MVT()
        });

        source._originators = layerCfg.originators;
        source._legends = layerCfg.legends;
        source._metadata = layerCfg.metadata;
        source._description = layerCfg.description;
        source._title = layerCfg.title + " (" + this.styleTitle + ")";
        source._quicklookUrl = layerCfg.quicklookUrl;

        // options definies sur ol.layer.VectorTile
        var layerVectorTileOptions = {
            source : source
        };

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(layerVectorTileOptions, settings);

        // création d'une ol.layer.VectorTile avec les options récupérées ci-dessus.
        VectorTileLayer.call(this, layerVectorTileOptions);

        // on surcharge les originators (non récupérés depuis configuration de la couche)
        if (options.olParams && !layerCfg.originators) {
            source._originators = options.olParams.attributions;
        }
        // add originators to layer source (to be updated by Originators control)
        this._originators = source.originators;

        // récuperation du style
        this.setStyleMapBox();
    }

    // Inherits from ol.layer.VectorTile
    if (VectorTileLayer) LayerMapBox.__proto__ = VectorTileLayer;

    /*
     * @lends module:LayerMapBox
     */
    LayerMapBox.prototype = Object.create(VectorTileLayer.prototype, {});

    /*
     * Constructor (alias)
     */
    LayerMapBox.prototype.constructor = LayerMapBox;

    /**
     * Get Style MapBox
     * @private
     */
    LayerMapBox.prototype.setStyleMapBox = function () {
        var self = this;
        fetch(this.styleUrl, {
            credentials : "same-origin"
        })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (style) {
                        self.onStyleMapBoxLoad(style);
                    });
                }
            })
            .catch(function (e) {
                self.onStyleMapBoxError(e);
            });
    };

    /**
     * Add Style
     * @param {*} style - json style
     */
    LayerMapBox.prototype.onStyleMapBoxLoad = function (style) {
        // si on a plusieurs sources, on ne peut en prendre qu'une seule...
        if (!this.sourceId) {
            this.sourceId = Object.keys(style.sources)[0];
        }

        var styleSource = style.sources[this.sourceId];
        if (!styleSource) {
            this.onStyleMapBoxError({
                message : "ERROR : Source ID not found !? !"
            });
            return;
        }

        if (styleSource.type !== "vector") {
            this.onStyleMapBoxError({
                message : "ERROR : Source TYPE not permitted !"
            });
            return;
        }

        var source = this.getSource();

        // WARNING :
        // la clef renseignée dans les urls n'est pas forcement la bonne
        // car la substitution avec la clef utilisateur n'est pas faite par le service...
        if (styleSource.url) {
            // protocole : http ou https
            styleSource.url.replace(/(http|https):\/\//, this.protocol);

            var vectorTileJson = new TileJSONSource({
                url : styleSource.url
            });
            var self = this;
            var key = vectorTileJson.on("change", function () {
                if (vectorTileJson.getState() === "ready") {
                    var doc = vectorTileJson.getTileJSON();
                    if (!doc) {
                        return;
                    }
                    self.set("mapbox-extensions", doc);
                    var tiles = Array.isArray(doc.tiles) ? doc.tiles : [doc.tiles];
                    // protocole : http ou https
                    for (var i = 0; i < styleSource.tiles.length; i++) {
                        tiles[i].replace(/(http|https):\/\//, this.protocol);
                    }
                    source.setUrls(tiles);
                    observableUnByKey(key);
                }
            });
        }

        if (styleSource.tiles) {
            // protocole : http ou https
            for (var j = 0; j < styleSource.tiles.length; j++) {
                styleSource.tiles[j].replace(/(http|https):\/\//, this.protocol);
            }
            source.setUrls(styleSource.tiles);
        }

        applyStyle(this, style, this.sourceId)
            .then(() => {
                source.setState("ready");
                this.set("mapbox-styles", style);
            })
            .catch((error) => {
                this.onStyleMapBoxError(error);
            });
    };

    /**
     * Error
     * @param {*} error - message
     */
    LayerMapBox.prototype.onStyleMapBoxError = function (error) {
        var source = this.getSource();
        source.setState("error");
        // eslint-disable-next-line no-console
        console.error(error.message);
    };

    return LayerMapBox;
}(VectorTileLayer));

export default LayerMapBox;

// Expose LayerMapBox as ol.layer.GeoportalMapBox. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalMapBox = LayerMapBox;
}
