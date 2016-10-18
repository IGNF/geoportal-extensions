define([], function () {

    "use strict";

    var MeasureToolBoxDOM = {

        _toolboxId : "GPtoolbox-measure",
        _widgetId : "GPtoolbox-measure-content",

        /** get toolBox ID */
        getToolBoxID : function () {
            return this._toolboxId;
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

            // <div id="GPtoolbox-measure">
            //   <button id="GPtoolbox-measure-btn">&#9776;</button>
            //   <div id="GPtoolbox-measure-content">
            //     <!-- HERE : widgets tools measures -->
            //   </div>
            // </div>
            var container = document.createElement("div");
            container.id  = this._toolboxId;

            var button = document.createElement("button");
            button.id = "GPtoolbox-measure-btn";
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
