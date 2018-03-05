define([
    "leaflet",
    // "proj4",
    // "proj4leaflet",
    "Common/Utils/Config",
    "Common/Utils/Register"
], function (
    L,
    // proj4,
    // Proj4leaflet,
    Config,
    Register
) {

    "use strict";

    /**
     *
     * Projection Lambert 2 étendu
     *
     * @ignore
     * @module EPSG27572
     * @alias EPSG27572
     * @returns {L.Proj.CRS}
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
         * @private
         */
        build : function () {

            // singleton
            if (!this.instance) {
                var crs = new L.Proj.CRS("EPSG:27572",
                    Register.get("EPSG:27572"),
                    {
                        // FIXME issue de l'autoconf cf. nativeResolutions
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
         * @private
         */
        _getResolutions : function () {

            var resolutions = [];
            // resolutions issues de l'autoconf
            if (Config.isConfigLoaded()) {
                var o = Config.getTileMatrix("LAMB2E");
                if (o && Object.keys(o)) {
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
         * @private
         */
        _getOrigin : function () {
            return [0, 12000000];
        }
    };

    return EPSG27572;
});
