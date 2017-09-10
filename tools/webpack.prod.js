'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const buildConfig = require('./webpack.common')

module.exports = webpackMerge(buildConfig, {
  bail: true,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/build/',
    filename: '[chunkhash].js',
    pathinfo: false
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEBUG__': false,
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin('[chunkhash].css'),
    new UglifyJSPlugin({
      parallel: true,
      extractComments: false
    })
  ]
})
