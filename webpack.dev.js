const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = merge(common, {
  entry: {
    'main': './src/js/index.js'
  },
  output: {
    filename: 'app.min.js',
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: ['yarn clearBackup'],
      onBuildEnd:['yarn env'],
      dev: false
    })
  ]
})
