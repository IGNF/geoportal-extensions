/* global module, __dirname */

// -- modules
var fs      = require("fs");
var path    = require("path");
var webpack = require("webpack");
var header  = require("string-template");
var HandlebarsLayoutsHelpers = require("handlebars-layouts");
var Handlebars = require("handlebars");
var glob = require("glob");

// -- plugins
var DefineWebpackPlugin   = webpack.DefinePlugin;
var ExtractTextWebPackPlugin = require("extract-text-webpack-plugin");
var BannerWebPackPlugin   = webpack.BannerPlugin;
var UglifyJsWebPackPlugin = webpack.optimize.UglifyJsPlugin;
var ReplaceWebpackPlugin  = require("replace-bundle-webpack-plugin");
var JsDocWebPackPlugin    = require("jsdoc-webpack-plugin");
var HandlebarsPlugin = require("handlebars-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
                            sourceMap : true, // FIXME ?
                            minimize: (production) ? true : false
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
                        partten : /__GPOLEXTVERSION__/g,
                        /** replacement de la clef __GPVERSION__ par la version du package */
                        replacement : function () {
                            return pkg.olExtVersion;
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
                conf : path.join(__dirname, "jsdoc-openlayers.json")
            }),
            /** CSS / IMAGES */
            new ExtractTextWebPackPlugin((production) ? "GpPluginOpenLayers.css" : "GpPluginOpenLayers-src.css"),
            /** HANDLEBARS TEMPLATES */
            new HandlebarsPlugin({
                // path to hbs entry file(s)
                entry: path.join(__dirname, "samples-src", "pages", "openlayers", "**", "*.html"),
                // output path and filename(s). This should lie within the webpacks output-folder
                // if ommited, the input filepath stripped of its extension will be used
                output: path.join(__dirname, "samples", "openlayers", (production) ? "[name].html" : "[name]-src.html"),
                // data passed to main hbs template:
                //data: path.join(__dirname, "samples-src", "config.json"),
                data: {
                    "mode" : (production)? "" : "-src",
                    "baseurl" : "../..",
                    "resources" : "../resources",
                    "apikey" : "jhyvi0fgmnuxvfv0zjzorvdn"
                },
                partials: [
                    path.join(__dirname, "samples-src", "templates", "openlayers", "*.hbs"),
                    path.join(__dirname, "samples-src", "templates", "partials", "*.hbs"),
                    path.join(__dirname, "samples-src", "templates", "partials", "openlayers", "*.hbs")
                ],
                helpers: {
                    extend: HandlebarsLayoutsHelpers(Handlebars).extend,
                    embed: HandlebarsLayoutsHelpers(Handlebars).embed,
                    block: HandlebarsLayoutsHelpers(Handlebars).block,
                    content: HandlebarsLayoutsHelpers(Handlebars).content
                }
            }),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin({
                entry: path.join(__dirname, "samples-src", "pages", "index-openlayers.html"),
                output: path.join(__dirname, "samples", (production) ? "[name].html" : "[name]-src.html"),
                data: {
                    paths: () => {
                        var list = glob.sync(path.join(__dirname, "samples-src", "pages", "openlayers", "**", "*.html"));
                        list = list.map(function(filePath) {
                            var ext = path.extname(filePath);
                            var name = path.basename(filePath, ext);
                            return {
                                filePath: path.join("openlayers", name.concat((production) ? "" : "-src").concat(ext)),
                                fileName: name
                            };
                        });
                        return list;
                    }
                }
            }),
            /* RESOURCES COPY FOR SAMPLES */
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, "samples-src", "resources", "**/*"),
                    to: path.join(__dirname, "samples", "resources"),
                    context: path.join(__dirname, "samples-src", "resources")
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
