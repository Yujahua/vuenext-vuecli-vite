'use strict'
const path = require('path')
const HappyPack = require('happypack')
const os = require('os')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@examples': resolve('examples'),
      '@csii/vx-mobile$': process.env.CSII_VX_MOBILE === 'bundle' ? resolve('lib/@csii/vx-mobile.umd') : resolve('src/components'),
      '@csii/vx-mobile/lib': resolve('src/components'),
      '@csii/vx-mobile/components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src/components'), resolve('examples'), resolve('test')],
        options: {
          quiet: true,
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        include: [resolve('src/components'), resolve('examples'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/components'), resolve('examples/assets/images')]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      verbose: false,
      threadPool: happyThreadPool,
    })
  ]
}
