/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Map from "ol/Map";
import View from "ol/View";
import OSMSource from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Editor from "../../../../src/OpenLayers/Controls/Editor";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-controls-Editor");

describe("-- [TODO] Test Plugin OpenLayers Editor --", function () {

    var div;

    beforeEach(function () {
        div = document.createElement('div');
        div.id = "editor";
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
    });

    afterEach(function () {
        document.body.removeChild(div);
        div = null;
    });

    xit('I should add a control Editor', function () {});
    xit('I should add a control Editor into custom tag (\'editor\')', function () {

        var editor = new Editor({
            target: document.getElementById("editor"),
            style: "spec/openlayers/fixtures/osm.json"
        });

        // existance des enfants
        var main = document.getElementById("editor");
        expect(main.hasChildNodes()).to.be.true;
        var child = main.childNodes;
        expect(child).to.be.an('array');
        expect(child[0].id).to.be.equal("GPEditorMapBoxContainer_ID_0");

        // existance de la balise principale
        var div = document.querySelector("div[id^=\"GPEditorMapBoxContainer_ID_\"]");
        expect(div).to.be.ok;

    });
    xit('I should add a control Editor with themes', function () {});
});
