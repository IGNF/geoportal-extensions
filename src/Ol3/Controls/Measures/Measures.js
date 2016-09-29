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
    var defaultStyle = {
        fillColor : "rgba(0, 183, 152, 0.2)",
        strokeColor : "#002A50",
        strokeLineDash : [10, 10],
        strokeWidth : 2,
        imageRadius : 5,
        imageFillColor :  "rgba(255, 155, 0, 0.7)",
        imageStrokeColor : "#002A50",
        imageStrokeWidth : 2
    };

    /** styles by default */
    var defaultStyleFinal = {
        fillColor : "rgba(0, 183, 152, 0.3)",
        strokeColor : "#002A50",
        strokeWidth : 3
    };

    /**
    * Measures Tools :
    * - length
    * - aera
    * - azimut
    */
    var Measures = {

        // ****************************************************************** //
        // > ToolBox
        // ****************************************************************** //
        tools : {
            MeasureLength : {
                container : null,
                draw : null,
                layer : null,
                active : false
            },
            MeasureArea : {
                container : null,
                draw : null,
                layer : null,
                active : false
            },
            MeasureAzimuth : {
                container : null,
                draw : null,
                layer : null,
                active : false
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
        * The help tooltip element.
        * @type {Element}
        */
        helpTooltipElement : null,

        /**
        * Overlay to show the help.
        * @type {ol.Overlay}
        */
        helpTooltip : null,

        // ****************************************************************** //
        // > Styles
        // ****************************************************************** //

        /*
         * Measures style
         */
        measureStyle : new ol.style.Style({
            fill : new ol.style.Fill({
                color : defaultStyle.fillColor
            }),
            stroke : new ol.style.Stroke({
                color : defaultStyle.strokeColor,
                lineDash : defaultStyle.strokeLineDash,
                width : defaultStyle.strokeWidth
            }),
            image : new ol.style.Circle({
                radius : defaultStyle.imageRadius,
                stroke : new ol.style.Stroke({
                    color : defaultStyle.imageStrokeColor,
                    width : defaultStyle.imageStrokeWidth
                }),
                fill : new ol.style.Fill({
                    color : defaultStyle.imageFillColor
                })
            })
        }),

        /*
         * Measures final style
         */
        measureFinalStyle : new ol.style.Style({
            fill : new ol.style.Fill({
                color : defaultStyleFinal.fillColor
            }),
            stroke : new ol.style.Stroke({
                color : defaultStyleFinal.strokeColor,
                width : defaultStyleFinal.strokeWidth
            })
        }),

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

            var map  = this.getMap();
            var self = this.CLASSNAME; // FIXME this.constructor.name : pas possible en mode minifié/manglifié !
            for (var instance in this.tools) {
                if (this.tools.hasOwnProperty(instance)) {
                    if (this.tools[instance].active && instance !== self) {
                        this.clearMeasureToolTip();
                        map.removeLayer(this.tools[instance].layer);
                        map.removeInteraction(this.tools[instance].draw);
                        this.tools[instance].active = false;
                        this.tools[instance].container.checked = true;
                        this.tools[instance].draw  = null;
                        this.tools[instance].layer = null;
                    }
                }
            }

            // Activation du controle
            //  statut de la checkbox : true par defaut.
            //  lors du clic, le statut devient false apres que la fonction
            //  soit executée.
            //  clic true run false
            //  clic false run true, ...
            if (this._showContainer.checked) {

                this.initMeasureInteraction();
                this.addMeasureInteraction(type);
                this.tools[self].active = true;
                this.tools[self].container = this._showContainer; // FIXME pourri !?
                this.tools[self].draw  = this.measureDraw;
                this.tools[self].layer = this.measureVector;
            } else {

                this.clearMeasure();
                this.tools[self].active = false;
                this.tools[self].container = this._showContainer; // FIXME pourri !?
                this.tools[self].draw  = null;
                this.tools[self].layer = null;
            }
        },

        // ****************************************************************** //
        // > Methods
        // ****************************************************************** //

        /**
        * Clear all dom tooltip of length, area or azimut object.
        */
        clearMeasureToolTip : function () {

            // "querySelectorAll" : au cas où il y'aurait plusieurs container (ex. overview-map)
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

            this.clearMeasureToolTip();

            if (this.measureTooltip) { // FIXME !?
                map.removeOverlay(this.measureTooltip);
            }

            if (this.measureVector) {
                map.removeLayer(this.measureVector);
            }

            if (this.measureDraw) {
                map.removeInteraction(this.measureDraw);
            }
        },

        /**
        * Creates a new measure tooltip
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
        * TODO
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

            // TODO cas où options.styles = {} : vide !
            if ( typeof styles === "undefined" || Object.keys(styles).length === 0 ) {
                // on applique les styles par defaut
                this.options.styles = {
                    start : this.measureStyle,
                    finish : this.measureFinalStyle
                };
            } else {
                // on interprete les params pour y creer un objet ol.Style
                var start  = styles.start;
                var finish = styles.finish;

                this.options.styles = {};

                if ( typeof start === "undefined" ) {
                    this.options.styles.start = this.measureStyle;
                } else {

                    logger.trace("Custom Styles !");

                    // styles par defaut
                    Object.keys(defaultStyle).forEach(function (key) {
                        if (!start.hasOwnProperty(key)) {
                            start[key] = defaultStyle[key];
                            return;
                        }
                        if (key === "strokeWidth") {
                            var intValue = parseInt(start[key],10);
                            if (isNaN(intValue) || intValue < 0) {
                                console.log("Wrong value (" + start[key] + ") for strokeWidth. Must be a positive interger value." );
                                start[key] = defaultStyle[key];
                                return;
                            }
                            start[key] = intValue;
                        }
                    },this);

                    // surface : fill
                    var _fill = new ol.style.Fill({
                        color : start.fillColor
                    });

                    // ligne : stroke
                    var _stroke = new ol.style.Stroke({
                        color : start.strokeColor,
                        lineDash : start.strokeLineDash,
                        width : start.strokeWidth
                    });

                    // point : image
                    var _image = new ol.style.Circle({
                        radius : start.imageRadius,
                        stroke : new ol.style.Stroke({
                            color : start.imageStrokeColor,
                            width : start.imageStrokeWidth
                        }),
                        fill : new ol.style.Fill({
                            color : start.imageFillColor
                        })
                    });

                    this.options.styles.start = new ol.style.Style({
                        fill : _fill,
                        stroke : _stroke,
                        image : _image
                    });
                }

                logger.trace("style start", this.options.styles.start);

                if ( typeof finish === "undefined" ) {
                    this.options.styles.finish = this.measureFinalStyle;
                } else {
                    logger.trace("Custom Styles !");

                    // styles par defaut
                    Object.keys(defaultStyleFinal).forEach(function (key) {
                        if (!finish.hasOwnProperty(key)) {
                            finish[key] = defaultStyleFinal[key];
                            return;
                        }
                        if (key === "strokeWidth") {
                            var intValue = parseInt(finish[key],10);
                            if (isNaN(intValue) || intValue < 0) {
                                console.log("Wrong value (" + finish[key] + ") for strokeWidth. Must be a positive interger value." );
                                finish[key] = defaultStyleFinal[key];
                                return;
                            }
                            finish[key] = intValue;
                        }
                    },this);

                    this.options.styles.finish = new ol.style.Style({
                        fill : new ol.style.Fill({
                            color : styles.finish.fillColor
                        }),
                        stroke : new ol.style.Stroke({
                            color : styles.finish.strokeColor,
                            lineDash : styles.finish.strokeLineDash,
                            width : styles.finish.strokeWidth
                        })
                    });
                }
                logger.trace("style finish", this.options.styles.finish);
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
                style : this.options.styles.start || this.measureStyle
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
               style : this.options.styles.finish || this.measureFinalStyle
             });

             map.addLayer(this.measureVector);
         }
    };

    return Measures;
});
