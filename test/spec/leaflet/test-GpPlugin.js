/* global describe, it */

define(["chai"], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test Variable Globale --", function () {

        var Gp = null;
        var L  = null;
        var Plug = null;

        before( function (done) {
            require(["gp","leaflet","Leaflet/GpPluginLeaflet"], function (_Gp, _L, _Plug) {
                Gp = _Gp ;
                L  = _L ;
                Plug = _Plug;
                done();
            });
        });

        describe("Gp", function () {
            it("Nouvelles proprietes de Gp", function () {

                // test des proprietes rajoutees par l'extension au namespace GP
                Gp.should.have.property("leafletExtVersion");
                Gp.should.have.property("leafletExtDate");

            });
        });

        describe("L", function () {
            it("Nouvelles Proprietes de L", function () {

                // test des proprietes par defaut
                // L.geoportalLayer.*
                L.should.have.property("geoportalLayer");
                L.geoportalLayer.should.have.property("WMTS");
                L.geoportalLayer.should.have.property("WMS");
                // L.GeoportalControl.*
                L.should.have.property("geoportalControl");
                // L.GeoportalCRS.*
                L.should.have.property("geoportalCRS");

            });
        });
    });
});
