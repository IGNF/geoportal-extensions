// import OpenLayers
import Overlay from "ol/Overlay";
import { Draw as DrawInteraction } from "ol/interaction";
import {
    Fill,
    Stroke,
    Style,
    Circle
} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// import local
import Logger from "../../../Common/Utils/LoggerByDefault";
import Interactions from "../Utils/Interactions";
// import local with ol dependencies
import LayerSwitcher from "../LayerSwitcher";

// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = Logger.getLogger("measures");

/**
 * Measures Tools :
 * - length
 * - aera
 * - azimut
 */
var Measures = {

    // ****************************************************************** //
    // > Default Styles
    // ****************************************************************** //

    /*
     * Pointer
     */
    DEFAULT_POINTER_STYLE : new Circle({
        radius : 5,
        stroke : new Stroke({
            color : "#002A50",
            width : 2
        }),
        fill : new Fill({
            color : "rgba(255, 155, 0, 0.7)"
        })
    }),

    /*
     * Measures style line
     */
    DEFAULT_DRAW_START_STYLE : new Style({
        fill : new Fill({
            color : "rgba(0, 183, 152, 0.2)"
        }),
        stroke : new Stroke({
            color : "#002A50",
            lineDash : [10, 10],
            width : 2
        })
    }),

    /*
     * Measures final style line
     */
    DEFAULT_DRAW_FINISH_STYLE : new Style({
        fill : new Fill({
            color : "rgba(0, 183, 152, 0.3)"
        }),
        stroke : new Stroke({
            color : "#002A50",
            width : 3
        })
    }),

    // ****************************************************************** //
    // > ToolBox : these tools work together
    // ****************************************************************** //
    // sample :
    // tools[name_control][0].(active|instance|map)
    // tools : {
    //      MeasureLength : [
    //          { active : true, instance : [Object MeasureLength], map : "map1" },
    //          { active : true, instance : [Object MeasureLength], map : "map2" }
    //      ],
    //      MeasureArea : [],
    //      MeasureAzimuth : []
    // }
    tools : {
        MeasureLength : [],
        MeasureArea : [],
        MeasureAzimuth : []
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
        var map = this.getMap();
        var currentMapId = map.getTargetElement().id;

        // contexte d'execution
        var context = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        if (context) {
            // Pour info
            // les objets de mesures ont du code partagé
            // (afin de gerer les interactions entre eux).
            // Dans un mode "modules", on partage cet objet (this.tools) via le contexte
            // d'execution (ex. avec window)
            this.tools = context.gpShareMeasures || {};
        }

        // desactivation des controles de mesures sur la carte courrante
        var mySelf = this.CLASSNAME; // this.constructor.name : pas possible en mode minifié/manglifié !
        for (var className in this.tools) {
            if (this.tools.hasOwnProperty(className)) {
                var measures = this.tools[className];
                for (var i = 0; i < measures.length; i++) {
                    var o = measures[i];
                    if (o && o.active && className !== mySelf && o.map === currentMapId) {
                        o.active = false;
                        if (o.instance !== null) { // au cas où le controle a été supprimé !
                            o.instance.clean();
                        }
                    }
                }
            }
        }

        // desactivation des autres interactions parasites
        Interactions.unset(map, {
            current : "Measures"
        });

        if (!this._showContainer.checked) {
            this.addMeasureEvents();
            this.initMeasureInteraction();
            this.addMeasureInteraction(type);
            for (var j = 0; j < this.tools[mySelf].length; j++) {
                if (this.tools[mySelf][j].map === currentMapId) {
                    this.tools[mySelf][j].active = true;
                }
            }
        } else {
            this.clearMeasure();
            this.clearMeasureToolTip();
            this.removeMeasureEvents();
            for (var k = 0; k < this.tools[mySelf].length; k++) {
                if (this.tools[mySelf][k].map === currentMapId) {
                    this.tools[mySelf][k].active = false;
                }
            }
        }
    },

    // ****************************************************************** //
    // > Methods not Public
    // ****************************************************************** //

    /**
     * Clear all dom tooltip of length, area or azimut object.
     */
    clearMeasureToolTip : function () {
        var map = this.getMap();
        if (!map) {
            return;
        }

        var mapContainer = map.getTargetElement();
        // au cas où il y'aurait plusieurs container de carte !
        var overlays = mapContainer.getElementsByClassName("ol-overlaycontainer-stopevent");
        for (var k = 0; k < overlays.length; k++) {
            var nodes = overlays[k];
            var len = nodes.children.length;
            var nodesToRemove = [];
            for (var i = 0; i < len; i++) {
                var node = nodes.children[i];
                if (node.children.length !== 0) {
                    var child = node.children[0];
                    if (child.className === "GPmeasureTooltip GPmeasureTooltip-static" ||
                        child.className === "GPmeasureTooltip GPmeasureTooltip-measure") {
                        nodesToRemove.push(node);
                    }
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
        this.measureTooltipElement.className = "GPmeasureTooltip GPmeasureTooltip-measure";

        this.measureTooltip = new Overlay({
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

        this.helpTooltip = new Overlay({
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
        this.options.styles = styles || {};

        // style de depart
        logger.trace("style start", this.options.styles.start);

        // Creation à partir des styles par défaut
        var startStyleOpts = {
            image : Measures.DEFAULT_POINTER_STYLE,
            fill : Measures.DEFAULT_DRAW_START_STYLE.getFill(),
            stroke : Measures.DEFAULT_DRAW_START_STYLE.getStroke()
        };
        // ecrasement à partir des propriétés renseignées
        if (this.options.styles.hasOwnProperty("pointer") && this.options.styles.pointer instanceof Image) {
            startStyleOpts.image = this.options.styles.pointer;
        }
        if (this.options.styles.hasOwnProperty("start") && this.options.styles.start instanceof Style) {
            if (this.options.styles.start.getFill() != null) {
                startStyleOpts.fill = this.options.styles.start.getFill();
            }
            if (this.options.styles.start.getStroke() != null) {
                startStyleOpts.stroke = this.options.styles.start.getStroke();
            }
        }

        this.options.styles.start = new Style(startStyleOpts);

        // style de fin
        logger.trace("style finish", this.options.styles.finish);

        var finishStyleOpts = {
            fill : Measures.DEFAULT_DRAW_FINISH_STYLE.getFill(),
            stroke : Measures.DEFAULT_DRAW_FINISH_STYLE.getStroke()
        };
        // ecrasement à partir des propriétés renseignées
        if (this.options.styles.hasOwnProperty("finish") && this.options.styles.finish instanceof Style) {
            if (this.options.styles.finish.getFill() != null) {
                finishStyleOpts.fill = this.options.styles.finish.getFill();
            }
            if (this.options.styles.finish.getStroke() != null) {
                finishStyleOpts.stroke = this.options.styles.finish.getStroke();
            }
        }

        this.options.styles.finish = new Style(finishStyleOpts);
    },

    /**
     * Add the measure interaction
     *
     * @param {String} type - LineString or Polygon.
     */
    addMeasureInteraction : function (type) {
        var map = this.getMap();

        // Creates and adds the interaction
        var self = this;
        this.measureDraw = new DrawInteraction({
            source : this.measureSource,
            // condition : permet de gerer la suppression des derniers points saisis
            condition : function (event) {
                if (event.originalEvent.ctrlKey) {
                    if (self.sketch) {
                        this.removeLastPoint();
                    }
                    return false;
                }
                return true;
            },
            type : type,
            style : this.options.styles.start || Measures.DEFAULT_DRAW_START_STYLE
        });
        this.measureDraw.setProperties({
            name : "Measures",
            source : this
        });
        map.addInteraction(this.measureDraw);

        // Create tooltips
        this.createMeasureTooltip(map);

        // Event start measuring
        this.measureDraw.on("drawstart", (evt) => {
            // set sketch
            self.sketch = evt.feature;
        });

        // Event end measuring
        this.measureDraw.on("drawend", () => {
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

            self.measureTooltipElement.className = "GPmeasureTooltip GPmeasureTooltip-static";
            self.measureTooltip.setOffset([0, -7]);

            // unset sketch
            self.sketch = null;
            // unset tooltip so that a new one can be created
            self.measureTooltipElement = null;
            self.createMeasureTooltip(map);
        });
    },

    /**
     * Init the measure interaction
     */
    initMeasureInteraction : function () {
        var map = this.getMap();

        this.measureSource = new VectorSource();

        this.measureVector = new VectorLayer({
            source : this.measureSource,
            style : this.options.styles.finish || Measures.DEFAULT_DRAW_FINISH_STYLE
        });

        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant.
        this.measureVector.gpResultLayerId = "measure";

        map.addLayer(this.measureVector);

        // Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        map.getControls().forEach(
            (control) => {
                if (control instanceof LayerSwitcher) {
                    // un layer switcher est présent dans la carte
                    var layerId = this.measureVector.gpLayerId;
                    // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                    if (control._layers[layerId].title === layerId) {
                        control.addLayer(
                            this.measureVector, {
                                title : this.options.layerDescription.title,
                                description : this.options.layerDescription.description
                            }
                        );
                    }
                }
            }
        );
    }
};

export default Measures;
