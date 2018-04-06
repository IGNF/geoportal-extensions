import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import ReverseGeocodingDOM from "../../../../src/Common/Controls/ReverseGeocodingDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test ReverseGeocoding DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(ReverseGeocodingDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
