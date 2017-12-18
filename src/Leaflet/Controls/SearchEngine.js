/* global KeyboardEvent */
define([
    "leaflet",
    "woodman",
    "gp",
    "Common/Utils/CheckRightManagement",
    "Common/Utils/SelectorID",
    "Leaflet/Controls/Utils/IconDefault",
    "Common/Controls/SearchEngineDOM",
    "Common/Controls/SearchEngineUtils"
], function (
    L,
    woodman,
    Gp,
    RightManagement,
    ID,
    IconDefault,
    SearchEngineDOM,
    SearchEngineUtils
) {

    "use strict";

    var logger = woodman.getLogger("searchengine");

    /**
    * @classdesc
    *
    * Leaflet Control Class to search positons of geographic identifiers (places names, address, cadastral parcel) using :
    *
    * - the [geocoding web service of the Geoportal Platform]{@link http://api.ign.fr/tech-docs-js/developpeur/search.html}.
    * - the [autocompletion service of the Geoportal Platform]{@link http://api.ign.fr/tech-docs-js/developpeur/search.html#The_autocompletion_Service}
    * <br/>
    *
    * Use {@link module:Controls.SearchEngine L.geoportalControl.SearchEngine()} factory to create instances of that class.
    *
    * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control" target="_blank">L.Control</a> native class.
    *
    * @namespace
    * @alias L.geoportalControl.SearchEngine
    */
    var SearchEngine = L.Control.extend( /** @lends L.geoportalControl.SearchEngine.prototype */ {

        includes : SearchEngineDOM,

        /**
        * options by default
        *
        * @private
        */
        options : {
            position : "topleft",
            collapsed : true,
            displayInfo : true,
            zoomTo : "",
            resources : [],
            placeholder : "Rechercher un lieu, une adresse",
            displayMarker : true,
            markerStyle : "blue",
            displayAdvancedSearch : true,
            advancedSearch : {},
            geocodeOptions : {},
            autocompleteOptions : {}
        },

        /**
        * @constructor SearchEngine
        *
        * @private
        * @alias SearchEngine
        * @extends {L.Control}
        * @param {Object} options - control options
        * @param {String} [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
        * @param {Boolean} [options.collapsed] - collapse mode, false by default
        * @param {String} [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.displayInfo] - get informations on popup marker
        * @param {Sting|Numeric|Function} [options.zoomTo] - zoom to results, by default, current zoom.
        *       Value possible : auto or zoom level.
        *       Possible to overload it with a function :
        *       zoomTo : function (info) {
        *           // do some stuff...
        *           return zoom;
        *       }
        * @param {String}  [options.placeholder] - set placeholder in search bar. Default is "Rechercher un lieu, une adresse".
        * @param {Boolean}  [options.displayMarker] - set a marker on search result, defaults to true.
        * @param {String|Object}  [options.markerStyle] - set a marker style. Currently possible values are "blue" (default value), "orange", "red" and "green". But you can use an L.Icon object (see {@link http://leafletjs.com/reference-1.2.0.html#icon L.Icon }). 
        * @param {Sting} [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
        * @param {Object} [options.resources] - resources to be used by geocode and autocompletion services, by default : ["StreetAddress", "PositionOfInterest"]
        * @param {Boolean} [options.displayAdvancedSearch] - False to disable advanced search tools (it will not be displayed). Default is true (displayed)
        * @param {Object} [options.advancedSearch] - advanced search for geocoding (filters)
        * @param {Object} [options.geocodeOptions] - options of geocode service
        * @param {Object} [options.autocompleteOptions] - options of autocomplete service
        * @example
        *  var SearchEngine = L.geoportalControl.SearchEngine({
        *      position : "topright",
        *      collapsed : true,
        *      displayInfo : true,
        *      displayAdvancedSearch : true,
        *      placeholder : "Rechercher un lieu, une adresse",
        *      displayMarker : true,
        *      markerStyle : L.icon(iconUrl: 'https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png');
        *      zoomTo : 15,
        *      resources : ["PositionOfInterest", "StreetAddress"],
        *      advancedSearch : {
        *          PositionOfInterest : [{name : "municipality", title : "Ville"}],
        *          StreetAddress : [{...}],
        *          CadastralParcel : null,
        *      },
        *      apiKey : "zfgzrgffg57rfg8ar7gr4g5r4",
        *      geocodeOptions : {},
        *      autocompleteOptions : {}
        *  });
        *
        */
        initialize : function (options) {

            // on transmet les options au controle
            L.Util.setOptions(this, options);

            /** uuid */
            this._uid = ID.generate();

            /** affichage du container de saisie */
            this._showContainer = null;
            this._pictoContainer = null;

            /** container de la saisie du la recherche */
            this._inputContainer = null;

            /** container des reponses de l'autocompletion */
            this._suggestedContainer = null;

            /** listes des reponses de l'autocompletion */
            this._suggestedLocations = [];

            /** container des reponses du geocodage */
            this._geocodedContainer = null;

            /** liste des reponses du geocodage */
            this._geocodedLocations = [];

            /** container des filtres du geocodage */
            this._filterContainer = null;

            /** ressource de geocodage selectionnée pour le geocodage avancé */
            this._currentGeocodingCode = null;

            /** localisant */
            this._currentGeocodingLocation = null;

            /** liste des filtres du geocodage pour le geocodage avancé */
            this._advancedSearchFilters = {};

            /** liste des ressources du geocodage pour le geocodage avancé */
            this._advancedSearchCodes = [];

            /** marker */
            this._marker = null;

            /** ressources des services d'autocompletion et de geocodage */
            this._servicesRightManagement = {};

            /**
            * Droit sur les ressources sur les services.
            * Par defaut, on n'en s'occupe pas
            * sauf si l'autoconfiguration est chargée !
            */
            this._noRightManagement = false;

            // gestion des droits sur les ressources/services
            this._checkRightsManagement();

        },

        /**
        * this method is called by this.addTo(map)
        * and fills variable : this._container = this.onAdd(map)
        *
        * @private
        */
        onAdd : function (/* map */) {

            // TODO initialisation des ressources du geocodage avancé
            this._initAdvancedSearchCodes();

            // initialisation des filtres du geocodage avancé
            this._initAdvancedSearchFilters();

            // initialisation du DOM du composant
            var container = this._initLayout();

            // deactivate of events that may interfere with the map
            L.DomEvent
            .disableClickPropagation(container)
            .disableScrollPropagation(container);

            return container;
        },

        /**
        * this method is called when the control is removed from the map
        * and removes events on map.
        *
        * @private
        */
        onRemove : function (map) {

            this._clearSuggestedLocation();
            this._clearGeocodedLocation();

            if (this._marker != null) {
                map.removeLayer(this._marker);
                this._marker = null;
            }
        },

        // ################################################################### //
        // ##################### methods rights management ################### //
        // ################################################################### //

        /**
        * this method is called by constructor
        * and check the rights to resources and services
        *
        * @private
        */
        _checkRightsManagement : function () {

            // INFORMATION
            // l'autoconfiguration n'est utile que pour récupérer la clef si elle
            // n'est pas renseignée, et pour vérifier les droits sur les ressources
            // et les services.

            // si l'autoconfiguration n'est pas chargée,
            // il est toujours possible de requeter le service avec une clef API,
            // mais les droits sur les ressources ne sont pas garantis, on risque
            // d'obtenir des erreurs 403 forbidden..., la responsabilité revient
            // à l'utilisateur (message d'information)...
            // par contre, sans clef API renseignée au niveau du controle,
            // l'utilisateur doit la renseigner au niveau des services...,
            // sinon, Exception du service

            // si l'autoconfiguration est chargée,
            // si une clef API est renseignée au niveau controle, on controle
            // le mapping entre le contrat et la clef...
            // on obtient la liste des ressources ayant droits,
            // si on ne trouve pas de ressources ou certaines ressources ne sont
            // pas disponible, on previent l'utilisateur (message d'information).

            // les ressources en options pour les 2 services
            // on en definit par defaut
            if (! this.options.resources || this.options.resources.length === 0) {
                this.options.resources = [
                    "StreetAddress",
                    "PositionOfInterest"
                    // FIXME choix par defaut ?
                    // "CadastralParcel",
                    // "Administratif"
                ];
            }

            var _opts = null;
            var _res  = [];
            var _key  = null;

            // les ressources du service de geocodage
            // on prend celles des options du services en priorité
            _key  = this.options.geocodeOptions.apiKey;
            _opts = this.options.geocodeOptions.filterOptions;
            _res  = (_opts) ? _opts.type : [];
            if (! _res || _res.length === 0) {
                _res = this.options.resources || [
                    "StreetAddress",
                    "PositionOfInterest"
                    // "CadastralParcel",
                    // "Administratif"
                ];
            }

            var rightManagementGeocode = RightManagement.check({
                key : _key || this.options.apiKey,
                resources : _res,
                services : ["Geocode"]
            });

            // les ressources du service d'autocompletion
            // on prend celles des options du services en priorité
            _key  = this.options.autocompleteOptions.apiKey;
            _opts = this.options.autocompleteOptions.filterOptions;
            _res  = (_opts) ? _opts.type : [];
            if (! _res || _res.length === 0) {
                _res = this.options.resources || [
                    "StreetAddress",
                    "PositionOfInterest"
                    // "CadastralParcel",
                    // "Administratif"
                ];
            }

            var rightManagementAutoComplete = RightManagement.check({
                key :  _key || this.options.apiKey,
                resources : _res,
                services : ["AutoCompletion"]
            });

            // au cas où pas de droit !
            if (! rightManagementGeocode && ! rightManagementAutoComplete) {
                this._noRightManagement = true;
            }

            // je reconstruis differement la structure pour la gestion des clefs differentes
            // pour chaque service...
            if (rightManagementAutoComplete) {
                this._servicesRightManagement["AutoCompletion"] = {};
                this._servicesRightManagement["AutoCompletion"]["resources"] = rightManagementAutoComplete["AutoCompletion"];
                this._servicesRightManagement["AutoCompletion"]["key"]       = rightManagementAutoComplete["key"];
            }

            if (rightManagementGeocode) {
                this._servicesRightManagement["Geocode"] = {};
                this._servicesRightManagement["Geocode"]["resources"] = rightManagementGeocode["Geocode"];
                this._servicesRightManagement["Geocode"]["key"]       = rightManagementGeocode["key"];
            }

            // FIXME doit on construire les menus du geocodage avancé en fonction des ressources
            // disponibles ?
            if (! this.options.advancedSearch || Object.keys(this.options.advancedSearch).length === 0) {
                var r = this._servicesRightManagement["Geocode"]["resources"];
                for (var i = 0; i < r.length; i++) {
                    var code = r[i];
                    this.options.advancedSearch[code] = [];
                }
            }
        },

        // ################################################################### //
        // ########################## methods DOM ############################ //
        // ################################################################### //

        /**
        * this method is called by this.onAdd(map)
        * and initialize the container HTMLElement
        *
        * @private
        */
        _initLayout : function () {

            // create main container
            var container = this._createMainContainerElement();

            // create show search engine element
            var inputShow =  this._showContainer = this._createShowSearchEngineElement();
            container.appendChild(inputShow);

            // mode "collapsed"
            if (! this.options.collapsed) {
                inputShow.checked = "true";
            }

            // create search engine picto
            var picto = this._pictoContainer = this._createShowSearchEnginePictoElement();
            container.appendChild(picto);

            var search = this._createSearchInputElement(this.options.placeholder);
            container.appendChild(search);

            if ( this.options.displayAdvancedSearch ) {
                var advancedShow = this._createShowAdvancedSearchElement();
                container.appendChild(advancedShow);

                // INFO je decompose les appels car j'ai besoin de recuperer le container
                // des filtres
                var advancedPanel   = this._createAdvancedSearchPanelElement();
                var advancedHeader  = this._createAdvancedSearchPanelHeaderElement();
                var advancedForm    = this._createAdvancedSearchPanelFormElement(this._advancedSearchCodes);
                var advancedFormFilters  = this._filterContainer = this._createAdvancedSearchFormFiltersElement();
                this._setFilter(this._advancedSearchCodes[0].id); // ex "PositionOfInterest"
                var advancedFormInput = this._createAdvancedSearchFormInputElement();
                advancedForm.appendChild(advancedFormFilters);
                advancedForm.appendChild(advancedFormInput);
                advancedPanel.appendChild(advancedHeader);
                advancedPanel.appendChild(advancedForm);
                container.appendChild(advancedPanel);
            }

            // INFO je decompose les appels car j'ai besoin de recuperer le container
            // des resultats de l'autocompletion
            var autocomplete     = this._createAutoCompleteElement();
            var autocompleteList = this._suggestedContainer = this._createAutoCompleteListElement();
            autocomplete.appendChild(autocompleteList);
            container.appendChild(autocomplete);

            // INFO je decompose les appels car j'ai besoin de recuperer le container
            // des resultats du geocodage
            var geocode       = this._createGeocodeResultsElement();
            var geocodeList   = this._geocodedContainer = this._createGeocodeResultsListElement();
            geocode.appendChild(geocodeList);
            container.appendChild(geocode);

            return container;
        },

        // ################################################################### //
        // ################# methods Filters Geocode Advanced ################ //
        // ################################################################### //

        /**
        * this method is called by this.onAdd()
        * and initialize the geocoding resources.
        * TODO
        *
        * @private
        */
        _initAdvancedSearchCodes : function () {

            // INFORMATION
            // on y ajoute les filtres attributaires pour une table de ressources
            // selectionnée via un evenement (onchange) de la liste deroulante du
            // menu avancé du geocodage.
            // cf. onGeocodingAdvancedSearchCodeChange() pour la selection de la
            // ressource de geocodage à afficher

            // TODO la liste des ressources de geocodage est codée en statique
            // dans le DOM, cad les 4 ressources sont donc disponibles dans le menu
            // deroulant :
            // - PositionOfInterest
            // - StreetAddress
            // - CadastralParcel
            // - Administratif
            // Cette liste doit elle être dynamique ? Ne doit on pas prendre en
            // compte uniquement les ressources que le client a renseigné ?

            var advancedSearchCodesByDefault = [
                {
                    id : "PositionOfInterest",
                    title : "Lieux/toponymes"
                },
                {
                    id : "StreetAddress",
                    title : "Adresses"
                },
                {
                    id : "CadastralParcel",
                    title : "Parcelles cadastrales"
                },
                {
                    id : "Administratif",
                    title : "Administratif"
                }
            ];

            var _resources = Object.keys(this.options.advancedSearch);
            for (var i = 0; i < _resources.length; i++) {
                var id = _resources[i];
                for (var j = 0; j < advancedSearchCodesByDefault.length; j++) {
                    if (advancedSearchCodesByDefault[j].id === id) {
                        this._advancedSearchCodes.push(advancedSearchCodesByDefault[j]);
                    }
                }
            }

            if ( this._advancedSearchCodes.length === 0 ) {
                this._advancedSearchCodes = advancedSearchCodesByDefault;
            }

            logger.log("advancedSearchCodes", this._advancedSearchCodes);
        },

        /**
        * this method is called by this.onAdd()
        * and initialize the advanced geocoding filters.
        * FIXME
        *
        * @private
        */
        _initAdvancedSearchFilters : function () {

            // FIXME la liste des filtres attributaires doit elle être recuperée
            // de l'objet geocode ? doit on tous les mettre ou doit on faire un choix ?

            // liste des filtres par defauts pour toutes les ressources
            var advancedSearchFiltersByDefault = {
                PositionOfInterest : [
                    {
                        name : "city", // municipality !?
                        title : "Ville",
                        filter : false,
                        sep : true
                    },
                    {
                        name : "importance",
                        title : "Importance",
                        filter : true
                    },
                    {
                        name : "nature",
                        title : "Nature",
                        filter : true
                    },
                    {
                        name : "territory",
                        title : "Territoire",
                        filter : true
                    },
                    {
                        name : "insee",
                        title : "Code commune (INSEE)",
                        filter : true
                    },
                    {
                        name : "department",
                        title : "Département",
                        filter : true
                    }
                ],
                StreetAddress : [
                    // INFO
                    // ce ne sont pas des filtres mais une location dite structurée !
                    {
                        name : "number",
                        title : "Numéro",
                        filter : false,
                        sep : true
                    },
                    {
                        name : "street",
                        title : "Rue",
                        filter : false,
                        sep : true
                    },
                    {
                        name : "postalCode",
                        title : "Code Postal",
                        filter : false,
                        sep : true
                    },
                    {
                        name : "city", // municipality !?
                        title : "Ville",
                        filter : false,
                        sep : true
                    },
                    // {
                    //     name : "municipality", // commune !?
                    //     title : "Commune",
                    //     filter : true,
                    //     sep : true
                    // },
                    {
                        name : "territory",
                        title : "Territoire",
                        filter : true
                    },
                    {
                        name : "insee",
                        title : "Code commune (INSEE)",
                        filter : true
                    },
                    {
                        name : "department",
                        title : "Département",
                        filter : true
                    }
                ],
                CadastralParcel : [
                    // INFO
                    // ce ne sont pas des filtres mais une location dite structurée !
                    // ex 94 067 000 0D 0041
                    {
                        name : "department",
                        title : "Département",
                        filter : false,
                        sep : false,
                        value : "__"
                    },
                    {
                        name : "commune",
                        title : "Commune",
                        filter : false,
                        sep : false,
                        value : "___"
                    },
                    {
                        name : "absorbedCity",
                        title : "Commune absorbée",
                        filter : false,
                        sep : false,
                        value : "___"
                    },
                    {
                        name : "section",
                        title : "Section",
                        filter : false,
                        sep : false,
                        value : "__"
                    },
                    // {
                    //     name : "sheet",
                    //     title :  "Feuille",
                    //     filter : false,
                    //     sep : false
                    // },
                    {
                        name : "number",
                        title : "Numéro",
                        filter : false,
                        sep : false,
                        value : "____"
                    }
                    // {
                    //     name : "insee",
                    //     title : "Code commune (INSEE)",
                    //     filter : false,
                    //     sep : false
                    // },
                    // {
                    //     name : "municipality",
                    //     title : "Ville",
                    //     filter : false,
                    //     sep : false
                    // }

                ],
                Administratif : [
                    {
                        name : "prefecture",
                        title : "Préfecture",
                        filter : true
                    },
                    {
                        name : "inseeRegion",
                        title : "Code région (INSEE)",
                        filter : true
                    },
                    {
                        name : "inseeDepartment",
                        title : "Code département (INSEE)",
                        filter : true
                    },
                    {
                        name : "city", // municipality !?
                        title : "Ville",
                        filter : false,
                        sep : true
                    }
                ]
            };

            // on merge les options avancées avec celles par defaut
            var advancedSearchFiltersCustom = this.options.advancedSearch;
            for (var code in advancedSearchFiltersCustom) {
                if (advancedSearchFiltersCustom.hasOwnProperty(code)) {
                    // si object null ou vide (StreetAddress : [] || null), on prend les params. par defaut
                    // sauf si pas de droit !
                    if (!advancedSearchFiltersCustom[code] || advancedSearchFiltersCustom[code].length === 0) {
                        advancedSearchFiltersCustom[code] = advancedSearchFiltersByDefault[code];
                        continue;
                    }

                    // si la clef filter est absente, on l'ajoute...
                    // par defaut, le filtre municipality est dit structuré !
                    var filters = advancedSearchFiltersCustom[code];
                    for (var i = 0; i < filters.length; i++) {
                        var o = filters[i];
                        if (!o.hasOwnProperty("filter")) {
                            o.filter = (o.name === "municipality") ? false : true;
                        }

                    }
                }
            }

            L.Util.extend(this._advancedSearchFilters,
                advancedSearchFiltersByDefault,
                advancedSearchFiltersCustom
            );

            logger.log("advancedSearchFilters", this._advancedSearchFilters);
        },

        /**
        * this method is called by :
        * - this._initLayout() : ...
        * - this.onGeocodingAdvancedSearchCodeChoice() : ...
        * and initialize or create the filters container HTMLElement
        * to the geocoding advanced menu.
        *
        * @param {String} code - resource geocoding name
        *
        * @private
        */
        _setFilter : function (code) {

            // INFORMATION
            // Nous avons 2 solutions possibles pour la mise en place des filtres.
            // 1. Soit on decide de creer tous les filtres pour chaque ressource
            // de geocodage à l'initialisation du composant, et on joue sur le
            // mode 'hidden' pour n'afficher que la ressource selectionnée.
            // 2. Soit on decide de creer à chaque fois les filtres pour la
            // ressource selectionnée.
            // Chaque solution a ses inconvenients/avantages.
            // Implementation du choix 2 car elle offre plus de souplesse pour
            // recuperer les 'form-data'...

            var container = this._filterContainer;

            var codeFound = false;
            for (var i = 0; i < this._advancedSearchCodes.length; i++) {
                if (this._advancedSearchCodes[i].id === code) {
                    codeFound = true;
                    break;
                }
            }

            if (! codeFound) {
                // cette ressource n'est pas disponible,
                // on supprime les anciens enfants...
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                return;
            }

            // on sauvegarde la ressource de geocodage sélectionnée
            this._currentGeocodingCode = code;

            // on supprime les enfants...
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            var lstAttributs = this._advancedSearchFilters[code];
            if (!lstAttributs || lstAttributs.length === 0) {
                // cette ressource n'est pas parametrable
                return;
            }

            var divTable = this._createAdvancedSearchFiltersTableElement(code, true);

            for (var j = 0; j < lstAttributs.length; j++) {
                var divFilter = this._createAdvancedSearchFiltersAttributElement(lstAttributs[j]);
                divTable.appendChild(divFilter);
            }

            container.appendChild(divTable);

            return container;
        },

        // ################################################################### //
        // ################ methods to request and results ################### //
        // ################################################################### //

        /**
        * this method is called by this.onAutoCompleteSearch()
        * and executes a request to the service.
        *
        * @param {Object} settings - service settings
        * @param {String}   settings.text - text
        * @param {Function} settings.onSuccess - callback
        * @param {Function} settings.onFailure - callback
        *
        * @private
        */
        _requestAutoComplete : function (settings) {

            // on ne fait pas de requête si on n'a pas renseigné de parametres !
            if (!settings || Object.keys(settings).length === 0) {
                return;
            }

            // on ne fait pas de requête si la parametre 'text' est vide !
            if (!settings.text) {
                return;
            }

            logger.log(settings);

            // on ne fait pas de requête si aucun droit !
            if (this._noRightManagement) {
                console.log("no rights for all service !?");
                return;
            }

            // gestion des droits !
            if (! this._servicesRightManagement["AutoCompletion"]) {
                console.log("no rights for this service !?");
                return;
            }

            var options = {};
            // on recupere les options du service
            L.Util.extend(options, this.options.autocompleteOptions);
            // ainsi que la recherche et les callbacks
            L.Util.extend(options, settings);

            var resources = this._servicesRightManagement["AutoCompletion"].resources;
            if (!resources || Object.keys(resources).length === 0) {
                return;
            }

            // au cas où les options du services ne sont pas renseignées, on y ajoute
            // les tables de ressources
            if (resources && L.Util.isArray(resources) && !options.filterOptions) {
                if (! options.filterOptions) {
                    options.filterOptions = {};
                }
                options.filterOptions.type = resources;
            }

            // gestion de la clef !
            var key = this._servicesRightManagement["AutoCompletion"]["key"];

            // cas où la clef API n'est pas renseignée dans les options du service,
            // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
            L.Util.extend(options, {
                apiKey : options.apiKey || this.options.apiKey || key
            });

            logger.log(options);

            Gp.Services.autoComplete(options);
        },

        /**
        * this method is called by this.onGeocodingSearch()
        * and fills the container of the location list.
        * it creates a HTML Element per location
        * (cf. this. ...)
        *
        * @param {Array} locations - Array of Gp.Services.AutoComplete.SuggestedLocation corresponding to autocomplete results list
        * @private
        */
        _fillAutoCompletedLocationListContainer : function (locations) {

            if (!locations || locations.length === 0) {
                return;
            }

            // on vide la liste avant de la construire
            var element = this._suggestedContainer;
            if (element.childElementCount) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            }

            for (var i = 0; i < locations.length; i++) {
                // Proposals are dynamically filled in Javascript by autocomplete service
                this._createAutoCompletedLocationElement(locations[i], i);
            }

        },

        /**
        * this method is called by this.onAutoCompleteSearch()
        * and executes a request to the service.
        *
        * @param {Object} settings - service settings
        * @param {String}   settings.location - text
        * @param {Function} settings.onSuccess - callback
        * @param {Function} settings.onFailure - callback
        *
        * @private
        */
        _requestGeocoding : function (settings) {

            // on ne fait pas de requête si on n'a pas renseigné de parametres !
            if (!settings || Object.keys(settings).length === 0) {
                return;
            }

            // on ne fait pas de requête si la parametre 'text' est vide !
            if (!settings.location) {
                return;
            }

            logger.log(settings);

            // on ne fait pas de requête si aucun droit !
            if (this._noRightManagement) {
                console.log("no rights for all service !?");
                return;
            }

            // gestion des droits !
            if (! this._servicesRightManagement["Geocode"]) {
                console.log("no rights for this service !?");
                return;
            }

            var options = {};
            // on recupere les options du service
            L.Util.extend(options, this.options.geocodeOptions);
            // ainsi que la recherche, les filtres du geocodage avancé et les callbacks
            L.Util.extend(options, settings);
            // on y force le param suivant, s'il n'a pas été surchargé :
            if (!options.hasOwnProperty("returnFreeForm")) {
                L.Util.extend(options, {
                    returnFreeForm : false
                });
            }

            var resources = this._servicesRightManagement["Geocode"].resources;
            if (!resources || Object.keys(resources).length === 0) {
                return;
            }

            // au cas où les options du services ne sont pas renseignées, on y ajoute
            // les tables de ressources
            if (resources && L.Util.isArray(resources) && !options.filterOptions) {
                if (! options.filterOptions) {
                    options.filterOptions = {};
                }
                options.filterOptions.type = resources;
            }

            // gestion de la clef !
            var key = this._servicesRightManagement["Geocode"]["key"];

            // cas où la clef API n'est pas renseignée dans les options du service,
            // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
            L.Util.extend(options, {
                apiKey : options.apiKey || this.options.apiKey || key
            });

            logger.log(options);

            Gp.Services.geocode(options);

            logger.log(options);

        },

        /**
        * this method is called by this.onGeocodingSearch()
        * and fills the container of the location results.
        * it creates a HTML Element per location
        * (cf. this. ...)
        *
        * @private
        */
        _fillGeocodedLocationListContainer : function (locations) {

            if (!locations || locations.length === 0) {
                this._clearGeocodedLocation();
                return;
            }

            // on vide la liste avant de la construire
            var element = this._geocodedContainer;
            if (element.childElementCount) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            }

            for (var i = 0; i < locations.length; i++) {
                logger.log(locations[i]);
                // Proposals are dynamically filled in Javascript by autocomplete service
                this._createGeocodedLocationElement(locations[i], i);
            }

            // sauvegarde de l'etat des locations
            this._geocodedLocations = locations;

        },

        // ################################################################### //
        // ######################### other methods ########################### //
        // ################################################################### //

        /**
        * this sends the label to the input panel.
        *
        * FIXME appel en dur d'un identifiant CSS !
        *
        * @param {String} label - label suggested location
        *
        * @private
        */
        _setLabel : function (label) {
            var element = L.DomUtil.get("GPsearchInputText-" + this._uid);
            element.value = label || "";
        },

        /**
        * this method is called by this.on*ResultsItemClick()
        * and move/zoom on a position.
        *
        * @param {Object} position - {x: ..., y: ...}
        * @param {Number} zoom - zoom level
        *
        * @private
        */
        _setPosition : function (position, zoom) {

            var map  = this._map;

            map.setZoomAround(L.latLng(position.x, position.y), zoom, true);
            map.panTo(L.latLng(position.x, position.y));

        },

        /**
        * this method is called by this.on*ResultsItemClick()
        * and get zoom.
        *
        * @param {Object} info - {}
        *
        * @private
        */
        _getZoom : function (info) {
            var map  = this._map;
            var key  = this.options.zoomTo;
            var zoom = null;

            // les valeurs du zooms sont determinées
            // soit par les mots clefs suivants :  max, min ou auto
            // soit par un niveau de zoom
            // soit defini par l'utilisateur via une fonction

            if ( typeof key === "function" ) {
                logger.trace("zoom function");
                zoom = key.call(this, info);
            }

            if ( typeof key === "number" ) {
                logger.trace("zoom level");
                zoom = key;
            }

            if ( typeof key === "string") {

                // if (key === "max") {
                //     zoom = map.getMaxZoom();
                // } else if (key === "min") {
                //     zoom = map.getMinZoom();
                // } else

                if (key === "auto") {

                    logger.trace("zoom auto");
                    zoom = SearchEngineUtils.zoomToResultsByDefault(info);

                } else {

                    logger.trace("zoom level parsing");
                    var value = parseInt(key, 10);
                    if (!isNaN(value)) {
                        logger.trace("zoom parsing");
                        zoom = value;
                    }
                }
            }

            // polyfill IE
            Number.isInteger = Number.isInteger || function (value) {
                return typeof value === "number" &&
                       isFinite(value) &&
                       Math.floor(value) === value;
            };

            // test de validité du zoom,
            // on prend le zoom courant par defaut ...
            if (!zoom || zoom === "" || !Number.isInteger(zoom)) {
                logger.trace("zoom not found, current zoom...");
                zoom = map.getZoom();
            }

            // test si le zoom est dans l'espace de la carte
            var min = map.getMinZoom();
            var max = map.getMaxZoom();
            if (zoom < min) {
                logger.trace("zoom level min...");
                zoom = min;
            }
            if (zoom > max) {
                logger.trace("zoom level max...");
                zoom = max;
            }

            logger.trace("zoom", zoom);
            return zoom;
        },

        /**
        * this method is called by this.on*ResultsItemClick()
        * and displays a marker.
        * FIXME
        *
        * @param {Object} position - position {x: ..., y: ...}
        * @param {Object} information - suggested or geocoded information
        * @param {Boolean} display - display a popup information
        * @param {String} marker - style style
        *
        * @private
        */
        _setMarker : function (position, information, display, marker) {

            var map = this._map;
            if (this._marker != null) {
                map.removeLayer(this._marker);
                this._marker = null;
            }

            if (position) {

                var _icon = null;
                if ( typeof marker === "string" ) {
                    _icon = new IconDefault(marker);
                } else if ( marker instanceof L.Icon ) {
                    _icon = marker;
                } else {
                    _icon = new IconDefault("blue");
                }

                // cf. http://leafletjs.com/reference.html#marker-options
                var options = {
                    clickable : true,
                    zIndexOffset : 1000,
                    icon : _icon
                };

                this._marker = L.marker(L.latLng(position.x, position.y), options);
                this._marker.addTo(map);

                // FIXME
                // doit on mettre une information
                // - correctement construite ?
                // - uniquement informatif ?
                // - RIEN ?
                if (display) {
                    var popupContent = null;

                    if ( typeof information !== "string") {

                        var values = [];
                        if (information.service === "DirectGeocodedLocation") {

                            if (information.fields.freeform) {
                                popupContent = information.fields.freeform;

                            } else {

                                var attributs = this._advancedSearchFilters[information.type];
                                for (var i = 0; i < attributs.length; i++) {
                                    var key = attributs[i].name;
                                    var value = information.fields[key];
                                    // on prend que les chaines de caractères
                                    if ( typeof value === "string" || typeof value === "number" ) {
                                        values.push(value);
                                    }
                                }

                                popupContent = values.join(" - ");
                            }

                        } else if (information.service === "SuggestedLocation") {

                            if (information.fields.fullText) {
                                popupContent = information.fields.fullText;

                            } else {

                                values.push(information.fields.street || "");
                                values.push(information.fields.postalCode || "");
                                values.push(information.fields.commune || "");

                                if (information.type === "PositionOfInterest") {
                                    values.push(information.fields.poi || "");
                                    values.push(information.fields.kind || "");
                                }

                                popupContent = values.join(" - ");
                            }

                        } else {
                            popupContent = "sans informations.";
                        }

                    } else {
                        popupContent = information;

                    }

                    this._marker.bindPopup(popupContent);
                }
            }
        },

        /**
        * this method is called by this.onSearchReset()
        * and it clears all results and the marker.
        *
        * @private
        */
        _clearResults : function () {
            this._currentGeocodingLocation = null;

            this._clearSuggestedLocation();
            this._clearGeocodedLocation();

            this._setMarker();
        },

        /**
        * this method is called by this.onAutoCompleteSearchText()
        * and it clears all suggested location.
        *
        * @private
        */
        _clearSuggestedLocation : function () {
            this._suggestedLocations = [];
            if (this._suggestedContainer) {
                while (this._suggestedContainer.firstChild) {
                    this._suggestedContainer.removeChild(this._suggestedContainer.firstChild);
                }
            }
        },

        /**
        * this method is called by this.onGeocodingAdvancedSearchSubmit()
        * and it clears all geocoded location.
        *
        * @private
        */
        _clearGeocodedLocation : function () {
            this._geocodedLocations = [];
            if (this._geocodedContainer) {
                while (this._geocodedContainer.firstChild) {
                    this._geocodedContainer.removeChild(this._geocodedContainer.firstChild);
                }
            }
        },

        // ################################################################### //
        // ###################### other handlers events ###################### //
        // ################################################################### //

        /**
        * this method is called by event 'click' on 'GPshowSearchEnginePicto' tag label
        * (cf. this._createShowSearchEnginePictoElement), and it cleans the component
        * when it's closed.
        * FIXME
        *
        * @private
        */
        onShowSearchEngineClick : function () {
            // FIXME on nettoie ou pas ?
            // this._clearResults();
        },

        /**
        * this method is called by event 'click' on 'GPsearchInputReset' tag div
        * (cf. this._createSearchInputElement), and it cleans the value of input.
        *
        * @private
        */
        onSearchResetClick : function () {
            this._clearResults();
        },

        // ################################################################### //
        // ################## handlers events AutoComplete ################### //
        // ################################################################### //

        /**
        * this method is called by event 'keyup' on 'GPsearchInputText' tag input
        * (cf. this._createSearchInputElement), and it gets the value of input.
        * this value is passed as a parameter for the service autocomplete (text).
        * the results of the request are displayed into a drop down menu.
        * FIXME
        *
        * @param {Object} e - HTMLElement
        *
        * @private
        */
        onAutoCompleteSearchText : function (e) {
            logger.log(e);
            var value = e.target.value;
            if (!value) {
                return;
            }

            // aucun droits !
            // on evite une requête...
            if (this._noRightManagement) {
                return;
            }

            // on sauvegarde le localisant
            this._currentGeocodingLocation = value;

            // on limite les requêtes à partir de 3 car. saisie !
            if (value.length < 3) {
                return;
            }

            // INFORMATION
            // on effectue la requête au service d'autocompletion.
            // on met en place des callbacks afin de recuperer les resultats ou
            // les messages d'erreurs du service.
            // les resultats sont affichés dans une liste deroulante.
            // les messages d'erreurs sont affichés sur la console (?)
            var context = this;
            this._requestAutoComplete({
                text : value,
                /** callback onSuccess */
                onSuccess : function (results) {
                    logger.log(results);
                    if (results) {
                        // on sauvegarde l'etat des résultats
                        context._suggestedLocations = results.suggestedLocations;
                        context._locationsToBeDisplayed = [];
                        if ( context._servicesRightManagement["Geocode"] && context._servicesRightManagement["Geocode"]["key"] ) {
                            // on vérifie qu'on n'a pas récupéré des coordonnées nulles (par ex recherche par code postal)
                            for ( var i = 0; i < context._suggestedLocations.length; i++ ) {
                                var ilocation = context._suggestedLocations[i];
                                if ( ilocation.position && ilocation.position.x === 0 && ilocation.position.y === 0 && ilocation.fullText ) {
                                    // si les coordonnées sont nulles, il faut relancer une requête de géocodage avec l'attribut "fullText" récupéré
                                    context._getGeocodeCoordinatesFromFullText(ilocation, i);
                                } else {
                                    // sinon on peut afficher normalement le résultat dans la liste
                                    context._locationsToBeDisplayed.push(ilocation);
                                }
                            };
                        } else {
                            // si on n'a aucun droit d'accès au géocodage, on affiche la liste telle quelle (pas d'autre option pour les coordonnées nulles)
                            context._locationsToBeDisplayed = context._suggestedLocations;
                        }
                        // on affiche les résultats qui n'ont pas des coordonnées nulles
                        context._fillAutoCompletedLocationListContainer(context._locationsToBeDisplayed);
                    }
                },
                /** callback onFailure */
                onFailure : function (error) {
                    // FIXME
                    // où affiche t on les messages : ex. 'No suggestion matching the search' ?
                    // doit on nettoyer la liste des suggestions dernierement enregistrée :
                    context._clearSuggestedLocation();
                    logger.log(error.message);
                }
            });
        },

        /**
         * this method is called by Gp.Services.autoComplete callback in case of success
         * (cf. this.onAutoCompleteSearchText), for suggested locations with null coordinates
         * (case of postalCode research for instance).
         * Send a geocode request with suggested location 'fullText' attribute, to get its coordinates and display it in autocomplete results list container.
         *
         * @param {Gp.Services.AutoCompleteResponse.SuggestedLocation} suggestedLocation - autocompletion result (with null coordinates) to be geocoded
         * @param {Number} i - suggestedLocation position in Gp.Services.AutoCompleteResponse.suggestedLocations autocomplete results list
         * @private
         */
        _getGeocodeCoordinatesFromFullText : function ( suggestedLocation, i ) {
            var context = this;
            Gp.Services.geocode({
                apiKey : context._servicesRightManagement["Geocode"]["key"],
                location : suggestedLocation.fullText,
                filterOptions : {
                    type : suggestedLocation.type
                },
                /** callback onSuccess */
                onSuccess : function (response) {
                    if ( response.locations && response.locations.length !== 0 && response.locations[0].position ) {
                        // on modifie les coordonnées du résultat en EPSG:4326 donc lat,lon
                        if ( context._suggestedLocations && context._suggestedLocations[i] ) {
                            context._suggestedLocations[i].position = {
                                x : response.locations[0].position.y,
                                y : response.locations[0].position.x
                            };
                            // et on l'affiche dans la liste
                            context._locationsToBeDisplayed.unshift(context._suggestedLocations[i]);
                            context._fillAutoCompletedLocationListContainer(context._locationsToBeDisplayed);
                        }
                    }
                },
                /** callback onFailure */
                onFailure : function () {
                    // si on n'a pas réussi à récupérer les coordonnées, on affiche quand même le résultat
                    if ( context._suggestedLocations && context._suggestedLocations[i] ) {
                        context._createAutoCompletedLocationElement(context._suggestedLocations[i], i);
                    }
                }
            });
        },

        /**
        * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
        * (cf. this._createAutoCompleteListElement), and it selects the location.
        * this location displays a marker on the map.
        * FIXME
        * TODO
        *
        * @param {Object} e - HTMLElement
        *
        * @private
        */
        onAutoCompletedResultsItemClick : function (e) {

            var idx = ID.index(e.target.id);
            var label = e.target.innerHTML;
            logger.log(idx, label);
            logger.log(this._locationsToBeDisplayed[idx]);

            if (!idx) {
                return;
            }

            // FIXME
            // les coordonnées sont inversées entre les 2 services !?
            // AutoCompletion : lon/lat
            // Geocoding : lat/lon
            var position = {
                x : this._locationsToBeDisplayed[idx].position.y,
                y : this._locationsToBeDisplayed[idx].position.x
            };
            var info = {
                service : "SuggestedLocation",
                type : this._locationsToBeDisplayed[idx].type,
                fields : this._locationsToBeDisplayed[idx]
            };

            var zoom = this._getZoom(info);

            this._setLabel(label);
            this._setPosition(position, zoom);
            if (this.options.displayMarker) {
                this._setMarker(position, info, this.options.displayInfo, this.options.markerStyle);
            }
        },

        // ################################################################### //
        // ################### handlers events Geocode ####################### //
        // ################################################################### //

        /**
        * this method is called by event 'submit' on 'GPsearchInput' tag form
        * (cf. this._createSearchInputElement), and it gets the value of input.
        * this value is passed as a parameter for the service geocoding.
        * the results of the request are displayed into a window.
        *
        * @param {Object} e - HTMLElement
        *
        * @private
        */
        onGeocodingSearchSubmit : function (e) {
            logger.log(e);
            var value = e.target[0].value;
            if (!value) {
                return;
            }

            // aucun droits !
            // on evite une requête...
            if (this._noRightManagement) {
                return;
            }

            // on sauvegarde le localisant
            this._currentGeocodingLocation = value;

            // on met en place l'affichage des resultats dans une fenetre de recherche.
            var context = this;
            this._requestGeocoding({
                location : value,
                /** callback onSuccess */
                onSuccess : function (results) {
                    logger.log(results);
                    if (results) {
                        var locations = results.locations;
                        context._fillGeocodedLocationListContainer(locations);
                    }
                },
                /** callback onFailure */
                onFailure : function (error) {
                    // FIXME cf. this.onAutoCompleteSearch()
                    context._clearGeocodedLocation();
                    logger.log(error.message);
                }
            });

        },

        /**
        * this method is called by event 'submit' on 'GPgeocodeResultsList' tag div
        * (cf. this._createGeocodeResultsListElement), and it selects the location.
        * this location displays a marker on the map.
        *
        * @param {Object} e - HTMLElement
        *
        * @private
        */
        onGeocodedResultsItemClick : function (e) {

            var idx = ID.index(e.target.id);
            var label = e.target.innerHTML;

            logger.log(idx, label);
            logger.log(this._geocodedLocations[idx]);

            if (!idx) {
                return;
            }

            var position = this._geocodedLocations[idx].position;
            var info = {
                service : "DirectGeocodedLocation",
                type : this._geocodedLocations[idx].type,
                fields : this._geocodedLocations[idx].placeAttributes
            };

            var zoom = this._getZoom(info);

            this._setLabel(label);
            this._setPosition(position, zoom);
            if (this.options.displayMarker) {
                this._setMarker(position, info, this.options.displayInfo, this.options.markerStyle);
            }
        },

        // ################################################################### //
        // ############## handlers events Geocode Advanced ################### //
        // ################################################################### //

        /**
        * this method is called by event 'change' on 'GPadvancedSearchCode' tag select
        * (cf. this._createAdvancedSearchFormCodeElement), and it gets the value of
        * option selected.
        * this value is passed as a parameter to create the attributs container.
        *
        * @param {Object} e - HTMLElement
        *
        * @private
        */
        onGeocodingAdvancedSearchCodeChange : function (e) {
            logger.log(e);
            var idx   = e.target.selectedIndex;
            var value = e.target.options[idx].value;

            if (!value) {
                return;
            }

            // INFORMATION
            // le declenchement de l'evenement va creer un container de filtre à la volée...
            // l'insertion des containers d'attributs dans le DOM sont :
            // - soit GPadvancedSearchFilters > PositionOfInterest
            // - soit GPadvancedSearchFilters > StreetAddress
            // - soit GPadvancedSearchFilters > CadastralParcel
            // cf. _setFilter() pour la creation du container

            this._setFilter(value);
        },

        /**
        * this method is called by event 'submit' on 'GPadvancedSearchForm' tag form
        * (cf. this._createAdvancedSearchPanelFormElement), and it gets the value of all input.
        * this value is passed as a parameter for the service geocoding.
        * the results of the request are displayed into a window.
        * TODO
        *
        * @param {Object} e - HTMLElement
        * @param {Array} data - [{key: ..., value: ...}]
        *
        * @private
        */
        onGeocodingAdvancedSearchSubmit : function (e, data) {
            logger.log(data);
            if ( !data || data.length === 0) {
                return;
            }

            // recuperation des parametres des filtres pour les transmettre
            // à la requête, ainsi que le type de table de ressources de geocodage,
            // et le localisant
            var _filterOptions = {};
            _filterOptions["type"] = [this._currentGeocodingCode];

            var _location = this._currentGeocodingLocation || "";
            if (this._currentGeocodingCode === "CadastralParcel") {
                _location = ""; // on ne souhaite plus la saisie libre...
            }

            for (var i = 0; i < data.length; i++) {
                var filter = data[i];
                // on ne verifie pas les clefs sans valeur...
                if (!filter.value) {
                    continue;
                }

                var filters = this._advancedSearchFilters[this._currentGeocodingCode];
                for (var j = 0; j < filters.length; j++) {
                    var o = filters[j];

                    if (o.name === filter.key) {
                        if (o.filter) {
                            _filterOptions[filter.key] = filter.value;
                        } else {
                            // on concatene tous les valeurs des champs de recherche,
                            // et on complete au besoin avec les valeur par defaut
                            // (ex. '_')
                            if (o.value) {
                                var cur = filter.value.length;
                                var max = o.value.length;
                                if (max !== cur) {
                                    var masked = max - cur;
                                    var filler = o.value.charAt(0);
                                    while (filler.length < masked) {
                                        filler += filler;
                                    }
                                    var fillerSlice = filler.slice(0, masked);
                                    filter.value = filter.value + fillerSlice;

                                }
                                // la location est de type concaténée dite "freeform"
                                _location += filter.value;
                            } else {
                                // on est dans le cas où l'utilisateur utilise
                                // la location structurée de la recherche avancée,
                                // donc on ne tient plus compte de la saisie libre...
                                if ( typeof _location === "string" ) {
                                    _location = {};
                                }
                                _location[filter.key] = filter.value;
                            }
                        }
                    }

                }
            }

            // on met en place l'affichage des resultats dans une fenetre de recherche.
            var context = this;
            this._requestGeocoding({
                location : _location,
                filterOptions : _filterOptions,
                /** callback onSuccess */
                onSuccess : function (results) {
                    logger.log(results);
                    if (results) {
                        var locations = results.locations;
                        context._fillGeocodedLocationListContainer(locations);
                    }
                },
                /** callback onFailure */
                onFailure : function (error) {
                    // FIXME cf. this.onAutoCompleteSearch()
                    context._clearGeocodedLocation();
                    logger.log(error.message);
                }
            });

        },

        // ################################################################### //
        // ###### METHODES PUBLIQUES (INTERFACE AVEC LE CONTROLE) ############ //
        // ################################################################### //

        /**
        * This method is public.
        * It allows to control the execution of a geocoding or an autocompletion.
        *
        * @param {String} text - location
        * @param {Boolean} type - true (geocoding) / false (autocompletion)
        * @param {Object} options - options
        */
        setText : function (text, type, options) {

            if (!this._showContainer.checked) {
                this._pictoContainer.click();
            }

            // on récupere les options des services
            L.Util.extend(this.options, options);

            var element = L.DomUtil.get("GPsearchInputText-" + this._uid);
            element.value = text;
            if (type) {
                var form = L.DomUtil.get("GPsearchInput-" + this._uid);
                form.dispatchEvent(new Event("submit", {
                    bubbles    : true,
                    cancelable : true
                }));
            } else {
                element.dispatchEvent(new KeyboardEvent("keyup"));
            }
        }
    });

    return SearchEngine;
});
