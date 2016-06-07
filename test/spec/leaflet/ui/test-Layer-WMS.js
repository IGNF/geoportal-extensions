/* global describe, it */

define(['chai', 'gp', 'leaflet'], function (chai, Gp, L) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test WMS --", function () {
        /*
         * ERROR : JSON.stringify cannot serialize cyclic structures
         * https://github.com/nathanboktae/mocha-phantomjs/issues/104
         * http://stackoverflow.com/questions/9382167/serializing-object-that-contains-cyclic-object-value
         */
        var stringify = JSON.stringify;

        before(function() {
            JSON.stringify = function(obj) {
              var seen = [];

              return stringify(obj, function(key, val) {
                 if (typeof val === "object") {
                      if (seen.indexOf(val) >= 0) { return; }
                      seen.push(val);
                  }
                  return val;
              });
            };
        });

        after(function() {
            JSON.stringify = stringify;
        });

        var Layers;

        before(function (done) {
            require(['Leaflet/Layers/Layers'], function (_Layers) {
                Layers = _Layers;
                done();
            });
        });

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
                    console.log(e.message);
                    expect(true).to.be.true;
                    expect(e.message).to.be.equal("PARAM_MISSING : layer !");
                }

            });

            it('WMS without parameter key, not return an exception', function () {

                try {
                    var layer = Layers.WMS({
                        layer : "ORTHOIMAGERY.ORTHOPHOTOS"
                    });
                    expect(true).to.be.true;
                } catch (e) {
                    console.log(e.message);
                    expect(true).to.be.true;
                }

            });

            it('WMS with parameter, return a layer by default', function () {
                map.setView([48, 2], 8);

                var layer = Layers.WMS({
                    layer : "ORTHOIMAGERY.ORTHOPHOTOS",
                    apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
                });

                layer.addTo(map);
                // console.log(layer);
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
            // FIXME comment tester à travers un appel en callback ?
            it('WMS with right, return a layer with attributions', function () {

                Gp.Services.getConfig({
                    serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                    apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                    callbackSuffix : "",
                    timeOut : 20000,
                    onSuccess : function () {
                        map.setView([48, 2], 8);

                        var layer = Layers.WMS({
                            layer : "ORTHOIMAGERY.ORTHOPHOTOS"
                        });

                        layer.addTo(map);
                        // console.log(layer);
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
                    }
                });
            });

            it('WMS with no right, return a layer by default', function () {

                Gp.Services.getConfig({
                    serverUrl : "spec/leaflet/fixtures/autoconf/callback-autoconf-xml",
                    apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                    callbackSuffix : "",
                    timeOut : 20000,
                    onSuccess : function () {
                        map.setView([48, 2], 8);

                        var layer = Layers.WMS({
                            layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS"
                        });

                        layer.addTo(map);
                        console.log(layer);
                        expect(layer._url).to.be.equal("http://localhost?no-rights-found-for=[GEOGRAPHICALGRIDSYSTEMS.MAPS]");
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
                    }
                });
            });

        });
    });
});
