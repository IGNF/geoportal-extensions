/* globals window, self */
import L from "leaflet";
import Logger from "../../Common/Utils/LoggerByDefault";
import LayerConfig from "./LayerConfig";
import WMS from "./WMS";
import WMTS from "./WMTS";

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
var Layers = {

    options: {},
    params: {},
    protocol: null,

    serviceUrl: "http://localhost?no-rights-found-for=[{layer}]",

    /**
     * initialize options
     */
    _initOptions: function() {

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

        // par defaut
        if (typeof this.options.ssl === "undefined") {
            this.options.ssl = false;
        }

    },

    /**
     * get runtime context
     */
    _initContext: function() {
        var _context = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        var _protocol = (_context) ?
            (_context.location && _context.location.protocol && _context.location.protocol.indexOf("https:") === 0 ? "https://" : "http://") :
            (this.options.ssl ? "https://" : "http://");
        this.protocol = _protocol;
    },

    /**
     * initialize parameters
     *
     * @param {String} service - service name, WMS or WMTS
     */
    _initParams: function(service) {

        // par defaut...
        if (!service) {
            service = "WMTS";
        }

        // Gestion de l'autoconf
        this.params = LayerConfig.get({
            key: this.options.apiKey,
            layer: this.options.layer,
            service: service
        });

        if (!this.params || Object.keys(this.params) === 0) {
            this.params = {};
            if (!this.options.apiKey) {
                // FIXME on retire l'exception...
                console.log("WARNING PARAM_MISSING : parameter 'apiKey' is mandatory if the contract key configuration has not been loaded !");
                return;
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
     * @param {Object} options - options for function call.
     * @param {String} options.layer - layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
     * @param {Boolean} [options.ssl] - if set true, enforce protocol https (only for nodejs)
     * @param {String} [options.apiKey] - access key to Geoportal platform, obtained [here]{@link http://professionnels.ign.fr/ign/contrats}.
     * @param {Object} [settings] - other options for L.TileLayer.WMS function (see {@link http://leafletjs.com/reference.html#tilelayer-wms-options})
     * @returns {L.geoportalLayer.WMS}
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
    WMS: function(options, settings) {

        // gestion du logger
        var logger = Logger.getLogger("layers-wms");

        /** options du plugins */
        this.options = options || {};

        // gestion des options
        this._initOptions();

        /** options natives de Leaflet */
        this.settings = settings || {};

        // env d'execution : browser ou non ?
        this._initContext();

        // gestion de l'autoconf
        this._initParams("WMS");
        logger.log(this.params);

        // url du service
        var serviceUrl = null;
        if (this.params.key || this.options.apiKey) {
            // url de l'autoconf ou le service par defaut
            serviceUrl = this.params.url || L.Util.template("http://wxs.ign.fr/{key}/geoportail/r/wms", {
                key: this.params.key || this.options.apiKey
            });
        } else {
            // pas d'autoconf, ni de clef API !
            // on évite l'exception en envoyant les requêtes vers localhost...
            serviceUrl = L.Util.template(this.serviceUrl, {
                layer: this.options.layer
            });
        }

        // params du service WMS (par defaut)
        var paramsWms = {
            layers: this.options.layer,
            styles: this.params.styles || "normal",
            format: this.params.format || "image/jpeg",
            version: this.params.version || "1.3.0"
        };

        // options natives de leaflet (par defaut)
        var paramsNative = {
            // zoom level
            minZoom: this.params.minZoom || 1,
            maxZoom: this.params.maxZoom || 21
        };

        // merge des autres options natives de leaflet
        L.Util.extend(paramsNative, this.settings);

        return new WMS(
            serviceUrl.replace(/(http|https):\/\//, this.protocol), {
                paramsNative: paramsNative,
                paramsWms: paramsWms,
                originators: this.params.originators || [],
                legends: this.params.legends || [],
                metadata: this.params.metadata || [],
                title: this.params.title || null,
                description: this.params.description || null,
                quicklookUrl: this.params.quicklookUrl || null
            }
        );
    },

    /**
     * Factory function for Geoportal WMTS Layers creation.
     *
     * @method WMTS
     * @static
     * @alias L.geoportalLayer.WMTS
     * @extends {L.TileLayer}
     * @param {Object} options - options for function call.
     * @param {String} options.layer - layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
     * @param {Boolean} [options.ssl] - if set true, enforce protocol https (only for nodejs)
     * @param {String} [options.apiKey] - access key to Geoportal platform, obtained [here]{@link http://professionnels.ign.fr/ign/contrats}.
     * @param {Object} [settings] - other options for L.TileLayer function (see {@link http://leafletjs.com/reference.html#tilelayer-options})
     * @returns {L.geoportalLayer.WMTS}
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
    WMTS: function(options, settings) {

        // gestion du logger
        var logger = Logger.getLogger("layers-wmts");

        /** options du plugins */
        this.options = options || {};

        // gestion des options
        this._initOptions();

        /** options natives de Leaflet */
        this.settings = settings || {};

        // env d'execution : browser ou non ?
        this._initContext();

        // gestion de l'autoconf
        this._initParams("WMTS");
        logger.log(this.params);

        // url du service (par defaut)
        var serviceUrl = null;
        if (this.params.key || this.options.apiKey) {
            serviceUrl = this.params.url || L.Util.template("http://wxs.ign.fr/{key}/geoportail/wmts", {
                key: this.params.key || this.options.apiKey
            });
        } else {
            // FIXME pas d'autoconf, ni clef API !
            // on évite l'exception en envoyant les requêtes vers localhost
            serviceUrl = L.Util.template(this.serviceUrl, {
                layer: this.options.layer
            });
        }

        // params du service WMS (par defaut)
        var paramsWmts = {
            layer: this.options.layer,
            style: this.params.styles || "normal",
            format: this.params.format || "image/jpeg",
            version: this.params.version || "1.0.0",
            tilematrixset: this.params.TMSLink || "PM"
        };

        // options natives de leaflet (par defaut)
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
        };

        // merge des autres options natives de leaflet
        L.Util.extend(paramsNative, this.settings);

        return new WMTS(
            serviceUrl.replace(/(http|https):\/\//, this.protocol), {
                paramsNative: paramsNative,
                paramsWmts: paramsWmts,
                originators: this.params.originators || [],
                legends: this.params.legends || [],
                metadata: this.params.metadata || [],
                title: this.params.title || "",
                description: this.params.description || "",
                quicklookUrl: this.params.quicklookUrl || ""
            }
        );
    }
};

export default Layers;
