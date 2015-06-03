module.exports = {
  entry: './src/app.js',
  output: {
    filename: './js/bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel?stage=0', exclude: /node_modules/}
    ]
  }
};
