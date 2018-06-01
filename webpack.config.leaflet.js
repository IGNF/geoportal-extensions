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
var UglifyJsWebPackPlugin = webpack.optimize.UglifyJsPlugin;
var JsDocWebPackPlugin = require("jsdoc-webpack-plugin");
var HandlebarsPlugin = require("./scripts/webpackPlugins/handlebars-plugin");
var HandlebarsLayoutPlugin = require("handlebars-layouts");
var CopyWebpackPlugin = require("copy-webpack-plugin");

// -- variables
var date = new Date().toISOString().split("T")[0];
var pkg = require(path.join(__dirname, "package.json"));

module.exports = env => {
    // environnement d'execution
    var production = (env) ? env.production : false;

    return {
        entry : path.join(__dirname, "src", "Leaflet", "GpPluginLeaflet"),
        output : {
            path : path.join(__dirname, "dist", "leaflet"),
            filename : (production) ? "GpPluginLeaflet.js" : "GpPluginLeaflet-src.js",
            library : "Gp",
            libraryTarget : "umd",
            umdNamedDefine : true
        },
        resolve : {
            alias : {
                gp : path.resolve(__dirname, "node_modules", "geoportal-access-lib", "dist", (production) ? "GpServices.js" : "GpServices-src.js"),
                proj4 : path.resolve(__dirname, "node_modules", "proj4", "dist", (production) ? "proj4.js" : "proj4-src.js"),
                sortable : path.resolve(__dirname, "node_modules", "sortablejs", (production) ? "Sortable.min.js" : "Sortable.js"),
                // plugin Leaflet pour le dessin
                "leaflet-draw" : path.resolve(__dirname, "node_modules", "leaflet-draw", "dist", (production) ? "leaflet.draw.js" : "leaflet.draw-src.js")
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
        devtool : (production) ? false : "eval-source-map",
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
                    test : /\.js$/,
                    enforce : "pre",
                    include : [
                        path.join(__dirname, "src", "Common"),
                        path.join(__dirname, "src", "Leaflet")
                    ],
                    exclude : [
                        /node_modules/,
                        path.resolve(__dirname, "src", "Leaflet", "CSS"),
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
                        path.join(__dirname, "res", "Common"),
                        path.join(__dirname, "res", "Leaflet"),
                        path.join(__dirname, "node_modules/leaflet-draw/dist/")
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
            /** GESTION DU LOGGER */
            new DefineWebpackPlugin({
                __PRODUCTION__ : JSON.stringify(production)
            }),
            /** GENERATION DE LA JSDOC */
            new JsDocWebPackPlugin({
                conf : path.join(__dirname, "doc/jsdoc-leaflet.json")
            }),
            /** CSS / IMAGES */
            new ExtractTextWebPackPlugin((production) ? "GpPluginLeaflet.css" : "GpPluginLeaflet-src.css"),
            /** HANDLEBARS TEMPLATES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(__dirname, "samples-src", "pages", "leaflet"),
                        pattern : "**/*.html"
                    },
                    output : {
                        path : path.join(__dirname, "samples", "leaflet"),
                        flatten : false,
                        filename : (production) ? "[name].html" : "[name]-src.html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(__dirname, "samples-src", "templates", "leaflet", "*.hbs"),
                        path.join(__dirname, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(__dirname, "samples-src", "templates", "partials", "leaflet", "*.hbs")
                    ],
                    context : [
                        path.join(__dirname, "samples-src", "config.json"),
                        {
                            mode : (production) ? "" : "-src"
                        }
                    ]
                }
            ),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin(
                {
                    entry : path.join(__dirname, "samples-src", "pages", "index-leaflet.html"),
                    output : {
                        path : path.join(__dirname, "samples"),
                        filename : (production) ? "[name].html" : "[name]-src.html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(__dirname, "samples-src", "pages", "leaflet");
                            var list = glob.sync(path.join(root, "**", "*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("leaflet", pathObj.dir, pathObj.name.concat((production) ? "" : "-src").concat(pathObj.ext)),
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
