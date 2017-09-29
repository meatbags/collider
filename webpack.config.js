var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    library: 'Collider',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'build'),
    filename: 'collider.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
      colors: true
  }
};
