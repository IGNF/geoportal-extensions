define([
    "ol",
    "woodman"
], function (
    ol,
    woodman
) {

    "use strict";

    // Derived from OpenLayers measure example
    // http://openlayers.org/en/latest/examples/measure.html

    woodman.load("console");
    var logger = woodman.getLogger("measures");

    /** styles by default */
    var DEFAULT_STYLE_START = {
        strokeColor : "#002A50",
        strokeLineDash : [10, 10],
        strokeWidth : 2,
        fillColor : "rgba(0, 183, 152, 0.2)",
        imageRadius : 5,
        imageFillColor :  "rgba(255, 155, 0, 0.7)",
        imageStrokeColor : "#002A50",
        imageStrokeWidth : 2
    };

    /** styles by default */
    var DEFAULT_STYLE_FINISH = {
        strokeColor : "#002A50",
        strokeWidth : 3,
        fillColor : "rgba(0, 183, 152, 0.3)"
    };

    /**
    * Measures Tools :
    * - length
    * - aera
    * - azimut
    */
    var Measures = {

        // ****************************************************************** //
        // > ToolBox : these tools work together
        // ****************************************************************** //
        tools : {
            MeasureLength : {
                active : false,
                instance : null
            },
            MeasureArea : {
                active : false,
                instance : null
            },
            MeasureAzimuth : {
                active : false,
                instance : null
            }
        },

        // ****************************************************************** //
        // > Variables
        // ****************************************************************** //

        /**
        * Global measure draw interaction
        * @type {ol.interaction.Draw}
        */
        measureDraw : null,

        /**
        * Global vector source for measure
        * @type {ol.source.Vector}
        */
        measureSource : null,

        /**
        * Global vector layer for measure
        * @type {ol.layer.Vector}
        */
        measureVector : null,

        /**
        * Currently drawn feature.
        * @type {ol.Feature}
        */
        sketch : null,

        /**
        * The measure tooltip element.
        * @type {Element}
        */
        measureTooltipElement : null,

        /**
        * Overlay to show the measurement.
        * @type {ol.Overlay}
        */
        measureTooltip : null,

        /**
        * TODO The help tooltip element.
        * @type {Element}
        */
        helpTooltipElement : null,

        /**
        * TODO Overlay to show the help.
        * @type {ol.Overlay}
        */
        helpTooltip : null,

        // ****************************************************************** //
        // > Styles
        // ****************************************************************** //

        /*
         * Measures style line
         */
        measureDrawStartStyle : new ol.style.Style({
            fill : new ol.style.Fill({
                color : DEFAULT_STYLE_START.fillColor
            }),
            stroke : new ol.style.Stroke({
                color : DEFAULT_STYLE_START.strokeColor,
                lineDash : DEFAULT_STYLE_START.strokeLineDash,
                width : DEFAULT_STYLE_START.strokeWidth
            }),
            image : new ol.style.Circle({
                radius : DEFAULT_STYLE_START.imageRadius,
                stroke : new ol.style.Stroke({
                    color : DEFAULT_STYLE_START.imageStrokeColor,
                    width : DEFAULT_STYLE_START.imageStrokeWidth
                }),
                fill : new ol.style.Fill({
                    color : DEFAULT_STYLE_START.imageFillColor
                })
            })
        }),

        /*
         * Measures final style line
         */
        measureDrawFinishStyle : new ol.style.Style({
            fill : new ol.style.Fill({
                color : DEFAULT_STYLE_FINISH.fillColor
            }),
            stroke : new ol.style.Stroke({
                color : DEFAULT_STYLE_FINISH.strokeColor,
                width : DEFAULT_STYLE_FINISH.strokeWidth
            })
        }),

        // ****************************************************************** //
        // > Methods Public
        // ****************************************************************** //

        /** Desactived Tool Measure */
        clean : function () {
            var _class = this.CLASSNAME;

            logger.trace("[" + _class + "] deactived tool !");
            // sur la desactivation de l'outil de mesure
            // on fait un nettoyage des ressources
            // ainsi que le DOM
            this.clearMeasure();
            this.clearMeasureToolTip();
            this.removeMeasureEvents();
            this._showContainer.checked = false;

        },

        // ****************************************************************** //
        // > Methods Events
        // ****************************************************************** //

        /**
        * Handle pointer move.
        *
        * @param {ol.MapBrowserEvent} e - The event.
        */
        onPointerMoveHandler : function (e) {

            if (e.dragging) {
                return;
            }

            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = e.coordinate;

            if (this.sketch) {
                var output;
                var geom = (this.sketch.getGeometry());
                output = this.format((geom));
                if (geom.getType() === "LineString") {
                    tooltipCoord = geom.getLastCoordinate();
                } else if (geom.getType() === "Polygon") {
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else {
                    return;
                }
                this.measureTooltipElement.innerHTML = output;
                this.measureTooltip.setPosition(tooltipCoord);
            }
        },

        /**
        * Main program !
        * This method is called by event 'click' on control picto
        *
        * @param {Object} e - HTMLElement
        * @param {String} type - LineString or Polygon
        * @private
        */
        onShowMeasureClick : function (e, type) {

            // desactivation des controles de mesures
            var self = this.CLASSNAME; // this.constructor.name : pas possible en mode minifié/manglifié !
            for (var className in this.tools) {
                if (this.tools.hasOwnProperty(className)) {
                    if (this.tools[className].active && className !== self) {
                        this.tools[className].active = false;
                        this.tools[className].instance.clean();
                    }
                }
            }

            // FIXME desactivation des autres interactions parasites
            var map = this.getMap();
            var interactions = map.getInteractions().getArray() ;
            for (var i = 0 ; i < interactions.length ; i++ ) {
                if (interactions[i].getActive() && interactions[i] instanceof ol.interaction.Draw) {
                    interactions[i].setActive(false);
                }
            }

            if (!this._showContainer.checked) {

                this.addMeasureEvents();
                this.initMeasureInteraction();
                this.addMeasureInteraction(type);
                this.tools[self].active = true;

            } else {

                this.clearMeasure();
                this.clearMeasureToolTip();
                this.removeMeasureEvents();
                this.tools[self].active = false;
            }
        },

        // ****************************************************************** //
        // > Methods not Public
        // ****************************************************************** //

        /**
        * Clear all dom tooltip of length, area or azimut object.
        */
        clearMeasureToolTip : function () {

            // "querySelectorAll" :
            // au cas où il y'aurait plusieurs container (ex. overview-map)
            var lstNodes = document.querySelectorAll(".ol-overlaycontainer-stopevent");
            for (var k = 0; k < lstNodes.length; k++) {
                var nodes = lstNodes[k];
                var len = nodes.children.length;
                var nodesToRemove = [];
                for (var i = 0; i < len; i++) {
                    var node  = nodes.children[i];
                    var child = node.children[0];
                    if (child.className === "tooltip tooltip-static" ||
                        child.className === "tooltip tooltip-measure" ) {
                        nodesToRemove.push(node);
                    }
                }
                for (var j = 0; j < nodesToRemove.length; j++) {
                    nodes.removeChild(nodesToRemove[j]);
                }
            }
        },

        /**
        * Clear all length, area or azimut object.
        */
        clearMeasure : function () {
            logger.trace("call Measures::clear()");

            var map = this.getMap();

            // FIXME !?
            // if (this.measureTooltip) {
            //     map.removeOverlay(this.measureTooltip);
            //     this.measureTooltip = null;
            // }

            if (this.measureVector) {
                map.removeLayer(this.measureVector);
                this.measureVector = null;
            }

            if (this.measureDraw) {
                map.removeInteraction(this.measureDraw);
                this.measureDraw = null;
            }
        },

        /**
        * Creates a new measure tooltip
        * FIXME bug d'affichage de la tooltip de saisie en cours si on ne termine pas
        * la saisie  !?
        *
        * @param {ol.Map} map - The Map.
        */
        createMeasureTooltip : function (map) {
            if (this.measureTooltipElement) {
                this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
            }

            this.measureTooltipElement = document.createElement("div");
            this.measureTooltipElement.className = "tooltip tooltip-measure";

            this.measureTooltip = new ol.Overlay({
                element : this.measureTooltipElement,
                offset : [0, -15],
                positioning : "bottom-center"
            });

            map.addOverlay(this.measureTooltip);
        },

        /**
        * TODO evolution
        * Creates a new help tooltip
        *
        * @param {ol.Map} map - The Map.
        */
        createHelpTooltip : function (map) {

            if (this.helpTooltipElement) {
                this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
            }

            this.helpTooltipElement = document.createElement("div");
            this.helpTooltipElement.className = "tooltip hidden";

            this.helpTooltip = new ol.Overlay({
                element : this.helpTooltipElement,
                offset : [15, 0],
                positioning : "center-left"
            });

            map.addOverlay(this.helpTooltip);
        },

        /**
        * Creates a style for drawing
        *
        * @param {Object} styles - styles.
        */
        createStylingMeasureInteraction : function (styles) {

            if ( typeof styles === "undefined" || Object.keys(styles).length === 0 ) {
                // on applique les styles par defaut (en mode object)
                this.options.styles = {
                    start : this.measureDrawStartStyle,
                    finish : this.measureDrawFinishStyle
                };
            } else {
                this.options.styles = styles || {};
            }

            // on interprete les params pour y creer un objet ol.Style
            var start   = this.options.styles.start;
            var finish  = this.options.styles.finish;

            if ( typeof start === "undefined" ) {
                start = this.measureDrawStartStyle;
            }
            if ( typeof finish === "undefined" ) {
                finish = this.measureDrawFinishStyle;
            }

            logger.trace("style start",  start);

            if ( start instanceof ol.style.Style ) {
                logger.trace( "instance ol.style.Style for start drawing !" );
                this.options.styles.start = start;
            } else {
                logger.trace( "use properties to define a style for start drawing !" );

                var defaultStyle = DEFAULT_STYLE_START;
                Object.keys(defaultStyle).forEach(function (key) {
                    if (!start.hasOwnProperty(key)) {
                        start[key] = defaultStyle[key];
                        return;
                    }
                    var intValue;
                    if (key === "strokeWidth") {
                        intValue = parseInt(start[key],10);
                        if (isNaN(intValue) || intValue < 0) {
                            console.log("Wrong value (" + start[key] + ") for strokeWidth. Must be a positive interger value." );
                            start[key] = defaultStyle[key];
                            return;
                        }
                        start[key] = intValue;
                    }

                    if (key === "imageStrokeWidth" || key === "imageRadius") {
                        intValue = parseInt(start[key],10);
                        if (isNaN(intValue) || intValue < 0) {
                            console.log("Wrong value (" + start[key] + ") for strokeWidth or radius. Must be a positive interger value." );
                            start[key] = defaultStyle[key];
                            return;
                        }
                        start[key] = intValue;
                    }
                },this);

                // point : image
                var _startImage = new ol.style.Circle({
                    radius : start.imageRadius,
                    stroke : new ol.style.Stroke({
                        color : start.imageStrokeColor,
                        width : start.imageStrokeWidth
                    }),
                    fill : new ol.style.Fill({
                        color : start.imageFillColor
                    })
                });

                // surface : fill
                var _startFill = new ol.style.Fill({
                    color : start.fillColor
                });

                // ligne : stroke
                var _startStroke = new ol.style.Stroke({
                    color : start.strokeColor,
                    lineDash : start.strokeLineDash,
                    width : start.strokeWidth
                });

                this.options.styles.start = new ol.style.Style({
                        fill : _startFill,
                        stroke : _startStroke,
                        image : _startImage
                });
            }

            logger.trace("style finish", finish);

            if ( finish instanceof ol.style.Style ) {
                logger.trace( "instance ol.style.Style for finish drawing !" );
                this.options.styles.finish = finish;
            } else {
                logger.trace( "use properties to define a style for finish drawing !" );

                var defaultStyleFinish = DEFAULT_STYLE_FINISH;
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

                // surface : fill
                var _finishFill = new ol.style.Fill({
                    color : finish.fillColor
                });

                var _finishStroke = new ol.style.Stroke({
                    color : finish.strokeColor,
                    lineDash : finish.strokeLineDash,
                    width : finish.strokeWidth
                });

                this.options.styles.finish = new ol.style.Style({
                    stroke : _finishStroke,
                    fill : _finishFill
                });
            }

        },

        /**
         * Add the measure interaction
         *
         * @param {String} type - LineString or Polygon.
         */
        addMeasureInteraction : function (type) {

            var map = this.getMap();

            // Creates and adds the interaction
            this.measureDraw = new ol.interaction.Draw({
                source : this.measureSource,
                type : type,
                style : this.options.styles.start || this.measureDrawStartStyle
            });
            this.measureDraw.setProperties({
                source : "Measure"
            });
            map.addInteraction(this.measureDraw);

            // Create tooltips
            this.createMeasureTooltip(map);

            // Event start measuring
            var self = this;
            this.measureDraw.on("drawstart", function (evt) {
                // set sketch
                self.sketch = evt.feature;
            }, this);

            // Event end measuring
            this.measureDraw.on("drawend", function () {

                // FIXME MaJ de la tooltip en mode mobile !
                if (self.sketch) {
                    var output;
                    var tooltipCoord;
                    var geom = (self.sketch.getGeometry());
                    output = self.format((geom));
                    if (geom.getType() === "LineString") {
                        tooltipCoord = geom.getLastCoordinate();
                    } else if (geom.getType() === "Polygon") {
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else {
                        return;
                    }
                    self.measureTooltipElement.innerHTML = output;
                    self.measureTooltip.setPosition(tooltipCoord);
                }

                self.measureTooltipElement.className = "tooltip tooltip-static";
                self.measureTooltip.setOffset([0, -7]);

                // unset sketch
                self.sketch = null;
                // unset tooltip so that a new one can be created
                self.measureTooltipElement = null;
                self.createMeasureTooltip(map);

            }, this);
        },

        /**
         * Init the measure interaction
         */
        initMeasureInteraction : function () {

             var map = this.getMap();

             this.measureSource = new ol.source.Vector();

             this.measureVector = new ol.layer.Vector({
               source : this.measureSource,
               style : this.options.styles.finish || this.measureDrawFinishStyle
             });

             map.addLayer(this.measureVector);
         }
    };

    return Measures;
});
