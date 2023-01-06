/**
 * @module AutoLoadConfig
 * @alias [private] AutoLoadConfig
 * @description
 * ...
 *
 * @example
 * autoloadconfig();
 */
var AutoLoadConfig = {
    /**
     * CChargement automatique de la clé d'accès à partir du tag data-key
     *
     * @function autoloadconfig
     * @returns {Object} options - undefined ou options
     */
    autoloadconfig: function () {
        var scripts = document.getElementsByTagName("script");
        for (var i=0; i<scripts.length; i++) {
            if (!scripts[i].getAttribute("data-key") && !scripts[i].getAttribute("data-timeout")) {
                continue;
            } else {
                var timeout = scripts[i].getAttribute("data-timeout");
                var key = scripts[i].getAttribute("data-key");
                // in case of several keys
                if (key) {
                    var splitKeys = key.split(/;|,|\|/);
                    if (splitKeys.length > 1) {
                        var keys = [];
                        for (var j = 0; j < splitKeys.length; j++) {
                            keys.push(splitKeys[i]);
                        }
                        key = keys;
                    }
                }
                break;
            }
        }

        // var url = scripts[scripts.length - 1].getAttribute("data-url");

        // callback
        var success = function () {
            // Pas de messages en mode prod
            // console.log("GetConfig success!");
        };

        // callback
        var error = function (e) {
            throw new Error("Configuration load failed : " + e.message);
        };

        if (!key) {
            // pas de message d'information !
            console.log("WARNING : parameter 'data-key' missing, then the key has to be filed in the control configuration");
            return;
        }

        var options = {
            apiKey: key,
            onSuccess: success,
            onFailure: error
        };

        // if (url) {
        //     options.serverUrl = url;
        //     options.callbackSuffix = "";
        // }

        if (timeout) {
            options.timeOut = timeout;
        }

        return options;
        // test d'existance de la varibale globale Gp.Config
        // if (!Gp.Config) {
        //     // appel du service
        //     Gp.Services.getConfig(options);
        // }
    }
};

export default AutoLoadConfig;
