import EventBus from "eventbusjs";
import EventEditor from "./Event";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-group");

/**
 * @classdesc
 *
 * MapBox group management
 *
 * @constructor
 * @alias ol.style.editor.Group
 * @param {Object} options - options for function call.
 * @example
 *   var group = new Group ({
 *      title : "MyGroup",
 *      collapse : true, // plier/deplier
 *      target : ...
 *   });
 *   group.add();
 *   group.add();
 */
class Group {

    constructor (options) {
        logger.trace("[constructor] Group", options);

        // options
        this.options = options || {
            // default...
        };

        if (!(this instanceof Group)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        this._initialize();

        this._initContainer();
    }

    /**
     * Initialize component
     * (called by constructor)
     *
     * @private
     */
    _initialize () {
        // unique editor id (optional!)
        this.id = this.options.id || null;

        if (!this.options.target) {
            // cf. add()
        }

        if (!this.options.title) {
            // cf. summary
            this.options.title = "Détails du groupe...";
        }

        // plier par defaut
        if (typeof this.options.collapse === "undefined") {
            this.options.collapse = true;
        }

        this.container = null;

        // DOM : className or id
        this.name = {
            target : "GPEditorMapBoxGroupTarget",
            container : "GPEditorMapBoxGroupContainer",
            details : "GPEditorMapBoxGroupDetails",
            summary : "GPEditorMapBoxGroupSummary"
        };
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxGroupContainer">...</div>
     */
    _initContainer () {
        var div = document.createElement("div");
        div.className = this.name.container;

        // FIXME pas compatible IE !
        // https://caniuse.com/#search=details
        // cf. https://css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion/
        var details = document.createElement("details");
        details.className = this.name.details;
        details.open = !this.options.collapse;
        div.appendChild(details);

        var summary = document.createElement("summary");
        summary.className = this.name.summary;
        summary.innerHTML = this.options.title;
        details.appendChild(summary);

        // main container
        this.container = div;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     */
    add () {
        if (!this.options.target) {
            if (!document.getElementById(this.name.target)) {
                var div = document.createElement("div");
                div.id = this.name.target;
                var node = document.documentElement ||
                    document.getElementsByTagName("body")[0] ||
                    document.getElementsByTagName("head")[0];
                node.appendChild(div);
            }
            this.options.target = document.getElementById(this.name.target);
        }
        if (this.container) {
            this.options.target.appendChild(this.container);
        }
    }

    /**
     * Set display container (DOM)
     *
     * @param {Boolean} display - show/hidden container
     */
    display (display) {
        this.container.style.display = (display) ? "flex" : "none";
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    getContainer () {
        var nodes = this.container.childNodes;
        if (nodes.length) {
            // retourne le noeud "details" !
            return nodes[0];
        }
        // sinon le container principal
        return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form
     *
     * NOT USED !
     * @param {Object} e - HTMLElement
     * @private
     * @fires Group#editor:group:oncollapse
     */
    onCollapseGroupMapBox (e) {
        logger.trace("onCollapseGroupMapBox", e);
        e.editorID = this.id;
        e.data = this.options;
        EventBus.dispatch(EventEditor.group.oncollapse, e);
    }

};

export default Group;
