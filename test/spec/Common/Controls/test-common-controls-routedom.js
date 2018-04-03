import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import RouteDOM from "../../../../src/Common/Controls/RouteDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test Route DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(RouteDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
