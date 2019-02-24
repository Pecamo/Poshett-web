const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: './src/server/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.server.json')
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
    modules: ['node_modules', '.'],
    alias: {
      Common: path.resolve(__dirname, './src/common'),
      Server: path.resolve(__dirname, './src/server'),
    },
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ]),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server'),
    library: 'PoshettWeb',
    libraryTarget: 'umd'
  },
  node: {
    __dirname: false,
  }
};
