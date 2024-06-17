/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    clean: false,
    path: path.resolve(__dirname, '../public'),
    filename: 'mock-system.js',
    library: 'mockSystem',
    libraryTarget: 'umd',
    globalObject: 'self',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, './staticFile'), to: path.resolve(__dirname, '../public') }],
    }),
  ],
};
