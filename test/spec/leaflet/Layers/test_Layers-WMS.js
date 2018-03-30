/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Layers from "../../../../src/Leaflet/Layers/Layers";
import Gp from "gp";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-layers");

describe("-- Test Plugin Leaflet Layers::WMS --", function () {
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
    });

    describe('#WMS - no autoconf', function () {

        it('WMS without parameter layer, return an exception', function () {

            try {
                var layer = Layers.WMS();
                expect(false).to.be.true;
            } catch (e) {
                logger.info("exception", e);
                expect(true).to.be.true;
                expect(e.message).to.be.equal("PARAM_MISSING : layer !");
            }

        });

        it('WMS without parameter key, not return an exception', function () {

            try {
                var layer = Layers.WMS({
                    layer : "ORTHOIMAGERY.ORTHOPHOTOS"
                });
                logger.info("layer", layer);
                expect(true).to.be.true;
            } catch (e) {
                logger.error("exception", e);
                expect(true).to.be.false;
            }

        });

        it('WMS with parameter, return a layer by default', function () {
            map.setView([48, 2], 8);

            window.Gp = null; // pas d'autoconf !
            var layer = Layers.WMS({
                layer : "ORTHOIMAGERY.ORTHOPHOTOS",
                apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
            });

            layer.addTo(map);
            logger.info("layer", layer);
            logger.info("map", map);
            expect(layer.getContainer()).to.be.ok;
            expect(layer._leaflet_id).not.to.be.null;
            expect(layer._geoportal_id).not.to.be.null;
            expect(layer._map).not.to.be.null;
            // une couche par defaut ne possede pas certaines informations
            expect(layer._legends).to.be.empty;
            expect(layer._metadata).to.be.empty;
            expect(layer._originators).to.be.empty;
            expect(layer._quicklookUrl).to.be.null;
            expect(layer._title).to.be.null;
            expect(layer._description).to.be.null;

        });
    });

    describe('#WMS - with autoconf', function () {

        it('WMS with right, return a layer with attributions', function (done) {

            Gp.Services.getConfig({
                serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {
                    map.setView([48, 2], 8);

                    var layer = Layers.WMS({
                        layer : "ORTHOIMAGERY.ORTHOPHOTOS"
                    });
                    layer.addTo(map);
                    logger.info("layer", layer);
                    logger.info("map", map);
                    expect(layer.getContainer()).to.be.ok;
                    expect(layer._leaflet_id).not.to.be.null;
                    expect(layer._geoportal_id).not.to.be.null;
                    expect(layer._map).not.to.be.null;
                    // une couche par defaut ne possede pas certaines informations
                    expect(layer._legends).not.to.be.empty;
                    expect(layer._metadata).not.to.be.empty;
                    expect(layer._originators).not.to.be.empty;
                    expect(layer._quicklookUrl).not.to.be.equal("");
                    expect(layer._title).not.to.be.equal("");
                    expect(layer._description).not.to.be.equal("");
                    done();
                }
            });
        });

        it('WMS with no right, return a layer by default', function (done) {

            Gp.Services.getConfig({
                serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {
                    map.setView([48, 2], 8);

                    var layer = Layers.WMS({
                        layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS"
                    });
                    layer.addTo(map);
                    logger.trace("layer", layer);
                    logger.trace("map", map);
                    expect(layer._url).to.be.equal("http://localhost?no-rights-found-for=[GEOGRAPHICALGRIDSYSTEMS.MAPS]&gp-leaflet-ext=__GPLEAFLETEXTVERSION__");
                    expect(layer.getContainer()).to.be.ok;
                    expect(layer._leaflet_id).not.to.be.null;
                    expect(layer._geoportal_id).not.to.be.null;
                    expect(layer._map).not.to.be.null;
                    // une couche par defaut ne possede pas certaines informations
                    expect(layer._legends).to.be.empty;
                    expect(layer._metadata).to.be.empty;
                    expect(layer._originators).to.be.empty;
                    expect(layer._quicklookUrl).to.be.null;
                    expect(layer._title).to.be.null;
                    expect(layer._description).to.be.null;
                    done();
                }
            });
        });
    });
});
