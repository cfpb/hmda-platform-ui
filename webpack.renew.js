const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: {
    'main': './src/js/utils/silent_renew.js'
  },
  output: {
    filename: 'silent_renew.js'
  }
})
