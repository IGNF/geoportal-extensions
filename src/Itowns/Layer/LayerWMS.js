/* globals self */
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("wmsLayer");

/**
 * @classdesc
 * Geoportal WMTS source creation
 *
 * @constructor
 * @alias itowns.Layer.GeoportalWMS
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.itownsParams] - other options for itowns.GlobeView.addLayer function (see {@link http://www.itowns-project.org/itowns/API_Doc/GlobeView.html#addLayer GlobeView.addLayer})
 * @example
 * var geoportalWMS = new itowns.Layer.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
function LayerWMS(options) {
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
        options.ssl = false;
    }

    // Check if configuration is loaded
    if (!Config.isConfigLoaded()) {
        throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
    }

    var layerId = Config.getLayerId(options.layer, "WMS");

    if (layerId && Config.configuration.getLayerConf(layerId)) {
        var wmsParams = Config.getLayerParams(options.layer, "WMS", options.apiKey);

        // gestion de mixContent dans l'url du service...
        var ctx = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        var protocol = (ctx)
            ? (ctx.location && ctx.location.protocol && ctx.location.protocol.indexOf("https:") === 0 ? "https://" : "http://")
            : (options.ssl ? "https://" : "http://");

        // save originators (to be updated by Originators control)
        this._originators = wmsParams.originators;

        // save legends and metadata (to be added to LayerSwitcher control)
        this._legends = wmsParams.legends;
        this._metadata = wmsParams.metadata;

        this.type = "color";
        this.protocol = "wms";
        this.version = wmsParams.version;
        this.id = layerId;
        this.name = options.layer;
        this.url = wmsParams.url.replace(/(http|https):\/\//, protocol);
        this.updateStrategy = {
            type : 0,
            options : {}
        };
        this.heightMapWidth = 256;
        this.waterMask = false;
        this.networkOptions = {
            crossOrigin : "omit"
        };
        this.projection = wmsParams.projection;
        this.options = {
            originators : wmsParams.originators,
            mimetype : wmsParams.format,
            extent : {
                west : wmsParams.extent.left,
                east : wmsParams.extent.right,
                south : wmsParams.extent.bottom,
                north : wmsParams.extent.top
            }
        };

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(this, options.itownsParams);

        // add originators to layer source (to be updated by Originators control)
        this._originators = wmsParams.originators;

        // add legends and metadata (to be added to LayerSwitcher control)
        this.legends = wmsParams.legends;
        this.metadata = wmsParams.metadata;
        this.description = wmsParams.description;
        this.title = wmsParams.title;
        this.quicklookUrl = wmsParams.quicklookUrl;
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
