const fs = require('node:fs');

const voidFn = () => {};

const html = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Service for online testing">
  <link rel="stylesheet" href="bundle.css">
  <title>Document</title>
</head>

<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>

</html>`

/** Плагин для esbuild, который создает простой html */
class HtmlPlugin {
  name = 'HtmlPlugin';

  constructor(config) {
    this.setup = (build) => {
      if (!config.outDir) throw new Error('укажите outDir');
      build.onEnd(() => {
        fs.writeFile(config.outDir, html, null, voidFn);
      });
    };
  }
}

module.exports = HtmlPlugin;