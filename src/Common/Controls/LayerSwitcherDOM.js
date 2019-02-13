import Sortable from "sortablejs";

var LayerSwitcherDOM = {

    /**
     * Creation du drag and drop
     *
     * @param {Object} elementDraggable - Element HTML (DOM) Container
     * @param {Object} context - this
     */
    _createDraggableElement : function (elementDraggable, context) {
        Sortable.create(elementDraggable, {
            handle : ".GPlayerName",
            draggable : ".draggable-layer",
            ghostClass : "GPghostLayer",
            animation : 200,
            // Call event function on drag and drop
            onEnd : function (e) {
                // FIXME pas terrrible, mais il faut bien passer ce contexte...
                context._onDragAndDropLayerClick(e);
            }
        });
    },

    // ################################################################### //
    // ######################### Main container ########################## //
    // ################################################################### //

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
     * Creation du container principal (DOM)
     *
     * @returns {DOMElement} container - layer switcher DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPlayerSwitcher");
        container.className = "GPwidget";
        return container;
    },

    /**
     * Creation du container principal d"affichage des layers (DOM)
     *
     * @returns {DOMElement} input - element for minimizing/maximizing the layer switcher
     */
    _createMainLayersShowElement : function () {
        // <!-- Hidden checkbox for minimizing/maximizing -->
        var input = document.createElement("input");
        input.id = this._addUID("GPshowLayersList");
        input.type = "checkbox";
        return input;
    },

    /**
     * Creation du container principal des layers (DOM)
     *
     * @returns {DOMElement} container - layers list container
     */
    _createMainLayersElement : function () {
        // ajout de la liste des layers dans le container principal
        // <div id="GPlayersList" class="GPpanel">
        //   (...)
        // </div>
        var div = document.createElement("div");
        div.id = this._addUID("GPlayersList");
        div.className = "GPpanel";
        return div;
    },

    /**
     * Creation du container du picto du controle (DOM)
     *
     * @returns {DOMElement} label
     */
    _createMainPictoElement : function () {
        var self = this;

        // exemple :
        // <!-- Label for minimizing/maximizing -->
        // <label id="GPshowLayersListPicto" class="GPshowAdvancedToolPicto" for="GPshowLayersList" title="Afficher/masquer le gestionnaire de couches">
        //    <span id="GPshowLayersListOpen" class="GPshowAdvancedToolOpen"></span><span id="GPshowLayersListClose"></span>
        // </label>

        var label = document.createElement("label");
        label.id = this._addUID("GPshowLayersListPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowLayersList");
        label.title = "Afficher/masquer le gestionnaire de couches";

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowLayersListOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        spanOpen.addEventListener("click", function () {
            if (document.getElementById(self._addUID("GPshowLayersList")).checked) {
                var layers = document.getElementsByClassName("GPlayerInfoOpened");
                for (var i = 0; i < layers.length; i++) {
                    layers[i].className = "GPlayerInfo";
                }
                document.getElementById(self._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
            }
        });

        label.appendChild(spanOpen);

        var spanClose = document.createElement("span");
        spanClose.addEventListener("click", function () {
            if (document.getElementById(self._addUID("GPshowLayersList")).checked) {
                var layers = document.getElementsByClassName("GPlayerInfoOpened");
                for (var i = 0; i < layers.length; i++) {
                    layers[i].className = "GPlayerInfo";
                }
                document.getElementById(self._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
            }
        });
        spanClose.id = self._addUID("GPshowLayersListClose");

        label.appendChild(spanClose);

        return label;
    },

    /**
     * Creation du container du panneau d"information (DOM)
     *
     * @returns {DOMElement} container
     */
    _createMainInfoElement : function () {
        // gestion du panneau d"information dans le container principal
        // <div id="GPlayerInfoPanel" class="GPlayerInfoPanelClosed">...</div>
        var div = document.createElement("div");
        div.id = this._addUID("GPlayerInfoPanel");
        div.className = "GPpanel GPlayerInfoPanelClosed";
        return div;
    },

    // ################################################################### //
    // ######################### Layer container ######################### //
    // ################################################################### //

    /**
     * Creation du container du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Object} obj.layer - couche (ol ou leaflet)
     * @param {String} obj.id - identifiant de la couche (pour ol ou leaflet)
     * @param {String} obj.title - nom de la couche à afficher dans le controle
     * @param {String} obj.description - description de la couche à afficher
     * @param {Boolean} obj.visibility - visibilité de la couche dans la carte (true or false)
     * @param {Float} obj.opacity - opacité de la couche
     *
     * @returns {DOMElement} container
     */
    _createContainerLayerElement : function (obj) {
        // exemple :
        // <div id="GPlayerSwitcher_ID_Layer1" class="GPlayerSwitcher_layer outOfRange">
        //     <!-- Basic toolbar : visibility / layer name
        //     _createBasicToolElement
        //           _createBasicToolVisibilityElement
        //           _createBasicToolNameElement
        //     -->
        //     <!-- Hidden checkbox + label for showing advanced toolbar
        //     _createAdvancedToolShowElement
        //     -->
        //     <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal
        //     _createAdvancedToolElement
        //           _createAdvancedToolDeleteElement
        //           _createAdvancedToolInformationElement
        //           _createAdvancedToolOpacityElement
        //     -->
        // </div>

        // <!-- Layer entry in layer list -->
        // <!-- Every item is marked with layerID, which is defined at layer import -->
        var container = document.createElement("div");
        container.id = this._addUID("GPlayerSwitcher_ID_" + obj.id);
        container.className = "GPlayerSwitcher_layer draggable-layer";

        // ajout des outils basiques (visibility / layer name)
        container.appendChild(this._createBasicToolElement(obj));

        // liste des outils avancés (layer info / opacity slider / opacity value / removal)
        var array = this._createAdvancedToolShowElement(obj);
        for (var i = 0; i < array.length; i++) {
            container.appendChild(array[i]);
        }

        // ajout des outils avancés
        container.appendChild(this._createAdvancedToolElement(obj));

        return container;
    },

    // ################################################################### //
    // ############################ Layer tool ########################### //
    // ################################################################### //

    /**
     * Creation du container des outils basiques du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createBasicToolElement : function (obj) {
        // exemple :
        // <div id="GPbasicTools_ID_1" class="GPlayerBasicTools">
        //      <!-- _createBasicToolVisibilityElement -->
        //      <!-- _createBasicToolNameElement -->
        // </div>

        var div = document.createElement("div");
        div.id = this._addUID("GPbasicTools_ID_" + obj.id);
        div.className = "GPlayerBasicTools";

        div.appendChild(this._createBasicToolNameElement(obj));

        var array = this._createBasicToolVisibilityElement(obj);
        for (var i = 0; i < array.length; i++) {
            div.appendChild(array[i]);
        }

        return div;
    },

    /**
     * Creation du nom du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createBasicToolNameElement : function (obj) {
        // exemple :
        // <span id="GPname_ID_Layer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
        var span = document.createElement("span");
        span.id = this._addUID("GPname_ID_" + obj.id);
        span.className = "GPlayerName";
        span.title = obj.description || obj.title;
        span.innerHTML = obj.title;

        return span;
    },

    /**
     * Creation de l'icone de visibilité du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher

     * @returns {DOMElement[]} array containing input and label elements
     */
    _createBasicToolVisibilityElement : function (obj) {
        // exemple :
        // <input type="checkbox" id="GPvisibility_ID_Layer1" checked="">
        // <label for="GPvisibility_ID_Layer1" id="GPvisibilityPicto_ID_Layer1" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>

        var list = [];

        var checked = (typeof obj.visibility !== "undefined") ? obj.visibility : true;
        var id = this._addUID("GPvisibility_ID_" + obj.id);

        var input = document.createElement("input");
        input.id = id;
        input.type = "checkbox";
        input.checked = checked;

        var label = document.createElement("label");
        label.htmlFor = id;
        label.id = this._addUID("GPvisibilityPicto_ID_" + obj.id);
        label.className = "GPlayerVisibility";
        label.title = "Afficher/masquer la couche";

        // add event for visibility change
        var context = this;
        if (input.addEventListener) {
            input.addEventListener(
                "click",
                function (e) {
                    context._onVisibilityLayerClick(e);
                }
            );
        } else if (input.attachEvent) {
            // internet explorer
            input.attachEvent(
                "onclick",
                function (e) {
                    context._onVisibilityLayerClick(e);
                }
            );
        }

        list.push(input);
        list.push(label);

        return list;
    },

    /**
     * Creation de l'affichage du menu des outils avancés du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement[]} array containing input and label elements
     */
    _createAdvancedToolShowElement : function (obj) {
        // <input type="checkbox" id="GPshowAdvancedTools_ID_Layer1">
        // <label for="GPshowAdvancedTools_ID_Layer1" id="GPshowAdvancedToolsPicto_ID_Layer1" class="GPshowMoreOptions GPshowLayerAdvancedTools" title="Plus d'outils"></label>

        var list = [];

        var label = document.createElement("label");
        label.id = this._addUID("GPshowAdvancedToolsPicto_ID_" + obj.id);
        label.htmlFor = this._addUID("GPshowAdvancedTools_ID_" + obj.id);
        label.title = "Plus d'outils";
        label.className = "GPshowMoreOptions GPshowLayerAdvancedTools";

        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = this._addUID("GPshowAdvancedTools_ID_" + obj.id);

        list.push(input);
        list.push(label);

        return list;
    },

    /**
     * Creation du container des outils avancés du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolElement : function (obj) {
        // exemple :
        // <div id="GPadvancedTools_ID_Layer1" class="GPlayerAdvancedTools">
        //     <!-- _createAdvancedToolDeleteElement -->
        //     <!-- _createAdvancedToolInformationElement -->
        //     <!-- _createAdvancedToolOpacityElement -->
        // </div>

        var container = document.createElement("div");
        container.id = this._addUID("GPadvancedTools_ID_" + obj.id);
        container.className = "GPlayerAdvancedTools";

        container.appendChild(this._createAdvancedToolDeleteElement(obj));

        // si on n'a de l'informations à afficher, on met en place ce composant
        if (obj.title && obj.description) {
            container.appendChild(this._createAdvancedToolInformationElement(obj));
        }
        if (obj.type !== "feature") {
            var array = this._createAdvancedToolOpacityElement(obj);
            for (var i = 0; i < array.length; i++) {
                container.appendChild(array[i]);
            }
        }

        return container;
    },

    /**
     * Creation de l'icone de suppression du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolDeleteElement : function (obj) {
        // exemple :
        // <div id="GPremove_ID_Layer1" class="GPlayerRemove" title="Supprimer la couche" onclick="GPdropLayer(this);"></div>

        var div = document.createElement("div");
        div.id = this._addUID("GPremove_ID_" + obj.id);
        div.className = "GPlayerRemove";
        div.title = "Supprimer la couche";
        div.layerId = obj.id;

        var context = this;
        if (div.addEventListener) {
            div.addEventListener(
                "click",
                function (e) {
                    context._onDropLayerClick(e);
                }
            );
        } else if (div.attachEvent) {
            // internet explorer
            div.attachEvent(
                "onclick",
                function (e) {
                    context._onDropLayerClick(e);
                }
            );
        }

        return div;
    },

    /**
     * Creation de l'icone d'information du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolInformationElement : function (obj) {
        // exemple :
        // <div id="GPinfo_ID_Layer1" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>

        var div = document.createElement("div");
        div.id = this._addUID("GPinfo_ID_" + obj.id);
        div.className = "GPlayerInfo";
        div.title = "Informations/légende";
        div.layerId = obj.id;
        // add event on click
        var context = this;
        if (div.addEventListener) {
            div.addEventListener(
                "click",
                function (e) {
                    context._onOpenLayerInfoClick(e);
                }
            );
        } else if (div.attachEvent) {
            // internet explorer
            div.attachEvent(
                "onclick",
                function (e) {
                    context._onOpenLayerInfoClick(e);
                }
            );
        }

        return div;
    },

    /**
     * Creation de l'icone de gestion de l'opacité du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement[]} array of two containers
     */
    _createAdvancedToolOpacityElement : function (obj) {
        // exemple :
        // <div id="GPopacity_ID_Layer1" class="GPlayerOpacity" title="Opacité">
        //   <input id="GPopacityRange_ID_Layer1" type="range" value="100" oninput="GPchangeLayerOpacity(this);" onchange="GPchangeLayerOpacity(this);">
        // </div>
        // <div class="GPlayerOpacityValue" id="GPopacityValueDiv_ID_Layer1">
        //   <span id="GPopacityValue_ID_Layer1">100</span>
        //   %
        // </div>

        var list = [];

        // curseur pour changer l'opacité
        var divO = document.createElement("div");
        divO.id = this._addUID("GPopacity_ID_" + obj.id);
        divO.className = "GPlayerOpacity";
        divO.title = "Opacité";

        var opacity = (typeof obj.opacity !== "undefined") ? obj.opacity : 1;
        opacity = Math.round(opacity * 100);

        var input = document.createElement("input");
        input.id = this._addUID("GPopacityValueDiv_ID_" + obj.id);
        input.type = "range";
        input.value = opacity;

        // add event for opacity change
        var context = this;
        if (input.addEventListener) {
            input.addEventListener(
                "change",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        } else if (input.attachEvent) {
            // internet explorer
            input.attachEvent(
                "onchange",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        }

        if (input.addEventListener) {
            input.addEventListener(
                "input",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        } else if (input.attachEvent) {
            // internet explorer
            input.attachEvent(
                "oninput",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        }

        divO.appendChild(input);

        // Valeur d'opacité
        var divC = document.createElement("div");
        divC.id = this._addUID("GPopacityValueDiv_ID_" + obj.id);
        divC.className = "GPlayerOpacityValue";

        var span = document.createElement("span");
        span.id = this._addUID("GPopacityValue_ID_" + obj.id);
        span.innerHTML = opacity + "%";

        divC.appendChild(span);

        list.push(divO);
        list.push(divC);

        return list;
    },

    // ################################################################### //
    // ############################ Layer info ########################### //
    // ################################################################### //

    /**
     * Creation du container du layer info (DOM)
     *
     * TODO GPlayerInfoPopup : ???
     * TODO GPlayerInfoLink  : mettre en forme les échelles !
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createContainerLayerInfoElement : function (obj) {
        var container = document.createElement("div");
        container.id = this._addUID("GPlayerInfoContent");

        var title = document.createElement("div");
        title.id = this._addUID("GPlayerInfoTitle");
        title.innerHTML = obj.title;
        container.appendChild(title);

        if (obj.quicklookUrl) {
            var quick = document.createElement("div");
            quick.id = this._addUID("GPlayerInfoQuicklook");
            quick.title = "Afficher un aperçu de la couche";
            var refquick = document.createElement("a");
            refquick.href = obj.quicklookUrl;
            refquick.appendChild(quick);
            container.appendChild(refquick);
        }

        var close = document.createElement("div");
        close.id = this._addUID("GPlayerInfoClose");
        close.title = "Fermer la fenêtre";

        var self = this;
        /** Call event function on close click */
        var onCloseClick = function () {
            document.getElementById(self._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
            var layers = document.getElementsByClassName("GPlayerInfoOpened");
            for (var i = 0; i < layers.length; i++) {
                layers[i].className = "GPlayerInfo";
            }
        };
        if (close.addEventListener) {
            close.addEventListener("click", onCloseClick);
        } else if (close.attachEvent) {
            // internet explorer
            close.attachEvent("onclick", onCloseClick);
        }
        container.appendChild(close);

        var desc = document.createElement("div");
        desc.id = this._addUID("GPlayerInfoDescription");
        desc.innerHTML = obj.description;
        container.appendChild(desc);

        if (obj.metadata) {
            var mtd = document.createElement("div");
            mtd.id = this._addUID("GPlayerInfoMetadata");

            var mtdtitle = document.createElement("div");
            mtdtitle.className = "GPlayerInfoSubtitle";
            mtdtitle.innerHTML = "Métadonnées";
            mtd.appendChild(mtdtitle);

            for (var i = 0; i < obj.metadata.length; i++) {
                var urlmtd = obj.metadata[i].url;

                var mtdlink = document.createElement("div");
                mtdlink.className = "GPlayerInfoLink";

                var refmtd = document.createElement("a");
                refmtd.href = urlmtd;
                refmtd.innerHTML = urlmtd;
                mtdlink.appendChild(refmtd);
                mtd.appendChild(mtdlink);
            }

            if (obj.metadata.length !== 0) {
                container.appendChild(mtd);
            }
        }

        if (obj.legends) {
            var lgd = document.createElement("div");
            lgd.id = this._addUID("GPlayerInfoLegend");

            var lgdtitle = document.createElement("div");
            lgdtitle.className = "GPlayerInfoSubtitle";
            lgdtitle.innerHTML = "Légende";
            lgd.appendChild(lgdtitle);

            var legends = {};
            var maxScale = obj.maxScaleDenominator || 560000000;

            // on crée un tableau temporaire pour ordonner les légendes selon le dénominateur d'échelle
            for (var k = 0; k < obj.legends.length; k++) {
                var minScale = obj.legends[k].minScaleDenominator;
                if (minScale) {
                    var s = minScale.toString();
                    minScale = Math.round(parseInt(s.substring(0, 3), 10) / 10) * Math.pow(10, s.length - 2);
                } else {
                    minScale = 270;
                }
                legends[minScale] = obj.legends[k];
            }

            for (var scale in legends) {
                if (legends.hasOwnProperty(scale)) {
                    var urllgd = legends[scale].url;
                    // on n'affiche pas les légendes pointant vers "nolegend.jpg"
                    if (typeof urllgd === "string" && urllgd.toLowerCase().indexOf("nolegend.jpg") === -1) {
                        // TODO GPlayerInfoPopup
                        var lgdlink = document.createElement("div");
                        lgdlink.className = "GPlayerInfoLink";

                        maxScale = legends[scale].maxScaleDenominator || maxScale;

                        var reflgd = document.createElement("a");
                        reflgd.href = urllgd;
                        reflgd.innerHTML = "Du 1/" + scale + " au 1/" + maxScale;
                        lgdlink.appendChild(reflgd);
                        lgd.appendChild(lgdlink);
                    } else {
                        delete legends[scale];
                    }
                }
            }

            if (Object.keys(legends).length !== 0) {
                container.appendChild(lgd);
            }
        }

        return container;
    }
};

export default LayerSwitcherDOM;
