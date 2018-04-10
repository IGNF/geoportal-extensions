/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Isocurve from "../../../../src/Leaflet/Controls/Isocurve";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-Isocurve");

describe("-- Test Plugin Leaflet Isocurve --", function () {

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

    it('I should add a control Isochron into map (with default parameters)', function () {

        var iso = new Isocurve();

        iso.addTo(map);

        logger.info("Isocurve", iso);
        logger.info("Isocurve container", iso.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPisochron\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(iso.getContainer()).to.be.ok;
        // position par defaut du controle sur la carte
        expect(iso.getPosition()).to.be.equal("topleft");
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPisochron\"]")).to.be.ok;

    });
    it('I should remove a control Isochron into map (with default parameters)', function () {

        var iso = new Isocurve();

        map.addControl(iso);

        logger.info("Isocurve", iso);
        logger.info("Isocurve container", iso.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        map.removeControl(iso);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPisochron\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPisochron\"]")).not.to.be.ok;
    });
});
