/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test Route --", function () {

        var Route;

        before(function (done) {
            require(['Leaflet/Controls/Route'], function (_Route) {
                Route = _Route;
                done();
            });
        });

        describe('Route', function () {
            it('Proprietes de Route', function () {});
        });
    });
});
