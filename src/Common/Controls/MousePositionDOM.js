define([], function () {

    "use strict";

    var MousePositionDOM = {

        /**
        * Main container (DOM)
        *
        * @returns {DOMElement} DOM element
        */
        _createMainContainerElement : function () {

            var container = document.createElement("div");
            container.id  = "GPmousePosition";
            container.className = "GPwidget";
            return container;
        },

        // ################################################################### //
        // ################### Methods of main container ##################### //
        // ################################################################### //

        /**
        * Hidden checkbox for minimizing/maximizing
        *
        * @returns {DOMElement} DOM element
        */
        _createShowMousePositionElement : function () {

            var input  = document.createElement("input");
            input.id   = "GPshowMousePosition";
            input.type = "checkbox";
            return input;
        },

        /**
        * Show mouse position control
        *
        * @returns {DOMElement} DOM element
        */
        _createShowMousePositionPictoElement : function (isDesktop) {

            // contexte d'execution
            var context = this;

            var label = document.createElement("label");
            label.id  = "GPshowMousePositionPicto";
            label.className = "GPshowAdvancedToolPicto";
            label.htmlFor = "GPshowMousePosition";
            label.title = "Afficher les coordonnées du curseur";

            // FIXME detection disponible dans le JS !
            // Detection : test for desktop or tactile
            // var isDesktop = true;
            // var userAgent = window.navigator.userAgent.toLowerCase();
            // if (userAgent.indexOf("iphone") !== -1 ||
            // userAgent.indexOf("ipod") !== -1 ||
            // userAgent.indexOf("ipad") !== -1 ||
            // userAgent.indexOf("android") !== -1 ||
            // userAgent.indexOf("mobile") !== -1 ||
            // userAgent.indexOf("blackberry") !== -1 ||
            // userAgent.indexOf("tablet") !== -1 ||
            // userAgent.indexOf("phone") !== -1 ||
            // userAgent.indexOf("touch") !== -1 ) {
            //     isDesktop = false;
            // }
            // if (userAgent.indexOf("msie") !== -1 ||
            // userAgent.indexOf("trident") !== -1) {
            //     isDesktop = true;
            // }

            // Show map center localisation if panel opened and tactile support
            label.addEventListener("click", function (e) {
                var mapCenterClass = "";
                if (!document.getElementById("GPshowMousePosition").checked && !isDesktop) {
                    mapCenterClass = "GPmapCenterVisible";
                }
                document.getElementById("GPmapCenter").className = mapCenterClass;
                context.onShowMousePositionClick(e);
            });

            var spanOpen = document.createElement("span");
            spanOpen.id  = "GPshowMousePositionOpen";
            spanOpen.className  = "GPshowAdvancedToolOpen";
            label.appendChild(spanOpen);

            return label;
        },

        /**
        * mouse position panel
        *
        * FIXME
        * don't call this._createMousePositionSettingsElement
        *
        * @returns {DOMElement} DOM element
        */
        _createMousePositionPanelElement : function (displayAltitude, displayCoordinates) {

            // FIXME test pour la portabilité entre leaflet et ol3
            displayAltitude   = displayAltitude   ? true : ( typeof displayAltitude   === "undefined") ? true : false;
            displayCoordinates = displayCoordinates ? true : ( typeof displayCoordinates === "undefined") ? true : false;

            var div = document.createElement("div");
            div.id   = "GPmousePositionPanel";
            div.className = "GPpanel";

            div.appendChild(this._createMousePositionPanelHeaderElement());
            div.appendChild(this._createMousePositionPanelBasicElement(displayAltitude, displayCoordinates));

            var arraySettings = this._createShowMousePositionSettingsElement(displayCoordinates);
            for (var j = 0; j < arraySettings.length; j++) {
                div.appendChild(arraySettings[j]);
            }

            // FIXME on decompose la fonction pour les besoins du controle,
            // on ajoutera ces childs à la main...
            // div.appendChild(this._createMousePositionSettingsElement());

            return div;

        },

        /** Map center localisation (tactile use) */
        _createMapCenter : function () {
            var div = document.createElement("div");
            div.id   = "GPmapCenter";
            div.className = "";
            return div;
        },

        // ################################################################### //
        // ####################### Panel container ########################### //
        // ################################################################### //

        /** ... */
        _createMousePositionPanelHeaderElement : function () {

            var container = document.createElement("div");
            container.className = "GPpanelHeader";

            var divTitle = document.createElement("div");
            divTitle.className = "GPpanelTitle";
            divTitle.innerHTML = "Coordonnées";
            container.appendChild(divTitle);

            var divClose = document.createElement("div");
            divClose.id = "GPmousePositionPanelClose";
            divClose.className = "GPpanelClose";
            divClose.title = "Fermer le panneau";

            // Link panel close / visibility checkbox
            if (divClose.addEventListener) {
                divClose.addEventListener("click", function () {
                    document.getElementById("GPshowMousePositionPicto").click();
                }, false);
            } else if (divClose.attachEvent) {
                divClose.attachEvent("onclick", function () {
                    document.getElementById("GPshowMousePositionPicto").click();
                });
            }

            container.appendChild(divClose);

            return container;
        },

        /**
        * coordinate panel
        *
        * FIXME
        * call this._createMousePositionPanelBasicCoordinateElement
        * call this._createMousePositionPanelBasicAltitudeElement
        *
        * @returns {DOMElement} DOM element
        */
        _createMousePositionPanelBasicElement : function (displayAltitude, displayCoordinates) {

            var container = document.createElement("div");
            container.id = "GPmousePositionBasicPanel";

            // FIXME on devrait decomposer la fonction pour les besoins du controle,
            // on ajoutera ces childs à la main...
            container.appendChild(this._createMousePositionPanelBasicCoordinateElement(displayCoordinates));
            container.appendChild(this._createMousePositionPanelBasicAltitudeElement(displayAltitude));

            return container;

        },

        /** ... */
        _createMousePositionPanelBasicCoordinateElement : function (display) {

            var div = document.createElement("div");
            div.id = "GPmousePositionCoordinate";
            div.style.display = display ? "block" : "none";

            var spanLat = document.createElement("span");
            spanLat.className  = "GPmousePositionLabel";
            spanLat.id = "GPmousePositionLatLabel";
            spanLat.innerHTML = "Latitude : ";
            div.appendChild(spanLat);

            var spanCLat = document.createElement("span");
            spanCLat.className  = "GPmousePositionCoords";
            spanCLat.id = "GPmousePositionLat";
            spanCLat.innerHTML = "";
            div.appendChild(spanCLat);

            var spanLon = document.createElement("span");
            spanLon.className  = "GPmousePositionLabel";
            spanLon.id = "GPmousePositionLonLabel";
            spanLon.innerHTML = "Longitude : ";
            div.appendChild(spanLon);

            var spanCLon = document.createElement("span");
            spanCLon.className  = "GPmousePositionCoords";
            spanCLon.id = "GPmousePositionLon";
            spanCLon.innerHTML = "";
            div.appendChild(spanCLon);

            return div;
        },

        /** ... */
        _createMousePositionPanelBasicAltitudeElement : function (display) {

            var div = document.createElement("div");
            div.id  = "GPmousePositionAltitude";
            div.style.display = display ? "block" : "none";

            var spanLabel = document.createElement("span");
            spanLabel.className  = "GPmousePositionLabel";
            spanLabel.innerHTML = "Altitude : ";
            div.appendChild(spanLabel);

            var spanAlt = document.createElement("span");
            spanAlt.className  = "GPmousePositionCoords";
            spanAlt.id = "GPmousePositionAlt";
            spanAlt.innerHTML = "";
            div.appendChild(spanAlt);

            return div;
        },

        // ################################################################### //
        // #################### Settings container ########################### //
        // ################################################################### //

        /** ... */
        _createShowMousePositionSettingsElement : function (display) {

            var list = [];

            var input = document.createElement("input");
            input.type = "checkbox";
            input.id = "GPshowMousePositionSettings";

            var label = document.createElement("label");
            label.id = "GPshowMousePositionSettingsPicto";
            label.htmlFor = "GPshowMousePositionSettings";
            label.title = "Réglages";
            label.className = "GPshowMoreOptions GPshowMousePositionSettingsPicto";
            label.style.display = display ? "block" : "none";

            list.push(input);
            list.push(label);

            return list;
        },

        /**
        * settings panel
        *
        * FIXME
        * don't call this._createMousePositionSettingsSystemsElement
        * don't call this._createMousePositionSettingsUnitsElement
        *
        * @returns {DOMElement} DOM element
        */
        _createMousePositionSettingsElement : function () {

            var container = document.createElement("div");
            container.id  = "GPmousePositionSettings";

            var span = document.createElement("span");
            span.className  = "GPmousePositionSettingsLabel";
            span.innerHTML = "Système de référence";
            container.appendChild(span);

            // FIXME on decompose la fonction pour les besoins du controle,
            // on ajoutera ces childs à la main...
            // FIXME tableau statique !
            // var systems = [
            //     {
            //         code : "GEOGRAPHIC",
            //         label : "Géographique"
            //     },
            //     {
            //         code : "MERCATOR",
            //         label : "Mercator"
            //     },
            //     {
            //         code : "LAMB93",
            //         label : "Lambert 93"
            //     },
            //     {
            //         code : "LAMB2E",
            //         label : "Lambert II étendu"
            //     }
            // ];
            //
            // var selectSystem = this._createMousePositionSettingsSystemsElement(systems);
            //
            // container.appendChild(selectSystem);

            // FIXME on decompose la fonction pour les besoins du controle,
            // on ajoutera ces childs à la main...
            // FIXME tableau statique !
            // var units = [
            //     {
            //         code : "DEC",
            //         label : "degrés décimaux",
            //     },
            //     {
            //         code : "DMS",
            //         label : "degrés sexagésimaux",
            //     },
            //     {
            //         code : "RAD",
            //         label : "radians",
            //     },
            //     {
            //         code : "GON",
            //         label : "grades"
            //     }
            // ];
            //
            // var selectUnits = this._createMousePositionSettingsUnitsElement(units);
            //
            // container.appendChild(selectUnits);

            return container;
        },

        /** ... */
        _createMousePositionSettingsSystemsElement : function (systems) {

            // contexte d'execution
            var context = this;

            var selectSystem = document.createElement("select");
            selectSystem.id = "GPmousePositionProjectionSystem";
            selectSystem.className = "GPinputSelect GPmousePositionSettingsSelect";
            selectSystem.addEventListener("change", function (e) {
                context.onMousePositionProjectionSystemChange(e);
            });

            for (var i = 0; i < systems.length; i++) {
                var obj = systems[i];
                var option = document.createElement("option");
                option.value = (obj.code) ? obj.code : i;
                option.text  = obj.label || i;
                // option.label = obj.label;
                selectSystem.appendChild(option);
            }

            return selectSystem;
        },

        /** ... */
        _createMousePositionSettingsUnitsElement : function (units) {

            // contexte d'execution
            var context = this;

            var selectUnits = document.createElement("select");
            selectUnits.id = "GPmousePositionProjectionUnits";
            selectUnits.className = "GPinputSelect GPmousePositionSettingsSelect";
            selectUnits.addEventListener("change", function (e) {
                context.onMousePositionProjectionUnitsChange(e);
            });

            for (var j = 0; j < units.length; j++) {
                var obj = units[j];
                var option = document.createElement("option");
                option.value = (obj.code) ? obj.code : j;
                option.text  = obj.label || j;
                // option.label = obj.label;
                selectUnits.appendChild(option);
            }

            return selectUnits;
        },

        // ################################################################### //
        // ####################### handlers Event ############################ //
        // ################################################################### //

        /**
        * Function displaying coordinates from cursor position (desktop)
        * or map center (tactile)
        */
        GPdisplayCoords : function (coordinate) {

            // Compute coords in case of cursor position (desktop)
            if (coordinate && coordinate != null) {

                var labelLon = document.getElementById("GPmousePositionLonLabel");
                var labelLat = document.getElementById("GPmousePositionLatLabel");

                if (coordinate.x || coordinate.y) {
                    labelLat.innerHTML = "X : ";
                    labelLon.innerHTML = "Y : ";
                } else if (coordinate.e || coordinate.n) {
                    labelLat.innerHTML = "E : ";
                    labelLon.innerHTML = "N : ";
                } else {
                    labelLat.innerHTML = "Latitude : ";
                    labelLon.innerHTML = "Longitude : ";
                }

                var elLat = document.getElementById("GPmousePositionLat");
                var elLon = document.getElementById("GPmousePositionLon");

                elLat.innerHTML = coordinate.x || coordinate.lat || coordinate.e;
                if (coordinate.unit) {
                    elLat.innerHTML += " ";
                    elLat.innerHTML += coordinate.unit;
                }

                elLon.innerHTML = coordinate.y || coordinate.lng || coordinate.lon || coordinate.n;
                if (coordinate.unit) {
                    elLon.innerHTML += " ";
                    elLon.innerHTML += coordinate.unit;
                }

            }
        },

        /**
        * Function displaying altitude from cursor position (desktop)
        * or map center (tactile)
        */
        GPdisplayElevation : function (coordinate, altitudeTimeoutDelay, noDataValue, noDataValueTolerance) {

            // contexte d'execution
            var context = this;

            // Latency for altitude request
            var altitudeTimeout;
            if (!altitudeTimeoutDelay) {
                altitudeTimeoutDelay = 500;
            }

            clearTimeout(altitudeTimeout);
            document.getElementById("GPmousePositionAlt").innerHTML = "...";

            if ( noDataValue == null ) {
                noDataValue = -99999;
            }
            if ( noDataValueTolerance == null ) {
                noDataValueTolerance = 99980;
            }
            var maxThreshold = noDataValue + noDataValueTolerance;
            var minThreshold = noDataValue - noDataValueTolerance;

            // Compute coords in case of cursor position (desktop)
            if (coordinate && coordinate != null) {

                // If no altitude panel, don't call altitude request
                if (document.getElementById("GPmousePositionAltitude")) {
                    altitudeTimeout = setTimeout( function () {
                        context.onRequestAltitude(coordinate, function (z) {
                            if ( minThreshold < z && z < maxThreshold ) {
                                document.getElementById("GPmousePositionAlt").innerHTML = "--- m";
                            } else {
                                document.getElementById("GPmousePositionAlt").innerHTML = z + " m";
                            }
                        });
                    }, altitudeTimeoutDelay);
                }

            }
        }
    };

    return MousePositionDOM;
});
