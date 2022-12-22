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
declare function Legend(options: {
    target?: Object | undefined;
    position?: number | undefined;
    id?: number | undefined;
    sprites?: {
        url?: string | undefined;
        size?: Object | undefined;
        json?: Object | undefined;
    } | undefined;
    obj: {
        title?: string | undefined;
        editable?: boolean | undefined;
        paint: Object;
        layout: Object;
    };
}): void;
declare class Legend {
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
    constructor(options: {
        target?: Object | undefined;
        position?: number | undefined;
        id?: number | undefined;
        sprites?: {
            url?: string | undefined;
            size?: Object | undefined;
            json?: Object | undefined;
        } | undefined;
        obj: {
            title?: string | undefined;
            editable?: boolean | undefined;
            paint: Object;
            layout: Object;
        };
    });
    options: {
        target?: Object | undefined;
        position?: number | undefined;
        id?: number | undefined;
        sprites?: {
            url?: string | undefined;
            size?: Object | undefined;
            json?: Object | undefined;
        } | undefined;
        obj: {
            title?: string | undefined;
            editable?: boolean | undefined;
            paint: Object;
            layout: Object;
        };
    };
    /**
     * Constructor (alias)
     *
     * @private
     */
    private constructor;
    private _initialize;
    id: number | null | undefined;
    editable: boolean | undefined;
    legendRender: any;
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
    private _initContainer;
    private _getValues;
    private _setValues;
    /**
     * ...
     *
     * @param {*} value - value
     * @returns {String} extract value
     */
    _extract(value: any): string;
    private _createElementIconLegend;
    private _createElementEditionLegend;
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
    private onEditionLegendMapBox;
    private onChangeValueLegendMapBox;
}
//# sourceMappingURL=Legend.d.ts.map