/**
 * desativation JSHINT
 * W106 - Identifier '_geoportal_id' is not in camel case
 */

 /*jshint -W106 */
 
define([
    "leaflet",
    "gp",
    "woodman",
    "Leaflet/Layers/LayerEvent"
],
function (L, Gp, woodman, LayerEvent) {

    "use strict";

    var logger = woodman.getLogger("wmts");

   /**
    * @namespace
    * @alias L.geoportalLayer.WMTS
    * @classdesc
    *
    * Leaflet Layer Class for Geoportal WMTS Layers.
    *
    * Use {@link module:Layers.WMTS L.geoportalLayer.WMTS()} factory to create instances of that class.
    *
    * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#tilelayer" target="_blank">L.TileLayer</a> native class.
    *
    */
    var WMTS = L.TileLayer.extend( /** @lends WMTS.prototype */ {

        includes : LayerEvent,

        defaultWmtsParams : {
            service : "WMTS",
            request : "GetTile",
            version : "1.0.0",
            layer : "",
            style : "",
            tilematrixset : "PM",
            format : "image/jpeg"
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
        initialize : function (url, options) {

            logger.log("initialize");

            // parametres WMTS
            this._wmtsParams = {};
            L.Util.extend(this._wmtsParams, this.defaultWmtsParams, options.paramsWmts);

            // appel du constructeur de la classe étendue
            L.TileLayer.prototype.initialize.call(
                this,
                // tracker extension leaflet
                // FIXME : gp-ext version en mode AMD
                Gp.Helper.normalyzeUrl(url,{
                    "gp-leaflet-ext" : "__GPLEAFLETEXTVERSION__"
                },false),
                options.paramsNative
            );

            // sauvegarde des originators
            this._originators  = options.originators;
            this._legends      = options.legends;
            this._metadata     = options.metadata;
            this._title        = options.title;
            this._description  = options.description;
            this._quicklookUrl = options.quicklookUrl;

            // id du Layer
            this._geoportal_id = 0; // FIXME L.stamp(this);

        },

        /**
         * event 'onAdd'
         * (overwritten)
         *
         * @param {Object} map - map leaflet object
         * @private
        */
        onAdd : function (map) {

            logger.log("onAdd layer", this._geoportal_id);

            // recuperation de la map
            this._map = map;

            // enregistrement de l'id Geoportal
            this._geoportal_id = L.stamp(this);

            // appel de la methode de la classe étendue
            L.TileLayer.prototype.onAdd.call(this, map);

            this.setVisible(true);

            // y a t il des attributions/originators pour ce layer ?
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
                overlayremove : this._onRemoveLayer,

                /**
                 * Permet d'activer la visibilité des attributions sur l'ajout
                 * d'un layer de type overlay.
                 * Les attributions doivent apparaitre si le layer est visible !
                 */
                overlayadd : this._onAddLayer,

                /**
                 * Permet de desactiver la visibilité des attributions sur le retrait
                 * d'un layer de type layer.
                 * Les attributions ne doivent plus apparaitre si le layer est invisible !
                 */
                layerremove : this._onRemoveLayer,

                /**
                 * Permet d'activer la visibilité des attributions sur l'ajout
                 * d'un layer de type layer.
                 * Les attributions doivent apparaitre si le layer est visible !
                 */
                layeradd : this._onAddLayer,

                /**
                 * Permet d'ajouter des fonctionnalités lors de la creation du layer
                 * sur les evenements de fin de mouvemenent (move ou zoom)
                 */
                moveend : this._onMoveEndLayer

            }, this);

            // if (map.attributionControl) {
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
        onRemove : function (map) {

            logger.log("onRemove layer", this._geoportal_id);

            // recuperation de la map
            this._map = map;

            // appel de la methode de la classe étendue
            L.TileLayer.prototype.onRemove.call(this, map);

            this.setVisible(false);

            // suppression des attributions
            this.removeAttributions(map);

            // supprimer les evenements
            map.off({
                overlayremove : this._onRemoveLayer,
                overlayadd : this._onAddLayer,
                layerremove : this._onRemoveLayer,
                layeradd : this._onAddLayer,
                moveend : this._onMoveEndLayer
            }, this);
        },

        /**
         * event 'getTileUrl'
         * (overwritten)
         *
         * @param {Object} tilePoint - Point leaflet object
         * @private
        */
        getTileUrl : function (tilePoint) { // (Point, Number) -> String

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
            var url = L.Util.template(this._url, {
                s : this._getSubdomain(tilePoint)
            });
            return url + L.Util.getParamString(this._wmtsParams, url) +
                "&tilematrix=" + zoom +
                "&tilerow=" + tilePoint.y +
                "&tilecol=" + tilePoint.x;
        },

        /**
         * event 'setParams'
         * (overwritten)
         *
         * @private
        */
        setParams : function (params, noRedraw) {

            L.extend(this._wmtsParams, params);

            if (!noRedraw) {
                this.redraw();
            }

            return this;
        }
    });

    return WMTS;
});
