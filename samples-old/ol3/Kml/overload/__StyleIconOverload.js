define([ "woodman", "ol" ], function ( woodman, ol ) {
    "use strict";

    woodman.load("console");
    var logger = woodman.getLogger("style OVERLOAD format");

    // (function () {

    /** ... */
    ol.style.IconImage.prototype.load = function () {
        if (this.imageState_ == ol.ImageState.IDLE) {
            this.imageState_ = ol.ImageState.LOADING;
            this.imageListenerKeys_ = [
                ol.events.listenOnce(this.image_, ol.events.EventType.ERROR, this.handleImageError_, this),
                ol.events.listenOnce(this.image_, ol.events.EventType.LOAD, this.handleImageLoad_, this)
            ];

            try {
                var _corsHost = "cors-anywhere.herokuapp.com";
                var _corsUrl = "https://" + _corsHost + "/";
                this.image_.src = _corsUrl + this.src_;
                logger.trace(" !");
            } catch (e) {
                this.handleImageError_();
            }
        }
    };
    // })();
});
