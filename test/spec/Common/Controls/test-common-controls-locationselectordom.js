import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import LocationSelectorDOM from "../../../../src/Common/Controls/LocationSelectorDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test LocationSelector DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(LocationSelectorDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
