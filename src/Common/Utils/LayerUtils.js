/**
* @module LayerUtils
* @alias Gp.LayerUtils
* @description
* ...
*
* @example
* getZoomLevelFromScaleDenominator();
* getAttributions();
* intersects();
*/
var LayerUtils = {

    /**
     * Obtenir le ZoomLevel à partir du ScaleDenominator
     * @param {Number} scaleDenominator - the scale denominator
     * @param {String} crs - the crs
     *
     * @returns {Integer} zoom level
     */
    getZoomLevelFromScaleDenominator : function (scaleDenominator, crs) {
        // ------------------------------------------------- //
        // Code issu de l'API Geoportal/Catalogue/Config.js  //
        // ------------------------------------------------- //
        //     var configuration = Gp.Config;
        //     var general = configuration.generalOptions;
        //     var layers  = configuration.layersContext;
        //
        //     for (var tms in general.tileMatrixSets) {
        //         var tileMatrixSet = general.tileMatrixSets[tms];
        //         // IGN's WMTS bug : epsg:nnnn instead of EPSG:nnnn
        //         var crs = tileMatrixSet.supportedCRS = tileMatrixSet.supportedCRS.replace(/epsg/,"EPSG");
        //
        //         if (!Geoportal.Catalogue.CRSRESOLUTIONS.hasOwnProperty(crs)) {
        //             var p= new OpenLayers.Projection(crs);
        //             Geoportal.Catalogue.CRSRESOLUTIONS[crs]= [];
        //             var matrixIds= tileMatrixSet.matrixIds;
        //             for (var i= 0, li= matrixIds.length; i<li; ++i) {
        //                 var mid= matrixIds[i];
        //                 Geoportal.Catalogue.CRSRESOLUTIONS[crs].push(
        //                     0.00028*mid.scaleDenominator
        //                     /(OpenLayers.METERS_PER_INCH*OpenLayers.INCHES_PER_UNIT[p.getUnits()]));
        //                     mid.supportedCRS= mid.supportedCRS.replace(/epsg/,"EPSG");
        //                 }
        //                 Geoportal.Catalogue.CRSRESOLUTIONS[crs].sort(function (a,b){ return b-a; });
        //             }
        //         }
        //         var llR= Geoportal.Catalogue.CRSRESOLUTIONS['CRS:84'];
        //         if (!llR) {
        //             llR= Geoportal.Catalogue.CRSRESOLUTIONS['CRS:84']= general.resolutions.slice();
        //         }
        //         var wmR= Geoportal.Catalogue.CRSRESOLUTIONS['EPSG:3857'];
        //         if (!wmR) {//FIXME : should never happened !!
        //             // reproject resolutions from CRS84 to WebMercator (transform resolutions from degree/px to meter/px)
        //             wmR= Geoportal.Catalogue.CRSRESOLUTIONS['EPSG:3857']= new Array(llR.length);
        //             for (var i= 0, len= llR.length; i<len; i++) {
        //                 var pt= new OpenLayers.LonLat(llR[i], 0);
        //                 pt.transform(OpenLayers.Projection.CRS84, OpenLayers.Projection.WebMercator);
        //                 wmR[i]= pt.lon;
        //             }
        //         }
        //         Geoportal.Catalogue.RESOLUTIONS= wmR;
        //
        //         var getResolutionsFromCRS= function(crs) {
        //             if (OpenLayers.Projection.WebMercator.isAliasOf(crs)) {
        //                 return wmR;
        //             }
        //             if (OpenLayers.Projection.CRS84.isAliasOf(crs)) {
        //                 return llR;
        //             }
        //             return Geoportal.Catalogue.CRSRESOLUTIONS[crs]?Geoportal.Catalogue.CRSRESOLUTIONS[crs]:null ;
        //         };
        //
        //         var retrieveZoomFromResolution= function(resolutions, resolution) {
        //             for (var i= 0, li= resolutions.length; i<li; i++) {
        //                 if (resolutions[i]-resolution <= resolutions[li-1]) {
        //                     return i;
        //                 }
        //             }
        //             return -1;
        //         };
        //
        //         var getZoomLevelFromScaleDenominator= function(scaleDenominator,crs) {
        //             var resolution= scaleDenominator * 0.00028;
        //             var R= getResolutionsFromCRS(crs);
        //             if (R) {
        //                 return retrieveZoomFromResolution(R,resolution);
        //             }
        //             resolution= resolution/(OpenLayers.METERS_PER_INCH * OpenLayers.INCHES_PER_UNIT["degrees"]);
        //             return retrieveZoomFromResolution(llR,resolution);
        //         };
        //
        //         var getZoomLevelFromResolution= function(resolution,crs){
        //             var R= getResolutionsFromCRS(crs);
        //             if (R) {
        //                 return retrieveZoomFromResolution(R,resolution);
        //             }
        //             var pt0= new OpenLayers.LonLat(0, 0);
        //             var pt1= new OpenLayers.LonLat(1, 0);
        //             pt0.transform(new OpenLayers.Projection(crs),OpenLayers.Projection.CRS84);
        //             pt1.transform(new OpenLayers.Projection(crs),OpenLayers.Projection.CRS84);
        //             resolution= resolution*(Math.abs(pt1.lon-pt0.lon));
        //             return retrieveZoomFromResolution(llR,resolution);
        //         };

        // par defaut, on utilise la projection WebMercator (EPSG:3857 = PM)
        // soit la liste des resolutions natives
        var resolutionsNatives = {};
        switch (crs) {
            case "EPSG:2154":
                resolutionsNatives = {
                    0 : 104579.224549894,
                    1 : 52277.5323537905,
                    2 : 26135.4870785954,
                    3 : 13066.8913818,
                    4 : 6533.2286041135,
                    5 : 3266.5595244627,
                    6 : 1633.2660045974,
                    7 : 816.629554986,
                    8 : 408.3139146768,
                    9 : 204.1567415109,
                    10 : 102.0783167832,
                    11 : 51.0391448966,
                    12 : 25.5195690743,
                    13 : 12.7597836936,
                    14 : 6.379891636,
                    15 : 3.1899457653,
                    16 : 1.5949728695,
                    17 : 0.7974864315,
                    18 : 0.3987432149,
                    19 : 0.1993716073,
                    20 : 0.0996858037,
                    21 : 0.0498429018
                };
                break;
            default:
                resolutionsNatives = {
                    0 : 156543.033928041,
                    1 : 78271.51696402048,
                    2 : 39135.758482010235,
                    3 : 19567.87924100512,
                    4 : 9783.93962050256,
                    5 : 4891.96981025128,
                    6 : 2445.98490512564,
                    7 : 1222.99245256282,
                    8 : 611.49622628141,
                    9 : 305.7481131407048,
                    10 : 152.8740565703525,
                    11 : 76.43702828517624,
                    12 : 38.21851414258813,
                    13 : 19.10925707129406,
                    14 : 9.554628535647032,
                    15 : 4.777314267823516,
                    16 : 2.388657133911758,
                    17 : 1.194328566955879,
                    18 : 0.5971642834779395,
                    19 : 0.2985821417389697,
                    20 : 0.1492910708694849,
                    21 : 0.0746455354347424
                };
                break;
        }

        // gestion des autres SRS
        // TODO
        // if (crs) {
        // }

        var resolution = scaleDenominator * 0.00028;

        for (var index in resolutionsNatives) {
            if (resolutionsNatives.hasOwnProperty(index)) {
                if (resolutionsNatives[index] <= resolution) {
                    index = parseInt(index, 10);
                    return index;
                }
            }
        }

        return 0; // -1 ?
    },

    /**
     * Get attributions list for a layer, based on current zoom and extent
     *
     * @param {Object} params - function params
     * @param {Array.<Float>} params.extent - map current geographical extent (EPSG:4326) : [top, left, bottom, right] = [maxy, minx, miny, maxx]
     * @param {Number} params.zoom - map current zoom
     * @param {String} params.crs - map current projection code (ex "EPSG:2154")
     * @param {Boolean} params.visibility - layer visibility
     * @param {Gp.Services.Config.Originator} params.originators - resource originators (from Gp.Config.layers[].originators)
     * @returns {Object} attributions - associative array, mapping originators url (keys) with their properties : html attributions elements
     */
    getAttributions : function (params) {
        var zoom = params.zoom;

        var attributions = [];

        if (params.originators != null && params.visibility) {
            // drawLogo = boolean, true if attribution should be displayed (zoom, extent), false otherwise
            var drawLogo;
            for (var j = 0, jl = params.originators.length; j < jl; j++) {
                drawLogo = true;
                var originator = params.originators[j];

                var constraints = params.originators[j].constraints || [];
                for (var k = 0, kl = constraints.length; k < kl; k++) {
                    var constraint = constraints[k];
                    drawLogo = true;

                    var minZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.maxScaleDenominator, params.crs);
                    var maxZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.minScaleDenominator, params.crs) || 21;

                    // min zoom constraints
                    if (minZoomLevel && (minZoomLevel > zoom)) {
                        drawLogo = false;
                    }

                    // max zoom constraints
                    if (drawLogo && maxZoomLevel !== null && (maxZoomLevel < zoom)) {
                        drawLogo = false;
                    }

                    // bbox constraints
                    var bbox = constraint.bbox;
                    if (drawLogo && bbox) {
                        drawLogo = false;
                        var viewExtent = params.extent;
                        if (viewExtent) {
                            var bounds = [bbox.top, bbox.left, bbox.bottom, bbox.right];
                            if (this.intersects(viewExtent, bounds)) {
                                // at least one constraint matches the map ones
                                drawLogo = true;
                                break;
                            }
                        }
                    }
                }

                if (drawLogo) {
                    // on a un originator qui correspond au zoom et à l'étendue.

                    var logo = originator.logo;
                    var url = originator.url;
                    var name = originator.name ? originator.name : "";
                    var text = originator.attribution;

                    var container = document.createElement("div");
                    container.className = "gp-control-attribution";

                    // on crée un lien dans tous les cas (même s'il ne pointe pas vers une référence), pour avoir accès à la class CSS (pour surcharge)
                    var link = null;
                    link = document.createElement("a");
                    link.className = "gp-control-attribution-link";
                    link.target = "_blank";
                    container.appendChild(link);
                    if (url) {
                        link.href = url;
                    }

                    var bImage = !!(logo);
                    var image = null;
                    // si on a un logo, on l'affiche à l'interieur du lien
                    if (bImage) {
                        image = document.createElement("img");
                        if (link) {
                            image.className = "gp-control-attribution-image";
                            link.appendChild(image);
                        } else {
                            image.className = "";
                            container.appendChild(image);
                        }
                        image.src = logo; // FIXME : mixContent !
                        image.title = text || name;
                        image.style.height = "30px";
                        image.style.width = "30px";
                    } else {
                        // sinon, on affiche le nom de l'originator, ou sa description ou l'url.
                        if (name) {
                            link.textContent = name;
                        } else if (text) {
                            link.textContent = text;
                        } else if (url) {
                            link.textContent = url;
                        } else {
                            link.textContent = "";
                        }
                    }

                    attributions.push(container.innerHTML + " ");
                }
            }
        }

        return attributions;
    },

    /**
     * Determines if one extent (extent1) intersects another (extent2)
     *
     * @param {Array.<Float>} extent1 - First extent : [top, left, bottom, right] = [maxy, minx, miny, maxx]
     * @param {Array.<Float>} extent2 - Second extent : [top, left, bottom, right] = [maxy, minx, miny, maxx]
     * @return {Boolean} intersects - True if the two extents intersect, false otherwise.
     */
    intersects : function (extent1, extent2) {
        var intersectsX = (extent1[1] <= extent2[3]) && (extent2[1] <= extent1[3]);
        var intersectsY = (extent1[2] <= extent2[0]) && (extent2[2] <= extent1[0]);
        return intersectsX && intersectsY;
    }
};

export default LayerUtils;
