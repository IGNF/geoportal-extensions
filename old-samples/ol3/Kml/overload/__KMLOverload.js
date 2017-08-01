define([
    "woodman",
    "ol"
], function (
    woodman,
    ol
) {
    "use strict";

    // FIXME impossible de surcharger des methodes privées !
    // https://github.com/openlayers/openlayers/issues/3877
    
    woodman.load("console");
    var logger = woodman.getLogger("KML OVERLOAD format");

    (function () {
        logger.log("TEST OVERLOAD !");
        var _parentIconStyleParser = ol.format.KML.IconStyleParser_;

        /** ... */
        ol.format.KML.IconStyleParser_ = function (node, objectStack) {
            logger.log("TEST OVERLOAD IconStyleParser !");
            _parentIconStyleParser(node, objectStack);
        };
    })();

});
