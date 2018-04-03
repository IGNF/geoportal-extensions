import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import GetFeatureInfoDOM from "../../../../src/Common/Controls/GetFeatureInfoDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test GetFeatureInfo DOM --", function () {
    before(function () {});
    after(function () {});
    it('_createMainContainerElement', function () {
        expect(GetFeatureInfoDOM._createMainContainerElement().outerHTML).to.be.equal('<div id="GPgetFeatureInfo" class="GPwidget"></div>');
    });
    it('_createActivateGetFeatureInfoElement : activate true', function () {
        var input = GetFeatureInfoDOM._createActivateGetFeatureInfoElement(true);
        expect(input.outerHTML).to.be.equal('<input id="GPactivateGetFeatureInfo" type="checkbox">');
        expect(input.checked).to.be.true;
    });
    it('_createActivateGetFeatureInfoElement : activate false', function () {
        var input = GetFeatureInfoDOM._createActivateGetFeatureInfoElement(false);
        expect(input.outerHTML).to.be.equal('<input id="GPactivateGetFeatureInfo" type="checkbox">');
        expect(input.checked).to.be.false;
    });
    it('_createMainPictoElement', function () {
        expect(GetFeatureInfoDOM._createMainPictoElement().outerHTML).to.be.equal('<label id="GPgetFeatureInfoPicto" class="GPshowAdvancedToolPicto" for="GPactivateGetFeatureInfo" title="activer/desactiver l\'interrogation des couches"><span id="GPgetFeatureInfoActivate" class="GPshowAdvancedToolOpen"></span><span id="GPgetFeatureInfoDeactivate"></span></label>');
    });
});
