export default Style;
/**
 * @classdesc
 *
 * MapBox styles management
 *
 * @constructor
 * @alias ol.style.editor.Style
 * @param {Object} options - options for function call.
 * @example
 *   var style = new Style ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          edition : false,
 *          scale : true
 *      },
 *      title : "Styles (JSON)",
 *      obj : {
 *          paint : {},
 *          layout : {}
 *      }
 *   });
 *  style.add();
 *  style.display(true);
 *  style.getContainer();
 */
declare function Style(options: Object): void;
declare class Style {
    /**
     * @classdesc
     *
     * MapBox styles management
     *
     * @constructor
     * @alias ol.style.editor.Style
     * @param {Object} options - options for function call.
     * @example
     *   var style = new Style ({
     *      target : ...,
     *      position : 1, // identifiant de position (unique !)
     *      tools : {
     *          edition : false,
     *          scale : true
     *      },
     *      title : "Styles (JSON)",
     *      obj : {
     *          paint : {},
     *          layout : {}
     *      }
     *   });
     *  style.add();
     *  style.display(true);
     *  style.getContainer();
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
        containertoolsscale: string;
        scaletitle: string;
        containertoolsminscale: string;
        scalelabelmin: string;
        scaleinputmin: string;
        containertoolsmaxscale: string;
        scalelabelmax: string;
        scaleinputmax: string;
        containertoolsedit: string;
    } | undefined;
    private _initContainer;
    private _createElementToolsScale;
    private _createElementToolsEdition;
    private _syntaxHighlight;
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
    private onEditJsonStyleMapBox;
    private onChangeStyleScaleMinMapBox;
    private onChangeStyleScaleMaxMapBox;
}
//# sourceMappingURL=Style.d.ts.map