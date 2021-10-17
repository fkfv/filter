const fs = require('fs');

const {resolve} = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {DefinePlugin} = require('webpack');


module.exports = {
  target: 'web',
  entry: {
    background: './src/background/index.ts',
    contentscript: './src/content_script/index.ts',
    options: './src/options/index.tsx',
    popup: './src/popup/index.tsx'
  },
  module: {
    rules: [
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new DefinePlugin({
      LOCAL_MODULES: JSON.stringify(fs.readdirSync('./modules', {
        withFileTypes: true
      }).filter(c => c.isDirectory()).map(c => c.name))
    }),
    new HtmlWebpackPlugin({
      title: 'ModFilter Background Script',
      filename: 'background.html',
      scriptLoading: 'blocking',
      chunks: ['background']
    }),
    new HtmlWebpackPlugin({
      title: 'ModFilter Options',
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      title: 'ModFilter Blocking',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: './manifest.json'},
        {from: './assets/*'}
      ]
    })
  ],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  }
};
