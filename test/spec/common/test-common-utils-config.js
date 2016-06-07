/* global describe, it */

define(['chai'], function (chai) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Test Config --", function () {

        var Config;
        var key = "w6lxse7rpnhirxhsk2qzbafu";

        before(function (done) {
            require(['Common/Utils/Config'], function (_Config) {
                Config = _Config;
                done();
            });
        });

        describe('#isConfigLoaded', function () {

            it('without autoconf, configuration is not loaded', function () {
                expect(Config.isConfigLoaded()).to.be.false;
            });

            it('with autoconf, configuration is loaded', function () {
                window.Gp = {};
                window.Gp.Config = {
                    test : "test"
                };
                expect(Config.isConfigLoaded()).to.be.true;
            });

        });

        describe('#getLayerParams', function () {

            it('without autoconf, return nothing', function () {
                expect(Config.getLayerParams()).to.be.empty;
            });

            it('with autoconf but without parameters, return an empty list', function () {
                Config.configuration = {
                    test : "test"
                };
                expect(Config.getLayerParams()).to.be.empty;
            });

            it('with parameter layer unknown, return an empty list', function () {
                Config.configuration = {
                    layers : {
                        "layer$service" : {
                            apiKeys : [
                                'key'
                            ]
                        }
                    }
                };
                expect(Config.getLayerParams('layer_unknown', 'service', 'key')).to.be.empty;
            });

            it('with parameter service unknown, return an empty list', function () {
                Config.configuration = {
                    layers : {
                        "layer$id1:id2:service" : {
                            apiKeys : [
                                'key'
                            ]
                        }
                    }
                };
                expect(Config.getLayerParams('layer', 'service_unknown', 'key')).to.be.empty;
            });

            xit('with parameter key optionnal, return an empty list', function () {
                Config.configuration = {
                    layers : {
                        "layer$id1:id2:service" : {
                            apiKeys : [
                                'key'
                            ]
                        }
                    }
                };
                expect(Config.getLayerParams('layer', 'service')).to.be.empty;
            });

            xit('with good parameter, return an object', function () {
                Config.configuration = {
                    layers : {
                        "layer$id1:id2:service" : {
                            serviceParams : {
                                serverUrl : {
                                    "key" : "url"
                                }
                            },
                            apiKeys : [
                                'key'
                            ]
                        }
                    }
                };
                expect(Config.getLayerParams('layer', 'service', 'key')).not.to.be.empty;
            });
        });

        describe('#getServiceParams', function () {

            it('without autoconf, return nothing', function () {
                expect(Config.getServiceParams()).to.be.empty;
            });

            it('with autoconf but without parameters, return an empty list', function () {
                Config.configuration = {
                    test : "test"
                };
                expect(Config.getServiceParams()).to.be.empty;
            });

            it('with parameter layer unknown, return an empty list', function () {
                Config.configuration = {
                    layers : {
                        "layer$service" : {
                            apiKeys : [
                                'key'
                            ]
                        }
                    }
                };
                expect(Config.getServiceParams('layer_unknown', 'service', 'key')).to.be.empty;
            });

            it('with parameter service unknown, return an empty list', function () {
                Config.configuration = {
                    layers : {
                        "layer$id1:id2:service" : {
                            apiKeys : [
                                'key'
                            ]
                        }
                    }
                };
                expect(Config.getServiceParams('layer', 'service_unknown', 'key')).to.be.empty;
            });

            xit('with good parameter, return an object', function () {
                Config.configuration = {
                    layers : {
                        "layer$id1:id2;service" : {
                            serviceParams : {
                                serverUrl : {
                                    "key" : "url"
                                }
                            },
                            apiKeys : [
                                'key'
                            ]
                        }
                    }
                };
                debugger;
                expect(Config.getServiceParams('layer', 'service', 'key')).not.to.be.empty;
            });
        });
    });
});
