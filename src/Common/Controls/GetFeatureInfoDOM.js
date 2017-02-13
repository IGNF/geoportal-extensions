define([], function () {

    "use strict";

    var GetFeatureInfoDOM = {

        /** Add uuid to the tag ID */
        _addUID : function (id) {
            var uid = (this._uid) ?  id + "-" + this._uid : id;
            return uid;
        },

        /**
        * Main container (DOM)
        *
        * @returns {DOMElement} DOM element
        */
        _createMainContainerElement : function () {

            var container = document.createElement("div");
            container.id  = this._addUID("GPgetFeatureInfo");
            container.className = "GPwidget";
            return container;
        },

        // ################################################################### //
        // ################# Methods to display Main Panel ################### //
        // ################################################################### //

        /**
        * Hidden checkbox for activating getFeatureInfo
        *
        * @returns {DOMElement} DOM element
        */
        _createActivateGetFeatureInfoElement : function () {

            // contexte d'execution
            var context = this;

            var input     = document.createElement("input");
            input.id      = this._addUID("GPactivateGetFeatureInfo");
            input.type    = "checkbox";
            input.checked = true;

            input.addEventListener("change", function (e) {
                context.onActivateGetFeatureInfoElementChange(e);
            });

            return input;
        }
    };

    return GetFeatureInfoDOM;
});
