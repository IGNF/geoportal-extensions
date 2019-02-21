/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Map from "ol/Map";
import View from "ol/View";
import OSMSource from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import MousePosition from "../../../../src/OpenLayers/Controls/MousePosition";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-MousePosition");

describe("-- [FIXME] Test Plugin OpenLayers MousePosition --", function () {

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

    xit('I should add a control MousePosition into map (with default parameters)', function () {

        var mousePosition = new MousePosition();
        // FIXME
        // Error: the string "EPSG:4978" was thrown, throw an Error :)
        map.addControl(mousePosition);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPmousePosition\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(mousePosition._container).to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPmousePosition\"]")).to.be.ok;

    });
    xit('I should remove a control MousePosition into map (with default parameters)', function () {

        var mousePosition = new MousePosition();
        // FIXME
        // Error: the string "EPSG:4978" was thrown, throw an Error :)
        map.addControl(mousePosition);

        map.removeControl(mousePosition);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPmousePosition\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPmousePosition\"]")).not.to.be.ok;
    });
});
