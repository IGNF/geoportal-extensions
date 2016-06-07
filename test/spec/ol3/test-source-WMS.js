/* global describe, it */

define(['chai', 'gp'], function (chai, Gp) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test source WMS--", function () {

        var WMS;
        var configWMS;

        describe('Création d\'une source WMS, sans chargement de l\'autoconf', function() {

            before(function (done) {
                require(['Ol3/Layers/SourceWMS'], function (_WMS) {
                    WMS = _WMS;
                    done();
                });
            });

            it('Comportement : Erreur appelant à charger l\'autoconf', function() {
                try {
                    var gpSource = new WMS({
                        layer : "HR.ORTHOIMAGERY.ORTHOPHOTOS"
                    });
                    console.log(gpSource);
                } catch (e) {
                    console.log(e);
                    expect(e).to.have.property("message", "ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
                }
            })
        })

        describe('Propriétés de sourceWMS', function () {

            beforeEach(function (done) {
                require(['Ol3/Layers/SourceWMS'], function (_WMS) {
                    configWMS = Gp.Services.getConfig({
                        // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                        serverUrl : "./spec/ol3/resources/AutoConf.js",
                        callbackSuffix : "",
                        onSuccess : function (response) {
                            WMS = _WMS;
                            done();
                        }
                    });
                });
            });

            var checkSourceProperties = function(source) {
                console.log(source);
                expect(source).to.be.an("Object");
                expect(source).to.have.property("params_");
                expect(source.params_).to.be.an("Object");

                // options WMS
                expect(source.params_).to.have.property("VERSION");
                expect(source.params_).to.have.property("FORMAT");
                expect(source.params_).to.have.property("SERVICE", "WMS");
                expect(source.params_).to.have.property("LAYERS", "HR.ORTHOIMAGERY.ORTHOPHOTOS");
                expect(source.params_).to.have.property("STYLES");
                expect(source).to.have.property("urls");
                expect(source.urls).to.be.an("Array");

                // options spécifiques à la source Géoportail
                expect(source).to.have.property("_originators");
                expect(source._originators).to.be.an("Array");
                expect(source).to.have.property("_legends");
                expect(source._legends).to.be.an("Array");
                expect(source).to.have.property("_metadata");
                expect(source._metadata).to.be.an("Array");
            }

            it('Paramètre layer uniquement', function () {

                var gpSource = new WMS({
                    layer : "HR.ORTHOIMAGERY.ORTHOPHOTOS"
                });

                checkSourceProperties(gpSource);
            });

            it('Paramètres OpenLayers ajoutés', function() {
                // TODO : charger avec olParams puis url : gpp-wxs.ign.fr
                // et vérifier l'url.
                var gpSource = new WMS({
                    layer : "HR.ORTHOIMAGERY.ORTHOPHOTOS",
                    olParams : {
                        params : {
                            FORMAT : "image/png"
                        }
                    }
                });
                //checkSourceProperties(gpSource);
                expect(gpSource.params_.FORMAT).to.equal("image/png");
            });

        });

    });
});
