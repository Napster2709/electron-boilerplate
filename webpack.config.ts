const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;

module.exports = [
  // electron entry
  {
    mode: env || 'development',
    target: 'electron-main',
    entry: './src/electron.ts',
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
  },
  // Aplication entry
  {
    mode: env || 'development',
    entry: './src/index.tsx',
    devtool: 'source-map',
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.json',
        '.ts',
        '.tsx',
        '.js',
        '.css',
        '.scss',
      ],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader:
                env === 'development'
                  ? 'style-loader'
                  : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                esModule: true,
                sourceMap: env === 'development',
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            env === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: env === 'development' ? '[name].css' : '[name].[hash].css',
        chunkFilename: env === 'development' ? '[id].css' : '[id].[hash].css',
      }),
    ],
    externals: {
      React: 'react',
      ReactDOM: 'react-dom',
    },
    output: {
      pathinfo: true,
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
    },
    devServer: {
      contentBase: [path.join(__dirname, 'dist')],
      compress: true,
      port: 8080,
      http2: true,
      colors: true,
      open: 'google-chrome',
    },
  },
];
