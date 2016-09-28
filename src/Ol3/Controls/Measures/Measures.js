define([
    "ol",
    "woodman"
], function (
    ol,
    woodman
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("measures");

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

        // ****************************************************************** //
        // > Styles
        // ****************************************************************** //

        /*
         * Measures style
         */
        measureStyle : new ol.style.Style({
            fill : new ol.style.Fill({
                color : "rgba(0, 183, 152, 0.2)"
            }),
            stroke : new ol.style.Stroke({
                color : "#002A50",
                lineDash : [10, 10],
                width : 2
            }),
            image : new ol.style.Circle({
                radius : 5,
                stroke : new ol.style.Stroke({
                    color : "#002A50",
                    width : 2
                }),
                fill : new ol.style.Fill({
                    color : "rgba(255, 155, 0, 0.7)"
                })
            })
        }),

        /*
         * Measures final style
         */
        measureFinalStyle : new ol.style.Style({
            fill : new ol.style.Fill({
                color : "rgba(0, 183, 152, 0.3)"
            }),
            stroke : new ol.style.Stroke({
                color : "#002A50",
                width : 3
            }),
            image : new ol.style.Icon({
                src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAsCAYAAAAATWqyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABTtJREFUeNq8WGtsFUUU/rb3gtdCAykFG9AUDTQUKimhxUewEusrJYoBo4FfEgoqotHERH6oP9TGmJhIrIlWAf9hjAaEiME2pgFfVVpFii8sWqIQLLSx3EJLW7p+Z2Z2b2l7d/b23vZLTmZ2duacb2fmnDk7DlKA67rXs1hJKacsohRQppjXFygnKT9TDlH2O47zFzIFGnco91EOuqnjoBnr2Ow4FhIlLN6m3DykFTh3BGj/Doj/CfSe082xPCDnBmDWTUBeyXDVjZTHOUNHUiZCEs+weI0ySTV0/w0c2wa07gIungn+vOx8YN46oPhpYOp1Xms/5TmSeSMUERKImFnYqBoGuPRNL5LEW8BgX2rrmjWZZLYApS8BUW8r4T0zO5eTEjFr+S6lSjV0HgPqVwNdf6S30abNB+7aDeQWey3bKZtIxvU5DxvyrE/izJfAvuXpkxCIDtElOjWqjK2RM8LZWMbiG0oEnUc5kB7a14WMYvI04H56du5ieZKluZWz8r0/IyQh5TuKRH8cqFuTeRIC0Sm6xYbYok1j21+ahyhLVO3wC8D5VowbRLfY0FhibOulIavDLEoRZyD8sJDeMWBXKG5ZsIobsdDsg+OMq3u1m1u9KQo8zP45EqjRxOUpk6i50IRl4FuGjpZtwUoiMYa314GFj/EzIsN8n8v+C1e4kfvwcm+wnhsZY27xQ8oiWZpKrWRQB6tAElfxpKnjsCdGklDzG9HvpI/0DYLYEpsalVnmAAM6fgR62oMHl70C5N9mn3rpI32DILbEpkZ5ljlFgbPNFtebzij5VPhNKX1lTBASNtXSzPZ3cxCuvVOH7FTCu4yxeZDGbCES0z5+PniQ3uGpwTYmYTOWCPGTpgYP6u9OnYhtzBCbQkSH0NiM4EEdP6VOxDYmYbNLiJxQ1elFwYPaG3XQCn3QHddjgpCweUKI6K2bvzw4YROf//rJob6fZl/H2FRoFiINfqo3qyzYwD8MVIeYLw32J+8j76SP9A2C2BKbGg1CZL+EF/W4YKP9a3/fCeyhkrY9DOOXEu1SlzZ5J31sSNjqURm/OfQkY9qgvkYOvXhbuH0g505Oga7HT9rPF9+t5+pDL0ulwzt46FV5ROax+JUSRRtP0LoHMK64+xNg7iqVEVOKSKRVxRGpsKhRnaRD4SPjR0J0axKCGmP7ilQxm4X8d8xXmfvHJZlPkCR3WfODl9FLMlxCIhevSJ5Nwzo1XdKxYpe3hpmB6BKdmoS43VqPxIgsni+aWOg8biZ3f+nLmSMiuvKWek/P01az7QdLyNVT7lC/l59WAKcb0iMxhzpW1nvmvpDtSiKD1l9OkpnDgv8UyMWFU9wvTP8vdY6NhJwnD1JVtso2OiiLSeL0iJUbNfg6zikVVwRTyOn2HWOfjfLtHgnBhtFIJCViyNDZUatdmnGlaFPqJIoe1WM1aqlz71ivJbLNobgAA9zgu7nZ/vstHAk5WVdzaPRqmGC5lER6kjpV4OWJdq+1kkshSk4VH9izcy/bV66qSPQZV+0J9G7rTY6+XNmqHmYwyJVV24kse1X31dhKHdasygkzy+a64oC4nWr47F4e858nSbLv4V/KAe9JKpVDrx/SImLIXMOiRUKdujESl+49O8xVZxpXzVc/C/I/RxL/hgq8YYkYhev9q6kVO4d9B+sr3vdICNaHJTHWW8Ya/87wqy2uWwstUk/gTYw3aCRGOarMDfS67kfFWqSuIe9imAjQEC272nJHixYNaSvGRIIGN49ywbsZEw1zI11N6TZSHeaGORn+F2AAJtRIMx4t+hUAAAAASUVORK5CYII=",
                size : [34,44],
                // imgSize : [34,44], FIXME exception !?
                anchor : [0.5,1],
                anchorOrigin : "bottom-left",
                anchorYUnits : "pixels",
                snapToPixel : true
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
        * TODO gestion des styles utilisateurs
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

            var nodes = document.querySelector(".ol-overlaycontainer-stopevent");
            if (nodes) {
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
        * TODO Creates a style for drawing
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
                    this.options.styles.start = new ol.style.Style({
                        fill : new ol.style.Fill({
                            color : styles.start.fillColor || null
                        }),
                        stroke : new ol.style.Stroke({
                            color : styles.start.strokeColor || null,
                            lineDash : styles.start.strokeLineDash || null,
                            width : styles.start.strokeWidth || null
                        }),
                        image : new ol.style.Circle({
                            radius : styles.start.imageRadius || null,
                            stroke : new ol.style.Stroke({
                                color : styles.start.imageStrokeColor || null,
                                width : styles.start.imageStrokeWidth || null
                            }),
                            fill : new ol.style.Fill({
                                color : styles.start.imageFillColor || null
                            })
                        })
                    });
                }

                if ( typeof finish === "undefined" ) {
                    this.options.styles.finish = this.measureFinalStyle;
                } else {
                    logger.trace("Custom Styles !");
                    this.options.styles.finish = new ol.style.Style({
                        fill : new ol.style.Fill({
                            color : styles.finish.fillColor || null
                        }),
                        stroke : new ol.style.Stroke({
                            color : styles.finish.strokeColor || null,
                            lineDash : styles.finish.strokeLineDash || null,
                            width : styles.finish.strokeWidth || null
                        }),
                        image : new ol.style.Circle({
                            radius : styles.finish.imageRadius || null,
                            stroke : new ol.style.Stroke({
                                color : styles.finish.imageStrokeColor || null,
                                width : styles.finish.imageStrokeWidth || null
                            }),
                            fill : new ol.style.Fill({
                                color : styles.finish.imageFillColor || null
                            })
                        })
                    });
                }
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
