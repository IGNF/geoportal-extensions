/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test MathUtils --", function () {

        var MathUtils;

        before(function (done) {
            require(['Common/Utils/MathUtils'], function (_MathUtils) {
                MathUtils = _MathUtils;
                done();
            });
        });

        describe('#modulo', function () {

        });

        describe('#modulo', function () {

        });

        describe('#decimalToDMS', function () {

        });

        describe('#toInteger', function () {

        });

        describe('#isInteger', function () {

        });

        describe('#toFloat', function () {

        });
    });
});
