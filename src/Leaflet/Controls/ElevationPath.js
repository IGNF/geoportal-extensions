/* globals AmCharts, d3 */
define([
    "leaflet",
    "leaflet-draw",
    "woodman",
    "gp",
    "Common/Utils/CheckRightManagement",
    "Common/Utils/SelectorID",
    "Leaflet/Controls/LocationSelector",
    "Leaflet/Controls/Utils/PositionFormater",
    "Leaflet/Controls/Utils/IconDefault",
    "Common/Controls/ElevationPathDOM"
], function (
    L,
    Draw, // loading plugin leaflet-draw
    woodman,
    Gp,
    RightManagement,
    ID,
    LocationSelector,
    PositionFormater,
    IconDefault,
    ElevationPathDOM
) {

    "use strict";

    var logger = woodman.getLogger("ElevationPath");

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
    var ElevationPath = L.Control.extend( /** @lends L.geoportalControl.ElevationPath.prototype */ {

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
                apply : null,
                target : null
            }
        },

        /**
        * constructor
        *
        * @private
        * @param {Object} options - ElevationPath control options
        * @param {Sting}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
        * @param {Boolean} [options.active] - Specify if widget has to be actived to drawing (true) or not (false) on map loading. Default is false.
        * @param {Object} [options.elevationPathOptions = {}] - elevation service options. See {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getAltitude Gp.Services.getAltitude()} to know all elevation options
        * @param {Object} [options.displayProfileOptions = {}] - profile options.
        * @param {Function} [options.displayProfileOptions.apply] - function to display profil panel.
        * @param {Object} [options.displayProfileOptions.target] - container DOM for the profil panel.
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
        * @private
        */
        onAdd : function (map) {

            // initialisation du DOM du composant
            var container = this._container =  this._initLayout();

            if ( map ) {
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

            if (! rightManagement) {
                this._noRightManagement = true;
            }

            // on recupère les informations utiles
            // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
            // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
            // été renseignée.
            if (! this.options.apiKey) {
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
            var profil = this.options.displayProfileOptions || {};
            if ( typeof profil === "undefined" || Object.keys(profil).length === 0 ) {
                this.options.displayProfileOptions = {
                    apply : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT,
                    target : null
                };

            } else {
                this.options.displayProfileOptions = {};
            }

            // gestion de la fonction du profil
            var displayFunction = profil.apply || this.options.displayProfileOptions.apply;
            this.options.displayProfileOptions.apply =  ( typeof displayFunction === "function" ) ?
                displayFunction : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT;

            // gestion du container du profil
            var displayContainer = profil.target || this.options.displayProfileOptions.target;
            this.options.displayProfileOptions.target =  ( typeof displayContainer === "undefined" ) ?
                null : displayContainer;

        },

        // ################################################################### //
        // ########################### init dom ############################## //
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
            if (! this._reducePanel) {
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
            if ( this._featuresLayer === null ) {

                this._featuresLayer = new L.FeatureGroup();
                map.addLayer(this._featuresLayer);

                var self = this;
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
                    if ( typeof self.options.elevationPathOptions.onSuccess === "undefined" && self.options.displayProfileOptions.target === null ) {
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

            if ( this._featuresLayer !== null ) {
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
            //     zIndexOffset : 2000 // This should be > than the highest z-index any map layersallowIntersection: true,
            // };

            var styles = this.options.stylesOptions || {};
            var _shapeOptions = (Object.keys(styles).length !== 0) ?  styles : {
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
        * @private
        */
        _getFeatureGeometry : function (layer) {

            // on transmet toujours des coordonnées au service en EPSG:4326
            logger.log(layer.getLatLngs());

            if (this._geometry !== null) {
                this._geometry = null;
            }

            this._geometry = [];

            var geometry = layer.getLatLngs();
            for (var i = 0; i < geometry.length; i++) {
                // on transmet au service des coordonnées en EPSG:4326
                var LatLng = geometry[i];
                this._geometry.push({
                    lon : LatLng.lng,
                    lat : LatLng.lat
                });
            }

            logger.log(this._geometry);
        },

        /**
        * set current layer of feature
        *
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
            if ( !this._geometry ) {
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

            // le sampling est soit defini par l'utilisateur (opts),
            // ou soit calculé dynamiquement...
            var _sampling = options.sampling;
            if (!_sampling) {

                // computing sampling
                var _computeSampling = 50;
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

                /** callback onSuccess */
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

                /** callback onFailure */
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

            /** Returns the distance from c1 to c2 using the haversine formula */
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

            // Calcul de la distance au départ pour chaque point + arrondi des lat/lon
            elevations[0].dist = 0;
            var distance = 0;
            for (var i = 1; i < elevations.length; i++) {
                distance += ( _haversineDistance([elevations[i].lon, elevations[i].lat], [elevations[i - 1].lon, elevations[i - 1].lat]) ) / 1000;
                elevations[i].dist = distance;
                elevations[i].lat = Math.round(elevations[i].lat * 10000) / 10000;
                elevations[i].lon = Math.round(elevations[i].lon * 10000) / 10000;
            }

            // Valeur du coeff d'arrondi des distances en fonction de la distance totale
            var coeffArrond = 100;
            if (distance > 100) {
                coeffArrond = 1;
            } else if (distance > 10) {
                coeffArrond = 10;
            }

            // Correction des altitudes aberrantes + arrondi des calculs de distance
            for (var j = 0 ; j < elevations.length; j++) {
                var data = elevations[j];
                if (data.z < 0) {
                    data.z = 0;
                }
                data.dist = Math.round(data.dist * coeffArrond) / coeffArrond;
            }

            return elevations;
        },

        /**
        * this method is called by this. (in case of success)
        * and display results
        *
        * @param {Array} elevations - array of elevation
        * @private
        */
        _displayProfil : function (elevations) {

            // data
            var data = this._computeElevationMeasure(elevations);

            // container
            var container = this.options.displayProfileOptions.target;
            if (container) {
                container.appendChild(this._panelContainer);
            }
            container = this._profilContainer;

            // TODO contexte ?
            var context = this;

            // fonction
            var displayFunction = this.options.displayProfileOptions.apply;

            // Calcul du profil
            if ( typeof AmCharts !== "undefined" && typeof d3 !== "undefined") {
                logger.trace("Aucune lib. n'est presente !");
            }

            // execution...
            displayFunction.call(this, data, container, context);

        },

        /**
        * this method is called by this.
        * and activate event on map and profil
        *
        * @private
        */
        _activateProfilEvent : function (position) {

            if (this._profile === null) {
                return;
            }

            var map  = this._map;
            var self = this;

            // suppression de l'ancien d'un marker
            if (self._marker) {
                map.removeLayer(self._marker);
                self._marker = null;
            }

            // creation d'un marker
            self._marker = L.marker(L.latLng(position.lat, position.lon), {
                icon : new IconDefault("orange"),
                draggable : false,
                clickable : false,
                zIndexOffset : 1000
            });
            self._marker.addTo(map);

            /**
            * event sur le survol du graphe qui permet de mettre à jour la position du marker
            *
            * @param {Object} e - event
            * @private
            */
            var changed = function (e) {
                logger.trace(e);
                var obj = e.chart.dataProvider[e.index];

                var srs = L.CRS.EPSG4326;
                var _pointA = srs.latLngToPoint(L.latLng(self._geometry[0].lat, self._geometry[0].lon));
                var _pointB = srs.latLngToPoint(L.latLng(self._geometry[self._geometry.length - 1].lat, self._geometry[self._geometry.length - 1].lon));
                var _point = L.LineUtil.closestPointOnSegment( srs.latLngToPoint(L.latLng(obj.lat, obj.lon)), _pointA, _pointB );
                self._marker.setLatLng( srs.pointToLatLng(_point));
                // self._marker.setLatLng( L.latLng(obj.lat, obj.lon));
                self._marker.update();

            };

            // FIXME remove event !?
            self._profile.removeListener("changed", changed);
            self._profile.addListener("changed", changed);

            /**
            * event sur le survol du graphe qui permet de mettre à jour la position du marker
            *
            * @param {Object} e - event
            * @private
            */
            // var mouseover = function (e) {
            //     logger.trace(e);
            //     if (self._profile === null) {
            //         return;
            //     }
            //
            //     // creation d'un marker
            //     self._marker = L.marker(L.latLng(position.lat, position.lon), {
            //         icon : new IconDefault("orange"),
            //         draggable : false,
            //         clickable : false,
            //         zIndexOffset : 1000
            //     });
            //     self._marker.addTo(map);
            // };

            /**
            * event sur la sortie du graphe qui permet de mettre à jour la position du marker
            *
            * @param {Object} e - event
            * @private
            */
            // var mouseout = function (e) {
            //     logger.trace(e);
            //     if (self._profile === null) {
            //         return;
            //     }
            //
            //     // suppression de l'ancien d'un marker
            //     if (self._marker) {
            //         map.removeLayer(self._marker);
            //         self._marker = null;
            //     }
            // };

            /**
            * event sur le deplacement sur le graphe qui permet de mettre à jour la position du marker
            *
            * @param {Object} e - event
            * @private
            */
            // var mousemove = function (e) {
            //     logger.trace(e);
            //     if (self._profile === null) {
            //         return;
            //     }
            //
            //     // suppression de l'ancien d'un marker
            //     if (self._marker) {
            //         self._marker.setLatLng(L.latLng(e.lat, e.lon));
            //         self._marker.update();
            //     }
            // };

            // FIXME event !?
            // this._profilContainer.removeEventListener("mouseover", mouseover);
            // this._profilContainer.addEventListener("mouseover", mouseover);
            // this._profilContainer.removeEventListener("mouseout", mouseout);
            // this._profilContainer.addEventListener("mouseout", mouseout);
            // this._profilContainer.removeEventListener("mousemove", mousemove);
            // this._profilContainer.addEventListener("mousemove", mousemove);
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
    * Display Profile function used by default : no additonal framework needed.
    *
    * @static
    * @param {Object} data - elevations values for profile
    * @param {HTMLElement} container - html container where to display profile
    * @param {Object} context - this control object
    */
    ElevationPath.DISPLAY_PROFILE_BY_DEFAULT = function (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_BY_DEFAULT");

        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        if (!data) {
            return;
        }

        var sortedElev = JSON.parse(JSON.stringify(data)) ;
        sortedElev.sort(function (e1, e2) {
            return e1.z - e2.z ;
        }) ;

        var minZ = sortedElev[0].z ;
        var maxZ = sortedElev[sortedElev.length - 1].z ;
        var diff = maxZ - minZ ;
        var distMax = data[data.length - 1].dist; // km !
        // var distMin = 0;
        var barwidth = 100 / data.length ;

        var self = this;
        var map  = context._map;

        var div = document.createElement("div");
        div.id  = "profileElevationByDefault";
        div.addEventListener("mouseover", function (e) {

            var _lon = parseFloat(e.target.dataset["lon"]);
            var _lat = parseFloat(e.target.dataset["lat"]);

            if (_lon && _lat) {

                var srs = L.CRS.EPSG4326;
                var _pointA = srs.latLngToPoint(L.latLng(self._geometry[0].lat, self._geometry[0].lon));
                var _pointB = srs.latLngToPoint(L.latLng(self._geometry[self._geometry.length - 1].lat, self._geometry[self._geometry.length - 1].lon));
                var _point = L.LineUtil.closestPointOnSegment( srs.latLngToPoint(L.latLng(_lat, _lon)), _pointA, _pointB );
                
                // creation d"un marker
                self._marker = L.marker(srs.pointToLatLng(_point), {
                    icon : new IconDefault("orange"),
                    draggable : false,
                    clickable : false,
                    zIndexOffset : 1000
                });

                self._marker.addTo(map);
            }
        });
        div.addEventListener("mousemove", function () {});
        div.addEventListener("mouseout", function () {
            // suppression de l'ancien d'un marker
            if (self._marker) {
                map.removeLayer(self._marker);
                self._marker = null;
            }
        });
        container.appendChild(div);

        var divBox = document.createElement("div");
        divBox.className = "profile-box";

        var divZ = document.createElement("div");
        divZ.className = "profile-z-vertical";
        var ulZ  = document.createElement("ul");
        var liZmin = document.createElement("li");
        liZmin.setAttribute("class", "profile-min-z");
        liZmin.innerHTML = minZ + " m";
        var liZmax = document.createElement("li");
        liZmax.setAttribute("class", "profile-max-z");
        liZmax.innerHTML = maxZ + " m";

        // var divUnit = document.createElement("div");
        // divUnit.className = "profile-unit";
        // divUnit.innerHTML = "m";

        ulZ.appendChild(liZmax);
        ulZ.appendChild(liZmin);
        divZ.appendChild(ulZ);
        // divZ.appendChild(divUnit);
        divBox.appendChild(divZ);

        var divData = document.createElement("div");
        divData.className = "profile-content";

        var ulData  = document.createElement("ul");
        ulData.id   = "profile-data";
        ulData.className = "profile-z-axis profile-x-axis";
        divData.appendChild(ulData);

        for (var i = 0 ; i < data.length ; i++) {
            var d = data[i] ;
            var li = document.createElement("li") ;
            li.setAttribute("data-z",d.z) ;
            li.setAttribute("data-lon",d.lon) ;
            li.setAttribute("data-lat",d.lat) ;
            li.setAttribute("data-dist",d.dist) ;

            var pct = Math.floor((d.z - minZ) * 100 / diff) ;
            li.setAttribute("class", "percent v" + pct) ;
            li.title = "altitude : " + d.z + "m" ;
            li.setAttribute("style", "width: " + barwidth + "%") ;
            ulData.appendChild(li) ;
        }

        divBox.appendChild(divData);
        div.appendChild(divBox);

        var divX = document.createElement("div");
        divX.className = "profile-x-horizontal";
        var ulX  = document.createElement("ul");
        var liXmin = document.createElement("li");
        liXmin.setAttribute("class", "profile-min-x");
        liXmin.innerHTML = "";
        var liXmax = document.createElement("li");
        liXmax.setAttribute("class", "profile-max-x");
        liXmax.innerHTML = distMax + " km";
        ulX.appendChild(liXmin);
        ulX.appendChild(liXmax);
        divX.appendChild(ulX);
        div.appendChild(divX);

        context._profile = container;
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

        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        // TODO CSS externe
        var div  = document.createElement("textarea");
        div.id = "profilElevationResults";
        div.rows = 10;
        div.cols = 50;
        div.style.width = "100%";
        div.innerHTML = JSON.stringify(data, undefined, 4);
        container.appendChild(div);

        context._profile = container;
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

        // Calcul du profile
        if ( typeof d3 === "undefined" ) {
            console.log("Lib. D3 is not loaded !");
            return;
        }

        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        var margin = {
            top : 20,
            right : 20,
            bottom : 30,
            left : 40
        };

        var width = container.clientWidth - margin.left - margin.right;
        var height = container.clientHeight - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(5);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function (d) {
                return x(d.dist);
            })
            .y(function (d) {
                return y(d.z);
            });

        var area = d3.svg.area()
            .interpolate("basis")
            .x(function (d) {
                return x(d.dist);
            })
            .y0(height)
            .y1(function (d) {
                return y(d.z);
            });

        var svg = d3.select(container)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xDomain = d3.extent(data, function (d) {
            return d.dist;
        });
        x.domain(xDomain);

        var yDomain = [
            0,
            d3.max(data, function (d) {
                return d.z;
            })
        ];
        y.domain(yDomain);

        svg.append("path")
            .datum(data)
            .attr("class", "area-d3")
            .attr("d", area);

        svg.append("g")
            .attr("class", "x axis-d3")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("y", -15)
            .attr("dy", ".71em")
            .attr("x", width)
            .text("Distance (km)");

        svg.append("g")
            .attr("class", "y axis-d3")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .text("Altitude (m)");

        svg.append("g")
            .attr("class", "grid-d3 vertical")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis
                .orient("bottom")
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );

        svg.append("g")
            .attr("class", "grid-d3 horizontal")
            .call(yAxis
                .orient("left")
                .tickSize(-width, 0, 0)
                .tickFormat("")
            );

        svg.append("path")
            .datum(data)
            .attr("class", "line-d3")
            .attr("d", line);

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x(d.dist);
            })
            .attr("cy", function (d) {
                return y(d.z);
            })
            .attr("r", 0)
            .attr("class", "circle-d3");

        var focus = svg.append("g").style("display", "none");

        focus.append("line")
            .attr("id", "focusLineX")
            .attr("class", "focusLine-d3");
        focus.append("line")
            .attr("id", "focusLineY")
            .attr("class", "focusLine-d3");
        focus.append("circle")
            .attr("id", "focusCircle")
            .attr("r", 4)
            .attr("class", "circle-d3 focusCircle-d3");

        var div = d3.select(container).append("div")
            .attr("class", "tooltip-d3")
            .style("opacity", 0);

        var bisectDist = d3.bisector(function (d) {
            return d.dist;
        }).left;

        var self = this;
        var map  = context._map;

        svg.append("rect")
            .attr("class", "overlay-d3")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function () {
                focus.style("display", null);
                // creation d"un marker
                self._marker = L.marker(L.latLng(data[0].lat, data[0].lon), {
                    icon : new IconDefault("orange"),
                    draggable : false,
                    clickable : false,
                    zIndexOffset : 1000
                });

                self._marker.addTo(map);
            })
            .on("mouseout", function () {
                focus.style("display", "none");
                // suppression de l'ancien d'un marker
                if (self._marker) {
                    map.removeLayer(self._marker);
                    self._marker = null;
                }
                // tooltips
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", function () {

                var m = d3.mouse(this);
                var distance = x.invert(m[0]);
                var i = bisectDist(data, distance);

                var d0 = data[i - 1];
                var d1 = data[i];
                var d  = distance - d0[0] > d1[0] - distance ? d1 : d0;

                var xc = x(d.dist);
                var yc = y(d.z);

                focus.select("#focusCircle")
                    .attr("cx", xc)
                    .attr("cy", yc);
                focus.select("#focusLineX")
                    .attr("x1", xc).attr("y1", y(yDomain[0]))
                    .attr("x2", xc).attr("y2", y(yDomain[1]));
                focus.select("#focusLineY")
                    .attr("x1", x(xDomain[0])).attr("y1", yc)
                    .attr("x2", x(xDomain[1])).attr("y2", yc);

                // mise à jour du marker
                var srs = L.CRS.EPSG4326;
                var _pointA = srs.latLngToPoint(L.latLng(self._geometry[0].lat, self._geometry[0].lon));
                var _pointB = srs.latLngToPoint(L.latLng(self._geometry[self._geometry.length - 1].lat, self._geometry[self._geometry.length - 1].lon));
                var _point = L.LineUtil.closestPointOnSegment( srs.latLngToPoint(L.latLng(d.lat, d.lon)), _pointA, _pointB );
                self._marker.setLatLng( srs.pointToLatLng(_point));
                self._marker.update();

                // tooltips
                div.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                div	.html(
                        "Alt : " + d.z + " m <br/>" +
                        "Lon : " + d.lon + " <br/>" +
                        "Lat : " + d.lat
                    )
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            }
        );

        context._profile = d3.selectAll("rect.overlay")[0][0];
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
        if ( typeof AmCharts === "undefined" ) {
            console.log("Lib. AmCharts is not loaded !");
            return;
        }

        AmCharts.addInitHandler(function () {});

        context._profile = AmCharts.makeChart( container, {
            type : "serial",
            pathToImages : "http://cdn.amcharts.com/lib/3/images/",
            categoryField : "dist",
            autoMarginOffset : 0,
            marginRight : 10,
            marginTop : 10,
            startDuration : 0,
            color : "#5E5E5E",
            fontSize : 10,
            theme : "light",
            thousandsSeparator : "",
            categoryAxis : {
                color : "#5E5E5E",
                gridPosition : "start",
                minHorizontalGap : 40,
                tickPosition : "start",
                title : "Distance (km)",
                titleColor : "#5E5E5E",
                startOnAxis : true
            },
            chartCursor : {
                animationDuration : 0,
                bulletsEnabled : true,
                bulletSize : 10,
                categoryBalloonEnabled : false,
                cursorColor : "#F90",
                graphBulletAlpha : 1,
                graphBulletSize : 1,
                zoomable : false
            },
            trendLines : [],
            graphs : [
                {
                    balloonColor : "#CCCCCC",
                    balloonText : "<span class='altiPathValue'>[[title]] : [[value]]m</span><br/><span class='altiPathCoords'>(lat: [[lat]] / lon:[[lon]])</span>",
                    bullet : "round",
                    bulletAlpha : 0,
                    bulletBorderColor : "#FFF",
                    bulletBorderThickness : 2,
                    bulletColor : "#F90",
                    bulletSize : 6,
                    hidden : false,
                    id : "AmGraph-1",
                    fillAlphas : 0.4,
                    fillColors : "#C77A04",
                    lineAlpha : 1,
                    lineColor : "#C77A04",
                    lineThickness : 1,
                    title : "Altitude",
                    valueField : "z"
                }
            ],
            guides : [],
            valueAxes : [
                {
                    id : "ValueAxis-1",
                    minVerticalGap : 20,
                    title : "Altitude (m)"
                }
            ],
            allLabel : [],
            balloon : {
                borderColor : "#CCCCCC",
                borderThickness : 1,
                fillColor : "#FFFFFF",
                showBullet : true
            },
            titles : [],
            dataProvider : data
        });

        // on active les evenement entre la carte / graphe
        var _initPosition = data[0];
        context._activateProfilEvent(_initPosition);

    };

    return ElevationPath;
});
