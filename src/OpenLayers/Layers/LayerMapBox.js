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
// import local with ol dependencies

/**
 * @classdesc
 * Geoportal Layer Mapbox creation
 *
 * @constructor
 * @extends {ol.layer.VectorTile}
 * @alias ol.layer.GeoportalMapBox
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
        this.sourceId  = options.source;

        // par defaut
        if (typeof options.ssl === "undefined") {
            options.ssl = true;
        }

        // Check if configuration is loaded
        if (!Config.isConfigLoaded()) {
            throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
        }

        // Ex. reponse Autoconf
        // "PLAN.IGN$GEOPORTAIL:GPP:TMS":{
        //     "hidden":true,
        //     "queryable":false,
        //     "serviceParams":{
        //         "id":"GPP:TMS",
        //         "version":"1.0.0",
        //         "serverUrl":{
        //             "jhyvi0fgmnuxvfv0zjzorvdn":"https://wxs.ign.fr/jhyvi0fgmnuxvfv0zjzorvdn/geoportail/tms/1.0.0"
        //         }
        //     },
        //     "name":"PLAN.IGN",
        //     "title":"Plan IGN",
        //     "description":"Représentation vectorielle des bases de données IGN.",
        //     "globalConstraint":{
        //         "crs":null,
        //         "bbox":{"left":-179.5,"right":179.5,"top":75,"bottom":-75},
        //         "minScaleDenominator":2133,
        //         "maxScaleDenominator":559082265,
        //         "temporalExtent":["2017-05-23","2018-03-23"]
        //     },
        //     "formats":[
        //         {"current":true,"name":"application/x-protobuf"}
        //     ],
        //     "styles":[
        //         {
        //                 "name":"planign",
        //                 "title":"Style de base",
        //                 "current":true,
        //                 "url":"https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/plan.json"
        //         },{
        //                 "name":"gris",
        //                 "title":"Style en noir et blanc",
        //                 "current":false,
        //                 "url":"https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/gris.json"
        //         },{
        //                 "name":"sans_toponymes",
        //                 "title":"Style sans toponymes",
        //                 "current":false,
        //                 "url":"https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/sans_toponymes.json"
        //         }
        //     ],
        //     "dimensions":{},
        //     "thematics":[],
        //     "originators":[],
        //     "legends":[],
        //     "metadata":[],
        //     "apiKeys":["jhyvi0fgmnuxvfv0zjzorvdn"],
        //     "layerId":"PLAN.IGN$GEOPORTAIL:GPP:TMS",
        //     "defaultProjection":"EPSG:3857"
        // }

        // récupération des ressources utiles sur l'autoconf
        var layerId  = this.layerName + "$GEOPORTAIL:GPP:TMS";

        var layerCfg = Config.configuration.layers[layerId];
        if (! layerCfg) {
            throw new Error("ERROR : Layer ID not found into the catalogue !?");
        }

        this.styleUrl   = null;
        this.styleTitle = "";
        for (var i = 0; i < layerCfg.styles.length; i++) {
            var style = layerCfg.styles[i];
            // si le nom du style est en option, on le recherche...
            // sinon, on recherche le style par defaut !
            if (this.styleName && style.name === this.styleName) {
                this.styleUrl   = style.url;
                this.styleTitle = style.title;
                break;
            } else {
                if (!this.styleName && style.current) {
                    this.styleName  = style.name;
                    this.styleUrl   = style.url;
                    this.styleTitle = style.title;
                    break;
                }
            }
        }
        
        if (! this.styleUrl) {
            throw new Error("ERROR : The style URL not found !?");
        }

        // création de la source
        var source = new VectorTileSource({
            state: "loading", // statut
            format: new MVT(),
        });

        source.originators = layerCfg.originators;
        source.legends = layerCfg.legends;
        source.metadata = layerCfg.metadata;
        source.description = layerCfg.description;
        source.title = layerCfg.title + " (" + this.styleTitle + ")";
        source.quicklookUrl = layerCfg.quicklookUrl;

        // options definies sur ol.layer.VectorTile
        var layerVectorTileOptions = {
            source: source
        };

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(layerVectorTileOptions, settings);

        // création d'une ol.layer.VectorTile avec les options récupérées ci-dessus.
        VectorTileLayer.call(this, layerVectorTileOptions);

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
                })
            }
        })
        .catch(function (e) {
            self.onStyleMapBoxError(e);
        })
    };

    /**
     * 
     * @param {*} style 
     */
    LayerMapBox.prototype.onStyleMapBoxLoad = function (style) {
        // si plusieurs sources, on ne peut en prendre qu'une seule...
        var sourceId = this.sourceId || Object.keys(style.sources)[0];

        var styleSource = style.sources[sourceId];
        if (! styleSource) {
            this.onStyleMapBoxError({
                message : "ERROR : Source ID not found !? !"
            });
            return;
        }

        if (styleSource.type !== "vector") {
            this.onStyleMapBoxError({
                message : "ERROR : Source type not permitted !"
            });
            return;
        }

        var source = this.getSource();

        // INFO :
        // la clef renseignée dans les urls n'est pas forcement la bonne
        // car la substitution avec la clef utilisateur n'est pas faite par le service...
        if (styleSource.url) {
            var vectorTileJson = new TileJSONSource({
                url : styleSource.url
            });
            var key = vectorTileJson.on("change", function () {
                if (vectorTileJson.getState() === "ready") {
                    var doc = vectorTileJson.getTileJSON(); 
                    var tiles = Array.isArray(doc.tiles) ? doc.tiles : [doc.tiles];
                    source.setUrls(tiles);
                    observableUnByKey(key);
                }
            });
        }

        if (styleSource.tiles) {
            source.setUrls(styleSource.tiles);
        }
    
        applyStyle(this, style, sourceId)
            .then(() => {
                source.setState("ready");
            })
            .catch((error) => {
                this.onStyleMapBoxError(error);
            });
    };

    /**
     * 
     * @param {*} error 
     */
    LayerMapBox.prototype.onStyleMapBoxError = function (error) {
        var source = this.getSource();
        source.setState("error");
        console.error(error.message);
    };

    return LayerMapBox;
}(VectorTileLayer));

export default LayerMapBox;

// Expose LayerMapBox as ol.layer.GeoportalMapBox. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalMapBox = LayerMapBox;
}
