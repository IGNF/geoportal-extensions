define([
    "Leaflet/Controls/LayerSwitcher",
    "Leaflet/Controls/Isocurve",
    "Leaflet/Controls/MousePosition",
    "Leaflet/Controls/ReverseGeocoding",
    "Leaflet/Controls/Route",
    "Leaflet/Controls/SearchEngine",
    "Leaflet/Controls/ElevationPath",
    "Leaflet/Controls/Logo"
],
function (
    LayerSwitcher,
    Isocurve,
    MousePosition,
    ReverseGeocoding,
    Route,
    SearchEngine,
    ElevationPath,
    Logo
) {

    "use strict";

    /**
    * Geoportal Controls Factory to be used together with Leaflet Maps.
    *
    * @module Controls
    * @alias L.geoportalControl
    * @example
    * var layerSwitcher = L.geoportalControl.LayerSwitcher(options);
    */
    var Controls = {

        /**
        * Factory function for LayerSwitcher Control creation.
        *
        * @method LayerSwitcher
        * @static
        * @alias L.geoportalControl.LayerSwitcher
        * @param {Object} options - options for function call.
        * @param {String}  [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.collapsed] - collapse mode, false by default
        * @param {Array}   [options.layers] - list of layers to be configured. Each array element is an object, with following properties :
        * @param {Object}  [options.layers.layer] - layer object
        * @param {Boolean} [options.layers.display] - display layer in widget layer list
        * @param {Object}  [options.layers.config] - layer display config
        * @param {String}  [options.layers.config.visibility] - layer visibility on map
        * @param {String}  [options.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
        * @param {String}  [options.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
        * @param {String}  [options.layers.config.quicklookUrl] - link to a quick look image for this layer.
        * @param {Array}   [options.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
        *      - url (String, mandatory) : link to a legend
        *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
        * @param {Array} [options.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
        * @returns {L.geoportalControl.LayerSwitcher}
        * @example
        *  layers = [
        *      {
        *          layer : wms1,
        *          display : false,
        *          config : {
        *              title : "test layer name 1",
        *              description : "test layer desc 1",
        *          }
        *      }
        *  ];
        *
        *  options = {
        *      position : "topright",
        *      collapsed : true,
        *      layers : layers
        *  };
        *
        *  var layerSwitcher = L.geoportalControl.LayerSwitcher(options);
        */
        LayerSwitcher : function (options) {
            return new LayerSwitcher(options);
        },

        /**
        * Factory function for Isocurve Control creation.
        *
        * @method Isocurve
        * @static
        * @alias L.geoportalControl.Isocurve
        * @param {Object} options - Isocurve control options
        * @param {Sting}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
        * @param {String}  [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.collapsed] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
        * @param {Object}  [options.exclusions] - list of exclusions with status (true = checked), by default : ["toll":false, "tunnel":false, "bridge":false].
        * @param {Array}   [options.graphs] - list of graph resources to be used for isocurve calculation, by default : ["Voiture", "Pieton"]. The first element is selected.
        * @param {Array}   [options.methods] - list of methods, by default : ["time", "distance"]. The first element is selected by default.
        * @param {Array}   [options.directions] - list of directions to be displayed, by default : ["departure", "arrival"]. The first element is selected by default.
        *      Directions enable to specify if input location point will be used as a departure point ("departure") or as an arrival point ("arrival")
        * @param {Boolean} [options.disableReverse = false] - whether to enable/disable the reverse geocoding
        * @param {Object} [options.isocurveOptions] - isocurve service options.
        * @param {Object} [options.autocompleteOptions] - autocomplete service options.
        * @returns {L.geoportalControl.Isocurve}
        * @example
        *  var iso = L.geoportalControl.Isocurve({
        *      collapsed : false
        *      methods : ["time", "distance"],
        *      exclusions : {
        *         toll : true,
        *         bridge : false,
        *         tunnel : true
        *      },
        *      graphs : ["Pieton", "Voiture"],
        *      isocurveOptions : {},
        *      autocompleteOptions : {}
        *  });
        */
        Isocurve : function (options) {
            return new Isocurve(options);
        },

        /**
        * Factory function for Geoportal MousePosition Control creation.
        *
        * @method MousePosition
        * @static
        * @alias L.geoportalControl.MousePosition
        * @param {Object} options - options for function call.
        * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
        * @param {String}  [options.position] - position of component into the map, 'bottomleft' by default
        * @param {Boolean} [options.collapsed] - collapse mode, false by default
        * @param {Array}   [options.systems] - list of projection systems, GEOGRAPHIC, MERCATOR, LAMB93 and LAMB2E by default
        *      Each array element (=system) is an object with following properties :
        * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
        * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
        * @param {String}  [options.systems.type] - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
        * @param {Array}   [options.units] - list of units by system, Geographical and Metric by default
         *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
         *      and "M" or "KM" for metric coordinates
        * @param {Boolean} [options.displayAltitude] - active/desactivate the altitude panel, if desactivate, have just the coordinate panel, true by default
        * @param {Boolean} [options.displayCoordinate] - active/desactivate the coordinate panel, if desactivate, have just the altitude panel, true by default
        * @param {Object}  [options.altitude] - elevation configuration
        * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
        * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
        * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
        * @param {Number}  [options.altitude.noDataValue] - value used for altitude service no data (default is -99999). In this case, "---m" will be displayed instead of "-99999m"
        * @param {Number}  [options.altitude.noDataValueTolerance] - tolerance for no data value :
        *                  values in [noDataValue - noDataValueTolerance ; noDataValue + noDataValueTolerance] interval will not be displayed, but "---m" will be displayed instead.
        *                  Default is 90000
        * @returns {L.geoportalControl.MousePosition}
        * @example
        *  var MousePosition = L.geoportalControl.MousePosition({
        *      position : 'bottomleft',
        *      collapsed : false,
        *      displayAltitude : true,
        *      altitude : {
        *           triggerDelay : 100,
        *           responseDelay : 500,
        *           noDataValue : -99999,
        *           noDataValueTolerance : 90000,
        *           serviceOptions : {}
        *      },
        *      systems : [
        *       {
        *          crs : L.CRS.EPSG4326,
        *          label : "Lon,Lat",
        *          type : "Geographical"
        *        },
        *       {
        *          crs : L.geoportalCRS.EPSG2154,
        *          label : "Lambert 93",
        *          type : "Metric"
        *        }
        *      ],
        *      units : ["DEC", "DMS"]
        *  });
        */
        MousePosition : function (options) {
            return new MousePosition(options);
        },

        /**
        * Factory function for Geoportal ReverseGeocode Control creation.
        *
        * @method ReverseGeocode
        * @static
        * @alias L.geoportalControl.ReverseGeocode
        * @extends {L.Control}
        * @param {Object} options - ReverseGeocoding control options
        * @param {String}  [options.apiKey] - API key for services call (reverse geocode service), mandatory if autoconf service has not been charged in advance
        * @param {String}  [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.collapsed] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
        * @param {Array}  [options.resources] - resources for geocoding, by default : ["StreetAddress", "PositionOfInterest"]
        * @param {Array}  [options.delimitations] - delimitations for reverse geocoding, by default : ["Point", "Circle", "Extent"]
        * @param {Object}  [options.ReverseGeocodeOptions] - reverse geocode service options. see {@link http://depot.ign.fr/geoportail/bibacces/develop/doc/module-Services.html#~ReverseGeocode} to know all reverse geocode options.
        * @returns {L.geoportalControl.ReverseGeocode}
        * @example
        *  var iso = L.geoportalControl.ReverseGeocode({
        *      collapsed : false,
        *      position : "topright",
        *      resources : ["StreetAddress", "PositionOfInterest"],
        *      delimitations : ["Point", "Circle"],
        *      reverseGeocodeOptions : {}
        *  });
        */
        ReverseGeocode : function (options) {
            return new ReverseGeocoding(options);
        },

        /**
        * Factory function for Geoportal Route Control creation.
        *
        * @method Route
        * @static
        * @alias L.geoportalControl.Route
        * @extends {L.Control}
        * @param {Object} options - options for function call.
        * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
        * @param {String}  [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.collapsed] - collapse mode, false by default
        * @param {Object}  [options.exclusions] - list of exclusions with status
        * @param {Array}   [options.graphs] - list of resources, by default : ["Voiture", "Pieton"], and the first element is selected.
        * @param {Object}  [options.autocompleteOptions] - options of autocomplete service
        * @param {Object}  [options.routeOptions] - options of route service
        * @returns {L.geoportalControl.Route}
        * @example
        *  var route = L.geoportalControl.Route({
        *      position : "topright",
        *      collapsed : true,
        *      exclusions : {
        *         "toll" : true,
        *         "bridge" : false,
        *         "tunnel" : true
        *      },
        *      graphs : ['Pieton', 'Voiture'],
        *      autocompleteOptions : {},
        *      routeOptions : {}
        *  });
        */
        Route : function (options) {
            return new Route(options);
        },

        /**
        * Factory function for Geoportal SearchEngine Control creation.
        *
        * @method SearchEngine
        * @static
        * @alias L.geoportalControl.SearchEngine
        * @extends {L.Control}
        * @param {Object}  options - control options
        * @param {String}  [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
        * @param {Boolean} [options.collapsed] - collapse mode, false by default
        * @param {String}  [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.displayInfo] - get informations on popup marker
        * @param {Sting}   [options.apiKey] - API key, mandatory if autoconf service has not been charged in advance
        * @param {Object}  [options.resources] - resources to be used by geocode and autocompletion services, by default : ["StreetAddress", "PositionOfInterest"]
        * @param {Boolean} [options.displayAdvancedSearch] - False to disable advanced search tools (it will not be displayed). Default is true (displayed)
        * @param {Object}  [options.advancedSearch] - advanced search for geocoding (filters)
        * @param {Object}  [options.geocodeOptions] - options of geocode service
        * @param {Object}  [options.autocompleteOptions] - options of autocomplete service
        * @returns {L.geoportalControl.SearchEngine}
        * @example
        *  var SearchEngine = L.geoportalControl.SearchEngine({
        *      position : "topright",
        *      collapsed : true,
        *      displayInfo : true,
        *      displayAdvancedSearch : true,
        *      resources : ["PositionOfInterest", "StreetAddress"],
        *      advancedSearch : {
        *          PositionOfInterest : [{name : "municipality", title : "Ville"}],
        *          StreetAddress : [{...}],
        *          CadastralParcel : null,
        *      },
        *      apiKey : "zfgzrgffg57rfg8ar7gr4g5r4",
        *      geocodeOptions : {},
        *      autocompleteOptions : {}
        *  });
        */
        SearchEngine : function (options) {
            return new SearchEngine(options);
        },

        /**
        * Factory function for ElevationPath Control creation.
        *
        * @method ElevationPath
        * @static
        * @alias L.geoportalControl.ElevationPath
        * @param {Object} options - ElevationPath control options
        * @param {Sting}   [options.apiKey] - API key for services call (isocurve and autocomplete services), mandatory if autoconf service has not been charged in advance
        * @param {String}  [options.position] - position of component into the map, 'topleft' by default
        * @param {Boolean} [options.collapsed] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
        * @param {Object} [options.graphOptions] - TODO graph options.
        * @param {Object} [options.elevationPathOptions] - altitude service options.
        * @returns {L.geoportalControl.ElevationPath}
        * @example
        *  var e = L.geoportalControl.ElevationPath({
        *      collapsed : false
        *      position : "topleft"
        *      graphOptions : {},
        *      elevationPathOptions : {}
        *  });
        */
        ElevationPath : function (options) {
            return new ElevationPath(options);
        },

        /**
        * Control Logo
        *
        * @private
        * @method Logo
        * @extends {L.Control}
        * @alias L.geoportalControl.Logo
        * @param {Object} options - options for function call.
        * @param {String} options.position - 'topright' by default
        * @param {String} options.url - URL
        * @param {String} options.text - text
        * @param {String} options.picto - picto
        * @param {String|Object} options.size - picto size
        * @returns {Logo}
        * @example
        * var map  = L.map('map').setView([48, 2], 4);
        * var logo = L.geoportalControl.Logo({
        *   position : "topright",
        *   picto : "http://www.ign.fr/logo-ign.jpg",
        *   url : "http://www.ign.fr",
        *   text : "© IGN"
        *   size : {width : '50px', height : '30px'}
        * });
        * logo.addTo(map);
        */
        Logo : function (options) {
            return new Logo(options);
        }
    };

    return Controls;
});
