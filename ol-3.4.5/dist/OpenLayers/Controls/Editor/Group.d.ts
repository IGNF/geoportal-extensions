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
declare class Group {
    constructor(options: any);
    options: any;
    /**
     * Initialize component
     * (called by constructor)
     *
     * @private
     */
    private _initialize;
    id: any;
    container: HTMLDivElement | null | undefined;
    name: {
        target: string;
        container: string;
        details: string;
        summary: string;
    } | undefined;
    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxGroupContainer">...</div>
     */
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
    /**
     * this method is called by event '' on '' tag form
     *
     * NOT USED !
     * @param {Object} e - HTMLElement
     * @private
     * @fires Group#editor:group:oncollapse
     */
    private onCollapseGroupMapBox;
}
//# sourceMappingURL=Group.d.ts.map