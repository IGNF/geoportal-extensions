/* global module, __dirname */

// -- modules
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var header = require("string-template");
var glob = require("glob");

// -- plugins
var DefineWebpackPlugin = webpack.DefinePlugin;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var BannerWebPackPlugin = webpack.BannerPlugin;
var TerserJsWebPackPlugin = require("terser-webpack-plugin");
var OptimizeCSSAssetsWebPackPlugin = require("optimize-css-assets-webpack-plugin");
var ReplaceWebpackPlugin = require("replace-bundle-webpack-plugin");
var JsDocWebPackPlugin = require("../scripts/webpackPlugins/jsdoc-plugin");
var HandlebarsPlugin = require("../scripts/webpackPlugins/handlebars-plugin");
var HandlebarsLayoutPlugin = require("handlebars-layouts");
var CopyWebpackPlugin = require("copy-webpack-plugin");

// -- performances
var SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
var smp = new SpeedMeasurePlugin();

// -- variables
var ROOT = path.join(__dirname, "../..");
var pkg = require(path.join(ROOT, "package.json"));

module.exports = (env, argv) => {
    // par defaut
    var devMode = false;
    var logMode = false;
    var suffix = "";
    if (argv.mode === "production") {
        suffix = "";
        logMode = false;
        devMode = false;
    }
    if (argv.mode === "development") {
        suffix = "-map";
        logMode = true;
        devMode = true;
    }
    if (argv.mode === "none") {
        suffix = "-src";
        logMode = true;
        devMode = false;
    }

    return smp.wrap({
        entry : {
            // CSS communes
            "Common" : [
                path.join(ROOT, "src", "Common", "Styles.js"),
                path.join(ROOT, "src", "OpenLayers", "Styles.js")
            ],
            // Controles
            "Drawing" : path.join(ROOT, "src", "OpenLayers", "Controls", "Drawing.js"),
            "Editor" : path.join(ROOT, "src", "OpenLayers", "Controls", "Editor.js"),
            "ElevationPath" : path.join(ROOT, "src", "OpenLayers", "Controls", "ElevationPath.js"),
            "GetFeatureInfo" : path.join(ROOT, "src", "OpenLayers", "Controls", "GetFeatureInfo.js"),
            "Isocurve" : path.join(ROOT, "src", "OpenLayers", "Controls", "Isocurve.js"),
            "LayerImport" : path.join(ROOT, "src", "OpenLayers", "Controls", "LayerImport.js"),
            "LayerSwitcher" : path.join(ROOT, "src", "OpenLayers", "Controls", "LayerSwitcher.js"),
            "LocationSelector" : path.join(ROOT, "src", "OpenLayers", "Controls", "LocationSelector.js"),
            "GeoportalMousePosition" : path.join(ROOT, "src", "OpenLayers", "Controls", "MousePosition.js"),
            "GeoportalAttribution" : path.join(ROOT, "src", "OpenLayers", "Controls", "GeoportalAttribution.js"),
            "ReverseGeocode" : path.join(ROOT, "src", "OpenLayers", "Controls", "ReverseGeocode.js"),
            "Route" : path.join(ROOT, "src", "OpenLayers", "Controls", "Route.js"),
            "SearchEngine" : path.join(ROOT, "src", "OpenLayers", "Controls", "SearchEngine.js"),
            "MeasureArea" : path.join(ROOT, "src", "OpenLayers", "Controls", "Measures", "MeasureArea.js"),
            "MeasureAzimuth" : path.join(ROOT, "src", "OpenLayers", "Controls", "Measures", "MeasureAzimuth.js"),
            "MeasureLength" : path.join(ROOT, "src", "OpenLayers", "Controls", "Measures", "MeasureLength.js"),
            // Formats/Couches
            "KMLExtended" : path.join(ROOT, "src", "OpenLayers", "Formats", "KML.js"),
            "WMTSExtended" : path.join(ROOT, "src", "OpenLayers", "Sources", "WMTS.js"),
            "GeoportalLayerWMS" : path.join(ROOT, "src", "OpenLayers", "Layers", "LayerWMS.js"),
            "GeoportalLayerWMTS" : path.join(ROOT, "src", "OpenLayers", "Layers", "LayerWMTS.js"),
            "GeoportalSourceWMS" : path.join(ROOT, "src", "OpenLayers", "Layers", "SourceWMS.js"),
            "GeoportalSourceWMTS" : path.join(ROOT, "src", "OpenLayers", "Layers", "SourceWMTS.js"),
            // Projections
            "CRS" : path.join(ROOT, "src", "OpenLayers", "CRS", "AutoLoadCRS.js"),
        },
        output : {
            path : path.join(ROOT, "dist", "openlayers", "modules"),
            filename : "[name]" + suffix + ".js",
            libraryExport : 'default',
            libraryTarget : 'assign',
            library : "[name]"
        },
        resolve : {
            alias : {
                proj4 : path.resolve(ROOT, "node_modules", "proj4", "dist", /* (production) ? "proj4.js" : */ "proj4-src.js")
            }
        },
        externals : [
            function(context, request, callback) {
                if (/^ol\/.+$/.test(request)) {
                    // liste des modules ES6 à garder dans le code...
                    if ([
                        "ol/events/Event",
                        "ol/events/EventType",
                        "ol/events",
                        "ol/obj",
                        "ol/render/canvas",
                        "ol/css",
                        "ol/dom",
                        "ol/transform",
                        "ol/asserts",
                        "ol/AssertionError",
                        "ol/util",
                        "ol/render/canvas/LabelCache",
                        "ol/structs/LRUCache",
                        "ol/events/Target",
                        "ol/Disposable",
                        "ol/functions"
                    ].includes(request)) {
                        // console.log("#### IN : ", request);
                        return callback();
                    }
                    // console.log("#### OUT : ", request);
                    const replacedWith = request.replace(/\//g, '.');
                    return callback(null, replacedWith);
                }
                // console.log("#### NULL : ", request);
                callback();
            },
            /**
            * FIXME
            * configuration uniquement valable en mode umd !?
            * mais à tester lors de l'import dans le SDK...
            */
            {
                ol : {
                    commonjs : "ol",
                    commonjs2 : "ol",
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
            }
        ],
        devtool : (devMode) ? "eval-source-map" : false,
        devServer : {
            // proxy: {
            //      "/samples/resources/proxy/" : {
            //          secure: false,
            //          target: "http://localhost/proxy/proxy.php" // proxy à deployer en local !
            //      }
            // },
            stats : "errors-only",
            // host : "localhost",
            // https: true,
            // port : 9001,
            // hot : true,
            // contentBase : path.join(__dirname),
            // publicPath : "/dist/openlayers/modules/",
            // openPage : "/samples/index-openlayers-modules-map.html",
            // open : "google-chrome",
            watchOptions : {
                watch : true,
                poll : true
            },
            overlay : {
                errors : true,
                warnings : false
            }
        },
        // stats : "none",
        optimization : {
            /** MINIFICATION */
            minimizer: [
                new TerserJsWebPackPlugin({
                    terserOptions: {
                        output: {
                            // FIXME supprime tous les commentaires
                            // mais aussi les banner !
                            comments: false,
                            // drop_console: true
                        },
                        mangle: true
                    }
                }),
                new OptimizeCSSAssetsWebPackPlugin({})
            ],
            /** EXTRACT CSS INTO SINGLE FILE */
            // splitChunks : {
            //     cacheGroups : {
            //         styles : {
            //             name : "GpPluginOpenLayers",
            //             test : /\.css$/,
            //             chunks : "all",
            //             enforce : true
            //         }
            //     }
            // }
        },
        module : {
            rules : [
                {
                    test : /\.js$/,
                    include : [
                        path.join(ROOT, "src", "Common"),
                        path.join(ROOT, "src", "OpenLayers")
                    ],
                    exclude : /node_modules/,
                    use : {
                        loader : "babel-loader",
                        options : {
                            presets : ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test : /\.js$/,
                    enforce : "pre",
                    include : [
                        path.join(ROOT, "src", "Common"),
                        path.join(ROOT, "src", "OpenLayers")
                    ],
                    exclude : [
                        /node_modules/,
                        path.resolve(ROOT, "src", "OpenLayers", "CSS"),
                        path.resolve(ROOT, "src", "Common", "CSS")
                    ],
                    use : [
                        {
                            loader : "eslint-loader",
                            options : {
                                emitWarning : true
                            }
                        }
                    ]
                },
                {
                    /** proj4 est exposé en global : proj4 ! */
                    test : require.resolve("proj4"),
                    use : [{
                        loader : "expose-loader",
                        options : "proj4"
                    }]
                },
                {
                    /** eventbusjs est exposé en global : eventbus !
                    * (require.resolve("eventbusjs"))
                    */
                    test : require.resolve("eventbusjs"),
                    use : [{
                        loader : "expose-loader",
                        options : "eventbus"
                    }]
                },
                {
                    /** ol-mapbox-style est exposé en global : olms !
                    * (require.resolve("ol-mapbox-style"))
                    */
                    test : /node_modules\/ol-mapbox-style\/dist\/olms\.js$/,
                    use : [{
                        loader : "exports-loader",
                        options : "olms"
                    }]
                },
                {
                    test : /\.css$/,
                    include : [
                        path.join(ROOT, "src", "Common", "CSS"),
                        path.join(ROOT, "src", "OpenLayers", "CSS")
                    ],
                    exclude : /node_modules/,
                    use : [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test : /\.(png|jpg|gif|svg)$/,
                    loader : "url-loader",
                    options: {
                        fallback : "responsive-loader",
                        quality : 100
                    },
                    exclude : /node_modules/
                }
            ]
        },
        plugins : [
            /** REPLACEMENT DE VALEURS */
            new ReplaceWebpackPlugin(
                [
                    {
                        partten : /__GPOLEXTVERSION__/g,
                        /** replacement de la clef __VERSION__ par la version du package */
                        replacement : function () {
                            return pkg.olExtVersion;
                        }
                    },
                    {
                        partten : /__DATE__/g,
                        /** replacement de la clef __DATE__ par la date du build */
                        replacement : function () {
                            return pkg.date;
                        }
                    }
                ]
            ),
            /** GESTION DU LOGGER */
            new DefineWebpackPlugin({
                __PRODUCTION__ : JSON.stringify(!logMode)
            }),
            /** GENERATION DE LA JSDOC */
            new JsDocWebPackPlugin({
                conf : path.join(ROOT, "build/jsdoc/jsdoc-openlayers.json")
            }),
            /** CSS / IMAGES */
            new MiniCssExtractPlugin({
                filename : "[name]" + suffix + ".css"
            }),
            /** HANDLEBARS TEMPLATES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(ROOT, "samples-src", "pages", "openlayers"),
                        pattern : "**/*-modules-*.html"
                    },
                    output : {
                        path : path.join(ROOT, "samples", "openlayers"),
                        flatten : false,
                        filename : "[name]" + suffix + ".html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(ROOT, "samples-src", "templates", "openlayers", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "openlayers", "*.hbs")
                    ],
                    context : [
                        path.join(ROOT, "samples-src", "config.json"),
                        {
                            mode : suffix,
                        }
                    ]
                }
            ),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin(
                {
                    entry : path.join(ROOT, "samples-src", "pages", "index-openlayers.html"),
                    output : {
                        path : path.join(ROOT, "samples"),
                        filename : "[name]" + "-modules" + suffix + ".html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(ROOT, "samples-src", "pages", "openlayers");
                            var list = glob.sync(path.join(root, "**", "*-modules-*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("openlayers", pathObj.dir, pathObj.name.concat(suffix).concat(pathObj.ext)),
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
                    from : path.join(ROOT, "samples-src", "resources", "**/*"),
                    to : path.join(ROOT, "samples", "resources"),
                    context : path.join(ROOT, "samples-src", "resources")
                }
            ]),
        ]
            /** AJOUT DES LICENCES */
            .concat([
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-proj4js.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-es6promise.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-eventbusjs.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-sortable.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-ign.tmpl"), "utf8"), {
                        __BRIEF__ : pkg.olExtName,
                        __VERSION__ : pkg.olExtVersion,
                        __DATE__ : pkg.date
                    }),
                    raw : true,
                    entryOnly : true
                })
            ])
    });
};
