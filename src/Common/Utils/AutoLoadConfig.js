import Gp from "geoportal-access-lib";

(function () {
    var scripts = document.getElementsByTagName("script");

    var key = scripts[scripts.length - 1].getAttribute("data-key");
    // in case of several keys
    if (key) {
        var splitKeys = key.split(/;|,|\|/);
        if (key && splitKeys.length > 1) {
            var keys = [];
            for (var i = 0; i < splitKeys.length; i++) {
                keys.push(splitKeys[i]);
            }
            key = keys;
        }
    }
    var url = scripts[scripts.length - 1].getAttribute("data-url");
    var timeout = scripts[scripts.length - 1].getAttribute("data-timeout");

    // callback
    var success = function () {
        // Pas de messages en mode prod
        // console.log("GetConfig success!");
    };

    // callback
    var error = function (e) {
        throw new Error("Configuration load failed : " + e.message);
    };

    if (!key && !url) {
        // pas de message d'information !
        // console.log("WARNING : parameters missing 'data-key' and 'data-url', the loading of configuration can not be done !");
        return;
    }

    var options = {
        apiKey : key,
        onSuccess : success,
        onFailure : error
    };

    if (url) {
        options.serverUrl = url;
        options.callbackSuffix = "";
    }

    if (timeout) {
        options.timeOut = timeout;
    }

    // test d'existance de la varibale globale Gp.Config
    if (!Gp.Config) {
        // appel du service
        Gp.Services.getConfig(options);
    }
})();
