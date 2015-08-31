var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('../webpack.config.js'),
    path = require('path'),
    fs = require('fs');

var mainPath = path.resolve(__dirname, '..', 'app', 'main.js');

module.exports = function(){

  var bundleStart = null,
      compiler = webpack(webpackConfig);

  compiler.plugin('compile', function(){
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', function(){
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms');
  });

  var bundler = new WebpackDevServer(compiler, {

    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/build/',
    hot: true, // used to be in npm command

    // terminal config
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(8080, 'localhost', function(){
    console.log('Bundling project, please wait...');
  });

};
