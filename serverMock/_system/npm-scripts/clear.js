const fs = require('node:fs');
const logger = require('../lib/Logger');

const root_path = process.cwd();

const endpoints_folder_path = root_path + '/endpoints/';
const store_folder_path = root_path + '/store/';
const store_index_path = store_folder_path + 'index.js';
const declarations_file_path = root_path + '/_system/declarations/index.d.ts';

const templates_folder_path = root_path + '/_system/templates';
const genInitStore = require(templates_folder_path + '/initStore.js');
const updateDeclarations = require(templates_folder_path + '/declaration.js');

try {
  if (fs.existsSync(endpoints_folder_path)) {
    fs.rmSync(endpoints_folder_path, { recursive: true, force: true }); // delete endpoints
  }
  fs.mkdirSync(endpoints_folder_path); // create endpoints
} catch (e) {
  logger.red(e);
}

try {
  if (fs.existsSync(store_folder_path)) {
    fs.rmSync(store_folder_path, { recursive: true, force: true }); // delete store
  }
  fs.mkdirSync(store_folder_path); // create store
  fs.writeFileSync(store_index_path, genInitStore()); // create index.js
  
  logger.green('Все эндпойнты удалены');
} catch (e) {
  logger.red(e);
}

{
  const newCode = updateDeclarations([]);
  try {
    fs.writeFileSync(declarations_file_path, newCode); // update d.ts
  } catch (e) {
    logger.red(e);
  }
}

process.exit(0);