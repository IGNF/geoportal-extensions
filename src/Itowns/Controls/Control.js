define([
], function (
) {

    "use strict";

    function Control(pName, pElement, options) {
        this.pName = pName;
        this.pElement = pElement;
        this.options = options;
        this._map = null;
    }

    /**
     * Constructor (alias)
     */
    Control.prototype.constructor = Control;

    /**
     * Return the name of the widget.
     * @constructor
     * @return     {name}  The name.
     */
    Control.prototype.getName = function getName() {
        return this.pName;
    };

    /*
     * Return the element used by the widget to display its GUI.
     * @constructor
     * @return     {element}  The element.
    */
    Control.prototype.getElement = function getElement() {
        return this.pElement;
    };

    /**
     * Return the options of the widget.
     * @constructor
     * @return     {object}  Object.
     */
    Control.prototype.getOptions = function getOptions() {
        this.options = this.options || {};
        return this.options;
    };

    /**
     * Change the options of the widget.
     * @constructor
     * @param {object} pOptions - The new options of the conrtol.
     */
    Control.prototype.setOptions = function setOptions(pOptions) {
        this.pName = pOptions.name;
        this.pElement = pOptions.element;
        this.options = pOptions.options;
    };

    /**
     * Listen to an event linked to the map.
     * @constructor
     * @param {string} Eventname - The name of the event.
     * @param {callback} Callback - The callback that is called when the event is heard.
     */
    Control.prototype.listenToMap = function listenToMap(pEventName, pCallback) {
        document.getElementById('viewerDiv').addEventListener(pEventName, pCallback, false);
    };

    /**
     * Remove an event linked to the map.
     * @constructor
     * @param {string} Eventname - The name of the event.
     * @param {callback} Callback - The callback that is called when the event is heard.
     */
    Control.prototype.removeFromMap = function removeFromMap(pEventName, pCallback) {
        document.getElementById('viewerDiv').removeEventListener(pEventName, pCallback, false);
    };

    /**
     * Get the Map associated with the widget. Undefined if the widget is not added to a map.
     * @constructor
     */
    Control.prototype.getMap = function getMap() {
        return this._map;
    };

    /**
     * Associate a map to a widget.
     * @constructor
     */
    Control.prototype.setMap = function setMap(map) {
        this._map = map;
    };

    return Control;
});
