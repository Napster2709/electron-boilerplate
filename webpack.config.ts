const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

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
    target: 'web',
    node: { fs: 'empty' },
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
      alias: {
        styles: path.resolve(__dirname, './src/theme'),
        components: path.resolve(__dirname, './src/components'),
        assets: path.resolve(__dirname, './src/assets'),
        utils: path.resolve(__dirname, './src/utils'),
      },
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
          test: /\.svg$/,
          loader: '@svgr/webpack',
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
        {
          test: /\.(woff(2)?|ttf|eot|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
              },
            },
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
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.parsed),
      }),
    ],
    externals: {
      React: 'react',
      ReactDOM: 'react-dom',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      pathinfo: true,
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      // publicPath: '/',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080,
      watchContentBase: true,
      overlay: true,
      historyApiFallback: true,
      clientLogLevel: 'info',
      open: true,
    },
  },
];
