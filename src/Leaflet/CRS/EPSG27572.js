import L from "leaflet";
import Config from "../../Common/Utils/Config";
import Register from "../../Common/Utils/Register";

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
            var crs = new L.Proj.CRS("EPSG:27572",
                Register.get("EPSG:27572"), {
                    resolutions : this._getResolutions(),
                    origin : this._getOrigin()
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
        // resolutions issues de la configuration
        if (Config.isConfigLoaded()) {
            var o = Config.configuration.getTMSConf("LAMB2E");
            if (o && Object.keys(o).length) {
                resolutions = o.nativeResolutions;
            }
        }

        if (resolutions.length) {
            return resolutions;
        }

        // FIXME resolution par defaut ???
        return [
            104579.22454989408,
            52277.53235379051,
            26135.487078595408,
            13066.891381800004,
            6533.228604113456,
            3266.5595244626675,
            1633.2660045974187,
            816.6295549860224,
            408.31391467683596,
            204.15674151090204,
            102.07831678324082,
            51.0391448966112,
            25.519569074269395,
            12.759783693647506,
            6.379891635966491,
            3.18994576530532,
            1.5949728694977277,
            0.7974864315474559,
            0.398743214900604,
            0.19937160727567999,
            0.099685803696052,
            0.049842901818919996
        ];
    },

    /**
     * origine
     *
     * @returns {Number[]} origin
     * @private
     */
    _getOrigin : function () {
        return [0, 12000000];
    }
};

export default EPSG27572;
