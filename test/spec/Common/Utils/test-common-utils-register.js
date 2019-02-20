/* global describe, it */
import Register from "../../../../src/Common/Utils/Register";
import Proj4 from "proj4";

import { assert, expect, should } from "chai";
should();

describe("-- Test Register --", function () {

    describe("#get", function () {

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

        xit("with good param, return an IGNF definition", function () {
            expect(Register.get("IGNF:AMST63")).not.to.be.undefined;
        });

        it("with good param, return a CRS definition", function () {
            expect(Register.get("CRS:84")).not.to.be.undefined;
        });

        it("with good param, return a EPSG definition", function () {
            expect(Register.get("EPSG:3042")).not.to.be.undefined;
        });
    });

    describe("#object", function () {

        it("EPSG:2154, return a EPSG definition", function () {
            expect(Register.EPSG[2154]).not.to.be.undefined;
        });
        it("CRS:84, return a CRS definition", function () {
            expect(Register.CRS[84]).not.to.be.undefined;
        });
        xit("IGNF:AMST63, return a IGNF definition", function () {
            expect(Register.IGNF.AMST63).not.to.be.undefined;
        });
    });

    describe("#load", function () {

        it("instance is already loaded", function () {
            Register.load(Proj4);
            expect(Register.isLoaded).to.be.true;
        });
    });

    describe("#proj4", function () {

        it("EPSG:310642813 is defined", function () {
            expect(Proj4.defs('EPSG:310642813')).not.to.be.undefined;
        });

        xit("IGNF:AMST63 is defined", function () {
            expect(Proj4.defs('IGNF:AMST63')).not.to.be.undefined;
        });

        it("CRS:84 is defined", function () {
            expect(Proj4.defs('CRS:84')).not.to.be.undefined;
        });
    });

    // INFO test à mettre en place sur openlayers
    describe("#ol", function () {

        xit("EPSG:310642813 is defined into ol", function () {
            expect(ol.proj.get('EPSG:310642813').getCode()).to.be.equal('EPSG:310642813');
        });

        xit("IGNF:LAMB93 is defined into ol", function () {
            expect(ol.proj.get('IGNF:LAMB93').getCode()).to.be.equal('IGNF:LAMB93');
        });

        xit("CRS:84 is defined into ol", function () {
            expect(ol.proj.get('CRS:84').getCode()).to.be.equal('CRS:84');
        });
    });
});
