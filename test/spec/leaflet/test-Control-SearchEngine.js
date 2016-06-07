/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test SearchEngine --", function () {

        var SearchEngine;

        before(function (done) {
            require(['Leaflet/Controls/SearchEngine'], function (_SearchEngine) {
                SearchEngine = _SearchEngine;
                done();
            });
        });

        describe('SearchEngine', function () {
            it('Proprietes de SearchEngine', function () {});
        });
    });
});
