/* global module, __dirname */

// -- modules
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var header = require("string-template");
var glob = require("glob");

// -- plugins
var DefineWebpackPlugin = webpack.DefinePlugin;
var ExtractTextWebPackPlugin = require("extract-text-webpack-plugin");
var BannerWebPackPlugin = webpack.BannerPlugin;
// FIXME use uglifyjs-webpack-plugin@1.3.0 for webpack@3
//  cf. https://github.com/joeeames/WebpackFundamentalsCourse/issues/3
//  cf. https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/360
//  var UglifyJsWebPackPlugin = webpack.optimize.UglifyJsPlugin
var UglifyJsWebPackPlugin = require("uglifyjs-webpack-plugin");
var JsDocWebPackPlugin = require("jsdoc-webpack-plugin");
var HandlebarsPlugin = require("./scripts/webpackPlugins/handlebars-plugin");
var HandlebarsLayoutPlugin = require("handlebars-layouts");
var CopyWebpackPlugin = require("copy-webpack-plugin");

// -- performances
var SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
var smp = new SpeedMeasurePlugin();

// -- variables
var date = new Date().toISOString().split("T")[0];
var pkg = require(path.join(__dirname, "package.json"));

module.exports = env => {
    // environnement d'execution
    var production = (env) ? env.production : false;
    var development = (env) ? env.development : false;

    var _mode = (production) ? "" : (development) ? "-map" : "-src";

    return smp.wrap({
        entry : {
            // controles
            "Drawing" : path.join(__dirname, "src", "OpenLayers", "Controls", "Drawing.js"),
            "Editor" : path.join(__dirname, "src", "OpenLayers", "Controls", "Editor.js"),
            "ElevationPath" : path.join(__dirname, "src", "OpenLayers", "Controls", "ElevationPath.js"),
            "GetFeatureInfo" : path.join(__dirname, "src", "OpenLayers", "Controls", "GetFeatureInfo.js"),
            "Isocurve" : path.join(__dirname, "src", "OpenLayers", "Controls", "Isocurve.js"),
            "LayerImport" : path.join(__dirname, "src", "OpenLayers", "Controls", "LayerImport.js"),
            "LayerSwitcher" : path.join(__dirname, "src", "OpenLayers", "Controls", "LayerSwitcher.js"),
            "LocationSelector" : path.join(__dirname, "src", "OpenLayers", "Controls", "LocationSelector.js"),
            "GeoportalMousePosition" : path.join(__dirname, "src", "OpenLayers", "Controls", "MousePosition.js"),
            "GeoportalAttribution" : path.join(__dirname, "src", "OpenLayers", "Controls", "GeoportalAttribution.js"),
            "ReverseGeocode" : path.join(__dirname, "src", "OpenLayers", "Controls", "ReverseGeocode.js"),
            "Route" : path.join(__dirname, "src", "OpenLayers", "Controls", "Route.js"),
            "SearchEngine" : path.join(__dirname, "src", "OpenLayers", "Controls", "SearchEngine.js"),
            "MeasureArea" : path.join(__dirname, "src", "OpenLayers", "Controls", "Measures", "MeasureArea.js"),
            "MeasureAzimuth" : path.join(__dirname, "src", "OpenLayers", "Controls", "Measures", "MeasureAzimuth.js"),
            "MeasureLength" : path.join(__dirname, "src", "OpenLayers", "Controls", "Measures", "MeasureLength.js"),
            // other
            "KMLExtended" : path.join(__dirname, "src", "OpenLayers", "Formats", "KML.js"),
            "WMTSExtended" : path.join(__dirname, "src", "OpenLayers", "Sources", "WMTS.js"),
            "GeoportalLayerWMS" : path.join(__dirname, "src", "OpenLayers", "Layers", "LayerWMS.js"),
            "GeoportalLayerWMTS" : path.join(__dirname, "src", "OpenLayers", "Layers", "LayerWMTS.js"),
            "GeoportalSourceWMS" : path.join(__dirname, "src", "OpenLayers", "Layers", "SourceWMS.js"),
            "GeoportalSourceWMTS" : path.join(__dirname, "src", "OpenLayers", "Layers", "SourceWMTS.js"),
            // projections
            "CRS" : path.join(__dirname, "src", "Common", "Utils", "AutoLoadCRS.js"),
        },
        output : {
            path : path.join(__dirname, "dist", "openlayers", "modules"),
            filename : "[name]" + _mode + ".js",
            libraryExport : 'default',
            libraryTarget : 'assign',
            library : "[name]"
        },
        resolve : {
            alias : {
                // ol : path.resolve(__dirname, "node_modules", "ol", "index.js"),
                olms : path.resolve(__dirname, "node_modules", "ol-mapbox-style", "olms.js"),
                gp : path.resolve(__dirname, "node_modules", "geoportal-access-lib", "dist", (production) ? "GpServices.js" : "GpServices-src.js"),
                proj4 : path.resolve(__dirname, "node_modules", "proj4", "dist", (production) ? "proj4.js" : "proj4-src.js"),
                sortable : path.resolve(__dirname, "node_modules", "sortablejs", (production) ? "Sortable.min.js" : "Sortable.js"),
                eventbus : path.resolve(__dirname, "node_modules", "eventbusjs", (production) ? "lib" : "src", (production) ? "eventbus.min.js" : "EventBus.js")
            }
        },
        externals : [
            function(context, request, callback) {
                if (/^ol\/.+$/.test(request)) {
                    // hack with method 'inherits' !?
                    if (request === "ol/util") {
                        return callback(null, "ol");
                    }
                    // transform "ol/control/Control" to "ol.control.Control"
                    const replacedWith = request.replace(/\//g, '.');
                    return callback(null, replacedWith);
                }
                callback();
            },
            {
            //     ol : {
            //         commonjs : "ol",
            //         commonjs2 : "ol",
            //         amd : "ol",
            //         root : "ol"
            //     },
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
            }
        ],
        devtool : (development) ? "eval-source-map" : false,
        module : {
            rules : [
                // {
                //     test : /\.js$/,
                //     include : [
                //         path.join(__dirname, "src", "Common"),
                //         path.join(__dirname, "src", "OpenLayers")
                //     ],
                //     exclude : /node_modules/,
                //     use : {
                //         loader : "babel-loader",
                //         options : {
                //             presets : ["env"]
                //         }
                //     }
                // },
                // {
                //     test : /\.js$/,
                //     enforce : "pre",
                //     include : [
                //         path.join(__dirname, "src", "Common"),
                //         path.join(__dirname, "src", "OpenLayers")
                //     ],
                //     exclude : [
                //         /node_modules/,
                //         path.resolve(__dirname, "src", "OpenLayers", "CSS"),
                //     ],
                //     use : [
                //         {
                //             loader : "eslint-loader",
                //             options : {
                //                 emitWarning : true
                //             }
                //         }
                //     ]
                // },
                {
                    test : require.resolve("proj4"),
                    use : [{
                        loader : "expose-loader",
                        options : "proj4"
                    }]
                },
                {
                    test : path.resolve(__dirname, "node_modules", "ol-mapbox-style", "dist", "olms.js"),
                    use : "exports-loader?olms"
                },
                {
                    test : /\.css$/,
                    include : [
                        path.join(__dirname, "res", "Common"),
                        path.join(__dirname, "res", "OpenLayers")
                    ],
                    exclude : /node_modules/,
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
                                sourceMap : false, // FIXME ?
                                minimize : (production) ? true : false
                            }
                        }
                    })
                },
                {
                    test : /\.(png|jpg|gif|svg)$/,
                    loader : "url-loader",
                    exclude : /node_modules/
                }
            ]
        },
        plugins : [
            /** GESTION DU LOGGER */
            new DefineWebpackPlugin({
                __PRODUCTION__ : JSON.stringify(production)
            }),
            /** GENERATION DE LA JSDOC */
            // new JsDocWebPackPlugin({
            //     conf : path.join(__dirname, "doc/jsdoc-openlayers.json")
            // }),
            /** CSS / IMAGES */
            new ExtractTextWebPackPlugin("[name]" + _mode + ".css"),
            /** HANDLEBARS TEMPLATES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(__dirname, "samples-src", "pages", "openlayers"),
                        pattern : "**/*-modules-*.html"
                    },
                    output : {
                        path : path.join(__dirname, "samples", "openlayers"),
                        flatten : false,
                        filename : "[name]" + _mode + ".html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(__dirname, "samples-src", "templates", "openlayers", "*.hbs"),
                        path.join(__dirname, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(__dirname, "samples-src", "templates", "partials", "openlayers", "*.hbs")
                    ],
                    context : [
                        path.join(__dirname, "samples-src", "config.json"),
                        {
                            mode : _mode,
                            debug : (production) ? "" : "-debug"
                        }
                    ]
                }
            ),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin(
                {
                    entry : path.join(__dirname, "samples-src", "pages", "index-openlayers.html"),
                    output : {
                        path : path.join(__dirname, "samples"),
                        filename : "[name]" + _mode + "-modules.html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(__dirname, "samples-src", "pages", "openlayers");
                            var list = glob.sync(path.join(root, "**", "*-modules-*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("openlayers", pathObj.dir, pathObj.name.concat(_mode).concat(pathObj.ext)),
                                    label : label
                                };
                            });
                            return list;
                        }
                    }
                }
            ),
            /* RESOURCES COPY FOR SAMPLES */
            new CopyWebpackPlugin([
                {
                    from : path.join(__dirname, "samples-src", "resources", "**/*"),
                    to : path.join(__dirname, "samples", "resources"),
                    context : path.join(__dirname, "samples-src", "resources")
                }
            ])
        ]
            /** MINIFICATION */
            .concat(
                (production) ? [
                    new UglifyJsWebPackPlugin({
                        uglifyOptions : {
                            output : {
                                comments : false,
                                beautify : false
                            },
                            mangle : true,
                            warnings : false,
                            compress : {}
                        }
                    })
                ] : []
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
                    banner : header(fs.readFileSync(path.join(__dirname, "licences", "licence-ign.tmpl"), "utf8"), {
                        __BRIEF__ : pkg.olExtName,
                        __VERSION__ : pkg.olExtVersion,
                        __DATE__ : date
                    }),
                    raw : true,
                    entryOnly : true
                })
            ])
    });
};
