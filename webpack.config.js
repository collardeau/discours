var 
  webpack = require('webpack'),
  path = require('path');

var 
  nodeModulesPath = path.resolve(__dirname, 'node_modules'),
  buildPath = path.resolve(__dirname, 'public', 'build'),
  mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {

  devtool: 'eval',

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      mainPath 
    ]
  },

  output: {
    path: buildPath,
    filename: 'bundle.js',
    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
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
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};

