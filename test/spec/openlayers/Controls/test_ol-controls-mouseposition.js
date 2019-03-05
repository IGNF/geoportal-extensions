/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Map from "ol/Map";
import View from "ol/View";
import OSMSource from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import {
    get as getProjection
} from "ol/proj";
import MousePosition from "../../../../src/OpenLayers/Controls/MousePosition";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-MousePosition");

describe("-- Test Plugin OpenLayers MousePosition --", function () {

    var div, map;

    beforeEach(function () {
        div = document.createElement('div');
        div.id = "map";
        div.style.width = '800px';
        div.style.height = '600px';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        map =  new Map({
            target : "map",
            layers : [
                new TileLayer({
                    source: new OSMSource(),
                        opacity: 0.5
                    })
            ],
            view : new View({
                center : [288074.8449901076, 6247982.515792289],
                zoom : 8
            })
        });
    });

    afterEach(function () {
        document.body.removeChild(div);
        map = null;
        div = null;
    });

    it('I should add a control MousePosition into map (with default parameters)', function () {

        var mousePosition = new MousePosition();

        map.addControl(mousePosition);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPmousePosition\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(mousePosition._container).to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPmousePosition\"]")).to.be.ok;

    });
    it('I should remove a control MousePosition into map (with default parameters)', function () {

        var mousePosition = new MousePosition();
        map.addControl(mousePosition);

        map.removeControl(mousePosition);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPmousePosition\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPmousePosition\"]")).not.to.be.ok;
    });
});

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

    it("EPSG:27572 is defined into ol", function () {
        expect(ol.proj.get('EPSG:27572').getCode()).to.be.equal('EPSG:27572');
        expect(ol.proj.get('EPSG:27572').getExtent()).not.to.be.null;
        expect(ol.proj.get('EPSG:27572').getExtent().length).to.be.equal(4);
    });

    it("EPSG:2154 is defined into ol", function () {
        expect(ol.proj.get('EPSG:2154').getCode()).to.be.equal('EPSG:2154');
        expect(ol.proj.get('EPSG:2154').getExtent()).not.to.be.null;
        expect(ol.proj.get('EPSG:2154').getExtent().length).to.be.equal(4);
    });

    it("IGNF:LAMB93 is defined into ol", function () {
        expect(ol.proj.get('IGNF:LAMB93').getCode()).to.be.equal('IGNF:LAMB93');
        expect(ol.proj.get('IGNF:LAMB93').getExtent()).to.be.null;
    });

    it("CRS:84 is defined into ol", function () {
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
