/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const path = require('path');

module.exports = () => {
  const webpackConfig = baseConfig();

  return merge.merge(webpackConfig, {
    output: {
      path: path.resolve(__dirname, 'dist'),
      pathinfo: true,
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
    },
    optimization: {
      nodeEnv: 'web',
    },
    node: {
      fs: 'empty',
    },
    target: 'web',
    externals: {
      React: 'react',
      ReactDOM: 'react-dom',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      clientLogLevel: 'info',
      compress: true,
      port: 8080,
      watchContentBase: true,
      overlay: true,
      historyApiFallback: true,
      open: true,
    },
  });
};
