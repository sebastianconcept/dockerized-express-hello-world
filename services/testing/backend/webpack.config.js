var path = require('path')
require('html-webpack-template')
var webpackHelper = require('../../../webpack.helper')

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
    output: {
      path: path.resolve('server'),
      filename: 'bundle.js'
    },
    target: 'node',
    plugins: [

    ]
  }
}
