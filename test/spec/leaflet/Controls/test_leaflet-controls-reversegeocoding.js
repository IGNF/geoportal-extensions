/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import ReverseGeocoding from "../../../../src/Leaflet/Controls/ReverseGeocoding";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-reversegeocoding");

describe("-- Test Plugin Leaflet ReverseGeocoding --", function () {

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

    it('I should add a control ReverseGeocoding into map (with default parameters)', function () {

        var reversegeocoding = new ReverseGeocoding({
            apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        reversegeocoding.addTo(map);

        logger.info("ReverseGeocoding", reversegeocoding);
        logger.info("ReverseGeocoding container", reversegeocoding.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPreverseGeocoding\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(reversegeocoding.getContainer()).to.be.ok;
        // position par defaut du controle sur la carte
        expect(reversegeocoding.getPosition()).to.be.equal("bottomleft");
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPreverseGeocoding\"]")).to.be.ok;

    });
    it('I should remove a control ReverseGeocoding into map (with default parameters)', function () {

        var reversegeocoding = new ReverseGeocoding({
            apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        map.addControl(reversegeocoding);

        logger.info("ReverseGeocoding", reversegeocoding);
        logger.info("ReverseGeocoding container", reversegeocoding.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        map.removeControl(reversegeocoding);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPreverseGeocoding\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPreverseGeocoding\"]")).not.to.be.ok;
    });
});
