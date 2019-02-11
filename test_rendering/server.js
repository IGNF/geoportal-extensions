
var https = require("https");
var fs = require("fs");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");

var serve = serveStatic("..", {
    "setHeaders" : function (res, path) {
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
});

var opts = {
    key : fs.readFileSync("key.pem"),
    cert : fs.readFileSync("cert.pem")
};

var server = https.createServer(opts, function onRequest (req, res) {
    serve(req, res, finalhandler(req, res));
});

server.listen(8087, function () {
    console.log("Server running on 8087...");
});

// var connect = require("connect");
// connect().use(serveStatic("..", {
//     "setHeaders" : function (res, path) {
//         res.setHeader("Access-Control-Allow-Origin", "*");
//     }
// })).listen(8087, function () {
//     console.log("Server running on 8087...");
// });
