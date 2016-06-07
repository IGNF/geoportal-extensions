/* global describe, it */

define(['chai', 'gp'], function (chai, Gp) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test source WMTS--", function () {

        var WMTS;
        var config;

        describe('Création d\'une source WMTS, sans chargement de l\'autoconf', function() {

            before(function (done) {
                require(['Ol3/Layers/SourceWMTS'], function (_WMTS) {
                    WMTS = _WMTS;
                    done();
                });
            });

            it('Comportement : Erreur appelant à charger l\'autoconf', function() {
                try {
                    var gpSource = new WMTS({
                        layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS"
                    });
                    console.log(gpSource);
                } catch (e) {
                    console.log(e);
                    expect(e).to.have.property("message", "ERROR : contract key configuration has to be loaded to load Geoportal layers. See http://ignf.github.io/evolution-apigeoportail/ol3/ol3-autoconf.html");
                }
            })
        })

        describe('Propriétés de sourceWMTS', function () {

            before(function (done) {
                require(['Ol3/Layers/SourceWMTS'], function (_WMTS) {
                    config = Gp.Services.getConfig({
                        // apiKey : "jhyvi0fgmnuxvfv0zjzorvdn",
                        serverUrl : "./spec/ol3/resources/AutoConf.js",
                        callbackSuffix : "",
                        onSuccess : function (response) {
                            WMTS = _WMTS;
                            done();
                        }
                    });
                });
            });

            var checkSourceProperties = function(source) {
                console.log(source);
                expect(source).to.be.an("Object");

                // options OpenLayers
                expect(source).to.have.property("version_");
                expect(source).to.have.property("format_");
                expect(source).to.have.property("dimensions_");
                expect(source).to.have.property("layer_", "GEOGRAPHICALGRIDSYSTEMS.MAPS");
                expect(source).to.have.property("matrixSet_", "PM");
                expect(source).to.have.property("tileGrid");
                expect(source).to.have.property("style_");
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

                var gpSource = new WMTS({
                    layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS"
                });

                checkSourceProperties(gpSource);

            });

            it('Paramètres OpenLayers ajoutés', function() {
                // TODO : charger avec olParams puis url : gpp-wxs.ign.fr
                // et vérifier l'url.
                var gpSource = new WMTS({
                    layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS",
                    olParams : {
                        format : "image/png"
                    }
                });
                checkSourceProperties(gpSource);
                expect(gpSource.format_).to.equal("image/png");
            });

        });

    });
});
