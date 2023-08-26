class Logger {
  static log = console.log;
  static red = (...args) => {
    console.log(colors.red, ...args);
  }
  static green = (...args) => {
    console.log(colors.green, ...args);
  }
  static yellow = (...args) => {
    console.log(colors.yellow, ...args);
  }
}

module.exports = Logger;

var colors = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  crimson: "\x1b[38m" // Scarlet
};