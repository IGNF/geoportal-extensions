/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test PositionFormater --", function () {

        var PositionFormater;

        before(function (done) {
            require(['Leaflet/Controls/Utils/PositionFormater'], function (_PositionFormater) {
                PositionFormater = _PositionFormater;
                done();
            });
        });

        describe('decimal2DMS', function () {

            it('Test with a good value', function () {
                var result = PositionFormater.decimalToDMS(48.689754);
                // value : 48° 41' 23.11"
                expect(result).to.be.equal("48° 41' 23.11\" ");
            });

            it('Test with hemisphere', function () {
                var result = PositionFormater.decimalToDMS(48.689754, "N");
                // value : 48° 41' 23.11 N"
                expect(result).to.be.equal("48° 41' 23.11\" N");
            });

        });

        describe('DMS2Decimal', function () {

            it('Test with a good value', function () {
                var result = PositionFormater.DMSToDecimal(48, 41, 23.11);
                // value : 48.68975
                expect(result).to.be.equal(48.68975);
            });

            it('Test with hemisphere south', function () {
                var result = PositionFormater.DMSToDecimal(48, 41, 23.11, "S");
                // value : -48.68975
                expect(result).to.be.equal(-48.68975);
            });

        });
    });
});
