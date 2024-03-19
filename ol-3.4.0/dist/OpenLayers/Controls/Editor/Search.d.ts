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
declare function Search(options: Object): void;
declare class Search {
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
    } | undefined;
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
    private onSubmitSearchLayersMapBox;
    private onAutocompleteSearchLayersMapBox;
}
//# sourceMappingURL=Search.d.ts.map