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
var UglifyJsWebPackPlugin = require("uglifyjs-webpack-plugin");
// var UglifyJsWebPackPlugin = webpack.optimize.UglifyJsPlugin;
var ReplaceWebpackPlugin = require("replace-bundle-webpack-plugin");
var JsDocWebPackPlugin = require("jsdoc-webpack-plugin");
var HandlebarsPlugin = require("../scripts/webpackPlugins/handlebars-plugin");
var HandlebarsLayoutPlugin = require("handlebars-layouts");
var CopyWebpackPlugin = require("copy-webpack-plugin");

// -- performances
var SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
var smp = new SpeedMeasurePlugin();

// -- variables
var ROOT = path.join(__dirname, "../..");
var date = new Date().toISOString().split("T")[0];
var pkg = require(path.join(ROOT, "package.json"));

module.exports = env => {
    // environnement d'execution
    var production = (env) ? env.production : false;
    var development = (env) ? env.development : false;

    var _mode = (production) ? "" : (development) ? "-map" : "-src";

    return smp.wrap({
        entry : path.join(ROOT, "src", "Leaflet", "GpPluginLeaflet"),
        output : {
            path : path.join(ROOT, "dist", "leaflet"),
            filename : "GpPluginLeaflet" + _mode + ".js",
            library : "Gp",
            libraryTarget : "umd",
            umdNamedDefine : true
        },
        resolve : {
            alias : {
                "geoportal-access-lib" : path.resolve(ROOT, "node_modules", "geoportal-access-lib", "src", "Gp.js"),
                proj4 : path.resolve(ROOT, "node_modules", "proj4", "dist", /* (production) ? "proj4.js" : */ "proj4-src.js"),
                sortablejs : path.resolve(ROOT, "node_modules", "sortablejs", /* (production) ? "Sortable.min.js" : */ "Sortable.js"),
                // plugin Leaflet pour le dessin
                "leaflet-draw" : path.resolve(ROOT, "node_modules", "leaflet-draw", "dist", /* (production) ? "leaflet.draw.js" : */ "leaflet.draw-src.js")
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
        devtool : (development) ? "eval-source-map" : false,
        module : {
            rules : [
                {
                    test : /\.js$/,
                    include : [
                        path.join(ROOT, "src", "Common"),
                        path.join(ROOT, "src", "Leaflet")
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
                    test : /\.js$/,
                    enforce : "pre",
                    include : [
                        path.join(ROOT, "src", "Common"),
                        path.join(ROOT, "src", "Leaflet")
                    ],
                    exclude : [
                        /node_modules/,
                        path.resolve(ROOT, "src", "Leaflet", "CSS"),
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
                    test : require.resolve("proj4"),
                    use : [{
                        loader : "expose-loader",
                        options : "proj4"
                    }]
                },
                {
                    test : /\.css$/,
                    include : [
                        path.join(ROOT, "src", "Common", "CSS"),
                        path.join(ROOT, "src", "Leaflet", "CSS"),
                        path.join(ROOT, "node_modules/leaflet-draw/dist/")
                    ],
                    use : ExtractTextWebPackPlugin.extract({
                        fallback : {
                            loader : "style-loader",
                            options : {
                                // sourceMap : false // FIXME ?
                            }
                        },
                        use : {
                            loader : "css-loader",
                            options : {
                                // sourceMap : false, // FIXME ?
                                minimize : (production) ? true : false
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
            /** REPLACEMENT DE VALEURS */
            new ReplaceWebpackPlugin(
                [
                    {
                        partten : /__GPLEAFLETEXTVERSION__/g,
                        /** replacement de la clef __GPVERSION__ par la version du package */
                        replacement : function () {
                            return pkg.leafletExtVersion;
                        }
                    },
                    {
                        partten : /__GPDATE__/g,
                        /** replacement de la clef __GPDATE__ par la date du build */
                        replacement : function () {
                            return date;
                        }
                    },
                    {
                        partten : /__GPVERSION__/g,
                        /** replacement de la clef __GPVERSION__ par la version du package */
                        replacement : function () {
                            return pkg.dependencies["geoportal-access-lib"];
                        }
                    }
                ]
            ),
            /** GESTION DU LOGGER */
            new DefineWebpackPlugin({
                __PRODUCTION__ : JSON.stringify(production)
            }),
            /** GENERATION DE LA JSDOC */
            new JsDocWebPackPlugin({
                conf : path.join(ROOT, "build/jsdoc/jsdoc-leaflet.json")
            }),
            /** CSS / IMAGES */
            new ExtractTextWebPackPlugin("GpPluginLeaflet" + _mode + ".css"),
            /** HANDLEBARS TEMPLATES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(ROOT, "samples-src", "pages", "leaflet"),
                        pattern : "**/*.html"
                    },
                    output : {
                        path : path.join(ROOT, "samples", "leaflet"),
                        flatten : false,
                        filename : "[name]" + _mode + ".html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(ROOT, "samples-src", "templates", "leaflet", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "leaflet", "*.hbs")
                    ],
                    context : [
                        path.join(ROOT, "samples-src", "config.json"),
                        {
                            mode : _mode,
                            debug : (production) ? "" : "-src"
                        }
                    ]
                }
            ),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin(
                {
                    entry : path.join(ROOT, "samples-src", "pages", "index-leaflet.html"),
                    output : {
                        path : path.join(ROOT, "samples"),
                        filename : "[name]" + _mode + ".html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(ROOT, "samples-src", "pages", "leaflet");
                            var list = glob.sync(path.join(root, "**", "*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("leaflet", pathObj.dir, pathObj.name.concat(_mode).concat(pathObj.ext)),
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
                            compress : false
                        }
                    })] : []
            )
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
                    banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-sortable.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-plugin-leaflet-draw.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-proj4leaflet.txt"), "utf8"),
                    raw : true
                }),
                new BannerWebPackPlugin({
                    banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-ign.tmpl"), "utf8"), {
                        __BRIEF__ : pkg.leafletExtName,
                        __VERSION__ : pkg.leafletExtVersion,
                        __DATE__ : date
                    }),
                    raw : true,
                    entryOnly : true
                })
            ])
    });
};
