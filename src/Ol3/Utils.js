define([
], function (
) {

    "use strict";

    var Utils = {

        /**
         *  Copies all source object members to dest
         *
         * @param {Object} dest - destination object where properties and method will be copied
         * @param {Object} source - source object from which properties and method will be copied
         * @returns {Object} dest
         */
        assign : function (dest, source) {
            dest = dest || {};
            for ( var prop in source ) {
                if ( source.hasOwnProperty(prop) ) {
                    dest[prop] = source[prop];
                }
            }
            return dest;
        },

        /**
         * Merge two objects parameters (deeper than assign)
         *
         * @param {Object} dest   - destination object where properties and method will be merge
         * @param {Object} source - source object from which properties and method will be merge
         */
        mergeParams : function (dest, source) {
            if ( !dest || !source ) {
                return;
            }
            for ( var param in source ) {
                if ( source.hasOwnProperty(param) ) {
                    if ( typeof source[param] === "object" ) {
                        if ( dest.hasOwnProperty(param) ) {
                            this.mergeParams( dest[param], source[param] );
                        } else {
                            dest[param] = source[param];
                        }
                    } else {
                        dest[param] = source[param];
                    }
                }
            }
        },

        /**
         * this method is called by the constructor.
         * this information is useful to switch to touch mode.
         * Detection : test for desktop or tactile
         *
         * @returns {Boolean} isDesktop - true for desktop userAgent, false for mobile
         */
        detectSupport : function () {

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
         * Returns id of OL3 obj (based on closure_uid_xxx property)
         * NOT USED ANYMORE ? (OL v4.0.1)
         *
         * @param {Object} ol3obj - OL3 object
         * @returns {String} - id of OL3 Object. Null if not found.
         */
        getOL3ObjectId : function (ol3obj) {
            var id = null ;
            if (!ol3obj) {
                return ;
            }
            for (var key in ol3obj) {
                if ( typeof(key) !== "string" || key.indexOf("closure_uid") < 0) {
                    continue ;
                }
                // on a trouvé :
                return ol3obj[key] ;
            }
            return id ;
        },
        
        /**
         * Converts s to Numeric
         *
         * @param {String} s - string number
         * @param {Numeric} base - between 2 and 36
         * @returns {null|Numeric}
         */
        toNumeric : function (s, base) {
            var _base = base || 10;
            var n = parseInt(s, _base);
            if (! isNaN(n) && isFinite(n)) {
                return n;
            }
            return null;
        },

        /**
         * Converts s to float
         *
         * @param {String} s - string number
         * @returns {null|Numeric}
         */
        toFloat : function (s) {
            var n = parseFloat(s);
            if (! isNaN(n) && isFinite(n)) {
                return n;
            }
            return null;
        }
    };
    
    return Utils;
});
