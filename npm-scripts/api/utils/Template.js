let _repoLink = ''
let _repoBranch = '';

class Template {

  /**
   * @param {string} repoLink
   * @param {string} repoBranch
   * @param {string} string
   */
  static content(string, repoLink = _repoLink, repoBranch = _repoBranch) {
    return `/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: ${repoLink}
*  . ветка: ${repoBranch}
*  ...................................................................................
*/

${string}`;
  }

  /** Запомнить repoLink и repoBranch */
  static bindContent(repoLink, repoBranch) {
    _repoLink = repoLink;
    _repoBranch = repoBranch;
  }

}

module.exports = Template;