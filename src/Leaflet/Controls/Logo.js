define(["leaflet"], function (L) {

    "use strict";

    /**
    * @classdesc
    *
    * Control Logo
    *
    * @private
    * @constructor
    * @extends {L.Control}
    * @alias Logo
    * @param {Object} options - options for function call.
    * @param {String} options.position - 'topright' by default
    * @param {String} options.url - URL
    * @param {String} options.text - text
    * @param {String} options.picto - picto
    * @example
    * var map  = L.map('map').setView([48, 2], 4);
    * var logo = L.geoportalControl.Logo({
    *   position : "topright",
    *   picto : "http://www.ign.fr/logo-ign.jpg",
    *   url : "http://www.ign.fr",
    *   text : "© IGN",
    *   size : "70px"
    * });
    * logo.addTo(map);
    */
    var Logo = L.Control.extend( /** @lends Logo.prototype */ {

        /**
        * Options du service
        *
        * @private
        */
        options : {
            position : "topright",
            picto : null,
            url : null,
            text : null,
            size : "30px"
        },

        /**
        * constructor
        *
        * @private
        */
        initialize : function (options) {
            L.setOptions(this, options);
        },

        /**
        * event
        *
        * @private
        */
        onAdd : function (/* map */) {

            var container = L.DomUtil.create("div", "gp-control-logo", container);

            var bLink = (this.options.url || this.options.text) ? true : false;
            var link  = null;

            if (bLink) {
                link = L.DomUtil.create("a", "", container);
                link.target  = "_blank";
                if (this.options.url) {
                    link.href = this.options.url;
                    (this.options.text) ? link.title = this.options.text : null;
                }
            }

            // FIXME mise en forme à prévoir !
            if (bLink && this.options.text) {
                link.text = this.options.text;
            }

            var bImage = (this.options.picto) ? true : false;
            var image  = null;

            if (bImage) {
                if (bLink) {
                    image = L.DomUtil.create("img", "", link);
                } else {
                    image = L.DomUtil.create("img", "", container);
                }
                image.src = this.options.picto;
                if ( typeof this.options.size === "string" ) {
                    image.style.height = image.style.width = this.options.size;
                } else {
                    image.style.height = this.options.size.height;
                    image.style.width  = this.options.size.width;
                }
            }

            return container;
        }
    });

    return Logo;
});
