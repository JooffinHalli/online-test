const path = require('node:path');
const { HtmlPlugin } = require('../packages');

module.exports.commonConfig = {
  entryPoints: ['../src/index.jsx'],
  bundle: true,
  minify: true,
  outfile: '../dist/bundle.js',
  jsx: 'automatic',
  plugins: [
    new HtmlPlugin({ outDir: path.resolve(__dirname, '..', 'dist', 'index.html') })
  ]
}