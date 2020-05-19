var BoostReliefDOM = {

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
        container.id = this._addUID("GPboostRelief");
        container.className = "GPwidget";
        return container;
    },

    /**
     * Creation du selecteur (caché) pour l'affichage/masquage des slides de boostRelief (DOM)
     *
     * @returns {DOMElement} checkbox DOM
     */
    _createMainBoostReliefShowElement : function (collapsed) {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowBoostReliefList");
        input.type = "checkbox";
        if (collapsed) {
            input.checked = true;
        }
        return input;
    },

    // ################################################################### //
    // ############################ Relief tool ########################### //
    // ################################################################### //

    /**
     * Creation du container des outils avancés du layer (DOM)
     *
     * @param {Object} brOptions - options du control boostRelief
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolElement : function (brOptions) {
        // exemple :
        // <div id="GPadvancedToolsRelief_ID_Layer1" class="GPlayerAdvancedToolsRelief">
        //     <!-- _createAdvancedToolOpacityElement -->
        // </div>
        var containers = [];
        if (!Array.isArray(brOptions.elevationLayers)) {
            brOptions.elevationLayers = [brOptions.elevationLayers];
        }

        for (var i = 0; i < brOptions.elevationLayers.length; i++) {
            var elevationLayer = brOptions.elevationLayers[i];
            var container = document.createElement("div");
            container.id = this._addUID("GPadvancedToolsRelief_ID_" + elevationLayer.id);
            container.className = "GPlayerAdvancedToolsRelief";
    
            var array = this._createAdvancedToolReliefElement(elevationLayer, brOptions.scale);
            for (var j = 0; j < array.length; j++) {
                container.appendChild(array[j]);
            }
            containers.push(container);
        }
        return containers;
    },
    /**
     * Creation de l'icone de gestion du relief du layer (DOM)
     *
     * @param {Object} brOptions - Options du control boostRelief
     *
     * @returns {DOMElement[]} array of two containers
     */
    _createAdvancedToolReliefElement : function (elevationLayer, scale) {
        // exemple :
        // <div id="GPrelief_ID_Layer1" class="GPlayerRelief" title="Opacité">
        //   <input id="GPreliefRange_ID_Layer1" type="range" value="100" oninput="GPchangeLayerRelief(this);" onchange="GPchangeLayerRelief(this);">
        // </div>
        // <div class="GPlayerReliefValue" id="GPreliefValueDiv_ID_Layer1">
        //   <span id="GPreliefValue_ID_Layer1">100</span>
        //   %
        // </div>

        var list = [];

        // curseur pour changer l'opacité
        var divO = document.createElement("div");
        divO.id = this._addUID("GPRelief_ID_" + elevationLayer.id);
        divO.className = "GPlayerRelief";
        divO.title = "Relief";

        // on recupere la valeur actuelle d'echelle du relief depuis la couche donnée en parametre
        var relief = elevationLayer.scale || 1;

        var input = document.createElement("input");
        input.id = this._addUID("GPreliefValueDiv_ID_" + elevationLayer.id);
        input.type = "range";

        // echelle de 1 à 50 par defaut
        if (!scale) {
            scale = {
                min : 1,
                max : 50,
                step : 1
            };
        };

        input.min = scale.min || 1;
        input.max = scale.max || 50;
        input.step = scale.step || 1;
        input.value = relief;

        // add event for relief change
        var context = this;
        if (input.addEventListener) {
            input.addEventListener(
                "change",
                function (e) {
                    context._onChangeLayerRelief(e);
                }
            );
        } else if (input.attachEvent) {
            // internet explorer
            input.attachEvent(
                "onchange",
                function (e) {
                    context._onChangeLayerRelief(e);
                }
            );
        }

        if (input.addEventListener) {
            input.addEventListener(
                "input",
                function (e) {
                    context._onChangeLayerRelief(e);
                }
            );
        } else if (input.attachEvent) {
            // internet explorer
            input.attachEvent(
                "oninput",
                function (e) {
                    context._onChangeLayerRelief(e);
                }
            );
        }

        divO.appendChild(input);

        // Valeur d'echelle du relief
        var divC = document.createElement("div");
        divC.id = this._addUID("GPreliefValueDiv_ID_" + elevationLayer.id);
        divC.className = "GPlayerReliefValue";

        var span = document.createElement("span");
        span.id = this._addUID("GPreliefValue_ID_" + elevationLayer.id);
        span.innerHTML = relief + "%";

        divC.appendChild(span);

        list.push(divO);
        list.push(divC);

        return list;
    },

    /**
     * Création du conteneur principal des couches MNT boostRelief (DOM)
     *
     * @returns {DOMElement} div DOM
     */
    _createMainBoostReliefListContainer : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPBoostReliefListContainer");

        return div;
    },

    /**
     * Show boostRelief control
     * @param {Boolean} isDesktop - specifies if the support is desktop or tactile
     *
     * @returns {DOMElement} DOM element
     */
    _createMainPictoElement : function () {

        var self = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowBoostReliefListPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowBoostReliefList");
        label.title = "Afficher/Masquer le control d'exageration du relief";

        var spanOpenClose = document.createElement("span");
        spanOpenClose.id = this._addUID("GPshowBoostReliefOpenClose");
        spanOpenClose.className = "GPshowAdvancedToolOpen";

        /** Evenement de type 'click' sur le picto du controle */
        label.addEventListener("click", function () {
            if (document.getElementById(self._addUID("GPshowBoostReliefList")).checked) {
                document.getElementById(self._addUID("GPBoostReliefListContainer")).style.display = "none";
            } else {
                document.getElementById(self._addUID("GPBoostReliefListContainer")).style.display = "block";
            }
        });

        label.appendChild(spanOpenClose);

        return label;
    }
};

export default BoostReliefDOM;
