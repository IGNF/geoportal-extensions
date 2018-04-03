import * as Itowns from "itowns";
import GlobeViewExtended from "../../../src/Itowns/GlobeViewExtended";
import Logger from "../../../src/Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("test-GlobeViewExtended");

window.itowns = Itowns;

const assert = require('assert');

// Asserts two float number are equals (difference under or equal to 1/precision)
function assertFloatEqual(float1, float2, precision = 5) {
    if( assertFloatEqual.epsilon === undefined ) assertFloatEqual.epsilon = 1/precision;
    assert(Math.abs(float1-float2)<=assertFloatEqual.epsilon, `${float1} == ${float2}`);
}

// Asserts two float number are not equals (difference upper to 1/precision)
function assertFloatNotEqual(float1, float2, precision = 5) {
    if( assertFloatEqual.epsilon === undefined ) assertFloatEqual.epsilon = 1/precision;
    assert(Math.abs(float1-float2)>assertFloatEqual.epsilon, `${float1} != ${float2}`);
}

// Asserts a value is a number
function assertIsNumber(n) {
  assert(!isNaN(parseFloat(n)) && isFinite(n), `${n} is not a number`);
}

// Waits for two asynchronous requests completion before to call done()
function doubleDone (done) {
    // reset operator
    if ( done === undefined ) {
        doubleDone.firstDone = false;
        return;
    }

    if ( doubleDone.firstDone ) done();
    else doubleDone.firstDone = true;
};

describe("-- [Itowns] Test GlobeViewExtended API --", function () {

    this.timeout(2000);

    window.globeViewExtended = null;
    var promises = [];
    var div;
    var viewWidth = 800;
    var viewHeight = 600;
    var initPosition = {};
    var francePosition = {
        longitude: 2.61825,
        latitude: 46.71095,
        zoom: 5
    };

    before(function () {
        div = document.createElement('div');
        div.style.width = viewWidth+'px';
        div.style.height = viewHeight+'px';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        const positionOnGlobe = {
            longitude : 2.3465,
            latitude : 48.88,
            altitude : 25000000
        };

        globeViewExtended = new GlobeViewExtended(div, positionOnGlobe);

        // ordered color layers
        promises.push( window.itowns.Fetcher.json("test/spec/itowns/resources/JSONLayers/Ortho.json").then(result => globeViewExtended.addLayer(result)).then( () => {
            return window.itowns.Fetcher.json("test/spec/itowns/resources/JSONLayers/Region.json").then(result => globeViewExtended.addLayer(result));
        }).then( () => {
            return globeViewExtended.addLayer({
                url : "test/resources/KML/S_TOP100.kml",
                id : "S_TOP100",
                type : "color",
                protocol : "rasterizer"
            });
            // .then( () => new Promise(function(resolve) { // FIXME
            //     setTimeout(resolve, 2000); // pour laisser le temps a la couche vecteur de se charger
            // }));
        }));

        // elevation layers
        promises.push( window.itowns.Fetcher.json("test/spec/itowns/resources/JSONLayers/IGN_MNT.json").then(result => globeViewExtended.addLayer(result)) );
        promises.push( window.itowns.Fetcher.json("test/spec/itowns/resources/JSONLayers/IGN_MNT_HIGHRES.json").then(result => globeViewExtended.addLayer(result)) );

    });

    after(function () {
        document.body.removeChild(div);
    });

    describe('#initialization', function () {

        it('should correctly initialize the globe', function (done) {
            if( globeViewExtended.isInitialized() ) {
                assert.ok(true);
                done();
            } else {
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.GLOBE_INITIALIZED, function () {
                    assert.ok(true);
                    globeViewExtended.forgetByKey( eventKey );
                    done();
                });
            }
        });

        it('should load all layers', function (done) {
            //this.timeout(4000); // FIXME
            Promise.all(promises).then( () => {
                done();
            }).catch( e => done(e) );
        });

    });

    describe('#getters', function () {

        it('should get zoom', () => {
            initPosition.zoom = globeViewExtended.getZoom();
            assertIsNumber(initPosition.zoom);
        });

        it('should get range', () => {
            var range = globeViewExtended.getRange();
            assertIsNumber(range);
        });

        it('should get tilt', () => {
            initPosition.tilt = globeViewExtended.getTilt();
            assertIsNumber(initPosition.tilt);
        });

        it('should get azimuth', () => {
            initPosition.heading = globeViewExtended.getAzimuth();
            assertIsNumber(initPosition.heading);
        });

        it('should get center coordinates', () => {
            initPosition.longitude = globeViewExtended.getCenter().lon;
            initPosition.latitude = globeViewExtended.getCenter().lat;

            assertIsNumber(initPosition.longitude);
            assertIsNumber(initPosition.latitude);
        });

        it('should get scene extent', () => {
            var extent = globeViewExtended.getExtent();

            assert( extent, "no extent returned");
            assertIsNumber(extent.east());
            assertIsNumber(extent.west());
            assertIsNumber(extent.north());
            assertIsNumber(extent.south());
        });

        it('should get current scale', (done) => {
            globeViewExtended.setZoom(9).then( () => {
                var scale = globeViewExtended.getScale();
                assert.equal(globeViewExtended.getZoom(), 9);
                assertFloatEqual(scale, .00000257016, 11 );
                done();
            }).catch(e => done(e));
        });

        it('should get coordinate from pixel', () => {
            var coords = globeViewExtended.getCoordinateFromPixel(Math.floor(viewWidth / 2), Math.floor(viewHeight / 2));
            assert( typeof coords === 'object', 'coords is not an object' );
            assertIsNumber(coords.longitude());
            assertIsNumber(coords.latitude());
        });

        it('should get coordinate from mouse event', () => {
            var mouseEvent = {
                offsetX:viewWidth / 2,
                offsetY:viewHeight / 2
            }

            var coords = globeViewExtended.getCoordinateFromMouseEvent(mouseEvent);

            assert( typeof coords === 'object', 'coords is not an object' );
            assertIsNumber(coords.longitude());
            assertIsNumber(coords.latitude());
        });

        it('should get a layer by his id', () => {
            var colorLayer = globeViewExtended.getLayerById("Ortho");
            assert( colorLayer, 'color layer not found' );

            var vectorLayer = globeViewExtended.getLayerById("S_TOP100");
            assert( vectorLayer, 'vector layer not found' );

            var elevationLayer = globeViewExtended.getLayerById("IGN_MNT");
            assert( elevationLayer, 'elevation layer not found' );
        });

        it('should get a color layer by his id', () => {
            var colorLayer = globeViewExtended.getColorLayerById("Ortho");
            assert( colorLayer, 'color layer not found' );

            //vector layer = color layer
            var colorLayer = globeViewExtended.getColorLayerById("S_TOP100");
            assert( colorLayer, 'vector layer not found' );

            var elevationLayer = globeViewExtended.getColorLayerById("IGN_MNT");
            assert( !elevationLayer, 'elevation layer found' );
        });

        it('should get all color layers', () => {
            var colorLayers = globeViewExtended.getColorLayers();

            assert( colorLayers, 'no color layer found' );
            assert.equal( colorLayers.length, 3 );

            assert( colorLayers.find(layer => layer.id === 'Ortho'), "layer 'Ortho' not found");
            assert( colorLayers.find(layer => layer.id === 'Region'), "layer 'Region' not found");
            assert( colorLayers.find(layer => layer.id === 'S_TOP100'), "layer 'S_TOP100' not found");
        });

        it('should get all vector layers', () => {
            var vectorLayers = globeViewExtended.getVectorLayers();

            assert( vectorLayers, 'no vector layer found' );
            assert.equal( vectorLayers.length, 1 );

            assert( vectorLayers.find(layer => layer.id === 'S_TOP100'), "layer 'S_TOP100' not found");
        });

        it('should get all elevation layers', () => {
            var elevationLayers = globeViewExtended.getElevationLayers();

            assert( elevationLayers, 'no elevation layer found' );
            assert.equal( elevationLayers.length, 2 );

            assert( elevationLayers.find(layer => layer.id === 'IGN_MNT'), "layer 'IGN_MNT' not found");
            assert( elevationLayers.find(layer => layer.id === 'IGN_MNT_HIGHRES'), "layer 'IGN_MNT_HIGHRES' not found");
        });
    });

    describe('#setters', function () {

        it('should correctly set center', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(francePosition).then(()=>{
                assertFloatEqual(globeViewExtended.getCenter().lon, francePosition.longitude, 3);
                assertFloatEqual(globeViewExtended.getCenter().lat, francePosition.latitude, 3);
                done();
            }).catch( e => done(e) );
        });

        it('should correctly set layer opacity', () => {
            var oldOpacity = globeViewExtended.getColorLayerById("Ortho").opacity;
            globeViewExtended.setLayerOpacity("Ortho", 0.57);
            assert.equal(globeViewExtended.getColorLayerById("Ortho").opacity, 0.57);
            globeViewExtended.setLayerOpacity("Ortho", oldOpacity);
            assert.equal(globeViewExtended.getColorLayerById("Ortho").opacity, oldOpacity);
        });

        it('should correctly set layer visibility', () => {
            globeViewExtended.setLayerVisibility("Ortho", false);
            assert.equal(globeViewExtended.getColorLayerById("Ortho").visible, false);
            globeViewExtended.setLayerVisibility("Ortho", true);
            assert.equal(globeViewExtended.getColorLayerById("Ortho").visible, true);
        });

        it('should correctly set layer sequence', () => {
            var sequence = globeViewExtended.getColorLayerById("Ortho").sequence + 1;
            globeViewExtended.moveLayerToIndex("Ortho", sequence);
            assert.equal(globeViewExtended.getColorLayerById("Ortho").sequence, sequence);
            sequence -= 1;
            globeViewExtended.moveLayerToIndex("Ortho", sequence);
            assert.equal(globeViewExtended.getColorLayerById("Ortho").sequence, sequence);
        });

        it('should correctly set tilt', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                return globeViewExtended.setTilt(25).then( () => {
                    assertFloatEqual(globeViewExtended.getTilt(), 25);
                });
            }).then( () => done() ).catch( e => done(e) );
        });

        it('should correctly set azimuth', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                return globeViewExtended.setAzimuth(25).then( () => {
                    assertFloatEqual(globeViewExtended.getAzimuth(), 25);
                });
            }).then( () => done() ).catch( e => done(e) );
        });

        it('should correctly set zoom', (done) => {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                return globeViewExtended.setZoom(8).then( () => {
                    assert.equal(globeViewExtended.getZoom(), 8);
                });
            }).then( () => done() ).catch( e => done(e) );
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

            assertFloatNotEqual(cameraPos1.x, cameraPos2.x, 0);
            assertFloatNotEqual(cameraPos1.y, cameraPos2.y, 0);
            assertFloatNotEqual(cameraPos1.z, cameraPos2.z, 0);

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
        it('should get features at mouse position', (done) => {
            globeViewExtended.setCameraTargetGeoPosition( francePosition ).then( () => {
                var mouseEvent = {
                    offsetX:viewWidth / 2,
                    offsetY:viewHeight / 2
                }
                var feats = globeViewExtended.getFeaturesAtMousePosition(mouseEvent);

                assert( feats, "no features returned");
                assert( feats.length > 0, "no features returned");
                done();
            }).catch(e => done(e));
        });

        it('moveTarget', () => {
            var target = globeViewExtended.moveTarget();
            assert( target.hasOwnProperty("x") );
            assert( target.hasOwnProperty("y") );
            assert( target.hasOwnProperty("z") );
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
            var newWidth = 710;
            var newHeight = 460;

            globeViewExtended.resize(newWidth, newHeight);

            var canvas = globeViewExtended.getTargetElement().getElementsByTagName('canvas')[0];;
            assert.equal( canvas.width, newWidth );
            assert.equal( canvas.height, newHeight );

            globeViewExtended.resize(viewWidth, viewHeight);
        });
    });

    describe('#layers management', function () {
        it('should correctly add a layer', (done) => {
            var nbLayers = globeViewExtended.getColorLayers().length;
            window.itowns.Fetcher.json(`test/spec/itowns/resources/JSONLayers/ScanEX.json`).then( newLayer => {
                return globeViewExtended.addLayer(newLayer).then( () => {
                    assert.equal( nbLayers + 1, globeViewExtended.getColorLayers().length );
                    var layer = globeViewExtended.getLayerById("ScanEX");
                    assert( layer, 'layer not found' );
                })
            }).then( () => done() ).catch( e => done(e) );
        });

        it('should correctly remove a layer', () => {
            var nbLayers = globeViewExtended.getColorLayers().length;

            globeViewExtended.removeLayer("ScanEX");

            assert.equal( nbLayers - 1, globeViewExtended.getColorLayers().length );

            var layer = globeViewExtended.getLayerById("ScanEX");
            assert( !layer, 'layer not removed found' );
        });
    });

    describe('#events', function () {

        it('should correctly launch visible property changed event', function (done) {
            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById("Ortho"), GlobeViewExtended.EVENTS.VISIBLE_PROPERTY_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey( eventKey );
                globeViewExtended.setLayerVisibility("Ortho", true);
                done();
            });
            globeViewExtended.setLayerVisibility("Ortho", false);
        });

        it('should correctly launch opacity property changed event', function (done) {
            var oldOpacity = globeViewExtended.getColorLayerById("Ortho").opacity;
            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById("Ortho"), GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey( eventKey );
                globeViewExtended.setLayerOpacity("Ortho", oldOpacity);
                done();
            });
            globeViewExtended.setLayerOpacity("Ortho", 0.56);
        });

        it('should correctly launch sequence property changed event', function (done) {
            var oldLayerIndex = globeViewExtended.getColorLayerById("Ortho").sequence;
            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById("Ortho"), GlobeViewExtended.EVENTS.SEQUENCE_PROPERTY_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey( eventKey );
                globeViewExtended.moveLayerToIndex("Ortho", oldLayerIndex);
                done();
            });
            globeViewExtended.moveLayerToIndex("Ortho", 1);
        });

        it('should get layer event infos', (done) => {
            var oldOpacity = globeViewExtended.getColorLayerById("Ortho").opacity;
            var newOpacity = 62;
            var eventKey = globeViewExtended.addLayerListener(globeViewExtended.getColorLayerById("Ortho"), GlobeViewExtended.EVENTS.OPACITY_PROPERTY_CHANGED, (evt) => {
                globeViewExtended.forgetByKey( eventKey );

                var info = globeViewExtended.getLayerEventInfos(evt);

                assert( info.hasOwnProperty("propertyName"), 'no propertyName info' );
                assert( info.hasOwnProperty("previousValue"), 'no previousValue info' );
                assert( info.hasOwnProperty("newValue"), 'no newValue info' );
                assert.equal( info.propertyName, "opacity", "erroneous info value" );
                assert.equal( info.previousValue, oldOpacity, "erroneous info value" );
                assert.equal( info.newValue, newOpacity, "erroneous info value" );

                globeViewExtended.setLayerOpacity("Ortho", oldOpacity);
                done();
            });
            globeViewExtended.setLayerOpacity("Ortho", newOpacity);
        });

        it('should correctly launch orientation changed event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                doubleDone(); //reset operator
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.ORIENTATION_CHANGED, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey( eventKey );
                    doubleDone(done);
                });
                return globeViewExtended.setTilt(initPosition.tilt+0.1).then( () => doubleDone(done) );
            }).catch( e => done(e) );
        });

        it('should correctly launch range changed event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                doubleDone(); //reset operator
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.RANGE_CHANGED, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey( eventKey );
                    doubleDone(done);
                });
                return globeViewExtended.setZoom(10).then( () => doubleDone(done) );
            }).catch( e => done(e) );
        });

        it('should correctly launch layer added event', function (done) {
            doubleDone(); //reset operator
            window.itowns.Fetcher.json(`test/spec/itowns/resources/JSONLayers/ScanEX.json`).then( newLayer => {
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.LAYER_ADDED, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey( eventKey );
                    doubleDone(done);
                });
                return globeViewExtended.addLayer(newLayer).then( () => doubleDone(done) );
            }).catch( e => done(e) );
        });

        it('should correctly launch layer removed event', function (done) {
            var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.LAYER_REMOVED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey( eventKey );
                done();
            });
            globeViewExtended.removeLayer('ScanEX');
        });

        it('should correctly launch layer order changed event', function (done) {
            var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.LAYERS_ORDER_CHANGED, () => {
                assert.ok(true);
                globeViewExtended.forgetByKey( eventKey );
                done();
            });
            globeViewExtended.moveLayerToIndex("Region", 1);
        });

        it('should correctly launch after render event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                doubleDone(); //reset operator
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.AFTER_RENDER, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey( eventKey );
                    doubleDone(done);
                });
                return globeViewExtended.setZoom(10).then( () => doubleDone(done) );
            }).catch( e => done(e) );
        });

        it('should correctly launch pre-render event', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                doubleDone(); //reset operator
                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.PRE_RENDER, () => {
                    assert.ok(true);
                    globeViewExtended.forgetByKey( eventKey );
                    doubleDone(done);
                });
                globeViewExtended.preRenderEventFetchColorLayersDisplayed(true);
                globeViewExtended.preRenderEventFetchViewExtent(true);

                return globeViewExtended.setZoom(10).then( () => doubleDone(done) );
            }).catch( e => done(e) );
        });

        it('pre-render event should correctly fetch infos', function (done) {
            globeViewExtended.setCameraTargetGeoPosition(initPosition).then( () => {
                doubleDone(); //reset operator

                var eventKey = globeViewExtended.listen(GlobeViewExtended.EVENTS.PRE_RENDER, (event) => {
                    globeViewExtended.forgetByKey( eventKey );

                    try {
                        assert( event.extent, "info 'extent' not fetched");
                        assertIsNumber(event.extent.east());
                        assertIsNumber(event.extent.west());
                        assertIsNumber(event.extent.north());
                        assertIsNumber(event.extent.south());

                        assert( event.colorLayersId, "info 'color layers id' not fetched");
                        assert( event.colorLayersId.indexOf('Ortho') >= 0, "layer 'Ortho' not found");
                        assert( event.colorLayersId.indexOf('Region') >= 0, "layer 'Region' not found");

                        assert( event.elevationLayersId, "info 'elevation layers id' not fetched");
                        assert( event.elevationLayersId.indexOf('IGN_MNT') >= 0, "layer 'IGN_MNT' not found");
                        // TODO zoomer sur un endroit ou il y a un MNT haute resolution
                        // assert( event.elevationLayersId.indexOf('IGN_MNT_HIGHRES') >= 0, "layer 'IGN_MNT_HIGHRES' not found");
                        doubleDone(done);
                    } catch (e) {
                        done(e);
                    }
                });

                globeViewExtended.preRenderEventFetchColorLayersDisplayed(true);
                globeViewExtended.preRenderEventFetchViewExtent(true);
                globeViewExtended.preRenderEventFetchElevationLayersDisplayed(true);

                return globeViewExtended.setCameraTargetGeoPosition( francePosition ).then( () => doubleDone(done) );
            }).catch( e => done(e) );
        });
    });
});
