const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/web/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"   // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json', '.sass' ],
    modules: ['src/web', 'node_modules', '.'],
    alias: {
      Common: path.resolve(__dirname, './src/common'),
      Web:    path.resolve(__dirname, './src/web'),
      vue: 'vue/dist/vue.js'
    },
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ]),
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
