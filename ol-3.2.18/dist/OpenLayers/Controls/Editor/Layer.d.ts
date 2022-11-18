export default Layer;
/**
 * @classdesc
 *
 * MapBox filter management
 *
 * @constructor
 * @alias ol.style.editor.Layer
 * @param {Object} options - options for function call.
 * @example
 *   var layers = new Layer ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          "visibility" : true, // afficher l'icone de visibilité
 *          "icon" : {
 *              "image" : true, // afficher l'icone "oeil" (defaut) ou une checkbox
 *              "anchor" : "start" | "end"  // afficher l'icone au debut ou à la fin (defaut)
 *          },
 *          "type" : true,       // afficher l'icone du type de geometrie
 *          "pin" : true,        // afficher l'icone de puce
 *          "remove" : false,    // TODO afficher l'icone de suppression
 *          "clone" : false      // TODO afficher l'icone de duplication
 *      },
 *      obj : {
 *          "id": "ocs - vegetation", // MANDATORY
 *          "type": "fill", // OPTIONAL
 *          "source": "pyramide_proto", // OPTIONAL
 *          "source-layer": "ocs_vegetation_surf" // OPTIONAL
 *      }
 *   });
 *  layers.addLegend(oLegend);
 *  layers.slotLegend();
 *  layers.addStyle(oStyle);
 *  layers.addFilter(oFilter);
 *  layers.add();
 *  layers.active(false);
 *  layers.visibility(false);
 *  layers.display(false);
 *  layers.collapse();
 *  EventBus.addEventListener("editor:layer:onclickvisibility", function (e) {
 *     // e.target.data : options !
 *     // e.target.editorID : id or null
 *   }, this);
 */
declare function Layer(options: Object): void;
declare class Layer {
    /**
     * @classdesc
     *
     * MapBox filter management
     *
     * @constructor
     * @alias ol.style.editor.Layer
     * @param {Object} options - options for function call.
     * @example
     *   var layers = new Layer ({
     *      target : ...,
     *      position : 1, // identifiant de position (unique !)
     *      tools : {
     *          "visibility" : true, // afficher l'icone de visibilité
     *          "icon" : {
     *              "image" : true, // afficher l'icone "oeil" (defaut) ou une checkbox
     *              "anchor" : "start" | "end"  // afficher l'icone au debut ou à la fin (defaut)
     *          },
     *          "type" : true,       // afficher l'icone du type de geometrie
     *          "pin" : true,        // afficher l'icone de puce
     *          "remove" : false,    // TODO afficher l'icone de suppression
     *          "clone" : false      // TODO afficher l'icone de duplication
     *      },
     *      obj : {
     *          "id": "ocs - vegetation", // MANDATORY
     *          "type": "fill", // OPTIONAL
     *          "source": "pyramide_proto", // OPTIONAL
     *          "source-layer": "ocs_vegetation_surf" // OPTIONAL
     *      }
     *   });
     *  layers.addLegend(oLegend);
     *  layers.slotLegend();
     *  layers.addStyle(oStyle);
     *  layers.addFilter(oFilter);
     *  layers.add();
     *  layers.active(false);
     *  layers.visibility(false);
     *  layers.display(false);
     *  layers.collapse();
     *  EventBus.addEventListener("editor:layer:onclickvisibility", function (e) {
     *     // e.target.data : options !
     *     // e.target.editorID : id or null
     *   }, this);
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
    bSlotLegend: boolean | undefined;
    oFilter: Filter | null | undefined;
    oStyle: Style | null | undefined;
    oLegend: Legend | null | undefined;
    container: HTMLDivElement | null | undefined;
    DomVisibility: any;
    DomToggle: HTMLLabelElement | null | undefined;
    name: {
        target: string;
        container: string;
        containerlegend: string;
        containertitle: string;
        imagelabelinput: string;
        imagelabel: string;
        typeimg: string;
        titleinput: string;
        titlelabel: string;
        containertools: string;
        visibilityinput: string;
        visibilitylabel: string;
        visibilityinputdisable: string;
        visibilitylabeldisable: string;
    } | undefined;
    private _initContainer;
    /**
     * Add element into target DOM
     * @returns {Object} - Layer instance
     */
    add(): Object;
    /**
     * Add style in the submenu
     *
     * @param {Object} style - style object
     */
    addStyle(style: Object): void;
    /**
     * Add filter in the submenu
     *
     * @param {Object} filter - filter object
     */
    addFilter(filter: Object): void;
    /**
     * Add Legend in the submenu
     *
     * @param {Object} legend - legend object
     */
    addLegend(legend: Object): void;
    /**
     * Integrate Legend to the layer container
     */
    slotLegend(): void;
    /**
     * Set visibility or get
     *
     * @param {Boolean} display - set visibility or undefined to get status
     * @returns {Boolean} - true/false
     */
    visibility(display: boolean): boolean;
    /**
    * Collapse a layer panel (event)
    */
    collapse(): void;
    /**
    * Click on visibility icon (event)
    */
    visible(): void;
    /**
     * Set collapse or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
    display(display: boolean): boolean;
    /**
     * Set disabled/enabled status or get
     *
     * @param {Boolean} active - disable/enable layer interaction or get status
     * @returns {Boolean} - true/false
     */
    active(active: boolean): boolean;
    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    getContainer(): DOMElement;
    private onClickLayerMapBox;
    private onVisibilityLayerMapBox;
    private onCloneLayerMapBox;
    private onRemoveLayerMapBox;
}
import Filter from "./Filter";
import Style from "./Style";
import Legend from "./Legend";
//# sourceMappingURL=Layer.d.ts.map