import L from "leaflet";
import Config from "../../Common/Utils/Config";
import Register from "../../Common/Utils/Register";

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
    instance : null,

    /**
     * execution
     *
     * @returns {Object} instance
     * @private
     */
    build : function () {
        // singleton
        if (!this.instance) {
            var crs = new L.Proj.CRS("EPSG:4326",
                Register.get("EPSG:4326"), {
                    resolutions : this._getResolutions(),
                    origin : [-180, 90] // ???
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
    _getResolutions : function () {
        var resolutions = [];
        // FIXME resolutions issues de l'autoconf
        // mais pas celle du TMS WGS84G

        if (Config.isConfigLoaded()) {
            resolutions = Config.getResolutions();
        }

        if (resolutions.length) {
            return resolutions;
        }

        return [
            1.40625,
            0.703125,
            0.3515625,
            0.17578125,
            0.087890625,
            0.0439453125,
            0.02197265625,
            0.010986328125,
            0.0054931640625,
            0.00274658203125,
            0.001373291015625,
            0.0006866455078125,
            0.00034332275390625,
            0.000171661376953126,
            0.0000858306884765628,
            0.0000429153442382813,
            0.0000214576721191407,
            0.0000107288360595703,
            0.00000536441802978517,
            0.00000268220901489259,
            0.0000013411045074463,
            0.000000670552253723145,
            0.00000033527612686157
        ];
    },
    /**
     * origine
     *
     * @private
     */
    _getOrigin : function () {}
};

export default EPSG4326;
