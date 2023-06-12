/**
 * @module Config
 * @alias [private] Config
 * @description
 * ...
 *
 * @example
 * isConfigLoaded();
 */
var Config = {

    /**
     * Config
     *
     * @public
     * @type {Object}
     */
    configuration : {},

    /**
     * Check if the configuration is loaded
     *
     * @returns {Boolean} True if Config is loaded, false otherwise
     */
    isConfigLoaded : function () {
        // config already loaded !
        if (this.configuration && Object.keys(this.configuration).length !== 0) {
            return true;
        }
        var scope = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
        if (scope.Gp && scope.Gp.Config && scope.Gp.Config.layers && Object.keys(scope.Gp.Config.layers).length !== 0) {
            /** ts-syntax */ (this.configuration) = scope.Gp.Config;
            return true;
        }
        return false;
    }

};

export default Config;
