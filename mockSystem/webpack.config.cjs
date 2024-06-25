/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');

const CopyWebpackPlugin = require('copy-webpack-plugin');

if (!fs.existsSync(path.resolve(__dirname, './ts-dist/library'))) {
  fs.mkdirSync(path.resolve(__dirname, './ts-dist/library'));
}
fs.copyFileSync(path.resolve(__dirname, './src/library/jwt.js'), path.resolve(__dirname, './ts-dist/library/jwt.js'));

module.exports = {
  entry: './ts-dist/index.js',
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
