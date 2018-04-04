var MeasureLengthDOM = {

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
        container.id = this._addUID("GPmeasureLength");
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
    _createShowMeasureLengthElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowMeasureLength");
        input.type = "checkbox";
        return input;
    },

    /**
     * Show control
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createShowMeasureLengthPictoElement : function () {
        // contexte d'execution
        var context = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowMeasureLengthPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowMeasureLength");
        label.title = "Mesurer une distance";

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie...
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (label.addEventListener) {
            label.addEventListener("click", function (e) {
                context.onShowMeasureLengthClick(e);
            });
        } else if (label.attachEvent) {
            label.attachEvent("onclick", function (e) {
                context.onShowMeasureLengthClick(e);
            });
        }

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowMeasureLengthOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        return label;
    }
};

export default MeasureLengthDOM;
