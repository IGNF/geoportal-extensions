var CRS = {

    /**
     * CRS : WGS84
     *
     * @property EPSG:4326
     * @private
     */
    "EPSG:4326" : "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs +units=degrees",

    /**
     * CRS : PseudoMercator
     *
     * @property EPSG:3857
     * @private
     */
    "EPSG:3857" : "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",

    /**
     * CRS : Lambert 93
     *
     * @property EPSG:2154
     * @private
     */
    "EPSG:2154" : "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

    /**
     * CRS : Lambert 2 extended
     *
     * @property EPSG:27572
     * @private
     */
    "EPSG:27572" : "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs",

    /**
     * CRS : UTM 20N (Guadeloupe, Martinique)
     *
     * @property EPSG:32620
     * @private
     */
    "EPSG:32620" : "+proj=utm +zone=20 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 21N (Saint-Pierre-et-Miquelon)
     *
     * @property EPSG:4467
     * @private
     */
    "EPSG:4467" : "+proj=utm +zone=21 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

    /**
     * CRS : UTM 22N (Guyane)
     *
     * @property EPSG:2972
     * @private
     */
    "EPSG:2972" : "+proj=utm +zone=22 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

    /**
     * CRS : UTM 30N (France métropolitaine)
     *
     * @property EPSG:32630
     * @private
     */
    "EPSG:32630" : "+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 31N (France métropolitaine)
     *
     * @property EPSG:32631
     * @private
     */
    "EPSG:32631" : "+proj=utm +zone=31 +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 32N (France métropolitaine)
     *
     * @property EPSG:32632
     * @private
     */
    "EPSG:32632" : "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 38S (Mayotte)
     *
     * @property EPSG:4471
     * @private
     */
    "EPSG:4471" : "+proj=utm +zone=38 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

    /**
     * CRS : UTM 40S (Réunion)
     *
     * @property EPSG:2975
     * @private
     */
    "EPSG:2975" : "+proj=utm +zone=40 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

    /**
     * CRS : UTM 5S (Polynésie)
     *
     * @property EPSG:3296
     * @private
     */
    "EPSG:3296" : "+proj=utm +zone=5 +south +ellps=GRS80 +towgs84=0.072,-0.507,-0.245,-0.0183,0.0003,-0.007,-0.0093 +units=m +no_defs",

    /**
     * CRS : UTM 6S (Polynésie)
     *
     * @property EPSG:3297
     * @private
     */
    "EPSG:3297" : "+proj=utm +zone=6 +south +ellps=GRS80 +towgs84=0.072,-0.507,-0.245,-0.0183,0.0003,-0.007,-0.0093 +units=m +no_defs",

    /**
     * CRS : UTM 7S (Polynésie)
     *
     * @property EPSG:32707
     * @private
     */
    "EPSG:32707" : "+proj=utm +zone=7 +south +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 8S (Polynésie)
     *
     * @property EPSG:32708
     * @private
     */
    "EPSG:32708" : "+proj=utm +zone=8 +south +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 12N (Ile de Clipperton)
     *
     * @property EPSG:26912
     * @private
     */
    "EPSG:26912" : "+proj=utm +zone=12 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

    /**
     * CRS : UTM 42S (Iles Kerguelen)
     *
     * @property EPSG:32742
     * @private
     */
    "EPSG:32742" : "+proj=utm +zone=42 +south +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 39S (Iles Crozet)
     *
     * @property EPSG:32739
     * @private
     */
    "EPSG:32739" : "+proj=utm +zone=39 +south +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 43S (Iles St-Paul et Amsterdam)
     *
     * @property EPSG:32743
     * @private
     */
    "EPSG:32743" : "+proj=utm +zone=43 +south +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : Stéréographique polaire (Terre Adelie)
     *
     * @property EPSG:2986
     * @private
     */
    "EPSG:2986" : "",

    /**
     * CRS : UTM 37S (Iles du canal de Mozambique)
     *
     * @property EPSG:32737
     * @private
     */
    "EPSG:32737" : "+proj=utm +zone=37 +south +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 38S (Iles du canal de Mozambique)
     *
     * @property EPSG:32738
     * @private
     */
    "EPSG:32738" : "+proj=utm +zone=38 +south +datum=WGS84 +units=m +no_defs",

    /**
     * CRS : UTM 1S (Wallis-et-Futuna)
     *
     * @property EPSG:2988
     * @private
     */
    "EPSG:2988" : "+proj=utm +zone=1 +south +ellps=intl +towgs84=253,-132,-127,0,0,0,0 +units=m +no_defs",

    /**
     * CRS : RGNC91-93 (Nouvelle-Calédonie)
     *
     * @property EPSG:3163
     * @private
     */
    "EPSG:3163" : "+proj=lcc +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5 +lon_0=166 +x_0=400000 +y_0=300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
};

export default CRS;
