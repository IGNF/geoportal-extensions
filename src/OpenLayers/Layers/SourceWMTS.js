import Gp from "geoportal-access-lib";
// import OpenLayers
import WMTSTileGrid from "ol/tilegrid/WMTS";
// import local with ol dependencies
import WMTSExtended from "../Sources/WMTS";
// import local
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import LayerUtils from "../../Common/Utils/LayerUtils";
import Logger from "../../Common/Utils/LoggerByDefault";
// package.json (extract version)
import Pkg from "../../../package.json";

var logger = Logger.getLogger("sourcewmts");

/**
 * @classdesc
 * Geoportal WMTS source creation (inherit from ol.source.WMTS)
 *
 * @constructor
 * @alias ol.source.GeoportalWMTS
 * @extends {WMTSExtended}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
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
            throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
        }

        var layerId = Config.getLayerId(options.layer, "WMTS");

        if (layerId && Config.configuration.getLayerConf(layerId)) {
            var wmtsParams = Config.getLayerParams(options.layer, "WMTS", options.apiKey);

            // si ssl = false on fait du http
            // par défaut, ssl = true, on fait du https
            var protocol = options.ssl === false ? "http://" : "https://";

            // save originators (to be updated by Originators control)
            this._originators = wmtsParams.originators;

            // save legends and metadata (to be added to LayerSwitcher control)
            this._legends = wmtsParams.legends;
            this._metadata = wmtsParams.metadata;

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
                    origin : [wmtsParams.matrixOrigin.x, wmtsParams.matrixOrigin.y]
                })
                // ,
                // attributions : [
                //     new ol.Attribution({
                //         html : "<a class='gp-control-attribution-link' target='_blank' href='http://www.ign.fr'><img class='gp-control-attribution-image' src='http://wxs.ign.fr/static/logos/IGN/IGN.gif' title='Institut national de l\'information géographique et forestière' style='height: 30px; width: 30px;'></a>"
                //     })
                // ]
            };

            // récupération des autres paramètres passés par l'utilisateur
            Utils.mergeParams(wmtsSourceOptions, options.olParams);

            // returns a WMTS object, that inherits from WMTSExtended.
            WMTSExtended.call(this, wmtsSourceOptions);

            // add originators to layer source (to be updated by Originators control)
            this._originators = wmtsParams.originators;

            // add legends and metadata (to be added to LayerSwitcher control)
            this._legends = wmtsParams.legends;
            this._metadata = wmtsParams.metadata;
            this._description = wmtsParams.description;
            this._title = wmtsParams.title;
            this._quicklookUrl = wmtsParams.quicklookUrl;
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
