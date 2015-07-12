module.exports = {

  devtool: 'eval',

  entry: {
    app: ['./src/app.js']
  },

  output: {
    path: './public',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
      { test: /\.css$/, loader: 'style-loader!css-loader' }

    ]
  },

  plugins: []

};

