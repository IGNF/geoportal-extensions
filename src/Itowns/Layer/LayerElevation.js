/* globals self */
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import Logger from "../../Common/Utils/LoggerByDefault";
import {
    Extent as ItExtent,
    WMTSSource as ItWMTSSource,
    ElevationLayer as ItElevationLayer
} from "itowns";
/* import Extent from "itowns/Core/Geographic/Extent";
import WMTSSource from "itowns/Source/WMTSSource";
import ElevationLayer from "itowns/Layer/ElevationLayer"; */

var logger = Logger.getLogger("elevationLayer");

/**
 * @classdesc
 * Geoportal elevation source creation
 *
 * @constructor
 * @alias itowns.layer.GeoportalElevation
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Elevation layer name (e.g. "ELEVATION.ELEVATIONGRIDCOVERAGE")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.itownsParams] - options to overload default geoportal layer options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
 * @example
 * var geoportalElevation = new itowns.layer.GeoportalElevation({
 *      layer  : "ELEVATION.ELEVATIONGRIDCOVERAGE"
 * });
 */
function LayerElevation (options) {
    if (!(this instanceof LayerElevation)) {
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
        options.ssl = false;
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

        // gestion de mixContent dans l'url du service...
        var ctx = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        var protocol = (ctx)
            ? (ctx.location && ctx.location.protocol && ctx.location.protocol.indexOf("https:") === 0 ? "https://" : "http://")
            : (options.ssl ? "https://" : "http://");

        config.id = layerId;
        config.noDataValue = -99999;
        config.updateStrategy = {
            type : 0,
            options : {
                groups : [11, 14]
            }
        };
        config.source = new ItWMTSSource({
            protocol : "wmts",
            url : wmtsParams.url.replace(/(http|https):\/\//, protocol),
            networkOptions : {
                crossOrigin : "omit"
            },
            attribution : wmtsParams.originators,
            projection : wmtsParams.projection,
            name : options.layer,
            format : "image/x-bil;bits=32",
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

        return new ItElevationLayer(config.id, config);
    } else {
        // If layer is not in Gp.Config
        logger.log("[source WMTS] ERROR : " + options.layer + " cannot be found in Geoportal Configuration. Make sure that this resource is included in your contract key.");
    }
}

/*
 * Constructor (alias)
 */
LayerElevation.prototype.constructor = LayerElevation;

export default LayerElevation;
