const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const baseConfig = require('./base');

module.exports = merge.merge(baseConfig, {
    target: 'electron-main',
    entry: {
        main: './src/main/main.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: 'cache',
                            babelrc: false,
                            presets: [['@babel/preset-env', { targets: 'maintained node versions' }], '@babel/preset-typescript'],
                            plugins: [
                                ['@babel/plugin-proposal-class-properties', { loose: true }],
                                ['@babel/plugin-proposal-nullish-coalescing-operator'],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.node$/,
                use: 'node-loader',
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: 'src/main/**/*.{ts,tsx}',
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
    devtool: 'source-map',
});
