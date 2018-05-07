/* global module, __dirname */
"use strict";

// -- modules
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var header = require("string-template");
var glob = require("glob");

// -- plugins
var DefineWebpackPlugin = webpack.DefinePlugin;
var BannerWebPackPlugin = webpack.BannerPlugin;
var ExtractTextWebPackPlugin = require("extract-text-webpack-plugin");
var UglifyJsWebPackPlugin = webpack.optimize.UglifyJsPlugin;
var JsDocWebPackPlugin = require("jsdoc-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var ReplaceWebpackPlugin = require("replace-bundle-webpack-plugin");
var HandlebarsPlugin = require("./scripts/webpackPlugins/handlebars-plugin");
var HandlebarsLayoutPlugin = require("handlebars-layouts");
var CopyWebpackPlugin = require("copy-webpack-plugin");

// -- variables globales (par defaut)
var date = new Date().toISOString().split("T")[0];
var pkg = require(path.join(__dirname, "package.json"));
var versionDefault = pkg.olExtVersion; // par defaut OpenLayers
var briefDefault = pkg.olExtName; // par defaut OpenLayer

module.exports = env => {
    // -- options
    // ex. webpack --env.production
    //      true, minification du bundle
    //      sinon, par defaut, false en mode source.
    var production = (env) ? env.production : false;

    // -- options : nettoyage des répertoires temporaires
    // ex. webpack --env.clean
    //      true, suppresion des répertoires dist, jsdoc et samples
    //      par defaut, false.
    var clean = (env) ? env.clean : false;

    // -- options library
    var leaflet = (env) ? env.leaflet : false;
    var openlayers = (env) ? env.ol : false;
    var itowns = (env) ? env.itowns : false;

    // -- option par defaut : OpenLayers
    if (!openlayers && !leaflet && !itowns) {
        openlayers = true;
    }

    // -- variables
    var projectName = (openlayers)
        ? "OpenLayers" : (leaflet)
            ? "Leaflet" : (itowns)
                ? "Itowns" : null;

    var bundleName = (openlayers)
        ? "GpPluginOpenLayers" : (leaflet)
            ? "GpPluginLeaflet" : (itowns)
                ? "GpPluginItowns" : null;

    var version = (openlayers)
        ? pkg.olExtVersion : (leaflet)
            ? pkg.leafletExtVersion : (itowns)
                ? pkg.itownsExtVersion : versionDefault;

    var brief = (openlayers)
        ? pkg.olExtName : (leaflet)
            ? pkg.leafletExtName : (itowns)
                ? pkg.itownsExtName : briefDefault;

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
                proj4 : path.resolve(__dirname, "node_modules", "proj4", "dist", "proj4-src.js"),
                gp : path.resolve(__dirname, "node_modules", "geoportal-access-lib", "dist", "GpServices-src.js"),
                sortable : path.resolve(__dirname, "node_modules", "sortablejs", "Sortable.js")
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
        devtool : (production) ? false : "eval-source-map",
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
                    test : /\.js$/,
                    enforce : "pre",
                    include : [
                        path.join(__dirname, "src", "Common"),
                        path.join(__dirname, "src", projectName)
                    ],
                    exclude : /node_modules/,
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
                        path.join(__dirname, "res", projectName)
                    ]
                        .concat(
                            (leaflet) ? path.join(__dirname, "node_modules/leaflet-draw/dist/") : []
                        ),
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
        plugins : []
            /** NETTOYAGE DES REPERTOIRES TEMPORAIRES */
            .concat(
                (clean) ? [
                    new CleanWebpackPlugin([
                        "dist",
                        "jsdoc",
                        "samples",
                        "tests"
                    ], {
                        verbose : true
                    })
                ] : []
            )
            /** REPLACEMENT DE VALEURS */
            /** GESTION DU LOGGER */
            /** GENERATION DE LA JSDOC */
            /** CSS / IMAGES */
            /** SAMPLES : HANDLEBARS TEMPLATES */
            /** SAMPLES : TEMPLATES INDEX */
            /** SAMPLES : RESOURCES COPY */
            .concat([
                new ReplaceWebpackPlugin(
                    [
                        {
                            partten : (openlayers)
                                ? /__GPOLEXTVERSION__/g : (leaflet)
                                    ? /__GPLEAFLETEXTVERSION__/g : (itowns)
                                        ? /__GPITOWNSEXTVERSION__/g : /__GPVERSION__/g,
                            /**
                            * replacement de la clef __GPVERSION__ par la version du package
                            * @returns {String} version
                            */
                            replacement : function () {
                                return version;
                            }
                        },
                        {
                            partten : /__GPDATE__/g,
                            /**
                            * replacement de la clef __GPDATE__ par la date du build
                            * @returns {String} date
                            */
                            replacement : function () {
                                return date;
                            }
                        }
                    ]
                ),
                new DefineWebpackPlugin({
                    __PRODUCTION__ : JSON.stringify(production)
                }),
                new JsDocWebPackPlugin({
                    conf : path.join(__dirname, "doc/jsdoc-" + projectName.toLowerCase() + ".json")
                }),
                new ExtractTextWebPackPlugin((production) ? bundleName + ".css" : bundleName + "-src.css"),
                new HandlebarsPlugin(
                    {
                        entry : {
                            path : path.join(__dirname, "samples-src", "pages", projectName.toLowerCase()),
                            pattern : "**/*.html"
                        },
                        output : {
                            path : path.join(__dirname, "samples", projectName.toLowerCase()),
                            flatten : false,
                            filename : (production) ? "[name].html" : "[name]-src.html"
                        },
                        helpers : [
                            HandlebarsLayoutPlugin
                        ],
                        partials : [
                            path.join(__dirname, "samples-src", "templates", projectName.toLowerCase(), "*.hbs"),
                            path.join(__dirname, "samples-src", "templates", "partials", "*.hbs"),
                            path.join(__dirname, "samples-src", "templates", "partials", projectName.toLowerCase(), "*.hbs")
                        ],
                        context : [
                            path.join(__dirname, "samples-src", "config.json"),
                            {
                                mode : (production) ? "" : "-src"
                            }
                        ]
                    }
                ),
                new HandlebarsPlugin(
                    {
                        entry : path.join(__dirname, "samples-src", "pages", "index-" + projectName.toLowerCase() + ".html"),
                        output : {
                            path : path.join(__dirname, "samples"),
                            filename : (production) ? "[name].html" : "[name]-src.html"
                        },
                        context : {
                            samples : () => {
                                var root = path.join(__dirname, "samples-src", "pages", projectName.toLowerCase());
                                var list = glob.sync(path.join(root, "**", "*.html"));
                                list = list.map(function (filePath) {
                                    var relativePath = path.relative(root, filePath);
                                    var label = relativePath.replace("/", " -- ");
                                    var pathObj = path.parse(relativePath);
                                    return {
                                        filePath : path.join(projectName.toLowerCase(), pathObj.dir, pathObj.name.concat((production) ? "" : "-src").concat(pathObj.ext)),
                                        label : label
                                    };
                                });
                                return list;
                            }
                        }
                    }
                ),
                new CopyWebpackPlugin([
                    {
                        from : path.join(__dirname, "samples-src", "resources", "**/*"),
                        to : path.join(__dirname, "samples", "resources"),
                        context : path.join(__dirname, "samples-src", "resources")
                    }
                ])
            ])
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
                })
            ])
            .concat(
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
            )
            .concat([
                new BannerWebPackPlugin({
                    banner : header(fs.readFileSync(path.join(__dirname, "licences", "licence-ign.tmpl"), "utf8"), {
                        __BRIEF__ : brief,
                        __VERSION__ : version,
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
        } : (leaflet) ? {
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
