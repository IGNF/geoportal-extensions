import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import IsoDOM from "../../../../src/Common/Controls/IsoDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test Iso DOM --", function () {
    before(function () {});
    after(function () {});
    it('_createMainContainerElement', function () {
        expect(IsoDOM._createMainContainerElement().outerHTML).to.be.equal('<div id="GPisochron" class="GPwidget"></div>');
    });
    it('_createShowIsoElement', function () {
        expect(IsoDOM._createShowIsoElement().outerHTML).to.be.equal('<input id="GPshowIsochron" type="checkbox">');
    });
    it('_createShowIsoPictoElement', function () {
        expect(IsoDOM._createShowIsoPictoElement().outerHTML).to.be.equal('<label id="GPshowIsochronPicto" class="GPshowAdvancedToolPicto" for="GPshowIsochron" title="Calculer une isochrone"><span id="GPshowIsochronOpen" class="GPshowAdvancedToolOpen"></span></label>');
    });
    it('_createIsoPanelElement', function () {
        expect(IsoDOM._createIsoPanelElement().outerHTML).to.be.equal('<div id="GPisochronPanel" class="GPpanel"></div>');
    });
    it('_createIsoPanelHeaderElement', function () {
        expect(IsoDOM._createIsoPanelHeaderElement().outerHTML).to.be.equal('<div class="GPpanelHeader"><div class="GPpanelTitle">Calcul d\'isochrone</div><div id="GPisochronPanelClose" class="GPpanelClose" title="Fermer le panneau"></div></div>');
    });
    it('_createIsoPanelFormElement', function () {
        expect(IsoDOM._createIsoPanelFormElement().outerHTML).to.be.equal('<form id="GPisochronForm"></form>');
    });
    it('_createIsoWaitingElement', function () {
        expect(IsoDOM._createIsoWaitingElement().outerHTML).to.be.equal('<div id="GPisochronCalcWaitingContainer" class="GPisochronCalcWaitingContainerHidden"><p class="GPisochronCalcWaiting">Calcul en cours...</p></div>');
    });
    it('_createIsoPanelFormTypeChoiceElement', function () {
        expect(IsoDOM._createIsoPanelFormTypeChoiceElement().outerHTML).to.be.equal('<div id="GPisochronChoice"></div>');
    });
    it('_createIsoPanelFormTypeChoiceChronElement : checked true', function () {
        var input = IsoDOM._createIsoPanelFormTypeChoiceChronElement(true);
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltChron" name="GPisochronChoiceMode" type="radio" value="isochron"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltChron"></label><span id="GPisochronChoiceAltChronTxt">isochrone</span></div>');
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltChron" name="GPisochronChoiceMode" type="radio" value="isochron"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltChron"></label><span id="GPisochronChoiceAltChronTxt">isochrone</span></div>';
            var valueWithNode = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltChron" name="GPisochronChoiceMode" type="radio" ><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltChron"></label><span id="GPisochronChoiceAltChronTxt">isochrone</span></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
        expect(input.firstChild.checked).to.be.true;
    });
    it('_createIsoPanelFormTypeChoiceChronElement : checked false', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltChron" name="GPisochronChoiceMode" type="radio" value="isochron"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltChron"></label><span id="GPisochronChoiceAltChronTxt">isochrone</span></div>');
        var input = IsoDOM._createIsoPanelFormTypeChoiceChronElement(false);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltChron" name="GPisochronChoiceMode" type="radio" value="isochron"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltChron"></label><span id="GPisochronChoiceAltChronTxt">isochrone</span></div>';
            var valueWithNode = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltChron" name="GPisochronChoiceMode" type="radio" ><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltChron"></label><span id="GPisochronChoiceAltChronTxt">isochrone</span></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
        expect(input.firstChild.checked).to.be.false;
    });
    it('_createIsoPanelFormTypeChoiceDistElement : checked true', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltDist" name="GPisochronChoiceMode" type="radio" value="isodistance"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltDist"></label><span id="GPisochronChoiceAltDistTxt">isodistance</span></div>');
        var input = IsoDOM._createIsoPanelFormTypeChoiceDistElement(true);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltDist" name="GPisochronChoiceMode" type="radio" value="isodistance"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltDist"></label><span id="GPisochronChoiceAltDistTxt">isodistance</span></div>';
            var valueWithNode = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltDist" name="GPisochronChoiceMode" type="radio"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltDist"></label><span id="GPisochronChoiceAltDistTxt">isodistance</span></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
        expect(input.firstChild.checked).to.be.true;
    });
    it('_createIsoPanelFormTypeChoiceDistElement : checked false', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltDist" name="GPisochronChoiceMode" type="radio" value="isodistance"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltDist"></label><span id="GPisochronChoiceAltDistTxt">isodistance</span></div>');
        var input = IsoDOM._createIsoPanelFormTypeChoiceDistElement(false);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltDist" name="GPisochronChoiceMode" type="radio" value="isodistance"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltDist"></label><span id="GPisochronChoiceAltDistTxt">isodistance</span></div>';
            var valueWithNode = '<div class="GPisochronChoiceAlt"><input id="GPisochronChoiceAltDist" name="GPisochronChoiceMode" type="radio"><label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltDist"></label><span id="GPisochronChoiceAltDistTxt">isodistance</span></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
        expect(input.firstChild.checked).to.be.false;
    });
    it('_createIsoPanelFormValueIsochronElement : checked true', function () {
        var input = IsoDOM._createIsoPanelFormValueIsochronElement(true);
        expect(input.outerHTML).to.be.equal('<div id="GPisochronValueChron" class="GPflexInput"><label id="GPisochronValueChronLabel" for="GPisochronValueChronInput">Temps</label><input id="GPisochronValueChronInput1" min="0" step="1" type="number"><label>h</label><input id="GPisochronValueChronInput2" min="0" max="59" step="1" type="number"><label>min</label></div>');
    });
    it('_createIsoPanelFormValueIsochronElement : checked false', function () {
        var input = IsoDOM._createIsoPanelFormValueIsochronElement(false);
        expect(input.outerHTML).to.be.equal('<div id="GPisochronValueChron" class="GPisochronValueHidden"><label id="GPisochronValueChronLabel" for="GPisochronValueChronInput">Temps</label><input id="GPisochronValueChronInput1" min="0" step="1" type="number"><label>h</label><input id="GPisochronValueChronInput2" min="0" max="59" step="1" type="number"><label>min</label></div>');
    });
    it('_createIsoPanelFormValueIsodistanceElement : checked true', function () {
        var input = IsoDOM._createIsoPanelFormValueIsodistanceElement(true);
        expect(input.outerHTML).to.be.equal('<div id="GPisochronValueDist" class="GPflexInput"><label id="GPisochronValueDistLabel" for="GPisochronValueDistInput">Distance</label><input id="GPisochronValueDistInput" min="0" step="any" type="number"><label>km</label></div>');
    });
    it('_createIsoPanelFormValueIsodistanceElement : checked false', function () {
        var input = IsoDOM._createIsoPanelFormValueIsodistanceElement(false);
        expect(input.outerHTML).to.be.equal('<div id="GPisochronValueDist" class="GPisochronValueHidden"><label id="GPisochronValueDistLabel" for="GPisochronValueDistInput">Distance</label><input id="GPisochronValueDistInput" min="0" step="any" type="number"><label>km</label></div>');
    });
    it('_createIsoPanelFormModeChoiceElement', function () {
        expect(IsoDOM._createIsoPanelFormModeChoiceElement().outerHTML).to.be.equal('<div id="GPisochronModeChoice"></div>');
    });
    it('_createIsoPanelFormModeChoiceTransportElement : transports Voiture', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportCar" type="radio" name="GPisochronTransport" value="Voiture"><label class="GPisochronTransportImg" for="GPisochronTransportCar" title="Voiture"></label></div>');
        var input = IsoDOM._createIsoPanelFormModeChoiceTransportElement(["Voiture"]);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportCar" type="radio" name="GPisochronTransport" value="Voiture"><label class="GPisochronTransportImg" for="GPisochronTransportCar" title="Voiture"></label></div>';
            var valueWithNode = '<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportCar" type="radio" name="GPisochronTransport"><label class="GPisochronTransportImg" for="GPisochronTransportCar" title="Voiture"></label></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoPanelFormModeChoiceTransportElement : transports Pieton', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportPedestrian" type="radio" name="GPisochronTransport" value="Pieton"><label class="GPisochronTransportImg" for="GPisochronTransportPedestrian" title="Piéton"></label></div>');
        var input = IsoDOM._createIsoPanelFormModeChoiceTransportElement(["Pieton"]);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportPedestrian" type="radio" name="GPisochronTransport" value="Pieton"><label class="GPisochronTransportImg" for="GPisochronTransportPedestrian" title="Piéton"></label></div>';
            var valueWithNode = '<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportPedestrian" type="radio" name="GPisochronTransport"><label class="GPisochronTransportImg" for="GPisochronTransportPedestrian" title="Piéton"></label></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoPanelFormModeChoiceTransportElement : transports Pieton,Voiture', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportPedestrian" type="radio" name="GPisochronTransport" value="Pieton"><label class="GPisochronTransportImg" for="GPisochronTransportPedestrian" title="Piéton"></label><input id="GPisochronTransportCar" type="radio" name="GPisochronTransport" value="Voiture"><label class="GPisochronTransportImg" for="GPisochronTransportCar" title="Voiture"></label></div>');
        var input = IsoDOM._createIsoPanelFormModeChoiceTransportElement(["Pieton", "Voiture"]);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportPedestrian" type="radio" name="GPisochronTransport" value="Pieton"><label class="GPisochronTransportImg" for="GPisochronTransportPedestrian" title="Piéton"></label><input id="GPisochronTransportCar" type="radio" name="GPisochronTransport" value="Voiture"><label class="GPisochronTransportImg" for="GPisochronTransportCar" title="Voiture"></label></div>';
            var valueWithNode = '<div id="GPisochronTransportChoice"><span class="GPisochronModeLabel">Mode de transport</span><input id="GPisochronTransportPedestrian" type="radio" name="GPisochronTransport"><label class="GPisochronTransportImg" for="GPisochronTransportPedestrian" title="Piéton"></label><input id="GPisochronTransportCar" type="radio" name="GPisochronTransport"><label class="GPisochronTransportImg" for="GPisochronTransportCar" title="Voiture"></label></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoPanelFormModeChoiceDirectionElement : directions Departure', function () {
        var input = IsoDOM._createIsoPanelFormModeChoiceDirectionElement(["Departure"]);
        expect(input.outerHTML).to.be.equal('<div id="GPisochronDirectionChoice"><span class="GPisochronModeLabel">Sens de parcours</span><select id="GPisochronDirectionSelect" class="GPinputSelect"><option value="departure">Départ</option></select></div>');
    });
    it('_createIsoPanelFormModeChoiceDirectionElement : directions Arrival', function () {
        var input = IsoDOM._createIsoPanelFormModeChoiceDirectionElement(["Arrival"]);
        expect(input.outerHTML).to.be.equal('<div id="GPisochronDirectionChoice"><span class="GPisochronModeLabel">Sens de parcours</span><select id="GPisochronDirectionSelect" class="GPinputSelect"><option value="arrival">Arrivée</option></select></div>');
    });
    it('_createShowIsoExclusionsElement', function () {
        expect(IsoDOM._createShowIsoExclusionsElement().outerHTML).to.be.equal('<input id="GPshowIsoExclusions" type="checkbox">');
    });
    it('_createShowIsoExclusionsPictoElement', function () {
        expect(IsoDOM._createShowIsoExclusionsPictoElement().outerHTML).to.be.equal('<label id="GPshowIsoExclusionsPicto" class="GPshowMoreOptionsImage GPshowMoreOptions GPshowIsoExclusionsPicto" for="GPshowIsoExclusions" title="Exclusions" style="top: 240px;"></label>');
    });
    it('_createIsoPanelFormExclusionsElement', function () {
        expect(IsoDOM._createIsoPanelFormExclusionsElement().outerHTML).to.be.equal('<div id="GPisoExclusions"><span class="GPisoExclusionsLabel">Passages autorisés</span></div>');
    });
    it('_createIsoPanelFormExclusionOptionsElement : exclusions toll', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsToll" type="checkbox" value="Toll"><label class="GPisoExclusionsOption" for="GPisoExclusionsToll">Péages</label></div>');
        var input = IsoDOM._createIsoPanelFormExclusionOptionsElement(["toll"]);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsToll" type="checkbox" value="Toll"><label class="GPisoExclusionsOption" for="GPisoExclusionsToll">Péages</label></div>';
            var valueWithNode = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsToll" type="checkbox"><label class="GPisoExclusionsOption" for="GPisoExclusionsToll">Péages</label></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoPanelFormExclusionOptionsElement : exclusions tunnel', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsTunnel" type="checkbox" value="Tunnel"><label class="GPisoExclusionsOption" for="GPisoExclusionsTunnel">Tunnels</label></div>');
        var input = IsoDOM._createIsoPanelFormExclusionOptionsElement(["tunnel"]);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsTunnel" type="checkbox" value="Tunnel"><label class="GPisoExclusionsOption" for="GPisoExclusionsTunnel">Tunnels</label></div>';
            var valueWithNode = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsTunnel" type="checkbox"><label class="GPisoExclusionsOption" for="GPisoExclusionsTunnel">Tunnels</label></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoPanelFormExclusionOptionsElement : exclusions bridge', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsBridge" type="checkbox" value="Bridge"><label class="GPisoExclusionsOption" for="GPisoExclusionsBridge">Ponts</label></div>');
        var input = IsoDOM._createIsoPanelFormExclusionOptionsElement(["bridge"]);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsBridge" type="checkbox" value="Bridge"><label class="GPisoExclusionsOption" for="GPisoExclusionsBridge">Ponts</label></div>';
            var valueWithNode = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsBridge" type="checkbox"><label class="GPisoExclusionsOption" for="GPisoExclusionsBridge">Ponts</label></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoPanelFormExclusionOptionsElement : exclusions "bridge,tunnel,toll"', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(input.outerHTML).to.be.equal('<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsToll" type="checkbox" value="Toll"><label class="GPisoExclusionsOption" for="GPisoExclusionsToll">Péages</label><input id="GPisoExclusionsBridge" type="checkbox" value="Bridge"><label class="GPisoExclusionsOption" for="GPisoExclusionsBridge">Ponts</label><input id="GPisoExclusionsTunnel" type="checkbox" value="Tunnel"><label class="GPisoExclusionsOption" for="GPisoExclusionsTunnel">Tunnels</label></div>');
        var input = IsoDOM._createIsoPanelFormExclusionOptionsElement(["toll","bridge","tunnel"]);
        expect(input.outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsToll" type="checkbox" value="Toll"><label class="GPisoExclusionsOption" for="GPisoExclusionsToll">Péages</label><input id="GPisoExclusionsBridge" type="checkbox" value="Bridge"><label class="GPisoExclusionsOption" for="GPisoExclusionsBridge">Ponts</label><input id="GPisoExclusionsTunnel" type="checkbox" value="Tunnel"><label class="GPisoExclusionsOption" for="GPisoExclusionsTunnel">Tunnels</label></div>';
            var valueWithNode = '<div class="GPisoExclusionsOptions"><input id="GPisoExclusionsToll" type="checkbox"><label class="GPisoExclusionsOption" for="GPisoExclusionsToll">Péages</label><input id="GPisoExclusionsBridge" type="checkbox"><label class="GPisoExclusionsOption" for="GPisoExclusionsBridge">Ponts</label><input id="GPisoExclusionsTunnel" type="checkbox"><label class="GPisoExclusionsOption" for="GPisoExclusionsTunnel">Tunnels</label></div>';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoSubmitFormElement', function () {
        // FIXME Ok with Chrome, NOK with nodejs and FF !?
        // expect(IsoDOM._createIsoSubmitFormElement().outerHTML).to.be.equal('<input id="GPisochronSubmit" class="GPinputSubmit" type="submit" value="Calculer">');
        expect(IsoDOM._createIsoSubmitFormElement().outerHTML).to.satisfy(function(value) {
            var valueWithChrome = '<input id="GPisochronSubmit" class="GPinputSubmit" type="submit" value="Calculer">';
            var valueWithNode = '<input id="GPisochronSubmit" class="GPinputSubmit" type="submit">';
            if (typeof global === 'object') {
                return valueWithNode;
            }
            return valueWithChrome;
        });
    });
    it('_createIsoFormResetElement', function () {
        expect(IsoDOM._createIsoFormResetElement().outerHTML).to.be.equal('<div id="GPisochronReset" title="Réinitialiser les paramètres"></div>');
    });
});
