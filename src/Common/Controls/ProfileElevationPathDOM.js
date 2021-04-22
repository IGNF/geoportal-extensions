/* globals AmCharts, d3 */
var ProfileElevationPathDOM = {

    /**
     * Gets a css property from an element
     *
     * @param {String} element The element to get the property from
     * @param {String} property The css property
     * @returns {String} The value of the property
     *
     * @see https://stackoverflow.com/questions/7444451/how-to-get-the-actual-rendered-font-when-its-not-defined-in-css
     */
    _getCssProperty : function (element, property) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    },

    /**
     * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
     *
     * @param {String} text The text to be rendered.
     * @param {String} container The container of the text
     * @returns {Number} The width of the text
     *
     * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
     */
    _getTextWidth : function (text, container) {
        // re-use canvas object for better performance
        var canvas = this.canvas || (this.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = `${this._getCssProperty(container, "font-weight")} ${this._getCssProperty(container, "font-size")} ${this._getCssProperty(container, "font-family")}`;
        var metrics = context.measureText(text);
        return metrics.width;
    },

    /**
     * Converts a data point z to svg y coord
     *
     * @param {Object} z The z to convert.
     * @param {Number} pathHeight The height of the path in the svg container in px
     * @param {Number} minGraphZ Min z of the graph
     * @param {Number} pxPerMZ Number of pixels per meter for the z (y) axis
     * @returns {Number} The y svg coordinate of the point
     *
     */
    _dataZToSvgY : function (z, pathHeight, minGraphZ, pxPerMZ) {
        return pathHeight - (z - minGraphZ) * pxPerMZ - 0.5;
    },

    /**
     * Converts a data point dist value to svg x coord
     *
     * @param {Number} dist The dist to convert
     * @param {Number} svgWidth The witdth of the svg container in px
     * @param {Number} pathWidth The witdth of the path in the svg container in px
     * @param {Number} pxPerMX Number of pixels per meter for the x axis
     * @returns {Array} The x svg coordinate of the point
     *
     */
    _dataDistToSvgX : function (dist, svgWidth, pathWidth, pxPerMX) {
        return (svgWidth - pathWidth) + dist * pxPerMX;
    },

    /**
     * Converts a svg x coord to dist value
     *
     * @param {Number} svgX The dist to convert
     * @param {Number} svgWidth The witdth of the svg container in px
     * @param {Number} pathWidth The witdth of the path in the svg container in px
     * @param {Number} pxPerMX Number of pixels per meter for the x axis
     * @returns {Array} The dist value
     *
     */
    _svgXToDataDist : function (svgX, svgWidth, pathWidth, pxPerMX) {
        return (svgX + pathWidth - svgWidth) / pxPerMX;
    },

    /**
     * Returns the index of value if it were inserted in sorted (by dist) array of data points.
     *
     * @param {Array} array Sorted array of data points (with dist property)
     * @param {Number} value Value to test the index of.
     * @returns {Number} The index the value would have.
     *
     */
    _arrayBisect : function (array, value) {
        let idx;
        if (array.length === 0) {
            return 0;
        }
        for (idx = 0; idx < array.length; idx++) {
            if (value < array[idx].dist) {
                return idx;
            }
        }
        return idx - 1;
    },

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

        if (!container) {
            return;
        }

        if (!data) {
            return;
        }

        // on nettoie toujours...
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const margin = {
            top : 25,
            right : 15,
            bottom : 10,
            left : 10
        };

        var _displayProfileOptions = self.options.displayProfileOptions;
        var _points = data.points;

        var sortedElev = JSON.parse(JSON.stringify(_points));
        sortedElev.sort(function (e1, e2) {
            return e1.z - e2.z;
        });

        var minZ = sortedElev[0].z;
        var maxZ = sortedElev[sortedElev.length - 1].z;
        var dist = data.distance;
        let distUnit = "m";

        const widgetDiv = document.createElement("div");
        widgetDiv.id = "profileElevationByDefault";
        container.appendChild(widgetDiv);

        // Détermination des tailles en pixels des éléments du widget
        const widgetHeigth = container.clientHeight - margin.top - margin.bottom;
        const widgetWidth = container.clientWidth - margin.left - margin.right;

        const zLabelWidth = 17;
        const zGradWidth = 8 + this._getTextWidth(Math.round(maxZ).toLocaleString() + ",88", container);
        const xLabelHeight = 17;
        const xGradHeight = 15;

        const minZguideHeigth = 15;
        const minXguideWidth = this._getTextWidth(Math.round(dist).toLocaleString(), container);
        const minNumXGuides = 1;

        const pathHeight = widgetHeigth - xLabelHeight - xGradHeight;
        const pathWidth = widgetWidth - zLabelWidth - zGradWidth;

        const elevationSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        elevationSvg.id = "profileElevationByDefaultSvg";
        elevationSvg.setAttribute("style", `width: ${widgetWidth}px; height: ${widgetHeigth}px; display: block; margin: auto; overflow: visible;`);

        // Détermination des guides en ordonnée :
        const maxNumZguides = Math.floor(pathHeight / minZguideHeigth);
        let gradZ;
        // Traitement du cas altitude max = altitude min
        if (maxZ === minZ) {
            gradZ = 0.1;
        } else {
            gradZ = Math.pow(10, (Math.ceil(Math.log((maxZ - minZ) / maxNumZguides) / Math.log(10)))) / 2;
        }
        let minGraphZ = Math.floor(minZ / gradZ) * gradZ;
        let maxGraphZ = Math.ceil(maxZ / gradZ) * gradZ;
        // cas où le path atteint pile les graduations extremes : ajout d'une gradiation
        if (maxGraphZ === maxZ) {
            maxGraphZ += gradZ;
        }
        // cas où gradZ < 1 : nombres flottants capricieux...
        minGraphZ = Math.round(minGraphZ * 100) / 100;
        maxGraphZ = Math.round(maxGraphZ * 100) / 100;

        let numZguides = Math.round((maxGraphZ - minGraphZ) / gradZ);

        // Si plus de guides que le max, on passe à une graduation de 10**x en 10**x (et non 10**x / 2)
        if (numZguides + 1 > maxNumZguides) {
            gradZ = Math.pow(10, (Math.ceil(Math.log((maxZ - minZ) / maxNumZguides) / Math.log(10))));
            minGraphZ = Math.floor(minZ / gradZ) * gradZ;
            maxGraphZ = Math.ceil(maxZ / gradZ) * gradZ;
            // cas où le path atteint pile les graduations extremes : ajout d'une gradiation
            if (maxGraphZ === maxZ) {
                maxGraphZ += gradZ;
            }
            // cas où gradZ < 1 : nombres flottants capricieux...
            minGraphZ = Math.round(minGraphZ * 100) / 100;
            maxGraphZ = Math.round(maxGraphZ * 100) / 100;
            numZguides = Math.floor((maxGraphZ - minGraphZ) / gradZ);
        }

        numZguides = Math.max(Math.round(numZguides), 1);

        const axisZ = document.createElementNS("http://www.w3.org/2000/svg", "g");
        axisZ.setAttribute("class", "profile-z-vertical");

        const guidesZ = document.createElementNS("http://www.w3.org/2000/svg", "g");

        const gradZyOffsetPx = pathHeight / numZguides;
        let pxPerMZ = pathHeight / (maxGraphZ - minGraphZ);
        // Traitement du cas altitude max = altitude min
        if (maxZ === minZ) {
            pxPerMZ = pathHeight / 0.2;
        } else {
            pxPerMZ = pathHeight / (maxGraphZ - minGraphZ);
        }

        let gradZtext;
        let yTextTranslation;
        let yStrokeTranslation;
        let gradZstroke;
        let gradZpath;
        let gradZgrad;
        // Ajout des graduations au graphique
        for (let i = 0; i <= numZguides; i++) {
            gradZtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
            gradZtext.setAttribute("class", "profile-z-graduation");
            // Cas où gradZ < 1 : nombres flottants capricieux...
            // Le Math.round est pour éviter des ennuis du genre 3 * 0.1 = 0.300000000000004
            gradZtext.textContent = (Math.round(100 * (minGraphZ + i * gradZ)) / 100).toLocaleString();

            yTextTranslation = pathHeight - i * gradZyOffsetPx;

            gradZtext.setAttribute("transform", `translate(${zLabelWidth + zGradWidth - 8}, ${yTextTranslation + 5})`);
            gradZtext.setAttribute("text-anchor", "end");
            axisZ.appendChild(gradZtext);

            yStrokeTranslation = Math.round(yTextTranslation) - 0.5;

            gradZstroke = document.createElementNS("http://www.w3.org/2000/svg", "g");
            gradZpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            gradZpath.setAttribute("cs", "100,100");
            gradZpath.setAttribute("stroke-width", "1");
            if (i !== 0) {
                gradZpath.setAttribute("stroke-opacity", "0.2");
            } else {
                gradZpath.setAttribute("stroke-opacity", "1");
            }
            gradZpath.setAttribute("stroke", "#000000");
            gradZpath.setAttribute("fill", "none");
            gradZpath.setAttribute("d", `M${zLabelWidth + zGradWidth},${yStrokeTranslation} L${pathWidth + zLabelWidth + zGradWidth},${yStrokeTranslation}`);

            gradZgrad = document.createElementNS("http://www.w3.org/2000/svg", "path");
            gradZgrad.setAttribute("cs", "100,100");
            gradZgrad.setAttribute("stroke-width", "1");
            gradZgrad.setAttribute("stroke-opacity", "1");
            gradZgrad.setAttribute("stroke", "#000000");
            gradZgrad.setAttribute("fill", "none");
            gradZgrad.setAttribute("d", `M${zLabelWidth + zGradWidth},${yStrokeTranslation} L${zLabelWidth + zGradWidth + 5},${yStrokeTranslation}`);
            gradZgrad.setAttribute("transform", "translate(-5, 0)");

            gradZstroke.appendChild(gradZgrad);
            gradZstroke.appendChild(gradZpath);
            guidesZ.appendChild(gradZstroke);
        }

        var axisZLegend = document.createElementNS("http://www.w3.org/2000/svg", "text");
        axisZLegend.setAttribute("class", "profile-z-legend");
        axisZLegend.textContent = "Altitude (m)";

        axisZLegend.setAttribute("transform", `translate(${zLabelWidth - 8}, ${Math.round(pathHeight / 2)}) rotate(-90)`);
        axisZLegend.setAttribute("text-anchor", "middle");

        axisZ.appendChild(axisZLegend);
        elevationSvg.appendChild(axisZ);
        elevationSvg.appendChild(guidesZ);

        // Détermination des guides en abscisse :
        // Passage éventuel en km
        if (dist > 2000) {
            dist /= 1000;
            distUnit = "km";
        }

        const maxNumXguides = Math.floor(pathWidth / minXguideWidth);
        let gradX = Math.pow(10, (Math.ceil(Math.log((dist) / maxNumXguides) / Math.log(10)))) / 2;
        const maxGraphX = dist;

        // Si plus de guides que le max, on passe à une graduation de 10**x en 10**x (et non 10**x / 2)
        let numXguides = Math.floor(maxGraphX / gradX);
        if (numXguides > maxNumXguides) {
            gradX = Math.pow(10, (Math.ceil(Math.log((dist) / maxNumXguides) / Math.log(10))));
            numXguides = Math.floor(maxGraphX / gradX);
        } else if (numXguides < minNumXGuides) {
            gradX = Math.pow(10, (Math.ceil(Math.log((dist) / maxNumXguides) / Math.log(10))) - 1);
            numXguides = Math.floor(maxGraphX / gradX);
        }

        numXguides = Math.max(numXguides, 1);
        const lastGradX = gradX * numXguides;

        const axisX = document.createElementNS("http://www.w3.org/2000/svg", "g");
        axisX.setAttribute("class", "profile-x-vertical");

        const guidesX = document.createElementNS("http://www.w3.org/2000/svg", "g");

        // Décalage des graduations pour que la dernière corresponde à la distance max
        const pxPerMX = pathWidth / maxGraphX;
        const xOffset = (maxGraphX - lastGradX) * pxPerMX;
        const gradXxOffsetPx = Math.round((pathWidth - xOffset) / numXguides);

        let gradXtext;
        let xTextTranslation;
        let xStrokeTranslation;
        let gradXstroke;
        let gradXpath;
        let gradXgrad;
        // Ajout des graduations au graphique
        for (let i = 0; i <= numXguides + 1; i++) {
            gradXtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
            gradXtext.setAttribute("class", "profile-x-graduation");

            // Exclusion du cas de la dernière graduation : correspond à la distance max : pas de texte
            if (i !== numXguides + 1) {
                // Cas où gradX < 1 : nombres flottants capricieux...
                gradXtext.textContent = (Math.round(100 * i * gradX) / 100).toLocaleString();
            }

            xTextTranslation = zLabelWidth + zGradWidth + i * gradXxOffsetPx;
            // Cas de la dernière graduation : correspond à la distance max
            if (i === numXguides + 1) {
                xTextTranslation = zLabelWidth + zGradWidth + pathWidth;
            }

            gradXtext.setAttribute("transform", `translate(${xTextTranslation}, ${pathHeight + xGradHeight + 5})`);
            gradXtext.setAttribute("text-anchor", "middle");
            axisX.appendChild(gradXtext);

            xStrokeTranslation = xTextTranslation - 0.5;

            gradXstroke = document.createElementNS("http://www.w3.org/2000/svg", "g");
            gradXpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            gradXpath.setAttribute("cs", "100,100");
            gradXpath.setAttribute("stroke-width", "1");
            if (i !== 0) {
                gradXpath.setAttribute("stroke-opacity", "0.2");
            } else {
                gradXpath.setAttribute("stroke-opacity", "1");
            }
            gradXpath.setAttribute("stroke", "#000000");
            gradXpath.setAttribute("fill", "none");
            gradXpath.setAttribute("d", `M${xStrokeTranslation},${pathHeight} L${xStrokeTranslation},0`);

            gradXgrad = document.createElementNS("http://www.w3.org/2000/svg", "path");
            gradXgrad.setAttribute("cs", "100,100");
            gradXgrad.setAttribute("stroke-width", "1");
            gradXgrad.setAttribute("stroke-opacity", "1");
            gradXgrad.setAttribute("stroke", "#000000");
            gradXgrad.setAttribute("fill", "none");
            gradXgrad.setAttribute("d", `M${xStrokeTranslation},${pathHeight} L${xStrokeTranslation},${pathHeight - 5}`);
            gradXgrad.setAttribute("transform", "translate(0, 5)");

            gradXstroke.appendChild(gradXgrad);
            gradXstroke.appendChild(gradXpath);
            guidesX.appendChild(gradXstroke);
        }

        var axisXLegend = document.createElementNS("http://www.w3.org/2000/svg", "text");
        axisXLegend.setAttribute("class", "profile-x-legend");
        axisXLegend.textContent = `Distance (${distUnit})`;

        axisXLegend.setAttribute("transform", `translate(${zLabelWidth + zGradWidth + pathWidth / 2}, ${pathHeight + xGradHeight + xLabelHeight + 3})`);
        axisXLegend.setAttribute("text-anchor", "middle");

        axisX.appendChild(axisXLegend);
        elevationSvg.appendChild(axisX);
        elevationSvg.appendChild(guidesX);

        const elevationPathG = document.createElementNS("http://www.w3.org/2000/svg", "g");

        let factor = 1;
        if (distUnit === "km") {
            factor = 1000;
        }

        let pointX = this._dataDistToSvgX(_points[0].dist / factor, widgetWidth, pathWidth, pxPerMX);
        let pointY = this._dataZToSvgY(_points[0].z, pathHeight, minGraphZ, pxPerMZ);
        let pathD = `M${pointX},${pointY}`;

        for (let i = 1; i < _points.length; i++) {
            pointX = this._dataDistToSvgX(_points[i].dist / factor, widgetWidth, pathWidth, pxPerMX);
            pointY = this._dataZToSvgY(_points[i].z, pathHeight, minGraphZ, pxPerMZ);
            pathD += ` L${pointX},${pointY}`;
        }

        const pathPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathPath.setAttribute("cs", "100,100");
        pathPath.setAttribute("stroke-width", "1");
        pathPath.setAttribute("stroke-opacity", "1");
        pathPath.setAttribute("stroke", "#0B6BA7");
        pathPath.setAttribute("fill", "none");
        pathPath.setAttribute("d", pathD);

        // Fermeture du path pour le fill
        pathD += ` L${pointX},${pathHeight}`;
        pathD += ` L${widgetWidth - pathWidth},${pathHeight}`;

        const pathFill = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathFill.setAttribute("cs", "100,100");
        pathFill.setAttribute("stroke-width", "1");
        pathFill.setAttribute("stroke-opacity", "0");
        pathFill.setAttribute("stroke", "#000000");
        pathFill.setAttribute("fill", "#00B798");
        pathFill.setAttribute("fill-opacity", "0.4");
        pathFill.setAttribute("d", pathD);

        elevationPathG.appendChild(pathPath);
        elevationPathG.appendChild(pathFill);
        elevationSvg.appendChild(elevationPathG);

        // Mise en place de l'écouteur d'évènement : pour l'affichage dynamique
        const dynamicsG = document.createElementNS("http://www.w3.org/2000/svg", "g");
        // Pour écouter la position de la souris
        const pathRectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        pathRectangle.setAttribute("width", pathWidth);
        pathRectangle.setAttribute("height", pathHeight);
        pathRectangle.setAttribute("transform", `translate(${widgetWidth - pathWidth},0)`);
        pathRectangle.setAttribute("visibility", "hidden");
        pathRectangle.setAttribute("pointer-events", "all");

        const sortedDist = JSON.parse(JSON.stringify(_points));
        sortedDist.sort(function (e1, e2) {
            return e1.dist - e2.dist;
        });

        const focusLineX = document.createElementNS("http://www.w3.org/2000/svg", "line");
        focusLineX.setAttribute("id", "focusLineX");
        focusLineX.setAttribute("class", "focusLine-default");
        focusLineX.setAttribute("fill", "none");
        focusLineX.setAttribute("stroke", "#F90");
        focusLineX.setAttribute("stroke-width", "0.5px");
        focusLineX.setAttribute("visibility", "hidden");

        const focusLineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
        focusLineY.setAttribute("id", "focusLineY");
        focusLineY.setAttribute("class", "focusLine-default");
        focusLineY.setAttribute("fill", "none");
        focusLineY.setAttribute("stroke", "#F90");
        focusLineY.setAttribute("stroke-width", "0.5px");
        focusLineY.setAttribute("visibility", "hidden");

        const focusCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        focusCircle.setAttribute("id", "focusCircle");
        focusCircle.setAttribute("r", 4);
        focusCircle.setAttribute("class", "circle-default focusCircle-default");
        focusCircle.setAttribute("fill", "#F90");
        focusCircle.setAttribute("visibility", "hidden");

        dynamicsG.appendChild(focusCircle);
        dynamicsG.appendChild(focusLineX);
        dynamicsG.appendChild(focusLineY);

        // Tooltip
        const tooltipDiv = document.createElement("div");
        const altiSpan = document.createElement("span");
        const br = document.createElement("br");
        const slopeSpan = document.createElement("span");
        const br2 = document.createElement("br");
        const coordsSpan = document.createElement("span");

        tooltipDiv.setAttribute("style", "text-align:center; max-width:220px; font-size:10px; color:#000000; font-family:Verdana;");
        tooltipDiv.style.pointerEvents = "none";
        tooltipDiv.style.position = "fixed";
        // tooltipDiv.classList.add("tooltipInit");
        // IE...
        tooltipDiv.setAttribute("class", "tooltipInit");

        widgetDiv.appendChild(tooltipDiv);

        altiSpan.setAttribute("class", "altiPathValue");
        slopeSpan.setAttribute("class", "altiPathValue");
        coordsSpan.setAttribute("class", "altiPathCoords");

        tooltipDiv.appendChild(altiSpan);
        tooltipDiv.appendChild(br);
        if (_displayProfileOptions.currentSlope) {
            tooltipDiv.appendChild(slopeSpan);
            tooltipDiv.appendChild(br2);
        }
        tooltipDiv.appendChild(coordsSpan);

        const tooltipG = document.createElementNS("http://www.w3.org/2000/svg", "g");

        dynamicsG.appendChild(tooltipG);

        const tooltipBubble = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tooltipBubble.setAttribute("cs", "100,100");
        tooltipBubble.setAttribute("fill", "#FFFFFF");
        tooltipBubble.setAttribute("stroke", "#CCCCCC");
        tooltipBubble.setAttribute("fill-opacity", "0.8");
        tooltipBubble.setAttribute("stroke-width", "1");
        tooltipBubble.setAttribute("stroke-opacity", "1");

        const tooltipBubbleShadow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tooltipBubbleShadow.setAttribute("cs", "100,100");
        tooltipBubbleShadow.setAttribute("fill", "#FFFFFF");
        tooltipBubbleShadow.setAttribute("stroke", "#000000");
        tooltipBubbleShadow.setAttribute("fill-opacity", "0");
        tooltipBubbleShadow.setAttribute("stroke-width", "1");
        tooltipBubbleShadow.setAttribute("stroke-opacity", "0.4");
        tooltipBubbleShadow.setAttribute("transform", "translate(1,1)");

        tooltipG.appendChild(tooltipBubbleShadow);
        tooltipG.appendChild(tooltipBubble);

        // tooltipG.classList.add("tooltipInit");
        // IE... deprecated
        tooltipG.setAttribute("class", "tooltipInit");
        tooltipG.style.pointerEvents = "none";

        pathRectangle.addEventListener("mouseover", function () {
            focusLineX.setAttribute("visibility", "visible");
            focusLineY.setAttribute("visibility", "visible");
            focusCircle.setAttribute("visibility", "visible");
            className.__createProfileMarker(self, _points[0]);

            // tooltips
            // tooltipDiv.classList.remove("tooltipInit");
            // tooltipG.classList.remove("tooltipInit");
            // tooltipDiv.classList.remove("tooltipFadeOut");
            // tooltipG.classList.remove("tooltipFadeOut");
            // tooltipDiv.classList.add("tooltipFadeIn");
            // tooltipG.classList.add("tooltipFadeIn");
            // IE... deprecated
            tooltipDiv.setAttribute("class", "tooltipFadeIn");
            tooltipG.setAttribute("class", "tooltipFadeIn");
        });

        pathRectangle.addEventListener("mouseout", function () {
            focusLineX.setAttribute("visibility", "hidden");
            focusLineY.setAttribute("visibility", "hidden");
            focusCircle.setAttribute("visibility", "hidden");
            className.__removeProfileMarker(self);
            // tooltips
            // tooltipDiv.classList.remove("tooltipFadeIn");
            // tooltipG.classList.remove("tooltipFadeIn");
            // tooltipDiv.classList.add("tooltipFadeOut");
            // tooltipG.classList.add("tooltipFadeOut");
            // IE... deprecated
            tooltipDiv.setAttribute("class", "tooltipFadeOut");
            tooltipG.setAttribute("class", "tooltipFadeOut");
        });

        pathRectangle.addEventListener("mousemove", function (e) {
            const mousePoint = elevationSvg.createSVGPoint();
            mousePoint.x = e.clientX;
            mousePoint.y = e.clientY;
            const svgMousePoint = mousePoint.matrixTransform(elevationSvg.getScreenCTM().inverse());
            const mouseDist = this._svgXToDataDist(svgMousePoint.x, widgetWidth, pathWidth, pxPerMX) * factor;

            // Math.max pour éviter de sortir de l'array
            const distIndex = Math.max(1, this._arrayBisect(sortedDist, mouseDist));

            const d0 = _points[distIndex - 1];
            const d1 = _points[distIndex];
            let d = d0;
            if (mouseDist - d0.dist > d1.dist - mouseDist) {
                d = d1;
            }

            const focusX = this._dataDistToSvgX(d.dist / factor, widgetWidth, pathWidth, pxPerMX);
            const focusY = this._dataZToSvgY(d.z, pathHeight, minGraphZ, pxPerMZ);

            // Mise à jour des éléments graphiques
            focusCircle.setAttribute("cx", focusX);
            focusCircle.setAttribute("cy", focusY);

            focusLineX.setAttribute("x1", focusX);
            focusLineX.setAttribute("y1", pathHeight);
            focusLineX.setAttribute("x2", focusX);
            focusLineX.setAttribute("y2", 0);

            focusLineY.setAttribute("x1", zLabelWidth + zGradWidth);
            focusLineY.setAttribute("y1", focusY);
            focusLineY.setAttribute("x2", pathWidth + zLabelWidth + zGradWidth);
            focusLineY.setAttribute("y2", focusY);

            className.__updateProfileMarker(self, d);

            // Mise à jour du tooltip
            const altiSpanTxt = `Altitude : ${d.z.toLocaleString()} m`;
            const slopeSpanTxt = `Pente : ${d.slope} %`;
            const coordsSpanTxt = `(lat : ${d.lat.toLocaleString()} / lon : ${d.lon.toLocaleString()})`;

            altiSpan.innerHTML = altiSpanTxt;
            slopeSpan.innerHTML = slopeSpanTxt;
            coordsSpan.innerHTML = coordsSpanTxt;

            const tooltipTextWidth = Math.max(
                this._getTextWidth(coordsSpanTxt, coordsSpan),
                this._getTextWidth(altiSpanTxt, altiSpan)
            );

            let tooltipDivLeft = elevationSvg.getBoundingClientRect().left + window.pageXOffset + focusX;
            const tooltipDivTop = elevationSvg.getBoundingClientRect().top + window.pageYOffset + focusY - 19;

            let toolTipBubbleD;
            if (d.dist > (dist * factor) / 2) {
                toolTipBubbleD = `M -0.5 -0.5 l -6 6 l 0 16 l -${tooltipTextWidth + 5} 0 l 0 -44 l ${tooltipTextWidth + 5} 0 l 0 16 l 6 6`;
                tooltipDivLeft -= tooltipTextWidth;
            } else if (d.dist <= (dist * factor) / 2) {
                toolTipBubbleD = `M -0.5 -0.5 l 6 6 l 0 16 l ${tooltipTextWidth + 5} 0 l 0 -44 l -${tooltipTextWidth + 5} 0 l 0 16 l -6 6`;
                // Largeur de la fleche de la bulle du tooltip
                tooltipDivLeft += 15;
            }

            tooltipBubble.setAttribute("d", toolTipBubbleD);
            tooltipBubbleShadow.setAttribute("d", toolTipBubbleD);

            tooltipG.setAttribute("transform", `translate(${focusX},${focusY})`); // IE11 !
            tooltipG.style.transform = `translate(${focusX}px,${focusY}px)`;

            tooltipDiv.style.left = `${tooltipDivLeft}px`;
            tooltipDiv.style.top = `${tooltipDivTop}px`;
        }.bind(this));

        dynamicsG.appendChild(pathRectangle);
        elevationSvg.appendChild(dynamicsG);

        widgetDiv.appendChild(elevationSvg);

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
        if (!container) {
            return;
        }

        // on nettoie toujours...
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var _points = (data && data.points) ? data.points : {};

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

        if (!container) {
            return;
        }

        if (!data) {
            return;
        }

        // on nettoie toujours...
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var _points = data.points;

        if (data.distance > 2000) {
            data.unit = "km";
            for (let i = 0; i < _points.length; i++) {
                _points[i].dist /= 1000;
            }
        }

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
                // Math.max pour éviter de sortir de l'array
                var i = Math.max(1, bisectDist(_points, distance));

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

        if (!container) {
            return;
        }

        if (!data) {
            return;
        }

        var _points = data.points;

        var ballonText = "<span class='altiPathValue'>[[title]] : [[value]]m</span><br/>";
        var currentSlope = self.options.displayProfileOptions.currentSlope;
        if (currentSlope) {
            ballonText += "<span class='altiPathValue'>Pente : [[slope]] %</span><br/>";
        }
        ballonText += "<span class='altiPathCoords'>(Lat: [[lat]] / Lon:[[lon]])</span>";

        AmCharts.addInitHandler(function () {});

        if (data.distance > 2000) {
            data.unit = "km";
            for (let i = 0; i < _points.length; i++) {
                _points[i].dist /= 1000;
            }
        }

        for (let i = 0; i < _points.length; i++){
          var dist = _points[i].dist;
          var coeffArrond = 100;
          if (dist > 100) {
              coeffArrond = 1;
          } else if (dist > 10) {
              coeffArrond = 10;
          }

          // Correction arrondi distance totale
          dist = Math.round(dist * coeffArrond) / coeffArrond;
          _points[i].dist = dist;
        }

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
                thousandsSeparator : " "
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
