var GeocodeUtils = {
    /**
     * Return the freeform of a structured geocoded item
     *
     * @param {Object} geocodedLocation - Geocoded location
     * @returns {String} freeform string
     */
    getGeocodedLocationFreeform : function (geocodedLocation) {
        var attributes = geocodedLocation.placeAttributes;
        if (attributes.freeform) {
            return attributes.freeform;
        } else if (geocodedLocation.type === "PositionOfInterest") {
            return attributes.postalCode + " " + attributes.toponyme;
        } else if (geocodedLocation.type === "StreetAddress") {
            return (attributes.number ? attributes.number + " " : "") + attributes.street + " " + (attributes.postalCode ? attributes.postalCode + ", " : "") + attributes.city;
        } else if (geocodedLocation.type === "CadastralParcel") {
            return attributes.identifiant;
        } else {
            return "...";
        }
    }
};

export default GeocodeUtils;