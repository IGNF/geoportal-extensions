/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import ElevationPath from "../../../../src/Leaflet/Controls/ElevationPath";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-elevationpath");

describe("-- Test Plugin Leaflet ElevationPath --", function () {

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

    it('I should add a control ElevationPath into map (with default parameters)', function () {

        var elevationpath = new ElevationPath({
            apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        elevationpath.addTo(map);

        logger.info("ElevationPath", elevationpath);
        logger.info("ElevationPath container", elevationpath.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPelevationPath\"]");
        expect(div).to.be.ok;
        // existance du dom du controle
        expect(elevationpath.getContainer()).to.be.ok;
        // position par defaut du controle sur la carte
        expect(elevationpath.getPosition()).to.be.equal("topleft");
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPelevationPath\"]")).to.be.ok;

    });
    it('I should remove a control ElevationPath into map (with default parameters)', function () {

        var elevationpath = new ElevationPath({
            apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
        });

        map.addControl(elevationpath);

        logger.info("ElevationPath", elevationpath);
        logger.info("ElevationPath container", elevationpath.getContainer());
        logger.info("map", map);
        logger.info("map container", map.getContainer());

        map.removeControl(elevationpath);

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPelevationPath\"]");
        expect(div).not.to.be.ok;
        // existance du controle sur la carte
        expect(map.getContainer().querySelector("div[id^=\"GPelevationPath\"]")).not.to.be.ok;
    });
});
