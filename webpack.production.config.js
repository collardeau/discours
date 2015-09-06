var webpack = require('webpack');
var config = require('./webpack.config.js');
var appConstants = require('./appConstants.js');
var paths = appConstants.paths;

config.devtool = 'source-map';
config.entry = paths.main;
config.output = {
  path: paths.build,
  filename: 'bundle.js'
};
 
config.module.loaders.push({
  test: /\.js$/, 
  loaders: ['babel'], 
  exclude: [paths.nodeModules]
});

config.plugins.push(
  new webpack.DefinePlugin({
    __DB__: JSON.stringify(paths.DB),
    __LOG__: JSON.stringify(paths.log),
    __DEV__: 'false'
  })
);

module.exports = config;
