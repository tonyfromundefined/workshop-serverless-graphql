const path = require('path')
const WebpackbarPlugin = require('webpackbar')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    server: path.resolve(__dirname, './src/server.ts'),
    serverless: path.resolve(__dirname, './src/serverless.ts'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
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
      { test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  stats: 'errors-only',
  optimization: {
    minimize: false,
  },
  plugins: [
    new WebpackbarPlugin({
      name: 'Server (Production)',
      color: '#fa5252',
    }),
  ],
}
