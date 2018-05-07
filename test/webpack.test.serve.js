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
            proj4 : path.resolve("..", "node_modules", "proj4", "dist", "proj4.js"),
            gp : path.resolve("..", "node_modules", "geoportal-access-lib", "dist", "GpServices-src.js"),
            sortable : path.resolve("..", "node_modules", "sortablejs", "Sortable.js")
        }
    },
    devtool : "eval-source-map",
    devServer : {
        stats : "errors-only",
        host : "localhost",
        port : 9001,
        hot : true,
        open : "google-chrome",
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
                "html-webpack-plugin/default_index.ejs"
            )
        })
    ]
};
