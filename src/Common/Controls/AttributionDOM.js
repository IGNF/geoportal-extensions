define(["sortable"], function () {

    "use strict";

    var AttributionDOM = {

        // ################################################################### //
        // ######################### Main container ########################## //
        // ################################################################### //

        /** Add uuid to the tag ID */
        _addUID : function (id) {
            var uid = (this._uid) ?  id + "-" + this._uid : id;
            return uid;
        },

        /**
         * Creation du container principal (DOM)
         *
         * @returns {DOMElement} container - layer switcher DOM element
         */
        _createMainContainerElement : function () {

            var container = document.createElement("div");
            container.id  = this._addUID("GPAttribution");
            container.className = "GPwidget";

            return container;
        },

        /**
         * Creation du container principal des layers (DOM)
         */
        _createMainAttributionElement : function () {
            // ajout de la liste des layers dans le container principal
            // <div id="GPlayersList" class="GPpanel">
            //   (...)
            // </div>
            var div = document.createElement("div");
            div.id  = this._addUID("GPAttributionsList");
            // div.className = "GPpanel";
            return div;
        },

        /**
         * Creation du nom du layer (DOM)
         *
         * @param {Object} obj - options de la couche à ajouter dans le layer switcher
         */
        _createBasicToolNameElement : function (obj) {
            // exemple :
            // <span id="GPname_ID_Layer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
            var span = document.createElement("span");
            span.id  = this._addUID("GPname_ID_" + obj.id);
            span.className = "GPAttributionName";
            span.title = obj.description || obj.title;
            span.innerHTML = obj.title;

            return span;
        }

    };

    return AttributionDOM;

});
