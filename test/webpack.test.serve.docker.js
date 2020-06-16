/* global module, __dirname, process */
var path = require("path");
var webpack = require("webpack");

// plugin
var HtmlWebpackPlugin = require("html-webpack-plugin");
var DefineWebpackPlugin = webpack.DefinePlugin;

module.exports = {
    entry : {
        tests : path.join(__dirname)
    },
    output : {
        path : path.join(__dirname),
        filename : "[name].js",
        libraryTarget : "umd"
    },
    externals : ["request", "xmldom"],
    resolve : {
        alias : {
            proj4 : path.resolve("..", "node_modules", "proj4", "dist", "proj4-src.js")
        }
    },
    devtool : "eval-source-map",
    module : {
        rules : [
            {
                test : require.resolve("proj4"),
                use : [{
                    loader : "expose-loader",
                    options : "proj4"
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude : /node_modules/
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
    devServer : {
        stats : "errors-only",
        host : "0.0.0.0",
        disableHostCheck: true,
        port : 9021,
        hot : true,
        watchOptions : {
            watch : true,
            poll : true
        },
        overlay : {
            errors : true,
            warnings : false
        }
    },
    plugins : [
        // on veut les logs !
        new DefineWebpackPlugin({
            __PRODUCTION__ : JSON.stringify(false)
        }),
        new HtmlWebpackPlugin({
            title : "Mocha Tests Units",
            filename : "index.html",
            template : require.resolve(
                "./test.ejs"
            ),
            files : ["https://openlayers.org/en/latest/build/ol.js"]
        })
    ]
};
