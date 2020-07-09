var MousePositionDOM = {

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
        container.id = this._addUID("GPmousePosition");
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
    _createShowMousePositionElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowMousePosition");
        input.type = "checkbox";
        return input;
    },

    /**
     * Show mouse position control
     * @param {Boolean} isDesktop - specifies if the support is desktop or tactile
     *
     * @returns {DOMElement} DOM element
     */
    _createShowMousePositionPictoElement : function (isDesktop) {
        // contexte d'execution
        var self = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowMousePositionPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowMousePosition");
        label.title = "Afficher les coordonnées du curseur";

        // FIXME detection disponible dans le JS !
        // Detection : test for desktop or tactile
        // var isDesktop = true;
        // var userAgent = window.navigator.userAgent.toLowerCase();
        // if (userAgent.indexOf("iphone") !== -1 ||
        // userAgent.indexOf("ipod") !== -1 ||
        // userAgent.indexOf("ipad") !== -1 ||
        // userAgent.indexOf("android") !== -1 ||
        // userAgent.indexOf("mobile") !== -1 ||
        // userAgent.indexOf("blackberry") !== -1 ||
        // userAgent.indexOf("tablet") !== -1 ||
        // userAgent.indexOf("phone") !== -1 ||
        // userAgent.indexOf("touch") !== -1 ) {
        //     isDesktop = false;
        // }
        // if (userAgent.indexOf("msie") !== -1 ||
        // userAgent.indexOf("trident") !== -1) {
        //     isDesktop = true;
        // }

        // Show map center localisation if panel opened and tactile support
        label.addEventListener("click", function (e) {
            var mapCenterClass = "";
            if (!document.getElementById(self._addUID("GPshowMousePosition")).checked && !isDesktop) {
                mapCenterClass = "GPmapCenterVisible";
            }
            document.getElementById("GPmapCenter").className = mapCenterClass;
            self.onShowMousePositionClick(e);
        });

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowMousePositionOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        return label;
    },

    /**
     * mouse position panel
     *
     * @returns {DOMElement} DOM element
     */
    _createMousePositionPanelElement : function () {
        var panel = document.createElement("div");
        panel.id = this._addUID("GPmousePositionPanel");
        panel.className = "GPpanel";

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // div.appendChild(this._createMousePositionPanelHeaderElement());
        // div.appendChild(this._createMousePositionPanelBasicElement());
        // div.appendChild(this._createShowMousePositionSettingsElement());
        // div.appendChild(this._createMousePositionSettingsElement());

        return panel;
    },

    /**
     * Map center localisation (tactile use)
     *
     * @returns {DOMElement} container
     */
    _createMapCenter : function () {
        var div = document.createElement("div");
        div.id = "GPmapCenter";
        div.className = "";
        return div;
    },

    // ################################################################### //
    // ####################### Panel container ########################### //
    // ################################################################### //

    /**
     * @returns {DOMElement} container
     */
    _createMousePositionPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelHeader";

        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle";
        divTitle.innerHTML = "Coordonnées";
        container.appendChild(divTitle);

        var divClose = document.createElement("div");
        divClose.id = "GPmousePositionPanelClose";
        divClose.className = "GPpanelClose";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        var self = this;
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowMousePositionPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowMousePositionPicto")).click();
            });
        }

        container.appendChild(divClose);

        return container;
    },

    /**
     * coordinate panel
     * @param {Boolean} [displayAltitude] - specifies if the altitude panel must be displayed
     * @param {Boolean} [displayCoordinates] - specifies if the coordinates panel must be displayed
     * @param {Boolean} [editCoordinates] - specifies if the coordinates edition is allowed
     * @param {Boolean} [currentProjectionUnits] - specifies if the current projection units
     *
     * FIXME
     * call this._createMousePositionPanelBasicCoordinateElement
     * call this._createMousePositionPanelBasicAltitudeElement
     *
     * @returns {DOMElement} DOM element
     */
    _createMousePositionPanelBasicElement : function (displayAltitude, displayCoordinates, editCoordinates, currentProjectionUnits) {
        // default Values
        displayAltitude = (typeof displayAltitude === "undefined") ? true : displayAltitude;
        displayCoordinates = (typeof displayCoordinates === "undefined") ? true : displayCoordinates;
        editCoordinates = (typeof editCoordinates === "undefined") ? false : editCoordinates;

        var container = document.createElement("div");
        container.id = this._addUID("GPmousePositionBasicPanel");

        // FIXME on devrait decomposer la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        container.appendChild(this._createMousePositionPanelBasicCoordinateElement(displayCoordinates, editCoordinates, currentProjectionUnits));
        container.appendChild(this._createMousePositionPanelEditToolsElement(editCoordinates));
        container.appendChild(this._createMousePositionPanelBasicAltitudeElement(displayAltitude));

        return container;
    },

    /**
     * create coordinate elements
     *
     * @param {String} coordType - ("Lon" ou "Lat")
     * @param {Boolean} [editCoordinates=false] - specifies if the coordinates edition is allowed
     *
     * @returns {Array} list of DOM elements
     */
    _createCoordinateElement : function (coordType, editCoordinates) {
        var context = this;

        if (["Lon", "Lat"].indexOf(coordType) === -1) {
            return [];
        }

        var list = [];
        var input = document.createElement("input");
        input.id = this._addUID("GPmousePosition" + coordType);
        input.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
        input.readOnly = true;

        if (editCoordinates) {
            input.addEventListener("click", function () {
                context.onMousePositionEditModeClick(true);
            });
            input.addEventListener("change", function (e) {
                this.classList.remove("error");
                var valid = context.validateExtentCoordinate(coordType, this.value, e);
                valid ? this.classList.remove("error") : this.classList.add("error");
            });
        }
        list.push(input);

        var span = document.createElement("span");
        span.className = "GPmousePositionUnits";
        list.push(span);

        return list;
    },

    /**
     *
     * @param {String} coordType - ("Lon" ou "Lat")
     * @param {Boolean} [editCoordinates=false] - specifies if the coordinates edition is allowed
     *
     * @returns {Array} list of DOM elements
     */
    _createDMSCoordinateElement : function (coordType, editCoordinates) {
        if (["Lon", "Lat"].indexOf(coordType) === -1) {
            return [];
        }

        var context = this;

        var list = [];

        var input = document.createElement("input");
        input.id = this._addUID("GPmousePosition" + coordType + "Degrees");
        input.className = "GPSexagesimal";
        input.setAttribute("name", "degrees");
        input.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
        input.readOnly = true;
        input.dataset.min = 0;
        input.dataset.max = (coordType === "Lon") ? 180 : 90;
        if (editCoordinates) {
            input.addEventListener("click", function () {
                context.onMousePositionEditModeClick(true);
            });
            input.addEventListener("change", function () {
                this.classList.remove("error");
                var valid = context._checkDMSDegrees(coordType, this);
                valid ? this.classList.remove("error") : this.classList.add("error");
            });
        }
        list.push(input);

        var span = document.createElement("span");
        span.className = "GPmousePositionSexagesimalLabel";
        span.innerHTML = "°";
        list.push(span);

        var input1 = document.createElement("input");
        input1.id = this._addUID("GPmousePosition" + coordType + "Minutes");
        input1.className = "GPSexagesimal";
        input1.setAttribute("name", "minutes");
        input1.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
        input1.readOnly = true;
        input1.dataset.min = 0;
        input1.dataset.max = 59;
        if (editCoordinates) {
            input1.addEventListener("click", function () {
                context.onMousePositionEditModeClick(true);
            });
            input1.addEventListener("change", function () {
                this.classList.remove("error");
                var valid = context._checkDMSElement(this);
                valid ? this.classList.remove("error") : this.classList.add("error");
            });
        }
        list.push(input1);

        var span1 = document.createElement("span");
        span1.className = "GPmousePositionSexagesimalLabel";
        span1.innerHTML = "'";
        list.push(span1);

        var input2 = document.createElement("input");
        input2.id = this._addUID("GPmousePosition" + coordType + "Seconds");
        input2.className = "GPSexagesimalsec";
        input2.setAttribute("name", "seconds");
        input2.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
        input2.readOnly = true;
        input2.dataset.min = 0;
        input2.dataset.max = 59;
        if (editCoordinates) {
            input2.addEventListener("click", function () {
                context.onMousePositionEditModeClick(true);
            });
            input2.addEventListener("change", function () {
                this.classList.remove("error");
                var valid = context._checkDMSElement(this, true);
                valid ? this.classList.remove("error") : this.classList.add("error");
            });
        }
        list.push(input2);

        var span2 = document.createElement("span");
        span2.className = "GPmousePositionSexagesimalLabel";
        span2.innerHTML = "''";
        list.push(span2);

        var select = document.createElement("select");
        select.id = this._addUID("GPmousePosition" + coordType + "Direction");
        select.className = "GPmousePositionDirection";
        select.setAttribute("name", "direction");
        select.disabled = true;

        var option = document.createElement("option");
        option.value = (coordType === "Lon") ? "E" : "N";
        option.innerHTML = (coordType === "Lon") ? "E" : "N";
        select.appendChild(option);

        var option1 = document.createElement("option");
        option1.value = (coordType === "Lon") ? "O" : "S";
        option1.innerHTML = (coordType === "Lon") ? "O" : "S";
        select.appendChild(option1);
        list.push(select);

        return list;
    },

    /**
     * @param {Boolean} [display=false] - specifies if the coordinates panel must be displayed
     * @param {Boolean} [editCoordinates] - specifies if the coordinates edition is allowed
     * @param {Boolean} [currentProjectionUnits] - specifies if the current projection units
     *
     * @returns {DOMElement} container
     */
    _createMousePositionPanelBasicCoordinateElement : function (display, editCoordinates, currentProjectionUnits) {
        var div = document.createElement("div");
        div.id = this._addUID("GPmousePositionCoordinate");
        div.style.display = display ? "block" : "none";

        // latitude
        var divLat = document.createElement("div");

        var spanLat = document.createElement("span");
        spanLat.className = "GPmousePositionLabel";
        spanLat.id = this._addUID("GPmousePositionLatLabel");
        spanLat.innerHTML = "Latitude : ";
        divLat.appendChild(spanLat);

        var span = document.createElement("span");
        span.id = this._addUID("GPmousePositionLatCoordinate");

        var arrayCoords;
        if (currentProjectionUnits === "DMS") {
            arrayCoords = this._createDMSCoordinateElement("Lat", editCoordinates);
        } else {
            arrayCoords = this._createCoordinateElement("Lat", editCoordinates);
        }
        for (var i = 0; i < arrayCoords.length; i++) {
            span.appendChild(arrayCoords[i]);
        }
        divLat.appendChild(span);
        div.appendChild(divLat);

        // longitude
        var divLon = document.createElement("div");

        var spanLon = document.createElement("span");
        spanLon.className = "GPmousePositionLabel";
        spanLon.id = this._addUID("GPmousePositionLonLabel");
        spanLon.innerHTML = "Longitude : ";
        divLon.appendChild(spanLon);

        var span1 = document.createElement("span");
        span1.id = this._addUID("GPmousePositionLonCoordinate");

        var arrayCoords1;
        if (currentProjectionUnits === "DMS") {
            arrayCoords1 = this._createDMSCoordinateElement("Lon", editCoordinates);
        } else {
            arrayCoords1 = this._createCoordinateElement("Lon", editCoordinates);
        }
        for (var j = 0; j < arrayCoords1.length; j++) {
            span1.appendChild(arrayCoords1[j]);
        }
        divLon.appendChild(span1);
        div.appendChild(divLon);

        return div;
    },

    /**
     * @param {Boolean} [display=false] - specifies if the altitude panel must be displayed
     *
     * @returns {DOMElement} container
     */
    _createMousePositionPanelBasicAltitudeElement : function (display) {
        var div = document.createElement("div");
        div.id = this._addUID("GPmousePositionAltitude");
        div.style.display = display ? "block" : "none";

        var spanLabel = document.createElement("span");
        spanLabel.className = "GPmousePositionLabel";
        spanLabel.innerHTML = "Altitude : ";
        div.appendChild(spanLabel);

        var spanAlt = document.createElement("span");
        spanAlt.className = "GPmousePositionCoords";
        spanAlt.id = this._addUID("GPmousePositionAlt");
        spanAlt.innerHTML = "...";
        div.appendChild(spanAlt);

        var spanUnits = document.createElement("span");
        spanUnits.className = "GPmousePositionAltitudeUnits";
        spanUnits.innerHTML = "m";
        div.appendChild(spanUnits);

        return div;
    },

    /**
     * @param {Boolean} [editCoordinates=false] - specifies if the coordinates edition is allowed
     *
     * @returns {DOMElement} container
     */
    _createMousePositionPanelEditToolsElement : function (editCoordinates) {
        var context = this;

        var div = document.createElement("div");
        div.className = "GPmousePositionPanelEditTools";
        div.id = this._addUID("GPmousePositionPanelEditTools");
        if (!editCoordinates) {
            div.style.display = "none";
        }

        var span1 = document.createElement("span");
        span1.className = "GPmousePositionEditTool";
        span1.id = this._addUID("GPmousePositionLocate");
        span1.title = editCoordinates === true ? "Cliquer pour saisir des coordonnées" : "";
        if (editCoordinates) {
            span1.addEventListener("click", function () {
                context.onMousePositionEditModeLocateClick();
            });
        }
        div.appendChild(span1);

        var span2 = document.createElement("span");
        span2.className = "GPmousePositionEditTool";
        span2.id = this._addUID("GPmousePositionCloseEdit");
        span2.title = "Quitter la saisie des coordonnées";
        span2.style.display = "none";
        if (editCoordinates) {
            span2.addEventListener("click", function () {
                context.onMousePositionEditModeClick(false);
            });
        }
        div.appendChild(span2);

        return div;
    },

    // ################################################################### //
    // #################### Settings container ########################### //
    // ################################################################### //

    /**
     * @param {Boolean} [display=false] - specifies if the settings panel must be displayed
     *
     * @returns {DOMElement[]} array containing input and label elements
     */
    _createShowMousePositionSettingsElement : function (display) {
        var list = [];

        var context = this;

        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = this._addUID("GPshowMousePositionSettings");

        var label = document.createElement("label");
        label.id = this._addUID("GPshowMousePositionSettingsPicto");
        label.htmlFor = this._addUID("GPshowMousePositionSettings");
        label.title = "Réglages";
        label.className = "GPshowMoreOptionsImage GPshowMoreOptions GPshowMousePositionSettingsPicto"; // FIXME classname and id ?
        label.style.display = display ? "block" : "none";
        if (label.addEventListener) {
            label.addEventListener("click", function (e) {
                if (typeof context.onShowMousePositionSettingsClick === "function") {
                    context.onShowMousePositionSettingsClick(e);
                }
            }, false);
        } else if (label.attachEvent) {
            label.attachEvent("onclick", function (e) {
                if (typeof context.onShowMousePositionSettingsClick === "function") {
                    context.onShowMousePositionSettingsClick(e);
                }
            });
        }

        list.push(input);
        list.push(label);

        return list;
    },

    /**
     * settings panel
     * @param {Boolean} [display=true] - specifies if the settings panel must be displayed
     *
     * FIXME
     * don't call this._createMousePositionSettingsSystemsElement
     * don't call this._createMousePositionSettingsUnitsElement
     *
     * @returns {DOMElement} DOM element
     */
    _createMousePositionSettingsElement : function (display) {
        var container = document.createElement("div");
        container.id = this._addUID("GPmousePositionSettings");
        container.style.display = (display === undefined || display) ? "block" : "none";

        var span = document.createElement("span");
        span.className = "GPmousePositionSettingsLabel";
        span.innerHTML = "Système de référence";
        container.appendChild(span);

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // FIXME tableau statique !
        // var systems = [
        //     {
        //         code : "GEOGRAPHIC",
        //         label : "Géographique"
        //     },
        //     {
        //         code : "MERCATOR",
        //         label : "Mercator"
        //     },
        //     {
        //         code : "LAMB93",
        //         label : "Lambert 93"
        //     },
        //     {
        //         code : "LAMB2E",
        //         label : "Lambert II étendu"
        //     }
        // ];
        //
        // var selectSystem = this._createMousePositionSettingsSystemsElement(systems);
        //
        // container.appendChild(selectSystem);

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // FIXME tableau statique !
        // var units = [
        //     {
        //         code : "DEC",
        //         label : "degrés décimaux",
        //     },
        //     {
        //         code : "DMS",
        //         label : "degrés sexagésimaux",
        //     },
        //     {
        //         code : "RAD",
        //         label : "radians",
        //     },
        //     {
        //         code : "GON",
        //         label : "grades"
        //     }
        // ];
        //
        // var selectUnits = this._createMousePositionSettingsUnitsElement(units);
        //
        // container.appendChild(selectUnits);

        return container;
    },

    /**
     * @param {Object[]} systems - list of systems
     *
     * @returns {DOMElement} DOM element select
     */
    _createMousePositionSettingsSystemsElement : function (systems) {
        // contexte d'execution
        var context = this;

        var selectSystem = document.createElement("select");
        selectSystem.id = this._addUID("GPmousePositionProjectionSystem");
        selectSystem.className = "GPinputSelect GPmousePositionSettingsSelect";
        selectSystem.addEventListener("change", function (e) {
            context.onMousePositionProjectionSystemChange(e);
        });
        selectSystem.addEventListener("mouseover", function (e) {
            // FIXME mettre une condition si target === option
            if (e.target.nodeName !== "OPTION") {
                context.onMousePositionProjectionSystemMouseOver(e);
            }
        });

        for (var i = 0; i < systems.length; i++) {
            var obj = systems[i];
            var option = document.createElement("option");
            option.value = obj.code;
            option.text = obj.label || i;
            // option.label = obj.label;
            selectSystem.appendChild(option);
        }

        return selectSystem;
    },

    /**
     * @param {Object[]} units - list of units
     *
     * @returns {DOMElement} DOM element select
     */
    _createMousePositionSettingsUnitsElement : function (units) {
        // contexte d'execution
        var context = this;

        var selectUnits = document.createElement("select");
        selectUnits.id = this._addUID("GPmousePositionProjectionUnits");
        selectUnits.className = "GPinputSelect GPmousePositionSettingsSelect";
        selectUnits.addEventListener("change", function (e) {
            context.onMousePositionProjectionUnitsChange(e);
        });

        for (var j = 0; j < units.length; j++) {
            var obj = units[j];
            var option = document.createElement("option");
            option.value = (obj.code) ? obj.code : j;
            option.text = obj.label || j;
            // option.label = obj.label;
            selectUnits.appendChild(option);
        }

        return selectUnits;
    },

    /**
     * @param {String} [currentProjectionType="Metric"] - "Geographical" or "Metric"
     */
    _resetLabelElements : function (currentProjectionType) {
        // Changement des labels dans le formulaire de saisie
        var spanLat = document.getElementById(this._addUID("GPmousePositionLatLabel"));
        spanLat.innerHTML = currentProjectionType === "Geographical" ? "Latitude :" : "X :";

        var spanLon = document.getElementById(this._addUID("GPmousePositionLonLabel"));
        spanLon.innerHTML = currentProjectionType === "Geographical" ? "Longitude :" : "Y :";
    },

    /**
     * @param {String} currentProjectionUnits - projection units
     */
    _resetUnitElements : function (currentProjectionUnits) {
        var value = "";
        if (currentProjectionUnits === "M" || currentProjectionUnits === "KM") {
            value = currentProjectionUnits.toLowerCase();
        }

        var elts = document.getElementsByClassName("GPmousePositionUnits");
        for (var e = 0; e < elts.length; e++) {
            elts[e].innerHTML = value;
        }
    },

    /**
     * @method _resetCoordinateElements
     * @param {Boolean} editCoordinates - edit coordinates option
     * @param {String} currentProjectionType - current projection type
     * @param {String} currentProjectionUnits - current projection unit
     */
    _resetCoordinateElements : function (editCoordinates, currentProjectionType, currentProjectionUnits) {
        // Suppression de tous les enfants de GPmousePositionLatCoordinate
        var latElt = document.getElementById(this._addUID("GPmousePositionLatCoordinate"));
        while (latElt.firstChild) {
            latElt.removeChild(latElt.firstChild);
        }

        var arrayCoords;
        if (currentProjectionUnits === "DMS") {
            arrayCoords = this._createDMSCoordinateElement("Lat", editCoordinates);
        } else {
            arrayCoords = this._createCoordinateElement("Lat", editCoordinates);
        }
        for (var i = 0; i < arrayCoords.length; i++) {
            latElt.appendChild(arrayCoords[i]);
        }

        // Suppression de tous les enfants de GPmousePositionLonCoordinate
        var lonElt = document.getElementById(this._addUID("GPmousePositionLonCoordinate"));
        while (lonElt.firstChild) {
            lonElt.removeChild(lonElt.firstChild);
        }

        var arrayCoords1;
        if (currentProjectionUnits === "DMS") {
            arrayCoords1 = this._createDMSCoordinateElement("Lon", editCoordinates);
        } else {
            arrayCoords1 = this._createCoordinateElement("Lon", editCoordinates);
        }
        for (var j = 0; j < arrayCoords1.length; j++) {
            lonElt.appendChild(arrayCoords1[j]);
        }

        // FIXME on simule un deplacement ?
        // this.onMapMove();
    },

    /**
     * Set/unset editing mode
     *
     * @method _setEditMode
     * @param {Boolean} editing - active edit coordinates mode
     */
    _setEditMode : function (editing) {
        var locateElt = document.getElementById(this._addUID("GPmousePositionLocate"));
        locateElt.title = editing ? "Aller à la position ..." : "Cliquer pour saisir des coordonnées";

        var closeEditElt = document.getElementById(this._addUID("GPmousePositionCloseEdit"));
        closeEditElt.style.display = editing ? "inline-block" : "none";

        var selector = "div[id^=" + this._addUID("GPmousePositionCoordinate") + "]";
        var inputs = document.querySelectorAll(selector + " input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].readOnly = !editing;
            if (editing) {
                inputs[i].value = "";
                inputs[i].classList.remove("error");
            }
        }
        var selects = document.querySelectorAll(selector + " select");
        for (var j = 0; j < selects.length; j++) {
            selects[j].disabled = !editing;
        }
    },

    /**
     *
     * @param {DOMElement} input - input element
     * @param {Boolean} isFloat - check for float value
     *
     * @returns {Boolean} true if input value is within bounds
     */
    _checkDMSElement : function (input, isFloat) {
        var b = isFloat !== undefined;

        var value = input.value;
        if (b) {
            value = value.replace(",", ".");
        }
        if (isNaN(value)) {
            return false;
        }

        var v = parseFloat(value);
        if (!b && (v | 0) !== v) { // is it an integer
            return false;
        }

        var min = Number(input.dataset.min);
        var max = Number(input.dataset.max);
        return (v >= min && v <= max);
    },

    /**
     * @param {String} coordType - "Lon" or "Lat"
     * @param {DOMElement} input - input element
     *
     * @returns {Boolean} true if input value is within bounds
     */
    _checkDMSDegrees : function (coordType, input) {
        if (isNaN(input.value)) {
            return false;
        }

        var v = parseFloat(input.value);
        if ((v | 0) !== v) { // is it an integer
            return false;
        }

        var min = Number(input.dataset.min);
        var max = Number(input.dataset.max);
        if (v < min || v > max) {
            return false;
        }

        var inputMinutes = document.getElementById(this._addUID("GPmousePosition" + coordType + "Minutes"));
        var inputSeconds = document.getElementById(this._addUID("GPmousePosition" + coordType + "Seconds"));

        if (v >= max) {
            inputMinutes.dataset.max = 0;
            inputSeconds.dataset.max = 0;
        } else {
            inputMinutes.dataset.max = 59;
            inputSeconds.dataset.max = 59.9999;
        }

        return true;
    },

    // ################################################################### //
    // ####################### handlers Event ############################ //
    // ################################################################### //

    /**
     * Function displaying coordinates from cursor position (desktop)
     * or map center (tactile)
     * @param {Object} coordinate - coordinates
     */
    GPdisplayCoords : function (coordinate) {
        // Compute coords in case of cursor position (desktop)
        if (coordinate && coordinate != null) {
            var labelLon = document.getElementById(this._addUID("GPmousePositionLonLabel"));
            var labelLat = document.getElementById(this._addUID("GPmousePositionLatLabel"));

            if (coordinate.x || coordinate.y) {
                labelLat.innerHTML = "X : ";
                labelLon.innerHTML = "Y : ";
            } else if (coordinate.e || coordinate.n) {
                labelLat.innerHTML = "E : ";
                labelLon.innerHTML = "N : ";
            } else {
                labelLat.innerHTML = "Latitude : ";
                labelLon.innerHTML = "Longitude : ";
            }

            if (typeof coordinate.lat === "object" && typeof coordinate.lng === "object") {
                var parts = {
                    lng : "Lon",
                    lat : "Lat"
                };
                var units = ["Degrees", "Minutes", "Seconds"];
                for (var p in parts) {
                    for (var u = 0; u < units.length; ++u) {
                        var selector = "GPmousePosition" + parts[p] + units[u];
                        var elt = document.getElementById(this._addUID(selector));
                        var key = units[u].charAt(0).toLowerCase();
                        elt.value = coordinate[p][key];
                    }
                }
                // directions
                document.getElementById(this._addUID("GPmousePositionLonDirection")).value = coordinate.lng.direction;
                document.getElementById(this._addUID("GPmousePositionLatDirection")).value = coordinate.lat.direction;
            } else {
                var elLat = document.getElementById(this._addUID("GPmousePositionLat"));
                var elLon = document.getElementById(this._addUID("GPmousePositionLon"));

                elLat.value = coordinate.x || coordinate.lat || coordinate.e || "0";
                elLon.value = coordinate.y || coordinate.lng || coordinate.lon || coordinate.n || "0";

                // les unites
                var unit = (coordinate.unit === undefined) ? "" : coordinate.unit;
                var elements = document.getElementsByClassName("GPmousePositionUnits");
                for (var n = 0; n < elements.length; ++n) {
                    elements[n].innerHTML = unit;
                }
            }
        }
    },

    /**
     * Function displaying altitude from cursor position (desktop)
     * or map center (tactile)
     * @param {Object} coordinate - coordinates
     * @param {Number} altitudeTimeoutDelay - when the mouse stop moving, delay before the altitude request is launched
     * @param {Number} noDataValue - the no data value
     * @param {Number} noDataValueTolerance - the no data value tolerance
     */
    GPdisplayElevation : function (coordinate, altitudeTimeoutDelay, noDataValue, noDataValueTolerance) {
        // contexte d'execution
        var self = this;

        // Latency for altitude request
        var altitudeTimeout;
        if (!altitudeTimeoutDelay) {
            altitudeTimeoutDelay = 500;
        }

        clearTimeout(altitudeTimeout);
        document.getElementById(this._addUID("GPmousePositionAlt")).innerHTML = "...";

        if (noDataValue == null) {
            noDataValue = -99999;
        }
        if (noDataValueTolerance == null) {
            noDataValueTolerance = 99980;
        }
        var maxThreshold = noDataValue + noDataValueTolerance;
        var minThreshold = noDataValue - noDataValueTolerance;

        // Compute coords in case of cursor position (desktop)
        if (coordinate && coordinate != null) {
            // If no altitude panel, don't call altitude request
            if (document.getElementById(this._addUID("GPmousePositionAltitude"))) {
                altitudeTimeout = setTimeout(function () {
                    self.onRequestAltitude(coordinate, function (z) {
                        if (minThreshold < z && z < maxThreshold) {
                            self.GPresetElevation();
                        } else {
                            document.getElementById(self._addUID("GPmousePositionAlt")).innerHTML = z;
                        }
                    });
                }, altitudeTimeoutDelay);
            }
        }
    },

    /**
     * Function reseting altitude value
     */
    GPresetElevation : function () {
        if (document.getElementById(this._addUID("GPmousePositionAltitude"))) {
            document.getElementById(this._addUID("GPmousePositionAlt")).innerHTML = "---";
        }
    }
};

export default MousePositionDOM;
