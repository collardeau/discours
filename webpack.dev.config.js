var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

config.devtool = 'eval';
config.entry.app.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
);

config.output = {
  path: buildPath,
  filename: 'bundle.js',
  publicPath: '/build/'
};

config.module.loaders.push({
  test: /\.js$/, 
  loaders: ['react-hot', 'babel'], 
  exclude: [nodeModulesPath]
});
 
config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.plugins.push(
  new webpack.DefinePlugin({
    __DB__: '"http://dev-discours.firebaseIO.com"',
    __LOG__: '"http://dev-log-discours.firebaseIO.com"'
  })
);

module.exports = config;
