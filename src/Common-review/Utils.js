/**
* @module Utils
* @alias Gp.olUtils
* @description
* ...
*
* @example
* detectSupport();
* assign();
* mergeParams();
*/
var Utils = {

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
            userAgent.indexOf("touch") !== -1) {
            isDesktop = false;
        }

        if (userAgent.indexOf("msie") !== -1 ||
            userAgent.indexOf("trident") !== -1) {
            isDesktop = true;
        }

        return isDesktop;
    },

    /**
     *  Copies all source object members to dest
     *
     * @param {Object} dest - destination object where properties and method will be copied
     * @param {Object} source - source object from which properties and method will be copied
     * @returns {Object} dest
     */
    assign : function (dest, source) {
        dest = dest || {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                dest[prop] = source[prop];
            }
        }
        return dest;
    },

    /**
     * Merge two objects parameters (deeper than assign)
     *
     * @param {Object} dest     - destination object where properties and method will be merge
     * @param {Object} source   - source object from which properties and method will be merge
     * @param {Boolean} replace - replace destination value by source if exists or not (true by default)
     */
    mergeParams : function (dest, source, replace) {
        if (!dest || !source) {
            return;
        }
        if (typeof replace === "undefined") {
            replace = true;
        }
        for (var param in source) {
            if (source.hasOwnProperty(param)) {
                if (typeof source[param] === "object") {
                    if (dest.hasOwnProperty(param)) {
                        this.mergeParams(dest[param], source[param], replace);
                    } else {
                        dest[param] = source[param];
                    }
                } else {
                    if (dest.hasOwnProperty(param)) {
                        if (replace) {
                            dest[param] = source[param];
                        }
                    } else {
                        dest[param] = source[param];
                    }
                }
            }
        }
    }
};

export default Utils;
