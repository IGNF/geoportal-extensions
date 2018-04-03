import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import MeasureToolBoxDOM from "../../../../src/Common/Controls/MeasureToolBoxDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test MeasureToolBox DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(MeasureToolBoxDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
