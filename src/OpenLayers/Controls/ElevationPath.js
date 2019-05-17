/* globals AmCharts, d3 */
// import CSS
import "../CSS/Controls/ElevationPath/GPelevationPathOpenLayers.css";
// import OpenLayers
import Control from "ol/control/Control";
import {
    Fill,
    Icon,
    Stroke,
    Style,
    Image,
    Circle
} from "ol/style";
import { Point } from "ol/geom";
import { Draw as DrawInteraction } from "ol/interaction";
import { transform as olTransformProj } from "ol/proj";
import { getDistance as olGetDistanceSphere } from "ol/sphere";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Utils from "../../Common/Utils";
import Logger from "../../Common/Utils/LoggerByDefault";
import RightManagement from "../../Common/Utils/CheckRightManagement";
import ID from "../../Common/Utils/SelectorID";
// import local with ol dependencies
import Interactions from "./Utils/Interactions";
import MeasureToolBox from "./MeasureToolBox";
import Measures from "./Measures/Measures";
import LayerSwitcher from "./LayerSwitcher";
// DOM
import ElevationPathDOM from "../../Common/Controls/ElevationPathDOM";
import ProfileElevationPathDOM from "../../Common/Controls/ProfileElevationPathDOM";

var logger = Logger.getLogger("elevationpath");

/**
 * @classdesc
 *
 * Elevation Path Control. Allows users to draw a path on a Openlayers map see the elevation profile computed with geoportal elevation path web service along that path.
 *
 * @constructor
 * @alias ol.control.ElevationPath
 * @extends ol.control.Control
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.active = false] - specify if control should be actived at startup. Default is false.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Profil altimétrique"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mon profil altimétrique"] - Layer description to be displayed in LayerSwitcher
 * @param {Object} [options.stylesOptions = DEFAULT_STYLES] - styles management
 * @param {Object} [options.stylesOptions.marker = {}] - styles management of marker displayed on map when the user follows the elevation path. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Image.html ol.style.Image} subclass object
 * @param {Object} [options.stylesOptions.draw = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.stylesOptions.draw.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Image.html ol.style.Image} subclass object.
 * @param {Object} [options.stylesOptions.draw.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.stylesOptions.draw.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/ol.style.Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.elevationPathOptions = {}] - elevation path service options. See {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getAltitude Gp.Services.getAltitude()} for available options
 * @param {Object} [options.displayProfileOptions = {}] - profile options.
 * @param {Boolean} [options.displayProfileOptions.greaterSlope = true] - display the greater slope into the graph
 * @param {Boolean} [options.displayProfileOptions.meanSlope = true] -  display the mean slope into the graph
 * @param {Boolean} [options.displayProfileOptions.ascendingElevation = true] -  display the ascending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.descendingElevation = true] -  display the descending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.currentSlope = true] -  display current slope value on profile mouseover
 * @param {Function} [options.displayProfileOptions.apply] - function to display profile if you want to cutomise it. By default, ([DISPLAY_PROFILE_BY_DEFAULT()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_BY_DEFAULT)) is used. Helper functions to use with D3 ([DISPLAY_PROFILE_LIB_D3()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_D3)) or AmCharts ([DISPLAY_PROFILE_LIB_AMCHARTS()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_AMCHARTS)) frameworks are also provided. You may also provide your own function.
 * @param {Object} [options.displayProfileOptions.target] - DOM container to use to display the profile.
 * @example
 *
 * var measure = new ol.control.ElevationPath({
 *    stylesOptions : {
 *     draw : {
 *       finish : new ol.style.Stroke({
 *            color : "rgba(0, 0, 0, 0.5)",
 *            width : 2
 *       })
 *     },
 *    }
 *    displayProfileOptions : {
 *       apply : ol.control.ElevationPath.DISPLAY_PROFILE_RAW,
 *    }
 * });
 *
 * Exemples :
 * - displayProfileOptions.apply : null
 * - displayProfileOptions.apply : function (elevations, container, context) {  // do some stuff... }
 * - displayProfileOptions.apply : ol.control.ElevationPath.DISPLAY_PROFILE_{LIB_AMCHARTS | LIB_D3 | RAW}
 *
 */
var ElevationPath = (function (Control) {
    function ElevationPath (options) {
        logger.trace("ElevationPath()");

        /**
         * options
         * @private
         */
        options = options || {};

        if (!(this instanceof ElevationPath)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "ElevationPath";

        // uuid
        this._uid = ID.generate();

        // container : HTMLElement
        this._showContainer = null;
        this._pictoContainer = null;
        this._panelContainer = null;
        this._profileContainer = null;
        this._waitingContainer = null;
        this._infoContainer = null;

        // timer sur la fenetre d'informations des données
        this._timerHdlr = null;

        // objet de type "ol.style"
        this._drawStyleStart = null;
        this._drawStyleFinish = null;
        this._markerStyle = null;

        // graph
        this._profile = null;

        // data elevations
        this._data = {};

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
        this._marker = null;

        // gestion des droits sur le service
        this._noRightManagement = false;

        // initialisation du composant
        this._initialize(options);

        // gestion des droits
        this._checkRightsManagement();

        // creation du DOM container
        this._container = (options.element) ? options.element : this._initializeContainer();

        // heritage
        Control.call(this, {
            element : this._container,
            target : options.target,
            render : options.render
        });
    }

    // heritage avec ol.control.Control
    if (Control) ElevationPath.__proto__ = Control;

    /**
     * @lends module:ElevationPath
     */
    ElevationPath.prototype = Object.create(Control.prototype, {});

    // on récupère les mixins de la classe "ElevationPathDOM"
    Utils.assign(ElevationPath.prototype, ElevationPathDOM);

    /**
     * suppression du marker
     *
     * @param {Object} context - context
     *
     * @private
     */
    ElevationPath.__removeProfileMarker = function (context) {
        var self = context;
        // suppression de l'ancien marker
        if (self._marker) {
            self._measureSource.removeFeature(self._marker);
            self._marker = null;
        }
    };

    /**
     * suppression du marker
     *
     * @param {Object} context - context
     * @param {Object} d - d
     *
     * @private
     */
    ElevationPath.__createProfileMarker = function (context, d) {
        var self = context;
        var map = self.getMap();
        var proj = map.getView().getProjection();

        var _coordinate = olTransformProj([d.lon, d.lat], "EPSG:4326", proj);
        var _coordinateProj = self._measureSource
            .getFeatures()[0]
            .getGeometry()
            .getClosestPoint(_coordinate);

        var _geometry = new Point(_coordinateProj);

        self._marker = new Feature({
            geometry : _geometry
        });
        logger.trace(_geometry);

        // style
        self._marker.setStyle(self._markerStyle);

        // ajout du marker sur la map
        self._measureSource.addFeature(self._marker);
    };

    /**
     * mise à jour du marker
     *
     * @param {Object} context - context
     * @param {Object} d - data
     *
     * @private
     */
    ElevationPath.__updateProfileMarker = function (context, d) {
        var self = context;
        ElevationPath.__removeProfileMarker(self);
        ElevationPath.__createProfileMarker(self, d);
    };

    /**
     * TODO : customisation possible d'une opération sur le profil
     *
     * @param {Object} context - context
     * @param {Object} d - data
     *
     * @private
     */
    ElevationPath.__customRawProfileOperation = function (context, d) {
        logger.log("__customRawProfileOperation");

        var self = context;

        var _pts = d.points;
        var _proj = self.getMap().getView().getProjection();
        for (var i = 0; i < _pts.length; i++) {
            var obj = _pts[i];
            var _coordinate = olTransformProj([obj.lon, obj.lat], "EPSG:4326", _proj);
            var _geometry = new Point(_coordinate);

            self._marker = new Feature({
                geometry : _geometry
            });
            logger.trace(_geometry);

            // TODO style en options ?
            var styles = ElevationPath.DEFAULT_STYLES.RESULTS;
            var _image = new Circle({
                radius : styles.imageRadius,
                stroke : new Stroke({
                    color : styles.imageStrokeColor,
                    width : styles.imageStrokeWidth
                }),
                fill : new Fill({
                    color : styles.imageFillColor
                })
            });
            self._marker.setStyle(new Style({
                image : _image
            }));

            // ajout du marker sur la map
            self._measureSource.addFeature(self._marker);
        }
    };

    /**
     * TODO : customisation possible d'une opération sur le profil
     * Ex. Methode appélée dans le DOM : ProfileElevationPathDOM
     *
     * @param {Object} context - context
     * @param {Object} e - event
     * @private
     */
    ElevationPath.__customRawProfileMouseOverEvent = function (context, e) {
        logger.log("__customRawProfileMouseOverEvent", context, e);
    };

    /**
     * display Profile using Amcharts framework. This method needs AmCharts libraries to be loaded.
     *
     * @param {Object} data - collection elevations
     * @param {HTMLElement} container - container
     * @param {Object} context - this control object
     */
    ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS = function (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS");

        // Calcul du profile
        if (typeof AmCharts === "undefined") {
            logger.log("Lib. AmCharts is not loaded !");
            return;
        }

        var profile = ProfileElevationPathDOM.displayProfileLibAmCharts(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    };

    /**
     * display Profile using D3 javascript framework. This method needs D3 libraries to be loaded.
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    ElevationPath.DISPLAY_PROFILE_LIB_D3 = function (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_D3");

        // Calcul du profile
        if (typeof d3 === "undefined") {
            logger.log("Lib. D3 is not loaded !");
            return;
        }

        var profile = ProfileElevationPathDOM.displayProfileLibD3(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    };

    /**
     * display Profile without graphical rendering (raw service response)
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    ElevationPath.DISPLAY_PROFILE_RAW = function (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_RAW");

        var profile = ProfileElevationPathDOM.displayProfileRaw(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    };

    /**
     * Display Profile function used by default : no additonal framework needed.
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    ElevationPath.DISPLAY_PROFILE_BY_DEFAULT = function (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_BY_DEFAULT");

        var profile = ProfileElevationPathDOM.displayProfileByDefault(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    };

    /**
     * Styles applied by default if stylesOptions property is not set.
     */
    ElevationPath.DEFAULT_STYLES = {
        // styling drawing by default
        // see => Measures.DEFAULTS_STYLES
        // stying marker to the profile by default
        MARKER : new Icon({
            src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAsCAYAAAAATWqyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABTtJREFUeNq8WGtsFUUU/rb3gtdCAykFG9AUDTQUKimhxUewEusrJYoBo4FfEgoqotHERH6oP9TGmJhIrIlWAf9hjAaEiME2pgFfVVpFii8sWqIQLLSx3EJLW7p+Z2Z2b2l7d/b23vZLTmZ2duacb2fmnDk7DlKA67rXs1hJKacsohRQppjXFygnKT9TDlH2O47zFzIFGnco91EOuqnjoBnr2Ow4FhIlLN6m3DykFTh3BGj/Doj/CfSe082xPCDnBmDWTUBeyXDVjZTHOUNHUiZCEs+weI0ySTV0/w0c2wa07gIungn+vOx8YN46oPhpYOp1Xms/5TmSeSMUERKImFnYqBoGuPRNL5LEW8BgX2rrmjWZZLYApS8BUW8r4T0zO5eTEjFr+S6lSjV0HgPqVwNdf6S30abNB+7aDeQWey3bKZtIxvU5DxvyrE/izJfAvuXpkxCIDtElOjWqjK2RM8LZWMbiG0oEnUc5kB7a14WMYvI04H56du5ieZKluZWz8r0/IyQh5TuKRH8cqFuTeRIC0Sm6xYbYok1j21+ahyhLVO3wC8D5VowbRLfY0FhibOulIavDLEoRZyD8sJDeMWBXKG5ZsIobsdDsg+OMq3u1m1u9KQo8zP45EqjRxOUpk6i50IRl4FuGjpZtwUoiMYa314GFj/EzIsN8n8v+C1e4kfvwcm+wnhsZY27xQ8oiWZpKrWRQB6tAElfxpKnjsCdGklDzG9HvpI/0DYLYEpsalVnmAAM6fgR62oMHl70C5N9mn3rpI32DILbEpkZ5ljlFgbPNFtebzij5VPhNKX1lTBASNtXSzPZ3cxCuvVOH7FTCu4yxeZDGbCES0z5+PniQ3uGpwTYmYTOWCPGTpgYP6u9OnYhtzBCbQkSH0NiM4EEdP6VOxDYmYbNLiJxQ1elFwYPaG3XQCn3QHddjgpCweUKI6K2bvzw4YROf//rJob6fZl/H2FRoFiINfqo3qyzYwD8MVIeYLw32J+8j76SP9A2C2BKbGg1CZL+EF/W4YKP9a3/fCeyhkrY9DOOXEu1SlzZ5J31sSNjqURm/OfQkY9qgvkYOvXhbuH0g505Oga7HT9rPF9+t5+pDL0ulwzt46FV5ROax+JUSRRtP0LoHMK64+xNg7iqVEVOKSKRVxRGpsKhRnaRD4SPjR0J0axKCGmP7ilQxm4X8d8xXmfvHJZlPkCR3WfODl9FLMlxCIhevSJ5Nwzo1XdKxYpe3hpmB6BKdmoS43VqPxIgsni+aWOg8biZ3f+nLmSMiuvKWek/P01az7QdLyNVT7lC/l59WAKcb0iMxhzpW1nvmvpDtSiKD1l9OkpnDgv8UyMWFU9wvTP8vdY6NhJwnD1JVtso2OiiLSeL0iJUbNfg6zikVVwRTyOn2HWOfjfLtHgnBhtFIJCViyNDZUatdmnGlaFPqJIoe1WM1aqlz71ivJbLNobgAA9zgu7nZ/vstHAk5WVdzaPRqmGC5lER6kjpV4OWJdq+1kkshSk4VH9izcy/bV66qSPQZV+0J9G7rTY6+XNmqHmYwyJVV24kse1X31dhKHdasygkzy+a64oC4nWr47F4e858nSbLv4V/KAe9JKpVDrx/SImLIXMOiRUKdujESl+49O8xVZxpXzVc/C/I/RxL/hgq8YYkYhev9q6kVO4d9B+sr3vdICNaHJTHWW8Ya/87wqy2uWwstUk/gTYw3aCRGOarMDfS67kfFWqSuIe9imAjQEC272nJHixYNaSvGRIIGN49ywbsZEw1zI11N6TZSHeaGORn+F2AAJtRIMx4t+hUAAAAASUVORK5CYII=",
            anchor : [0.5, 1],
            snapToPixel : true
        }),
        // styling service results points by default
        RESULTS : {
            // INFO orienté maintenance !
            imageRadius : 5,
            imageFillColor : "rgba(128, 128, 128, 0.2)",
            imageStrokeColor : "rgba(0, 0, 0, 0.7)",
            imageStrokeWidth : 2
        }
        // FIXME ???
        // PROFILE : {
        //     type : "serial",
        //     pathToImages : "http://cdn.amcharts.com/lib/3/images/",
        //     categoryField : "dist",
        //     autoMarginOffset : 0,
        //     marginRight : 10,
        //     marginTop : 10,
        //     startDuration : 0,
        //     color : "#5E5E5E",
        //     fontSize : 10,
        //     theme : "light",
        //     thousandsSeparator : "",
        //     categoryAxis : {
        //         color : "#5E5E5E",
        //         gridPosition : "start",
        //         minHorizontalGap : 40,
        //         tickPosition : "start",
        //         title : "Distance (km)",
        //         titleColor : "#5E5E5E",
        //         startOnAxis : true
        //     },
        //     chartCursor : {
        //         animationDuration : 0,
        //         bulletsEnabled : true,
        //         bulletSize : 10,
        //         categoryBalloonEnabled : false,
        //         cursorColor : "#F90",
        //         graphBulletAlpha : 1,
        //         graphBulletSize : 1,
        //         zoomable : false
        //     },
        //     trendLines : [],
        //     graphs : [
        //         {
        //             balloonColor : "#CCCCCC",
        //             balloonText : "<span class='altiPathValue'>[[title]] : [[value]]m</span><br/><span class='altiPathCoords'>(lat: [[lat]] / lon:[[lon]])</span>",
        //             bullet : "round",
        //             bulletAlpha : 0,
        //             bulletBorderColor : "#FFF",
        //             bulletBorderThickness : 2,currentSlope
        //             bulletColor : "#F90",
        //             bulletSize : 6,
        //             hidden : false,
        //             id : "AmGraph-1",
        //             fillAlphas : 0.4,
        //             fillColors : "#C77A04",
        //             lineAlpha : 1,
        //             lineColor : "#C77A04",
        //             lineThickness : 1,
        //             title : "Altitude",
        //             valueField : "z"
        //         }
        //     ],
        //     guides : [],
        //     valueAxes : [
        //         {
        //             id : "ValueAxis-1",
        //             minVerticalGap : 20,
        //             title : "Altitude (m)"
        //         }
        //     ],
        //     allLabels : [],
        //     balloon : {
        //         borderColor : "#CCCCCC",
        //         borderThickness : 1,
        //         fillColor : "#FFFFFF",
        //         showBullet : true
        //     },
        //     titles : []
        // }
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
     * Attach control to map. Overloaded ol.control.Control.setMap() method.
     *
     * @param {ol.Map} map - Map.
     */
    ElevationPath.prototype.setMap = function (map) {
        logger.trace("ElevationPath::setMap");

        if (map) {
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
            if (!this.options.target) {
                MeasureToolBox.add(map, this);
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        Control.prototype.setMap.call(this, map);
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
     * clean
     */
    ElevationPath.prototype.clean = function () {
        logger.trace("ElevationPath::clean");

        var map = this.getMap();

        // fenetre du profil
        this._panelContainer.style.display = "none";
        // this._panelContainer.style.visibility = "hidden";

        // picto
        this._showContainer.checked = false;

        this._removeProfile();
        this._removeMeasure();
        this._removeMeasureInteraction(map);
    };

    /**
     * Remove measure
     * @private
     */
    ElevationPath.prototype._removeMeasure = function () {
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
    };

    /**
     * Remove profile
     * @private
     */
    ElevationPath.prototype._removeProfile = function () {
        // graph
        this._profile = null;

        // on vide le container
        if (this._profileContainer) {
            while (this._profileContainer.firstChild) {
                this._profileContainer.removeChild(this._profileContainer.firstChild);
            }
        }
    };

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize control (called by constructor)
     *
     * @param {Object} options - options
     *
     * @private
     */
    ElevationPath.prototype._initialize = function (options) {
        logger.trace("ElevationPath::_initialize : ", options);

        // liste des options
        this.options = {
            target : null,
            render : null,
            active : false,
            apiKey : null,
            elevationOptions : {},
            layerDescription : {
                title : "Profil altimétrique",
                description : "Mon profil altimétrique"
            },
            displayProfileOptions : {
                greaterSlope : true,
                meanSlope : true,
                ascendingElevation : true,
                descendingElevation : true,
                currentSlope : true,
                apply : null,
                target : null
            },
            stylesOptions : {
                profile : null,
                draw : null,
                marker : null
            }
        };

        // merge with user options
        Utils.mergeParams(this.options, options);

        this.options.target = options.target || null;
        // this.options.render = options.render || null;

        // cle API sur le service
        this.options.apiKey = options.apiKey;

        // gestion de l'affichage du profil
        var _profile = options.displayProfileOptions || {};

        // gestion de la fonction du profil
        var displayFunction = _profile.apply;
        this.options.displayProfileOptions.apply = (typeof displayFunction === "function")
            ? displayFunction : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT;

        // gestion du container du profil
        var displayContainer = _profile.target;
        this.options.displayProfileOptions.target = (typeof displayContainer !== "undefined")
            ? displayContainer : null;

        // gestion des styles
        var _styles = options.stylesOptions || {};

        // FIXME ???
        // gestion du style du profil
        // var profileStyle = _styles.profile;
        // this.options.stylesOptions.profile = ( typeof profileStyle === "undefined" || Object.keys(profileStyle).length === 0 ) ?
        //     ElevationPath.DEFAULT_STYLES.PROFILE : profileStyle;
        // this._createStylingProfile();

        // gestion des styles du tracé
        this.options.stylesOptions.draw = _styles.draw || {};
        this._createStylingDraw();

        // gestion des styles du marker
        this.options.stylesOptions.marker = _styles.marker || {};
        this._createStylingMarker();
    };

    /**
     * initialize component container (DOM)
     *
     * @returns {DOMElement} DOM element
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

        // info
        var info = this._infoContainer = this._createElevationPathInformationsElement();
        panel.appendChild(info);

        if (this.options.displayProfileOptions.target === null) {
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

        if (!rightManagement) {
            this._noRightManagement = true;
            return;
        }

        // on recupère les informations utiles
        // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
        // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
        // été renseignée.
        if (!this.options.apiKey) {
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

        var marker = ElevationPath.DEFAULT_STYLES.MARKER;
        logger.trace("style marker", marker);

        // si marker n'est pas un objet ol.style.Image, on applique le
        // style par défaut.
        if (this.options.stylesOptions.marker instanceof Image) {
            marker = this.options.stylesOptions.marker;
        }

        this._markerStyle = new Style({
            image : marker
        });
    };

    /**
     * create style draw object : "ol.style"
     *
     * @private
     */
    ElevationPath.prototype._createStylingDraw = function () {
        logger.trace("ElevationPath::_createStylingDraw");

        // on interprete les params pour y creer un objet ol.Style
        var styles = this.options.stylesOptions.draw;

        // style de depart
        logger.trace("style start", styles.start);

        // Creation à partir des styles par défaut
        var startStyleOpts = {
            image : Measures.DEFAULT_POINTER_STYLE,
            stroke : Measures.DEFAULT_DRAW_START_STYLE.getStroke()
        };
        // ecrasement à partir des propriétés renseignées
        if (styles.hasOwnProperty("pointer") && styles.pointer instanceof Image) {
            startStyleOpts.image = styles.pointer;
        }
        if (styles.hasOwnProperty("start") && styles.start instanceof Stroke) {
            startStyleOpts.stroke = styles.start;
        }

        this._drawStyleStart = new Style(startStyleOpts);

        // style de fin
        logger.trace("style finish", styles.finish);

        var finishStyleOpts = {
            stroke : Measures.DEFAULT_DRAW_FINISH_STYLE.getStroke()
        };
        // ecrasement à partir des propriétés renseignées
        if (styles.hasOwnProperty("finish") && styles.finish instanceof Stroke) {
            finishStyleOpts.stroke = styles.finish;
        }

        this._drawStyleFinish = new Style(finishStyleOpts);
    };

    /**
     * create style graph
     * FIXME : à revoir car ne sert que pour AmCharts !?
     *
     * @private
     */
    ElevationPath.prototype._createStylingProfile = function () {
        logger.trace("ElevationPath::_createStylingProfile");

        var userStyles = this.options.stylesOptions.profile;

        logger.trace("style profile", userStyles);

        var defaultStyle = ElevationPath.DEFAULT_STYLES.PROFILE;
        Object.keys(defaultStyle).forEach((key) => {
            if (!userStyles.hasOwnProperty(key)) {
                // si le style user n'existe pas, on ajoute celui par defaut
                userStyles[key] = defaultStyle[key];
            } else {
                var _defaultStyle = defaultStyle[key];
                if (typeof _defaultStyle === "object") {
                    // on merge avec un objet,
                    // les styles user ecrasent ceux par defaut...
                    Utils.mergeParams(_defaultStyle, userStyles[key]);
                    userStyles[key] = _defaultStyle;
                }
            }
        });
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

        this._measureSource = new VectorSource();

        this._measureVector = new VectorLayer({
            source : this._measureSource,
            style : this._drawStyleFinish
        });

        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant.
        this._measureVector.gpResultLayerId = "measure";

        map.addLayer(this._measureVector);

        // Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        map.getControls().forEach(
            (control) => {
                if (control instanceof LayerSwitcher) {
                    // un layer switcher est présent dans la carte
                    var layerId = this._measureVector.gpLayerId;
                    // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                    if (control._layers[layerId].title === layerId) {
                        control.addLayer(
                            this._measureVector, {
                                title : this.options.layerDescription.title,
                                description : this.options.layerDescription.description
                            }
                        );
                    }
                }
            }
        );
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
        this._measureDraw = new DrawInteraction({
            source : this._measureSource,
            type : "LineString",
            style : this._drawStyleStart
        });

        this._measureDraw.setProperties({
            name : "ElevationPath",
            source : this
        });

        map.addInteraction(this._measureDraw);

        // Event start
        this._measureDraw.on("drawstart", (evt) => {
            logger.trace("drawstart", evt);

            // delete marker current
            if (this._marker !== null) {
                this._measureSource.removeFeature(this._marker);
                this._marker = null;
            }

            // set new feature and remove last feature
            if (this._lastSketch !== null) {
                this._measureSource.removeFeature(this._lastSketch);
                this._lastSketch = null;
            }
            this._currentSketch = evt.feature;

            // and, all features
            var _features = this._measureSource.getFeatures();
            for (var i = 0; i < _features.length; i++) {
                this._measureSource.removeFeature(_features[i]);
            }
        });

        // Event end
        this._measureDraw.on("drawend", (evt) => {
            logger.trace("drawend", evt);

            // set feature
            this._lastSketch = this._currentSketch;

            // set an alti request and display results

            // FIXME à revoir...
            // Si il n'y a pas de surcharge utilisateur de la fonction de recuperation des
            // resultats, on realise l'affichage du panneau
            if (typeof this.options.elevationOptions.onSuccess === "undefined" && this.options.displayProfileOptions.target === null) {
                this._panelContainer.style.display = "block";
                // self._panelContainer.style.visibility = "visible";
            }
            this._requestService();
        });
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
     * @returns {Object[]} geometry
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

        var map = this.getMap();
        var projSrc = map.getView().getProjection();
        var projDest = "EPSG:4326";
        var coordinates = this._currentSketch.getGeometry().getCoordinates();
        for (var i = 0; i < coordinates.length; i++) {
            var xy = coordinates[i];
            var ll = xy;
            // on transmet au service des coordonnées en EPSG:4326
            if (projSrc !== projDest) {
                ll = olTransformProj(xy, projSrc, projDest);
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
     * @returns {Integer} length
     *
     * @private
     */
    ElevationPath.prototype._getLength = function () {
        if (this._currentSketch === null) {
            logger.warn("Current Feature undefined !?");
            return;
        }

        var length = 0;

        var map = this.getMap();
        var projSrc = map.getView().getProjection();
        var projDest = "EPSG:4326";

        var coordinates = this._currentSketch.getGeometry().getCoordinates();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = olTransformProj(coordinates[i], projSrc, projDest);
            var c2 = olTransformProj(coordinates[i + 1], projSrc, projDest);
            length += olGetDistanceSphere(c1, c2);
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
        if (!geometry) {
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
        Utils.mergeParams(options, this.options.elevationOptions);

        // au cas où ...
        Utils.mergeParams(options, {
            apiKey : options.apiKey || this.options.apiKey
        });

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        Utils.mergeParams(options, {
            ssl : options.ssl || this.options.ssl || true
        });

        // les callbacks
        var self = this;

        // callback _requestServiceOnSuccess
        var _requestServiceOnSuccess = function (result) {
            logger.trace(result);
            if (result) {
                self._panelContainer.style.display = "block";
                // self._panelContainer.style.visibility = "visible";
                self._displayProfile(result.elevations);
                self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
                self._waiting = false;
            }
        };

        // callback _requestServiceOnFailure
        var _requestServiceOnFailure = function (error) {
            // on ferme le panneau en cas d'erreur !
            self._panelContainer.style.display = "none";
            // self._panelContainer.style.visibility = "hidden";
            logger.error(error.message);
            self._waitingContainer.className = "GPelevationPathCalcWaitingContainerHidden";
            self._waiting = false;
        };

        Utils.mergeParams(options, {
            onSuccess : this.options.elevationOptions.onSuccess || _requestServiceOnSuccess,
            onFailure : this.options.elevationOptions.onFailure || _requestServiceOnFailure
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

        var _data = elevations;

        // FIXME facteur à 2000 doit il etre une option ?
        var _limite = 2000; // metres
        var _unit = "km";
        var _factor = 1000;
        var _length = this._getLength();
        if (_length < _limite) {
            _factor = 1;
            _unit = "m";
        }

        // Calcul de la distance au départ pour chaque point + arrondi des lat/lon
        _data[0].dist = 0;
        _data[0].slope = 0;

        var _distanceMinus = 0;
        var _distancePlus = 0;
        var _ascendingElevation = 0;
        var _descendingElevation = 0;
        var _distance = 0;
        var _slopes = 0;

        for (var i = 1; i < _data.length; i++) {
            var a = [_data[i].lon, _data[i].lat];
            var b = [_data[i - 1].lon, _data[i - 1].lat];
            var dist = olGetDistanceSphere(a, b);

            var za = _data[i].z;
            var zb = _data[i - 1].z;
            if (za < 0) {
                za = 0;
            }
            if (zb < 0) {
                zb = 0;
            }
            var slope = za - zb;
            if (slope < 0) {
                _distanceMinus += dist;
                _descendingElevation += slope;
            } else if (slope > 0) {
                _distancePlus += dist;
                _ascendingElevation += slope;
            }
            _distance += dist / _factor;
            _data[i].dist = _distance;

            _slopes += (slope) ? Math.abs(Math.round(slope / dist * 100)) : 0;
            _data[i].slope = (slope) ? Math.abs(Math.round(slope / dist * 100)) : 0;

            // EVOL ?
            // cf. gradiant
            // http://www.color-hex.com/color/00b798
            var value = _data[i].slope;
            if (value > 15 && value < 30) {
                _data[i].color = "#005b4c";
            } else if (value > 30 && value < 45) {
                _data[i].color = "#00362d";
            } else if (value > 45) {
                _data[i].color = "#00120f";
            } else {
                _data[i].color = "#00B798";
            }

            _data[i].lat = Math.round(_data[i].lat * 10000) / 10000;
            _data[i].lon = Math.round(_data[i].lon * 10000) / 10000;
        }

        // Valeur du coeff d'arrondi des distances en fonction de la distance totale
        var coeffArrond = 100;
        if (_distance > 100) {
            coeffArrond = 1;
        } else if (_distance > 10) {
            coeffArrond = 10;
        }

        // Correction arrondi distance totale
        _distance = Math.round(_distance * coeffArrond) / coeffArrond;
        _distanceMinus = Math.round(_distanceMinus * coeffArrond) / coeffArrond;
        _distancePlus = Math.round(_distancePlus * coeffArrond) / coeffArrond;

        // Correction des altitudes aberrantes + arrondi des calculs de distance + ...
        var _altMin = _data[0].z;
        var _altMax = _data[0].z;
        var _greaterSlope = _data[0].slope;

        for (var ji = 0; ji < _data.length; ji++) {
            var d = _data[ji];
            if (d.z < 0) {
                d.z = 0;
            }
            if (d.z >= _altMax) {
                _altMax = d.z;
            }
            if (d.z <= _altMin) {
                _altMin = d.z;
            }

            d.dist = Math.round(d.dist * coeffArrond) / coeffArrond;
            // FIXME erreur avec D3 car cette lib souhaite un numerique !
            // d.dist = d.dist.toLocaleString();

            if (d.slope > _greaterSlope) {
                _greaterSlope = d.slope;
            }
        }

        return {
            greaterSlope : _greaterSlope, // pente max
            meanSlope : Math.round(_slopes / _data.length), // pente moyenne
            distancePlus : _distancePlus.toLocaleString(), // distance cumulée positive
            distanceMinus : _distanceMinus.toLocaleString(), // distance cumulée négative
            ascendingElevation : _ascendingElevation, // dénivelé cumulée positive
            descendingElevation : _descendingElevation, // dénivelé cumulée négative
            altMin : _altMin.toLocaleString(), // altitude min
            altMax : _altMax.toLocaleString(), // altitude max
            distance : _distance.toLocaleString(), // distance totale
            unit : _unit, // unité des mesures de distance
            points : _data
        };
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
        if (this._data) {
            this._data = {};
        }

        // sauvegarde des données
        var data = this._data = this._computeElevationMeasure(elevations);

        // container
        var container = this.options.displayProfileOptions.target;
        if (container) {
            container.appendChild(this._panelContainer);
        }
        container = this._profileContainer;

        // TODO contexte ?
        var context = this;

        // fonction
        var displayFunction = this.options.displayProfileOptions.apply;

        // execution...
        displayFunction.call(this, data, container, context);

        var opts = this.options.displayProfileOptions;
        var element = document.getElementById("GPelevationPathPanelInfo-" + this._uid);
        if (element) {
            if (opts.greaterSlope ||
                opts.meanSlope ||
                opts.ascendingElevation ||
                opts.descendingElevation) {
                // on affiche les informations
                element.style.display = "block";
            }
        }
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
        Interactions.unset(map, {
            current : "ElevationPath"
        });

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
            this._removeMeasure();
            this._removeProfile();
            this._removeMeasureInteraction(map);
        }
    };

    /**
     * this method is called by event 'click' on '' picto
     * (cf. this.),
     * and display the panel info
     *
     * @private
     */
    ElevationPath.prototype.onOpenElevationPathInfoClick = function () {
        // options d'affichage
        var meanSlope = this.options.displayProfileOptions.meanSlope;
        var greaterSlope = this.options.displayProfileOptions.greaterSlope;
        var ascendingElevation = this.options.displayProfileOptions.ascendingElevation;
        var descendingElevation = this.options.displayProfileOptions.descendingElevation;

        // clean
        var div = this._infoContainer;
        if (div.childElementCount) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }

        // creation des infomations

        if (ascendingElevation) {
            this._addElevationPathInformationsItem("Dénivelé positif : " + this._data.ascendingElevation.toLocaleString() + " m");
        }

        if (descendingElevation) {
            this._addElevationPathInformationsItem("Dénivelé négatif : " + this._data.descendingElevation.toLocaleString() + " m");
        }

        if (meanSlope) {
            this._addElevationPathInformationsItem("Pente moyenne : " + this._data.meanSlope.toLocaleString() + " %");
        }

        if (greaterSlope) {
            this._addElevationPathInformationsItem("Plus forte pente : " + this._data.greaterSlope.toLocaleString() + " %");
        }

        // show des informations !
        if (div.className === "GPelevationPathInformationsContainerVisible") {
            clearTimeout(this._timerHdlr);
            div.className = "GPelevationPathInformationsContainerHidden";
        } else {
            div.className = "GPelevationPathInformationsContainerVisible";
        }

        // hidden des informations !
        this._timerHdlr = setTimeout(function () {
            div.className = "GPelevationPathInformationsContainerHidden";
        }, 4000);
    };

    return ElevationPath;
}(Control));

export default ElevationPath;

// Expose ElevationPath as ol.control.ElevationPath (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ElevationPath = ElevationPath;
}
