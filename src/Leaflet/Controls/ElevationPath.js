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
    P, // loading plugin leaflet-draw (0.3.0)
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
            collapsed : true, // plier !
            graphOptions : {}, // TODO !
            elevationPathOptions : {}
        },

        /**
        * constructor
        *
        * @private
        * @param {Object} options - ElevationPath control options
        * @param {Sting}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
        * @param {Boolean} [options.collapsed] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
        * @example
        *  var e = L.geoportalControl.ElevationPath({
        *      collapsed : false
        *  });
        */
        initialize : function (options) {

            // on transmet les options au controle
            L.Util.setOptions(this, options);

            /** uuid */
            this._uid = ID.generate();

            /** les container */
            this._showContainer = null;
            this._pictoContainer = null;
            this._panelContainer = null;
            this._profilContainer = null;
            this._waitingContainer = null;

            /** detection si le panneau est reduit */
            this._reducePanel = false;

            /** couche vectorielle dans laquelle seront saisis les points (features ci-dessus) */
            this._featuresLayer = null;
            this._lastIdLayer = 0;
            this._currentIdLayer = 0;
            this._currentFeature = null;

            /** graph */
            this._profil = null;
            this._marker = null;

            /**
            * geometry à transmettre au service
            * { lon : [], lat : []}
            */
            this._geometry = null;

            /** aucun droits sur les ressources */
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
            var container = this._container =  this._initLayout(map);

            if ( map ) {
                // lors de l'ajout à la map, on active la saisie du point,
                // mais seulement si le widget est ouvert
                if (!this.options.collapsed) {
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
        * TODO this method is called by constructor
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
        // ########################### init dom ############################## //
        // ################################################################### //

        /**
        * this method is called by this.onAdd(map)
        * and initialize the container HTMLElement
        *
        * @private
        */
        _initLayout : function (map) {

            // create main container
            var container = this._createMainContainerElement();

            var inputShow = this._showContainer = this._createShowElevationPathElement();
            container.appendChild(inputShow);

            // mode "collapsed"
            if (!this.options.collapsed) {
                inputShow.checked = true;
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

            var map = this._map;

            // interactions avec la carte
            if (! this._reducePanel) {
                if (this._showContainer.checked) {
                    this._pictoContainer.style.display = "block";
                    this._panelContainer.style.display = "none";
                    this._removeMapInteraction(map);
                    this._clear();
                } else {
                    if (this._profil === null) {
                        this._panelContainer.style.display = "none";
                    }
                    this._activateMapInteraction(map);
                }
            } else {
                if (this._profil !== null) {
                    this._pictoContainer.style.display = "none";
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
                    console.log("draw:created");

                    self._currentIdLayer = L.Util.stamp(e.layer);

                    self._getFeatureGeometry(e.layer);
                    self._addFeatureLayer(e.layer);
                });

                /* evenements */
                map.on("draw:drawstart", function () {
                    console.log("draw:drawstart");
                    self._removeFeatureLayer(self._lastIdLayer);
                    self._lastIdLayer = self._currentIdLayer;
                });

                /* evenements */
                map.on("draw:drawstop", function () {
                    console.log("draw:drawstop");
                    self._pictoContainer.style.display = "none";
                    self._panelContainer.style.display = "block";
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
        * TODO this method is called by this._activateMapInteraction,
        * and creates map polyline drawing interaction.
        *
        * @param {Object} map - control map.
        * @private
        */
        _activatePolyLineInteraction : function (map) {

            if (this._currentFeature) {
                this._currentFeature.disable();
            }

            var polylineOptions = {
                repeatMode : true,
                shapeOptions : {
                    color : "#C77A04"
                }
            };

            this._currentFeature = new L.Draw.Polyline(map, polylineOptions);
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

            // on y ajoute les callbacks ainsi que les options par defaut
            var self = this;
            L.Util.extend(options, {

                /** sampling à 200 (iso portail) */
                sampling : options.sampling || 200,

                /** callback onSuccess */
                onSuccess : function (result) {
                    logger.log(result);
                    if (result) {
                        self._displayProfil(result.elevations);
                        self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
                        self._waiting = false;
                    }
                },

                /** callback onFailure */
                onFailure : function (error) {
                    logger.log(error.message);
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

        /**
        * this method is called by this. (in case of success)
        * and display results
        *
        * @param {Array} elevations - array of elevation
        * @private
        */
        _displayProfil : function (elevations) {

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
                distance += ( _haversineDistance([elevations[i].lat, elevations[i].lon], [elevations[i - 1].lat, elevations[i - 1].lon]) ) / 1000;
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

            // Calcul du profil
            if ( typeof AmCharts !== "undefined" ) {
                // AmCharts, it's a variable global because i do the choice to put it on lib. external !
                console.log("Lib. AmCharts is loaded !");
                this._displayProfilWithAmCharts(elevations);
            } else if ( typeof d3 !== "undefined" ) {
                console.log("Lib. D3 is loaded !");
                this._displayProfilWithD3(elevations);
            } else {
                console.log("No library is loaded !");
                this._displayProfilWithResults(elevations);
            }
        },

        /** ... */
        _displayProfilWithResults : function (data) {

            var container = this._profilContainer;

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

            this._profil = container;
        },

        /** ... */
        _displayProfilWithD3 : function (data) {
            // TODO
            // - tooltips

            var container = this._profilContainer;

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
                .attr("class", "area")
                .attr("d", area);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("y", -15)
                .attr("dy", ".71em")
                .attr("x", width)
                .text("Distance (km)");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .text("Altitude (m)");

            svg.append("g")
                .attr("class", "grid vertical")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis
                    .orient("bottom")
                    .tickSize(-height, 0, 0)
                    .tickFormat("")
                );

            svg.append("g")
                .attr("class", "grid horizontal")
                .call(yAxis
                    .orient("left")
                    .tickSize(-width, 0, 0)
                    .tickFormat("")
                );

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', function (d) {
                    return x(d.dist);
                })
                .attr('cy', function (d) {
                    return y(d.z);
                })
                .attr('r', 0)
                .attr('class', 'circle');

            var focus = svg.append('g').style('display', 'none');

            focus.append('line')
                .attr('id', 'focusLineX')
                .attr('class', 'focusLine');
            focus.append('line')
                .attr('id', 'focusLineY')
                .attr('class', 'focusLine');
            focus.append('circle')
                .attr('id', 'focusCircle')
                .attr('r', 4)
                .attr('class', 'circle focusCircle');

            var div = d3.select(container).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var bisectDist = d3.bisector(function (d) {
                return d.dist;
            }).left;

            var self = this;
            var map  = this._map;

            svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function () {
                    focus.style('display', null);
                    // creation d'un marker
                    self._marker = L.marker(L.latLng(data[0].lat, data[0].lon), {
                        icon : new IconDefault("orange"),
                        draggable : false,
                        clickable : false,
                        zIndexOffset : 1000
                    });

                    self._marker.addTo(map);
                })
                .on("mouseout", function () {
                    focus.style('display', 'none');
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

                    var d0 = data[i - 1]
                    var d1 = data[i];
                    var d  = distance - d0[0] > d1[0] - distance ? d1 : d0;

                    var xc = x(d.dist);
                    var yc = y(d.z);

                    focus.select('#focusCircle')
                        .attr('cx', xc)
                        .attr('cy', yc);
                    focus.select('#focusLineX')
                        .attr('x1', xc).attr('y1', y(yDomain[0]))
                        .attr('x2', xc).attr('y2', y(yDomain[1]));
                    focus.select('#focusLineY')
                        .attr('x1', x(xDomain[0])).attr('y1', yc)
                        .attr('x2', x(xDomain[1])).attr('y2', yc);

                    // mise à jour du marker
                    self._marker.setLatLng(L.latLng(d.lat, d.lon));
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

            // FIXME quel objet transmettre et pour quoi faire ?
            this._profil = d3.selectAll("rect.overlay")[0][0];

        },

        /**
        * TODO...
        */
        _displayProfilWithAmCharts : function (data) {

            AmCharts.addInitHandler(function () {
                console.log("addInitHandler");
            });

            this._profil = AmCharts.makeChart( this._profilContainer, {
                "type" : "serial",
                "pathToImages" : "http://cdn.amcharts.com/lib/3/images/",
                "categoryField" : "dist",
                "autoMarginOffset" : 0,
                "marginRight" : 10,
                "marginTop" : 10,
                "startDuration" : 0,
                "color" : "#5E5E5E",
                "fontSize" : 10,
                "theme" : "light",
                "thousandsSeparator" : "",
                "categoryAxis" : {
                    "color" : "#5E5E5E",
                    "gridPosition" : "start",
                    "minHorizontalGap" : 40,
                    "tickPosition" : "start",
                    "title" : "Distance (km)",
                    "titleColor" : "#5E5E5E",
                    "startOnAxis" : true
                },
                "chartCursor" : {
                    "animationDuration" : 0,
                    "bulletsEnabled" : true,
                    "bulletSize" : 10,
                    "categoryBalloonEnabled" : false,
                    "cursorColor" : "#F90",
                    "graphBulletAlpha" : 1,
                    "graphBulletSize" : 1,
                    "zoomable" : false
                },
                "trendLines" : [],
                "graphs" : [
                    {
                        "balloonColor" : "#CCCCCC",
                        "balloonText" : "<span class='altiPathValue'>[[title]] : [[value]]m</span><br/><span class='altiPathCoords'>(lat: [[lat]] / lon:[[lon]])</span>",
                        "bullet" : "round",
                        "bulletAlpha" : 0,
                        "bulletBorderColor" : "#FFF",
                        "bulletBorderThickness" : 2,
                        "bulletColor" : "#F90",
                        "bulletSize" : 6,
                        "hidden" : false,
                        "id" : "AmGraph-1",
                        "fillAlphas" : 0.4,
                        "fillColors" : "#C77A04",
                        "lineAlpha" : 1,
                        "lineColor" : "#C77A04",
                        "lineThickness" : 1,
                        "title" : "Altitude",
                        "valueField" : "z"
                    }
                ],
                "guides" : [],
                "valueAxes" : [
                    {
                        "id" : "ValueAxis-1",
                        "minVerticalGap" : 20,
                        "title" : "Altitude (m)"
                    }
                ],
                "allLabels" : [],
                "balloon" : {
                    "borderColor" : "#CCCCCC",
                    "borderThickness" : 1,
                    "fillColor" : "#FFFFFF",
                    "showBullet" : true
                },
                "titles" : [],
                "dataProvider" : data
            });

            // on active les evenement entre la carte / graphe
            var _initPosition = data[0];
            this._activateProfilEvent(_initPosition);
        },

        /**
        * this method is called by this.
        * and activate event on map and profil
        *
        * @private
        */
        _activateProfilEvent : function (position) {

            if (this._profil === null) {
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

            // event sur le survol du graphe qui permet de mettre à jour
            // la position du marker
            var changed = function (e) {

                var obj = e.chart.dataProvider[e.index];

                self._marker.setLatLng(L.latLng(obj.lat, obj.lon));
                self._marker.update();
            };

            // FIXME remove event !?
            self._profil.removeListener('changed', changed);
            self._profil.addListener('changed', changed);

            var mouseover = function (e) {
                console.log("mouseover");
                if (self._profil === null) {
                    return;
                }

                // creation d'un marker
                self._marker = L.marker(L.latLng(position.lat, position.lon), {
                    icon : new IconDefault("orange"),
                    draggable : false,
                    clickable : false,
                    zIndexOffset : 1000
                });
                self._marker.addTo(map);
            };

            var mouseout = function (e) {
                console.log("mouseout");
                if (self._profil === null) {
                    return;
                }

                // suppression de l'ancien d'un marker
                if (self._marker) {
                    map.removeLayer(self._marker);
                    self._marker = null;
                }
            };


            // FIXME event !?
            // this._profilContainer.removeEventListener("mouseover", mouseover);
            // this._profilContainer.addEventListener("mouseover", mouseover);
            // this._profilContainer.removeEventListener("mouseout", mouseout);
            // this._profilContainer.addEventListener("mouseout", mouseout);
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
            this._profil = null;

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

    return ElevationPath;
});
