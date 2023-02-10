import L from "leaflet";
import Logger from "../../Common/Utils/LoggerByDefault";
import ID from "../../Common/Utils/SelectorID";
import LocationSelector from "./LocationSelector";
import RouteDOM from "../../Common/Controls/RouteDOM";

var logger = Logger.getLogger("grouplocationselector");

/**
 * @classdesc
 *
 *  Group of LocationSelector Control.
 *
 * @constructor GroupLocationSelector
 * @alias GroupLocationSelector
 * @extends {L.Control}
 * @param {Object} options - options for function call.
 * @param {String}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
 * @param {String}  [options.position] - position of component into the map, 'topleft' by default
 * @param {Boolean} [options.collapsed] - collapse mode, false by default
 * @param {Object}  ...
 * @private
 * @example
 *  var route = L.geoportalControl.Route({
 *      position : "topright",
 *      collapsed : true
 *  });
 */
var GroupLocationSelector = L.Control.extend(/** @lends GroupLocationSelector.prototype */ {

    includes : RouteDOM,

    /**
     * Options du service
     * - position
     * - url
     * - text
     * - picto (30px)
     * @type {Object}
     */
    options : {
        position : "topright",
        collapsed : true
    },

    /**
     * constructor
     * @param {Object} options - options
     */
    initialize : function (options) {
        /** liste de points selectionnée */
        this._currentPoints = [];

        /** uuid */
        this._uid = ID.generate();

        L.setOptions(this, options);
    },

    /**
     * this method is called by this.addTo(map) when the control is added on the map
     * and fills variable 'this._container = this.onAdd(map)',
     * and create or disable events on map.
     * @param {L.Map} map - object map
     * @returns {DOMElement} container
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
     */
    onRemove : function (/* map */) {},

    // ################################################################### //
    // ########################### init dom ############################## //
    // ################################################################### //

    /**
     * this method is called by this.onAdd(map)
     * and initialize the container HTMLElement
     * @param {L.Map} map - object map
     * @returns {DOMElement} container
     */
    _initLayout : function (map) {
        // create main container
        var container = this._createMainContainerElement();

        var inputShow = this._showRouteContainer = this._createShowRouteElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if (!this.options.collapsed) {
            inputShow.checked = true;
        }

        var picto = this._createShowRoutePictoElement();
        container.appendChild(picto);

        var routePanel = this._createRoutePanelElement();

        // header form
        var routeHeader = this._createRoutePanelHeaderElement();
        routePanel.appendChild(routeHeader);

        // form
        var routeForm = this._createRoutePanelFormElement();

        // form:points
        var points = this._createRoutePanelFormPointsElement(map);
        for (var i = 0; i < points.length; i++) {
            routeForm.appendChild(points[i]);
        }

        // form:submit
        routeForm.appendChild(this._createRouteSubmitFormElement());

        routePanel.appendChild(routeForm);

        // results
        var routeResults = this._createRoutePanelResultsElement();
        routePanel.appendChild(routeResults);

        container.appendChild(routePanel);

        return container;
    },

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * TODO this method is called by event 'click' on ''
     * tag label (cf. this._createShowRoutePictoElement),
     * and it cleans all value of input.
     *
     * @param {Object} e - HTMLElement
     */
    onShowRoutePanelClick : function (e) {
        logger.log("onShowRouteClick", e);
    },

    /**
     * TODO this method is called by event 'submit' on '' tag form
     * (cf. this.), and it displays the results.
     *
     * @param {Object} e - HTMLElement
     */
    onRouteComputationSubmit : function (e) {
        logger.log("onRouteComputationSubmit", e);
    },

    // ################################################################### //
    // ############################## DOM ################################ //
    // ################################################################### //

    /**
     * Create List Points
     * see event !
     * OVERWRITTEN !
     *
     * @param {L.Map} map - object map
     * @returns {Array} List DOM element
     */
    _createRoutePanelFormPointsElement : function (map) {
        var points = [];

        var count = 1;
        // point de depart
        var start = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : count,
                unique : this._uid,
                label : "Départ",
                color : "blue",
                display : true
            }
        });
        start.setMap(map);
        points.push(start.getContainer());
        this._currentPoints.push(start);
        // points intermediaires
        for (count = 2; count < 7; count++) {
            var step = new LocationSelector({
                apiKey : this.options.apiKey || null,
                tag : {
                    id : count,
                    unique : this._uid,
                    label : "Etape",
                    color : "red",
                    display : false,
                    removeOption : true
                }
            });
            step.setMap(map);
            points.push(step.getContainer());
            this._currentPoints.push(step);
        }
        // point d'arrivé
        var end = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : count,
                unique : this._uid,
                label : "Arrivée",
                color : "orange",
                display : true,
                addOption : true,
                removeOption : false
            }
        });
        end.setMap(map);
        points.push(end.getContainer());
        this._currentPoints.push(end);

        return points;
    }

});

export default GroupLocationSelector;
