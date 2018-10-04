/**
* managing events
*
* See {@link http://krasimirtsonev.com/blog/article/javascript-managing-events-dispatch-listen}
* See {@link https://github.com/krasimir/EventBus}
*
* @property {Event} "editor:layer:visibility" - event ...
* @property {Event} "editor:layer:clone" - event ...
* @property {Event} "editor:layer:remove" - event ...
* @property {Event} "editor:style:edit" - event ...
* @property {Event} "editor:style:minScale" - event ...
* @property {Event} "editor:style:maxScale" - event ...
* @property {Event} "editor:filter:edit" - event ...
* @property {Event} "editor:themes:image" - event ...
* @property {Event} "editor:themes:title" - event ...
*
* @example
* // dispatch event
* EventBus.dispatch(EventEditor.layer.visibility, e);
* // listener
* EventBus.addEventListener(EventEditor.layer.visibility, function (e) {...}, this);
*/
var EventEditor = {
    layer : {
        visibility : "editor:layer:visibility",
        clone : "editor:layer:clone",
        remove : "editor:layer:remove"
    },
    style : {
        edit : "editor:style:edit",
        scale : {
            min : "editor:style:minScale",
            max : "editor:style:maxScale"
        }
    },
    filter : {
        edit : "editor:filter:edit"
    },
    themes : {
        image : "editor:themes:image",
        title : "editor:themes:title"
    }
};

export default EventEditor;
