const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const WebpackbarPlugin = require('webpackbar')

module.exports = {
  context: __dirname,
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, './src/server.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          }
        ],
      },
    ],
  },
  stats: 'errors-only',
  watch: true,
  plugins: [
    new WebpackbarPlugin({
      name: 'Server',
      color: '#228be6',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new NodemonPlugin(),
  ],
}
