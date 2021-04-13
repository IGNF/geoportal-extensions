import * as Log from "loglevel";

var LoggerByDefault = {
    /**
     * creation d'un logger statique
     *
     * @param {String} [name="default"] - the logger name
     * @returns {Object} logger
     */
    getLogger : function (name) {
        // INFO :
        // à la compilation en mode production, on substitue __PRODUCTION__
        // avec "true", ceci desactive les loggers !
        //
        // à la compilation en mode developpement, on substitue __PRODUCTION__
        // avec "false", ceci permet d'avoir les loggers actifs !
        //
        // lors d'une utilisation en module es6, il n'y a pas de substitution de __PRODUCTION__,
        // les loggers sont donc actifs par defaut !
        //
        // > Substitute global constants configured at compile time
        // cf. webpack.config.js
        // on masque cette constante afin d'eviter "referenceerror not defined"
        ("__PRODUCTION__".match(/true/)) ? Log.disableAll() : Log.enableAll();
        var logname = name || "default";
        return Log.getLogger(logname);
    },
    /** desactive tous les loggers */
    disableAll : function () {
        var loggers = Log.getLoggers();
        for (const key in loggers) {
            if (Object.hasOwnProperty.call(loggers, key)) {
                const logger = loggers[key];
                logger.disableAll();
            }
        }
    },
    /** active tous les loggers */
    enableAll : function () {
        var loggers = Log.getLoggers();
        for (const key in loggers) {
            if (Object.hasOwnProperty.call(loggers, key)) {
                const logger = loggers[key];
                logger.enableAll();
            }
        }
    }
};

export default LoggerByDefault;
