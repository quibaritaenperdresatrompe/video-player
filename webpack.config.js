const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const SRC_DIR = path.resolve(__dirname, 'src')
const PUBLIC_DIR = path.resolve(__dirname, 'public')

module.exports = {
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    path: PUBLIC_DIR,
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        include: SRC_DIR,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env'],
              plugins: ['transform-class-properties'],
            },
          },
          { loader: 'eslint-loader' },
        ],
      },
      {
        include: SRC_DIR,
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_DIR, 'index.html'),
    }),
  ],
}
