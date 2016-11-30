/* globals AmCharts, d3 */
define([
    "ol",
    "woodman",
    "gp",
    "Ol3/Utils",
    "Common/Utils/CheckRightManagement",
    "Ol3/Controls/MeasureToolBox",
    "Common/Controls/ElevationPathDOM",
    "Common/Utils/SelectorID"
], function (
    ol,
    woodman,
    Gp,
    Utils,
    RightManagement,
    MeasureToolBox,
    ElevationPathDOM,
    ID
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("elevationpath");

    /**
    * @classdesc
    *
    * Tool Measure Elevation Path Control.
    *
    * @constructor
    * @alias ol.control.ElevationPath
    * @extends {ol.control.Control}
    * @param {Object} options - options for function call.
    * @param {Boolean} [options.active = false] - specify if control should be actived at startup. Default is false.
    * @param {Object} [options.stylesOptions = {}] - styles management
    * @param {Object} [options.stylesOptions.marker = {}] - styles management of marker with properties or object {ol.style.Icon}
    * @param {String} [options.stylesOptions.marker.imageSrc] - Icon source
    * @param {Array}  [options.stylesOptions.marker.imageAnchor] - Icon anchor
    * @param {Object} [options.stylesOptions.profile = {}] - styles management of a profile AmCharts (https://docs.amcharts.com/3/javascriptcharts/AmChart)
    * @param {Object} [options.stylesOptions.draw = {}] - styles management of draw with properties or object {ol.style}
    * @param {Object} [options.stylesOptions.draw.pointer = {}] - Point Style for a start drawing with properties or object {ol.style.Circle}
    * @param {Number} [options.stylesOptions.draw.pointer.imageRadius] - Point radius (properties)
    * @param {String} [options.stylesOptions.draw.pointer.imageFillColor] - Point for fill color (properties)
    * @param {String} [options.stylesOptions.draw.pointer.imageStrokeColor] - Point for stroke color (properties)
    * @param {Object} [options.stylesOptions.draw.start = {}] - Line Style for a start drawing with properties or object {ol.style.Stroke}
    * @param {String} [options.stylesOptions.draw.start.strokeColor] - Line for stroke color (properties)
    * @param {Array}  [options.stylesOptions.draw.start.strokeLineDash] - Line for stroke dash (properties)
    * @param {Number} [options.stylesOptions.draw.start.strokeWidth] - Line for stroke width (properties)
    * @param {Object} [options.stylesOptions.draw.finish = {}] - Line Style for a finish drawing with properties or object {ol.style.Stroke}
    * @param {String} [options.stylesOptions.draw.finish.strokeColor] - Line for stroke color (properties)
    * @param {Number} [options.stylesOptions.draw.finish.strokeWidth] - Line for stroke width (properties)
    * @param {Object} [options.elevationPathOptions = {}] - elevation service options.
    *       see {@link http://depot.ign.fr/geoportail/bibacces/develop/doc/module-Services.html#~getAltitude}
    *       to know all elevation options
    * @param {Object} [options.displayProfileOptions = {}] - profile options.
    * @param {Function} [options.displayProfileOptions.apply] - function to display profil panel.
    * @param {Object} [options.displayProfileOptions.target] - container DOM for the profil panel.
    * @example
    *
    * var measure = new ol.control.ElevationPath({
    *    element : null,
    *    target : null,
    *    render : null,
    *    active : false,
    *    stylesOptions : {
    *     draw : {
    *       pointer : {
    *           imageRadius : 5,
    *           imageFillColor : "rgba(255, 255, 255, 0.2)",
    *           imageStrokeColor : "rgba(0, 0, 0, 0.7)"
    *       },
    *       start : {
    *           strokeColor : "rgba(0, 0, 0, 0.5)",
    *           strokeLineDash : [10, 10],
    *           strokeWidth : 2,
    *       },
    *       finish : new ol.style.Stroke({
    *            color : "rgba(0, 0, 0, 0.5)",
    *            width : 2
    *       })
    *     },
    *     marker : {},
    *     profile : {}
    *    },
    *    elevationPathOptions : {},
    *    displayProfileOptions : {
    *       apply : null,
    *       target : null
    *    }
    * });
    *
    * Exemples :
    * - displayProfileOptions.apply : null
    * - displayProfileOptions.apply : function (elevations, container, context) {  // do some stuff... }
    * - displayProfileOptions.apply : ol.control.ElevationPath.DISPLAY_PROFILE_{LIB_AMCHARTS | LIB_D3 | RAW}
    * (detect auto lib. : d3 / AmCharts)
    *
    */
    function ElevationPath (options) {
        logger.trace("ElevationPath()");

        /** options */
        options = options || {};

        if (!(this instanceof ElevationPath)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /** Nom de la classe (heritage) */
        this.CLASSNAME = "ElevationPath";

        // uuid
        this._uid = ID.generate();

        // container : HTMLElement
        this._showContainer = null;
        this._pictoContainer = null;
        this._panelContainer = null;
        this._profileContainer = null;
        this._waitingContainer = null;

        // objet de type "ol.style"
        this._drawStyleStart = null;
        this._drawStyleFinish = null;
        this._markerStyle = null;

        // graph
        this._profile = null;

        /* objet de type
            "ol.source.Vector",
            "ol.layer.Vector",
            "ol.interaction.Draw"
        */
        this._measureSource = null;
        this._measureVector = null;
        this._measureDraw = null;

        // objet de type ol.feature, saisie en cours
        this._lastSketch = null;
        this._currentSketch = null;

        // objet de type ol.feature, marker
        this._marker =  null;

        // gestion des droits sur le service
        this._noRightManagement = false;

        // initialisation du composant
        this._initialize(options);

        // gestion des droits
        this._checkRightsManagement();

        // creation du DOM container
        var container = ( options.element ) ? options.element : this._initializeContainer();

        // heritage
        ol.control.Control.call(this,
            {
                element : container,
                target : options.target,
                render : options.render
            }
        );
    }

    // heritage avec ol.control.Control
    ol.inherits(ElevationPath, ol.control.Control);

    /**
     * @lends module:ElevationPath
     */
    ElevationPath.prototype = Object.create(ol.control.Control.prototype, {});

    // on récupère les mixins de la classe "ElevationPathDOM"
    Utils.assign(ElevationPath.prototype, ElevationPathDOM);

    /**
    * suppression du marker
    *
    * @private
    */
    ElevationPath.__removeProfilMarker = function (context) {
        var self = context;
        // suppression de l'ancien marker
        if (self._marker) {
            self._measureSource.removeFeature(self._marker);
            self._marker = null;
        }
    };

    /**
    * mise à jour du marker
    *
    * @private
    */
    ElevationPath.__updateProfilMarker = function (d, context) {
        var self = context;
        var map  = self.getMap();
        var proj = map.getView().getProjection();

        ElevationPath.__removeProfilMarker(self);

        var _coordinate = ol.proj.transform([d.lon, d.lat], "EPSG:4326", proj);
        var _geometry   = new ol.geom.Point(_coordinate);

        self._marker = new ol.Feature({
            geometry : _geometry
        });
        logger.trace(_geometry);

        // style
        self._marker.setStyle(self._markerStyle);

        // ajout du marker sur la map
        self._measureSource.addFeature(self._marker);
    };

    /**
    * display Profile with Amcharts
    *
    * @param {Object} data - collection elevations
    * @param {HTMLElement} container - container
    * @param {Object} context - context
    */
    ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS = function (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS");

        // Calcul du profile
        if ( typeof AmCharts === "undefined" ) {
            console.log("Lib. AmCharts is not loaded !");
            return;
        }

        AmCharts.addInitHandler(function () {
            logger.trace("AmCharts::addInitHandler (event)");
        });

        var self = context;

        var _config = {};
        Utils.mergeParams(_config, self.options.styles.profile);
        Utils.mergeParams(_config, {
            dataProvider : data
        });

        self._profile = AmCharts.makeChart(container, _config);
        self._profile.addListener("changed", function (e) {
            logger.trace("AmCharts::changed (event)", e);
            var obj = e.chart.dataProvider[e.index];
            logger.trace(obj);

            ElevationPath.__removeProfilMarker(self);
            ElevationPath.__updateProfilMarker(obj, self);

            // var _proj = self.getMap().getView().getProjection();
            // var _coordinate = ol.proj.transform([obj.lon, obj.lat], "EPSG:4326", _proj);
            // var _geometry   = new ol.geom.Point(_coordinate);
            //
            // // suppression de l'ancien marker
            // if (self._marker) {
            //     self._measureSource.removeFeature(self._marker);
            //     self._marker = null;
            // }
            //
            // self._marker = new ol.Feature({
            //     geometry : _geometry
            // });
            // logger.trace(_geometry);
            //
            // // style
            // self._marker.setStyle(self._markerStyle);
            //
            // // ajout du marker sur la map
            // self._measureSource.addFeature(self._marker);
        });
    };

    /**
    * display Profile with D3
    *
    * @param {Object} data - collection elevations
    * @param {HTMLElement} container - container
    * @param {Object} context - context
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

        // FIXME
        // If your DIV is not visible, you won't be able to get its dimensions.
        // var width  = container.clientWidth - margin.left - margin.right;
        // var height = container.clientHeight - margin.top - margin.bottom;

        var h = getComputedStyle(container, null).getPropertyValue("height").replace("px", "");
        var w = getComputedStyle(container, null).getPropertyValue("width").replace("px", "");

        var width  = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

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

        var self = context;

        svg.append("rect")
            .attr("class", "overlay-d3")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function () {
                focus.style("display", null);

                ElevationPath.__updateProfilMarker(data[0], self);

            })
            .on("mouseout", function () {
                focus.style("display", "none");

                ElevationPath.__removeProfilMarker(self);

                // tooltips
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", function () {

                var m = d3.mouse(this);
                var distance = x.invert(m[0]);
                var i = bisectDist(data, distance);

                var d0 = (i === 0) ? data[0] : data[i - 1];
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

                // mise à jour de la position du marker
                ElevationPath.__updateProfilMarker(d, self);

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

        self._profile = d3.selectAll("rect.overlay")[0][0];
    };

    /**
    * display Profile without graphical lib (raw)
    *
    * @param {Object} data - collection elevations
    * @param {HTMLElement} container - container
    * @param {Object} context - context
    */
    ElevationPath.DISPLAY_PROFILE_RAW = function (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_RAW");

        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        var self = context;

        // TODO CSS externe
        var div  = document.createElement("textarea");
        div.id = "profileElevationRaw";
        div.rows = 10;
        div.cols = 50;
        div.style.width = "100%";
        div.wrap = "off";
        div.innerHTML = JSON.stringify(data, undefined, 4);
        container.appendChild(div);

        self._profile = container;

        // symbolisation des points produits par le service
        // INFO orienté maintenance !
        if (self.options.debug) {
            var _proj = self.getMap().getView().getProjection();
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var _coordinate = ol.proj.transform([obj.lon, obj.lat], "EPSG:4326", _proj);
                var _geometry   = new ol.geom.Point(_coordinate);

                self._marker = new ol.Feature({
                    geometry : _geometry
                });
                logger.trace(_geometry);

                // TODO style en options ?
                var styles = ElevationPath.DEFAULT_STYLES.RESULTS;
                var _image = new ol.style.Circle({
                    radius : styles.imageRadius,
                    stroke : new ol.style.Stroke({
                        color : styles.imageStrokeColor,
                        width : styles.imageStrokeWidth
                    }),
                    fill : new ol.style.Fill({
                        color : styles.imageFillColor
                    })
                });
                self._marker.setStyle(new ol.style.Style({
                    image : _image
                }));

                // ajout du marker sur la map
                self._measureSource.addFeature(self._marker);
            }
        }
    };

    /**
    * TODO display Profile by default
    *
    * @param {Object} data - collection elevations
    * @param {HTMLElement} container - container
    * @param {Object} context - context
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
        var dist = data[data.length - 1].dist;

        var barwidth = 100 / data.length ;

        var self = context;

        var div = document.createElement("div");
        div.id  = "profileElevationByDefault";
        div.addEventListener("mouseover", function (e) {

            var _lon = parseFloat(e.target.dataset["lon"]);
            var _lat = parseFloat(e.target.dataset["lat"]);

            if (_lon && _lat) {
                ElevationPath.__updateProfilMarker({
                    lon : _lon,
                    lat : _lat
                }, self);
            }

        });
        div.addEventListener("mousemove", function () {});
        div.addEventListener("mouseout", function () {
            ElevationPath.__removeProfilMarker(self);
        });
        container.appendChild(div);

        var divZ = document.createElement("div");
        divZ.className = "z-title-vertical";
        divZ.innerHTML = minZ + " / " + maxZ + " m";
        div.appendChild(divZ);

        var ul  = document.createElement("ul");
        ul.id   = "data-default";
        ul.className = "z-axis x-axis";
        div.appendChild(ul);

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
            ul.appendChild(li) ;
       }

       var divX = document.createElement("div");
       divX.className = "x-title-horizontal";
       divX.innerHTML = dist + " km";
       div.appendChild(divX);

       self._profile = container;
    };

    /** styles by default */
    ElevationPath.DEFAULT_STYLES = {
        // styling drawing by default
        DRAW : {
            // start drawing point by default
            POINTER : {
                imageRadius : 5,
                imageFillColor : "rgba(255, 155, 0, 0.7)",
                imageStrokeColor : "#002A50",
                imageStrokeWidth : 2
            },
            // start drawing line by default
            START : {
                strokeColor : "#002A50",
                strokeLineDash : [10, 10],
                strokeWidth : 2
            },
            // finish drawing line
            FINISH : {
                strokeColor : "#002A50",
                strokeWidth : 3
            }
        },
        // stying marker to the profile by default
        MARKER : {
            imageSrc : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAsCAYAAAAATWqyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABTtJREFUeNq8WGtsFUUU/rb3gtdCAykFG9AUDTQUKimhxUewEusrJYoBo4FfEgoqotHERH6oP9TGmJhIrIlWAf9hjAaEiME2pgFfVVpFii8sWqIQLLSx3EJLW7p+Z2Z2b2l7d/b23vZLTmZ2duacb2fmnDk7DlKA67rXs1hJKacsohRQppjXFygnKT9TDlH2O47zFzIFGnco91EOuqnjoBnr2Ow4FhIlLN6m3DykFTh3BGj/Doj/CfSe082xPCDnBmDWTUBeyXDVjZTHOUNHUiZCEs+weI0ySTV0/w0c2wa07gIungn+vOx8YN46oPhpYOp1Xms/5TmSeSMUERKImFnYqBoGuPRNL5LEW8BgX2rrmjWZZLYApS8BUW8r4T0zO5eTEjFr+S6lSjV0HgPqVwNdf6S30abNB+7aDeQWey3bKZtIxvU5DxvyrE/izJfAvuXpkxCIDtElOjWqjK2RM8LZWMbiG0oEnUc5kB7a14WMYvI04H56du5ieZKluZWz8r0/IyQh5TuKRH8cqFuTeRIC0Sm6xYbYok1j21+ahyhLVO3wC8D5VowbRLfY0FhibOulIavDLEoRZyD8sJDeMWBXKG5ZsIobsdDsg+OMq3u1m1u9KQo8zP45EqjRxOUpk6i50IRl4FuGjpZtwUoiMYa314GFj/EzIsN8n8v+C1e4kfvwcm+wnhsZY27xQ8oiWZpKrWRQB6tAElfxpKnjsCdGklDzG9HvpI/0DYLYEpsalVnmAAM6fgR62oMHl70C5N9mn3rpI32DILbEpkZ5ljlFgbPNFtebzij5VPhNKX1lTBASNtXSzPZ3cxCuvVOH7FTCu4yxeZDGbCES0z5+PniQ3uGpwTYmYTOWCPGTpgYP6u9OnYhtzBCbQkSH0NiM4EEdP6VOxDYmYbNLiJxQ1elFwYPaG3XQCn3QHddjgpCweUKI6K2bvzw4YROf//rJob6fZl/H2FRoFiINfqo3qyzYwD8MVIeYLw32J+8j76SP9A2C2BKbGg1CZL+EF/W4YKP9a3/fCeyhkrY9DOOXEu1SlzZ5J31sSNjqURm/OfQkY9qgvkYOvXhbuH0g505Oga7HT9rPF9+t5+pDL0ulwzt46FV5ROax+JUSRRtP0LoHMK64+xNg7iqVEVOKSKRVxRGpsKhRnaRD4SPjR0J0axKCGmP7ilQxm4X8d8xXmfvHJZlPkCR3WfODl9FLMlxCIhevSJ5Nwzo1XdKxYpe3hpmB6BKdmoS43VqPxIgsni+aWOg8biZ3f+nLmSMiuvKWek/P01az7QdLyNVT7lC/l59WAKcb0iMxhzpW1nvmvpDtSiKD1l9OkpnDgv8UyMWFU9wvTP8vdY6NhJwnD1JVtso2OiiLSeL0iJUbNfg6zikVVwRTyOn2HWOfjfLtHgnBhtFIJCViyNDZUatdmnGlaFPqJIoe1WM1aqlz71ivJbLNobgAA9zgu7nZ/vstHAk5WVdzaPRqmGC5lER6kjpV4OWJdq+1kkshSk4VH9izcy/bV66qSPQZV+0J9G7rTY6+XNmqHmYwyJVV24kse1X31dhKHdasygkzy+a64oC4nWr47F4e858nSbLv4V/KAe9JKpVDrx/SImLIXMOiRUKdujESl+49O8xVZxpXzVc/C/I/RxL/hgq8YYkYhev9q6kVO4d9B+sr3vdICNaHJTHWW8Ya/87wqy2uWwstUk/gTYw3aCRGOarMDfS67kfFWqSuIe9imAjQEC272nJHixYNaSvGRIIGN49ywbsZEw1zI11N6TZSHeaGORn+F2AAJtRIMx4t+hUAAAAASUVORK5CYII=",
            imageSize : [34, 44],
            imageAnchor : [0.5, 1],
            imageAnchorOrigin : "bottom-left",
            imageAnchorXUnits : "ratio",
            imageAnchorYUnits : "ratio",
            imageSnapToPixel : true
        },
        // styling service results points by default
        RESULTS : {
            // INFO orienté maintenance !
            imageRadius : 5,
            imageFillColor : "rgba(128, 128, 128, 0.2)",
            imageStrokeColor : "rgba(0, 0, 0, 0.7)",
            imageStrokeWidth : 2
        },
        // styling amCharts profile by default
        PROFILE : {
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
            allLabels : [],
            balloon : {
                borderColor : "#CCCCCC",
                borderThickness : 1,
                fillColor : "#FFFFFF",
                showBullet : true
            },
            titles : []
        }
    };

    /**
     * Constructor (alias)
     * @private
     */
    ElevationPath.prototype.constructor = ElevationPath;

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    ElevationPath.prototype.setMap = function (map) {
        logger.trace("ElevationPath::setMap");

        if ( map ) {
            // activation des interactions de dessin selon la valeur de
            // l'option active
            if (this.options.active) {
                // on n'affiche pas la fenetre de profile s'il n'existe pas...
                if (this._profile === null) {
                    this._panelContainer.style.display = "none";
                    // this._panelContainer.style.visibility = "hidden";
                }
                this._initMeasureInteraction(map);
                this._addMeasureInteraction(map);
            }

            // ajout du composant dans une toolbox
            if (! this.options.target) {
                MeasureToolBox.add(map, this);
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        ol.control.Control.prototype.setMap.call(this, map);

    };

    /**
     * Returns true if widget is actived (drawing),
     * false otherwise
     *
     * @returns {Boolean} active - true or false
     */
    ElevationPath.prototype.getActive = function () {
        logger.trace("ElevationPath::getActive");
        return this.options.active;
    };

    /**
     * Actived widget drawing or not
     *
     * @param {Boolean} active - true / false
     */
    ElevationPath.prototype.setActive = function (active) {
        logger.trace("ElevationPath::setActive");
        this.options.active = active;
    };

    /**
     * Clear
     */
    ElevationPath.prototype.clear = function () {
        logger.trace("ElevationPath::clear");

        var map = this.getMap();

        // graph
        this._profile = null;

        // on vide le container
        if (this._profileContainer) {
            while (this._profileContainer.firstChild) {
                this._profileContainer.removeChild(this._profileContainer.firstChild);
            }
        }

        // sketch
        this._lastSketch = null;
        this._currentSketch = null;

        if (this._measureSource) {
            // marker
            if (this._marker) {
                this._measureSource.removeFeature(this._marker);
                this._marker = null;
            }

            // all other features
            var _features = this._measureSource.getFeatures();
            for (var i = 0; i < _features.length; i++) {
                this._measureSource.removeFeature(_features[i]);
            }
        }

        this._removeMeasureInteraction(map);
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize control (called by constructor)
     *
     * @private
     */
    ElevationPath.prototype._initialize = function (options) {
        logger.trace("ElevationPath::_initialize : ", options);

        // liste des options
        this.options = {};

        this.options.target   = ( typeof options.target !== "undefined" ) ? options.target : null;
        this.options.render   = ( typeof options.render !== "undefined" ) ? options.render : null;

        // cle API sur le service
        this.options.apiKey = options.apiKey;

        // mode debug (tracé des points du service d'alti)
        var debug = options.debug;
        this.options.debug = ( typeof debug === "undefined") ? false : debug;

        // gestion du mode active
        var active = options.active;
        this.options.active = ( typeof active === "undefined") ? false : active;

        // gestion des options du service
        var service = options.elevationOptions;
        this.options.service = ( typeof service === "undefined" || Object.keys(service).length === 0 ) ? {} : service;

        // gestion de l'affichage du profil
        var profil = options.displayProfileOptions || {};
        if ( typeof profil === "undefined" || Object.keys(profil).length === 0 ) {
            this.options.profile = {
                apply : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT,
                target : null
            };

        } else {
            this.options.profile = {};
        }

        // gestion de la fonction du profil
        var displayFunction = profil.apply || this.options.profile.apply;
        this.options.profile.apply =  ( typeof displayFunction === "function" ) ?
            displayFunction : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT;

        // gestion du container du profil
        var displayContainer = profil.target || this.options.profile.target;
        this.options.profile.target =  ( typeof displayContainer === "undefined" ) ?
            null : displayContainer;

        // gestion des styles
        var styles = options.stylesOptions || {};
        if ( typeof styles === "undefined" || Object.keys(styles).length === 0 ) {
            // on applique les styles par defaut (en mode properties)
            this.options.styles = {
                draw : ElevationPath.DEFAULT_STYLES.DRAW,
                marker : ElevationPath.DEFAULT_STYLES.MARKER,
                profile : ElevationPath.DEFAULT_STYLES.PROFILE
            };

        } else {
            this.options.styles = {};
        }

        // gestion des styles du tracé
        var draw = styles.draw || this.options.styles.draw;
        this.options.styles.draw = ( typeof draw === "undefined" || Object.keys(draw).length === 0 ) ?
            ElevationPath.DEFAULT_STYLES.DRAW : draw;
        var drawPointer = this.options.styles.draw.pointer;
        var drawStart   = this.options.styles.draw.start;
        var drawFinish  = this.options.styles.draw.finish;
        if ( typeof drawPointer === "undefined" ) {
            this.options.styles.draw.pointer = ElevationPath.DEFAULT_STYLES.DRAW.POINTER;
        }
        if ( typeof drawStart === "undefined" ) {
            this.options.styles.draw.start = ElevationPath.DEFAULT_STYLES.DRAW.START;
        }
        if ( typeof drawFinish === "undefined" ) {
            this.options.styles.draw.finish = ElevationPath.DEFAULT_STYLES.DRAW.FINISH;
        }
        this._createStylingDraw();

        // gestion des styles du marker
        var marker = styles.marker || this.options.styles.marker;
        this.options.styles.marker = ( typeof marker === "undefined" || Object.keys(marker).length === 0 ) ?
            ElevationPath.DEFAULT_STYLES.MARKER : marker;
        this._createStylingMarker();

        // gestion des styles du profile de type AmCharts
        var profile = styles.profile || this.options.styles.profile;
        this.options.styles.profile = ( typeof profile === "undefined" || Object.keys(profile).length === 0 ) ?
            ElevationPath.DEFAULT_STYLES.PROFILE : profile;
        this._createStylingProfile();

    };

    /**
     * initialize component container (DOM)
     *
     * @private
     */
    ElevationPath.prototype._initializeContainer = function () {
        logger.trace("ElevationPath::_initializeContainer : ", this._uid);

        // create main container
        var container = this._createMainContainerElement();

        var inputShow = this._showContainer = this._createShowElevationPathElement();
        container.appendChild(inputShow);

        var picto = this._pictoContainer = this._createShowElevationPathPictoElement();
        container.appendChild(picto);

        // mode "active"
        if (this.options.active) {
            this._showContainer.checked = true;
        }

        // panneau
        var panel = this._panelContainer = this._createElevationPathPanelElement();

        // header
        var header = this._createElevationPathPanelHeaderElement();
        panel.appendChild(header);

        // profile
        var profile = this._profileContainer = this._createElevationPathPanelProfilElement();
        panel.appendChild(profile);

        // waiting
        var waiting = this._waitingContainer = this._createElevationPathWaitingElement();
        panel.appendChild(waiting);

        if (this.options.profile.target === null) {
            container.appendChild(panel);
        }

        return container;
    };

    /**
     * this method is called by constructor (into method _initialize())
     * and check the rights to resources
     *
     * @private
     */
    ElevationPath.prototype._checkRightsManagement = function () {
        logger.trace("ElevationPath::_checkRightsManagement");

        var rightManagement = RightManagement.check({
            key : this.options.apiKey,
            resources : ["SERVICE_CALCUL_ALTIMETRIQUE_RSC"],
            services : ["Elevation"]
        });

        if ( !rightManagement ) {
            this._noRightManagement = true;
        }

        // on recupère les informations utiles
        // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
        // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
        // été renseignée.
        if ( !this.options.apiKey ) {
            this.options.apiKey = rightManagement.key;
        }

    };

    // ################################################################### //
    // ###################### init styles ################################ //
    // ################################################################### //

    /**
     * create style marker object : "ol.style"
     *
     * @private
     */
    ElevationPath.prototype._createStylingMarker = function () {
        logger.trace("ElevationPath::_createStylingMarker ");

        // on interprete les params pour y creer un objet ol.Style
        // on determine s'ils sont en mode properties ou directemzent en objet ol.Style
        var marker = this.options.styles.marker;

        logger.trace("style marker", marker);
        if ( marker instanceof ol.style.Image ) {
            logger.trace( "instance ol.style.Image for marker !" );
            this._drawStyleStart = new ol.style.Style({
                image : marker
            });

        } else {
            logger.trace( "use properties to define a style for marker !" );

            var defaultStyle = ElevationPath.DEFAULT_STYLES.MARKER;
            Object.keys(defaultStyle).forEach(function (key) {
                if (!marker.hasOwnProperty(key)) {
                    marker[key] = defaultStyle[key];
                    return;
                }
            },this);

            // FIXME on se limite à qqch de simple sur la gestion des Icones
            this._markerStyle = new ol.style.Style({
                image : new ol.style.Icon({
                    src : marker.imageSrc,
                    // size : marker.imageSize,
                    // imgSize :  marker.imageImgSize,
                    anchor : marker.imageAnchor,
                    // anchorOrigin : marker.imageAnchorOrigin,
                    // anchorXUnits : marker.imageAnchorXUnits,
                    // anchorYUnits : marker.imageAnchorYUnits,
                    snapToPixel : true
                })
            });
        }
    };

    /**
     * create style draw object : "ol.style"
     *
     * @private
     */
    ElevationPath.prototype._createStylingDraw = function () {
        logger.trace("ElevationPath::_createStylingDraw");

        // on interprete les params pour y creer un objet ol.Style
        var styles  = this.options.styles.draw;
        var pointer = styles.pointer;
        var start   = styles.start;
        var finish  = styles.finish;

        logger.trace("style pointer",  pointer);
        var _pointerImage = null;
        if ( pointer instanceof ol.style.Image ) {
            logger.trace( "instance ol.style.Image for pointer drawing !" );
            _pointerImage = pointer;
        } else {
            logger.trace( "use properties to define a style for pointer drawing !" );

            var defaultStylePointer = ElevationPath.DEFAULT_STYLES.DRAW.POINTER;
            Object.keys(defaultStylePointer).forEach(function (key) {
                if (!pointer.hasOwnProperty(key)) {
                    pointer[key] = defaultStylePointer[key];
                    return;
                }
                if (key === "imageStrokeWidth" || key === "imageRadius") {
                    var intValue = parseInt(pointer[key],10);
                    if (isNaN(intValue) || intValue < 0) {
                        console.log("Wrong value (" + pointer[key] + ") for strokeWidth or radius. Must be a positive interger value." );
                        pointer[key] = defaultStylePointer[key];
                        return;
                    }
                    pointer[key] = intValue;
                }
            },this);

            // point : image
            _pointerImage = new ol.style.Circle({
                radius : pointer.imageRadius,
                stroke : new ol.style.Stroke({
                    color : pointer.imageStrokeColor,
                    width : pointer.imageStrokeWidth
                }),
                fill : new ol.style.Fill({
                    color : pointer.imageFillColor
                })
            });
        }

        logger.trace("style start",  start);
        var _startStroke = null;
        if ( start instanceof ol.style.Stroke ) {
            logger.trace( "instance ol.style.Stroke for start drawing !" );
            _startStroke = start;
        } else {
            logger.trace( "use properties to define a style for start drawing !" );

            var defaultStyleStart = ElevationPath.DEFAULT_STYLES.DRAW.START;
            Object.keys(defaultStyleStart).forEach(function (key) {
                if (!start.hasOwnProperty(key)) {
                    start[key] = defaultStyleStart[key];
                    return;
                }
                if (key === "strokeWidth") {
                    var intValue = parseInt(start[key],10);
                    if (isNaN(intValue) || intValue < 0) {
                        console.log("Wrong value (" + start[key] + ") for strokeWidth. Must be a positive interger value." );
                        start[key] = defaultStyleStart[key];
                        return;
                    }
                    start[key] = intValue;
                }
            },this);

            // ligne : stroke
            _startStroke = new ol.style.Stroke({
                color : start.strokeColor,
                lineDash : start.strokeLineDash,
                width : start.strokeWidth
            });
        }

        this._drawStyleStart = new ol.style.Style({
                stroke : _startStroke,
                image : _pointerImage
        });

        logger.trace("style finish", finish);
        var _finishStroke = null;
        if ( finish instanceof ol.style.Stroke ) {
            logger.trace( "instance ol.style.Stroke for finish drawing !" );
            _finishStroke = finish;

        } else {
            logger.trace( "use properties to define a style for finish drawing !" );

            var defaultStyleFinish = ElevationPath.DEFAULT_STYLES.DRAW.FINISH;
            Object.keys(defaultStyleFinish).forEach(function (key) {
                if (!finish.hasOwnProperty(key)) {
                    finish[key] = defaultStyleFinish[key];
                    return;
                }
                if (key === "strokeWidth") {
                    var intValue = parseInt(finish[key],10);
                    if (isNaN(intValue) || intValue < 0) {
                        console.log("Wrong value (" + finish[key] + ") for strokeWidth. Must be a positive interger value." );
                        finish[key] = defaultStyleFinish[key];
                        return;
                    }
                    finish[key] = intValue;
                }
            },this);

            _finishStroke = new ol.style.Stroke({
                color : finish.strokeColor,
                lineDash : finish.strokeLineDash,
                width : finish.strokeWidth
            });
        }

        this._drawStyleFinish = new ol.style.Style({
            stroke : _finishStroke
        });
    };

    /**
    * create style graph
    *
    * @private
    */
    ElevationPath.prototype._createStylingProfile = function () {
        logger.trace("ElevationPath::_createStylingProfile");

        var userStyles = this.options.styles.profile;

        logger.trace("style profile", userStyles);

        var defaultStyle = ElevationPath.DEFAULT_STYLES.PROFILE;
        Object.keys(defaultStyle).forEach(function (key) {

            if (!userStyles.hasOwnProperty(key)) {
                // si le style user n'existe pas, on ajoute celui par defaut
                userStyles[key] = defaultStyle[key];
                return;
            } else {
                var _defaultStyle = defaultStyle[key];
                if ( typeof _defaultStyle === "object" ) {
                    // on merge avec un objet,
                    // les styles user ecrasent ceux par defaut...
                    Utils.mergeParams(_defaultStyle, userStyles[key]);
                    userStyles[key] = _defaultStyle;
                    return;
                }
            }

        },this);
    };

    // ################################################################### //
    // ################### Map interactions management ################### //
    // ################################################################### //

    /**
    * this method is called by this.onShowElevationPathClick,
    * and initialize a vector layer, if widget is active.
    *
    * @param {ol.Map} map - Map
    * @private
    */
    ElevationPath.prototype._initMeasureInteraction = function (map) {
        logger.trace("ElevationPath::_initMeasureInteraction()");

        // var map = this.getMap();
        if (!map) {
            return;
        }

        this._measureSource = new ol.source.Vector();

        this._measureVector = new ol.layer.Vector({
            source : this._measureSource,
            style : this._drawStyleFinish
        });

        map.addLayer(this._measureVector);
    };

    /**
    * this method is called by this.onShowElevationPathClick,
    * and add draw interaction to map, if widget is not active.
    *
    * @param {ol.Map} map - Map
    * @private
    */
    ElevationPath.prototype._addMeasureInteraction = function (map) {
        logger.trace("ElevationPath::_addMeasureInteraction()");

        // var map = this.getMap();
        if (!map) {
            return;
        }

        // Creates and adds the interaction
        this._measureDraw = new ol.interaction.Draw({
            source : this._measureSource,
            type : "LineString",
            style : this._drawStyleStart
        });

        this._measureDraw.setProperties({
            source : "ElevationPath"
        });

        map.addInteraction(this._measureDraw);

        // Event start
        var self = this;
        this._measureDraw.on("drawstart", function (evt) {
            logger.trace(evt);

            // delete marker current
            if (self._marker !== null) {
                self._measureSource.removeFeature(self._marker);
                self._marker = null;
            }

            // set new feature and remove last feature
            if (self._lastSketch !== null) {
                self._measureSource.removeFeature(self._lastSketch);
                self._lastSketch = null;
            }
            self._currentSketch = evt.feature;

            // and, all features
            var _features = self._measureSource.getFeatures();
            for (var i = 0; i < _features.length; i++) {
                self._measureSource.removeFeature(_features[i]);
            }

        }, this);

        // Event end
        this._measureDraw.on("drawend", function (evt) {
            logger.trace(evt);

            // set feature
            self._lastSketch = self._currentSketch;

            // set an alti request and display results

            // FIXME à revoir...
            // Si il n'y a pas de surcharge utilisateur de la fonction de recuperation des
            // resultats, on realise l'affichage du panneau
            if ( typeof self.options.service.onSuccess === "undefined" && self.options.profile.target === null) {
                self._panelContainer.style.display = "block";
                // self._panelContainer.style.visibility = "visible";
            }
            self._requestService();
        }, this);
    };

    /**
    * this method is called by this.onShowElevationPathClick,
    * and removes draw interaction from map (if exists)
    * And removes layer too...
    *
    * @param {ol.Map} map - Map
    * @private
    */
    ElevationPath.prototype._removeMeasureInteraction = function (map) {
        logger.trace("ElevationPath::_removeMeasureInteraction()");

        // var map = this.getMap();
        if (!map) {
            return;
        }

        if (this._measureVector) {
            map.removeLayer(this._measureVector);
            this._measureVector = null;
        }

        if (this._measureDraw) {
            map.removeInteraction(this._measureDraw);
            this._measureDraw = null;
        }
    };

    // ################################################################### //
    // ############################ Alti request ######################### //
    // ################################################################### //

    /**
    * transforme geometry feature to position coordinate (service)
    *
    * @private
    */
    ElevationPath.prototype._getGeometry = function () {

        // INFO
        // on transmet toujours des coordonnées au service en EPSG:4326

        if (this._currentSketch === null) {
            logger.warn("Current Feature undefined !?");
            return;
        }

        var geometry = [];

        var map  = this.getMap();
        var projSrc  = map.getView().getProjection();
        var projDest = "EPSG:4326";
        var coordinates = this._currentSketch.getGeometry().getCoordinates();
        for (var i = 0; i < coordinates.length; i++) {
            var xy = coordinates[i];
            var ll = xy;
            // on transmet au service des coordonnées en EPSG:4326
            if (projSrc !== projDest) {
                ll = ol.proj.transform(xy, projSrc, projDest);
            }
            geometry.push({
                lon : ll[0],
                lat : ll[1]
            });
        }

        return geometry;
    };

    /**
    * get geometry feature length
    *
    * @private
    */
    ElevationPath.prototype._getLength = function () {

        if (this._currentSketch === null) {
            logger.warn("Current Feature undefined !?");
            return;
        }

        var length = 0;

        var wgs84Sphere = new ol.Sphere(6378137);

        var map  = this.getMap();
        var projSrc  = map.getView().getProjection();
        var projDest = "EPSG:4326";

        var coordinates = this._currentSketch.getGeometry().getCoordinates();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], projSrc, projDest);
            var c2 = ol.proj.transform(coordinates[i + 1], projSrc, projDest);
            length += wgs84Sphere.haversineDistance(c1, c2);
        }

        return length;
    };

    /**
    * this method is called at the end of the path,
    * it generates and sends alti request, then displays results
    *
    * @private
    */
    ElevationPath.prototype._requestService = function () {
        logger.trace("ElevationPath::_requestService");

        // les coordonnées sont obligatoires
        var geometry = this._getGeometry();
        logger.trace("geometry", geometry);
        if ( ! geometry ) {
            logger.warn("missing geometry !?");
            return;
        }

        // oups, aucun droits !
        if (this._noRightManagement) {
            logger.warn("no rights to this service !");
            return;
        }

        // on construit les options pour la requête
        var options = {};

        // on surcharge avec les options de l'utilisateur
        Utils.mergeParams(options, this.options.service);

        // au cas où ...
        Utils.mergeParams(options, {
            apiKey : this.options.apiKey
        });

        // les callbacks
        var self = this;

        /** callback _requestServiceOnSuccess */
        var _requestServiceOnSuccess = function (result) {
            logger.trace(result);
            if (result) {
                self._panelContainer.style.display = "block";
                self._displayProfile(result.elevations);
                self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
                self._waiting = false;
            }
        };

        /** callback _requestServiceOnFailure */
        var _requestServiceOnFailure = function (error) {
            // on ferme le panneau en cas d'erreur !
            self._panelContainer.style.display = "none";
            // self._panelContainer.style.visibility = "hidden";
            logger.error(error.message);
            self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
            self._waiting = false;
        };

        Utils.mergeParams(options, {
            onSuccess : this.options.service.onSuccess || _requestServiceOnSuccess,
            onFailure : this.options.service.onFailure || _requestServiceOnFailure
        });

        // le sampling est soit defini par l'utilisateur (opts),
        // ou soit calculé dynamiquement...
        var sampling = options.sampling;
        if (!sampling) {

            // computing sampling
            var _sampling = 50;
            var _length = this._getLength();
            logger.trace("length", _length);
            var p = Math.floor(_length) / 5; // en mètre sur un pas moyen de 5m !
            if (p >= 200) {
                _sampling = 200;
            } else {
                _sampling = Math.floor(p);
            }

            Utils.mergeParams(options, {
                sampling : _sampling || 50
            });
        }

        // et enfin, la geometrie
        Utils.mergeParams(options, {
            positions : geometry
        });

        logger.trace("options du service", options);

        // mise en place de la patience
        this._waitingContainer.className = "GPelevationPathCalcWaitingContainerVisible";

        // Request altitude service
        Gp.Services.getAltitude(options);
    };

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
    ElevationPath.prototype._computeElevationMeasure = function (elevations) {
        logger.trace("ElevationPath::_computeElevationMeasure", elevations);

        var wgs84Sphere = new ol.Sphere(6378137);

        // Calcul de la distance au départ pour chaque point + arrondi des lat/lon
        elevations[0].dist = 0;
        var distance = 0;
        for (var i = 1; i < elevations.length; i++) {
            distance += (wgs84Sphere.haversineDistance([elevations[i].lon, elevations[i].lat], [elevations[i - 1].lon, elevations[i - 1].lat])) / 1000;
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
        for (var j = 0; j < elevations.length; j++) {
            var data = elevations[j];
            if (data.z < 0) {
                data.z = 0;
            }
            data.dist = Math.round(data.dist * coeffArrond) / coeffArrond;
        }

        return elevations;
    };

    /**
    * this method is called after service request (in case of success)
    * and display results
    *
    * @param {Array} elevations - array of elevation
    * @private
    */
    ElevationPath.prototype._displayProfile = function (elevations) {
        logger.trace("ElevationPath::_displayProfile", elevations);

        // data
        var data = this._computeElevationMeasure(elevations);

        // container
        var container = this.options.profile.target;
        if (container) {
            container.appendChild(this._panelContainer);
        }
        container = this._profileContainer;

        // TODO contexte ?
        var context = this;

        // fonction
        var displayFunction = this.options.profile.apply;

        // execution...
        displayFunction.call(this, data, container, context);

        // Calcul du profile
        // if ( typeof AmCharts !== "undefined" ) {
        //     // AmCharts, it's a variable global because i do the choice to put it on lib. external !
        //     console.log("Lib. AmCharts is loaded !");
        //     this._displayProfileWithAmCharts(data);
        //
        // } else if ( typeof d3 !== "undefined" ) {
        //     console.log("Lib. D3 is loaded !");
        //     this._displayProfileWithD3(data);
        //
        // } else {
        //     console.log("No library is loaded !");
        //     this._displayProfileResults(data);
        //
        // }
    };

    /**
    * NOT USE : display profile with simple results of service
    * TODO CSS externe pour id=profileElevationResults
    * TODO Style des points du profile
    *
    * @param {Array} data - array of elevation
    * @private
    */
    ElevationPath.prototype._displayProfileResults = function (data) {
        logger.trace("ElevationPath::_displayProfileResults", data);

        var container = this._profileContainer;

        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        // TODO CSS externe
        var div  = document.createElement("textarea");
        div.id = "profileElevationResults";
        div.rows = 10;
        div.cols = 50;
        div.style.width = "100%";
        div.innerHTML = JSON.stringify(data, undefined, 4);
        container.appendChild(div);

        this._profile = container;

        // symbolisation des points produits par le service
        // INFO orienté maintenance !
        if (this.options.debug) {
            var _proj = this.getMap().getView().getProjection();
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var _coordinate = ol.proj.transform([obj.lon, obj.lat], "EPSG:4326", _proj);
                var _geometry   = new ol.geom.Point(_coordinate);

                this._marker = new ol.Feature({
                    geometry : _geometry
                });
                logger.trace(_geometry);

                // TODO style en options ?
                var styles = ElevationPath.DEFAULT_STYLES.RESULTS;
                var _image = new ol.style.Circle({
                    radius : styles.imageRadius,
                    stroke : new ol.style.Stroke({
                        color : styles.imageStrokeColor,
                        width : styles.imageStrokeWidth
                    }),
                    fill : new ol.style.Fill({
                        color : styles.imageFillColor
                    })
                });
                this._marker.setStyle(new ol.style.Style({
                    image : _image
                }));

                // ajout du marker sur la map
                this._measureSource.addFeature(this._marker);
            }
        }
    };

    /**
    * NOT USE : display graphical profile with lib. D3
    * TODO gestion des styles utilisateurs (text) !
    * FIXME feature or overlay pour le deplacement du marker ?
    *
    * @param {Array} data - array of elevation
    * @private
    */
    ElevationPath.prototype._displayProfileWithD3 = function (data) {
        logger.trace("ElevationPath::_displayProfileWithD3", data);

        var container = this._profileContainer;

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

        var width  = container.clientWidth - margin.left - margin.right;
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

        /** suppression du marker */
        var _removeMarker = function () {
            // suppression de l'ancien marker
            if (self._marker) {
                self._measureSource.removeFeature(self._marker);
                self._marker = null;
            }
        };

        /** mise à jour du marker */
        var _updateMarker = function (d) {

            var map  = self.getMap();
            var proj = map.getView().getProjection();

            _removeMarker();

            var _coordinate = ol.proj.transform([d.lon, d.lat], "EPSG:4326", proj);
            var _geometry   = new ol.geom.Point(_coordinate);

            self._marker = new ol.Feature({
                geometry : _geometry
            });
            logger.trace(_geometry);

            // style
            self._marker.setStyle(self._markerStyle);

            // ajout du marker sur la map
            self._measureSource.addFeature(self._marker);
        };

        svg.append("rect")
            .attr("class", "overlay-d3")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function () {
                focus.style("display", null);

                _updateMarker(data[0]);

            })
            .on("mouseout", function () {
                focus.style("display", "none");

                _removeMarker();

                // tooltips
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", function () {

                var m = d3.mouse(this);
                var distance = x.invert(m[0]);
                var i = bisectDist(data, distance);

                var d0 = (i === 0) ? data[0] : data[i - 1];
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

                // mise à jour de la position du marker
                _updateMarker(d);

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

        this._profile = d3.selectAll("rect.overlay")[0][0];
    };

    /**
    * NOT USE : display graphical profile with lib.AmCharts
    * properties amcharts :
    * https://docs.amcharts.com/3/javascriptcharts/AmChart
    * FIXME feature or overlay pour le deplacement du marker ?
    *
    * @param {Array} data - array of elevation
    * @private
    */
    ElevationPath.prototype._displayProfileWithAmCharts = function (data) {
        logger.trace("ElevationPath::_displayProfileWithAmCharts", data);

        AmCharts.addInitHandler(function () {
            logger.trace("AmCharts::addInitHandler (event)");
        });

        // FIXME a ton besoin de nettoyer les listiners sur AmCharts ?
        // if (this._profile) {
        //     AmCharts.removeListener(this._profile, "changed", _onFollowProfilPathChanged);
        // }

        var _config = {};
        Utils.mergeParams(_config, this.options.styles.profile);
        Utils.mergeParams(_config, {
            dataProvider : data
        });
        this._profile = AmCharts.makeChart( this._profileContainer, _config);

        var self = this;
        /** _onFollowProfilePathChanged */
        var _onFollowProfilePathChanged = function (e) {
            logger.trace("AmCharts::changed (event)", e);
            var obj = e.chart.dataProvider[e.index];
            logger.trace(obj);

            var _proj = self.getMap().getView().getProjection();
            var _coordinate = ol.proj.transform([obj.lon, obj.lat], "EPSG:4326", _proj);
            var _geometry   = new ol.geom.Point(_coordinate);

            // suppression de l'ancien marker
            if (self._marker) {
                self._measureSource.removeFeature(self._marker);
                self._marker = null;
            }

            self._marker = new ol.Feature({
                geometry : _geometry
            });
            logger.trace(_geometry);

            // style
            self._marker.setStyle(self._markerStyle);

            // ajout du marker sur la map
            self._measureSource.addFeature(self._marker);
        };

        this._profile.addListener("changed", _onFollowProfilePathChanged);

    };

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
    * this method is called by event 'click' on '' picto
    * and enable or disable the entry of the path
    *
    * @private
    */
    ElevationPath.prototype.onShowElevationPathClick = function () {

        var map = this.getMap();
        var interactions = map.getInteractions().getArray() ;
        for (var i = 0 ; i < interactions.length ; i++ ) {
            // FIXME
            // on desactive les interactions parasites avec les mesures
            if (interactions[i].getActive() && interactions[i] instanceof ol.interaction.Draw) {
                var prop = interactions[i].getProperties();
                var src  = prop.source;
                if ( typeof src !== "undefined" && src === "Measure") {
                    interactions[i].setActive(false);
                }
            }
        }

        // Activation/Desactivation des interactions de dessins
        if (!this._showContainer.checked) {
            // on n'affiche pas la fenetre de profile s'il n'existe pas...
            if (this._profile === null) {
                this._panelContainer.style.display = "none";
                // this._panelContainer.style.visibility = "hidden";
            }
            this._initMeasureInteraction(map);
            this._addMeasureInteraction(map);
        } else {
            this._panelContainer.style.display = "none";
            // this._panelContainer.style.visibility = "hidden";
            this._removeMeasureInteraction(map);
            this.clear();
        }
    };

    return ElevationPath;
});
