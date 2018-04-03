import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import MiniGlobeDOM from "../../../../src/Common/Controls/MiniGlobeDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test MiniGlobe DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(MiniGlobeDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
