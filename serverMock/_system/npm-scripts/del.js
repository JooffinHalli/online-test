const fs = require('node:fs');
const logger = require('../lib/Logger');

const root_path = process.cwd();
const new_endpoint_name = process.argv[2];

const endpoints_folder_path = root_path + '/endpoints/';
const store_folder_path = root_path + '/store/';
const store_index_path = store_folder_path + 'index.js';
const declarations_file_path = root_path + '/_system/declarations/index.d.ts';

const new_endpoint_path = endpoints_folder_path + new_endpoint_name;
const new_endpoint_store_path = store_folder_path + new_endpoint_name;

const templates_folder_path = root_path + '/_system/templates';
const updateDeclarations = require(templates_folder_path + '/declaration.js');

if (!new_endpoint_name) {
  logger.yellow('Нужно указать имя для эндпойнта');
  process.exit(0);
}

if (!fs.existsSync(new_endpoint_path)) {
  logger.yellow('Эндпойнта с таким именем не существует');
  process.exit(0);
}

try {
  fs.rmSync(new_endpoint_path, { recursive: true, force: true }); // delete endpoints
} catch (e) {
  logger.red(e);
}

try {
  fs.rmSync(new_endpoint_store_path, { recursive: true, force: true }); // delete store
} catch (e) {
  logger.red(e);
}

const refreshStore = async () => {
  const endpoints = await fs.promises.readdir(endpoints_folder_path);
  const newStore = [];

  {
    const newCode = updateDeclarations(endpoints);
    try {
      fs.writeFileSync(declarations_file_path, newCode); // update d.ts
    } catch (e) {
      logger.red(e);
    }
  }
  
  for (const endpoint of endpoints) {
    newStore.push(` ['${endpoint}']: require('./${endpoint}'),\n`);
  }

  const newCode = `module.exports = {
${newStore.join('')}}`;

  try {
    fs.writeFileSync(store_index_path, newCode);
  } catch (e) {
    logger.red(e);
  }
  
};

refreshStore();