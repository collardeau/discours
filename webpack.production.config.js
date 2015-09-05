var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var 
  nodeModulesPath = path.resolve(__dirname, 'node_modules'),
  buildPath = path.resolve(__dirname, 'public', 'build'),
  mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {

  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loaders: ['babel'], 
        exclude: [nodeModulesPath]
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      }
   ]
  },
  plugins: [
    new ExtractTextPlugin('app.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __DB__: '"http://discours.firebaseIO.com"',
      __LOG__: '"http://discours-log.firebaseIO.com"'
    })
 
  ]
};

