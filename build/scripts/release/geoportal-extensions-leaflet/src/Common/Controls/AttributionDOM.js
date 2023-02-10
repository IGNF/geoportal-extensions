// FIXME not use !?
var AttributionDOM = {

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
     * @returns {DOMElement} div DOM
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPAttribution");
        container.className = "GPwidget";

        return container;
    },

    /**
     * Creation du selecteur (caché) pour l'affichage/masquage des attributions (DOM)
     *
     * @returns {DOMElement} checkbox DOM
     */
    _createMainAttributionsShowElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowAttributionsList");
        input.type = "checkbox";
        return input;
    },

    /**
     * Création de l'élément liste des attributions (DOM)
     *
     * @returns {DOMElement} liste DOM
     */
    _createAttributionsList : function () {
        var ul = document.createElement("ul");
        ul.id = this._addUID("GPAttributionsList");
        return ul;
    },

    /**
     * Création du conteneur principal des attributions (DOM)
     *
     * @returns {DOMElement} div DOM
     */
    _createMainAttributionsListContainer : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPAttributionsListContainer");

        return div;
    },

    /**
     * Création du container du picto du controle (DOM)
     * @param {Boolean} collapsed - collapsed
     * @returns {DOMElement} label DOM
     */
    _createMainPictoElement : function (collapsed) {
        var self = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowAttributionsListPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowAttributionsList");
        label.title = "Afficher/masquer les attributions";

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowAttributionsListOpenClose");
        spanOpen.className = "GPshowAdvancedToolOpen";
        spanOpen.innerHTML = collapsed ? "i" : "»";
        /** Evenement de type 'click' sur le picto du controle */
        spanOpen.addEventListener("click", function () {
            spanOpen.innerHTML = (document.getElementById(self._addUID("GPshowAttributionsList")).checked) ? "i" : "»";
        });

        label.appendChild(spanOpen);

        return label;
    }

};

export default AttributionDOM;
