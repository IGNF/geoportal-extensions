var MeasureToolBoxDOM = {

    _toolboxId : "GPtoolbox-measure-main",
    _buttonId : "GPtoolbox-measure-button",
    _widgetId : "GPtoolbox-measure-widget",

    /**
    * get toolBox ID
    * @param {Number} uid - uid
    * @returns {String} id selector unique
    */
    getToolBoxID : function (uid) {
        return (uid) ? this._toolboxId + "-" + uid : this._toolboxId;
    },

    /**
    * get button ID
    * @param {Number} uid - uid
    * @returns {String} id selector unique
    */
    getButtonID : function (uid) {
        return (uid) ? this._buttonId + "-" + uid : this._buttonId;
    },

    /**
    * get toolBox Container for widget
    * @param {Number} uid - uid
    * @returns {String} id selector unique
    */
    getWidgetID : function (uid) {
        return (uid) ? this._widgetId + "-" + uid : this._widgetId;
    },

    /**
     * Main container (DOM)
     * @param {Number} uid - uid
     * @returns {DOMElement} DOM element
     */
    _createToolBoxContainerElement : function (uid) {
        // <div id="GPtoolbox-measure-main">
        //   <button id="GPtoolbox-measure-button">&#9776;</button>
        //   <div id="GPtoolbox-measure-widget">
        //     <!-- HERE : widgets tools measures -->
        //   </div>
        // </div>
        var container = document.createElement("div");
        container.id = this.getToolBoxID(uid);
        container.className = "GPshowAdvancedToolPicto";

        var button = document.createElement("button");
        button.id = this.getButtonID(uid);
        var self = this;
        button.addEventListener("click", function () {
            this.blur(); // permet de perdre le focus !
            var widget = document.getElementById(self.getWidgetID(uid));
            if (widget.style.display === "block") {
                widget.style.display = "none";
            } else {
                widget.style.display = "block";
            }
        });
        container.appendChild(button);

        var widget = document.createElement("div");
        widget.id = this.getWidgetID(uid);
        widget.addEventListener("click", function () {

            /*
                e.preventDefault();

                // FIXME desactiver tous les outils sur
                // l'ouverture/fermeture de la toolbox ?

                var current = e.target.parentNode.getAttribute("for");
                var widgets = this.querySelectorAll("div > input");
                for (var i = 0; i < widgets.length; i++) {
                    var id = widgets[i].id;

                    if (document.getElementById(id) &&
                        document.getElementById(id).checked &&
                        document.querySelector("#" + id + " + label")) {
                            document.querySelector("#" + id + " + label").click();
                            // document.getElementById(id).checked = true;
                    }

                    if (current === id && widgets[i].checked) {
                        widgets[i].checked = false;
                    } else if (current === id && !widgets[i].checked) {
                        widgets[i].checked = true;
                    }
                }
            */

        }, false);

        container.appendChild(widget);

        return container;
    }
};

export default MeasureToolBoxDOM;
