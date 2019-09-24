import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("DrawingDOM");

var DrawingDOM = {

    /**
    * Add uuid to the tag ID
    * @param {String} id - id selector
    * @returns {String} uid - id selector with an unique id
    */
    _addUID : function (id) {
        var uid = (this._uid) ? id + "-" + this._uid : id;
        return uid;
    },

    /**
     * Main container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPdrawing");
        container.className = "GPwidget";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Hidden checkbox for minimizing/maximizing
     *
     * @returns {DOMElement} DOM element
     */
    _createShowDrawingElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowDrawing");
        input.className = "GPshowDrawing";
        input.type = "checkbox";
        return input;
    },

    /**
     * Show mouse position control
     *
     * @returns {DOMElement} DOM element
     */
    _createShowDrawingPictoElement : function () {
        var self = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowDrawingPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowDrawing");
        label.title = this.options.labels.control;

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie de saisie
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (label.addEventListener) {
            label.addEventListener("click", function (e) {
                self.onShowDrawingClick(e);
            });
        } else if (label.attachEvent) {
            label.attachEvent("onclick", function (e) {
                self.onShowDrawingClick(e);
            });
        }

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowDrawingOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        return label;
    },

    /**
     * Drawing panel
     *
     * @returns {DOMElement} DOM element
     */
    _createDrawingPanelElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPdrawingPanel");
        div.className = "GPpanel";

        return div;
    },

    // ################################################################### //
    // ####################### Panel container ########################### //
    // ################################################################### //

    /**
    * Creates drawing Panel header DOM structure
    * @returns {DOMElement} DOM element
    */
    _createDrawingPanelHeaderElement : function () {
        /*
         * <div class="GPpanelHeader">
         *     <div class="GPpanelTitle">Annoter la carte</div>
         *     <div id="GPdrawingPanelClose" class="GPpanelClose" title="Fermer le panneau"></div>
         * </div>
         */

        var container = document.createElement("div");
        container.className = "GPpanelHeader";

        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle";
        divTitle.innerHTML = this.options.controlLabel || "Annoter la carte";
        container.appendChild(divTitle);

        var divClose = document.createElement("div");
        divClose.id = this._addUID("GPdrawingPanelClose");
        divClose.className = "GPpanelClose";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        var dtObj = this;
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(dtObj._addUID("GPshowDrawingPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(dtObj._addUID("GPshowDrawingPicto")).click();
            });
        }

        container.appendChild(divClose);

        return container;
    },

    /**
     * Creates drawing tools section.
     *
     * @returns {DOMElement} DOM element
     */
    _createDrawingToolsSections : function () {
        var tools = [];

        this.dtOptions = {};
        if (this.options.tools.points) {
            this.dtOptions.points = {
                label : this.options.labels.points,
                active : false,
                panel : "draw",
                id : "point"
            };
        }
        if (this.options.tools.lines) {
            this.dtOptions.lines = {
                label : this.options.labels.lines,
                active : false,
                panel : "draw",
                id : "line"
            };
        }
        if (this.options.tools.polygons) {
            this.dtOptions.polygons = {
                label : this.options.labels.polygons,
                active : false,
                panel : "draw",
                id : "polygon"
            };
        }
        if (this.options.tools.text) {
            this.dtOptions.text = {
                label : this.options.labels.text,
                active : false,
                panel : "draw",
                id : "text"
            };
        }
        if (this.options.tools.edit) {
            this.dtOptions.edit = {
                label : this.options.labels.edit,
                active : false,
                panel : "edit",
                id : "edit"
            };
        }
        if (this.options.tools.display) {
            this.dtOptions.display = {
                label : this.options.labels.display,
                active : false,
                panel : "edit",
                id : "display"
            };
        }
        if (this.options.tools.tooltip) {
            this.dtOptions.tooltip = {
                label : this.options.labels.tooltip,
                active : false,
                panel : "edit",
                id : "tooltip"
            };
        }
        if (this.options.tools.remove) {
            this.dtOptions.remove = {
                label : this.options.labels.remove,
                active : false,
                panel : "edit",
                id : "remove"
            };
        }
        // ajout drawing tools
        if (this.dtOptions.points ||
            this.dtOptions.lines ||
            this.dtOptions.polygons ||
            this.dtOptions.text) {
            tools.push(this._createDrawingToolSection(this.options.labels.creatingTools, "draw"));
        }
        // ajout editing tools
        if (this.dtOptions.edit ||
            this.dtOptions.display ||
            this.dtOptions.tooltip ||
            this.dtOptions.remove) {
            tools.push(this._createDrawingToolSection(this.options.labels.editingTools, "edit"));
        }
        // ajout export tools
        if (this.options.tools.export) {
            tools.push(this._createSavingSection(
                this.options.labels.export,
                this.options.labels.exportTitle
            ));
        }

        return tools;
    },

    /**
     * Creates drawing tool section DOM structure.
     *
     * @param {String} sectionLabel - section title
     * @param {String} panelType - Drawing ("draw") or editing ("edit") tools panel
     * @returns {DOMElement} DOM element
     */
    _createDrawingToolSection : function (sectionLabel, panelType) {
        /*
         * Exemple panelType == "draw"
         *
         * <div class="drawing-tool-section">
         *     <p class="drawing-tool-section-title">Outils de création</p>
         *     <ul class="drawing-tools-flex-display">
         *         <li id="drawing-tool-point" class="drawing-tool" title="Placer des points"></li>
         *         <li id="drawing-tool-line" class="drawing-tool" title="Dessiner des lignes"></li>
         *         <li id="drawing-tool-polygon" class="drawing-tool" title="Dessiner des polygones"></li>
         *         <li id="drawing-tool-text" class="drawing-tool" title="Ecrire sur la carte"></li>
         *     </ul>
         * </div>
         */
        var container = document.createElement("div");
        container.className = "drawing-tool-section";

        var p = document.createElement("p");
        p.className = "drawing-tool-section-title";
        p.innerHTML = sectionLabel;
        container.appendChild(p);

        var ul = document.createElement("ul");
        ul.className = "drawing-tools-flex-display";
        var context = this;
        // li click handler function
        function liClickHandler (e) {
            /* jshint validthis: true */
            // this == elem clicked
            context._handleDOMToolClick(e, this.id, context);
            context._handleToolClick(e, this.id, context);
        }
        for (var type in this.dtOptions) {
            if (this.dtOptions[type].panel !== panelType) {
                continue;
            }
            var li = document.createElement("li");
            li.className = "drawing-tool";
            li.id = this._addUID("drawing-tool-" + this.dtOptions[type].id);
            li.title = this.dtOptions[type].label;
            li.addEventListener("click", liClickHandler);
            ul.appendChild(li);
        }
        container.appendChild(ul);

        return container;
    },

    /**
     * Creates drawing tool section DOM structure.
     *
     * @param {String} buttonLabel - Button label
     * @param {String} buttonTitle - Button title
     * @returns {DOMElement} DOM element
     */
    _createSavingSection : function (buttonLabel, buttonTitle) {
        /*
         * <div class="drawing-tool-section drawing-tools-flex-display">
         *     <button title="Exporter en KML" class="tool-form-submit drawing-button" id="drawing-export" type="button">Exporter</button>
         * </div>
         */
        var container = document.createElement("div");
        container.className = "drawing-tool-section drawing-tools-flex-display";

        var button = document.createElement("button");
        button.title = buttonTitle;
        button.className = "tool-form-submit drawing-button";
        button.id = this._addUID("drawing-export");
        button.type = "button";
        button.textContent = buttonLabel;
        var context = this;
        /** export function */
        button.onclick = function () {
            context.onExportFeatureClick();
        };
        container.appendChild(button);

        return container;
    },

    /**
     * Creates input for color choosing
     *
     * @param {Object} options - options
     * @param {String} options.defaultValue - defaultValue
     * @param {String} options.className - input className
     * @returns {DOMElement} - created li element
     */
    _createMarkersChooser : function (options) {
        var li = document.createElement("li");
        li.className = options.className;
        for (var i = 0; i < this.options.markersList.length; i++) {
            // radio bouton pour la selection
            var inputElem = document.createElement("input");
            inputElem.type = "radio";
            inputElem.name = "marker";
            inputElem.id = this._addUID("marker-" + i);
            inputElem.value = this.options.markersList[i].src;
            inputElem.className = "marker-input-radio";
            if (options.defaultValue === inputElem.value) {
                inputElem.checked = true;
            }
            li.appendChild(inputElem);
            // label pour l'affichage du marker
            var labelElem = document.createElement("label");
            labelElem.className = "marker-label"; // utile ?
            labelElem.setAttribute("for", inputElem.id);
            var imgElem = document.createElement("img");
            imgElem.src = inputElem.value;
            labelElem.appendChild(imgElem);
            li.appendChild(labelElem);
        }
        return li;
    },

    /**
     * Creates input for color choosing
     *
     * @param {Object} options - options
     * @param {String} options.label - label
     * @param {String} options.type - input type for element ("color")
     * @param {String} options.defaultValue - defaultValue
     * @param {String} options.id - input id
     * @param {String} options.title - input title
     * @param {String} options.className - input className
     * @returns {DOMElement} - created li element
     */
    _createStylingElement : function (options) {
        var li = document.createElement("li");
        li.className = options.className;
        var textNode = document.createTextNode(options.label);
        li.appendChild(textNode);
        var inputElem = document.createElement("input");
        try {
            inputElem.type = options.type;
        } catch (e) {
            // ie 11 input type== color ne marche pas...
            inputElem.type = "text";
        }
        inputElem.id = options.id;
        inputElem.value = options.defaultValue;
        if (options.title) {
            inputElem.title = options.title;
        }
        // si options.type == "range"
        if (options.min !== undefined) {
            inputElem.min = options.min;
        }
        if (options.max !== undefined) {
            inputElem.max = options.max;
        }
        if (options.step !== undefined) {
            inputElem.step = options.step;
        }
        li.appendChild(inputElem);
        return li;
    },

    /**
     * Creates Styling div to include in popup.
     *
     * @param {Object} options - toolId selected
     * @param {String} options.geomType - gemeotryType selected ("Point", "Line" or "Polygon")
     * @param {Object} options.initValues - values to init fields
     * @param {String} options.initValues.markerSrc - marker URL for Points
     * @param {Function} options.applyFunc - function called when apply is selected
     * @returns {DOMElement} DOM element created
     */
    _createStylingDiv : function (options) {
        var div = document.createElement("div");
        div.className = "gp-styling-div";
        var ul = document.createElement("ul");
        var li = null;
        /*
         * TODO : finir de remplir la div pour tous les styles éditables.
         */
        switch (options.geomType.toLowerCase()) {
            case "point":
                li = this._createMarkersChooser({
                    className : "gp-styling-option",
                    // defaultValue : this.options.markersList[0].src
                    defaultValue : options.initValues.markerSrc
                });
                ul.appendChild(li);
                break;
            case "text":
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.fillColor,
                    id : this._addUID("fillColor"),
                    defaultValue : options.initValues.fillColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeColor,
                    id : this._addUID("strokeColor"),
                    defaultValue : options.initValues.strokeColor
                });
                ul.appendChild(li);
                break;
            case "line":
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeColor,
                    id : this._addUID("strokeColor"),
                    defaultValue : options.initValues.strokeColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeWidth,
                    title : "1 à 10 pixels",
                    id : this._addUID("strokeWidth"),
                    min : 1,
                    max : 10,
                    step : 1,
                    defaultValue : options.initValues.strokeWidth
                });
                ul.appendChild(li);
                break;
            case "polygon":
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeColor,
                    id : this._addUID("strokeColor"),
                    defaultValue : options.initValues.strokeColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeWidth,
                    title : "1 à 10 pixels",
                    id : this._addUID("strokeWidth"),
                    min : 1,
                    max : 10,
                    step : 1,
                    defaultValue : options.initValues.strokeWidth
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.fillColor,
                    id : this._addUID("fillColor"),
                    defaultValue : options.initValues.fillColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option",
                    label : this.options.labels.fillOpacity,
                    title : "0 (transparent) à 100% (opaque)",
                    id : this._addUID("fillOpacity"),
                    min : 0,
                    max : 10,
                    step : 1,
                    defaultValue : options.initValues.fillOpacity * 10
                });
                ul.appendChild(li);
                break;
            default:
                logger.log("Unhandled geometry type for styling.");
        }
        div.appendChild(ul);
        // apply button
        var applyButton = document.createElement("input");
        applyButton.type = "button";
        applyButton.className = "gp-styling-button";
        applyButton.value = this.options.labels.applyToObject;
        /** click sur applyButton */
        applyButton.onclick = function () {
            options.applyFunc.call(this, "apply");
        };
        div.appendChild(applyButton);
        // set default button
        var setDefaultButton = document.createElement("input");
        setDefaultButton.type = "button";
        setDefaultButton.value = this.options.labels.setAsDefault;
        setDefaultButton.className = "gp-styling-button";
        /** click sur set Default Button */
        setDefaultButton.onclick = function () {
            options.applyFunc.call(this, "default");
        };
        div.appendChild(setDefaultButton);
        // cancel Button
        var cancelButton = document.createElement("input");
        cancelButton.type = "button";
        // cancelButton.value = "X" ;
        cancelButton.className = "gp-styling-button closer";
        /** click sur cancel Button */
        cancelButton.onclick = function () {
            options.applyFunc.call(this, "cancel");
        };
        div.appendChild(cancelButton);
        return div;
    },

    /**
     * Creates Text editing div to include in popup.
     *
     * @param {Object} options - options for popup
     * @param {String} options.geomType - gemeotryType selected ("Point", "Line" or "Polygon")
     * @param {String} options.text - text to fill input.
     * @param {String} options.measure - measure to fill input.
     * @param {String} options.placeholder - placeholder for text input.
     * @param {String} options.inputId - text input id.
     * @param {Function} options.applyFunc - function called when text is to be saved.
     * @returns {DOMElement} DOM element created
     * @private
     */
    _createLabelDiv : function (options) {
        var popup = document.createElement("div");
        popup.className = "gp-label-div";
        var inputLabel = null;
        if (options.geomType === "Text") {
            inputLabel = document.createElement("input");
            inputLabel.type = "text";
            inputLabel.className = "gp-input-label-style";
        } else {
            inputLabel = document.createElement("textArea");
            inputLabel.rows = 2;
            inputLabel.cols = 40;
            inputLabel.className = "gp-textarea-att-label-style";
        }

        if (options.text) {
            inputLabel.value = options.text;
        }

        inputLabel.autocomplete = "off";
        inputLabel.placeholder = options.placeholder;
        inputLabel.id = options.inputId;
        popup.appendChild(inputLabel);
        // blur
        inputLabel.onblur = function () {
            options.applyFunc.call(this, inputLabel.value, true);
        };
        // keyup
        inputLabel.onkeyup = function (evtk) {
            if (options.geomType === "Text" && evtk.keyCode === 13) {
                options.applyFunc.call(this, inputLabel.value, true);
            }
            if (evtk.keyCode === 27) {
                options.applyFunc.call(this, inputLabel.value, false);
            }
        };

        if (options.measure && options.geomType !== "Text") {
            var inputMeasure = document.createElement("input");
            inputMeasure.type = "text";
            inputMeasure.readonly = true;
            inputMeasure.className = "gp-input-measure-style";
            inputMeasure.value = options.measure;
            popup.appendChild(inputMeasure);
        }

        if (options.geomType !== "Text") {
            // apply button
            var applyButton = document.createElement("input");
            applyButton.type = "button";
            applyButton.className = "gp-styling-button";
            applyButton.value = this.options.labels.saveDescription;
            /** click sur applyButton */
            applyButton.onclick = function () {
                options.applyFunc.call(this, inputLabel.value, true);
            };
            popup.appendChild(applyButton);
            // cancel Button
            var cancelButton = document.createElement("input");
            cancelButton.type = "button";
            cancelButton.className = "gp-styling-button closer";
            /** click sur cancel Button */
            cancelButton.onclick = function () {
                options.applyFunc.call(this, inputLabel.value, false);
            };
            popup.appendChild(cancelButton);
        }

        return popup;
    },

    /**
     * Handles drawing tool selection from a DOM point of view.
     *
     * @param {Event} e - DOM Event
     * @param {String} toolId - toolId selected
     * @param {DrawingDOM} context - Drawing control instance
     */
    _handleDOMToolClick : function (e, toolId, context) {
        for (var availType in context.dtOptions) {
            var availToolId = context._addUID("drawing-tool-" + context.dtOptions[availType].id);
            var li = document.getElementById(availToolId);
            // ce n'est pas l'outil selectionne : on le desactive (s'il ne l'était pas déjà).
            if (availToolId !== toolId) {
                li.className = "drawing-tool";
                context.dtOptions[availType].active = false;
                continue;
            }
            // ici, c'est le l'outil selectionne
            if (context.dtOptions[availType].active) {
                li.className = "drawing-tool";
            } else {
                li.className = "drawing-tool drawing-tool-active";
            }
            context.dtOptions[availType].active = !context.dtOptions[availType].active;
        }
    }

};

export default DrawingDOM;
