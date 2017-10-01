var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'collider': './src/js/app.js',
    'collider.min': './src/js/app.js'
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

/*
module.exports = {
  entry: {
    "bundle": "./entry.js",
    "bundle.min": "./entry.js",
  },
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
*/
