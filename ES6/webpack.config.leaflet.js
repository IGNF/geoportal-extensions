/* global module, __dirname */

// -- modules
var path    = require("path");
var webpack = require("webpack");

// -- plugins
var DefineWebpackPlugin   = webpack.DefinePlugin;

// -- variables

module.exports = env => {

    var _production = (env) ? env.production : false;

    return {
        entry : [
            path.join(__dirname, "src", "Common", "Utils", "AutoLoadConfig"),
            path.join(__dirname, "src", "Leaflet", "GpPluginLeaflet")
        ],
        output : {
            path : path.join(__dirname, "dist", "leaflet"),
            filename : (_production) ? "GpPluginLeaflet.js" : "GpPluginLeaflet-src.js",
            library : "Gp",
            libraryTarget : "umd",
            libraryExport : "default",
            umdNamedDefine : true
        },
        resolve : {
            alias : {
                gp : path.resolve( __dirname, "node_modules", "geoportal-access-lib", "dist", "GpServices-src.js"),
                proj4 : path.resolve( __dirname, "node_modules", "proj4", "dist", "proj4-src.js"),
                proj4leaflet : path.resolve( __dirname, "node_modules", "proj4leaflet", "src", "proj4leaflet.js"),
                sortable : path.resolve( __dirname, "node_modules", "sortablejs", "Sortable.js"),
                // extension Leaflet pour le dessin
                "leaflet-draw" : path.resolve( __dirname, "node_modules", "leaflet-draw", "dist", "leaflet.draw-src.js")
            }
        },
        externals : {
            leaflet : {
                commonjs : "leaflet",
                commonjs2 : "leaflet",
                amd : "leaflet",
                root : "L"
            },
            request : {
                commonjs2 : "request",
                commonjs : "request",
                amd : "require"
            },
            xmldom : {
                commonjs2 : "xmldom",
                commonjs : "xmldom",
                amd : "require"
            }
        },
        devtool : (_production) ? false : "source-map",
        module : {
            rules : [{
                test : /\.js$/,
                include : [
                  path.join(__dirname, "src", "Common"),
                  path.join(__dirname, "src", "Leaflet")
                ],
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader",
                    options : {
                        presets : ["env"]
                    }
                }
            }]
        },
        plugins : [
            /** GESTION DU LOGGER */
            new DefineWebpackPlugin({
                __PRODUCTION__ : JSON.stringify(_production)
            })
        ]
    };
};
