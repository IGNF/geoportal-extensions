import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("config");

var Config = {

    /** autoconf */
    configuration : null,

    /**
     * Controle du chargement de l'autoconf
     *
     * @returns {Boolean} isConfigLoaded - True si l'autoconf a déjà été chargée, False sinon.
     */
    isConfigLoaded : function () {
        var scope = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
        if (scope.Gp && scope.Gp.Config && Object.keys(scope.Gp.Config).length !== 0) {
            this.configuration = scope.Gp.Config;
            return true;
        }
        return false;
    },

    /**
     * Recuperation de l'identifiant d'une couche donnée
     *
     * @param {String} layerName - nom de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS")
     * @param {String} service   - nom du service (par ex. "WMS" ou "WMTS")
     * @returns {String} layerId - identifiant de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS$GEOPORTAIL:OGC:WMTS")
     */
    getLayerId : function (layerName, service) {
        var layerId = null;

        // layer
        // key : [layerName]$[contexte]:OGC:[service]
        // ex : "ORTHOIMAGERY.ORTHOPHOTOS$GEOPORTAIL:OGC:WMTS"

        // service
        // key : [layerName]$[contexte];[service]
        // ex : PositionOfInterest$OGC:OPENLS;ReverseGeocode

        if (this.configuration) {
            var layers = this.configuration["layers"];
            for (var key in layers) {
                if (layers.hasOwnProperty(key)) {
                    var parts = key.split("$");
                    if (layerName === parts[0]) {
                        if (parts[1]) {
                            var servicePartsLayer = parts[1].split(":");
                            var servicePartsService = parts[1].split(";");

                            if (servicePartsService[1] === service) {
                                layerId = key;
                                break;
                            }
                            if (servicePartsLayer[2] === service) {
                                layerId = key;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (!layerId) {
            logger.error("ERROR layer id (layer name: " + layerName + " / service: " + service + ") was not found !?");
        }

        return layerId;
    },

    /**
     * Récupération des paramètres nécessaires à l'affichage d'une couche WMS ou WMTS
     *
     * @param {String} layerName - nom de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS")
     * @param {String} service   - nom du service (par ex. "WMS" ou "WMTS")
     * @param {String} [apiKey]  - Clé de contrat API
     * @returns {Object} params  - paramètres du service (WMS ou WMTS) pour la couche donnée
     * @returns {String} params.url        - Url du service à requêter pour afficher la couche
     * @returns {String} params.version    - Version du service
     * @returns {String} params.styles     - Style par défaut de la couche
     * @returns {String} params.format     - Format par défaut de la couche
     * @returns {String} params.projection - Projection par défaut de la couche
     * @returns {Number} params.minScale   - Dénominateur d'échelle minimum de la couche
     * @returns {Number} params.maxScale   - Dénominateur d'échelle maximum de la couche
     * @returns {Gp.BBox} params.extent    - Etendue de la couche, dans la projection de la couche
     * @returns {Array} params.legends     - Tableau des légendes associées à la couche
     * @returns {Array} params.metadata    - Tableau des métadonnées associées à la couche
     * @returns {Array} params.originators - Tableau des originators associés à la couche
     * @returns {Array} params.title       - Nom de la resource, lisible par un humain.
     * @returns {Array} params.description - Url de l'image d'aperçu rapide de la ressource.
     * @returns {Array} params.quicklookUrl- Tableau des originators associés à la couche
     * @returns {String} params.[TMSLink]          - Identifiant de la pyramide (TMS), dans le cas d'une couche WMTS
     * @returns {Gp.Point} params.[matrixOrigin]   - Origine de la matrice (top left corner), dans le cas d'une couche WMTS
     * @returns {Array} params.[nativeResolutions] - Tableau regroupant les résolutions de chaque niveau de la matrice, dans le cas d'une couche WMTS
     * @returns {Array} params.[matrixIds]         - Tableau regroupant les identifiants de chaque niveau de la matrice, dans le cas d'une couche WMTS
     */
    getLayerParams : function (layerName, service, apiKey) {
        var params = {};

        if (this.configuration) {
            // récupération de l'identifiant complet de la couche.
            var layerId = this.getLayerId(layerName, service);

            if (layerId) {
                // récupération de l'objet de configuration de la couche
                var layerConf = this.configuration.layers[layerId];

                // controle de la clef
                var key = layerConf.apiKeys[0];
                if (apiKey) {
                    if (apiKey !== key) {
                        logger.error("ERROR different keys (" + apiKey + " !== " + key + ") !?");
                        return;
                    }
                }

                apiKey = apiKey || key;
                params.key = apiKey;
                // récupération des paramètres du service
                params.url = layerConf.getServerUrl(apiKey);
                params.version = layerConf.getServiceParams().version;
                params.styles = layerConf.getDefaultStyle();
                params.format = layerConf.getDefaultFormat();
                params.projection = layerConf.getDefaultProjection();

                // récupération des infos de la couche
                params.minScale = layerConf.getMinScaleDenominator();
                params.maxScale = layerConf.getMaxScaleDenominator();
                params.extent = layerConf.getBBOX();
                params.legends = layerConf.getLegends();
                params.metadata = layerConf.getMetadata();
                params.originators = layerConf.getOriginators();
                params.title = layerConf.getTitle();
                params.description = layerConf.getDescription();
                params.quicklookUrl = layerConf.getQuicklookUrl();

                // WMTS : récupération des tileMatrixSetLimits
                if (layerConf.wmtsOptions) {
                    params.tileMatrixSetLimits = layerConf.wmtsOptions.tileMatrixSetLimits;
                }

                // WMTS : récupération des paramètres de la pyramide (TMS)
                var TMSLink = layerConf.getTMSID();
                if (TMSLink) {
                    params.TMSLink = TMSLink;
                    var tmsConf = this.configuration.getTMSConf(TMSLink);
                    // Get matrix origin : Gp.Point = Object{x:Float, y:Float}
                    params.matrixOrigin = tmsConf.getTopLeftCorner();
                    params.nativeResolutions = tmsConf.nativeResolutions;
                    params.matrixIds = tmsConf.matrixIds;
                    params.tileMatrices = tmsConf.tileMatrices;
                }
            }
        }

        return params;
    },

    /**
     * Recuperation des parametres d'un service
     *
     * @param {String} [resource] - "PositionOfInterest", "StreetAddress", "Voiture", "Pieton", ...
     * @param {String} [service] - Geocode, Itineraire, ...
     * @param {String} [apiKey]  - Clé de contrat API
     * @returns {Object} params - paramètres de la ressource
     * @returns {String} params. -
     * @returns {String} params. -
     * @returns {String} params. -
     */
    getServiceParams : function (resource, service, apiKey) {
        var params = {};

        if (this.configuration) {
            // récupération de l'identifiant complet de la couche.
            var layerId = this.getLayerId(resource, service);

            if (layerId) {
                // récupération de l'objet de configuration de la couche
                var layerConf = this.configuration.layers[layerId];

                // controle de la clef
                var key = layerConf.apiKeys[0];
                if (apiKey) {
                    if (apiKey !== key) {
                        return;
                    }
                }

                apiKey = apiKey || key;
                params.key = apiKey;
                // récupération des paramètres du service
                params.url = layerConf.getServerUrl(apiKey);
                params.version = layerConf.getServiceParams().version;

                // récupération des infos de la couche
                params.extent = layerConf.getBBOX();
                params.title = layerConf.getTitle();
                params.description = layerConf.getDescription();
            }
        }

        return params;
    },

    /**
     * Resolution en geographique
     *
     * @returns {Array} resolutions
     */
    getResolutions : function () {
        var resolutions = [];

        if (this.configuration) {
            resolutions = this.configuration["generalOptions"]["wgs84Resolutions"];
        }

        return resolutions;
    },

    /**
     * Recuperation des parametres TMS de la configuration
     * @param {String} tmsName - tile matrix set name
     *
     * @returns {Object} tile matrix set
     */
    getTileMatrix : function (tmsName) {
        var tms = {};

        if (this.configuration) {
            if (tmsName) {
                tms = this.configuration["tileMatrixSets"][tmsName.toUpperCase()];
            }
        }

        return tms;
    },

    /**
     * Récupération des contraintes générales d'une couche donnée : extent, minScale, maxScale, projection
     *
     * @param {String} layerId - identifiant de la couche
     * @returns {Object} params - contraintes de la couche
     * @returns {String} params.projection - Projection par défaut de la couche
     * @returns {Number} params.minScale   - Dénominateur d'échelle minimum de la couche
     * @returns {Number} params.maxScale   - Dénominateur d'échelle maximum de la couche
     * @returns {Gp.BBox} params.extent    - Etendue de la couche, dans la projection de la couche
     */
    getGlobalConstraints : function (layerId) {
        var params = {};

        if (layerId) {
            // récupération de l'objet de configuration de la couche
            var layerConf = this.configuration.layers[layerId];
            params.projection = layerConf.getDefaultProjection();
            params.minScale = layerConf.getMinScaleDenominator();
            params.maxScale = layerConf.getMaxScaleDenominator();
            params.extent = layerConf.getBBOX();
        }

        return params;
    }
};

export default Config;
