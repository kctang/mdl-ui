const path = require('path');

module.exports = {
  output: {
    publicPath: '../dist/assets'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      {
        test: /\.png/,
        loader: 'url?limit=65536&minetype=image/png',
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=65536&mimetype=application/font-woff2',
      },
    ]
  }
};
