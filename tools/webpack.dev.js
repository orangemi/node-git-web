'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const buildConfig = require('./webpack.common')

module.exports = webpackMerge(buildConfig, {
  plugins: [
    new ExtractTextPlugin('[name].bundle.css'),
    new webpack.DefinePlugin({
      '__DEBUG__': true
    })
  ],
  devServer: {
    hot: false,
    disableHostCheck: true
  },
  devtool: 'source-map'
})
