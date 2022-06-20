// import openlayers
import { get as olGetProj } from "ol/proj";
import TileLayer from "ol/layer/Tile";
// import local
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
// import local with ol dependencies
import SourceWMTS from "./SourceWMTS";

/**
 * @classdesc
 * Geoportal LayerWMTS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Tile}
 * @alias ol.layer.GeoportalWMTS
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Tile function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html ol.layer.Tile})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
 * @example
 * var layerWMTS = new ol.layer.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
var LayerWMTS = (function (TileLayer) {
    function LayerWMTS (options) {
        if (!(this instanceof LayerWMTS)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        if (!options.layer) {
            throw new Error("ERROR PARAM_MISSING : layer");
        }

        if (typeof options.layer !== "string") {
            throw new Error("ERROR WRONG TYPE : layer");
        }

        // par defaut
        if (typeof options.ssl === "undefined") {
            options.ssl = true;
        }

        // Check if configuration is loaded
        if (!Config.isConfigLoaded()) {
            throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
        }

        // création de la source WMTS
        var olSourceParams;
        if (options.olParams && options.olParams.sourceParams) {
            olSourceParams = options.olParams.sourceParams;
        }
        var wmtsSource = new SourceWMTS({
            layer : options.layer,
            ssl : options.ssl,
            apiKey : options.apiKey,
            olParams : olSourceParams
        });

        var layerTileOptions = {
            source : wmtsSource
        };

        // si le param layer n'a pas été renseigné lors de la création de la source,
        // c'est que l'identifiant de la couche n'a pas été trouvé. on passe donc la recherche des paramètres.
        if (wmtsSource.getLayer() !== undefined) {
            // récupération des autres paramètres nécessaires à la création de la layer
            var layerId = Config.getLayerId(options.layer, "WMTS");
            var globalConstraints = Config.getGlobalConstraints(layerId);
            if (globalConstraints && globalConstraints.projection) {
                /* INFO : désactivation temporaire de l'étendue, car certaines étendues (trop grandes ?)
                provoquent quelques bugs d'affichage (zoom > 16 par exemple) */
                // récupération de l'étendue (en EPSG:4326), et reprojection dans la proj de la couche
                // var geobbox = [
                //     globalConstraints.extent.left,
                //     globalConstraints.extent.bottom,
                //     globalConstraints.extent.right,
                //     globalConstraints.extent.top
                // ];
                // layerTileOptions.extent = ol.proj.transformExtent(geobbox, "EPSG:4326", globalConstraints.projection);

                // récupération des résolutions min et max
                var p;
                // on récupère tout d'abord la projection
                if (typeof globalConstraints.projection === "string") {
                    p = olGetProj(globalConstraints.projection);
                }
                // puis, selon l'unité de la projection, on calcule la résolution correspondante
                if (p && p.getUnits()) {
                    if (p.getUnits() === "m") {
                        /* fixme : fix temporaire pour gérer les min/max scaledenominator qui sont arrondis dans l'autoconf !
                         * on les arrondit respectivement à l'unité inférieure et supérieure
                         * pour que les couches soient bien disponibles aux niveaux de zoom correspondants */
                        // info : 1 pixel = 0.00028 m
                        layerTileOptions.minResolution = (globalConstraints.minScale - 1) * 0.00028;
                        layerTileOptions.maxResolution = (globalConstraints.maxScale + 1) * 0.00028;
                    } else if (p.getUnits() === "degrees") {
                        /* fixme : fix temporaire pour gérer les min/max scaledenominator qui sont arrondis dans l'autoconf !
                         * on les arrondit respectivement à l'unité inférieure et supérieure
                         * pour que les couches soient bien disponibles aux niveaux de zoom correspondants */
                        // info : 6378137 * 2 * pi / 360 = rayon de la terre (ellipsoide WGS84)
                        layerTileOptions.minResolution = (globalConstraints.minScale - 1) * 0.00028 * 180 / (Math.PI * 6378137);
                        layerTileOptions.maxResolution = (globalConstraints.maxScale + 1) * 0.00028 * 180 / (Math.PI * 6378137);
                    }
                }
            }
        }

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(layerTileOptions, options.olParams);

        // création d'une ol.layer.Tile avec les options récupérées ci-dessus.
        TileLayer.call(this, layerTileOptions);
    }

    // Inherits from ol.layer.Tile
    if (TileLayer) LayerWMTS.__proto__ = TileLayer;

    /*
     * @lends module:LayerWMTS
     */
    LayerWMTS.prototype = Object.create(TileLayer.prototype, {});

    /*
     * Constructor (alias)
     */
    LayerWMTS.prototype.constructor = LayerWMTS;

    return LayerWMTS;
}(TileLayer));

export default LayerWMTS;

// Expose LayerWMTS as ol.layerGeoportalWMTS. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalWMTS = LayerWMTS;
}
