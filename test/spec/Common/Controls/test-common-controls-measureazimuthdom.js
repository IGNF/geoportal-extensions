import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import MeasureAzimuthDOM from "../../../../src/Common/Controls/MeasureAzimuthDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test MeasureAzimuth DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(MeasureAzimuthDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
