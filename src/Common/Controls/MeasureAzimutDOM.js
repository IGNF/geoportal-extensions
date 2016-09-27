define([], function () {

    "use strict";

    var MeasureAzimutDOM = {

        /** Add uuid to the tag ID */
        _addUID : function (id) {
            return id + "-" + this._uid;
        },

        /**
        * Main container (DOM)
        *
        * @returns {DOMElement} DOM element
        */
        _createMainContainerElement : function () {

            var container = document.createElement("div");
            container.id  = this._addUID("GPmeasureAzimut");
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
        _createShowMeasureAzimutElement : function () {

            var input  = document.createElement("input");
            input.id   = this._addUID("GPshowMeasureAzimut");
            input.type = "checkbox";
            return input;
        },

        /**
        * Show control
        * see event !
        *
        * @returns {DOMElement} DOM element
        */
        _createShowMeasureAzimutPictoElement : function () {

            // contexte d'execution
            var context = this;

            var label = document.createElement("label");
            label.id  = this._addUID("GPshowMeasureAzimutPicto");
            label.className = "GPshowAdvancedToolPicto";
            label.htmlFor = this._addUID("GPshowMeasureAzimut");
            label.title = "Calculer une azimut";

            // gestionnaire d'evenement :
            // on ouvre le menu de saisie...
            // L'ouverture/Fermeture permet de faire le menage
            // (reinitialisation)
            if (label.addEventListener) {
                label.addEventListener("click", function (e) {
                    context.onShowMeasureAzimutClick(e);
                });
            } else if (label.attachEvent) {
                label.attachEvent("onclick", function (e) {
                    context.onShowMeasureAzimutClick(e);
                });
            }

            var spanOpen = document.createElement("span");
            spanOpen.id  = this._addUID("GPshowMeasureAzimutOpen");
            spanOpen.className  = "GPshowAdvancedToolOpen";
            label.appendChild(spanOpen);

            return label;
        }
    };

    return MeasureAzimutDOM;
});
