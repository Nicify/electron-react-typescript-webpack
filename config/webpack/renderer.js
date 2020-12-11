const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const baseConfig = require('./base')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = merge.merge(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: ['./src/renderer/render.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: 'cache',
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: 'cache',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { importLoaders: 1 } }],
            },
            {
                test: /\.scss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[md5:hash:hex:7].[ext]',
                            limit: 102400,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|webp)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 102400,
                        },
                    },
                ],
            },
            {
                test: /\.node$/,
                use: 'node-loader',
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                use: ['source-map-loader'],
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: 'src/renderer/**/*.{ts,tsx}',
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].[hash:8].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['app'],
            template: resolve(__dirname, '../../src/renderer/index.html.ejs'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
})
