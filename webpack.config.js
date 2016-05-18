const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {  
  entry: [
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './app/app.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: "[name].[hash].js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot'], exclude: /node_modules/ },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel',
        query: {
          presets: [
            'react', 
            'es2015', 
            'stage-0'
          ],
          plugins: [
            'transform-runtime', 
            'transform-class-properties', 
            'syntax-decorators',
            'transform-decorators-legacy'
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html',
      inject: false
    })
  ]
};
