/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import WMTS from "../../../../src/Leaflet/Layers/WMTS";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-layers-wmts");

describe("-- Test Plugin Leaflet WMTS --", function () {

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

    it('I should add a WMTS layer IGN into map with minimal parameter', function () {

        map.setView([48, 2], 8);

        var layer = new WMTS("http://wxs.ign.fr/jhyvi0fgmnuxvfv0zjzorvdn/geoportail/wmts", {
              paramsNative : {
                minZoom : 1,
                maxZoom : 21
              },
              paramsWmts   : {
                layer   : "ORTHOIMAGERY.ORTHOPHOTOS",
                style   : "normal",
                format  : "image/jpeg",
                version : "1.0.0",
                tilematrixset : "PM"
              },
              originators  : [],
              legends      : [],
              metadata     : [],
              title        : "",
              description  : "",
              quicklookUrl : ""
        });

        layer.addTo(map);

        logger.info("layer", layer);
        logger.info("map", map);

        expect(layer.getContainer()).to.be.ok;
        expect(layer._leaflet_id).not.to.be.null;
        expect(layer._geoportal_id).not.to.be.null;
        expect(layer._map).not.to.be.null;
        // parametres WMS
        expect(layer._wmtsParams).to.have.property('format',"image/jpeg");
        expect(layer._wmtsParams).to.have.property('layer',"ORTHOIMAGERY.ORTHOPHOTOS");
        expect(layer._wmtsParams).to.have.property('request',"GetTile");
        expect(layer._wmtsParams).to.have.property('service',"WMTS");
        expect(layer._wmtsParams).to.have.property('style',"normal");
        expect(layer._wmtsParams).to.have.property('version',"1.0.0");
        expect(layer._wmtsParams).to.have.property('tilematrixset',"PM");
        // une couche ne possede pas certaines informations car pas d'autoconf...
        expect(layer._originators).to.be.empty;
        expect(layer._legends).to.be.empty;
        expect(layer._metadata).to.be.empty;
        expect(layer._title).to.be.empty;
        expect(layer._description).to.be.empty;
        expect(layer._quicklookUrl).to.be.empty;

    });
});
