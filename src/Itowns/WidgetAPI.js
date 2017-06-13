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
     */
    WidgetAPI.prototype.addWidget = function addWidget(globe, widget) {
        globe.viewerDiv.appendChild(widget.getElement());
        if (!globe.widgets) {
            globe.widgets = [];
        }
        this.getWidgets(globe).push(widget);
        widget.setMap(globe);
    };

    /**
     * Returns all widgets.
     * @return     {array}  The array of widgets.
     */
    WidgetAPI.prototype.getWidgets = function getWidgets(globe) {
        return globe.widgets;
    };

    /**
     * Remove a widget.
     * @param {object} Widget - The Widget object.
     */
    WidgetAPI.prototype.removeWidget = function removeWidget(globe, widget) {
        widget.setMap();
        globe.widgets.delete(widget);
    };

    return WidgetAPI;
});
