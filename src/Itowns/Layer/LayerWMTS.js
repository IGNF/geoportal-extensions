/* globals self */
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("wmtsLayer");

/**
 * @classdesc
 * Geoportal WMTS source creation
 *
 * @constructor
 * @alias itowns.layer.GeoportalWMTS
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
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
        options.ssl = false;
    }

    // Check if configuration is loaded
    if (!Config.isConfigLoaded()) {
        throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
    }

    var layerId = Config.getLayerId(options.layer, "WMTS");

    if (layerId && Config.configuration.getLayerConf(layerId)) {
        var wmtsParams = Config.getLayerParams(options.layer, "WMTS", options.apiKey);

        // gestion de mixContent dans l'url du service...
        // en mode browser, on requête en https
        var ctx = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        var protocol = (ctx)
            ? "https://"
            : (options.ssl ? "https://" : "http://");

        this.type = "color";
        this.protocol = "wmts";
        this.id = layerId;
        this.url = wmtsParams.url.replace(/(http|https):\/\//, protocol);
        this.updateStrategy = {
            type : 0,
            options : {}
        };
        this.networkOptions = {
            crossOrigin : "omit"
        };
        this.projection = wmtsParams.projection;
        this.options = {
            originators : wmtsParams.originators,
            name : options.layer,
            mimetype : wmtsParams.format,
            tileMatrixSet : wmtsParams.TMSLink,
            extent : {
                west : wmtsParams.extent.left,
                east : wmtsParams.extent.right,
                south : wmtsParams.extent.bottom,
                north : wmtsParams.extent.top
            },
            tileMatrixSetLimits : wmtsParams.tileMatrices
        };

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(this, options.itownsParams);

        // add legends and metadata (to be added to LayerSwitcher control)
        this.legends = wmtsParams.legends;
        this.metadata = wmtsParams.metadata;
        this.description = wmtsParams.description;
        this.title = wmtsParams.title;
        this.quicklookUrl = wmtsParams.quicklookUrl;
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
