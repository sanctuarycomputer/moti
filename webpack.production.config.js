const webpack       = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.entry = [
  'babel-polyfill',
  './app/app.js'
];

webpackConfig.plugins = webpackConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false 
    } 
  }),
  new webpack.optimize.AggressiveMergingPlugin()
]);

module.exports = webpackConfig;
