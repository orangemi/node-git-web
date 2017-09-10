'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
    disableHostCheck: true,
    port: 5011,
    inline: false
  },
  devtool: 'source-map'
})
