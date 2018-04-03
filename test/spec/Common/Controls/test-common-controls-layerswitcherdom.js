import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import LayerSwitcherDOM from "../../../../src/Common/Controls/LayerSwitcherDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test LayerSwitcher DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(LayerSwitcherDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
