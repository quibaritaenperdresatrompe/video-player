const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const SRC_DIR = path.resolve(__dirname, 'src')
const PUBLIC_DIR = path.resolve(__dirname, 'public')

module.exports = {
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    path: PUBLIC_DIR,
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        include: SRC_DIR,
        loader: ['babel-loader'],
        test: /\.js$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_DIR, 'index.html'),
    }),
  ],
}
