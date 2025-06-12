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
declare class Style {
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
    /**
     * Graphical rendering of the component
     * ie. this.container
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxStyleContainer">
     *   <div class ="GPEditorMapBoxStyleJsonContainer">
     *      <label class="GPEditorMapBoxStyleJsonTitle">JSON Styles :</label>
     *      <pre class="GPEditorMapBoxStyleJsonDisplay">...</pre>
     *   </div>
     *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
     *   <div class ="GPEditorMapBoxStyleToolsEditionContainer"></div>
     * </div>
     */
    private _initContainer;
    /**
     * Graphical rendering of the scale tools
     *
     * @param {Object} scale - {min,max} or 0|21
     * @returns {DOMElement} DOM element
     *
     * @private
     * @example
     *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
     */
    private _createElementToolsScale;
    /**
     * Graphical rendering of the edition tools
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     * @example
     *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
     */
    private _createElementToolsEdition;
    /**
     * Transform a JSON into a DOM with a syntax in color
     *
     * @private
     * @param {Object} json - json.
     * @returns {DOMElement} dom element
     */
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
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Style#editor:style:oneditjson
     */
    private onEditJsonStyleMapBox;
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Style#editor:style:scale:onchangemin
     */
    private onChangeStyleScaleMinMapBox;
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Style#editor:style:scale:onchangemax
     */
    private onChangeStyleScaleMaxMapBox;
}
//# sourceMappingURL=Style.d.ts.map