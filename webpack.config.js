const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;


const filename = (fname, ext) => isDev ?  `${fname}.${ext}` :  `${fname}.[hash].${ext}`;


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('main', 'js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 1337,
        hot: isDev,
        watchFiles: ["src/*.html"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            inject: 'body'
        }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src/img/favicon.ico'), to: "img" },
            ],
          }),
        new MiniCssExtractPlugin({
            filename: filename('style', 'css')
        })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
            ],
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
    }
};
