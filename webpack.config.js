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
    })
    // don't think there's dedupe helps here, so let's remove for now
    // new webpack.optimize.DedupePlugin()
  );
}

module.exports = {
  entry: {
    'mdl-ui': ['./src/index.js'],
    'mdl-icons': ['./src/assets/material-icons.css'],
    'mdl-fonts': ['./src/assets/roboto/roboto.css'],
},
  output: {
    path: './dist',
    filename: '[name].js',
  },
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
        // loader: 'url?limit=1111111024&minetype=image/png&name=png/[name]-[hash].[ext]',
        loader: 'url?limit=1024&minetype=image/png&name=assets/[name]-[hash].[ext]',
      },
      {
        test: /\.woff2$/,
        // loader: 'url?limit=111111024&mimetype=application/font-woff2&name=fonts/[name]-[hash].[ext]',
        loader: 'url?limit=1024&mimetype=application/font-woff2&name=assets/[name]-[hash].[ext]',
      },
    ],
  },
  plugins,
  devtool: 'source-map',
};
