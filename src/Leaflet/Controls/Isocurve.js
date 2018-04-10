import L from "leaflet";
import Logger from "../../Common/Utils/LoggerByDefault";
import Gp from "gp";
import RightManagement from "../../Common/Utils/CheckRightManagement";
import ID from "../../Common/Utils/SelectorID";
import LocationSelector from "./LocationSelector";
import IsoDOM from "../../Common/Controls/IsoDOM";

var logger = Logger.getLogger("Isocurve");

/**
 * @classdesc
 *
 * Leaflet Control Class to compute and display Isochrone or isodistances curves.
 *
 * Use {@link module:Controls.Isocurve L.geoportalControl.Isocurve()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control" target="_blank">L.Control</a> native class.
 *
 * @namespace
 * @alias L.geoportalControl.Isocurve
 */
var Isocurve = L.Control.extend(/** @lends L.geoportalControl.Isocurve.prototype */ {

    includes : IsoDOM,

    /**
     * Options du service
     *
     * @private
     */
    options : {
        position : "topleft",
        collapsed : true, // plier !
        methods : ["time", "distance"],
        graphs : ["Voiture", "Pieton"],
        exclusions : {
            toll : false,
            tunnel : false,
            bridge : false
        },
        directions : ["departure", "arrival"],
        disableReverse : false,
        isocurveOptions : {},
        autocompleteOptions : {}
    },

    /**
     * constructor
     *
     * @private
     * @param {Object} options - Isocurve control options
     * @param {Sting}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
     * @param {Boolean} [options.collapsed] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
     * @param {Object}  [options.exclusions] - list of exclusions with status (true = checked), by default : ["toll":false, "tunnel":false, "bridge":false].
     * @param {Array}   [options.graphs] - list of graph resources to be used for isocurve calculation, by default : ["Voiture", "Pieton"]. The first element is selected.
     * @param {Array}   [options.methods] - list of methods, by default : ["time", "distance"]. The first element is selected by default.
     * @param {Array}   [options.directions] - list of directions to be displayed, by default : ["departure", "arrival"]. The first element is selected by default.
     *      Directions enable to specify if input location point will be used as a departure point ("departure") or as an arrival point ("arrival")
     * @param {Boolean} [options.disableReverse = false] - whether to enable/disable the reverse geocoding
     * @param {Object} [options.isocurveOptions] - isocurve service options.
     * @param {Object} [options.autocompleteOptions] - autocomplete service options.
     * @example
     *  var iso = L.geoportalControl.Isocurve({
     *      collapsed : false
     *      methods : ["time", "distance"],
     *      exclusions : {
     *         toll : true,
     *         bridge : false,
     *         tunnel : true
     *      },
     *      graphs : ["Pieton", "Voiture"],
     *      isocurveOptions : {},
     *      autocompleteOptions : {}
     *  });
     */
    initialize : function (options) {
        // on transmet les options au controle
        L.Util.setOptions(this, options);

        /** uuid */
        this._uid = ID.generate();

        /** detection du support : desktop ou tactile */
        this._isDesktop = this._detectSupport();

        /** detection si le panneau est reduit */
        // on desactive l'impl. reduction de la fenetre
        // this._reducePanel = false;

        /** container principaux */
        this._waitingContainer = null;
        this._showContainer = null;
        this._pictoContainer = null;
        this._formContainer = null;
        this._submitContainer = null;

        /** Mode de transport selectionné : 'Voiture' ou 'Pieton' */
        this._currentTransport = null;

        /** Sens du parcours selectionné : 'Départ' ou 'Arrivée' */
        this._currentDirection = null;

        /** Type d'isochrone et valeur selectionné : 'isochrone' ou 'distance' */
        this._currentComputation = null;
        this._currentTimeHour = 0;
        this._currentTimeMinute = 0;
        this._currentDistance = 0;

        /** Exclusions selectionnées : Tunnel, Toll et Bridge */
        this._currentExclusions = [];

        // initialisation
        this._initTransport();
        this._initComputation();
        this._initDirection();
        this._initExclusions();

        /** le point */
        this._currentPoint = null;

        /** la geometrie de l'isochrone */
        this._geojsonIso = null;

        /** si un calcul est en cours ou non */
        this._waiting = false;
        /** timer pour cacher la patience après un certain temps */
        this._timer = null;

        /**
         * reponse du service
         * Ex. {
         *   totalTime, totalDistance, bbox, routeGeometry,
         *   routeInstructions : [{duration, distance, code, instruction, bbox, geometry}]
         * }
         */
        this._currentIsoResults = null;

        /**
         * liste des ressources avec droits par service
         * Ex. {
         *   "IsoChrone" : {
         *       key : "ger4g456re45er456t4er5ge5",
         *       resources : ["Pieton", "Voiture"]
         *   }
         * }
         */
        this._resources = {};

        /** aucun droits sur les ressources */
        this._noRightManagement = false;

        // gestion des droits sur les ressources/services
        this._checkRightsManagement();
    },

    /**
     * this method is called by this.addTo(map) when the control is added on the map
     * and fills variable 'this._container = this.onAdd(map)',
     * and create or disable events on map.
     * @param {L.Map} map - object map
     * @returns {DOMElement} container
     * @private
     */
    onAdd : function (map) {
        // initialisation du DOM du composant
        var container = this._container = this._initLayout(map);

        // deactivate of events that may interfere with the map
        L.DomEvent
            .disableClickPropagation(container)
            .disableScrollPropagation(container);

        return container;
    },

    /**
     * TODO this method is called when the control is removed from the map
     * and removes events on map.
     *
     * @private
     */
    onRemove : function (/* map */) {},

    // ################################################################### //
    // ####################### init application ########################## //
    // ################################################################### //

    /**
     * this method is called by the constructor and initialize the ...
     *
     * @private
     */
    _initTransport : function () {
        // Mode de transport selectionné
        this._currentTransport = "Voiture"; // par defaut

        // par defaut
        var transport = this.options.graphs;
        if (!transport || transport.length === 0) {
            this.options.graphs = ["Voiture", "Pieton"];
        }

        // option
        if (L.Util.isArray(transport) && transport.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (transport[0] === "Voiture" || transport[0] === "Pieton") {
                this._currentTransport = transport[0];
            }
        }

        // option sur le service
        var serviceOptions = this.options.isocurveOptions;
        if (serviceOptions.graph) {
            this._currentTransport = serviceOptions.graph;
        }
    },

    /**
     * this method is called by the constructor and initialize the ...
     *
     * @private
     */
    _initDirection : function () {
        this._currentDirection = "departure"; // par defaut

        // par defaut
        var directions = this.options.directions;
        if (!directions || directions.length === 0) {
            this.options.directions = ["departure", "arrival"];
        }

        // option
        if (L.Util.isArray(directions) && directions.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (directions[0] === "departure" || directions[0] === "arrival") {
                this._currentDirection = directions[0];
            }
        }

        // si l'utilisateur a spécifié une méthode dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (!serviceOptions.reverse) {
            this._currentDirection = "departure";
        }
        if (serviceOptions.reverse === true) {
            this._currentDirection = "arrival";
            this.options.directions = ["arrival", "departure"];
        }
    },

    /**
     * this method is called by the constructor and initialize the ...
     *
     * @private
     */
    _initComputation : function () {
        // Mode de calcul selectionné
        this._currentComputation = "time"; // par defaut

        // par defaut
        var methods = this.options.methods;
        if (!methods || methods.length === 0) {
            this.options.methods = ["time", "distance"];
        }

        // option
        if (L.Util.isArray(methods) && methods.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (methods[0] === "time" || methods[0] === "distance") {
                this._currentComputation = methods[0];
            }
        }

        // si l'utilisateur a spécifié une méthode dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (serviceOptions.method) {
            this._currentComputation = serviceOptions.method;
        }
        if (serviceOptions.time) {
            this._currentComputation = "time";
        }
        if (serviceOptions.distance) {
            this._currentComputation = "distance";
        }
    },

    /**
     * this method is called by the constructor and initialize the ...
     *
     * @private
     */
    _initExclusions : function () {
        // Exclusions selectionnées : Tunnel, Toll et Bridge
        this._currentExclusions = []; // par defaut

        // par defaut
        var exclusion = this.options.exclusions;
        if (!exclusion || (typeof exclusion === "object" && Object.keys(exclusion).length === 0)) {
            this.options.exclusions = {
                toll : false,
                tunnel : false,
                bridge : false
            };
        }

        // option
        if (exclusion && typeof exclusion === "object" && Object.keys(exclusion).length) {
            for (var k in exclusion) {
                if (exclusion.hasOwnProperty(k)) {
                    if (exclusion.k) {
                        this._currentExclusions.push(k);
                    }
                }
            }
        }

        // si l'utilisateur a spécifié des exclusions dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (Array.isArray(serviceOptions.exclusions)) {
            this._currentExclusions = serviceOptions.exclusions;
        }
    },

    // ################################################################### //
    // ############################## other init ######################### //
    // ################################################################### //

    /**
     * this method is called by constructor
     * and check the rights to resources
     *
     * @private
     */
    _checkRightsManagement : function () {
        var _opts = null;
        var _res = [];
        var _key = null;

        // les ressources du service du calcul d'isochrone
        _key = this.options.isocurveOptions.apiKey;
        _opts = this.options.isocurveOptions.filterOptions;
        _res = (_opts) ? _opts.type : [];
        if (!_res || _res.length === 0) {
            _res = ["Voiture", "Pieton"];
        }

        var rightManagementIsochrone = RightManagement.check({
            key : _key || this.options.apiKey,
            resources : _res,
            services : ["Isochrone"]
        });
        logger.log("rightManagementIsochrone", rightManagementIsochrone);

        // les ressources du service d'autocompletion
        _key = this.options.autocompleteOptions.apiKey;
        _opts = this.options.autocompleteOptions.filterOptions;
        _res = (_opts) ? _opts.type : [];
        if (!_res || _res.length === 0) {
            _res = [
                "PositionOfInterest",
                "StreetAddress"
            ];
        }

        var rightManagementAutoComplete = RightManagement.check({
            key : _key || this.options.apiKey,
            resources : _res,
            services : ["AutoCompletion"]
        });
        logger.log("rightManagementAutoComplete", rightManagementAutoComplete);

        // au cas où pas de droit !
        if (!rightManagementIsochrone && !rightManagementAutoComplete) {
            this._noRightManagement = true;
        }

        // FIXME je reconstruis differement la structure pour la gestion des clefs differentes
        // pour chaque service...
        if (rightManagementAutoComplete) {
            this._resources["AutoCompletion"] = {};
            this._resources["AutoCompletion"]["resources"] = rightManagementAutoComplete["AutoCompletion"];
            this._resources["AutoCompletion"]["key"] = rightManagementAutoComplete["key"];
        }

        if (rightManagementIsochrone) {
            this._resources["Isochrone"] = {};
            this._resources["Isochrone"]["resources"] = rightManagementIsochrone["Isochrone"];
            this._resources["Isochrone"]["key"] = rightManagementIsochrone["key"];
        }
    },

    /**
     * this method is called by the constructor.
     * this information is useful to switch to touch mode.
     * Detection : test for desktop or tactile
     * @returns {Boolean} desktop or tactile
     * @private
     */
    _detectSupport : function () {
        // TODO
        // Choix de gérer la détection dans le code du composant au lieu du DOM car :
        // Utilisation de l'implémentation Leaflet
        // http://leafletjs.com/reference.html#browser

        var isDesktop = true;
        var userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf("iphone") !== -1 ||
            userAgent.indexOf("ipod") !== -1 ||
            userAgent.indexOf("ipad") !== -1 ||
            userAgent.indexOf("android") !== -1 ||
            userAgent.indexOf("mobile") !== -1 ||
            userAgent.indexOf("blackberry") !== -1 ||
            userAgent.indexOf("tablet") !== -1 ||
            userAgent.indexOf("phone") !== -1 ||
            userAgent.indexOf("touch") !== -1) {
            isDesktop = false;
        }

        if (userAgent.indexOf("msie") !== -1 ||
            userAgent.indexOf("trident") !== -1) {
            isDesktop = true;
        }

        return isDesktop;
    },

    // ################################################################### //
    // ########################### init dom ############################## //
    // ################################################################### //

    /**
     * this method is called by this.onAdd(map)
     * and initialize the container HTMLElement
     * @param {L.Map} map - object map
     * @returns {DOMElement} container
     * @private
     */
    _initLayout : function (map) {
        // create main container
        var container = this._createMainContainerElement();

        var inputShow = this._showContainer = this._createShowIsoElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if (!this.options.collapsed) {
            inputShow.checked = true;
        }

        var picto = this._pictoContainer = this._createShowIsoPictoElement();
        container.appendChild(picto);

        // panneau
        var panel = this._createIsoPanelElement();

        // header
        var header = this._createIsoPanelHeaderElement();
        panel.appendChild(header);

        // form
        var form = this._formContainer = this._createIsoPanelFormElement();

        // form: menu des points
        var point = this._createIsoPanelFormPointElement(map);
        form.appendChild(point);

        // form: menu du choix de la méthode de calcul (time ou distance)
        var isoChronChecked = false;
        var isoDistChecked = false;
        var typeChoice = this._createIsoPanelFormTypeChoiceElement();
        for (var i = 0; i < this.options.methods.length; i++) {
            if (this.options.methods[i] === "time") {
                isoChronChecked = (i === 0);
                typeChoice.appendChild(this._createIsoPanelFormTypeChoiceChronElement(isoChronChecked));
            }
            if (this.options.methods[i] === "distance") {
                isoDistChecked = (i === 0);
                typeChoice.appendChild(this._createIsoPanelFormTypeChoiceDistElement(isoDistChecked));
            }
        }
        form.appendChild(typeChoice);

        // form: menu du choix des valeurs
        form.appendChild(this._createIsoPanelFormValueIsochronElement(isoChronChecked));
        form.appendChild(this._createIsoPanelFormValueIsodistanceElement(isoDistChecked));

        // form: menu du choix du transport et du sens du parcours
        var modeChoice = this._createIsoPanelFormModeChoiceElement();
        modeChoice.appendChild(this._createIsoPanelFormModeChoiceTransportElement(this.options.graphs));
        modeChoice.appendChild(this._createIsoPanelFormModeChoiceDirectionElement(this.options.directions));
        form.appendChild(modeChoice);

        // form: menu des exclusions
        if (this.options.exclusions && (typeof this.options.exclusions === "object") && (Object.keys(this.options.exclusions).length !== 0)) {
            form.appendChild(this._createShowIsoExclusionsElement());
            form.appendChild(this._createShowIsoExclusionsPictoElement());
            var exclusion = this._createIsoPanelFormExclusionsElement();
            exclusion.appendChild(this._createIsoPanelFormExclusionOptionsElement(this.options.exclusions));
            form.appendChild(exclusion);
        }

        var divReset = this._createIsoFormResetElement();
        form.appendChild(divReset);

        // form: bouton du calcul
        var submit = this._submitContainer = this._createIsoSubmitFormElement();
        form.appendChild(submit);

        panel.appendChild(form);

        // waiting
        var waiting = this._waitingContainer = this._createIsoWaitingElement();
        panel.appendChild(waiting);

        container.appendChild(panel);

        return container;
    },

    // ################################################################### //
    // ############################## DOM ################################ //
    // ################################################################### //

    /**
     * Create a Point
     * OVERWRITTEN
     * @param {L.Map} map - object map
     * @returns {Object} DOM element
     * @private
     */
    _createIsoPanelFormPointElement : function (map) {
        // point de depart
        this._currentPoint = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : 0,
                unique : this._uid,
                label : "Départ",
                color : "red",
                display : true
            },
            displayInfo : true,
            disableReverse : this.options.disableReverse,
            autocompleteOptions : this.options.autocompleteOptions || null
        });
        this._currentPoint.setMap(map);

        return this._currentPoint.getContainer();
    },

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPshowIsochronPicto' picto
     * (cf. this._createShowIsoPictoElement),
     * and clear inputs and previous isochrone drawings
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onShowIsoPanelClick : function (e) {
        logger.log("onShowIsoPanelClick", e);
        // on desactive l'impl. reduction de la fenetre
        // if (this._geojsonIso && !this._reducePanel) {
        //     this._clear();
        // }
        // this._reducePanel = false;
    },

    /**
     * this method is called by event 'click' on '' arrow button
     * (cf. this.),
     * and clear inputs and previous isochrone drawings
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoResetClick : function (e) {
        logger.log("onIsoResetClick", e);

        this._clear();
    },

    // // on desactive l'impl. reduction de la fenetre
    // /**
    // * this method is called by event 'click' on 'GPisochronPanelReduce' picto
    // * (cf. this.),
    // * and reduce the panel
    // *
    // * @private
    // */
    // onReduceIsoPanelClick : function () {
    //     logger.log("onReduceIsoPanelClick");
    //     this._reducePanel = true;
    // },

    /**
     * this method is called by event 'change' on 'GPisochronChoiceAltDist' or 'GPisochronChoiceAltChron'
     * input (cf. this._createIsoPanelFormTypeChoiceElement),
     * and updates current computation mode
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoTypeChoiceChange : function (e) {
        var value = e.target.value;

        if (!value) {
            return;
        }

        if (value === "isodistance") {
            this._currentComputation = "distance";
        }
        if (value === "isochron") {
            this._currentComputation = "time";
        }
    },

    /**
     * this method is called by event 'click' on 'GPisochronTransportPedestrian' or 'GPisochronTransportCar'
     * input (cf. this._createIsoPanelFormModeChoiceTransportElement),
     * and updates current transport mode
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoModeTransportChange : function (e) {
        var value = e.target.value;

        if (!value) {
            return;
        }
        this._currentTransport = value;
    },

    /**
     * this method is called by event 'change' on 'GPisochronDirectionSelect' select
     * (cf. this._createIsoPanelFormModeChoiceDirectionElement),
     * and updates current direction mode
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoModeDirectionChange : function (e) {
        var value = e.target.value;

        if (!value) {
            return;
        }

        this._currentDirection = value;
    },

    /**
     * this method is called by event 'change' on ''
     * input (cf. this.),
     * and updates current time value
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoValueChronTimeHourChange : function (e) {
        var value = e.target.value;

        // pointer to...
        this._timeHourContainer = e.target;

        if (!value) {
            return;
        }

        this._currentTimeHour = value;
    },

    /**
     * this method is called by event 'change' on ''
     * input (cf. this.),
     * and updates current time value
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoValueChronTimeMinuteChange : function (e) {
        var value = e.target.value;

        // pointer to...
        this._timeMinuteContainer = e.target;

        if (!value) {
            return;
        }

        this._currentTimeMinute = value;
    },

    /**
     * this method is called by event 'change' on ''
     * input (cf. this.),
     * and updates current distance value
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoValueDistChange : function (e) {
        var value = e.target.value;

        // pointer to...
        this._distanceContainer = e.target;

        if (!value) {
            return;
        }

        this._currentDistance = value;
    },

    /**
     * this method is called by event 'change' on 'GPIsoExclusionsToll'
     * or 'GPIsoeExclusionsTunnel' or 'GPIsoExclusionsBridge' tag input
     * (cf. this._createIsoPanelFormExclusionOptionsElement).
     * this value is saved as a parameter for the service isocurve.
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onIsoExclusionsChange : function (e) {
        var value = e.target.value;
        var checked = e.target.checked;

        if (!value) {
            return;
        }

        var bFound = false;
        var iFound = null;
        for (var i = 0; i < this._currentExclusions.length; i++) {
            if (this._currentExclusions[i] === value) {
                iFound = i;
                bFound = true;
            }
        }
        // on l'ajoute si la valeur n'existe pas et est selectionnée
        if (!bFound && !checked) {
            this._currentExclusions.push(value);
        }
        // on la retire si la valeur existe et est deselectionnée
        if (bFound && checked) {
            this._currentExclusions.splice(iFound, 1);
        }
    },

    /**
     * this method is called by event 'submit' on 'GPisochronForm' tag form
     * (cf. this._createIsoPanelFormElement),
     * and call isocurve service to display results
     *
     * @private
     */
    onIsoComputationSubmit : function () {
        if (!this._currentPoint || !this._currentPoint.getCoordinate || !this._currentPoint.getCoordinate()) {
            return;
        }

        // récupération du temps
        var time;
        if (this._currentComputation.toLowerCase() === "time") {
            // durée exprimée en secondes
            time = this._currentTimeHour * 3600 + this._currentTimeMinute * 60;
            logger.log("time : ", time);
        }

        // récupération de la distance
        var distance;
        if (this._currentComputation.toLowerCase() === "distance") {
            // distance exprimée en mètres
            distance = this._currentDistance * 1000;
            logger.log("distance : ", distance);
        }

        // si on n'a pas de valeur de calcul renseignée, on ne lance pas la requête.
        if (!time && !distance) {
            logger.log("Missing time or distance parameter");
            return;
        }

        // oups, aucun droits !
        // on evite donc une requête inutile ...
        if (this._noRightManagement) {
            return;
        }

        // mise en place de la patience
        this._displayWaitingContainer();

        var self = this;

        this._requestIsoCurve({
            position : self._currentPoint.getCoordinate(),
            graph : self._currentTransport,
            exclusions : self._currentExclusions,
            method : self._currentComputation,
            reverse : (self._currentDirection.toLowerCase() === "arrival"),
            time : time,
            distance : distance,
            smoothing : true,
            timeout : 7000,
            protocol : "XHR",

            /** callback onSuccess */
            onSuccess : function (results) {
                logger.log(results);
                if (results) {
                    self._drawIsoResults(results);
                }
            },

            /** callback onFailure */
            onFailure : function (error) {
                // FIXME mise à jour du controle mais le service ne repond pas en 200 !?
                self._hideWaitingContainer();

                self._clearIsoResultsGeometry();
                logger.log(error.message);
            }
        });
    },

    // ################################################################### //
    // ######################## isocurve calculation ##################### //
    // ################################################################### //

    /**
     * this method is called by this.onIsoComputationSubmit
     * and executes a request to the service.
     *
     * @param {Object} settings - service settings
     *
     * @private
     */
    _requestIsoCurve : function (settings) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!settings ||
            ((typeof settings === "object") && (Object.keys(settings).length === 0))) {
            return;
        }

        // on ne fait pas de requête si on n'a pas de point d'origine
        if (!settings.position) {
            return;
        }

        // ni si on n'a aucun droit
        if (this._noRightManagement) {
            return;
        }

        // gestion des droits !
        var services = this._resources["Isochrone"];
        if (!services) {
            return;
        }
        var resources = services.resources;
        if (!resources ||
            (typeof resources === "object" && Object.keys(resources).length === 0)) {
            return;
        }

        var options = {};
        // on recupere les parametres de saisie et les callbacks
        L.Util.extend(options, settings);
        // ainsi que les options du service
        L.Util.extend(options, this.options.isocurveOptions);

        // la ressource donne elle des droits ?
        var bFound = false;
        for (var i = 0; i < resources.length; i++) {
            if (resources[i] === options.graph) {
                bFound = true;
            }
        }
        // on fait quoi ?
        if (!bFound) {
            console.log("no rights for this service !?");
            return;
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
        var key = this._resources["Isochrone"]["key"];
        options.apiKey = this.options.isocurveOptions.apiKey || this.options.apiKey || key;

        logger.log(options);

        Gp.Services.isoCurve(options);
    },

    /**
     * this method is called by this.onIsoComputationSubmit (in case of success)
     * and draw isocurve results geometry on map
     *
     * @param {Object} results - isocurve response results
     *
     * @private
     */
    _drawIsoResults : function (results) {
        this._clearIsoResultsGeometry();

        // sauvegarde de l'etat des resultats
        this._currentIsoResults = results;

        if (!results.geometry) {
            // cache la patience
            this._hideWaitingContainer();
            return;
        }

        var map = this._map;

        var _geometry = results.geometry;

        var _style = {
            color : "#ff7800",
            weight : 5,
            opacity : 0.65
        };

        this._geojsonIso = L.geoJson(_geometry, {
            style : _style
        }).addTo(map);

        // cache la patience
        this._hideWaitingContainer();
        this._formContainer.className = "GPisochroComponentHidden";
    },

    // ################################################################### //
    // ############################# Clean ############################### //
    // ################################################################### //

    /**
     * this method is called by this.onShowIsoPanelClick()
     * and it clears all elements (reinit).
     *
     * @private
     */
    _clear : function () {
        this._initTransport();
        this._initExclusions();
        this._initComputation();
        this._initDirection();

        // resultats du service
        this._currentIsoResults = null;

        // la geometrie
        this._clearIsoResultsGeometry();

        // les points
        this._currentPoint.clear();

        // nettoyer les valeurs dans le DOM !
        if (this._timeHourContainer) {
            this._timeHourContainer.value = 0;
        }
        if (this._timeMinuteContainer) {
            this._timeMinuteContainer.value = 0;
        }
        if (this._distanceContainer) {
            this._distanceContainer.value = 0;
        }
    },

    /**
     * this method is called by this.onIsoComputationSubmit()
     * and it clears all route geometries.
     *
     * @private
     */
    _clearIsoResultsGeometry : function () {
        var map = this._map;

        if (this._geojsonIso != null) {
            map.removeLayer(this._geojsonIso);
            this._geojsonIso = null;
        }
    },

    // ################################################################### //
    // ############################ Patience ############################# //
    // ################################################################### //

    /**
     * this method displays waiting container and sets a timeout
     *
     * @private
     */
    _displayWaitingContainer : function () {
        this._waitingContainer.className = "GPisochronCalcWaitingContainerVisible";
        this._waiting = true;

        // mise en place d'un timeout pour réinitialiser le panel (cacher la patience)
        // si on est toujours en attente (si la requête est bloquée par exemple)
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        var context = this;
        this._timer = setTimeout(function () {
            if (context._waiting === true) {
                context._hideWaitingContainer();
            } else {
                if (context._timer) {
                    clearTimeout(context._timer);
                }
            }
        }, 16000);
    },

    /**
     * this method hides waiting container and clears timeout
     *
     * @private
     */
    _hideWaitingContainer : function () {
        if (this._waiting) {
            this._waitingContainer.className = "GPisochronCalcWaitingContainerHidden";
            this._waiting = false;
            clearTimeout(this._timer);
            this._timer = null;
        }
    },

    // ################################################################### //
    // ###### METHODES PUBLIQUES (INTERFACE AVEC LE CONTROLE) ############ //
    // ################################################################### //

    /**
     * This method is public.
     * It allows to control the execution of a traitment.
     *
     * @param {Object} position - position = {lon: , lat: }
     * @param {Object} value - distance en km ou heures-minutes
     * @param {Object} options - options = {...}
     */
    compute : function (position, value, options) {
        if (!this._showContainer.checked) {
            this._pictoContainer.click();
        }

        var map = this._map;
        if (!map) {
            return;
        }

        // Les options par defauts
        var settings = {
            direction : "departure",
            method : "time",
            transport : "Voiture",
            exclusions : []
        };

        // On recupere les options
        L.Util.extend(settings, options);

        this._currentPoint.setCoordinate(position);
        var input = L.DomUtil.get("GPlocationOrigin_" + 0 + "-" + this._uid);
        input.value = position.lng + " , " + position.lat;

        this._currentTransport = settings.transport;
        if (settings.transport === "Voiture") {
            L.DomUtil.get("GPisochronTransportCar-" + this._uid).checked = true;
        } else {
            L.DomUtil.get("GPisochronTransportPedestrian-" + this._uid).checked = true;
        }

        this._currentExclusions = settings.exclusions;

        this._currentComputation = settings.method;
        if (settings.method === "time") {
            var time = value.split(".");
            this._currentTimeHour = time[0] || 0;
            L.DomUtil.get("GPisochronValueChronInput1-" + this._uid).value = this._currentTimeHour;
            this._currentTimeMinute = time[1] || 0;
            L.DomUtil.get("GPisochronValueChronInput2-" + this._uid).value = this._currentTimeMinute;
            L.DomUtil.get("GPisochronChoiceAltChron-" + this._uid).click();
        } else {
            this._currentDistance = value;
            L.DomUtil.get("GPisochronValueDistInput-" + this._uid).value = this._currentDistance;
            L.DomUtil.get("GPisochronChoiceAltDist-" + this._uid).click();
        }

        this._currentDirection = settings.direction;
        (settings.direction === "departure")
            ? L.DomUtil.get("GPisochronDirectionSelect-" + this._uid).selectedIndex = 0 : L.DomUtil.get("GPisochronDirectionSelect-" + this._uid).selectedIndex = 1;

        this.onIsoComputationSubmit();

        map.flyTo(position);
    }

});

export default Isocurve;
