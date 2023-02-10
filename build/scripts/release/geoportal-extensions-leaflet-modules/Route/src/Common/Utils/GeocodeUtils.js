var GeocodeUtils = {
    /**
     * Return the freeform of a structured geocoded item
     *
     * @param {Object} geocodedLocation - Geocoded location
     * @returns {String} freeform string
     */
    getGeocodedLocationFreeform : function (geocodedLocation) {
        var attributes = geocodedLocation.placeAttributes;
        if (attributes.label) {
            return attributes.label;
        } else if (geocodedLocation.type === "PositionOfInterest") {
            return attributes.postcode + " " + attributes.toponym;
        } else if (geocodedLocation.type === "StreetAddress") {
            return (attributes.housenumber ? attributes.housenumber + " " : "") + attributes.street + " " + (attributes.postcode ? attributes.postcode + ", " : "") + attributes.city;
        } else if (geocodedLocation.type === "CadastralParcel") {
            return attributes.id;
        } else {
            return "...";
        }
    },

    /**
     * Return the freeform of a structured suggested item
     *
     * @param {Object} suggestedLocation - Suggested location
     * @returns {String} freeform string
     */
    getSuggestedLocationFreeform : function (suggestedLocation) {
        if (suggestedLocation.fullText) {
            return suggestedLocation.fullText;
        } else {
            var values = [];
            values.push(suggestedLocation.street || "");
            values.push(suggestedLocation.postalCode || "");
            values.push(suggestedLocation.commune || "");

            if (suggestedLocation.type === "PositionOfInterest") {
                values.push(suggestedLocation.poi || "");
                values.push(suggestedLocation.kind || "");
            }
            return values.join(" - ");
        }
    }
};

export default GeocodeUtils;
