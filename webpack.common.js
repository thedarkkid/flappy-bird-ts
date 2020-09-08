const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    entry:{
        script: "./src/entry.ts",
        vendor: "./src/vendor.ts"
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"] // load assets as longtext
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(svg|png|jpeg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    }

};
