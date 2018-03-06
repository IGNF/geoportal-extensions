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
            path.join(__dirname, "src", "Itowns", "GpPluginItowns")
        ],
        output : {
            path : path.join(__dirname, "dist", "itowns"),
            filename : (_production) ? "GpPluginItowns.js" : "GpPluginItowns-src.js",
            library : "Gp",
            libraryTarget : "umd",
            libraryExport : "default",
            umdNamedDefine : true
        },
        resolve : {
            alias : {
                proj4 : path.resolve( __dirname, "node_modules", "proj4", "dist", "proj4-src.js"),
                gp : path.resolve( __dirname, "node_modules", "geoportal-access-lib", "dist", "GpServices-src.js"),
                sortable : path.resolve( __dirname, "node_modules", "sortablejs", "Sortable.js"),
                itowns : path.resolve( __dirname, "node_modules", "itowns", "dist", "itowns.js")
            }
        },
        externals : {
            itowns : {
                commonjs2 : "itowns",
                commonjs : "itowns",
                amd : "itowns",
                root : "itowns"
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
                  path.join(__dirname, "src", "Itowns")
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
