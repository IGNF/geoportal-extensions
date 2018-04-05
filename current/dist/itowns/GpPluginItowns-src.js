/*!
 * @brief 
 *
 * This software is released under the licence CeCILL-B (Free BSD compatible)
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.txt
 * @see http://www.cecill.info/
 *
 * copyright CeCILL-B
 * copyright IGN
 * @author IGN
 * @version 
 * @date 2018-04-05
 *
 */
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4
 */
/*!
 * Sortable -- minimalist JavaScript library for reorderable drag-and-drop lists
 *
 * Released under MIT LICENSE
 * 
 * Copyright 2013-2016 Lebedev Konstantin <ibnRubaXa@gmail.com>
 * http://rubaxa.github.io/Sortable/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*!
 * Proj4js - Javascript reprojection library. 
 * 
 * Authors:
 * 
 * - Mike Adair madairATdmsolutions.ca
 * - Richard Greenwood richATgreenwoodmap.com
 * - Didier Richard didier.richardATign.fr
 * - Stephen Irons stephen.ironsATclear.net.nz
 * - Olivier Terral oterralATgmail.com
 * - Calvin Metcalf cmetcalfATappgeo.com
 * 
 * Copyright (c) 2014, Mike Adair, Richard Greenwood, Didier Richard, Stephen Irons, Olivier Terral and Calvin Metcalf
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included
 *  in all copies or substantial portions of the Software.
 * 
 *  _THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 *  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE._
 * 
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['itowns'], factory);
  } else if (typeof exports === 'object' && module.exports) {
    module.exports = factory(require('itowns'));
  } else if(typeof exports === 'object') {
    exports['Gp'] = factory(require('itowns'));
  } else {
    root.Gp = factory(root.itowns);
  }
}(typeof self !== 'undefined' ? self : this, function(itowns) {
var request, xmldom;
var gp, proj4, sortable;
var CommonUtilsAutoLoadConfig, CommonUtils, CommonUtilsLayerUtils, ItownsGlobeViewExtended, CommonUtilsConfig, CommonUtilsCheckRightManagement, CommonUtilsSelectorID, CommonControlsMousePositionDOM, ItownsControlsWidget, ItownsControlsUtilsPositionFormater, ItownsCRSCRS, ItownsControlsMousePosition, CommonControlsLayerSwitcherDOM, ItownsControlsLayerSwitcher, CommonControlsAttributionDOM, ItownsControlsAttributions, CommonControlsScaleDOM, ItownsControlsScale, CommonControlsMiniGlobeDOM, ItownsControlsMiniGlobe, ItownsGpPluginItowns;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('gp', [
            'require',
            'require'
        ], factory);
    } else if (typeof exports === 'object' && module.exports) {
        gp = module.exports = factory(request, xmldom);
    } else if (typeof exports === 'object') {
        exports['Gp'] = factory(request, xmldom);
    } else {
        gp = root.Gp = factory(root.request, root.xmldom);
    }
}(typeof self !== 'undefined' ? self : this, function (request, xmldom) {
    var es6Promise;
    var log4js, loggerCfg, UtilsLoggerByDefault, UtilsHelper, ProtocolsXHR, UtilsMessagesResources, ExceptionsErrorService, ProtocolsJSONP, ProtocolsProtocol, ServicesDefaultUrlService, ServicesCommonService, ServicesAltiRequestModelAltiRequest, ServicesAltiRequestModelAltiElevationRequest, ServicesAltiRequestModelAltiProfilRequest, ServicesAltiRequestAltiRequestREST, FormatsWPS, ServicesAltiRequestAltiRequestWPS, ServicesAltiRequestAltiRequestFactory, FormatsXML, ServicesAltiResponseModelAltiResponse, ServicesAltiResponseModelElevation, ServicesAltiFormatsAltiResponseReader, ServicesAltiResponseAltiResponseFactory, ServicesAltiAlti, ServicesAutoConfResponseModelAutoConfResponse, ServicesAutoConfResponseModelConstraint, ServicesAutoConfResponseModelFormat, ServicesAutoConfResponseModelLayer, ServicesAutoConfResponseModelLegend, ServicesAutoConfResponseModelMetadata, ServicesAutoConfResponseModelOriginator, ServicesAutoConfResponseModelService, ServicesAutoConfResponseModelStyle, ServicesAutoConfResponseModelTerritory, ServicesAutoConfResponseModelThematic, ServicesAutoConfResponseModelTileMatrixSet, ServicesAutoConfResponseModelTileMatrix, ServicesAutoConfResponseModelTileMatrixLimit, ServicesAutoConfFormatsAutoConfResponseReader, ServicesAutoConfResponseAutoConfResponseFactory, ServicesAutoConfAutoConf, FormatsXLSRequestHeader, FormatsXLSRequest, FormatsXLSAbstractService, FormatsXLS, FormatsXLSLocationUtilityServiceModelAddress, FormatsXLSLocationUtilityServiceGeocodeFilterExtension, FormatsXLSLocationUtilityServiceGeocodeRequest, FormatsXLSLocationUtilityServiceModelPosition, FormatsXLSLocationUtilityServiceModelPreference, FormatsXLSLocationUtilityServiceReverseGeocodeRequest, FormatsXLSLocationUtilityService, ServicesGeocodeRequestGeocodeLocation, ServicesGeocodeRequestModelStreetAddress, ServicesGeocodeRequestModelPositionOfInterest, ServicesGeocodeRequestModelCadastralParcel, ServicesGeocodeRequestModelAdministratif, ServicesGeocodeRequestDirectGeocodeRequestFactory, ServicesGeocodeResponseModelGeocodeResponse, ServicesGeocodeResponseModelGeocodedLocation, ServicesGeocodeResponseModelDirectGeocodedLocation, ServicesGeocodeFormatsDirectGeocodeResponseReader, ServicesGeocodeResponseDirectGeocodeResponseFactory, ServicesGeocodeGeocode, ServicesGeocodeRequestReverseGeocodeRequestFactory, ServicesGeocodeResponseModelReverseGeocodedLocation, ServicesGeocodeFormatsReverseGeocodeResponseReader, ServicesGeocodeResponseReverseGeocodeResponseFactory, ServicesGeocodeReverseGeocode, ServicesAutoCompleteResponseModelAutoCompleteResponse, ServicesAutoCompleteResponseModelSuggestedLocation, ServicesAutoCompleteResponseAutoCompleteResponseFactory, ServicesAutoCompleteAutoComplete, FormatsXLSRouteServiceModelRoutePlan, FormatsXLSRouteServiceDetermineRouteRequest, FormatsXLSRouteServiceRouteRequestExtension, FormatsXLSRouteService, ServicesRouteRequestRouteRequestOLS, ServicesRouteRequestModelRouteParamREST, ServicesRouteRequestRouteRequestREST, ServicesRouteRequestRouteRequestFactory, FormatsWKT, ServicesRouteResponseModelRouteResponse, ServicesRouteResponseModelRouteInstruction, ServicesRouteFormatsRouteResponseRESTReader, ServicesRouteFormatsRouteResponseOLSReader, ServicesRouteResponseRouteResponseFactory, ServicesRouteRoute, ServicesProcessIsoCurveRequestModelProcessIsoCurveParam, ServicesProcessIsoCurveRequestProcessIsoCurveRequest, ServicesProcessIsoCurveResponseModelProcessIsoCurveResponse, ServicesProcessIsoCurveFormatsProcessIsoCurveResponseReader, ServicesProcessIsoCurveResponseProcessIsoCurveResponseFactory, ServicesProcessIsoCurveProcessIsoCurve, ServicesServices, Gp;
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
    (function (global, factory) {
        es6Promise = typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd && false ? define('es6-promise', factory) : global.ES6Promise = factory();
    }(typeof self !== 'undefined' ? self : this, function () {
        'use strict';
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
        var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
        function useNextTick() {
            return function () {
                return process.nextTick(flush);
            };
        }
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
        function useMessageChannel() {
            var channel = new MessageChannel();
            channel.port1.onmessage = flush;
            return function () {
                return channel.port2.postMessage(0);
            };
        }
        function useSetTimeout() {
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
        if (isNode) {
            scheduleFlush = useNextTick();
        } else if (BrowserMutationObserver) {
            scheduleFlush = useMutationObserver();
        } else if (isWorker) {
            scheduleFlush = useMessageChannel();
        } else if (browserWindow === undefined && typeof require === 'function') {
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
        function resolve$1(object) {
            var Constructor = this;
            if (object && typeof object === 'object' && object.constructor === Constructor) {
                return object;
            }
            var promise = new Constructor(noop);
            resolve(promise, object);
            return promise;
        }
        var PROMISE_ID = Math.random().toString(36).substring(2);
        function noop() {
        }
        var PENDING = void 0;
        var FULFILLED = 1;
        var REJECTED = 2;
        var TRY_CATCH_ERROR = { error: null };
        function selfFulfillment() {
            return new TypeError('You cannot resolve a promise with itself');
        }
        function cannotReturnOwn() {
            return new TypeError('A promises callback cannot return that same promise.');
        }
        function getThen(promise) {
            try {
                return promise.then;
            } catch (error) {
                TRY_CATCH_ERROR.error = error;
                return TRY_CATCH_ERROR;
            }
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
                if (then$$1 === TRY_CATCH_ERROR) {
                    reject(promise, TRY_CATCH_ERROR.error);
                    TRY_CATCH_ERROR.error = null;
                } else if (then$$1 === undefined) {
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
                handleMaybeThenable(promise, value, getThen(value));
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
            var child = void 0, callback = void 0, detail = promise._result;
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
        function tryCatch(callback, detail) {
            try {
                return callback(detail);
            } catch (e) {
                TRY_CATCH_ERROR.error = e;
                return TRY_CATCH_ERROR;
            }
        }
        function invokeCallback(settled, promise, callback, detail) {
            var hasCallback = isFunction(callback), value = void 0, error = void 0, succeeded = void 0, failed = void 0;
            if (hasCallback) {
                value = tryCatch(callback, detail);
                if (value === TRY_CATCH_ERROR) {
                    failed = true;
                    error = value.error;
                    value.error = null;
                } else {
                    succeeded = true;
                }
                if (promise === value) {
                    reject(promise, cannotReturnOwn());
                    return;
                }
            } else {
                value = detail;
                succeeded = true;
            }
            if (promise._state !== PENDING) {
            } else if (hasCallback && succeeded) {
                resolve(promise, value);
            } else if (failed) {
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
                    var _then = getThen(entry);
                    if (_then === then && entry._state !== PENDING) {
                        this._settledAt(entry._state, i, entry._result);
                    } else if (typeof _then !== 'function') {
                        this._remaining--;
                        this._result[i] = entry;
                    } else if (c === Promise$1) {
                        var promise = new c(noop);
                        handleMaybeThenable(promise, entry, _then);
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
        function all(entries) {
            return new Enumerator(this, entries).promise;
        }
        function race(entries) {
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
        function reject$1(reason) {
            var Constructor = this;
            var promise = new Constructor(noop);
            reject(promise, reason);
            return promise;
        }
        function needsResolver() {
            throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
        }
        function needsNew() {
            throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
        }
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
            Promise.prototype.catch = function _catch(onRejection) {
                return this.then(null, onRejection);
            };
            Promise.prototype.finally = function _finally(callback) {
                var promise = this;
                var constructor = promise.constructor;
                return promise.then(function (value) {
                    return constructor.resolve(callback()).then(function () {
                        return value;
                    });
                }, function (reason) {
                    return constructor.resolve(callback()).then(function () {
                        throw reason;
                    });
                });
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
                }
                if (promiseToString === '[object Promise]' && !P.cast) {
                    return;
                }
            }
            local.Promise = Promise$1;
        }
        Promise$1.polyfill = polyfill;
        Promise$1.Promise = Promise$1;
        return Promise$1;
    }));
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
                    if (options.data && (typeof options.data === 'object' && Object.keys(options.data).length || typeof options.data === 'string' && options.data.length) && !corps) {
                        options.url = Helper.normalyzeUrl(options.url, options.data);
                    }
                    var hXHR = null;
                    if (typeof window === 'undefined') {
                        var req = request;
                        if (options.data && typeof options.data === 'string' && corps) {
                            options.body = options.data;
                        }
                        options.rejectUnauthorized = false;
                        req(options, function (error, response, body) {
                            if (!error && response.statusCode == 200 && body) {
                                resolve(body);
                            } else {
                                reject('Errors Occured on Http Request (nodejs) : ' + error);
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
                });
            }
        };
        return XHR;
    }(UtilsLoggerByDefault, UtilsHelper, es6Promise, {});
    UtilsMessagesResources = function () {
        var MessagesResources = {
            PARAM_MISSING: 'Parameter(s) \'%var%\' missing',
            PARAM_EMPTY: 'Parameter(s) \'%var%\' empty',
            PARAM_TYPE: 'Wrong type(s) for parameter(s) \'%var%\'',
            PARAM_FORMAT: 'Parameter(s) \'%var%\' not correctly formatted',
            PARAM_NOT_SUPPORT: 'Value(s) for parameter(s) \'%var%\' not supported',
            PARAM_NOT_SUPPORT_NODEJS: 'Value(s) for parameter(s) \'%var%\' not supported to NodeJS',
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
                    protocol: 'XHR',
                    timeOut: 0,
                    format: null,
                    wrap: true,
                    nocache: true,
                    output: 'json',
                    callback: null,
                    callbackSuffix: null
                };
                if (typeof window === 'undefined' && options.protocol === 'JSONP') {
                    console.log('Value(s) for parameter(s) \'protocol=JSONP (instead use XHR)\' not supported to NodeJS');
                    return;
                }
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
        var ISBROWSER = typeof window !== 'undefined' ? true : false;
        var HOSTNAME = 'wxs.ign.fr';
        var DefaultUrlService = {
            ssl: false,
            url: function (key, path) {
                var _protocol = ISBROWSER ? location && location.protocol && location.protocol.indexOf('https:') === 0 ? 'https://' : 'http://' : DefaultUrlService.ssl ? 'https://' : 'http://';
                return _protocol + HOSTNAME.concat('/', key, path);
            },
            Alti: {
                _key: {
                    'elevation-json': '/alti/rest/elevation.json',
                    'elevation-xml': '/alti/rest/elevation.xml',
                    'profil-json': '/alti/rest/elevationLine.json',
                    'profil-xml': '/alti/rest/elevationLine.xml',
                    wps: '/alti/wps'
                },
                url: function (key) {
                    return {
                        'elevation-json': DefaultUrlService.url(key, this._key['elevation-json']),
                        'elevation-xml': DefaultUrlService.url(key, this._key['elevation-xml']),
                        'profil-json': DefaultUrlService.url(key, this._key['profil-json']),
                        'profil-xml': DefaultUrlService.url(key, this._key['profil-xml']),
                        wps: DefaultUrlService.url(key, this._key['wps'])
                    };
                }
            },
            ProcessIsoCurve: {
                _key: {
                    'iso-json': '/isochrone/isochrone.json',
                    'iso-xml': '/isochrone/isochrone.xml'
                },
                url: function (key) {
                    return {
                        'iso-json': DefaultUrlService.url(key, this._key['iso-json']),
                        'iso-xml': DefaultUrlService.url(key, this._key['iso-xml'])
                    };
                }
            },
            AutoComplete: {
                _key: '/ols/apis/completion',
                url: function (key) {
                    return DefaultUrlService.url(key, this._key);
                }
            },
            ReverseGeocode: {
                _key: '/geoportail/ols',
                url: function (key) {
                    return DefaultUrlService.url(key, this._key);
                }
            },
            AutoConf: {
                _key: {
                    apiKey: '/autoconf',
                    apiKeys: '/autoconf?keys=%KEYS%',
                    aggregate: '/autoconf/id/'
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
                        apiKey: DefaultUrlService.url(key, this._key['apiKey']),
                        apiKeys: DefaultUrlService.url(key[0], this._key['apiKeys']).replace('%KEYS%', keys),
                        aggregate: DefaultUrlService.url(key, this._key['aggregate'])
                    };
                }
            },
            Geocode: {
                _key: '/geoportail/ols',
                url: function (key) {
                    return DefaultUrlService.url(key, this._key);
                }
            },
            Route: {
                _key: {
                    ols: '/itineraire/ols',
                    'route-json': '/itineraire/rest/route.json',
                    'route-xml': '/itineraire/rest/route.xml'
                },
                url: function (key) {
                    return {
                        ols: DefaultUrlService.url(key, this._key['ols']),
                        'route-json': DefaultUrlService.url(key, this._key['route-json']),
                        'route-xml': DefaultUrlService.url(key, this._key['route-xml'])
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
                protocol: 'XHR',
                ssl: false,
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
                DefaultUrlService.ssl = this.options.ssl;
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
            this.options.protocol = typeof options.protocol === 'string' ? options.protocol.toUpperCase() : 'XHR';
            switch (this.options.protocol) {
            case 'JSONP':
            case 'XHR':
                break;
            default:
                throw new Error(_.getMessage('PARAM_UNKNOWN', 'protocol'));
            }
            if (typeof window === 'undefined' && this.options.protocol === 'JSONP') {
                throw new Error(_.getMessage('PARAM_NOT_SUPPORT_NODEJS', 'protocol=JSONP (instead use XHR)'));
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
                this.options.serverUrl = Helper.normalyzeUrl(this.options.serverUrl, { 'gp-access-lib': '1.2.0' }, false);
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
                                        if (typeof self.options.onBeforeParse === 'function') {
                                            var newResponse = self.options.onBeforeParse(content);
                                            if (typeof newResponse === 'string') {
                                                content = newResponse;
                                            }
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
                                JSONResponse = JSON.parse(options.response);
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
            if (!options) {
                options = {};
            }
            options.protocol = options.protocol || 'JSONP';
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
                            JSONResponse = JSON.parse(options.response);
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
                                JSONResponse = JSON.parse(options.response);
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
                                JSONResponse = JSON.parse(options.response);
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
            servicesVersion: '1.2.0',
            servicesDate: '2018-02-26',
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
    return Gp;
}));
CommonUtilsAutoLoadConfig = function (Gp) {
    (function () {
        var scripts = document.getElementsByTagName('script');
        var key = scripts[scripts.length - 1].getAttribute('data-key');
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
        var url = scripts[scripts.length - 1].getAttribute('data-url');
        var timeout = scripts[scripts.length - 1].getAttribute('data-timeout');
        var success = function () {
        };
        var error = function (e) {
            throw new Error('Configuration load failed : ' + e.message);
        };
        if (!key && !url) {
            return;
        }
        var options = {
            apiKey: key,
            onSuccess: success,
            onFailure: error
        };
        if (url) {
            options.serverUrl = url;
            options.callbackSuffix = '';
        }
        if (timeout) {
            options.timeOut = timeout;
        }
        if (!Gp.Config) {
            Gp.Services.getConfig(options);
        }
    }());
}(gp);
CommonUtils = function () {
    var Utils = {
        detectSupport: function () {
            var isDesktop = true;
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipod') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('android') !== -1 || userAgent.indexOf('mobile') !== -1 || userAgent.indexOf('blackberry') !== -1 || userAgent.indexOf('tablet') !== -1 || userAgent.indexOf('phone') !== -1 || userAgent.indexOf('touch') !== -1) {
                isDesktop = false;
            }
            if (userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1) {
                isDesktop = true;
            }
            return isDesktop;
        },
        assign: function (dest, source) {
            dest = dest || {};
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    dest[prop] = source[prop];
                }
            }
            return dest;
        },
        mergeParams: function (dest, source) {
            if (!dest || !source) {
                return;
            }
            for (var param in source) {
                if (source.hasOwnProperty(param)) {
                    if (typeof source[param] === 'object') {
                        if (dest.hasOwnProperty(param)) {
                            this.mergeParams(dest[param], source[param]);
                        } else {
                            dest[param] = source[param];
                        }
                    } else {
                        dest[param] = source[param];
                    }
                }
            }
        }
    };
    return Utils;
}();
CommonUtilsLayerUtils = function () {
    var LayerUtils = {
        getZoomLevelFromScaleDenominator: function (scaleDenominator, crs) {
            var resolutionsNatives = {};
            switch (crs) {
            case 'EPSG:2154':
                resolutionsNatives = {
                    0: 104579.224549894,
                    1: 52277.5323537905,
                    2: 26135.4870785954,
                    3: 13066.8913818,
                    4: 6533.2286041135,
                    5: 3266.5595244627,
                    6: 1633.2660045974,
                    7: 816.629554986,
                    8: 408.3139146768,
                    9: 204.1567415109,
                    10: 102.0783167832,
                    11: 51.0391448966,
                    12: 25.5195690743,
                    13: 12.7597836936,
                    14: 6.379891636,
                    15: 3.1899457653,
                    16: 1.5949728695,
                    17: 0.7974864315,
                    18: 0.3987432149,
                    19: 0.1993716073,
                    20: 0.0996858037,
                    21: 0.0498429018
                };
                break;
            default:
                resolutionsNatives = {
                    0: 156543.033928041,
                    1: 78271.51696402048,
                    2: 39135.758482010235,
                    3: 19567.87924100512,
                    4: 9783.93962050256,
                    5: 4891.96981025128,
                    6: 2445.98490512564,
                    7: 1222.99245256282,
                    8: 611.49622628141,
                    9: 305.7481131407048,
                    10: 152.8740565703525,
                    11: 76.43702828517624,
                    12: 38.21851414258813,
                    13: 19.10925707129406,
                    14: 9.554628535647032,
                    15: 4.777314267823516,
                    16: 2.388657133911758,
                    17: 1.194328566955879,
                    18: 0.5971642834779395,
                    19: 0.2985821417389697,
                    20: 0.1492910708694849,
                    21: 0.0746455354347424
                };
                break;
            }
            var resolution = scaleDenominator * 0.00028;
            for (var index in resolutionsNatives) {
                if (resolutionsNatives.hasOwnProperty(index)) {
                    if (resolutionsNatives[index] <= resolution) {
                        index = parseInt(index, 10);
                        return index;
                    }
                }
            }
            return 0;
        },
        getAttributions: function (params) {
            var zoom = params.zoom;
            var attributions = [];
            if (params.originators != null && params.visibility) {
                var drawLogo;
                for (var j = 0, jl = params.originators.length; j < jl; j++) {
                    drawLogo = true;
                    var originator = params.originators[j];
                    var constraints = params.originators[j].constraints || [];
                    for (var k = 0, kl = constraints.length; k < kl; k++) {
                        var constraint = constraints[k];
                        drawLogo = true;
                        var minZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.maxScaleDenominator, params.crs);
                        var maxZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.minScaleDenominator, params.crs) || 21;
                        if (minZoomLevel && minZoomLevel > zoom) {
                            drawLogo = false;
                        }
                        if (drawLogo && maxZoomLevel !== null && maxZoomLevel < zoom) {
                            drawLogo = false;
                        }
                        var bbox = constraint.bbox;
                        if (drawLogo && bbox) {
                            drawLogo = false;
                            var viewExtent = params.extent;
                            if (viewExtent) {
                                var bounds = [
                                    bbox.top,
                                    bbox.left,
                                    bbox.bottom,
                                    bbox.right
                                ];
                                if (this.intersects(viewExtent, bounds)) {
                                    drawLogo = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (drawLogo) {
                        var logo = originator.logo;
                        var url = originator.url;
                        var name = originator.name ? originator.name : '';
                        var text = originator.attribution;
                        var container = document.createElement('div');
                        container.className = 'gp-control-attribution';
                        var link = null;
                        link = document.createElement('a');
                        link.className = 'gp-control-attribution-link';
                        link.target = '_blank';
                        container.appendChild(link);
                        if (url) {
                            link.href = url;
                        }
                        var bImage = logo ? true : false;
                        var image = null;
                        if (bImage) {
                            image = document.createElement('img');
                            if (link) {
                                image.className = 'gp-control-attribution-image';
                                link.appendChild(image);
                            } else {
                                image.className = '';
                                container.appendChild(image);
                            }
                            image.src = logo;
                            image.title = text || name;
                            image.style.height = '30px';
                            image.style.width = '30px';
                        } else {
                            if (name) {
                                link.textContent = name;
                            } else if (text) {
                                link.textContent = text;
                            } else if (url) {
                                link.textContent = url;
                            } else {
                                link.textContent = '';
                            }
                        }
                        attributions.push(container.innerHTML + ' ');
                    }
                }
            }
            return attributions;
        },
        intersects: function (extent1, extent2) {
            var intersectsX = extent1[1] <= extent2[3] && extent2[1] <= extent1[3];
            var intersectsY = extent1[2] <= extent2[0] && extent2[2] <= extent1[0];
            return intersectsX && intersectsY;
        }
    };
    return LayerUtils;
}();
(function (global, factory) {
    proj4 = typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('proj4', factory) : global.proj4 = factory();
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';
    var globals = function (defs) {
        defs('EPSG:4326', '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees');
        defs('EPSG:4269', '+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees');
        defs('EPSG:3857', '+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs');
        defs.WGS84 = defs['EPSG:4326'];
        defs['EPSG:3785'] = defs['EPSG:3857'];
        defs.GOOGLE = defs['EPSG:3857'];
        defs['EPSG:900913'] = defs['EPSG:3857'];
        defs['EPSG:102113'] = defs['EPSG:3857'];
    };
    var PJD_3PARAM = 1;
    var PJD_7PARAM = 2;
    var PJD_WGS84 = 4;
    var PJD_NODATUM = 5;
    var SEC_TO_RAD = 0.00000484813681109536;
    var HALF_PI = Math.PI / 2;
    var SIXTH = 0.16666666666666666;
    var RA4 = 0.04722222222222222;
    var RA6 = 0.022156084656084655;
    var EPSLN = 1e-10;
    var D2R = 0.017453292519943295;
    var R2D = 57.29577951308232;
    var FORTPI = Math.PI / 4;
    var TWO_PI = Math.PI * 2;
    var SPI = 3.14159265359;
    var exports$1 = {};
    exports$1.greenwich = 0;
    exports$1.lisbon = -9.131906111111;
    exports$1.paris = 2.337229166667;
    exports$1.bogota = -74.080916666667;
    exports$1.madrid = -3.687938888889;
    exports$1.rome = 12.452333333333;
    exports$1.bern = 7.439583333333;
    exports$1.jakarta = 106.807719444444;
    exports$1.ferro = -17.666666666667;
    exports$1.brussels = 4.367975;
    exports$1.stockholm = 18.058277777778;
    exports$1.athens = 23.7163375;
    exports$1.oslo = 10.722916666667;
    var units = {
        ft: { to_meter: 0.3048 },
        'us-ft': { to_meter: 1200 / 3937 }
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
    var parseProj = function (defData) {
        var self = {};
        var paramObj = defData.split('+').map(function (v) {
            return v.trim();
        }).filter(function (a) {
            return a;
        }).reduce(function (p, a) {
            var split = a.split('=');
            split.push(true);
            p[split[0].toLowerCase()] = split[1];
            return p;
        }, {});
        var paramName, paramVal, paramOutname;
        var params = {
            proj: 'projName',
            datum: 'datumCode',
            rf: function (v) {
                self.rf = parseFloat(v);
            },
            lat_0: function (v) {
                self.lat0 = v * D2R;
            },
            lat_1: function (v) {
                self.lat1 = v * D2R;
            },
            lat_2: function (v) {
                self.lat2 = v * D2R;
            },
            lat_ts: function (v) {
                self.lat_ts = v * D2R;
            },
            lon_0: function (v) {
                self.long0 = v * D2R;
            },
            lon_1: function (v) {
                self.long1 = v * D2R;
            },
            lon_2: function (v) {
                self.long2 = v * D2R;
            },
            alpha: function (v) {
                self.alpha = parseFloat(v) * D2R;
            },
            lonc: function (v) {
                self.longc = v * D2R;
            },
            x_0: function (v) {
                self.x0 = parseFloat(v);
            },
            y_0: function (v) {
                self.y0 = parseFloat(v);
            },
            k_0: function (v) {
                self.k0 = parseFloat(v);
            },
            k: function (v) {
                self.k0 = parseFloat(v);
            },
            a: function (v) {
                self.a = parseFloat(v);
            },
            b: function (v) {
                self.b = parseFloat(v);
            },
            r_a: function () {
                self.R_A = true;
            },
            zone: function (v) {
                self.zone = parseInt(v, 10);
            },
            south: function () {
                self.utmSouth = true;
            },
            towgs84: function (v) {
                self.datum_params = v.split(',').map(function (a) {
                    return parseFloat(a);
                });
            },
            to_meter: function (v) {
                self.to_meter = parseFloat(v);
            },
            units: function (v) {
                self.units = v;
                var unit = match(units, v);
                if (unit) {
                    self.to_meter = unit.to_meter;
                }
            },
            from_greenwich: function (v) {
                self.from_greenwich = v * D2R;
            },
            pm: function (v) {
                var pm = match(exports$1, v);
                self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R;
            },
            nadgrids: function (v) {
                if (v === '@null') {
                    self.datumCode = 'none';
                } else {
                    self.nadgrids = v;
                }
            },
            axis: function (v) {
                var legalAxis = 'ewnsud';
                if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
                    self.axis = v;
                }
            }
        };
        for (paramName in paramObj) {
            paramVal = paramObj[paramName];
            if (paramName in params) {
                paramOutname = params[paramName];
                if (typeof paramOutname === 'function') {
                    paramOutname(paramVal);
                } else {
                    self[paramOutname] = paramVal;
                }
            } else {
                self[paramName] = paramVal;
            }
        }
        if (typeof self.datumCode === 'string' && self.datumCode !== 'WGS84') {
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
    Parser.prototype.readCharicter = function () {
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
            return this.keyword(char);
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
    Parser.prototype.afterquote = function (char) {
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
        throw new Error('havn\'t handled "' + char + '" in afterquote yet, index ' + this.place);
    };
    Parser.prototype.afterItem = function (char) {
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
    Parser.prototype.number = function (char) {
        if (digets.test(char)) {
            this.word += char;
            return;
        }
        if (endThings.test(char)) {
            this.word = parseFloat(this.word);
            this.afterItem(char);
            return;
        }
        throw new Error('havn\'t handled "' + char + '" in number yet, index ' + this.place);
    };
    Parser.prototype.quoted = function (char) {
        if (char === '"') {
            this.state = AFTERQUOTE;
            return;
        }
        this.word += char;
        return;
    };
    Parser.prototype.keyword = function (char) {
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
        throw new Error('havn\'t handled "' + char + '" in keyword yet, index ' + this.place);
    };
    Parser.prototype.neutral = function (char) {
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
        throw new Error('havn\'t handled "' + char + '" in neutral yet, index ' + this.place);
    };
    Parser.prototype.output = function () {
        while (this.place < this.text.length) {
            this.readCharicter();
        }
        if (this.state === ENDED) {
            return this.root;
        }
        throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
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
        var out = value.reduce(function (newObj, item) {
            sExpr(item, newObj);
            return newObj;
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
            v[0] = [
                'name',
                v[0]
            ];
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
    var D2R$1 = 0.017453292519943295;
    function rename(obj, params) {
        var outName = params[0];
        var inName = params[1];
        if (!(outName in obj) && inName in obj) {
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
        if (wkt.UNIT) {
            wkt.units = wkt.UNIT.name.toLowerCase();
            if (wkt.units === 'metre') {
                wkt.units = 'meter';
            }
            if (wkt.UNIT.convert) {
                if (wkt.type === 'GEOGCS') {
                    if (wkt.DATUM && wkt.DATUM.SPHEROID) {
                        wkt.to_meter = wkt.UNIT.convert * wkt.DATUM.SPHEROID.a;
                    }
                } else {
                    wkt.to_meter = wkt.UNIT.convert, 10;
                }
            }
        }
        var geogcs = wkt.GEOGCS;
        if (wkt.type === 'GEOGCS') {
            geogcs = wkt;
        }
        if (geogcs) {
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
            if (wkt.datumCode === 'wgs_1984') {
                if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
                    wkt.sphere = true;
                }
                wkt.datumCode = 'wgs84';
            }
            if (wkt.datumCode.slice(-6) === '_ferro') {
                wkt.datumCode = wkt.datumCode.slice(0, -6);
            }
            if (wkt.datumCode.slice(-8) === '_jakarta') {
                wkt.datumCode = wkt.datumCode.slice(0, -8);
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
            if (~wkt.datumCode.indexOf('osgb_1936')) {
                wkt.datumCode = 'osgb36';
            }
            if (~wkt.datumCode.indexOf('osni_1952')) {
                wkt.datumCode = 'osni52';
            }
            if (~wkt.datumCode.indexOf('tm65') || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
                wkt.datumCode = 'ire65';
            }
        }
        if (wkt.b && !isFinite(wkt.b)) {
            wkt.b = wkt.a;
        }
        function toMeter(input) {
            var ratio = wkt.to_meter || 1;
            return input * ratio;
        }
        var renamer = function (a) {
            return rename(wkt, a);
        };
        var list = [
            [
                'standard_parallel_1',
                'Standard_Parallel_1'
            ],
            [
                'standard_parallel_2',
                'Standard_Parallel_2'
            ],
            [
                'false_easting',
                'False_Easting'
            ],
            [
                'false_northing',
                'False_Northing'
            ],
            [
                'central_meridian',
                'Central_Meridian'
            ],
            [
                'latitude_of_origin',
                'Latitude_Of_Origin'
            ],
            [
                'latitude_of_origin',
                'Central_Parallel'
            ],
            [
                'scale_factor',
                'Scale_Factor'
            ],
            [
                'k0',
                'scale_factor'
            ],
            [
                'latitude_of_center',
                'Latitude_of_center'
            ],
            [
                'lat0',
                'latitude_of_center',
                d2r
            ],
            [
                'longitude_of_center',
                'Longitude_Of_Center'
            ],
            [
                'longc',
                'longitude_of_center',
                d2r
            ],
            [
                'x0',
                'false_easting',
                toMeter
            ],
            [
                'y0',
                'false_northing',
                toMeter
            ],
            [
                'long0',
                'central_meridian',
                d2r
            ],
            [
                'lat0',
                'latitude_of_origin',
                d2r
            ],
            [
                'lat0',
                'standard_parallel_1',
                d2r
            ],
            [
                'lat1',
                'standard_parallel_1',
                d2r
            ],
            [
                'lat2',
                'standard_parallel_2',
                d2r
            ],
            [
                'alpha',
                'azimuth',
                d2r
            ],
            [
                'srsCode',
                'name'
            ]
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
    var wkt = function (wkt) {
        var lisp = parseString(wkt);
        var type = lisp.shift();
        var name = lisp.shift();
        lisp.unshift([
            'name',
            name
        ]);
        lisp.unshift([
            'type',
            type
        ]);
        var obj = {};
        sExpr(lisp, obj);
        cleanWKT(obj);
        return obj;
    };
    function defs(name) {
        var that = this;
        if (arguments.length === 2) {
            var def = arguments[1];
            if (typeof def === 'string') {
                if (def.charAt(0) === '+') {
                    defs[name] = parseProj(arguments[1]);
                } else {
                    defs[name] = wkt(arguments[1]);
                }
            } else {
                defs[name] = def;
            }
        } else if (arguments.length === 1) {
            if (Array.isArray(name)) {
                return name.map(function (v) {
                    if (Array.isArray(v)) {
                        defs.apply(that, v);
                    } else {
                        defs(v);
                    }
                });
            } else if (typeof name === 'string') {
                if (name in defs) {
                    return defs[name];
                }
            } else if ('EPSG' in name) {
                defs['EPSG:' + name.EPSG] = name;
            } else if ('ESRI' in name) {
                defs['ESRI:' + name.ESRI] = name;
            } else if ('IAU2000' in name) {
                defs['IAU2000:' + name.IAU2000] = name;
            } else {
                console.log(name);
            }
            return;
        }
    }
    globals(defs);
    function testObj(code) {
        return typeof code === 'string';
    }
    function testDef(code) {
        return code in defs;
    }
    var codeWords = [
        'PROJECTEDCRS',
        'PROJCRS',
        'GEOGCS',
        'GEOCCS',
        'PROJCS',
        'LOCAL_CS',
        'GEODCRS',
        'GEODETICCRS',
        'GEODETICDATUM',
        'ENGCRS',
        'ENGINEERINGCRS'
    ];
    function testWKT(code) {
        return codeWords.some(function (word) {
            return code.indexOf(word) > -1;
        });
    }
    function testProj(code) {
        return code[0] === '+';
    }
    function parse(code) {
        if (testObj(code)) {
            if (testDef(code)) {
                return defs[code];
            }
            if (testWKT(code)) {
                return wkt(code);
            }
            if (testProj(code)) {
                return parseProj(code);
            }
        } else {
            return code;
        }
    }
    var extend = function (destination, source) {
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
    var msfnz = function (eccent, sinphi, cosphi) {
        var con = eccent * sinphi;
        return cosphi / Math.sqrt(1 - con * con);
    };
    var sign = function (x) {
        return x < 0 ? -1 : 1;
    };
    var adjust_lon = function (x) {
        return Math.abs(x) <= SPI ? x : x - sign(x) * TWO_PI;
    };
    var tsfnz = function (eccent, phi, sinphi) {
        var con = eccent * sinphi;
        var com = 0.5 * eccent;
        con = Math.pow((1 - con) / (1 + con), com);
        return Math.tan(0.5 * (HALF_PI - phi)) / con;
    };
    var phi2z = function (eccent, ts) {
        var eccnth = 0.5 * eccent;
        var con, dphi;
        var phi = HALF_PI - 2 * Math.atan(ts);
        for (var i = 0; i <= 15; i++) {
            con = eccent * Math.sin(phi);
            dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
            phi += dphi;
            if (Math.abs(dphi) <= 1e-10) {
                return phi;
            }
        }
        return -9999;
    };
    function init() {
        var con = this.b / this.a;
        this.es = 1 - con * con;
        if (!('x0' in this)) {
            this.x0 = 0;
        }
        if (!('y0' in this)) {
            this.y0 = 0;
        }
        this.e = Math.sqrt(this.es);
        if (this.lat_ts) {
            if (this.sphere) {
                this.k0 = Math.cos(this.lat_ts);
            } else {
                this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
            }
        } else {
            if (!this.k0) {
                if (this.k) {
                    this.k0 = this.k;
                } else {
                    this.k0 = 1;
                }
            }
        }
    }
    function forward(p) {
        var lon = p.x;
        var lat = p.y;
        if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
            return null;
        }
        var x, y;
        if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
            return null;
        } else {
            if (this.sphere) {
                x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
                y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
            } else {
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
    function inverse(p) {
        var x = p.x - this.x0;
        var y = p.y - this.y0;
        var lon, lat;
        if (this.sphere) {
            lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
        } else {
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
    var names$1 = [
        'Mercator',
        'Popular Visualisation Pseudo Mercator',
        'Mercator_1SP',
        'Mercator_Auxiliary_Sphere',
        'merc'
    ];
    var merc = {
        init: init,
        forward: forward,
        inverse: inverse,
        names: names$1
    };
    function init$1() {
    }
    function identity(pt) {
        return pt;
    }
    var names$2 = [
        'longlat',
        'identity'
    ];
    var longlat = {
        init: init$1,
        forward: identity,
        inverse: identity,
        names: names$2
    };
    var projs = [
        merc,
        longlat
    ];
    var names$$1 = {};
    var projStore = [];
    function add(proj, i) {
        var len = projStore.length;
        if (!proj.names) {
            console.log(i);
            return true;
        }
        projStore[len] = proj;
        proj.names.forEach(function (n) {
            names$$1[n.toLowerCase()] = len;
        });
        return this;
    }
    function get(name) {
        if (!name) {
            return false;
        }
        var n = name.toLowerCase();
        if (typeof names$$1[n] !== 'undefined' && projStore[names$$1[n]]) {
            return projStore[names$$1[n]];
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
        a: 6378137,
        rf: 298.257,
        ellipseName: 'MERIT 1983'
    };
    exports$2.SGS85 = {
        a: 6378136,
        rf: 298.257,
        ellipseName: 'Soviet Geodetic System 85'
    };
    exports$2.GRS80 = {
        a: 6378137,
        rf: 298.257222101,
        ellipseName: 'GRS 1980(IUGG, 1980)'
    };
    exports$2.IAU76 = {
        a: 6378140,
        rf: 298.257,
        ellipseName: 'IAU 1976'
    };
    exports$2.airy = {
        a: 6377563.396,
        b: 6356256.91,
        ellipseName: 'Airy 1830'
    };
    exports$2.APL4 = {
        a: 6378137,
        rf: 298.25,
        ellipseName: 'Appl. Physics. 1965'
    };
    exports$2.NWL9D = {
        a: 6378145,
        rf: 298.25,
        ellipseName: 'Naval Weapons Lab., 1965'
    };
    exports$2.mod_airy = {
        a: 6377340.189,
        b: 6356034.446,
        ellipseName: 'Modified Airy'
    };
    exports$2.andrae = {
        a: 6377104.43,
        rf: 300,
        ellipseName: 'Andrae 1876 (Den., Iclnd.)'
    };
    exports$2.aust_SA = {
        a: 6378160,
        rf: 298.25,
        ellipseName: 'Australian Natl & S. Amer. 1969'
    };
    exports$2.GRS67 = {
        a: 6378160,
        rf: 298.247167427,
        ellipseName: 'GRS 67(IUGG 1967)'
    };
    exports$2.bessel = {
        a: 6377397.155,
        rf: 299.1528128,
        ellipseName: 'Bessel 1841'
    };
    exports$2.bess_nam = {
        a: 6377483.865,
        rf: 299.1528128,
        ellipseName: 'Bessel 1841 (Namibia)'
    };
    exports$2.clrk66 = {
        a: 6378206.4,
        b: 6356583.8,
        ellipseName: 'Clarke 1866'
    };
    exports$2.clrk80 = {
        a: 6378249.145,
        rf: 293.4663,
        ellipseName: 'Clarke 1880 mod.'
    };
    exports$2.clrk58 = {
        a: 6378293.645208759,
        rf: 294.2606763692654,
        ellipseName: 'Clarke 1858'
    };
    exports$2.CPM = {
        a: 6375738.7,
        rf: 334.29,
        ellipseName: 'Comm. des Poids et Mesures 1799'
    };
    exports$2.delmbr = {
        a: 6376428,
        rf: 311.5,
        ellipseName: 'Delambre 1810 (Belgium)'
    };
    exports$2.engelis = {
        a: 6378136.05,
        rf: 298.2566,
        ellipseName: 'Engelis 1985'
    };
    exports$2.evrst30 = {
        a: 6377276.345,
        rf: 300.8017,
        ellipseName: 'Everest 1830'
    };
    exports$2.evrst48 = {
        a: 6377304.063,
        rf: 300.8017,
        ellipseName: 'Everest 1948'
    };
    exports$2.evrst56 = {
        a: 6377301.243,
        rf: 300.8017,
        ellipseName: 'Everest 1956'
    };
    exports$2.evrst69 = {
        a: 6377295.664,
        rf: 300.8017,
        ellipseName: 'Everest 1969'
    };
    exports$2.evrstSS = {
        a: 6377298.556,
        rf: 300.8017,
        ellipseName: 'Everest (Sabah & Sarawak)'
    };
    exports$2.fschr60 = {
        a: 6378166,
        rf: 298.3,
        ellipseName: 'Fischer (Mercury Datum) 1960'
    };
    exports$2.fschr60m = {
        a: 6378155,
        rf: 298.3,
        ellipseName: 'Fischer 1960'
    };
    exports$2.fschr68 = {
        a: 6378150,
        rf: 298.3,
        ellipseName: 'Fischer 1968'
    };
    exports$2.helmert = {
        a: 6378200,
        rf: 298.3,
        ellipseName: 'Helmert 1906'
    };
    exports$2.hough = {
        a: 6378270,
        rf: 297,
        ellipseName: 'Hough'
    };
    exports$2.intl = {
        a: 6378388,
        rf: 297,
        ellipseName: 'International 1909 (Hayford)'
    };
    exports$2.kaula = {
        a: 6378163,
        rf: 298.24,
        ellipseName: 'Kaula 1961'
    };
    exports$2.lerch = {
        a: 6378139,
        rf: 298.257,
        ellipseName: 'Lerch 1979'
    };
    exports$2.mprts = {
        a: 6397300,
        rf: 191,
        ellipseName: 'Maupertius 1738'
    };
    exports$2.new_intl = {
        a: 6378157.5,
        b: 6356772.2,
        ellipseName: 'New International 1967'
    };
    exports$2.plessis = {
        a: 6376523,
        rf: 6355863,
        ellipseName: 'Plessis 1817 (France)'
    };
    exports$2.krass = {
        a: 6378245,
        rf: 298.3,
        ellipseName: 'Krassovsky, 1942'
    };
    exports$2.SEasia = {
        a: 6378155,
        b: 6356773.3205,
        ellipseName: 'Southeast Asia'
    };
    exports$2.walbeck = {
        a: 6376896,
        b: 6355834.8467,
        ellipseName: 'Walbeck'
    };
    exports$2.WGS60 = {
        a: 6378165,
        rf: 298.3,
        ellipseName: 'WGS 60'
    };
    exports$2.WGS66 = {
        a: 6378145,
        rf: 298.25,
        ellipseName: 'WGS 66'
    };
    exports$2.WGS7 = {
        a: 6378135,
        rf: 298.26,
        ellipseName: 'WGS 72'
    };
    var WGS84 = exports$2.WGS84 = {
        a: 6378137,
        rf: 298.257223563,
        ellipseName: 'WGS 84'
    };
    exports$2.sphere = {
        a: 6370997,
        b: 6370997,
        ellipseName: 'Normal Sphere (r=6370997)'
    };
    function eccentricity(a, b, rf, R_A) {
        var a2 = a * a;
        var b2 = b * b;
        var es = (a2 - b2) / a2;
        var e = 0;
        if (R_A) {
            a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
            a2 = a * a;
            es = 0;
        } else {
            e = Math.sqrt(es);
        }
        var ep2 = (a2 - b2) / b2;
        return {
            es: es,
            e: e,
            ep2: ep2
        };
    }
    function sphere(a, b, rf, ellps, sphere) {
        if (!a) {
            var ellipse = match(exports$2, ellps);
            if (!ellipse) {
                ellipse = WGS84;
            }
            a = ellipse.a;
            b = ellipse.b;
            rf = ellipse.rf;
        }
        if (rf && !b) {
            b = (1 - 1 / rf) * a;
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
        towgs84: '0,0,0',
        ellipse: 'WGS84',
        datumName: 'WGS84'
    };
    exports$3.ch1903 = {
        towgs84: '674.374,15.056,405.346',
        ellipse: 'bessel',
        datumName: 'swiss'
    };
    exports$3.ggrs87 = {
        towgs84: '-199.87,74.79,246.62',
        ellipse: 'GRS80',
        datumName: 'Greek_Geodetic_Reference_System_1987'
    };
    exports$3.nad83 = {
        towgs84: '0,0,0',
        ellipse: 'GRS80',
        datumName: 'North_American_Datum_1983'
    };
    exports$3.nad27 = {
        nadgrids: '@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat',
        ellipse: 'clrk66',
        datumName: 'North_American_Datum_1927'
    };
    exports$3.potsdam = {
        towgs84: '606.0,23.0,413.0',
        ellipse: 'bessel',
        datumName: 'Potsdam Rauenberg 1950 DHDN'
    };
    exports$3.carthage = {
        towgs84: '-263.0,6.0,431.0',
        ellipse: 'clark80',
        datumName: 'Carthage 1934 Tunisia'
    };
    exports$3.hermannskogel = {
        towgs84: '653.0,-212.0,449.0',
        ellipse: 'bessel',
        datumName: 'Hermannskogel'
    };
    exports$3.osni52 = {
        towgs84: '482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15',
        ellipse: 'airy',
        datumName: 'Irish National'
    };
    exports$3.ire65 = {
        towgs84: '482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15',
        ellipse: 'mod_airy',
        datumName: 'Ireland 1965'
    };
    exports$3.rassadiran = {
        towgs84: '-133.63,-157.5,-158.62',
        ellipse: 'intl',
        datumName: 'Rassadiran'
    };
    exports$3.nzgd49 = {
        towgs84: '59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993',
        ellipse: 'intl',
        datumName: 'New Zealand Geodetic Datum 1949'
    };
    exports$3.osgb36 = {
        towgs84: '446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894',
        ellipse: 'airy',
        datumName: 'Airy 1830'
    };
    exports$3.s_jtsk = {
        towgs84: '589,76,480',
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
        towgs84: '106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1',
        ellipse: 'intl',
        datumName: 'Reseau National Belge 1972'
    };
    function datum(datumCode, datum_params, a, b, es, ep2) {
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
                    out.datum_params[6] = out.datum_params[6] / 1000000 + 1;
                }
            }
        }
        out.a = a;
        out.b = b;
        out.es = es;
        out.ep2 = ep2;
        return out;
    }
    function Projection$1(srsCode, callback) {
        if (!(this instanceof Projection$1)) {
            return new Projection$1(srsCode);
        }
        callback = callback || function (error) {
            if (error) {
                throw error;
            }
        };
        var json = parse(srsCode);
        if (typeof json !== 'object') {
            callback(srsCode);
            return;
        }
        var ourProj = Projection$1.projections.get(json.projName);
        if (!ourProj) {
            callback(srsCode);
            return;
        }
        if (json.datumCode && json.datumCode !== 'none') {
            var datumDef = match(exports$3, json.datumCode);
            if (datumDef) {
                json.datum_params = datumDef.towgs84 ? datumDef.towgs84.split(',') : null;
                json.ellps = datumDef.ellipse;
                json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
            }
        }
        json.k0 = json.k0 || 1;
        json.axis = json.axis || 'enu';
        json.ellps = json.ellps || 'wgs84';
        var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
        var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
        var datumObj = json.datum || datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2);
        extend(this, json);
        extend(this, ourProj);
        this.a = sphere_.a;
        this.b = sphere_.b;
        this.rf = sphere_.rf;
        this.sphere = sphere_.sphere;
        this.es = ecc.es;
        this.e = ecc.e;
        this.ep2 = ecc.ep2;
        this.datum = datumObj;
        this.init();
        callback(null, this);
    }
    Projection$1.projections = projections;
    Projection$1.projections.start();
    function compareDatums(source, dest) {
        if (source.datum_type !== dest.datum_type) {
            return false;
        } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 5e-11) {
            return false;
        } else if (source.datum_type === PJD_3PARAM) {
            return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
        } else if (source.datum_type === PJD_7PARAM) {
            return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
        } else {
            return true;
        }
    }
    function geodeticToGeocentric(p, es, a) {
        var Longitude = p.x;
        var Latitude = p.y;
        var Height = p.z ? p.z : 0;
        var Rn;
        var Sin_Lat;
        var Sin2_Lat;
        var Cos_Lat;
        if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
            Latitude = -HALF_PI;
        } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
            Latitude = HALF_PI;
        } else if (Latitude < -HALF_PI || Latitude > HALF_PI) {
            return null;
        }
        if (Longitude > Math.PI) {
            Longitude -= 2 * Math.PI;
        }
        Sin_Lat = Math.sin(Latitude);
        Cos_Lat = Math.cos(Latitude);
        Sin2_Lat = Sin_Lat * Sin_Lat;
        Rn = a / Math.sqrt(1 - es * Sin2_Lat);
        return {
            x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
            y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
            z: (Rn * (1 - es) + Height) * Sin_Lat
        };
    }
    function geocentricToGeodetic(p, es, a, b) {
        var genau = 1e-12;
        var genau2 = genau * genau;
        var maxiter = 30;
        var P;
        var RR;
        var CT;
        var ST;
        var RX;
        var RK;
        var RN;
        var CPHI0;
        var SPHI0;
        var CPHI;
        var SPHI;
        var SDPHI;
        var iter;
        var X = p.x;
        var Y = p.y;
        var Z = p.z ? p.z : 0;
        var Longitude;
        var Latitude;
        var Height;
        P = Math.sqrt(X * X + Y * Y);
        RR = Math.sqrt(X * X + Y * Y + Z * Z);
        if (P / a < genau) {
            Longitude = 0;
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
            Longitude = Math.atan2(Y, X);
        }
        CT = Z / RR;
        ST = P / RR;
        RX = 1 / Math.sqrt(1 - es * (2 - es) * ST * ST);
        CPHI0 = ST * (1 - es) * RX;
        SPHI0 = CT * RX;
        iter = 0;
        do {
            iter++;
            RN = a / Math.sqrt(1 - es * SPHI0 * SPHI0);
            Height = P * CPHI0 + Z * SPHI0 - RN * (1 - es * SPHI0 * SPHI0);
            RK = es * RN / (RN + Height);
            RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST);
            CPHI = ST * (1 - RK) * RX;
            SPHI = CT * RX;
            SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
            CPHI0 = CPHI;
            SPHI0 = SPHI;
        } while (SDPHI * SDPHI > genau2 && iter < maxiter);
        Latitude = Math.atan(SPHI / Math.abs(CPHI));
        return {
            x: Longitude,
            y: Latitude,
            z: Height
        };
    }
    function geocentricToWgs84(p, datum_type, datum_params) {
        if (datum_type === PJD_3PARAM) {
            return {
                x: p.x + datum_params[0],
                y: p.y + datum_params[1],
                z: p.z + datum_params[2]
            };
        } else if (datum_type === PJD_7PARAM) {
            var Dx_BF = datum_params[0];
            var Dy_BF = datum_params[1];
            var Dz_BF = datum_params[2];
            var Rx_BF = datum_params[3];
            var Ry_BF = datum_params[4];
            var Rz_BF = datum_params[5];
            var M_BF = datum_params[6];
            return {
                x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
                y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
                z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
            };
        }
    }
    function geocentricFromWgs84(p, datum_type, datum_params) {
        if (datum_type === PJD_3PARAM) {
            return {
                x: p.x - datum_params[0],
                y: p.y - datum_params[1],
                z: p.z - datum_params[2]
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
            return {
                x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
                y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
                z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
            };
        }
    }
    function checkParams(type) {
        return type === PJD_3PARAM || type === PJD_7PARAM;
    }
    var datum_transform = function (source, dest, point) {
        if (compareDatums(source, dest)) {
            return point;
        }
        if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
            return point;
        }
        if (source.es === dest.es && source.a === dest.a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
            return point;
        }
        point = geodeticToGeocentric(point, source.es, source.a);
        if (checkParams(source.datum_type)) {
            point = geocentricToWgs84(point, source.datum_type, source.datum_params);
        }
        if (checkParams(dest.datum_type)) {
            point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
        }
        return geocentricToGeodetic(point, dest.es, dest.a, dest.b);
    };
    var adjust_axis = function (crs, denorm, point) {
        var xin = point.x, yin = point.y, zin = point.z || 0;
        var v, t, i;
        var out = {};
        for (i = 0; i < 3; i++) {
            if (denorm && i === 2 && point.z === undefined) {
                continue;
            }
            if (i === 0) {
                v = xin;
                t = 'x';
            } else if (i === 1) {
                v = yin;
                t = 'y';
            } else {
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
                return null;
            }
        }
        return out;
    };
    var toPoint = function (array) {
        var out = {
            x: array[0],
            y: array[1]
        };
        if (array.length > 2) {
            out.z = array[2];
        }
        if (array.length > 3) {
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
        return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM) && dest.datumCode !== 'WGS84' || (dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM) && source.datumCode !== 'WGS84';
    }
    function transform(source, dest, point) {
        var wgs84;
        if (Array.isArray(point)) {
            point = toPoint(point);
        }
        checkSanity(point);
        if (source.datum && dest.datum && checkNotWGS(source, dest)) {
            wgs84 = new Projection$1('WGS84');
            point = transform(source, wgs84, point);
            source = wgs84;
        }
        if (source.axis !== 'enu') {
            point = adjust_axis(source, false, point);
        }
        if (source.projName === 'longlat') {
            point = {
                x: point.x * D2R,
                y: point.y * D2R
            };
        } else {
            if (source.to_meter) {
                point = {
                    x: point.x * source.to_meter,
                    y: point.y * source.to_meter
                };
            }
            point = source.inverse(point);
        }
        if (source.from_greenwich) {
            point.x += source.from_greenwich;
        }
        point = datum_transform(source.datum, dest.datum, point);
        if (dest.from_greenwich) {
            point = {
                x: point.x - dest.from_greenwich,
                y: point.y
            };
        }
        if (dest.projName === 'longlat') {
            point = {
                x: point.x * R2D,
                y: point.y * R2D
            };
        } else {
            point = dest.forward(point);
            if (dest.to_meter) {
                point = {
                    x: point.x / dest.to_meter,
                    y: point.y / dest.to_meter
                };
            }
        }
        if (dest.axis !== 'enu') {
            return adjust_axis(dest, true, point);
        }
        return point;
    }
    var wgs84 = Projection$1('WGS84');
    function transformer(from, to, coords) {
        var transformedArray, out, keys;
        if (Array.isArray(coords)) {
            transformedArray = transform(from, to, coords);
            if (coords.length === 3) {
                return [
                    transformedArray.x,
                    transformedArray.y,
                    transformedArray.z
                ];
            } else {
                return [
                    transformedArray.x,
                    transformedArray.y
                ];
            }
        } else {
            out = transform(from, to, coords);
            keys = Object.keys(coords);
            if (keys.length === 2) {
                return out;
            }
            keys.forEach(function (key) {
                if (key === 'x' || key === 'y') {
                    return;
                }
                out[key] = coords[key];
            });
            return out;
        }
    }
    function checkProj(item) {
        if (item instanceof Projection$1) {
            return item;
        }
        if (item.oProj) {
            return item.oProj;
        }
        return Projection$1(item);
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
                forward: function (coords) {
                    return transformer(fromProj, toProj, coords);
                },
                inverse: function (coords) {
                    return transformer(toProj, fromProj, coords);
                }
            };
            if (single) {
                obj.oProj = toProj;
            }
            return obj;
        }
    }
    var NUM_100K_SETS = 6;
    var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';
    var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';
    var A = 65;
    var I = 73;
    var O = 79;
    var V = 86;
    var Z = 90;
    var mgrs = {
        forward: forward$1,
        inverse: inverse$1,
        toPoint: toPoint$1
    };
    function forward$1(ll, accuracy) {
        accuracy = accuracy || 5;
        return encode(LLtoUTM({
            lat: ll[1],
            lon: ll[0]
        }), accuracy);
    }
    function inverse$1(mgrs) {
        var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
        if (bbox.lat && bbox.lon) {
            return [
                bbox.lon,
                bbox.lat,
                bbox.lon,
                bbox.lat
            ];
        }
        return [
            bbox.left,
            bbox.bottom,
            bbox.right,
            bbox.top
        ];
    }
    function toPoint$1(mgrs) {
        var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
        if (bbox.lat && bbox.lon) {
            return [
                bbox.lon,
                bbox.lat
            ];
        }
        return [
            (bbox.left + bbox.right) / 2,
            (bbox.top + bbox.bottom) / 2
        ];
    }
    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }
    function radToDeg(rad) {
        return 180 * (rad / Math.PI);
    }
    function LLtoUTM(ll) {
        var Lat = ll.lat;
        var Long = ll.lon;
        var a = 6378137;
        var eccSquared = 0.00669438;
        var k0 = 0.9996;
        var LongOrigin;
        var eccPrimeSquared;
        var N, T, C, A, M;
        var LatRad = degToRad(Lat);
        var LongRad = degToRad(Long);
        var LongOriginRad;
        var ZoneNumber;
        ZoneNumber = Math.floor((Long + 180) / 6) + 1;
        if (Long === 180) {
            ZoneNumber = 60;
        }
        if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) {
            ZoneNumber = 32;
        }
        if (Lat >= 72 && Lat < 84) {
            if (Long >= 0 && Long < 9) {
                ZoneNumber = 31;
            } else if (Long >= 9 && Long < 21) {
                ZoneNumber = 33;
            } else if (Long >= 21 && Long < 33) {
                ZoneNumber = 35;
            } else if (Long >= 33 && Long < 42) {
                ZoneNumber = 37;
            }
        }
        LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
        LongOriginRad = degToRad(LongOrigin);
        eccPrimeSquared = eccSquared / (1 - eccSquared);
        N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
        T = Math.tan(LatRad) * Math.tan(LatRad);
        C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
        A = Math.cos(LatRad) * (LongRad - LongOriginRad);
        M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
        var UTMEasting = k0 * N * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120) + 500000;
        var UTMNorthing = k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720));
        if (Lat < 0) {
            UTMNorthing += 10000000;
        }
        return {
            northing: Math.round(UTMNorthing),
            easting: Math.round(UTMEasting),
            zoneNumber: ZoneNumber,
            zoneLetter: getLetterDesignator(Lat)
        };
    }
    function UTMtoLL(utm) {
        var UTMNorthing = utm.northing;
        var UTMEasting = utm.easting;
        var zoneLetter = utm.zoneLetter;
        var zoneNumber = utm.zoneNumber;
        if (zoneNumber < 0 || zoneNumber > 60) {
            return null;
        }
        var k0 = 0.9996;
        var a = 6378137;
        var eccSquared = 0.00669438;
        var eccPrimeSquared;
        var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
        var N1, T1, C1, R1, D, M;
        var LongOrigin;
        var mu, phi1Rad;
        var x = UTMEasting - 500000;
        var y = UTMNorthing;
        if (zoneLetter < 'N') {
            y -= 10000000;
        }
        LongOrigin = (zoneNumber - 1) * 6 - 180 + 3;
        eccPrimeSquared = eccSquared / (1 - eccSquared);
        M = y / k0;
        mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
        phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
        N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
        T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
        C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
        R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
        D = x / (N1 * k0);
        var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
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
        } else {
            result = {
                lat: lat,
                lon: lon
            };
        }
        return result;
    }
    function getLetterDesignator(lat) {
        var LetterDesignator = 'Z';
        if (84 >= lat && lat >= 72) {
            LetterDesignator = 'X';
        } else if (72 > lat && lat >= 64) {
            LetterDesignator = 'W';
        } else if (64 > lat && lat >= 56) {
            LetterDesignator = 'V';
        } else if (56 > lat && lat >= 48) {
            LetterDesignator = 'U';
        } else if (48 > lat && lat >= 40) {
            LetterDesignator = 'T';
        } else if (40 > lat && lat >= 32) {
            LetterDesignator = 'S';
        } else if (32 > lat && lat >= 24) {
            LetterDesignator = 'R';
        } else if (24 > lat && lat >= 16) {
            LetterDesignator = 'Q';
        } else if (16 > lat && lat >= 8) {
            LetterDesignator = 'P';
        } else if (8 > lat && lat >= 0) {
            LetterDesignator = 'N';
        } else if (0 > lat && lat >= -8) {
            LetterDesignator = 'M';
        } else if (-8 > lat && lat >= -16) {
            LetterDesignator = 'L';
        } else if (-16 > lat && lat >= -24) {
            LetterDesignator = 'K';
        } else if (-24 > lat && lat >= -32) {
            LetterDesignator = 'J';
        } else if (-32 > lat && lat >= -40) {
            LetterDesignator = 'H';
        } else if (-40 > lat && lat >= -48) {
            LetterDesignator = 'G';
        } else if (-48 > lat && lat >= -56) {
            LetterDesignator = 'F';
        } else if (-56 > lat && lat >= -64) {
            LetterDesignator = 'E';
        } else if (-64 > lat && lat >= -72) {
            LetterDesignator = 'D';
        } else if (-72 > lat && lat >= -80) {
            LetterDesignator = 'C';
        }
        return LetterDesignator;
    }
    function encode(utm, accuracy) {
        var seasting = '00000' + utm.easting, snorthing = '00000' + utm.northing;
        return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
    }
    function get100kID(easting, northing, zoneNumber) {
        var setParm = get100kSetForZone(zoneNumber);
        var setColumn = Math.floor(easting / 100000);
        var setRow = Math.floor(northing / 100000) % 20;
        return getLetter100kID(setColumn, setRow, setParm);
    }
    function get100kSetForZone(i) {
        var setParm = i % NUM_100K_SETS;
        if (setParm === 0) {
            setParm = NUM_100K_SETS;
        }
        return setParm;
    }
    function getLetter100kID(column, row, parm) {
        var index = parm - 1;
        var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
        var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);
        var colInt = colOrigin + column - 1;
        var rowInt = rowOrigin + row;
        var rollover = false;
        if (colInt > Z) {
            colInt = colInt - Z + A - 1;
            rollover = true;
        }
        if (colInt === I || colOrigin < I && colInt > I || (colInt > I || colOrigin < I) && rollover) {
            colInt++;
        }
        if (colInt === O || colOrigin < O && colInt > O || (colInt > O || colOrigin < O) && rollover) {
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
        } else {
            rollover = false;
        }
        if (rowInt === I || rowOrigin < I && rowInt > I || (rowInt > I || rowOrigin < I) && rollover) {
            rowInt++;
        }
        if (rowInt === O || rowOrigin < O && rowInt > O || (rowInt > O || rowOrigin < O) && rollover) {
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
    function decode(mgrsString) {
        if (mgrsString && mgrsString.length === 0) {
            throw 'MGRSPoint coverting from nothing';
        }
        var length = mgrsString.length;
        var hunK = null;
        var sb = '';
        var testChar;
        var i = 0;
        while (!/[A-Z]/.test(testChar = mgrsString.charAt(i))) {
            if (i >= 2) {
                throw 'MGRSPoint bad conversion from: ' + mgrsString;
            }
            sb += testChar;
            i++;
        }
        var zoneNumber = parseInt(sb, 10);
        if (i === 0 || i + 3 > length) {
            throw 'MGRSPoint bad conversion from: ' + mgrsString;
        }
        var zoneLetter = mgrsString.charAt(i++);
        if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
            throw 'MGRSPoint zone letter ' + zoneLetter + ' not handled: ' + mgrsString;
        }
        hunK = mgrsString.substring(i, i += 2);
        var set = get100kSetForZone(zoneNumber);
        var east100k = getEastingFromChar(hunK.charAt(0), set);
        var north100k = getNorthingFromChar(hunK.charAt(1), set);
        while (north100k < getMinNorthing(zoneLetter)) {
            north100k += 2000000;
        }
        var remainder = length - i;
        if (remainder % 2 !== 0) {
            throw 'MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters' + mgrsString;
        }
        var sep = remainder / 2;
        var sepEasting = 0;
        var sepNorthing = 0;
        var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
        if (sep > 0) {
            accuracyBonus = 100000 / Math.pow(10, sep);
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
    function getEastingFromChar(e, set) {
        var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
        var eastingValue = 100000;
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
                    throw 'Bad character: ' + e;
                }
                curCol = A;
                rewindMarker = true;
            }
            eastingValue += 100000;
        }
        return eastingValue;
    }
    function getNorthingFromChar(n, set) {
        if (n > 'V') {
            throw 'MGRSPoint given invalid Northing ' + n;
        }
        var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
        var northingValue = 0;
        var rewindMarker = false;
        while (curRow !== n.charCodeAt(0)) {
            curRow++;
            if (curRow === I) {
                curRow++;
            }
            if (curRow === O) {
                curRow++;
            }
            if (curRow > V) {
                if (rewindMarker) {
                    throw 'Bad character: ' + n;
                }
                curRow = A;
                rewindMarker = true;
            }
            northingValue += 100000;
        }
        return northingValue;
    }
    function getMinNorthing(zoneLetter) {
        var northing;
        switch (zoneLetter) {
        case 'C':
            northing = 1100000;
            break;
        case 'D':
            northing = 2000000;
            break;
        case 'E':
            northing = 2800000;
            break;
        case 'F':
            northing = 3700000;
            break;
        case 'G':
            northing = 4600000;
            break;
        case 'H':
            northing = 5500000;
            break;
        case 'J':
            northing = 6400000;
            break;
        case 'K':
            northing = 7300000;
            break;
        case 'L':
            northing = 8200000;
            break;
        case 'M':
            northing = 9100000;
            break;
        case 'N':
            northing = 0;
            break;
        case 'P':
            northing = 800000;
            break;
        case 'Q':
            northing = 1700000;
            break;
        case 'R':
            northing = 2600000;
            break;
        case 'S':
            northing = 3500000;
            break;
        case 'T':
            northing = 4400000;
            break;
        case 'U':
            northing = 5300000;
            break;
        case 'V':
            northing = 6200000;
            break;
        case 'W':
            northing = 7000000;
            break;
        case 'X':
            northing = 7900000;
            break;
        default:
            northing = -1;
        }
        if (northing >= 0) {
            return northing;
        } else {
            throw 'Invalid zone letter: ' + zoneLetter;
        }
    }
    function Point(x, y, z) {
        if (!(this instanceof Point)) {
            return new Point(x, y, z);
        }
        if (Array.isArray(x)) {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2] || 0;
        } else if (typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z || 0;
        } else if (typeof x === 'string' && typeof y === 'undefined') {
            var coords = x.split(',');
            this.x = parseFloat(coords[0], 10);
            this.y = parseFloat(coords[1], 10);
            this.z = parseFloat(coords[2], 10) || 0;
        } else {
            this.x = x;
            this.y = y;
            this.z = z || 0;
        }
        console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
    }
    Point.fromMGRS = function (mgrsStr) {
        return new Point(toPoint$1(mgrsStr));
    };
    Point.prototype.toMGRS = function (accuracy) {
        return forward$1([
            this.x,
            this.y
        ], accuracy);
    };
    var version = '2.4.4';
    var C00 = 1;
    var C02 = 0.25;
    var C04 = 0.046875;
    var C06 = 0.01953125;
    var C08 = 0.01068115234375;
    var C22 = 0.75;
    var C44 = 0.46875;
    var C46 = 0.013020833333333334;
    var C48 = 0.007120768229166667;
    var C66 = 0.3645833333333333;
    var C68 = 0.005696614583333333;
    var C88 = 0.3076171875;
    var pj_enfn = function (es) {
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
    var pj_mlfn = function (phi, sphi, cphi, en) {
        cphi *= sphi;
        sphi *= sphi;
        return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
    };
    var MAX_ITER = 20;
    var pj_inv_mlfn = function (arg, es, en) {
        var k = 1 / (1 - es);
        var phi = arg;
        for (var i = MAX_ITER; i; --i) {
            var s = Math.sin(phi);
            var t = 1 - es * s * s;
            t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
            phi -= t;
            if (Math.abs(t) < EPSLN) {
                return phi;
            }
        }
        return phi;
    };
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
            if (Math.abs(Math.abs(b) - 1) < EPSLN) {
                return 93;
            } else {
                x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
                y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
                b = Math.abs(y);
                if (b >= 1) {
                    if (b - 1 > EPSLN) {
                        return 93;
                    } else {
                        y = 0;
                    }
                } else {
                    y = Math.acos(y);
                }
                if (lat < 0) {
                    y = -y;
                }
                y = this.a * this.k0 * (y - this.lat0) + this.y0;
            }
        } else {
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
            x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
            y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
        }
        p.x = x;
        p.y = y;
        return p;
    }
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
            if (g === 0 && h === 0) {
                lon = 0;
            } else {
                lon = adjust_lon(Math.atan2(g, h) + this.long0);
            }
        } else {
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
                lat = phi - con * ds / (1 - this.es) * 0.5 * (1 - ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
                lon = adjust_lon(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi);
            } else {
                lat = HALF_PI * sign(y);
                lon = 0;
            }
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$3 = [
        'Transverse_Mercator',
        'Transverse Mercator',
        'tmerc'
    ];
    var tmerc = {
        init: init$2,
        forward: forward$2,
        inverse: inverse$2,
        names: names$3
    };
    var sinh = function (x) {
        var r = Math.exp(x);
        r = (r - 1 / r) / 2;
        return r;
    };
    var hypot = function (x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        var a = Math.max(x, y);
        var b = Math.min(x, y) / (a ? a : 1);
        return a * Math.sqrt(1 + Math.pow(b, 2));
    };
    var log1py = function (x) {
        var y = 1 + x;
        var z = y - 1;
        return z === 0 ? x : x * Math.log(y) / z;
    };
    var asinhy = function (x) {
        var y = Math.abs(x);
        y = log1py(y * (1 + y / (hypot(1, y) + 1)));
        return x < 0 ? -y : y;
    };
    var gatg = function (pp, B) {
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
        return B + h * Math.sin(2 * B);
    };
    var clens = function (pp, arg_r) {
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
    var cosh = function (x) {
        var r = Math.exp(x);
        r = (r + 1 / r) / 2;
        return r;
    };
    var clens_cmplx = function (pp, arg_r, arg_i) {
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
        return [
            r * hr - i * hi,
            r * hi + i * hr
        ];
    };
    function init$3() {
        if (this.es === undefined || this.es <= 0) {
            throw new Error('incorrect elliptical usage');
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
        this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
        this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
        np = np * n;
        this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
        this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
        np = np * n;
        this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
        this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
        np = np * n;
        this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
        this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
        np = np * n;
        this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
        this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
        np = np * n;
        this.cgb[5] = np * (601676 / 22275);
        this.cbg[5] = np * (444337 / 155925);
        np = Math.pow(n, 2);
        this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
        this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
        this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
        this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
        this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
        np = np * n;
        this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
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
        } else {
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
        } else {
            lon = Infinity;
            lat = Infinity;
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$4 = [
        'Extended_Transverse_Mercator',
        'Extended Transverse Mercator',
        'etmerc'
    ];
    var etmerc = {
        init: init$3,
        forward: forward$3,
        inverse: inverse$3,
        names: names$4
    };
    var adjust_zone = function (zone, lon) {
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
        this.long0 = (6 * Math.abs(zone) - 183) * D2R;
        this.x0 = 500000;
        this.y0 = this.utmSouth ? 10000000 : 0;
        this.k0 = 0.9996;
        etmerc.init.apply(this);
        this.forward = etmerc.forward;
        this.inverse = etmerc.inverse;
    }
    var names$5 = [
        'Universal Transverse Mercator System',
        'utm'
    ];
    var utm = {
        init: init$4,
        names: names$5,
        dependsOn: dependsOn
    };
    var srat = function (esinp, exp) {
        return Math.pow((1 - esinp) / (1 + esinp), exp);
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
            lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), -0.5 * this.e)) - HALF_PI;
            if (Math.abs(lat - p.y) < DEL_TOL) {
                break;
            }
            p.y = lat;
        }
        if (!i) {
            return null;
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$7 = ['gauss'];
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
            this.title = 'Oblique Stereographic Alternative';
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
        if (rho = Math.sqrt(p.x * p.x + p.y * p.y)) {
            var c = 2 * Math.atan2(rho, this.R2);
            sinc = Math.sin(c);
            cosc = Math.cos(c);
            lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
            lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
        } else {
            lat = this.phic0;
            lon = 0;
        }
        p.x = lon;
        p.y = lat;
        gauss.inverse.apply(this, [p]);
        p.x = adjust_lon(p.x + this.long0);
        return p;
    }
    var names$6 = [
        'Stereographic_North_Pole',
        'Oblique_Stereographic',
        'Polar_Stereographic',
        'sterea',
        'Oblique Stereographic Alternative'
    ];
    var sterea = {
        init: init$5,
        forward: forward$4,
        inverse: inverse$4,
        names: names$6
    };
    function ssfn_(phit, sinphi, eccen) {
        sinphi *= eccen;
        return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen);
    }
    function init$7() {
        this.coslat0 = Math.cos(this.lat0);
        this.sinlat0 = Math.sin(this.lat0);
        if (this.sphere) {
            if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
                this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
            }
        } else {
            if (Math.abs(this.coslat0) <= EPSLN) {
                if (this.lat0 > 0) {
                    this.con = 1;
                } else {
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
    function forward$6(p) {
        var lon = p.x;
        var lat = p.y;
        var sinlat = Math.sin(lat);
        var coslat = Math.cos(lat);
        var A, X, sinX, cosX, ts, rh;
        var dlon = adjust_lon(lon - this.long0);
        if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
            p.x = NaN;
            p.y = NaN;
            return p;
        }
        if (this.sphere) {
            A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
            p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
            p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
            return p;
        } else {
            X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
            cosX = Math.cos(X);
            sinX = Math.sin(X);
            if (Math.abs(this.coslat0) <= EPSLN) {
                ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
                rh = 2 * this.a * this.k0 * ts / this.cons;
                p.x = this.x0 + rh * Math.sin(lon - this.long0);
                p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
                return p;
            } else if (Math.abs(this.sinlat0) < EPSLN) {
                A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
                p.y = A * sinX;
            } else {
                A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
                p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
            }
            p.x = A * cosX * Math.sin(dlon) + this.x0;
        }
        return p;
    }
    function inverse$6(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var lon, lat, ts, ce, Chi;
        var rh = Math.sqrt(p.x * p.x + p.y * p.y);
        if (this.sphere) {
            var c = 2 * Math.atan(rh / (0.5 * this.a * this.k0));
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
                    lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y));
                } else {
                    lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
                }
            } else {
                lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
            }
            p.x = lon;
            p.y = lat;
            return p;
        } else {
            if (Math.abs(this.coslat0) <= EPSLN) {
                if (rh <= EPSLN) {
                    lat = this.lat0;
                    lon = this.long0;
                    p.x = lon;
                    p.y = lat;
                    return p;
                }
                p.x *= this.con;
                p.y *= this.con;
                ts = rh * this.cons / (2 * this.a * this.k0);
                lat = this.con * phi2z(this.e, ts);
                lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, -1 * p.y));
            } else {
                ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
                lon = this.long0;
                if (rh <= EPSLN) {
                    Chi = this.X0;
                } else {
                    Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
                    lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
                }
                lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
            }
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$8 = [
        'stere',
        'Stereographic_South_Pole',
        'Polar Stereographic (variant B)'
    ];
    var stere = {
        init: init$7,
        forward: forward$6,
        inverse: inverse$6,
        names: names$8,
        ssfn_: ssfn_
    };
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
        var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);
        var I = this.alpha * (p.x - this.lambda0);
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
        while (Math.abs(phy - prevPhy) > 1e-7) {
            if (++iteration > 20) {
                return;
            }
            S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
            prevPhy = phy;
            phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
        }
        p.x = lambda;
        p.y = phy;
        return p;
    }
    var names$9 = ['somerc'];
    var somerc = {
        init: init$8,
        forward: forward$7,
        inverse: inverse$7,
        names: names$9
    };
    function init$9() {
        this.no_off = this.no_off || false;
        this.no_rot = this.no_rot || false;
        if (isNaN(this.k0)) {
            this.k0 = 1;
        }
        var sinlat = Math.sin(this.lat0);
        var coslat = Math.cos(this.lat0);
        var con = this.e * sinlat;
        this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(coslat, 4));
        this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - con * con);
        var t0 = tsfnz(this.e, this.lat0, sinlat);
        var dl = this.bl / coslat * Math.sqrt((1 - this.es) / (1 - con * con));
        if (dl * dl < 1) {
            dl = 1;
        }
        var fl;
        var gl;
        if (!isNaN(this.longc)) {
            if (this.lat0 >= 0) {
                fl = dl + Math.sqrt(dl * dl - 1);
            } else {
                fl = dl - Math.sqrt(dl * dl - 1);
            }
            this.el = fl * Math.pow(t0, this.bl);
            gl = 0.5 * (fl - 1 / fl);
            this.gamma0 = Math.asin(Math.sin(this.alpha) / dl);
            this.long0 = this.longc - Math.asin(gl * Math.tan(this.gamma0)) / this.bl;
        } else {
            var t1 = tsfnz(this.e, this.lat1, Math.sin(this.lat1));
            var t2 = tsfnz(this.e, this.lat2, Math.sin(this.lat2));
            if (this.lat0 >= 0) {
                this.el = (dl + Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
            } else {
                this.el = (dl - Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
            }
            var hl = Math.pow(t1, this.bl);
            var ll = Math.pow(t2, this.bl);
            fl = this.el / hl;
            gl = 0.5 * (fl - 1 / fl);
            var jl = (this.el * this.el - ll * hl) / (this.el * this.el + ll * hl);
            var pl = (ll - hl) / (ll + hl);
            var dlon12 = adjust_lon(this.long1 - this.long2);
            this.long0 = 0.5 * (this.long1 + this.long2) - Math.atan(jl * Math.tan(0.5 * this.bl * dlon12) / pl) / this.bl;
            this.long0 = adjust_lon(this.long0);
            var dlon10 = adjust_lon(this.long1 - this.long0);
            this.gamma0 = Math.atan(Math.sin(this.bl * dlon10) / gl);
            this.alpha = Math.asin(dl * Math.sin(this.gamma0));
        }
        if (this.no_off) {
            this.uc = 0;
        } else {
            if (this.lat0 >= 0) {
                this.uc = this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
            } else {
                this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
            }
        }
    }
    function forward$8(p) {
        var lon = p.x;
        var lat = p.y;
        var dlon = adjust_lon(lon - this.long0);
        var us, vs;
        var con;
        if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
            if (lat > 0) {
                con = -1;
            } else {
                con = 1;
            }
            vs = this.al / this.bl * Math.log(Math.tan(FORTPI + con * this.gamma0 * 0.5));
            us = -1 * con * HALF_PI * this.al / this.bl;
        } else {
            var t = tsfnz(this.e, lat, Math.sin(lat));
            var ql = this.el / Math.pow(t, this.bl);
            var sl = 0.5 * (ql - 1 / ql);
            var tl = 0.5 * (ql + 1 / ql);
            var vl = Math.sin(this.bl * dlon);
            var ul = (sl * Math.sin(this.gamma0) - vl * Math.cos(this.gamma0)) / tl;
            if (Math.abs(Math.abs(ul) - 1) <= EPSLN) {
                vs = Number.POSITIVE_INFINITY;
            } else {
                vs = 0.5 * this.al * Math.log((1 - ul) / (1 + ul)) / this.bl;
            }
            if (Math.abs(Math.cos(this.bl * dlon)) <= EPSLN) {
                us = this.al * this.bl * dlon;
            } else {
                us = this.al * Math.atan2(sl * Math.cos(this.gamma0) + vl * Math.sin(this.gamma0), Math.cos(this.bl * dlon)) / this.bl;
            }
        }
        if (this.no_rot) {
            p.x = this.x0 + us;
            p.y = this.y0 + vs;
        } else {
            us -= this.uc;
            p.x = this.x0 + vs * Math.cos(this.alpha) + us * Math.sin(this.alpha);
            p.y = this.y0 + us * Math.cos(this.alpha) - vs * Math.sin(this.alpha);
        }
        return p;
    }
    function inverse$8(p) {
        var us, vs;
        if (this.no_rot) {
            vs = p.y - this.y0;
            us = p.x - this.x0;
        } else {
            vs = (p.x - this.x0) * Math.cos(this.alpha) - (p.y - this.y0) * Math.sin(this.alpha);
            us = (p.y - this.y0) * Math.cos(this.alpha) + (p.x - this.x0) * Math.sin(this.alpha);
            us += this.uc;
        }
        var qp = Math.exp(-1 * this.bl * vs / this.al);
        var sp = 0.5 * (qp - 1 / qp);
        var tp = 0.5 * (qp + 1 / qp);
        var vp = Math.sin(this.bl * us / this.al);
        var up = (vp * Math.cos(this.gamma0) + sp * Math.sin(this.gamma0)) / tp;
        var ts = Math.pow(this.el / Math.sqrt((1 + up) / (1 - up)), 1 / this.bl);
        if (Math.abs(up - 1) < EPSLN) {
            p.x = this.long0;
            p.y = HALF_PI;
        } else if (Math.abs(up + 1) < EPSLN) {
            p.x = this.long0;
            p.y = -1 * HALF_PI;
        } else {
            p.y = phi2z(this.e, ts);
            p.x = adjust_lon(this.long0 - Math.atan2(sp * Math.cos(this.gamma0) - vp * Math.sin(this.gamma0), Math.cos(this.bl * us / this.al)) / this.bl);
        }
        return p;
    }
    var names$10 = [
        'Hotine_Oblique_Mercator',
        'Hotine Oblique Mercator',
        'Hotine_Oblique_Mercator_Azimuth_Natural_Origin',
        'Hotine_Oblique_Mercator_Azimuth_Center',
        'omerc'
    ];
    var omerc = {
        init: init$9,
        forward: forward$8,
        inverse: inverse$8,
        names: names$10
    };
    function init$10() {
        if (!this.lat2) {
            this.lat2 = this.lat1;
        }
        if (!this.k0) {
            this.k0 = 1;
        }
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
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
        } else {
            this.ns = sin1;
        }
        if (isNaN(this.ns)) {
            this.ns = sin1;
        }
        this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
        this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
        if (!this.title) {
            this.title = 'Lambert Conformal Conic';
        }
    }
    function forward$9(p) {
        var lon = p.x;
        var lat = p.y;
        if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
            lat = sign(lat) * (HALF_PI - 2 * EPSLN);
        }
        var con = Math.abs(Math.abs(lat) - HALF_PI);
        var ts, rh1;
        if (con > EPSLN) {
            ts = tsfnz(this.e, lat, Math.sin(lat));
            rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
        } else {
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
    function inverse$9(p) {
        var rh1, con, ts;
        var lat, lon;
        var x = (p.x - this.x0) / this.k0;
        var y = this.rh - (p.y - this.y0) / this.k0;
        if (this.ns > 0) {
            rh1 = Math.sqrt(x * x + y * y);
            con = 1;
        } else {
            rh1 = -Math.sqrt(x * x + y * y);
            con = -1;
        }
        var theta = 0;
        if (rh1 !== 0) {
            theta = Math.atan2(con * x, con * y);
        }
        if (rh1 !== 0 || this.ns > 0) {
            con = 1 / this.ns;
            ts = Math.pow(rh1 / (this.a * this.f0), con);
            lat = phi2z(this.e, ts);
            if (lat === -9999) {
                return null;
            }
        } else {
            lat = -HALF_PI;
        }
        lon = adjust_lon(theta / this.ns + this.long0);
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$11 = [
        'Lambert Tangential Conformal Conic Projection',
        'Lambert_Conformal_Conic',
        'Lambert_Conformal_Conic_2SP',
        'lcc'
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
        if (!this.k0) {
            this.k0 = 0.9999;
        }
        this.s45 = 0.785398163397448;
        this.s90 = 2 * this.s45;
        this.fi0 = this.lat0;
        this.e2 = this.es;
        this.e = Math.sqrt(this.e2);
        this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
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
    function forward$10(p) {
        var gfi, u, deltav, s, d, eps, ro;
        var lon = p.x;
        var lat = p.y;
        var delta_lon = adjust_lon(lon - this.long0);
        gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
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
        return p;
    }
    function inverse$10(p) {
        var u, deltav, s, d, eps, ro, fi1;
        var ok;
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
            p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
            if (Math.abs(fi1 - p.y) < 1e-10) {
                ok = 1;
            }
            fi1 = p.y;
            iter += 1;
        } while (ok === 0 && iter < 15);
        if (iter >= 15) {
            return null;
        }
        return p;
    }
    var names$12 = [
        'Krovak',
        'krovak'
    ];
    var krovak = {
        init: init$11,
        forward: forward$10,
        inverse: inverse$10,
        names: names$12
    };
    var mlfn = function (e0, e1, e2, e3, phi) {
        return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
    };
    var e0fn = function (x) {
        return 1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x));
    };
    var e1fn = function (x) {
        return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x));
    };
    var e2fn = function (x) {
        return 0.05859375 * x * x * (1 + 0.75 * x);
    };
    var e3fn = function (x) {
        return x * x * x * (35 / 3072);
    };
    var gN = function (a, e, sinphi) {
        var temp = e * sinphi;
        return a / Math.sqrt(1 - temp * temp);
    };
    var adjust_lat = function (x) {
        return Math.abs(x) < HALF_PI ? x : x - sign(x) * Math.PI;
    };
    var imlfn = function (ml, e0, e1, e2, e3) {
        var phi;
        var dphi;
        phi = ml / e0;
        for (var i = 0; i < 15; i++) {
            dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
            phi += dphi;
            if (Math.abs(dphi) <= 1e-10) {
                return phi;
            }
        }
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
    function forward$11(p) {
        var x, y;
        var lam = p.x;
        var phi = p.y;
        lam = adjust_lon(lam - this.long0);
        if (this.sphere) {
            x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
            y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
        } else {
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
        } else {
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
    var names$13 = [
        'Cassini',
        'Cassini_Soldner',
        'cass'
    ];
    var cass = {
        init: init$12,
        forward: forward$11,
        inverse: inverse$11,
        names: names$13
    };
    var qsfnz = function (eccent, sinphi) {
        var con;
        if (eccent > 1e-7) {
            con = eccent * sinphi;
            return (1 - eccent * eccent) * (sinphi / (1 - con * con) - 0.5 / eccent * Math.log((1 - con) / (1 + con)));
        } else {
            return 2 * sinphi;
        }
    };
    var S_POLE = 1;
    var N_POLE = 2;
    var EQUIT = 3;
    var OBLIQ = 4;
    function init$13() {
        var t = Math.abs(this.lat0);
        if (Math.abs(t - HALF_PI) < EPSLN) {
            this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
        } else if (Math.abs(t) < EPSLN) {
            this.mode = this.EQUIT;
        } else {
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
        } else {
            if (this.mode === this.OBLIQ) {
                this.sinph0 = Math.sin(this.lat0);
                this.cosph0 = Math.cos(this.lat0);
            }
        }
    }
    function forward$12(p) {
        var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
        var lam = p.x;
        var phi = p.y;
        lam = adjust_lon(lam - this.long0);
        if (this.sphere) {
            sinphi = Math.sin(phi);
            cosphi = Math.cos(phi);
            coslam = Math.cos(lam);
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
                if (y <= EPSLN) {
                    return null;
                }
                y = Math.sqrt(2 / y);
                x = y * cosphi * Math.sin(lam);
                y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                if (this.mode === this.N_POLE) {
                    coslam = -coslam;
                }
                if (Math.abs(phi + this.phi0) < EPSLN) {
                    return null;
                }
                y = FORTPI - phi * 0.5;
                y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
                x = y * Math.sin(lam);
                y *= coslam;
            }
        } else {
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
                } else {
                    y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
                }
                x = this.xmf * b * cosb * sinlam;
                break;
            case this.N_POLE:
            case this.S_POLE:
                if (q >= 0) {
                    x = (b = Math.sqrt(q)) * sinlam;
                    y = coslam * (this.mode === this.S_POLE ? b : -b);
                } else {
                    x = y = 0;
                }
                break;
            }
        }
        p.x = this.a * x + this.x0;
        p.y = this.a * y + this.y0;
        return p;
    }
    function inverse$12(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var x = p.x / this.a;
        var y = p.y / this.a;
        var lam, phi, cCe, sCe, q, rho, ab;
        if (this.sphere) {
            var cosz = 0, rh, sinz = 0;
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
                phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh);
                x *= sinz;
                y = cosz * rh;
                break;
            case this.OBLIQ:
                phi = Math.abs(rh) <= EPSLN ? this.phi0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
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
            lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
        } else {
            ab = 0;
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                x /= this.dd;
                y *= this.dd;
                rho = Math.sqrt(x * x + y * y);
                if (rho < EPSLN) {
                    p.x = 0;
                    p.y = this.phi0;
                    return p;
                }
                sCe = 2 * Math.asin(0.5 * rho / this.rq);
                cCe = Math.cos(sCe);
                x *= sCe = Math.sin(sCe);
                if (this.mode === this.OBLIQ) {
                    ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
                    q = this.qp * ab;
                    y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
                } else {
                    ab = y * sCe / rho;
                    q = this.qp * ab;
                    y = rho * cCe;
                }
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                if (this.mode === this.N_POLE) {
                    y = -y;
                }
                q = x * x + y * y;
                if (!q) {
                    p.x = 0;
                    p.y = this.phi0;
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
    var P00 = 0.3333333333333333;
    var P01 = 0.17222222222222222;
    var P02 = 0.10257936507936508;
    var P10 = 0.06388888888888888;
    var P11 = 0.0664021164021164;
    var P20 = 0.016415012942191543;
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
        return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
    }
    var names$14 = [
        'Lambert Azimuthal Equal Area',
        'Lambert_Azimuthal_Equal_Area',
        'laea'
    ];
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
    var asinz = function (x) {
        if (Math.abs(x) > 1) {
            x = x > 1 ? 1 : -1;
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
        } else {
            this.ns0 = this.con;
        }
        this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
        this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
    }
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
        } else {
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
        } else {
            qs = (this.c - con * con) / this.ns0;
            lat = this.phi1z(this.e3, qs);
        }
        lon = adjust_lon(theta / this.ns0 + this.long0);
        p.x = lon;
        p.y = lat;
        return p;
    }
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
    var names$15 = [
        'Albers_Conic_Equal_Area',
        'Albers',
        'aea'
    ];
    var aea = {
        init: init$14,
        forward: forward$13,
        inverse: inverse$13,
        names: names$15,
        phi1z: phi1z
    };
    function init$15() {
        this.sin_p14 = Math.sin(this.lat0);
        this.cos_p14 = Math.cos(this.lat0);
        this.infinity_dist = 1000 * this.a;
        this.rc = 1;
    }
    function forward$14(p) {
        var sinphi, cosphi;
        var dlon;
        var coslon;
        var ksp;
        var g;
        var x, y;
        var lon = p.x;
        var lat = p.y;
        dlon = adjust_lon(lon - this.long0);
        sinphi = Math.sin(lat);
        cosphi = Math.cos(lat);
        coslon = Math.cos(dlon);
        g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
        ksp = 1;
        if (g > 0 || Math.abs(g) <= EPSLN) {
            x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
            y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
        } else {
            x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
            y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
        }
        p.x = x;
        p.y = y;
        return p;
    }
    function inverse$14(p) {
        var rh;
        var sinc, cosc;
        var c;
        var lon, lat;
        p.x = (p.x - this.x0) / this.a;
        p.y = (p.y - this.y0) / this.a;
        p.x /= this.k0;
        p.y /= this.k0;
        if (rh = Math.sqrt(p.x * p.x + p.y * p.y)) {
            c = Math.atan2(rh, this.rc);
            sinc = Math.sin(c);
            cosc = Math.cos(c);
            lat = asinz(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh);
            lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
            lon = adjust_lon(this.long0 + lon);
        } else {
            lat = this.phic0;
            lon = 0;
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$16 = ['gnom'];
    var gnom = {
        init: init$15,
        forward: forward$14,
        inverse: inverse$14,
        names: names$16
    };
    var iqsfnz = function (eccent, q) {
        var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
        if (Math.abs(Math.abs(q) - temp) < 0.000001) {
            if (q < 0) {
                return -1 * HALF_PI;
            } else {
                return HALF_PI;
            }
        }
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
            if (Math.abs(dphi) <= 1e-10) {
                return phi;
            }
        }
        return NaN;
    };
    function init$16() {
        if (!this.sphere) {
            this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
        }
    }
    function forward$15(p) {
        var lon = p.x;
        var lat = p.y;
        var x, y;
        var dlon = adjust_lon(lon - this.long0);
        if (this.sphere) {
            x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
            y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
        } else {
            var qs = qsfnz(this.e, Math.sin(lat));
            x = this.x0 + this.a * this.k0 * dlon;
            y = this.y0 + this.a * qs * 0.5 / this.k0;
        }
        p.x = x;
        p.y = y;
        return p;
    }
    function inverse$15(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var lon, lat;
        if (this.sphere) {
            lon = adjust_lon(this.long0 + p.x / this.a / Math.cos(this.lat_ts));
            lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts));
        } else {
            lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
            lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$17 = ['cea'];
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
        this.title = this.title || 'Equidistant Cylindrical (Plate Carre)';
        this.rc = Math.cos(this.lat_ts);
    }
    function forward$16(p) {
        var lon = p.x;
        var lat = p.y;
        var dlon = adjust_lon(lon - this.long0);
        var dlat = adjust_lat(lat - this.lat0);
        p.x = this.x0 + this.a * dlon * this.rc;
        p.y = this.y0 + this.a * dlat;
        return p;
    }
    function inverse$16(p) {
        var x = p.x;
        var y = p.y;
        p.x = adjust_lon(this.long0 + (x - this.x0) / (this.a * this.rc));
        p.y = adjust_lat(this.lat0 + (y - this.y0) / this.a);
        return p;
    }
    var names$18 = [
        'Equirectangular',
        'Equidistant_Cylindrical',
        'eqc'
    ];
    var eqc = {
        init: init$17,
        forward: forward$16,
        inverse: inverse$16,
        names: names$18
    };
    var MAX_ITER$2 = 20;
    function init$18() {
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e = Math.sqrt(this.es);
        this.e0 = e0fn(this.es);
        this.e1 = e1fn(this.es);
        this.e2 = e2fn(this.es);
        this.e3 = e3fn(this.es);
        this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
    }
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
            } else {
                x = this.a * Math.sin(el) / Math.tan(lat);
                y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
            }
        } else {
            if (Math.abs(lat) <= EPSLN) {
                x = this.a * dlon;
                y = -1 * this.ml0;
            } else {
                var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
                x = nl * Math.sin(el);
                y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
            }
        }
        p.x = x + this.x0;
        p.y = y + this.y0;
        return p;
    }
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
            } else {
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
                lon = adjust_lon(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat));
            }
        } else {
            if (Math.abs(y + this.ml0) <= EPSLN) {
                lat = 0;
                lon = adjust_lon(this.long0 + x / this.a);
            } else {
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
                cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
                lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
            }
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$19 = [
        'Polyconic',
        'poly'
    ];
    var poly = {
        init: init$18,
        forward: forward$17,
        inverse: inverse$17,
        names: names$19
    };
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
        this.B_im[3] = 0.04105856;
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
        this.D[7] = 0.0122;
        this.D[8] = 0.00394;
        this.D[9] = -0.0013;
    }
    function forward$18(p) {
        var n;
        var lon = p.x;
        var lat = p.y;
        var delta_lat = lat - this.lat0;
        var delta_lon = lon - this.long0;
        var d_phi = delta_lat / SEC_TO_RAD * 0.00001;
        var d_lambda = delta_lon;
        var d_phi_n = 1;
        var d_psi = 0;
        for (n = 1; n <= 10; n++) {
            d_phi_n = d_phi_n * d_phi;
            d_psi = d_psi + this.A[n] * d_phi_n;
        }
        var th_re = d_psi;
        var th_im = d_lambda;
        var th_n_re = 1;
        var th_n_im = 0;
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
        p.x = z_im * this.a + this.x0;
        p.y = z_re * this.a + this.y0;
        return p;
    }
    function inverse$18(p) {
        var n;
        var x = p.x;
        var y = p.y;
        var delta_x = x - this.x0;
        var delta_y = y - this.y0;
        var z_re = delta_y / this.a;
        var z_im = delta_x / this.a;
        var z_n_re = 1;
        var z_n_im = 0;
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
            var den2 = den_re * den_re + den_im * den_im;
            th_re = (num_re * den_re + num_im * den_im) / den2;
            th_im = (num_im * den_re - num_re * den_im) / den2;
        }
        var d_psi = th_re;
        var d_lambda = th_im;
        var d_psi_n = 1;
        var d_phi = 0;
        for (n = 1; n <= 9; n++) {
            d_psi_n = d_psi_n * d_psi;
            d_phi = d_phi + this.D[n] * d_psi_n;
        }
        var lat = this.lat0 + d_phi * SEC_TO_RAD * 100000;
        var lon = this.long0 + d_lambda;
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$20 = [
        'New_Zealand_Map_Grid',
        'nzmg'
    ];
    var nzmg = {
        init: init$19,
        forward: forward$18,
        inverse: inverse$18,
        names: names$20
    };
    function init$20() {
    }
    function forward$19(p) {
        var lon = p.x;
        var lat = p.y;
        var dlon = adjust_lon(lon - this.long0);
        var x = this.x0 + this.a * dlon;
        var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
        p.x = x;
        p.y = y;
        return p;
    }
    function inverse$19(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var lon = adjust_lon(this.long0 + p.x / this.a);
        var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$21 = [
        'Miller_Cylindrical',
        'mill'
    ];
    var mill = {
        init: init$20,
        forward: forward$19,
        inverse: inverse$19,
        names: names$21
    };
    var MAX_ITER$3 = 20;
    function init$21() {
        if (!this.sphere) {
            this.en = pj_enfn(this.es);
        } else {
            this.n = 1;
            this.m = 0;
            this.es = 0;
            this.C_y = Math.sqrt((this.m + 1) / this.n);
            this.C_x = this.C_y / (this.m + 1);
        }
    }
    function forward$20(p) {
        var x, y;
        var lon = p.x;
        var lat = p.y;
        lon = adjust_lon(lon - this.long0);
        if (this.sphere) {
            if (!this.m) {
                lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
            } else {
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
        } else {
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
            } else if (this.n !== 1) {
                lat = asinz(Math.sin(lat) / this.n);
            }
            lon = adjust_lon(lon + this.long0);
            lat = adjust_lat(lat);
        } else {
            lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
            s = Math.abs(lat);
            if (s < HALF_PI) {
                s = Math.sin(lat);
                temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
                lon = adjust_lon(temp);
            } else if (s - EPSLN < HALF_PI) {
                lon = this.long0;
            }
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$22 = [
        'Sinusoidal',
        'sinu'
    ];
    var sinu = {
        init: init$21,
        forward: forward$20,
        inverse: inverse$20,
        names: names$22
    };
    function init$22() {
    }
    function forward$21(p) {
        var lon = p.x;
        var lat = p.y;
        var delta_lon = adjust_lon(lon - this.long0);
        var theta = lat;
        var con = Math.PI * Math.sin(lat);
        while (true) {
            var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
            theta += delta_theta;
            if (Math.abs(delta_theta) < EPSLN) {
                break;
            }
        }
        theta /= 2;
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
        p.x -= this.x0;
        p.y -= this.y0;
        arg = p.y / (1.4142135623731 * this.a);
        if (Math.abs(arg) > 0.999999999999) {
            arg = 0.999999999999;
        }
        theta = Math.asin(arg);
        var lon = adjust_lon(this.long0 + p.x / (0.900316316158 * this.a * Math.cos(theta)));
        if (lon < -Math.PI) {
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
    var names$23 = [
        'Mollweide',
        'moll'
    ];
    var moll = {
        init: init$22,
        forward: forward$21,
        inverse: inverse$21,
        names: names$23
    };
    function init$23() {
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
        } else {
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
    function forward$22(p) {
        var lon = p.x;
        var lat = p.y;
        var rh1;
        if (this.sphere) {
            rh1 = this.a * (this.g - lat);
        } else {
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
    function inverse$22(p) {
        p.x -= this.x0;
        p.y = this.rh - p.y + this.y0;
        var con, rh1, lat, lon;
        if (this.ns >= 0) {
            rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
            con = 1;
        } else {
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
        } else {
            var ml = this.g - rh1 / this.a;
            lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
            lon = adjust_lon(this.long0 + theta / this.ns);
            p.x = lon;
            p.y = lat;
            return p;
        }
    }
    var names$24 = [
        'Equidistant_Conic',
        'eqdc'
    ];
    var eqdc = {
        init: init$23,
        forward: forward$22,
        inverse: inverse$22,
        names: names$24
    };
    function init$24() {
        this.R = this.a;
    }
    function forward$23(p) {
        var lon = p.x;
        var lat = p.y;
        var dlon = adjust_lon(lon - this.long0);
        var x, y;
        if (Math.abs(lat) <= EPSLN) {
            x = this.x0 + this.R * dlon;
            y = this.y0;
        }
        var theta = asinz(2 * Math.abs(lat / Math.PI));
        if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
            x = this.x0;
            if (lat >= 0) {
                y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
            } else {
                y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
            }
        }
        var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
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
        var q = asq + g;
        con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
        if (lat >= 0) {
            y = this.y0 + con;
        } else {
            y = this.y0 - con;
        }
        p.x = x;
        p.y = y;
        return p;
    }
    function inverse$23(p) {
        var lon, lat;
        var xx, yy, xys, c1, c2, c3;
        var a1;
        var m1;
        var con;
        var th1;
        var d;
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
        con = 3 * d / a1 / m1;
        if (Math.abs(con) > 1) {
            if (con >= 0) {
                con = 1;
            } else {
                con = -1;
            }
        }
        th1 = Math.acos(con) / 3;
        if (p.y >= 0) {
            lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
        } else {
            lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
        }
        if (Math.abs(xx) < EPSLN) {
            lon = this.long0;
        } else {
            lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
        }
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$25 = [
        'Van_der_Grinten_I',
        'VanDerGrinten',
        'vandg'
    ];
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
                p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
                p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
                return p;
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
                p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
                p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
                return p;
            } else {
                cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
                c = Math.acos(cos_c);
                kp = c / Math.sin(c);
                p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
                p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
                return p;
            }
        } else {
            e0 = e0fn(this.es);
            e1 = e1fn(this.es);
            e2 = e2fn(this.es);
            e3 = e3fn(this.es);
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
                Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
                Ml = this.a * mlfn(e0, e1, e2, e3, lat);
                p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
                p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
                return p;
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
                Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
                Ml = this.a * mlfn(e0, e1, e2, e3, lat);
                p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
                p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
                return p;
            } else {
                tanphi = sinphi / cosphi;
                Nl1 = gN(this.a, this.e, this.sin_p12);
                Nl = gN(this.a, this.e, sinphi);
                psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
                Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
                if (Az === 0) {
                    s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
                } else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
                    s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
                } else {
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
        var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F;
        if (this.sphere) {
            rh = Math.sqrt(p.x * p.x + p.y * p.y);
            if (rh > 2 * HALF_PI * this.a) {
                return;
            }
            z = rh / this.a;
            sinz = Math.sin(z);
            cosz = Math.cos(z);
            lon = this.long0;
            if (Math.abs(rh) <= EPSLN) {
                lat = this.lat0;
            } else {
                lat = asinz(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh);
                con = Math.abs(this.lat0) - HALF_PI;
                if (Math.abs(con) <= EPSLN) {
                    if (this.lat0 >= 0) {
                        lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
                    } else {
                        lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
                    }
                } else {
                    lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
                }
            }
            p.x = lon;
            p.y = lat;
            return p;
        } else {
            e0 = e0fn(this.es);
            e1 = e1fn(this.es);
            e2 = e2fn(this.es);
            e3 = e3fn(this.es);
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
                Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
                rh = Math.sqrt(p.x * p.x + p.y * p.y);
                M = Mlp - rh;
                lat = imlfn(M / this.a, e0, e1, e2, e3);
                lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y));
                p.x = lon;
                p.y = lat;
                return p;
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
                Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
                rh = Math.sqrt(p.x * p.x + p.y * p.y);
                M = rh - Mlp;
                lat = imlfn(M / this.a, e0, e1, e2, e3);
                lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
                p.x = lon;
                p.y = lat;
                return p;
            } else {
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
                lat = Math.atan((1 - this.es * F * this.sin_p12 / Math.sin(psi)) * Math.tan(psi) / (1 - this.es));
                p.x = lon;
                p.y = lat;
                return p;
            }
        }
    }
    var names$26 = [
        'Azimuthal_Equidistant',
        'aeqd'
    ];
    var aeqd = {
        init: init$25,
        forward: forward$24,
        inverse: inverse$24,
        names: names$26
    };
    function init$26() {
        this.sin_p14 = Math.sin(this.lat0);
        this.cos_p14 = Math.cos(this.lat0);
    }
    function forward$25(p) {
        var sinphi, cosphi;
        var dlon;
        var coslon;
        var ksp;
        var g, x, y;
        var lon = p.x;
        var lat = p.y;
        dlon = adjust_lon(lon - this.long0);
        sinphi = Math.sin(lat);
        cosphi = Math.cos(lat);
        coslon = Math.cos(dlon);
        g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
        ksp = 1;
        if (g > 0 || Math.abs(g) <= EPSLN) {
            x = this.a * ksp * cosphi * Math.sin(dlon);
            y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
        }
        p.x = x;
        p.y = y;
        return p;
    }
    function inverse$25(p) {
        var rh;
        var z;
        var sinz, cosz;
        var con;
        var lon, lat;
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
        lat = asinz(cosz * this.sin_p14 + p.y * sinz * this.cos_p14 / rh);
        con = Math.abs(this.lat0) - HALF_PI;
        if (Math.abs(con) <= EPSLN) {
            if (this.lat0 >= 0) {
                lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
            } else {
                lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
            }
            p.x = lon;
            p.y = lat;
            return p;
        }
        lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
        p.x = lon;
        p.y = lat;
        return p;
    }
    var names$27 = ['ortho'];
    var ortho = {
        init: init$26,
        forward: forward$25,
        inverse: inverse$25,
        names: names$27
    };
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
        this.title = this.title || 'Quadrilateralized Spherical Cube';
        if (this.lat0 >= HALF_PI - FORTPI / 2) {
            this.face = FACE_ENUM.TOP;
        } else if (this.lat0 <= -(HALF_PI - FORTPI / 2)) {
            this.face = FACE_ENUM.BOTTOM;
        } else if (Math.abs(this.long0) <= FORTPI) {
            this.face = FACE_ENUM.FRONT;
        } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
            this.face = this.long0 > 0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
        } else {
            this.face = FACE_ENUM.BACK;
        }
        if (this.es !== 0) {
            this.one_minus_f = 1 - (this.a - this.b) / this.a;
            this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
        }
    }
    function forward$26(p) {
        var xy = {
            x: 0,
            y: 0
        };
        var lat, lon;
        var theta, phi;
        var t, mu;
        var area = { value: 0 };
        p.x -= this.long0;
        if (this.es !== 0) {
            lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
        } else {
            lat = p.y;
        }
        lon = p.x;
        if (this.face === FACE_ENUM.TOP) {
            phi = HALF_PI - lat;
            if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
                area.value = AREA_ENUM.AREA_0;
                theta = lon - HALF_PI;
            } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
                area.value = AREA_ENUM.AREA_1;
                theta = lon > 0 ? lon - SPI : lon + SPI;
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
                theta = lon > 0 ? -lon + SPI : -lon - SPI;
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
                phi = theta = 0;
                area.value = AREA_ENUM.AREA_0;
            }
        }
        mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
        t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));
        if (area.value === AREA_ENUM.AREA_1) {
            mu += HALF_PI;
        } else if (area.value === AREA_ENUM.AREA_2) {
            mu += SPI;
        } else if (area.value === AREA_ENUM.AREA_3) {
            mu += 1.5 * SPI;
        }
        xy.x = t * Math.cos(mu);
        xy.y = t * Math.sin(mu);
        xy.x = xy.x * this.a + this.x0;
        xy.y = xy.y * this.a + this.y0;
        p.x = xy.x;
        p.y = xy.y;
        return p;
    }
    function inverse$26(p) {
        var lp = {
            lam: 0,
            phi: 0
        };
        var mu, nu, cosmu, tannu;
        var tantheta, theta, cosphi, phi;
        var t;
        var area = { value: 0 };
        p.x = (p.x - this.x0) / this.a;
        p.y = (p.y - this.y0) / this.a;
        nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
        mu = Math.atan2(p.y, p.x);
        if (p.x >= 0 && p.x >= Math.abs(p.y)) {
            area.value = AREA_ENUM.AREA_0;
        } else if (p.y >= 0 && p.y >= Math.abs(p.x)) {
            area.value = AREA_ENUM.AREA_1;
            mu -= HALF_PI;
        } else if (p.x < 0 && -p.x >= Math.abs(p.y)) {
            area.value = AREA_ENUM.AREA_2;
            mu = mu < 0 ? mu + SPI : mu - SPI;
        } else {
            area.value = AREA_ENUM.AREA_3;
            mu += HALF_PI;
        }
        t = SPI / 12 * Math.tan(mu);
        tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
        theta = Math.atan(tantheta);
        cosmu = Math.cos(mu);
        tannu = Math.tan(nu);
        cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
        if (cosphi < -1) {
            cosphi = -1;
        } else if (cosphi > +1) {
            cosphi = +1;
        }
        if (this.face === FACE_ENUM.TOP) {
            phi = Math.acos(cosphi);
            lp.phi = HALF_PI - phi;
            if (area.value === AREA_ENUM.AREA_0) {
                lp.lam = theta + HALF_PI;
            } else if (area.value === AREA_ENUM.AREA_1) {
                lp.lam = theta < 0 ? theta + SPI : theta - SPI;
            } else if (area.value === AREA_ENUM.AREA_2) {
                lp.lam = theta - HALF_PI;
            } else {
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
            } else {
                lp.lam = theta < 0 ? -theta - SPI : -theta + SPI;
            }
        } else {
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
        if (this.es !== 0) {
            var invert_sign;
            var tanphi, xa;
            invert_sign = lp.phi < 0 ? 1 : 0;
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
    function qsc_fwd_equat_face_theta(phi, y, x, area) {
        var theta;
        if (phi < EPSLN) {
            area.value = AREA_ENUM.AREA_0;
            theta = 0;
        } else {
            theta = Math.atan2(y, x);
            if (Math.abs(theta) <= FORTPI) {
                area.value = AREA_ENUM.AREA_0;
            } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
                area.value = AREA_ENUM.AREA_1;
                theta -= HALF_PI;
            } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
                area.value = AREA_ENUM.AREA_2;
                theta = theta >= 0 ? theta - SPI : theta + SPI;
            } else {
                area.value = AREA_ENUM.AREA_3;
                theta += HALF_PI;
            }
        }
        return theta;
    }
    function qsc_shift_lon_origin(lon, offset) {
        var slon = lon + offset;
        if (slon < -SPI) {
            slon += TWO_PI;
        } else if (slon > +SPI) {
            slon -= TWO_PI;
        }
        return slon;
    }
    var names$28 = [
        'Quadrilateralized Spherical Cube',
        'Quadrilateralized_Spherical_Cube',
        'qsc'
    ];
    var qsc = {
        init: init$27,
        forward: forward$26,
        inverse: inverse$26,
        names: names$28
    };
    var includedProjections = function (proj4) {
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
    };
    proj4$1.defaultDatum = 'WGS84';
    proj4$1.Proj = Projection$1;
    proj4$1.WGS84 = new proj4$1.Proj('WGS84');
    proj4$1.Point = Point;
    proj4$1.toPoint = toPoint;
    proj4$1.defs = defs;
    proj4$1.transform = transform;
    proj4$1.mgrs = mgrs;
    proj4$1.version = version;
    includedProjections(proj4$1);
    return proj4$1;
}));
ItownsGlobeViewExtended = function (Itowns, woodman) {
    function GlobeViewExtended(viewerDiv, coordCarto, options) {
        viewerDiv.style.position = 'relative';
        this._viewerDiv = viewerDiv;
        this._widgets = [];
        this._initEventMap();
        this._isInitialized = false;
        this._globeView = new Itowns.GlobeView(viewerDiv, coordCarto, options);
        var self = this;
        this.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, function () {
            self._isInitialized = true;
        });
        this._globeView.addFrameRequester(Itowns.MAIN_LOOP_EVENTS.BEFORE_RENDER, function () {
            clearTimeout(this._preRenderTimer);
            self._preRenderTimer = setTimeout(function () {
                if (self._fetchVisibleColorLayers || self._fetchVisibleElevationLayers || self._fetchExtent) {
                    var event = { type: GlobeViewExtended.EVENTS.PRE_RENDER };
                    if (self._fetchExtent) {
                        event.extent = new Itowns.Extent('EPSG:4326', 180, -180, 90, -90);
                    }
                    if (self._fetchVisibleColorLayers) {
                        event.colorLayersId = [];
                    }
                    if (self._fetchVisibleElevationLayers) {
                        event.elevationLayersId = [];
                    }
                    self._getCurrentSceneInfos(self._globeView.scene, event);
                    self._globeView.dispatchEvent(event);
                }
            }, 100);
        }.bind(this));
        this.freezeControl();
    }
    GlobeViewExtended.prototype._initEventMap = function () {
        if (!GlobeViewExtended.EVENTS) {
            GlobeViewExtended.EVENTS = {
                RANGE_CHANGED: Itowns.CONTROL_EVENTS.RANGE_CHANGED,
                CENTER_CHANGED: Itowns.CONTROL_EVENTS.CAMERA_TARGET_CHANGED,
                ORIENTATION_CHANGED: Itowns.CONTROL_EVENTS.ORIENTATION_CHANGED,
                LAYER_ADDED: Itowns.GLOBE_VIEW_EVENTS.LAYER_ADDED,
                LAYER_REMOVED: Itowns.GLOBE_VIEW_EVENTS.LAYER_REMOVED,
                LAYERS_ORDER_CHANGED: Itowns.GLOBE_VIEW_EVENTS.COLOR_LAYERS_ORDER_CHANGED,
                GLOBE_INITIALIZED: Itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED,
                VIEW_INITIALIZED: 'viewinitialized',
                PRE_RENDER: 'prerender',
                MOUSE_MOVE: 'mousemove',
                AFTER_RENDER: Itowns.MAIN_LOOP_EVENTS.AFTER_RENDER,
                OPACITY_PROPERTY_CHANGED: 'opacity-property-changed',
                VISIBLE_PROPERTY_CHANGED: 'visible-property-changed',
                SEQUENCE_PROPERTY_CHANGED: 'sequence-property-changed'
            };
        }
    };
    GlobeViewExtended.prototype.constructor = GlobeViewExtended;
    GlobeViewExtended.prototype.getGlobeView = function () {
        return this._globeView;
    };
    GlobeViewExtended.prototype.isInitialized = function () {
        return this._isInitialized;
    };
    GlobeViewExtended.prototype.onCameraMoveStop = function (cb) {
        var self = this;
        function afterRenderHandler() {
            self._globeView.removeFrameRequester(Itowns.MAIN_LOOP_EVENTS.AFTER_CAMERA_UPDATE, afterRenderHandler);
            cb();
        }
        this._globeView.addFrameRequester(Itowns.MAIN_LOOP_EVENTS.AFTER_CAMERA_UPDATE, afterRenderHandler);
    };
    GlobeViewExtended.prototype.freezeControl = function () {
        this._globeView.controls.enabled = false;
        this.onCameraMoveStop(function () {
            this._globeView.controls.enabled = true;
        }.bind(this));
    };
    GlobeViewExtended.prototype.listen = function (type, callback) {
        if (typeof callback != 'function') {
            console.log('no callback provided for event : ' + type);
            return null;
        }
        var target = this._getEventTarget(type);
        if (!target) {
            return null;
        }
        if (type === GlobeViewExtended.EVENTS.AFTER_RENDER) {
            target.addFrameRequester(type, callback);
        } else {
            target.addEventListener(type, callback);
        }
        return {
            target: target,
            callback: callback,
            type: type
        };
    };
    GlobeViewExtended.prototype.addLayerListener = function (layer, type, callback) {
        if (typeof callback != 'function') {
            console.log('no callback provided for event : ' + type);
            return null;
        }
        layer.addEventListener(type, callback);
        return {
            target: layer,
            callback: callback,
            type: type
        };
    };
    GlobeViewExtended.prototype._getEventTarget = function (type) {
        switch (type) {
        case GlobeViewExtended.EVENTS.RANGE_CHANGED:
        case GlobeViewExtended.EVENTS.CENTER_CHANGED:
        case GlobeViewExtended.EVENTS.ORIENTATION_CHANGED:
            return this.getGlobeView().controls;
        case GlobeViewExtended.EVENTS.LAYER_ADDED:
        case GlobeViewExtended.EVENTS.LAYER_REMOVED:
        case GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED:
        case GlobeViewExtended.EVENTS.GLOBE_INITIALIZED:
        case GlobeViewExtended.EVENTS.PRE_RENDER:
        case GlobeViewExtended.EVENTS.AFTER_RENDER:
        case GlobeViewExtended.EVENTS.VIEW_INITIALIZED:
            return this.getGlobeView();
        case GlobeViewExtended.EVENTS.MOUSE_MOVE:
            return this._viewerDiv;
        default:
            console.log('unhandled event : ' + type);
            return null;
        }
    };
    GlobeViewExtended.prototype.forgetByKey = function (key) {
        if (key.type === GlobeViewExtended.EVENTS.AFTER_RENDER) {
            key.target.removeFrameRequester(key.type, key.callback);
        } else {
            key.target.removeEventListener(key.type, key.callback);
        }
    };
    GlobeViewExtended.prototype.removeLayerListener = function (layer, type, callback) {
        this.forgetByKey({
            target: layer,
            callback: callback,
            type: type
        });
    };
    GlobeViewExtended.prototype.forget = function (type, callback) {
        var target = this._getEventTarget(type);
        if (!target) {
            return null;
        }
        this.forgetByKey({
            target: target,
            callback: callback,
            type: type
        });
    };
    GlobeViewExtended.prototype.addLayer = function (layer) {
        this.getGlobeView().addLayer(layer);
        this.getGlobeView().notifyChange(true);
    };
    GlobeViewExtended.prototype.removeLayer = function (layerId) {
        this.getGlobeView().removeLayer(layerId);
        this.getGlobeView().notifyChange(true);
    };
    GlobeViewExtended.prototype.setLayerOpacity = function (layerId, opacityValue) {
        this.getColorLayerById(layerId).opacity = opacityValue;
        this.getGlobeView().notifyChange(true);
    };
    GlobeViewExtended.prototype.setLayerVisibility = function (layerId, visible) {
        this.getColorLayerById(layerId).visible = visible;
        this.getGlobeView().notifyChange(true);
    };
    GlobeViewExtended.prototype.moveLayerToIndex = function (layerId, index) {
        Itowns.ColorLayersOrdering.moveLayerToIndex(this.getGlobeView(), layerId, index);
        this.getGlobeView().notifyChange(true);
    };
    GlobeViewExtended.prototype.removeEventListener = function (type, callback) {
        switch (type) {
        case 'mousemove':
            this._viewerDiv.removeEventListener(type, callback);
            break;
        case 'centerchanged':
            this.getGlobeView().controls.removeEventListener(type, callback);
            break;
        default:
            this.getGlobeView().removeEventListener(type, callback);
            break;
        }
    };
    GlobeViewExtended.prototype.preRenderEventFetchViewExtent = function (b) {
        if (typeof b === 'undefined') {
            b = true;
        }
        this._fetchExtent = b;
    };
    GlobeViewExtended.prototype.preRenderEventFetchColorLayersDisplayed = function (b) {
        if (typeof b === 'undefined') {
            b = true;
        }
        this._fetchVisibleColorLayers = b;
    };
    GlobeViewExtended.prototype.preRenderEventFetchElevationLayersDisplayed = function (b) {
        if (typeof b === 'undefined') {
            b = true;
        }
        this._fetchVisibleElevationLayers = b;
    };
    GlobeViewExtended.prototype.preRenderEventFetchLayersDisplayed = function (b) {
        if (typeof b === 'undefined') {
            b = true;
        }
        this._fetchVisibleColorLayers = b;
        this._fetchVisibleElevationLayers = b;
    };
    GlobeViewExtended.prototype.getLayerById = function (layerId) {
        var layer = this.getGlobeView().getLayers(function (l) {
            if (l.id === layerId) {
                return l;
            }
        })[0];
        if (!layer) {
            return;
        }
        return layer;
    };
    GlobeViewExtended.prototype.getColorLayerById = function (layerId) {
        var layer = this.getGlobeView().getLayers(function (l) {
            if (l.id === layerId && l.type === 'color') {
                return l;
            }
        })[0];
        if (!layer) {
            return;
        }
        return layer;
    };
    GlobeViewExtended.prototype.getColorLayers = function () {
        return this.getGlobeView().getLayers(function (layer) {
            if (layer.type === 'color') {
                return layer;
            }
        });
    };
    GlobeViewExtended.prototype.getVectorLayers = function () {
        return this.getGlobeView().getLayers(function (layer) {
            if (layer.protocol === 'rasterizer') {
                return layer;
            }
        });
    };
    GlobeViewExtended.prototype.getElevationLayers = function () {
        return this.getGlobeView().getLayers(function (layer) {
            if (layer.type === 'elevation') {
                return layer;
            }
        });
    };
    GlobeViewExtended.prototype.getExtent = function () {
        var options = { extent: new Itowns.Extent('EPSG:4326', 180, -180, 90, -90) };
        this._getCurrentSceneInfos(this.scene, options);
        return options.extent;
    };
    GlobeViewExtended.prototype._getCurrentSceneInfos = function (node, options) {
        if (!node || !node.visible) {
            return;
        }
        if (node.level) {
            if (node.material.visible) {
                if (options.colorLayersId) {
                    for (var i = 0; i < node.material.colorLayersId.length; ++i) {
                        if (options.colorLayersId.indexOf(node.material.colorLayersId[i]) < 0) {
                            options.colorLayersId.push(node.material.colorLayersId[i]);
                        }
                    }
                }
                if (options.elevationLayersId) {
                    for (var j = 0; j < node.material.elevationLayersId.length; ++j) {
                        if (options.elevationLayersId.indexOf(node.material.elevationLayersId[j]) < 0) {
                            options.elevationLayersId.push(node.material.elevationLayersId[j]);
                        }
                    }
                }
                if (options.extent) {
                    options.extent.union(node.extent);
                }
            }
        }
        if (node.children) {
            for (var child in node.children) {
                this._getCurrentSceneInfos(node.children[child], options);
            }
        }
    };
    GlobeViewExtended.prototype.addWidget = function (widget) {
        if (!widget.getTarget()) {
            widget.setTarget(this._viewerDiv, 'absolute');
        }
        widget.setGlobe(this);
        this._widgets.push(widget);
    };
    GlobeViewExtended.prototype.getWidgets = function () {
        return this._widgets;
    };
    GlobeViewExtended.prototype.removeWidget = function (widget) {
        widget.setGlobe();
        for (var idx = 0; idx < this._widgets.length; idx++) {
            if (this._widgets[idx] === widget) {
                this._widgets.splice(idx, 1);
            }
        }
    };
    GlobeViewExtended.prototype.getTargetElement = function () {
        return this._viewerDiv;
    };
    GlobeViewExtended.prototype.getScale = function () {
        return this.getGlobeView().controls.getScale();
    };
    GlobeViewExtended.prototype.setTilt = function (tilt) {
        this.getGlobeView().controls.setTilt(tilt, false);
    };
    GlobeViewExtended.prototype.getTilt = function () {
        return this.getGlobeView().controls.getCameraOrientation()[0];
    };
    GlobeViewExtended.prototype.setAzimuth = function (azimuth) {
        this.getGlobeView().controls.setHeading(azimuth, false);
    };
    GlobeViewExtended.prototype.getAzimuth = function () {
        return this.getGlobeView().controls.getCameraOrientation()[1];
    };
    GlobeViewExtended.prototype.getCoordinateFromPixel = function (x, y) {
        return this.getGlobeView().controls.pickGeoPosition({
            x: x,
            y: y
        });
    };
    GlobeViewExtended.prototype.getCoordinateFromMouseEvent = function (mouseEvent) {
        var coords = this.getGlobeView().eventToViewCoords(mouseEvent);
        return this.getGlobeView().controls.pickGeoPosition(coords);
    };
    GlobeViewExtended.prototype.getFeaturesAtMousePosition = function (mouseEvent) {
        var vectorLayers = this.getVectorLayers();
        if (!vectorLayers) {
            return;
        }
        var visibleFeatures = [];
        var geoCoord = this.getCoordinateFromMouseEvent(mouseEvent);
        if (geoCoord) {
            var precision = this.getGlobeView().controls.pixelsToDegrees(5);
            for (var i = 0; i < vectorLayers.length; i++) {
                var idx;
                var layer = vectorLayers[i];
                if (!layer.visible) {
                    continue;
                }
                var result = Itowns.FeaturesUtils.filterFeaturesUnderCoordinate(geoCoord, layer.feature, precision);
                for (idx = 0; idx < result.length; idx++) {
                    visibleFeatures.push(result[idx]);
                }
            }
        }
        return visibleFeatures;
    };
    GlobeViewExtended.prototype.setCameraTargetGeoPosition = function (center) {
        this.getGlobeView().controls.setCameraTargetGeoPositionAdvanced(center, false);
    };
    GlobeViewExtended.prototype.getCenter = function () {
        var cameraCenter = this.getGlobeView().controls.getCameraTargetGeoPosition();
        var center = {
            lon: cameraCenter.longitude(),
            lat: cameraCenter.latitude(),
            alt: cameraCenter.altitude()
        };
        return center;
    };
    GlobeViewExtended.prototype.getZoom = function () {
        return this.getGlobeView().controls.getZoom();
    };
    GlobeViewExtended.prototype.setZoom = function (zoom) {
        this.getGlobeView().controls.setZoom(zoom, false);
    };
    GlobeViewExtended.prototype.pixelsToMeters = function (pixels) {
        return this.getGlobeView().controls.pixelsToMeters(pixels);
    };
    GlobeViewExtended.prototype.metersToPixels = function (value) {
        return this.getGlobeView().controls.metersToPixels(value);
    };
    GlobeViewExtended.prototype.getRange = function () {
        return this.getGlobeView().controls.getRange();
    };
    GlobeViewExtended.prototype.moveTarget = function () {
        return this.getGlobeView().controls.moveTarget();
    };
    GlobeViewExtended.prototype.getLayerEventInfos = function (evt) {
        var propertyName = evt.type.replace('-property-changed', '');
        return {
            propertyName: propertyName,
            previousValue: evt.previous[propertyName],
            newValue: evt.new[propertyName]
        };
    };
    return GlobeViewExtended;
}(itowns, {});
CommonUtilsConfig = function () {
    var Config = {
        configuration: null,
        isConfigLoaded: function () {
            var scope = typeof window !== 'undefined' ? window : {};
            if (scope.Gp && scope.Gp.Config && Object.keys(scope.Gp.Config).length !== 0) {
                this.configuration = scope.Gp.Config;
                return true;
            }
            return false;
        },
        getLayerId: function (layerName, service) {
            var layerId = null;
            if (this.configuration) {
                var layers = this.configuration['layers'];
                for (var key in layers) {
                    if (layers.hasOwnProperty(key)) {
                        var parts = key.split('$');
                        if (layerName === parts[0]) {
                            if (parts[1]) {
                                var servicePartsLayer = parts[1].split(':');
                                var servicePartsService = parts[1].split(';');
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
                console.log('ERROR layer id (' + layerName + ' / ' + service + ') was not found !?');
            }
            return layerId;
        },
        getLayerParams: function (layerName, service, apiKey) {
            var params = {};
            if (this.configuration) {
                var layerId = this.getLayerId(layerName, service);
                if (layerId) {
                    var layerConf = this.configuration.layers[layerId];
                    var key = layerConf.apiKeys[0];
                    if (apiKey) {
                        if (apiKey !== key) {
                            console.log('ERROR different keys (' + apiKey + ' !== ' + key + ') !?');
                            return;
                        }
                    }
                    apiKey = apiKey || key;
                    params.key = apiKey;
                    params.url = layerConf.getServerUrl(apiKey);
                    params.version = layerConf.getServiceParams().version;
                    params.styles = layerConf.getDefaultStyle();
                    params.format = layerConf.getDefaultFormat();
                    params.projection = layerConf.getDefaultProjection();
                    params.minScale = layerConf.getMinScaleDenominator();
                    params.maxScale = layerConf.getMaxScaleDenominator();
                    params.extent = layerConf.getBBOX();
                    params.legends = layerConf.getLegends();
                    params.metadata = layerConf.getMetadata();
                    params.originators = layerConf.getOriginators();
                    params.title = layerConf.getTitle();
                    params.description = layerConf.getDescription();
                    params.quicklookUrl = layerConf.getQuicklookUrl();
                    if (layerConf.wmtsOptions) {
                        params.tileMatrixSetLimits = layerConf.wmtsOptions.tileMatrixSetLimits;
                    }
                    var TMSLink = layerConf.getTMSID();
                    if (TMSLink) {
                        params.TMSLink = TMSLink;
                        var tmsConf = this.configuration.getTMSConf(TMSLink);
                        params.matrixOrigin = tmsConf.getTopLeftCorner();
                        params.nativeResolutions = tmsConf.nativeResolutions;
                        params.matrixIds = tmsConf.matrixIds;
                        params.tileMatrices = tmsConf.tileMatrices;
                    }
                }
            }
            return params;
        },
        getServiceParams: function (resource, service, apiKey) {
            var params = {};
            if (this.configuration) {
                var layerId = this.getLayerId(resource, service);
                if (layerId) {
                    var layerConf = this.configuration.layers[layerId];
                    var key = layerConf.apiKeys[0];
                    if (apiKey) {
                        if (apiKey !== key) {
                            return;
                        }
                    }
                    apiKey = apiKey || key;
                    params.key = apiKey;
                    params.url = layerConf.getServerUrl(apiKey);
                    params.version = layerConf.getServiceParams().version;
                    params.extent = layerConf.getBBOX();
                    params.title = layerConf.getTitle();
                    params.description = layerConf.getDescription();
                }
            }
            return params;
        },
        getResolutions: function () {
            var resolutions = [];
            if (this.configuration) {
                resolutions = this.configuration['generalOptions']['wgs84Resolutions'];
            }
            return resolutions;
        },
        getTileMatrix: function (tmsName) {
            var tms = {};
            if (this.configuration) {
                if (tmsName) {
                    tms = this.configuration['tileMatrixSets'][tmsName.toUpperCase()];
                }
            }
            return tms;
        },
        getGlobalConstraints: function (layerId) {
            var params = {};
            if (layerId) {
                var layerConf = this.configuration.layers[layerId];
                params.projection = layerConf.getDefaultProjection();
                params.minScale = layerConf.getMinScaleDenominator();
                params.maxScale = layerConf.getMaxScaleDenominator();
                params.extent = layerConf.getBBOX();
            }
            return params;
        }
    };
    return Config;
}();
CommonUtilsCheckRightManagement = function (woodman, Config) {
    return {
        check: function (options) {
            if (!options) {
                return;
            }
            var _key = options.key;
            var _resources = options.resources || [];
            var _services = options.services || [];
            if (!_resources || _resources.length === 0) {
                return;
            }
            if (!_services || _services.length === 0) {
                return;
            }
            var _rightManagement = {};
            if (!_key) {
                if (!Config.isConfigLoaded()) {
                    console.log('WARNING : ' + 'The \'apiKey\' parameter is missing, ' + 'and the contract key configuration has not been loaded, ' + 'so impossible to check yours rights !');
                    return;
                } else {
                    _key = Object.keys(Config.configuration.generalOptions.apiKeys)[0];
                }
            }
            if (_key) {
                if (!Config.isConfigLoaded()) {
                    console.log('WARNING : ' + 'the contract key configuration has not been loaded, ' + 'so be carefull !');
                    var _noRightManagement = {};
                    for (var i = 0; i < _services.length; i++) {
                        var service = _services[i];
                        _noRightManagement[service] = [];
                        for (var j = 0; j < _resources.length; j++) {
                            var resource = _resources[j];
                            _noRightManagement[service].push(resource);
                        }
                    }
                    _noRightManagement.key = _key;
                    return _noRightManagement;
                } else {
                    for (var k = 0; k < _resources.length; k++) {
                        var _resource = _resources[k];
                        for (var l = 0; l < _services.length; l++) {
                            var _service = _services[l];
                            var params = Config.getServiceParams(_resource, _service, _key);
                            if (!params || Object.keys(params).length === 0) {
                                console.log('WARNING : ' + 'The contract key configuration has no rights to load this geoportal ' + 'resource (' + _resource + ') ' + 'for this service (' + _service + ') ');
                                continue;
                            }
                            if (!_rightManagement[_service]) {
                                _rightManagement[_service] = [];
                            }
                            _rightManagement[_service].push(_resource);
                        }
                    }
                    if (!_rightManagement || Object.keys(_rightManagement).length === 0) {
                        console.log('WARNING : ' + 'The contract key configuration has been loaded, ' + 'and the \'apiKey\' parameter has been set, ' + 'but, there is a problem on the mapping between the contract and the key !');
                        return;
                    }
                    _rightManagement.key = _key;
                    return _rightManagement;
                }
            }
        }
    };
}({}, CommonUtilsConfig);
CommonUtilsSelectorID = function () {
    var SelectorID = {
        generate: function () {
            var timestamp = Math.floor(Date.now());
            return function () {
                return timestamp++;
            };
        }(),
        name: function (id) {
            var name = null;
            var i = id.lastIndexOf('-');
            if (i === -1) {
                name = id;
            } else {
                name = id.substring(0, i);
            }
            return name;
        },
        index: function (id) {
            var index = null;
            var name = this.name(id);
            var i = name.lastIndexOf('_');
            if (i !== -1) {
                index = name.substring(i + 1);
            }
            return index;
        },
        uuid: function (id) {
            var uuid = null;
            var i = id.lastIndexOf('-');
            if (i !== -1) {
                uuid = parseInt(id.substring(i + 1), 10);
            }
            return uuid;
        }
    };
    return SelectorID;
}();
CommonControlsMousePositionDOM = function () {
    var MousePositionDOM = {
        _addUID: function (id) {
            var uid = this._uid ? id + '-' + this._uid : id;
            return uid;
        },
        _createMainContainerElement: function () {
            var container = document.createElement('div');
            container.id = this._addUID('GPmousePosition');
            container.className = 'GPwidget';
            return container;
        },
        _createShowMousePositionElement: function () {
            var input = document.createElement('input');
            input.id = this._addUID('GPshowMousePosition');
            input.type = 'checkbox';
            return input;
        },
        _createShowMousePositionPictoElement: function (isDesktop) {
            var self = this;
            var label = document.createElement('label');
            label.id = this._addUID('GPshowMousePositionPicto');
            label.className = 'GPshowAdvancedToolPicto';
            label.htmlFor = this._addUID('GPshowMousePosition');
            label.title = 'Afficher les coordonnées du curseur';
            label.addEventListener('click', function (e) {
                var mapCenterClass = '';
                if (!document.getElementById(self._addUID('GPshowMousePosition')).checked && !isDesktop) {
                    mapCenterClass = 'GPmapCenterVisible';
                }
                document.getElementById('GPmapCenter').className = mapCenterClass;
                self.onShowMousePositionClick(e);
            });
            var spanOpen = document.createElement('span');
            spanOpen.id = this._addUID('GPshowMousePositionOpen');
            spanOpen.className = 'GPshowAdvancedToolOpen';
            label.appendChild(spanOpen);
            return label;
        },
        _createMousePositionPanelElement: function (displayAltitude, displayCoordinates, editCoordinates, currentProjectionUnits) {
            displayAltitude = typeof displayAltitude === 'undefined' ? true : displayAltitude;
            displayCoordinates = typeof displayCoordinates === 'undefined' ? true : displayCoordinates;
            editCoordinates = typeof editCoordinates === 'undefined' ? false : editCoordinates;
            var div = document.createElement('div');
            div.id = this._addUID('GPmousePositionPanel');
            div.className = 'GPpanel';
            div.appendChild(this._createMousePositionPanelHeaderElement());
            div.appendChild(this._createMousePositionPanelBasicElement(displayAltitude, displayCoordinates, editCoordinates, currentProjectionUnits));
            var arraySettings = this._createShowMousePositionSettingsElement(displayCoordinates);
            for (var j = 0; j < arraySettings.length; j++) {
                div.appendChild(arraySettings[j]);
            }
            return div;
        },
        _createMapCenter: function () {
            var div = document.createElement('div');
            div.id = 'GPmapCenter';
            div.className = '';
            return div;
        },
        _createMousePositionPanelHeaderElement: function () {
            var container = document.createElement('div');
            container.className = 'GPpanelHeader';
            var divTitle = document.createElement('div');
            divTitle.className = 'GPpanelTitle';
            divTitle.innerHTML = 'Coordonnées';
            container.appendChild(divTitle);
            var divClose = document.createElement('div');
            divClose.id = 'GPmousePositionPanelClose';
            divClose.className = 'GPpanelClose';
            divClose.title = 'Fermer le panneau';
            var self = this;
            if (divClose.addEventListener) {
                divClose.addEventListener('click', function () {
                    document.getElementById(self._addUID('GPshowMousePositionPicto')).click();
                }, false);
            } else if (divClose.attachEvent) {
                divClose.attachEvent('onclick', function () {
                    document.getElementById(self._addUID('GPshowMousePositionPicto')).click();
                });
            }
            container.appendChild(divClose);
            return container;
        },
        _createMousePositionPanelBasicElement: function (displayAltitude, displayCoordinates, editCoordinates, currentProjectionUnits) {
            var container = document.createElement('div');
            container.id = this._addUID('GPmousePositionBasicPanel');
            container.appendChild(this._createMousePositionPanelBasicCoordinateElement(displayCoordinates, editCoordinates, currentProjectionUnits));
            container.appendChild(this._createMousePositionPanelEditToolsElement(editCoordinates));
            container.appendChild(this._createMousePositionPanelBasicAltitudeElement(displayAltitude));
            return container;
        },
        _createCoordinateElement: function (coordType, editCoordinates) {
            var context = this;
            if ([
                    'Lon',
                    'Lat'
                ].indexOf(coordType) === -1) {
                return [];
            }
            var list = [];
            var input = document.createElement('input');
            input.id = this._addUID('GPmousePosition' + coordType);
            input.title = editCoordinates === true ? 'Cliquer pour saisir des coordonnées' : '';
            input.readOnly = true;
            if (editCoordinates) {
                input.addEventListener('click', function () {
                    context.onMousePositionEditModeClick(true);
                });
                input.addEventListener('change', function (e) {
                    this.classList.remove('error');
                    var valid = context.validateExtentCoordinate(coordType, this.value, e);
                    valid ? this.classList.remove('error') : this.classList.add('error');
                });
            }
            list.push(input);
            var span = document.createElement('span');
            span.className = 'GPmousePositionUnits';
            list.push(span);
            return list;
        },
        _createDMSCoordinateElement: function (coordType, editCoordinates) {
            if ([
                    'Lon',
                    'Lat'
                ].indexOf(coordType) === -1) {
                return [];
            }
            var context = this;
            var list = [];
            var input = document.createElement('input');
            input.id = this._addUID('GPmousePosition' + coordType + 'Degrees');
            input.className = 'GPSexagesimal';
            input.setAttribute('name', 'degrees');
            input.title = editCoordinates === true ? 'Cliquer pour saisir des coordonnées' : '';
            input.readOnly = true;
            input.dataset.min = 0;
            input.dataset.max = coordType === 'Lon' ? 180 : 90;
            if (editCoordinates) {
                input.addEventListener('click', function () {
                    context.onMousePositionEditModeClick(true);
                });
                input.addEventListener('change', function () {
                    this.classList.remove('error');
                    var valid = context._checkDMSDegrees(coordType, this);
                    valid ? this.classList.remove('error') : this.classList.add('error');
                });
            }
            list.push(input);
            var span = document.createElement('span');
            span.className = 'GPmousePositionSexagesimalLabel';
            span.innerHTML = '\xB0';
            list.push(span);
            var input1 = document.createElement('input');
            input1.id = this._addUID('GPmousePosition' + coordType + 'Minutes');
            input1.className = 'GPSexagesimal';
            input1.setAttribute('name', 'minutes');
            input1.title = editCoordinates === true ? 'Cliquer pour saisir des coordonnées' : '';
            input1.readOnly = true;
            input1.dataset.min = 0;
            input1.dataset.max = 59;
            if (editCoordinates) {
                input1.addEventListener('click', function () {
                    context.onMousePositionEditModeClick(true);
                });
                input1.addEventListener('change', function () {
                    this.classList.remove('error');
                    var valid = context._checkDMSElement(this);
                    valid ? this.classList.remove('error') : this.classList.add('error');
                });
            }
            list.push(input1);
            var span1 = document.createElement('span');
            span1.className = 'GPmousePositionSexagesimalLabel';
            span1.innerHTML = '\'';
            list.push(span1);
            var input2 = document.createElement('input');
            input2.id = this._addUID('GPmousePosition' + coordType + 'Seconds');
            input2.className = 'GPSexagesimalsec';
            input2.setAttribute('name', 'seconds');
            input2.title = editCoordinates === true ? 'Cliquer pour saisir des coordonnées' : '';
            input2.readOnly = true;
            input2.dataset.min = 0;
            input2.dataset.max = 59;
            if (editCoordinates) {
                input2.addEventListener('click', function () {
                    context.onMousePositionEditModeClick(true);
                });
                input2.addEventListener('change', function () {
                    this.classList.remove('error');
                    var valid = context._checkDMSElement(this, true);
                    valid ? this.classList.remove('error') : this.classList.add('error');
                });
            }
            list.push(input2);
            var span2 = document.createElement('span');
            span2.className = 'GPmousePositionSexagesimalLabel';
            span2.innerHTML = '\'\'';
            list.push(span2);
            var select = document.createElement('select');
            select.id = this._addUID('GPmousePosition' + coordType + 'Direction');
            select.className = 'GPmousePositionDirection';
            select.setAttribute('name', 'direction');
            select.disabled = true;
            var option = document.createElement('option');
            option.value = coordType === 'Lon' ? 'E' : 'N';
            option.innerHTML = coordType === 'Lon' ? 'E' : 'N';
            select.appendChild(option);
            var option1 = document.createElement('option');
            option1.value = coordType === 'Lon' ? 'O' : 'S';
            option1.innerHTML = coordType === 'Lon' ? 'O' : 'S';
            select.appendChild(option1);
            list.push(select);
            return list;
        },
        _createMousePositionPanelBasicCoordinateElement: function (display, editCoordinates, currentProjectionUnits) {
            var div = document.createElement('div');
            div.id = this._addUID('GPmousePositionCoordinate');
            div.style.display = display ? 'block' : 'none';
            var divLat = document.createElement('div');
            var spanLat = document.createElement('span');
            spanLat.className = 'GPmousePositionLabel';
            spanLat.id = this._addUID('GPmousePositionLatLabel');
            spanLat.innerHTML = 'Latitude : ';
            divLat.appendChild(spanLat);
            var span = document.createElement('span');
            span.id = this._addUID('GPmousePositionLatCoordinate');
            var arrayCoords;
            if (currentProjectionUnits === 'DMS') {
                arrayCoords = this._createDMSCoordinateElement('Lat', editCoordinates);
            } else {
                arrayCoords = this._createCoordinateElement('Lat', editCoordinates);
            }
            for (var i = 0; i < arrayCoords.length; i++) {
                span.appendChild(arrayCoords[i]);
            }
            divLat.appendChild(span);
            div.appendChild(divLat);
            var divLon = document.createElement('div');
            var spanLon = document.createElement('span');
            spanLon.className = 'GPmousePositionLabel';
            spanLon.id = this._addUID('GPmousePositionLonLabel');
            spanLon.innerHTML = 'Longitude : ';
            divLon.appendChild(spanLon);
            var span1 = document.createElement('span');
            span1.id = this._addUID('GPmousePositionLonCoordinate');
            var arrayCoords1;
            if (currentProjectionUnits === 'DMS') {
                arrayCoords1 = this._createDMSCoordinateElement('Lon', editCoordinates);
            } else {
                arrayCoords1 = this._createCoordinateElement('Lon', editCoordinates);
            }
            for (var j = 0; j < arrayCoords1.length; j++) {
                span1.appendChild(arrayCoords1[j]);
            }
            divLon.appendChild(span1);
            div.appendChild(divLon);
            return div;
        },
        _createMousePositionPanelBasicAltitudeElement: function (display) {
            var div = document.createElement('div');
            div.id = this._addUID('GPmousePositionAltitude');
            div.style.display = display ? 'block' : 'none';
            var spanLabel = document.createElement('span');
            spanLabel.className = 'GPmousePositionLabel';
            spanLabel.innerHTML = 'Altitude : ';
            div.appendChild(spanLabel);
            var spanAlt = document.createElement('span');
            spanAlt.className = 'GPmousePositionCoords';
            spanAlt.id = this._addUID('GPmousePositionAlt');
            spanAlt.innerHTML = '...';
            div.appendChild(spanAlt);
            var spanUnits = document.createElement('span');
            spanUnits.className = 'GPmousePositionAltitudeUnits';
            spanUnits.innerHTML = 'm';
            div.appendChild(spanUnits);
            return div;
        },
        _createMousePositionPanelEditToolsElement: function (editCoordinates) {
            var context = this;
            var div = document.createElement('div');
            div.className = 'GPmousePositionPanelEditTools';
            div.id = this._addUID('GPmousePositionPanelEditTools');
            if (!editCoordinates) {
                div.style.display = 'none';
            }
            var span1 = document.createElement('span');
            span1.className = 'GPmousePositionEditTool';
            span1.id = this._addUID('GPmousePositionLocate');
            span1.title = editCoordinates === true ? 'Cliquer pour saisir des coordonnées' : '';
            if (editCoordinates) {
                span1.addEventListener('click', function () {
                    context.onMousePositionEditModeLocateClick();
                });
            }
            div.appendChild(span1);
            var span2 = document.createElement('span');
            span2.className = 'GPmousePositionEditTool';
            span2.id = this._addUID('GPmousePositionCloseEdit');
            span2.title = 'Quitter la saisie des coordonnées';
            span2.style.display = 'none';
            if (editCoordinates) {
                span2.addEventListener('click', function () {
                    context.onMousePositionEditModeClick(false);
                });
            }
            div.appendChild(span2);
            return div;
        },
        _createShowMousePositionSettingsElement: function (display) {
            var list = [];
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.id = this._addUID('GPshowMousePositionSettings');
            var label = document.createElement('label');
            label.id = this._addUID('GPshowMousePositionSettingsPicto');
            label.htmlFor = this._addUID('GPshowMousePositionSettings');
            label.title = 'Réglages';
            label.className = 'GPshowMoreOptions GPshowMousePositionSettingsPicto';
            label.style.display = display ? 'block' : 'none';
            list.push(input);
            list.push(label);
            return list;
        },
        _createMousePositionSettingsElement: function (display) {
            var container = document.createElement('div');
            container.id = this._addUID('GPmousePositionSettings');
            container.style.display = display === undefined || display ? 'block' : 'none';
            var span = document.createElement('span');
            span.className = 'GPmousePositionSettingsLabel';
            span.innerHTML = 'Système de référence';
            container.appendChild(span);
            return container;
        },
        _createMousePositionSettingsSystemsElement: function (systems) {
            var context = this;
            var selectSystem = document.createElement('select');
            selectSystem.id = this._addUID('GPmousePositionProjectionSystem');
            selectSystem.className = 'GPinputSelect GPmousePositionSettingsSelect';
            selectSystem.addEventListener('change', function (e) {
                context.onMousePositionProjectionSystemChange(e);
            });
            selectSystem.addEventListener('mouseover', function (e) {
                context.onMousePositionProjectionSystemMouseOver(e);
            });
            for (var i = 0; i < systems.length; i++) {
                var obj = systems[i];
                var option = document.createElement('option');
                option.value = obj.code;
                option.text = obj.label || i;
                selectSystem.appendChild(option);
            }
            return selectSystem;
        },
        _createMousePositionSettingsUnitsElement: function (units) {
            var context = this;
            var selectUnits = document.createElement('select');
            selectUnits.id = this._addUID('GPmousePositionProjectionUnits');
            selectUnits.className = 'GPinputSelect GPmousePositionSettingsSelect';
            selectUnits.addEventListener('change', function (e) {
                context.onMousePositionProjectionUnitsChange(e);
            });
            for (var j = 0; j < units.length; j++) {
                var obj = units[j];
                var option = document.createElement('option');
                option.value = obj.code ? obj.code : j;
                option.text = obj.label || j;
                selectUnits.appendChild(option);
            }
            return selectUnits;
        },
        _resetLabelElements: function (currentProjectionType) {
            var spanLat = document.getElementById(this._addUID('GPmousePositionLatLabel'));
            spanLat.innerHTML = currentProjectionType === 'Geographical' ? 'Latitude :' : 'X :';
            var spanLon = document.getElementById(this._addUID('GPmousePositionLonLabel'));
            spanLon.innerHTML = currentProjectionType === 'Geographical' ? 'Longitude :' : 'Y :';
        },
        _resetUnitElements: function (currentProjectionUnits) {
            var value = '';
            if (currentProjectionUnits === 'M' || currentProjectionUnits === 'KM') {
                value = currentProjectionUnits.toLowerCase();
            }
            var elts = document.getElementsByClassName('GPmousePositionUnits');
            for (var e = 0; e < elts.length; e++) {
                elts[e].innerHTML = value;
            }
        },
        _resetCoordinateElements: function (editCoordinates, currentProjectionType, currentProjectionUnits) {
            var latElt = document.getElementById(this._addUID('GPmousePositionLatCoordinate'));
            while (latElt.firstChild) {
                latElt.removeChild(latElt.firstChild);
            }
            var arrayCoords;
            if (currentProjectionUnits === 'DMS') {
                arrayCoords = this._createDMSCoordinateElement('Lat', editCoordinates);
            } else {
                arrayCoords = this._createCoordinateElement('Lat', editCoordinates);
            }
            for (var i = 0; i < arrayCoords.length; i++) {
                latElt.appendChild(arrayCoords[i]);
            }
            var lonElt = document.getElementById(this._addUID('GPmousePositionLonCoordinate'));
            while (lonElt.firstChild) {
                lonElt.removeChild(lonElt.firstChild);
            }
            var arrayCoords1;
            if (currentProjectionUnits === 'DMS') {
                arrayCoords1 = this._createDMSCoordinateElement('Lon', editCoordinates);
            } else {
                arrayCoords1 = this._createCoordinateElement('Lon', editCoordinates);
            }
            for (var j = 0; j < arrayCoords1.length; j++) {
                lonElt.appendChild(arrayCoords1[j]);
            }
            this.onMapMove();
        },
        _setEditMode: function (editing) {
            var locateElt = document.getElementById(this._addUID('GPmousePositionLocate'));
            locateElt.title = editing ? 'Aller à la position ...' : 'Cliquer pour saisir des coordonnées';
            var closeEditElt = document.getElementById(this._addUID('GPmousePositionCloseEdit'));
            closeEditElt.style.display = editing ? 'inline-block' : 'none';
            var selector = 'div[id^=' + this._addUID('GPmousePositionCoordinate') + ']';
            var inputs = document.querySelectorAll(selector + ' input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].readOnly = !editing;
                if (editing) {
                    inputs[i].value = '';
                    inputs[i].classList.remove('error');
                }
            }
            var selects = document.querySelectorAll(selector + ' select');
            for (var j = 0; j < selects.length; j++) {
                selects[j].disabled = !editing;
            }
        },
        _checkDMSElement: function (input, isFloat) {
            var b = isFloat === undefined ? false : true;
            var value = input.value;
            if (b) {
                value = value.replace(',', '.');
            }
            if (isNaN(value)) {
                return false;
            }
            var v = parseFloat(value);
            if (!b && (v | 0) !== v) {
                return false;
            }
            var min = Number(input.dataset.min);
            var max = Number(input.dataset.max);
            return v >= min && v <= max;
        },
        _checkDMSDegrees: function (coordType, input) {
            if (isNaN(input.value)) {
                return false;
            }
            var v = parseFloat(input.value);
            if ((v | 0) !== v) {
                return false;
            }
            var min = Number(input.dataset.min);
            var max = Number(input.dataset.max);
            if (v < min || v > max) {
                return false;
            }
            var inputMinutes = document.getElementById(this._addUID('GPmousePosition' + coordType + 'Minutes'));
            var inputSeconds = document.getElementById(this._addUID('GPmousePosition' + coordType + 'Seconds'));
            if (v >= max) {
                inputMinutes.dataset.max = 0;
                inputSeconds.dataset.max = 0;
            } else {
                inputMinutes.dataset.max = 59;
                inputSeconds.dataset.max = 59.9999;
            }
            return true;
        },
        GPdisplayCoords: function (coordinate) {
            if (coordinate && coordinate != null) {
                var labelLon = document.getElementById(this._addUID('GPmousePositionLonLabel'));
                var labelLat = document.getElementById(this._addUID('GPmousePositionLatLabel'));
                if (coordinate.x || coordinate.y) {
                    labelLat.innerHTML = 'X : ';
                    labelLon.innerHTML = 'Y : ';
                } else if (coordinate.e || coordinate.n) {
                    labelLat.innerHTML = 'E : ';
                    labelLon.innerHTML = 'N : ';
                } else {
                    labelLat.innerHTML = 'Latitude : ';
                    labelLon.innerHTML = 'Longitude : ';
                }
                if (typeof coordinate.lat === 'object' && typeof coordinate.lng === 'object') {
                    var parts = {
                        lng: 'Lon',
                        lat: 'Lat'
                    };
                    var units = [
                        'Degrees',
                        'Minutes',
                        'Seconds'
                    ];
                    for (var p in parts) {
                        for (var u = 0; u < units.length; ++u) {
                            var selector = 'GPmousePosition' + parts[p] + units[u];
                            var elt = document.getElementById(this._addUID(selector));
                            var key = units[u].charAt(0).toLowerCase();
                            elt.value = coordinate[p][key];
                        }
                    }
                    document.getElementById(this._addUID('GPmousePositionLonDirection')).value = coordinate.lng.direction;
                    document.getElementById(this._addUID('GPmousePositionLatDirection')).value = coordinate.lat.direction;
                } else {
                    var elLat = document.getElementById(this._addUID('GPmousePositionLat'));
                    var elLon = document.getElementById(this._addUID('GPmousePositionLon'));
                    elLat.value = coordinate.x || coordinate.lat || coordinate.e || '0';
                    elLon.value = coordinate.y || coordinate.lng || coordinate.lon || coordinate.n || '0';
                    var unit = coordinate.unit === undefined ? '' : coordinate.unit;
                    var elements = document.getElementsByClassName('GPmousePositionUnits');
                    for (var n = 0; n < elements.length; ++n) {
                        elements[n].innerHTML = unit;
                    }
                }
            }
        },
        GPdisplayElevation: function (coordinate, altitudeTimeoutDelay, noDataValue, noDataValueTolerance) {
            var self = this;
            var altitudeTimeout;
            if (!altitudeTimeoutDelay) {
                altitudeTimeoutDelay = 500;
            }
            clearTimeout(altitudeTimeout);
            document.getElementById(this._addUID('GPmousePositionAlt')).innerHTML = '...';
            if (noDataValue == null) {
                noDataValue = -99999;
            }
            if (noDataValueTolerance == null) {
                noDataValueTolerance = 99980;
            }
            var maxThreshold = noDataValue + noDataValueTolerance;
            var minThreshold = noDataValue - noDataValueTolerance;
            if (coordinate && coordinate != null) {
                if (document.getElementById(this._addUID('GPmousePositionAltitude'))) {
                    altitudeTimeout = setTimeout(function () {
                        self.onRequestAltitude(coordinate, function (z) {
                            if (minThreshold < z && z < maxThreshold) {
                                self.GPresetElevation();
                            } else {
                                document.getElementById(self._addUID('GPmousePositionAlt')).innerHTML = z;
                            }
                        });
                    }, altitudeTimeoutDelay);
                }
            }
        },
        GPresetElevation: function () {
            if (document.getElementById(this._addUID('GPmousePositionAltitude'))) {
                document.getElementById(this._addUID('GPmousePositionAlt')).innerHTML = '---';
            }
        }
    };
    return MousePositionDOM;
}();
ItownsControlsWidget = function () {
    function Widget(options) {
        this.name = null;
        this._element = null;
        this._target = null;
        this._globe = null;
        this.setOptions(options);
    }
    Widget.prototype.constructor = Widget;
    Widget.prototype.getElement = function getElement() {
        return this._element;
    };
    Widget.prototype.setTarget = function setTarget(targetDiv, position) {
        if (!targetDiv) {
            return;
        }
        if (position && position !== 'absolute' && position !== 'relative') {
            console.log('[ERROR] Widget:setTarget - position value should be \'absolute\' or \'relative\'');
            return;
        }
        if (this._target && this._element) {
            this._target.removeChild(this._element);
        }
        this._target = targetDiv;
        if (!this._element) {
            console.log('[ERROR] Widget:setTarget - widget element not created');
            return;
        }
        this._element.style.position = position || 'relative';
        targetDiv.appendChild(this._element);
    };
    Widget.prototype.getTarget = function getTarget() {
        return this._target;
    };
    Widget.prototype.setOptions = function setOptions(options) {
        this.name = options.name;
        this._element = options.element;
        this.setTarget(options.target, options.position);
    };
    Widget.prototype.getGlobe = function getGlobe() {
        return this._globe;
    };
    Widget.prototype.setGlobe = function setGlobe(globe) {
        this._globe = globe;
    };
    return Widget;
}();
ItownsControlsUtilsPositionFormater = function () {
    var PositionFormater = {
        NORTH: 'N',
        SOUTH: 'S',
        EAST: 'E',
        WEST: 'W',
        digitSecond: 2,
        digitDecimal: 5,
        digitRadian: 8,
        roundToDecimal: function (inputNum, numPoints) {
            var multiplier = Math.pow(10, numPoints);
            return Math.round(inputNum * multiplier) / multiplier;
        },
        decimalToRadian: function (location) {
            var d = 0.017453292519943295;
            return this.roundToDecimal(location * d, this.digitRadian);
        },
        decimalToGrade: function (location) {
            var d = 1.1111111111111112;
            return this.roundToDecimal(location * d, this.digitRadian);
        },
        decimalToDMS: function (location, hemisphere) {
            if (location < 0) {
                location *= -1;
            }
            var degrees = Math.floor(location);
            var minutesFromRemainder = (location - degrees) * 60;
            var minutes = Math.floor(minutesFromRemainder);
            var secondsFromRemainder = (minutesFromRemainder - minutes) * 60;
            var seconds = this.roundToDecimal(secondsFromRemainder, this.digitSecond);
            var dms = degrees + '\xB0 ' + minutes + '\' ' + seconds + '" ';
            if (hemisphere) {
                dms += hemisphere;
            }
            return dms;
        },
        decimalLatToDMS: function (location) {
            var hemisphere = location < 0 ? this.SOUTH : this.NORTH;
            return this.decimalToDMS(location, hemisphere);
        },
        decimalLongToDMS: function (location) {
            var hemisphere = location < 0 ? this.WEST : this.EAST;
            return this.decimalToDMS(location, hemisphere);
        },
        DMSToDecimal: function (degrees, minutes, seconds, hemisphere) {
            var ddVal = degrees + minutes / 60 + seconds / 3600;
            ddVal = hemisphere == this.SOUTH || hemisphere == this.WEST ? ddVal * -1 : ddVal;
            var decimal = this.roundToDecimal(ddVal, this.digitDecimal);
            return decimal;
        }
    };
    return PositionFormater;
}();
ItownsCRSCRS = function () {
    var CRS = {
        'EPSG:4326': '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs +units=degrees',
        'EPSG:3857': '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
        'EPSG:2154': '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        'EPSG:27572': '+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs',
        'EPSG:32620': '+proj=utm +zone=20 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
        'EPSG:4467': '+proj=utm +zone=21 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        'EPSG:2972': '+proj=utm +zone=22 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        'EPSG:32630': '+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs',
        'EPSG:32631': '+proj=utm +zone=31 +datum=WGS84 +units=m +no_defs',
        'EPSG:32632': '+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs',
        'EPSG:4471': '+proj=utm +zone=38 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        'EPSG:2975': '+proj=utm +zone=40 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        'EPSG:3296': '+proj=utm +zone=5 +south +ellps=GRS80 +towgs84=0.072,-0.507,-0.245,-0.0183,0.0003,-0.007,-0.0093 +units=m +no_defs',
        'EPSG:3297': '+proj=utm +zone=6 +south +ellps=GRS80 +towgs84=0.072,-0.507,-0.245,-0.0183,0.0003,-0.007,-0.0093 +units=m +no_defs',
        'EPSG:32707': '+proj=utm +zone=7 +south +datum=WGS84 +units=m +no_defs',
        'EPSG:32708': '+proj=utm +zone=8 +south +datum=WGS84 +units=m +no_defs',
        'EPSG:26912': '+proj=utm +zone=12 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        'EPSG:32742': '+proj=utm +zone=42 +south +datum=WGS84 +units=m +no_defs',
        'EPSG:32739': '+proj=utm +zone=39 +south +datum=WGS84 +units=m +no_defs',
        'EPSG:32743': '+proj=utm +zone=43 +south +datum=WGS84 +units=m +no_defs',
        'EPSG:2986': '',
        'EPSG:32737': '+proj=utm +zone=37 +south +datum=WGS84 +units=m +no_defs',
        'EPSG:32738': '+proj=utm +zone=38 +south +datum=WGS84 +units=m +no_defs',
        'EPSG:2988': '+proj=utm +zone=1 +south +ellps=intl +towgs84=253,-132,-127,0,0,0,0 +units=m +no_defs',
        'EPSG:3163': '+proj=lcc +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5 +lon_0=166 +x_0=400000 +y_0=300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    };
    return CRS;
}();
ItownsControlsMousePosition = function (proj4, woodman, Gp, GlobeViewExtended, Utils, RightManagement, SelectorID, MousePositionDOM, Widget, PositionFormater, CRS) {
    function MousePosition(options) {
        options = options || {};
        if (!(this instanceof MousePosition)) {
            throw new TypeError('ERROR CLASS_CONSTRUCTOR');
        }
        if (options && typeof options !== 'object') {
            throw new Error('ERROR WRONG_TYPE : options should be an object');
        }
        this._initialize(options);
        this._callbacks = {};
        var container = this._initContainer(options);
        var targetDiv = document.getElementById(options.target) || null;
        Widget.call(this, {
            name: 'MousePosition',
            element: container,
            target: targetDiv
        });
    }
    MousePosition.prototype = Object.create(Widget.prototype, {});
    Utils.assign(MousePosition.prototype, MousePositionDOM);
    MousePosition.prototype.constructor = MousePosition;
    MousePosition.prototype.setGlobe = function (globe) {
        if (globe) {
            this._centerElement = this._createMapCenter();
            globe.getTargetElement().appendChild(this._centerElement);
            this._callbacks.mouseMove = this.onMouseMove.bind(this);
            if (!this.collapsed) {
                if (this._isDesktop) {
                    globe.listen(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
                } else {
                    globe.listen(GlobeViewExtended.EVENTS.CENTER_CHANGED, this.onGlobeMove);
                }
            }
        } else if (globe == null) {
            this._globe.forget(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
            while (this.getElement().hasChildNodes()) {
                this.getElement().removeChild(this.getElement().lastChild);
            }
            this.getElement().parentNode.removeChild(this.getElement());
            this._globe.getTargetElement().removeChild(this._centerElement);
        }
        Widget.prototype.setGlobe.call(this, globe);
    };
    MousePosition.prototype.addSystem = function (system) {
        if (typeof system !== 'object') {
            console.log('[ERROR] MousePosition:addSystem - system parameter should be an object');
            return;
        }
        if (!system.crs) {
            return;
        }
        if (!system.label) {
            system.label = system.crs;
        }
        if (!system.type) {
            system.type = 'Metric';
        }
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var obj = this._projectionSystems[j];
            if (system.crs === obj.crs) {
                console.log('crs \'{}\' already configured', obj.crs);
            }
        }
        system.code = this._projectionSystems.length;
        this._projectionSystems.push(system);
        var selectSystem = document.getElementById(this._addUID('GPmousePositionProjectionSystem'));
        if (selectSystem) {
            var option = document.createElement('option');
            option.value = system.code;
            option.text = system.label;
            selectSystem.appendChild(option);
        }
    };
    MousePosition.prototype.addSystems = function (systems) {
        if (!systems) {
            return;
        }
        if (!Array.isArray(systems)) {
            console.log('[ERROR] MousePosition:addSystems - systems parameter should be an array');
            return;
        }
        for (var i = 0; i < systems.length; i++) {
            this.addSystem(systems[i]);
        }
    };
    MousePosition.prototype.removeSystem = function (systemCrs) {
        if (!systemCrs || typeof systemCrs !== 'string') {
            console.log('[ERROR] MousePosition:removeSystem - systemCode parameter should be a string');
            return;
        }
        var systemCode = null;
        for (var i = 0; i < this._projectionSystems.length; i++) {
            var proj = this._projectionSystems[i];
            if (systemCrs === proj.crs) {
                systemCode = proj.code;
                this._projectionSystems.splice(i, 1);
                break;
            }
        }
        if (systemCode == null) {
            console.log('[WARN] MousePosition:removeSystem - system not found');
            return;
        }
        var oldNewCodeGlobe = [];
        for (var ii = 0; ii < this._projectionSystems.length; ii++) {
            oldNewCodeGlobe[Number(this._projectionSystems[ii].code)] = ii;
            this._projectionSystems[ii].code = ii;
        }
        var indexChildToRemove = null;
        var systemList = document.getElementById(this._addUID('GPmousePositionProjectionSystem'));
        for (var j = 0; j < systemList.childNodes.length; j++) {
            if (systemCode == systemList.childNodes[j].value) {
                indexChildToRemove = j;
                continue;
            }
            systemList.childNodes[j].value = oldNewCodeGlobe[Number(systemList.childNodes[j].value)];
        }
        if (indexChildToRemove != null) {
            systemList.removeChild(systemList.childNodes[indexChildToRemove]);
        }
        if (this._currentProjectionSystems.code == systemCode) {
            systemList.childNodes[0].setAttribute('selected', 'selected');
            this._setCurrentSystem(systemList.childNodes[0].value);
        }
    };
    MousePosition.prototype.setUnits = function (units) {
        if (!units || !Array.isArray(units)) {
            return;
        }
        this.options.units = units;
        this._projectionUnits = {};
        this._initProjectionUnits();
        if (this._currentProjectionType) {
            this._setTypeUnitsPanel(this._currentProjectionType);
        }
    };
    MousePosition.prototype.setAltitudeOptions = function (options) {
        if (!options || typeof options !== 'object') {
            return;
        }
        this.options.altitude.triggerDelay = options.triggerDelay;
        this.options.altitude.responseDelay = options.responseDelay;
        if (options.serviceOptions) {
            for (var opt in options.serviceOptions) {
                if (options.serviceOptions.hasOwnProperty(opt)) {
                    this.options.altitude.serviceOptions[opt] = options.serviceOptions[opt];
                }
            }
        }
    };
    MousePosition.prototype.displayAltitude = function (displayAltitude) {
        if (displayAltitude === undefined) {
            return;
        }
        if (typeof this._noRightManagement === 'undefined') {
            this._checkRightsManagement();
        }
        this.options.displayAltitude = displayAltitude;
        this._setElevationPanel(displayAltitude);
    };
    MousePosition.prototype.displayCoordinates = function (displayCoordinates) {
        if (displayCoordinates === undefined) {
            return;
        }
        this.options.displayCoordinates = displayCoordinates;
        this._setCoordinatesPanel(displayCoordinates);
        this._setSettingsPanel(displayCoordinates);
    };
    MousePosition.prototype.setCollapsed = function (collapsed) {
        if (collapsed === undefined) {
            console.log('[ERROR] MousePosition:setCollapsed - missing collapsed parameter');
            return;
        }
        if (collapsed && this.collapsed || !collapsed && !this.collapsed) {
            return;
        }
        if (!this._isDesktop) {
            document.getElementById(this._addUID('GPmapCenter')).className = collapsed ? '' : 'GPmapCenterVisible';
        }
        this.onShowMousePositionClick();
        this._showMousePositionContainer.checked = !collapsed;
    };
    MousePosition.prototype._initialize = function (options) {
        this.options = options || {};
        this.options.collapsed = options.collapsed !== undefined ? options.collapsed : true;
        this.collapsed = this.options.collapsed;
        this.options.units = options.units || [];
        this.options.displayAltitude = options.displayAltitude !== undefined ? options.displayAltitude : true;
        this.options.displayCoordinates = options.displayCoordinates !== undefined ? options.displayCoordinates : true;
        this.options.systems = options.systems || [];
        if (options.altitude) {
            var altitude = options.altitude;
            this.options.altitude = {
                triggerDelay: altitude.triggerDelay !== undefined ? altitude.triggerDelay : 200,
                responseDelay: altitude.responseDelay !== undefined ? altitude.responseDelay : 500,
                serviceOptions: altitude.serviceOptions || {},
                noDataValue: altitude.noDataValue !== undefined ? altitude.noDataValue : -99999,
                noDataValueTolerance: altitude.noDataValueTolerance !== undefined ? altitude.noDataValueTolerance : 90000
            };
        } else {
            this.options.altitude = {
                triggerDelay: 200,
                responseDelay: 500,
                serviceOptions: {}
            };
        }
        this._uid = SelectorID.generate();
        this._projectionSystems = [];
        this._initProjectionSystems();
        this._projectionUnits = {};
        this._initProjectionUnits();
        this._isDesktop = Utils.detectSupport();
        if (this.options.altitude.triggerDelay < 100) {
            this.options.altitude.triggerDelay = 100;
        }
        this._timer = this.options.altitude.triggerDelay;
        this._currentProjectionSystems = this._projectionSystems[0];
        this._currentProjectionType = this._projectionSystems[0].type;
        this._currentProjectionUnits = this._projectionUnits[this._currentProjectionType][0].code;
        this._projectionUnitsContainer = null;
        this._showMousePositionContainer = null;
        if (!this.options.displayAltitude && !this.options.displayCoordinates) {
            this.options.displayCoordinates = true;
        }
        if (this.options.displayAltitude) {
            this._checkRightsManagement();
        }
    };
    MousePosition.prototype._initProjectionSystems = function () {
        var projectionSystemsByDefault = [
            {
                label: 'Géographique',
                crs: 'EPSG:4326',
                type: 'Geographical'
            },
            {
                label: 'Mercator',
                crs: 'EPSG:3857',
                type: 'Metric'
            },
            {
                label: 'Lambert 93',
                crs: 'EPSG:2154',
                type: 'Metric',
                geoBBox: {
                    left: -9.86,
                    bottom: 41.15,
                    right: 10.38,
                    top: 51.56
                }
            },
            {
                label: 'Lambert II étendu',
                crs: 'EPSG:27572',
                type: 'Metric',
                geoBBox: {
                    left: -4.87,
                    bottom: 42.33,
                    right: 8.23,
                    top: 51.14
                }
            }
        ];
        var systems = this.options.systems;
        for (var i = 0; i < systems.length; i++) {
            var sys = systems[i];
            this.addSystem(sys);
        }
        if (this._projectionSystems.length === 0) {
            for (var ii = 0; ii < projectionSystemsByDefault.length; ii++) {
                this.addSystem(projectionSystemsByDefault[ii]);
            }
        }
    };
    MousePosition.prototype._initProjectionUnits = function () {
        var projectionUnitsByDefault = {
            Geographical: [
                {
                    code: 'DEC',
                    label: 'degrés décimaux',
                    convert: this._displayDEC
                },
                {
                    code: 'DMS',
                    label: 'degrés sexagésimaux',
                    convert: this._displayDMS
                },
                {
                    code: 'RAD',
                    label: 'radians',
                    convert: this._displayRAD
                },
                {
                    code: 'GON',
                    label: 'grades',
                    convert: this._displayGON
                }
            ],
            Metric: [
                {
                    code: 'M',
                    label: 'mètres',
                    convert: this._displayMeter
                },
                {
                    code: 'KM',
                    label: 'kilomètres',
                    convert: this._displayKMeter
                }
            ]
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
        }
        if (typeof this._projectionUnits === 'object' && Object.keys(this._projectionUnits).length === 0) {
            this._projectionUnits = projectionUnitsByDefault;
        }
    };
    MousePosition.prototype._checkRightsManagement = function () {
        var rightManagement = RightManagement.check({
            key: this.options.apiKey,
            resources: ['SERVICE_CALCUL_ALTIMETRIQUE_RSC'],
            services: ['Elevation']
        });
        this._noRightManagement = !rightManagement;
        if (!this.options.apiKey) {
            this.options.apiKey = rightManagement.key;
        }
    };
    MousePosition.prototype._initContainer = function (options) {
        var container = this._createMainContainerElement();
        var inputShow = this._showMousePositionContainer = this._createShowMousePositionElement();
        if (!options.collapsed) {
            inputShow.checked = 'checked';
        }
        container.appendChild(inputShow);
        var picto = this._createShowMousePositionPictoElement(this._isDesktop);
        container.appendChild(picto);
        var panel = this._createMousePositionPanelElement(options.displayAltitude, options.displayCoordinates);
        var settings = this._createMousePositionSettingsElement(options.displayCoordinates);
        var systems = this._projectionSystemsContainer = this._createMousePositionSettingsSystemsElement(this._projectionSystems);
        var units = this._projectionUnitsContainer = this._createMousePositionSettingsUnitsElement(this._projectionUnits[this._currentProjectionType]);
        settings.appendChild(systems);
        settings.appendChild(units);
        panel.appendChild(settings);
        container.appendChild(panel);
        return container;
    };
    MousePosition.prototype._setElevationPanel = function (active) {
        var div = null;
        if (!active) {
            div = document.getElementById('GPmousePositionAltitude-' + this._uid);
            div.style.display = 'none';
        } else {
            if (this._noRightManagement) {
                div = document.getElementById('GPmousePositionAlt-' + this._uid);
                div.innerHTML = 'No rights!';
            } else {
                div = document.getElementById('GPmousePositionAltitude-' + this._uid);
                div.style.display = '';
            }
        }
    };
    MousePosition.prototype._setCoordinatesPanel = function (active) {
        var div = document.getElementById('GPmousePositionCoordinate-' + this._uid);
        if (!active) {
            div.style.display = 'none';
        } else {
            div.style.display = '';
        }
    };
    MousePosition.prototype._setSettingsPanel = function (active) {
        var divPicto = document.getElementById('GPshowMousePositionSettingsPicto-' + this._uid);
        var divPanel = document.getElementById('GPmousePositionSettings-' + this._uid);
        if (!active) {
            divPicto.style.display = 'none';
            divPanel.style.display = 'none';
        } else {
            divPicto.style.display = '';
            divPanel.style.display = '';
        }
    };
    MousePosition.prototype._setTypeUnitsPanel = function (type) {
        var container = this._projectionUnitsContainer;
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        var units = this._projectionUnits[type];
        for (var j = 0; j < units.length; j++) {
            var obj = units[j];
            var option = document.createElement('option');
            option.value = obj.code ? obj.code : j;
            option.text = obj.label || j;
            container.appendChild(option);
        }
        this._currentProjectionType = type;
        this._currentProjectionUnits = this._projectionUnits[type][0].code;
    };
    MousePosition.prototype._displayDEC = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.roundToDecimal(coords.lat, 6);
        coordinate.lng = PositionFormater.roundToDecimal(coords.lon, 6);
        return coordinate;
    };
    MousePosition.prototype._displayDMS = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalLatToDMS(coords.lat);
        coordinate.lng = PositionFormater.decimalLongToDMS(coords.lon);
        return coordinate;
    };
    MousePosition.prototype._displayRAD = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalToRadian(coords.lat);
        coordinate.lng = PositionFormater.decimalToRadian(coords.lon);
        return coordinate;
    };
    MousePosition.prototype._displayGON = function (coords) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalToGrade(coords.lat);
        coordinate.lng = PositionFormater.decimalToGrade(coords.lon);
        return coordinate;
    };
    MousePosition.prototype._displayMeter = function (coords) {
        var coordinate = {};
        coordinate.x = coords.lon.toFixed(2);
        coordinate.y = coords.lat.toFixed(2);
        coordinate.unit = 'm';
        return coordinate;
    };
    MousePosition.prototype._displayKMeter = function (coords) {
        var coordinate = {};
        coordinate.x = (coords.lon / 1000).toFixed(2);
        coordinate.y = (coords.lat / 1000).toFixed(2);
        coordinate.unit = 'km';
        return coordinate;
    };
    MousePosition.prototype._setCoordinate = function (coords) {
        var coord = [];
        var coordinates = {};
        var oSrs = this._currentProjectionSystems;
        var crsProp = oSrs.crs;
        if (!oSrs || !crsProp) {
            console.log('ERROR : system crs not found');
            return;
        }
        if (crsProp !== 'EPSG:4326') {
            coord = proj4(CRS[crsProp], [
                coords.lon,
                coords.lat
            ]);
            coordinates.lon = coord[0];
            coordinates.lat = coord[1];
        } else {
            coordinates = coords;
        }
        var type = this._currentProjectionSystems.type;
        var convert = null;
        var units = this._projectionUnits[type];
        for (var i = 0; i < units.length; i++) {
            if (units[i].code === this._currentProjectionUnits) {
                convert = units[i].convert;
                break;
            }
        }
        if (!convert || typeof convert !== 'function') {
            console.log('WARNING : coordinates format function not found');
            return;
        } else {
            coord = convert(coordinates);
        }
        if (!coord || Object.keys(coord).length === 0) {
            return;
        }
        this.GPdisplayCoords(coord);
    };
    MousePosition.prototype._setElevation = function (coords) {
        var delay = this.options.altitude.responseDelay;
        this.GPdisplayElevation(coords, delay);
    };
    MousePosition.prototype.onMoveStopped = function (coords) {
        this._setElevation(coords);
    };
    MousePosition.prototype.onMouseMove = function (e) {
        var self = this;
        var position = this.getGlobe().getCoordinateFromMouseEvent(e);
        if (!position) {
            this.GPdisplayCoords({
                lon: '---',
                lat: '---'
            });
            this.GPresetElevation();
            return;
        }
        var coordinate = {
            lon: position.longitude(),
            lat: position.latitude()
        };
        this._setCoordinate(coordinate);
        if (this.options.displayAltitude) {
            clearTimeout(this._timer);
            this._timer = setTimeout(function () {
                self.onMoveStopped(coordinate);
            }, this.options.altitude.triggerDelay);
        }
    };
    MousePosition.prototype.onGlobeMove = function () {
    };
    MousePosition.prototype.onRequestAltitude = function (coordinate, callback) {
        if (!coordinate || Object.keys(coordinate).length === 0) {
            return;
        }
        if (!this.options.displayAltitude) {
            return;
        }
        if (this._noRightManagement) {
            console.log('[WARNING] contract key configuration has no rights to load geoportal elevation ');
            document.getElementById(this._addUID('GPmousePositionAlt')).innerHTML = 'No rights!';
            return;
        }
        var options = this.options.altitude.serviceOptions || {};
        options.zonly = true;
        options.positions = [{
                lon: coordinate.lon,
                lat: coordinate.lat
            }];
        options.scope = this;
        if (!options.rawResponse) {
            options.onSuccess = function (results) {
                if (results && Object.keys(results)) {
                    callback.call(this, results.elevations[0].z);
                }
            };
        } else {
            options.onSuccess = function (results) {
                console.log('alti service raw response : ', results);
            };
        }
        options.onFailure = function (error) {
            console.log('[getAltitude] ERROR : ' + error.message);
        };
        options.apiKey = options.apiKey || this.options.apiKey;
        Gp.Services.getAltitude(options);
    };
    MousePosition.prototype.onShowMousePositionClick = function () {
        var globe = this.getGlobe();
        this.collapsed = this._showMousePositionContainer.checked;
        if (this._showMousePositionContainer.checked) {
            if (this._isDesktop) {
                globe.forget(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
            } else {
                globe.forget(GlobeViewExtended.EVENTS.CENTER_CHANGED, this.onGlobeMove);
            }
        } else {
            if (this._isDesktop) {
                globe.listen(GlobeViewExtended.EVENTS.MOUSE_MOVE, this._callbacks.mouseMove);
            } else {
                globe.listen(GlobeViewExtended.EVENTS.CENTER_CHANGED, this.onGlobeMove);
            }
        }
        this._setElevationPanel(this.options.displayAltitude);
        this._setCoordinatesPanel(this.options.displayCoordinates);
        if (!this.options.displayCoordinates) {
            this._setSettingsPanel(false);
        }
    };
    MousePosition.prototype.onMousePositionProjectionSystemChange = function (e) {
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;
        this._setCurrentSystem(value);
    };
    MousePosition.prototype._setCurrentSystem = function (systemCode) {
        var type = null;
        for (var i = 0; i < this._projectionSystems.length; ++i) {
            if (this._projectionSystems[i].code == systemCode) {
                type = this._projectionSystems[i].type;
                break;
            }
        }
        if (!type) {
            return;
        }
        if (type !== this._currentProjectionType) {
            this._setTypeUnitsPanel(type);
        }
        this._currentProjectionSystems = this._projectionSystems[Number(systemCode)];
        if (!this._isDesktop) {
            this.onGlobeMove();
        }
    };
    MousePosition.prototype.onMousePositionProjectionSystemMouseOver = function () {
        var globe = this.getGlobe();
        if (!globe) {
            return;
        }
        var globeExtent = globe.getExtent();
        var systemList = document.getElementById(this._addUID('GPmousePositionProjectionSystem'));
        systemList.innerHTML = '';
        var option;
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var proj = this._projectionSystems[j];
            if (proj.geoBBox) {
                if (globeExtent.west() > proj.geoBBox.right || globeExtent.south() > proj.geoBBox.top || globeExtent.east() < proj.geoBBox.left || globeExtent.north() < proj.geoBBox.bottom) {
                    if (proj === this._currentProjectionSystems) {
                        option = document.createElement('option');
                        option.value = proj.code;
                        option.text = proj.label || j;
                        option.setAttribute('selected', 'selected');
                        option.setAttribute('disabled', 'disabled');
                        systemList.appendChild(option);
                    }
                    continue;
                }
            }
            option = document.createElement('option');
            option.value = proj.code;
            option.text = proj.label || j;
            if (proj === this._currentProjectionSystems) {
                option.setAttribute('selected', 'selected');
            }
            systemList.appendChild(option);
        }
    };
    MousePosition.prototype.onMousePositionProjectionUnitsChange = function (e) {
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;
        this._currentProjectionUnits = value;
        if (!this._isDesktop) {
            this.onGlobeMove();
        }
    };
    return MousePosition;
}(proj4, {}, gp, ItownsGlobeViewExtended, CommonUtils, CommonUtilsCheckRightManagement, CommonUtilsSelectorID, CommonControlsMousePositionDOM, ItownsControlsWidget, ItownsControlsUtilsPositionFormater, ItownsCRSCRS);
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('sortable', factory);
    } else if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
        sortable = module.exports = factory();
    } else if (typeof Package !== 'undefined') {
        Sortable = factory();
    } else {
        sortable = window['Sortable'] = factory();
    }
}(function () {
    'use strict';
    var dragEl, parentEl, ghostEl, cloneEl, rootEl, nextEl, scrollEl, scrollParentEl, lastEl, lastCSS, lastParentCSS, oldIndex, newIndex, activeGroup, autoScroll = {}, tapEvt, touchEvt, moved, RSPACE = /\s+/g, expando = 'Sortable' + new Date().getTime(), win = window, document = win.document, parseInt = win.parseInt, supportDraggable = !!('draggable' in document.createElement('div')), supportCssPointerEvents = function (el) {
            el = document.createElement('x');
            el.style.cssText = 'pointer-events:auto';
            return el.style.pointerEvents === 'auto';
        }(), _silent = false, abs = Math.abs, slice = [].slice, touchDragOverListeners = [], _autoScroll = _throttle(function (evt, options, rootEl) {
            if (rootEl && options.scroll) {
                var el, rect, sens = options.scrollSensitivity, speed = options.scrollSpeed, x = evt.clientX, y = evt.clientY, winWidth = window.innerWidth, winHeight = window.innerHeight, vx, vy;
                if (scrollParentEl !== rootEl) {
                    scrollEl = options.scroll;
                    scrollParentEl = rootEl;
                    if (scrollEl === true) {
                        scrollEl = rootEl;
                        do {
                            if (scrollEl.offsetWidth < scrollEl.scrollWidth || scrollEl.offsetHeight < scrollEl.scrollHeight) {
                                break;
                            }
                        } while (scrollEl = scrollEl.parentNode);
                    }
                }
                if (scrollEl) {
                    el = scrollEl;
                    rect = scrollEl.getBoundingClientRect();
                    vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
                    vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
                }
                if (!(vx || vy)) {
                    vx = (winWidth - x <= sens) - (x <= sens);
                    vy = (winHeight - y <= sens) - (y <= sens);
                    (vx || vy) && (el = win);
                }
                if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
                    autoScroll.el = el;
                    autoScroll.vx = vx;
                    autoScroll.vy = vy;
                    clearInterval(autoScroll.pid);
                    if (el) {
                        autoScroll.pid = setInterval(function () {
                            if (el === win) {
                                win.scrollTo(win.pageXOffset + vx * speed, win.pageYOffset + vy * speed);
                            } else {
                                vy && (el.scrollTop += vy * speed);
                                vx && (el.scrollLeft += vx * speed);
                            }
                        }, 24);
                    }
                }
            }
        }, 30), _prepareGroup = function (options) {
            var group = options.group;
            if (!group || typeof group != 'object') {
                group = options.group = { name: group };
            }
            [
                'pull',
                'put'
            ].forEach(function (key) {
                if (!(key in group)) {
                    group[key] = true;
                }
            });
            options.groups = ' ' + group.name + (group.put.join ? ' ' + group.put.join(' ') : '') + ' ';
        };
    function Sortable(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
            throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
        }
        this.el = el;
        this.options = options = _extend({}, options);
        el[expando] = this;
        var defaults = {
            group: Math.random(),
            sort: true,
            disabled: false,
            store: null,
            handle: null,
            scroll: true,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            ignore: 'a, img',
            filter: null,
            animation: 0,
            setData: function (dataTransfer, dragEl) {
                dataTransfer.setData('Text', dragEl.textContent);
            },
            dropBubble: false,
            dragoverBubble: false,
            dataIdAttr: 'data-id',
            delay: 0,
            forceFallback: false,
            fallbackClass: 'sortable-fallback',
            fallbackOnBody: false
        };
        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }
        _prepareGroup(options);
        for (var fn in this) {
            if (fn.charAt(0) === '_') {
                this[fn] = this[fn].bind(this);
            }
        }
        this.nativeDraggable = options.forceFallback ? false : supportDraggable;
        _on(el, 'mousedown', this._onTapStart);
        _on(el, 'touchstart', this._onTapStart);
        if (this.nativeDraggable) {
            _on(el, 'dragover', this);
            _on(el, 'dragenter', this);
        }
        touchDragOverListeners.push(this._onDragOver);
        options.store && this.sort(options.store.get(this));
    }
    Sortable.prototype = {
        constructor: Sortable,
        _onTapStart: function (evt) {
            var _this = this, el = this.el, options = this.options, type = evt.type, touch = evt.touches && evt.touches[0], target = (touch || evt).target, originalTarget = target, filter = options.filter;
            if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
                return;
            }
            target = _closest(target, options.draggable, el);
            if (!target) {
                return;
            }
            oldIndex = _index(target);
            if (typeof filter === 'function') {
                if (filter.call(this, evt, target, this)) {
                    _dispatchEvent(_this, originalTarget, 'filter', target, el, oldIndex);
                    evt.preventDefault();
                    return;
                }
            } else if (filter) {
                filter = filter.split(',').some(function (criteria) {
                    criteria = _closest(originalTarget, criteria.trim(), el);
                    if (criteria) {
                        _dispatchEvent(_this, criteria, 'filter', target, el, oldIndex);
                        return true;
                    }
                });
                if (filter) {
                    evt.preventDefault();
                    return;
                }
            }
            if (options.handle && !_closest(originalTarget, options.handle, el)) {
                return;
            }
            this._prepareDragStart(evt, touch, target);
        },
        _prepareDragStart: function (evt, touch, target) {
            var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
            if (target && !dragEl && target.parentNode === el) {
                tapEvt = evt;
                rootEl = el;
                dragEl = target;
                parentEl = dragEl.parentNode;
                nextEl = dragEl.nextSibling;
                activeGroup = options.group;
                dragStartFn = function () {
                    _this._disableDelayedDrag();
                    dragEl.draggable = true;
                    _toggleClass(dragEl, _this.options.chosenClass, true);
                    _this._triggerDragStart(touch);
                };
                options.ignore.split(',').forEach(function (criteria) {
                    _find(dragEl, criteria.trim(), _disableDraggable);
                });
                _on(ownerDocument, 'mouseup', _this._onDrop);
                _on(ownerDocument, 'touchend', _this._onDrop);
                _on(ownerDocument, 'touchcancel', _this._onDrop);
                if (options.delay) {
                    _on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
                    _on(ownerDocument, 'touchend', _this._disableDelayedDrag);
                    _on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
                    _on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
                    _on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
                    _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
                } else {
                    dragStartFn();
                }
            }
        },
        _disableDelayedDrag: function () {
            var ownerDocument = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer);
            _off(ownerDocument, 'mouseup', this._disableDelayedDrag);
            _off(ownerDocument, 'touchend', this._disableDelayedDrag);
            _off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
            _off(ownerDocument, 'mousemove', this._disableDelayedDrag);
            _off(ownerDocument, 'touchmove', this._disableDelayedDrag);
        },
        _triggerDragStart: function (touch) {
            if (touch) {
                tapEvt = {
                    target: dragEl,
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };
                this._onDragStart(tapEvt, 'touch');
            } else if (!this.nativeDraggable) {
                this._onDragStart(tapEvt, true);
            } else {
                _on(dragEl, 'dragend', this);
                _on(rootEl, 'dragstart', this._onDragStart);
            }
            try {
                if (document.selection) {
                    document.selection.empty();
                } else {
                    window.getSelection().removeAllRanges();
                }
            } catch (err) {
            }
        },
        _dragStarted: function () {
            if (rootEl && dragEl) {
                _toggleClass(dragEl, this.options.ghostClass, true);
                Sortable.active = this;
                _dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
            }
        },
        _emulateDragOver: function () {
            if (touchEvt) {
                if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
                    return;
                }
                this._lastX = touchEvt.clientX;
                this._lastY = touchEvt.clientY;
                if (!supportCssPointerEvents) {
                    _css(ghostEl, 'display', 'none');
                }
                var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY), parent = target, groupName = ' ' + this.options.group.name + '', i = touchDragOverListeners.length;
                if (parent) {
                    do {
                        if (parent[expando] && parent[expando].options.groups.indexOf(groupName) > -1) {
                            while (i--) {
                                touchDragOverListeners[i]({
                                    clientX: touchEvt.clientX,
                                    clientY: touchEvt.clientY,
                                    target: target,
                                    rootEl: parent
                                });
                            }
                            break;
                        }
                        target = parent;
                    } while (parent = parent.parentNode);
                }
                if (!supportCssPointerEvents) {
                    _css(ghostEl, 'display', '');
                }
            }
        },
        _onTouchMove: function (evt) {
            if (tapEvt) {
                if (!Sortable.active) {
                    this._dragStarted();
                }
                this._appendGhost();
                var touch = evt.touches ? evt.touches[0] : evt, dx = touch.clientX - tapEvt.clientX, dy = touch.clientY - tapEvt.clientY, translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';
                moved = true;
                touchEvt = touch;
                _css(ghostEl, 'webkitTransform', translate3d);
                _css(ghostEl, 'mozTransform', translate3d);
                _css(ghostEl, 'msTransform', translate3d);
                _css(ghostEl, 'transform', translate3d);
                evt.preventDefault();
            }
        },
        _appendGhost: function () {
            if (!ghostEl) {
                var rect = dragEl.getBoundingClientRect(), css = _css(dragEl), options = this.options, ghostRect;
                ghostEl = dragEl.cloneNode(true);
                _toggleClass(ghostEl, options.ghostClass, false);
                _toggleClass(ghostEl, options.fallbackClass, true);
                _css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
                _css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
                _css(ghostEl, 'width', rect.width);
                _css(ghostEl, 'height', rect.height);
                _css(ghostEl, 'opacity', '0.8');
                _css(ghostEl, 'position', 'fixed');
                _css(ghostEl, 'zIndex', '100000');
                _css(ghostEl, 'pointerEvents', 'none');
                options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);
                ghostRect = ghostEl.getBoundingClientRect();
                _css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
                _css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
            }
        },
        _onDragStart: function (evt, useFallback) {
            var dataTransfer = evt.dataTransfer, options = this.options;
            this._offUpEvents();
            if (activeGroup.pull == 'clone') {
                cloneEl = dragEl.cloneNode(true);
                _css(cloneEl, 'display', 'none');
                rootEl.insertBefore(cloneEl, dragEl);
            }
            if (useFallback) {
                if (useFallback === 'touch') {
                    _on(document, 'touchmove', this._onTouchMove);
                    _on(document, 'touchend', this._onDrop);
                    _on(document, 'touchcancel', this._onDrop);
                } else {
                    _on(document, 'mousemove', this._onTouchMove);
                    _on(document, 'mouseup', this._onDrop);
                }
                this._loopId = setInterval(this._emulateDragOver, 50);
            } else {
                if (dataTransfer) {
                    dataTransfer.effectAllowed = 'move';
                    options.setData && options.setData.call(this, dataTransfer, dragEl);
                }
                _on(document, 'drop', this);
                setTimeout(this._dragStarted, 0);
            }
        },
        _onDragOver: function (evt) {
            var el = this.el, target, dragRect, revert, options = this.options, group = options.group, groupPut = group.put, isOwner = activeGroup === group, canSort = options.sort;
            if (evt.preventDefault !== void 0) {
                evt.preventDefault();
                !options.dragoverBubble && evt.stopPropagation();
            }
            moved = true;
            if (activeGroup && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) : activeGroup.pull && groupPut && (activeGroup.name === group.name || groupPut.indexOf && ~groupPut.indexOf(activeGroup.name))) && (evt.rootEl === void 0 || evt.rootEl === this.el)) {
                _autoScroll(evt, options, this.el);
                if (_silent) {
                    return;
                }
                target = _closest(evt.target, options.draggable, el);
                dragRect = dragEl.getBoundingClientRect();
                if (revert) {
                    _cloneHide(true);
                    if (cloneEl || nextEl) {
                        rootEl.insertBefore(dragEl, cloneEl || nextEl);
                    } else if (!canSort) {
                        rootEl.appendChild(dragEl);
                    }
                    return;
                }
                if (el.children.length === 0 || el.children[0] === ghostEl || el === evt.target && (target = _ghostIsLast(el, evt))) {
                    if (target) {
                        if (target.animated) {
                            return;
                        }
                        targetRect = target.getBoundingClientRect();
                    }
                    _cloneHide(isOwner);
                    if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect) !== false) {
                        if (!dragEl.contains(el)) {
                            el.appendChild(dragEl);
                            parentEl = el;
                        }
                        this._animate(dragRect, dragEl);
                        target && this._animate(targetRect, target);
                    }
                } else if (target && !target.animated && target !== dragEl && target.parentNode[expando] !== void 0) {
                    if (lastEl !== target) {
                        lastEl = target;
                        lastCSS = _css(target);
                        lastParentCSS = _css(target.parentNode);
                    }
                    var targetRect = target.getBoundingClientRect(), width = targetRect.right - targetRect.left, height = targetRect.bottom - targetRect.top, floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display) || lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0, isWide = target.offsetWidth > dragEl.offsetWidth, isLong = target.offsetHeight > dragEl.offsetHeight, halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5, nextSibling = target.nextElementSibling, moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect), after;
                    if (moveVector !== false) {
                        _silent = true;
                        setTimeout(_unsilent, 30);
                        _cloneHide(isOwner);
                        if (moveVector === 1 || moveVector === -1) {
                            after = moveVector === 1;
                        } else if (floating) {
                            var elTop = dragEl.offsetTop, tgTop = target.offsetTop;
                            if (elTop === tgTop) {
                                after = target.previousElementSibling === dragEl && !isWide || halfway && isWide;
                            } else {
                                after = tgTop > elTop;
                            }
                        } else {
                            after = nextSibling !== dragEl && !isLong || halfway && isLong;
                        }
                        if (!dragEl.contains(el)) {
                            if (after && !nextSibling) {
                                el.appendChild(dragEl);
                            } else {
                                target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
                            }
                        }
                        parentEl = dragEl.parentNode;
                        this._animate(dragRect, dragEl);
                        this._animate(targetRect, target);
                    }
                }
            }
        },
        _animate: function (prevRect, target) {
            var ms = this.options.animation;
            if (ms) {
                var currentRect = target.getBoundingClientRect();
                _css(target, 'transition', 'none');
                _css(target, 'transform', 'translate3d(' + (prevRect.left - currentRect.left) + 'px,' + (prevRect.top - currentRect.top) + 'px,0)');
                target.offsetWidth;
                _css(target, 'transition', 'all ' + ms + 'ms');
                _css(target, 'transform', 'translate3d(0,0,0)');
                clearTimeout(target.animated);
                target.animated = setTimeout(function () {
                    _css(target, 'transition', '');
                    _css(target, 'transform', '');
                    target.animated = false;
                }, ms);
            }
        },
        _offUpEvents: function () {
            var ownerDocument = this.el.ownerDocument;
            _off(document, 'touchmove', this._onTouchMove);
            _off(ownerDocument, 'mouseup', this._onDrop);
            _off(ownerDocument, 'touchend', this._onDrop);
            _off(ownerDocument, 'touchcancel', this._onDrop);
        },
        _onDrop: function (evt) {
            var el = this.el, options = this.options;
            clearInterval(this._loopId);
            clearInterval(autoScroll.pid);
            clearTimeout(this._dragStartTimer);
            _off(document, 'mousemove', this._onTouchMove);
            if (this.nativeDraggable) {
                _off(document, 'drop', this);
                _off(el, 'dragstart', this._onDragStart);
            }
            this._offUpEvents();
            if (evt) {
                if (moved) {
                    evt.preventDefault();
                    !options.dropBubble && evt.stopPropagation();
                }
                ghostEl && ghostEl.parentNode.removeChild(ghostEl);
                if (dragEl) {
                    if (this.nativeDraggable) {
                        _off(dragEl, 'dragend', this);
                    }
                    _disableDraggable(dragEl);
                    _toggleClass(dragEl, this.options.ghostClass, false);
                    _toggleClass(dragEl, this.options.chosenClass, false);
                    if (rootEl !== parentEl) {
                        newIndex = _index(dragEl);
                        if (newIndex >= 0) {
                            _dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
                            _dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
                            _dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);
                            _dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);
                        }
                    } else {
                        cloneEl && cloneEl.parentNode.removeChild(cloneEl);
                        if (dragEl.nextSibling !== nextEl) {
                            newIndex = _index(dragEl);
                            if (newIndex >= 0) {
                                _dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
                                _dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
                            }
                        }
                    }
                    if (Sortable.active) {
                        if (newIndex === null || newIndex === -1) {
                            newIndex = oldIndex;
                        }
                        _dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);
                        this.save();
                    }
                }
                rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = scrollEl = scrollParentEl = tapEvt = touchEvt = moved = newIndex = lastEl = lastCSS = activeGroup = Sortable.active = null;
            }
        },
        handleEvent: function (evt) {
            var type = evt.type;
            if (type === 'dragover' || type === 'dragenter') {
                if (dragEl) {
                    this._onDragOver(evt);
                    _globalDragOver(evt);
                }
            } else if (type === 'drop' || type === 'dragend') {
                this._onDrop(evt);
            }
        },
        toArray: function () {
            var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
            for (; i < n; i++) {
                el = children[i];
                if (_closest(el, options.draggable, this.el)) {
                    order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
                }
            }
            return order;
        },
        sort: function (order) {
            var items = {}, rootEl = this.el;
            this.toArray().forEach(function (id, i) {
                var el = rootEl.children[i];
                if (_closest(el, this.options.draggable, rootEl)) {
                    items[id] = el;
                }
            }, this);
            order.forEach(function (id) {
                if (items[id]) {
                    rootEl.removeChild(items[id]);
                    rootEl.appendChild(items[id]);
                }
            });
        },
        save: function () {
            var store = this.options.store;
            store && store.set(this);
        },
        closest: function (el, selector) {
            return _closest(el, selector || this.options.draggable, this.el);
        },
        option: function (name, value) {
            var options = this.options;
            if (value === void 0) {
                return options[name];
            } else {
                options[name] = value;
                if (name === 'group') {
                    _prepareGroup(options);
                }
            }
        },
        destroy: function () {
            var el = this.el;
            el[expando] = null;
            _off(el, 'mousedown', this._onTapStart);
            _off(el, 'touchstart', this._onTapStart);
            if (this.nativeDraggable) {
                _off(el, 'dragover', this);
                _off(el, 'dragenter', this);
            }
            Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
                el.removeAttribute('draggable');
            });
            touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);
            this._onDrop();
            this.el = el = null;
        }
    };
    function _cloneHide(state) {
        if (cloneEl && cloneEl.state !== state) {
            _css(cloneEl, 'display', state ? 'none' : '');
            !state && cloneEl.state && rootEl.insertBefore(cloneEl, dragEl);
            cloneEl.state = state;
        }
    }
    function _closest(el, selector, ctx) {
        if (el) {
            ctx = ctx || document;
            selector = selector.split('.');
            var tag = selector.shift().toUpperCase(), re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');
            do {
                if (tag === '>*' && el.parentNode === ctx || (tag === '' || el.nodeName.toUpperCase() == tag) && (!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)) {
                    return el;
                }
            } while (el !== ctx && (el = el.parentNode));
        }
        return null;
    }
    function _globalDragOver(evt) {
        if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = 'move';
        }
        evt.preventDefault();
    }
    function _on(el, event, fn) {
        el.addEventListener(event, fn, false);
    }
    function _off(el, event, fn) {
        el.removeEventListener(event, fn, false);
    }
    function _toggleClass(el, name, state) {
        if (el) {
            if (el.classList) {
                el.classList[state ? 'add' : 'remove'](name);
            } else {
                var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ', ' ');
                el.className = (className + (state ? ' ' + name : '')).replace(RSPACE, ' ');
            }
        }
    }
    function _css(el, prop, val) {
        var style = el && el.style;
        if (style) {
            if (val === void 0) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    val = document.defaultView.getComputedStyle(el, '');
                } else if (el.currentStyle) {
                    val = el.currentStyle;
                }
                return prop === void 0 ? val : val[prop];
            } else {
                if (!(prop in style)) {
                    prop = '-webkit-' + prop;
                }
                style[prop] = val + (typeof val === 'string' ? '' : 'px');
            }
        }
    }
    function _find(ctx, tagName, iterator) {
        if (ctx) {
            var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
            if (iterator) {
                for (; i < n; i++) {
                    iterator(list[i], i);
                }
            }
            return list;
        }
        return [];
    }
    function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
        var evt = document.createEvent('Event'), options = (sortable || rootEl[expando]).options, onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
        evt.initEvent(name, true, true);
        evt.to = rootEl;
        evt.from = fromEl || rootEl;
        evt.item = targetEl || rootEl;
        evt.clone = cloneEl;
        evt.oldIndex = startIndex;
        evt.newIndex = newIndex;
        rootEl.dispatchEvent(evt);
        if (options[onName]) {
            options[onName].call(sortable, evt);
        }
    }
    function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect) {
        var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
        evt = document.createEvent('Event');
        evt.initEvent('move', true, true);
        evt.to = toEl;
        evt.from = fromEl;
        evt.dragged = dragEl;
        evt.draggedRect = dragRect;
        evt.related = targetEl || toEl;
        evt.relatedRect = targetRect || toEl.getBoundingClientRect();
        fromEl.dispatchEvent(evt);
        if (onMoveFn) {
            retVal = onMoveFn.call(sortable, evt);
        }
        return retVal;
    }
    function _disableDraggable(el) {
        el.draggable = false;
    }
    function _unsilent() {
        _silent = false;
    }
    function _ghostIsLast(el, evt) {
        var lastEl = el.lastElementChild, rect = lastEl.getBoundingClientRect();
        return (evt.clientY - (rect.top + rect.height) > 5 || evt.clientX - (rect.right + rect.width) > 5) && lastEl;
    }
    function _generateId(el) {
        var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
        while (i--) {
            sum += str.charCodeAt(i);
        }
        return sum.toString(36);
    }
    function _index(el) {
        var index = 0;
        if (!el || !el.parentNode) {
            return -1;
        }
        while (el && (el = el.previousElementSibling)) {
            if (el.nodeName.toUpperCase() !== 'TEMPLATE') {
                index++;
            }
        }
        return index;
    }
    function _throttle(callback, ms) {
        var args, _this;
        return function () {
            if (args === void 0) {
                args = arguments;
                _this = this;
                setTimeout(function () {
                    if (args.length === 1) {
                        callback.call(_this, args[0]);
                    } else {
                        callback.apply(_this, args);
                    }
                    args = void 0;
                }, ms);
            }
        };
    }
    function _extend(dst, src) {
        if (dst && src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    dst[key] = src[key];
                }
            }
        }
        return dst;
    }
    Sortable.utils = {
        on: _on,
        off: _off,
        css: _css,
        find: _find,
        is: function (el, selector) {
            return !!_closest(el, selector, el);
        },
        extend: _extend,
        throttle: _throttle,
        closest: _closest,
        toggleClass: _toggleClass,
        index: _index
    };
    Sortable.create = function (el, options) {
        return new Sortable(el, options);
    };
    Sortable.version = '1.3.0';
    return Sortable;
}));
CommonControlsLayerSwitcherDOM = function (Sortable) {
    var LayerSwitcherDOM = {
        _createDraggableElement: function (elementDraggable, context) {
            Sortable.create(elementDraggable, {
                handle: '.GPlayerName',
                draggable: '.draggable-layer',
                ghostClass: 'GPghostLayer',
                animation: 200,
                onEnd: function (e) {
                    context._onDragAndDropLayerClick(e);
                }
            });
        },
        _addUID: function (id) {
            var uid = this._uid ? id + '-' + this._uid : id;
            return uid;
        },
        _createMainContainerElement: function () {
            var container = document.createElement('div');
            container.id = this._addUID('GPlayerSwitcher');
            container.className = 'GPwidget';
            return container;
        },
        _createMainLayersShowElement: function () {
            var input = document.createElement('input');
            input.id = this._addUID('GPshowLayersList');
            input.type = 'checkbox';
            return input;
        },
        _createMainLayersElement: function () {
            var div = document.createElement('div');
            div.id = this._addUID('GPlayersList');
            div.className = 'GPpanel';
            return div;
        },
        _createMainPictoElement: function () {
            var self = this;
            var label = document.createElement('label');
            label.id = this._addUID('GPshowLayersListPicto');
            label.className = 'GPshowAdvancedToolPicto';
            label.htmlFor = this._addUID('GPshowLayersList');
            label.title = 'Afficher/masquer le gestionnaire de couches';
            var spanOpen = document.createElement('span');
            spanOpen.id = this._addUID('GPshowLayersListOpen');
            spanOpen.className = 'GPshowAdvancedToolOpen';
            spanOpen.addEventListener('click', function () {
                if (document.getElementById(self._addUID('GPshowLayersList')).checked) {
                    var layers = document.getElementsByClassName('GPlayerInfoOpened');
                    for (var i = 0; i < layers.length; i++) {
                        layers[i].className = 'GPlayerInfo';
                    }
                    document.getElementById(self._addUID('GPlayerInfoPanel')).className = 'GPlayerInfoPanelClosed';
                }
            });
            label.appendChild(spanOpen);
            var spanClose = document.createElement('span');
            spanClose.addEventListener('click', function () {
                if (document.getElementById(self._addUID('GPshowLayersList')).checked) {
                    var layers = document.getElementsByClassName('GPlayerInfoOpened');
                    for (var i = 0; i < layers.length; i++) {
                        layers[i].className = 'GPlayerInfo';
                    }
                    document.getElementById(self._addUID('GPlayerInfoPanel')).className = 'GPlayerInfoPanelClosed';
                }
            });
            spanClose.id = self._addUID('GPshowLayersListClose');
            label.appendChild(spanClose);
            return label;
        },
        _createMainInfoElement: function () {
            var div = document.createElement('div');
            div.id = this._addUID('GPlayerInfoPanel');
            div.className = 'GPpanel GPlayerInfoPanelClosed';
            return div;
        },
        _createContainerLayerElement: function (obj) {
            var container = document.createElement('div');
            container.id = this._addUID('GPlayerSwitcher_ID_' + obj.id);
            container.className = 'GPlayerSwitcher_layer draggable-layer';
            container.appendChild(this._createBasicToolElement(obj));
            var array = this._createAdvancedToolShowElement(obj);
            for (var i = 0; i < array.length; i++) {
                container.appendChild(array[i]);
            }
            container.appendChild(this._createAdvancedToolElement(obj));
            return container;
        },
        _createBasicToolElement: function (obj) {
            var div = document.createElement('div');
            div.id = this._addUID('GPbasicTools_ID_' + obj.id);
            div.className = 'GPlayerBasicTools';
            div.appendChild(this._createBasicToolNameElement(obj));
            var array = this._createBasicToolVisibilityElement(obj);
            for (var i = 0; i < array.length; i++) {
                div.appendChild(array[i]);
            }
            return div;
        },
        _createBasicToolNameElement: function (obj) {
            var span = document.createElement('span');
            span.id = this._addUID('GPname_ID_' + obj.id);
            span.className = 'GPlayerName';
            span.title = obj.description || obj.title;
            span.innerHTML = obj.title;
            return span;
        },
        _createBasicToolVisibilityElement: function (obj) {
            var list = [];
            var checked = typeof obj.visibility !== 'undefined' ? obj.visibility : true;
            var id = this._addUID('GPvisibility_ID_' + obj.id);
            var input = document.createElement('input');
            input.id = id;
            input.type = 'checkbox';
            input.checked = checked;
            var label = document.createElement('label');
            label.htmlFor = id;
            label.id = this._addUID('GPvisibilityPicto_ID_' + obj.id);
            label.className = 'GPlayerVisibility';
            label.title = 'Afficher/masquer la couche';
            var context = this;
            if (input.addEventListener) {
                input.addEventListener('click', function (e) {
                    context._onVisibilityLayerClick.call(context, e);
                });
            } else if (input.attachEvent) {
                input.attachEvent('onclick', function (e) {
                    context._onVisibilityLayerClick.call(context, e);
                });
            }
            list.push(input);
            list.push(label);
            return list;
        },
        _createAdvancedToolShowElement: function (obj) {
            var list = [];
            var label = document.createElement('label');
            label.id = this._addUID('GPshowAdvancedToolsPicto_ID_' + obj.id);
            label.htmlFor = this._addUID('GPshowAdvancedTools_ID_' + obj.id);
            label.title = 'Plus d\'outils';
            label.className = 'GPshowMoreOptions GPshowLayerAdvancedTools';
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.id = this._addUID('GPshowAdvancedTools_ID_' + obj.id);
            list.push(input);
            list.push(label);
            return list;
        },
        _createAdvancedToolElement: function (obj) {
            var container = document.createElement('div');
            container.id = this._addUID('GPadvancedTools_ID_' + obj.id);
            container.className = 'GPlayerAdvancedTools';
            container.appendChild(this._createAdvancedToolDeleteElement(obj));
            if (obj.title && obj.description) {
                container.appendChild(this._createAdvancedToolInformationElement(obj));
            }
            if (obj.type !== 'feature') {
                var array = this._createAdvancedToolOpacityElement(obj);
                for (var i = 0; i < array.length; i++) {
                    container.appendChild(array[i]);
                }
            }
            return container;
        },
        _createAdvancedToolDeleteElement: function (obj) {
            var div = document.createElement('div');
            div.id = this._addUID('GPremove_ID_' + obj.id);
            div.className = 'GPlayerRemove';
            div.title = 'Supprimer la couche';
            div.layerId = obj.id;
            var context = this;
            if (div.addEventListener) {
                div.addEventListener('click', function (e) {
                    context._onDropLayerClick.call(context, e);
                });
            } else if (div.attachEvent) {
                div.attachEvent('onclick', function (e) {
                    context._onDropLayerClick.call(context, e);
                });
            }
            return div;
        },
        _createAdvancedToolInformationElement: function (obj) {
            var div = document.createElement('div');
            div.id = this._addUID('GPinfo_ID_' + obj.id);
            div.className = 'GPlayerInfo';
            div.title = 'Informations/légende';
            div.layerId = obj.id;
            var context = this;
            if (div.addEventListener) {
                div.addEventListener('click', function (e) {
                    context._onOpenLayerInfoClick.call(context, e);
                });
            } else if (div.attachEvent) {
                div.attachEvent('onclick', function (e) {
                    context._onOpenLayerInfoClick.call(context, e);
                });
            }
            return div;
        },
        _createAdvancedToolOpacityElement: function (obj) {
            var list = [];
            var divO = document.createElement('div');
            divO.id = this._addUID('GPopacity_ID_' + obj.id);
            divO.className = 'GPlayerOpacity';
            divO.title = 'Opacité';
            var opacity = typeof obj.opacity !== 'undefined' ? obj.opacity : 1;
            opacity = Math.round(opacity * 100);
            var input = document.createElement('input');
            input.id = this._addUID('GPopacityValueDiv_ID_' + obj.id);
            input.type = 'range';
            input.value = opacity;
            var context = this;
            if (input.addEventListener) {
                input.addEventListener('change', function (e) {
                    context._onChangeLayerOpacity.call(context, e);
                });
            } else if (input.attachEvent) {
                input.attachEvent('onchange', function (e) {
                    context._onChangeLayerOpacity.call(context, e);
                });
            }
            if (input.addEventListener) {
                input.addEventListener('input', function (e) {
                    context._onChangeLayerOpacity.call(context, e);
                });
            } else if (input.attachEvent) {
                input.attachEvent('oninput', function (e) {
                    context._onChangeLayerOpacity.call(context, e);
                });
            }
            divO.appendChild(input);
            var divC = document.createElement('div');
            divC.id = this._addUID('GPopacityValueDiv_ID_' + obj.id);
            divC.className = 'GPlayerOpacityValue';
            var span = document.createElement('span');
            span.id = this._addUID('GPopacityValue_ID_' + obj.id);
            span.innerHTML = opacity + '%';
            divC.appendChild(span);
            list.push(divO);
            list.push(divC);
            return list;
        },
        _createContainerLayerInfoElement: function (obj) {
            var container = document.createElement('div');
            container.id = this._addUID('GPlayerInfoContent');
            var title = document.createElement('div');
            title.id = this._addUID('GPlayerInfoTitle');
            title.innerHTML = obj.title;
            container.appendChild(title);
            if (obj.quicklookUrl) {
                var quick = document.createElement('div');
                quick.id = this._addUID('GPlayerInfoQuicklook');
                quick.title = 'Afficher un aperçu de la couche';
                var refquick = document.createElement('a');
                refquick.href = obj.quicklookUrl;
                refquick.appendChild(quick);
                container.appendChild(refquick);
            }
            var close = document.createElement('div');
            close.id = this._addUID('GPlayerInfoClose');
            close.title = 'Fermer la fenêtre';
            var self = this;
            var onCloseClick = function () {
                document.getElementById(self._addUID('GPlayerInfoPanel')).className = 'GPlayerInfoPanelClosed';
                var layers = document.getElementsByClassName('GPlayerInfoOpened');
                for (var i = 0; i < layers.length; i++) {
                    layers[i].className = 'GPlayerInfo';
                }
            };
            if (close.addEventListener) {
                close.addEventListener('click', onCloseClick);
            } else if (close.attachEvent) {
                close.attachEvent('onclick', onCloseClick);
            }
            container.appendChild(close);
            var desc = document.createElement('div');
            desc.id = this._addUID('GPlayerInfoDescription');
            desc.innerHTML = obj.description;
            container.appendChild(desc);
            if (obj.metadata) {
                var mtd = document.createElement('div');
                mtd.id = this._addUID('GPlayerInfoMetadata');
                var mtdtitle = document.createElement('div');
                mtdtitle.className = 'GPlayerInfoSubtitle';
                mtdtitle.innerHTML = 'Métadonnées';
                mtd.appendChild(mtdtitle);
                for (var i = 0; i < obj.metadata.length; i++) {
                    var urlmtd = obj.metadata[i].url;
                    var mtdlink = document.createElement('div');
                    mtdlink.className = 'GPlayerInfoLink';
                    var refmtd = document.createElement('a');
                    refmtd.href = urlmtd;
                    refmtd.innerHTML = urlmtd;
                    mtdlink.appendChild(refmtd);
                    mtd.appendChild(mtdlink);
                }
                if (obj.metadata.length !== 0) {
                    container.appendChild(mtd);
                }
            }
            if (obj.legends) {
                var lgd = document.createElement('div');
                lgd.id = this._addUID('GPlayerInfoLegend');
                var lgdtitle = document.createElement('div');
                lgdtitle.className = 'GPlayerInfoSubtitle';
                lgdtitle.innerHTML = 'Légende';
                lgd.appendChild(lgdtitle);
                var legends = {};
                var maxScale = obj.maxScaleDenominator || 560000000;
                for (var k = 0; k < obj.legends.length; k++) {
                    var minScale = obj.legends[k].minScaleDenominator;
                    if (minScale) {
                        var s = minScale.toString();
                        minScale = Math.round(parseInt(s.substring(0, 3), 10) / 10) * Math.pow(10, s.length - 2);
                    } else {
                        minScale = 270;
                    }
                    legends[minScale] = obj.legends[k];
                }
                for (var scale in legends) {
                    if (legends.hasOwnProperty(scale)) {
                        var urllgd = legends[scale].url;
                        if (typeof urllgd === 'string' && urllgd.toLowerCase().indexOf('nolegend.jpg') == -1) {
                            var lgdlink = document.createElement('div');
                            lgdlink.className = 'GPlayerInfoLink';
                            maxScale = legends[scale].maxScaleDenominator || maxScale;
                            var reflgd = document.createElement('a');
                            reflgd.href = urllgd;
                            reflgd.innerHTML = 'Du 1/' + scale + ' au 1/' + maxScale;
                            lgdlink.appendChild(reflgd);
                            lgd.appendChild(lgdlink);
                        } else {
                            delete legends[scale];
                        }
                    }
                }
                if (Object.keys(legends).length !== 0) {
                    container.appendChild(lgd);
                }
            }
            return container;
        }
    };
    return LayerSwitcherDOM;
}(sortable);
ItownsControlsLayerSwitcher = function (GlobeViewExtended, Utils, LayerUtils, SelectorID, LayerSwitcherDOM, Widget) {
    function LayerSwitcher(lsOptions) {
        lsOptions = lsOptions || {};
        var options = lsOptions.options || {};
        var layers = lsOptions.layers || [];
        if (!(this instanceof LayerSwitcher)) {
            throw new TypeError('ERROR CLASS_CONSTRUCTOR');
        }
        if (layers && !Array.isArray(layers)) {
            throw new Error('ERROR WRONG_TYPE : layers should be an array');
        }
        if (options && typeof options !== 'object') {
            throw new Error('ERROR WRONG_TYPE : options should be an object');
        }
        this._initialize(options, layers);
        var container = this._initContainer(options);
        this._addedLayerConf = {};
        var targetDiv = document.getElementById(options.target) || null;
        Widget.call(this, {
            name: 'LayerSwitcher',
            element: container,
            target: targetDiv
        });
    }
    LayerSwitcher.prototype = Object.create(Widget.prototype, {});
    Utils.assign(LayerSwitcher.prototype, LayerSwitcherDOM);
    LayerSwitcher.prototype.constructor = LayerSwitcher;
    LayerSwitcher.prototype.setGlobe = function (globe) {
        var layers;
        if (globe) {
            var self = this;
            for (var i = 0; i < this._initLayers.length; i++) {
                var layer = null;
                if (this._initLayers[i].id) {
                    layer = globe.getLayerById(this._initLayers[i].id);
                }
                if (layer && this._initLayers[i].displayed) {
                    var conf = this._initLayers[i].config || {};
                    var layerOptions = {
                        title: conf.title || layer.title || this._initLayers[i].id,
                        description: conf.description || null,
                        legends: conf.legends || [],
                        metadata: conf.metadata || [],
                        quicklookUrl: conf.quicklookUrl || null
                    };
                    if (typeof conf.ipr !== 'undefined') {
                        layerOptions.ipr = conf.ipr;
                    }
                    if (typeof conf.opacity !== 'undefined') {
                        layerOptions.opacity = conf.opacity;
                    }
                    if (typeof conf.visibility !== 'undefined') {
                        layerOptions.visibility = conf.visibility;
                    }
                    this._layers[layer.id] = layerOptions;
                }
            }
            this._addGlobeLayers(globe);
            this._callbacks.onOpacityLayerCallBack = function (e) {
                self._updateLayerOpacity(e.target.id, e.new.opacity);
            };
            this._callbacks.onVisibilityLayerCallBack = function (e) {
                self._updateLayerVisibility(e.target.id, e.new.visible);
            };
            this._callbacks.onChangedViewCallBack = function (e) {
                self._inRangeUpdate(e.colorLayersId);
            };
            globe.listen(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onChangedViewCallBack);
            globe.preRenderEventFetchColorLayersDisplayed();
            this._callbacks.onAddedLayerCallBack = function (e) {
                var id = e.layerId;
                if (self) {
                    if (!self._layerDisplayedInLayerSwitcher(id)) {
                        return;
                    }
                    var layer = self.getGlobe().getLayerById(id);
                    if (layer.type === 'elevation') {
                        return;
                    }
                    var layerConf = self._getLayerConf(id) || self._addedLayerConf[id];
                    if (layerConf) {
                        self.addLayer(layer, layerConf);
                    } else {
                        self.addLayer(layer);
                    }
                }
            };
            globe.listen(GlobeViewExtended.EVENTS.LAYER_ADDED, this._callbacks.onAddedLayerCallBack);
            this._callbacks.onRemovedLayerCallBack = function (e) {
                var id = e.layerId;
                if (self) {
                    self.removeLayer(id);
                }
            };
            globe.listen(GlobeViewExtended.EVENTS.LAYER_REMOVED, this._callbacks.onRemovedLayerCallBack);
            this._callbacks.onIndexLayerCallBack = function (e) {
                var arraysEquals = function (a1, a2) {
                    if (a1.length !== a2.length) {
                        return false;
                    }
                    for (var i = 0; i < a1.length; ++i) {
                        if (a1[i] !== a2[i]) {
                            return false;
                        }
                    }
                    return true;
                };
                if (!arraysEquals(e.new.sequence, e.previous.sequence)) {
                    self._updateLayerListContainer();
                }
            };
            globe.listen(GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED, this._callbacks.onIndexLayerCallBack);
            layers = globe.getColorLayers();
            for (var ii = 0; ii < layers.length; ++ii) {
                globe.addLayerListener(layers[ii], GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, this._callbacks.onOpacityLayerCallBack);
                globe.addLayerListener(layers[ii], GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, this._callbacks.onVisibilityLayerCallBack);
                self._updateLayerVisibility(layers[ii].id, layers[ii].visible);
                self._updateLayerOpacity(layers[ii].id, layers[ii].opacity);
            }
        } else {
            this._globe.forget(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onChangedViewCallBack);
            this._globe.forget(GlobeViewExtended.EVENTS.LAYER_ADDED, this._callbacks.onAddedLayerCallBack);
            this._globe.forget(GlobeViewExtended.EVENTS.LAYER_REMOVED, this._callbacks.onRemovedLayerCallBack);
            this._globe.forget(GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED, this._callbacks.onIndexLayerCallBack);
            layers = this._globe.getColorLayers();
            for (var j = 0; j < layers.length; ++j) {
                this._globe.removeLayerListener(layers[j], GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, this._callbacks.onOpacityLayerCallBack);
                this._globe.removeLayerListener(layers[j], GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, this._callbacks.onVisibilityLayerCallBack);
            }
            while (this._element.hasChildNodes()) {
                this._element.removeChild(this._element.lastChild);
            }
            this._element.parentNode.removeChild(this._element);
        }
        Widget.prototype.setGlobe.call(this, globe);
    };
    LayerSwitcher.prototype.addLayer = function (layer, config) {
        config = config || {};
        var globe = this.getGlobe();
        if (!layer) {
            console.log('[ERROR] LayerSwitcher:addLayer - missing layer parameter');
            return;
        }
        var id = layer.id;
        if (id === 'undefined') {
            console.log('[ERROR] LayerSwitcher:addLayer - configuration cannot be set for ' + layer + ' layer (layer id not found)');
            return;
        }
        globe.addLayerListener(layer, GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, this._callbacks.onOpacityLayerCallBack);
        globe.addLayerListener(layer, GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, this._callbacks.onVisibilityLayerCallBack);
        var LayerInGlobe = globe.getLayerById(id);
        if (!LayerInGlobe) {
            console.log('[ERROR] LayerSwitcher:addLayer - configuration cannot be set for ', layer, ' layer (layer is not in globe layers )');
            return;
        }
        if (!this._layers[id]) {
            var layerInfos = this._getLayerInfo(layer) || {};
            var layerOptions = {
                title: config.title || layerInfos._title || id,
                description: config.description || layerInfos._description || null,
                legends: config.legends || layerInfos._legends || [],
                metadata: config.metadata || layerInfos._metadata || [],
                quicklookUrl: config.quicklookUrl || layerInfos._quicklookUrl || null
            };
            if (typeof config.ipr !== 'undefined') {
                layerOptions.ipr = config.ipr;
                layer.attribution = layerOptions.ipr;
            }
            if (typeof config.opacity !== 'undefined') {
                layerOptions.opacity = config.opacity;
                layer.opacity = layerOptions.opacity;
            }
            if (typeof config.visibility !== 'undefined') {
                layerOptions.visibility = config.visibility;
                layer.visible = layerOptions.visibility;
            }
            this._layers[id] = layerOptions;
            this._layers[id].div = this._createLayerDiv(id);
            this._updateLayerListContainer();
        } else if (this._layers[id] && config) {
            for (var prop in config) {
                if (config.hasOwnProperty(prop)) {
                    this._layers[id][prop] = config[prop];
                }
            }
            if (typeof config.ipr !== 'undefined') {
                layer.attribution = config.ipr;
            }
            if (typeof config.opacity !== 'undefined') {
                layer.opacity = config.opacity;
            }
            if (typeof config.visibility !== 'undefined') {
                layer.visible = config.visibility;
            }
            if (config.title) {
                var nameDiv = document.getElementById(this._addUID('GPname_ID_' + id));
                if (nameDiv) {
                    nameDiv.innerHTML = config.title;
                }
            }
            var infodiv = document.getElementById(this._addUID('GPinfo_ID_' + id));
            if (!document.getElementById(this._addUID('GPinfo_ID_' + id)) && config.description && (config.legends || config.metadata || config.quicklookUrl)) {
                var advancedTools = document.getElementById(this._addUID('GPadvancedTools_ID_' + id));
                if (advancedTools) {
                    advancedTools.appendChild(this._createAdvancedToolInformationElement({ id: id }));
                }
            }
            if (infodiv && infodiv.className === 'GPlayerInfoOpened') {
                document.getElementById(this._addUID('GPlayerInfoPanel')).className = 'GPlayerInfoPanelClosed';
                infodiv.className === 'GPlayerInfo';
            }
        }
    };
    LayerSwitcher.prototype.removeLayer = function (layerId) {
        var layerList = document.getElementById(this._addUID('GPlayersList'));
        var infodiv = document.getElementById(this._addUID('GPinfo_ID_' + layerId));
        if (infodiv && infodiv.className === 'GPlayerInfoOpened') {
            document.getElementById(this._addUID('GPlayerInfoPanel')).className = 'GPlayerInfoPanelClosed';
            infodiv.className === 'GPlayerInfo';
        }
        var layerDiv = document.getElementById(this._addUID('GPlayerSwitcher_ID_' + layerId));
        layerList.removeChild(layerDiv);
        delete this._layers[layerId];
    };
    LayerSwitcher.prototype.setCollapsed = function (collapsed) {
        if (collapsed === undefined) {
            console.log('[ERROR] LayerSwitcher:setCollapsed - missing collapsed parameter');
            return;
        }
        var isCollapsed = this.getCollapsed();
        if (collapsed && isCollapsed || !collapsed && !isCollapsed) {
            return;
        }
        if (!isCollapsed) {
            var layers = document.getElementsByClassName('GPlayerInfoOpened');
            for (var i = 0; i < layers.length; i++) {
                layers[i].className = 'GPlayerInfo';
            }
            document.getElementById(this._addUID('GPlayerInfoPanel')).className = 'GPlayerInfoPanelClosed';
        }
        document.getElementById(this._addUID('GPshowLayersList')).checked = !collapsed;
    };
    LayerSwitcher.prototype.getCollapsed = function () {
        return !document.getElementById(this._addUID('GPshowLayersList')).checked;
    };
    LayerSwitcher.prototype._initialize = function (options, layers) {
        this._uid = SelectorID.generate();
        this._layers = {};
        this._layerListContainer = null;
        this._callbacks = {};
        this._options = options;
        this._initLayers = layers;
    };
    LayerSwitcher.prototype._getLayerConf = function (layerId) {
        for (var i = 0; i < this._initLayers.length; ++i) {
            if (this._initLayers[i].id === layerId) {
                return this._initLayers[i].config;
            }
        }
        return null;
    };
    LayerSwitcher.prototype._layerDisplayedInLayerSwitcher = function (layerId) {
        for (var i = 0; i < this._initLayers.length; ++i) {
            if (this._initLayers[i].id === layerId) {
                return typeof this._initLayers[i].displayed === 'undefined' || this._initLayers[i].displayed;
            }
        }
        return true;
    };
    LayerSwitcher.prototype._initContainer = function (options) {
        var container = this._createMainContainerElement();
        var input = this._createMainLayersShowElement();
        container.appendChild(input);
        if (!options.collapsed) {
            input.checked = 'checked';
        }
        var divL = this._layerListContainer = this._createMainLayersElement();
        container.appendChild(divL);
        this._createDraggableElement(divL, this);
        var picto = this._createMainPictoElement();
        container.appendChild(picto);
        var divI = this._createMainInfoElement();
        container.appendChild(divI);
        return container;
    };
    LayerSwitcher.prototype._addGlobeLayers = function (globe) {
        var elementLayersList;
        var childNodes = this.getElement().childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].id === this._addUID('GPlayersList')) {
                elementLayersList = childNodes[i];
                break;
            }
        }
        var layers = globe.getColorLayers();
        var orderedLayers = layers.sort(function (a, b) {
            return b.sequence - a.sequence;
        });
        orderedLayers.forEach(function (layer) {
            var id;
            id = layer.id;
            if (!this._layerDisplayedInLayerSwitcher(id)) {
                return;
            }
            var layerConf = this._getLayerConf(id) || this._addedLayerConf[id] || {};
            var layerInfos = this._getLayerInfo(layer) || {};
            if (!this._layers[id]) {
                var layerOptions = {
                    title: layerConf.title || layerInfos._title || id,
                    description: layerConf.description || layerInfos._description || null,
                    legends: layerConf.legends || layerInfos._legends || [],
                    metadata: layerConf.metadata || layerInfos._metadata || [],
                    quicklookUrl: layerConf.quicklookUrl || layerInfos._quicklookUrl || null
                };
                this._layers[id] = layerOptions;
            } else {
                var lsLayerConf = this._layers[id];
                if (typeof lsLayerConf.ipr !== 'undefined') {
                    layer.options.attribution = lsLayerConf.ipr;
                }
                if (typeof lsLayerConf.opacity !== 'undefined') {
                    layer.opacity = lsLayerConf.opacity;
                }
                if (typeof lsLayerConf.visibility !== 'undefined') {
                    layer.visible = lsLayerConf.visibility;
                }
            }
            var layerDiv = this._createLayerDiv(id);
            this._layers[id].div = layerDiv;
            elementLayersList.appendChild(layerDiv);
        }, this);
    };
    LayerSwitcher.prototype._createLayerDiv = function (layerId) {
        var layerOptions = this._layers[layerId];
        var isLegends = layerOptions.legends && layerOptions.legends.length !== 0;
        var isMetadata = layerOptions.metadata && layerOptions.metadata.length !== 0;
        var isQuicklookUrl = layerOptions.quicklookUrl;
        if (isLegends || isMetadata || isQuicklookUrl) {
            layerOptions.displayInformationElement = true;
        }
        layerOptions.id = layerId;
        var layerDiv = this._createContainerLayerElement(layerOptions);
        if (!layerOptions.inRange) {
            layerDiv.classList.add('outOfRange');
        }
        return layerDiv;
    };
    LayerSwitcher.prototype._onChangeLayerOpacity = function (e) {
        var globe = this.getGlobe();
        var layerID = this._resolveLayerId(e.target.id);
        var opacityValue = e.target.value;
        var opacityId = document.getElementById(this._addUID('GPopacityValue_ID_' + layerID));
        opacityId.innerHTML = opacityValue + '%';
        globe.setLayerOpacity(layerID, opacityValue / 100);
    };
    LayerSwitcher.prototype._updateLayerOpacity = function (layerId, opacity) {
        if (opacity > 1) {
            opacity = 1;
        }
        if (opacity < 0) {
            opacity = 0;
        }
        var layerOpacityInput = document.getElementById(this._addUID('GPopacityValueDiv_ID_' + layerId));
        if (layerOpacityInput) {
            layerOpacityInput.value = Math.round(opacity * 100);
        }
        var layerOpacitySpan = document.getElementById(this._addUID('GPopacityValue_ID_' + layerId));
        if (layerOpacitySpan) {
            layerOpacitySpan.innerHTML = Math.round(opacity * 100) + '%';
        }
    };
    LayerSwitcher.prototype._onVisibilityLayerClick = function (e) {
        var globe = this.getGlobe();
        var layerID = this._resolveLayerId(e.target.id);
        globe.setLayerVisibility(layerID, e.target.checked);
    };
    LayerSwitcher.prototype._updateLayerVisibility = function (layerId, visibility) {
        var layerVisibilityInput = document.getElementById(this._addUID('GPvisibility_ID_' + layerId));
        if (layerVisibilityInput) {
            layerVisibilityInput.checked = visibility;
        }
    };
    LayerSwitcher.prototype._onOpenLayerInfoClick = function (e) {
        var layerID = this._resolveLayerId(e.target.id);
        var layerOptions = this._layers[layerID];
        var panel;
        var info;
        var divId = document.getElementById(e.target.id);
        if (divId.className === 'GPlayerInfoOpened') {
            if (divId.classList !== undefined) {
                divId.classList.remove('GPlayerInfoOpened');
                divId.classList.add('GPlayerInfo');
            }
            panel = document.getElementById(this._addUID('GPlayerInfoPanel'));
            if (panel.classList !== undefined) {
                panel.classList.remove('GPpanel');
                panel.classList.remove('GPlayerInfoPanelOpened');
                panel.classList.add('GPlayerInfoPanelClosed');
            }
            info = document.getElementById(this._addUID('GPlayerInfoContent'));
            panel.removeChild(info);
            return;
        }
        var layers = document.getElementsByClassName('GPlayerInfoOpened');
        for (var i = 0; i < layers.length; i++) {
            layers[i].className = 'GPlayerInfo';
        }
        if (divId.classList !== undefined) {
            divId.classList.remove('GPlayerInfo');
            divId.classList.add('GPlayerInfoOpened');
        }
        panel = document.getElementById(this._addUID('GPlayerInfoPanel'));
        if (panel.classList !== undefined) {
            panel.classList.add('GPpanel');
            panel.classList.remove('GPlayerInfoPanelClosed');
            panel.classList.add('GPlayerInfoPanelOpened');
        }
        info = document.getElementById(this._addUID('GPlayerInfoContent'));
        if (info) {
            panel.removeChild(info);
        }
        var obj = {
            title: layerOptions.title,
            description: layerOptions.description,
            quicklookUrl: layerOptions.quicklookUrl,
            metadata: layerOptions.metadata,
            legends: layerOptions.legends
        };
        var infoLayer = this._createContainerLayerInfoElement(obj);
        panel.appendChild(infoLayer);
    };
    LayerSwitcher.prototype._onDropLayerClick = function (e) {
        var globe = this.getGlobe();
        var layerID = this._resolveLayerId(e.target.id);
        globe.removeLayer(layerID);
        this._updateLayerListContainer();
    };
    LayerSwitcher.prototype._onDragAndDropLayerClick = function (e) {
        var globe = this.getGlobe();
        if (e.newIndex - e.oldIndex === 0) {
            return;
        }
        var targetIndex = null;
        if (!e.newIndex || e.newIndex === 0) {
            targetIndex = globe.getColorLayers().length - 1;
        } else {
            var layerTargetID = this._resolveLayerId(e.from.childNodes[e.newIndex + (e.newIndex - e.oldIndex < 0 ? 1 : -1)].id);
            targetIndex = globe.getLayerById(layerTargetID).sequence;
        }
        var layerID = this._resolveLayerId(e.item.id);
        globe.moveLayerToIndex(layerID, targetIndex);
    };
    LayerSwitcher.prototype._inRangeUpdate = function (layersDisplayed) {
        for (var layerKey in this._layers) {
            var layer = this._layers[layerKey];
            if (!layer) {
                continue;
            }
            var layerDiv;
            var bInRange = layersDisplayed.indexOf(layer.id) >= 0;
            if (bInRange && !layer.inRange) {
                layer.inRange = true;
                layerDiv = document.getElementById(this._addUID('GPlayerSwitcher_ID_' + layer.id));
                layerDiv.classList.remove('outOfRange');
            } else if (!bInRange && layer.inRange) {
                layer.inRange = false;
                layerDiv = document.getElementById(this._addUID('GPlayerSwitcher_ID_' + layer.id));
                layerDiv.classList.add('outOfRange');
            }
        }
    };
    LayerSwitcher.prototype._updateLayerListContainer = function () {
        if (this._layerListContainer) {
            var globe = this.getGlobe();
            while (this._layerListContainer.firstChild) {
                this._layerListContainer.removeChild(this._layerListContainer.firstChild);
            }
            var layers = globe.getColorLayers();
            var orderedLayers = layers.sort(function (a, b) {
                return b.sequence - a.sequence;
            });
            for (var j = 0; j < orderedLayers.length; j++) {
                if (!this._layers[orderedLayers[j].id]) {
                    continue;
                }
                var layerDiv = this._layers[orderedLayers[j].id].div;
                this._layerListContainer.appendChild(layerDiv);
            }
        } else {
            console.log('[Itowns.control.LayerSwitcher] _updateLayerListContainer : layer list container not found to update layers order ?!');
        }
    };
    LayerSwitcher.prototype._getLayerInfo = function (layer) {
        var layerInfo = {};
        if (layer) {
            layerInfo._title = layer.title || null;
            layerInfo._description = layer.description || null;
            layerInfo._quicklookUrl = layer.quicklookUrl || null;
            layerInfo._metadata = layer.metadata || null;
            layerInfo._legends = layer.legends || null;
        }
        return layerInfo;
    };
    LayerSwitcher.prototype._resolveLayerId = function (divId) {
        var divName = SelectorID.name(divId);
        return divName.substring(divName.indexOf('_ID_') + 4);
    };
    return LayerSwitcher;
}(ItownsGlobeViewExtended, CommonUtils, CommonUtilsLayerUtils, CommonUtilsSelectorID, CommonControlsLayerSwitcherDOM, ItownsControlsWidget);
CommonControlsAttributionDOM = function () {
    var AttributionDOM = {
        _addUID: function (id) {
            var uid = this._uid ? id + '-' + this._uid : id;
            return uid;
        },
        _createMainContainerElement: function () {
            var container = document.createElement('div');
            container.id = this._addUID('GPAttribution');
            container.className = 'GPwidget';
            return container;
        },
        _createMainAttributionsShowElement: function () {
            var input = document.createElement('input');
            input.id = this._addUID('GPshowAttributionsList');
            input.type = 'checkbox';
            return input;
        },
        _createAttributionsList: function () {
            var ul = document.createElement('ul');
            ul.id = this._addUID('GPAttributionsList');
            return ul;
        },
        _createMainAttributionsListContainer: function () {
            var div = document.createElement('div');
            div.id = this._addUID('GPAttributionsListContainer');
            return div;
        },
        _createMainPictoElement: function (collapsed) {
            var self = this;
            var label = document.createElement('label');
            label.id = this._addUID('GPshowAttributionsListPicto');
            label.className = 'GPshowAdvancedToolPicto';
            label.htmlFor = this._addUID('GPshowAttributionsList');
            label.title = 'Afficher/masquer les attributions';
            var spanOpen = document.createElement('span');
            spanOpen.id = this._addUID('GPshowAttributionsListOpenClose');
            spanOpen.className = 'GPshowAdvancedToolOpen';
            spanOpen.innerHTML = collapsed ? 'i' : '\xBB';
            spanOpen.addEventListener('click', function () {
                spanOpen.innerHTML = document.getElementById(self._addUID('GPshowAttributionsList')).checked ? 'i' : '\xBB';
            });
            label.appendChild(spanOpen);
            return label;
        }
    };
    return AttributionDOM;
}();
ItownsControlsAttributions = function (GlobeViewExtended, Utils, SelectorID, LayerUtils, AttributionDOM, Widget) {
    function Attributions(aOptions) {
        aOptions = aOptions || {};
        var options = aOptions.options || {};
        if (!(this instanceof Attributions)) {
            throw new TypeError('ERROR CLASS_CONSTRUCTOR');
        }
        if (options && typeof options !== 'object') {
            throw new Error('ERROR WRONG_TYPE : options should be an object');
        }
        this._initialize(options);
        var container = this._initContainer(options);
        var targetDiv = document.getElementById(options.target) || null;
        Widget.call(this, {
            name: 'Attributions',
            element: container,
            target: targetDiv
        });
    }
    Attributions.prototype = Object.create(Widget.prototype, {});
    Utils.assign(Attributions.prototype, AttributionDOM);
    Attributions.prototype.constructor = Attributions;
    Attributions.prototype.setGlobe = function (globe) {
        if (globe) {
            var self = this;
            this._callbacks.onPreRenderCallBack = function (e) {
                var allLayers = e.colorLayersId.concat(e.elevationLayersId);
                self._inRangeUpdate(allLayers, e.extent);
            };
            globe.listen(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onPreRenderCallBack);
            globe.preRenderEventFetchViewExtent();
            globe.preRenderEventFetchLayersDisplayed();
        } else {
            this._globe.forget(GlobeViewExtended.EVENTS.PRE_RENDER, this._callbacks.onPreRenderCallBack);
            while (this._element.hasChildNodes()) {
                this._element.removeChild(this._element.lastChild);
            }
            this._element.parentNode.removeChild(this._element);
        }
        Widget.prototype.setGlobe.call(this, globe);
    };
    Attributions.prototype.setCollapsed = function (collapsed) {
        if (collapsed === undefined) {
            console.log('[ERROR] Attributions:setCollapsed - missing collapsed parameter');
            return;
        }
        var isCollapsed = this.getCollapsed();
        if (collapsed && isCollapsed || !collapsed && !isCollapsed) {
            return;
        }
        document.getElementById(this._addUID('GPshowAttributionsList')).checked = !collapsed;
    };
    Attributions.prototype.getCollapsed = function () {
        return !document.getElementById(this._addUID('GPshowAttributionsList')).checked;
    };
    Attributions.prototype._initialize = function (options) {
        this._uid = SelectorID.generate();
        this._AttributionContainer = null;
        this._callbacks = {};
        this._options = options;
    };
    Attributions.prototype._initContainer = function (options) {
        var container = this._createMainContainerElement();
        var inputShow = this._createMainAttributionsShowElement();
        container.appendChild(inputShow);
        if (!options.collapsed) {
            inputShow.checked = 'checked';
        }
        var divA = this._attributionListContainer = this._createMainAttributionsListContainer();
        var ulA = this._createAttributionsList();
        divA.appendChild(ulA);
        container.appendChild(divA);
        var picto = this._createMainPictoElement(options.collapsed);
        container.appendChild(picto);
        return container;
    };
    Attributions.prototype._inRangeUpdate = function (layersDisplayed, extent) {
        var globe = this.getGlobe();
        var scaleDenominator = 1 / globe.getScale();
        var attributions = new window.Map();
        for (var h = 0; h < layersDisplayed.length; h++) {
            var layer = globe.getLayerById(layersDisplayed[h]);
            if (!layer.visible) {
                continue;
            }
            var ori = layer.options.originators;
            if (ori) {
                for (var j = 0; j < ori.length; j++) {
                    if (attributions.has(ori[j].name)) {
                        continue;
                    }
                    if (!ori[j].constraints) {
                        attributions.set(ori[j].name, ori[j]);
                        continue;
                    }
                    if (ori[j].constraints[0].minScaleDenominator) {
                        if (ori[j].constraints[0].minScaleDenominator === ori[j].constraints[0].maxScaleDenominator) {
                            var attributionZoomLevel = LayerUtils.getZoomLevelFromScaleDenominator(ori[j].constraints[0].minScaleDenominator);
                            var maxAttributionScaleDenominator = (this._resolutionsWGS84[attributionZoomLevel] + this._resolutionsWGS84[attributionZoomLevel - 1]) / (0.00028 * 2);
                            var minAttributionScaleDenominator = (this._resolutionsWGS84[attributionZoomLevel] + this._resolutionsWGS84[attributionZoomLevel + 1]) / (0.00028 * 2);
                            if (!(maxAttributionScaleDenominator > scaleDenominator && scaleDenominator > minAttributionScaleDenominator)) {
                                continue;
                            }
                        } else if (!(ori[j].constraints[0].minScaleDenominator < scaleDenominator && scaleDenominator < ori[j].constraints[0].maxScaleDenominator)) {
                            continue;
                        }
                    }
                    if (ori[j].constraints[0].bbox) {
                        if (ori[j].constraints[0].bbox.left < extent.west() && ori[j].constraints[0].bbox.right > extent.east() && ori[j].constraints[0].bbox.top > extent.north() && ori[j].constraints[0].bbox.bottom < extent.south()) {
                            attributions.set(ori[j].name, ori[j]);
                        }
                    } else if (!ori[j].constraints[0].bbox) {
                        attributions.set(ori[j].name, ori[j]);
                    }
                }
            }
        }
        this._updateAttributionListContainer(attributions);
    };
    Attributions.prototype._updateAttributionListContainer = function (attributions) {
        var element = document.getElementById(this._addUID('GPAttributionsList'));
        document.getElementById(this._addUID('GPAttributionsList')).parentNode.removeChild(element);
        var ul = this._createAttributionsList();
        attributions.forEach(function (a) {
            var li = document.createElement('li');
            var link = document.createElement('a');
            link.href = a.url;
            link.innerHTML = a.name + '&nbsp';
            link.target = '_blank';
            li.id = a.name.replace(/\s/g, '');
            li.appendChild(link);
            ul.appendChild(li);
        });
        this._attributionListContainer.appendChild(ul);
    };
    Attributions.prototype._resolutionsWGS84 = {
        0: 156543.033928041,
        1: 78271.51696402048,
        2: 39135.758482010235,
        3: 19567.87924100512,
        4: 9783.93962050256,
        5: 4891.96981025128,
        6: 2445.98490512564,
        7: 1222.99245256282,
        8: 611.49622628141,
        9: 305.7481131407048,
        10: 152.8740565703525,
        11: 76.43702828517624,
        12: 38.21851414258813,
        13: 19.10925707129406,
        14: 9.554628535647032,
        15: 4.777314267823516,
        16: 2.388657133911758,
        17: 1.194328566955879,
        18: 0.5971642834779395,
        19: 0.2985821417389697,
        20: 0.1492910708694849,
        21: 0.0746455354347424
    };
    return Attributions;
}(ItownsGlobeViewExtended, CommonUtils, CommonUtilsSelectorID, CommonUtilsLayerUtils, CommonControlsAttributionDOM, ItownsControlsWidget);
CommonControlsScaleDOM = function () {
    var ScaleDOM = {
        _addUID: function (id) {
            var uid = this._uid ? id + '-' + this._uid : id;
            return uid;
        },
        _createMainContainerElement: function () {
            var container = document.createElement('div');
            container.id = this._addUID('GPscaleContainer');
            container.className = 'GPwidget';
            return container;
        }
    };
    return ScaleDOM;
}();
ItownsControlsScale = function (GlobeViewExtended, Utils, SelectorID, ScaleDOM, Widget) {
    function Scale(options) {
        options = options || {};
        if (!(this instanceof Scale)) {
            throw new TypeError('ERROR CLASS_CONSTRUCTOR');
        }
        if (options && typeof options !== 'object') {
            throw new Error('ERROR WRONG_TYPE : options should be an object');
        }
        this._initialize();
        var container = this._initContainer();
        var vDiv = document.getElementById('viewerDiv');
        var targetDiv = document.getElementById(options.target) || vDiv;
        Widget.call(this, {
            name: 'GraphicScale',
            element: container,
            target: targetDiv,
            position: options.position
        });
    }
    Scale.prototype = Object.create(Widget.prototype, {});
    Utils.assign(Scale.prototype, ScaleDOM);
    Scale.prototype.constructor = Scale;
    Scale.prototype.setGlobe = function (globe) {
        if (globe) {
            var self = this;
            this._callbacks.onChangedViewCallback = function () {
                var value = globe.pixelsToMeters(200);
                value = Math.floor(value);
                var digit = Math.pow(10, value.toString().length - 1);
                value = Math.round(value / digit) * digit;
                var pix = globe.metersToPixels(value);
                var unit = 'm';
                if (value >= 1000) {
                    value /= 1000;
                    unit = 'km';
                }
                self.getElement().innerHTML = value + ' ' + unit;
                self.getElement().style.width = pix + 'px';
            };
            if (globe.isInitialized()) {
                this._callbacks.onChangedViewCallback();
            } else {
                globe.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, this._callbacks.onChangedViewCallback);
            }
            globe.listen(GlobeViewExtended.EVENTS.RANGE_CHANGED, this._callbacks.onChangedViewCallback);
        } else if (globe == null) {
            this._globe.forget(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, this._callbacks.onChangedViewCallback);
            this._globe.forget(GlobeViewExtended.EVENTS.RANGE_CHANGED, this._callbacks.onChangedViewCallback);
            while (this.getElement().hasChildNodes()) {
                this.getElement().removeChild(this.getElement().lastChild);
            }
            this.getElement().parentNode.removeChild(this.getElement());
        }
        Widget.prototype.setGlobe.call(this, globe);
    };
    Scale.prototype._initialize = function () {
        this._uid = SelectorID.generate();
        this._ScaleContainer = null;
        this._callbacks = {};
    };
    Scale.prototype._initContainer = function () {
        var container = this._createMainContainerElement();
        return container;
    };
    return Scale;
}(ItownsGlobeViewExtended, CommonUtils, CommonUtilsSelectorID, CommonControlsScaleDOM, ItownsControlsWidget);
CommonControlsMiniGlobeDOM = function () {
    var MiniGlobeDOM = {
        _addUID: function (id) {
            var uid = this._uid ? id + '-' + this._uid : id;
            return uid;
        },
        _createMainContainerElement: function () {
            var container = document.createElement('div');
            container.id = this._addUID('GPminiglobeContainer');
            container.className = 'GPwidget';
            return container;
        }
    };
    return MiniGlobeDOM;
}();
ItownsControlsMiniGlobe = function (Itowns, GlobeViewExtended, Utils, SelectorID, MiniGlobeDOM, Widget) {
    function MiniGlobe(options) {
        options = options || {};
        if (!(this instanceof MiniGlobe)) {
            throw new TypeError('ERROR CLASS_CONSTRUCTOR');
        }
        if (options && typeof options !== 'object') {
            throw new Error('ERROR WRONG_TYPE : options should be an object');
        }
        this._initialize();
        var container = this._initContainer();
        var vDiv = document.getElementById('viewerDiv');
        this._options = options;
        var targetDiv = document.getElementById(options.target) || vDiv;
        Widget.call(this, {
            name: 'Overview',
            element: container,
            target: targetDiv,
            position: options.position
        });
    }
    MiniGlobe.prototype = Object.create(Widget.prototype, {});
    Utils.assign(MiniGlobe.prototype, MiniGlobeDOM);
    MiniGlobe.prototype.constructor = MiniGlobe;
    MiniGlobe.prototype.setGlobe = function (globe) {
        if (globe) {
            var minDistance = 6650000;
            var maxDistance = 30000000;
            var positionOnGlobe = globe.getCenter();
            var miniView = new Itowns.GlobeView(this._element, positionOnGlobe, {
                maxSubdivisionLevel: 6,
                noControls: true
            });
            miniView.mainLoop.gfxEngine.renderer.setClearColor(0, 0);
            var updateMiniGlobeHandler = function () {
                var range = globe.getRange();
                var distance = Math.min(Math.max(range * 1.5, minDistance), maxDistance);
                var camera = miniView.camera.camera3D;
                camera.position.copy(globe.moveTarget()).setLength(distance);
                camera.lookAt(globe.moveTarget());
                miniView.notifyChange(true);
            };
            globe.listen(GlobeViewExtended.EVENTS.AFTER_RENDER, updateMiniGlobeHandler);
            if (globe.isInitialized()) {
                updateMiniGlobeHandler;
            } else {
                globe.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, updateMiniGlobeHandler);
            }
            var miniGlobeLayer = this._options.layer || this._baseLayer;
            miniView.addLayer(miniGlobeLayer);
            this._globeObj = miniView;
        } else if (globe == null) {
            while (this.getElement().hasChildNodes()) {
                this.getElement().removeChild(this.getElement().lastChild);
            }
            this.getElement().parentNode.removeChild(this.getElement());
        }
        Widget.prototype.setGlobe.call(this, globe);
    };
    MiniGlobe.prototype._initialize = function () {
        this._uid = SelectorID.generate();
        this._MiniGlobeContainer = null;
        this._callbacks = {};
    };
    MiniGlobe.prototype._initContainer = function () {
        var container = this._createMainContainerElement();
        return container;
    };
    MiniGlobe.prototype._baseLayer = {
        type: 'color',
        protocol: 'wmts',
        id: 'Maps',
        url: 'https://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts',
        updateStrategy: {
            type: '0',
            options: {}
        },
        networkOptions: { crossOrigin: 'omit' },
        options: {
            name: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
            mimetype: 'image/jpeg',
            tileMatrixSet: 'PM',
            tileMatrixSetLimits: {
                0: {
                    minTileRow: '0',
                    maxTileRow: '0',
                    minTileCol: '0',
                    maxTileCol: '1'
                },
                1: {
                    minTileRow: '0',
                    maxTileRow: '1',
                    minTileCol: '0',
                    maxTileCol: '2'
                },
                2: {
                    minTileRow: '0',
                    maxTileRow: '2',
                    minTileCol: '0',
                    maxTileCol: '4'
                },
                3: {
                    minTileRow: '0',
                    maxTileRow: '5',
                    minTileCol: '0',
                    maxTileCol: '8'
                },
                4: {
                    minTileRow: '1',
                    maxTileRow: '11',
                    minTileCol: '0',
                    maxTileCol: '16'
                },
                5: {
                    minTileRow: '3',
                    maxTileRow: '22',
                    minTileCol: '0',
                    maxTileCol: '32'
                },
                6: {
                    minTileRow: '7',
                    maxTileRow: '45',
                    minTileCol: '0',
                    maxTileCol: '64'
                },
                7: {
                    minTileRow: '42',
                    maxTileRow: '97',
                    minTileCol: '0',
                    maxTileCol: '115'
                },
                8: {
                    minTileRow: '84',
                    maxTileRow: '195',
                    minTileCol: '1',
                    maxTileCol: '247'
                },
                9: {
                    minTileRow: '170',
                    maxTileRow: '390',
                    minTileCol: '2',
                    maxTileCol: '495'
                },
                10: {
                    minTileRow: '340',
                    maxTileRow: '780',
                    minTileCol: '5',
                    maxTileCol: '990'
                },
                11: {
                    minTileRow: '681',
                    maxTileRow: '1544',
                    minTileCol: '10',
                    maxTileCol: '1981'
                },
                12: {
                    minTileRow: '1363',
                    maxTileRow: '3088',
                    minTileCol: '20',
                    maxTileCol: '3962'
                },
                13: {
                    minTileRow: '2726',
                    maxTileRow: '6177',
                    minTileCol: '40',
                    maxTileCol: '7924'
                },
                14: {
                    minTileRow: '5452',
                    maxTileRow: '12355',
                    minTileCol: '81',
                    maxTileCol: '15847'
                },
                15: {
                    minTileRow: '10944',
                    maxTileRow: '21176',
                    minTileCol: '163',
                    maxTileCol: '31695'
                },
                16: {
                    minTileRow: '21889',
                    maxTileRow: '42353',
                    minTileCol: '326',
                    maxTileCol: '63382'
                },
                17: {
                    minTileRow: '43776',
                    maxTileRow: '73526',
                    minTileCol: '42528',
                    maxTileCol: '85869'
                },
                18: {
                    minTileRow: '87557',
                    maxTileRow: '147052',
                    minTileCol: '85058',
                    maxTileCol: '171738'
                }
            }
        }
    };
    return MiniGlobe;
}(itowns, ItownsGlobeViewExtended, CommonUtils, CommonUtilsSelectorID, CommonControlsMiniGlobeDOM, ItownsControlsWidget);
ItownsGpPluginItowns = function (Itowns, Gp, Utils, LayerUtils, MousePosition, LayerSwitcher, Attributions, Scale, MiniGlobe, GlobeViewExtended) {
    Gp.itownsextVersion = '1.0.0';
    Gp.itownsextDate = '2018-04-05';
    Gp.LayerUtils = LayerUtils;
    var scope = typeof window !== 'undefined' ? window : {};
    var _itowns = Itowns || {};
    _itowns.control = {};
    _itowns.control.MousePosition = MousePosition;
    _itowns.control.LayerSwitcher = LayerSwitcher;
    _itowns.control.Attributions = Attributions;
    _itowns.control.Scale = Scale;
    _itowns.control.MiniGlobe = MiniGlobe;
    _itowns.GlobeViewExtended = GlobeViewExtended;
    scope.itowns = scope.itowns || {};
    Utils.assign(scope.itowns, _itowns);
    return Gp;
}(itowns, gp, CommonUtils, CommonUtilsLayerUtils, ItownsControlsMousePosition, ItownsControlsLayerSwitcher, ItownsControlsAttributions, ItownsControlsScale, ItownsControlsMiniGlobe, ItownsGlobeViewExtended);
return Gp;
}));
