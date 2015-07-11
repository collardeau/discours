module.exports = {

  devtool: 'eval',

  entry: {
    app: ['./src/App.js']
  },

  output: {
    path: './public',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/}
    ]
  },

  plugins: []

};

