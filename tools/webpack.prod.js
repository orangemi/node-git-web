'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const buildConfig = require('./webpack.common')
const cdnPrefix = 'https://dn-st.teambition.net/pay'

module.exports = webpackMerge(buildConfig, {
  bail: true,
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: cdnPrefix + '/build/',
    filename: '[name].bundle.[chunkhash].js',
    pathinfo: true
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEBUG__': false,
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    new UglifyJSPlugin()
  ]
})
