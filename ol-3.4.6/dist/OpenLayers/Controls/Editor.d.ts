export default Editor;
/**
 * @classdesc
 *
 * Editor Styles MapBox...
 *
 * @constructor
 * @alias ol.style.Editor
 * @param {Object} options - options for function call.
 * @fires editor:layer:onclickvisibility
 * @fires editor:layer:onclickclone
 * @fires editor:layer:onclickremove
 * @fires editor:style:oneditjson
 * @fires editor:style:scale:onchangemin
 * @fires editor:style:scale:onchangemax
 * @fires editor:legend:onclickedition
 * @fires editor:legend:onchangevalue
 * @fires editor:filter:oneditjson
 * @fires editor:themes:onclickimage
 * @fires editor:themes:onclicktitle
 * @fires editor:group:oncollapse
 * @fires editor:onloaded
 * @example
 *   var editor = new Editor ({
 *      target : "",
 *      style : "data/styles/layer.json",
 *      themes: {
 *          themesSummary : "",
 *          themes : [{
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
 *      },
 *      scope : this,
 *      events : {
 *          "editor:layer:onclickvisibility" : ...,
 *          "editor:layer:onclickclone" : ...,
 *          "editor:layer:onclickremove" : ...,
 *          "editor:style:oneditjson" : ...,
 *          "editor:style:scale:onchangemin" : ...,
 *          "editor:style:scale:onchangemax" : ...,
 *          "editor:filter:oneditjson" : ...,
 *          "editor:themes:onclickimage" : this._onClickEventImageTheme(),
 *          "editor:themes:onclicktitle" : function(e) {...}
 *      },
 *      tools : {
 *          // afficher/cacher les themes (par defaut) ou utiliser les options
 *          themes : true | false | {
 *              target : "...",
 *              tools : {
 *                  "thumbnails": true,
 *                  "button": { visible : true, type : "checkbox" }
 *              },
 *          },
 *          layers : true | false,     // afficher les couches (layers)
 *          search : true | false,     // TODO : afficher l'outil de recheche de couches
 *          style : true | false,      // afficher les styles (sous menu layers)
 *          filter : true | false,     // afficher les filtres (sous menu layers)
 *          legend : true | false,     // afficher les legendes (layers)
 *          group : true | false,      // grouper les couches, l'option 'sort' doit être activée (layers)
 *          groupAuto : true | false,  // definir la construction automatiques des groupes
 *          sort : true | false,       // trier les couches (layers)
 *          sortBy : "id|class|geom",  // definir le type de tri (layers)
 *          sortOrder : "asc, desc",   // definir l'ordre de tri (layers)
 *          title : true | false       // afficher les titres des rubriques,
 *          collapse : true | false | undefined // afficher et/ou plier les couches ou ne pas afficher l'option,
 *          type : true | false,       // afficher le type de geometrie (layers)
 *          pin : true | false,        // afficher la puce pour chaque couche (layers)
 *          visibility : true | false, // afficher l'icone de visibilité (layers),
 *          icon : {                   // afficher l'icone "oeil" ou "checkbox" (layers),
 *              "image" : true,
 *              "anchor" : "start" // afficher l'icone au debut ou à la fin de la ligne
 *          },
 *          editable : true | false    // active l'edition de la legende (legendes)
 *      }
 *   });
 *   // options par defaut
 *   {
 *      themes : false,
 *      layers : true,
 *      search : false,
 *      style : false,
 *      filter : false,
 *      legend : false,
 *      group : false,
 *      groupAuto : false,
 *      sort : true,
 *      sortBy : "id",
 *      sortOrder : "asc",
 *      title : true,
 *      collapse : undefined,
 *      type : true,
 *      pin : true,
 *      visibility : true,
 *      icon : {
 *          image : true,
 *          anchor : "end"
 *      },
 *      editable : true
 *   }
 *   // Context
 *   editor.setContext("map", map);
 *   editor.setContext("layer", layer);
 *   // create DOM
 *   editor.createElement()
 *     .then(() => {
 *       console.warn(editor.getID());
 *       console.log(this.getContext("map"));
 *       console.log(this.getContext("layer"));
 *     })
 *     .catch(error => {});
 *   // possibility to add listeners with globale variable : eventbus
 *   eventbus.addEventListener("editor:style:scale:onchangemin", function (e) {...});
 */
declare class Editor {
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
    context: {} | undefined;
    layers: any[] | undefined;
    container: HTMLDivElement | null | undefined;
    name: {
        target: string;
        container: string;
        containerID: string;
        containerLayers: string;
        titleLayers: string;
        titleLayersID: string;
        titleThemes: string;
        titleThemesID: string;
        sep: string;
    } | undefined;
    mapbox: any;
    sprites: {} | undefined;
    /**
    * Initialize events with handlers
    * (called by constructor)
    *
    * List Events :
    *          "editor:layer:visibility"
    *          "editor:layer:clone"
    *          "editor:layer:remove"
    *          "editor:style:edit"
    *          "editor:style:minScale"
    *          "editor:style:maxScale"
    *          "editor:filter:edit"
    *          "editor:themes:image",
    *          "editor:themes:title"
    * @private
    */
    private _initEvents;
    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @example
     *  <div class="GPEditorMapBoxContainer" id="GPEditorMapBoxContainer_ID_0">
     *    <div id="GPEditorMapBoxThemesTitle" class="GPEditorMapBoxThemesTitle">Liste des 'thèmes'</div>
     *    <div class="GPEditorMapBoxThemesContainer">
     *      ...
     *    </div>
     *    <div id="GPEditorMapBoxLayersTitle" class="GPEditorMapBoxLayersTitle">Liste des 'couches'</div>
     *    <div class="GPEditorMapBoxLayersContainer">
     *      <div class="GPEditorMapBoxLayerContainer">
     *          <div id="GPEditorMapBoxLayerTitleContainer-0_1" class="GPEditorMapBoxLayerTitleContainer">
     *              <label class="GPEditorMapBoxLayerImageLabel"></label>
     *              <input id="GPEditorMapBoxLayerTitleInput-0_1" class="GPEditorMapBoxLayerTitleInput" type="checkbox">
     *              <label class="GPEditorMapBoxLayerTitleLabel" for="GPEditorMapBoxLayerTitleInput-0_1" title="states">population_lt_2m</label>
     *          </div>
     *      </div>
     *      <div class="GPEditorMapBoxLayerContainer">...</div>
     *      <div class="GPEditorMapBoxLayerContainer">...</div>
     *    </div>
     *  </div>
     * @private
     */
    private _initContainer;
    /**
     * Getting Sprites informations
     * (called by _initialize)
     *
     * @param {String} sprites - url des sprites
     * @returns {Promise} - promise
     * @private
     */
    private _getSprites;
    /**
     * Create Editor
     *
     * @returns {Promise} - promise
     */
    createElement(): Promise<any>;
    /**
     * Set display container (DOM)
     *
     * @param {Boolean} display - show/hidden container
     */
    display(display: boolean): void;
    setContext(key: any, value: any): void;
    getContext(key: any): any;
    /**
     * Get id editor
     * @returns {Number} id
     */
    getID(): number;
    /**
     * Get container (DOM)
     * @returns {DOMElement} DOM element
     */
    getContainer(): DOMElement;
    /**
     * Get Style (json)
     * @returns {Object} Style MapBox
     */
    getStyle(): Object;
    /**
     * Get layer style (json)
     * @param {Number} i - index
     * @returns {Object} Style MapBox of a layers
     */
    getStyleLayer(i: number): Object;
    /**
     * Get layer object from json style
     * @param {Number} i - index into style json
     * @returns {Object} Style MapBox of a layers
     */
    getLayerFromStyle(i: number): Object;
    /**
     * Get a list of layer object sorted or not (see options.tools.sort)
     * @returns {Array} - List of layer object
     * @see {ol.style.editor.Layer}
     */
    getLayers(): any[];
    /**
     * Get the layer object from a list sorted or not (see options.tools.sort)
     * @param {Number} i - index
     * @returns {Object} - layer object
     * @see {ol.style.editor.Layer}
     */
    getLayer(i: number): Object;
}
//# sourceMappingURL=Editor.d.ts.map