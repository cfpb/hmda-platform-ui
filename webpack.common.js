const path = require('path')
const webpack = require('webpack')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist/js')
  },
  devtool: 'source-map',
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  modules: false,
                  useBuiltIns: 'entry'
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
