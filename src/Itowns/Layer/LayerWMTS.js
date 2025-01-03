import Gp from "geoportal-access-lib";
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import Logger from "../../Common/Utils/LoggerByDefault";
import Pkg from "../../../package.json";
import {
    Extent as ItExtent,
    WMTSSource as ItWMTSSource,
    ColorLayer as ItColorLayer
} from "itowns";
/* import Extent from "itowns/Core/Geographic/Extent";
import WMTSSource from "itowns/Source/WMTSSource";
import ColorLayer from "itowns/Layer/ColorLayer"; */

var logger = Logger.getLogger("wmtsLayer");

/**
 * @classdesc
 * Geoportal WMTS source creation
 *
 * @constructor
 * @alias itowns.layer.GeoportalWMTS
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Array} [options.legends]   - Overloads the default legends objects associated to the layer
 * @param {Array} [options.metadata]   - Overloads the default Metadata objects associated to the layer
 * @param {String} [options.title]   - Overloads the default title of the layer
 * @param {String} [options.description]   - Overloads the default description of the layer
 * @param {String} [options.quicklookUrl]   - Overloads the default quicklookUrl of the layer
 * @param {Object} [options.itownsParams] - other options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
 * @example
 * var geoportalWMTS = new itowns.layer.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
function LayerWMTS (options) {
    if (!(this instanceof LayerWMTS)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    // check layer params
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
        throw new Error("ERROR : Configuration has to be loaded");
    }

    var layerId = Config.configuration.getLayerId(options.layer, "WMTS");

    if (layerId && Config.configuration.getLayerParams(options.layer, "WMTS")) {
        var config = {};
        var wmtsParams = Config.configuration.getLayerParams(options.layer, "WMTS");

        if (wmtsParams.projection === "EPSG:3857") {
            wmtsParams.extent = new ItExtent("EPSG:4326", wmtsParams.extent.left, wmtsParams.extent.right, wmtsParams.extent.bottom, wmtsParams.extent.top).as("EPSG:3857");
        } else {
            wmtsParams.projection = "EPSG:4326";
            wmtsParams.extent = new ItExtent("EPSG:4326", wmtsParams.extent.left, wmtsParams.extent.right, wmtsParams.extent.bottom, wmtsParams.extent.top);
        }

        if (Object.entries(wmtsParams.tileMatrixSetLimits).length === 0 && wmtsParams.tileMatrixSetLimits.constructor === Object) {
            wmtsParams.tileMatrixSetLimits = undefined;
        }

        // les originators ne sont pas renvoyés dans la configuration, on prend donc ceux donnés par l'utilisateur
        if (options.itownsParams && options.itownsParams.source && options.itownsParams.source.attribution) {
            wmtsParams.originators = options.itownsParams.source.attribution;
        }

        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        var protocol = options.ssl === false ? "http://" : "https://";

        config.id = layerId;
        config.source = new ItWMTSSource({
            protocol : "wmts",
            url : wmtsParams.url.replace(/(http|https):\/\//, protocol),
            networkOptions : {
                crossOrigin : "omit"
            },
            updateStrategy : {
                type : 0,
                options : {}
            },
            projection : wmtsParams.projection,
            attribution : wmtsParams.originators,
            name : options.layer,
            format : wmtsParams.format,
            tileMatrixSet : wmtsParams.TMSLink,
            tileMatrixSetLimits : wmtsParams.tileMatrixSetLimits,
            extent : {
                west : wmtsParams.extent.west,
                east : wmtsParams.extent.east,
                south : wmtsParams.extent.south,
                north : wmtsParams.extent.north
            }
        });

        var urlParams = {
            "gp-itowns-ext" : Pkg.itownsExtVersion || Pkg.version
        };

        if (config.source.url.includes("/private/")) {
            // si l'url est privée
            // Ajout de la clef d'API fournie par l'utilisateur en priorité
            // ou récupérée depuis la configuration
            urlParams["apikey"] = options.apiKey || Config.configuration.getLayerKey(layerId)[0];
        }

        // ajout du tag gp-itowns-ext dans les requêtes WMTS
        config.source.url = Gp.Helper.normalyzeUrl(config.source.url, urlParams, false);

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(config, options.itownsParams);

        // add legends and metadata (to be added to LayerSwitcher control)
        // we take in priority the explicit options given by the user
        config.legends = options.legends || wmtsParams.legends;
        config.metadata = options.metadata || wmtsParams.metadata;
        config.description = options.description || wmtsParams.description;
        config.title = options.title || wmtsParams.title;
        config.quicklookUrl = options.quicklookUrl || wmtsParams.quicklookUrl;

        return new ItColorLayer(config.id, config);
    } else {
        // If layer is not in Gp.Config
        logger.error("ERROR layer id (layer name: " + options.layer + " / service: WMTS ) was not found !?");
    }
}

/*
 * Constructor (alias)
 */
LayerWMTS.prototype.constructor = LayerWMTS;

export default LayerWMTS;
