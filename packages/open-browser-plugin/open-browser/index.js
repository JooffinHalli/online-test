const { platform } = require('node:os');
const { exec } = require('node:child_process');

const osPlatform = platform();

const osOpenBrowserCommand = {
  'win32': 'start',
  'darwin': 'open'
}

const command = osOpenBrowserCommand[osPlatform];

const logRed = (string) => string && console.log('\x1b[31m%s\x1b[0m', string);

const openBrowser = (url) => {
  if (!url) throw new Error('укажите url');
  
  if (!command) {
    logRed('не удалось открыть браузер на вашей операционной системе');
    process.exit(0);
  }

  exec(`${command} ${url}`, logRed);
}

module.exports = openBrowser;