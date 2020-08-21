/**
* implementation :
* cf. http://uihacker.blogspot.fr/2011/07/javascript-formatting-latitudelongitude.html?m=1
* cf. http://andrew.hedges.name/experiments/convert_lat_long/
* FIXME formater la sortie
* cf. http://mottie.github.io/javascript-number-formatter/
* cf. https://github.com/j-/number-formatter
*
*/
/** ... */
var PositionFormater = {

    /** ... */
    NORTH : "N",

    /** ... */
    SOUTH : "S",

    /** ... */
    EAST : "E",

    /** ... */
    WEST : "W",

    /** ... */
    digitSecond : 2,

    /** ... */
    digitDecimal : 5,

    /** ... */
    digitRadian : 8,

    roundToDecimal : function (inputNum, numPoints) {
        var multiplier = Math.pow(10, numPoints);
        return Math.round(inputNum * multiplier) / multiplier;
    },

    decimalToRadian : function (location) {
        var d = 0.01745329251994329577;
        return this.roundToDecimal(location * d, this.digitRadian);
    },

    decimalToGrade : function (location) {
        var d = 1.11111111111111111111;
        return this.roundToDecimal(location * d, this.digitRadian);
    },

    decimalToDMS : function (location, hemisphere) {
        if (location < 0) {
            location *= -1; // strip dash '-'
        }

        var degrees = Math.floor(location); // strip decimal remainer for degrees
        var minutesFromRemainder = (location - degrees) * 60; // multiply the remainer by 60
        var minutes = Math.floor(minutesFromRemainder); // get minutes from integer
        var secondsFromRemainder = (minutesFromRemainder - minutes) * 60; // multiply the remainer by 60
        var seconds = this.roundToDecimal(secondsFromRemainder, this.digitSecond); // get minutes by rounding to integer

        var dms = degrees + "° " + minutes + "' " + seconds + "\" ";
        if (hemisphere) {
            dms += hemisphere;
        }

        return dms;
    },

    decimalLatToDMS : function (location) {
        var hemisphere = (location < 0) ? this.SOUTH : this.NORTH; // south if negative
        return this.decimalToDMS(location, hemisphere);
    },

    decimalLongToDMS : function (location) {
        var hemisphere = (location < 0) ? this.WEST : this.EAST; // west if negative
        return this.decimalToDMS(location, hemisphere);
    },

    DMSToDecimal : function (degrees, minutes, seconds, hemisphere) {
        var ddVal = degrees + minutes / 60 + seconds / 3600;
        ddVal = (hemisphere === this.SOUTH || hemisphere === this.WEST) ? ddVal * -1 : ddVal;

        var decimal = this.roundToDecimal(ddVal, this.digitDecimal);
        return decimal;
    }

};

export default PositionFormater;
