/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import WMS from "../../../../src/Leaflet/Layers/WMS";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-layers-wms");

describe("-- Test Plugin Leaflet WMS --", function () {

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

    it('I should add a WMS layer IGN into map with minimal parameter', function () {

        map.setView([48, 2], 8);

        var layer = new WMS("http://wxs.ign.fr/jhyvi0fgmnuxvfv0zjzorvdn/geoportail/r/wms", {
              paramsNative : {
                minZoom : 1,
                maxZoom : 21
              },
              paramsWms   : {
                layers  : "ORTHOIMAGERY.ORTHOPHOTOS",
                styles  : "normal",
                format  : "image/jpeg",
                version : "1.3.0"
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
        expect(layer.wmsParams).to.have.property('format',"image/jpeg");
        expect(layer.wmsParams).to.have.property('height',256);
        expect(layer.wmsParams).to.have.property('layers',"ORTHOIMAGERY.ORTHOPHOTOS");
        expect(layer.wmsParams).to.have.property('request',"GetMap");
        expect(layer.wmsParams).to.have.property('service',"WMS");
        expect(layer.wmsParams).to.have.property('styles',"normal");
        expect(layer.wmsParams).to.have.property('transparent',false);
        expect(layer.wmsParams).to.have.property('version',"1.3.0");
        expect(layer.wmsParams).to.have.property('width',256);
        // une couche ne possede pas certaines informations car pas d'autoconf...
        expect(layer._originators).to.be.empty;
        expect(layer._legends).to.be.empty;
        expect(layer._metadata).to.be.empty;
        expect(layer._title).to.be.empty;
        expect(layer._description).to.be.empty;
        expect(layer._quicklookUrl).to.be.empty;
        
    });
});
