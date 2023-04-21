import Logger from "../../Common/Utils/LoggerByDefault";
import Config from "../../Common/Utils/Config";

import {
    VectorTilesSource as ItVectorTilesSource,
    ColorLayer as ItColorLayer
} from "itowns";
/* import Extent from "itowns/Core/Geographic/Extent";
import WMSSource from "itowns/Source/WMSSource";
import ColorLayer from "itowns/Layer/ColorLayer"; */

var logger = Logger.getLogger("vectorTileLayer");

/**
 * @classdesc
 * Geoportal VT source creation
 *
 * @constructor
 * @alias itowns.layer.VectorTileLayer
 * @param {Object} options - options for function call.
 * @param {String} options.id - id to give to the layer
 * @param {String} options.layer - Layer name (e.g. "PLAN.IGN")
 * @param {String} [options.url] - Url to the vector Tile json style
 * @param {String} [options.urlService] - Url to the pbf file. Retrieved in the style file by default.
 * @param {Function} [options.filter] - Filter applied to the vector layer style. Fill/Line layer type by default.
 * @param {Object} [options.attributions] - Attributions of the layer.
 * @param {Object} [options.zoom] - Between which zoom levels the layer is displayed (zoom.min and zoom.max)
 * @example
 * var vectorTileLayer = new itowns.layer.VectorTileLayer({
 *      layer : "PLAN.IGN"
 * });
 */
function VectorTileLayer (options) {
    if (!(this instanceof VectorTileLayer)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    // check layer params
    if (!options.layer) {
        throw new Error("ERROR PARAM_MISSING : layer");
    }
    if (typeof options.layer !== "string") {
        throw new Error("ERROR WRONG TYPE : layer");
    }

    // Check if configuration is loaded
    if (!Config.isConfigLoaded()) {
        throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
    }

    var layerId = Config.configuration.getLayerId(options.layer, "TMS");

    if (layerId && Config.configuration.getLayerParams(options.layer, "TMS")) {
        var config = {};
        var tmsParams = Config.configuration.getLayerParams(options.layer, "TMS");

        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        var protocol = options.ssl === false ? "http://" : "https://";

        config.id = layerId;

        config.source = new ItVectorTilesSource({
            style : tmsParams.url.replace(/(http|https):\/\//, protocol),
            url : options.urlService,
            attribution : options.attributions,
            filter : options.filter,
            zoom : options.zoom
        });

        // FIXME wait for next itowns release to remove this
        config.isValidData = function () {
            return false;
        };

        return new ItColorLayer(config.id, config);
    } else {
        // If layer is not in Gp.Config
        logger.error("ERROR layer id (layer name: " + options.layer + " / service: TMS ) was not found !?");
    }
};

/*
 * Constructor (alias)
 */
VectorTileLayer.prototype.constructor = VectorTileLayer;

export default VectorTileLayer;
