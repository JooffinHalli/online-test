const Process = require('./Process');

/** Утилиты для работы с ссылками */
class Link {

  /** Проверяет, является ли строка валидной ссылкой для `git clone` */
  static isGitCloneble = (string) => {
    if (!string) {
      Process.end('укажите ссылку на репозиторий');
    }
    if (!string.startsWith('http')) {
      Process.end('укажите корректную ссылку на репозиторий');
    }
    if (!string.endsWith('.git')) {
      Process.end('укажите корректную ссылку на репозиторий');
    }
  }

}

module.exports = Link;