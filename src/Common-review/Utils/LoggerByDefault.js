import * as Log from "loglevel";

var LoggerByDefault = {
    /**
     *logger statique
     * @param {String} [name="default"] - the logger name
     *
     * @returns {Object} logger
     */
    getLogger : function (name) {
        // Substitute global constants configured at compile time
        // cf. webpack.config.js
        // on masque cette constante afin d'eviter "referenceerror not defined"
        ("__PRODUCTION__".match(/true/))
            ? Log.disableAll() : Log.enableAll();
        var logname = name || "default";
        return Log.getLogger(logname);
    }
};

export default LoggerByDefault;
