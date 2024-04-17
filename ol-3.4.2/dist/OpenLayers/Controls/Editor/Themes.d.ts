export default Themes;
/**
 * @classdesc
 *
 * Mapbox Themes management
 *
 * @constructor
 * @alias ol.style.editor.Theme
 * @param {Object} options - options for function call.
 * @example
 *   var theme = new Themes ({
 *        "target": "",
 *        "tools": {
 *          "thumbnails": true,
 *          "button" : {
 *              "visible" : true,
 *              "type" : "radio" (par defaut) | "checkbox"
 *          }
 *        },
 *        "obj": {
 *          "themesSummary": "", // Titre du composant (non graphique !)
 *          "themes": [{
 *             "thumbnail": "data/images/layer0.png",
 *             "name": "standard0",
 *             "url": "data/styles/layer0.json",
 *             "description": "",
 *             "selected" : true
 *          },{
 *             "thumbnail": "data/images/layer1.png",
 *             "name": "standard1",
 *             "url": "data/styles/layer1.json",
 *             "description": ""
 *          }]
 *        }
 *   });
 *  theme.add();
 *  theme.display(true);
 *  theme.getContainer();
 */
declare function Themes(options: Object): void;
declare class Themes {
    /**
     * @classdesc
     *
     * Mapbox Themes management
     *
     * @constructor
     * @alias ol.style.editor.Theme
     * @param {Object} options - options for function call.
     * @example
     *   var theme = new Themes ({
     *        "target": "",
     *        "tools": {
     *          "thumbnails": true,
     *          "button" : {
     *              "visible" : true,
     *              "type" : "radio" (par defaut) | "checkbox"
     *          }
     *        },
     *        "obj": {
     *          "themesSummary": "", // Titre du composant (non graphique !)
     *          "themes": [{
     *             "thumbnail": "data/images/layer0.png",
     *             "name": "standard0",
     *             "url": "data/styles/layer0.json",
     *             "description": "",
     *             "selected" : true
     *          },{
     *             "thumbnail": "data/images/layer1.png",
     *             "name": "standard1",
     *             "url": "data/styles/layer1.json",
     *             "description": ""
     *          }]
     *        }
     *   });
     *  theme.add();
     *  theme.display(true);
     *  theme.getContainer();
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
        containertheme: string;
        containerthemeID: string;
        input: string;
        inputID: string;
        label: string;
        labelID: string;
        image: string;
        imageID: string;
        message: string;
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
    private onClickThemeImageMapBox;
    private onClickThemeTitleMapBox;
}
//# sourceMappingURL=Themes.d.ts.map