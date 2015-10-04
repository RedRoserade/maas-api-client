// Webpack dev server config.

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.development.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true
}).listen(9090, 'localhost', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('listening...');
  }
});
