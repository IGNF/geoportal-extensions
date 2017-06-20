define([
    "itowns"
], function (
    itowns
) {

    "use strict";

    /**
     * @classdesc
     *
     * ApiGlobe
     *
     */
    function WidgetAPI () {};

    /**
     * Constructor (alias)
     */
    WidgetAPI.prototype = {};

    /**
     * Constructor (alias)
     */
    WidgetAPI.prototype.constructor = WidgetAPI;

    /**
     * Add a widget.
     *
     * @param {Object} globe - The globe onto we add the widget
     * @param {Object} widget - The Widget object to add
     */
    WidgetAPI.prototype.addWidget = function addWidget (globe, widget) {
        globe.viewerDiv.appendChild(widget.getElement());
        if (!globe.widgets) {
            globe.widgets = [];
        }
        this.getWidgets(globe).push(widget);
        widget.setMap(globe);
    };

    /**
     * Returns all widgets.
     *
     * @return {Object} globe - The array of widgets.
     */
    WidgetAPI.prototype.getWidgets = function getWidgets (globe) {
        return globe.widgets;
    };

    /**
     * Removes a widget.
     *
     * @param {Object} globe - The globe onto we remove the widget
     * @param {Object} widget - The Widget object to remove
     */
    WidgetAPI.prototype.removeWidget = function removeWidget (globe, widget) {
        widget.setMap();
        for (var idx = 0; idx < globe.widgets.length; idx++) {
            if (globe.widgets[idx] === widget) {
                globe.widgets.splice(idx,1);
            }
        }
    };

    return WidgetAPI;
});
