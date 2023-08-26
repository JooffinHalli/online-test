const Logger = require('./Logger');

/** Утилиты для работы с процессом */
class Process {

  /** @param message {string} сообщение для логов */
  static end = (message) => {
    Logger.red(message);
    process.exit(0);
  }
}

module.exports = Process;