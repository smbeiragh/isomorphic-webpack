/**
 * Created by sajjad on 3/14/18.
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const cwd = path.resolve(__dirname);

const client = {
  name: 'client',
  context: cwd,
  entry: { main: [(path.join(cwd, 'src', 'client.js'))] },
  output: {
    path: path.join(cwd, 'public', 'assets', 'dist'),
    publicPath: '/assets/dist/',
    filename: '[name].js'
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: path.join(cwd, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: 'babel_cache'
          }
        }
      }
    ]
  }
};

const server = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  context: cwd,
  entry: { server: [(path.join(cwd, 'src', 'server', 'index.js'))] },
  output: {
    path: path.resolve(path.join(cwd, 'dist')),
    publicPath: '/assets/dist/',
    filename: 'server.bundle.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less|scss)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  module: {
    rules: client.module.rules
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: [nodeExternals()]
};

module.exports = [client, server];
