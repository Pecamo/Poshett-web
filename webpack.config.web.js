const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/web/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.web.json')
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader",   // translates CSS into CommonJS
          "sass-loader"   // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
    modules: ['src/web', 'node_modules', '.'],
    alias: {
      Common: path.resolve(__dirname, './src/common'),
      Web:    path.resolve(__dirname, './src/web'),
    },
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ]),
    new HtmlWebpackPlugin({
      title: 'Poshett',
      filename: 'index.html'
    })
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/web')
  }
};
