const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.base.js');

const serverConfig = {
  entry: './src/server/index.ts',
  devtool: 'inline-source-map',
  target: 'node',
  externals: ['express', 'bufferutil', 'utf-8-validate'],
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

module.exports = merge(base, serverConfig);
