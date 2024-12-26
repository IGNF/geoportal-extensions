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
declare class Themes {
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
    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     *  <div class="GPEditorMapBoxThemesContainer">
     *      <div id="GPEditorMapBoxThemeContainer-1" class="GPEditorMapBoxThemeContainer">
     *          <input type="radio" id="GPEditorMapBoxThemeInput-1" class="GPEditorMapBoxThemeInput" name="1552920176933">
     *          <img class="GPEditorMapBoxThemeImage" src="http://image1.png" alt="Description1"></img>
     *          <label for="GPEditorMapBoxThemeInput-1" class="GPEditorMapBoxThemeTitle">Titre1</label>
     *      </div>
     *      <div id="GPEditorMapBoxThemeContainer-2" class="GPEditorMapBoxThemeContainer">
     *          <input type="radio" id="GPEditorMapBoxThemeInput-2" class="GPEditorMapBoxThemeInput" name="1552920176934">
     *          <img class="GPEditorMapBoxThemeImage" src="http://image2.png" alt="Description2"></img>
     *          <label for="GPEditorMapBoxThemeInput-2" class="GPEditorMapBoxThemeTitle">Titre2</label>
     *      </div>
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
     * this method is called by event '' on '' tag form
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Themes#editor:themes:image
     */
    private onClickThemeImageMapBox;
    /**
     * this method is called by event '' on '' tag form
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Themes#editor:themes:title
     */
    private onClickThemeTitleMapBox;
}
//# sourceMappingURL=Themes.d.ts.map