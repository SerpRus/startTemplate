const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssEstractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

const filePath = {
  src: {
    script: './src/js/index.js',
    style: './src/scss/index.scss',
  },
  dist: './public/',
};

module.exports = {
  mode: mode,
  entry: [filePath.src.script, filePath.src.style],
  output: {
    path: path.resolve(__dirname, filePath.dist),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
    publicPath: '',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'GUI.html',
      template: './src/html/GUI.html',
      chunks: ['main'],
    }),
    new MiniCssEstractPlugin({
      filename: '[main].[contenthash].css',
    }),
    new StylelintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssEstractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|sprite\.svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
