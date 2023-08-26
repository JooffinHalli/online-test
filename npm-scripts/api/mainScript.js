const fs = require('node:fs');
const { Git, Files, Process, Logger } = require('./utils');
const { OpenApiJSONifier } = require('../../packages');

const genOpenApiIndex = require('./scripts/1.openapi');
const genOpenapiPath = require('./scripts/2.paths');
const genOpenapiComponents = require('./scripts/3.components');
const genOpenapiSchemas = require('./scripts/4.schemas');
const genOpenapiTypeDocs = require('./scripts/5.types');
const genMstSchemas = require('./scripts/6.mst');

const runMainScript = (repoLink, repoBranch) => {

  Git.assertLink(repoLink);
  const repoName = Git.getRepoName(repoLink);
  Files.removeFolderSafe(repoName);
  Git.clone(repoLink, repoBranch, repoName);
  Git.assertClonning(`./${repoName}`);

  fs.readFile(`./${repoName}/api.yaml`, null, (err, yamlContent) => {
    if (err) Process.end('ошибка во время чтения файла `api.yaml`', err);
    const ctx = { repoLink, repoBranch };
    new OpenApiJSONifier(yamlContent, {
      beforeScripts: [
        genOpenApiIndex.bind(ctx),
        genOpenapiPath.bind(ctx),
        genOpenapiComponents.bind(ctx),
        genOpenapiSchemas.bind(ctx),
        genMstSchemas.bind(ctx),
      ],
      afterScripts: [
        genOpenapiTypeDocs.bind(ctx),
      ]
    });
    Logger.green('api успешно обновлено');
  });

}

module.exports = runMainScript;