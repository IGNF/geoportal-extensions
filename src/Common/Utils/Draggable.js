var Draggable = {
    /**
    * A draggable HTML element with JavaScript and CSS.
    *
    * @param {DOMElement} element - element
    * @param {DOMElement} header - header (optional)
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
    *       Draggable.dragElement(element, header);
    */
    dragElement : function (element, header) {
        var pos1 = 0;
        var pos2 = 0;
        var pos3 = 0;
        var pos4 = 0;

        // var dragoffset = {
        //     x : 0,
        //     y : 0
        // };

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

            // var pageX = e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            // var pageY = e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            // dragoffset.x = pageX - element.offsetLeft;
            // dragoffset.y = pageY - element.offsetTop;

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

            var offsetX, offsetY;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // cf. https://jsfiddle.net/nbbg08mg/2/
            // var pageX = e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            // var pageY = e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            //
            // // left/right constraint
            // if (pageX - dragoffset.x < 0) {
            //     offsetX = 0;
            // } else if (pageX - dragoffset.x + 50 > document.body.clientWidth) {
            //     offsetX = document.body.clientWidth - 50;
            // } else {
            //     offsetX = e.clientX - dragoffset.x;
            // }
            //
            // // top/bottom constraint
            // if (pageY - dragoffset.y < 0) {
            //     offsetY = 0;
            // } else if (pageY - dragoffset.y + 50 > document.body.clientHeight) {
            //     offsetY = document.body.clientHeight - 50;
            // } else {
            //     offsetY = pageY - dragoffset.y;
            // }
            //
            // element.style.top = offsetY + "px";
            // element.style.left = offsetX + "px";

            console.log(e.clientX, document.body.clientWidth);
            console.log(e.clientY, document.body.clientHeight);

            // set the element's new position:
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";

        }
    }
};

export default Draggable;
