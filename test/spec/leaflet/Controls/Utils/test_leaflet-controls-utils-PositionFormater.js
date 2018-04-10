/* global describe, it */
import Logger from "../../../../../src/Common/Utils/LoggerByDefault";
import PositionFormater from "../../../../../src/Leaflet/Controls/Utils/PositionFormater";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-positionformater");

describe("-- Test PositionFormater --", function () {
    it('#roundToDecimal : 5 digit', function () {
        expect(PositionFormater.roundToDecimal(2.845699, 5)).to.be.equal(2.8457);
    });
    it('#roundToDecimal : 2 digit', function () {
        expect(PositionFormater.roundToDecimal(2.845699, 2)).to.be.equal(2.85);
    });
    it('#roundToDecimal : 1 digit', function () {
        expect(PositionFormater.roundToDecimal(2.845699, 1)).to.be.equal(2.8);
    });
    it('#decimalToRadian', function () {
        expect(PositionFormater.decimalToRadian(2.845699)).to.be.equal(0.04966682);
    });
    it('#decimalToGrade', function () {
        expect(PositionFormater.decimalToGrade(2.845699)).to.be.equal(3.16188778);
    });
    it('#decimalToDMS', function () {
        expect(PositionFormater.decimalToDMS(2.845699, "E", 0)).to.be.equal('2° 50\' 44.52" E');
    });
    it('#decimalLatToDMS : N', function () {
        expect(PositionFormater.decimalLatToDMS("48.953217", 0)).to.be.equal('48° 57\' 11.58" N');
    });
    it('#decimalLatToDMS : S', function () {
        expect(PositionFormater.decimalLatToDMS("-48.953217", 0)).to.be.equal('48° 57\' 11.58" S');
    });
    it('#decimalLonToDMS : E', function () {
        expect(PositionFormater.decimalLonToDMS("2.845699", 0)).to.be.equal('2° 50\' 44.52" E');
    });
    it('#decimalLonToDMS : O', function () {
        expect(PositionFormater.decimalLonToDMS("-2.845699", 0)).to.be.equal('2° 50\' 44.52" O');
    });
    it('#DMSToDecimal : 5 digit', function () {
        PositionFormater.digitDecimal=5;
        var degrees=2, minutes=50, seconds=44.52, hemisphere="E";
        expect(PositionFormater.DMSToDecimal(degrees, minutes, seconds, hemisphere)).to.be.equal(2.8457);
    });
    it('#DMSToDecimal : 2 digit', function () {
        PositionFormater.digitDecimal=2;
        var degrees=2, minutes=50, seconds=44.52, hemisphere="E";
        expect(PositionFormater.DMSToDecimal(degrees, minutes, seconds, hemisphere)).to.be.equal(2.85);
    });
});
