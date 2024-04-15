import * as Log from "loglevel";

/**
 * @module LoggerByDefault
 * @alias [private] LoggerByDefault
 * @description
 * ...
 *
 * @example
 * getLogger();
 * disableAll();
 * enableAll();
 */
var LoggerByDefault = {
    /**
     * creation d'un logger statique
     *
     * @function getLogger
     * @param {String} [name="default"] - the logger name
     * @returns {Object} logger
     */
    getLogger : function (name) {
        // > Substitute global constants configured at compile time
        // cf. webpack.config.js
        // on définit process si non défini dans l'environnement
        if (!process) {
            process = {
                env: {}
            };
        }
        (process.env.VERBOSE) ? Log.enableAll() : Log.disableAll();
        var logname = name || "default";
        return Log.getLogger(logname);
    },
    /**
     * desactive tous les loggers
     * @function disableAll
     */
    disableAll : function () {
        var loggers = Log.getLoggers();
        for (const key in loggers) {
            if (Object.hasOwnProperty.call(loggers, key)) {
                const logger = loggers[key];
                logger.disableAll();
            }
        }
    },
    /**
     * active tous les loggers
     * @function enableAll
     */
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
