const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 5000,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
module.exports = merge(baseConfig, devConfig)