const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = merge(common, {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'app.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new WebpackShellPlugin({
      onBuildStart: ['yarn run clearBackup'],
      onBuildEnd: ['yarn run env'],
      dev: false
    })
  ]
})
