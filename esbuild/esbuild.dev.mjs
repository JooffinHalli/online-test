import { context } from 'esbuild';
import { OpenBrowserPlugin } from '../packages/index.js';
import { commonConfig } from './esbuild.common.mjs';

const { serve } = await context({
  ...commonConfig,
  plugins: [
    new OpenBrowserPlugin()
  ]
});

const { host, port } = await serve({
  servedir: '../public',
  port: 3000,
  host: 'localhost',
  fallback: 'public/index.html'
});

console.log('\x1b[32m%s\x1b[0m', `App is started on http://${host}:${port}`) // green