import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import MousePositionDOM from "../../../../src/Common/Controls/MousePositionDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test MousePosition DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(MousePositionDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
