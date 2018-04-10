import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import SearchEngineDOM from "../../../../src/Common/Controls/SearchEngineDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test SearchEngine DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(SearchEngineDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
