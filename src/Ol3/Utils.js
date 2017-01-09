define([
    "ol",
    "gp"
], function (
    ol,
    Gp
) {

    "use strict";

    var Utils = {

        /**
         *  Copies all source object members to dest
         *
         * @param {Object} dest - destination object where properties and method will be copied
         * @param {Object} source - source object from which properties and method will be copied
         * @returns {Object} dest
         */
        assign : function (dest, source) {
            dest = dest || {};
            for ( var prop in source ) {
                if ( source.hasOwnProperty(prop) ) {
                    dest[prop] = source[prop];
                }
            }
            return dest;
        },

        /**
         * Merge two objects parameters (deeper than assign)
         *
         * @param {Object} dest   - destination object where properties and method will be merge
         * @param {Object} source - source object from which properties and method will be merge
         */
        mergeParams : function (dest, source) {
            if ( !dest || !source ) {
                return;
            }
            for ( var param in source ) {
                if ( source.hasOwnProperty(param) ) {
                    if ( typeof source[param] === "object" ) {
                        if ( dest.hasOwnProperty(param) ) {
                            this.mergeParams( dest[param], source[param] );
                        } else {
                            dest[param] = source[param];
                        }
                    } else {
                        dest[param] = source[param];
                    }
                }
            }
        },

        /**
         * this method is called by the constructor.
         * this information is useful to switch to touch mode.
         * Detection : test for desktop or tactile
         *
         * @returns {Boolean} isDesktop - true for desktop userAgent, false for mobile
         */
        detectSupport : function () {

            var isDesktop = true;
            var userAgent = window.navigator.userAgent.toLowerCase();

            if (userAgent.indexOf("iphone") !== -1 ||
                userAgent.indexOf("ipod") !== -1 ||
                userAgent.indexOf("ipad") !== -1 ||
                userAgent.indexOf("android") !== -1 ||
                userAgent.indexOf("mobile") !== -1 ||
                userAgent.indexOf("blackberry") !== -1 ||
                userAgent.indexOf("tablet") !== -1 ||
                userAgent.indexOf("phone") !== -1 ||
                userAgent.indexOf("touch") !== -1 ) {
                isDesktop = false;
            }

            if (userAgent.indexOf("msie") !== -1 ||
                userAgent.indexOf("trident") !== -1) {
                isDesktop = true;
            }

            return isDesktop;
        },

        /**
         * Returns id of OL3 obj (based on closure_uid_xxx property)
         *
         * @param {Object} ol3obj - OL3 object
         * @returns {String} - id of OL3 Object. Null if not found.
         */
        getOL3ObjectId : function (ol3obj) {
            var id = null ;
            if (!ol3obj) {
                return ;
            }
            for (var key in ol3obj) {
                if ( typeof(key) !== "string" || key.indexOf("closure_uid") < 0) {
                    continue ;
                }
                // on a trouvé :
                return ol3obj[key] ;
            }
            return id ;
        },

        /**
        * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
        * projection. Return `undefined` if the GetFeatureInfo URL cannot be
        * constructed.
        * @param {ol.Source.WMTS} source - Source.
        * @param {ol.Coordinate} coordinate - Coordinate.
        * @param {Number} resolution - Resolution.
        * @param {ol.proj.Projection} projection - Projection.
        * @param {!Object} params - GetFeatureInfo params. `INFOFORMAT` at least should
        *     be provided.
        * @return {String|undefined} GetFeatureInfo URL.
        */
        getGetFeatureInfoUrl : function (source, coordinate, resolution, projection, params) {

            var pixelRatio = (source.option && source.options.tilePixelRatio) ? source.options.tilePixelRatio : 1;

            var tileGrid = source.tileGrid;
            var tileCoord = source.tileGrid.getTileCoordForCoordAndResolution(coordinate, resolution);

            /**
            * this code is duplicated from createFromWMTSTemplate function
            */
            var getTransformedTileCoord = function (tileCoord, tileGrid, projection) {
                var tmpTileCoord = [0,0,0]; /*Note : [z(zoomLevel),x,y]*/
                var tmpExtent = ol.extent.createEmpty();
                var x = tileCoord[1];
                var y = -tileCoord[2] - 1;
                var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
                var projectionExtent = projection.getExtent();
                var extent = projectionExtent;

                if (  extent != null  && projection.isGlobal() && extent[0] === projectionExtent[0] && extent[2] === projectionExtent[2]) {
                    var numCols = Math.ceil(ol.extent.getWidth(extent) / ol.extent.getWidth(tileExtent));
                    x = x % numCols;
                    tmpTileCoord[0] = tileCoord[0];
                    tmpTileCoord[1] = x;
                    tmpTileCoord[2] = tileCoord[2];
                    tileExtent = tileGrid.getTileCoordExtent(tmpTileCoord, tmpExtent);
                }
                if (!ol.extent.intersects(tileExtent, extent) /*|| ol.extent.touches(tileExtent, extent) */) {
                    return null;
                }
                return [tileCoord[0], x, y];
            };

            var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
            var transformedTileCoord = getTransformedTileCoord(tileCoord,tileGrid, projection);

            if (tileGrid.getResolutions().length <= tileCoord[0]) {
                return undefined;
            }

            var tileResolution = tileGrid.getResolution(tileCoord[0]);
            var tileMatrix = tileGrid.getMatrixIds()[tileCoord[0]];

            var baseParams = {
                SERVICE : "WMTS",
                VERSION : "1.0.0",
                REQUEST : "GetFeatureInfo",
                LAYER : source.getLayer(),
                TILECOL : transformedTileCoord[1],
                TILEROW : transformedTileCoord[2],
                TILEMATRIX : tileMatrix,
                TILEMATRIXSET : source.getMatrixSet(),
                FORMAT : source.getFormat() || "image/png",
                STYLE : source.getStyle() || "normal"
            };

            this.assign(baseParams, params);

            /*var tileSize = tileGrid.getTileSize();
            var x = Math.floor(tileSize*((coordinate[0]-tileExtent[0])/(tileExtent[2]-tileExtent[0])));
            var y = Math.floor(tileSize*((tileExtent[3]-coordinate[1])/(tileExtent[3]-tileExtent[1])));*/

            var x = Math.floor((coordinate[0] - tileExtent[0]) / (tileResolution / pixelRatio));
            var y = Math.floor((tileExtent[3] - coordinate[1]) / (tileResolution / pixelRatio));

            baseParams["I"] = x;
            baseParams["J"] = y;

            var url = source.urls[0];

            var featureInfoUrl = Gp.Helper.normalyzeUrl(url, baseParams);

            return featureInfoUrl;
        }

    };

    return Utils;

});
