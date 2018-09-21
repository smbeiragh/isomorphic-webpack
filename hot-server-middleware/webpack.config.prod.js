/**
 * Created by sajjad on 3/14/18.
 */

'use strict';

const base = require('./webpack.config.base');

const clientBase = base[0];
const serverBase = base[1];

const clientDevConf = {
  mode: 'production',
  plugins: clientBase.plugins.concat([
  ])
};

const serverDevConf = {
  mode: 'development', // keep source-map
};

module.exports = [
  Object.assign({}, clientBase, clientDevConf),
  Object.assign({}, serverBase, serverDevConf)
];
