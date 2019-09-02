import * as Itowns from "../../../node_modules/itowns/dist/itowns";
// import * as Itowns from "itowns";
import GlobeViewExtended from "../../../src/Itowns/GlobeViewExtended";
import Logger from "../../../src/Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("test-GlobeViewExtended");

window.itowns = Itowns;

const assert = require('assert');

// Asserts two float number are equals (difference under or equal to 1/precision)
function assertFloatEqual(float1, float2, precision = 5) {
    let epsilon = 1 / precision;
    assert(Math.abs(float1 - float2) <= epsilon, `${float1} == ${float2}`);
}

// Asserts two float number are not equals (difference upper to 1/precision)
function assertFloatNotEqual(float1, float2, precision = 5) {
    let epsilon = 1 / precision;
    assert(Math.abs(float1 - float2) > epsilon, `${float1} != ${float2}`);
}

// Asserts a value is a number
function assertIsNumber(n) {
    assert(!isNaN(parseFloat(n)) && isFinite(n), `${n} is not a number`);
}

// Waits for two asynchronous requests completion before to call done()
function doubleDone(done) {
    // reset operator
    if (done === undefined) {
        doubleDone.firstDone = false;
        return;
    }

    if (doubleDone.firstDone) done();
    else doubleDone.firstDone = true;
};

// convenience class to check if layers are correctly added/removed
class LayerManager {
    //
    constructor(view) {
        this._view = view;
        this._layers = [];
    }

    //
    createWMTSSourceFromConfig(config) {
        config.source = new itowns.WMTSSource(config.source);
        return config;
    };

    createWMSSourceFromConfig(config) {
        config.source = new itowns.WMSSource(config.source);
        return config;
    };

    addColorLayerFromConfig(config) {
        var layer = new itowns.ColorLayer(config.id, config);
        globeViewExtended.addLayer(layer);
    };

    addElevationLayerFromConfig(config) {
        var layer = new itowns.ElevationLayer(config.id, config);
        globeViewExtended.addLayer(layer);
    };

    add(layer) {
        if (layer.type !== 'color' && layer.type !== 'elevation') throw (`unkown layer type '${layer.type}'`);

        var promise = this._view.addLayer(layer);
        this._layers.push(layer);
        return promise;
    }

    //
    remove(layerId) {
        this._view.removeLayer(layerId);

        var index = this._layers.findIndex((layer) => layer.id === layerId);
        assert(index >= 0);

        this._layers.splice(index, 1);
    }

    //
    getColorLayers() {
        return this._layers.filter(layer => layer.type === "color");
    }

    //
    pickColorLayer() {
        var layer = this._layers.find(layer => layer.type === "color");
        assert(layer, 'no color layer found');
        return layer;
    }

    //
    getElevationLayers() {
        return this._layers.filter(layer => layer.type === "elevation");
    }

    //
    getVectorLayers() {
        return this._layers.filter(layer => layer.protocol === "rasterizer");
    }

    //
    pickVectorLayer() {
        var layer = this._layers.find(layer => layer.protocol === "rasterizer");
        assert(layer, 'no vector layer found');
        return layer;
    }
}

describe("-- [Itowns] Test GlobeViewExtended API --", function () {

    window.globeViewExtended = null;
    var layerManager = null;
    var div;
    const viewWidth = 800;
    const viewHeight = 600;
    const initPosition = {
        longitude: 2.35,
        latitude: 47,
        altitude: 25000000,
        zoom: 1,
        tilt: 32.83,
        heading: 68.41
    }
    const francePosition = {
        longitude: 2.6,
        latitude: 47.5,
        zoom: 5,
        tilt: 89.5,
        heading: 0
    }
    const MontBlancPosition = {
        longitude: 6.86,
        latitude: 45.833,
        zoom: 12,
        tilt: 89.5,
        heading: 0
    }
    const colorLayer = {
        id: `GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD$GEOPORTAIL:OGC:WMTS`,
        url: `spec/itowns/resources/JSONLayers/ScanEX.json`
    }
    const zoomScale = {
        zoom: 9,
        scale: .00000257016,
        precision: 11
    }

    before(function () {
        div = document.createElement('div');
        div.style.width = viewWidth + 'px';
        div.style.height = viewHeight + 'px';
        // div.style.visibility = 'hidden';

        document.body.appendChild(div);

        globeViewExtended = new GlobeViewExtended(div, initPosition);
        layerManager = new LayerManager(globeViewExtended);
    });

    after(function () {
        document.body.removeChild(div);
    });

    describe('#initialization', function () {

        it('should correctly initialize the globe', function (done) {
            if (globeViewExtended.isInitialized()) {
                assert.ok(true);
                done();
            } else {
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, function () {
                    // ordered color layers
                    window.itowns.Fetcher.json('spec/itowns/resources/JSONLayers/Ortho.json').then(layerManager.createWMTSSourceFromConfig).then(layerManager.addColorLayerFromConfig);

                    // window.itowns.Fetcher.json("spec/itowns/resources/JSONLayers/Ortho.json").then(result => layerManager.add(result)).then(() => {
                    //     return window.itowns.Fetcher.json("spec/itowns/resources/JSONLayers/Region.json").then(result => layerManager.add(result));
                    // });
                    layerManager.add({
                        type : 'color',
                        id : 'S_TOP100',
                        name : 'kml',
                        transparent : true,
                        source : {
                            protocol : 'file',
                            url : 'spec/itowns/resources/KML/S_TOP100.kml',
                            projection : 'EPSG:4326'
                        }
                    });
                    // elevation layers
                    window.itowns.Fetcher.json("spec/itowns/resources/JSONLayers/IGN_MNT.json").then(result => layerManager.add(result));
                    window.itowns.Fetcher.json("spec/itowns/resources/JSONLayers/IGN_MNT_HIGHRES.json").then(result => layerManager.add(result));
                    assert.ok(true);
                    globeViewExtended.forgetByKey(eventKey);
                    done();
                });
            }
        });
    });

    describe('#getters', function () {

        it('should get zoom', () => {
            assertIsNumber(globeViewExtended.getZoom());
        });

        it('should get range', () => {
            assertIsNumber(globeViewExtended.getRange());
        });

        it('should get tilt', () => {
            assertIsNumber(globeViewExtended.getTilt());
        });

        it('should get azimuth', () => {
            assertIsNumber(globeViewExtended.getAzimuth());
        });

        it('should get center coordinates', () => {
            assertIsNumber(globeViewExtended.getCenter().lon);
            assertIsNumber(globeViewExtended.getCenter().lat);
        });

        it('should get scene extent', () => {
            var extent = globeViewExtended.getExtent();
            assert(extent, "no extent returned");
            assertIsNumber(extent.east);
            assertIsNumber(extent.west);
            assertIsNumber(extent.north);
            assertIsNumber(extent.south);
        });

        it('should get current scale', (done) => {
            globeViewExtended.setZoom(zoomScale.zoom).then(() => {
                var scale = globeViewExtended.getScale();
                assert.equal(globeViewExtended.getZoom(), zoomScale.zoom);
                assertFloatEqual(scale, zoomScale.scale, zoomScale.precision);
                done();
            }).catch(e => done(e));
        });

        it('should get coordinate from pixel', () => {
            globeViewExtended.setZoom(zoomScale.zoom).then(() => {
                var coords = globeViewExtended.getCoordinateFromPixel(Math.floor(viewWidth / 2), Math.floor(viewHeight / 2));
                assert(typeof coords === 'object', 'coords is not an object');
                assertIsNumber(coords.longitude);
                assertIsNumber(coords.latitude);
            });
        });

        it('should get coordinate from mouse event', () => {
            var mouseEvent = {
                offsetX: viewWidth / 2,
                offsetY: viewHeight / 2
            };
            globeViewExtended.setZoom(zoomScale.zoom).then(() => {
                var coords = globeViewExtended.getCoordinateFromMouseEvent(mouseEvent);

                assert(typeof coords === 'object', 'coords is not an object');
                assertIsNumber(coords.longitude);
                assertIsNumber(coords.latitude);
            });
        });

        it('should get a layer by his id', () => {
            var colorLayer = globeViewExtended.getLayerById("ORTHOIMAGERY.ORTHOPHOTOS$GEOPORTAIL:OGC:WMTS");
            assert(colorLayer, 'color layer not found');

            var vectorLayer = globeViewExtended.getLayerById("S_TOP100");
            assert(vectorLayer, 'vector layer not found');

            var elevationLayer = globeViewExtended.getLayerById("ELEVATION.ELEVATIONGRIDCOVERAGE$GEOPORTAIL:OGC:WMTS");
            assert(elevationLayer, 'elevation layer not found');
        });

        it('should get a color layer by his id', () => {
            var colorLayer = globeViewExtended.getColorLayerById("ORTHOIMAGERY.ORTHOPHOTOS$GEOPORTAIL:OGC:WMTS");
            assert(colorLayer, 'color layer not found');

            //vector layer = color layer
            var colorLayer = globeViewExtended.getColorLayerById("S_TOP100");
            assert(colorLayer, 'vector layer not found');

            var elevationLayer = globeViewExtended.getColorLayerById("ELEVATION.ELEVATIONGRIDCOVERAGE$GEOPORTAIL:OGC:WMTS");
            assert(!elevationLayer, 'elevation layer found');
        });

        it('should get all color layers', () => {
            var colorLayers = globeViewExtended.getColorLayers();

            assert(colorLayers, 'no color layer found');
            assert.equal(colorLayers.length, layerManager.getColorLayers().length);

            layerManager.getColorLayers().forEach((layerRef) => {
                assert(colorLayers.find(layer => layer.id === layerRef.id), `layer '${layerRef.id}' not found`);
            });
        });

        it('should get all vector layers', () => {
            var vectorLayers = globeViewExtended.getVectorLayers();

            assert(vectorLayers, 'no vector layer found');
            assert.equal(vectorLayers.length, layerManager.getVectorLayers().length);

            layerManager.getVectorLayers().forEach((layerRef) => {
                assert(vectorLayers.find(layer => layer.id === layerRef.id), `layer '${layerRef.id}' not found`);
            });
        });

        it('should get all elevation layers', () => {
            var elevationLayers = globeViewExtended.getElevationLayers();

            assert(elevationLayers, 'no elevation layer found');
            assert.equal(elevationLayers.length, layerManager.getElevationLayers().length);

            layerManager.getElevationLayers().forEach((layerRef) => {
                assert(elevationLayers.find(layer => layer.id === layerRef.id), `layer '${layerRef.id}' not found`);
            });
        });
    });

    describe('#setters', function () {

        it('should correctly set center', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(francePosition).then(() => {
                assertFloatEqual(globeViewExtended.getCenter().lon, francePosition.longitude, 3);
                assertFloatEqual(globeViewExtended.getCenter().lat, francePosition.latitude, 3);
                done();
            }).catch(e => done(e));
        });

        it('should correctly set layer opacity', () => {
            var layerId = layerManager.pickColorLayer().id;
            var oldOpacity = globeViewExtended.getColorLayerById(layerId).opacity;
            var newOpacity = (oldOpacity + 0.1) % 1;


            globeViewExtended.setLayerOpacity(layerId, newOpacity);
            assert.equal(globeViewExtended.getColorLayerById(layerId).opacity, newOpacity);
            globeViewExtended.setLayerOpacity(layerId, oldOpacity);
            assert.equal(globeViewExtended.getColorLayerById(layerId).opacity, oldOpacity);
        });

        it('should correctly set layer visibility', () => {
            var layerId = layerManager.pickColorLayer().id;
            var oldVisible = globeViewExtended.getColorLayerById(layerId).visible;

            globeViewExtended.setLayerVisibility(layerId, !oldVisible);
            assert.equal(globeViewExtended.getColorLayerById(layerId).visible, !oldVisible);
            globeViewExtended.setLayerVisibility(layerId, oldVisible);
            assert.equal(globeViewExtended.getColorLayerById(layerId).visible, oldVisible);
        });

        it('should correctly set layer sequence', () => {
            var layerId = layerManager.pickColorLayer().id;
            var oldSequence = globeViewExtended.getColorLayerById(layerId).sequence;
            var newSequence = oldSequence === globeViewExtended.getColorLayers().length - 1 ? oldSequence - 1 : oldSequence + 1;

            globeViewExtended.moveLayerToIndex(layerId, newSequence);
            assert.equal(globeViewExtended.getColorLayerById(layerId).sequence, newSequence);
            globeViewExtended.moveLayerToIndex(layerId, oldSequence);
            assert.equal(globeViewExtended.getColorLayerById(layerId).sequence, oldSequence);
        });

        it('should correctly set tilt', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                // la valeur de tilt doit être [4 89.5]
                var newTilt = (globeViewExtended.getTilt() + 25) % 89.5;
                if (newTilt < 4) newTilt = 4;

                return globeViewExtended.setTilt(newTilt).then(() => {
                    let tilt = globeViewExtended.getTilt();
                    assertFloatEqual(tilt, newTilt);
                });
            }).then(() => done()).catch(e => done(e));
        });

        it('should correctly set azimuth', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                var newAzimuth = (globeViewExtended.getAzimuth() + 25) % 360;

                return globeViewExtended.setAzimuth(newAzimuth).then(() => {
                    assertFloatEqual(globeViewExtended.getAzimuth(), newAzimuth);
                });
            }).then(() => done()).catch(e => done(e));
        });

        it('should correctly set zoom', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                var oldZoom = globeViewExtended.getZoom();
                var newZoom = oldZoom < 10 ? oldZoom + 1 : oldZoom - 1;

                return globeViewExtended.setZoom(newZoom).then(() => {
                    assert.equal(globeViewExtended.getZoom(), newZoom);
                });
            }).then(() => done()).catch(e => done(e));
        });

        it('should change camera position', () => {
            var cameraPos1 = globeViewExtended.getGlobeView().camera.camera3D.position.clone();
            var target = globeViewExtended.getGlobeView().controls.getCameraTargetGeoPosition().as('EPSG:4978').xyz(); // Geocentric system;
            var newTarget = {
                x: target.x + 10000,
                y: target.y + 10000,
                z: target.z
            }

            globeViewExtended.setCameraPosition(newTarget, 2000000); //pourquoi la vue ne change pas?
            globeViewExtended.notifyChange();

            var cameraPos2 = globeViewExtended.getGlobeView().camera.camera3D.position;

            assertFloatNotEqual(cameraPos1.x, cameraPos2.x);
            assertFloatNotEqual(cameraPos1.y, cameraPos2.y);
            assertFloatNotEqual(cameraPos1.z, cameraPos2.z);

            globeViewExtended.getGlobeView().camera.camera3D.position.copy(cameraPos1);
        });

        // it('lookAt', () => {
        //     var target = globeViewExtended.getGlobeView().controls.getCameraTargetGeoPosition().as('EPSG:4978').xyz(); // Geocentric system;
        //     var newTarget = {
        //         x: target.x + 10000,
        //         y: target.y + 10000,
        //         z: target.z
        //     }
        //
        //     globeViewExtended.lookAt(newTarget);
        //
        //     target = globeViewExtended.getGlobeView().controls.getCameraTargetGeoPosition().as('EPSG:4978').xyz(); // Geocentric system;
        // });
    });

    describe('#utility methods', function () {
        this.timeout(4000);
        it('should get features at mouse position', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(francePosition).then(() => {
                setTimeout(function () {
                    var mouseEvent = {
                        offsetX: viewWidth / 2,
                        offsetY: viewHeight / 2
                    }
                    var feats = globeViewExtended.getFeaturesAtMousePosition(mouseEvent);

                    assert(feats, "no features returned");
                    assert(feats.length > 0, "no features returned");
                    done();

                }, 2000);
            }).catch(e => done(e));
        });

        it('getCameraTargetPosition', () => {
            var target = globeViewExtended.getCameraTargetPosition();
            assert(target.hasOwnProperty("x"));
            assert(target.hasOwnProperty("y"));
            assert(target.hasOwnProperty("z"));
            assertIsNumber(target.x);
            assertIsNumber(target.y);
            assertIsNumber(target.z);
        });

        it('pixelsToMeters', () => {
            var meters = globeViewExtended.pixelsToMeters(1);
            assertIsNumber(meters);
        });

        it('metersToPixels', () => {
            var pixels = globeViewExtended.metersToPixels(1);
            assertIsNumber(pixels);
        });

        it('resize', () => {
            var oldCenter = globeViewExtended.getCenter();

            var newWidth = Math.floor(3 * viewWidth / 4);
            var newHeight = Math.floor(3 * viewHeight / 4);

            globeViewExtended.resize(newWidth, newHeight);

            var newCenter = globeViewExtended.getCenter();

            //check that resize has not changed the camera target
            assertFloatEqual(oldCenter.lon, newCenter.lon);
            assertFloatEqual(oldCenter.lat, newCenter.lat);

            var canvas = globeViewExtended.getTargetElement().getElementsByTagName('canvas')[0];;
            assertFloatEqual(canvas.width, newWidth);
            assertFloatEqual(canvas.height, newHeight);

            globeViewExtended.resize(viewWidth, viewHeight);
        });
    });

    describe('#layers management', function () {
        it('should correctly add a layer', (done) => {
            var nbLayers = globeViewExtended.getColorLayers().length;
            window.itowns.Fetcher.json(colorLayer.url).then(newLayer => {
                return layerManager.add(newLayer).then(() => {
                    assert.equal(globeViewExtended.getColorLayers().length, layerManager.getColorLayers().length);
                    var layer = globeViewExtended.getLayerById(newLayer.id);
                    assert(layer, 'layer not found');
                })
            }).then(() => done()).catch(e => done(e));
        });

        it('should correctly remove a layer', () => {
            layerManager.remove(colorLayer.id);

            assert.equal(globeViewExtended.getColorLayers().length, layerManager.getColorLayers().length);

            var layer = globeViewExtended.getLayerById(colorLayer.id);
            assert(!layer, 'removed layer found');
        });
    });

    describe('#events', function () {
        this.timeout(4000);

        it('should correctly launch visible property changed event', function (done) {
            var layerId = layerManager.pickColorLayer().id;
            var oldVisible = globeViewExtended.getColorLayerById(layerId).visible;

            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById(layerId), GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey(eventKey);
                globeViewExtended.setLayerVisibility(layerId, oldVisible);
                done();
            });
            globeViewExtended.setLayerVisibility(layerId, !oldVisible);
        });

        it('should correctly launch opacity property changed event', function (done) {
            var layerId = layerManager.pickColorLayer().id;
            var oldOpacity = globeViewExtended.getColorLayerById(layerId).opacity;
            var newOpacity = (oldOpacity + 0.1) % 1;

            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById(layerId), GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey(eventKey);
                globeViewExtended.setLayerOpacity(layerId, oldOpacity);
                done();
            });
            globeViewExtended.setLayerOpacity(layerId, newOpacity);
        });

        it('should correctly launch sequence property changed event', function (done) {
            var layerId = layerManager.pickColorLayer().id;
            var oldSequence = globeViewExtended.getColorLayerById(layerId).sequence;
            var newSequence = oldSequence === globeViewExtended.getColorLayers().length - 1 ? oldSequence - 1 : oldSequence + 1;

            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById(layerId), GlobeViewExtended.EVENTS.SEQUENCE_PROPERTY_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey(eventKey);
                globeViewExtended.moveLayerToIndex(layerId, oldSequence);
                done();
            });
            globeViewExtended.moveLayerToIndex(layerId, newSequence);
        });

        it('should get layer event infos', (done) => {
            var layerId = layerManager.pickColorLayer().id;
            var oldOpacity = globeViewExtended.getColorLayerById(layerId).opacity;
            var newOpacity = (oldOpacity + 0.1) % 1;
            var propertyName = "opacity";

            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById(layerId), GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, (evt) => {
                globeViewExtended.forgetByKey(eventKey);

                var info = globeViewExtended.getLayerEventInfos(evt);

                assert(info.hasOwnProperty("propertyName"), 'no propertyName info');
                assert(info.hasOwnProperty("previousValue"), 'no previousValue info');
                assert(info.hasOwnProperty("newValue"), 'no newValue info');
                assert.equal(info.propertyName, propertyName, "erroneous info value");
                assert.equal(info.previousValue, oldOpacity, "erroneous info value");
                assert.equal(info.newValue, newOpacity, "erroneous info value");

                globeViewExtended.setLayerOpacity(layerId, oldOpacity);
                done();
            });
            globeViewExtended.setLayerOpacity(layerId, newOpacity);
        });

        it('should correctly launch orientation changed event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                doubleDone(); //reset operator
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.ORIENTATION_CHANGED, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey(eventKey);
                    doubleDone(done);
                });

                // la valeur de tilt doit être [4 89.5]
                var newTilt = (globeViewExtended.getTilt() + 25) % 89.5;
                if (newTilt < 4) newTilt = 4;

                return globeViewExtended.setTilt(newTilt).then(() => doubleDone(done));
            }).catch(e => done(e));
        });

        it('should correctly launch range changed event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                doubleDone(); //reset operator
                var newZoom = initPosition.zoom < 10 ? initPosition.zoom + 1 : initPosition.zoom - 1;

                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.RANGE_CHANGED, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey(eventKey);
                    doubleDone(done);
                });
                return globeViewExtended.setZoom(newZoom).then(() => doubleDone(done));
            }).catch(e => done(e));
        });

        it('should correctly launch layer added event', function (done) {
            doubleDone(); //reset operator
            window.itowns.Fetcher.json(colorLayer.url).then(newLayer => {
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.LAYER_ADDED, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey(eventKey);
                    doubleDone(done);
                });
                return layerManager.add(newLayer).then(() => doubleDone(done));
            }).catch(e => done(e));
        });

        it('should correctly launch layer removed event', function (done) {
            var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.LAYER_REMOVED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey(eventKey);
                done();
            });
            layerManager.remove(colorLayer.id);
        });

        it('should correctly launch layer order changed event', function (done) {
            var layerId = layerManager.pickColorLayer().id;
            var oldSequence = globeViewExtended.getColorLayerById(layerId).sequence;
            var newSequence = oldSequence === globeViewExtended.getColorLayers().length - 1 ? oldSequence - 1 : oldSequence + 1;

            var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey(eventKey);
                done();
            });
            globeViewExtended.moveLayerToIndex(layerId, newSequence);
        });

        it('should correctly launch after render event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                var newZoom = initPosition.zoom < 10 ? initPosition.zoom + 1 : initPosition.zoom - 1;

                doubleDone(); //reset operator
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.AFTER_RENDER, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey(eventKey);
                    doubleDone(done);
                });
                return globeViewExtended.setZoom(newZoom).then(() => doubleDone(done));
            }).catch(e => done(e));
        });

        it('should correctly launch pre-render event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                var newZoom = initPosition.zoom < 10 ? initPosition.zoom + 1 : initPosition.zoom - 1;

                doubleDone(); //reset operator
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.PRE_RENDER, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey(eventKey);
                    doubleDone(done);
                });
                globeViewExtended.preRenderEventFetchColorLayersDisplayed(true);
                globeViewExtended.preRenderEventFetchViewExtent(true);

                return globeViewExtended.setZoom(newZoom).then(() => doubleDone(done));
            }).catch(e => done(e));
        });

        it('pre-render event should correctly fetch infos', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then(() => {
                doubleDone(); //reset operator

                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.PRE_RENDER, (event) => {
                    globeViewExtended.forgetByKey(eventKey);

                    try {
                        assert(event.extent, "info 'extent' not fetched");
                        assertIsNumber(event.extent.east());
                        assertIsNumber(event.extent.west());
                        assertIsNumber(event.extent.north());
                        assertIsNumber(event.extent.south());

                        assert(event.colorLayersId, "info 'color layers id' not fetched");
                        layerManager.getColorLayers().forEach((layerRef) => {
                            assert(event.colorLayersId.indexOf(layerRef.id) >= 0, `layer '${layerRef.id}' not found`);
                        });

                        assert(event.elevationLayersId, "info 'elevation layers id' not fetched");
                        layerManager.getElevationLayers().forEach((layerRef) => {
                            assert(event.elevationLayersId.indexOf(layerRef.id) >= 0, `layer '${layerRef.id}' not found`);
                        });

                        doubleDone(done);
                    } catch (e) {
                        done(e);
                    }
                });

                globeViewExtended.preRenderEventFetchColorLayersDisplayed(true);
                globeViewExtended.preRenderEventFetchViewExtent(true);
                globeViewExtended.preRenderEventFetchElevationLayersDisplayed(true);

                return globeViewExtended.setCameraTargetGeoPosition(MontBlancPosition).then(() => doubleDone(done));
            }).catch(e => done(e));
        });
    });
});
