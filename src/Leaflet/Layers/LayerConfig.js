import Logger from "../../Common/Utils/LoggerByDefault";
import Config from "../../Common/Utils/Config";
import Util from "../../Common/Utils/LayerUtils";

var logger = Logger.getLogger("layer-config");

/**
 * @classdesc
 *
 * Configuration des couches Geoportail via l'appel du service d'autoconfiguration
 * @private
 */
var LayerConfig = {
    /**
     * options : key, layer, service
     *
     * @param {Object} options - options
     *
     * @returns {Object} layer parameters
     */
    get : function (options) {
        var params = {};

        // Gestion de l'autoconf
        if (!Config.isConfigLoaded()) {
            logger.warn("WARNING AUTOCONF_MISSING : contract key configuration has to be loaded to load Geoportal layers !");
            return;
        }

        // gestion des parametres
        params = Config.configuration.getLayerParams(options.layer, options.service);

        if (!params || Object.keys(params).length === 0) {
            logger.warn("WARNING AUTOCONF_FAILED : params not found ?!");
            return;
        }

        // gestion des zoom
        params.minZoom = Util.getZoomLevelFromScaleDenominator(params.maxScale) || 1;
        params.maxZoom = Util.getZoomLevelFromScaleDenominator(params.minScale) || 21;

        return params;
    }
};

export default LayerConfig;
