/**
 * @module SearchEngineUtils
 * @alias [private] SearchEngineUtils
 * @description
 * ...
 *
 * @example
 * advancedSearchFiltersByDefault();
 * zoomToResultsByDefault();
 */
var SearchEngineUtils = {
    /**
     * Advanced Search Filters by default
     * @function advancedSearchFiltersByDefault
     */
    advancedSearchFiltersByDefault : {
        PositionOfInterest : [
            {
                name : "category",
                title : "Type",
                value : [
                    "cimetière",
                    "aérodrome",
                    "réservoir",
                    "administratif",
                    "construction linéaire",
                    "construction ponctuelle",
                    "construction surfacique",
                    "cours d'eau",
                    "détail hydrographique",
                    "détail orographique",
                    "équipement de transport",
                    "plan d'eau",
                    "poste de transformation",
                    "terrain de sport",
                    "transport par câble",
                    "zone d'activité ou d'intérêt",
                    "zone d'habitation",
                    "lieu-dit non habité"
                ]
            }, {
                name : "postcode",
                title : "Code postal"
            }, {
                name : "citycode",
                title : "Code INSEE"
            }
        ],
        StreetAddress : [
            {
                name : "city",
                title : "Ville"
            }, {
                name : "postcode",
                title : "Code postal"
            }, {
                name : "citycode",
                title : "Code INSEE"
            }
        ],
        CadastralParcel : [
            {
                name : "departmentcode",
                title : "Code département (INSEE)",
                description : "Code INSEE du département (ex: 01, 94)"
            }, {
                name : "municipalitycode",
                title : "Code commune (INSEE)",
                description : "Code INSEE de la commune : 3 chiffres (ex: 067)"
            }, {
                name : "city",
                title : "Nom commune",
                description : "Nom de la commune"
            }, {
                name : "oldmunicipalitycode",
                title : "Commune absorbée",
                description : "Commune absorbée : 3 chiffres (ex: 000, 001)"
            }, {
                name : "districtcode",
                title : "Arrondissement",
                description : "Arrondissement : 3 chiffres (ex: 004, 012)"
            }, {
                name : "section",
                title : "Section",
                description : "Section Cadastrale : 2 caractères (chiffre et/ou lettre)"
            }, {
                name : "number",
                title : "Numéro",
                description : "Numéro de la parcelle : 4 chiffres (ex: 0041, 0250)"
            }, {
                name : "sheet",
                title : "Feuille",
                description : "Numéro de la feuille cadastrale"
            }
        ]
    },

    /**
     * Provides default zoom based on results.
     *
     * @function zoomToResultsByDefault
     * @param {Object} info - location information
     * @returns {Integer} zoom level
     */
    zoomToResultsByDefault : function (info) {
        // FIXME
        // la classification du geocodage est differente de l'importance de l'autocompletion !

        var zoom = 15;

        var service = info.service;
        var fields = info.fields;
        var type = info.type;

        var importance = {
            1 : 11,
            2 : 12,
            3 : 13,
            4 : 14,
            5 : 15,
            6 : 16,
            7 : 17,
            8 : 17
        };

        // AutoCompletion POI
        if (service === "SuggestedLocation") {
            if (type === "PositionOfInterest") {
                zoom = importance[fields.classification];
            }
        }

        // Geocodage POI
        if (service === "GeocodedLocation") {
            if (type === "PositionOfInterest") {
                zoom = importance[fields.importance] || 14; // au cas où la recherche est en freeform !
            }
        }

        if (type === "StreetAddress") {
            zoom = 17;
        }

        if (type === "CadastralParcel") {
            zoom = 17;
        }

        return zoom;
    }
};

export default SearchEngineUtils;
