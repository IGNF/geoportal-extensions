var fs = require("fs");
var path = require("path");
var glob = require("glob");

class SourceByChunksPlugin {

    /**
     * ...
     * @param {*} options - ...
     */
    constructor (options) {
        this.options = Object.assign({
            entry : null, // Leaflet | OpenLayers | Itowns
            output : null, // manifest.json par defaut
            format : null // txt | json par defaut
        }, options);

        this.format = this.options.format || "json";
        this.regexLib = new RegExp(this.options.entry || "Leaflet");
        this.regexCommon = new RegExp("Common");
        this.manifest = this.options.output || path.resolve(process.cwd(), "manifest.json");
        this.files = glob.sync("src/**", {
            nodir : true,
            ignore : "*.(png|jpg|gif|svg)$"
        });
    }

    /**
     * ...
     * @param {*} map - ...
     * @returns {Array} ...
     */
    filter (map) {
        var results = [];
        var files = this.files;
        var entry = this.options.entry;
        map.forEach(e => {
            results.push({
                id : e.id,
                name : e.name,
                modules : e.modules
                    // supprime les valeurs null
                    .filter(function (v) {
                        if (v) {
                            return v;
                        }
                    })
                    // supprime les paths absolus
                    .map(function (e) {
                        return e
                            .replace(/^\.\.\//, "")
                            .replace(/^\.\.\//, "")
                            .replace(/^\.\//, "")
                            .replace(path.resolve(process.cwd()), "")
                            .replace(/^\//, "");
                    })
                    // remplace les paths en relatif à partir de "./src/"
                    .map(function (v) {
                        var index = files.findIndex(function (e) {
                            if (e.includes(v) && (e.includes(entry) || e.includes("Common"))) {
                                return true;
                            }
                        });
                        return files[index] || v;
                    })
            });
        });
        return results;
    }

    /**
     * ...
     * @param  {Compilation} compiler - ...
     */
    apply (compiler) {
        compiler.plugin("compilation", compilation => {
            compilation.plugin("after-optimize-chunk-assets", chunks => {
                var map = chunks.map(chunk => {
                    return {
                        id : chunk.id,
                        name : chunk.name,
                        modules : Array.from(chunk._modules).map(module => {
                            if (module && (this.regexLib.test(module.context) || this.regexCommon.test(module.context))) {
                                return module.rawRequest;
                            }
                        })
                    };
                });
                var strdata = "";
                var data = this.filter(map);
                switch (this.format) {
                    case "txt":
                        // Au format texte pour une meilleur utilisation en bash :
                        // name=(modules)
                        // Ex. ElevationPath=(...)
                        for (let index = 0; index < data.length; index++) {
                            const element = data[index];
                            var modules = [];
                            element.modules.forEach(e => {
                                modules.push("\"" + e + "\"");
                            });
                            strdata += element.name + "=" + "(" + modules.join(" ") + ")\n";
                        }
                        break;

                    case "json":
                        strdata = JSON.stringify(data, null, 2);
                        break;

                    default:
                        break;
                }
                fs.writeFileSync(this.manifest, strdata);
            });
        });
    }

}

module.exports = SourceByChunksPlugin;
