/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test --", function () {

        var LayerSwitcher;

        before(function (done) {
            require(['Openlayers/Controls/LayerSwitcher'], function (_LayerSwitcher) {
                LayerSwitcher = _LayerSwitcher;
                done();
            });
        });

        describe('LayerSwitcher', function () {
            it('Proprietes de LayerSwitcher', function () {});
        });
    });
});
