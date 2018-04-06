import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import AttributionDOM from "../../../../src/Common/Controls/AttributionDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test Attribution DOM --", function () {

    before(function () {});
    after(function () {});

    it('_createMainContainerElement', function () {
        expect(AttributionDOM._createMainContainerElement().outerHTML).to.be.equal('<div id="GPAttribution" class="GPwidget"></div>');
    });

    it('_createMainAttributionsShowElement', function () {
        expect(AttributionDOM._createMainAttributionsShowElement().outerHTML).to.be.equal('<input id="GPshowAttributionsList" type="checkbox">');
    });

    it('_createAttributionsList', function () {
        expect(AttributionDOM._createAttributionsList().outerHTML).to.be.equal('<ul id="GPAttributionsList"></ul>');
    });

    it('_createMainAttributionsListContainer', function () {
        expect(AttributionDOM._createMainAttributionsListContainer().outerHTML).to.be.equal('<div id="GPAttributionsListContainer"></div>');
    });

    it('_createMainPictoElement : collapsed true', function () {
        expect(AttributionDOM._createMainPictoElement(true).outerHTML).to.be.equal('<label id="GPshowAttributionsListPicto" class="GPshowAdvancedToolPicto" for="GPshowAttributionsList" title="Afficher/masquer les attributions"><span id="GPshowAttributionsListOpenClose" class="GPshowAdvancedToolOpen">i</span></label>');
    });

    it('_createMainPictoElement : collapsed false', function () {
        expect(AttributionDOM._createMainPictoElement(false).outerHTML).to.be.equal('<label id="GPshowAttributionsListPicto" class="GPshowAdvancedToolPicto" for="GPshowAttributionsList" title="Afficher/masquer les attributions"><span id="GPshowAttributionsListOpenClose" class="GPshowAdvancedToolOpen">»</span></label>');
    });
});
