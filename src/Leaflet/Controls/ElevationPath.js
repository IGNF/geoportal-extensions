/* globals AmCharts, d3 */
import Gp from "geoportal-access-lib";
import L from "leaflet";
import "leaflet-draw";
import Logger from "../../Common/Utils/LoggerByDefault";
import RightManagement from "../../Common/Utils/CheckRightManagement";
import ID from "../../Common/Utils/SelectorID";
import PositionFormater from "./Utils/PositionFormater";
import IconDefault from "./Utils/IconDefault";
import ElevationPathDOM from "../../Common/Controls/ElevationPathDOM";
import ProfileElevationPathDOM from "../../Common/Controls/ProfileElevationPathDOM";

var logger = Logger.getLogger("ElevationPath");

/**
 * @classdesc
 *
 * Leaflet Control Class to compute and display Profil Elevation.
 *
 * Use {@link module:Controls.ElevationPath L.geoportalControl.ElevationPath()} factory to create instances of that class.
 *
 * **Extends** Leaflet <a href="http://leafletjs.com/reference.html#control" target="_blank">L.Control</a> native class.
 *
 * @namespace
 * @alias L.geoportalControl.ElevationPath
 */
var ElevationPath = L.Control.extend(/** @lends L.geoportalControl.ElevationPath.prototype */ {

    includes : ElevationPathDOM,

    /**
     * Options du service
     *
     * @private
     */
    options : {
        position : "topleft",
        active : false,
        elevationPathOptions : {},
        stylesOptions : {},
        displayProfileOptions : {
            greaterSlope : true,
            meanSlope : true,
            ascendingElevation : true,
            descendingElevation : true,
            currentSlope : true,
            apply : null,
            target : null
        }
    },

    /**
     * @constructor ElevationPath
     *
     * @private
     * @param {Object} options - ElevationPath control options
     * @param {String}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
     * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
     * @param {Boolean} [options.active] - Specify if widget has to be actived to drawing (true) or not (false) on map loading. Default is false.
     * @param {Object} [options.elevationPathOptions = {}] - elevation service options. See {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getAltitude Gp.Services.getAltitude()} to know all elevation options
     * @param {Object} [options.displayProfileOptions = {}] - profile options.
     * @param {Function} [options.displayProfileOptions.apply] - function to display profil panel.
     * @param {Object} [options.displayProfileOptions.target] - container DOM for the profil panel.
     * @param {Boolean} [options.displayProfileOptions.greaterSlope = true] - display the greater slope into the graph
     * @param {Boolean} [options.displayProfileOptions.meanSlope = true] -  display the mean slope into the graph
     * @param {Boolean} [options.displayProfileOptions.ascendingElevation = true] -  display the ascending elevation into the graph
     * @param {Boolean} [options.displayProfileOptions.descendingElevation = true] -  display the descending elevation into the graph
     * @param {Boolean} [options.displayProfileOptions.currentSlope = true] -  display current slope value on profile mouseover
     *
     * @example
     *  var e = L.geoportalControl.ElevationPath({
     *      active : false,
     *      stylesOptions : {},
     *      elevationPathOptions : {},
     *      displayProfileOptions : {
     *       apply : null,
     *       target : null
     *      }
     *  });
     * Exemples :
     * - displayProfileOptions.apply : null
     * - displayProfileOptions.apply : function (elevations, container, context) {  // do some stuff... }
     * - displayProfileOptions.apply : ol.control.ElevationPath.DISPLAY_PROFILE_{LIB_AMCHARTS | LIB_D3 | RAW}
     * (detect auto lib. : d3 / AmCharts)
     */
    initialize : function (options) {
        // on transmet les options au controle
        L.Util.setOptions(this, options);

        // uuid
        this._uid = ID.generate();

        // initialisation
        this._initDisplayProfileOptions();

        // les container
        this._showContainer = null;
        this._pictoContainer = null;
        this._panelContainer = null;
        this._profilContainer = null;
        this._waitingContainer = null;
        this._infoContainer = null;

        // timer sur la fenetre d'informations des données
        this._timerHdlr = null;

        // detection si le panneau est reduit
        this._reducePanel = false;

        // couche vectorielle dans laquelle seront saisis les points (features ci-dessus)
        this._featuresLayer = null;
        this._lastIdLayer = 0;
        this._currentIdLayer = 0;
        this._currentFeature = null;

        // graph
        this._profile = null;
        this._marker = null;

        // geometry à transmettre au service :  { lon : [], lat : []}
        this._geometry = null;

        // distance du segment
        this._distance = 0;

        // data elevations
        this._data = {};

        // aucun droits sur les ressources
        this._noRightManagement = false;

        // gestion des droits sur les ressources/services
        this._checkRightsManagement();
    },

    /**
     * this method is called by this.addTo(map) when the control is added on the map
     * and fills variable 'this._container = this.onAdd(map)',
     * and create or disable events on map.
     *
     * @param {Object} map - the map
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    onAdd : function (map) {
        // initialisation du DOM du composant
        var container = this._container = this._initLayout();

        if (map) {
            // lors de l'ajout à la map, on active la saisie du point,
            // mais seulement si le widget est ouvert
            if (this.options.active) {
                if (this._profile === null) {
                    this._panelContainer.style.display = "none";
                    // this._panelContainer.style.visibility = "hidden";
                }
                this._activateMapInteraction(map);
            }
        }

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
    // ########################## init resources ######################### //
    // ################################################################### //

    /**
     * this method is called by constructor
     * and check the rights to resources
     *
     * @private
     */
    _checkRightsManagement : function () {
        var rightManagement = RightManagement.check({
            key : this.options.apiKey,
            resources : ["SERVICE_CALCUL_ALTIMETRIQUE_RSC"],
            services : ["ElevationLine"]
        });

        if (!rightManagement) {
            this._noRightManagement = true;
        }

        // on recupère les informations utiles
        // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
        // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
        // été renseignée.
        if (!this.options.apiKey) {
            this.options.apiKey = rightManagement.key;
        }
    },

    // ################################################################### //
    // ####################### init application ########################## //
    // ################################################################### //

    /**
     * this method is called by the constructor and initialize the ...
     *
     * @private
     */
    _initDisplayProfileOptions : function () {
        // gestion de l'affichage du profil
        var _profileOpts = this.options.displayProfileOptions;

        // gestion de la fonction du profil
        var displayFunction = _profileOpts.apply;
        _profileOpts.apply = (typeof displayFunction === "function")
            ? displayFunction : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT;

        // gestion du container du profil
        var displayContainer = _profileOpts.target;
        _profileOpts.target = (typeof displayContainer !== "undefined")
            ? displayContainer : null;

        // les autres options
        var _protoOpts = Object.getPrototypeOf(this.options);
        if (typeof _profileOpts.meanSlope === "undefined") {
            _profileOpts.meanSlope = _protoOpts.displayProfileOptions.meanSlope;
        }
        if (typeof _profileOpts.greaterSlope === "undefined") {
            _profileOpts.greaterSlope = _protoOpts.displayProfileOptions.greaterSlope;
        }
        if (typeof _profileOpts.ascendingElevation === "undefined") {
            _profileOpts.ascendingElevation = _protoOpts.displayProfileOptions.ascendingElevation;
        }
        if (typeof _profileOpts.descendingElevation === "undefined") {
            _profileOpts.descendingElevation = _protoOpts.displayProfileOptions.descendingElevation;
        }
        if (typeof _profileOpts.currentSlope === "undefined") {
            _profileOpts.currentSlope = _protoOpts.displayProfileOptions.currentSlope;
        }
    },

    // ################################################################### //
    // ########################### init dom ############################## //
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

        var inputShow = this._showContainer = this._createShowElevationPathElement();
        container.appendChild(inputShow);

        // mode "collapsed"
        if (this.options.active) {
            this._showContainer.checked = true;
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

        // info
        var info = this._infoContainer = this._createElevationPathInformationsElement();
        panel.appendChild(info);

        container.appendChild(panel);

        return container;
    },

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on '' picto
     * and ...
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onShowElevationPathClick : function (e) {
        logger.trace(e);
        var map = this._map;

        // interactions avec la carte
        if (!this._reducePanel) {
            if (this._showContainer.checked) {
                this._pictoContainer.style.display = "block";
                this._panelContainer.style.display = "none";
                this._removeMapInteraction(map);
                this._clear();
            } else {
                if (this._profile === null) {
                    this._panelContainer.style.display = "none";
                }
                this._activateMapInteraction(map);
            }
        } else {
            if (this._profile !== null) {
                if (this.options.displayProfileOptions.target === null) {
                    this._pictoContainer.style.display = "none";
                }
                this._panelContainer.style.display = "block";
            }
        }

        this._reducePanel = false;
    },

    /**
     * this method is called by event 'click' on '' picto
     * (cf. this.),
     * and reduce the panel
     *
     * @private
     */
    onReduceElevationPathPanelClick : function () {
        this._reducePanel = true;
        this._pictoContainer.style.display = "block";
        this._panelContainer.style.display = "none";
    },

    /**
     * this method is called by event 'click' on '' picto
     * (cf. this.),
     * and display the panel info
     * TODO
     *
     * @private
     */
    onOpenElevationPathInfoClick : function () {
        // options d'affichage
        var meanSlope = this.options.displayProfileOptions.meanSlope;
        var greaterSlope = this.options.displayProfileOptions.greaterSlope;
        var ascendingElevation = this.options.displayProfileOptions.ascendingElevation;
        var descendingElevation = this.options.displayProfileOptions.descendingElevation;

        // clean
        var div = this._infoContainer;
        if (div.childElementCount) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }

        // creation des infomations

        if (ascendingElevation) {
            this._addElevationPathInformationsItem("Dénivelé positif : " + this._data.ascendingElevation.toLocaleString() + " m");
        }

        if (descendingElevation) {
            this._addElevationPathInformationsItem("Dénivelé négatif : " + this._data.descendingElevation.toLocaleString() + " m");
        }

        if (meanSlope) {
            this._addElevationPathInformationsItem("Pente moyenne : " + this._data.meanSlope.toLocaleString() + " %");
        }

        if (greaterSlope) {
            this._addElevationPathInformationsItem("Plus forte pente : " + this._data.greaterSlope.toLocaleString() + " %");
        }

        // show des informations !
        if (div.className === "GPelevationPathInformationsContainerVisible") {
            clearTimeout(this._timerHdlr);
            div.className = "GPelevationPathInformationsContainerHidden";
        } else {
            div.className = "GPelevationPathInformationsContainerVisible";
        }

        // hidden des informations !
        this._timerHdlr = setTimeout(function () {
            div.className = "GPelevationPathInformationsContainerHidden";
        }, 4000);
    },

    // ################################################################### //
    // ################### Map interactions management ################### //
    // ################################################################### //

    /**
     * this method is called by this.onShowElevationPathClick,
     * and calls method corresponding to current delimitation, if widget is not collapsed.
     *
     * @param {Object} map - control map.
     * @private
     */
    _activateMapInteraction : function (map) {
        logger.info("_activateMapInteraction()");

        // Creation de la couche vectorielle sur laquelle on va dessiner
        if (this._featuresLayer === null) {
            this._featuresLayer = new L.FeatureGroup();
            map.addLayer(this._featuresLayer);

            var self = this;
            /* evenements : on desactive le menu systeme pour la saisie */
            map.on("contextmenu", function () {});

            /* evenement sur la carte lors d'une saisie,
            on y ajoute le layer, et on y stocke les coordonnées */
            map.on("draw:created", function (e) {
                logger.trace("draw:created");

                self._currentIdLayer = L.Util.stamp(e.layer);

                self._getFeatureGeometry(e.layer);
                self._addFeatureLayer(e.layer);
            });

            /* evenements */
            map.on("draw:drawstart", function () {
                logger.trace("draw:drawstart");
                self._removeFeatureLayer(self._lastIdLayer);
                self._lastIdLayer = self._currentIdLayer;
            });

            /* evenements */
            map.on("draw:drawstop", function () {
                logger.trace("draw:drawstop");
                if (typeof self.options.elevationPathOptions.onSuccess === "undefined" && self.options.displayProfileOptions.target === null) {
                    self._pictoContainer.style.display = "none";
                    self._panelContainer.style.display = "block";
                }
                self._altiRequest();
            });
        }

        this._activatePolyLineInteraction(map);
    },

    /**
     * remove draw interaction from map (if exists)
     *
     * @param {Object} map - control map.
     * @private
     */
    _removeMapInteraction : function (map) {
        if (!map) {
            return;
        }

        if (this._featuresLayer !== null) {
            map.off("draw:created");
            map.off("draw:drawstart");
            map.off("draw:drawstop");
            map.removeLayer(this._featuresLayer);
            this._featuresLayer = null;
        }

        this._lastIdLayer = this._currentIdLayer = 0;

        // FIXME delete this._currentFeature ?
        if (this._currentFeature) {
            this._currentFeature.disable();
        }
    },

    /**
     * this method is called by this._activateMapInteraction,
     * and creates map polyline drawing interaction.
     *
     * @param {Object} map - control map.
     * @private
     */
    _activatePolyLineInteraction : function (map) {
        if (this._currentFeature) {
            this._currentFeature.disable();
        }

        // liste des options par defaut
        // cf. https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
        // var polylineOptions = {
        //     allowIntersection : true,
        //     repeatMode : false,
        //     drawError : {
        //         color : "#b00b00",
        //         timeout : 2500
        //     },
        //     icon : new L.DivIcon({
        //         iconSize : new L.Point(8, 8),
        //         className : 'leaflet-div-icon leaflet-editing-icon'
        //     }),
        //     touchIcon : new L.DivIcon({
        //         iconSize : new L.Point(20, 20),
        //         className : 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
        //     }),
        //     guidelineDistance : 20,
        //     maxGuideLineLength : 4000,
        //     shapeOptions : {
        //         stroke : true,
        //         color : '#f06eaa',
        //         weight : 4,
        //         opacity : 0.5,
        //         fill : false,
        //         clickable : true
        //     },
        //     metric : true, // Whether to use the metric measurement system or imperial
        //     feet : true, // When not metric, to use feet instead of yards for display.
        //     nautic : false, // When not metric, not feet use nautic mile for display
        //     showLength : true, // Whether to display distance in the tooltip
        //     zIndexOffset : 2000 // This should be > than the highest z-index any map layersallowIntersection : true,
        // };

        var styles = this.options.stylesOptions || {};
        var _shapeOptions = (Object.keys(styles).length !== 0) ? styles : {
            stroke : true,
            color : "#C77A04",
            weight : 4,
            opacity : 0.5,
            fill : false
        };

        this._currentFeature = new L.Draw.Polyline(map, {
            shapeOptions : _shapeOptions
        });
        this._currentFeature.enable();
    },

    /**
     * set current position of feature
     *
     * @param {Object} layer - layer
     * @private
     */
    _getFeatureGeometry : function (layer) {
        // on transmet toujours des coordonnées au service en EPSG:4326
        logger.log(layer.getLatLngs());

        if (this._geometry !== null) {
            this._geometry = null;
        }

        this._geometry = [];
        this._distance = 0;

        var geometry = layer.getLatLngs();
        for (var i = 0; i < geometry.length; i++) {
            // on transmet au service des coordonnées en EPSG:4326
            var LatLngI = geometry[i];
            var LatLngJ = geometry[i + 1];
            this._geometry.push({
                lon : LatLngI.lng,
                lat : LatLngI.lat
            });
            // on calcul la distance du segment
            if (LatLngJ) {
                this._distance += LatLngI.distanceTo(LatLngJ);
            }
        }

        logger.log("Geometry", this._geometry);
        logger.log("Distance", this._distance);
    },

    /**
     * set current layer of feature
     *
     * @param {Object} layer - layer
     * @private
     */
    _addFeatureLayer : function (layer) {
        if (!this._featuresLayer) {
            return;
        }
        this._featuresLayer.addLayer(layer);
    },

    /**
     * remove layer feature from group
     *
     * @param {Integer} id - id
     * @private
     */
    _removeFeatureLayer : function (id) {
        if (!this._featuresLayer) {
            return;
        }

        if (id === 0) {
            return;
        }

        if (!id) {
            this._featuresLayer.clearLayers();
        } else {
            this._featuresLayer.removeLayer(id);
        }
    },

    // ################################################################### //
    // ############################ Alti request ######################### //
    // ################################################################### //

    /**
     * this methode is called by this. method,
     * it generates and sends alti request, then displays results
     *
     * @private
     */
    _altiRequest : function () {
        logger.log("_altiRequest");

        // les coordonnées sont obligatoires
        if (!this._geometry) {
            logger.log("missing position");
            return;
        }

        // oups, aucun droits !
        if (this._noRightManagement) {
            return;
        }

        // on construit les options pour la requête
        var options = {};

        // on surcharge avec les options de l'utilisateur
        L.Util.extend(options, this.options.elevationPathOptions);

        // au cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
        L.Util.extend(options, {
            apiKey : options.apiKey || this.options.apiKey
        });

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        L.Util.extend(options, {
            ssl : this.options.ssl
        });

        // le sampling est soit defini par l'utilisateur (opts),
        // ou soit calculé dynamiquement...
        var _sampling = options.sampling;
        if (!_sampling) {
            // computing sampling
            var _computeSampling;
            var _length = this._currentFeature._measurementRunningTotal; // FIXME !!!
            logger.trace("length", _length);
            var p = Math.floor(_length) / 5; // en mètre sur un pas moyen de 5m !
            if (p >= 200) {
                _computeSampling = 200;
            } else {
                _computeSampling = Math.floor(p);
            }
            _sampling = _computeSampling;
        }

        // on y ajoute les callbacks ainsi que les options par defaut
        var self = this;
        L.Util.extend(options, {

            /** sampling à 200 (iso portail) */
            sampling : _sampling,

            // callback onSuccess
            onSuccess : this.options.elevationPathOptions.onSuccess || function (result) {
                logger.log(result);
                if (result) {
                    if (self.options.displayProfileOptions.target !== null) {
                        self._pictoContainer.style.display = "block";
                        self._panelContainer.style.display = "block";
                    }
                    self._displayProfil(result.elevations);
                    self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
                    self._waiting = false;
                }
            },

            // callback onFailure
            onFailure : this.options.elevationPathOptions.onFailure || function (error) {
                logger.log(error.message);
                self._pictoContainer.style.display = "block";
                self._panelContainer.style.display = "none";
                self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
                self._waiting = false;
                self._clear();
            }
        });

        // et enfin, la geometrie
        var positions = this._geometry;
        L.Util.extend(options, {
            positions : positions
        });

        logger.log(options);

        // mise en place de la patience
        this._waitingContainer.className = "GPelevationPathCalcWaitingContainerVisible";

        // Request altitude service
        Gp.Services.getAltitude(options);
    },

    // ################################################################### //
    // ########################## Profil display ######################### //
    // ################################################################### //

    /**
     * this method computes results elevations (Z and distance)
     *
     * @param {Array} elevations - array of elevation
     * @return {Array} elevations
     * @private
     */
    _computeElevationMeasure : function (elevations) {
        // Returns the distance from c1 to c2 using the haversine formula
        var _haversineDistance = function (c1, c2) {
            var lat1 = PositionFormater.decimalToRadian(c1[1]);
            var lat2 = PositionFormater.decimalToRadian(c2[1]);
            var deltaLatBy2 = (lat2 - lat1) / 2;
            var deltaLonBy2 = PositionFormater.decimalToRadian(c2[0] - c1[0]) / 2;
            var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) +
                Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) *
                Math.cos(lat1) * Math.cos(lat2);
            return 2 * 6378137 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        };

        var _data = elevations;

        var _unit = "m";

        var _sketchPoints = this._geometry;
        // section actuelle du sketch sur laquelle on est
        var _currentSection = 0;
        // longueur cumulée des sections précédentes
        var _previousSectionsLength = 0;
        var _nextSectionBegining = _sketchPoints[1];

        // Calcul de la distance au départ pour chaque point + arrondi des lat/lon
        _data[0].dist = 0;
        _data[0].slope = 0;
        _data[0].lat = Math.round(_data[0].lat * 10000) / 10000;
        _data[0].lon = Math.round(_data[0].lon * 10000) / 10000;

        var _distanceMinus = 0;
        var _distancePlus = 0;
        var _ascendingElevation = 0;
        var _descendingElevation = 0;
        var _distance = 0;
        var _slopes = 0;

        var distances = [];

        for (var i = 1; i < _data.length; i++) {
            var a = [_data[i].lon, _data[i].lat];
            var distanceToStart = _previousSectionsLength + _haversineDistance(a, [_sketchPoints[_currentSection].lon, _sketchPoints[_currentSection].lat]);
            var dist = distanceToStart - _distance;

            // Changement de section
            if (a[0].toFixed(8) === _nextSectionBegining.lon.toFixed(8) && a[1].toFixed(8) === _nextSectionBegining.lat.toFixed(8)) {
                _currentSection++;
                _previousSectionsLength = distanceToStart;
                // Pas de next section si on est sur le dernier point
                if (i !== _data.length - 1) {
                    _nextSectionBegining = _sketchPoints[_currentSection + 1];
                }
            }

            var za = _data[i].z;
            var zb = _data[i - 1].z;
            if (za < 0) {
                za = 0;
            }
            if (zb < 0) {
                zb = 0;
            }
            var slope = za - zb;
            if (slope < 0) {
                _distanceMinus += dist;
                _descendingElevation += slope;
            } else if (slope > 0) {
                _distancePlus += dist;
                _ascendingElevation += slope;
            }
            _distance = distanceToStart;
            _data[i].dist = distanceToStart;

            distances.push(distanceToStart);

            _slopes += (slope) ? Math.abs(Math.round(slope / dist * 100)) : 0;
            _data[i].slope = (slope) ? Math.abs(Math.round(slope / dist * 100)) : 0;

            // EVOL ?
            // cf. gradiant
            // http://www.color-hex.com/color/00b798
            var value = _data[i].slope;
            if (value > 15 && value < 30) {
                _data[i].color = "#005b4c";
            } else if (value > 30 && value < 45) {
                _data[i].color = "#00362d";
            } else if (value > 45) {
                _data[i].color = "#00120f";
            } else {
                _data[i].color = "#00B798";
            }

            _data[i].lat = Math.round(_data[i].lat * 10000) / 10000;
            _data[i].lon = Math.round(_data[i].lon * 10000) / 10000;
        }

        // check distance totale
        logger.trace("List Distances", distances);

        // Correction des altitudes aberrantes + arrondi des calculs de distance + ...
        var _altMin = _data[0].z;
        var _altMax = _data[0].z;
        var _greaterSlope = _data[0].slope;

        for (var ji = 0; ji < _data.length; ji++) {
            var d = _data[ji];
            if (d.z < -100) {
                d.z = 0;
            }
            if (d.z > _altMax) {
                _altMax = d.z;
            }
            if (d.z < _altMin) {
                _altMin = d.z;
            }

            if (d.slope > _greaterSlope) {
                _greaterSlope = d.slope;
            }
        }
        return {
            greaterSlope : _greaterSlope, // pente max
            meanSlope : Math.round(_slopes / _data.length), // pente moyenne
            distancePlus : _distancePlus, // distance cumulée positive
            distanceMinus : _distanceMinus, // distance cumulée négative
            ascendingElevation : _ascendingElevation, // dénivelé cumulée positive
            descendingElevation : _descendingElevation, // dénivelé cumulée négative
            altMin : _altMin.toLocaleString(), // altitude min TODO: inutile ?
            altMax : _altMax.toLocaleString(), // altitude max TODO: inutile ?
            distance : this._distance, // distance totale
            unit : _unit, // unité des mesures de distance
            points : _data
        };
    },

    /**
     * this method is called by this. (in case of success)
     * and display results
     *
     * @param {Array} elevations - array of elevation
     * @private
     */
    _displayProfil : function (elevations) {
        // on reactive le menu systeme en fin de saisie !
        var map = this._map;
        map.off("contextmenu");

        // data
        if (this._data) {
            this._data = {};
        }

        // sauvegarde des données
        var data = this._data = this._computeElevationMeasure(elevations);

        // container
        var container = this.options.displayProfileOptions.target;
        if (container) {
            container.appendChild(this._panelContainer);
        }
        container = this._profilContainer;

        // TODO contexte ?
        var context = this;

        var _profileOpts = this.options.displayProfileOptions;

        // fonction
        var displayFunction = _profileOpts.apply;

        // Calcul du profil
        if (typeof AmCharts !== "undefined" && typeof d3 !== "undefined") {
            logger.trace("Aucune lib. n'est presente !");
        }

        // execution...
        displayFunction.call(this, data, container, context);

        // affichage des informations du profil ?
        var element = L.DomUtil.get("GPelevationPathPanelInfo-" + this._uid);
        if (_profileOpts.greaterSlope ||
            _profileOpts.meanSlope ||
            _profileOpts.ascendingElevation ||
            _profileOpts.descendingElevation) {
            // on affiche les informations
            element.style.display = "block";
        }
    },

    // ################################################################### //
    // ################################ clean ############################ //
    // ################################################################### //

    /**
     * this method clears all data
     *
     * @private
     */
    _clear : function () {
        this._geometry = null;
        this._profile = null;

        // on vide le container
        if (this._profilContainer) {
            while (this._profilContainer.firstChild) {
                this._profilContainer.removeChild(this._profilContainer.firstChild);
            }
        }

        // on supprime le marker
        var map = this._map;
        if (this._marker) {
            map.removeLayer(this._marker);
            this._marker = null;
        }
    }
});

/**
 * create Profile Marker
 *
 * @param {Object} context - context
 * @param {Object} data - data
 */
ElevationPath.__createProfileMarker = function (context, data) {
    logger.log("__createProfileMarker");

    var self = context;
    var map = self._map;

    // var _srs    = L.CRS.EPSG4326;
    // var _pointA = _srs.latLngToPoint(L.latLng(self._geometry[0].lat, self._geometry[0].lon));
    // var _pointB = _srs.latLngToPoint(L.latLng(self._geometry[self._geometry.length - 1].lat, self._geometry[self._geometry.length - 1].lon));
    // var _point  = L.LineUtil.closestPointOnSegment(_srs.latLngToPoint(L.latLng(data.lat, data.lon)), _pointA, _pointB );

    // creation d"un marker
    self._marker = L.marker(L.latLng(data), {
        icon : new IconDefault("orange"),
        draggable : false,
        clickable : false,
        zIndexOffset : 1000
    });

    self._marker.addTo(map);
};

/**
 * update Profile Marker
 *
 * @param {Object} context - context
 * @param {Object} data - data
 */
ElevationPath.__updateProfileMarker = function (context, data) {
    logger.log("__updateProfileMarker");

    var self = context;
    var map = self._map;

    // var _srs    = L.CRS.EPSG4326;
    // var _pointA = _srs.latLngToPoint(L.latLng(self._geometry[0].lat, self._geometry[0].lon));
    // var _pointB = _srs.latLngToPoint(L.latLng(self._geometry[self._geometry.length - 1].lat, self._geometry[self._geometry.length - 1].lon));
    // var _point  = L.LineUtil.closestPointOnSegment( _srs.latLngToPoint(L.latLng(data.lat, data.lon)), _pointA, _pointB );

    if (self._marker) {
        self._marker.setLatLng(L.latLng(data));
        self._marker.update();
    } else {
        // creation d"un marker
        self._marker = L.marker(L.latLng(data), {
            icon : new IconDefault("orange"),
            draggable : false,
            clickable : false,
            zIndexOffset : 1000
        });

        self._marker.addTo(map);
    }
};

/**
 * remove Profile Marker
 *
 * @param {Object} context - context
 */
ElevationPath.__removeProfileMarker = function (context) {
    logger.log("__removeProfileMarker");

    var self = context;
    var map = self._map;

    if (self._marker) {
        map.removeLayer(self._marker);
        self._marker = null;
    }
};

/**
 * custom operation into raw profil...
 * TODO
 */
ElevationPath.__customRawProfileOperation = function () {
    logger.log("__customRawProfileOperation");
};

/**
 * custom operation into raw profil...
 * TODO
 *
 * @param {Object} context - context
 * @param {Object} e - event
 */
ElevationPath.__customRawProfileMouseOverEvent = function (context, e) {
    logger.log("__customRawProfileMouseOverEvent", context, e);
};

/**
 * Display Profile function used by default : no additonal framework needed.
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */
ElevationPath.DISPLAY_PROFILE_BY_DEFAULT = function (data, container, context) {
    logger.trace("ElevationPath.DISPLAY_PROFILE_BY_DEFAULT");

    var profile = ProfileElevationPathDOM.displayProfileByDefault(data, container, context, ElevationPath);
    // on sauvegarde le profil du container dans l'objet
    if (profile) {
        this._profile = profile;
    }
};

/**
 * Display Profile without graphical rendering (raw service response)
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */
ElevationPath.DISPLAY_PROFILE_RAW = function (data, container, context) {
    logger.trace("ElevationPath.DISPLAY_PROFILE_RAW");

    var profile = ProfileElevationPathDOM.displayProfileRaw(data, container, context, ElevationPath);
    // on sauvegarde le profil du container dans l'objet
    if (profile) {
        this._profile = profile;
    }
};

/**
 * Display Profile using D3 javascript framework. This method needs D3 libraries to be loaded.
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */
ElevationPath.DISPLAY_PROFILE_LIB_D3 = function (data, container, context) {
    logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_D3");

    if (typeof d3 === "undefined") {
        logger.log("Lib. D3 is not loaded !");
        return;
    }

    var profile = ProfileElevationPathDOM.displayProfileLibD3(data, container, context, ElevationPath);
    // on sauvegarde le profil du container dans l'objet
    if (profile) {
        this._profile = profile;
    }
};

/**
 * Display Profile using Amcharts framework. This method needs AmCharts libraries to be loaded.
 *
 * @static
 * @param {Object} data - elevations values for profile
 * @param {HTMLElement} container - html container where to display profile
 * @param {Object} context - this control object
 */
ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS = function (data, container, context) {
    logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS");

    // Calcul du profile
    if (typeof AmCharts === "undefined") {
        logger.log("Lib. AmCharts is not loaded !");
        return;
    }

    var profile = ProfileElevationPathDOM.displayProfileLibAmCharts(data, container, context, ElevationPath);
    // on sauvegarde le profil du container dans l'objet
    if (profile) {
        this._profile = profile;
    }
};

export default ElevationPath;
