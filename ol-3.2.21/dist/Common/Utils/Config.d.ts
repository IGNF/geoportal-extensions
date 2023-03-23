export default Config;
declare namespace Config {
    const configuration: Object;
    function isConfigLoaded(this: {
        /**
         * autoconf
         *
         * @public
         * @type {Object}
         */
        configuration: Object;
        /**
         * Controle du chargement de l'autoconf
         *
         * @function isConfigLoaded
         * @this Config
         * @public
         * @returns {Boolean} True si l'autoconf a déjà été chargée, False sinon.
         */
        isConfigLoaded: (this: any) => boolean;
        /**
         * Recuperation de l'identifiant d'une couche donnée
         *
         * @function getLayerId
         * @public
         * @param {String} layerName - nom de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS")
         * @param {String} service   - nom du service (par ex. "WMS" ou "WMTS")
         * @returns {String} Identifiant de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS$GEOPORTAIL:OGC:WMTS")
         */
        getLayerId: (layerName: string, service: string) => string;
        /**
         * Récupération des paramètres nécessaires à l'affichage d'une couche WMS ou WMTS
         *
         * @function getLayerParams
         * @public
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
        getLayerParams: (layerName: string, service: string, apiKey?: string | undefined) => Object;
        /**
         * Recuperation des parametres d'un service
         *
         * @function getServiceParams
         * @public
         * @param {String} [resource] - "PositionOfInterest", "StreetAddress", "Voiture", "Pieton", ...
         * @param {String} [service] - Geocode, Itineraire, ...
         * @param {Array} [apiKeys]  - Clé(s) de contrat API
         * @returns {Object} params - paramètres de la ressource
         * @returns {String} params. -
         * @returns {String} params. -
         * @returns {String} params. -
         */
        getServiceParams: (resource?: string | undefined, service?: string | undefined, apiKeys?: any[] | undefined) => Object;
        /**
         * Resolution en geographique
         *
         * @function getResolutions
         * @public
         * @returns {Array} resolutions
         */
        getResolutions: () => any[];
        /**
         * Recuperation des parametres TMS de la configuration
         *
         * @function getTileMatrix
         * @public
         * @param {String} tmsName - tile matrix set name
         * @returns {Object} tile matrix set
         */
        getTileMatrix: (tmsName: string) => Object;
        /**
         * Récupération des contraintes générales d'une couche donnée : extent, minScale, maxScale, projection
         *
         * @function getGlobalConstraints
         * @public
         * @param {String} layerId - identifiant de la couche
         * @returns {Object} params - contraintes de la couche
         * @returns {String} params.projection - Projection par défaut de la couche
         * @returns {Number} params.minScale   - Dénominateur d'échelle minimum de la couche
         * @returns {Number} params.maxScale   - Dénominateur d'échelle maximum de la couche
         * @returns {Gp.BBox} params.extent    - Etendue de la couche, dans la projection de la couche
         */
        getGlobalConstraints: (layerId: string) => Object;
    }): boolean;
    function getLayerId(layerName: string, service: string): string;
    function getLayerParams(layerName: string, service: string, apiKey?: string | undefined): Object;
    function getServiceParams(resource?: string | undefined, service?: string | undefined, apiKeys?: any[] | undefined): Object;
    function getResolutions(): any[];
    function getTileMatrix(tmsName: string): Object;
    function getGlobalConstraints(layerId: string): Object;
}
//# sourceMappingURL=Config.d.ts.map