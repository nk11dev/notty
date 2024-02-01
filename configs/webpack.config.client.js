const path = require('path');
const webpack = require('webpack');

// webpack plugins and well-known modules
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

// internal helpers and plugins
const aliases = require('./webpack/helpers/aliases');
const rules = require('./webpack/helpers/module-rules');
const TimeLoggerPlugin = require('./webpack/plugins/time-logger-plugin');
const envConfig = require('./env/env.config');

const commonConfig = {
  entry: './src/client/index.client.js',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[fullhash].js',
    publicPath: '/',
    clean: true
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envConfig)
    }),
    new HtmlWebpackPlugin({
      hash: true,
      minify: false,
      inject: 'body',
      template: path.resolve(__dirname, '../src/client/app/templates/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, `../src/assets/images/${process.env.NODE_ENV === 'production' ? 'favicon-prod' : 'favicon-dev'}/favicon.ico`),
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
      directory: path.join(__dirname, '../dist/client'),
    },
    hot: true
  },
  plugins: [
    new TimeLoggerPlugin(),
    new ReactRefreshWebpackPlugin()
  ]
};

const prodConfig = {
  mode: 'production',
  performance: {
    maxEntrypointSize: 1512000,
    maxAssetSize: 1512000
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
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
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
      throw new Error('No matching webpack client configuration was found!');
  }
};