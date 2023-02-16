const path = require('path');

// webpack plugins and well-known modules
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

// internal helpers
const rules = require('./webpack-helpers/module-rules');

const commonConfig = {
  entry: './src/client/index.client.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[fullhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      rules.scripts,
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      minify: false,
      inject: 'body',
      template: path.resolve(__dirname, '../src/client/app/templates/index.template.html'),
      filename: 'index.html',
    }),
  ]
};

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    devMiddleware: {
      writeToDisk: true
    },
  },
  module: {
    rules: [
      rules.stylesDev,
    ],
  },
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
  module: {
    rules: [
      rules.stylesProd,
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