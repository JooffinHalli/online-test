const child_process = require('node:child_process');
const fs = require('node:fs');
const Process = require('./Process');
const Logger = require('./Logger');

/** Утилиты для работы с гитом */
class Git {

  /** Проверяет, является ли строка валидной ссылкой для `git clone` */
  static assertLink = (string) => {
    if (!string) {
      Process.end('укажите ссылку на репозиторий');
    }
    if (!string.startsWith('http') || !string.endsWith('.git')) {
      Process.end('укажите корректную ссылку на репозиторий');
    }
  }

  /** Получить имя репозитория из ссылки для клонирования */
  static getRepoName = (validRepoLink) => {
    const [httpPart, repoNamePart, dotGitPart] = validRepoLink.split('.');
    const repoLinkSlashParts = repoNamePart.split('/');
    const repoName = repoLinkSlashParts[repoLinkSlashParts.length - 1];
    return repoName;
  }

  /** Клонировать репозиторий */
  static clone = (repoLink, repoBranch, repoName) => {
    try {
      Logger.log(`Clonning repository ${repoName}...`);
      const branch = repoBranch ? `--branch ${repoBranch} --single-branch ` : '';
      child_process.execSync(`git clone ${branch}${repoLink}`);
    }
    catch (e) {
      Process.end('Ошибка во время клонирования репозитория', e);
    }
  }

  /** Убедиться, что репозиторий клонировался и файлы создались */
  static assertClonning = (path) => {
    if (!fs.existsSync(path)) {
      Process.end('Репозиторий склонировался с ошибкой или не склонировался вообще');
    }
    if (!fs.existsSync(`${path}/api.yaml`)) {
      Process.end('Репозиторий склонировался, но там нет api.yaml файла');
    }
    Logger.log('cloned');
  }

}

module.exports = Git;