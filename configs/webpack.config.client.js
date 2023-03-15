const path = require('path');
const webpack = require('webpack');

// webpack plugins and well-known modules
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

// internal helpers
const aliases = require('./webpack-helpers/aliases');
const rules = require('./webpack-helpers/module-rules');
const envConfig = require('./env/env.config');

const commonConfig = {
  entry: './src/client/index.client.js',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[fullhash].js',
    publicPath: '/'
  },
  stats: 'minimal',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css'],
    alias: aliases
  },
  module: {
    rules: [
      rules.client.scripts,
      rules.client.styles,
      rules.client.images,
      rules.client.fonts,
      rules.client.json,
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envConfig)
    }),
    new HtmlWebpackPlugin({
      hash: true,
      minify: false,
      inject: 'body',
      template: path.resolve(__dirname, '../src/client/app/templates/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
    }),
  ]
};

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: envConfig.PORT_CLIENT,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    hot: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
};

const prodConfig = {
  mode: 'production',
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css'
    }),
  ]
};

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching webpack client configuration was found!');
  }
};