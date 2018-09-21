const Express = require('express');

const webpack = require('webpack');
const webpackConfig = require('./../../webpack.config.dev');

const router = Express.Router();
const compiler = webpack(webpackConfig);

// webpack dev server as middleware
router.use(require('webpack-dev-middleware')(compiler, {
  // quiet: true,
  // noInfo: true,
  serverSideRender: true,
  // publicPath: webpackConfig[0].output.publicPath
}));

// webpack hot replacement middleware
router.use(require('webpack-hot-middleware')(compiler.compilers.find(compiler => compiler.name === 'client')));
router.use(require('webpack-hot-server-middleware')(compiler, {chunkName: 'server'}));

module.exports = router;
