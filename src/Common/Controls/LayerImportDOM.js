var LayerImportDOM = {

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
        container.id = this._addUID("GPimport");
        container.className = "GPwidget";
        return container;
    },

    // ################################################################### //
    // ######################### show widget ############################# //
    // ################################################################### //

    /**
     * Hidden checkbox for minimizing/maximizing
     *
     * @returns {DOMElement} DOM element
     */
    _createShowImportElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowImport");
        input.type = "checkbox";
        return input;
    },

    /**
     * Show Import
     *
     * @returns {DOMElement} DOM element
     */
    _createShowImportPictoElement : function () {
        // contexte d'execution
        var self = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowImportPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowImport");
        label.title = "Ouvrir l'import de couches";

        // Close all results and panels when minimizing the widget
        if (label.addEventListener) {
            label.addEventListener("click", function () {
                self._onShowImportClick();
            });
        } else if (label.attachEvent) {
            label.attachEvent("onclick", function () {
                self._onShowImportClick();
            });
        }

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowImportOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        return label;
    },

    // ################################################################### //
    // ######################### Header panel ############################ //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportPanel");
        div.className = "GPpanel";

        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelHeader";

        // panel title
        var panelTitle = this._createImportPanelTitleElement();
        container.appendChild(panelTitle);
        // close picto
        var closeDiv = this._createImportPanelCloseElement();
        container.appendChild(closeDiv);

        return container;
    },

    /**
     * Create Header Title Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelTitle";
        div.innerHTML = "Import de données";
        return div;
    },

    /**
     * Create Header close div
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelCloseElement : function () {
        // contexte
        var self = this;

        var divClose = document.createElement("div");
        divClose.id = this._addUID("GPimportPanelClose");
        divClose.className = "GPpanelClose";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowImportPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowImportPicto")).click();
            });
        }

        return divClose;
    },

    // ################################################################### //
    // ########################### Form panel ############################ //
    // ################################################################### //

    /**
     * Create Form
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelFormElement : function () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPimportForm");
        form.className = "map-tool-box";

        // TODO ?
        if (form.addEventListener) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                self._onImportSubmit();
            });
        } else if (form.attachEvent) {
            form.attachEvent("onsubmit", function (e) {
                e.preventDefault();
                self._onImportSubmit();
            });
        }

        return form;
    },

    /**
     * Create Container for import type choice
     *
     * @param {Array} importTypes - import types to be displayed (and used)
     * @returns {DOMElement} DOM element
     */
    _createImportTypeLineElement : function (importTypes) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPimportTypeLine");
        div.className = "GPimportInputLine";

        var label = document.createElement("label");
        label.htmlFor = this._addUID("GPimportType");
        label.className = "GPimportLabel";
        label.innerHTML = "Type de donnée";
        label.title = "Type de donnée";
        div.appendChild(label);

        var select = document.createElement("select");
        select.className = "GPimportSelect";
        // gestionnaire d'evenement : on stocke la valeur du type d'import
        if (select.addEventListener) {
            select.addEventListener("change", function (e) {
                if (this.value === "KML" || this.value === "GPX" || this.value === "GeoJSON") {
                    // static import
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPimportVisibleParams";
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPimportHiddenParams";
                } else if (this.value === "WMS" || this.value === "WMTS" || this.value === "WFS") {
                    // service import
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPimportVisibleParams";
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPimportHiddenParams";
                }
                context._onImportTypeChange(e);
            });
        } else if (select.attachEvent) {
            select.attachEvent("onchange", function () {
                if (this.value === "KML" || this.value === "GPX" || this.value === "GeoJSON") {
                    // static import
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPimportVisibleParams";
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPimportHiddenParams";
                } else if (this.value === "WMS" || this.value === "WMTS" || this.value === "WFS") {
                    // service import
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPimportVisibleParams";
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPimportHiddenParams";
                }
                context._onImportTypeChange();
            });
        }
        select.id = this._addUID("GPimportType");

        // on prend soit les valeurs passées par l'utilisateur, soit des valeurs par défaut
        if (!importTypes || !Array.isArray(importTypes)) {
            importTypes = [
                "KML",
                "GPX",
                "GeoJSON",
                "WMS",
                "WMTS",
                "WFS"
            ];
        }
        var option;
        for (var i = 0; i < importTypes.length; i++) {
            option = document.createElement("option");
            option.value = importTypes[i];
            option.text = importTypes[i];
            select.appendChild(option);
        }

        div.appendChild(select);

        return div;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportWaitingContainer");
        div.className = "GPimportWaitingContainerHidden";

        var p = document.createElement("p");
        p.className = "GPimportWaiting";
        p.innerHTML = "Recherche en cours...";

        div.appendChild(p);

        return div;
    },

    // ################################################################### //
    // ############### Params for static import (KML / GPX / GeoJSON) ############## //
    // ################################################################### //

    /**
     * Create container for KML/GPX/GeoJSON parameters
     * @param {String} currentType - GeoJSON, GPX or KML value
     * @returns {DOMElement} DOM element
     */
    _createImportStaticParamsContainer : function (currentType) {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportStaticParams");
        if (currentType === "KML" || currentType === "GPX" || currentType === "GeoJSON") {
            div.className = "GPimportVisibleParams";
        } else {
            div.className = "GPimportHiddenParams";
        }

        return div;
    },

    /**
     * Create name label for KML/GPX/GeoJSON parameters
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticNameLabel : function () {
        var div = document.createElement("div");
        div.className = "GPimportInputLine";

        var label = document.createElement("label");
        label.className = "GPimportLabel";
        label.htmlFor = this._addUID("GPimportName");
        label.innerHTML = "Nom";
        label.title = "Nom";
        div.appendChild(label);

        var input = document.createElement("input");
        input.type = "text";
        input.id = this._addUID("GPimportName");
        input.className = "GPimportInput";
        div.appendChild(input);

        return div;
    },

    /**
     * Create import choice for KML/GPX/GeoJSON parameters (local or url)
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticModeChoiceDiv : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportChoice");
        return div;
    },

    /**
     * Create local import choice for KML/GPX/GeoJSON parameters
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalChoiceDiv : function () {
        var context = this;

        var div = document.createElement("div");
        div.className = "GPimportChoiceAlt";

        var input = document.createElement("input");
        input.type = "radio";
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPimportInputLine";
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPimportValueHidden";
                context._onStaticImportTypeChange(e);
            });
        } else if (input.appendChild) {
            input.appendChild("onchange", function () {
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPimportInputLine";
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPimportValueHidden";
                context._onStaticImportTypeChange();
            });
        }
        input.name = "GPimportChoiceMode";
        input.value = "local";
        input.checked = true;
        input.id = this._addUID("GPimportChoiceAltLocal");
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPimportChoiceAltTxt";
        label.htmlFor = this._addUID("GPimportChoiceAltLocal");
        label.innerHTML = "par fichier local";
        label.title = "par fichier local";
        div.appendChild(label);

        return div;
    },

    /**
     * Create url import choice for KML/GPX/GeoJSON parameters
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlChoiceDiv : function () {
        var context = this;

        var div = document.createElement("div");
        div.className = "GPimportChoiceAlt";

        var input = document.createElement("input");
        input.type = "radio";
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPimportInputLine";
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPimportValueHidden";
                context._onStaticImportTypeChange(e);
            });
        } else if (input.appendChild) {
            input.appendChild("onchange", function () {
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPimportInputLine";
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPimportValueHidden";
                context._onStaticImportTypeChange();
            });
        }
        input.id = this._addUID("GPimportChoiceAltUrl");
        input.name = "GPimportChoiceMode";
        input.value = "url";
        input.checked = false;
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPimportChoiceAltTxt";
        label.htmlFor = this._addUID("GPimportChoiceAltUrl");
        label.innerHTML = "par URL";
        label.title = "par URL";
        div.appendChild(label);

        return div;
    },

    /**
     * Create input div for KML/GPX/GeoJSON parameters local import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalInputDiv : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportValueLocal");
        div.className = "GPimportInputLine";
        return div;
    },

    /**
     * Create input label for KML/GPX/GeoJSON parameters local import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalInputLabel : function () {
        var label = document.createElement("label");
        label.className = "GPimportLabel";
        label.htmlFor = this._addUID("GPimportFile");
        label.innerHTML = "Fichier local";
        label.title = "Fichier local";
        return label;
    },

    /**
     * Create file input for KML/GPX/GeoJSON parameters local import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalInput : function () {
        var input = document.createElement("input");
        input.type = "file";
        input.id = this._addUID("GPimportFile");
        input.className = "GPimportInputFile";
        return input;
    },

    /**
     * Create input div for KML/GPX/GeoJSON parameters url import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlInputDiv : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportValueUrl");
        div.className = "GPimportValueHidden";
        return div;
    },

    /**
     * Create input label for KML/GPX/GeoJSON parameters url import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlInputLabel : function () {
        var label = document.createElement("label");
        label.className = "GPimportLabel";
        label.htmlFor = this._addUID("GPimportUrl");
        label.innerHTML = "URL";
        label.title = "URL";
        return label;
    },

    /**
     * Create url input for KML/GPX/GeoJSON parameters url import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlInput : function () {
        var input = document.createElement("input");
        input.type = "text";
        input.id = this._addUID("GPimportUrl");
        input.className = "GPimportInput";
        return input;
    },

    // ################################################################### //
    // ######## Params for service params import (WMS//WMTS/WFS) ######### //
    // ################################################################### //

    /**
     * Create container for WMS/WMTS/WFS parameters
     * @param {String} currentType - WMS, WMTS or WFS value
     * @returns {DOMElement} DOM element
     */
    _createServiceParamsContainer : function (currentType) {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportServiceParams");
        if (currentType === "WMS" || currentType === "WMTS" || currentType === "WFS") {
            div.className = "GPimportVisibleParams";
        } else {
            div.className = "GPimportHiddenParams";
        }

        return div;
    },

    /**
     * Create div for WMS/WMTS/WFS url
     *
     * @returns {DOMElement} DOM element
     */
    _createServiceUrlDiv : function () {
        var div = document.createElement("div");
        div.className = "GPimportInputLine";
        return div;
    },

    /**
     * Create input label for WMS/WMTS/WFS url
     *
     * @returns {DOMElement} DOM element
     */
    _createServiceUrlInputLabel : function () {
        var label = document.createElement("label");
        label.className = "GPimportLabel";
        label.htmlFor = this._addUID("GPimportServiceUrl");
        label.innerHTML = "URL du service";
        label.title = "URL du service";
        return label;
    },

    /**
     * Create input for WMS/WMTS/WFS parameters url
     *
     * @returns {DOMElement} DOM element
     */
    _createServiceUrlInput : function () {
        var input = document.createElement("input");
        input.type = "text";
        input.id = this._addUID("GPimportServiceUrl");
        input.className = "GPimportInput";
        return input;
    },

    // ################################################################### //
    // ########################### Submit Form ########################### //
    // ################################################################### //

    /**
     * Create Submit Form Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportSubmitFormElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPimportSubmit");
        input.className = "GPinputSubmit tool-form-submit";
        input.type = "submit";
        input.value = "Importer";

        return input;
    },

    // ################################################################### //
    // ########################### GetCap Panel ########################## //
    // ################################################################### //

    /**
     * Create GetCap Panel Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportGetCapPanelElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportGetCapPanel");
        div.className = "GPpanel";
        return div;
    },

    /**
     * Create GetCap Panel Header Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportGetCapPanelHeaderElement : function () {
        // contexte
        var context = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader";

        // panel title
        var panelTitle = document.createElement("div");
        panelTitle.className = "GPpanelTitle";
        panelTitle.innerHTML = "Couches accessibles";
        panelTitle.title = "Couches accessibles";
        container.appendChild(panelTitle);

        // close picto
        var closeDiv = document.createElement("div");
        if (closeDiv.addEventListener) {
            closeDiv.addEventListener("click", function () {
                document.getElementById(context._addUID("GPimportGetCapPanel")).style.display = "none";
                document.getElementById(context._addUID("GPimportPanel")).style.display = "";
                context._onGetCapPanelClose();
            });
        } else if (closeDiv.attachEvent) {
            closeDiv.attachEvent("click", function () {
                document.getElementById(context._addUID("GPimportGetCapPanel")).style.display = "none";
                document.getElementById(context._addUID("GPimportPanel")).style.display = "";
                context._onGetCapPanelClose();
            });
        }
        closeDiv.className = "GPpanelClose";
        closeDiv.title = "Fermer le panneau";
        closeDiv.id = this._addUID("GPimportGetCapPanelClose");
        container.appendChild(closeDiv);

        return container;
    },

    /**
     * Create GetCap Results List Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportGetCapResultsListElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPimportGetCapResults");
        return container;
    },

    /**
     * Create GetCap Result Element ( = layer description)
     *
     * @param {String} layerDescription - description to be displayed for layer
     * @param {Number} id - layer identifier in getCapabilities response layers list
     * @returns {DOMElement} DOM element
     */
    _createImportGetCapResultElement : function (layerDescription, id) {
        var div = document.createElement("div");
        div.className = "GPimportGetCapProposal";
        div.innerHTML = layerDescription;
        div.title = layerDescription;

        var context = this;
        if (div.addEventListener) {
            div.addEventListener("click", function (e) {
                context._onGetCapResponseLayerClick(e);
            });
        } else if (div.attachEvent) {
            div.attachEvent("onclick", function () {
                context._onGetCapResponseLayerClick();
            });
        }
        div.id = "GPimportGetCapProposal_" + id;

        return div;
    }

};

export default LayerImportDOM;
