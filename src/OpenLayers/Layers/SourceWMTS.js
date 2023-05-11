import Gp from "geoportal-access-lib";
// import OpenLayers
import WMTSTileGrid from "ol/tilegrid/WMTS";
// import local with ol dependencies
import WMTSExtended from "../Sources/WMTS";
// import local
import Utils from "../../Common/Utils";
import LayerUtils from "../../Common/Utils/LayerUtils";
import Logger from "../../Common/Utils/LoggerByDefault";
import Config from "../../Common/Utils/Config";
// package.json (extract version)
import Pkg from "../../../package.json";

var logger = Logger.getLogger("sourcewmts");

/**
 * @classdesc
 * Geoportal WMTS source creation (inherit from ol.source.WMTS)
 *
 * @constructor
 * @alias ol.source.GeoportalWMTS
 * @type {ol.source.GeoportalWMTS}
 * @extends {WMTSExtended}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Array} [options.legends]   - Legends objects associated to the layer
 * @param {Array} [options.metadata]   - Metadata objects associated to the layer
 * @param {String} [options.title]   - title of the layer
 * @param {String} [options.description]   - description of the layer
 * @param {String} [options.quicklookUrl]   - quicklookUrl of the layer
 * @param {Object} [options.olParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
 * @example
 * var sourceWMTS = new ol.source.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
var SourceWMTS = (function (WMTSExtended) {
    function SourceWMTS (options) {
        if (!(this instanceof SourceWMTS)) {
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
            throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
        }

        var layerId = Config.configuration.getLayerId(options.layer, "WMTS");

        if (layerId && Config.configuration.getLayerConf(layerId)) {
            var wmtsParams = Config.configuration.getLayerParams(options.layer, "WMTS");

            // si ssl = false on fait du http
            // par défaut, ssl = true, on fait du https
            var protocol = options.ssl === false ? "http://" : "https://";

            // save originators (to be updated by Originators control)
            this._originators = wmtsParams.originators;

            var wmtsSourceOptions = {
                // tracker extension openlayers
                // FIXME : gp-ext version en mode AMD
                url : Gp.Helper.normalyzeUrl(wmtsParams.url.replace(/(http|https):\/\//, protocol), {
                    "gp-ol-ext" : Pkg.olExtVersion || Pkg.version
                }, false),
                version : wmtsParams.version,
                style : wmtsParams.styles,
                format : wmtsParams.format,
                projection : wmtsParams.projection,
                maxZoom : LayerUtils.getZoomLevelFromScaleDenominator(wmtsParams.minScale),
                layer : options.layer,
                matrixSet : wmtsParams.TMSLink,
                tileGrid : new WMTSTileGrid({
                    resolutions : wmtsParams.nativeResolutions,
                    matrixIds : wmtsParams.matrixIds,
                    origin : [wmtsParams.tileMatrices[0].topLeftCorner.x, wmtsParams.tileMatrices[0].topLeftCorner.y]
                })
            };

            // récupération des autres paramètres passés par l'utilisateur
            Utils.mergeParams(wmtsSourceOptions, options.olParams);

            // returns a WMTS object, that inherits from WMTSExtended.
            WMTSExtended.call(this, wmtsSourceOptions);

            // on surcharge les originators (non récupérés depuis configuration de la couche)
            if (options.olParams && !wmtsParams.originators) {
                wmtsParams.originators = options.olParams.attributions;
            }
            // add originators to layer source (to be updated by Originators control)
            this._originators = wmtsParams.originators;

            // add legends and metadata (to be added to LayerSwitcher control)
            this._legends = options.legends || wmtsParams.legends;
            this._metadata = options.metadata || wmtsParams.metadata;
            this._description = options.description || wmtsParams.description;
            this._title = options.title || wmtsParams.title;
            this._quicklookUrl = options.quicklookUrl || wmtsParams.quicklookUrl;
        } else {
            // If layer is not in Gp.Config
            logger.log("[source WMTS] ERROR : " + options.layer + " cannot be found in Geoportal Configuration. Make sure that this resource is included in your contract key.");
            return new WMTSExtended({});
        }
    }

    // Inherits from ol.source.WMTS
    if (WMTSExtended) SourceWMTS.__proto__ = WMTSExtended;

    /*
     * @lends module:SourceWMTS
     */
    SourceWMTS.prototype = Object.create(WMTSExtended.prototype, {});

    /*
     * Constructor (alias)
     */
    SourceWMTS.prototype.constructor = SourceWMTS;

    return SourceWMTS;
}(WMTSExtended));

export default SourceWMTS;

// Expose SourceWMTS as ol.source.GeoportalWMTS. (for a build bundle)
if (window.ol && window.ol.source) {
    window.ol.source.GeoportalWMTS = SourceWMTS;
}
