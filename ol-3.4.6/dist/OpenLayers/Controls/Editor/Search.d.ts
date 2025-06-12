export default Search;
/**
 * @classdesc
 *
 * TODO MapBox search management
 *
 * @constructor
 * @alias ol.style.editor.Search
 * @param {Object} options - options for function call.
 * @todo
 * @example
 *   var Search = new Search ({
 *      target : ...,
 *      tools : {
 *          // ...
 *      }
 *      title : "Filtres de recherche :",
 *      obj : {}
 *   });
 *  Search.add();
 *  Search.display(true);
 *  Search.getContainer();
 */
declare class Search {
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
    } | undefined;
    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxSearchContainer">
     *  // ...
     * </div>
     */
    private _initContainer;
    /**
     * Add element into target DOM
     * @returns {Object} - Search instance
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
     * @fires Search#editor:search:onsubmit
     */
    private onSubmitSearchLayersMapBox;
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Search#editor:search:onautocomplete
     */
    private onAutocompleteSearchLayersMapBox;
}
//# sourceMappingURL=Search.d.ts.map