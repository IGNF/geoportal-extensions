var GetFeatureInfoDOM = {

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
        container.id = this._addUID("GPgetFeatureInfo");
        container.className = "GPwidget";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Hidden checkbox for activating getFeatureInfo
     * @param {Boolean} activate - specify if the control is active or inactive
     *
     * @returns {DOMElement} DOM element
     */
    _createActivateGetFeatureInfoElement : function (activate) {
        // contexte d'execution
        var context = this;

        var input = document.createElement("input");
        input.id = this._addUID("GPactivateGetFeatureInfo");
        input.type = "checkbox";
        input.checked = activate;

        input.addEventListener("change", function (e) {
            context.onActivateGetFeatureInfoElementChange(e);
        });

        return input;
    },

    /**
     * Creation du container du picto du controle (DOM)
     * @returns {DOMElement} DOM element
     */
    _createMainPictoElement : function () {
        var self = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPgetFeatureInfoPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPactivateGetFeatureInfo");
        label.title = "activer/desactiver l'interrogation des couches";

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPgetFeatureInfoActivate");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        var spanClose = document.createElement("span");
        spanClose.id = self._addUID("GPgetFeatureInfoDeactivate");
        label.appendChild(spanClose);

        return label;
    }
};

export default GetFeatureInfoDOM;
