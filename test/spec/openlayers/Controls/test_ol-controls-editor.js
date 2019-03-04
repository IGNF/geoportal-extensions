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

    it('I should add a control Editor', function () {

        var testPromise = new Promise(function(resolve, reject) {
            var editor = new Editor({
                target: document.getElementById("editor"),
                style: "spec/openlayers/fixtures/osm.json"
            });
            setTimeout(function() {
                resolve(editor);
            }, 200);
        });

        return testPromise.then(function(editor){
            // existance de l'objet
            expect(editor).to.not.be.null;
            expect(editor).to.have.property("container");
            expect(editor).to.have.property("id");
            expect(editor).to.have.property("layers");
            expect(editor).to.have.property("mapbox");
            expect(editor).to.have.property("name");
            expect(editor).to.have.property("options");

            // existance de la balise principale
            var div = document.querySelector("div[id^=\"GPEditorMapBoxContainer_ID_\"]");
            expect(div, "main div is not found ?").to.be.ok;
            // existance des enfants
            var main = document.getElementById("editor");
            expect(main.hasChildNodes(), "has not child nodes ?").to.be.true;
            var child = main.childNodes;
            expect(child.length, "is not an array with one element ?").to.be.equal(1);
            expect(child[0].id, "is not the good id ?").to.be.equal("GPEditorMapBoxContainer_ID_0");

        });
    });
    
});
