define([
    "leaflet",
    "woodman"
],
function (L, woodman) {

    "use strict";

    var logger = woodman.getLogger("icondefault");

    /**  cf. http://leafletjs.com/reference.html#icon */
    var IconDefault =  L.Icon.Default.extend( /** @lends IconDefault.prototype */ {

        images : {
            shadow : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5ElEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBNwU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzyBjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZhzMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmLNqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoBjq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOtiiajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF174H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzrWQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=",
            color : {
                blue : "data:image/png;base64,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",
                orange : "data:image/png;base64,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",
                red : "data:image/png;base64,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",
                green : "data:image/png;base64,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"
            }
        },

        /**
        * constructor
        * (extend to L.Icon.Default)
        *
        * @param {String} color - blue, green or red, blue by default.
        * @param {Object} options - options of L.Icon
        */
        initialize : function (color, options) {
            // on merge les options avec celles par defaut
            L.Util.extend(this.options, options);

            switch (color) {
                case "red" :
                    this.options.iconUrl = this.images.color.red;
                    break;
                case "green" :
                    this.options.iconUrl = this.images.color.green;
                    break;
                case "orange" :
                    this.options.iconUrl = this.images.color.orange;
                    break;
                case "blue" :
                    this.options.iconUrl = this.images.color.blue;
                    break;
                default :
                    this.options.iconUrl = this.images.color.blue;
            }

            this.options.shadowUrl = this.images.shadow;
        },

        /**
        * Overload function to ensure compatibility between versions 0.7.X and 1.0.X
        * (extend to L.Icon._getIconUrl)
        *
        */
        _getIconUrl : function (name) {
            logger.trace("OVERWRITTEN L.Icon.Default._getIconUrl(" + name + ")");
            return L.Icon.prototype._getIconUrl.call(this, name);
        }
    });

    return IconDefault;
});
