var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');

var buildPath = path.resolve(__dirname, 'public', 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

config.devtool = 'source-map';
config.entry = mainPath;
config.output = {
  path: buildPath,
  filename: 'bundle.js'
};
 
config.module.loaders.push({
  test: /\.js$/, 
  loaders: ['babel'], 
  exclude: [nodeModulesPath]
});

module.exports = config;
