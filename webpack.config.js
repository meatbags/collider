var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'collider': './src/app.js',
    'collider.min': './src/app.js'
  },
  output: {
    library: 'Collider',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  stats: {
      colors: true
  }
};
