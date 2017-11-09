var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var path = require('path')
var nodemon = require('nodemon')
var del = require('del')

var webpackHelper = require('./webpack.helper')

var webpackConfig = webpackHelper.config(config())
var sourceDir = 'src'
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
      filename: 'bundle.js'
    },
    plugins: [

    ]
  }
}

// Task definitions ----------------- vvvvvvvvv

gulp.task('default', function () {
  gulp.start('run')
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

gulp.task('watch-backend', function (done) {
  nodemon = nodemon({
    verbose: true,
    execMap:
    {
      js: 'node ' + path.resolve(buildDir, 'server/bundle.js')
    },
    script: path.resolve(buildDir, 'server/bundle.js'),
    ignore: [path.resolve(sourceDir, '/*')],
    watch: [path.resolve(path.join(buildDir, 'server'))],
    ext: 'js, json'
  }).on('restart', function () {
    console.log('Backend restarted!')
  })

  webpack(webpackConfig).watch(100, function (err, stats) {
    onBuild()(err, stats)
    nodemon.restart()
  })
})

gulp.task('build', ['build-backend'])
gulp.task('watch', ['watch-backend'])

gulp.task('run', ['dev-server', 'watch-backend'], function (done) {
  return nodemon.start()
})

gulp.task('dev-server', function (callback) {
  // modify some webpack config options
  var backendCompiler = webpack(webpackConfig)

  // Start a webpack-dev-server
  new WebpackDevServer(backendCompiler, {
    disableHostCheck: true,
    hot: true,
    quiet: false,
    inline: true,
    watchContentBase: true,
    contentBase: buildDir,
    stats: {
      colors: true
    }
    // proxy: {
    //   '/api' : {
    //     // target: 'http://local.sulvo.com:9000', // <- backend
    //     target: 'http://0.0.0.0:9000', // <- backend
    //     pathRewrite: { '^/api': '' }
    //   }
    // },
  }).listen(9000, '0.0.0.0', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://localhost:9000/webpack-dev-server/index.html')
  })
})

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
