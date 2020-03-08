const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.js/, use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    // new CleanWebpackPlugin(['dist'])

  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
}