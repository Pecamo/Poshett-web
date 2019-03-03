const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.base.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webConfig = {
  entry: './src/web/index.ts',
  devtool: 'inline-source-map',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader!tslint-loader'
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.web.json'),
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Poshett',
      filename: 'index.html',
      template: 'src/web/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css"
    }),
    new VueLoaderPlugin()
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/web')
  }
};

module.exports = merge(base, webConfig);
