import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import ScaleDOM from "../../../../src/Common/Controls/ScaleDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test Scale DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(ScaleDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
