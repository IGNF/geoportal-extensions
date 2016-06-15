define([
    "ol",
    "gp",
    "woodman",
    "Ol3/Utils",
    "Common/Controls/LayerImportDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    Gp,
    woodman,
    Utils,
    LayerImportDOM,
    SelectorID
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
                if ( typesList.indexOf(layerTypes[i]) === -1 ) {
                    // si le type n'est pas référencé, on stocke son index pour le retirer du tableau (après avoir terminé de parcourir le tableau)
                    wrongTypesIndexes.push(i);
                    console.log("[ol.control.LayerImport] options.layerTypes : " + layerTypes[i] + " is not a supported type");
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

        // 2. Récupération du format
        var format;
        if ( this._currentImportType === "KML" ) {
            format = new ol.format.KML();
        } else if ( this._currentImportType === "GPX" ) {
            format = new ol.format.GPX();
        }

        // TODO : créer une seule fonction addLayerToMap(source) (avec zoom to extent)
        // 3. Création de la couche vectorielle
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
        var map = this.getMap();
        if ( !map ) {
            return;
        }
        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        vectorLayer.gpResultLayerId = "layerimport:" + this._currentImportType;
        map.addLayer(vectorLayer);

        // zoom sur l'étendue des entités récupérées (si possible)
        if ( map.getView() && map.getSize() && vectorSource.getExtent ) {
            var sourceExtent = vectorSource.getExtent();
            if ( sourceExtent && sourceExtent[0] !== Infinity ) {
                map.getView().fit(vectorSource.getExtent(), map.getSize());
            }
        }
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
            console.log("missing file");
            return;
        }

        var format;

        // Création d'un objet FileReader qui permet de lire le contenu du fichier chargé
        var fReader = new FileReader();

        // Définition des fonctions de callbacks associées au reader,
        // notamment la fonction onload qui affichera les entités chargées à la carte
        var context = this;
        /** on readAsText error */
        fReader.onerror = function (e) {
            console.log("error fileReader : ",e);
        };
        /** on readAsText error */
        fReader.onprogress = function () {
            console.log("onprogress");
        };
        /** on load start */
        fReader.onloadstart = function () {
            // TODO : mettre en place une patience
            console.log("onloadstart");
        };
        /** on readAsText abort */
        fReader.onabort = function () {
            // TODO : cacher la patience
            console.log("onabort");
        };
        /** on readAsText loadend */
        fReader.onloadend = function (e) {
            // fReader = null ?
            // TODO : cacher la patience
            // TODO : replier le formulaire ?
            console.log("onloadend : ", e);
        };
        /** on readAsText load */
        fReader.onload = function (e) {
            logger.log("fileReader onload - file content : ", e.target.result);

            // récupération du contenu du fichier
            var fileContent = e.target.result;
            var map = context.getMap();
            if ( !map || !fileContent ) {
                return;
            }

            if ( context._currentImportType === "KML" ) {
                // lecture du fichier KML : création d'un format ol.format.KML, qui possède une méthode readFeatures (et readProjection)
                format = new ol.format.KML();
            } else if ( context._currentImportType === "GPX" ) {
                // lecture du fichier GPX : création d'un format ol.format.GPX, qui possède une méthode readFeatures (et readProjection)
                format = new ol.format.GPX();
            }

            // lecture de la géométrie des entités à partir du fichier, pour éventuelle reprojection.
            var fileProj = format.readProjection(fileContent);
            // récupération de la projection de la carte pour reprojection des géométries
            var mapProj = map.getView().getProjection().getCode();

            // récupération des entités avec reprojection éventuelle des géométries
            var features = format.readFeatures(
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
                    vectorSource._title = vectorSource._description = "Import " + context._currentImportType;
                }
            }

            var vectorLayer = new ol.layer.Vector({
                source : vectorSource
            });
            // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
            vectorLayer.gpResultLayerId = "layerimport:" + context._currentImportType;
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

        // Lecture du fichier chargé à l'aide de fileReader
        fReader.readAsText(file);
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

        // 1. récupération de l'url renseignée
        var url = this._getCapRequestUrl = this._serviceUrlImportInput.value;
        if ( !url ) {
            console.log("[ol.control.LayerImport] url parameter is mandatory");
            return;
        }
        logger.log("url : ",url);

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
            url = proxyUrl + encodeURI(url);
        }

        // 3. send getcapabilities request (XHR protocol => proxy Url is needed)
        var context = this;
        Gp.Protocols.XHR.call({
            url : url,
            method : "GET",
            /** on success callback : display results in container */
            onResponse : function (response) {
                context._displayGetCapResponseLayers.call(context, response);
            },
            /** on error callback : log error */
            onFailure : function (error) {
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

        // Parse GetCapabilities Response
        if ( this._currentImportType === "WMS" ) {

            parser = new ol.format.WMSCapabilities();
            if ( !parser ) {
                return;
            }
            var getCapResponseWMS = this._getCapResponseWMS = parser.read(xmlResponse);
            logger.log("getCapabilities response : " + getCapResponseWMS);

            if ( getCapResponseWMS && getCapResponseWMS.Capability && getCapResponseWMS.Capability.Layer && getCapResponseWMS.Capability.Layer.Layer ) {
                layers = getCapResponseWMS.Capability.Layer.Layer;

                if ( Array.isArray(layers) ) {
                    // on stocke la liste des couches pour faire le lien avec le DOM
                    this._getCapResponseWMSLayers = layers;

                    for ( var i = 0; i < layers.length; i ++ ) {
                        // on ajoute chaque couche de la réponse dans la liste des couches accessibles
                        layerDescription = layers[i].Title;
                        if ( this._getCapResultsListContainer ) {
                            this._getCapResultsListContainer.appendChild(this._createImportGetCapResultElement(layerDescription, i));
                        }
                    }

                    // Affichage du panel des couches accessibles
                    this._importPanel.style.display = "none";
                    this._getCapPanel.style.display = "block";
                }
            }

        } else if ( this._currentImportType === "WMTS" ) {

            parser = new ol.format.WMTSCapabilities();
            if ( !parser ) {
                return;
            }
            var getCapResponseWMTS = this._getCapResponseWMTS = parser.read(xmlResponse);
            console.log(getCapResponseWMTS);

            if ( getCapResponseWMTS && getCapResponseWMTS.Contents && getCapResponseWMTS.Contents.Layer ) {
                layers = getCapResponseWMTS.Contents.Layer;

                if ( Array.isArray(layers) ) {
                    // on stocke la liste des couches pour faire le lien avec le DOM
                    this._getCapResponseWMTSLayers = layers;

                    for ( var j = 0; j < layers.length; j ++ ) {
                        // on ajoute chaque couche de la réponse dans la liste des couches accessibles
                        layerDescription = layers[j].Title;
                        if ( this._getCapResultsListContainer ) {
                            this._getCapResultsListContainer.appendChild(this._createImportGetCapResultElement(layerDescription, j));
                        }
                    }

                    // Affichage du panel des couches accessibles
                    this._importPanel.style.display = "none";
                    this._getCapPanel.style.display = "block";
                }
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
            return;
        }

        // TODO : récupérer + d'informations ?

        // Création de la source (tester un try catch ?)
        var wmsSource = new ol.source.TileWMS({
            url : this._getCapRequestUrl,
            params : {
                LAYERS : layerInfo.Name,
                SERVICE : "WMS"
            }
        });

        // ajout des informations pour le layerSwitcher (titre, description)
        // TODO : récupérer légendes, metadataurl...
        if ( layerInfo.Title ) {
            wmsSource._title = layerInfo.Title;
            wmsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Title;
        } else {
            wmsSource._title = layerInfo.Name;
            wmsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Name;
        }

        var wmsLayer = new ol.layer.Tile({
            source : wmsSource
        });
        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        wmsLayer.gpResultLayerId = "layerimport:WMS";

        map.addLayer(wmsLayer);
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
        wmtsSourceOptions.version = this._getCapResponseWMTS.version;
        // Récupération de l'url
        var questionMarkIndex = this._getCapRequestUrl.indexOf("?");
        if ( questionMarkIndex !== -1 ) {
            wmtsSourceOptions.url = this._getCapRequestUrl.substring(0, questionMarkIndex);
        } else {
            wmtsSourceOptions.url = this._getCapRequestUrl;
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
        // TODO : récupérer légendes, metadataurl...
        if ( layerInfo.Title ) {
            wmtsSource._title = layerInfo.Title;
            wmtsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Title;
        } else {
            wmtsSource._title = layerInfo.Identifier;
            wmtsSource._description = layerInfo.Abstract ? layerInfo.Abstract : layerInfo.Identifier;
        }

        // TODO : try / catch
        // TODO : ajouter extent ? visibility ?
        var wmtsLayer = new ol.layer.Tile({
            source : wmtsSource
        });
        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        wmtsLayer.gpResultLayerId = "layerimport:WMTS";

        map.addLayer(wmtsLayer);
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
                        console.log(resolutions);
                        // tri des identifiants des niveaux de pyramide (matrixIds) par ordre croissant
                        if ( Array.isArray(matrixIds) && matrixIds.sort !== undefined ) {
                            matrixIds.sort(
                                function (x, y) {
                                    return x - y;
                                }
                            );
                        }
                        console.log(matrixIds);
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

    // ################################################################### //
    // ################################ clean ############################ //
    // ################################################################### //

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
