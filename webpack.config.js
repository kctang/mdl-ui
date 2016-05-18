require('babel-polyfill');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [];

if (isProd) {
  // noinspection Eslint
  console.log('Running webpack in production mode');

  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      // options https://github.com/mishoo/UglifyJS2
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = {
  entry: {
    'mdl-ui': ['./src/index.js']
  },
  output: {
    path: './lib',
    filename: '[name].js',
    libraryTarget: 'amd',
  },
  externals: [
    'underscore',
    'react',
    'react-mdl',
    'nuka-carousel',
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel?presets[]=react,presets[]=es2015'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.png/,
        loader: 'url?limit=1048576&minetype=image/png&name=png/[name]-[hash].[ext]',
        // loader: 'url?limit=1024&minetype=image/png&name=assets/[name]-[hash].[ext]',
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=1048576&mimetype=application/font-woff2&name=fonts/[name]-[hash].[ext]',
        // loader: 'url?limit=1024&mimetype=application/font-woff2&name=assets/[name]-[hash].[ext]',
      },
    ],
  },
  plugins,
  devtool: 'source-map',
};
