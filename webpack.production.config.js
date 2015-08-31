var webpack = require('webpack'),
    path = require('path');

var 
  nodeModulesPath = path.resolve(__dirname, 'node_modules'),
  buildPath = path.resolve(__dirname, 'public', 'build'),
  mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {

  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loaders: ['react-hot', 'babel'], 
        exclude: [nodeModulesPath]
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      }
    ]
  }
};

