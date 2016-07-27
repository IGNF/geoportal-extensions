/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test Register --", function () {

        var Register;

        before(function (done) {
            require(['Common/Utils/Register'], function (_Register) {
                Register = _Register;
                done();
            });
        });

        describe('#get', function () {

            it("with param undef, return undefined", function () {
                expect(Register.get()).to.be.undefined;
            });

            it("with param empty, return undefined", function () {
                expect(Register.get("")).to.be.undefined;
            });

            it("with bad format, return undefined", function () {
                expect(Register.get("1578")).to.be.undefined;
            });

            it("with another bad format, return undefined", function () {
                expect(Register.get(":1578")).to.be.undefined;
            });

            it("with register unknow, return undefined", function () {
                expect(Register.get("TOTO:1091957")).to.be.undefined;
            });

            it("with good param, return an IGNF definition", function () {
                expect(Register.get("IGNF:AMST63")).not.to.be.undefined;
            });

            it("with good param, return a CRS definition", function () {
                expect(Register.get("CRS:84")).not.to.be.undefined;
            });

            it("with good param, return a EPSG definition", function () {
                expect(Register.get("EPSG:3042")).not.to.be.undefined;
            });
        });

        describe('#object', function () {

            it("EPSG:2154, return a EPSG definition", function () {
                expect(Register.EPSG[2154]).not.to.be.undefined;
            });
            it("CRS:84, return a CRS definition", function () {
                expect(Register.CRS[84]).not.to.be.undefined;
            });
            it("IGNF:AMST63, return a IGNF definition", function () {
                expect(Register.IGNF.AMST63).not.to.be.undefined;
            });
        });
    });
});
