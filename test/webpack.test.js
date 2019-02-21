var path = require("path");
var webpack = require("webpack");

// plugin
var DefineWebpackPlugin = webpack.DefinePlugin;
var nodeExternals = require("webpack-node-externals");

module.exports = {
    target : "node",
    externals : [nodeExternals()],
    resolve : {
        alias : {
            // "geoportal-access-lib" : auto,
            proj4 : path.resolve("..", "node_modules", "proj4", "dist", "proj4.js"),
            sortablejs : path.resolve("..", "node_modules", "sortablejs", "Sortable.js"),
            eventbusjs : path.resolve("..", "node_modules", "eventbusjs", "src", "EventBus.js")
        }
    },
    module : {
        rules : [
            {
                test: /\.js$/,
                include: path.resolve('..', 'src'), // instrument only testing sources with Istanbul, after ts-loader runs
                loader: 'istanbul-instrumenter-loader',
                query: {
                    esModules: true
                }
            },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader : "babel-loader"
            }
        ]
    },
    plugins : [
        // on ne veut pas de logger !
        new DefineWebpackPlugin({
            __PRODUCTION__ : JSON.stringify(true)
        })
    ]
};
