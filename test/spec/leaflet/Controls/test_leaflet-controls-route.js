/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Route from "../../../../src/Leaflet/Controls/Route";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-route");

describe("-- Test Plugin Leaflet Route --", function () {

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

    it('I should add a control Route into map (with default parameters)', function () {

        var route = new Route();

        route.addTo(map);

        logger.info("route", route);
        logger.info("route container", route.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GProute\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(route.getContainer()).to.be.ok;
        // position par defaut du controle sur la carte
        expect(route.getPosition()).to.be.equal("topleft");
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GProute\"]")).to.be.ok;

    });
    it('I should remove a control Route into map (with default parameters)', function () {

        var route = new Route();

        map.addControl(route);

        logger.info("route", route);
        logger.info("route container", route.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        map.removeControl(route);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GProute\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GProute\"]")).not.to.be.ok;
    });
});
