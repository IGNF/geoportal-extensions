/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Map from "ol/Map";
import View from "ol/View";
import OSMSource from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import LayerSwitcher from "../../../../src/OpenLayers/Controls/LayerSwitcher";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-LayerSwitcher");

describe("-- Test Plugin OpenLayers LayerSwitcher --", function () {

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

    it('I should add a control LayerSwitcher into map (with default parameters)', function () {

        var layerSwitcher = new LayerSwitcher();

        map.addControl(layerSwitcher);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPlayerSwitcher\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(layerSwitcher._container).to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPlayerSwitcher\"]")).to.be.ok;

    });
    it('I should remove a control LayerSwitcher into map (with default parameters)', function () {

        var layerSwitcher = new LayerSwitcher();

        map.addControl(layerSwitcher);

        map.removeControl(layerSwitcher);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPlayerSwitcher\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPlayerSwitcher\"]")).not.to.be.ok;
    });
});
