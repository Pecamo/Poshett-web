const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules', '.'],
    alias: {
      Common: path.resolve(__dirname, './src/common'),
      Web:    path.resolve(__dirname, './src/web'),
      Server: path.resolve(__dirname, './src/server'),
    },
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ]),
  ],
};
