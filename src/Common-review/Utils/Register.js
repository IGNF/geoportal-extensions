// FIXME
// - exception lors du register IGNF des projections geocent ?
// Ex. Transforming EPSG:4978 geocent projection fails?
// cf. https://github.com/proj4js/proj4js/issues/195
// - probleme de performance avec le chargement des projections (env. 4s),
// et ceci bloque le rendu graphique...

/**
 * Register definition for IGNF, and EPSG CRS.
 * @example
 * Gp.Register.IGNF.AMST63
 *   // return : "+title=Amsterdam 1963 +proj=geocent +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs"
 * Gp.Register.get("IGNF:AMST63")
 *   // same as Gp.Register.IGNF.AMST63
 */
var Register = {

    /**
     * instance already loaded into proj4
     */
    isLoaded : false,

    /**
     * get the definition for a code
     *
     * @param {String} name - ie. EPSG:2154 (Lambert)
     * @returns {Object} definition
     * @example
     * Register.get("EPSG:2154");
     * // "+title=RGF93 / Lambert-93 +proj=lcc +lat_1=49 ..."
     */
    get : function (name) {
        if (name === "" || name === null || typeof name === "undefined") {
            return;
        }

        var s = name.split(":");
        if (s.length !== 2) {
            return;
        }

        var _register = s[0];
        var _code = s[1];

        if (!this.hasOwnProperty(_register)) {
            return;
        }

        if (!this[_register].hasOwnProperty(_code)) {
            return;
        }

        return this[_register][_code];
    },

    /**
     *  does projection code exist ?
     *
     * @param {String} name - ie. EPSG:2154 (Lambert)
     * @returns {Boolean} true/false
     * @example
     * Register.exist("EPSG:2154"); // true
     */
    exist : function (name) {
        if (name === "" || name === null || typeof name === "undefined") {
            return false;
        }

        var s = name.split(":");
        if (s.length !== 2) {
            return false;
        }

        var _register = s[0];
        var _code = s[1];

        if (!this.hasOwnProperty(_register)) {
            return false;
        }

        if (!this[_register].hasOwnProperty(_code)) {
            return false;
        }

        return true;
    },

    /**
     * load all defs to proj4
     * @param {Object} Proj4 - proj4 instance
     */
    load : function (Proj4) {
        // un flag pour savoir si le chargement est déjà realisé
        // (car ceci peut être couteux !)
        if (!this.isLoaded) {
            var registers = [
                "IGNF", // exception lors du register IGNF ?
                "EPSG",
                "CRS"
            ];
            for (var i = 0; i < registers.length; i++) {
                var _register = registers[i];
                var codes = this[_register];
                for (var _code in codes) {
                    if (codes.hasOwnProperty(_code)) {
                        var name = _register + ":" + _code;
                        Proj4.defs(name, this.get(name));
                        // on enlève la dependance à OpenLayers...
                        // la fonction register est donc à appeller afin d'enregistrer
                        // les definitions dans OpenLayers :
                        //  import { get } from "ol/proj";
                        //  import proj4 from "proj4";
                        //  import { register } from "ol/proj/proj4";
                        //      Register.load();
                        //      // Make projections defined in proj4 (with proj4.defs()) available in OpenLayers.
                        //      // see ol/proj/proj4.register (https://openlayers.org/en/latest/apidoc/module-ol_proj_proj4.html)
                        //      register(proj4);
                        //      console.log(get("CRS:84").getCode()); // "CRS:84"
                    }
                }
            }
            this.isLoaded = true;
        }
    },

    /**
     * load defs by default to proj4
     *
     * include into proj4 :
     * - WGS84
     * - ['EPSG:4326']
     * - ['EPSG:3785'], ['EPSG:3857'], GOOGLE, ['EPSG:900913'], ['EPSG:102113']
     * +
     * - ["EPSG:2154"], ["EPSG:27571"],  ["EPSG:27572"],  ["EPSG:27573"],  ["EPSG:2757"],
     * - ["CRS:84"],
     * - ["IGNF:LAMB93"],
     * - ["IGNF:LAMBE"], ["IGNF:LAMB1"],  ["IGNF:LAMB2"],  ["IGNF:LAMB3"],  ["IGNF:LAMB4"],
     * - ["IGNF:RGF93G"],
     * - ["IGNF:WGS84G"]
     *
     * @param {Object} Proj4 - proj4 instance
     */
    loadByDefault : function (Proj4) {
        // FIXME definir la liste de projections par defaut...
        var registers = {
            EPSG : {
                2154 : Register["EPSG"]["2154"],
                27571 : Register["EPSG"]["27571"],
                27572 : Register["EPSG"]["27572"],
                27573 : Register["EPSG"]["27573"],
                27574 : Register["EPSG"]["27574"]
            },
            CRS : {
                84 : Register["CRS"]["84"]
            },
            IGNF : {
                LAMB93 : Register["IGNF"]["LAMB93"],
                LAMBE : Register["IGNF"]["LAMBE"],
                LAMB1 : Register["IGNF"]["LAMB1"],
                LAMB2 : Register["IGNF"]["LAMB2"],
                LAMB3 : Register["IGNF"]["LAMB3"],
                LAMB4 : Register["IGNF"]["LAMB4"],
                RGF93G : Register["IGNF"]["RGF93G"],
                WGS84G : Register["IGNF"]["WGS84G"]
            }
        };

        for (var register in registers) {
            if (registers.hasOwnProperty(register)) {
                var codes = registers[register];
                for (var code in codes) {
                    if (codes.hasOwnProperty(code)) {
                        var name = register + ":" + code;
                        Proj4.defs(name, codes[code]);
                    }
                }
            }
        }
    },

    /**
     * load only a def to proj4
     * @param {Object} Proj4 - proj4 instance
     * @param {String} name - ie. EPSG:2154 (Lambert)
     * @returns {Boolean} true/false
     */
    loadByName : function (Proj4, name) {
        if (!this.exist(name)) {
            return false;
        }

        try {
            Proj4.defs(name, this.get(name));
        } catch (e) {
            // FIXME !?
            return false;
        }

        return true;
    },

    // definitions
    EPSG : {
        // 4978 : "+proj=geocent +datum=WGS84 +units=m +no_defs ",
        3857 : "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",
        3785 : "+title=WGS 84 / Pseudo-Mercator (deprecated) +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",
        4149 : "+title=CH1903 +proj=longlat +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +no_defs ",
        4150 : "+title=CH1903plus +proj=longlat +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +no_defs ",
        4151 : "+title=CHTRF95 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4171 : "+title=RGF93 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4230 : "+title=ED50 +proj=longlat +ellps=intl +no_defs ",
        4235 : "+title=Guyane Francaise +proj=longlat +ellps=intl +no_defs ",
        4258 : "+title=ETRS89 +proj=longlat +ellps=GRS80 +no_defs ",
        4275 : "+title=NTF +proj=longlat +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +no_defs ",
        4322 : "+title=WGS 72 +proj=longlat +ellps=WGS72 +no_defs ",
        4326 : "+title=WGS 84 +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ",
        4467 : "+proj=utm +zone=21 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        4470 : "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4471 : "+proj=utm +zone=38 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        4474 : "+proj=utm +zone=38 +south +ellps=intl +towgs84=-382,-59,-262,0,0,0,0 +units=m +no_defs ",
        4558 : "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4559 : "+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        4621 : "+title=Fort Marigot +proj=longlat +ellps=intl +towgs84=137,248,-430,0,0,0,0 +no_defs ",
        4622 : "+title=Guadeloupe 1948 +proj=longlat +ellps=intl +no_defs ",
        4623 : "+title=CSG67 +proj=longlat +ellps=intl +towgs84=-186,230,110,0,0,0,0 +no_defs ",
        4624 : "+title=RGFG95 +proj=longlat +ellps=GRS80 +towgs84=2,2,-2,0,0,0,0 +no_defs ",
        4625 : "+title=Martinique 1938 +proj=longlat +ellps=intl +no_defs ",
        4626 : "+title=Reunion 1947 +proj=longlat +ellps=intl +no_defs ",
        4627 : "+title=RGR92 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4628 : "+title=Tahiti 52 +proj=longlat +ellps=intl +towgs84=162,117,154,0,0,0,0 +no_defs ",
        4629 : "+title=Tahaa 54 +proj=longlat +ellps=intl +no_defs ",
        4630 : "+title=IGN72 Nuku Hiva +proj=longlat +ellps=intl +no_defs ",
        4632 : "+title=Combani 1950 +proj=longlat +ellps=intl +towgs84=-382,-59,-262,0,0,0,0 +no_defs ",
        4633 : "+title=IGN56 Lifou +proj=longlat +ellps=intl +no_defs ",
        4634 : "+title=IGN72 Grand Terre +proj=longlat +ellps=intl +no_defs ",
        4637 : "+title=Perroud 1950 +proj=longlat +ellps=intl +towgs84=325,154,172,0,0,0,0 +no_defs ",
        4638 : "+title=Saint Pierre et Miquelon 1950 +proj=longlat +ellps=clrk66 +towgs84=30,430,368,0,0,0,0 +no_defs ",
        4640 : "+title=RRAF 1991 +proj=longlat +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4641 : "+title=IGN53 Mare +proj=longlat +ellps=intl +no_defs ",
        4645 : "+title=RGNC 1991 +proj=longlat +ellps=intl +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4687 : "+proj=longlat +ellps=GRS80 +no_defs ",
        4662 : "+title=IGN72 Grande Terre +proj=longlat +ellps=intl +no_defs ",
        4689 : "+title=IGN63 Hiva Oa +proj=longlat +ellps=intl +no_defs ",
        4690 : "+title=Tahiti 79 +proj=longlat +ellps=intl +no_defs ",
        4691 : "+title=Moorea 87 +proj=longlat +ellps=intl +towgs84=215.525,149.593,176.229,-3.2624,-1.692,-1.1571,10.4773 +no_defs ",
        4692 : "+title=Maupiti 83 +proj=longlat +ellps=intl +towgs84=217.037,86.959,23.956,0,0,0,0 +no_defs ",
        4698 : "+title=IGN 1962 Kerguelen +proj=longlat +ellps=intl +towgs84=145,-187,103,0,0,0,0 +no_defs ",
        4749 : "+title=RGNC91-93 +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs ",
        4750 : "+title=ST87 Ouvea +proj=longlat +ellps=WGS84 +towgs84=-56.263,16.136,-22.856,0,0,0,0 +no_defs ",
        4807 : "+title=NTF (Paris) +proj=longlat +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +no_defs ",
        2056 : "+title=CH1903+ / LV95 +proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs ",
        2154 : "+title=RGF93 / Lambert-93 +proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        2213 : "+title=ETRS89 / TM 30 NE +proj=tmerc +lat_0=0 +lon_0=30 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ",
        2969 : "+title=Fort Marigot / UTM zone 20N +proj=utm +zone=20 +ellps=intl +towgs84=137,248,-430,0,0,0,0 +units=m +no_defs ",
        2970 : "+title=Guadeloupe 1948 / UTM zone 20N +proj=utm +zone=20 +ellps=intl +units=m +no_defs ",
        2971 : "+title=CSG67 / UTM zone 22N +proj=utm +zone=22 +ellps=intl +towgs84=-186,230,110,0,0,0,0 +units=m +no_defs ",
        2972 : "+title=RGFG95 / UTM zone 22N +proj=utm +zone=22 +ellps=GRS80 +towgs84=2,2,-2,0,0,0,0 +units=m +no_defs ",
        2973 : "+title=Martinique 1938 / UTM zone 20N +proj=utm +zone=20 +ellps=intl +units=m +no_defs ",
        2975 : "+title=RGR92 / UTM zone 40S +proj=utm +zone=40 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        2976 : "+title=Tahiti 52 / UTM zone 6S +proj=utm +zone=6 +south +ellps=intl +towgs84=162,117,154,0,0,0,0 +units=m +no_defs ",
        2977 : "+title=Tahaa 54 / UTM zone 5S +proj=utm +zone=5 +south +ellps=intl +units=m +no_defs ",
        2978 : "+title=IGN72 Nuku Hiva / UTM zone 7S +proj=utm +zone=7 +south +ellps=intl +units=m +no_defs ",
        2980 : "+title=Combani 1950 / UTM zone 38S +proj=utm +zone=38 +south +ellps=intl +towgs84=-382,-59,-262,0,0,0,0 +units=m +no_defs ",
        2981 : "+title=IGN56 Lifou / UTM zone 58S +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
        2982 : "+title=IGN72 Grand Terre / UTM zone 58S (deprecated) +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
        2984 : "+title=RGNC 1991 / Lambert New Caledonia (deprecated) +proj=lcc +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5 +lon_0=166 +x_0=400000 +y_0=300000 +ellps=intl +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        2986 : "+title=Terre Adelie 1950 +proj=stere +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +lat_0=-90.000000000 +lon_0=140.000000000 +lat_ts=-67.000000000 +k=0.96027295 +x_0=300000.000 +y_0=-2299363.482 +units=m +no_defs",
        2987 : "+title=Saint Pierre et Miquelon 1950 / UTM zone 21N +proj=utm +zone=21 +ellps=clrk66 +towgs84=30,430,368,0,0,0,0 +units=m +no_defs ",
        2989 : "+title=RRAF 1991 / UTM zone 20N +proj=utm +zone=20 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        2990 : "+title=Reunion 1947 / TM Reunion (deprecated) +proj=tmerc +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=50000 +y_0=160000 +ellps=intl +units=m +no_defs ",
        2995 : "+title=IGN53 Mare / UTM zone 58S +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
        3038 : "+proj=utm +zone=26 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3039 : "+proj=utm +zone=27 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3040 : "+proj=utm +zone=28 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3041 : "+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        // 3042 : "+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        // 3043 : "+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        // 3044 : "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3045 : "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3046 : "+proj=utm +zone=34 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3047 : "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3048 : "+proj=utm +zone=36 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3049 : "+proj=utm +zone=37 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3050 : "+proj=utm +zone=38 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3051 : "+proj=utm +zone=39 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3034 : "+title=ETRS89 / ETRS-LCC +proj=lcc +lat_1=35 +lat_2=65 +lat_0=52 +lon_0=10 +x_0=4000000 +y_0=2800000 +ellps=GRS80 +units=m +no_defs ",
        3035 : "+title=ETRS89 / ETRS-LAEA +proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs ",
        3042 : "+title=ETRS89 / ETRS-TM30 +proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs ",
        3043 : "+title=ETRS89 / ETRS-TM31 +proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs ",
        3044 : "+title=ETRS89 / ETRS-TM32 +proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs ",
        25828 : "+proj=utm +zone=28 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        25829 : "+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        // 25830 : "+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        // 25831 : "+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        // 25832 : "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        25833 : "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        25834 : "+proj=utm +zone=34 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        25835 : "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        25836 : "+proj=utm +zone=36 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        25837 : "+proj=utm +zone=37 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        25838 : "+proj=utm +zone=38 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3060 : "+title=IGN72 Grande Terre / UTM zone 58S +proj=utm +zone=58 +south +ellps=intl +units=m +no_defs ",
        3163 : "+title=RGNC91-93 / Lambert New Caledonia +proj=lcc +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5 +lon_0=166 +x_0=400000 +y_0=300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3164 : "+title=ST87 Ouvea / UTM zone 58S +proj=utm +zone=58 +south +ellps=WGS84 +towgs84=-56.263,16.136,-22.856,0,0,0,0 +units=m +no_defs ",
        3165 : "+title=NEA74 Noumea / Noumea Lambert +proj=lcc +lat_1=-22.24469175 +lat_2=-22.29469175 +lat_0=-22.26969175 +lon_0=166.44242575 +x_0=0.66 +y_0=1.02 +ellps=intl +units=m +no_defs ",
        3166 : "+title=NEA74 Noumea / Noumea Lambert 2 +proj=lcc +lat_1=-22.24472222222222 +lat_2=-22.29472222222222 +lat_0=-22.26972222222222 +lon_0=166.4425 +x_0=8.313000000000001 +y_0=-2.354 +ellps=intl +units=m +no_defs ",
        3169 : "+title=RGNC91-93 / UTM zone 57S +proj=utm +zone=57 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3170 : "+title=RGNC91-93 / UTM zone 58S +proj=utm +zone=58 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3171 : "+title=RGNC91-93 / UTM zone 59S +proj=utm +zone=59 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
        3172 : "+title=IGN53 Mare / UTM zone 59S +proj=utm +zone=59 +south +ellps=intl +units=m +no_defs ",
        3296 : "+title=RGPF / UTM zone 5S +proj=utm +zone=5 +south +ellps=GRS80 +units=m +no_defs ",
        3297 : "+title=RGPF / UTM zone 6S +proj=utm +zone=6 +south +ellps=GRS80 +units=m +no_defs ",
        3298 : "+title=RGPF / UTM zone 7S +proj=utm +zone=7 +south +ellps=GRS80 +units=m +no_defs ",
        3299 : "+title=RGPF / UTM zone 8S +proj=utm +zone=8 +south +ellps=GRS80 +units=m +no_defs ",
        3302 : "+title=IGN63 Hiva Oa / UTM zone 7S +proj=utm +zone=7 +south +ellps=intl +units=m +no_defs ",
        3303 : "+title=Fatu Iva 72 / UTM zone 7S +proj=utm +zone=7 +south +ellps=intl +towgs84=347.103,1078.12,2623.92,-33.8875,70.6773,-9.3943,186.074 +units=m +no_defs ",
        3304 : "+title=Tahiti 79 / UTM zone 6S +proj=utm +zone=6 +south +ellps=intl +units=m +no_defs ",
        3305 : "+title=Moorea 87 / UTM zone 6S +proj=utm +zone=6 +south +ellps=intl +towgs84=215.525,149.593,176.229,-3.2624,-1.692,-1.1571,10.4773 +units=m +no_defs ",
        3306 : "+title=Maupiti 83 / UTM zone 5S +proj=utm +zone=5 +south +ellps=intl +towgs84=217.037,86.959,23.956,0,0,0,0 +units=m +no_defs ",
        3312 : "+title=CSG67 / UTM zone 21N +proj=utm +zone=21 +ellps=intl +towgs84=-186,230,110,0,0,0,0 +units=m +no_defs ",
        3313 : "+title=RGFG95 / UTM zone 21N +proj=utm +zone=21 +ellps=GRS80 +towgs84=2,2,-2,0,0,0,0 +units=m +no_defs ",
        3336 : "+title=IGN 1962 Kerguelen / UTM zone 42S +proj=utm +zone=42 +south +ellps=intl +towgs84=145,-187,103,0,0,0,0 +units=m +no_defs ",
        3395 : "+title=WGS 84 / World Mercator +proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        3727 : "+title=Reunion 1947 / TM Reunion +proj=tmerc +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=160000 +y_0=50000 +ellps=intl +units=m +no_defs ",
        21781 : "+title=CH1903 / LV03 +proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs ",
        25830 : "+title=ETRS89 / UTM zone 30N +proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs ",
        25831 : "+title=ETRS89 / UTM zone 31N +proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs ",
        25832 : "+title=ETRS89 / UTM zone 32N +proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs ",
        27561 : "+title=NTF (Paris) / Lambert Nord France +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27562 : "+title=NTF (Paris) / Lambert Centre France +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27563 : "+title=NTF (Paris) / Lambert Sud France +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27564 : "+title=NTF (Paris) / Lambert Corse +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27571 : "+title=NTF (Paris) / Lambert zone I +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27572 : "+title=NTF (Paris) / Lambert zone II +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27573 : "+title=NTF (Paris) / Lambert zone III +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27574 : "+title=NTF (Paris) / Lambert zone IV +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27581 : "+title=NTF (Paris) / France I (deprecated) +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27582 : "+title=NTF (Paris) / France II (deprecated) +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27583 : "+title=NTF (Paris) / France III (deprecated) +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27584 : "+title=NTF (Paris) / France IV (deprecated) +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27591 : "+title=NTF (Paris) / Nord France (deprecated) +proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27592 : "+title=NTF (Paris) / Centre France (deprecated) +proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27593 : "+title=NTF (Paris) / Sud France (deprecated) +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        27594 : "+title=NTF (Paris) / Corse (deprecated) +proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.9999447100000001 +x_0=234.358 +y_0=185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs ",
        32601 : "+proj=utm +zone=1 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32602 : "+proj=utm +zone=2 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32603 : "+proj=utm +zone=3 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32604 : "+proj=utm +zone=4 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32605 : "+proj=utm +zone=5 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32606 : "+proj=utm +zone=6 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32607 : "+proj=utm +zone=7 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32608 : "+proj=utm +zone=8 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32609 : "+proj=utm +zone=9 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32610 : "+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32611 : "+proj=utm +zone=11 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32612 : "+proj=utm +zone=12 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32613 : "+proj=utm +zone=13 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32614 : "+proj=utm +zone=14 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32615 : "+proj=utm +zone=15 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32616 : "+proj=utm +zone=16 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32617 : "+proj=utm +zone=17 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32618 : "+proj=utm +zone=18 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32619 : "+proj=utm +zone=19 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32620 : "+proj=utm +zone=20 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32621 : "+proj=utm +zone=21 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32622 : "+proj=utm +zone=22 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32623 : "+proj=utm +zone=23 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32624 : "+proj=utm +zone=24 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32625 : "+proj=utm +zone=25 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32626 : "+proj=utm +zone=26 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32627 : "+proj=utm +zone=27 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32628 : "+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32629 : "+proj=utm +zone=29 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32630 : "+proj=utm +zone=30 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32631 : "+proj=utm +zone=31 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32632 : "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32633 : "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32634 : "+proj=utm +zone=34 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32635 : "+proj=utm +zone=35 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32636 : "+proj=utm +zone=36 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32637 : "+proj=utm +zone=37 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32638 : "+proj=utm +zone=38 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32639 : "+proj=utm +zone=39 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32640 : "+proj=utm +zone=40 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32641 : "+proj=utm +zone=41 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32642 : "+proj=utm +zone=42 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32643 : "+proj=utm +zone=43 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32644 : "+proj=utm +zone=44 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32645 : "+proj=utm +zone=45 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32646 : "+proj=utm +zone=46 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32647 : "+proj=utm +zone=47 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32648 : "+proj=utm +zone=48 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32649 : "+proj=utm +zone=49 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32650 : "+proj=utm +zone=50 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32651 : "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32652 : "+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32653 : "+proj=utm +zone=53 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32654 : "+proj=utm +zone=54 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32655 : "+proj=utm +zone=55 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32656 : "+proj=utm +zone=56 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32657 : "+proj=utm +zone=57 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32658 : "+proj=utm +zone=58 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32659 : "+proj=utm +zone=59 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32660 : "+proj=utm +zone=60 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32661 : "+proj=stere +lat_0=90 +lat_ts=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32662 : "+title=WGS 84 / Plate Carree +proj=eqc +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32701 : "+proj=utm +zone=1 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32702 : "+proj=utm +zone=2 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32703 : "+proj=utm +zone=3 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32704 : "+proj=utm +zone=4 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32705 : "+proj=utm +zone=5 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32706 : "+proj=utm +zone=6 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32707 : "+proj=utm +zone=7 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32708 : "+proj=utm +zone=8 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32709 : "+proj=utm +zone=9 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32710 : "+proj=utm +zone=10 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32711 : "+proj=utm +zone=11 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32712 : "+proj=utm +zone=12 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32713 : "+proj=utm +zone=13 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32714 : "+proj=utm +zone=14 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32715 : "+proj=utm +zone=15 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32716 : "+proj=utm +zone=16 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32717 : "+proj=utm +zone=17 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32718 : "+proj=utm +zone=18 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32719 : "+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32720 : "+proj=utm +zone=20 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32721 : "+proj=utm +zone=21 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32722 : "+proj=utm +zone=22 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32723 : "+proj=utm +zone=23 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32724 : "+proj=utm +zone=24 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32725 : "+proj=utm +zone=25 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32726 : "+proj=utm +zone=26 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32727 : "+proj=utm +zone=27 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32728 : "+proj=utm +zone=28 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32729 : "+proj=utm +zone=29 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32730 : "+proj=utm +zone=30 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32731 : "+proj=utm +zone=31 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32732 : "+proj=utm +zone=32 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32733 : "+proj=utm +zone=33 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32734 : "+proj=utm +zone=34 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32735 : "+proj=utm +zone=35 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32736 : "+proj=utm +zone=36 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32737 : "+proj=utm +zone=37 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32738 : "+proj=utm +zone=38 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32739 : "+proj=utm +zone=39 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32740 : "+proj=utm +zone=40 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32741 : "+proj=utm +zone=41 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32742 : "+proj=utm +zone=42 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32743 : "+proj=utm +zone=43 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32744 : "+proj=utm +zone=44 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32745 : "+proj=utm +zone=45 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32746 : "+proj=utm +zone=46 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32747 : "+proj=utm +zone=47 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32748 : "+proj=utm +zone=48 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32749 : "+proj=utm +zone=49 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32750 : "+proj=utm +zone=50 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32751 : "+proj=utm +zone=51 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32752 : "+proj=utm +zone=52 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32753 : "+proj=utm +zone=53 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32754 : "+proj=utm +zone=54 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32755 : "+proj=utm +zone=55 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32756 : "+proj=utm +zone=56 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32757 : "+proj=utm +zone=57 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32758 : "+proj=utm +zone=58 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32759 : "+proj=utm +zone=59 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32760 : "+proj=utm +zone=60 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        32761 : "+proj=stere +lat_0=-90 +lat_ts=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ",
        310024802 : "+title=Geoportail - France metropolitaine +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=46.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310915814 : "+title=Geoportail - Antilles francaises +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310486805 : "+title=Geoportail - Guyane +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=4.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310700806 : "+title=Geoportail - Reunion et dependances +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-21.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310702807 : "+title=Geoportail - Mayotte +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-12.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310706808 : "+title=Geoportail - Saint-Pierre et Miquelon +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=47.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310547809 : "+title=Geoportail - Nouvelle-Caledonie +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-22.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310642810 : "+title=Geoportail - Wallis et Futuna +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.000000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-14.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310032811 : "+title=Geoportail - Polynesie francaise +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310642812 : "+title=Geoportail - Kerguelen +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-49.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310642801 : "+title=Geoportail - Crozet +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-46.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310642813 : "+title=Geoportail - Amsterdam et Saint-Paul +proj=eqc +nadgrids=null +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-38.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        310642901 : "+title=Geoportail - Monde +proj=mill +towgs84=0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.000000 +a=6378137.0000 +rf=298.2572221010000 +lon_0=0.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        5489 : "+title=RGAF09 geographiques (dms) +proj=longlat +nadgrids=@null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137 +rf=298.257222101 +units=m +no_defs",
        5490 : "+title=RGAF09 UTM Nord Fuseau 20 +proj=tmerc +nadgrids=@null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137 +rf=298.257222101 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs"
    },
    CRS : {
        84 : "+title=WGS 84 longitude-latitude +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs "
    },
    IGNF : {
        // AMST63 : "+title=Amsterdam 1963 +proj=geocent +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // CROZ63 : "+title=Crozet 1963 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // CSG67 : "+title=Guyane CSG67 +proj=geocent +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // ED50 : "+title=ED50 +proj=geocent +towgs84=-84.0000,-97.0000,-117.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // ETRS89 : "+title=Systeme de reference terrestre Europeen (1989) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // GUAD48 : "+title=Guadeloupe Ste Anne +proj=geocent +towgs84=-472.2900,-5.6300,-304.1200,0.4362,-0.8374,0.2563,1.898400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // GUADFM49 : "+title=Guadeloupe Fort Marigot +proj=geocent +towgs84=136.5960,248.1480,-429.7890 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // IGN63 : "+title=IGN 1963 (Hiva Oa, Tahuata, Mohotani) +proj=geocent +towgs84=410.7210,55.0490,80.7460,-2.5779,-2.3514,-0.6664,17.331100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // IGN72 : "+title=IGN 1972 Grande-Terre / Ile des Pins +proj=geocent +towgs84=-11.6400,-348.6000,291.6800 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // KERG62CAR : "+title=Kerguelen - K0 +proj=geocent +towgs84=144.8990,-186.7700,100.9230 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // MART38 : "+title=Martinique Fort-Desaix +proj=geocent +towgs84=126.9260,547.9390,130.4090,-2.7867,5.1612,-0.8584,13.822650 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // MAYO50 : "+title=Mayotte Combani +proj=geocent +towgs84=-599.9280,-275.5520,-195.6650,-0.0835,-0.4715,0.0602,49.281400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // MOOREA87 : "+title=Moorea 1987 +proj=geocent +towgs84=215.9820,149.5930,176.2290,3.2624,1.6920,1.1571,10.477300 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // NTF : "+title=Nouvelle Triangulation Francaise +proj=geocent +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +units=m +no_defs",
        // NUKU72 : "+title=IGN 1972 Nuku Hiva +proj=geocent +towgs84=165.7320,216.7200,180.5050,-0.6434,-0.4512,-0.0791,7.420400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // REUN47 : "+title=Reunion 1947 +proj=geocent +towgs84=789.5240,-626.4860,-89.9040,0.6006,76.7946,-10.5788,-32.324100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // RGF93 : "+title=Reseau geodesique francais 1993 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RGFG95 : "+title=Reseau geodesique francais de Guyane 1995 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RGM04 : "+title=RGM04 (Reseau Geodesique de Mayotte 2004) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RGNC : "+title=Reseau Geodesique de Nouvelle-Caledonie +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RGPF : "+title=RGPF (Reseau Geodesique de Polynesie Francaise) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RGR92 : "+title=Reseau geodesique Reunion 1992 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RGSPM06 : "+title=Reseau Geodesique Saint-Pierre-et-Miquelon (2006) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RGTAAF07 : "+title=Reseau Geodesique des TAAF (2007) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // RRAF91 : "+title=RRAF 1991 (Reseau de Reference des Antilles Francaises) +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        // STPL69 : "+title=Saint-Paul 1969 +proj=geocent +towgs84=225.571,-346.608,-46.567,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // STPM50 : "+title=St Pierre et Miquelon 1950 +proj=geocent +towgs84=-95.5930,573.7630,173.4420,-0.9602,1.2510,-1.3918,42.626500 +a=6378206.4000 +rf=294.9786982000000 +units=m +no_defs",
        // TAHAA : "+title=Raiatea - Tahaa 51-54 (Tahaa, Base Terme Est) +proj=geocent +towgs84=72.4380,345.9180,79.4860,-1.6045,-0.8823,-0.5565,1.374600 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // TAHI79 : "+title=IGN79 (Tahiti) Iles de la Societe +proj=geocent +towgs84=221.5250,152.9480,176.7680,2.3847,1.3896,0.8770,11.474100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // TERA50 : "+title=Pointe Geologie - Perroud 1950 +proj=geocent +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // WALL78 : "+title=Wallis-Uvea 1978 (MOP78) +proj=geocent +towgs84=253.0000,-133.0000,-127.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        // WGS72 : "+title=World Geodetic System 1972 +proj=geocent +towgs84=0.0000,12.0000,6.0000 +a=6378135.0000 +rf=298.2600000000000 +units=m +no_defs",
        // WGS84 : "+title=World Geodetic System 1984 +proj=geocent +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        AMST63GEO : "+title=Amsterdam 1963 +proj=longlat +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        CROZ63GEO : "+title=Crozet 1963 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        CSG67GEO : "+title=Guyane CSG67 +proj=longlat +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        ED50G : "+title=ED50 +proj=longlat +towgs84=-84.0000,-97.0000,-117.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        GUAD48GEO : "+title=Guadeloupe Ste Anne +proj=longlat +towgs84=-472.2900,-5.6300,-304.1200,0.4362,-0.8374,0.2563,1.898400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        GUADFM49GEO : "+title=Guadeloupe Fort Marigot +proj=longlat +towgs84=136.5960,248.1480,-429.7890 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        IGN63GEO : "+title=IGN 1963 (Hiva Oa, Tahuata, Mohotani) +proj=longlat +towgs84=410.7210,55.0490,80.7460,-2.5779,-2.3514,-0.6664,17.331100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        IGN72GEO : "+title=IGN 1972 Grande-Terre / Ile des Pins +proj=longlat +towgs84=-11.6400,-348.6000,291.6800 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        KERG62GEO : "+title=Kerguelen - K0 +proj=longlat +towgs84=144.8990,-186.7700,100.9230 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        MART38GEO : "+title=Martinique Fort-Desaix +proj=longlat +towgs84=126.9260,547.9390,130.4090,-2.7867,5.1612,-0.8584,13.822650 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        MAYO50GEO : "+title=Mayotte Combani +proj=longlat +towgs84=-599.9280,-275.5520,-195.6650,-0.0835,-0.4715,0.0602,49.281400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        MOOREA87GEO : "+title=Moorea 1987 +proj=longlat +towgs84=215.9820,149.5930,176.2290,3.2624,1.6920,1.1571,10.477300 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        NTFG : "+title=Nouvelle Triangulation Francaise Greenwich degres sexagesimaux +proj=longlat +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +units=m +no_defs",
        NTFP : "+title=Nouvelle Triangulation Francaise Paris grades +proj=longlat +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +units=m +no_defs",
        NUKU72GEO : "+title=IGN 1972 Nuku Hiva +proj=longlat +towgs84=165.7320,216.7200,180.5050,-0.6434,-0.4512,-0.0791,7.420400 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        REUN47GEO : "+title=Reunion 1947 +proj=longlat +towgs84=789.5240,-626.4860,-89.9040,0.6006,76.7946,-10.5788,-32.324100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        RGF93G : "+title=Reseau geodesique francais 1993 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        RGFG95GEO : "+title=Reseau geodesique francais de Guyane 1995 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        RGM04GEO : "+title=RGM04 (Reseau Geodesique de Mayotte 2004) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        RGNCGEO : "+title=Reseau Geodesique de Nouvelle-Caledonie +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        RGPFGEO : "+title=RGPF (Reseau Geodesique de Polynesie Francaise) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        RGR92GEO : "+title=Reseau geodesique de la Reunion 1992 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        RGSPM06GEO : "+title=Saint-Pierre-et-Miquelon (2006) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        RGTAAF07G : "+title=Reseau Geodesique des TAAF (2007) (dms) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        STPL69GEO : "+title=Saint-Paul 1969 +proj=longlat +towgs84=225.571,-346.608,-46.567,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        STPM50GEO : "+title=St Pierre et Miquelon 1950  +proj=longlat +towgs84=-95.5930,573.7630,173.4420,-0.9602,1.2510,-1.3918,42.626500 +a=6378206.4000 +rf=294.9786982000000 +units=m +no_defs",
        TAHAAGEO : "+title=Raiatea - Tahaa 51-54 (Tahaa, Base Terme Est) +proj=longlat +towgs84=72.4380,345.9180,79.4860,-1.6045,-0.8823,-0.5565,1.374600 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        TAHI79GEO : "+title=IGN79 (Tahiti) Iles de la Societe +proj=longlat +towgs84=221.5250,152.9480,176.7680,2.3847,1.3896,0.8770,11.474100 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        TERA50G : "+title=Pointe Geologie - Perroud 1950 +proj=longlat +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        WALL78GEO : "+title=Wallis - Uvea 1978 (MOP78) +proj=longlat +towgs84=253.0000,-133.0000,-127.0000 +a=6378388.0000 +rf=297.0000000000000 +units=m +no_defs",
        WGS72G : "+title=WGS72 +proj=longlat +towgs84=0.0000,12.0000,6.0000 +a=6378135.0000 +rf=298.2600000000000 +units=m +no_defs",
        WGS84G : "+title=World Geodetic System 1984 +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        WGS84RRAFGEO : "+title=Reseau de reference des Antilles francaises (1988-1991) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        XGEO : "+title=Systeme CIO-BIH +proj=longlat +towgs84=0.0000,0.0000,0.5000,0.0000,0.0000,0.0140,-0.100000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        AMST63UTM43S : "+title=Amsterdam 1963 UTM fuseau 43 Sud +proj=tmerc +towgs84=109.753,-528.133,-362.244,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=75.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        CROZ63UTM39S : "+title=Crozet 1963 +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        CSG67UTM21 : "+title=Guyane CSG67 UTM fuseau 21 +proj=tmerc +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        CSG67UTM22 : "+title=Guyane CSG67 UTM fuseau 22 +proj=tmerc +towgs84=-193.0660,236.9930,105.4470,0.4814,-0.8074,0.1276,1.564900 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALANF : "+title=Geoportail - Antilles francaises +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALASP : "+title=Geoportail - Amsterdam et Saint-Paul +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-38.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALCRZ : "+title=Geoportail - Crozet +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-46.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALFXX : "+title=Geoportail - France metropolitaine +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=46.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALGUF : "+title=Geoportail - Guyane +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=4.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALKER : "+title=Geoportail - Kerguelen +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-49.500000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALMYT : "+title=Geoportail - Mayotte +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-12.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALNCL : "+title=Geoportail - Nouvelle-Caledonie +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-22.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALPYF : "+title=Geoportail - Polynesie francaise +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-15.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALREU : "+title=Geoportail - Reunion et dependances +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-21.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALSPM : "+title=Geoportail - Saint-Pierre et Miquelon +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=47.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GEOPORTALWLF : "+title=Geoportail - Wallis et Futuna +proj=eqc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=0.000000000 +lat_ts=-14.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        GUAD48UTM20 : "+title=Guadeloupe Ste Anne +proj=tmerc +towgs84=-472.2900,-5.6300,-304.1200,0.4362,-0.8374,0.2563,1.898400 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        GUADFM49U20 : "+title=Guadeloupe Fort Marigot  +proj=tmerc +towgs84=136.5960,248.1480,-429.7890 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        IGN63UTM7S : "+title=IGN 1963 - Hiva Oa, Tahuata, Mohotani - UTM fuseau 7 Sud +proj=tmerc +towgs84=410.7210,55.0490,80.7460,-2.5779,-2.3514,-0.6664,17.331100 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-141.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        IGN72UTM58S : "+title=IGN 1972 - UTM fuseau 58 Sud +proj=tmerc +towgs84=-11.6400,-348.6000,291.6800 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=165.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        KERG62UTM42S : "+title=Kerguelen 1962 +proj=tmerc +towgs84=144.8990,-186.7700,100.9230 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=69.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        LAMB1 : "+title=Lambert I +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=49.500000000 +lon_0=0.000000000 +k_0=0.99987734 +lat_1=49.500000000 +x_0=600000.000 +y_0=200000.000 +units=m +no_defs",
        LAMB1C : "+title=Lambert I Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=49.500000000 +lon_0=0.000000000 +k_0=0.99987734 +lat_1=49.500000000 +x_0=600000.000 +y_0=1200000.000 +units=m +no_defs",
        LAMB2 : "+title=Lambert II +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=46.800000000 +lon_0=0.000000000 +k_0=0.99987742 +lat_1=46.800000000 +x_0=600000.000 +y_0=200000.000 +units=m +no_defs",
        LAMB2C : "+title=Lambert II Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=46.800000000 +lon_0=0.000000000 +k_0=0.99987742 +lat_1=46.800000000 +x_0=600000.000 +y_0=2200000.000 +units=m +no_defs",
        LAMB3 : "+title=Lambert III +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=44.100000000 +lon_0=0.000000000 +k_0=0.99987750 +lat_1=44.100000000 +x_0=600000.000 +y_0=200000.000 +units=m +no_defs",
        LAMB3C : "+title=Lambert III Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=44.100000000 +lon_0=0.000000000 +k_0=0.99987750 +lat_1=44.100000000 +x_0=600000.000 +y_0=3200000.000 +units=m +no_defs",
        LAMB4 : "+title=Lambert IV +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=42.165000000 +lon_0=0.000000000 +k_0=0.99994471 +lat_1=42.165000000 +x_0=234.358 +y_0=185861.369 +units=m +no_defs",
        LAMB4C : "+title=Lambert IV Carto +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=42.165000000 +lon_0=0.000000000 +k_0=0.99994471 +lat_1=42.165000000 +x_0=234.358 +y_0=4185861.369 +units=m +no_defs",
        LAMB93 : "+title=Lambert 93 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=46.500000000 +lon_0=3.000000000 +lat_1=44.000000000 +lat_2=49.000000000 +x_0=700000.000 +y_0=6600000.000 +units=m +no_defs",
        RGF93CC42 : "+title=Lambert conique conforme Zone 1 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=42.000000000 +lon_0=3.000000000 +lat_1=41.200000000 +lat_2=42.800000000 +x_0=1700000.000 +y_0=1200000.000 +units=m +no_defs",
        RGF93CC43 : "+title=Lambert conique conforme Zone 2 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=43.000000000 +lon_0=3.000000000 +lat_1=42.200000000 +lat_2=43.800000000 +x_0=1700000.000 +y_0=2200000.000 +units=m +no_defs",
        RGF93CC44 : "+title=Lambert conique conforme Zone 3 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=44.000000000 +lon_0=3.000000000 +lat_1=43.200000000 +lat_2=44.800000000 +x_0=1700000.000 +y_0=3200000.000 +units=m +no_defs",
        RGF93CC45 : "+title=Lambert conique conforme Zone 4 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=45.000000000 +lon_0=3.000000000 +lat_1=44.200000000 +lat_2=45.800000000 +x_0=1700000.000 +y_0=4200000.000 +units=m +no_defs",
        RGF93CC46 : "+title=Lambert conique conforme Zone 5 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=46.000000000 +lon_0=3.000000000 +lat_1=45.200000000 +lat_2=46.800000000 +x_0=1700000.000 +y_0=5200000.000 +units=m +no_defs",
        RGF93CC47 : "+title=Lambert conique conforme Zone 6 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=47.000000000 +lon_0=3.000000000 +lat_1=46.200000000 +lat_2=47.800000000 +x_0=1700000.000 +y_0=6200000.000 +units=m +no_defs",
        RGF93CC48 : "+title=Lambert conique conforme Zone 7 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=48.000000000 +lon_0=3.000000000 +lat_1=47.200000000 +lat_2=48.800000000 +x_0=1700000.000 +y_0=7200000.000 +units=m +no_defs",
        RGF93CC49 : "+title=Lambert conique conforme Zone 8 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=49.000000000 +lon_0=3.000000000 +lat_1=48.200000000 +lat_2=49.800000000 +x_0=1700000.000 +y_0=8200000.000 +units=m +no_defs",
        RGF93CC50 : "+title=Lambert conique conforme Zone 9 +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=50.000000000 +lon_0=3.000000000 +lat_1=49.200000000 +lat_2=50.800000000 +x_0=1700000.000 +y_0=9200000.000 +units=m +no_defs",
        LAMBE : "+title=Lambert II etendu +proj=lcc +nadgrids=ntf_r93.gsb,null +wktext +towgs84=-168.0000,-60.0000,320.0000 +a=6378249.2000 +rf=293.4660210000000 +pm=2.337229167 +lat_0=46.800000000 +lon_0=0.000000000 +k_0=0.99987742 +lat_1=46.800000000 +x_0=600000.000 +y_0=2200000.000 +units=m +no_defs",
        MART38UTM20 : "+title=Martinique Fort-Desaix +proj=tmerc +towgs84=126.9260,547.9390,130.4090,-2.7867,5.1612,-0.8584,13.822650 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        MAYO50UTM38S : "+title=Mayotte Combani +proj=tmerc +towgs84=-599.9280,-275.5520,-195.6650,-0.0835,-0.4715,0.0602,49.281400 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=45.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        MILLER : "+title=Geoportail - Monde +proj=mill +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lon_0=0.000000000 +x_0=0.000 +y_0=0.000 +units=m +no_defs",
        MOOREA87U6S : "+title=Moorea 1987 - UTM fuseau 6 Sud +proj=tmerc +towgs84=215.9820,149.5930,176.2290,3.2624,1.6920,1.1571,10.477300 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        NUKU72U7S : "+title=IGN 1972 Nuku Hiva - UTM fuseau 7 Sud +proj=tmerc +towgs84=165.7320,216.7200,180.5050,-0.6434,-0.4512,-0.0791,7.420400 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-141.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        // REUN47GAUSSL : "+title=Reunion Gauss Laborde +proj=gstmerc +towgs84=789.5240,-626.4860,-89.9040,0.6006,76.7946,-10.5788,-32.324100 +a=6378388.0000 +rf=297.0000000000000 +lat_0=-21.116666667 +lon_0=55.533333333 +k_0=1.00000000 +x_0=160000.000 +y_0=50000.000 +units=m +no_defs",
        RGM04UTM38S : "+title=UTM fuseau 38 Sud (Reseau Geodesique de Mayotte 2004) +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=45.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGNCUTM57S : "+title=Reseau Geodesique de Nouvelle-Caledonie - UTM fuseau 57 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=159.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGNCUTM58S : "+title=Reseau Geodesique de Nouvelle-Caledonie - UTM fuseau 58 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=165.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGNCUTM59S : "+title=Reseau Geodesique de Nouvelle-Caledonie - UTM fuseau 59 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=171.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGPFUTM5S : "+title=RGPF - UTM fuseau 5 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-153.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGPFUTM6S : "+title=RGPF - UTM fuseau 6 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGPFUTM7S : "+title=RGPF - UTM fuseau 7 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-141.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGR92UTM40S : "+title=RGR92 UTM fuseau 40 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        RGSPM06U21 : "+title=Saint-Pierre-et-Miquelon (2006) UTM Fuseau 21 Nord +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        STPL69UTM43S : "+title=Saint-Paul 1969 UTM fuseau 43 Sud +proj=tmerc +towgs84=225.571,-346.608,-46.567,0,0,0,0 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=75.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        STPM50UTM21 : "+title=St Pierre et Miquelon 1950 +proj=tmerc +towgs84=-95.5930,573.7630,173.4420,-0.9602,1.2510,-1.3918,42.626500 +a=6378206.4000 +rf=294.9786982000000 +lat_0=0.000000000 +lon_0=-57.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        TAHAAUTM05S : "+title=Tahaa 1951 +proj=tmerc +towgs84=72.4380,345.9180,79.4860,-1.6045,-0.8823,-0.5565,1.374600 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-153.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        TAHI51UTM06S : "+title=Tahiti-Terme Nord UTM fuseau 6 Sud +proj=tmerc +towgs84=162.0000,117.0000,154.0000 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        TAHI79UTM6S : "+title=Tahiti 1979 +proj=tmerc +towgs84=221.5250,152.9480,176.7680,2.3847,1.3896,0.8770,11.474100 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-147.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        TERA50STEREO : "+title=Terre Adelie 1950 +proj=stere +towgs84=324.9120,153.2820,172.0260 +a=6378388.0000 +rf=297.0000000000000 +lat_0=-90.000000000 +lon_0=140.000000000 +lat_ts=-67 +k=0.96027295 +x_0=300000.000 +y_0=-2299363.482 +units=m +no_defs",
        UTM01SW84 : "+title=World Geodetic System 1984 UTM fuseau 01 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-177.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        UTM20W84GUAD : "+title=World Geodetic System 1984 UTM fuseau 20 Nord-Guadeloupe +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM20W84MART : "+title=World Geodetic System 1984 UTM fuseau 20 Nord-Martinique +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-63.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM22RGFG95 : "+title=RGFG95 UTM fuseau 22 Nord-Guyane +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM39SW84 : "+title=World Geodetic System 1984 UTM fuseau 39 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=51.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        UTM42SW84 : "+title=World Geodetic System 1984 UTM fuseau 42 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=69.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        UTM43SW84 : "+title=World Geodetic System 1984 UTM fuseau 43 Sud +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=75.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        WALL78UTM1S : "+title=Wallis-Uvea 1978 (MOP78) UTM 1 SUD +proj=tmerc +towgs84=253.0000,-133.0000,-127.0000 +a=6378388.0000 +rf=297.0000000000000 +lat_0=0.000000000 +lon_0=-177.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=10000000.000 +units=m +no_defs",
        ETRS89GEO : "+title=ETRS89 geographiques (dms) +proj=longlat +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +units=m +no_defs",
        ETRS89LAEA : "+title=ETRS89 Lambert Azimutal Equal Area +proj=laea +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=52.000000000 +lon_0=10.000000000 +x_0=4321000.000 +y_0=3210000.000 +units=m +no_defs",
        ETRS89LCC : "+title=ETRS89 Lambert Conformal Conic +proj=lcc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=52.000000000 +lon_0=9.999999995 +lat_1=35.000000000 +lat_2=65.000000000 +x_0=4000000.000 +y_0=2800000.000 +units=m +no_defs",
        UTM26ETRS89 : "+title=Europe - de 30d a 24d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-27.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM27ETRS89 : "+title=Europe - de 24d a 18d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-21.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM28ETRS89 : "+title=Europe - de 18d a 12d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-15.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM29ETRS89 : "+title=Europe - de 12d a 6d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-9.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM30ETRS89 : "+title=Europe - de -6d a 0d Ouest +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=-3.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM31ETRS89 : "+title=Europe - de 0d a 6d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=3.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM32ETRS89 : "+title=Europe - de 6d a 12d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=9.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM33ETRS89 : "+title=Europe - de 12d a 18d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=15.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM34ETRS89 : "+title=Europe - de 18d a 24d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=21.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM35ETRS89 : "+title=Europe - de 24d a 30d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=27.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM36ETRS89 : "+title=Europe - de 30d a 36d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=33.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM37ETRS89 : "+title=Europe - de 36d a 42d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=39.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs",
        UTM38ETRS89 : "+title=Europe - de 42d a 48d Est +proj=tmerc +nadgrids=null +wktext +towgs84=0.0000,0.0000,0.0000 +a=6378137.0000 +rf=298.2572221010000 +lat_0=0.000000000 +lon_0=45.000000000 +k_0=0.99960000 +x_0=500000.000 +y_0=0.000 +units=m +no_defs"
    }
};

export default Register;
