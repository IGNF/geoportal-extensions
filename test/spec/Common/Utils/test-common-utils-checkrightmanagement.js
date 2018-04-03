/* global describe, it */

import CheckRightManagement from "../../../../src/Common/Utils/CheckRightManagement";

import { assert, expect, should } from "chai";
should();

describe("-- Test CheckRightManagement --", function () {

    var Gp;
    var Config = {
        generalOptions : {
            apiKeys : {
                "4545454545454545454" : {}
            }
        },
        layers : {

            "resource-1$OGC:OPENLS;service-1" : {
                getServerUrl : function () {},
                getServiceParams : function () {
                    return {
                        version : ""
                    }
                },
                getBBOX : function () {},
                getTitle : function () {},
                getDescription : function () {},

                apiKeys : ["4545454545454545454"],
                serviceParams : {
                    version : "1.0.0",
                    description: "",
                    title: "",
                    serverUrl : {
                        "4545454545454545454" : "http://localhost/service-1"
                    }
                }
            },
            "resource-2$OGC:OPENLS;service-1" : {
                getServerUrl : function () {},
                getServiceParams : function () {
                    return {
                        version : ""
                    }
                },
                getBBOX : function () {},
                getTitle : function () {},
                getDescription : function () {},
                apiKeys : ["4545454545454545454"],
                serviceParams : {
                    version : "1.0.0",
                    description: "",
                    title: "",
                    serverUrl : {
                        "4545454545454545454" : "http://localhost/service-2"
                    }
                }
            }
        }
    };

    before(function () {

    });
    after(function () {
        window.Gp = null;
    });
    
    describe('#check (without autoconfiguration)', function () {

        window.Gp = null;

        it("with no parameter, return an undefined object", function () {
            expect(CheckRightManagement.check()).to.be.undefined;
        });

        it("with no parameter resources, return an undefined object", function () {
            expect(CheckRightManagement.check({
                resources : null
            })).to.be.undefined;
        });

        it("with no parameter services, return an undefined object", function () {
            expect(CheckRightManagement.check({
                resources : ['test'],
                services : null
            })).to.be.undefined;
        });

        it("neither parameter key, nor autoconfiguration, impossible to check it, return an undefined object !", function () {
            expect(CheckRightManagement.check({
                resources : ['resource-1', 'resource-2'],
                services : ['service']
            })).to.be.undefined;
        });

        it("with parameter key, but no autoconfiguration, impossible to check it but returns resources ! (1)", function () {
            expect(CheckRightManagement.check({
                key : '4545454545454545454',
                resources : ['resource-1', 'resource-2'],
                services : ['service-1', 'service-2']
            })).to.eql({
                "key" : "4545454545454545454",
                "service-1" : ['resource-1', 'resource-2'],
                "service-2" : ['resource-1', 'resource-2']
            });
        });

        it("with parameter key, but no autoconfiguration, impossible to check it but returns resources ! (2)", function () {
            expect(CheckRightManagement.check({
                key : '4545454545454545454',
                resources : ['resource-1', 'resource-2'],
                services : ['service']
            })).to.eql({
                "key" : "4545454545454545454",
                "service" : ['resource-1', 'resource-2']
            });
        });
    });

    describe('#check (with autoconfiguration)', function () {

        window.Gp = {};

        it("without parameter key, check it, and it's good !", function () {
            window.Gp.Config = Config;
            var right = CheckRightManagement.check({
                resources : ['resource-1', 'resource-2'],
                services : ['service-1']
            });

            expect(right).to.eql({
                "key" : '4545454545454545454',
                "service-1" : ['resource-1', 'resource-2']
            });
        });

        it("with parameter key, check it, and it's good !", function () {
            window.Gp.Config = Config;
            expect(CheckRightManagement.check({
                key : '4545454545454545454',
                resources : ['resource-1', 'resource-2'],
                services : ['service-1']
            })).to.eql({
                "key" : "4545454545454545454",
                "service-1" : ['resource-1', 'resource-2']
            });
        });

        it("without parameter key, check it, and it's not good because of one resource !", function () {
            window.Gp.Config = Config;
            var right = CheckRightManagement.check({
                resources : ['resource-1', 'resource-no-right'],
                services : ['service-1']
            });

            expect(right).to.eql({
                "key" : "4545454545454545454",
                "service-1" : ['resource-1']
            });
        });

        it("without parameter key, check it, and it's not good because of all resources !", function () {
            window.Gp.Config = Config;
            var right = CheckRightManagement.check({
                resources : ['resource--no-right', 'resource-no-right'],
                services : ['service-1']
            });

            expect(right).to.be.undefined;
        });

        it("without parameter key, check it, and it's not good because of one service !", function () {
            window.Gp.Config = Config;
            var right = CheckRightManagement.check({
                resources : ['resource-1', 'resource-2'],
                services : ['service-no-right']
            });

            expect(right).to.be.undefined;
        });

        it("with parameter key, check it, and it's not good because of key !", function () {
            window.Gp.Config = Config;
            var right = CheckRightManagement.check({
                key : '787878787878787878',
                resources : ['resource-1', 'resource-2'],
                services : ['service-1']
            });

            expect(right).to.be.undefined;
        });
    });
});
