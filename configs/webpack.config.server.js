const path = require('path');

// webpack plugins and well-known modules
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { merge } = require('webpack-merge');

// internal helpers
const aliases = require('./webpack-helpers/aliases');

const OUTPUT_FILENAME = 'server.js';

const commonConfig = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css'],
    alias: aliases
  },
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: './src/server/index.server.ts',
  output: {
    filename: OUTPUT_FILENAME,
    path: path.resolve(__dirname, '../dist')
  },
  stats: 'minimal',
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [OUTPUT_FILENAME],
      cleanAfterEveryBuildPatterns: [OUTPUT_FILENAME]
    }),
  ]
};

const devConfig = {
  mode: 'development',
  plugins: [
    new NodemonPlugin()
  ]
};

const prodConfig = {
  mode: 'production'
};

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching webpack server configuration was found!');
  }
};