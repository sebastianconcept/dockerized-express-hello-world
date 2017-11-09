var gulp = require('gulp')
var webpack = require('webpack')
var path = require('path')
var del = require('del')
var UglifyEsPlugin = require('uglify-es-webpack-plugin')

var webpackHelper = require('./webpack.helper')

var webpackConfig = webpackHelper.config(config())
var buildDir = 'build'

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
      path: path.resolve('../build/server'),
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

// Task definitions ----------------- vvvvvvvvv

gulp.task('default', function () {
  gulp.start('build')
})

gulp.task('clean', function () {
  var dirsToGetClean = [
    path.resolve(buildDir),
    '.tmp/'
  ]

  return del(dirsToGetClean)
})

// Backend
gulp.task('build-backend', function (done) {
  webpack(webpackConfig).run(onBuild(done))
})

gulp.task('build', ['build-backend'])

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
