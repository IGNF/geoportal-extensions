import ol from "ol";
import Gp from "gp";
import Utils from "../../Common/Utils";

/**
 * @classdesc
 *
 * Extended ol.source.WMTS.
 *
 * @constructor
 * @extends {ol.source.WMTS}
 * @alias ol.source.WMTSExtended
 * @param {Object} options - Options
 */
function WMTS (options) {
    if (!(this instanceof WMTS)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    // call constructor
    ol.source.WMTS.call(this,
        options
    );
}

// Inherits
ol.inherits(WMTS, ol.source.WMTS);

/*
 * @lends module:KML
 */
WMTS.prototype = Object.create(ol.source.WMTS.prototype, {});

/**
 * Constructor (alias)
 */
WMTS.prototype.constructor = WMTS;

/**
 * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
 * projection. Return `undefined` if the GetFeatureInfo URL cannot be
 * constructed.
 * @param {ol.Coordinate} coordinate - Coordinate.
 * @param {Number} resolution - Resolution.
 * @param {ol.proj.Projection} projection - Projection.
 * @param {!Object} params - GetFeatureInfo params. `INFOFORMAT` at least should
 *     be provided.
 * @return {String|undefined} GetFeatureInfo URL.
 */
WMTS.prototype.getGetFeatureInfoUrl = function (coordinate, resolution, projection, params) {
    var pixelRatio = (this.option && this.options.tilePixelRatio) ? this.options.tilePixelRatio : 1;

    var tileGrid = this.tileGrid;
    var tileCoord = this.tileGrid.getTileCoordForCoordAndResolution(coordinate, resolution);

    // this code is duplicated from createFromWMTSTemplate function
    var getTransformedTileCoord = function (tileCoord, tileGrid, projection) {
        var tmpTileCoord = [0, 0, 0]; /* Note : [z(zoomLevel),x,y] */
        var tmpExtent = ol.extent.createEmpty();
        var x = tileCoord[1];
        var y = -tileCoord[2] - 1;
        var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
        var projectionExtent = projection.getExtent();
        var extent = projectionExtent;

        if (extent != null && projection.isGlobal() && extent[0] === projectionExtent[0] && extent[2] === projectionExtent[2]) {
            var numCols = Math.ceil(ol.extent.getWidth(extent) / ol.extent.getWidth(tileExtent));
            x = x % numCols;
            tmpTileCoord[0] = tileCoord[0];
            tmpTileCoord[1] = x;
            tmpTileCoord[2] = tileCoord[2];
            tileExtent = tileGrid.getTileCoordExtent(tmpTileCoord, tmpExtent);
        }
        if (!ol.extent.intersects(tileExtent, extent) /* || ol.extent.touches(tileExtent, extent) */) {
            return null;
        }
        return [tileCoord[0], x, y];
    };

    var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
    var transformedTileCoord = getTransformedTileCoord(tileCoord, tileGrid, projection);

    if (tileGrid.getResolutions().length <= tileCoord[0]) {
        return undefined;
    }

    var tileResolution = tileGrid.getResolution(tileCoord[0]);
    var tileMatrix = tileGrid.getMatrixIds()[tileCoord[0]];

    var baseParams = {
        SERVICE : "WMTS",
        VERSION : "1.0.0",
        REQUEST : "GetFeatureInfo",
        LAYER : this.getLayer(),
        TILECOL : transformedTileCoord[1],
        TILEROW : transformedTileCoord[2],
        TILEMATRIX : tileMatrix,
        TILEMATRIXSET : this.getMatrixSet(),
        FORMAT : this.getFormat() || "image/png",
        STYLE : this.getStyle() || "normal"
    };

    Utils.assign(baseParams, params);

    /* var tileSize = tileGrid.getTileSize();
    var x = Math.floor(tileSize*((coordinate[0]-tileExtent[0])/(tileExtent[2]-tileExtent[0])));
    var y = Math.floor(tileSize*((tileExtent[3]-coordinate[1])/(tileExtent[3]-tileExtent[1]))); */

    var x = Math.floor((coordinate[0] - tileExtent[0]) / (tileResolution / pixelRatio));
    var y = Math.floor((tileExtent[3] - coordinate[1]) / (tileResolution / pixelRatio));

    baseParams["I"] = x;
    baseParams["J"] = y;

    var url = this.urls[0];

    var featureInfoUrl = Gp.Helper.normalyzeUrl(url, baseParams);

    return featureInfoUrl;
};

export default WMTS;
