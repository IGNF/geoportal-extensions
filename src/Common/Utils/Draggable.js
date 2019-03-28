var Draggable = {
    /**
    * A draggable HTML element with JavaScript and CSS.
    *
    * @param {DOMElement} element - element
    * @param {DOMElement} header - header (optional)
    * @see https://www.w3schools.com/howto/howto_js_draggable.asp
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
    *       Draggable.dragElement(element, header);
    */
    dragElement : function (element, header) {
        var pos1 = 0;
        var pos2 = 0;
        var pos3 = 0;
        var pos4 = 0;

        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            element.onmousedown = dragMouseDown;
        }

        function dragMouseDown (e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function closeDragElement () {
            /* stop moving when mouse button is released: */
            document.onmouseup = null;
            document.onmousemove = null;
        }

        function elementDrag (e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
    }
};

export default Draggable;
