/**
 * @module ColorUtils
 * @alias Gp.ColorUtils
 * @description
 * ...
 *
 * @example
 * arrayTorgba();
 * arrayToHex();
 * rgbaToHex();
 * hexToRgba();
 * isHex();
 * isRGB();
 */
var ColorUtils = {

    /**
     * Number to hex conversion
     *
     * @param {Number} number - 0-255
     * @returns {String} hex value
     */
    hex : function (number) {
        if (number > 255) {
            throw new Error("'" + number + "'' is greater than 255(0xff);");
        }
        var str = Number(number).toString(16);
        return ("0" + str).slice(-2);
    },

    /**
     * Hexa to number conversion
     *
     * @param {*} hexa 00-FF
     * @returns {Number} number value
     */
    num : function (hexa) {
        return parseInt(hexa, 16);
    },

    /**
     * Converts an array ([255,255,255,1]) to rgba string
     *
     * @function arrayToRgba
     * @param {Array} values - array of values
     * @returns {String} A color of RGB or RGBA format
     */
    arrayToRgba : function (values) {
        if (!Array.isArray(values)) {
            throw new Error("Not an array !");
        }
        var red = values[0];
        var green = values[1];
        var blue = values[2];
        var alpha = values[3] || 1;
        var result = "rgba(" + red + ", " + green + ", " + blue + ", " + parseFloat(alpha) + ")";
        return result;
    },

    /**
     * Converts an array ([255,255,255,1]) to #RRGGBBAA
     *
     * @function arrayToHex
     * @param {Array} values - array of values
     * @returns {Object}  hex and opacity formated values
     */
    arrayToHex : function (values) {
        if (!Array.isArray(values)) {
            throw new Error("Not an array !");
        }
        var red = values[0];
        var green = values[1];
        var blue = values[2];
        var alpha = values[3];
        var elems = [this.hex(red), this.hex(green), this.hex(blue)];
        var result = {};
        result.hex = "#" + elems.join("");
        if (alpha) {
            // elems.push(hex(alpha));
            result.opacity = parseFloat(alpha);
        }
        return result;
    },

    /**
     * Converts rgba string to #RRGGBBAA
     * (Code adapted from : https://gist.github.com/mstssk/afda4ce9e5c335fd79cd)
     *
     * @function rgbaToHex
     * @param {String} rgba - A color of RGB or RGBA format.
     * @returns {Object} hex and opacity formated values
     */
    rgbaToHex : function (rgba) {
        var regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0?.?\d+)\s*)?\)/;
        var parsed = regex.exec(rgba);
        if (!parsed) {
            throw new Error("Invalid format: " + rgba);
        }
        var red = parsed[1];
        var green = parsed[2];
        var blue = parsed[3];
        var alpha = parsed[4];
        var elems = [this.hex(red), this.hex(green), this.hex(blue)];
        var result = {};
        result.hex = "#" + elems.join("");
        if (alpha) {
            // elems.push(hex(alpha));
            result.opacity = parseFloat(alpha);
        }
        return result;
    },

    /**
     * Converts hex color and opacity value to rgba string.
     * (Code adapted from : http://stackoverflow.com/a/5624139)
     *
     * @function hexToRgba
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
    },

    /**
     * Determine if value is a correct hexa color.
     * @param {*} value - hex color (#FFFFFF)
     * @returns {Boolean} True if value is a hexa color
     */
    isHex : function (value) {
        if (!value) {
            return false;
        }
        if (value.charAt(0) !== "#") {
            return false;
        }
        var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        var parsed = regex.exec(value);
        if (!parsed) {
            return false;
        }
        return true;
    },

    /**
     * Determine if value is a correct rgba color.
     * @param {*} value - rgba color (rgba(125,125,125,1))
     * @returns {Boolean} True if value is a rgba color
     */
    isRGB : function (value) {
        if (!value) {
            return false;
        }
        var regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0?.?\d+)\s*)?\)/;
        var parsed = regex.exec(value);
        if (!parsed) {
            return false;
        }
        return true;
    }
};

export default ColorUtils;
