/*!
 * @brief French Geoportal Extension for Leaflet
 *
 * This software is released under the licence CeCILL-B (Free BSD compatible)
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.txt
 * @see http://www.cecill.info/
 *
 * @copyright copyright (c) IGN 
 * @license CeCILL-B
 * @author IGN
 * @version 2.2.7
 * @date 18/11/2022
 *
 */

Route =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 107);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports) {

module.exports = L;

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(loglevel__WEBPACK_IMPORTED_MODULE_0__);

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
  getLogger: function getLogger(name) {
    // INFO :
    // à la compilation en mode production, on substitue false
    // avec "true", ceci desactive les loggers !
    //
    // à la compilation en mode developpement, on substitue false
    // avec "false", ceci permet d'avoir les loggers actifs !
    //
    // lors d'une utilisation en module es6, il n'y a pas de substitution de false,
    // les loggers sont donc actifs par defaut !
    //
    // > Substitute global constants configured at compile time
    // cf. webpack.config.js
    // on masque cette constante afin d'eviter "referenceerror not defined"
    "false".match(/true/) ? loglevel__WEBPACK_IMPORTED_MODULE_0__["disableAll"]() : loglevel__WEBPACK_IMPORTED_MODULE_0__["enableAll"]();
    var logname = name || "default";
    return loglevel__WEBPACK_IMPORTED_MODULE_0__["getLogger"](logname);
  },

  /**
   * desactive tous les loggers
   * @function disableAll
   */
  disableAll: function disableAll() {
    var loggers = loglevel__WEBPACK_IMPORTED_MODULE_0__["getLoggers"]();

    for (var key in loggers) {
      if (Object.hasOwnProperty.call(loggers, key)) {
        var logger = loggers[key];
        logger.disableAll();
      }
    }
  },

  /**
   * active tous les loggers
   * @function enableAll
   */
  enableAll: function enableAll() {
    var loggers = loglevel__WEBPACK_IMPORTED_MODULE_0__["getLoggers"]();

    for (var key in loggers) {
      if (Object.hasOwnProperty.call(loggers, key)) {
        var logger = loggers[key];
        logger.enableAll();
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (LoggerByDefault);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage.removeItem(storageKey);
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          defaultLevel = level;
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.resetLevel = function () {
          self.setLevel(defaultLevel, false);
          clearPersistedLevel();
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @module SelectorID
 * @alias [private] SelectorID
 * @description
 * formalisme d'un tag ID :
 * -> NAME(_ORDER)-1460636385836
 *
 * @example
 * Ex.
 *   GProutePoints-1460636385836
 *   GProutePoint_10-1460636385836
 */
var SelectorID = {
  /**
   * Construction d'un identifiant statique basé sur le timestamp,
   * et qui s'incremente de +1 à chaque appel
   * @function generate
   */
  generate: function () {
    var timestamp = Math.floor(Date.now());
    return function () {
      return timestamp++;
    };
  }(),

  /**
   * nom du tag
   * @function name
   * @param {String} id - the id
   * @returns {String} index
   */
  name: function name(id) {
    var name = null;
    var i = id.lastIndexOf("-");

    if (i === -1) {
      name = id;
    } else {
      name = id.substring(0, i);
    }

    return name;
  },

  /**
   * numero d'identifiant du tag
   *
   * @function index
   * @param {String} id - the id
   * @returns {String} index
   */
  index: function index(id) {
    var index = null;
    var name = this.name(id); // if (name !== id) {

    var i = name.lastIndexOf("_");

    if (i !== -1) {
      index = name.substring(i + 1);
    } // }


    return index;
  },

  /**
   * uuid du tag
   *
   * @function uuid
   * @param {String} id - the id
   * @returns {String} uuid
   */
  uuid: function uuid(id) {
    var uuid = null;
    var i = id.lastIndexOf("-");

    if (i !== -1) {
      uuid = parseInt(id.substring(i + 1), 10);
    }

    return uuid;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (SelectorID);

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(loglevel__WEBPACK_IMPORTED_MODULE_0__);


var LoggerByDefault = {
    /**
     * logger statique
     *
     * @static
     * @param {String} name - nom du logger
     * @returns {Object} retourne un logger
     */
    getLogger : function (name) {
        // Substitute global constants configured at compile time
        // cf. webpack.config.js
        // FIXME howtodo !? DefineWebpackPlugin ? EnvironmentWebpackPlugin ?
        ("false".match(/true/)) ? loglevel__WEBPACK_IMPORTED_MODULE_0__["disableAll"]() : loglevel__WEBPACK_IMPORTED_MODULE_0__["enableAll"]();
        var logname = name || "default";
        return loglevel__WEBPACK_IMPORTED_MODULE_0__["getLogger"](logname);
    }
};

/* harmony default export */ __webpack_exports__["default"] = (LoggerByDefault);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Classe de gestion des erreurs qui permer d'associer un message d'erreur à l'exception lancée.
 *
 * @example
 * MessagesResources.getMessage("ERROR_PARAM_MISSING", "x", "y", "z")));
 * // --> output : Parameter(s) 'x - y - z' missing
 *
 * @module MessagesResources
 * @alias Gp.Utils.MessagesResources
 * @private
 */
var MessagesResources = {

    // Paramètres
    PARAM_MISSING : "Parameter(s) '%var%' missing",
    PARAM_EMPTY : "Parameter(s) '%var%' empty",
    PARAM_TYPE : "Wrong type(s) for parameter(s) '%var%'",
    PARAM_FORMAT : "Parameter(s) '%var%' not correctly formatted",
    PARAM_NOT_SUPPORT : "Value(s) for parameter(s) '%var%' not supported",
    PARAM_NOT_SUPPORT_NODEJS : "Value(s) for parameter(s) '%var%' not supported to NodeJS",
    PARAM_UNKNOWN : "Value(s) for parameter(s) '%var%' unknown",

    // Services
    // Requête
    SERVICE_REQUEST_BUILD : "An error occurred during the request building of the service",
    SERVICE_REQUEST_EMPTY : "The request sent to the service is empty",

    // Réponse
    SERVICE_RESPONSE_EXCEPTION : "The service returned an exception : '%var%'",
    SERVICE_RESPONSE_EXCEPTION_2 : "The service returned an exception",
    SERVICE_RESPONSE_ANALYSE : "An error occurred while parsing the response '%var%' of the service",
    SERVICE_RESPONSE_ANALYSE_2 : "An unknown error occurred while parsing the response",
    SERVICE_RESPONSE_EMPTY : "The response of the service is empty",
    SERVICE_RESPONSE_EMPTY_2 : "The response from the service could not be analyzed or is empty",
    SERVICE_RESPONSE_FORMAT : "The format of the service response is not supported (handled format(s) : '%var%')",
    SERVICE_RESPONSE_FORMAT_2 : "The format of the service response is not supported",
    SERVICE_RESPONSE_FORMAT_3 : "No suggestion matching the search",

    // Classes
    CLASS_CONSTRUCTOR : "'%var%' constructor cannot be called as a function.",

    /**
     * Fonction qui va retourner le message d'erreur associé à la clé donnée
     *
     * @method getMessage
     * @param {String} clef - Clef de l'erreur (ex : ERROR_PARAM)
     * @param {String[]} parametres - Paramètres/variables concernés par le message d'erreur associé à la clef donnée
     * @return {String} message - String contenant le message de l'exception
     */
    getMessage : function (clef, parametres) {
        // param de la fonction uniquement pour la documentation...

        if (Object.keys(arguments).length === 0) {
            return "Message indefined !";
        }

        var params = Array.prototype.slice.call(arguments);
        var key = params.shift();
        var args = params;

        var message = this[key];

        try {
            if (Array.isArray(args) && args.length > 0) {
                message = message.replace("%var%", args.join(" - "));
            } else {
                message = message.replace("%var%", "%var% (not specified)");
            }
        } catch (e) {
            // error de string.replace()

        }

        return message;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (MessagesResources);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Errors raised by API for one among three reasons : wrong API usage, underlying service error or unknown reason.
 *
 * @property {String} message - Error message
 * @property {Number} status - Error status : when {@link Gp.Error.TYPE_SRVERR}, gives the [HTTP status of the underlying web service response]{@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes} ; -1 otherwise.
 * @property {String} type - Error type ({@link Gp.Error.TYPE_SRVERR}, {@link Gp.Error.TYPE_USEERR} or {@link Gp.Error.TYPE_UNKERR}).
 *
 * @namespace
 * @alias Gp.Error
 * @param {Object|String} error - Options for creating error object. Can be a String (message) or an Object.
 * @param {String} error.message - Error message to return to user.
 * @param {enum} [error.type=TYPE_UNKERR] - Error type
 * @param {status} [error.status=-1] - Error status : when {@link Gp.Error.TYPE_SRVERR}, gives the [HTTP status of the underlying web service response]{@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}.
 *
 */
function ErrorService (error) {
    if (!(this instanceof ErrorService)) {
        throw new TypeError("ErrorService constructor cannot be called as a function.");
    }

    var e = error;
    if (typeof error === "string" || error instanceof String) {
        this.message = error;
        this.status = -1;
        this.type = ErrorService.TYPE_UNKERR;
    } else {
        this.message = e.message || "undefined!?";
        this.type = e.type;
        this.status = e.status || -1;
    }

    this.name = "ErrorService";
    this.stack = (new Error()).stack;
}

/**
 * Error raised when underlying geoportal service answers on error.
 *
 * @type {String}
 * @constant
 * @static
 */
ErrorService.TYPE_SRVERR = "SERVICE_ERROR";
/**
 * Error raised when funcion use is inappropriate
 *
 * @type {String}
 * @constant
 * @static
 */
ErrorService.TYPE_USEERR = "USAGE_ERROR";
/**
 * Error raised when API can't perform the job for a reason other than the two other ones.
 *
 * @type {String}
 * @constant
 * @static
 */
ErrorService.TYPE_UNKERR = "UNKNOWN_ERROR";

/**
 * @lends module:ErrorService
 */
ErrorService.prototype = Object.create(Error.prototype, {
    constructor : {
        value : ErrorService,
        writable : true,
        configurable : true
    }
});

/* harmony default export */ __webpack_exports__["default"] = (ErrorService);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var _Protocols_Protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);
/* harmony import */ var _DefaultUrlService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(55);
var _package_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(55, 1);






// package.json (extract version)


/**
 * @classdesc
 * Composant Service
 *
 * @constructor
 * @alias Gp.Services.CommonService
 * @param {Object} options - options communes à tous les services
 *
 * @param {String} options.apiKey - Clef d'accès à la plateforme Géoportail,
 *      nécessaire pour franchir la couche de contrôle des accès pour avoir une réponse du service invoqué.
 *      Plusieurs clefs peuvent être passées dans le cas de l'invocation du service d'autoconfiguration.
 *      Si ce paramètre n'est pas renseigné, alors le paramètre serverUrl doit être renseigné (comprenant alors, si nécessaire la clef API).
 *
 * @param {String} options.serverUrl - URL d'accès au service.
 *      Permet de forcer l'utilisation d'un service équivalent déployé derrière une éventuelle autre URL d'accès.
 *      Si ce paramètre est renseigné alors, le paramètre apiKey est ignoré.
 *
 * @param {String} [options.protocol] - Le protocole à utiliser pour récupérer les informations du service :
 *      peut valoir 'JSONP' ou 'XHR'.
 *      Par défaut, c'est le protocole XHR qui sera utilisé.
 *      Attention, le protocole JSONP n'est pas valide dans un environnement NodeJS (Utilisation du mode XHR).
 *
 * @param {Boolean} [options.ssl] - Indique si l'on souhaite intérroger les services en https.
 *      Ce paramètre ne fonctionne que pour une utilisation hors navigateur (ex. NodeJS).
 *      Sur un navigateur, le protocole est automatiquement extrait de l'url du site...
 *      Par défaut, on utilise le protocole http (ssl=false).
 *
 * @param {String} [options.proxyURL] - Le proxy à utiliser pour pallier au problème de cross-domain dans le cas d'une requête XHR.
 *      Utile si le paramètre 'protocol' vaut 'XHR', il ne sera pas pris en compte si protocol vaut JSONP.
 *
 * @param {String} [options.callbackSuffix] - Suffixe de la fonction de callback à utiliser, dans le cas du protocole JSONP.
 *      Par défaut, la fonction de callback portera un nom du type "callback"+ID, où ID est soit un identifiant unique généré à chaque requête,
 *      soit le paramètre callbackSuffix s'il est spécifié. Par exemple, si callbackSuffix="_2", la fonction sera "callback_2 ()".
 *      Utile pour utiliser une réponse déjà encapsulée dans une fonction de callback, dont le nom est connu (ex : chargement de l'autoconfiguration en local)
 *      Utile seulement si le paramètre 'protocol' vaut 'JSONP', il ne sera pas pris en compte si protocol vaut 'XHR'.
 *
 * @param {String} [options.httpMethod] - La méthode HTTP
 *      à utiliser dans le cas d'une requête XHR : peut valoir 'GET' ou 'POST'.
 *      Non pris en compte si 'protocol' vaut JSONP qui fonctionne obligatoirement en GET.
 *      Par défaut, c'est la méthode GET qui est utilisée.
 *
 * @param {String} [options.contentType] - Content-Type de la requete
 *      à utiliser dans le cas d'une requête XHR en mode POST.
 *      Non pris en compte si 'protocol' vaut JSONP et/ou la méthode HTTP vaut GET.
 *      Par défaut, c'est la méthode GET qui est utilisée donc on n'utilise pas de Content-Type.
 *
 * @param {Number} [options.timeOut] - Délai d'attente maximal (en ms) de la réponse du service (à partir de l'envoi de la requête).
 *      Par défaut, aucun timeOut n'est pris en compte (timeoutDelay= 0).
 *
 * @param {Boolean} [options.rawResponse] - Indique si l'on souhaite que la réponse du service ne soit pas parsée par l'API avant d'être restituée.
 *      (Cf. paramètre « onSuccess » pour plus de détails).
 *
 * @param {Function} [options.onSuccess] - Fonction appelée lorsque le service répond correctement à la requête
 *      (code HTTP 200, sans message d'erreur).
 *      Cette fonction prend en paramètre la réponse du service,
 *      soit sous la forme d'un Object Javascript formaté par le parseur dédié à la syntaxe du service (comportement par défaut) ;
 *      soit brute au format String non prétraité si le paramètre « rawResponse » a été précisé avec la valeur « true ».
 *
 * @param {Function} [options.onFailure] - Fonction appelée lorsque le service ne répond pas correctement
 *      (code HTTP de retour différent de 200 ou pas de réponse).
 *
 * @param {Function} [options.onBeforeParse] - Fonction appelée avant le parsing de la réponse
 *      Permet de modifier la réponse avant parsing et la fonction doit retourner une String.
 *      Cette fonction prend en paramètre la réponse telle que renvoyée par le service
 *      (cad au format json ou xml).
 *      Pour le JSONP, si le paramètre "rawResponse" a été précisé avec la valeur "true",
 *      la fonction prend en paramètre un Object JavaScript contenant la réponse XML.
 *
 * @example
 *   var options = {
 *      apiKey : null,
 *      serverUrl : 'http://localhost/service/',
 *      protocol : 'JSONP', // JSONP|XHR
 *      ssl : false,
 *      proxyURL : null,
 *      callbackName : null,
 *      httpMethod : 'GET', // GET|POST
 *      timeOut : 10000, // ms
 *      rawResponse : false, // true|false
 *      scope : null, // this
 *      onSuccess : function (response) {},
 *      onFailure : function (error) {},
 *      onBeforeParse : function (rawResponse) {}
 *   };
 * @private
 */
function CommonService (options) {
    if (!(this instanceof CommonService)) {
        throw new TypeError(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__["default"].getMessage("CLASS_CONSTRUCTOR"));
    }

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("CommonService");
    this.logger.trace("[Constructeur CommonService (options)]");

    // #####################
    // récupération des options par défaut pour les paramètres optionnels
    // #####################

    /**
     * Options du service
     * @type {Object}
     */
    this.options = {
        // protocol : "JSONP",
        protocol : "XHR",
        ssl : true,
        proxyURL : "",
        // callbackName : "",
        callbackSuffix : null,
        httpMethod : "GET",
        timeOut : 0,
        rawResponse : false,
        scope : this,
        /**
        * callback par defaut pour la reponse
        * @param {Object} response - response
        * @private
        */
        onSuccess : function (response) {
            console.log("onSuccess - la reponse est la suivante : ", response);
        },
        /**
        * callback par defaut pour les erreurs
        * @param {Object} error - error
        * @private
        */
        onFailure : function (error) {
            if (error.status === 200 || !error.status) {
                console.log("onFailure : ", error.message);
            } else {
                console.log("onFailure - Erreur (", error.status, ") : ", error.message);
            }
        }
    };

    // et on ajoute les options en paramètre aux options par défaut
    for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
            this.options[opt] = options[opt];
        }
    }

    // #####################
    // analyse des options
    // #####################

    // gestion des clefs API
    if (!this.options.apiKey && !this.options.serverUrl) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__["default"].getMessage("PARAM_MISSING", "apiKey", "serverUrl"));
    }

    // modification de la fonction de callback onSuccess dans le cas où la réponse brute est demandée
    if (this.options.rawResponse && !this.options.onSuccess) {
        /**
        * callback par defaut pour la reponse
        * @param {Object} response - response
        * @private
        */
        this.options.onSuccess = function (response) {
            console.log("onSuccess - la réponse brute du service est la suivante : ", response);
        };
    }

    // gestion du callback onSuccess
    var bOnSuccess = !!(this.options.onSuccess !== null && typeof this.options.onSuccess === "function");
    if (!bOnSuccess) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__["default"].getMessage("PARAM_MISSING", "onSuccess()"));
    }

    // gestion de l'url du service par defaut
    if (!this.options.serverUrl) {
        // INFO
        // gestion de l'url du service par defaut pour les services qui ne possèdent qu'une seul url par defaut
        // les cas particuliers des services avec plusieurs urls (ex. Alti) devront être traité dans la classe du composant
        // donc si l'url n'est pas renseignée, il faut utiliser les urls par defaut
        _DefaultUrlService__WEBPACK_IMPORTED_MODULE_5__["default"].ssl = this.options.ssl;
        var urlByDefault = _DefaultUrlService__WEBPACK_IMPORTED_MODULE_5__["default"][this.CLASSNAME].url(this.options.apiKey);
        if (typeof urlByDefault === "string") {
            this.options.serverUrl = urlByDefault;
        } else {
            this.logger.trace("URL par defaut à determiner au niveau du composant...");
        }
    }

    // FIXME nettoyage des KVP dans l'url du service
    // if (this.options.serverUrl) {
    //     // INFO
    //     // si l'url est renseignée, il faut la nettoyer de tous ses KVP
    //     // ex. on ne veut pas de params. 'callback' ou 'output' car ceci declencherait
    //     // des opérations d'encapsulations des reponses légèrement farfelues ...
    //     var urlsource = this.options.serverUrl;
    //     var urlparts = urlsource.split("?");
    //     this.options.serverUrl = urlparts[0];
    // }

    // gestion de la methode HTTP
    this.options.httpMethod = (typeof options.httpMethod === "string") ? options.httpMethod.toUpperCase() : "GET";

    switch (this.options.httpMethod) {
        case "POST":
        case "GET":
            break;
        case "PUT":
        case "DELETE":
        case "HEAD":
        case "OPTIONS":
            throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__["default"].getMessage("PARAM_NOT_SUPPORT", "httpMethod"));
        default:
            throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__["default"].getMessage("PARAM_UNKNOWN", "httpMethod"));
    }

    // gestion du protocole
    // this.options.protocol = (typeof options.protocol === "string" ) ? options.protocol.toUpperCase() : "JSONP";
    this.options.protocol = (typeof options.protocol === "string") ? options.protocol.toUpperCase() : "XHR";

    switch (this.options.protocol) {
        case "JSONP":
        case "XHR":
            break;
        default:
            throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__["default"].getMessage("PARAM_UNKNOWN", "protocol"));
    }

    // on determine l'environnement d'execution : browser ou non ?
    // et on lance une exception sur l'utilisation du protocole JSONP pour nodeJS...
    if (typeof window === "undefined" && this.options.protocol === "JSONP") {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_2__["default"].getMessage("PARAM_NOT_SUPPORT_NODEJS", "protocol=JSONP (instead use XHR)"));
    }

    // le protocole JSONP ne fonctionne qu'en GET.
    if (this.options.protocol === "JSONP") {
        this.options.httpMethod = "GET";
    }

    // gestion du cache
    this.options.nocache = options.nocache || false;

    // #####################
    // attributs d'instances
    // #####################

    /**
     * Format de réponse du service
     */
    this.options.outputFormat = null;
    /**
     * Requête envoyée au service
     */
    this.request = null;
    /**
     * Reponse du service
     */
    this.response = null;
}

/**
 * @lends module:CommonService
 */
CommonService.prototype = {

    /*
     * Constructeur (alias)
     */
    constructor : CommonService,

    /**
     * Appel du service Géoportail
     */
    call : function () {
        /* jshint validthis : true */
        this.logger.trace("CommonService::call ()");

        var context = this;
        /** fonction d'execution */
        function run () {
            this.logger.trace("CommonService::run ()");
            this.buildRequest.call(context, onError, onBuildRequest);
        }

        run.call(context);

        // callback de fin de construction de la requête
        function onBuildRequest (result) {
            this.logger.trace("CommonService::onBuildRequest : ", result);
            this.callService.call(context, onError, onCallService);
        }

        // callback de fin d'appel au service
        function onCallService (result) {
            this.logger.trace("CommonService::onCallService : ", result);
            this.analyzeResponse.call(context, onError, onAnalyzeResponse);
        }

        // callback de fin de lecture de la reponse
        function onAnalyzeResponse (result) {
            this.logger.trace("CommonService::onAnalyzeResponse : ", result);
            if (result) {
                this.options.onSuccess.call(this, result);
            } else {
                return onError.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"]("Analyse de la reponse en échec !?"));
            }
        }

        // callback de gestion des erreurs : renvoit un objet de type ErrorService
        function onError (error) {
            this.logger.trace("CommonService::onError()");
            // error : l'objet est du type ErrorService ou Error
            var e = error;
            if (!(e instanceof _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"])) {
                e = new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"](error.message);
            }
            this.options.onFailure.call(this, e);
        }
    },

    /**
     * Création de la requête
     * @param {Function} error - callback
     * @param {Function} success - callback
     */
    buildRequest : function (error, success) {
        // INFO
        this.logger.error("overwritten method !");
        // retourne l'objet 'this.request'
        if (error) {
            error.call(this, "This method must be overwritten !");
        }
        success.call(this, "This method must be overwritten !");
    },

    /**
     * Appel du service
     * @param {Function} error - callback
     * @param {Function} success - callback
     */
    callService : function (error, success) {
        // INFO
        // retourne l'objet 'this.response'

        // NOTES
        //  Pour le mode XHR, on recupère une reponse sous forme d'un json ou xml (#document).
        //  Pour le mode JSONP, on a toujours un objet JSON mais sous 2 formes :
        //      - natif
        //      - XML encapsulé :
        //          {http : {status:200, error:null},xml :'réponse du service'}
        //          {http : {status:400, error:'reponse du service'},xml :null}
        //  En XHR, la reponse est directement sauvegardée dans 'this.response'.
        //  Par contre, en JSONP, on doit analyser la reponse (status ou non vide),
        //  et ne renvoyer que le contenu (xml ou l'objet)

        // gestion de la proxification du service
        var strUrlProxified = null;
        var strData = this.request;

        // a t on mis en place un proxy ?
        // la proxyfication est valable uniquement en mode XHR !
        var bUrlProxified = !!(this.options.proxyURL && this.options.protocol === "XHR");

        // rajout de l'option gpbibaccess
        // INFO : acces au numero de version de package.conf aprés compilation !
        if (this.CLASSNAME !== "Geocode" && this.CLASSNAME !== "ReverseGeocode" && this.CLASSNAME !== "AutoComplete") {
            this.options.serverUrl = _Utils_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].normalyzeUrl(this.options.serverUrl, {
                "gp-access-lib" : _package_json__WEBPACK_IMPORTED_MODULE_6__.version
            }, false);
        }

        // si le proxy est renseigné, on proxifie l'url du service
        if (bUrlProxified) {
            if (this.options.httpMethod === "GET") {
                strUrlProxified = this.options.proxyURL + _Utils_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].normalyzeUrl(this.options.serverUrl, this.request, true);
                strData = null;
            }

            if (this.options.httpMethod === "POST") {
                strUrlProxified = this.options.proxyURL + _Utils_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].normalyzeUrl(this.options.serverUrl, null, true);
                strData = this.request;
            }
        }

        // contexte du composant spécifique !
        var self = this;

        var options = {
            url : strUrlProxified || this.options.serverUrl,
            method : this.options.httpMethod,
            protocol : this.options.protocol,
            timeOut : this.options.timeOut || 0,
            format : this.options.outputFormat, // ceci declenche le parsing de la reponse du service, mais on souhaite toujours une reponse brute (string) !
            nocache : this.options.nocache || false, // ceci permet d'ajouter un timestamp dans la requête
            wrap : this.options.protocol !== "XHR", // ceci declenche l'encapsulation de la reponse XML du service dans du JSON, mais pas en mode XHR !
            callbackSuffix : this.options.callbackSuffix,
            // callbackName : this.options.callbackName || null,
            data : strData,
            headers : null, // TODO...
            content : this.options.contentType || "application/xml",
            scope : this.options.scope || this,
            // callback de reponse
            onResponse : function (response) {
                self.logger.trace("callService::onResponse()");

                // le contenu de la reponse à renvoyer !
                var content = null;

                // XHR : on renvoie toujours la reponse brute du service (json ou xml)
                // au parser du composant...
                if (self.options.protocol === "XHR") {
                    self.logger.trace("Response XHR", response);
                    content = response; // par defaut, la reponse du service  !
                }

                // JSONP : on pre-analyse la reponse brute du service (encapsuler ou pas)
                // avant de l'envoyer au parser du composant...
                if (self.options.protocol === "JSONP") {
                    self.logger.trace("Response JSON", response);
                    if (response) {
                        if (response.http) {
                            // reponse encapsulée :
                            // ex. reponse du service en xml
                            // > {http : {status:200, error:null},xml :'réponse du service'}
                            if (response.http.status !== 200) {
                                error.call(self, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"]({
                                    status : response.http.status,
                                    message : response.http.error,
                                    type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"].TYPE_SRVERR
                                }));
                                return;
                            } else {
                                content = response.xml; // par defaut !
                                if (self.options.rawResponse) {
                                    content = response;
                                }
                            }
                        } else {
                            // reponse non encapsulée :
                            // ex. reponse du service en json ou xml
                            content = response;
                        }
                    } else {
                        error.call(self, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"]("Le contenu de la reponse est vide !?"));
                        return;
                    }
                }

                // si on souhaite parser la reponse du service
                if (typeof self.options.onBeforeParse === "function") {
                    var newResponse = self.options.onBeforeParse(content);
                    if (typeof newResponse === "string") {
                        // la reponse parsée par l'utilisateur est retournée sous
                        // forme de string !
                        content = newResponse;
                    }
                }
                // sauvegarde de la reponse dans l'objet parent (CommonService)
                self.response = content;
                // on renvoie la reponse...
                success.call(self, content);
            },
            // callback des erreurs
            onFailure : function (e) {
                self.logger.trace("callService::onFailure()");
                // on est forcement sur une erreur levée par un service !
                e.type = _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"].TYPE_SRVERR;
                error.call(self, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"](e));
            },
            // callback de timeOut
            onTimeOut : function () {
                self.logger.trace("callService::onTimeOut()");
                error.call(self, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_4__["default"]("TimeOut!"));
            }
        };

        _Protocols_Protocol__WEBPACK_IMPORTED_MODULE_3__["default"].send(options);
    },

    /**
     * Analyse de la réponse
     * @param {Function} error - callback
     * @param {Function} success - callback
     */
    analyzeResponse : function (error, success) {
        // INFO
        this.logger.error("overwritten method !");
        // retourne l'objet spécifique au type de composant (json)
        if (error) {
            error.call(this, "This method must be overwritten !");
        }
        success.call(this, "This method must be overwritten !");
    }

};

/* harmony default export */ __webpack_exports__["default"] = (CommonService);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Classe utilitaire
 *
 * @module Helper
 * @alias Gp.Helper
 */
var Helper = {

    /**
     * concatenation des parametres key/value dans les urls
     *
     * @method normalyzeParameters
     * @static
     * @param {Object} params - tableau de clef/valeur
     *
     * @example
     *  Gp.Utils.Helper.normalyzeParameters ({
     *         key1:value1,
     *         key2:value2,
     *         key3:value3
     *  });
     *  // out : "key1=value1&key2=value2&key3=value3"
     *
     * @returns {String} retourne les paramètres concaténés
     */
    normalyzeParameters : function (params) {
        var myParams = null;

        if (params) {
            var tabParams = [];
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    if (!value) {
                        value = "";
                    }
                    tabParams.push(key + "=" + value);
                }
            }

            myParams = tabParams.join("&");
        }

        return myParams;
    },

    /**
     * Concaténation et encodage des urls.
     *
     * @method normalyzeUrl
     * @static
     * @param {String} url - url
     * @param {Object|String} params - tableau de clef/valeur ou string
     * @param {Boolean} encode - true|false, false par defaut
     *
     * @example
     *  Gp.Utils.Helper.normalyzeUrl (url, {
     *         key1:value1,
     *         key2=:value2,
     *         key3:value3
     *  });
     *  // out : "url?key1=value1&key2=value2&key3=value3"
     *
     * @returns {String} retourne une url normalisée
     */
    normalyzeUrl : function (url, params, encode) {
        var myUrl = url;

        if (url) {
            var k = url.indexOf("?");
            if (k === -1) { // pas de ? et KVP
                myUrl += "?";
            }

            if (k !== -1 && k !== url.length - 1) { // KVP
                myUrl += "&";
            }
        }

        if (params) {
            if (typeof params === "string") {
                myUrl += params;
            } else {
                myUrl += this.normalyzeParameters(params);
            }
        }

        if (encode) {
            // FIXME bonne idée ?
            myUrl = encodeURIComponent(myUrl);
        }

        return myUrl;
    },

    /**
     * Indentation d'une chaine
     *
     * @method indent
     * @static
     * @param {Number} n - nombre de tabulation
     * @param {String} msg - chaine
     *
     * @example
     * Gp.Utils.Helper.indent (2, "message à indenter")
     * // out
     * // ........message à indenter
     *
     * @returns {String} retourne une chaine indentée
     */
    indent : function (n, msg) {
        var num = n || 0;
        return new Array(num + 1).join("\t") + msg;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (Helper);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _XHR__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _JSONP__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53);
/**
 * Interface de dialogue avec les webservices
 *
 * @module Protocols
 * @private
 * @alias Gp.Protocols
 */




var Protocol = {

    /**
     * Interface unique d"envoi d"une requête.
     *
     * @method send
     * @static
     * @param {Object} options - options generales
     * @param {String} options.url      - url du service
     * @param {String} options.method   - GET, POST, PUT, DELETE
     * @param {String} options.protocol - XHR | JSONP
     * @param {String} options.format   - format de la reponse du service : json, xml ou null (brute)...
     * @param {String} options.wrap     - encapsuler la reponse du service dans du JSON : true|false (true par defaut sur le protocole JSONP)
     * @param {String} options.callbackSuffix - suffixe de la fonction de callback (JSONP uniquement) (ex: si callbackSuffix="", la fonction s'appellera "callback")
     * @param {String} options.timeOut  - 0 ms
     * @param {Boolean} options.nocache  - true|false
     * @param {Object|String} options.data        - content (post) ou param (get)
     * @param {Object|String} options.headers     - (post) ex. referer
     * @param {Object|String} options.content - (post) ex. "application/json"
     * @param {String} options.scope       - this (TODO)
     * @param {Function} options.onResponse - callback
     * @param {Function} options.onFailure - callback
     * @param {Function} options.onTimeOut - callback
     * @param {String} options.proxyUrl -  (TODO)
     */
    send : function (options) {
        // INFO
        // "output" - param est interne à la classe "Protocol" (parametrable via "wrap"), et à ajouter à l"url
        //      ce param est independant du service car il est géré par le filtre LUA :
        //          ex. json|xml (json par defaut).
        //          Ce param. permet d"encapsuler du XML dans du JSON :
        //              {http : {status:200, error:null},xml :"réponse du service"}
        //          Utile pour les services qui ne repondent que du XML (ex. Geocodage)
        //
        // |-------------------------------------------------|
        // |      \service |      |     |                    |
        // | output\ format| json | xml |     remarques      |
        // |--------\------|------|-----|--------------------|
        // |    json       | json | json| json/xml encapsulé |
        // |    xml        | json | xml | param inactif      |
        // |-------------------------------------------------|
        // ex. le service demande une reponse native au "format" json et avec un "output" json.
        // on a donc une reponse json encapsulé dans un json : ce qu'on ne souhaite pas !
        // dans ce cas on ne renseigne pas output=json

        // INFO
        // "wrap" - choix d"encapsuler ou non les reponses dans du JSON.
        //      Par defaut, on encapsule uniquement les reponses sur le protocole JSONP (et qui sont en xml) !

        // INFO
        // "callback" - param est interne à la classe "Protocol" (non parametrable), et à ajouter à l"url
        //      ce param est independant du service car il est géré aussi par le filtre LUA :
        //          ex. callback|null
        //          Ce param. permet de renvoyer une reponse javascript :
        //              callback ({http : {status:200, error:null},xml :"réponse du service"})
        //          Ce param. est non renseigné par defaut car pour du JSONP, on utilise le
        //          le protocol JSONP, et ce dernier implemente déjà le callback !

        // settings par defaut
        var settings = options || {
            method : "GET",
            // protocol : "JSONP",
            protocol : "XHR",
            timeOut : 0,
            format : null,
            wrap : true,
            nocache : true,
            output : "json",
            callback : null,
            callbackSuffix : null
        };

        // on determine l'environnement d'execution : browser ou non ?
        // et on stoppe pour nodeJS... sur un protocole JSONP !
        if (typeof window === "undefined" && options.protocol === "JSONP") {
            console.log("Value (s) for parameter (s) 'protocol=JSONP (instead use XHR)' not supported to NodeJS");
            return;
        }

        if (options.protocol === "XHR" || options.format === "json") {
            settings.wrap = false;
        } else if (options.protocol === "JSONP" && options.format === "xml") {
            settings.wrap = true;
        }

        settings.callback = null; // FIXME non géré !?
        settings.output = settings.wrap ? "json" : null;

        // on encapsule les reponses dans un objet JSON
        if (settings.wrap) {
            var params = {};
            params.output = settings.output;
            params.callback = settings.callback;
            delete params.callback; // FIXME non géré !?
            settings.url = _Utils_Helper__WEBPACK_IMPORTED_MODULE_0__["default"].normalyzeUrl(options.url, params);
        }

        // choix de l"implementation :
        // XHR ou JSONP
        switch (settings.protocol) {
            case "XHR":
                // on normalise l'url (gestion du cache)
                if (options.method === "GET" && options.nocache) {
                    settings.url = _Utils_Helper__WEBPACK_IMPORTED_MODULE_0__["default"].normalyzeUrl(settings.url, {
                        t : new Date().getTime()
                    });
                }
                // appel du service en XHR
                _XHR__WEBPACK_IMPORTED_MODULE_1__["default"].call(settings);
                break;
            case "JSONP":

                // on normalise l'url si les params. sont renseignés dans la string|object "data"
                if (settings.data) {
                    settings.url = _Utils_Helper__WEBPACK_IMPORTED_MODULE_0__["default"].normalyzeUrl(settings.url, settings.data);
                }

                // appel du service en JSONP
                _JSONP__WEBPACK_IMPORTED_MODULE_2__["default"].call(settings);
                break;
            default:
                throw new Error("protocol not supported (XHR|JSONP) !");
        }
    }

};

/* harmony default export */ __webpack_exports__["default"] = (Protocol);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45);
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48);
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_2__);
/* global Promise, require, XDomainRequest */




// import __request from "request";
// import __xmldom from "xmldom";

/**
 * Ajax Request (use of Promises)
 *
 * @module XHR
 * @alias Gp.Protocols.XHR
 * @see dependance 'es6-promise'
 */

// cf. https://xhr.spec.whatwg.org/
// cf. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

var XHR = {

    /**
     * Interface unique d'envoi d'une requête.
     *
     * @method call
     * @static
     * @param {Object} settings - options generales
     * @param {String} settings.url    - url du service
     * @param {String} settings.method - GET, POST, PUT, DELETE
     * @param {String} settings.format - format de la reponse du service : json, xml ou null (brute)
     * @param {String} settings.data   - content (post) ou param (get)
     * @param {String} settings.proxy  - proxy url
     * @param {Object|String} settings.headers - (post) ex. referer
     * @param {Object|String} settings.content - (post) ex. 'application/json'
     * @param {String} settings.timeOut - timeout = 0 par defaut
     * @param {String} settings.scope - this
     * @param {Function} settings.onResponse - callback
     * @param {Function} settings.onFailure  - callback
     */
    call : function (settings) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("XHR");
        logger.trace("[XHR::call()]");

        // FIXME
        // To polyfill the global environment
        es6_promise__WEBPACK_IMPORTED_MODULE_2___default.a.polyfill();

        // test sur les settings obligatoires
        if (!settings.url) {
            throw new Error("missing parameter : url is not defined !");
        }

        if (!settings.method) {
            throw new Error("missing parameter : method is not defined !");
        }

        if (!settings.format) {
            settings.format = "text"; // reponse brute !
        }

        var options = {};
        options.url = settings.url;
        options.data = settings.data ? settings.data : null;
        options.method = settings.method;
        options.timeOut = settings.timeOut || 0;
        options.scope = settings.scope || this;
        options.proxy = settings.proxy || null;
        options.content = settings.content || null;
        options.headers = settings.headers || {
            referer : "http://localhost"
        };

        // test sur les valeurs de 'settings.method'
        switch (settings.method) {
            case "DELETE":
            case "GET":
                break;
            case "PUT":
            case "POST":
                // on force sur ces params spécifiques au mode POST
                options.content = settings.content ? settings.content : "application/x-www-form-urlencoded"; // FIXME en attente des services : bascule en "application/xml" ou "application/json"
                options.headers = settings.headers ? settings.headers : { referer : "http://localhost" }; // FIXME parametrable...
                break;
            case "HEAD":
            case "OPTIONS":
                throw new Error("HTTP method not yet supported !");
            default:
                throw new Error("HTTP method unknown !");
        }

        // test sur les valeurs de 'settings.format'
        switch (settings.format) {
            case "text":
                this.__call(options)
                    .then(function (response) {
                        logger.trace(response);
                        settings.onResponse.call(this, response);
                    })
                    .catch(function (error) {
                        settings.onFailure.call(this, error);
                    });
                break;
            case "json":
                this.__callJSON(options)
                    .then(function (response) {
                        logger.trace(response);
                        settings.onResponse.call(this, response);
                    })
                    .catch(function (error) {
                        settings.onFailure.call(this, error);
                    });
                break;
            case "xml":
                this.__callXML(options)
                    .then(function (response) {
                        logger.trace(response);
                        settings.onResponse.call(this, response);
                    })
                    .catch(function (error) {
                        settings.onFailure.call(this, error);
                    });
                break;
            default:
                throw new Error("This output Format is not yet supported !");
        }
    },

    /**
     * Requete
     *
     * @method __call
     * @private
     * @param  {Object} options - options
     * @return {Object} promise
     */
    __call : function (options) {
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("XHR");
        logger.trace("[XHR::__call()]");

        var promise = new Promise(
            function (resolve, reject) {
                // traitement du corps de la requête
                var corps = (options.method === "POST" || options.method === "PUT") ? 1 : 0;

                // seulement si options.data n'est pas vide (peut être un objet ou une chaine de caractères)
                if (options.data && ((typeof options.data === "object" && Object.keys(options.data).length) || (typeof options.data === "string" && options.data.length)) && !corps) {
                    if (options.scope.CLASSNAME === "Geocode" || options.scope.CLASSNAME === "ReverseGeocode") {
                        options.url = options.url + options.data;
                    } else {
                        options.url = _Utils_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].normalyzeUrl(options.url, options.data);
                    }
                }

                logger.trace("URL = ", options.url);

                var hXHR = null;

                // test on env. nodejs or browser
                if (typeof window === "undefined") {
                    var nodefetch = __webpack_require__(51);

                    var opts = {
                        headers : {
                            Referer : "https://localhost"
                        }
                    };

                    if (options.data && typeof options.data === "string" && corps) {
                        opts = {
                            method : options.method,
                            body : options.data,
                            headers : {
                                "Content-Type" : options.content,
                                Referer : "https://localhost"
                            }
                        };
                    }

                    return nodefetch(options.url, opts)
                        .then(function (response) {
                            if (response.ok) { // res.status >= 200 && res.status < 300
                                resolve(response.text());
                            } else {
                                var message = "Errors Occured on Http Request (status : '" + response.statusText + "' | url : '" + response.url + "')";
                                var status = response.status;
                                reject({
                                    message : message,
                                    status : status
                                });
                            }
                        })
                        .catch(function (e) {
                            reject({
                                message : e,
                                status : -1
                            });
                        });
                } else {
                    if (window.XMLHttpRequest) {
                        logger.trace("XMLHttpRequest");

                        hXHR = new XMLHttpRequest();
                        hXHR.open(options.method, options.url, true); // async
                        hXHR.overrideMimeType = options.content;

                        // gestion du timeout
                        var onTimeOutTrigger = null;
                        if (options.timeOut > 0) {
                            // FIXME le timeout interne ne me permet pas de declencher le bon message...
                            // hXHR.timeout = options.timeOut;
                            logger.trace("XHR - TimeOut actif !");
                            /**
                             * Description
                             *
                             * @method onTimeOutTrigger
                             * @private
                             */
                            onTimeOutTrigger = window.setTimeout(
                                function () {
                                    var message = "TimeOut Occured on Http Request with XMLHttpRequest !";
                                    reject({
                                        message : message,
                                        status : -1
                                    });
                                }, options.timeOut);
                        }

                        if (corps) {
                            // headers, data, content of data
                            // cf. https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#dom-xmlhttprequest-setrequestheader
                            logger.trace("data = ", options.data);
                            hXHR.setRequestHeader("Content-type", options.content);
                            // FIXME refused to set unsafe header content-length javascript
                            // hXHR.setRequestHeader ("Content-length", options.data.length);
                            // hXHR.setRequestHeader ("Referer", options.headers.referer);
                        }

                        /**
                         * On Error
                         * FIXME ne se declenche pas !?
                         *
                         * @param {Object} e - Event
                         * @method onerror
                         * @private
                         */
                        hXHR.onerror = function (e) {
                            console.log(e);
                            reject(new Error("Errors Occured on Http Request with XMLHttpRequest !"));
                        };

                        /**
                         * On Timeout
                         * FIXME ne se declenche pas !?
                         *
                         * @param {Object} e - Event
                         * @method ontimeout
                         * @private
                         */
                        hXHR.ontimeout = function (e) {
                            console.log(e);
                            reject(new Error("TimeOut Occured on Http Request with XMLHttpRequest !"));
                        };

                        /**
                         * Description
                         *
                         * @method onreadystatechange
                         * @private
                         */
                        hXHR.onreadystatechange = function (e) {
                            if (hXHR.readyState === 4) { // DONE
                                if (hXHR.status === 200) {
                                    window.clearTimeout(onTimeOutTrigger);
                                    resolve(hXHR.response);
                                } else {
                                    var message = "Errors Occured on Http Request (status : '" + e.target.statusText + "' | url : '" + e.target.responseURL + "' | response : '" + e.target.response + "')";
                                    var status = e.target.status;
                                    reject({
                                        message : message,
                                        status : status
                                    });
                                }
                            }
                        };

                        // gestion du content data
                        var data4xhr = (options.data && corps) ? options.data : null;

                        hXHR.send(data4xhr);
                    } else if (window.XDomainRequest) {
                        // worked in Internet Explorer 8–10 only !
                        logger.trace("XDomainRequest");

                        hXHR = new XDomainRequest();
                        hXHR.open(options.method, options.url);

                        hXHR.overrideMimeType = options.content;

                        if (options.timeOut > 0) {
                            hXHR.timeout = options.timeout;
                            logger.trace("XHR - TimeOut actif !");
                        }

                        if (corps) {
                            // headers, data, content of data
                            // cf. https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#dom-xmlhttprequest-setrequestheader
                            hXHR.setRequestHeader("Content-type", options.content);
                            // FIXME refused to set unsafe header content-length javascript
                            // hXHR.setRequestHeader ("Content-length", options.data.length);
                            // hXHR.setRequestHeader ("Referer", options.headers.referer);
                        }

                        /**
                         * Description
                         *
                         * @method onerror
                         * @private
                         */
                        hXHR.onerror = function () {
                            reject(new Error("Errors Occured on Http Request with XMLHttpRequest !"));
                        };

                        /**
                         * Description
                         *
                         * @method ontimeout
                         * @private
                         */
                        hXHR.ontimeout = function () {
                            reject(new Error("TimeOut Occured on Http Request with XMLHttpRequest !"));
                        };

                        /**
                         * On Load
                         *
                         * @method onload
                         * @private
                         */
                        hXHR.onload = function (e) {
                            if (hXHR.status === 200) {
                                resolve(hXHR.responseText);
                            } else {
                                var message = "Errors Occured on Http Request (status : '" + e.target.statusText + "' | url : '" + e.target.responseURL + "')";
                                var status = e.target.status;
                                reject({
                                    message : message,
                                    status : status
                                });
                            }
                        };

                        var data4xdr = (options.data && corps) ? options.data : null;

                        hXHR.send(data4xdr);
                    } else {
                        throw new Error("CORS not supported");
                    }
                }
            }
        );

        return promise;
    },

    /**
     * Requete avec parser JSON
     *
     * @method __callJSON
     * @private
     * @param  {Object} options - options
     * @return {Object} promise
     */
    __callJSON : function (options) {
        return this.__call(options)
            .then(JSON.parse)
            .catch(function (error) {
                console.log("_callJSON failed on : ", options.url, error);
                // FIXME pas d'exception, laissons le fil se derouler...
                // throw error;
            });
    },

    /**
     * Requete avec parser XML
     *
     * @method __callXML
     * @private
     * @param  {Object} options - options
     * @return {Object} promise
     */
    __callXML : function (options) {
        return this.__call(options)
            .then(function (response) {
                var xmlDoc;

                // test on env. nodejs or browser
                if (typeof window === "undefined") {
                    var DOMParser = __webpack_require__(52).DOMParser; // __xmldom.DOMParser
                    xmlDoc = new DOMParser().parseFromString(response, "text/xml");
                } else {
                    if (window.DOMParser) {
                        var parser = new window.DOMParser();
                        xmlDoc = parser.parseFromString(response, "text/xml");
                    } else { // IE
                        xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.async = false;
                        xmlDoc.loadXML(response);
                    }
                }

                return xmlDoc;
            })
            .catch(function (error) {
                console.log("__callXML failed on : ", options.url, error);
                // FIXME pas d'exception, laissons le fil se derouler...
                // throw error;
            });
    }

};

/* harmony default export */ __webpack_exports__["default"] = (XHR);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(49), __webpack_require__(50)))

/***/ }),
/* 49 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 50 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/**
 * JSONP : Implémentation du protocole JSONP de la plateforme Géoportail
 *
 * @module JSONP
 * @private
 * @alias Gp.Protocols.JSONP
 */


// cf. https://github.com/sobstel/jsonp.js
var JSONP = {

    /**
     * Construction d'un identifiant statique basé sur le timestamp,
     * et qui s'incremente de +1 à chaque appel
     */
    uuid : (function () {
        var id = Math.floor(Date.now());
        return function () {
            return id++;
        };
    })(),

    /**
     * Cette fonction réalise l'appel du service fourni via le paramètre "options.url"
     * en mettant en œuvre le protocole JSONP.
     *
     * @method call
     * @static
     * @param {Object} options - parametres d'invocation du service en JSONP
     * @param {String} options.url - URL du service à invoquer (indépendamment du protocole JSONP).
     *  Cette URL contient déjà les paramètres du service.
     *  Si le paramètre dédié à la mise en oeuvre du protocole JSONP (callback=xxx) n'est pas présent, il est rajouté par la fonction ;
     *  sa valeur est déterminée en fonction du paramètre callbackName.
     * @param {Number} [options.timeOut = 0] - Nombre de ms au bout duquel on considère que le service n'a pas répondu.
     *  Une valeur de 0 pour ce paramètre permet de désactiver la gestion du timeOut.
     * @param {String} [options.callbackSuffix = null] - Suffixe de la fonction de callback à rajouter sur l'URL.
     *  Si aucun suffixe n'est spécifié (cas par défaut), on utilisera l'identifiant this.uuid () comme suffixe. Ex: "callback1458574396582 ()"
     * @param {String} [options.callbackName = gp.protocol.jsonp] - Valeur du paramètre callback à rajouter sur l'URL.
     *  Si l'URL fournie contient déjà le paramètre callback, le paramètre callbackName ne sera pas pris en compte.
     *  La fonction de callback est créée dynamiquement par la fonction JSONP ;
     *  elle a deux fonctions :
     *    elle annule la condition de timeOut
     *    puis appelle la fonction fournie par l'utilisateur via le paramètre onResponse.
     * @param {Function} options.onResponse - Nom de la fonction qui sera appelée lors de la réception des résultats du service.
     *  Ce paramètre sera ignoré si l'URL contient déjà le paramètre callback.
     *  La fonction de rappel appelée sera alors celle ayant pour nom la valeur de ce paramètre.
     * @param {Function} [options.onTimeOut] - Nom de la fonction qui sera appelée en cas de non réponse du service.
     *  Le temps au bout duquel on considère que le service n'a pas répondu est déterminé par le paramètre timeOut.
     *  @example
     *  var options = {
     *      url : 'http://localhost/some/test.json&callback=myResults',
     *      timeOut : 100,
     *      callbackName : 'myResults',
     *      callbackSuffix : "",
     *      onResponse : function (response) {
     *          console.log('results : ', response);
     *      },
     *
     *   };
     *   JSONP.call(options);
     */
    call : function (options) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("JSONP");
        logger.trace("[JSONP::call ()]");

        // analyse parametres

        if (!options) {
            logger.error("missing parameter : options !");
            throw new Error("missing parameter : options !");
        }

        if (!options.url) {
            logger.error("missing parameter : options.url !");
            throw new Error("missing parameter : options.url !");
        }

        if (!options.timeOut) {
            logger.info("setting 'options.timeOut' default value");
            options.timeOut = 0;
        }

        // FIXME si un callback coté client a été mis en place,
        // cette condition sur cette methode n'a pas de sens !?
        if (!options.onResponse) {
            logger.error("missing parameter : options.onResponse !");
            throw new Error("missing parameter : options.onResponse !");
            // FIXME doit on definir un callback interne par defaut !?
            // options.onResponse = function (data) {
            //    console.log("response callback (inner) : ", data);
            // };
        }

        // ID du callback à utiliser : null ou string.
        // si l'utilisateur a spécifié un suffixe pour le callback, on le récupère comme un ID (ex: options.callbackSuffix = "")
        // sinon, on utilise un timestamp : this.uuid ()
        var callbackId = (typeof options.callbackSuffix === "string") ? options.callbackSuffix : this.uuid();

        // on recherche le parametre callback et son nom de fonction dans l'url
        var urlHasCallbackKey = false;
        var urlHasCallbackName = false;

        var idx = options.url.indexOf("callback=");

        if (idx !== -1) {
            urlHasCallbackKey = true;
            // extraction callbackName de l'url : entre "callback=" et "&" ou fin de ligne
            var j = options.url.indexOf("&", idx);
            if (j === -1) {
                j = options.url.length;
            }

            // on ecrase le parametre options.callbackName s'il avait été défini
            var callbackName = options.url.substring(idx + 9, j);

            if (callbackName) {
                urlHasCallbackName = true;
                options.callbackName = callbackName;
                logger.info("setting 'options.callbackName' value (" + options.callbackName + ") from 'options.url' parameter");
            }
        }

        // on ajoute le parametre callback dans l'URL s'il n'existe pas
        if (!urlHasCallbackKey) {
            // gestion des autres param. et "?"
            var k = options.url.indexOf("?");
            if (k === -1) {
                // aucun param., ni de '?'
                options.url = options.url + "?" + "callback=";
            } else if (k === options.url.length) {
                // uniquement le '?'
                options.url = options.url + "callback=";
            } else {
                // le '?' et les param. existent
                options.url = options.url + "&" + "callback=";
            }
            logger.info("setting callback default key in 'options.url' : " + options.url);
        }

        // utilisation de la fonction callback coté client ?
        var HasCallbackName = options.callbackName ? true : urlHasCallbackName;

        // on ajoute le nom de la fonction callback dans l'URL si elle n'existe pas
        if (!urlHasCallbackName) {
            // fonction callback par defaut
            if (!options.callbackName) {
                logger.info("setting 'options.callbackName' default value");
                options.callbackName = "callback"; // ou "gp.protocol.jsonp" ?
                // info : si on ne veut pas gerer d'ID dans le callback,
                // options.callbackSuffix = ""
                if (callbackId || callbackId === "") {
                    options.callbackName += callbackId;
                }
            }
            options.url = options.url.replace("callback=", "callback=" + options.callbackName);
            logger.info("setting callback function name in 'options.url' : " + options.url);
        }

        // timeOut par defaut
        if (!options.onTimeOut) {
            logger.info("setting 'options.onTimeOut' default value");
            /** callback timeout par defaut */
            options.onTimeOut = function (/* error */) {
                console.log("TimeOut while invoking url : " + options.url);
            };
        }

        if (!HasCallbackName) {
            var self = this;

            // event du timeout
            var onTimeOutTrigger = null;

            // declenche le timeout si > à 0 !
            if (options.timeOut > 0) {
                onTimeOutTrigger = window.setTimeout(
                    function () {
                        /** fonction de reponse du service */
                        window[options.callbackName] = function () {};
                        options.onTimeOut();
                        self._deleteScript(callbackId);
                    }, options.timeOut);
            }

            // FIXME le nom de la fonction n'accepte pas de namespace !
            // ex. Gp.Function.callback
            /**
            * fonction de reponse du service
            * @param {Object} data - data
            * @private
            */
            window[options.callbackName] = function (data) {
                window.clearTimeout(onTimeOutTrigger);
                options.onResponse(data);
                self._deleteScript(callbackId);
            };
        }

        this._createScript(callbackId, options.url);
    },

    /**
    * create Script
    * @param {String} callbackId - callback Id
    * @param {String} url - url
    * @private
    */
    _createScript : function (callbackId, url) {
        var scriptu;
        var scripto = document.getElementById("results" + callbackId);

        scriptu = document.createElement("script");
        scriptu.setAttribute("type", "text/javascript");
        scriptu.setAttribute("src", url);
        scriptu.setAttribute("charset", "UTF-8");
        scriptu.setAttribute("id", "results" + callbackId);
        scriptu.setAttribute("async", "true"); // FIXME async ?
        // head ou body ou autres ?
        var node = document.documentElement || document.getElementsByTagName("head")[0];
        if (scripto === null) {
            node.appendChild(scriptu);
        } else {
            // s'il existe déjà, on le remplace !
            node.replaceChild(scriptu, scripto);
        }
    },

    /**
    * delete Script
    * @param {String} callbackId - callback Id
    * @private
    */
    _deleteScript : function (callbackId) {
        var script = document.getElementById("results" + callbackId);
        if (script) {
            var node = script.parentNode || document.documentElement;
            if (!node) {
                return;
            }
            node.removeChild(script);
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (JSONP);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// cette classe contient les URLs par defaut des services.
//  DefaultUrlService.Alti.url(key)[elevation-json]
//  DefaultUrlService.Alti.url(key)[elevation-xml]
//  DefaultUrlService.Alti.url(key)[profil-json]
//  DefaultUrlService.Alti.url(key)[profil-xml]
//  DefaultUrlService.Alti.url(key)[wps]
//  DefaultUrlService.ProcessIsoCurve.url(key)
//  DefaultUrlService.AutoComplete.url(key)
//  DefaultUrlService.ReverseGeocode.url(key)
//  DefaultUrlService.AutoConf.url(key)[apiKey]
//  DefaultUrlService.AutoConf.url(key)[apiKeys]
//  DefaultUrlService.AutoConf.url(key)[aggregate]
//  DefaultUrlService.Geocode.url(key)
//  DefaultUrlService.Route.url(key)

// Example :
//
// DefaultUrlService.Alti.url('alti')[elevation-json]
//  output {String} -> http://wxs.ign.fr/calcul/alti/rest/elevation.json
//
// DefaultUrlService.Alti.url('calcul')
// output {Object|String}
// -> http://wxs.ign.fr/calcul/alti/rest/elevation.json
// -> http://wxs.ign.fr/calcul/alti/rest/elevation.xml
// -> http://wxs.ign.fr/calcul/alti/rest/elevationLine.json
// -> http://wxs.ign.fr/calcul/alti/rest/elevationLine.xml
// -> http://wxs.ign.fr/calcul/alti/wps
//
// ssl by default.
//
// Force to not do ssl :
// DefaultUrlService.ssl = false;
//
// DefaultUrlService.AutoComplete.url('calcul')
// output {Object|String}
// -> https://wxs.ign.fr/calcul/ols/apis/completion

// constantes internes
var HOSTNAME = "wxs.ign.fr";

/**
 * Default Geoportal web services URLs access.
 *
 * @namespace
 * @alias Gp.Services.DefaultUrl
 */
var DefaultUrlService = {

    /** if set true, require the use of https protocol */
    ssl : true,

    /**
    * base url of services (ssl protocol management)
    * @param {String} key - key
    * @param {String} path - path
    * @returns {String} url
    */
    url : function (key, path) {
        // comportement par défaut => https
        // sinon, il est fixé par l'option 'ssl' (false => http)
        var _protocol;
        if (DefaultUrlService.ssl === false) {
            _protocol = "http://";
        } else {
            _protocol = "https://";
        }

        return _protocol + HOSTNAME.concat("/", key, path);
    },

    /**
     * Elevation web service access
     *
     * @member {Object}
     * @property {Function} url (key) - Returns elevation service default urls with or without geoportal access key given as a parameter. The result is a javascript object with different urls given used protocols ("elevation-json", "elevation-xml", "profil-json" or "profil-xml").
     */
    Alti : {
        _key : {
            // rest
            "elevation-json" : "/alti/rest/elevation.json",
            "elevation-xml" : "/alti/rest/elevation.xml",
            "profil-json" : "/alti/rest/elevationLine.json",
            "profil-xml" : "/alti/rest/elevationLine.xml",
            // other
            wps : "/alti/wps"
        },
        /**
        * url
        * @param {String} key - key
        * @returns {String} url
        */
        url : function (key) {
            return {
                // rest
                "elevation-json" : DefaultUrlService.url(key, this._key["elevation-json"]),
                "elevation-xml" : DefaultUrlService.url(key, this._key["elevation-xml"]),
                "profil-json" : DefaultUrlService.url(key, this._key["profil-json"]),
                "profil-xml" : DefaultUrlService.url(key, this._key["profil-xml"]),
                // other
                wps : DefaultUrlService.url(key, this._key["wps"])
            };
        }
    },
    /**
     * IsoCurve web service access
     *
     * @member {Object}
     * @property {Function} url (key) - Returns isocurve service default urls with or without geoportal access key given as a parameter. The result is a javascript object with different urls given used protocols ("iso-json" or "iso-xml").
     */
    ProcessIsoCurve : {
        _key : "/geoportail/isochrone/rest/1.0.0/isochrone",
        /**
        * url
        * @param {String} key - key
        * @returns {String} url
        */
        url : function (key) {
            return DefaultUrlService.url(key, this._key);
        }
    },
    /**
     * Autocompletion web service access
     *
     * @member {Object}
     * @property {Function} url (key) - Returns autocomplete service default urls with or without geoportal access key given as a parameter. The result is a String.
     */
    AutoComplete : {
        _key : "/ols/apis/completion",
        /**
        * url
        * @param {String} key - key
        * @returns {String} url
        */
        url : function (key) {
            return DefaultUrlService.url(key, this._key);
        }
    },
    /**
     * Reverse geocoding web service access
     *
     * @member {Object}
     * @property {Function} url (key) - Returns reverse geocoding service default urls with or without geoportal access key given as a parameter. The result is a String.
     */
    ReverseGeocode : {
        _key : "/geoportail/ols",
        /**
        * url
        * @param {String} key - key
        * @returns {String} url
        */
        url : function (key) {
            return DefaultUrlService.url(key, this._key);
        }
    },
    /**
     * Autoconfiguration web service access
     *
     * @member {Object}
     * @property {Function} url ([key1,...]) - Returns autoconfiguration service default urls with geoportal access key (s) given as a String array parameter. The result is a javascript object with different urls given the access mode ("apiKey", "apiKeys" or "aggregate").
     */
    AutoConf : {
        _key : {
            apiKey : "/autoconf",
            apiKeys : "/autoconf?keys=%KEYS%",
            aggregate : "/autoconf/id/"
        },
        /**
        * url
        * @param {String} key - key
        * @returns {String} url
        */
        url : function (key) {
            var keys = "";
            if (Array.isArray(key) && key.length > 0) {
                keys = key[0];
                for (var i = 1; i < key.length; i++) {
                    keys += "," + key[i];
                }
            }
            return {
                apiKey : DefaultUrlService.url(key, this._key["apiKey"]), // une seule clé
                apiKeys : DefaultUrlService.url(key[0], this._key["apiKeys"]).replace("%KEYS%", keys), // autoconf de plusieurs clés
                aggregate : DefaultUrlService.url(key, this._key["aggregate"])
            };
        }
    },
    /**
     * Geocoding web service access
     *
     * @member {Object}
     * @property {Function} url (key) - Returns geocoding service default urls with or without geoportal access key given as a parameter. The result is a String.
     */
    Geocode : {
        _key : "/geoportail/ols",
        /**
        * url
        * @param {String} key - key
        * @returns {String} url
        */
        url : function (key) {
            return DefaultUrlService.url(key, this._key);
        }
    },
    /**
     * Routing web service access
     *
     * @member {Object}
     * @property {Function} url (key) - Returns routing service default urls with or without geoportal access key given as a parameter. The result is a javascript object with different urls given used protocols.
     */
    Route : {
        _key : "/geoportail/itineraire/rest/1.0.0/route",
        /**
        * url
        * @param {String} key - key
        * @returns {String} url
        */
        url : function (key) {
            return DefaultUrlService.url(key, this._key);
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (DefaultUrlService);


/***/ }),
/* 55 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"geoportal-access-lib@3.2.0\",\"_id\":\"geoportal-access-lib@3.2.0\",\"_inBundle\":false,\"_integrity\":\"sha512-914Yk0C3mnYI+X56Y40t4OJwBiZ1nEbW8D9Dse4WcS54Au8ZpkZ9Ep1efNYMxC5618zqn7r4VvzF58Xa+BqzEQ==\",\"_location\":\"/geoportal-access-lib\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"geoportal-access-lib@3.2.0\",\"name\":\"geoportal-access-lib\",\"escapedName\":\"geoportal-access-lib\",\"rawSpec\":\"3.2.0\",\"saveSpec\":null,\"fetchSpec\":\"3.2.0\"},\"_requiredBy\":[\"/\"],\"_resolved\":\"https://registry.npmjs.org/geoportal-access-lib/-/geoportal-access-lib-3.2.0.tgz\",\"_shasum\":\"7a707b75743f01b5465cc72d1316f13f8b87df7a\",\"_spec\":\"geoportal-access-lib@3.2.0\",\"_where\":\"/home/JPBazonnais/Projets/API/geoportal-extensions\",\"author\":{\"name\":\"IGNF\"},\"bugs\":{\"url\":\"https://github.com/IGNF/geoportal-access-lib/issues\"},\"bundleDependencies\":false,\"date\":\"04/10/2022\",\"dependencies\":{\"es6-promise\":\"^4.2.4\",\"node-fetch\":\"^2.6.1\",\"xmldom\":\"^0.1.27\"},\"deprecated\":false,\"description\":\"French Geoportal resources access library\",\"devDependencies\":{\"@babel/core\":\"^7.12.10\",\"@babel/plugin-transform-template-literals\":\"^7.12.1\",\"@babel/preset-env\":\"^7.12.11\",\"babel-loader\":\"^8.2.2\",\"chai\":\"^4.1.2\",\"clean-webpack-plugin\":\"^3.0.0\",\"copy-webpack-plugin\":\"^5.1.2\",\"eslint\":\"^7.18.0\",\"eslint-config-standard\":\"^16.0.2\",\"eslint-loader\":\"^4.0.2\",\"eslint-plugin-import\":\"^2.22.1\",\"eslint-plugin-node\":\"^11.1.0\",\"eslint-plugin-promise\":\"^4.2.1\",\"eslint-plugin-standard\":\"^5.0.0\",\"glob\":\"^7.1.2\",\"handlebars-layouts\":\"^3.1.4\",\"handlebars-webpack-plugin\":\"^1.4.1\",\"html-webpack-plugin\":\"^4.5.1\",\"istanbul-instrumenter-loader\":\"^3.0.1\",\"jsdoc-webpack-plugin\":\"^0.3.0\",\"loglevel\":\"^1.6.1\",\"mocha\":\"^7.2.0\",\"mocha-loader\":\"^5.1.5\",\"mocha-webpack\":\"^2.0.0-beta.0\",\"mochawesome\":\"^6.2.1\",\"nyc\":\"^15.1.0\",\"path\":\"^0.12.7\",\"replace-bundle-webpack-plugin\":\"^1.0.0\",\"sinon\":\"^9.2.4\",\"sinon-es6\":\"0.0.3\",\"speed-measure-webpack-plugin\":\"^1.4.2\",\"string-template\":\"^1.0.0\",\"terser-webpack-plugin\":\"^2.3.8\",\"webpack\":\"^4.46.0\",\"webpack-cli\":\"^3.3.12\",\"webpack-dev-server\":\"^3.11.2\",\"webpack-node-externals\":\"^2.5.2\",\"webpack-shell-plugin\":\"^0.5.0\"},\"homepage\":\"https://github.com/IGNF/geoportal-access-lib#readme\",\"keywords\":[\"geoportail\",\"webservice\",\"javascript\",\"es6\"],\"license\":\"CECILL-B\",\"main\":\"dist/GpServices-src.js\",\"module\":\"src/Gp.js\",\"name\":\"geoportal-access-lib\",\"nyc\":{\"include\":[\"src/**/*.js\"],\"instrument\":false,\"sourceMap\":false},\"optionalDependencies\":{},\"peerDependencies\":{},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/IGNF/geoportal-access-lib.git\"},\"scripts\":{\"build\":\"webpack --mode=none\",\"build:dev\":\"webpack --mode=development\",\"build:prod\":\"webpack --mode=production\",\"clean\":\"echo \\\"Warning: no yet implemented!\\\" && exit 0\",\"cover\":\"nyc --reporter=lcov --reporter=text npm run test\",\"doc\":\"npm run doc:serve\",\"doc:serve\":\"webpack-dev-server --content-base jsdoc --port 9001 --open\",\"eslint\":\"eslint src/\",\"sample\":\"npm run sample:serve\",\"sample:serve\":\"webpack-dev-server --mode=none --open-page samples/index-src.html --https --content-base . --output-public-path '/dist/' --port 9001 --open\",\"sample:serve:dev\":\"webpack-dev-server --mode=development --open-page samples/index-map.html --content-base . --output-public-path '/dist/' --port 9001 --open\",\"sample:serve:prod\":\"webpack-dev-server --mode=production --open-page samples/index-prod.html --content-base . --output-public-path '/dist/' --port 9001 --open\",\"setup\":\"npm install\",\"test\":\"mocha-webpack --reporter mochawesome --reporter-options reportDir=test-report,reportFilename=index --webpack-config ./test/webpack/webpack.test.js --glob \\\"test_*.js\\\" test/spec/\",\"test:end-to-end:serve\":\"webpack-dev-server --hot --config ./test/webpack/webpack.end-to-end.serve.js\",\"test:end-to-end:serve:docker\":\"webpack-dev-server --hot --config ./test/webpack/webpack.end-to-end.serve.docker.js\",\"test:serve\":\"webpack-dev-server --hot --config ./test/webpack/webpack.test.serve.js\",\"test:serve:docker\":\"webpack-dev-server --hot --config ./test/webpack/webpack.test.serve.docker.js\"},\"version\":\"3.2.0\"}");

/***/ }),
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);


/**
 * @module CheckRightManagement
 * @alias [private] CheckRightManagement
 * @description
 * ...
 *
 * @example
 * check();
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * Contrôle des droits sur les ressources.
   *
   * @function check
   * @param {Object} options - liste des options
   * @param {String} options.key - clef API
   * @param {Array} options.resources - liste des ressources
   * @param {Array} options.services - liste des services
   * @returns {Object} rightManagement - undefined ou {
   *       key : "",
   *       service-1 : [resource-1, resource-2],
   *       service-2 : [resource-1, resource-2]
   * }
   */
  check: function check(options) {
    // logger
    var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("checkrightmanagement"); // si aucune option n'est renseignée...

    if (!options) {
      // message orienté pour le developpeur !
      logger.error("WARNING : " + "no parameter specified !");
      return;
    } // les options


    var _key = options.key;

    var _resources = options.resources || [];

    var _services = options.services || []; // si aucune information sur les ressources,
    // il est impossible de controler quelquechose !!!


    if (_resources.length === 0) {
      // message orienté pour le developpeur !
      logger.error("WARNING : " + "no parameter 'resources' specified !");
      return;
    } // si aucune information sur les services,
    // il est impossible de controler quelquechose !!!


    if (_services.length === 0) {
      // message orienté pour le developpeur !
      logger.error("WARNING : " + "no parameter 'services' specified !");
      return;
    } // les ressources controlées :
    // Ex.
    // {
    //   "Itineraire"     : ["Pieton", "Voiture"],
    //   "Geocode"        : ["PositionOfInterest", "StreetAddress", "CadastralParcel"],
    //   "AutoCompletion" : ["PositionOfInterest", "StreetAddress", "CadastralParcel"],
    //   "Elevation"      : ["SERVICE_CALCUL_ALTIMETRIQUE_RSC"]
    // }


    var _rightManagement = {}; // la clef API n'est pas renseignée

    if (!_key) {
      // on verifie si l'autoconfiguration est disponible
      if (!_Config__WEBPACK_IMPORTED_MODULE_1__["default"].isConfigLoaded()) {
        // si l'autoconfiguration n'est pas chargée,
        // aucune vérification des droits est possible...
        logger.warn("WARNING : " + "The 'apiKey' parameter is missing, " + "and the contract key configuration has not been loaded, " + "so impossible to check yours rights !");
        return;
      } else {
        // si l'autoconfiguration est chargée,
        // on recupere la/les clef(s) API, et on en profitera ensuite pour controler
        // les droits sur les ressources.
        _key = Object.keys(_Config__WEBPACK_IMPORTED_MODULE_1__["default"].configuration.generalOptions.apiKeys);
        logger.log(_key);
      }
    } // on verifie si l'autoconfiguration est disponible


    if (!_Config__WEBPACK_IMPORTED_MODULE_1__["default"].isConfigLoaded()) {
      // si l'autoconfiguration n'est pas chargée,
      // il est toujours possible de requeter le service avec une clef API,
      // mais les droits sur les ressources ne sont pas garantis, on risque
      // d'obtenir des erreurs 403 forbidden...
      // la responsabilité revient à l'utilisateur (message d'information)...
      logger.warn("WARNING : " + "the contract key configuration has not been loaded, " + "so be carefull !"); // les ressouces non controlées

      var _noRightManagement = {};

      for (var i = 0; i < _services.length; i++) {
        var service = _services[i];
        _noRightManagement[service] = [];

        for (var j = 0; j < _resources.length; j++) {
          var resource = _resources[j];

          _noRightManagement[service].push(resource);
        }
      } // on ajoute la clef


      _noRightManagement.key = _key;
      logger.log("right management not checked", _noRightManagement);
      return _noRightManagement;
    } else {
      // si l'autoconf est chargée,
      // on verifie la correspondance entre la clef et l'autoconfiguration,
      // on previent l'utilisateur (message d'information) s'il n'a
      // pas de droits sur certaines ressources ...
      // doit on ecarter les ressources sans droit ?
      // oui, si possible avec un message d'information pour l'utilisateur...
      for (var k = 0; k < _resources.length; k++) {
        var _resource = _resources[k];

        for (var l = 0; l < _services.length; l++) {
          var _service = _services[l];
          var params = _Config__WEBPACK_IMPORTED_MODULE_1__["default"].getServiceParams(_resource, _service, _key);

          if (!params || Object.keys(params).length === 0) {
            logger.warn("WARNING : " + "The contract key configuration has no rights to load this geoportal " + "resource (" + _resource + ") " + "for this service (" + _service + ") ");
            continue;
          }

          if (!_rightManagement[_service]) {
            _rightManagement[_service] = [];
          }

          _rightManagement[_service].push(_resource);
        }
      }

      if (Object.keys(_rightManagement).length === 0) {
        logger.warn("WARNING : " + "The contract key configuration has been loaded, " + "and the 'apiKey' parameter has been set, " + "but, there is a problem on the mapping between the contract and the key !");
        return;
      } // on ajoute la clef qui correspond à la ressource vérifiée


      _rightManagement.key = params.key;
      logger.log("right management checked", _rightManagement);
      return _rightManagement;
    }
  }
});

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);

var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("config");
/**
 * @module Config
 * @alias [private] Config
 * @description
 * ...
 *
 * @example
 * isConfigLoaded();
 * getLayerId();
 * getLayerParams();
 * getServiceParams();
 * getResolutions();
 * getGlobalConstraints();
 * getTileMatrix();
 */

var Config = {
  /**
   * autoconf
   *
   * @public
   * @type {Object}
   */
  configuration: null,

  /**
   * Controle du chargement de l'autoconf
   *
   * @function isConfigLoaded
   * @this Config
   * @public
   * @returns {Boolean} True si l'autoconf a déjà été chargée, False sinon.
   */
  isConfigLoaded: function isConfigLoaded() {
    var scope = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};

    if (scope.Gp && scope.Gp.Config && Object.keys(scope.Gp.Config).length !== 0) {
      /** ts-syntax */
      this.configuration = scope.Gp.Config;
      return true;
    }

    return false;
  },

  /**
   * Recuperation de l'identifiant d'une couche donnée
   *
   * @function getLayerId
   * @public
   * @param {String} layerName - nom de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS")
   * @param {String} service   - nom du service (par ex. "WMS" ou "WMTS")
   * @returns {String} Identifiant de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS$GEOPORTAIL:OGC:WMTS")
   */
  getLayerId: function getLayerId(layerName, service) {
    var layerId = null; // layer
    // key : [layerName]$[contexte]:OGC:[service]
    // ex : "ORTHOIMAGERY.ORTHOPHOTOS$GEOPORTAIL:OGC:WMTS"
    // service
    // key : [layerName]$[contexte];[service]
    // ex : PositionOfInterest$OGC:OPENLS;ReverseGeocode

    if (this.configuration) {
      var layers = this.configuration["layers"];

      for (var key in layers) {
        if (layers.hasOwnProperty(key)) {
          var parts = key.split("$");

          if (layerName === parts[0]) {
            if (parts[1]) {
              var servicePartsLayer = parts[1].split(":");
              var servicePartsService = parts[1].split(";");

              if (servicePartsService[1] === service) {
                layerId = key;
                break;
              }

              if (servicePartsLayer[2] === service) {
                layerId = key;
                break;
              }
            }
          }
        }
      }
    }

    if (!layerId) {
      logger.error("ERROR layer id (layer name: " + layerName + " / service: " + service + ") was not found !?");
    }

    return layerId;
  },

  /**
   * Récupération des paramètres nécessaires à l'affichage d'une couche WMS ou WMTS
   *
   * @function getLayerParams
   * @public
   * @param {String} layerName - nom de la couche (par ex. "ORTHOIMAGERY.ORTHOPHOTOS")
   * @param {String} service   - nom du service (par ex. "WMS" ou "WMTS")
   * @param {String} [apiKey]  - Clé de contrat API
   * @returns {Object} params  - paramètres du service (WMS ou WMTS) pour la couche donnée
   * @returns {String} params.url        - Url du service à requêter pour afficher la couche
   * @returns {String} params.version    - Version du service
   * @returns {String} params.styles     - Style par défaut de la couche
   * @returns {String} params.format     - Format par défaut de la couche
   * @returns {String} params.projection - Projection par défaut de la couche
   * @returns {Number} params.minScale   - Dénominateur d'échelle minimum de la couche
   * @returns {Number} params.maxScale   - Dénominateur d'échelle maximum de la couche
   * @returns {Gp.BBox} params.extent    - Etendue de la couche, dans la projection de la couche
   * @returns {Array} params.legends     - Tableau des légendes associées à la couche
   * @returns {Array} params.metadata    - Tableau des métadonnées associées à la couche
   * @returns {Array} params.originators - Tableau des originators associés à la couche
   * @returns {Array} params.title       - Nom de la resource, lisible par un humain.
   * @returns {Array} params.description - Url de l'image d'aperçu rapide de la ressource.
   * @returns {Array} params.quicklookUrl- Tableau des originators associés à la couche
   * @returns {String} params.[TMSLink]          - Identifiant de la pyramide (TMS), dans le cas d'une couche WMTS
   * @returns {Gp.Point} params.[matrixOrigin]   - Origine de la matrice (top left corner), dans le cas d'une couche WMTS
   * @returns {Array} params.[nativeResolutions] - Tableau regroupant les résolutions de chaque niveau de la matrice, dans le cas d'une couche WMTS
   * @returns {Array} params.[matrixIds]         - Tableau regroupant les identifiants de chaque niveau de la matrice, dans le cas d'une couche WMTS
   */
  getLayerParams: function getLayerParams(layerName, service, apiKey) {
    var params = {};

    if (this.configuration) {
      // récupération de l'identifiant complet de la couche.
      var layerId = this.getLayerId(layerName, service);

      if (layerId) {
        // récupération de l'objet de configuration de la couche
        var layerConf = this.configuration.layers[layerId]; // controle de la clef

        var key = layerConf.apiKeys[0];

        if (apiKey) {
          if (apiKey !== key) {
            logger.error("ERROR different keys (" + apiKey + " !== " + key + ") !?");
            return;
          }
        }

        apiKey = apiKey || key;
        params.key = apiKey; // récupération des paramètres du service

        params.url = layerConf.getServerUrl(apiKey);
        params.version = layerConf.getServiceParams().version;
        params.styles = layerConf.getDefaultStyle();
        params.format = layerConf.getDefaultFormat();
        params.projection = layerConf.getDefaultProjection(); // récupération des infos de la couche

        params.minScale = layerConf.getMinScaleDenominator();
        params.maxScale = layerConf.getMaxScaleDenominator();
        params.extent = layerConf.getBBOX();
        params.legends = layerConf.getLegends();
        params.metadata = layerConf.getMetadata();
        params.originators = layerConf.getOriginators();
        params.title = layerConf.getTitle();
        params.description = layerConf.getDescription();
        params.quicklookUrl = layerConf.getQuicklookUrl(); // WMTS : récupération des tileMatrixSetLimits

        if (layerConf.wmtsOptions) {
          params.tileMatrixSetLimits = layerConf.wmtsOptions.tileMatrixSetLimits;
        } // WMTS : récupération des paramètres de la pyramide (TMS)


        var TMSLink = layerConf.getTMSID();

        if (TMSLink) {
          params.TMSLink = TMSLink;
          var tmsConf = this.configuration.getTMSConf(TMSLink); // Get matrix origin : Gp.Point = Object{x:Float, y:Float}

          params.matrixOrigin = tmsConf.getTopLeftCorner();
          params.nativeResolutions = tmsConf.nativeResolutions;
          params.matrixIds = tmsConf.matrixIds;
          params.tileMatrices = tmsConf.tileMatrices;
        }
      }
    }

    return params;
  },

  /**
   * Recuperation des parametres d'un service
   *
   * @function getServiceParams
   * @public
   * @param {String} [resource] - "PositionOfInterest", "StreetAddress", "Voiture", "Pieton", ...
   * @param {String} [service] - Geocode, Itineraire, ...
   * @param {Array} [apiKeys]  - Clé(s) de contrat API
   * @returns {Object} params - paramètres de la ressource
   * @returns {String} params. -
   * @returns {String} params. -
   * @returns {String} params. -
   */
  getServiceParams: function getServiceParams(resource, service, apiKeys) {
    var params = {};

    if (this.configuration) {
      // récupération de l'identifiant complet de la couche.
      var layerId = this.getLayerId(resource, service);

      if (layerId) {
        // récupération de l'objet de configuration de la couche
        var layerConf = this.configuration.layers[layerId]; // controle de la clef (on prend la première clé disponible qui est censée avoir accès à la ressource)

        var key = layerConf.apiKeys[0];

        if (apiKeys) {
          if (!Array.isArray(apiKeys)) {
            apiKeys = [apiKeys];
          }

          for (var i = 0; i < apiKeys.length; i++) {
            if (apiKeys[i] === key) {
              var keyIndex = i;
              break;
            }
          } // si aucune clé du tableau apiKeys ne correspond, on retourne rien => pas de droits pour la ressource


          if (typeof keyIndex === "undefined") {
            return;
          }
        } // on retourne la première clé qui a effectivement accès à la ressource


        var apiKey = apiKeys[keyIndex] || key;
        params.key = apiKey; // récupération des paramètres du service

        params.url = layerConf.getServerUrl(apiKey);
        params.version = layerConf.getServiceParams().version; // récupération des infos de la couche

        params.extent = layerConf.getBBOX();
        params.title = layerConf.getTitle();
        params.description = layerConf.getDescription();
      }
    }

    return params;
  },

  /**
   * Resolution en geographique
   *
   * @function getResolutions
   * @public
   * @returns {Array} resolutions
   */
  getResolutions: function getResolutions() {
    var resolutions = [];

    if (this.configuration) {
      resolutions = this.configuration["generalOptions"]["wgs84Resolutions"];
    }

    return resolutions;
  },

  /**
   * Recuperation des parametres TMS de la configuration
   *
   * @function getTileMatrix
   * @public
   * @param {String} tmsName - tile matrix set name
   * @returns {Object} tile matrix set
   */
  getTileMatrix: function getTileMatrix(tmsName) {
    var tms = {};

    if (this.configuration) {
      if (tmsName) {
        tms = this.configuration["tileMatrixSets"][tmsName.toUpperCase()];
      }
    }

    return tms;
  },

  /**
   * Récupération des contraintes générales d'une couche donnée : extent, minScale, maxScale, projection
   *
   * @function getGlobalConstraints
   * @public
   * @param {String} layerId - identifiant de la couche
   * @returns {Object} params - contraintes de la couche
   * @returns {String} params.projection - Projection par défaut de la couche
   * @returns {Number} params.minScale   - Dénominateur d'échelle minimum de la couche
   * @returns {Number} params.maxScale   - Dénominateur d'échelle maximum de la couche
   * @returns {Gp.BBox} params.extent    - Etendue de la couche, dans la projection de la couche
   */
  getGlobalConstraints: function getGlobalConstraints(layerId) {
    var params = {};

    if (layerId) {
      // récupération de l'objet de configuration de la couche
      var layerConf = this.configuration.layers[layerId];
      params.projection = layerConf.getDefaultProjection();
      params.minScale = layerConf.getMinScaleDenominator();
      params.maxScale = layerConf.getMaxScaleDenominator();
      params.extent = layerConf.getBBOX();
    }

    return params;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Config);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(50)))

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var geoportal_access_lib_src_Services_AutoComplete_AutoComplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
/* harmony import */ var geoportal_access_lib_src_Services_Geocode_ReverseGeocode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Common_CSS_GPlocation_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _Common_CSS_GPlocation_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GPlocation_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _CSS_Controls_LocationSelector_GPlocationLeaflet_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25);
/* harmony import */ var _CSS_Controls_LocationSelector_GPlocationLeaflet_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_CSS_Controls_LocationSelector_GPlocationLeaflet_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34);
/* harmony import */ var _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(60);
/* harmony import */ var _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(36);
/* harmony import */ var _Common_Controls_LocationSelectorDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(75);
/* harmony import */ var _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(77);
/* harmony import */ var _Utils_IconDefault__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(78);
/* harmony import */ var _Common_Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(76);














var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_7__["default"].getLogger("locationselector");
/**
* @classdesc
*
* LocationSelector Control.
*
* @private
* @constructor LocationSelector
* @alias LocationSelector
* @extends {L.Control}
* LocationSelector component. Enables to select a location, using autocompletion or picking location on the map
* @param {Object} [options] - component options
* @param {Boolean} [options.displayInfo = true] - whether to display info in a popup or not (not implemented yet) Default is true
* @param {Boolean} [options.disableReverse = false] - whether to enable/disable the reverse geocoding.
* @param {Object} [options.tag] - tag options
* @param {Number} [options.tag.id = 0] - order id number in a locations group, in case several LocationSelector are used. For instance in route case : departure tag id should be 0, arrival tag id should be 1, and other ones : 2, 3, ...
* @param {Number} [options.tag.unique = null] - locationSelector global component id (in case locationSelector is called by another graphic component, e.g. route control)
* @param {String} [options.tag.label = ">"] - text to display in component (e.g. "Departure"). Default is ">"
* @param {String} [options.tag.color = blue] - color of marker (blue, green, orange and red)
* @param {Boolean} [options.tag.display = true] - whether to display or hide component. Default is true
* @param {Boolean} [options.tag.addOption = false] - whether to display picto to add another LocationSelector (in case of route control)
* @param {Boolean} [options.tag.removeOption = false] - whether to display picto to remove a LocationSelector (in case of route control)
* @param {Object} [options.autocompleteOptions] - autocomplete service options
* @param {Object} [options.reverseGeocodeOptions] - reverse geocoding service options

* @example
*  var point = L.geoportalControl.LocationSelector({
*  });
*/

var LocationSelector = leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Control.extend(
/** @lends LocationSelector.prototype */
{
  includes: _Common_Controls_LocationSelectorDOM__WEBPACK_IMPORTED_MODULE_10__["default"],

  /**
   * options by default
   *
   * @private
   */
  options: {
    position: "topleft",
    tag: {
      id: 0,
      // numero d'ordre sur un groupe de locations !
      unique: null,
      // numero unique pour tous les locations d'un groupe !
      label: ">",
      color: "blue",
      display: true,
      addOption: false,
      removeOption: false
    },
    disableReverse: false,
    // on l'active par defaut !
    displayInfo: true,
    autocompleteOptions: {},
    reverseGeocodeOptions: {}
  },

  /**
   * constructor
   * (extend to L.Control)
   *
   * @param {Object} options - options of component
   * @param {String}  [options.position] - position of component into a map.
   * @param {Object}  [options.tag] - options ...
   * @param {Object}  [options.autocompleteOptions] - autocomplete service options
   * @param {Object}  [options.reverseGeocodeOptions] - reverse geocoding service options
   *
   * @private
   */
  initialize: function initialize(options) {
    // FIXME pb de merge sur tag:{} !?
    // on transmet les options au controle
    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.setOptions(this, options);
    /** uuid */

    this._uid = this.options.tag.unique || null;
    /** mode drag&drop */

    this._activeDragAndDrop = false;
    this._pressedKeyOnDragAndDrop = false;
    /** container map */

    this._map = null;
    /** container principal des entrées  */

    this._inputsContainer = null;
    /** container du label du point */

    this._inputLabelContainer = null;
    /** container de la saisi de l'autocompletion */

    this._inputAutoCompleteContainer = null;
    /** container du pointer de saisi sur la carte */

    this._inputShowPointerContainer = null;
    /** container des coordonnées */

    this._inputCoordinateContainer = null;
    /**
     * coordonnées du point selectionné
     * Ces dernieres sont envoyées à l'API service IGN,
     */

    this._coordinate = null;
    /** container des reponses de l'autocompletion */

    this._suggestedContainer = null;
    /** listes des reponses de l'autocompletion */

    this._suggestedLocations = [];
    /** localisant */

    this._currentLocation = null;
    /** marker */

    this._marker = null;
    /** ressources du services d'autocompletion et geocodage inverse (ayant droit!) */

    this._resources = {};
    /** a t on des droits sur les ressources du service ? */

    this._noRightManagement = false; // gestion des droits sur les ressources/services

    this._checkRightsManagement(); // creation du DOM dans le constructeur uniquement si ce composant
    // est appelé par un autre composant graphique


    this._container = this._uid ? this._initLayout() : null;
  },
  // ################################################################### //
  // ################## handlers for display graphic ################### //
  // ################################################################### //

  /**
   * this method is called by this.addTo(map)
   * and fills variable : this._container = this.onAdd(map)
   *
   * @returns {DOMElement} DOM element
   * @private
   */
  onAdd: function
    /* map */
  onAdd() {
    // si on ajout ce composant à la carte en tant que objet graphique,
    // un uuid doit être generé automatiquement !
    this._uid = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_9__["default"].generate(); // DOM du composant

    var container = this._initLayout(); // deactivate of events that may interfere with the map


    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.DomEvent.disableClickPropagation(container).disableScrollPropagation(container);
    return container;
  },

  /**
   * this method is called when the control is removed from the map
   * and removes events on map.
   *
   * @private
   */
  onRemove: function
    /* map */
  onRemove() {},
  // ################################################################### //
  // ########################## publics methods ######################## //
  // ################################################################### //

  /**
   * get coordinate
   * @returns {Object} Coordinate
   */
  getCoordinate: function getCoordinate() {
    return this._coordinate;
  },

  /**
   * set coordinate : {lon,lat || x,y || N,E}
   * @param {Object} coordinate - Coordinate
   */
  setCoordinate: function setCoordinate(coordinate) {
    this._displayResultOfCoordinate(coordinate);
  },

  /**
   * set map
   *
   * @param {Object} map - the map
   */
  setMap: function setMap(map) {
    if (!this._map) {
      this._map = map;
    }
  },

  /**
   * clean
   */
  clear: function clear() {
    this._setCursor();

    this._setMarker();

    this._clearResults();

    this._inputLabelContainer.click();
  },

  /**
   * disable/enable the drag&drop mode
   *
   * @param {Boolean} active - true:enable | false:disable
   */
  dragging: function dragging(active) {
    if (this._marker) {
      if (active) {
        this._marker.dragging.enable();
      } else {
        this._marker.dragging.disable();
      }
    }
  },
  // ################################################################### //
  // ########################## pivates methods ######################## //
  // ################################################################### //

  /**
   * this method is called by this.onAdd(map)
   * and initialize the container HTMLElement
   *
   * @returns {DOMElement} DOM element
   *
   * @private
   */
  _initLayout: function _initLayout() {
    var id = this.options.tag.id; // create main container

    var container = this._createMainContainerElement();

    var inputs = this._inputsContainer = this._createLocationPointElement(id, this.options.tag.display);

    container.appendChild(inputs);

    var _inputLabel = this._inputLabelContainer = this._createLocationPointLabelElement(id, this.options.tag.label);

    inputs.appendChild(_inputLabel);

    var _inputAutoComplete = this._inputAutoCompleteContainer = this._createLocationAutoCompleteteInputElement(id);

    inputs.appendChild(_inputAutoComplete);

    var _inputCoordinate = this._inputCoordinateContainer = this._createLocationCoordinateInputElement(id);

    inputs.appendChild(_inputCoordinate);

    var _inputShowPointer = this._inputShowPointerContainer = this._createLocationPointerShowInputElement(id);

    inputs.appendChild(_inputShowPointer);

    var _inputPointer = this._createLocationPointerInputElement(id);

    inputs.appendChild(_inputPointer);

    if (this.options.tag.addOption) {
      var _inputAddStage = this._createLocationAddPointElement();

      inputs.appendChild(_inputAddStage);
    }

    if (this.options.tag.removeOption) {
      var _inputRemoveStage = this._createLocationRemovePointElement(id);

      inputs.appendChild(_inputRemoveStage);
    }

    var results = this._suggestedContainer = this._createLocationAutoCompleteResultElement(id);

    container.appendChild(results);
    return container;
  },

  /**
   * this method is called by constructor
   * and check the rights to resources and services
   *
   * @private
   */
  _checkRightsManagement: function _checkRightsManagement() {
    var _resources = null;
    var _key = null; // les ressources du service du calcul inverse de geocodage

    _key = this.options.reverseGeocodeOptions.apiKey;
    _resources = this.options.reverseGeocodeOptions.index ? this.options.reverseGeocodeOptions.index : "";

    if (!_resources) {
      _resources = "StreetAddress";
    }

    if (_resources === "location") {
      _resources = ["StreetAddress", "PositionOfInterest", "CadastralParcel"];
    } else {
      if (!Array.isArray(_resources)) _resources = [_resources];
    }

    var rightManagementRerverse = _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_8__["default"].check({
      key: _key || this.options.apiKey,
      resources: _resources,
      services: ["ReverseGeocode"]
    }); // les ressources du service d'autocompletion

    _key = this.options.autocompleteOptions.apiKey;
    _resources = this.options.autocompleteOptions.type ? this.options.autocompleteOptions.type : []; // ou celles par défaut sinon.

    if (!_resources || _resources.length === 0) {
      _resources = ["StreetAddress", "PositionOfInterest"];
    }

    var rightManagementAutoComplete = _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_8__["default"].check({
      key: _key || this.options.apiKey,
      resources: _resources,
      services: ["AutoCompletion"]
    }); // au cas où pas de droit !

    if (!rightManagementRerverse && !rightManagementAutoComplete) {
      this._noRightManagement = true;
    } // FIXME je reconstruis differement la structure pour la gestion des clefs differentes
    // pour chaque service...


    if (rightManagementAutoComplete) {
      this._resources["AutoCompletion"] = {};
      this._resources["AutoCompletion"]["resources"] = rightManagementAutoComplete["AutoCompletion"];
      this._resources["AutoCompletion"]["key"] = rightManagementAutoComplete["key"];
    }

    if (rightManagementRerverse) {
      this._resources["ReverseGeocode"] = {};
      this._resources["ReverseGeocode"]["resources"] = rightManagementRerverse["ReverseGeocode"];
      this._resources["ReverseGeocode"]["key"] = rightManagementRerverse["key"];
    }
  },
  // ################################################################### //
  // ################# privates methods use by events ################## //
  // ################################################################### //

  /**
   * this sends the label to the panel.
   *
   * @param {String} label - label suggested location
   *
   * @private
   */
  _setLabel: function _setLabel(label) {
    this._inputAutoCompleteContainer.value = label || "";
  },

  /**
   * this sends the coordinates to the panel.
   *
   * @param {Object} oLatLng - geographic coordinate (L.LatLng)
   *
   * @private
   */
  _setCoordinate: function _setCoordinate(oLatLng) {
    // structure
    // L.LatLng
    //     lat: 4.07249425916745
    //     lng: 2.4609375
    // FIXME les coordonnées en lat/lon sur du EPSG:4326 !
    // Mais règle sur les services : X -> LON et Y -> LAT
    this._coordinate = oLatLng;
    var lat = null;
    var lng = null; // decimal by default !

    lat = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].roundToDecimal(oLatLng.lat, 4);
    lng = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].roundToDecimal(oLatLng.lng, 4); // on envoie du lon/lat à l'affichage

    var value = lng + " , " + lat;
    this.GPdisplayCoordinate(value);
  },

  /**
   * this method is called by this.on*ResultsItemClick()
   * and move/zoom on a position.
   *
   * @param {Object} position - {lon: ..., lat: ...}
   *
   * @private
   */
  _setPosition: function _setPosition(position) {
    logger.log("_setPosition()", position);
    var map = this._map; // TODO zoom
    // map.setZoomAround(L.latLng(position), map.getMaxZoom(), true);
    // FIXME on veut du lat/lon sur Leaflet donc on inverse !

    map.panTo(leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.latLng(position));
  },

  /**
   * this method is called by this.on*ResultsItemClick()
   * and displays a marker.
   * FIXME : marker IGN et informations ?
   *
   * @param {Object} position - position {lon: ..., lat: ...}
   * @param {Object|String} information - suggested or geocoded information
   * @param {Boolean} display - display a popup information
   *
   * @private
   */
  _setMarker: function _setMarker(position, information, display) {
    logger.log("_setMarker()", position, information, display); // sur du drag&drop, on garde le même marker !

    if (this._activeDragAndDrop) {
      return;
    }

    var map = this._map; // on supprime le marker, ainsi que les events
    // sur le drag&drop

    if (this._marker != null) {
      this._marker.off("mousedown", this.onMouseDownMarker, this);

      this._marker.off("dragstart", this.onStartDragMarker, this);

      this._marker.off("drag", this.onDragMarker, this);

      this._marker.off("dragend", this.onEndDragMarker, this);

      map.removeLayer(this._marker);
      this._marker = null;
    }

    if (position) {
      // cf. http://leafletjs.com/reference.html#marker-options
      var options = {
        icon: new _Utils_IconDefault__WEBPACK_IMPORTED_MODULE_12__["default"](this.options.tag.color),
        draggable: true,
        clickable: true,
        zIndexOffset: 1000
      }; // FIXME on veut du lat/lon sur Leaflet donc on inverse !

      this._marker = leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.marker(leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.latLng(position), options);

      this._marker.on("mousedown", this.onMouseDownMarker, this);

      this._marker.on("dragstart", this.onStartDragMarker, this);

      this._marker.on("drag", this.onDragMarker, this);

      this._marker.on("dragend", this.onEndDragMarker, this); // this._marker.on("movestart", this.onStartMoveMarker, this);
      // this._marker.on("move",      this.onMoveMarker, this);
      // this._marker.on("moveend",   this.onEndMoveMarker, this);


      this._marker.addTo(map); // FIXME
      // doit on mettre une information
      // - correctement construite ?
      // - uniquement informatif ?
      // - RIEN ?


      if (display) {
        var popupContent = null;

        if (typeof information !== "string") {
          if (information.service === "GeocodedLocation") {
            popupContent = _Common_Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_13__["default"].getGeocodedLocationFreeform(information.location);
          } else if (information.service === "SuggestedLocation") {
            popupContent = _Common_Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_13__["default"].getSuggestedLocationFreeform(information.location);
          } else {
            popupContent = "sans informations.";
          }
        } else {
          popupContent = information;
        }

        this._marker.bindPopup(popupContent);
      }
    }
  },

  /**
   * this method is called by this.on()
   * and change the cursor of the map when entering a point.
   *
   * @param {String} cursor - cursor style
   *
   * @private
   */
  _setCursor: function _setCursor(cursor) {
    var div = this._map.getContainer();

    if (cursor) {
      div.style.cursor = cursor;
    } else {
      div.style.cursor = null;
    }
  },

  /**
   * this method is called by this.()
   * and it clears all results and the marker.
   *
   * @private
   */
  _clearResults: function _clearResults() {
    this._currentLocation = null;
    this._coordinate = null;

    this._clearSuggestedLocation();
  },

  /**
   * this method is called by this.onAutoCompleteSearchText()
   * and it clears all suggested location.
   *
   * @private
   */
  _clearSuggestedLocation: function _clearSuggestedLocation() {
    // suppression du dom
    this._suggestedLocations = [];

    if (this._suggestedContainer) {
      while (this._suggestedContainer.firstChild) {
        this._suggestedContainer.removeChild(this._suggestedContainer.firstChild);
      }
    }
  },
  // ################################################################### //
  // ############## privates methods use by autocomplete ############### //
  // ################################################################### //

  /**
   * this method is called by this.onAutoCompleteSearch()
   * and executes a request to the service.
   *
   * @param {Object} settings - service settings
   * @param {String}   settings.text - text
   * @param {Function} settings.onSuccess - callback
   * @param {Function} settings.onFailure - callback
   *
   * @private
   */
  _requestAutoComplete: function _requestAutoComplete(settings) {
    logger.log("_requestAutoComplete()", settings); // on ne fait pas de requête si on n'a pas renseigné de parametres !

    if (!settings || Object.keys(settings).length === 0) {
      return;
    } // on ne fait pas de requête si la parametre 'text' est vide !


    if (!settings.text) {
      return;
    }

    logger.log(settings); // on ne fait pas de requête si aucun droit !

    if (this._noRightManagement) {
      logger.log("no rights for all service !?");
      return;
    } // gestion des droits !


    if (!this._resources["AutoCompletion"]) {
      logger.log("no rights for this service !?");
      return;
    }

    var resources = this._resources["AutoCompletion"].resources;

    if (!resources || Object.keys(resources).length === 0) {
      return;
    } // gestion de la clef !


    var key = this._resources["AutoCompletion"]["key"];
    var options = {}; // on recupere les options du service

    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.extend(options, this.options.autocompleteOptions); // ainsi que la recherche et les callbacks

    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.extend(options, settings); // cas où la clef API n'est pas renseignée dans les options du service,
    // on utilise celle de l'autoconf ou celle renseignée au niveau du controle

    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.extend(options, {
      apiKey: options.apiKey || this.options.apiKey || key
    });
    logger.log(options);
    var autoCompleteService = new geoportal_access_lib_src_Services_AutoComplete_AutoComplete__WEBPACK_IMPORTED_MODULE_0__["default"](options);
    autoCompleteService.call();
  },

  /**
   * this method is called by this.onAutoCompleteSearchText()
   * and fills the container of the location list.
   * it creates a HTML Element per location
   * (cf. this. ...)
   *
   * @param {Object[]} locations - locations
   *
   * @private
   */
  _fillAutoCompletedLocationListContainer: function _fillAutoCompletedLocationListContainer(locations) {
    logger.log("_fillAutoCompletedLocationListContainer()", locations);

    if (!locations || locations.length === 0) {
      return;
    } // on vide la liste avant de la construire


    var element = this._suggestedContainer;

    if (element.childElementCount) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }

    for (var i = 0; i < locations.length; i++) {
      // Proposals are dynamically filled in Javascript by autocomplete service
      this._createLocationAutoCompletedLocationElement(this.options.tag.id, locations[i], i);
    } // sauvegarde de l'etat des locations


    this._suggestedLocations = locations;
  },
  // ################################################################### //
  // ################# privates methods use by reverse ################# //
  // ################################################################### //

  /**
   * this method is called by this.onMouseMapClick() or this.onEndDragMarker()
   * and executes a request to the service.
   *
   * @param {Object} settings - service settings
   * @param {String}   settings.position - position
   * @param {Function} settings.onSuccess - callback
   * @param {Function} settings.onFailure - callback
   *
   * @private
   */
  _requestReverseGeocode: function _requestReverseGeocode(settings) {
    logger.log("_requestReverseGeocode()", settings); // on ne fait pas de requête si on n'a pas renseigné de parametres !

    if (!settings || Object.keys(settings).length === 0) {
      return;
    } // on ne fait pas de requête si la parametre 'position' est vide !


    if (!settings.searchGeometry || Object.keys(settings.searchGeometry).length === 0) {
      return;
    } // on ne fait pas de requête si aucun droit !


    if (this._noRightManagement) {
      logger.log("no rights for all service !?");
      return;
    } // gestion des droits !


    if (!this._resources["ReverseGeocode"]) {
      logger.log("no rights for this service !?");
      return;
    }

    var resources = this._resources["ReverseGeocode"].resources;

    if (!resources || Object.keys(resources).length === 0) {
      return;
    } // gestion de la clef !


    var key = this._resources["ReverseGeocode"]["key"];
    var options = {}; // on recupere les options du service

    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.extend(options, this.options.reverseGeocodeOptions); // ainsi que la positions et les callbacks

    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.extend(options, settings); // on force qq options !
    // La table de geocodage est toujours par defaut : StreetAddress !

    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.extend(options, {
      returnFreeForm: true,
      // FIXME cette option n'est pas implementée !?
      index: "StreetAddress"
    }); // cas où la clef API n'est pas renseignée dans les options du service,
    // on utilise celle de l'autoconf ou celle renseignée au niveau du controle

    leaflet__WEBPACK_IMPORTED_MODULE_2___default.a.Util.extend(options, {
      apiKey: options.apiKey || this.options.apiKey || key
    });
    logger.log(options);
    var reverseGeocodeService = new geoportal_access_lib_src_Services_Geocode_ReverseGeocode__WEBPACK_IMPORTED_MODULE_1__["default"](options);
    reverseGeocodeService.call();
  },

  /**
   * display Coordinate on panel, and places the marker on map
   *
   * @param {Object} oLatLng - geographic coordinate (L.LatLng)
   * @private
   */
  _displayResultOfCoordinate: function _displayResultOfCoordinate(oLatLng) {
    // on transmet les coordonnées au panneau
    this._setCoordinate(oLatLng); // on met en place le marker


    this._setMarker(oLatLng, null, false);

    logger.log(this.getCoordinate()); // on desactive l'event sur la map en activant le gestionnaire !

    this.onActivateMapPointClick();
  },

  /**
   * display Label on panel, and places the marker on map
   *
   * @param {Object} oLocation - location Object
   * @private
   */
  _displayResultOfLabel: function _displayResultOfLabel(oLocation) {
    // FIXME Le service est intérrogé en SRS EPSG:4326 par defaut,
    // donc on récupère du lat/lon en reponse.
    // mais on inverse car on souhaite transmettre des coordonnées en lon/lat...
    // FIXME on construit une addresse car l'option freeForm ne semble pas
    // être fonctionnelle...
    var label = _Common_Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_13__["default"].getGeocodedLocationFreeform(oLocation); // on transmet les coordonnées au panneau,
    // même si on ne les affiche pas...

    this._setCoordinate({
      lat: oLocation.position.lat,
      lng: oLocation.position.lon
    }); // on transmet le texte au panneau


    this._setLabel(label);

    var info = {
      service: "GeocodedLocation",
      location: oLocation
    }; // on met en place le marker

    this._setMarker(oLocation.position, info, true);

    this._inputShowPointerContainer.checked = false;
    this._inputAutoCompleteContainer.className = "GPlocationOriginVisible";
    this._inputCoordinateContainer.className = "GPlocationOriginHidden"; // on desactive l'event sur la map en activant le gestionnaire !

    this.onActivateMapPointClick();
  },
  // ################################################################### //
  // ###################### handlers events (dom) ###################### //
  // ################################################################### //

  /**
   * this method is called by event 'keyup' on 'GPLocationOrigin' tag input
   * (cf. this.), and it gets the value of input.
   * this value is passed as a parameter for the service autocomplete (text).
   * the results of the request are displayed into a drop down menu.
   * FIXME
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onAutoCompleteSearchText: function onAutoCompleteSearchText(e) {
    logger.log("onAutoCompleteSearchText()", e);
    var value = e.target.value;

    if (!value) {
      return;
    } // aucun droits !
    // on evite une requête...


    if (this._noRightManagement) {
      logger.log("no rights for this service !?");
      return;
    } // on sauvegarde le localisant


    this._currentLocation = value; // on limite les requêtes à partir de 3 car. saisie !

    if (value.length < 3) {
      return;
    } // INFORMATION
    // on effectue la requête au service d'autocompletion.
    // on met en place des callbacks afin de recuperer les resultats ou
    // les messages d'erreurs du service.
    // les resultats sont affichés dans une liste deroulante.


    var context = this;

    this._requestAutoComplete({
      text: value,
      maximumResponses: 5,
      // FIXME je limite le nombre de reponse car le container DOM est limité dans l'affichage !!!
      // callback onSuccess
      onSuccess: function onSuccess(results) {
        logger.log(results);

        if (results) {
          var locations = results.suggestedLocations;

          context._fillAutoCompletedLocationListContainer(locations);
        }
      },
      // callback onFailure
      onFailure: function onFailure(error) {
        // FIXME
        // où affiche t on les messages : ex. 'No suggestion matching the search' ?
        // doit on nettoyer la liste des suggestions dernierement enregistrée :
        context._clearSuggestedLocation();

        logger.log(error.message);
      }
    });
  },

  /**
   * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
   * (cf. this._createAutoCompleteListElement), and it selects the location.
   * this location displays a marker on the map.
   * FIXME
   * TODO
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onAutoCompletedResultsItemClick: function onAutoCompletedResultsItemClick(e) {
    logger.log("onAutoCompletedResultsItemClick()", e);
    var idx = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_9__["default"].index(e.target.id);
    logger.log(idx);
    logger.log(this._suggestedLocations[idx]);

    if (!idx) {
      return;
    }

    var position = {
      lon: this._suggestedLocations[idx].position.x,
      // LON !
      lat: this._suggestedLocations[idx].position.y // LAT !

    };
    var info = {
      service: "SuggestedLocation",
      location: this._suggestedLocations[idx]
    };
    var label = _Common_Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_13__["default"].getSuggestedLocationFreeform(this._suggestedLocations[idx]);

    this._setLabel(label);

    this._setPosition(position);

    this._setMarker(position, info, this.options.displayInfo); // on sauvegarde le point courant


    this._coordinate = position;
  },

  /**
   * this method is called by event 'click' on '' tag input
   * (cf. this.), and it create or remove the event of click map.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onActivateMapPointClick: function onActivateMapPointClick(e) {
    logger.trace("onActivateMapPointClick()", e);
    var map = this._map;

    if (this._inputShowPointerContainer.checked) {
      if (!this._activeDragAndDrop) {
        map.on("click", this.onMouseMapClick, this); // on change le curseur

        this._setCursor("crosshair"); // on supprime le marker


        this._setMarker(); // on efface l'ancien resultat


        this._clearResults();
      }
    } else {
      if (!this._activeDragAndDrop) {
        map.off("click", this.onMouseMapClick, this); // on retablie le curseur d'origine

        this._setCursor();
      }
    }
  },

  /**
   * this method is called by event 'click' on '(n)' tag label
   * (cf. this.).
   * this point is erased.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onLocationClearPointClick: function onLocationClearPointClick(e) {
    logger.log("onLocationClearPointClick", e);

    this._setCursor();

    this._setMarker();

    this._clearResults();

    this._inputAutoCompleteContainer.focus();
  },

  /**
   * this method is called by event 'click' on '(n)' tag input
   * (cf. this.).
   * this point is deleted.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onLocationRemovePointClick: function onLocationRemovePointClick(e) {
    logger.log("onLocationRemovePointClick", e);

    this._setCursor();

    this._setMarker();

    this._clearResults();
  },

  /**
   * TODO this method is called by event 'click' on '(n)' tag input
   * (cf. this.).
   * this point is added as a parameter for the service Location.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onLocationAddPointClick: function onLocationAddPointClick(e) {
    logger.log("onLocationAddPointClick", e);
  },
  // ################################################################### //
  // #################### handlers events (control) #################### //
  // ################################################################### //

  /**
   * this method is called by event 'click' on map
   * (cf. this.onLocationMapPointClick), and it gets the coordinate of click on map.
   * this point is saved as a parameter for the service Location.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onMouseMapClick: function onMouseMapClick(e) {
    logger.log("onMouseMapClick", e); // les coordonnées

    var oLatLng = e.latlng; // si le geocodage inverse est desactivé,
    // on transmet les coordonnées au panneau,
    // sinon, on transmet la reponse du service

    if (this.options.disableReverse || this._noRightManagement) {
      // on transmet les coordonnées au panneau, puis on place le marker
      this._displayResultOfCoordinate(oLatLng);
    } else {
      // contexte
      var self = this; // on realise une requête au service, si la reponse est vide ou
      // en échec, on transmet les coordonnées !

      this._requestReverseGeocode({
        searchGeometry: {
          type: "Circle",
          coordinates: [oLatLng.lng, oLatLng.lat],
          radius: 50
        },
        maximumResponses: 1,
        // callback onSuccess
        onSuccess: function onSuccess(results) {
          logger.log(results);

          if (results.locations.length !== 0) {
            var oLocation = results.locations[0];

            self._displayResultOfLabel(oLocation);
          } else {
            self._displayResultOfCoordinate(oLatLng);
          }
        },
        // callback onFailure
        onFailure: function onFailure(error) {
          logger.log(error.message);

          self._displayResultOfCoordinate(oLatLng);
        }
      });
    }
  },

  /**
   * this method is called by event 'startdrag' on marker
   * and it initializes the drag&drop.
   *
   * @private
   */
  onStartDragMarker: function onStartDragMarker() {
    if (!this._marker) {
      return;
    }

    this._activeDragAndDrop = true;
    this._inputShowPointerContainer.checked = true;
    this._inputAutoCompleteContainer.className = "GPlocationOriginHidden";
    this._inputCoordinateContainer.className = "GPlocationOriginVisible";

    this._marker.unbindPopup();

    this._setLabel();

    this._clearResults();
  },

  /**
   * this method is called by event 'drag' on marker
   * and it updates the panel of coordinate.
   *
   * @private
   */
  onDragMarker: function onDragMarker() {
    if (!this._marker) {
      return;
    }

    this._activeDragAndDrop = false;
    this._inputShowPointerContainer.checked = true; // on transmet les coordonnées au panneau

    var oLatLng = this._marker.getLatLng();

    this._setCoordinate(oLatLng);
  },

  /**
   * this method is called by event 'enddrag' on marker
   * and it finishes the drag&drop.
   * this point is saved as a parameter for the service Location.
   *
   * @private
   */
  onEndDragMarker: function onEndDragMarker() {
    if (!this._marker) {
      return;
    }

    this._inputShowPointerContainer.checked = true;

    var oLatLng = this._marker.getLatLng();

    if (this._pressedKeyOnDragAndDrop) {
      // on transmet les coordonnées au panneau
      this._setCoordinate(oLatLng);
    } else {
      logger.log("No key pressed, so autocomplete solution !");
      this.onMouseMapClick({
        latlng: oLatLng
      });
    } // init


    this._activeDragAndDrop = false;
    this._pressedKeyOnDragAndDrop = false;
  },

  /**
   * this method is called by event 'mousedown' on marker..
   * this event gets the pressed key code.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onMouseDownMarker: function onMouseDownMarker(e) {
    if (!this._marker) {
      return;
    }

    this._pressedKeyOnDragAndDrop = e.originalEvent.ctrlKey;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (LocationSelector);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
/* harmony import */ var _Response_AutoCompleteResponseFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(45);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(43);







/**
 * @classdesc
 * Appel du service d'autocomplétion du Géoportail :
 * envoi de la requête construite selon les paramètres en options,
 * éventuellement parsing et analyse  de la réponse,
 * retour d'une réponse en paramètre de la fonction onSuccess.
 * @constructor
 * @extends {Gp.Services.CommonService}
 * @alias Gp.Services.AutoComplete
 *
 * @param {Object} options - options spécifiques au service (+ les options heritées)
 *
 * @param {String} options.text - La chaîne de caractère à compléter.
 *      Cette chaîne n'est pas "URL encodée".
 *      C'est l'API qui s'occupe de l'encoder pour l'inclure dans la requête.
 *
 * @param {Array.<String>} [options.type = ["StreetAddress"]] - Type de l'objet recherché.
 *      Le service d'autocomplétion du Géoportail permet de rechercher des toponymes 'PositionOfInterest' et/ou des adresses postales 'StreetAddress'.
 *      D'autres types pourront être rajoutés selon l'évolution du service.
 *      Par défaut, type = ['StreetAddress'].
 *
 * @param {String} [options.territory] - Limitation de la zone de recherche de localisants.
 *      Le service d'autocomplétion du Géoportail permet de limiter la recherche à la métropole et la Corse : options.territory = 'METROPOLE',
 *      DOMS TOMS : options.territory = 'DOMTOM', ou à un département : options.territory = '31'
 *      Pas de valeur par défaut.
 *      La valeur par défaut est donc celle du service.
 *      Le service d'autocomplétion du Géoportail renvoie toutes les informations quand aucun territoire n'est spécifié.
 *
 * @param {Number} [options.maximumResponses = 10] - Nombre de réponses maximal que l'on souhaite recevoir.
 *      Pas de valeur par défaut.
 *      La valeur par défaut sera donc celle du service : 10.
 *
 * @example
 *   var options = {
 *      // options communes aux services
 *      apiKey : null,
 *      serverUrl : 'http://localhost/service/',
 *      protocol : 'JSONP', // JSONP|XHR
 *      proxyURL : null,
 *      httpMethod : 'GET', // GET|POST
 *      timeOut : 10000, // ms
 *      rawResponse : false, // true|false
 *      scope : null, // this
 *      onSuccess : function (response) {},
 *      onFailure : function (error) {},
 *      // spécifique au service
 *      text : "",
 *      type : "StreetAddress",
 *      territory : 'METROPOLE',
 *      maximumResponses : 10
 *   };
 * @private
 */
function AutoComplete (options_) {
    if (!(this instanceof AutoComplete)) {
        throw new TypeError(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_3__["default"].getMessage("CLASS_CONSTRUCTOR", "AutoComplete"));
    }

    /**
     * Nom de la classe (heritage)
     * FIXME instance ou classe ?
     */
    this.CLASSNAME = "AutoComplete";

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__["default"].getLogger("Gp.Services.AutoComplete");
    this.logger.trace("[Constructeur AutoComplete (options)]");

    var options = this.patchOptionConvertor(options_);
    options.serverUrl = options.serverUrl || "https://wxs.ign.fr/calcul/geoportail/geocodage/rest/0.1/completion";

    // appel du constructeur par heritage
    _CommonService__WEBPACK_IMPORTED_MODULE_0__["default"].apply(this, arguments);

    if (!options.text) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_3__["default"].getMessage("PARAM_MISSING", "text"));
    }

    // ajout des options spécifiques au service
    this.options.text = options.text;

    // on definit des parametres par defaut
    if (!options.type) {
        options.type = ["StreetAddress,PositionOfInterest"];
    }

    this.options.type = options.type;
    this.options.territory = options.territory || "";
    this.options.maximumResponses = options.maximumResponses || 10;

    // INFO
    // le service ne repond pas en mode POST (405 Method Not Allowed)
    if (this.options.protocol === "XHR" && this.options.httpMethod === "POST") {
        this.logger.warn("Le service ne gére pas le mode d'interrogation en POST, on bascule sur du GET !");
        this.options.httpMethod = "GET"; // on surcharge !
    }

    // attributs d'instances

    /**
     * Format forcé de la réponse du service : "json"
     * sauf si l'on souhaite une reponse brute (options.rawResponse)
     */
    this.options.outputFormat = (this.options.rawResponse) ? "" : "json";
}

/**
 * @lends module:AutoComplete#
 */

AutoComplete.prototype = Object.create(_CommonService__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, {
    // todo
    // getter/setter
});

/*
 * Constructeur (alias)
 */
AutoComplete.prototype.constructor = AutoComplete;

/**
 * Patch pour la convertion des options vers le nouveau formalisme.
 *
 * @param {Object} options_ - options du service
 * @return {Object} - options
 */
AutoComplete.prototype.patchOptionConvertor = function (options_) {
    const options = options_;

    if (options.filterOptions) {
        this.logger.warn("The parameter 'filterOptions' is deprecated");

        if (options.filterOptions.type) {
            this.logger.warn("The parameter 'filterOptions.type' is deprecated");
            if (!options.type) {
                options.type = options.filterOptions.type;
            }
        }

        if (options.filterOptions.territory) {
            this.logger.warn("The parameter 'filterOptions.territory' is deprecated");
            if (!options.terr) {
                options.terr = options.filterOptions.territory;
            }
        }

        delete options.filterOptions;
    }

    return options;
};

/**
 * (overwrite)
 * Création de la requête
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback
 */
AutoComplete.prototype.buildRequest = function (error, success) {
    // ex.
    // http://wxs.ign.fr/CLEF/ols/apis/completion?
    // text=Brie-Comt&
    // type=StreetAddress,PositionOfInterest&
    // territory=METROPOLE&
    // maximumResponses=10

    // traitement des param KPV sous forme de tableau
    var territory = "";
    if (this.options.territory) {
        territory = this.options.territory;
    }

    var type = "";
    if (this.options.type) {
        type = this.options.type.join(",");
    }

    // normalisation de la requete avec param KPV
    this.request = _Utils_Helper__WEBPACK_IMPORTED_MODULE_4__["default"].normalyzeParameters({
        text : encodeURIComponent(this.options.text),
        type : type,
        terr : territory,
        maximumResponses : this.options.maximumResponses
    });

    (!this.request)
        ? error.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_5__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_3__["default"].getMessage("SERVICE_REQUEST_BUILD")))
        : success.call(this, this.request);
};

/**
 * (overwrite)
 * Analyse de la reponse
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback de succès de l'analyse de la réponse
 */
AutoComplete.prototype.analyzeResponse = function (error, success) {
    if (this.response) {
        var options = {
            response : this.response,
            rawResponse : this.options.rawResponse,
            onSuccess : success,
            onError : error,
            scope : this
        };

        _Response_AutoCompleteResponseFactory__WEBPACK_IMPORTED_MODULE_1__["default"].build(options);
    } else {
        error.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_5__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_3__["default"].getMessage("SERVICE_RESPONSE_EMPTY")));
    }
};

/* harmony default export */ __webpack_exports__["default"] = (AutoComplete);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _model_AutoCompleteResponse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65);
/* harmony import */ var _model_SuggestedLocation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66);
/**
 * Factory pour générer une reponse JSON à partir d'un XML ou d'un JSON
 * (Factory)
 *
 * @module AutoCompleteResponseFactory
 * @private
 * @alias Gp.Services.AutoComplete.Response.AutoCompleteResponseFactory
 */






var AutoCompleteResponseFactory = {

    /**
     * interface unique
     *
     * @method build
     * @static
     * @param {Object} options - options definies dans le composant Alti
     *
     * @example
     *   var options = {
     *      response :
     *      outputFormat :
     *      rawResponse :
     *      scope :
     *      onSuccess :
     *      onError :
     *   };
     *
     */
    build : function (options) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("AutoCompleteResponseFactory");
        logger.trace(["AutoCompleteResponseFactory::build()"]);

        var data = null;

        if (options.response) {
            if (options.rawResponse) {
                logger.trace("analyze response : raw");
                data = options.response;
            } else {
                var JSONResponse = null;
                if (typeof options.response === "string") {
                    JSONResponse = JSON.parse(options.response);
                } else {
                    JSONResponse = options.response;
                }

                // analyse de la réponse
                if (JSONResponse) {
                    // le service renvoie t il une erreur ?
                    if (JSONResponse.error) {
                        // ex. ?
                        options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                            message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION", JSONResponse.error.description),
                            status : JSONResponse.error.code,
                            type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"].TYPE_SRVERR
                        }));
                        return;
                    }

                    // création de l'objet réponse
                    data = new _model_AutoCompleteResponse__WEBPACK_IMPORTED_MODULE_3__["default"]();

                    // boucle sur les résultats de l'autocomplétion
                    if (JSONResponse.results && Array.isArray(JSONResponse.results)) {
                        var suggestedLocation = null;

                        for (var i = 0; i < JSONResponse.results.length; i++) {
                            var result = JSONResponse.results[i];
                            suggestedLocation = new _model_SuggestedLocation__WEBPACK_IMPORTED_MODULE_4__["default"]();

                            if (result) {
                                if (result.country === "StreetAddress") {
                                    suggestedLocation.street = result.street;
                                    suggestedLocation.type = "StreetAddress";
                                } else if (result.country === "PositionOfInterest") {
                                    suggestedLocation.poi = result.street;
                                    suggestedLocation.kind = result.kind;
                                    suggestedLocation.type = "PositionOfInterest";
                                }

                                if (suggestedLocation.position) {
                                    suggestedLocation.position.x = result.x;
                                    suggestedLocation.position.y = result.y;
                                }

                                suggestedLocation.commune = result.city;
                                suggestedLocation.fullText = result.fulltext;
                                suggestedLocation.postalCode = result.zipcode;
                                suggestedLocation.classification = result.classification;
                            }
                            // Ajout du résultat au tableau reverseGeocodedLocations de geocodedLocation
                            data.suggestedLocations.push(suggestedLocation);
                        }
                    } else {
                        options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_FORMAT_3")));
                        return;
                    }

                    if (!data.suggestedLocations.length) {
                        options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_FORMAT_3")));
                        return;
                    }
                }

                if (!data) {
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                        message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_ANALYSE_2"),
                        type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"].TYPE_UNKERR,
                        status : -1
                    }));
                    return;
                }

                // Si la réponse contenait une exception renvoyée par le service
                if (data.exceptionReport) {
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                        message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION", data.exceptionReport),
                        type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"].TYPE_SRVERR,
                        status : 200
                    }));
                    return;
                }
            }
        } else {
            // si la réponse (xmlString) est vide, on appelle le callback d'erreur
            options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EMPTY")));
            return;
        }

        // si tout s'est bien passé, on appelle le callback de succès
        options.onSuccess.call(options.scope, data);
    }
};

/* harmony default export */ __webpack_exports__["default"] = (AutoCompleteResponseFactory);


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Response object for {@link module:Services~autoComplete Gp.Services.autoComplete ()} invocation when successful. Received as the argument of onSuccess callback function.
 *
 * @property {Array.<Gp.Services.AutoComplete.SuggestedLocation>} suggestedLocations - SuggestedLocations array.
 *
 * @namespace
 * @alias Gp.Services.AutoCompleteResponse
 */
function AutoCompleteResponse () {
    if (!(this instanceof AutoCompleteResponse)) {
        throw new TypeError("AutoCompleteResponse constructor cannot be called as a function.");
    }

    this.suggestedLocations = [];
}

AutoCompleteResponse.prototype = {

    constructor : AutoCompleteResponse

};

/* harmony default export */ __webpack_exports__["default"] = (AutoCompleteResponse);


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Single SuggestedLocation Object returned by underlying web service.
 * Each suggested location represents a street address ("StreetAddress") or a place name ("PositionOfInterest").
 *
 * @property {String} type - Suggested location type : "StreetAddress" ou "PositionOfInterest"
 * @property {Gp.Point} position - Position of the suggested location given in requested coordinates system.
 * @property {String} commune - Suggested municipality
 * @property {String} fullText - Full text representation of the suggested location.
 * @property {String} postalCode - Suggested location postcode
 * @property {Integer} classification - Number used to classify the importance of the place where is the suggested location from 1 (most important) to 7 (less important).
 * @property {String} street - Street name of the suggested location ("StreetAddress" only).
 * @property {String} kind - Nature of the suggested location : "prefecture", "monument", "commune", ... for instance ("PositionOfInterest" only).
 *
 * @namespace
 * @alias Gp.Services.AutoComplete.SuggestedLocation
 */
function SuggestedLocation () {
    if (!(this instanceof SuggestedLocation)) {
        throw new TypeError("SuggestedLocation constructor cannot be called as a function.");
    }

    /* REPONSE :
        {
           "status" : "OK",
           "results" : [
              {
                 "country":"PositionOfInterest",
                 "x":-1.559185,
                 "y":47.952603,
                 "city":"Brie",
                 "zipcode":"35150",
                 "street":"corbe",
                 "kind":"Lieu-dit habité",
                 "fulltext":"corbe, 35150 Brie",
                 "classification":6
              },
              {
                 "country":"StreetAddress",
                 "x":1.538295,
                 "y":43.19646,
                 "city":"Brie",
                 "zipcode":"09700",
                 "street":"courreste",
                 "kind":"",
                 "fulltext":"courreste, 09700 Brie",
                 "classification":7
              }
           ]
        }
    */

    /* REPONSE EN ERREUR
        {
            status : "ERROR",
            results : [ ]
        }
    */

    /**
     * Suggested location type : "StreetAddress" ou "PositionOfInterest"
     * @type {String}
     */
    this.type = null;

    /**
     * Position of the suggested location given in requested coordinates system.
     * @type {Gp.Point}
     */
    this.position = {
        x : null,
        y : null
    };

    /**
     * Suggested municipality
     * @type {String}
     */
    this.commune = null;

    /**
     * Full text representation of the suggested location.
     * @type {String}
     */
    this.fullText = null;

    /**
     * Suggested location postcode
     * @type {Number}
     */
    this.postalCode = null;

    /**
     * Number used to classify the importance of the place where is the suggested location from 1 (most important) to 7 (less important).
     * @type {Integer}
     */
    this.classification = null;

    /**
     * Street name of the suggested location ("StreetAddress" only).
     * @type {String}
     */
    this.street = null;

    /**
     * Place name of the suggested location ("PositionOfInterest" only).
     * @type {String}
     */
    this.poi = null;

    /**
     * Nature of the suggested location : "prefecture", "monument", "commune", ... for instance ("PositionOfInterest" only).
     * @type {String}
     */
    this.kind = null;
}

SuggestedLocation.prototype = {

    constructor : SuggestedLocation
};

/* harmony default export */ __webpack_exports__["default"] = (SuggestedLocation);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _CommonService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);
/* harmony import */ var _Request_GeocodeRequestFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68);
/* harmony import */ var _Response_GeocodeResponseFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71);







/**
 * @classdesc
 * Appel du service de géocodage inverse du Géoportail :
 *     envoi de la requête construite selon les paramètres en options,
 *     éventuellement parsing et analyse  de la réponse,
 *     retour d'une réponse en paramètre de la fonction onSuccess.
 * @constructor
 * @extends {Gp.Services.CommonService}
 * @alias Gp.Services.ReverseGeocode
 *
 * @param {Object} options - options spécifiques au service (+ les options heritées)
 *
 * @param {Object} options.position - Position du point de référence pour le calcul de proximité exprimée dans le système de référence spécifié par le srs.
 *      @param {Float} options.position.lon - Longitude du point de référence pour le calcul de proximité.
 *      @param {Float} options.position.lat - Latitude du point de référence pour le calcul de proximité.
 *
 * @param {Object} [options.filters] - Les propriétés possibles de cet objet.
 * @param {String} [options.filters.[proprietes du filtre]] - Critère supplémentaire pour filtrer la recherche sous la forme
 *      d'un couple clé/valeur à définir selon les possibilités du serveur ajouté à la requête.
 *      Le service de géocodage du Géoportail permet de filtrer les adresses postales avec les propriétés :
 *          "postalCode", "inseeCode", "city".
 *      Il permet également de filtrer les toponymes avec les propriétés :
 *          "postalCode", "inseeCode", "type".
 *      Enfin, il permet de filtrer les parcelles cadastrales avec les propriétés :
 *          "codeDepartement", "codeCommune", "nomCommune", "codeCommuneAbs", "codeArrondissement", "section", "numero", "feuille".
 *
 * @param {Object} [options.searchGeometry] - Emprise dans laquelle on souhaite effectuer la recherche.
 *      Les propriétés possibles de cet objet sont décrites ci-après.
 *      @param {String} options.searchGeometry.type   - Type de géometrie (Point|Circle|Linestring|Polygon)
 *      @param {Array.<Float>|Array.Array.<Float>} options.searchGeometry.coordinates - Coordonnées des points constituant la géométrie.
 *      @param {Float} options.searchGeometry.radius    - Rayon. Paramètre applicable uniquement pour le type 'Circle'.
 *
 * @param {String} [options.index = "StreetAddress"] - Type de l'objet recherché.
 *      Le service de géocodage du Géoportail permet de rechercher des 'PositionOfInterest' pour des toponymes, des 'StreetAddress'
 *      pour des adresses postales ou des 'CadastralParcel' pour des parcelles cadastrales. L'index 'location' permet une recherche
 *      multi-indexes en regroupant les indexes 'PositionOfInterest' et 'StreetAddress'.
 *      D'autres types pourront être rajoutés selon l'évolution du service.
 *      Par défaut, index = 'StreetAddress'.
 *
 * @param {Number} [options.maximumResponses] - Nombre de réponses maximal que l'on souhaite recevoir.
 *      Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 20s.
 *
 * @param {Boolean} [options.returnTrueGeometry] - Booléen indiquant si l'on souhaite récupérer la géométrie vraie des objects géolocalisés.
 *      false par défaut.
 *
 * @example
 *   var options = {
 *      apiKey : null,
 *      serverUrl : 'http://localhost/service/',
 *      proxyURL : null,
 *      timeOut : 10000, // ms
 *      rawResponse : false, // true|false
 *      scope : null, // this
 *      onSuccess : function (response) {},
 *      onFailure : function (error) {},
 *      // spécifique au service
 *      index : 'StreetAddress',
 *      searchGeometry : {
 *          type : Circle,
 *          coordinates : [48, 2],
 *          radius : 100
 *      },
 *      position : {lon:2 , lat:48.5},
 *      maximumResponses : 25,
 *   };
 *
 * @private
 */
function ReverseGeocode (options_) {
    if (!(this instanceof ReverseGeocode)) {
        throw new TypeError(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("CLASS_CONSTRUCTOR", "ReverseGeocode"));
    }

    /**
     * Nom de la classe (heritage)
     * FIXME instance ou classe ?
     */
    this.CLASSNAME = "ReverseGeocode";

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("Gp.Services.ReverseGeocode");
    this.logger.trace("[Constructeur ReverseGeocode (options)]");

    var options = this.patchOptionConvertor(options_);
    options.serverUrl = options.serverUrl || "https://wxs.ign.fr/calcul/geoportail/geocodage/rest/0.1/reverse";

    // appel du constructeur par heritage
    _CommonService__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, [options]);

    if (!options.searchGeometry) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "searchGeometry"));
    }

    // ajout des options spécifiques au service
    this.options.searchGeometry = options.searchGeometry;

    // on definit l'index par defaut
    if (!options.index) {
        this.options.index = options.index = "StreetAddress";
    }

    if (options.filters) {
        var filter = Object.keys(options.filters);
        for (var i = 0; i < filter.length; i++) {
            var key = filter[i];
            // on supprime les filtres vides
            if (typeof options.filters[key] === "undefined" ||
                (typeof options.filters[key] === "object" && Object.keys(options.filters[key]).length === 0) ||
                (typeof options.filters[key] === "string" && options.filters[key].length === 0) ||
                (Array.isArray(options.filters[key]) && options.filters[key].length === 0)
            ) {
                delete this.options.filters[key];
            }
        }
    }

    this.options.position = options.position;
    this.options.index = options.index || "StreetAddress";
    this.options.maximumResponses = options.maximumResponses || 20;
}

/**
 * @lends module:ReverseGeocode#
 */
ReverseGeocode.prototype = Object.create(_CommonService__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, {
    // todo
    // getter/setter
});

/*
 * Constructeur (alias)
 */
ReverseGeocode.prototype.constructor = ReverseGeocode;

/**
 * Patch pour la convertion des options vers le nouveau formalisme.
 *
 * @param {Object} options_ - options du service
 * @return {Object} - options
 */
ReverseGeocode.prototype.patchOptionConvertor = function (options_) {
    var options = options_;

    if (options.filterOptions) {
        this.logger.warn("The parameter 'filterOptions' is deprecated");

        if (options.filterOptions.type) {
            this.logger.warn("The parameter 'filterOptions.type' is deprecated");
            if (!options.index) {
                if (Array.isArray(options.filterOptions.type) && options.filterOptions.type.length > 0) {
                    options.index = options.filterOptions.type[0];
                } else {
                    options.index = options.filterOptions.type;
                }
            }
            delete options.filterOptions.type;
        }

        if (options.filterOptions.bbox) {
            this.logger.warn("The parameter 'filterOptions.bbox' is deprecated");
            if (!options.searchGeometry) {
                // convertir la geometrie
                options.searchGeometry = this.bbox2Json(options.filterOptions.bbox);
            }
            delete options.filterOptions.bbox;
        }

        if (options.filterOptions.circle) {
            this.logger.warn("The parameter 'filterOptions.circle' is deprecated");
            if (!options.searchGeometry) {
                // convertir la geometrie
                options.searchGeometry = this.circle2Json(options.filterOptions.circle);
            }
            delete options.filterOptions.circle;
        }

        if (options.filterOptions.polygon) {
            this.logger.warn("The parameter 'filterOptions.polygon' is deprecated");
            if (!options.searchGeometry) {
                // convertir la geometrie
                options.searchGeometry = this.polygon2Json(options.filterOptions.polygon);
            }
            delete options.filterOptions.polygon;
        }

        if (!options.filters && Object.keys(options.filterOptions).length > 0) {
            options.filters = options.filterOptions;
        }

        delete options.filterOptions;
    }

    if (options.position) {
        if (options.position.x) {
            this.logger.warn("The parameter 'position.x' is deprecated");

            if (!options.position.lon) {
                options.position.lon = options.position.x;
            }
            delete options.position.x;
        }

        if (options.position.y) {
            this.logger.warn("The parameter 'position.y' is deprecated");

            if (!options.position.lat) {
                options.position.lat = options.position.y;
            }
            delete options.position.y;
        }
    }

    if (options.srs) {
        this.logger.warn("The parameter 'srs' is deprecated");
        delete options.srs;
    }

    return options;
};

/**
 * (overwrite)
 * Création de la requête
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback
 */
ReverseGeocode.prototype.buildRequest = function (error, success) {
    var options = {
        httpMethod : this.options.httpMethod,
        // options specifiques du service
        geocodeMethod : "reverse",
        searchGeometry : this.options.searchGeometry,
        index : this.options.index,
        position : this.options.position,
        returnTrueGeometry : this.options.returnTrueGeometry,
        maxResp : this.options.maximumResponses,
        filters : this.options.filters
    };

    this.request = _Request_GeocodeRequestFactory__WEBPACK_IMPORTED_MODULE_4__["default"].build(options);

    // on teste si la requete a bien été construite !
    (!this.request)
        ? error.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_REQUEST_BUILD")))
        : success.call(this, this.request);
};

/**
 * (overwrite)
 * Analyse de la reponse
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback
 */
ReverseGeocode.prototype.analyzeResponse = function (error, success) {
    if (this.response) {
        var options = {
            response : this.response,
            rawResponse : this.options.rawResponse,
            onError : error,
            onSuccess : success,
            scope : this
        };

        _Response_GeocodeResponseFactory__WEBPACK_IMPORTED_MODULE_5__["default"].build(options);
    } else {
        error.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EMPTY")));
    }
};

/**
 * Patch pour la convertion des options vers le nouveau formalisme.
 *
 * @param {Array} bbox - bbox
 * @return {Object} - geometrie au format json
 */
ReverseGeocode.prototype.bbox2Json = function (bbox) {
    return {
        type : "Polygon",
        coordinates : [[
            [bbox.left, bbox.top],
            [bbox.right, bbox.top],
            [bbox.right, bbox.bottom],
            [bbox.left, bbox.bottom],
            [bbox.left, bbox.top]
        ]]
    };
};

/**
 * Patch pour la convertion des options vers le nouveau formalisme.
 *
 * @param {Object} circle - circle
 * @return {Object} - geometrie au format json
 */
ReverseGeocode.prototype.circle2Json = function (circle) {
    return {
        type : "Circle",
        radius : circle.radius,
        coordinates : [circle.x, circle.y]
    };
};

/**
 * Patch pour la convertion des options vers le nouveau formalisme.
 *
 * @param {Array} polygon - polygon
 * @return {Object} - geometrie au format json
 */
ReverseGeocode.prototype.polygon2Json = function (polygon) {
    var jsonGeom = {
        type : "Polygon",
        coordinates : [[]]
    };

    for (var i = 0; i < polygon.length; ++i) {
        jsonGeom.coordinates[0].push([polygon[i].x, polygon[i].y]);
    }

    return jsonGeom;
};

/**
 * Codes EPSG géographiques (lat/lon). Utiles car les coordonnées doivent être inversées.
 */
ReverseGeocode.geoEPSG = ["EPSG:4326"];

/* harmony default export */ __webpack_exports__["default"] = (ReverseGeocode);


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _GeocodeRequestREST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69);
/**
 * Creation d'une requête
 * (Factory)
 *
 * @module GeocodeRequestFactory
 * @alias Gp.Services.Geocode.Request.GeocodeRequestFactory
 * @private
 */



var GeocodeRequestFactory = {

    /**
     * interface unique
     *
     * @method build
     * @static
     * @param {Object} options - options definies dans le composant Geocode
     *
     * @example
     *   var options = {
     *      // options specifiques du service
     *      geocodeMethod:
     *      query:
     *      filters:
     *      maximumResponses:
     *   };
     *   var result = GeocodeRequestFactory.build(options);
     *   if (!result) {
     *       // error...
     *   }
     * @returns {String} request
     */
    build : function (options) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("GeocodeRequestFactory");
        logger.trace(["GeocodeRequestFactory::build()"]);

        var settings = options || {};

        var myReq = new _GeocodeRequestREST__WEBPACK_IMPORTED_MODULE_1__["default"](settings);
        if (!myReq.processRequestString()) {
            throw new Error("Error process request (rest) !");
        }
        var request = myReq.requestString;

        logger.trace(request);

        return request;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (GeocodeRequestFactory);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _model_GeocodeParamREST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70);





/**
 * @classdesc
 * Classe de gestion des requêtes de type REST sur le service de calcul d'itineraire
 * (uniquement en GET)
 *
 * @constructor
 * @alias Gp.Services.Geocode.Request.GeocodeRequestREST
 * @param {Object} options - options definies dans le composant Route
 *
 * @example
 * var options = {
 *      (...)
 * };
 *
 * @private
 */
function GeocodeRequestREST (options) {
    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("GeocodeRequestREST");
    this.logger.trace("[Constructeur GeocodeRequestREST ()]");

    if (!(this instanceof GeocodeRequestREST)) {
        throw new TypeError("GeocodeRequestREST constructor cannot be called as a function.");
    }

    // existance des options
    if (!options) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_EMPTY", "options"));
    }

    /** liste des options */
    this.settings = options;
}

GeocodeRequestREST.prototype = {

    /**
     * @lends module:GeocodeRequestREST#
     */

    /**
     * request
     * @type {String}
     */
    requestString : null,

    /**
     * Constructeur (alias)
     */
    constructor : GeocodeRequestREST,

    /**
     * Construction de la requête.
     *
     * @returns {String} request
     */
    processRequestString : function () {
        var request = "";

        // Mapping des options avec le service de l'API REST
        const oParams = new _model_GeocodeParamREST__WEBPACK_IMPORTED_MODULE_2__["default"](this.settings);

        const params = oParams.getParams();
        for (var i = 0; i < params.length; i++) {
            var o = params[i];
            if (request) {
                request += "&";
            }
            request += o.k + "=" + o.v;
        }

        if (!this.settings.geocodeMethod || (this.settings.geocodeMethod !== "search" && this.settings.geocodeMethod !== "reverse")) {
            throw new Error("Error geocodeMethod not valid");
        }

        this.requestString = "?" + request;
        this.logger.trace(this.requestString);

        return this.requestString;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (GeocodeRequestREST);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);



/**
 * @classdesc
 * Classe de gestion des param. des requêtes du service de calcul d'itineraire (REST).
 *      Permet le mapping avec les options du service.
 * @constructor
 * @alias Gp.Services.Route.Request.RouteParamREST
 * @param {Object} options - options
 *
 * @private
 */
function GeocodeParamREST (options) {
    if (!(this instanceof GeocodeParamREST)) {
        throw new TypeError("GeocodeParamREST constructor cannot be called as a function.");
    }

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger();
    this.logger.trace("[Constructeur GeocodeParamREST ()]");

    /**
     * Options en paramêtres du constructeur.
     */
    this.options = options || {};

    // methode de geocodage
    if (!this.options.geocodeMethod || (this.options.geocodeMethod !== "search" && this.options.geocodeMethod !== "reverse")) {
        throw new Error("Error geocodeMethod not valid");
    }
    this.geocodeMethod = this.options.geocodeMethod;

    // mapping des options avec l'API REST
    this.query = (typeof this.options !== "undefined") ? this.options.query : null;

    this.searchGeometry = this.options.searchGeometry || null;

    this.index = this.options.index || null;

    this.lon = this.options.position && this.options.position.lon ? this.options.position.lon : null;

    this.lat = this.options.position && this.options.position.lat ? this.options.position.lat : null;

    this.maxResp = this.options.maxResp || null;

    this.returnTrueGeometry = this.options.returnTrueGeometry || null;

    this.filters = this.options.filters || {};
}

/**
 * CLASSNAME
 */
GeocodeParamREST.CLASSNAME = "GeocodeParamREST";

GeocodeParamREST.prototype = {

    /**
     * @lends module:GeocodeParamREST#
     */

    /**
     * Constructeur (alias)
     */
    constructor : GeocodeParamREST,

    /**
     * Retourne les filtres
     * @returns {String} les filtres
     */
    getFilters : function () {
        var filters = {};
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                filters[prop] = this.filters[prop];
            }
        }
        return filters;
    },

    /**
     * Retourne l'index
     * @returns {String} l'index
     */
    getIndex : function () {
        if (this.index === undefined) {
            return null;
        }
        if (this.index === "StreetAddress") {
            return "address";
        } else if (this.index === "CadastralParcel") {
            return "parcel";
        } else if (this.index === "PositionOfInterest") {
            return "poi";
        } else if (this.index === "location") {
            return "location";
        }
        return this.index;
    },

    /**
     * Retourne la géométrie de recherche
     * @returns {String} la géométrie de recherche au format json
     */
    getSearchGeometry : function () {
        return JSON.stringify(this.searchGeometry);
    }
};

/**
 * Tableau de clefs/valeurs pour param.
 *
 * @returns {Array} liste de paramêtres
 */
GeocodeParamREST.prototype.getParams = function () {
    var map = [];

    if (this.geocodeMethod === "search") {
        map.push({
            k : "q",
            v : this.query
        });
    }

    if (this.index) {
        map.push({
            k : "index",
            v : this.getIndex()
        });
    }

    if (this.geocodeMethod === "reverse") {
        map.push({
            k : "searchgeom",
            v : this.getSearchGeometry()
        });
    }

    if (this.lon && this.lat) {
        map.push({
            k : "lon",
            v : this.lon
        });
        map.push({
            k : "lat",
            v : this.lat
        });
    }

    if (this.maxResp) {
        map.push({
            k : "limit",
            v : this.maxResp
        });
    }

    if (this.returnTrueGeometry) {
        map.push({
            k : "returntruegeometry",
            v : this.returnTrueGeometry
        });
    }

    const filters = this.getFilters();
    for (var key in filters) {
        map.push({
            k : key,
            v : filters[key]
        });
    }

    return map;
};

/* harmony default export */ __webpack_exports__["default"] = (GeocodeParamREST);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Formats_GeocodeResponseParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72);
/**
 * Factory pour générer une reponse JSON à partir d'un XML
 * (Factory)
 *
 * @module GeocodeResponseFactory
 * @alias Gp.Services.Geocode.Response.GeocodeResponseFactory
 * @private
 */
// import Logger from "../../../Utils/LoggerByDefault";




var GeocodeReponseFactory = {

    /**
     * interface unique
     *
     * @method build
     * @static
     * @param {Object} options - options definies dans le composant Geocode
     *
     * @example
     *   var options = {
     *      response :
     *      rawResponse :
     *      scope :
     *      onSuccess :
     *      onError :
     *   };
     *
     */
    build : function (options) {
        // data de type GeocodeResponse
        var data = null;

        if (options.response) {
            if (options.rawResponse) {
                data = options.response;
            } else {
                try {
                    const parser = new _Formats_GeocodeResponseParser__WEBPACK_IMPORTED_MODULE_2__["default"]();
                    data = parser.parse(options.response);

                    if (!data) {
                        throw new Error("L'analyse de la réponse du service !?");
                    }
                } catch (e) {
                    var message = e.message;
                    if (typeof options.response === "string") {
                        message += "('" + options.response + "')";
                    } else {
                        message += "('" + options.response.documentElement.innerHTML + "')";
                    }
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_0__["default"]({
                        message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_ANALYSE", message),
                        type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_0__["default"].TYPE_UNKERR,
                        status : -1
                    }));
                    return;
                }

                // Si la réponse contenait une exception renvoyée par le service
                if (data.exceptionReport) {
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_0__["default"]({
                        message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION", data.exceptionReport),
                        type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_0__["default"].TYPE_SRVERR,
                        status : 200 // FIXME : 200 ?
                    }));
                    return;
                }
            }
        } else {
            options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_0__["default"]({
                message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EMPTY"),
                type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_0__["default"].TYPE_SRVERR,
                status : -1 // FIXME : status response
            }));
            return;
        }

        options.onSuccess.call(options.scope, data);
    }
};

/* harmony default export */ __webpack_exports__["default"] = (GeocodeReponseFactory);


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var _Response_model_GeocodeResponse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73);
/* harmony import */ var _Response_model_GeocodedLocation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(74);
/**
 * Fonction retournant un objet contenant des clés de lecture (readers)
 *      qui permettent de parser des réponses XML du service de géocodage direct du Géoportail
 *      afin de récupérer les résultats retournés.
 * @module GeocodeResponseParser
 * @alias Gp.Services.Geocode.Formats.GeocodeResponseParser
 * @private
 */

// import Logger from "../../../Utils/LoggerByDefault";





/**
 * @classdesc
 *
 * Classe permettant de parser une réponse GeoJSON
 *
 * @constructor
 * @alias Gp.Formats.GeocodeResponseParser
 *
 * @private
 */
function GeocodeResponseParser () {
    if (!(this instanceof GeocodeResponseParser)) {
        throw new TypeError("GeocodeResponseParser constructor cannot be called as a function.");
    }
}

GeocodeResponseParser.prototype = {

    /**
     * @lends module:GeocodeResponseParser
     */

    /*
     * Constructeur (alias)
     */
    constructor : GeocodeResponseParser,

    /**
     * Méthode permettant de lancer la lecture d'une réponse GeoJSON,
     *
     * @param {String} json - réponse au format GeoJSON
     * @return {Object} geocodeResponse|exceptionReport : l'objet contenant les informations de la réponse GeoJSON,
     *      sous la forme d'un objet GeocodeResponse, ou un objet littéral exceptionReport si le service a renvoyé une exception.
     */
    parse : function (json) {
        var geocodeResponse = new _Response_model_GeocodeResponse__WEBPACK_IMPORTED_MODULE_2__["default"]();

        const obj = JSON.parse(json);

        if (obj.type === "FeatureCollection") {
            for (var i = 0; i < obj.features.length; ++i) {
                _parseFeature(obj.features[i], geocodeResponse);
            }
        } else if (obj.type === "Feature") {
            _parseFeature(obj, geocodeResponse);
        } else if (obj.type === "SERVICE_ERROR") {
            return _parseError(obj);
        } else {
            var mess = _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_0__["default"].getMessage("SERVICE_RESPONSE_ANALYSE", obj.type);
            throw new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__["default"]({
                message : mess,
                type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__["default"].TYPE_UNKERR,
                status : 200
            });
        }

        return geocodeResponse;
    }
};

/**
 * Méthode permettant de parser un feature
 *
 * @private
 *
 * @param {Object} feature
 * @param {Object} geocodeResponse
 *
 * @memberof GeocodeResponseParser
 * @return {Object} objet GeocodedLocation
 */
function _parseFeature (feature, geocodeResponse) {
    var location = new _Response_model_GeocodedLocation__WEBPACK_IMPORTED_MODULE_3__["default"]();
    if (feature.geometry && feature.geometry.type === "Point") {
        location.position = {
            lon : feature.geometry.coordinates[0],
            lat : feature.geometry.coordinates[1]
        };
    }
    if (feature.properties) {
        for (var prop in feature.properties) {
            if (prop === "_score") {
                location.accuracy = feature.properties[prop];
            } else if (prop === "_type") {
                if (feature.properties[prop] === "address") {
                    location.type = "StreetAddress";
                } else if (feature.properties[prop] === "poi") {
                    location.type = "PositionOfInterest";
                } else if (feature.properties[prop] === "parcel") {
                    location.type = "CadastralParcel";
                }
            } else {
                location.placeAttributes[prop] = feature.properties[prop];
            }
        }
        if (feature.properties._type === "address") {
            location.matchType = feature.properties.number !== undefined && feature.properties.number !== null ? "street number" : "street";
        }
    }
    geocodeResponse.locations.push(location);
}

/**
 * Méthode permettant de parser une erreur
 *
 * @private
 *
 * @param {Object} error
 *
 * @memberof GeocodeResponseParser
 * @return {Object}
 */
function _parseError (error) {
    return {
        exceptionReport : error
    };
}

/* harmony default export */ __webpack_exports__["default"] = (GeocodeResponseParser);


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Response object for {@link module:Services~geocode Gp.Services.geocode ()} or {@link module:Services~reverseGeocode Gp.Services.reverseGeocode ()} invocation when successful. Received as the argument of onSuccess callback function.
 *
 * @property {Array.<Gp.Services.Geocode.GeocodedLocation>} locations - locations array.
 *
 * @namespace
 * @alias Gp.Services.GeocodeResponse
 */
function GeocodeResponse () {
    if (!(this instanceof GeocodeResponse)) {
        throw new TypeError("GeocodeResponse constructor cannot be called as a function.");
    }

    this.locations = [];
}

GeocodeResponse.prototype = {

    constructor : GeocodeResponse

};

/* harmony default export */ __webpack_exports__["default"] = (GeocodeResponse);


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Single location object returned by the underlying geocoding web service.
 *
 * @property {Gp.Point} position - Position of the location given in the requested coordinates system.
 * @property {String} type - location type "StreetAddress" (for an address), "PositionOfInterest" (for a place name) or "CadastralParcel" (for cadastral parcel).
 * @property {String} matchType - how geocoding is performed : "street number" (exact address), "street enhanced" (street number calculated by interpolation), "street" (only the street), "city" (only the city).
 * @property {Float} accuracy - Accuracy of the response towards the requested location between 0 (unaccurate) and 1 (exact match).
 * @property {Object} placeAttributes - Associative array matching the following attributes with their values given by the underlying web service :
 *
 * *Common attributes : *
 *
 * - **trueGeometry** - the 'real life' geometry if different from 'Point' type.
 *
 * *if type === "StreetAddress" :*
 *
 * - **number** - Street number.
 * - **postalCode** - PostCode
 * - **street** - Street name
 * - **city** - City
 * - **houseNumberInfos** - additional street number information
 * - **inseeCode** - INSEE Code
 *
 *
 * *if type === "PositionOfInterest" :*
 *
 * - **type** - Place name type
 * - **postalCode** - PostCode
 * - **toponyme** - Toponyme
 * - **extraFields** - additional place name properties
 * - **inseeCode** - INSEE Code
 *
 *
 * *si type = "CadastralParcel" :*
 *
 * - **codeCommuneAbs** - when a parcel comes from a city that was absorbed by another, code of that old city. "000" otherwise.
 * - **codeArrondissement** - arrondissement
 * - **identifiant** - cadastral parcel code
 * - **feuille** - Parcel Sheet (eg. "1").
 * - **numero** - Parcel Number (eg. "0041")
 * - **section** - Parcel Section (eg. "0D").
 * - **nomCommune** - Parcel municipality name.
 * - **codeCommune** - Parcel municipality.
 * - **codeDepartement** - Parcel Department.
 *
 * @namespace
 * @alias Gp.Services.Geocode.GeocodedLocation
 */
function GeocodedLocation () {
    if (!(this instanceof GeocodedLocation)) {
        throw new TypeError("GeocodedLocation constructor cannot be called as a function.");
    }

    this.position = null;

    this.matchType = null;

    this.placeAttributes = {};

    this.type = null;

    this.accuracy = null;

    /**
     * Nom de la classe : "GeocodedLocation"
     * @type {String}
     */
    this.CLASSNAME = "GeocodedLocation";
}

GeocodedLocation.prototype = {

    constructor : GeocodedLocation

};

/* harmony default export */ __webpack_exports__["default"] = (GeocodedLocation);


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);



var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("LocationSelectorDOM");
var LocationSelectorDOM = {
  /**
  * Add uuid to the tag ID
  * @param {String} id - id selector
  * @returns {String} uid - id selector with an unique id
  */
  _addUID: function _addUID(id) {
    var uid = this._uid ? id + "-" + this._uid : id;
    return uid;
  },

  /**
   * Main container (DOM)
   *
   * @returns {DOMElement} DOM element
   */
  _createMainContainerElement: function _createMainContainerElement() {
    var container = document.createElement("div");
    container.className = this._addUID("GPlocationPoint"); // ceci permet de gerer les groupes de points !

    container.className += " GPwidget";
    return container;
  },

  /**
   * Create Container Point
   * see event !
   *
   * @param {Number} id - tag ID
   * @param {Number} display  - display
   * @returns {DOMElement} DOM element
   */
  _createLocationPointElement: function _createLocationPointElement(id, display) {
    var div = document.createElement("div");
    div.id = this._addUID("GPlocationPoint_" + id);
    div.className = display ? "GPflexInput GPlocationStageFlexInput" : "GPflexInput GPlocationStageFlexInputHidden";
    div.style.cssText = "";
    return div;
  },

  /**
   * Create Container Point
   * see event !
   *
   * @param {Number} id - tag ID
   * @param {String} text - label
   * @returns {DOMElement} DOM element
   */
  _createLocationPointLabelElement: function _createLocationPointLabelElement(id, text) {
    // contexte d'execution
    var self = this;
    var labelOrigin = document.createElement("label");
    labelOrigin.id = this._addUID("GPlocationOriginLabel_" + id);
    labelOrigin.htmlFor = this._addUID("GPlocationOrigin_" + id);
    labelOrigin.innerHTML = text;
    labelOrigin.addEventListener("click", function (e) {
      var i = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(this.id);
      var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));

      for (var j = 0; j < points.length; j++) {
        var tag = points[j].childNodes[0].id;
        var id = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);
        document.getElementById(self._addUID("GPlocationPoint_" + id)).style.cssText = "";
      }

      document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "";
      document.getElementById(self._addUID("GPlocationOrigin_" + i)).value = "";
      document.getElementById(self._addUID("GPlocationPoint_" + i)).style.cssText = "";
      document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked = false;
      document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPlocationOriginVisible";
      document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPlocationOriginHidden";

      if (document.getElementById(self._addUID("GPlocationStageRemove_" + i))) {
        document.getElementById(self._addUID("GPlocationStageRemove_" + i)).className = "GPlocationStageRemove";
      }

      if (document.getElementById(self._addUID("GPlocationStageAdd"))) {
        document.getElementById(self._addUID("GPlocationStageAdd")).className = "";
      } // document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).disabled = true;


      self.onLocationClearPointClick(e);
    });
    return labelOrigin;
  },

  /**
   * Create Input AutoComplete Point tag
   *
   * @param {Number} id - tag ID
   * @returns {DOMElement} DOM element
   */
  _createLocationAutoCompleteteInputElement: function _createLocationAutoCompleteteInputElement(id) {
    // contexte d'execution
    var self = this;
    var inputOrigin = document.createElement("input");
    inputOrigin.id = this._addUID("GPlocationOrigin_" + id);
    inputOrigin.className = "GPlocationOriginVisible";
    inputOrigin.type = "text";
    inputOrigin.placeholder = "Saisir une adresse";
    inputOrigin.autocomplete = "off";
    inputOrigin.addEventListener("keyup", function (e) {
      var charCode = e.which || e.keyCode;

      if (charCode === 13 || charCode === 10 || charCode === 38 || charCode === 40) {
        return;
      }

      var i = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(this.id);

      if (document.getElementById(self._addUID("GPlocationOrigin_" + i)).value.length > 2) {
        document.getElementById(self._addUID("GPlocationAutoCompleteList_" + i)).style.display = "block";
      } else {
        document.getElementById(self._addUID("GPlocationAutoCompleteList_" + i)).style.display = "none";
      } // gestionnaire d'evenement :
      // on récupère la valeur de saisie pour une requête sur le service d'autocompletion.
      // le resultat de la requête nous permet de recuperer les coordonnées du point...


      self.onAutoCompleteSearchText(e);
    });
    inputOrigin.addEventListener("keydown", function (e) {
      var charCode = e.which || e.keyCode;
      var container = document.getElementById(self._addUID("GPlocationAutoCompleteList_" + id)); // si aucun container !?

      if (!container) {
        return;
      }

      var curr = container.getElementsByClassName("GPautoCompleteProposal current");
      var list = container.getElementsByClassName("GPautoCompleteProposal"); // si aucune suggestion, on ne va pas plus loin !

      var length = list.length;

      if (!length) {
        return;
      }

      var current = null; // si aucun item courant, on prend le 1er !

      if (!curr.length) {
        current = list[0];
        current.className = "GPautoCompleteProposal current";
        current.style.color = "#000000";
        current.style["background-color"] = "#CEDBEF";
        return;
      } else {
        current = curr[0];
      }

      var index = parseInt(_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(current.id), 10);
      var next = index === length - 1 ? list[0] : list[index + 1];
      var prev = index === 0 ? list[length - 1] : list[index - 1];
      current.style["background-color"] = "";
      current.style.color = "";
      prev.style["background-color"] = "";
      prev.style.color = "";
      next.style["background-color"] = "";
      next.style.color = "";

      switch (charCode) {
        case 38:
          // arrow up
          logger.log("arrow up");
          current.className = "GPautoCompleteProposal";
          prev.className = "GPautoCompleteProposal current";
          prev.style.color = "#000000";
          prev.style["background-color"] = "#CEDBEF";
          break;

        case 40:
          // arrow down
          logger.log("arrow down");
          current.className = "GPautoCompleteProposal";
          next.className = "GPautoCompleteProposal current";
          next.style.color = "#000000";
          next.style["background-color"] = "#CEDBEF";
          break;

        case 13:
          // enter
          logger.log("enter");
          current.click(e);
          break;
      }

      current.focus();
    });
    return inputOrigin;
  },

  /**
   * Create Input Coordinate Point tag
   *
   * @param {Number} id - tag ID
   * @returns {DOMElement} DOM element
   */
  _createLocationCoordinateInputElement: function _createLocationCoordinateInputElement(id) {
    // contexte d'execution
    var self = this;
    var inputOriginCoord = document.createElement("input");
    inputOriginCoord.id = this._addUID("GPlocationOriginCoords_" + id);
    inputOriginCoord.className = "GPlocationOriginHidden";
    inputOriginCoord.type = "text";
    inputOriginCoord.disabled = false;
    inputOriginCoord.addEventListener("click", function () {
      var i = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(this.id);
      document.getElementById(self._addUID("GPlocationOriginLabel_" + i)).click();
    });
    return inputOriginCoord;
  },

  /**
   * Create Show Pointer tag
   *
   * @param {Number} id - tag ID
   * @returns {DOMElement} DOM element
   */
  _createLocationPointerShowInputElement: function _createLocationPointerShowInputElement(id) {
    var inputOriginPointer = document.createElement("input");
    inputOriginPointer.id = this._addUID("GPlocationOriginPointer_" + id);
    inputOriginPointer.type = "checkbox";
    return inputOriginPointer;
  },

  /**
   * Create Input Pointer tag
   *
   * @param {Number} id - tag ID
   * @returns {DOMElement} DOM element
   */
  _createLocationPointerInputElement: function _createLocationPointerInputElement(id) {
    // contexte d'execution
    var self = this;
    var labelOriginPointer = document.createElement("label");
    labelOriginPointer.id = this._addUID("GPlocationOriginPointerImg_" + id);
    labelOriginPointer.htmlFor = this._addUID("GPlocationOriginPointer_" + id);
    labelOriginPointer.className = "GPlocationOriginPointerImg";
    labelOriginPointer.title = "Pointer un lieu sur la carte";
    labelOriginPointer.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var i = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(this.id);
      var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));
      var j;
      var tag;
      var id;

      for (j = 0; j < points.length; j++) {
        tag = points[j].childNodes[0].id;
        id = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);

        if (i !== id) {
          document.getElementById(self._addUID("GPlocationOriginPointer_" + id)).checked = false;

          if (document.getElementById(self._addUID("GPlocationOriginCoords_" + id)).value === "Pointer un lieu sur la carte") {
            document.getElementById(self._addUID("GPlocationOriginCoords_" + id)).value = "";
            document.getElementById(self._addUID("GPlocationOrigin_" + id)).className = "GPlocationOriginVisible";
            document.getElementById(self._addUID("GPlocationOriginCoords_" + id)).className = "GPlocationOriginHidden";
          }
        }
      }

      if (document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked) {
        document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "";

        for (j = 0; j < points.length; j++) {
          tag = points[j].childNodes[0].id;
          id = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);
          document.getElementById(self._addUID("GPlocationPoint_" + id)).style.cssText = "";
        }

        if (document.getElementById(self._addUID("GPlocationStageRemove_" + i))) {
          document.getElementById(self._addUID("GPlocationStageRemove_" + i)).className = "GPlocationStageRemove";
        }

        if (document.getElementById(self._addUID("GPlocationStageAdd"))) {
          document.getElementById(self._addUID("GPlocationStageAdd")).className = "";
        }

        document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked = false;
        document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPlocationOriginVisible";
        document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPlocationOriginHidden";
      } else {
        document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "Pointer un lieu sur la carte";

        for (j = 0; j < points.length; j++) {
          tag = points[j].childNodes[0].id;
          id = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);

          if (i === id) {
            document.getElementById(self._addUID("GPlocationPoint_" + id)).style.cssText = "";
          } else {
            document.getElementById(self._addUID("GPlocationPoint_" + id)).style.display = "none";
          }
        }

        if (document.getElementById(self._addUID("GPlocationStageRemove_" + i))) {
          document.getElementById(self._addUID("GPlocationStageRemove_" + i)).className = "GPlocationOriginHidden";
        }

        if (document.getElementById(self._addUID("GPlocationStageAdd"))) {
          document.getElementById(self._addUID("GPlocationStageAdd")).className = "GPlocationOriginHidden";
        }

        document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked = true;
        document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPlocationOriginHidden";
        document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPlocationOriginVisible";
        document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).disabled = true;
      } // gestionnaire d'evenement :
      // on stocke la valeur du point, utilisée pour la requête sur le service de calcul d'itiniraire


      self.onActivateMapPointClick(e);
    });
    return labelOriginPointer;
  },

  /**
   * Create Remove Point tag
   * see event !
   *
   * @param {Number} id - tag ID
   * @returns {DOMElement} DOM element
   */
  _createLocationRemovePointElement: function _createLocationRemovePointElement(id) {
    // contexte d'execution
    var self = this;
    var divRm = document.createElement("div");
    divRm.id = this._addUID("GPlocationStageRemove_" + id);
    divRm.className = "GPlocationStageRemove";
    divRm.title = "Supprimer l'étape";
    divRm.addEventListener("click", function (e) {
      var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));
      var last = points.length - 1;
      var start = points[0].childNodes[0].id;
      var end = points[last].childNodes[0].id;
      var startID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(start);
      var endID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(end);

      if (id !== startID && id !== endID) {
        var i = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(this.id);
        document.getElementById(self._addUID("GPlocationPoint_" + i)).className = "GPflexInput GPlocationStageFlexInputHidden";
        document.getElementById(self._addUID("GPlocationOrigin_" + i)).value = "";
        document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPlocationOriginVisible";
        document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "";
        document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPlocationOriginHidden";
        document.getElementById(self._addUID("GPlocationStageAdd")).style.display = ""; // Moving up exclusions picto
        // var exclusionsPictoTop = document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top;
        // document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top = (parseInt(exclusionsPictoTop) - 33).toString() + "px";
        // gestionnaire d'evenement :
        // on supprime le point, utilisé pour la requête sur le service d'itiniraire

        self.onLocationRemovePointClick(e);
      }
    });
    return divRm;
  },

  /**
   * Create Add Point tag
   * see event !
   *
   * @returns {DOMElement} DOM element
   */
  _createLocationAddPointElement: function _createLocationAddPointElement() {
    // contexte d'execution
    var self = this;
    var divAdd = document.createElement("div");
    divAdd.id = this._addUID("GPlocationStageAdd");
    divAdd.title = "Ajouter une étape";
    divAdd.addEventListener("click", function (e) {
      var lastStage = 1;
      var nbStages = 0;
      var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));

      for (var i = 1; i < points.length - 1; i++) {
        var tag = points[i].childNodes[0].id;
        var id = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);

        if (document.getElementById(self._addUID("GPlocationPoint_" + id))) {
          if (document.getElementById(self._addUID("GPlocationPoint_" + id)).className === "GPflexInput GPlocationStageFlexInputHidden") {
            if (lastStage === 1) {
              lastStage = id;
            }
          } else {
            nbStages++;
          }
        }
      } // FIXME algo à revoir : lastStage = id hors si id = 300 sur 3 points !?


      if (lastStage < points.length) {
        document.getElementById(self._addUID("GPlocationPoint_" + lastStage)).className = "GPflexInput GPlocationStageFlexInput"; // Moving down exclusions picto
        // var exclusionsPictoTop = document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top;
        // document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top = (parseInt(exclusionsPictoTop) + 33).toString() + "px";
      }

      if (nbStages === 4) {
        document.getElementById(self._addUID("GPlocationStageAdd")).style.display = "none";
      } // gestionnaire d'evenement :
      // on ajoute le point, utilisé pour la requête sur le service d'itiniraire


      self.onLocationAddPointClick(e);
    });
    return divAdd;
  },

  /**
   * Create Results autocompletion to the point
   * see event!
   *
   * @param {Number} id - tag ID
   * @returns {DOMElement} DOM element
   */
  _createLocationAutoCompleteResultElement: function _createLocationAutoCompleteResultElement(id) {
    // contexte d'execution
    var self = this;
    var div = document.createElement("div");
    div.id = this._addUID("GPlocationAutoCompleteList_" + id);
    div.className = "GPadvancedAutoCompleteList";

    if (div.addEventListener) {
      div.addEventListener("click", function (e) {
        self.onAutoCompletedResultsItemClick(e);
        document.getElementById(self._addUID("GPlocationAutoCompleteList_" + id)).style.display = "none";
      }, false);
    } else if (div.attachEvent) {
      div.attachEvent("onclick", function (e) {
        self.onAutoCompletedResultsItemClick(e);
        document.getElementById(self._addUID("GPlocationAutoCompleteList_" + id)).style.display = "none";
      });
    }

    return div;
  },

  /**
   * Autocompletion result to a point.
   * Proposals are dynamically filled in Javascript by autocomplete service
   *
   * TODO formaliser le contenu des reponse
   *
   * @param {Number} id - tag ID
   * @param {Object} location - suggested location result
   * @param {Number} n  - number of the point
   */
  _createLocationAutoCompletedLocationElement: function _createLocationAutoCompletedLocationElement(id, location, n) {
    var container = document.getElementById(this._addUID("GPlocationAutoCompleteList_" + id));
    var div = document.createElement("div");
    div.id = this._addUID("AutoCompletedLocation_" + n);
    div.className = "GPautoCompleteProposal";
    div.innerHTML = _Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_2__["default"].getSuggestedLocationFreeform(location);
    container.appendChild(div);
  },

  /**
  * Display Coordinate
  * @param {String} value - a Coordinate
  */
  GPdisplayCoordinate: function GPdisplayCoordinate(value) {
    var points = document.getElementsByClassName(this._addUID("GPlocationPoint"));

    for (var i = 0; i < points.length; i++) {
      var tag = points[i].childNodes[0].id;
      var id1 = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);

      if (document.getElementById(this._addUID("GPlocationOriginPointer_" + id1)).checked) {
        document.getElementById(this._addUID("GPlocationOriginCoords_" + id1)).value = value;
        document.getElementById(this._addUID("GPlocationOriginCoords_" + id1)).disabled = false;

        for (var j = 0; j < points.length; j++) {
          tag = points[j].childNodes[0].id;
          var id2 = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);
          document.getElementById(this._addUID("GPlocationPoint_" + id2)).style.cssText = "";

          if (document.getElementById(this._addUID("GPlocationStageRemove_" + id2))) {
            document.getElementById(this._addUID("GPlocationStageRemove_" + id2)).className = "GPlocationStageRemove";
          }
        }

        document.getElementById(this._addUID("GPlocationOriginPointer_" + id1)).checked = false;

        if (document.getElementById(this._addUID("GPlocationStageAdd"))) {
          document.getElementById(this._addUID("GPlocationStageAdd")).className = "";
        }

        return;
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (LocationSelectorDOM);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var GeocodeUtils = {
  /**
   * Return the freeform of a structured geocoded item
   *
   * @param {Object} geocodedLocation - Geocoded location
   * @returns {String} freeform string
   */
  getGeocodedLocationFreeform: function getGeocodedLocationFreeform(geocodedLocation) {
    var attributes = geocodedLocation.placeAttributes;

    if (attributes.label) {
      return attributes.label;
    } else if (geocodedLocation.type === "PositionOfInterest") {
      return attributes.postcode + " " + attributes.toponym;
    } else if (geocodedLocation.type === "StreetAddress") {
      return (attributes.housenumber ? attributes.housenumber + " " : "") + attributes.street + " " + (attributes.postcode ? attributes.postcode + ", " : "") + attributes.city;
    } else if (geocodedLocation.type === "CadastralParcel") {
      return attributes.id;
    } else {
      return "...";
    }
  },

  /**
   * Return the freeform of a structured suggested item
   *
   * @param {Object} suggestedLocation - Suggested location
   * @returns {String} freeform string
   */
  getSuggestedLocationFreeform: function getSuggestedLocationFreeform(suggestedLocation) {
    if (suggestedLocation.fullText) {
      return suggestedLocation.fullText;
    } else {
      var values = [];
      values.push(suggestedLocation.street || "");
      values.push(suggestedLocation.postalCode || "");
      values.push(suggestedLocation.commune || "");

      if (suggestedLocation.type === "PositionOfInterest") {
        values.push(suggestedLocation.poi || "");
        values.push(suggestedLocation.kind || "");
      }

      return values.join(" - ");
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GeocodeUtils);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
* implementation :
* cf. http://uihacker.blogspot.fr/2011/07/javascript-formatting-latitudelongitude.html?m=1
* cf. http://andrew.hedges.name/experiments/convert_lat_long/
* FIXME formater la sortie
* cf. http://mottie.github.io/javascript-number-formatter/
* cf. https://github.com/j-/number-formatter
*
*/

/** ... */
var PositionFormater = {
  /** ... */
  NORTH: "N",

  /** ... */
  SOUTH: "S",

  /** ... */
  EAST: "E",

  /** ... */
  WEST: "O",

  /** ... */
  digitSecond: 2,

  /** ... */
  digitDecimal: 5,

  /** ... */
  digitRadian: 8,

  /**
   * @param {Number} inputNum -inputNum
   * @param {Integer} numPoints - numPoints
   *
   * @returns {Number} rounded result
   */
  roundToDecimal: function roundToDecimal(inputNum, numPoints) {
    var multiplier = Math.pow(10, numPoints);
    return Math.round(inputNum * multiplier) / multiplier;
  },

  /**
   * @param {Number} location -location
   *
   * @returns {Number} location in radian
   */
  decimalToRadian: function decimalToRadian(location) {
    var d = 0.01745329251994329577;
    return this.roundToDecimal(location * d, this.digitRadian);
  },

  /**
   * @param {Number} location -location
   *
   * @returns {Number} location in grade
   */
  decimalToGrade: function decimalToGrade(location) {
    var d = 1.11111111111111111111;
    return this.roundToDecimal(location * d, this.digitRadian);
  },

  /**
   * @param {Number} location -location
   * @param {String} hemisphere -hemisphere
   * @param {Boolean} obj -specifies if an object must be returned
   *
   * @returns {String|Object} DMS (String or Object depending on obj parameter value)
   */
  decimalToDMS: function decimalToDMS(location, hemisphere, obj) {
    if (location < 0) {
      location *= -1; // strip dash '-'
    }

    var degrees = Math.floor(location); // strip decimal remainer for degrees

    var minutesFromRemainder = (location - degrees) * 60; // multiply the remainer by 60

    var minutes = Math.floor(minutesFromRemainder); // get minutes from integer

    var secondsFromRemainder = (minutesFromRemainder - minutes) * 60; // multiply the remainer by 60

    var seconds = this.roundToDecimal(secondsFromRemainder, this.digitSecond); // get minutes by rounding to integer

    var dms = degrees + "° " + minutes + "' " + seconds + "\" ";

    if (hemisphere) {
      dms += hemisphere;
    }

    if (obj) {
      return {
        d: degrees,
        m: minutes,
        s: seconds,
        direction: hemisphere
      };
    }

    return dms;
  },

  /**
   * @param {Number} location -location
   * @param {Boolean} obj -specifies if an object must be returned
   *
   * @returns {String|Object} DMS (String or Object depending on obj parameter value)
   */
  decimalLatToDMS: function decimalLatToDMS(location, obj) {
    var hemisphere = location < 0 ? this.SOUTH : this.NORTH; // south if negative

    return this.decimalToDMS(location, hemisphere, obj);
  },

  /**
   * @param {Number} location -location
   * @param {Boolean} obj -specifies if an object must be returned
   *
   * @returns {String|Object} DMS (String or Object depending on obj parameter value)
   */
  decimalLonToDMS: function decimalLonToDMS(location, obj) {
    var hemisphere = location < 0 ? this.WEST : this.EAST; // west if negative

    return this.decimalToDMS(location, hemisphere, obj);
  },

  /**
   * @param {Number} degrees -degrees
   * @param {Number} minutes -minutes
   * @param {Number} seconds -seconds
   * @param {String} hemisphere -hemisphere
   *
   * @returns {Number} decimal
   */
  DMSToDecimal: function DMSToDecimal(degrees, minutes, seconds, hemisphere) {
    var ddVal = degrees + minutes / 60 + seconds / 3600;
    ddVal = hemisphere === this.SOUTH || hemisphere === this.WEST ? ddVal * -1 : ddVal;
    var decimal = this.roundToDecimal(ddVal, this.digitDecimal);
    return decimal;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (PositionFormater);

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);


var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("icondefault");
/**  cf. http://leafletjs.com/reference.html#icon */

var IconDefault = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Icon.Default.extend(
/** @lends IconDefault.prototype */
{
  /**
  * Liste des icones
  *   TODO : image retina à convertir en x2...
  */
  images: {
    retina: {
      shadow: "data:image/png;base64,...",
      color: {
        blue: "data:image/png;base64,...",
        orange: "data:image/png;base64,...",
        red: "data:image/png;base64,...",
        green: "data:image/png;base64,..."
      }
    },
    shadow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5ElEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBNwU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzyBjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZhzMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmLNqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoBjq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOtiiajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF174H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzrWQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=",
    color: {
      blue: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAGmklEQVRYw7VXeUyTZxjvNnfELFuyIzOabermMZEeQC/OclkO49CpOHXOLJl/CAURuYbQi3KLgEhbrhZ1aDwmaoGqKII6odATmH/scDFbdC7LvFqOCc+e95s2VG50X/LLm/f4/Z7neY/ne18aANCmAr5E/xZf1uDOkTcGcWR6hl9247tT5U7Y6SNvWsKT63P58qbfeLJG8M5qcgTknrvvrdDbsT7Ml+tv82X6vVxJE33aRmgSyYtcWVMqX97Yv2JvW39UhRE2HuyBL+t+gK1116ly06EeWFNlAmHxlQE0OMiV6mQCScusKRlhS3QLeVJdl1+23h5dY4FNB3thrbYboqptEFlphTC1hSpJnbRvxP4NWgsE5Jyz86QNNi/5qSUTGuFk1gu54tN9wuK2wc3o+Wc13RCmsoBwEqzGcZsxsvCSy/9wJKf7UWf1mEY8JWfewc67UUoDbDjQC+FqK4QqLVMGGR9d2wurKzqBk3nqIT/9zLxRRjgZ9bqQgub+DdoeCC03Q8j+0QhFhBHR/eP3U/zCln7Uu+hihJ1+bBNffLIvmkyP0gpBZWYXhKussK6mBz5HT6M1Nqpcp+mBCPXosYQfrekGvrjewd59/GvKCE7TbK/04/ZV5QZYVWmDwH1mF3xa2Q3ra3DBC5vBT1oP7PTj4C0+CcL8c7C2CtejqhuCnuIQHaKHzvcRfZpnylFfXsYJx3pNLwhKzRAwAhEqG0SpusBHfAKkxw3w4627MPhoCH798z7s0ZnBJ/MEJbZSbXPhER2ih7p2ok/zSj2cEJDd4CAe+5WYnBCgR2uruyEw6zRoW6/DWJ/OeAP8pd/BGtzOZKpG8oke0SX6GMmRk6GFlyAc59K32OTEinILRJRchah8HQwND8N435Z9Z0FY1EqtxUg+0SO6RJ/mmXz4VuS+DpxXC3gXmZwIL7dBSH4zKE50wESf8qwVgrP1EIlTO5JP9Igu0aexdh28F1lmAEGJGfh7jE6ElyM5Rw/FDcYJjWhbeiBYoYNIpc2FT/SILivp0F1ipDWk4BIEo2VuodEJUifhbiltnNBIXPUFCMpthtAyqws/BPlEF/VbaIxErdxPphsU7rcCp8DohC+GvBIPJS/tW2jtvTmmAeuNO8BNOYQeG8G/2OzCJ3q+soYB5i6NhMaKr17FSal7GIHheuV3uSCY8qYVuEm1cOzqdWr7ku/R0BDoTT+DT+ohCM6/CCvKLKO4RI+dXPeAuaMqksaKrZ7L3FE5FIFbkIceeOZ2OcHO6wIhTkNo0ffgjRGxEqogXHYUPHfWAC/lADpwGcLRY3aeK4/oRGCKYcZXPVoeX/kelVYY8dUGf8V5EBRbgJXT5QIPhP9ePJi428JKOiEYhYXFBqou2Guh+p/mEB1/RfMw6rY7cxcjTrneI1FrDyuzUSRm9miwEJx8E/gUmqlyvHGkneiwErR21F3tNOK5Tf0yXaT+O7DgCvALTUBXdM4YhC/IawPU+2PduqMvuaR6eoxSwUk75ggqsYJ7VicsnwGIkZBSXKOUww73WGXyqP+J2/b9c+gi1YAg/xpwck3gJuucNrh5JvDPvQr0WFXf0piyt8f8/WI0hV4pRxxkQZdJDfDJNOAmM0Ag8jyT6hz0WGXWuP94Yh2jcfjmXAGvHCMslRimDHYuHuDsy2QtHuIavznhbYURq5R57KpzBBRZKPJi8eQg48h4j8SDdowifdIrEVdU+gbO6QNvRRt4ZBthUaZhUnjlYObNagV3keoeru3rU7rcuceqU1mJBxy+BWZYlNEBH+0eH4vRiB+OYybU2hnblYlTvkHinM4m54YnxSyaZYSF6R3jwgP7udKLGIX6r/lbNa9N6y5MFynjWDtrHd75ZvTYAPO/6RgF0k76mQla3FGq7dO+cH8sKn0Vo7nDllwAhqwLPkxrHwWmHJOo+AKJ4rab5OgrM7rVu8eWb2Pu0Dh4eDgXoOfvp7Y7QeqknRmvcTBEyq9m/HQQSCSz6LHq3z0yzsNySRfMS253wl2KyRDbcZPcfJKjZmSEOjcxyi+Y8dUOtsIEH6R2wNykdqrkYJ0RV92H0W58pkfQk7cKevsLK10Py8SdMGfXNXATY+pPbyJR/ET6n9nIfztNtZYRV9XniQu9IA2vOVgy4ir7GCLVmmd+zjkH0eAF9Po6K61pmCXHxU5rHMYd1ftc3owjwRSVRzLjKvqZEty6cRUD7jGqiOdu5HG6MdHjNcNYGqfDm5YRzLBBCCDl/2bk8a8gdbqcfwECu62Fg/HrggAAAABJRU5ErkJggg==",
      orange: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABghJREFUWMOdl1uInGcdxn/feWa+mflmJmZbqVqKigewKK5goHgRSEm8EC88F6tBFLfgZbzJnVdRYWExrVBoXazWlAYL0dVisLBYzEUUSbeNjZQmxGZ3NjO7c57v/P69mNnD7MzuzvrCA8PM+/+e93n+h/cb7c9PzXKE9RHAG36+BXRPP3390CDtT3MHklSA7wKngVOWbaOhA5AkEUqpKnAFePHMM9eX9yeZrMQAzgHni14ln826ZLLu2KY0TfD7XXq9NoHffxX48Zmnr6+MkSyNK6kAl4ql8qlisYxpWagoJA16gIxs1E0bI1cAoNNuslFb94Env/jM9csj+0SEXaiIyN+9cuVU5dhxdEmI23XSoAOoIckOVBISt+vE7Q0KRY8H3v+BbM7Nv7w0Nzs3QrLHopdL5crHyqUKSbdB6ndA1BRIiVs1Mo5NySsD/GJpbvbkjpKds50rFL2T5VKZpNdAkmjiAzXDHOye8FvS2cC2LWZmHjAELv1xbrYyIFGCKKmIkvMlr4iK+0gaDe0ZQHcyWIUyVqGMmDZWvoRVKGO63sg+UMSdGq6bo+R5x0XJuYFdGqDxLa9UzJumQRp0R3y3ChU002Zjc5Pbd+6wGem8e/sO6+vrBGGIVagMTdmJScMepZIHGj/4ww8/a5jDevl63s2h4nAgfbhM1yOMQt67V+WjZ87y+VNPYmXzANz7x19YufQzilFIySsTt+vbcSrsYTlZnEymEgTBCV2U5EXJiUzGJg1aI9I1w6DZbPHoE+f5+Jee2iYAeGj2cR479zyNjo+SFN12xqzLZRxEyWld4EOWbRmIApVuJ1E3LaIwRLkzPPzYl8caUURwZz7Iw1/4Cq1WG8POjBSBCvvYtonAJ3URqeiaNlYpuuXg+wHlRz41kQBAKUX5w5+m1/PHKk7SBF0DEfFMgUjJMGnaro7WFGig0nhfAhEhjQI0TRuL1wwNFSkEfF2Ee3GSjp0kDXq4WZv7b19HJeNEWySrN/5G3nUQlezpJ4MkTRHhni4i1ThOuipNByfakhsHmIZGRnV565WLYyoA1t68RuONq3j5DKnfHiXRdKIoRkTuGl/9zIMCfC7rGJ/I5vOocGsQCoiQz7vc/8+/WH37BrnKgzjFY7RWb/Pu8mVWLv2UmUoOxzYGJFtxmobhZFmrd0hS9SPtpbOPApx0s/ZfH3moRNyujU5aO4eRcWl2AjZbPn6YYFsGXt6h4mUxDX0sxioep9kJeG+9ffVrz994fKsZX+v60bVuPzzhFo6RdHY1VtRDEp9S4RilgjPyMBX2iXu90dIbFsFm20fgJwCm7BTEzzda/u/zrjVspl2JVoq4vc40yyrO0OqGdPvxa9/41Y3XYfQ+udLshO8EQYyZK0454idAKTYafUTkwrblu0Z9KjBfb/pouvl/EZhuma4f0e7H//zm4htXt0n23HaL9VZQS5IU3c4emUTTNOoNH9hRsVcJAr7As7VWgJHJDTp4SpiFMv0oodGLbwm8MkoyescjIgtrm4GvlEI37SOo0Kk1AkTkwhOLK+keEtiDmggv1FshRrYwFYGRLRJEKfV2fFeEF/dW3F67tjB/txamIoKm65N37IJu2dRaEQLz3/71m9E4ybhdiMgtEVna7EQY+Qoial/oTo4oTqk2opqIPDepd/QDzjh/vxmDOtgq3cqy3ogQuPidF97qTiaZrAQRWW776bVOkGIW3jfZJidHqoTVRtwVkYX9psCkxO/GwnojRhvMlvGE2zmqzRgRfnn2Nzdb+5McnNbL9a56x48FI+vtSbaDaPDfjSQSmD9onh1kFyKSishCtZmgW/ZY2a5txojI4vd+e7N6CMmBdiHC4lojrcWpoDsuIGimhYhwp5amIlzgkKUf1gMgXZBnq40Ew8kNBmGuxHozAeSl7//u37cPJTmUYoCLdzdVJMNcgLDWFoTDVUxrFyJURVisNhVGzqPWVvQCWRJhZSqS4Qv3NFhYaw10rbUENC4MansaJYO/DtPgZi+QK7W20OrLsih5XZRMSTJdTrZHzWpzkIut76az62hrueXzHPDqUYL+B8XVKUzuUimfAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEyLTA4LTE4VDE0OjUwOjU2KzAxOjAwFlCkXwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMi0wOC0xOFQxNDo1MDo1NiswMTowMGcNHOMAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
      red: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABe5JREFUWMOdlWuIXGcZx3/nPbe5ZWbO2c0a8VIEpSq0io2QBT8FUlIFEbzfokUUKfgxIuSbn+JtYTEQqFQCQmkxVIiNFhcLwZoVtrFNt40ESrPEJju7s/eZM+f+Pn6Y2XVnZ3Zn0/fwcA7veZ/ze5//87zPMf56fJIHGB8Far3n20D79Nz1kU7GXw6G+MD3gdPAKdtxMJQFQJZEaK0bwBXg2Sfmrl87AHJi2LwJnAXOVf3xSrFcoVAuDyzKs4yw3SLY2iTqBC8BP31ibnZ+AHJ1MBIfeK7qeaeqno9l2+g4IQ86ILpvoXIczCMVAFob66wuLYXAmc/PXb/cB3nxsRN7AdfrY2MPe+Pj6Cjufnyk6Aa2XyfshLQ21glarae+8OrsxZ3N7JHoj3Xff9jzx8jWN8hbbdB6tOU5aXOVguNQ98YAfnv1+OTJHYgAPTt7pFY76Xk+2fo6kiSg8wEzLLMr25B32eoqjm0x8b5jpsBzLx6f9LsQARF8Ec7Vq1V0J0CSuM9ZFVxsr47t1RHHxq7XsL06Vq06AEqby5RLReq12lERzvbkEkC+VatWKpapyNtt6JERwfY9DMdmdW2NOwsLrCmDdxYWWFpaIopjbN/rarLLJw8C6rUqID/682MnTEsQgK9XSiV0nHQ17g2rViWOI95tLPOxJ89w4sx3sCvdarr3txnmf/kbqnFE3auTrqzu+OkgwC4WcAuuH0XRpBKhIsJkwbHJN9f79TcVG5tbPHruZ3z8qR/vAAA+8PgpPvf737Eehug8Rbn2gHQl10WE00rgw7ZtmdtVspMH2yKJY/TEBA996YsDVSsilD/0QR76ypfZ3GphFgp9AN3p4FgmAp9UIuIrQw2UpXJdwijGe+SRoQAArTXepz9FEEbdfOzylyxHddfWLEESLbpblrtPtM4AQafJvgARIY8iDMMY8DcM6a5BQiUY99I8H9hJHgSUHZvluVfRaToA2obc/8c/qbg2kqV9/oapyPIcwbinRKSRZnlb53l3R9vhRjGWAYV2i7cuXByIAmBx9l+sz8xQK7jkW1v9EKVI0hQRuWt+9dj7Bfhs0VSfKFZK6CDoq/lKucTya69x/+Y8pWPHcMd8Nu8s8M7lF5j/xa+ZKBVwTdWFbPsZBmaxwGIrINP6J8bzj34G4GTZcf7+kXqFtNns77SlMma5xEaUsBbGhFmGY5rUXBu/6GIpNeBjHz3KRpTw7lZ75ms3bzxudQXg5XaSzLbjZLI8Nka2srLrYLWRqEPdH6Pu2n0f050OaRD0l54yQIS1MELg5wDbEIBfrYbRCxW3MvDfkEyTLi+NavjdKMYn2Ixi2mn28jdu3nil1yCFnl3ZiNO3ozjtNb5DtPihbV+z2okRkfPDWn0uMLUSxhim9Z4AlufRThK20uzGN9/498wOhN0HUfSllShuZnmOKhXZ826kGYbBSicG0ed3S7g7EgRCgaebYYxZLvW/GWGW79HJM9bT7LbAn/oh/8/Jtk0vRkmotUY5zqGlMpSi2cvFt+dfz/dEYrDHmoLxh5Uwxjxy5FAAs1olynJWUn1XMJ7dW3FKGHpN3Y2yXEQwTDVSKuU6NKMEQaa+++brySBkUC5E5LaIXF2LE0zfR7Te11SpRJLlNJK8KSLPDDs76oA9Ti3H+UipVLHIUpggcOF7b73RHg4ZHgkicm0r17OtLMc6Oj5cpnKJXAv3U90Wken9uoAaUZzTS1GGIQxPeLFEI04RuPjkrfnN9wq5vKJ5OxTBrNb2JNtFFPw3lURg6qB+dpBciEguItONOEO5zkDZLoYpInLpB7fmGwdDRp/nS4sZzVQEVS6DCIZjIyIspOQC5xkx1O6/4D7WRuTpRpRhlkrdRlirsxRnIPL8D//z5p2RkH0O497rwt2cRBBUwQWExVwQZGQUPchAWxlmDcG41Eg0Zq1GM9EEoq4KxvyhIA/QaacXs+5z736+O3+YSEamZMduBaKuNFNhU9Q1EV6RwzEOnZOdxnk/7eZie+aQcj3QuLaJegZ46UGc/gcUeTtzDg/o4wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wOC0xOFQxNDo1MDo1NiswMTowMBZQpF8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDgtMThUMTQ6NTA6NTYrMDE6MDBnDRzjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
      green: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wJCgoDDgqHD/MAAAZVSURBVFjDpZZtiFxXGcd/c+69M7PzurvdTTZNGvxQTCJqFSok+MmFQPSDUlsQhBaxWNhorQlWPxSKTYqsFLYGA8VCISDESIpCILYQW4xJNtHGGBooZtl16UrKNrMvM7N3Xu6555zHD7OZ7OzsW/Be/nBnznnO/zzP83/OcxKPv/IOW32KXzj2KFBc/nm7cuvl8IOXD21ql3j8lT9vsOjxfuB7wCHgoAoUCV8BYJsWRGaBc8DpvzwxfnF9kl90kxQ+f9wDXgReyg9kc8VkH4Wg2DUvdpqyXqRcKxOH5l3gZ+89OX5rDZLzqwhe7QfOZAcyB4fSO0h6KbSNqNt6F0lSJcn4WQA+bcyycHehATzz3pPjb6+cp0SEe8jvOdYvsRvPDmQOPpLZjRXLYjRPzYSIuC5EtsliNE9ZL7ItvY2dD+/sSRaDs8Nn9o90kLQ92HvcA87mduT27Mw8QiWuUDMhVuymMC5mPpoj42UYyu0A+M3wmf3D90lEQATgxfT29PDDPTup6jKx08gar6+CNf8XhEW9QEqlGNw16AFnhs/s72+FC6Gw79V+4KXtPUPUbZ3IRR07DVSSQlCkEBRRCdX+zvn5Lq/mohKFoEh2KDO4LB4ULUe+mxpI5RSKMA5xIm0Ug16SKsknjTtMfTxFGIdMfTzFzOIMoVmiGPQCdNjUTY3B9HZEeO5rv9/v+YggwncK6QKxxB3qyQU5aibk7iclvv3YUzz91WfJ+wUALsy+w+sf/opGusFgahuLerFt17BN0l4PQc7v10vmgJ/f98sccCDjZ5mP5jpIvITHYljm+QNH+NaupzrGDg59nc/m9/KDC08TD8UEyqdhG+1xh8PP+eglc0jhZLeXUp4V2yFPPxFQNzWymWwXAYAg7M5+hm/s+yZzzRIpL91hXzc1kioAJ59TQH9C3WOXNlJeitCEfLH3S2sSAFgxPNb7ZXQl7rJ3IiRaCxd9caLFgXUGcdJeyDiDiKBdtC6BE6FhGygv0WUvnsOKRZw0FHDHRg6HdCzWtHXyQZ4bn17HrBKEFdNaAMel0l/xcz5WbOd5hcI4A3BHiWPWaReKuNYOjEOMw2hDggQudpyceL3DC9cqXsZLl7g+9Q8KQYEls9S2FePwEgrbsIhjxuvb+2tJDYx/RXJuXzbI0dRR+xBwypDtyXLrvx9yLbzC9vR2HkoO8J9wkrMzp/nt+Bv0DKbwVUCj0VxxeEAQJKneDRErz/siAk5ONueiJzI7MrAirroe4zJC70NFphem+PnkUWzkUH6CZG9A364iXsKjulTprK98nqV6Fde0F/72/Q8+8hGh8u+fvl/Y89rVWn/tQDaXI6wu3e8ZYYzxLflsjlymU2UN2yAO4zUbVXNeIyLHAHzuJ/w1XY7/mN7mWKUBJHZUy9UttehsMUtYD7EN8/6lZ69fBmiFCxDLuWhBT0b90aN+zm9r/0EfEdfywjLaddRXJ45aYCxa0PjKp53FB0CqN0mzGWFC88/Lz12/sKIzrpjn5FRzLioZZ/B6fMTxQFAkiBY04mS0szOuYKlOHG0g8mazFOGlFGJly0jmfXQ9Rpf1bUT+tG6PX87PiWg+aiDgpbyWpLeARKCIyjHA6JWRG3ZVjxdWojJxpAT8rjkX4We9LSU7KATYhiWu6Bng9OpxtVYCxTHWLEX2XmE6tzGUnyAqx4hj7MrIDd1FsjpcIkJl4oXbYuW8rhqSfUkkduvCSymsdkRzUUmsvLWWp2o9OYqTsWhRb6pcP+ujyzHi5OTVH/8rXJNkLU9EhOrUCxdNzVw1NUN6ILlmsv2MhxhHcy4KgRPr5awr8Z3ghC7r5Uru3oif8YgWNMAb135ys7I+yYbx4O24aiZt5Ej2JjsvGSkPBKJ5rRHGNlLfuuESESqTP7IiLW+UrxBLG0E+aFW3cOrakZuzG5JsHC4BOKUrpuRM64ojTlB+AhGhOa8tMLpZHanN1FOZ/GEIvBlXYvweBSIk+wJ0q7r/8PejN6c3JdnSCevkZLSgtdhWLsSBLmtYdRD+H+ESKlOHZ8XJqbgaExQC4iWD0+58Zerwra2RbM7B8qX8hK7EiBN0WSPC6OoOun5O2NpbnT78kdXunKlbbOQuVqcPX5YtsqgH636M6bIGYbTj/rN5Trb+VKdHLtqme6s6PfLug9j9D/FCc1g2qf7VAAAAAElFTkSuQmCC"
    }
  },

  /**
   * constructor
   * (extend to L.Icon.Default)
   *
   * @param {String} color - blue, green or red, blue by default.
   * @param {Object} options - options of L.Icon
   */
  initialize: function initialize(color, options) {
    // on merge les options avec celles par defaut
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(this.options, options);
    var _color = null;
    var _images =
    /* (L.Browser.retina) ? this.images.retina : */
    this.images;

    switch (color) {
      case "red":
        _color = _images.color.red;
        break;

      case "green":
        _color = _images.color.green;
        break;

      case "orange":
        _color = _images.color.orange;
        break;

      case "blue":
        _color = _images.color.blue;
        break;

      default:
        _color = _images.color.blue;
    } // icones classiques


    this.options.iconUrl = _color;
    this.options.shadowUrl = _images.shadow; // icones pour écran Retina

    if (leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Browser.retina) {
      this.options.iconRetinaUrl = _color;
      this.options.shadowRetinaUrl = _images.shadow;
    }
  },

  /**
   * Overload function to ensure compatibility between versions 0.7.X and 1.0.X
   * (extend to L.Icon._getIconUrl)
   *
   * @param {String} name - name
   *
   * @returns {String} url
   *
   */
  _getIconUrl: function _getIconUrl(name) {
    logger.trace("OVERWRITTEN L.Icon.Default._getIconUrl(" + name + ")");
    return leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Icon.prototype._getIconUrl.call(this, name);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (IconDefault);

/***/ }),
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var geoportal_access_lib_src_Services_Route_Route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(108);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_CSS_GProute_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _Common_CSS_GProute_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GProute_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CSS_Controls_Route_GProuteLeaflet_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _CSS_Controls_Route_GProuteLeaflet_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_CSS_Controls_Route_GProuteLeaflet_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(34);
/* harmony import */ var _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(60);
/* harmony import */ var _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(36);
/* harmony import */ var _LocationSelector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(62);
/* harmony import */ var _Common_Controls_RouteDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(115);











var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_6__["default"].getLogger("route(plus)");
/**
 * @classdesc
 *
 * Leaflet Control Class to compute and display route between start and end points using routing service of the geoportal platform.
 *
 * Use {@link module:Controls.Route L.geoportalControl.Route()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control" target="_blank">L.Control</a> native class.
 *
 * @namespace
 * @alias L.geoportalControl.Route
 */

var Route = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Control.extend(
/** @lends L.geoportalControl.Route.prototype */
{
  includes: _Common_Controls_RouteDOM__WEBPACK_IMPORTED_MODULE_10__["default"],

  /**
   * Options du service
   *
   * @private
   */
  options: {
    position: "topleft",
    collapsed: true,
    // plier !
    graphs: ["Voiture", "Pieton"],
    exclusions: {
      toll: false,
      tunnel: false,
      bridge: false
    },
    disableReverse: false,
    routeOptions: {},
    // FIXME a t on besoin des options de ce service ?
    autocompleteOptions: {}
  },

  /**
   * @constructor Route
   * @private
   * @param {Object} options - options for function call.
   * @param {String}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
   * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
   * @param {String}  [options.position = "topleft"] - position of component into the map, 'topleft' by default
   * @param {Boolean} [options.collapsed = false] - collapse mode, false by default
   * @param {Object}  [options.exclusions = {"toll" : false, "tunnel" : false, "bridge" : false}] - list of exclusions with status
   * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of resources, by default : ["Voiture", "Pieton"], and the first element is selected
   * @param {Boolean} [options.disableReverse = false] - whether to enable/disable the reverse geocoding
   * @param {Object}  [options.autocompleteOptions = {}] - options of autocomplete service
   * @param {Object}  [options.routeOptions = {}] - options of route service
   * @example
   *  var route = L.geoportalControl.Route({
   *      position : "topright",
   *      collapsed : true,
   *      exclusions : {
   *         "toll" : true,
   *         "bridge" : false,
   *         "tunnel" : true
   *      },
   *      graphs : ['Pieton', 'Voiture'],
   *      autocompleteOptions : {},
   *      routeOptions : {}
   *  });
   */
  initialize: function initialize(options) {
    // on transmet les options au controle
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.setOptions(this, options);
    /** uuid */

    this._uid = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_8__["default"].generate(); // initialisation

    this._initTransport();

    this._initExclusions();

    this._initComputation();
    /** container principaux */


    this._showRouteContainer = null;
    this._pictoRouteContainer = null;
    this._waitingContainer = null;
    this._formRouteContainer = null;
    this._resultsRouteContainer = null;
    /** detection du support : desktop ou tactile */

    this._isDesktop = this._detectSupport();
    /** liste de points selectionnée */

    this._currentPoints = [];
    /** Mode de transport selectionné : 'Voiture' ou 'Pieton' */

    this._currentTransport = null;
    /** Mode de calcul selectionné : 'Plus rapide' ou 'plus court' */

    this._currentComputation = null;
    /** Exclusions selectionnées : Tunnel, Toll et Bridge */

    this._currentExclusions = [];
    /** la geometrie du parcours */

    this._geojsonRoute = null;
    /** la geometrie des troncons */

    this._geojsonSections = null;
    /** si un calcul est en cours ou non */

    this._waiting = false;
    /** timer pour cacher la patience après un certain temps */

    this._timer = null;
    /**
     * reponse du service
     * Ex. {
     *   totalTime, totalDistance, bbox, routeGeometry,
     *   routeInstructions : [{duration, distance, code, instruction, bbox, geometry}]
     * }
     */

    this._currentRouteInformations = null;
    /**
     * liste des ressources avec droits par service
     * Ex. {
     *   "Route" : {
     *       key : "ger4g456re45er456t4er5ge5",
     *       resources : ["Pieton", "Voiture"]
     *   }
     * }
     */

    this._resources = {};
    /** aucun droits sur les ressources */

    this._noRightManagement = false; // gestion des droits sur les ressources/services

    this._checkRightsManagement();
  },

  /**
   * this method is called by this.addTo(map) when the control is added on the map
   * and fills variable 'this._container = this.onAdd(map)',
   * and create or disable events on map.
   *
   * @param {Object} map - the map
   *
   * @returns {DOMElement} DOM element
   *
   * @private
   */
  onAdd: function onAdd(map) {
    // initialisation du DOM du composant
    var container = this._container = this._initLayout(map); // deactivate of events that may interfere with the map


    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomEvent.disableClickPropagation(container).disableScrollPropagation(container);
    return container;
  },

  /**
   * TODO this method is called when the control is removed from the map
   * and removes events on map.
   *
   * @private
   */
  onRemove: function
    /* map */
  onRemove() {},
  // ################################################################### //
  // ####################### init application ########################## //
  // ################################################################### //

  /**
   * this method is called by the constructor and initialize the ...
   *
   * @private
   */
  _initTransport: function _initTransport() {
    // Mode de transport selectionné
    this._currentTransport = "Voiture"; // par defaut
    // par defaut

    var transport = this.options.graphs;

    if (!transport || transport.length === 0) {
      this.options.graphs = ["Voiture", "Pieton"];
    } // option


    if (leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.isArray(transport) && transport.length) {
      // FIXME pb si le 1er graphe n'est pas une ressource connue !
      if (transport[0] === "Voiture" || transport[0] === "Pieton") {
        this._currentTransport = transport[0];
      }
    } // TODO option sur le service


    var serviceOptions = this.options.routeOptions;

    if (serviceOptions.graph) {
      this._currentTransport = serviceOptions.graph;
    }
  },

  /**
   * this method is called by the constructor and initialize the ...
   *
   * @private
   */
  _initComputation: function _initComputation() {
    // Mode de calcul selectionné
    this._currentComputation = "fastest"; // par defaut
    // TODO option sur le service

    var serviceOptions = this.options.routeOptions;

    if (serviceOptions.routePreference) {
      this._currentComputation = serviceOptions.routePreference;
    }
  },

  /**
   * this method is called by the constructor and initialize the ...
   *
   * @private
   */
  _initExclusions: function _initExclusions() {
    // Exclusions selectionnées : Tunnel, Toll et Bridge
    this._currentExclusions = []; // par defaut
    // par defaut

    var exclusion = this.options.exclusions;

    if (!exclusion || Object.keys(exclusion).length === 0) {
      this.options.exclusions = {
        toll: false,
        tunnel: false,
        bridge: false
      };
    } // option


    if (exclusion && Object.keys(exclusion).length) {
      for (var k in exclusion) {
        if (exclusion.hasOwnProperty(k)) {
          if (exclusion.k) {
            this._currentExclusions.push(k);
          }
        }
      }
    } // TODO option sur le service


    var serviceOptions = this.options.routeOptions;

    if (leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.isArray(serviceOptions.exclusions)) {
      this._currentExclusions = serviceOptions.exclusions;
    }
  },
  // ################################################################### //
  // ############################## other init ######################### //
  // ################################################################### //

  /**
   * this method is called by constructor
   * and check the rights to resources
   * FIXME à revoir...
   *
   * @private
   */
  _checkRightsManagement: function _checkRightsManagement() {
    var _opts = null;
    var _res = [];
    var _key = null; // les ressources du service du calcul d'Itineraire

    _key = this.options.routeOptions.apiKey;
    _opts = this.options.routeOptions.filterOptions;
    _res = _opts ? _opts.type : [];

    if (!_res || _res.length === 0) {
      _res = ["Voiture", "Pieton"];
    }

    var rightManagementRoute = _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_7__["default"].check({
      key: _key || this.options.apiKey,
      resources: _res,
      services: ["Itineraire"]
    }); // les ressources du service d'autocompletion

    _key = this.options.autocompleteOptions.apiKey;
    _opts = this.options.autocompleteOptions.filterOptions;
    _res = _opts ? _opts.type : [];

    if (!_res || _res.length === 0) {
      _res = ["StreetAddress", "PositionOfInterest" // "CadastralParcel"
      ];
    }

    var rightManagementAutoComplete = _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_7__["default"].check({
      key: _key || this.options.apiKey,
      resources: _res,
      services: ["AutoCompletion"]
    }); // au cas où pas de droit !

    if (!rightManagementRoute && !rightManagementAutoComplete) {
      this._noRightManagement = true;
    } // FIXME je reconstruis differement la structure pour la gestion des clefs differentes
    // pour chaque service...


    if (rightManagementAutoComplete) {
      this._resources["AutoCompletion"] = {};
      this._resources["AutoCompletion"]["resources"] = rightManagementAutoComplete["AutoCompletion"];
      this._resources["AutoCompletion"]["key"] = rightManagementAutoComplete["key"];
    }

    if (rightManagementRoute) {
      this._resources["Itineraire"] = {};
      this._resources["Itineraire"]["resources"] = rightManagementRoute["Itineraire"];
      this._resources["Itineraire"]["key"] = rightManagementRoute["key"];
    }
  },

  /**
   * TODO this method is called by the constructor.
   * this information is useful to switch to touch mode.
   * Detection : test for desktop or tactile
   *
   * @returns {Boolean} is desktop
   *
   * @private
   */
  _detectSupport: function _detectSupport() {
    // TODO
    // Choix de gérer la détection dans le code du composant au lieu du DOM car :
    // Utilisation de l'implémentation Leaflet
    // http://leafletjs.com/reference.html#browser
    var isDesktop = true;
    var userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipod") !== -1 || userAgent.indexOf("ipad") !== -1 || userAgent.indexOf("android") !== -1 || userAgent.indexOf("mobile") !== -1 || userAgent.indexOf("blackberry") !== -1 || userAgent.indexOf("tablet") !== -1 || userAgent.indexOf("phone") !== -1 || userAgent.indexOf("touch") !== -1) {
      isDesktop = false;
    }

    if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1) {
      isDesktop = true;
    }

    return isDesktop;
  },
  // ################################################################### //
  // ########################### init dom ############################## //
  // ################################################################### //

  /**
   * this method is called by this.onAdd(map)
   * and initialize the container HTMLElement
   *
   * @param {Object} map - the map
   *
   * @returns {DOMElement} DOM element
   *
   * @private
   */
  _initLayout: function _initLayout(map) {
    // create main container
    var container = this._createMainContainerElement();

    var inputShow = this._showRouteContainer = this._createShowRouteElement();

    container.appendChild(inputShow); // mode "collapsed"

    if (!this.options.collapsed) {
      inputShow.checked = true;
    }

    var picto = this._pictoRouteContainer = this._createShowRoutePictoElement();

    container.appendChild(picto);

    var routePanel = this._createRoutePanelElement(); // header form


    var routeHeader = this._createRoutePanelHeaderElement();

    routePanel.appendChild(routeHeader); // form

    var routeForm = this._formRouteContainer = this._createRoutePanelFormElement(); // form: menu des points


    var points = this._createRoutePanelFormPointsElement(map);

    for (var i = 0; i < points.length; i++) {
      routeForm.appendChild(points[i]);
    } // form: menu des modes


    var choice = this._createRoutePanelFormModeChoiceElement();

    choice.appendChild(this._createRoutePanelFormModeChoiceTransportElement(this.options.graphs));
    choice.appendChild(this._createRoutePanelFormModeChoiceComputeElement());
    routeForm.appendChild(choice); // form: menu des exclusions

    routeForm.appendChild(this._createShowRouteExclusionsElement());
    routeForm.appendChild(this._createShowRouteExclusionsPictoElement());

    var exclusion = this._createRoutePanelFormExclusionsElement();

    exclusion.appendChild(this._createRoutePanelFormExclusionOptionsElement(this.options.exclusions));
    routeForm.appendChild(exclusion); // form: bouton du calcul

    var submit = this._createRouteSubmitFormElement();

    routeForm.appendChild(submit);
    routePanel.appendChild(routeForm); // results

    var routeResults = this._resultsRouteContainer = this._createRoutePanelResultsElement();

    routePanel.appendChild(routeResults); // waiting

    var waiting = this._waitingContainer = this._createRouteWaitingElement();

    routePanel.appendChild(waiting);
    container.appendChild(routePanel);
    return container;
  },
  // ################################################################### //
  // ############################## DOM ################################ //
  // ################################################################### //

  /**
   * Create List Points
   * FIXME OVERWRITTEN RouteDOM._createRoutePanelFormPointsElement() !
   *
   * @param {Object} map - the map
   *
   * @returns {Array} List DOM element
   *
   * @private
   */
  _createRoutePanelFormPointsElement: function _createRoutePanelFormPointsElement(map) {
    var points = [];
    var count = 1; // point de depart

    var start = new _LocationSelector__WEBPACK_IMPORTED_MODULE_9__["default"]({
      apiKey: this.options.apiKey || null,
      tag: {
        id: count,
        unique: this._uid,
        label: "Départ",
        color: "blue",
        display: true
      },
      disableReverse: this.options.disableReverse,
      autocompleteOptions: this.options.autocompleteOptions || null
    });
    start.setMap(map);
    var opts = this.options.routeOptions;

    if (opts.startPoint) {
      start._inputAutoCompleteContainer.value = opts.startPoint.x + " , " + opts.startPoint.y;
      start.setCoordinate({
        lng: opts.startPoint.x,
        lat: opts.startPoint.y
      });
    }

    points.push(start.getContainer());

    this._currentPoints.push(start); // points intermediaires


    for (count = 2; count < 7; count++) {
      var step = new _LocationSelector__WEBPACK_IMPORTED_MODULE_9__["default"]({
        apiKey: this.options.apiKey || null,
        tag: {
          id: count,
          unique: this._uid,
          label: "Etape",
          color: "green",
          display: false,
          removeOption: true
        },
        disableReverse: this.options.disableReverse,
        autocompleteOptions: this.options.autocompleteOptions || null
      });
      step.setMap(map);
      points.push(step.getContainer());

      this._currentPoints.push(step);
    } // point d'arrivé


    var end = new _LocationSelector__WEBPACK_IMPORTED_MODULE_9__["default"]({
      apiKey: this.options.apiKey || null,
      tag: {
        id: count,
        unique: this._uid,
        label: "Arrivée",
        color: "red",
        display: true,
        addOption: true,
        removeOption: false
      },
      disableReverse: this.options.disableReverse,
      autocompleteOptions: this.options.autocompleteOptions || null
    });
    end.setMap(map);

    if (opts.endPoint) {
      end._inputAutoCompleteContainer.value = opts.endPoint.x + " , " + opts.endPoint.y;
      end.setCoordinate({
        lng: opts.endPoint.x,
        lat: opts.endPoint.y
      });
    }

    points.push(end.getContainer());

    this._currentPoints.push(end);

    return points;
  },
  // ################################################################### //
  // ####################### handlers events to dom #################### //
  // ################################################################### //

  /**
   * this method is called by event 'click' on ''
   * tag label (cf. this._createShowRoutePictoElement),
   * and it cleans all value of input.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onShowRoutePanelClick: function onShowRoutePanelClick(e) {
    logger.log("onShowRoutePanelClick", e); // clean !

    if (!this._geojsonSections) {
      this._clear();
    }
  },

  /**
   * this method is called by event 'change' on '' tag select
   * (cf. this.).
   * this value is saved as a parameter for the service route.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onRouteModeComputationChange: function onRouteModeComputationChange(e) {
    logger.log("onRouteModeComputationChange", e);
    var idx = e.target.selectedIndex;
    var value = e.target.options[idx].value;

    if (!value) {
      return;
    }

    logger.log(value);
    this._currentComputation = value;
  },

  /**
   * this method is called by event 'change' on '' tag select
   * (cf. this.).
   * this value is saved as a parameter for the service route,
   * and this launches the route request !
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onRouteModeComputationChangeAndRun: function onRouteModeComputationChangeAndRun(e) {
    logger.log("onRouteModeComputationChangeAndRun", e); // event choice computation

    this.onRouteModeComputationChange(e); // clean avant un nouveau calcul !

    this._clearRouteResultsDetails();

    this._clearRouteResultsGeometry();

    this._clearRouteResultsFeatureGeometry(); // submit request


    this.onRouteComputationSubmit({
      computation: this._currentComputation,
      transport: this._currentTransport,
      exclusions: this._currentExclusions
    });
  },

  /**
   * this method is called by event 'change' on '' tag input
   * (cf. this.).
   * this value is saved as a parameter for the service route.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onRouteModeTransportChange: function onRouteModeTransportChange(e) {
    logger.log("onRouteModeTransportChange", e);
    var value = e.target.value;

    if (!value) {
      return;
    }

    logger.log(value);
    this._currentTransport = value;
  },

  /**
   * this method is called by event 'click' on '' tag input
   * (cf. this.), and it displays the panel options of exclusions.
   * Not use !
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onShowRouteExclusionsClick: function onShowRouteExclusionsClick(e) {
    logger.log("onShowRouteExclusionsClick", e); // not use !
  },

  /**
   * this method is called by event 'change' on '' tag input
   * (cf. this.).
   * this value is saved as a parameter for the service route.
   * Not use !
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onRouteExclusionsChange: function onRouteExclusionsChange(e) {
    logger.log("onRouteExclusionsChange", e);
    var value = e.target.value;
    var checked = e.target.checked;

    if (!value) {
      return;
    }

    logger.log(value, checked);
    var bFound = false;
    var iFound = null;

    for (var i = 0; i < this._currentExclusions.length; i++) {
      if (this._currentExclusions[i] === value) {
        iFound = i;
        bFound = true;
      }
    } // on l'ajoute si la valeur n'existe pas et est selectionnée


    if (!bFound && checked) {
      this._currentExclusions.push(value);
    } // on la retire si la valeur existe et est desselectionnée


    if (bFound && !checked) {
      this._currentExclusions[iFound] = null;
    }
  },

  /**
   * this method is called by event 'submit' on '' tag form
   * (cf. this.), and it displays the results.
   *
   * @param {Object} options - options
   *
   * @private
   */
  onRouteComputationSubmit: function onRouteComputationSubmit(options) {
    logger.log("onRouteComputationSubmit", options); // FIXME on lance une requête en EPSG:4326, les coordonnées
    // doivent donc être du type cad en lat/lon.
    // hors, BUG du service du calcul d'itineraire car les
    // coordonnées envoyées doivent être en lon/lat avec une SRS en EPSG:4326 !?
    // sinon, ça plante...
    // Liste des points

    var points = this._currentPoints; // - point de depart

    var start;

    if (points[0].getCoordinate) {
      var startCoordinate = points[0].getCoordinate();
      start = {
        x: startCoordinate.lon || startCoordinate.lng,
        y: startCoordinate.lat
      };
    }

    points[0].dragging(false);
    logger.log("start", start); // - point d'arrivée

    var end;

    if (points[points.length - 1] && points[points.length - 1].getCoordinate) {
      var endCoordinate = points[points.length - 1].getCoordinate();
      end = {
        x: endCoordinate.lon || endCoordinate.lng,
        y: endCoordinate.lat
      };
    }

    points[points.length - 1].dragging(false);
    logger.log("end", end); // - les étapes

    var step = [];

    for (var i = 1; i < points.length - 1; i++) {
      if (points[i] && points[i].getCoordinate) {
        var iCoordinate = points[i].getCoordinate();

        if (iCoordinate) {
          var coordinate = {
            x: iCoordinate.lon || iCoordinate.lng,
            y: iCoordinate.lat
          };
          logger.log("step", coordinate);
          step.push(coordinate);
        }
      }
    } // oups, aucun droits !
    // on evite donc une requête inutile ...


    if (this._noRightManagement) {
      return;
    } // valeurs selectionnées


    this._currentTransport = options.transport;
    this._currentComputation = options.computation;
    this._currentExclusions = options.exclusions;

    if (typeof this.options.routeOptions.geometryInInstructions === "undefined") {
      this.options.routeOptions.geometryInInstructions = true;
    } // mise en place de la patience


    this._displayWaitingContainer(); // on met en place l'affichage des resultats dans la fenetre de resultats.


    var context = this;

    this._requestRouting({
      startPoint: start,
      endPoint: end,
      viaPoints: step,
      graph: this._currentTransport,
      routePreference: this._currentComputation,
      exclusions: this._currentExclusions,
      geometryInInstructions: this.options.routeOptions.geometryInInstructions,
      distanceUnit: "m",
      // surcharge obligatoire !
      // callback onSuccess
      onSuccess: function onSuccess(results) {
        logger.log(results);

        if (results) {
          context._fillRouteResultsDetails(results);

          if (context.options.routeOptions.onSuccess) {
            context.options.routeOptions.onSuccess(results);
          }
        }
      },
      // callback onFailure
      onFailure: function onFailure(error) {
        // FIXME mise à jour du controle mais le service ne repond pas en 200 !?
        context._hideWaitingContainer();

        context._clearRouteResultsDetails();

        logger.log(error.message);
      }
    });
  },

  /**
   * this method is called by event 'click' on ''
   * tag label (cf. this.),
   * and it cleans the old route geometry.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onShowRouteResultsNewClick: function onShowRouteResultsNewClick(e) {
    logger.log("onShowRouteResultsNewClick", e); // on reactive le drag&drop

    var points = this._currentPoints;

    for (var i = 0; i < points.length; i++) {
      points[i].dragging(true);
    } // clean avant un nouveau calcul !


    this._clearRouteResultsDetails();

    this._clearRouteResultsGeometry();

    this._clearRouteResultsFeatureGeometry();
  },

  /**
   * this method is called by event 'mouseover' on ''
   * tag label (cf. this.),
   * and it makes a style on feature route.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onRouteResultsDetailsMouseOver: function onRouteResultsDetailsMouseOver(e) {
    logger.log("onRouteResultsDetailsMouseOver", e);
    var idx = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_8__["default"].index(e.target.id); // valable uniquement pour le mode desktop !

    if (!this._isDesktop) {
      return;
    }

    if (!this._geojsonSections) {
      return;
    }

    this._geojsonSections.eachLayer(function (layer) {
      if (layer.feature.id === parseInt(idx, 10)) {
        layer.setStyle({
          weight: 10,
          color: "#0F9DE8",
          opacity: 0.5
        });
      }
    });
  },

  /**
   * this method is called by event 'mouseout' on ''
   * tag label (cf. this.),
   * and it deletes a style on feature route.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onRouteResultsDetailsMouseOut: function onRouteResultsDetailsMouseOut(e) {
    logger.log("onRouteResultsDetailsMouseOut", e);
    var idx = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_8__["default"].index(e.target.id); // valable uniquement pour le mode desktop !

    if (!this._isDesktop) {
      return;
    }

    if (!this._geojsonSections) {
      return;
    }

    this._geojsonSections.eachLayer(function (layer) {
      if (layer.feature.id === parseInt(idx, 10)) {
        layer.setStyle({
          color: "#ED7F10",
          weight: 5,
          opacity: 0.75
        });
      }
    });
  },

  /**
   * this method is called by event 'click' on ''
   * tag label (cf. this.),
   * and it deletes a style on feature route.
   * Only for mobile !
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onRouteResultsDetailsClick: function onRouteResultsDetailsClick(e) {
    logger.log("onRouteResultsDetailsClick", e);
    var idx = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_8__["default"].index(e.target.id);
    var self = this; // valable uniquement pour le mode mobile !

    if (this._isDesktop) {
      return;
    }

    if (!this._geojsonSections) {
      return;
    } // afficher le detail cumulé du parcours !


    var newInstruction = e.target.title;
    var oldInstruction = e.target.innerHTML;

    this._geojsonSections.eachLayer(function (layer) {
      if (layer.feature.id === parseInt(idx, 10)) {
        e.target.innerHTML = newInstruction;
        layer.setStyle({
          weight: 10,
          color: "#0F9DE8",
          opacity: 0.5
        });
      }
    });

    clearTimeout(1000);
    setTimeout(function () {
      self._geojsonSections.eachLayer(function (layer) {
        if (layer.feature.id === parseInt(idx, 10)) {
          e.target.innerHTML = oldInstruction;
          layer.setStyle({
            color: "#ED7F10",
            weight: 5,
            opacity: 0.75
          });
        }
      });
    }, 1000);
  },
  // ################################################################### //
  // ########################### Routing ############################### //
  // ############## (methods to request and results) ################### //

  /**
   * this method is called by this.onRouteComputationSubmit()
   * and executes a request to the service.
   *
   * @param {Object} settings - service settings
   * @param {Function} settings.onSuccess - callback
   * @param {Function} settings.onFailure - callback
   *
   * @private
   */
  _requestRouting: function _requestRouting(settings) {
    // on ne fait pas de requête si on n'a pas renseigné de parametres !
    if (!settings || Object.keys(settings).length === 0) {
      return;
    } // on ne fait pas de requête si
    // - la parametre 'startPoint' est vide !


    if (!settings.startPoint) {
      return;
    } // - la parametre 'endPoint' est vide !


    if (!settings.endPoint) {
      return;
    }

    logger.log(settings); // on ne fait pas de requête si aucun droit !

    if (this._noRightManagement) {
      logger.log("no rights for all service !?");
      return;
    } // gestion des droits !


    if (!this._resources["Itineraire"]) {
      logger.log("no rights for this service !?");
      return;
    }

    var resources = this._resources["Itineraire"].resources;

    if (!resources || Object.keys(resources).length === 0) {
      return;
    } // gestion de la clef !


    var key = this._resources["Itineraire"]["key"];
    var options = {}; // on recupere les options du service

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, this.options.routeOptions); // ainsi que les parametres de saisie et les callbacks

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, settings); // la ressource donne elle des droits ?

    var bFound = false;

    for (var i = 0; i < resources.length; i++) {
      if (resources[i] === options.graph) {
        bFound = true;
      }
    } // on fait quoi ?


    if (!bFound) {
      logger.log("no rights for this service !?");
      return;
    } // cas où la clef API n'est pas renseignée dans les options du service,
    // on utilise celle de l'autoconf ou celle renseignée au niveau du controle


    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      apiKey: this.options.routeOptions.apiKey || this.options.apiKey || key
    }); // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
    // true par défaut (https)

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      ssl: this.options.ssl
    });
    logger.log(options);
    var routeService = new geoportal_access_lib_src_Services_Route_Route__WEBPACK_IMPORTED_MODULE_0__["default"](options);
    routeService.call();
  },

  /**
   * this method is called by this.onRouteComputationSubmit()
   * and fills the container of the route instructions list, distance and time
   * information, aslo, constructs the geometry route.
   *
   * @param {Object} results - results of the route calculation
   *
   * @private
   */
  _fillRouteResultsDetails: function _fillRouteResultsDetails(results) {
    // FIXME
    // gestion des temps de traitement avec des callback !?
    // Distance et Durée
    var distance = results.totalDistance;
    var duration = results.totalTime; // Détails avec simplifications des troncons

    var instructions = this._simplifiedInstructions(results.routeInstructions); // var instructions = results.routeInstructions;


    if (instructions) {
      this._fillRouteResultsDetailsContainer(distance, duration, instructions);
    } // Geometries simplifiées


    var geometry = results.routeGeometry;

    if (geometry) {
      this._fillRouteResultsDetailsGeometry(geometry);
    }

    if (this.options.routeOptions.geometryInInstructions) {
      // existe t il une geometrie pour chaque troncon de route ?
      var bGeometryInstructions = instructions && Array.isArray(instructions) && instructions[0].geometry.length !== 0; // Geometries des tronçon

      if (instructions && bGeometryInstructions) {
        this._fillRouteResultsDetailsFeatureGeometry(instructions);
      }
    } // Emprise


    var bbox = results.bbox;

    if (bbox) {
      var map = this._map;
      var bounds = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.latLngBounds([bbox.bottom, bbox.left], [bbox.top, bbox.right]);
      map.fitBounds(bounds, {
        padding: [1, 1]
      });
    } // sauvegarde de l'etat des resultats


    this._currentRouteInformations = results; // mise à jour du controle !

    this._formRouteContainer.className = "GProuteComponentHidden";

    this._hideWaitingContainer();

    this._resultsRouteContainer.className = "";
  },

  /**
   * this method is called by this._fillRouteResultsDetails()
   * and fills the container of the route instructions list, distance and time
   * information.
   *
   * @param {Number} distance - distance
   * @param {Number} duration - duration
   * @param {Object[]} instructions - list of instructions
   *
   * @private
   */
  _fillRouteResultsDetailsContainer: function _fillRouteResultsDetailsContainer(distance, duration, instructions) {
    // FIXME callback
    // Distance et Durée
    this._resultsRouteValuesContainer = this._addRouteResultsValuesElement(distance, duration, this._convertSecondsToTime); // Détails

    this._resultsRouteDetailsContainer = this._addRouteResultsDetailsElement(instructions, this._convertSecondsToTime);
  },

  /**
   * this method is called by this._fillRouteResultsDetails()
   * and constructs the simplified geometry route.
   *
   * @param {Object} geometry - geometry
   *
   * @private
   */
  _fillRouteResultsDetailsGeometry: function _fillRouteResultsDetailsGeometry(geometry) {
    // FIXME callback
    this._clearRouteResultsGeometry();

    var map = this._map;
    var _style = {
      color: "#ED7F10",
      weight: 5,
      opacity: 0.75
    };
    this._geojsonRoute = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.geoJson(geometry, {
      style: _style
    }).addTo(map);
  },

  /**
   * this method is called by this._fillRouteResultsDetails()
   * and constructs the geometries street with informations.
   *
   * @param {Object[]} instructions - instructions
   *
   * @private
   */
  _fillRouteResultsDetailsFeatureGeometry: function _fillRouteResultsDetailsFeatureGeometry(instructions) {
    // FIXME callback
    this._clearRouteResultsFeatureGeometry();

    var map = this._map;
    var _style = {
      color: "#ED7F10",
      weight: 5,
      opacity: 0.75
    };
    var _geometry = {
      type: "FeatureCollection",
      features: []
    };

    for (var i = 0; i < instructions.length; i++) {
      var o = instructions[i];
      var id = i + 1;

      _geometry.features.push({
        id: id,
        type: "Feature",
        geometry: o.geometry,
        properties: {
          popupContent: "(" + id + ") distance : " + this._convertDistance(o.distance) + " / temps : " + this._convertSecondsToTime(o.duration)
        }
      });
    }

    var self = this;

    function resetHighlight(e) {
      var layer = e.target;

      self._geojsonSections.resetStyle(layer);

      var div = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GProuteResultsDetailsInstruction_" + layer.feature.id + "-" + self._uid);
      leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.removeClass(div, "GProuteResultsDetailsHighlight");
    }

    function highlightFeature(e) {
      var layer = e.target;
      logger.log(layer);
      layer.setStyle({
        weight: 10,
        color: "#0F9DE8",
        opacity: 0.5
      });
      var div = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GProuteResultsDetailsInstruction_" + layer.feature.id + "-" + self._uid);
      leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.addClass(div, "GProuteResultsDetailsHighlight");
    }

    this._geojsonSections = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.geoJson(_geometry, {
      style: _style,
      // Function that will be called on each created feature layer.
      onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight
        });
        layer.bindPopup(feature.properties.popupContent);
      }
    }).addTo(map);
  },
  // ################################################################### //
  // ############################# Clean ############################### //
  // ################################################################### //

  /**
   * this method is called by this.onShowRoutePanelClick()
   * and it clears all elements (reinit).
   *
   * @private
   */
  _clear: function _clear() {
    this._currentTransport = null;
    this._currentExclusions = [];
    this._currentComputation = null; // les resultats

    this._clearRouteResultsDetails(); // la geometrie


    this._clearRouteResultsGeometry();

    this._clearRouteResultsFeatureGeometry(); // les points


    for (var i = 0; i < this._currentPoints.length; i++) {
      this._currentPoints[i].clear();
    }
  },

  /**
   * this method is called by this.onRouteComputationSubmit()
   * and it clears all route instructions.
   *
   * @private
   */
  _clearRouteResultsDetails: function _clearRouteResultsDetails() {
    this._currentRouteInformations = null; // doit on nettoyer le container "GProuteResultsDetails" ?
    // il sera de toute façon écrasé par la prochaine requête...

    if (this._resultsRouteDetailsContainer) {
      var divD = this._resultsRouteDetailsContainer;

      if (divD.childElementCount) {
        while (divD.firstChild) {
          divD.removeChild(divD.firstChild);
        }
      }
    }

    if (this._resultsRouteValuesContainer) {
      var divV = this._resultsRouteValuesContainer;

      if (divV.childElementCount) {
        while (divV.firstChild) {
          divV.removeChild(divV.firstChild);
        }
      }
    }
  },

  /**
   * this method is called by this.onRouteComputationSubmit()
   * and it clears all route geometries.
   *
   * @private
   */
  _clearRouteResultsGeometry: function _clearRouteResultsGeometry() {
    var map = this._map;

    if (this._geojsonRoute != null) {
      map.removeLayer(this._geojsonRoute);
      this._geojsonRoute = null;
    }
  },

  /**
   * this method is called by this.onRouteComputationSubmit()
   * and it clears all route geometries.
   *
   * @private
   */
  _clearRouteResultsFeatureGeometry: function _clearRouteResultsFeatureGeometry() {
    var map = this._map;

    if (this._geojsonSections != null) {
      map.removeLayer(this._geojsonSections);
      this._geojsonSections = null;
    }
  },
  // ################################################################### //
  // ############################ Patience ############################# //
  // ################################################################### //

  /**
   * this method displays waiting container and sets a timeout
   *
   * @private
   */
  _displayWaitingContainer: function _displayWaitingContainer() {
    this._waitingContainer.className = "GProuteCalcWaitingContainerVisible";
    this._waiting = true; // mise en place d'un timeout pour réinitialiser le panel (cacher la patience)
    // si on est toujours en attente (si la requête est bloquée par exemple)

    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }

    var context = this;
    this._timer = setTimeout(function () {
      if (context._waiting === true) {
        context._hideWaitingContainer();
      } else {
        if (context._timer) {
          clearTimeout(context._timer);
        }
      }
    }, 16000);
  },

  /**
   * this method hides waiting container and clears timeout
   *
   * @private
   */
  _hideWaitingContainer: function _hideWaitingContainer() {
    if (this._waiting) {
      this._waitingContainer.className = "GProuteCalcWaitingContainerHidden";
      this._waiting = false;
      clearTimeout(this._timer);
      this._timer = null;
    }
  },
  // ################################################################### //
  // ########################## Geometry ############################### //
  // ################################################################### //

  /**
   * simplifies instructions
   *
   * @param {Object[]} instructions - instructions
   *
   * @returns {Object[]} simplified instructions
   *
   * @private
   */
  _simplifiedInstructions: function _simplifiedInstructions(instructions) {
    var newInstructions = [];
    var current = instructions[0]; // cas où...

    if (instructions.length === 1) {
      newInstructions.push(current);
    }

    for (var i = 1; i < instructions.length; i++) {
      var o = instructions[i];

      if (o.instruction === current.instruction) {
        current.distance = (parseFloat(o.distance) + parseFloat(current.distance)).toString();
        current.duration = (parseFloat(o.duration) + parseFloat(current.duration)).toString();

        for (var j = 1; j < o.geometry.coordinates.length; j++) {
          current.geometry.coordinates.push(o.geometry.coordinates[j]);
        } // last


        if (i === instructions.length - 1) {
          newInstructions.push(current);
          current = null;
        }
      } else {
        newInstructions.push(current);
        current = o; // last

        if (i === instructions.length - 1) {
          newInstructions.push(o);
          current = null;
        }
      }
    }

    logger.log(newInstructions);
    return newInstructions;
  },
  // ################################################################### //
  // ################# Utils for Distance/Duration ##################### //
  // ################################################################### //

  /**
   * convert seconds to time : HH:MM:SS
   *
   * @param {Number} duration - duration in seconds
   *
   * @returns {String} duration in HH:MM:SS
   *
   * @private
   */
  _convertSecondsToTime: function _convertSecondsToTime(duration) {
    var time = "";
    duration = Math.round(duration);
    var hours = Math.floor(duration / (60 * 60));

    if (!hours) {
      hours = "00";
    }

    var divisor4minutes = duration % (60 * 60);
    var minutes = Math.floor(divisor4minutes / 60);

    if (!minutes) {
      minutes = "00";
    }

    var divisor4seconds = divisor4minutes % 60;
    var seconds = Math.ceil(divisor4seconds);

    if (!seconds) {
      seconds = "00";
    }

    time = hours + "h " + minutes + "m " + seconds + "s";
    return time;
  },

  /**
   * convert distance in meters or kilometers
   *
   * @param {Number} distance - distance in meters
   *
   * @returns {String} distance in km
   *
   * @private
   */
  _convertDistance: function _convertDistance(distance) {
    var d = "";
    var distanceKm = parseInt(distance / 1000, 10);

    if (!distanceKm) {
      d = parseInt(distance, 10) + " m"; // arrondi !
    } else {
      d = distanceKm + " km";
    }

    return d;
  },
  // ################################################################### //
  // ###### METHODES PUBLIQUES (INTERFACE AVEC LE CONTROLE) ############ //
  // ################################################################### //

  /**
   * This method is public.
   * It allows to control the execution of a traitment.
   *
   * @param {Object} positions - positions = [{lng: , lat: }]
   * @param {Object} options - options = {...}
   */
  compute: function compute(positions, options) {
    if (!this._showRouteContainer.checked) {
      this._pictoRouteContainer.click();
    }

    var map = this._map;

    if (!map) {
      return;
    } // Les options par defauts


    var settings = {
      computation: "fastest",
      transport: "Voiture",
      exclusions: []
    }; // On recupere les options

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(settings, options); // Liste des points !

    var points = this._currentPoints;
    var start = 0;
    points[start].setCoordinate(positions[start]);
    var startInput = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GPlocationOrigin_" + 1 + "-" + this._uid);
    startInput.value = positions[start].lng + " , " + positions[start].lat;
    var end = positions.length - 1;
    points[6].setCoordinate(positions[end]);
    var endInput = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GPlocationOrigin_" + 7 + "-" + this._uid);
    endInput.value = positions[end].lng + " , " + positions[end].lat;

    for (var i = 1; i < positions.length - 1; i++) {
      points[i].setCoordinate(positions[i]);
      var stepInput = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GPlocationOrigin_" + i + "-" + this._uid);
      stepInput.value = positions[i].lng + " , " + positions[i].lat;
    }

    settings.transport === "Voiture" ? leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GProuteTransportCar-" + this._uid).checked = true : leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GProuteTransportPedestrian-" + this._uid).checked = true;
    settings.computation === "fastest" ? leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GProuteComputationSelect-" + this._uid).selectedIndex = 0 : leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GProuteComputationSelect-" + this._uid).selectedIndex = 1; // TODO exclusion !
    // Calcul

    this.onRouteComputationSubmit(settings);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Route); // Expose Route as L.geoportalControl.Route (for a build bundle)

if (window.L) {
  if (!window.L.geoportalControl) {
    window.L.geoportalControl = {};
  }

  window.L.geoportalControl.Route = Route;
}

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _CommonService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);
/* harmony import */ var _DefaultUrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);
/* harmony import */ var _Request_RouteRequestFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(109);
/* harmony import */ var _Response_RouteResponseFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(112);









/**
 * @classdesc
 * Appel du service d'itinéraire du Géoportail :
 *     envoi de la requête construite selon les paramètres en options,
 *     éventuellement parsing et analyse  de la réponse,
 *     retour d'une réponse en paramètre de la fonction onSuccess.
 *
 * @alias Gp.Services.Route
 * @constructor
 * @extends {Gp.Services.CommonService}
 * @param {Object} options - options spécifiques au service (+ les options heritées)
 *
 * @param {String} options.resource - La ressource utilisée pour le calcul. Ce paramètre devrait être obligatoire car il l'est dans l'appel au service. Mais il ne l'est pas pour des raisons de rétrocompatibilité.
 *
 * @param {String} options.outputFormat - Le format de la réponse du service itineraire : 'json' uniquement et par défaut.
 *
 * @param {String} [options.routePreference = "fastest"] - Mode de calcul à utiliser :
 * - le plus rapide « fastest »
 * - le plus court « shortest »
 * Par défaut : « fastest ».
 *
 * @param {Object} options.startPoint - Point de départ du calcul. Coordonnées exprimées en longitudes, latitudes (EPSG:4326)
 * @param {Float} options.startPoint.x - Abcisse du point de départ du calcul d'itinéraire.
 * @param {Float} options.startPoint.y - Ordonnée du point de départ du calcul d'itinéraire.
 *
 * @param {Object} options.endPoint - Point d'arrivée du calcul. Coordonnées exprimées en longitudes, latitudes (EPSG:4326)
 * @param {Float} options.endPoint.x - Abcisse du point d'arrivée du calcul d'itinéraire.
 * @param {Float} options.endPoint.y - Ordonnée du point d'arrivée du calcul d'itinéraire.
 *
 * @param {Object[]} [options.viaPoints] - Liste de point ({x:Float,y:Float}) intermédaires que l'itinéraire doit emprunter dans l'ordre du tableau.
 *      Coordonnées exprimées en longitudes, latitudes (EPSG:4326) :{x:float, y:float}
 *
 * @param {String} [options.graph = "voiture"] - Type de graphe utilisé : "Voiture" ou "Pieton".
 *      Détermine le profil de vitesses utilisé pour le calcul ainsi que les tronçons autorisés ou non.
 *      Par défaut, c'est la valeur "Voiture" qui sera utilisée.
 *
 * @param {String[]} [options.exclusions] - DEPRECATED: Critères d'exclusions à appliquer pour le calcul. (correspond au paramètre "avoidFeature" d'OpenLS)
 *      On précise ici le type de tronçons que l'on ne veut pas que l'itinéraire emprunte
 *      (valeurs possibles : « toll » (éviter les péages), « bridge », « tunnel »).
 *      Ce paramètre est conservé pour une rétrocompatibilité de l'api. Le nouveau paramètre à utiliser est options.constraints
 *
 * @param {Object[]} [options.constraints] - Critères de contraintes à appliquer sur un itinéraire. Les valeurs disponibles dépendent de la ressource utilisée. Il est donc utile de regarder le getCapabilities.
 * @param {String} [options.constraints.constraintType] - Type de la contrainte. Généralement "banned".
 * @param {String} [options.constraints.key] - Clé de la contrainte. Généralement "wayType".
 * @param {String} [options.constraints.operator] - Opérateur de la contrainte. Généralement "=".
 * @param {String} [options.constraints.value] - Valeur de la contrainte. Généralement "autoroute".
 *
 * @param {Boolean} [options.geometryInInstructions = false] - Indique si la géométrie de l'itinéraire doit être reprise morceau par morceau dans les instructions.
 *      (correspond au paramètre "provideGeometry" d'OpenLS) Par défaut : false.
 *
 * @param {Boolean} [options.provideBbox = true] - Indique si les instructions doivent être localisées par une bbox dans la réponse.
 *      Par défaut : true.
 *
 * @param {String} [options.distanceUnit = "m"] - Indique si la distance doit être exprimée en km ou m dans la réponse.
 *      Par défaut : m.
 * @param {String} [options.timeUnit = "second"] - Indique si la durée doit être exprimée en seconde, minute ou heure dans la réponse. Il peut-être formatté hh:mm::ss avec la valeur standard.
 *      Les valeurs possibles sont "standard", "second", "minute" ou "hour".
 *      Par défaut : "standard".
 *
 * @param {String} [options.srs] - Système de coordonnées dans lequel les paramètres géographiques en entrée et la réponse du service sont exprimés.
 *      Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 'EPSG:4326'.
 *
 * @param {String[]} [options.waysAttributes] - Nom des attributs des voies. Les valeurs disponibles dépendent de la ressource utilisée. Il est donc utile de regarder le getCapabilities.
 *
 * @example
 *  var options = {
 *      // options communes aux services
 *      apiKey : null,
 *      serverUrl : 'http://localhost/service/',
 *      protocol : 'XHR',
 *      proxyURL : null,
 *      httpMethod : 'GET', // GET|POST
 *      timeOut : 10000, // ms
 *      rawResponse : false, // true|false
 *      scope : null, // this
 *      onSuccess : function (response) {},
 *      onFailure : function (error) {},
 *      // spécifique au service
 *      resource : 'bdtopo'
 *      outputFormat : 'json',
 *      startPoint : {
 *          x : 42.1121,
 *          y : 1.5557
 *      },
 *      endPoint : {
 *          x : 42.1121,
 *          y : 1.5557
 *      },
 *      provideBbox : true,
 *      exclusions : ["Bridge", "Tunnel", "Toll"],
 *      distanceUnit : "km",
 *      graph : "Voiture",
 *      geometryInInstructions : true,
 *      routePreference : "fastest"
 *  };
 *
 * @private
 */
function Route (options) {
    if (!(this instanceof Route)) {
        throw new TypeError(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("CLASS_CONSTRUCTOR", "Route"));
    }

    /**
     * Nom de la classe (heritage)
     */
    this.CLASSNAME = "Route";

    // appel du constructeur par heritage
    _CommonService__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, arguments);

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("Gp.Services.Route");
    this.logger.trace("[Constructeur Route (options)]");

    if (!options.startPoint) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "startPoint"));
    }

    // on lance une exception afin d'eviter au service de le faire...
    if (options.startPoint.x === null) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "startPoint.x"));
    }

    if (options.startPoint.y === null) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "startPoint.y"));
    }

    if (!options.endPoint) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "endPoint"));
    }

    // on lance une exception afin d'eviter au service de le faire...
    if (options.endPoint.x === null) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "endPoint.x"));
    }

    if (options.endPoint.y === null) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "endPoint.y"));
    }

    // options par defaut

    // on passe l'option outputFormat en minuscules afin d'éviter des exceptions.
    if (options.outputFormat && options.outputFormat !== "json") {
        this.logger.warn("options.outputFormat could only be json");
    }
    this.options.outputFormat = "json";

    this.options.resource = options.resource || "bdtopo-osrm";
    this.options.startPoint = options.startPoint;
    this.options.endPoint = options.endPoint;
    this.options.viaPoints = options.viaPoints || [];
    this.options.routePreference = options.routePreference || "fastest";
    /** Gestion des anciennes valeurs de graph */
    if (options.graph) {
        if (options.graph === "Voiture") {
            this.options.graph = "car";
        }
        if (options.graph === "Pieton") {
            this.options.graph = "pedestrian";
        }
    } else {
        this.options.graph = "car";
    }
    this.options.constraints = [];
    if (options.constraints) {
        if (Array.isArray(options.constraints)) {
            for (var k = 0; k < options.constraints.length; k++) {
                this.options.constraints.push(options.constraints[k]);
            }
        } else {
            throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_TYPE", "constraints"));
        }
    }

    /** Gestion de l'ancien paramètre exclusion */
    var constraintTunnel = {};
    var constraintPont = {};
    var constraintAutoroute = {};
    if (options.exclusions) {
        if (options.exclusions.length !== 0) {
            this.logger.warn("options.exclusions is DEPRECATED !!");
            for (var c = 0; c < options.exclusions.length; c++) {
                if (typeof options.exclusions[c] === "string") {
                    options.exclusions[c] = options.exclusions[c].toLowerCase();
                } else {
                    // on ne crée pas une erreur pour rétro-compatibilité avec les anciennes versions
                    continue;
                }
                if (options.exclusions[c] === "toll") {
                    constraintAutoroute.constraintType = "banned";
                    constraintAutoroute.key = "wayType";
                    constraintAutoroute.operator = "=";
                    constraintAutoroute.value = "autoroute";
                    this.options.constraints.push(constraintAutoroute);
                }
                if (options.exclusions[c] === "tunnel") {
                    constraintTunnel.constraintType = "banned";
                    constraintTunnel.key = "wayType";
                    constraintTunnel.operator = "=";
                    constraintTunnel.value = "tunnel";
                    this.options.constraints.push(constraintTunnel);
                }
                if (options.exclusions[c] === "bridge") {
                    constraintPont.constraintType = "banned";
                    constraintPont.key = "wayType";
                    constraintPont.operator = "=";
                    constraintPont.value = "pont";
                    this.options.constraints.push(constraintPont);
                }
            }
        }
    }

    this.options.geometryInInstructions = options.geometryInInstructions || false;
    this.options.provideBbox = options.provideBbox || true;
    this.options.distanceUnit = options.distanceUnit || "m";
    this.options.timeUnit = options.timeUnit || "second";
    this.options.expectedStartTime = null; // FIXME not yet implemented !
    this.options.srs = options.srs || "EPSG:4326";
    this.options.waysAttributes = options.waysAttributes || [];

    // gestion de l'url du service par defaut
    // si l'url n'est pas renseignée, il faut utiliser les urls par defaut
    if (!this.options.serverUrl) {
        var UrlByDefault = _DefaultUrlService__WEBPACK_IMPORTED_MODULE_4__["default"].Route.url(this.options.apiKey);
        if (!UrlByDefault) {
            throw new Error("Url by default not found !");
        }
        this.options.serverUrl = UrlByDefault;
        this.logger.trace("Serveur URL par defaut : " + this.options.serverUrl);
    }
}

/**
 * @lends module:Route#
 */
Route.prototype = Object.create(_CommonService__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, {
    // todo
    // getter/setter
});

/*
 * Constructeur (alias)
 */
Route.prototype.constructor = Route;

/**
 * (overwrite)
 * Création de la requête
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback
 */
Route.prototype.buildRequest = function (error, success) {
    var options = {
        // spécifique au service
        resource : this.options.resource,
        startPoint : this.options.startPoint,
        endPoint : this.options.endPoint,
        viaPoints : this.options.viaPoints,
        provideBbox : this.options.provideBbox,
        constraints : this.options.constraints,
        distanceUnit : this.options.distanceUnit,
        timeUnit : this.options.timeUnit,
        graph : this.options.graph,
        geometryInInstructions : this.options.geometryInInstructions,
        routePreference : this.options.routePreference,
        srs : this.options.srs,
        waysAttributes : this.options.waysAttributes
    };

    this.request = _Request_RouteRequestFactory__WEBPACK_IMPORTED_MODULE_5__["default"].build(options);

    // on teste si la requete a bien été construite !
    if (!this.request) {
        error.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_REQUEST_BUILD")));
    } else {
        success.call(this, this.request);
    }
};

/**
 * (overwrite)
 * Analyse de la reponse
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback
 */
Route.prototype.analyzeResponse = function (error, success) {
    // INFO
    // Factory pour masquer la complexité du retour du service

    if (this.response) {
        var options = {
            distanceUnit : this.options.distanceUnit,
            timeUnit : this.options.timeUnit,
            response : this.response,
            outputFormat : this.options.outputFormat, // utile pour parser la string en mode XHR : JSON ou XML !
            rawResponse : this.options.rawResponse,
            onError : error,
            onSuccess : success,
            scope : this,
            geometryInInstructions : this.options.geometryInInstructions
        };

        _Response_RouteResponseFactory__WEBPACK_IMPORTED_MODULE_6__["default"].build(options);
    } else {
        error.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EMPTY")));
    }
};

/* harmony default export */ __webpack_exports__["default"] = (Route);


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var _RouteRequestREST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(110);
/**
 * Creation d'une requête REST en mode POST ou GET
 * (Factory)
 *
 * @module RouteRequestFactory
 * @alias Gp.Services.Route.Request.RouteRequestFactory
 * @private
 */




var RouteRequestFactory = {

    /**
     * interface unique
     *
     * @method build
     * @static
     * @param {Object} options - options definies dans le composant Route
     *
     * @example
     *   // utilisation avec les callback
     *   var options = {
     *      (...)
     *      onSuccess : function (response) {},
     *      onError : function (error) {},
     *      // spécifique au service
     *      startPoint : {
     *          x : 42.1121,
     *          y : 1.5557
     *      },
     *      endPoint : {
     *          x : 42.1121,
     *          y : 1.5557
     *      },
     *      provideBbox : false,
     *      exclusions : ["bridge", "tunnel", "toll"],
     *      distanceUnit : "km",
     *      graph : "Voiture",
     *      geometryInInstructions : false,
     *      routePreference : "fastest"
     *   };
     *   RouteRequestFactory.build(options);
     *
     *   // utilisation sans callback
     *   var options = {...};
     *   try {
     *      var result = RouteRequestFactory.build(options);
     *      if (! result) { throw new Error("..."):}
     *   } catch (e) {
     *      // todo
     *   }
     * @returns {String} request
     */
    build : function (options) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("RouteRequestFactory");
        logger.trace(["RouteRequestFactory::build()"]);

        var request = null;

        var settings = options || {};

        // gestion des callback
        var bOnError = !!(options.onError !== null && typeof options.onError === "function");

        var message = null;

        // FIXME les exceptions ne sont pas 'catchées' sur le constructeur !
        var myReq = new _RouteRequestREST__WEBPACK_IMPORTED_MODULE_2__["default"](settings);
        if (!myReq.processRequestString()) {
            message = "Error process request (rest) !";
            if (bOnError) {
                options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__["default"](message));
                return;
            }
            throw new Error(message);
        }
        request = myReq.requestString;

        return request;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (RouteRequestFactory);


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _model_RouteParamREST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(111);





/**
 * @classdesc
 * Classe de gestion des requêtes de type REST sur le service de calcul d'itineraire
 * (uniquement en GET)
 *
 * @constructor
 * @alias Gp.Services.Route.Request.RouteRequestREST
 * @param {Object} options - options definies dans le composant Route
 *
 * @example
 * var options = {
 *      (...)
 * };
 *
 * @private
 */
function RouteRequestREST (options) {
    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("RouteRequestREST");
    this.logger.trace("[Constructeur RouteRequestREST ()]");

    if (!(this instanceof RouteRequestREST)) {
        throw new TypeError("RouteRequestREST constructor cannot be called as a function.");
    }

    // existance des options
    if (!options) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_EMPTY", "options"));
    }

    /** liste des options */
    this.settings = options;
}

RouteRequestREST.prototype = {

    /**
     * @lends module:RouteRequestREST#
     */

    /**
     * request
     * @type {String}
     */
    requestString : null,

    /**
     * Constructeur (alias)
     */
    constructor : RouteRequestREST,

    /**
     * Construction de la requête.
     *
     * @example
     * // GET  out : origin=2.416907353809513,48.8465772142297&destination=2.4248037771493673,48.84591353161838
     * // POST out : Not yet supported method POST !
     * @returns {String} request
     */
    processRequestString : function () {
        // INFO
        // construction simple sans template...,
        // mais en attendant que les services soient fixés, on taggue ce composant en mode PROTOTYPE !
        this.logger.warn(" PROTOTYPE !");

        // Mapping des options avec le service de l'API REST
        var oParams = new _model_RouteParamREST__WEBPACK_IMPORTED_MODULE_2__["default"](this.settings);
        var params = oParams.getParams();

        var request = "";
        for (var i = 0; i < params.length; i++) {
            var o = params[i];
            if (request) {
                request += "&";
            }
            request += o.k + "=" + o.v;
        }

        // Exemple :
        //  http://wxs.ign.fr/KEY/itineraire/rest/route.json?
        //  origin=&
        //  destination=&
        //  waypoints=&
        //  method=DISTANCE&
        //  graph=Pieton&
        //  graphName=Pieton&
        //  exclusions=&
        //  tolerance=10&
        //  srs=

        this.logger.trace(request);
        this.requestString = request;

        return this.requestString;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (RouteRequestREST);


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);



/**
 * @classdesc
 * Classe de gestion des param. des requêtes du service de calcul d'itineraire (REST).
 *      Permet le mapping avec les options du service.
 * @constructor
 * @alias Gp.Services.Route.Request.RouteParamREST
 * @param {Object} options - options
 *
 * @private
 */
function RouteParamREST (options) {
    if (!(this instanceof RouteParamREST)) {
        throw new TypeError("RouteParamREST constructor cannot be called as a function.");
    }

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger();
    this.logger.trace("[Constructeur RouteParamREST ()]");
    /**
     * Options en paramêtres du constructeur.
     */
    this.options = options || {};

    // mapping des options avec l'API REST

    /** Ressource utilisée */
    this.resource = this.options.resource;

    /** Coordonnées du point de départ. */
    this.start = this.options.startPoint.x + "," + this.options.startPoint.y;

    /** Coordonnées du point d’arrivée. */
    this.end = this.options.endPoint.x + "," + this.options.endPoint.y;

    /** Coordonnées des étapes point de départ. */
    this.intermediates = this.options.viaPoints;

    /** Nom du profile à utiliser */
    this.profile = this.options.graph;

    /** projection (code EPSG comme epsg:4326 ou wgs84) */
    this.crs = this.options.srs;

    /** Liste des contraintes */
    this.constraints = this.options.constraints;

    /** Nom de l'optimisation à utiliser */
    this.optimization = this.options.routePreference;

    /** Format de sortie (résumé de l’itinéraire) */
    this.getSteps = (this.options.geometryInInstructions) ? "true" : "false";

    /** Unité des distances */
    this.distanceUnit = this.options.distanceUnit;

    /** Unité des durées */
    this.timeUnit = this.options.timeUnit;

    /** Attributs des voies */
    this.waysAttributes = this.options.waysAttributes;
}

/**
 * CLASSNAME
 */
RouteParamREST.CLASSNAME = "RouteParamREST";

RouteParamREST.prototype = {

    /**
     * @lends module:RouteParamREST#
     */

    /**
     * Constructeur (alias)
     */
    constructor : RouteParamREST,

    /**
     * Retourne une liste de points
     * @returns {String} une liste de points (sep '|')
     */
    getIntermediates : function () {
        var array = [];
        if (this.intermediates.length !== 0) {
            for (var i = 0; i < this.intermediates.length; i++) {
                var obj = this.intermediates[i];
                array.push(obj.x + "," + obj.y);
            }
        }

        return array.join("|");
    },

    /**
     * Retourne une liste d'attributs
     * @returns {String} une liste d'attributs (sep '|')
     */
    getWaysAttributes : function () {
        return this.waysAttributes.join("|");
    },

    /**
     * Retourne un profile
     * @returns {String} profile
     */
    getProfile : function () {
        return this.profile;
    },

    /**
     * Retourne un distanceUnit
     * @returns {String} distanceUnit
     */
    getDistanceUnit : function () {
        if (this.distanceUnit === "m") {
            return "meter";
        }
        if (this.distanceUnit === "km") {
            return "kilometer";
        }
        return "";
    },

    /**
     * Retourne une optimisation
     * @returns {String} optimization
     */
    getOptimization : function () {
        if (this.optimization) {
            return this.optimization;
        } else {
            return "";
        }
    },

    /**
     * Retourne la liste des constraints
     * @returns {String} une liste des constraints (sep '|')
     */
    getConstraints : function () {
        var constraintArray = [];

        if (this.constraints.length !== 0) {
            for (var k = 0; k < this.constraints.length; k++) {
                constraintArray.push(JSON.stringify(this.constraints[k]));
            }
        }
        return constraintArray.join("|");
    }
};

/**
 * Tableau de clefs/valeurs pour param.
 *
 * @returns {Array} liste de paramêtres
 */
RouteParamREST.prototype.getParams = function () {
    var map = [];

    map.push({
        k : "resource",
        v : this.resource
    });

    map.push({
        k : "start",
        v : this.start
    });

    map.push({
        k : "end",
        v : this.end
    });

    map.push({
        k : "geometryFormat",
        v : "geojson"
    });

    if (this.optimization) {
        map.push({
            k : "optimization",
            v : this.getOptimization()
        });
    }

    if (this.intermediates) {
        map.push({
            k : "intermediates",
            v : this.getIntermediates()
        });
    }

    if (this.profile) {
        map.push({
            k : "profile",
            v : this.getProfile()
        });
    }

    if (this.constraints) {
        map.push({
            k : "constraints",
            v : this.getConstraints()
        });
    }

    if (this.crs) {
        map.push({
            k : "crs",
            v : this.crs
        });
    }

    if (this.distanceUnit) {
        map.push({
            k : "distanceUnit",
            v : this.getDistanceUnit()
        });
    }

    if (this.timeUnit) {
        map.push({
            k : "timeUnit",
            v : this.timeUnit
        });
    }

    if (this.waysAttributes) {
        map.push({
            k : "waysAttributes",
            v : this.getWaysAttributes()
        });
    }

    return map;
};

/* harmony default export */ __webpack_exports__["default"] = (RouteParamREST);


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _model_RouteResponse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(113);
/* harmony import */ var _model_RouteInstruction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(114);
/**
 * Factory pour générer une reponse JSON à partir d'un XML ou d'un JSON
 * (Factory)
 *
 * @module RouteResponseFactory
 * @alias Gp.Services.Route.Response.RouteResponseFactory
 * @private
 */






var RouteResponseFactory = {

    /**
     * interface unique
     *
     * @method build
     * @static
     * @param {Object} options - options definies dans le composant Route
     *
     * @example
     *   var options = {
     *      response :
     *      outputFormat :
     *      rawResponse :
     *      scope :
     *      onSuccess :
     *      onError :
     *   };
     *
     */
    build : function (options) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("RouteResponseFactory");
        logger.trace("RouteResponseFactory::build()");

        var data = null;

        if (options.response) {
            if (options.rawResponse) {
                logger.trace("analyze response : raw");
                data = options.response;
            } else {
                logger.trace("analyze response : json");

                var JSONResponse;
                if (typeof options.response === "string") {
                    JSONResponse = JSON.parse(options.response);
                } else {
                    JSONResponse = options.response;
                }

                // construction de l'objet réponse JSON
                if (JSONResponse) {
                    // le service renvoie t il une erreur ?
                    if (JSONResponse.message) {
                        // ex. {"message":"message not null", "status":"ERROR"}
                        options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION", JSONResponse.message)));
                        return;
                    }
                    var legs = [];
                    var legSteps = [];
                    var steps = [];

                    data = new _model_RouteResponse__WEBPACK_IMPORTED_MODULE_3__["default"]();

                    if (data.hasOwnProperty("totalTime")) {
                        data.totalTime = parseFloat(JSONResponse.duration);
                    }
                    if (data.hasOwnProperty("totalDistance")) {
                        data.totalDistance = parseFloat(JSONResponse.distance);
                    }

                    if (data.hasOwnProperty("bbox")) {
                        data.bbox.left = parseFloat(JSONResponse.bbox[0]);
                        data.bbox.bottom = parseFloat(JSONResponse.bbox[1]);
                        data.bbox.right = parseFloat(JSONResponse.bbox[2]);
                        data.bbox.top = parseFloat(JSONResponse.bbox[3]);
                    }

                    if (data.hasOwnProperty("routeGeometry") && !options.geometryInInstructions) {
                        data.routeGeometry = JSONResponse.geometry;
                    }

                    if (data.hasOwnProperty("routeInstructions") && options.geometryInInstructions) {
                        var legList = JSONResponse.portions;
                        var i;
                        if (Array.isArray(legList) && legList.length) {
                            for (i = 0; i < legList.length; i++) {
                                legs.push(legList[i]);
                            }
                        }
                        if (legs.length) {
                            for (i = 0; i < legs.length; i++) {
                                legSteps.push(legs[i].steps);
                            }
                        }
                        if (legSteps.length) {
                            for (i = 0; i < legSteps.length; i++) {
                                steps = steps.concat(legSteps[i]);
                            }
                        }

                        steps.forEach(function (step) {
                            data.routeInstructions.push(new _model_RouteInstruction__WEBPACK_IMPORTED_MODULE_4__["default"]());
                            data.routeInstructions[data.routeInstructions.length - 1].duration = step.duration;
                            data.routeInstructions[data.routeInstructions.length - 1].distance = step.distance;
                            data.routeInstructions[data.routeInstructions.length - 1].code = "";
                            data.routeInstructions[data.routeInstructions.length - 1].instruction = "";
                            data.routeInstructions[data.routeInstructions.length - 1].geometry = step.geometry;

                            // on ne souhaite pas de ce type de valeur...
                            if (step.name === "Valeur non renseignée") {
                                step.name = "";
                            }

                            switch (step.instruction.type) {
                                case "turn":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Tourner";
                                    break;
                                case "new name":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Continuer tout droit";
                                    break;
                                case "depart":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Départ";
                                    break;
                                case "arrive":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Arrivée";
                                    break;
                                case "merge":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Rejoindre";
                                    break;
                                case "ramp":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Prendre la bretelle";
                                    break;
                                case "on ramp":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Prendre la bretelle";
                                    break;
                                case "off ramp":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Prendre la sortie";
                                    break;
                                case "fork":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Sur la bifurcation, prendre";
                                    break;
                                case "end of road":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "À la fin de la route, prendre";
                                    break;
                                case "use lane":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Utiliser la file";
                                    break;
                                case "continue":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Continuer";
                                    break;
                                case "roundabout":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Au rond-point";
                                    break;
                                case "rotary":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Au rond-point";
                                    break;
                                case "roundabout turn":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "Au rond point, tourner";
                                    break;
                                case "notification":
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "";
                                    break;
                                default:
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += "?" + step.instruction.type + "?";
                                    break;
                            }

                            if (step.instruction.modifier) {
                                switch (step.instruction.modifier) {
                                    case "uturn":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = "Faire demi-tour";
                                        break;
                                    case "sharp right":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction += " complètement à droite";
                                        break;
                                    case "right":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction += " à droite";
                                        break;
                                    case "slight right":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction += " légèrement à droite";
                                        break;
                                    case "straight":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = "Continuer tout droit";
                                        break;
                                    case "slight left":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction += " lègèrement à gauche";
                                        break;
                                    case "left":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction += " à gauche";
                                        break;
                                    case "sharp left":
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction += " complètement à gauche";
                                        break;
                                    default:
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction += " ?" + step.instruction.modifier + "?";
                                        break;
                                }
                            }

                            if (step.instruction.exit) {
                                data.routeInstructions[data.routeInstructions.length - 1].instruction += `${step.instruction.exit}e sortie`;
                            }

                            if (step.attributes.name) {
                                if (step.attributes.name.nom_1_droite || step.attributes.name.toponyme) {
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += " sur";
                                }

                                if (step.attributes.name.nom_1_droite) {
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += ` ${step.attributes.name.nom_1_droite}`;
                                }

                                if (step.attributes.name.toponyme) {
                                    data.routeInstructions[data.routeInstructions.length - 1].instruction += ` ${step.attributes.name.toponyme}`;
                                }
                            }
                        });
                    }
                }

                if (!data) {
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_ANALYSE", "json")));
                    return;
                }

                // Si la réponse contenait une exception renvoyée par le service
                if (data.exceptionReport) {
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION_2")));
                    return;
                }
            }
        } else {
            options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EMPTY")));
            return;
        }

        options.onSuccess.call(options.scope, data);
    }
};

/* harmony default export */ __webpack_exports__["default"] = (RouteResponseFactory);


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Response object for {@link module:Services~route Gp.Services.route ()} invocation when successful. Received as the argument of onSuccess callback function.
 *
 * @property {Gp.BBox} bbox - Bounding Box of the route. Given when provideBBox parameter is used in function call.
 * @property {Object} routeGeometry - Geometry (expressed in [GeoJSON]{@link http://geojson.org/}) of the route.
 * @property {Array.<Gp.Services.Route.RouteInstruction>} routeInstructions - Instructions of the route.
 * @property {String} totalDistance - Length of the route. If distanceUnit parameter was set to "km" (default), totalDistance is a string containing the total distance expressed in kilometers, followed by " Km" (e.g. : "19.6 Km"). If distanceUnit parameter was set to "m", totalDistance is a string containing the total distance expressed in meters (e.g. : "19599.14").
 * @property {Float} totalTime - Route duration in seconds.
 *
 * @namespace
 * @alias Gp.Services.RouteResponse
 */
function RouteResponse () {
    if (!(this instanceof RouteResponse)) {
        throw new TypeError("RouteResponse constructor cannot be called as a function.");
    }

    this.totalTime = null;

    this.totalDistance = null;

    this.bbox = {
        left : null,
        right : null,
        top : null,
        bottom : null
    };

    this.routeGeometry = null; // FIXME can be null if option 'geometryInInstructions' is true !

    this.routeInstructions = [];
}

RouteResponse.prototype = {

    constructor : RouteResponse

};

/* harmony default export */ __webpack_exports__["default"] = (RouteResponse);


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Single Route Instruction object.
 *
 * @property {String} code - Instruction code :
 *
 * - "F" : Straight forward
 * - "B" : U-turn
 * - "L" : turn left
 * - "R" : turn right
 * - "BL" : turn left strongly
 * - "BR" : turn right strongly
 * - "FL" : turn lightly to the left
 * - "FR" : turn lightly to the right
 * - "round_about_entry" : round about entry
 * - "round_about_exit" : round about exit
 *
 * @property {String} instruction - Instruction text : translated code + street name
 * @property {Object} geometry - Geometry (expressed in [GeoJSON]{@link http://geojson.org/}) of the street.
 * @property {Float} distance - Length of the instruction. Expressed in km or m, depending on distanceUnit parameter.
 * @property {Float} duration - Instruction duration in seconds.
 *
 * @namespace
 * @alias Gp.Services.Route.RouteInstruction
 */
function RouteInstruction () {
    if (!(this instanceof RouteInstruction)) {
        throw new TypeError("RouteInstruction constructor cannot be called as a function.");
    }

    this.duration = null;

    this.distance = null;

    this.code = null;

    this.instruction = null;

    this.geometry = null; // FIXME can be null if option 'geometryInInstructions' is false !
}

RouteInstruction.prototype = {

    constructor : RouteInstruction

};

/* harmony default export */ __webpack_exports__["default"] = (RouteInstruction);


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _Common_Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);



var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("RouteDOM");
var RouteDOM = {
  /**
  * Add uuid to the tag ID
  * @param {String} id - id selector
  * @returns {String} uid - id selector with an unique id
  */
  _addUID: function _addUID(id) {
    var uid = this._uid ? id + "-" + this._uid : id;
    return uid;
  },

  /**
   * Main container (DOM)
   *
   * @returns {DOMElement} DOM element
   */
  _createMainContainerElement: function _createMainContainerElement() {
    var container = document.createElement("div");
    container.id = this._addUID("GProute");
    container.className = "GPwidget";
    return container;
  },
  // ################################################################### //
  // ################# Methods to display Main Panel ################### //
  // ################################################################### //

  /**
   * Hidden checkbox for minimizing/maximizing panel
   *
   * @returns {DOMElement} DOM element
   */
  _createShowRouteElement: function _createShowRouteElement() {
    var input = document.createElement("input");
    input.id = this._addUID("GPshowRoute");
    input.type = "checkbox";
    return input;
  },

  /**
   * Show route control
   * see event !
   *
   * @returns {DOMElement} DOM element
   */
  _createShowRoutePictoElement: function _createShowRoutePictoElement() {
    // contexte d'execution
    var context = this;
    var label = document.createElement("label");
    label.id = this._addUID("GPshowRoutePicto");
    label.className = "GPshowAdvancedToolPicto";
    label.htmlFor = this._addUID("GPshowRoute");
    label.title = "Ouvrir le calcul d'itinéraire"; // gestionnaire d'evenement :
    // on ouvre le menu de saisie du calcul d'itiniraire
    // L'ouverture/Fermeture permet de faire le menage
    // (reinitialisation)

    if (label.addEventListener) {
      label.addEventListener("click", function (e) {
        context.onShowRoutePanelClick(e);
      });
    } else if (label.attachEvent) {
      label.attachEvent("onclick", function (e) {
        context.onShowRoutePanelClick(e);
      });
    }

    var spanOpen = document.createElement("span");
    spanOpen.id = this._addUID("GPshowRouteOpen");
    spanOpen.className = "GPshowAdvancedToolOpen";
    label.appendChild(spanOpen);
    return label;
  },
  // ################################################################### //
  // ################## Methods to display Inputs Panel ################ //
  // ################################################################### //

  /**
   * Create Container Panel
   *
   * FIXME
   * don't call this._createRoutePanelHeaderElement
   * don't call this._createRoutePanelFormElement
   * don't call this._createRoutePanelResultsElement
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelElement: function _createRoutePanelElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GProutePanel");
    div.className = "GPpanel"; // div.appendChild(this._createRoutePanelHeaderElement());
    // div.appendChild(this._createRoutePanelFormElement());
    // div.appendChild(this._createRoutePanelResultsElement());

    return div;
  },

  /**
   * Create Header Panel
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelHeaderElement: function _createRoutePanelHeaderElement() {
    // contexte d'execution
    var self = this;
    var container = document.createElement("div");
    container.className = "GPpanelHeader";
    var div = document.createElement("div");
    div.className = "GPpanelTitle";
    div.innerHTML = "Calcul d'itinéraire";
    container.appendChild(div);
    var divClose = document.createElement("div");
    divClose.id = this._addUID("GProutePanelClose");
    divClose.className = "GPpanelClose";
    divClose.title = "Masquer le panneau"; // Link panel close / visibility checkbox

    if (divClose.addEventListener) {
      divClose.addEventListener("click", function () {
        document.getElementById(self._addUID("GPshowRoutePicto")).click();
      }, false);
    } else if (divClose.attachEvent) {
      divClose.attachEvent("onclick", function () {
        document.getElementById(self._addUID("GPshowRoutePicto")).click();
      });
    }

    container.appendChild(divClose);
    return container;
  },

  /**
   * Create Form
   * see evenement !
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormElement: function _createRoutePanelFormElement() {
    // contexte d'execution
    var self = this;
    var form = document.createElement("form");
    form.id = this._addUID("GProuteForm");
    form.setAttribute("onkeypress", "return event.keyCode != 13;"); // FIXME hack pour desactiver l'execution via 'enter' au clavier !

    form.addEventListener("submit", function (e) {
      logger.log(e);
      e.preventDefault(); // points

      var points = document.getElementsByClassName(self._addUID("GPlocationPoint")); // Must have at least two origin points

      var start = points[0].childNodes[0].id;
      var end = points[points.length - 1].childNodes[0].id;
      var startID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(start);
      var endID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(end);

      if (document.getElementById(self._addUID("GPlocationOrigin_" + startID)).value === "" && document.getElementById(self._addUID("GPlocationOriginCoords_" + startID)).value === "" || document.getElementById(self._addUID("GPlocationOrigin_" + endID)).value === "" && document.getElementById(self._addUID("GPlocationOriginCoords_" + endID)).value === "") {
        return false;
      } // Send stages to results panel


      var id;
      document.getElementById(self._addUID("GProuteResultsStages")).innerHTML = "";

      for (var i = 0; i < points.length; i++) {
        var tag = points[i].childNodes[0].id;
        id = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_0__["default"].index(tag);

        if (document.getElementById(self._addUID("GPlocationPoint_" + id)).className === "GPflexInput GPlocationStageFlexInput") {
          var resultStage = document.createElement("div");
          resultStage.className = "GProuteResultsStages";
          var resultStageLabel = document.createElement("div");
          resultStageLabel.className = "GProuteResultStageLabel";
          resultStageLabel.innerHTML = document.getElementById(self._addUID("GPlocationOriginLabel_" + id)).innerHTML + " :";
          resultStage.appendChild(resultStageLabel);
          var resultStageValue = document.createElement("div");
          resultStageValue.className = "GProuteResultStageValue";
          var elementCoords = document.getElementById(self._addUID("GPlocationOriginCoords_" + id));
          var stageCoords = elementCoords.value;
          var visible = elementCoords.className === "GPlocationOriginVisible";

          if (stageCoords !== null && stageCoords !== "" && visible) {
            resultStageValue.innerHTML = stageCoords;
          } else {
            resultStageValue.innerHTML = document.getElementById(self._addUID("GPlocationOrigin_" + id)).value;
          }

          resultStage.appendChild(resultStageValue);

          if (resultStageValue.innerHTML !== "") {
            document.getElementById(self._addUID("GProuteResultsStages")).appendChild(resultStage);
          }
        }
      } // on peut récuperer les valeurs utiles pour les transmettre au service d'iti...
      // - le mode de calcul
      // - le mode de transport
      // - les exclusions
      // Les points sont déjà stockés dans l'application.
      // computation mode params


      var modeComputation = null;

      if (document.getElementById(self._addUID("GProuteComputationSelect"))) {
        var select = document.getElementById(self._addUID("GProuteResultsComputationSelect"));
        select.selectedIndex = document.getElementById(self._addUID("GProuteComputationSelect")).selectedIndex;
        modeComputation = select.options[select.selectedIndex].value;
      } // transport mode params


      var modeTransport = null; // voiture ?

      if (document.getElementById(self._addUID("GProuteTransportCar"))) {
        if (document.getElementById(self._addUID("GProuteTransportCar")).checked) {
          modeTransport = document.getElementById(self._addUID("GProuteTransportCar")).value;
        }
      } // pieton ?


      if (document.getElementById(self._addUID("GProuteTransportPedestrian"))) {
        if (document.getElementById(self._addUID("GProuteTransportPedestrian")).checked) {
          modeTransport = document.getElementById(self._addUID("GProuteTransportPedestrian")).value;
        }
      } // exclusions params


      var exclusions = [];
      var exclusionsElement = document.getElementsByClassName("GProuteExclusionsOption");

      for (var j = 0; j < exclusionsElement.length; j++) {
        id = exclusionsElement[j].htmlFor;
        var el = document.getElementById(id);

        if (!el.checked) {
          exclusions.push(el.value);
        }
      }

      self.onRouteComputationSubmit({
        computation: modeComputation,
        transport: modeTransport,
        exclusions: exclusions
      }); // FIXME mise à jour du controle dans le composant JS !
      // document.getElementById(self._addUID("GProuteForm")).className = "GProuteComponentHidden";
      // document.getElementById(self._addUID("GProuteResultsPanel")).className = "";

      return false;
    });
    return form;
  },

  /**
   * Create Results Panel
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelResultsElement: function _createRoutePanelResultsElement() {
    var container = document.createElement("div");
    container.id = this._addUID("GProuteResultsPanel");
    container.className = "GProuteComponentHidden";
    container.appendChild(this._createRouteResultsStagesElement());
    container.appendChild(this._createRouteResultsElement());
    var divBorderUp = document.createElement("div");
    divBorderUp.className = "GPfakeBorder GPfakeBorderLeft";
    container.appendChild(divBorderUp);
    container.appendChild(this._createRouteShowResultsDetailsElement());
    var labelShow = document.createElement("label");
    labelShow.htmlFor = this._addUID("GProuteResultsShowDetails");
    labelShow.innerHTML = "Afficher le détail";
    container.appendChild(labelShow);
    var labelHide = document.createElement("label");
    labelHide.htmlFor = this._addUID("GProuteResultsShowDetails");
    labelHide.innerHTML = "Masquer le détail";
    container.appendChild(labelHide);
    var divBorderDown = document.createElement("div");
    divBorderDown.className = "GPfakeBorder";
    container.appendChild(divBorderDown);
    container.appendChild(this._createRouteResultsDetailsElement());
    return container;
  },

  /**
   * Create Waiting Panel
   *
   * @returns {DOMElement} DOM element
   */
  _createRouteWaitingElement: function _createRouteWaitingElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GProuteCalcWaitingContainer");
    div.className = "GProuteCalcWaitingContainerHidden";
    var p = document.createElement("p");
    p.className = "GProuteCalcWaiting";
    p.innerHTML = "Calcul en cours...";
    div.appendChild(p);
    return div;
  },
  // ################################################################### //
  // ############### Methods to the window results ##################### //
  // ################################################################### //

  /**
   * Create Results Stages
   * (results dynamically generate !)
   *
   * @returns {DOMElement} DOM element
   */
  _createRouteResultsStagesElement: function _createRouteResultsStagesElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GProuteResultsStages");
    return div;
  },

  /**
   * Create Show Results
   * see event!
   *
   * @returns {DOMElement} DOM element
   */
  _createRouteResultsElement: function _createRouteResultsElement() {
    // contexte
    var self = this;
    var container = document.createElement("div");
    container.id = this._addUID("GProuteResults"); // FIXME Route results are dynamically filled in Javascript by route service

    var divValue = document.createElement("div");
    divValue.id = this._addUID("GProuteResultsValues");
    container.appendChild(divValue);
    var divMode = document.createElement("div");
    divMode.id = this._addUID("GProuteResultsMode");
    var select = document.createElement("select");
    select.id = this._addUID("GProuteResultsComputationSelect");
    select.className = "GPinputSelect"; // gestionnaire d'evenement :
    // on stocke la valeur du mode de calcul, et on relance le calcul d'itiniraire

    select.addEventListener("change", function (e) {
      self.onRouteModeComputationChangeAndRun(e);
    });
    var computes = [{
      code: "fastest",
      label: "Plus rapide"
    }, {
      code: "shortest",
      label: "Plus court"
    }];

    for (var i = 0; i < computes.length; i++) {
      var option = document.createElement("option");
      option.value = computes[i].code;
      option.text = computes[i].label;
      select.appendChild(option);
    }

    divMode.appendChild(select);
    container.appendChild(divMode);
    var divNew = document.createElement("div");
    divNew.id = this._addUID("GProuteResultsNew");
    divNew.title = "Modifier le calcul";
    divNew.addEventListener("click", function (e) {
      document.getElementById(self._addUID("GProuteResultsPanel")).className = "GProuteComponentHidden";
      document.getElementById(self._addUID("GProuteForm")).className = "";
      self.onShowRouteResultsNewClick(e);
    });
    container.appendChild(divNew);
    return container;
  },

  /**
   * Add Results Duration and Distance
   * (results dynamically generate !)
   * see event!
   * @param {Number} distance - distance
   * @param {Number} duration - duration
   * @param {Function} fconvert - fconvert
   *
   * @returns {DOMElement} DOM element
   */
  _addRouteResultsValuesElement: function _addRouteResultsValuesElement(distance, duration, fconvert) {
    var div = document.getElementById(this._addUID("GProuteResultsValues")); // clean !

    if (div.childElementCount) {
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    }

    var containerDistance = document.createElement("div");
    containerDistance.className = "GProuteResultsValue";
    var labelDistance = document.createElement("label");
    labelDistance.className = "GProuteResultsValueLabel";
    labelDistance.innerHTML = "Distance :";
    containerDistance.appendChild(labelDistance);
    var distanceLabel = 0;
    var isKm = parseInt(distance / 1000, 10);

    if (!isKm) {
      distanceLabel = Math.round(distance) + " m";
    } else {
      var distanceArrondi = Math.round(distance);
      distanceArrondi = distanceArrondi / 1000;
      distanceLabel = distanceArrondi + " km";
    }

    var divDistance = document.createElement("div");
    divDistance.id = this._addUID("GProuteResultsValueDist");
    divDistance.innerHTML = distanceLabel;
    containerDistance.appendChild(divDistance);
    div.appendChild(containerDistance);
    var containerDuration = document.createElement("div");
    containerDuration.className = "GProuteResultsValue";
    var labelDuration = document.createElement("label");
    labelDuration.className = "GProuteResultsValueLabel";
    labelDuration.innerHTML = "Durée :";
    containerDuration.appendChild(labelDuration);
    var divDuration = document.createElement("div");
    divDuration.id = this._addUID("GProuteResultsValueDist");
    divDuration.innerHTML = fconvert(duration);
    containerDuration.appendChild(divDuration);
    div.appendChild(containerDuration);
    return div;
  },

  /**
   * Create Show Results Details
   *
   * @returns {DOMElement} DOM element
   */
  _createRouteShowResultsDetailsElement: function _createRouteShowResultsDetailsElement() {
    var input = document.createElement("input");
    input.id = this._addUID("GProuteResultsShowDetails");
    input.type = "checkbox";
    return input;
  },

  /**
   *  Create Results Details
   *
   * @returns {DOMElement} DOM element
   */
  _createRouteResultsDetailsElement: function _createRouteResultsDetailsElement() {
    // <!-- Route results details are dynamically filled in Javascript by route service -->
    var div = document.createElement("div");
    div.id = this._addUID("GProuteResultsDetails");
    return div;
  },

  /**
   *  Add Results Details
   * (results dynamically generate !)
   * @param {Object[]} instructions - instructions
   * @param {Function} fconvert - fconvert
   *
   * @returns {DOMElement} DOM element
   */
  _addRouteResultsDetailsElement: function _addRouteResultsDetailsElement(instructions, fconvert) {
    // contexte
    var context = this;
    var div = document.getElementById(this._addUID("GProuteResultsDetails")); // clean !

    if (div.childElementCount) {
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    } // calcul des valeurs cumulé !


    var distanceCumul = 0;
    var durationCumul = 0;
    /* jshint -W083 */

    for (var i = 0; i < instructions.length; i++) {
      var id = i + 1;
      var o = instructions[i];
      var divNum = document.createElement("div");
      divNum.className = "GProuteResultsDetailsNumber";
      divNum.innerHTML = id + ".";
      div.appendChild(divNum);
      durationCumul += parseFloat(o.duration);
      distanceCumul += parseFloat(o.distance);
      var distance = 0;
      var isCumulKm = parseInt(distanceCumul / 1000, 10);

      if (!isCumulKm) {
        distance = Math.round(distanceCumul) + " m";
      } else {
        var distanceArrondi = Math.round(distanceCumul);
        distanceArrondi = distanceArrondi / 1000;
        distance = distanceArrondi + " km";
      }

      var divIns = document.createElement("div");
      divIns.className = "GProuteResultsDetailsInstruction";
      divIns.id = this._addUID("GProuteResultsDetailsInstruction_" + id);
      divIns.title = "distance : " + distance + " / " + "temps : " + fconvert(durationCumul);
      divIns.innerHTML = o.instruction;
      divIns.addEventListener("mouseover", function (e) {
        context.onRouteResultsDetailsMouseOver(e);
      });
      divIns.addEventListener("mouseout", function (e) {
        context.onRouteResultsDetailsMouseOut(e);
      });
      divIns.addEventListener("click", function (e) {
        // mode mobile !
        if (typeof context.onRouteResultsDetailsClick === "function") {
          context.onRouteResultsDetailsClick(e);
        }
      });
      div.appendChild(divIns);
    }

    return div;
  },
  // ################################################################### //
  // ################### Methods to the form points #################### //
  // ################# OVERWRITTEN BY LOCATIONSELECTOR ! ################# //

  /**
   * Create Point
   * see event !
   * OVERWRITTEN BY LOCATIONSELECTOR !
   * (version initial without LOCATIONSELECTOR PLUGIN)
   * @param {Integer} n - n
   * @param {String} text - text
   * @param {Boolean} visibility - visibility
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormPointElement: function _createRoutePanelFormPointElement(n, text, visibility) {
    // contexte d'execution
    var context = this;
    var div = document.createElement("div");
    div.id = "GProutePoint" + n;
    div.className = visibility ? "GPflexInput GProuteStageFlexInput" : "GPflexInput GProuteStageFlexInputHidden";
    var labelOrigin = document.createElement("label");
    labelOrigin.id = "GProuteOriginLabel" + n;
    labelOrigin.htmlFor = "GProuteOrigin" + n;
    labelOrigin.innerHTML = text;
    labelOrigin.addEventListener("click", function () {
      var i = this.id.charAt(this.id.length - 1);
      document.getElementById("GProuteOriginCoords" + i).value = "";

      for (var j = 1; j < 8; j++) {
        document.getElementById("GProutePoint" + j).style.display = "flex";
      }

      document.getElementById("GProuteForm").className = "";
      document.getElementById("GProuteOriginPointer" + i).checked = false;
      document.getElementById("GProuteOrigin" + i).className = "GProuteOriginVisible";
      document.getElementById("GProuteOriginCoords" + i).className = "GProuteOriginHidden";
    });
    div.appendChild(labelOrigin);
    var inputOrigin = document.createElement("input");
    inputOrigin.id = "GProuteOrigin" + n;
    inputOrigin.className = "GProuteOriginVisible";
    inputOrigin.type = "text";
    inputOrigin.placeholder = "Saisir une adresse";
    inputOrigin.addEventListener("keyup", function (e) {
      var charCode = e.which || e.keyCode;

      if (charCode === 13 || charCode === 10) {
        return;
      }

      var i = this.id.charAt(this.id.length - 1);

      if (document.getElementById("GProuteOrigin" + i).value.length > 2) {
        document.getElementById("GProuteAutoCompleteList" + i).style.display = "block";
      } else {
        document.getElementById("GProuteAutoCompleteList" + i).style.display = "none";
      } // gestionnaire d'evenement :
      // on récupère la valeur de saisie pour une requête sur le service d'autocompletion.
      // le resultat de la requête nous permet de recuperer les coordonnées du point...


      context.onAutoCompleteSearchText(e);
    });
    inputOrigin.addEventListener("blur", function () {
      var i = this.id.charAt(this.id.length - 1);
      document.getElementById("GProuteAutoCompleteList" + i).style.display = "none";
    });
    div.appendChild(inputOrigin);
    var inputOriginCoord = document.createElement("input");
    inputOriginCoord.id = "GProuteOriginCoords" + n;
    inputOriginCoord.className = "GProuteOriginHidden";
    inputOriginCoord.type = "text";
    inputOriginCoord.disabled = true;
    div.appendChild(inputOriginCoord);
    var inputOriginPointer = document.createElement("input");
    inputOriginPointer.id = "GProuteOriginPointer" + n;
    inputOriginPointer.type = "checkbox";
    div.appendChild(inputOriginPointer);
    var labelOriginPointer = document.createElement("label");
    labelOriginPointer.id = "GProuteOriginPointerImg" + n;
    labelOriginPointer.htmlFor = "GProuteOriginPointer" + n;
    labelOriginPointer.className = "GProuteOriginPointerImg";
    labelOriginPointer.title = "Pointer un lieu sur la carte";
    labelOriginPointer.addEventListener("click", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var i = this.id.charAt(this.id.length - 1);
      var j;

      for (j = 1; j < 8; j++) {
        if (i !== j) {
          document.getElementById("GProuteOriginPointer" + j).checked = false;

          if (document.getElementById("GProuteOriginCoords" + j).value === "Pointer un lieu sur la carte") {
            document.getElementById("GProuteOriginCoords" + j).value = "";
            document.getElementById("GProuteOrigin" + j).className = "GProuteOriginVisible";
            document.getElementById("GProuteOriginCoords" + j).className = "GProuteOriginHidden";
          }
        }
      }

      if (document.getElementById("GProuteOriginPointer" + i).checked) {
        document.getElementById("GProuteOriginCoords" + i).value = "";

        for (j = 1; j < 8; j++) {
          document.getElementById("GProutePoint" + j).style.display = "flex";
        }

        document.getElementById("GProuteForm").className = "";
        document.getElementById("GProuteOriginPointer" + i).checked = false;
        document.getElementById("GProuteOrigin" + i).className = "GProuteOriginVisible";
        document.getElementById("GProuteOriginCoords" + i).className = "GProuteOriginHidden";
      } else {
        document.getElementById("GProuteOriginCoords" + i).value = "Pointer un lieu sur la carte";

        for (j = 1; j < 8; j++) {
          if (i === j) {
            document.getElementById("GProutePoint" + j).style.display = "flex";
          } else {
            document.getElementById("GProutePoint" + j).style.display = "none";
          }
        }

        document.getElementById("GProuteForm").className = "GProuteFormMini";
        document.getElementById("GProuteOriginPointer" + i).checked = true;
        document.getElementById("GProuteOrigin" + i).className = "GProuteOriginHidden";
        document.getElementById("GProuteOriginCoords" + i).className = "GProuteOriginVisible";
      } // gestionnaire d'evenement :
      // on stocke la valeur du point, utilisée pour la requête sur le service de calcul d'itiniraire


      context.onRouteMapPointClick(evt);
    });
    div.appendChild(labelOriginPointer);
    return div;
  },

  /**
   * Create Remove Point tag
   * see event !
   * OVERWRITTEN BY LOCATIONSELECTOR !
   * (version initial without LOCATIONSELECTOR PLUGIN)
   * @param {Integer} n - n
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormRemoveStageElement: function _createRoutePanelFormRemoveStageElement(n) {
    // contexte d'execution
    var context = this;
    var divRm = document.createElement("div");
    divRm.id = "GProuteStageRemove" + n;
    divRm.className = "GProuteStageRemove";
    divRm.title = "Supprimer l'étape";

    if (n !== 1 && n !== 7) {
      divRm.addEventListener("click", function (e) {
        var i = this.id.charAt(this.id.length - 1);
        document.getElementById("GProutePoint" + i).className = "GPflexInput GProuteStageFlexInputHidden";
        document.getElementById("GProuteOrigin" + i).value = "";
        document.getElementById("GProuteOrigin" + i).className = "GProuteOriginVisible";
        document.getElementById("GProuteOriginCoords" + i).value = "";
        document.getElementById("GProuteOriginCoords" + i).className = "GProuteOriginHidden";
        document.getElementById("GProuteStageAdd").style.display = ""; // Moving up exclusions picto
        // var exclusionsPictoTop = document.getElementById("GPshowRouteExclusionsPicto").style.top;
        // document.getElementById("GPshowRouteExclusionsPicto").style.top = (parseInt(exclusionsPictoTop, 10) - 33).toString() + "px";
        // gestionnaire d'evenement :
        // on supprime le point, utilisé pour la requête sur le service d'itiniraire

        context.onRouteRemovePointClick(e);
      });
    }

    return divRm;
  },

  /**
   * Create Add Point tag
   * see event !
   * OVERWRITTEN BY LOCATIONSELECTOR !
   * (version initial without LOCATIONSELECTOR PLUGIN)
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormAddStageElement: function _createRoutePanelFormAddStageElement() {
    // contexte d'execution
    var context = this;
    var divAdd = document.createElement("div");
    divAdd.id = "GProuteStageAdd";
    divAdd.title = "Ajouter une étape";
    divAdd.addEventListener("click", function (e) {
      var lastStage = 1;
      var nbStages = 0;

      for (var i = 2; i < 7; i++) {
        if (document.getElementById("GProutePoint" + i).className === "GPflexInput GProuteStageFlexInputHidden") {
          if (lastStage === 1) {
            lastStage = i;
          }
        } else {
          nbStages++;
        }
      }

      if (lastStage < 7) {
        document.getElementById("GProutePoint" + lastStage).className = "GPflexInput GProuteStageFlexInput"; // Moving down exclusions picto
        // var exclusionsPictoTop = document.getElementById("GPshowRouteExclusionsPicto").style.top;
        // document.getElementById("GPshowRouteExclusionsPicto").style.top = (parseInt(exclusionsPictoTop, 10) + 33).toString() + "px";
      }

      if (nbStages === 4) {
        document.getElementById("GProuteStageAdd").style.display = "none";
      } // gestionnaire d'evenement :
      // on ajoute le point, utilisé pour la requête sur le service d'itiniraire


      context.onRouteAddPointClick(e);
    });
    return divAdd;
  },

  /**
   * Create Results autocompletion to the point
   * see event!
   * OVERWRITTEN BY LOCATIONSELECTOR !
   * (version initial without LOCATIONSELECTOR PLUGIN)
   * @param {Integer} n - n
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormAutoCompleteListElement: function _createRoutePanelFormAutoCompleteListElement(n) {
    // contexte d'execution
    var context = this;
    var div = document.createElement("div");
    div.id = "GProuteAutoCompleteList" + n;
    div.className = "GPadvancedAutoCompleteList";

    if (div.addEventListener) {
      div.addEventListener("click", function (e) {
        context.onAutoCompletedResultsItemClick(e);
        document.getElementById("GProuteAutoCompleteList" + n).style.display = "none";
      }, false);
    } else if (div.attachEvent) {
      div.attachEvent("onclick", function (e) {
        context.onAutoCompletedResultsItemClick(e);
        document.getElementById("GProuteAutoCompleteList" + n).style.display = "none";
      });
    } // Proposals are dynamically filled in Javascript by autocomplete service
    // <div class="GPautoCompleteProposal">...</div>


    return div;
  },

  /**
   * Autocompletion result to a point.
   * Proposals are dynamically filled in Javascript by autocomplete service
   * OVERWRITTEN BY LOCATIONSELECTOR !
   * (version initial without LOCATIONSELECTOR PLUGIN)
   *
   *
   * @param {Object} location - suggested location results
   * @param {Number} n  - number of the point
   * @param {Number} id - ID
   */
  _createRouteAutoCompletedLocationElement: function _createRouteAutoCompletedLocationElement(location, n, id) {
    var container = document.getElementById("GProuteAutoCompleteList" + n);
    var div = document.createElement("div");
    div.id = "AutoCompletedLocation" + id;
    div.className = "GPautoCompleteProposal";
    div.innerHTML = _Common_Utils_GeocodeUtils__WEBPACK_IMPORTED_MODULE_2__["default"].getSuggestedLocationFreeform(location);
    container.appendChild(div);
  },
  // ################################################################### //
  // ############## Methods to the choice mode into form ############### //
  // ################################################################### //

  /**
   * Create Container to Mode choice transport
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormModeChoiceElement: function _createRoutePanelFormModeChoiceElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GProuteModeChoice"); // div.appendChild(this._createRoutePanelFormModeChoiceTransportElement());
    // div.appendChild(this._createRoutePanelFormModeChoiceComputeElement());

    return div;
  },

  /**
   * Create Mode choice transport
   * see event !
   * FIXME event not useful
   * @param {String[]} transports - transports
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormModeChoiceTransportElement: function _createRoutePanelFormModeChoiceTransportElement(transports) {
    // contexte d'execution
    var context = this;
    var div = document.createElement("div");
    div.id = this._addUID("GProuteTransportChoice");
    var span = document.createElement("span");
    span.className = "GProuteModeLabel";
    span.innerHTML = "Mode de transport";
    div.appendChild(span);
    /* jshint -W083 */

    for (var i = 0; i < transports.length; i++) {
      var transport = transports[i];

      if (transport === "Voiture") {
        var inputCar = document.createElement("input");
        inputCar.id = this._addUID("GProuteTransportCar");
        inputCar.type = "radio";
        inputCar.name = "GProuteTransport";
        inputCar.value = "Voiture";

        if (i === 0) {
          inputCar.checked = true;
        } // gestionnaire d'evenement :
        // on stocke le mode de transport,
        // utilisation pour la requête sur le service de calcul d'itiniraire


        if (inputCar.addEventListener) {
          inputCar.addEventListener("change", function (e) {
            context.onRouteModeTransportChange(e);
          });
        } else if (inputCar.attachEvent) {
          inputCar.attachEvent("onchange", function (e) {
            context.onRouteModeTransportChange(e);
          });
        }

        div.appendChild(inputCar);
        var labelCar = document.createElement("label");
        labelCar.className = "GProuteTransportImg";
        labelCar.htmlFor = this._addUID("GProuteTransportCar");
        labelCar.title = "Voiture";
        div.appendChild(labelCar);
      }

      if (transport === "Pieton") {
        var inputPedestrian = document.createElement("input");
        inputPedestrian.id = this._addUID("GProuteTransportPedestrian");
        inputPedestrian.type = "radio";
        inputPedestrian.name = "GProuteTransport";
        inputPedestrian.value = "Pieton";

        if (i === 0) {
          inputPedestrian.checked = true;
        } // gestionnaire d'evenement :
        // on stocke le mode de transport,
        // utilisation pour la requête sur le service de calcul d'itiniraire


        if (inputPedestrian.addEventListener) {
          inputPedestrian.addEventListener("change", function (e) {
            context.onRouteModeTransportChange(e);
          });
        } else if (inputPedestrian.attachEvent) {
          inputPedestrian.attachEvent("onchange", function (e) {
            context.onRouteModeTransportChange(e);
          });
        }

        div.appendChild(inputPedestrian);
        var labelPedestrian = document.createElement("label");
        labelPedestrian.className = "GProuteTransportImg";
        labelPedestrian.htmlFor = this._addUID("GProuteTransportPedestrian");
        labelPedestrian.title = "Piéton";
        div.appendChild(labelPedestrian);
      }
    }

    return div;
  },

  /**
   * Create Mode choice computation
   * see event!
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormModeChoiceComputeElement: function _createRoutePanelFormModeChoiceComputeElement() {
    // contexte d'execution
    var context = this;
    var div = document.createElement("div");
    div.id = this._addUID("GProuteComputationChoice");
    var label = document.createElement("label");
    label.htmlFor = this._addUID("GProuteComputationSelect");
    label.innerHTML = "Mode de calcul";
    var span = document.createElement("span");
    span.className = "GProuteModeLabel";
    span.appendChild(label);
    div.appendChild(span);
    var select = document.createElement("select");
    select.id = this._addUID("GProuteComputationSelect");
    select.className = "GPinputSelect"; // gestionnaire d'evenement :
    // on stocke la valeur du mode de calcul,
    // utilisation pour la requête sur le service de calcul d'itiniraire

    select.addEventListener("change", function (e) {
      context.onRouteModeComputationChange(e);
    });
    var computes = [{
      code: "fastest",
      label: "Plus rapide"
    }, {
      code: "shortest",
      label: "Plus court"
    }];

    for (var i = 0; i < computes.length; i++) {
      var option = document.createElement("option");
      option.value = computes[i].code;
      option.text = computes[i].label;
      select.appendChild(option);
    }

    div.appendChild(select);
    return div;
  },
  // ################################################################### //
  // ################# Methods to the choice exclusions ################ //
  // ################################################################### //

  /**
   * Hidden checkbox for minimizing/maximizing Exclusions Options
   *
   * @returns {DOMElement} DOM element
   */
  _createShowRouteExclusionsElement: function _createShowRouteExclusionsElement() {
    var input = document.createElement("input");
    input.id = this._addUID("GPshowRouteExclusions");
    input.type = "checkbox";
    return input;
  },

  /**
   * Label to Exclusions Options
   * see event !
   * FIXME event not useful
   *
   * @returns {DOMElement} DOM element
   */
  _createShowRouteExclusionsPictoElement: function _createShowRouteExclusionsPictoElement() {
    // contexte d'execution
    var context = this;
    var label = document.createElement("label");
    label.id = this._addUID("GPshowRouteExclusionsPicto");
    label.className = "GPshowMoreOptionsImage GPshowMoreOptions GPshowRouteExclusionsPicto";
    label.htmlFor = this._addUID("GPshowRouteExclusions");
    label.title = "Exclusions"; // label.style.top = "185px";
    // gestionnaire d'evenement :
    // on ouvre le menu des options des exclusions

    if (label.addEventListener) {
      label.addEventListener("click", function (e) {
        context.onShowRouteExclusionsClick(e);
      });
    } else if (label.attachEvent) {
      label.attachEvent("onclick", function (e) {
        context.onShowRouteExclusionsClick(e);
      });
    }

    return label;
  },

  /**
   * Create Container to Exclusions
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormExclusionsElement: function _createRoutePanelFormExclusionsElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GProuteExclusions");
    var span = document.createElement("span");
    span.className = "GProuteExclusionsLabel";
    span.innerHTML = "Passages autorisés";
    div.appendChild(span); // div.appendChild(this._createRoutePanelFormExclusionOptionsElement());

    return div;
  },

  /**
   * Create Exclusions Options
   * see event !
   * FIXME event not useful
   * @param {Object[]} exclusions - exclusions
   *
   * @returns {DOMElement} DOM element
   */
  _createRoutePanelFormExclusionOptionsElement: function _createRoutePanelFormExclusionOptionsElement(exclusions) {
    // contexte d'execution
    var context = this;
    var div = document.createElement("div");
    div.className = "GProuteExclusionsOptions";
    /* jshint -W083 */

    for (var value in exclusions) {
      if (exclusions.hasOwnProperty(value)) {
        var status = exclusions[value];

        switch (value) {
          case "toll":
            var inputToll = document.createElement("input");
            inputToll.id = this._addUID("GProuteExclusionsToll");
            inputToll.type = "checkbox";
            inputToll.value = "Toll";
            inputToll.checked = !status; // gestionnaire d'evenement :
            // on stocke l'exclusion,
            // utilisation pour la requête sur le service de calcul d'itiniraire

            if (inputToll.addEventListener) {
              inputToll.addEventListener("change", function (e) {
                context.onRouteExclusionsChange(e);
              });
            } else if (inputToll.attachEvent) {
              inputToll.attachEvent("onchange", function (e) {
                context.onRouteExclusionsChange(e);
              });
            }

            div.appendChild(inputToll);
            var labelToll = document.createElement("label");
            labelToll.className = "GProuteExclusionsOption";
            labelToll.htmlFor = this._addUID("GProuteExclusionsToll");
            labelToll.innerHTML = "Péages";
            div.appendChild(labelToll);
            break;

          case "tunnel":
            var inputTunnel = document.createElement("input");
            inputTunnel.id = this._addUID("GProuteExclusionsTunnel");
            inputTunnel.type = "checkbox";
            inputTunnel.value = "Tunnel";
            inputTunnel.checked = !status; // gestionnaire d'evenement :
            // on stocke l'exclusion,
            // utilisation pour la requête sur le service de calcul d'itiniraire

            if (inputTunnel.addEventListener) {
              inputTunnel.addEventListener("change", function (e) {
                context.onRouteExclusionsChange(e);
              });
            } else if (inputTunnel.attachEvent) {
              inputTunnel.attachEvent("onchange", function (e) {
                context.onRouteExclusionsChange(e);
              });
            }

            div.appendChild(inputTunnel);
            var labelTunnel = document.createElement("label");
            labelTunnel.className = "GProuteExclusionsOption";
            labelTunnel.htmlFor = this._addUID("GProuteExclusionsTunnel");
            labelTunnel.innerHTML = "Tunnels";
            div.appendChild(labelTunnel);
            break;

          case "bridge":
            var inputBridge = document.createElement("input");
            inputBridge.id = this._addUID("GProuteExclusionsBridge");
            inputBridge.type = "checkbox";
            inputBridge.value = "Bridge";
            inputBridge.checked = !status; // gestionnaire d'evenement :
            // on stocke l'exclusion,
            // utilisation pour la requête sur le service de calcul d'itiniraire

            if (inputBridge.addEventListener) {
              inputBridge.addEventListener("change", function (e) {
                context.onRouteExclusionsChange(e);
              });
            } else if (inputBridge.attachEvent) {
              inputBridge.attachEvent("onchange", function (e) {
                context.onRouteExclusionsChange(e);
              });
            }

            div.appendChild(inputBridge);
            var labelBridge = document.createElement("label");
            labelBridge.className = "GProuteExclusionsOption";
            labelBridge.htmlFor = this._addUID("GProuteExclusionsBridge");
            labelBridge.innerHTML = "Ponts";
            div.appendChild(labelBridge);
            break;
        }
      }
    }

    return div;
  },
  // ################################################################### //
  // ############################### Submit Form ####################### //
  // ################################################################### //

  /**
   * Create Submit Form Element
   *
   * @returns {DOMElement} DOM element
   */
  _createRouteSubmitFormElement: function _createRouteSubmitFormElement() {
    var input = document.createElement("input");
    input.id = this._addUID("GProuteSubmit");
    input.className = "GPinputSubmit";
    input.type = "submit";
    input.value = "Calculer";
    return input;
  },
  // ################################################################### //
  // ############################### Reset picto ####################### //
  // ################################################################### //

  /**
   * Create Reset Picto Element
   *
   * @returns {DOMElement} DOM element
   */
  _createRouteFormResetElement: function _createRouteFormResetElement() {
    var self = this;
    var divReset = document.createElement("div");
    divReset.id = this._addUID("GProuteReset");
    divReset.title = "Réinitialiser les paramètres";
    divReset.addEventListener("click", function (e) {
      self.onRouteResetClick(e);
    });
    return divReset;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (RouteDOM);

/***/ })
/******/ ])["default"];