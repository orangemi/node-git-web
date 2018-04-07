'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const resolve = (dir) => path.join(__dirname, '..', dir)

const vendorCSSPlugin = new ExtractTextPlugin({ filename: 'vendor.bundle.css', allChunks: true })

module.exports = {
  entry: {
    main: resolve('src/index.ts')
  },
  output: {
    path: resolve('build'),
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      service: resolve('src/service')
    }
  },
  module: {
    rules: [
      { test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      // { test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'vue-ts-loader'
      // },
      //   use: [{
      //     loader: 'ts-loader',
      //     options: {
      //       appendTsSuffixTo: [/\.vue$/]
      //     }
      //   }]
      // },
      { test: /\.js$/,
        exclude: /node_modules/,
        options: { plugins: ['transform-regenerator'], presets: ['es2015'] },
        loader: 'babel-loader' },

      { test: /\.vue$/,
        loader: 'vue-loader' },
      { test: /\.pug$/,
        loader: 'pug-html-loader' },
      { test: /\.css$/,
        // use: vendorCSSPlugin.extract({ use: 'css-loader', fallback: 'style-loader' }) },
        loader: 'style-loader!css-loader' },
      { test: /\.styl(us)?$/,
        loader: 'style-loader!css-loader!stylus-loader' },
        // use: vendorCSSPlugin.extract({
        //   use: ['css-loader', 'resolve-url-loader', {
        //     loader: 'stylus-loader',
        //     options: {paths: 'node_modules'}
        //   }],
        //   fallback: 'style-loader'
        // }) },
      { test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'url-loader',
        options: { prefix: 'font/', limit: 5000 } },
      { test: /\.ttf(\?.*)?$/,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/octet-stream' } },
      { test: /\.svg(\?.*)?$/,
        loader: 'file-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader' },
      // { test: /\.css$/,
      //   use: ExtractTextPlugin.extract({ use: 'css-loader' }),
      //   exclude: /element-ui/ }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    vendorCSSPlugin,
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh/),
    new AssetsPlugin({
      filename: 'assets.json',
      path: resolve('build'),
      prettyPrint: true
    })
  ],
  mode: 'production'
}