class Template {

  /**
   * @param {string} repoLink
   * @param {string} repoBranch
   * @param {string} string
   */
  static content(repoLink, repoBranch, string) {
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

}

module.exports = Template;