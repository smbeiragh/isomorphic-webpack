import path from 'path';
import Express from 'express';

const router = Express.Router();
const webpack = require('webpack');
const webpackConfig = require('./../../webpack.config.dev');

const compiler = webpack(webpackConfig[0]);

// webpack dev server as middleware
router.use(require('webpack-dev-middleware')(compiler, {
  // quiet: true,
  // noInfo: true,
  publicPath: webpackConfig[0].output.publicPath
}));

// webpack hot replacement middleware
router.use(require('webpack-hot-middleware')(compiler));

export default router;
