/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import LayerConfig from "../../../../src/Leaflet/Layers/LayerConfig";
import Gp from "gp";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-layers");

describe("-- Test Plugin Leaflet Layers::LayerConfig --", function () {

    beforeEach(function () {});

    afterEach(function () {});

    describe('#Layer Config without an autoconf', function () {

        it('Config without parameter key, layer and service, return nothing', function () {

            var params = LayerConfig.get({
                key: "",
                layer: "",
                service: null
            });

            expect(params).to.be.undefined;
        });

        it('Config with parameter key, layer and service, but return nothing', function () {

            var params = LayerConfig.get({
                key: "jhyvi0fgmnuxvfv0zjzorvdn",
                layer: "",
                service: "WMS"
            });

            expect(params).to.be.undefined;
        });
    });

    describe('#Layer Config with an autoconf', function () {

        it('Config without parameter key, layer and service, return by default', function (done) {
            Gp.Services.getConfig({
                serverUrl : "test/spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                callbackSuffix : "",
                timeOut : 20000,
                onSuccess : function () {

                    var params = LayerConfig.get({
                        key: "",
                        layer: "",
                        service: null
                    });

                    expect(params).to.be.ok;
                    expect(params.minZoom).to.be.equal(1);
                    expect(params.maxZoom).to.be.equal(21);
                    done();
                }
            });

        });

        it('Config with parameter key, layer and service, but return nothing', function (done) {

            Gp.Services.getConfig({
                serverUrl : "test/spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
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
                    expect(params).to.be.ok;
                    expect(params.minZoom).to.be.equal(6);
                    expect(params.maxZoom).to.be.equal(18);
                    expect(params.key).to.be.equal("jhyvi0fgmnuxvfv0zjzorvdn");
                    expect(params.projection).to.be.equal("EPSG:3857");
                    expect(params.version).not.to.be.equal("");
                    // TODO...
                    done();
                }
            });
        });
    });
});
