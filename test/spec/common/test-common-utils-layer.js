/* global describe, it */
import Utils from "../../../src/Common/Utils/LayerUtils";

import { assert, expect, should } from "chai";
should();

describe("-- Test LayerUtils --", function () {

    describe('#getZoomLevelFromScaleDenominator', function () {

        it("with parameter scale in level, return a zoom level", function () {
            expect(Utils.getZoomLevelFromScaleDenominator(1091957)).to.be.equal(10);
        });

        it("with parameter scale out level, return a zoom level", function () {
            expect(Utils.getZoomLevelFromScaleDenominator(100000000000)).to.be.equal(0);
        });

        it("with parameter scale empty, return 0!", function () {
            expect(Utils.getZoomLevelFromScaleDenominator()).to.be.equal(0);
        });
    });

    describe('#getAttributions', function () {

        it("without parameters, return an empty list of attributions", function () {
            var params = {};
            var attributions = Utils.getAttributions(params);
            expect(attributions).to.be.empty;
        });

        it("with parameter visibility to false, return an empty list of attributions", function () {
            var params = {
                extent : [],
                zoom : 2,
                visibility : false,
                originators : []
            };
            var attributions = Utils.getAttributions(params);
            expect(attributions).to.be.empty;
        });

        it("with parameter originators to be empty, return an empty list of attributions", function () {
            var params = {
                extent : [],
                zoom : 2,
                visibility : true,
                originators : []
            };
            var attributions = Utils.getAttributions(params);
            expect(attributions).to.be.empty;
        });

        it("with parameter zoom out level, return an empty list of attributions", function () {
            var params = {
                extent : [0, 0, 1, 1],
                zoom : 2,
                visibility : true,
                originators : [
                    {
                        constraints: [

                            {
                                crs: "EPSG:4326",
                                maxScaleDenominator: 8735661,
                                minScaleDenominator: 2133,
                                bbox: {
                                    bottom: 0,
                                    left: 0,
                                    right: 2,
                                    top: 2
                                }
                            }
                        ],
                        attribution: "IGN",
                        logo: "http://wxs.ign.fr/static/logos/IGN/IGN.gif",
                        name: "IGN",
                        url: "http://www.ign.fr"
                    }
                ]
            };

            var attributions = Utils.getAttributions(params);
            expect(attributions).to.be.empty;
        });

        it("with parameter extent off extended, return an empty list of attributions", function () {
            var params = {
                extent : [10, 10, 11, 11],
                zoom : 10,
                visibility : true,
                originators : [
                    {
                        constraints: [

                            {
                                crs: "EPSG:4326",
                                maxScaleDenominator: 8735661,
                                minScaleDenominator: 2133,
                                bbox: {
                                    bottom: 0,
                                    left: 0,
                                    right: 2,
                                    top: 2
                                }
                            }
                        ],
                        attribution: "IGN",
                        logo: "http://wxs.ign.fr/static/logos/IGN/IGN.gif",
                        name: "IGN",
                        url: "http://www.ign.fr"
                    }
                ]
            };

            var attributions = Utils.getAttributions(params);
            expect(attributions).to.be.empty;
        });

        it("with good parameters, return an attribution", function () {
            var params = {
                extent : [0, 0, 1, 1],
                zoom : 8,
                visibility : true,
                originators : [
                    {
                        constraints: [

                            {
                                crs: "EPSG:4326",
                                maxScaleDenominator: 8735661,
                                minScaleDenominator: 2133,
                                bbox: {
                                    bottom: 0,
                                    left: 0,
                                    right: 2,
                                    top: 2
                                }
                            }
                        ],
                        attribution: "IGN",
                        logo: "http://wxs.ign.fr/static/logos/IGN/IGN.gif",
                        name: "IGN",
                        url: "http://www.ign.fr"
                    }
                ]
            };

            var attributions = Utils.getAttributions(params);
            expect(attributions).not.to.be.empty;
        });
    });
});
