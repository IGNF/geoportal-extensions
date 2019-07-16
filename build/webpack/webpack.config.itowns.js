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
    // environnement d'execution
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
        entry : { "GpPluginItowns" : path.join(ROOT, "src", "Itowns", "index.js")},
        output : {
            path : path.join(ROOT, "dist", "itowns"),
            filename : "[name]" + suffix + ".js",
            library : "Gp",
            libraryTarget : "umd",
            umdNamedDefine : true
        },
        resolve : {
            alias : {
                // "geoportal-access-lib",
                // "loglevel",
                // "es6-promise",
                // "sortablejs",
                // "itowns" : path.resolve(ROOT, "node_modules", "itowns", "lib"),
                "proj4" : path.resolve(ROOT, "node_modules", "proj4", "dist", /* (production) ? "proj4.js" : */ "proj4-src.js")
            }
        },
        externals : [
            // function(context, request, callback) {
            //     if (/^itowns$/.test(request)) {
            //         console.log("#### OUT : ", request);
            //         return callback(null, "itowns");
            //     }
            //     console.log("#### NULL : ", request);
            //     callback();
            // },
            // {
            //     "itowns/Core/Prefab/GlobeView" : "itowns.GlobeView",
            //     "itowns/Core/Prefab/GlobeView.GLOBE_VIEW_EVENTS" : "itowns.GLOBE_VIEW_EVENTS",
            //     "itowns/Core/Geographic/Coordinates" : "itowns.Coordinates",
            //     "itowns/Renderer/ColorLayersOrdering" : "itowns.ColorLayersOrdering", 
            //     "itowns/Utils/FeaturesUtils" : "itowns.FeaturesUtils",
            //     "itowns/Core/MainLoop.MAIN_LOOP_EVENTS" : "itowns.MAIN_LOOP_EVENTS",
            //     "itowns/Controls/GlobeControls.CONTROL_EVENTS" : "itowns.CONTROL_EVENTS",
            //     "itowns/Core/View.VIEW_EVENTS" : "itowns.VIEW_EVENTS",
            //     "itowns/Core/Geographic/Extent" : "itowns.Extent",
            //     "itowns/Source/WMTSSource" : "itowns.WMTSSource",
            //     "itowns/Layer/ColorLayer" : "itowns.ColorLayer",
            //     "itowns/Layer/ElevationLayer" : "itowns.ElevationLayer"
            // },
            {
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
            // publicPath : "/dist/itowns/",
            // openPage : "/samples/index-itowns-map.html",
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
                            // FIXME avec les banner !
                            comments: "some",
                            // drop_console: true
                        },
                        mangle: true
                    }
                }),
                new OptimizeCSSAssetsWebPackPlugin({})
            ],
            /** EXTRACT CSS INTO SINGLE FILE */
            splitChunks : {
                cacheGroups : {
                    styles : {
                        name : "GpPluginItowns",
                        test : /\.css$/,
                        chunks : "all",
                        enforce : true
                    }
                }
            }
        },
        module : {
            rules : [
                {
                    test : /\.js$/,
                    include : [
                        path.join(ROOT, "src", "Common"),
                        path.join(ROOT, "src", "Itowns")
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
                        path.join(ROOT, "src", "Itowns")
                    ],
                    exclude : [
                        /node_modules/,
                        path.resolve(ROOT, "src", "Itowns", "CSS"),
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
                    test : /\.css$/,
                    include : [
                        path.join(ROOT, "src", "Common", "CSS"),
                        path.join(ROOT, "src", "Itowns", "CSS")
                    ],
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
                },
                {
                    test : require.resolve("proj4"),
                    use : [
                        {
                            loader : "expose-loader",
                            options : "proj4"
                        }
                    ]
                }
            ]
        },
        plugins : [
            /** REPLACEMENT DE VALEURS */
            new ReplaceWebpackPlugin(
                [
                    {
                        partten : /__GPITOWNSEXTVERSION__/g,
                        /** replacement de la clef __VERSION__ par la version du package */
                        replacement : function () {
                            return pkg.itownsExtVersion;
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
                conf : path.join(ROOT, "build/jsdoc/jsdoc-itowns.json")
            }),
            /** CSS / IMAGES */
            new MiniCssExtractPlugin({
                filename : "[name]" + suffix + ".css"
            }),
            /** HANDLEBARS TEMPLATES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(ROOT, "samples-src", "pages", "itowns"),
                        pattern : "**/*.html"
                    },
                    output : {
                        path : path.join(ROOT, "samples", "itowns"),
                        flatten : false,
                        filename : "[name]" + suffix + ".html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(ROOT, "samples-src", "templates", "itowns", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "itowns", "*.hbs")
                    ],
                    context : [
                        path.join(ROOT, "samples-src", "config-itowns.json"),
                        {
                            mode : suffix
                        }
                    ]
                }
            ),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin(
                {
                    entry : path.join(ROOT, "samples-src", "pages", "index-itowns.html"),
                    output : {
                        path : path.join(ROOT, "samples"),
                        filename : "[name]" + suffix + ".html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(ROOT, "samples-src", "pages", "itowns");
                            var list = glob.sync(path.join(root, "**", "*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("itowns", pathObj.dir, pathObj.name.concat(suffix).concat(pathObj.ext)),
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
            ])
        ]
        /** AJOUT DES LICENCES */
        .concat([
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-proj4js.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["proj4"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-es6promise.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-sortablejs.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["sortablejs"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : pkg.itownsExtName,
                    __VERSION__ : pkg.itownsExtVersion,
                    __DATE__ : pkg.date
                }),
                raw : true,
                entryOnly : true
            })
        ])
    });
};
