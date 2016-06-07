define([
    "woodman",
    "Common/Utils/Config"
],
function (woodman, Config) {

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

            return params;
        }
    };

    return LayerConfig;
});
