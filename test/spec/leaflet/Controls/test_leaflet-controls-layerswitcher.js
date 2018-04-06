/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import LayerSwitcher from "../../../../src/Leaflet/Controls/LayerSwitcher";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-LayerSwitcher");

describe("-- Test Plugin Leaflet LayerSwitcher --", function () {

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

    it('I should add a control LayerSwitcher into map (with default parameters)', function () {

        var switcher = new LayerSwitcher();

        switcher.addTo(map);

        logger.info("LayerSwitcher", switcher);
        logger.info("LayerSwitcher container", switcher.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPlayerSwitcher\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(switcher.getContainer()).to.be.ok;
        // position par defaut du controle sur la carte
        expect(switcher.getPosition()).to.be.equal("topright");
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPlayerSwitcher\"]")).to.be.ok;

    });
    it('I should remove a control LayerSwitcher into map (with default parameters)', function () {

        var switcher = new LayerSwitcher();

        map.addControl(switcher);

        logger.info("LayerSwitcher", switcher);
        logger.info("LayerSwitcher container", switcher.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        map.removeControl(switcher);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPlayerSwitcher\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPlayerSwitcher\"]")).not.to.be.ok;
    });
});
