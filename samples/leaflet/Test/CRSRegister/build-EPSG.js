// Transformations des definitions des fichiers CRS, EPSG et IGNF :
// Ex.
// <84> +title=WGS 84 longitude-latitude +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs  <>
// vers
// CRS : {
//   84 : "+title=WGS 84 longitude-latitude +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
// }

console.log("Build Register Definition...");

var fs = require("fs");

fs.unlink('oEPSG', function () {
    fs.readFileSync('EPSG').toString().split('\n').forEach(
        function (line) {
            console.log(line);

            if (line.startsWith("#")) {
                return;
            }

            if (line.startsWith("\n")) {
                return;
            }

            var fd = line.match(/<(\w+)>\s+(.*)\s+<>/);
            if (fd === null) {
                return;
            }

            var code = fd[1];
            var def  = fd[2];
            console.log(code, def);

            var EPSG = {};
            EPSG[code] = def;

            // fs.appendFileSync("oEPSG", JSON.stringify(EPSG, null, 4) + ",\n");
            fs.appendFileSync("oEPSG",  code + " : " +  "\"" + def + "\"" + ",\n");
    });
});
