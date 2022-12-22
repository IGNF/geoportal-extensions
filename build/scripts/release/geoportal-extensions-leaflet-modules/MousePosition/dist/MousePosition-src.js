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

MousePosition =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 16 */,
/* 17 */,
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
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 27 */,
/* 28 */,
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
/* 78 */,
/* 79 */,
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var geoportal_access_lib_src_Services_Alti_Alti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GPgeneralWidget_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_CSS_GPmousePosition_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _Common_CSS_GPmousePosition_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Common_CSS_GPmousePosition_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CSS_GPgeneralWidgetLeaflet_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CSS_Controls_MousePosition_GPmousePositionLeaflet_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _CSS_Controls_MousePosition_GPmousePositionLeaflet_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_CSS_Controls_MousePosition_GPmousePositionLeaflet_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(34);
/* harmony import */ var _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(60);
/* harmony import */ var _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(36);
/* harmony import */ var _Common_Utils_MathUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(94);
/* harmony import */ var _Common_Controls_MousePositionDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(95);
/* harmony import */ var _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(77);
/* harmony import */ var _CRS_CRS__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(96);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }














var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_6__["default"].getLogger("mouseposition");
/**
 * @classdesc
 *
 * Leaflet Control Class to display Mouse position in various CRS and altitude using the <a href="https://geoservices.ign.fr/documentation/geoservices/alti.html" target="_blank">altimetric web service of the Geoportal Platform</a>.
 *
 * Use {@link module:Controls.MousePosition L.geoportalControl.MousePosition()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control" target="_blank">L.Control</a> native class.
 *
 * @namespace
 * @alias L.geoportalControl.MousePosition
 */

var MousePosition = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Control.extend(
/** @lends L.geoportalControl.MousePosition.prototype */
{
  includes: _Common_Controls_MousePositionDOM__WEBPACK_IMPORTED_MODULE_10__["default"],

  /**
   * options by default
   *
   * @private
   */
  options: {
    position: "bottomleft",
    collapsed: true,
    units: [],
    systems: [],
    displayAltitude: true,
    displayCoordinates: true,
    editCoordinates: false,
    altitude: {
      triggerDelay: 200,
      responseDelay: 500,
      noDataValue: -99999,
      noDataValueTolerance: 90000,
      serviceOptions: {}
    }
  },

  /**
   * @constructor MousePosition
   *
   * @private
   * @alias MousePosition
   * @extends {L.Control}
   * @param {Object} options - options for function call.
   * @param {String}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
   * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
   * @param {String}  [options.position] - position of component into the map, 'bottomleft' by default
   * @param {Boolean} [options.collapsed = true] - collapse mode, false by default
   * @param {Array}   [options.systems] - list of projection systems, GEOGRAPHIC, MERCATOR, LAMB93 and LAMB2E by default
   *      Each array element (=system) is an object with following properties :
   * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
   * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
   * @param {String}  [options.systems.type] - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
   * @param {Object}  [options.systems.geoBBox] - Aera covered by the system (WGS84 coordinates).
   * @param {Number}  options.systems.geoBBox.right - Right bound.
   * @param {Number}  options.systems.geoBBox.left - Left bound.
   * @param {Number}  options.systems.geoBBox.top - Top bound.
   * @param {Number}  options.systems.geoBBox.bottom - Bottom bound.
   * @param {Array}   [options.units] - list of units by system, Geographical and Metric by default
   *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
   *      and "M" or "KM" for metric coordinates
   * @param {Boolean} [options.displayAltitude= true] - active/desactivate the altitude panel, if desactivate, have just the coordinate panel, true by default
   * @param {Boolean} [options.displayCoordinates= true] - active/desactivate the coordinate panel, if desactivate, have just the altitude panel, true by default
   * @param {Boolean} [options.editCoordinates = false] - add edit coordinates options. False by default.
   * @param {Object}  [options.altitude] - elevation configuration
   * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
   * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
   * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
   * @param {Number}  [options.altitude.noDataValue] - value used for altitude service no data (default is -99999). In this case, "---m" will be displayed instead of "-99999m"
   * @param {Number}  [options.altitude.noDataValueTolerance] - tolerance for no data value :
   *                  values in [noDataValue - noDataValueTolerance ; noDataValue + noDataValueTolerance] interval will not be displayed, but "---m" will be displayed instead.
   *                  Default is 90000
   * @example
   *  var MousePosition = L.geoportalControl.MousePosition({
   *      position : 'bottomleft',
   *      collapsed : false,
   *      displayAltitude : true,
   *      displayCoordinates : true,
   *      editCoordinates : false,
   *      altitude : {
   *           triggerDelay : 100,
   *           responseDelay : 500,
   *           noDataValue : -99999,
   *           noDataValueTolerance : 90000,
   *           serviceOptions : {}
   *      },
   *      systems : [
   *       {
   *          crs : L.CRS.EPSG4326,
   *          label : "Lon,Lat",
   *          type : "Geographical"
   *        },
   *       {
   *          crs : L.geoportalCRS.EPSG2154,
   *          label : "Lambert 93",
   *          type : "Metric"
   *        }
   *      ],
   *      units : ["DEC", "DMS"]
   *  });
   */
  initialize: function initialize(options) {
    // on merge les options avec celles par defaut
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(this.options, options); // uuid

    this._uid = _Common_Utils_SelectorID__WEBPACK_IMPORTED_MODULE_8__["default"].generate(); // initialisation des systemes de projections

    this._projectionSystems = [];

    this._initProjectionSystems(); // initialisation des systemes des unités


    this._projectionUnits = {};

    this._initProjectionUnits(); // detection du support : desktop ou tactile


    this._isDesktop = this._detectSupport(); // on met en place un seuil sur le timer

    if (this.options.altitude.triggerDelay < 100) {
      this.options.altitude.triggerDelay = 100;
    } // timer sur le delai d'immobilisation du mouvement


    this._timer = this.options.altitude.triggerDelay; // Systeme de projection selectionné (cf. _initProjectionSystems)

    this._currentProjectionSystems = this._projectionSystems[0]; // Container des systemes

    this._projectionSystemsContainer = null;
    /** Type d'unité de projection selectionnés : Geographical ou Metric (cf._initProjectionSystems ) */

    this._currentProjectionType = this._projectionSystems[0].type; // Unité de projection selectionnés (cf. _initProjectionUnits)

    this._currentProjectionUnits = this._projectionUnits[this._currentProjectionType][0].code; // Container des unités

    this._projectionUnitsContainer = null;
    /** Container de visualisation du panneau du composant */

    this._showContainer = null;
    this._pictoContainer = null;
    this._panelContainer = null;
    this._panelHeaderContainer = null; // gestion de l'affichage du panneau de l'altitude / coordonnées

    if (!this.options.displayAltitude && !this.options.displayCoordinates) {
      // on reactive cette option !
      this.options.displayCoordinates = true;
    }

    if (!this.options.displayCoordinates) {
      // si les coordonnées ne sont pas affichées : pas besoin de les éditer...
      this.options.editCoordinates = false;
    }
    /** Edition des coordonnées en cours ou non */


    this._isEditing = false;
    /**
     * Droit sur le ressource alti.
     * Par defaut, on n'en s'occupe pas
     * sauf si l'autoconfiguration est chargée !
     */

    this._noRightManagement = false; // gestion des droits sur les ressources/services
    // si l'on souhaite un calcul d'altitude, on verifie
    // les droits sur les ressources d'alti...

    if (this.options.displayAltitude) {
      this._checkRightsManagement();
    } // on transmet les options au controle


    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.setOptions(this, this.options);
  },

  /**
   * this method is called by this.addTo(map) when the control is added on the map
   * and fills variable 'this._container = this.onAdd(map)',
   * and create events on map.
   * @param {Object} map - the map
   *
   * @returns {DOMElement} DOM element
   * @private
   */
  onAdd: function onAdd(map) {
    // initialisation du DOM du composant
    var container = this._container = this._initLayout(); // on met en place l'evenement sur la carte pour recuperer les coordonnées,
    // on l'active à l'ouverture du panneau uniquement !


    if (!this.options.collapsed) {
      // this.onShowMousePositionClick();
      // evenement valable pour le mode desktop !
      if (this._isDesktop) {
        map.on("mousemove", this.onMouseMove, this);
      } else {
        map.on("move", this.onMapMove, this);
      }
    } // deactivate of events that may interfere with the map


    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomEvent.disableClickPropagation(container).disableScrollPropagation(container); // on stoppe la propagation de l'événement mousemove sur le container

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomEvent.addListener(container, "mousemove", leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomEvent.stopPropagation).addListener(container, "mousemove", leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomEvent.preventDefault);
    return container;
  },

  /**
   * this method is called when the control is removed from the map
   * and removes events on map.
   * @param {Object} map - the map
   *
   * @private
   */
  onRemove: function onRemove(map) {
    map.off("mousemove", this.onMouseMove);
  },

  /**
   * this method is called by the constructor and initialize the projection
   * systems.
   * getting coordinates in the requested projection :
   * see this.onMousePositionProjectionSystemChange()
   *
   * @private
   */
  _initProjectionSystems: function _initProjectionSystems() {
    // on donne la possibilité à l'utilisateur de modifier
    // la liste des systèmes à afficher
    // Ex. this.options.systems
    // systemes de projection disponible par defaut
    var projectionSystemsByDefault = [{
      label: "G\xE9ographique",
      crs: leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.CRS.Simple,
      // L.Projection.LonLat !
      type: "Geographical"
    }, {
      label: "Web Mercator",
      crs: leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.CRS.EPSG3395,
      // L.Projection.SphericalMercator !
      type: "Metric"
    }, {
      label: "Lambert 93",
      crs: _CRS_CRS__WEBPACK_IMPORTED_MODULE_12__["default"].EPSG2154,
      type: "Metric",
      geoBBox: {
        left: -9.86,
        bottom: 41.15,
        right: 10.38,
        top: 51.56
      }
    }, {
      label: "Lambert II \xE9tendu",
      crs: _CRS_CRS__WEBPACK_IMPORTED_MODULE_12__["default"].EPSG27572,
      type: "Metric",
      geoBBox: {
        left: -4.87,
        bottom: 42.33,
        right: 8.23,
        top: 51.14
      }
    }];
    var systems = this.options.systems;

    for (var i = 0; i < systems.length; i++) {
      // definition d'un systeme de reference
      var sys = systems[i];

      if (!sys.label) {
        logger.error("not defined !");
        continue;
      }

      if (!sys.crs) {
        logger.error("crs not defined !");
        continue;
      }

      if (!sys.type) {
        logger.warn("type srs not defined, use 'Metric' by default !");
        sys.type = "Metric";
      }

      this._projectionSystems.push(systems[i]); // it's a just a test ...


      var found = false;

      for (var j = 0; j < projectionSystemsByDefault.length; j++) {
        var obj = projectionSystemsByDefault[j];

        if (sys.crs === obj.crs) {
          found = true;
          logger.info("crs '{}' already configured by default", obj.code);
        }
      }

      if (!found) {
        logger.info("crs '{}' not found, it's a new projection", sys.code || sys.label);
      }
    } // au cas où...


    if (this._projectionSystems.length === 0) {
      this._projectionSystems = projectionSystemsByDefault;
    } // re-initilisation des codes pour gerer le lien entre _projectionSystems et select du mouse position (lien code/value)


    for (var k = 0; k < this._projectionSystems.length; ++k) {
      this._projectionSystems[k].code = k;
    }
  },

  /**
   * this method is called by the constructor and initialize the units.
   * getting coordinates in the requested units :
   * see this.onMousePositionProjectionUnitsChange()
   *
   * @private
   */
  _initProjectionUnits: function _initProjectionUnits() {
    // on donne la possibilité à l'utilisateur de modifier
    // la liste des unités à afficher
    // Ex.
    // this.options.units : ["DEC", "DMS"]
    // unités disponible par defaut
    var projectionUnitsByDefault = {
      Geographical: [{
        code: "DEC",
        label: "degrés décimaux",
        format: this._displayDEC
      }, {
        code: "DMS",
        label: "degrés sexagésimaux",
        format: this._displayDMS
      }, {
        code: "RAD",
        label: "radians",
        format: this._displayRAD
      }, {
        code: "GON",
        label: "grades",
        format: this._displayGON
      }],
      Metric: [{
        code: "M",
        label: "mètres",
        format: this._displayMeter
      }, {
        code: "KM",
        label: "kilomètres",
        format: this._displayKMeter
      }]
    };
    var units = this.options.units;

    for (var type in projectionUnitsByDefault) {
      if (projectionUnitsByDefault.hasOwnProperty(type)) {
        var found = false;

        for (var j = 0; j < projectionUnitsByDefault[type].length; j++) {
          var obj = projectionUnitsByDefault[type][j];

          for (var i = 0; i < units.length; i++) {
            var unit = units[i];

            if (obj.code === unit) {
              found = true;

              if (!this._projectionUnits[type]) {
                this._projectionUnits[type] = [];
              }

              this._projectionUnits[type].push(obj);
            }
          }
        }

        if (!found) {
          this._projectionUnits[type] = projectionUnitsByDefault[type];
        }
      }
    } // au cas où...


    if (Object.keys(this._projectionUnits).length === 0) {
      this._projectionUnits = projectionUnitsByDefault;
    }
  },

  /**
   * this method is called by constructor
   * and check the rights to resources
   *
   * @private
   */
  _checkRightsManagement: function _checkRightsManagement() {
    var rightManagement = _Common_Utils_CheckRightManagement__WEBPACK_IMPORTED_MODULE_7__["default"].check({
      key: this.options.apiKey,
      resources: ["SERVICE_CALCUL_ALTIMETRIQUE_RSC"],
      services: ["Elevation"]
    });
    this._noRightManagement = !rightManagement; // on recupère les informations utiles
    // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
    // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
    // été renseignée.

    if (!this.options.apiKey) {
      this.options.apiKey = rightManagement ? rightManagement.key : null;
    }
  },

  /**
   * this method is called by the constructor.
   * this information is useful to switch to touch mode.
   * Detection : test for desktop or tactile
   *
   * @returns {Boolean} is desktop
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
  // ######################## methods handle dom ####################### //
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

    var inputShow = this._showContainer = this._createShowMousePositionElement();

    container.appendChild(inputShow); // mode "collapsed"

    if (!this.options.collapsed) {
      inputShow.checked = true;
    }

    var picto = this._pictoContainer = this._createShowMousePositionPictoElement(this._isDesktop);

    container.appendChild(picto);

    var panel = this._panelContainer = this._createMousePositionPanelElement();

    var header = this._panelHeaderContainer = this._createMousePositionPanelHeaderElement();

    panel.appendChild(header);

    var basic = this._createMousePositionPanelBasicElement(this.options.displayAltitude, this.options.displayCoordinates, this.options.editCoordinates);

    panel.appendChild(basic);

    var arraySettings = this._createShowMousePositionSettingsElement(this.options.displayCoordinates);

    for (var j = 0; j < arraySettings.length; j++) {
      panel.appendChild(arraySettings[j]);
    }

    var settings = this._createMousePositionSettingsElement();

    var systems = this._projectionSystemsContainer = this._createMousePositionSettingsSystemsElement(this._projectionSystems);

    var units = this._projectionUnitsContainer = this._createMousePositionSettingsUnitsElement(this._projectionUnits[this._currentProjectionType]);

    settings.appendChild(systems);
    settings.appendChild(units);
    panel.appendChild(settings);
    container.appendChild(panel); // ce tag n'est pas à placer dans le container du controle,
    // mais dans celui de la map !

    var center = this._createMapCenter();

    var map = this._map;
    map.getContainer().appendChild(center);
    return container;
  },

  /**
   * this method is called by this.()
   * and it changes the elevation view panel into the dom.
   * FIXME call by ID !
   *
   * @param {Boolean} active - true:active, false:disable
   *
   * @private
   */
  _setElevationPanel: function _setElevationPanel(active) {
    var div = null;

    if (!active) {
      div = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePositionAltitude"));
      div.style.display = "none";
    }

    if (active && this._noRightManagement) {
      div = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePositionAlt"));
      div.innerHTML = "no right !";
    }
  },

  /**
   * this method is called by this.()
   * and it changes the coordinate view panel into the dom.
   * FIXME call by ID !
   *
   * @param {Boolean} active - true:active, false:disable
   *
   * @private
   */
  _setCoordinatePanel: function _setCoordinatePanel(active) {
    if (!active) {
      var div = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePositionCoordinate"));
      div.style.display = "none";
    }
  },

  /**
   * this method is called by this.()
   * and it changes the settings view panel into the dom.
   * FIXME call by ID !
   *
   * @param {Boolean} active - true:active, false:disable
   *
   * @private
   */
  _setSettingsPanel: function _setSettingsPanel(active) {
    if (!active) {
      var divPicto = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get("GPshowMousePositionSettingsPicto");
      var divPanel = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePositionSettings"));
      divPicto.style.display = "none";
      divPanel.style.display = "none";
    }
  },

  /**
   * this method is called by this.onMousePositionProjectionSystemChange()
   * when changes to a metric or a geographical units.
   *
   * @param {String} type - Geographical or Metric
   *
   * @private
   */
  _setTypeUnitsPanel: function _setTypeUnitsPanel(type) {
    var container = this._projectionUnitsContainer; // on supprime les enfants...

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    var units = this._projectionUnits[type];

    for (var j = 0; j < units.length; j++) {
      var obj = units[j];
      var option = document.createElement("option");
      option.value = obj.code ? obj.code : j;
      option.text = obj.label || j; // option.label = obj.label;

      container.appendChild(option);
    }

    var projectionUnits = this._projectionUnits[type][0].code;

    if (this._currentProjectionUnits === "DMS" || projectionUnits === "DMS") {
      this._resetCoordinateElements(this.options.editCoordinates, type, projectionUnits);

      this._setEditMode(this._isEditing);
    } // le nouveau type de system ...


    this._currentProjectionType = type; // Mise a jour des elements labels et unites

    this._resetLabelElements(type);

    this._resetUnitElements(projectionUnits); // et comme on a changé de type de systeme,
    // il faut changer aussi d'unité !


    this._currentProjectionUnits = this._projectionUnits[type][0].code;
  },
  // ################################################################### //
  // ######################## method units format ###################### //
  // ################################################################### //

  /**
   * degreedecimal
   * @param {Object} oLatLng - coordinates
   *
   * @returns {Object} coordinates in decimal
   * @private
   */
  _displayDEC: function _displayDEC(oLatLng) {
    var coordinate = {};
    coordinate.lat = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].roundToDecimal(oLatLng.lat, 6);
    coordinate.lng = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].roundToDecimal(oLatLng.lng, 6);
    coordinate.unit = "°";
    return coordinate;
  },

  /**
   * degreedecimal2sexagecimal
   * @param {Object} oLatLng - coordinates
   *
   * @returns {Object} coordinates in DMS
   * @private
   */
  _displayDMS: function _displayDMS(oLatLng) {
    var coordinate = {};
    coordinate.lat = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalLatToDMS(oLatLng.lat, true);
    coordinate.lng = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalLonToDMS(oLatLng.lng, true);
    return coordinate;
  },

  /**
   * degreedecimal2radian
   * @param {Object} oLatLng - coordinates
   *
   * @returns {Object} coordinates in radian
   * @private
   */
  _displayRAD: function _displayRAD(oLatLng) {
    var coordinate = {};
    coordinate.lat = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalToRadian(oLatLng.lat);
    coordinate.lng = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalToRadian(oLatLng.lng);
    coordinate.unit = "rad";
    return coordinate;
  },

  /**
   * degreedecimal2grade
   * @param {Object} oLatLng - coordinates
   *
   * @returns {Object} coordinates in gon
   * @private
   */
  _displayGON: function _displayGON(oLatLng) {
    var coordinate = {};
    coordinate.lat = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalToGrade(oLatLng.lat);
    coordinate.lng = _Utils_PositionFormater__WEBPACK_IMPORTED_MODULE_11__["default"].decimalToGrade(oLatLng.lng);
    coordinate.unit = "gon";
    return coordinate;
  },

  /**
   * meter
   * @param {Object} oXY - coordinates
   *
   * @returns {Object} coordinates in meters
   * @private
   */
  _displayMeter: function _displayMeter(oXY) {
    // on recoit toujours des coordonnées metriques
    var coordinate = {};
    coordinate.x = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.formatNum(oXY.x, 2);
    coordinate.y = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.formatNum(oXY.y, 2);
    coordinate.unit = "m";
    return coordinate;
  },

  /**
   * kilometer
   * @param {Object} oXY - coordinates
   *
   * @returns {Object} coordinates in km
   * @private
   */
  _displayKMeter: function _displayKMeter(oXY) {
    var coordinate = {};
    coordinate.x = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.formatNum(oXY.x / 1000, 2);
    coordinate.y = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.formatNum(oXY.y / 1000, 2);
    coordinate.unit = "km";
    return coordinate;
  },
  // ################################################################### //
  // ####################### method system project ##################### //
  // ################################################################### //

  /**
   * this method projects a coordinate to a specific projection.
   * FIXME
   *
   * @param {Object} oLatLng - geographic coordinate (L.LatLng)
   * @param {Object} crs - projection system (ex. GEOGRAPHIC, LAMB93, LAMB2E, MERCATOR, ...)
   * @returns {Object} oXY - coordinate
   * @private
   */
  _project: function _project(oLatLng, crs) {
    // cf. http://leafletjs.com/reference.html#iprojection
    // notre carte est dans la projection par defaut :
    // Spherical Mercator projection (EPSG:3857)
    // - GEOGRAPHIC : conversion native, L.CRS.Simple ou L.Projection.LngLat.project(latlng)
    // - LAMB93 : L.GeoportalCRS.EPSG2154 ou projection.project(latlng)
    // - LAMB2E : L.GeoportalCRS.EPSG27572 ou projection.project(latlng)
    // - MERCATOR ou EPSG:3395 : L.CRS.EPSG3395 ou L.Projection.Mercator.project(latlng)
    if (typeof crs === "function") {
      // "crs is an function !"... en mode AMD !
      crs = crs();
    }

    if (_typeof(crs) !== "object") {
      logger.log("crs is not an object !");
      return;
    } // pas de reprojection pour le systeme de projection natif !


    if (crs === leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.CRS.Simple) {
      return oLatLng;
    }

    if (!crs.projection || _typeof(crs.projection) !== "object") {
      logger.error("projection is not an object !");
      return;
    }

    var oPoint = crs.projection.project(oLatLng); // FIXME reprojeter du geographique en geographique cause qq problemes
    // Ex. LatLng en EPSG4326 !
    // FIXME probleme d'inversion d'axe sur les projections geographiques
    // Ex. EPSG:4326 -> lat/lon
    //     IGNF:RGF93G -> lon/lat

    if (this._currentProjectionType === "Geographical") {
      oPoint.lat = oPoint.y;
      oPoint.lng = oPoint.x;
    }

    if (!oPoint || Object.keys(oPoint).length === 0) {
      logger.error("Failed to project with crs code : " + crs.code);
    }

    return oPoint;
  },

  /**
   * this method unprojects a coordinate to a geographic projection.
   *
   * @param {Object} oXY - coordinate
   * @returns {Object} oLatLng - geographic coordinate (L.LatLng)
   * @private
   */
  _unproject: function _unproject(oXY) {
    // cf. http://leafletjs.com/reference.html#iprojection
    // notre carte est dans la projection par defaut :
    // Spherical Mercator projection (EPSG:3857)
    // - GEOGRAPHIC : conversion native, L.CRS.Simple ou L.Projection.LngLat.project(latlng)
    // - LAMB93 : L.GeoportalCRS.EPSG2154 ou projection.project(latlng)
    // - LAMB2E : L.GeoportalCRS.EPSG27572 ou projection.project(latlng)
    // - MERCATOR ou EPSG:3395 : L.CRS.EPSG3395 ou L.Projection.Mercator.project(latlng)
    var oSrs = this._currentProjectionSystems.crs;

    if (!oSrs) {
      logger.log("system crs not found");
      return;
    }

    if (typeof oSrs === "function") {
      // "crs is an function !"... en mode AMD !
      oSrs = oSrs();
    }

    if (_typeof(oSrs) !== "object") {
      logger.log("crs is not an object !");
      return;
    } // pas de reprojection pour le systeme de projection natif !


    if (oSrs === leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.CRS.Simple) {
      return {
        lat: oXY.y,
        lng: oXY.x
      };
    }

    if (this._currentProjectionType === "Geographical") {
      return {
        lat: oXY.y,
        lng: oXY.x
      };
    }

    if (!oSrs.projection || _typeof(oSrs.projection) !== "object") {
      logger.error("projection is not an object !");
      return;
    }

    var oLatLng = oSrs.projection.unproject(oXY);

    if (!oLatLng || Object.keys(oLatLng).length === 0) {
      logger.error("Failed to unproject coordinate");
    }

    return oLatLng;
  },
  // ################################################################### //
  // ##################### handlers events to control ################## //
  // ################################################################### //

  /**
   * this sends the coordinates to the panel.
   * (cf. this.GPdisplayCoords() into the DOM functions)
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
    // type de systeme : Geographical ou Metric
    var type = this._currentProjectionSystems.type; // on recherche la fonction de formatage dans l'unitée demandée

    var format = null;
    var units = this._projectionUnits[type];

    for (var i = 0; i < units.length; i++) {
      if (units[i].code === this._currentProjectionUnits) {
        format = units[i].format;
        break;
      }
    } // structure pour les coordonnées en fonctin du type demandé :
    // {x:, y:, unit:} ou {lng:, lat:} ou {lon:, lat:} ou {e:, n:, unit:}...


    var coordinate = {}; // on projete le point dans le systeme demandé

    var oSrs = this._currentProjectionSystems.crs;

    if (!oSrs) {
      logger.error("crs not found !");
      return;
    }

    coordinate = format(this._project(oLatLng, oSrs));

    if (!coordinate || Object.keys(coordinate).length === 0) {
      return;
    }

    this.GPdisplayCoords(coordinate);
  },

  /**
   * this sends the coordinates to the panel.
   * (cf. this.GPdisplayElevation() into the DOM functions)
   *
   * @param {Object} oLatLng - geographic coordinate (L.LatLng)
   *
   * @private
   */
  _setElevation: function _setElevation(oLatLng) {
    // gestion du timer de la requete du service d'altitude
    var delay = this.options.altitude.responseDelay;
    var noDataValue = this.options.altitude.noDataValue;
    var noDataValueTolerance = this.options.altitude.noDataValueTolerance;
    this.GPdisplayElevation(oLatLng, delay, noDataValue, noDataValueTolerance);
  },

  /**
   * this method is triggered when the mouse or the map is stopped.
   * (cf. onMouseMove and onMapMove)
   *
   * @param {Object} oLatLng - geographic coordinate (L.LatLng)
   *
   * @private
   */
  onMoveStopped: function onMoveStopped(oLatLng) {
    // si pas de droit, on ne met pas à jour l'affichage !
    if (this._noRightManagement) {
      return;
    }

    this._setElevation(oLatLng);
  },

  /**
   * this method is an handler event to control. The event is 'mousemove' on
   * the map. The handler sends the coordinates to the panel.
   * (cf. this.GPdisplayCoords() into the DOM functions)
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onMouseMove: function onMouseMove(e) {
    var self = this;
    var oLatLng = e.latlng;

    this._setCoordinate(oLatLng);

    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      self.onMoveStopped(oLatLng);
    }, this.options.altitude.triggerDelay);
  },

  /**
   * this method is an handler event to control. The event is 'moveend' on
   * the map. The handler sends the coordinates to the panel.
   * (cf. this.GPdisplayCoords() into the DOM functions)
   *
   * @private
   */
  onMapMove: function onMapMove() {
    var self = this;
    var map = this._map;
    var oLatLng = map.getCenter();

    this._setCoordinate(oLatLng);

    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      self.onMoveStopped(oLatLng);
    }, this.options.altitude.triggerDelay);
  },
  // ################################################################### //
  // ####################### handlers events to dom #################### //
  // ################################################################### //

  /**
   * this method is called by this.GPdisplayCoords() in the dom, and
   * it executes a request to the elevation service.
   *
   * @param {Object} coordinate - {lat:..., lng:...}
   * @param {Function} callback - callback
   *
   * @private
   */
  onRequestAltitude: function onRequestAltitude(coordinate, callback) {
    logger.log("onRequestAltitude"); // INFORMATION
    // on effectue la requête au service d'altitude...
    // on met en place des callbacks afin de recuperer les resultats ou
    // les messages d'erreurs du service.
    // le resultat est affiché dans une balise du dom.
    // les messages d'erreurs sont affichés sur la console (?)

    if (!coordinate || Object.keys(coordinate).length === 0) {
      return;
    } // si on ne veut pas de calcul d'altitude, on ne continue pas !


    if (!this.options.displayAltitude) {
      return;
    } // si on n'a pas les droits sur la ressource, pas la peine de
    // continuer !


    if (this._noRightManagement) {
      return;
    }

    logger.log(coordinate);
    var options = {}; // on recupere les options du service

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, this.options.altitude.serviceOptions); // ainsi que les coordonnées

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      zonly: true,
      positions: [{
        lon: coordinate.lon || coordinate.lng,
        lat: coordinate.lat
      }]
    }); // et les callbacks

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      scope: this,
      // callback onSuccess
      onSuccess: function onSuccess(results) {
        logger.log(results);

        if (results && Object.keys(results).length) {
          // var context = this.options.scope;
          // context._setAltidude(results.elevations[0].z);
          callback.call(this, results.elevations[0].z);
        }
      },
      // callback onFailure
      onFailure: function onFailure(error) {
        logger.error(error.message);
      }
    }); // cas où la clef API n'est pas renseignée dans les options du service,
    // on utilise celle de l'autoconf ou celle renseignée au niveau du controle

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      apiKey: options.apiKey || this.options.apiKey
    }); // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
    // true par défaut (https)

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(options, {
      ssl: this.options.ssl
    });
    logger.log(options);
    var altiService = new geoportal_access_lib_src_Services_Alti_Alti__WEBPACK_IMPORTED_MODULE_0__["default"](options);
    altiService.call();
  },

  /**
   * this method is called by event 'click' on 'GPshowMousePositionPicto' tag label
   * (cf. this._createShowMousePositionPictoElement),
   * and toggles event 'mousemove' on map.
   * FIXME
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onShowMousePositionClick: function onShowMousePositionClick(e) {
    logger.log(e); // checked : true - panel close
    // checked : false - panel open

    var map = this._map; // evenement declenché à l'ouverture/fermeture du panneau,
    // et en fonction du mode : desktop ou tactile !

    if (this._showContainer.checked) {
      this._isDesktop ? map.off("mousemove", this.onMouseMove, this) : map.off("move", this.onMapMove, this);
    } else {
      this._isDesktop ? map.on("mousemove", this.onMouseMove, this) : map.on("move", this.onMapMove, this);
    } // on gère l'affichage des panneaux ici...,
    // même si ce n'est pas l'endroit adequate...


    this._setElevationPanel(this.options.displayAltitude);

    this._setCoordinatePanel(this.options.displayCoordinates);

    if (!this.options.displayCoordinates) {
      this._setSettingsPanel(false);
    }
  },

  /**
   * this method is called by event 'click' on input coordinate
   *
   * @param {Boolean} editing - editing mode
   * @private
   */
  onMousePositionEditModeClick: function onMousePositionEditModeClick(editing) {
    if (!this.options.editCoordinates) {
      return;
    }

    if (this._isEditing === editing) {
      return;
    }

    this._isEditing = editing; // Affichage des outils, input en ecriture

    this._setEditMode(this._isEditing);

    var map = this._map;

    if (this._isDesktop) {
      this._isEditing ? map.off("mousemove", this.onMouseMove, this) : map.on("mousemove", this.onMouseMove, this);
    } else {
      this._isEditing ? map.off("move", this.onMapMove, this) : map.on("move", this.onMapMove, this);
    }
  },

  /**
   * Convert Coordinate value : km to meters, radians, grades to decimal degrees
   * @param {Number} value - value to convert
   * @param {String} unit - unit
   *
   * @returns {Number} converted value
   * @private
   */
  _convertCoordinate: function _convertCoordinate(value, unit) {
    var result;

    if (unit === "DEC" || unit === "DMS") {
      // DMS est converti en DEC !
      result = value;
    } else if (unit === "M") {
      result = value;
    } else if (unit === "KM") {
      result = value * 1000;
    } else if (unit === "RAD") {
      var rd = (180 / Math.PI).toFixed(20);
      result = (value * rd).toFixed(20);
    } else if (unit === "GON") {
      var d = (9 / 10).toFixed(20);
      result = (value * d).toFixed(20);
    }

    return result;
  },

  /**
   * Validate Extend coordinate
   *
   * @param {String} coordType - Lat or Lon
   * @param {String} value - coordinate
   * @param {Event} e - event
   * @returns {Boolean} value is within extent
   */
  validateExtentCoordinate: function validateExtentCoordinate(coordType, value, e) {
    // FIXME pas de validation...
    if (e !== undefined) {
      return true;
    }

    if (["Lon", "Lat"].indexOf(coordType) === -1) {
      return false;
    }

    var geoBBox = this._currentProjectionSystems.geoBBox;

    if (geoBBox === undefined) {
      return true;
    }

    if (geoBBox) {
      // check if coordinates are in the extent
      var extent = [geoBBox.left, geoBBox.bottom, geoBBox.right, geoBBox.top];
      var unit = this._currentProjectionUnits; // on convertit un point..., mais on n'a pas de fonction
      // de conversion comme pour openlayers...

      var oLatLon = this._unproject({
        x: coordType === "Lon" ? this._convertCoordinate(value, unit) : 0,
        y: coordType === "Lat" ? this._convertCoordinate(value, unit) : 0
      });

      if (coordType === "Lon" && (oLatLon.lng < extent[0] || oLatLon.lng > extent[2])) {
        logger.warn("coordinates (lon) out of extent !?");
        return false;
      }

      if (coordType === "Lat" && (oLatLon.lat < extent[1] || oLatLon.lat > extent[3])) {
        logger.warn("coordinates (lat) out of extent !?");
        return false;
      }
    }

    return true;
  },

  /**
   * Get coordinate from inputs and select in decimal degrees
   *
   * @param {String} coordType - "Lon" or "Lat"
   * @returns {String} coordinate
   * @private
   */
  _getCoordinate: function _getCoordinate(coordType) {
    var inputDegrees = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Degrees"));
    var degrees = inputDegrees.value;

    if (!degrees) {
      return null;
    }

    degrees = degrees.replace(",", ".");

    if (!_Common_Utils_MathUtils__WEBPACK_IMPORTED_MODULE_9__["default"].isInteger(degrees)) {
      return null;
    }

    var result = _Common_Utils_MathUtils__WEBPACK_IMPORTED_MODULE_9__["default"].toInteger(degrees);

    if (result < Number(inputDegrees.dataset.min) || result > Number(inputDegrees.dataset.max)) {
      return null;
    }

    var direction = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Direction")).value;
    var inputMinutes = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Minutes"));
    var minutes = inputMinutes.value;

    if (minutes) {
      minutes = minutes.replace(",", ".");

      if (_Common_Utils_MathUtils__WEBPACK_IMPORTED_MODULE_9__["default"].isInteger(minutes)) {
        var mins = _Common_Utils_MathUtils__WEBPACK_IMPORTED_MODULE_9__["default"].toInteger(minutes);

        if (mins >= Number(inputMinutes.dataset.min) && mins <= Number(inputMinutes.dataset.max)) {
          result += mins / 60;
        }
      }
    }

    var inputSeconds = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Seconds"));
    var seconds = inputSeconds.value;

    if (seconds) {
      seconds = seconds.replace(",", ".");
      var secs = _Common_Utils_MathUtils__WEBPACK_IMPORTED_MODULE_9__["default"].toFloat(seconds);

      if (secs && secs >= Number(inputSeconds.dataset.min) && secs <= Number(inputSeconds.dataset.max)) {
        result += secs / 3600;
      }
    }

    if (direction === "O" || direction === "S") {
      result = -result;
    }

    return result;
  },

  /**
   * locate DMS coordinates on map
   *
   * @private
   */
  _locateDMSCoordinates: function _locateDMSCoordinates() {
    // on est toujours en coordonnées geographiques...
    var oLatLon = {
      lat: this._getCoordinate("Lat"),
      lng: this._getCoordinate("Lon")
    };

    if (!this.validateExtentCoordinate("Lon", oLatLon.lng)) {
      return;
    }

    if (!this.validateExtentCoordinate("Lat", oLatLon.lat)) {
      return;
    } // FIXME https://github.com/Leaflet/Leaflet/issues/922


    var map = this._map;
    map.panTo(oLatLon);
  },

  /**
   * locate coordinates on map (not DMS)
   *
   * @private
   */
  _locateCoordinates: function _locateCoordinates() {
    // soit longitude ou soit y
    var lonYDom = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePositionLon")).value;
    lonYDom = lonYDom.replace(",", ".");
    lonYDom = parseFloat(lonYDom);

    if (isNaN(lonYDom)) {
      return;
    } // soit lattitude ou soit x


    var latXDom = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePositionLat")).value;
    latXDom = latXDom.replace(",", ".");
    latXDom = parseFloat(latXDom);

    if (isNaN(latXDom)) {
      return;
    }

    var lon = null;
    var lat = null;
    var x = null;
    var y = null;

    if (this._currentProjectionType === "Geographical") {
      lon = lonYDom;
      lat = latXDom;
    } else {
      x = latXDom;
      y = lonYDom;
    }

    if (!this.validateExtentCoordinate("Lon", lon || x)) {
      return;
    }

    if (!this.validateExtentCoordinate("Lat", lat || y)) {
      return;
    }

    var unit = this._currentProjectionUnits;

    var oLatLon = this._unproject({
      x: this._convertCoordinate(lon !== null ? lon : x, unit),
      y: this._convertCoordinate(lat !== null ? lat : y, unit)
    }); // FIXME https://github.com/Leaflet/Leaflet/issues/922


    var map = this._map;
    map.panTo(oLatLon);
  },

  /**
   * locate coordinates on map
   *
   * @method locate
   * @private
   */
  onMousePositionEditModeLocateClick: function onMousePositionEditModeLocateClick() {
    if (!this.options.editCoordinates) {
      return;
    }

    if (!this._isEditing) {
      this.onMousePositionEditModeClick(true);
      return;
    }

    this._currentProjectionUnits === "DMS" ? this._locateDMSCoordinates() : this._locateCoordinates();
  },

  /**
   * this method is called by event 'change' on 'GPmousePositionProjectionSystem'
   * tag select (cf. this._createMousePositionSettingsElement),
   * and selects the system projection.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onMousePositionProjectionSystemChange: function onMousePositionProjectionSystemChange(e) {
    logger.log("onMousePositionProjectionSystemChange", e);
    var idx = e.target.selectedIndex; // index

    var value = e.target.options[idx].value; // crs, ex. MERCATOR (optionnel)

    var label = e.target.options[idx].label; // etiquette, ex Géographiques

    logger.log(idx, value, label);

    this._setCurrentSystem(value);
  },

  /**
   * this method selects the current system projection.
   *
   * @param {Object} systemCode - inner code (rank in array _projectionSystems)
   *
   * @private
   */
  _setCurrentSystem: function _setCurrentSystem(systemCode) {
    // si on change de type de systeme, on doit aussi changer le type d'unités !
    var type = null;

    for (var i = 0; i < this._projectionSystems.length; ++i) {
      if (this._projectionSystems[i].code === Number(systemCode)) {
        type = this._projectionSystems[i].type;
        break;
      }
    }

    if (!type) {
      logger.log("system not found in projection systems container");
      return;
    }

    if (type !== this._currentProjectionType) {
      this._setTypeUnitsPanel(type);
    } // on enregistre le systeme courrant


    this._currentProjectionSystems = this._projectionSystems[Number(systemCode)]; // on simule un deplacement en mode tactile pour mettre à jour les
    // resultats

    if (!this._isDesktop) {
      this.onMapMove();
    }
  },

  /**
   * this method is called by event 'mouseover' on 'GPmousePositionProjectionSystem'
   * tag select (cf. this._createMousePositionSettingsElement),
   * and selects the system projection.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onMousePositionProjectionSystemMouseOver: function onMousePositionProjectionSystemMouseOver(e) {
    logger.log("onMousePositionProjectionSystemMouseOver", e);
    var map = this._map;

    if (!map) {
      return;
    } // clear select


    var systemList = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.DomUtil.get(this._addUID("GPmousePositionProjectionSystem"));
    systemList.innerHTML = ""; // add systems whose extent intersects the map extent

    for (var j = 0; j < this._projectionSystems.length; j++) {
      var proj = this._projectionSystems[j];
      var option = null;

      if (proj.geoBBox) {
        // bboxes intersection test
        if (map.getBounds()._southWest.lng > proj.geoBBox.right || map.getBounds()._southWest.lat > proj.geoBBox.top || map.getBounds()._northEast.lng < proj.geoBBox.left || map.getBounds()._northEast.lat < proj.geoBBox.bottom) {
          if (proj === this._currentProjectionSystems) {
            option = document.createElement("option");
            option.value = proj.code;
            option.text = proj.label || j;
            option.setAttribute("selected", "selected");
            option.setAttribute("disabled", "disabled");
            systemList.appendChild(option);
          }

          continue; // do not intersect
        }
      }

      option = document.createElement("option");
      option.value = proj.code;
      option.text = proj.label || j;

      if (proj === this._currentProjectionSystems) {
        option.setAttribute("selected", "selected");
      }

      systemList.appendChild(option);
    }
  },

  /**
   * this method is called by event 'change' on 'GPmousePositionProjectionUnits'
   * tag select (cf. this._createMousePositionSettingsElement),
   * and selects the units projection.
   *
   * @param {Object} e - HTMLElement
   *
   * @private
   */
  onMousePositionProjectionUnitsChange: function onMousePositionProjectionUnitsChange(e) {
    logger.log("onMousePositionProjectionUnitsChange", e);
    var idx = e.target.selectedIndex;
    var value = e.target.options[idx].value;
    var label = e.target.options[idx].label;
    logger.log(idx, value, label);
    var oldProjectionUnits = this._currentProjectionUnits;
    var newProjectionUnits = this._currentProjectionUnits = value;
    var newProjectionType = this._currentProjectionType; // Mise a jour des elements lebels et unites

    this._resetLabelElements(newProjectionType);

    this._resetUnitElements(newProjectionUnits); // mise a jour des inputs pour les coordonnees


    if (oldProjectionUnits === "DMS" || newProjectionUnits === "DMS") {
      this._resetCoordinateElements(this.options.editCoordinates, newProjectionType, newProjectionUnits);

      this._setEditMode(this._isEditing);
    } // on simule un deplacement en mode tactile pour mettre à jour les
    // resultats


    if (!this._isDesktop) {
      this.onMapMove();
    }
  },
  // ################################################################### //
  // ###### METHODES PUBLIQUES (INTERFACE AVEC LE CONTROLE) ############ //
  // ################################################################### //

  /**
   * This method is public.
   * It allows to control the execution of a movement.
   *
   * @param {Object} position - position = {lon: , lat: }
   * @param {Number} zoom - zoom
   * @param {Object} options - Zoom/pan options
   */
  moveTo: function moveTo(position, zoom, options) {
    if (!this._showContainer.checked) {
      this._pictoContainer.click();
    }

    var map = this._map;

    if (!map) {
      return;
    }

    this.onMouseMove({
      latlng: position
    });
    map.flyTo(position, zoom || 10, options || {});
  }
});
/* harmony default export */ __webpack_exports__["default"] = (MousePosition); // Expose MousePosition as L.geoportalControl.MousePosition (for a build bundle)

if (window.L) {
  if (!window.L.geoportalControl) {
    window.L.geoportalControl = {};
  }

  window.L.geoportalControl.MousePosition = MousePosition;
}

/***/ }),
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
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
* @module MathUtils
* @alias Gp.MathUtils
* @description
* ...
*
* @example
* modulo();
* decimalToDMS();
* toInteger();
* isInteger();
* toFloat();
*/
var MathUtils = {
  /**
   * Reste de la division euclidienne
   * @function modulo
   * @param {Number} a - divisor
   * @param {Number} b - quotient
   * @returns {Number} Modulo
   */
  modulo: function modulo(a, b) {
    var r = a % b;
    return r * b < 0 ? r + b : r;
  },

  /**
   * Transform degrees, minutes, seconds form decimal degrees -
   * Largely inspired by the private function degreesToStringHDMS from ol/coordinate.js
   *
   * @function decimalToDMS
   * @param {Number} degrees - decimal degrees
   * @param {Array} hemispheres - "NS" ou "EO"
   * @param {Number} numDigits - number of digits for seconds
   * @returns {Object} DMS coordinate
   */
  decimalToDMS: function decimalToDMS(degrees, hemispheres, numDigits) {
    var normalizedDegrees = this.modulo(degrees + 180, 360) - 180;
    var x = Math.abs(3600 * normalizedDegrees);
    var dflPrecision = numDigits || 0;
    var precision = Math.pow(10, dflPrecision);
    var deg = Math.floor(x / 3600);
    var min = Math.floor((x - deg * 3600) / 60);
    var sec = x - deg * 3600 - min * 60;
    sec = Math.ceil(sec * precision) / precision;

    if (sec >= 60) {
      sec = 0;
      min += 1;
    }

    if (min >= 60) {
      min = 0;
      deg += 1;
    }

    var direction = hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
    return {
      d: deg,
      m: min,
      s: sec,
      direction: direction
    };
  },

  /**
   * Converts string to Integer
   *
   * @function toInteger
   * @param {String} s - string number
   * @param {Numeric} base - between 2 and 36
   * @returns {null|Numeric} result
   */
  toInteger: function toInteger(s, base) {
    var _base = base || 10;

    var n = parseInt(s, _base);

    if (!isNaN(n) && isFinite(n)) {
      return n;
    }

    return null;
  },

  /**
   * check if s represents an integer
   *
   * @function isInteger
   * @param {String} s - string number
   * @returns {Boolean} is integer
   */
  isInteger: function isInteger(s) {
    if (isNaN(s)) {
      return false;
    }

    var v = parseFloat(s);
    return (v | 0) === v;
  },

  /**
   * Converts s to float
   *
   * @function toFloat
   * @param {String} s - string number
   * @returns {null|Numeric} result
   */
  toFloat: function toFloat(s) {
    var n = parseFloat(s);

    if (!isNaN(n) && isFinite(n)) {
      return n;
    }

    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (MathUtils);

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var MousePositionDOM = {
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
    container.id = this._addUID("GPmousePosition");
    container.className = "GPwidget";
    return container;
  },
  // ################################################################### //
  // ################### Methods of main container ##################### //
  // ################################################################### //

  /**
   * Hidden checkbox for minimizing/maximizing
   *
   * @returns {DOMElement} DOM element
   */
  _createShowMousePositionElement: function _createShowMousePositionElement() {
    var input = document.createElement("input");
    input.id = this._addUID("GPshowMousePosition");
    input.type = "checkbox";
    return input;
  },

  /**
   * Show mouse position control
   * @param {Boolean} isDesktop - specifies if the support is desktop or tactile
   *
   * @returns {DOMElement} DOM element
   */
  _createShowMousePositionPictoElement: function _createShowMousePositionPictoElement(isDesktop) {
    // contexte d'execution
    var self = this;
    var label = document.createElement("label");
    label.id = this._addUID("GPshowMousePositionPicto");
    label.className = "GPshowAdvancedToolPicto";
    label.htmlFor = this._addUID("GPshowMousePosition");
    label.title = "Afficher les coordonnées du curseur"; // FIXME detection disponible dans le JS !
    // Detection : test for desktop or tactile
    // var isDesktop = true;
    // var userAgent = window.navigator.userAgent.toLowerCase();
    // if (userAgent.indexOf("iphone") !== -1 ||
    // userAgent.indexOf("ipod") !== -1 ||
    // userAgent.indexOf("ipad") !== -1 ||
    // userAgent.indexOf("android") !== -1 ||
    // userAgent.indexOf("mobile") !== -1 ||
    // userAgent.indexOf("blackberry") !== -1 ||
    // userAgent.indexOf("tablet") !== -1 ||
    // userAgent.indexOf("phone") !== -1 ||
    // userAgent.indexOf("touch") !== -1 ) {
    //     isDesktop = false;
    // }
    // if (userAgent.indexOf("msie") !== -1 ||
    // userAgent.indexOf("trident") !== -1) {
    //     isDesktop = true;
    // }
    // Show map center localisation if panel opened and tactile support

    label.addEventListener("click", function (e) {
      var mapCenterClass = "";

      if (!document.getElementById(self._addUID("GPshowMousePosition")).checked && !isDesktop) {
        mapCenterClass = "GPmapCenterVisible";
      }

      document.getElementById("GPmapCenter").className = mapCenterClass;
      self.onShowMousePositionClick(e);
    });
    var spanOpen = document.createElement("span");
    spanOpen.id = this._addUID("GPshowMousePositionOpen");
    spanOpen.className = "GPshowAdvancedToolOpen";
    label.appendChild(spanOpen);
    return label;
  },

  /**
   * mouse position panel
   *
   * @returns {DOMElement} DOM element
   */
  _createMousePositionPanelElement: function _createMousePositionPanelElement() {
    var panel = document.createElement("div");
    panel.id = this._addUID("GPmousePositionPanel");
    panel.className = "GPpanel"; // FIXME on decompose la fonction pour les besoins du controle,
    // on ajoutera ces childs à la main...
    // div.appendChild(this._createMousePositionPanelHeaderElement());
    // div.appendChild(this._createMousePositionPanelBasicElement());
    // div.appendChild(this._createShowMousePositionSettingsElement());
    // div.appendChild(this._createMousePositionSettingsElement());

    return panel;
  },

  /**
   * Map center localisation (tactile use)
   *
   * @returns {DOMElement} container
   */
  _createMapCenter: function _createMapCenter() {
    var div = document.createElement("div");
    div.id = "GPmapCenter";
    div.className = "";
    return div;
  },
  // ################################################################### //
  // ####################### Panel container ########################### //
  // ################################################################### //

  /**
   * @returns {DOMElement} container
   */
  _createMousePositionPanelHeaderElement: function _createMousePositionPanelHeaderElement() {
    var container = document.createElement("div");
    container.className = "GPpanelHeader";
    var divTitle = document.createElement("div");
    divTitle.className = "GPpanelTitle";
    divTitle.innerHTML = "Coordonnées";
    container.appendChild(divTitle);
    var divClose = document.createElement("div");
    divClose.id = "GPmousePositionPanelClose";
    divClose.className = "GPpanelClose";
    divClose.title = "Fermer le panneau"; // Link panel close / visibility checkbox

    var self = this;

    if (divClose.addEventListener) {
      divClose.addEventListener("click", function () {
        document.getElementById(self._addUID("GPshowMousePositionPicto")).click();
      }, false);
    } else if (divClose.attachEvent) {
      divClose.attachEvent("onclick", function () {
        document.getElementById(self._addUID("GPshowMousePositionPicto")).click();
      });
    }

    container.appendChild(divClose);
    return container;
  },

  /**
   * coordinate panel
   * @param {Boolean} [displayAltitude] - specifies if the altitude panel must be displayed
   * @param {Boolean} [displayCoordinates] - specifies if the coordinates panel must be displayed
   * @param {Boolean} [editCoordinates] - specifies if the coordinates edition is allowed
   * @param {Boolean} [currentProjectionUnits] - specifies if the current projection units
   *
   * FIXME
   * call this._createMousePositionPanelBasicCoordinateElement
   * call this._createMousePositionPanelBasicAltitudeElement
   *
   * @returns {DOMElement} DOM element
   */
  _createMousePositionPanelBasicElement: function _createMousePositionPanelBasicElement(displayAltitude, displayCoordinates, editCoordinates, currentProjectionUnits) {
    // default Values
    displayAltitude = typeof displayAltitude === "undefined" ? true : displayAltitude;
    displayCoordinates = typeof displayCoordinates === "undefined" ? true : displayCoordinates;
    editCoordinates = typeof editCoordinates === "undefined" ? false : editCoordinates;
    var container = document.createElement("div");
    container.id = this._addUID("GPmousePositionBasicPanel"); // FIXME on devrait decomposer la fonction pour les besoins du controle,
    // on ajoutera ces childs à la main...

    container.appendChild(this._createMousePositionPanelBasicCoordinateElement(displayCoordinates, editCoordinates, currentProjectionUnits));
    container.appendChild(this._createMousePositionPanelEditToolsElement(editCoordinates));
    container.appendChild(this._createMousePositionPanelBasicAltitudeElement(displayAltitude));
    return container;
  },

  /**
   * create coordinate elements
   *
   * @param {String} coordType - ("Lon" ou "Lat")
   * @param {Boolean} [editCoordinates=false] - specifies if the coordinates edition is allowed
   *
   * @returns {Array} list of DOM elements
   */
  _createCoordinateElement: function _createCoordinateElement(coordType, editCoordinates) {
    var context = this;

    if (["Lon", "Lat"].indexOf(coordType) === -1) {
      return [];
    }

    var list = [];
    var input = document.createElement("input");
    input.id = this._addUID("GPmousePosition" + coordType);
    input.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
    input.readOnly = true;

    if (editCoordinates) {
      input.addEventListener("click", function () {
        context.onMousePositionEditModeClick(true);
      });
      input.addEventListener("change", function (e) {
        this.classList.remove("error");
        var valid = context.validateExtentCoordinate(coordType, this.value, e);
        valid ? this.classList.remove("error") : this.classList.add("error");
      });
    }

    list.push(input);
    var span = document.createElement("span");
    span.className = "GPmousePositionUnits";
    list.push(span);
    return list;
  },

  /**
   *
   * @param {String} coordType - ("Lon" ou "Lat")
   * @param {Boolean} [editCoordinates=false] - specifies if the coordinates edition is allowed
   *
   * @returns {Array} list of DOM elements
   */
  _createDMSCoordinateElement: function _createDMSCoordinateElement(coordType, editCoordinates) {
    if (["Lon", "Lat"].indexOf(coordType) === -1) {
      return [];
    }

    var context = this;
    var list = [];
    var input = document.createElement("input");
    input.id = this._addUID("GPmousePosition" + coordType + "Degrees");
    input.className = "GPSexagesimal";
    input.setAttribute("name", "degrees");
    input.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
    input.readOnly = true;
    input.dataset.min = 0;
    input.dataset.max = coordType === "Lon" ? 180 : 90;

    if (editCoordinates) {
      input.addEventListener("click", function () {
        context.onMousePositionEditModeClick(true);
      });
      input.addEventListener("change", function () {
        this.classList.remove("error");

        var valid = context._checkDMSDegrees(coordType, this);

        valid ? this.classList.remove("error") : this.classList.add("error");
      });
    }

    list.push(input);
    var span = document.createElement("span");
    span.className = "GPmousePositionSexagesimalLabel";
    span.innerHTML = "°";
    list.push(span);
    var input1 = document.createElement("input");
    input1.id = this._addUID("GPmousePosition" + coordType + "Minutes");
    input1.className = "GPSexagesimal";
    input1.setAttribute("name", "minutes");
    input1.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
    input1.readOnly = true;
    input1.dataset.min = 0;
    input1.dataset.max = 59;

    if (editCoordinates) {
      input1.addEventListener("click", function () {
        context.onMousePositionEditModeClick(true);
      });
      input1.addEventListener("change", function () {
        this.classList.remove("error");

        var valid = context._checkDMSElement(this);

        valid ? this.classList.remove("error") : this.classList.add("error");
      });
    }

    list.push(input1);
    var span1 = document.createElement("span");
    span1.className = "GPmousePositionSexagesimalLabel";
    span1.innerHTML = "'";
    list.push(span1);
    var input2 = document.createElement("input");
    input2.id = this._addUID("GPmousePosition" + coordType + "Seconds");
    input2.className = "GPSexagesimalsec";
    input2.setAttribute("name", "seconds");
    input2.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
    input2.readOnly = true;
    input2.dataset.min = 0;
    input2.dataset.max = 59;

    if (editCoordinates) {
      input2.addEventListener("click", function () {
        context.onMousePositionEditModeClick(true);
      });
      input2.addEventListener("change", function () {
        this.classList.remove("error");

        var valid = context._checkDMSElement(this, true);

        valid ? this.classList.remove("error") : this.classList.add("error");
      });
    }

    list.push(input2);
    var span2 = document.createElement("span");
    span2.className = "GPmousePositionSexagesimalLabel";
    span2.innerHTML = "''";
    list.push(span2);
    var select = document.createElement("select");
    select.id = this._addUID("GPmousePosition" + coordType + "Direction");
    select.className = "GPmousePositionDirection";
    select.setAttribute("name", "direction");
    select.disabled = true;
    var option = document.createElement("option");
    option.value = coordType === "Lon" ? "E" : "N";
    option.innerHTML = coordType === "Lon" ? "E" : "N";
    select.appendChild(option);
    var option1 = document.createElement("option");
    option1.value = coordType === "Lon" ? "O" : "S";
    option1.innerHTML = coordType === "Lon" ? "O" : "S";
    select.appendChild(option1);
    list.push(select);
    return list;
  },

  /**
   * @param {Boolean} [display=false] - specifies if the coordinates panel must be displayed
   * @param {Boolean} [editCoordinates] - specifies if the coordinates edition is allowed
   * @param {Boolean} [currentProjectionUnits] - specifies if the current projection units
   *
   * @returns {DOMElement} container
   */
  _createMousePositionPanelBasicCoordinateElement: function _createMousePositionPanelBasicCoordinateElement(display, editCoordinates, currentProjectionUnits) {
    var div = document.createElement("div");
    div.id = this._addUID("GPmousePositionCoordinate");
    div.style.display = display ? "block" : "none"; // latitude

    var divLat = document.createElement("div");
    var spanLat = document.createElement("span");
    spanLat.className = "GPmousePositionLabel";
    spanLat.id = this._addUID("GPmousePositionLatLabel");
    spanLat.innerHTML = "Latitude : ";
    divLat.appendChild(spanLat);
    var span = document.createElement("span");
    span.id = this._addUID("GPmousePositionLatCoordinate");
    var arrayCoords;

    if (currentProjectionUnits === "DMS") {
      arrayCoords = this._createDMSCoordinateElement("Lat", editCoordinates);
    } else {
      arrayCoords = this._createCoordinateElement("Lat", editCoordinates);
    }

    for (var i = 0; i < arrayCoords.length; i++) {
      span.appendChild(arrayCoords[i]);
    }

    divLat.appendChild(span);
    div.appendChild(divLat); // longitude

    var divLon = document.createElement("div");
    var spanLon = document.createElement("span");
    spanLon.className = "GPmousePositionLabel";
    spanLon.id = this._addUID("GPmousePositionLonLabel");
    spanLon.innerHTML = "Longitude : ";
    divLon.appendChild(spanLon);
    var span1 = document.createElement("span");
    span1.id = this._addUID("GPmousePositionLonCoordinate");
    var arrayCoords1;

    if (currentProjectionUnits === "DMS") {
      arrayCoords1 = this._createDMSCoordinateElement("Lon", editCoordinates);
    } else {
      arrayCoords1 = this._createCoordinateElement("Lon", editCoordinates);
    }

    for (var j = 0; j < arrayCoords1.length; j++) {
      span1.appendChild(arrayCoords1[j]);
    }

    divLon.appendChild(span1);
    div.appendChild(divLon);
    return div;
  },

  /**
   * @param {Boolean} [display=false] - specifies if the altitude panel must be displayed
   *
   * @returns {DOMElement} container
   */
  _createMousePositionPanelBasicAltitudeElement: function _createMousePositionPanelBasicAltitudeElement(display) {
    var div = document.createElement("div");
    div.id = this._addUID("GPmousePositionAltitude");
    div.style.display = display ? "block" : "none";
    var spanLabel = document.createElement("span");
    spanLabel.className = "GPmousePositionLabel";
    spanLabel.innerHTML = "Altitude : ";
    div.appendChild(spanLabel);
    var spanAlt = document.createElement("span");
    spanAlt.className = "GPmousePositionCoords";
    spanAlt.id = this._addUID("GPmousePositionAlt");
    spanAlt.innerHTML = "...";
    div.appendChild(spanAlt);
    var spanUnits = document.createElement("span");
    spanUnits.className = "GPmousePositionAltitudeUnits";
    spanUnits.innerHTML = "m";
    div.appendChild(spanUnits);
    return div;
  },

  /**
   * @param {Boolean} [editCoordinates=false] - specifies if the coordinates edition is allowed
   *
   * @returns {DOMElement} container
   */
  _createMousePositionPanelEditToolsElement: function _createMousePositionPanelEditToolsElement(editCoordinates) {
    var context = this;
    var div = document.createElement("div");
    div.className = "GPmousePositionPanelEditTools";
    div.id = this._addUID("GPmousePositionPanelEditTools");

    if (!editCoordinates) {
      div.style.display = "none";
    }

    var span1 = document.createElement("span");
    span1.className = "GPmousePositionEditTool";
    span1.id = this._addUID("GPmousePositionLocate");
    span1.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";

    if (editCoordinates) {
      span1.addEventListener("click", function () {
        context.onMousePositionEditModeLocateClick();
      });
    }

    div.appendChild(span1);
    var span2 = document.createElement("span");
    span2.className = "GPmousePositionEditTool";
    span2.id = this._addUID("GPmousePositionCloseEdit");
    span2.title = "Quitter la saisie des coordonnées";
    span2.style.display = "none";

    if (editCoordinates) {
      span2.addEventListener("click", function () {
        context.onMousePositionEditModeClick(false);
      });
    }

    div.appendChild(span2);
    return div;
  },
  // ################################################################### //
  // #################### Settings container ########################### //
  // ################################################################### //

  /**
   * @param {Boolean} [display=false] - specifies if the settings panel must be displayed
   *
   * @returns {DOMElement[]} array containing input and label elements
   */
  _createShowMousePositionSettingsElement: function _createShowMousePositionSettingsElement(display) {
    var list = [];
    var context = this;
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = this._addUID("GPshowMousePositionSettings");
    var label = document.createElement("label");
    label.id = this._addUID("GPshowMousePositionSettingsPicto");
    label.htmlFor = this._addUID("GPshowMousePositionSettings");
    label.title = "Réglages";
    label.className = "GPshowMoreOptionsImage GPshowMoreOptions GPshowMousePositionSettingsPicto"; // FIXME classname and id ?

    label.style.display = display ? "block" : "none";

    if (label.addEventListener) {
      label.addEventListener("click", function (e) {
        if (typeof context.onShowMousePositionSettingsClick === "function") {
          context.onShowMousePositionSettingsClick(e);
        }
      }, false);
    } else if (label.attachEvent) {
      label.attachEvent("onclick", function (e) {
        if (typeof context.onShowMousePositionSettingsClick === "function") {
          context.onShowMousePositionSettingsClick(e);
        }
      });
    }

    list.push(input);
    list.push(label);
    return list;
  },

  /**
   * settings panel
   * @param {Boolean} [display=true] - specifies if the settings panel must be displayed
   *
   * FIXME
   * don't call this._createMousePositionSettingsSystemsElement
   * don't call this._createMousePositionSettingsUnitsElement
   *
   * @returns {DOMElement} DOM element
   */
  _createMousePositionSettingsElement: function _createMousePositionSettingsElement(display) {
    var container = document.createElement("div");
    container.id = this._addUID("GPmousePositionSettings");
    container.style.display = display === undefined || display ? "block" : "none";
    var span = document.createElement("span");
    span.className = "GPmousePositionSettingsLabel";
    span.innerHTML = "Système de référence";
    container.appendChild(span); // FIXME on decompose la fonction pour les besoins du controle,
    // on ajoutera ces childs à la main...
    // FIXME tableau statique !
    // var systems = [
    //     {
    //         code : "GEOGRAPHIC",
    //         label : "Géographique"
    //     },
    //     {
    //         code : "MERCATOR",
    //         label : "Mercator"
    //     },
    //     {
    //         code : "LAMB93",
    //         label : "Lambert 93"
    //     },
    //     {
    //         code : "LAMB2E",
    //         label : "Lambert II étendu"
    //     }
    // ];
    //
    // var selectSystem = this._createMousePositionSettingsSystemsElement(systems);
    //
    // container.appendChild(selectSystem);
    // FIXME on decompose la fonction pour les besoins du controle,
    // on ajoutera ces childs à la main...
    // FIXME tableau statique !
    // var units = [
    //     {
    //         code : "DEC",
    //         label : "degrés décimaux",
    //     },
    //     {
    //         code : "DMS",
    //         label : "degrés sexagésimaux",
    //     },
    //     {
    //         code : "RAD",
    //         label : "radians",
    //     },
    //     {
    //         code : "GON",
    //         label : "grades"
    //     }
    // ];
    //
    // var selectUnits = this._createMousePositionSettingsUnitsElement(units);
    //
    // container.appendChild(selectUnits);

    return container;
  },

  /**
   * @param {Object[]} systems - list of systems
   *
   * @returns {DOMElement} DOM element select
   */
  _createMousePositionSettingsSystemsElement: function _createMousePositionSettingsSystemsElement(systems) {
    // contexte d'execution
    var context = this;
    var selectSystem = document.createElement("select");
    selectSystem.id = this._addUID("GPmousePositionProjectionSystem");
    selectSystem.className = "GPinputSelect GPmousePositionSettingsSelect";
    selectSystem.addEventListener("change", function (e) {
      context.onMousePositionProjectionSystemChange(e);
    });
    selectSystem.addEventListener("mouseover", function (e) {
      // FIXME mettre une condition si target === option
      if (e.target.nodeName !== "OPTION") {
        context.onMousePositionProjectionSystemMouseOver(e);
      }
    });

    for (var i = 0; i < systems.length; i++) {
      var obj = systems[i];
      var option = document.createElement("option");
      option.value = obj.code;
      option.text = obj.label || i; // option.label = obj.label;

      selectSystem.appendChild(option);
    }

    return selectSystem;
  },

  /**
   * @param {Object[]} units - list of units
   *
   * @returns {DOMElement} DOM element select
   */
  _createMousePositionSettingsUnitsElement: function _createMousePositionSettingsUnitsElement(units) {
    // contexte d'execution
    var context = this;
    var selectUnits = document.createElement("select");
    selectUnits.id = this._addUID("GPmousePositionProjectionUnits");
    selectUnits.className = "GPinputSelect GPmousePositionSettingsSelect";
    selectUnits.addEventListener("change", function (e) {
      context.onMousePositionProjectionUnitsChange(e);
    });

    for (var j = 0; j < units.length; j++) {
      var obj = units[j];
      var option = document.createElement("option");
      option.value = obj.code ? obj.code : j;
      option.text = obj.label || j; // option.label = obj.label;

      selectUnits.appendChild(option);
    }

    return selectUnits;
  },

  /**
   * @param {String} [currentProjectionType="Metric"] - "Geographical" or "Metric"
   */
  _resetLabelElements: function _resetLabelElements(currentProjectionType) {
    // Changement des labels dans le formulaire de saisie
    var spanLat = document.getElementById(this._addUID("GPmousePositionLatLabel"));
    spanLat.innerHTML = currentProjectionType === "Geographical" ? "Latitude :" : "X :";
    var spanLon = document.getElementById(this._addUID("GPmousePositionLonLabel"));
    spanLon.innerHTML = currentProjectionType === "Geographical" ? "Longitude :" : "Y :";
  },

  /**
   * @param {String} currentProjectionUnits - projection units
   */
  _resetUnitElements: function _resetUnitElements(currentProjectionUnits) {
    var value = "";

    if (currentProjectionUnits === "M" || currentProjectionUnits === "KM") {
      value = currentProjectionUnits.toLowerCase();
    }

    var elts = document.getElementsByClassName("GPmousePositionUnits");

    for (var e = 0; e < elts.length; e++) {
      elts[e].innerHTML = value;
    }
  },

  /**
   * @param {Boolean} editCoordinates - edit coordinates option
   * @param {String} currentProjectionType - current projection type
   * @param {String} currentProjectionUnits - current projection unit
   */
  _resetCoordinateElements: function _resetCoordinateElements(editCoordinates, currentProjectionType, currentProjectionUnits) {
    // Suppression de tous les enfants de GPmousePositionLatCoordinate
    var latElt = document.getElementById(this._addUID("GPmousePositionLatCoordinate"));

    while (latElt.firstChild) {
      latElt.removeChild(latElt.firstChild);
    }

    var arrayCoords;

    if (currentProjectionUnits === "DMS") {
      arrayCoords = this._createDMSCoordinateElement("Lat", editCoordinates);
    } else {
      arrayCoords = this._createCoordinateElement("Lat", editCoordinates);
    }

    for (var i = 0; i < arrayCoords.length; i++) {
      latElt.appendChild(arrayCoords[i]);
    } // Suppression de tous les enfants de GPmousePositionLonCoordinate


    var lonElt = document.getElementById(this._addUID("GPmousePositionLonCoordinate"));

    while (lonElt.firstChild) {
      lonElt.removeChild(lonElt.firstChild);
    }

    var arrayCoords1;

    if (currentProjectionUnits === "DMS") {
      arrayCoords1 = this._createDMSCoordinateElement("Lon", editCoordinates);
    } else {
      arrayCoords1 = this._createCoordinateElement("Lon", editCoordinates);
    }

    for (var j = 0; j < arrayCoords1.length; j++) {
      lonElt.appendChild(arrayCoords1[j]);
    } // FIXME on simule un deplacement ?
    // this.onMapMove();

  },

  /**
   * Set/unset editing mode
   *
   * @param {Boolean} editing - active edit coordinates mode
   */
  _setEditMode: function _setEditMode(editing) {
    var locateElt = document.getElementById(this._addUID("GPmousePositionLocate"));
    locateElt.title = editing ? "Aller à la position ..." : "Cliquer pour saisir des coordonnées";
    var closeEditElt = document.getElementById(this._addUID("GPmousePositionCloseEdit"));
    closeEditElt.style.display = editing ? "inline-block" : "none";
    var selector = "div[id^=" + this._addUID("GPmousePositionCoordinate") + "]";
    var inputs = document.querySelectorAll(selector + " input");

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = !editing;

      if (editing) {
        inputs[i].value = "";
        inputs[i].classList.remove("error");
      }
    }

    var selects = document.querySelectorAll(selector + " select");

    for (var j = 0; j < selects.length; j++) {
      selects[j].disabled = !editing;
    }
  },

  /**
   *
   * @param {DOMElement} input - input element
   * @param {Boolean} isFloat - check for float value
   *
   * @returns {Boolean} true if input value is within bounds
   */
  _checkDMSElement: function _checkDMSElement(input, isFloat) {
    var b = isFloat !== undefined;
    var value = input.value;

    if (b) {
      value = value.replace(",", ".");
    }

    if (isNaN(value)) {
      return false;
    }

    var v = parseFloat(value);

    if (!b && (v | 0) !== v) {
      // is it an integer
      return false;
    }

    var min = Number(input.dataset.min);
    var max = Number(input.dataset.max);
    return v >= min && v <= max;
  },

  /**
   * @param {String} coordType - "Lon" or "Lat"
   * @param {DOMElement} input - input element
   *
   * @returns {Boolean} true if input value is within bounds
   */
  _checkDMSDegrees: function _checkDMSDegrees(coordType, input) {
    if (isNaN(input.value)) {
      return false;
    }

    var v = parseFloat(input.value);

    if ((v | 0) !== v) {
      // is it an integer
      return false;
    }

    var min = Number(input.dataset.min);
    var max = Number(input.dataset.max);

    if (v < min || v > max) {
      return false;
    }

    var inputMinutes = document.getElementById(this._addUID("GPmousePosition" + coordType + "Minutes"));
    var inputSeconds = document.getElementById(this._addUID("GPmousePosition" + coordType + "Seconds"));

    if (v >= max) {
      inputMinutes.dataset.max = 0;
      inputSeconds.dataset.max = 0;
    } else {
      inputMinutes.dataset.max = 59;
      inputSeconds.dataset.max = 59.9999;
    }

    return true;
  },
  // ################################################################### //
  // ####################### handlers Event ############################ //
  // ################################################################### //

  /**
   * Function displaying coordinates from cursor position (desktop)
   * or map center (tactile)
   * @param {Object} coordinate - coordinates
   */
  GPdisplayCoords: function GPdisplayCoords(coordinate) {
    // Compute coords in case of cursor position (desktop)
    if (coordinate) {
      var labelLon = document.getElementById(this._addUID("GPmousePositionLonLabel"));
      var labelLat = document.getElementById(this._addUID("GPmousePositionLatLabel"));

      if (coordinate.x || coordinate.y) {
        labelLat.innerHTML = "X : ";
        labelLon.innerHTML = "Y : ";
      } else if (coordinate.e || coordinate.n) {
        labelLat.innerHTML = "E : ";
        labelLon.innerHTML = "N : ";
      } else {
        labelLat.innerHTML = "Latitude : ";
        labelLon.innerHTML = "Longitude : ";
      }

      if (_typeof(coordinate.lat) === "object" && _typeof(coordinate.lng) === "object") {
        var parts = {
          lng: "Lon",
          lat: "Lat"
        };
        var units = ["Degrees", "Minutes", "Seconds"];

        for (var p in parts) {
          for (var u = 0; u < units.length; ++u) {
            var selector = "GPmousePosition" + parts[p] + units[u];
            var elt = document.getElementById(this._addUID(selector));
            var key = units[u].charAt(0).toLowerCase();
            elt.value = coordinate[p][key];
          }
        } // directions


        document.getElementById(this._addUID("GPmousePositionLonDirection")).value = coordinate.lng.direction;
        document.getElementById(this._addUID("GPmousePositionLatDirection")).value = coordinate.lat.direction;
      } else {
        var elLat = document.getElementById(this._addUID("GPmousePositionLat"));
        var elLon = document.getElementById(this._addUID("GPmousePositionLon"));
        elLat.value = coordinate.x || coordinate.lat || coordinate.e || "0";
        elLon.value = coordinate.y || coordinate.lng || coordinate.lon || coordinate.n || "0"; // les unites

        var unit = coordinate.unit === undefined ? "" : coordinate.unit;
        var elements = document.getElementsByClassName("GPmousePositionUnits");

        for (var n = 0; n < elements.length; ++n) {
          elements[n].innerHTML = unit;
        }
      }
    }
  },

  /**
   * Function displaying altitude from cursor position (desktop)
   * or map center (tactile)
   * @param {Object} coordinate - coordinates
   * @param {Number} altitudeTimeoutDelay - when the mouse stop moving, delay before the altitude request is launched
   * @param {Number} noDataValue - the no data value
   * @param {Number} noDataValueTolerance - the no data value tolerance
   */
  GPdisplayElevation: function GPdisplayElevation(coordinate, altitudeTimeoutDelay, noDataValue, noDataValueTolerance) {
    // contexte d'execution
    var self = this; // Latency for altitude request

    var altitudeTimeout;

    if (!altitudeTimeoutDelay) {
      altitudeTimeoutDelay = 500;
    }

    clearTimeout(altitudeTimeout);
    document.getElementById(this._addUID("GPmousePositionAlt")).innerHTML = "...";

    if (noDataValue == null) {
      noDataValue = -99999;
    }

    if (noDataValueTolerance == null) {
      noDataValueTolerance = 99980;
    }

    var maxThreshold = noDataValue + noDataValueTolerance;
    var minThreshold = noDataValue - noDataValueTolerance; // Compute coords in case of cursor position (desktop)

    if (coordinate) {
      // If no altitude panel, don't call altitude request
      if (document.getElementById(this._addUID("GPmousePositionAltitude"))) {
        altitudeTimeout = setTimeout(function () {
          self.onRequestAltitude(coordinate, function (z) {
            if (minThreshold < z && z < maxThreshold) {
              self.GPresetElevation();
            } else {
              document.getElementById(self._addUID("GPmousePositionAlt")).innerHTML = z;
            }
          });
        }, altitudeTimeoutDelay);
      }
    }
  },

  /**
   * Function reseting altitude value
   */
  GPresetElevation: function GPresetElevation() {
    if (document.getElementById(this._addUID("GPmousePositionAltitude"))) {
      document.getElementById(this._addUID("GPmousePositionAlt")).innerHTML = "---";
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (MousePositionDOM);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var proj4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97);
/* harmony import */ var proj4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proj4__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var proj4leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99);
/* harmony import */ var proj4leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(proj4leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(100);
/* harmony import */ var _EPSG2154__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(101);
/* harmony import */ var _EPSG27572__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(102);
/* harmony import */ var _EPSG4326__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(103);






/** autoload function */

(function () {
  // load all defs into proj4
  _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__["default"].load(proj4__WEBPACK_IMPORTED_MODULE_0___default.a);
})();
/**
 * CRS (Coordinate Reference Systems) Factory to create <a href="http://kartena.github.io/Proj4Leaflet/api/#l-proj-crs" target="_blank">L.Proj.CRS</a> instances.
 *
 * @module CRS
 * @alias L.geoportalCRS
 * @abstract
 * @example
 *  var map = L.Map('divmap', {
 *    crs : L.geoportalCRS.EPSG2154
 *  }).setView();
 *
 *  var lyr = L.geoportalLayer.WMTS(
 *    {
 *      layer : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
 *    },
 *    {
 *      opacity : 1,
 *      transparent : true,
 *      minZoom : 1,
 *      maxZoom : 21
 *      ...
 *    });
 *
 *  lyr.addTo(map); // ou map.addLayer(lyr);
 */

/** @type {L.geoportalCRS} */


var CRS = {
  /**
   * Lambert 93 ("EPSG:2154") CRS definition to be used with Leaflet.
   *
   * @method EPSG2154
   * @static
   * @alias L.geoportalCRS.EPSG2154
   * @returns {EPSG2154} epsg code
   */
  EPSG2154: function EPSG2154() {
    return _EPSG2154__WEBPACK_IMPORTED_MODULE_3__["default"].build();
  },

  /**
   * CRS : Lambert 2 extened
   *
   * @method EPSG27572
   * @static
   * @alias L.geoportalCRS.EPSG27572
   * @returns {EPSG27572} epsg code
   */
  EPSG27572: function EPSG27572() {
    return _EPSG27572__WEBPACK_IMPORTED_MODULE_4__["default"].build();
  },

  /**
   * CRS : EPSG4326
   *
   * @ignore
   * @method EPSG4326
   * @static
   * @alias L.geoportalCRS.EPSG4326
   * @returns {EPSG4326} epsg code
   */
  EPSG4326: function EPSG4326() {
    return _EPSG4326__WEBPACK_IMPORTED_MODULE_5__["default"].build();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (CRS); // Expose CRS as L.geoportalCRS (for a build bundle)

if (window.L) {
  window.L.geoportalCRS = CRS;
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["proj4"] = __webpack_require__(98);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(50)))

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? module.exports = factory() :
    undefined;
}(this, (function () { 'use strict';

    var globals = function(defs) {
      defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
      defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
      defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");

      defs.WGS84 = defs['EPSG:4326'];
      defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
      defs.GOOGLE = defs['EPSG:3857'];
      defs['EPSG:900913'] = defs['EPSG:3857'];
      defs['EPSG:102113'] = defs['EPSG:3857'];
    };

    var PJD_3PARAM = 1;
    var PJD_7PARAM = 2;
    var PJD_GRIDSHIFT = 3;
    var PJD_WGS84 = 4; // WGS84 or equivalent
    var PJD_NODATUM = 5; // WGS84 or equivalent
    var SRS_WGS84_SEMIMAJOR = 6378137.0;  // only used in grid shift transforms
    var SRS_WGS84_SEMIMINOR = 6356752.314;  // only used in grid shift transforms
    var SRS_WGS84_ESQUARED = 0.0066943799901413165; // only used in grid shift transforms
    var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
    var HALF_PI = Math.PI/2;
    // ellipoid pj_set_ell.c
    var SIXTH = 0.1666666666666666667;
    /* 1/6 */
    var RA4 = 0.04722222222222222222;
    /* 17/360 */
    var RA6 = 0.02215608465608465608;
    var EPSLN = 1.0e-10;
    // you'd think you could use Number.EPSILON above but that makes
    // Mollweide get into an infinate loop.

    var D2R = 0.01745329251994329577;
    var R2D = 57.29577951308232088;
    var FORTPI = Math.PI/4;
    var TWO_PI = Math.PI * 2;
    // SPI is slightly greater than Math.PI, so values that exceed the -180..180
    // degree range by a tiny amount don't get wrapped. This prevents points that
    // have drifted from their original location along the 180th meridian (due to
    // floating point error) from changing their sign.
    var SPI = 3.14159265359;

    var exports$1 = {};
    exports$1.greenwich = 0.0; //"0dE",
    exports$1.lisbon = -9.131906111111; //"9d07'54.862\"W",
    exports$1.paris = 2.337229166667; //"2d20'14.025\"E",
    exports$1.bogota = -74.080916666667; //"74d04'51.3\"W",
    exports$1.madrid = -3.687938888889; //"3d41'16.58\"W",
    exports$1.rome = 12.452333333333; //"12d27'8.4\"E",
    exports$1.bern = 7.439583333333; //"7d26'22.5\"E",
    exports$1.jakarta = 106.807719444444; //"106d48'27.79\"E",
    exports$1.ferro = -17.666666666667; //"17d40'W",
    exports$1.brussels = 4.367975; //"4d22'4.71\"E",
    exports$1.stockholm = 18.058277777778; //"18d3'29.8\"E",
    exports$1.athens = 23.7163375; //"23d42'58.815\"E",
    exports$1.oslo = 10.722916666667; //"10d43'22.5\"E"

    var units = {
      ft: {to_meter: 0.3048},
      'us-ft': {to_meter: 1200 / 3937}
    };

    var ignoredChar = /[\s_\-\/\(\)]/g;
    function match(obj, key) {
      if (obj[key]) {
        return obj[key];
      }
      var keys = Object.keys(obj);
      var lkey = key.toLowerCase().replace(ignoredChar, '');
      var i = -1;
      var testkey, processedKey;
      while (++i < keys.length) {
        testkey = keys[i];
        processedKey = testkey.toLowerCase().replace(ignoredChar, '');
        if (processedKey === lkey) {
          return obj[testkey];
        }
      }
    }

    var parseProj = function(defData) {
      var self = {};
      var paramObj = defData.split('+').map(function(v) {
        return v.trim();
      }).filter(function(a) {
        return a;
      }).reduce(function(p, a) {
        var split = a.split('=');
        split.push(true);
        p[split[0].toLowerCase()] = split[1];
        return p;
      }, {});
      var paramName, paramVal, paramOutname;
      var params = {
        proj: 'projName',
        datum: 'datumCode',
        rf: function(v) {
          self.rf = parseFloat(v);
        },
        lat_0: function(v) {
          self.lat0 = v * D2R;
        },
        lat_1: function(v) {
          self.lat1 = v * D2R;
        },
        lat_2: function(v) {
          self.lat2 = v * D2R;
        },
        lat_ts: function(v) {
          self.lat_ts = v * D2R;
        },
        lon_0: function(v) {
          self.long0 = v * D2R;
        },
        lon_1: function(v) {
          self.long1 = v * D2R;
        },
        lon_2: function(v) {
          self.long2 = v * D2R;
        },
        alpha: function(v) {
          self.alpha = parseFloat(v) * D2R;
        },
        gamma: function(v) {
          self.rectified_grid_angle = parseFloat(v);
        },
        lonc: function(v) {
          self.longc = v * D2R;
        },
        x_0: function(v) {
          self.x0 = parseFloat(v);
        },
        y_0: function(v) {
          self.y0 = parseFloat(v);
        },
        k_0: function(v) {
          self.k0 = parseFloat(v);
        },
        k: function(v) {
          self.k0 = parseFloat(v);
        },
        a: function(v) {
          self.a = parseFloat(v);
        },
        b: function(v) {
          self.b = parseFloat(v);
        },
        r_a: function() {
          self.R_A = true;
        },
        zone: function(v) {
          self.zone = parseInt(v, 10);
        },
        south: function() {
          self.utmSouth = true;
        },
        towgs84: function(v) {
          self.datum_params = v.split(",").map(function(a) {
            return parseFloat(a);
          });
        },
        to_meter: function(v) {
          self.to_meter = parseFloat(v);
        },
        units: function(v) {
          self.units = v;
          var unit = match(units, v);
          if (unit) {
            self.to_meter = unit.to_meter;
          }
        },
        from_greenwich: function(v) {
          self.from_greenwich = v * D2R;
        },
        pm: function(v) {
          var pm = match(exports$1, v);
          self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R;
        },
        nadgrids: function(v) {
          if (v === '@null') {
            self.datumCode = 'none';
          }
          else {
            self.nadgrids = v;
          }
        },
        axis: function(v) {
          var legalAxis = "ewnsud";
          if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
            self.axis = v;
          }
        },
        approx: function() {
          self.approx = true;
        }
      };
      for (paramName in paramObj) {
        paramVal = paramObj[paramName];
        if (paramName in params) {
          paramOutname = params[paramName];
          if (typeof paramOutname === 'function') {
            paramOutname(paramVal);
          }
          else {
            self[paramOutname] = paramVal;
          }
        }
        else {
          self[paramName] = paramVal;
        }
      }
      if(typeof self.datumCode === 'string' && self.datumCode !== "WGS84"){
        self.datumCode = self.datumCode.toLowerCase();
      }
      return self;
    };

    var NEUTRAL = 1;
    var KEYWORD = 2;
    var NUMBER = 3;
    var QUOTED = 4;
    var AFTERQUOTE = 5;
    var ENDED = -1;
    var whitespace = /\s/;
    var latin = /[A-Za-z]/;
    var keyword = /[A-Za-z84]/;
    var endThings = /[,\]]/;
    var digets = /[\d\.E\-\+]/;
    // const ignoredChar = /[\s_\-\/\(\)]/g;
    function Parser(text) {
      if (typeof text !== 'string') {
        throw new Error('not a string');
      }
      this.text = text.trim();
      this.level = 0;
      this.place = 0;
      this.root = null;
      this.stack = [];
      this.currentObject = null;
      this.state = NEUTRAL;
    }
    Parser.prototype.readCharicter = function() {
      var char = this.text[this.place++];
      if (this.state !== QUOTED) {
        while (whitespace.test(char)) {
          if (this.place >= this.text.length) {
            return;
          }
          char = this.text[this.place++];
        }
      }
      switch (this.state) {
        case NEUTRAL:
          return this.neutral(char);
        case KEYWORD:
          return this.keyword(char)
        case QUOTED:
          return this.quoted(char);
        case AFTERQUOTE:
          return this.afterquote(char);
        case NUMBER:
          return this.number(char);
        case ENDED:
          return;
      }
    };
    Parser.prototype.afterquote = function(char) {
      if (char === '"') {
        this.word += '"';
        this.state = QUOTED;
        return;
      }
      if (endThings.test(char)) {
        this.word = this.word.trim();
        this.afterItem(char);
        return;
      }
      throw new Error('havn\'t handled "' +char + '" in afterquote yet, index ' + this.place);
    };
    Parser.prototype.afterItem = function(char) {
      if (char === ',') {
        if (this.word !== null) {
          this.currentObject.push(this.word);
        }
        this.word = null;
        this.state = NEUTRAL;
        return;
      }
      if (char === ']') {
        this.level--;
        if (this.word !== null) {
          this.currentObject.push(this.word);
          this.word = null;
        }
        this.state = NEUTRAL;
        this.currentObject = this.stack.pop();
        if (!this.currentObject) {
          this.state = ENDED;
        }

        return;
      }
    };
    Parser.prototype.number = function(char) {
      if (digets.test(char)) {
        this.word += char;
        return;
      }
      if (endThings.test(char)) {
        this.word = parseFloat(this.word);
        this.afterItem(char);
        return;
      }
      throw new Error('havn\'t handled "' +char + '" in number yet, index ' + this.place);
    };
    Parser.prototype.quoted = function(char) {
      if (char === '"') {
        this.state = AFTERQUOTE;
        return;
      }
      this.word += char;
      return;
    };
    Parser.prototype.keyword = function(char) {
      if (keyword.test(char)) {
        this.word += char;
        return;
      }
      if (char === '[') {
        var newObjects = [];
        newObjects.push(this.word);
        this.level++;
        if (this.root === null) {
          this.root = newObjects;
        } else {
          this.currentObject.push(newObjects);
        }
        this.stack.push(this.currentObject);
        this.currentObject = newObjects;
        this.state = NEUTRAL;
        return;
      }
      if (endThings.test(char)) {
        this.afterItem(char);
        return;
      }
      throw new Error('havn\'t handled "' +char + '" in keyword yet, index ' + this.place);
    };
    Parser.prototype.neutral = function(char) {
      if (latin.test(char)) {
        this.word = char;
        this.state = KEYWORD;
        return;
      }
      if (char === '"') {
        this.word = '';
        this.state = QUOTED;
        return;
      }
      if (digets.test(char)) {
        this.word = char;
        this.state = NUMBER;
        return;
      }
      if (endThings.test(char)) {
        this.afterItem(char);
        return;
      }
      throw new Error('havn\'t handled "' +char + '" in neutral yet, index ' + this.place);
    };
    Parser.prototype.output = function() {
      while (this.place < this.text.length) {
        this.readCharicter();
      }
      if (this.state === ENDED) {
        return this.root;
      }
      throw new Error('unable to parse string "' +this.text + '". State is ' + this.state);
    };

    function parseString(txt) {
      var parser = new Parser(txt);
      return parser.output();
    }

    function mapit(obj, key, value) {
      if (Array.isArray(key)) {
        value.unshift(key);
        key = null;
      }
      var thing = key ? {} : obj;

      var out = value.reduce(function(newObj, item) {
        sExpr(item, newObj);
        return newObj
      }, thing);
      if (key) {
        obj[key] = out;
      }
    }

    function sExpr(v, obj) {
      if (!Array.isArray(v)) {
        obj[v] = true;
        return;
      }
      var key = v.shift();
      if (key === 'PARAMETER') {
        key = v.shift();
      }
      if (v.length === 1) {
        if (Array.isArray(v[0])) {
          obj[key] = {};
          sExpr(v[0], obj[key]);
          return;
        }
        obj[key] = v[0];
        return;
      }
      if (!v.length) {
        obj[key] = true;
        return;
      }
      if (key === 'TOWGS84') {
        obj[key] = v;
        return;
      }
      if (key === 'AXIS') {
        if (!(key in obj)) {
          obj[key] = [];
        }
        obj[key].push(v);
        return;
      }
      if (!Array.isArray(key)) {
        obj[key] = {};
      }

      var i;
      switch (key) {
        case 'UNIT':
        case 'PRIMEM':
        case 'VERT_DATUM':
          obj[key] = {
            name: v[0].toLowerCase(),
            convert: v[1]
          };
          if (v.length === 3) {
            sExpr(v[2], obj[key]);
          }
          return;
        case 'SPHEROID':
        case 'ELLIPSOID':
          obj[key] = {
            name: v[0],
            a: v[1],
            rf: v[2]
          };
          if (v.length === 4) {
            sExpr(v[3], obj[key]);
          }
          return;
        case 'PROJECTEDCRS':
        case 'PROJCRS':
        case 'GEOGCS':
        case 'GEOCCS':
        case 'PROJCS':
        case 'LOCAL_CS':
        case 'GEODCRS':
        case 'GEODETICCRS':
        case 'GEODETICDATUM':
        case 'EDATUM':
        case 'ENGINEERINGDATUM':
        case 'VERT_CS':
        case 'VERTCRS':
        case 'VERTICALCRS':
        case 'COMPD_CS':
        case 'COMPOUNDCRS':
        case 'ENGINEERINGCRS':
        case 'ENGCRS':
        case 'FITTED_CS':
        case 'LOCAL_DATUM':
        case 'DATUM':
          v[0] = ['name', v[0]];
          mapit(obj, key, v);
          return;
        default:
          i = -1;
          while (++i < v.length) {
            if (!Array.isArray(v[i])) {
              return sExpr(v, obj[key]);
            }
          }
          return mapit(obj, key, v);
      }
    }

    var D2R$1 = 0.01745329251994329577;
    function rename(obj, params) {
      var outName = params[0];
      var inName = params[1];
      if (!(outName in obj) && (inName in obj)) {
        obj[outName] = obj[inName];
        if (params.length === 3) {
          obj[outName] = params[2](obj[outName]);
        }
      }
    }

    function d2r(input) {
      return input * D2R$1;
    }

    function cleanWKT(wkt) {
      if (wkt.type === 'GEOGCS') {
        wkt.projName = 'longlat';
      } else if (wkt.type === 'LOCAL_CS') {
        wkt.projName = 'identity';
        wkt.local = true;
      } else {
        if (typeof wkt.PROJECTION === 'object') {
          wkt.projName = Object.keys(wkt.PROJECTION)[0];
        } else {
          wkt.projName = wkt.PROJECTION;
        }
      }
      if (wkt.AXIS) {
        var axisOrder = '';
        for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
          var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];
          if (axis[0].indexOf('north') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'north')) {
            axisOrder += 'n';
          } else if (axis[0].indexOf('south') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'south')) {
            axisOrder += 's';
          } else if (axis[0].indexOf('east') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'east')) {
            axisOrder += 'e';
          } else if (axis[0].indexOf('west') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'west')) {
            axisOrder += 'w';
          }
        }
        if (axisOrder.length === 2) {
          axisOrder += 'u';
        }
        if (axisOrder.length === 3) {
          wkt.axis = axisOrder;
        }
      }
      if (wkt.UNIT) {
        wkt.units = wkt.UNIT.name.toLowerCase();
        if (wkt.units === 'metre') {
          wkt.units = 'meter';
        }
        if (wkt.UNIT.convert) {
          if (wkt.type === 'GEOGCS') {
            if (wkt.DATUM && wkt.DATUM.SPHEROID) {
              wkt.to_meter = wkt.UNIT.convert*wkt.DATUM.SPHEROID.a;
            }
          } else {
            wkt.to_meter = wkt.UNIT.convert;
          }
        }
      }
      var geogcs = wkt.GEOGCS;
      if (wkt.type === 'GEOGCS') {
        geogcs = wkt;
      }
      if (geogcs) {
        //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
        //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
        //}
        if (geogcs.DATUM) {
          wkt.datumCode = geogcs.DATUM.name.toLowerCase();
        } else {
          wkt.datumCode = geogcs.name.toLowerCase();
        }
        if (wkt.datumCode.slice(0, 2) === 'd_') {
          wkt.datumCode = wkt.datumCode.slice(2);
        }
        if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
          wkt.datumCode = 'nzgd49';
        }
        if (wkt.datumCode === 'wgs_1984' || wkt.datumCode === 'world_geodetic_system_1984') {
          if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
            wkt.sphere = true;
          }
          wkt.datumCode = 'wgs84';
        }
        if (wkt.datumCode.slice(-6) === '_ferro') {
          wkt.datumCode = wkt.datumCode.slice(0, - 6);
        }
        if (wkt.datumCode.slice(-8) === '_jakarta') {
          wkt.datumCode = wkt.datumCode.slice(0, - 8);
        }
        if (~wkt.datumCode.indexOf('belge')) {
          wkt.datumCode = 'rnb72';
        }
        if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
          wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
          if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {
            wkt.ellps = 'intl';
          }

          wkt.a = geogcs.DATUM.SPHEROID.a;
          wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
        }

        if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
          wkt.datum_params = geogcs.DATUM.TOWGS84;
        }
        if (~wkt.datumCode.indexOf('osgb_1936')) {
          wkt.datumCode = 'osgb36';
        }
        if (~wkt.datumCode.indexOf('osni_1952')) {
          wkt.datumCode = 'osni52';
        }
        if (~wkt.datumCode.indexOf('tm65')
          || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
          wkt.datumCode = 'ire65';
        }
        if (wkt.datumCode === 'ch1903+') {
          wkt.datumCode = 'ch1903';
        }
        if (~wkt.datumCode.indexOf('israel')) {
          wkt.datumCode = 'isr93';
        }
      }
      if (wkt.b && !isFinite(wkt.b)) {
        wkt.b = wkt.a;
      }

      function toMeter(input) {
        var ratio = wkt.to_meter || 1;
        return input * ratio;
      }
      var renamer = function(a) {
        return rename(wkt, a);
      };
      var list = [
        ['standard_parallel_1', 'Standard_Parallel_1'],
        ['standard_parallel_1', 'Latitude of 1st standard parallel'],
        ['standard_parallel_2', 'Standard_Parallel_2'],
        ['standard_parallel_2', 'Latitude of 2nd standard parallel'],
        ['false_easting', 'False_Easting'],
        ['false_easting', 'False easting'],
        ['false-easting', 'Easting at false origin'],
        ['false_northing', 'False_Northing'],
        ['false_northing', 'False northing'],
        ['false_northing', 'Northing at false origin'],
        ['central_meridian', 'Central_Meridian'],
        ['central_meridian', 'Longitude of natural origin'],
        ['central_meridian', 'Longitude of false origin'],
        ['latitude_of_origin', 'Latitude_Of_Origin'],
        ['latitude_of_origin', 'Central_Parallel'],
        ['latitude_of_origin', 'Latitude of natural origin'],
        ['latitude_of_origin', 'Latitude of false origin'],
        ['scale_factor', 'Scale_Factor'],
        ['k0', 'scale_factor'],
        ['latitude_of_center', 'Latitude_Of_Center'],
        ['latitude_of_center', 'Latitude_of_center'],
        ['lat0', 'latitude_of_center', d2r],
        ['longitude_of_center', 'Longitude_Of_Center'],
        ['longitude_of_center', 'Longitude_of_center'],
        ['longc', 'longitude_of_center', d2r],
        ['x0', 'false_easting', toMeter],
        ['y0', 'false_northing', toMeter],
        ['long0', 'central_meridian', d2r],
        ['lat0', 'latitude_of_origin', d2r],
        ['lat0', 'standard_parallel_1', d2r],
        ['lat1', 'standard_parallel_1', d2r],
        ['lat2', 'standard_parallel_2', d2r],
        ['azimuth', 'Azimuth'],
        ['alpha', 'azimuth', d2r],
        ['srsCode', 'name']
      ];
      list.forEach(renamer);
      if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {
        wkt.long0 = wkt.longc;
      }
      if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {
        wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
        wkt.lat_ts = wkt.lat1;
      }
    }
    var wkt = function(wkt) {
      var lisp = parseString(wkt);
      var type = lisp.shift();
      var name = lisp.shift();
      lisp.unshift(['name', name]);
      lisp.unshift(['type', type]);
      var obj = {};
      sExpr(lisp, obj);
      cleanWKT(obj);
      return obj;
    };

    function defs(name) {
      /*global console*/
      var that = this;
      if (arguments.length === 2) {
        var def = arguments[1];
        if (typeof def === 'string') {
          if (def.charAt(0) === '+') {
            defs[name] = parseProj(arguments[1]);
          }
          else {
            defs[name] = wkt(arguments[1]);
          }
        } else {
          defs[name] = def;
        }
      }
      else if (arguments.length === 1) {
        if (Array.isArray(name)) {
          return name.map(function(v) {
            if (Array.isArray(v)) {
              defs.apply(that, v);
            }
            else {
              defs(v);
            }
          });
        }
        else if (typeof name === 'string') {
          if (name in defs) {
            return defs[name];
          }
        }
        else if ('EPSG' in name) {
          defs['EPSG:' + name.EPSG] = name;
        }
        else if ('ESRI' in name) {
          defs['ESRI:' + name.ESRI] = name;
        }
        else if ('IAU2000' in name) {
          defs['IAU2000:' + name.IAU2000] = name;
        }
        else {
          console.log(name);
        }
        return;
      }


    }
    globals(defs);

    function testObj(code){
      return typeof code === 'string';
    }
    function testDef(code){
      return code in defs;
    }
    var codeWords = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS','GEOCCS','PROJCS','LOCAL_CS', 'GEODCRS', 'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];
    function testWKT(code){
      return codeWords.some(function (word) {
        return code.indexOf(word) > -1;
      });
    }
    var codes = ['3857', '900913', '3785', '102113'];
    function checkMercator(item) {
      var auth = match(item, 'authority');
      if (!auth) {
        return;
      }
      var code = match(auth, 'epsg');
      return code && codes.indexOf(code) > -1;
    }
    function checkProjStr(item) {
      var ext = match(item, 'extension');
      if (!ext) {
        return;
      }
      return match(ext, 'proj4');
    }
    function testProj(code){
      return code[0] === '+';
    }
    function parse(code){
      if (testObj(code)) {
        //check to see if this is a WKT string
        if (testDef(code)) {
          return defs[code];
        }
        if (testWKT(code)) {
          var out = wkt(code);
          // test of spetial case, due to this being a very common and often malformed
          if (checkMercator(out)) {
            return defs['EPSG:3857'];
          }
          var maybeProjStr = checkProjStr(out);
          if (maybeProjStr) {
            return parseProj(maybeProjStr);
          }
          return out;
        }
        if (testProj(code)) {
          return parseProj(code);
        }
      }else{
        return code;
      }
    }

    var extend = function(destination, source) {
      destination = destination || {};
      var value, property;
      if (!source) {
        return destination;
      }
      for (property in source) {
        value = source[property];
        if (value !== undefined) {
          destination[property] = value;
        }
      }
      return destination;
    };

    var msfnz = function(eccent, sinphi, cosphi) {
      var con = eccent * sinphi;
      return cosphi / (Math.sqrt(1 - con * con));
    };

    var sign = function(x) {
      return x<0 ? -1 : 1;
    };

    var adjust_lon = function(x) {
      return (Math.abs(x) <= SPI) ? x : (x - (sign(x) * TWO_PI));
    };

    var tsfnz = function(eccent, phi, sinphi) {
      var con = eccent * sinphi;
      var com = 0.5 * eccent;
      con = Math.pow(((1 - con) / (1 + con)), com);
      return (Math.tan(0.5 * (HALF_PI - phi)) / con);
    };

    var phi2z = function(eccent, ts) {
      var eccnth = 0.5 * eccent;
      var con, dphi;
      var phi = HALF_PI - 2 * Math.atan(ts);
      for (var i = 0; i <= 15; i++) {
        con = eccent * Math.sin(phi);
        dphi = HALF_PI - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
        phi += dphi;
        if (Math.abs(dphi) <= 0.0000000001) {
          return phi;
        }
      }
      //console.log("phi2z has NoConvergence");
      return -9999;
    };

    function init() {
      var con = this.b / this.a;
      this.es = 1 - con * con;
      if(!('x0' in this)){
        this.x0 = 0;
      }
      if(!('y0' in this)){
        this.y0 = 0;
      }
      this.e = Math.sqrt(this.es);
      if (this.lat_ts) {
        if (this.sphere) {
          this.k0 = Math.cos(this.lat_ts);
        }
        else {
          this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
        }
      }
      else {
        if (!this.k0) {
          if (this.k) {
            this.k0 = this.k;
          }
          else {
            this.k0 = 1;
          }
        }
      }
    }

    /* Mercator forward equations--mapping lat,long to x,y
      --------------------------------------------------*/

    function forward(p) {
      var lon = p.x;
      var lat = p.y;
      // convert to radians
      if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
        return null;
      }

      var x, y;
      if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
        return null;
      }
      else {
        if (this.sphere) {
          x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
          y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
        }
        else {
          var sinphi = Math.sin(lat);
          var ts = tsfnz(this.e, lat, sinphi);
          x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
          y = this.y0 - this.a * this.k0 * Math.log(ts);
        }
        p.x = x;
        p.y = y;
        return p;
      }
    }

    /* Mercator inverse equations--mapping x,y to lat/long
      --------------------------------------------------*/
    function inverse(p) {

      var x = p.x - this.x0;
      var y = p.y - this.y0;
      var lon, lat;

      if (this.sphere) {
        lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
      }
      else {
        var ts = Math.exp(-y / (this.a * this.k0));
        lat = phi2z(this.e, ts);
        if (lat === -9999) {
          return null;
        }
      }
      lon = adjust_lon(this.long0 + x / (this.a * this.k0));

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$1 = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
    var merc = {
      init: init,
      forward: forward,
      inverse: inverse,
      names: names$1
    };

    function init$1() {
      //no-op for longlat
    }

    function identity(pt) {
      return pt;
    }
    var names$2 = ["longlat", "identity"];
    var longlat = {
      init: init$1,
      forward: identity,
      inverse: identity,
      names: names$2
    };

    var projs = [merc, longlat];
    var names = {};
    var projStore = [];

    function add(proj, i) {
      var len = projStore.length;
      if (!proj.names) {
        console.log(i);
        return true;
      }
      projStore[len] = proj;
      proj.names.forEach(function(n) {
        names[n.toLowerCase()] = len;
      });
      return this;
    }

    function get(name) {
      if (!name) {
        return false;
      }
      var n = name.toLowerCase();
      if (typeof names[n] !== 'undefined' && projStore[names[n]]) {
        return projStore[names[n]];
      }
    }

    function start() {
      projs.forEach(add);
    }
    var projections = {
      start: start,
      add: add,
      get: get
    };

    var exports$2 = {};
    exports$2.MERIT = {
      a: 6378137.0,
      rf: 298.257,
      ellipseName: "MERIT 1983"
    };

    exports$2.SGS85 = {
      a: 6378136.0,
      rf: 298.257,
      ellipseName: "Soviet Geodetic System 85"
    };

    exports$2.GRS80 = {
      a: 6378137.0,
      rf: 298.257222101,
      ellipseName: "GRS 1980(IUGG, 1980)"
    };

    exports$2.IAU76 = {
      a: 6378140.0,
      rf: 298.257,
      ellipseName: "IAU 1976"
    };

    exports$2.airy = {
      a: 6377563.396,
      b: 6356256.910,
      ellipseName: "Airy 1830"
    };

    exports$2.APL4 = {
      a: 6378137,
      rf: 298.25,
      ellipseName: "Appl. Physics. 1965"
    };

    exports$2.NWL9D = {
      a: 6378145.0,
      rf: 298.25,
      ellipseName: "Naval Weapons Lab., 1965"
    };

    exports$2.mod_airy = {
      a: 6377340.189,
      b: 6356034.446,
      ellipseName: "Modified Airy"
    };

    exports$2.andrae = {
      a: 6377104.43,
      rf: 300.0,
      ellipseName: "Andrae 1876 (Den., Iclnd.)"
    };

    exports$2.aust_SA = {
      a: 6378160.0,
      rf: 298.25,
      ellipseName: "Australian Natl & S. Amer. 1969"
    };

    exports$2.GRS67 = {
      a: 6378160.0,
      rf: 298.2471674270,
      ellipseName: "GRS 67(IUGG 1967)"
    };

    exports$2.bessel = {
      a: 6377397.155,
      rf: 299.1528128,
      ellipseName: "Bessel 1841"
    };

    exports$2.bess_nam = {
      a: 6377483.865,
      rf: 299.1528128,
      ellipseName: "Bessel 1841 (Namibia)"
    };

    exports$2.clrk66 = {
      a: 6378206.4,
      b: 6356583.8,
      ellipseName: "Clarke 1866"
    };

    exports$2.clrk80 = {
      a: 6378249.145,
      rf: 293.4663,
      ellipseName: "Clarke 1880 mod."
    };

    exports$2.clrk58 = {
      a: 6378293.645208759,
      rf: 294.2606763692654,
      ellipseName: "Clarke 1858"
    };

    exports$2.CPM = {
      a: 6375738.7,
      rf: 334.29,
      ellipseName: "Comm. des Poids et Mesures 1799"
    };

    exports$2.delmbr = {
      a: 6376428.0,
      rf: 311.5,
      ellipseName: "Delambre 1810 (Belgium)"
    };

    exports$2.engelis = {
      a: 6378136.05,
      rf: 298.2566,
      ellipseName: "Engelis 1985"
    };

    exports$2.evrst30 = {
      a: 6377276.345,
      rf: 300.8017,
      ellipseName: "Everest 1830"
    };

    exports$2.evrst48 = {
      a: 6377304.063,
      rf: 300.8017,
      ellipseName: "Everest 1948"
    };

    exports$2.evrst56 = {
      a: 6377301.243,
      rf: 300.8017,
      ellipseName: "Everest 1956"
    };

    exports$2.evrst69 = {
      a: 6377295.664,
      rf: 300.8017,
      ellipseName: "Everest 1969"
    };

    exports$2.evrstSS = {
      a: 6377298.556,
      rf: 300.8017,
      ellipseName: "Everest (Sabah & Sarawak)"
    };

    exports$2.fschr60 = {
      a: 6378166.0,
      rf: 298.3,
      ellipseName: "Fischer (Mercury Datum) 1960"
    };

    exports$2.fschr60m = {
      a: 6378155.0,
      rf: 298.3,
      ellipseName: "Fischer 1960"
    };

    exports$2.fschr68 = {
      a: 6378150.0,
      rf: 298.3,
      ellipseName: "Fischer 1968"
    };

    exports$2.helmert = {
      a: 6378200.0,
      rf: 298.3,
      ellipseName: "Helmert 1906"
    };

    exports$2.hough = {
      a: 6378270.0,
      rf: 297.0,
      ellipseName: "Hough"
    };

    exports$2.intl = {
      a: 6378388.0,
      rf: 297.0,
      ellipseName: "International 1909 (Hayford)"
    };

    exports$2.kaula = {
      a: 6378163.0,
      rf: 298.24,
      ellipseName: "Kaula 1961"
    };

    exports$2.lerch = {
      a: 6378139.0,
      rf: 298.257,
      ellipseName: "Lerch 1979"
    };

    exports$2.mprts = {
      a: 6397300.0,
      rf: 191.0,
      ellipseName: "Maupertius 1738"
    };

    exports$2.new_intl = {
      a: 6378157.5,
      b: 6356772.2,
      ellipseName: "New International 1967"
    };

    exports$2.plessis = {
      a: 6376523.0,
      rf: 6355863.0,
      ellipseName: "Plessis 1817 (France)"
    };

    exports$2.krass = {
      a: 6378245.0,
      rf: 298.3,
      ellipseName: "Krassovsky, 1942"
    };

    exports$2.SEasia = {
      a: 6378155.0,
      b: 6356773.3205,
      ellipseName: "Southeast Asia"
    };

    exports$2.walbeck = {
      a: 6376896.0,
      b: 6355834.8467,
      ellipseName: "Walbeck"
    };

    exports$2.WGS60 = {
      a: 6378165.0,
      rf: 298.3,
      ellipseName: "WGS 60"
    };

    exports$2.WGS66 = {
      a: 6378145.0,
      rf: 298.25,
      ellipseName: "WGS 66"
    };

    exports$2.WGS7 = {
      a: 6378135.0,
      rf: 298.26,
      ellipseName: "WGS 72"
    };

    var WGS84 = exports$2.WGS84 = {
      a: 6378137.0,
      rf: 298.257223563,
      ellipseName: "WGS 84"
    };

    exports$2.sphere = {
      a: 6370997.0,
      b: 6370997.0,
      ellipseName: "Normal Sphere (r=6370997)"
    };

    function eccentricity(a, b, rf, R_A) {
      var a2 = a * a; // used in geocentric
      var b2 = b * b; // used in geocentric
      var es = (a2 - b2) / a2; // e ^ 2
      var e = 0;
      if (R_A) {
        a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
        a2 = a * a;
        es = 0;
      } else {
        e = Math.sqrt(es); // eccentricity
      }
      var ep2 = (a2 - b2) / b2; // used in geocentric
      return {
        es: es,
        e: e,
        ep2: ep2
      };
    }
    function sphere(a, b, rf, ellps, sphere) {
      if (!a) { // do we have an ellipsoid?
        var ellipse = match(exports$2, ellps);
        if (!ellipse) {
          ellipse = WGS84;
        }
        a = ellipse.a;
        b = ellipse.b;
        rf = ellipse.rf;
      }

      if (rf && !b) {
        b = (1.0 - 1.0 / rf) * a;
      }
      if (rf === 0 || Math.abs(a - b) < EPSLN) {
        sphere = true;
        b = a;
      }
      return {
        a: a,
        b: b,
        rf: rf,
        sphere: sphere
      };
    }

    var exports$3 = {};
    exports$3.wgs84 = {
      towgs84: "0,0,0",
      ellipse: "WGS84",
      datumName: "WGS84"
    };

    exports$3.ch1903 = {
      towgs84: "674.374,15.056,405.346",
      ellipse: "bessel",
      datumName: "swiss"
    };

    exports$3.ggrs87 = {
      towgs84: "-199.87,74.79,246.62",
      ellipse: "GRS80",
      datumName: "Greek_Geodetic_Reference_System_1987"
    };

    exports$3.nad83 = {
      towgs84: "0,0,0",
      ellipse: "GRS80",
      datumName: "North_American_Datum_1983"
    };

    exports$3.nad27 = {
      nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
      ellipse: "clrk66",
      datumName: "North_American_Datum_1927"
    };

    exports$3.potsdam = {
      towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
      ellipse: "bessel",
      datumName: "Potsdam Rauenberg 1950 DHDN"
    };

    exports$3.carthage = {
      towgs84: "-263.0,6.0,431.0",
      ellipse: "clark80",
      datumName: "Carthage 1934 Tunisia"
    };

    exports$3.hermannskogel = {
      towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
      ellipse: "bessel",
      datumName: "Hermannskogel"
    };

    exports$3.osni52 = {
      towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
      ellipse: "airy",
      datumName: "Irish National"
    };

    exports$3.ire65 = {
      towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
      ellipse: "mod_airy",
      datumName: "Ireland 1965"
    };

    exports$3.rassadiran = {
      towgs84: "-133.63,-157.5,-158.62",
      ellipse: "intl",
      datumName: "Rassadiran"
    };

    exports$3.nzgd49 = {
      towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
      ellipse: "intl",
      datumName: "New Zealand Geodetic Datum 1949"
    };

    exports$3.osgb36 = {
      towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
      ellipse: "airy",
      datumName: "Airy 1830"
    };

    exports$3.s_jtsk = {
      towgs84: "589,76,480",
      ellipse: 'bessel',
      datumName: 'S-JTSK (Ferro)'
    };

    exports$3.beduaram = {
      towgs84: '-106,-87,188',
      ellipse: 'clrk80',
      datumName: 'Beduaram'
    };

    exports$3.gunung_segara = {
      towgs84: '-403,684,41',
      ellipse: 'bessel',
      datumName: 'Gunung Segara Jakarta'
    };

    exports$3.rnb72 = {
      towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
      ellipse: "intl",
      datumName: "Reseau National Belge 1972"
    };

    function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
      var out = {};

      if (datumCode === undefined || datumCode === 'none') {
        out.datum_type = PJD_NODATUM;
      } else {
        out.datum_type = PJD_WGS84;
      }

      if (datum_params) {
        out.datum_params = datum_params.map(parseFloat);
        if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
          out.datum_type = PJD_3PARAM;
        }
        if (out.datum_params.length > 3) {
          if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
            out.datum_type = PJD_7PARAM;
            out.datum_params[3] *= SEC_TO_RAD;
            out.datum_params[4] *= SEC_TO_RAD;
            out.datum_params[5] *= SEC_TO_RAD;
            out.datum_params[6] = (out.datum_params[6] / 1000000.0) + 1.0;
          }
        }
      }

      if (nadgrids) {
        out.datum_type = PJD_GRIDSHIFT;
        out.grids = nadgrids;
      }
      out.a = a; //datum object also uses these values
      out.b = b;
      out.es = es;
      out.ep2 = ep2;
      return out;
    }

    /**
     * Resources for details of NTv2 file formats:
     * - https://web.archive.org/web/20140127204822if_/http://www.mgs.gov.on.ca:80/stdprodconsume/groups/content/@mgs/@iandit/documents/resourcelist/stel02_047447.pdf
     * - http://mimaka.com/help/gs/html/004_NTV2%20Data%20Format.htm
     */

    var loadedNadgrids = {};

    /**
     * Load a binary NTv2 file (.gsb) to a key that can be used in a proj string like +nadgrids=<key>. Pass the NTv2 file
     * as an ArrayBuffer.
     */
    function nadgrid(key, data) {
      var view = new DataView(data);
      var isLittleEndian = detectLittleEndian(view);
      var header = readHeader(view, isLittleEndian);
      if (header.nSubgrids > 1) {
        console.log('Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored');
      }
      var subgrids = readSubgrids(view, header, isLittleEndian);
      var nadgrid = {header: header, subgrids: subgrids};
      loadedNadgrids[key] = nadgrid;
      return nadgrid;
    }

    /**
     * Given a proj4 value for nadgrids, return an array of loaded grids
     */
    function getNadgrids(nadgrids) {
      // Format details: http://proj.maptools.org/gen_parms.html
      if (nadgrids === undefined) { return null; }
      var grids = nadgrids.split(',');
      return grids.map(parseNadgridString);
    }

    function parseNadgridString(value) {
      if (value.length === 0) {
        return null;
      }
      var optional = value[0] === '@';
      if (optional) {
        value = value.slice(1);
      }
      if (value === 'null') {
        return {name: 'null', mandatory: !optional, grid: null, isNull: true};
      }
      return {
        name: value,
        mandatory: !optional,
        grid: loadedNadgrids[value] || null,
        isNull: false
      };
    }

    function secondsToRadians(seconds) {
      return (seconds / 3600) * Math.PI / 180;
    }

    function detectLittleEndian(view) {
      var nFields = view.getInt32(8, false);
      if (nFields === 11) {
        return false;
      }
      nFields = view.getInt32(8, true);
      if (nFields !== 11) {
        console.warn('Failed to detect nadgrid endian-ness, defaulting to little-endian');
      }
      return true;
    }

    function readHeader(view, isLittleEndian) {
      return {
        nFields: view.getInt32(8, isLittleEndian),
        nSubgridFields: view.getInt32(24, isLittleEndian),
        nSubgrids: view.getInt32(40, isLittleEndian),
        shiftType: decodeString(view, 56, 56 + 8).trim(),
        fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
        fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
        toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
        toSemiMinorAxis: view.getFloat64(168, isLittleEndian),
      };
    }

    function decodeString(view, start, end) {
      return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start, end)));
    }

    function readSubgrids(view, header, isLittleEndian) {
      var gridOffset = 176;
      var grids = [];
      for (var i = 0; i < header.nSubgrids; i++) {
        var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
        var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian);
        var lngColumnCount = Math.round(
          1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval);
        var latColumnCount = Math.round(
          1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval);
        // Proj4 operates on radians whereas the coordinates are in seconds in the grid
        grids.push({
          ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
          del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
          lim: [lngColumnCount, latColumnCount],
          count: subHeader.gridNodeCount,
          cvs: mapNodes(nodes)
        });
      }
      return grids;
    }

    function mapNodes(nodes) {
      return nodes.map(function (r) {return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];});
    }

    function readGridHeader(view, offset, isLittleEndian) {
      return {
        name: decodeString(view, offset + 8, offset + 16).trim(),
        parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
        lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
        upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
        lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
        upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
        latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
        longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
        gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
      };
    }

    function readGridNodes(view, offset, gridHeader, isLittleEndian) {
      var nodesOffset = offset + 176;
      var gridRecordLength = 16;
      var gridShiftRecords = [];
      for (var i = 0; i < gridHeader.gridNodeCount; i++) {
        var record = {
          latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
          longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
          latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
          longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian),
        };
        gridShiftRecords.push(record);
      }
      return gridShiftRecords;
    }

    function Projection(srsCode,callback) {
      if (!(this instanceof Projection)) {
        return new Projection(srsCode);
      }
      callback = callback || function(error){
        if(error){
          throw error;
        }
      };
      var json = parse(srsCode);
      if(typeof json !== 'object'){
        callback(srsCode);
        return;
      }
      var ourProj = Projection.projections.get(json.projName);
      if(!ourProj){
        callback(srsCode);
        return;
      }
      if (json.datumCode && json.datumCode !== 'none') {
        var datumDef = match(exports$3, json.datumCode);
        if (datumDef) {
          json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(',') : null);
          json.ellps = datumDef.ellipse;
          json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
        }
      }
      json.k0 = json.k0 || 1.0;
      json.axis = json.axis || 'enu';
      json.ellps = json.ellps || 'wgs84';
      json.lat1 = json.lat1 || json.lat0; // Lambert_Conformal_Conic_1SP, for example, needs this

      var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
      var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
      var nadgrids = getNadgrids(json.nadgrids);
      var datumObj = json.datum || datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2,
        nadgrids);

      extend(this, json); // transfer everything over from the projection because we don't know what we'll need
      extend(this, ourProj); // transfer all the methods from the projection

      // copy the 4 things over we calulated in deriveConstants.sphere
      this.a = sphere_.a;
      this.b = sphere_.b;
      this.rf = sphere_.rf;
      this.sphere = sphere_.sphere;

      // copy the 3 things we calculated in deriveConstants.eccentricity
      this.es = ecc.es;
      this.e = ecc.e;
      this.ep2 = ecc.ep2;

      // add in the datum object
      this.datum = datumObj;

      // init the projection
      this.init();

      // legecy callback from back in the day when it went to spatialreference.org
      callback(null, this);

    }
    Projection.projections = projections;
    Projection.projections.start();

    'use strict';
    function compareDatums(source, dest) {
      if (source.datum_type !== dest.datum_type) {
        return false; // false, datums are not equal
      } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
        // the tolerance for es is to ensure that GRS80 and WGS84
        // are considered identical
        return false;
      } else if (source.datum_type === PJD_3PARAM) {
        return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2]);
      } else if (source.datum_type === PJD_7PARAM) {
        return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6]);
      } else {
        return true; // datums are equal
      }
    } // cs_compare_datums()

    /*
     * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
     * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
     * according to the current ellipsoid parameters.
     *
     *    Latitude  : Geodetic latitude in radians                     (input)
     *    Longitude : Geodetic longitude in radians                    (input)
     *    Height    : Geodetic height, in meters                       (input)
     *    X         : Calculated Geocentric X coordinate, in meters    (output)
     *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
     *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
     *
     */
    function geodeticToGeocentric(p, es, a) {
      var Longitude = p.x;
      var Latitude = p.y;
      var Height = p.z ? p.z : 0; //Z value not always supplied

      var Rn; /*  Earth radius at location  */
      var Sin_Lat; /*  Math.sin(Latitude)  */
      var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
      var Cos_Lat; /*  Math.cos(Latitude)  */

      /*
       ** Don't blow up if Latitude is just a little out of the value
       ** range as it may just be a rounding issue.  Also removed longitude
       ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
       */
      if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
        Latitude = -HALF_PI;
      } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
        Latitude = HALF_PI;
      } else if (Latitude < -HALF_PI) {
        /* Latitude out of range */
        //..reportError('geocent:lat out of range:' + Latitude);
        return { x: -Infinity, y: -Infinity, z: p.z };
      } else if (Latitude > HALF_PI) {
        /* Latitude out of range */
        return { x: Infinity, y: Infinity, z: p.z };
      }

      if (Longitude > Math.PI) {
        Longitude -= (2 * Math.PI);
      }
      Sin_Lat = Math.sin(Latitude);
      Cos_Lat = Math.cos(Latitude);
      Sin2_Lat = Sin_Lat * Sin_Lat;
      Rn = a / (Math.sqrt(1.0e0 - es * Sin2_Lat));
      return {
        x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
        y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
        z: ((Rn * (1 - es)) + Height) * Sin_Lat
      };
    } // cs_geodetic_to_geocentric()

    function geocentricToGeodetic(p, es, a, b) {
      /* local defintions and variables */
      /* end-criterium of loop, accuracy of sin(Latitude) */
      var genau = 1e-12;
      var genau2 = (genau * genau);
      var maxiter = 30;

      var P; /* distance between semi-minor axis and location */
      var RR; /* distance between center and location */
      var CT; /* sin of geocentric latitude */
      var ST; /* cos of geocentric latitude */
      var RX;
      var RK;
      var RN; /* Earth radius at location */
      var CPHI0; /* cos of start or old geodetic latitude in iterations */
      var SPHI0; /* sin of start or old geodetic latitude in iterations */
      var CPHI; /* cos of searched geodetic latitude */
      var SPHI; /* sin of searched geodetic latitude */
      var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
      var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

      var X = p.x;
      var Y = p.y;
      var Z = p.z ? p.z : 0.0; //Z value not always supplied
      var Longitude;
      var Latitude;
      var Height;

      P = Math.sqrt(X * X + Y * Y);
      RR = Math.sqrt(X * X + Y * Y + Z * Z);

      /*      special cases for latitude and longitude */
      if (P / a < genau) {

        /*  special case, if P=0. (X=0., Y=0.) */
        Longitude = 0.0;

        /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
         *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
        if (RR / a < genau) {
          Latitude = HALF_PI;
          Height = -b;
          return {
            x: p.x,
            y: p.y,
            z: p.z
          };
        }
      } else {
        /*  ellipsoidal (geodetic) longitude
         *  interval: -PI < Longitude <= +PI */
        Longitude = Math.atan2(Y, X);
      }

      /* --------------------------------------------------------------
       * Following iterative algorithm was developped by
       * "Institut for Erdmessung", University of Hannover, July 1988.
       * Internet: www.ife.uni-hannover.de
       * Iterative computation of CPHI,SPHI and Height.
       * Iteration of CPHI and SPHI to 10**-12 radian resp.
       * 2*10**-7 arcsec.
       * --------------------------------------------------------------
       */
      CT = Z / RR;
      ST = P / RR;
      RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST);
      CPHI0 = ST * (1.0 - es) * RX;
      SPHI0 = CT * RX;
      iter = 0;

      /* loop to find sin(Latitude) resp. Latitude
       * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
      do {
        iter++;
        RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0);

        /*  ellipsoidal (geodetic) height */
        Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0);

        RK = es * RN / (RN + Height);
        RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
        CPHI = ST * (1.0 - RK) * RX;
        SPHI = CT * RX;
        SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
        CPHI0 = CPHI;
        SPHI0 = SPHI;
      }
      while (SDPHI * SDPHI > genau2 && iter < maxiter);

      /*      ellipsoidal (geodetic) latitude */
      Latitude = Math.atan(SPHI / Math.abs(CPHI));
      return {
        x: Longitude,
        y: Latitude,
        z: Height
      };
    } // cs_geocentric_to_geodetic()

    /****************************************************************/
    // pj_geocentic_to_wgs84( p )
    //  p = point to transform in geocentric coordinates (x,y,z)


    /** point object, nothing fancy, just allows values to be
        passed back and forth by reference rather than by value.
        Other point classes may be used as long as they have
        x and y properties, which will get modified in the transform method.
    */
    function geocentricToWgs84(p, datum_type, datum_params) {

      if (datum_type === PJD_3PARAM) {
        // if( x[io] === HUGE_VAL )
        //    continue;
        return {
          x: p.x + datum_params[0],
          y: p.y + datum_params[1],
          z: p.z + datum_params[2],
        };
      } else if (datum_type === PJD_7PARAM) {
        var Dx_BF = datum_params[0];
        var Dy_BF = datum_params[1];
        var Dz_BF = datum_params[2];
        var Rx_BF = datum_params[3];
        var Ry_BF = datum_params[4];
        var Rz_BF = datum_params[5];
        var M_BF = datum_params[6];
        // if( x[io] === HUGE_VAL )
        //    continue;
        return {
          x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
          y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
          z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
        };
      }
    } // cs_geocentric_to_wgs84

    /****************************************************************/
    // pj_geocentic_from_wgs84()
    //  coordinate system definition,
    //  point to transform in geocentric coordinates (x,y,z)
    function geocentricFromWgs84(p, datum_type, datum_params) {

      if (datum_type === PJD_3PARAM) {
        //if( x[io] === HUGE_VAL )
        //    continue;
        return {
          x: p.x - datum_params[0],
          y: p.y - datum_params[1],
          z: p.z - datum_params[2],
        };

      } else if (datum_type === PJD_7PARAM) {
        var Dx_BF = datum_params[0];
        var Dy_BF = datum_params[1];
        var Dz_BF = datum_params[2];
        var Rx_BF = datum_params[3];
        var Ry_BF = datum_params[4];
        var Rz_BF = datum_params[5];
        var M_BF = datum_params[6];
        var x_tmp = (p.x - Dx_BF) / M_BF;
        var y_tmp = (p.y - Dy_BF) / M_BF;
        var z_tmp = (p.z - Dz_BF) / M_BF;
        //if( x[io] === HUGE_VAL )
        //    continue;

        return {
          x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
          y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
          z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
        };
      } //cs_geocentric_from_wgs84()
    }

    function checkParams(type) {
      return (type === PJD_3PARAM || type === PJD_7PARAM);
    }

    var datum_transform = function(source, dest, point) {
      // Short cut if the datums are identical.
      if (compareDatums(source, dest)) {
        return point; // in this case, zero is sucess,
        // whereas cs_compare_datums returns 1 to indicate TRUE
        // confusing, should fix this
      }

      // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
      if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
        return point;
      }

      // If this datum requires grid shifts, then apply it to geodetic coordinates.
      var source_a = source.a;
      var source_es = source.es;
      if (source.datum_type === PJD_GRIDSHIFT) {
        var gridShiftCode = applyGridShift(source, false, point);
        if (gridShiftCode !== 0) {
          return undefined;
        }
        source_a = SRS_WGS84_SEMIMAJOR;
        source_es = SRS_WGS84_ESQUARED;
      }

      var dest_a = dest.a;
      var dest_b = dest.b;
      var dest_es = dest.es;
      if (dest.datum_type === PJD_GRIDSHIFT) {
        dest_a = SRS_WGS84_SEMIMAJOR;
        dest_b = SRS_WGS84_SEMIMINOR;
        dest_es = SRS_WGS84_ESQUARED;
      }

      // Do we need to go through geocentric coordinates?
      if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) &&  !checkParams(dest.datum_type)) {
        return point;
      }

      // Convert to geocentric coordinates.
      point = geodeticToGeocentric(point, source_es, source_a);
      // Convert between datums
      if (checkParams(source.datum_type)) {
        point = geocentricToWgs84(point, source.datum_type, source.datum_params);
      }
      if (checkParams(dest.datum_type)) {
        point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
      }
      point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);

      if (dest.datum_type === PJD_GRIDSHIFT) {
        var destGridShiftResult = applyGridShift(dest, true, point);
        if (destGridShiftResult !== 0) {
          return undefined;
        }
      }

      return point;
    };

    function applyGridShift(source, inverse, point) {
      if (source.grids === null || source.grids.length === 0) {
        console.log('Grid shift grids not found');
        return -1;
      }
      var input = {x: -point.x, y: point.y};
      var output = {x: Number.NaN, y: Number.NaN};
      var attemptedGrids = [];
      for (var i = 0; i < source.grids.length; i++) {
        var grid = source.grids[i];
        attemptedGrids.push(grid.name);
        if (grid.isNull) {
          output = input;
          break;
        }
        if (grid.grid === null) {
          if (grid.mandatory) {
            console.log("Unable to find mandatory grid '" + grid.name + "'");
            return -1;
          }
          continue;
        }
        var subgrid = grid.grid.subgrids[0];
        // skip tables that don't match our point at all
        var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 10000.0;
        var minX = subgrid.ll[0] - epsilon;
        var minY = subgrid.ll[1] - epsilon;
        var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
        var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
        if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x ) {
          continue;
        }
        output = applySubgridShift(input, inverse, subgrid);
        if (!isNaN(output.x)) {
          break;
        }
      }
      if (isNaN(output.x)) {
        console.log("Failed to find a grid shift table for location '"+
          -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
        return -1;
      }
      point.x = -output.x;
      point.y = output.y;
      return 0;
    }

    function applySubgridShift(pin, inverse, ct) {
      var val = {x: Number.NaN, y: Number.NaN};
      if (isNaN(pin.x)) { return val; }
      var tb = {x: pin.x, y: pin.y};
      tb.x -= ct.ll[0];
      tb.y -= ct.ll[1];
      tb.x = adjust_lon(tb.x - Math.PI) + Math.PI;
      var t = nadInterpolate(tb, ct);
      if (inverse) {
        if (isNaN(t.x)) {
          return val;
        }
        t.x = tb.x - t.x;
        t.y = tb.y - t.y;
        var i = 9, tol = 1e-12;
        var dif, del;
        do {
          del = nadInterpolate(t, ct);
          if (isNaN(del.x)) {
            console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
            break;
          }
          dif = {x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y)};
          t.x += dif.x;
          t.y += dif.y;
        } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
        if (i < 0) {
          console.log("Inverse grid shift iterator failed to converge.");
          return val;
        }
        val.x = adjust_lon(t.x + ct.ll[0]);
        val.y = t.y + ct.ll[1];
      } else {
        if (!isNaN(t.x)) {
          val.x = pin.x + t.x;
          val.y = pin.y + t.y;
        }
      }
      return val;
    }

    function nadInterpolate(pin, ct) {
      var t = {x: pin.x / ct.del[0], y: pin.y / ct.del[1]};
      var indx = {x: Math.floor(t.x), y: Math.floor(t.y)};
      var frct = {x: t.x - 1.0 * indx.x, y: t.y - 1.0 * indx.y};
      var val= {x: Number.NaN, y: Number.NaN};
      var inx;
      if (indx.x < 0 || indx.x >= ct.lim[0]) {
        return val;
      }
      if (indx.y < 0 || indx.y >= ct.lim[1]) {
        return val;
      }
      inx = (indx.y * ct.lim[0]) + indx.x;
      var f00 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
      inx++;
      var f10= {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
      inx += ct.lim[0];
      var f11 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
      inx--;
      var f01 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
      var m11 = frct.x * frct.y, m10 = frct.x * (1.0 - frct.y),
        m00 = (1.0 - frct.x) * (1.0 - frct.y), m01 = (1.0 - frct.x) * frct.y;
      val.x = (m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x);
      val.y = (m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y);
      return val;
    }

    var adjust_axis = function(crs, denorm, point) {
      var xin = point.x,
        yin = point.y,
        zin = point.z || 0.0;
      var v, t, i;
      var out = {};
      for (i = 0; i < 3; i++) {
        if (denorm && i === 2 && point.z === undefined) {
          continue;
        }
        if (i === 0) {
          v = xin;
          if ("ew".indexOf(crs.axis[i]) !== -1) {
            t = 'x';
          } else {
            t = 'y';
          }

        }
        else if (i === 1) {
          v = yin;
          if ("ns".indexOf(crs.axis[i]) !== -1) {
            t = 'y';
          } else {
            t = 'x';
          }
        }
        else {
          v = zin;
          t = 'z';
        }
        switch (crs.axis[i]) {
        case 'e':
          out[t] = v;
          break;
        case 'w':
          out[t] = -v;
          break;
        case 'n':
          out[t] = v;
          break;
        case 's':
          out[t] = -v;
          break;
        case 'u':
          if (point[t] !== undefined) {
            out.z = v;
          }
          break;
        case 'd':
          if (point[t] !== undefined) {
            out.z = -v;
          }
          break;
        default:
          //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
          return null;
        }
      }
      return out;
    };

    var toPoint = function (array){
      var out = {
        x: array[0],
        y: array[1]
      };
      if (array.length>2) {
        out.z = array[2];
      }
      if (array.length>3) {
        out.m = array[3];
      }
      return out;
    };

    var checkSanity = function (point) {
      checkCoord(point.x);
      checkCoord(point.y);
    };
    function checkCoord(num) {
      if (typeof Number.isFinite === 'function') {
        if (Number.isFinite(num)) {
          return;
        }
        throw new TypeError('coordinates must be finite numbers');
      }
      if (typeof num !== 'number' || num !== num || !isFinite(num)) {
        throw new TypeError('coordinates must be finite numbers');
      }
    }

    function checkNotWGS(source, dest) {
      return ((source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM) && dest.datumCode !== 'WGS84') || ((dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM) && source.datumCode !== 'WGS84');
    }

    function transform(source, dest, point, enforceAxis) {
      var wgs84;
      if (Array.isArray(point)) {
        point = toPoint(point);
      }
      checkSanity(point);
      // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
      if (source.datum && dest.datum && checkNotWGS(source, dest)) {
        wgs84 = new Projection('WGS84');
        point = transform(source, wgs84, point, enforceAxis);
        source = wgs84;
      }
      // DGR, 2010/11/12
      if (enforceAxis && source.axis !== 'enu') {
        point = adjust_axis(source, false, point);
      }
      // Transform source points to long/lat, if they aren't already.
      if (source.projName === 'longlat') {
        point = {
          x: point.x * D2R,
          y: point.y * D2R,
          z: point.z || 0
        };
      } else {
        if (source.to_meter) {
          point = {
            x: point.x * source.to_meter,
            y: point.y * source.to_meter,
            z: point.z || 0
          };
        }
        point = source.inverse(point); // Convert Cartesian to longlat
        if (!point) {
          return;
        }
      }
      // Adjust for the prime meridian if necessary
      if (source.from_greenwich) {
        point.x += source.from_greenwich;
      }

      // Convert datums if needed, and if possible.
      point = datum_transform(source.datum, dest.datum, point);
      if (!point) {
        return;
      }

      // Adjust for the prime meridian if necessary
      if (dest.from_greenwich) {
        point = {
          x: point.x - dest.from_greenwich,
          y: point.y,
          z: point.z || 0
        };
      }

      if (dest.projName === 'longlat') {
        // convert radians to decimal degrees
        point = {
          x: point.x * R2D,
          y: point.y * R2D,
          z: point.z || 0
        };
      } else { // else project
        point = dest.forward(point);
        if (dest.to_meter) {
          point = {
            x: point.x / dest.to_meter,
            y: point.y / dest.to_meter,
            z: point.z || 0
          };
        }
      }

      // DGR, 2010/11/12
      if (enforceAxis && dest.axis !== 'enu') {
        return adjust_axis(dest, true, point);
      }

      return point;
    }

    var wgs84 = Projection('WGS84');

    function transformer(from, to, coords, enforceAxis) {
      var transformedArray, out, keys;
      if (Array.isArray(coords)) {
        transformedArray = transform(from, to, coords, enforceAxis) || {x: NaN, y: NaN};
        if (coords.length > 2) {
          if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
            if (typeof transformedArray.z === 'number') {
              return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3));
            } else {
              return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3));
            }
          } else {
            return [transformedArray.x, transformedArray.y].concat(coords.splice(2));
          }
        } else {
          return [transformedArray.x, transformedArray.y];
        }
      } else {
        out = transform(from, to, coords, enforceAxis);
        keys = Object.keys(coords);
        if (keys.length === 2) {
          return out;
        }
        keys.forEach(function (key) {
          if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
            if (key === 'x' || key === 'y' || key === 'z') {
              return;
            }
          } else {
            if (key === 'x' || key === 'y') {
              return;
            }
          }
          out[key] = coords[key];
        });
        return out;
      }
    }

    function checkProj(item) {
      if (item instanceof Projection) {
        return item;
      }
      if (item.oProj) {
        return item.oProj;
      }
      return Projection(item);
    }

    function proj4$1(fromProj, toProj, coord) {
      fromProj = checkProj(fromProj);
      var single = false;
      var obj;
      if (typeof toProj === 'undefined') {
        toProj = fromProj;
        fromProj = wgs84;
        single = true;
      } else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
        coord = toProj;
        toProj = fromProj;
        fromProj = wgs84;
        single = true;
      }
      toProj = checkProj(toProj);
      if (coord) {
        return transformer(fromProj, toProj, coord);
      } else {
        obj = {
          forward: function (coords, enforceAxis) {
            return transformer(fromProj, toProj, coords, enforceAxis);
          },
          inverse: function (coords, enforceAxis) {
            return transformer(toProj, fromProj, coords, enforceAxis);
          }
        };
        if (single) {
          obj.oProj = toProj;
        }
        return obj;
      }
    }

    /**
     * UTM zones are grouped, and assigned to one of a group of 6
     * sets.
     *
     * {int} @private
     */
    var NUM_100K_SETS = 6;

    /**
     * The column letters (for easting) of the lower left value, per
     * set.
     *
     * {string} @private
     */
    var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

    /**
     * The row letters (for northing) of the lower left value, per
     * set.
     *
     * {string} @private
     */
    var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

    var A = 65; // A
    var I = 73; // I
    var O = 79; // O
    var V = 86; // V
    var Z = 90; // Z
    var mgrs = {
      forward: forward$1,
      inverse: inverse$1,
      toPoint: toPoint$1
    };
    /**
     * Conversion of lat/lon to MGRS.
     *
     * @param {object} ll Object literal with lat and lon properties on a
     *     WGS84 ellipsoid.
     * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
     *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
     * @return {string} the MGRS string for the given location and accuracy.
     */
    function forward$1(ll, accuracy) {
      accuracy = accuracy || 5; // default accuracy 1m
      return encode(LLtoUTM({
        lat: ll[1],
        lon: ll[0]
      }), accuracy);
    }

    /**
     * Conversion of MGRS to lat/lon.
     *
     * @param {string} mgrs MGRS string.
     * @return {array} An array with left (longitude), bottom (latitude), right
     *     (longitude) and top (latitude) values in WGS84, representing the
     *     bounding box for the provided MGRS reference.
     */
    function inverse$1(mgrs) {
      var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
      if (bbox.lat && bbox.lon) {
        return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
      }
      return [bbox.left, bbox.bottom, bbox.right, bbox.top];
    }

    function toPoint$1(mgrs) {
      var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
      if (bbox.lat && bbox.lon) {
        return [bbox.lon, bbox.lat];
      }
      return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
    }
    /**
     * Conversion from degrees to radians.
     *
     * @private
     * @param {number} deg the angle in degrees.
     * @return {number} the angle in radians.
     */
    function degToRad(deg) {
      return (deg * (Math.PI / 180.0));
    }

    /**
     * Conversion from radians to degrees.
     *
     * @private
     * @param {number} rad the angle in radians.
     * @return {number} the angle in degrees.
     */
    function radToDeg(rad) {
      return (180.0 * (rad / Math.PI));
    }

    /**
     * Converts a set of Longitude and Latitude co-ordinates to UTM
     * using the WGS84 ellipsoid.
     *
     * @private
     * @param {object} ll Object literal with lat and lon properties
     *     representing the WGS84 coordinate to be converted.
     * @return {object} Object literal containing the UTM value with easting,
     *     northing, zoneNumber and zoneLetter properties, and an optional
     *     accuracy property in digits. Returns null if the conversion failed.
     */
    function LLtoUTM(ll) {
      var Lat = ll.lat;
      var Long = ll.lon;
      var a = 6378137.0; //ellip.radius;
      var eccSquared = 0.00669438; //ellip.eccsq;
      var k0 = 0.9996;
      var LongOrigin;
      var eccPrimeSquared;
      var N, T, C, A, M;
      var LatRad = degToRad(Lat);
      var LongRad = degToRad(Long);
      var LongOriginRad;
      var ZoneNumber;
      // (int)
      ZoneNumber = Math.floor((Long + 180) / 6) + 1;

      //Make sure the longitude 180.00 is in Zone 60
      if (Long === 180) {
        ZoneNumber = 60;
      }

      // Special zone for Norway
      if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
        ZoneNumber = 32;
      }

      // Special zones for Svalbard
      if (Lat >= 72.0 && Lat < 84.0) {
        if (Long >= 0.0 && Long < 9.0) {
          ZoneNumber = 31;
        }
        else if (Long >= 9.0 && Long < 21.0) {
          ZoneNumber = 33;
        }
        else if (Long >= 21.0 && Long < 33.0) {
          ZoneNumber = 35;
        }
        else if (Long >= 33.0 && Long < 42.0) {
          ZoneNumber = 37;
        }
      }

      LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
      // in middle of
      // zone
      LongOriginRad = degToRad(LongOrigin);

      eccPrimeSquared = (eccSquared) / (1 - eccSquared);

      N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
      T = Math.tan(LatRad) * Math.tan(LatRad);
      C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
      A = Math.cos(LatRad) * (LongRad - LongOriginRad);

      M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

      var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

      var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
      if (Lat < 0.0) {
        UTMNorthing += 10000000.0; //10000000 meter offset for
        // southern hemisphere
      }

      return {
        northing: Math.round(UTMNorthing),
        easting: Math.round(UTMEasting),
        zoneNumber: ZoneNumber,
        zoneLetter: getLetterDesignator(Lat)
      };
    }

    /**
     * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
     * class where the Zone can be specified as a single string eg."60N" which
     * is then broken down into the ZoneNumber and ZoneLetter.
     *
     * @private
     * @param {object} utm An object literal with northing, easting, zoneNumber
     *     and zoneLetter properties. If an optional accuracy property is
     *     provided (in meters), a bounding box will be returned instead of
     *     latitude and longitude.
     * @return {object} An object literal containing either lat and lon values
     *     (if no accuracy was provided), or top, right, bottom and left values
     *     for the bounding box calculated according to the provided accuracy.
     *     Returns null if the conversion failed.
     */
    function UTMtoLL(utm) {

      var UTMNorthing = utm.northing;
      var UTMEasting = utm.easting;
      var zoneLetter = utm.zoneLetter;
      var zoneNumber = utm.zoneNumber;
      // check the ZoneNummber is valid
      if (zoneNumber < 0 || zoneNumber > 60) {
        return null;
      }

      var k0 = 0.9996;
      var a = 6378137.0; //ellip.radius;
      var eccSquared = 0.00669438; //ellip.eccsq;
      var eccPrimeSquared;
      var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
      var N1, T1, C1, R1, D, M;
      var LongOrigin;
      var mu, phi1Rad;

      // remove 500,000 meter offset for longitude
      var x = UTMEasting - 500000.0;
      var y = UTMNorthing;

      // We must know somehow if we are in the Northern or Southern
      // hemisphere, this is the only time we use the letter So even
      // if the Zone letter isn't exactly correct it should indicate
      // the hemisphere correctly
      if (zoneLetter < 'N') {
        y -= 10000000.0; // remove 10,000,000 meter offset used
        // for southern hemisphere
      }

      // There are 60 zones with zone 1 being at West -180 to -174
      LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
      // in middle of
      // zone

      eccPrimeSquared = (eccSquared) / (1 - eccSquared);

      M = y / k0;
      mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

      phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
      // double phi1 = ProjMath.radToDeg(phi1Rad);

      N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
      T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
      C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
      R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
      D = x / (N1 * k0);

      var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
      lat = radToDeg(lat);

      var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
      lon = LongOrigin + radToDeg(lon);

      var result;
      if (utm.accuracy) {
        var topRight = UTMtoLL({
          northing: utm.northing + utm.accuracy,
          easting: utm.easting + utm.accuracy,
          zoneLetter: utm.zoneLetter,
          zoneNumber: utm.zoneNumber
        });
        result = {
          top: topRight.lat,
          right: topRight.lon,
          bottom: lat,
          left: lon
        };
      }
      else {
        result = {
          lat: lat,
          lon: lon
        };
      }
      return result;
    }

    /**
     * Calculates the MGRS letter designator for the given latitude.
     *
     * @private
     * @param {number} lat The latitude in WGS84 to get the letter designator
     *     for.
     * @return {char} The letter designator.
     */
    function getLetterDesignator(lat) {
      //This is here as an error flag to show that the Latitude is
      //outside MGRS limits
      var LetterDesignator = 'Z';

      if ((84 >= lat) && (lat >= 72)) {
        LetterDesignator = 'X';
      }
      else if ((72 > lat) && (lat >= 64)) {
        LetterDesignator = 'W';
      }
      else if ((64 > lat) && (lat >= 56)) {
        LetterDesignator = 'V';
      }
      else if ((56 > lat) && (lat >= 48)) {
        LetterDesignator = 'U';
      }
      else if ((48 > lat) && (lat >= 40)) {
        LetterDesignator = 'T';
      }
      else if ((40 > lat) && (lat >= 32)) {
        LetterDesignator = 'S';
      }
      else if ((32 > lat) && (lat >= 24)) {
        LetterDesignator = 'R';
      }
      else if ((24 > lat) && (lat >= 16)) {
        LetterDesignator = 'Q';
      }
      else if ((16 > lat) && (lat >= 8)) {
        LetterDesignator = 'P';
      }
      else if ((8 > lat) && (lat >= 0)) {
        LetterDesignator = 'N';
      }
      else if ((0 > lat) && (lat >= -8)) {
        LetterDesignator = 'M';
      }
      else if ((-8 > lat) && (lat >= -16)) {
        LetterDesignator = 'L';
      }
      else if ((-16 > lat) && (lat >= -24)) {
        LetterDesignator = 'K';
      }
      else if ((-24 > lat) && (lat >= -32)) {
        LetterDesignator = 'J';
      }
      else if ((-32 > lat) && (lat >= -40)) {
        LetterDesignator = 'H';
      }
      else if ((-40 > lat) && (lat >= -48)) {
        LetterDesignator = 'G';
      }
      else if ((-48 > lat) && (lat >= -56)) {
        LetterDesignator = 'F';
      }
      else if ((-56 > lat) && (lat >= -64)) {
        LetterDesignator = 'E';
      }
      else if ((-64 > lat) && (lat >= -72)) {
        LetterDesignator = 'D';
      }
      else if ((-72 > lat) && (lat >= -80)) {
        LetterDesignator = 'C';
      }
      return LetterDesignator;
    }

    /**
     * Encodes a UTM location as MGRS string.
     *
     * @private
     * @param {object} utm An object literal with easting, northing,
     *     zoneLetter, zoneNumber
     * @param {number} accuracy Accuracy in digits (1-5).
     * @return {string} MGRS string for the given UTM location.
     */
    function encode(utm, accuracy) {
      // prepend with leading zeroes
      var seasting = "00000" + utm.easting,
        snorthing = "00000" + utm.northing;

      return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
    }

    /**
     * Get the two letter 100k designator for a given UTM easting,
     * northing and zone number value.
     *
     * @private
     * @param {number} easting
     * @param {number} northing
     * @param {number} zoneNumber
     * @return the two letter 100k designator for the given UTM location.
     */
    function get100kID(easting, northing, zoneNumber) {
      var setParm = get100kSetForZone(zoneNumber);
      var setColumn = Math.floor(easting / 100000);
      var setRow = Math.floor(northing / 100000) % 20;
      return getLetter100kID(setColumn, setRow, setParm);
    }

    /**
     * Given a UTM zone number, figure out the MGRS 100K set it is in.
     *
     * @private
     * @param {number} i An UTM zone number.
     * @return {number} the 100k set the UTM zone is in.
     */
    function get100kSetForZone(i) {
      var setParm = i % NUM_100K_SETS;
      if (setParm === 0) {
        setParm = NUM_100K_SETS;
      }

      return setParm;
    }

    /**
     * Get the two-letter MGRS 100k designator given information
     * translated from the UTM northing, easting and zone number.
     *
     * @private
     * @param {number} column the column index as it relates to the MGRS
     *        100k set spreadsheet, created from the UTM easting.
     *        Values are 1-8.
     * @param {number} row the row index as it relates to the MGRS 100k set
     *        spreadsheet, created from the UTM northing value. Values
     *        are from 0-19.
     * @param {number} parm the set block, as it relates to the MGRS 100k set
     *        spreadsheet, created from the UTM zone. Values are from
     *        1-60.
     * @return two letter MGRS 100k code.
     */
    function getLetter100kID(column, row, parm) {
      // colOrigin and rowOrigin are the letters at the origin of the set
      var index = parm - 1;
      var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
      var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

      // colInt and rowInt are the letters to build to return
      var colInt = colOrigin + column - 1;
      var rowInt = rowOrigin + row;
      var rollover = false;

      if (colInt > Z) {
        colInt = colInt - Z + A - 1;
        rollover = true;
      }

      if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
        colInt++;
      }

      if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
        colInt++;

        if (colInt === I) {
          colInt++;
        }
      }

      if (colInt > Z) {
        colInt = colInt - Z + A - 1;
      }

      if (rowInt > V) {
        rowInt = rowInt - V + A - 1;
        rollover = true;
      }
      else {
        rollover = false;
      }

      if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
        rowInt++;
      }

      if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
        rowInt++;

        if (rowInt === I) {
          rowInt++;
        }
      }

      if (rowInt > V) {
        rowInt = rowInt - V + A - 1;
      }

      var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
      return twoLetter;
    }

    /**
     * Decode the UTM parameters from a MGRS string.
     *
     * @private
     * @param {string} mgrsString an UPPERCASE coordinate string is expected.
     * @return {object} An object literal with easting, northing, zoneLetter,
     *     zoneNumber and accuracy (in meters) properties.
     */
    function decode(mgrsString) {

      if (mgrsString && mgrsString.length === 0) {
        throw ("MGRSPoint coverting from nothing");
      }

      var length = mgrsString.length;

      var hunK = null;
      var sb = "";
      var testChar;
      var i = 0;

      // get Zone number
      while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
        if (i >= 2) {
          throw ("MGRSPoint bad conversion from: " + mgrsString);
        }
        sb += testChar;
        i++;
      }

      var zoneNumber = parseInt(sb, 10);

      if (i === 0 || i + 3 > length) {
        // A good MGRS string has to be 4-5 digits long,
        // ##AAA/#AAA at least.
        throw ("MGRSPoint bad conversion from: " + mgrsString);
      }

      var zoneLetter = mgrsString.charAt(i++);

      // Should we check the zone letter here? Why not.
      if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
        throw ("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
      }

      hunK = mgrsString.substring(i, i += 2);

      var set = get100kSetForZone(zoneNumber);

      var east100k = getEastingFromChar(hunK.charAt(0), set);
      var north100k = getNorthingFromChar(hunK.charAt(1), set);

      // We have a bug where the northing may be 2000000 too low.
      // How
      // do we know when to roll over?

      while (north100k < getMinNorthing(zoneLetter)) {
        north100k += 2000000;
      }

      // calculate the char index for easting/northing separator
      var remainder = length - i;

      if (remainder % 2 !== 0) {
        throw ("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
      }

      var sep = remainder / 2;

      var sepEasting = 0.0;
      var sepNorthing = 0.0;
      var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
      if (sep > 0) {
        accuracyBonus = 100000.0 / Math.pow(10, sep);
        sepEastingString = mgrsString.substring(i, i + sep);
        sepEasting = parseFloat(sepEastingString) * accuracyBonus;
        sepNorthingString = mgrsString.substring(i + sep);
        sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
      }

      easting = sepEasting + east100k;
      northing = sepNorthing + north100k;

      return {
        easting: easting,
        northing: northing,
        zoneLetter: zoneLetter,
        zoneNumber: zoneNumber,
        accuracy: accuracyBonus
      };
    }

    /**
     * Given the first letter from a two-letter MGRS 100k zone, and given the
     * MGRS table set for the zone number, figure out the easting value that
     * should be added to the other, secondary easting value.
     *
     * @private
     * @param {char} e The first letter from a two-letter MGRS 100´k zone.
     * @param {number} set The MGRS table set for the zone number.
     * @return {number} The easting value for the given letter and set.
     */
    function getEastingFromChar(e, set) {
      // colOrigin is the letter at the origin of the set for the
      // column
      var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
      var eastingValue = 100000.0;
      var rewindMarker = false;

      while (curCol !== e.charCodeAt(0)) {
        curCol++;
        if (curCol === I) {
          curCol++;
        }
        if (curCol === O) {
          curCol++;
        }
        if (curCol > Z) {
          if (rewindMarker) {
            throw ("Bad character: " + e);
          }
          curCol = A;
          rewindMarker = true;
        }
        eastingValue += 100000.0;
      }

      return eastingValue;
    }

    /**
     * Given the second letter from a two-letter MGRS 100k zone, and given the
     * MGRS table set for the zone number, figure out the northing value that
     * should be added to the other, secondary northing value. You have to
     * remember that Northings are determined from the equator, and the vertical
     * cycle of letters mean a 2000000 additional northing meters. This happens
     * approx. every 18 degrees of latitude. This method does *NOT* count any
     * additional northings. You have to figure out how many 2000000 meters need
     * to be added for the zone letter of the MGRS coordinate.
     *
     * @private
     * @param {char} n Second letter of the MGRS 100k zone
     * @param {number} set The MGRS table set number, which is dependent on the
     *     UTM zone number.
     * @return {number} The northing value for the given letter and set.
     */
    function getNorthingFromChar(n, set) {

      if (n > 'V') {
        throw ("MGRSPoint given invalid Northing " + n);
      }

      // rowOrigin is the letter at the origin of the set for the
      // column
      var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
      var northingValue = 0.0;
      var rewindMarker = false;

      while (curRow !== n.charCodeAt(0)) {
        curRow++;
        if (curRow === I) {
          curRow++;
        }
        if (curRow === O) {
          curRow++;
        }
        // fixing a bug making whole application hang in this loop
        // when 'n' is a wrong character
        if (curRow > V) {
          if (rewindMarker) { // making sure that this loop ends
            throw ("Bad character: " + n);
          }
          curRow = A;
          rewindMarker = true;
        }
        northingValue += 100000.0;
      }

      return northingValue;
    }

    /**
     * The function getMinNorthing returns the minimum northing value of a MGRS
     * zone.
     *
     * Ported from Geotrans' c Lattitude_Band_Value structure table.
     *
     * @private
     * @param {char} zoneLetter The MGRS zone to get the min northing for.
     * @return {number}
     */
    function getMinNorthing(zoneLetter) {
      var northing;
      switch (zoneLetter) {
      case 'C':
        northing = 1100000.0;
        break;
      case 'D':
        northing = 2000000.0;
        break;
      case 'E':
        northing = 2800000.0;
        break;
      case 'F':
        northing = 3700000.0;
        break;
      case 'G':
        northing = 4600000.0;
        break;
      case 'H':
        northing = 5500000.0;
        break;
      case 'J':
        northing = 6400000.0;
        break;
      case 'K':
        northing = 7300000.0;
        break;
      case 'L':
        northing = 8200000.0;
        break;
      case 'M':
        northing = 9100000.0;
        break;
      case 'N':
        northing = 0.0;
        break;
      case 'P':
        northing = 800000.0;
        break;
      case 'Q':
        northing = 1700000.0;
        break;
      case 'R':
        northing = 2600000.0;
        break;
      case 'S':
        northing = 3500000.0;
        break;
      case 'T':
        northing = 4400000.0;
        break;
      case 'U':
        northing = 5300000.0;
        break;
      case 'V':
        northing = 6200000.0;
        break;
      case 'W':
        northing = 7000000.0;
        break;
      case 'X':
        northing = 7900000.0;
        break;
      default:
        northing = -1.0;
      }
      if (northing >= 0.0) {
        return northing;
      }
      else {
        throw ("Invalid zone letter: " + zoneLetter);
      }

    }

    function Point(x, y, z) {
      if (!(this instanceof Point)) {
        return new Point(x, y, z);
      }
      if (Array.isArray(x)) {
        this.x = x[0];
        this.y = x[1];
        this.z = x[2] || 0.0;
      } else if(typeof x === 'object') {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z || 0.0;
      } else if (typeof x === 'string' && typeof y === 'undefined') {
        var coords = x.split(',');
        this.x = parseFloat(coords[0], 10);
        this.y = parseFloat(coords[1], 10);
        this.z = parseFloat(coords[2], 10) || 0.0;
      } else {
        this.x = x;
        this.y = y;
        this.z = z || 0.0;
      }
      console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
    }

    Point.fromMGRS = function(mgrsStr) {
      return new Point(toPoint$1(mgrsStr));
    };
    Point.prototype.toMGRS = function(accuracy) {
      return forward$1([this.x, this.y], accuracy);
    };

    var C00 = 1;
    var C02 = 0.25;
    var C04 = 0.046875;
    var C06 = 0.01953125;
    var C08 = 0.01068115234375;
    var C22 = 0.75;
    var C44 = 0.46875;
    var C46 = 0.01302083333333333333;
    var C48 = 0.00712076822916666666;
    var C66 = 0.36458333333333333333;
    var C68 = 0.00569661458333333333;
    var C88 = 0.3076171875;

    var pj_enfn = function(es) {
      var en = [];
      en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
      en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
      var t = es * es;
      en[2] = t * (C44 - es * (C46 + es * C48));
      t *= es;
      en[3] = t * (C66 - es * C68);
      en[4] = t * es * C88;
      return en;
    };

    var pj_mlfn = function(phi, sphi, cphi, en) {
      cphi *= sphi;
      sphi *= sphi;
      return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4]))));
    };

    var MAX_ITER = 20;

    var pj_inv_mlfn = function(arg, es, en) {
      var k = 1 / (1 - es);
      var phi = arg;
      for (var i = MAX_ITER; i; --i) { /* rarely goes over 2 iterations */
        var s = Math.sin(phi);
        var t = 1 - es * s * s;
        //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
        //phi -= t * (t * Math.sqrt(t)) * k;
        t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
        phi -= t;
        if (Math.abs(t) < EPSLN) {
          return phi;
        }
      }
      //..reportError("cass:pj_inv_mlfn: Convergence error");
      return phi;
    };

    // Heavily based on this tmerc projection implementation
    // https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/tmerc.js

    function init$2() {
      this.x0 = this.x0 !== undefined ? this.x0 : 0;
      this.y0 = this.y0 !== undefined ? this.y0 : 0;
      this.long0 = this.long0 !== undefined ? this.long0 : 0;
      this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

      if (this.es) {
        this.en = pj_enfn(this.es);
        this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
      }
    }

    /**
        Transverse Mercator Forward  - long/lat to x/y
        long/lat in radians
      */
    function forward$2(p) {
      var lon = p.x;
      var lat = p.y;

      var delta_lon = adjust_lon(lon - this.long0);
      var con;
      var x, y;
      var sin_phi = Math.sin(lat);
      var cos_phi = Math.cos(lat);

      if (!this.es) {
        var b = cos_phi * Math.sin(delta_lon);

        if ((Math.abs(Math.abs(b) - 1)) < EPSLN) {
          return (93);
        }
        else {
          x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
          y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
          b = Math.abs(y);

          if (b >= 1) {
            if ((b - 1) > EPSLN) {
              return (93);
            }
            else {
              y = 0;
            }
          }
          else {
            y = Math.acos(y);
          }

          if (lat < 0) {
            y = -y;
          }

          y = this.a * this.k0 * (y - this.lat0) + this.y0;
        }
      }
      else {
        var al = cos_phi * delta_lon;
        var als = Math.pow(al, 2);
        var c = this.ep2 * Math.pow(cos_phi, 2);
        var cs = Math.pow(c, 2);
        var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
        var t = Math.pow(tq, 2);
        var ts = Math.pow(t, 2);
        con = 1 - this.es * Math.pow(sin_phi, 2);
        al = al / Math.sqrt(con);
        var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en);

        x = this.a * (this.k0 * al * (1 +
          als / 6 * (1 - t + c +
          als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c +
          als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) +
          this.x0;

        y = this.a * (this.k0 * (ml - this.ml0 +
          sin_phi * delta_lon * al / 2 * (1 +
          als / 12 * (5 - t + 9 * c + 4 * cs +
          als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c +
          als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) +
          this.y0;
      }

      p.x = x;
      p.y = y;

      return p;
    }

    /**
        Transverse Mercator Inverse  -  x/y to long/lat
      */
    function inverse$2(p) {
      var con, phi;
      var lat, lon;
      var x = (p.x - this.x0) * (1 / this.a);
      var y = (p.y - this.y0) * (1 / this.a);

      if (!this.es) {
        var f = Math.exp(x / this.k0);
        var g = 0.5 * (f - 1 / f);
        var temp = this.lat0 + y / this.k0;
        var h = Math.cos(temp);
        con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
        lat = Math.asin(con);

        if (y < 0) {
          lat = -lat;
        }

        if ((g === 0) && (h === 0)) {
          lon = 0;
        }
        else {
          lon = adjust_lon(Math.atan2(g, h) + this.long0);
        }
      }
      else { // ellipsoidal form
        con = this.ml0 + y / this.k0;
        phi = pj_inv_mlfn(con, this.es, this.en);

        if (Math.abs(phi) < HALF_PI) {
          var sin_phi = Math.sin(phi);
          var cos_phi = Math.cos(phi);
          var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
          var c = this.ep2 * Math.pow(cos_phi, 2);
          var cs = Math.pow(c, 2);
          var t = Math.pow(tan_phi, 2);
          var ts = Math.pow(t, 2);
          con = 1 - this.es * Math.pow(sin_phi, 2);
          var d = x * Math.sqrt(con) / this.k0;
          var ds = Math.pow(d, 2);
          con = con * tan_phi;

          lat = phi - (con * ds / (1 - this.es)) * 0.5 * (1 -
            ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs -
            ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c -
            ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));

          lon = adjust_lon(this.long0 + (d * (1 -
            ds / 6 * (1 + 2 * t + c -
            ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c -
            ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi));
        }
        else {
          lat = HALF_PI * sign(y);
          lon = 0;
        }
      }

      p.x = lon;
      p.y = lat;

      return p;
    }

    var names$3 = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
    var tmerc = {
      init: init$2,
      forward: forward$2,
      inverse: inverse$2,
      names: names$3
    };

    var sinh = function(x) {
      var r = Math.exp(x);
      r = (r - 1 / r) / 2;
      return r;
    };

    var hypot = function(x, y) {
      x = Math.abs(x);
      y = Math.abs(y);
      var a = Math.max(x, y);
      var b = Math.min(x, y) / (a ? a : 1);

      return a * Math.sqrt(1 + Math.pow(b, 2));
    };

    var log1py = function(x) {
      var y = 1 + x;
      var z = y - 1;

      return z === 0 ? x : x * Math.log(y) / z;
    };

    var asinhy = function(x) {
      var y = Math.abs(x);
      y = log1py(y * (1 + y / (hypot(1, y) + 1)));

      return x < 0 ? -y : y;
    };

    var gatg = function(pp, B) {
      var cos_2B = 2 * Math.cos(2 * B);
      var i = pp.length - 1;
      var h1 = pp[i];
      var h2 = 0;
      var h;

      while (--i >= 0) {
        h = -h2 + cos_2B * h1 + pp[i];
        h2 = h1;
        h1 = h;
      }

      return (B + h * Math.sin(2 * B));
    };

    var clens = function(pp, arg_r) {
      var r = 2 * Math.cos(arg_r);
      var i = pp.length - 1;
      var hr1 = pp[i];
      var hr2 = 0;
      var hr;

      while (--i >= 0) {
        hr = -hr2 + r * hr1 + pp[i];
        hr2 = hr1;
        hr1 = hr;
      }

      return Math.sin(arg_r) * hr;
    };

    var cosh = function(x) {
      var r = Math.exp(x);
      r = (r + 1 / r) / 2;
      return r;
    };

    var clens_cmplx = function(pp, arg_r, arg_i) {
      var sin_arg_r = Math.sin(arg_r);
      var cos_arg_r = Math.cos(arg_r);
      var sinh_arg_i = sinh(arg_i);
      var cosh_arg_i = cosh(arg_i);
      var r = 2 * cos_arg_r * cosh_arg_i;
      var i = -2 * sin_arg_r * sinh_arg_i;
      var j = pp.length - 1;
      var hr = pp[j];
      var hi1 = 0;
      var hr1 = 0;
      var hi = 0;
      var hr2;
      var hi2;

      while (--j >= 0) {
        hr2 = hr1;
        hi2 = hi1;
        hr1 = hr;
        hi1 = hi;
        hr = -hr2 + r * hr1 - i * hi1 + pp[j];
        hi = -hi2 + i * hr1 + r * hi1;
      }

      r = sin_arg_r * cosh_arg_i;
      i = cos_arg_r * sinh_arg_i;

      return [r * hr - i * hi, r * hi + i * hr];
    };

    // Heavily based on this etmerc projection implementation
    // https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/etmerc.js

    function init$3() {
      if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
        throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
      }
      if (this.approx) {
        // When '+approx' is set, use tmerc instead
        tmerc.init.apply(this);
        this.forward = tmerc.forward;
        this.inverse = tmerc.inverse;
      }

      this.x0 = this.x0 !== undefined ? this.x0 : 0;
      this.y0 = this.y0 !== undefined ? this.y0 : 0;
      this.long0 = this.long0 !== undefined ? this.long0 : 0;
      this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

      this.cgb = [];
      this.cbg = [];
      this.utg = [];
      this.gtu = [];

      var f = this.es / (1 + Math.sqrt(1 - this.es));
      var n = f / (2 - f);
      var np = n;

      this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675 ))))));
      this.cbg[0] = n * (-2 + n * ( 2 / 3 + n * ( 4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));

      np = np * n;
      this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
      this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * ( -13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));

      np = np * n;
      this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
      this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));

      np = np * n;
      this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
      this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * ( -24832 / 14175)));

      np = np * n;
      this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
      this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));

      np = np * n;
      this.cgb[5] = np * (601676 / 22275);
      this.cbg[5] = np * (444337 / 155925);

      np = Math.pow(n, 2);
      this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));

      this.utg[0] = n * (-0.5 + n * ( 2 / 3 + n * (-37 / 96 + n * ( 1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
      this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));

      this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
      this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));

      np = np * n;
      this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720 ))));
      this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));

      np = np * n;
      this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
      this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));

      np = np * n;
      this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
      this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));

      np = np * n;
      this.utg[5] = np * (-20648693 / 638668800);
      this.gtu[5] = np * (212378941 / 319334400);

      var Z = gatg(this.cbg, this.lat0);
      this.Zb = -this.Qn * (Z + clens(this.gtu, 2 * Z));
    }

    function forward$3(p) {
      var Ce = adjust_lon(p.x - this.long0);
      var Cn = p.y;

      Cn = gatg(this.cbg, Cn);
      var sin_Cn = Math.sin(Cn);
      var cos_Cn = Math.cos(Cn);
      var sin_Ce = Math.sin(Ce);
      var cos_Ce = Math.cos(Ce);

      Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
      Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce));
      Ce = asinhy(Math.tan(Ce));

      var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);

      Cn = Cn + tmp[0];
      Ce = Ce + tmp[1];

      var x;
      var y;

      if (Math.abs(Ce) <= 2.623395162778) {
        x = this.a * (this.Qn * Ce) + this.x0;
        y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
      }
      else {
        x = Infinity;
        y = Infinity;
      }

      p.x = x;
      p.y = y;

      return p;
    }

    function inverse$3(p) {
      var Ce = (p.x - this.x0) * (1 / this.a);
      var Cn = (p.y - this.y0) * (1 / this.a);

      Cn = (Cn - this.Zb) / this.Qn;
      Ce = Ce / this.Qn;

      var lon;
      var lat;

      if (Math.abs(Ce) <= 2.623395162778) {
        var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);

        Cn = Cn + tmp[0];
        Ce = Ce + tmp[1];
        Ce = Math.atan(sinh(Ce));

        var sin_Cn = Math.sin(Cn);
        var cos_Cn = Math.cos(Cn);
        var sin_Ce = Math.sin(Ce);
        var cos_Ce = Math.cos(Ce);

        Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn));
        Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);

        lon = adjust_lon(Ce + this.long0);
        lat = gatg(this.cgb, Cn);
      }
      else {
        lon = Infinity;
        lat = Infinity;
      }

      p.x = lon;
      p.y = lat;

      return p;
    }

    var names$4 = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "tmerc"];
    var etmerc = {
      init: init$3,
      forward: forward$3,
      inverse: inverse$3,
      names: names$4
    };

    var adjust_zone = function(zone, lon) {
      if (zone === undefined) {
        zone = Math.floor((adjust_lon(lon) + Math.PI) * 30 / Math.PI) + 1;

        if (zone < 0) {
          return 0;
        } else if (zone > 60) {
          return 60;
        }
      }
      return zone;
    };

    var dependsOn = 'etmerc';
    function init$4() {
      var zone = adjust_zone(this.zone, this.long0);
      if (zone === undefined) {
        throw new Error('unknown utm zone');
      }
      this.lat0 = 0;
      this.long0 =  ((6 * Math.abs(zone)) - 183) * D2R;
      this.x0 = 500000;
      this.y0 = this.utmSouth ? 10000000 : 0;
      this.k0 = 0.9996;

      etmerc.init.apply(this);
      this.forward = etmerc.forward;
      this.inverse = etmerc.inverse;
    }

    var names$5 = ["Universal Transverse Mercator System", "utm"];
    var utm = {
      init: init$4,
      names: names$5,
      dependsOn: dependsOn
    };

    var srat = function(esinp, exp) {
      return (Math.pow((1 - esinp) / (1 + esinp), exp));
    };

    var MAX_ITER$1 = 20;
    function init$6() {
      var sphi = Math.sin(this.lat0);
      var cphi = Math.cos(this.lat0);
      cphi *= cphi;
      this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
      this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
      this.phic0 = Math.asin(sphi / this.C);
      this.ratexp = 0.5 * this.C * this.e;
      this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
    }

    function forward$5(p) {
      var lon = p.x;
      var lat = p.y;

      p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
      p.x = this.C * lon;
      return p;
    }

    function inverse$5(p) {
      var DEL_TOL = 1e-14;
      var lon = p.x / this.C;
      var lat = p.y;
      var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
      for (var i = MAX_ITER$1; i > 0; --i) {
        lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), - 0.5 * this.e)) - HALF_PI;
        if (Math.abs(lat - p.y) < DEL_TOL) {
          break;
        }
        p.y = lat;
      }
      /* convergence failed */
      if (!i) {
        return null;
      }
      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$7 = ["gauss"];
    var gauss = {
      init: init$6,
      forward: forward$5,
      inverse: inverse$5,
      names: names$7
    };

    function init$5() {
      gauss.init.apply(this);
      if (!this.rc) {
        return;
      }
      this.sinc0 = Math.sin(this.phic0);
      this.cosc0 = Math.cos(this.phic0);
      this.R2 = 2 * this.rc;
      if (!this.title) {
        this.title = "Oblique Stereographic Alternative";
      }
    }

    function forward$4(p) {
      var sinc, cosc, cosl, k;
      p.x = adjust_lon(p.x - this.long0);
      gauss.forward.apply(this, [p]);
      sinc = Math.sin(p.y);
      cosc = Math.cos(p.y);
      cosl = Math.cos(p.x);
      k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
      p.x = k * cosc * Math.sin(p.x);
      p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
      p.x = this.a * p.x + this.x0;
      p.y = this.a * p.y + this.y0;
      return p;
    }

    function inverse$4(p) {
      var sinc, cosc, lon, lat, rho;
      p.x = (p.x - this.x0) / this.a;
      p.y = (p.y - this.y0) / this.a;

      p.x /= this.k0;
      p.y /= this.k0;
      if ((rho = Math.sqrt(p.x * p.x + p.y * p.y))) {
        var c = 2 * Math.atan2(rho, this.R2);
        sinc = Math.sin(c);
        cosc = Math.cos(c);
        lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
        lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
      }
      else {
        lat = this.phic0;
        lon = 0;
      }

      p.x = lon;
      p.y = lat;
      gauss.inverse.apply(this, [p]);
      p.x = adjust_lon(p.x + this.long0);
      return p;
    }

    var names$6 = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea","Oblique Stereographic Alternative","Double_Stereographic"];
    var sterea = {
      init: init$5,
      forward: forward$4,
      inverse: inverse$4,
      names: names$6
    };

    function ssfn_(phit, sinphi, eccen) {
      sinphi *= eccen;
      return (Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen));
    }

    function init$7() {
      this.coslat0 = Math.cos(this.lat0);
      this.sinlat0 = Math.sin(this.lat0);
      if (this.sphere) {
        if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
          this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
        }
      }
      else {
        if (Math.abs(this.coslat0) <= EPSLN) {
          if (this.lat0 > 0) {
            //North pole
            //trace('stere:north pole');
            this.con = 1;
          }
          else {
            //South pole
            //trace('stere:south pole');
            this.con = -1;
          }
        }
        this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
        if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
          this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
        }
        this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
        this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
        this.cosX0 = Math.cos(this.X0);
        this.sinX0 = Math.sin(this.X0);
      }
    }

    // Stereographic forward equations--mapping lat,long to x,y
    function forward$6(p) {
      var lon = p.x;
      var lat = p.y;
      var sinlat = Math.sin(lat);
      var coslat = Math.cos(lat);
      var A, X, sinX, cosX, ts, rh;
      var dlon = adjust_lon(lon - this.long0);

      if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
        //case of the origine point
        //trace('stere:this is the origin point');
        p.x = NaN;
        p.y = NaN;
        return p;
      }
      if (this.sphere) {
        //trace('stere:sphere case');
        A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
        p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
        p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
        return p;
      }
      else {
        X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
        cosX = Math.cos(X);
        sinX = Math.sin(X);
        if (Math.abs(this.coslat0) <= EPSLN) {
          ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
          rh = 2 * this.a * this.k0 * ts / this.cons;
          p.x = this.x0 + rh * Math.sin(lon - this.long0);
          p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
          //trace(p.toString());
          return p;
        }
        else if (Math.abs(this.sinlat0) < EPSLN) {
          //Eq
          //trace('stere:equateur');
          A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
          p.y = A * sinX;
        }
        else {
          //other case
          //trace('stere:normal case');
          A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
          p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
        }
        p.x = A * cosX * Math.sin(dlon) + this.x0;
      }
      //trace(p.toString());
      return p;
    }

    //* Stereographic inverse equations--mapping x,y to lat/long
    function inverse$6(p) {
      p.x -= this.x0;
      p.y -= this.y0;
      var lon, lat, ts, ce, Chi;
      var rh = Math.sqrt(p.x * p.x + p.y * p.y);
      if (this.sphere) {
        var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
        lon = this.long0;
        lat = this.lat0;
        if (rh <= EPSLN) {
          p.x = lon;
          p.y = lat;
          return p;
        }
        lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
        if (Math.abs(this.coslat0) < EPSLN) {
          if (this.lat0 > 0) {
            lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
          }
          else {
            lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
          }
        }
        else {
          lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      else {
        if (Math.abs(this.coslat0) <= EPSLN) {
          if (rh <= EPSLN) {
            lat = this.lat0;
            lon = this.long0;
            p.x = lon;
            p.y = lat;
            //trace(p.toString());
            return p;
          }
          p.x *= this.con;
          p.y *= this.con;
          ts = rh * this.cons / (2 * this.a * this.k0);
          lat = this.con * phi2z(this.e, ts);
          lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, - 1 * p.y));
        }
        else {
          ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
          lon = this.long0;
          if (rh <= EPSLN) {
            Chi = this.X0;
          }
          else {
            Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
            lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
          }
          lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
        }
      }
      p.x = lon;
      p.y = lat;

      //trace(p.toString());
      return p;

    }

    var names$8 = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"];
    var stere = {
      init: init$7,
      forward: forward$6,
      inverse: inverse$6,
      names: names$8,
      ssfn_: ssfn_
    };

    /*
      references:
        Formules et constantes pour le Calcul pour la
        projection cylindrique conforme à axe oblique et pour la transformation entre
        des systèmes de référence.
        http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
      */

    function init$8() {
      var phy0 = this.lat0;
      this.lambda0 = this.long0;
      var sinPhy0 = Math.sin(phy0);
      var semiMajorAxis = this.a;
      var invF = this.rf;
      var flattening = 1 / invF;
      var e2 = 2 * flattening - Math.pow(flattening, 2);
      var e = this.e = Math.sqrt(e2);
      this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
      this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
      this.b0 = Math.asin(sinPhy0 / this.alpha);
      var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
      var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
      var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
      this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
    }

    function forward$7(p) {
      var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
      var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
      var S = -this.alpha * (Sa1 + Sa2) + this.K;

      // spheric latitude
      var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

      // spheric longitude
      var I = this.alpha * (p.x - this.lambda0);

      // psoeudo equatorial rotation
      var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));

      var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

      p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
      p.x = this.R * rotI + this.x0;
      return p;
    }

    function inverse$7(p) {
      var Y = p.x - this.x0;
      var X = p.y - this.y0;

      var rotI = Y / this.R;
      var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);

      var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
      var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));

      var lambda = this.lambda0 + I / this.alpha;

      var S = 0;
      var phy = b;
      var prevPhy = -1000;
      var iteration = 0;
      while (Math.abs(phy - prevPhy) > 0.0000001) {
        if (++iteration > 20) {
          //...reportError("omercFwdInfinity");
          return;
        }
        //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
        S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
        prevPhy = phy;
        phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
      }

      p.x = lambda;
      p.y = phy;
      return p;
    }

    var names$9 = ["somerc"];
    var somerc = {
      init: init$8,
      forward: forward$7,
      inverse: inverse$7,
      names: names$9
    };

    var TOL = 1e-7;

    function isTypeA(P) {
      var typeAProjections = ['Hotine_Oblique_Mercator','Hotine_Oblique_Mercator_Azimuth_Natural_Origin'];
      var projectionName = typeof P.PROJECTION === "object" ? Object.keys(P.PROJECTION)[0] : P.PROJECTION;
      
      return 'no_uoff' in P || 'no_off' in P || typeAProjections.indexOf(projectionName) !== -1;
    }


    /* Initialize the Oblique Mercator  projection
        ------------------------------------------*/
    function init$9() {  
      var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0,
        gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
      
      // only Type A uses the no_off or no_uoff property
      // https://github.com/OSGeo/proj.4/issues/104
      this.no_off = isTypeA(this);
      this.no_rot = 'no_rot' in this;
      
      var alp = false;
      if ("alpha" in this) {
        alp = true;
      }

      var gam = false;
      if ("rectified_grid_angle" in this) {
        gam = true;
      }

      if (alp) {
        alpha_c = this.alpha;
      }
      
      if (gam) {
        gamma = (this.rectified_grid_angle * D2R);
      }
      
      if (alp || gam) {
        lamc = this.longc;
      } else {
        lam1 = this.long1;
        phi1 = this.lat1;
        lam2 = this.long2;
        phi2 = this.lat2;
        
        if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL ||
            Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL ||
            Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
          throw new Error();
        }
      }
      
      var one_es = 1.0 - this.es;
      com = Math.sqrt(one_es);
      
      if (Math.abs(this.lat0) > EPSLN) {
        sinph0 = Math.sin(this.lat0);
        cosph0 = Math.cos(this.lat0);
        con = 1 - this.es * sinph0 * sinph0;
        this.B = cosph0 * cosph0;
        this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
        this.A = this.B * this.k0 * com / con;
        D = this.B * com / (cosph0 * Math.sqrt(con));
        F = D * D -1;
        
        if (F <= 0) {
          F = 0;
        } else {
          F = Math.sqrt(F);
          if (this.lat0 < 0) {
            F = -F;
          }
        }
        
        this.E = F += D;
        this.E *= Math.pow(tsfnz(this.e, this.lat0, sinph0), this.B);
      } else {
        this.B = 1 / com;
        this.A = this.k0;
        this.E = D = F = 1;
      }
      
      if (alp || gam) {
        if (alp) {
          gamma0 = Math.asin(Math.sin(alpha_c) / D);
          if (!gam) {
            gamma = alpha_c;
          }
        } else {
          gamma0 = gamma;
          alpha_c = Math.asin(D * Math.sin(gamma0));
        }
        this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
      } else {
        H = Math.pow(tsfnz(this.e, phi1, Math.sin(phi1)), this.B);
        L = Math.pow(tsfnz(this.e, phi2, Math.sin(phi2)), this.B);
        F = this.E / H;
        p = (L - H) / (L + H);
        J = this.E * this.E;
        J = (J - L * H) / (J + L * H);
        con = lam1 - lam2;
        
        if (con < -Math.pi) {
          lam2 -=TWO_PI;
        } else if (con > Math.pi) {
          lam2 += TWO_PI;
        }
        
        this.lam0 = adjust_lon(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B);
        gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon(lam1 - this.lam0)) / (F - 1 / F));
        gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
      }
      
      this.singam = Math.sin(gamma0);
      this.cosgam = Math.cos(gamma0);
      this.sinrot = Math.sin(gamma);
      this.cosrot = Math.cos(gamma);
      
      this.rB = 1 / this.B;
      this.ArB = this.A * this.rB;
      this.BrA = 1 / this.ArB;
      if (this.no_off) {
        this.u_0 = 0;
      } else {
        this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
        
        if (this.lat0 < 0) {
          this.u_0 = - this.u_0;
        }  
      }
        
      F = 0.5 * gamma0;
      this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
      this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
    }


    /* Oblique Mercator forward equations--mapping lat,long to x,y
        ----------------------------------------------------------*/
    function forward$8(p) {
      var coords = {};
      var S, T, U, V, W, temp, u, v;
      p.x = p.x - this.lam0;
      
      if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
        W = this.E / Math.pow(tsfnz(this.e, p.y, Math.sin(p.y)), this.B);
        
        temp = 1 / W;
        S = 0.5 * (W - temp);
        T = 0.5 * (W + temp);
        V = Math.sin(this.B * p.x);
        U = (S * this.singam - V * this.cosgam) / T;
            
        if (Math.abs(Math.abs(U) - 1.0) < EPSLN) {
          throw new Error();
        }
        
        v = 0.5 * this.ArB * Math.log((1 - U)/(1 + U));
        temp = Math.cos(this.B * p.x);
        
        if (Math.abs(temp) < TOL) {
          u = this.A * p.x;
        } else {
          u = this.ArB * Math.atan2((S * this.cosgam + V * this.singam), temp);
        }    
      } else {
        v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
        u = this.ArB * p.y;
      }
         
      if (this.no_rot) {
        coords.x = u;
        coords.y = v;
      } else {
        u -= this.u_0;
        coords.x = v * this.cosrot + u * this.sinrot;
        coords.y = u * this.cosrot - v * this.sinrot;
      }
      
      coords.x = (this.a * coords.x + this.x0);
      coords.y = (this.a * coords.y + this.y0);
      
      return coords;
    }

    function inverse$8(p) {
      var u, v, Qp, Sp, Tp, Vp, Up;
      var coords = {};
      
      p.x = (p.x - this.x0) * (1.0 / this.a);
      p.y = (p.y - this.y0) * (1.0 / this.a);

      if (this.no_rot) {
        v = p.y;
        u = p.x;
      } else {
        v = p.x * this.cosrot - p.y * this.sinrot;
        u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
      }
      
      Qp = Math.exp(-this.BrA * v);
      Sp = 0.5 * (Qp - 1 / Qp);
      Tp = 0.5 * (Qp + 1 / Qp);
      Vp = Math.sin(this.BrA * u);
      Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
      
      if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
        coords.x = 0;
        coords.y = Up < 0 ? -HALF_PI : HALF_PI;
      } else {
        coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
        coords.y = phi2z(this.e, Math.pow(coords.y, 1 / this.B));
        
        if (coords.y === Infinity) {
          throw new Error();
        }
            
        coords.x = -this.rB * Math.atan2((Sp * this.cosgam - Vp * this.singam), Math.cos(this.BrA * u));
      }
      
      coords.x += this.lam0;
      
      return coords;
    }

    var names$10 = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
    var omerc = {
      init: init$9,
      forward: forward$8,
      inverse: inverse$8,
      names: names$10
    };

    function init$10() {
      
      //double lat0;                    /* the reference latitude               */
      //double long0;                   /* the reference longitude              */
      //double lat1;                    /* first standard parallel              */
      //double lat2;                    /* second standard parallel             */
      //double r_maj;                   /* major axis                           */
      //double r_min;                   /* minor axis                           */
      //double false_east;              /* x offset in meters                   */
      //double false_north;             /* y offset in meters                   */
      
      //the above value can be set with proj4.defs
      //example: proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

      if (!this.lat2) {
        this.lat2 = this.lat1;
      } //if lat2 is not defined
      if (!this.k0) {
        this.k0 = 1;
      }
      this.x0 = this.x0 || 0;
      this.y0 = this.y0 || 0;
      // Standard Parallels cannot be equal and on opposite sides of the equator
      if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
        return;
      }

      var temp = this.b / this.a;
      this.e = Math.sqrt(1 - temp * temp);

      var sin1 = Math.sin(this.lat1);
      var cos1 = Math.cos(this.lat1);
      var ms1 = msfnz(this.e, sin1, cos1);
      var ts1 = tsfnz(this.e, this.lat1, sin1);

      var sin2 = Math.sin(this.lat2);
      var cos2 = Math.cos(this.lat2);
      var ms2 = msfnz(this.e, sin2, cos2);
      var ts2 = tsfnz(this.e, this.lat2, sin2);

      var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));

      if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
        this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
      }
      else {
        this.ns = sin1;
      }
      if (isNaN(this.ns)) {
        this.ns = sin1;
      }
      this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
      this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
      if (!this.title) {
        this.title = "Lambert Conformal Conic";
      }
    }

    // Lambert Conformal conic forward equations--mapping lat,long to x,y
    // -----------------------------------------------------------------
    function forward$9(p) {

      var lon = p.x;
      var lat = p.y;

      // singular cases :
      if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
        lat = sign(lat) * (HALF_PI - 2 * EPSLN);
      }

      var con = Math.abs(Math.abs(lat) - HALF_PI);
      var ts, rh1;
      if (con > EPSLN) {
        ts = tsfnz(this.e, lat, Math.sin(lat));
        rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
      }
      else {
        con = lat * this.ns;
        if (con <= 0) {
          return null;
        }
        rh1 = 0;
      }
      var theta = this.ns * adjust_lon(lon - this.long0);
      p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
      p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

      return p;
    }

    // Lambert Conformal Conic inverse equations--mapping x,y to lat/long
    // -----------------------------------------------------------------
    function inverse$9(p) {

      var rh1, con, ts;
      var lat, lon;
      var x = (p.x - this.x0) / this.k0;
      var y = (this.rh - (p.y - this.y0) / this.k0);
      if (this.ns > 0) {
        rh1 = Math.sqrt(x * x + y * y);
        con = 1;
      }
      else {
        rh1 = -Math.sqrt(x * x + y * y);
        con = -1;
      }
      var theta = 0;
      if (rh1 !== 0) {
        theta = Math.atan2((con * x), (con * y));
      }
      if ((rh1 !== 0) || (this.ns > 0)) {
        con = 1 / this.ns;
        ts = Math.pow((rh1 / (this.a * this.f0)), con);
        lat = phi2z(this.e, ts);
        if (lat === -9999) {
          return null;
        }
      }
      else {
        lat = -HALF_PI;
      }
      lon = adjust_lon(theta / this.ns + this.long0);

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$11 = [
      "Lambert Tangential Conformal Conic Projection",
      "Lambert_Conformal_Conic",
      "Lambert_Conformal_Conic_1SP",
      "Lambert_Conformal_Conic_2SP",
      "lcc"
    ];

    var lcc = {
      init: init$10,
      forward: forward$9,
      inverse: inverse$9,
      names: names$11
    };

    function init$11() {
      this.a = 6377397.155;
      this.es = 0.006674372230614;
      this.e = Math.sqrt(this.es);
      if (!this.lat0) {
        this.lat0 = 0.863937979737193;
      }
      if (!this.long0) {
        this.long0 = 0.7417649320975901 - 0.308341501185665;
      }
      /* if scale not set default to 0.9999 */
      if (!this.k0) {
        this.k0 = 0.9999;
      }
      this.s45 = 0.785398163397448; /* 45 */
      this.s90 = 2 * this.s45;
      this.fi0 = this.lat0;
      this.e2 = this.es;
      this.e = Math.sqrt(this.e2);
      this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2));
      this.uq = 1.04216856380474;
      this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
      this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
      this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
      this.k1 = this.k0;
      this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
      this.s0 = 1.37008346281555;
      this.n = Math.sin(this.s0);
      this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
      this.ad = this.s90 - this.uq;
    }

    /* ellipsoid */
    /* calculate xy from lat/lon */
    /* Constants, identical to inverse transform function */
    function forward$10(p) {
      var gfi, u, deltav, s, d, eps, ro;
      var lon = p.x;
      var lat = p.y;
      var delta_lon = adjust_lon(lon - this.long0);
      /* Transformation */
      gfi = Math.pow(((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat))), (this.alfa * this.e / 2));
      u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
      deltav = -delta_lon * this.alfa;
      s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
      d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
      eps = this.n * d;
      ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
      p.y = ro * Math.cos(eps) / 1;
      p.x = ro * Math.sin(eps) / 1;

      if (!this.czech) {
        p.y *= -1;
        p.x *= -1;
      }
      return (p);
    }

    /* calculate lat/lon from xy */
    function inverse$10(p) {
      var u, deltav, s, d, eps, ro, fi1;
      var ok;

      /* Transformation */
      /* revert y, x*/
      var tmp = p.x;
      p.x = p.y;
      p.y = tmp;
      if (!this.czech) {
        p.y *= -1;
        p.x *= -1;
      }
      ro = Math.sqrt(p.x * p.x + p.y * p.y);
      eps = Math.atan2(p.y, p.x);
      d = eps / Math.sin(this.s0);
      s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
      u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
      deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
      p.x = this.long0 - deltav / this.alfa;
      fi1 = u;
      ok = 0;
      var iter = 0;
      do {
        p.y = 2 * (Math.atan(Math.pow(this.k, - 1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
        if (Math.abs(fi1 - p.y) < 0.0000000001) {
          ok = 1;
        }
        fi1 = p.y;
        iter += 1;
      } while (ok === 0 && iter < 15);
      if (iter >= 15) {
        return null;
      }

      return (p);
    }

    var names$12 = ["Krovak", "krovak"];
    var krovak = {
      init: init$11,
      forward: forward$10,
      inverse: inverse$10,
      names: names$12
    };

    var mlfn = function(e0, e1, e2, e3, phi) {
      return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi));
    };

    var e0fn = function(x) {
      return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)));
    };

    var e1fn = function(x) {
      return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)));
    };

    var e2fn = function(x) {
      return (0.05859375 * x * x * (1 + 0.75 * x));
    };

    var e3fn = function(x) {
      return (x * x * x * (35 / 3072));
    };

    var gN = function(a, e, sinphi) {
      var temp = e * sinphi;
      return a / Math.sqrt(1 - temp * temp);
    };

    var adjust_lat = function(x) {
      return (Math.abs(x) < HALF_PI) ? x : (x - (sign(x) * Math.PI));
    };

    var imlfn = function(ml, e0, e1, e2, e3) {
      var phi;
      var dphi;

      phi = ml / e0;
      for (var i = 0; i < 15; i++) {
        dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
        phi += dphi;
        if (Math.abs(dphi) <= 0.0000000001) {
          return phi;
        }
      }

      //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
      return NaN;
    };

    function init$12() {
      if (!this.sphere) {
        this.e0 = e0fn(this.es);
        this.e1 = e1fn(this.es);
        this.e2 = e2fn(this.es);
        this.e3 = e3fn(this.es);
        this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
      }
    }

    /* Cassini forward equations--mapping lat,long to x,y
      -----------------------------------------------------------------------*/
    function forward$11(p) {

      /* Forward equations
          -----------------*/
      var x, y;
      var lam = p.x;
      var phi = p.y;
      lam = adjust_lon(lam - this.long0);

      if (this.sphere) {
        x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
        y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
      }
      else {
        //ellipsoid
        var sinphi = Math.sin(phi);
        var cosphi = Math.cos(phi);
        var nl = gN(this.a, this.e, sinphi);
        var tl = Math.tan(phi) * Math.tan(phi);
        var al = lam * Math.cos(phi);
        var asq = al * al;
        var cl = this.es * cosphi * cosphi / (1 - this.es);
        var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);

        x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
        y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);


      }

      p.x = x + this.x0;
      p.y = y + this.y0;
      return p;
    }

    /* Inverse equations
      -----------------*/
    function inverse$11(p) {
      p.x -= this.x0;
      p.y -= this.y0;
      var x = p.x / this.a;
      var y = p.y / this.a;
      var phi, lam;

      if (this.sphere) {
        var dd = y + this.lat0;
        phi = Math.asin(Math.sin(dd) * Math.cos(x));
        lam = Math.atan2(Math.tan(x), Math.cos(dd));
      }
      else {
        /* ellipsoid */
        var ml1 = this.ml0 / this.a + y;
        var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
        if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
          p.x = this.long0;
          p.y = HALF_PI;
          if (y < 0) {
            p.y *= -1;
          }
          return p;
        }
        var nl1 = gN(this.a, this.e, Math.sin(phi1));

        var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
        var tl1 = Math.pow(Math.tan(phi1), 2);
        var dl = x * this.a / nl1;
        var dsq = dl * dl;
        phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
        lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);

      }

      p.x = adjust_lon(lam + this.long0);
      p.y = adjust_lat(phi);
      return p;

    }

    var names$13 = ["Cassini", "Cassini_Soldner", "cass"];
    var cass = {
      init: init$12,
      forward: forward$11,
      inverse: inverse$11,
      names: names$13
    };

    var qsfnz = function(eccent, sinphi) {
      var con;
      if (eccent > 1.0e-7) {
        con = eccent * sinphi;
        return ((1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con))));
      }
      else {
        return (2 * sinphi);
      }
    };

    /*
      reference
        "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
        The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
      */

    var S_POLE = 1;

    var N_POLE = 2;
    var EQUIT = 3;
    var OBLIQ = 4;

    /* Initialize the Lambert Azimuthal Equal Area projection
      ------------------------------------------------------*/
    function init$13() {
      var t = Math.abs(this.lat0);
      if (Math.abs(t - HALF_PI) < EPSLN) {
        this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
      }
      else if (Math.abs(t) < EPSLN) {
        this.mode = this.EQUIT;
      }
      else {
        this.mode = this.OBLIQ;
      }
      if (this.es > 0) {
        var sinphi;

        this.qp = qsfnz(this.e, 1);
        this.mmf = 0.5 / (1 - this.es);
        this.apa = authset(this.es);
        switch (this.mode) {
        case this.N_POLE:
          this.dd = 1;
          break;
        case this.S_POLE:
          this.dd = 1;
          break;
        case this.EQUIT:
          this.rq = Math.sqrt(0.5 * this.qp);
          this.dd = 1 / this.rq;
          this.xmf = 1;
          this.ymf = 0.5 * this.qp;
          break;
        case this.OBLIQ:
          this.rq = Math.sqrt(0.5 * this.qp);
          sinphi = Math.sin(this.lat0);
          this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
          this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
          this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
          this.ymf = (this.xmf = this.rq) / this.dd;
          this.xmf *= this.dd;
          break;
        }
      }
      else {
        if (this.mode === this.OBLIQ) {
          this.sinph0 = Math.sin(this.lat0);
          this.cosph0 = Math.cos(this.lat0);
        }
      }
    }

    /* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
      -----------------------------------------------------------------------*/
    function forward$12(p) {

      /* Forward equations
          -----------------*/
      var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
      var lam = p.x;
      var phi = p.y;

      lam = adjust_lon(lam - this.long0);
      if (this.sphere) {
        sinphi = Math.sin(phi);
        cosphi = Math.cos(phi);
        coslam = Math.cos(lam);
        if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
          y = (this.mode === this.EQUIT) ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
          if (y <= EPSLN) {
            return null;
          }
          y = Math.sqrt(2 / y);
          x = y * cosphi * Math.sin(lam);
          y *= (this.mode === this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
        }
        else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
          if (this.mode === this.N_POLE) {
            coslam = -coslam;
          }
          if (Math.abs(phi + this.lat0) < EPSLN) {
            return null;
          }
          y = FORTPI - phi * 0.5;
          y = 2 * ((this.mode === this.S_POLE) ? Math.cos(y) : Math.sin(y));
          x = y * Math.sin(lam);
          y *= coslam;
        }
      }
      else {
        sinb = 0;
        cosb = 0;
        b = 0;
        coslam = Math.cos(lam);
        sinlam = Math.sin(lam);
        sinphi = Math.sin(phi);
        q = qsfnz(this.e, sinphi);
        if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
          sinb = q / this.qp;
          cosb = Math.sqrt(1 - sinb * sinb);
        }
        switch (this.mode) {
        case this.OBLIQ:
          b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
          break;
        case this.EQUIT:
          b = 1 + cosb * coslam;
          break;
        case this.N_POLE:
          b = HALF_PI + phi;
          q = this.qp - q;
          break;
        case this.S_POLE:
          b = phi - HALF_PI;
          q = this.qp + q;
          break;
        }
        if (Math.abs(b) < EPSLN) {
          return null;
        }
        switch (this.mode) {
        case this.OBLIQ:
        case this.EQUIT:
          b = Math.sqrt(2 / b);
          if (this.mode === this.OBLIQ) {
            y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
          }
          else {
            y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
          }
          x = this.xmf * b * cosb * sinlam;
          break;
        case this.N_POLE:
        case this.S_POLE:
          if (q >= 0) {
            x = (b = Math.sqrt(q)) * sinlam;
            y = coslam * ((this.mode === this.S_POLE) ? b : -b);
          }
          else {
            x = y = 0;
          }
          break;
        }
      }

      p.x = this.a * x + this.x0;
      p.y = this.a * y + this.y0;
      return p;
    }

    /* Inverse equations
      -----------------*/
    function inverse$12(p) {
      p.x -= this.x0;
      p.y -= this.y0;
      var x = p.x / this.a;
      var y = p.y / this.a;
      var lam, phi, cCe, sCe, q, rho, ab;
      if (this.sphere) {
        var cosz = 0,
          rh, sinz = 0;

        rh = Math.sqrt(x * x + y * y);
        phi = rh * 0.5;
        if (phi > 1) {
          return null;
        }
        phi = 2 * Math.asin(phi);
        if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
          sinz = Math.sin(phi);
          cosz = Math.cos(phi);
        }
        switch (this.mode) {
        case this.EQUIT:
          phi = (Math.abs(rh) <= EPSLN) ? 0 : Math.asin(y * sinz / rh);
          x *= sinz;
          y = cosz * rh;
          break;
        case this.OBLIQ:
          phi = (Math.abs(rh) <= EPSLN) ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
          x *= sinz * this.cosph0;
          y = (cosz - Math.sin(phi) * this.sinph0) * rh;
          break;
        case this.N_POLE:
          y = -y;
          phi = HALF_PI - phi;
          break;
        case this.S_POLE:
          phi -= HALF_PI;
          break;
        }
        lam = (y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ)) ? 0 : Math.atan2(x, y);
      }
      else {
        ab = 0;
        if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
          x /= this.dd;
          y *= this.dd;
          rho = Math.sqrt(x * x + y * y);
          if (rho < EPSLN) {
            p.x = this.long0;
            p.y = this.lat0;
            return p;
          }
          sCe = 2 * Math.asin(0.5 * rho / this.rq);
          cCe = Math.cos(sCe);
          x *= (sCe = Math.sin(sCe));
          if (this.mode === this.OBLIQ) {
            ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
            q = this.qp * ab;
            y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
          }
          else {
            ab = y * sCe / rho;
            q = this.qp * ab;
            y = rho * cCe;
          }
        }
        else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
          if (this.mode === this.N_POLE) {
            y = -y;
          }
          q = (x * x + y * y);
          if (!q) {
            p.x = this.long0;
            p.y = this.lat0;
            return p;
          }
          ab = 1 - q / this.qp;
          if (this.mode === this.S_POLE) {
            ab = -ab;
          }
        }
        lam = Math.atan2(x, y);
        phi = authlat(Math.asin(ab), this.apa);
      }

      p.x = adjust_lon(this.long0 + lam);
      p.y = phi;
      return p;
    }

    /* determine latitude from authalic latitude */
    var P00 = 0.33333333333333333333;

    var P01 = 0.17222222222222222222;
    var P02 = 0.10257936507936507936;
    var P10 = 0.06388888888888888888;
    var P11 = 0.06640211640211640211;
    var P20 = 0.01641501294219154443;

    function authset(es) {
      var t;
      var APA = [];
      APA[0] = es * P00;
      t = es * es;
      APA[0] += t * P01;
      APA[1] = t * P10;
      t *= es;
      APA[0] += t * P02;
      APA[1] += t * P11;
      APA[2] = t * P20;
      return APA;
    }

    function authlat(beta, APA) {
      var t = beta + beta;
      return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t));
    }

    var names$14 = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
    var laea = {
      init: init$13,
      forward: forward$12,
      inverse: inverse$12,
      names: names$14,
      S_POLE: S_POLE,
      N_POLE: N_POLE,
      EQUIT: EQUIT,
      OBLIQ: OBLIQ
    };

    var asinz = function(x) {
      if (Math.abs(x) > 1) {
        x = (x > 1) ? 1 : -1;
      }
      return Math.asin(x);
    };

    function init$14() {

      if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
        return;
      }
      this.temp = this.b / this.a;
      this.es = 1 - Math.pow(this.temp, 2);
      this.e3 = Math.sqrt(this.es);

      this.sin_po = Math.sin(this.lat1);
      this.cos_po = Math.cos(this.lat1);
      this.t1 = this.sin_po;
      this.con = this.sin_po;
      this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
      this.qs1 = qsfnz(this.e3, this.sin_po, this.cos_po);

      this.sin_po = Math.sin(this.lat2);
      this.cos_po = Math.cos(this.lat2);
      this.t2 = this.sin_po;
      this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
      this.qs2 = qsfnz(this.e3, this.sin_po, this.cos_po);

      this.sin_po = Math.sin(this.lat0);
      this.cos_po = Math.cos(this.lat0);
      this.t3 = this.sin_po;
      this.qs0 = qsfnz(this.e3, this.sin_po, this.cos_po);

      if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
        this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
      }
      else {
        this.ns0 = this.con;
      }
      this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
      this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
    }

    /* Albers Conical Equal Area forward equations--mapping lat,long to x,y
      -------------------------------------------------------------------*/
    function forward$13(p) {

      var lon = p.x;
      var lat = p.y;

      this.sin_phi = Math.sin(lat);
      this.cos_phi = Math.cos(lat);

      var qs = qsfnz(this.e3, this.sin_phi, this.cos_phi);
      var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
      var theta = this.ns0 * adjust_lon(lon - this.long0);
      var x = rh1 * Math.sin(theta) + this.x0;
      var y = this.rh - rh1 * Math.cos(theta) + this.y0;

      p.x = x;
      p.y = y;
      return p;
    }

    function inverse$13(p) {
      var rh1, qs, con, theta, lon, lat;

      p.x -= this.x0;
      p.y = this.rh - p.y + this.y0;
      if (this.ns0 >= 0) {
        rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
        con = 1;
      }
      else {
        rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
        con = -1;
      }
      theta = 0;
      if (rh1 !== 0) {
        theta = Math.atan2(con * p.x, con * p.y);
      }
      con = rh1 * this.ns0 / this.a;
      if (this.sphere) {
        lat = Math.asin((this.c - con * con) / (2 * this.ns0));
      }
      else {
        qs = (this.c - con * con) / this.ns0;
        lat = this.phi1z(this.e3, qs);
      }

      lon = adjust_lon(theta / this.ns0 + this.long0);
      p.x = lon;
      p.y = lat;
      return p;
    }

    /* Function to compute phi1, the latitude for the inverse of the
       Albers Conical Equal-Area projection.
    -------------------------------------------*/
    function phi1z(eccent, qs) {
      var sinphi, cosphi, con, com, dphi;
      var phi = asinz(0.5 * qs);
      if (eccent < EPSLN) {
        return phi;
      }

      var eccnts = eccent * eccent;
      for (var i = 1; i <= 25; i++) {
        sinphi = Math.sin(phi);
        cosphi = Math.cos(phi);
        con = eccent * sinphi;
        com = 1 - con * con;
        dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
        phi = phi + dphi;
        if (Math.abs(dphi) <= 1e-7) {
          return phi;
        }
      }
      return null;
    }

    var names$15 = ["Albers_Conic_Equal_Area", "Albers", "aea"];
    var aea = {
      init: init$14,
      forward: forward$13,
      inverse: inverse$13,
      names: names$15,
      phi1z: phi1z
    };

    /*
      reference:
        Wolfram Mathworld "Gnomonic Projection"
        http://mathworld.wolfram.com/GnomonicProjection.html
        Accessed: 12th November 2009
      */
    function init$15() {

      /* Place parameters in static storage for common use
          -------------------------------------------------*/
      this.sin_p14 = Math.sin(this.lat0);
      this.cos_p14 = Math.cos(this.lat0);
      // Approximation for projecting points to the horizon (infinity)
      this.infinity_dist = 1000 * this.a;
      this.rc = 1;
    }

    /* Gnomonic forward equations--mapping lat,long to x,y
        ---------------------------------------------------*/
    function forward$14(p) {
      var sinphi, cosphi; /* sin and cos value        */
      var dlon; /* delta longitude value      */
      var coslon; /* cos of longitude        */
      var ksp; /* scale factor          */
      var g;
      var x, y;
      var lon = p.x;
      var lat = p.y;
      /* Forward equations
          -----------------*/
      dlon = adjust_lon(lon - this.long0);

      sinphi = Math.sin(lat);
      cosphi = Math.cos(lat);

      coslon = Math.cos(dlon);
      g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
      ksp = 1;
      if ((g > 0) || (Math.abs(g) <= EPSLN)) {
        x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
        y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
      }
      else {

        // Point is in the opposing hemisphere and is unprojectable
        // We still need to return a reasonable point, so we project
        // to infinity, on a bearing
        // equivalent to the northern hemisphere equivalent
        // This is a reasonable approximation for short shapes and lines that
        // straddle the horizon.

        x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
        y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

      }
      p.x = x;
      p.y = y;
      return p;
    }

    function inverse$14(p) {
      var rh; /* Rho */
      var sinc, cosc;
      var c;
      var lon, lat;

      /* Inverse equations
          -----------------*/
      p.x = (p.x - this.x0) / this.a;
      p.y = (p.y - this.y0) / this.a;

      p.x /= this.k0;
      p.y /= this.k0;

      if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
        c = Math.atan2(rh, this.rc);
        sinc = Math.sin(c);
        cosc = Math.cos(c);

        lat = asinz(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh);
        lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
        lon = adjust_lon(this.long0 + lon);
      }
      else {
        lat = this.phic0;
        lon = 0;
      }

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$16 = ["gnom"];
    var gnom = {
      init: init$15,
      forward: forward$14,
      inverse: inverse$14,
      names: names$16
    };

    var iqsfnz = function(eccent, q) {
      var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
      if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
        if (q < 0) {
          return (-1 * HALF_PI);
        }
        else {
          return HALF_PI;
        }
      }
      //var phi = 0.5* q/(1-eccent*eccent);
      var phi = Math.asin(0.5 * q);
      var dphi;
      var sin_phi;
      var cos_phi;
      var con;
      for (var i = 0; i < 30; i++) {
        sin_phi = Math.sin(phi);
        cos_phi = Math.cos(phi);
        con = eccent * sin_phi;
        dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
        phi += dphi;
        if (Math.abs(dphi) <= 0.0000000001) {
          return phi;
        }
      }

      //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
      return NaN;
    };

    /*
      reference:
        "Cartographic Projection Procedures for the UNIX Environment-
        A User's Manual" by Gerald I. Evenden,
        USGS Open File Report 90-284and Release 4 Interim Reports (2003)
    */
    function init$16() {
      //no-op
      if (!this.sphere) {
        this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
      }
    }

    /* Cylindrical Equal Area forward equations--mapping lat,long to x,y
        ------------------------------------------------------------*/
    function forward$15(p) {
      var lon = p.x;
      var lat = p.y;
      var x, y;
      /* Forward equations
          -----------------*/
      var dlon = adjust_lon(lon - this.long0);
      if (this.sphere) {
        x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
        y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
      }
      else {
        var qs = qsfnz(this.e, Math.sin(lat));
        x = this.x0 + this.a * this.k0 * dlon;
        y = this.y0 + this.a * qs * 0.5 / this.k0;
      }

      p.x = x;
      p.y = y;
      return p;
    }

    /* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
        ------------------------------------------------------------*/
    function inverse$15(p) {
      p.x -= this.x0;
      p.y -= this.y0;
      var lon, lat;

      if (this.sphere) {
        lon = adjust_lon(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts));
        lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts));
      }
      else {
        lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
        lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
      }

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$17 = ["cea"];
    var cea = {
      init: init$16,
      forward: forward$15,
      inverse: inverse$15,
      names: names$17
    };

    function init$17() {

      this.x0 = this.x0 || 0;
      this.y0 = this.y0 || 0;
      this.lat0 = this.lat0 || 0;
      this.long0 = this.long0 || 0;
      this.lat_ts = this.lat_ts || 0;
      this.title = this.title || "Equidistant Cylindrical (Plate Carre)";

      this.rc = Math.cos(this.lat_ts);
    }

    // forward equations--mapping lat,long to x,y
    // -----------------------------------------------------------------
    function forward$16(p) {

      var lon = p.x;
      var lat = p.y;

      var dlon = adjust_lon(lon - this.long0);
      var dlat = adjust_lat(lat - this.lat0);
      p.x = this.x0 + (this.a * dlon * this.rc);
      p.y = this.y0 + (this.a * dlat);
      return p;
    }

    // inverse equations--mapping x,y to lat/long
    // -----------------------------------------------------------------
    function inverse$16(p) {

      var x = p.x;
      var y = p.y;

      p.x = adjust_lon(this.long0 + ((x - this.x0) / (this.a * this.rc)));
      p.y = adjust_lat(this.lat0 + ((y - this.y0) / (this.a)));
      return p;
    }

    var names$18 = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
    var eqc = {
      init: init$17,
      forward: forward$16,
      inverse: inverse$16,
      names: names$18
    };

    var MAX_ITER$2 = 20;

    function init$18() {
      /* Place parameters in static storage for common use
          -------------------------------------------------*/
      this.temp = this.b / this.a;
      this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
      this.e = Math.sqrt(this.es);
      this.e0 = e0fn(this.es);
      this.e1 = e1fn(this.es);
      this.e2 = e2fn(this.es);
      this.e3 = e3fn(this.es);
      this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
    }

    /* Polyconic forward equations--mapping lat,long to x,y
        ---------------------------------------------------*/
    function forward$17(p) {
      var lon = p.x;
      var lat = p.y;
      var x, y, el;
      var dlon = adjust_lon(lon - this.long0);
      el = dlon * Math.sin(lat);
      if (this.sphere) {
        if (Math.abs(lat) <= EPSLN) {
          x = this.a * dlon;
          y = -1 * this.a * this.lat0;
        }
        else {
          x = this.a * Math.sin(el) / Math.tan(lat);
          y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
        }
      }
      else {
        if (Math.abs(lat) <= EPSLN) {
          x = this.a * dlon;
          y = -1 * this.ml0;
        }
        else {
          var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
          x = nl * Math.sin(el);
          y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
        }

      }
      p.x = x + this.x0;
      p.y = y + this.y0;
      return p;
    }

    /* Inverse equations
      -----------------*/
    function inverse$17(p) {
      var lon, lat, x, y, i;
      var al, bl;
      var phi, dphi;
      x = p.x - this.x0;
      y = p.y - this.y0;

      if (this.sphere) {
        if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
          lon = adjust_lon(x / this.a + this.long0);
          lat = 0;
        }
        else {
          al = this.lat0 + y / this.a;
          bl = x * x / this.a / this.a + al * al;
          phi = al;
          var tanphi;
          for (i = MAX_ITER$2; i; --i) {
            tanphi = Math.tan(phi);
            dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
            phi += dphi;
            if (Math.abs(dphi) <= EPSLN) {
              lat = phi;
              break;
            }
          }
          lon = adjust_lon(this.long0 + (Math.asin(x * Math.tan(phi) / this.a)) / Math.sin(lat));
        }
      }
      else {
        if (Math.abs(y + this.ml0) <= EPSLN) {
          lat = 0;
          lon = adjust_lon(this.long0 + x / this.a);
        }
        else {

          al = (this.ml0 + y) / this.a;
          bl = x * x / this.a / this.a + al * al;
          phi = al;
          var cl, mln, mlnp, ma;
          var con;
          for (i = MAX_ITER$2; i; --i) {
            con = this.e * Math.sin(phi);
            cl = Math.sqrt(1 - con * con) * Math.tan(phi);
            mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
            mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
            ma = mln / this.a;
            dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
            phi -= dphi;
            if (Math.abs(dphi) <= EPSLN) {
              lat = phi;
              break;
            }
          }

          //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
          cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
          lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
        }
      }

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$19 = ["Polyconic", "poly"];
    var poly = {
      init: init$18,
      forward: forward$17,
      inverse: inverse$17,
      names: names$19
    };

    /*
      reference
        Department of Land and Survey Technical Circular 1973/32
          http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf
        OSG Technical Report 4.1
          http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf
      */

    /**
     * iterations: Number of iterations to refine inverse transform.
     *     0 -> km accuracy
     *     1 -> m accuracy -- suitable for most mapping applications
     *     2 -> mm accuracy
     */


    function init$19() {
      this.A = [];
      this.A[1] = 0.6399175073;
      this.A[2] = -0.1358797613;
      this.A[3] = 0.063294409;
      this.A[4] = -0.02526853;
      this.A[5] = 0.0117879;
      this.A[6] = -0.0055161;
      this.A[7] = 0.0026906;
      this.A[8] = -0.001333;
      this.A[9] = 0.00067;
      this.A[10] = -0.00034;

      this.B_re = [];
      this.B_im = [];
      this.B_re[1] = 0.7557853228;
      this.B_im[1] = 0;
      this.B_re[2] = 0.249204646;
      this.B_im[2] = 0.003371507;
      this.B_re[3] = -0.001541739;
      this.B_im[3] = 0.041058560;
      this.B_re[4] = -0.10162907;
      this.B_im[4] = 0.01727609;
      this.B_re[5] = -0.26623489;
      this.B_im[5] = -0.36249218;
      this.B_re[6] = -0.6870983;
      this.B_im[6] = -1.1651967;

      this.C_re = [];
      this.C_im = [];
      this.C_re[1] = 1.3231270439;
      this.C_im[1] = 0;
      this.C_re[2] = -0.577245789;
      this.C_im[2] = -0.007809598;
      this.C_re[3] = 0.508307513;
      this.C_im[3] = -0.112208952;
      this.C_re[4] = -0.15094762;
      this.C_im[4] = 0.18200602;
      this.C_re[5] = 1.01418179;
      this.C_im[5] = 1.64497696;
      this.C_re[6] = 1.9660549;
      this.C_im[6] = 2.5127645;

      this.D = [];
      this.D[1] = 1.5627014243;
      this.D[2] = 0.5185406398;
      this.D[3] = -0.03333098;
      this.D[4] = -0.1052906;
      this.D[5] = -0.0368594;
      this.D[6] = 0.007317;
      this.D[7] = 0.01220;
      this.D[8] = 0.00394;
      this.D[9] = -0.0013;
    }

    /**
        New Zealand Map Grid Forward  - long/lat to x/y
        long/lat in radians
      */
    function forward$18(p) {
      var n;
      var lon = p.x;
      var lat = p.y;

      var delta_lat = lat - this.lat0;
      var delta_lon = lon - this.long0;

      // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
      // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
      var d_phi = delta_lat / SEC_TO_RAD * 1E-5;
      var d_lambda = delta_lon;
      var d_phi_n = 1; // d_phi^0

      var d_psi = 0;
      for (n = 1; n <= 10; n++) {
        d_phi_n = d_phi_n * d_phi;
        d_psi = d_psi + this.A[n] * d_phi_n;
      }

      // 2. Calculate theta
      var th_re = d_psi;
      var th_im = d_lambda;

      // 3. Calculate z
      var th_n_re = 1;
      var th_n_im = 0; // theta^0
      var th_n_re1;
      var th_n_im1;

      var z_re = 0;
      var z_im = 0;
      for (n = 1; n <= 6; n++) {
        th_n_re1 = th_n_re * th_re - th_n_im * th_im;
        th_n_im1 = th_n_im * th_re + th_n_re * th_im;
        th_n_re = th_n_re1;
        th_n_im = th_n_im1;
        z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
        z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
      }

      // 4. Calculate easting and northing
      p.x = (z_im * this.a) + this.x0;
      p.y = (z_re * this.a) + this.y0;

      return p;
    }

    /**
        New Zealand Map Grid Inverse  -  x/y to long/lat
      */
    function inverse$18(p) {
      var n;
      var x = p.x;
      var y = p.y;

      var delta_x = x - this.x0;
      var delta_y = y - this.y0;

      // 1. Calculate z
      var z_re = delta_y / this.a;
      var z_im = delta_x / this.a;

      // 2a. Calculate theta - first approximation gives km accuracy
      var z_n_re = 1;
      var z_n_im = 0; // z^0
      var z_n_re1;
      var z_n_im1;

      var th_re = 0;
      var th_im = 0;
      for (n = 1; n <= 6; n++) {
        z_n_re1 = z_n_re * z_re - z_n_im * z_im;
        z_n_im1 = z_n_im * z_re + z_n_re * z_im;
        z_n_re = z_n_re1;
        z_n_im = z_n_im1;
        th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
        th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
      }

      // 2b. Iterate to refine the accuracy of the calculation
      //        0 iterations gives km accuracy
      //        1 iteration gives m accuracy -- good enough for most mapping applications
      //        2 iterations bives mm accuracy
      for (var i = 0; i < this.iterations; i++) {
        var th_n_re = th_re;
        var th_n_im = th_im;
        var th_n_re1;
        var th_n_im1;

        var num_re = z_re;
        var num_im = z_im;
        for (n = 2; n <= 6; n++) {
          th_n_re1 = th_n_re * th_re - th_n_im * th_im;
          th_n_im1 = th_n_im * th_re + th_n_re * th_im;
          th_n_re = th_n_re1;
          th_n_im = th_n_im1;
          num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
          num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
        }

        th_n_re = 1;
        th_n_im = 0;
        var den_re = this.B_re[1];
        var den_im = this.B_im[1];
        for (n = 2; n <= 6; n++) {
          th_n_re1 = th_n_re * th_re - th_n_im * th_im;
          th_n_im1 = th_n_im * th_re + th_n_re * th_im;
          th_n_re = th_n_re1;
          th_n_im = th_n_im1;
          den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
          den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
        }

        // Complex division
        var den2 = den_re * den_re + den_im * den_im;
        th_re = (num_re * den_re + num_im * den_im) / den2;
        th_im = (num_im * den_re - num_re * den_im) / den2;
      }

      // 3. Calculate d_phi              ...                                    // and d_lambda
      var d_psi = th_re;
      var d_lambda = th_im;
      var d_psi_n = 1; // d_psi^0

      var d_phi = 0;
      for (n = 1; n <= 9; n++) {
        d_psi_n = d_psi_n * d_psi;
        d_phi = d_phi + this.D[n] * d_psi_n;
      }

      // 4. Calculate latitude and longitude
      // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
      var lat = this.lat0 + (d_phi * SEC_TO_RAD * 1E5);
      var lon = this.long0 + d_lambda;

      p.x = lon;
      p.y = lat;

      return p;
    }

    var names$20 = ["New_Zealand_Map_Grid", "nzmg"];
    var nzmg = {
      init: init$19,
      forward: forward$18,
      inverse: inverse$18,
      names: names$20
    };

    /*
      reference
        "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
        The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
      */


    /* Initialize the Miller Cylindrical projection
      -------------------------------------------*/
    function init$20() {
      //no-op
    }

    /* Miller Cylindrical forward equations--mapping lat,long to x,y
        ------------------------------------------------------------*/
    function forward$19(p) {
      var lon = p.x;
      var lat = p.y;
      /* Forward equations
          -----------------*/
      var dlon = adjust_lon(lon - this.long0);
      var x = this.x0 + this.a * dlon;
      var y = this.y0 + this.a * Math.log(Math.tan((Math.PI / 4) + (lat / 2.5))) * 1.25;

      p.x = x;
      p.y = y;
      return p;
    }

    /* Miller Cylindrical inverse equations--mapping x,y to lat/long
        ------------------------------------------------------------*/
    function inverse$19(p) {
      p.x -= this.x0;
      p.y -= this.y0;

      var lon = adjust_lon(this.long0 + p.x / this.a);
      var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$21 = ["Miller_Cylindrical", "mill"];
    var mill = {
      init: init$20,
      forward: forward$19,
      inverse: inverse$19,
      names: names$21
    };

    var MAX_ITER$3 = 20;
    function init$21() {
      /* Place parameters in static storage for common use
        -------------------------------------------------*/


      if (!this.sphere) {
        this.en = pj_enfn(this.es);
      }
      else {
        this.n = 1;
        this.m = 0;
        this.es = 0;
        this.C_y = Math.sqrt((this.m + 1) / this.n);
        this.C_x = this.C_y / (this.m + 1);
      }

    }

    /* Sinusoidal forward equations--mapping lat,long to x,y
      -----------------------------------------------------*/
    function forward$20(p) {
      var x, y;
      var lon = p.x;
      var lat = p.y;
      /* Forward equations
        -----------------*/
      lon = adjust_lon(lon - this.long0);

      if (this.sphere) {
        if (!this.m) {
          lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
        }
        else {
          var k = this.n * Math.sin(lat);
          for (var i = MAX_ITER$3; i; --i) {
            var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
            lat -= V;
            if (Math.abs(V) < EPSLN) {
              break;
            }
          }
        }
        x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
        y = this.a * this.C_y * lat;

      }
      else {

        var s = Math.sin(lat);
        var c = Math.cos(lat);
        y = this.a * pj_mlfn(lat, s, c, this.en);
        x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
      }

      p.x = x;
      p.y = y;
      return p;
    }

    function inverse$20(p) {
      var lat, temp, lon, s;

      p.x -= this.x0;
      lon = p.x / this.a;
      p.y -= this.y0;
      lat = p.y / this.a;

      if (this.sphere) {
        lat /= this.C_y;
        lon = lon / (this.C_x * (this.m + Math.cos(lat)));
        if (this.m) {
          lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
        }
        else if (this.n !== 1) {
          lat = asinz(Math.sin(lat) / this.n);
        }
        lon = adjust_lon(lon + this.long0);
        lat = adjust_lat(lat);
      }
      else {
        lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
        s = Math.abs(lat);
        if (s < HALF_PI) {
          s = Math.sin(lat);
          temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
          //temp = this.long0 + p.x / (this.a * Math.cos(lat));
          lon = adjust_lon(temp);
        }
        else if ((s - EPSLN) < HALF_PI) {
          lon = this.long0;
        }
      }
      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$22 = ["Sinusoidal", "sinu"];
    var sinu = {
      init: init$21,
      forward: forward$20,
      inverse: inverse$20,
      names: names$22
    };

    function init$22() {}
    /* Mollweide forward equations--mapping lat,long to x,y
        ----------------------------------------------------*/
    function forward$21(p) {

      /* Forward equations
          -----------------*/
      var lon = p.x;
      var lat = p.y;

      var delta_lon = adjust_lon(lon - this.long0);
      var theta = lat;
      var con = Math.PI * Math.sin(lat);

      /* Iterate using the Newton-Raphson method to find theta
          -----------------------------------------------------*/
      while (true) {
        var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
        theta += delta_theta;
        if (Math.abs(delta_theta) < EPSLN) {
          break;
        }
      }
      theta /= 2;

      /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
           this is done here because of precision problems with "cos(theta)"
           --------------------------------------------------------------------------*/
      if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
        delta_lon = 0;
      }
      var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
      var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

      p.x = x;
      p.y = y;
      return p;
    }

    function inverse$21(p) {
      var theta;
      var arg;

      /* Inverse equations
          -----------------*/
      p.x -= this.x0;
      p.y -= this.y0;
      arg = p.y / (1.4142135623731 * this.a);

      /* Because of division by zero problems, 'arg' can not be 1.  Therefore
           a number very close to one is used instead.
           -------------------------------------------------------------------*/
      if (Math.abs(arg) > 0.999999999999) {
        arg = 0.999999999999;
      }
      theta = Math.asin(arg);
      var lon = adjust_lon(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
      if (lon < (-Math.PI)) {
        lon = -Math.PI;
      }
      if (lon > Math.PI) {
        lon = Math.PI;
      }
      arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
      if (Math.abs(arg) > 1) {
        arg = 1;
      }
      var lat = Math.asin(arg);

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$23 = ["Mollweide", "moll"];
    var moll = {
      init: init$22,
      forward: forward$21,
      inverse: inverse$21,
      names: names$23
    };

    function init$23() {

      /* Place parameters in static storage for common use
          -------------------------------------------------*/
      // Standard Parallels cannot be equal and on opposite sides of the equator
      if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
        return;
      }
      this.lat2 = this.lat2 || this.lat1;
      this.temp = this.b / this.a;
      this.es = 1 - Math.pow(this.temp, 2);
      this.e = Math.sqrt(this.es);
      this.e0 = e0fn(this.es);
      this.e1 = e1fn(this.es);
      this.e2 = e2fn(this.es);
      this.e3 = e3fn(this.es);

      this.sinphi = Math.sin(this.lat1);
      this.cosphi = Math.cos(this.lat1);

      this.ms1 = msfnz(this.e, this.sinphi, this.cosphi);
      this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);

      if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
        this.ns = this.sinphi;
      }
      else {
        this.sinphi = Math.sin(this.lat2);
        this.cosphi = Math.cos(this.lat2);
        this.ms2 = msfnz(this.e, this.sinphi, this.cosphi);
        this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
        this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
      }
      this.g = this.ml1 + this.ms1 / this.ns;
      this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
      this.rh = this.a * (this.g - this.ml0);
    }

    /* Equidistant Conic forward equations--mapping lat,long to x,y
      -----------------------------------------------------------*/
    function forward$22(p) {
      var lon = p.x;
      var lat = p.y;
      var rh1;

      /* Forward equations
          -----------------*/
      if (this.sphere) {
        rh1 = this.a * (this.g - lat);
      }
      else {
        var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
        rh1 = this.a * (this.g - ml);
      }
      var theta = this.ns * adjust_lon(lon - this.long0);
      var x = this.x0 + rh1 * Math.sin(theta);
      var y = this.y0 + this.rh - rh1 * Math.cos(theta);
      p.x = x;
      p.y = y;
      return p;
    }

    /* Inverse equations
      -----------------*/
    function inverse$22(p) {
      p.x -= this.x0;
      p.y = this.rh - p.y + this.y0;
      var con, rh1, lat, lon;
      if (this.ns >= 0) {
        rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
        con = 1;
      }
      else {
        rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
        con = -1;
      }
      var theta = 0;
      if (rh1 !== 0) {
        theta = Math.atan2(con * p.x, con * p.y);
      }

      if (this.sphere) {
        lon = adjust_lon(this.long0 + theta / this.ns);
        lat = adjust_lat(this.g - rh1 / this.a);
        p.x = lon;
        p.y = lat;
        return p;
      }
      else {
        var ml = this.g - rh1 / this.a;
        lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
        lon = adjust_lon(this.long0 + theta / this.ns);
        p.x = lon;
        p.y = lat;
        return p;
      }

    }

    var names$24 = ["Equidistant_Conic", "eqdc"];
    var eqdc = {
      init: init$23,
      forward: forward$22,
      inverse: inverse$22,
      names: names$24
    };

    /* Initialize the Van Der Grinten projection
      ----------------------------------------*/
    function init$24() {
      //this.R = 6370997; //Radius of earth
      this.R = this.a;
    }

    function forward$23(p) {

      var lon = p.x;
      var lat = p.y;

      /* Forward equations
        -----------------*/
      var dlon = adjust_lon(lon - this.long0);
      var x, y;

      if (Math.abs(lat) <= EPSLN) {
        x = this.x0 + this.R * dlon;
        y = this.y0;
      }
      var theta = asinz(2 * Math.abs(lat / Math.PI));
      if ((Math.abs(dlon) <= EPSLN) || (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN)) {
        x = this.x0;
        if (lat >= 0) {
          y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
        }
        else {
          y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
        }
        //  return(OK);
      }
      var al = 0.5 * Math.abs((Math.PI / dlon) - (dlon / Math.PI));
      var asq = al * al;
      var sinth = Math.sin(theta);
      var costh = Math.cos(theta);

      var g = costh / (sinth + costh - 1);
      var gsq = g * g;
      var m = g * (2 / sinth - 1);
      var msq = m * m;
      var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
      if (dlon < 0) {
        con = -con;
      }
      x = this.x0 + con;
      //con = Math.abs(con / (Math.PI * this.R));
      var q = asq + g;
      con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
      if (lat >= 0) {
        //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
        y = this.y0 + con;
      }
      else {
        //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
        y = this.y0 - con;
      }
      p.x = x;
      p.y = y;
      return p;
    }

    /* Van Der Grinten inverse equations--mapping x,y to lat/long
      ---------------------------------------------------------*/
    function inverse$23(p) {
      var lon, lat;
      var xx, yy, xys, c1, c2, c3;
      var a1;
      var m1;
      var con;
      var th1;
      var d;

      /* inverse equations
        -----------------*/
      p.x -= this.x0;
      p.y -= this.y0;
      con = Math.PI * this.R;
      xx = p.x / con;
      yy = p.y / con;
      xys = xx * xx + yy * yy;
      c1 = -Math.abs(yy) * (1 + xys);
      c2 = c1 - 2 * yy * yy + xx * xx;
      c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
      d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
      a1 = (c1 - c2 * c2 / 3 / c3) / c3;
      m1 = 2 * Math.sqrt(-a1 / 3);
      con = ((3 * d) / a1) / m1;
      if (Math.abs(con) > 1) {
        if (con >= 0) {
          con = 1;
        }
        else {
          con = -1;
        }
      }
      th1 = Math.acos(con) / 3;
      if (p.y >= 0) {
        lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
      }
      else {
        lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
      }

      if (Math.abs(xx) < EPSLN) {
        lon = this.long0;
      }
      else {
        lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
      }

      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$25 = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
    var vandg = {
      init: init$24,
      forward: forward$23,
      inverse: inverse$23,
      names: names$25
    };

    function init$25() {
      this.sin_p12 = Math.sin(this.lat0);
      this.cos_p12 = Math.cos(this.lat0);
    }

    function forward$24(p) {
      var lon = p.x;
      var lat = p.y;
      var sinphi = Math.sin(p.y);
      var cosphi = Math.cos(p.y);
      var dlon = adjust_lon(lon - this.long0);
      var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
      if (this.sphere) {
        if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
          //North Pole case
          p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
          p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
          return p;
        }
        else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
          //South Pole case
          p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
          p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
          return p;
        }
        else {
          //default case
          cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
          c = Math.acos(cos_c);
          kp = c ? c / Math.sin(c) : 1;
          p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
          p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
          return p;
        }
      }
      else {
        e0 = e0fn(this.es);
        e1 = e1fn(this.es);
        e2 = e2fn(this.es);
        e3 = e3fn(this.es);
        if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
          //North Pole case
          Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
          Ml = this.a * mlfn(e0, e1, e2, e3, lat);
          p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
          p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
          return p;
        }
        else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
          //South Pole case
          Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
          Ml = this.a * mlfn(e0, e1, e2, e3, lat);
          p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
          p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
          return p;
        }
        else {
          //Default case
          tanphi = sinphi / cosphi;
          Nl1 = gN(this.a, this.e, this.sin_p12);
          Nl = gN(this.a, this.e, sinphi);
          psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
          Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
          if (Az === 0) {
            s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
          }
          else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
            s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
          }
          else {
            s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
          }
          G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
          H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
          GH = G * H;
          Hs = H * H;
          s2 = s * s;
          s3 = s2 * s;
          s4 = s3 * s;
          s5 = s4 * s;
          c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
          p.x = this.x0 + c * Math.sin(Az);
          p.y = this.y0 + c * Math.cos(Az);
          return p;
        }
      }


    }

    function inverse$24(p) {
      p.x -= this.x0;
      p.y -= this.y0;
      var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F, sinpsi;
      if (this.sphere) {
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        if (rh > (2 * HALF_PI * this.a)) {
          return;
        }
        z = rh / this.a;

        sinz = Math.sin(z);
        cosz = Math.cos(z);

        lon = this.long0;
        if (Math.abs(rh) <= EPSLN) {
          lat = this.lat0;
        }
        else {
          lat = asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
          con = Math.abs(this.lat0) - HALF_PI;
          if (Math.abs(con) <= EPSLN) {
            if (this.lat0 >= 0) {
              lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
            }
            else {
              lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
            }
          }
          else {
            /*con = cosz - this.sin_p12 * Math.sin(lat);
            if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
              //no-op, just keep the lon value as is
            } else {
              var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
              lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
            }*/
            lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
          }
        }

        p.x = lon;
        p.y = lat;
        return p;
      }
      else {
        e0 = e0fn(this.es);
        e1 = e1fn(this.es);
        e2 = e2fn(this.es);
        e3 = e3fn(this.es);
        if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
          //North pole case
          Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
          rh = Math.sqrt(p.x * p.x + p.y * p.y);
          M = Mlp - rh;
          lat = imlfn(M / this.a, e0, e1, e2, e3);
          lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
          p.x = lon;
          p.y = lat;
          return p;
        }
        else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
          //South pole case
          Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
          rh = Math.sqrt(p.x * p.x + p.y * p.y);
          M = rh - Mlp;

          lat = imlfn(M / this.a, e0, e1, e2, e3);
          lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
          p.x = lon;
          p.y = lat;
          return p;
        }
        else {
          //default case
          rh = Math.sqrt(p.x * p.x + p.y * p.y);
          Az = Math.atan2(p.x, p.y);
          N1 = gN(this.a, this.e, this.sin_p12);
          cosAz = Math.cos(Az);
          tmp = this.e * this.cos_p12 * cosAz;
          A = -tmp * tmp / (1 - this.es);
          B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
          D = rh / N1;
          Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
          F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
          psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
          lon = adjust_lon(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
          sinpsi = Math.sin(psi);
          lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es));
          p.x = lon;
          p.y = lat;
          return p;
        }
      }

    }

    var names$26 = ["Azimuthal_Equidistant", "aeqd"];
    var aeqd = {
      init: init$25,
      forward: forward$24,
      inverse: inverse$24,
      names: names$26
    };

    function init$26() {
      //double temp;      /* temporary variable    */

      /* Place parameters in static storage for common use
          -------------------------------------------------*/
      this.sin_p14 = Math.sin(this.lat0);
      this.cos_p14 = Math.cos(this.lat0);
    }

    /* Orthographic forward equations--mapping lat,long to x,y
        ---------------------------------------------------*/
    function forward$25(p) {
      var sinphi, cosphi; /* sin and cos value        */
      var dlon; /* delta longitude value      */
      var coslon; /* cos of longitude        */
      var ksp; /* scale factor          */
      var g, x, y;
      var lon = p.x;
      var lat = p.y;
      /* Forward equations
          -----------------*/
      dlon = adjust_lon(lon - this.long0);

      sinphi = Math.sin(lat);
      cosphi = Math.cos(lat);

      coslon = Math.cos(dlon);
      g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
      ksp = 1;
      if ((g > 0) || (Math.abs(g) <= EPSLN)) {
        x = this.a * ksp * cosphi * Math.sin(dlon);
        y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
      }
      p.x = x;
      p.y = y;
      return p;
    }

    function inverse$25(p) {
      var rh; /* height above ellipsoid      */
      var z; /* angle          */
      var sinz, cosz; /* sin of z and cos of z      */
      var con;
      var lon, lat;
      /* Inverse equations
          -----------------*/
      p.x -= this.x0;
      p.y -= this.y0;
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      z = asinz(rh / this.a);

      sinz = Math.sin(z);
      cosz = Math.cos(z);

      lon = this.long0;
      if (Math.abs(rh) <= EPSLN) {
        lat = this.lat0;
        p.x = lon;
        p.y = lat;
        return p;
      }
      lat = asinz(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh);
      con = Math.abs(this.lat0) - HALF_PI;
      if (Math.abs(con) <= EPSLN) {
        if (this.lat0 >= 0) {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
        }
        else {
          lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz), rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
      p.x = lon;
      p.y = lat;
      return p;
    }

    var names$27 = ["ortho"];
    var ortho = {
      init: init$26,
      forward: forward$25,
      inverse: inverse$25,
      names: names$27
    };

    // QSC projection rewritten from the original PROJ4
    // https://github.com/OSGeo/proj.4/blob/master/src/PJ_qsc.c

    /* constants */
    var FACE_ENUM = {
        FRONT: 1,
        RIGHT: 2,
        BACK: 3,
        LEFT: 4,
        TOP: 5,
        BOTTOM: 6
    };

    var AREA_ENUM = {
        AREA_0: 1,
        AREA_1: 2,
        AREA_2: 3,
        AREA_3: 4
    };

    function init$27() {

      this.x0 = this.x0 || 0;
      this.y0 = this.y0 || 0;
      this.lat0 = this.lat0 || 0;
      this.long0 = this.long0 || 0;
      this.lat_ts = this.lat_ts || 0;
      this.title = this.title || "Quadrilateralized Spherical Cube";

      /* Determine the cube face from the center of projection. */
      if (this.lat0 >= HALF_PI - FORTPI / 2.0) {
        this.face = FACE_ENUM.TOP;
      } else if (this.lat0 <= -(HALF_PI - FORTPI / 2.0)) {
        this.face = FACE_ENUM.BOTTOM;
      } else if (Math.abs(this.long0) <= FORTPI) {
        this.face = FACE_ENUM.FRONT;
      } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
        this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
      } else {
        this.face = FACE_ENUM.BACK;
      }

      /* Fill in useful values for the ellipsoid <-> sphere shift
       * described in [LK12]. */
      if (this.es !== 0) {
        this.one_minus_f = 1 - (this.a - this.b) / this.a;
        this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
      }
    }

    // QSC forward equations--mapping lat,long to x,y
    // -----------------------------------------------------------------
    function forward$26(p) {
      var xy = {x: 0, y: 0};
      var lat, lon;
      var theta, phi;
      var t, mu;
      /* nu; */
      var area = {value: 0};

      // move lon according to projection's lon
      p.x -= this.long0;

      /* Convert the geodetic latitude to a geocentric latitude.
       * This corresponds to the shift from the ellipsoid to the sphere
       * described in [LK12]. */
      if (this.es !== 0) {//if (P->es != 0) {
        lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
      } else {
        lat = p.y;
      }

      /* Convert the input lat, lon into theta, phi as used by QSC.
       * This depends on the cube face and the area on it.
       * For the top and bottom face, we can compute theta and phi
       * directly from phi, lam. For the other faces, we must use
       * unit sphere cartesian coordinates as an intermediate step. */
      lon = p.x; //lon = lp.lam;
      if (this.face === FACE_ENUM.TOP) {
        phi = HALF_PI - lat;
        if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
          area.value = AREA_ENUM.AREA_0;
          theta = lon - HALF_PI;
        } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
          area.value = AREA_ENUM.AREA_1;
          theta = (lon > 0.0 ? lon - SPI : lon + SPI);
        } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
          area.value = AREA_ENUM.AREA_2;
          theta = lon + HALF_PI;
        } else {
          area.value = AREA_ENUM.AREA_3;
          theta = lon;
        }
      } else if (this.face === FACE_ENUM.BOTTOM) {
        phi = HALF_PI + lat;
        if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
          area.value = AREA_ENUM.AREA_0;
          theta = -lon + HALF_PI;
        } else if (lon < FORTPI && lon >= -FORTPI) {
          area.value = AREA_ENUM.AREA_1;
          theta = -lon;
        } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
          area.value = AREA_ENUM.AREA_2;
          theta = -lon - HALF_PI;
        } else {
          area.value = AREA_ENUM.AREA_3;
          theta = (lon > 0.0 ? -lon + SPI : -lon - SPI);
        }
      } else {
        var q, r, s;
        var sinlat, coslat;
        var sinlon, coslon;

        if (this.face === FACE_ENUM.RIGHT) {
          lon = qsc_shift_lon_origin(lon, +HALF_PI);
        } else if (this.face === FACE_ENUM.BACK) {
          lon = qsc_shift_lon_origin(lon, +SPI);
        } else if (this.face === FACE_ENUM.LEFT) {
          lon = qsc_shift_lon_origin(lon, -HALF_PI);
        }
        sinlat = Math.sin(lat);
        coslat = Math.cos(lat);
        sinlon = Math.sin(lon);
        coslon = Math.cos(lon);
        q = coslat * coslon;
        r = coslat * sinlon;
        s = sinlat;

        if (this.face === FACE_ENUM.FRONT) {
          phi = Math.acos(q);
          theta = qsc_fwd_equat_face_theta(phi, s, r, area);
        } else if (this.face === FACE_ENUM.RIGHT) {
          phi = Math.acos(r);
          theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
        } else if (this.face === FACE_ENUM.BACK) {
          phi = Math.acos(-q);
          theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
        } else if (this.face === FACE_ENUM.LEFT) {
          phi = Math.acos(-r);
          theta = qsc_fwd_equat_face_theta(phi, s, q, area);
        } else {
          /* Impossible */
          phi = theta = 0;
          area.value = AREA_ENUM.AREA_0;
        }
      }

      /* Compute mu and nu for the area of definition.
       * For mu, see Eq. (3-21) in [OL76], but note the typos:
       * compare with Eq. (3-14). For nu, see Eq. (3-38). */
      mu = Math.atan((12 / SPI) * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
      t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));

      /* Apply the result to the real area. */
      if (area.value === AREA_ENUM.AREA_1) {
        mu += HALF_PI;
      } else if (area.value === AREA_ENUM.AREA_2) {
        mu += SPI;
      } else if (area.value === AREA_ENUM.AREA_3) {
        mu += 1.5 * SPI;
      }

      /* Now compute x, y from mu and nu */
      xy.x = t * Math.cos(mu);
      xy.y = t * Math.sin(mu);
      xy.x = xy.x * this.a + this.x0;
      xy.y = xy.y * this.a + this.y0;

      p.x = xy.x;
      p.y = xy.y;
      return p;
    }

    // QSC inverse equations--mapping x,y to lat/long
    // -----------------------------------------------------------------
    function inverse$26(p) {
      var lp = {lam: 0, phi: 0};
      var mu, nu, cosmu, tannu;
      var tantheta, theta, cosphi, phi;
      var t;
      var area = {value: 0};

      /* de-offset */
      p.x = (p.x - this.x0) / this.a;
      p.y = (p.y - this.y0) / this.a;

      /* Convert the input x, y to the mu and nu angles as used by QSC.
       * This depends on the area of the cube face. */
      nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
      mu = Math.atan2(p.y, p.x);
      if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
        area.value = AREA_ENUM.AREA_0;
      } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
        area.value = AREA_ENUM.AREA_1;
        mu -= HALF_PI;
      } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
        area.value = AREA_ENUM.AREA_2;
        mu = (mu < 0.0 ? mu + SPI : mu - SPI);
      } else {
        area.value = AREA_ENUM.AREA_3;
        mu += HALF_PI;
      }

      /* Compute phi and theta for the area of definition.
       * The inverse projection is not described in the original paper, but some
       * good hints can be found here (as of 2011-12-14):
       * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
       * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
      t = (SPI / 12) * Math.tan(mu);
      tantheta = Math.sin(t) / (Math.cos(t) - (1 / Math.sqrt(2)));
      theta = Math.atan(tantheta);
      cosmu = Math.cos(mu);
      tannu = Math.tan(nu);
      cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
      if (cosphi < -1) {
        cosphi = -1;
      } else if (cosphi > +1) {
        cosphi = +1;
      }

      /* Apply the result to the real area on the cube face.
       * For the top and bottom face, we can compute phi and lam directly.
       * For the other faces, we must use unit sphere cartesian coordinates
       * as an intermediate step. */
      if (this.face === FACE_ENUM.TOP) {
        phi = Math.acos(cosphi);
        lp.phi = HALF_PI - phi;
        if (area.value === AREA_ENUM.AREA_0) {
          lp.lam = theta + HALF_PI;
        } else if (area.value === AREA_ENUM.AREA_1) {
          lp.lam = (theta < 0.0 ? theta + SPI : theta - SPI);
        } else if (area.value === AREA_ENUM.AREA_2) {
          lp.lam = theta - HALF_PI;
        } else /* area.value == AREA_ENUM.AREA_3 */ {
          lp.lam = theta;
        }
      } else if (this.face === FACE_ENUM.BOTTOM) {
        phi = Math.acos(cosphi);
        lp.phi = phi - HALF_PI;
        if (area.value === AREA_ENUM.AREA_0) {
          lp.lam = -theta + HALF_PI;
        } else if (area.value === AREA_ENUM.AREA_1) {
          lp.lam = -theta;
        } else if (area.value === AREA_ENUM.AREA_2) {
          lp.lam = -theta - HALF_PI;
        } else /* area.value == AREA_ENUM.AREA_3 */ {
          lp.lam = (theta < 0.0 ? -theta - SPI : -theta + SPI);
        }
      } else {
        /* Compute phi and lam via cartesian unit sphere coordinates. */
        var q, r, s;
        q = cosphi;
        t = q * q;
        if (t >= 1) {
          s = 0;
        } else {
          s = Math.sqrt(1 - t) * Math.sin(theta);
        }
        t += s * s;
        if (t >= 1) {
          r = 0;
        } else {
          r = Math.sqrt(1 - t);
        }
        /* Rotate q,r,s into the correct area. */
        if (area.value === AREA_ENUM.AREA_1) {
          t = r;
          r = -s;
          s = t;
        } else if (area.value === AREA_ENUM.AREA_2) {
          r = -r;
          s = -s;
        } else if (area.value === AREA_ENUM.AREA_3) {
          t = r;
          r = s;
          s = -t;
        }
        /* Rotate q,r,s into the correct cube face. */
        if (this.face === FACE_ENUM.RIGHT) {
          t = q;
          q = -r;
          r = t;
        } else if (this.face === FACE_ENUM.BACK) {
          q = -q;
          r = -r;
        } else if (this.face === FACE_ENUM.LEFT) {
          t = q;
          q = r;
          r = -t;
        }
        /* Now compute phi and lam from the unit sphere coordinates. */
        lp.phi = Math.acos(-s) - HALF_PI;
        lp.lam = Math.atan2(r, q);
        if (this.face === FACE_ENUM.RIGHT) {
          lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
        } else if (this.face === FACE_ENUM.BACK) {
          lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
        } else if (this.face === FACE_ENUM.LEFT) {
          lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
        }
      }

      /* Apply the shift from the sphere to the ellipsoid as described
       * in [LK12]. */
      if (this.es !== 0) {
        var invert_sign;
        var tanphi, xa;
        invert_sign = (lp.phi < 0 ? 1 : 0);
        tanphi = Math.tan(lp.phi);
        xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
        lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
        if (invert_sign) {
          lp.phi = -lp.phi;
        }
      }

      lp.lam += this.long0;
      p.x = lp.lam;
      p.y = lp.phi;
      return p;
    }

    /* Helper function for forward projection: compute the theta angle
     * and determine the area number. */
    function qsc_fwd_equat_face_theta(phi, y, x, area) {
      var theta;
      if (phi < EPSLN) {
        area.value = AREA_ENUM.AREA_0;
        theta = 0.0;
      } else {
        theta = Math.atan2(y, x);
        if (Math.abs(theta) <= FORTPI) {
          area.value = AREA_ENUM.AREA_0;
        } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
          area.value = AREA_ENUM.AREA_1;
          theta -= HALF_PI;
        } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
          area.value = AREA_ENUM.AREA_2;
          theta = (theta >= 0.0 ? theta - SPI : theta + SPI);
        } else {
          area.value = AREA_ENUM.AREA_3;
          theta += HALF_PI;
        }
      }
      return theta;
    }

    /* Helper function: shift the longitude. */
    function qsc_shift_lon_origin(lon, offset) {
      var slon = lon + offset;
      if (slon < -SPI) {
        slon += TWO_PI;
      } else if (slon > +SPI) {
        slon -= TWO_PI;
      }
      return slon;
    }

    var names$28 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
    var qsc = {
      init: init$27,
      forward: forward$26,
      inverse: inverse$26,
      names: names$28
    };

    // Robinson projection
    // Based on https://github.com/OSGeo/proj.4/blob/master/src/PJ_robin.c
    // Polynomial coeficients from http://article.gmane.org/gmane.comp.gis.proj-4.devel/6039

    var COEFS_X = [
        [1.0000, 2.2199e-17, -7.15515e-05, 3.1103e-06],
        [0.9986, -0.000482243, -2.4897e-05, -1.3309e-06],
        [0.9954, -0.00083103, -4.48605e-05, -9.86701e-07],
        [0.9900, -0.00135364, -5.9661e-05, 3.6777e-06],
        [0.9822, -0.00167442, -4.49547e-06, -5.72411e-06],
        [0.9730, -0.00214868, -9.03571e-05, 1.8736e-08],
        [0.9600, -0.00305085, -9.00761e-05, 1.64917e-06],
        [0.9427, -0.00382792, -6.53386e-05, -2.6154e-06],
        [0.9216, -0.00467746, -0.00010457, 4.81243e-06],
        [0.8962, -0.00536223, -3.23831e-05, -5.43432e-06],
        [0.8679, -0.00609363, -0.000113898, 3.32484e-06],
        [0.8350, -0.00698325, -6.40253e-05, 9.34959e-07],
        [0.7986, -0.00755338, -5.00009e-05, 9.35324e-07],
        [0.7597, -0.00798324, -3.5971e-05, -2.27626e-06],
        [0.7186, -0.00851367, -7.01149e-05, -8.6303e-06],
        [0.6732, -0.00986209, -0.000199569, 1.91974e-05],
        [0.6213, -0.010418, 8.83923e-05, 6.24051e-06],
        [0.5722, -0.00906601, 0.000182, 6.24051e-06],
        [0.5322, -0.00677797, 0.000275608, 6.24051e-06]
    ];

    var COEFS_Y = [
        [-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11],
        [0.0620, 0.0124, -1.26793e-09, 4.22642e-10],
        [0.1240, 0.0124, 5.07171e-09, -1.60604e-09],
        [0.1860, 0.0123999, -1.90189e-08, 6.00152e-09],
        [0.2480, 0.0124002, 7.10039e-08, -2.24e-08],
        [0.3100, 0.0123992, -2.64997e-07, 8.35986e-08],
        [0.3720, 0.0124029, 9.88983e-07, -3.11994e-07],
        [0.4340, 0.0123893, -3.69093e-06, -4.35621e-07],
        [0.4958, 0.0123198, -1.02252e-05, -3.45523e-07],
        [0.5571, 0.0121916, -1.54081e-05, -5.82288e-07],
        [0.6176, 0.0119938, -2.41424e-05, -5.25327e-07],
        [0.6769, 0.011713, -3.20223e-05, -5.16405e-07],
        [0.7346, 0.0113541, -3.97684e-05, -6.09052e-07],
        [0.7903, 0.0109107, -4.89042e-05, -1.04739e-06],
        [0.8435, 0.0103431, -6.4615e-05, -1.40374e-09],
        [0.8936, 0.00969686, -6.4636e-05, -8.547e-06],
        [0.9394, 0.00840947, -0.000192841, -4.2106e-06],
        [0.9761, 0.00616527, -0.000256, -4.2106e-06],
        [1.0000, 0.00328947, -0.000319159, -4.2106e-06]
    ];

    var FXC = 0.8487;
    var FYC = 1.3523;
    var C1 = R2D/5; // rad to 5-degree interval
    var RC1 = 1/C1;
    var NODES = 18;

    var poly3_val = function(coefs, x) {
        return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
    };

    var poly3_der = function(coefs, x) {
        return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
    };

    function newton_rapshon(f_df, start, max_err, iters) {
        var x = start;
        for (; iters; --iters) {
            var upd = f_df(x);
            x -= upd;
            if (Math.abs(upd) < max_err) {
                break;
            }
        }
        return x;
    }

    function init$28() {
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.long0 = this.long0 || 0;
        this.es = 0;
        this.title = this.title || "Robinson";
    }

    function forward$27(ll) {
        var lon = adjust_lon(ll.x - this.long0);

        var dphi = Math.abs(ll.y);
        var i = Math.floor(dphi * C1);
        if (i < 0) {
            i = 0;
        } else if (i >= NODES) {
            i = NODES - 1;
        }
        dphi = R2D * (dphi - RC1 * i);
        var xy = {
            x: poly3_val(COEFS_X[i], dphi) * lon,
            y: poly3_val(COEFS_Y[i], dphi)
        };
        if (ll.y < 0) {
            xy.y = -xy.y;
        }

        xy.x = xy.x * this.a * FXC + this.x0;
        xy.y = xy.y * this.a * FYC + this.y0;
        return xy;
    }

    function inverse$27(xy) {
        var ll = {
            x: (xy.x - this.x0) / (this.a * FXC),
            y: Math.abs(xy.y - this.y0) / (this.a * FYC)
        };

        if (ll.y >= 1) { // pathologic case
            ll.x /= COEFS_X[NODES][0];
            ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
        } else {
            // find table interval
            var i = Math.floor(ll.y * NODES);
            if (i < 0) {
                i = 0;
            } else if (i >= NODES) {
                i = NODES - 1;
            }
            for (;;) {
                if (COEFS_Y[i][0] > ll.y) {
                    --i;
                } else if (COEFS_Y[i+1][0] <= ll.y) {
                    ++i;
                } else {
                    break;
                }
            }
            // linear interpolation in 5 degree interval
            var coefs = COEFS_Y[i];
            var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i+1][0] - coefs[0]);
            // find t so that poly3_val(coefs, t) = ll.y
            t = newton_rapshon(function(x) {
                return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
            }, t, EPSLN, 100);

            ll.x /= poly3_val(COEFS_X[i], t);
            ll.y = (5 * i + t) * D2R;
            if (xy.y < 0) {
                ll.y = -ll.y;
            }
        }

        ll.x = adjust_lon(ll.x + this.long0);
        return ll;
    }

    var names$29 = ["Robinson", "robin"];
    var robin = {
      init: init$28,
      forward: forward$27,
      inverse: inverse$27,
      names: names$29
    };

    function init$29() {
        this.name = 'geocent';

    }

    function forward$28(p) {
        var point = geodeticToGeocentric(p, this.es, this.a);
        return point;
    }

    function inverse$28(p) {
        var point = geocentricToGeodetic(p, this.es, this.a, this.b);
        return point;
    }

    var names$30 = ["Geocentric", 'geocentric', "geocent", "Geocent"];
    var geocent = {
        init: init$29,
        forward: forward$28,
        inverse: inverse$28,
        names: names$30
    };

    var mode = {
      N_POLE: 0,
      S_POLE: 1,
      EQUIT: 2,
      OBLIQ: 3
    };

    var params = {
      h:     { def: 100000, num: true },           // default is Karman line, no default in PROJ.7
      azi:   { def: 0, num: true, degrees: true }, // default is North
      tilt:  { def: 0, num: true, degrees: true }, // default is Nadir
      long0: { def: 0, num: true },                // default is Greenwich, conversion to rad is automatic
      lat0:  { def: 0, num: true }                 // default is Equator, conversion to rad is automatic
    };

    function init$30() {
      Object.keys(params).forEach(function (p) {
        if (typeof this[p] === "undefined") {
          this[p] = params[p].def;
        } else if (params[p].num && isNaN(this[p])) {
          throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
        } else if (params[p].num) {
          this[p] = parseFloat(this[p]);
        }
        if (params[p].degrees) {
          this[p] = this[p] * D2R;
        }
      }.bind(this));

      if (Math.abs((Math.abs(this.lat0) - HALF_PI)) < EPSLN) {
        this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
      } else if (Math.abs(this.lat0) < EPSLN) {
        this.mode = mode.EQUIT;
      } else {
        this.mode = mode.OBLIQ;
        this.sinph0 = Math.sin(this.lat0);
        this.cosph0 = Math.cos(this.lat0);
      }

      this.pn1 = this.h / this.a;  // Normalize relative to the Earth's radius

      if (this.pn1 <= 0 || this.pn1 > 1e10) {
        throw new Error("Invalid height");
      }
      
      this.p = 1 + this.pn1;
      this.rp = 1 / this.p;
      this.h1 = 1 / this.pn1;
      this.pfact = (this.p + 1) * this.h1;
      this.es = 0;

      var omega = this.tilt;
      var gamma = this.azi;
      this.cg = Math.cos(gamma);
      this.sg = Math.sin(gamma);
      this.cw = Math.cos(omega);
      this.sw = Math.sin(omega);
    }

    function forward$29(p) {
      p.x -= this.long0;
      var sinphi = Math.sin(p.y);
      var cosphi = Math.cos(p.y);
      var coslam = Math.cos(p.x);
      var x, y;
      switch (this.mode) {
        case mode.OBLIQ:
          y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
          break;
        case mode.EQUIT:
          y = cosphi * coslam;
          break;
        case mode.S_POLE:
          y = -sinphi;
          break;
        case mode.N_POLE:
          y = sinphi;
          break;
      }
      y = this.pn1 / (this.p - y);
      x = y * cosphi * Math.sin(p.x);

      switch (this.mode) {
        case mode.OBLIQ:
          y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
          break;
        case mode.EQUIT:
          y *= sinphi;
          break;
        case mode.N_POLE:
          y *= -(cosphi * coslam);
          break;
        case mode.S_POLE:
          y *= cosphi * coslam;
          break;
      }

      // Tilt 
      var yt, ba;
      yt = y * this.cg + x * this.sg;
      ba = 1 / (yt * this.sw * this.h1 + this.cw);
      x = (x * this.cg - y * this.sg) * this.cw * ba;
      y = yt * ba;

      p.x = x * this.a;
      p.y = y * this.a;
      return p;
    }

    function inverse$29(p) {
      p.x /= this.a;
      p.y /= this.a;
      var r = { x: p.x, y: p.y };

      // Un-Tilt
      var bm, bq, yt;
      yt = 1 / (this.pn1 - p.y * this.sw);
      bm = this.pn1 * p.x * yt;
      bq = this.pn1 * p.y * this.cw * yt;
      p.x = bm * this.cg + bq * this.sg;
      p.y = bq * this.cg - bm * this.sg;

      var rh = hypot(p.x, p.y);
      if (Math.abs(rh) < EPSLN) {
        r.x = 0;
        r.y = p.y;
      } else {
        var cosz, sinz;
        sinz = 1 - rh * rh * this.pfact;
        sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
        cosz = Math.sqrt(1 - sinz * sinz);
        switch (this.mode) {
          case mode.OBLIQ:
            r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
            p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
            p.x *= sinz * this.cosph0;
            break;
          case mode.EQUIT:
            r.y = Math.asin(p.y * sinz / rh);
            p.y = cosz * rh;
            p.x *= sinz;
            break;
          case mode.N_POLE:
            r.y = Math.asin(cosz);
            p.y = -p.y;
            break;
          case mode.S_POLE:
            r.y = -Math.asin(cosz);
            break;
        }
        r.x = Math.atan2(p.x, p.y);
      }

      p.x = r.x + this.long0;
      p.y = r.y;
      return p;
    }

    var names$31 = ["Tilted_Perspective", "tpers"];
    var tpers = {
      init: init$30,
      forward: forward$29,
      inverse: inverse$29,
      names: names$31
    };

    var includedProjections = function(proj4){
      proj4.Proj.projections.add(tmerc);
      proj4.Proj.projections.add(etmerc);
      proj4.Proj.projections.add(utm);
      proj4.Proj.projections.add(sterea);
      proj4.Proj.projections.add(stere);
      proj4.Proj.projections.add(somerc);
      proj4.Proj.projections.add(omerc);
      proj4.Proj.projections.add(lcc);
      proj4.Proj.projections.add(krovak);
      proj4.Proj.projections.add(cass);
      proj4.Proj.projections.add(laea);
      proj4.Proj.projections.add(aea);
      proj4.Proj.projections.add(gnom);
      proj4.Proj.projections.add(cea);
      proj4.Proj.projections.add(eqc);
      proj4.Proj.projections.add(poly);
      proj4.Proj.projections.add(nzmg);
      proj4.Proj.projections.add(mill);
      proj4.Proj.projections.add(sinu);
      proj4.Proj.projections.add(moll);
      proj4.Proj.projections.add(eqdc);
      proj4.Proj.projections.add(vandg);
      proj4.Proj.projections.add(aeqd);
      proj4.Proj.projections.add(ortho);
      proj4.Proj.projections.add(qsc);
      proj4.Proj.projections.add(robin);
      proj4.Proj.projections.add(geocent);
      proj4.Proj.projections.add(tpers);
    };

    proj4$1.defaultDatum = 'WGS84'; //default datum
    proj4$1.Proj = Projection;
    proj4$1.WGS84 = new proj4$1.Proj('WGS84');
    proj4$1.Point = Point;
    proj4$1.toPoint = toPoint;
    proj4$1.defs = defs;
    proj4$1.nadgrid = nadgrid;
    proj4$1.transform = transform;
    proj4$1.mgrs = mgrs;
    proj4$1.version = '2.7.5';
    includedProjections(proj4$1);

    return proj4$1;

})));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
	var L, proj4;
	if (true) {
		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(33), __webpack_require__(97)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function (L, proj4) {
	if (proj4.__esModule && proj4.default) {
		// If proj4 was bundled as an ES6 module, unwrap it to get
		// to the actual main proj4 object.
		// See discussion in https://github.com/kartena/Proj4Leaflet/pull/147
		proj4 = proj4.default;
	}
 
	L.Proj = {};

	L.Proj._isProj4Obj = function(a) {
		return (typeof a.inverse !== 'undefined' &&
			typeof a.forward !== 'undefined');
	};

	L.Proj.Projection = L.Class.extend({
		initialize: function(code, def, bounds) {
			var isP4 = L.Proj._isProj4Obj(code);
			this._proj = isP4 ? code : this._projFromCodeDef(code, def);
			this.bounds = isP4 ? def : bounds;
		},

		project: function (latlng) {
			var point = this._proj.forward([latlng.lng, latlng.lat]);
			return new L.Point(point[0], point[1]);
		},

		unproject: function (point, unbounded) {
			var point2 = this._proj.inverse([point.x, point.y]);
			return new L.LatLng(point2[1], point2[0], unbounded);
		},

		_projFromCodeDef: function(code, def) {
			if (def) {
				proj4.defs(code, def);
			} else if (proj4.defs[code] === undefined) {
				var urn = code.split(':');
				if (urn.length > 3) {
					code = urn[urn.length - 3] + ':' + urn[urn.length - 1];
				}
				if (proj4.defs[code] === undefined) {
					throw 'No projection definition for code ' + code;
				}
			}

			return proj4(code);
		}
	});

	L.Proj.CRS = L.Class.extend({
		includes: L.CRS,

		options: {
			transformation: new L.Transformation(1, 0, -1, 0)
		},

		initialize: function(a, b, c) {
			var code,
			    proj,
			    def,
			    options;

			if (L.Proj._isProj4Obj(a)) {
				proj = a;
				code = proj.srsCode;
				options = b || {};

				this.projection = new L.Proj.Projection(proj, options.bounds);
			} else {
				code = a;
				def = b;
				options = c || {};
				this.projection = new L.Proj.Projection(code, def, options.bounds);
			}

			L.Util.setOptions(this, options);
			this.code = code;
			this.transformation = this.options.transformation;

			if (this.options.origin) {
				this.transformation =
					new L.Transformation(1, -this.options.origin[0],
						-1, this.options.origin[1]);
			}

			if (this.options.scales) {
				this._scales = this.options.scales;
			} else if (this.options.resolutions) {
				this._scales = [];
				for (var i = this.options.resolutions.length - 1; i >= 0; i--) {
					if (this.options.resolutions[i]) {
						this._scales[i] = 1 / this.options.resolutions[i];
					}
				}
			}

			this.infinite = !this.options.bounds;

		},

		scale: function(zoom) {
			var iZoom = Math.floor(zoom),
				baseScale,
				nextScale,
				scaleDiff,
				zDiff;
			if (zoom === iZoom) {
				return this._scales[zoom];
			} else {
				// Non-integer zoom, interpolate
				baseScale = this._scales[iZoom];
				nextScale = this._scales[iZoom + 1];
				scaleDiff = nextScale - baseScale;
				zDiff = (zoom - iZoom);
				return baseScale + scaleDiff * zDiff;
			}
		},

		zoom: function(scale) {
			// Find closest number in this._scales, down
			var downScale = this._closestElement(this._scales, scale),
				downZoom = this._scales.indexOf(downScale),
				nextScale,
				nextZoom,
				scaleDiff;
			// Check if scale is downScale => return array index
			if (scale === downScale) {
				return downZoom;
			}
			if (downScale === undefined) {
				return -Infinity;
			}
			// Interpolate
			nextZoom = downZoom + 1;
			nextScale = this._scales[nextZoom];
			if (nextScale === undefined) {
				return Infinity;
			}
			scaleDiff = nextScale - downScale;
			return (scale - downScale) / scaleDiff + downZoom;
		},

		distance: L.CRS.Earth.distance,

		R: L.CRS.Earth.R,

		/* Get the closest lowest element in an array */
		_closestElement: function(array, element) {
			var low;
			for (var i = array.length; i--;) {
				if (array[i] <= element && (low === undefined || low < array[i])) {
					low = array[i];
				}
			}
			return low;
		}
	});

	L.Proj.GeoJSON = L.GeoJSON.extend({
		initialize: function(geojson, options) {
			this._callLevel = 0;
			L.GeoJSON.prototype.initialize.call(this, geojson, options);
		},

		addData: function(geojson) {
			var crs;

			if (geojson) {
				if (geojson.crs && geojson.crs.type === 'name') {
					crs = new L.Proj.CRS(geojson.crs.properties.name);
				} else if (geojson.crs && geojson.crs.type) {
					crs = new L.Proj.CRS(geojson.crs.type + ':' + geojson.crs.properties.code);
				}

				if (crs !== undefined) {
					this.options.coordsToLatLng = function(coords) {
						var point = L.point(coords[0], coords[1]);
						return crs.projection.unproject(point);
					};
				}
			}

			// Base class' addData might call us recursively, but
			// CRS shouldn't be cleared in that case, since CRS applies
			// to the whole GeoJSON, inluding sub-features.
			this._callLevel++;
			try {
				L.GeoJSON.prototype.addData.call(this, geojson);
			} finally {
				this._callLevel--;
				if (this._callLevel === 0) {
					delete this.options.coordsToLatLng;
				}
			}
		}
	});

	L.Proj.geoJson = function(geojson, options) {
		return new L.Proj.GeoJSON(geojson, options);
	};

	L.Proj.ImageOverlay = L.ImageOverlay.extend({
		initialize: function (url, bounds, options) {
			L.ImageOverlay.prototype.initialize.call(this, url, null, options);
			this._projectedBounds = bounds;
		},

		// Danger ahead: Overriding internal methods in Leaflet.
		// Decided to do this rather than making a copy of L.ImageOverlay
		// and doing very tiny modifications to it.
		// Future will tell if this was wise or not.
		_animateZoom: function (event) {
			var scale = this._map.getZoomScale(event.zoom);
			var northWest = L.point(this._projectedBounds.min.x, this._projectedBounds.max.y);
			var offset = this._projectedToNewLayerPoint(northWest, event.zoom, event.center);

			L.DomUtil.setTransform(this._image, offset, scale);
		},

		_reset: function () {
			var zoom = this._map.getZoom();
			var pixelOrigin = this._map.getPixelOrigin();
			var bounds = L.bounds(
				this._transform(this._projectedBounds.min, zoom)._subtract(pixelOrigin),
				this._transform(this._projectedBounds.max, zoom)._subtract(pixelOrigin)
			);
			var size = bounds.getSize();

			L.DomUtil.setPosition(this._image, bounds.min);
			this._image.style.width = size.x + 'px';
			this._image.style.height = size.y + 'px';
		},

		_projectedToNewLayerPoint: function (point, zoom, center) {
			var viewHalf = this._map.getSize()._divideBy(2);
			var newTopLeft = this._map.project(center, zoom)._subtract(viewHalf)._round();
			var topLeft = newTopLeft.add(this._map._getMapPanePos());

			return this._transform(point, zoom)._subtract(topLeft);
		},

		_transform: function (point, zoom) {
			var crs = this._map.options.crs;
			var transformation = crs.transformation;
			var scale = crs.scale(zoom);

			return transformation.transform(point, scale);
		}
	});

	L.Proj.imageOverlay = function (url, bounds, options) {
		return new L.Proj.ImageOverlay(url, bounds, options);
	};

	return L.Proj;
}));


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @module Register
 * @alias [private] Register
 * @description
 * Register definition for IGNF, and EPSG CRS.
 *
 * @example
 * Gp.Register.IGNF.AMST63
 *   // return : "+title=Amsterdam 1963 +proj=geocent +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs"
 * Gp.Register.get("IGNF:AMST63")
 *   // same as Gp.Register.IGNF.AMST63
 */
var Register = {
  /**
   * instance already loaded into proj4
   */
  isLoaded: false,

  /**
   * get the definition for a code
   *
   * @function get
   * @param {String} name - ie. EPSG:2154 (Lambert)
   * @returns {Object} definition
   * @example
   * Register.get("EPSG:2154");
   * // "+title=RGF93 / Lambert-93 +proj=lcc +lat_1=49 ..."
   */
  get: function get(name) {
    if (name === "" || name === null || typeof name === "undefined") {
      return;
    }

    var s = name.split(":");

    if (s.length !== 2) {
      return;
    }

    var _register = s[0];
    var _code = s[1];

    if (!this.hasOwnProperty(_register)) {
      return;
    }

    if (!this[_register].hasOwnProperty(_code)) {
      return;
    }

    return this[_register][_code];
  },

  /**
   * does projection code exist ?
   *
   * @function exist
   * @param {String} name - ie. EPSG:2154 (Lambert)
   * @returns {Boolean} true/false
   * @example
   * Register.exist("EPSG:2154"); // true
   */
  exist: function exist(name) {
    if (name === "" || name === null || typeof name === "undefined") {
      return false;
    }

    var s = name.split(":");

    if (s.length !== 2) {
      return false;
    }

    var _register = s[0];
    var _code = s[1];

    if (!this.hasOwnProperty(_register)) {
      return false;
    }

    if (!this[_register].hasOwnProperty(_code)) {
      return false;
    }

    return true;
  },

  /**
   * load all defs to proj4
   * @function load
   * @param {Object} Proj4 - proj4 instance
   */
  load: function load(Proj4) {
    // un flag pour savoir si le chargement est déjà realisé
    // (car ceci peut être couteux !)
    if (!this.isLoaded) {
      var registers = ["IGNF", // exception lors du register IGNF ?
      "EPSG", "CRS"];

      for (var i = 0; i < registers.length; i++) {
        var _register = registers[i];
        var codes = this[_register];

        for (var _code in codes) {
          if (codes.hasOwnProperty(_code)) {
            var name = _register + ":" + _code;
            Proj4.defs(name, this.get(name)); // on enlève la dependance à OpenLayers...
            // la fonction register est donc à appeller afin d'enregistrer
            // les definitions dans OpenLayers :
            //  import { get } from "ol/proj";
            //  import proj4 from "proj4";
            //  import { register } from "ol/proj/proj4";
            //      Register.load();
            //      // Make projections defined in proj4 (with proj4.defs()) available in OpenLayers.
            //      // see ol/proj/proj4.register (https://openlayers.org/en/latest/apidoc/module-ol_proj_proj4.html)
            //      register(proj4);
            //      console.log(get("CRS:84").getCode()); // "CRS:84"
          }
        }
      }
      /** ts-syntax */


      this.isLoaded = true;
    }
  },

  /**
   * load defs by default to proj4
   *
   * include into proj4 :
   * - WGS84
   * - ['EPSG:4326']
   * - ['EPSG:3785'], ['EPSG:3857'], GOOGLE, ['EPSG:900913'], ['EPSG:102113']
   * +
   * - ["EPSG:2154"], ["EPSG:27571"],  ["EPSG:27572"],  ["EPSG:27573"],  ["EPSG:2757"],
   * - ["CRS:84"],
   * - ["IGNF:LAMB93"],
   * - ["IGNF:LAMBE"], ["IGNF:LAMB1"],  ["IGNF:LAMB2"],  ["IGNF:LAMB3"],  ["IGNF:LAMB4"],
   * - ["IGNF:RGF93G"],
   * - ["IGNF:WGS84G"]
   *
   * @function loadByDefault
   * @param {Object} Proj4 - proj4 instance
   */
  loadByDefault: function loadByDefault(Proj4) {
    // la liste de projections par defaut...
    var registers = {
      EPSG: {
        2154: Register["EPSG"]["2154"],
        27571: Register["EPSG"]["27571"],
        27572: Register["EPSG"]["27572"],
        27573: Register["EPSG"]["27573"],
        27574: Register["EPSG"]["27574"]
      },
      CRS: {
        84: Register["CRS"]["84"]
      },
      IGNF: {
        LAMB93: Register["IGNF"]["LAMB93"],
        LAMBE: Register["IGNF"]["LAMBE"],
        LAMB1: Register["IGNF"]["LAMB1"],
        LAMB2: Register["IGNF"]["LAMB2"],
        LAMB3: Register["IGNF"]["LAMB3"],
        LAMB4: Register["IGNF"]["LAMB4"],
        RGF93G: Register["IGNF"]["RGF93G"],
        WGS84G: Register["IGNF"]["WGS84G"]
      }
    };

    for (var register in registers) {
      if (registers.hasOwnProperty(register)) {
        var codes = registers[register];

        for (var code in codes) {
          if (codes.hasOwnProperty(code)) {
            var name = register + ":" + code;
            Proj4.defs(name, codes[code]);
          }
        }
      }
    }
  },

  /**
   * load only a def to proj4
   *
   * @function loadByName
   * @param {Object} Proj4 - proj4 instance
   * @param {String} name - ie. EPSG:2154 (Lambert)
   * @returns {Boolean} true/false
   */
  loadByName: function loadByName(Proj4, name) {
    if (!this.exist(name)) {
      return false;
    }

    try {
      Proj4.defs(name, this.get(name));
    } catch (e) {
      // FIXME message !?
      return false;
    }

    return true;
  },

  /**
   * definitions EPSG
   * @enum
   */
  EPSG: {
    4978: "+proj=geocent +datum=WGS84 +units=m +no_defs ",
    3857: "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",
    3785: "+title=WGS 84 / Pseudo-Mercator (deprecated) +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",
    4149: "+title=CH1903 +proj=longlat +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +no_defs ",
    4150: "+title=CH1903plus +proj=longlat +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +no_defs ",
    4151: "+title=CHTRF95 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4171: "+title=RGF93 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4230: "+title=ED50 +proj=longlat +ellps=intl +no_defs ",
    4235: "+title=Guyane Francaise +proj=longlat +ellps=intl +no_defs ",
    4258: "+title=ETRS89 +proj=longlat +ellps=GRS80 +no_defs ",
    4275: "+title=NTF +proj=longlat +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +no_defs ",
    4322: "+title=WGS 72 +proj=longlat +ellps=WGS72 +no_defs ",
    4326: "+title=WGS 84 +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ",
    4467: "+proj=utm +zone=21 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    4470: "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4471: "+proj=utm +zone=38 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    4474: "+proj=utm +zone=38 +south +ellps=intl +towgs84=-382,-59,-262,0,0,0,0 +units=m +no_defs ",
    4558: "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4559: "+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    4621: "+title=Fort Marigot +proj=longlat +ellps=intl +towgs84=137,248,-430,0,0,0,0 +no_defs ",
    4622: "+title=Guadeloupe 1948 +proj=longlat +ellps=intl +no_defs ",
    4623: "+title=CSG67 +proj=longlat +ellps=intl +towgs84=-186,230,110,0,0,0,0 +no_defs ",
    4624: "+title=RGFG95 +proj=longlat +ellps=GRS80 +towgs84=2,2,-2,0,0,0,0 +no_defs ",
    4625: "+title=Martinique 1938 +proj=longlat +ellps=intl +no_defs ",
    4626: "+title=Reunion 1947 +proj=longlat +ellps=intl +no_defs ",
    4627: "+title=RGR92 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4628: "+title=Tahiti 52 +proj=longlat +ellps=intl +towgs84=162,117,154,0,0,0,0 +no_defs ",
    4629: "+title=Tahaa 54 +proj=longlat +ellps=intl +no_defs ",
    4630: "+title=IGN72 Nuku Hiva +proj=longlat +ellps=intl +no_defs ",
    4632: "+title=Combani 1950 +proj=longlat +ellps=intl +towgs84=-382,-59,-262,0,0,0,0 +no_defs ",
    4633: "+title=IGN56 Lifou +proj=longlat +ellps=intl +no_defs ",
    4634: "+title=IGN72 Grand Terre +proj=longlat +ellps=intl +no_defs ",
    4637: "+title=Perroud 1950 +proj=longlat +ellps=intl +towgs84=325,154,172,0,0,0,0 +no_defs ",
    4638: "+title=Saint Pierre et Miquelon 1950 +proj=longlat +ellps=clrk66 +towgs84=30,430,368,0,0,0,0 +no_defs ",
    4640: "+title=RRAF 1991 +proj=longlat +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4641: "+title=IGN53 Mare +proj=longlat +ellps=intl +no_defs ",
    4645: "+title=RGNC 1991 +proj=longlat +ellps=intl +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4687: "+proj=longlat +ellps=GRS80 +no_defs ",
    4662: "+title=IGN72 Grande Terre +proj=longlat +ellps=intl +no_defs ",
    4689: "+title=IGN63 Hiva Oa +proj=longlat +ellps=intl +no_defs ",
    4690: "+title=Tahiti 79 +proj=longlat +ellps=intl +no_defs ",
    4691: "+title=Moorea 87 +proj=longlat +ellps=intl +towgs84=215.525,149.593,176.229,-3.2624,-1.692,-1.1571,10.4773 +no_defs ",
    4692: "+title=Maupiti 83 +proj=longlat +ellps=intl +towgs84=217.037,86.959,23.956,0,0,0,0 +no_defs ",
    4698: "+title=IGN 1962 Kerguelen +proj=longlat +ellps=intl +towgs84=145,-187,103,0,0,0,0 +no_defs ",
    4749: "+title=RGNC91-93 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
    4750: "+title=ST87 Ouvea +proj=longlat +ellps=WGS84 +towgs84=-56.263,16.136,-22.856,0,0,0,0 +no_defs ",
    4807: "+title=NTF (Paris) +proj=longlat +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +no_defs ",
    2056: "+title=CH1903+ / LV95 +proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs ",
    2154: "+title=RGF93 / Lambert-93 +proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    2213: "+title=ETRS89 / TM 30 NE +proj=tmerc +lat_0=0 +lon_0=30 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ",
    2969: "+title=Fort Marigot / UTM zone 20N +proj=utm +zone=20 +ellps=intl +towgs84=137,248,-430,0,0,0,0 +units=m +no_defs ",
    2970: "+title=Guadeloupe 1948 / UTM zone 20N +proj=utm +zone=20 +ellps=intl +units=m +no_defs ",
    2971: "+title=CSG67 / UTM zone 22N +proj=utm +zone=22 +ellps=intl +towgs84=-186,230,110,0,0,0,0 +units=m +no_defs ",
    2972: "+title=RGFG95 / UTM zone 22N +proj=utm +zone=22 +ellps=GRS80 +towgs84=2,2,-2,0,0,0,0 +units=m +no_defs ",
    2973: "+title=Martinique 1938 / UTM zone 20N +proj=utm +zone=20 +ellps=intl +units=m +no_defs ",
    2975: "+title=RGR92 / UTM zone 40S +proj=utm +zone=40 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    2976: "+title=Tahiti 52 / UTM zone 6S +proj=utm +zone=6 +south +ellps=intl +towgs84=162,117,154,0,0,0,0 +units=m +no_defs ",
    2977: "+title=Tahaa 54 / UTM zone 5S +proj=utm +zone=5 +south +ellps=intl +units=m +no_defs ",
    2978: "+title=IGN72 Nuku Hiva / UTM zone 7S +proj=utm +zone=7 +south +ellps=intl +units=m +no_defs ",
    2980: "+title=Combani 1950 / UTM zone 38S +proj=utm +zone=38 +south +ellps=intl +towgs84=-382,-59,-262,0,0,0,0 +units=m +no_defs ",
    2981: "+title=IGN56 Lifou / UTM zone 58S +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
    2982: "+title=IGN72 Grand Terre / UTM zone 58S (deprecated) +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
    2984: "+title=RGNC 1991 / Lambert New Caledonia (deprecated) +proj=lcc +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5 +lon_0=166 +x_0=400000 +y_0=300000 +ellps=intl +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    2986: "+title=Terre Adelie 1950 +proj=stere +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +lat_0=-90.000000000 +lon_0=140.000000000 +lat_ts=-67.000000000 +k=0.96027295 +x_0=300000.000 +y_0=-2299363.482 +units=m +no_defs",
    2987: "+title=Saint Pierre et Miquelon 1950 / UTM zone 21N +proj=utm +zone=21 +ellps=clrk66 +towgs84=30,430,368,0,0,0,0 +units=m +no_defs ",
    2989: "+title=RRAF 1991 / UTM zone 20N +proj=utm +zone=20 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    2990: "+title=Reunion 1947 / TM Reunion (deprecated) +proj=tmerc +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=50000 +y_0=160000 +ellps=intl +units=m +no_defs ",
    2995: "+title=IGN53 Mare / UTM zone 58S +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
    3038: "+proj=utm +zone=26 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3039: "+proj=utm +zone=27 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3040: "+proj=utm +zone=28 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3041: "+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    // 3042 : "+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    // 3043 : "+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    // 3044 : "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3045: "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3046: "+proj=utm +zone=34 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3047: "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3048: "+proj=utm +zone=36 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3049: "+proj=utm +zone=37 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3050: "+proj=utm +zone=38 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3051: "+proj=utm +zone=39 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3034: "+title=ETRS89 / ETRS-LCC +proj=lcc +lat_1=35 +lat_2=65 +lat_0=52 +lon_0=10 +x_0=4000000 +y_0=2800000 +ellps=GRS80 +units=m +no_defs ",
    3035: "+title=ETRS89 / ETRS-LAEA +proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs ",
    3042: "+title=ETRS89 / ETRS-TM30 +proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs ",
    3043: "+title=ETRS89 / ETRS-TM31 +proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs ",
    3044: "+title=ETRS89 / ETRS-TM32 +proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs ",
    25828: "+proj=utm +zone=28 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    25829: "+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    // 25830 : "+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    // 25831 : "+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    // 25832 : "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    25833: "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    25834: "+proj=utm +zone=34 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    25835: "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    25836: "+proj=utm +zone=36 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    25837: "+proj=utm +zone=37 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    25838: "+proj=utm +zone=38 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3060: "+title=IGN72 Grande Terre / UTM zone 58S +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
    3163: "+title=RGNC91-93 / Lambert New Caledonia +proj=lcc +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5 +lon_0=166 +x_0=400000 +y_0=300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3164: "+title=ST87 Ouvea / UTM zone 58S +proj=utm +zone=58 +south +ellps=WGS84 +towgs84=-56.263,16.136,-22.856,0,0,0,0 +units=m +no_defs ",
    3165: "+title=NEA74 Noumea / Noumea Lambert +proj=lcc +lat_1=-22.24469175 +lat_2=-22.29469175 +lat_0=-22.26969175 +lon_0=166.44242575 +x_0=0.66 +y_0=1.02 +ellps=intl +units=m +no_defs ",
    3166: "+title=NEA74 Noumea / Noumea Lambert 2 +proj=lcc +lat_1=-22.24472222222222 +lat_2=-22.29472222222222 +lat_0=-22.26972222222222 +lon_0=166.4425 +x_0=8.313000000000001 +y_0=-2.354 +ellps=intl +units=m +no_defs ",
    3169: "+title=RGNC91-93 / UTM zone 57S +proj=utm +zone=57 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3170: "+title=RGNC91-93 / UTM zone 58S +proj=utm +zone=58 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3171: "+title=RGNC91-93 / UTM zone 59S +proj=utm +zone=59 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
    3172: "+title=IGN53 Mare / UTM zone 59S +proj=utm +zone=59 +south +ellps=intl +units=m +no_defs ",
    3296: "+title=RGPF / UTM zone 5S +proj=utm +zone=5 +south +ellps=GRS80 +units=m +no_defs ",
    3297: "+title=RGPF / UTM zone 6S +proj=utm +zone=6 +south +ellps=GRS80 +units=m +no_defs ",
    3298: "+title=RGPF / UTM zone 7S +proj=utm +zone=7 +south +ellps=GRS80 +units=m +no_defs ",
    3299: "+title=RGPF / UTM zone 8S +proj=utm +zone=8 +south +ellps=GRS80 +units=m +no_defs ",
    3302: "+title=IGN63 Hiva Oa / UTM zone 7S +proj=utm +zone=7 +south +ellps=intl +units=m +no_defs ",
    3303: "+title=Fatu Iva 72 / UTM zone 7S +proj=utm +zone=7 +south +ellps=intl +towgs84=347.103,1078.12,2623.92,-33.8875,70.6773,-9.3943,186.074 +units=m +no_defs ",
    3304: "+title=Tahiti 79 / UTM zone 6S +proj=utm +zone=6 +south +ellps=intl +units=m +no_defs ",
    3305: "+title=Moorea 87 / UTM zone 6S +proj=utm +zone=6 +south +ellps=intl +towgs84=215.525,149.593,176.229,-3.2624,-1.692,-1.1571,10.4773 +units=m +no_defs ",
    3306: "+title=Maupiti 83 / UTM zone 5S +proj=utm +zone=5 +south +ellps=intl +towgs84=217.037,86.959,23.956,0,0,0,0 +units=m +no_defs ",
    3312: "+title=CSG67 / UTM zone 21N +proj=utm +zone=21 +ellps=intl +towgs84=-186,230,110,0,0,0,0 +units=m +no_defs ",
    3313: "+title=RGFG95 / UTM zone 21N +proj=utm +zone=21 +ellps=GRS80 +towgs84=2,2,-2,0,0,0,0 +units=m +no_defs ",
    3336: "+title=IGN 1962 Kerguelen / UTM zone 42S +proj=utm +zone=42 +south +ellps=intl +towgs84=145,-187,103,0,0,0,0 +units=m +no_defs ",
    3395: "+title=WGS 84 / World Mercator +proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    3727: "+title=Reunion 1947 / TM Reunion +proj=tmerc +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=160000 +y_0=50000 +ellps=intl +units=m +no_defs ",
    21781: "+title=CH1903 / LV03 +proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs ",
    25830: "+title=ETRS89 / UTM zone 30N +proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs ",
    25831: "+title=ETRS89 / UTM zone 31N +proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs ",
    25832: "+title=ETRS89 / UTM zone 32N +proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs ",
    27561: "+title=NTF (Paris) / Lambert Nord France +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27562: "+title=NTF (Paris) / Lambert Centre France +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27563: "+title=NTF (Paris) / Lambert Sud France +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27564: "+title=NTF (Paris) / Lambert Corse +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27571: "+title=NTF (Paris) / Lambert zone I +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27572: "+title=NTF (Paris) / Lambert zone II +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27573: "+title=NTF (Paris) / Lambert zone III +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27574: "+title=NTF (Paris) / Lambert zone IV +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27581: "+title=NTF (Paris) / France I (deprecated) +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27582: "+title=NTF (Paris) / France II (deprecated) +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27583: "+title=NTF (Paris) / France III (deprecated) +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27584: "+title=NTF (Paris) / France IV (deprecated) +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27591: "+title=NTF (Paris) / Nord France (deprecated) +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27592: "+title=NTF (Paris) / Centre France (deprecated) +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27593: "+title=NTF (Paris) / Sud France (deprecated) +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    27594: "+title=NTF (Paris) / Corse (deprecated) +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
    32601: "+proj=utm +zone=1 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32602: "+proj=utm +zone=2 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32603: "+proj=utm +zone=3 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32604: "+proj=utm +zone=4 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32605: "+proj=utm +zone=5 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32606: "+proj=utm +zone=6 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32607: "+proj=utm +zone=7 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32608: "+proj=utm +zone=8 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32609: "+proj=utm +zone=9 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32610: "+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32611: "+proj=utm +zone=11 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32612: "+proj=utm +zone=12 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32613: "+proj=utm +zone=13 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32614: "+proj=utm +zone=14 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32615: "+proj=utm +zone=15 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32616: "+proj=utm +zone=16 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32617: "+proj=utm +zone=17 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32618: "+proj=utm +zone=18 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32619: "+proj=utm +zone=19 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32620: "+proj=utm +zone=20 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32621: "+proj=utm +zone=21 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32622: "+proj=utm +zone=22 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32623: "+proj=utm +zone=23 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32624: "+proj=utm +zone=24 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32625: "+proj=utm +zone=25 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32626: "+proj=utm +zone=26 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32627: "+proj=utm +zone=27 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32628: "+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32629: "+proj=utm +zone=29 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32630: "+proj=utm +zone=30 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32631: "+proj=utm +zone=31 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32632: "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32633: "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32634: "+proj=utm +zone=34 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32635: "+proj=utm +zone=35 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32636: "+proj=utm +zone=36 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32637: "+proj=utm +zone=37 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32638: "+proj=utm +zone=38 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32639: "+proj=utm +zone=39 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32640: "+proj=utm +zone=40 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32641: "+proj=utm +zone=41 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32642: "+proj=utm +zone=42 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32643: "+proj=utm +zone=43 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32644: "+proj=utm +zone=44 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32645: "+proj=utm +zone=45 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32646: "+proj=utm +zone=46 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32647: "+proj=utm +zone=47 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32648: "+proj=utm +zone=48 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32649: "+proj=utm +zone=49 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32650: "+proj=utm +zone=50 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32651: "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32652: "+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32653: "+proj=utm +zone=53 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32654: "+proj=utm +zone=54 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32655: "+proj=utm +zone=55 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32656: "+proj=utm +zone=56 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32657: "+proj=utm +zone=57 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32658: "+proj=utm +zone=58 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32659: "+proj=utm +zone=59 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32660: "+proj=utm +zone=60 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32661: "+proj=stere +lat_0=90 +lat_ts=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32662: "+title=WGS 84 / Plate Carree +proj=eqc +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32701: "+proj=utm +zone=1 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32702: "+proj=utm +zone=2 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32703: "+proj=utm +zone=3 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32704: "+proj=utm +zone=4 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32705: "+proj=utm +zone=5 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32706: "+proj=utm +zone=6 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32707: "+proj=utm +zone=7 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32708: "+proj=utm +zone=8 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32709: "+proj=utm +zone=9 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32710: "+proj=utm +zone=10 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32711: "+proj=utm +zone=11 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32712: "+proj=utm +zone=12 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32713: "+proj=utm +zone=13 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32714: "+proj=utm +zone=14 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32715: "+proj=utm +zone=15 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32716: "+proj=utm +zone=16 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32717: "+proj=utm +zone=17 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32718: "+proj=utm +zone=18 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32719: "+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32720: "+proj=utm +zone=20 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32721: "+proj=utm +zone=21 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32722: "+proj=utm +zone=22 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32723: "+proj=utm +zone=23 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32724: "+proj=utm +zone=24 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32725: "+proj=utm +zone=25 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32726: "+proj=utm +zone=26 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32727: "+proj=utm +zone=27 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32728: "+proj=utm +zone=28 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32729: "+proj=utm +zone=29 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32730: "+proj=utm +zone=30 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32731: "+proj=utm +zone=31 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32732: "+proj=utm +zone=32 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32733: "+proj=utm +zone=33 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32734: "+proj=utm +zone=34 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32735: "+proj=utm +zone=35 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32736: "+proj=utm +zone=36 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32737: "+proj=utm +zone=37 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32738: "+proj=utm +zone=38 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32739: "+proj=utm +zone=39 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32740: "+proj=utm +zone=40 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32741: "+proj=utm +zone=41 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32742: "+proj=utm +zone=42 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32743: "+proj=utm +zone=43 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32744: "+proj=utm +zone=44 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32745: "+proj=utm +zone=45 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32746: "+proj=utm +zone=46 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32747: "+proj=utm +zone=47 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32748: "+proj=utm +zone=48 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32749: "+proj=utm +zone=49 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32750: "+proj=utm +zone=50 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32751: "+proj=utm +zone=51 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32752: "+proj=utm +zone=52 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32753: "+proj=utm +zone=53 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32754: "+proj=utm +zone=54 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32755: "+proj=utm +zone=55 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32756: "+proj=utm +zone=56 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32757: "+proj=utm +zone=57 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32758: "+proj=utm +zone=58 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32759: "+proj=utm +zone=59 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32760: "+proj=utm +zone=60 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    32761: "+proj=stere +lat_0=-90 +lat_ts=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
    310024802: "+title=Geoportail - France metropolitaine +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=46.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310915814: "+title=Geoportail - Antilles francaises +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310486805: "+title=Geoportail - Guyane +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=4.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310700806: "+title=Geoportail - Reunion et dependances +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-21.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310702807: "+title=Geoportail - Mayotte +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-12.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310706808: "+title=Geoportail - Saint-Pierre et Miquelon +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=47.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310547809: "+title=Geoportail - Nouvelle-Caledonie +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-22.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310642810: "+title=Geoportail - Wallis et Futuna +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.000000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-14.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310032811: "+title=Geoportail - Polynesie francaise +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310642812: "+title=Geoportail - Kerguelen +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-49.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310642801: "+title=Geoportail - Crozet +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-46.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310642813: "+title=Geoportail - Amsterdam et Saint-Paul +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-38.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    310642901: "+title=Geoportail - Monde +proj=mill +towgs84=0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.000000 +a=6378137.0000 +rf=298.2572221010000 +lon_0=0.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    5489: "+title=RGAF09 geographiques (dms) +proj=longlat +nadgrids=@null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137 +rf=298.257222101 +units=m +no_defs",
    5490: "+title=RGAF09 UTM Nord Fuseau 20 +proj=tmerc +nadgrids=@null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137 +rf=298.257222101 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs"
  },

  /**
   * definitions CRS
   * @enum
   */
  CRS: {
    84: "+title=WGS 84 longitude-latitude +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs "
  },

  /**
   * definitions IGNF
   * @enum
   */
  IGNF: {
    AMST63: "+title=Amsterdam 1963 +proj=geocent +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    CROZ63: "+title=Crozet 1963 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    CSG67: "+title=Guyane CSG67 +proj=geocent +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    ED50: "+title=ED50 +proj=geocent +towgs84=-84.0000,-97.0000,-117.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    ETRS89: "+title=Systeme de reference terrestre Europeen (1989) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    GUAD48: "+title=Guadeloupe Ste Anne +proj=geocent +towgs84=-472.2900,-5.6300,-304.1200,0.4362,-0.8374,0.2563,1.898400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    GUADFM49: "+title=Guadeloupe Fort Marigot +proj=geocent +towgs84=136.5960,248.1480,-429.7890 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    IGN63: "+title=IGN 1963 (Hiva Oa, Tahuata, Mohotani) +proj=geocent +towgs84=410.7210,55.0490,80.7460,-2.5779,-2.3514,-0.6664,17.331100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    IGN72: "+title=IGN 1972 Grande-Terre / Ile des Pins +proj=geocent +towgs84=-11.6400,-348.6000,291.6800 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    KERG62CAR: "+title=Kerguelen - K0 +proj=geocent +towgs84=144.8990,-186.7700,100.9230 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    MART38: "+title=Martinique Fort-Desaix +proj=geocent +towgs84=126.9260,547.9390,130.4090,-2.7867,5.1612,-0.8584,13.822650 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    MAYO50: "+title=Mayotte Combani +proj=geocent +towgs84=-599.9280,-275.5520,-195.6650,-0.0835,-0.4715,0.0602,49.281400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    MOOREA87: "+title=Moorea 1987 +proj=geocent +towgs84=215.9820,149.5930,176.2290,3.2624,1.6920,1.1571,10.477300 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    NTF: "+title=Nouvelle Triangulation Francaise +proj=geocent +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +units=m +no_defs",
    NUKU72: "+title=IGN 1972 Nuku Hiva +proj=geocent +towgs84=165.7320,216.7200,180.5050,-0.6434,-0.4512,-0.0791,7.420400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    REUN47: "+title=Reunion 1947 +proj=geocent +towgs84=789.5240,-626.4860,-89.9040,0.6006,76.7946,-10.5788,-32.324100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    RGF93: "+title=Reseau geodesique francais 1993 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGFG95: "+title=Reseau geodesique francais de Guyane 1995 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGM04: "+title=RGM04 (Reseau Geodesique de Mayotte 2004) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGNC: "+title=Reseau Geodesique de Nouvelle-Caledonie +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGPF: "+title=RGPF (Reseau Geodesique de Polynesie Francaise) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGR92: "+title=Reseau geodesique Reunion 1992 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGSPM06: "+title=Reseau Geodesique Saint-Pierre-et-Miquelon (2006) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGTAAF07: "+title=Reseau Geodesique des TAAF (2007) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RRAF91: "+title=RRAF 1991 (Reseau de Reference des Antilles Francaises) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    STPL69: "+title=Saint-Paul 1969 +proj=geocent +towgs84=225.571,-346.608,-46.567,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    STPM50: "+title=St Pierre et Miquelon 1950 +proj=geocent +towgs84=-95.5930,573.7630,173.4420,-0.9602,1.2510,-1.3918,42.626500 +a=6378206.4000 +rf=294.9786982000000 +units=m +no_defs",
    TAHAA: "+title=Raiatea - Tahaa 51-54 (Tahaa, Base Terme Est) +proj=geocent +towgs84=72.4380,345.9180,79.4860,-1.6045,-0.8823,-0.5565,1.374600 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    TAHI79: "+title=IGN79 (Tahiti) Iles de la Societe +proj=geocent +towgs84=221.5250,152.9480,176.7680,2.3847,1.3896,0.8770,11.474100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    TERA50: "+title=Pointe Geologie - Perroud 1950 +proj=geocent +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    WALL78: "+title=Wallis-Uvea 1978 (MOP78) +proj=geocent +towgs84=253.0000,-133.0000,-127.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    WGS72: "+title=World Geodetic System 1972 +proj=geocent +towgs84=0.0000,12.0000,6.0000 +a=6378135.0000 +rf=298.2600000000000 +units=m +no_defs",
    WGS84: "+title=World Geodetic System 1984 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    AMST63GEO: "+title=Amsterdam 1963 +proj=longlat +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    CROZ63GEO: "+title=Crozet 1963 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    CSG67GEO: "+title=Guyane CSG67 +proj=longlat +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    ED50G: "+title=ED50 +proj=longlat +towgs84=-84.0000,-97.0000,-117.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    GUAD48GEO: "+title=Guadeloupe Ste Anne +proj=longlat +towgs84=-472.2900,-5.6300,-304.1200,0.4362,-0.8374,0.2563,1.898400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    GUADFM49GEO: "+title=Guadeloupe Fort Marigot +proj=longlat +towgs84=136.5960,248.1480,-429.7890 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    IGN63GEO: "+title=IGN 1963 (Hiva Oa, Tahuata, Mohotani) +proj=longlat +towgs84=410.7210,55.0490,80.7460,-2.5779,-2.3514,-0.6664,17.331100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    IGN72GEO: "+title=IGN 1972 Grande-Terre / Ile des Pins +proj=longlat +towgs84=-11.6400,-348.6000,291.6800 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    KERG62GEO: "+title=Kerguelen - K0 +proj=longlat +towgs84=144.8990,-186.7700,100.9230 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    MART38GEO: "+title=Martinique Fort-Desaix +proj=longlat +towgs84=126.9260,547.9390,130.4090,-2.7867,5.1612,-0.8584,13.822650 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    MAYO50GEO: "+title=Mayotte Combani +proj=longlat +towgs84=-599.9280,-275.5520,-195.6650,-0.0835,-0.4715,0.0602,49.281400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    MOOREA87GEO: "+title=Moorea 1987 +proj=longlat +towgs84=215.9820,149.5930,176.2290,3.2624,1.6920,1.1571,10.477300 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    NTFG: "+title=Nouvelle Triangulation Francaise Greenwich degres sexagesimaux +proj=longlat +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +units=m +no_defs",
    NTFP: "+title=Nouvelle Triangulation Francaise Paris grades +proj=longlat +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +units=m +no_defs",
    NUKU72GEO: "+title=IGN 1972 Nuku Hiva +proj=longlat +towgs84=165.7320,216.7200,180.5050,-0.6434,-0.4512,-0.0791,7.420400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    REUN47GEO: "+title=Reunion 1947 +proj=longlat +towgs84=789.5240,-626.4860,-89.9040,0.6006,76.7946,-10.5788,-32.324100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    RGF93G: "+title=Reseau geodesique francais 1993 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGFG95GEO: "+title=Reseau geodesique francais de Guyane 1995 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGM04GEO: "+title=RGM04 (Reseau Geodesique de Mayotte 2004) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGNCGEO: "+title=Reseau Geodesique de Nouvelle-Caledonie +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGPFGEO: "+title=RGPF (Reseau Geodesique de Polynesie Francaise) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGR92GEO: "+title=Reseau geodesique de la Reunion 1992 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGSPM06GEO: "+title=Saint-Pierre-et-Miquelon (2006) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    RGTAAF07G: "+title=Reseau Geodesique des TAAF (2007) (dms) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    STPL69GEO: "+title=Saint-Paul 1969 +proj=longlat +towgs84=225.571,-346.608,-46.567,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    STPM50GEO: "+title=St Pierre et Miquelon 1950  +proj=longlat +towgs84=-95.5930,573.7630,173.4420,-0.9602,1.2510,-1.3918,42.626500 +a=6378206.4000 +rf=294.9786982000000 +units=m +no_defs",
    TAHAAGEO: "+title=Raiatea - Tahaa 51-54 (Tahaa, Base Terme Est) +proj=longlat +towgs84=72.4380,345.9180,79.4860,-1.6045,-0.8823,-0.5565,1.374600 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    TAHI79GEO: "+title=IGN79 (Tahiti) Iles de la Societe +proj=longlat +towgs84=221.5250,152.9480,176.7680,2.3847,1.3896,0.8770,11.474100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    TERA50G: "+title=Pointe Geologie - Perroud 1950 +proj=longlat +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    WALL78GEO: "+title=Wallis - Uvea 1978 (MOP78) +proj=longlat +towgs84=253.0000,-133.0000,-127.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
    WGS72G: "+title=WGS72 +proj=longlat +towgs84=0.0000,12.0000,6.0000 +a=6378135.0000 +rf=298.2600000000000 +units=m +no_defs",
    WGS84G: "+title=World Geodetic System 1984 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    WGS84RRAFGEO: "+title=Reseau de reference des Antilles francaises (1988-1991) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    XGEO: "+title=Systeme CIO-BIH +proj=longlat +towgs84=0.0000,0.0000,0.5000,0.0000,0.0000,0.0140,-0.100000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    AMST63UTM43S: "+title=Amsterdam 1963 UTM fuseau 43 Sud +proj=tmerc +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=75.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    CROZ63UTM39S: "+title=Crozet 1963 +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    CSG67UTM21: "+title=Guyane CSG67 UTM fuseau 21 +proj=tmerc +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    CSG67UTM22: "+title=Guyane CSG67 UTM fuseau 22 +proj=tmerc +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALANF: "+title=Geoportail - Antilles francaises +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALASP: "+title=Geoportail - Amsterdam et Saint-Paul +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-38.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALCRZ: "+title=Geoportail - Crozet +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-46.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALFXX: "+title=Geoportail - France metropolitaine +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=46.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALGUF: "+title=Geoportail - Guyane +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=4.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALKER: "+title=Geoportail - Kerguelen +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-49.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALMYT: "+title=Geoportail - Mayotte +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-12.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALNCL: "+title=Geoportail - Nouvelle-Caledonie +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-22.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALPYF: "+title=Geoportail - Polynesie francaise +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALREU: "+title=Geoportail - Reunion et dependances +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-21.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALSPM: "+title=Geoportail - Saint-Pierre et Miquelon +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=47.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GEOPORTALWLF: "+title=Geoportail - Wallis et Futuna +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-14.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    GUAD48UTM20: "+title=Guadeloupe Ste Anne +proj=tmerc +towgs84=-472.2900,-5.6300,-304.1200,0.4362,-0.8374,0.2563,1.898400 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    GUADFM49U20: "+title=Guadeloupe Fort Marigot  +proj=tmerc +towgs84=136.5960,248.1480,-429.7890 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    IGN63UTM7S: "+title=IGN 1963 - Hiva Oa, Tahuata, Mohotani - UTM fuseau 7 Sud +proj=tmerc +towgs84=410.7210,55.0490,80.7460,-2.5779,-2.3514,-0.6664,17.331100 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-141.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    IGN72UTM58S: "+title=IGN 1972 - UTM fuseau 58 Sud +proj=tmerc +towgs84=-11.6400,-348.6000,291.6800 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=165.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    KERG62UTM42S: "+title=Kerguelen 1962 +proj=tmerc +towgs84=144.8990,-186.7700,100.9230 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=69.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    LAMB1: "+title=Lambert I +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=49.500000000 +lon_0=0.000000000 +k_0=0.99987734 +lat_1=49.500000000 +x_0=600000.000 +y_0=200000.000 +units=m +no_defs",
    LAMB1C: "+title=Lambert I Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=49.500000000 +lon_0=0.000000000 +k_0=0.99987734 +lat_1=49.500000000 +x_0=600000.000 +y_0=1200000.000 +units=m +no_defs",
    LAMB2: "+title=Lambert II +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=46.800000000 +lon_0=0.000000000 +k_0=0.99987742 +lat_1=46.800000000 +x_0=600000.000 +y_0=200000.000 +units=m +no_defs",
    LAMB2C: "+title=Lambert II Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=46.800000000 +lon_0=0.000000000 +k_0=0.99987742 +lat_1=46.800000000 +x_0=600000.000 +y_0=2200000.000 +units=m +no_defs",
    LAMB3: "+title=Lambert III +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=44.100000000 +lon_0=0.000000000 +k_0=0.99987750 +lat_1=44.100000000 +x_0=600000.000 +y_0=200000.000 +units=m +no_defs",
    LAMB3C: "+title=Lambert III Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=44.100000000 +lon_0=0.000000000 +k_0=0.99987750 +lat_1=44.100000000 +x_0=600000.000 +y_0=3200000.000 +units=m +no_defs",
    LAMB4: "+title=Lambert IV +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=42.165000000 +lon_0=0.000000000 +k_0=0.99994471 +lat_1=42.165000000 +x_0=234.358 +y_0=185861.369 +units=m +no_defs",
    LAMB4C: "+title=Lambert IV Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=42.165000000 +lon_0=0.000000000 +k_0=0.99994471 +lat_1=42.165000000 +x_0=234.358 +y_0=4185861.369 +units=m +no_defs",
    LAMB93: "+title=Lambert 93 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=46.500000000 +lon_0=3.000000000 +lat_1=44.000000000 +lat_2=49.000000000 +x_0=700000.000 +y_0=6600000.000 +units=m +no_defs",
    RGF93CC42: "+title=Lambert conique conforme Zone 1 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=42.000000000 +lon_0=3.000000000 +lat_1=41.200000000 +lat_2=42.800000000 +x_0=1700000.000 +y_0=1200000.000 +units=m +no_defs",
    RGF93CC43: "+title=Lambert conique conforme Zone 2 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=43.000000000 +lon_0=3.000000000 +lat_1=42.200000000 +lat_2=43.800000000 +x_0=1700000.000 +y_0=2200000.000 +units=m +no_defs",
    RGF93CC44: "+title=Lambert conique conforme Zone 3 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=44.000000000 +lon_0=3.000000000 +lat_1=43.200000000 +lat_2=44.800000000 +x_0=1700000.000 +y_0=3200000.000 +units=m +no_defs",
    RGF93CC45: "+title=Lambert conique conforme Zone 4 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=45.000000000 +lon_0=3.000000000 +lat_1=44.200000000 +lat_2=45.800000000 +x_0=1700000.000 +y_0=4200000.000 +units=m +no_defs",
    RGF93CC46: "+title=Lambert conique conforme Zone 5 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=46.000000000 +lon_0=3.000000000 +lat_1=45.200000000 +lat_2=46.800000000 +x_0=1700000.000 +y_0=5200000.000 +units=m +no_defs",
    RGF93CC47: "+title=Lambert conique conforme Zone 6 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=47.000000000 +lon_0=3.000000000 +lat_1=46.200000000 +lat_2=47.800000000 +x_0=1700000.000 +y_0=6200000.000 +units=m +no_defs",
    RGF93CC48: "+title=Lambert conique conforme Zone 7 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=48.000000000 +lon_0=3.000000000 +lat_1=47.200000000 +lat_2=48.800000000 +x_0=1700000.000 +y_0=7200000.000 +units=m +no_defs",
    RGF93CC49: "+title=Lambert conique conforme Zone 8 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=49.000000000 +lon_0=3.000000000 +lat_1=48.200000000 +lat_2=49.800000000 +x_0=1700000.000 +y_0=8200000.000 +units=m +no_defs",
    RGF93CC50: "+title=Lambert conique conforme Zone 9 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=50.000000000 +lon_0=3.000000000 +lat_1=49.200000000 +lat_2=50.800000000 +x_0=1700000.000 +y_0=9200000.000 +units=m +no_defs",
    LAMBE: "+title=Lambert II etendu +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=46.800000000 +lon_0=0.000000000 +k_0=0.99987742 +lat_1=46.800000000 +x_0=600000.000 +y_0=2200000.000 +units=m +no_defs",
    MART38UTM20: "+title=Martinique Fort-Desaix +proj=tmerc +towgs84=126.9260,547.9390,130.4090,-2.7867,5.1612,-0.8584,13.822650 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    MAYO50UTM38S: "+title=Mayotte Combani +proj=tmerc +towgs84=-599.9280,-275.5520,-195.6650,-0.0835,-0.4715,0.0602,49.281400 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=45.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    MILLER: "+title=Geoportail - Monde +proj=mill +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lon_0=0.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
    MOOREA87U6S: "+title=Moorea 1987 - UTM fuseau 6 Sud +proj=tmerc +towgs84=215.9820,149.5930,176.2290,3.2624,1.6920,1.1571,10.477300 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    NUKU72U7S: "+title=IGN 1972 Nuku Hiva - UTM fuseau 7 Sud +proj=tmerc +towgs84=165.7320,216.7200,180.5050,-0.6434,-0.4512,-0.0791,7.420400 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-141.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    // REUN47GAUSSL : "+title=Reunion Gauss Laborde +proj=gstmerc +towgs84=789.5240,-626.4860,-89.9040,0.6006,76.7946,-10.5788,-32.324100 +a=6378388.0000 +rf=297.0000000000000 +lat_0=-21.116666667 +lon_0=55.533333333 +k_0=1.00000000 +x_0=160000.000 +y_0=50000.000 +units=m +no_defs",
    RGM04UTM38S: "+title=UTM fuseau 38 Sud (Reseau Geodesique de Mayotte 2004) +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=45.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGNCUTM57S: "+title=Reseau Geodesique de Nouvelle-Caledonie - UTM fuseau 57 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=159.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGNCUTM58S: "+title=Reseau Geodesique de Nouvelle-Caledonie - UTM fuseau 58 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=165.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGNCUTM59S: "+title=Reseau Geodesique de Nouvelle-Caledonie - UTM fuseau 59 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=171.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGPFUTM5S: "+title=RGPF - UTM fuseau 5 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-153.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGPFUTM6S: "+title=RGPF - UTM fuseau 6 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGPFUTM7S: "+title=RGPF - UTM fuseau 7 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-141.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGR92UTM40S: "+title=RGR92 UTM fuseau 40 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    RGSPM06U21: "+title=Saint-Pierre-et-Miquelon (2006) UTM Fuseau 21 Nord +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    STPL69UTM43S: "+title=Saint-Paul 1969 UTM fuseau 43 Sud +proj=tmerc +towgs84=225.571,-346.608,-46.567,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=75.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    STPM50UTM21: "+title=St Pierre et Miquelon 1950 +proj=tmerc +towgs84=-95.5930,573.7630,173.4420,-0.9602,1.2510,-1.3918,42.626500 +a=6378206.4000 +rf=294.9786982000000 +lat_0=0.000000000 +lon_0=-57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    TAHAAUTM05S: "+title=Tahaa 1951 +proj=tmerc +towgs84=72.4380,345.9180,79.4860,-1.6045,-0.8823,-0.5565,1.374600 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-153.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    TAHI51UTM06S: "+title=Tahiti-Terme Nord UTM fuseau 6 Sud +proj=tmerc +towgs84=162.0000,117.0000,154.0000 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    TAHI79UTM6S: "+title=Tahiti 1979 +proj=tmerc +towgs84=221.5250,152.9480,176.7680,2.3847,1.3896,0.8770,11.474100 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    TERA50STEREO: "+title=Terre Adelie 1950 +proj=stere +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +lat_0=-90.000000000 +lon_0=140.000000000 +lat_ts=-67 +k=0.96027295 +x_0=300000.000 +y_0=-2299363.482 +units=m +no_defs",
    UTM01SW84: "+title=World Geodetic System 1984 UTM fuseau 01 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-177.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    UTM20W84GUAD: "+title=World Geodetic System 1984 UTM fuseau 20 Nord-Guadeloupe +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM20W84MART: "+title=World Geodetic System 1984 UTM fuseau 20 Nord-Martinique +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM22RGFG95: "+title=RGFG95 UTM fuseau 22 Nord-Guyane +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM39SW84: "+title=World Geodetic System 1984 UTM fuseau 39 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    UTM42SW84: "+title=World Geodetic System 1984 UTM fuseau 42 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=69.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    UTM43SW84: "+title=World Geodetic System 1984 UTM fuseau 43 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=75.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    WALL78UTM1S: "+title=Wallis-Uvea 1978 (MOP78) UTM 1 SUD +proj=tmerc +towgs84=253.0000,-133.0000,-127.0000 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-177.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
    ETRS89GEO: "+title=ETRS89 geographiques (dms) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
    ETRS89LAEA: "+title=ETRS89 Lambert Azimutal Equal Area +proj=laea +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=52.000000000 +lon_0=10.000000000 +x_0=4321000.000 +y_0=3210000.000 +units=m +no_defs",
    ETRS89LCC: "+title=ETRS89 Lambert Conformal Conic +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=52.000000000 +lon_0=9.999999995 +lat_1=35.000000000 +lat_2=65.000000000 +x_0=4000000.000 +y_0=2800000.000 +units=m +no_defs",
    UTM26ETRS89: "+title=Europe - de 30d a 24d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-27.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM27ETRS89: "+title=Europe - de 24d a 18d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-21.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM28ETRS89: "+title=Europe - de 18d a 12d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-15.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM29ETRS89: "+title=Europe - de 12d a 6d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-9.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM30ETRS89: "+title=Europe - de -6d a 0d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-3.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM31ETRS89: "+title=Europe - de 0d a 6d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=3.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM32ETRS89: "+title=Europe - de 6d a 12d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=9.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM33ETRS89: "+title=Europe - de 12d a 18d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=15.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM34ETRS89: "+title=Europe - de 18d a 24d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=21.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM35ETRS89: "+title=Europe - de 24d a 30d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=27.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM36ETRS89: "+title=Europe - de 30d a 36d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=33.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM37ETRS89: "+title=Europe - de 36d a 42d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=39.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
    UTM38ETRS89: "+title=Europe - de 42d a 48d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=45.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs"
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Register);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(100);



/**
 * @classdesc
 *
 * Leaflet Lambert 93 (EPSG:2154) <a href="http://leafletjs.com/reference.html#icrs" target="_blank">ICRS compatible</a> definition.
 *
 * @module
 * @alias L.geoportalCRS.EPSG2154
 * @example
 *  var map = L.Map('divmap', {
 *    crs : L.geoportalCRS.EPSG2154
 *  }).setView();
 *  var lyr = L.geoportalLayer.WMTS(
 *    {
 *      layer : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
 *    });
 *
 *  lyr.addTo(map); // ou map.addLayer(lyr);
 */

/** @type {L.geoportalCRS.EPSG2154} */

var EPSG2154 = {
  /**
   * instance
   *
   * @private
   */
  instance: null,

  /**
   * execution
   *
   * @returns {Object} instance
   * @private
   */
  build: function build() {
    // singleton
    if (!this.instance) {
      var crs = new leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Proj.CRS("EPSG:2154", _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__["default"].get("EPSG:2154"), {
        // FIXME issue de l'autoconf cf. nativeResolutions
        resolutions: this._getResolutions(),
        origin: this._getOrigin()
      });
      this.instance = crs;
    }

    return this.instance;
  },

  /**
   * resolutions
   *
   * @returns {Number[]} resolutions
   * @private
   */
  _getResolutions: function _getResolutions() {
    var resolutions = []; // resolutions issues de l'autoconf

    if (_Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].isConfigLoaded()) {
      var o = _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].getTileMatrix("LAMB93");
      resolutions = o.nativeResolutions;
    }

    if (resolutions.length) {
      return resolutions;
    } // resolution par defaut


    return [104579.22454989408, 52277.53235379051, 26135.487078595408, 13066.891381800004, 6533.228604113456, 3266.5595244626675, 1633.2660045974187, 816.6295549860224, 408.31391467683596, 204.15674151090204, 102.07831678324082, 51.0391448966112, 25.519569074269395, 12.759783693647506, 6.379891635966491, 3.18994576530532, 1.5949728694977277, 0.7974864315474559, 0.398743214900604, 0.19937160727567999, 0.099685803696052, 0.049842901818919996];
  },

  /**
   * origine
   *
   * @returns {Number[]} origin
   * @private
   */
  _getOrigin: function _getOrigin() {
    return [0, 12000000];
  }
};
/* harmony default export */ __webpack_exports__["default"] = (EPSG2154);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(100);



/**
 *
 * Projection Lambert 2 étendu
 *
 * @module
 * @alias L.geoportalCRS.EPSG27572
 * @example
 *  var map = L.Map('divmap', {
 *    crs : L.geoportalCRS.EPSG27572
 *  }).setView();
 *  var lyr = L.geoportalLayer.WMTS(
 *    {
 *      layer : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93",
 *      apiKey : "wqxljfvklsdhvlfkjqfmlq787645"
 *    },
 *    {
 *      attribution : "test for layer ORTHOIMAGERY",
 *      opacity : 1,
 *      transparent : true,
 *      minZoom : 1,
 *      maxZoom : 21
 *      ...
 *    });
 *
 *  lyr.addTo(map); // ou map.addLayer(lyr);
 */

/** @type {L.geoportalCRS.EPSG27572} */

var EPSG27572 = {
  /**
   * instance
   *
   * @private
   */
  instance: null,

  /**
   * execution
   *
   * @returns {Object} instance
   * @private
   */
  build: function build() {
    // singleton
    if (!this.instance) {
      var crs = new leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Proj.CRS("EPSG:27572", _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__["default"].get("EPSG:27572"), {
        // FIXME issue de l'autoconf cf. nativeResolutions
        resolutions: this._getResolutions(),
        origin: this._getOrigin()
      });
      this.instance = crs;
    }

    return this.instance;
  },

  /**
   * resolutions
   *
   * @returns {Number[]} resolutions
   * @private
   */
  _getResolutions: function _getResolutions() {
    var resolutions = []; // resolutions issues de l'autoconf

    if (_Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].isConfigLoaded()) {
      var o = _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].getTileMatrix("LAMB2E");

      if (o && Object.keys(o).length) {
        resolutions = o.nativeResolutions;
      }
    }

    if (resolutions.length) {
      return resolutions;
    } // FIXME resolution par defaut ???


    return [104579.22454989408, 52277.53235379051, 26135.487078595408, 13066.891381800004, 6533.228604113456, 3266.5595244626675, 1633.2660045974187, 816.6295549860224, 408.31391467683596, 204.15674151090204, 102.07831678324082, 51.0391448966112, 25.519569074269395, 12.759783693647506, 6.379891635966491, 3.18994576530532, 1.5949728694977277, 0.7974864315474559, 0.398743214900604, 0.19937160727567999, 0.099685803696052, 0.049842901818919996];
  },

  /**
   * origine
   *
   * @returns {Number[]} origin
   * @private
   */
  _getOrigin: function _getOrigin() {
    return [0, 12000000];
  }
};
/* harmony default export */ __webpack_exports__["default"] = (EPSG27572);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(100);


 // FIXME prototype
// il ne fonctionne pas car les bbox ne sont pas bien formatées !?
//   > BBOX=xmin,ymin,xmax,ymax --> conversion en EPSG --> BBOX=ymin,xmin,ymax,xmax
// cf. methode L.TileLayer.WMS.getTileUrl()
//   > inversion des coordonnées si crs = L.CRS.EPSG4326
// il faudrait donc surcharger cette methode afin qu'elle prenne en compte la condition suivante :
//   > crs.code = "EPSG:4326"

/**
 * Projection Geographic (EPSG:4326)
 * (PROTOTYPE)
 *
 * @ignore
 * @module
 * @alias L.geoportalCRS.EPSG2154
 * @returns {L.Proj.CRS}
 * @example
 *  var map = L.Map('divmap', {
 *    crs : L.geoportalCRS.EPSG4326 // ou L.CRS.EPSG4326
 *  }).setView();
 *  var lyr = L.geoportalLayer.WMTS(
 *    {
 *      layer : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO",
 *      apiKey : "wqxljfvklsdhvlfkjqfmlq787645"
 *    },
 *    {
 *      attribution : "test for layer ORTHOIMAGERY",
 *      opacity : 1,
 *      transparent : true,
 *      minZoom : 1,
 *      maxZoom : 21
 *      ...
 *    });
 *
 *  lyr.addTo(map); // ou map.addLayer(lyr);
 */

/** @type {L.geoportalCRS.EPSG4326} */

var EPSG4326 = {
  /**
   * instance
   *
   * @private
   */
  instance: null,

  /**
   * execution
   *
   * @returns {Object} instance
   * @private
   */
  build: function build() {
    // singleton
    if (!this.instance) {
      var crs = new leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Proj.CRS("EPSG:4326", _Common_Utils_Register__WEBPACK_IMPORTED_MODULE_2__["default"].get("EPSG:4326"), {
        resolutions: this._getResolutions(),
        origin: [-180, 90] // ???

      });
      this.instance = crs;
    }

    return this.instance;
  },

  /**
   * resolutions
   *
   * @returns {Number[]} resolutions
   * @private
   */
  _getResolutions: function _getResolutions() {
    var resolutions = []; // FIXME resolutions issues de l'autoconf
    // mais pas celle du TMS WGS84G

    if (_Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].isConfigLoaded()) {
      resolutions = _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].getResolutions();
    }

    if (resolutions.length) {
      return resolutions;
    }

    return [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953126, 0.0000858306884765628, 0.0000429153442382813, 0.0000214576721191407, 0.0000107288360595703, 0.00000536441802978517, 0.00000268220901489259, 0.0000013411045074463, 0.000000670552253723145, 0.00000033527612686157];
  },

  /**
   * origine
   *
   * @private
   */
  _getOrigin: function _getOrigin() {}
};
/* harmony default export */ __webpack_exports__["default"] = (EPSG4326);

/***/ })
/******/ ])["default"];