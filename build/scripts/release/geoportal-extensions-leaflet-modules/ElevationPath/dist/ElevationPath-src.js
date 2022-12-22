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

ElevationPath =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 121);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
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
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
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
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _CommonService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);
/* harmony import */ var _DefaultUrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);
/* harmony import */ var _Request_AltiRequestFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(82);
/* harmony import */ var _Response_AltiResponseFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(89);









/**
 * @classdesc
 *
 * Appel du service d'altimétrie du Géoportail
 *
 * @todo gestion du parma. output et callback
 * @todo outputFormat (REST) et format (WPS)
 * @todo La reponse JSON peut encapsuler un XML !
 *
 * @constructor
 * @extends {Gp.Services.CommonService}
 * @alias Gp.Services.Alti
 * @param {Object} options - options spécifiques au service (+ les options heritées)
 *
 * @param {Array.<Object>} options.positions - Tableau ({lon:float,lat:float}) contenant les coordonnées des points (CRS:84)
 *      dont on veut connaître les altitudes (ou à partir desquelles on va calculer le profil).
 *      Chaque élément du tableau est un objet JavaScript avec deux attributs : lon et lat, qui sont des flottants.
 *      Minimum 2 éléments si on souhaite calculer un profil altimétrique (ElevationLine).
 *      Maximum 50 éléments.
 *
 * @param {String} options.outputFormat - Le format de la réponse du service alti : 'xml' ou 'json'.
 *      Ce paramètre déterminera l'extension '.xml' ou '.json' du service dans le cas de l'API REST,
 *      ou la valeur du paramètre 'format' dans le cas de la norme WPS.
 *      Nécessaire si serverUrl est renseigné, et qu'on souhaite passer par l'API REST,
 *      pour connaître le format dans lequel sera fournie la réponse (pour son traitement).
 *      Non nécessaire pour la norme WPS. Par défaut, ce paramètre vaut 'json'.
 *
 * @param {Number} [options.sampling] - Nombre de points à utiliser pour déterminer le tracé d'un profil altimétrique, compris entre 2 et 5000.
 *      A spécifier lorsqu'on souhaite accéder à cette fonctionnalité.
 *      Dans ce cas, les points fournis en entrée (au minimum de deux) servent à déterminer l'axe planimétrique
 *      le long duquel le profil doit être calculé.
 *      Si le paramètre sampling n'est pas spécifié ou moins de deux points sont fournis,
 *      c'est le service Elevation qui sera interrogé (altitudes simples calculées pour les points fournis).
 *      Une valeur de sampling strictement inférieure à 2 déclenchera un échantillonnage avec la valeur par défaut du service (3 points).
 *
 * @param {String} [options.api] - Manière d'accéder au service : 'REST' (via l'API REST) ou 'WPS' (via la norme WPS).
 *      Par défaut, on utilise l'API REST.
 *
 * @param {Boolean} [options.zonly] - Permet de ne récupérer que les altitudes en sortie s'il vaut 'true'.
 *      Vaut 'false' par défaut.
 *
 * @example
 *   var options = {
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
 *      positions : [{lon:, lat:}, {lon:, lat:}],
 *      outputFormat : 'json' // json|xml
 *      sampling : 3,
 *      api : 'REST', // REST|WPS
 *      zonly : false // false|true
 *   };
 *
 * @private
 */
function Alti (options) {
    if (!(this instanceof Alti)) {
        throw new TypeError(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("CLASS_CONSTRUCTOR", "Alti"));
    }

    /**
     * Nom de la classe (heritage)
     * FIXME instance ou classe ?
     */
    this.CLASSNAME = "Alti";

    // appel du constructeur par heritage
    _CommonService__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, arguments);

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("Gp.Services.Alti");
    this.logger.trace("[Constructeur Alti (options)]");

    // #####################
    // analyse des options
    // #####################

    if (!options.positions) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_MISSING", "positions"));
    }

    if (options.positions.length === 0) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_EMPTY", "positions"));
    }

    // ajout des options spécifiques au service
    this.options.positions = options.positions;

    // format de réponse du service : "json" ou "xml" (valeur par défaut), en minuscule !
    this.options.outputFormat = (typeof options.outputFormat === "string") ? options.outputFormat.toLowerCase() : "xml";

    // sampling
    this.options.sampling = options.sampling || null;

    // type d'api utilisé pour requeter le service, en majuscule !
    this.options.api = (typeof options.api === "string") ? options.api.toUpperCase() : "REST";

    // l'api ne peut être interrogée qu'en GET.
    if (this.options.api === "REST") {
        this.options.httpMethod = "GET";
    }

    // param. zonly
    this.options.zonly = options.zonly || false;

    // gestion de l'url du service par defaut
    // si l'url n'est pas renseignée, il faut utiliser les urls par defaut
    // en fonction du type d'api, REST ou WPS, du format de reponse demandé (outputFormat)
    // ainsi que sur le type de service (profil ou elevation)
    if (!this.options.serverUrl) {
        var lstUrlByDefault = _DefaultUrlService__WEBPACK_IMPORTED_MODULE_4__["default"].Alti.url(this.options.apiKey);
        var urlFound = null;
        switch (this.options.api) {
            case "WPS":
                urlFound = lstUrlByDefault.wps;
                break;
            case "REST":
                var key = (options.sampling ? "profil" : "elevation") + "-" + this.options.outputFormat;
                urlFound = lstUrlByDefault[key];
                break;
            default:
                throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_UNKNOWN", "api"));
        }

        if (!urlFound) {
            throw new Error("Url by default not found !");
        }
        this.options.serverUrl = urlFound;
        this.logger.trace("Server URL by default : " + this.options.serverUrl);
    }

    // gestion du type de service
    // si l'extension de l'url est .json ou .xml, on surcharge le format de sortie (outputFormat)
    var idx = this.options.serverUrl.lastIndexOf(".");
    if (idx !== -1) {
        var extension = this.options.serverUrl.substring(idx + 1);
        if (extension && extension.length < 5) { // FIXME extension de moins de 4 car. ...
            this.logger.trace("Server Extension URL : " + extension);
            switch (extension.toLowerCase()) {
                case "json":
                case "xml":
                    this.options.outputFormat = extension.toLowerCase();
                    break;
                default:
                    throw new Error("type of service : unknown or unsupported (json or xml) !");
            }
        }
    }
}

/**
 * @lends module:Alti#
 */
Alti.prototype = Object.create(_CommonService__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, {
    // todo
    // getter/setter
});

/**
 * Constructeur (alias)
 */
Alti.prototype.constructor = Alti;

/**
 * Création de la requête (overwrite)
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback
 */
Alti.prototype.buildRequest = function (error, success) {
    // utilisation en mode callback
    var options = {
        httpMethod : this.options.httpMethod,
        // callback
        onSuccess : function (result) {
            // sauvegarde de la requete !
            this.request = result;
            success.call(this, this.request);
        },
        onError : error,
        scope : this,
        // spécifique au service :
        positions : this.options.positions,
        outputFormat : this.options.outputFormat,
        sampling : this.options.sampling,
        api : this.options.api,
        zonly : this.options.zonly
    };

    _Request_AltiRequestFactory__WEBPACK_IMPORTED_MODULE_5__["default"].build(options);
};

/**
 * Analyse de la reponse (overwrite)
 *
 * @param {Function} error   - callback des erreurs
 * @param {Function} success - callback
 */
Alti.prototype.analyzeResponse = function (error, success) {
    // INFO
    // Factory pour masquer la complexité du retour du service qui renvoie soit
    //  - une 'string' qui contient du XML ou JSON natif en mode XHR
    //  - un objet JSON qui est natif ou encapsulé

    if (this.response) {
        var options = {
            response : this.response,
            outputFormat : this.options.outputFormat, // utile pour parser la string en mode XHR : JSON ou XML !
            rawResponse : this.options.rawResponse,
            onError : error,
            onSuccess : success,
            scope : this
        };

        _Response_AltiResponseFactory__WEBPACK_IMPORTED_MODULE_6__["default"].build(options);
    } else {
        error.call(this, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"](_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EMPTY")));
    }
};

/* harmony default export */ __webpack_exports__["default"] = (Alti);


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var _AltiRequestREST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83);
/* harmony import */ var _AltiRequestWPS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(87);
/**
 * Creation d'une requête en REST ou WPS
 * (Factory)
 *
 * @module AltiRequestFactory
 * @alias Gp.Services.Alti.Request.AltiRequestFactory
 * @private
 */





var AltiRequestFactory = {

    /**
     * interface unique
     *
     * @method build
     * @static
     * @param {Object} options - options definies dans le composant Alti
     *
     * @example
     *   var options = {
     *      httpMethod : 'GET', // GET|POST
     *      onSuccess : function (response) {},
     *      onError : function (error) {},
     *      scope : this,
     *      positions : [{lon:, lat:}, {lon:, lat:}],
     *      outputFormat : 'json' // json|xml
     *      sampling : 3,
     *      api : 'REST', // REST|WPS
     *      zonly : false // false|true
     *   };
     *
     */
    build : function (options) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("AltiRequestFactory");
        logger.trace(["AltiRequestFactory::build()"]);

        var request = null;

        // on factorise les options par groupe;
        // - global,
        // - param, les params pour les data inputs
        // - wps, les param du service
        // - callback

        var settings = {
            // ajout des valeurs par defaut spécifiques au service
            type : options.sampling ? "Profil" : "Elevation",
            method : options.httpMethod,
            param : {
                positions : null,
                delimiter : null, // FIXME par defaut, on ne le met pas en place car ça fait planter la requête !?
                indent : null, // par defaut
                crs : null, // par defaut
                format : null, // (only to POST)
                sampling : null, // (only use by Profil)
                zonly : null // (only use by Elevation)
            }
        };

        // surcharge des valeurs obligatoires
        settings.param.positions = options.positions;
        settings.param.format = options.outputFormat;
        settings.param.sampling = options.sampling;
        settings.param.zonly = options.zonly;

        // gestion des callback
        var bOnError = !!(options.onError !== null && typeof options.onError === "function"); // cast variable to boolean
        var bOnSuccess = !!(options.onSuccess !== null && typeof options.onSuccess === "function");

        var message = null;
        switch (options.api) {
            case "REST":
                // FIXME les exceptions ne sont pas 'catchées' sur le constructeur !
                var myReq = new _AltiRequestREST__WEBPACK_IMPORTED_MODULE_2__["default"](settings);
                if (!myReq.processRequestString()) {
                    message = "Error in process request (rest) !";
                    if (bOnError) {
                        options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__["default"](message));
                        return;
                    }
                    throw new Error(message);
                }
                request = myReq.requestString;
                break;
            case "WPS":
                // ajout des valeurs par defaut spécifiques au service WPS
                settings.wps = {
                    service : null, // par defaut
                    version : null, // par defaut
                    identifier : null, // par defaut
                    rawdataoutput : null, // par defaut
                    request : null // par defaut
                };

                request = _AltiRequestWPS__WEBPACK_IMPORTED_MODULE_3__["default"].build(settings);
                if (!request) {
                    message = "Error in process request (wps) !";
                    if (bOnError) {
                        options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__["default"](message));
                        return;
                    }
                    throw new Error(message);
                }
                break;
            default:
                message = "Type of API is not supported by service (REST or WPS) !";
                if (bOnError) {
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_1__["default"](message));
                    return;
                }
                throw new Error(message);
        }

        if (bOnSuccess) {
            options.onSuccess.call(options.scope, request);
        }

        return request;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (AltiRequestFactory);


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _model_AltiElevationRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84);
/* harmony import */ var _model_AltiProfilRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86);
/* jshint multistr : true */






/**
 * @classdesc
 * Classe de gestion des requêtes de type REST sur le service altimetrique.
 *
 * @todo Le service Alti n'implemente pas le POST !?
 * @constructor
 * @alias Gp.Services.Alti.Request.AltiRequestREST
 * @param {Object} options - options
 * @param {Object}   options.param.positions - tableau de coordonnées lon/lat
 * @param {String}   options.param.delimiter - '|'
 * @param {Boolean}  options.param.indent - false|true
 * @param {String}   options.param.crs - 'CRS:84'
 * @param {String}   options.param.sampling - 3
 * @param {Boolean}  options.param.zonly - false|true
 * @param {String}   options.param.format - "JSON|XML"
 * @param {String}   options.type - "Profil|Elevation"
 * @param {String}   options.method - GET|POST
 *
 * @example
 *      var options = {
 *           type : 'Profil', // Elevation
 *           method : 'GET',  // par defaut
 *           param : {
 *               positions : [
 *                   {lon:'1.11', lat:'1.11'},
 *                   {lon:'1.10', lat:'1.10'},
 *                   {lon:'1.12', lat:'1.12'}
 *               ],
 *               delimiter : ";",         // par defaut
 *               indent    : true,        // par defaut
 *               crs       : 'EPSG:4326', // par defaut
 *               format    : 'json',      // par defaut (only to POST)
 *               sampling  : 3 ,          // par defaut (only use by Profil)
 *               zonly     : false        // par defaut (only use by Elevation)
 *           }
 *      };
 *
 *      var result;
 *      try {
 *          var obj = new AltiRequestREST (options);
 *          if (! obj.processRequestString ()) {
 *              throw new Error("Request empty !?")
 *          }
 *          result = obj.requestString;
 *      } catch (e) {
 *          // exceptions...
 *      }
 * @private
 */
function AltiRequestREST (options) {
    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("AltiRequestREST");
    this.logger.trace("[Constructeur AltiRequestREST ()]");

    if (!(this instanceof AltiRequestREST)) {
        throw new TypeError("AltiRequestREST constructor cannot be called as a function.");
    }

    this.options = options || {};

    // existance des options
    if (!this.options) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_EMPTY", "options"));
    }

    // type de requete : Altitude ou Profil
    // (param. à determiner en fonction des parametres d'entrée)
    if (!this.options.type) {
        throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_EMPTY", "type (Elevation or Profil)"));
    }

    // construction du modele de requête
    // (test du type d'objet candidat)
    this.DataObject = null;
    switch (this.options.type) {
        case "Elevation":
            this.DataObject = new _model_AltiElevationRequest__WEBPACK_IMPORTED_MODULE_2__["default"](this.options.param);
            break;
        case "Profil":
            this.DataObject = new _model_AltiProfilRequest__WEBPACK_IMPORTED_MODULE_3__["default"](this.options.param);
            break;
        default:
            throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_TYPE", "type (Elevation or Profil)"));
    }

    /**
     * methode.
     * Par defaut, "GET".
     */
    this.method = this.options.method || "GET";
}

AltiRequestREST.prototype = {

    /**
     * request
     * @type {String}
     */
    requestString : null,

    /**
     * Constructeur (alias)
     */
    constructor : AltiRequestREST,

    /**
     * Template de la requête.
     */
    template : {
        get : {
            // FIXME on retire le param 'delimiter' : &delimiter='__DELIMITER__'
            value : "lon=__LON__&lat=__LAT__&indent=__INDENT__&crs='__CRS__'",
            input : {
                point : "&zonly=__ZONLY__",
                profil : "&sampling=__SAMPLING__"
            }
        },
        post : {
            // FIXME on retire le param 'delimiter' : delimiter='__DELIMITER__'\n\
            value : "lon=__LON__\n" +
                "lat=__LAT__\n" +
                "indent=__INDENT__\n" +
                "crs='__CRS__'\n",
            input : {
                point : "zonly=__ZONLY__",
                profil : "sampling=__SAMPLING__"
            }
        }
    },

    /**
     * Construction de la requête.
     *
     * @example
     * // GET  out : lon=0.2367,2.1570&lat=48.0551,46.6077&delimiter=,&indent=true&zonly=true&crs='CRS:84'
     * // POST out : Not yet supported method POST !
     * @returns {String}
     */
    processRequestString : function () {
        this.logger.trace("AltiRequestREST::processRequestString ()");

        var template = "";
        if (this.method === "POST") {
            template = this.template.post.value;
        } else if (this.method === "GET") {
            template = this.template.get.value;
        }

        template = template.replace(/__LON__/g, this.DataObject.getLon());
        template = template.replace(/__LAT__/g, this.DataObject.getLat());
        // FIXME on retire le param 'delimiter'
        // template = template.replace(/__DELIMITER__/g, this.DataObject.delimiter);
        template = template.replace(/__INDENT__/g, this.DataObject.indent);
        template = template.replace(/__CRS__/g, this.DataObject.crs);

        // ajout +
        template = template + this.__addDataInputs();
        this.logger.trace("traduction tmpl", template);

        // sauvegarde
        this.requestString = template;

        return this.requestString;
    },

    /**
     * Ajout de parametres spécifiques (ex. zonly)
     *
     * @returns {String}
     */
    __addDataInputs : function () {
        this.logger.trace("AltiRequestREST::addDataInput ()");

        var myTemplate;
        if (this.method === "POST") {
            myTemplate = this.template.post;
        } else if (this.method === "GET") {
            myTemplate = this.template.get;
        } else {
            throw new Error("No other HTTP method supported by the service !");
        }

        var tmpl = null;
        if (this.DataObject.CLASSNAME === "AltiElevationRequest") {
            tmpl = myTemplate.input.point;
            return tmpl.replace(/__ZONLY__/g, this.DataObject.zonly);
        } else if (this.DataObject.CLASSNAME === "AltiProfilRequest") {
            tmpl = myTemplate.input.profil;
            return tmpl.replace(/__SAMPLING__/g, this.DataObject.sampling);
        } else {
            throw new Error("No other object supported than elevation or profil !?");
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (AltiRequestREST);


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _AltiRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85);




/**
 * @classdesc
 *
 * Classe de gestion des param. des requêtes de type POINT du service altimetrique.
 *
 * @constructor
 * @alias Gp.Services.Alti.Request.AltiElevationRequest
 * @param {Object} options - options
 * @param {Boolean}  options.zonly - false|true
 *
 * @private
 */
function AltiElevationRequest (options) {
    if (!(this instanceof AltiElevationRequest)) {
        throw new TypeError("AltiElevationRequest constructor cannot be called as a function.");
    }

    /**
     * Nom de la classe (heritage)
     */
    this.CLASSNAME = "AltiElevationRequest";

    // appel du constructeur par heritage
    _AltiRequest__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, arguments);

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger();
    this.logger.trace("[Constructeur AltiElevationRequest ()]");

    /**
     * Z uniquement.
     * true|false
     */
    this.zonly = this.options.zonly || false; // test des options héritées !
}

/**
 * @lends module:AltiElevationRequest#
 */

AltiElevationRequest.prototype = Object.create(_AltiRequest__WEBPACK_IMPORTED_MODULE_1__["default"].prototype, {

    /**
     * Setter/getter pour "zonly"
     */
    zonly : {
        /** getter */
        get : function () {
            return this._zonly;
        },
        /** setter */
        set : function (z) {
            this._zonly = z;
        }
    }

});

/**
 * Constructeur (alias)
 */
AltiElevationRequest.prototype.constructor = AltiElevationRequest;

/**
 * Tableau de clefs/valeurs pour param.
 *
 * @returns {Array}
 */
AltiElevationRequest.prototype.getData = function () {
    // par glop..., appel de AltiRequest::getData () !
    var map = [];
    map.push({
        k : "lon",
        v : this.getLon()
    });
    map.push({
        k : "lat",
        v : this.getLat()
    });
    // map.push({k : "delimiter", v : this.delimiter}); // FIXME on retire le param "delimiter"
    map.push({
        k : "indent",
        v : this.indent
    });
    map.push({
        k : "crs",
        v : this.crs
    });
    map.push({
        k : "zonly",
        v : this.zonly
    });
    map.push({
        k : "format",
        v : this.format
    });

    return map;
};

/* harmony default export */ __webpack_exports__["default"] = (AltiElevationRequest);


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);



/**
 * @classdesc
 * Classe de gestion des param. des requêtes du service altimetrique.
 *
 * @constructor
 * @alias Gp.Services.Alti.Request.AltiRequest
 * @param {Object} options - options
 * @param {Object}   options.positions - tableau de coordonnées lon/lat
 * @param {String}   options.delimiter - "|"
 * @param {Boolean}  options.indent - false|true
 * @param {String}   options.crs - "CRS:84"
 * @param {String}   options.format - "JSON|XML"
 *
 * @private
 */
function AltiRequest (options) {
    if (!(this instanceof AltiRequest)) {
        throw new TypeError("AltiRequest constructor cannot be called as a function.");
    }

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger();
    this.logger.trace("[Constructeur AltiRequest ()]");

    /**
     * Options en paramêtres du constructeur.
     */
    this.options = options || {};

    /**
     * Liste des coordonnées.
     * @example
     * var c = [{lon : "", lat : ""}, {lon : "", lat : ""}];
     */
    this.positions = this.options.positions || [];

    /**
     * Caractère de séparation.
     * Par defaut, "|".
     */
    this.delimiter = this.options.delimiter || "|";

    /**
     * Indentation.
     * true|false
     */
    this.indent = this.options.indent || false;

    /**
     * Projection.
     * Par defaut, CRS:84.
     */
    this.crs = this.options.crs || "CRS:84";

    /**
     * format de sortie.
     * Par defaut, "json".
     */
    this.format = this.options.format || "json";
}

/**
 * CLASSNAME
 */
AltiRequest.CLASSNAME = "AltiRequest";

AltiRequest.prototype = {

    /**
     * @lends module:AltiRequest#
     */

    /**
     * Constructeur (alias)
     */
    constructor : AltiRequest,

    /**
     * Ajout d"une liste de coordonnées.
     *
     * @param {Object[]} lstPosition - liste de positions
     * @example
     * obj.setPositions ([{lon : "0.15", lat : "0.15"}, {lon : "1.15", lat : "1.15"}]);
     */
    setPositions : function (lstPosition) {
        var positions = [];
        for (var i = 0; i < lstPosition.length; i++) {
            var o = lstPosition[i];
            if (o.lon && o.lat) {
                positions.push(o);
            }
        }

        this.positions = positions;
    },

    /**
     * Liste des coordonnées.
     *
     * @param {Int} pos - position
     * @returns {positions}
     * @example
     * obj.getPositions ();  // [{lon : "", lat : ""}, {lon : "", lat : ""}]
     * obj.getPositions (0); // [{lon : "", lat : ""}]
     */
    getPositions : function (pos) {
        // FIXME test if not a number !?
        if (!pos) {
            return this.positions;
        }

        var index = this.positions.length - 1;
        if (pos > index || pos < index) {
            this.logger.warn("index out of range !");
            return this.positions;
        }

        return this.positions[pos];
    },

    /**
     * Ajout d"une liste de coordonnées.
     *
     * @param {Object[]} lstPosition - liste de positions
     * @example
     * obj.addPositions ([{lon : "0.15", lat : "0.15"}, {lon : "1.15", lat : "1.15"}]);
     */
    addPositions : function (lstPosition) {
        for (var i = 0; i < lstPosition.length; i++) {
            var o = lstPosition[i];
            if (o.lon && o.lat) {
                this.positions.push(lstPosition[i]);
            }
        }
    },

    /**
     * Retourne la liste des longitudes avec un caractère de séparation.
     *
     * @returns {String} - une liste de longitudes
     * @example
     * // out : 0.2367|2.1570|43.789|...
     */
    getLon : function () {
        var lstLon = [];
        for (var i = 0; i < this.positions.length; i++) {
            lstLon.push(this.positions[i].lon);
        }
        this.logger.trace(lstLon);
        return lstLon.join(this.delimiter);
    },

    /**
     * Retourne la liste des lattitudes avec un caractère de séparation.
     *
     * @returns {String} - une liste de lattitudes
     * @example
     * // out : 0.2367|2.1570|43.789|...
     */
    getLat : function () {
        var lstLat = [];
        for (var i = 0; i < this.positions.length; i++) {
            lstLat.push(this.positions[i].lat);
        }
        this.logger.trace(lstLat);
        return lstLat.join(this.delimiter);
    }

};

/**
 * Tableau de clefs/valeurs pour param.
 *
 * @returns {Object[]}
 */
AltiRequest.prototype.getData = function () {
    var map = [];

    map.push({
        k : "lon",
        v : this.getLon()
    });
    map.push({
        k : "lat",
        v : this.getLat()
    });
    map.push({
        k : "delimiter",
        v : this.delimiter
    });
    map.push({
        k : "indent",
        v : this.indent
    });
    map.push({
        k : "crs",
        v : this.crs
    });
    map.push({
        k : "format",
        v : this.format
    });

    return map;
};

/* harmony default export */ __webpack_exports__["default"] = (AltiRequest);


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _AltiRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85);




/**
 * @classdesc
 * Classe de gestion des param. des requêtes de type PROFIL du service altimetrique.
 *
 * @constructor
 * @alias Gp.Services.Alti.Request.AltiProfilRequest
 * @param {Object}   options - options
 * @param {String}   options.sampling - 3
 *
 * @private
 */
function AltiProfilRequest (options) {
    if (!(this instanceof AltiProfilRequest)) {
        throw new TypeError("AltiProfilRequest constructor cannot be called as a function.");
    }

    /**
     * Nom de la classe (heritage)
     */
    this.CLASSNAME = "AltiProfilRequest";

    // appel du constructeur par heritage
    _AltiRequest__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, arguments);

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger();
    this.logger.trace("[Constructeur AltiProfilRequest ()]");

    /**
     * Sampling
     * Par defaut, 3
     */
    this.sampling = this.options.sampling || 3; // test des options héritées !
}

/**
 * @lends module:AltiProfilRequest#
 */

AltiProfilRequest.prototype = Object.create(_AltiRequest__WEBPACK_IMPORTED_MODULE_1__["default"].prototype, {

    /**
     * Setter/getter pour "sampling"
     */
    sampling : {
        /** getter */
        get : function () {
            return this._sampling;
        },
        /** setter */
        set : function (value) {
            this._sampling = value;
        }
    }
});

/**
 * Constructeur (alias)
 */
AltiProfilRequest.prototype.constructor = AltiProfilRequest;

/**
 * Tableau de clefs/valeurs pour param.
 *
 * @returns {Object[]}
 */
AltiProfilRequest.prototype.getData = function () {
    // par glop..., appel de AltiRequest::getData () !
    var map = [];
    map.push({
        k : "lon",
        v : this.getLon()
    });
    map.push({
        k : "lat",
        v : this.getLat()
    });
    // map.push({k : "delimiter", v : this.delimiter}); // FIXME on retire le param "delimiter"
    map.push({
        k : "indent",
        v : this.indent
    });
    map.push({
        k : "crs",
        v : this.crs
    });
    map.push({
        k : "sampling",
        v : this.sampling
    });
    map.push({
        k : "format",
        v : this.format
    });

    return map;
};

/* harmony default export */ __webpack_exports__["default"] = (AltiProfilRequest);


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Formats_WPS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);
/* harmony import */ var _model_AltiElevationRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84);
/* harmony import */ var _model_AltiProfilRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86);
/**
 * Classe d'interface des requêtes de type WPS sur le service altimetrique.
 * (Factory)
 *
 * @module Gp.Services.Alti.Request.AltiRequestWPS
 * @alias Gp.Services.Alti.Request.AltiRequestWPS
 * @private
 */






var AltiRequestWPS = {

    /**
     * Interface unique de construction de la requête.
     *
     * @method build
     * @param {Object} options - options
     * @param {Object}   options.param.positions - tableau de coordonnées lon/lat
     * @param {String}   options.param.delimiter - '|'
     * @param {Boolean}  options.param.indent - false|true
     * @param {String}   options.param.crs - 'CRS:84'
     * @param {String}   options.param.sampling - 3
     * @param {Boolean}  options.param.zonly - false|true
     * @param {String}   options.param.format - "JSON|XML" (only to POST)
     * @param {String}   options.wps.service - "WPS"
     * @param {String}   options.wps.version - "1.0.0"
     * @param {String}   options.wps.identifier - "gs:WPSElevation|gs:WPSLineElevation"
     * @param {String}   options.wps.rawdataoutput - "result"
     * @param {String}   options.wps.request - "Execute"
     * @param {String}   options.type - "Profil|Elevation"
     * @param {String}   options.method - GET|POST
     * @example
     *      var options = {
     *           type : 'Profil', // Elevation
     *           method : 'GET',  // par defaut
     *           param : {
     *               positions : [
     *                   {lon:'1.11', lat:'1.11'},
     *                   {lon:'1.10', lat:'1.10'},
     *                   {lon:'1.12', lat:'1.12'}
     *               ],
     *               delimiter : ";",         // par defaut
     *               indent    : true,        // par defaut
     *               crs       : 'EPSG:4326', // par defaut
     *               format    : 'json',      // par defaut (only to POST)
     *               sampling  : 3 ,          // par defaut (only use by Profil)
     *               zonly     : false,       // par defaut (only use by Elevation)
     *           },
     *           wps : {
     *                 service : 'WPS',         // par defaut
     *                 version : '1.0.0',       // par defaut
     *                 identifier : 'gs:WPS',   // par defaut, Elevation = gs:WPSElevation, Profil = gs:WPSLineElevation
     *                 rawdataoutput : 'result',// par defaut
     *                 request : 'Execute'      // par defaut
     *           }
     *       };
     */
    build : function (options) {
        // logger
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("AltiRequestWPS");
        logger.trace(["AltiRequestWPS::build()"]);

        // existance des options
        if (!options) {
            throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_EMPTY", "options"));
        }

        // type de requete : Altitude ou Profil
        // (param. à determiner en fonction des parametres d'entrée)
        if (!options.type) {
            throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_EMPTY", "type (Elevation or Profil)"));
        }

        // construction du modele de requête
        // (test du type d'objet candidat)
        var DataObject = null;
        switch (options.type) {
            case "Elevation":
                // surcharge
                options.wps.identifier = "gs:WPSElevation";
                DataObject = new _model_AltiElevationRequest__WEBPACK_IMPORTED_MODULE_3__["default"](options.param);
                break;
            case "Profil":
                // surcharge
                options.wps.identifier = "gs:WPSLineElevation";
                DataObject = new _model_AltiProfilRequest__WEBPACK_IMPORTED_MODULE_4__["default"](options.param);
                break;
            default:
                throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("PARAM_TYPE", "type (Elevation or Profil)"));
        }

        // construction de la requête WPS
        var settings = {
            data : DataObject,
            method : options.method,
            param : options.wps
        };

        var rqstWPS = new _Formats_WPS__WEBPACK_IMPORTED_MODULE_2__["default"](settings);

        if (!rqstWPS.processRequestString()) {
            throw new Error("Enable to process request !");
        }

        return rqstWPS.requestString;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (AltiRequestWPS);


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);


/**
 * @classdesc
 * Standard WPS
 *
 * @constructor
 * @alias Gp.Formats.WPS
 * @param {Object} options - options
 * @param {Object}   options.data - objet
 * @param {String}   options.method - POST|GET
 * @param {String}   options.param.service - "WPS"
 * @param {String}   options.param.version - "1.0.0"
 * @param {String}   options.param.identifier - "gs:WPSElevation|gs:WPSLineElevation"
 * @param {String}   options.param.rawdataoutput - "result"
 * @param {String}   options.param.request - "Execute"
 * @param {Function} options.onsuccess - function callback success (TODO)
 * @param {Function} options.onerror   - function callback error   (TODO)
 * @private
 */
function WPS (options) {
    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger();
    this.logger.trace("[Constructeur WPS()]");

    if (!(this instanceof WPS)) {
        throw new TypeError("WPS constructor cannot be called as a function.");
    }

    this.options = options || {};

    /**
     * Objet DATA
     */
    this.DataObject = this.options.data;

    if (!this.DataObject) {
        throw new TypeError("This data object is not defined !");
    }

    /**
     * param service.
     * Par defaut, "WPS".
     */
    this.paramservice = this.options.param.service || "WPS";

    /**
     * param version.
     * Par defaut, "1.0.0".
     */
    this.paramversion = this.options.param.version || "1.0.0";

    /**
     * param identifier
     * Par defaut, "gs:WPS"
     */
    this.paramidentifier = this.options.param.identifier || "gs:WPS";

    /**
     * param rawdataoutput
     * Par defaut, "result".
     */
    this.paramrawdataoutput = this.options.param.rawdataoutput || "result";

    /**
     * param request
     * Par defaut, "Execute".
     */
    this.paramrequest = this.options.param.request || "Execute";

    /**
     * methode.
     * Par defaut, "GET".
     */
    this.method = this.options.method || "GET";
}

WPS.prototype = {

    /**
     * @lends module:WPS#
     */

    /**
     * request
     * @type {String}
     */
    requestString : null,

    /**
     * Constructeur (alias)
     */
    constructor : WPS,

    /**
     * Template de la requête.
     */
    template : {
        get : {
            value : "service=__SERVICE__" +
                "&version=__VERSION__" +
                "&rawdataoutput=__RAWDATAOUTPUT__" +
                "&identifier=__IDENTIFIER__" +
                "&request=__REQUEST__" +
                "&datainputs=<!-- __DATAINPUTS__ -->",

            input : "__KEY__=__DATA__"

        },
        post : {

            value : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<wps:__REQUEST__ version=\"__VERSION__\" service=\"__SERVICE__\" " +
                "__NAMESPACE__ __SCHEMALOCATION__>" +
                "<ows:Identifier>__IDENTIFIER__</ows:Identifier>" +
                "<wps:DataInputs>" +
                "<!-- __DATAINPUTS__ -->" +
                "</wps:DataInputs>" +
                "<wps:ResponseForm>" +
                "<wps:RawDataOutput>" +
                "<ows:Identifier>__RAWDATAOUTPUT__</ows:Identifier>" +
                "</wps:RawDataOutput>" +
                "</wps:ResponseForm>" +
                "</wps:__REQUEST__>",

            input : "<wps:Input>" +
                "<ows:Identifier>__KEY__</ows:Identifier>" +
                "<wps:Data>" +
                "<wps:LiteralData>__DATA__</wps:LiteralData>" +
                "</wps:Data>" +
                "</wps:Input>"
        }
    },

    /**
     * Namespace par defaut de la requete POST.
     *
     * @returns {String} namespace
     */
    namespaceByDefault : function () {
        var ns = [
            "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"",
            "xmlns=\"http://www.opengis.net/wps/1.0.0\"",
            "xmlns:wfs=\"http://www.opengis.net/wfs\"",
            "xmlns:wps=\"http://www.opengis.net/wps/1.0.0\"",
            "xmlns:ows=\"http://www.opengis.net/ows/1.1\"",
            "xmlns:gml=\"http://www.opengis.net/gml\"",
            "xmlns:ogc=\"http://www.opengis.net/ogc\"",
            "xmlns:wcs=\"http://www.opengis.net/wcs/1.1.1\"",
            "xmlns:xlink=\"http://www.w3.org/1999/xlink\""
        ];

        return ns.join(" ");
    },

    /**
     * Schemalocation par defaut.
     *
     * @returns {String} schemaLocation
     */
    schemaLocationByDefault : function () {
        return "xsi:schemaLocation=\"http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd\"";
    },

    /**
     * Construction de la requête.
     *
     * @example
     * // GET  out :
     * //  service=__SERVICE__
     * //  &version=__VERSION__
     * //  &rawdataoutput=__RAWDATAOUTPUT__
     * //  &identifier=__IDENTIFIER__
     * //  &request=__REQUEST__
     * //  &datainputs="__DATAINPUTS__"
     * //  avec __DATAINPUTS__ = __KEY__=__DATA__;...
     *
     * // POST out :
     * //      <?xml version=\"1.0\" encoding=\"UTF-8\"?>
     * //      <wps:__REQUEST__ version=\"__VERSION__\" service=\"__SERVICE__\"
     * //         __NAMESPACE__ __SCHEMALOCATION__>
     * //          <ows:Identifier>__IDENTIFIER__</ows:Identifier>
     * //          <wps:DataInputs>
     * //              <!-- __DATAINPUTS__ -->
     * //          </wps:DataInputs>
     * //          <wps:ResponseForm>
     * //              <wps:RawDataOutput>
     * //              <ows:Identifier>__RAWDATAOUTPUT__</ows:Identifier>
     * //              </wps:RawDataOutput>
     * //          </wps:ResponseForm>
     * //      </wps:__REQUEST__>",
     * //      avec __DATAINPUTS__
     * //             <wps:Input>
     * //                  <ows:Identifier>__KEY__</ows:Identifier>
     * //                  <wps:Data>
     * //                    <wps:LiteralData>__DATA__</wps:LiteralData>
     * //                  </wps:Data>
     * //              </wps:Input>
     *
     * @returns {Boolean} validation de la construction de la requete
     */
    processRequestString : function () {
        this.logger.trace("WPS::processRequestString ()");

        var template = "";
        if (this.method === "POST") {
            template = this.template.post.value;
        } else if (this.method === "GET") {
            template = this.template.get.value;
        } else {
            this.logger.error("No other method supported by the service !");
            return false;
        }

        template = template.replace(/__SERVICE__/g, this.paramservice);
        template = template.replace(/__VERSION__/g, this.paramversion);
        template = template.replace(/__RAWDATAOUTPUT__/g, this.paramrawdataoutput);
        template = template.replace(/__IDENTIFIER__/g, this.paramidentifier);
        template = template.replace(/__REQUEST__/g, this.paramrequest);

        // ajout +
        if (this.method === "POST") {
            template = template.replace(/__NAMESPACE__/g, this.namespaceByDefault);
            template = template.replace(/__SCHEMALOCATION__/g, this.schemaLocationByDefault);
        }

        // ajout des datainputs
        template = template.replace(/<!-- __DATAINPUTS__ -->/g, this.__addDataInputs());

        if (!template) {
            this.logger.warn("traduction tmpl : empty request !?");
            return false;
        }

        this.requestString = template;
        this.logger.trace("traduction tmpl", template);

        return true;
    },

    /**
     * Ajout des données
     *
     * @returns {String} Données concaténées dans une chaine
     */
    __addDataInputs : function () {
        this.logger.trace("WPS::__addDataInputs ()");

        // c'est un peu grossier...
        var tmpl = this.method === "GET" ? this.template.get.input : this.template.post.input;
        var sep = this.method === "GET" ? ";" : "";

        var result = "";
        var that = this;
        var map = this.DataObject.getData();
        for (var i = 0; i < map.length; i++) {
            // FIXME closure ?
            (function (j) {
                if (sep) {
                    sep = (j === map.length - 1) ? "" : ";";
                }
                result = result.concat(that.__addDataInput(tmpl, map[j].k, map[j].v), sep);
            })(i);
        }

        return result;
    },

    /**
     * Ajout d'une donnée.
     *
     * @param {String} tmpl - template
     * @param {String} key - clef
     * @param {String} data - valeur
     * @returns {String} chaine avec les substitutions clef/valeur
     */
    __addDataInput : function (tmpl, key, data) {
        var tmp = tmpl;
        tmp = tmp.replace(/__KEY__/g, key);
        tmp = tmp.replace(/__DATA__/g, data);
        return tmp;
    },

    /**
     * Definir le mode de requête
     *
     * @param {String} method - GET|POST
     */
    setMethod : function (method) {
        if (method === "GET" || method === "POST") {
            this.method = method;
        } else {
            this.logger.warn("support only GET and POST method !");
        }
    },

    /**
     * Retourne le mode de requete (GET|POST).
     *
     * @returns {AltiRequest.options.mode|String} methode (GET|POST)
     */
    getMethod : function () {
        return this.method;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (WPS);


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/* harmony import */ var _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43);
/* harmony import */ var _Formats_XML__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(90);
/* harmony import */ var _Formats_AltiResponseReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(91);
/* harmony import */ var _model_AltiResponse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92);
/* harmony import */ var _model_Elevation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93);
/**
 * Factory pour générer une reponse JSON à partir d'un XML ou d'un JSON
 * (Factory)
 *
 * @module AltiResponseFactory
 * @private
 * @alias Gp.Services.Alti.Response.AltiResponseFactory
 */








var AltiResponseFactory = {

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
        var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("AltiResponseFactory");
        logger.trace(["AltiResponseFactory::build()"]);

        var data = null;

        if (options.response) {
            if (options.rawResponse) {
                logger.trace("analyze response : raw");
                data = options.response;
            } else {
                switch (options.outputFormat) {
                    case "xml":
                        logger.trace("analyze response : xml");

                        try {
                            var p = new _Formats_XML__WEBPACK_IMPORTED_MODULE_3__["default"]({
                                reader : _Formats_AltiResponseReader__WEBPACK_IMPORTED_MODULE_4__["default"]
                            });

                            if (typeof options.response === "string") {
                                p.setXMLString(options.response);
                            } else {
                                p.setXMLDoc(options.response);
                            }

                            data = p.parse();

                            if (!data) {
                                throw new Error(_Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION_2"));
                            }
                        } catch (e) {
                            var message = e.message;
                            options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                                message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION", message),
                                status : 200,
                                type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"].TYPE_SRVERR
                            }));
                            return;
                        }

                        break;

                    case "json":
                        logger.trace("analyze response : json");
                        logger.trace("analyze response : ", typeof options.response);

                        var JSONResponse = null;
                        if (typeof options.response === "string") {
                            JSONResponse = JSON.parse(options.response);
                        } else {
                            JSONResponse = options.response;
                        }

                        // le service renvoie t il une erreur ?
                        if (JSONResponse && JSONResponse.error) {
                            // ex. {"error": {"code": "BAD_PARAMETER","description": "The values () cannot be parsed as a valid longitude (double value such as -180 < lat < 180)."}}
                            options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                                message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION", JSONResponse.error.description),
                                status : 200,
                                type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"].TYPE_SRVERR
                            }));
                            return;
                        }

                        // analyse de la reponse
                        if (JSONResponse) {
                            var elevations = JSONResponse.elevations;
                            var altiResponse = new _model_AltiResponse__WEBPACK_IMPORTED_MODULE_5__["default"]();
                            var elevation;
                            if (Array.isArray(elevations) && elevations.length) {
                                for (var i = 0; i < elevations.length; i++) {
                                    elevation = new _model_Elevation__WEBPACK_IMPORTED_MODULE_6__["default"]();

                                    if (typeof elevations[i] === "object") {
                                        // elevations[i] est un objet elevation
                                        if (elevations[i].lon) {
                                            elevation.lon = elevations[i].lon;
                                        }
                                        if (elevations[i].lat) {
                                            elevation.lat = elevations[i].lat;
                                        }
                                        if (elevations[i].z) {
                                            elevation.z = elevations[i].z;
                                        }
                                        if (elevations[i].acc) {
                                            elevation.acc = elevations[i].acc;
                                        }
                                    } else if (typeof elevations[i] === "number") {
                                        // elevations[i] est un nombre, dans le cas de zonly=true notamment
                                        elevation.z = elevations[i];
                                    }

                                    if (Array.isArray(altiResponse.elevations)) {
                                        altiResponse.elevations.push(elevation);
                                    }
                                }
                            }
                            data = altiResponse;
                        }

                        if (!data) {
                            options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                                message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_ANALYSE_2"),
                                type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"].TYPE_UNKERR,
                                status : -1
                            }));
                            return;
                        }
                        break;

                    default:
                        options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                            message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_FORMAT_2"),
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
                } else if (data.error) {
                    var errorMess = data.error.description;
                    options.onError.call(options.scope, new _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"]({
                        message : _Utils_MessagesResources__WEBPACK_IMPORTED_MODULE_1__["default"].getMessage("SERVICE_RESPONSE_EXCEPTION", errorMess),
                        type : _Exceptions_ErrorService__WEBPACK_IMPORTED_MODULE_2__["default"].TYPE_SRVERR,
                        status : 200
                    }));
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

/* harmony default export */ __webpack_exports__["default"] = (AltiResponseFactory);


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* global require */


// import __xmldom from "xmldom";

/**
 * @classdesc
 *
 * Classe permettant d'écrire ou de lire du XML, sous forme de document DOM,
 * éventuellement selon des clés de lecture (readers) ou d'écriture (writers) spécifiques.
 *
 * @constructor
 * @alias Gp.Formats.XML
 *
 * @param {Object} [options] - options du format XML
 *
 * @param {Object} [options.reader] - Instance d'un Reader de service (AltiResponseReader, GeocodeRequestReader, etc.)
 *      utile pour interpréter le XML lorsque sa structure est connue.
 *      Ce reader doit comporter au moins une fonction statique read (root) permettant d'initialiser la lecture.
 *
 * @param {Object} [options.writers] - writers
 *
 * @param {String} [options.xmlString] - chaîne de caractère contenant du XML à interpréter.
 *
 * @private
 */
function XML (options) {
    if (!(this instanceof XML)) {
        throw new TypeError("XML constructor cannot be called as a function.");
    }

    // FIXME : notion de singleton

    this.logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger();
    this.logger.trace("[Constructeur XML ()]");

    /**
     * Chaîne de caractères contenant le texte XML
     * @type {String}
     */
    this.xmlString = null;

    /**
     * DOM Element correspondant à la structure du XML.
     * @type {DOMElement}
     */
    this.xmlDoc = null;

    /**
     * Objet contenant des fonctions de lecture des différentes balises XML.
     * @type {Object}
     */
    this.reader = null;

    // traitement des paramètres d'options s'il y en a
    if (options) {
        if (options.xmlString && typeof options.xmlString === "string") {
            this.xmlString = options.xmlString;
            // Si une chaine de caractère a été passée en entrée : on la transforme aussi en XML document
            this.xmlDoc = __getXMLDOC(options.xmlString);
        }
        if (options.reader) {
            this.setReader(options.reader);
        }
    }
}

XML.prototype = {

    /**
     * @lends module:XML
     */

    /*
     * Constructeur (alias)
     */
    constructor : XML,

    /**
     * Méthode permettant de récupérer la chaîne de caractères associée au format XML
     *
     * @returns {String} xmlString - la chaîne de caractères correspondant au format XML
     */
    getXMLString : function () {
        return this.xmlString;
    },

    /**
     * Méthode permettant d'attribuer une chaîne de caractères au format XML (attribut xmlString).
     * La méthode va aussi transformer cette chaîne de caractères en document XML,
     * afin de remplir l'attribut xmlDoc.
     *
     * @param {String} xmlString - la chaîne de caractères correspondant au format XML
     */
    setXMLString : function (xmlString) {
        if (xmlString && typeof xmlString === "string") {
            this.xmlString = xmlString;
            this.xmlDoc = __getXMLDOC(xmlString);
        }
    },

    /**
     * Méthode permettant de récupérer les readers associés au format XML, s'ils ont été définis
     *
     * @return {Object} readers - les readers associés au format XML, s'ils existent,
     *      sous forme d'une collection de fonctions
     */
    getReader : function () {
        return this.reader;
    },

    /**
     * Méthode permettant d'attribuer des readers, sous la forme d'un objet de fonctions (node, data),
     *      lorsqu'ils n'ont pas été définis lors de l'instanciation par exemple (new XML (options)).
     *
     * @param {Object} reader - Instance d'un Reader de service (AltiResponseReader, GeocodeRequestReader, etc.)
     *      utile pour interpréter le XML lorsque sa structure est connue.
     *      Ce reader doit comporter au moins une fonction statique read (root) permettant d'initialiser la lecture.
     */
    setReader : function (reader) {
        if (reader && reader.read && typeof reader.read === "function") {
            this.reader = reader;
        }
    },

    /**
     * Méthode permettant de récupérer le document XML associé au format, s'il existe.
     *
     * @return {DOMElement} xmlDoc - le document XML (DOM document node) s'il existe
     */
    getXMLDoc : function () {
        return this.xmlDoc;
    },

    /**
     * Setter
     */
    setXMLDoc : function (doc) {
        this.xmlDoc = doc;
    },
    /**
     * Méthode initialisant la lecture du XML, à partir d'un XML Document :
     *      création d'un objet JavaScript contenant les informations du XML,
     *      sauf dans le cas où il n'existe pas de XML Document à interpréter (retourne un objet vide).
     *
     * @return {Object} [parserOutput] - un objet JavaScript contenant les informations du XML :
     * - soit toutes les informations si aucun reader n'a été spécifié à la création du format
     * - soit les informations spécifiées dans le reader.
     */
    parse : function () {
        // build xml document from xmlString
        if (!this.xmlDoc && this.xmlString) {
            this.xmlDoc = __getXMLDOC(this.xmlString);
        }
        if (this.xmlDoc) {
            var root = __getRootNode(this.xmlDoc);
            if (root) {
                var parserOutput;
                // call reader if exists
                if (this.reader && this.reader.read) {
                    parserOutput = this.reader.read(root);
                } else {
                    parserOutput = {};
                    parserOutput[root.nodeName] = __readDefault(root);
                }
                return parserOutput;
            } else {
                return {};
            }
        }
    }

};

/**
 * Méthode de la classe (privée) permettant de créer un XML Document à partir d'une chaîne de caractères XML,
 *      en utilisant DOMParser () lorsque c'est possible.
 *      For more information, see: https://dvcs.w3.org/hg/innerhtml/raw-file/tip/index.html#the-domparser-interface
 *
 * @private
 * @memberof XML
 * @method __getXMLDOC
 * @param {String} xmlString - xml string to be converted into DOM element
 * @return {DOMElement} - the corresponding XML Document
 */
function __getXMLDOC (xmlString) {
    if (typeof window === "undefined") {
        // env. nodejs
        var DOMParser = __webpack_require__(52).DOMParser; // __xmldom.DOMParser;
        return new DOMParser().parseFromString(xmlString, "text/xml");
    } else {
        // env. browser

        var parser;
        var xmlDoc;
        var errorMsg = "Erreur lors du parsing de la réponse du service : XML non conforme";

        if (window.ActiveXObject) {
            // Internet Explorer < 9
            xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlString);
            var parseError = xmlDoc.parseError;
            if (parseError.errorCode) {
                if (parseError.line && parseError.linepos) {
                    errorMsg += "( ligne " + parseError.line + ", colonne " + parseError.linepos;
                }
                if (parseError.reason) {
                    errorMsg += ":  " + parseError.reason + ")";
                }
                throw new Error(errorMsg);
            }
            return xmlDoc;
        } else if (window.DOMParser) {
            // les autres (Chrome, Mozilla, IE >= 9)
            parser = new window.DOMParser();
            try {
                xmlDoc = parser.parseFromString(xmlString, "text/xml");
            } catch (e) {
                // Internet Explorer browser raises exception if xmlString is not valid XML
                if (e.message === "SyntaxError") {
                    throw new Error(errorMsg);
                } else {
                    throw new Error("Erreur lors du parsing de la réponse du service : " + e.message);
                }
            }
            // look for parsing error in case no exception was raised
            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                var parsererror = xmlDoc.getElementsByTagName("parsererror");
                for (var i = 0; i < parsererror.length; i++) {
                    var content = parsererror[i].innerHTML;
                    // except in case parsererror is just because of huge xml, but parsing is done.
                    if (content.indexOf("Huge input lookup") === -1) {
                        errorMsg += "(" + content + ")";
                        throw new Error(errorMsg);
                    }
                }
            } else if (!xmlDoc.documentElement) { // may happen in chrome browser
                throw new Error(errorMsg);
            }
            return xmlDoc;
        } else {
            // FIXME
            throw new Error("Incompatible DOM Parser pour ce navigateur !");
        }
    }
}

/**
 * Méthode de la classe (privée) permettant de récupérer le noeud racine du document,
 *      à partir d'un document node (nodeType=9), puis lecture de ce noeud (readNode)
 *
 * @private
 * @memberof XML
 * @method __getRootNode
 * @param {DOMElement} [xmlDoc] - a Document Node
 * @return {DOMElement} root - the document root node
 */
function __getRootNode (xmlDoc) {
    var root;
    if (xmlDoc.nodeType === 9) {
        // INFO : nodeType 9 represents the entire document (the root-node of the DOM tree)
        root = xmlDoc.documentElement;
    } else if (xmlDoc.nodeType === 1) {
        root = xmlDoc;
    }
    return root;
}

/**
 * Méthode de la classe (privée) permettant de lire automatiquement un noeud XML,
 *      lorsqu'aucun reader spécifique n'a été spécifié (parser brut)
 *
 * @private
 * @memberof XML
 * @method readDefault
 * @param {DOMElement} node - a DOM element node
 * @example final data object looks like :
 *          data = {
 *              attributeName: attributeValue,
 *              childName: {
 *                  attributeName: attributeValue,
 *                  attributeName: attributeValue,
 *                  childName: {
 *                      "textContent": textContent
 *                  },
 *                  childName: {
 *                      childName: {
 *                          attributeName:attributeValue
 *                      }
 *                  }
 *              }
 *          }
 */
function __readDefault (node) {
    var data = {};

    // if element node has attributes, set their values to data
    if (node.attributes.length > 0) {
        var dataAttributes = __getAttributes(node);
        data["attributes"] = dataAttributes;
    }

    // if element node has childNodes, read them and set them to data
    if (node.hasChildNodes()) {
        var childData = {};
        var child;
        var children = node.childNodes;

        for (var i = 0; i < children.length; i++) {
            child = children[i];

            if (child.nodeType === 3) { // TEXT_NODE
                data["textContent"] = child.nodeValue;
            } else if (child.nodeType === 1) {
                childData = __readDefault(child);

                if (!data[child.nodeName]) {
                    // store childData in an object
                    data[child.nodeName] = childData;
                } else {
                    // in case several childNodes has the same name : store them in an array.
                    // if data[nodeName] already exists but is not an array
                    if (!Array.isArray(data[child.nodeName])) {
                        var old = data[child.nodeName];
                        data[child.nodeName] = [];
                        data[child.nodeName].push(old);
                    }
                    data[child.nodeName].push(childData);
                }
            }
            // TODO : manage other node types (4=CDATA, etc)
        }
    }

    return data;
}

/**
 * Méthode de la classe (privée) permettant de récupérer les attributs d'un noeud élément
 *
 * @private
 * @memberof XML
 * @method __getAttributes
 * @param {DOMElement} node - noeud contenant l'attribut recherché
 * @return {Object} nodeAttributes - objet contenant les noms et valeurs des différents attributs
 */
function __getAttributes (node) {
    if (node.attributes.length > 0) {
        var nodeAttributes = {};
        var attributes = node.attributes;
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            nodeAttributes[attribute.nodeName] = attribute.nodeValue;
        }
        return nodeAttributes;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (XML);


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Response_model_AltiResponse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92);
/* harmony import */ var _Response_model_Elevation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93);

/**
 * Fonction retournant un objet contenant des clés de lecture (readers)
 *      qui permettent de parser des réponses XML du service Altimétrique du Géoportail
 *      (calcul altimétrique simple ou profil altimétrique d'une courbe),
 *      lorsque le paramètre output = xml,
 *      afin de récupérer les élévations retournées.
 *
 * @module AltiResponseReader
 * @alias Gp.Services.Alti.Formats.AltiResponseReader
 * @private
 */

// import Logger from "../../../Utils/LoggerByDefault";



/**
 *
 * Objet AltiResponseReader
 *
 * @member {Object} AltiResponseReader
 *
 * @property {Object} AltiResponseReader.READERS - Objet contenant des fonctions de lecture, appelées "readers"
 *      dont chaque clé correspond au nom d'un tag du XML que l'on souhaite lire
 *      et la valeur associée est une fonction (node, data)
 *      où node est un noeud du document DOM
 *      et data est un objet où l'on stocke les informations lues dans le XML.
 *
 * @property {Method} AltiResponseReader.READERS.elevations -  Lecture d'un noeud "elevations" de la réponse XML
 *      du service alti, correspondant logiquement à la racine du document
 *      (contient un ou plusieurs childNodes correspondant chacun à une élévation retournée)
 *
 * @property {Method} AltiResponseReader.READERS.elevation - ecture d'un noeud "elevation" de la réponse xml du service alti.
 *      (contient un ou 4 childNode (s) correspondant à l'altitude (z) et éventuellement lat, lon, et acc)
 *
 * @property {Method} AltiResponseReader.READERS.lat - Lecture d'un noeud "lat" de la réponse xml du service alti.
 *      (contient une valeur de latitude, qui est un flottant)
 *
 * @property {Method} AltiResponseReader.READERS.lon - Lecture d'un noeud "lon" de la réponse xml du service alti.
 *      (contient une valeur de longitude, qui est un flottant)
 *
 * @property {Method} AltiResponseReader.READERS.z - Lecture d'un noeud "z" de la réponse xml du service alti.
 *      (contient une valeur d'altitude, qui est un flottant)
 *
 * @property {Method} AltiResponseReader.READERS.acc - Lecture d'un noeud "acc" de la réponse xml du service alti.
 *      (contient une valeur de précision, qui est un flottant)
 *
 * @property {Method} AltiResponseReader.READERS.exceptionreport - Lecture d'un noeud "ExceptionReport" de la réponse xml du service alti.
 *
 * @property {Method} AltiResponseReader.READERS.exception - Lecture d'un noeud "Exception" de la réponse xml du service alti.
 *
 * @property {Method} AltiResponseReader.read - Méthode permettant de lancer la lecture d'une réponse XML du service altimétrique,
 *      à l'aide des readers de la classe.
 *
 */
var AltiResponseReader = {};

AltiResponseReader.READERS = {

    /**
     * Lecture d'un noeud "elevations" de la réponse XML du service alti, correspondant logiquement à la racine du document
     *      (contient un ou plusieurs childNodes correspondant chacun à une élévation retournée)
     *
     * @param {DOMElement} root - racine de la réponse XML
     * @static
     * @memberof AltiResponseReader
     * @returns {Object} Retourne un objet de type AltiResponse
     */
    elevations : function (root) {
        // INFO : on passe en paramètre l'objet en entrée elevations, vide, à remplir.
        var altiResponse = new _Response_model_AltiResponse__WEBPACK_IMPORTED_MODULE_0__["default"]();

        if (root.hasChildNodes()) {
            var children = root.childNodes;
            var child;
            var elevation;

            for (var i = 0; i < children.length; i++) {
                child = children[i];

                if (AltiResponseReader.READERS[child.nodeName]) {
                    elevation = AltiResponseReader.READERS[child.nodeName](child);
                    altiResponse.elevations.push(elevation);
                }
            }
        }

        return altiResponse;
    },

    /**
     * Lecture d'un noeud "elevation" de la réponse xml du service alti.
     *      (contient un ou 4 childNode (s) correspondant à l'altitude (z) et éventuellement lat, lon, et acc)
     *
     * @param {DOMElement} node - noeud elevation à lire pour récupérer les informations de l'élévation retournée (z [, lon, lat, acc])
     * @return {Array} elevationResponse - format de la réponse en sortie, instance de AltiResponse
     * @static
     * @memberof AltiResponseReader
     */
    elevation : function (node) {
        var elevation = new _Response_model_Elevation__WEBPACK_IMPORTED_MODULE_1__["default"]();

        if (node.hasChildNodes()) {
            var children = node.childNodes;
            var child;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (AltiResponseReader.READERS[child.nodeName]) {
                    // INFO : on passe en paramètre l'objet en entrée elevation, vide, à remplir.
                    AltiResponseReader.READERS[child.nodeName](child, elevation);
                }
            }
        }
        return elevation;
    },

    /**
     * Lecture d'un noeud "lat" de la réponse xml du service alti.
     *      (contient une valeur de latitude, qui est un flottant)
     *
     * @param {DOMElement} node - noeud à lire pour récupérer la latitude
     * @param {Object} elevation - objet dans lequel stocker la latitude retournée
     * @static
     * @memberof AltiResponseReader
     */
    lat : function (node, elevation) {
        var textNode = node.firstChild;
        if (textNode && textNode.nodeType === 3) { // 3 === node.TEXT_NODE
            elevation.lat = parseFloat(textNode.nodeValue);
        } else {
            throw new Error("Erreur dans la lecture de la réponse du service : latitude attendue mais absente");
        }
    },

    /**
     * Lecture d'un noeud "lon" de la réponse xml du service alti.
     *      (contient une valeur de longitude, qui est un flottant)
     *
     * @param {DOMElement} node - noeud à lire pour récupérer la longitude
     * @param {Object} elevation - objet dans lequel stocker la longitude retournée
     * @static
     * @memberof AltiResponseReader
     */
    lon : function (node, elevation) {
        var textNode = node.firstChild;
        if (textNode && textNode.nodeType === 3) { // 3 === node.TEXT_NODE
            elevation.lon = parseFloat(textNode.nodeValue);
        } else {
            throw new Error("Erreur dans la lecture de la réponse du service : longitude attendue mais absente");
        }
    },

    /**
     * Lecture d'un noeud "z" de la réponse xml du service alti.
     *      (contient une valeur d'altitude, qui est un flottant)
     *
     * @param {DOMElement} node - noeud à lire pour récupérer l'altitude
     * @param {Object} elevation - objet dans lequel stocker l'altitude retournée
     * @static
     * @memberof AltiResponseReader
     */
    z : function (node, elevation) {
        var textNode = node.firstChild;
        if (textNode && textNode.nodeType === 3) { // 3 === node.TEXT_NODE
            if (elevation) {
                elevation.z = parseFloat(textNode.nodeValue);
            } else {
                elevation = new _Response_model_Elevation__WEBPACK_IMPORTED_MODULE_1__["default"]();
                elevation.z = parseFloat(textNode.nodeValue);
                return elevation;
            }
        } else {
            throw new Error("Erreur dans la lecture de la réponse du service : altitude attendue mais absente");
        }
    },

    /**
     * Lecture d'un noeud "acc" de la réponse xml du service alti.
     *      (contient une valeur de précision, qui est un flottant)
     *
     * @param {DOMElement} node - noeud à lire pour récupérer la précision
     * @param {Object} elevation - objet dans lequel stocker la précision retournée
     * @static
     * @memberof AltiResponseReader
     */
    acc : function (node, elevation) {
        var textNode = node.firstChild;
        if (textNode && textNode.nodeType === 3) { // 3 === node.TEXT_NODE
            elevation.acc = parseFloat(textNode.nodeValue);
        } else {
            throw new Error("Erreur dans la lecture de la réponse du service : précision (acc) attendue mais absente");
        }
    },

    /**
     * Lecture d'un noeud "ExceptionReport" de la réponse xml du service alti.
     *
     * @param {DOMElement} node - noeud à lire pour récupérer l'exception
     * @return {Object} exceptionReport - objet contenant l'exception
     * @static
     * @memberof AltiResponseReader
     */
    exceptionreport : function (node) {
        var response = {};

        if (node.hasChildNodes()) {
            var children = node.childNodes;
            var child;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (child.nodeName === "Exception") {
                    response.exceptionReport = AltiResponseReader.READERS.exception(child);
                }
            }
        }

        return response;
    },

    /**
     * Lecture d'un noeud "Exception" de la réponse xml du service alti.
     *
     * @param {DOMElement} node - noeud à lire pour récupérer l'exception
     * @return {Object} exceptionReport - objet contenant l'exception, avec deux attributs :
     *      {String} exceptionReport.exceptionCode - qui contient l'identifiant du code de l'exception
     *      {String} exceptionReport.exception - qui contient le message de l'exception
     * @static
     * @memberof AltiResponseReader
     */
    exception : function (node) {
        var exceptionReport = {};

        // get exception code
        var exceptionCode = node.getAttribute("exceptionCode");
        if (exceptionCode) {
            exceptionReport.exceptionCode = exceptionCode;
        }

        // get exception message
        var textNode = node.firstChild;
        if (textNode && textNode.nodeType === 3) { // 3 === node.TEXT_NODE
            exceptionReport.exception = textNode.nodeValue;
        }

        return exceptionReport;
    },

    /**
     * Lecture d'un noeud "Error" de la réponse xml du service alti.
     *
     * @param {DOMElement} node - noeud à lire pour récupérer l'exception
     * @return {Object} error - objet contenant l'exception
     * @static
     */
    error : function (node) {
        var response = {
            error : {}
        };
        // get error code and description
        if (node.hasChildNodes()) {
            var children = node.childNodes;
            var child;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                var textNode;
                // get error code
                if (child.nodeType === 1 && child.nodeName === "code") { // 1 === node.ELEMENT_NODE
                    textNode = child.firstChild;
                    if (textNode && textNode.nodeType === 3) { // 3 === node.TEXT_NODE
                        response.error.code = textNode.nodeValue;
                    }
                }
                // get error description
                if (child.nodeType === 1 && child.nodeName === "description") { // 1 === node.ELEMENT_NODE
                    textNode = child.firstChild;
                    if (textNode && textNode.nodeType === 3) { // 3 === node.TEXT_NODE
                        response.error.description = textNode.nodeValue;
                    }
                }
            }
        }
        return response;
    }

};

/**
 * Méthode permettant de lancer la lecture d'une réponse XML du service altimétrique,
 *      à l'aide des readers de la classe.
 *
 * @method AltiResponseReader.read
 * @param {DOMElement} root - racine de la réponse XML à lire
 * @static
 * @memberof AltiResponseReader
 */
AltiResponseReader.read = function (root) {
    if (root.nodeName === "elevations") {
        var altiResponse = AltiResponseReader.READERS.elevations(root);
        return altiResponse;
    } else if (root.nodeName === "ExceptionReport") {
        var exceptionReport = AltiResponseReader.READERS.exceptionreport(root);
        return exceptionReport;
    } else if (root.nodeName === "error") {
        var error = AltiResponseReader.READERS.error(root);
        return error;
    } else {
        throw new Error("Erreur lors de la lecture de la réponse : elle n'est pas au format attendu.");
    }
};

/* harmony default export */ __webpack_exports__["default"] = (AltiResponseReader);


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Response object for {@link module:Services~getAltitude Gp.Services.getAltitude ()} invocation when successful. Received as the argument of onSuccess callback function.
 *
 * @property {Array.<Gp.Services.Alti.Elevation>} elevations - Elevations array.
 *
 * @namespace
 * @alias Gp.Services.AltiResponse
 */
function AltiResponse () {
    if (!(this instanceof AltiResponse)) {
        throw new TypeError("AltiResponse constructor cannot be called as a function.");
    }

    this.elevations = [];
}

AltiResponse.prototype = {

    constructor : AltiResponse

};

/* harmony default export */ __webpack_exports__["default"] = (AltiResponse);


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Single elevation object returned by underlying web service. Contains at least, one elevation (z). May also contain point coordinates and elevation accuracy if "zonly" parameter wasn't set to true.
 *
 * @property {Float} lat - Point latitude. (only if zonly=false)
 * @property {Float} lon - Point longitude. (only if zonly=false)
 * @property {Float} z - Point elevation.
 * @property {Float} acc - Accuracy of elevation for this point. (only if zonly=false)
 *
 * @namespace
 * @alias Gp.Services.Alti.Elevation
 */
function Elevation () {
    if (!(this instanceof Elevation)) {
        throw new TypeError("Elevation constructor cannot be called as a function.");
    }

    this.z = null;
}

Elevation.prototype = {

    constructor : Elevation

};

/* harmony default export */ __webpack_exports__["default"] = (Elevation);


/***/ }),
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
/* 105 */
/***/ (function(module, exports) {

/*
 Leaflet.draw 1.0.4, a plugin that adds drawing and editing tools to Leaflet powered maps.
 (c) 2012-2017, Jacob Toye, Jon West, Smartrak, Leaflet

 https://github.com/Leaflet/Leaflet.draw
 http://leafletjs.com
 */
(function (window, document, undefined) {/**
 * Leaflet.draw assumes that you have already included the Leaflet library.
 */
L.drawVersion = "1.0.4";
/**
 * @class L.Draw
 * @aka Draw
 *
 *
 * To add the draw toolbar set the option drawControl: true in the map options.
 *
 * @example
 * ```js
 *      var map = L.map('map', {drawControl: true}).setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 * ```
 *
 * ### Adding the edit toolbar
 * To use the edit toolbar you must initialise the Leaflet.draw control and manually add it to the map.
 *
 * ```js
 *      var map = L.map('map').setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 *
 *      // FeatureGroup is to store editable layers
 *      var drawnItems = new L.FeatureGroup();
 *      map.addLayer(drawnItems);
 *
 *      var drawControl = new L.Control.Draw({
 *          edit: {
 *              featureGroup: drawnItems
 *          }
 *      });
 *      map.addControl(drawControl);
 * ```
 *
 * The key here is the featureGroup option. This tells the plugin which FeatureGroup contains the layers that
 * should be editable. The featureGroup can contain 0 or more features with geometry types Point, LineString, and Polygon.
 * Leaflet.draw does not work with multigeometry features such as MultiPoint, MultiLineString, MultiPolygon,
 * or GeometryCollection. If you need to add multigeometry features to the draw plugin, convert them to a
 * FeatureCollection of non-multigeometries (Points, LineStrings, or Polygons).
 */
L.Draw = {};

/**
 * @class L.drawLocal
 * @aka L.drawLocal
 *
 * The core toolbar class of the API — it is used to create the toolbar ui
 *
 * @example
 * ```js
 *      var modifiedDraw = L.drawLocal.extend({
 *          draw: {
 *              toolbar: {
 *                  buttons: {
 *                      polygon: 'Draw an awesome polygon'
 *                  }
 *              }
 *          }
 *      });
 * ```
 *
 * The default state for the control is the draw toolbar just below the zoom control.
 *  This will allow map users to draw vectors and markers.
 *  **Please note the edit toolbar is not enabled by default.**
 */
L.drawLocal = {
	// format: {
	// 	numeric: {
	// 		delimiters: {
	// 			thousands: ',',
	// 			decimal: '.'
	// 		}
	// 	}
	// },
	draw: {
		toolbar: {
			// #TODO: this should be reorganized where actions are nested in actions
			// ex: actions.undo  or actions.cancel
			actions: {
				title: 'Cancel drawing',
				text: 'Cancel'
			},
			finish: {
				title: 'Finish drawing',
				text: 'Finish'
			},
			undo: {
				title: 'Delete last point drawn',
				text: 'Delete last point'
			},
			buttons: {
				polyline: 'Draw a polyline',
				polygon: 'Draw a polygon',
				rectangle: 'Draw a rectangle',
				circle: 'Draw a circle',
				marker: 'Draw a marker',
				circlemarker: 'Draw a circlemarker'
			}
		},
		handlers: {
			circle: {
				tooltip: {
					start: 'Click and drag to draw circle.'
				},
				radius: 'Radius'
			},
			circlemarker: {
				tooltip: {
					start: 'Click map to place circle marker.'
				}
			},
			marker: {
				tooltip: {
					start: 'Click map to place marker.'
				}
			},
			polygon: {
				tooltip: {
					start: 'Click to start drawing shape.',
					cont: 'Click to continue drawing shape.',
					end: 'Click first point to close this shape.'
				}
			},
			polyline: {
				error: '<strong>Error:</strong> shape edges cannot cross!',
				tooltip: {
					start: 'Click to start drawing line.',
					cont: 'Click to continue drawing line.',
					end: 'Click last point to finish line.'
				}
			},
			rectangle: {
				tooltip: {
					start: 'Click and drag to draw rectangle.'
				}
			},
			simpleshape: {
				tooltip: {
					end: 'Release mouse to finish drawing.'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: 'Save changes',
					text: 'Save'
				},
				cancel: {
					title: 'Cancel editing, discards all changes',
					text: 'Cancel'
				},
				clearAll: {
					title: 'Clear all layers',
					text: 'Clear All'
				}
			},
			buttons: {
				edit: 'Edit layers',
				editDisabled: 'No layers to edit',
				remove: 'Delete layers',
				removeDisabled: 'No layers to delete'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: 'Drag handles or markers to edit features.',
					subtext: 'Click cancel to undo changes.'
				}
			},
			remove: {
				tooltip: {
					text: 'Click on a feature to remove.'
				}
			}
		}
	}
};



/**
 * ### Events
 * Once you have successfully added the Leaflet.draw plugin to your map you will want to respond to the different
 * actions users can initiate. The following events will be triggered on the map:
 *
 * @class L.Draw.Event
 * @aka Draw.Event
 *
 * Use `L.Draw.Event.EVENTNAME` constants to ensure events are correct.
 *
 * @example
 * ```js
 * map.on(L.Draw.Event.CREATED; function (e) {
 *    var type = e.layerType,
 *        layer = e.layer;
 *
 *    if (type === 'marker') {
 *        // Do marker specific actions
 *    }
 *
 *    // Do whatever else you need to. (save to db; add to map etc)
 *    map.addLayer(layer);
 *});
 * ```
 */
L.Draw.Event = {};
/**
 * @event draw:created: PolyLine; Polygon; Rectangle; Circle; Marker | String
 *
 * Layer that was just created.
 * The type of layer this is. One of: `polyline`; `polygon`; `rectangle`; `circle`; `marker`
 * Triggered when a new vector or marker has been created.
 *
 */
L.Draw.Event.CREATED = 'draw:created';

/**
 * @event draw:edited: LayerGroup
 *
 * List of all layers just edited on the map.
 *
 *
 * Triggered when layers in the FeatureGroup; initialised with the plugin; have been edited and saved.
 *
 * @example
 * ```js
 *      map.on('draw:edited', function (e) {
     *          var layers = e.layers;
     *          layers.eachLayer(function (layer) {
     *              //do whatever you want; most likely save back to db
     *          });
     *      });
 * ```
 */
L.Draw.Event.EDITED = 'draw:edited';

/**
 * @event draw:deleted: LayerGroup
 *
 * List of all layers just removed from the map.
 *
 * Triggered when layers have been removed (and saved) from the FeatureGroup.
 */
L.Draw.Event.DELETED = 'draw:deleted';

/**
 * @event draw:drawstart: String
 *
 * The type of layer this is. One of:`polyline`; `polygon`; `rectangle`; `circle`; `marker`
 *
 * Triggered when the user has chosen to draw a particular vector or marker.
 */
L.Draw.Event.DRAWSTART = 'draw:drawstart';

/**
 * @event draw:drawstop: String
 *
 * The type of layer this is. One of: `polyline`; `polygon`; `rectangle`; `circle`; `marker`
 *
 * Triggered when the user has finished a particular vector or marker.
 */

L.Draw.Event.DRAWSTOP = 'draw:drawstop';

/**
 * @event draw:drawvertex: LayerGroup
 *
 * List of all layers just being added from the map.
 *
 * Triggered when a vertex is created on a polyline or polygon.
 */
L.Draw.Event.DRAWVERTEX = 'draw:drawvertex';

/**
 * @event draw:editstart: String
 *
 * The type of edit this is. One of: `edit`
 *
 * Triggered when the user starts edit mode by clicking the edit tool button.
 */

L.Draw.Event.EDITSTART = 'draw:editstart';

/**
 * @event draw:editmove: ILayer
 *
 *  Layer that was just moved.
 *
 * Triggered as the user moves a rectangle; circle or marker.
 */
L.Draw.Event.EDITMOVE = 'draw:editmove';

/**
 * @event draw:editresize: ILayer
 *
 * Layer that was just moved.
 *
 * Triggered as the user resizes a rectangle or circle.
 */
L.Draw.Event.EDITRESIZE = 'draw:editresize';

/**
 * @event draw:editvertex: LayerGroup
 *
 * List of all layers just being edited from the map.
 *
 * Triggered when a vertex is edited on a polyline or polygon.
 */
L.Draw.Event.EDITVERTEX = 'draw:editvertex';

/**
 * @event draw:editstop: String
 *
 * The type of edit this is. One of: `edit`
 *
 * Triggered when the user has finshed editing (edit mode) and saves edits.
 */
L.Draw.Event.EDITSTOP = 'draw:editstop';

/**
 * @event draw:deletestart: String
 *
 * The type of edit this is. One of: `remove`
 *
 * Triggered when the user starts remove mode by clicking the remove tool button.
 */
L.Draw.Event.DELETESTART = 'draw:deletestart';

/**
 * @event draw:deletestop: String
 *
 * The type of edit this is. One of: `remove`
 *
 * Triggered when the user has finished removing shapes (remove mode) and saves.
 */
L.Draw.Event.DELETESTOP = 'draw:deletestop';

/**
 * @event draw:toolbaropened: String
 *
 * Triggered when a toolbar is opened.
 */
L.Draw.Event.TOOLBAROPENED = 'draw:toolbaropened';

/**
 * @event draw:toolbarclosed: String
 *
 * Triggered when a toolbar is closed.
 */
L.Draw.Event.TOOLBARCLOSED = 'draw:toolbarclosed';

/**
 * @event draw:markercontext: String
 *
 * Triggered when a marker is right clicked.
 */
L.Draw.Event.MARKERCONTEXT = 'draw:markercontext';


L.Draw = L.Draw || {};

/**
 * @class L.Draw.Feature
 * @aka Draw.Feature
 */
L.Draw.Feature = L.Handler.extend({

	// @method initialize(): void
	initialize: function (map, options) {
		this._map = map;
		this._container = map._container;
		this._overlayPane = map._panes.overlayPane;
		this._popupPane = map._panes.popupPane;

		// Merge default shapeOptions options with custom shapeOptions
		if (options && options.shapeOptions) {
			options.shapeOptions = L.Util.extend({}, this.options.shapeOptions, options.shapeOptions);
		}
		L.setOptions(this, options);

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.Draw.Feature.include(L.Evented.prototype);
		} else {
			L.Draw.Feature.include(L.Mixin.Events);
		}
	},

	// @method enable(): void
	// Enables this handler
	enable: function () {
		if (this._enabled) {
			return;
		}

		L.Handler.prototype.enable.call(this);

		this.fire('enabled', {handler: this.type});

		this._map.fire(L.Draw.Event.DRAWSTART, {layerType: this.type});
	},

	// @method disable(): void
	disable: function () {
		if (!this._enabled) {
			return;
		}

		L.Handler.prototype.disable.call(this);

		this._map.fire(L.Draw.Event.DRAWSTOP, {layerType: this.type});

		this.fire('disabled', {handler: this.type});
	},

	// @method addHooks(): void
	// Add's event listeners to this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			L.DomUtil.disableTextSelection();

			map.getContainer().focus();

			this._tooltip = new L.Draw.Tooltip(this._map);

			L.DomEvent.on(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	// @method removeHooks(): void
	// Removes event listeners from this handler
	removeHooks: function () {
		if (this._map) {
			L.DomUtil.enableTextSelection();

			this._tooltip.dispose();
			this._tooltip = null;

			L.DomEvent.off(this._container, 'keyup', this._cancelDrawing, this);
		}
	},

	// @method setOptions(object): void
	// Sets new options to this handler
	setOptions: function (options) {
		L.setOptions(this, options);
	},

	_fireCreatedEvent: function (layer) {
		this._map.fire(L.Draw.Event.CREATED, {layer: layer, layerType: this.type});
	},

	// Cancel drawing when the escape key is pressed
	_cancelDrawing: function (e) {
		if (e.keyCode === 27) {
			this._map.fire('draw:canceled', {layerType: this.type});
			this.disable();
		}
	}
});



/**
 * @class L.Draw.Polyline
 * @aka Draw.Polyline
 * @inherits L.Draw.Feature
 */
L.Draw.Polyline = L.Draw.Feature.extend({
	statics: {
		TYPE: 'polyline'
	},

	Poly: L.Polyline,

	options: {
		allowIntersection: true,
		repeatMode: false,
		drawError: {
			color: '#b00b00',
			timeout: 2500
		},
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		guidelineDistance: 20,
		maxGuideLineLength: 4000,
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: false,
			clickable: true
		},
		metric: true, // Whether to use the metric measurement system or imperial
		feet: true, // When not metric, to use feet instead of yards for display.
		nautic: false, // When not metric, not feet use nautic mile for display
		showLength: true, // Whether to display distance in the tooltip
		zIndexOffset: 2000, // This should be > than the highest z-index any map layers
		factor: 1, // To change distance calculation
		maxPoints: 0 // Once this number of points are placed, finish shape
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}

		// Need to set this here to ensure the correct message is used.
		this.options.drawError.message = L.drawLocal.draw.handlers.polyline.error;

		// Merge default drawError options with custom options
		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polyline.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._markers = [];

			this._markerGroup = new L.LayerGroup();
			this._map.addLayer(this._markerGroup);

			this._poly = new L.Polyline([], this.options.shapeOptions);

			this._tooltip.updateContent(this._getTooltipText());

			// Make a transparent marker that will used to catch click events. These click
			// events will create the vertices. We need to do this so we can ensure that
			// we can create vertices over other map layers (markers, vector layers). We
			// also do not want to trigger any click handlers of objects we are clicking on
			// while drawing.
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('mouseout', this._onMouseOut, this)
				.on('mousemove', this._onMouseMove, this) // Necessary to prevent 0.8 stutter
				.on('mousedown', this._onMouseDown, this)
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.8 compatibility
				.addTo(this._map);

			this._map
				.on('mouseup', this._onMouseUp, this) // Necessary for 0.7 compatibility
				.on('mousemove', this._onMouseMove, this)
				.on('zoomlevelschange', this._onZoomEnd, this)
				.on('touchstart', this._onTouch, this)
				.on('zoomend', this._onZoomEnd, this);

		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		this._clearHideErrorTimeout();

		this._cleanUpShape();

		// remove markers from map
		this._map.removeLayer(this._markerGroup);
		delete this._markerGroup;
		delete this._markers;

		this._map.removeLayer(this._poly);
		delete this._poly;

		this._mouseMarker
			.off('mousedown', this._onMouseDown, this)
			.off('mouseout', this._onMouseOut, this)
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this);
		this._map.removeLayer(this._mouseMarker);
		delete this._mouseMarker;

		// clean up DOM
		this._clearGuides();

		this._map
			.off('mouseup', this._onMouseUp, this)
			.off('mousemove', this._onMouseMove, this)
			.off('zoomlevelschange', this._onZoomEnd, this)
			.off('zoomend', this._onZoomEnd, this)
			.off('touchstart', this._onTouch, this)
			.off('click', this._onTouch, this);
	},

	// @method deleteLastVertex(): void
	// Remove the last vertex from the polyline, removes polyline from map if only one point exists.
	deleteLastVertex: function () {
		if (this._markers.length <= 1) {
			return;
		}

		var lastMarker = this._markers.pop(),
			poly = this._poly,
			// Replaces .spliceLatLngs()
			latlngs = poly.getLatLngs(),
			latlng = latlngs.splice(-1, 1)[0];
		this._poly.setLatLngs(latlngs);

		this._markerGroup.removeLayer(lastMarker);

		if (poly.getLatLngs().length < 2) {
			this._map.removeLayer(poly);
		}

		this._vertexChanged(latlng, false);
	},

	// @method addVertex(): void
	// Add a vertex to the end of the polyline
	addVertex: function (latlng) {
		var markersLength = this._markers.length;
		// markersLength must be greater than or equal to 2 before intersections can occur
		if (markersLength >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(latlng)) {
			this._showErrorTooltip();
			return;
		}
		else if (this._errorShown) {
			this._hideErrorTooltip();
		}

		this._markers.push(this._createMarker(latlng));

		this._poly.addLatLng(latlng);

		if (this._poly.getLatLngs().length === 2) {
			this._map.addLayer(this._poly);
		}

		this._vertexChanged(latlng, true);
	},

	// @method completeShape(): void
	// Closes the polyline between the first and last points
	completeShape: function () {
		if (this._markers.length <= 1 || !this._shapeIsValid()) {
			return;
		}

		this._fireCreatedEvent();
		this.disable();

		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_finishShape: function () {
		var latlngs = this._poly._defaultShape ? this._poly._defaultShape() : this._poly.getLatLngs();
		var intersects = this._poly.newLatLngIntersects(latlngs[latlngs.length - 1]);

		if ((!this.options.allowIntersection && intersects) || !this._shapeIsValid()) {
			this._showErrorTooltip();
			return;
		}

		this._fireCreatedEvent();
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	// Called to verify the shape is valid when the user tries to finish it
	// Return false if the shape is not valid
	_shapeIsValid: function () {
		return true;
	},

	_onZoomEnd: function () {
		if (this._markers !== null) {
			this._updateGuide();
		}
	},

	_onMouseMove: function (e) {
		var newPos = this._map.mouseEventToLayerPoint(e.originalEvent);
		var latlng = this._map.layerPointToLatLng(newPos);

		// Save latlng
		// should this be moved to _updateGuide() ?
		this._currentLatLng = latlng;

		this._updateTooltip(latlng);

		// Update the guide line
		this._updateGuide(newPos);

		// Update the mouse marker position
		this._mouseMarker.setLatLng(latlng);

		L.DomEvent.preventDefault(e.originalEvent);
	},

	_vertexChanged: function (latlng, added) {
		this._map.fire(L.Draw.Event.DRAWVERTEX, {layers: this._markerGroup});
		this._updateFinishHandler();

		this._updateRunningMeasure(latlng, added);

		this._clearGuides();

		this._updateTooltip();
	},

	_onMouseDown: function (e) {
		if (!this._clickHandled && !this._touchHandled && !this._disableMarkers) {
			this._onMouseMove(e);
			this._clickHandled = true;
			this._disableNewMarkers();
			var originalEvent = e.originalEvent;
			var clientX = originalEvent.clientX;
			var clientY = originalEvent.clientY;
			this._startPoint.call(this, clientX, clientY);
		}
	},

	_startPoint: function (clientX, clientY) {
		this._mouseDownOrigin = L.point(clientX, clientY);
	},

	_onMouseUp: function (e) {
		var originalEvent = e.originalEvent;
		var clientX = originalEvent.clientX;
		var clientY = originalEvent.clientY;
		this._endPoint.call(this, clientX, clientY, e);
		this._clickHandled = null;
	},

	_endPoint: function (clientX, clientY, e) {
		if (this._mouseDownOrigin) {
			var dragCheckDistance = L.point(clientX, clientY)
				.distanceTo(this._mouseDownOrigin);
			var lastPtDistance = this._calculateFinishDistance(e.latlng);
			if (this.options.maxPoints > 1 && this.options.maxPoints == this._markers.length + 1) {
				this.addVertex(e.latlng);
				this._finishShape();
			} else if (lastPtDistance < 10 && L.Browser.touch) {
				this._finishShape();
			} else if (Math.abs(dragCheckDistance) < 9 * (window.devicePixelRatio || 1)) {
				this.addVertex(e.latlng);
			}
			this._enableNewMarkers(); // after a short pause, enable new markers
		}
		this._mouseDownOrigin = null;
	},

	// ontouch prevented by clickHandled flag because some browsers fire both click/touch events,
	// causing unwanted behavior
	_onTouch: function (e) {
		var originalEvent = e.originalEvent;
		var clientX;
		var clientY;
		if (originalEvent.touches && originalEvent.touches[0] && !this._clickHandled && !this._touchHandled && !this._disableMarkers) {
			clientX = originalEvent.touches[0].clientX;
			clientY = originalEvent.touches[0].clientY;
			this._disableNewMarkers();
			this._touchHandled = true;
			this._startPoint.call(this, clientX, clientY);
			this._endPoint.call(this, clientX, clientY, e);
			this._touchHandled = null;
		}
		this._clickHandled = null;
	},

	_onMouseOut: function () {
		if (this._tooltip) {
			this._tooltip._onMouseOut.call(this._tooltip);
		}
	},

	// calculate if we are currently within close enough distance
	// of the closing point (first point for shapes, last point for lines)
	// this is semi-ugly code but the only reliable way i found to get the job done
	// note: calculating point.distanceTo between mouseDownOrigin and last marker did NOT work
	_calculateFinishDistance: function (potentialLatLng) {
		var lastPtDistance;
		if (this._markers.length > 0) {
			var finishMarker;
			if (this.type === L.Draw.Polyline.TYPE) {
				finishMarker = this._markers[this._markers.length - 1];
			} else if (this.type === L.Draw.Polygon.TYPE) {
				finishMarker = this._markers[0];
			} else {
				return Infinity;
			}
			var lastMarkerPoint = this._map.latLngToContainerPoint(finishMarker.getLatLng()),
				potentialMarker = new L.Marker(potentialLatLng, {
					icon: this.options.icon,
					zIndexOffset: this.options.zIndexOffset * 2
				});
			var potentialMarkerPint = this._map.latLngToContainerPoint(potentialMarker.getLatLng());
			lastPtDistance = lastMarkerPoint.distanceTo(potentialMarkerPint);
		} else {
			lastPtDistance = Infinity;
		}
		return lastPtDistance;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;
		// The last marker should have a click handler to close the polyline
		if (markerCount > 1) {
			this._markers[markerCount - 1].on('click', this._finishShape, this);
		}

		// Remove the old marker click handler (as only the last point should close the polyline)
		if (markerCount > 2) {
			this._markers[markerCount - 2].off('click', this._finishShape, this);
		}
	},

	_createMarker: function (latlng) {
		var marker = new L.Marker(latlng, {
			icon: this.options.icon,
			zIndexOffset: this.options.zIndexOffset * 2
		});

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_updateGuide: function (newPos) {
		var markerCount = this._markers ? this._markers.length : 0;

		if (markerCount > 0) {
			newPos = newPos || this._map.latLngToLayerPoint(this._currentLatLng);

			// draw the guide line
			this._clearGuides();
			this._drawGuide(
				this._map.latLngToLayerPoint(this._markers[markerCount - 1].getLatLng()),
				newPos
			);
		}
	},

	_updateTooltip: function (latLng) {
		var text = this._getTooltipText();

		if (latLng) {
			this._tooltip.updatePosition(latLng);
		}

		if (!this._errorShown) {
			this._tooltip.updateContent(text);
		}
	},

	_drawGuide: function (pointA, pointB) {
		var length = Math.floor(Math.sqrt(Math.pow((pointB.x - pointA.x), 2) + Math.pow((pointB.y - pointA.y), 2))),
			guidelineDistance = this.options.guidelineDistance,
			maxGuideLineLength = this.options.maxGuideLineLength,
			// Only draw a guideline with a max length
			i = length > maxGuideLineLength ? length - maxGuideLineLength : guidelineDistance,
			fraction,
			dashPoint,
			dash;

		//create the guides container if we haven't yet
		if (!this._guidesContainer) {
			this._guidesContainer = L.DomUtil.create('div', 'leaflet-draw-guides', this._overlayPane);
		}

		//draw a dash every GuildeLineDistance
		for (; i < length; i += this.options.guidelineDistance) {
			//work out fraction along line we are
			fraction = i / length;

			//calculate new x,y point
			dashPoint = {
				x: Math.floor((pointA.x * (1 - fraction)) + (fraction * pointB.x)),
				y: Math.floor((pointA.y * (1 - fraction)) + (fraction * pointB.y))
			};

			//add guide dash to guide container
			dash = L.DomUtil.create('div', 'leaflet-draw-guide-dash', this._guidesContainer);
			dash.style.backgroundColor =
				!this._errorShown ? this.options.shapeOptions.color : this.options.drawError.color;

			L.DomUtil.setPosition(dash, dashPoint);
		}
	},

	_updateGuideColor: function (color) {
		if (this._guidesContainer) {
			for (var i = 0, l = this._guidesContainer.childNodes.length; i < l; i++) {
				this._guidesContainer.childNodes[i].style.backgroundColor = color;
			}
		}
	},

	// removes all child elements (guide dashes) from the guides container
	_clearGuides: function () {
		if (this._guidesContainer) {
			while (this._guidesContainer.firstChild) {
				this._guidesContainer.removeChild(this._guidesContainer.firstChild);
			}
		}
	},

	_getTooltipText: function () {
		var showLength = this.options.showLength,
			labelText, distanceStr;
		if (this._markers.length === 0) {
			labelText = {
				text: L.drawLocal.draw.handlers.polyline.tooltip.start
			};
		} else {
			distanceStr = showLength ? this._getMeasurementString() : '';

			if (this._markers.length === 1) {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.cont,
					subtext: distanceStr
				};
			} else {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.end,
					subtext: distanceStr
				};
			}
		}
		return labelText;
	},

	_updateRunningMeasure: function (latlng, added) {
		var markersLength = this._markers.length,
			previousMarkerIndex, distance;

		if (this._markers.length === 1) {
			this._measurementRunningTotal = 0;
		} else {
			previousMarkerIndex = markersLength - (added ? 2 : 1);

			// Calculate the distance based on the version
			if (L.GeometryUtil.isVersion07x()) {
				distance = latlng.distanceTo(this._markers[previousMarkerIndex].getLatLng()) * (this.options.factor || 1);
			} else {
				distance = this._map.distance(latlng, this._markers[previousMarkerIndex].getLatLng()) * (this.options.factor || 1);
			}

			this._measurementRunningTotal += distance * (added ? 1 : -1);
		}
	},

	_getMeasurementString: function () {
		var currentLatLng = this._currentLatLng,
			previousLatLng = this._markers[this._markers.length - 1].getLatLng(),
			distance;

		// Calculate the distance from the last fixed point to the mouse position based on the version
		if (L.GeometryUtil.isVersion07x()) {
			distance = previousLatLng && currentLatLng && currentLatLng.distanceTo ? this._measurementRunningTotal + currentLatLng.distanceTo(previousLatLng) * (this.options.factor || 1) : this._measurementRunningTotal || 0;
		} else {
			distance = previousLatLng && currentLatLng ? this._measurementRunningTotal + this._map.distance(currentLatLng, previousLatLng) * (this.options.factor || 1) : this._measurementRunningTotal || 0;
		}

		return L.GeometryUtil.readableDistance(distance, this.options.metric, this.options.feet, this.options.nautic, this.options.precision);
	},

	_showErrorTooltip: function () {
		this._errorShown = true;

		// Update tooltip
		this._tooltip
			.showAsError()
			.updateContent({text: this.options.drawError.message});

		// Update shape
		this._updateGuideColor(this.options.drawError.color);
		this._poly.setStyle({color: this.options.drawError.color});

		// Hide the error after 2 seconds
		this._clearHideErrorTimeout();
		this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorTooltip, this), this.options.drawError.timeout);
	},

	_hideErrorTooltip: function () {
		this._errorShown = false;

		this._clearHideErrorTimeout();

		// Revert tooltip
		this._tooltip
			.removeError()
			.updateContent(this._getTooltipText());

		// Revert shape
		this._updateGuideColor(this.options.shapeOptions.color);
		this._poly.setStyle({color: this.options.shapeOptions.color});
	},

	_clearHideErrorTimeout: function () {
		if (this._hideErrorTimeout) {
			clearTimeout(this._hideErrorTimeout);
			this._hideErrorTimeout = null;
		}
	},

	// disable new markers temporarily;
	// this is to prevent duplicated touch/click events in some browsers
	_disableNewMarkers: function () {
		this._disableMarkers = true;
	},

	// see _disableNewMarkers
	_enableNewMarkers: function () {
		setTimeout(function () {
			this._disableMarkers = false;
		}.bind(this), 50);
	},

	_cleanUpShape: function () {
		if (this._markers.length > 1) {
			this._markers[this._markers.length - 1].off('click', this._finishShape, this);
		}
	},

	_fireCreatedEvent: function () {
		var poly = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions);
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, poly);
	}
});



/**
 * @class L.Draw.Polygon
 * @aka Draw.Polygon
 * @inherits L.Draw.Polyline
 */
L.Draw.Polygon = L.Draw.Polyline.extend({
	statics: {
		TYPE: 'polygon'
	},

	Poly: L.Polygon,

	options: {
		showArea: false,
		showLength: false,
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		},
		// Whether to use the metric measurement system (truthy) or not (falsy).
		// Also defines the units to use for the metric system as an array of
		// strings (e.g. `['ha', 'm']`).
		metric: true,
		feet: true, // When not metric, to use feet instead of yards for display.
		nautic: false, // When not metric, not feet use nautic mile for display
		// Defines the precision for each type of unit (e.g. {km: 2, ft: 0}
		precision: {}
	},

	// @method initialize(): void
	initialize: function (map, options) {
		L.Draw.Polyline.prototype.initialize.call(this, map, options);

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Polygon.TYPE;
	},

	_updateFinishHandler: function () {
		var markerCount = this._markers.length;

		// The first marker should have a click handler to close the polygon
		if (markerCount === 1) {
			this._markers[0].on('click', this._finishShape, this);
		}

		// Add and update the double click handler
		if (markerCount > 2) {
			this._markers[markerCount - 1].on('dblclick', this._finishShape, this);
			// Only need to remove handler if has been added before
			if (markerCount > 3) {
				this._markers[markerCount - 2].off('dblclick', this._finishShape, this);
			}
		}
	},

	_getTooltipText: function () {
		var text, subtext;

		if (this._markers.length === 0) {
			text = L.drawLocal.draw.handlers.polygon.tooltip.start;
		} else if (this._markers.length < 3) {
			text = L.drawLocal.draw.handlers.polygon.tooltip.cont;
			subtext = this._getMeasurementString();
		} else {
			text = L.drawLocal.draw.handlers.polygon.tooltip.end;
			subtext = this._getMeasurementString();
		}

		return {
			text: text,
			subtext: subtext
		};
	},

	_getMeasurementString: function () {
		var area = this._area,
			measurementString = '';


		if (!area && !this.options.showLength) {
			return null;
		}

		if (this.options.showLength) {
			measurementString = L.Draw.Polyline.prototype._getMeasurementString.call(this);
		}

		if (area) {
			measurementString += '<br>' + L.GeometryUtil.readableArea(area, this.options.metric, this.options.precision);
		}

		return measurementString;
	},

	_shapeIsValid: function () {
		return this._markers.length >= 3;
	},

	_vertexChanged: function (latlng, added) {
		var latLngs;

		// Check to see if we should show the area
		if (!this.options.allowIntersection && this.options.showArea) {
			latLngs = this._poly.getLatLngs();

			this._area = L.GeometryUtil.geodesicArea(latLngs);
		}

		L.Draw.Polyline.prototype._vertexChanged.call(this, latlng, added);
	},

	_cleanUpShape: function () {
		var markerCount = this._markers.length;

		if (markerCount > 0) {
			this._markers[0].off('click', this._finishShape, this);

			if (markerCount > 2) {
				this._markers[markerCount - 1].off('dblclick', this._finishShape, this);
			}
		}
	}
});



L.SimpleShape = {};
/**
 * @class L.Draw.SimpleShape
 * @aka Draw.SimpleShape
 * @inherits L.Draw.Feature
 */
L.Draw.SimpleShape = L.Draw.Feature.extend({
	options: {
		repeatMode: false
	},

	// @method initialize(): void
	initialize: function (map, options) {
		this._endLabelText = L.drawLocal.draw.handlers.simpleshape.tooltip.end;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler.
	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);
		if (this._map) {
			this._mapDraggable = this._map.dragging.enabled();

			if (this._mapDraggable) {
				this._map.dragging.disable();
			}

			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';

			this._tooltip.updateContent({text: this._initialLabelText});

			this._map
				.on('mousedown', this._onMouseDown, this)
				.on('mousemove', this._onMouseMove, this)
				.on('touchstart', this._onMouseDown, this)
				.on('touchmove', this._onMouseMove, this);

			// we should prevent default, otherwise default behavior (scrolling) will fire,
			// and that will cause document.touchend to fire and will stop the drawing
			// (circle, rectangle) in touch mode.
			// (update): we have to send passive now to prevent scroll, because by default it is {passive: true} now, which means,
			// handler can't event.preventDefault
			// check the news https://developers.google.com/web/updates/2016/06/passive-event-listeners
			document.addEventListener('touchstart', L.DomEvent.preventDefault, {passive: false});
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);
		if (this._map) {
			if (this._mapDraggable) {
				this._map.dragging.enable();
			}

			//TODO refactor: move cursor to styles
			this._container.style.cursor = '';

			this._map
				.off('mousedown', this._onMouseDown, this)
				.off('mousemove', this._onMouseMove, this)
				.off('touchstart', this._onMouseDown, this)
				.off('touchmove', this._onMouseMove, this);

			L.DomEvent.off(document, 'mouseup', this._onMouseUp, this);
			L.DomEvent.off(document, 'touchend', this._onMouseUp, this);

			document.removeEventListener('touchstart', L.DomEvent.preventDefault);

			// If the box element doesn't exist they must not have moved the mouse, so don't need to destroy/return
			if (this._shape) {
				this._map.removeLayer(this._shape);
				delete this._shape;
			}
		}
		this._isDrawing = false;
	},

	_getTooltipText: function () {
		return {
			text: this._endLabelText
		};
	},

	_onMouseDown: function (e) {
		this._isDrawing = true;
		this._startLatLng = e.latlng;

		L.DomEvent
			.on(document, 'mouseup', this._onMouseUp, this)
			.on(document, 'touchend', this._onMouseUp, this)
			.preventDefault(e.originalEvent);
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._tooltip.updatePosition(latlng);
		if (this._isDrawing) {
			this._tooltip.updateContent(this._getTooltipText());
			this._drawShape(latlng);
		}
	},

	_onMouseUp: function () {
		if (this._shape) {
			this._fireCreatedEvent();
		}

		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	}
});



/**
 * @class L.Draw.Rectangle
 * @aka Draw.Rectangle
 * @inherits L.Draw.SimpleShape
 */
L.Draw.Rectangle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'rectangle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		},
		showArea: true, //Whether to show the area in the tooltip
		metric: true // Whether to use the metric measurement system or imperial
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Rectangle.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	// @method disable(): void
	disable: function () {
		if (!this._enabled) {
			return;
		}

		this._isCurrentlyTwoClickDrawing = false;
		L.Draw.SimpleShape.prototype.disable.call(this);
	},

	_onMouseUp: function (e) {
		if (!this._shape && !this._isCurrentlyTwoClickDrawing) {
			this._isCurrentlyTwoClickDrawing = true;
			return;
		}

		// Make sure closing click is on map
		if (this._isCurrentlyTwoClickDrawing && !_hasAncestor(e.target, 'leaflet-pane')) {
			return;
		}

		L.Draw.SimpleShape.prototype._onMouseUp.call(this);
	},

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setBounds(new L.LatLngBounds(this._startLatLng, latlng));
		}
	},

	_fireCreatedEvent: function () {
		var rectangle = new L.Rectangle(this._shape.getBounds(), this.options.shapeOptions);
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, rectangle);
	},

	_getTooltipText: function () {
		var tooltipText = L.Draw.SimpleShape.prototype._getTooltipText.call(this),
			shape = this._shape,
			showArea = this.options.showArea,
			latLngs, area, subtext;

		if (shape) {
			latLngs = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs();
			area = L.GeometryUtil.geodesicArea(latLngs);
			subtext = showArea ? L.GeometryUtil.readableArea(area, this.options.metric) : '';
		}

		return {
			text: tooltipText.text,
			subtext: subtext
		};
	}
});

function _hasAncestor(el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls)) {
		;
	}
	return el;
}



/**
 * @class L.Draw.Marker
 * @aka Draw.Marker
 * @inherits L.Draw.Feature
 */
L.Draw.Marker = L.Draw.Feature.extend({
	statics: {
		TYPE: 'marker'
	},

	options: {
		icon: new L.Icon.Default(),
		repeatMode: false,
		zIndexOffset: 2000 // This should be > than the highest z-index any markers
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Marker.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.marker.tooltip.start;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler.
	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);

		if (this._map) {
			this._tooltip.updateContent({text: this._initialLabelText});

			// Same mouseMarker as in Draw.Polyline
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('click', this._onClick, this)
				.addTo(this._map);

			this._map.on('mousemove', this._onMouseMove, this);
			this._map.on('click', this._onTouch, this);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		if (this._map) {
			this._map
				.off('click', this._onClick, this)
				.off('click', this._onTouch, this);
			if (this._marker) {
				this._marker.off('click', this._onClick, this);
				this._map
					.removeLayer(this._marker);
				delete this._marker;
			}

			this._mouseMarker.off('click', this._onClick, this);
			this._map.removeLayer(this._mouseMarker);
			delete this._mouseMarker;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._tooltip.updatePosition(latlng);
		this._mouseMarker.setLatLng(latlng);

		if (!this._marker) {
			this._marker = this._createMarker(latlng);
			// Bind to both marker and map to make sure we get the click event.
			this._marker.on('click', this._onClick, this);
			this._map
				.on('click', this._onClick, this)
				.addLayer(this._marker);
		}
		else {
			latlng = this._mouseMarker.getLatLng();
			this._marker.setLatLng(latlng);
		}
	},

	_createMarker: function (latlng) {
		return new L.Marker(latlng, {
			icon: this.options.icon,
			zIndexOffset: this.options.zIndexOffset
		});
	},

	_onClick: function () {
		this._fireCreatedEvent();

		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},

	_onTouch: function (e) {
		// called on click & tap, only really does any thing on tap
		this._onMouseMove(e); // creates & places marker
		this._onClick(); // permanently places marker & ends interaction
	},

	_fireCreatedEvent: function () {
		var marker = new L.Marker.Touch(this._marker.getLatLng(), {icon: this.options.icon});
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, marker);
	}
});



/**
 * @class L.Draw.CircleMarker
 * @aka Draw.CircleMarker
 * @inherits L.Draw.Marker
 */
L.Draw.CircleMarker = L.Draw.Marker.extend({
	statics: {
		TYPE: 'circlemarker'
	},

	options: {
		stroke: true,
		color: '#3388ff',
		weight: 4,
		opacity: 0.5,
		fill: true,
		fillColor: null, //same as color by default
		fillOpacity: 0.2,
		clickable: true,
		zIndexOffset: 2000 // This should be > than the highest z-index any markers
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.CircleMarker.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.circlemarker.tooltip.start;

		L.Draw.Feature.prototype.initialize.call(this, map, options);
	},


	_fireCreatedEvent: function () {
		var circleMarker = new L.CircleMarker(this._marker.getLatLng(), this.options);
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, circleMarker);
	},

	_createMarker: function (latlng) {
		return new L.CircleMarker(latlng, this.options);
	}
});



/**
 * @class L.Draw.Circle
 * @aka Draw.Circle
 * @inherits L.Draw.SimpleShape
 */
L.Draw.Circle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'circle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#3388ff',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		},
		showRadius: true,
		metric: true, // Whether to use the metric measurement system or imperial
		feet: true, // When not metric, use feet instead of yards for display
		nautic: false // When not metric, not feet use nautic mile for display
	},

	// @method initialize(): void
	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Circle.TYPE;

		this._initialLabelText = L.drawLocal.draw.handlers.circle.tooltip.start;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	_drawShape: function (latlng) {
		// Calculate the distance based on the version
		if (L.GeometryUtil.isVersion07x()) {
			var distance = this._startLatLng.distanceTo(latlng);
		} else {
			var distance = this._map.distance(this._startLatLng, latlng);
		}

		if (!this._shape) {
			this._shape = new L.Circle(this._startLatLng, distance, this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setRadius(distance);
		}
	},

	_fireCreatedEvent: function () {
		var circle = new L.Circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions);
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, circle);
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng,
			showRadius = this.options.showRadius,
			useMetric = this.options.metric,
			radius;

		this._tooltip.updatePosition(latlng);
		if (this._isDrawing) {
			this._drawShape(latlng);

			// Get the new radius (rounded to 1 dp)
			radius = this._shape.getRadius().toFixed(1);

			var subtext = '';
			if (showRadius) {
				subtext = L.drawLocal.draw.handlers.circle.radius + ': ' +
					L.GeometryUtil.readableDistance(radius, useMetric, this.options.feet, this.options.nautic);
			}
			this._tooltip.updateContent({
				text: this._endLabelText,
				subtext: subtext
			});
		}
	}
});



L.Edit = L.Edit || {};

/**
 * @class L.Edit.Marker
 * @aka Edit.Marker
 */
L.Edit.Marker = L.Handler.extend({
	// @method initialize(): void
	initialize: function (marker, options) {
		this._marker = marker;
		L.setOptions(this, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var marker = this._marker;

		marker.dragging.enable();
		marker.on('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		var marker = this._marker;

		marker.dragging.disable();
		marker.off('dragend', this._onDragEnd, marker);
		this._toggleMarkerHighlight();
	},

	_onDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
		this._map.fire(L.Draw.Event.EDITMOVE, {layer: layer});
	},

	_toggleMarkerHighlight: function () {
		var icon = this._marker._icon;

		// Don't do anything if this layer is a marker but doesn't have an icon. Markers
		// should usually have icons. If using Leaflet.draw with Leaflet.markercluster there
		// is a chance that a marker doesn't.
		if (!icon) {
			return;
		}

		// This is quite naughty, but I don't see another way of doing it. (short of setting a new icon)
		icon.style.display = 'none';

		if (L.DomUtil.hasClass(icon, 'leaflet-edit-marker-selected')) {
			L.DomUtil.removeClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, -4);

		} else {
			L.DomUtil.addClass(icon, 'leaflet-edit-marker-selected');
			// Offset as the border will make the icon move.
			this._offsetMarker(icon, 4);
		}

		icon.style.display = '';
	},

	_offsetMarker: function (icon, offset) {
		var iconMarginTop = parseInt(icon.style.marginTop, 10) - offset,
			iconMarginLeft = parseInt(icon.style.marginLeft, 10) - offset;

		icon.style.marginTop = iconMarginTop + 'px';
		icon.style.marginLeft = iconMarginLeft + 'px';
	}
});

L.Marker.addInitHook(function () {
	if (L.Edit.Marker) {
		this.editing = new L.Edit.Marker(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});



L.Edit = L.Edit || {};

/**
 * @class L.Edit.Polyline
 * @aka L.Edit.Poly
 * @aka Edit.Poly
 */
L.Edit.Poly = L.Handler.extend({
	// @method initialize(): void
	initialize: function (poly) {

		this.latlngs = [poly._latlngs];
		if (poly._holes) {
			this.latlngs = this.latlngs.concat(poly._holes);
		}

		this._poly = poly;

		this._poly.on('revert-edited', this._updateLatLngs, this);
	},

	// Compatibility method to normalize Poly* objects
	// between 0.7.x and 1.0+
	_defaultShape: function () {
		if (!L.Polyline._flat) {
			return this._poly._latlngs;
		}
		return L.Polyline._flat(this._poly._latlngs) ? this._poly._latlngs : this._poly._latlngs[0];
	},

	_eachVertexHandler: function (callback) {
		for (var i = 0; i < this._verticesHandlers.length; i++) {
			callback(this._verticesHandlers[i]);
		}
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		this._initHandlers();
		this._eachVertexHandler(function (handler) {
			handler.addHooks();
		});
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		this._eachVertexHandler(function (handler) {
			handler.removeHooks();
		});
	},

	// @method updateMarkers(): void
	// Fire an update for each vertex handler
	updateMarkers: function () {
		this._eachVertexHandler(function (handler) {
			handler.updateMarkers();
		});
	},

	_initHandlers: function () {
		this._verticesHandlers = [];
		for (var i = 0; i < this.latlngs.length; i++) {
			this._verticesHandlers.push(new L.Edit.PolyVerticesEdit(this._poly, this.latlngs[i], this._poly.options.poly));
		}
	},

	_updateLatLngs: function (e) {
		this.latlngs = [e.layer._latlngs];
		if (e.layer._holes) {
			this.latlngs = this.latlngs.concat(e.layer._holes);
		}
	}

});

/**
 * @class L.Edit.PolyVerticesEdit
 * @aka Edit.PolyVerticesEdit
 */
L.Edit.PolyVerticesEdit = L.Handler.extend({
	options: {
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		}),
		touchIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
		}),
		drawError: {
			color: '#b00b00',
			timeout: 1000
		}


	},

	// @method intialize(): void
	initialize: function (poly, latlngs, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.icon = this.options.touchIcon;
		}
		this._poly = poly;

		if (options && options.drawError) {
			options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
		}

		this._latlngs = latlngs;

		L.setOptions(this, options);
	},

	// Compatibility method to normalize Poly* objects
	// between 0.7.x and 1.0+
	_defaultShape: function () {
		if (!L.Polyline._flat) {
			return this._latlngs;
		}
		return L.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0];
	},

	// @method addHooks(): void
	// Add listener hooks to this handler.
	addHooks: function () {
		var poly = this._poly;
		var path = poly._path;

		if (!(poly instanceof L.Polygon)) {
			poly.options.fill = false;
			if (poly.options.editing) {
				poly.options.editing.fill = false;
			}
		}

		if (path) {
			if (poly.options.editing && poly.options.editing.className) {
				if (poly.options.original.className) {
					poly.options.original.className.split(' ').forEach(function (className) {
						L.DomUtil.removeClass(path, className);
					});
				}
				poly.options.editing.className.split(' ').forEach(function (className) {
					L.DomUtil.addClass(path, className);
				});
			}
		}

		poly.setStyle(poly.options.editing);

		if (this._poly._map) {

			this._map = this._poly._map; // Set map

			if (!this._markerGroup) {
				this._initMarkers();
			}
			this._poly._map.addLayer(this._markerGroup);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		var poly = this._poly;
		var path = poly._path;

		if (path) {
			if (poly.options.editing && poly.options.editing.className) {
				poly.options.editing.className.split(' ').forEach(function (className) {
					L.DomUtil.removeClass(path, className);
				});
				if (poly.options.original.className) {
					poly.options.original.className.split(' ').forEach(function (className) {
						L.DomUtil.addClass(path, className);
					});
				}
			}
		}

		poly.setStyle(poly.options.original);

		if (poly._map) {
			poly._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
			delete this._markers;
		}
	},

	// @method updateMarkers(): void
	// Clear markers and update their location
	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}
		this._markers = [];

		var latlngs = this._defaultShape(),
			i, j, len, marker;

		for (i = 0, len = latlngs.length; i < len; i++) {

			marker = this._createMarker(latlngs[i], i);
			marker.on('click', this._onMarkerClick, this);
			marker.on('contextmenu', this._onContextMenu, this);
			this._markers.push(marker);
		}

		var markerLeft, markerRight;

		for (i = 0, j = len - 1; i < len; j = i++) {
			if (i === 0 && !(L.Polygon && (this._poly instanceof L.Polygon))) {
				continue;
			}

			markerLeft = this._markers[j];
			markerRight = this._markers[i];

			this._createMiddleMarker(markerLeft, markerRight);
			this._updatePrevNext(markerLeft, markerRight);
		}
	},

	_createMarker: function (latlng, index) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: this.options.icon,
		});

		marker._origLatLng = latlng;
		marker._index = index;

		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._fireEdit, this)
			.on('touchmove', this._onTouchMove, this)
			.on('touchend', this._fireEdit, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('MSPointerUp', this._fireEdit, this);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_onMarkerDragStart: function () {
		this._poly.fire('editstart');
	},

	_spliceLatLngs: function () {
		var latlngs = this._defaultShape();
		var removed = [].splice.apply(latlngs, arguments);
		this._poly._convertLatLngs(latlngs, true);
		this._poly.redraw();
		return removed;
	},

	_removeMarker: function (marker) {
		var i = marker._index;

		this._markerGroup.removeLayer(marker);
		this._markers.splice(i, 1);
		this._spliceLatLngs(i, 1);
		this._updateIndexes(i, -1);

		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._fireEdit, this)
			.off('touchmove', this._onMarkerDrag, this)
			.off('touchend', this._fireEdit, this)
			.off('click', this._onMarkerClick, this)
			.off('MSPointerMove', this._onTouchMove, this)
			.off('MSPointerUp', this._fireEdit, this);
	},

	_fireEdit: function () {
		this._poly.edited = true;
		this._poly.fire('edit');
		this._poly._map.fire(L.Draw.Event.EDITVERTEX, {layers: this._markerGroup, poly: this._poly});
	},

	_onMarkerDrag: function (e) {
		var marker = e.target;
		var poly = this._poly;

		var oldOrigLatLng = L.LatLngUtil.cloneLatLng(marker._origLatLng);
		L.extend(marker._origLatLng, marker._latlng);
		if (poly.options.poly) {
			var tooltip = poly._map._editTooltip; // Access the tooltip

			// If we don't allow intersections and the polygon intersects
			if (!poly.options.poly.allowIntersection && poly.intersects()) {
				L.extend(marker._origLatLng, oldOrigLatLng);
				marker.setLatLng(oldOrigLatLng);
				var originalColor = poly.options.color;
				poly.setStyle({color: this.options.drawError.color});
				if (tooltip) {
					tooltip.updateContent({
						text: L.drawLocal.draw.handlers.polyline.error
					});
				}

				// Reset everything back to normal after a second
				setTimeout(function () {
					poly.setStyle({color: originalColor});
					if (tooltip) {
						tooltip.updateContent({
							text: L.drawLocal.edit.handlers.edit.tooltip.text,
							subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
						});
					}
				}, 1000);
			}
		}

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		//refresh the bounds when draging
		this._poly._bounds._southWest = L.latLng(Infinity, Infinity);
		this._poly._bounds._northEast = L.latLng(-Infinity, -Infinity);
		var latlngs = this._poly.getLatLngs();
		this._poly._convertLatLngs(latlngs, true);
		this._poly.redraw();
		this._poly.fire('editdrag');
	},

	_onMarkerClick: function (e) {

		var minPoints = L.Polygon && (this._poly instanceof L.Polygon) ? 4 : 3,
			marker = e.target;

		// If removing this point would create an invalid polyline/polygon don't remove
		if (this._defaultShape().length < minPoints) {
			return;
		}

		// remove the marker
		this._removeMarker(marker);

		// update prev/next links of adjacent markers
		this._updatePrevNext(marker._prev, marker._next);

		// remove ghost markers near the removed marker
		if (marker._middleLeft) {
			this._markerGroup.removeLayer(marker._middleLeft);
		}
		if (marker._middleRight) {
			this._markerGroup.removeLayer(marker._middleRight);
		}

		// create a ghost marker in place of the removed one
		if (marker._prev && marker._next) {
			this._createMiddleMarker(marker._prev, marker._next);

		} else if (!marker._prev) {
			marker._next._middleLeft = null;

		} else if (!marker._next) {
			marker._prev._middleRight = null;
		}

		this._fireEdit();
	},

	_onContextMenu: function (e) {
		var marker = e.target;
		var poly = this._poly;
		this._poly._map.fire(L.Draw.Event.MARKERCONTEXT, {marker: marker, layers: this._markerGroup, poly: this._poly});
		L.DomEvent.stopPropagation;
	},

	_onTouchMove: function (e) {

		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		L.extend(marker._origLatLng, latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		this._poly.redraw();
		this.updateMarkers();
	},

	_updateIndexes: function (index, delta) {
		this._markerGroup.eachLayer(function (marker) {
			if (marker._index > index) {
				marker._index += delta;
			}
		});
	},

	_createMiddleMarker: function (marker1, marker2) {
		var latlng = this._getMiddleLatLng(marker1, marker2),
			marker = this._createMarker(latlng),
			onClick,
			onDragStart,
			onDragEnd;

		marker.setOpacity(0.6);

		marker1._middleRight = marker2._middleLeft = marker;

		onDragStart = function () {
			marker.off('touchmove', onDragStart, this);
			var i = marker2._index;

			marker._index = i;

			marker
				.off('click', onClick, this)
				.on('click', this._onMarkerClick, this);

			latlng.lat = marker.getLatLng().lat;
			latlng.lng = marker.getLatLng().lng;
			this._spliceLatLngs(i, 0, latlng);
			this._markers.splice(i, 0, marker);

			marker.setOpacity(1);

			this._updateIndexes(i, 1);
			marker2._index++;
			this._updatePrevNext(marker1, marker);
			this._updatePrevNext(marker, marker2);

			this._poly.fire('editstart');
		};

		onDragEnd = function () {
			marker.off('dragstart', onDragStart, this);
			marker.off('dragend', onDragEnd, this);
			marker.off('touchmove', onDragStart, this);

			this._createMiddleMarker(marker1, marker);
			this._createMiddleMarker(marker, marker2);
		};

		onClick = function () {
			onDragStart.call(this);
			onDragEnd.call(this);
			this._fireEdit();
		};

		marker
			.on('click', onClick, this)
			.on('dragstart', onDragStart, this)
			.on('dragend', onDragEnd, this)
			.on('touchmove', onDragStart, this);

		this._markerGroup.addLayer(marker);
	},

	_updatePrevNext: function (marker1, marker2) {
		if (marker1) {
			marker1._next = marker2;
		}
		if (marker2) {
			marker2._prev = marker1;
		}
	},

	_getMiddleLatLng: function (marker1, marker2) {
		var map = this._poly._map,
			p1 = map.project(marker1.getLatLng()),
			p2 = map.project(marker2.getLatLng());

		return map.unproject(p1._add(p2)._divideBy(2));
	}
});

L.Polyline.addInitHook(function () {

	// Check to see if handler has already been initialized. This is to support versions of Leaflet that still have L.Handler.PolyEdit
	if (this.editing) {
		return;
	}

	if (L.Edit.Poly) {

		this.editing = new L.Edit.Poly(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.SimpleShape
 * @aka Edit.SimpleShape
 */
L.Edit.SimpleShape = L.Handler.extend({
	options: {
		moveIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move'
		}),
		resizeIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize'
		}),
		touchMoveIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move leaflet-touch-icon'
		}),
		touchResizeIcon: new L.DivIcon({
			iconSize: new L.Point(20, 20),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize leaflet-touch-icon'
		}),
	},

	// @method intialize(): void
	initialize: function (shape, options) {
		// if touch, switch to touch icon
		if (L.Browser.touch) {
			this.options.moveIcon = this.options.touchMoveIcon;
			this.options.resizeIcon = this.options.touchResizeIcon;
		}

		this._shape = shape;
		L.Util.setOptions(this, options);
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var shape = this._shape;
		if (this._shape._map) {
			this._map = this._shape._map;
			shape.setStyle(shape.options.editing);

			if (shape._map) {
				this._map = shape._map;
				if (!this._markerGroup) {
					this._initMarkers();
				}
				this._map.addLayer(this._markerGroup);
			}
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		var shape = this._shape;

		shape.setStyle(shape.options.original);

		if (shape._map) {
			this._unbindMarker(this._moveMarker);

			for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
				this._unbindMarker(this._resizeMarkers[i]);
			}
			this._resizeMarkers = null;

			this._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
		}

		this._map = null;
	},

	// @method updateMarkers(): void
	// Remove the edit markers from this layer
	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}

		// Create center marker
		this._createMoveMarker();

		// Create edge marker
		this._createResizeMarker();
	},

	_createMoveMarker: function () {
		// Children override
	},

	_createResizeMarker: function () {
		// Children override
	},

	_createMarker: function (latlng, icon) {
		// Extending L.Marker in TouchEvents.js to include touch.
		var marker = new L.Marker.Touch(latlng, {
			draggable: true,
			icon: icon,
			zIndexOffset: 10
		});

		this._bindMarker(marker);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_bindMarker: function (marker) {
		marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._onMarkerDragEnd, this)
			.on('touchstart', this._onTouchStart, this)
			.on('touchmove', this._onTouchMove, this)
			.on('MSPointerMove', this._onTouchMove, this)
			.on('touchend', this._onTouchEnd, this)
			.on('MSPointerUp', this._onTouchEnd, this);
	},

	_unbindMarker: function (marker) {
		marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._onMarkerDragEnd, this)
			.off('touchstart', this._onTouchStart, this)
			.off('touchmove', this._onTouchMove, this)
			.off('MSPointerMove', this._onTouchMove, this)
			.off('touchend', this._onTouchEnd, this)
			.off('MSPointerUp', this._onTouchEnd, this);
	},

	_onMarkerDragStart: function (e) {
		var marker = e.target;
		marker.setOpacity(0);

		this._shape.fire('editstart');
	},

	_fireEdit: function () {
		this._shape.edited = true;
		this._shape.fire('edit');
	},

	_onMarkerDrag: function (e) {
		var marker = e.target,
			latlng = marker.getLatLng();

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();
		this._shape.fire('editdrag');
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);

		this._fireEdit();
	},

	_onTouchStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		if (typeof(this._getCorners) === 'function') {
			// Save a reference to the opposite point
			var corners = this._getCorners(),
				marker = e.target,
				currentCornerIndex = marker._cornerIndex;

			marker.setOpacity(0);

			// Copyed from Edit.Rectangle.js line 23 _onMarkerDragStart()
			// Latlng is null otherwise.
			this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];
			this._toggleCornerMarkers(0, currentCornerIndex);
		}

		this._shape.fire('editstart');
	},

	_onTouchMove: function (e) {
		var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
			latlng = this._map.layerPointToLatLng(layerPoint),
			marker = e.target;

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();

		// prevent touchcancel in IOS
		// e.preventDefault();
		return false;
	},

	_onTouchEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);
		this.updateMarkers();
		this._fireEdit();
	},

	_move: function () {
		// Children override
	},

	_resize: function () {
		// Children override
	}
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.Rectangle
 * @aka Edit.Rectangle
 * @inherits L.Edit.SimpleShape
 */
L.Edit.Rectangle = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var bounds = this._shape.getBounds(),
			center = bounds.getCenter();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		var corners = this._getCorners();

		this._resizeMarkers = [];

		for (var i = 0, l = corners.length; i < l; i++) {
			this._resizeMarkers.push(this._createMarker(corners[i], this.options.resizeIcon));
			// Monkey in the corner index as we will need to know this for dragging
			this._resizeMarkers[i]._cornerIndex = i;
		}
	},

	_onMarkerDragStart: function (e) {
		L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);

		// Save a reference to the opposite point
		var corners = this._getCorners(),
			marker = e.target,
			currentCornerIndex = marker._cornerIndex;

		this._oppositeCorner = corners[(currentCornerIndex + 2) % 4];

		this._toggleCornerMarkers(0, currentCornerIndex);
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target,
			bounds, center;

		// Reset move marker position to the center
		if (marker === this._moveMarker) {
			bounds = this._shape.getBounds();
			center = bounds.getCenter();

			marker.setLatLng(center);
		}

		this._toggleCornerMarkers(1);

		this._repositionCornerMarkers();

		L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, e);
	},

	_move: function (newCenter) {
		var latlngs = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs(),
			bounds = this._shape.getBounds(),
			center = bounds.getCenter(),
			offset, newLatLngs = [];

		// Offset the latlngs to the new center
		for (var i = 0, l = latlngs.length; i < l; i++) {
			offset = [latlngs[i].lat - center.lat, latlngs[i].lng - center.lng];
			newLatLngs.push([newCenter.lat + offset[0], newCenter.lng + offset[1]]);
		}

		this._shape.setLatLngs(newLatLngs);

		// Reposition the resize markers
		this._repositionCornerMarkers();

		this._map.fire(L.Draw.Event.EDITMOVE, {layer: this._shape});
	},

	_resize: function (latlng) {
		var bounds;

		// Update the shape based on the current position of this corner and the opposite point
		this._shape.setBounds(L.latLngBounds(latlng, this._oppositeCorner));

		// Reposition the move marker
		bounds = this._shape.getBounds();
		this._moveMarker.setLatLng(bounds.getCenter());

		this._map.fire(L.Draw.Event.EDITRESIZE, {layer: this._shape});
	},

	_getCorners: function () {
		var bounds = this._shape.getBounds(),
			nw = bounds.getNorthWest(),
			ne = bounds.getNorthEast(),
			se = bounds.getSouthEast(),
			sw = bounds.getSouthWest();

		return [nw, ne, se, sw];
	},

	_toggleCornerMarkers: function (opacity) {
		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setOpacity(opacity);
		}
	},

	_repositionCornerMarkers: function () {
		var corners = this._getCorners();

		for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
			this._resizeMarkers[i].setLatLng(corners[i]);
		}
	}
});

L.Rectangle.addInitHook(function () {
	if (L.Edit.Rectangle) {
		this.editing = new L.Edit.Rectangle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.CircleMarker
 * @aka Edit.Circle
 * @inherits L.Edit.SimpleShape
 */
L.Edit.CircleMarker = L.Edit.SimpleShape.extend({
	_createMoveMarker: function () {
		var center = this._shape.getLatLng();

		this._moveMarker = this._createMarker(center, this.options.moveIcon);
	},

	_createResizeMarker: function () {
		// To avoid an undefined check in L.Edit.SimpleShape.removeHooks
		this._resizeMarkers = [];
	},

	_move: function (latlng) {
		if (this._resizeMarkers.length) {
			var resizemarkerPoint = this._getResizeMarkerPoint(latlng);
			// Move the resize marker
			this._resizeMarkers[0].setLatLng(resizemarkerPoint);
		}

		// Move the circle
		this._shape.setLatLng(latlng);

		this._map.fire(L.Draw.Event.EDITMOVE, {layer: this._shape});
	},
});

L.CircleMarker.addInitHook(function () {
	if (L.Edit.CircleMarker) {
		this.editing = new L.Edit.CircleMarker(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}

	this.on('add', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	});

	this.on('remove', function () {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}
	});
});



L.Edit = L.Edit || {};
/**
 * @class L.Edit.Circle
 * @aka Edit.Circle
 * @inherits L.Edit.CircleMarker
 */
L.Edit.Circle = L.Edit.CircleMarker.extend({

	_createResizeMarker: function () {
		var center = this._shape.getLatLng(),
			resizemarkerPoint = this._getResizeMarkerPoint(center);

		this._resizeMarkers = [];
		this._resizeMarkers.push(this._createMarker(resizemarkerPoint, this.options.resizeIcon));
	},

	_getResizeMarkerPoint: function (latlng) {
		// From L.shape.getBounds()
		var delta = this._shape._radius * Math.cos(Math.PI / 4),
			point = this._map.project(latlng);
		return this._map.unproject([point.x + delta, point.y - delta]);
	},

	_resize: function (latlng) {
		var moveLatLng = this._moveMarker.getLatLng();

		// Calculate the radius based on the version
		if (L.GeometryUtil.isVersion07x()) {
			radius = moveLatLng.distanceTo(latlng);
		} else {
			radius = this._map.distance(moveLatLng, latlng);
		}
		this._shape.setRadius(radius);

		if (this._map.editTooltip) {
			this._map._editTooltip.updateContent({
				text: L.drawLocal.edit.handlers.edit.tooltip.subtext + '<br />' + L.drawLocal.edit.handlers.edit.tooltip.text,
				subtext: L.drawLocal.draw.handlers.circle.radius + ': ' +
				L.GeometryUtil.readableDistance(radius, true, this.options.feet, this.options.nautic)
			});
		}

		this._shape.setRadius(radius);

		this._map.fire(L.Draw.Event.EDITRESIZE, {layer: this._shape});
	}
});

L.Circle.addInitHook(function () {
	if (L.Edit.Circle) {
		this.editing = new L.Edit.Circle(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});



L.Map.mergeOptions({
	touchExtend: true
});

/**
 * @class L.Map.TouchExtend
 * @aka TouchExtend
 */
L.Map.TouchExtend = L.Handler.extend({

	// @method initialize(): void
	// Sets TouchExtend private accessor variables
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	// @method addHooks(): void
	// Adds dom listener events to the map container
	addHooks: function () {
		L.DomEvent.on(this._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.on(this._container, 'touchend', this._onTouchEnd, this);
		L.DomEvent.on(this._container, 'touchmove', this._onTouchMove, this);
		if (this._detectIE()) {
			L.DomEvent.on(this._container, 'MSPointerDown', this._onTouchStart, this);
			L.DomEvent.on(this._container, 'MSPointerUp', this._onTouchEnd, this);
			L.DomEvent.on(this._container, 'MSPointerMove', this._onTouchMove, this);
			L.DomEvent.on(this._container, 'MSPointerCancel', this._onTouchCancel, this);

		} else {
			L.DomEvent.on(this._container, 'touchcancel', this._onTouchCancel, this);
			L.DomEvent.on(this._container, 'touchleave', this._onTouchLeave, this);
		}
	},

	// @method removeHooks(): void
	// Removes dom listener events from the map container
	removeHooks: function () {
		L.DomEvent.off(this._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.off(this._container, 'touchend', this._onTouchEnd, this);
		L.DomEvent.off(this._container, 'touchmove', this._onTouchMove, this);
		if (this._detectIE()) {
			L.DomEvent.off(this._container, 'MSPointerDown', this._onTouchStart, this);
			L.DomEvent.off(this._container, 'MSPointerUp', this._onTouchEnd, this);
			L.DomEvent.off(this._container, 'MSPointerMove', this._onTouchMove, this);
			L.DomEvent.off(this._container, 'MSPointerCancel', this._onTouchCancel, this);
		} else {
			L.DomEvent.off(this._container, 'touchcancel', this._onTouchCancel, this);
			L.DomEvent.off(this._container, 'touchleave', this._onTouchLeave, this);
		}
	},

	_touchEvent: function (e, type) {
		// #TODO: fix the pageX error that is do a bug in Android where a single touch triggers two click events
		// _filterClick is what leaflet uses as a workaround.
		// This is a problem with more things than just android. Another problem is touchEnd has no touches in
		// its touch list.
		var touchEvent = {};
		if (typeof e.touches !== 'undefined') {
			if (!e.touches.length) {
				return;
			}
			touchEvent = e.touches[0];
		} else if (e.pointerType === 'touch') {
			touchEvent = e;
			if (!this._filterClick(e)) {
				return;
			}
		} else {
			return;
		}

		var containerPoint = this._map.mouseEventToContainerPoint(touchEvent),
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);

		this._map.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			pageX: touchEvent.pageX,
			pageY: touchEvent.pageY,
			originalEvent: e
		});
	},

	/** Borrowed from Leaflet and modified for bool ops **/
	_filterClick: function (e) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
			elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events
		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return false;
		}
		L.DomEvent._lastClick = timeStamp;
		return true;
	},

	_onTouchStart: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchstart';
		this._touchEvent(e, type);

	},

	_onTouchEnd: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchend';
		this._touchEvent(e, type);
	},

	_onTouchCancel: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchcancel';
		if (this._detectIE()) {
			type = 'pointercancel';
		}
		this._touchEvent(e, type);
	},

	_onTouchLeave: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchleave';
		this._touchEvent(e, type);
	},

	_onTouchMove: function (e) {
		if (!this._map._loaded) {
			return;
		}

		var type = 'touchmove';
		this._touchEvent(e, type);
	},

	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});

L.Map.addInitHook('addHandler', 'touchExtend', L.Map.TouchExtend);


/**
 * @class L.Marker.Touch
 * @aka Marker.Touch
 *
 * This isn't full Touch support. This is just to get markers to also support dom touch events after creation
 * #TODO: find a better way of getting markers to support touch.
 */
L.Marker.Touch = L.Marker.extend({

	_initInteraction: function () {
		if (!this.addInteractiveTarget) {
			// 0.7.x support
			return this._initInteractionLegacy();
		}
		// TODO this may need be updated to re-add touch events for 1.0+
		return L.Marker.prototype._initInteraction.apply(this);
	},

	// This is an exact copy of https://github.com/Leaflet/Leaflet/blob/v0.7/src/layer/marker/Marker.js
	// with the addition of the touch events
	_initInteractionLegacy: function () {

		if (!this.options.clickable) {
			return;
		}

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
			events = ['dblclick',
				'mousedown',
				'mouseover',
				'mouseout',
				'contextmenu',
				'touchstart',
				'touchend',
				'touchmove'];
		if (this._detectIE) {
			events.concat(['MSPointerDown',
				'MSPointerUp',
				'MSPointerMove',
				'MSPointerCancel']);
		} else {
			events.concat(['touchcancel']);
		}

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);
		L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_detectIE: function () {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
});



/**
 * @class L.LatLngUtil
 * @aka LatLngUtil
 */
L.LatLngUtil = {
	// Clones a LatLngs[], returns [][]

	// @method cloneLatLngs(LatLngs[]): L.LatLngs[]
	// Clone the latLng point or points or nested points and return an array with those points
	cloneLatLngs: function (latlngs) {
		var clone = [];
		for (var i = 0, l = latlngs.length; i < l; i++) {
			// Check for nested array (Polyline/Polygon)
			if (Array.isArray(latlngs[i])) {
				clone.push(L.LatLngUtil.cloneLatLngs(latlngs[i]));
			} else {
				clone.push(this.cloneLatLng(latlngs[i]));
			}
		}
		return clone;
	},

	// @method cloneLatLng(LatLng): L.LatLng
	// Clone the latLng and return a new LatLng object.
	cloneLatLng: function (latlng) {
		return L.latLng(latlng.lat, latlng.lng);
	}
};



(function () {

	var defaultPrecision = {
		km: 2,
		ha: 2,
		m: 0,
		mi: 2,
		ac: 2,
		yd: 0,
		ft: 0,
		nm: 2
	};


	/**
	 * @class L.GeometryUtil
	 * @aka GeometryUtil
	 */
	L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
		// Ported from the OpenLayers implementation. See https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Geometry/LinearRing.js#L270

		// @method geodesicArea(): number
		geodesicArea: function (latLngs) {
			var pointsCount = latLngs.length,
				area = 0.0,
				d2r = Math.PI / 180,
				p1, p2;

			if (pointsCount > 2) {
				for (var i = 0; i < pointsCount; i++) {
					p1 = latLngs[i];
					p2 = latLngs[(i + 1) % pointsCount];
					area += ((p2.lng - p1.lng) * d2r) *
						(2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
				}
				area = area * 6378137.0 * 6378137.0 / 2.0;
			}

			return Math.abs(area);
		},

		// @method formattedNumber(n, precision): string
		// Returns n in specified number format (if defined) and precision
		formattedNumber: function (n, precision) {
			var formatted = parseFloat(n).toFixed(precision),
				format = L.drawLocal.format && L.drawLocal.format.numeric,
				delimiters = format && format.delimiters,
				thousands = delimiters && delimiters.thousands,
				decimal = delimiters && delimiters.decimal;

			if (thousands || decimal) {
				var splitValue = formatted.split('.');
				formatted = thousands ? splitValue[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousands) : splitValue[0];
				decimal = decimal || '.';
				if (splitValue.length > 1) {
					formatted = formatted + decimal + splitValue[1];
				}
			}

			return formatted;
		},

		// @method readableArea(area, isMetric, precision): string
		// Returns a readable area string in yards or metric.
		// The value will be rounded as defined by the precision option object.
		readableArea: function (area, isMetric, precision) {
			var areaStr,
				units,
				precision = L.Util.extend({}, defaultPrecision, precision);

			if (isMetric) {
				units = ['ha', 'm'];
				type = typeof isMetric;
				if (type === 'string') {
					units = [isMetric];
				} else if (type !== 'boolean') {
					units = isMetric;
				}

				if (area >= 1000000 && units.indexOf('km') !== -1) {
					areaStr = L.GeometryUtil.formattedNumber(area * 0.000001, precision['km']) + ' km²';
				} else if (area >= 10000 && units.indexOf('ha') !== -1) {
					areaStr = L.GeometryUtil.formattedNumber(area * 0.0001, precision['ha']) + ' ha';
				} else {
					areaStr = L.GeometryUtil.formattedNumber(area, precision['m']) + ' m²';
				}
			} else {
				area /= 0.836127; // Square yards in 1 meter

				if (area >= 3097600) { //3097600 square yards in 1 square mile
					areaStr = L.GeometryUtil.formattedNumber(area / 3097600, precision['mi']) + ' mi²';
				} else if (area >= 4840) { //4840 square yards in 1 acre
					areaStr = L.GeometryUtil.formattedNumber(area / 4840, precision['ac']) + ' acres';
				} else {
					areaStr = L.GeometryUtil.formattedNumber(area, precision['yd']) + ' yd²';
				}
			}

			return areaStr;
		},

		// @method readableDistance(distance, units): string
		// Converts a metric distance to one of [ feet, nauticalMile, metric or yards ] string
		//
		// @alternative
		// @method readableDistance(distance, isMetric, useFeet, isNauticalMile, precision): string
		// Converts metric distance to distance string.
		// The value will be rounded as defined by the precision option object.
		readableDistance: function (distance, isMetric, isFeet, isNauticalMile, precision) {
			var distanceStr,
				units,
				precision = L.Util.extend({}, defaultPrecision, precision);

			if (isMetric) {
				units = typeof isMetric == 'string' ? isMetric : 'metric';
			} else if (isFeet) {
				units = 'feet';
			} else if (isNauticalMile) {
				units = 'nauticalMile';
			} else {
				units = 'yards';
			}

			switch (units) {
				case 'metric':
					// show metres when distance is < 1km, then show km
					if (distance > 1000) {
						distanceStr = L.GeometryUtil.formattedNumber(distance / 1000, precision['km']) + ' km';
					} else {
						distanceStr = L.GeometryUtil.formattedNumber(distance, precision['m']) + ' m';
					}
					break;
				case 'feet':
					distance *= 1.09361 * 3;
					distanceStr = L.GeometryUtil.formattedNumber(distance, precision['ft']) + ' ft';

					break;
				case 'nauticalMile':
					distance *= 0.53996;
					distanceStr = L.GeometryUtil.formattedNumber(distance / 1000, precision['nm']) + ' nm';
					break;
				case 'yards':
				default:
					distance *= 1.09361;

					if (distance > 1760) {
						distanceStr = L.GeometryUtil.formattedNumber(distance / 1760, precision['mi']) + ' miles';
					} else {
						distanceStr = L.GeometryUtil.formattedNumber(distance, precision['yd']) + ' yd';
					}
					break;
			}
			return distanceStr;
		},

		// @method isVersion07x(): boolean
		// Returns true if the Leaflet version is 0.7.x, false otherwise.
		isVersion07x: function () {
			var version = L.version.split('.');
			//If Version is == 0.7.*
			return parseInt(version[0], 10) === 0 && parseInt(version[1], 10) === 7;
		},
	});

})();



/**
 * @class L.LineUtil
 * @aka Util
 * @aka L.Utils
 */
L.Util.extend(L.LineUtil, {

	// @method segmentsIntersect(): boolean
	// Checks to see if two line segments intersect. Does not handle degenerate cases.
	// http://compgeom.cs.uiuc.edu/~jeffe/teaching/373/notes/x06-sweepline.pdf
	segmentsIntersect: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2, /*Point*/ p3) {
		return this._checkCounterclockwise(p, p2, p3) !==
			this._checkCounterclockwise(p1, p2, p3) &&
			this._checkCounterclockwise(p, p1, p2) !==
			this._checkCounterclockwise(p, p1, p3);
	},

	// check to see if points are in counterclockwise order
	_checkCounterclockwise: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return (p2.y - p.y) * (p1.x - p.x) > (p1.y - p.y) * (p2.x - p.x);
	}
});



/**
 * @class L.Polyline
 * @aka Polyline
 */
L.Polyline.include({

	// @method intersects(): boolean
	// Check to see if this polyline has any linesegments that intersect.
	// NOTE: does not support detecting intersection for degenerate cases.
	intersects: function () {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0,
			i, p, p1;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		for (i = len - 1; i >= 3; i--) {
			p = points[i - 1];
			p1 = points[i];


			if (this._lineSegmentsIntersectsRange(p, p1, i - 2)) {
				return true;
			}
		}

		return false;
	},

	// @method newLatLngIntersects(): boolean
	// Check for intersection if new latlng was added to this polyline.
	// NOTE: does not support detecting intersection for degenerate cases.
	newLatLngIntersects: function (latlng, skipFirst) {
		// Cannot check a polyline for intersecting lats/lngs when not added to the map
		if (!this._map) {
			return false;
		}

		return this.newPointIntersects(this._map.latLngToLayerPoint(latlng), skipFirst);
	},

	// @method newPointIntersects(): boolean
	// Check for intersection if new point was added to this polyline.
	// newPoint must be a layer point.
	// NOTE: does not support detecting intersection for degenerate cases.
	newPointIntersects: function (newPoint, skipFirst) {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0,
			lastPoint = points ? points[len - 1] : null,
			// The previous previous line segment. Previous line segment doesn't need testing.
			maxIndex = len - 2;

		if (this._tooFewPointsForIntersection(1)) {
			return false;
		}

		return this._lineSegmentsIntersectsRange(lastPoint, newPoint, maxIndex, skipFirst ? 1 : 0);
	},

	// Polylines with 2 sides can only intersect in cases where points are collinear (we don't support detecting these).
	// Cannot have intersection when < 3 line segments (< 4 points)
	_tooFewPointsForIntersection: function (extraPoints) {
		var points = this._getProjectedPoints(),
			len = points ? points.length : 0;
		// Increment length by extraPoints if present
		len += extraPoints || 0;

		return !points || len <= 3;
	},

	// Checks a line segment intersections with any line segments before its predecessor.
	// Don't need to check the predecessor as will never intersect.
	_lineSegmentsIntersectsRange: function (p, p1, maxIndex, minIndex) {
		var points = this._getProjectedPoints(),
			p2, p3;

		minIndex = minIndex || 0;

		// Check all previous line segments (beside the immediately previous) for intersections
		for (var j = maxIndex; j > minIndex; j--) {
			p2 = points[j - 1];
			p3 = points[j];

			if (L.LineUtil.segmentsIntersect(p, p1, p2, p3)) {
				return true;
			}
		}

		return false;
	},

	_getProjectedPoints: function () {
		if (!this._defaultShape) {
			return this._originalPoints;
		}
		var points = [],
			_shape = this._defaultShape();

		for (var i = 0; i < _shape.length; i++) {
			points.push(this._map.latLngToLayerPoint(_shape[i]));
		}
		return points;
	}
});



/**
 * @class L.Polygon
 * @aka Polygon
 */
L.Polygon.include({

	// @method intersects(): boolean
	// Checks a polygon for any intersecting line segments. Ignores holes.
	intersects: function () {
		var polylineIntersects,
			points = this._getProjectedPoints(),
			len, firstPoint, lastPoint, maxIndex;

		if (this._tooFewPointsForIntersection()) {
			return false;
		}

		polylineIntersects = L.Polyline.prototype.intersects.call(this);

		// If already found an intersection don't need to check for any more.
		if (polylineIntersects) {
			return true;
		}

		len = points.length;
		firstPoint = points[0];
		lastPoint = points[len - 1];
		maxIndex = len - 2;

		// Check the line segment between last and first point. Don't need to check the first line segment (minIndex = 1)
		return this._lineSegmentsIntersectsRange(lastPoint, firstPoint, maxIndex, 1);
	}
});



/**
 * @class L.Control.Draw
 * @aka L.Draw
 */
L.Control.Draw = L.Control.extend({

	// Options
	options: {
		position: 'topleft',
		draw: {},
		edit: false
	},

	// @method initialize(): void
	// Initializes draw control, toolbars from the options
	initialize: function (options) {
		if (L.version < '0.7') {
			throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/');
		}

		L.Control.prototype.initialize.call(this, options);

		var toolbar;

		this._toolbars = {};

		// Initialize toolbars
		if (L.DrawToolbar && this.options.draw) {
			toolbar = new L.DrawToolbar(this.options.draw);

			this._toolbars[L.DrawToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.DrawToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}

		if (L.EditToolbar && this.options.edit) {
			toolbar = new L.EditToolbar(this.options.edit);

			this._toolbars[L.EditToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.EditToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}
		L.toolbar = this; //set global var for editing the toolbar
	},

	// @method onAdd(): container
	// Adds the toolbar container to the map
	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw'),
			addedTopClass = false,
			topClassName = 'leaflet-draw-toolbar-top',
			toolbarContainer;

		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				toolbarContainer = this._toolbars[toolbarId].addToolbar(map);

				if (toolbarContainer) {
					// Add class to the first toolbar to remove the margin
					if (!addedTopClass) {
						if (!L.DomUtil.hasClass(toolbarContainer, topClassName)) {
							L.DomUtil.addClass(toolbarContainer.childNodes[0], topClassName);
						}
						addedTopClass = true;
					}

					container.appendChild(toolbarContainer);
				}
			}
		}

		return container;
	},

	// @method onRemove(): void
	// Removes the toolbars from the map toolbar container
	onRemove: function () {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				this._toolbars[toolbarId].removeToolbar();
			}
		}
	},

	// @method setDrawingOptions(options): void
	// Sets options to all toolbar instances
	setDrawingOptions: function (options) {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars[toolbarId] instanceof L.DrawToolbar) {
				this._toolbars[toolbarId].setOptions(options);
			}
		}
	},

	_toolbarEnabled: function (e) {
		var enabledToolbar = e.target;

		for (var toolbarId in this._toolbars) {
			if (this._toolbars[toolbarId] !== enabledToolbar) {
				this._toolbars[toolbarId].disable();
			}
		}
	}
});

L.Map.mergeOptions({
	drawControlTooltips: true,
	drawControl: false
});

L.Map.addInitHook(function () {
	if (this.options.drawControl) {
		this.drawControl = new L.Control.Draw();
		this.addControl(this.drawControl);
	}
});



/**
 * @class L.Draw.Toolbar
 * @aka Toolbar
 *
 * The toolbar class of the API — it is used to create the ui
 * This will be depreciated
 *
 * @example
 *
 * ```js
 *    var toolbar = L.Toolbar();
 *    toolbar.addToolbar(map);
 * ```
 *
 * ### Disabling a toolbar
 *
 * If you do not want a particular toolbar in your app you can turn it off by setting the toolbar to false.
 *
 * ```js
 *      var drawControl = new L.Control.Draw({
 *          draw: false,
 *          edit: {
 *              featureGroup: editableLayers
 *          }
 *      });
 * ```
 *
 * ### Disabling a toolbar item
 *
 * If you want to turn off a particular toolbar item, set it to false. The following disables drawing polygons and
 * markers. It also turns off the ability to edit layers.
 *
 * ```js
 *      var drawControl = new L.Control.Draw({
 *          draw: {
 *              polygon: false,
 *              marker: false
 *          },
 *          edit: {
 *              featureGroup: editableLayers,
 *              edit: false
 *          }
 *      });
 * ```
 */
L.Toolbar = L.Class.extend({
	// @section Methods for modifying the toolbar

	// @method initialize(options): void
	// Toolbar constructor
	initialize: function (options) {
		L.setOptions(this, options);

		this._modes = {};
		this._actionButtons = [];
		this._activeMode = null;

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.Toolbar.include(L.Evented.prototype);
		} else {
			L.Toolbar.include(L.Mixin.Events);
		}
	},

	// @method enabled(): boolean
	// Gets a true/false of whether the toolbar is enabled
	enabled: function () {
		return this._activeMode !== null;
	},

	// @method disable(): void
	// Disables the toolbar
	disable: function () {
		if (!this.enabled()) {
			return;
		}

		this._activeMode.handler.disable();
	},

	// @method addToolbar(map): L.DomUtil
	// Adds the toolbar to the map and returns the toolbar dom element
	addToolbar: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw-section'),
			buttonIndex = 0,
			buttonClassPrefix = this._toolbarClass || '',
			modeHandlers = this.getModeHandlers(map),
			i;

		this._toolbarContainer = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
		this._map = map;

		for (i = 0; i < modeHandlers.length; i++) {
			if (modeHandlers[i].enabled) {
				this._initModeHandler(
					modeHandlers[i].handler,
					this._toolbarContainer,
					buttonIndex++,
					buttonClassPrefix,
					modeHandlers[i].title
				);
			}
		}

		// if no buttons were added, do not add the toolbar
		if (!buttonIndex) {
			return;
		}

		// Save button index of the last button, -1 as we would have ++ after the last button
		this._lastButtonIndex = --buttonIndex;

		// Create empty actions part of the toolbar
		this._actionsContainer = L.DomUtil.create('ul', 'leaflet-draw-actions');

		// Add draw and cancel containers to the control container
		container.appendChild(this._toolbarContainer);
		container.appendChild(this._actionsContainer);

		return container;
	},

	// @method removeToolbar(): void
	// Removes the toolbar and drops the handler event listeners
	removeToolbar: function () {
		// Dispose each handler
		for (var handlerId in this._modes) {
			if (this._modes.hasOwnProperty(handlerId)) {
				// Unbind handler button
				this._disposeButton(
					this._modes[handlerId].button,
					this._modes[handlerId].handler.enable,
					this._modes[handlerId].handler
				);

				// Make sure is disabled
				this._modes[handlerId].handler.disable();

				// Unbind handler
				this._modes[handlerId].handler
					.off('enabled', this._handlerActivated, this)
					.off('disabled', this._handlerDeactivated, this);
			}
		}
		this._modes = {};

		// Dispose the actions toolbar
		for (var i = 0, l = this._actionButtons.length; i < l; i++) {
			this._disposeButton(
				this._actionButtons[i].button,
				this._actionButtons[i].callback,
				this
			);
		}
		this._actionButtons = [];
		this._actionsContainer = null;
	},

	_initModeHandler: function (handler, container, buttonIndex, classNamePredix, buttonTitle) {
		var type = handler.type;

		this._modes[type] = {};

		this._modes[type].handler = handler;

		this._modes[type].button = this._createButton({
			type: type,
			title: buttonTitle,
			className: classNamePredix + '-' + type,
			container: container,
			callback: this._modes[type].handler.enable,
			context: this._modes[type].handler
		});

		this._modes[type].buttonIndex = buttonIndex;

		this._modes[type].handler
			.on('enabled', this._handlerActivated, this)
			.on('disabled', this._handlerDeactivated, this);
	},

	/* Detect iOS based on browser User Agent, based on:
	 * http://stackoverflow.com/a/9039885 */
	_detectIOS: function () {
		var iOS = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
		return iOS;
	},

	_createButton: function (options) {

		var link = L.DomUtil.create('a', options.className || '', options.container);
		// Screen reader tag
		var sr = L.DomUtil.create('span', 'sr-only', options.container);

		link.href = '#';
		link.appendChild(sr);

		if (options.title) {
			link.title = options.title;
			sr.innerHTML = options.title;
		}

		if (options.text) {
			link.innerHTML = options.text;
			sr.innerHTML = options.text;
		}

		/* iOS does not use click events */
		var buttonEvent = this._detectIOS() ? 'touchstart' : 'click';

		L.DomEvent
			.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'mousedown', L.DomEvent.stopPropagation)
			.on(link, 'dblclick', L.DomEvent.stopPropagation)
			.on(link, 'touchstart', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, buttonEvent, options.callback, options.context);

		return link;
	},

	_disposeButton: function (button, callback) {
		/* iOS does not use click events */
		var buttonEvent = this._detectIOS() ? 'touchstart' : 'click';

		L.DomEvent
			.off(button, 'click', L.DomEvent.stopPropagation)
			.off(button, 'mousedown', L.DomEvent.stopPropagation)
			.off(button, 'dblclick', L.DomEvent.stopPropagation)
			.off(button, 'touchstart', L.DomEvent.stopPropagation)
			.off(button, 'click', L.DomEvent.preventDefault)
			.off(button, buttonEvent, callback);
	},

	_handlerActivated: function (e) {
		// Disable active mode (if present)
		this.disable();

		// Cache new active feature
		this._activeMode = this._modes[e.handler];

		L.DomUtil.addClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled');

		this._showActionsToolbar();

		this.fire('enable');
	},

	_handlerDeactivated: function () {
		this._hideActionsToolbar();

		L.DomUtil.removeClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled');

		this._activeMode = null;

		this.fire('disable');
	},

	_createActions: function (handler) {
		var container = this._actionsContainer,
			buttons = this.getActions(handler),
			l = buttons.length,
			li, di, dl, button;

		// Dispose the actions toolbar (todo: dispose only not used buttons)
		for (di = 0, dl = this._actionButtons.length; di < dl; di++) {
			this._disposeButton(this._actionButtons[di].button, this._actionButtons[di].callback);
		}
		this._actionButtons = [];

		// Remove all old buttons
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		for (var i = 0; i < l; i++) {
			if ('enabled' in buttons[i] && !buttons[i].enabled) {
				continue;
			}

			li = L.DomUtil.create('li', '', container);

			button = this._createButton({
				title: buttons[i].title,
				text: buttons[i].text,
				container: li,
				callback: buttons[i].callback,
				context: buttons[i].context
			});

			this._actionButtons.push({
				button: button,
				callback: buttons[i].callback
			});
		}
	},

	_showActionsToolbar: function () {
		var buttonIndex = this._activeMode.buttonIndex,
			lastButtonIndex = this._lastButtonIndex,
			toolbarPosition = this._activeMode.button.offsetTop - 1;

		// Recreate action buttons on every click
		this._createActions(this._activeMode.handler);

		// Correctly position the cancel button
		this._actionsContainer.style.top = toolbarPosition + 'px';

		if (buttonIndex === 0) {
			L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop');
			L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-top');
		}

		if (buttonIndex === lastButtonIndex) {
			L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom');
			L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
		}

		this._actionsContainer.style.display = 'block';
		this._map.fire(L.Draw.Event.TOOLBAROPENED);
	},

	_hideActionsToolbar: function () {
		this._actionsContainer.style.display = 'none';

		L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop');
		L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom');
		L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-top');
		L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
		this._map.fire(L.Draw.Event.TOOLBARCLOSED);
	}
});



L.Draw = L.Draw || {};
/**
 * @class L.Draw.Tooltip
 * @aka Tooltip
 *
 * The tooltip class — it is used to display the tooltip while drawing
 * This will be depreciated
 *
 * @example
 *
 * ```js
 *    var tooltip = L.Draw.Tooltip();
 * ```
 *
 */
L.Draw.Tooltip = L.Class.extend({

	// @section Methods for modifying draw state

	// @method initialize(map): void
	// Tooltip constructor
	initialize: function (map) {
		this._map = map;
		this._popupPane = map._panes.popupPane;
		this._visible = false;

		this._container = map.options.drawControlTooltips ?
			L.DomUtil.create('div', 'leaflet-draw-tooltip', this._popupPane) : null;
		this._singleLineLabel = false;

		this._map.on('mouseout', this._onMouseOut, this);
	},

	// @method dispose(): void
	// Remove Tooltip DOM and unbind events
	dispose: function () {
		this._map.off('mouseout', this._onMouseOut, this);

		if (this._container) {
			this._popupPane.removeChild(this._container);
			this._container = null;
		}
	},

	// @method updateContent(labelText): this
	// Changes the tooltip text to string in function call
	updateContent: function (labelText) {
		if (!this._container) {
			return this;
		}
		labelText.subtext = labelText.subtext || '';

		// update the vertical position (only if changed)
		if (labelText.subtext.length === 0 && !this._singleLineLabel) {
			L.DomUtil.addClass(this._container, 'leaflet-draw-tooltip-single');
			this._singleLineLabel = true;
		}
		else if (labelText.subtext.length > 0 && this._singleLineLabel) {
			L.DomUtil.removeClass(this._container, 'leaflet-draw-tooltip-single');
			this._singleLineLabel = false;
		}

		this._container.innerHTML =
			(labelText.subtext.length > 0 ?
				'<span class="leaflet-draw-tooltip-subtext">' + labelText.subtext + '</span>' + '<br />' : '') +
			'<span>' + labelText.text + '</span>';

		if (!labelText.text && !labelText.subtext) {
			this._visible = false;
			this._container.style.visibility = 'hidden';
		} else {
			this._visible = true;
			this._container.style.visibility = 'inherit';
		}

		return this;
	},

	// @method updatePosition(latlng): this
	// Changes the location of the tooltip
	updatePosition: function (latlng) {
		var pos = this._map.latLngToLayerPoint(latlng),
			tooltipContainer = this._container;

		if (this._container) {
			if (this._visible) {
				tooltipContainer.style.visibility = 'inherit';
			}
			L.DomUtil.setPosition(tooltipContainer, pos);
		}

		return this;
	},

	// @method showAsError(): this
	// Applies error class to tooltip
	showAsError: function () {
		if (this._container) {
			L.DomUtil.addClass(this._container, 'leaflet-error-draw-tooltip');
		}
		return this;
	},

	// @method removeError(): this
	// Removes the error class from the tooltip
	removeError: function () {
		if (this._container) {
			L.DomUtil.removeClass(this._container, 'leaflet-error-draw-tooltip');
		}
		return this;
	},

	_onMouseOut: function () {
		if (this._container) {
			this._container.style.visibility = 'hidden';
		}
	}
});



/**
 * @class L.DrawToolbar
 * @aka Toolbar
 */
L.DrawToolbar = L.Toolbar.extend({

	statics: {
		TYPE: 'draw'
	},

	options: {
		polyline: {},
		polygon: {},
		rectangle: {},
		circle: {},
		marker: {},
		circlemarker: {}
	},

	// @method initialize(): void
	initialize: function (options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend({}, this.options[type], options[type]);
				}
			}
		}

		this._toolbarClass = 'leaflet-draw-draw';
		L.Toolbar.prototype.initialize.call(this, options);
	},

	// @method getModeHandlers(): object
	// Get mode handlers information
	getModeHandlers: function (map) {
		return [
			{
				enabled: this.options.polyline,
				handler: new L.Draw.Polyline(map, this.options.polyline),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.polygon,
				handler: new L.Draw.Polygon(map, this.options.polygon),
				title: L.drawLocal.draw.toolbar.buttons.polygon
			},
			{
				enabled: this.options.rectangle,
				handler: new L.Draw.Rectangle(map, this.options.rectangle),
				title: L.drawLocal.draw.toolbar.buttons.rectangle
			},
			{
				enabled: this.options.circle,
				handler: new L.Draw.Circle(map, this.options.circle),
				title: L.drawLocal.draw.toolbar.buttons.circle
			},
			{
				enabled: this.options.marker,
				handler: new L.Draw.Marker(map, this.options.marker),
				title: L.drawLocal.draw.toolbar.buttons.marker
			},
			{
				enabled: this.options.circlemarker,
				handler: new L.Draw.CircleMarker(map, this.options.circlemarker),
				title: L.drawLocal.draw.toolbar.buttons.circlemarker
			}
		];
	},

	// @method getActions(): object
	// Get action information
	getActions: function (handler) {
		return [
			{
				enabled: handler.completeShape,
				title: L.drawLocal.draw.toolbar.finish.title,
				text: L.drawLocal.draw.toolbar.finish.text,
				callback: handler.completeShape,
				context: handler
			},
			{
				enabled: handler.deleteLastVertex,
				title: L.drawLocal.draw.toolbar.undo.title,
				text: L.drawLocal.draw.toolbar.undo.text,
				callback: handler.deleteLastVertex,
				context: handler
			},
			{
				title: L.drawLocal.draw.toolbar.actions.title,
				text: L.drawLocal.draw.toolbar.actions.text,
				callback: this.disable,
				context: this
			}
		];
	},

	// @method setOptions(): void
	// Sets the options to the toolbar
	setOptions: function (options) {
		L.setOptions(this, options);

		for (var type in this._modes) {
			if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
				this._modes[type].handler.setOptions(options[type]);
			}
		}
	}
});



/*L.Map.mergeOptions({
 editControl: true
 });*/
/**
 * @class L.EditToolbar
 * @aka EditToolbar
 */
L.EditToolbar = L.Toolbar.extend({
	statics: {
		TYPE: 'edit'
	},

	options: {
		edit: {
			selectedPathOptions: {
				dashArray: '10, 10',

				fill: true,
				fillColor: '#fe57a1',
				fillOpacity: 0.1,

				// Whether to user the existing layers color
				maintainColor: false
			}
		},
		remove: {},
		poly: null,
		featureGroup: null /* REQUIRED! TODO: perhaps if not set then all layers on the map are selectable? */
	},

	// @method intialize(): void
	initialize: function (options) {
		// Need to set this manually since null is an acceptable value here
		if (options.edit) {
			if (typeof options.edit.selectedPathOptions === 'undefined') {
				options.edit.selectedPathOptions = this.options.edit.selectedPathOptions;
			}
			options.edit.selectedPathOptions = L.extend({}, this.options.edit.selectedPathOptions, options.edit.selectedPathOptions);
		}

		if (options.remove) {
			options.remove = L.extend({}, this.options.remove, options.remove);
		}

		if (options.poly) {
			options.poly = L.extend({}, this.options.poly, options.poly);
		}

		this._toolbarClass = 'leaflet-draw-edit';
		L.Toolbar.prototype.initialize.call(this, options);

		this._selectedFeatureCount = 0;
	},

	// @method getModeHandlers(): object
	// Get mode handlers information
	getModeHandlers: function (map) {
		var featureGroup = this.options.featureGroup;
		return [
			{
				enabled: this.options.edit,
				handler: new L.EditToolbar.Edit(map, {
					featureGroup: featureGroup,
					selectedPathOptions: this.options.edit.selectedPathOptions,
					poly: this.options.poly
				}),
				title: L.drawLocal.edit.toolbar.buttons.edit
			},
			{
				enabled: this.options.remove,
				handler: new L.EditToolbar.Delete(map, {
					featureGroup: featureGroup
				}),
				title: L.drawLocal.edit.toolbar.buttons.remove
			}
		];
	},

	// @method getActions(): object
	// Get actions information
	getActions: function (handler) {
		var actions = [
			{
				title: L.drawLocal.edit.toolbar.actions.save.title,
				text: L.drawLocal.edit.toolbar.actions.save.text,
				callback: this._save,
				context: this
			},
			{
				title: L.drawLocal.edit.toolbar.actions.cancel.title,
				text: L.drawLocal.edit.toolbar.actions.cancel.text,
				callback: this.disable,
				context: this
			}
		];

		if (handler.removeAllLayers) {
			actions.push({
				title: L.drawLocal.edit.toolbar.actions.clearAll.title,
				text: L.drawLocal.edit.toolbar.actions.clearAll.text,
				callback: this._clearAllLayers,
				context: this
			});
		}

		return actions;
	},

	// @method addToolbar(map): L.DomUtil
	// Adds the toolbar to the map
	addToolbar: function (map) {
		var container = L.Toolbar.prototype.addToolbar.call(this, map);

		this._checkDisabled();

		this.options.featureGroup.on('layeradd layerremove', this._checkDisabled, this);

		return container;
	},

	// @method removeToolbar(): void
	// Removes the toolbar from the map
	removeToolbar: function () {
		this.options.featureGroup.off('layeradd layerremove', this._checkDisabled, this);

		L.Toolbar.prototype.removeToolbar.call(this);
	},

	// @method disable(): void
	// Disables the toolbar
	disable: function () {
		if (!this.enabled()) {
			return;
		}

		this._activeMode.handler.revertLayers();

		L.Toolbar.prototype.disable.call(this);
	},

	_save: function () {
		this._activeMode.handler.save();
		if (this._activeMode) {
			this._activeMode.handler.disable();
		}
	},

	_clearAllLayers: function () {
		this._activeMode.handler.removeAllLayers();
		if (this._activeMode) {
			this._activeMode.handler.disable();
		}
	},

	_checkDisabled: function () {
		var featureGroup = this.options.featureGroup,
			hasLayers = featureGroup.getLayers().length !== 0,
			button;

		if (this.options.edit) {
			button = this._modes[L.EditToolbar.Edit.TYPE].button;

			if (hasLayers) {
				L.DomUtil.removeClass(button, 'leaflet-disabled');
			} else {
				L.DomUtil.addClass(button, 'leaflet-disabled');
			}

			button.setAttribute(
				'title',
				hasLayers ?
					L.drawLocal.edit.toolbar.buttons.edit
					: L.drawLocal.edit.toolbar.buttons.editDisabled
			);
		}

		if (this.options.remove) {
			button = this._modes[L.EditToolbar.Delete.TYPE].button;

			if (hasLayers) {
				L.DomUtil.removeClass(button, 'leaflet-disabled');
			} else {
				L.DomUtil.addClass(button, 'leaflet-disabled');
			}

			button.setAttribute(
				'title',
				hasLayers ?
					L.drawLocal.edit.toolbar.buttons.remove
					: L.drawLocal.edit.toolbar.buttons.removeDisabled
			);
		}
	}
});



/**
 * @class L.EditToolbar.Edit
 * @aka EditToolbar.Edit
 */
L.EditToolbar.Edit = L.Handler.extend({
	statics: {
		TYPE: 'edit'
	},

	// @method intialize(): void
	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._featureGroup = options.featureGroup;

		if (!(this._featureGroup instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		this._uneditedLayerProps = {};

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Edit.TYPE;

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.EditToolbar.Edit.include(L.Evented.prototype);
		} else {
			L.EditToolbar.Edit.include(L.Mixin.Events);
		}
	},

	// @method enable(): void
	// Enable the edit toolbar
	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', {handler: this.type});
		//this disable other handlers

		this._map.fire(L.Draw.Event.EDITSTART, {handler: this.type});
		//allow drawLayer to be updated before beginning edition.

		L.Handler.prototype.enable.call(this);
		this._featureGroup
			.on('layeradd', this._enableLayerEdit, this)
			.on('layerremove', this._disableLayerEdit, this);
	},

	// @method disable(): void
	// Disable the edit toolbar
	disable: function () {
		if (!this._enabled) {
			return;
		}
		this._featureGroup
			.off('layeradd', this._enableLayerEdit, this)
			.off('layerremove', this._disableLayerEdit, this);
		L.Handler.prototype.disable.call(this);
		this._map.fire(L.Draw.Event.EDITSTOP, {handler: this.type});
		this.fire('disabled', {handler: this.type});
	},

	// @method addHooks(): void
	// Add listener hooks for this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._featureGroup.eachLayer(this._enableLayerEdit, this);

			this._tooltip = new L.Draw.Tooltip(this._map);
			this._tooltip.updateContent({
				text: L.drawLocal.edit.handlers.edit.tooltip.text,
				subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
			});

			// Quickly access the tooltip to update for intersection checking
			map._editTooltip = this._tooltip;

			this._updateTooltip();

			this._map
				.on('mousemove', this._onMouseMove, this)
				.on('touchmove', this._onMouseMove, this)
				.on('MSPointerMove', this._onMouseMove, this)
				.on(L.Draw.Event.EDITVERTEX, this._updateTooltip, this);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks for this handler
	removeHooks: function () {
		if (this._map) {
			// Clean up selected layers.
			this._featureGroup.eachLayer(this._disableLayerEdit, this);

			// Clear the backups of the original layers
			this._uneditedLayerProps = {};

			this._tooltip.dispose();
			this._tooltip = null;

			this._map
				.off('mousemove', this._onMouseMove, this)
				.off('touchmove', this._onMouseMove, this)
				.off('MSPointerMove', this._onMouseMove, this)
				.off(L.Draw.Event.EDITVERTEX, this._updateTooltip, this);
		}
	},

	// @method revertLayers(): void
	// Revert each layer's geometry changes
	revertLayers: function () {
		this._featureGroup.eachLayer(function (layer) {
			this._revertLayer(layer);
		}, this);
	},

	// @method save(): void
	// Save the layer geometries
	save: function () {
		var editedLayers = new L.LayerGroup();
		this._featureGroup.eachLayer(function (layer) {
			if (layer.edited) {
				editedLayers.addLayer(layer);
				layer.edited = false;
			}
		});
		this._map.fire(L.Draw.Event.EDITED, {layers: editedLayers});
	},

	_backupLayer: function (layer) {
		var id = L.Util.stamp(layer);

		if (!this._uneditedLayerProps[id]) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				this._uneditedLayerProps[id] = {
					latlngs: L.LatLngUtil.cloneLatLngs(layer.getLatLngs())
				};
			} else if (layer instanceof L.Circle) {
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng()),
					radius: layer.getRadius()
				};
			} else if (layer instanceof L.Marker || layer instanceof L.CircleMarker) { // Marker
				this._uneditedLayerProps[id] = {
					latlng: L.LatLngUtil.cloneLatLng(layer.getLatLng())
				};
			}
		}
	},

	_getTooltipText: function () {
		return ({
			text: L.drawLocal.edit.handlers.edit.tooltip.text,
			subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
		});
	},

	_updateTooltip: function () {
		this._tooltip.updateContent(this._getTooltipText());
	},

	_revertLayer: function (layer) {
		var id = L.Util.stamp(layer);
		layer.edited = false;
		if (this._uneditedLayerProps.hasOwnProperty(id)) {
			// Polyline, Polygon or Rectangle
			if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				layer.setLatLngs(this._uneditedLayerProps[id].latlngs);
			} else if (layer instanceof L.Circle) {
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
				layer.setRadius(this._uneditedLayerProps[id].radius);
			} else if (layer instanceof L.Marker || layer instanceof L.CircleMarker) { // Marker or CircleMarker
				layer.setLatLng(this._uneditedLayerProps[id].latlng);
			}

			layer.fire('revert-edited', {layer: layer});
		}
	},

	_enableLayerEdit: function (e) {
		var layer = e.layer || e.target || e,
			pathOptions, poly;

		// Back up this layer (if haven't before)
		this._backupLayer(layer);

		if (this.options.poly) {
			poly = L.Util.extend({}, this.options.poly);
			layer.options.poly = poly;
		}

		// Set different style for editing mode
		if (this.options.selectedPathOptions) {
			pathOptions = L.Util.extend({}, this.options.selectedPathOptions);

			// Use the existing color of the layer
			if (pathOptions.maintainColor) {
				pathOptions.color = layer.options.color;
				pathOptions.fillColor = layer.options.fillColor;
			}

			layer.options.original = L.extend({}, layer.options);
			layer.options.editing = pathOptions;

		}

		if (layer instanceof L.Marker) {
			if (layer.editing) {
				layer.editing.enable();
			}
			layer.dragging.enable();
			layer
				.on('dragend', this._onMarkerDragEnd)
				// #TODO: remove when leaflet finally fixes their draggable so it's touch friendly again.
				.on('touchmove', this._onTouchMove, this)
				.on('MSPointerMove', this._onTouchMove, this)
				.on('touchend', this._onMarkerDragEnd, this)
				.on('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.enable();
		}
	},

	_disableLayerEdit: function (e) {
		var layer = e.layer || e.target || e;

		layer.edited = false;
		if (layer.editing) {
			layer.editing.disable();
		}

		delete layer.options.editing;
		delete layer.options.original;
		// Reset layer styles to that of before select
		if (this._selectedPathOptions) {
			if (layer instanceof L.Marker) {
				this._toggleMarkerHighlight(layer);
			} else {
				// reset the layer style to what is was before being selected
				layer.setStyle(layer.options.previousOptions);
				// remove the cached options for the layer object
				delete layer.options.previousOptions;
			}
		}

		if (layer instanceof L.Marker) {
			layer.dragging.disable();
			layer
				.off('dragend', this._onMarkerDragEnd, this)
				.off('touchmove', this._onTouchMove, this)
				.off('MSPointerMove', this._onTouchMove, this)
				.off('touchend', this._onMarkerDragEnd, this)
				.off('MSPointerUp', this._onMarkerDragEnd, this);
		} else {
			layer.editing.disable();
		}
	},

	_onMouseMove: function (e) {
		this._tooltip.updatePosition(e.latlng);
	},

	_onMarkerDragEnd: function (e) {
		var layer = e.target;
		layer.edited = true;
		this._map.fire(L.Draw.Event.EDITMOVE, {layer: layer});
	},

	_onTouchMove: function (e) {
		var touchEvent = e.originalEvent.changedTouches[0],
			layerPoint = this._map.mouseEventToLayerPoint(touchEvent),
			latlng = this._map.layerPointToLatLng(layerPoint);
		e.target.setLatLng(latlng);
	},

	_hasAvailableLayers: function () {
		return this._featureGroup.getLayers().length !== 0;
	}
});



/**
 * @class L.EditToolbar.Delete
 * @aka EditToolbar.Delete
 */
L.EditToolbar.Delete = L.Handler.extend({
	statics: {
		TYPE: 'remove' // not delete as delete is reserved in js
	},

	// @method intialize(): void
	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.Util.setOptions(this, options);

		// Store the selectable layer group for ease of access
		this._deletableLayers = this.options.featureGroup;

		if (!(this._deletableLayers instanceof L.FeatureGroup)) {
			throw new Error('options.featureGroup must be a L.FeatureGroup');
		}

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Delete.TYPE;

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.EditToolbar.Delete.include(L.Evented.prototype);
		} else {
			L.EditToolbar.Delete.include(L.Mixin.Events);
		}

	},

	// @method enable(): void
	// Enable the delete toolbar
	enable: function () {
		if (this._enabled || !this._hasAvailableLayers()) {
			return;
		}
		this.fire('enabled', {handler: this.type});

		this._map.fire(L.Draw.Event.DELETESTART, {handler: this.type});

		L.Handler.prototype.enable.call(this);

		this._deletableLayers
			.on('layeradd', this._enableLayerDelete, this)
			.on('layerremove', this._disableLayerDelete, this);
	},

	// @method disable(): void
	// Disable the delete toolbar
	disable: function () {
		if (!this._enabled) {
			return;
		}

		this._deletableLayers
			.off('layeradd', this._enableLayerDelete, this)
			.off('layerremove', this._disableLayerDelete, this);

		L.Handler.prototype.disable.call(this);

		this._map.fire(L.Draw.Event.DELETESTOP, {handler: this.type});

		this.fire('disabled', {handler: this.type});
	},

	// @method addHooks(): void
	// Add listener hooks to this handler
	addHooks: function () {
		var map = this._map;

		if (map) {
			map.getContainer().focus();

			this._deletableLayers.eachLayer(this._enableLayerDelete, this);
			this._deletedLayers = new L.LayerGroup();

			this._tooltip = new L.Draw.Tooltip(this._map);
			this._tooltip.updateContent({text: L.drawLocal.edit.handlers.remove.tooltip.text});

			this._map.on('mousemove', this._onMouseMove, this);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler
	removeHooks: function () {
		if (this._map) {
			this._deletableLayers.eachLayer(this._disableLayerDelete, this);
			this._deletedLayers = null;

			this._tooltip.dispose();
			this._tooltip = null;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	// @method revertLayers(): void
	// Revert the deleted layers back to their prior state.
	revertLayers: function () {
		// Iterate of the deleted layers and add them back into the featureGroup
		this._deletedLayers.eachLayer(function (layer) {
			this._deletableLayers.addLayer(layer);
			layer.fire('revert-deleted', {layer: layer});
		}, this);
	},

	// @method save(): void
	// Save deleted layers
	save: function () {
		this._map.fire(L.Draw.Event.DELETED, {layers: this._deletedLayers});
	},

	// @method removeAllLayers(): void
	// Remove all delateable layers
	removeAllLayers: function () {
		// Iterate of the delateable layers and add remove them
		this._deletableLayers.eachLayer(function (layer) {
			this._removeLayer({layer: layer});
		}, this);
		this.save();
	},

	_enableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.on('click', this._removeLayer, this);
	},

	_disableLayerDelete: function (e) {
		var layer = e.layer || e.target || e;

		layer.off('click', this._removeLayer, this);

		// Remove from the deleted layers so we can't accidentally revert if the user presses cancel
		this._deletedLayers.removeLayer(layer);
	},

	_removeLayer: function (e) {
		var layer = e.layer || e.target || e;

		this._deletableLayers.removeLayer(layer);

		this._deletedLayers.addLayer(layer);

		layer.fire('deleted');
	},

	_onMouseMove: function (e) {
		this._tooltip.updatePosition(e.latlng);
	},

	_hasAvailableLayers: function () {
		return this._deletableLayers.getLayers().length !== 0;
	}
});



}(window, document));
//# sourceMappingURL=leaflet.draw-src.map

/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var geoportal_access_lib_src_Services_Alti_Alti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_draw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(105);
/* harmony import */ var leaflet_draw__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_draw__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_leaflet_draw_dist_leaflet_draw_src_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _node_modules_leaflet_draw_dist_leaflet_draw_src_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_leaflet_draw_dist_leaflet_draw_src_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Common_CSS_GPelevationPath_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony import */ var _Common_CSS_GPelevationPath_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GPelevationPath_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _CSS_Controls_ElevationPath_GPelevationPathLeaflet_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _CSS_Controls_ElevationPath_GPelevationPathLeaflet_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_CSS_Controls_ElevationPath_GPelevationPathLeaflet_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(34);
/* harmony import */ var _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(60);
/* harmony import */ var _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(36);
/* harmony import */ var _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(77);
/* harmony import */ var _Utils_IconDefault__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(78);
/* harmony import */ var _Common_Controls_ElevationPathDOM__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(122);
/* harmony import */ var _Common_Controls_ProfileElevationPathDOM__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(123);
/* globals AmCharts, d3 */















var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_8__["default"].getLogger("ElevationPath");
/**
 * @classdesc
 *
 * Leaflet Control Class to compute and display Profil Elevation.
 *
 * Use {@link module:Controls.ElevationPath L.geoportalControl.ElevationPath()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control" target="_blank">L.Control</a> native class.
 *
 * @namespace
 * @alias L.geoportalControl.ElevationPath
 */

var ElevationPath = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Control.extend(
/** @lends L.geoportalControl.ElevationPath.prototype */
{
  includes: _Common_Controls_ElevationPathDOM__WEBPACK_IMPORTED_MODULE_13__["default"],

  /**
   * Options du service
   *
   * @private
   */
  options: {
    position: "topleft",
    active: false,
    elevationPathOptions: {},
    stylesOptions: {},
    displayProfileOptions: {
      greaterSlope: true,
      meanSlope: true,
      ascendingElevation: true,
      descendingElevation: true,
      currentSlope: true,
      apply: null,
      target: null
    }
  },

  /**
   * @constructor ElevationPath
   *
   * @private
   * @param {Object} options - ElevationPath control options
   * @param {String}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
   * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
   * @param {Boolean} [options.active] - Specify if widget has to be actived to drawing (true) or not (false) on map loading. Default is false.
   * @param {Object} [options.elevationPathOptions = {}] - elevation service options. See {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getAltitude Gp.Services.getAltitude()} to know all elevation options
   * @param {Object} [options.displayProfileOptions = {}] - profile options.
   * @param {Function} [options.displayProfileOptions.apply] - function to display profil panel.
   * @param {Object} [options.displayProfileOptions.target] - container DOM for the profil panel.
   * @param {Boolean} [options.displayProfileOptions.greaterSlope = true] - display the greater slope into the graph
   * @param {Boolean} [options.displayProfileOptions.meanSlope = true] -  display the mean slope into the graph
   * @param {Boolean} [options.displayProfileOptions.ascendingElevation = true] -  display the ascending elevation into the graph
   * @param {Boolean} [options.displayProfileOptions.descendingElevation = true] -  display the descending elevation into the graph
   * @param {Boolean} [options.displayProfileOptions.currentSlope = true] -  display current slope value on profile mouseover
   *
   * @example
   *  var e = L.geoportalControl.ElevationPath({
   *      active : false,
   *      stylesOptions : {},
   *      elevationPathOptions : {},
   *      displayProfileOptions : {
   *       apply : null,
   *       target : null
   *      }
   *  });
   * Exemples :
   * - displayProfileOptions.apply : null
   * - displayProfileOptions.apply : function (elevations, container, context) {  // do some stuff... }
   * - displayProfileOptions.apply : ol.control.ElevationPath.DISPLAY_PROFILE_{LIB_AMCHARTS | LIB_D3 | RAW}
   * (detect auto lib. : d3 / AmCharts)
   */
  initialize: function initialize(options) {
    // on transmet les options au controle
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.setOptions(this, options); // uuid

    this._uid = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_10__["default"].generate(); // initialisation

    this._initDisplayProfileOptions(); // les container


    this._showContainer = null;
    this._pictoContainer = null;
    this._panelContainer = null;
    this._profilContainer = null;
    this._waitingContainer = null;
    this._infoContainer = null; // timer sur la fenetre d'informations des données

    this._timerHdlr = null; // detection si le panneau est reduit

    this._reducePanel = false; // couche vectorielle dans laquelle seront saisis les points (features ci-dessus)

    this._featuresLayer = null;
    this._lastIdLayer = 0;
    this._currentIdLayer = 0;
    this._currentFeature = null; // graph

    this._profile = null;
    this._marker = null; // geometry à transmettre au service :  { lon : [], lat : []}

    this._geometry = null; // distance du segment

    this._distance = 0; // data elevations

    this._data = {}; // aucun droits sur les ressources

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
   * @private
   */
  onAdd: function onAdd(map) {
    // initialisation du DOM du composant
    var container = this._container = this._initLayout();

    if (map) {
      // lors de l'ajout à la map, on active la saisie du point,
      // mais seulement si le widget est ouvert
      if (this.options.active) {
        if (this._profile === null) {
          this._panelContainer.style.display = "none"; // this._panelContainer.style.visibility = "hidden";
        }

        this._activateMapInteraction(map);
      }
    } // deactivate of events that may interfere with the map


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
  // ########################## init resources ######################### //
  // ################################################################### //

  /**
   * this method is called by constructor
   * and check the rights to resources
   *
   * @private
   */
  _checkRightsManagement: function _checkRightsManagement() {
    var rightManagement = _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_9__["default"].check({
      key: this.options.apiKey,
      resources: ["SERVICE_CALCUL_ALTIMETRIQUE_RSC"],
      services: ["ElevationLine"]
    });

    if (!rightManagement) {
      this._noRightManagement = true;
    } // on recupère les informations utiles
    // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
    // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
    // été renseignée.


    if (!this.options.apiKey) {
      this.options.apiKey = rightManagement.key;
    }
  },
  // ################################################################### //
  // ####################### init application ########################## //
  // ################################################################### //

  /**
   * this method is called by the constructor and initialize the ...
   *
   * @private
   */
  _initDisplayProfileOptions: function _initDisplayProfileOptions() {
    // gestion de l'affichage du profil
    var _profileOpts = this.options.displayProfileOptions; // gestion de la fonction du profil

    var displayFunction = _profileOpts.apply;
    _profileOpts.apply = typeof displayFunction === "function" ? displayFunction : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT; // gestion du container du profil

    var displayContainer = _profileOpts.target;
    _profileOpts.target = typeof displayContainer !== "undefined" ? displayContainer : null; // les autres options

    var _protoOpts = Object.getPrototypeOf(this.options);

    if (typeof _profileOpts.meanSlope === "undefined") {
      _profileOpts.meanSlope = _protoOpts.displayProfileOptions.meanSlope;
    }

    if (typeof _profileOpts.greaterSlope === "undefined") {
      _profileOpts.greaterSlope = _protoOpts.displayProfileOptions.greaterSlope;
    }

    if (typeof _profileOpts.ascendingElevation === "undefined") {
      _profileOpts.ascendingElevation = _protoOpts.displayProfileOptions.ascendingElevation;
    }

    if (typeof _profileOpts.descendingElevation === "undefined") {
      _profileOpts.descendingElevation = _protoOpts.displayProfileOptions.descendingElevation;
    }

    if (typeof _profileOpts.currentSlope === "undefined") {
      _profileOpts.currentSlope = _protoOpts.displayProfileOptions.currentSlope;
    }
  },
  // ################################################################### //
  // ########################### init dom ############################## //
  // ################################################################### //

  /**
   * this method is called by this.onAdd(map)
   * and initialize the container HTMLElement
   *
   * @returns {DOMElement} DOM element
   * @private
   */
  _initLayout: function _initLayout() {
    // create main container
    var container = this._createMainContainerElement();

    var inputShow = this._showContainer = this._createShowElevationPathElement();

    container.appendChild(inputShow); // mode "collapsed"

    if (this.options.active) {
      this._showContainer.checked = true;
    }

    var picto = this._pictoContainer = this._createShowElevationPathPictoElement();

    container.appendChild(picto); // panneau

    var panel = this._panelContainer = this._createElevationPathPanelElement(); // header


    var header = this._createElevationPathPanelHeaderElement();

    panel.appendChild(header); // profil

    var profil = this._profilContainer = this._createElevationPathPanelProfilElement();

    panel.appendChild(profil); // waiting

    var waiting = this._waitingContainer = this._createElevationPathWaitingElement();

    panel.appendChild(waiting); // info

    var info = this._infoContainer = this._createElevationPathInformationsElement();

    panel.appendChild(info);
    container.appendChild(panel);
    return container;
  },
  // ################################################################### //
  // ####################### handlers events to dom #################### //
  // ################################################################### //

  /**
   * this method is called by event 'click' on '' picto
   * and ...
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onShowElevationPathClick: function onShowElevationPathClick(e) {
    logger.trace(e);
    var map = this._map; // interactions avec la carte

    if (!this._reducePanel) {
      if (this._showContainer.checked) {
        this._pictoContainer.style.display = "block";
        this._panelContainer.style.display = "none";

        this._removeMapInteraction(map);

        this._clear();
      } else {
        if (this._profile === null) {
          this._panelContainer.style.display = "none";
        }

        this._activateMapInteraction(map);
      }
    } else {
      if (this._profile !== null) {
        if (this.options.displayProfileOptions.target === null) {
          this._pictoContainer.style.display = "none";
        }

        this._panelContainer.style.display = "block";
      }
    }

    this._reducePanel = false;
  },

  /**
   * this method is called by event 'click' on '' picto
   * (cf. this.),
   * and reduce the panel
   *
   * @private
   */
  onReduceElevationPathPanelClick: function onReduceElevationPathPanelClick() {
    this._reducePanel = true;
    this._pictoContainer.style.display = "block";
    this._panelContainer.style.display = "none";
  },

  /**
   * this method is called by event 'click' on '' picto
   * (cf. this.),
   * and display the panel info
   * TODO
   *
   * @private
   */
  onOpenElevationPathInfoClick: function onOpenElevationPathInfoClick() {
    // options d'affichage
    var meanSlope = this.options.displayProfileOptions.meanSlope;
    var greaterSlope = this.options.displayProfileOptions.greaterSlope;
    var ascendingElevation = this.options.displayProfileOptions.ascendingElevation;
    var descendingElevation = this.options.displayProfileOptions.descendingElevation; // clean

    var div = this._infoContainer;

    if (div.childElementCount) {
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    } // creation des infomations


    if (ascendingElevation) {
      this._addElevationPathInformationsItem("Dénivelé positif : " + this._data.ascendingElevation.toLocaleString() + " m");
    }

    if (descendingElevation) {
      this._addElevationPathInformationsItem("Dénivelé négatif : " + this._data.descendingElevation.toLocaleString() + " m");
    }

    if (meanSlope) {
      this._addElevationPathInformationsItem("Pente moyenne : " + this._data.meanSlope.toLocaleString() + " %");
    }

    if (greaterSlope) {
      this._addElevationPathInformationsItem("Plus forte pente : " + this._data.greaterSlope.toLocaleString() + " %");
    } // show des informations !


    if (div.className === "GPelevationPathInformationsContainerVisible") {
      clearTimeout(this._timerHdlr);
      div.className = "GPelevationPathInformationsContainerHidden";
    } else {
      div.className = "GPelevationPathInformationsContainerVisible";
    } // hidden des informations !


    this._timerHdlr = setTimeout(function () {
      div.className = "GPelevationPathInformationsContainerHidden";
    }, 4000);
  },
  // ################################################################### //
  // ################### Map interactions management ################### //
  // ################################################################### //

  /**
   * this method is called by this.onShowElevationPathClick,
   * and calls method corresponding to current delimitation, if widget is not collapsed.
   *
   * @param {Object} map - control map.
   * @private
   */
  _activateMapInteraction: function _activateMapInteraction(map) {
    logger.info("_activateMapInteraction()"); // Creation de la couche vectorielle sur laquelle on va dessiner

    if (this._featuresLayer === null) {
      this._featuresLayer = new leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.FeatureGroup();
      map.addLayer(this._featuresLayer);
      var self = this;
      /* evenements : on desactive le menu systeme pour la saisie */

      map.on("contextmenu", function () {});
      /* evenement sur la carte lors d'une saisie,
      on y ajoute le layer, et on y stocke les coordonnées */

      map.on("draw:created", function (e) {
        logger.trace("draw:created");
        self._currentIdLayer = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.stamp(e.layer);

        self._getFeatureGeometry(e.layer);

        self._addFeatureLayer(e.layer);
      });
      /* evenements */

      map.on("draw:drawstart", function () {
        logger.trace("draw:drawstart");

        self._removeFeatureLayer(self._lastIdLayer);

        self._lastIdLayer = self._currentIdLayer;
      });
      /* evenements */

      map.on("draw:drawstop", function () {
        logger.trace("draw:drawstop");

        if (typeof self.options.elevationPathOptions.onSuccess === "undefined" && self.options.displayProfileOptions.target === null) {
          self._pictoContainer.style.display = "none";
          self._panelContainer.style.display = "block";
        }

        self._altiRequest();
      });
    }

    this._activatePolyLineInteraction(map);
  },

  /**
   * remove draw interaction from map (if exists)
   *
   * @param {Object} map - control map.
   * @private
   */
  _removeMapInteraction: function _removeMapInteraction(map) {
    if (!map) {
      return;
    }

    if (this._featuresLayer !== null) {
      map.off("draw:created");
      map.off("draw:drawstart");
      map.off("draw:drawstop");
      map.removeLayer(this._featuresLayer);
      this._featuresLayer = null;
    }

    this._lastIdLayer = this._currentIdLayer = 0; // FIXME delete this._currentFeature ?

    if (this._currentFeature) {
      this._currentFeature.disable();
    }
  },

  /**
   * this method is called by this._activateMapInteraction,
   * and creates map polyline drawing interaction.
   *
   * @param {Object} map - control map.
   * @private
   */
  _activatePolyLineInteraction: function _activatePolyLineInteraction(map) {
    if (this._currentFeature) {
      this._currentFeature.disable();
    } // liste des options par defaut
    // cf. https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
    // var polylineOptions = {
    //     allowIntersection : true,
    //     repeatMode : false,
    //     drawError : {
    //         color : "#b00b00",
    //         timeout : 2500
    //     },
    //     icon : new L.DivIcon({
    //         iconSize : new L.Point(8, 8),
    //         className : 'leaflet-div-icon leaflet-editing-icon'
    //     }),
    //     touchIcon : new L.DivIcon({
    //         iconSize : new L.Point(20, 20),
    //         className : 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
    //     }),
    //     guidelineDistance : 20,
    //     maxGuideLineLength : 4000,
    //     shapeOptions : {
    //         stroke : true,
    //         color : '#f06eaa',
    //         weight : 4,
    //         opacity : 0.5,
    //         fill : false,
    //         clickable : true
    //     },
    //     metric : true, // Whether to use the metric measurement system or imperial
    //     feet : true, // When not metric, to use feet instead of yards for display.
    //     nautic : false, // When not metric, not feet use nautic mile for display
    //     showLength : true, // Whether to display distance in the tooltip
    //     zIndexOffset : 2000 // This should be > than the highest z-index any map layersallowIntersection : true,
    // };


    var styles = this.options.stylesOptions || {};

    var _shapeOptions = Object.keys(styles).length !== 0 ? styles : {
      stroke: true,
      color: "#C77A04",
      weight: 4,
      opacity: 0.5,
      fill: false
    };

    this._currentFeature = new leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Draw.Polyline(map, {
      shapeOptions: _shapeOptions
    });

    this._currentFeature.enable();
  },

  /**
   * set current position of feature
   *
   * @param {Object} layer - layer
   * @private
   */
  _getFeatureGeometry: function _getFeatureGeometry(layer) {
    // on transmet toujours des coordonnées au service en EPSG:4326
    logger.log(layer.getLatLngs());

    if (this._geometry !== null) {
      this._geometry = null;
    }

    this._geometry = [];
    this._distance = 0;
    var geometry = layer.getLatLngs();

    for (var i = 0; i < geometry.length; i++) {
      // on transmet au service des coordonnées en EPSG:4326
      var LatLngI = geometry[i];
      var LatLngJ = geometry[i + 1];

      this._geometry.push({
        lon: LatLngI.lng,
        lat: LatLngI.lat
      }); // on calcul la distance du segment


      if (LatLngJ) {
        this._distance += LatLngI.distanceTo(LatLngJ);
      }
    }

    logger.log("Geometry", this._geometry);
    logger.log("Distance", this._distance);
  },

  /**
   * set current layer of feature
   *
   * @param {Object} layer - layer
   * @private
   */
  _addFeatureLayer: function _addFeatureLayer(layer) {
    if (!this._featuresLayer) {
      return;
    }

    this._featuresLayer.addLayer(layer);
  },

  /**
   * remove layer feature from group
   *
   * @param {Integer} id - id
   * @private
   */
  _removeFeatureLayer: function _removeFeatureLayer(id) {
    if (!this._featuresLayer) {
      return;
    }

    if (id === 0) {
      return;
    }

    if (!id) {
      this._featuresLayer.clearLayers();
    } else {
      this._featuresLayer.removeLayer(id);
    }
  },
  // ################################################################### //
  // ############################ Alti request ######################### //
  // ################################################################### //

  /**
   * this methode is called by this. method,
   * it generates and sends alti request, then displays results
   *
   * @private
   */
  _altiRequest: function _altiRequest() {
    logger.log("_altiRequest"); // les coordonnées sont obligatoires

    if (!this._geometry) {
      logger.log("missing position");
      return;
    } // oups, aucun droits !


    if (this._noRightManagement) {
      return;
    } // on construit les options pour la requête


    var options = {}; // on surcharge avec les options de l'utilisateur

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, this.options.elevationPathOptions); // au cas où la clef API n'est pas renseignée dans les options du service,
    // on utilise celle de l'autoconf ou celle renseignée au niveau du controle

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      apiKey: options.apiKey || this.options.apiKey
    }); // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
    // true par défaut (https)

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      ssl: this.options.ssl
    }); // le sampling est soit defini par l'utilisateur (opts),
    // ou soit calculé dynamiquement...

    var _sampling = options.sampling;

    if (!_sampling) {
      // computing sampling
      var _computeSampling;

      var _length = this._currentFeature._measurementRunningTotal; // FIXME !!!

      logger.trace("length", _length);
      var p = Math.floor(_length) / 5; // en mètre sur un pas moyen de 5m !

      if (p >= 200) {
        _computeSampling = 200;
      } else {
        _computeSampling = Math.floor(p);
      }

      _sampling = _computeSampling;
    } // on y ajoute les callbacks ainsi que les options par defaut


    var self = this;
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      /** sampling à 200 (iso portail) */
      sampling: _sampling,
      // callback onSuccess
      onSuccess: this.options.elevationPathOptions.onSuccess || function (result) {
        logger.log(result);

        if (result) {
          if (self.options.displayProfileOptions.target !== null) {
            self._pictoContainer.style.display = "block";
            self._panelContainer.style.display = "block";
          }

          self._displayProfil(result.elevations);

          self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
          self._waiting = false;
        }
      },
      // callback onFailure
      onFailure: this.options.elevationPathOptions.onFailure || function (error) {
        logger.log(error.message);
        self._pictoContainer.style.display = "block";
        self._panelContainer.style.display = "none";
        self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
        self._waiting = false;

        self._clear();
      }
    }); // et enfin, la geometrie

    var positions = this._geometry;
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      positions: positions
    });
    logger.log(options); // mise en place de la patience

    this._waitingContainer.className = "GPelevationPathCalcWaitingContainerVisible"; // Request altitude service

    var altiService = new geoportal_access_lib_src_Services_Alti_Alti__WEBPACK_IMPORTED_MODULE_0__["default"](options);
    altiService.call();
  },
  // ################################################################### //
  // ########################## Profil display ######################### //
  // ################################################################### //

  /**
   * this method computes results elevations (Z and distance)
   *
   * @param {Array} elevations - array of elevation
   * @return {Array} elevations
   * @private
   */
  _computeElevationMeasure: function _computeElevationMeasure(elevations) {
    // Returns the distance from c1 to c2 using the haversine formula
    var _haversineDistance = function _haversineDistance(c1, c2) {
      var lat1 = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalToRadian(c1[1]);
      var lat2 = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalToRadian(c2[1]);
      var deltaLatBy2 = (lat2 - lat1) / 2;
      var deltaLonBy2 = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalToRadian(c2[0] - c1[0]) / 2;
      var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
      return 2 * 6378137 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    var _data = elevations;
    var _unit = "m";
    var _sketchPoints = this._geometry; // section actuelle du sketch sur laquelle on est

    var _currentSection = 0; // longueur cumulée des sections précédentes

    var _previousSectionsLength = 0;
    var _nextSectionBegining = _sketchPoints[1]; // Calcul de la distance au départ pour chaque point + arrondi des lat/lon

    _data[0].dist = 0;
    _data[0].slope = 0;
    _data[0].lat = Math.round(_data[0].lat * 10000) / 10000;
    _data[0].lon = Math.round(_data[0].lon * 10000) / 10000;
    var _distanceMinus = 0;
    var _distancePlus = 0;
    var _ascendingElevation = 0;
    var _descendingElevation = 0;
    var _distance = 0;
    var _slopes = 0;
    var distances = [];

    for (var i = 1; i < _data.length; i++) {
      var a = [_data[i].lon, _data[i].lat];

      var distanceToStart = _previousSectionsLength + _haversineDistance(a, [_sketchPoints[_currentSection].lon, _sketchPoints[_currentSection].lat]);

      var dist = distanceToStart - _distance; // Changement de section

      if (a[0].toFixed(8) === _nextSectionBegining.lon.toFixed(8) && a[1].toFixed(8) === _nextSectionBegining.lat.toFixed(8)) {
        _currentSection++;
        _previousSectionsLength = distanceToStart; // Pas de next section si on est sur le dernier point

        if (i !== _data.length - 1) {
          _nextSectionBegining = _sketchPoints[_currentSection + 1];
        }
      }

      var za = _data[i].z;
      var zb = _data[i - 1].z;

      if (za < 0) {
        za = 0;
      }

      if (zb < 0) {
        zb = 0;
      }

      var slope = za - zb;

      if (slope < 0) {
        _distanceMinus += dist;
        _descendingElevation += slope;
      } else if (slope > 0) {
        _distancePlus += dist;
        _ascendingElevation += slope;
      }

      _distance = distanceToStart;
      _data[i].dist = distanceToStart;
      distances.push(distanceToStart);
      _slopes += slope ? Math.abs(Math.round(slope / dist * 100)) : 0;
      _data[i].slope = slope ? Math.abs(Math.round(slope / dist * 100)) : 0; // EVOL ?
      // cf. gradiant
      // http://www.color-hex.com/color/00b798

      var value = _data[i].slope;

      if (value > 15 && value < 30) {
        _data[i].color = "#005b4c";
      } else if (value > 30 && value < 45) {
        _data[i].color = "#00362d";
      } else if (value > 45) {
        _data[i].color = "#00120f";
      } else {
        _data[i].color = "#00B798";
      }

      _data[i].lat = Math.round(_data[i].lat * 10000) / 10000;
      _data[i].lon = Math.round(_data[i].lon * 10000) / 10000;
    } // check distance totale


    logger.trace("List Distances", distances); // Correction des altitudes aberrantes + arrondi des calculs de distance + ...

    var _altMin = _data[0].z;
    var _altMax = _data[0].z;
    var _greaterSlope = _data[0].slope;

    for (var ji = 0; ji < _data.length; ji++) {
      var d = _data[ji];

      if (d.z < -100) {
        d.z = 0;
      }

      if (d.z > _altMax) {
        _altMax = d.z;
      }

      if (d.z < _altMin) {
        _altMin = d.z;
      }

      if (d.slope > _greaterSlope) {
        _greaterSlope = d.slope;
      }
    }

    return {
      greaterSlope: _greaterSlope,
      // pente max
      meanSlope: Math.round(_slopes / _data.length),
      // pente moyenne
      distancePlus: _distancePlus,
      // distance cumulée positive
      distanceMinus: _distanceMinus,
      // distance cumulée négative
      ascendingElevation: _ascendingElevation,
      // dénivelé cumulée positive
      descendingElevation: _descendingElevation,
      // dénivelé cumulée négative
      altMin: _altMin.toLocaleString(),
      // altitude min TODO: inutile ?
      altMax: _altMax.toLocaleString(),
      // altitude max TODO: inutile ?
      distance: this._distance,
      // distance totale
      unit: _unit,
      // unité des mesures de distance
      points: _data
    };
  },

  /**
   * this method is called by this. (in case of success)
   * and display results
   *
   * @param {Array} elevations - array of elevation
   * @private
   */
  _displayProfil: function _displayProfil(elevations) {
    // on reactive le menu systeme en fin de saisie !
    var map = this._map;
    map.off("contextmenu"); // data

    if (this._data) {
      this._data = {};
    } // sauvegarde des données


    var data = this._data = this._computeElevationMeasure(elevations); // container


    var container = this.options.displayProfileOptions.target;

    if (container) {
      container.appendChild(this._panelContainer);
    }

    container = this._profilContainer; // TODO contexte ?

    var context = this;
    var _profileOpts = this.options.displayProfileOptions; // fonction

    var displayFunction = _profileOpts.apply; // Calcul du profil

    if (typeof AmCharts !== "undefined" && typeof d3 !== "undefined") {
      logger.trace("Aucune lib. n'est presente !");
    } // execution...


    displayFunction.call(this, data, container, context); // affichage des informations du profil ?

    var element = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GPelevationPathPanelInfo-" + this._uid);

    if (_profileOpts.greaterSlope || _profileOpts.meanSlope || _profileOpts.ascendingElevation || _profileOpts.descendingElevation) {
      // on affiche les informations
      element.style.display = "block";
    }
  },
  // ################################################################### //
  // ################################ clean ############################ //
  // ################################################################### //

  /**
   * this method clears all data
   *
   * @private
   */
  _clear: function _clear() {
    this._geometry = null;
    this._profile = null; // on vide le container

    if (this._profilContainer) {
      while (this._profilContainer.firstChild) {
        this._profilContainer.removeChild(this._profilContainer.firstChild);
      }
    } // on supprime le marker


    var map = this._map;

    if (this._marker) {
      map.removeLayer(this._marker);
      this._marker = null;
    }
  }
});
/**
 * create Profile Marker
 *
 * @param {Object} context - context
 * @param {Object} data - data
 */

ElevationPath.__createProfileMarker = function (context, data) {
  logger.log("__createProfileMarker");
  var self = context;
  var map = self._map; // var _srs    = L.CRS.EPSG4326;
  // var _pointA = _srs.latLngToPoint(L.latLng(self._geometry[0].lat, self._geometry[0].lon));
  // var _pointB = _srs.latLngToPoint(L.latLng(self._geometry[self._geometry.length - 1].lat, self._geometry[self._geometry.length - 1].lon));
  // var _point  = L.LineUtil.closestPointOnSegment(_srs.latLngToPoint(L.latLng(data.lat, data.lon)), _pointA, _pointB );
  // creation d"un marker

  self._marker = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.marker(leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.latLng(data), {
    icon: new _Utils_IconDefault__WEBPACK_IMPORTED_MODULE_12__["default"]("orange"),
    draggable: false,
    clickable: false,
    zIndexOffset: 1000
  });

  self._marker.addTo(map);
};
/**
 * update Profile Marker
 *
 * @param {Object} context - context
 * @param {Object} data - data
 */


ElevationPath.__updateProfileMarker = function (context, data) {
  logger.log("__updateProfileMarker");
  var self = context;
  var map = self._map; // var _srs    = L.CRS.EPSG4326;
  // var _pointA = _srs.latLngToPoint(L.latLng(self._geometry[0].lat, self._geometry[0].lon));
  // var _pointB = _srs.latLngToPoint(L.latLng(self._geometry[self._geometry.length - 1].lat, self._geometry[self._geometry.length - 1].lon));
  // var _point  = L.LineUtil.closestPointOnSegment( _srs.latLngToPoint(L.latLng(data.lat, data.lon)), _pointA, _pointB );

  if (self._marker) {
    self._marker.setLatLng(leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.latLng(data));

    self._marker.update();
  } else {
    // creation d"un marker
    self._marker = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.marker(leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.latLng(data), {
      icon: new _Utils_IconDefault__WEBPACK_IMPORTED_MODULE_12__["default"]("orange"),
      draggable: false,
      clickable: false,
      zIndexOffset: 1000
    });

    self._marker.addTo(map);
  }
};
/**
 * remove Profile Marker
 *
 * @param {Object} context - context
 */


ElevationPath.__removeProfileMarker = function (context) {
  logger.log("__removeProfileMarker");
  var self = context;
  var map = self._map;

  if (self._marker) {
    map.removeLayer(self._marker);
    self._marker = null;
  }
};
/**
 * custom operation into raw profil...
 * TODO
 */


ElevationPath.__customRawProfileOperation = function () {
  logger.log("__customRawProfileOperation");
};
/**
 * custom operation into raw profil...
 * TODO
 *
 * @param {Object} context - context
 * @param {Object} e - event
 */


ElevationPath.__customRawProfileMouseOverEvent = function (context, e) {
  logger.log("__customRawProfileMouseOverEvent", context, e);
};
/**
 * Display Profile function used by default : no additonal framework needed.
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */


ElevationPath.DISPLAY_PROFILE_BY_DEFAULT = function (data, container, context) {
  logger.trace("ElevationPath.DISPLAY_PROFILE_BY_DEFAULT");
  var profile = _Common_Controls_ProfileElevationPathDOM__WEBPACK_IMPORTED_MODULE_14__["default"].displayProfileByDefault(data, container, context, ElevationPath); // on sauvegarde le profil du container dans l'objet

  if (profile) {
    this._profile = profile;
  }
};
/**
 * Display Profile without graphical rendering (raw service response)
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */


ElevationPath.DISPLAY_PROFILE_RAW = function (data, container, context) {
  logger.trace("ElevationPath.DISPLAY_PROFILE_RAW");
  var profile = _Common_Controls_ProfileElevationPathDOM__WEBPACK_IMPORTED_MODULE_14__["default"].displayProfileRaw(data, container, context, ElevationPath); // on sauvegarde le profil du container dans l'objet

  if (profile) {
    this._profile = profile;
  }
};
/**
 * Display Profile using D3 javascript framework. This method needs D3 libraries to be loaded.
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */


ElevationPath.DISPLAY_PROFILE_LIB_D3 = function (data, container, context) {
  logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_D3");

  if (typeof d3 === "undefined") {
    logger.log("Lib. D3 is not loaded !");
    return;
  }

  var profile = _Common_Controls_ProfileElevationPathDOM__WEBPACK_IMPORTED_MODULE_14__["default"].displayProfileLibD3(data, container, context, ElevationPath); // on sauvegarde le profil du container dans l'objet

  if (profile) {
    this._profile = profile;
  }
};
/**
 * Display Profile using Amcharts framework. This method needs AmCharts libraries to be loaded.
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */


ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS = function (data, container, context) {
  logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS"); // Calcul du profile

  if (typeof AmCharts === "undefined") {
    logger.log("Lib. AmCharts is not loaded !");
    return;
  }

  var profile = _Common_Controls_ProfileElevationPathDOM__WEBPACK_IMPORTED_MODULE_14__["default"].displayProfileLibAmCharts(data, container, context, ElevationPath); // on sauvegarde le profil du container dans l'objet

  if (profile) {
    this._profile = profile;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ElevationPath); // Expose Isocurve as L.geoportalControl.ElevationPath (for a build bundle)

if (window.L) {
  if (!window.L.geoportalControl) {
    window.L.geoportalControl = {};
  }

  window.L.geoportalControl.ElevationPath = ElevationPath;
}

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ElevationPathDOM = {
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
    container.id = this._addUID("GPelevationPath");
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
  _createShowElevationPathElement: function _createShowElevationPathElement() {
    var input = document.createElement("input");
    input.id = this._addUID("GPshowElevationPath");
    input.type = "checkbox";
    return input;
  },

  /**
   * Show control
   * see event !
   *
   * @returns {DOMElement} DOM element
   */
  _createShowElevationPathPictoElement: function _createShowElevationPathPictoElement() {
    // contexte d'execution
    var context = this;
    var label = document.createElement("label");
    label.id = this._addUID("GPshowElevationPathPicto");
    label.className = "GPshowAdvancedToolPicto";
    label.htmlFor = this._addUID("GPshowElevationPath");
    label.title = "Calculer un profil"; // gestionnaire d'evenement :
    // on ouvre le menu de saisie de saisie
    // L'ouverture/Fermeture permet de faire le menage
    // (reinitialisation)

    if (label.addEventListener) {
      label.addEventListener("click", function (e) {
        context.onShowElevationPathClick(e);
      });
    } else if (label.attachEvent) {
      label.attachEvent("onclick", function (e) {
        context.onShowElevationPathClick(e);
      });
    }

    var spanOpen = document.createElement("span");
    spanOpen.id = this._addUID("GPshowElevationPathOpen");
    spanOpen.className = "GPshowAdvancedToolOpen";
    label.appendChild(spanOpen);
    return label;
  },
  // ################################################################### //
  // ######################### Methods to Panel ######################## //
  // ################################################################### //

  /**
   * Create Container Panel
   *
   * FIXME
   * don't call this._createElevationPathPanelHeaderElement
   * don't call this._createElevationPathPanelProfilElement
   *
   * @returns {DOMElement} DOM element
   */
  _createElevationPathPanelElement: function _createElevationPathPanelElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GPelevationPathPanel");
    div.className = "GPpanel"; // div.appendChild(this._createElevationPathPanelHeaderElement());
    // div.appendChild(this._createElevationPathPanelProfilElement());

    return div;
  },

  /**
   * Create Header Panel
   *
   * @returns {DOMElement} DOM element
   */
  _createElevationPathPanelHeaderElement: function _createElevationPathPanelHeaderElement() {
    var self = this;
    var container = document.createElement("div");
    container.className = "GPpanelHeader";
    var divInfo = document.createElement("div");
    divInfo.id = this._addUID("GPelevationPathPanelInfo");
    divInfo.className = "GPpanelInfo";
    divInfo.title = "Informations"; // add event on click

    if (divInfo.addEventListener) {
      divInfo.addEventListener("click", function () {
        self.onOpenElevationPathInfoClick();
      });
    } else if (divInfo.attachEvent) {
      // internet explorer
      divInfo.attachEvent("onclick", function () {
        self.onOpenElevationPathInfoClick();
      });
    }

    container.appendChild(divInfo);
    var divTitle = document.createElement("div");
    divTitle.className = "GPpanelTitle";
    divTitle.innerHTML = "Profil Altimétrique";
    container.appendChild(divTitle);
    var divReduce = document.createElement("div");
    divReduce.id = this._addUID("GPelevationPathPanelReduce");
    divReduce.className = "GPpanelReduce";
    divReduce.title = "Masquer le panneau";

    if (divReduce.addEventListener) {
      divReduce.addEventListener("click", function () {
        if (typeof self.onReduceElevationPathPanelClick === "function") {
          document.getElementById(self._addUID("GPshowElevationPath")).checked = false;
          self.onReduceElevationPathPanelClick();
        }
      }, false);
    } else if (divReduce.attachEvent) {
      divReduce.attachEvent("onclick", function () {
        if (typeof self.onReduceElevationPathPanelClick === "function") {
          document.getElementById(self._addUID("GPshowElevationPath")).checked = false;
          self.onReduceElevationPathPanelClick();
        }
      });
    }

    container.appendChild(divReduce);
    var divClose = document.createElement("div");
    divClose.id = this._addUID("GPelevationPathPanelClose");
    divClose.className = "GPpanelClose";
    divClose.title = "Fermer le panneau"; // Link panel close / visibility checkbox

    if (divClose.addEventListener) {
      divClose.addEventListener("click", function () {
        document.getElementById(self._addUID("GPshowElevationPathPicto")).click();
      }, false);
    } else if (divClose.attachEvent) {
      divClose.attachEvent("onclick", function () {
        document.getElementById(self._addUID("GPshowElevationPathPicto")).click();
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
  _createElevationPathPanelProfilElement: function _createElevationPathPanelProfilElement() {
    var div = document.createElement("div");
    div.id = "GPelevationPathProfil";
    return div;
  },

  /**
   * Create Waiting Panel
   *
   * @returns {DOMElement} DOM element
   */
  _createElevationPathWaitingElement: function _createElevationPathWaitingElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GPelevationPathCalcWaitingContainer");
    div.className = "GPelevationPathCalcWaitingContainerHidden";
    var p = document.createElement("p");
    p.className = "GPelevationPathCalcWaiting";
    p.innerHTML = "Calcul en cours...";
    div.appendChild(p);
    return div;
  },

  /**
   * Create information Panel
   *
   * @returns {DOMElement} DOM element
   */
  _createElevationPathInformationsElement: function _createElevationPathInformationsElement() {
    var div = document.createElement("div");
    div.id = this._addUID("GPelevationPathInformationsContainer");
    div.className = "GPelevationPathInformationsContainerHidden";
    var p = document.createElement("p");
    p.className = "GPelevationPathInformations";
    p.innerHTML = "Aucune information...";
    div.appendChild(p);
    return div;
  },

  /**
   * Add a information into Panel
   *
   * @param {String} value - value of item
   * @returns {DOMElement} DOM element
   */
  _addElevationPathInformationsItem: function _addElevationPathInformationsItem(value) {
    var div = document.getElementById(this._addUID("GPelevationPathInformationsContainer"));

    if (div) {
      var p = document.createElement("p");
      p.className = "GPelevationPathInformations";
      p.innerHTML = value;
      div.appendChild(p);
    }

    return div;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ElevationPathDOM);

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* globals AmCharts, d3 */

/**
 * @module ProfileElevationPathDOM
 * @alias [private] ProfileElevationPathDOM
 * @description
 * create DOM element
 */
var ProfileElevationPathDOM = {
  /**
   * Gets a css property from an element
   *
   * @private
   * @param {HTMLElement} element The element to get the property from
   * @param {String} property The css property
   * @returns {String} The value of the property
   *
   * @see https://stackoverflow.com/questions/7444451/how-to-get-the-actual-rendered-font-when-its-not-defined-in-css
   */
  _getCssProperty: function _getCssProperty(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  },

  /**
   * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
   *
   * @private
   * @param {String} text The text to be rendered.
   * @param {HTMLElement} container The container of the text
   * @param {String} font The font of the container if known, format: 'weight size familiy'
   * @returns {Number} The width of the text
   *
   * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
   */
  _getTextWidth: function _getTextWidth(text, container) {
    var font = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    // re-use canvas object for better performance
    var canvas =
    /** ts-syntax */
    this.canvas || (this.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");

    if (font === null) {
      context.font = "".concat(this._getCssProperty(container, "font-weight"), " ").concat(this._getCssProperty(container, "font-size"), " ").concat(this._getCssProperty(container, "font-family"));
    } else {
      context.font = font;
    }

    var metrics = context.measureText(text);
    return metrics.width;
  },

  /**
   * Converts a data point z to svg y coord
   *
   * @private
   * @param {Object} z The z to convert.
   * @param {Number} pathHeight The height of the path in the svg container in px
   * @param {Number} minGraphZ Min z of the graph
   * @param {Number} pxPerMZ Number of pixels per meter for the z (y) axis
   * @returns {Number} The y svg coordinate of the point
   *
   */
  _dataZToSvgY: function _dataZToSvgY(z, pathHeight, minGraphZ, pxPerMZ) {
    return pathHeight - (z - minGraphZ) * pxPerMZ - 0.5;
  },

  /**
   * Converts a data point dist value to svg x coord
   *
   * @private
   * @param {Number} dist The dist to convert
   * @param {Number} svgWidth The witdth of the svg container in px
   * @param {Number} pathWidth The witdth of the path in the svg container in px
   * @param {Number} pxPerMX Number of pixels per meter for the x axis
   * @returns {Array} The x svg coordinate of the point
   *
   */
  _dataDistToSvgX: function _dataDistToSvgX(dist, svgWidth, pathWidth, pxPerMX) {
    return svgWidth - pathWidth + dist * pxPerMX;
  },

  /**
   * Converts a svg x coord to dist value
   *
   * @private
   * @param {Number} svgX The dist to convert
   * @param {Number} svgWidth The witdth of the svg container in px
   * @param {Number} pathWidth The witdth of the path in the svg container in px
   * @param {Number} pxPerMX Number of pixels per meter for the x axis
   * @returns {Array} The dist value
   *
   */
  _svgXToDataDist: function _svgXToDataDist(svgX, svgWidth, pathWidth, pxPerMX) {
    return (svgX + pathWidth - svgWidth) / pxPerMX;
  },

  /**
   * Returns the index of value if it were inserted in sorted (by dist) array of data points.
   *
   * @private
   * @param {Array} array Sorted array of data points (with dist property)
   * @param {Number} value Value to test the index of.
   * @returns {Number} The index the value would have.
   *
   */
  _arrayBisect: function _arrayBisect(array, value) {
    var idx;

    if (array.length === 0) {
      return 0;
    }

    for (idx = 0; idx < array.length; idx++) {
      if (value < array[idx].dist) {
        return idx;
      }
    }

    return idx - 1;
  },

  /**
   * Display Profile function used by default : no additonal framework needed.
   *
   * @public
   * @param {Object} data - elevations values for profile
   * @param {HTMLElement} container - html container where to display profile
   * @param {Object} context - this control object
   * @param {Object} className - calling class (ie ElevationPath)
   * @returns {DOMElement} profil container
   */
  displayProfileByDefault: function displayProfileByDefault(data, container, context, className) {
    var self = context;

    if (!container) {
      return;
    }

    if (!data) {
      return;
    } // on nettoie toujours...


    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    var margin = {
      top: 25,
      right: 15,
      bottom: 10,
      left: 10
    };
    var _displayProfileOptions = self.options.displayProfileOptions;
    var _points = data.points;
    var sortedElev = JSON.parse(JSON.stringify(_points));
    sortedElev.sort(function (e1, e2) {
      return e1.z - e2.z;
    });
    var minZ = sortedElev[0].z;
    var maxZ = sortedElev[sortedElev.length - 1].z;
    var dist = data.distance;
    var distUnit = "m";
    var widgetDiv = document.createElement("div");
    widgetDiv.id = "profileElevationByDefault";
    container.appendChild(widgetDiv); // Détermination des tailles en pixels des éléments du widget

    var widgetHeigth = container.clientHeight - margin.top - margin.bottom;
    var widgetWidth = container.clientWidth - margin.left - margin.right;
    var zLabelWidth = 17;

    var zGradWidth = this._getTextWidth(Math.round(maxZ).toLocaleString() + ",88", container, "400 10 Verdana");

    var xLabelHeight = 17;
    var xGradHeight = 15;
    var minZguideHeigth = 15;

    var minXguideWidth = this._getTextWidth(Math.round(dist).toLocaleString() + ",5", container);

    var minNumXGuides = 1;
    var pathHeight = widgetHeigth - xLabelHeight - xGradHeight;
    var pathWidth = widgetWidth - zLabelWidth - zGradWidth;
    var elevationSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    elevationSvg.id = "profileElevationByDefaultSvg";
    elevationSvg.setAttribute("style", "display: block; margin: auto; overflow: visible; position: absolute; left: 10px;");
    elevationSvg.setAttribute("viewBox", "0 0 ".concat(container.clientWidth, " ").concat(container.clientHeight));
    elevationSvg.setAttribute("width", "100%");
    elevationSvg.setAttribute("height", "100%"); // Détermination des guides en ordonnée :

    var maxNumZguides = Math.floor(pathHeight / minZguideHeigth);
    var gradZ; // Traitement du cas altitude max = altitude min

    if (maxZ === minZ) {
      gradZ = 0.1;
    } else {
      gradZ = Math.pow(10, Math.ceil(Math.log((maxZ - minZ) / maxNumZguides) / Math.log(10))) / 2;
    }

    var minGraphZ = Math.floor(minZ / gradZ) * gradZ;
    var maxGraphZ = Math.ceil(maxZ / gradZ) * gradZ; // cas où le path atteint pile les graduations extremes : ajout d'une gradiation

    if (maxGraphZ === maxZ) {
      maxGraphZ += gradZ;
    } // cas où gradZ < 1 : nombres flottants capricieux...


    minGraphZ = Math.round(minGraphZ * 100) / 100;
    maxGraphZ = Math.round(maxGraphZ * 100) / 100;
    var numZguides = Math.round((maxGraphZ - minGraphZ) / gradZ); // Si plus de guides que le max, on passe à une graduation de 10**x en 10**x (et non 10**x / 2)

    if (numZguides + 1 > maxNumZguides) {
      gradZ = Math.pow(10, Math.ceil(Math.log((maxZ - minZ) / maxNumZguides) / Math.log(10)));
      minGraphZ = Math.floor(minZ / gradZ) * gradZ;
      maxGraphZ = Math.ceil(maxZ / gradZ) * gradZ; // cas où le path atteint pile les graduations extremes : ajout d'une gradiation

      if (maxGraphZ === maxZ) {
        maxGraphZ += gradZ;
      } // cas où gradZ < 1 : nombres flottants capricieux...


      minGraphZ = Math.round(minGraphZ * 100) / 100;
      maxGraphZ = Math.round(maxGraphZ * 100) / 100;
      numZguides = Math.floor((maxGraphZ - minGraphZ) / gradZ);
    }

    numZguides = Math.max(Math.round(numZguides), 1);
    var axisZ = document.createElementNS("http://www.w3.org/2000/svg", "g");
    axisZ.setAttribute("class", "profile-z-vertical");
    var guidesZ = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var gradZyOffsetPx = pathHeight / numZguides;
    var pxPerMZ = pathHeight / (maxGraphZ - minGraphZ); // Traitement du cas altitude max = altitude min

    if (maxZ === minZ) {
      pxPerMZ = pathHeight / 0.2;
    } else {
      pxPerMZ = pathHeight / (maxGraphZ - minGraphZ);
    }

    var gradZtext;
    var yTextTranslation;
    var yStrokeTranslation;
    var gradZstroke;
    var gradZpath;
    var gradZgrad; // Ajout des graduations au graphique

    for (var i = 0; i <= numZguides; i++) {
      gradZtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
      gradZtext.setAttribute("class", "profile-z-graduation");
      gradZtext.setAttribute("font-family", "Verdana");
      gradZtext.setAttribute("font-size", "10px");
      gradZtext.setAttribute("fill", "#5E5E5E"); // Cas où gradZ < 1 : nombres flottants capricieux...
      // Le Math.round est pour éviter des ennuis du genre 3 * 0.1 = 0.300000000000004

      gradZtext.textContent = (Math.round(100 * (minGraphZ + i * gradZ)) / 100).toLocaleString();
      yTextTranslation = pathHeight - i * gradZyOffsetPx;
      gradZtext.setAttribute("transform", "translate(".concat(zLabelWidth + zGradWidth - 8, ", ").concat(yTextTranslation + 5, ")"));
      gradZtext.setAttribute("text-anchor", "end");
      axisZ.appendChild(gradZtext);
      yStrokeTranslation = Math.round(yTextTranslation) - 0.5;
      gradZstroke = document.createElementNS("http://www.w3.org/2000/svg", "g");
      gradZpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      gradZpath.setAttribute("cs", "100,100");
      gradZpath.setAttribute("stroke-width", "1");

      if (i !== 0) {
        gradZpath.setAttribute("stroke-opacity", "0.2");
      } else {
        gradZpath.setAttribute("stroke-opacity", "1");
      }

      gradZpath.setAttribute("stroke", "#000000");
      gradZpath.setAttribute("fill", "none");
      gradZpath.setAttribute("d", "M".concat(zLabelWidth + zGradWidth, ",").concat(yStrokeTranslation, " L").concat(pathWidth + zLabelWidth + zGradWidth, ",").concat(yStrokeTranslation));
      gradZgrad = document.createElementNS("http://www.w3.org/2000/svg", "path");
      gradZgrad.setAttribute("cs", "100,100");
      gradZgrad.setAttribute("stroke-width", "1");
      gradZgrad.setAttribute("stroke-opacity", "1");
      gradZgrad.setAttribute("stroke", "#000000");
      gradZgrad.setAttribute("fill", "none");
      gradZgrad.setAttribute("d", "M".concat(zLabelWidth + zGradWidth, ",").concat(yStrokeTranslation, " L").concat(zLabelWidth + zGradWidth + 5, ",").concat(yStrokeTranslation));
      gradZgrad.setAttribute("transform", "translate(-5, 0)");
      gradZstroke.appendChild(gradZgrad);
      gradZstroke.appendChild(gradZpath);
      guidesZ.appendChild(gradZstroke);
    }

    var axisZLegend = document.createElementNS("http://www.w3.org/2000/svg", "text");
    axisZLegend.setAttribute("class", "profile-z-legend");
    axisZLegend.setAttribute("font-family", "Verdana");
    axisZLegend.setAttribute("font-size", "11px");
    axisZLegend.setAttribute("fill", "#5E5E5E");
    axisZLegend.textContent = "Altitude (m)";
    axisZLegend.setAttribute("transform", "translate(".concat(zLabelWidth - 8, ", ").concat(Math.round(pathHeight / 2), ") rotate(-90)"));
    axisZLegend.setAttribute("text-anchor", "middle");
    axisZ.appendChild(axisZLegend);
    elevationSvg.appendChild(axisZ);
    elevationSvg.appendChild(guidesZ); // Détermination des guides en abscisse :
    // Passage éventuel en km

    if (dist > 2000) {
      dist /= 1000;
      distUnit = "km";
    }

    var maxNumXguides = Math.floor(pathWidth / minXguideWidth);
    var gradX = Math.pow(10, Math.ceil(Math.log(dist / maxNumXguides) / Math.log(10))) / 2;
    var maxGraphX = dist; // Si plus de guides que le max, on passe à une graduation de 10**x en 10**x (et non 10**x / 2)

    var numXguides = Math.floor(maxGraphX / gradX);

    if (numXguides > maxNumXguides) {
      gradX = Math.pow(10, Math.ceil(Math.log(dist / maxNumXguides) / Math.log(10)));
      numXguides = Math.floor(maxGraphX / gradX);
    } else if (numXguides < minNumXGuides) {
      gradX = Math.pow(10, Math.ceil(Math.log(dist / maxNumXguides) / Math.log(10)) - 1);
      numXguides = Math.floor(maxGraphX / gradX);
    }

    numXguides = Math.max(numXguides, 1);
    var lastGradX = gradX * numXguides;
    var axisX = document.createElementNS("http://www.w3.org/2000/svg", "g");
    axisX.setAttribute("class", "profile-x-vertical");
    var guidesX = document.createElementNS("http://www.w3.org/2000/svg", "g"); // Décalage des graduations pour que la dernière corresponde à la distance max

    var pxPerMX = pathWidth / maxGraphX;
    var xOffset = (maxGraphX - lastGradX) * pxPerMX;
    var gradXxOffsetPx = Math.round((pathWidth - xOffset) / numXguides);
    var gradXtext;
    var xTextTranslation;
    var xStrokeTranslation;
    var gradXstroke;
    var gradXpath;
    var gradXgrad; // Ajout des graduations au graphique

    for (var _i = 0; _i <= numXguides + 1; _i++) {
      gradXtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
      gradXtext.setAttribute("class", "profile-x-graduation");
      gradXtext.setAttribute("font-family", "Verdana");
      gradXtext.setAttribute("font-size", "10px");
      gradXtext.setAttribute("fill", "#5E5E5E"); // Exclusion du cas de la dernière graduation : correspond à la distance max : pas de texte

      if (_i !== numXguides + 1) {
        // Cas où gradX < 1 : nombres flottants capricieux...
        gradXtext.textContent = (Math.round(100 * _i * gradX) / 100).toLocaleString();
      }

      xTextTranslation = zLabelWidth + zGradWidth + _i * gradXxOffsetPx; // Cas de la dernière graduation : correspond à la distance max

      if (_i === numXguides + 1) {
        xTextTranslation = zLabelWidth + zGradWidth + pathWidth;
      }

      gradXtext.setAttribute("transform", "translate(".concat(xTextTranslation, ", ").concat(pathHeight + xGradHeight + 5, ")"));
      gradXtext.setAttribute("text-anchor", "middle");
      axisX.appendChild(gradXtext);
      xStrokeTranslation = xTextTranslation - 0.5;
      gradXstroke = document.createElementNS("http://www.w3.org/2000/svg", "g");
      gradXpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      gradXpath.setAttribute("cs", "100,100");
      gradXpath.setAttribute("stroke-width", "1");

      if (_i !== 0) {
        gradXpath.setAttribute("stroke-opacity", "0.2");
      } else {
        gradXpath.setAttribute("stroke-opacity", "1");
      }

      gradXpath.setAttribute("stroke", "#000000");
      gradXpath.setAttribute("fill", "none");
      gradXpath.setAttribute("d", "M".concat(xStrokeTranslation, ",").concat(pathHeight, " L").concat(xStrokeTranslation, ",0"));
      gradXgrad = document.createElementNS("http://www.w3.org/2000/svg", "path");
      gradXgrad.setAttribute("cs", "100,100");
      gradXgrad.setAttribute("stroke-width", "1");
      gradXgrad.setAttribute("stroke-opacity", "1");
      gradXgrad.setAttribute("stroke", "#000000");
      gradXgrad.setAttribute("fill", "none");
      gradXgrad.setAttribute("d", "M".concat(xStrokeTranslation, ",").concat(pathHeight, " L").concat(xStrokeTranslation, ",").concat(pathHeight - 5));
      gradXgrad.setAttribute("transform", "translate(0, 5)");
      gradXstroke.appendChild(gradXgrad);
      gradXstroke.appendChild(gradXpath);
      guidesX.appendChild(gradXstroke);
    }

    var axisXLegend = document.createElementNS("http://www.w3.org/2000/svg", "text");
    axisXLegend.setAttribute("class", "profile-x-legend");
    axisXLegend.setAttribute("font-family", "Verdana");
    axisXLegend.setAttribute("font-size", "11px");
    axisXLegend.setAttribute("fill", "#5E5E5E");
    axisXLegend.textContent = "Distance (".concat(distUnit, ")");
    axisXLegend.setAttribute("transform", "translate(".concat(zLabelWidth + zGradWidth + pathWidth / 2, ", ").concat(pathHeight + xGradHeight + xLabelHeight + 3, ")"));
    axisXLegend.setAttribute("text-anchor", "middle");
    axisX.appendChild(axisXLegend);
    elevationSvg.appendChild(axisX);
    elevationSvg.appendChild(guidesX);
    var elevationPathG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var factor = 1;

    if (distUnit === "km") {
      factor = 1000;
    }

    var pointX = this._dataDistToSvgX(_points[0].dist / factor, widgetWidth, pathWidth, pxPerMX);

    var pointY = this._dataZToSvgY(_points[0].z, pathHeight, minGraphZ, pxPerMZ);

    var pathD = "M".concat(pointX, ",").concat(pointY);

    for (var _i2 = 1; _i2 < _points.length; _i2++) {
      pointX = this._dataDistToSvgX(_points[_i2].dist / factor, widgetWidth, pathWidth, pxPerMX);
      pointY = this._dataZToSvgY(_points[_i2].z, pathHeight, minGraphZ, pxPerMZ);
      pathD += " L".concat(pointX, ",").concat(pointY);
    }

    var pathPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathPath.setAttribute("cs", "100,100");
    pathPath.setAttribute("stroke-width", "1");
    pathPath.setAttribute("stroke-opacity", "1");
    pathPath.setAttribute("stroke", "#0B6BA7");
    pathPath.setAttribute("fill", "none");
    pathPath.setAttribute("d", pathD); // Fermeture du path pour le fill

    pathD += " L".concat(pointX, ",").concat(pathHeight);
    pathD += " L".concat(widgetWidth - pathWidth, ",").concat(pathHeight);
    var pathFill = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathFill.setAttribute("cs", "100,100");
    pathFill.setAttribute("stroke-width", "1");
    pathFill.setAttribute("stroke-opacity", "0");
    pathFill.setAttribute("stroke", "#000000");
    pathFill.setAttribute("fill", "#00B798");
    pathFill.setAttribute("fill-opacity", "0.4");
    pathFill.setAttribute("d", pathD);
    elevationPathG.appendChild(pathPath);
    elevationPathG.appendChild(pathFill);
    elevationSvg.appendChild(elevationPathG); // Mise en place de l'écouteur d'évènement : pour l'affichage dynamique

    var dynamicsG = document.createElementNS("http://www.w3.org/2000/svg", "g"); // Pour écouter la position de la souris

    var pathRectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    pathRectangle.setAttribute("width", pathWidth);
    pathRectangle.setAttribute("height", pathHeight);
    pathRectangle.setAttribute("transform", "translate(".concat(widgetWidth - pathWidth, ",0)"));
    pathRectangle.setAttribute("visibility", "hidden");
    pathRectangle.setAttribute("pointer-events", "all");
    var sortedDist = JSON.parse(JSON.stringify(_points));
    sortedDist.sort(function (e1, e2) {
      return e1.dist - e2.dist;
    });
    var focusLineX = document.createElementNS("http://www.w3.org/2000/svg", "line");
    focusLineX.setAttribute("id", "focusLineX");
    focusLineX.setAttribute("class", "focusLine-default");
    focusLineX.setAttribute("fill", "none");
    focusLineX.setAttribute("stroke", "#F90");
    focusLineX.setAttribute("stroke-width", "0.5px");
    focusLineX.setAttribute("visibility", "hidden");
    var focusLineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
    focusLineY.setAttribute("id", "focusLineY");
    focusLineY.setAttribute("class", "focusLine-default");
    focusLineY.setAttribute("fill", "none");
    focusLineY.setAttribute("stroke", "#F90");
    focusLineY.setAttribute("stroke-width", "0.5px");
    focusLineY.setAttribute("visibility", "hidden");
    var focusCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    focusCircle.setAttribute("id", "focusCircle");
    focusCircle.setAttribute("r", 4);
    focusCircle.setAttribute("class", "circle-default focusCircle-default");
    focusCircle.setAttribute("fill", "#F90");
    focusCircle.setAttribute("visibility", "hidden");
    dynamicsG.appendChild(focusCircle);
    dynamicsG.appendChild(focusLineX);
    dynamicsG.appendChild(focusLineY); // Tooltip

    var tooltipDiv = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var altiSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    var slopeSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    var coordsSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tooltipDiv.setAttribute("style", "text-align:center; max-width:220px; font-size:10px; color:#000000; font-family:Verdana; z-index:50;");
    tooltipDiv.style.pointerEvents = "none";
    tooltipDiv.style.position = "fixed"; // tooltipDiv.classList.add("tooltipInit");
    // IE...

    tooltipDiv.setAttribute("class", "tooltipInit");
    tooltipDiv.setAttribute("text-anchor", "middle");
    widgetDiv.appendChild(tooltipDiv);
    altiSpan.setAttribute("class", "altiPathValue");
    altiSpan.setAttribute("x", "0");
    altiSpan.setAttribute("dy", "-.7em");
    slopeSpan.setAttribute("class", "altiPathValue");
    slopeSpan.setAttribute("x", "0");
    slopeSpan.setAttribute("dy", "1em");
    coordsSpan.setAttribute("class", "altiPathCoords");
    coordsSpan.setAttribute("x", "0");
    coordsSpan.setAttribute("dy", "1em");
    tooltipDiv.appendChild(altiSpan);

    if (_displayProfileOptions.currentSlope) {
      tooltipDiv.appendChild(slopeSpan);
    }

    tooltipDiv.appendChild(coordsSpan);
    var tooltipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    dynamicsG.appendChild(tooltipG);
    var tooltipBubble = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tooltipBubble.setAttribute("cs", "100,100");
    tooltipBubble.setAttribute("fill", "#FFFFFF");
    tooltipBubble.setAttribute("stroke", "#CCCCCC");
    tooltipBubble.setAttribute("fill-opacity", "0.8");
    tooltipBubble.setAttribute("stroke-width", "1");
    tooltipBubble.setAttribute("stroke-opacity", "1");
    var tooltipBubbleShadow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tooltipBubbleShadow.setAttribute("cs", "100,100");
    tooltipBubbleShadow.setAttribute("fill", "#FFFFFF");
    tooltipBubbleShadow.setAttribute("stroke", "#000000");
    tooltipBubbleShadow.setAttribute("fill-opacity", "0");
    tooltipBubbleShadow.setAttribute("stroke-width", "1");
    tooltipBubbleShadow.setAttribute("stroke-opacity", "0.4");
    tooltipBubbleShadow.setAttribute("transform", "translate(1,1)");
    tooltipG.appendChild(tooltipBubbleShadow);
    tooltipG.appendChild(tooltipBubble);
    tooltipG.appendChild(tooltipDiv); // tooltipG.classList.add("tooltipInit");
    // IE... deprecated

    tooltipG.setAttribute("class", "tooltipInit");
    tooltipG.style.pointerEvents = "none";

    function onMouseOver() {
      focusLineX.setAttribute("visibility", "visible");
      focusLineY.setAttribute("visibility", "visible");
      focusCircle.setAttribute("visibility", "visible");

      className.__createProfileMarker(self, _points[0]); // tooltips
      // tooltipDiv.classList.remove("tooltipInit");
      // tooltipG.classList.remove("tooltipInit");
      // tooltipDiv.classList.remove("tooltipFadeOut");
      // tooltipG.classList.remove("tooltipFadeOut");
      // tooltipDiv.classList.add("tooltipFadeIn");
      // tooltipG.classList.add("tooltipFadeIn");
      // IE... deprecated


      tooltipDiv.setAttribute("class", "tooltipFadeIn");
      tooltipG.setAttribute("class", "tooltipFadeIn");
    }

    function onMouseOut() {
      focusLineX.setAttribute("visibility", "hidden");
      focusLineY.setAttribute("visibility", "hidden");
      focusCircle.setAttribute("visibility", "hidden");

      className.__removeProfileMarker(self); // tooltips
      // tooltipDiv.classList.remove("tooltipFadeIn");
      // tooltipG.classList.remove("tooltipFadeIn");
      // tooltipDiv.classList.add("tooltipFadeOut");
      // tooltipG.classList.add("tooltipFadeOut");
      // IE... deprecated


      tooltipDiv.setAttribute("class", "tooltipFadeOut");
      tooltipG.setAttribute("class", "tooltipFadeOut");
    }

    function onMouseMove(e) {
      var mousePoint = elevationSvg.createSVGPoint();
      mousePoint.x = e.clientX;
      mousePoint.y = e.clientY;
      var svgMousePoint = mousePoint.matrixTransform(elevationSvg.getScreenCTM().inverse());
      var mouseDist = this._svgXToDataDist(svgMousePoint.x, widgetWidth, pathWidth, pxPerMX) * factor; // Math.max pour éviter de sortir de l'array

      var distIndex = Math.max(1, this._arrayBisect(sortedDist, mouseDist));
      var d0 = _points[distIndex - 1];
      var d1 = _points[distIndex];
      var d = d0;

      if (mouseDist - d0.dist > d1.dist - mouseDist) {
        d = d1;
      }

      var focusX = this._dataDistToSvgX(d.dist / factor, widgetWidth, pathWidth, pxPerMX);

      var focusY = this._dataZToSvgY(d.z, pathHeight, minGraphZ, pxPerMZ); // Mise à jour des éléments graphiques


      focusCircle.setAttribute("cx", focusX);
      focusCircle.setAttribute("cy", focusY);
      focusLineX.setAttribute("x1", focusX);
      focusLineX.setAttribute("y1", pathHeight);
      focusLineX.setAttribute("x2", focusX);
      focusLineX.setAttribute("y2", 0);
      focusLineY.setAttribute("x1", zLabelWidth + zGradWidth);
      focusLineY.setAttribute("y1", focusY);
      focusLineY.setAttribute("x2", pathWidth + zLabelWidth + zGradWidth);
      focusLineY.setAttribute("y2", focusY);

      className.__updateProfileMarker(self, d); // Mise à jour du tooltip


      var altiSpanTxt = "Altitude : ".concat(d.z.toLocaleString(), " m");
      var slopeSpanTxt = "Pente : ".concat(d.slope, " %");
      var coordsSpanTxt = "(lat : ".concat(d.lat.toLocaleString(), " / lon : ").concat(d.lon.toLocaleString(), ")");
      altiSpan.innerHTML = altiSpanTxt;
      slopeSpan.innerHTML = slopeSpanTxt;
      coordsSpan.innerHTML = coordsSpanTxt;
      var tooltipTextWidth = Math.max(this._getTextWidth(coordsSpanTxt, coordsSpan), this._getTextWidth(altiSpanTxt, altiSpan));
      var toolTipBubbleD;

      if (d.dist > dist * factor / 2) {
        toolTipBubbleD = "M -0.5 -0.5 l -6 6 l 0 16 l -".concat(tooltipTextWidth + 10, " 0 l 0 -44 l ").concat(tooltipTextWidth + 10, " 0 l 0 16 l 6 6");
        tooltipDiv.setAttribute("transform", "translate(".concat(-(tooltipTextWidth / 2 + 12), ",0)")); // IE11 !
      } else if (d.dist <= dist * factor / 2) {
        toolTipBubbleD = "M -0.5 -0.5 l 6 6 l 0 16 l ".concat(tooltipTextWidth + 10, " 0 l 0 -44 l -").concat(tooltipTextWidth + 10, " 0 l 0 16 l -6 6"); // Largeur de la fleche de la bulle du tooltip

        tooltipDiv.setAttribute("transform", "translate(".concat(tooltipTextWidth / 2 + 12, ",0)")); // IE11 !
      }

      tooltipBubble.setAttribute("d", toolTipBubbleD);
      tooltipBubbleShadow.setAttribute("d", toolTipBubbleD);
      tooltipG.setAttribute("transform", "translate(".concat(focusX, ",").concat(focusY, ")")); // IE11 !

      tooltipG.style.transform = "translate(".concat(focusX, "px,").concat(focusY, "px)");
    }

    pathRectangle.addEventListener("pointerover", onMouseOver);
    pathRectangle.addEventListener("pointerout", onMouseOut);
    pathRectangle.addEventListener("pointermove", onMouseMove.bind(this));
    dynamicsG.appendChild(pathRectangle);
    elevationSvg.appendChild(dynamicsG);
    widgetDiv.appendChild(elevationSvg);
    return container;
  },

  /**
   * Display Profile without graphical rendering (raw service response)
   *
   * @public
   * @param {Object} data - elevations values for profile
   * @param {HTMLElement} container - html container where to display profile
   * @param {Object} context - this control object
   * @param {Object} className - calling class (ie ElevationPath)
   * @returns {DOMElement} profil container
   */
  displayProfileRaw: function displayProfileRaw(data, container, context, className) {
    if (!container) {
      return;
    } // on nettoie toujours...


    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    var _points = data && data.points ? data.points : {};

    var div = document.createElement("textarea");
    div.id = "profilElevationResults";
    div.rows = 10;
    div.cols = 50;
    div.style.width = "100%";
    div.innerHTML = JSON.stringify(_points, undefined, 4);
    div.addEventListener("mouseover", function (e) {
      className.__customRawProfileMouseOverEvent(context, e);
    }); // TODO
    // for (var i = 0; i < _points.length; i++) {
    //     var point = _points[i];
    //     var divC  = document.createElement("code");
    //     divC.id = "point_" + i;
    //     divC.innerHTML = JSON.stringify(point, undefined, 4);
    //     div.appendChild(divC);
    //     divC.addEventListener("mouseover", function (e) {
    //          className.__customRawProfileMouseOverEvent(context, e);
    //     });
    // }

    container.appendChild(div);
    return container;
  },

  /**
   * Display Profile using D3 javascript framework. This method needs D3 libraries to be loaded.
   *
   * @public
   * @param {Object} data - elevations values for profile
   * @param {HTMLElement} container - html container where to display profile
   * @param {Object} context - this control object
   * @param {Object} className - calling class (ie ElevationPath)
   * @returns {DOMElement} profil container
   */
  displayProfileLibD3: function displayProfileLibD3(data, container, context, className) {
    var self = context;

    if (!container) {
      return;
    }

    if (!data) {
      return;
    } // on nettoie toujours...


    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    var _points = data.points;

    if (data.distance > 2000) {
      data.unit = "km";

      for (var i = 0; i < _points.length; i++) {
        _points[i].dist /= 1000;
      }
    }

    var _displayProfileOptions = self.options.displayProfileOptions;
    var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };
    var width = container.clientWidth - margin.left - margin.right;
    var height = container.clientHeight - margin.top - margin.bottom;
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);
    var line = d3.svg.line().interpolate("basis").x(function (d) {
      return x(d.dist);
    }).y(function (d) {
      return y(d.z);
    });
    var area = d3.svg.area().interpolate("basis").x(function (d) {
      return x(d.dist);
    }).y0(height).y1(function (d) {
      return y(d.z);
    });
    var svg = d3.select(container).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var xDomain = d3.extent(_points, function (d) {
      return d.dist;
    });
    x.domain(xDomain);
    var yDomain = [0, d3.max(_points, function (d) {
      return d.z;
    })];
    y.domain(yDomain);
    svg.append("path").datum(_points).attr("class", "area-d3").attr("d", area);
    svg.append("g").attr("class", "x axis-d3").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("y", -15).attr("dy", ".71em").attr("x", width).text("Distance (" + data.unit + ")");
    svg.append("g").attr("class", "y axis-d3").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").text("Altitude (m)");
    svg.append("g").attr("class", "grid-d3 vertical").attr("transform", "translate(0," + height + ")").call(xAxis.orient("bottom").tickSize(-height, 0, 0).tickFormat(""));
    svg.append("g").attr("class", "grid-d3 horizontal").call(yAxis.orient("left").tickSize(-width, 0, 0).tickFormat(""));
    svg.append("path").datum(_points).attr("class", "line-d3").attr("d", line);
    svg.selectAll("circle").data(_points).enter().append("circle").attr("cx", function (d) {
      return x(d.dist);
    }).attr("cy", function (d) {
      return y(d.z);
    }).attr("r", 0).attr("class", "circle-d3");
    var focus = svg.append("g").style("display", "none");
    focus.append("line").attr("id", "focusLineX").attr("class", "focusLine-d3");
    focus.append("line").attr("id", "focusLineY").attr("class", "focusLine-d3");
    focus.append("circle").attr("id", "focusCircle").attr("r", 4).attr("class", "circle-d3 focusCircle-d3");
    var div = d3.select(container).append("div").attr("class", "tooltip-d3").style("opacity", 0);
    var bisectDist = d3.bisector(function (d) {
      return d.dist;
    }).left;
    svg.append("rect").attr("class", "overlay-d3").attr("width", width).attr("height", height).on("mouseover", function () {
      focus.style("display", null);

      className.__createProfileMarker(self, _points[0]);
    }).on("mouseout", function () {
      focus.style("display", "none");

      className.__removeProfileMarker(self); // tooltips


      div.transition().duration(500).style("opacity", 0);
    }).on("mousemove", function () {
      var m = d3.mouse(this);
      var distance = x.invert(m[0]); // Math.max pour éviter de sortir de l'array

      var i = Math.max(1, bisectDist(_points, distance));
      var d0 = _points[i - 1];
      var d1 = _points[i];
      var d = distance - d0[0] > d1[0] - distance ? d1 : d0;
      var xc = x(d.dist);
      var yc = y(d.z);
      focus.select("#focusCircle").attr("cx", xc).attr("cy", yc);
      focus.select("#focusLineX").attr("x1", xc).attr("y1", y(yDomain[0])).attr("x2", xc).attr("y2", y(yDomain[1]));
      focus.select("#focusLineY").attr("x1", x(xDomain[0])).attr("y1", yc).attr("x2", x(xDomain[1])).attr("y2", yc);

      className.__updateProfileMarker(self, d); // tooltips


      div.transition().duration(200).style("opacity", 0.9);
      var _message = "";
      _message += " Altitude : " + d.z + " m";

      if (_displayProfileOptions.currentSlope) {
        _message += "<br/> Pente : " + d.slope + " %";
      }

      _message += "<br/> (Lat : " + d.lat + "/ Lon : " + d.lon + ")";
      div.html(_message).style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
    }); // return d3.selectAll("rect.overlay")[0][0];

    return svg;
  },

  /**
   * Display Profile using Amcharts framework. This method needs AmCharts libraries to be loaded.
   *
   * @public
   * @param {Object} data - elevations values for profile
   * @param {HTMLElement} container - html container where to display profile
   * @param {Object} context - this control object
   * @param {Object} className - calling class (ie ElevationPath)
   * @returns {DOMElement} profil container
   */
  displayProfileLibAmCharts: function displayProfileLibAmCharts(data, container, context, className) {
    var self = context;

    if (!container) {
      return;
    }

    if (!data) {
      return;
    }

    var _points = data.points;
    var ballonText = "<span class='altiPathValue'>[[title]] : [[value]]m</span><br/>";
    var currentSlope = self.options.displayProfileOptions.currentSlope;

    if (currentSlope) {
      ballonText += "<span class='altiPathValue'>Pente : [[slope]] %</span><br/>";
    }

    ballonText += "<span class='altiPathCoords'>(Lat: [[lat]] / Lon:[[lon]])</span>";
    AmCharts.addInitHandler(function () {});

    if (data.distance > 2000) {
      data.unit = "km";

      for (var i = 0; i < _points.length; i++) {
        _points[i].dist /= 1000;
      }
    }

    for (var _i3 = 0; _i3 < _points.length; _i3++) {
      var dist = _points[_i3].dist;
      var coeffArrond = 100;

      if (dist > 100) {
        coeffArrond = 1;
      } else if (dist > 10) {
        coeffArrond = 10;
      } // Correction arrondi distance totale


      dist = Math.round(dist * coeffArrond) / coeffArrond;
      _points[_i3].dist = dist;
    }

    var settings = {
      type: "serial",
      pathToImages: "http://cdn.amcharts.com/lib/3/images/",
      categoryField: "dist",
      autoMarginOffset: 0,
      marginRight: 10,
      marginTop: 10,
      startDuration: 0,
      color: "#5E5E5E",
      fontSize: 8,
      theme: "light",
      thousandsSeparator: "",
      numberFormatter: {
        precision: -1,
        decimalSeparator: ",",
        thousandsSeparator: " "
      },
      categoryAxis: {
        color: "#5E5E5E",
        gridPosition: "start",
        minHorizontalGap: 40,
        tickPosition: "start",
        title: "Distance (" + data.unit + ")",
        titleColor: "#5E5E5E",
        labelOffset: 0,
        startOnAxis: true
      },
      chartCursor: {
        animationDuration: 0,
        bulletsEnabled: true,
        bulletSize: 10,
        categoryBalloonEnabled: false,
        cursorColor: "#F90",
        graphBulletAlpha: 1,
        graphBulletSize: 1,
        zoomable: false
      },
      trendLines: [],
      graphs: [{
        balloonColor: "#CCCCCC",
        balloonText: ballonText,
        bullet: "round",
        bulletAlpha: 0,
        bulletBorderColor: "#FFF",
        bulletBorderThickness: 2,
        bulletColor: "#F90",
        bulletSize: 6,
        hidden: false,
        id: "AmGraph-1",
        fillAlphas: 0.4,
        fillColors: "#C77A04",
        lineAlpha: 1,
        lineColor: "#C77A04",
        lineThickness: 1,
        title: "Altitude",
        valueField: "z"
      }],
      guides: [],
      valueAxes: [{
        id: "ValueAxis-1",
        minVerticalGap: 20,
        title: "Altitude (m)"
      }],
      balloon: {
        borderColor: "#CCCCCC",
        borderThickness: 1,
        fillColor: "#FFFFFF",
        showBullet: true
      },
      titles: [],
      allLabels: [],
      dataProvider: _points
    };

    var _containerProfile = AmCharts.makeChart(container, settings);

    _containerProfile.addListener("changed", function (e) {
      var obj = e.chart.dataProvider[e.index];

      className.__updateProfileMarker(self, obj);
    });

    return _containerProfile;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ProfileElevationPathDOM);

/***/ })
/******/ ])["default"];