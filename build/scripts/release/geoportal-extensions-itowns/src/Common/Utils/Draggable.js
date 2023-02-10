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
    *       // <div id="container">
    *       //   <div id="element">
    *       //     <div id="header"/>
    *       //      <div/> ...
    *       //     </div>
    *       //   </div>
    *       // </div>
    *   // JS :
    *       var element = document.getElementById("element");
    *       Draggable.dragElement(element, header, container);
    */
    dragElement : function (element, header, container) {
        var offsetX, offsetY;

        var isDragReady = false;

        var dragoffset = {
            x : 0,
            y : 0
        };

        if (header) {
            header.addEventListener("mousedown", dragMouseDown, true);
        } else {
            element.addEventListener("mousedown", dragMouseDown, true);
        }

        // TODO mettre en place les contraintes
        // var constraints = {};
        // if (container) {
        //     constraints = {
        //         width : container.clientWidth,
        //         height : container.clientHeight,
        //         top : container.offsetTop,
        //         left : container.offsetLeft
        //     };
        // }

        function dragMouseDown (e) {
            e = e || window.event;
            e.preventDefault();

            isDragReady = true;

            // get the mouse cursor position at startup
            e._pageX = e._pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            e._pageY = e._pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            dragoffset.x = e._pageX - element.offsetLeft;
            dragoffset.y = e._pageY - element.offsetTop;

            document.addEventListener("mouseup", closeDragElement, true);
            document.addEventListener("mousemove", elementDrag, true);
        }

        function closeDragElement () {
            /* stop moving when mouse button is released: */
            isDragReady = false;
            document.removeEventListener("mouseup", closeDragElement, true);
            document.removeEventListener("mousemove", elementDrag, true);
        }

        function elementDrag (e) {
            e = e || window.event;
            // e.preventDefault();

            // cf. https://jsfiddle.net/nbbg08mg/2/
            if (isDragReady) {
                e._pageX = e._pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                e._pageY = e._pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

                var parentLeft = element.parentElement.offsetLeft;
                var parentTop = element.parentElement.offsetTop;
                logger.trace("parent offset", parentLeft, parentTop);

                // left/right constraint
                if (e._pageX - dragoffset.x < 0 - parentLeft) {
                    offsetX = 0 - parentLeft;
                } else if (e._pageX - dragoffset.x + element.clientWidth > document.body.clientWidth) {
                    offsetX = document.body.clientWidth - element.clientWidth;
                } else {
                    offsetX = e._pageX - dragoffset.x;
                }
                logger.trace("left/right constraint", offsetX);

                // top/bottom constraint
                if (e._pageY - dragoffset.y < 0 - parentTop) {
                    offsetY = 0 - parentTop;
                } else if (e._pageY - dragoffset.y + element.clientHeight > document.body.clientHeight) {
                    offsetY = document.body.clientHeight - element.clientHeight;
                } else {
                    offsetY = e._pageY - dragoffset.y;
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
