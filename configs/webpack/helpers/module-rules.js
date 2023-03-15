const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const regexes = {
  scripts: /\.[jt]sx?$/,
  styles: /\.(sa|sc|c)ss$/,
  images: /\.(jpe?g|jpg|png|gif|svg)$/,
  fonts: /\.(ttf|svg|woff|woff2)$/,
};

const isDevelopment = process.env.NODE_ENV !== 'production';
const babelConfigPath = '../../../.babelrc.js';

// client-side module rules
const client = {
  scripts: {
    test: regexes.scripts,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      configFile: path.resolve(__dirname, babelConfigPath),
      plugins: [
        isDevelopment && require.resolve('react-refresh/babel')
      ].filter(Boolean),
    },
  },
  styles: {
    test: regexes.styles,
    use: [
      (isDevelopment
        ? 'style-loader'
        : MiniCssExtractPlugin.loader),
      'css-loader',
      'sass-loader'
    ]
  },
  images: {
    test: regexes.images,
    exclude: /assets[\\/]fonts/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/images/[name][ext]'
    }
  },
  fonts: {
    test: regexes.fonts,
    exclude: /assets[\\/]images/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name][ext]'
    }
  },
  json: {
    test: /\.json$/,
    type: 'json'
  }
};

// server-side module rules
const server = {
  scripts: {
    test: regexes.scripts,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      configFile: path.resolve(__dirname, babelConfigPath),
    },
  },
  styles: {
    test: regexes.styles,
    type: 'asset/inline'
  },
  images: {
    test: regexes.images,
    type: 'asset/inline',
  },
};

module.exports = {
  client,
  server,
};