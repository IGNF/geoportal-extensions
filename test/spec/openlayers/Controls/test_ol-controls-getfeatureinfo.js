/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Map from "ol/Map";
import View from "ol/View";
import OSMSource from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import GetFeatureInfo from "../../../../src/OpenLayers/Controls/GetFeatureInfo";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-GetFeatureInfo");

describe("-- Test Plugin OpenLayers GetFeatureInfo --", function () {

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

    it('I should add a control GetFeatureInfo into map (with default parameters)', function () {

        var getFeatureInfo = new GetFeatureInfo();

        map.addControl(getFeatureInfo);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPgetFeatureInfo\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(getFeatureInfo._container).to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPgetFeatureInfo\"]")).to.be.ok;

    });
    it('I should remove a control GetFeatureInfo into map (with default parameters)', function () {

        var getFeatureInfo = new GetFeatureInfo();

        map.addControl(getFeatureInfo);

        map.removeControl(getFeatureInfo);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPgetFeatureInfo\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPgetFeatureInfo\"]")).not.to.be.ok;
    });
});
