define([], function () {

    "use strict";

    var Utils = {

        /**
         * Detection : test for desktop or tactile
         */
        detectSupport : function () {

            // TODO
            // Choix de gérer la détection dans le code du composant au lieu du DOM car :
            // Utilisation de l'implémentation Leaflet
            // http://leafletjs.com/reference.html#browser

            var isDesktop = true;
            var userAgent = window.navigator.userAgent.toLowerCase();

            if (userAgent.indexOf("iphone") !== -1 ||
                userAgent.indexOf("ipod") !== -1 ||
                userAgent.indexOf("ipad") !== -1 ||
                userAgent.indexOf("android") !== -1 ||
                userAgent.indexOf("mobile") !== -1 ||
                userAgent.indexOf("blackberry") !== -1 ||
                userAgent.indexOf("tablet") !== -1 ||
                userAgent.indexOf("phone") !== -1 ||
                userAgent.indexOf("touch") !== -1 ) {
                isDesktop = false;
            }

            if (userAgent.indexOf("msie") !== -1 ||
                userAgent.indexOf("trident") !== -1) {
                isDesktop = true;
            }

            return isDesktop;
        },

        /**
         * Copies all source object members to target object
         */
        assign : function ( source, target ) {
            for ( var prop in source ) {
                if ( source.hasOwnProperty(prop) ) {
                    target[prop] = source[prop];
                }
            }
        },

        /**
         * Merge two objects parameters (deeper than assign)
         *
         * @param {Object} dest   - destination object where properties and method will be merge
         * @param {Object} source - source object from which properties and method will be merge
         */
        merge : function (dest, source) {
            if ( !dest || !source ) {
                return;
            }
            for ( var param in source ) {
                if ( source.hasOwnProperty(param) ) {
                    if ( typeof source[param] === "object" ) {
                        if ( dest.hasOwnProperty(param) ) {
                            this.merge( dest[param], source[param] );
                        } else {
                            dest[param] = source[param];
                        }
                    } else {
                        dest[param] = source[param];
                    }
                }
            }
        }
    };

    return Utils;

});
