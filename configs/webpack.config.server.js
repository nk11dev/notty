const path = require('path');
const webpack = require('webpack');

// webpack plugins and well-known modules
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

// internal helpers
const aliases = require('./webpack/helpers/aliases');
const rules = require('./webpack/helpers/module-rules');
const envConfig = require('./env/env.config');

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
    path: path.resolve(__dirname, '../dist'),
    clean: {
      keep: (asset) => !asset.includes(OUTPUT_FILENAME),
    }
  },
  module: {
    rules: [
      rules.server.scripts,
      rules.server.styles,
      rules.server.images,
    ],
  },
  stats: 'minimal',
  plugins: [
    new webpack.DefinePlugin({
      ...Object.keys(envConfig).reduce(
        (acc, key) => {
          acc[`process.env.${key}`] = JSON.stringify(envConfig[key]);
          return acc;
        }, {}
      )
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
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // prevents "LICENSE.txt" creation (in output folder)
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: (process.env.BUNDLE_ANALYZER === 'true' ? 'server' : 'disabled'),
      analyzerPort: envConfig.PORT_BUNDLE_ANALYZER
    })
  ]
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