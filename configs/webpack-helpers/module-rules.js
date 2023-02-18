const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const regexes = {
  js: /\.(js|jsx)$/,
  ts: /\.(ts|tsx)$/,
  styles: /\.(sa|sc|c)ss$/,
  images: /\.(jpe?g|jpg|png|gif|svg)$/,
  fonts: /\.(ttf|svg|woff|woff2)$/,
};

module.exports = {
  js: {
    test: regexes.js,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  ts: {
    test: regexes.ts,
    exclude: /node_modules/,
    use: ['babel-loader', 'ts-loader'],
  },
  stylesDev: {
    test: regexes.styles,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  },
  stylesProd: {
    test: regexes.styles,
    use: [
      MiniCssExtractPlugin.loader,
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
};