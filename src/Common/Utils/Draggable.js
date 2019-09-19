import Logger from "./LoggerByDefault";

var logger = Logger.getLogger("draggable");

var Draggable = {
    /**
    * A draggable HTML element with JavaScript and CSS.
    *
    * @param {DOMElement} element - element
    * @param {DOMElement} header - header (optional)
    * @param {DOMElement} container - container (optional)
    * @see https://www.w3schools.com/howto/howto_js_draggable.asp
    * @see https://stackoverflow.com/questions/52231588/how-to-constrain-div-drag-space-no-jquery
    * @example
    *   // CSS :
    *       // #element { position: absolute; }
    *   // HTML :
    *       // <div id="element">
    *       //   <div id="header">
    *       //     <div/>
    *       //     <div/>
    *       //     <div/>
    *       //   <div/>
    *       // <div/>
    *   // JS :
    *       var element = document.getElementById("element");
    *       var header  = document.getElementById("header");
    *       Draggable.dragElement(element, header, container);
    */
    dragElement : function (element, header, container) {
        var offsetX, offsetY, constraints;

        var isDragReady = false;

        var dragoffset = {
            x : 0,
            y : 0
        };

        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            element.onmousedown = dragMouseDown;
        }

        if (!container) {
            constraints = {
                width : document.body.clientWidth,
                height : document.body.clientHeight,
                top : document.body.offsetTop,
                left : document.body.offsetLeft
            };
        } else {
            constraints = {
                width : container.clientWidth,
                height : container.clientHeight,
                top : container.offsetTop,
                left : container.offsetLeft
            };
        }

        function dragMouseDown (e) {
            e = e || window.event;
            e.preventDefault();

            isDragReady = true;

            // get the mouse cursor position at startup:
            dragoffset.x = e.clientX - element.offsetLeft;
            dragoffset.y = e.clientY - element.offsetTop;
            logger.trace("dragoffset", dragoffset.x, dragoffset.y);

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function closeDragElement () {
            /* stop moving when mouse button is released: */
            isDragReady = false;
            document.onmouseup = null;
            document.onmousemove = null;
        }

        function elementDrag (e) {
            e = e || window.event;
            e.preventDefault();

            // cf. https://jsfiddle.net/nbbg08mg/2/
            if (isDragReady) {
                // calculate the new cursor position:
                var parentLeft = container ? element.parentElement.offsetLeft : 0;
                var parentTop = container ? element.parentElement.offsetTop : 0;
                logger.trace("parent offset", parentLeft, parentTop);

                // left/right constraint
                if (e.clientX - dragoffset.x < -parentLeft) {
                    logger.trace("minx", e.clientX - dragoffset.x);
                    offsetX = -parentLeft;
                } else if (e.clientX - dragoffset.x > constraints.width - constraints.left - element.clientWidth) {
                    logger.trace("maxx:", e.clientX - dragoffset.x);
                    offsetX = constraints.width - element.clientWidth - constraints.left;
                } else {
                    offsetX = e.clientX - dragoffset.x;
                }
                logger.trace("left/right constraint", offsetX);

                // top/bottom constraint
                if (e.clientY - dragoffset.y < -parentTop) {
                    logger.trace("miny:", e.clientY - dragoffset.y);
                    offsetY = -parentTop;
                } else if (e.clientY - dragoffset.y > constraints.height - constraints.top - element.clientHeight) {
                    logger.trace("maxy:", e.clientY - dragoffset.y);
                    offsetY = constraints.height - element.clientHeight - constraints.top;
                } else {
                    offsetY = e.clientY - dragoffset.y;
                }
                logger.trace("top/bottom constraint", offsetY);

                // set the element's new position:
                element.style.top = offsetY + "px";
                element.style.left = offsetX + "px";
            }
        }
    }
};

export default Draggable;
