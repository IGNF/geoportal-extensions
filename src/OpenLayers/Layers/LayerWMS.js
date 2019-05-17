// import openlayers
import {
    get as olGetProj,
    transformExtent as olTransformExtentProj
} from "ol/proj";
import TileLayer from "ol/layer/Tile";
// import local
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
// import local with ol dependencies
import SourceWMS from "./SourceWMS";

/**
 * @classdesc
 * Geoportal LayerWMS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Tile}
 * @alias ol.layer.GeoportalWMS
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Tile function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html ol.layer.Tile})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.TileWMS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.TileWMS.html ol.source.TileWMS})
 * @example
 * var layerWMS = new ol.layer.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
var LayerWMS = (function (TileLayer) {
    function LayerWMS (options) {
        if (!(this instanceof LayerWMS)) {
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

        // création de la source WMS
        var olSourceParams;
        if (options.olParams && options.olParams.sourceParams) {
            olSourceParams = options.olParams.sourceParams;
        }
        var wmsSource = new SourceWMS({
            layer : options.layer,
            ssl : options.ssl,
            apiKey : options.apiKey,
            olParams : olSourceParams
        });

        var layerTileOptions = {
            source : wmsSource
        };

        // si le param LAYERS n'a pas été renseigné lors de la création de la source,
        // c'est que l'identifiant de la couche n'a pas été trouvé. on passe donc la recherche des paramètres.
        if (wmsSource.getParams().LAYERS !== undefined) {
            // récupération des autres paramètres nécessaires à la création de la layer
            var layerId = Config.getLayerId(options.layer, "WMS");
            var globalConstraints = Config.getGlobalConstraints(layerId);

            /* INFO : on ne récupère l'emprise de la couche que lorsque que l'utilisateur spécifie la projection.
               Si aucune projection n'est spécifiée, il faudrait spécifier l'emprise dans la projection de la carte (car OpenLayers reprojette),
               mais on ne peut pas la récupérer à ce niveau. On ne spécifie donc aucune emprise.
               Idem pour les résolutions : il faut connaitre l'unité de la projection (metres ou degrés) pour pouvoir calculer la résolution.
            */
            if (olSourceParams && olSourceParams.projection) {
                // récupération de l'étendue (en EPSG:4326), et reprojection dans la proj spécifiée
                var geobbox = [
                    globalConstraints.extent.left,
                    globalConstraints.extent.bottom,
                    globalConstraints.extent.right,
                    globalConstraints.extent.top
                ];
                layerTileOptions.extent = olTransformExtentProj(geobbox, "EPSG:4326", olSourceParams.projection);

                // récupération des résolutions min et max
                var p;
                // on récupère tout d'abord la projection
                if (typeof olSourceParams.projection === "string") {
                    p = olGetProj(olSourceParams.projection);
                } else if (typeof olSourceParams.projection === "object" && olSourceParams.projection.getCode()) {
                    p = olGetProj(olSourceParams.projection.getCode());
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
    if (TileLayer) LayerWMS.__proto__ = TileLayer;

    /*
     * @lends module:LayerWMS
     */
    LayerWMS.prototype = Object.create(TileLayer.prototype, {});

    /*
     * Constructor (alias)
     */
    LayerWMS.prototype.constructor = LayerWMS;

    return LayerWMS;
}(TileLayer));

export default LayerWMS;

// Expose LayerWMS as ol.layerGeoportalWMS. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalWMS = LayerWMS;
}
