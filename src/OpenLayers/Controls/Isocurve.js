// import CSS
import "../CSS/Controls/Isochrone/GPisochronOpenLayers.css";
// import OpenLayers
import Control from "ol/control/Control";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import {
    Fill,
    Style
} from "ol/style";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Utils from "../../Common/Utils";
import Logger from "../../Common/Utils/LoggerByDefault";
import RightManagement from "../../Common/Utils/CheckRightManagement";
import SelectorID from "../../Common/Utils/SelectorID";
import Markers from "./Utils/Markers";
import Draggable from "../../Common/Utils/Draggable";
// import local with ol dependencies
import LayerSwitcher from "./LayerSwitcher";
import LocationSelector from "./LocationSelector";
// DOM
import IsoDOM from "../../Common/Controls/IsoDOM";

var logger = Logger.getLogger("isocurve");

/**
 * @classdesc
 *
 * Isocurve Control.
 *
 * @constructor
 * @alias ol.control.Isocurve
 * @extends {ol.control.Control}
 * @param {Object} options - Isocurve control options
 * @param {String}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object}  [options.exclusions = {toll : false, tunnel : false, bridge : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
 * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of graph resources to be used for isocurve calculation, by default : ["Voiture", "Pieton"]. Possible values are "Voiture" and "Pieton". The first element is selected.
 * @param {Array}   [options.methods = ["time", "distance"]] - list of methods, by default : ["time", "distance"]. Possible values are "time" and "distance". The first element is selected by default.
 * @param {Array}   [options.directions = ["departure", "arrival"]] - list of directions to be displayed, by default : ["departure", "arrival"]. The first element is selected by default. Possible values are "departure" and "arrival".
 *      Directions enable to specify if input location point will be used as a departure point ("departure") or as an arrival point ("arrival")
 * @param {Object} [options.markerOpts] - options to use your own marker. Default is a lightOrange marker.
 * @param {String} [options.markerOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.markerOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
 * @param {Object} [options.isocurveOptions = {}] - isocurve service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~isoCurve Gp.Services.isoCurve()} to know all isocurve options.
 * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Isochrone/Isodistance"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "isochrones/isodistance basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
 * @example
 *  var iso = ol.control.Isocurve({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "methods" : ["time", "distance"],
 *      "exclusions" : {
 *         "toll" : true,
 *         "bridge" : false,
 *         "tunnel" : true
 *      },
 *      "graphs" : ["Pieton", "Voiture"],
 *      "markerOpts" : {
 *          "url" : "...",
 *          "offset" : [0,0]
 *      }
 *      "isocurveOptions" : {},
 *      "autocompleteOptions" : {}
 *  });
 */
var Isocurve = (function (Control) {
    function Isocurve (options) {
        options = options || {};

        if (!(this instanceof Isocurve)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.initialize(options);

        // // Widget main DOM container
        this._container = this._createMainContainerElement();
        // info: le container sera complété lors de l'ajout à la carte (setMap), car certains composants nécessitent d'être liés à la map.
        this._containerElement = null;

        // on peut éventuellement encapsuler le composant dans une div passée par l'utilisateur
        if (options.element && options.element.appendChild) {
            // dans ce cas on stocke les deux container
            options.element.appendChild(this._container);
            this._containerElement = options.element;
        }

        // call ol.control.Control constructor
        Control.call(this, {
            element : this._containerElement || this._container,
            target : options.target,
            render : options.render
        });
    };

    // Inherits from ol.control.Control
    if (Control) Isocurve.__proto__ = Control;

    /**
     * @lends module:Isocurve
     */
    Isocurve.prototype = Object.create(Control.prototype, {});

    // on récupère les méthodes de la classe commune IsoDOM
    Utils.assign(Isocurve.prototype, IsoDOM);

    /**
     * Constructor (alias)
     *
     * @private
     */
    Isocurve.prototype.constructor = Isocurve;

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    Isocurve.prototype.getCollapsed = function () {
        return this.collapsed;
    };

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    Isocurve.prototype.setCollapsed = function (collapsed) {
        if (collapsed === undefined) {
            logger.log("[ERROR] Isocurve:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            document.getElementById("GPisochronPanelClose-" + this._uid).click();
        } else {
            document.getElementById("GPshowIsochronPicto-" + this._uid).click();
        }
        this.collapsed = collapsed;
    };

    /**
     * Get vector layer where Isocurve geometry is drawn
     *
     * @returns {Object} layer - ol.layer.Vector isocurve layer
     */
    Isocurve.prototype.getLayer = function () {
        return this._geojsonLayer;
    };

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    Isocurve.prototype.setMap = function (map) {
        if (map) {
            // enrichissement du DOM du container lors de l'ajout à la carte
            this._container = this._initContainer(map);

            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this._IsoPanelContainer,
                    this._IsoPanelHeaderContainer,
                    map.getTargetElement()
                );
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        Control.prototype.setMap.call(this, map);
    };

    /**
     * This method is public.
     * It allows to control the execution of a traitment.
     *
     * @param {Array} position - position in the projection map [ x, y ]
     * @param {Object} value - distance in km or hours-minutes
     * @param {Object} options - options = {...}
     */
    Isocurve.prototype.compute = function (position, value, options) {
        this._clear();

        if (!this._showIsoContainer.checked) {
            this._pictoIsoContainer.click();
        }

        var map = this.getMap();
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
        Utils.assign(settings, options);

        this._originPoint.setCoordinate(position);
        var coordinate = this._originPoint.getCoordinate();

        var input = document.getElementById("GPlocationOrigin_" + 1 + "-" + this._uid);
        input.value = coordinate[0].toFixed(4) + " / " + coordinate[1].toFixed(4);

        this._currentTransport = settings.transport;
        if (settings.transport === "Voiture") {
            document.getElementById("GPisochronTransportCar-" + this._uid).checked = true;
        } else {
            document.getElementById("GPisochronTransportPedestrian-" + this._uid).checked = true;
        }

        this._currentExclusions = settings.exclusions;

        this._currentComputation = settings.method;
        if (settings.method === "time") {
            var time = value.split(".");
            this._currentTimeHour = time[0] || 0;
            document.getElementById("GPisochronValueChronInput1-" + this._uid).value = this._currentTimeHour;
            this._currentTimeMinute = time[1] || 0;
            document.getElementById("GPisochronValueChronInput2-" + this._uid).value = this._currentTimeMinute;
            document.getElementById("GPisochronChoiceAltChron-" + this._uid).click();
        } else {
            this._currentDistance = value;
            document.getElementById("GPisochronValueDistInput-" + this._uid).value = this._currentDistance;
            document.getElementById("GPisochronChoiceAltDist-" + this._uid).click();
        }

        this._currentDirection = settings.direction;
        (settings.direction === "departure")
            ? document.getElementById("GPisochronDirectionSelect-" + this._uid).selectedIndex = 0 : document.getElementById("GPisochronDirectionSelect-" + this._uid).selectedIndex = 1;

        this.onIsoComputationSubmit();
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize Isocurve control (called by Isocurve constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    Isocurve.prototype.initialize = function (options) {
        this._checkInputOptions(options);

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            methods : ["time", "distance"],
            graphs : ["Voiture", "Pieton"],
            exclusions : {
                toll : false,
                tunnel : false,
                bridge : false
            },
            directions : ["departure", "arrival"],
            markerOpts : {
                url : Markers["lightOrange"],
                offset : Markers.defaultOffset
            },
            isocurveOptions : {},
            autocompleteOptions : {},
            layerDescription : {
                title : "Isochrone/Isodistance",
                description : "isochrones/isodistance basé sur un graphe"
            }
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if isocurve control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if isocurve control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = SelectorID.generate();

        // Options du service paramétrables via l'interface (graph, method, exclusions)
        // Mode de transport selectionné : 'Voiture' ou 'Pieton'
        this._currentTransport = null;
        this._initTransport();
        // Mode de calcul selectionné : 'time' (isochron) ou 'distance' (isodistance)
        this._currentComputation = null;
        this._initComputation();
        // Exclusions selectionnées : Tunnel, Toll et Bridge
        this._currentExclusions = [];
        this._initExclusions();
        // sens de parcours : "departure" ou "arrival"
        this._currentDirection = null;
        this._initDirection();

        // point de saisie
        this._originPoint = null;

        // // containers principaux
        this._showIsoContainer = null;
        this._pictoIsoContainer = null;
        this._waitingContainer = null;
        this._formContainer = null;
        this._IsoPanelContainer = null;
        this._IsoPanelHeaderContainer = null;

        // les résultats du calcul
        this._currentIsoResults = null;

        // la géométrie
        this._geojsonLayer = null;

        // si un calcul est en cours ou non
        this._waiting = false;
        // timer pour cacher la patience après un certain temps
        this._timer = null;

        // styles pour les sélections des features
        this._defaultFeatureStyle = new Style({
            fill : new Fill({
                color : "rgba(0, 183, 152, 0.7)"
            })
        });

        // liste des ressources avec droits par service
        // Ex. {
        //   "Isocurve" : {
        //       key : "ger4g456re45er456t4er5ge5",
        //       resources : ["Pieton", "Voiture"]
        //   }
        // }
        this._resources = {};

        // gestion des droits sur les ressources
        this._noRightManagement = false;

        // gestion des droits sur les ressources/services
        this._checkRightsManagement();

        // listener key for event click on map
        this.listenerKey = null;
    };

    /**
     * this method is called by this.initialize()
     *
     * @param {Object} options - options
     *
     * @private
     */
    Isocurve.prototype._checkInputOptions = function (options) {
        // vérification des options
        // on ne permet pas de n'afficher aucun mode de calcul ou aucun mode de transport ?
        var i;

        // modes de calcul
        if (options.methods) {
            if (Array.isArray(options.methods)) {
                // on ne permet pas de passer un tableau vide : on spécifie au moins une méthode
                if (options.methods.length === 0) {
                    options.methods = null;
                } else {
                    for (i = 0; i < options.methods.length; i++) {
                        if (typeof options.methods[i] !== "string") {
                            logger.log("[ol.control.Isocurve] ERROR : parameter 'methods' elements should be of type 'string'");
                        }
                    }
                }
            } else {
                logger.warn("'methods' parameter should be an array");
                options.methods = null;
            }
        }

        // mode de transport
        if (options.graphs) {
            if (Array.isArray(options.graphs)) {
                // on ne permet pas de passer un tableau vide : on spécifie au moins un graph
                if (options.graphs.length === 0) {
                    options.graphs = null;
                } else {
                    for (i = 0; i < options.graphs.length; i++) {
                        if (typeof options.graphs[i] !== "string") {
                            logger.log("[ol.control.Isocurve] ERROR : parameter 'graphs' elements should be of type 'string'");
                        } else {
                            if (options.graphs[i].toLowerCase() === "pieton") {
                                options.graphs[i] = "Pieton";
                            }
                            if (options.graphs[i].toLowerCase() === "voiture") {
                                options.graphs[i] = "Voiture";
                            }
                        }
                    }
                }
            } else {
                logger.warn("'graphs' parameter should be an array");
                options.graphs = null;
            }
        }

        // sens du parcours
        if (options.directions) {
            if (Array.isArray(options.directions)) {
                // on ne permet pas de passer un tableau vide : on spécifie au moins une direction
                if (options.directions.length === 0) {
                    options.directions = null;
                } else {
                    for (i = 0; i < options.directions.length; i++) {
                        if (typeof options.directions[i] !== "string") {
                            logger.log("[ol.control.Isocurve] ERROR : parameter 'directions' elements should be of type 'string'");
                        }
                    }
                }
            } else {
                logger.warn("'directions' parameter should be an array");
                options.directions = null;
            }
        }

        // collapsed
        if (options.collapsed === "true") {
            options.collapsed = true;
        }
        if (options.collapsed === "false") {
            options.collapsed = false;
        }
    };

    /**
     * this method is called by this.initialize() and initialize transport mode
     * ("Voiture" ou "Pieton")
     *
     * @private
     */
    Isocurve.prototype._initTransport = function () {
        // Mode de transport selectionné
        this._currentTransport = "Voiture"; // par defaut

        // par defaut
        var transports = this.options.graphs;
        if (!transports || transports.length === 0) {
            this.options.graphs = ["Voiture", "Pieton"];
        }

        // option
        if (Array.isArray(transports) && transports.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (transports[0] === "Voiture" || transports[0] === "Pieton") {
                this._currentTransport = transports[0];
            }
        }

        // si l'utilisateur a spécifié un graph dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (serviceOptions.graph) {
            this._currentTransport = serviceOptions.graph;
        }
    };

    /**
     * this method is called by this.initialize() and initialize computation mode
     * (time or distance)
     *
     * @private
     */
    Isocurve.prototype._initComputation = function () {
        // Mode de calcul selectionné
        this._currentComputation = "time"; // par defaut

        // par defaut
        var methods = this.options.methods;
        if (!methods || methods.length === 0) {
            this.options.methods = ["time", "distance"];
        }

        // option
        if (Array.isArray(methods) && methods.length) {
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
    };

    /**
     * this method is called by this.initialize() and initialize direction mode
     * (departure or arrival)
     *
     * @private
     */
    Isocurve.prototype._initDirection = function () {
        // Mode de calcul selectionné
        this._currentDirection = "departure"; // par defaut

        // par defaut
        var directions = this.options.directions;
        if (!directions || directions.length === 0) {
            this.options.directions = ["departure", "arrival"];
        }

        // option
        if (Array.isArray(directions) && directions.length) {
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
    };

    /**
     * this method is called by this.initialize() and initialize exclusions
     *
     * @private
     */
    Isocurve.prototype._initExclusions = function () {
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
    };

    /**
     * Check rights to resources (called by this.initialize())
     *
     * @private
     */
    Isocurve.prototype._checkRightsManagement = function () {
        var _opts = null;
        var _res = [];
        var _key = null;

        // les ressources du service du calcul d'isocurve
        _key = this.options.isocurveOptions.apiKey;
        _opts = this.options.isocurveOptions.filterOptions;
        _res = (_opts) ? _opts.type : [];
        if (!_res || _res.length === 0) {
            _res = ["Voiture", "Pieton"];
        }

        var rightManagementIsocurve = RightManagement.check({
            key : _key || this.options.apiKey,
            resources : _res,
            services : ["Isochrone"]
        });
        logger.log("rightManagementIsocurve", rightManagementIsocurve);

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
        if (!rightManagementIsocurve && !rightManagementAutoComplete) {
            this._noRightManagement = true;
        }

        // FIXME je reconstruis differement la structure pour la gestion des clefs differentes
        // pour chaque service...
        if (rightManagementAutoComplete) {
            this._resources["AutoCompletion"] = {};
            this._resources["AutoCompletion"]["resources"] = rightManagementAutoComplete["AutoCompletion"];
            this._resources["AutoCompletion"]["key"] = rightManagementAutoComplete["key"];
        }

        if (rightManagementIsocurve) {
            this._resources["Isocurve"] = {};
            this._resources["Isocurve"]["resources"] = rightManagementIsocurve["Isochrone"];
            this._resources["Isocurve"]["key"] = rightManagementIsocurve["key"];
        }
    };

    // ################################################################### //
    // ######################## DOM initialize ########################### //
    // ################################################################### //

    /**
     * initialize component container (DOM)
     *
     * @param {Object} map - the map
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    Isocurve.prototype._initContainer = function (map) {
        // get main container
        var container = this._container;

        var inputShow = this._showIsoContainer = this._createShowIsoElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if (!this.collapsed) {
            inputShow.checked = true;
        }

        var picto = this._pictoIsoContainer = this._createShowIsoPictoElement();
        container.appendChild(picto);

        // panneau
        var panel = this._IsoPanelContainer = this._createIsoPanelElement();

        // header
        var header = this._IsoPanelHeaderContainer = this._createIsoPanelHeaderElement();
        panel.appendChild(header);

        // form
        var form = this._formContainer = this._createIsoPanelFormElement();

        // form: input de saisie de la localisation (fonction de Isocurve, voir ci-dessous)
        var point = this._createIsoPanelFormPointElement(map);
        form.appendChild(point);

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
        // FIXME : doit on passer le paramètre defaultDirection ?
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

        // hide autocomplete suggested locations on container click
        if (container.addEventListener) {
            container.addEventListener("click", (e) => this._hideIsoSuggestedLocations(e));
        }

        return container;
    };

    /**
     * Create start point
     *
     * @param {Object} map - the map
     *
     * @returns {Object} DOM element
     * @private
     */
    Isocurve.prototype._createIsoPanelFormPointElement = function (map) {
        this._originPoint = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : 1,
                groupId : this._uid,
                markerOpts : this.options.markerOpts,
                label : "Départ",
                display : true
            },
            autocompleteOptions : this.options.autocompleteOptions || null
        });
        this._originPoint.setMap(map);
        // a la sélection d'un nouveau point, on réinitialise aussi le tracé
        var self = this;
        /** click sur le pointer */
        document.getElementById("GPlocationOriginPointerImg_1-" + this._uid).onclick = function () {
            self._clearGeojsonLayer();
            var map = self.getMap();
            if (self._originPoint._inputShowPointerContainer.checked) {
                // au click sur l'input pour pointer sur la carte: on minimise le formulaire
                self._formContainer.className = "GPisochronFormMini";
                // et au clic sur la carte, on réaffichera le formulaire "normal"
                this.listenerKey = map.on(
                    "click",
                    () => {
                        self._formContainer.className = "";
                    }
                );
            } else {
                // si on déselectionne le pointer, on rétablit le formulaire en mode normal
                self._formContainer.className = "";
                // et on enlève l'écouteur d'évènement sur la carte
                // map.un("click", () => { self._formContainer.className = ""; });
                olObservableUnByKey(this.listenerKey);
            }
        };
        /** click sur le label */
        document.getElementById("GPlocationOriginLabel_1-" + this._uid).onclick = function () {
            self._clearGeojsonLayer();
            self._formContainer.className = "";
            // on désactive l'écouteur d'événements sur la carte (pour ne pas placer un marker au clic)
            map.un(
                "click",
                () => {
                    self._formContainer.className = "";
                }
            );
        };
        /** click sur la zone de saisie */
        document.getElementById("GPlocationOrigin_1-" + this._uid).onclick = function () {
            self._clearGeojsonLayer();
        };
        return this._originPoint._container;
    };

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'submit' on 'GPisochronForm' tag form
     * (cf. this._createIsoPanelFormElement),
     * and call isocurve service to display results
     *
     * @private
     */
    Isocurve.prototype.onIsoComputationSubmit = function () {
        // si on n'a pas de valeur récupérée pour notre point origine, on ne fait rien
        if (!this._originPoint || !this._originPoint.getCoordinate || !this._originPoint.getCoordinate()) {
            logger.log("[Isocurve] Missing position parameter to submit isocurve request");
            return;
        }

        // récupération de l'origine
        var positionCoordinates = this._originPoint.getCoordinate();
        var position = {
            x : positionCoordinates[0],
            y : positionCoordinates[1]
        };
        logger.log("origin : ", position);

        // récupération du temps ou de la distance
        var time;
        var distance;
        if (this._currentComputation.toLowerCase() === "time") {
            var timeHourInput = document.getElementById("GPisochronValueChronInput1-" + this._uid);
            var hours = parseInt(timeHourInput.value, 10);
            if (isNaN && isNaN(hours)) {
                hours = 0;
            }
            var timeMinutesInput = document.getElementById("GPisochronValueChronInput2-" + this._uid);
            var minutes = parseInt(timeMinutesInput.value, 10);
            if (isNaN && isNaN(minutes)) {
                minutes = 0;
            }
            // durée exprimée en secondes
            time = hours * 3600 + minutes * 60;
            logger.log("time : " + time);
        }
        if (this._currentComputation.toLowerCase() === "distance") {
            var distInput = document.getElementById("GPisochronValueDistInput-" + this._uid);
            // distance exprimée en mètres
            distance = parseFloat(distInput.value) * 1000;
            logger.log("distance : " + distance);
        }

        // si on n'a pas de valeur de calcul renseignée, on ne lance pas la requête.
        if (!time && !distance) {
            logger.log("[Isocurve] Missing time or distance parameter to submit isocurve request");
            return;
        }

        // oups, aucun droits !
        // on evite donc une requête inutile ...
        if (this._noRightManagement) {
            logger.log("[Isocurve] no rights for this service");
            return;
        }

        // on recupere les éventuelles options du service passées par l'utilisateur
        var options = this.options.isocurveOptions || {};

        // gestion du protocole et du timeout
        // le timeout est indispensable sur le protocole JSONP.
        var _protocol = options.protocol || "XHR";
        var _timeout = options.timeOut || 0;
        if (_protocol === "JSONP" && _timeout === 0) {
            // FIXME le timeout est obligatoire pour ce type de protocole...
            _timeout = 15000;
        }

        // on met en place l'affichage des resultats dans la fenetre de resultats.
        var context = this;
        var isoRequestOptions = {
            position : position,
            graph : options.graph || this._currentTransport,
            exclusions : options.exclusions || this._currentExclusions,
            method : options.method || this._currentComputation,
            smoothing : options.smoothing || true,
            timeOut : _timeout,
            protocol : _protocol,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log(results);
                if (results) {
                    context._drawIsoResults(results);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                // FIXME mise à jour du controle mais le service ne repond pas en 200 !?
                context._hideWaitingContainer();
                logger.log(error.message);
            }
        };
        if ((this._currentDirection.toLowerCase() === "arrival") || (options.reverse)) {
            isoRequestOptions.reverse = true;
        }
        if (time) {
            isoRequestOptions.time = time;
        }
        if (distance) {
            isoRequestOptions.distance = distance;
        }

        this._requestIsoCurve(isoRequestOptions);
    };

    /**
     * this method is called by event 'click' on 'GPshowIsochronPicto' picto
     * (cf. this._createShowIsoPictoElement),
     * and clear inputs and previous isocurve drawings
     *
     * @private
     */
    Isocurve.prototype.onShowIsoPanelClick = function () {
        this.collapsed = this._showIsoContainer.checked;
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.Isocurve.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
    };

    /**
     * this method is called by event 'change' on 'GPisochronChoiceAltDist' or 'GPisochronChoiceAltChron'
     * input (cf. this._createIsoPanelFormTypeChoiceElement),
     * and updates current computation mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Isocurve.prototype.onIsoTypeChoiceChange = function (e) {
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
    };

    /**
     * this method is called by event 'click' on 'GPisochronTransportPedestrian' or 'GPisochronTransportCar'
     * input (cf. this._createIsoPanelFormModeChoiceTransportElement),
     * and updates current transport mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Isocurve.prototype.onIsoModeTransportChange = function (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }
        this._currentTransport = value;
    };

    /**
     * this method is called by event 'change' on 'GPisochronDirectionSelect' select
     * (cf. this._createIsoPanelFormModeChoiceDirectionElement),
     * and updates current direction mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Isocurve.prototype.onIsoModeDirectionChange = function (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }
        if (value.toLowerCase() === "arrival") {
            this._originPoint._inputLabelContainer.innerHTML = "Arrivée";
        } else {
            this._originPoint._inputLabelContainer.innerHTML = "Départ";
        }
        this._currentDirection = value;
    };

    /**
     * this method is called by event 'change' on 'GPIsoExclusionsToll'
     * or 'GPIsoeExclusionsTunnel' or 'GPIsoExclusionsBridge' tag input
     * (cf. this._createIsoPanelFormExclusionOptionsElement).
     * this value is saved as a parameter for the service isocurve.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Isocurve.prototype.onIsoExclusionsChange = function (e) {
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
            this._currentExclusions[iFound] = null;
        }
    };

    /**
     * this method is called by event 'click' on 'GPisoReset'
     * tag label (cf. this._createIsoFormResetElement),
     * and it cleans all isochron input options and results.
     *
     * @private
     */
    Isocurve.prototype.onIsoResetClick = function () {
        // clear
        this._clear();
    };

    // ################################################################### //
    // ######################## isocurve calculation ##################### //
    // ################################################################### //

    /**
     * this method is called by this.onIsoComputationSubmit
     * and executes a request to the service.
     *
     * @param {Object} options - isocurve service request options
     * @private
     */
    Isocurve.prototype._requestIsoCurve = function (options) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!options || ((typeof options === "object") && (Object.keys(options).length === 0))) {
            return;
        }
        // on ne fait pas de requête si on n'a pas de point d'origine
        if (!options.position) {
            return;
        }
        // ni si on n'a aucun droit
        if (this._noRightManagement || !this._resources["Isocurve"]) {
            logger.log("no rights for this service");
            return;
        }

        // gestion des droits !
        var resources = this._resources["Isocurve"].resources;
        if (!resources || (typeof resources === "object" && Object.keys(resources).length === 0)) {
            logger.log("no rights for this service");
            return;
        }

        // la ressource donne elle des droits ?
        var bFound = false;
        for (var i = 0; i < resources.length; i++) {
            if (resources[i] === options.graph) {
                bFound = true;
            }
        }
        // on fait quoi ?
        if (!bFound) {
            logger.log("no rights for this service !?");
            return;
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
        var key = this._resources["Isocurve"]["key"];
        options.apiKey = this.options.isocurveOptions.apiKey || this.options.apiKey || key;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        options.ssl = options.ssl || this.options.ssl || true;

        logger.log(options);

        // on efface une éventuelle précédente couche
        this._clearGeojsonLayer();

        // mise en place de la patience
        this._displayWaitingContainer();

        // appel du service de calcul d'isochrones
        Gp.Services.isoCurve(options);
    };

    /**
     * this method is called by this.onIsoComputationSubmit (in case of success)
     * and draw isocurve results geometry on map
     *
     * @param {Object} results - isocurve response results
     * @private
     */
    Isocurve.prototype._drawIsoResults = function (results) {
        // sauvegarde de l'etat des resultats
        this._currentIsoResults = results;
        // cache la patience
        this._hideWaitingContainer();

        if (!results.geometry) {
            return;
        }

        var map = this.getMap();

        // 1. création de l'objet geoJSON
        var geojsonObject = {
            type : "Feature",
            crs : {
                type : "name",
                properties : {
                    name : "EPSG:4326"
                }
            },
            geometry : results.geometry
        };
        var geojsonformat = new GeoJSON({
            defaultDataProjection : "EPSG:4326"
        });
        var mapProj = map.getView().getProjection().getCode();
        var features = geojsonformat.readFeatures(
            geojsonObject, {
                dataProjection : "EPSG:4326",
                featureProjection : mapProj
            }
        );

        // 2. ajout de la géométrie comme nouvelle couche vecteur à la carte
        this._geojsonLayer = new VectorLayer({
            source : new VectorSource({
                features : features
            }),
            style : this._defaultFeatureStyle,
            opacity : 0.9
        });
        // ajout d'un identifiant à la couche
        var graph;
        if (this._currentTransport === "Pieton") {
            graph = "piéton";
            this._geojsonLayer.gpResultLayerId = "Pieton$GEOPORTAIL:GPP:Isocurve";
        } else {
            graph = "voiture";
            this._geojsonLayer.gpResultLayerId = "Voiture$GEOPORTAIL:GPP:Isocurve";
        }
        // ajout à la carte
        map.addLayer(this._geojsonLayer);

        // 3. Zoom sur l'emprise de la geometry
        if (features[0] && features[0].getGeometry() && features[0].getGeometry().getExtent()) {
            var extent = features[0].getGeometry().getExtent();
            map.getView().fit(extent, map.getSize());
        }

        // 5. Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        var method = (this._currentComputation === "time") ? "Isochrone" : "Isodistance";
        map.getControls().forEach(
            (control) => {
                if (control instanceof LayerSwitcher) {
                    // un layer switcher est présent dans la carte
                    var layerId = this._geojsonLayer.gpLayerId;
                    // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                    if (control._layers[layerId].title === layerId) {
                        control.addLayer(
                            this._geojsonLayer, {
                                title : this.options.layerDescription.title + " (" + method + "/" + graph + ")",
                                description : this.options.layerDescription.description
                            }
                        );
                    }
                }
            }
        );
    };

    // ################################################################### //
    // ############################# Clean ############################### //
    // ################################################################### //

    /**
     * this method is called by this.onShowIsoPanelClick()
     * and it clears all elements (reinit).
     *
     * @private
     */
    Isocurve.prototype._clear = function () {
        // clear inputs
        this._clearIsoInputs();

        // clear origin point (and marker)
        this._originPoint.clear();

        // remove geometry layer
        this._clearGeojsonLayer();

        // clear results
        this._currentIsoResults = null;
    };

    /**
     * this method is called by this._clear()
     * and it clears all input elements (dist and time)
     *
     * @private
     */
    Isocurve.prototype._clearIsoInputs = function () {
        // 1. clear inputs
        // clear time inputs (if exists) :
        // hours
        var timeHourInput = document.getElementById("GPisochronValueChronInput1-" + this._uid);
        if (timeHourInput) {
            timeHourInput.value = "0";
        }
        // minutes
        var timeMinutesInput = document.getElementById("GPisochronValueChronInput2-" + this._uid);
        if (timeMinutesInput) {
            timeMinutesInput.value = "0";
        }
        // clear distance input (if exists)
        var distInput = document.getElementById("GPisochronValueDistInput-" + this._uid);
        if (distInput) {
            distInput.value = "0";
        }

        // 2. reinit options to default
        this._initTransport();
        this._initComputation();
        this._initDirection();
        this._initExclusions();

        // 3. set transport mode to default
        var transportdiv;
        if (this._currentTransport === "Pieton") {
            transportdiv = document.getElementById("GPisochronTransportPedestrian-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        } else {
            transportdiv = document.getElementById("GPisochronTransportCar-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        }

        // 4. set computation mode to default (distance or time)
        var computationdiv;
        if (this._currentComputation.toLowerCase() === "distance") {
            computationdiv = document.getElementById("GPisochronChoiceAltDist-" + this._uid);
            if (computationdiv) {
                computationdiv.checked = "true";
            }
            if (document.getElementById("GPisochronValueDist-" + this._uid)) {
                document.getElementById("GPisochronValueDist-" + this._uid).className = "GPflexInput";
            }
            if (document.getElementById("GPisochronValueChron-" + this._uid)) {
                document.getElementById("GPisochronValueChron-" + this._uid).className = "GPisochronValueHidden";
            }
        } else {
            computationdiv = document.getElementById("GPisochronChoiceAltChron-" + this._uid);
            if (computationdiv) {
                computationdiv.checked = "true";
            }
            if (document.getElementById("GPisochronValueChron-" + this._uid)) {
                document.getElementById("GPisochronValueChron-" + this._uid).className = "GPflexInput";
            }
            if (document.getElementById("GPisochronValueDist-" + this._uid)) {
                document.getElementById("GPisochronValueDist-" + this._uid).className = "GPisochronValueHidden";
            }
        }

        // 5. set direction mode to default (arrival or departure)
        var directionSelect = document.getElementById("GPisochronDirectionSelect-" + this._uid);
        if (directionSelect) {
            directionSelect.value = this._currentDirection;
        }
        if (this._currentDirection === "arrival") {
            this._originPoint._inputLabelContainer.innerHTML = "Arrivée";
        } else {
            this._originPoint._inputLabelContainer.innerHTML = "Départ";
        }

        // 6. set exclusions to default
        var tollInput = document.getElementById("GPisoExclusionsToll-" + this._uid);
        if (tollInput) {
            if (this._currentExclusions.indexOf("toll") !== -1) {
                tollInput.checked = false;
            } else {
                tollInput.checked = true;
            }
        }
        var tunnelInput = document.getElementById("GPisoExclusionsTunnel-" + this._uid);
        if (tunnelInput) {
            if (this._currentExclusions.indexOf("tunnel") !== -1) {
                tunnelInput.checked = false;
            } else {
                tunnelInput.checked = true;
            }
        }
        var bridgeInput = document.getElementById("GPisoExclusionsBridge-" + this._uid);
        if (bridgeInput) {
            if (this._currentExclusions.indexOf("bridge") !== -1 && bridgeInput) {
                bridgeInput.checked = false;
            } else {
                bridgeInput.checked = true;
            }
        }
    };

    /**
     * this method is called by this.onIsoComputationSubmit (in case of failure)
     * and it clears all geometries
     *
     * @private
     */
    Isocurve.prototype._clearGeojsonLayer = function () {
        var map = this.getMap();
        // remove layer
        if (this._geojsonLayer) {
            map.removeLayer(this._geojsonLayer);
            this._geojsonLayer = null;
        }
    };

    /**
     * this method is called by event 'click' on control main container
     * and hide suggested Locations (unless target is an autocomplete input)
     *
     * @param {Object} e - event
     *
     * @private
     */
    Isocurve.prototype._hideIsoSuggestedLocations = function (e) {
        // si on clique sur l'input de saisie du point d'origine
        if (e.target && e.target.id && e.target.id.indexOf("GPlocationOrigin_") !== -1) {

        } else {
            // si on clique ailleurs dans le DOM du control, on cache tous les résultats d'autocomplétion
            this._originPoint._hideSuggestedLocation();
        }
    };

    /**
     * this method displays waiting container and sets a timeout
     *
     * @private
     */
    Isocurve.prototype._displayWaitingContainer = function () {
        this._waitingContainer.className = "GPisochronCalcWaitingContainerVisible";
        this._waiting = true;

        // mise en place d'un timeout pour réinitialiser le panel (cacher la patience)
        // si on est toujours en attente (si la requête est bloquée par exemple)
        var opts = this.options.isocurveOptions;
        if (opts && opts.timeOut) {
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
        }
    };

    /**
     * this method hides waiting container and clears timeout
     *
     * @private
     */
    Isocurve.prototype._hideWaitingContainer = function () {
        if (this._waiting) {
            this._waitingContainer.className = "GPisochronCalcWaitingContainerHidden";
            this._waiting = false;
            var opts = this.options.isocurveOptions;
            if (opts && opts.timeOut) {
                clearTimeout(this._timer);
                this._timer = null;
            }
        }
    };

    return Isocurve;
}(Control));

export default Isocurve;

// Expose Isocurve as ol.control.Isocurve (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Isocurve = Isocurve;
}
