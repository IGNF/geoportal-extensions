/**
* desativation JSHINT
* W106 - Identifier '_geoportal_id' is not in camel case
*/
/* jshint -W106 */

import Gp from "geoportal-access-lib";
import L from "leaflet";
import Logger from "../../Common/Utils/LoggerByDefault";
import LayerEvent from "./LayerEvent";
// package.json (extract version)
import Pkg from "../../../package.json";

var logger = Logger.getLogger("wms");

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
var WMS = L.TileLayer.WMS.extend(/** @lends WMS.prototype */ {

    includes : LayerEvent,

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
    initialize : function (url, options) {
        var settings = {};

        L.Util.extend(settings, options.paramsWms, options.paramsNative);

        var urlParams = {
            "gp-leaflet-ext" : Pkg.leafletExtVersion || Pkg.version
        };

        // ajout de l'apiKey en paramètre de la requête si couche à accès restreint
        if (options.apikey) {
            urlParams["apikey"] = options.apikey;
        }

        // appel du constructeur de la classe étendue
        L.TileLayer.WMS.prototype.initialize.call(
            this,
            // tracker extension leaflet
            // FIXME : gp-ext version en mode AMD
            Gp.Helper.normalyzeUrl(url, urlParams, false),
            settings
        );

        // sauvegarde
        this._originators = options.originators;
        this._legends = options.legends;
        this._metadata = options.metadata;
        this._title = options.title;
        this._description = options.description;
        this._quicklookUrl = options.quicklookUrl;

        // init id du Layer
        this._geoportal_id = 0; // FIXME L.stamp(this);
    },

    /**
     * event
     * (overwritten)
     *
     * @param {Object} map - map leaflet object
     * @private
     */
    onAdd : function (map) {
        logger.trace("onAdd layer", this._geoportal_id);

        // recuperation de la map
        this._map = map;

        // enregistrement de l'id Geoportal
        this._geoportal_id = L.stamp(this);

        // appel de la methode de la classe étendue
        L.TileLayer.WMS.prototype.onAdd.call(this, map);

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
             * @private
             */
            overlayremove : this._onRemoveLayer,

            /**
             * Permet d'activer la visibilité des attributions sur l'ajout
             * d'un layer de type overlay.
             * Les attributions doivent apparaitre si le layer est visible !
             * @private
             */
            overlayadd : this._onAddLayer,

            /**
             * Permet de desactiver la visibilité des attributions sur le retrait
             * d'un layer de type layer.
             * Les attributions ne doivent plus apparaitre si le layer est invisible !
             * @private
             */
            layerremove : this._onRemoveLayer,

            /**
             * Permet d'activer la visibilité des attributions sur l'ajout
             * d'un layer de type layer.
             * Les attributions doivent apparaitre si le layer est visible !
             * @private
             */
            layeradd : this._onAddLayer,

            /**
             * Permet d'ajouter des fonctionnalités lors de la creation du layer
             * sur les evenements de fin de mouvemenent (move ou zoom)
             * @private
             */
            moveend : this._onMoveEndLayer

        }, this);

        // if (map.attributionControl) {
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
    onRemove : function (map) {
        logger.trace("onRemove layer", this._geoportal_id);

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
     * event
     * (overwritten)
     *
     * @param {Object} tilePoint - Point object
     *
     * @returns {String} url
     * @private
     */
    getTileUrl : function (tilePoint) {
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

        var bbox = (this._wmsVersion >= 1.3 && lstProjEpsgGeographic.indexOf(this._crs.code) !== -1) ? [se.y, nw.x, nw.y, se.x].join(",") : [nw.x, se.y, se.x, nw.y].join(",");

        var url = L.Util.template(this._url, {
            s : this._getSubdomain(tilePoint)
        });

        return url + L.Util.getParamString(this.wmsParams, url, true) + "&BBOX=" + bbox;
    }

});

export default WMS;
