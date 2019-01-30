/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import LayerConfig from "../../../../src/Leaflet/Layers/LayerConfig";
import Gp from "geoportal-access-lib";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-layers");

describe("-- Test Plugin Leaflet Layers::LayerConfig --", function () {

    beforeEach(function () {});

    afterEach(function () {});

    describe('#I should not return anything without autoconf loaded', function () {

        it('without parameters (key, layer and service)', function () {

            var params = LayerConfig.get({
                key: "",
                layer: "",
                service: null
            });

            expect(params).to.be.undefined;
        });

        it('with parameters (key, layer and service)', function () {

            var params = LayerConfig.get({
                key: "jhyvi0fgmnuxvfv0zjzorvdn",
                layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                service: "WMS"
            });

            expect(params).to.be.undefined;
        });
    });

    describe('#I should return something with autoconf loaded', function () {

        it('And with parameter (key, layer and service), i should return all layer metadata', function (done) {

            Gp.Services.getConfig({
                serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {
                    var params = LayerConfig.get({
                        key: "jhyvi0fgmnuxvfv0zjzorvdn",
                        layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                        service: "WMS"
                    });

                    logger.info("params", params);
                    expect(params).not.to.be.undefined;
                    expect(params.key).to.be.equal("jhyvi0fgmnuxvfv0zjzorvdn");
                    expect(params.version).not.to.be.null;
                    expect(params.description).not.to.be.null;
                    expect(params.extent).not.to.be.null;
                    expect(params.format).not.to.be.null;
                    expect(params.legends).not.to.be.null;
                    expect(params.maxScale).not.to.be.null;
                    expect(params.maxZoom).not.to.be.null;
                    expect(params.metadata).not.to.be.null;
                    expect(params.minScale).not.to.be.null;
                    expect(params.minZoom).not.to.be.null;
                    expect(params.originators).not.to.be.null;
                    expect(params.projection).not.to.be.null;
                    expect(params.quicklookUrl).not.to.be.null;
                    expect(params.styles).not.to.be.null;
                    expect(params.title).not.to.be.null;
                    expect(params.url).not.to.be.null;
                    expect(params.version).not.to.be.null;
                    done();
                }
            });
        });

        it('And without parameter key, i should find the default key and return all layer metadata', function (done) {
            Gp.Services.getConfig({
                serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {

                    var params = LayerConfig.get({
                        key: "",
                        layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                        service: "WMS"
                    });

                    logger.trace(params);
                    expect(params).not.to.be.undefined;
                    expect(params.key).to.be.equal("jhyvi0fgmnuxvfv0zjzorvdn");
                    expect(params.version).not.to.be.null;
                    expect(params.description).not.to.be.null;
                    expect(params.extent).not.to.be.null;
                    expect(params.format).not.to.be.null;
                    expect(params.legends).not.to.be.null;
                    expect(params.maxScale).not.to.be.null;
                    expect(params.maxZoom).not.to.be.null;
                    expect(params.metadata).not.to.be.null;
                    expect(params.minScale).not.to.be.null;
                    expect(params.minZoom).not.to.be.null;
                    expect(params.originators).not.to.be.null;
                    expect(params.projection).not.to.be.null;
                    expect(params.quicklookUrl).not.to.be.null;
                    expect(params.styles).not.to.be.null;
                    expect(params.title).not.to.be.null;
                    expect(params.url).not.to.be.null;
                    expect(params.version).not.to.be.null;

                    done();
                }
            });

        });

        it('But without parameter (key, layer and service), i should not return anything', function (done) {
            Gp.Services.getConfig({
                serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {

                    var params = LayerConfig.get({
                        key: "",
                        layer: "",
                        service: null
                    });

                    expect(params).to.be.undefined;
                    done();
                }
            });

        });

        it('But without parameter layer, i should not return anything', function (done) {
            Gp.Services.getConfig({
                serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {

                    var params = LayerConfig.get({
                        key: "jhyvi0fgmnuxvfv0zjzorvdn",
                        layer: "",
                        service: "WMS"
                    });

                    logger.trace(params);
                    expect(params).to.be.undefined;
                    done();
                }
            });

        });

        it('But without parameter service, i should not return anything', function (done) {
            Gp.Services.getConfig({
                serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {

                    var params = LayerConfig.get({
                        key: "jhyvi0fgmnuxvfv0zjzorvdn",
                        layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                        service: ""
                    });

                    logger.trace(params);
                    expect(params).to.be.undefined;
                    done();
                }
            });

        });

    });
});
