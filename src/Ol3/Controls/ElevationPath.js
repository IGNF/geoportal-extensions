define([
    "ol",
    "woodman",
    "Ol3/Utils",
    "Common/Controls/ElevationPathDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Utils,
    ElevationPathDOM,
    ID
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("elevationpath");

    /**
    * @example
    * var measure = new ol.control.ElevationPath({
    *    element : null,
    *    target : null,
    *    render : null,
    *    collapsed : true,
    *    stylesOptions : {
    *     draw : {
    *       fillColor : "rgba(255, 255, 255, 0.2)",
    *       strokeColor : "rgba(0, 0, 0, 0.5)",
    *       strokeLineDash : [10, 10],
    *       strokeWidth : 2,
    *       imageRadius : 5,
    *       imageFillColor : "rgba(255, 255, 255, 0.2)",
    *       imageStrokeColor : "rgba(0, 0, 0, 0.7)"
    *     },
    *     marker : {},
    *     graph : {}
    *    },
    *    elevationPathOptions : {},
    * });
    */
    function ElevationPath (options) {

        /** options */
        options = options || {};

        if (!(this instanceof ElevationPath)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /** Nom de la classe (heritage) */
        this.CLASSNAME = "ElevationPath";

        /** uuid */
        this._uid = ID.generate();

        /** container */
        this._showContainer = null;
        this._pictoContainer = null;
        this._panelContainer = null;
        this._profilContainer = null;
        this._waitingContainer = null;

        // initialisation du composant
        this._initialize(options);

        // creation du DOM container
        var container = ( options.element ) ? options.element : this._initializeContainer();

        // heritage
        ol.control.Control.call(this,
            {
                element : container,
                target : options.target,
                render : options.render
            }
        );
    }

    // heritage avec ol.control.Control
    ol.inherits(ElevationPath, ol.control.Control);

    /**
     * @lends module:ElevationPath
     */
    ElevationPath.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les mixins de la classe "ElevationPathDOM"
    Utils.assign(ElevationPath.prototype, ElevationPathDOM);

    /**
     * Constructor (alias)
     * @private
     */
    ElevationPath.prototype.constructor = ElevationPath;

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * TODO Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    ElevationPath.prototype.setMap = function (map) {

        if ( map ) {
            var self = this;
            // TODO event on map...
        }

        // on appelle la méthode setMap originale d'OpenLayers
        ol.control.Control.prototype.setMap.call(this, map);

    };

    /**
     * Returns true if widget is collapsed (minimized),
     * false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    ElevationPath.prototype.getCollapsed = function () {
        return this.options.collapsed;
    };

    /**
     * TODO Collapse or display widget main container
     *
     * @param {Boolean} collapsed - true to collapse widget, false to display it
     */
    ElevationPath.prototype.setCollapsed = function (collapsed) {
        this.options.collapsed = collapsed;
        // TODO gestion du clic d'ouverture/fermeture du panneau du profil...
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize measure control (called by constructor)
     *
     * @private
     */
    ElevationPath.prototype._initialize = function (options) {
        logger.trace("call ElevationPath::_initialize() : ", options);

        // liste des options
        this.options = {};

        // gestion du mode collapsed
        var collapsed = options.collapsed;
        this.options.collapsed = ( typeof collapsed === "undefined") ? true : collapsed;

        // gestion des options du Services
        var service = options.elevationOptions;
        this.options.service = ( typeof service === "undefined" || Object.keys(service).length === 0 ) ? {} : service;

        // gestion des styles
        var styles = options.stylesOptions || {};
        if ( typeof styles === "undefined" || Object.keys(styles).length === 0 ) {
            // TODO on applique les styles par defaut
            this.options.styles = {
                draw : {},
                marker : {},
                graph : {}
            };
        }

        // gestion des styles du marker
        var marker = styles.marker || this.options.styles.marker;
        this.options.styles.marker = ( typeof marker === "undefined" || Object.keys(marker).length === 0 ) ? {} : marker;
        this._createStylingMarker();

        // gestion des styles du tracé
        var draw = styles.draw || this.options.styles.draw;
        this.options.styles.draw = ( typeof draw === "undefined" || Object.keys(draw).length === 0 ) ? {} : draw;
        this._createStylingDraw();

        // gestion des styles du profil
        var graph = styles.graph || this.options.styles.graph;
        this.options.styles.graph = ( typeof graph === "undefined" || Object.keys(graph).length === 0 ) ? {} : graph;
        this._createStylingGraph();

    };

    /**
     * initialize component container (DOM)
     *
     * @private
     */
    ElevationPath.prototype._initializeContainer = function () {
        logger.trace("call ElevationPath::_initializeContainer() : ", this._uid);

        // create main container
        var container = this._createMainContainerElement();

        var inputShow = this._showContainer = this._createShowElevationPathElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if (!this.options.collapsed) {
            inputShow.checked = true;
        }

        var picto = this._pictoContainer = this._createShowElevationPathPictoElement();
        container.appendChild(picto);

        // panneau
        var panel = this._panelContainer = this._createElevationPathPanelElement();

        // header
        var header = this._createElevationPathPanelHeaderElement();
        panel.appendChild(header);

        // profil
        var profil = this._profilContainer = this._createElevationPathPanelProfilElement();
        panel.appendChild(profil);

        // waiting
        var waiting = this._waitingContainer = this._createElevationPathWaitingElement();
        panel.appendChild(waiting);

        container.appendChild(panel);

        return container;
    };

    // ################################################################### //
    // ###################### init styles ################################ //
    // ################################################################### //

    /** TODO create style marker */
    ElevationPath.prototype._createStylingMarker = function () {
        logger.trace("call ElevationPath::_createStylingMarker() : ");
    };

    /** TODO create style draw */
    ElevationPath.prototype._createStylingDraw = function () {
        logger.trace("call ElevationPath::_createStylingDraw() : ");
    };

    /** TODO create style graph */
    ElevationPath.prototype._createStylingGraph = function () {
        logger.trace("call ElevationPath::_createStylingGraph() : ");
    };

    return ElevationPath;
});
