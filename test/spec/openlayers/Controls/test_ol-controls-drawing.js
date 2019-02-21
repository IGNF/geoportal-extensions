/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Map from "ol/Map";
import View from "ol/View";
import OSMSource from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Drawing from "../../../../src/OpenLayers/Controls/Drawing";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-Drawing");

describe("-- Test Plugin OpenLayers Drawing --", function () {

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

    it('I should add a control Isochron into map (with default parameters)', function () {

        var drawing = new Drawing();

        map.addControl(drawing);

        logger.info("Drawing", drawing);
        logger.info("Drawing container", drawing._container);
        logger.info("map", map);
        logger.info("map container", map.getTargetElement());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPdrawing\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(drawing._container).to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPdrawing\"]")).to.be.ok;

    });
    it('I should remove a control Isochron into map (with default parameters)', function () {

        var drawing = new Drawing();

        map.addControl(drawing);

        logger.info("Drawing", drawing);
        logger.info("Drawing container", drawing._container);
        logger.info("map", map);
        logger.info("map container", map.getTargetElement());

        map.removeControl(drawing);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPdrawing\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getTargetElement().querySelector("div[id^=\"GPdrawing\"]")).not.to.be.ok;
    });
});
