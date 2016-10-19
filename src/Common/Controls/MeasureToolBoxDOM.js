define([], function () {

    "use strict";

    var MeasureToolBoxDOM = {

        _toolboxId : "GPtoolbox-measure-main",
        _buttonId : "GPtoolbox-measure-button",
        _widgetId : "GPtoolbox-measure-widget",

        /** get toolBox ID */
        getToolBoxID : function () {
            return this._toolboxId;
        },

        /** get toolBox ID */
        getButtonID : function () {
            return this._buttonId;
        },

        /** get toolBox Container for widget */
        getWidgetID : function () {
            return this._widgetId;
        },

        /**
        * Main container (DOM)
        *
        * @returns {DOMElement} DOM element
        */
        _createToolBoxContainerElement : function () {

            // <div id="GPtoolbox-measure-main">
            //   <button id="GPtoolbox-measure-button">&#9776;</button>
            //   <div id="GPtoolbox-measure-widget">
            //     <!-- HERE : widgets tools measures -->
            //   </div>
            // </div>
            var container = document.createElement("div");
            container.id  = this._toolboxId;

            var button = document.createElement("button");
            button.id = this._buttonId;
            button.innerHTML = "&#9776;";
            container.appendChild(button);

            var widget = document.createElement("div");
            widget.id = this._widgetId;
            container.appendChild(widget);

            return container;
        }
    };

    return MeasureToolBoxDOM;
});
