import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import LayerImportDOM from "../../../../src/Common/Controls/LayerImportDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test LayerImport DOM --", function () {
    before(function () {});
    after(function () {});
    xit('_createMainContainerElement', function () {
        expect(LayerImportDOM._createMainContainerElement().outerHTML).to.be.equal('');
    });
});
