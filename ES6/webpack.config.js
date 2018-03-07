/* global module, __dirname */

// -- modules
var fs      = require("fs");
var path    = require("path");
var webpack = require("webpack");
var merge   = require("webpack-merge");
var header  = require("string-template");

// -- plugins
var DefineWebpackPlugin   = webpack.DefinePlugin;
var BannerWebPackPlugin   = webpack.BannerPlugin;
var ExtractTextWebPackPlugin = require("extract-text-webpack-plugin");

// -- variables globales (par defaut)
var date    = new Date().toISOString().split("T")[0];
var pkg     = require(path.join(__dirname, "package.json"));
var version = pkg.olExtVersion; // par defaut OpenLayers
var brief   = pkg.olExtName;    // par defaut OpenLayers

module.exports = env => {

    // -- options
    // ex. webpack --env.production
    //      true, minification du bundle
    //      sinon, par defaut, false en mode source.
    var production = (env) ? env.production : false;

    // -- library
    var leaflet = (env) ? env.leaflet : false;
    var openlayers = (env) ? env.openlayers : false;
    var itowns = (env) ? env.itowns : false;

    // -- option par defaut OpenLayers
    if (!openlayers && !leaflet && !itowns) {
        openlayers = true;
    }

    // -- variables
    var projectName = (openlayers) ?
        "OpenLayers" : (leaflet) ?
            "Leaflet" : (itowns) ?
                "Itowns" : null;

    var bundleName = (openlayers) ?
        "GpPluginOpenLayers" : (leaflet) ?
            "GpPluginLeaflet" : (itowns) ?
                "GpPluginItowns" : null;

    // -- config
    var config = {
        entry : [
            path.join(__dirname, "src", "Common", "Utils", "AutoLoadConfig"),
            path.join(__dirname, "src", projectName, "CSS"),
            path.join(__dirname, "src", projectName, bundleName)
        ],
        output : {
            path : path.join(__dirname, "dist", projectName.toLowerCase()),
            filename : (production) ? bundleName + ".js" : bundleName + "-src.js",
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
                  path.join(__dirname, "src", projectName)
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
                    path.join(__dirname, "res", projectName)
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
            /* CSS / IMAGES */
            new ExtractTextWebPackPlugin((production) ? bundleName + ".css" : bundleName + "-src.css"),
            /** AJOUT DES LICENCES */
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
            })
        ].concat(
            (leaflet) ? [
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(__dirname, "licences", "licence-plugin-leaflet-draw.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(__dirname, "licences", "licence-proj4leaflet.txt"), "utf8"),
                    raw : true
                })
            ] : []
        ).concat([
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(__dirname, "licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : (openlayers) ? pkg.olExtName : (leaflet) ?  pkg.leafletExtName : (itowns) ? pkg.itownsExtName : brief,
                    __VERSION__ : (openlayers) ? pkg.olExtVersion : (leaflet) ?  pkg.leafletExtVersion : (itowns) ? pkg.itownsExtVersion : version,
                    __DATE__ : date
                }),
                raw : true,
                entryOnly : true
            })
        ])
    };

    // -- config ajout externals
    config.externals[(openlayers) ? "ol" : (leaflet) ? "leaflet" : (itowns) ? "itowns" : null] =
    (openlayers) ? {
        commonjs : "openlayers",
        commonjs2 : "openlayers",
        amd : "ol",
        root : "ol"
    } : (leaflet) ?  {
        commonjs : "leaflet",
        commonjs2 : "leaflet",
        amd : "leaflet",
        root : "L"
    } : (itowns) ? {
        commonjs2 : "itowns",
        commonjs : "itowns",
        amd : "itowns",
        root : "itowns"
    } : null;

    return config;
};
