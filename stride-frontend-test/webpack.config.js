const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./lib/root.jsx",
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: "cart.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  },
  externals: {
    'react/addons': true,
  }
};
