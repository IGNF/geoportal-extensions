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
        }
    },
    devtool : "eval-source-map",
    module : {
        rules : [
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
            ),
            files : {
                js : ["https://openlayers.org/en/latest/build/ol.js"]
            }
        })
    ]
};
