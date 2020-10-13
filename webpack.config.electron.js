/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const path = require('path');

const env = process.env.NODE_ENV;

module.exports = () => {
  const webpackConfig = baseConfig();

  return merge.merge(webpackConfig, {
    mode: env || 'development',
    target: 'electron-main',
    entry: './src/electron.js',
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'electron.js',
    },
  });
};
