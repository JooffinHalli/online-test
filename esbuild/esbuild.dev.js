const { context } = require('esbuild');
const { OpenBrowserPlugin } = require('../packages');
const { commonConfig } = require('./esbuild.common.js');

context({
  ...commonConfig,
  sourcemap: true,
  plugins: [
    ...commonConfig.plugins,
    new OpenBrowserPlugin()
  ]
})
.then(({ serve }) => {

  serve({
    servedir: '../dist',
    port: 3000,
    host: 'localhost',
    fallback: 'dist/index.html'
  })
  .then(({ host, port }) => {
    console.log('\x1b[32m%s\x1b[0m', `App is started on http://${host}:${port}`) // green
  });
  
});