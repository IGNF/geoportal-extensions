define([
    "woodman",
    "Common/Utils/Config",
    "Common/Utils/LayerUtils"
],
function (woodman, Config, Util) {

    "use strict";

    var logger = woodman.getLogger("layer-config");

    /**
     * @classdesc
     *
     * Configuration des couches Geoportail via l'appel du service d'autoconfiguration
     * @private
     */
    var LayerConfig = {
        /**
         * options : key, layer, service
         */
        get : function (options) {

            var params = {};

            // Gestion de l'autoconf
            if (!Config.isConfigLoaded()) {
                logger.warn("WARNING AUTOCONF_MISSING : contract key configuration has to be loaded to load Geoportal layers !");
                return;
            }

            // gestion des parametres
            params = Config.getLayerParams(options.layer, options.service, options.key);

            if (!params) {
                logger.warn("WARNING AUTOCONF_FAILED : params not found ?!");
                return;
            }

            // gestion de mixContent...
            var isBrowser = typeof window !== "undefined" ? true : false;
            var _protocol  = (isBrowser) ? (location && location.protocol && location.protocol.indexOf("https:") === 0 ? "https://" : "http://") :  "http://";
            var _url = params.url;
            params.url = _url.replace(/(http|https):\/\//, _protocol);

            // gestion des zoom
            params.minZoom = Util.getZoomLevelFromScaleDenominator(params.maxScale) || 1;
            params.maxZoom = Util.getZoomLevelFromScaleDenominator(params.minScale) || 21;

            return params;
        }
    };

    return LayerConfig;
});
