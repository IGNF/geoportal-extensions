define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Common/Controls/MeasureToolBoxDOM"
], function (
    ol,
    woodman,
    Utils,
    MeasureToolBoxDOM
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("toolbox");

    var MeasureToolBox = {

        /**
        * Ajout d'un controle dans la ToolBox.
        * Creation de la toolbox si besoin...
        *
        * @param {ol.Map} map - map
        * @param {ol.control.Control} ctrl - objet à ajouter
        */
        add : function (map, ctrl) {
            logger.trace("ToolBox.add()", ctrl);

            if (! map) {
                logger.trace("map doesn't exist !?");
                return;
            }

            var mapContainer = map.getTargetElement();
            var mapDocument  = mapContainer.ownerDocument;

            if (! mapDocument.getElementById(this.getToolBoxID())) {
                logger.trace("create toolbox !");
                // creation et ajout de la toolbox sur la map
                var toolboxContainer = this._createToolBoxContainerElement();
                var overlaysContainer = mapDocument.getElementsByClassName("ol-overlaycontainer-stopevent");
                overlaysContainer[0].appendChild(toolboxContainer);
                // mapContainer.appendChild(toolboxContainer);
            }

            // ajout du widget dans la toolbox
            var widgetContainer = mapDocument.getElementById(this.getWidgetID());
            ctrl.setTarget(widgetContainer);
            logger.trace("add control to toolbox !");

        }
    };

    Utils.assign(MeasureToolBox, MeasureToolBoxDOM);

    return MeasureToolBox;

});
