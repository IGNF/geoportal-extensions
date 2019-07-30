import Logger from "../../Common/Utils/LoggerByDefault";
import {
    TMSSource as ItTMSSource,
    ColorLayer as ItColorLayer
} from "itowns";
/* import Extent from "itowns/Core/Geographic/Extent";
import WMSSource from "itowns/Source/WMSSource";
import ColorLayer from "itowns/Layer/ColorLayer"; */

var logger = Logger.getLogger("vectorTileLayer");

/**
 * @classdesc
 * Geoportal WMTS source creation
 *
 * @constructor
 * @alias itowns.layer.VectorTileLayer
 * @param {Object} options            - options for function call.
 * @param {String} options.style      - Url to the vector Tile json style
 * @param {String} options.url   - Url to the pbf file
 * @param {Object} [options.filter] - Filter applied to the vector layer style
 * @param {Object} [options.attributions] - Atrtributions of the layer
 * @param {Object} [options.zoom] - Between which zoom levels the layer is displayed (zoom.min and zoom.max)
 * @example
 * var vectorTileLayer = new itowns.layer.VectorTileLayer({
 *      style : parsedStyleObject,
 *      url : "./myPBFLayer/${z}/${x}/${y}.pbf"
 * });
 */
function VectorTileLayer (options) {
    if (!(this instanceof VectorTileLayer)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    // check layer params
    if (!options.url) {
        throw new Error("ERROR PARAM_MISSING : url");
    }
    if (typeof options.url !== "string") {
        throw new Error("ERROR WRONG TYPE : url");
    }

    if (typeof options.style !== "object") {
        throw new Error("ERROR WRONG_TYPE : options.style should be an object");
    }

    // filter the layers to display
    var supportedLayers = filterLayers(options.style.layers, options.filter);
    var backgroundLayer;

    function filterLayers(layers, filter) {
        // filter the layers to display
        var supportedLayers = [];
        if (!filter) {
            layers.forEach(function(layer) {
                supportedLayers.push(layer);
            });
        } else {
            layers.forEach(function(layer) {
                supportedLayers.push(layer);
                // if (layer.type === 'background') {
                //     backgroundLayer = layer;
                // } else if (['fill', 'line'].indexOf(layer.type) >= 0 &&
                //     ['landcover', 'water', 'boundary', 'transportation', 'park'].indexOf(layer['source-layer']) >= 0 &&
                //     layer.id.indexOf('bridge') < 0 &&
                //     layer.id.indexOf('tunnel') < 0 &&
                //     layer.id.indexOf('admin_sub') < 0) {
                //     supportedLayers.push(layer);
                // }
            });
        }
        return supportedLayers;
    }

    function inter(z) {
        return z - (z % 5);
    };
    
    function isValidData(data, extentDestination) {
        const isValid = inter(extentDestination.zoom) == inter(data.extent.zoom);
        return isValid;
    };
    
    // create the vector Tile Layer Source
    var mvtSource = new ItTMSSource({
        // eslint-disable-next-line no-template-curly-in-string
        url: options.url,
        format: 'application/x-protobuf;type=mapbox-vector',
        attribution: options.attributions,
        zoom: options.zoom,
        tileMatrixSet: 'PM',
        projection: 'EPSG:3857',
        isInverted: true,
    })

    // Return a styled vector tile layer
    return new ItColorLayer('MVT', {
        isValidData: isValidData,
        source: mvtSource,
        filter: supportedLayers,
        backgroundLayer,
        fx: 2.5,
    });
};

/*
 * Constructor (alias)
 */
VectorTileLayer.prototype.constructor = VectorTileLayer;

export default VectorTileLayer;
