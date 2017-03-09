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
    function ApiGlobe () {
        this.controls = [];
    };

    /**
     * Constructor (alias)
     */
    ApiGlobe.prototype = itowns.viewer;

    /**
     * Constructor (alias)
     */
    ApiGlobe.prototype.constructor = ApiGlobe;

    /**
     * Add a widget.
     */
    ApiGlobe.prototype.addControl = function addControl(control) {
        control.setMap(this);
        this.getControls().push(control);
        this.viewerDiv.appendChild(control.pElement);
    };

    /**
     * Returns all widgets.
     * @return     {array}  The array of widgets.
     */
    ApiGlobe.prototype.getControls = function getControls() {
        return this.controls;
    };

    /**
     * Remove a widget.
     * @param {object} Widget - The Widget object.
     */
    ApiGlobe.prototype.removeControl = function removeControl(control) {
        control.setMap();
        this.controls.delete(control);
    };

    /**
     * Get the element that serves as the map viewport.
     */
    ApiGlobe.prototype.getViewport = function getViewport() {
        return this.viewerDiv;
    }

    return ApiGlobe;
});
