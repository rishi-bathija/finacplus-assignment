const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devServer: {
        port: 3001,
        historyApiFallback: true,
    },
    output: {
        publicPath: "auto",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },

        ],

    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "musicApp",
            filename: "remoteEntry.js",
            exposes: {
                "./MusicLibrary": "./src/components/MusicLibrary",
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: "^18.2.0",
                    eager: true,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: "^18.2.0",
                    eager: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
