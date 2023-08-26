const fs = require('node:fs');
const logger = require('../lib/Logger');
const store = require('../../store/index.js');

const root_path = process.cwd();
const new_endpoint_name = process.argv[2];

const endpoints_folder_path = root_path + '/endpoints/';
const store_folder_path = root_path + '/store/';
const store_index_path = store_folder_path + 'index.js';
const declarations_file_path = root_path + '/_system/declarations/index.d.ts';

const new_endpoint_path = endpoints_folder_path + new_endpoint_name;
const new_endpoint_store_path = store_folder_path + new_endpoint_name;

const templates_folder_path = root_path + '/_system/templates';
const genController = require(templates_folder_path + '/controller.js');
const genInitState = require(templates_folder_path + '/initState.js');
const addToStore = require(templates_folder_path + '/addToStoreObject.js');
const updateDeclarations = require(templates_folder_path + '/declaration.js');

if (!new_endpoint_name) {
  logger.yellow('Нужно указать имя для эндпойнта');
  process.exit(0);
}

if (fs.existsSync(new_endpoint_path)) {
  logger.yellow('Эндпойнт с таким именем уже существует');
  process.exit(0);
}

{
  const newCode = updateDeclarations([...Object.keys(store), new_endpoint_name]);
  try {
    fs.writeFileSync(declarations_file_path, newCode); // update d.ts
  } catch (e) {
    logger.red(e);
  }
}

try {
  fs.mkdirSync(new_endpoint_path, { recursive: true }); // create a folder serverMock/endpoints/${new_endpoint_name}
  fs.writeFileSync(new_endpoint_path + '/index.ts', genController(new_endpoint_name)); // create index.js
  logger.green('Контроллер для "' + new_endpoint_name + '" создан! endpoints/' + new_endpoint_name);
} catch(e) {
  logger.red('Ошибка при создании контроллера', e);
}

try {
  fs.mkdirSync(new_endpoint_store_path, { recursive: true }); // create a folder serverMock/store/${new_endpoint_name}
  fs.writeFileSync(new_endpoint_store_path + '/index.js', genInitState(new_endpoint_name)); // create index.js
} catch(e) {
  logger.red('Ошибка при создании стора для эндпойнта', e);
}

{
  const [partToWork] = fs.readFileSync(store_index_path).toLocaleString().split('}');

  let newStore = '';
  if (partToWork.includes(new_endpoint_name)) {
    newStore = `${partToWork}}`;
  } else {
    newStore = `${partToWork}${addToStore(new_endpoint_name)}}`;
  }

  try {
    fs.writeFileSync(store_index_path, newStore); // add new endpoint to store object
    logger.green('Стор для "' + new_endpoint_name + '" тоже создан! store/' + new_endpoint_name);
  } catch (e) {
    logger.red(e);
  }
}

process.exit(0);