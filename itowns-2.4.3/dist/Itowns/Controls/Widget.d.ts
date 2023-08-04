export default Widget;
/**
* @classdesc
* iTowns Widget class.
* Every geoportal control inherits of this class.
*
* @constructor
* @alias itowns.control.Widget
* @param {Object} options - options for function call.
* @param {String}  options.name - Name of the widget.
* @param {Object}  options.element - HTML element of the widget
* @param {Object|String}  options.target - HTML element or HTML element id where to put the widget
* @param {String}  options.position - "absolute" or "relative"
* @example
* var myWidget = new itowns.control.Widget({
*      name : "myWidget",
*      element : myWidgetDiv,
*      target : myWidgetTargetDiv,
*      position: "absolute"
* });
*/
declare function Widget(options: {
    name: string;
    element: Object;
    target: Object | string;
    position: string;
}): void;
declare class Widget {
    /**
    * @classdesc
    * iTowns Widget class.
    * Every geoportal control inherits of this class.
    *
    * @constructor
    * @alias itowns.control.Widget
    * @param {Object} options - options for function call.
    * @param {String}  options.name - Name of the widget.
    * @param {Object}  options.element - HTML element of the widget
    * @param {Object|String}  options.target - HTML element or HTML element id where to put the widget
    * @param {String}  options.position - "absolute" or "relative"
    * @example
    * var myWidget = new itowns.control.Widget({
    *      name : "myWidget",
    *      element : myWidgetDiv,
    *      target : myWidgetTargetDiv,
    *      position: "absolute"
    * });
    */
    constructor(options: {
        name: string;
        element: Object;
        target: Object | string;
        position: string;
    });
    _name: string | null;
    _element: Object | null;
    _position: string | null;
    _target: HTMLElement | null;
    _globe: Object | null;
    /**
     * Constructor (alias)
     */
    constructor: typeof Widget;
    /**
     * Return the widget's container element.
     *
     * @method
     * @return {HTMLElement} widget's container element.
     */
    getElement(): HTMLElement;
    /**
     * Associates the widget to a specified target div.
     *
     * @method
     * @param {HTMLElement|String} target - widget target div html element or target div id.
     * @param {String} position - html position attribute.
     */
    setTarget(target: HTMLElement | string, position: string): void;
    /**
     * Return the widget's target div.
     *
     * @method
     * @return {HTMLElement} widget's target div.
     */
    getTarget(): HTMLElement;
    /**
     * Return the widget's element position.
     *
     * @method
     * @return {String} widget's element position.
     */
    getPosition(): string;
    /**
     * Get the globe associated with the widget. Undefined if the widget is not added to a globe.
     *
     * @method
     * @return {Object} globe
     */
    getGlobe(): Object;
    /**
     * Associate a globe to the widget.
     *
     * @method
     * @param {Object} globe - Globe to associate to the widget.
     */
    setGlobe(globe: Object): void;
    /**
     * Get the options associated with the widget.
     *
     * @method
     * @return {Object} options
     */
    getOptions(): Object;
    /**
     * Set the options of the control
     *
     * @method
     * @param {Object} options - Options to associate to the widget.
     */
    setOptions(options: Object): void;
    _options: Object | undefined;
}
//# sourceMappingURL=Widget.d.ts.map