export default Legend;
/**
 * @classdesc
 *
 * MapBox Legend management
 *
 * @constructor
 * @alias ol.style.editor.Legend
 * @param {Object} options - options for function call.
 * @param {Object} [options.target = null] - ...
 * @param {Number} [options.position = 0] -  ...
 * @param {Number} [options.id = null] - (internal) ...
 * @param {Object} [options.sprites = null] - ...
 * @param {String} [options.sprites.url] - ...
 * @param {Object} [options.sprites.size] - {h:, w:} ...
 * @param {Object} [options.sprites.json] - ...
 * @param {Object} options.obj - ...
 * @param {String} [options.obj.title] - ...
 * @param {Boolean} [options.obj.editable = true] - ...
 * @param {Object} options.obj.paint - ...
 * @param {Object} options.obj.layout - ...
 * @example
 *   var legend = new Legend ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      sprites : {
 *          url : "http://localhost/sprites.png",
 *          size : { w : 450, h : 550 },
 *          json : {
 *              icon-1 : {x:,y:,height:,width:,pixelRatio:},
 *              icon-2 : {x:,y:,height:,width:,pixelRatio:}
 *          }
 *      },
 *      obj : {
 *          title : "",
 *          editable : true, // tag non standard issue du style json dédié à l'edition
 *          paint : {"fill-color": "#2BB3E1"},
 *          layout : {visibility:"none"}
 *      }
 *   });
 *  legend.add();
 *  legend.display(true);
 *  legend.isEditable();
 *  legend.getRenderContainer();
 *  legend.getToolsContainer();
 *  legend.getContainer();
 */
declare class Legend {
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
    editable: any;
    legendRender: Object | {
        type: string;
        values: {
            width: number;
            stroke: string;
            color: string;
            opacity: number;
        };
    } | undefined;
    container: HTMLDivElement | null | undefined;
    rendercontainer: HTMLDivElement | null | undefined;
    toolscontainer: any;
    name: {
        target: string;
        container: string;
        containerlegendrender: string;
        legendrender: string;
        legendeditable: string;
        legendtitle: string;
        containerlegendtools: string;
    } | undefined;
    labels: {
        "line-color": string;
        "line-width": string;
        "line-opacity": string;
        "fill-color": string;
        "fill-opacity": string;
    } | undefined;
    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxLegendContainer">
     *  <div class="GPEditorMapBoxLegendRenderContainer">
     *      <div class="GPEditorMapBoxLegendRender GPEditorMapBoxLegendEditable legend-circle" style="..."></div>
     *      <span class="GPEditorMapBoxLegendTitle">test circle editable...</span>
     *  </div>
     *  <div class="GPEditorMapBoxLegendToolsContainer">...</div>
     * </div>
     */
    private _initContainer;
    /**
    * Get properties supported
    *
    * @param {Object} type - fill, line, circle, text, icon...
    * @param {Object} values - raw values from the JSON file
    * @returns {Object} - { type : (fill | line | circle | symbol), values : valuesSupported }
    *
    * @private
    * @example
    *
    * // TODO
    * // symbol with text (1) / symbol without text (2) / text (3)
    * // "layout":{
    * //      "icon-image":"{maki}-11",          <!--- IT'S A SYMBOL (1) (2)-->
    * //      "text-font":[
    * //           "Open Sans Semibold",
    * //           "Arial Unicode MS Bold"
    * //       ],
    * //       "text-field":"{name_en}",         <!--- IT'S A TEXT (1) (3)-->
    * //       "text-max-width":9,
    * //       "text-padding":2,
    * //       "text-offset":[
    * //            0,
    * //            0.6
    * //       ],
    * //       "text-anchor":"top",
    * //       "text-size":12
    * // },
    * // "paint":{
    * //     "text-color":"#666",
    * //     "text-halo-color":"#ffffff",
    * //     "text-halo-width":1,
    * //     "text-halo-blur":0.5
    * // },
    *
    */
    private _getProperties;
    /**
    * Render thumbnail (SVG)
    *
    * @param {Object} type - fill, line, circle, text, ...
    * @param {Object} values - {"color":..., "width":..., "stroke":...., "opacity":...}
    * @returns {Boolean} true/false
    *
    * @private
    * @example
    * (...)
    */
    private _renderThumbnail;
    /**
     * Get value
     *
     * @param {*} value - value of a property (ex. "#2BB3E1")
     * @returns {*} return a verified value (ex. color": "#2BB3E1")
     *
     * @private
     * @example
     * // type simple for fill, line or circle type with string :
     * // "paint": {
     * //     "fill-color": "#2BB3E1"
     * // }
     *
     * // type simple for fill, line or circle type with array :
     * // "paint": {
     * //     "line-dasharray": [2,10]
     * // }
     *
     * // TODO type complexe : not yet implemented !
     * // "paint": {
     * //     "fill-color": [
     * //          "match",
     * //          ["get","symbo"],
     * //          "ZONE_BOISEE","#A7DA81",
     * //          "ZONE_MANGROVE","#7E8AB5",
     * //          "#A7DA81"
     * //      ]
     * // }
     *
     * // other type complexe :
     * // "paint": {
     * //     "fill-color": {
     * //        "base": 1,
     * //        "stops": [
     * //        [
     * //          15.5,
     * //         "#f2eae2"
     * //        ],
     * //        [
     * //          16,
     * //          "#dfdbd7"
     * //        ]
     * //        ]
     * //     }
     * // }
     */
    private _getValue;
    /**
    * Create a Graphical Legend Icon
    *
    * @param {Object} params - param
    * @param {String} params.title - title
    * @param {String} params.type - fill, line, circle, text, icon, ...
    * @param {String} params.values - {"color": "#2BB3E1", "width": 10, "opacity": 0.5, "stroke": "#2BB3E1"}
    * @param {Boolean} params.edit - editable with a colorPicker for only line, fill and circle legend !
    * @returns {DOMElement} DOM element
    *
    * @private
    * @example
    *   <div class="GPEditorMapBoxLegendRenderContainer">
    *       <div class="GPEditorMapBoxLegendRender GPEditorMapBoxLegendEditable legend-fill"
    *           style="background: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><rect x='0' y='0' width='100' height='100' rx='5' ry='5' fill='rgba(255, 255, 255, 1)' fill-opacity='1' /></svg>&quot;);">
    *       </div>
    *       <span class="GPEditorMapBoxLegendTitle">vide...</span>
    * </div>
    */
    private _createElementIconLegend;
    /**
    * Create a Graphical Legend Edition
    *
    * @param {Object} params - param
    * @param {String} params.type - fill, line, (TODO : circle, icon or text)
    * @param {String} params.values - {"fill-color": "#2BB3E1"}
    * @param {Boolean} params.edit - editable with a colorPicker for only line and fill legend !
    * @returns {DOMElement} DOM element
    *
    * @private
    * @example
    *   <div class="GPEditorMapBoxLegendToolsContainer">
    *       <div class="legend-styling-div">
    *           <label for="stroke-color">Couleur du trait</label>
    *           <input class="legend-styling" id="stroke-color" title="" type="color">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="stroke-width">Epaisseur du trait</label>
    *           <input class="legend-styling" id="stroke-width" title="" type="range" min="0" max="10" step="1" value="1">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="stroke-opacity">Opacité du trait</label>
    *           <input class="legend-styling" id="stroke-opacity" title="" type="range" min="0" max="1" step="0.1" value="1">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="fill-color">Couleur de remplissage</label>
    *        <input class="legend-styling" id="fill-color" title="" type="color">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="fill-opacity">Opacité du remplissage</label>
    *           <input class="legend-styling" id="fill-opacity" title="" type="range" min="0" max="1" step="0.1" value="1">
    *       </div>
    *   </div>
    */
    private _createElementEditionLegend;
    /**
     * Add element into target DOM
     *
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
     * Is editable
     *
     * @returns {Boolean} - true/false
     */
    isEditable(): boolean;
    /**
     * Get container Legend Render (DOM)
     *
     * @returns {DOMElement} DOM element
     * @see Layer.prototype.slotLegend()
     * @example
     *  <div class="GPEditorMapBoxLegendRender legend-(line|fill|background|text|icon|circle|unknow)" style="..."></div>
     */
    getRenderContainer(): DOMElement;
    /**
     * Get container Legend Tools (DOM)
     *
     * @returns {DOMElement} DOM element
     * @see Layer.prototype.slotLegend()
     * @example
     *  <div class="GPEditorMapBoxLegendToolsContainer">...</div>
     */
    getToolsContainer(): DOMElement;
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
     * @fires Legend#editor:legend:onclickedition
     */
    private onEditionLegendMapBox;
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Legend#editor:legend:onchangevalue
     */
    private onChangeValueLegendMapBox;
}
declare namespace Legend {
    namespace PROPERTIES {
        const line: string[];
        const fill: string[];
        const background: string[];
        const circle: string[];
        const icon: string[];
        const text: string[];
    }
}
//# sourceMappingURL=Legend.d.ts.map