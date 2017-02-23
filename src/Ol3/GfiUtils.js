define([
  "ol",
  "gp",
  "woodman",
  "Common/Utils/ProxyUtils",
  "Ol3/Utils"
], function (
  ol,
  Gp,
  woodman,
  ProxyUtils,
  Utils
) {

    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("GfiUtils");

    var GfiUtils = {

        /**
        * Return layer format
        *
        * @param {ol.layer.Layer} l - layer openlayers
        *
        * @return {String} format - layer format can be wms, wmts, vector or unknown
        *
        */
        getLayerFormat : function (l) {
            var source = l.getSource();
            if ( source instanceof ol.source.TileWMS || source instanceof ol.source.ImageWMS ) {
                return "wms";
            }
            if ( source instanceof ol.source.WMTS ) {
                return "wmts";
            }
            if ( source instanceof ol.source.Vector ) {
                return "vector";
            }
            return "unknown";
        },

        /**
         * Info Popup creation and display
         *
         * @param {ol.Map} map - map openlayers
         * @param {ol.Coordinate} coords - coordinates where to anchor popup.
         * @param {HTMLElement} content - content to display
         * @param {String} [contentType='text/html'] - content mime-type
         * @return {Boolean} displayed - indicates if something has been displayed
         */
        displayInfo : function (map, coords, content, contentType) {
            logger.trace("[GfiUtils] : displayInfo...") ;

            if ( !contentType ) {
                contentType = "text/html";
            }

            if ( content === null) {
                return;
            }

            var _htmlDoc = null;
            var _parser  = null;

            var _content = content;
            _content = _content.replace(/\n/g, "");
            _content = _content.replace(/(>)\s*(<)/g, "$1$2");

            var scope  = typeof window !== "undefined" ? window : null;

            if ( typeof exports === "object" && window === null) {
                // code for nodejs
                var DOMParser = require("xmldom").DOMParser;
                _parser = new DOMParser();
                _htmlDoc = _parser.parseFromString(_content, contentType);
            } else if (scope.DOMParser) {
                // code for modern browsers
                _parser = new scope.DOMParser();
                _htmlDoc = _parser.parseFromString(_content, contentType);
            } else if (scope.ActiveXObject) {
                // code for old IE browsers
                _htmlDoc = new scope.ActiveXObject("Microsoft.XMLDOM");
                _htmlDoc.async = false;
                _htmlDoc.loadXML(_content);
            } else {
                console.log("Incompatible environment for DOM Parser !");
                return false;
            }

            var body = _htmlDoc.getElementsByTagName("body");
            if (body && body.length === 1) {
                if (!body[0].hasChildNodes()) {
                    return false;
                }
            }

            // Affichage des features.
            var element = document.createElement("div");
            element.className = "gp-feature-info-div";

            var closer = document.createElement("input");
            closer.type = "button" ;
            closer.className = "gp-styling-button closer";

            /**
             * fait disparaître la popup au clic sur x
             */
            closer.onclick = function () {
                if (map.featuresOverlay) {
                    map.removeOverlay(map.featuresOverlay) ;
                    map.featuresOverlay = null ;
                }
                return false;
            };

            var contentDiv = document.createElement("div");
            contentDiv.className = "gp-features-content-div" ;
            contentDiv.innerHTML = content ;
            /*
            if (content instanceof HTMLElement) {
                this.logger.trace("[OL3] : _displayInfo : pure HTMLElement") ;
                contentDiv.appendChild(content) ;
            } else {
                var parser = new DOMParser() ;
                var doc = null ;
                try {
                    doc = parser.parseFromString(content,contentType) ;
                    this.logger.trace("[OL3] : _displayInfo : HTMLElement from parser") ;
                    // FIXME : avec cette methode, on a une balise html + body qui s'insère...
                    contentDiv.appendChild(doc.documentElement) ;
                } catch (e) {
                    console.log(e) ;
                    this.logger.trace("[OL3] : _displayInfo : parsing content failed (not HTML)") ;
                    // en cas d'erreur : on se contente de recopier le contenu.
                    contentDiv.innerHTML = content ;
                }
            }
            */
            element.appendChild(contentDiv);
            element.appendChild(closer);

            if (map.featuresOverlay) {
                // fermeture d'une éventuelle popup déjà ouverte.
                map.removeOverlay(map.featuresOverlay) ;
                map.featuresOverlay = null ;
            }
            map.featuresOverlay = new ol.Overlay({
                // id : id,
                element : element,
                positioning : "bottom-center",
                insertFirst : false, // popup appears on top of other overlays if any
                stopEvent : true
            });
            map.addOverlay(map.featuresOverlay);
            map.featuresOverlay.setPosition(coords) ;

            return true;
        },

        /**
         * Gets HTML content from features array
         *
         * @param {ol.Map} map - map openlayers
         * @param {Array.<ol.Features>} features - ol3 features Array
         * @returns {HTMLElement} HTML content.
         */
        features2html : function (map, features) {
            var content = document.createElement("div") ;
            features.forEach(function (f) {
                var props = f.getProperties() ;
                if (props.hasOwnProperty("name")) {
                    var nameDiv = document.createElement("div") ;
                    nameDiv.className =  "gp-att-name-div" ;
                    // nameDiv.appendChild(document.createTextNode(props["name"])) ;
                    nameDiv.insertAdjacentHTML("afterbegin", props["name"]);
                    content.appendChild(nameDiv) ;
                }
                if (props.hasOwnProperty("description")) {
                    var descDiv = document.createElement("div") ;
                    descDiv.className = "gp-att-description-div" ;
                    // descDiv.appendChild(document.createTextNode(props["description"])) ;
                    descDiv.insertAdjacentHTML("afterbegin", props["description"]);
                    content.appendChild(descDiv) ;
                }
                var p = null ;
                var others = false ;
                var oDiv = null ;
                var ul = null ;
                var li = null ;
                for (p in props) {
                    if (p == "geometry" || p == "name" || p == "description") {
                        continue ;
                    }
                    if (!others) {
                        oDiv = document.createElement("div") ;
                        oDiv.className = "gp-att-others-div" ;
                        ul = document.createElement("ul") ;
                        others = true ;
                    }
                    li = document.createElement("li") ;
                    var span = document.createElement("span") ;
                    span.className = "gp-attname-others-span" ;
                    span.appendChild(document.createTextNode(p + " : ")) ;
                    li.appendChild(span) ;
                    li.appendChild(document.createTextNode(props[p])) ;
                    ul.appendChild(li) ;
                }
                if (ul) {
                    oDiv.appendChild(ul) ;
                    content.appendChild(oDiv) ;
                }
            },map) ;

            // pas de contenu !
            if (!content.hasChildNodes()) {
                content = null;
            }

            return content ;
        },

        /**
         * Indicates if there is a feature at the given coordinates for the given layer
         *
         * @param {ol.Map} map - map openlayers
         * @param {ol.layer.Layer} olLayer - vector layer openlayers
         * @param {ol.Coordinate} olCoordinate - coordinates pointed by user
         * @return {Boolean}
         *
         */
        layerGetFeatureAtCoordinates : function (map, olLayer, olCoordinate) {
            var pixel = map.getPixelFromCoordinate(olCoordinate);
            return map.hasFeatureAtPixel(pixel, function (layer) {
                        if ( layer === olLayer ) {
                            return true;
                        }
                        return false;
                    });
        },

        /**
         * Get information from all the features located at the specified coordinates
         * and belonging to the layers list argument. Those information are gathered
         * and displayed in an info popup.
         *
         * @param {ol.Map} map - map openlayers
         * @param {ol.Coordinate} olCoordinate - coordinates pointed by user
         * @param {Array.<ol.layer.Layer>} olLayers - layers requested
         *
         */
        displayVectorFeatureInfo : function (map, olCoordinate, olLayers) {
            var pixel = map.getPixelFromCoordinate(olCoordinate);

            // couches vecteur : on remplit un tableau avec les features à proximité.
            var features = [] ;
            map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                if ( !olLayers || olLayers.indexOf(layer) > -1 ) {
                    features.push(feature);
                }
            });
            if (features.length == 0) {
                // no features
                return false;
            }
            var content = this.features2html(map,features) ;
            // pas de contenu !
            if ( content === null) {
                return false;
            }
            // Affichage des features.
            this.displayInfo(map, olCoordinate, content.innerHTML) ;
            // this._displayInfo(evt.coordinate,content,"text/html") ;
            return true;
        },

        /**
         * Method to manage the request of information from a list of layers already added to the map.
         * Among the given list of layers only the visible ones are requested.
         * The priority is given to the upper layer having a feature at the pointed coordinates.
         * If the first (upper) feature encountered is from a vector layer the info popup will
         * display the information of the features from all visible vector layers and located at
         * the specified coordinates.
         *
         * @param {ol.Map} map - map openlayers
         * @param {ol.Coordinate} olCoordinate - coordinates pointed by user
         * @param {Array.<Object>} gfiLayers - list of layers which can be requested through the control. Each array element is an object, with following properties :
         * @param {ol.layer.Layer} gfiLayers.obj - ol.layer.Layer layer handled by the control (that has been added to map).
         * @param {String} [gfiLayers.event] - name of the mouse event triggering getFeatureInfo on this layer (that has been added to map). allowed values are : 'singleclick', 'dblclick' and 'contextmenu'
         * @param {String} [gfiLayers.infoFormat] - indicates the format mime-type of the response of GetFeatureInfo requests.
         * @param {Object} [proxyOptions] - options for poxy configuration :
         * @param {String} [proxyOptions.proxyUrl] - Proxy URL to avoid cross-domain problems, if not already set in mapOptions. Mandatory to import WMS and WMTS layer.
         * @param {Array.<String>} [proxyOptions.noProxyDomains] - Proxy will not be used for this list of domain names. Only use if you know what you're doing (if not already set in mapOptions).
         *
         */
        displayFeatureInfo : function (map, olCoordinate, gfiLayers, proxyOptions) {
            // Layers orders
            var layersOrdered = {};
            for ( var j = 0; j < gfiLayers.length; j++ ) {
                var layer = gfiLayers[j];
                var position = layer.obj.getZIndex();
                if ( !layersOrdered[position] ) {
                    layersOrdered[position] = [];
                }
                layersOrdered[position].push(layer);
            }

            // affichage de la première popup d'informations en partant du dessus...
            var requests = [];
            // inversion de l'ordre des layers
            var positions = Object.keys(layersOrdered);
            positions.sort( function (a,b) {
                return b - a;
            });

            // si la 1ere couche affichable est de type vecteur on affiche les infos de toutes
            // les couches vecteur qui suivent. Par consequent, une seule requete vecteur suffit
            // (celle correspondant au premier objet vecteur rencontre)
            var foundFeature = false;

            for ( var k = 0 ; k < positions.length ; k++ ) {
                var p = positions[k];
                for ( var h = 0 ; h < layersOrdered[p].length ; ++h ) {
                    var l = layersOrdered[p][h].obj;
                    var infoFormat = layersOrdered[p].infoFormat || "text/html";
                    var minMaxResolutionOk = true ;
                    if (  l.minResolution  &&
                          l.minResolution > map.getResolution()) {
                        minMaxResolutionOk = false ;
                    }
                    if (  minMaxResolutionOk &&
                          l.maxResolution &&
                          l.maxResolution < map.getResolution()) {
                        minMaxResolutionOk = false ;
                    }

                    if ( l.getVisible() && minMaxResolutionOk ) {
                        var format = this.getLayerFormat(l);
                        if ( format == "vector" ) {
                            if ( !foundFeature && this.layerGetFeatureAtCoordinates(map, l, olCoordinate) ) {
                                requests.push({
                                    format : format,
                                    scope : this,
                                    coordinate : olCoordinate
                                });
                            }
                            continue;
                        } else if ( format != "wms" && format != "wmts" ) {
                            console.log("[ERROR] DisplayFeatureInfo - layer format '" + format + "' not allowed");
                            continue;
                        }

                        var _res    = map.getView().getResolution();
                        var _url    = null;
                        if ( format == "wmts" ) {
                            _url = this.getGetFeatureInfoUrl(
                                l.getSource(),
                                olCoordinate,
                                _res,
                                map.getView().getProjection(),
                                {
                                    INFOFORMAT : infoFormat
                                }
                            );
                        } else {
                            _url = l.getSource().getGetFeatureInfoUrl(
                                olCoordinate,
                                _res,
                                map.getView().getProjection(),
                                {
                                    INFO_FORMAT : infoFormat
                                }
                            );
                        }

                        requests.push({
                            // id : _id,
                            format : infoFormat,
                            url : ProxyUtils.setProxy(_url, proxyOptions),
                            scope : this,
                            coordinate : olCoordinate
                        });
                    }
                }
            }

            // on recupere les couches vecteur ordonnees (a utiliser dans le cas de l'affichage de donnees vecteur)
            var vectorLayersOrdered = null;

            /** call request sync */
            function requestsSync (list, iterator, callback) {
                if (list.length === 0) {
                    return;
                }
                var nextItemIndex = 0;
                /** function report next request */
                function report (displayed) {
                    nextItemIndex++;
                    if (displayed || nextItemIndex === list.length) {
                        callback();
                    } else {
                        iterator(list[nextItemIndex], report);
                    }
                }
                // instead of starting all the iterations, we only start the 1st one
                iterator(list[0], report);
            };

            var context = this;

            requestsSync(requests,
                function (data, report) {
                    if ( data.format == "vector" ) {
                        if ( !vectorLayersOrdered ) {
                            vectorLayersOrdered = [];
                            for ( var m = 0 ; m < positions.length ; m++ ) {
                                var p = positions[m];
                                for ( var n = 0 ; n < layersOrdered[p].length ; ++n ) {
                                    vectorLayersOrdered.push(layersOrdered[p][n].obj);
                                }
                            }
                        }
                        report( data.scope.displayVectorFeatureInfo(map, data.coordinate, vectorLayersOrdered) );
                    } else {
                        // var self = data.scope;
                        Gp.Protocols.XHR.call({
                            url : data.url,
                            method : "GET",
                            scope : data.scope,
                            /** Handles GFI response */
                            onResponse : function (resp) {
                                var exception = false;

                                // a t on une exception ?
                                if (resp.trim().length === 0 ||
                                    resp.indexOf("java.lang.NullPointerException") !== -1 ||
                                    resp.indexOf("not queryable") !== -1) {
                                    // rien à afficher
                                    exception = true;
                                }

                                // on affiche la popup GFI !
                                var displayed = !exception && context.displayInfo(map, data.coordinate, resp);
                                // on reporte sur la prochaine requête...
                                report(displayed);
                            },
                            /** Handles GFI response error */
                            onFailure : function (error) {
                                console.log(error);
                                report(false);
                            }
                        }) ;
                    }
                },
                function () {
                    console.log("Finish sync to GFI !");
                }
            );
        },

        /**
         * Function returning the clicked position of an event
         */
        getPosition : function (e,map) {

            if ( e.coordinate ) {
                return e.coordinate;
            }

            var pixel = [0,0];

            if (e.offsetX || e.offsetY) {
                pixel[0] = e.offsetX ; // + document.body.scrollLeft + document.documentElement.scrollLeft;
                pixel[1] = e.offsetY ; // + document.body.scrollTop + document.documentElement.scrollTop;
            } else if (e.pointerType === "touch") {

                // a implementer !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                // Safari iOS / iPhone en mode Touch (cf. hammer)
                var p = e.pointers[0];
                pixel[0] = p.pageX;
                pixel[1] = p.pageY;
            }

            var coordinate =  map.getCoordinateFromPixel(pixel);
            return coordinate;
        },

        /**
         * onDisplayFeatureInfo
         */
        onDisplayFeatureInfo : function (e,gfiObj) {
            if (!gfiObj.getActive()) {
                return;
            }

            logger.trace(e);

            var map = gfiObj.getMap();

            if ( e.type == "contextmenu" || e.type == "dblclick" ) {
                e.preventDefault();
            } else if ( e.type == "singleclick" ) {
                var interactions = map.getInteractions().getArray() ;
                for (var i = 0 ; i < interactions.length ; i++ ) {
                    if (interactions[i].getActive() &&
                        ( interactions[i] instanceof ol.interaction.Select ||
                          interactions[i] instanceof ol.interaction.Modify ||
                          interactions[i] instanceof ol.interaction.Draw     )
                        )  {
                        // si on a une interaction de dessin ou de sélection en cours, on ne fait rien.
                        return ;
                    }
                }
            }

            var proxyOptions = {};
            if ( gfiObj._proxyUrl ) {
                proxyOptions.proxyUrl = gfiObj._proxyUrl;
            }
            if ( gfiObj._noProxyDomains ) {
                proxyOptions.noProxyDomains = gfiObj._noProxyDomains;
            }

            var eventLayers = [];
            for ( var j = 0 ; j < gfiObj._layers.length ; ++j ) {
                var event = (gfiObj._layers[j].event) ? gfiObj._layers[j].event : gfiObj._defaultEvent;
                if ( event == e.type ) {
                    var ind = eventLayers.push( gfiObj._layers[j] ) - 1;
                    if ( !eventLayers[ind].infoFormat ) {
                        eventLayers[ind].infoFormat = gfiObj._defaultInfoFormat;
                    }
                }
            }

            var coords = this.getPosition(e,map);

            this.displayFeatureInfo(map, coords, eventLayers, proxyOptions);
        },

        /**
        * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
        * projection. Return `undefined` if the GetFeatureInfo URL cannot be
        * constructed.
        * @param {ol.Source.WMTS} source - Source.
        * @param {ol.Coordinate} coordinate - Coordinate.
        * @param {Number} resolution - Resolution.
        * @param {ol.proj.Projection} projection - Projection.
        * @param {!Object} params - GetFeatureInfo params. `INFOFORMAT` at least should
        *     be provided.
        * @return {String|undefined} GetFeatureInfo URL.
        */
        getGetFeatureInfoUrl : function (source, coordinate, resolution, projection, params) {

            var pixelRatio = (source.option && source.options.tilePixelRatio) ? source.options.tilePixelRatio : 1;

            var tileGrid = source.tileGrid;
            var tileCoord = source.tileGrid.getTileCoordForCoordAndResolution(coordinate, resolution);

            /**
            * this code is duplicated from createFromWMTSTemplate function
            */
            var getTransformedTileCoord = function (tileCoord, tileGrid, projection) {
                var tmpTileCoord = [0,0,0]; /*Note : [z(zoomLevel),x,y]*/
                var tmpExtent = ol.extent.createEmpty();
                var x = tileCoord[1];
                var y = -tileCoord[2] - 1;
                var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
                var projectionExtent = projection.getExtent();
                var extent = projectionExtent;

                if (  extent != null  && projection.isGlobal() && extent[0] === projectionExtent[0] && extent[2] === projectionExtent[2]) {
                    var numCols = Math.ceil(ol.extent.getWidth(extent) / ol.extent.getWidth(tileExtent));
                    x = x % numCols;
                    tmpTileCoord[0] = tileCoord[0];
                    tmpTileCoord[1] = x;
                    tmpTileCoord[2] = tileCoord[2];
                    tileExtent = tileGrid.getTileCoordExtent(tmpTileCoord, tmpExtent);
                }
                if (!ol.extent.intersects(tileExtent, extent) /*|| ol.extent.touches(tileExtent, extent) */) {
                    return null;
                }
                return [tileCoord[0], x, y];
            };

            var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
            var transformedTileCoord = getTransformedTileCoord(tileCoord,tileGrid, projection);

            if (tileGrid.getResolutions().length <= tileCoord[0]) {
                return undefined;
            }

            var tileResolution = tileGrid.getResolution(tileCoord[0]);
            var tileMatrix = tileGrid.getMatrixIds()[tileCoord[0]];

            var baseParams = {
                SERVICE : "WMTS",
                VERSION : "1.0.0",
                REQUEST : "GetFeatureInfo",
                LAYER : source.getLayer(),
                TILECOL : transformedTileCoord[1],
                TILEROW : transformedTileCoord[2],
                TILEMATRIX : tileMatrix,
                TILEMATRIXSET : source.getMatrixSet(),
                FORMAT : source.getFormat() || "image/png",
                STYLE : source.getStyle() || "normal"
            };

            Utils.assign(baseParams, params);

            /*var tileSize = tileGrid.getTileSize();
            var x = Math.floor(tileSize*((coordinate[0]-tileExtent[0])/(tileExtent[2]-tileExtent[0])));
            var y = Math.floor(tileSize*((tileExtent[3]-coordinate[1])/(tileExtent[3]-tileExtent[1])));*/

            var x = Math.floor((coordinate[0] - tileExtent[0]) / (tileResolution / pixelRatio));
            var y = Math.floor((tileExtent[3] - coordinate[1]) / (tileResolution / pixelRatio));

            baseParams["I"] = x;
            baseParams["J"] = y;

            var url = source.urls[0];

            var featureInfoUrl = Gp.Helper.normalyzeUrl(url, baseParams);

            return featureInfoUrl;
        }
    };
    return GfiUtils;
});
