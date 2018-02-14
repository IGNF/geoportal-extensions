/* globals self */
define([
    "ol",
    "gp",
    "Common/Utils",
    "Common/Utils/Config"
], function (
    ol,
    Gp,
    Utils,
    Config
) {

    "use strict";

    /**
     * @classdesc
     * Geoportal tile WMS source creation (inherit from ol.source.TileWMS)
     *
     * @constructor
     * @alias ol.source.GeoportalWMS
     * @extends {ol.source.TileWMS}
     * @param {Object} options            - options for function call.
     * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
     * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
     * @param {String} [options.apiKey]   - Access key to Geoportal platform
     * @param {Object} [options.olParams] - other options for ol.source.TileWMS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.TileWMS.html ol.source.TileWMS})
     * @example
     * var sourceWMS = new ol.source.GeoportalWMS({
     *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
     * });
     */
    function SourceWMS (options) {

        if (!(this instanceof SourceWMS)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // check layer params
        if (!options.layer) {
            throw new Error("ERROR PARAM_MISSING : layer");
        }
        if ( typeof options.layer !== "string" ) {
            throw new Error("ERROR WRONG TYPE : layer");
        }

        // par defaut
        if ( typeof options.ssl === "undefined" ) {
            options.ssl = false;
        }

        // Check if configuration is loaded
        if ( !Config.isConfigLoaded() ) {
            throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
        }

        var layerId = Config.getLayerId(options.layer, "WMS");

        if ( layerId && Config.configuration.getLayerConf(layerId) ) {
            var wmsParams = Config.getLayerParams(options.layer, "WMS", options.apiKey);

            // gestion de mixContent dans l'url du service...
            var ctx = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
            var protocol = (ctx) ?
                (ctx.location && ctx.location.protocol && ctx.location.protocol.indexOf("https:") === 0 ? "https://" : "http://") :
                (options.ssl ? "https://" : "http://");

            var wmsSourceOptions = {
                // tracker extension ol3
                // FIXME : gp-ext version en mode AMD
                url : Gp.Helper.normalyzeUrl(wmsParams.url.replace(/(http|https):\/\//, protocol),{
                    "gp-ol3-ext" : "__GPOL3EXTVERSION__"
                },false),
                params : {
                    SERVICE : "WMS",
                    LAYERS : options.layer,
                    VERSION : wmsParams.version,
                    STYLES : wmsParams.styles,
                    FORMAT : wmsParams.format
                }
                // ,
                // attributions : [
                //     new ol.Attribution({
                //         html : "<a class='gp-control-attribution-link' target='_blank' href='http://www.ign.fr'><img class='gp-control-attribution-image' src='http://wxs.ign.fr/static/logos/IGN/IGN.gif' title='Institut national de l\'information géographique et forestière' style='height: 30px; width: 30px;'></a>"
                //     })
                // ]
            };

            // récupération des autres paramètres passés par l'utilisateur
            Utils.mergeParams(wmsSourceOptions, options.olParams);

            // returns a WMS object, that inherits from ol.source.TileWMS.
            ol.source.TileWMS.call(this, wmsSourceOptions);

            // save originators (to be updated by Originators control)
            this._originators = wmsParams.originators;

            // save legends and metadata (to be added to LayerSwitcher control)
            this._legends = wmsParams.legends;
            this._metadata = wmsParams.metadata;
            this._title = wmsParams.title;
            this._description = wmsParams.description;
            this._quicklookUrl = wmsParams.quicklookUrl;

        } else {
            // If layer is not in Gp.Config
            console.log("[source WMS] ERROR : " + options.layer + " cannot be found in Geoportal Configuration. Make sure that this resource is included in your contract key.");
            return new ol.source.TileWMS({});
        }

    }

    // Inherits from ol.source.TileWMS
    ol.inherits(SourceWMS, ol.source.TileWMS);

    /*
     * @lends module:SourceWMS
     */
    SourceWMS.prototype = Object.create(ol.source.TileWMS.prototype, {});

    /*
     * Constructor (alias)
     */
    SourceWMS.prototype.constructor = SourceWMS;

    return SourceWMS;
});
