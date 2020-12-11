const os = require('os')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./renderer')

module.exports = merge.merge(baseConfig, {
    mode: 'production',
    optimization: {
        splitChunks: false,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: os.cpus().length - 1 || 7,
                terserOptions: {
                    ecma: 6
                }
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                },
                canPrint: true
            })
        ]
    },
    devtool: false
})
