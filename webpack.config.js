const path = require("path");

const DEV_ENV = "development";
const PROD_ENV = "production";
const ENV = process.env.NODE_ENV || DEV_ENV;
const devtool = ENV === DEV_ENV ? "#cheap-module-inline-source-map" : "source-maps";

console.log(ENV);

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.pegjs$/, loader: "pegjs-loader" },
            { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
            { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    },
    devtool
};
