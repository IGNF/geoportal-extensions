import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import DrawingDOM from "../../../../src/Common/Controls/DrawingDOM";

import { assert, expect, should } from "chai";
should();

var logger = Logger.getLogger("test-dom");

describe("-- Test Drawing DOM --", function () {

    before(function () {
        DrawingDOM.options = {
            labels : {
                control: "Annoter la carte",
                creatingTools: "Outils de création",
                points: "Placer des points",
                lines: "Dessiner des lignes",
                polygons: "Dessiner des polygones",
                text: "Ecrire sur la carte",
                editingTools: "Outils d'édition",
                edit: "Editer les tracés",
                display: "Modifier l'apparence des objets",
                tooltip: "Modifier les textes / infos-bulles",
                remove: "Supprimer des objets",
                export: "Exporter",
                exportTitle: "Exporter en KML",
                applyToObject: "Appliquer à l'objet",
                saveDescription: "Enregistrer",
                setAsDefault: "Définir par défaut",
                strokeColor: "Couleur du trait : ",
                strokeWidth: "Epaisseur du trait : ",
                fillColor: "Couleur de remplissage : ",
                fillOpacity: "Opacité du remplissage : "
            },
            tools : {
                points : true,
                lines : false,
                polygons :true,
                text : false,
                remove : true,
                display : false,
                tooltip : false,
                export : true
            }
        };
    });

    after(function () {});

    it('_createMainContainerElement', function () {
        expect(DrawingDOM._createMainContainerElement().outerHTML).to.be.equal('<div id="GPdrawing" class="GPwidget"></div>');
    });
    it('_createShowDrawingElement', function () {
        expect(DrawingDOM._createShowDrawingElement().outerHTML).to.be.equal('<input id="GPshowDrawing" class="GPshowDrawing" type="checkbox">');
    });
    it('_createShowDrawingPictoElement', function () {
        expect(DrawingDOM._createShowDrawingPictoElement().outerHTML).to.be.equal('<label id="GPshowDrawingPicto" class="GPshowAdvancedToolPicto" for="GPshowDrawing" title="Annoter la carte"><span id="GPshowDrawingOpen" class="GPshowAdvancedToolOpen"></span></label>');
    });
    it('_createDrawingPanelElement', function () {
        expect(DrawingDOM._createDrawingPanelElement().outerHTML).to.be.equal('<div id="GPdrawingPanel" class="GPpanel"></div>');
    });
    it('_createDrawingPanelHeaderElement', function () {
        expect(DrawingDOM._createDrawingPanelHeaderElement().outerHTML).to.be.equal('<div class="GPpanelHeader"><div class="GPpanelTitle">Annoter la carte</div><div id="GPdrawingPanelClose" class="GPpanelClose" title="Fermer le panneau"></div></div>');
    });
    it('_createDrawingToolsSections', function () {
        var container = document.createElement("div");
        var tools = DrawingDOM._createDrawingToolsSections();
        for (var i = 0; i < tools.length; i++) {
            container.appendChild(tools[i]);
        }
        expect(container.outerHTML).to.be.equal('<div><div class="drawing-tool-section"><p class="drawing-tool-section-title">Outils de création</p><ul class="drawing-tools-flex-display"><li class="drawing-tool" id="drawing-tool-point" title="Placer des points"></li><li class="drawing-tool" id="drawing-tool-polygon" title="Dessiner des polygones"></li></ul></div><div class="drawing-tool-section"><p class="drawing-tool-section-title">Outils d\'édition</p><ul class="drawing-tools-flex-display"><li class="drawing-tool" id="drawing-tool-remove" title="Supprimer des objets"></li></ul></div><div class="drawing-tool-section drawing-tools-flex-display"><button title="Exporter en KML" class="tool-form-submit drawing-button" id="drawing-export" type="button">Exporter</button></div></div>');
    });
    it('_createDrawingToolSection', function () {
        var sectionLabel = "Outils de création", panelType = "draw";
        expect(DrawingDOM._createDrawingToolSection(sectionLabel, panelType).outerHTML).to.be.equal('<div class="drawing-tool-section"><p class="drawing-tool-section-title">Outils de création</p><ul class="drawing-tools-flex-display"><li class="drawing-tool" id="drawing-tool-point" title="Placer des points"></li><li class="drawing-tool" id="drawing-tool-polygon" title="Dessiner des polygones"></li></ul></div>');
    });
    it('_createSavingSection', function () {
        var buttonLabel = "Exporter en KML", buttonTitle = "Exporter";
        expect(DrawingDOM._createSavingSection(buttonLabel, buttonTitle).outerHTML).to.be.equal('<div class="drawing-tool-section drawing-tools-flex-display"><button title="Exporter" class="tool-form-submit drawing-button" id="drawing-export" type="button">Exporter en KML</button></div>');
    });
    xit('[TODO] _createMarkersChooser', function () {
        var options = {
            defaultValue:null,
            className: null
        };
        expect(DrawingDOM._createMarkersChooser(options).outerHTML).to.be.equal('');
    });
    xit('[TODO] _createStylingElement', function () {
        var options = {
            label:null,
            type:null,
            defaultValue:null,
            id:null,
            title:null,
            className:null
        };
        expect(DrawingDOM._createStylingElement(options).outerHTML).to.be.equal('<li class="null">null<input type="null" id="null"></li>');
    });
    xit('[TODO] _createStylingDiv', function () {
        var options = {
            geomType:null,
            initValues:null,
            initValues : {
                markerSrc:null
            },
            applyFunc:null
        };
        expect(DrawingDOM._createStylingDiv(options).outerHTML).to.be.equal('');
    });
    xit('[TODO] _createLabelDiv', function () {
        var options = {
            geomType:null,
            text:null,
            measure:null,
            placeholder:null,
            inputId:null,
            applyFunc:null
        };
        expect(DrawingDOM._createLabelDiv(options).outerHTML).to.be.equal('<div class="gp-label-div"><textarea rows="2" cols="40" class="gp-textarea-att-label-style" placeholder="null" id="null"></textarea><input type="button" class="gp-styling-button" value="Enregistrer"><input type="button" class="gp-styling-button closer"></div>');
    });
});
