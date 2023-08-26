const COLORS = {
  red: '\x1b[31m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m',
  yellow: '\x1b[33m%s\x1b[0m',
  blue: '\x1b[34m%s\x1b[0m',
  magenta: '\x1b[35m%s\x1b[0m',
  cyan: '\x1b[36m%s\x1b[0m'
}

class Logger {
  constructor(log) {
    const method = (color) => (...args) => log(color, ...args);

    this.log = method('');
    this.red = method(COLORS.red);
    this.yellow = method(COLORS.yellow);
    this.green = method(COLORS.green);
    this.blue = method(COLORS.blue);
  }
}

module.exports = new Logger(console.log);