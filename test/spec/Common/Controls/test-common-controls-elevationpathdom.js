import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import ElevationPathDOM from "../../../../src/Common/Controls/ElevationPathDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test ElevationPath DOM --", function () {
    before(function () {});
    after(function () {});
    it('_createMainContainerElement', function () {
        expect(ElevationPathDOM._createMainContainerElement().outerHTML).to.be.equal('<div id="GPelevationPath" class="GPwidget"></div>');
    });
    it('_createShowElevationPathElement', function () {
        expect(ElevationPathDOM._createShowElevationPathElement().outerHTML).to.be.equal('<input id="GPshowElevationPath" type="checkbox">');
    });
    it('_createShowElevationPathPictoElement', function () {
        expect(ElevationPathDOM._createShowElevationPathPictoElement().outerHTML).to.be.equal('<label id="GPshowElevationPathPicto" class="GPshowAdvancedToolPicto" for="GPshowElevationPath" title="Calculer un profil"><span id="GPshowElevationPathOpen" class="GPshowAdvancedToolOpen"></span></label>');
    });
    it('_createElevationPathPanelElement', function () {
        expect(ElevationPathDOM._createElevationPathPanelElement().outerHTML).to.be.equal('<div id="GPelevationPathPanel" class="GPpanel"></div>');
    });
    it('_createElevationPathPanelHeaderElement', function () {
        expect(ElevationPathDOM._createElevationPathPanelHeaderElement().outerHTML).to.be.equal('<div class="GPpanelHeader"><div id="GPelevationPathPanelInfo" class="GPpanelInfo" title="Informations"></div><div class="GPpanelTitle">Profil Altimétrique</div><div id="GPelevationPathPanelReduce" class="GPpanelReduce" title="Masquer le panneau"></div><div id="GPelevationPathPanelClose" class="GPpanelClose" title="Fermer le panneau"></div></div>');
    });
    it('_createElevationPathPanelProfilElement', function () {
        expect(ElevationPathDOM._createElevationPathPanelProfilElement().outerHTML).to.be.equal('<div id="GPelevationPathProfil"></div>');
    });
    it('_createElevationPathWaitingElement', function () {
        expect(ElevationPathDOM._createElevationPathWaitingElement().outerHTML).to.be.equal('<div id="GPelevationPathCalcWaitingContainer" class="GPelevationPathCalcWaitingContainerHidden"><p class="GPelevationPathCalcWaiting">Calcul en cours...</p></div>');
    });
    it('_createElevationPathInformationsElement', function () {
        expect(ElevationPathDOM._createElevationPathInformationsElement().outerHTML).to.be.equal('<div id="GPelevationPathInformationsContainer" class="GPelevationPathInformationsContainerHidden"><p class="GPelevationPathInformations">Aucune information...</p></div>');
    });
    it('_addElevationPathInformationsItem', function () {
        var div = ElevationPathDOM._createElevationPathInformationsElement();
        document.body.appendChild(div);
        var value = "My value...";
        expect(ElevationPathDOM._addElevationPathInformationsItem(value).outerHTML).to.be.equal('<div id="GPelevationPathInformationsContainer" class="GPelevationPathInformationsContainerHidden"><p class="GPelevationPathInformations">Aucune information...</p><p class="GPelevationPathInformations">My value...</p></div>');
        document.body.removeChild(div);
    });
    it('_addElevationPathInformationsItem : container undefined', function () {
        expect(ElevationPathDOM._addElevationPathInformationsItem()).to.be.null;
    });
});
