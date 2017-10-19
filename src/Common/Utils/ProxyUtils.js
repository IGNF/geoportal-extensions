define(["woodman"], function (woodman) {

    "use strict";

    // logger
    woodman.load("console");
    var logger = woodman.getLogger("ProxyUtils");

    var ProxyUtils = {

        /**
         * Ajoute un proxy aux url des couches vecteurs si besoin.
         *
         * @param {String} url - Url to proxify.
         * @param {Object} [proxyOptions] - Object defining proxy options.
         * @param {String} proxyOptions.proxyUrl - Proxy URL.
         * @param {Array.<String>} [proxyOptions.noProxyDomains] - Proxy will not be used for this list of domain names.
         */
        proxifyUrl : function (url, proxyOptions) {

            logger.trace("proxifyUrl");

            if (  !proxyOptions ||
                  !proxyOptions.hasOwnProperty("proxyUrl") ||
                  proxyOptions.proxyUrl === null ||
                  proxyOptions.proxyUrl.trim().length == 0 ) {
                return url ;
            }
            // on regarde si l'url nest pas dans les domaines sans proxy
            if (proxyOptions.noProxyDomains &&
                Array.isArray(proxyOptions.noProxyDomains) &&
                proxyOptions.noProxyDomains.length > 0 ) {
                for (var i in proxyOptions.noProxyDomains) {
                    logger.trace("[ProxyUtils] proxifyUrl : analyzing " + proxyOptions.noProxyDomains[i]) ;
                    if (url.indexOf(proxyOptions.noProxyDomains[i]) !== -1 ) {
                        logger.info("[ProxyUtils] proxifyUrl : " + url + " found in noProxyDomains list (" + proxyOptions.noProxyDomains[i] + ").") ;
                        return url ;
                    }
                }
            }
            return proxyOptions.proxyUrl + encodeURIComponent(url) ;
        }
    };

    return ProxyUtils;

});
