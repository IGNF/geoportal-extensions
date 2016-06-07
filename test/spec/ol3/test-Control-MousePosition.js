/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test Control MousePosition --", function () {

        var MousePosition;
        var mousePosition;

        before(function (done) {
            require(['Ol3/Controls/MousePosition'], function (_MousePosition) {
                MousePosition = _MousePosition;
                done();
            });
        });

        describe('MousePosition', function () {

            var checkProperties = function (mousePosition) {
                console.log(mousePosition);
                expect(mousePosition).to.be.an("object");

                expect(mousePosition).to.have.property("_projectionSystems");
                expect(mousePosition._projectionSystems).to.be.an("array");
                expect(mousePosition._projectionSystems).to.have.length(4);

                expect(mousePosition).to.have.property("_projectionUnits");
                expect(mousePosition._projectionUnits).to.be.an("object");
                expect(mousePosition._projectionUnits).to.have.property("Geographical");
                expect(mousePosition._projectionUnits.Geographical).to.be.an("array");
                expect(mousePosition._projectionUnits.Geographical).to.have.length(4);
                expect(mousePosition._projectionUnits).to.have.property("Metric");
                expect(mousePosition._projectionUnits.Metric).to.be.an("array");
                expect(mousePosition._projectionUnits.Metric).to.have.length(2);

                expect(mousePosition).to.have.property("_currentProjectionSystems");
                expect(mousePosition._currentProjectionSystems).to.be.an("object");
                expect(mousePosition._currentProjectionSystems).to.have.property("code", "EPSG:4326");

                expect(mousePosition).to.have.property("_currentProjectionType", "Geographical");
                expect(mousePosition).to.have.property("_currentProjectionUnits", "DEC");
            }

            it('Proprietes de MousePosition', function () {
                mousePosition = new MousePosition({
                    apiKey : "jhyvi0fgmnuxvfv0zjzorvdn"
                });
                checkProperties(mousePosition);
            });

        });
    });
});
