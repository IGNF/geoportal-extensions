define([
    "ol",
    "gp",
    "woodman",
    "Ol3/Utils",
    "Common/Controls/LayerImportDOM",
    "Common/Utils/SelectorID",
    "Ol3/Formats/KML"
], function (
    ol,
    Gp,
    woodman,
    Utils,
    LayerImportDOM,
    SelectorID,
    KMLExtended
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("layerimport");

    /**
     * @classdesc
     *
     * LayerImport Control.
     *
     * @constructor
     * @alias ol.control.LayerImport
     * @extends {ol.control.Control}
     * @param {Object} options - options for function call.
     * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
     * @param {Boolean} [options.collapsed = false] - Specify if LayerImport control should be collapsed at startup. Default is true.
     * @param {Array} [options.layerTypes = ["KML", "GPX", "WMS", "WMTS"]] - data types that could be imported : "KML", "GPX", "WMS" and "WMTS". Values will be displayed in the same order in widget list.
     * @param {Object} [options.webServicesOptions = {}] - Options to import WMS or WMTS layers
     * @param {String} [options.webServicesOptions.proxyUrl] - Proxy URL to avoid cross-domain problems. Mandatory to import WMS and WMTS layer.
     * @param {Array.<String>} [options.webServicesOptions.noProxyDomains] - Proxy will not be used for this list of domain names. Only use if you know what you're doing.
     * @example
     *  var LayerImport = new ol.control.LayerImport({
     *      collapsed : false,
     *      layerTypes : ["KML", "GPX"],
     *      webServicesOptions : {
     *          proxyUrl : "http://localhost/proxy/php/proxy.php?url=",
     *          noProxyDomains : []
     *      }
     *  });
     */
    function LayerImport (options) {

        options = options || {};

        if (!(this instanceof LayerImport)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        this._initialize(options);

        // init control DOM container
        var container = this._initContainer(options);

        // call ol.control.Control constructor
        ol.control.Control.call(this,
            {
                element : container,
                target : options.target,
                render : options.render
            }
        );
    };

    // Inherits from ol.control.Control
    ol.inherits(LayerImport, ol.control.Control);

    /**
     * @lends module:LayerImport
     */
    LayerImport.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les méthodes de la classe commune LayerImportDOM
    Utils.assign(LayerImport.prototype, LayerImportDOM);

    /**
     * Constructor (alias)
     *
     * @private
     */
    LayerImport.prototype.constructor = LayerImport;

    // ################################################################### //
    // ############## public methods (getters, setters) ################## //
    // ################################################################### //

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    LayerImport.prototype.getCollapsed = function () {
        return this.collapsed;
    };

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    LayerImport.prototype.setCollapsed = function (collapsed) {
        if ( collapsed === undefined ) {
            console.log("[ERROR] LayerImport:setCollapsed - missing collapsed parameter");
            return;
        }
        if ( ( collapsed && this.collapsed) || ( !collapsed && !this.collapsed ) ) {
            return;
        }
        if ( collapsed ) {
            document.getElementById("GPimportPanelClose-" + this._uid).click();
        } else {
            document.getElementById("GPshowImport-" + this._uid).click();
        }
        this.collapsed = collapsed;
    };


    /**
     * Returns content of a static import (KML or GPX)
     *
     * @returns {String} contentStatic  - content static
     */
    LayerImport.prototype.getStaticImportContent = function () {
        return this.contentStatic;
    };

    /**
     * Returns content of a service import (GetCapabilities)
     *
     * @returns {String} contentService  - content service
     */
    LayerImport.prototype.getServiceImportContent = function () {
        return this.contentService;
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize LayerImport control (called by LayerImport constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    LayerImport.prototype._initialize = function (options) {

        // ############################################################ //
        // ################### Options du composant ################### //

        // check input options format
        this._checkInputOptions(options);

        // set default options
        this.options = {
            collapsed : true,
            // layerTypes : ["KML", "GPX", "WMS", "WMTS", "WFS"],
            layerTypes : ["KML", "GPX", "WMS", "WMTS"],
            webServicesOptions : {}
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if reverseGeocoding control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // si une requête est en cours ou non
        this._waiting = false;
        // timer pour cacher la patience après un certain temps
        this._timer = null;

        // #################################################################### //
        // ############### initialisation des types d'import ################## //

        this._currentImportType = "KML";
        this._isCurrentImportTypeStatic = true;
        this._currentStaticImportType = "local";

        // ################################################################## //
        // ################### Elements principaux du DOM ################### //

        // containers principaux (FIXME : tous utiles ?)
        this._showImportInput = null;
        this._importPanel = null;
        this._formContainer = null;
        this._staticLocalImportInput = null;
        this._staticUrlImportInput = null;
        this._serviceUrlImportInput = null;
        this._getCapPanel = null;
        this._getCapResultsListContainer = null;
        this._waitingContainer = null;

        // ################################################################## //
        // ################ Interrogation du GetCapabilities ################ //

        this._getCapRequestUrl = null;
        this._getCapResponseWMS = null;
        this._getCapResponseWMSLayers = [];
        this._getCapResponseWMTS = null;
        this._getCapResponseWMTSLayers = [];

    };

    /**
     * this method is called by this.initialize()
     * and makes sure input options are correctly formated
     *
     * @param {Object} options - control input options
     * @private
     */
    LayerImport.prototype._checkInputOptions = function (options) {
        // on vérifie le tableau des types
        if ( options.layerTypes ) {
            var layerTypes = options.layerTypes;
            // on vérifie que la liste des types est bien un tableau
            if ( !Array.isArray(layerTypes) ) {
                console.log("[ol.control.LayerImport] 'options.layerTypes' parameter should be an array");
                layerTypes = null;
            }
            var typesList = ["KML", "GPX", "WMS", "WMTS", "WFS"];
            var wrongTypesIndexes = [];
            for ( var i = 0; i < layerTypes.length; i++ ) {
                if ( typeof layerTypes[i] !== "string" ) {
                    // si l'élément du tableau n'est pas une chaine de caractères, on stocke l'index pour le retirer du tableau
                    wrongTypesIndexes.push(i);
                    console.log("[ol.control.LayerImport] 'options.layerTypes' elements should be of type string (" + layerTypes[i] + ")");
                } else {
                    // on passe en majuscules pour comparer
                    layerTypes[i] = layerTypes[i].toUpperCase();
                    if ( typesList.indexOf(layerTypes[i]) === -1 ) {
                        // si le type n'est pas référencé, on stocke son index pour le retirer du tableau (après avoir terminé de parcourir le tableau)
                        wrongTypesIndexes.push(i);
                        console.log("[ol.control.LayerImport] options.layerTypes : " + layerTypes[i] + " is not a supported type");
                    }
                }
            }
            // on retire les types non référencés qu'on a pu rencontrer
            if ( wrongTypesIndexes.length !== 0 ) {
                for ( var j = wrongTypesIndexes.length - 1; j >= 0 ; j-- ) {
                    layerTypes.splice(wrongTypesIndexes[j], 1);
                }
            }
        }
    };

    /**
     * Create control main container (DOM initialize)
     *
     * @private
     * @returns {DOMElement} container - control main container
     */
    LayerImport.prototype._initContainer = function () {

        // create main container
        var container = this._createMainContainerElement();

        // create show Import element
        var inputShow = this._showImportInput = this._createShowImportElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if ( !this.collapsed ) {
            inputShow.checked = true;
        }

        // create Import picto
        var picto = this._createShowImportPictoElement();
        container.appendChild(picto);

        // panel
        var importPanel = this._importPanel = this._createImportPanelElement();

        // header
        var panelHeader = this._createImportPanelHeaderElement();
        importPanel.appendChild(panelHeader);

        // form : initialisation du formulaire d'import des couches (types d'import et saisie de l'url / du fichier)
        var importForm = this._formContainer = this._initInputFormElement();
        importPanel.appendChild(importForm);

        container.appendChild(importPanel);

        // results (dans le panel)
        var getCapPanel = this._getCapPanel = this._createImportGetCapPanelElement();
        getCapPanel.appendChild(this._createImportGetCapPanelHeaderElement());
        var importGetCapResultsList = this._getCapResultsListContainer = this._createImportGetCapResultsListElement();
        getCapPanel.appendChild(importGetCapResultsList);

        container.appendChild(getCapPanel);

        // waiting
        var waiting = this._waitingContainer = this._createImportWaitingElement();
        container.appendChild(waiting);

        return container;
    };

    /**
     * Create control main container (DOM initialize)
     *
     * @private
     * @returns {DOMElement} importForm - form main container
     */
    LayerImport.prototype._initInputFormElement = function () {
        // form main container
        var importForm = this._createImportPanelFormElement();

        // Format choice
        var importTypeChoiceDiv = this._createImportTypeLineElement(this.options.layerTypes);
        importForm.appendChild(importTypeChoiceDiv);

        // params for KML/GPX

        var importStaticParamsContainer = this._createImportStaticParamsContainer(this.options.layerTypes[0]);
        // static file name
        var staticNameLabel = this._createStaticNameLabel();
        importStaticParamsContainer.appendChild(staticNameLabel);
        // static import choice (local / url)
        var staticImportChoice = this._createStaticModeChoiceDiv();
        // TODO : passer un paramètre "checked" ??
        var staticLocalImportChoice = this._createStaticLocalChoiceDiv();
        staticImportChoice.appendChild(staticLocalImportChoice);
        var staticUrlImportChoice = this._createStaticUrlChoiceDiv();
        staticImportChoice.appendChild(staticUrlImportChoice);
        importStaticParamsContainer.appendChild(staticImportChoice);

        // div for local file import
        var staticLocalInputDiv = this._createStaticLocalInputDiv();
        // label
        staticLocalInputDiv.appendChild(this._createStaticLocalInputLabel());
        // file input
        this._staticLocalImportInput = this._createStaticLocalInput();
        staticLocalInputDiv.appendChild(this._staticLocalImportInput);
        // append div to params container
        importStaticParamsContainer.appendChild(staticLocalInputDiv);

        // div for url input (info: séparation pour récupérer l'élément input)
        var staticUrlInputDiv = this._createStaticUrlInputDiv();
        // label
        staticUrlInputDiv.appendChild(this._createStaticUrlInputLabel());
        // url input
        this._staticUrlImportInput = this._createStaticUrlInput();
        staticUrlInputDiv.appendChild(this._staticUrlImportInput);
        // append div to params container
        importStaticParamsContainer.appendChild(staticUrlInputDiv);

        // append static params container to form container
        importForm.appendChild(importStaticParamsContainer);

        // params for WMS/WMTS/WFS

        var importServiceParamsContainer = this._createServiceParamsContainer(this.options.layerTypes[0]);
        // div for service url
        var importServiceUrlDiv = this._createServiceUrlDiv();
        // label
        importServiceUrlDiv.appendChild(this._createServiceUrlInputLabel());
        // input
        this._serviceUrlImportInput = this._createServiceUrlInput();
        importServiceUrlDiv.appendChild(this._serviceUrlImportInput);
        // append div to params container
        importServiceParamsContainer.appendChild(importServiceUrlDiv);
        // append service params container to form container
        importForm.appendChild(importServiceParamsContainer);

        // submit (bouton "Importer")
        var submit = this._createImportSubmitFormElement();
        importForm.appendChild(submit);

        return importForm;
    };

    // ################################################################### //
    // ######################### DOM events ############################## //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPshowImportPicto' picto
     * (cf. LayerImportDOM._createShowImportPictoElement),
     * and dispatch event change:collapsed (for tools listening this property)
     *
     * @private
     */
    LayerImport.prototype._onShowImportClick = function () {
        this.collapsed = this._showImportInput.checked;
        // info : on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.LayerImport.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
    };

    /**
     * this method is called by event 'change' on 'GPimportType' tag form
     * (cf. LayerImportDOM._createImportTypeLineElement),
     * and change current import type
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    LayerImport.prototype._onImportTypeChange = function (e) {
        this._currentImportType = e.target.value;
        if ( this._currentImportType === "KML" || this._currentImportType === "GPX" ) {
            this._isCurrentImportTypeStatic = true;
        } else if ( this._currentImportType === "WMS" || this._currentImportType === "WMTS" || this._currentImportType === "WFS" ) {
            this._isCurrentImportTypeStatic = false;
        }
    };

    /**
     * this method is called by event 'change' on 'GPimportType' tag form
     * (cf. LayerImportDOM._createImportTypeLineElement),
     * and change current import type
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    LayerImport.prototype._onStaticImportTypeChange = function (e) {
        this._currentStaticImportType = e.target.value;
    };

    /**
     * this method is called by event 'click' on 'GPimportGetCapPanelClose' tag form
     * (cf. LayerImportDOM._createImportGetCapPanelHeaderElement),
     * and reset getCapabilities information
     *
     * @private
     */
    LayerImport.prototype._onGetCapPanelClose = function () {
        this._clearGetCapParams();
        this._emptyGetCapResultsList();
    };

    // ################################################################### //
    // ######################## Submit form ############################## //
    // ################################################################### //

    /**
     * this method is called by event 'submit' on 'GPimportForm' tag form
     * (cf. LayerImportDOM._createImportPanelFormElement),
     * and import static layer or call getCap service (according to import type)
     *
     * @private
     */
    LayerImport.prototype._onImportSubmit = function () {

        logger.log("import d'une couche de type : " + this._currentImportType);

        // reinitialisation du contenu d'un import de type
        // - static (KML ou GPX)
        this.contentStatic = null;
        // - service (WMS, ...)
        this.contentService = null;

        if ( this._isCurrentImportTypeStatic ) {
            this._importStaticLayer();
        } else {
            this._importServiceLayers();
        }
    };

    // ################################################################### //
    // ##################### Import KML/GPX layers ####################### //
    // ################################################################### //

    /**
     * this method is called by this_onImportSubmit method
     * and import static layer (KML/GPX) from url or file
     *
     * @private
     */
    LayerImport.prototype._importStaticLayer = function () {

        var layerName;
        var staticImportNameInput = document.getElementById(this._addUID("GPimportName"));
        if ( staticImportNameInput ) {
            layerName = staticImportNameInput.value;
            logger.log("import layer name : " + layerName);
        }

        if ( this._currentStaticImportType === "local" ) {
            logger.log("import static layer from local file");
            this._importStaticLayerFromLocalFile(layerName);

        } else if ( this._currentStaticImportType === "url" ) {
            logger.log("import static layer from url");
            this._importStaticLayerFromUrl(layerName);
        }

    };

    /**
     * this method is called by _importStaticLayer method
     * and import static layer (KML/GPX) from url
     *
     * @param {String} layerName - imported layer name
     * @private
     */
    LayerImport.prototype._importStaticLayerFromUrl = function (layerName) {
        layerName = layerName || "";

        // 1. Récupération de l'url
        var url = this._staticUrlImportInput.value;
        logger.log("url : ", url);
        if ( url.length === 0 ) {
            console.log("[ol.control.LayerImport] url parameter is mandatory");
            return;
        }
        // on supprime les éventuels espaces avant ou après
        if ( url.trim ) {
            url = url.trim();
        }

        // 2. récupération proxy
        if ( !this.options.webServicesOptions || ( !this.options.webServicesOptions.proxyUrl && !this.options.webServicesOptions.noProxyDomains ) ) {
            console.log("[ol.control.LayerImport] options.webServicesOptions.proxyUrl parameter is mandatory to request resources on another domain (cross-domain)");
            return;
        };
        var proxyUrl = this.options.webServicesOptions.proxyUrl;
        var noProxyDomains = this.options.webServicesOptions.noProxyDomains;
        // on regarde si l'url nest pas dans les domaines sans proxy
        var bfound = false;
        if ( noProxyDomains && Array.isArray(noProxyDomains) && noProxyDomains.length > 0 ) {
            for (var i in noProxyDomains) {
                logger.log("analyzing " + noProxyDomains[i]);
                if ( url.indexOf(noProxyDomains[i]) !== -1 ) {
                    logger.log(url + " found in noProxyDomains list (" + noProxyDomains[i] + ").") ;
                    bfound = true;
                }
            }
        }
        // si on n'est pas dans un domaine sans proxy, on ajoute le proxy (+ encodage)
        if ( bfound === false ) {
            url = proxyUrl + encodeURIComponent(url);
        }

        // FIXME pb de surcharge en mode UMD !? ça ne marche pas...
        // this._hideWaitingContainer();
        // this._addFeaturesFromImportStaticLayerUrl(url, layerName);

        var context = this;
        Gp.Protocols.XHR.call({
            url : url,
            method : "GET",
            timeOut : 15000,
            /** on success callback : display results in container */
            onResponse : function (response) {

                context._hideWaitingContainer();
                context._addFeaturesFromImportStaticLayer(response, layerName);

            },
            /** on error callback : log error */
            onFailure : function (error) {
                // en cas d'erreur, on revient au panel initial et on cache la patience
                context._hideWaitingContainer();
                console.log("[ol.control.LayerImport] Kml/Gpx request failed : ", error);
            }
        });
    };

    /**
     * this method is called by _importStaticLayer method
     * and import static layer (KML/GPX) from local file
     *
     * @param {String} layerName - imported layer name
     * @private
     */
    LayerImport.prototype._importStaticLayerFromLocalFile = function (layerName) {
        var file = this._staticLocalImportInput.files[0];
        if ( !file ) {
            console.log("[ol.control.LayerImport] missing file");
            return;
        }

        // Création d'un objet FileReader qui permet de lire le contenu du fichier chargé
        var fReader = new FileReader();

        // Définition des fonctions de callbacks associées au reader,
        // notamment la fonction onload qui affichera les entités chargées à la carte
        var context = this;
        /** on readAsText error */
        fReader.onerror = function (e) {
            // en cas d'erreur, on revient au panel initial et on cache la patience
            context._hideWaitingContainer();
            logger.log("error fileReader : ",e);
        };
        /** on readAsText progress */
        fReader.onprogress = function () {
            logger.log("onprogress");
        };
        /** on load start */
        fReader.onloadstart = function () {
            // affichage d'une patience le temps du chargement
            context._displayWaitingContainer();
            logger.log("onloadstart");
        };
        /** on readAsText abort */
        fReader.onabort = function () {
            // en cas d'erreur, on revient au panel initial et on cache la patience
            context._hideWaitingContainer();
            logger.log("onabort");
        };
        /** on readAsText loadend */
        fReader.onloadend = function (e) {
            // fReader = null ?
            // en cas d'erreur, on revient au panel initial et on cache la patience
            // context._hideWaitingContainer();
            // TODO : replier le formulaire ?
            logger.log("onloadend : ", e);
        };
        /** on readAsText load */
        fReader.onload = function (e) {
            logger.log("fileReader onload - file content : ", e.target.result);

            // on cache la patience
            context._hideWaitingContainer();
            context._addFeaturesFromImportStaticLayer(e.target.result, layerName);
        };

        // Lecture du fichier chargé à l'aide de fileReader
        fReader.readAsText(file);
    };

    /**
     * this method is called by _importStaticLayerFom* method
     * and add features to the map
     *
     * @param {String} fileContent - content file
     * @param {String} layerName - imported layer name
     * @private
     */
    LayerImport.prototype._addFeaturesFromImportStaticLayer = function (fileContent, layerName) {

        // récupération du contenu du fichier
        var map = this.getMap();
        if ( !map || !fileContent ) {
            return;
        }

        // sauvegarde du content KML/GPX
        this.contentStatic = fileContent;

        var format;
        if ( this._currentImportType === "KML" ) {
            // lecture du fichier KML : création d'un format ol.format.KML, qui possède une méthode readFeatures (et readProjection)
            format = new KMLExtended({
                showPointNames : false // FIXME !
            });
        } else if ( this._currentImportType === "GPX" ) {
            // lecture du fichier GPX : création d'un format ol.format.GPX, qui possède une méthode readFeatures (et readProjection)
            format = new ol.format.GPX();
        }

        // lecture de la géométrie des entités à partir du fichier, pour éventuelle reprojection.
        var fileProj = format.readProjection(fileContent);
        // récupération de la projection de la carte pour reprojection des géométries
        var mapProj = this._getMapProjectionCode();

        // récupération des entités avec reprojection éventuelle des géométries
        var features = null;
            features = format.readFeatures(
                fileContent,
                {
                    dataProjection : fileProj,
                    featureProjection : mapProj
                }
            );

        logger.log("loaded features : ", features);

        // création d'une couche vectorielle à partir de ces features
        var vectorSource = new ol.source.Vector({
            features : features
        });

        // ajout des informations pour le layerSwitcher (titre, description)
        if ( layerName ) {
            vectorSource._title = vectorSource._description = layerName;
        } else {
            if ( format.readName && format.readName(fileContent) ) {
                vectorSource._title = vectorSource._description = format.readName(fileContent);
            } else {
                vectorSource._title = vectorSource._description = "Import " + this._currentImportType;
                logger.log("[ol.control.LayerImport] set default name \"Import " + this._currentImportType + "\"");
            }
        }

        var vectorLayer = new ol.layer.Vector({
            source : vectorSource
        });

        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        vectorLayer.gpResultLayerId = "layerimport:" + this._currentImportType;
        map.addLayer(vectorLayer);

        // TODO : appeler fonction commune
        // zoom sur l'étendue des entités récupérées (si possible)
        if ( map.getView() && map.getSize() && vectorSource.getExtent ) {
            var sourceExtent = vectorSource.getExtent();
            if ( sourceExtent && sourceExtent[0] !== Infinity ) {
                map.getView().fit(vectorSource.getExtent(), map.getSize());
            }
        }
    };

    /**
     * NOT USE : this method is called by _importStaticLayerFom* method
     * and add features to the map
     *
     * @param {String} url - url
     * @param {String} layerName - imported layer name
     * @private
     */
    LayerImport.prototype._addFeaturesFromImportStaticLayerUrl = function (url, layerName) {

        // récupération du contenu du fichier
        var map = this.getMap();
        if ( !map || !url ) {
            return;
        }

        var format;
        if ( this._currentImportType === "KML" ) {
            // lecture du fichier KML : création d'un format ol.format.KML, qui possède une méthode readFeatures (et readProjection)
            format = new KMLExtended({
                showPointNames : false // FIXME !
            });
        } else if ( this._currentImportType === "GPX" ) {
            // lecture du fichier GPX : création d'un format ol.format.GPX, qui possède une méthode readFeatures (et readProjection)
            format = new ol.format.GPX();
        }

        // création d'une couche vectorielle à partir de ces features
        var vectorSource = new ol.source.Vector({
            url : url,
            format : format
        });

        // ajout des informations pour le layerSwitcher (titre, description)
        if ( layerName ) {
            vectorSource._title = vectorSource._description = layerName;
        } else {
            vectorSource._title = vectorSource._description = "Import " + this._currentImportType;
        }

        var vectorLayer = new ol.layer.Vector({
            source : vectorSource
        });

        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        vectorLayer.gpResultLayerId = "layerimport:" + this._currentImportType;
        map.addLayer(vectorLayer);

        // TODO : appeler fonction commune
        // zoom sur l'étendue des entités récupérées (si possible)
        if ( map.getView() && map.getSize() && vectorSource.getExtent ) {
            var sourceExtent = vectorSource.getExtent();
            if ( sourceExtent && sourceExtent[0] !== Infinity ) {
                map.getView().fit(vectorSource.getExtent(), map.getSize());
            }
        }
    };

    // ################################################################### //
    // #################### Import WMS/WMTS layers ####################### //
    // ################################################################### //

    /**
     * this method is called by this_onImportSubmit method
     * and call getCap service from specified url, then display layers list in new panel
     *
     * @private
     */
    LayerImport.prototype._importServiceLayers = function () {

        if ( this._currentImportType === "WFS" ) {
            console.log("[ol.control.LayerImport] WFS layer import is not implemented yet");
            return;
        }

        // 0. on vide d'éventuels résultats précédents dans le panel GetCapResults
        this._emptyGetCapResultsList();

        // 1. récupération de l'url renseignée
        var url = this._getCapRequestUrl = this._serviceUrlImportInput.value;
        if ( !url ) {
            console.log("[ol.control.LayerImport] url parameter is mandatory");
            return;
        }
        logger.log("url : ",url);

        // on supprime les éventuels espaces avant ou après
        if ( url.trim ) {
            url = url.trim();
        }
        // Info : on ajoute des paramètres uniquement si l'utilisateur n'en a pas déjà saisi (on vérifie la position du caractère "?")
        var questionMarkIndex = url.indexOf("?");
        if ( questionMarkIndex < 0 ) {
            // dans le cas d'une url du type http://wxs.ign.fr/geoportail/wmts
            url += "?SERVICE=" + this._currentImportType + "&REQUEST=GetCapabilities";
        } else if ( questionMarkIndex === ( url.length - 1 ) ) {
            // dans le cas où l'url se termine par "?"
            url += "SERVICE=" + this._currentImportType + "&REQUEST=GetCapabilities";
        }
        // si on n'est pas dans ces deux cas : l'utilisateur a déjà saisit des paramètres après "?" => on ne fait rien.

        // 2. récupération proxy
        if ( !this.options.webServicesOptions || ( !this.options.webServicesOptions.proxyUrl && !this.options.webServicesOptions.noProxyDomains ) ) {
            console.log("[ol.control.LayerImport] options.webServicesOptions.proxyUrl parameter is mandatory to request web service layers (getcapabilities request)");
            return;
        };
        var proxyUrl = this.options.webServicesOptions.proxyUrl;
        var noProxyDomains = this.options.webServicesOptions.noProxyDomains;
        // on regarde si l'url nest pas dans les domaines sans proxy
        var bfound = false;
        if ( noProxyDomains && Array.isArray(noProxyDomains) && noProxyDomains.length > 0 ) {
            for (var i in noProxyDomains) {
                logger.log("analyzing " + noProxyDomains[i]);
                if ( url.indexOf(noProxyDomains[i]) !== -1 ) {
                    logger.log(url + " found in noProxyDomains list (" + noProxyDomains[i] + ").") ;
                    bfound = true;
                }
            }
        }
        // si on n'est pas dans un domaine sans proxy, on ajoute le proxy (+ encodage)
        if ( bfound === false ) {
            url = proxyUrl + encodeURIComponent(url);
        }

        // 3. affichage d'une patience le temps de la requête
        this._displayWaitingContainer();

        // 4. send getcapabilities request (XHR protocol => proxy Url is needed)
        var context = this;
        Gp.Protocols.XHR.call({
            url : url,
            method : "GET",
            timeOut : 15000,
            /** on success callback : display results in container */
            onResponse : function (response) {
                context._hideWaitingContainer();
                context._displayGetCapResponseLayers.call(context, response);
            },
            /** on error callback : log error */
            onFailure : function (error) {
                // en cas d'erreur, on revient au panel initial et on cache la patience
                context._hideWaitingContainer();
                console.log("[ol.control.LayerImport] getCapabilities request failed : ", error);
            }
        });
    };

    /**
     * this method is called by this._importServiceLayers method
     * and display layers list from getcapabilities response
     *
     * @param {Object} xmlResponse - getCapabilities response (xml format)
     * @private
     */
    LayerImport.prototype._displayGetCapResponseLayers = function (xmlResponse) {

        var parser;
        var layers;
        var layerDescription;
        var projection;
        this._getCapResponseWMSLayers = [];

        // sauvegarde du content d'un GetCapabilities
        this.contentService = xmlResponse;

        // Affichage du panel des couches accessibles
        this._importPanel.style.display = "none";
        this._getCapPanel.style.display = "block";

        // Parse GetCapabilities Response
        if ( this._currentImportType === "WMS" ) {

            parser = new ol.format.WMSCapabilities();
            if ( !parser ) {
                return;
            }
            var getCapResponseWMS = this._getCapResponseWMS = parser.read(xmlResponse);
            logger.log("getCapabilities response : ", getCapResponseWMS);

            if ( getCapResponseWMS && getCapResponseWMS.Capability && getCapResponseWMS.Capability.Layer ) {
                // info: le parser OL3 récupère la première layer de <Capability> comme un unique objet (il écrase les précédents s'il y a pls <Layer> à la racine de <Capability>)
                // /!\ être vigilant si le parser est modifié (notamment pour récupérer les différentes layers à la racine. ex  http://geoservices.brgm.fr/geologie?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities)

                var getCapLayer = getCapResponseWMS.Capability.Layer;
                // on va lire le contenu de la (ou les) <Layer> pour l'afficher ou en afficher les couches disponibles
                if ( Array.isArray(getCapLayer) ) {
                    // cas où on a plusieurs <Layer> à la racine, mais non géré encore par ol.format.WMSCapabilities jusqu'à la v3.18.2.
                    for ( var i = 0; i < getCapLayer.length; i ++ ) {
                        this._displayGetCapResponseWMSLayer(getCapLayer[i]);
                    }
                } else {
                    // cas du parser ol.format.WMSCapabilities jusqu'à la v3.18.2.
                    this._displayGetCapResponseWMSLayer(getCapLayer);
                }
            }

        } else if ( this._currentImportType === "WMTS" ) {

            parser = new ol.format.WMTSCapabilities();
            if ( !parser ) {
                return;
            }
            var getCapResponseWMTS = this._getCapResponseWMTS = parser.read(xmlResponse);
            logger.log("getCapabilities response : ", getCapResponseWMTS);

            if ( getCapResponseWMTS && getCapResponseWMTS.Contents && getCapResponseWMTS.Contents.Layer ) {
                layers = getCapResponseWMTS.Contents.Layer;

                if ( Array.isArray(layers) ) {
                    // on stocke la liste des couches pour faire le lien avec le DOM
                    this._getCapResponseWMTSLayers = layers;

                    for ( var j = 0; j < layers.length; j ++ ) {
                        // on vérifie que la projection de la couche WMTS est compatible avec celle de la carte
                        // (ie elle doit être connue par ol.proj)
                        projection = this._getWMTSLayerProjection(layers[j], getCapResponseWMTS);
                        if ( projection && typeof projection === "string" ) {
                            if ( ol.proj.get(projection) || ol.proj.get(projection.toUpperCase()) ) {
                                // si la projection de la couche est connue par ol.proj,
                                // on ajoute chaque couche de la réponse dans la liste des couches accessibles
                                layerDescription = layers[j].Title;
                                if ( this._getCapResultsListContainer ) {
                                    this._getCapResultsListContainer.appendChild(this._createImportGetCapResultElement(layerDescription, j));
                                }
                            } else {
                                // si la projection de la couche n'est pas connue par ol.proj,
                                // on n'affiche pas la couche dans le panel des résultats
                                console.log("[ol.control.LayerImport] wmts layer cannot be added to map : unknown projection", layers[j]);
                                continue;
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * this method is called by this._displayGetCapResponseLayers method
     * and display WMS layer in list from getcapabilities response
     *
     * @param {Object} layerObj - object corresponding to <Layer> content in WMS GetCapabilities response
     * @param {Object} [parentLayersObj] - object corresponding to parents <Layer> content in WMS GetCapabilities response (without children <Layer> infos)
     * @private
     */
    LayerImport.prototype._displayGetCapResponseWMSLayer = function (layerObj, parentLayersInfos) {
        if ( !layerObj ) {
            console.log("[ol.control.LayerImport] _displayGetCapResponseWMSLayer : getCapabilities layer object not found");
        } else {
            logger.log("[ol.control.LayerImport] _displayGetCapResponseWMSLayer - layerObj : ", layerObj);
        }

        // récupération de la projection de la map (pour vérifier que l'on peut reprojeter les couches disponibles)
        var mapProjCode = this._getMapProjectionCode();
        var projection;
        var layerDescription;

        // 1. héritage éventuels des informations de la couche parent
        if ( parentLayersInfos ) {
            var key;
            var i;

            // propriétés héritées à ajouter aux propriétés parent
            var addKeys = [
                "CRS",
                "Style"
                // "AuthorityURL" // TODO
            ];
            for ( i = 0; i < addKeys.length; i ++ ) {
                key = addKeys[i];
                if ( Array.isArray(parentLayersInfos[key]) && parentLayersInfos[key].length !== 0 ) {
                    if ( Array.isArray(layerObj[key]) && layerObj[key].length !== 0 ) {
                        // on ajoute celles de la couche parent
                        for ( var n = 0; n < parentLayersInfos[key]; n ++ ) {
                            if ( layerObj[key].indexOf(parentLayersInfos[key][n]) === -1 ) {
                                // si le CRS/Style parent n'est pas dans les CRS/Style de la couche, on l'ajoute
                                layerObj[key].push(parentLayersInfos[key][n]);
                            }
                        }
                    } else {
                        // si la couche n'a pas de CRS ou Style, on récupère ceux de la couche parent
                        layerObj[key] = parentLayersInfos[key];
                    }
                }
            }

            // propriétés qui remplacent les valeurs des propriétés héritées,
            // càd on récupère la propriété parent seulement si elle n'est pas définie pour l'élément enfant
            var replaceKeys = [
                "BoundingBox",
                "EX_GeographicBoundingBox",
                "MaxScaleDenominator",
                "MinScaleDenominator",
                "Attribution",
                "Dimension",
                "queryable",
                "cascaded",
                "opaque",
                "noSubsets",
                "fixedWidth",
                "fixedHeight"
            ];
            for ( i = 0; i < replaceKeys.length; i ++ ) {
                key = replaceKeys[i];
                if ( parentLayersInfos[key] && !layerObj[key] ) {
                    layerObj[key] = parentLayersInfos[key];
                }
            }
            // on affiche l'arborescence dans le titre de la couche (sauf si on est au premier niveau ?)
            if ( !parentLayersInfos._isRootLayer && parentLayersInfos.Title ) {
                layerObj.Title = parentLayersInfos.Title + " > " + layerObj.Title;
            }

        }else {
            // si on n'a pas d'infos de couche parent, on est à la racine du Capability, on le note
            layerObj._isRootLayer = true;
        }

        // 2. si on a d'autres couches <Layer> imbriquées, on descend d'un niveau, sinon on affiche la couche dans la liste des résultats
        if ( layerObj.Layer ) {
            if ( Array.isArray(layerObj.Layer) ) {
                for ( var j = 0; j < layerObj.Layer.length; j ++ ) {
                    // on recommence pour chaque sous couche, avec les infos éventuellement héritées
                    this._displayGetCapResponseWMSLayer(layerObj.Layer[j], layerObj);
                }
            }
        } else {

            // on récupère la longueur de la liste des couches déjà récupérées, pour avoir ce qui sera l'index de la couche à ajouter.
            var lastIndex = this._getCapResponseWMSLayers.length;

            // on vérifie que la couche ait une projection compatible avec celle de la carte
            // ou soit connue par proj4js, et on stocke cette projection dans les infos de la couche.
            projection = this._getWMSLayerProjection(layerObj, mapProjCode);

            if ( !projection ) {
                // si aucune projection n'est compatible avec celle de la carte ou connue par ol.proj,
                // on n'affiche pas la couche dans le panel des résultats
                console.log("[ol.control.LayerImport] wms layer cannot be added to map : unknown projection", layerObj);

            } else {
                // si on a une projection compatible : on la stocke et la couche sera éventuellement reprojetée à l'ajout
                layerObj._projection = projection;
                // on ajoute chaque couche de la réponse dans la liste des couches accessibles
                layerDescription = layerObj.Title;
                if ( this._getCapResultsListContainer ) {
                    this._getCapResultsListContainer.appendChild(this._createImportGetCapResultElement(layerDescription, lastIndex));
                }
                // puis on stoke la couche dans la liste pour faire le lien avec le DOM
                this._getCapResponseWMSLayers[lastIndex] = layerObj;
            }
        }
    };

    /**
     * this method is called on 'GPimportGetCapProposal' div click
     * and add corresponding layer to map
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    LayerImport.prototype._onGetCapResponseLayerClick = function (e) {
        if ( e.target && e.target.id ) {
            var proposalId = parseInt(e.target.id.substr(23), 10);

            if ( proposalId == null ) {
                return;
            }

            var layerInfo;

            if ( this._currentImportType === "WMS" ) {
                // récupération des informations liées à la couche
                layerInfo = this._getCapResponseWMSLayers[proposalId];
                // ajout de la couche à la carte
                this._addGetCapWMSLayer(layerInfo);

            } else if ( this._currentImportType === "WMTS" ) {
                // récupération des informations liées à la couche
                layerInfo = this._getCapResponseWMTSLayers[proposalId];
                // ajout de la couche à la carte
                this._addGetCapWMTSLayer(layerInfo);
            }

        }
    };

    // ################################################################### //
    // ######### create WMS layer from getCapabilities response ######### //
    // ################################################################### //

    /**
     * this method is called by this._onGetCapResponseLayerClick
     * and add WMS layer to map using parameters from getCapabilities response
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @private
     */
    LayerImport.prototype._addGetCapWMSLayer = function (layerInfo) {
        var map = this.getMap();
        if ( !map ) {
            console.log("[ol.control.LayerImport] _addGetCapWMSLayer error : map is not defined");
            return;
        }
        if ( !layerInfo ) {
            console.log("[ol.control.LayerImport] _addGetCapWMSLayer error : layerInfo is not defined");
            return;
        }

        // récupération de la projection de la carte
        var mapProjCode = this._getMapProjectionCode();

        var wmsSourceOptions = {};

        // Récupération de l'url
        var getMapUrl = this._getWMSLayerGetMapUrl();
        // on essaie de récupérer l'url du service dans le getCapbilities
        if ( getMapUrl ) {
            wmsSourceOptions.url = getMapUrl;
        } else {
            // sinon, on récupère l'url du getCapabilities, à laquelle on enlève éventuellement les paramètres
            var questionMarkIndex = this._getCapRequestUrl.indexOf("?");
            if ( questionMarkIndex !== -1 ) {
                wmsSourceOptions.url = this._getCapRequestUrl.substring(0, questionMarkIndex);
            } else {
                wmsSourceOptions.url = this._getCapRequestUrl;
            }
        }

        wmsSourceOptions.params = {};
        if ( layerInfo.Name ) {
            wmsSourceOptions.params["LAYERS"] = layerInfo.Name;
        } else {
            console.log("[ol.control.LayerImport] unable to add wms layer : mandatory layer 'name' parameter cannot be found", layerInfo);
            return;
        }
        wmsSourceOptions.params["SERVICE"] = "WMS";
        if ( this._getCapResponseWMS.version ) {
            wmsSourceOptions.params["VERSION"] = this._getCapResponseWMS.version;
        }

        // on a déjà vérifié que la couche peut être reprojetée,
        // on vérifie que la couche ait une projection compatible avec celle de la carte
        // ou soit connue par proj4js
        var projection = layerInfo._projection;
        if ( !projection ) {
            console.log("[ol.control.LayerImport] wms layer cannot be added to map : unknown projection");
            return;
        } else if ( projection !== mapProjCode ) {
            // si la projection de la carte n'est pas disponible pour cette couche,
            // on spécifie une projection (qui doit avoir été définie dans proj4js) pour reprojection par OL3
            wmsSourceOptions.projection = projection;
        }

        // récupération du premier style disponible (pas d'info default?)
        var legend;
        if ( layerInfo.Style && Array.isArray(layerInfo.Style) ) {
            var style = layerInfo.Style[0];
            wmsSourceOptions.params["STYLES"] = style.Name;
            if ( style.LegendURL  && Array.isArray(style.LegendURL) && style.LegendURL.length !== 0 ) {
                legend = style.LegendURL[0].OnlineResource;
            }
        }

        // Création de la source (tester un try catch ?)
        var wmsSource = new ol.source.TileWMS(wmsSourceOptions);
        // ajout des informations pour le layerSwitcher (titre, description, legendes, metadata) ou originators
        this._getWMSLayerInfoForLayerSwitcher(layerInfo, legend, wmsSource);

        var layerTileOptions = {};
        layerTileOptions["source"] = wmsSource;
        // récupération des résolutions min et max de la layer à partir des dénominateurs d'échelle
        this._getWMSLayerMinMaxResolution(layerInfo, mapProjCode, layerTileOptions);
        // récupération de l'étendue (bbox)
        this._getWMSLayerExtent(layerInfo, mapProjCode, layerTileOptions);

        // création de la couche à partir de la source
        var wmsLayer = new ol.layer.Tile(layerTileOptions);
        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        wmsLayer.gpResultLayerId = "layerimport:WMS";
        // on rajoute le champ gpGFIparams permettant d'identifier si la couche est queryable, et de transmettre les formats reconnus par GetFeatureInfo
        if ( layerInfo.queryable ) {
            wmsLayer.gpGFIparams = {
                queryable : true
            };
            // récupération des différents formats reconnus par le GetFeatureInfo
            if ( this._getCapResponseWMS && this._getCapResponseWMS.Capability && this._getCapResponseWMS.Capability.Request && this._getCapResponseWMS.Capability.Request.GetFeatureInfo && this._getCapResponseWMS.Capability.Request.GetFeatureInfo.Format && Array.isArray(this._getCapResponseWMS.Capability.Request.GetFeatureInfo.Format) ) {
                wmsLayer.gpGFIparams.formats = this._getCapResponseWMS.Capability.Request.GetFeatureInfo.Format;
            }
        }

        map.addLayer(wmsLayer);
    };

    /**
     * this method is called by this._addGetCapWMSLayer
     * and gets service getMap request url
     *
     * @return {String} getmapurl - service getMap request url
     * @private
     */
    LayerImport.prototype._getWMSLayerGetMapUrl = function () {
        var getmapurl;
        if ( this._getCapResponseWMS && this._getCapResponseWMS.Capability && this._getCapResponseWMS.Capability.Request && this._getCapResponseWMS.Capability.Request.GetMap ) {
            var getmap = this._getCapResponseWMS.Capability.Request.GetMap;
            if ( getmap.DCPType && Array.isArray(getmap.DCPType) && getmap.DCPType.length !== 0 ) {
                var url = getmap.DCPType[0];
                if ( url && url.HTTP && url.HTTP.Get ) {
                    getmapurl = url.HTTP.Get.OnlineResource;
                }
            }
        }
        return getmapurl;
    };

    /**
     * this method is called by this._addGetCapWMSLayer
     * and gets a projection both available for a given layer and already defined in proj4js (ol.proj)
     * (ol3 raster reprojection will be then able to reproject layer in map projection)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} mapProjCode - map projection code (e.g. "EPSG:4326")
     * @return {String} projection - ol.proj projection alias (e.g. "EPSG:4326")
     * @private
     */
    LayerImport.prototype._getWMSLayerProjection = function (layerInfo, mapProjCode) {
        var projection;

        if ( !layerInfo || typeof layerInfo !== "object" ) {
            logger.log("missing layer information (from getCapabilities)");
            return;
        }

        // on va parcourir la liste des CRS disponibles pour la couche
        // si on trouve la projection de la carte : c'est parfait
        // si on trouve une projection qui est connue par ol.proj : OL3 gère la reprojection
        var CRSList = layerInfo.CRS;
        if ( Array.isArray(CRSList) ) {
            for ( var i = 0; i < CRSList.length; i ++ ) {
                var layerCRS = CRSList[i];
                if ( layerCRS === mapProjCode ) {
                    projection = layerCRS;
                    break;
                } else {
                    if ( layerCRS && typeof layerCRS === "string" ) {
                        if ( ol.proj.get(layerCRS) || ol.proj.get(layerCRS.toUpperCase()) ) {
                            projection = layerCRS;
                            break;
                        }
                    }
                }
            }
        }
        return projection;
    };

    /**
     * this method is called by this._addGetCapWMSLayer
     * and sets minResolution and maxResolution parameters for WMS layer (if available in getCapabilities response)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} mapProjCode - map projection code (e.g. "EPSG:4326")
     * @param {Object} layerTileOptions - options for ol.layer.Tile (to be filled)
     * @private
     */
    LayerImport.prototype._getWMSLayerMinMaxResolution = function (layerInfo, mapProjCode, layerTileOptions) {
        // récupération des résolutions min et max à partir des dénominateurs d'échelle
        var mapUnits = ol.proj.get(mapProjCode).getUnits();
        if ( mapUnits === "m" ) {
            // info : 1 pixel = 0.00028 m
            if ( layerInfo.MinScaleDenominator ) {
                layerTileOptions.minResolution = layerInfo.MinScaleDenominator * 0.00028;
            }
            if ( layerInfo.MaxScaleDenominator ) {
                layerTileOptions.maxResolution = layerInfo.MaxScaleDenominator * 0.00028;
            }
        } else if ( mapUnits === "degrees" ) {
            // info : 6378137 * 2 * pi / 360 = rayon de la terre (ellipsoide WGS84)
            var cste = 0.00028 * 180 / ( Math.PI * 6378137 );
            if ( layerInfo.MinScaleDenominator ) {
                layerTileOptions.minResolution = layerInfo.MinScaleDenominator * cste;
            }
            if ( layerInfo.MaxScaleDenominator ) {
                layerTileOptions.maxResolution = layerInfo.MaxScaleDenominator * cste;
            }
        }
    };

    /**
     * this method is called by this._addGetCapWMSLayer
     * and sets extent for WMS layer in map projection (if available in getCapabilities response)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} mapProjCode - map projection code (e.g. "EPSG:4326")
     * @param {Object} layerTileOptions - options for ol.layer.Tile (to be filled)
     * @private
     */
    LayerImport.prototype._getWMSLayerExtent = function (layerInfo, mapProjCode, layerTileOptions) {
        if ( !layerInfo ) {
            console.log("[ol.control.LayerImport] _getWMSLayerExtent error : layerInfo is not defined");
            return;
        }

        // récupération des 2 propriétés qui peuvent spécifier l'étendue (bbox) selon les specs OGC WMS 1.3.0 :
        // 1. layerInfo.EX_GeographicBoundingBox est un tableau de type [westBoundLongitude, southBoundLatitude, eastBoundLongitude, northBoundLatitude] en WGS84
        var exGeographicBoundingBox = layerInfo["EX_GeographicBoundingBox"];
        // 2. layerInfo.BoundingBox est un tableau dont chaque élément est un objet (balise bbox) avec les propriétés suivantes :
        // crs (String) et extent (tableau de type [minx, miny, maxx, maxy])
        var boundingBox = layerInfo.BoundingBox;

        if ( exGeographicBoundingBox && Array.isArray(exGeographicBoundingBox) ) {
            if ( mapProjCode === "EPSG:4326" ) {
                // si la projection de la carte est la même que celle de l'extent (EPSG:4326), on la passe telle quelle
                layerTileOptions.extent = exGeographicBoundingBox;
            } else {
                layerTileOptions.extent = ol.proj.transformExtent(exGeographicBoundingBox, "EPSG:4326", mapProjCode);
            }

        // si jamais EX_GeographicBoundingBox n'est pas ou est mal renseigné, on essaie de récupérer via le paramètre BoundingBox
        } else if ( boundingBox && Array.isArray(boundingBox) ) {
            var crs;
            var extent;
            for ( var i = 0; i < boundingBox.length; i++ ) { // on peut avoir plusieurs BoundingBox
                crs = boundingBox[i].crs;
                extent = boundingBox[i].extent;
                if ( crs ) {
                    if ( crs === mapProjCode ) {
                        // si la bbox est dans la projection de la carte, on la passe telle quelle
                        layerTileOptions.extent = extent;
                        break;
                    } else {
                        if ( crs && typeof crs === "string" ) {
                            var olProj = ol.proj.get(crs) ? ol.proj.get(crs) : ol.proj.get(crs.toUpperCase());
                            // if ( ol.proj.get(crs) || ol.proj.get(crs.toUpperCase()) ) {
                            if ( olProj ) {
                                // si la bbox est dans une projection connue, on va la reprojeter
                                // tout d'abord, on gère le cas des systèmes EPSG géographiques : inversion des axes x et y
                                if ( olProj.getUnits() === "degrees" && crs.toUpperCase().indexOf("EPSG") === 0 ) {
                                    // le tableau extent est inversé, on a besoin de : [miny, minx, maxx, maxy]
                                    var reversedExtent = [extent[1], extent[0], extent[3], extent[2]];
                                    layerTileOptions.extent = ol.proj.transformExtent(reversedExtent, olProj, mapProjCode);
                                } else {
                                    // reprojection dans la projection de la carte
                                    layerTileOptions.extent = ol.proj.transformExtent(extent, olProj, mapProjCode);
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * this method is called by this._addGetCapWMSLayer
     * and sets more information about layer (legends, title, description, metadata, originators) for layerSwitcher or attributions controls
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} legend - legend url
     * @param {Object} wmsSource - options for ol.source.TileWMS (to be filled)
     * @private
     */
    LayerImport.prototype._getWMSLayerInfoForLayerSwitcher = function (layerInfo, legend, wmsSource) {
        // ajout des informations pour le layerSwitcher (titre, description)
        if ( layerInfo.Title ) {
            wmsSource._title = layerInfo.Title;
            wmsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Title;
        } else {
            wmsSource._title = layerInfo.Name;
            wmsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Name;
        }
        // ajout de légende si on en a trouvé
        if ( legend ) {
            wmsSource._legends = [{
                url : legend
            }];
        }
        // ajout d'éventuelles métadonnées
        if ( layerInfo.MetadataURL && Array.isArray(layerInfo.MetadataURL) ) {
            wmsSource._metadata = [];
            for ( var i = 0; i < layerInfo.MetadataURL.length; i++ ) {
                var metadata = layerInfo.MetadataURL[i].OnlineResource;
                if ( metadata ) {
                    wmsSource._metadata.push({
                        url : metadata
                    });
                }
            }
        }
        // ajout d'éventuelles attributions / originators
        if ( layerInfo.Attribution ) {
            var attribution = layerInfo.Attribution;
            wmsSource._originators = {};
            if ( attribution.OnlineResource ) {
                wmsSource._originators.url = attribution.OnlineResource;
            }
            if ( attribution.Title ) {
                wmsSource._originators.name = wmsSource._originators.attribution = attribution.Title;
            }
            if ( attribution.LogoURL && attribution.LogoURL.OnlineResource ) {
                wmsSource._originators.logo = attribution.LogoURL.OnlineResource;
            }
        }
    };

    // ################################################################### //
    // ######### create WMTS layer from getCapabilities response ######### //
    // ################################################################### //

    /**
     * this method is called by this._onGetCapResponseLayerClick
     * and add WMTS layer to map using parameters from getCapabilities response
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @private
     */
    LayerImport.prototype._addGetCapWMTSLayer = function (layerInfo) {

        if ( !layerInfo || !layerInfo.Identifier ) {
            console.log("[ol.control.LayerImport] layer information not found in getCapabilities response for layer ");
            return;
        }

        var map = this.getMap();
        if ( !map ) {
            return;
        }

        var wmtsSourceOptions = {};
        wmtsSourceOptions.layer = layerInfo.Identifier;
        // service version
        if ( this._getCapResponseWMTS.version ) {
            wmtsSourceOptions.version = this._getCapResponseWMTS.version;
        }
        // Récupération de l'url
        var getMapUrl = this._getWMTSLayerGetTileUrl();
        // on essaie de récupérer l'url du service dans le getCapbilities
        if ( getMapUrl ) {
            wmtsSourceOptions.url = getMapUrl;
        } else {
            // sinon, on récupère l'url du getCapabilities, à laquelle on enlève éventuellement les paramètres
            var questionMarkIndex = this._getCapRequestUrl.indexOf("?");
            if ( questionMarkIndex !== -1 ) {
                wmtsSourceOptions.url = this._getCapRequestUrl.substring(0, questionMarkIndex);
            } else {
                wmtsSourceOptions.url = this._getCapRequestUrl;
            }
        }

        // Récupération des informations de la pyramide (tileGrid information) : matrixIds, resolutions, origin et projection
        var tmsOptions = this._getTMSParams(layerInfo);
        wmtsSourceOptions.matrixSet = tmsOptions.tms;
        wmtsSourceOptions.projection = tmsOptions.projCode;
        wmtsSourceOptions.tileGrid = new ol.tilegrid.WMTS({
            resolutions : tmsOptions.resolutions,
            matrixIds : tmsOptions.matrixIds,
            origin : tmsOptions.origin
        });

        // Récupération du style par défaut
        var defaultStyle;
        var legend;
        if ( layerInfo.Style && Array.isArray(layerInfo.Style) ) {
            var style;
            for ( var s = 0; s < layerInfo.Style.length; s ++ ) {
                style = layerInfo.Style[s];
                // on récupère le style
                defaultStyle = style.Identifier;
                if ( style.isDefault ) {
                    // si c'est celui par défaut, on le garde (on ne boucle plus sur les autres styles)
                    break;
                }
                // et une éventuelle légende
                if ( style.LegendURL && Array.isArray(style.LegendURL) && style.LegendURL.length !== 0 ) {
                    legend = style.LegendURL[0].href;
                }
            }
        }
        if ( defaultStyle == null ) {
            console.log("[ol.control.LayerImport] style information not found in getCapabilities response for layer " + layerInfo.Identifier);
        }
        wmtsSourceOptions.style = defaultStyle;

        // Récupération du format (le premier trouvé)
        var format;
        if ( layerInfo.Format && Array.isArray(layerInfo.Format) ) {
            format = layerInfo.Format[0];
        }
        if ( format == null ) {
            console.log("[ol.control.LayerImport] format information not found in getCapabilities response for layer " + layerInfo.Identifier);
        }
        wmtsSourceOptions.format = format;

        // Création de la source (tester un try catch ?)
        var wmtsSource = new ol.source.WMTS(wmtsSourceOptions);

        // ajout des informations pour le layerSwitcher (titre, description)
        if ( layerInfo.Title ) {
            wmtsSource._title = layerInfo.Title;
            wmtsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Title;
        } else {
            wmtsSource._title = layerInfo.Identifier;
            wmtsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Identifier;
        }
        // ajout d'une éventuelle légende
        if ( legend ) {
            wmtsSource._legends = [{
                url : legend
            }];
        }

        var layerTileOptions = {};
        layerTileOptions.source = wmtsSource;
        // récupération de l'étendue (bbox)
        layerTileOptions.extent = this._getWMTSLayerExtent(layerInfo);
        var wmtsLayer;
        try {
            wmtsLayer = new ol.layer.Tile(layerTileOptions);
        } catch (e) {
            console.log("[ol.control.LayerImport] an error occured while trying to create ol.layer.Tile from getCapabilities information. error : ", e);
            return;
        }
        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        wmtsLayer.gpResultLayerId = "layerimport:WMTS";

        map.addLayer(wmtsLayer);
    };

    /**
     * this method is called by this._addGetCapWMTSLayer
     * and gets service getTile request url
     *
     * @return {String} gettileurl - service getTile request url
     * @private
     */
    LayerImport.prototype._getWMTSLayerGetTileUrl = function () {
        var gettileurl;
        if ( this._getCapResponseWMTS && this._getCapResponseWMTS.OperationsMetadata && this._getCapResponseWMTS.OperationsMetadata.GetTile ) {
            var gettile = this._getCapResponseWMTS.OperationsMetadata.GetTile;
            if ( gettile.DCP && gettile.DCP.HTTP && gettile.DCP.HTTP.Get && Array.isArray(gettile.DCP.HTTP.Get) && gettile.DCP.HTTP.Get.length !== 0 ) {
                gettileurl = gettile.DCP.HTTP.Get[0].href;
            }
        }
        return gettileurl;
    };

    /**
     * this method is called by this._displayGetCapResponseLayers
     * and gets layer TileMatrixSet projection if defined in proj4js
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {Object} getCapResponseWMTS - whole getCapabilities response
     * @return {String} projection - ol.proj projection alias (e.g. "EPSG:4326")
     * @private
     */
    LayerImport.prototype._getWMTSLayerProjection = function (layerInfo, getCapResponseWMTS) {
        var projection;

        if ( !layerInfo || typeof layerInfo !== "object" ) {
            logger.log("missing layer information (from getCapabilities)");
            return;
        }

        if ( !getCapResponseWMTS || typeof getCapResponseWMTS !== "object" ) {
            logger.log("missing getCapabilities response");
            return;
        }

        if ( layerInfo.TileMatrixSetLink && Array.isArray(layerInfo.TileMatrixSetLink) ) {
            var tms = layerInfo.TileMatrixSetLink[0].TileMatrixSet;
            var crs;
            if ( getCapResponseWMTS.Contents && Array.isArray(getCapResponseWMTS.Contents.TileMatrixSet) ) {
                var tileMatrixSets = getCapResponseWMTS.Contents.TileMatrixSet;
                for ( var i = 0; i < tileMatrixSets.length; i ++ ) {
                    if ( tileMatrixSets[i].Identifier === tms && tileMatrixSets[i].TileMatrix ) {
                        // on a trouvé le TMS correspondant
                        var tileMatrixSet = tileMatrixSets[i];
                        crs = tileMatrixSet.SupportedCRS;
                        if ( crs && typeof crs === "string" ) {
                            if ( ol.proj.get(crs) || ol.proj.get(crs.toUpperCase()) ) {
                                projection = crs;
                            }
                        }
                        break;
                    }
                }
            }
        };

        return projection;
    };

    /**
     * this method is called by this._addGetCapWMTSLayer
     * and get ol.tileGrid.WMTS parameters using getCapabilities response
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @return {Object} tmsOptions - ol.tileGrid.WMTS options
     * @private
     */
    LayerImport.prototype._getTMSParams = function (layerInfo) {
        var tmsOptions = {};

        var matrixIds = [];
        var resolutions = [];
        var origin = [];
        var tms;
        var projCode;
        var projection;

        // TODO : recup TOUS les autres params d'un tileGrid ! (tileSize, width...)

        var map = this.getMap();
        if ( !map ) {
            return;
        }

        // Récupération des informations de la pyramide (tileGrid information) : matrixIds, resolutions, origin
        if ( layerInfo.TileMatrixSetLink && Array.isArray(layerInfo.TileMatrixSetLink) ) {
            tms = layerInfo.TileMatrixSetLink[0].TileMatrixSet;

            if ( this._getCapResponseWMTS.Contents && Array.isArray(this._getCapResponseWMTS.Contents.TileMatrixSet) ) {
                var tileMatrixSets = this._getCapResponseWMTS.Contents.TileMatrixSet;
                for ( var i = 0; i < tileMatrixSets.length; i ++ ) {
                    if ( tileMatrixSets[i].Identifier === tms && tileMatrixSets[i].TileMatrix ) {
                        // on a trouvé le TMS correspondant
                        var tileMatrixSet = tileMatrixSets[i];

                        var tilematrix;
                        var id;
                        var scaledenominator;
                        var resolution;
                        var units;

                        if ( tileMatrixSet.SupportedCRS ) {
                            projCode = tileMatrixSet.SupportedCRS;
                            projection = ol.proj.get(projCode);
                        }
                        if ( projection && projection.getUnits ) {
                            units = projection.getUnits();
                        }

                        if ( Array.isArray(tileMatrixSet.TileMatrix) ) {
                            for ( var j = 0; j < tileMatrixSet.TileMatrix.length; j ++ ) {

                                // construction du tableau des matrixIds
                                tilematrix = tileMatrixSet.TileMatrix[j];
                                if ( tilematrix.Identifier != null ) {
                                    id = parseInt(tilematrix.Identifier, 10);
                                    matrixIds.push(id);
                                }

                                // construction du tableau des résolutions, calculées à partir des dénominateurs d'échelle (scaledenominator)
                                scaledenominator = tilematrix.ScaleDenominator;
                                // calcul des résolutions selon la projection du TMS : selon si on a des coordonnées planes ou géographiques
                                if ( units === "degrees" ) {
                                    // info : 6378137 * 2 * pi / 360 = rayon de la terre (ellipsoide WGS84)
                                    resolution = scaledenominator * 0.00028 * 180 / ( Math.PI * 6378137 );
                                } else {
                                    // info : 1 pixel = 0.00028 m
                                    resolution = scaledenominator * 0.00028;
                                }
                                resolutions.push(resolution);

                                origin = tilematrix.TopLeftCorner;
                            }
                        }

                        // tri des résolutions par ordre décroissant
                        if ( Array.isArray(resolutions) && resolutions.sort !== undefined ) {
                            resolutions.sort(
                                function (x, y) {
                                    return y - x;
                                }
                            );
                        }
                        // tri des identifiants des niveaux de pyramide (matrixIds) par ordre croissant
                        if ( Array.isArray(matrixIds) && matrixIds.sort !== undefined ) {
                            matrixIds.sort(
                                function (x, y) {
                                    return x - y;
                                }
                            );
                        }
                    }
                }
            } else {
                console.log("[ol.control.LayerImport] TileMatrixSet data not found in getCapabilities response for layer " + layerInfo.Identifier);
            }

        } else {
            return;
        }

        tmsOptions.tms = tms;
        tmsOptions.projCode = projCode;
        tmsOptions.matrixIds = matrixIds;
        tmsOptions.resolutions = resolutions;
        tmsOptions.origin = origin;

        return tmsOptions;
    };

    /**
     * this method is called by this._addGetCapWMTSLayer
     * and sets extent for WMTS layer in map projection (if available in getCapabilities response)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @return {Array} extent - layer extent
     * @private
     */
    LayerImport.prototype._getWMTSLayerExtent = function (layerInfo) {
        var extent;
        var mapProjCode = this._getMapProjectionCode();

        // récupération de l'étendue (bbox)
        if ( layerInfo.WGS84BoundingBox && Array.isArray(layerInfo.WGS84BoundingBox) ) {
            extent = ol.proj.transformExtent(layerInfo.WGS84BoundingBox, "EPSG:4326", mapProjCode);
        }

        return extent;
    };

    // ################################################################### //
    // ################################ utils ############################ //
    // ################################################################### //

    /**
     * gets control map projection code
     *
     * @return {String} mapProjCode - control map projection code (e.g. "EPSG:3857")
     * @private
     */
    LayerImport.prototype._getMapProjectionCode = function () {
        var map = this.getMap();
        if ( !map || !map.getView || !map.getView().getProjection ) {
            logger.log("unable to get layerimport's map");
            return;
        }
        var mapProjCode = map.getView().getProjection().getCode();
        return mapProjCode;
    };

    // ################################################################### //
    // ################################ clean ############################ //
    // ################################################################### //

    /**
     * this method displays waiting container and sets a timeout
     *
     * @private
     */
    LayerImport.prototype._displayWaitingContainer = function () {

        this._waitingContainer.className = "GPimportWaitingContainerVisible";
        this._waiting = true;

        // mise en place d'un timeout pour réinitialiser le panel (cacher la patience)
        // si on est toujours en attente (si la requête est bloquée par exemple)
        if ( this._timer ) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        var context = this;
        this._timer = setTimeout( function () {
            if ( context._waiting === true ) {
                context._hideWaitingContainer();
            } else {
                if ( context._timer ) {
                    clearTimeout(context._timer);
                }
            }
        }, 16000);
    };

    /**
     * this method hides waiting container and clears timeout
     *
     * @private
     */
    LayerImport.prototype._hideWaitingContainer = function () {
        if ( this._waiting ) {
            this._waitingContainer.className = "GPimportWaitingContainerHidden";
            this._waiting = false;
            clearTimeout(this._timer);
            this._timer = null;
        }
    };

    /**
     * this method clears previous getCap request url or response information
     *
     * @private
     */
    LayerImport.prototype._clearGetCapParams = function () {
        this._getCapRequestUrl = null;
        this._getCapResponseWMS = null;
        this._getCapResponseWMTS = null;
        this._getCapResponseWMSLayers = null;
        this._getCapResponseWMTSLayers = null;
    };

    /**
     * this method empties getCap results list (DOM element)
     *
     * @private
     */
    LayerImport.prototype._emptyGetCapResultsList = function () {
        if (this._getCapResultsListContainer) {
            while (this._getCapResultsListContainer.firstChild) {
                this._getCapResultsListContainer.removeChild(this._getCapResultsListContainer.firstChild);
            }
        }
    };

    return LayerImport;
});
