// import CSS
import "../CSS/Controls/Route/GProuteOpenLayers.css";
// import OpenLayers
import Control from "ol/control/Control";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import Overlay from "ol/Overlay";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { pointerMove as eventPointerMove } from "ol/events/condition";
import { Select as SelectInteraction } from "ol/interaction";
import {
    Stroke,
    Style
} from "ol/style";
import { transformExtent as olTransformExtentProj } from "ol/proj";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Logger from "../../Common/Utils/LoggerByDefault";
import Utils from "../../Common/Utils";
import RightManagement from "../../Common/Utils/CheckRightManagement";
import SelectorID from "../../Common/Utils/SelectorID";
import Markers from "./Utils/Markers";
import Draggable from "../../Common/Utils/Draggable";
// import local with ol dependencies
import LocationSelector from "./LocationSelector";
import LayerSwitcher from "./LayerSwitcher";
// DOM
import RouteDOM from "../../Common/Controls/RouteDOM";

var logger = Logger.getLogger("route");

/**
 * @classdesc
 *
 * Route Control.
 *
 * @constructor
 * @alias ol.control.Route
 * @extends {ol.control.Control}
 * @param {Object} options - route control options
 * @param {String}   [options.apiKey] - API key for services call (route and autocomplete services), mandatory if autoconf service has not been charged in advance
 * @param {Boolean}   [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object}  [options.exclusions = {toll : false, tunnel : false, bridge : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
 * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of resources, by default : ["Voiture", "Pieton"]. The first element is selected.
 * @param {Object} [options.markersOpts] - options to use your own markers. Object properties can be "departure", "stages" or "arrival". Corresponding value is an object with following properties :
 * @param {String} [options.markersOpts[property].url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.markersOpts[property].offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
 * @param {Object} [options.routeOptions = {}] - route service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~route Gp.Services.route()} to know all route options.
 * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Itinéraire"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Itinéraire basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
 * @example
 *  var route = ol.control.Route({
 *      "collapsed" : true
 *      "draggable" : true,
 *      "exclusions" : {
 *         "toll" : true,
 *         "bridge" : false,
 *         "tunnel" : true
 *      },
 *      "graphs" : ['Pieton', 'Voiture'],
 *      "markersOpts" : {
 *          "departure" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          },
 *          "stages" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          },
 *          "arrival" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          }
 *      }
 *      "autocompleteOptions" : {},
 *      "routeOptions" : {}
 *  });
 */
var Route = (function (Control) {
    function Route (options) {
        options = options || {};

        if (!(this instanceof Route)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.initialize(options);

        // Widget main DOM container
        this._container = this._createMainContainerElement();
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
    }

    // Inherits from ol.control.Control
    if (Control) Route.__proto__ = Control;

    /**
     * @lends module:Route
     */
    Route.prototype = Object.create(Control.prototype, {});

    // on récupère les méthodes de la classe commune RouteDOM
    Utils.assign(Route.prototype, RouteDOM);

    /**
     * Constructor (alias)
     * @private
     */
    Route.prototype.constructor = Route;

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    Route.prototype.getCollapsed = function () {
        return this.collapsed;
    };

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    Route.prototype.setCollapsed = function (collapsed) {
        if (collapsed === undefined) {
            logger.log("[ERROR] Route:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            document.getElementById("GProutePanelClose-" + this._uid).click();
        } else {
            document.getElementById("GPshowRoute-" + this._uid).click();
        }
        this.collapsed = collapsed;
    };

    /**
     * Get vector layer where geoJson route is drawn
     *
     * @returns {Object} layer - ol.layer.Vector route layer
     */
    Route.prototype.getLayer = function () {
        return this._geojsonSections;
    };

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    Route.prototype.setMap = function (map) {
        if (map) {
            // enrichissement du DOM du container
            this._container = this._initContainer(map);

            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this._panelRouteContainer,
                    this._panelHeaderRouteContainer,
                    map.getTargetElement()
                );
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        Control.prototype.setMap.call(this, map);
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize route control (called by Route constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    Route.prototype.initialize = function (options) {
        this._checkInputOptions(options);

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            graphs : ["Voiture", "Pieton"],
            exclusions : {
                toll : false,
                tunnel : false,
                bridge : false
            },
            routeOptions : {},
            autocompleteOptions : {},
            layerDescription : {
                title : "Itinéraire",
                description : "Itinéraire basé sur un graphe"
            }
        };

        // merge with user options
        Utils.assign(this.options, options);

        // cas particulier des markers par défaut
        var defaultMarkersOpts = {
            departure : {
                url : Markers["red"],
                offset : Markers.defaultOffset
            },
            stages : {
                url : Markers["lightOrange"],
                offset : Markers.defaultOffset
            },
            arrival : {
                url : Markers["darkOrange"],
                offset : Markers.defaultOffset
            }
        };
        // on récupère les options de chaque type de marker si spécifié
        this.options.markersOpts = Utils.assign(defaultMarkersOpts, options.markersOpts);

        /** {Boolean} specify if Route control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if Route control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        this._uid = SelectorID.generate();

        // containers principaux
        this._panelRouteContainer = null;
        this._panelHeaderRouteContainer = null;
        this._waitingContainer = null;
        this._formRouteContainer = null;
        this._resultsRouteContainer = null;
        this._showRouteExclusionsElement = null;

        // liste de points selectionnée
        this._currentPoints = [];

        // Mode de transport selectionné : 'Voiture' ou 'Pieton'
        this._currentTransport = null;
        this._initTransport();

        // Mode de calcul selectionné : 'Plus rapide' ou 'plus court'
        this._currentComputation = null;
        this._initComputation();

        // Exclusions selectionnées : Tunnel, Toll et Bridge
        this._currentExclusions = [];
        this._initExclusions();

        // si un calcul est en cours ou non
        this._waiting = false;
        // timer pour cacher la patience après un certain temps
        this._timer = null;

        // la geometrie du parcours
        this._geojsonRoute = null;

        // la geometrie des troncons
        this._geojsonSections = null;

        // le container de la popup (pour les troncons selectionnés)
        this._popupContent = null;
        this._popupDiv = this._initPopupDiv();
        // l'overlay ol.Overlay correspondant à la popup (pour les troncons selectionnés)
        this._popupOverlay = null;

        // ol.interaction.Select associées à la couche des résultats (troncons)
        this._resultsSelectInteraction = null;
        this._resultsHoverInteraction = null;

        // styles pour les sélections des features
        this._defaultFeatureStyle = new Style({
            stroke : new Stroke({
                color : "rgba(0,183,152,0.9)",
                width : 12
            })
        });
        this._selectedFeatureStyle = new Style({
            stroke : new Stroke({
                color : "rgba(255,102,0,0.9)",
                width : 12
            })
        });

        // reponse du service
        // Ex. {
        //   totalTime, totalDistance, bbox, routeGeometry,
        //   routeInstructions : [{duration, distance, code, instruction, bbox, geometry}]
        // }
        this._currentRouteInformations = null;

        // liste des ressources avec droits par service
        // Ex. {
        //   "Route" : {
        //       key : "ger4g456re45er456t4er5ge5",
        //       resources : ["Pieton", "Voiture"]
        //   }
        // }
        this._resources = {};

        // gestion des droits sur les ressources
        this._noRightManagement = false;

        // gestion des droits sur les ressources/services
        this._checkRightsManagement();

        // listener key for event on pointermove or moveend map
        this.listenerKey = null;
    };

    /**
     * this method is called by this.initialize()
     *
     * @param {Object} options - options
     *
     * @private
     */
    Route.prototype._checkInputOptions = function (options) {
        // vérification des options
        // mode de transport
        if (options.graphs) {
            if (Array.isArray(options.graphs)) {
                // on ne permet pas de passer un tableau vide : on spécifie au moins un graph
                if (options.graphs.length === 0) {
                    options.graphs = null;
                } else {
                    for (var i = 0; i < options.graphs.length; i++) {
                        if (typeof options.graphs[i] !== "string") {
                            logger.log("[ol.control.Route] ERROR : parameter 'graphs' elements should be of type 'string'");
                            options.graphs = null;
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

        // collapsed
        if (options.collapsed === "true") {
            options.collapsed = true;
        }
        if (options.collapsed === "false") {
            options.collapsed = false;
        }
    };

    /**
     * Check rights to resources (called by constructor)
     *
     * @private
     */
    Route.prototype._checkRightsManagement = function () {
        var _opts = null;
        var _res = [];
        var _key = null;

        // les ressources du service du calcul d'Itineraire
        _key = this.options.routeOptions.apiKey;
        _opts = this.options.routeOptions.filterOptions;
        _res = (_opts) ? _opts.type : [];
        if (!_res || _res.length === 0) {
            _res = ["Voiture", "Pieton"];
        }

        var rightManagementRoute = RightManagement.check({
            key : _key || this.options.apiKey,
            resources : _res,
            services : ["Itineraire"]
        });
        logger.log("rightManagementRoute", rightManagementRoute);

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
        if (!rightManagementRoute && !rightManagementAutoComplete) {
            this._noRightManagement = true;
        }

        // FIXME je reconstruis differement la structure pour la gestion des clefs differentes
        // pour chaque service...
        if (rightManagementAutoComplete) {
            this._resources["AutoCompletion"] = {};
            this._resources["AutoCompletion"]["resources"] = rightManagementAutoComplete["AutoCompletion"];
            this._resources["AutoCompletion"]["key"] = rightManagementAutoComplete["key"];
        }

        if (rightManagementRoute) {
            this._resources["Itineraire"] = {};
            this._resources["Itineraire"]["resources"] = rightManagementRoute["Itineraire"];
            this._resources["Itineraire"]["key"] = rightManagementRoute["key"];
        }
    };

    /**
     * initialize component container (DOM)
     *
     * @param {Object} map - the map
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    Route.prototype._initContainer = function (map) {
        // get main container
        var container = this._container;

        var inputShow = this._showRouteContainer = this._createShowRouteElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if (!this.collapsed) {
            inputShow.checked = true;
        }

        var picto = this._createShowRoutePictoElement();
        container.appendChild(picto);

        var routePanel = this._panelRouteContainer = this._createRoutePanelElement();

        // header form
        var routeHeader = this._panelHeaderRouteContainer = this._createRoutePanelHeaderElement();
        routePanel.appendChild(routeHeader);

        // form
        var routeForm = this._formRouteContainer = this._createRoutePanelFormElement();

        // form: menu des points
        var points = this._createRoutePanelFormPointsElement(map);
        for (var i = 0; i < points.length; i++) {
            routeForm.appendChild(points[i]);
        }

        // form: menu des modes
        var choice = this._createRoutePanelFormModeChoiceElement();
        choice.appendChild(this._createRoutePanelFormModeChoiceTransportElement(this.options.graphs));
        choice.appendChild(this._createRoutePanelFormModeChoiceComputeElement());
        routeForm.appendChild(choice);

        // form: menu des exclusions
        routeForm.appendChild(this._createShowRouteExclusionsElement());
        this._showRouteExclusionsElement = this._createShowRouteExclusionsPictoElement();
        routeForm.appendChild(this._showRouteExclusionsElement);
        var exclusion = this._createRoutePanelFormExclusionsElement();
        exclusion.appendChild(this._createRoutePanelFormExclusionOptionsElement(this.options.exclusions));
        routeForm.appendChild(exclusion);

        var divReset = this._createRouteFormResetElement();
        routeForm.appendChild(divReset);

        // form: bouton du calcul
        var submit = this._createRouteSubmitFormElement();
        routeForm.appendChild(submit);

        routePanel.appendChild(routeForm);

        // results
        var routeResults = this._resultsRouteContainer = this._createRoutePanelResultsElement();
        routePanel.appendChild(routeResults);

        // waiting
        var waiting = this._waitingContainer = this._createRouteWaitingElement();
        routePanel.appendChild(waiting);

        container.appendChild(routePanel);
        // hide autocomplete suggested locations on container click
        if (container.addEventListener) {
            container.addEventListener("click", (e) => this._hideRouteSuggestedLocations(e));
        }

        return container;
    };

    // ################################################################### //
    // ####################### init application ########################## //
    // ################################################################### //

    /**
     * this method is called by the constructor and initialize transport mode
     * ("Voiture" ou "Pieton")
     *
     * @private
     */
    Route.prototype._initTransport = function () {
        // Mode de transport selectionné
        this._currentTransport = "Voiture"; // par defaut

        // par defaut
        var transport = this.options.graphs;
        if (!transport || transport.length === 0) {
            this.options.graphs = ["Voiture", "Pieton"];
        }

        // option
        if (Array.isArray(transport) && transport.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (transport[0] === "Voiture" || transport[0] === "Pieton") {
                this._currentTransport = transport[0];
            }
        }

        // TODO option sur le service
        var serviceOptions = this.options.routeOptions;
        if (serviceOptions.graph) {
            this._currentTransport = serviceOptions.graph;
        }
    };

    /**
     * this method is called by the constructor and initialize computation mode
     * (fastest or shortest)
     *
     * @private
     */
    Route.prototype._initComputation = function () {
        // Mode de calcul selectionné
        this._currentComputation = "fastest"; // par defaut

        // TODO option sur le service
        var serviceOptions = this.options.routeOptions;
        if (serviceOptions.routePreference) {
            this._currentComputation = serviceOptions.routePreference;
        }
    };

    /**
     * this method is called by the constructor and initialize exclusions
     *
     * @private
     */
    Route.prototype._initExclusions = function () {
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
                    if (exclusion[k]) {
                        this._currentExclusions.push(k);
                    }
                }
            }
        }

        // TODO option sur le service
        var serviceOptions = this.options.routeOptions;
        if (Array.isArray(serviceOptions.exclusions)) {
            this._currentExclusions = serviceOptions.exclusions;
        }
    };

    /**
     * this method is called by this.initialize() and initialize popup div
     * (to display results information on route result click)
     *
     * @return {Object} element - DOM element for popup
     * @private
     */
    Route.prototype._initPopupDiv = function () {
        var context = this;
        var element = document.createElement("div");
        element.className = "gp-feature-info-div";
        var closer = document.createElement("input");
        closer.type = "button";
        closer.className = "gp-styling-button closer";
        // on closer click : remove popup
        closer.onclick = function () {
            if (context._popupOverlay != null) {
                context._popupOverlay.setPosition(undefined);
            }
            return false;
        };
        this._popupContent = document.createElement("div");
        this._popupContent.className = "gp-features-content-div";
        element.appendChild(this._popupContent);
        element.appendChild(closer);

        return element;
    };

    // ################################################################### //
    // ############################## DOM ################################ //
    // ################################################################### //

    /**
     * Create List Points
     * Overwrite RouteDOM method !
     *
     * @param {Object} map - the map
     *
     * @returns {Array} List DOM element
     * @private
     */
    Route.prototype._createRoutePanelFormPointsElement = function (map) {
        var points = [];
        var count = 1;

        // point de depart
        var start = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : count,
                groupId : this._uid,
                markerOpts : this.options.markersOpts["departure"],
                label : "Départ",
                display : true
            },
            autocompleteOptions : this.options.autocompleteOptions || null
        });
        start.setMap(map);
        // on ajoute des écouteurs d'évènements (en plus de ceux de LocationSelector),
        // pour prendre en compte les CSS spécifiques de GProuteForm
        this._addFormPointsEventListeners(start);
        points.push(start._container);
        this._currentPoints.push(start);

        // points intermediaires
        for (count = 2; count < 7; count++) {
            var step = new LocationSelector({
                apiKey : this.options.apiKey || null,
                tag : {
                    id : count,
                    groupId : this._uid,
                    label : "Etape",
                    markerOpts : this.options.markersOpts["stages"],
                    display : false,
                    removeOption : true
                },
                autocompleteOptions : this.options.autocompleteOptions || null
            });
            step.setMap(map);
            this._addFormPointsEventListeners(step);
            points.push(step._container);
            this._currentPoints.push(step);
        }

        // point d'arrivée
        var end = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : count,
                groupId : this._uid,
                markerOpts : this.options.markersOpts["arrival"],
                label : "Arrivée",
                display : true,
                addOption : true
            },
            autocompleteOptions : this.options.autocompleteOptions || null
        });
        end.setMap(map);
        this._addFormPointsEventListeners(end);
        points.push(end._container);
        this._currentPoints.push(end);

        return points;
    };

    /**
     * Attach events listeners to route form points (locationSelector)
     *
     * @param {Object} formPoint - route form point (locationSelector)
     * @private
     */
    Route.prototype._addFormPointsEventListeners = function (formPoint) {
        if (!formPoint) {
            return;
        }

        if (formPoint._inputLabelContainer.addEventListener) {
            // display form on origin label click
            formPoint._inputLabelContainer.addEventListener(
                "click",
                (e) => this.onRouteOriginLabelClick(e)
            );
            // minimize form on input show pointer, and set map event listeners (see this.onRouteOriginPointerClick)
            formPoint._inputShowPointer.addEventListener(
                "click",
                (e) => this.onRouteOriginPointerClick(e, formPoint)
            );
            if (formPoint._removePointElement) {
                formPoint._removePointElement.addEventListener(
                    "click",
                    (e) => {
                        logger.trace("click on _removePointElement", e);
                        // Moving up exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) - 33).toString() + "px";
                    }
                );
            }
            if (formPoint._addPointElement) {
                formPoint._addPointElement.addEventListener(
                    "click",
                    (e) => {
                        logger.trace("click on _addPointElement", e);
                        // Moving down exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) + 33).toString() + "px";
                    }
                );
            }
        } else if (formPoint._inputLabelContainer.attachEvent) {
            // attachEvent: Internet explorer event listeners management
            formPoint._inputLabelContainer.attachEvent(
                "onclick",
                (e) => this.onRouteOriginLabelClick(e)
            );
            formPoint._inputShowPointer.attachEvent(
                "onclick",
                (e) => this.onRouteOriginPointerClick(e, formPoint)
            );
            if (formPoint._removePointElement) {
                formPoint._removePointElement.attachEvent(
                    "onclick",
                    (e) => {
                        // Moving up exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) - 33).toString() + "px";
                    }
                );
            }
            if (formPoint._addPointElement) {
                formPoint._addPointElement.attachEvent(
                    "onclick",
                    (e) => {
                        // Moving down exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) + 33).toString() + "px";
                    }
                );
            }
        }
    };

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'submit' on 'GProuteForm' tag form
     * (cf. this._createRoutePanelFormElement), and it displays the results.
     *
     * @param {Object} options - options
     * @private
     */
    Route.prototype.onRouteComputationSubmit = function (options) {
        logger.log("onRouteComputationSubmit", options);

        // FIXME on lance une requête en EPSG:4326, les coordonnées
        // doivent donc être du type cad en lat/lon.
        // or, BUG du service du calcul d'itineraire car les
        // coordonnées envoyées doivent être en lon/lat avec une SRS en EPSG:4326 !?
        // sinon, ça plante...

        // Liste des points
        var points = this._currentPoints;

        // - point de depart (info: points[0].getCoordinate est du type [lon, lat], en EPSG:4326)
        var start;
        if (points[0] && points[0].getCoordinate) {
            var startCoordinate = points[0].getCoordinate();
            start = {
                x : startCoordinate[0],
                y : startCoordinate[1]
            };
            logger.log("start", start);
        }

        // - point d'arrivée
        var end;
        var endPoint = points[points.length - 1];
        if (endPoint && endPoint.getCoordinate) {
            var endCoordinate = endPoint.getCoordinate();
            end = {
                x : endCoordinate[0],
                y : endCoordinate[1]
            };
            logger.log("end", end);
        }

        // - les étapes
        var step = [];
        for (var i = 1; i < points.length - 1; i++) {
            if (points[i] && points[i].getCoordinate) {
                var iCoordinate = points[i].getCoordinate();
                if (iCoordinate) {
                    var coordinate = {
                        x : iCoordinate[0],
                        y : iCoordinate[1]
                    };
                    logger.log("step", coordinate);
                    step.push(coordinate);
                }
            }
        }

        // oups, aucun droits !
        // on evite donc une requête inutile ...
        if (this._noRightManagement) {
            return;
        }

        // valeurs selectionnées
        this._currentTransport = options.transport;
        this._currentComputation = options.computation;
        this._currentExclusions = options.exclusions;

        // on recupere les éventuelles options du service passées par l'utilisateur
        var routeOptions = this.options.routeOptions;

        // gestion du protocole et du timeout
        // le timeout est indispensable sur le protocole JSONP.
        var _protocol = routeOptions.protocol || "XHR";
        var _timeout = routeOptions.timeOut || 0;
        if (_protocol === "JSONP" && _timeout === 0) {
            // FIXME le timeout est obligatoire pour ce type de protocole...
            _timeout = 15000;
        }

        // on met en place l'affichage des resultats dans la fenetre de resultats.
        var context = this;
        this._requestRouting({
            startPoint : start,
            endPoint : end,
            viaPoints : step,
            graph : routeOptions.graph || this._currentTransport,
            routePreference : routeOptions.routePreference || this._currentComputation,
            exclusions : routeOptions.exclusions || this._currentExclusions,
            geometryInInstructions : true,
            distanceUnit : "m",
            timeOut : _timeout,
            protocol : _protocol,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log(results);
                if (results) {
                    context._fillRouteResultsDetails(results);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                context._hideWaitingContainer();
                context._clearRouteResultsDetails();
                logger.log(error.message);
            }
        });
    };

    /**
     * this method is called by event 'click' on 'GPlocationOriginLabel' label
     * and set 'GProuteForm' CSS class to "" (normal)
     *
     * @param {Object} routeControl - context : route Control (this)
     * @private
     */
    Route.prototype.onRouteOriginLabelClick = function () {
        this._formRouteContainer.className = "";
        // on désactive l'écouteur d'événements sur la carte (pour ne pas placer un marker au clic)
        // map.un(
        //     "click",
        //     () => {
        //         // on ne rétablit pas le mode "normal" si on est dans le panel des résultats (où className = "GProuteComponentHidden")
        //         if (this._formRouteContainer.className === "GProuteFormMini") {
        //             this._formRouteContainer.className = "";
        //         }
        //     }
        // );
        olObservableUnByKey(this.listenerKey);
    };

    /**
     * this method is called by event 'click' on 'GPlocationOriginPointerImg' label
     * and display or minimize 'GProuteForm', using CSS class ("GProuteFormMini" or "")
     *
     * @param {Object} e - context : route Control (equivalent to this)
     * @param {Object} locationSelector - context : locationSelector input (one of this._currentPoints)
     * @private
     */
    Route.prototype.onRouteOriginPointerClick = function (e, locationSelector) {
        var map = this.getMap();
        if (locationSelector._inputShowPointerContainer.checked) {
            // au click sur l'input pour pointer sur la carte: on minimise le formulaire
            this._formRouteContainer.className = "GProuteFormMini";
            // et au clic sur la carte, on réaffichera le formulaire "normal"
            this.listenerKey = map.on(
                "click",
                () => {
                    // on ne rétablit pas le mode "normal" si on est dans le panel des résultats (où className = "GProuteComponentHidden")
                    if (this._formRouteContainer.className === "GProuteFormMini") {
                        this._formRouteContainer.className = "";
                    }
                }
            );
        } else {
            // si on déselectionne le pointer, on rétablit le formulaire en mode normal
            this._formRouteContainer.className = "";
            // et on enlève l'écouteur d'évènement sur la carte
            // map.un(
            //     "click",
            //     () => {
            //         // on ne rétablit pas le mode "normal" si on est dans le panel des résultats (où className = "GProuteComponentHidden")
            //         if (this._formRouteContainer.className === "GProuteFormMini") {
            //             this._formRouteContainer.className = "";
            //         }
            //     }
            // );
            olObservableUnByKey(this.listenerKey);
        }
    };

    /**
     * this method is called by event 'click' on 'GPshowRoutePicto'
     * tag label (cf. this._createShowRoutePictoElement),
     * and it cleans all value of input.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onShowRoutePanelClick = function (e) {
        // clean !
        if (!this._geojsonSections && !this._waiting) {
            this._clear();
        }
        this.collapsed = document.getElementById("GPshowRoute-" + this._uid).checked;
        // on génère nous même l'evenement OpenLayers de changement de pté
        // (utiliser ol.control.Route.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
    };

    /**
     * this method is called by event 'change' on 'GProuteComputationSelect' tag select
     * (cf. this._createRoutePanelFormModeChoiceComputeElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onRouteModeComputationChange = function (e) {
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;

        if (!value) {
            return;
        }

        logger.log(value);
        this._currentComputation = value;
    };

    /**
     * this method is called by event 'change' on 'GProuteResultsComputationSelect' tag select
     * (cf. this._createRouteResultsElement).
     * this value is saved as a parameter for the service route,
     * and this launches the route request !
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onRouteModeComputationChangeAndRun = function (e) {
        // event choice computation
        this.onRouteModeComputationChange(e);

        // clean avant un nouveau calcul !
        this._clearRouteResultsDetails();
        this._clearRouteResultsGeometry();
        this._clearRouteResultsFeatureGeometry();

        // submit request
        this.onRouteComputationSubmit({
            computation : this._currentComputation,
            transport : this._currentTransport,
            exclusions : this._currentExclusions
        });
    };

    /**
     * this method is called by event 'change' on 'GProuteTransportCar' or 'GProuteTransportPedestrian' tag input
     * (cf. this._createRoutePanelFormModeChoiceTransportElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onRouteModeTransportChange = function (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }
        this._currentTransport = value;
    };

    /**
     * TODO this method is called by event 'click' on 'GPshowRouteExclusionsPicto' tag input
     * (cf. this._createShowRouteExclusionsPictoElement), and it displays the panel options of exclusions.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onShowRouteExclusionsClick = function (e) {
        logger.log("onShowRouteExclusionsClick", e);
        // FIXME not use ?!
    };

    /**
     * this method is called by event 'change' on 'GProuteExclusionsToll'
     * or 'GProuteExclusionsTunnel' or 'GProuteExclusionsBridge' tag input
     * (cf. this._createRoutePanelFormExclusionOptionsElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onRouteExclusionsChange = function (e) {
        var value = e.target.value;
        var checked = e.target.checked;

        if (!value || (typeof value !== "string")) {
            return;
        }
        value = value.toLowerCase();

        var bFound = false;
        var iFound = null;
        for (var i = 0; i < this._currentExclusions.length; i++) {
            if (this._currentExclusions[i] === value) {
                iFound = i;
                bFound = true;
            }
        }
        // on l'ajoute si la valeur n'existe pas et est déselectionnée
        // info : checked = passage autorisé (ce n'est pas une exclusion)
        if (!bFound && !checked) {
            this._currentExclusions.push(value);
        }
        // on la retire si la valeur existe et est selectionnée
        if (bFound && checked) {
            this._currentExclusions.splice(iFound, 1);
        }
    };

    /**
     * this method is called by event 'click' on 'GProuteReset'
     * tag label (cf. this._createRouteFormResetElement),
     * and it cleans all route input options and results.
     *
     * @private
     */
    Route.prototype.onRouteResetClick = function () {
        // clear points
        var currentPoints = this._currentPoints;
        for (var i = 0; i < currentPoints.length; i++) {
            currentPoints[i].clear();
        }

        // clear results
        this._clear();

        this._clearRouteInputOptions();
    };

    /**
     * this method is called by event 'click' on 'GProuteSubmit'
     * tag label (cf. this._createRouteSubmitFormElement),
     * and it cleans the route geometry.
     *
     * @private
     */
    Route.prototype.onShowRouteResultsNewClick = function () {
        // clean avant un nouveau calcul !
        this._clearRouteResultsDetails();
        this._clearRouteResultsGeometry();
        this._clearRouteResultsFeatureGeometry();
    };

    /**
     * this method is called by event 'mouseover' on 'GProuteResultsDetailsInstruction_'
     * tag label (cf. this._addRouteResultsDetailsElement),
     * and it makes a style on feature route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onRouteResultsDetailsMouseOver = function (e) {
        // récupération de l'id de l'instruction survolée
        var tagid = e.target.id; // ex GProuteResultsDetailsInstruction_125
        var idx = tagid.substring(tagid.indexOf("_") + 1); // ex. 125

        // on passe le texte en gras
        if (e.target.classList) {
            e.target.classList.add("GProuteResultsDetailsInstructionHighlight");
        }

        if (!this._geojsonSections) {
            return;
        }

        // on récupère l'entité correspondante à l'instruction survolée
        var f = this._geojsonSections.getSource().getFeatureById(parseInt(idx, 10));
        // et on lui affecte un nouveau style
        f.setStyle(this._selectedFeatureStyle);
    };

    /**
     * this method is called by event 'mouseout' on 'GProuteResultsDetailsInstruction_'
     * tag label (cf. this._addRouteResultsDetailsElement),
     * and it deletes a style on feature route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    Route.prototype.onRouteResultsDetailsMouseOut = function (e) {
        // récupération de l'id de l'instruction survolée
        var tagid = e.target.id; // ex GProuteResultsDetailsInstruction_125
        var idx = tagid.substring(tagid.indexOf("_") + 1); // ex. 125

        // on repasse le texte en style normal
        if (e.target.classList) {
            e.target.classList.remove("GProuteResultsDetailsInstructionHighlight");
        }

        if (!this._geojsonSections) {
            return;
        }
        // on récupère l'entité correspondante à l'instruction qui était survolée
        var f = this._geojsonSections.getSource().getFeatureById(parseInt(idx, 10));
        // et on lui réaffecte un style normal
        f.setStyle(null);
    };

    // ################################################################### //
    // ########################### Routing ############################### //
    // ############## (methods to request and results) ################### //

    /**
     * this method is called by this.onRouteComputationSubmit()
     * and executes a request to the service.
     *
     * @param {Object} options - route service request options
     * @param {Function} options.onSuccess - callback
     * @param {Function} options.onFailure - callback
     * @private
     */
    Route.prototype._requestRouting = function (options) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!options || (typeof options === "object" && Object.keys(options).length === 0)) {
            return;
        }

        // on ne fait pas de requête si
        // - la parametre 'startPoint' est vide !
        if (!options.startPoint) {
            return;
        }
        // - la parametre 'endPoint' est vide !
        if (!options.endPoint) {
            return;
        }

        // on ne fait pas de requête si aucun droit !
        if (this._noRightManagement || !this._resources["Itineraire"]) {
            return;
        }

        // gestion des droits !
        var resources = this._resources["Itineraire"].resources;
        if (!resources || (typeof resources === "object" && Object.keys(resources).length === 0)) {
            return;
        }

        // gestion de la clef !
        var key = this._resources["Itineraire"]["key"];

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
        options.apiKey = this.options.routeOptions.apiKey || this.options.apiKey || key;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        options.ssl = options.ssl || this.options.ssl || true;

        logger.log(options);

        // mise en place de la patience
        this._displayWaitingContainer();

        // appel du service de calcul d'itinéraires
        Gp.Services.route(options);
    };

    /**
     * this method is called by this.onRouteComputationSubmit() (in case of route computation success)
     * and fills the container of the route instructions list, distance and time
     * information, also, constructs the geometry route.
     *
     * @param {Object} results - results of the route calculation
     *
     * @private
     */
    Route.prototype._fillRouteResultsDetails = function (results) {
        // 1. Affichage des distances et durées
        var distance = results.totalDistance;
        var duration = results.totalTime;
        // Détails avec simplifications des troncons
        var instructions = this._simplifiedInstructions(results.routeInstructions);
        // var instructions = results.routeInstructions;

        if (instructions) {
            this._fillRouteResultsDetailsContainer(distance, duration, instructions);
        }

        // 2. Affichage des géométries
        // Geometrie simplifiée (si renseignée)
        var geometry = results.routeGeometry;
        if (geometry) {
            this._fillRouteResultsDetailsGeometry(geometry, this._defaultFeatureStyle);
        }

        // Geometries des tronçon (si renseignée)
        if (instructions && instructions[0].geometry) {
            this._fillRouteResultsDetailsFeatureGeometry(instructions, this._defaultFeatureStyle);
        }

        // 3. Zoom sur l'emprise de l'itinéraire (si spécifiée)
        var bbox = results.bbox;
        if (bbox) {
            var map = this.getMap();
            var bounds = [bbox.left, bbox.bottom, bbox.right, bbox.top];
            // reprojection dans la projection de la carte (bbox initialement en EPSG:4326)
            var mapProj = map.getView().getProjection().getCode();
            if (mapProj !== "EPSG:4326") {
                bounds = olTransformExtentProj(bounds, "EPSG:4326", mapProj);
            }
            map.getView().fit(bounds, map.getSize());
        }

        // sauvegarde de l'etat des resultats
        this._currentRouteInformations = results;

        // mise à jour du controle !
        this._formRouteContainer.className = "GProuteComponentHidden";
        this._hideWaitingContainer();
        this._resultsRouteContainer.className = "";
    };

    /**
     * this method is called by this._fillRouteResultsDetails()
     * and fills the container of the route instructions list, distance and time
     * information.
     *
     * @param {Number} distance - distance
     * @param {Number} duration - duration
     * @param {Object[]} instructions - list of instructions
     *
     * @private
     */
    Route.prototype._fillRouteResultsDetailsContainer = function (distance, duration, instructions) {
        // Distance et Durée
        this._resultsRouteValuesContainer = this._addRouteResultsValuesElement(distance, duration, this._convertSecondsToTime);

        // Détails
        this._resultsRouteDetailsContainer = this._addRouteResultsDetailsElement(instructions, this._convertSecondsToTime);
    };

    /**
     * this method is called by this._fillRouteResultsDetails()
     * and constructs the geometry route.
     *
     * @param {Object} geometry - geoJSON object for route geometry
     * @param {Object} style - route ol.style.Style object
     * @private
     */
    Route.prototype._fillRouteResultsDetailsGeometry = function (geometry, style) {
        this._clearRouteResultsGeometry();

        var map = this.getMap();

        if (!geometry) {
            return;
        }

        // création de l'objet geoJSON
        var geojsonObject = {
            type : "Feature",
            crs : {
                type : "name",
                properties : {
                    name : "EPSG:4326"
                }
            },
            geometry : geometry
        };
        var geojsonformat = new GeoJSON({
            defaultDataProjection : "EPSG:4326"
        });
        var features = geojsonformat.readFeatures(
            geojsonObject, {
                dataProjection : "EPSG:4326",
                featureProjection : "EPSG:3857"
            }
        );

        // ajout de la géométrie comme nouvelle couche vecteur à la carte
        this._geojsonRoute = new VectorLayer({
            source : new VectorSource({
                features : features
            }),
            style : style
        });
        map.addLayer(this._geojsonRoute);
    };

    /**
     * this method is called by this._fillRouteResultsDetails()
     * and constructs the geometries street with informations.
     *
     * @param {Array} instructions - route instructions list (containing geoJSON geometry)
     * @param {Object} style - route ol.style.Style object
     * @private
     */
    Route.prototype._fillRouteResultsDetailsFeatureGeometry = function (instructions, style) {
        this._clearRouteResultsFeatureGeometry();

        var map = this.getMap();

        // 1. création de l'objet geoJSON
        var geojsonObject = {
            type : "FeatureCollection",
            crs : {
                type : "name",
                properties : {
                    name : "EPSG:4326"
                }
            },
            features : []
        };

        // 2. Remplissage de l'objet geoJSON : ajout des géométries de chaque instruction
        for (var i = 0; i < instructions.length; i++) {
            var o = instructions[i];
            var id = i + 1;

            var coords = o.geometry.coordinates;
            for (var j = 0; j < coords.length; j++) {
                // remarque : les coordonnées sont au format string, à convertir en nombres
                if (typeof coords[j][0] === "string") {
                    coords[j][0] = parseFloat(coords[j][0]);
                    coords[j][1] = parseFloat(coords[j][1]);
                }
            }

            geojsonObject.features.push({
                type : "Feature",
                geometry : o.geometry,
                properties : {
                    popupContent : "(" + id + ") distance : " + this._convertDistance(o.distance) +
                        " / temps : " + this._convertSecondsToTime(o.duration)
                },
                id : id
            });
        }

        logger.log(geojsonObject);

        // Création du format GeoJSON, avec reprojection des géométries
        var geojsonformat = new GeoJSON({
            defaultDataProjection : "EPSG:4326"
        });
        var mapProj = this.getMap().getView().getProjection().getCode();
        var features = geojsonformat.readFeatures(
            geojsonObject, {
                dataProjection : "EPSG:4326",
                featureProjection : mapProj
            }
        );

        // 3. Ajout du tracé de l'itinéraire (geoJSON) comme nouvelle couche vecteur à la carte
        this._geojsonSections = new VectorLayer({
            source : new VectorSource({
                features : features
            }),
            style : style,
            opacity : 0.9
        });

        var graph;
        if (this._currentTransport === "Pieton") {
            graph = "piéton";
            this._geojsonSections.gpResultLayerId = "Pieton$OGC:OPENLS;Itineraire";
        } else {
            graph = "voiture";
            this._geojsonSections.gpResultLayerId = "Voiture$OGC:OPENLS;Itineraire";
        }
        // ajout à la carte
        map.addLayer(this._geojsonSections);

        // 4. Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        map.getControls().forEach(
            (control) => {
                if (control instanceof LayerSwitcher) {
                    // un layer switcher est présent dans la carte
                    var layerId = this._geojsonSections.gpLayerId;
                    // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                    if (control._layers[layerId].title === layerId) {
                        control.addLayer(
                            this._geojsonSections, {
                                title : this.options.layerDescription.title + " (" + graph + ")",
                                description : this.options.layerDescription.description
                            }
                        );
                    }
                }
            },
            this
        );

        // 5. Ajout de popups aux troncons
        // Création de l'interaction : survol des features (=troncons de l'itinéraire)
        this._resultsHoverInteraction = new SelectInteraction({
            condition : eventPointerMove,
            layers : [this._geojsonSections],
            style : this._selectedFeatureStyle
        });
        this._resultsHoverInteraction.on(
            "select",
            (e) => this._onResultsFeatureMouseOver(e)
        );
        map.addInteraction(this._resultsHoverInteraction);

        // Création de l'interaction : selection des features (=troncons de l'itinéraire)
        this._resultsSelectInteraction = new SelectInteraction({
            layers : [this._geojsonSections],
            style : this._selectedFeatureStyle
        });
        this._resultsSelectInteraction.on(
            "select",
            (e) => this._onResultsFeatureSelect(e)
        );
        map.addInteraction(this._resultsSelectInteraction);
    };

    /**
     * this method is called on route features hover
     * and highlight instruction label
     *
     * @param {Object} e - event
     *
     * @private
     */
    Route.prototype._onResultsFeatureMouseOver = function (e) {
        if (e.selected.length !== 0) {
            // si on a bien survolé un tronçon, on surligne l'instruction correspondante
            var f = e.selected[0];
            var selectedInstruction = document.getElementById("GProuteResultsDetailsInstruction_" + f.getId() + "-" + this._uid);
            if (selectedInstruction && selectedInstruction.classList) {
                selectedInstruction.classList.add("GProuteResultsDetailsInstructionHighlight");
            }
        }

        // si on déselectionne un tronçon (mouseout), on rétablit un style normal pour l'instruction
        if (e.deselected.length !== 0) {
            var deselectedFeature = e.deselected[0];
            // on repasse l'instruction correspondante en normal
            var deSelectedInstruction = document.getElementById("GProuteResultsDetailsInstruction_" + deselectedFeature.getId() + "-" + this._uid);
            if (deSelectedInstruction && deSelectedInstruction.classList) {
                deSelectedInstruction.classList.remove("GProuteResultsDetailsInstructionHighlight");
            }
        }
    };

    /**
     * this method is called on route features select
     * and set a popup with feature information
     *
     * @param {Object} e - on select event
     * @private
     */
    Route.prototype._onResultsFeatureSelect = function (e) {
        var map = this.getMap();
        if (e.selected.length !== 0) {
            // si on a sélectionné un troncon, on lui ajoute une popup
            var f = e.selected[0];
            this._popupContent.innerHTML = f.getProperties().popupContent;

            if (!this._popupOverlay) {
                // ajout de la popup a la carte comme un overlay
                this._popupOverlay = new Overlay({
                    element : this._popupDiv,
                    positioning : "bottom-center",
                    position : e.mapBrowserEvent.coordinate
                });
                map.addOverlay(this._popupOverlay);
            } else {
                // si l'overlay est déjà créé, on modifie juste sa position
                this._popupOverlay.setPosition(e.mapBrowserEvent.coordinate);
            }
        } else {
            // si aucun troncon n'est sélectionné (click à côté du tracé),
            // on fait disparaitre la popup si elle existe
            if (this._popupOverlay != null) {
                this._popupOverlay.setPosition(undefined);
            }
        }
    };

    // ################################################################### //
    // ############################# Clean ############################### //
    // ################################################################### //

    /**
     * this method is called by this.onShowRoutePanelClick()
     * and it clears all elements (reinit).
     *
     * @private
     */
    Route.prototype._clear = function () {
        this._currentTransport = null;
        this._currentExclusions = [];
        this._currentComputation = null;

        // les resultats
        this._clearRouteResultsDetails();
        // la geometrie
        this._clearRouteResultsGeometry();
        this._clearRouteResultsFeatureGeometry();
        // les points
        for (var i = 0; i < this._currentPoints.length; i++) {
            this._currentPoints[i].clear();
        }
        // suppression des points intermédiaires
        this._removeRouteStepLocations();
    };

    /**
     * this method is called by this.onRouteResetClick()
     * and it clears all options inputs (reinit).
     *
     * @private
     */
    Route.prototype._clearRouteInputOptions = function () {
        // reinit options to default
        this._initTransport();
        this._initComputation();
        this._initExclusions();

        // set transport mode to default
        var transportdiv;
        if (this._currentTransport === "Pieton") {
            transportdiv = document.getElementById("GProuteTransportPedestrian-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        } else {
            transportdiv = document.getElementById("GProuteTransportCar-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        }

        // set computation mode to default
        var computationdiv = document.getElementById("GProuteComputationSelect-" + this._uid);
        if (computationdiv) {
            computationdiv.value = this._currentComputation;
        }

        // set exclusions to default
        var tollInput = document.getElementById("GProuteExclusionsToll-" + this._uid);
        if (tollInput) {
            if (this._currentExclusions.indexOf("toll") !== -1) {
                tollInput.checked = false;
            } else {
                tollInput.checked = true;
            }
        }

        var tunnelInput = document.getElementById("GProuteExclusionsTunnel-" + this._uid);
        if (tunnelInput) {
            if (this._currentExclusions.indexOf("tunnel") !== -1) {
                tunnelInput.checked = false;
            } else {
                tunnelInput.checked = true;
            }
        }

        var bridgeInput = document.getElementById("GProuteExclusionsBridge-" + this._uid);
        if (bridgeInput) {
            if (this._currentExclusions.indexOf("bridge") !== -1 && bridgeInput) {
                bridgeInput.checked = false;
            } else {
                bridgeInput.checked = true;
            }
        }
    };

    /**
     * this method is called by this._clear()
     * and it removes step location inputs (excepted departure and arrival)
     *
     * @private
     */
    Route.prototype._removeRouteStepLocations = function () {
        var points = document.querySelectorAll("div[id^=\"GPlocationPoint\"]");
        if (points.length !== 0) {
            var goodPoints = [];
            for (var k = 0; k < points.length; k++) {
                if (points[k].id.indexOf(this._uid) !== -1) {
                    goodPoints.push(points[k]);
                }
            }
            // on boucle sur les points intermédiaires
            for (var i = 1; i < (goodPoints.length - 1); i++) {
                // on va regarder les classes associées
                var classList = goodPoints[i].classList;
                if (classList.length !== 0) {
                    for (var j = 0; j < classList.length; j++) {
                        if (classList[j] === "GPlocationStageFlexInput") {
                            // si l'élément est visible, on le supprime en simulant un clic sur la croix (x)
                            document.getElementById(this._addUID("GPlocationStageRemove_" + (i + 1))).click();
                        }
                    }
                }
            }
        }
    };

    /**
     * this method is called by this.onRouteComputationSubmit() (in case of failure)
     * and it clears all route instructions.
     *
     * @private
     */
    Route.prototype._clearRouteResultsDetails = function () {
        this._currentRouteInformations = null;

        // doit on nettoyer le container "GProuteResultsDetails" ?
        // il sera de toute façon écrasé par la prochaine requête...
        if (this._resultsRouteDetailsContainer) {
            var detailsDiv = this._resultsRouteDetailsContainer;
            if (detailsDiv.childElementCount) {
                while (detailsDiv.firstChild) {
                    detailsDiv.removeChild(detailsDiv.firstChild);
                }
            }
        }

        if (this._resultsRouteValuesContainer) {
            var valuesDiv = this._resultsRouteValuesContainer;
            if (valuesDiv.childElementCount) {
                while (valuesDiv.firstChild) {
                    valuesDiv.removeChild(valuesDiv.firstChild);
                }
            }
        }
    };

    /**
     * this method is called by this.onRouteComputationSubmit()
     * and it clears all route geometries.
     *
     * @private
     */
    Route.prototype._clearRouteResultsGeometry = function () {
        var map = this.getMap();

        if (this._geojsonRoute != null) {
            map.removeLayer(this._geojsonRoute);
            this._geojsonRoute = null;
        }
    };

    /**
     * this method is called by this.onRouteComputationSubmit()
     * and it clears all route geometries.
     *
     * @private
     */
    Route.prototype._clearRouteResultsFeatureGeometry = function () {
        var map = this.getMap();

        // on retire la couche itinéraire de la carte
        if (this._geojsonSections != null) {
            map.removeLayer(this._geojsonSections);
            this._geojsonSections = null;
        }
        // on retire l'overlay de la popup de la carte
        if (this._popupOverlay != null) {
            map.removeOverlay(this._popupOverlay);
            this._popupOverlay = null;
        }
        // et les interactions liées à cette couche
        if (this._resultsSelectInteraction != null) {
            map.removeInteraction(this._resultsSelectInteraction);
            this._resultsSelectInteraction = null;
        }
        if (this._resultsHoverInteraction != null) {
            map.removeInteraction(this._resultsHoverInteraction);
            this._resultsHoverInteraction = null;
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
    Route.prototype._hideRouteSuggestedLocations = function (e) {
        // si on clique sur un input de saisie de locationSelector
        if (e.target && e.target.id && e.target.id.indexOf("GPlocationOrigin_") !== -1) {
            // on récupère le numéro du point
            var pointId = parseInt(e.target.id.split("_")[1][0], 10) - 1;
            // et on cache les autres résultats d'autocomplétion (sauf celui sur lequel on clique)
            for (var j = 0; j < this._currentPoints.length; j++) {
                if (j !== parseInt(pointId, 10)) {
                    this._currentPoints[j]._hideSuggestedLocation();
                }
            }
        } else {
            // si on clique ailleurs dans le DOM du control, on cache tous les résultats d'autocomplétion
            for (var i = 0; i < this._currentPoints.length; i++) {
                this._currentPoints[i]._hideSuggestedLocation();
            }
        }
    };

    /**
     * this method displays waiting container and sets a timeout
     *
     * @private
     */
    Route.prototype._displayWaitingContainer = function () {
        this._waitingContainer.className = "GProuteCalcWaitingContainerVisible";
        this._waiting = true;

        // mise en place d'un timeout pour réinitialiser le panel (cacher la patience)
        // si on est toujours en attente (si la requête est bloquée par exemple)
        // ceci est vrai, uniquement sur le protocole JSONP !
        var opts = this.options.routeOptions;
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
    Route.prototype._hideWaitingContainer = function () {
        if (this._waiting) {
            this._waitingContainer.className = "GProuteCalcWaitingContainerHidden";
            this._waiting = false;
            var opts = this.options.routeOptions;
            if (opts && opts.timeOut) {
                clearTimeout(this._timer);
                this._timer = null;
            }
        }
    };

    // ################################################################### //
    // ########################## Geometry ############################### //
    // ################################################################### //

    /**
     * simplified instructions
     *
     * @param {Object[]} instructions - list of instructions
     *
     * @returns {Object[]} simplified instructions
     *
     * @private
     */
    Route.prototype._simplifiedInstructions = function (instructions) {
        var newInstructions = [];

        // cas où...
        var current = instructions[0];
        if (instructions.length === 1) {
            newInstructions.push(current);
        }

        for (var i = 1; i < instructions.length; i++) {
            var o = instructions[i];
            if (o.instruction === current.instruction) {
                current.distance = (parseFloat(o.distance) + parseFloat(current.distance)).toString();
                current.duration = (parseFloat(o.duration) + parseFloat(current.duration)).toString();
                for (var j = 1; j < o.geometry.coordinates.length; j++) {
                    current.geometry.coordinates.push(o.geometry.coordinates[j]);
                }
            } else {
                newInstructions.push(current);
                current = o;
                // last
                if (i === instructions.length - 1) {
                    newInstructions.push(o);
                    current = null;
                }
            }
        }
        logger.log(newInstructions);
        return newInstructions;
    };

    // ################################################################### //
    // ################# Utils for Distance/Duration ##################### //
    // ################################################################### //

    /**
     * convert seconds to time : HH:MM:SS
     *
     * @param {Number} duration - duration in seconds
     *
     * @returns {String} time in hours/minutes/seconds
     *
     * @private
     */
    Route.prototype._convertSecondsToTime = function (duration) {
        var time = "";

        duration = Math.round(duration);
        var hours = Math.floor(duration / (60 * 60));

        var divisor4minutes = duration % (60 * 60);
        var minutes = Math.floor(divisor4minutes / 60);
        // if (!minutes) {
        //     minutes = "00";
        // }

        // var divisor4seconds = divisor4minutes % 60;
        // var seconds = Math.ceil(divisor4seconds);
        // if (!seconds) {
        //     seconds = "00";
        // }

        if (hours) {
            time = hours + "h ";
        }
        time += minutes + " min";
        return time;
    };

    /**
     * convert distance in meters or kilometers
     *
     * @param {Number} distance - distance in meters
     *
     * @returns {String} distance in km
     *
     * @private
     */
    Route.prototype._convertDistance = function (distance) {
        var d = "";

        var distanceKm = parseInt(distance / 1000, 10);
        if (!distanceKm) {
            d = parseInt(distance, 10) + " m"; // arrondi !
        } else {
            d = distanceKm + " km";
        }

        return d;
    };

    return Route;
}(Control));

export default Route;

// Expose Route as ol.control.Route (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Route = Route;
}
