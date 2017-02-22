define(["woodman"], function (woodman) {

    "use strict";

    var ProxyUtils = {
        /**
         * ajoute un proxy aux url des couches vecteurs si besoin.
         *
         * @private
         */
        setProxy : function (url, proxyOptions) {

            // logger
            woodman.load("console");
            var logger = woodman.getLogger("setProxy");

            if (  !proxyOptions ||
                  !proxyOptions.hasOwnProperty("proxyUrl") ||
                  proxyOptions.proxyUrl.trim().length == 0 ) {
                return url ;
            }
            // on regarde si l'url nest pas dans les domaines sans proxy
            if (proxyOptions.noProxyDomains &&
                Array.isArray(proxyOptions.noProxyDomains) &&
                proxyOptions.noProxyDomains.length > 0 ) {
                for (var i in proxyOptions.noProxyDomains) {
                    logger.trace("[ProxyUtils] setProxy : analyzing " + proxyOptions.noProxyDomains[i]) ;
                    if (url.indexOf(proxyOptions.noProxyDomains[i]) !== -1 ) {
                        logger.info("[ProxyUtils] setProxy : " + url + " found in noProxyDomains list (" + proxyOptions.noProxyDomains[i] + ").") ;
                        return url ;
                    }
                }
            }
            return proxyOptions.proxyUrl + encodeURIComponent(url) ;
        }
    };

    return ProxyUtils;

});
