import Gp from "geoportal-access-lib";
// import OpenLayers
import TileWMSSource from "ol/source/TileWMS";
// import local
import Utils from "../../Common/Utils";
import Config from "../../Common/Utils/Config";
import Logger from "../../Common/Utils/LoggerByDefault";
// package.json (extract version)
import Pkg from "../../../package.json";

var logger = Logger.getLogger("sourcewms");

/**
 * @classdesc
 * Geoportal tile WMS source creation (inherit from ol.source.TileWMS)
 *
 * @constructor
 * @alias ol.source.GeoportalWMS
 * @extends {ol.source.TileWMS}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.source.TileWMS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.TileWMS.html ol.source.TileWMS})
 * @example
 * var sourceWMS = new ol.source.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
var SourceWMS = (function (TileWMSSource) {
    function SourceWMS (options) {
        if (!(this instanceof SourceWMS)) {
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

        var layerId = Config.getLayerId(options.layer, "WMS");

        if (layerId && Config.configuration.getLayerConf(layerId)) {
            var wmsParams = Config.getLayerParams(options.layer, "WMS", options.apiKey);

            // si ssl = false on fait du http
            // par défaut, ssl = true, on fait du https
            var protocol = options.ssl === false ? "http://" : "https://";

            var wmsSourceOptions = {
                // tracker extension openlayers
                // FIXME : gp-ext version en mode AMD
                url : Gp.Helper.normalyzeUrl(wmsParams.url.replace(/(http|https):\/\//, protocol), {
                    "gp-ol-ext" : Pkg.olExtVersion || Pkg.version
                }, false),
                params : {
                    SERVICE : "WMS",
                    LAYERS : options.layer,
                    VERSION : wmsParams.version,
                    STYLES : wmsParams.styles,
                    FORMAT : wmsParams.format
                }
                // ,
                // attributions : [
                //     new ol.Attribution({
                //         html : "<a class='gp-control-attribution-link' target='_blank' href='http://www.ign.fr'><img class='gp-control-attribution-image' src='http://wxs.ign.fr/static/logos/IGN/IGN.gif' title='Institut national de l\'information géographique et forestière' style='height: 30px; width: 30px;'></a>"
                //     })
                // ]
            };

            // récupération des autres paramètres passés par l'utilisateur
            Utils.mergeParams(wmsSourceOptions, options.olParams);

            // returns a WMS object, that inherits from ol.source.TileWMS.
            TileWMSSource.call(this, wmsSourceOptions);

            // save originators (to be updated by Originators control)
            this._originators = wmsParams.originators;

            // save legends and metadata (to be added to LayerSwitcher control)
            this._legends = wmsParams.legends;
            this._metadata = wmsParams.metadata;
            this._title = wmsParams.title;
            this._description = wmsParams.description;
            this._quicklookUrl = wmsParams.quicklookUrl;
        } else {
            // If layer is not in Gp.Config
            logger.log("[source WMS] ERROR : " + options.layer + " cannot be found in Geoportal Configuration. Make sure that this resource is included in your contract key.");
            return new TileWMSSource({});
        }
    }

    // Inherits from ol.source.TileWMS
    if (TileWMSSource) SourceWMS.__proto__ = TileWMSSource;

    /*
     * @lends module:SourceWMS
     */
    SourceWMS.prototype = Object.create(TileWMSSource.prototype, {});

    /*
     * Constructor (alias)
     */
    SourceWMS.prototype.constructor = SourceWMS;

    return SourceWMS;
}(TileWMSSource));

export default SourceWMS;

// Expose SourceWMS as ol.source.GeoportalWMTS. (for a build bundle)
if (window.ol && window.ol.source) {
    window.ol.source.GeoportalWMS = SourceWMS;
}
