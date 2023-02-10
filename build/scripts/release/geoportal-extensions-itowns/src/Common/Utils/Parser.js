import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("parser");

/**
* @module Parser
* @alias Gp.Parser
* @description
* ...
*
* @example
* parse();
* toString();
*/
var Parser = {

    /**
     * ...
     *
     * @param {String} xml - XML string
     * @returns {DOMElement} doc
     */
    parse : function (xml) {
        var doc = null;
        var parser = null;
        var scope = typeof window !== "undefined" ? window : null;

        if (typeof exports === "object" && window === null) {
            // code for nodejs
            var DOMParser = require("xmldom").DOMParser;
            parser = new DOMParser();
            doc = parser.parseFromString(xml, "text/xml");
        } else if (scope.DOMParser) {
            // code for modern browsers
            parser = new scope.DOMParser();
            doc = parser.parseFromString(xml, "text/xml");
        } else if (scope.ActiveXObject) {
            // code for old IE browsers
            doc = new scope.ActiveXObject("Microsoft.XMLDOM");
            doc.async = false;
            doc.loadXML(xml);
        } else {
            logger.log("Incompatible environment for DOM Parser !");
        }

        logger.trace(doc);
        return doc;
    },

    /**
     * ...
     *
     * @param {DOMElement} doc - doc
     * @returns {String} XML string
     */
    toString : function (doc) {
        // TODO
        // try catch pour les exceptions !
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer/serializeToString
        var oSerializer = new XMLSerializer();
        var xml = oSerializer.serializeToString(doc);

        logger.trace(xml);
        return xml;
    },

    /**
     * ...
     * cf. https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript/
     *
     * @param {String} xml - XML string
     * @returns {String} XML string formatted
     */
    format : function (xml) {
        var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
        var wsexp = / *(.*) +\n/g;
        var contexp = /(<.+>)(.+\n)/g;
        xml = xml.replace(reg, "$1\n$2$3").replace(wsexp, "$1\n").replace(contexp, "$1\n$2");
        var formatted = "";
        var lines = xml.split("\n");
        var indent = 0;
        var lastType = "other";
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions
        var transitions = {
            "single->single" : 0,
            "single->closing" : -1,
            "single->opening" : 0,
            "single->other" : 0,
            "closing->single" : 0,
            "closing->closing" : -1,
            "closing->opening" : 0,
            "closing->other" : 0,
            "opening->single" : 1,
            "opening->closing" : 0,
            "opening->opening" : 1,
            "opening->other" : 1,
            "other->single" : 0,
            "other->closing" : -1,
            "other->opening" : 0,
            "other->other" : 0
        };

        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
            var type = single ? "single" : closing ? "closing" : opening ? "opening" : "other";
            var fromTo = lastType + "->" + type;
            lastType = type;
            var padding = "";

            indent += transitions[fromTo];
            for (var j = 0; j < indent; j++) {
                padding += "\t";
            }
            if (fromTo === "opening->closing") {
                formatted = formatted.substr(0, formatted.length - 1) + ln + "\n"; // substr removes line break (\n) from prev loop
            } else {
                formatted += padding + ln + "\n";
            }
        }

        logger.trace(formatted);
        return formatted;
    }
};

export default Parser;
