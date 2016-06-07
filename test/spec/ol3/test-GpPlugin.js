/* global describe, it */

define(["chai"], function (chai ) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test --", function () {

        var Gp = null;
        var ol = null;

        before( function (done) {
            require(["gp","ol","Ol3/GpPluginOl3"], function (_Gp,_ol,plugin) {
                Gp = _Gp ;
                ol = _ol ;
                done();
            });
        });

        describe("Gp", function () {
            it("Nouvelles proprietes de Gp", function () {

                console.log(Gp);

                // test des proprietes rajoutees par l'extension au namespace GP
                Gp.should.have.property("ol3extVersion");
                Gp.should.have.property("ol3extDate");

            });
        });

        describe("ol", function () {
            it("Nouvelles Proprietes de ol", function () {

                console.log(ol);
                console.log(ol.source);

                // test des proprietes par defaut
                // ol.source.*
                ol.should.have.property("source");
                ol.source.should.have.property("GeoportalWMTS");
                ol.source.should.have.property("GeoportalWMS");
                // ol.layer.*
                ol.should.have.property("layer");
                ol.layer.should.have.property("GeoportalWMTS");
                ol.layer.should.have.property("GeoportalWMS");
                // ol.control.*
                ol.should.have.property("control");
                ol.control.should.have.property("GeoportalAttribution");
                ol.control.should.have.property("LayerSwitcher");

            });
        });
    });
});
