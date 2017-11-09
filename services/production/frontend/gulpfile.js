var gulp = require('gulp')
var webpack = require('webpack')
var path = require('path')

require('html-webpack-template')
var webpackHelper = require('./webpack.helper')

var webpackConfig = webpackHelper.config(config())

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
      path: path.resolve('../build/client'),
      filename: 'app.js'
    }
    // plugins: [
    //   new HtmlWebpackHarddiskPlugin(),
    //   new HtmlWebpackPlugin({
    //     inject: false,
    //     alwaysWriteToDisk: true,
    //     template: path.resolve(sourceDir, 'static/index.ejs')
    //   }),
    // ]
  }
}

// Task definitions ----------------- vvvvvvvvv

gulp.task('default', function () {
  gulp.start('run')
})

// Frontend
gulp.task('build-frontend', function (done) {
  webpack(webpackConfig).run(onBuild(done))
})

gulp.task('build', ['build-frontend'])
gulp.task('run', ['build-frontend'])

// Task definitions ----------------- ^^^^^^^^^^^^

function onBuild (done) {
  return function (err, stats) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log(stats.toString())
    }

    if (done) {
      done()
    }
  }
}
