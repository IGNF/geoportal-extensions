/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Register from "../../../../src/Common/Utils/Register";
import Proj4 from "proj4";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-register");
describe("-- Test Register --", function () {

    describe("#exist", function () {

        it("with param undef, return false", function () {
            expect(Register.exist()).to.be.false;
        });

        it("with param empty, return false", function () {
            expect(Register.exist("")).to.be.false;
        });

        it("with register unknow, return false", function () {
            expect(Register.exist("TOTO:1091957")).to.be.false;
        });

        it("with good param, return true", function () {
            expect(Register.exist("CRS:84")).to.be.true;
        });
    });

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

    describe("#object", function () {

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

    describe("#loadByName", function () {

        it("load a custom projection defs", function () {
            var status = Register.loadByName(Proj4, "EPSG:2154");
            expect(status).to.be.true;
            expect(Proj4("EPSG:2154").oProj.title).to.be.equal("RGF93 / Lambert-93");
        });

        it("load an unknow custom projection defs", function () {
            var status = Register.loadByName(Proj4, "FOO:2154");
            expect(status).to.be.false;
        });

        it("load a geocent custom projection defs", function () {
            var status = Register.loadByName(Proj4, "EPSG:4978");
            expect(status).to.be.true;
        });

        it("add a geocent custom projection defs", function () {
            Register.IGNF = {
                AMST63 : "+title=Amsterdam 1963 +proj=geocent +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs"
            };
            expect(Register.exist("IGNF:AMST63")).to.be.true;

            var status = Register.loadByName(Proj4, "IGNF:AMST63");
            expect(status).to.be.true;
            expect(Proj4("IGNF:AMST63").oProj.title).to.be.equal("Amsterdam 1963");
        });
    });

    describe("#load", function () {

        it("load all custom projections defs", function () {
            Register.load(Proj4);
            expect(Register.isLoaded).to.be.true;
        });

    });

    describe("#proj4", function () {

        it("EPSG:310642813 is defined", function () {
            expect(Proj4.defs('EPSG:310642813')).not.to.be.undefined;
        });

        it("IGNF:AMST63 is defined", function () {
            expect(Proj4.defs('IGNF:AMST63')).not.to.be.undefined;
        });

        it("CRS:84 is defined", function () {
            expect(Proj4.defs('CRS:84')).not.to.be.undefined;
        });
    });
});
