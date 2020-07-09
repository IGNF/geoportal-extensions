/* globals AmCharts, d3 */
var ProfileElevationPathDOM = {

    /**
     * Display Profile function used by default : no additonal framework needed.
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     * @param {Object} className - calling class (ie ElevationPath)
     * @returns {DOMElement} profil container
     */
    displayProfileByDefault : function (data, container, context, className) {
        var self = context;

        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        if (!data) {
            return;
        }

        var _displayProfileOptions = self.options.displayProfileOptions;

        var _points = data.points;

        var sortedElev = JSON.parse(JSON.stringify(_points));
        sortedElev.sort(function (e1, e2) {
            return e1.z - e2.z;
        });

        var minZ = sortedElev[0].z;
        var maxZ = sortedElev[sortedElev.length - 1].z;
        var diff = maxZ - minZ;
        var dist = data.distance;
        var unit = data.unit;
        // var distMin = 0;
        var barwidth = 100 / _points.length;

        var div = document.createElement("div");
        div.id = "profileElevationByDefault";
        container.appendChild(div);

        var divBox = document.createElement("div");
        divBox.className = "profile-box";

        var divZ = document.createElement("div");
        divZ.className = "profile-z-vertical";
        var ulZ = document.createElement("ul");
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
        divData.addEventListener("mouseover", function (e) {
            var _lon = parseFloat(e.target.dataset["lon"]);
            var _lat = parseFloat(e.target.dataset["lat"]);

            if (_lon && _lat) {
                className.__createProfileMarker(self, {
                    lat : _lat,
                    lon : _lon
                });
            }
        });
        divData.addEventListener("mousemove", function (e) {
            var _lon = parseFloat(e.target.dataset["lon"]);
            var _lat = parseFloat(e.target.dataset["lat"]);

            if (_lon && _lat) {
                className.__updateProfileMarker(self, {
                    lat : _lat,
                    lon : _lon
                });
            }
        });
        divData.addEventListener("mouseout", function () {
            className.__removeProfileMarker(self);
        });

        var ulData = document.createElement("ul");
        ulData.id = "profile-data";
        ulData.className = "profile-z-axis profile-x-axis";
        divData.appendChild(ulData);

        for (var i = 0; i < _points.length; i++) {
            var d = _points[i];
            var li = document.createElement("li");
            li.setAttribute("data-z", d.z);
            li.setAttribute("data-lon", d.lon);
            li.setAttribute("data-lat", d.lat);
            li.setAttribute("data-dist", d.dist);

            var pct = Math.floor((d.z - minZ) * 100 / diff);
            li.setAttribute("class", "percent v" + pct);
            li.title = "Altitude : " + d.z + "m";
            if (_displayProfileOptions.currentSlope) {
                li.title += " - Pente : " + d.slope + "%";
            }
            li.title += " (Lat : " + d.lat + " / Lon : " + d.lon + ")";

            li.setAttribute("style", "width: " + barwidth + "%");
            ulData.appendChild(li);
        }

        divBox.appendChild(divData);
        div.appendChild(divBox);

        var divX = document.createElement("div");
        divX.className = "profile-x-horizontal";
        var ulX = document.createElement("ul");
        var liXmin = document.createElement("li");
        liXmin.setAttribute("class", "profile-min-x");
        liXmin.innerHTML = "";
        var liXmax = document.createElement("li");
        liXmax.setAttribute("class", "profile-max-x");
        liXmax.innerHTML = dist + " " + unit;
        ulX.appendChild(liXmin);
        ulX.appendChild(liXmax);
        divX.appendChild(ulX);
        div.appendChild(divX);

        return container;
    },

    /**
     * Display Profile without graphical rendering (raw service response)
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     * @param {Object} className - calling class (ie ElevationPath)
     * @returns {DOMElement} profil container
     */
    displayProfileRaw : function (data, container, context, className) {
        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        var _points = data.points;

        var div = document.createElement("textarea");
        div.id = "profilElevationResults";
        div.rows = 10;
        div.cols = 50;
        div.style.width = "100%";
        div.innerHTML = JSON.stringify(_points, undefined, 4);
        div.addEventListener("mouseover", function (e) {
            className.__customRawProfileMouseOverEvent(context, e);
        });

        // TODO
        // for (var i = 0; i < _points.length; i++) {
        //     var point = _points[i];
        //     var divC  = document.createElement("code");
        //     divC.id = "point_" + i;
        //     divC.innerHTML = JSON.stringify(point, undefined, 4);
        //     div.appendChild(divC);
        //     divC.addEventListener("mouseover", function (e) {
        //          className.__customRawProfileMouseOverEvent(context, e);
        //     });
        // }

        container.appendChild(div);

        return container;
    },

    /**
     * Display Profile using D3 javascript framework. This method needs D3 libraries to be loaded.
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     * @param {Object} className - calling class (ie ElevationPath)
     * @returns {DOMElement} profil container
     */
    displayProfileLibD3 : function (data, container, context, className) {
        var self = context;

        // on nettoie toujours...
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        var _points = data.points;

        var _displayProfileOptions = self.options.displayProfileOptions;

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

        var xDomain = d3.extent(_points, function (d) {
            return d.dist;
        });
        x.domain(xDomain);

        var yDomain = [
            0,
            d3.max(_points, function (d) {
                return d.z;
            })
        ];
        y.domain(yDomain);

        svg.append("path")
            .datum(_points)
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
            .text("Distance (" + data.unit + ")");

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
            .datum(_points)
            .attr("class", "line-d3")
            .attr("d", line);

        svg.selectAll("circle")
            .data(_points)
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

        svg.append("rect")
            .attr("class", "overlay-d3")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function () {
                focus.style("display", null);
                className.__createProfileMarker(self, _points[0]);
            })
            .on("mouseout", function () {
                focus.style("display", "none");
                className.__removeProfileMarker(self);

                // tooltips
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", function () {
                var m = d3.mouse(this);
                var distance = x.invert(m[0]);
                var i = bisectDist(_points, distance);

                var d0 = _points[i - 1];
                var d1 = _points[i];
                var d = distance - d0[0] > d1[0] - distance ? d1 : d0;

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

                className.__updateProfileMarker(self, d);

                // tooltips
                div.transition()
                    .duration(200)
                    .style("opacity", 0.9);

                var _message = "";
                _message += " Altitude : " + d.z + " m";
                if (_displayProfileOptions.currentSlope) {
                    _message += "<br/> Pente : " + d.slope + " %";
                }
                _message += "<br/> (Lat : " + d.lat + "/ Lon : " + d.lon + ")";

                div.html(_message)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            });

        // return d3.selectAll("rect.overlay")[0][0];
        return svg;
    },

    /**
     * Display Profile using Amcharts framework. This method needs AmCharts libraries to be loaded.
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     * @param {Object} className - calling class (ie ElevationPath)
     * @returns {DOMElement} profil container
     */
    displayProfileLibAmCharts : function (data, container, context, className) {
        var self = context;

        var _points = data.points;

        var ballonText = "<span class='altiPathValue'>[[title]] : [[value]]m</span><br/>";
        var currentSlope = self.options.displayProfileOptions.currentSlope;
        if (currentSlope) {
            ballonText += "<span class='altiPathValue'>Pente : [[slope]] %</span><br/>";
        }
        ballonText += "<span class='altiPathCoords'>(Lat: [[lat]] / Lon:[[lon]])</span>";

        AmCharts.addInitHandler(function () {});

        var settings = {
            type : "serial",
            pathToImages : "http://cdn.amcharts.com/lib/3/images/",
            categoryField : "dist",
            autoMarginOffset : 0,
            marginRight : 10,
            marginTop : 10,
            startDuration : 0,
            color : "#5E5E5E",
            fontSize : 8,
            theme : "light",
            thousandsSeparator : "",
            numberFormatter : {
                precision : -1,
                decimalSeparator : ",",
                thousandsSeparato : " "
            },
            categoryAxis : {
                color : "#5E5E5E",
                gridPosition : "start",
                minHorizontalGap : 40,
                tickPosition : "start",
                title : "Distance (" + data.unit + ")",
                titleColor : "#5E5E5E",
                labelOffset : 0,
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
            graphs : [{
                balloonColor : "#CCCCCC",
                balloonText : ballonText,
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
            }],
            guides : [],
            valueAxes : [{
                id : "ValueAxis-1",
                minVerticalGap : 20,
                title : "Altitude (m)"
            }],
            balloon : {
                borderColor : "#CCCCCC",
                borderThickness : 1,
                fillColor : "#FFFFFF",
                showBullet : true
            },
            titles : [],
            allLabels : [],
            dataProvider : _points
        };

        var _containerProfile = AmCharts.makeChart(container, settings);

        _containerProfile.addListener("changed", function (e) {
            var obj = e.chart.dataProvider[e.index];
            className.__updateProfileMarker(self, obj);
        });

        return _containerProfile;
    }
};

export default ProfileElevationPathDOM;
