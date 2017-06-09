define([], function () {

    "use strict";

    var MathUtils = {
        /**
         * Reste de la division euclidienne
         * @param {Number} a - divisor
         * @param {Number} b - quotient
         * @returns {Number}
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
         * @returns {Object}
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
        }
    };

    return MathUtils;
});