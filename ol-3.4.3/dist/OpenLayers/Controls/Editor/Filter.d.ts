export default Filter;
/**
 * @classdesc
 *
 * MapBox filter management
 *
 * @constructor
 * @alias ol.style.editor.Filter
 * @param {Object} options - options for function call.
 * @example
 *   var filter = new Filter ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          edition : false
 *      },
 *      title : "Filtres (JSON)",
 *      obj : {
 *          filter : []
 *      }
 *   });
 *  filter.add();
 *  filter.display(true);
 *  filter.getContainer();
 */
declare class Filter {
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
        containerjson: string;
        jsonlabel: string;
        jsondisplay: string;
        containertoolsedit: string;
    } | undefined;
    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxFilterContainer">
     *  <div class ="GPEditorMapBoxFilterJsonontainer">
     *     <label class="GPEditorMapBoxFilterTitleJson">JSON Filtres :</label>
     *     <pre class="GPEditorMapBoxFilterDisplayJson">...</pre>
     *  </div>
     *  <div class ="GPEditorMapBoxStyleToolsEditionContainer"></div>
     * </div>
     */
    private _initContainer;
    /**
     * Add element into target DOM
     * @returns {Object} - Legend instance
     */
    add(): Object;
    /**
     * Set display container or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
    display(display: boolean): boolean;
    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    getContainer(): DOMElement;
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Filter#editor:style:oneditjson
     */
    private onEditJsonFilterMapBox;
}
//# sourceMappingURL=Filter.d.ts.map