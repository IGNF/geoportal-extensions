define([
    "Vg/Layers/LayerConfig",
    "woodman"
], function (
    LayerConfig,
    woodman
) {

    "use strict";

    /**
    * Layers Factory on the type of components such as WMS and WMTS
    *
    * @module Layers
    * @alias VirtualGeo.geoportalLayer
    * @example
    * var layer = VirtualGeo.geoportalLayer.WMTS({
    *      layer : "ORTHOIMAGERY.ORTHOPHOTOS",
    *      apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
    * });
    */
    var Layers = {

        options : {},
        params : {},

        serviceUrl : "http://localhost?no-rights-found-for=[{layer}]",

        /**
        * initialize logger
        */
        _initLogger : function () {
            woodman.load("console");
        },

        /**
        * initialize options
        */
        _initOptions : function () {

            if (!this.options || Object.keys(this.options) === 0) {
                throw new Error("PARAM_MISSING : options !");
            }

            if (!this.options.layer) {
                throw new Error("PARAM_MISSING : layer !");
            }

            // FIXME est ce utile de le preciser ?
            if (!this.options.apiKey) {
                console.log("PARAM_MISSING : apiKey !");
            }

        },

        /**
        * initialize parameters
        *
        * @param {String} service - service name, WMS or WMTS
        */
        _initParams : function (service) {

            // par defaut...
            if (!service) {
                service = "WMTS";
            }

            // Gestion de l'autoconf
            this.params = LayerConfig.get({
                key : this.options.apiKey,
                layer : this.options.layer,
                service : service
            });

            if (!this.params || Object.keys(this.params) === 0) {
                this.params = {};
                if (!this.options.apiKey) {
                    // FIXME on retire l'exception...
                    console.log("WARNING PARAM_MISSING : parameter 'apiKey' must be mandatory if the contract key configuration has not been loaded !");
                }
            }
        },

        /**
        * Access to WMS Geoportal Layer.
        * Using [Auto-configuration service]{@link http://api.ign.fr/tech-docs-js/developpeur/geodrm.html#Available_resources_-_APIs_autoconfiguration} of the Geoportal platform.
        *
        * @method WMS
        * @alias VirtualGeo.geoportalLayer.WMS
        * @extends {VirtualGeo.ImageryLayer.WMS}
        * @param {Object} options - options for function call.
        * @param {String} options.layer - layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
        * @param {String} [options.apiKey] - access key to Geoportal platform, obtained [here]{@link http://professionnels.ign.fr/geoservices-ign}.
        * @param {Object} [settings] - other options for Virtual.ImageryLayer.WMS function (see {@link http://leafletjs.com/reference.html#tilelayer-wms-options})
        * @returns {WMS}
        * @example
        *  var map = new VirtualGeo.Map(options);
        *  var lyr = VirtualGeo.geoportalLayer.WMS(
        *    {
        *      layer : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO",
        *      apiKey : "wqxljfvklsdhvlfkjqfmlq787645"
        *    },
        *    {
        *      attribution : "test for layer ORTHOIMAGERY",
        *      opacity : 1,
        *      transparent : true,
        *      ...
        *    });
        *
        *  map.addImageryLayer(lyr);
        */
        WMS : function (options, settings) {

            // gestion du logger
            this._initLogger();
            var logger = woodman.getLogger("layers-wms");

            /** options du plugins */
            this.options  = options  || {};

            // gestion des options
            this._initOptions();

            /** options natives de Leaflet */
            this.settings = settings || {};

            // gestion de l'autoconf
            this._initParams("WMS");
            logger.log(this.params);

            // url du service (par defaut)
            var serviceUrl = null;
            if (this.params.key || this.options.apiKey) {
                serviceUrl = this.params.url;
            } else {
                // pas d'autoconf, ni de clef API !
                // on évite l'exception en envoyant les requêtes vers localhost...
                console.log("ERREUR FIXME");
                /*serviceUrl = L.Util.template(this.serviceUrl, {
                layer : this.options.layer
            });*/
            }

            // params du service WMS (par defaut)
            var paramsWms = {
                layer   : this.options.layer,
                style   : this.params.styles  || "normal",
                mimeType  : this.params.format  || "image/png",
                version : this.params.version || "1.3.0"
            };

            var wmsGeoportalLayer = {
                protocol : "wms",
                id : paramsWms.layer,
                url : serviceUrl,
                wmsOptions : {
                    name : paramsWms.layer,
                    mimeType : paramsWms.format,
                    style : paramsWms.style,
                    version : paramsWms.version
                },
                title : this.params.title || "",
                description  : this.params.description || "",
                quicklookUrl : this.params.quicklookUrl || "",
                originators  : this.params.originators || [],
                legends      : this.params.legends || [],
                metadata     : this.params.metadata || []
            };

            return wmsGeoportalLayer;

        },

        /**
        * Access to WMTS Layer
        * Using [Auto-configuration service]{@link http://api.ign.fr/tech-docs-js/developpeur/geodrm.html#Available_resources_-_APIs_autoconfiguration} of the Geoportal platform.
        *
        * @method WMTS
        * @alias VirtualGeo.VirtualGeo.WMTS
        * @extends {VirtualGeo.ImageryLayer}
        * @param {Object} options - options for function call.
        * @param {String} options.layer - layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
        * @param {String} [options.apiKey] - access key to Geoportal platform, obtained [here]{@link http://professionnels.ign.fr/geoservices-ign}.
        * @param {Object} [settings] - other options for VirtualGeo.addImageryLayer function (see {@link http://leafletjs.com/reference.html#tilelayer-options})
        * @returns {WMTS}
        * @example
        *  var map = new VirtualGeo.Map(options);
        *  var lyr = VirtualGeo.geoportalLayer.WMTS(
        *    {
        *      layer : "ORTHOIMAGERY.ORTHOPHOTOS",
        *      apiKey : "wqxljfvklsdhvlfkjqfmlq787645"
        *    },
        *    {
        *      attribution : "test for layer ORTHOIMAGERY",
        *      opacity : 1,
        *      transparent : true,
        *      ...
        *    });
        *
        *  map.addImageryLayer(lyr);
        */
        WMTS : function (options, settings) {
            // gestion du logger
            this._initLogger();
            var logger = woodman.getLogger("layers-wmts");

            /** options du plugins */
            this.options  = options  || {};

            // gestion des options
            this._initOptions();

            /** options natives de Leaflet */
            this.settings = settings || {};

            // gestion de l'autoconf
            this._initParams("WMTS");
            logger.log(this.params);

            // url du service (par defaut)
            var serviceUrl = null;
            if (this.params.key || this.options.apiKey) {
                serviceUrl = this.params.url;
            } else {
                // FIXME pas d'autoconf, ni clef API !
                // on évite l'exception en envoyant les requêtes vers localhost
                console.log("ERROR FIXME");
                /* serviceUrl = L.Util.template(this.serviceUrl, {
                layer : this.options.layer
            }); */
            }

            // params du service WMTS (par defaut)
            var paramsWmts = {
                layer   : this.options.layer,
                style   : this.params.styles  || "normal",
                format  : this.params.format  || "image/png",
                version : this.params.version || "1.0.0",
                tilematrixset : this.params.TMSLink || "WGS84G",
                tmslimits : this.params.tileMatrixSetLimits
            };

            var wmtsGeoportalLayer = {
                protocol : "wmts",
                id : paramsWmts.layer,
                url : serviceUrl,
                wmtsOptions : {
                    name : paramsWmts.layer,
                    mimeType : paramsWmts.format,
                    tileMatrixSet : paramsWmts.tilematrixset,
                    tileMatrixSetLimits : paramsWmts.tmslimits,
                    style : paramsWmts.style,
                    version : paramsWmts.version
                },
                title : this.params.title || "",
                description  : this.params.description || "",
                quicklookUrl : this.params.quicklookUrl || "",
                originators  : this.params.originators || [],
                legends      : this.params.legends || [],
                metadata     : this.params.metadata || []
            };

            // On regarde le format : si c'est un MNT, on ajoute un nodatavalue
            // par défaut
            if (this.params.format === "image/x-bil;bits=32") {
                wmtsGeoportalLayer.noDataValue = "-99999";
            }

            return wmtsGeoportalLayer;
        }

    };

    return Layers;
});
