var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {  
    entry: [
      'webpack/hot/only-dev-server',
      "./app/app.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "app_bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('public/style.css', {
        allChunks: true
      }),
      HTMLWebpackPluginConfig
    ]

};