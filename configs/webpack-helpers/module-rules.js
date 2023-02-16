const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const regexes = {
  scripts: /\.(js|jsx)$/,
  styles: /\.(sa|sc|c)ss$/,
};

module.exports = {
  scripts: {
    test: regexes.scripts,
    exclude: /node_modules/,
    loader: 'babel-loader',
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
};