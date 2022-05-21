const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
  lintOnSave: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hot: "only"
  },
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    // resolve: {
    //   alias: {
    //     'vue$': './node_modules/vue/dist/vue.esm.js',
    //     '@': path.resolve('src'),
    //     'cesium': path.resolve(__dirname, cesiumSource)
    //   }
    // },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{
          from: path.join(cesiumSource, cesiumWorkers),
          to: 'Workers'
        }]
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.join(cesiumSource, 'Assets'),
          to: 'Assets'
        }]
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.join(cesiumSource, 'Widgets'),
          to: 'Widgets'
        }]
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.join(cesiumSource, 'ThirdParty/Workers'),
          to: 'ThirdParty/Workers'
        }]
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      })
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  }
};