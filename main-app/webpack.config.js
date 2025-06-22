const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    output: {
        publicPath: "auto",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "mainApp",
            remotes: {
                musicApp: "musicApp@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: "^18.2.0",
                    eager: true, // Eager loading for React
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: "^18.2.0",
                    eager: true, // Eager loading for ReactDOM
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
