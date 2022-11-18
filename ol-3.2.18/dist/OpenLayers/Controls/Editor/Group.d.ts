export default Group;
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
declare function Group(options: Object): void;
declare class Group {
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
    constructor(options: Object);
    options: Object;
    /**
     * Constructor (alias)
     *
     * @private
     */
    private constructor;
    private _initialize;
    id: any;
    container: HTMLDivElement | null | undefined;
    name: {
        target: string;
        container: string;
        details: string;
        summary: string;
    } | undefined;
    private _initContainer;
    /**
     * Add element into target DOM
     */
    add(): void;
    /**
     * Set display container (DOM)
     *
     * @param {Boolean} display - show/hidden container
     */
    display(display: boolean): void;
    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    getContainer(): DOMElement;
    private onCollapseGroupMapBox;
}
//# sourceMappingURL=Group.d.ts.map