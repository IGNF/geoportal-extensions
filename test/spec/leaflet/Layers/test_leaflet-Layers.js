/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import Layers from "../../../../src/Leaflet/Layers/Layers";
import Gp from "geoportal-access-lib";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-layers");
describe("-- Test Plugin Leaflet Layers --", function () {

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

    describe("-- Test Plugin Leaflet Layers::WMS --", function () {

        describe('#Without autoconf loaded', function () {

            before(function () {
                window.Gp = null;
            });
            after(function () {
                window.Gp = null;
            });

            it('And without parameter layer, i should return an exception (missing layer)', function () {
                try {
                    var layer = Layers.WMS();
                    expect(false).to.be.true;
                } catch (e) {
                  logger.info("exception",e);
                  console.error(e)
                    expect(true).to.be.true;
                    expect(e.message).to.be.equal("PARAM_MISSING : options !");
                }

            });

            it('And without parameter key, i should return parameters but without rights', function () {

                var layer = Layers.WMS({
                    layer : "ORTHOIMAGERY.ORTHOPHOTOS"
                });
                layer.addTo(map);

                logger.info("layer", layer);
                logger.info("map",map);
                expect(layer.getContainer()).not.to.be.ok;
                expect(Object.keys(layer.wmsParams)).not.to.have.lengthOf(0);
                expect(layer._description).to.be.string('');
                expect(layer._geoportal_id).not.to.be.null;
                expect(layer._legends).to.be.empty;
                expect(layer._metadata).to.be.empty;
                expect(layer._originators).to.be.empty;
                expect(layer._quicklookUrl).to.be.string('');
                expect(layer._title).to.be.string('');
                expect(layer._url).to.have.string("gp-leaflet-ext");

            });

            it('I should return a layer but without autoconf parameters', function () {
                map.setView([48, 2], 8);

                var layer = Layers.WMS({
                    layer : "ORTHOIMAGERY.ORTHOPHOTOS",
                    apiKey : "essentiels,ortho,cartes,administratif,decouverte"
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
                expect(layer._quicklookUrl).to.be.string('');
                expect(layer._title).to.be.string('');
                expect(layer._description).to.be.string('');
                expect(layer._url).not.to.have.string("no-rights-found");

            });
        });

        describe('#With autoconf loaded', function () {

            it('And with rights, i should return all layer informations', function (done) {

                Gp.Services.getConfig({
                    //serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                    apiKey : "essentiels,ortho,cartes,administratif,decouverte",
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
                        expect(layer._metadata).to.be.empty;
                        expect(layer._originators).to.be.empty;
                        expect(layer._quicklookUrl).not.to.null;
                        expect(layer._title).not.to.be.null;
                        expect(layer._description).not.to.be.null;
                        done();
                  },
                    onFailure: (error) => console.error(error)
                });
            });

            it('But without rights, i should return a layer with information by default', function (done) {

                Gp.Services.getConfig({
                    //serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                    apiKey : "essentiels,ortho,cartes,administratif,decouverte",
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
                        expect(layer.getContainer()).to.be.ok;
                        expect(layer._leaflet_id).not.to.be.null;
                        expect(layer._geoportal_id).not.to.be.null;
                        expect(layer._map).not.to.be.null;
                        // une couche par defaut ne possede pas certaines informations
                        expect(layer._legends).to.be.empty;
                        expect(layer._metadata).to.be.empty;
                        expect(layer._originators).to.be.empty;
                        expect(layer._quicklookUrl).to.be.empty;
                        expect(layer._title).to.be.empty;
                        expect(layer._description).to.be.empty;
                        expect(layer._url).to.have.string("gp-leaflet-ext");
                        done();
                    },
                    onFailure: (error) => console.error(error)
                });
            });
        });
    });

    describe("-- [TODO] Test Plugin Leaflet Layers::WMTS --", function () {
        // FIXME pas de layer WMTS dans l'autoconf local !
        describe('#Without autoconf loaded', function () {

            before(function () {
                window.Gp = null;
            });
            after(function () {
                window.Gp = null;
            });

            xit('I should return a layer but without autoconf parameters', function () {
                map.setView([48, 2], 8);

                var layer = Layers.WMTS({
                    layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS",
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
                expect(layer._url).not.to.have.string("no-rights-found");

            });
        });

        describe('#With autoconf loaded', function () {

            xit('I should return all layer informations', function (done) {

                Gp.Services.getConfig({
                    serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                    // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                    callbackSuffix : "",
                    timeOut : 20000,
                    onSuccess : function () {
                        map.setView([48, 2], 8);

                        var layer = Layers.WMTS({
                            layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS"
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
                        expect(layer._quicklookUrl).not.to.null;
                        expect(layer._title).not.to.be.null;
                        expect(layer._description).not.to.be.null;
                        done();
                    }
                });
            });
        });

    });
});
