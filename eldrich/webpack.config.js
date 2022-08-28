let path = require('path');
const { config } = require('process');

let conf = {

  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: './dist/',
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
      watch: true
    }
  },

  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
}

module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  conf.devtool = isProd ? false : 'eval-source-map';
  return conf;
};