/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import "../../../../src/OpenLayers/CRS/AutoLoadCRS";
import {
    get as getProjection
} from "ol/proj";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-crs-projections");

describe("-- Test Projection register", function () {

    it("EPSG:27572 is defined", function () {
        expect(getProjection('EPSG:27572').getCode()).to.be.equal('EPSG:27572');
        expect(getProjection('EPSG:27572').getExtent()).not.to.be.null;
        expect(getProjection('EPSG:27572').getExtent().length).to.be.equal(4);
    });

    it("EPSG:2154 is defined", function () {
        expect(getProjection('EPSG:2154').getCode()).to.be.equal('EPSG:2154');
        expect(getProjection('EPSG:2154').getExtent()).not.to.be.null;
        expect(getProjection('EPSG:2154').getExtent().length).to.be.equal(4);
    });

    it("IGNF:LAMB93 is defined", function () {
        expect(getProjection('IGNF:LAMB93').getCode()).to.be.equal('IGNF:LAMB93');
        expect(getProjection('IGNF:LAMB93').getExtent()).to.be.null;
    });

    it("CRS:84 is defined", function () {
        expect(getProjection('CRS:84').getCode()).to.be.equal('CRS:84');
        expect(getProjection('CRS:84').getExtent()).to.be.eql([ -180, -90, 180, 90 ]);
    });
});

describe("-- Test Projection register into ol.proj (variable globale)", function () {

    xit("EPSG:27572 is defined into ol", function () {
        expect(ol.proj.get('EPSG:27572').getCode()).to.be.equal('EPSG:27572');
        expect(ol.proj.get('EPSG:27572').getExtent()).not.to.be.null;
        expect(ol.proj.get('EPSG:27572').getExtent().length).to.be.equal(4);
    });

    xit("EPSG:2154 is defined into ol", function () {
        expect(ol.proj.get('EPSG:2154').getCode()).to.be.equal('EPSG:2154');
        expect(ol.proj.get('EPSG:2154').getExtent()).not.to.be.null;
        expect(ol.proj.get('EPSG:2154').getExtent().length).to.be.equal(4);
    });

    xit("IGNF:LAMB93 is defined into ol", function () {
        expect(ol.proj.get('IGNF:LAMB93').getCode()).to.be.equal('IGNF:LAMB93');
        expect(ol.proj.get('IGNF:LAMB93').getExtent()).to.be.null;
    });

    xit("CRS:84 is defined into ol", function () {
        expect(ol.proj.get('CRS:84').getCode()).to.be.equal('CRS:84');
        expect(ol.proj.get('CRS:84').getExtent()).to.be.eql([ -180, -90, 180, 90 ]);
    });
});

describe("-- Test Projection register into proj4 (variable globale)", function () {

    it("EPSG:27572 is defined into ol", function () {
        expect(proj4('EPSG:27572').oProj.title).to.be.equal('NTF (Paris) / Lambert zone II');
    });

    it("EPSG:2154 is defined into ol", function () {
        expect(proj4('EPSG:2154').oProj.title).to.be.equal('RGF93 / Lambert-93');
    });

    it("IGNF:LAMB93 is defined into ol", function () {
        expect(proj4('IGNF:LAMB93').oProj.title).to.be.equal('Lambert 93');
    });

    it("CRS:84 is defined into ol", function () {
        expect(proj4('CRS:84').oProj.title).to.be.equal('WGS 84 longitude-latitude');
    });
});
