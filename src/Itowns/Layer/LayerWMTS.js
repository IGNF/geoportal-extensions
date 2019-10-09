import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import Logger from "../../Common/Utils/LoggerByDefault";
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
        throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
    }

    var layerId = Config.getLayerId(options.layer, "WMTS");

    if (layerId && Config.configuration.getLayerConf(layerId)) {
        var config = {};
        var wmtsParams = Config.getLayerParams(options.layer, "WMTS", options.apiKey);

        if (wmtsParams.projection === "EPSG:3857" && wmtsParams.extent) {
            wmtsParams.extent = new ItExtent("EPSG:4326", wmtsParams.extent.left, wmtsParams.extent.right, wmtsParams.extent.bottom, wmtsParams.extent.top).as("EPSG:3857");
        } else {
            wmtsParams.projection = "EPSG:4326";
            wmtsParams.extent = new ItExtent("EPSG:4326", wmtsParams.extent.left, wmtsParams.extent.right, wmtsParams.extent.bottom, wmtsParams.extent.top);
        }

        if (Object.entries(wmtsParams.tileMatrixSetLimits).length === 0 && wmtsParams.tileMatrixSetLimits.constructor === Object) {
            wmtsParams.tileMatrixSetLimits = undefined;
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

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(config, options.itownsParams);

        // add legends and metadata (to be added to LayerSwitcher control)
        config.legends = wmtsParams.legends;
        config.metadata = wmtsParams.metadata;
        config.description = wmtsParams.description;
        config.title = wmtsParams.title;
        config.quicklookUrl = wmtsParams.quicklookUrl;

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
