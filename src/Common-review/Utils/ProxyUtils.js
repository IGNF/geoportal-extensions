import Logger from "../../Common/Utils/LoggerByDefault";

/**
* @module ProxyUtils
* @alias Gp.ProxyUtils
* @description
* ...
*
* @example
* proxifyUrl();
*/
var ProxyUtils = {
    /**
     * Ajoute un proxy aux url des couches vecteurs si besoin.
     *
     * @param {String} url - Url to proxify.
     * @param {Object} [proxyOptions] - Object defining proxy options.
     * @param {String} proxyOptions.proxyUrl - Proxy URL.
     * @param {Array.<String>} [proxyOptions.noProxyDomains] - Proxy will not be used for this list of domain names.
     *
     * @returns {String} proxy url
     */
    proxifyUrl : function (url, proxyOptions) {
        // logger

        var logger = Logger.getLogger("proxifyUrl");

        if (!proxyOptions ||
            !proxyOptions.hasOwnProperty("proxyUrl") ||
            proxyOptions.proxyUrl === null ||
            proxyOptions.proxyUrl.trim().length === 0) {
            return url;
        }
        // on regarde si l'url nest pas dans les domaines sans proxy
        if (proxyOptions.noProxyDomains &&
            Array.isArray(proxyOptions.noProxyDomains) &&
            proxyOptions.noProxyDomains.length > 0) {
            for (var i in proxyOptions.noProxyDomains) {
                logger.trace("[ProxyUtils] proxifyUrl : analyzing " + proxyOptions.noProxyDomains[i]);
                if (url.indexOf(proxyOptions.noProxyDomains[i]) !== -1) {
                    logger.info("[ProxyUtils] proxifyUrl : " + url + " found in noProxyDomains list (" + proxyOptions.noProxyDomains[i] + ").");
                    return url;
                }
            }
        }
        return proxyOptions.proxyUrl + encodeURIComponent(url);
    }
};

export default ProxyUtils;
