define([], function () {

    "use strict";

    var MeasureAzimuthDOM = {

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
            container.id  = this._addUID("GPmeasureAzimuth");
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
        _createShowMeasureAzimuthElement : function () {

            var input  = document.createElement("input");
            input.id   = this._addUID("GPshowMeasureAzimuth");
            input.type = "checkbox";
            return input;
        },

        /**
        * Show control
        * see event !
        *
        * @returns {DOMElement} DOM element
        */
        _createShowMeasureAzimuthPictoElement : function () {

            // contexte d'execution
            var context = this;

            var label = document.createElement("label");
            label.id  = this._addUID("GPshowMeasureAzimuthPicto");
            label.className = "GPshowAdvancedToolPicto";
            label.htmlFor = this._addUID("GPshowMeasureAzimuth");
            label.title = "Calculer une azimut";

            // gestionnaire d'evenement :
            // on ouvre le menu de saisie...
            // L'ouverture/Fermeture permet de faire le menage
            // (reinitialisation)
            if (label.addEventListener) {
                label.addEventListener("click", function (e) {
                    context.onShowMeasureAzimuthClick(e);
                });
            } else if (label.attachEvent) {
                label.attachEvent("onclick", function (e) {
                    context.onShowMeasureAzimuthClick(e);
                });
            }

            var spanOpen = document.createElement("span");
            spanOpen.id  = this._addUID("GPshowMeasureAzimuthOpen");
            spanOpen.className  = "GPshowAdvancedToolOpen";
            label.appendChild(spanOpen);

            return label;
        }
    };

    return MeasureAzimuthDOM;
});
