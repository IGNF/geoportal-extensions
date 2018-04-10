import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import ProfileElevationPathDOM from "../../../../src/Common/Controls/ProfileElevationPathDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test ProfileElevationPath DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(ProfileElevationPathDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
