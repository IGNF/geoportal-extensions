/*!
 * @brief Geoportal resources access library
 *
 * This software is released under the licence CeCILL-B (Free BSD compatible)
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.txt
 * @see http://www.cecill.info/
 *
 * copyright CeCILL-B
 * copyright IGN
 * @author IGN 
 * @version 1.0.0-beta3
 * @date 2017-01-16
 *
 */
/*!
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and cont  ributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/  master/LICENSE
   * @version   3.0.2
   */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['require', 'require'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('request'), require('xmldom'));
  } else {
    root.Gp = factory(root.request, root.xmldom);
  }
}(this, function(request, xmldom) {

/* BEGIN CODE */
var log4js, loggerCfg, UtilsLoggerByDefault, UtilsHelper, promise, ProtocolsXHR, UtilsMessagesResources, ExceptionsErrorService, ProtocolsJSONP, ProtocolsProtocol, ServicesDefaultUrlService, ServicesCommonService, ServicesAltiRequestModelAltiRequest, ServicesAltiRequestModelAltiElevationRequest, ServicesAltiRequestModelAltiProfilRequest, ServicesAltiRequestAltiRequestREST, FormatsWPS, ServicesAltiRequestAltiRequestWPS, ServicesAltiRequestAltiRequestFactory, FormatsXML, ServicesAltiResponseModelAltiResponse, ServicesAltiResponseModelElevation, ServicesAltiFormatsAltiResponseReader, ServicesAltiResponseAltiResponseFactory, ServicesAltiAlti, ServicesAutoConfResponseModelAutoConfResponse, ServicesAutoConfResponseModelConstraint, ServicesAutoConfResponseModelFormat, ServicesAutoConfResponseModelLayer, ServicesAutoConfResponseModelLegend, ServicesAutoConfResponseModelMetadata, ServicesAutoConfResponseModelOriginator, ServicesAutoConfResponseModelService, ServicesAutoConfResponseModelStyle, ServicesAutoConfResponseModelTerritory, ServicesAutoConfResponseModelThematic, ServicesAutoConfResponseModelTileMatrixSet, ServicesAutoConfResponseModelTileMatrix, ServicesAutoConfResponseModelTileMatrixLimit, ServicesAutoConfFormatsAutoConfResponseReader, ServicesAutoConfResponseAutoConfResponseFactory, ServicesAutoConfAutoConf, FormatsXLSRequestHeader, FormatsXLSRequest, FormatsXLSAbstractService, FormatsXLS, FormatsXLSLocationUtilityServiceModelAddress, FormatsXLSLocationUtilityServiceGeocodeFilterExtension, FormatsXLSLocationUtilityServiceGeocodeRequest, FormatsXLSLocationUtilityServiceModelPosition, FormatsXLSLocationUtilityServiceModelPreference, FormatsXLSLocationUtilityServiceReverseGeocodeRequest, FormatsXLSLocationUtilityService, ServicesGeocodeRequestGeocodeLocation, ServicesGeocodeRequestModelStreetAddress, ServicesGeocodeRequestModelPositionOfInterest, ServicesGeocodeRequestModelCadastralParcel, ServicesGeocodeRequestModelAdministratif, ServicesGeocodeRequestDirectGeocodeRequestFactory, ServicesGeocodeResponseModelGeocodeResponse, ServicesGeocodeResponseModelGeocodedLocation, ServicesGeocodeResponseModelDirectGeocodedLocation, ServicesGeocodeFormatsDirectGeocodeResponseReader, ServicesGeocodeResponseDirectGeocodeResponseFactory, ServicesGeocodeGeocode, ServicesGeocodeRequestReverseGeocodeRequestFactory, ServicesGeocodeResponseModelReverseGeocodedLocation, ServicesGeocodeFormatsReverseGeocodeResponseReader, ServicesGeocodeResponseReverseGeocodeResponseFactory, ServicesGeocodeReverseGeocode, ServicesAutoCompleteResponseModelAutoCompleteResponse, ServicesAutoCompleteResponseModelSuggestedLocation, ServicesAutoCompleteResponseAutoCompleteResponseFactory, ServicesAutoCompleteAutoComplete, FormatsXLSRouteServiceModelRoutePlan, FormatsXLSRouteServiceDetermineRouteRequest, FormatsXLSRouteServiceRouteRequestExtension, FormatsXLSRouteService, ServicesRouteRequestRouteRequestOLS, ServicesRouteRequestModelRouteParamREST, ServicesRouteRequestRouteRequestREST, ServicesRouteRequestRouteRequestFactory, FormatsWKT, ServicesRouteResponseModelRouteResponse, ServicesRouteResponseModelRouteInstruction, ServicesRouteFormatsRouteResponseRESTReader, ServicesRouteFormatsRouteResponseOLSReader, ServicesRouteResponseRouteResponseFactory, ServicesRouteRoute, ServicesProcessIsoCurveRequestModelProcessIsoCurveParam, ServicesProcessIsoCurveRequestProcessIsoCurveRequest, ServicesProcessIsoCurveResponseModelProcessIsoCurveResponse, ServicesProcessIsoCurveFormatsProcessIsoCurveResponseReader, ServicesProcessIsoCurveResponseProcessIsoCurveResponseFactory, ServicesProcessIsoCurveProcessIsoCurve, ServicesServices, Gp;
log4js = undefined;
loggerCfg = {
    loggers: [{
            root: true,
            level: 'all',
            appenders: [{
                    type: 'Console',
                    layout: {
                        type: 'PatternLayout',
                        pattern: '%d{yyyy-MM-dd HH:mm:ss} [%p] %c - %m%n'
                    }
                }]
        }]
};
UtilsLoggerByDefault = function (Log4js, Config) {
    var LoggerByDefault = {
        getLogger: function (name) {
            Log4js.load(Config, function (error) {
                if (error) {
                    throw error;
                }
            });
            var logname = name || 'default';
            return Log4js.getLogger(logname);
        }
    };
    return LoggerByDefault;
}(log4js, loggerCfg);
UtilsHelper = function () {
    var Helper = {
        normalyzeParameters: function (params) {
            var myParams = null;
            if (params) {
                var tabParams = [];
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        var value = params[key];
                        if (!value) {
                            value = '';
                        }
                        tabParams.push(key + '=' + value);
                    }
                }
                myParams = tabParams.join('&');
            }
            return myParams;
        },
        normalyzeUrl: function (url, params, encode) {
            var myUrl = url;
            if (url) {
                var k = url.indexOf('?');
                if (k === -1) {
                    myUrl += '?';
                }
                if (k !== -1 && k !== url.length - 1) {
                    myUrl += '&';
                }
            }
            if (params) {
                if (typeof params === 'string') {
                    myUrl += params;
                } else {
                    myUrl += this.normalyzeParameters(params);
                }
            }
            if (encode) {
                myUrl = encodeURIComponent(myUrl);
            }
            return myUrl;
        },
        indent: function (n, msg) {
            var num = n || 0;
            return new Array(num + 1).join('\t') + msg;
        }
    };
    return Helper;
}();
(function () {
    'use strict';
    function lib$es6$promise$utils$$objectOrFunction(x) {
        return typeof x === 'function' || typeof x === 'object' && x !== null;
    }
    function lib$es6$promise$utils$$isFunction(x) {
        return typeof x === 'function';
    }
    function lib$es6$promise$utils$$isMaybeThenable(x) {
        return typeof x === 'object' && x !== null;
    }
    var lib$es6$promise$utils$$_isArray;
    if (!Array.isArray) {
        lib$es6$promise$utils$$_isArray = function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        };
    } else {
        lib$es6$promise$utils$$_isArray = Array.isArray;
    }
    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
    var lib$es6$promise$asap$$len = 0;
    var lib$es6$promise$asap$$toString = {}.toString;
    var lib$es6$promise$asap$$vertxNext;
    var lib$es6$promise$asap$$customSchedulerFn;
    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
        lib$es6$promise$asap$$len += 2;
        if (lib$es6$promise$asap$$len === 2) {
            if (lib$es6$promise$asap$$customSchedulerFn) {
                lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
            } else {
                lib$es6$promise$asap$$scheduleFlush();
            }
        }
    };
    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
        lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
    }
    function lib$es6$promise$asap$$setAsap(asapFn) {
        lib$es6$promise$asap$$asap = asapFn;
    }
    var lib$es6$promise$asap$$browserWindow = typeof window !== 'undefined' ? window : undefined;
    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
    function lib$es6$promise$asap$$useNextTick() {
        return function () {
            process.nextTick(lib$es6$promise$asap$$flush);
        };
    }
    function lib$es6$promise$asap$$useVertxTimer() {
        return function () {
            lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
        };
    }
    function lib$es6$promise$asap$$useMutationObserver() {
        var iterations = 0;
        var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
        var node = document.createTextNode('');
        observer.observe(node, { characterData: true });
        return function () {
            node.data = iterations = ++iterations % 2;
        };
    }
    function lib$es6$promise$asap$$useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = lib$es6$promise$asap$$flush;
        return function () {
            channel.port2.postMessage(0);
        };
    }
    function lib$es6$promise$asap$$useSetTimeout() {
        return function () {
            setTimeout(lib$es6$promise$asap$$flush, 1);
        };
    }
    var lib$es6$promise$asap$$queue = new Array(1000);
    function lib$es6$promise$asap$$flush() {
        for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
            var callback = lib$es6$promise$asap$$queue[i];
            var arg = lib$es6$promise$asap$$queue[i + 1];
            callback(arg);
            lib$es6$promise$asap$$queue[i] = undefined;
            lib$es6$promise$asap$$queue[i + 1] = undefined;
        }
        lib$es6$promise$asap$$len = 0;
    }
    function lib$es6$promise$asap$$attemptVertx() {
        try {
            var r = require;
            var vertx = r('vertx');
            lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return lib$es6$promise$asap$$useVertxTimer();
        } catch (e) {
            return lib$es6$promise$asap$$useSetTimeout();
        }
    }
    var lib$es6$promise$asap$$scheduleFlush;
    if (lib$es6$promise$asap$$isNode) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
    } else if (lib$es6$promise$asap$$isWorker) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
    } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === 'function') {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
    } else {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
    }
    function lib$es6$promise$$internal$$noop() {
    }
    var lib$es6$promise$$internal$$PENDING = void 0;
    var lib$es6$promise$$internal$$FULFILLED = 1;
    var lib$es6$promise$$internal$$REJECTED = 2;
    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
    function lib$es6$promise$$internal$$selfFulfillment() {
        return new TypeError('You cannot resolve a promise with itself');
    }
    function lib$es6$promise$$internal$$cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
    }
    function lib$es6$promise$$internal$$getThen(promise) {
        try {
            return promise.then;
        } catch (error) {
            lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
            return lib$es6$promise$$internal$$GET_THEN_ERROR;
        }
    }
    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
        try {
            then.call(value, fulfillmentHandler, rejectionHandler);
        } catch (e) {
            return e;
        }
    }
    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
        lib$es6$promise$asap$$asap(function (promise) {
            var sealed = false;
            var error = lib$es6$promise$$internal$$tryThen(then, thenable, function (value) {
                if (sealed) {
                    return;
                }
                sealed = true;
                if (thenable !== value) {
                    lib$es6$promise$$internal$$resolve(promise, value);
                } else {
                    lib$es6$promise$$internal$$fulfill(promise, value);
                }
            }, function (reason) {
                if (sealed) {
                    return;
                }
                sealed = true;
                lib$es6$promise$$internal$$reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));
            if (!sealed && error) {
                sealed = true;
                lib$es6$promise$$internal$$reject(promise, error);
            }
        }, promise);
    }
    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
        if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
            lib$es6$promise$$internal$$fulfill(promise, thenable._result);
        } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
            lib$es6$promise$$internal$$reject(promise, thenable._result);
        } else {
            lib$es6$promise$$internal$$subscribe(thenable, undefined, function (value) {
                lib$es6$promise$$internal$$resolve(promise, value);
            }, function (reason) {
                lib$es6$promise$$internal$$reject(promise, reason);
            });
        }
    }
    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
        if (maybeThenable.constructor === promise.constructor) {
            lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
        } else {
            var then = lib$es6$promise$$internal$$getThen(maybeThenable);
            if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
            } else if (then === undefined) {
                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
            } else if (lib$es6$promise$utils$$isFunction(then)) {
                lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
            } else {
                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
            }
        }
    }
    function lib$es6$promise$$internal$$resolve(promise, value) {
        if (promise === value) {
            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
        } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
            lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
        } else {
            lib$es6$promise$$internal$$fulfill(promise, value);
        }
    }
    function lib$es6$promise$$internal$$publishRejection(promise) {
        if (promise._onerror) {
            promise._onerror(promise._result);
        }
        lib$es6$promise$$internal$$publish(promise);
    }
    function lib$es6$promise$$internal$$fulfill(promise, value) {
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
            return;
        }
        promise._result = value;
        promise._state = lib$es6$promise$$internal$$FULFILLED;
        if (promise._subscribers.length !== 0) {
            lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
        }
    }
    function lib$es6$promise$$internal$$reject(promise, reason) {
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
            return;
        }
        promise._state = lib$es6$promise$$internal$$REJECTED;
        promise._result = reason;
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
    }
    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
        var subscribers = parent._subscribers;
        var length = subscribers.length;
        parent._onerror = null;
        subscribers[length] = child;
        subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
        subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;
        if (length === 0 && parent._state) {
            lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
        }
    }
    function lib$es6$promise$$internal$$publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;
        if (subscribers.length === 0) {
            return;
        }
        var child, callback, detail = promise._result;
        for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];
            if (child) {
                lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
            } else {
                callback(detail);
            }
        }
        promise._subscribers.length = 0;
    }
    function lib$es6$promise$$internal$$ErrorObject() {
        this.error = null;
    }
    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
        try {
            return callback(detail);
        } catch (e) {
            lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
            return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
        }
    }
    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
        var hasCallback = lib$es6$promise$utils$$isFunction(callback), value, error, succeeded, failed;
        if (hasCallback) {
            value = lib$es6$promise$$internal$$tryCatch(callback, detail);
            if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
                failed = true;
                error = value.error;
                value = null;
            } else {
                succeeded = true;
            }
            if (promise === value) {
                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
                return;
            }
        } else {
            value = detail;
            succeeded = true;
        }
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
        } else if (hasCallback && succeeded) {
            lib$es6$promise$$internal$$resolve(promise, value);
        } else if (failed) {
            lib$es6$promise$$internal$$reject(promise, error);
        } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
            lib$es6$promise$$internal$$fulfill(promise, value);
        } else if (settled === lib$es6$promise$$internal$$REJECTED) {
            lib$es6$promise$$internal$$reject(promise, value);
        }
    }
    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
        try {
            resolver(function resolvePromise(value) {
                lib$es6$promise$$internal$$resolve(promise, value);
            }, function rejectPromise(reason) {
                lib$es6$promise$$internal$$reject(promise, reason);
            });
        } catch (e) {
            lib$es6$promise$$internal$$reject(promise, e);
        }
    }
    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
        var enumerator = this;
        enumerator._instanceConstructor = Constructor;
        enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
        if (enumerator._validateInput(input)) {
            enumerator._input = input;
            enumerator.length = input.length;
            enumerator._remaining = input.length;
            enumerator._init();
            if (enumerator.length === 0) {
                lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
            } else {
                enumerator.length = enumerator.length || 0;
                enumerator._enumerate();
                if (enumerator._remaining === 0) {
                    lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
                }
            }
        } else {
            lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
        }
    }
    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function (input) {
        return lib$es6$promise$utils$$isArray(input);
    };
    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function () {
        return new Error('Array Methods must be provided an Array');
    };
    lib$es6$promise$enumerator$$Enumerator.prototype._init = function () {
        this._result = new Array(this.length);
    };
    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function () {
        var enumerator = this;
        var length = enumerator.length;
        var promise = enumerator.promise;
        var input = enumerator._input;
        for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
            enumerator._eachEntry(input[i], i);
        }
    };
    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) {
        var enumerator = this;
        var c = enumerator._instanceConstructor;
        if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
            if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
                entry._onerror = null;
                enumerator._settledAt(entry._state, i, entry._result);
            } else {
                enumerator._willSettleAt(c.resolve(entry), i);
            }
        } else {
            enumerator._remaining--;
            enumerator._result[i] = entry;
        }
    };
    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) {
        var enumerator = this;
        var promise = enumerator.promise;
        if (promise._state === lib$es6$promise$$internal$$PENDING) {
            enumerator._remaining--;
            if (state === lib$es6$promise$$internal$$REJECTED) {
                lib$es6$promise$$internal$$reject(promise, value);
            } else {
                enumerator._result[i] = value;
            }
        }
        if (enumerator._remaining === 0) {
            lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
        }
    };
    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) {
        var enumerator = this;
        lib$es6$promise$$internal$$subscribe(promise, undefined, function (value) {
            enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
        }, function (reason) {
            enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
        });
    };
    function lib$es6$promise$promise$all$$all(entries) {
        return new lib$es6$promise$enumerator$$default(this, entries).promise;
    }
    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
    function lib$es6$promise$promise$race$$race(entries) {
        var Constructor = this;
        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        if (!lib$es6$promise$utils$$isArray(entries)) {
            lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
            return promise;
        }
        var length = entries.length;
        function onFulfillment(value) {
            lib$es6$promise$$internal$$resolve(promise, value);
        }
        function onRejection(reason) {
            lib$es6$promise$$internal$$reject(promise, reason);
        }
        for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
            lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
        }
        return promise;
    }
    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
    function lib$es6$promise$promise$resolve$$resolve(object) {
        var Constructor = this;
        if (object && typeof object === 'object' && object.constructor === Constructor) {
            return object;
        }
        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        lib$es6$promise$$internal$$resolve(promise, object);
        return promise;
    }
    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
    function lib$es6$promise$promise$reject$$reject(reason) {
        var Constructor = this;
        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        lib$es6$promise$$internal$$reject(promise, reason);
        return promise;
    }
    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
    var lib$es6$promise$promise$$counter = 0;
    function lib$es6$promise$promise$$needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }
    function lib$es6$promise$promise$$needsNew() {
        throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
    }
    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
    function lib$es6$promise$promise$$Promise(resolver) {
        this._id = lib$es6$promise$promise$$counter++;
        this._state = undefined;
        this._result = undefined;
        this._subscribers = [];
        if (lib$es6$promise$$internal$$noop !== resolver) {
            if (!lib$es6$promise$utils$$isFunction(resolver)) {
                lib$es6$promise$promise$$needsResolver();
            }
            if (!(this instanceof lib$es6$promise$promise$$Promise)) {
                lib$es6$promise$promise$$needsNew();
            }
            lib$es6$promise$$internal$$initializePromise(this, resolver);
        }
    }
    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
    lib$es6$promise$promise$$Promise.prototype = {
        constructor: lib$es6$promise$promise$$Promise,
        then: function (onFulfillment, onRejection) {
            var parent = this;
            var state = parent._state;
            if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
                return this;
            }
            var child = new this.constructor(lib$es6$promise$$internal$$noop);
            var result = parent._result;
            if (state) {
                var callback = arguments[state - 1];
                lib$es6$promise$asap$$asap(function () {
                    lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
                });
            } else {
                lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
            }
            return child;
        },
        'catch': function (onRejection) {
            return this.then(null, onRejection);
        }
    };
    function lib$es6$promise$polyfill$$polyfill() {
        var local;
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
        if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
            return;
        }
        local.Promise = lib$es6$promise$promise$$default;
    }
    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
    var lib$es6$promise$umd$$ES6Promise = {
        'Promise': lib$es6$promise$promise$$default,
        'polyfill': lib$es6$promise$polyfill$$default
    };
    if (true) {
        promise = function () {
            return lib$es6$promise$umd$$ES6Promise;
        }();
    } else if (typeof module !== 'undefined' && module['exports']) {
        module['exports'] = lib$es6$promise$umd$$ES6Promise;
    } else if (typeof this !== 'undefined') {
        this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
    }
    lib$es6$promise$polyfill$$default();
}.call(this));
ProtocolsXHR = function (Logger, Helper, ES6Promise, require) {
    var XHR = {
        call: function (settings) {
            ES6Promise.polyfill();
            if (!settings.url) {
                throw new Error('missing parameter : url is not defined !');
            }
            if (!settings.method) {
                throw new Error('missing parameter : method is not defined !');
            }
            if (!settings.format) {
                settings.format = 'text';
            }
            var options = {};
            options.url = settings.url;
            options.data = settings.data ? settings.data : null;
            options.method = settings.method;
            options.timeOut = settings.timeOut || 0;
            options.scope = settings.scope || this;
            options.proxy = settings.proxy || null;
            options.content = settings.content || null;
            options.headers = settings.headers || { referer: 'http://localhost' };
            switch (settings.method) {
            case 'DELETE':
            case 'GET':
                break;
            case 'PUT':
            case 'POST':
                options.content = settings.content ? settings.content : 'application/x-www-form-urlencoded';
                options.headers = settings.headers ? settings.headers : { referer: 'http://localhost' };
                break;
            case 'HEAD':
            case 'OPTIONS':
                throw new Error('HTTP method not yet supported !');
            default:
                throw new Error('HTTP method unknown !');
            }
            switch (settings.format) {
            case 'text':
                this.__call(options).then(function (response) {
                    settings.onResponse.call(this, response);
                }).catch(function (error) {
                    settings.onFailure.call(this, error);
                });
                break;
            case 'json':
                this.__callJSON(options).then(function (response) {
                    settings.onResponse.call(this, response);
                }).catch(function (error) {
                    settings.onFailure.call(this, error);
                });
                break;
            case 'xml':
                this.__callXML(options).then(function (response) {
                    settings.onResponse.call(this, response);
                }).catch(function (error) {
                    settings.onFailure.call(this, error);
                });
                break;
            default:
                throw new Error('This output Format is not yet supported !');
            }
        },
        __call: function (options) {
            var promise = new Promise(function (resolve, reject) {
                var corps = options.method === 'POST' || options.method === 'PUT' ? true : false;
                if (options.data && Object.keys(options.data).length && !corps) {
                    options.url = Helper.normalyzeUrl(options.url, options.data);
                }
                var hXHR = null;
                if (typeof window === 'undefined') {
                    var req = request;
                    if (options.data && typeof options.data === 'string' && corps) {
                        options.body = options.data;
                    }
                    req(options, function (error, response, body) {
                        if (!error && response.statusCode == 200 && body) {
                            resolve(body);
                        } else {
                            reject('Errors Occured on Http Request (nodejs) : ' + body);
                        }
                    });
                } else {
                    if (window.XMLHttpRequest) {
                        hXHR = new XMLHttpRequest();
                        hXHR.open(options.method, options.url, true);
                        hXHR.overrideMimeType = options.content;
                        var onTimeOutTrigger = null;
                        if (options.timeOut > 0) {
                            onTimeOutTrigger = window.setTimeout(function () {
                                var message = 'TimeOut Occured on Http Request with XMLHttpRequest !';
                                reject({
                                    message: message,
                                    status: -1
                                });
                            }, options.timeOut);
                        }
                        if (corps) {
                            hXHR.setRequestHeader('Content-type', options.content);
                        }
                        hXHR.onerror = function (e) {
                            console.log(e);
                            reject(new Error('Errors Occured on Http Request with XMLHttpRequest !'));
                        };
                        hXHR.ontimeout = function () {
                            reject(new Error('TimeOut Occured on Http Request with XMLHttpRequest !'));
                        };
                        hXHR.onreadystatechange = function () {
                            if (hXHR.readyState == 4) {
                                if (hXHR.status == 200) {
                                    window.clearTimeout(onTimeOutTrigger);
                                    resolve(hXHR.response);
                                } else {
                                    var message = 'Errors Occured on Http Request (status : \'' + hXHR.status + '\' | response : \'' + hXHR.response + '\')';
                                    var status = hXHR.status;
                                    reject({
                                        message: message,
                                        status: status
                                    });
                                }
                            }
                        };
                        var data4xhr = options.data && corps ? options.data : null;
                        hXHR.send(data4xhr);
                    } else if (window.XDomainRequest) {
                        hXHR = new XDomainRequest();
                        hXHR.open(options.method, options.url);
                        hXHR.overrideMimeType = options.content;
                        if (options.timeOut > 0) {
                            hXHR.timeout = options.timeout;
                        }
                        if (corps) {
                            hXHR.setRequestHeader('Content-type', options.content);
                        }
                        hXHR.onerror = function () {
                            reject(new Error('Errors Occured on Http Request with XMLHttpRequest !'));
                        };
                        hXHR.ontimeout = function () {
                            reject(new Error('TimeOut Occured on Http Request with XMLHttpRequest !'));
                        };
                        hXHR.onload = function () {
                            if (hXHR.status == 200) {
                                resolve(hXHR.responseText);
                            } else {
                                var message = 'Errors Occured on Http Request (status : \'' + hXHR.status + '\' | response : \'' + hXHR.responseText + '\')';
                                var status = hXHR.status;
                                reject({
                                    message: message,
                                    status: status
                                });
                            }
                        };
                        var data4xdr = options.data && corps ? options.data : null;
                        hXHR.send(data4xdr);
                    } else {
                        throw new Error('CORS not supported');
                    }
                }
            });
            return promise;
        },
        __callJSON: function (options) {
            return this.__call(options).then(JSON.parse).catch(function (error) {
                console.log('_callJSON failed on : ', options.url, error);
                throw error;
            });
        },
        __callXML: function (options) {
            return this.__call(options).then(function (response) {
                var xmlDoc;
                if (typeof window === 'undefined') {
                    var DOMParser = xmldom.DOMParser;
                    xmlDoc = new DOMParser().parseFromString(response, 'text/xml');
                } else {
                    if (window.DOMParser) {
                        var parser = new window.DOMParser();
                        xmlDoc = parser.parseFromString(response, 'text/xml');
                    } else {
                        xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
                        xmlDoc.async = false;
                        xmlDoc.loadXML(response);
                    }
                }
                return xmlDoc;
            }).catch(function (error) {
                console.log('__callXML failed on : ', options.url, error);
                throw error;
            });
        }
    };
    return XHR;
}(UtilsLoggerByDefault, UtilsHelper, promise, {});
UtilsMessagesResources = function () {
    var MessagesResources = {
        PARAM_MISSING: 'Parameter(s) \'%var%\' missing',
        PARAM_EMPTY: 'Parameter(s) \'%var%\' empty',
        PARAM_TYPE: 'Wrong type(s) for parameter(s) \'%var%\'',
        PARAM_FORMAT: 'Parameter(s) \'%var%\' not correctly formatted',
        PARAM_NOT_SUPPORT: 'Value(s) for parameter(s) \'%var%\' not supported',
        PARAM_UNKNOWN: 'Value(s) for parameter(s) \'%var%\' unknown',
        SERVICE_REQUEST_BUILD: 'An error occurred during the request building of the service',
        SERVICE_REQUEST_EMPTY: 'The request sent to the service is empty',
        SERVICE_RESPONSE_EXCEPTION: 'The service returned an exception : \'%var%\'',
        SERVICE_RESPONSE_EXCEPTION_2: 'The service returned an exception',
        SERVICE_RESPONSE_ANALYSE: 'An error occurred while parsing the response \'%var%\' of the service',
        SERVICE_RESPONSE_ANALYSE_2: 'An unknown error occurred while parsing the response',
        SERVICE_RESPONSE_EMPTY: 'The response of the service is empty',
        SERVICE_RESPONSE_EMPTY_2: 'The response from the service could not be analyzed or is empty',
        SERVICE_RESPONSE_FORMAT: 'The format of the service response is not supported (handled format(s) : \'%var%\')',
        SERVICE_RESPONSE_FORMAT_2: 'The format of the service response is not supported',
        SERVICE_RESPONSE_FORMAT_3: 'No suggestion matching the search',
        CLASS_CONSTRUCTOR: '\'%var%\' constructor cannot be called as a function.',
        getMessage: function (clef, parametres) {
            if (!arguments) {
                return 'Message indefined !';
            }
            var params = Array.prototype.slice.call(arguments);
            var key = params.shift();
            var args = params;
            var message = this[key];
            try {
                if (Array.isArray(args) && args.length > 0) {
                    message = message.replace('%var%', args.join(' - '));
                } else {
                    message = message.replace('%var%', '%var% (not specified)');
                }
            } catch (e) {
            }
            return message;
        }
    };
    return MessagesResources;
}();
ExceptionsErrorService = function () {
    function ErrorService(error) {
        if (!(this instanceof ErrorService)) {
            throw new TypeError('ErrorService constructor cannot be called as a function.');
        }
        var e = error;
        if (typeof error === 'string' || error instanceof String) {
            this.message = error;
            this.status = -1;
            this.type = ErrorService.TYPE_UNKERR;
        } else {
            this.message = e.message || 'undefined!?';
            this.type = e.type;
            this.status = e.status || -1;
        }
        this.name = 'ErrorService';
        this.stack = new Error().stack;
    }
    ErrorService.TYPE_SRVERR = 'SERVICE_ERROR';
    ErrorService.TYPE_USEERR = 'USAGE_ERROR';
    ErrorService.TYPE_UNKERR = 'UNKNOWN_ERROR';
    ErrorService.prototype = Object.create(Error.prototype, {
        constructor: {
            value: ErrorService,
            writable: true,
            configurable: true
        }
    });
    return ErrorService;
}();
ProtocolsJSONP = function (Logger) {
    var JSONP = {
        uuid: function () {
            var id = Math.floor(Date.now());
            return function () {
                return id++;
            };
        }(),
        call: function (options) {
            if (!options) {
                throw new Error('missing parameter : options !');
            }
            if (!options.url) {
                throw new Error('missing parameter : options.url !');
            }
            if (!options.timeOut) {
                options.timeOut = 0;
            }
            if (!options.onResponse) {
                throw new Error('missing parameter : options.onResponse !');
            }
            var callbackId = typeof options.callbackSuffix === 'string' ? options.callbackSuffix : this.uuid();
            var urlHasCallbackKey = false;
            var urlHasCallbackName = false;
            var idx = options.url.indexOf('callback=');
            if (idx != -1) {
                urlHasCallbackKey = true;
                var j = options.url.indexOf('&', idx);
                if (j === -1) {
                    j = options.url.length;
                }
                var callbackName = options.url.substring(idx + 9, j);
                if (callbackName) {
                    urlHasCallbackName = true;
                    options.callbackName = callbackName;
                }
            }
            if (!urlHasCallbackKey) {
                var k = options.url.indexOf('?');
                if (k === -1) {
                    options.url = options.url + '?' + 'callback=';
                } else if (k === options.url.length) {
                    options.url = options.url + 'callback=';
                } else {
                    options.url = options.url + '&' + 'callback=';
                }
            }
            var HasCallbackName = options.callbackName ? true : urlHasCallbackName;
            if (!urlHasCallbackName) {
                if (!options.callbackName) {
                    options.callbackName = 'callback';
                    if (callbackId || callbackId === '') {
                        options.callbackName += callbackId;
                    }
                }
                options.url = options.url.replace('callback=', 'callback=' + options.callbackName);
            }
            if (!options.onTimeOut) {
                options.onTimeOut = function () {
                    console.log('TimeOut while invoking url : ' + options.url);
                };
            }
            if (!HasCallbackName) {
                var self = this;
                var onTimeOutTrigger = null;
                if (options.timeOut > 0) {
                    onTimeOutTrigger = window.setTimeout(function () {
                        window[options.callbackName] = function () {
                        };
                        options.onTimeOut();
                        self._deleteScript(callbackId);
                    }, options.timeOut);
                }
                window[options.callbackName] = function (data) {
                    window.clearTimeout(onTimeOutTrigger);
                    options.onResponse(data);
                    self._deleteScript(callbackId);
                };
            }
            this._createScript(callbackId, options.url);
        },
        _createScript: function (callbackId, url) {
            var scriptu;
            var scripto = document.getElementById('results' + callbackId);
            scriptu = document.createElement('script');
            scriptu.setAttribute('type', 'text/javascript');
            scriptu.setAttribute('src', url);
            scriptu.setAttribute('charset', 'UTF-8');
            scriptu.setAttribute('id', 'results' + callbackId);
            scriptu.setAttribute('async', 'true');
            var node = document.documentElement || document.getElementsByTagName('head')[0];
            if (scripto === null) {
                node.appendChild(scriptu);
            } else {
                node.replaceChild(scriptu, scripto);
            }
        },
        _deleteScript: function (callbackId) {
            var script = document.getElementById('results' + callbackId);
            if (script) {
                var node = script.parentNode || document.documentElement;
                if (!node) {
                    return;
                }
                node.removeChild(script);
            }
        }
    };
    return JSONP;
}(UtilsLoggerByDefault);
ProtocolsProtocol = function (Helper, XHR, JSONP) {
    var Protocol = {
        send: function (options) {
            var settings = options || {
                method: 'GET',
                protocol: 'JSONP',
                timeOut: 0,
                format: null,
                wrap: true,
                nocache: true,
                output: 'json',
                callback: null,
                callbackSuffix: null
            };
            if (options.protocol === 'XHR' || options.format === 'json') {
                settings.wrap = false;
            } else if (options.protocol === 'JSONP' && options.format === 'xml') {
                settings.wrap = true;
            }
            settings.callback = options.protocol == 'JSONP' ? null : null;
            settings.output = settings.wrap ? 'json' : null;
            if (settings.wrap) {
                var params = {};
                params.output = settings.output;
                params.callback = settings.callback;
                delete params.callback;
                settings.url = Helper.normalyzeUrl(options.url, params);
            }
            switch (settings.protocol) {
            case 'XHR':
                if (options.method === 'GET' && options.nocache) {
                    settings.url = Helper.normalyzeUrl(settings.url, { t: new Date().getTime() });
                }
                XHR.call(settings);
                break;
            case 'JSONP':
                if (settings.data) {
                    settings.url = Helper.normalyzeUrl(settings.url, settings.data);
                }
                JSONP.call(settings);
                break;
            default:
                throw new Error('protocol not supported (XHR|JSONP) !');
            }
        }
    };
    return Protocol;
}(UtilsHelper, ProtocolsXHR, ProtocolsJSONP);
ServicesDefaultUrlService = function () {
    var isBrowser = typeof window !== 'undefined' ? true : false;
    var protocol = isBrowser ? location && location.protocol && location.protocol.indexOf('https:') === 0 ? 'https://' : 'http://' : 'http://';
    var hostname = 'wxs.ign.fr';
    var keyname = '%KEY%';
    var url = protocol + hostname.concat('/', keyname);
    var fkey = function (key) {
        return this._key.replace(key ? keyname : null, key);
    };
    var DefaultUrlService = {
        Alti: {
            _key: {
                'elevation-json': url + '/alti/rest/elevation.json',
                'elevation-xml': url + '/alti/rest/elevation.xml',
                'profil-json': url + '/alti/rest/elevationLine.json',
                'profil-xml': url + '/alti/rest/elevationLine.xml',
                wps: url + '/alti/wps'
            },
            url: function (key) {
                return {
                    'elevation-json': this._key['elevation-json'].replace(key ? keyname : null, key),
                    'elevation-xml': this._key['elevation-xml'].replace(key ? keyname : null, key),
                    'profil-json': this._key['profil-json'].replace(key ? keyname : null, key),
                    'profil-xml': this._key['profil-xml'].replace(key ? keyname : null, key),
                    wps: this._key.wps.replace(key ? keyname : null, key)
                };
            }
        },
        ProcessIsoCurve: {
            _key: {
                'iso-json': url + '/isochrone/isochrone.json',
                'iso-xml': url + '/isochrone/isochrone.xml'
            },
            url: function (key) {
                return {
                    'iso-json': this._key['iso-json'].replace(key ? keyname : null, key),
                    'iso-xml': this._key['iso-xml'].replace(key ? keyname : null, key)
                };
            }
        },
        AutoComplete: {
            _key: url + '/ols/apis/completion',
            url: fkey
        },
        ReverseGeocode: {
            _key: url + '/geoportail/ols',
            url: fkey
        },
        AutoConf: {
            _key: {
                apiKey: url + '/autoconf',
                apiKeys: url + '/autoconf?keys=%KEYS%'
            },
            url: function (key) {
                var keys = '';
                if (Array.isArray(key) && key.length > 0) {
                    keys = key[0];
                    for (var i = 1; i < key.length; i++) {
                        keys += ',' + key[i];
                    }
                }
                return {
                    apiKey: this._key['apiKey'].replace(key ? keyname : null, key),
                    apiKeys: this._key['apiKeys'].replace(keyname, key[0]).replace('%KEYS%', keys),
                    aggregate: protocol + hostname.concat('/') + key + '/autoconf/id/'
                };
            }
        },
        Geocode: {
            _key: url + '/geoportail/ols',
            url: fkey
        },
        Route: {
            _key: {
                ols: url + '/itineraire/ols',
                'route-json': url + '/itineraire/rest/route.json',
                'route-xml': url + '/itineraire/rest/route.xml'
            },
            url: function (key) {
                return {
                    ols: this._key.ols.replace(key ? keyname : null, key),
                    'route-json': this._key['route-json'].replace(key ? keyname : null, key),
                    'route-xml': this._key['route-xml'].replace(key ? keyname : null, key)
                };
            }
        }
    };
    return DefaultUrlService;
}();
ServicesCommonService = function (Logger, Helper, _, Protocol, ErrorService, DefaultUrlService) {
    function CommonService(options) {
        if (!(this instanceof CommonService)) {
            throw new TypeError(_.getMessage('CLASS_CONSTRUCTOR'));
        }
        this.options = {
            protocol: 'JSONP',
            proxyURL: '',
            callbackSuffix: null,
            httpMethod: 'GET',
            timeOut: 0,
            rawResponse: false,
            scope: this,
            onSuccess: function (response) {
                console.log('onSuccess - la reponse est la suivante : ', response);
            },
            onFailure: function (error) {
                if (error.status === 200 || !error.status) {
                    console.log('onFailure : ', error.message);
                } else {
                    console.log('onFailure - Erreur (', error.status, ') : ', error.message);
                }
            }
        };
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
        if (!this.options.apiKey && !this.options.serverUrl) {
            throw new Error(_.getMessage('PARAM_MISSING', 'apiKey', 'serverUrl'));
        }
        if (this.options.rawResponse && !this.options.onSuccess) {
            this.options.onSuccess = function (response) {
                console.log('onSuccess - la réponse brute du service est la suivante : ', response);
            };
        }
        var bOnSuccess = this.options.onSuccess !== null && typeof this.options.onSuccess === 'function' ? true : false;
        if (!bOnSuccess) {
            throw new Error(_.getMessage('PARAM_MISSING', 'onSuccess()'));
        }
        if (!this.options.serverUrl) {
            var urlByDefault = DefaultUrlService[this.CLASSNAME].url(this.options.apiKey);
            if (typeof urlByDefault === 'string') {
                this.options.serverUrl = urlByDefault;
            } else {
            }
        }
        this.options.httpMethod = typeof options.httpMethod === 'string' ? options.httpMethod.toUpperCase() : 'GET';
        switch (this.options.httpMethod) {
        case 'POST':
        case 'GET':
            break;
        case 'PUT':
        case 'DELETE':
        case 'HEAD':
        case 'OPTIONS':
            throw new Error(_.getMessage('PARAM_NOT_SUPPORT', 'httpMethod'));
        default:
            throw new Error(_.getMessage('PARAM_UNKNOWN', 'httpMethod'));
        }
        this.options.protocol = typeof options.protocol === 'string' ? options.protocol.toUpperCase() : 'JSONP';
        switch (this.options.protocol) {
        case 'JSONP':
        case 'XHR':
            break;
        default:
            throw new Error(_.getMessage('PARAM_UNKNOWN', 'protocol'));
        }
        if (this.options.protocol === 'JSONP') {
            this.options.httpMethod = 'GET';
        }
        this.options.nocache = options.nocache || false;
        this.options.outputFormat = null;
        this.request = null;
        this.response = null;
    }
    CommonService.prototype = {
        constructor: CommonService,
        call: function () {
            function run() {
                this.buildRequest.call(this, onError, onBuildRequest);
            }
            run.call(this);
            function onBuildRequest(result) {
                this.callService.call(this, onError, onCallService);
            }
            function onCallService(result) {
                this.analyzeResponse.call(this, onError, onAnalyzeResponse);
            }
            function onAnalyzeResponse(result) {
                if (result) {
                    this.options.onSuccess.call(this, result);
                } else {
                    return onError.call(this, new ErrorService('Analyse de la reponse en échec !?'));
                }
            }
            function onError(error) {
                var e = error;
                if (!(e instanceof ErrorService)) {
                    e = new ErrorService(error.message);
                }
                this.options.onFailure.call(this, e);
            }
        },
        buildRequest: function (error, success) {
        },
        callService: function (error, success) {
            var strUrlProxified = null;
            var strData = this.request;
            var bUrlProxified = this.options.proxyURL && this.options.protocol === 'XHR' ? true : false;
            this.options.serverUrl = Helper.normalyzeUrl(this.options.serverUrl, { 'gp-access-lib': '1.0.0-beta3' }, false);
            if (bUrlProxified) {
                if (this.options.httpMethod === 'GET') {
                    strUrlProxified = this.options.proxyURL + Helper.normalyzeUrl(this.options.serverUrl, this.request, true);
                    strData = null;
                }
                if (this.options.httpMethod === 'POST') {
                    strUrlProxified = this.options.proxyURL + Helper.normalyzeUrl(this.options.serverUrl, null, true);
                    strData = this.request;
                }
            }
            var self = this;
            var options = {
                url: strUrlProxified || this.options.serverUrl,
                method: this.options.httpMethod,
                protocol: this.options.protocol,
                timeOut: this.options.timeOut || 0,
                format: this.options.outputFormat,
                nocache: this.options.nocache || false,
                wrap: this.options.protocol === 'XHR' ? false : true,
                callbackSuffix: this.options.callbackSuffix,
                data: strData,
                headers: null,
                content: this.options.contentType || 'application/xml',
                scope: this.options.scope || this,
                onResponse: function (response) {
                    var content = null;
                    if (self.options.protocol == 'XHR') {
                        content = response;
                    }
                    if (self.options.protocol == 'JSONP') {
                        if (response) {
                            if (response.http) {
                                if (response.http.status !== 200) {
                                    error.call(self, new ErrorService({
                                        status: response.http.status,
                                        message: response.http.error,
                                        type: ErrorService.TYPE_SRVERR
                                    }));
                                    return;
                                } else {
                                    content = response.xml;
                                    if (self.options.rawResponse) {
                                        content = response;
                                    }
                                }
                            } else {
                                content = response;
                            }
                        } else {
                            error.call(self, new ErrorService('Le contenu de la reponse est vide !?'));
                            return;
                        }
                    }
                    self.response = content;
                    success.call(self, content);
                },
                onFailure: function (e) {
                    e.type = ErrorService.TYPE_SRVERR;
                    error.call(self, new ErrorService(e));
                },
                onTimeOut: function () {
                    error.call(self, new ErrorService('TimeOut!'));
                }
            };
            Protocol.send(options);
        },
        analyzeResponse: function (error, success) {
        }
    };
    return CommonService;
}(UtilsLoggerByDefault, UtilsHelper, UtilsMessagesResources, ProtocolsProtocol, ExceptionsErrorService, ServicesDefaultUrlService);
ServicesAltiRequestModelAltiRequest = function (Logger) {
    function AltiRequest(options) {
        if (!(this instanceof AltiRequest)) {
            throw new TypeError('AltiRequest constructor cannot be called as a function.');
        }
        this.options = options || {};
        this.positions = this.options.positions || [];
        this.delimiter = this.options.delimiter || '|';
        this.indent = this.options.indent || false;
        this.crs = this.options.crs || 'CRS:84';
        this.format = this.options.format || 'json';
    }
    AltiRequest.CLASSNAME = 'AltiRequest';
    AltiRequest.prototype = {
        constructor: AltiRequest,
        setPositions: function (lstPosition) {
            var positions = [];
            for (var i = 0; i < lstPosition.length; i++) {
                var o = lstPosition[i];
                if (o.lon && o.lat) {
                    positions.push(o);
                }
            }
            this.positions = positions;
        },
        getPositions: function (pos) {
            if (!pos) {
                return this.positions;
            }
            var index = this.positions.length - 1;
            if (pos > index || pos < index) {
                return this.positions;
            }
            return this.positions[pos];
        },
        addPositions: function (lstPosition) {
            for (var i = 0; i < lstPosition.length; i++) {
                var o = lstPosition[i];
                if (o.lon && o.lat) {
                    this.positions.push(lstPosition[i]);
                }
            }
        },
        getLon: function () {
            var lstLon = [];
            for (var i = 0; i < this.positions.length; i++) {
                lstLon.push(this.positions[i].lon);
            }
            return lstLon.join(this.delimiter);
        },
        getLat: function () {
            var lstLat = [];
            for (var i = 0; i < this.positions.length; i++) {
                lstLat.push(this.positions[i].lat);
            }
            return lstLat.join(this.delimiter);
        }
    };
    AltiRequest.prototype.getData = function () {
        var map = [];
        map.push({
            k: 'lon',
            v: this.getLon()
        });
        map.push({
            k: 'lat',
            v: this.getLat()
        });
        map.push({
            k: 'delimiter',
            v: this.delimiter
        });
        map.push({
            k: 'indent',
            v: this.indent
        });
        map.push({
            k: 'crs',
            v: this.crs
        });
        map.push({
            k: 'format',
            v: this.format
        });
        return map;
    };
    return AltiRequest;
}(UtilsLoggerByDefault);
ServicesAltiRequestModelAltiElevationRequest = function (Logger, AltiRequest) {
    function AltiElevationRequest(options) {
        if (!(this instanceof AltiElevationRequest)) {
            throw new TypeError('AltiElevationRequest constructor cannot be called as a function.');
        }
        this.CLASSNAME = 'AltiElevationRequest';
        AltiRequest.apply(this, arguments);
        this.zonly = this.options.zonly || false;
    }
    AltiElevationRequest.prototype = Object.create(AltiRequest.prototype, {
        zonly: {
            get: function () {
                return this._zonly;
            },
            set: function (z) {
                this._zonly = z;
            }
        }
    });
    AltiElevationRequest.prototype.constructor = AltiElevationRequest;
    AltiElevationRequest.prototype.getData = function () {
        var map = [];
        map.push({
            k: 'lon',
            v: this.getLon()
        });
        map.push({
            k: 'lat',
            v: this.getLat()
        });
        map.push({
            k: 'indent',
            v: this.indent
        });
        map.push({
            k: 'crs',
            v: this.crs
        });
        map.push({
            k: 'zonly',
            v: this.zonly
        });
        map.push({
            k: 'format',
            v: this.format
        });
        return map;
    };
    return AltiElevationRequest;
}(UtilsLoggerByDefault, ServicesAltiRequestModelAltiRequest);
ServicesAltiRequestModelAltiProfilRequest = function (Logger, AltiRequest) {
    function AltiProfilRequest(options) {
        if (!(this instanceof AltiProfilRequest)) {
            throw new TypeError('AltiProfilRequest constructor cannot be called as a function.');
        }
        this.CLASSNAME = 'AltiProfilRequest';
        AltiRequest.apply(this, arguments);
        this.sampling = this.options.sampling || 3;
    }
    AltiProfilRequest.prototype = Object.create(AltiRequest.prototype, {
        sampling: {
            get: function () {
                return this._sampling;
            },
            set: function (value) {
                this._sampling = value;
            }
        }
    });
    AltiProfilRequest.prototype.constructor = AltiProfilRequest;
    AltiProfilRequest.prototype.getData = function () {
        var map = [];
        map.push({
            k: 'lon',
            v: this.getLon()
        });
        map.push({
            k: 'lat',
            v: this.getLat()
        });
        map.push({
            k: 'indent',
            v: this.indent
        });
        map.push({
            k: 'crs',
            v: this.crs
        });
        map.push({
            k: 'sampling',
            v: this.sampling
        });
        map.push({
            k: 'format',
            v: this.format
        });
        return map;
    };
    return AltiProfilRequest;
}(UtilsLoggerByDefault, ServicesAltiRequestModelAltiRequest);
ServicesAltiRequestAltiRequestREST = function (Logger, _, AltiElevationRequest, AltiProfilRequest) {
    function AltiRequestREST(options) {
        if (!(this instanceof AltiRequestREST)) {
            throw new TypeError('AltiRequestREST constructor cannot be called as a function.');
        }
        this.options = options || {};
        if (!this.options) {
            throw new Error(_.getMessage('PARAM_EMPTY', 'options'));
        }
        if (!this.options.type) {
            throw new Error(_.getMessage('PARAM_EMPTY', 'type (Elevation or Profil)'));
        }
        this.DataObject = null;
        switch (this.options.type) {
        case 'Elevation':
            this.DataObject = new AltiElevationRequest(this.options.param);
            break;
        case 'Profil':
            this.DataObject = new AltiProfilRequest(this.options.param);
            break;
        default:
            throw new Error(_.getMessage('PARAM_TYPE', 'type (Elevation or Profil)'));
        }
        this.method = this.options.method || 'GET';
    }
    AltiRequestREST.prototype = {
        requestString: null,
        constructor: AltiRequestREST,
        template: {
            get: {
                value: 'lon=__LON__&lat=__LAT__&indent=__INDENT__&crs=\'__CRS__\'',
                input: {
                    point: '&zonly=__ZONLY__',
                    profil: '&sampling=__SAMPLING__'
                }
            },
            post: {
                value: 'lon=__LON__\n' + 'lat=__LAT__\n' + 'indent=__INDENT__\n' + 'crs=\'__CRS__\'\n',
                input: {
                    point: 'zonly=__ZONLY__',
                    profil: 'sampling=__SAMPLING__'
                }
            }
        },
        processRequestString: function () {
            var template = '';
            if (this.method == 'POST') {
                template = this.template.post.value;
            } else if (this.method == 'GET') {
                template = this.template.get.value;
            }
            template = template.replace(/__LON__/g, this.DataObject.getLon());
            template = template.replace(/__LAT__/g, this.DataObject.getLat());
            template = template.replace(/__INDENT__/g, this.DataObject.indent);
            template = template.replace(/__CRS__/g, this.DataObject.crs);
            template = template + this.__addDataInputs();
            this.requestString = template;
            return this.requestString;
        },
        __addDataInputs: function () {
            var myTemplate;
            if (this.method == 'POST') {
                myTemplate = this.template.post;
            } else if (this.method == 'GET') {
                myTemplate = this.template.get;
            } else {
                throw new Error('No other HTTP method supported by the service !');
            }
            var tmpl = null;
            if (this.DataObject.CLASSNAME == 'AltiElevationRequest') {
                tmpl = myTemplate.input.point;
                return tmpl.replace(/__ZONLY__/g, this.DataObject.zonly);
            } else if (this.DataObject.CLASSNAME == 'AltiProfilRequest') {
                tmpl = myTemplate.input.profil;
                return tmpl.replace(/__SAMPLING__/g, this.DataObject.sampling);
            } else {
                throw new Error('No other object supported than elevation or profil !?');
            }
        }
    };
    return AltiRequestREST;
}(UtilsLoggerByDefault, UtilsMessagesResources, ServicesAltiRequestModelAltiElevationRequest, ServicesAltiRequestModelAltiProfilRequest);
FormatsWPS = function (Logger) {
    function WPS(options) {
        if (!(this instanceof WPS)) {
            throw new TypeError('WPS constructor cannot be called as a function.');
        }
        this.options = options || {};
        this.DataObject = this.options.data;
        if (!this.DataObject) {
            throw new TypeError('This data object is not defined !');
        }
        this.paramservice = this.options.param.service || 'WPS';
        this.paramversion = this.options.param.version || '1.0.0';
        this.paramidentifier = this.options.param.identifier || 'gs:WPS';
        this.paramrawdataoutput = this.options.param.rawdataoutput || 'result';
        this.paramrequest = this.options.param.request || 'Execute';
        this.method = this.options.method || 'GET';
    }
    WPS.prototype = {
        requestString: null,
        constructor: WPS,
        template: {
            get: {
                value: 'service=__SERVICE__' + '&version=__VERSION__' + '&rawdataoutput=__RAWDATAOUTPUT__' + '&identifier=__IDENTIFIER__' + '&request=__REQUEST__' + '&datainputs=<!-- __DATAINPUTS__ -->',
                input: '__KEY__=__DATA__'
            },
            post: {
                value: '<?xml version="1.0" encoding="UTF-8"?>' + '<wps:__REQUEST__ version="__VERSION__" service="__SERVICE__" ' + '__NAMESPACE__ __SCHEMALOCATION__>' + '<ows:Identifier>__IDENTIFIER__</ows:Identifier>' + '<wps:DataInputs>' + '<!-- __DATAINPUTS__ -->' + '</wps:DataInputs>' + '<wps:ResponseForm>' + '<wps:RawDataOutput>' + '<ows:Identifier>__RAWDATAOUTPUT__</ows:Identifier>' + '</wps:RawDataOutput>' + '</wps:ResponseForm>' + '</wps:__REQUEST__>',
                input: '<wps:Input>' + '<ows:Identifier>__KEY__</ows:Identifier>' + '<wps:Data>' + '<wps:LiteralData>__DATA__</wps:LiteralData>' + '</wps:Data>' + '</wps:Input>'
            }
        },
        namespaceByDefault: function () {
            var ns = [
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
                'xmlns="http://www.opengis.net/wps/1.0.0"',
                'xmlns:wfs="http://www.opengis.net/wfs"',
                'xmlns:wps="http://www.opengis.net/wps/1.0.0"',
                'xmlns:ows="http://www.opengis.net/ows/1.1"',
                'xmlns:gml="http://www.opengis.net/gml"',
                'xmlns:ogc="http://www.opengis.net/ogc"',
                'xmlns:wcs="http://www.opengis.net/wcs/1.1.1"',
                'xmlns:xlink="http://www.w3.org/1999/xlink"'
            ];
            return ns.join(' ');
        },
        schemaLocationByDefault: function () {
            return 'xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"';
        },
        processRequestString: function () {
            var template = '';
            if (this.method == 'POST') {
                template = this.template.post.value;
            } else if (this.method == 'GET') {
                template = this.template.get.value;
            } else {
                return false;
            }
            template = template.replace(/__SERVICE__/g, this.paramservice);
            template = template.replace(/__VERSION__/g, this.paramversion);
            template = template.replace(/__RAWDATAOUTPUT__/g, this.paramrawdataoutput);
            template = template.replace(/__IDENTIFIER__/g, this.paramidentifier);
            template = template.replace(/__REQUEST__/g, this.paramrequest);
            if (this.method == 'POST') {
                template = template.replace(/__NAMESPACE__/g, this.namespaceByDefault);
                template = template.replace(/__SCHEMALOCATION__/g, this.schemaLocationByDefault);
            }
            template = template.replace(/<!-- __DATAINPUTS__ -->/g, this.__addDataInputs());
            if (!template) {
                return false;
            }
            this.requestString = template;
            return true;
        },
        __addDataInputs: function () {
            var tmpl = this.method == 'GET' ? this.template.get.input : this.template.post.input;
            var sep = this.method == 'GET' ? ';' : '';
            var result = '';
            var that = this;
            var map = this.DataObject.getData();
            for (var i = 0; i < map.length; i++) {
                (function (j) {
                    if (sep) {
                        sep = j == map.length - 1 ? '' : ';';
                    }
                    result = result.concat(that.__addDataInput(tmpl, map[j].k, map[j].v), sep);
                }(i));
            }
            return result;
        },
        __addDataInput: function (tmpl, key, data) {
            var tmp = tmpl;
            tmp = tmp.replace(/__KEY__/g, key);
            tmp = tmp.replace(/__DATA__/g, data);
            return tmp;
        },
        setMethod: function (method) {
            if (method == 'GET' || method == 'POST') {
                this.method = method;
            } else {
            }
        },
        getMethod: function () {
            return this.method;
        }
    };
    return WPS;
}(UtilsLoggerByDefault);
ServicesAltiRequestAltiRequestWPS = function (Logger, _, WPS, AltiElevationRequest, AltiProfilRequest) {
    var AltiRequestWPS = {
        build: function (options) {
            if (!options) {
                throw new Error(_.getMessage('PARAM_EMPTY', 'options'));
            }
            if (!options.type) {
                throw new Error(_.getMessage('PARAM_EMPTY', 'type (Elevation or Profil)'));
            }
            var DataObject = null;
            switch (options.type) {
            case 'Elevation':
                options.wps.identifier = 'gs:WPSElevation';
                DataObject = new AltiElevationRequest(options.param);
                break;
            case 'Profil':
                options.wps.identifier = 'gs:WPSLineElevation';
                DataObject = new AltiProfilRequest(options.param);
                break;
            default:
                throw new Error(_.getMessage('PARAM_TYPE', 'type (Elevation or Profil)'));
            }
            var settings = {
                data: DataObject,
                method: options.method,
                param: options.wps
            };
            var rqstWPS = new WPS(settings);
            if (!rqstWPS.processRequestString()) {
                throw new Error('Enable to process request !');
            }
            return rqstWPS.requestString;
        }
    };
    return AltiRequestWPS;
}(UtilsLoggerByDefault, UtilsMessagesResources, FormatsWPS, ServicesAltiRequestModelAltiElevationRequest, ServicesAltiRequestModelAltiProfilRequest);
ServicesAltiRequestAltiRequestFactory = function (Logger, ErrorService, AltiRequestREST, AltiRequestWPS) {
    var AltiRequestFactory = {
        build: function (options) {
            var request = null;
            var settings = {
                type: options.sampling ? 'Profil' : 'Elevation',
                method: options.httpMethod,
                param: {
                    positions: null,
                    delimiter: null,
                    indent: null,
                    crs: null,
                    format: null,
                    sampling: null,
                    zonly: null
                }
            };
            settings.param.positions = options.positions;
            settings.param.format = options.outputFormat;
            settings.param.sampling = options.sampling;
            settings.param.zonly = options.zonly;
            var bOnError = options.onError !== null && typeof options.onError === 'function' ? true : false;
            var bOnSuccess = options.onSuccess !== null && typeof options.onSuccess === 'function' ? true : false;
            var message = null;
            switch (options.api) {
            case 'REST':
                var myReq = new AltiRequestREST(settings);
                if (!myReq.processRequestString()) {
                    message = 'Error in process request (rest) !';
                    if (bOnError) {
                        options.onError.call(options.scope, new ErrorService(message));
                        return;
                    }
                    throw new Error(message);
                }
                request = myReq.requestString;
                break;
            case 'WPS':
                settings.wps = {
                    service: null,
                    version: null,
                    identifier: null,
                    rawdataoutput: null,
                    request: null
                };
                request = AltiRequestWPS.build(settings);
                if (!request) {
                    message = 'Error in process request (wps) !';
                    if (bOnError) {
                        options.onError.call(options.scope, new ErrorService(message));
                        return;
                    }
                    throw new Error(message);
                }
                break;
            default:
                message = 'Type of API is not supported by service (REST or WPS) !';
                if (bOnError) {
                    options.onError.call(options.scope, new ErrorService(message));
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
    return AltiRequestFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, ServicesAltiRequestAltiRequestREST, ServicesAltiRequestAltiRequestWPS);
FormatsXML = function (Logger, require) {
    function XML(options) {
        if (!(this instanceof XML)) {
            throw new TypeError('XML constructor cannot be called as a function.');
        }
        this.xmlString = null;
        this.xmlDoc = null;
        this.reader = null;
        if (options) {
            if (options.xmlString && typeof options.xmlString === 'string') {
                this.xmlString = options.xmlString;
                this.xmlDoc = __getXMLDOC(options.xmlString);
            }
            if (options.reader) {
                this.setReader(options.reader);
            }
        }
    }
    XML.prototype = {
        constructor: XML,
        getXMLString: function () {
            return this.xmlString;
        },
        setXMLString: function (xmlString) {
            if (xmlString && typeof xmlString === 'string') {
                this.xmlString = xmlString;
                this.xmlDoc = __getXMLDOC(xmlString);
            }
        },
        getReader: function () {
            return this.reader;
        },
        setReader: function (reader) {
            if (reader && reader.read && typeof reader.read === 'function') {
                this.reader = reader;
            }
        },
        getXMLDoc: function () {
            return this.xmlDoc;
        },
        setXMLDoc: function (doc) {
            this.xmlDoc = doc;
        },
        parse: function () {
            if (!this.xmlDoc && this.xmlString) {
                this.xmlDoc = __getXMLDOC(this.xmlString);
            }
            if (this.xmlDoc) {
                var root = __getRootNode(this.xmlDoc);
                if (root) {
                    var parserOutput;
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
    function __getXMLDOC(xmlString) {
        if (typeof exports === 'object') {
            var DOMParser = xmldom.DOMParser;
            return new DOMParser().parseFromString(xmlString, 'text/xml');
        } else {
            var parser;
            var xmlDoc;
            var errorMsg = 'Erreur lors du parsing de la réponse du service : XML non conforme';
            if (window.ActiveXObject) {
                xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString);
                var parseError = xmlDoc.parseError;
                if (parseError.errorCode) {
                    if (parseError.line && parseError.linepos) {
                        errorMsg += '( ligne ' + parseError.line + ', colonne ' + parseError.linepos;
                    }
                    if (parseError.reason) {
                        errorMsg += ':  ' + parseError.reason + ')';
                    }
                    throw new Error(errorMsg);
                }
                return xmlDoc;
            } else if (window.DOMParser) {
                parser = new window.DOMParser();
                try {
                    xmlDoc = parser.parseFromString(xmlString, 'text/xml');
                } catch (e) {
                    if (e.message === 'SyntaxError') {
                        throw new Error(errorMsg);
                    } else {
                        throw new Error('Erreur lors du parsing de la réponse du service : ' + e.message);
                    }
                }
                if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                    var parsererror = xmlDoc.getElementsByTagName('parsererror');
                    for (var i = 0; i < parsererror.length; i++) {
                        var content = parsererror[i].innerHTML;
                        if (content.indexOf('Huge input lookup') == -1) {
                            errorMsg += '(' + content + ')';
                            throw new Error(errorMsg);
                        }
                    }
                } else if (!xmlDoc.documentElement) {
                    throw new Error(errorMsg);
                }
                return xmlDoc;
            } else {
                throw new Error('Incompatible DOM Parser pour ce navigateur !');
            }
        }
    }
    function __getRootNode(xmlDoc) {
        var root;
        if (xmlDoc.nodeType === 9) {
            root = xmlDoc.documentElement;
        } else if (xmlDoc.nodeType === 1) {
            root = xmlDoc;
        }
        return root;
    }
    function __readDefault(node) {
        var data = {};
        if (node.attributes.length > 0) {
            var dataAttributes = __getAttributes(node);
            data['attributes'] = dataAttributes;
        }
        if (node.hasChildNodes()) {
            var childData = {};
            var child;
            var children = node.childNodes;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (child.nodeType === 3) {
                    data['textContent'] = child.nodeValue;
                } else if (child.nodeType === 1) {
                    childData = __readDefault(child);
                    if (!data[child.nodeName]) {
                        data[child.nodeName] = childData;
                    } else {
                        if (!Array.isArray(data[child.nodeName])) {
                            var old = data[child.nodeName];
                            data[child.nodeName] = [];
                            data[child.nodeName].push(old);
                        }
                        data[child.nodeName].push(childData);
                    }
                }
            }
        }
        return data;
    }
    function __getAttributes(node) {
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
    return XML;
}(UtilsLoggerByDefault, {});
ServicesAltiResponseModelAltiResponse = function () {
    function AltiResponse() {
        if (!(this instanceof AltiResponse)) {
            throw new TypeError('AltiResponse constructor cannot be called as a function.');
        }
        this.elevations = [];
    }
    AltiResponse.prototype = { constructor: AltiResponse };
    return AltiResponse;
}();
ServicesAltiResponseModelElevation = function () {
    function Elevation() {
        if (!(this instanceof Elevation)) {
            throw new TypeError('Elevation constructor cannot be called as a function.');
        }
        this.z = null;
    }
    Elevation.prototype = { constructor: Elevation };
    return Elevation;
}();
ServicesAltiFormatsAltiResponseReader = function (Logger, AltiResponse, Elevation) {
    var AltiResponseReader = {};
    AltiResponseReader.READERS = {
        elevations: function (root) {
            var altiResponse = new AltiResponse();
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
        elevation: function (node) {
            var elevation = new Elevation();
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (AltiResponseReader.READERS[child.nodeName]) {
                        AltiResponseReader.READERS[child.nodeName](child, elevation);
                    }
                }
            }
            return elevation;
        },
        lat: function (node, elevation) {
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                elevation.lat = parseFloat(textNode.nodeValue);
            } else {
                throw new Error('Erreur dans la lecture de la réponse du service: latitude attendue mais absente');
            }
        },
        lon: function (node, elevation) {
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                elevation.lon = parseFloat(textNode.nodeValue);
            } else {
                throw new Error('Erreur dans la lecture de la réponse du service: longitude attendue mais absente');
            }
        },
        z: function (node, elevation) {
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                if (elevation) {
                    elevation.z = parseFloat(textNode.nodeValue);
                } else {
                    elevation = new Elevation();
                    elevation.z = parseFloat(textNode.nodeValue);
                    return elevation;
                }
            } else {
                throw new Error('Erreur dans la lecture de la réponse du service: altitude attendue mais absente');
            }
        },
        acc: function (node, elevation) {
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                elevation.acc = parseFloat(textNode.nodeValue);
            } else {
                throw new Error('Erreur dans la lecture de la réponse du service: précision (acc) attendue mais absente');
            }
        },
        exceptionreport: function (node) {
            var response = {};
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (child.nodeName === 'Exception') {
                        response.exceptionReport = AltiResponseReader.READERS.exception(child);
                    }
                }
            }
            return response;
        },
        exception: function (node) {
            var exceptionReport = {};
            var exceptionCode = node.getAttribute('exceptionCode');
            if (exceptionCode) {
                exceptionReport.exceptionCode = exceptionCode;
            }
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                exceptionReport.exception = textNode.nodeValue;
            }
            return exceptionReport;
        },
        error: function (node) {
            var response = { error: {} };
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    var textNode;
                    if (child.nodeType === 1 && child.nodeName === 'code') {
                        textNode = child.firstChild;
                        if (textNode && textNode.nodeType === 3) {
                            response.error.code = textNode.nodeValue;
                        }
                    }
                    if (child.nodeType === 1 && child.nodeName === 'description') {
                        textNode = child.firstChild;
                        if (textNode && textNode.nodeType === 3) {
                            response.error.description = textNode.nodeValue;
                        }
                    }
                }
            }
            return response;
        }
    };
    AltiResponseReader.read = function (root) {
        if (root.nodeName === 'elevations') {
            var altiResponse = AltiResponseReader.READERS.elevations(root);
            return altiResponse;
        } else if (root.nodeName === 'ExceptionReport') {
            var exceptionReport = AltiResponseReader.READERS.exceptionreport(root);
            return exceptionReport;
        } else if (root.nodeName === 'error') {
            var error = AltiResponseReader.READERS.error(root);
            return error;
        } else {
            throw new Error('Erreur lors de la lecture de la réponse : elle n\'est pas au format attendu.');
        }
    };
    return AltiResponseReader;
}(UtilsLoggerByDefault, ServicesAltiResponseModelAltiResponse, ServicesAltiResponseModelElevation);
ServicesAltiResponseAltiResponseFactory = function (Logger, ErrorService, MRes, XML, AltiResponseReader, AltiResponse, Elevation) {
    var AltiResponseFactory = {
        build: function (options) {
            var data = null;
            if (options.response) {
                if (options.rawResponse) {
                    data = options.response;
                } else {
                    switch (options.outputFormat) {
                    case 'xml':
                        try {
                            var p = new XML({ reader: AltiResponseReader });
                            if (typeof options.response === 'string') {
                                p.setXMLString(options.response);
                            } else {
                                p.setXMLDoc(options.response);
                            }
                            data = p.parse();
                            if (!data) {
                                throw new Error(MRes.getMessage('SERVICE_RESPONSE_EXCEPTION_2'));
                            }
                        } catch (e) {
                            var message = e.message;
                            options.onError.call(options.scope, new ErrorService({
                                message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', message),
                                status: 200,
                                type: ErrorService.TYPE_SRVERR
                            }));
                            return;
                        }
                        break;
                    case 'json':
                        var JSONResponse;
                        if (typeof options.response === 'string') {
                            JSONResponse = window.JSON.parse(options.response);
                        } else {
                            JSONResponse = options.response;
                        }
                        if (JSONResponse.error) {
                            options.onError.call(options.scope, new ErrorService({
                                message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', JSONResponse.error.description),
                                status: 200,
                                type: ErrorService.TYPE_SRVERR
                            }));
                            return;
                        }
                        if (JSONResponse) {
                            var elevations = JSONResponse.elevations;
                            var altiResponse = new AltiResponse();
                            var elevation;
                            if (Array.isArray(elevations) && elevations.length) {
                                for (var i = 0; i < elevations.length; i++) {
                                    elevation = new Elevation();
                                    if (typeof elevations[i] === 'object') {
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
                                    } else if (typeof elevations[i] === 'number') {
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
                            options.onError.call(options.scope, new ErrorService({
                                message: MRes.getMessage('SERVICE_RESPONSE_ANALYSE_2'),
                                type: ErrorService.TYPE_UNKERR,
                                status: -1
                            }));
                            return;
                        }
                        break;
                    default:
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_FORMAT_2'),
                            type: ErrorService.TYPE_UNKERR,
                            status: -1
                        }));
                        return;
                    }
                    if (data.exceptionReport) {
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', data.exceptionReport),
                            type: ErrorService.TYPE_SRVERR,
                            status: 200
                        }));
                        return;
                    } else if (data.error) {
                        var errorMess = data.error.description;
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', errorMess),
                            type: ErrorService.TYPE_SRVERR,
                            status: 200
                        }));
                        return;
                    }
                }
            } else {
                options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EMPTY')));
                return;
            }
            options.onSuccess.call(options.scope, data);
            return;
        }
    };
    return AltiResponseFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, UtilsMessagesResources, FormatsXML, ServicesAltiFormatsAltiResponseReader, ServicesAltiResponseModelAltiResponse, ServicesAltiResponseModelElevation);
ServicesAltiAlti = function (Logger, _, ErrorService, CommonService, DefaultUrlService, AltiRequestFactory, AltiResponseFactory) {
    function Alti(options) {
        if (!(this instanceof Alti)) {
            throw new TypeError(_.getMessage('CLASS_CONSTRUCTOR', 'Alti'));
        }
        this.CLASSNAME = 'Alti';
        CommonService.apply(this, arguments);
        if (!options.positions) {
            throw new Error(_.getMessage('PARAM_MISSING', 'positions'));
        }
        if (options.positions.length === 0) {
            throw new Error(_.getMessage('PARAM_EMPTY', 'positions'));
        }
        this.options.positions = options.positions;
        this.options.outputFormat = typeof options.outputFormat === 'string' ? options.outputFormat.toLowerCase() : 'xml';
        this.options.sampling = options.sampling || null;
        this.options.api = typeof options.api === 'string' ? options.api.toUpperCase() : 'REST';
        if (this.options.api === 'REST') {
            this.options.httpMethod = 'GET';
        }
        this.options.zonly = options.zonly || false;
        if (!this.options.serverUrl) {
            var lstUrlByDefault = DefaultUrlService.Alti.url(this.options.apiKey);
            var urlFound = null;
            switch (this.options.api) {
            case 'WPS':
                urlFound = lstUrlByDefault.wps;
                break;
            case 'REST':
                var key = (options.sampling ? 'profil' : 'elevation') + '-' + this.options.outputFormat;
                urlFound = lstUrlByDefault[key];
                break;
            default:
                throw new Error(_.getMessage('PARAM_UNKNOWN', 'api'));
            }
            if (!urlFound) {
                throw new Error('Url by default not found !');
            }
            this.options.serverUrl = urlFound;
        }
        var idx = this.options.serverUrl.lastIndexOf('.');
        if (idx !== -1) {
            var extension = this.options.serverUrl.substring(idx + 1);
            if (extension && extension.length < 5) {
                switch (extension.toLowerCase()) {
                case 'json':
                case 'xml':
                    this.options.outputFormat = extension.toLowerCase();
                    break;
                default:
                    throw new Error('type of service : unknown or unsupported (json or xml) !');
                }
            }
        }
    }
    Alti.prototype = Object.create(CommonService.prototype, {});
    Alti.prototype.constructor = Alti;
    Alti.prototype.buildRequest = function (error, success) {
        var options = {
            httpMethod: this.options.httpMethod,
            onSuccess: function (result) {
                this.request = result;
                success.call(this, this.request);
            },
            onError: error,
            scope: this,
            positions: this.options.positions,
            outputFormat: this.options.outputFormat,
            sampling: this.options.sampling,
            api: this.options.api,
            zonly: this.options.zonly
        };
        AltiRequestFactory.build(options);
    };
    Alti.prototype.analyzeResponse = function (error, success) {
        if (this.response) {
            var options = {
                response: this.response,
                outputFormat: this.options.outputFormat,
                rawResponse: this.options.rawResponse,
                onError: error,
                onSuccess: success,
                scope: this
            };
            AltiResponseFactory.build(options);
        } else {
            error.call(this, new ErrorService(_.getMessage('SERVICE_RESPONSE_EMPTY')));
        }
    };
    return Alti;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, ServicesCommonService, ServicesDefaultUrlService, ServicesAltiRequestAltiRequestFactory, ServicesAltiResponseAltiResponseFactory);
ServicesAutoConfResponseModelAutoConfResponse = function () {
    function AutoConfResponse() {
        if (!(this instanceof AutoConfResponse)) {
            throw new TypeError('AutoConfResponse constructor cannot be called as a function.');
        }
        this.generalOptions = {
            apiKeys: {},
            title: null,
            defaultGMLGFIStyle: null,
            theme: null,
            wgs84Resolutions: []
        };
        this.layers = {};
        this.territories = {};
        this.tileMatrixSets = {};
        this.services = {};
    }
    AutoConfResponse.prototype = {
        constructor: AutoConfResponse,
        isConfLoaded: function (apiKey) {
            if (!apiKey) {
                return;
            }
            if (this.generalOptions.apiKeys[apiKey]) {
                return true;
            }
            return false;
        },
        getLayersId: function (apiKey) {
            return this.generalOptions.apiKeys[apiKey];
        },
        getLayersConf: function (apiKey) {
            var layers = {};
            var layersIdArray = this.getLayersId(apiKey);
            if (layersIdArray) {
                for (var i = 0; i < layersIdArray.length; i++) {
                    var lyrId = layersIdArray[i];
                    layers[lyrId] = this.layers[lyrId];
                }
            }
            return layers;
        },
        getLayerConf: function (layerId) {
            if (!this.layers) {
                return;
            }
            return this.layers[layerId];
        },
        getTileMatrixSets: function () {
            return this.tileMatrixSets;
        },
        getTMSConf: function (tmsID) {
            if (!this.tileMatrixSets) {
                return;
            }
            return this.tileMatrixSets[tmsID];
        },
        getTerritories: function () {
            return this.territories;
        },
        getTerritoryConf: function (territoryID) {
            if (!this.territories) {
                return;
            }
            return this.territories[territoryID];
        },
        getServices: function () {
            return this.services;
        },
        getServiceConf: function (serviceID) {
            if (!this.services) {
                return;
            }
            return this.services[serviceID];
        }
    };
    return AutoConfResponse;
}();
ServicesAutoConfResponseModelConstraint = function () {
    function Constraint() {
        if (!(this instanceof Constraint)) {
            throw new TypeError('Constraint constructor cannot be called as a function.');
        }
        this.crs = null;
        this.bbox = {
            left: null,
            right: null,
            top: null,
            bottom: null
        };
        this.minScaleDenominator = null;
        this.maxScaleDenominator = null;
        this.temporalExtent = [
            null,
            null
        ];
    }
    Constraint.prototype = { constructor: Constraint };
    return Constraint;
}();
ServicesAutoConfResponseModelFormat = function () {
    function Format() {
        if (!(this instanceof Format)) {
            throw new TypeError('Format constructor cannot be called as a function.');
        }
        this.current = null;
        this.name = null;
    }
    Format.prototype = { constructor: Format };
    return Format;
}();
ServicesAutoConfResponseModelLayer = function () {
    function Layer() {
        if (!(this instanceof Layer)) {
            throw new TypeError('Layer constructor cannot be called as a function.');
        }
    }
    Layer.prototype = {
        constructor: Layer,
        getName: function () {
            return this.name;
        },
        getTitle: function () {
            return this.title;
        },
        getDescription: function () {
            return this.description;
        },
        getLayerId: function () {
            return this.layerId;
        },
        getQuicklookUrl: function () {
            return this.quicklookUrl;
        },
        getDefaultProjection: function () {
            return this.defaultProjection;
        },
        getProjections: function () {
            var projections = [];
            projections.push(this.defaultProjection);
            var proj = projections.concat(this.additionalProjections);
            return proj;
        },
        getBBOX: function () {
            if (!this.globalConstraint) {
                return;
            }
            return this.globalConstraint.bbox;
        },
        getMinScaleDenominator: function () {
            if (!this.globalConstraint) {
                return;
            }
            return this.globalConstraint.minScaleDenominator;
        },
        getMaxScaleDenominator: function () {
            if (!this.globalConstraint) {
                return;
            }
            return this.globalConstraint.maxScaleDenominator;
        },
        getTMSID: function () {
            if (this.wmtsOptions) {
                return this.wmtsOptions.tileMatrixSetLink;
            }
            return;
        },
        getServiceParams: function () {
            return this.serviceParams;
        },
        getServerUrl: function (apiKey) {
            if (!apiKey || !this.serviceParams || !this.serviceParams.serverUrl) {
                return;
            }
            return this.serviceParams.serverUrl[apiKey];
        },
        getLegends: function () {
            return this.legends;
        },
        getMetadata: function () {
            return this.metadata;
        },
        getStyles: function () {
            return this.styles;
        },
        getDefaultStyle: function () {
            if (!this.styles) {
                return;
            }
            var style;
            var s = this.styles;
            for (var i = 0; i < s.length; i++) {
                if (s[i].current === true) {
                    style = s[i].name;
                    break;
                }
            }
            return style;
        },
        getThematics: function () {
            return this.thematics;
        },
        getDefaultFormat: function () {
            if (!this.formats) {
                return;
            }
            var format;
            var f = this.formats;
            for (var i = 0; i < f.length; i++) {
                if (f[i].current === true) {
                    format = f[i].name;
                    break;
                }
            }
            return format;
        },
        getConstraints: function () {
            return this.constraints;
        },
        getOriginators: function () {
            return this.originators;
        },
        getDimensions: function () {
            return this.dimensions;
        },
        getAggregatedLayers: function () {
            if (this.isAggregate) {
                return this.aggregatedLayers;
            } else {
                return;
            }
        }
    };
    return Layer;
}();
ServicesAutoConfResponseModelLegend = function () {
    function Legend() {
        if (!(this instanceof Legend)) {
            throw new TypeError('Legend constructor cannot be called as a function.');
        }
        this.format = null;
        this.url = null;
        this.minScaleDenominator = null;
    }
    Legend.prototype = { constructor: Legend };
    return Legend;
}();
ServicesAutoConfResponseModelMetadata = function () {
    function Metadata() {
        if (!(this instanceof Metadata)) {
            throw new TypeError('Metadata constructor cannot be called as a function.');
        }
        this.format = null;
        this.url = null;
    }
    Metadata.prototype = { constructor: Metadata };
    return Metadata;
}();
ServicesAutoConfResponseModelOriginator = function () {
    function Originator() {
        if (!(this instanceof Originator)) {
            throw new TypeError('Originator constructor cannot be called as a function.');
        }
        this.name = null;
        this.attribution = null;
        this.logo = null;
        this.url = null;
        this.constraints = [];
    }
    Originator.prototype = { constructor: Originator };
    return Originator;
}();
ServicesAutoConfResponseModelService = function () {
    function Service() {
        if (!(this instanceof Service)) {
            throw new TypeError('Service constructor cannot be called as a function.');
        }
        this.title = null;
        this.serverUrl = null;
        this.version = null;
    }
    Service.prototype = { constructor: Service };
    return Service;
}();
ServicesAutoConfResponseModelStyle = function () {
    function Style() {
        if (!(this instanceof Style)) {
            throw new TypeError('Style constructor cannot be called as a function.');
        }
        this.name = null;
        this.title = null;
        this.current = null;
    }
    Style.prototype = { constructor: Style };
    return Style;
}();
ServicesAutoConfResponseModelTerritory = function () {
    function Territory() {
        if (!(this instanceof Territory)) {
            throw new TypeError('Territory constructor cannot be called as a function.');
        }
        this.isDefault = null;
        this.defaultCRS = null;
        this.additionalCRS = [];
        this.geoBBOX = {
            left: null,
            right: null,
            top: null,
            bottom: null
        };
        this.geoCenter = {
            lon: null,
            lat: null
        };
        this.defaultOptions = {
            resolution: null,
            minScaleDenominator: null,
            maxScaleDenominator: null
        };
        this.defaultLayers = [];
    }
    Territory.prototype = { constructor: Territory };
    return Territory;
}();
ServicesAutoConfResponseModelThematic = function () {
    function Thematic() {
        if (!(this instanceof Thematic)) {
            throw new TypeError('Thematic constructor cannot be called as a function.');
        }
        this.inspire = null;
        this.name = null;
    }
    Thematic.prototype = { constructor: Thematic };
    return Thematic;
}();
ServicesAutoConfResponseModelTileMatrixSet = function () {
    function TileMatrixSet() {
        if (!(this instanceof TileMatrixSet)) {
            throw new TypeError('TileMatrixSet constructor cannot be called as a function.');
        }
        this.projection = null;
        this.nativeResolutions = [];
        this.matrixIds = [];
        this.tileMatrices = {};
    }
    TileMatrixSet.prototype = {
        constructor: TileMatrixSet,
        getResolutions: function () {
            return this.nativeResolutions;
        },
        getMatrixIds: function () {
            return this.matrixIds;
        },
        getProjection: function () {
            return this.projection;
        },
        getTileMatrices: function () {
            return this.tileMatrices;
        },
        getTopLeftCorner: function () {
            var topLeftCorner;
            var matrices = this.getTileMatrices();
            if (matrices) {
                for (var id in matrices) {
                    if (matrices.hasOwnProperty(id)) {
                        topLeftCorner = matrices[id].topLeftCorner;
                        break;
                    }
                }
            }
            return topLeftCorner;
        }
    };
    return TileMatrixSet;
}();
ServicesAutoConfResponseModelTileMatrix = function () {
    function TileMatrix() {
        if (!(this instanceof TileMatrix)) {
            throw new TypeError('TileMatrix constructor cannot be called as a function.');
        }
        this.matrixId = null;
        this.matrixHeight = null;
        this.matrixWidth = null;
        this.scaleDenominator = null;
        this.tileHeight = null;
        this.tileWidth = null;
        this.topLeftCorner = null;
    }
    TileMatrix.prototype = {
        constructor: TileMatrix,
        getTopLeftCorner: function () {
            return this.topLeftCorner;
        },
        getScaleDenominator: function () {
            return this.scaleDenominator;
        },
        getTileHeight: function () {
            return this.tileHeight;
        },
        getTileWidth: function () {
            return this.tileWidth;
        },
        getMatrixHeight: function () {
            return this.matrixHeight;
        },
        getMatrixWidth: function () {
            return this.matrixWidth;
        }
    };
    return TileMatrix;
}();
ServicesAutoConfResponseModelTileMatrixLimit = function () {
    function TileMatrixLimit() {
        if (!(this instanceof TileMatrixLimit)) {
            throw new TypeError('TileMatrixLimit constructor cannot be called as a function.');
        }
        this.minTileRow = null;
        this.maxTileRow = null;
        this.minTileCol = null;
        this.maxTileCol = null;
    }
    TileMatrixLimit.prototype = { constructor: TileMatrixLimit };
    return TileMatrixLimit;
}();
ServicesAutoConfFormatsAutoConfResponseReader = function (Logger, AutoConfResponse, Constraint, Format, Layer, Legend, Metadata, Originator, Service, Style, Territory, Thematic, TileMatrixSet, TileMatrix, TileMatrixLimit) {
    var AutoConfResponseReader = {};
    AutoConfResponseReader.VERSION = '1.1.0';
    AutoConfResponseReader.NAMESPACES = {
        xmlns: 'http://www.opengis.net/context',
        gpp: 'http://api.ign.fr/geoportail',
        ows: 'http://www.opengis.net/ows/1.1',
        sld: 'http://www.opengis.net/sld',
        wmts: 'http://www.opengis.net/wmts/1.0',
        xlink: 'http://www.w3.org/1999/xlink',
        xsi: 'http://www.w3.org/2001/XMLSchema-instance'
    };
    AutoConfResponseReader.SCHEMALOCATION = [
        'http://www.opengis.net/context http://gpp3-wxs.ign.fr/schemas/extContext.xsd http://api.ign.fr/geoportail http://wxs.ign.fr/schemas/autoconf/autoconf.xsd',
        'http://www.opengis.net/context http://gpp3-wxs.ign.fr/schemas/extContext.xsd http://api.ign.fr/geoportail http://gpp3-wxs.ign.fr/schemas/autoconf.xsd'
    ];
    AutoConfResponseReader.DEFAULTPREFIX = 'context';
    AutoConfResponseReader.READERS = {
        context: {
            ViewContext: function (viewContextNode) {
                __checkServiceAttributes(viewContextNode);
                var config = new AutoConfResponse();
                __getChildNodes(viewContextNode, config);
                return config;
            },
            Title: function (titleNode, data) {
                if (data && data.generalOptions) {
                    data.generalOptions.title = __getChildValue(titleNode);
                } else if (data && data.lyr) {
                    data.lyr.title = __getChildValue(titleNode);
                }
            },
            Abstract: function (node, data) {
                if (data && data.lyr) {
                    data.lyr.description = __getChildValue(node);
                }
            },
            Server: function (node, data) {
                var serverId = node.getAttribute('service');
                var title = node.getAttribute('title');
                var version = node.getAttribute('version');
                if (serverId) {
                    if (data && data.services && typeof data.services === 'object' && !data.services[serverId]) {
                        var s = new Service();
                        s.title = title;
                        s.version = version;
                        __getChildNodes(node, s);
                        data.services[serverId] = s;
                    } else if (data && data.lyr) {
                        if (!data.lyr.serviceParams) {
                            data.lyr.serviceParams = {};
                        }
                        data.lyr.serviceParams.id = serverId;
                        data.lyr.serviceParams.version = version;
                    }
                }
            },
            OnlineResource: function (node, service) {
                if (service && service.hasOwnProperty('serverUrl')) {
                    service.serverUrl = node.getAttribute('xlink:href');
                }
            },
            LayerList: function (layerListNode, config) {
                __getChildNodes(layerListNode, config);
                if (config && config.layers && config.generalOptions && config.services) {
                    for (var lyr in config.layers) {
                        if (config.layers.hasOwnProperty(lyr)) {
                            var layerConfig = config.layers[lyr];
                            var apiKeys = layerConfig.apiKeys;
                            if (apiKeys && Array.isArray(apiKeys)) {
                                for (var i = 0; i < apiKeys.length; i++) {
                                    var key = apiKeys[i];
                                    if (config.generalOptions.apiKeys) {
                                        if (!config.generalOptions.apiKeys[key] || !Array.isArray(config.generalOptions.apiKeys[key])) {
                                            config.generalOptions.apiKeys[key] = [];
                                        }
                                        config.generalOptions.apiKeys[key].push(lyr);
                                    }
                                }
                            }
                            var serviceParams = layerConfig.serviceParams;
                            if (serviceParams && serviceParams.id) {
                                if (!config.services[serviceParams.id]) {
                                    var s = new Service();
                                    if (serviceParams.serverUrl) {
                                        s.serverUrl = serviceParams.serverUrl;
                                    }
                                    if (serviceParams.version) {
                                        s.version = serviceParams.version;
                                    }
                                    config.services[serviceParams.id] = s;
                                }
                            }
                            if (layerConfig.wmtsOptions && layerConfig.wmtsOptions.tileMatrixSetLink && config.tileMatrixSets) {
                                var tmsLink = layerConfig.wmtsOptions.tileMatrixSetLink;
                                var tileMatrixSets = config.tileMatrixSets;
                                for (var tms in tileMatrixSets) {
                                    if (tileMatrixSets.hasOwnProperty(tms) && tms === tmsLink) {
                                        layerConfig.defaultProjection = tileMatrixSets[tms].projection;
                                    }
                                }
                            }
                        }
                    }
                }
            },
            Layer: function (layerNode, config) {
                if (config && config.layers) {
                    var lyrData = {
                        lyr: new Layer(),
                        lyrId: null
                    };
                    var hidden = layerNode.getAttribute('hidden');
                    if (hidden === '1') {
                        lyrData.lyr.hidden = true;
                    } else {
                        lyrData.lyr.hidden = false;
                    }
                    var queryable = layerNode.getAttribute('queryable');
                    if (queryable === '1') {
                        lyrData.lyr.queryable = true;
                    } else {
                        lyrData.lyr.queryable = false;
                    }
                    __getChildNodes(layerNode, lyrData);
                    if (lyrData.lyrId) {
                        if (lyrData.lyr.serviceParams && lyrData.lyr.serviceParams.id) {
                            var serviceid = lyrData.lyr.serviceParams.id;
                            if (serviceid.toUpperCase().indexOf('OPENLS') !== -1 || serviceid.toUpperCase().indexOf('ELEVATION') !== -1) {
                                var resourceId = lyrData.lyrId.split('$')[0];
                                lyrData.lyrId = resourceId + '$' + serviceid;
                            }
                        }
                        lyrData.lyr.layerId = lyrData.lyrId;
                        config.layers[lyrData.lyrId] = lyrData.lyr;
                    }
                }
            },
            Name: function (node, lyrData) {
                if (lyrData && lyrData.lyr) {
                    lyrData.lyr.name = __getChildValue(node);
                }
            },
            SRS: function (node, lyrData) {
                if (lyrData && lyrData.lyr) {
                    lyrData.lyr.defaultProjection = __getChildValue(node);
                }
            },
            Format: function (node, lyrData) {
                if (lyrData && lyrData.lyr) {
                    var f = new Format();
                    var current = node.getAttribute('current');
                    if (current === '1') {
                        f.current = true;
                    } else {
                        f.current = false;
                    }
                    f.name = __getChildValue(node);
                    if (!lyrData.lyr.formats || !Array.isArray(lyrData.lyr.formats)) {
                        lyrData.lyr.formats = [];
                    }
                    lyrData.lyr.formats.push(f);
                }
            },
            Style: function (node, lyrData) {
                if (lyrData && lyrData.lyr) {
                    var s = new Style();
                    var current = node.getAttribute('current');
                    if (current === '1' || current === 1) {
                        s.current = true;
                    } else {
                        s.current = false;
                    }
                    if (node.hasChildNodes) {
                        var children = node.childNodes;
                        var child;
                        var childName;
                        for (var i = 0; i < children.length; i++) {
                            child = children[i];
                            if (child.nodeType === 1) {
                                childName = child.localName || child.baseName || child.nodeName;
                                if (childName === 'Name') {
                                    s.name = __getChildValue(child);
                                } else if (childName === 'Title') {
                                    s.title = __getChildValue(child);
                                }
                            }
                        }
                    }
                    if (!lyrData.lyr.styles || !Array.isArray(lyrData.lyr.styles)) {
                        lyrData.lyr.styles = [];
                    }
                    lyrData.lyr.styles.push(s);
                }
            },
            Dimension: function (node, lyrData) {
                var name = node.getAttribute('name');
                var dim = __getChildValue(node);
                if (lyrData && lyrData.lyr) {
                    if (!lyrData.lyr.dimensions) {
                        lyrData.lyr.dimensions = {};
                    }
                    if (name === 'Type') {
                        lyrData.lyr.dimensions.type = dim;
                    } else if (name === 'VisibilityRange') {
                        lyrData.lyr.dimensions.visibilityRange = dim;
                    } else if (name === 'VisibilityMode ') {
                        lyrData.lyr.dimensions.visibilityMode = dim;
                    } else if (name === 'GeometricType') {
                        lyrData.lyr.dimensions.geometricType = dim;
                    } else if (name === 'NoDataValue') {
                        lyrData.lyr.dimensions.noDataValue = dim;
                    }
                }
            }
        },
        gpp: {
            Theme: function (themeNode, config) {
                if (config && config.generalOptions && config.generalOptions.hasOwnProperty('theme')) {
                    config.generalOptions.theme = __getChildValue(themeNode);
                }
            },
            defaultGMLGFIStyleUrl: function (node, config) {
                if (config && config.generalOptions && config.generalOptions.hasOwnProperty('defaultGMLGFIStyle')) {
                    config.generalOptions.defaultGMLGFIStyle = __getChildValue(node);
                }
            },
            Territory: function (territoryNode, config) {
                var tid = territoryNode.getAttribute('id');
                if (tid) {
                    var t = new Territory();
                    var isDefault = territoryNode.getAttribute('default');
                    if (isDefault === '1') {
                        t.isDefault = true;
                    } else {
                        t.isDefault = false;
                    }
                    __getChildNodes(territoryNode, t);
                    if (config && config.territories && typeof config.territories === 'object') {
                        config.territories[tid] = t;
                    }
                }
            },
            defaultCRS: function (node, territory) {
                if (territory && territory.hasOwnProperty('defaultCRS')) {
                    territory.defaultCRS = __getChildValue(node);
                }
            },
            AdditionalCRS: function (node, data) {
                var addCRS = __getChildValue(node);
                if (addCRS && data) {
                    if (Array.isArray(data.additionalCRS)) {
                        data.additionalCRS.push(addCRS);
                    } else {
                        if (!data.additionalProjections || !Array.isArray(data.additionalProjections)) {
                            data.additionalProjections = [];
                        }
                        data.additionalProjections.push(addCRS);
                    }
                }
            },
            DefaultLayer: function (node, territory) {
                var lyr = node.getAttribute('layerId');
                if (lyr && territory && Array.isArray(territory.defaultLayers)) {
                    territory.defaultLayers.push(lyr);
                }
            },
            BoundingBox: function (node, data) {
                if (data) {
                    var values = __getChildValue(node).split(',');
                    if (values.length === 4) {
                        var bbox = {
                            left: parseFloat(values[0]),
                            right: parseFloat(values[2]),
                            top: parseFloat(values[3]),
                            bottom: parseFloat(values[1])
                        };
                        var minT = node.getAttribute('minT');
                        var maxT = node.getAttribute('maxT');
                        if (data.hasOwnProperty('geoBBOX')) {
                            data.geoBBOX = bbox;
                        } else if (data.hasOwnProperty('bbox')) {
                            if (data.bbox.left || data.bbox.right || data.bbox.top || data.bbox.bottom) {
                                if (!data.multiConstraints) {
                                    data.multiConstraints = [];
                                }
                                var newConstraint = new Constraint();
                                newConstraint.bbox = bbox;
                                newConstraint.temporalExtent = [
                                    minT,
                                    maxT
                                ];
                                data.multiConstraints.push(newConstraint);
                            } else {
                                data.bbox = bbox;
                                data.temporalExtent = [
                                    minT,
                                    maxT
                                ];
                            }
                        } else {
                            if (!data.globalConstraint) {
                                data.globalConstraint = new Constraint();
                            }
                            data.globalConstraint.bbox = bbox;
                            data.globalConstraint.temporalExtent = [
                                minT,
                                maxT
                            ];
                        }
                    }
                }
            },
            Resolution: function (node, territory) {
                var res = __getChildValue(node);
                if (res && territory && territory.defaultOptions && territory.defaultOptions.hasOwnProperty('resolution')) {
                    territory.defaultOptions.resolution = parseFloat(res);
                }
            },
            x: function (node, territory) {
                var lon = __getChildValue(node);
                if (lon && territory && territory.geoCenter && territory.geoCenter.hasOwnProperty('lon')) {
                    territory.geoCenter.lon = parseFloat(lon);
                }
            },
            y: function (node, territory) {
                var lat = __getChildValue(node);
                if (lat && territory && territory.geoCenter && territory.geoCenter.hasOwnProperty('lat')) {
                    territory.geoCenter.lat = parseFloat(lat);
                }
            },
            Resolutions: function (resNode, config) {
                if (config && config.generalOptions && config.generalOptions.hasOwnProperty('wgs84Resolutions')) {
                    config.generalOptions.wgs84Resolutions = __getChildValue(resNode).split(',');
                }
            },
            Layer: function (node, lyrData) {
                if (lyrData && lyrData.hasOwnProperty('lyrId') && lyrData.lyr) {
                    lyrData.lyrId = node.getAttribute('id');
                    var aggregate = node.getAttribute('aggregate');
                    var more = node.getAttribute('more');
                    if (aggregate || more) {
                        lyrData.lyr.isAggregate = true;
                    }
                    __getChildNodes(node, lyrData.lyr);
                }
            },
            Constraint: function (node, data) {
                var c = new Constraint();
                __getChildNodes(node, c);
                if (data) {
                    if (!data.constraints || !Array.isArray(data.constraints)) {
                        data.constraints = [];
                    }
                    if (c.multiConstraints && Array.isArray(c.multiConstraints)) {
                        var constraint = new Constraint();
                        constraint.crs = c.crs;
                        constraint.bbox = c.bbox;
                        constraint.minScaleDenominator = c.minScaleDenominator;
                        constraint.maxScaleDenominator = c.maxScaleDenominator;
                        constraint.temporalExtent = c.temporalExtent;
                        data.constraints.push(constraint);
                        for (var i = 0; i < c.multiConstraints.length; i++) {
                            constraint = new Constraint();
                            constraint.crs = c.crs;
                            constraint.minScaleDenominator = c.minScaleDenominator;
                            constraint.maxScaleDenominator = c.maxScaleDenominator;
                            constraint.bbox = c.multiConstraints[i].bbox;
                            constraint.temporalExtent = c.multiConstraints[i].temporalExtent;
                            data.constraints.push(constraint);
                        }
                    } else {
                        data.constraints.push(c);
                    }
                }
            },
            CRS: function (node, data) {
                if (data && data.hasOwnProperty('crs')) {
                    data.crs = __getChildValue(node);
                }
            },
            Thematic: function (node, lyr) {
                if (lyr) {
                    var t = new Thematic();
                    t.inspire = false;
                    t.name = __getChildValue(node);
                    if (!lyr.thematics || !Array.isArray(lyr.thematics)) {
                        lyr.thematics = [];
                    }
                    lyr.thematics.push(t);
                }
            },
            InspireThematic: function (node, lyr) {
                if (lyr) {
                    var t = new Thematic();
                    t.inspire = true;
                    t.name = __getChildValue(node);
                    if (!lyr.thematics || !Array.isArray(lyr.thematics)) {
                        lyr.thematics = [];
                    }
                    lyr.thematics.push(t);
                }
            },
            Originator: function (node, lyr) {
                if (lyr) {
                    var o = new Originator();
                    o.name = node.getAttribute('name');
                    __getChildNodes(node, o);
                    if (!lyr.originators || !Array.isArray(lyr.originators)) {
                        lyr.originators = [];
                    }
                    lyr.originators.push(o);
                }
            },
            Attribution: function (node, originator) {
                if (originator && originator.hasOwnProperty('attribution')) {
                    originator.attribution = __getChildValue(node);
                }
            },
            Logo: function (node, originator) {
                if (originator && originator.hasOwnProperty('logo')) {
                    originator.logo = __getChildValue(node);
                }
            },
            URL: function (node, originator) {
                if (originator && originator.hasOwnProperty('url')) {
                    originator.url = __getChildValue(node);
                }
            },
            Legend: function (node, lyr) {
                var l = new Legend();
                __getChildNodes(node, l);
                if (lyr) {
                    if (!lyr.legends || !Array.isArray(lyr.legends)) {
                        lyr.legends = [];
                    }
                    lyr.legends.push(l);
                }
            },
            LegendURL: function (node, legend) {
                if (legend && legend.hasOwnProperty('format')) {
                    legend.format = node.getAttribute('format');
                    if (node.hasChildNodes) {
                        var child = node.childNodes[0];
                        var childName = child.localName || child.baseName || child.nodeName;
                        if (childName === 'OnlineResource' && legend.hasOwnProperty('url')) {
                            legend.url = child.getAttribute('xlink:href');
                        }
                    }
                }
            },
            QuickLook: function (node, lyr) {
                if (node.hasChildNodes) {
                    var child = node.childNodes[0];
                    var childName = child.localName || child.baseName || child.nodeName;
                    if (childName === 'OnlineResource' && lyr) {
                        lyr.quicklookUrl = child.getAttribute('xlink:href');
                    }
                }
            },
            MetadataURL: function (node, lyr) {
                if (lyr) {
                    var m = new Metadata();
                    m.format = node.getAttribute('format');
                    if (node.hasChildNodes) {
                        var child = node.childNodes[0];
                        var childName = child.localName || child.baseName || child.nodeName;
                        if (childName === 'OnlineResource') {
                            m.url = child.getAttribute('xlink:href');
                        }
                    }
                    if (!lyr.metadata && !Array.isArray(lyr.metadata)) {
                        lyr.metadata = [];
                    }
                    lyr.metadata.push(m);
                }
            },
            Key: function (node, lyr) {
                if (lyr) {
                    var key = node.getAttribute('id');
                    if (!lyr.apiKeys || !Array.isArray(lyr.apiKeys)) {
                        lyr.apiKeys = [];
                    }
                    lyr.apiKeys.push(key);
                    var serverUrl = __getChildValue(node);
                    if (!lyr.serviceParams) {
                        lyr.serviceParams = {};
                    }
                    if (!lyr.serviceParams.serverUrl) {
                        lyr.serviceParams.serverUrl = {};
                    }
                    if (!lyr.serviceParams.serverUrl[key]) {
                        lyr.serviceParams.serverUrl[key] = serverUrl;
                    }
                }
            }
        },
        ows: {
            Identifier: function (node, data) {
                if (data && data.hasOwnProperty('TMS')) {
                    data.identifier = __getChildValue(node);
                } else if (data && data.hasOwnProperty('matrixId')) {
                    data.matrixId = __getChildValue(node);
                }
            },
            SupportedCRS: function (node, tmsData) {
                if (tmsData && tmsData.TMS && tmsData.TMS.hasOwnProperty('projection')) {
                    tmsData.TMS.projection = __getChildValue(node);
                }
            }
        },
        sld: {
            MinScaleDenominator: function (node, data) {
                var minScale = __getChildValue(node);
                if (minScale && data) {
                    if (data.hasOwnProperty('defaultOptions')) {
                        data.defaultOptions.minScaleDenominator = parseFloat(minScale);
                    } else if (data.lyr) {
                        if (!data.lyr.globalConstraint) {
                            data.lyr.globalConstraint = new Constraint();
                        }
                        data.lyr.globalConstraint.minScaleDenominator = parseFloat(minScale);
                    } else if (data.hasOwnProperty('minScaleDenominator')) {
                        data.minScaleDenominator = parseFloat(minScale);
                    }
                }
            },
            MaxScaleDenominator: function (node, data) {
                var maxScale = __getChildValue(node);
                if (maxScale && data) {
                    if (data.hasOwnProperty('defaultOptions')) {
                        data.defaultOptions.maxScaleDenominator = parseFloat(maxScale);
                    } else if (data.lyr) {
                        if (!data.lyr.globalConstraint) {
                            data.lyr.globalConstraint = new Constraint();
                        }
                        data.lyr.globalConstraint.maxScaleDenominator = parseFloat(maxScale);
                    } else if (data.hasOwnProperty('maxScaleDenominator')) {
                        data.maxScaleDenominator = parseFloat(maxScale);
                    }
                }
            }
        },
        wmts: {
            TileMatrixSetLimits: function (node, lyr) {
                if (lyr) {
                    var limits = {};
                    __getChildNodes(node, limits);
                    if (!lyr.wmtsOptions) {
                        lyr.wmtsOptions = {};
                    }
                    lyr.wmtsOptions.tileMatrixSetLimits = limits;
                }
            },
            TileMatrixLimits: function (node, limits) {
                var limit = new TileMatrixLimit();
                var limitId;
                if (node.hasChildNodes) {
                    var children = node.childNodes;
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var childName = child.localName || child.baseName || child.nodeName;
                        if (childName === 'TileMatrix') {
                            limitId = __getChildValue(child);
                        } else if (childName === 'MinTileRow') {
                            limit.minTileRow = __getChildValue(child);
                        } else if (childName === 'MaxTileRow') {
                            limit.maxTileRow = __getChildValue(child);
                        } else if (childName === 'MinTileCol') {
                            limit.minTileCol = __getChildValue(child);
                        } else if (childName === 'MaxTileCol') {
                            limit.maxTileCol = __getChildValue(child);
                        }
                    }
                    if (limitId && limits && !limits[limitId]) {
                        limits[limitId] = limit;
                    }
                }
            },
            TileMatrixSet: function (node, data) {
                if (data && data.tileMatrixSets) {
                    var tmsData = {};
                    tmsData.TMS = new TileMatrixSet();
                    tmsData.resolutions = [];
                    __getChildNodes(node, tmsData);
                    var tileMatrices = tmsData.TMS.tileMatrices;
                    for (var tm in tileMatrices) {
                        if (tileMatrices.hasOwnProperty(tm)) {
                            tmsData.TMS.matrixIds.push(tm);
                        }
                    }
                    if (tmsData.TMS.getProjection() === 'IGNF:WGS84G' || tmsData.TMS.getProjection() === 'EPSG:4326') {
                        if (data.generalOptions && Array.isArray(data.generalOptions.wgs84Resolutions)) {
                            var wgs84Resolutions = data.generalOptions.wgs84Resolutions;
                            for (var i = 0; i < wgs84Resolutions.length; i++) {
                                tmsData.resolutions[i] = parseFloat(wgs84Resolutions[i]);
                            }
                        }
                    }
                    if (Array.isArray(tmsData.resolutions) && tmsData.resolutions.sort !== undefined) {
                        tmsData.resolutions.sort(function (x, y) {
                            return y - x;
                        });
                    }
                    tmsData.TMS.nativeResolutions = tmsData.resolutions;
                    data.tileMatrixSets[tmsData.identifier] = tmsData.TMS;
                } else {
                    if (data && !data.wmtsOptions) {
                        data.wmtsOptions = {};
                    }
                    data.wmtsOptions.tileMatrixSetLink = __getChildValue(node);
                }
            },
            TileMatrix: function (node, tmsData) {
                if (tmsData) {
                    var tileMatrix = new TileMatrix();
                    __getChildNodes(node, tileMatrix);
                    if (tmsData.TMS && tmsData.TMS.getProjection()) {
                        var proj = tmsData.TMS.getProjection();
                        if (proj === 'EPSG:3857' || proj === 'EPSG:2154') {
                            var r = tileMatrix.scaleDenominator * 0.00028;
                            if (tmsData.resolutions && Array.isArray(tmsData.resolutions)) {
                                tmsData.resolutions.push(r);
                            }
                        }
                    }
                    if (tmsData.TMS && tmsData.TMS.tileMatrices) {
                        tmsData.TMS.tileMatrices[tileMatrix.matrixId] = tileMatrix;
                    }
                }
            },
            ScaleDenominator: function (node, tileMatrix) {
                var scale = __getChildValue(node);
                if (scale && tileMatrix && tileMatrix.hasOwnProperty('scaleDenominator')) {
                    tileMatrix.scaleDenominator = parseFloat(scale);
                }
            },
            TopLeftCorner: function (node, tileMatrix) {
                var values = __getChildValue(node).split(' ');
                if (values && tileMatrix) {
                    tileMatrix.topLeftCorner = {};
                    tileMatrix.topLeftCorner.x = parseFloat(values[0]);
                    tileMatrix.topLeftCorner.y = parseFloat(values[1]);
                }
            },
            TileWidth: function (node, tileMatrix) {
                var value = __getChildValue(node);
                if (value && tileMatrix && tileMatrix.hasOwnProperty('tileWidth')) {
                    tileMatrix.tileWidth = parseInt(value, 10);
                }
            },
            TileHeight: function (node, tileMatrix) {
                var value = __getChildValue(node);
                if (value && tileMatrix && tileMatrix.hasOwnProperty('tileHeight')) {
                    tileMatrix.tileHeight = parseInt(value, 10);
                }
            },
            MatrixWidth: function (node, tileMatrix) {
                var value = __getChildValue(node);
                if (value && tileMatrix && tileMatrix.hasOwnProperty('matrixWidth')) {
                    tileMatrix.matrixWidth = parseInt(value, 10);
                }
            },
            MatrixHeight: function (node, tileMatrix) {
                var value = __getChildValue(node);
                if (value && tileMatrix && tileMatrix.hasOwnProperty('matrixHeight')) {
                    tileMatrix.matrixHeight = parseInt(value, 10);
                }
            }
        },
        serviceException: function (node) {
            var response = {};
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (child.nodeName === 'exception') {
                        response.exceptionReport = AutoConfResponseReader.READERS['exception'](child);
                    }
                }
            }
            return response;
        },
        exception: function (node) {
            var exceptionReport = {};
            var exceptionCode = node.getAttribute('code');
            if (exceptionCode) {
                exceptionReport.exceptionCode = exceptionCode;
            }
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                exceptionReport.exception = textNode.nodeValue;
            }
            return exceptionReport;
        }
    };
    AutoConfResponseReader.read = function (root) {
        if (root.nodeName === 'ViewContext') {
            var nsPrefix = root.prefix || AutoConfResponseReader.DEFAULTPREFIX;
            var config = AutoConfResponseReader.READERS[nsPrefix][root.nodeName](root);
            return config;
        } else if (root.nodeName === 'serviceException') {
            var exceptionReport = AutoConfResponseReader.READERS[root.nodeName](root);
            return exceptionReport;
        } else {
            throw new Error('Erreur lors de la lecture de la réponse : elle n\'est pas au format attendu.');
        }
    };
    function __getAttributes(node) {
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
    function __getChildNodes(node, data) {
        if (node.hasChildNodes()) {
            var children = node.childNodes;
            var child;
            var childName;
            var childPrefix;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (child.nodeType === 1) {
                    childName = child.localName || child.baseName || child.nodeName;
                    childPrefix = child.prefix || AutoConfResponseReader.DEFAULTPREFIX;
                    if (AutoConfResponseReader.READERS[childPrefix][childName]) {
                        var reader = AutoConfResponseReader.READERS[childPrefix][childName];
                        reader(child, data);
                    } else {
                        __getChildNodes(child, data);
                    }
                }
            }
        }
    }
    function __getChildValue(node) {
        var textNode;
        var value = '';
        if (node.hasChildNodes()) {
            textNode = node.firstChild;
            if (textNode.nodeType === 3 || textNode.nodeType === 4) {
                value = textNode.nodeValue;
            }
        }
        return value;
    }
    function __checkServiceAttributes(viewContextNode) {
        if (viewContextNode.attributes.length > 0) {
            var xlsAttributes = __getAttributes(viewContextNode);
            for (var att in xlsAttributes) {
                if (xlsAttributes.hasOwnProperty(att)) {
                    if (att === 'version') {
                        if (xlsAttributes['version'] !== AutoConfResponseReader.VERSION) {
                            console.log('[AutoConfResponseReader] autoconf version is not the expected one : there may be errors in parsing');
                            return;
                        }
                    }
                    if (att === 'xmlns') {
                        if (xlsAttributes[att] !== AutoConfResponseReader.NAMESPACES.xmlns) {
                            console.log('[AutoConfResponseReader] autoconf response default namespace is not the expected one');
                            return;
                        }
                        continue;
                    }
                    var prefix = att.split(':')[0];
                    var ns = att.split(':')[1];
                    if (prefix === 'xmlns' && ns) {
                        if (AutoConfResponseReader.NAMESPACES[ns]) {
                            if (AutoConfResponseReader.NAMESPACES[ns] !== xlsAttributes[att]) {
                                console.log('[AutoConfResponseReader] autoconf response ' + att + ' namespace is not the expected one');
                                return;
                            }
                        }
                    }
                    if (ns === 'schemaLocation') {
                        if (xlsAttributes[att] !== AutoConfResponseReader.SCHEMALOCATION[0] && xlsAttributes[att] !== AutoConfResponseReader.SCHEMALOCATION[1]) {
                            console.log('[AutoConfResponseReader] autoconf response schema location is not the expected one');
                            return;
                        }
                    }
                }
            }
        }
    }
    return AutoConfResponseReader;
}(UtilsLoggerByDefault, ServicesAutoConfResponseModelAutoConfResponse, ServicesAutoConfResponseModelConstraint, ServicesAutoConfResponseModelFormat, ServicesAutoConfResponseModelLayer, ServicesAutoConfResponseModelLegend, ServicesAutoConfResponseModelMetadata, ServicesAutoConfResponseModelOriginator, ServicesAutoConfResponseModelService, ServicesAutoConfResponseModelStyle, ServicesAutoConfResponseModelTerritory, ServicesAutoConfResponseModelThematic, ServicesAutoConfResponseModelTileMatrixSet, ServicesAutoConfResponseModelTileMatrix, ServicesAutoConfResponseModelTileMatrixLimit);
ServicesAutoConfResponseAutoConfResponseFactory = function (Logger, ErrorService, MRes, XML, AutoConfResponseReader) {
    var AutoConfReponseFactory = {
        build: function (options) {
            var data = null;
            if (options.response) {
                if (options.rawResponse) {
                    data = options.response;
                } else {
                    try {
                        var p = new XML({ reader: AutoConfResponseReader });
                        if (typeof options.response === 'string') {
                            p.setXMLString(options.response);
                        } else {
                            p.setXMLDoc(options.response);
                        }
                        data = p.parse();
                    } catch (e) {
                        var message = e.message;
                        if (typeof options.response === 'string') {
                            message += '\n(raw response service\'' + options.response + '\')';
                        } else {
                            message += '\n(raw response service\'' + options.response.documentElement.innerHTML + '\')';
                        }
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', message),
                            status: 200,
                            type: ErrorService.TYPE_SRVERR
                        }));
                        return;
                    }
                    var isEmpty = true;
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            isEmpty = false;
                        }
                    }
                    if (isEmpty) {
                        options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EMPTY_2')));
                        return;
                    }
                    if (data.exceptionReport) {
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', data.exceptionReport),
                            type: ErrorService.TYPE_SRVERR,
                            status: 200
                        }));
                        return;
                    }
                }
            } else {
                options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EMPTY')));
                return;
            }
            var scope = typeof window !== 'undefined' ? window : {};
            if (!scope.Gp) {
                scope.Gp = {};
            }
            if (!scope.Gp.Config) {
                scope.Gp.Config = data;
            } else {
                this.mergeConfig(scope.Gp.Config, data, options.layerId);
            }
            options.onSuccess.call(options.scope, scope.Gp.Config);
            return;
        },
        mergeConfig: function (GpConfig, data, layerId) {
            if (data && GpConfig) {
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        if (prop == 'generalOptions') {
                            for (var key in data[prop].apiKeys) {
                                if (data[prop].apiKeys.hasOwnProperty(key) && !GpConfig.generalOptions.apiKeys[key]) {
                                    GpConfig.generalOptions.apiKeys[key] = data[prop].apiKeys[key];
                                }
                            }
                        } else {
                            if (GpConfig[prop]) {
                                for (var obj in data[prop]) {
                                    if (data[prop].hasOwnProperty(obj) && !GpConfig[prop][obj]) {
                                        GpConfig[prop][obj] = data[prop][obj];
                                    }
                                }
                            }
                        }
                    }
                }
                if (layerId) {
                    var aggregatedLayers = [];
                    for (var lyr in data.layers) {
                        if (data.layers.hasOwnProperty(lyr)) {
                            aggregatedLayers.push(lyr);
                        }
                    }
                    if (GpConfig.layers[layerId]) {
                        GpConfig.layers[layerId].aggregatedLayers = aggregatedLayers;
                    }
                }
            }
        }
    };
    return AutoConfReponseFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, UtilsMessagesResources, FormatsXML, ServicesAutoConfFormatsAutoConfResponseReader);
ServicesAutoConfAutoConf = function (Logger, _, ErrorService, Helper, DefaultUrlService, CommonService, AutoConfResponseFactory) {
    function AutoConf(options) {
        if (!(this instanceof AutoConf)) {
            throw new TypeError(_.getMessage('CLASS_CONSTRUCTOR', 'AutoConf'));
        }
        this.CLASSNAME = 'AutoConf';
        CommonService.apply(this, arguments);
        if (!this.options.serverUrl) {
            if (!this.options.serverUrl) {
                var lstUrlByDefault = DefaultUrlService.AutoConf.url(this.options.apiKey);
                if (!this.options.layerId) {
                    if (Array.isArray(this.options.apiKey) && this.options.apiKey.length > 0) {
                        this.options.serverUrl = lstUrlByDefault.apiKeys;
                    } else {
                        this.options.serverUrl = lstUrlByDefault.apiKey;
                    }
                } else {
                    this.options.serverUrl = lstUrlByDefault.aggregate + this.options.layerId;
                }
            }
        }
        if (this.options.protocol === 'XHR' && this.options.httpMethod === 'POST') {
            this.options.httpMethod = 'GET';
        }
        this.options.outputFormat = this.options.rawResponse ? '' : 'xml';
    }
    AutoConf.prototype = Object.create(CommonService.prototype, {});
    AutoConf.prototype.constructor = AutoConf;
    AutoConf.prototype.buildRequest = function (error, success) {
        var scope = typeof window !== 'undefined' ? window : {};
        if (scope.Gp && scope.Gp.Config && scope.Gp.Config.generalOptions && scope.Gp.Config.layers) {
            if (scope.Gp.Config.generalOptions.apiKeys[this.options.apiKey]) {
                if (this.options.layerId) {
                    if (scope.Gp.Config.layers[this.options.layerId] && scope.Gp.Config.layers[this.options.layerId].aggregatedLayers) {
                        this.options.onSuccess.call(this, scope.Gp.Config);
                        return;
                    }
                } else {
                    this.options.onSuccess.call(this, scope.Gp.Config);
                    return;
                }
            }
        }
        this.request = '';
        var bLocal;
        if (this.options.serverUrl.indexOf('http://') === -1) {
            bLocal = true;
        } else {
            bLocal = false;
        }
        if (!bLocal && this.layerId) {
            this.request = Helper.normalyzeParameters({ layerId: this.layerId });
        }
        success.call(this, this.request);
    };
    AutoConf.prototype.analyzeResponse = function (error, success) {
        if (this.response) {
            var options = {
                layerId: this.options.layerId,
                response: this.response,
                rawResponse: this.options.rawResponse,
                onSuccess: success,
                onError: error,
                scope: this
            };
            AutoConfResponseFactory.build(options);
        } else {
            error.call(this, new ErrorService(_.getMessage('SERVICE_RESPONSE_EMPTY')));
        }
    };
    return AutoConf;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, UtilsHelper, ServicesDefaultUrlService, ServicesCommonService, ServicesAutoConfResponseAutoConfResponseFactory);
FormatsXLSRequestHeader = function (Logger) {
    function RequestHeader(options) {
        if (!(this instanceof RequestHeader)) {
            throw new TypeError('RequestHeader constructor cannot be called as a function.');
        }
        this.options = options || { srsName: 'EPSG:4326' };
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
    }
    RequestHeader.prototype = {
        requestString: null,
        template: '<RequestHeader srsName="__SRSNAME__"/>',
        constructor: RequestHeader,
        toString: function () {
            var template = null;
            template = this.template;
            template = template.replace(/__SRSNAME__/g, this.options.srsName);
            this.requestString = template;
            return this.requestString;
        }
    };
    return RequestHeader;
}(UtilsLoggerByDefault);
FormatsXLSRequest = function (Logger) {
    function Request(options) {
        if (!(this instanceof Request)) {
            throw new TypeError('Request constructor cannot be called as a function.');
        }
        this.options = options || {
            maximumResponses: 25,
            methodName: null,
            version: '1.2'
        };
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
    }
    Request.prototype = {
        requestString: null,
        template: '<Request maximumResponses="__MAXRESPONSES__" methodName="__METHODNAME__" requestID="__UUID__" version="__VERSION__">' + '<!-- __REQUESTSERVICE__ -->' + '</Request>',
        constructor: Request,
        guid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = c === 'x' ? r : r & 3 | 8;
                return v.toString(16);
            });
        },
        toString: function () {
            var template = null;
            template = this.template;
            template = template.replace(/__MAXRESPONSES__/g, this.options.maximumResponses);
            template = template.replace(/__METHODNAME__/g, this.options.methodName);
            template = template.replace(/__UUID__/g, this.guid());
            template = template.replace(/__VERSION__/g, this.options.version);
            this.requestString = template;
            return this.requestString;
        }
    };
    return Request;
}(UtilsLoggerByDefault);
FormatsXLSAbstractService = function (Logger) {
    function AbstractService(options) {
        if (!(this instanceof AbstractService)) {
            throw new TypeError('AbstractService constructor cannot be called as a function.');
        }
        this.options = options || {};
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
    }
    AbstractService.prototype = {
        strRequest: null,
        oRequest: null,
        oFilter: null,
        constructor: AbstractService,
        addRequest: function (oRequest) {
        },
        addFilter: function (oFilter) {
        },
        toString: function () {
        }
    };
    return AbstractService;
}(UtilsLoggerByDefault);
FormatsXLS = function (Logger, RequestHeader, Request, AbstractService) {
    function XLS(options) {
        if (!(this instanceof XLS)) {
            throw new TypeError('XLS constructor cannot be called as a function.');
        }
        this.options = {
            srsName: 'EPSG:4326',
            maximumResponses: 25
        };
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                if (options[opt]) {
                    this.options[opt] = options[opt];
                }
            }
        }
    }
    XLS.VERSION = '1.2';
    XLS.prototype = {
        requestString: null,
        namespace: false,
        oService: null,
        constructor: XLS,
        template: '<?xml version="1.0" encoding="UTF-8"?>\n' + '<XLS version="__VERSION__"\n' + '__NAMESPACE__ \n' + '__SCHEMALOCATION__>\n' + '__REQUESTHEADER__\n' + '__REQUEST__\n' + '</XLS>\n',
        namespaceByDefault: function () {
            var ns = [
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
                'xmlns:xls="http://www.opengis.net/xls"',
                'xmlns:gml="http://www.opengis.net/gml"'
            ];
            return ns.join(' ');
        },
        schemaLocationByDefault: function () {
            return 'xsi:schemaLocation="http://www.opengis.net/xls http://schemas.opengis.net/ols/1.2/olsAll.xsd"';
        },
        setService: function (oService) {
            if (!oService) {
                return;
            }
            if (oService instanceof AbstractService) {
                this.oService = oService;
            } else {
            }
        },
        getService: function () {
            return this.oService;
        }
    };
    XLS.prototype.addNamespace = function (ns, request) {
        var keyNS = ns.key;
        var bFound = false;
        var allNS = this.namespaceByDefault().split(' ');
        for (var index = 0; index < allNS.length; index++) {
            var element = allNS[index];
            var map = element.split('=');
            var key = map[0];
            if (key === 'xmlns:' + keyNS) {
                bFound = true;
                break;
            }
        }
        if (!bFound) {
            return request;
        }
        var regex;
        var subst;
        regex = /<(\w+[\s>])/g;
        subst = '<' + keyNS + ':$1';
        request = request.replace(regex, subst);
        regex = /<\/(\w+[\s>])/g;
        subst = '</' + keyNS + ':$1';
        request = request.replace(regex, subst);
        return request;
    };
    XLS.prototype.build = function () {
        var bService = this.getService() ? true : false;
        var template = '';
        template = this.template;
        template = template.replace(/__VERSION__/g, XLS.VERSION);
        template = template.replace(/__NAMESPACE__/g, this.namespaceByDefault);
        template = template.replace(/__SCHEMALOCATION__/g, this.schemaLocationByDefault);
        var oHeader = new RequestHeader({ srsName: this.options.srsName });
        template = template.replace(/__REQUESTHEADER__/g, oHeader.toString());
        var oRequest = new Request({
            maximumResponses: this.options.maximumResponses,
            version: XLS.VERSION,
            methodName: bService ? this.getService().CLASSTYPE : null
        });
        template = template.replace(/__REQUEST__/g, oRequest.toString());
        if (bService) {
            template = template.replace(/<!-- __REQUESTSERVICE__ -->/g, this.getService().toString());
        }
        if (!template) {
            return;
        }
        if (this.namespace) {
            template = this.addNamespace({
                key: 'xls',
                url: 'http://www.opengis.net/xls'
            }, template);
        }
        this.requestString = template;
        return this.requestString;
    };
    return XLS;
}(UtilsLoggerByDefault, FormatsXLSRequestHeader, FormatsXLSRequest, FormatsXLSAbstractService);
FormatsXLSLocationUtilityServiceModelAddress = function (Gp, Logger) {
    function Address(options) {
        if (!(this instanceof Address)) {
            throw new TypeError('Address constructor cannot be called as a function.');
        }
        this.options = options || {
            location: {},
            type: ['StreetAddress'],
            filter: {}
        };
        if (!options.location) {
            throw new Error('l\'option \'location\' n\'est pas renseignée !');
        }
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
    }
    Address.prototype = {
        constructor: Address,
        requestString: null,
        template: {
            address: '<Address countryCode="__COUNTRYCODE__">' + '__LOCATION__' + '__PLACE__' + '__POSTALCODE__' + '__ENVELOPE__' + '</Address>',
            location: {
                freeFormAddress: '<freeFormAddress>__FREEFORMADDRESSVALUE__</freeFormAddress>',
                streetAddress: {
                    container: '<StreetAddress>' + '__STREET__' + '__BUILDING__' + '</StreetAddress>',
                    building: '<Building number="__BUILDINGVALUE__"/>',
                    street: '<Street>__STREETVALUE__</Street>'
                }
            },
            place: '<Place type="__PLACETYPE__">__PLACEVALUE__</Place>',
            postalCode: '<PostalCode>__POSTALCODEVALUE__</PostalCode>',
            envelope: '<gml:Envelope>' + '<gml:lowerCorner>__LEFT__ __BOTTOM__</gml:lowerCorner>' + '<gml:upperCorner>__RIGHT__ __TOP__</gml:upperCorner>' + '</gml:Envelope>'
        }
    };
    Address.prototype.toString = function () {
        var template = null;
        template = this.template.address;
        template = template.replace(/__COUNTRYCODE__/g, this.options.type);
        if (typeof this.options.location === 'string') {
            var tmplFreeFormAddress = this.template.location.freeFormAddress;
            tmplFreeFormAddress = tmplFreeFormAddress.replace(/__FREEFORMADDRESSVALUE__/g, this.options.location);
            template = template.replace(/__LOCATION__/g, tmplFreeFormAddress);
        } else {
            var tmplBuilding = '';
            var tmplStreet = '';
            if (this.options.location.number) {
                tmplBuilding = this.template.location.streetAddress.building;
                tmplBuilding = tmplBuilding.replace(/__BUILDINGVALUE__/g, this.options.location.number);
            }
            if (this.options.location.street) {
                tmplStreet = this.template.location.streetAddress.street;
                tmplStreet = tmplStreet.replace(/__STREETVALUE__/g, this.options.location.street);
            }
            var tmplStreetAddress = this.template.location.streetAddress.container;
            tmplStreetAddress = tmplStreetAddress.replace(/__STREET__/g, tmplStreet);
            tmplStreetAddress = tmplStreetAddress.replace(/__BUILDING__/g, tmplBuilding);
            template = template.replace(/__LOCATION__/g, tmplStreetAddress);
        }
        var tmplPostalCode = '';
        if (this.options.location.postalCode) {
            tmplPostalCode = this.template.postalCode;
            tmplPostalCode = tmplPostalCode.replace(/__POSTALCODEVALUE__/g, this.options.location.postalCode);
        }
        var tmplEnvelope = '';
        if (this.options.filter) {
            var bbox = this.options.filter.bbox;
            if (bbox) {
                tmplEnvelope = this.template.envelope;
                tmplEnvelope = tmplEnvelope.replace(/__LEFT__/g, bbox.left);
                tmplEnvelope = tmplEnvelope.replace(/__BOTTOM__/g, bbox.bottom);
                tmplEnvelope = tmplEnvelope.replace(/__RIGHT__/g, bbox.right);
                tmplEnvelope = tmplEnvelope.replace(/__TOP__/g, bbox.top);
            }
        }
        var Places = [];
        var tmplPlace = '';
        if (this.options.filter) {
            var filters = this.options.filter;
            for (var filter in filters) {
                if (filter === 'bbox') {
                    continue;
                }
                tmplPlace = this.template.place;
                tmplPlace = tmplPlace.replace(/__PLACETYPE__/g, filter);
                tmplPlace = tmplPlace.replace(/__PLACEVALUE__/g, filters[filter]);
                Places.push(tmplPlace);
            }
        }
        var tmplPlaceCity = '';
        if (this.options.location.city) {
            tmplPlaceCity = this.template.place;
            tmplPlaceCity = tmplPlaceCity.replace(/__PLACETYPE__/g, 'Municipality');
            tmplPlaceCity = tmplPlaceCity.replace(/__PLACEVALUE__/g, this.options.location.city);
            Places.push(tmplPlaceCity);
        }
        template = template.replace(/__POSTALCODE__/g, tmplPostalCode);
        template = template.replace(/__PLACE__/g, Places.join('\n'));
        template = template.replace(/__ENVELOPE__/g, tmplEnvelope);
        this.requestString = template;
        return this.requestString;
    };
    return Address;
}(Gp, UtilsLoggerByDefault);
FormatsXLSLocationUtilityServiceGeocodeFilterExtension = function (Logger) {
    function GeocodeFilterExtension() {
        if (!(this instanceof GeocodeFilterExtension)) {
            throw new TypeError('GeocodeFilterExtension constructor cannot be called as a function.');
        }
        this.filters = [];
    }
    GeocodeFilterExtension.prototype = {
        constructor: GeocodeFilterExtension,
        addFilterExtensions: function (oGeocodeLocation) {
            if (oGeocodeLocation) {
                this.filters.push(oGeocodeLocation);
            }
        },
        getNames: function () {
            var names = [];
            for (var idx in this.filters) {
                names.push(this.filters[idx].CLASSNAME);
            }
            return names;
        },
        getFilter: function (name) {
            var filter = null;
            for (var idx in this.filters) {
                if (this.filters[idx].CLASSNAME == name) {
                    filter = this.filters[idx];
                }
            }
            return filter;
        },
        getFilters: function () {
            return this.filters;
        },
        getAttributs: function (name) {
            var attributs = [];
            for (var idx in this.filters) {
                if (this.filters[idx].CLASSNAME == name) {
                    attributs = this.filters[idx].attributesList;
                }
            }
            return attributs;
        },
        setPlaceAttributs: function (name, options) {
            var filter = this.getFilter(name);
            var attributs = this.getAttributs(name);
            for (var idx in attributs) {
                var value = attributs[idx];
                if (options[value]) {
                    filter.placeAttributes[value] = options[value];
                }
            }
        },
        getPlaceAttributs: function (name) {
            var places = {};
            for (var idx in this.filters) {
                if (this.filters[idx].CLASSNAME == name) {
                    places = this.filters[idx].placeAttributes;
                }
            }
            return places;
        }
    };
    return GeocodeFilterExtension;
}(UtilsLoggerByDefault);
FormatsXLSLocationUtilityServiceGeocodeRequest = function (Logger, Address, GeocodeFilterExtension) {
    function GeocodeRequest(options) {
        if (!(this instanceof GeocodeRequest)) {
            throw new TypeError('GeocodeRequest constructor cannot be called as a function.');
        }
        this.options = options || {};
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
        this.CLASSNAME = 'GeocodeRequest';
    }
    GeocodeRequest.prototype = {
        strRequest: null,
        oAddress: null,
        oFilter: null,
        template: '<GeocodeRequest returnFreeForm="__RETURNFREEFORM__">' + '__ADDRESS__' + '</GeocodeRequest>',
        addAddress: function (oAddress) {
            if (oAddress instanceof Address) {
                this.oAddress = oAddress;
            }
        },
        addFilter: function (oFilter) {
            if (oFilter instanceof GeocodeFilterExtension) {
                this.oFilter = oFilter;
            }
        },
        constructor: GeocodeRequest,
        toString: function () {
            var template = '';
            template = this.template;
            if (!this.oAddress) {
                var settings = {};
                settings.location = this.options.location;
                settings.type = this.options.filterOptions.type || ['StreetAddress'];
                settings.filter = this.options.filterOptions;
                delete settings.filter.type;
                if (this.oFilter) {
                    settings.filter = {};
                    for (var idx in settings.type) {
                        var filter = settings.type[idx];
                        var oFilter = this.oFilter.getFilter(filter);
                        if (!oFilter) {
                            continue;
                        }
                        var mFilter = this.options.filterOptions;
                        var attributs = oFilter.attributesList;
                        for (var idxe = 0; idxe < attributs.length; idxe++) {
                            var key = attributs[idxe];
                            if (mFilter[key]) {
                                var matchingKey = oFilter.serviceAttributes[idxe];
                                oFilter.placeAttributes[matchingKey] = mFilter[key];
                            }
                        }
                        var places = oFilter.placeAttributes;
                        for (var kplace in places) {
                            if (places.hasOwnProperty(kplace)) {
                                settings.filter[kplace] = places[kplace];
                            }
                        }
                    }
                }
                this.oAddress = new Address(settings);
                if (!this.oAddress) {
                    throw new Error('La construction de l\'adresse n\'est pas correctement definie !?');
                }
            }
            template = template.replace(/__ADDRESS__/g, this.oAddress.toString());
            template = template.replace(/__RETURNFREEFORM__/g, this.options.returnFreeForm ? 'true' : 'false');
            this.strRequest = template;
            return this.strRequest;
        }
    };
    return GeocodeRequest;
}(UtilsLoggerByDefault, FormatsXLSLocationUtilityServiceModelAddress, FormatsXLSLocationUtilityServiceGeocodeFilterExtension);
FormatsXLSLocationUtilityServiceModelPosition = function (Logger) {
    function Position(options) {
        if (!(this instanceof Position)) {
            throw new TypeError('Position constructor cannot be called as a function.');
        }
        this.options = options || {};
        if (!options.position) {
            throw new Error('l\'option \'position\' n\'est pas renseignée !');
        }
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
    }
    Position.prototype = {
        constructor: Position,
        requestString: null,
        template: {
            position: '<Position>' + '__GMLPOINT__' + '__GMLFILTER__' + '</Position>',
            gml: {
                point: '<gml:Point xmlns:gml="http://www.opengis.net/gml"><gml:pos>__X__ __Y__</gml:pos></gml:Point>',
                pos: null,
                filter: {
                    bbox: '<gml:Envelope xmlns:gml="http://www.opengis.net/gml">' + '<gml:lowerCorner>__LEFT__ __BOTTOM__</gml:lowerCorner>' + '<gml:upperCorner>__RIGHT__ __TOP__</gml:upperCorner>' + '</gml:Envelope>',
                    circle: '<gml:CircleByCenterPoint xmlns:gml="http://www.opengis.net/gml"><gml:pos>__X__ __Y__</gml:pos><gml:radius>__RADIUS__</gml:radius></gml:CircleByCenterPoint>',
                    polygon: '<gml:Polygon xmlns:gml="http://www.opengis.net/gml"><gml:exterior><gml:LinearRing><gml:posList>__XY__</gml:posList></gml:LinearRing></gml:exterior></gml:Polygon>',
                    multipolygon: null
                }
            }
        }
    };
    Position.prototype.toString = function () {
        var template = this.template.position;
        var tmplGmlPoint = this.template.gml.point;
        tmplGmlPoint = tmplGmlPoint.replace(/__X__/g, this.options.position.x);
        tmplGmlPoint = tmplGmlPoint.replace(/__Y__/g, this.options.position.y);
        var tmplGmlFilter = '';
        if (this.options.filter) {
            var filter = this.options.filter;
            for (var name in filter) {
                switch (name) {
                case 'circle':
                    tmplGmlFilter = this.template.gml.filter[name];
                    tmplGmlFilter = tmplGmlFilter.replace(/__X__/g, filter[name].x);
                    tmplGmlFilter = tmplGmlFilter.replace(/__Y__/g, filter[name].y);
                    tmplGmlFilter = tmplGmlFilter.replace(/__RADIUS__/g, filter[name].radius);
                    break;
                case 'bbox':
                    tmplGmlFilter = this.template.gml.filter[name];
                    tmplGmlFilter = tmplGmlFilter.replace(/__LEFT__/g, filter[name].left);
                    tmplGmlFilter = tmplGmlFilter.replace(/__BOTTOM__/g, filter[name].bottom);
                    tmplGmlFilter = tmplGmlFilter.replace(/__RIGHT__/g, filter[name].right);
                    tmplGmlFilter = tmplGmlFilter.replace(/__TOP__/g, filter[name].top);
                    break;
                case 'polygon':
                    tmplGmlFilter = this.template.gml.filter[name];
                    var strPoints = '';
                    var lstPoints = filter[name];
                    for (var i = 0; i < lstPoints.length; i++) {
                        var coord = lstPoints[i];
                        if (Array.isArray(coord)) {
                            break;
                        }
                        if (coord.x && coord.y || (coord.x === 0 || coord.y === 0)) {
                            strPoints += coord.x + ' ' + coord.y;
                        }
                        if (lstPoints.length !== i + 1) {
                            strPoints += ' ';
                        }
                    }
                    tmplGmlFilter = tmplGmlFilter.replace(/__XY__/g, strPoints);
                    break;
                case 'multipolygon':
                    break;
                default:
                }
            }
        }
        template = template.replace(/__GMLPOINT__/g, tmplGmlPoint);
        template = template.replace(/__GMLFILTER__/g, tmplGmlFilter);
        this.requestString = template;
        return this.requestString;
    };
    return Position;
}(UtilsLoggerByDefault);
FormatsXLSLocationUtilityServiceModelPreference = function (Logger) {
    function Preference(type) {
        if (!(this instanceof Preference)) {
            throw new TypeError('Preference constructor cannot be called as a function.');
        }
        this.type = type;
    }
    Preference.prototype = {
        constructor: Preference,
        requestString: null,
        template: '<ReverseGeocodePreference>__TYPE__</ReverseGeocodePreference>'
    };
    Preference.prototype.toString = function () {
        var Preferences = [];
        var tmplPreference = '';
        for (var idx = 0; idx < this.type.length; idx++) {
            tmplPreference = this.template;
            tmplPreference = tmplPreference.replace(/__TYPE__/g, this.type[idx]);
            Preferences.push(tmplPreference);
        }
        this.strRequest = Preferences.join('\n');
        return this.strRequest;
    };
    return Preference;
}(UtilsLoggerByDefault);
FormatsXLSLocationUtilityServiceReverseGeocodeRequest = function (Logger, Position, Preference) {
    function ReverseGeocodeRequest(options) {
        if (!(this instanceof ReverseGeocodeRequest)) {
            throw new TypeError('ReverseGeocodeRequest constructor cannot be called as a function.');
        }
        this.options = options || {};
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
        this.CLASSNAME = 'ReverseGeocodeRequest';
    }
    ReverseGeocodeRequest.prototype = {
        strRequest: null,
        oPosition: null,
        oPreference: null,
        constructor: ReverseGeocodeRequest,
        template: '<ReverseGeocodeRequest returnFreeForm="__RETURNFREEFORM__">' + '__POSITION__' + '__PREFERENCE__' + '</ReverseGeocodeRequest>',
        addPosition: function (oPosition) {
            if (oPosition instanceof Position) {
                this.oPosition = oPosition;
            }
        },
        addPreferences: function (oPreference) {
            if (oPreference instanceof Preference) {
                this.oPreference = oPreference;
            }
        },
        toString: function () {
            var template = '';
            template = this.template;
            if (!this.oPreference) {
                this.oPreference = new Preference(this.options.filterOptions.type || ['StreetAddress']);
                if (!this.oPreference) {
                    throw new Error('Les preferences ne sont pas definies !?');
                }
            }
            template = template.replace(/__PREFERENCE__/g, this.oPreference.toString());
            if (!this.oPosition) {
                var settings = {
                    position: this.options.position,
                    filter: {}
                };
                if (this.options.filterOptions) {
                    settings.filter = this.options.filterOptions;
                    delete settings.filter.type;
                }
                this.oPosition = new Position(settings);
                if (!this.oPosition) {
                    throw new Error('La position et ses filtres ne sont pas definis !?');
                }
            }
            template = template.replace(/__POSITION__/g, this.oPosition.toString());
            template = template.replace(/__RETURNFREEFORM__/g, this.options.returnFreeForm ? 'true' : 'false');
            this.strRequest = template;
            return this.strRequest;
        }
    };
    return ReverseGeocodeRequest;
}(UtilsLoggerByDefault, FormatsXLSLocationUtilityServiceModelPosition, FormatsXLSLocationUtilityServiceModelPreference);
FormatsXLSLocationUtilityService = function (Logger, AbstractService, GeocodeRequest, ReverseGeocodeRequest, GeocodeFilterExtension) {
    function LocationUtilityService(options) {
        if (!(this instanceof LocationUtilityService)) {
            throw new TypeError('LocationUtilityService constructor cannot be called as a function.');
        }
        this.CLASSNAME = 'LocationUtilityService';
        this.CLASSTYPE = null;
        AbstractService.apply(this, arguments);
        if (this.options) {
            this.CLASSTYPE = this.options.location ? 'GeocodeRequest' : this.options.position ? 'ReverseGeocodeRequest' : null;
        }
    }
    LocationUtilityService.prototype = Object.create(AbstractService.prototype, {});
    LocationUtilityService.prototype.constructor = LocationUtilityService;
    LocationUtilityService.prototype.addRequest = function (oLUSRequest) {
        this.CLASSTYPE = oLUSRequest.CLASSNAME;
        switch (this.CLASSTYPE) {
        case 'GeocodeRequest':
        case 'ReverseGeocodeRequest':
            this.oRequest = oLUSRequest;
            break;
        default:
            throw new Error('Ce n\'est pas un objet de type \'LUS Request\' !?');
        }
    };
    LocationUtilityService.prototype.addFilter = function (oFilter) {
        if (oFilter instanceof GeocodeFilterExtension) {
            this.oFilter = oFilter;
        }
    };
    LocationUtilityService.prototype.toString = function () {
        if (!this.oRequest) {
            if (!this.options) {
                throw new Error('Les options ne sont pas renseignées, impossible de construire la requête !');
            }
            if (this.CLASSTYPE === 'GeocodeRequest') {
                var settingsDirect = {
                    location: this.options.location,
                    returnFreeForm: this.options.returnFreeForm,
                    filterOptions: this.options.filterOptions || {}
                };
                this.oRequest = new GeocodeRequest(settingsDirect);
                if (this.oFilter) {
                    this.oRequest.addFilter(this.oFilter);
                }
            } else if (this.CLASSTYPE === 'ReverseGeocodeRequest') {
                var settingsInv = {
                    position: this.options.position,
                    returnFreeForm: this.options.returnFreeForm,
                    filterOptions: this.options.filterOptions || {}
                };
                this.oRequest = new ReverseGeocodeRequest(settingsInv);
            } else {
            }
        }
        if (!this.oRequest) {
            throw new Error('Type de Geocodage indefini !');
        }
        this.strRequest = this.oRequest.toString();
        return this.strRequest;
    };
    return LocationUtilityService;
}(UtilsLoggerByDefault, FormatsXLSAbstractService, FormatsXLSLocationUtilityServiceGeocodeRequest, FormatsXLSLocationUtilityServiceReverseGeocodeRequest, FormatsXLSLocationUtilityServiceGeocodeFilterExtension);
ServicesGeocodeRequestGeocodeLocation = function () {
    function GeocodeLocation() {
        if (!(this instanceof GeocodeLocation)) {
            throw new TypeError('GeocodeLocation constructor cannot be called as a function.');
        }
        this.placeAttributes = {};
        this.attributesList = [];
        this.serviceAttributes = [];
    }
    GeocodeLocation.prototype = { constructor: GeocodeLocation };
    return GeocodeLocation;
}();
ServicesGeocodeRequestModelStreetAddress = function (GeocodeLocation) {
    function StreetAddress() {
        if (!(this instanceof StreetAddress)) {
            throw new TypeError('StreetAddress constructor cannot be called as a function.');
        }
        GeocodeLocation.apply(this, arguments);
        this.CLASSNAME = 'StreetAddress';
        this.attributesList = [
            'bbox',
            'ID',
            'IDTR',
            'quality',
            'territory',
            'commune',
            'department',
            'insee',
            'municipality'
        ];
        this.serviceAttributes = [
            'bbox',
            'ID',
            'IDTR',
            'Qualite',
            'Territoire',
            'Commune',
            'Departement',
            'INSEE',
            'Municipality'
        ];
    }
    StreetAddress.prototype = Object.create(GeocodeLocation.prototype);
    StreetAddress.prototype.constructor = StreetAddress;
    return StreetAddress;
}(ServicesGeocodeRequestGeocodeLocation);
ServicesGeocodeRequestModelPositionOfInterest = function (GeocodeLocation) {
    function PositionOfInterest() {
        if (!(this instanceof PositionOfInterest)) {
            throw new TypeError('PositionOfInterest constructor cannot be called as a function.');
        }
        GeocodeLocation.apply(this, arguments);
        this.CLASSNAME = 'PositionOfInterest';
        this.attributesList = [
            'bbox',
            'importance',
            'nature',
            'territory',
            'commune',
            'department',
            'insee',
            'municipality'
        ];
        this.serviceAttributes = [
            'bbox',
            'Importance',
            'Nature',
            'Territoire',
            'Commune',
            'Departement',
            'INSEE',
            'Municipality'
        ];
    }
    PositionOfInterest.prototype = Object.create(GeocodeLocation.prototype);
    PositionOfInterest.prototype.constructor = PositionOfInterest;
    return PositionOfInterest;
}(ServicesGeocodeRequestGeocodeLocation);
ServicesGeocodeRequestModelCadastralParcel = function (GeocodeLocation) {
    function CadastralParcel() {
        if (!(this instanceof CadastralParcel)) {
            throw new TypeError('CadastralParcel constructor cannot be called as a function.');
        }
        GeocodeLocation.apply(this, arguments);
        this.CLASSNAME = 'CadastralParcel';
        this.attributesList = [
            'absorbedCity',
            'sheet',
            'number',
            'section',
            'commune',
            'department',
            'insee',
            'municipality',
            'origin'
        ];
        this.serviceAttributes = [
            'CommuneAbsorbee',
            'Feuille',
            'Numero',
            'Section',
            'Commune',
            'Departement',
            'INSEE',
            'Municipality',
            'Type'
        ];
    }
    CadastralParcel.prototype = Object.create(GeocodeLocation.prototype);
    CadastralParcel.prototype.constructor = CadastralParcel;
    return CadastralParcel;
}(ServicesGeocodeRequestGeocodeLocation);
ServicesGeocodeRequestModelAdministratif = function (GeocodeLocation) {
    function Administratif() {
        if (!(this instanceof Administratif)) {
            throw new TypeError('Administratif constructor cannot be called as a function.');
        }
        GeocodeLocation.apply(this, arguments);
        this.CLASSNAME = 'Administratif';
        this.attributesList = [
            'bbox',
            'prefecture',
            'inseeRegion',
            'inseeDepartment',
            'municipality'
        ];
        this.serviceAttributes = [
            'bbox',
            'Prefecture',
            'InseeRegion',
            'InseeDepartement',
            'Municipality'
        ];
    }
    Administratif.prototype = Object.create(GeocodeLocation.prototype);
    Administratif.prototype.constructor = Administratif;
    return Administratif;
}(ServicesGeocodeRequestGeocodeLocation);
ServicesGeocodeRequestDirectGeocodeRequestFactory = function (Logger, XLS, LocationUtilityService, GeocodeFilterExtension, StreetAddress, PositionOfInterest, CadastralParcel, Administratif) {
    var DirectGeocodeRequestFactory = {
        build: function (options) {
            var request = null;
            var oFilter = new GeocodeFilterExtension();
            oFilter.addFilterExtensions(new Administratif());
            oFilter.addFilterExtensions(new StreetAddress());
            oFilter.addFilterExtensions(new PositionOfInterest());
            oFilter.addFilterExtensions(new CadastralParcel());
            var oLUS = new LocationUtilityService({
                location: options.location,
                returnFreeForm: options.returnFreeForm,
                filterOptions: options.filterOptions
            });
            oLUS.addFilter(oFilter);
            var oXLS = new XLS({
                srsName: options.srs,
                maximumResponses: options.maximumResponses
            });
            oXLS.namespace = true;
            oXLS.setService(oLUS);
            request = oXLS.build();
            if (options.httpMethod == 'GET') {
                var myRequest = 'qxml=' + encodeURIComponent(request).replace(/\-/g, '%2D').replace(/\_/g, '%5F').replace(/\./g, '%2E').replace(/\!/g, '%21').replace(/\~/g, '%7E').replace(/\*/g, '%2A').replace(/\'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
                request = myRequest;
            }
            return request;
        }
    };
    return DirectGeocodeRequestFactory;
}(UtilsLoggerByDefault, FormatsXLS, FormatsXLSLocationUtilityService, FormatsXLSLocationUtilityServiceGeocodeFilterExtension, ServicesGeocodeRequestModelStreetAddress, ServicesGeocodeRequestModelPositionOfInterest, ServicesGeocodeRequestModelCadastralParcel, ServicesGeocodeRequestModelAdministratif);
ServicesGeocodeResponseModelGeocodeResponse = function () {
    function GeocodeResponse() {
        if (!(this instanceof GeocodeResponse)) {
            throw new TypeError('GeocodeResponse constructor cannot be called as a function.');
        }
        this.locations = [];
    }
    GeocodeResponse.prototype = { constructor: GeocodeResponse };
    return GeocodeResponse;
}();
ServicesGeocodeResponseModelGeocodedLocation = function () {
    function GeocodedLocation() {
        if (!(this instanceof GeocodedLocation)) {
            throw new TypeError('GeocodedLocation constructor cannot be called as a function.');
        }
        this.position = {
            x: null,
            y: null
        };
        this.matchType = null;
        this.placeAttributes = {};
        this.type = null;
    }
    GeocodedLocation.prototype = { constructor: GeocodedLocation };
    return GeocodedLocation;
}();
ServicesGeocodeResponseModelDirectGeocodedLocation = function (GeocodedLocation) {
    function DirectGeocodedLocation() {
        if (!(this instanceof DirectGeocodedLocation)) {
            throw new TypeError('DirectGeocodedLocation constructor cannot be called as a function.');
        }
        GeocodedLocation.apply(this, arguments);
        this.CLASSNAME = 'DirectGeocodedLocation';
        this.accuracy = null;
    }
    DirectGeocodedLocation.prototype = Object.create(GeocodedLocation.prototype);
    DirectGeocodedLocation.prototype.constructor = DirectGeocodedLocation;
    return DirectGeocodedLocation;
}(ServicesGeocodeResponseModelGeocodedLocation);
ServicesGeocodeFormatsDirectGeocodeResponseReader = function (Logger, MR, ErrSrv, GeocodeResponse, DirectGeocodedLocation) {
    var DirectGeocodeResponseReader = {};
    DirectGeocodeResponseReader.VERSION = '1.2';
    DirectGeocodeResponseReader.NAMESPACES = {
        xmlns: 'http://www.opengis.net/xls',
        gml: 'http://www.opengis.net/gml',
        xls: 'http://www.opengis.net/xls',
        xlsext: 'http://www.opengis.net/xlsext',
        xsi: 'http://www.w3.org/2001/XMLSchema-instance'
    };
    DirectGeocodeResponseReader.SCHEMALOCATION = 'http://wxs.ign.fr/schemas/olsAll.xsd';
    DirectGeocodeResponseReader.DEFAULTPREFIX = 'xls';
    DirectGeocodeResponseReader.READERS = {
        xls: {
            XLS: function (root) {
                var geocodeResponse = new GeocodeResponse();
                __checkServiceAttributes(root);
                __getChildNodes(root, geocodeResponse);
                return geocodeResponse;
            },
            GeocodedAddress: function (node, geocodeResponse) {
                var geocodedLocation = new DirectGeocodedLocation();
                __getChildNodes(node, geocodedLocation);
                if (geocodeResponse && Array.isArray(geocodeResponse.locations)) {
                    geocodeResponse.locations.push(geocodedLocation);
                }
            },
            GeocodeMatchCode: function (node, geocodedLocation) {
                var acc = node.getAttribute('accuracy');
                if (acc && geocodedLocation) {
                    geocodedLocation.accuracy = parseFloat(acc);
                }
                var matchType = node.getAttribute('matchType');
                if (matchType && geocodedLocation) {
                    geocodedLocation.matchType = matchType;
                }
            },
            Address: function (node, geocodedLocation) {
                var countrycode = node.getAttribute('countryCode');
                if (geocodedLocation && countrycode) {
                    geocodedLocation.type = countrycode;
                }
                __getChildNodes(node, geocodedLocation);
            },
            freeFormAddress: function (node, geocodedLocation) {
                if (geocodedLocation && geocodedLocation.hasOwnProperty('placeAttributes')) {
                    geocodedLocation.placeAttributes.freeform = __getChildValue(node);
                }
            },
            Building: function (node, geocodedLocation) {
                var num = node.getAttribute('number');
                if (geocodedLocation && geocodedLocation.hasOwnProperty('placeAttributes')) {
                    if (num) {
                        geocodedLocation.placeAttributes.number = num;
                    } else if (node.getAttribute('buildingName')) {
                        geocodedLocation.placeAttributes.number = node.getAttribute('buildingName');
                    } else if (node.getAttribute('subdivision')) {
                        geocodedLocation.placeAttributes.number = node.getAttribute('subdivision');
                    }
                }
            },
            Street: function (node, geocodedLocation) {
                if (geocodedLocation && geocodedLocation.hasOwnProperty('placeAttributes')) {
                    if (geocodedLocation.type === 'StreetAddress') {
                        geocodedLocation.placeAttributes.street = __getChildValue(node);
                    } else if (geocodedLocation.type === 'CadastralParcel') {
                        geocodedLocation.placeAttributes.cadastralParcel = __getChildValue(node);
                    }
                }
            },
            Place: function (node, geocodedLocation) {
                var placeType = node.getAttribute('type');
                var placeName = __getChildValue(node);
                if (geocodedLocation && geocodedLocation.hasOwnProperty('placeAttributes')) {
                    if (placeType === 'Municipality') {
                        geocodedLocation.placeAttributes.municipality = placeName;
                    } else if (placeType === 'Bbox') {
                        var values = placeName.split(';');
                        if (values.length === 4) {
                            geocodedLocation.placeAttributes.bbox = {
                                left: parseFloat(values[0]),
                                right: parseFloat(values[2]),
                                top: parseFloat(values[1]),
                                bottom: parseFloat(values[3])
                            };
                        }
                    } else if (placeType === 'Commune') {
                        geocodedLocation.placeAttributes.commune = placeName;
                    } else if (placeType === 'Departement') {
                        geocodedLocation.placeAttributes.department = placeName;
                    } else if (placeType === 'INSEE') {
                        geocodedLocation.placeAttributes.insee = placeName;
                    } else if (placeType === 'Qualite') {
                        geocodedLocation.placeAttributes.quality = placeName;
                    } else if (placeType === 'Territoire') {
                        geocodedLocation.placeAttributes.territory = placeName;
                    } else if (placeType === 'ID') {
                        geocodedLocation.placeAttributes.ID = placeName;
                    } else if (placeType === 'ID_TR') {
                        geocodedLocation.placeAttributes.IDTR = placeName;
                    } else if (placeType === 'Importance') {
                        geocodedLocation.placeAttributes.importance = parseInt(placeName, 10);
                    } else if (placeType === 'Nature') {
                        geocodedLocation.placeAttributes.nature = placeName;
                    } else if (placeType === 'Numero') {
                        geocodedLocation.placeAttributes.number = placeName;
                    } else if (placeType === 'Feuille') {
                        geocodedLocation.placeAttributes.sheet = placeName;
                    } else if (placeType === 'Section') {
                        geocodedLocation.placeAttributes.section = placeName;
                    } else if (placeType === 'CommuneAbsorbee') {
                        geocodedLocation.placeAttributes.absorbedCity = placeName;
                    } else if (placeType === 'Arrondissement') {
                        if (placeName) {
                            geocodedLocation.placeAttributes.arrondissement = placeName;
                        }
                    } else if (placeType === 'Type') {
                        geocodedLocation.placeAttributes.origin = placeName;
                    } else if (placeType === 'Prefecture') {
                        geocodedLocation.placeAttributes.prefecture = placeName;
                    } else if (placeType === 'InseeRegion') {
                        geocodedLocation.placeAttributes.inseeRegion = placeName;
                    } else if (placeType === 'InseeDepartment') {
                        geocodedLocation.placeAttributes.inseeDepartment = placeName;
                    }
                }
            },
            PostalCode: function (node, geocodedLocation) {
                if (geocodedLocation && geocodedLocation.hasOwnProperty('placeAttributes')) {
                    geocodedLocation.placeAttributes.postalCode = __getChildValue(node);
                }
            },
            Error: function (node) {
                var srvMess = node.getAttribute('message');
                var errorCode = node.getAttribute('errorCode');
                var message = MR.getMessage('SERVICE_RESPONSE_EXCEPTION', '(' + errorCode + ') : ' + srvMess);
                throw new ErrSrv({
                    message: message,
                    type: ErrSrv.TYPE_SRVERR
                });
            }
        },
        gml: {
            pos: function (node, geocodedLocation) {
                var pos = __getChildValue(node);
                if (geocodedLocation && pos) {
                    geocodedLocation.position = {
                        x: parseFloat(pos.split(' ')[0]),
                        y: parseFloat(pos.split(' ')[1])
                    };
                }
            }
        },
        ExceptionReport: function (node) {
            var response = {};
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (child.nodeName === 'Exception') {
                        response.exceptionReport = DirectGeocodeResponseReader.READERS['Exception'](child);
                    }
                }
            }
            return response;
        },
        Exception: function (node) {
            var exceptionReport = {};
            var exceptionCode = node.getAttribute('exceptionCode');
            if (exceptionCode) {
                exceptionReport.exceptionCode = exceptionCode;
            }
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                exceptionReport.exception = textNode.nodeValue;
            }
            return exceptionReport;
        }
    };
    DirectGeocodeResponseReader.read = function (root) {
        if (root.nodeName === 'XLS') {
            var nsPrefix = root.prefix;
            if (!nsPrefix) {
                nsPrefix = DirectGeocodeResponseReader.DEFAULTPREFIX;
            }
            var geocodeResponse = DirectGeocodeResponseReader.READERS[nsPrefix][root.nodeName](root);
            return geocodeResponse;
        } else if (root.nodeName === 'ExceptionReport') {
            var exceptionReport = DirectGeocodeResponseReader.READERS[root.nodeName](root);
            return exceptionReport;
        } else {
            var mess = MR.getMessage('SERVICE_RESPONSE_ANALYSE', root.nodeName);
            throw new ErrSrv({
                message: mess,
                type: ErrSrv.TYPE_UNKERR,
                status: 200
            });
        }
    };
    function __getAttributes(node) {
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
    function __getChildNodes(node, data) {
        if (node.hasChildNodes()) {
            var children = node.childNodes;
            var child;
            var childName;
            var childPrefix;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (child.nodeType === 1) {
                    childName = child.localName || child.baseName || child.nodeName;
                    childPrefix = child.prefix || DirectGeocodeResponseReader.DEFAULTPREFIX;
                    if (DirectGeocodeResponseReader.READERS[childPrefix][childName]) {
                        var reader = DirectGeocodeResponseReader.READERS[childPrefix][childName];
                        reader(child, data);
                    } else {
                        __getChildNodes(child, data);
                    }
                }
            }
        }
    }
    function __getChildValue(node) {
        var textNode;
        var value = '';
        if (node.hasChildNodes()) {
            textNode = node.firstChild;
            if (textNode.nodeType === 3) {
                value = textNode.nodeValue;
            }
        }
        return value;
    }
    function __checkServiceAttributes(XLSNode) {
        if (XLSNode.attributes.length > 0) {
            var xlsAttributes = __getAttributes(XLSNode);
            for (var att in xlsAttributes) {
                if (xlsAttributes.hasOwnProperty(att)) {
                    if (att === 'version') {
                        if (xlsAttributes['version'] !== DirectGeocodeResponseReader.VERSION) {
                            console.log('[DirectGeocodeResponseReader] geocode version is not the expected one : there may be errors in parsing');
                            return;
                        }
                    }
                    if (att === 'xmlns') {
                        if (xlsAttributes[att] !== DirectGeocodeResponseReader.NAMESPACES[DirectGeocodeResponseReader.DEFAULTPREFIX]) {
                            console.log('[DirectGeocodeResponseReader] geocode response default namespace is not the expected one');
                            return;
                        }
                        continue;
                    }
                    var prefix = att.split(':')[0];
                    var ns = att.split(':')[1];
                    if (prefix === 'xmlns' && ns) {
                        if (DirectGeocodeResponseReader.NAMESPACES[ns]) {
                            if (DirectGeocodeResponseReader.NAMESPACES[ns] !== xlsAttributes[att]) {
                                console.log('[DirectGeocodeResponseReader] geocode response ' + att + ' namespace is not the expected one');
                                return;
                            }
                        }
                    }
                    if (ns === 'schemaLocation') {
                        if (DirectGeocodeResponseReader.SCHEMALOCATION !== xlsAttributes[att]) {
                            console.log('[DirectGeocodeResponseReader] geocode response schema location is not the expected one');
                            return;
                        }
                    }
                }
            }
        }
    }
    return DirectGeocodeResponseReader;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, ServicesGeocodeResponseModelGeocodeResponse, ServicesGeocodeResponseModelDirectGeocodedLocation);
ServicesGeocodeResponseDirectGeocodeResponseFactory = function (Logger, ErrorService, MRes, XML, DirectGeocodeResponseReader) {
    var DirectGeocodeReponseFactory = {
        build: function (options) {
            var data = null;
            if (options.response) {
                if (options.rawResponse) {
                    data = options.response;
                } else {
                    try {
                        var p = new XML({ reader: DirectGeocodeResponseReader });
                        if (typeof options.response === 'string') {
                            p.setXMLString(options.response);
                        } else {
                            p.setXMLDoc(options.response);
                        }
                        data = p.parse();
                        if (!data) {
                            throw new Error('L\'analyse de la réponse du service !?');
                        }
                    } catch (e) {
                        var message = e.message;
                        if (typeof options.response === 'string') {
                            message += '(\'' + options.response + '\')';
                        } else {
                            message += '(\'' + options.response.documentElement.innerHTML + '\')';
                        }
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_ANALYSE', message),
                            type: ErrorService.TYPE_UNKERR,
                            status: -1
                        }));
                        return;
                    }
                    if (data.exceptionReport) {
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', data.exceptionReport),
                            type: ErrorService.TYPE_SRVERR,
                            status: 200
                        }));
                        return;
                    }
                }
            } else {
                options.onError.call(options.scope, new ErrorService({
                    message: MRes.getMessage('SERVICE_RESPONSE_EMPTY'),
                    type: ErrorService.TYPE_SRVERR,
                    status: -1
                }));
                return;
            }
            options.onSuccess.call(options.scope, data);
            return;
        }
    };
    return DirectGeocodeReponseFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, UtilsMessagesResources, FormatsXML, ServicesGeocodeFormatsDirectGeocodeResponseReader);
ServicesGeocodeGeocode = function (Logger, _, ErrorService, CommonService, DirectGeocodeRequestFactory, DirectGeocodeResponseFactory) {
    function Geocode(options) {
        if (!(this instanceof Geocode)) {
            throw new TypeError(_.getMessage('CLASS_CONSTRUCTOR', 'Geocode'));
        }
        this.CLASSNAME = 'Geocode';
        CommonService.apply(this, arguments);
        if (!options.location) {
            throw new Error(_.getMessage('PARAM_MISSING', 'location'));
        }
        if (typeof options.location === 'object' && Object.keys(options.location).length === 0) {
            throw new Error(_.getMessage('PARAM_EMPTY', 'location'));
        } else if (typeof options.location === 'string' && options.location.length === 0) {
            throw new Error(_.getMessage('PARAM_EMPTY', 'location'));
        }
        this.options.location = options.location;
        if (!options.filterOptions || typeof options.filterOptions !== 'object') {
            this.options.filterOptions = options.filterOptions = { type: ['StreetAddress'] };
        }
        if (Object.keys(options.filterOptions).length === 0) {
            this.options.filterOptions = { type: ['StreetAddress'] };
        }
        var filter = Object.keys(options.filterOptions);
        for (var i = 0; i < filter.length; i++) {
            var key = filter[i];
            var filtersCouldBeNumberList = [
                'department',
                'number',
                'postalCode',
                'insee',
                'importance',
                'ID',
                'IDTR',
                'absorbedCity',
                'sheet',
                'section',
                'inseeRegion',
                'inseeDepartment'
            ];
            if (filtersCouldBeNumberList.indexOf(key) !== -1 && typeof options.filterOptions[key] !== 'string') {
                options.filterOptions[key] = options.filterOptions[key].toString();
            }
            if (!options.filterOptions[key]) {
                delete this.options.filterOptions[key];
            }
        }
        this.options.filterOptions.type = options.filterOptions.type || ['StreetAddress'];
        this.options.maximumResponses = options.maximumResponses || 25;
        this.options.returnFreeForm = options.returnFreeForm || false;
        this.options.srs = options.srs || 'EPSG:4326';
        this.options.outputFormat = this.options.rawResponse ? '' : 'xml';
    }
    Geocode.prototype = Object.create(CommonService.prototype, {});
    Geocode.prototype.constructor = Geocode;
    Geocode.prototype.buildRequest = function (error, success) {
        var options = {
            httpMethod: this.options.httpMethod,
            location: this.options.location,
            returnFreeForm: this.options.returnFreeForm,
            filterOptions: this.options.filterOptions,
            srs: this.options.srs,
            maximumResponses: this.options.maximumResponses
        };
        this.request = DirectGeocodeRequestFactory.build(options);
        if (!this.request) {
            error.call(this, new ErrorService(_.getMessage('SERVICE_REQUEST_BUILD')));
        } else {
            success.call(this, this.request);
        }
    };
    Geocode.prototype.analyzeResponse = function (error, success) {
        if (this.response) {
            var options = {
                response: this.response,
                rawResponse: this.options.rawResponse,
                onError: error,
                onSuccess: success,
                scope: this
            };
            DirectGeocodeResponseFactory.build(options);
        } else {
            error.call(this, new ErrorService(_.getMessage('SERVICE_RESPONSE_EMPTY')));
        }
    };
    return Geocode;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, ServicesCommonService, ServicesGeocodeRequestDirectGeocodeRequestFactory, ServicesGeocodeResponseDirectGeocodeResponseFactory);
ServicesGeocodeRequestReverseGeocodeRequestFactory = function (Logger, XLS, LocationUtilityService) {
    var ReverseGeocodeRequestFactory = {
        build: function (options) {
            var settings = options || {};
            var request = null;
            var oLUS = new LocationUtilityService({
                position: settings.position,
                returnFreeForm: settings.returnFreeForm,
                filterOptions: settings.filterOptions
            });
            var oXLS = new XLS({
                srsName: settings.srs,
                maximumResponses: settings.maximumResponses
            });
            oXLS.namespace = true;
            oXLS.setService(oLUS);
            request = oXLS.build();
            if (settings.httpMethod == 'GET') {
                var myRequest = 'qxml=' + encodeURIComponent(request).replace(/\-/g, '%2D').replace(/\_/g, '%5F').replace(/\./g, '%2E').replace(/\!/g, '%21').replace(/\~/g, '%7E').replace(/\*/g, '%2A').replace(/\'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
                request = myRequest;
            }
            return request;
        }
    };
    return ReverseGeocodeRequestFactory;
}(UtilsLoggerByDefault, FormatsXLS, FormatsXLSLocationUtilityService);
ServicesGeocodeResponseModelReverseGeocodedLocation = function (GeocodedLocation) {
    function ReverseGeocodedLocation() {
        if (!(this instanceof ReverseGeocodedLocation)) {
            throw new TypeError('ReverseGeocodedLocation constructor cannot be called as a function.');
        }
        GeocodedLocation.apply(this, arguments);
        this.CLASSNAME = 'ReverseGeocodedLocation';
        this.searchCenterDistance = null;
    }
    ReverseGeocodedLocation.prototype = Object.create(GeocodedLocation.prototype);
    ReverseGeocodedLocation.prototype.constructor = ReverseGeocodedLocation;
    return ReverseGeocodedLocation;
}(ServicesGeocodeResponseModelGeocodedLocation);
ServicesGeocodeFormatsReverseGeocodeResponseReader = function (Logger, MR, ErrSrv, ReverseGeocodeResponse, ReverseGeocodedLocation) {
    var ReverseGeocodeResponseReader = {};
    ReverseGeocodeResponseReader.VERSION = '1.2';
    ReverseGeocodeResponseReader.NAMESPACES = {
        xmlns: 'http://www.opengis.net/xls',
        gml: 'http://www.opengis.net/gml',
        xls: 'http://www.opengis.net/xls',
        xlsext: 'http://www.opengis.net/xlsext',
        xsi: 'http://www.w3.org/2001/XMLSchema-instance'
    };
    ReverseGeocodeResponseReader.SCHEMALOCATION = 'http://wxs.ign.fr/schemas/olsAll.xsd';
    ReverseGeocodeResponseReader.DEFAULTPREFIX = 'xls';
    ReverseGeocodeResponseReader.READERS = {
        xls: {
            XLS: function (root) {
                var reverseGeocodeResponse = new ReverseGeocodeResponse();
                __checkServiceAttributes(root);
                __getChildNodes(root, reverseGeocodeResponse);
                return reverseGeocodeResponse;
            },
            ReverseGeocodedLocation: function (node, reverseGeocodeResponse) {
                var reverseGeocodedLocation = new ReverseGeocodedLocation();
                __getChildNodes(node, reverseGeocodedLocation);
                if (reverseGeocodeResponse && Array.isArray(reverseGeocodeResponse.locations)) {
                    reverseGeocodeResponse.locations.push(reverseGeocodedLocation);
                }
            },
            Address: function (node, reverseGeocodedLocation) {
                var countrycode = node.getAttribute('countryCode');
                if (reverseGeocodedLocation && countrycode) {
                    reverseGeocodedLocation.type = countrycode;
                }
                __getChildNodes(node, reverseGeocodedLocation);
            },
            Building: function (node, reverseGeocodedLocation) {
                var num = node.getAttribute('number');
                if (reverseGeocodedLocation && reverseGeocodedLocation.hasOwnProperty('placeAttributes')) {
                    if (num) {
                        reverseGeocodedLocation.placeAttributes.number = num;
                    } else if (node.getAttribute('buildingName')) {
                        reverseGeocodedLocation.placeAttributes.number = node.getAttribute('buildingName');
                    } else if (node.getAttribute('subdivision')) {
                        reverseGeocodedLocation.placeAttributes.number = node.getAttribute('subdivision');
                    }
                }
            },
            Street: function (node, reverseGeocodedLocation) {
                if (reverseGeocodedLocation.type === 'StreetAddress') {
                    reverseGeocodedLocation.placeAttributes.street = __getChildValue(node);
                } else if (reverseGeocodedLocation.type === 'CadastralParcel') {
                    reverseGeocodedLocation.placeAttributes.cadastralParcel = __getChildValue(node);
                }
            },
            Place: function (node, reverseGeocodedLocation) {
                var placeType = node.getAttribute('type');
                var placeName = __getChildValue(node);
                if (reverseGeocodedLocation && reverseGeocodedLocation.hasOwnProperty('placeAttributes')) {
                    if (placeType === 'Municipality') {
                        reverseGeocodedLocation.placeAttributes.municipality = placeName;
                    } else if (placeType === 'Bbox') {
                        var values = placeName.split(';');
                        if (values.length === 4) {
                            reverseGeocodedLocation.placeAttributes.bbox = {
                                left: parseFloat(values[0]),
                                right: parseFloat(values[2]),
                                top: parseFloat(values[1]),
                                bottom: parseFloat(values[3])
                            };
                        }
                    } else if (placeType === 'Commune') {
                        reverseGeocodedLocation.placeAttributes.commune = placeName;
                    } else if (placeType === 'Departement') {
                        reverseGeocodedLocation.placeAttributes.department = placeName;
                    } else if (placeType === 'INSEE') {
                        reverseGeocodedLocation.placeAttributes.insee = placeName;
                    } else if (placeType === 'Qualite') {
                        reverseGeocodedLocation.placeAttributes.quality = placeName;
                    } else if (placeType === 'Territoire') {
                        reverseGeocodedLocation.placeAttributes.territory = placeName;
                    } else if (placeType === 'ID') {
                        reverseGeocodedLocation.placeAttributes.ID = placeName;
                    } else if (placeType === 'ID_TR') {
                        reverseGeocodedLocation.placeAttributes.IDTR = placeName;
                    } else if (placeType === 'Importance') {
                        reverseGeocodedLocation.placeAttributes.importance = parseInt(placeName, 10);
                    } else if (placeType === 'Nature') {
                        reverseGeocodedLocation.placeAttributes.nature = placeName;
                    } else if (placeType === 'Numero') {
                        reverseGeocodedLocation.placeAttributes.number = placeName;
                    } else if (placeType === 'Feuille') {
                        reverseGeocodedLocation.placeAttributes.sheet = placeName;
                    } else if (placeType === 'Section') {
                        reverseGeocodedLocation.placeAttributes.section = placeName;
                    } else if (placeType === 'CommuneAbsorbee') {
                        reverseGeocodedLocation.placeAttributes.absorbedCity = placeName;
                    } else if (placeType === 'Arrondissement') {
                        if (placeName) {
                            reverseGeocodedLocation.placeAttributes.arrondissement = placeName;
                        }
                    } else if (placeType === 'Type') {
                        reverseGeocodedLocation.placeAttributes.origin = placeName;
                    } else if (placeType === 'Prefecture') {
                        reverseGeocodedLocation.placeAttributes.prefecture = placeName;
                    } else if (placeType === 'InseeRegion') {
                        reverseGeocodedLocation.placeAttributes.inseeRegion = placeName;
                    } else if (placeType === 'InseeDepartment') {
                        reverseGeocodedLocation.placeAttributes.inseeDepartment = placeName;
                    }
                }
            },
            PostalCode: function (node, reverseGeocodedLocation) {
                if (reverseGeocodedLocation && reverseGeocodedLocation.hasOwnProperty('placeAttributes')) {
                    reverseGeocodedLocation.placeAttributes.postalCode = __getChildValue(node);
                }
            },
            SearchCentreDistance: function (node, reverseGeocodedLocation) {
                if (reverseGeocodedLocation) {
                    reverseGeocodedLocation.searchCenterDistance = parseFloat(node.getAttribute('value'));
                }
            },
            Error: function (node) {
                var srvMess = node.getAttribute('message');
                var errorCode = node.getAttribute('errorCode');
                var message = MR.getMessage('SERVICE_RESPONSE_EXCEPTION', '(' + errorCode + ') : ' + srvMess);
                throw new ErrSrv({
                    message: message,
                    type: ErrSrv.TYPE_SRVERR
                });
            }
        },
        gml: {
            pos: function (node, reverseGeocodedLocation) {
                var pos = __getChildValue(node);
                if (reverseGeocodedLocation && pos) {
                    reverseGeocodedLocation.position = {
                        x: parseFloat(pos.split(' ')[0]),
                        y: parseFloat(pos.split(' ')[1])
                    };
                }
            }
        },
        xlsext: {
            ExtendedGeocodeMatchCode: function (node, reverseGeocodedLocation) {
                if (reverseGeocodedLocation) {
                    reverseGeocodedLocation.matchType = __getChildValue(node);
                }
            }
        },
        ExceptionReport: function (node) {
            var response = {};
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (child.nodeName === 'Exception') {
                        response.exceptionReport = ReverseGeocodeResponseReader.READERS['Exception'](child);
                    }
                }
            }
            return response;
        },
        Exception: function (node) {
            var exceptionReport = {};
            var exceptionCode = node.getAttribute('exceptionCode');
            if (exceptionCode) {
                exceptionReport.exceptionCode = exceptionCode;
            }
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                exceptionReport.exception = textNode.nodeValue;
            }
            return exceptionReport;
        }
    };
    ReverseGeocodeResponseReader.read = function (root) {
        if (root.nodeName === 'XLS') {
            var nsPrefix = root.prefix;
            if (!nsPrefix) {
                nsPrefix = ReverseGeocodeResponseReader.DEFAULTPREFIX;
            }
            var geocodeResponse = ReverseGeocodeResponseReader.READERS[nsPrefix][root.nodeName](root);
            return geocodeResponse;
        } else if (root.nodeName === 'ExceptionReport') {
            var exceptionReport = ReverseGeocodeResponseReader.READERS[root.nodeName](root);
            return exceptionReport;
        } else {
            throw new Error('Erreur lors de la lecture de la réponse : elle n\'est pas au format attendu.');
        }
    };
    function __getAttributes(node) {
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
    function __getChildNodes(node, data) {
        if (node.hasChildNodes()) {
            var children = node.childNodes;
            var child;
            var childName;
            var childPrefix;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (child.nodeType === 1) {
                    childName = child.localName || child.baseName || child.nodeName;
                    childPrefix = child.prefix || ReverseGeocodeResponseReader.DEFAULTPREFIX;
                    if (ReverseGeocodeResponseReader.READERS[childPrefix][childName]) {
                        var reader = ReverseGeocodeResponseReader.READERS[childPrefix][childName];
                        reader(child, data);
                    } else {
                        __getChildNodes(child, data);
                    }
                }
            }
        }
    }
    function __getChildValue(node) {
        var textNode;
        var value = '';
        if (node.hasChildNodes()) {
            textNode = node.firstChild;
            if (textNode.nodeType === 3) {
                value = textNode.nodeValue;
            }
        }
        return value;
    }
    function __checkServiceAttributes(XLSNode) {
        if (XLSNode.attributes.length > 0) {
            var xlsAttributes = __getAttributes(XLSNode);
            for (var att in xlsAttributes) {
                if (xlsAttributes.hasOwnProperty(att)) {
                    if (att === 'version') {
                        if (xlsAttributes['version'] !== ReverseGeocodeResponseReader.VERSION) {
                            console.log('[ReverseGeocodeResponseReader] geocode version is not the expected one : there may be errors in parsing');
                            return;
                        }
                    }
                    if (att === 'xmlns') {
                        if (xlsAttributes[att] !== ReverseGeocodeResponseReader.NAMESPACES[ReverseGeocodeResponseReader.DEFAULTPREFIX]) {
                            console.log('[ReverseGeocodeResponseReader] geocode response default namespace is not the expected one');
                            return;
                        }
                        continue;
                    }
                    var prefix = att.split(':')[0];
                    var ns = att.split(':')[1];
                    if (prefix === 'xmlns' && ns) {
                        if (ReverseGeocodeResponseReader.NAMESPACES[ns]) {
                            if (ReverseGeocodeResponseReader.NAMESPACES[ns] !== xlsAttributes[att]) {
                                console.log('[ReverseGeocodeResponseReader] geocode response ' + att + ' namespace is not the expected one');
                                return;
                            }
                        }
                    }
                    if (ns === 'schemaLocation') {
                        if (ReverseGeocodeResponseReader.SCHEMALOCATION !== xlsAttributes[att]) {
                            console.log('[ReverseGeocodeResponseReader] geocode response schema location is not the expected one');
                            return;
                        }
                    }
                }
            }
        }
    }
    return ReverseGeocodeResponseReader;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, ServicesGeocodeResponseModelGeocodeResponse, ServicesGeocodeResponseModelReverseGeocodedLocation);
ServicesGeocodeResponseReverseGeocodeResponseFactory = function (Logger, MRes, ErrorService, XML, ReverseGeocodeResponseReader) {
    var ReverseGeocodeReponseFactory = {
        build: function (options) {
            var data = null;
            if (options.response) {
                if (options.rawResponse) {
                    data = options.response;
                } else {
                    try {
                        var p = new XML({ reader: ReverseGeocodeResponseReader });
                        if (typeof options.response === 'string') {
                            p.setXMLString(options.response);
                        } else {
                            p.setXMLDoc(options.response);
                        }
                        data = p.parse();
                        if (!data) {
                            throw new Error('L\'analyse de la réponse du service !?');
                        }
                    } catch (e) {
                        e.status = 200;
                        options.onError.call(options.scope, e);
                        return;
                    }
                    if (data.exceptionReport) {
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', data.exceptionReport),
                            type: ErrorService.TYPE_SRVERR,
                            status: 200
                        }));
                        return;
                    }
                    if (options.scope && options.scope.options && options.scope.options.srs && options.scope.options.srs !== 'EPSG:4326') {
                        var location;
                        var pos;
                        if (data || data.locations || data.locations.length) {
                            for (var i = 0; i < data.locations.length; i++) {
                                location = data.locations[i];
                                if (location) {
                                    pos = location.position;
                                    if (pos) {
                                        location.position = {
                                            x: pos.y,
                                            y: pos.x
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                options.onError.call(options.scope, new ErrorService({
                    message: MRes.getMessage('SERVICE_RESPONSE_EMPTY'),
                    type: ErrorService.TYPE_SRVERR,
                    status: -1
                }));
                return;
            }
            options.onSuccess.call(options.scope, data);
            return;
        }
    };
    return ReverseGeocodeReponseFactory;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, FormatsXML, ServicesGeocodeFormatsReverseGeocodeResponseReader);
ServicesGeocodeReverseGeocode = function (Logger, _, ErrorService, CommonService, ReverseGeocodeRequestFactory, ReverseGeocodeResponseFactory) {
    function ReverseGeocode(options) {
        if (!(this instanceof ReverseGeocode)) {
            throw new TypeError(_.getMessage('CLASS_CONSTRUCTOR', 'ReverseGeocode'));
        }
        this.CLASSNAME = 'ReverseGeocode';
        CommonService.apply(this, arguments);
        if (!options.position) {
            throw new Error(_.getMessage('PARAM_MISSING', 'position'));
        }
        if (options.position.x == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'position.x'));
        }
        if (options.position.y == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'position.y'));
        }
        this.options.position = options.position;
        if (!options.filterOptions || typeof options.filterOptions !== 'object') {
            this.options.filterOptions = options.filterOptions = { type: ['StreetAddress'] };
        }
        if (Object.keys(options.filterOptions).length === 0) {
            this.options.filterOptions = { type: ['StreetAddress'] };
        }
        var filter = Object.keys(options.filterOptions);
        for (var i = 0; i < filter.length; i++) {
            var key = filter[i];
            if (!options.filterOptions[key] || Object.keys(options.filterOptions[key]).length === 0) {
                delete this.options.filterOptions[key];
            }
        }
        this.options.filterOptions.type = options.filterOptions.type || ['StreetAddress'];
        if (!Array.isArray(this.options.filterOptions.type)) {
            throw new Error(_.getMessage('PARAM_TYPE', 'filterOptions.type'));
        }
        this.options.maximumResponses = options.maximumResponses || 25;
        this.options.returnFreeForm = options.returnFreeForm || false;
        this.options.srs = options.srs || 'CRS:84';
        if (ReverseGeocode.geoEPSG.indexOf(this.options.srs) === -1) {
            this.options.position = {
                x: this.options.position.y,
                y: this.options.position.x
            };
            if (this.options.filterOptions && this.options.filterOptions.circle) {
                var circle = this.options.filterOptions.circle;
                this.options.filterOptions.circle = {
                    x: circle.y,
                    y: circle.x,
                    radius: circle.radius
                };
            }
            if (this.options.filterOptions && this.options.filterOptions.polygon) {
                var polygon = this.options.filterOptions.polygon;
                for (i = 0; i < polygon.length; i++) {
                    var coords = polygon[i];
                    this.options.filterOptions.polygon[i] = {
                        x: coords.y,
                        y: coords.x
                    };
                }
            }
        }
        this.options.outputFormat = this.options.rawResponse ? '' : 'xml';
    }
    ReverseGeocode.prototype = Object.create(CommonService.prototype, {});
    ReverseGeocode.prototype.constructor = ReverseGeocode;
    ReverseGeocode.prototype.buildRequest = function (error, success) {
        var options = {
            httpMethod: this.options.httpMethod,
            position: this.options.position,
            returnFreeForm: this.options.returnFreeForm,
            filterOptions: this.options.filterOptions,
            srs: 'EPSG:4326',
            maximumResponses: this.options.maximumResponses
        };
        this.request = ReverseGeocodeRequestFactory.build(options);
        if (!this.request) {
            error.call(this, new ErrorService(_.getMessage('SERVICE_REQUEST_BUILD')));
        } else {
            success.call(this, this.request);
        }
    };
    ReverseGeocode.prototype.analyzeResponse = function (error, success) {
        if (this.response) {
            var options = {
                response: this.response,
                rawResponse: this.options.rawResponse,
                onError: error,
                onSuccess: success,
                scope: this
            };
            ReverseGeocodeResponseFactory.build(options);
        } else {
            error.call(this, new ErrorService(_.getMessage('SERVICE_RESPONSE_EMPTY')));
        }
    };
    ReverseGeocode.geoEPSG = ['EPSG:4326'];
    return ReverseGeocode;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, ServicesCommonService, ServicesGeocodeRequestReverseGeocodeRequestFactory, ServicesGeocodeResponseReverseGeocodeResponseFactory);
ServicesAutoCompleteResponseModelAutoCompleteResponse = function () {
    function AutoCompleteResponse() {
        if (!(this instanceof AutoCompleteResponse)) {
            throw new TypeError('AutoCompleteResponse constructor cannot be called as a function.');
        }
        this.suggestedLocations = [];
    }
    AutoCompleteResponse.prototype = { constructor: AutoCompleteResponse };
    return AutoCompleteResponse;
}();
ServicesAutoCompleteResponseModelSuggestedLocation = function () {
    function SuggestedLocation() {
        if (!(this instanceof SuggestedLocation)) {
            throw new TypeError('SuggestedLocation constructor cannot be called as a function.');
        }
        this.type = null;
        this.position = {
            x: null,
            y: null
        };
        this.commune = null;
        this.fullText = null;
        this.postalCode = null;
        this.classification = null;
        this.street = null;
        this.poi = null;
        this.kind = null;
    }
    SuggestedLocation.prototype = { constructor: SuggestedLocation };
    return SuggestedLocation;
}();
ServicesAutoCompleteResponseAutoCompleteResponseFactory = function (Logger, ErrorService, MRes, XML, AutoCompleteResponse, SuggestedLocation) {
    var AutoCompleteResponseFactory = {
        build: function (options) {
            var data = null;
            if (options.response) {
                if (options.rawResponse) {
                    data = options.response;
                } else {
                    var JSONResponse;
                    if (typeof options.response === 'string') {
                        JSONResponse = window.JSON.parse(options.response);
                    } else {
                        JSONResponse = options.response;
                    }
                    if (JSONResponse) {
                        if (JSONResponse.error) {
                            options.onError.call(options.scope, new ErrorService({
                                message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', JSONResponse.error.description),
                                status: JSONResponse.error.code,
                                type: ErrorService.TYPE_SRVERR
                            }));
                            return;
                        }
                        data = new AutoCompleteResponse();
                        if (JSONResponse.results && Array.isArray(JSONResponse.results)) {
                            var suggestedLocation;
                            for (var i = 0; i < JSONResponse.results.length; i++) {
                                var result = JSONResponse.results[i];
                                suggestedLocation = new SuggestedLocation();
                                if (suggestedLocation) {
                                    if (result && result.country === 'StreetAddress') {
                                        suggestedLocation.street = result.street;
                                        suggestedLocation.type = 'StreetAddress';
                                    } else if (result && result.country === 'PositionOfInterest') {
                                        suggestedLocation.poi = result.street;
                                        suggestedLocation.kind = result.kind;
                                        suggestedLocation.type = 'PositionOfInterest';
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
                                data.suggestedLocations.push(suggestedLocation);
                            }
                        } else {
                            options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_FORMAT_3')));
                            return;
                        }
                        if (!data.suggestedLocations.length) {
                            options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_FORMAT_3')));
                            return;
                        }
                    }
                    if (!data) {
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_ANALYSE_2'),
                            type: ErrorService.TYPE_UNKERR,
                            status: -1
                        }));
                        return;
                    }
                    if (data.exceptionReport) {
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', data.exceptionReport),
                            type: ErrorService.TYPE_SRVERR,
                            status: 200
                        }));
                        return;
                    }
                }
            } else {
                options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EMPTY')));
                return;
            }
            options.onSuccess.call(options.scope, data);
            return;
        }
    };
    return AutoCompleteResponseFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, UtilsMessagesResources, FormatsXML, ServicesAutoCompleteResponseModelAutoCompleteResponse, ServicesAutoCompleteResponseModelSuggestedLocation);
ServicesAutoCompleteAutoComplete = function (CommonService, AutoCompleteResponseFactory, Logger, MR, ErrorService, Helper) {
    function AutoComplete(options) {
        if (!(this instanceof AutoComplete)) {
            throw new TypeError(MR.getMessage('CLASS_CONSTRUCTOR', 'AutoComplete'));
        }
        this.CLASSNAME = 'AutoComplete';
        CommonService.apply(this, arguments);
        if (!options.text) {
            throw new Error(MR.getMessage('PARAM_MISSING', 'text'));
        }
        this.options.text = options.text;
        if (!options.filterOptions || typeof options.filterOptions !== 'object') {
            this.options.filterOptions = options.filterOptions = {
                territory: [],
                type: ['StreetAddress']
            };
        }
        if (Object.keys(options.filterOptions).length === 0) {
            this.options.filterOptions = {
                territory: [],
                type: ['StreetAddress']
            };
        }
        this.options.filterOptions.type = options.filterOptions.type || ['StreetAddress'];
        this.options.filterOptions.territory = options.filterOptions.territory || [];
        this.options.maximumResponses = options.maximumResponses || 10;
        if (this.options.protocol === 'XHR' && this.options.httpMethod === 'POST') {
            this.options.httpMethod = 'GET';
        }
        this.options.outputFormat = this.options.rawResponse ? '' : 'json';
    }
    AutoComplete.prototype = Object.create(CommonService.prototype, {});
    AutoComplete.prototype.constructor = AutoComplete;
    AutoComplete.prototype.buildRequest = function (error, success) {
        var territories = '';
        if (this.options.filterOptions.territory) {
            territories = this.options.filterOptions.territory.join(';');
        }
        var types = '';
        if (this.options.filterOptions.type) {
            types = this.options.filterOptions.type.join(',');
        }
        this.request = Helper.normalyzeParameters({
            text: encodeURIComponent(this.options.text),
            type: types,
            terr: territories,
            maximumResponses: this.options.maximumResponses
        });
        success.call(this, this.request);
    };
    AutoComplete.prototype.analyzeResponse = function (error, success) {
        if (this.response) {
            var options = {
                response: this.response,
                rawResponse: this.options.rawResponse,
                onSuccess: success,
                onError: error,
                scope: this
            };
            AutoCompleteResponseFactory.build(options);
        } else {
            error.call(this, new ErrorService(MR.getMessage('SERVICE_RESPONSE_EMPTY')));
        }
    };
    return AutoComplete;
}(ServicesCommonService, ServicesAutoCompleteResponseAutoCompleteResponseFactory, UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, UtilsHelper);
FormatsXLSRouteServiceModelRoutePlan = function (Logger) {
    function RoutePlan(options) {
        if (!(this instanceof RoutePlan)) {
            throw new TypeError('RoutePlan constructor cannot be called as a function.');
        }
        this.options = options || {};
        if (!options.startPoint) {
            throw new Error('l\'option \'startPoint\' n\'est pas renseignée !');
        }
        if (!options.endPoint) {
            throw new Error('l\'option \'endPoint\' n\'est pas renseignée !');
        }
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
    }
    RoutePlan.prototype = {
        constructor: RoutePlan,
        requestString: null,
        template: {
            routePlan: '<RoutePlan>' + '__ROUTEPREFERENCE__' + '__GRAPH__' + '__WAYPOINTLIST__' + '__AVOIDLIST__' + '</RoutePlan>',
            routePreference: '<RoutePreference>__VALUEROUTEPREFERENCE__</RoutePreference>',
            graph: '<xlsext:graphName xmlns:xlsext="http://www.opengis.net/xlsext" name="__VALUEGRAPH__"/>',
            wayPointList: {
                container: '<WayPointList>' + '__STARTPOINT__' + '__VIAPOINT__' + '__ENDPOINT__' + '</WayPointList>',
                point: '<Position><gml:Point xmlns:gml="http://www.opengis.net/gml"><gml:pos>__X__ __Y__</gml:pos></gml:Point></Position>',
                startPoint: '<StartPoint>' + '__POINT__' + '</StartPoint>',
                endPoint: '<EndPoint>' + '__POINT__' + '</EndPoint>',
                viaPoint: '<ViaPoint>' + '__POINT__' + '</ViaPoint>'
            },
            avoidList: {
                container: '<AvoidList>' + '__AVOIDFEATURE__' + '</AvoidList>',
                avoidFeature: '<AvoidFeature>__VALUEAVOIDFEATURE__</AvoidFeature>'
            }
        },
        toString: function () {
            var template = '';
            template = this.template.routePlan;
            if (this.options.routePreference) {
                var tmplPreference = this.template.routePreference;
                tmplPreference = tmplPreference.replace(/__VALUEROUTEPREFERENCE__/, this.options.routePreference);
                template = template.replace(/__ROUTEPREFERENCE__/g, tmplPreference);
            }
            template = template.replace(/__ROUTEPREFERENCE__/g, '');
            if (this.options.avoidFeature) {
                var tmplAvoidList = this.template.avoidList.container;
                var avoidFeatures = [];
                for (var i = 0; i < this.options.avoidFeature.length; i++) {
                    var tmplAvoidFeature = this.template.avoidList.avoidFeature;
                    tmplAvoidFeature = tmplAvoidFeature.replace(/__VALUEAVOIDFEATURE__/, this.options.avoidFeature[i]);
                    avoidFeatures.push(tmplAvoidFeature);
                }
                tmplAvoidList = tmplAvoidList.replace(/__AVOIDFEATURE__/, avoidFeatures.join('\n'));
                template = template.replace(/__AVOIDLIST__/g, tmplAvoidList);
            }
            template = template.replace(/__AVOIDLIST__/g, '');
            if (this.options.graph) {
                var tmplVehicle = this.template.graph;
                tmplVehicle = tmplVehicle.replace(/__VALUEGRAPH__/, this.options.graph);
                template = template.replace(/__GRAPH__/g, tmplVehicle);
            }
            template = template.replace(/__GRAPH__/g, '');
            var tmplWayPointList = this.template.wayPointList.container;
            var tmplPoint = '';
            tmplPoint = this.template.wayPointList.point;
            tmplPoint = tmplPoint.replace(/__X__/, this.options.startPoint.x);
            tmplPoint = tmplPoint.replace(/__Y__/, this.options.startPoint.y);
            tmplWayPointList = tmplWayPointList.replace(/__STARTPOINT__/, this.template.wayPointList.startPoint.replace(/__POINT__/, tmplPoint));
            tmplPoint = this.template.wayPointList.point;
            tmplPoint = tmplPoint.replace(/__X__/, this.options.endPoint.x);
            tmplPoint = tmplPoint.replace(/__Y__/, this.options.endPoint.y);
            tmplWayPointList = tmplWayPointList.replace(/__ENDPOINT__/, this.template.wayPointList.endPoint.replace(/__POINT__/, tmplPoint));
            if (this.options.viaPoint) {
                var points = [];
                for (var j = 0; j < this.options.viaPoint.length; j++) {
                    var p = this.options.viaPoint[j];
                    tmplPoint = this.template.wayPointList.point;
                    tmplPoint = tmplPoint.replace(/__X__/, p.x);
                    tmplPoint = tmplPoint.replace(/__Y__/, p.y);
                    points.push(tmplPoint);
                }
                tmplWayPointList = tmplWayPointList.replace(/__VIAPOINT__/, this.template.wayPointList.viaPoint.replace(/__POINT__/, points.join('\n')));
            } else {
                tmplWayPointList = tmplWayPointList.replace(/__VIAPOINT__/, '');
            }
            template = template.replace(/__WAYPOINTLIST__/g, tmplWayPointList);
            this.requestString = template;
            return this.requestString;
        }
    };
    return RoutePlan;
}(UtilsLoggerByDefault);
FormatsXLSRouteServiceDetermineRouteRequest = function (Logger, RoutePlan) {
    function DetermineRouteRequest(options) {
        if (!(this instanceof DetermineRouteRequest)) {
            throw new TypeError('DetermineRouteRequest constructor cannot be called as a function.');
        }
        this.options = options || {};
        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                this.options[opt] = options[opt];
            }
        }
        this.CLASSNAME = 'DetermineRouteRequest';
    }
    DetermineRouteRequest.prototype = {
        strRequest: null,
        oRoutePlan: null,
        template: {
            determineRouteRequest: '<DetermineRouteRequest distanceUnit="__DISTANCEUNIT__">' + '__ROUTEPLAN__' + '__ROUTEINSTRUCTIONREQUEST__' + '__ROUTEGEOMETRYREQUEST__' + '__ROUTEMAPREQUEST__' + '</DetermineRouteRequest>',
            routeInstructionRequest: '<RouteInstructionsRequest ' + 'provideGeometry="__PROVIDEGEOMETRY__" ' + 'provideBoundingBox="__PROVIDEBBOX__" />',
            routeGeometryRequest: '<RouteGeometryRequest />',
            routeMapRequest: ''
        },
        addRoute: function (oRoutePlan) {
            if (oRoutePlan instanceof RoutePlan) {
                this.oRoutePlan = oRoutePlan;
            }
        },
        constructor: DetermineRouteRequest,
        toString: function () {
            var template = '';
            template = this.template.determineRouteRequest;
            template = template.replace(/__DISTANCEUNIT__/g, this.options.distanceUnit || 'KM');
            if (!this.oRoutePlan) {
                var settings = this.options.route;
                this.oRoutePlan = new RoutePlan(settings);
                if (!this.oRoutePlan) {
                    throw new Error('La construction du calcul d\'initineraire n\'est pas correctement definie !?');
                }
            }
            template = template.replace(/__ROUTEPLAN__/g, this.oRoutePlan.toString());
            var tmplInstruction = this.template.routeInstructionRequest;
            tmplInstruction = tmplInstruction.replace(/__PROVIDEGEOMETRY__/g, this.options.provideGeometry || false);
            tmplInstruction = tmplInstruction.replace(/__PROVIDEBBOX__/g, this.options.provideBoundingBox || false);
            template = template.replace(/__ROUTEINSTRUCTIONREQUEST__/g, tmplInstruction);
            var tmplGeometry = this.template.routeGeometryRequest;
            template = template.replace(/__ROUTEGEOMETRYREQUEST__/g, tmplGeometry);
            var tmplMap = this.template.routeMapRequest;
            template = template.replace(/__ROUTEMAPREQUEST__/g, tmplMap);
            this.strRequest = template;
            return this.strRequest;
        }
    };
    return DetermineRouteRequest;
}(UtilsLoggerByDefault, FormatsXLSRouteServiceModelRoutePlan);
FormatsXLSRouteServiceRouteRequestExtension = undefined;
FormatsXLSRouteService = function (Logger, AbstractService, DetermineRouteRequest, RouteRequestExtension) {
    function RouteService(options) {
        if (!(this instanceof RouteService)) {
            throw new TypeError('RouteService constructor cannot be called as a function.');
        }
        this.CLASSNAME = 'RouteService';
        this.CLASSTYPE = 'RouteRequest';
        AbstractService.apply(this, arguments);
    }
    RouteService.prototype = Object.create(AbstractService.prototype, {});
    RouteService.prototype.constructor = RouteService;
    RouteService.prototype.addRequest = function (oRequest) {
        if (oRequest.CLASSNAME === 'DetermineRouteRequest') {
            this.oRequest = oRequest;
        } else {
            throw new Error('Ce n\'est pas un objet de type \'Route Request\' !?');
        }
    };
    RouteService.prototype.addFilter = function (oFilter) {
        if (oFilter instanceof RouteRequestExtension) {
            this.oFilter = oFilter;
        }
    };
    RouteService.prototype.toString = function () {
        if (!this.oRequest) {
            if (!this.options) {
                throw new Error('Les options ne sont pas renseignées, impossible de construire la requête !');
            }
            if (this.CLASSTYPE === 'RouteRequest') {
                var settings = {
                    distanceUnit: this.options.distanceUnit || null,
                    provideGeometry: this.options.provideGeometry || null,
                    provideBoundingBox: this.options.provideBoundingBox || null,
                    route: {
                        routePreference: this.options.routePreference || null,
                        startPoint: this.options.startPoint,
                        viaPoint: this.options.viaPoint || null,
                        endPoint: this.options.endPoint,
                        avoidFeature: this.options.avoidFeature || null,
                        graph: this.options.graph || null,
                        expectedStartTime: this.options.expectedStartTime || null
                    }
                };
                this.oRequest = new DetermineRouteRequest(settings);
                if (this.oFilter) {
                    this.oRequest.addFilter(this.oFilter);
                }
            }
        }
        if (!this.oRequest) {
            throw new Error('Type de requête indefini !');
        }
        this.strRequest = this.oRequest.toString();
        return this.strRequest;
    };
    return RouteService;
}(UtilsLoggerByDefault, FormatsXLSAbstractService, FormatsXLSRouteServiceDetermineRouteRequest, FormatsXLSRouteServiceRouteRequestExtension);
ServicesRouteRequestRouteRequestOLS = function (Logger, XLS, RouteService) {
    var RouteRequestOLS = {
        build: function (options) {
            var request = null;
            var settings = {
                startPoint: options.startPoint,
                endPoint: options.endPoint,
                viaPoint: options.viaPoints,
                provideBoundingBox: options.provideBbox,
                avoidFeature: options.exclusions,
                expectedStartTime: options.expectedStartTime,
                distanceUnit: options.distanceUnit,
                graph: options.graph,
                provideGeometry: options.geometryInInstructions,
                routePreference: options.routePreference
            };
            var oRS = new RouteService(settings);
            var oXLS = new XLS({
                srsName: options.srs,
                maximumResponses: options.maximumResponses
            });
            oXLS.namespace = true;
            oXLS.setService(oRS);
            request = oXLS.build();
            if (options.httpMethod == 'GET') {
                var myRequest = 'qxml=' + encodeURIComponent(request).replace(/\-/g, '%2D').replace(/\_/g, '%5F').replace(/\./g, '%2E').replace(/\!/g, '%21').replace(/\~/g, '%7E').replace(/\*/g, '%2A').replace(/\'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
                request = myRequest;
            }
            return request;
        }
    };
    return RouteRequestOLS;
}(UtilsLoggerByDefault, FormatsXLS, FormatsXLSRouteService);
ServicesRouteRequestModelRouteParamREST = function (Logger) {
    function RouteParamREST(options) {
        if (!(this instanceof RouteParamREST)) {
            throw new TypeError('RouteParamREST constructor cannot be called as a function.');
        }
        this.options = options || {};
        this.origin = this.options.startPoint.x + ',' + this.options.startPoint.y;
        this.destination = this.options.endPoint.x + ',' + this.options.endPoint.y;
        this.waypoints = this.options.viaPoints || null;
        this.startDateTime = this.options.expectedStartTime || null;
        this.graphName = this.options.graph;
        this.srs = this.options.srs;
        this.exclusions = this.options.exclusions;
        this.method = 'TIME';
        if (this.options.routePreference) {
            var value = this.options.routePreference;
            switch (value) {
            case 'fastest':
                this.method = 'TIME';
                break;
            case 'shortest':
                this.method = 'DISTANCE';
                break;
            default:
                this.method = 'TIME';
            }
        }
        this.format = this.options.geometryInInstructions ? 'STANDARDEXT' : 'STANDARD';
        this.tolerance = 10;
        this.profileId = null;
        this.profileName = null;
    }
    RouteParamREST.CLASSNAME = 'RouteParamREST';
    RouteParamREST.prototype = {
        constructor: RouteParamREST,
        getWaypoints: function () {
            if (!this.waypoints) {
                return;
            }
            var array = [];
            for (var i = 0; i < this.waypoints.length; i++) {
                var obj = this.waypoints[i];
                array.push(obj.x + ',' + obj.y);
            }
            return array.join(';');
        },
        getExclusions: function () {
            return this.exclusions.join(';');
        }
    };
    RouteParamREST.prototype.getParams = function () {
        var map = [];
        map.push({
            k: 'origin',
            v: this.origin
        });
        map.push({
            k: 'destination',
            v: this.destination
        });
        map.push({
            k: 'method',
            v: this.method
        });
        if (this.waypoints) {
            map.push({
                k: 'waypoints',
                v: this.getWaypoints()
            });
        }
        if (this.startDateTime) {
            map.push({
                k: 'startDateTime',
                v: this.startDateTime
            });
        }
        if (this.graphName) {
            map.push({
                k: 'graphName',
                v: this.graphName
            });
        }
        if (this.exclusions) {
            map.push({
                k: 'exclusions',
                v: this.getExclusions()
            });
        }
        if (this.srs) {
            map.push({
                k: 'srs',
                v: this.srs
            });
        }
        if (this.format) {
            map.push({
                k: 'format',
                v: this.format
            });
        }
        return map;
    };
    return RouteParamREST;
}(UtilsLoggerByDefault);
ServicesRouteRequestRouteRequestREST = function (Logger, _, RouteParamREST) {
    function RouteRequestREST(options) {
        if (!(this instanceof RouteRequestREST)) {
            throw new TypeError('RouteRequestREST constructor cannot be called as a function.');
        }
        if (!options) {
            throw new Error(_.getMessage('PARAM_EMPTY', 'options'));
        }
        this.settings = options;
    }
    RouteRequestREST.prototype = {
        requestString: null,
        constructor: RouteRequestREST,
        processRequestString: function () {
            var oParams = new RouteParamREST(this.settings);
            var params = oParams.getParams();
            var request = '';
            for (var i = 0; i < params.length; i++) {
                var o = params[i];
                if (request) {
                    request += '&';
                }
                request += o.k + '=' + o.v;
            }
            this.requestString = request;
            return this.requestString;
        }
    };
    return RouteRequestREST;
}(UtilsLoggerByDefault, UtilsMessagesResources, ServicesRouteRequestModelRouteParamREST);
ServicesRouteRequestRouteRequestFactory = function (Logger, ErrorService, RouteRequestOLS, RouteRequestREST) {
    var RouteRequestFactory = {
        build: function (options) {
            var request = null;
            var settings = options || {};
            var bOnError = options.onError !== null && typeof options.onError === 'function' ? true : false;
            var message = null;
            switch (options.api) {
            case 'REST':
                var myReq = new RouteRequestREST(settings);
                if (!myReq.processRequestString()) {
                    message = 'Error process request (rest) !';
                    if (bOnError) {
                        options.onError.call(options.scope, new ErrorService(message));
                        return;
                    }
                    throw new Error(message);
                }
                request = myReq.requestString;
                break;
            case 'OLS':
                request = RouteRequestOLS.build(settings);
                if (!request) {
                    message = 'Error process request (ols) !';
                    if (bOnError) {
                        options.onError.call(options.scope, new ErrorService(message));
                        return;
                    }
                    throw new Error(message);
                }
                break;
            default:
                message = 'Type of API is not supported by service (REST or OLS) !';
                if (bOnError) {
                    options.onError.call(options.scope, new ErrorService(message));
                    return;
                }
                throw new Error(message);
            }
            return request;
        }
    };
    return RouteRequestFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, ServicesRouteRequestRouteRequestOLS, ServicesRouteRequestRouteRequestREST);
FormatsWKT = function (Logger) {
    var WKT = {
        toJson: function (strWkt, success, error) {
            var json = null;
            try {
                if (!strWkt) {
                    throw new Error('La chaine WKT n\'est pas renseignée !');
                }
                if (!success) {
                    success = function (json) {
                        console.log(json);
                    };
                }
                if (!error) {
                    error = function (e) {
                        console.log(e);
                    };
                }
                var regex;
                var subst;
                var result;
                regex = /(-?\d+\.?[0-9]*)\s(-?\d+\.?[0-9]+)/g;
                subst = '[$1,$2]';
                strWkt = strWkt.replace(regex, subst);
                regex = /^(\w+)/;
                result = regex.exec(strWkt);
                if (RegExp.$1 === 'POLYGON') {
                    subst = '{"type" : "Polygon",';
                    strWkt = strWkt.replace(RegExp.$1, subst);
                    regex = /(\({2}?)/;
                    subst = '"coordinates" : [[';
                    strWkt = strWkt.replace(regex, subst);
                    regex = /(\){2}?)/;
                    subst = ']]}';
                    strWkt = strWkt.replace(regex, subst);
                    regex = /(\()/g;
                    subst = '[';
                    strWkt = strWkt.replace(regex, subst);
                    regex = /(\))/g;
                    subst = ']';
                    strWkt = strWkt.replace(regex, subst);
                } else if (RegExp.$1 === 'LINESTRING') {
                    subst = '{"type" : "LineString",';
                    strWkt = strWkt.replace(RegExp.$1, subst);
                    regex = /(\(\(?)/;
                    subst = '"coordinates" : [';
                    strWkt = strWkt.replace(regex, subst);
                    regex = /(\)\)?)/;
                    subst = ']}';
                    strWkt = strWkt.replace(regex, subst);
                }
                json = JSON.parse(strWkt);
                if (!json) {
                    throw new Error('Le JSON est vide !');
                }
                if (!json.type) {
                    throw new Error('Le type de geometrie n\'est pas connu !');
                }
                if (!json.coordinates) {
                    throw new Error('La liste des points est vide !');
                }
                success.call(this, json);
            } catch (e) {
                if (e.name === 'SyntaxError') {
                    error.call(this, 'Erreur de parsing JSON !');
                    return;
                }
                error.call(this, e);
            }
        }
    };
    return WKT;
}(UtilsLoggerByDefault);
ServicesRouteResponseModelRouteResponse = function () {
    function RouteResponse() {
        if (!(this instanceof RouteResponse)) {
            throw new TypeError('RouteResponse constructor cannot be called as a function.');
        }
        this.totalTime = null;
        this.totalDistance = null;
        this.bbox = {
            left: null,
            right: null,
            top: null,
            bottom: null
        };
        this.routeGeometry = null;
        this.routeInstructions = [];
    }
    RouteResponse.prototype = { constructor: RouteResponse };
    return RouteResponse;
}();
ServicesRouteResponseModelRouteInstruction = function () {
    function RouteInstruction() {
        if (!(this instanceof RouteInstruction)) {
            throw new TypeError('RouteInstruction constructor cannot be called as a function.');
        }
        this.duration = null;
        this.distance = null;
        this.code = null;
        this.instruction = null;
        this.geometry = null;
    }
    RouteInstruction.prototype = { constructor: RouteInstruction };
    return RouteInstruction;
}();
ServicesRouteFormatsRouteResponseRESTReader = function (Logger, WKT, MessagesResources, ErrSrv, RouteResponse, RouteInstruction) {
    var RouteResponseRESTReader = {};
    RouteResponseRESTReader.READERS = {
        routeResult: function (node) {
            var response = new RouteResponse();
            __getChildNodes(node, response);
            if (response.status === 'error') {
                var message = MessagesResources.getMessage('SERVICE_RESPONSE_EXCEPTION', response.message);
                throw new ErrSrv({
                    message: message,
                    type: ErrSrv.TYPE_SRVERR
                });
            }
            return response;
        },
        status: function (node, response) {
            var status = __getChildValue(node);
            if (status === 'ERROR' || status === 'error') {
                if (response) {
                    response.status = 'error';
                }
            }
        },
        message: function (node, response) {
            if (response) {
                response.message = __getChildValue(node);
            }
        },
        distance: function (node, response) {
            if (response) {
                response.totalDistance = __getChildValue(node);
            }
        },
        durationSeconds: function (node, response) {
            if (response) {
                response.totalTime = parseFloat(__getChildValue(node));
            }
        },
        bounds: function (node, response) {
            if (response && response.bbox) {
                var coords = __getChildValue(node).split(/[,;]/);
                response.bbox.left = parseFloat(coords[0]);
                response.bbox.bottom = parseFloat(coords[1]);
                response.bbox.right = parseFloat(coords[2]);
                response.bbox.top = parseFloat(coords[3]);
            }
        },
        geometryWkt: function (node, response) {
            if (response) {
                var geomWkt = node.innerHTML;
                var onWKTSuccess = function (json) {
                    response.routeGeometry = json;
                };
                var onWKTError = function () {
                    var msg = MessagesResources.getMessage('PARAM_FORMAT', ['geometryWkt']);
                    throw new Error(msg);
                };
                WKT.toJson(geomWkt, onWKTSuccess, onWKTError);
            }
        },
        step: function (node, response) {
            var routeInstruction = new RouteInstruction();
            var name;
            if (node.hasChildNodes) {
                var children = node.childNodes;
                var child;
                var childName;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (child.nodeType === 1) {
                        childName = child.localName || child.baseName || child.nodeName;
                        if (childName === 'durationSeconds') {
                            routeInstruction.duration = __getChildValue(child);
                        } else if (childName === 'distance') {
                            routeInstruction.distance = __getChildValue(child);
                        } else if (childName === 'navInstruction') {
                            routeInstruction.code = __getChildValue(child);
                        } else if (childName === 'name') {
                            name = __getChildValue(child);
                        }
                    }
                }
            }
            if (routeInstruction.code) {
                switch (routeInstruction.code) {
                case 'F':
                    if (name != 'Valeur non renseignée') {
                        routeInstruction.instruction = 'Tout droit ' + name;
                    } else {
                        routeInstruction.instruction = 'Continuer tout droit ';
                    }
                    break;
                case 'B':
                    routeInstruction.instruction = 'Demi-tour ' + name;
                    break;
                case 'L':
                    routeInstruction.instruction = 'Tourner à gauche ' + name;
                    break;
                case 'R':
                    routeInstruction.instruction = 'Tourner à droite ' + name;
                    break;
                case 'BL':
                    routeInstruction.instruction = 'Tourner très à gauche ' + name;
                    break;
                case 'BR':
                    routeInstruction.instruction = 'Tourner très à droite ' + name;
                    break;
                case 'FL':
                    routeInstruction.instruction = 'Tourner légèrement à gauche ' + name;
                    break;
                case 'FR':
                    routeInstruction.instruction = 'Tourner légèrement à droite ' + name;
                    break;
                case 'round_about_entry':
                    routeInstruction.instruction = 'Entrée rond-point ' + name;
                    break;
                case 'round_about_exit':
                    routeInstruction.instruction = 'Sortie rond-point ' + name;
                    break;
                case null:
                    routeInstruction.instruction = 'Prendre ' + name;
                    break;
                default:
                    routeInstruction.instruction = '?' + routeInstruction.code + '? ' + name;
                    break;
                }
            }
            if (Array.isArray(response.routeInstructions)) {
                response.routeInstructions.push(routeInstruction);
            }
        }
    };
    RouteResponseRESTReader.read = function (root) {
        var response;
        if (root.nodeName === 'routeResult') {
            response = RouteResponseRESTReader.READERS['routeResult'](root);
            return response;
        } else {
            throw new Error('Erreur lors de la lecture de la réponse : elle n\'est pas au format attendu.');
        }
    };
    function __getChildValue(node) {
        var textNode;
        var value = '';
        if (node.hasChildNodes()) {
            textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                value = textNode.nodeValue;
            }
        }
        return value;
    }
    function __getChildNodes(node, data) {
        if (node.hasChildNodes()) {
            var children = node.childNodes;
            var child;
            var childName;
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (child.nodeType === 1) {
                    childName = child.localName || child.baseName || child.nodeName;
                    if (RouteResponseRESTReader.READERS[childName]) {
                        var reader = RouteResponseRESTReader.READERS[childName];
                        reader(child, data);
                    } else {
                        __getChildNodes(child, data);
                    }
                }
            }
        }
    }
    return RouteResponseRESTReader;
}(UtilsLoggerByDefault, FormatsWKT, UtilsMessagesResources, ExceptionsErrorService, ServicesRouteResponseModelRouteResponse, ServicesRouteResponseModelRouteInstruction);
ServicesRouteFormatsRouteResponseOLSReader = function (Logger) {
    var RouteResponseOLSReader = {};
    RouteResponseOLSReader.READERS = {};
    RouteResponseOLSReader.read = function (root) {
    };
    return RouteResponseOLSReader;
}(UtilsLoggerByDefault);
ServicesRouteResponseRouteResponseFactory = function (Logger, ErrorService, XML, WKT, MRes, RouteResponseRESTReader, RouteResponseOLSReader, RouteResponse, RouteInstruction) {
    var RouteResponseFactory = {
        build: function (options) {
            var data = null;
            if (options.response) {
                if (options.rawResponse) {
                    data = options.response;
                } else {
                    switch (options.outputFormat) {
                    case 'xml':
                        var routeReader = options.api === 'REST' ? RouteResponseRESTReader : RouteResponseOLSReader;
                        try {
                            var p = new XML({ reader: routeReader });
                            if (typeof options.response === 'string') {
                                p.setXMLString(options.response);
                            } else {
                                p.setXMLDoc(options.response);
                            }
                            data = p.parse();
                            if (!data) {
                                throw new ErrorService(MRes.getMessage('SERVICE_RESPONSE_FORMAT', 'xml'));
                            }
                        } catch (e) {
                            options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_ANALYSE', options.response)));
                            return;
                        }
                        break;
                    case 'json':
                        var JSONResponse;
                        if (typeof options.response === 'string') {
                            JSONResponse = window.JSON.parse(options.response);
                        } else {
                            JSONResponse = options.response;
                        }
                        if (JSONResponse.message) {
                            options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', JSONResponse.message)));
                            return;
                        }
                        if (JSONResponse) {
                            var legs = [];
                            var legSteps = [];
                            var steps = [];
                            data = new RouteResponse();
                            if (data.hasOwnProperty('totalTime')) {
                                data.totalTime = parseFloat(JSONResponse.durationSeconds);
                            }
                            if (data.hasOwnProperty('totalDistance')) {
                                data.totalDistance = options.distanceUnit === 'm' ? JSONResponse.distanceMeters : JSONResponse.distance;
                            }
                            if (data.hasOwnProperty('bbox')) {
                                var coords = JSONResponse.bounds.split(/[,;]/);
                                data.bbox.left = parseFloat(coords[0]);
                                data.bbox.bottom = parseFloat(coords[1]);
                                data.bbox.right = parseFloat(coords[2]);
                                data.bbox.top = parseFloat(coords[3]);
                            }
                            var onWKTSuccess = function (json) {
                                data.routeGeometry = json;
                            };
                            var onWKTError = function (e) {
                                console.log(e);
                                options.onError.call(options.scope, new ErrorService(MRes.getMessage('PARAM_FORMAT', ['geometryWkt'])));
                            };
                            if (data.hasOwnProperty('routeGeometry')) {
                                var geometry = JSONResponse.geometryWkt || JSONResponse.simplifiedWkt;
                                if (geometry) {
                                    WKT.toJson(geometry, onWKTSuccess, onWKTError);
                                    if (!data.routeGeometry) {
                                        return;
                                    }
                                }
                            }
                            if (data.hasOwnProperty('routeInstructions')) {
                                var legList = JSONResponse.legs;
                                var i;
                                if (Array.isArray(legList) && legList.length) {
                                    for (i = 0; i < legList.length; i++) {
                                        legs.push(legList[i]);
                                    }
                                }
                                if (Array.isArray(legs) && legs.length) {
                                    for (i = 0; i < legs.length; i++) {
                                        legSteps.push(legs[i].steps);
                                    }
                                }
                                if (Array.isArray(legSteps) && legSteps.length) {
                                    for (i = 0; i < legSteps.length; i++) {
                                        steps = steps.concat(legSteps[i]);
                                    }
                                }
                                steps.forEach(function (step) {
                                    data.routeInstructions.push(new RouteInstruction());
                                    data.routeInstructions[data.routeInstructions.length - 1].duration = step.durationSeconds;
                                    data.routeInstructions[data.routeInstructions.length - 1].distance = options.distanceUnit === 'm' ? step.distanceMeters : step.distance;
                                    data.routeInstructions[data.routeInstructions.length - 1].code = step.navInstruction;
                                    var points = [];
                                    for (var i = 0; i < step.points.length; i++) {
                                        var point = step.points[i].split(',');
                                        if (point) {
                                            points.push(point);
                                        }
                                    }
                                    if (points && points.length !== 0) {
                                        data.routeInstructions[data.routeInstructions.length - 1].geometry = {
                                            coordinates: points,
                                            type: 'LineString'
                                        };
                                    } else {
                                        data.routeInstructions[data.routeInstructions.length - 1].geometry = null;
                                    }
                                    if (step.name == 'Valeur non renseignée') {
                                        step.name = '';
                                    }
                                    switch (step.navInstruction) {
                                    case 'F':
                                        if (step.name) {
                                            data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Tout droit ' + step.name;
                                        } else {
                                            data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Continuer tout droit ';
                                        }
                                        break;
                                    case 'B':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Demi-tour ' + step.name;
                                        break;
                                    case 'L':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Tourner à gauche ' + step.name;
                                        break;
                                    case 'R':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Tourner à droite ' + step.name;
                                        break;
                                    case 'BL':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Tourner très à gauche ' + step.name;
                                        break;
                                    case 'BR':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Tourner très à droite ' + step.name;
                                        break;
                                    case 'FL':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Tourner légèrement à gauche ' + step.name;
                                        break;
                                    case 'FR':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Tourner légèrement à droite ' + step.name;
                                        break;
                                    case 'round_about_entry':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Entrée rond-point ' + step.name;
                                        break;
                                    case 'round_about_exit':
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Sortie rond-point ' + step.name;
                                        break;
                                    case null:
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = 'Prendre tout droit ' + step.name;
                                        break;
                                    default:
                                        data.routeInstructions[data.routeInstructions.length - 1].instruction = '?' + step.navInstruction + '? ' + step.name;
                                        break;
                                    }
                                });
                            }
                        }
                        if (!data) {
                            options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_ANALYSE', 'json')));
                            return;
                        }
                        break;
                    default:
                        options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_FORMAT', 'json', 'xml')));
                        return;
                    }
                    if (data && data.exceptionReport) {
                        options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EXCEPTION_2')));
                        return;
                    }
                }
            } else {
                options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EMPTY')));
                return;
            }
            options.onSuccess.call(options.scope, data);
            return;
        }
    };
    return RouteResponseFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, FormatsXML, FormatsWKT, UtilsMessagesResources, ServicesRouteFormatsRouteResponseRESTReader, ServicesRouteFormatsRouteResponseOLSReader, ServicesRouteResponseModelRouteResponse, ServicesRouteResponseModelRouteInstruction);
ServicesRouteRoute = function (Logger, _, ErrorService, CommonService, DefaultUrlService, RouteRequestFactory, RouteResponseFactory) {
    function Route(options) {
        if (!(this instanceof Route)) {
            throw new TypeError(_.getMessage('CLASS_CONSTRUCTOR', 'Route'));
        }
        this.CLASSNAME = 'Route';
        CommonService.apply(this, arguments);
        if (!options.startPoint) {
            throw new Error(_.getMessage('PARAM_MISSING', 'startPoint'));
        }
        if (options.startPoint.x == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'startPoint.x'));
        }
        if (options.startPoint.y == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'startPoint.y'));
        }
        if (!options.endPoint) {
            throw new Error(_.getMessage('PARAM_MISSING', 'endPoint'));
        }
        if (options.endPoint.x == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'endPoint.x'));
        }
        if (options.endPoint.y == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'endPoint.y'));
        }
        this.options.api = typeof options.api == 'string' ? options.api.toUpperCase() : 'REST';
        this.options.outputFormat = typeof options.outputFormat == 'string' ? options.outputFormat.toLowerCase() : 'json';
        this.options.startPoint = options.startPoint;
        this.options.endPoint = options.endPoint;
        this.options.viaPoints = options.viaPoints || null;
        this.options.exclusions = options.exclusions || null;
        this.options.routePreference = options.routePreference || 'fastest';
        this.options.graph = options.graph || 'Voiture';
        this.options.geometryInInstructions = options.geometryInInstructions || false;
        this.options.provideBbox = options.provideBbox || true;
        this.options.distanceUnit = options.distanceUnit || 'km';
        this.options.expectedStartTime = null;
        this.options.srs = options.srs || 'EPSG:4326';
        this.options.api = 'REST';
        if (this.options.protocol === 'XHR') {
            this.options.httpMethod = 'GET';
        }
        if (!this.options.serverUrl) {
            var lstUrlByDefault = DefaultUrlService.Route.url(this.options.apiKey);
            var urlFound = null;
            switch (this.options.api) {
            case 'OLS':
                urlFound = lstUrlByDefault.ols;
                break;
            case 'REST':
                var key = 'route' + '-' + this.options.outputFormat;
                urlFound = lstUrlByDefault[key];
                break;
            default:
                throw new Error(_.getMessage('PARAM_UNKNOWN', 'api'));
            }
            if (!urlFound) {
                throw new Error('Url by default not found !');
            }
            this.options.serverUrl = urlFound;
        }
        var idx = this.options.serverUrl.lastIndexOf('.');
        if (idx !== -1) {
            var extension = this.options.serverUrl.substring(idx + 1);
            if (extension && extension.length < 5) {
                switch (extension.toLowerCase()) {
                case 'json':
                case 'xml':
                    this.options.outputFormat = extension.toLowerCase();
                    break;
                default:
                    throw new Error('type of service : unknown or unsupported (json or xml) !');
                }
            }
        }
    }
    Route.prototype = Object.create(CommonService.prototype, {});
    Route.prototype.constructor = Route;
    Route.prototype.buildRequest = function (error, success) {
        var options = {
            api: this.options.api,
            startPoint: this.options.startPoint,
            endPoint: this.options.endPoint,
            viaPoints: this.options.viaPoints,
            provideBbox: this.options.provideBbox,
            exclusions: this.options.exclusions,
            distanceUnit: this.options.distanceUnit,
            graph: this.options.graph,
            geometryInInstructions: this.options.geometryInInstructions,
            routePreference: this.options.routePreference,
            srs: this.options.srs
        };
        this.request = RouteRequestFactory.build(options);
        if (!this.request) {
            error.call(this, new ErrorService(_.getMessage('SERVICE_REQUEST_BUILD')));
        } else {
            success.call(this, this.request);
        }
    };
    Route.prototype.analyzeResponse = function (error, success) {
        if (this.response) {
            var options = {
                distanceUnit: this.options.distanceUnit,
                response: this.response,
                outputFormat: this.options.outputFormat,
                api: this.options.api,
                rawResponse: this.options.rawResponse,
                onError: error,
                onSuccess: success,
                scope: this
            };
            RouteResponseFactory.build(options);
        } else {
            error.call(this, new ErrorService(_.getMessage('SERVICE_RESPONSE_EMPTY')));
        }
    };
    return Route;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, ServicesCommonService, ServicesDefaultUrlService, ServicesRouteRequestRouteRequestFactory, ServicesRouteResponseRouteResponseFactory);
ServicesProcessIsoCurveRequestModelProcessIsoCurveParam = function (Logger) {
    function ProcessIsoCurveParam(options) {
        if (!(this instanceof ProcessIsoCurveParam)) {
            throw new TypeError('ProcessIsoCurveParam constructor cannot be called as a function.');
        }
        this.options = options || {};
        this.id = this.options.id;
        this.location = this.options.position;
        this.srs = this.options.srs;
        this.graphName = this.options.graph;
        this.profileId = this.options.profileId || null;
        this.profileName = this.options.profileName || null;
        this.exclusions = this.options.exclusions;
        this.reverse = this.options.reverse;
        this.smoothing = this.options.smoothing;
        this.holes = this.options.holes;
        var value = this.options.method;
        switch (value) {
        case 'time':
            this.method = 'time';
            this.time = this.options.time;
            break;
        case 'distance':
            this.method = 'distance';
            this.distance = this.options.distance;
            break;
        default:
            this.method = 'time';
        }
    }
    ProcessIsoCurveParam.CLASSNAME = 'ProcessIsoCurveParam';
    ProcessIsoCurveParam.prototype = {
        constructor: ProcessIsoCurveParam,
        getLocation: function () {
            return this.location.x + ',' + this.location.y;
        },
        getExclusions: function () {
            return this.exclusions.join(';');
        }
    };
    ProcessIsoCurveParam.prototype.getParams = function () {
        var map = [];
        map.push({
            k: 'location',
            v: this.getLocation()
        });
        map.push({
            k: 'smoothing',
            v: this.smoothing
        });
        map.push({
            k: 'holes',
            v: this.holes
        });
        map.push({
            k: 'reverse',
            v: this.reverse
        });
        map.push({
            k: 'method',
            v: this.method
        });
        if (this.time) {
            map.push({
                k: 'time',
                v: this.time
            });
        }
        if (this.distance) {
            map.push({
                k: 'distance',
                v: this.distance
            });
        }
        map.push({
            k: 'graphName',
            v: this.graphName
        });
        if (this.exclusions) {
            map.push({
                k: 'exclusions',
                v: this.getExclusions()
            });
        }
        if (this.srs) {
            map.push({
                k: 'srs',
                v: this.srs
            });
        }
        return map;
    };
    return ProcessIsoCurveParam;
}(UtilsLoggerByDefault);
ServicesProcessIsoCurveRequestProcessIsoCurveRequest = function (Logger, _, ProcessIsoCurveParam) {
    function ProcessIsoCurveRequest(options) {
        if (!(this instanceof ProcessIsoCurveRequest)) {
            throw new TypeError('ProcessIsoCurveRequest constructor cannot be called as a function.');
        }
        if (!options) {
            throw new Error(_.getMessage('PARAM_EMPTY', 'options'));
        }
        this.settings = options;
        this.mode = this.settings.httpMethod || 'GET';
    }
    ProcessIsoCurveRequest.prototype = {
        requestString: null,
        constructor: ProcessIsoCurveRequest,
        template: {
            container: '<?xml version="1.0" encoding="UTF-8"?>\n' + '<isochroneRequest>\n' + '__ID__' + '\t<location>\n' + '\t\t<x>__X__</x>\n' + '\t\t<y>__Y__</y>\n' + '\t</location>\n' + '\t<srs>__SRS__</srs>\n' + '\t<graphName>__GRAPHNAME__</graphName>\n' + '__PROFIL__' + '__EXCLUSIONS__' + '\t<method>__METHOD__</method>\n' + '__TIME__' + '__DISTANCE__' + '\t<reverse>__REVERSE__</reverse>\n' + '\t<smoothing>__SMOOTHING__</smoothing>\n' + '\t<holes>__HOLES__</holes>\n' + '</isochroneRequest>',
            id: '\t<id>__IDVALUE__</id>\n',
            profil: '\t<profileId>__PROFILID__</profileId>\n' + '\t<profileName>__PROFILNAME__</profileName>\n',
            exclusions: {
                container: '\t<exclusions>\n' + '__EXCLUSIONFEATURE__\n' + '\t</exclusions>\n',
                feature: '\t\t<exclusion>__EXCLUSIONVALUE__</exclusion>'
            },
            time: '\t<time>__TIMEVALUE__</time>\n',
            distance: '\t<distance>__DISTANCEVALUE__</distance>\n'
        },
        processRequestString: function () {
            var request = '';
            var i = 0;
            switch (this.mode) {
            case 'GET':
                var oParams = new ProcessIsoCurveParam(this.settings);
                var params = oParams.getParams();
                for (i = 0; i < params.length; i++) {
                    var o = params[i];
                    if (request) {
                        request += '&';
                    }
                    request += o.k + '=' + o.v;
                }
                break;
            case 'POST':
                request = this.template.container;
                request = request.replace(/__ID__/g, '');
                request = request.replace(/__PROFIL__/g, '');
                request = request.replace(/__X__/g, this.settings.position.x);
                request = request.replace(/__Y__/g, this.settings.position.y);
                request = request.replace(/__GRAPHNAME__/g, this.settings.graph);
                request = request.replace(/__SRS__/g, this.settings.srs);
                request = request.replace(/__SMOOTHING__/g, this.settings.smoothing);
                request = request.replace(/__HOLES__/g, this.settings.holes);
                request = request.replace(/__REVERSE__/g, this.settings.reverse);
                if (this.settings.exclusions) {
                    var tmplExclusions = this.template.exclusions.container;
                    var exclusions = [];
                    for (i = 0; i < this.settings.exclusions.length; i++) {
                        var tmplFeature = this.template.exclusions.feature;
                        tmplFeature = tmplFeature.replace(/__EXCLUSIONVALUE__/, this.settings.exclusions[i]);
                        exclusions.push(tmplFeature);
                    }
                    tmplExclusions = tmplExclusions.replace(/__EXCLUSIONFEATURE__/, exclusions.join('\n'));
                    request = request.replace(/__EXCLUSIONS__/g, tmplExclusions);
                }
                request = request.replace(/__EXCLUSIONS__/g, '');
                if (this.settings.distance) {
                    var tmplDistance = this.template.distance;
                    tmplDistance = tmplDistance.replace(/__DISTANCEVALUE__/g, this.settings.distance);
                    request = request.replace(/__DISTANCE__/g, tmplDistance);
                    request = request.replace(/__METHOD__/g, 'distance');
                }
                request = request.replace(/__DISTANCE__/g, '');
                if (this.settings.time) {
                    var tmplTime = this.template.time;
                    tmplTime = tmplTime.replace(/__TIMEVALUE__/g, this.settings.time);
                    request = request.replace(/__TIME__/g, tmplTime);
                    request = request.replace(/__METHOD__/g, 'time');
                }
                request = request.replace(/__TIME__/g, '');
                break;
            default:
            }
            this.requestString = request;
            return this.requestString;
        }
    };
    return ProcessIsoCurveRequest;
}(UtilsLoggerByDefault, UtilsMessagesResources, ServicesProcessIsoCurveRequestModelProcessIsoCurveParam);
ServicesProcessIsoCurveResponseModelProcessIsoCurveResponse = function () {
    function ProcessIsoCurveResponse() {
        if (!(this instanceof ProcessIsoCurveResponse)) {
            throw new TypeError('ProcessIsoCurveResponse constructor cannot be called as a function.');
        }
        this.message = null;
        this.id = null;
        this.location = {};
        this.location.x = null;
        this.location.y = null;
        this.srs = null;
        this.geometry = null;
        this.time = null;
        this.distance = null;
    }
    ProcessIsoCurveResponse.prototype = { constructor: ProcessIsoCurveResponse };
    return ProcessIsoCurveResponse;
}();
ServicesProcessIsoCurveFormatsProcessIsoCurveResponseReader = function (Logger, WKT, ErrSrv, MessagesResources, ProcessIsoCurveResponse) {
    var ProcessIsoCurveResponseReader = {};
    ProcessIsoCurveResponseReader.READERS = {
        isochronResult: function (root) {
            var response = new ProcessIsoCurveResponse();
            if (root.hasChildNodes()) {
                var children = root.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (ProcessIsoCurveResponseReader.READERS[child.nodeName]) {
                        ProcessIsoCurveResponseReader.READERS[child.nodeName](child, response);
                    }
                }
            }
            if (response.status === 'error') {
                var message = MessagesResources.getMessage('SERVICE_RESPONSE_EXCEPTION', response.message);
                throw new ErrSrv({
                    message: message,
                    type: ErrSrv.TYPE_SRVERR
                });
            }
            return response;
        },
        message: function (node, response) {
            if (response) {
                response.message = __getChildValue(node);
            }
        },
        status: function (node, response) {
            var status = __getChildValue(node);
            if (status === 'ERROR' || status === 'error') {
                if (response) {
                    response.status = 'error';
                }
            }
        },
        id: function (node, response) {
            if (response) {
                response.id = __getChildValue(node);
            }
        },
        location: function (node, response) {
            var coords = __getChildValue(node);
            if (response && response.location) {
                response.location.x = parseFloat(coords.split(',')[0]);
                response.location.y = parseFloat(coords.split(',')[1]);
            }
        },
        srs: function (node, response) {
            if (response) {
                response.srs = __getChildValue(node);
            }
        },
        distance: function (node, response) {
            if (response) {
                response.distance = parseFloat(__getChildValue(node));
            }
        },
        time: function (node, response) {
            if (response) {
                response.time = parseFloat(__getChildValue(node));
            }
        },
        wktGeometry: function (node, response) {
            if (response) {
                var wktGeometry = node.innerHTML;
                var onWKTSuccess = function (json) {
                    response.geometry = json;
                };
                var onWKTError = function () {
                    var msg = MessagesResources.getMessage('PARAM_FORMAT', ['wktGeometry']);
                    throw new Error(msg);
                };
                if (response.hasOwnProperty('geometry')) {
                    WKT.toJson(wktGeometry, onWKTSuccess, onWKTError);
                }
            }
        },
        serviceResult: function (node) {
            var response = {};
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (ProcessIsoCurveResponseReader.READERS[child.nodeName]) {
                        ProcessIsoCurveResponseReader.READERS[child.nodeName](child, response);
                    }
                }
            }
            return response;
        },
        ExceptionReport: function (node) {
            var response = {};
            if (node.hasChildNodes()) {
                var children = node.childNodes;
                var child;
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    if (child.nodeName === 'Exception') {
                        response.exceptionReport = ProcessIsoCurveResponseReader.READERS['Exception'](child);
                    }
                }
            }
            return response;
        },
        Exception: function (node) {
            var exceptionReport = {};
            var exceptionCode = node.getAttribute('exceptionCode');
            if (exceptionCode) {
                exceptionReport.exceptionCode = exceptionCode;
            }
            var textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                exceptionReport.exception = textNode.nodeValue;
            }
            return exceptionReport;
        }
    };
    ProcessIsoCurveResponseReader.read = function (root) {
        var response;
        if (root.nodeName === 'isochronResult' || root.nodeName === 'isochroneResult' || root.nodeName === 'IsochroneResult') {
            response = ProcessIsoCurveResponseReader.READERS['isochronResult'](root);
            return response;
        } else if (root.nodeName === 'ExceptionReport') {
            response = ProcessIsoCurveResponseReader.READERS[root.nodeName](root);
            return response;
        } else if (ProcessIsoCurveResponseReader.READERS[root.nodeName]) {
            response = ProcessIsoCurveResponseReader.READERS[root.nodeName](root);
            if (response.status === 'error') {
                var errMsg = MessagesResources.getMessage('SERVICE_RESPONSE_EXCEPTION', response.message);
                throw new ErrSrv({
                    message: errMsg,
                    type: ErrSrv.TYPE_SRVERR
                });
            }
            return response;
        } else {
            throw new ErrSrv({
                message: MessagesResources.getMessage('SERVICE_RESPONSE_ANALYSE', root.nodeName),
                type: ErrSrv.TYPE_UNKERR
            });
        }
    };
    function __getChildValue(node) {
        var textNode;
        var value = '';
        if (node.hasChildNodes()) {
            textNode = node.firstChild;
            if (textNode && textNode.nodeType === 3) {
                value = textNode.nodeValue;
            }
        }
        return value;
    }
    return ProcessIsoCurveResponseReader;
}(UtilsLoggerByDefault, FormatsWKT, ExceptionsErrorService, UtilsMessagesResources, ServicesProcessIsoCurveResponseModelProcessIsoCurveResponse);
ServicesProcessIsoCurveResponseProcessIsoCurveResponseFactory = function (Logger, ErrorService, MRes, XML, WKT, ProcessIsoCurveResponseReader, ProcessIsoCurveResponse) {
    var ProcessIsoCurveResponseFactory = {
        build: function (options) {
            var data = null;
            if (options.response) {
                if (options.rawResponse) {
                    data = options.response;
                } else {
                    switch (options.outputFormat) {
                    case 'xml':
                        try {
                            var p = new XML({ reader: ProcessIsoCurveResponseReader });
                            if (typeof options.response === 'string') {
                                p.setXMLString(options.response);
                            } else {
                                p.setXMLDoc(options.response);
                            }
                            data = p.parse();
                            if (!data) {
                                throw new Error(MRes.getMessage('SERVICE_RESPONSE_EXCEPTION_2'));
                            }
                        } catch (e) {
                            var message = e.message;
                            message += '\n(raw response service : \'' + options.response + '\')';
                            options.onError.call(options.scope, new ErrorService({
                                message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', message),
                                status: 200,
                                type: ErrorService.TYPE_SRVERR
                            }));
                            return;
                        }
                        break;
                    case 'json':
                        var JSONResponse;
                        if (typeof options.response === 'string') {
                            JSONResponse = window.JSON.parse(options.response);
                        } else {
                            JSONResponse = options.response;
                        }
                        if (JSONResponse.status === 'OK' || JSONResponse.status === 'ok') {
                            data = new ProcessIsoCurveResponse();
                            if (data) {
                                data.time = JSONResponse.time;
                                data.distance = JSONResponse.distance;
                                data.message = JSONResponse.message;
                                data.id = JSONResponse.id;
                                data.srs = JSONResponse.srs;
                                var onWKTSuccess = function (json) {
                                    data.geometry = json;
                                };
                                var onWKTError = function () {
                                    options.onError.call(options.scope, new ErrorService({ message: MRes.getMessage('PARAM_FORMAT', 'wktGeometry') }));
                                };
                                if (data.hasOwnProperty('geometry')) {
                                    WKT.toJson(JSONResponse.wktGeometry, onWKTSuccess, onWKTError);
                                    if (!data.geometry) {
                                        return;
                                    }
                                }
                                var coords = JSONResponse.location.split(',');
                                if (data.location) {
                                    data.location.x = coords[0];
                                    data.location.y = coords[1];
                                }
                            } else {
                                options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_ANALYSE', options.response)));
                                return;
                            }
                        } else if (JSONResponse.status === 'ERROR' || JSONResponse.status === 'error') {
                            var mess = JSONResponse.message;
                            mess += '\n(raw response service : \'' + JSONResponse + '\')';
                            options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', mess)));
                            return;
                        }
                        break;
                    default:
                        options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_FORMAT', 'json', 'xml')));
                        return;
                    }
                    if (data && data.exceptionReport) {
                        options.onError.call(options.scope, new ErrorService({
                            message: MRes.getMessage('SERVICE_RESPONSE_EXCEPTION', data.exceptionReport),
                            type: ErrorService.TYPE_SRVERR,
                            status: 200
                        }));
                        return;
                    }
                }
            } else {
                options.onError.call(options.scope, new ErrorService(MRes.getMessage('SERVICE_RESPONSE_EMPTY')));
                return;
            }
            options.onSuccess.call(options.scope, data);
            return;
        }
    };
    return ProcessIsoCurveResponseFactory;
}(UtilsLoggerByDefault, ExceptionsErrorService, UtilsMessagesResources, FormatsXML, FormatsWKT, ServicesProcessIsoCurveFormatsProcessIsoCurveResponseReader, ServicesProcessIsoCurveResponseModelProcessIsoCurveResponse);
ServicesProcessIsoCurveProcessIsoCurve = function (Logger, _, ErrorService, CommonService, DefaultUrlService, ProcessIsoCurveRequest, ProcessIsoCurveResponseFactory) {
    function ProcessIsoCurve(options) {
        if (!(this instanceof ProcessIsoCurve)) {
            throw new TypeError(_.getMessage('CLASS_CONSTRUCTOR', 'ProcessIsoCurve'));
        }
        this.CLASSNAME = 'ProcessIsoCurve';
        CommonService.apply(this, arguments);
        if (!options.position) {
            throw new Error(_.getMessage('PARAM_MISSING', 'position'));
        }
        if (options.position.x == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'position.x'));
        }
        if (options.position.y == null) {
            throw new Error(_.getMessage('PARAM_MISSING', 'position.y'));
        }
        if (!options.time && !options.distance) {
            throw new Error('Parameter(s) \'distance\' missing. Parameter time to calculate an isochrone, parameter distance for an isodistance');
        }
        if (!options.time && options.distance) {
            this.options.method = 'distance';
            if (this.options.time) {
                delete this.options.time;
            }
        }
        if (options.time && !options.distance) {
            this.options.method = 'time';
            if (this.options.distance) {
                delete this.options.distance;
            }
        }
        this.options.method = this.options.method || 'time';
        this.options.exclusions = options.exclusions || null;
        this.options.graph = options.graph || 'Voiture';
        this.options.reverse = options.reverse || false;
        this.options.smoothing = options.smoothing || false;
        this.options.holes = options.holes || false;
        this.options.srs = options.srs || 'EPSG:4326';
        this.options.outputFormat = typeof options.outputFormat == 'string' ? options.outputFormat.toLowerCase() : 'json';
        if (!this.options.serverUrl) {
            var lstUrlByDefault = DefaultUrlService.ProcessIsoCurve.url(this.options.apiKey);
            var urlFound = lstUrlByDefault['iso' + '-' + this.options.outputFormat];
            if (!urlFound) {
                throw new Error('Url by default not found !');
            }
            this.options.serverUrl = urlFound;
        }
        var idx = this.options.serverUrl.lastIndexOf('.');
        if (idx !== -1) {
            var extension = this.options.serverUrl.substring(idx + 1);
            if (extension && extension.length < 5) {
                switch (extension.toLowerCase()) {
                case 'json':
                case 'xml':
                    this.options.outputFormat = extension.toLowerCase();
                    break;
                default:
                    throw new Error('type of service : unknown or unsupported (json or xml) !');
                }
            }
        }
    }
    ProcessIsoCurve.prototype = Object.create(CommonService.prototype, {});
    ProcessIsoCurve.prototype.constructor = ProcessIsoCurve;
    ProcessIsoCurve.prototype.buildRequest = function (error, success) {
        try {
            var oIsoCurve = new ProcessIsoCurveRequest(this.options);
            if (!oIsoCurve.processRequestString()) {
                throw new Error(_.getMessage('SERVICE_REQUEST_BUILD'));
            }
            this.request = oIsoCurve.requestString;
        } catch (e) {
            error.call(this, new ErrorService(e.message));
            return;
        }
        success.call(this, this.request);
    };
    ProcessIsoCurve.prototype.analyzeResponse = function (onError, onSuccess) {
        if (this.response) {
            var options = {
                response: this.response,
                outputFormat: this.options.outputFormat,
                rawResponse: this.options.rawResponse,
                onSuccess: onSuccess,
                onError: onError,
                scope: this
            };
            ProcessIsoCurveResponseFactory.build(options);
        } else {
            onError.call(this, new ErrorService(_.getMessage('SERVICE_RESPONSE_EMPTY')));
        }
    };
    return ProcessIsoCurve;
}(UtilsLoggerByDefault, UtilsMessagesResources, ExceptionsErrorService, ServicesCommonService, ServicesDefaultUrlService, ServicesProcessIsoCurveRequestProcessIsoCurveRequest, ServicesProcessIsoCurveResponseProcessIsoCurveResponseFactory);
ServicesServices = function (Alti, AutoConf, Geocode, ReverseGeocode, AutoComplete, Route, ProcessIsoCurve) {
    var Services = {
        getConfig: function (options) {
            var autoconfService = new AutoConf(options);
            autoconfService.call();
        },
        getAltitude: function (options) {
            var altiService = new Alti(options);
            altiService.call();
        },
        geocode: function (options) {
            var geocodeService = new Geocode(options);
            geocodeService.call();
        },
        reverseGeocode: function (options) {
            var reverseGeocodeService = new ReverseGeocode(options);
            reverseGeocodeService.call();
        },
        autoComplete: function (options) {
            var autoCompleteService = new AutoComplete(options);
            autoCompleteService.call();
        },
        route: function (options) {
            var routeService = new Route(options);
            routeService.call();
        },
        isoCurve: function (options) {
            var processIsoCurveService = new ProcessIsoCurve(options);
            processIsoCurveService.call();
        }
    };
    var point = {};
    var circle = {};
    var bbox = {};
    return Services;
}(ServicesAltiAlti, ServicesAutoConfAutoConf, ServicesGeocodeGeocode, ServicesGeocodeReverseGeocode, ServicesAutoCompleteAutoComplete, ServicesRouteRoute, ServicesProcessIsoCurveProcessIsoCurve);
Gp = function (XHR, Services, AltiResponse, Elevation, AutoCompleteResponse, SuggestedLocation, GetConfigResponse, Constraint, Format, Layer, Legend, Metadata, Originator, Service, Style, Territory, Thematic, TM, TMLimit, TMS, GeocodeResponse, GeocodedLocation, DirectGeocodedLocation, ReverseGeocodedLocation, IsoCurveResponse, RouteResponse, RouteInstruction, Error, Helper, DefaultUrl) {
    var scope = typeof window !== 'undefined' ? window : {};
    var Gp = scope.Gp || {
        servicesVersion: '1.0.0-beta3',
        servicesDate: '2017-01-16',
        extend: function (strNS, value) {
            var parts = strNS.split('.');
            var parent = this;
            var pl;
            pl = parts.length;
            for (var i = 0; i < pl; i++) {
                if (typeof parent[parts[i]] === 'undefined') {
                    parent[parts[i]] = {};
                }
                var n = pl - 1;
                if (i === n) {
                    parent[parts[i]] = value;
                }
                parent = parent[parts[i]];
            }
            return this;
        }
    };
    Gp.extend('Protocols', {});
    Gp.extend('Protocols.XHR', XHR);
    Gp.extend('Services', Services);
    Gp.extend('Services.AltiResponse', AltiResponse);
    Gp.extend('Services.Alti.Elevation', Elevation);
    Gp.extend('Services.AutoCompleteResponse', AutoCompleteResponse);
    Gp.extend('Services.AutoComplete.SuggestedLocation', SuggestedLocation);
    Gp.extend('Services.GetConfigResponse', GetConfigResponse);
    Gp.extend('Services.Config.Constraint', Constraint);
    Gp.extend('Services.Config.Format', Format);
    Gp.extend('Services.Config.Layer', Layer);
    Gp.extend('Services.Config.Legend', Legend);
    Gp.extend('Services.Config.Metadata', Metadata);
    Gp.extend('Services.Config.Originator', Originator);
    Gp.extend('Services.Config.Service', Service);
    Gp.extend('Services.Config.Style', Style);
    Gp.extend('Services.Config.Territory', Territory);
    Gp.extend('Services.Config.Thematic', SuggestedLocation);
    Gp.extend('Services.Config.TileMatrix', TM);
    Gp.extend('Services.Config.TileMatrixLimit', TMLimit);
    Gp.extend('Services.Config.TileMatrixSet', TMS);
    Gp.extend('Services.GeocodeResponse', GeocodeResponse);
    Gp.extend('Services.Geocode.GeocodedLocation', GeocodedLocation);
    Gp.extend('Services.Geocode.DirectGeocodedLocation', DirectGeocodedLocation);
    Gp.extend('Services.Geocode.ReverseGeocodedLocation', ReverseGeocodedLocation);
    Gp.extend('Services.IsoCurveResponse', IsoCurveResponse);
    Gp.extend('Services.RouteResponse', RouteResponse);
    Gp.extend('Services.Route.RouteInstruction', RouteInstruction);
    Gp.extend('Error', Error);
    Gp.extend('Helper', Helper);
    Gp.extend('Services.DefaultUrl', DefaultUrl);
    scope.Gp = Gp;
    return scope.Gp;
}(ProtocolsXHR, ServicesServices, ServicesAltiResponseModelAltiResponse, ServicesAltiResponseModelElevation, ServicesAutoCompleteResponseModelAutoCompleteResponse, ServicesAutoCompleteResponseModelSuggestedLocation, ServicesAutoConfResponseModelAutoConfResponse, ServicesAutoConfResponseModelConstraint, ServicesAutoConfResponseModelFormat, ServicesAutoConfResponseModelLayer, ServicesAutoConfResponseModelLegend, ServicesAutoConfResponseModelMetadata, ServicesAutoConfResponseModelOriginator, ServicesAutoConfResponseModelService, ServicesAutoConfResponseModelStyle, ServicesAutoConfResponseModelTerritory, ServicesAutoConfResponseModelThematic, ServicesAutoConfResponseModelTileMatrix, ServicesAutoConfResponseModelTileMatrixLimit, ServicesAutoConfResponseModelTileMatrixSet, ServicesGeocodeResponseModelGeocodeResponse, ServicesGeocodeResponseModelGeocodedLocation, ServicesGeocodeResponseModelDirectGeocodedLocation, ServicesGeocodeResponseModelReverseGeocodedLocation, ServicesProcessIsoCurveResponseModelProcessIsoCurveResponse, ServicesRouteResponseModelRouteResponse, ServicesRouteResponseModelRouteInstruction, ExceptionsErrorService, UtilsHelper, ServicesDefaultUrlService);
/* END CODE   */

return Gp;
}));
