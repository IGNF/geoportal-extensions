var BuildingsDOM = {

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
        container.id = this._addUID("GPbuildings");
        container.className = "GPwidget";
        return container;
    },

    /**
     * Show buildings control
     * @param {Boolean} isDesktop - specifies if the support is desktop or tactile
     *
     * @returns {DOMElement} DOM element
     */

    _createMainPictoElement : function () {
        var label = document.createElement("label");
        label.id = this._addUID("GPshowBuildingsPicto");
        return label;
    }
};

export default BuildingsDOM;
