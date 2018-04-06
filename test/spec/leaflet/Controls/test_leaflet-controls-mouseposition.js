/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import MousePosition from "../../../../src/Leaflet/Controls/MousePosition";
import Gp from "gp";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-MousePosition");

describe("-- Test Plugin Leaflet MousePosition --", function () {

    var div, map;

    beforeEach(function () {
        div = document.createElement('div');
        div.id = "map";
        div.style.width = '800px';
        div.style.height = '600px';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        map = L.map(div.id);
    });

    afterEach(function () {
        document.body.removeChild(div);
        map = null;
        div = null;
    });

    it('I should add a control MousePosition into map (with default parameters)', function () {

        var mouse = new MousePosition({
            // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        mouse.addTo(map);

        logger.info("MousePosition", mouse);
        logger.info("MousePosition container", mouse.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPmousePosition\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(mouse.getContainer()).to.be.ok;
        // position par defaut du controle sur la carte
        expect(mouse.getPosition()).to.be.equal("bottomleft");
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPmousePosition\"]")).to.be.ok;

    });
    it('I should remove a control MousePosition into map (with default parameters)', function () {

        var mouse = new MousePosition({
            // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        map.addControl(mouse);

        logger.info("MousePosition", mouse);
        logger.info("MousePosition container", mouse.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        map.removeControl(mouse);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPmousePosition\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPmousePosition\"]")).not.to.be.ok;
    });
});
