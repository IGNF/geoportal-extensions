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
var ReplaceWebpackPlugin = require("replace-bundle-webpack-plugin");
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
        entry : [
            path.join(__dirname, "src", "Common", "Utils", "AutoLoadConfig"),
            path.join(__dirname, "src", "Itowns", "CSS"),
            path.join(__dirname, "src", "Itowns", "GpPluginItowns")
        ],
        output : {
            path : path.join(__dirname, "dist", "itowns"),
            filename : (production) ? "GpPluginItowns.js" : "GpPluginItowns-src.js",
            library : "Gp",
            libraryTarget : "umd",
            libraryExport : "default",
            umdNamedDefine : true
        },
        resolve : {
            alias : {
                proj4 : path.resolve(__dirname, "node_modules", "proj4", "dist", "proj4-src.js"),
                gp : path.resolve(__dirname, "node_modules", "geoportal-access-lib", "dist", "GpServices-src.js"),
                sortable : path.resolve(__dirname, "node_modules", "sortablejs", "Sortable.js")
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
        devtool : (production) ? false : "source-map",
        module : {
            rules : [
                {
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
                },
                // {
                //     test : /\.js$/,
                //     enforce : "pre",
                //     include : [
                //         path.join(__dirname, "src", "Common"),
                //         path.join(__dirname, "src", "Itowns")
                //     ],
                //     exclude : /node_modules/,
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
                    test : /\.css$/,
                    include : [
                        path.join(__dirname, "res", "Common"),
                        path.join(__dirname, "res", "Itowns")
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
                                sourceMap : true, // FIXME ?
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
                        partten : /__GPITOWNSEXTVERSION__/g,
                        /** replacement de la clef __GPVERSION__ par la version du package */
                        replacement : function () {
                            return pkg.itownsExtVersion;
                        }
                    },
                    {
                        partten : /__GPDATE__/g,
                        /** replacement de la clef __GPDATE__ par la date du build */
                        replacement : function () {
                            return date;
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
                conf : path.join(__dirname, "doc/jsdoc-itowns.json")
            }),
            /** CSS / IMAGES */
            new ExtractTextWebPackPlugin((production) ? "GpPluginItowns.css" : "GpPluginItowns-src.css"),
            /** HANDLEBARS TEMPLATES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(__dirname, "samples-src", "pages", "itowns"),
                        pattern : "**/*.html"
                    },
                    output : {
                        path : path.join(__dirname, "samples", "itowns"),
                        flatten : false,
                        filename : (production) ? "[name].html" : "[name]-src.html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(__dirname, "samples-src", "templates", "itowns", "*.hbs"),
                        path.join(__dirname, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(__dirname, "samples-src", "templates", "partials", "itowns", "*.hbs")
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
                    entry : path.join(__dirname, "samples-src", "pages", "index-itowns.html"),
                    output : {
                        path : path.join(__dirname, "samples"),
                        filename : (production) ? "[name].html" : "[name]-src.html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(__dirname, "samples-src", "pages", "itowns");
                            var list = glob.sync(path.join(root, "**", "*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("itowns", pathObj.dir, pathObj.name.concat((production) ? "" : "-src").concat(pathObj.ext)),
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
                banner : header(fs.readFileSync(path.join(__dirname, "licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : pkg.itownsExtName,
                    __VERSION__ : pkg.itownsExtVersion,
                    __DATE__ : date
                }),
                raw : true,
                entryOnly : true
            })
        ])
    };
};
