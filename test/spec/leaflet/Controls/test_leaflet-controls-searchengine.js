/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import SearchEngine from "../../../../src/Leaflet/Controls/SearchEngine";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-searchengine");

describe("-- Test Plugin Leaflet SearchEngine --", function () {

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

    it('I should add a control SearchEngine into map (with default parameters)', function () {

        var search = new SearchEngine({
            apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        search.addTo(map);

        logger.info("search", search);
        logger.info("search container", search.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPsearchEngine\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(search.getContainer()).to.be.ok;
        // position par defaut du controle sur la carte
        expect(search.getPosition()).to.be.equal("topleft");
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPsearchEngine\"]")).to.be.ok;

    });
    it('I should remove a control SearchEngine into map (with default parameters)', function () {

        var search = new SearchEngine({
            apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        map.addControl(search);

        logger.info("search", search);
        logger.info("search container", search.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        map.removeControl(search);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPsearchEngine\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPsearchEngine\"]")).not.to.be.ok;
    });
});
