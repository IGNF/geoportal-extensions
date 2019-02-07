var IsoDOM = {

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
        container.id = this._addUID("GPisochron");
        container.className = "GPwidget";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Hidden checkbox for minimizing/maximizing panel
     *
     * @returns {DOMElement} DOM element
     */
    _createShowIsoElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowIsochron");
        input.type = "checkbox";
        return input;
    },

    /**
     * Show iso control
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createShowIsoPictoElement : function () {
        // contexte d'execution
        var context = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowIsochronPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowIsochron");
        label.title = "Calculer une isochrone";

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie du calcul d'isochrone
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (label.addEventListener) {
            label.addEventListener("click", function (e) {
                context.onShowIsoPanelClick(e);
            });
        } else if (label.attachEvent) {
            label.attachEvent("onclick", function (e) {
                context.onShowIsoPanelClick(e);
            });
        }

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowIsochronOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        return label;
    },

    // ################################################################### //
    // ################## Methods to display Inputs Panel ################ //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * FIXME
     * don't call this._createIsoPanelHeaderElement
     * don't call this._createIsoPanelFormElement
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisochronPanel");
        div.className = "GPpanel";

        // div.appendChild(this._createIsoPanelHeaderElement());
        // div.appendChild(this._createIsoPanelFormElement());

        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelHeaderElement : function () {
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader";

        var div = document.createElement("div");
        div.className = "GPpanelTitle";
        div.innerHTML = "Calcul d'isochrone";
        container.appendChild(div);

        // on desactive l'impl. reduction de la fenetre
        // var divReduce  = document.createElement("div");
        // divReduce.id = this._addUID("GPisochronPanelReduce");
        // divReduce.className = "GPpanelReduce";
        // divReduce.title = "Masquer le panneau";
        //
        // if (divReduce.addEventListener) {
        //     divReduce.addEventListener("click", function () {
        //         if ( typeof self.onReduceIsoPanelClick === "function") {
        //             document.getElementById(self._addUID("GPshowIsochron")).checked = false;
        //             self.onReduceIsoPanelClick();
        //         }
        //     }, false);
        // } else if (divReduce.attachEvent) {
        //     divReduce.attachEvent("onclick", function () {
        //         if ( typeof self.onReduceIsoPanelClick === "function") {
        //             document.getElementById(self._addUID("GPshowIsochron")).checked = false;
        //             self.onReduceIsoPanelClick();
        //         }
        //     });
        // }
        // container.appendChild(divReduce);

        var divClose = document.createElement("div");
        divClose.id = this._addUID("GPisochronPanelClose");
        divClose.className = "GPpanelClose";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowIsochronPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowIsochronPicto")).click();
            });
        }
        container.appendChild(divClose);

        return container;
    },

    /**
     * Create Form
     * see evenement !
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormElement : function () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPisochronForm");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            self.onIsoComputationSubmit(e);
            return false;
        });

        return form;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisochronCalcWaitingContainer");
        div.className = "GPisochronCalcWaitingContainerHidden";

        var p = document.createElement("p");
        p.className = "GPisochronCalcWaiting";
        p.innerHTML = "Calcul en cours...";

        div.appendChild(p);

        return div;
    },

    // ################################################################### //
    // ############# Methods to the type choice into form ################ //
    // ################################################################### //

    /**
     * Create Container to type choice
     *
     * FIXME
     * don't call this._createIsoPanelFormTypeChoiceChronElement
     * don't call this._createIsoPanelFormTypeChoiceDistElement
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormTypeChoiceElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisochronChoice");

        // div.appendChild(this._createIsoPanelFormTypeChoiceChronElement());
        // div.appendChild(this._createIsoPanelFormTypeChoiceDistElement());

        return div;
    },

    /**
     * Create Type choice Chron
     * see event !
     * FIXME event not useful
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormTypeChoiceChronElement : function (checked) {
        var self = this;

        var div = document.createElement("div");
        div.className = "GPisochronChoiceAlt";

        var input = document.createElement("input");
        input.id = this._addUID("GPisochronChoiceAltChron");
        input.name = "GPisochronChoiceMode";
        input.type = "radio";
        input.checked = !!(checked);
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPflexInput";
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPisochronValueHidden";
                self.onIsoTypeChoiceChange(e);
            }, false);
        } else if (input.attachEvent) {
            input.attachEvent("onchange", function () {
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPflexInput";
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPisochronValueHidden";
                self.onIsoTypeChoiceChange();
            });
        }
        // info: Internet explorer support
        input.value = "isochron";
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPisochronChoiceAltImg";
        label.htmlFor = this._addUID("GPisochronChoiceAltChron");
        div.appendChild(label);

        var span = document.createElement("span");
        span.id = this._addUID("GPisochronChoiceAltChronTxt");
        span.innerHTML = "isochrone";
        if (span.addEventListener) {
            span.addEventListener("click", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltChron")).click();
            }, false);
        } else if (span.attachEvent) {
            span.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltChron")).click();
            });
        }
        div.appendChild(span);

        return div;
    },

    /**
     * Create Type choice Dist
     * see event !
     * FIXME event not useful
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormTypeChoiceDistElement : function (checked) {
        var self = this;

        var div = document.createElement("div");
        div.className = "GPisochronChoiceAlt";

        var input = document.createElement("input");
        input.id = this._addUID("GPisochronChoiceAltDist");
        input.name = "GPisochronChoiceMode";
        input.type = "radio";
        input.checked = !!(checked);
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPflexInput";
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPisochronValueHidden";
                self.onIsoTypeChoiceChange(e);
            }, false);
        } else if (input.attachEvent) {
            input.attachEvent("onchange", function () {
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPflexInput";
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPisochronValueHidden";
                self.onIsoTypeChoiceChange();
            });
        }
        // info: Internet explorer support
        input.value = "isodistance";
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPisochronChoiceAltImg";
        label.htmlFor = this._addUID("GPisochronChoiceAltDist");
        div.appendChild(label);

        var span = document.createElement("span");
        span.id = this._addUID("GPisochronChoiceAltDistTxt");
        span.innerHTML = "isodistance";
        if (span.addEventListener) {
            span.addEventListener("click", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltDist")).click();
            }, false);
        } else if (span.attachEvent) {
            span.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltDist")).click();
            });
        }
        div.appendChild(span);

        return div;
    },

    // ################################################################### //
    // ############### Methods to the value iso into form ################ //
    // ################################################################### //

    /**
     * Create isochron inputs values
     * see event !
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormValueIsochronElement : function (checked) {
        // contexte
        var context = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPisochronValueChron");
        div.className = (checked) ? "GPflexInput" : "GPisochronValueHidden";

        var label = document.createElement("label");
        label.id = this._addUID("GPisochronValueChronLabel");
        label.htmlFor = this._addUID("GPisochronValueChronInput");
        label.innerHTML = "Temps";
        div.appendChild(label);

        var input1 = document.createElement("input");
        input1.id = this._addUID("GPisochronValueChronInput1");
        input1.min = "0";
        input1.step = "1";
        input1.value = "0";
        input1.type = "number";
        if (input1.addEventListener) {
            input1.addEventListener("change", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeHourChange(e);
                }
            });
        } else if (input1.attachEvent) {
            input1.attachEvent("onchange", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeHourChange(e);
                }
            });
        }
        div.appendChild(input1);

        var label1 = document.createElement("label");
        label1.innerHTML = "h";
        div.appendChild(label1);

        var input2 = document.createElement("input");
        input2.id = this._addUID("GPisochronValueChronInput2");
        input2.min = "0";
        input2.max = "59";
        input2.step = "1";
        input2.value = "0";
        input2.type = "number";
        if (input2.addEventListener) {
            input2.addEventListener("change", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeMinuteChange(e);
                }
            });
        } else if (input2.attachEvent) {
            input2.attachEvent("onchange", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeMinuteChange(e);
                }
            });
        }
        div.appendChild(input2);

        var label2 = document.createElement("label");
        label2.innerHTML = "min";
        div.appendChild(label2);

        return div;
    },

    /**
     * Create isodistance inputs values
     * see event !
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormValueIsodistanceElement : function (checked) {
        // contexte
        var context = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPisochronValueDist");
        div.className = (checked) ? "GPflexInput" : "GPisochronValueHidden";

        var label = document.createElement("label");
        label.id = this._addUID("GPisochronValueDistLabel");
        label.htmlFor = this._addUID("GPisochronValueDistInput");
        label.innerHTML = "Distance";
        div.appendChild(label);

        var input1 = document.createElement("input");
        input1.id = this._addUID("GPisochronValueDistInput");
        input1.min = "0";
        input1.step = "any";
        input1.value = "0";
        input1.type = "number";
        if (input1.addEventListener) {
            input1.addEventListener("change", function (e) {
                if (typeof context.onIsoValueDistChange === "function") {
                    context.onIsoValueDistChange(e);
                }
            });
        } else if (input1.attachEvent) {
            input1.attachEvent("onchange", function (e) {
                if (typeof context.onIsoValueDistChange === "function") {
                    context.onIsoValueDistChange(e);
                }
            });
        }
        div.appendChild(input1);

        var label1 = document.createElement("label");
        label1.innerHTML = "km";
        div.appendChild(label1);

        return div;
    },

    // ################################################################### //
    // ############ Methods to the mode choice into form ################# //
    // ################################################################### //

    /**
     * Create Container to Mode choice
     *
     * FIXME
     * don't call this._createIsoPanelFormModeChoiceTransportElement
     * don't call this._createIsoPanelFormModeChoiceDirectionElement
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormModeChoiceElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisochronModeChoice");

        // div.appendChild(this._createIsoPanelFormModeChoiceTransportElement());
        // div.appendChild(this._createIsoPanelFormModeChoiceDirectionElement());

        return div;
    },

    /**
     * Create Mode choice transport
     * see event !
     * FIXME event not useful
     * @param {Array} transports - transports in a list
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormModeChoiceTransportElement : function (transports) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPisochronTransportChoice");

        var span = document.createElement("span");
        span.className = "GPisochronModeLabel";
        span.innerHTML = "Mode de transport";
        div.appendChild(span);

        /* jshint -W083 */
        for (var i = 0; i < transports.length; i++) {
            var transport = transports[i];

            if (transport === "Voiture") {
                var inputCar = document.createElement("input");
                inputCar.id = this._addUID("GPisochronTransportCar");
                inputCar.type = "radio";
                inputCar.name = "GPisochronTransport";
                if (i === 0) {
                    inputCar.checked = true;
                }
                // gestionnaire d'evenement :
                // on stocke le mode de transport,
                // utilisation pour la requête sur le service de calcul d'itiniraire
                if (inputCar.addEventListener) {
                    inputCar.addEventListener("change", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                } else if (inputCar.attachEvent) {
                    inputCar.attachEvent("onchange", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                }
                // info : internet explorer support
                inputCar.value = "Voiture";
                div.appendChild(inputCar);

                var labelCar = document.createElement("label");
                labelCar.className = "GPisochronTransportImg";
                labelCar.htmlFor = this._addUID("GPisochronTransportCar");
                labelCar.title = "Voiture";
                div.appendChild(labelCar);
            }

            if (transport === "Pieton") {
                var inputPedestrian = document.createElement("input");
                inputPedestrian.id = this._addUID("GPisochronTransportPedestrian");
                inputPedestrian.type = "radio";
                inputPedestrian.name = "GPisochronTransport";
                if (i === 0) {
                    inputPedestrian.checked = true;
                }
                // gestionnaire d'evenement :
                // on stocke le mode de transport,
                // utilisation pour la requête sur le service de calcul d'itiniraire
                if (inputPedestrian.addEventListener) {
                    inputPedestrian.addEventListener("change", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                } else if (inputPedestrian.attachEvent) {
                    inputPedestrian.attachEvent("onchange", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                }
                // info : internet explorer support
                inputPedestrian.value = "Pieton";
                div.appendChild(inputPedestrian);

                var labelPedestrian = document.createElement("label");
                labelPedestrian.className = "GPisochronTransportImg";
                labelPedestrian.htmlFor = this._addUID("GPisochronTransportPedestrian");
                labelPedestrian.title = "Piéton";
                div.appendChild(labelPedestrian);
            }
        }

        return div;
    },

    /**
     * Create Mode choice direction
     * see event!
     *
     * @param {Array} directions - directions to display in list ("Departure", "Arrival"). First element will be selected by default
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormModeChoiceDirectionElement : function (directions) {
        // contexte d'execution
        var self = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPisochronDirectionChoice");

        var span = document.createElement("span");
        span.className = "GPisochronModeLabel";
        span.innerHTML = "Sens de parcours";
        div.appendChild(span);

        var select = document.createElement("select");
        select.id = this._addUID("GPisochronDirectionSelect");
        select.className = "GPinputSelect";
        // gestionnaire d'evenement :
        // on stocke la valeur du mode de calcul,
        // utilisation pour la requête sur le service de calcul d'iso
        select.addEventListener("change", function (e) {
            self.onIsoModeDirectionChange(e);
        });

        for (var i = 0; i < directions.length; i++) {
            var direction = directions[i];
            if (direction.toLowerCase() === "departure") {
                var departureOption = document.createElement("option");
                if (i === 0) {
                    departureOption.selected = "selected";
                }
                departureOption.value = "departure";
                departureOption.text = "Départ";
                select.appendChild(departureOption);
            }
            if (direction.toLowerCase() === "arrival") {
                var arrivalOption = document.createElement("option");
                if (i === 0) {
                    arrivalOption.selected = "selected";
                }
                arrivalOption.value = "arrival";
                arrivalOption.text = "Arrivée";
                select.appendChild(arrivalOption);
            }
        }
        div.appendChild(select);

        return div;
    },

    // ################################################################### //
    // ################# Methods to the choice exclusions ################ //
    // ################################################################### //

    /**
     * Hidden checkbox for minimizing/maximizing Exclusions Options
     *
     * @returns {DOMElement} DOM element
     */
    _createShowIsoExclusionsElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowIsoExclusions");
        input.type = "checkbox";
        return input;
    },

    /**
     * Label to Exclusions Options
     *
     * @returns {DOMElement} DOM element
     */
    _createShowIsoExclusionsPictoElement : function () {
        var label = document.createElement("label");
        label.id = this._addUID("GPshowIsoExclusionsPicto");
        label.className = "GPshowMoreOptionsImage GPshowMoreOptions GPshowIsoExclusionsPicto";
        label.htmlFor = this._addUID("GPshowIsoExclusions");
        label.title = "Exclusions";
        label.style.top = "240px";

        return label;
    },

    /**
     * Create Container to Exclusions
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormExclusionsElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisoExclusions");

        var span = document.createElement("span");
        span.className = "GPisoExclusionsLabel";
        span.innerHTML = "Passages autorisés";
        div.appendChild(span);

        // div.appendChild(this._createIsoPanelFormExclusionOptionsElement());

        return div;
    },

    /**
     * Create Exclusions Options
     * see event !
     * FIXME event not useful
     * @param {Array} exclusions - exclusions to display in list
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormExclusionOptionsElement : function (exclusions) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.className = "GPisoExclusionsOptions";

        /* jshint -W083 */
        for (var value in exclusions) {
            if (exclusions.hasOwnProperty(value)) {
                var status = exclusions[value];
                switch (value) {
                    case "toll":
                        var inputToll = document.createElement("input");
                        inputToll.id = this._addUID("GPisoExclusionsToll");
                        inputToll.type = "checkbox";
                        inputToll.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputToll.addEventListener) {
                            inputToll.addEventListener("change", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        } else if (inputToll.attachEvent) {
                            inputToll.attachEvent("onchange", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        }
                        // info : internet explorer support
                        inputToll.value = "Toll";
                        div.appendChild(inputToll);

                        var labelToll = document.createElement("label");
                        labelToll.className = "GPisoExclusionsOption";
                        labelToll.htmlFor = this._addUID("GPisoExclusionsToll");
                        labelToll.innerHTML = "Péages";
                        div.appendChild(labelToll);
                        break;

                    case "tunnel":
                        var inputTunnel = document.createElement("input");
                        inputTunnel.id = this._addUID("GPisoExclusionsTunnel");
                        inputTunnel.type = "checkbox";
                        inputTunnel.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputTunnel.addEventListener) {
                            inputTunnel.addEventListener("change", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        } else if (inputTunnel.attachEvent) {
                            inputTunnel.attachEvent("onchange", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        }
                        // info : internet explorer support
                        inputTunnel.value = "Tunnel";
                        div.appendChild(inputTunnel);

                        var labelTunnel = document.createElement("label");
                        labelTunnel.className = "GPisoExclusionsOption";
                        labelTunnel.htmlFor = this._addUID("GPisoExclusionsTunnel");
                        labelTunnel.innerHTML = "Tunnels";
                        div.appendChild(labelTunnel);
                        break;

                    case "bridge":
                        var inputBridge = document.createElement("input");
                        inputBridge.id = this._addUID("GPisoExclusionsBridge");
                        inputBridge.type = "checkbox";
                        inputBridge.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputBridge.addEventListener) {
                            inputBridge.addEventListener("change", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        } else if (inputBridge.attachEvent) {
                            inputBridge.attachEvent("onchange", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        }
                        // info : internet explorer support
                        inputBridge.value = "Bridge";
                        div.appendChild(inputBridge);

                        var labelBridge = document.createElement("label");
                        labelBridge.className = "GPisoExclusionsOption";
                        labelBridge.htmlFor = this._addUID("GPisoExclusionsBridge");
                        labelBridge.innerHTML = "Ponts";
                        div.appendChild(labelBridge);
                        break;
                }
            }
        }

        return div;
    },

    // ################################################################### //
    // ############################### Submit Form ####################### //
    // ################################################################### //

    /**
     * Create Submit Form Element
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoSubmitFormElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPisochronSubmit");
        input.className = "GPinputSubmit";
        input.type = "submit";
        input.value = "Calculer";

        return input;
    },

    // ################################################################### //
    // ############################### Reset picto ####################### //
    // ################################################################### //

    /**
     * Create Reset Picto Element
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoFormResetElement : function () {
        var self = this;

        var divReset = document.createElement("div");
        divReset.id = this._addUID("GPisochronReset");
        divReset.title = "Réinitialiser les paramètres";
        divReset.addEventListener("click", function (e) {
            self.onIsoResetClick(e);
        });

        return divReset;
    }
};

export default IsoDOM;
