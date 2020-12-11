const os = require('os')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./main')

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
            })
        ]
    },
    devtool: false
})
