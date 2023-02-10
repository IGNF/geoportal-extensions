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

Layers =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
/******/ })
/************************************************************************/
/******/ ({

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _LayerConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(126);
/* harmony import */ var _WMS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _WMTS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(131);





var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("layers");
/**
 * Geoportal Layers Factory to be used together with Leaflet Maps.
 *
 * @module Layers
 * @alias L.geoportalLayer
 * @example
 * var map = L.Map(...) ;
 * var layer = L.geoportalLayer.WMTS({
 *      layer : "ORTHOIMAGERY.ORTHOPHOTOS",
 * }).addTo(map) ;
 */

/** @type {L.geoportalLayer} */

var Layers = {
  options: {},
  params: {},
  protocol: null,
  serviceUrl: "http://localhost?no-rights-found-for=[{layer}]",

  /**
   * initialize options
   */
  _initOptions: function _initOptions() {
    if (!this.options || Object.keys(this.options).length === 0) {
      throw new Error("PARAM_MISSING : options !");
    }

    if (!this.options.layer) {
      throw new Error("PARAM_MISSING : layer !");
    } // FIXME est ce utile de le preciser ?


    if (!this.options.apiKey) {
      logger.log("PARAM_MISSING : apiKey !");
    } // par defaut


    if (typeof this.options.ssl === "undefined") {
      this.options.ssl = true;
    }
  },

  /**
   * get runtime context
   */
  _initContext: function _initContext() {
    // si ssl = false on fait du http
    // par défaut, ssl = true, on fait du https
    this.protocol = this.options.ssl === false ? "http://" : "https://";
  },

  /**
   * initialize parameters
   *
   * @param {String} service - service name, WMS or WMTS
   */
  _initParams: function _initParams(service) {
    // par defaut...
    if (!service) {
      service = "WMTS";
    } // Gestion de l'autoconf


    this.params = _LayerConfig__WEBPACK_IMPORTED_MODULE_2__["default"].get({
      key: this.options.apiKey,
      layer: this.options.layer,
      service: service
    });

    if (!this.params || Object.keys(this.params).length === 0) {
      this.params = {};

      if (!this.options.apiKey) {
        // FIXME on retire l'exception...
        logger.log("WARNING PARAM_MISSING : parameter 'apiKey' is mandatory if the contract key configuration has not been loaded !");
      }
    }
  },

  /**
   * Factory function for Geoportal or INSPIRE WMS Layers creation.
   *
   * @method WMS
   * @static
   * @alias L.geoportalLayer.WMS
   * @extends {L.TileLayer.WMS}
   *
   * @param {Object} options - options for function call.
   * @param {String} options.layer - layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
   * @param {Boolean} [options.ssl] - if set true, enforce protocol https (only for nodejs)
   * @param {String} [options.apiKey] - access key to Geoportal platform, obtained [here]{@link http://professionnels.ign.fr/ign/contrats}.
   * @param {Object} [settings] - other options for L.TileLayer.WMS function (see {@link http://leafletjs.com/reference.html#tilelayer-wms-options})
   *
   * @returns {L.geoportalLayer.WMS} WMS layer
   *
   * @example
   *  var map = L.Map('divmap').setView();
   *  var lyr = L.geoportalLayer.WMS(
   *    {
   *      layer : "OI.OrthoimageCoverage"
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
  WMS: function WMS(options, settings) {
    // gestion du logger
    var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("layers-wms");
    /** options du plugins */

    this.options = options || {}; // gestion des options

    this._initOptions();
    /** options natives de Leaflet */


    this.settings = settings || {}; // env d'execution : browser ou non ?

    this._initContext(); // gestion de l'autoconf


    this._initParams("WMS");

    logger.log(this.params); // url du service

    var serviceUrl = null;

    if (this.params.key || this.options.apiKey) {
      // url de l'autoconf ou le service par defaut
      serviceUrl = this.params.url || leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.template("https://wxs.ign.fr/{key}/geoportail/r/wms", {
        key: this.params.key || this.options.apiKey
      });
    } else {
      // pas d'autoconf, ni de clef API !
      // on évite l'exception en envoyant les requêtes vers localhost...
      serviceUrl = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.template(this.serviceUrl, {
        layer: this.options.layer
      });
    } // params du service WMS (par defaut)


    var paramsWms = {
      layers: this.options.layer,
      styles: this.params.styles || "normal",
      format: this.params.format || "image/jpeg",
      version: this.params.version || "1.3.0"
    }; // options natives de leaflet (par defaut)

    var paramsNative = {
      // zoom level
      minZoom: this.params.minZoom || 1,
      maxZoom: this.params.maxZoom || 21
    }; // merge des options utilisateur pour le service WMS

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(paramsWms, this.settings); // merge des options utilisateur aux options natives de leaflet

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(paramsNative, this.settings);
    return new _WMS__WEBPACK_IMPORTED_MODULE_3__["default"](serviceUrl.replace(/(http|https):\/\//, this.protocol), {
      paramsNative: paramsNative,
      paramsWms: paramsWms,
      originators: this.params.originators || [],
      legends: this.params.legends || [],
      metadata: this.params.metadata || [],
      title: this.params.title || null,
      description: this.params.description || null,
      quicklookUrl: this.params.quicklookUrl || null
    });
  },

  /**
   * Factory function for Geoportal WMTS Layers creation.
   *
   * @method WMTS
   * @static
   * @alias L.geoportalLayer.WMTS
   * @extends {L.TileLayer}
   *
   * @param {Object} options - options for function call.
   * @param {String} options.layer - layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
   * @param {Boolean} [options.ssl] - if set true, enforce protocol https (only for nodejs)
   * @param {String} [options.apiKey] - access key to Geoportal platform, obtained [here]{@link http://professionnels.ign.fr/ign/contrats}.
   * @param {Object} [settings] - other options for L.TileLayer function (see {@link http://leafletjs.com/reference.html#tilelayer-options})
   *
   * @returns {L.geoportalLayer.WMTS} WMTS layer
   *
   * @example
   *  var map = L.Map('divmap').setView();
   *  var lyr = L.geoportalLayer.WMTS(
   *    {
   *      layer : "ORTHOIMAGERY.ORTHOPHOTOS"
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
  WMTS: function WMTS(options, settings) {
    // gestion du logger
    var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("layers-wmts");
    /** options du plugins */

    this.options = options || {}; // gestion des options

    this._initOptions();
    /** options natives de Leaflet */


    this.settings = settings || {}; // env d'execution : browser ou non ?

    this._initContext(); // gestion de l'autoconf


    this._initParams("WMTS");

    logger.log(this.params); // url du service (par defaut)

    var serviceUrl = null;

    if (this.params.key || this.options.apiKey) {
      serviceUrl = this.params.url || leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.template("https://wxs.ign.fr/{key}/geoportail/wmts", {
        key: this.params.key || this.options.apiKey
      });
    } else {
      // FIXME pas d'autoconf, ni clef API !
      // on évite l'exception en envoyant les requêtes vers localhost
      serviceUrl = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.template(this.serviceUrl, {
        layer: this.options.layer
      });
    } // params du service WMTS (par defaut)


    var paramsWmts = {
      layer: this.options.layer,
      style: this.params.styles || "normal",
      format: this.params.format || "image/jpeg",
      version: this.params.version || "1.0.0",
      tilematrixset: this.params.TMSLink || "PM"
    }; // options natives de leaflet (par defaut)
    //    minZoom : 0
    //    maxZoom : 18
    //    tileSize : 256
    //    subdomains : 'abc'
    //    errorTileUrl : ''
    //    attribution : ''
    //    zoomOffset : 0
    //    opacity : 1

    var paramsNative = {
      // zoom level
      minZoom: this.params.minZoom || 1,
      maxZoom: this.params.maxZoom || 21
    }; // merge des options utilisateur pour le service WMTS

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(paramsWmts, this.settings); // merge des options utilisateur aux options natives de leaflet

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(paramsNative, this.settings);
    return new _WMTS__WEBPACK_IMPORTED_MODULE_4__["default"](serviceUrl.replace(/(http|https):\/\//, this.protocol), {
      paramsNative: paramsNative,
      paramsWmts: paramsWmts,
      originators: this.params.originators || [],
      legends: this.params.legends || [],
      metadata: this.params.metadata || [],
      title: this.params.title || "",
      description: this.params.description || "",
      quicklookUrl: this.params.quicklookUrl || ""
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Layers); // Expose Layers as L.geoportalLayer (for a build bundle)

if (window.L) {
  window.L.geoportalLayer = Layers;
}

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var _Common_Utils_LayerUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(127);



var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("layer-config");
/**
 * @classdesc
 *
 * Configuration des couches Geoportail via l'appel du service d'autoconfiguration
 * @private
 */

var LayerConfig = {
  /**
   * options : key, layer, service
   *
   * @param {Object} options - options
   *
   * @returns {Object} layer parameters
   */
  get: function get(options) {
    var params = {}; // Gestion de l'autoconf

    if (!_Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].isConfigLoaded()) {
      logger.warn("WARNING AUTOCONF_MISSING : contract key configuration has to be loaded to load Geoportal layers !");
      return;
    } // gestion des parametres


    params = _Common_Utils_Config__WEBPACK_IMPORTED_MODULE_1__["default"].getLayerParams(options.layer, options.service, options.key);

    if (!params || Object.keys(params).length === 0) {
      logger.warn("WARNING AUTOCONF_FAILED : params not found ?!");
      return;
    } // gestion des zoom


    params.minZoom = _Common_Utils_LayerUtils__WEBPACK_IMPORTED_MODULE_2__["default"].getZoomLevelFromScaleDenominator(params.maxScale) || 1;
    params.maxZoom = _Common_Utils_LayerUtils__WEBPACK_IMPORTED_MODULE_2__["default"].getZoomLevelFromScaleDenominator(params.minScale) || 21;
    return params;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (LayerConfig);

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
* @module LayerUtils
* @alias Gp.LayerUtils
* @description
* ...
*
* @example
* getZoomLevelFromScaleDenominator();
* getAttributions();
* intersects();
*/
var LayerUtils = {
  /**
   * Obtenir le ZoomLevel à partir du ScaleDenominator
   * @function getZoomLevelFromScaleDenominator
   * @param {Number} scaleDenominator - the scale denominator
   * @param {String} crs - the crs
   *
   * @returns {Integer} zoom level
   */
  getZoomLevelFromScaleDenominator: function getZoomLevelFromScaleDenominator(scaleDenominator, crs) {
    // ------------------------------------------------- //
    // Code issu de l'API Geoportal/Catalogue/Config.js  //
    // ------------------------------------------------- //
    //     var configuration = Gp.Config;
    //     var general = configuration.generalOptions;
    //     var layers  = configuration.layersContext;
    //
    //     for (var tms in general.tileMatrixSets) {
    //         var tileMatrixSet = general.tileMatrixSets[tms];
    //         // IGN's WMTS bug : epsg:nnnn instead of EPSG:nnnn
    //         var crs = tileMatrixSet.supportedCRS = tileMatrixSet.supportedCRS.replace(/epsg/,"EPSG");
    //
    //         if (!Geoportal.Catalogue.CRSRESOLUTIONS.hasOwnProperty(crs)) {
    //             var p= new OpenLayers.Projection(crs);
    //             Geoportal.Catalogue.CRSRESOLUTIONS[crs]= [];
    //             var matrixIds= tileMatrixSet.matrixIds;
    //             for (var i= 0, li= matrixIds.length; i<li; ++i) {
    //                 var mid= matrixIds[i];
    //                 Geoportal.Catalogue.CRSRESOLUTIONS[crs].push(
    //                     0.00028*mid.scaleDenominator
    //                     /(OpenLayers.METERS_PER_INCH*OpenLayers.INCHES_PER_UNIT[p.getUnits()]));
    //                     mid.supportedCRS= mid.supportedCRS.replace(/epsg/,"EPSG");
    //                 }
    //                 Geoportal.Catalogue.CRSRESOLUTIONS[crs].sort(function (a,b){ return b-a; });
    //             }
    //         }
    //         var llR= Geoportal.Catalogue.CRSRESOLUTIONS['CRS:84'];
    //         if (!llR) {
    //             llR= Geoportal.Catalogue.CRSRESOLUTIONS['CRS:84']= general.resolutions.slice();
    //         }
    //         var wmR= Geoportal.Catalogue.CRSRESOLUTIONS['EPSG:3857'];
    //         if (!wmR) {//FIXME : should never happened !!
    //             // reproject resolutions from CRS84 to WebMercator (transform resolutions from degree/px to meter/px)
    //             wmR= Geoportal.Catalogue.CRSRESOLUTIONS['EPSG:3857']= new Array(llR.length);
    //             for (var i= 0, len= llR.length; i<len; i++) {
    //                 var pt= new OpenLayers.LonLat(llR[i], 0);
    //                 pt.transform(OpenLayers.Projection.CRS84, OpenLayers.Projection.WebMercator);
    //                 wmR[i]= pt.lon;
    //             }
    //         }
    //         Geoportal.Catalogue.RESOLUTIONS= wmR;
    //
    //         var getResolutionsFromCRS= function(crs) {
    //             if (OpenLayers.Projection.WebMercator.isAliasOf(crs)) {
    //                 return wmR;
    //             }
    //             if (OpenLayers.Projection.CRS84.isAliasOf(crs)) {
    //                 return llR;
    //             }
    //             return Geoportal.Catalogue.CRSRESOLUTIONS[crs]?Geoportal.Catalogue.CRSRESOLUTIONS[crs]:null ;
    //         };
    //
    //         var retrieveZoomFromResolution= function(resolutions, resolution) {
    //             for (var i= 0, li= resolutions.length; i<li; i++) {
    //                 if (resolutions[i]-resolution <= resolutions[li-1]) {
    //                     return i;
    //                 }
    //             }
    //             return -1;
    //         };
    //
    //         var getZoomLevelFromScaleDenominator= function(scaleDenominator,crs) {
    //             var resolution= scaleDenominator * 0.00028;
    //             var R= getResolutionsFromCRS(crs);
    //             if (R) {
    //                 return retrieveZoomFromResolution(R,resolution);
    //             }
    //             resolution= resolution/(OpenLayers.METERS_PER_INCH * OpenLayers.INCHES_PER_UNIT["degrees"]);
    //             return retrieveZoomFromResolution(llR,resolution);
    //         };
    //
    //         var getZoomLevelFromResolution= function(resolution,crs){
    //             var R= getResolutionsFromCRS(crs);
    //             if (R) {
    //                 return retrieveZoomFromResolution(R,resolution);
    //             }
    //             var pt0= new OpenLayers.LonLat(0, 0);
    //             var pt1= new OpenLayers.LonLat(1, 0);
    //             pt0.transform(new OpenLayers.Projection(crs),OpenLayers.Projection.CRS84);
    //             pt1.transform(new OpenLayers.Projection(crs),OpenLayers.Projection.CRS84);
    //             resolution= resolution*(Math.abs(pt1.lon-pt0.lon));
    //             return retrieveZoomFromResolution(llR,resolution);
    //         };
    // par defaut, on utilise la projection WebMercator (EPSG:3857 = PM)
    // soit la liste des resolutions natives
    var resolutionsNatives = {};

    switch (crs) {
      case "EPSG:2154":
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
    } // gestion des autres SRS
    // TODO
    // if (crs) {
    // }


    var resolution = scaleDenominator * 0.00028;

    for (var index in resolutionsNatives) {
      if (resolutionsNatives.hasOwnProperty(index)) {
        if (resolutionsNatives[index] <= resolution) {
          index = parseInt(index, 10);
          return index;
        }
      }
    }

    return 0; // -1 ?
  },

  /**
   * Get attributions list for a layer, based on current zoom and extent
   *
   * @function getAttributions
   * @param {Object} params - function params
   * @param {Array.<Float>} params.extent - map current geographical extent (EPSG:4326) : [top, left, bottom, right] = [maxy, minx, miny, maxx]
   * @param {Number} params.zoom - map current zoom
   * @param {String} params.crs - map current projection code (ex "EPSG:2154")
   * @param {Boolean} params.visibility - layer visibility
   * @param {Gp.Services.Config.Originator} params.originators - resource originators (from Gp.Config.layers[].originators)
   * @returns {Object} attributions - associative array, mapping originators url (keys) with their properties : html attributions elements
   */
  getAttributions: function getAttributions(params) {
    var zoom = params.zoom;
    var attributions = [];

    if (params.originators != null && params.visibility) {
      // drawLogo = boolean, true if attribution should be displayed (zoom, extent), false otherwise
      var drawLogo;

      for (var j = 0, jl = params.originators.length; j < jl; j++) {
        drawLogo = true;
        var originator = params.originators[j];
        var constraints = params.originators[j].constraints || [];

        for (var k = 0, kl = constraints.length; k < kl; k++) {
          var constraint = constraints[k];
          drawLogo = true;
          var minZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.maxScaleDenominator, params.crs);
          var maxZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.minScaleDenominator, params.crs) || 21; // min zoom constraints

          if (minZoomLevel && minZoomLevel > zoom) {
            drawLogo = false;
          } // max zoom constraints


          if (drawLogo && maxZoomLevel && maxZoomLevel < zoom) {
            drawLogo = false;
          } // bbox constraints


          var bbox = constraint.bbox;

          if (drawLogo && bbox) {
            drawLogo = false;
            var viewExtent = params.extent;

            if (viewExtent) {
              var bounds = [bbox.top, bbox.left, bbox.bottom, bbox.right];

              if (this.intersects(viewExtent, bounds)) {
                // at least one constraint matches the map ones
                drawLogo = true;
                break;
              }
            }
          }
        }

        if (drawLogo) {
          // on a un originator qui correspond au zoom et à l'étendue.
          var logo = originator.logo;
          var url = originator.url;
          var name = originator.name ? originator.name : "";
          var text = originator.attribution;
          var container = document.createElement("div");
          container.className = "gp-control-attribution"; // on crée un lien dans tous les cas (même s'il ne pointe pas vers une référence), pour avoir accès à la class CSS (pour surcharge)

          var link = null;
          link = document.createElement("a");
          link.className = "gp-control-attribution-link";
          link.target = "_blank";
          container.appendChild(link);

          if (url) {
            link.href = url;
          }

          var bImage = !!logo;
          var image = null; // si on a un logo, on l'affiche à l'interieur du lien

          if (bImage) {
            image = document.createElement("img");

            if (link) {
              image.className = "gp-control-attribution-image";
              link.appendChild(image);
            } else {
              image.className = "";
              container.appendChild(image);
            }

            image.src = logo; // FIXME : mixContent !

            image.title = text || name;
            image.style.height = "30px";
            image.style.width = "30px";
          } else {
            // sinon, on affiche le nom de l'originator, ou sa description ou l'url.
            if (name) {
              link.textContent = name;
            } else if (text) {
              link.textContent = text;
            } else if (url) {
              link.textContent = url;
            } else {
              link.textContent = "";
            }
          }

          attributions.push(container.innerHTML + " ");
        }
      }
    }

    return attributions;
  },

  /**
   * Determines if one extent (extent1) intersects another (extent2)
   *
   * @function intersects
   * @param {Array.<Float>} extent1 - First extent : [top, left, bottom, right] = [maxy, minx, miny, maxx]
   * @param {Array.<Float>} extent2 - Second extent : [top, left, bottom, right] = [maxy, minx, miny, maxx]
   * @return {Boolean} intersects - True if the two extents intersect, false otherwise.
   */
  intersects: function intersects(extent1, extent2) {
    var intersectsX = extent1[1] <= extent2[3] && extent2[1] <= extent1[3];
    var intersectsY = extent1[2] <= extent2[0] && extent2[2] <= extent1[0];
    return intersectsX && intersectsY;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (LayerUtils);

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var geoportal_access_lib_src_Utils_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _LayerEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(129);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(130);
var _package_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(130, 1);
/**
* desativation JSHINT
* W106 - Identifier '_geoportal_id' is not in camel case
*/

/* jshint -W106 */



 // package.json (extract version)


var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__["default"].getLogger("wms");
/**
 * @namespace
 * @alias L.geoportalLayers.WMS
 * @classdesc
 *
 * Leaflet Layer Class for Geoportal or INSPIRE WMS Layers.
 *
 * Use {@link module:Layers.WMS L.geoportalLayer.WMS()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#tilelayer-wms" target="_blank">L.TileLayer.WMS</a> native class.
 *
 */

var WMS = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.WMS.extend(
/** @lends WMS.prototype */
{
  includes: _LayerEvent__WEBPACK_IMPORTED_MODULE_3__["default"],

  /**
   *
   * @constructor
   * @param {String} url - url service
   * @param {Object} options - options for function call.
   * @param {Array} [options.originators] - originators
   * @param {Array} [options.legends] - legends
   * @param {Array} [options.metadata] - metadata
   * @param {String} [options.title] - title
   * @param {String} [options.description] - description
   * @param {String} [options.quicklookUrl] - quicklookUrl
   * @param {Object} options.paramsWms - WMS options
   * @param {String} options.paramsWms.layers - eg "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO",
   * @param {String} options.paramsWms.styles - "normal",
   * @param {String} options.paramsWms.format - "image/jpeg",
   * @param {String} options.paramsWms.version - "1.3.0"
   * @param {Object} [options.paramsNative] - other options for L.TileLayer.WMS function (see {@link http://leafletjs.com/reference.html#tilelayer-wms-options})
   * @example
   * var wms = new WMS("http://wxs.ign.fr/jhyvi0fgmnuxvfv0zjzorvdn/geoportail/r/wms", {
   *     paramsNative : {
   *         minZoom : 1,
   *         maxZoom : 21
   *     },
   *     paramsWms   : {
   *         layers  : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO",
   *         styles  : "normal",
   *         format  : "image/jpeg",
   *         version : "1.3.0"
   *     },
   *     originators  : [],
   *     legends      : [],
   *     metadata     : [],
   *     title        : "",
   *     description  : "",
   *     quicklookUrl : ""
   * });
   *
   * @ignore
   */
  initialize: function initialize(url, options) {
    var settings = {};
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(settings, options.paramsWms, options.paramsNative); // appel du constructeur de la classe étendue

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.WMS.prototype.initialize.call(this, // tracker extension leaflet
    // FIXME : gp-ext version en mode AMD
    geoportal_access_lib_src_Utils_Helper__WEBPACK_IMPORTED_MODULE_0__["default"].normalyzeUrl(url, {
      "gp-leaflet-ext": _package_json__WEBPACK_IMPORTED_MODULE_4__.leafletExtVersion || _package_json__WEBPACK_IMPORTED_MODULE_4__.version
    }, false), settings); // sauvegarde

    this._originators = options.originators;
    this._legends = options.legends;
    this._metadata = options.metadata;
    this._title = options.title;
    this._description = options.description;
    this._quicklookUrl = options.quicklookUrl; // init id du Layer

    this._geoportal_id = 0; // FIXME L.stamp(this);
  },

  /**
   * event
   * (overwritten)
   *
   * @param {Object} map - map leaflet object
   * @private
   */
  onAdd: function onAdd(map) {
    logger.trace("onAdd layer", this._geoportal_id); // recuperation de la map

    this._map = map; // enregistrement de l'id Geoportal

    this._geoportal_id = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.stamp(this); // appel de la methode de la classe étendue

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.WMS.prototype.onAdd.call(this, map);
    this.setVisible(true); // y a t il des attributions/originators pour ce layer ?

    this.updateAttributions(map);
    /**
     * Evenement sur l'ajout du layer sur la carte avec gestion des deplacements (zoom)
     * Les deplacemnts sur la carte permettent de mettre à jour la liste des attributions.
     */

    map.on({
      /**
       * Permet de desactiver la visibilité des attributions sur le retrait
       * d'un layer de type overlay.
       * Les attributions ne doivent plus apparaitre si le layer est invisible !
       */
      overlayremove: this._onRemoveLayer,

      /**
       * Permet d'activer la visibilité des attributions sur l'ajout
       * d'un layer de type overlay.
       * Les attributions doivent apparaitre si le layer est visible !
       */
      overlayadd: this._onAddLayer,

      /**
       * Permet de desactiver la visibilité des attributions sur le retrait
       * d'un layer de type layer.
       * Les attributions ne doivent plus apparaitre si le layer est invisible !
       */
      layerremove: this._onRemoveLayer,

      /**
       * Permet d'activer la visibilité des attributions sur l'ajout
       * d'un layer de type layer.
       * Les attributions doivent apparaitre si le layer est visible !
       */
      layeradd: this._onAddLayer,

      /**
       * Permet d'ajouter des fonctionnalités lors de la creation du layer
       * sur les evenements de fin de mouvemenent (move ou zoom)
       */
      moveend: this._onMoveEndLayer
    }, this); // if (map.attributionControl) {
    //
    //     // ceci permet de mofifier le prefixe leaflet !
    //     // ce dernier etant obligatoire...
    //     // Ex. map.attributionControl.setPrefix("Plugin © IGN with Leaflet - 2016");
    //     // map.attributionControl.setPrefix("Leaflet + Géoportail");
    //     map.attributionControl.setPrefix("Plugin © " +
    //         "<a href=\"http://www.ign.fr\" " +
    //         "title=\"Institut national de l'information géographique et forestière\">IGN</a>" +
    //         " with " +
    //         "<a href=\"http://leafletjs.com/\" " +
    //         "title=\"an open-source JavaScript library for mobile-friendly interactive maps\">Leaflet</a>" +
    //         " - 2016");
    // }
  },

  /**
   * event
   * (overwritten)
   *
   * @param {Object} map - map leaflet object
   * @private
   */
  onRemove: function onRemove(map) {
    logger.trace("onRemove layer", this._geoportal_id); // recuperation de la map

    this._map = map; // appel de la methode de la classe étendue

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.prototype.onRemove.call(this, map);
    this.setVisible(false); // suppression des attributions

    this.removeAttributions(map); // supprimer les evenements

    map.off({
      overlayremove: this._onRemoveLayer,
      overlayadd: this._onAddLayer,
      layerremove: this._onRemoveLayer,
      layeradd: this._onAddLayer,
      moveend: this._onMoveEndLayer
    }, this);
  },

  /**
   * event
   * (overwritten)
   *
   * @param {Object} tilePoint - Point object
   *
   * @returns {String} url
   * @private
   */
  getTileUrl: function getTileUrl(tilePoint) {
    // (Point, Number) -> String
    // FIXME
    // on surcharge cette methode à cause d'un BUG Leaflet sur l'inversion de
    // coordonnées sur les codes EPSG en geographiques en WMS 1.3.0.
    // En attente de resolution du ticket suivant :
    //   Axis option for crs, Issue 4253 on Leaflet/Leaflet
    //   https://github.com/Leaflet/Leaflet/issues/4253
    var lstProjEpsgGeographic = ["EPSG:4326"]; // ex. "EPSG:4641"

    var map = this._map;
    var tileSize = this.options.tileSize;
    var nwPoint = tilePoint.multiplyBy(tileSize);
    var sePoint = nwPoint.add([tileSize, tileSize]);

    var nw = this._crs.project(map.unproject(nwPoint, tilePoint.z));

    var se = this._crs.project(map.unproject(sePoint, tilePoint.z));

    var bbox = this._wmsVersion >= 1.3 && lstProjEpsgGeographic.indexOf(this._crs.code) !== -1 ? [se.y, nw.x, nw.y, se.x].join(",") : [nw.x, se.y, se.x, nw.y].join(",");
    var url = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.template(this._url, {
      s: this._getSubdomain(tilePoint)
    });
    return url + leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.getParamString(this.wmsParams, url, true) + "&BBOX=" + bbox;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (WMS);

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _Common_Utils_LayerUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(127);


var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("layer-event");
/**
 * @classdesc
 *
 * Evenement sur les couches Geoportail
 * @private
 */

/** @type {LayerEvent} */

var LayerEvent = {
  _id: null,
  _attributions: [],
  _visibility: true,
  _originators: [],

  /**
   * activation du controle attribution
   *
   * @param {Object} map - the map
   *
   * @return {Boolean} attribution controle is enable
   */
  isEnable: function isEnable(map) {
    if (!map.attributionControl) {
      return false;
    }

    return true;
  },

  /**
   * visibilité de la couche
   *
   * @param {Boolean} visibility - true|false
   */
  setVisible: function setVisible(visibility) {
    logger.log("visibility", visibility);
    this._visibility = visibility;
    this.fire("visibilitychange");
  },

  /**
   * visibilité de la couche
   *
   * @returns {Boolean} visibility
   */
  getVisible: function getVisible() {
    return this._visibility;
  },

  /**
   * fonction de suppresion d'un layer du controle des layers
   *
   * @param {Object} e - event
   */
  _onRemoveLayer: function _onRemoveLayer(e) {
    logger.trace("onRemove event", e);

    if (e.layer._geoportal_id !== this._geoportal_id) {
      return;
    } // attributions non visibles


    this.setVisible(false);
  },

  /**
   * fonction d'ajout d'un layer du controle des layers
   *
   * @param {Object} e - event
   */
  _onAddLayer: function _onAddLayer(e) {
    logger.trace("onAdd event", e);

    if (e.layer._geoportal_id !== this._geoportal_id) {
      return;
    } // attributions visibles


    this.setVisible(true);
  },

  /**
   * fonction de deplacement d'un layer
   *
   * @param {Object} e - event
   */
  _onMoveEndLayer: function _onMoveEndLayer(e) {
    logger.trace("moveend event", e); // mise à jour des attributions

    this.updateAttributions(this._map, this);
  },

  /**
   * updateAttributions
   *
   * @param {Object} map - the map
   */
  updateAttributions: function updateAttributions(map) {
    // FIXME on peut realiser une mise à jour plus intelligente que cette manière brutale...
    // Ex. mise en place de la notion 'hidden' de l'originators à desactiver
    if (!this.isEnable(map)) {
      return;
    }

    this.removeAttributions(map);
    this.addAttributions(map);
    this.fire("attributionchange");
  },

  /**
   * removeAttributions
   *
   * @param {Object} map - the map
   */
  removeAttributions: function removeAttributions(map) {
    logger.trace("removeAttributions...", this._geoportal_id); // suppression des attributions
    // L.Map utilise la methode getAttribution() du layer.
    // La construction concerne le layer courant.
    // Cet evenement declenche la construction des attributions

    if (!this.isEnable(map)) {
      return;
    }

    for (var i = 0; i < this._attributions.length; i++) {
      map.attributionControl.removeAttribution(this._attributions[i]);
    } // suppression des attributions de liste


    this._attributions = [];
  },

  /**
   * addAttributions
   *
   * @param {Object} map - the map
   */
  addAttributions: function addAttributions(map) {
    logger.trace("addAttributions...", this._geoportal_id); // on interroge les originators en options pour obtenir les infos
    // suivantes :
    // - echelles
    // - contraintes d'emprise
    // - information sur le(s) proprietaire(s) du layer
    // - ...
    // mais on a besoin de qq informations sur la carte tels que :
    // - zoom
    // - bounds
    // - ...

    if (!this.isEnable(map)) {
      return;
    } // ajout des attributions


    var topLeft = map.getBounds().getNorthWest();
    var bottomRight = map.getBounds().getSouthEast();
    var arrayBounds = [topLeft.lat, topLeft.lng, bottomRight.lat, bottomRight.lng];
    var params = {
      extent: arrayBounds,
      // map.getBounds(),
      zoom: map.getZoom(),
      originators: this._originators,
      visibility: this._visibility
    };
    logger.log(params);
    var attributionsOriginators = _Common_Utils_LayerUtils__WEBPACK_IMPORTED_MODULE_1__["default"].getAttributions(params);
    logger.log(attributionsOriginators);

    if (attributionsOriginators && attributionsOriginators.length !== 0) {
      // on les ajoute dans la liste
      // et on ajoute les attributions dans le controle Leaflet "L.Control.Attribution"
      for (var i = 0; i < attributionsOriginators.length; i++) {
        this._attributions.push(attributionsOriginators[i]);

        map.attributionControl.addAttribution(attributionsOriginators[i]);
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (LayerEvent);

/***/ }),

/***/ 130:
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"geoportal-extensions\",\"description\":\"French Geoportal Extensions for OpenLayers, Leaflet and iTowns libraries\",\"version\":\"2.7.2\",\"date\":\"18/11/2022\",\"leafletExtName\":\"French Geoportal Extension for Leaflet\",\"leafletExtVersion\":\"2.2.7\",\"olExtName\":\"French Geoportal Extension for OpenLayers\",\"olExtVersion\":\"3.2.18\",\"itownsExtName\":\"French Geoportal Extension for Itowns\",\"itownsExtVersion\":\"2.3.9\",\"main\":\"dist/leaflet/GpPluginLeaflet.js, dist/openlayers/GpPluginOpenLayers.js, dist/itowns/GpPluginItowns.js\",\"types\":\"dist/leaflet/index.d.ts, dist/openlayers/index.d.ts, dist/itowns/index.d.ts\",\"module\":\"src/Leaflet/index.js, src/OpenLayers/index.js, src/Itowns/index.js\",\"directories\":{},\"scripts\":{\"setup\":\"npm install\",\"clean\":\"echo \\\"Warning: target not yet implemented!\\\" && exit 0\",\"eslint\":\"eslint src/\",\"test\":\"npm run test:serve\",\"test:serve\":\"cd test && webpack-dev-server --hot --config webpack.test.serve.js\",\"sample\":\"npm run sample:serve\",\"sample:serve\":\"npm run sample:ol:serve\",\"sample:itowns:serve\":\"webpack-dev-server --config build/webpack/webpack.config.itowns --mode=development --https --open-page samples/index-itowns-map.html --content-base . --output-public-path '/dist/itowns/' --port 9001 --open\",\"sample:leaflet:serve\":\"webpack-dev-server --config build/webpack/webpack.config.leaflet --mode=development --https --open-page samples/index-leaflet-map.html --content-base . --output-public-path '/dist/leaflet/' --port 9001 --open\",\"sample:ol:serve\":\"webpack-dev-server --config build/webpack/webpack.config.openlayers --mode=development --https --open-page samples/index-openlayers-map.html --content-base . --output-public-path '/dist/openlayers/' --port 9001 --open\",\"generate-types:ol\":\"npx tsc -p build/types/tsconfig-openlayers.json\",\"generate-types:leaflet\":\"npx tsc -p build/types/tsconfig-leaflet.json\",\"generate-types:itowns\":\"npx tsc -p build/types/tsconfig-itowns.json\",\"generate-jsdoc:ol\":\"jsdoc -c build/jsdoc/jsdoc-openlayers.json\",\"generate-jsdoc:leaflet\":\"jsdoc -c build/jsdoc/jsdoc-leaflet.json\",\"generate-jsdoc:itowns\":\"jsdoc -c build/jsdoc/jsdoc-itowns.json\",\"doc\":\"npm run doc:serve\",\"doc:serve\":\"npm run doc:ol:serve\",\"doc:itowns:serve\":\"webpack-dev-server --hot  --config build/webpack/webpack.config.itowns --content-base jsdoc/itowns --port 9001 --open\",\"doc:leaflet:serve\":\"webpack-dev-server --hot  --config build/webpack/webpack.config.leaflet --content-base jsdoc/leaflet --port 9001 --open\",\"doc:ol:serve\":\"webpack-dev-server --hot  --config build/webpack/webpack.config.openlayers --content-base jsdoc/openlayers --port 9001 --open\",\"build:dev\":\"npm-run-all --print-label --print-name build:*:dev\",\"build:prod\":\"npm-run-all --print-label --print-name build:*:prod\",\"build:src\":\"npm-run-all --print-label --print-name build:*:src\",\"build\":\"npm-run-all --print-label --print-name build:*:*\",\"build:itowns\":\"npm-run-all --print-label --print-name build:itowns:*\",\"build:itowns:dev\":\"webpack --config build/webpack/webpack.config.itowns --mode=development\",\"build:itowns:prod\":\"webpack --config build/webpack/webpack.config.itowns --mode=production\",\"build:itowns:src\":\"webpack --config build/webpack/webpack.config.itowns --mode=none\",\"build:ol\":\"npm-run-all --print-label --print-name build:ol:*\",\"build:ol:dev\":\"webpack --config build/webpack/webpack.config.openlayers --mode=development\",\"build:ol:prod\":\"webpack --config build/webpack/webpack.config.openlayers --mode=production\",\"build:ol:src\":\"webpack --config build/webpack/webpack.config.openlayers --mode=none\",\"build:ol-modules\":\"npm-run-all --print-label --print-name build:ol-modules:*\",\"build:ol-modules:dev\":\"webpack --config build/webpack/webpack.config.openlayers.modules --mode=development\",\"build:ol-modules:prod\":\"webpack --config build/webpack/webpack.config.openlayers.modules --mode=production\",\"build:ol-modules:src\":\"webpack --config build/webpack/webpack.config.openlayers.modules --mode=none\",\"build:leaflet\":\"npm-run-all --print-label --print-name build:leaflet:*\",\"build:leaflet:dev\":\"webpack --config build/webpack/webpack.config.leaflet --mode=development\",\"build:leaflet:prod\":\"webpack --config build/webpack/webpack.config.leaflet --mode=production\",\"build:leaflet:src\":\"webpack --config build/webpack/webpack.config.leaflet --mode=none\",\"build:leaflet-modules\":\"npm-run-all --print-label --print-name build:leaflet-modules:*\",\"build:leaflet-modules:dev\":\"webpack --config build/webpack/webpack.config.leaflet.modules --mode=development\",\"build:leaflet-modules:prod\":\"webpack --config build/webpack/webpack.config.leaflet.modules --mode=production\",\"build:leaflet-modules:src\":\"webpack --config build/webpack/webpack.config.leaflet.modules --mode=none\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/IGNF/geoportal-extensions.git\"},\"author\":\"IGNF\",\"keywords\":[\"geoportail\",\"javascript\",\"OpenLayers\",\"Leaflet\",\"Itowns\",\"3D\"],\"license\":\"CECILL-B\",\"bugs\":{\"url\":\"https://github.com/IGNF/geoportal-extensions/issues\"},\"homepage\":\"https://github.com/IGNF/geoportal-extensions#readme\",\"dependencies\":{\"@mapbox/mapbox-gl-style-spec\":\"13.20.1\",\"eventbusjs\":\"0.2.0\",\"geoportal-access-lib\":\"3.2.0\",\"itowns\":\"2.38.2\",\"leaflet\":\"1.7.1\",\"leaflet-draw\":\"1.0.4\",\"loglevel\":\"^1.6.7\",\"markdown-toc\":\"^1.2.0\",\"ol\":\"6.9.0\",\"ol-mapbox-style\":\"6.7.0\",\"proj4\":\"2.7.5\",\"proj4leaflet\":\"1.0.2\",\"sortablejs\":\"1.14.0\",\"three\":\"0.137.5\",\"typescript\":\"^4.5.5\",\"whatwg-fetch\":\"3.0.0\"},\"devDependencies\":{\"@babel/core\":\"^7.4.4\",\"@babel/plugin-transform-template-literals\":\"^7.7.4\",\"@babel/preset-env\":\"^7.4.4\",\"babel-loader\":\"^8.0.5\",\"chai\":\"^4.2.0\",\"chalk\":\"^4.0.0\",\"clean-webpack-plugin\":\"^3.0.0\",\"copy-webpack-plugin\":\"^5.0.3\",\"core-js\":\"^3.6.4\",\"css-loader\":\"^3.4.2\",\"eslint\":\"^6.8.0\",\"eslint-config-standard\":\"^14.1.1\",\"eslint-loader\":\"^4.0.0\",\"eslint-plugin-import\":\"^2.17.2\",\"eslint-plugin-node\":\"^11.1.0\",\"eslint-plugin-promise\":\"^4.1.1\",\"eslint-plugin-standard\":\"^4.0.0\",\"exports-loader\":\"^0.7.0\",\"expose-loader\":\"^0.7.5\",\"fs-extra\":\"^9.0.0\",\"handlebars\":\"^4.7.5\",\"handlebars-layouts\":\"^3.1.4\",\"html-webpack-plugin\":\"^4.0.4\",\"jsdoc-webpack-plugin\":\"^0.3.0\",\"mini-css-extract-plugin\":\"^0.9.0\",\"mocha\":\"^7.1.1\",\"mocha-loader\":\"^5.0.0\",\"npm-run-all\":\"^4.1.5\",\"optimize-css-assets-webpack-plugin\":\"^5.0.1\",\"path\":\"^0.12.7\",\"replace-bundle-webpack-plugin\":\"^1.0.0\",\"requirejs\":\"^2.3.6\",\"responsive-loader\":\"^1.2.0\",\"speed-measure-webpack-plugin\":\"^1.3.0\",\"string-template\":\"^1.0.0\",\"style-loader\":\"^1.1.3\",\"terser-webpack-plugin\":\"^2.0.0\",\"url-loader\":\"^4.0.0\",\"webpack\":\"^4.30.0\",\"webpack-cli\":\"^3.3.1\",\"webpack-dev-server\":\"^3.3.1\",\"webpack-node-externals\":\"^1.7.2\"}}");

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var geoportal_access_lib_src_Utils_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _LayerEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(129);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(130);
var _package_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(130, 1);
/**
* desativation JSHINT
* W106 - Identifier '_geoportal_id' is not in camel case
*/



 // package.json (extract version)


var logger = _Common_Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__["default"].getLogger("wmts");
/**
 * @namespace
 * @alias L.geoportalLayers.WMTS
 * @classdesc
 *
 * Leaflet Layer Class for Geoportal WMTS Layers.
 *
 * Use {@link module:Layers.WMTS L.geoportalLayer.WMTS()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#tilelayer" target="_blank">L.TileLayer</a> native class.
 *
 */

var WMTS = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.extend(
/** @lends WMTS.prototype */
{
  includes: _LayerEvent__WEBPACK_IMPORTED_MODULE_3__["default"],
  defaultWmtsParams: {
    service: "WMTS",
    request: "GetTile",
    version: "1.0.0",
    layer: "",
    style: "",
    tilematrixset: "PM",
    format: "image/jpeg"
  },

  /**
   *
   * @constructor
   * @param {String} url - url service
   * @param {Object} options - options for function call.
   * @param {Array} [options.originators] - originators
   * @param {Array} [options.legends] - legends
   * @param {Array} [options.metadata] - metadata
   * @param {String} [options.title] - title
   * @param {String} [options.description] - description
   * @param {String} [options.quicklookUrl] - quicklookUrl
   * @param {Object} options.paramsWmts - WMTS options
   * @param {String} options.paramsWmts.service - "WMTS",
   * @param {String} options.paramsWmts.request - "GetTile",
   * @param {String} options.paramsWmts.version - "1.0.0",
   * @param {String} options.paramsWmts.layer - "",
   * @param {String} options.paramsWmts.style - "",
   * @param {String} options.paramsWmts.tilematrixset - "PM",
   * @param {String} options.paramsWmts.format - "image/jpeg"
   * @param {Object} [options.paramsNative] - other options for L.TileLayer function (see {@link http://leafletjs.com/reference.html#tilelayer-options})
   * @example
   * var wmts = new WMTS("http://wxs.ign.fr/jhyvi0fgmnuxvfv0zjzorvdn/geoportail/wmts", {
   *     paramsNative : {
   *         minZoom : 1,
   *         maxZoom : 21
   *     },
   *     paramsWmts   : {
   *         layer   : "ORTHOIMAGERY.ORTHOPHOTOS",
   *         style   : "normal",
   *         format  : "image/jpeg",
   *         version : "1.0.0",
   *         tilematrixset : "PM"
   *     },
   *     originators  : [],
   *     legends      : [],
   *     metadata     : [],
   *     title        : "",
   *     description  : "",
   *     quicklookUrl : ""
   * });
   *
   * @ignore
   */
  initialize: function initialize(url, options) {
    logger.log("initialize"); // parametres WMTS

    this._wmtsParams = {};
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.extend(this._wmtsParams, this.defaultWmtsParams, options.paramsWmts); // appel du constructeur de la classe étendue

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.prototype.initialize.call(this, // tracker extension leaflet
    // FIXME : gp-ext version en mode AMD
    geoportal_access_lib_src_Utils_Helper__WEBPACK_IMPORTED_MODULE_0__["default"].normalyzeUrl(url, {
      "gp-leaflet-ext": _package_json__WEBPACK_IMPORTED_MODULE_4__.leafletExtVersion || _package_json__WEBPACK_IMPORTED_MODULE_4__.version
    }, false), options.paramsNative); // sauvegarde des originators

    this._originators = options.originators;
    this._legends = options.legends;
    this._metadata = options.metadata;
    this._title = options.title;
    this._description = options.description;
    this._quicklookUrl = options.quicklookUrl; // id du Layer

    this._geoportal_id = 0; // FIXME L.stamp(this);
  },

  /**
   * event 'onAdd'
   * (overwritten)
   *
   * @param {Object} map - map leaflet object
   * @private
   */
  onAdd: function onAdd(map) {
    logger.trace("onAdd layer", this._geoportal_id); // recuperation de la map

    this._map = map; // enregistrement de l'id Geoportal

    this._geoportal_id = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.stamp(this); // appel de la methode de la classe étendue

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.prototype.onAdd.call(this, map);
    this.setVisible(true); // y a t il des attributions/originators pour ce layer ?

    this.updateAttributions(map);
    /**
     * Evenement sur l'ajout du layer sur la carte avec gestion des deplacements (zoom)
     * Les deplacemnts sur la carte permettent de mettre à jour la liste des attributions.
     */

    map.on({
      /**
       * Permet de desactiver la visibilité des attributions sur le retrait
       * d'un layer de type overlay.
       * Les attributions ne doivent plus apparaitre si le layer est invisible !
       */
      overlayremove: this._onRemoveLayer,

      /**
       * Permet d'activer la visibilité des attributions sur l'ajout
       * d'un layer de type overlay.
       * Les attributions doivent apparaitre si le layer est visible !
       */
      overlayadd: this._onAddLayer,

      /**
       * Permet de desactiver la visibilité des attributions sur le retrait
       * d'un layer de type layer.
       * Les attributions ne doivent plus apparaitre si le layer est invisible !
       */
      layerremove: this._onRemoveLayer,

      /**
       * Permet d'activer la visibilité des attributions sur l'ajout
       * d'un layer de type layer.
       * Les attributions doivent apparaitre si le layer est visible !
       */
      layeradd: this._onAddLayer,

      /**
       * Permet d'ajouter des fonctionnalités lors de la creation du layer
       * sur les evenements de fin de mouvemenent (move ou zoom)
       */
      moveend: this._onMoveEndLayer
    }, this); // if (map.attributionControl) {
    //     // ceci permet de mofifier le prefixe leaflet !
    //     // ce dernier etant obligatoire...
    //     // Ex. map.attributionControl.setPrefix("Plugin © IGN with Leaflet - 2016");
    //     // map.attributionControl.setPrefix("Leaflet + Géoportail");
    //     map.attributionControl.setPrefix("Plugin © " +
    //         "<a href=\"http://www.ign.fr\" " +
    //         "title=\"Institut national de l'information géographique et forestière\">IGN</a>" +
    //         " with " +
    //         "<a href=\"http://leafletjs.com/\" " +
    //         "title=\"an open-source JavaScript library for mobile-friendly interactive maps\">Leaflet</a>" +
    //         " - 2016");
    // }
  },

  /**
   * event 'onRemove'
   * (overwritten)
   *
   * @param {Object} map - map leaflet object
   * @private
   */
  onRemove: function onRemove(map) {
    logger.trace("onRemove layer", this._geoportal_id); // recuperation de la map

    this._map = map; // appel de la methode de la classe étendue

    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.TileLayer.prototype.onRemove.call(this, map);
    this.setVisible(false); // suppression des attributions

    this.removeAttributions(map); // supprimer les evenements

    map.off({
      overlayremove: this._onRemoveLayer,
      overlayadd: this._onAddLayer,
      layerremove: this._onRemoveLayer,
      layeradd: this._onAddLayer,
      moveend: this._onMoveEndLayer
    }, this);
  },

  /**
   * event 'getTileUrl'
   * (overwritten)
   *
   * @param {Object} tilePoint - Point leaflet object
   *
   * @returns {String} url
   * @private
   */
  getTileUrl: function getTileUrl(tilePoint) {
    // (Point, Number) -> String
    // ex http://wxs.ign.fr/j5tcdln4ya4xggpdu4j0f0cn/geoportail/wmts?
    // SERVICE=WMTS&
    // REQUEST=GetTile&
    // VERSION=1.0.0&
    // LAYER=ORTHOIMAGERY.ORTHOPHOTOS&
    // STYLE=normal&
    // TILEMATRIXSET=PM&
    // TILEMATRIX=2&
    // TILEROW=2&
    // TILECOL=1&
    // FORMAT=image%2Fjpeg
    var zoom = this._getZoomForUrl();

    var url = leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.template(this._url, {
      s: this._getSubdomain(tilePoint)
    });
    return url + leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Util.getParamString(this._wmtsParams, url) + "&tilematrix=" + zoom + "&tilerow=" + tilePoint.y + "&tilecol=" + tilePoint.x;
  },

  /**
   * event 'setParams'
   * (overwritten)
   *
   * @param {Object} params - parameters
   * @param {Object} noRedraw - no redraw
   *
   * @returns {Object} this
   * @private
   */
  setParams: function setParams(params, noRedraw) {
    leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.extend(this._wmtsParams, params);

    if (!noRedraw) {
      this.redraw();
    }

    return this;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (WMTS);

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = L;

/***/ }),

/***/ 34:
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

/***/ 35:
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

/***/ 45:
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

/***/ 50:
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

/***/ 61:
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

/***/ })

/******/ })["default"];