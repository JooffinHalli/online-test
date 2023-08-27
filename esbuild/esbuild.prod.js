const { build } = require('esbuild');
const { commonConfig } = require('./esbuild.common.js');

build(commonConfig);