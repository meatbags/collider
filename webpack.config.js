var path = require('path');
var webpack = require('webpack');

// modules
var TerserJs = require("terser-webpack-plugin");

// path
var appName = 'Collider';
var pathJS = './src/app.js';
var pathOutput = 'build';

module.exports = [{
  entry: {'collider.min': pathJS},
  output: {
    library: appName,
    libraryTarget: 'var',
    path: path.resolve(__dirname, pathOutput),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {loader: "babel-loader"}
    }]
  },
  optimization: {
    minimizer: [
      new TerserJs({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  stats: {colors: true, warnings: false}
}];
