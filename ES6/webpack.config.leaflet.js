/* global module, __dirname */

// -- modules
var fs      = require("fs");
var path    = require("path");
var webpack = require("webpack");
var header  = require("string-template");

// -- plugins
var DefineWebpackPlugin   = webpack.DefinePlugin;
var ExtractTextWebPackPlugin = require("extract-text-webpack-plugin");
var BannerWebPackPlugin   = webpack.BannerPlugin;
var UglifyJsWebPackPlugin = webpack.optimize.UglifyJsPlugin;

// -- variables
var date = new Date().toISOString().split("T")[0];
var pkg  = require(path.join(__dirname, "package.json"));

module.exports = env => {

    var production = (env) ? env.production : false;

    return {
        entry : [
            path.join(__dirname, "src", "Common", "Utils", "AutoLoadConfig"),
            path.join(__dirname, "src", "Leaflet", "CSS"),
            path.join(__dirname, "src", "Leaflet", "GpPluginLeaflet")
        ],
        output : {
            path : path.join(__dirname, "dist", "leaflet"),
            filename : (production) ? "GpPluginLeaflet.js" : "GpPluginLeaflet-src.js",
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
                // plugin Leaflet pour le dessin
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
        devtool : (production) ? false : "source-map",
        module : {
            rules : [
              {
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
            },
            {
                test : require.resolve("proj4"),
                use : [{
                    loader : "expose-loader",
                    options : "proj4"
                }]
            },
            {
                test : /\.css$/,
                include : [
                    path.join(__dirname, "res", "Common"),
                    path.join(__dirname, "res", "Leaflet")
                ],
                use : ExtractTextWebPackPlugin.extract({
                    fallback : {
                        loader : "style-loader",
                        options : {
                            sourceMap : false
                        }
                    },
                    use : {
                        loader : "css-loader",
                        options : {
                            sourceMap : true
                        }
                    }
                })
            },
            {
                test : /\.(png|jpg|gif|svg)$/,
                loader : "url-loader"
            }
          ]
        },
        plugins : [
            /** GESTION DU LOGGER */
            new DefineWebpackPlugin({
                __PRODUCTION__ : JSON.stringify(production)
            }),
            /** CSS / IMAGES */
            new ExtractTextWebPackPlugin((production) ? "GpPluginLeaflet.css" : "GpPluginLeaflet-src.css")
        ]
        /** MINIFICATION */
        .concat(
            (production) ? [
                new UglifyJsWebPackPlugin({
                    output : {
                        comments : false,
                        beautify : false
                    },
                    uglifyOptions : {
                        mangle : true,
                        warnings : false,
                        compress : false
                    }
                })] : []
        )
        /** AJOUT DES LICENCES */
        .concat([
            new BannerWebPackPlugin({
                banner : fs.readFileSync(path.join(__dirname, "licences", "licence-proj4js.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : fs.readFileSync(path.join(__dirname, "licences", "licence-es6promise.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : fs.readFileSync(path.join(__dirname, "licences", "licence-sortable.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : fs.readFileSync(path.join(__dirname, "licences", "licence-plugin-leaflet-draw.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : fs.readFileSync(path.join(__dirname, "licences", "licence-proj4leaflet.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(__dirname, "licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : pkg.leafletExtName,
                    __VERSION__ : pkg.leafletExtVersion,
                    __DATE__ : date
                }),
                raw : true,
                entryOnly : true
            })
        ])
    };
};
