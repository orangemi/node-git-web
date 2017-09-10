'use strict'
const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

module.exports = {
  entry: {
    router: path.resolve(__dirname, '../src'),
    vendor: [
      // js
      'regenerator-runtime/runtime', 'element-ui',
      'moment', 'vue', 'vue-router',
      // css
      'element-ui/lib/theme-default/index.css'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/build/'
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      views: path.resolve(__dirname, '../src/views')
    }
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        options: { plugins: ['transform-regenerator'], presets: ['es2015'] },
        loader: 'babel-loader' },
      { test: /template\.pug$/,
        loader: ['vue-template-loader', 'pug-html-loader'] },
      { test: /\.styl(us)?$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'resolve-url-loader', {
            loader: 'stylus-loader',
            options: {paths: 'node_modules'}
          }],
          fallback: 'style-loader'
        }) },
      { test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'url-loader',
        options: { prefix: 'font/', limit: 5000 } },
      { test: /\.(svg|ttf|eot)(\?.*)?$/,
        loader: 'file-loader' },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: 'css-loader' }) }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({names: 'vendor'}),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh/),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, '../build'),
      prettyPrint: true
    })
  ]
}
