define([
], function (
) {

    "use strict";

    /**
     * Constructor
     * @constructor
     */
    function Control(options) {
        this.map = null;
        this.setOptions(options);
    }

    /**
     * Constructor (alias)
     */
    Control.prototype.constructor = Control;

    /**
     * Return the name of the widget.
     * @method
     * @return {String} control name.
     */
    Control.prototype.getName = function getName() {
        return this.name;
    };

    /**
     * Return the widget's container element.
     * @method
     * @return {HTMLElement} widget's container element.
    */
    Control.prototype.getElement = function getElement() {
        return this.element;
    };

    /**
     * Change the options of the widget.
     * @method
     * @param {Object} options - The new options of the conrtol.
     */
    Control.prototype.setOptions = function setOptions(options) {
        this.name = options.name;
        this.element = options.element;
        this.map = null;
    };

    /**
     * Listen to an event linked to the map.
     * @method
     * @param {String} eventName - The name of the event.
     * @param {Callback} callback - The callback that is called when the event is heard.
     */
    Control.prototype.listenToMap = function listenToMap(eventName, callback) {
        this._map.viewerDiv.addEventListener(eventName, callback, false);
    };

    /**
     * Remove an event linked to the map.
     * @method
     * @param {string} eventName - The name of the event.
     * @param {callback} callback - The callback that is called when the event is heard.
     */
    Control.prototype.removeFromMap = function removeFromMap(eventName, callback) {
        this._map.viewerDiv.removeEventListener(eventName, callback, false);
    };

    /**
     * Get the Map associated with the widget. Undefined if the widget is not added to a map.
     * @method
     * @return {Object} map
     */
    Control.prototype.getMap = function getMap() {
        return this.map;
    };

    /**
     * Associate a map to the widget.
     * @method
     * @param {Object} map - Map to associate to the widget.
     */
    Control.prototype.setMap = function setMap(map) {
        this.map = map;
    };

    return Control;
});
