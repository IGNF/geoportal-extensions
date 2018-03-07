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
            path.join(__dirname, "src", "OpenLayers", "CSS"),
            path.join(__dirname, "src", "OpenLayers", "GpPluginOpenLayers")
        ],
        output : {
            path : path.join(__dirname, "dist", "openlayers"),
            filename : (production) ? "GpPluginOpenLayers.js" : "GpPluginOpenLayers-src.js",
            library : "Gp",
            libraryTarget : "umd",
            libraryExport : "default",
            umdNamedDefine : true
        },
        resolve : {
            alias : {
                proj4 : path.resolve( __dirname, "node_modules", "proj4", "dist", "proj4-src.js"),
                gp : path.resolve( __dirname, "node_modules", "geoportal-access-lib", "dist", "GpServices-src.js"),
                sortable : path.resolve( __dirname, "node_modules", "sortablejs", "Sortable.js")
            }
        },
        externals : {
            ol : {
                commonjs : "openlayers",
                commonjs2 : "openlayers",
                amd : "ol",
                root : "ol"
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
                  path.join(__dirname, "src", "OpenLayers")
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
                    path.join(__dirname, "res", "OpenLayers")
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
            new ExtractTextWebPackPlugin((production) ? "GpPluginOpenLayers.css" : "GpPluginOpenLayers-src.css")
        ]
        /** MINIFICATION */
        .concat(
            (production) ? [
                new UglifyJsWebPackPlugin({
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
                banner : fs.readFileSync(path.join(__dirname, "licences", "licence-sortable.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(__dirname, "licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : pkg.olExtName,
                    __VERSION__ : pkg.olExtVersion,
                    __DATE__ : date
                }),
                raw : true,
                entryOnly : true
            })
        ])
    };
};
