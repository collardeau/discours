var webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {

  entry: {
    app: [
      mainPath 
    ]
  },

  module: {
    loaders: [ 
     { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&' +
          'localIdentName=[name]__[local]___[hash:base64:5]' + 
          '!postcss-loader')
      }
    ]
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true })
  ]

};

