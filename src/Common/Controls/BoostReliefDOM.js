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
        container.id = this._addUID("GPadvancedToolsRelief_ID_" + brOptions.elevationLayer.id);
        container.className = "GPlayerAdvancedToolsRelief";

        var array = this._createAdvancedToolReliefElement(brOptions);
        for (var i = 0; i < array.length; i++) {
            container.appendChild(array[i]);
        }

        return container;
    },
    /**
     * Creation de l'icone de gestion du relief du layer (DOM)
     *
     * @param {Object} brOptions - Options du control boostRelief
     *
     * @returns {DOMElement[]} array of two containers
     */
    _createAdvancedToolReliefElement : function (brOptions) {
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
        divO.id = this._addUID("GPRelief_ID_" + brOptions.elevationLayer.id);
        divO.className = "GPlayerRelief";
        divO.title = "Relief";

        // on recupere la valeur actuelle d'echelle du relief depuis la couche donnée en parametre
        var relief = brOptions.elevationLayer.scale || 1;

        var input = document.createElement("input");
        input.id = this._addUID("GPreliefValueDiv_ID_" + brOptions.elevationLayer.id);
        input.type = "range";

        // echelle de 1 à 50 par defaut
        if (!brOptions.scale) {
            brOptions.scale = {
                min : 1,
                max : 50,
                step : 1
            };
        };

        input.min = brOptions.scale.min || 1;
        input.max = brOptions.scale.max || 50;
        input.step = brOptions.scale.step || 1;
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
        divC.id = this._addUID("GPreliefValueDiv_ID_" + brOptions.elevationLayer.id);
        divC.className = "GPlayerReliefValue";

        var span = document.createElement("span");
        span.id = this._addUID("GPreliefValue_ID_" + brOptions.elevationLayer.id);
        span.innerHTML = relief + "%";

        divC.appendChild(span);

        list.push(divO);
        list.push(divC);

        return list;
    },

    /**
     * Hidden checkbox for minimizing/maximizing
     *
     * @returns {DOMElement} DOM element
     */
    _createShowBoostReliefElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowBoostRelief");
        input.type = "checkbox";
        return input;
    },

    /**
     * Show boostRelief control
     * @param {Boolean} isDesktop - specifies if the support is desktop or tactile
     *
     * @returns {DOMElement} DOM element
     */
    _createShowBoostReliefPictoElement : function (isDesktop) {
        // contexte d'execution
        var self = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowBoostReliefPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowBoostRelief");
        label.title = "Afficher le control d'exageration du relief";

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

        // label.addEventListener("click", function (e) {
        //     self.onShowMousePositionClick(e);
        // });

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowBoostReliefOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        return label;
    }
};

export default BoostReliefDOM;
