'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function({ config, mode }) {
  const isProd = mode === 'PRODUCTION';

  config.resolve.extensions = ['.ts', '.tsx', '.js'];

  config.module.rules = [{
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: { cacheDirectory: true }
    }, {
      loader: 'ts-loader',
      options: { onlyCompileBundledFiles: true }
    }]
  }, {
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
  }];

  config.plugins.push(new MiniCssExtractPlugin({
    filename: isProd ? '[name].[contenthash].css' : '[name].css',
    chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
    ignoreOrder: true
  }));

  return config;
};
