var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

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

