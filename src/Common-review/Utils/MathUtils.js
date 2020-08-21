/**
* @module MathUtils
* @alias Gp.MathUtils
* @description
* ...
*
* @example
* modulo();
* decimalToDMS();
* toInteger();
* isInteger();
* toFloat();
*/
var MathUtils = {
    /**
     * Reste de la division euclidienne
     * @param {Number} a - divisor
     * @param {Number} b - quotient
     * @returns {Number} Modulo
     */
    modulo : function (a, b) {
        var r = a % b;
        return r * b < 0 ? r + b : r;
    },

    /**
     * Transform degrees, minutes, seconds form decimal degrees -
     * Largely inspired by the private function degreesToStringHDMS from ol/coordinate.js
     *
     * @param {Number} degrees - decimal degrees
     * @param {Array} hemispheres - "NS" ou "EO"
     * @param {Number} numDigits - number of digits for seconds
     * @returns {Object} DMS coordinate
     */
    decimalToDMS : function (degrees, hemispheres, numDigits) {
        var normalizedDegrees = this.modulo(degrees + 180, 360) - 180;
        var x = Math.abs(3600 * normalizedDegrees);
        var dflPrecision = numDigits || 0;
        var precision = Math.pow(10, dflPrecision);

        var deg = Math.floor(x / 3600);
        var min = Math.floor((x - deg * 3600) / 60);
        var sec = x - (deg * 3600) - (min * 60);
        sec = Math.ceil(sec * precision) / precision;

        if (sec >= 60) {
            sec = 0;
            min += 1;
        }

        if (min >= 60) {
            min = 0;
            deg += 1;
        }

        var direction = hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
        return {
            d : deg,
            m : min,
            s : sec,
            direction : direction
        };
    },

    /**
     * Converts string to Integer
     *
     * @param {String} s - string number
     * @param {Numeric} base - between 2 and 36
     * @returns {null|Numeric} result
     */
    toInteger : function (s, base) {
        var _base = base || 10;
        var n = parseInt(s, _base);
        if (!isNaN(n) && isFinite(n)) {
            return n;
        }
        return null;
    },

    /**
     * check if s represents an integer
     *
     * @param {String} s - string number
     * @returns {Boolean} is integer
     */
    isInteger : function (s) {
        if (isNaN(s)) {
            return false;
        }

        var v = parseFloat(s);
        return ((v | 0) === v);
    },

    /**
     * Converts s to float
     *
     * @param {String} s - string number
     * @returns {null|Numeric} result
     */
    toFloat : function (s) {
        var n = parseFloat(s);
        if (!isNaN(n) && isFinite(n)) {
            return n;
        }
        return null;
    }
};

export default MathUtils;
