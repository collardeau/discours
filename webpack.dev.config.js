var webpack = require('webpack');
var config = require('./webpack.config.js');
var appConstants = require('./appConstants.js');
var paths = appConstants.paths;

config.devtool = 'eval';

config.entry = {
  app: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    paths.main 
  ]
};

config.output = {
  path: paths.build,
  filename: 'bundle.js',
  publicPath: '/build/'
};

config.module.loaders.push({
  test: /\.js$/, 
  loaders: ['react-hot', 'babel'], 
  exclude: [paths.nodeModules]
});
 
config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.plugins.push(
  new webpack.DefinePlugin({
    __DB__: JSON.stringify(paths.devDB),
    __LOG__: JSON.stringify(paths.devLog),
    __DEV__: 'true'
  })
);

module.exports = config;
