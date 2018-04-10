import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import MeasureAreaDOM from "../../../../src/Common/Controls/MeasureAreaDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test MeasureArea DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(MeasureAreaDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
