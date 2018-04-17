import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("Widget");

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
* @param {Object}  options.target - HTML element where to put the widget
* @param {String}  options.position - "absolute" or "relative"
* @example
* var myWidget = new itowns.control.Widget({
*      name : "myWidget",
*      element : myWidgetDiv,
*      target : myWidgetTargetDiv,
*      position: "absolute"
* });
*/
function Widget (options) {
    this.name = null;
    this._element = null;
    this._target = null;
    this._globe = null;

    this.setOptions(options);
}

/**
 * Constructor (alias)
 */
Widget.prototype.constructor = Widget;

/**
 * Return the widget's container element.
 *
 * @method
 * @return {HTMLElement} widget's container element.
 */
Widget.prototype.getElement = function getElement () {
    return this._element;
};

/**
 * Associates the widget to a specified target div.
 *
 * @method
 * @param {HTMLElement} targetDiv - widget target div.
 * @param {String} position - html position attribute.
 */
Widget.prototype.setTarget = function setTarget (targetDiv, position) {
    if (!targetDiv) {
        return;
    }

    if (position && position !== "absolute" && position !== "relative") {
        logger.error("Widget:setTarget - position value should be 'absolute' or 'relative'");
        return;
    }

    if (this._target && this._element) {
        this._target.removeChild(this._element);
    }

    this._target = targetDiv;

    if (!this._element) {
        logger.error("Widget:setTarget - widget element not created");
        return;
    }

    this._element.style.position = position || "relative";

    targetDiv.appendChild(this._element);
};

/**
 * Return the widget's target div.
 *
 * @method
 * @return {HTMLElement} widget's target div.
 */
Widget.prototype.getTarget = function getTarget () {
    return this._target;
};

/**
 * Change the options of the widget.
 *
 * @method
 * @param {Object} options - The new options of the control.
 */
Widget.prototype.setOptions = function setOptions (options) {
    this.name = options.name;
    this._element = options.element;
    this.setTarget(options.target, options.position);
};

/**
 * Get the globe associated with the widget. Undefined if the widget is not added to a globe.
 *
 * @method
 * @return {Object} globe
 */
Widget.prototype.getGlobe = function getGlobe () {
    return this._globe;
};

/**
 * Associate a globe to the widget.
 *
 * @method
 * @param {Object} globe - Globe to associate to the widget.
 */
Widget.prototype.setGlobe = function setGlobe (globe) {
    this._globe = globe;
};

export default Widget;
