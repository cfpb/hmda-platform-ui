const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    renew: './src/utils/silent_renew.js'
  },
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: path.resolve('./dist/js'),
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'extraneous',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: '../silent_renew.html',
      template: './src/silent_renew.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new UglifyJSPlugin({ sourceMap: true })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve('./src'),
          path.resolve('./node_modules/hmda-ui')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  modules: false,
                  useBuiltIns: 'entry'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../css/[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}
