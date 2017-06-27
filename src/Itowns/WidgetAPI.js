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
        // If the widget element is not created, we stop
        if (!widget.getElement()) {
            console.log("[ERROR] WidgetAPI:addWidget - widget object given not created");
            return;
        }
        if (!globe.widgets) {
            globe.widgets = [];
        }
        widget.setMap(globe);
        // put the widget element into the target div if specified
        if (widget.getTarget()) {
            this.moveWidget(widget, widget.getTarget());
        } else {
            this.moveWidget(widget, globe.viewerDiv);
        }
        this.getWidgets(globe).push(widget);
    };

    /**
     * Moves the widget to the given target div
     *
     * @param {Object} widget - The Widget object to move
     * @param {HTMLElement} targetDiv - The div into we want to move the widget
     */
    WidgetAPI.prototype.moveWidget = function moveWidget (widget, targetDiv) {
        var globeDiv = widget.getMap().viewerDiv;
        // put the widget element into the target div if specified
        if (targetDiv !== globeDiv) {
            widget.getElement().style.position = "relative";
            targetDiv.appendChild(widget.getElement());
        } else {
            widget.getElement().style.position = "absolute";
            globeDiv.appendChild(widget.getElement());
        }
        widget.setTarget(targetDiv);
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
