/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test MousePosition --", function () {

        var MousePosition;

        before(function (done) {
            require(['Leaflet/Controls/MousePosition'], function (_MousePosition) {
                MousePosition = _MousePosition;
                done();
            });
        });

        describe('MousePosition', function () {
            it('Proprietes de MousePosition', function () {});
        });
    });
});
