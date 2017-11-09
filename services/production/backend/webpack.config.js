var path = require('path')
var webpack = require('webpack')
require('html-webpack-template')
var webpackHelper = require('./webpack.helper')
var UglifyEsPlugin = require('uglify-es-webpack-plugin')

var webpackConfig = config()

module.exports = webpackConfig

// Returns the webpack config for the backend.
function config () {
  return {
    name: 'backend build',
    entry: path.resolve('server/main.js'),
    resolve: {
      extensions: ['.js']
    },
    externals: webpackHelper.getExcludedModules(),
    target: 'node',
    output: {
      path: path.resolve('server'),
      filename: 'app.js'
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new UglifyEsPlugin({
        sourceMap: true,
        beautify: false,
        minimize: true,
        compress: {
          screw_ie8: true
        },
        comments: false,
        mangle: {
          except: ['$'],
          eval: true,
          screw_ie8: true,
          keep_fnames: false,
          toplevel: true
        }
      })
    ]
  }
}
