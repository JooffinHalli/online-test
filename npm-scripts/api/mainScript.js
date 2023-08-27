const fs = require('node:fs');
const { Git, Files, Process, Logger, Template } = require('./utils');
const { OpenApiJSONifier } = require('../../packages');

const genOpenapiTypeDocs = require('./scripts/1.types');
const genOpenapiEndpoints = require('./scripts/2.endpoints');

const runMainScript = (repoLink, repoBranch) => {

  Template.bindContent(repoLink, repoBranch);

  Git.assertLink(repoLink);
  const repoName = Git.getRepoName(repoLink);
  Files.removeFolderSafe(repoName);
  // Git.clone(repoLink, repoBranch, repoName);
  Git.assertClonning(`../../`);

  fs.readFile(`../../api.yaml`, null, (err, yamlContent) => {
  // fs.readFile(`./${repoName}/api.yaml`, null, (err, yamlContent) => {
    if (err) Process.end('ошибка во время чтения файла `api.yaml`', err);
    new OpenApiJSONifier(yamlContent, {
      beforeScripts: [genOpenapiEndpoints],
      afterScripts: [genOpenapiTypeDocs]
    });
    Files.removeFolderSafe(repoName);
    Logger.green('api успешно обновлено');
  });

}

module.exports = runMainScript;