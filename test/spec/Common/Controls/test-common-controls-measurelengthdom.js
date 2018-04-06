import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import MeasureLengthDOM from "../../../../src/Common/Controls/MeasureLengthDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test MeasureLength DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(MeasureLengthDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
