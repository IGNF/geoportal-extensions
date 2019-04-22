/**
* @module ColorUtils
* @alias Gp.ColorUtils
* @description
* ...
*
* @example
* rgbaToHex();
* hexToRgba();
*/
var ColorUtils = {
    /**
     * Converts rgba String to #RRGGBBAA
     * (Code adapted from : https://gist.github.com/mstssk/afda4ce9e5c335fd79cd)
     *
     * @param {String} rgba - A color of RGB or RGBA format.
     * @returns {Object} hex and opacity formated values
     */
    rgbaToHex : function (rgba) {
        // number to hex conversion
        function hex (number) {
            if (number > 255) {
                throw new Error("'" + number + "'' is greater than 255(0xff);");
            }
            var str = Number(number).toString(16);
            return ("0" + str).slice(-2);
        }
        var regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0?.?\d+)\s*)?\)/;
        var parsed = regex.exec(rgba);
        if (!parsed) {
            throw new Error("Invalid format: " + rgba);
        }
        var red = parsed[1];
        var green = parsed[2];
        var blue = parsed[3];
        var alpha = parsed[4];
        var elems = [hex(red), hex(green), hex(blue)];
        var result = {};
        result.hex = "#" + elems.join("");
        if (alpha) {
            // elems.push(hex(alpha));
            result.opacity = parseFloat(alpha);
        }
        return result;
    },

    /**
     * Converts hex color and opacity value to rgba String.
     * (Code adapted from : http://stackoverflow.com/a/5624139)
     * @param {String} hex - A color value on RGB format (hexa).
     * @param {Number} opacity - A opacity value.
     * @returns {String} A color of RGB or RGBA format
     */
    hexToRgba : function (hex, opacity) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        if (!hex) {
            throw new Error("Invalid format");
        }
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        rgb = rgb ? {
            r : parseInt(rgb[1], 16),
            g : parseInt(rgb[2], 16),
            b : parseInt(rgb[3], 16)
        } : null;
        var result = rgb ? "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + opacity + ")" : null;
        return result;
    }
};

export default ColorUtils;
