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
                musicApp: "musicApp@https://music-library-drab-tau.vercel.app/remoteEntry.js",
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
