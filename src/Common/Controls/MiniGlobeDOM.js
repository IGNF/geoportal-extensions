define([], function () {

    "use strict";

    var MiniGlobeDOM = {

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
            container.id  = this._addUID("GPminiglobeContainer");
            container.className = "GPwidget";
            return container;
        }
    };

    return MiniGlobeDOM;
});
