define(["sortable"], function (Sortable) {

    "use strict";

    var LayerSwitcherDOM = {

        /**
         * Creation du drag and drop
         *
         * @param {Object} elementDraggable - Element HTML (DOM) Container
         * @param {Object} context - this
         */
        _createDraggableElement : function (elementDraggable, context) {
            Sortable.create(elementDraggable,{
                handle : ".GPlayerName",
                draggable : ".draggable-layer",
                ghostClass : "GPghostLayer",
                animation : 200,
                /** Call event function on drag and drop */
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
         * Creation du container principal (DOM)
         *
         * @returns {DOMElement} container - layer switcher DOM element
         */
        _createMainContainerElement : function () {

            var container = document.createElement("div");
            container.id  = "GPlayerSwitcher";
            container.className = "GPwidget";
            return container;
        },

        /**
         * Creation du container principal d"affichage des layers (DOM)
         */
        _createMainLayersShowElement : function () {
            // <!-- Hidden checkbox for minimizing/maximizing -->
            var input  = document.createElement("input");
            input.id   = "GPshowLayersList";
            input.type = "checkbox";
            return input;
        },

        /**
         * Creation du container principal des layers (DOM)
         */
        _createMainLayersElement : function () {
            // ajout de la liste des layers dans le container principal
            // <div id="GPlayersList" class="GPpanel">
            //   (...)
            // </div>
            var div = document.createElement("div");
            div.id  = "GPlayersList";
            div.className = "GPpanel";
            return div;
        },

        /**
         * Creation du container du picto du controle (DOM)
         */
        _createMainPictoElement : function () {
            // exemple :
            // <!-- Label for minimizing/maximizing -->
            // <label id="GPshowLayersListPicto" class="GPshowAdvancedToolPicto" for="GPshowLayersList" title="Afficher/masquer le gestionnaire de couches">
            //    <span id="GPshowLayersListOpen" class="GPshowAdvancedToolOpen"></span><span id="GPshowLayersListClose"></span>
            // </label>

            var label = document.createElement("label");
            label.id  = "GPshowLayersListPicto";
            label.className = "GPshowAdvancedToolPicto";
            label.htmlFor = "GPshowLayersList";
            label.title = "Afficher/masquer le gestionnaire de couches";

            var spanOpen = document.createElement("span");
            spanOpen.id  = "GPshowLayersListOpen";
            spanOpen.className  = "GPshowAdvancedToolOpen";
            spanOpen.addEventListener("click", function () {
                if (document.getElementById("GPshowLayersList").checked) {
                    var layers = document.getElementsByClassName("GPlayerInfoOpened");
                    for ( var i = 0; i < layers.length; i++ ) {
                        layers[i].className = "GPlayerInfo";
                    }
                    document.getElementById("GPlayerInfoPanel").className = "GPlayerInfoPanelClosed";
                }
            });

            label.appendChild(spanOpen);

            var spanClose = document.createElement("span");
            spanClose.addEventListener("click", function () {
                if (document.getElementById("GPshowLayersList").checked) {
                    var layers = document.getElementsByClassName("GPlayerInfoOpened");
                    for ( var i = 0; i < layers.length; i++ ) {
                        layers[i].className = "GPlayerInfo";
                    }
                    document.getElementById("GPlayerInfoPanel").className = "GPlayerInfoPanelClosed";
                }
            });
            spanClose.id  = "GPshowLayersListClose";

            label.appendChild(spanClose);

            return label;
        },

        /**
         * Creation du container du panneau d"information (DOM)
         */
        _createMainInfoElement : function () {
            // gestion du panneau d"information dans le container principal
            // <div id="GPlayerInfoPanel" class="GPlayerInfoPanelClosed">...</div>
            var div = document.createElement("div");
            div.id = "GPlayerInfoPanel";
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
         * @param {Object} obj.layer - couche (ol3 ou leaflet)
         * @param {String} obj.id - identifiant de la couche (pour ol3 ou leaflet)
         * @param {String} obj.title - nom de la couche à afficher dans le controle
         * @param {String} obj.description - description de la couche à afficher
         * @param {Boolean} obj.visibility - visibilité de la couche dans la carte (true or false)
         * @param {Float} obj.opacity - opacité de la couche
         *
         */
        _createContainerLayerElement : function (obj) {

            // exemple :
            // <div id="GPlayerSwitcher_IDLayer1" class="GPlayerSwitcher_layer outOfRange">
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
            container.id  = "GPlayerSwitcher_ID" + obj.id;
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
         */
        _createBasicToolElement : function (obj) {
            // exemple :
            // <div id="GPbasicTools_IDLayer1" class="GPlayerBasicTools">
            //      <!-- _createBasicToolVisibilityElement -->
            //      <!-- _createBasicToolNameElement -->
            // </div>

            var div = document.createElement("div");
            div.id  = "GPbasicTools_IDLayer" + obj.id;
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
         */
        _createBasicToolNameElement : function (obj) {
            // exemple :
            // <span id="GPname_IDLayer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
            var span = document.createElement("span");
            span.id  = "GPname_ID" + obj.id;
            span.className = "GPlayerName";
            span.title = obj.description || obj.title;
            span.innerHTML = obj.title;

            return span;
        },

        /**
         * Creation de l'icone de visibilité du layer (DOM)
         *
         * @param {Object} obj - options de la couche à ajouter dans le layer switcher
         */
        _createBasicToolVisibilityElement : function (obj) {
            // exemple :
            // <input type="checkbox" id="GPvisibility_IDLayer1" checked="">
            // <label for="GPvisibility_IDLayer1" id="GPvisibilityPicto_IDLayer1" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>

            var list = [];

            var checked = obj.visibility;
            var id = "GPvisibility_ID" + obj.id;

            var input = document.createElement("input");
            input.id   = id;
            input.type = "checkbox";
            input.checked = checked;

            var label = document.createElement("label");
            label.htmlFor = id;
            label.id = "GPvisibilityPicto_ID" + obj.id;
            label.className = "GPlayerVisibility";
            label.title = "Afficher/masquer la couche";

            // add event for visibility change
            var context = this;
            if (input.addEventListener) {
                input.addEventListener(
                    "click",
                    function (e) {
                        context._onVisibilityLayerClick.call(context, e);
                    }
                );
            } else if ( input.attachEvent ) {
                // internet explorer
                input.attachEvent(
                    "onclick",
                    function (e) {
                        context._onVisibilityLayerClick.call(context, e);
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
         */
        _createAdvancedToolShowElement : function (obj) {
            // <input type="checkbox" id="GPshowAdvancedTools_IDLayer1">
            // <label for="GPshowAdvancedTools_IDLayer1" id="GPshowAdvancedToolsPicto_IDLayer1" class="GPshowMoreOptions GPshowLayerAdvancedTools" title="Plus d'outils"></label>

            var list = [];

            var label = document.createElement("label");
            label.id = "GPshowAdvancedToolsPicto_ID" + obj.id;
            label.htmlFor = "GPshowAdvancedTools_ID" + obj.id;
            label.title = "Plus d'outils";
            label.className = "GPshowMoreOptions GPshowLayerAdvancedTools";

            var input = document.createElement("input");
            input.type = "checkbox";
            input.id = "GPshowAdvancedTools_ID" + obj.id;

            list.push(input);
            list.push(label);

            return list;
        },

        /**
         * Creation du container des outils avancés du layer (DOM)
         *
         * @param {Object} obj - options de la couche à ajouter dans le layer switcher
         */
        _createAdvancedToolElement : function (obj) {

            // exemple :
            // <div id="GPadvancedTools_IDLayer1" class="GPlayerAdvancedTools">
            //     <!-- _createAdvancedToolDeleteElement -->
            //     <!-- _createAdvancedToolInformationElement -->
            //     <!-- _createAdvancedToolOpacityElement -->
            // </div>

            var container = document.createElement("div");
            container.id = "GPadvancedTools_ID" + obj.id;
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
         */
        _createAdvancedToolDeleteElement : function (obj) {

            // exemple :
            // <div id="GPremove_IDLayer1" class="GPlayerRemove" title="Supprimer la couche" onclick="GPdropLayer(this);"></div>

            var div = document.createElement("div");
            div.id = "GPremove_ID" + obj.id;
            div.className = "GPlayerRemove";
            div.title   = "Supprimer la couche";
            div.layerId = obj.id;

            var context = this;
            if ( div.addEventListener ) {
                div.addEventListener(
                    "click",
                    function (e) {
                        context._onDropLayerClick.call(context, e);
                    }
                );
            } else if ( div.attachEvent ) {
                // internet explorer
                div.attachEvent(
                    "onclick",
                    function (e) {
                        context._onDropLayerClick.call(context, e);
                    }
                );
            }

            return div;
        },

        /**
         * Creation de l'icone d'information du layer (DOM)
         *
         * @param {Object} obj - options de la couche à ajouter dans le layer switcher
         */
        _createAdvancedToolInformationElement : function (obj) {

            // exemple :
            // <div id="GPinfo_IDLayer1" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>

            var div = document.createElement("div");
            div.id = "GPinfo_ID" + obj.id;
            div.className = "GPlayerInfo";
            div.title = "Informations/légende";
            div.layerId = obj.id;
            // add event on click
            var context = this;
            if ( div.addEventListener ) {
                div.addEventListener(
                    "click",
                    function (e) {
                        context._onOpenLayerInfoClick.call(context, e);
                    }
                );
            } else if ( div.attachEvent ) {
                // internet explorer
                div.attachEvent(
                    "onclick",
                    function (e) {
                        context._onOpenLayerInfoClick.call(context, e);
                    }
                );
            }

            return div;
        },

        /**
         * Creation de l'icone de gestion de l'opacité du layer (DOM)
         *
         * @param {Object} obj - options de la couche à ajouter dans le layer switcher
         */
        _createAdvancedToolOpacityElement : function (obj) {

            // exemple :
            // <div id="GPopacity_IDLayer1" class="GPlayerOpacity" title="Opacité">
            //   <input id="GPopacityRange_IDLayer1" type="range" value="100" oninput="GPchangeLayerOpacity(this);" onchange="GPchangeLayerOpacity(this);">
            // </div>
            // <div class="GPlayerOpacityValue" id="GPopacityValueDiv_IDLayer1">
            //   <span id="GPopacityValue_IDLayer1">100</span>
            //   %
            // </div>

            var list = [];

            // curseur pour changer l'opacité
            var divO = document.createElement("div");
            divO.id = "GPopacity_ID" + obj.id;
            divO.className = "GPlayerOpacity";
            divO.title = "Opacité";

            var opacity = Math.round(obj.opacity * 100);

            var input = document.createElement("input");
            input.id = "GPopacityValueDiv_ID" + obj.id;
            input.type = "range";
            input.value = opacity;

            // add event for opacity change
            var context = this;
            if (input.addEventListener) {
                input.addEventListener(
                    "change",
                    function (e) {
                        context._onChangeLayerOpacity.call(context, e);
                    }
                );
            } else if ( input.attachEvent ) {
                // internet explorer
                input.attachEvent(
                    "onchange",
                    function (e) {
                        context._onChangeLayerOpacity.call(context, e);
                    }
                );
            }

            if (input.addEventListener) {
                input.addEventListener(
                    "input",
                    function (e) {
                        context._onChangeLayerOpacity.call(context, e);
                    }
                );
            } else if ( input.attachEvent ) {
                // internet explorer
                input.attachEvent(
                    "oninput",
                    function (e) {
                        context._onChangeLayerOpacity.call(context, e);
                    }
                );
            }

            divO.appendChild(input);

            // Valeur d'opacité
            var divC = document.createElement("div");
            divC.id = "GPopacityValueDiv_ID" + obj.id;
            divC.className = "GPlayerOpacityValue";

            var span = document.createElement("span");
            span.id  = "GPopacityValue_ID" + obj.id;
            span.innerHTML  = opacity + "%";

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
         */
        _createContainerLayerInfoElement : function (obj) {

            var container = document.createElement("div");
            container.id = "GPlayerInfoContent";

            var title = document.createElement("div");
            title.id = "GPlayerInfoTitle";
            title.innerHTML = obj.title;
            container.appendChild(title);

            if (obj.quicklookUrl) {

                var quick = document.createElement("div");
                quick.id = "GPlayerInfoQuicklook";
                quick.title = "Afficher un aperçu de la couche";
                var refquick = document.createElement("a");
                refquick.href = obj.quicklookUrl;
                refquick.appendChild(quick);
                container.appendChild(refquick);
            }

            var close = document.createElement("div");
            close.id = "GPlayerInfoClose";
            close.title = "Fermer la fenêtre";

            /** Call event function on close click */
            var onCloseClick = function () {
                document.getElementById("GPlayerInfoPanel").className = "GPlayerInfoPanelClosed";
                var layers = document.getElementsByClassName("GPlayerInfoOpened");
                for ( var i = 0; i < layers.length; i++ ) {
                    layers[i].className = "GPlayerInfo";
                }
            };
            if ( close.addEventListener ) {
                close.addEventListener("click", onCloseClick);
            } else if ( close.attachEvent ) {
                // internet explorer
                close.attachEvent("onclick", onCloseClick);
            }
            container.appendChild(close);

            var desc = document.createElement("div");
            desc.id = "GPlayerInfoDescription";
            desc.innerHTML = obj.description;
            container.appendChild(desc);

            if (obj.metadata) {

                var mtd = document.createElement("div");
                mtd.id = "GPlayerInfoMetadata";

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

                if ( obj.metadata.length !== 0 ) {
                    container.appendChild(mtd);
                }
            }

            if (obj.legends) {

                var lgd = document.createElement("div");
                lgd.id = "GPlayerInfoLegend";

                var lgdtitle = document.createElement("div");
                lgdtitle.className = "GPlayerInfoSubtitle";
                lgdtitle.innerHTML = "Légende";
                lgd.appendChild(lgdtitle);

                var legends = {};
                var maxScale = obj.maxScaleDenominator || 560000000;

                // on crée un tableau temporaire pour ordonner les légendes selon le dénominateur d'échelle
                for (var k = 0; k < obj.legends.length; k++) {
                    var minScale = obj.legends[k].minScaleDenominator;
                    if ( minScale ) {
                        var s = minScale.toString();
                        minScale = Math.round( parseInt( s.substring(0, 3), 10 ) / 10 ) * Math.pow(10, s.length - 2);
                    } else {
                        minScale = 270;
                    }
                    legends[minScale] = obj.legends[k];
                }

                for ( var scale in legends ) {
                    if ( legends.hasOwnProperty(scale) ) {
                        var urllgd = legends[scale].url;
                        // on n'affiche pas les légendes pointant vers "nolegend.jpg"
                        if ( typeof urllgd === "string" && urllgd.toLowerCase().indexOf("nolegend.jpg") == -1 ) {
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

                if ( Object.keys(legends).length !== 0 ) {
                    container.appendChild(lgd);
                }
            }

            return container;
        }
    };

    return LayerSwitcherDOM;

});
