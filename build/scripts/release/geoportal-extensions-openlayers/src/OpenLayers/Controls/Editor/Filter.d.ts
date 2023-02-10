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
declare function Filter(options: Object): void;
declare class Filter {
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
        containerjson: string;
        jsonlabel: string;
        jsondisplay: string;
        containertoolsedit: string;
    } | undefined;
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
    private onEditJsonFilterMapBox;
}
//# sourceMappingURL=Filter.d.ts.map