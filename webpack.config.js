var webpack = require('webpack');
var path = require('path');

module.exports = {

  devtool: 'eval',

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/app.js'
    ]
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './public/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel', 'miel'], exclude: /node_modules/},
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]

};

