const openBrowser = require('./open-browser');

const once = (fn) => (...args) => {
  if (!fn) return;
  fn(...args);
  fn = null;
};

/** Плагин для esbuild, который открывает браузерное окно после сборки */
class OpenBrowserPlugin {
  name = 'OpenBrowserPlugin';

  constructor(config = { url: 'http://localhost:3000' }) {
    const openOpnce = once(() => openBrowser(config.url));
    this.setup = (build) => build.onEnd(openOpnce);
  }
}

module.exports = OpenBrowserPlugin;