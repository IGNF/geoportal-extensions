/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test Register --", function () {

        var Register;
        var CRS;
        var proj4;
        var ol;

        before(function (done) {
            require(['Common/Utils/Register', "Ol3/CRS/CRS", 'proj4', 'ol'], function (_Register, _CRS, _proj4, _ol) {
                Register = _Register;
                CRS = _CRS;
                proj4 = _proj4;
                ol = _ol;
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

        describe('#load', function () {

            it("instance is already loaded", function () {
                expect(Register.isLoaded).to.be.true;
            });
        });

        describe('#proj4', function () {

            it("EPSG:310642813 is defined into ol", function () {
                expect(proj4.defs('EPSG:310642813')).not.to.be.undefined;
            });

            it("IGNF:AMST63 is defined into ol", function () {
                expect(proj4.defs('IGNF:AMST63')).not.to.be.undefined;
            });

            it("CRS:84 is defined into ol", function () {
                expect(proj4.defs('CRS:84')).not.to.be.undefined;
            });
        });

        describe('#ol', function () {

            it("EPSG:310642813 is defined into ol", function () {
                expect(ol.proj.get('EPSG:310642813').getCode()).to.be.equal('EPSG:310642813');
            });

            it("IGNF:LAMB93 is defined into ol", function () {
                expect(ol.proj.get('IGNF:LAMB93').getCode()).to.be.equal('IGNF:LAMB93');
            });

            it("CRS:84 is defined into ol", function () {
                expect(ol.proj.get('CRS:84').getCode()).to.be.equal('CRS:84');
            });
        });
    });
});
