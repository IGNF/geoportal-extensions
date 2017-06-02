define([
    "itowns"
], function (
    itowns
) {

    "use strict";

    /**
    * @classdesc
    *
    * Extended itowns.GlobeView.
    *
    * @constructor
    * @extends {itowns.GlobeView}
    */
    function GlobeViewExtended (viewerDiv, coordCarto, options) {

        viewerDiv.style.position = "relative";

        // call constructor
        itowns.GlobeView.call(this, viewerDiv, coordCarto, options);
    }

    /*
    * @lends
    */
    GlobeViewExtended.prototype = Object.create(itowns.GlobeView.prototype, {});

    /**
    * Constructor (alias)
    */
    GlobeViewExtended.prototype.constructor = GlobeViewExtended;

    return GlobeViewExtended;
});
