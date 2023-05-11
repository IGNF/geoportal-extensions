import Gp from "geoportal-access-lib";
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import Logger from "../../Common/Utils/LoggerByDefault";
import Pkg from "../../../package.json";
import {
    Extent as ItExtent,
    WMSSource as ItWMSSource,
    ColorLayer as ItColorLayer
} from "itowns";
/* import Extent from "itowns/Core/Geographic/Extent";
import WMSSource from "itowns/Source/WMSSource";
import ColorLayer from "itowns/Layer/ColorLayer"; */

var logger = Logger.getLogger("wmsLayer");

/**
 * @classdesc
 * Geoportal WMTS source creation
 *
 * @constructor
 * @alias itowns.layer.GeoportalWMS
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
 * var geoportalWMS = new itowns.layer.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
function LayerWMS (options) {
    if (!(this instanceof LayerWMS)) {
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

    var layerId = Config.configuration.getLayerId(options.layer, "WMS");

    if (layerId && Config.configuration.getLayerParams(options.layer, "WMS")) {
        var config = {};
        var wmsParams = Config.configuration.getLayerParams(options.layer, "WMS");

        if (wmsParams.projection === "EPSG:3857") {
            wmsParams.extent = new ItExtent("EPSG:4326", wmsParams.extent.left, wmsParams.extent.right, wmsParams.extent.bottom, wmsParams.extent.top).as("EPSG:3857");
        } else {
            wmsParams.extent = new ItExtent("EPSG:4326", wmsParams.extent.left, wmsParams.extent.right, wmsParams.extent.bottom, wmsParams.extent.top);
        }

        // les originators ne sont pas renvoyés dans la configuration, on prend donc ceux donnés par l'utilisateur
        if (options.itownsParams && options.itownsParams.source && options.itownsParams.source.attribution) {
            wmsParams.originators = options.itownsParams.source.attribution;
        }

        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        var protocol = options.ssl === false ? "http://" : "https://";

        config.id = layerId;
        config.source = new ItWMSSource({
            protocol : "wms",
            version : wmsParams.version,
            attribution : wmsParams.originators,
            url : wmsParams.url.replace(/(http|https):\/\//, protocol),
            name : options.layer,
            projection : wmsParams.projection,
            style : "",
            heightMapWidth : 256,
            waterMask : false,
            networkOptions : {
                crossOrigin : "omit"
            },
            updateStrategy : {
                type : 0,
                options : {}
            },
            format : wmsParams.format,
            extent : {
                west : wmsParams.extent.west,
                east : wmsParams.extent.east,
                south : wmsParams.extent.south,
                north : wmsParams.extent.north
            }
        });

        // ajout du tag gp-itowns-ext dans les requêtes WMS
        config.source.url = Gp.Helper.normalyzeUrl(config.source.url, {
            "gp-itowns-ext" : Pkg.itownsExtVersion || Pkg.version
        }, false);

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(config, options.itownsParams);

        // add legends and metadata (to be added to LayerSwitcher control)
        // we take in priority the explicit options given by the user
        config.legends = options.legends || wmsParams.legends;
        config.metadata = options.metadata || wmsParams.metadata;
        config.description = options.description || wmsParams.description;
        config.title = options.title || wmsParams.title;
        config.quicklookUrl = options.quicklookUrl || wmsParams.quicklookUrl;

        return new ItColorLayer(config.id, config);
    } else {
        // If layer is not in Gp.Config
        logger.error("ERROR layer id (layer name: " + options.layer + " / service: WMS ) was not found !?");
    }
}

/*
 * Constructor (alias)
 */
LayerWMS.prototype.constructor = LayerWMS;

export default LayerWMS;
