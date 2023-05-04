import Gp from "geoportal-access-lib";
import L from "leaflet";
import Logger from "../../Common/Utils/LoggerByDefault";
import ID from "../../Common/Utils/SelectorID";
import MathUtils from "../../Common/Utils/MathUtils";
import MousePositionDOM from "../../Common/Controls/MousePositionDOM";
import PositionFormater from "./Utils/PositionFormater";
import CRS from "../CRS/CRS";

var logger = Logger.getLogger("mouseposition");

/**
 * @classdesc
 *
 * Leaflet Control Class to display Mouse position in various CRS and altitude using the <a href="https://geoservices.ign.fr/documentation/geoservices/alti.html" target="_blank">altimetric web service of the Geoportal Platform</a>.
 *
 * Use {@link module:Controls.MousePosition L.geoportalControl.MousePosition()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control" target="_blank">L.Control</a> native class.
 *
 * @namespace
 * @alias L.geoportalControl.MousePosition
 */
var MousePosition = L.Control.extend(/** @lends L.geoportalControl.MousePosition.prototype */ {

    includes : MousePositionDOM,

    /**
     * options by default
     *
     * @private
     */
    options : {
        position : "bottomleft",
        collapsed : true,
        units : [],
        systems : [],
        displayAltitude : true,
        displayCoordinates : true,
        editCoordinates : false,
        altitude : {
            triggerDelay : 200,
            responseDelay : 500,
            noDataValue : -99999,
            noDataValueTolerance : 90000,
            serviceOptions : {}
        }
    },

    /**
     * @constructor MousePosition
     *
     * @private
     * @alias MousePosition
     * @extends {L.Control}
     * @param {Object} options - options for function call.
     * @param {String}   [options.apiKey] - API key. The "calcul" key is used by default.
     * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
     * @param {String}  [options.position] - position of component into the map, 'bottomleft' by default
     * @param {Boolean} [options.collapsed = true] - collapse mode, false by default
     * @param {Array}   [options.systems] - list of projection systems, GEOGRAPHIC, MERCATOR, LAMB93 and LAMB2E by default
     *      Each array element (=system) is an object with following properties :
     * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
     * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
     * @param {String}  [options.systems.type] - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
     * @param {Object}  [options.systems.geoBBox] - Aera covered by the system (WGS84 coordinates).
     * @param {Number}  options.systems.geoBBox.right - Right bound.
     * @param {Number}  options.systems.geoBBox.left - Left bound.
     * @param {Number}  options.systems.geoBBox.top - Top bound.
     * @param {Number}  options.systems.geoBBox.bottom - Bottom bound.
     * @param {Array}   [options.units] - list of units by system, Geographical and Metric by default
     *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
     *      and "M" or "KM" for metric coordinates
     * @param {Boolean} [options.displayAltitude= true] - active/desactivate the altitude panel, if desactivate, have just the coordinate panel, true by default
     * @param {Boolean} [options.displayCoordinates= true] - active/desactivate the coordinate panel, if desactivate, have just the altitude panel, true by default
     * @param {Boolean} [options.editCoordinates = false] - add edit coordinates options. False by default.
     * @param {Object}  [options.altitude] - elevation configuration
     * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
     * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
     * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
     * @param {Number}  [options.altitude.noDataValue] - value used for altitude service no data (default is -99999). In this case, "---m" will be displayed instead of "-99999m"
     * @param {Number}  [options.altitude.noDataValueTolerance] - tolerance for no data value :
     *                  values in [noDataValue - noDataValueTolerance ; noDataValue + noDataValueTolerance] interval will not be displayed, but "---m" will be displayed instead.
     *                  Default is 90000
     * @example
     *  var MousePosition = L.geoportalControl.MousePosition({
     *      position : 'bottomleft',
     *      collapsed : false,
     *      displayAltitude : true,
     *      displayCoordinates : true,
     *      editCoordinates : false,
     *      altitude : {
     *           triggerDelay : 100,
     *           responseDelay : 500,
     *           noDataValue : -99999,
     *           noDataValueTolerance : 90000,
     *           serviceOptions : {}
     *      },
     *      systems : [
     *       {
     *          crs : L.CRS.EPSG4326,
     *          label : "Lon,Lat",
     *          type : "Geographical"
     *        },
     *       {
     *          crs : L.geoportalCRS.EPSG2154,
     *          label : "Lambert 93",
     *          type : "Metric"
     *        }
     *      ],
     *      units : ["DEC", "DMS"]
     *  });
     */
    initialize : function (options) {
        // on merge les options avec celles par defaut
        L.Util.extend(this.options, options);

        // uuid
        this._uid = ID.generate();

        // initialisation des systemes de projections
        this._projectionSystems = [];
        this._initProjectionSystems();

        // initialisation des systemes des unités
        this._projectionUnits = {};
        this._initProjectionUnits();

        // detection du support : desktop ou tactile
        this._isDesktop = this._detectSupport();

        // on met en place un seuil sur le timer
        if (this.options.altitude.triggerDelay < 100) {
            this.options.altitude.triggerDelay = 100;
        }

        // timer sur le delai d'immobilisation du mouvement
        this._timer = this.options.altitude.triggerDelay;

        // Systeme de projection selectionné (cf. _initProjectionSystems)
        this._currentProjectionSystems = this._projectionSystems[0];

        // Container des systemes
        this._projectionSystemsContainer = null;

        /** Type d'unité de projection selectionnés : Geographical ou Metric (cf._initProjectionSystems ) */
        this._currentProjectionType = this._projectionSystems[0].type;

        // Unité de projection selectionnés (cf. _initProjectionUnits)
        this._currentProjectionUnits = this._projectionUnits[this._currentProjectionType][0].code;

        // Container des unités
        this._projectionUnitsContainer = null;

        /** Container de visualisation du panneau du composant */
        this._showContainer = null;
        this._pictoContainer = null;
        this._panelContainer = null;
        this._panelHeaderContainer = null;

        // gestion de l'affichage du panneau de l'altitude / coordonnées
        if (!this.options.displayAltitude && !this.options.displayCoordinates) {
            // on reactive cette option !
            this.options.displayCoordinates = true;
        }

        if (!this.options.displayCoordinates) {
            // si les coordonnées ne sont pas affichées : pas besoin de les éditer...
            this.options.editCoordinates = false;
        }

        /** Edition des coordonnées en cours ou non */
        this._isEditing = false;

        // on transmet les options au controle
        L.Util.setOptions(this, this.options);
    },

    /**
     * this method is called by this.addTo(map) when the control is added on the map
     * and fills variable 'this._container = this.onAdd(map)',
     * and create events on map.
     * @param {Object} map - the map
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    onAdd : function (map) {
        // initialisation du DOM du composant
        var container = this._container = this._initLayout();

        // on met en place l'evenement sur la carte pour recuperer les coordonnées,
        // on l'active à l'ouverture du panneau uniquement !
        if (!this.options.collapsed) {
            // this.onShowMousePositionClick();
            // evenement valable pour le mode desktop !
            if (this._isDesktop) {
                map.on("mousemove", this.onMouseMove, this);
            } else {
                map.on("move", this.onMapMove, this);
            }
        }

        // deactivate of events that may interfere with the map
        L.DomEvent
            .disableClickPropagation(container)
            .disableScrollPropagation(container);

        // on stoppe la propagation de l'événement mousemove sur le container
        L.DomEvent
            .addListener(container, "mousemove", L.DomEvent.stopPropagation)
            .addListener(container, "mousemove", L.DomEvent.preventDefault);

        return container;
    },

    /**
     * this method is called when the control is removed from the map
     * and removes events on map.
     * @param {Object} map - the map
     *
     * @private
     */
    onRemove : function (map) {
        map.off("mousemove", this.onMouseMove);
    },

    /**
     * this method is called by the constructor and initialize the projection
     * systems.
     * getting coordinates in the requested projection :
     * see this.onMousePositionProjectionSystemChange()
     *
     * @private
     */
    _initProjectionSystems : function () {
        // on donne la possibilité à l'utilisateur de modifier
        // la liste des systèmes à afficher
        // Ex. this.options.systems

        // systemes de projection disponible par defaut
        var projectionSystemsByDefault = [{
            label : "G\u00e9ographique",
            crs : L.CRS.Simple, // L.Projection.LonLat !
            type : "Geographical"
        }, {
            label : "Web Mercator",
            crs : L.CRS.EPSG3395, // L.Projection.SphericalMercator !
            type : "Metric"
        }, {
            label : "Lambert 93",
            crs : CRS.EPSG2154,
            type : "Metric",
            geoBBox : {
                left : -9.86,
                bottom : 41.15,
                right : 10.38,
                top : 51.56
            }
        }, {
            label : "Lambert II \u00e9tendu",
            crs : CRS.EPSG27572,
            type : "Metric",
            geoBBox : {
                left : -4.87,
                bottom : 42.33,
                right : 8.23,
                top : 51.14
            }
        }];

        var systems = this.options.systems;
        for (var i = 0; i < systems.length; i++) {
            // definition d'un systeme de reference
            var sys = systems[i];

            if (!sys.label) {
                logger.error("not defined !");
                continue;
            }

            if (!sys.crs) {
                logger.error("crs not defined !");
                continue;
            }

            if (!sys.type) {
                logger.warn("type srs not defined, use 'Metric' by default !");
                sys.type = "Metric";
            }

            this._projectionSystems.push(systems[i]);

            // it's a just a test ...
            var found = false;
            for (var j = 0; j < projectionSystemsByDefault.length; j++) {
                var obj = projectionSystemsByDefault[j];
                if (sys.crs === obj.crs) {
                    found = true;
                    logger.info("crs '{}' already configured by default", obj.code);
                }
            }
            if (!found) {
                logger.info("crs '{}' not found, it's a new projection", sys.code || sys.label);
            }
        }

        // au cas où...
        if (this._projectionSystems.length === 0) {
            this._projectionSystems = projectionSystemsByDefault;
        }

        // re-initilisation des codes pour gerer le lien entre _projectionSystems et select du mouse position (lien code/value)
        for (var k = 0; k < this._projectionSystems.length; ++k) {
            this._projectionSystems[k].code = k;
        }
    },

    /**
     * this method is called by the constructor and initialize the units.
     * getting coordinates in the requested units :
     * see this.onMousePositionProjectionUnitsChange()
     *
     * @private
     */
    _initProjectionUnits : function () {
        // on donne la possibilité à l'utilisateur de modifier
        // la liste des unités à afficher
        // Ex.
        // this.options.units : ["DEC", "DMS"]

        // unités disponible par defaut
        var projectionUnitsByDefault = {
            Geographical : [{
                code : "DEC",
                label : "degrés décimaux",
                format : this._displayDEC
            }, {
                code : "DMS",
                label : "degrés sexagésimaux",
                format : this._displayDMS
            }, {
                code : "RAD",
                label : "radians",
                format : this._displayRAD
            }, {
                code : "GON",
                label : "grades",
                format : this._displayGON
            }],
            Metric : [{
                code : "M",
                label : "mètres",
                format : this._displayMeter
            }, {
                code : "KM",
                label : "kilomètres",
                format : this._displayKMeter
            }]
        };

        var units = this.options.units;

        for (var type in projectionUnitsByDefault) {
            if (projectionUnitsByDefault.hasOwnProperty(type)) {
                var found = false;
                for (var j = 0; j < projectionUnitsByDefault[type].length; j++) {
                    var obj = projectionUnitsByDefault[type][j];
                    for (var i = 0; i < units.length; i++) {
                        var unit = units[i];
                        if (obj.code === unit) {
                            found = true;
                            if (!this._projectionUnits[type]) {
                                this._projectionUnits[type] = [];
                            }
                            this._projectionUnits[type].push(obj);
                        }
                    }
                }
                if (!found) {
                    this._projectionUnits[type] = projectionUnitsByDefault[type];
                }
            }
        }

        // au cas où...
        if (Object.keys(this._projectionUnits).length === 0) {
            this._projectionUnits = projectionUnitsByDefault;
        }
    },

    /**
     * this method is called by the constructor.
     * this information is useful to switch to touch mode.
     * Detection : test for desktop or tactile
     *
     * @returns {Boolean} is desktop
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
    // ######################## methods handle dom ####################### //
    // ################################################################### //

    /**
     * this method is called by this.onAdd(map)
     * and initialize the container HTMLElement
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    _initLayout : function () {
        // create main container
        var container = this._createMainContainerElement();

        var inputShow = this._showContainer = this._createShowMousePositionElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if (!this.options.collapsed) {
            inputShow.checked = true;
        }

        var picto = this._pictoContainer = this._createShowMousePositionPictoElement(this._isDesktop);
        container.appendChild(picto);

        var panel = this._panelContainer = this._createMousePositionPanelElement();

        var header = this._panelHeaderContainer = this._createMousePositionPanelHeaderElement();
        panel.appendChild(header);

        var basic = this._createMousePositionPanelBasicElement(
            this.options.displayAltitude,
            this.options.displayCoordinates,
            this.options.editCoordinates
        );
        panel.appendChild(basic);

        var arraySettings = this._createShowMousePositionSettingsElement(this.options.displayCoordinates);
        for (var j = 0; j < arraySettings.length; j++) {
            panel.appendChild(arraySettings[j]);
        }

        var settings = this._createMousePositionSettingsElement();
        var systems = this._projectionSystemsContainer = this._createMousePositionSettingsSystemsElement(this._projectionSystems);
        var units = this._projectionUnitsContainer = this._createMousePositionSettingsUnitsElement(this._projectionUnits[this._currentProjectionType]);
        settings.appendChild(systems);
        settings.appendChild(units);
        panel.appendChild(settings);

        container.appendChild(panel);

        // ce tag n'est pas à placer dans le container du controle,
        // mais dans celui de la map !
        var center = this._createMapCenter();
        var map = this._map;
        map.getContainer().appendChild(center);

        return container;
    },

    /**
     * this method is called by this.()
     * and it changes the elevation view panel into the dom.
     * FIXME call by ID !
     *
     * @param {Boolean} active - true:active, false:disable
     *
     * @private
     */
    _setElevationPanel : function (active) {
        var div = null;

        if (!active) {
            div = L.DomUtil.get(this._addUID("GPmousePositionAltitude"));
            div.style.display = "none";
        }

    },

    /**
     * this method is called by this.()
     * and it changes the coordinate view panel into the dom.
     * FIXME call by ID !
     *
     * @param {Boolean} active - true:active, false:disable
     *
     * @private
     */
    _setCoordinatePanel : function (active) {
        if (!active) {
            var div = L.DomUtil.get(this._addUID("GPmousePositionCoordinate"));
            div.style.display = "none";
        }
    },

    /**
     * this method is called by this.()
     * and it changes the settings view panel into the dom.
     * FIXME call by ID !
     *
     * @param {Boolean} active - true:active, false:disable
     *
     * @private
     */
    _setSettingsPanel : function (active) {
        if (!active) {
            var divPicto = L.DomUtil.get("GPshowMousePositionSettingsPicto");
            var divPanel = L.DomUtil.get(this._addUID("GPmousePositionSettings"));
            divPicto.style.display = "none";
            divPanel.style.display = "none";
        }
    },

    /**
     * this method is called by this.onMousePositionProjectionSystemChange()
     * when changes to a metric or a geographical units.
     *
     * @param {String} type - Geographical or Metric
     *
     * @private
     */
    _setTypeUnitsPanel : function (type) {
        var container = this._projectionUnitsContainer;

        // on supprime les enfants...
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var units = this._projectionUnits[type];
        for (var j = 0; j < units.length; j++) {
            var obj = units[j];
            var option = document.createElement("option");
            option.value = (obj.code) ? obj.code : j;
            option.text = obj.label || j;
            // option.label = obj.label;
            container.appendChild(option);
        }

        var projectionUnits = this._projectionUnits[type][0].code;

        if (this._currentProjectionUnits === "DMS" || projectionUnits === "DMS") {
            this._resetCoordinateElements(this.options.editCoordinates, type, projectionUnits);
            this._setEditMode(this._isEditing);
        }

        // le nouveau type de system ...
        this._currentProjectionType = type;

        // Mise a jour des elements labels et unites
        this._resetLabelElements(type);
        this._resetUnitElements(projectionUnits);

        // et comme on a changé de type de systeme,
        // il faut changer aussi d'unité !
        this._currentProjectionUnits = this._projectionUnits[type][0].code;
    },

    // ################################################################### //
    // ######################## method units format ###################### //
    // ################################################################### //

    /**
     * degreedecimal
     * @param {Object} oLatLng - coordinates
     *
     * @returns {Object} coordinates in decimal
     * @private
     */
    _displayDEC : function (oLatLng) {
        var coordinate = {};
        coordinate.lat = PositionFormater.roundToDecimal(oLatLng.lat, 6);
        coordinate.lng = PositionFormater.roundToDecimal(oLatLng.lng, 6);
        coordinate.unit = "°";
        return coordinate;
    },

    /**
     * degreedecimal2sexagecimal
     * @param {Object} oLatLng - coordinates
     *
     * @returns {Object} coordinates in DMS
     * @private
     */
    _displayDMS : function (oLatLng) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalLatToDMS(oLatLng.lat, true);
        coordinate.lng = PositionFormater.decimalLonToDMS(oLatLng.lng, true);
        return coordinate;
    },

    /**
     * degreedecimal2radian
     * @param {Object} oLatLng - coordinates
     *
     * @returns {Object} coordinates in radian
     * @private
     */
    _displayRAD : function (oLatLng) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalToRadian(oLatLng.lat);
        coordinate.lng = PositionFormater.decimalToRadian(oLatLng.lng);
        coordinate.unit = "rad";
        return coordinate;
    },

    /**
     * degreedecimal2grade
     * @param {Object} oLatLng - coordinates
     *
     * @returns {Object} coordinates in gon
     * @private
     */
    _displayGON : function (oLatLng) {
        var coordinate = {};
        coordinate.lat = PositionFormater.decimalToGrade(oLatLng.lat);
        coordinate.lng = PositionFormater.decimalToGrade(oLatLng.lng);
        coordinate.unit = "gon";
        return coordinate;
    },

    /**
     * meter
     * @param {Object} oXY - coordinates
     *
     * @returns {Object} coordinates in meters
     * @private
     */
    _displayMeter : function (oXY) {
        // on recoit toujours des coordonnées metriques
        var coordinate = {};
        coordinate.x = L.Util.formatNum(oXY.x, 2);
        coordinate.y = L.Util.formatNum(oXY.y, 2);
        coordinate.unit = "m";
        return coordinate;
    },

    /**
     * kilometer
     * @param {Object} oXY - coordinates
     *
     * @returns {Object} coordinates in km
     * @private
     */
    _displayKMeter : function (oXY) {
        var coordinate = {};
        coordinate.x = L.Util.formatNum(oXY.x / 1000, 2);
        coordinate.y = L.Util.formatNum(oXY.y / 1000, 2);
        coordinate.unit = "km";
        return coordinate;
    },

    // ################################################################### //
    // ####################### method system project ##################### //
    // ################################################################### //

    /**
     * this method projects a coordinate to a specific projection.
     * FIXME
     *
     * @param {Object} oLatLng - geographic coordinate (L.LatLng)
     * @param {Object} crs - projection system (ex. GEOGRAPHIC, LAMB93, LAMB2E, MERCATOR, ...)
     * @returns {Object} oXY - coordinate
     * @private
     */
    _project : function (oLatLng, crs) {
        // cf. http://leafletjs.com/reference.html#iprojection
        // notre carte est dans la projection par defaut :
        // Spherical Mercator projection (EPSG:3857)
        // - GEOGRAPHIC : conversion native, L.CRS.Simple ou L.Projection.LngLat.project(latlng)
        // - LAMB93 : L.GeoportalCRS.EPSG2154 ou projection.project(latlng)
        // - LAMB2E : L.GeoportalCRS.EPSG27572 ou projection.project(latlng)
        // - MERCATOR ou EPSG:3395 : L.CRS.EPSG3395 ou L.Projection.Mercator.project(latlng)

        if (typeof crs === "function") {
            // "crs is an function !"... en mode AMD !
            crs = crs();
        }

        if (typeof crs !== "object") {
            logger.log("crs is not an object !");
            return;
        }

        // pas de reprojection pour le systeme de projection natif !
        if (crs === L.CRS.Simple) {
            return oLatLng;
        }

        if (!crs.projection || typeof crs.projection !== "object") {
            logger.error("projection is not an object !");
            return;
        }

        var oPoint = crs.projection.project(oLatLng);

        // FIXME reprojeter du geographique en geographique cause qq problemes
        // Ex. LatLng en EPSG4326 !
        // FIXME probleme d'inversion d'axe sur les projections geographiques
        // Ex. EPSG:4326 -> lat/lon
        //     IGNF:RGF93G -> lon/lat
        if (this._currentProjectionType === "Geographical") {
            oPoint.lat = oPoint.y;
            oPoint.lng = oPoint.x;
        }

        if (!oPoint || Object.keys(oPoint).length === 0) {
            logger.error("Failed to project with crs code : " + crs.code);
        }

        return oPoint;
    },

    /**
     * this method unprojects a coordinate to a geographic projection.
     *
     * @param {Object} oXY - coordinate
     * @returns {Object} oLatLng - geographic coordinate (L.LatLng)
     * @private
     */
    _unproject : function (oXY) {
        // cf. http://leafletjs.com/reference.html#iprojection
        // notre carte est dans la projection par defaut :
        // Spherical Mercator projection (EPSG:3857)
        // - GEOGRAPHIC : conversion native, L.CRS.Simple ou L.Projection.LngLat.project(latlng)
        // - LAMB93 : L.GeoportalCRS.EPSG2154 ou projection.project(latlng)
        // - LAMB2E : L.GeoportalCRS.EPSG27572 ou projection.project(latlng)
        // - MERCATOR ou EPSG:3395 : L.CRS.EPSG3395 ou L.Projection.Mercator.project(latlng)

        var oSrs = this._currentProjectionSystems.crs;
        if (!oSrs) {
            logger.log("system crs not found");
            return;
        }

        if (typeof oSrs === "function") {
            // "crs is an function !"... en mode AMD !
            oSrs = oSrs();
        }

        if (typeof oSrs !== "object") {
            logger.log("crs is not an object !");
            return;
        }

        // pas de reprojection pour le systeme de projection natif !
        if (oSrs === L.CRS.Simple) {
            return {
                lat : oXY.y,
                lng : oXY.x
            };
        }

        if (this._currentProjectionType === "Geographical") {
            return {
                lat : oXY.y,
                lng : oXY.x
            };
        }

        if (!oSrs.projection || typeof oSrs.projection !== "object") {
            logger.error("projection is not an object !");
            return;
        }

        var oLatLng = oSrs.projection.unproject(oXY);

        if (!oLatLng || Object.keys(oLatLng).length === 0) {
            logger.error("Failed to unproject coordinate");
        }

        return oLatLng;
    },

    // ################################################################### //
    // ##################### handlers events to control ################## //
    // ################################################################### //

    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @param {Object} oLatLng - geographic coordinate (L.LatLng)
     *
     * @private
     */
    _setCoordinate : function (oLatLng) {
        // structure
        // L.LatLng
        //     lat: 4.07249425916745
        //     lng: 2.4609375

        // type de systeme : Geographical ou Metric
        var type = this._currentProjectionSystems.type;

        // on recherche la fonction de formatage dans l'unitée demandée
        var format = null;
        var units = this._projectionUnits[type];
        for (var i = 0; i < units.length; i++) {
            if (units[i].code === this._currentProjectionUnits) {
                format = units[i].format;
                break;
            }
        }

        // structure pour les coordonnées en fonctin du type demandé :
        // {x:, y:, unit:} ou {lng:, lat:} ou {lon:, lat:} ou {e:, n:, unit:}...
        var coordinate = {};
        // on projete le point dans le systeme demandé
        var oSrs = this._currentProjectionSystems.crs;
        if (!oSrs) {
            logger.error("crs not found !");
            return;
        }
        coordinate = format(this._project(oLatLng, oSrs));

        if (!coordinate || Object.keys(coordinate).length === 0) {
            return;
        }

        this.GPdisplayCoords(coordinate);
    },

    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayElevation() into the DOM functions)
     *
     * @param {Object} oLatLng - geographic coordinate (L.LatLng)
     *
     * @private
     */
    _setElevation : function (oLatLng) {
        // gestion du timer de la requete du service d'altitude
        var delay = this.options.altitude.responseDelay;
        var noDataValue = this.options.altitude.noDataValue;
        var noDataValueTolerance = this.options.altitude.noDataValueTolerance;
        this.GPdisplayElevation(oLatLng, delay, noDataValue, noDataValueTolerance);
    },

    /**
     * this method is triggered when the mouse or the map is stopped.
     * (cf. onMouseMove and onMapMove)
     *
     * @param {Object} oLatLng - geographic coordinate (L.LatLng)
     *
     * @private
     */
    onMoveStopped : function (oLatLng) {
        this._setElevation(oLatLng);
    },

    /**
     * this method is an handler event to control. The event is 'mousemove' on
     * the map. The handler sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onMouseMove : function (e) {
        var self = this;

        var oLatLng = e.latlng;

        this._setCoordinate(oLatLng);

        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
            self.onMoveStopped(oLatLng);
        }, this.options.altitude.triggerDelay);
    },

    /**
     * this method is an handler event to control. The event is 'moveend' on
     * the map. The handler sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @private
     */
    onMapMove : function () {
        var self = this;
        var map = this._map;

        var oLatLng = map.getCenter();

        this._setCoordinate(oLatLng);

        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
            self.onMoveStopped(oLatLng);
        }, this.options.altitude.triggerDelay);
    },

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by this.GPdisplayCoords() in the dom, and
     * it executes a request to the elevation service.
     *
     * @param {Object} coordinate - {lat:..., lng:...}
     * @param {Function} callback - callback
     *
     * @private
     */
    onRequestAltitude : function (coordinate, callback) {
        logger.log("onRequestAltitude");

        // INFORMATION
        // on effectue la requête au service d'altitude...
        // on met en place des callbacks afin de recuperer les resultats ou
        // les messages d'erreurs du service.
        // le resultat est affiché dans une balise du dom.
        // les messages d'erreurs sont affichés sur la console (?)

        if (!coordinate || Object.keys(coordinate).length === 0) {
            return;
        }

        // si on ne veut pas de calcul d'altitude, on ne continue pas !
        if (!this.options.displayAltitude) {
            return;
        }

        logger.log(coordinate);

        var options = {};
        // on recupere les options du service
        L.Util.extend(options, this.options.altitude.serviceOptions);

        // ainsi que les coordonnées
        L.Util.extend(options, {
            zonly : true,
            positions : [{
                lon : coordinate.lon || coordinate.lng,
                lat : coordinate.lat
            }]
        });

        // et les callbacks
        L.Util.extend(options, {
            scope : this,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log(results);
                if (results && Object.keys(results).length) {
                    // var context = this.options.scope;
                    // context._setAltidude(results.elevations[0].z);
                    callback.call(this, results.elevations[0].z);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                logger.error(error.message);
            }
        });

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle renseignée au niveau du controle ou la clé "calcul" par défaut
        L.Util.extend(options, {
            apiKey : options.apiKey || this.options.apiKey
        });

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        L.Util.extend(options, {
            ssl : this.options.ssl
        });

        logger.log(options);

        Gp.Services.getAltitude(options);
    },

    /**
     * this method is called by event 'click' on 'GPshowMousePositionPicto' tag label
     * (cf. this._createShowMousePositionPictoElement),
     * and toggles event 'mousemove' on map.
     * FIXME
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onShowMousePositionClick : function (e) {
        logger.log(e);

        // checked : true - panel close
        // checked : false - panel open
        var map = this._map;

        // evenement declenché à l'ouverture/fermeture du panneau,
        // et en fonction du mode : desktop ou tactile !
        if (this._showContainer.checked) {
            (this._isDesktop)
                ? map.off("mousemove", this.onMouseMove, this)
                : map.off("move", this.onMapMove, this);
        } else {
            (this._isDesktop)
                ? map.on("mousemove", this.onMouseMove, this)
                : map.on("move", this.onMapMove, this);
        }

        // on gère l'affichage des panneaux ici...,
        // même si ce n'est pas l'endroit adequate...
        this._setElevationPanel(this.options.displayAltitude);
        this._setCoordinatePanel(this.options.displayCoordinates);
        if (!this.options.displayCoordinates) {
            this._setSettingsPanel(false);
        }
    },

    /**
     * this method is called by event 'click' on input coordinate
     *
     * @param {Boolean} editing - editing mode
     * @private
     */
    onMousePositionEditModeClick : function (editing) {
        if (!this.options.editCoordinates) {
            return;
        }

        if (this._isEditing === editing) {
            return;
        }

        this._isEditing = editing;

        // Affichage des outils, input en ecriture
        this._setEditMode(this._isEditing);

        var map = this._map;

        if (this._isDesktop) {
            (this._isEditing)
                ? map.off("mousemove", this.onMouseMove, this)
                : map.on("mousemove", this.onMouseMove, this);
        } else {
            (this._isEditing)
                ? map.off("move", this.onMapMove, this)
                : map.on("move", this.onMapMove, this);
        }
    },

    /**
     * Convert Coordinate value : km to meters, radians, grades to decimal degrees
     * @param {Number} value - value to convert
     * @param {String} unit - unit
     *
     * @returns {Number} converted value
     * @private
     */
    _convertCoordinate : function (value, unit) {
        var result;
        if (unit === "DEC" || unit === "DMS") { // DMS est converti en DEC !
            result = value;
        } else if (unit === "M") {
            result = value;
        } else if (unit === "KM") {
            result = value * 1000;
        } else if (unit === "RAD") {
            var rd = (180 / Math.PI).toFixed(20);
            result = (value * rd).toFixed(20);
        } else if (unit === "GON") {
            var d = (9 / 10).toFixed(20);
            result = (value * d).toFixed(20);
        }

        return result;
    },

    /**
     * Validate Extend coordinate
     *
     * @param {String} coordType - Lat or Lon
     * @param {String} value - coordinate
     * @param {Event} e - event
     * @returns {Boolean} value is within extent
     */
    validateExtentCoordinate : function (coordType, value, e) {
        // FIXME pas de validation...
        if (e !== undefined) {
            return true;
        }

        if (["Lon", "Lat"].indexOf(coordType) === -1) {
            return false;
        }

        var geoBBox = this._currentProjectionSystems.geoBBox;

        if (geoBBox === undefined) {
            return true;
        }

        if (geoBBox) {
            // check if coordinates are in the extent

            var extent = [geoBBox.left, geoBBox.bottom, geoBBox.right, geoBBox.top];
            var unit = this._currentProjectionUnits;

            // on convertit un point..., mais on n'a pas de fonction
            // de conversion comme pour openlayers...
            var oLatLon = this._unproject({
                x : (coordType === "Lon") ? this._convertCoordinate(value, unit) : 0,
                y : (coordType === "Lat") ? this._convertCoordinate(value, unit) : 0

            });

            if (coordType === "Lon" && (oLatLon.lng < extent[0] || oLatLon.lng > extent[2])) {
                logger.warn("coordinates (lon) out of extent !?");
                return false;
            }
            if (coordType === "Lat" && (oLatLon.lat < extent[1] || oLatLon.lat > extent[3])) {
                logger.warn("coordinates (lat) out of extent !?");
                return false;
            }
        }

        return true;
    },

    /**
     * Get coordinate from inputs and select in decimal degrees
     *
     * @param {String} coordType - "Lon" or "Lat"
     * @returns {String} coordinate
     * @private
     */
    _getCoordinate : function (coordType) {
        var inputDegrees = L.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Degrees"));
        var degrees = inputDegrees.value;
        if (!degrees) {
            return null;
        }

        degrees = degrees.replace(",", ".");
        if (!MathUtils.isInteger(degrees)) {
            return null;
        }

        var result = MathUtils.toInteger(degrees);
        if (result < Number(inputDegrees.dataset.min) || result > Number(inputDegrees.dataset.max)) {
            return null;
        }

        var direction = L.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Direction")).value;

        var inputMinutes = L.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Minutes"));
        var minutes = inputMinutes.value;
        if (minutes) {
            minutes = minutes.replace(",", ".");
            if (MathUtils.isInteger(minutes)) {
                var mins = MathUtils.toInteger(minutes);
                if (mins >= Number(inputMinutes.dataset.min) && mins <= Number(inputMinutes.dataset.max)) {
                    result += (mins / 60);
                }
            }
        }

        var inputSeconds = L.DomUtil.get(this._addUID("GPmousePosition" + coordType + "Seconds"));
        var seconds = inputSeconds.value;
        if (seconds) {
            seconds = seconds.replace(",", ".");
            var secs = MathUtils.toFloat(seconds);
            if (secs && secs >= Number(inputSeconds.dataset.min) && secs <= Number(inputSeconds.dataset.max)) {
                result += (secs / 3600);
            }
        }

        if (direction === "O" || direction === "S") {
            result = -result;
        }

        return result;
    },

    /**
     * locate DMS coordinates on map
     *
     * @private
     */
    _locateDMSCoordinates : function () {
        // on est toujours en coordonnées geographiques...
        var oLatLon = {
            lat : this._getCoordinate("Lat"),
            lng : this._getCoordinate("Lon")
        };

        if (!this.validateExtentCoordinate("Lon", oLatLon.lng)) {
            return;
        }

        if (!this.validateExtentCoordinate("Lat", oLatLon.lat)) {
            return;
        }

        // FIXME https://github.com/Leaflet/Leaflet/issues/922
        var map = this._map;
        map.panTo(oLatLon);
    },

    /**
     * locate coordinates on map (not DMS)
     *
     * @private
     */
    _locateCoordinates : function () {
        // soit longitude ou soit y
        var lonYDom = L.DomUtil.get(this._addUID("GPmousePositionLon")).value;
        lonYDom = lonYDom.replace(",", ".");
        lonYDom = parseFloat(lonYDom);
        if (isNaN(lonYDom)) {
            return;
        }

        // soit lattitude ou soit x
        var latXDom = L.DomUtil.get(this._addUID("GPmousePositionLat")).value;
        latXDom = latXDom.replace(",", ".");
        latXDom = parseFloat(latXDom);
        if (isNaN(latXDom)) {
            return;
        }

        var lon = null;
        var lat = null;
        var x = null;
        var y = null;

        if (this._currentProjectionType === "Geographical") {
            lon = lonYDom;
            lat = latXDom;
        } else {
            x = latXDom;
            y = lonYDom;
        }

        if (!this.validateExtentCoordinate("Lon", lon || x)) {
            return;
        }

        if (!this.validateExtentCoordinate("Lat", lat || y)) {
            return;
        }

        var unit = this._currentProjectionUnits;
        var oLatLon = this._unproject({
            x : this._convertCoordinate(lon !== null ? lon : x, unit),
            y : this._convertCoordinate(lat !== null ? lat : y, unit)
        });

        // FIXME https://github.com/Leaflet/Leaflet/issues/922
        var map = this._map;
        map.panTo(oLatLon);
    },

    /**
     * locate coordinates on map
     *
     * @method locate
     * @private
     */
    onMousePositionEditModeLocateClick : function () {
        if (!this.options.editCoordinates) {
            return;
        }

        if (!this._isEditing) {
            this.onMousePositionEditModeClick(true);
            return;
        }

        (this._currentProjectionUnits === "DMS")
            ? this._locateDMSCoordinates()
            : this._locateCoordinates();
    },

    /**
     * this method is called by event 'change' on 'GPmousePositionProjectionSystem'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the system projection.
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onMousePositionProjectionSystemChange : function (e) {
        logger.log("onMousePositionProjectionSystemChange", e);

        var idx = e.target.selectedIndex; // index
        var value = e.target.options[idx].value; // crs, ex. MERCATOR (optionnel)
        var label = e.target.options[idx].label; // etiquette, ex Géographiques

        logger.log(idx, value, label);

        this._setCurrentSystem(value);
    },

    /**
     * this method selects the current system projection.
     *
     * @param {Object} systemCode - inner code (rank in array _projectionSystems)
     *
     * @private
     */
    _setCurrentSystem : function (systemCode) {
        // si on change de type de systeme, on doit aussi changer le type d'unités !
        var type = null;
        for (var i = 0; i < this._projectionSystems.length; ++i) {
            if (this._projectionSystems[i].code === Number(systemCode)) {
                type = this._projectionSystems[i].type;
                break;
            }
        }

        if (!type) {
            logger.log("system not found in projection systems container");
            return;
        }

        if (type !== this._currentProjectionType) {
            this._setTypeUnitsPanel(type);
        }

        // on enregistre le systeme courrant
        this._currentProjectionSystems = this._projectionSystems[Number(systemCode)];

        // on simule un deplacement en mode tactile pour mettre à jour les
        // resultats
        if (!this._isDesktop) {
            this.onMapMove();
        }
    },

    /**
     * this method is called by event 'mouseover' on 'GPmousePositionProjectionSystem'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the system projection.
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onMousePositionProjectionSystemMouseOver : function (e) {
        logger.log("onMousePositionProjectionSystemMouseOver", e);

        var map = this._map;
        if (!map) {
            return;
        }

        // clear select
        var systemList = L.DomUtil.get(this._addUID("GPmousePositionProjectionSystem"));

        systemList.innerHTML = "";

        // add systems whose extent intersects the map extent
        for (var j = 0; j < this._projectionSystems.length; j++) {
            var proj = this._projectionSystems[j];
            var option = null;

            if (proj.geoBBox) {
                // bboxes intersection test
                if (map.getBounds()._southWest.lng > proj.geoBBox.right ||
                    map.getBounds()._southWest.lat > proj.geoBBox.top ||
                    map.getBounds()._northEast.lng < proj.geoBBox.left ||
                    map.getBounds()._northEast.lat < proj.geoBBox.bottom
                ) {
                    if (proj === this._currentProjectionSystems) {
                        option = document.createElement("option");
                        option.value = proj.code;
                        option.text = proj.label || j;
                        option.setAttribute("selected", "selected");
                        option.setAttribute("disabled", "disabled");

                        systemList.appendChild(option);
                    }
                    continue; // do not intersect
                }
            }
            option = document.createElement("option");
            option.value = proj.code;
            option.text = proj.label || j;
            if (proj === this._currentProjectionSystems) {
                option.setAttribute("selected", "selected");
            }

            systemList.appendChild(option);
        }
    },

    /**
     * this method is called by event 'change' on 'GPmousePositionProjectionUnits'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the units projection.
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onMousePositionProjectionUnitsChange : function (e) {
        logger.log("onMousePositionProjectionUnitsChange", e);

        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;
        var label = e.target.options[idx].label;

        logger.log(idx, value, label);

        var oldProjectionUnits = this._currentProjectionUnits;
        var newProjectionUnits = this._currentProjectionUnits = value;
        var newProjectionType = this._currentProjectionType;

        // Mise a jour des elements lebels et unites
        this._resetLabelElements(newProjectionType);
        this._resetUnitElements(newProjectionUnits);

        // mise a jour des inputs pour les coordonnees
        if (oldProjectionUnits === "DMS" || newProjectionUnits === "DMS") {
            this._resetCoordinateElements(this.options.editCoordinates, newProjectionType, newProjectionUnits);
            this._setEditMode(this._isEditing);
        }

        // on simule un deplacement en mode tactile pour mettre à jour les
        // resultats
        if (!this._isDesktop) {
            this.onMapMove();
        }
    },

    // ################################################################### //
    // ###### METHODES PUBLIQUES (INTERFACE AVEC LE CONTROLE) ############ //
    // ################################################################### //

    /**
     * This method is public.
     * It allows to control the execution of a movement.
     *
     * @param {Object} position - position = {lon: , lat: }
     * @param {Number} zoom - zoom
     * @param {Object} options - Zoom/pan options
     */
    moveTo : function (position, zoom, options) {
        if (!this._showContainer.checked) {
            this._pictoContainer.click();
        }

        var map = this._map;
        if (!map) {
            return;
        }

        this.onMouseMove({
            latlng : position
        });

        map.flyTo(position, zoom || 10, options || {});
    }
});

export default MousePosition;
