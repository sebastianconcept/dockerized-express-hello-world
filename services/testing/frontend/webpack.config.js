var path = require('path')
require('html-webpack-template')
var webpackHelper = require('./webpack.helper')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

var webpackConfig = webpackHelper.config(config())

module.exports = webpackConfig

// Returns the webpack config for the frontend.
function config () {
  return {
    name: 'frontend build',
    entry: path.resolve('client/main.js'),
    resolve: {
      extensions: ['.js']
    },
    externals: webpackHelper.getExcludedModules(),
    output: {
      path: path.resolve('client'),
      filename: 'app.js'
    },
    plugins: [
      new HtmlWebpackHarddiskPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        alwaysWriteToDisk: true,
        template: path.resolve('static/index.ejs')
      })
    ]
  }
}
