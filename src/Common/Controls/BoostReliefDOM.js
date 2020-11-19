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
     * @param {Boolean} collapsed - option indiquant si le control est déplié
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
        var container = document.createElement("div");
        container.className = "GPlayerAdvancedToolsRelief";

        var array = this._createAdvancedToolReliefElement(brOptions.scale, brOptions.defaultBoost);
        for (var j = 0; j < array.length; j++) {
            container.appendChild(array[j]);
        }

        return container;
    },
    /**
     * Creation de l'icone de gestion du relief du layer (DOM)
     *
     * @param {Object} scale - définition de l'echelle que le slider utilise (min,max,step)
     * @param {Number} defaultBoost - valeur d'exageration par défaut
     *
     * @returns {DOMElement[]} array of two containers
     */
    _createAdvancedToolReliefElement : function (scale, defaultBoost) {
        // exemple :
        // <div id="GPReliefLayerId_ID_Layer1" class="GPlayerReliefLayerId" title="Layer ID">
        //     <span id="GPReliefLayerId_ID_Layer1">Layer1</span>
        // </div>
        //
        // <div id="GPrelief_ID_Layer1" class="GPlayerRelief" title="Opacité">
        //   <input id="GPreliefRange_ID_Layer1" type="range" value="100" oninput="GPchangeLayerRelief(this);" onchange="GPchangeLayerRelief(this);">
        // </div>
        // <div class="GPlayerReliefValue" id="GPreliefValueDiv_ID_Layer1">
        //   <span id="GPreliefValue_ID_Layer1">100</span>
        //   %
        // </div>

        var list = [];

        // curseur pour changer l'exageration du relief
        var divB = document.createElement("div");
        divB.className = "GPlayerRelief";
        divB.title = "Relief";

        // le relief est à un facteur 1 par défaut
        var relief = 1;

        var input = document.createElement("input");
        input.id = this._addUID("GPreliefValueDiv");
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

        // le relief est à un facteur 1 par défaut
        var defaultBoostValue = 1;
        if (defaultBoost) {
            defaultBoostValue = defaultBoost;
        }

        // the reliefValue given must me in the slider range
        if (defaultBoostValue > input.max) {
            defaultBoostValue = input.max;
        }

        if (defaultBoostValue < input.min) {
            defaultBoostValue = input.min;
        }

        // mise à jour des couches et du slider une fois le controle ajouté
        input.value = defaultBoostValue;

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

        divB.appendChild(input);

        // Valeur d'echelle du relief
        var divC = document.createElement("div");
        divC.id = this._addUID("GPreliefValueDiv");
        divC.className = "GPlayerReliefValue";

        var span = document.createElement("span");
        span.id = this._addUID("GPreliefValue");
        span.innerHTML = "x" + relief;

        divC.appendChild(span);

        list.push(divB);
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
        div.className = "GPpanel";

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
